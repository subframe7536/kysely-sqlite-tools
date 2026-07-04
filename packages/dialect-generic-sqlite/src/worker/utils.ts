import type { IGenericSqlite, Promisable } from '../type'

import type { InitFn, MainToWorkerMsg, MessageHandleFn, WorkerToMainMsg } from './types'
import { closeEvent, dataEvent, endEvent, initEvent, runEvent } from './types'

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
  return async ([type, data1, data2, data3, data4, data5]) => {
    const ret: WorkerToMainMsg = [type, null, null, null]
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
          await db.close()
          break

        case dataEvent: {
          if (!db.iterator) {
            throw new Error('streamQuery() is not supported.')
          }
          const it = db.iterator(data2, data3, data4, data5)
          for await (const row of it) {
            post([type, data1, row as any, null] satisfies WorkerToMainMsg)
          }
          ret[0] = endEvent
          ret[1] = data1 // queryId
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
    post(ret)
  }
}

export async function access<T>(data: T | (() => Promisable<T>)): Promise<T> {
  return typeof data === 'function' ? await (data as any)() : data
}
