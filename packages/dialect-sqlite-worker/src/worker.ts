import { parentPort, workerData } from 'node:worker_threads'
import Database from 'better-sqlite3'
import type { MainMsg, WorkerMsg } from './type'

if (!parentPort) {
  throw new Error('Must be run in a worker thread')
}

const { src, option } = workerData
const db = new Database(src, option)

parentPort.on('message', (msg: MainMsg) => {
  const ret: WorkerMsg = {
    type: msg.type,
    data: null,
    err: null,
  }
  try {
    if (msg.type === 'close') {
      db.close()
      parentPort!.postMessage(ret)
      return
    }
    const { sql, parameters } = msg
    const stmt = db.prepare(sql)
    if (stmt.reader) {
      ret.data = {
        rows: stmt.all(parameters),
      }
    } else {
      const { changes, lastInsertRowid } = stmt.run(parameters)
      ret.data = {
        rows: [],
        numAffectedRows: BigInt(changes),
        insertId: BigInt(lastInsertRowid),
      }
    }
  } catch (error) {
    ret.err = error
  }
  parentPort!.postMessage(ret)
})
