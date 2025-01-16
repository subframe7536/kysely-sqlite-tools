import type { CommonSqliteDB, Promisable } from '../type'
import type { MainToWorkerMsg, WorkerToMainMsg } from './type'

export function createOnMessageCallback(
  init: () => Promisable<CommonSqliteDB>,
  postMessage: (data: any) => void = globalThis.postMessage,
): (data: MainToWorkerMsg) => Promise<void> {
  let db: CommonSqliteDB
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
        case '0':
          db = await init()
          break
        case '1':
          ret[1] = data1
            ? { rows: await db.all(data2, data3) }
            : { rows: [], ...await db.run(data2, data3) }
          break
        case '2':
          await db.close()
          break
        case '3': {
          if (!db.iterater) {
            throw new Error('streamQuery() is not supported.')
          }
          const it = db.iterater(data1, data2, data3, data4)
          for await (const rows of it) {
            postMessage([msg, rows as any, null] satisfies WorkerToMainMsg)
          }
          ret[0] = '4'
          break
        }
      }
    } catch (error) {
      ret[2] = error
    }
    postMessage(ret)
  }
}
