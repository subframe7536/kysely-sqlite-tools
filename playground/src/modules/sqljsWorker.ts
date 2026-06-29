import { SqlJsDialect } from 'kysely-wasm'
import type { Database } from 'sql.js'
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
    const buffer = await loadFile('sqljsWorker')
    db = new SQL.Database(buffer?.toUint8Array())
    return db
  },
})
onmessage = () => {
  console.log('start sqljs worker test')
  testDB(dialect, () => {
    writeFile('sqljs', db?.export())
  }).then((data) => {
    data?.forEach((e) => console.log('[sqljs Worker]', e))
  })
}
