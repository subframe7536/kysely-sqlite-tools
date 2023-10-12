import { Factory } from '@subframe7536/wa-sqlite'
import SQLiteAsyncESMFactory from '@subframe7536/wa-sqlite/dist/wa-sqlite-async.mjs'
import { IDBBatchAtomicVFS } from '@subframe7536/wa-sqlite/src/examples/IDBBatchAtomicVFS'
import { WaSqliteDialect } from 'kysely-wasm'
import WaSqliteURL from '@subframe7536/wa-sqlite/dist/wa-sqlite-async.wasm?url'
import { testDB } from './utils'

const dialect = new WaSqliteDialect({
  async database() {
    const SQLiteAsyncModule = await SQLiteAsyncESMFactory({
      locateFile: () => WaSqliteURL,
    })

    const sqlite = Factory(SQLiteAsyncModule)
    const dbName = 'wa-sqlite-test'
    sqlite.vfs_register(new IDBBatchAtomicVFS(dbName))
    const db = await sqlite.open_v2(
      dbName,
      undefined,
      dbName,
    )
    return {
      sqlite,
      db,
    }
  },
})

export function useWaSqlite() {
  console.log('start wa-sqlite test')
  testDB(dialect).then((data) => {
    data?.forEach(e => console.log('[wa-sqlite]', e))
  })
}
