import { parentPort, workerData } from 'node:worker_threads'
import Database from 'better-sqlite3'
import type { MainMsg, WorkerMsg } from './type'

if (!parentPort) {
  throw new Error('Must be run in a worker thread')
}

const { src, option } = workerData
const db = new Database(src, option)

parentPort.on('message', (msg: MainMsg) => {
  const ret: WorkerMsg = [
    msg[0],
    null,
    null,
  ]

  try {
    if (msg[0] === '1') {
      db.close()
      parentPort!.postMessage(ret)
      return
    }
    const stmt = db.prepare(msg[1])
    if (stmt.reader) {
      ret[1] = {
        rows: stmt.all(msg[2]),
      }
    } else {
      const { changes, lastInsertRowid } = stmt.run(msg[2])
      ret[1] = {
        rows: [],
        numAffectedRows: BigInt(changes),
        insertId: BigInt(lastInsertRowid),
      }
    }
  } catch (error) {
    ret[2] = error
  }
  parentPort!.postMessage(ret)
})
