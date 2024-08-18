import { parentPort, workerData } from 'node:worker_threads'
import Database from 'better-sqlite3'
import type { MainMsg, WorkerMsg } from './type'

if (!parentPort) {
  throw new Error('Must be run in a worker thread')
}

const { src, option } = workerData
const db = new Database(src, option)

parentPort.on('message', ([msg, data1, data2]: MainMsg) => {
  const ret: WorkerMsg = [
    msg,
    null,
    null,
  ]

  try {
    switch (msg) {
      case '0': {
        const stmt = db.prepare(data1)
        if (stmt.reader) {
          ret[1] = {
            rows: stmt.all(data2),
          }
        } else {
          const { changes, lastInsertRowid } = stmt.run(data2)
          ret[1] = {
            rows: [],
            numAffectedRows: BigInt(changes),
            insertId: BigInt(lastInsertRowid),
          }
        }
        break
      }
      case '1':
        db.close()
        break
      case '2': {
        const stmt = db.prepare(data1)
        const iter = stmt.iterate(data2)
        for (const row of iter) {
          parentPort!.postMessage([msg, [row as any], null] satisfies WorkerMsg)
        }
        ret[0] = '3'
        break
      }
    }
  } catch (error) {
    ret[2] = error
  }
  parentPort!.postMessage(ret)
})
