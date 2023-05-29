import * as SQLite from 'wa-sqlite'
import SQLiteAsyncESMFactory from 'wa-sqlite/dist/wa-sqlite-async.mjs'
import { IDBBatchAtomicVFS } from 'wa-sqlite/src/examples/IDBBatchAtomicVFS.js'
import { WaSqliteDialect } from 'kysely-wasm'
import WaSqliteURL from 'wa-sqlite/dist/wa-sqlite-async.wasm?url'
import { testDB } from './utils'

const dialect = new WaSqliteDialect({
  async database() {
    const SQLiteAsyncModule = await SQLiteAsyncESMFactory({
      locateFile: () => WaSqliteURL,
    })

    const sqlite = SQLite.Factory(SQLiteAsyncModule)
    const dbName = 'wa-sqlite-test'
    sqlite.vfs_register(new IDBBatchAtomicVFS(dbName))
    const db = await sqlite.open_v2(
      dbName, undefined, dbName,
    )
    return {
      sqlite,
      db,
    }
  },
})

onmessage = () => {
  console.log('start wa-sqlite test')
  testDB(dialect).then((data) => {
    data?.forEach(e => console.log('[wa-sqlite]', e))
  })
}
