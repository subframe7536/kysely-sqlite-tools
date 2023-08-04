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
  const run = () => {
    try {
      if (msg.type === 'close') {
        db.close()
        return
      }
      const { sql, parameters } = msg
      const stmt = db.prepare(sql)
      if (stmt.reader) {
        ret.data = {
          rows: stmt.all(parameters),
        }
        return
      }
      const { changes, lastInsertRowid } = stmt.run(parameters)
      const numAffectedRows = (changes !== undefined && changes !== null)
        ? BigInt(changes)
        : undefined
      ret.data = {
        numAffectedRows,
        insertId:
          (lastInsertRowid !== undefined && lastInsertRowid !== null)
            ? BigInt(lastInsertRowid)
            : undefined,
        rows: [],
      }
    } catch (error) {
      ret.err = error
    }
  }
  run()
  parentPort?.postMessage(ret)
})
