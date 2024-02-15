import Database from 'bun:sqlite'
import type { QueryResult } from 'kysely'
import type { MainMsg, RunMsg, WorkerMsg } from './type'

let db: Database
let fn: 'query' | 'prepare'
function run({ isSelect, sql, parameters }: RunMsg): QueryResult<any> {
  const stmt = db[fn](sql)
  const rows = stmt.all(parameters as any)

  if (isSelect || rows.length) {
    return { rows }
  }
  return {
    rows,
    // @ts-expect-error get insert id
    insertId: db.query('SELECT last_insert_rowid() as i').get().i,
    // @ts-expect-error get changes
    numAffectedRows: db.query('SELECT changes() as c').get().c,
  }
}

// @ts-expect-error bun worker
onmessage = ({ data }: MessageEvent<MainMsg>) => {
  const ret: WorkerMsg = {
    type: data.type,
    data: null,
    err: null,
  }
  try {
    switch (data.type) {
      case 'run':
        ret.data = run(data)
        break
      case 'close':
        db.close()
        break
      case 'init':
        db = new Database(data.url, { create: true })
        fn = data.cache ? 'query' : 'prepare'
        break
    }
  } catch (error) {
    ret.err = error
  }
  postMessage(ret)
}
