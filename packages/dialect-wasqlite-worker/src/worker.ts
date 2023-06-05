import * as SQLite from 'wa-sqlite'
import SQLiteAsyncESMFactory from 'wa-sqlite/dist/wa-sqlite-async.mjs'
import { IDBBatchAtomicVFS } from 'wa-sqlite/src/examples/IDBBatchAtomicVFS.js'
import type { MainMsg, WorkerMsg } from './type'

let sqlite: SQLiteAPI
let db: number

async function init(dbName: string, url: string) {
  const SQLiteAsyncModule = await SQLiteAsyncESMFactory({
    locateFile: () => url,
  })

  sqlite = SQLite.Factory(SQLiteAsyncModule)
  sqlite.vfs_register(new IDBBatchAtomicVFS(dbName))
  db = await sqlite.open_v2(
    dbName, undefined, dbName,
  )
  const msg: WorkerMsg = {
    type: 'init',
    data: null,
  }
  postMessage(msg)
}

async function run(sql: string, parameters?: any[]) {
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
        parameters,
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

async function exec(sql: string, parameters?: unknown[]) {
  await run(sql, parameters)
  const v = await run('SELECT last_insert_rowid() as id')
  const msg: WorkerMsg = {
    type: 'exec',
    data: {
      insertId: BigInt(v[0].id),
      numAffectedRows: BigInt(sqlite.changes(db)),
    },
  }
  postMessage(msg)
}

async function query(sql: string, parameters?: unknown[]) {
  const msg: WorkerMsg = {
    type: 'query',
    data: await run(sql, parameters),
  }
  postMessage(msg)
}

async function close() {
  await sqlite.close(db)
  const msg: WorkerMsg = {
    type: 'close',
    data: null,
  }
  postMessage(msg)
}

onmessage = async (ev: MessageEvent<MainMsg>) => {
  try {
    const data = ev.data
    switch (data.type) {
      case 'exec':
        await exec(data.sql, data.param)
        break
      case 'query':
        await query(data.sql, data.param)
        break
      case 'close':
        await close()
        break
      case 'init':
        await init(data.dbName, data.url)
        break
    }
  } catch (error) {
    const msg: WorkerMsg = {
      type: 'error',
      data: error,
    }
    postMessage(msg)
  }
}
