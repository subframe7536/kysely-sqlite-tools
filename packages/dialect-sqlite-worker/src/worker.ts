import { parentPort, workerData } from 'node:worker_threads'
import Database from 'better-sqlite3'
import type { MainMsg, WorkerMsg } from './type'

if (!parentPort) {
  throw new Error('Must be run in a worker thread')
}

const { src, option } = workerData
const db = new Database(src, option)

parentPort.on('message', (msg: MainMsg) => {
  try {
    if (msg.type === 'close') {
      db.close()
      const ret: WorkerMsg = {
        type: 'close',
        data: null,
      }
      parentPort?.postMessage(ret)
      return
    }
    const { sql, parameters } = msg
    const stmt = db.prepare(sql)
    let data: any
    if (stmt.reader) {
      data = {
        rows: stmt.all(parameters),
      }
    } else {
      const { changes, lastInsertRowid } = stmt.run(parameters)
      const numAffectedRows = (changes !== undefined && changes !== null)
        ? BigInt(changes)
        : undefined
      data = {
        numAffectedRows,
        insertId:
          (lastInsertRowid !== undefined && lastInsertRowid !== null)
            ? BigInt(lastInsertRowid)
            : undefined,
        rows: [],
      }
    }
    const ret: WorkerMsg = {
      type: 'result',
      data,
    }
    parentPort?.postMessage(ret)
  } catch (error) {
    const ret: WorkerMsg = {
      type: 'error',
      data: error,
    }
    parentPort?.postMessage(ret)
  }
})
