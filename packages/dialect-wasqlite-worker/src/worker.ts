import type { SQLiteDB } from '@subframe7536/sqlite-wasm'
import { initSQLite } from '@subframe7536/sqlite-wasm'
import type { QueryResult } from 'kysely'
import type { MainMsg, WorkerMsg } from './type'

let db: SQLiteDB

async function init(url: string, fileName: string, useOPFS: boolean) {
  db = await initSQLite(
    (
      useOPFS
        ? (await import('@subframe7536/sqlite-wasm/opfs')).useOpfsStorage
        : (await import('@subframe7536/sqlite-wasm/idb')).useIdbStorage
    )(
      fileName,
      { url },
    ),
  )
}
async function exec(isSelect: boolean, sql: string, parameters?: readonly unknown[]): Promise<QueryResult<any>> {
  const rows = await db.run(sql, parameters as any[])
  return isSelect || rows.length
    ? { rows }
    : {
        rows,
        insertId: BigInt(await db.lastInsertRowId()),
        numAffectedRows: BigInt(db.changes()),
      }
}
onmessage = async ({ data }: MessageEvent<MainMsg>) => {
  const ret: WorkerMsg = [
    data[0],
    null,
    null,
  ]
  try {
    switch (data[0]) {
      case 0:
        await init(data[1], data[2], data[3])
        break
      case 1:
        ret[1] = await exec(data[1], data[2], data[3])
        break
      case 2:
        await db.close()
        break
    }
  } catch (error) {
    ret[2] = error
  }
  postMessage(ret)
}
