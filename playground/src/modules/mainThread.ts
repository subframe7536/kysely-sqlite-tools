import type { Database } from 'sql.js'

import { SqlJsDialect } from 'kysely-wasm'
import InitSqlJS from 'sql.js'
import WasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import { ref } from 'vue'

import { loadFile, writeFile } from './indexeddb'
import { testDB } from './utils'

let db: Database
const dialect = new SqlJsDialect({
  async database() {
    const SQL = await InitSqlJS({
      // locateFile: file => `https://sql.js.org/dist/${file}`,
      locateFile: () => WasmUrl,
    })
    db = new SQL.Database(await loadFile('sqljs'))
    return db
  },
})
export function useDB() {
  const result = ref()
  function run() {
    testDB(dialect).then((data) => {
      result.value = data
      writeFile('sqljs', db?.export())
    })
  }

  return { result, run }
}
