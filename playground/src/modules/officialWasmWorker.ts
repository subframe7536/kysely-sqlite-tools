import { OfficialWasmDialect, optimzePragma } from 'kysely-wasm'
import sqlite3InitModule from '@sqlite.org/sqlite-wasm'
import { testDB } from './utils'

const dialect = new OfficialWasmDialect({
  database: async () => {
    const sqlite3 = (await sqlite3InitModule()).oo1
    if (!sqlite3) {
      return Promise.reject('fail to load sqlite')
    }
    const path = '/test.db'
    if (sqlite3.OpfsDb) {
      console.log('support OPFS')
      return new sqlite3.OpfsDb(path)
    }
    console.log('doesn\'t support OPFS')
    return new sqlite3.DB(path)
  },
  async onCreateConnection(connection) {
    await optimzePragma(connection)
  },
})

onmessage = () => {
  console.log('start official wasm test')
  testDB(dialect).then((data) => {
    data?.forEach(e => console.log('[official wasm]', e))
  })
}
