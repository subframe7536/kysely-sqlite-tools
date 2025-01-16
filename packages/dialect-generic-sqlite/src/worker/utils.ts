import type { CommonSqliteExecutor, Promisable } from '../type'
import {
  closeEvent,
  dataEvent,
  endEvent,
  initEvent,
  type MainToWorkerMsg,
  runEvent,
  type WorkerToMainMsg,
} from './type'

export function createOnMessageCallback(
  init: () => Promisable<CommonSqliteExecutor>,
  post: (data: any) => void = globalThis.postMessage,
): (data: MainToWorkerMsg) => Promise<void> {
  let db: CommonSqliteExecutor
  return async ([
    msg,
    data1,
    data2,
    data3,
    data4,
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
          if (!db.iterater) {
            throw new Error('streamQuery() is not supported.')
          }
          const it = db.iterater(data1, data2, data3, data4)
          for await (const rows of it) {
            post([msg, rows as any, null] satisfies WorkerToMainMsg)
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
