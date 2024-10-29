import type { QueryResult } from 'kysely'
import type { MainMsg, WorkerMsg } from './type'
import Database from 'bun:sqlite'

let db: Database
let fn: 'query' | 'prepare'
function run(isSelect: boolean, sql: string, parameters: readonly unknown[]): QueryResult<any> {
  const stmt = db[fn](sql)
  const rows = stmt.all(parameters as any)

  if (isSelect || rows.length) {
    return { rows }
  }
  const { changes, lastInsertRowid } = db.query('SELECT 1').run()
  return {
    rows,
    insertId: BigInt(changes),
    numAffectedRows: BigInt(lastInsertRowid),
  }
}

onmessage = ({ data }: MessageEvent<MainMsg>) => {
  const ret: WorkerMsg = [
    data[0],
    null,
    null,
  ]

  try {
    switch (data[0]) {
      case 0:
        db = new Database(data[1], { create: true })
        fn = data[2] ? 'query' : 'prepare'
        break
      case 1:
        ret[1] = run(data[1], data[2], data[3] || [])
        break
      case 2:
        db.close()
        break
    }
  } catch (error) {
    ret[2] = error
  }
  postMessage(ret)
}
