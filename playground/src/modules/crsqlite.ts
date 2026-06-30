import initWasm from '@vlcn.io/crsqlite-wasm'
import wasmUrl from '@vlcn.io/crsqlite-wasm/crsqlite.wasm?url'
import { CrSqliteDialect } from 'kysely-wasm'

import { testDB } from './utils'

const dialect = new CrSqliteDialect({
  database: async () => {
    const sqlite = await initWasm(() => wasmUrl)
    const db = await sqlite.open('crsqlite.db')
    return db
  },
})
export function testCRSqlite() {
  return testDB(dialect)
}
