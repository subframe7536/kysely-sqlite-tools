import * as SQLite from 'wa-sqlite'
import SQLiteAsyncESMFactory from 'wa-sqlite/dist/wa-sqlite-async.mjs'
import { IDBBatchAtomicVFS } from 'wa-sqlite/src/examples/IDBBatchAtomicVFS.js'
import type { MainMsg, WorkerMsg } from './type'

let sqlite: SQLiteAPI
let db: number

async function init(dbName: string, url?: string) {
  const option = url ? { locateFile: () => url } : {}
  const SQLiteAsyncModule = await SQLiteAsyncESMFactory(option)

  sqlite = SQLite.Factory(SQLiteAsyncModule)
  sqlite.vfs_register(new IDBBatchAtomicVFS(dbName, { durability: 'relaxed' }))
  db = await sqlite.open_v2(
    dbName, undefined, dbName,
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

    while ((await sqlite.step(stmt)) === SQLite.SQLITE_ROW) {
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

async function exec(sql: string, parameters?: readonly unknown[]) {
  await run(sql, parameters)
  const v = await run('SELECT last_insert_rowid() as id')
  return {
    insertId: BigInt(v[0].id),
    numAffectedRows: BigInt(sqlite.changes(db)),
    rows: [],
  }
}

async function query(sql: string, parameters?: readonly unknown[]) {
  return {
    rows: await run(sql, parameters),
  }
}

async function close() {
  await sqlite.close(db)
}

onmessage = async (ev: MessageEvent<MainMsg>) => {
  const data = ev.data
  const ret: WorkerMsg = {
    type: data.type,
    msg: {
      data: null,
      err: null,
    },
  }
  try {
    switch (data.type) {
      case 'run':
        ret.msg.data = data.isQuery
          ? await query(data.sql, data.parameters)
          : await exec(data.sql, data.parameters)
        break
      case 'close':
        await close()
        break
      case 'init':
        await init(data.dbName, data.url)
        break
    }
  } catch (error) {
    ret.msg.err = error
  }
  postMessage(ret)
}
