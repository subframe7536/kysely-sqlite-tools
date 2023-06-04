import { parentPort, workerData } from 'node:worker_threads'
import Database from 'better-sqlite3'
import type { SqlData, WorkerMsg } from './type'

if (!parentPort) {
  throw new Error('Must be run in a worker thread')
}

const { src, option } = workerData
const db = new Database(src, option)

console.log('successfully initiate')
parentPort.on('message', (data: WorkerMsg) => {
  if (typeof data === 'string') {
    db[data]()
    parentPort?.postMessage(null)
    return
  }
  const { sql, parameters } = data as SqlData
  const stmt = db.prepare(sql)
  if (stmt.reader) {
    parentPort?.postMessage({
      rows: stmt.all(parameters),
    })
  } else {
    const { changes, lastInsertRowid } = stmt.run(parameters)
    const numAffectedRows = (changes !== undefined && changes !== null)
      ? BigInt(changes)
      : undefined
    parentPort?.postMessage({
      numAffectedRows,
      insertId:
        (lastInsertRowid !== undefined && lastInsertRowid !== null)
          ? BigInt(lastInsertRowid)
          : undefined,
      rows: [],
    })
  }
})
