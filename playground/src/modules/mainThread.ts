import { SqlJsDialect } from 'kysely-wasm'
import InitSqlJS from 'sql.js'
import WasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import { ref } from 'vue'
import { loadFile, writeFile } from './indexeddb'
import { testDB } from './utils'

const dialect = new SqlJsDialect({
  async database() {
    const SQL = await InitSqlJS({
      // locateFile: file => `https://sql.js.org/dist/${file}`,
      locateFile: () => WasmUrl,
    })
    return new SQL.Database(await loadFile('sqljs'))
  },
  onWrite: {
    func(data) {
      console.log(`[sqljs] write to indexeddb, length: ${data.length}`)
      writeFile('sqljs', data)
    },
    isThrottle: true,
  },
})
export function useDB() {
  const result = ref()
  function run() {
    testDB(dialect).then((data) => {
      result.value = data
    })
  }

  return { result, run }
}
