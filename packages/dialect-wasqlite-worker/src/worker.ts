import type { SQLiteDB } from '@subframe7536/sqlite-wasm'
import { initSQLite, isOpfsSupported } from '@subframe7536/sqlite-wasm'
import type { QueryResult } from 'kysely'
import type { MainMsg, WorkerMsg } from './type'

let db: SQLiteDB

async function init(fileName: string, url?: string, preferOPFS?: boolean) {
  let storage
  if (isOpfsSupported() && preferOPFS) {
    storage = (await import('@subframe7536/sqlite-wasm/opfs')).useOpfsStorage(fileName, { url })
  } else {
    storage = (await import('@subframe7536/sqlite-wasm/idb')).useIdbStorage(fileName, { url })
  }

  db = await initSQLite(storage)
}
async function exec(isSelect: boolean, sql: string, parameters?: readonly unknown[]): Promise<QueryResult<any>> {
  const rows = await db.run(sql, parameters)
  if (isSelect) {
    return { rows }
  }
  const insertId = BigInt(await db.lastInsertRowId())
  const numAffectedRows = BigInt(db.changes())
  return { rows, insertId, numAffectedRows }
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
      case 'init':
        await init(data.fileName, data.url, data.preferOPFS)
        break
      case 'run':
        ret.data = await exec(data.isSelect, data.sql, data.parameters)
        break
      case 'close':
        await db.close()
        break
    }
  } catch (error) {
    ret.err = error
  }
  postMessage(ret)
}
