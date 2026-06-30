import sqlite3InitModule from '@sqlite.org/sqlite-wasm'
import { OfficialWasmDialect } from 'kysely-wasm'

import { testDB } from './utils'

const dialect = new OfficialWasmDialect({
  database: async () => {
    const sqlite3 = (await sqlite3InitModule()).oo1
    if (!sqlite3) {
      return Promise.reject('fail to load sqlite')
    }
    const path = '/test.db'
    if (sqlite3.OpfsDb) {
      return new sqlite3.OpfsDb(path)
    }
    return new sqlite3.DB(path) as any
  },
})

onmessage = async () => {
  try {
    const rows = await testDB(dialect)
    postMessage({ type: 'result', rows })
  } catch (error) {
    postMessage({ type: 'error', error: error instanceof Error ? error.message : String(error) })
  }
}
