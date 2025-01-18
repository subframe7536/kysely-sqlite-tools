import type { IGenericSqliteExecutor, Promisable } from '../type'
import {
  closeEvent,
  dataEvent,
  endEvent,
  initEvent,
  type InitFn,
  type MainToWorkerMsg,
  type RestMessageHandleFn,
  runEvent,
  type WorkerToMainMsg,
} from './types'

export function createGenericOnMessageCallback<T extends Record<string, unknown>, DB = unknown>(
  init: InitFn<T, DB>,
  post: (data: any) => void,
  rest?: RestMessageHandleFn<DB>,
): (data: MainToWorkerMsg<T>) => Promise<void> {
  let db: IGenericSqliteExecutor<DB>
  return async ([type, data1, data2, data3]) => {
    const ret: WorkerToMainMsg = [type, null, null]
    try {
      switch (type) {
        case initEvent: {
          db = await init(data1)
          break
        }
        case runEvent: {
          ret[1] = data1
            ? { rows: await db.all(data2, data3) }
            : { rows: [], ...await db.run(data2, data3) }
          break
        }
        case closeEvent: {
          await db.close()
          break
        }
        case dataEvent: {
          if (!db.iterator) {
            throw new Error('streamQuery() is not supported.')
          }
          const it = db.iterator(data1, data2, data3)
          for await (const row of it) {
            post([type, row as any, null] satisfies WorkerToMainMsg)
          }
          ret[0] = endEvent
          break
        }
        default: {
          ret[1] = await rest?.(type, db, data1, data2, data3)
        }
      }
    } catch (error) {
      ret[2] = error
    }
    post(ret)
  }
}

export async function access<T>(data: T | (() => Promisable<T>)): Promise<T> {
  return typeof data === 'function' ? await (data as any)() : data
}
