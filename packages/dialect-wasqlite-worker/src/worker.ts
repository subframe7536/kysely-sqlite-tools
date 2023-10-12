import type { SQLiteAPI, SQLiteCompatibleType } from '@subframe7536/wa-sqlite'
import { Factory, SQLITE_ROW } from '@subframe7536/wa-sqlite'
import SQLiteAsyncESMFactory from '@subframe7536/wa-sqlite/dist/wa-sqlite-async.mjs'
import { IDBBatchAtomicVFS } from '@subframe7536/wa-sqlite/src/examples/IDBBatchAtomicVFS'
import type { MainMsg, RunMode, WorkerMsg } from './type'

let sqlite: SQLiteAPI
let db: number

async function init(dbName: string, url?: string) {
  const option = url ? { locateFile: () => url } : {}
  const SQLiteAsyncModule = await SQLiteAsyncESMFactory(option)

  sqlite = Factory(SQLiteAsyncModule)
  sqlite.vfs_register(new IDBBatchAtomicVFS(dbName, { durability: 'relaxed' }))
  db = await sqlite.open_v2(
    dbName,
    undefined,
    dbName,
  )
}

async function run(sql: string, parameters?: readonly unknown[]) {
  const str = sqlite.str_new(db, sql)
  const prepared = await sqlite.prepare_v2(
    db,
    sqlite.str_value(str),
  )

  if (prepared === null) {
    return [] as any[]
  }

  const stmt = prepared.stmt
  try {
    if (typeof parameters !== 'undefined') {
      sqlite.bind_collection(
        stmt,
        parameters as any[],
      )
    }

    const rows: Record<string, SQLiteCompatibleType>[] = []
    let cols: string[] = []

    while ((await sqlite.step(stmt)) === SQLITE_ROW) {
      cols = cols.length === 0 ? sqlite.column_names(stmt) : cols
      const row = sqlite.row(stmt)
      rows.push(cols.reduce((acc, key, i) => {
        acc[key] = row[i]
        return acc
      }, {} as Record<string, SQLiteCompatibleType>))
    }
    return rows
  } finally {
    await sqlite.finalize(stmt)
  }
}

async function exec(mode: RunMode, sql: string, parameters?: readonly unknown[]) {
  const rows = await run(sql, parameters)
  if (mode === 'query') {
    return { rows }
  }
  const v = await run('SELECT last_insert_rowid() as id')
  return {
    insertId: BigInt(v[0].id),
    numAffectedRows: BigInt(sqlite.changes(db)),
    rows: mode === 'raw' ? rows : [],
  }
}

async function close() {
  await sqlite.close(db)
}

onmessage = async (ev: MessageEvent<MainMsg>) => {
  const data = ev.data
  const ret: WorkerMsg = {
    type: data.type,
    data: null,
    err: null,
  }
  try {
    switch (data.type) {
      case 'run':
        ret.data = await exec(data.mode, data.sql, data.parameters)
        break
      case 'close':
        await close()
        break
      case 'init':
        await init(data.dbName, data.url)
        break
    }
  } catch (error) {
    ret.err = error
  }
  postMessage(ret)
}
