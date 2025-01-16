import type { IGenericSqliteExecutor, Promisable } from '../type'
import {
  closeEvent,
  dataEvent,
  endEvent,
  initEvent,
  type MainToWorkerMsg,
  runEvent,
  type WorkerToMainMsg,
} from './type'

export function createGenericOnMessageCallback(
  init: () => Promisable<IGenericSqliteExecutor>,
  post: (data: any) => void,
): (data: MainToWorkerMsg) => Promise<void> {
  let db: IGenericSqliteExecutor
  return async ([
    msg,
    data1,
    data2,
    data3,
  ]: MainToWorkerMsg) => {
    const ret: WorkerToMainMsg = [msg, null, null]
    try {
      switch (msg) {
        case initEvent:
          db = await init()
          break
        case runEvent:
          ret[1] = data1
            ? { rows: await db.all(data2, data3) }
            : { rows: [], ...await db.run(data2, data3) }
          break
        case closeEvent:
          await db.close()
          break
        case dataEvent: {
          if (!db.iterator) {
            throw new Error('streamQuery() is not supported.')
          }
          const it = db.iterator(data1, data2, data3)
          for await (const row of it) {
            post([msg, row as any, null] satisfies WorkerToMainMsg)
          }
          ret[0] = endEvent
          break
        }
      }
    } catch (error) {
      ret[2] = error
    }
    post(ret)
  }
}
