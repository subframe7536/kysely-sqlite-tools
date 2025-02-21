import type { Database } from 'sql.js'

import { SqlJsDialect } from 'kysely-wasm'
import InitSqlJS from 'sql.js'
import WasmUrl from 'sql.js/dist/sql-wasm.wasm?url'

import { loadFile, writeFile } from './indexeddb'
import { testDB } from './utils'

let db: Database
const dialect = new SqlJsDialect({
  async database() {
    const SQL = await InitSqlJS({
      // locateFile: file => `https://sql.js.org/dist/${file}`,
      locateFile: () => WasmUrl,
    })
    db = new SQL.Database(await loadFile('sqljsWorker'))
    return db
  },
})
onmessage = () => {
  console.log('start sqljs worker test')
  testDB(dialect).then((data) => {
    data?.forEach(e => console.log('[sqljs Worker]', e))
    writeFile('sqljs', db?.export())
  })
}
