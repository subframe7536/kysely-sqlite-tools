import type { SQLiteDB } from '@subframe7536/sqlite-wasm'
import { initSQLite } from '@subframe7536/sqlite-wasm'
import type { QueryResult } from 'kysely'
import type { MainMsg, WorkerMsg } from './type'

let db: SQLiteDB

async function init(fileName: string, url: string, useOPFS: boolean): Promise<void> {
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
async function stream(onData: (data: any) => void, sql: string, parameters?: readonly unknown[]): Promise<void> {
  await db.stream(onData, sql, parameters as any[])
}
onmessage = async ({ data: [msg, data1, data2, data3] }: MessageEvent<MainMsg>) => {
  const ret: WorkerMsg = [msg, null, null]
  try {
    switch (msg) {
      case 0:
        await init(data1, data2, data3)
        break
      case 1:
        ret[1] = await exec(data1, data2, data3)
        break
      case 2:
        await db.close()
        break
      case 3:
        await stream(val => postMessage([3, [val], null] satisfies WorkerMsg), data1, data2)
        ret[0] = 4
        break
    }
  } catch (error) {
    ret[2] = error
  }
  postMessage(ret)
}
