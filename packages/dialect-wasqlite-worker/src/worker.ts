import type { SQLiteDB } from '@subframe7536/sqlite-wasm'
import { initSQLite, isOpfsSupported } from '@subframe7536/sqlite-wasm'
import type { QueryResult } from 'kysely'
import type { InitMsg, MainMsg, RunMsg, WorkerMsg } from './type'

let db: SQLiteDB

async function init({ fileName, preferOPFS, url }: InitMsg) {
  db = await initSQLite(
    (
      await isOpfsSupported() && preferOPFS
        ? (await import('@subframe7536/sqlite-wasm/opfs')).useOpfsStorage
        : (await import('@subframe7536/sqlite-wasm/idb')).useIdbStorage
    )(
      fileName,
      { url },
    ),
  )
}
async function exec({ isSelect, sql, parameters }: RunMsg): Promise<QueryResult<any>> {
  const rows = await db.run(sql, parameters)
  return isSelect || rows.length
    ? { rows }
    : {
        rows,
        insertId: BigInt(await db.lastInsertRowId()),
        numAffectedRows: BigInt(db.changes()),
      }
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
        await init(data)
        break
      case 'run':
        ret.data = await exec(data)
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
