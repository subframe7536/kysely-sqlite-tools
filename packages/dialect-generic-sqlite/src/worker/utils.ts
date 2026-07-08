import type { IGenericSqlite, Promisable } from '../type'

import type { InitFn, MainToWorkerMsg, MessageHandleFn, WorkerToMainMsg } from './types'
import { cancelEvent, closeEvent, dataEvent, endEvent, initEvent, runEvent } from './types'

/**
 * Create generic message handler
 * @param init Function that init sqlite executor
 * @param post Function that post message to main thread
 * @param message Handle custom messages. If returning data is not `undefined` and `null`, it will be set as second element of first param
 */
export function createGenericOnMessageCallback<T extends Record<string, unknown>, DB = unknown>(
  init: InitFn<T, DB>,
  post: (data: any) => void,
  message?: MessageHandleFn<DB>,
): (data: MainToWorkerMsg<T>) => Promise<void> {
  let db: IGenericSqlite<DB>
  const activeStreams = new Map<string, AsyncIterator<unknown> | Iterator<unknown>>()
  const canceledStreams = new Set<string>()
  return async ([type, data1, data2, data3, data4, data5]) => {
    const ret: WorkerToMainMsg = [type, null, null, null]
    let shouldPost = true
    try {
      switch (type) {
        case initEvent:
          db = await init(data1)
          break

        case runEvent:
          ret[1] = data1 // queryId
          ret[2] = await db.query(data2, data3, data4)
          break

        case closeEvent:
          await Promise.all(
            [...activeStreams].map(async ([queryId, iterator]) => {
              canceledStreams.add(queryId)
              await iterator.return?.()
            }),
          )
          await db.close()
          break

        case cancelEvent: {
          shouldPost = false
          const queryId = data1
          canceledStreams.add(queryId)
          await activeStreams.get(queryId)?.return?.()
          break
        }

        case dataEvent: {
          const queryId = data1
          ret[1] = queryId
          if (!db.iterator) {
            throw new Error('streamQuery() is not supported.')
          }
          const it = db.iterator(data2, data3, data4, data5)
          activeStreams.set(queryId, it)
          try {
            for await (const row of it) {
              if (canceledStreams.has(queryId)) {
                break
              }
              post([type, queryId, row as any, null] satisfies WorkerToMainMsg)
            }
          } finally {
            activeStreams.delete(queryId)
          }
          if (canceledStreams.delete(queryId)) {
            shouldPost = false
          } else {
            ret[0] = endEvent
          }
          break
        }
        default:
          if (message) {
            const data = await message(db, type, data1, data2, data3, data4)
            if (data !== undefined && data !== null) {
              ret[2] = data
            }
          } else {
            throw new Error(`Unknown message type: ${type}`)
          }
      }
    } catch (error) {
      ret[3] = error
    }
    if (shouldPost) {
      post(ret)
    }
  }
}

export async function access<T>(data: T | (() => Promisable<T>)): Promise<T> {
  return typeof data === 'function' ? await (data as any)() : data
}
