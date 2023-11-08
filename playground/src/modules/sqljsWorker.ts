import { SqlJsDialect } from 'kysely-wasm'
import InitSqlJS from 'sql.js'
import WasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import { loadFile, writeFile } from './indexeddb'
import { testDB } from './utils'

const dialect = new SqlJsDialect({
  async database() {
    const SQL = await InitSqlJS({
      // locateFile: file => `https://sql.js.org/dist/${file}`,
      locateFile: () => WasmUrl,
    })
    return new SQL.Database(await loadFile('sqljsWorker'))
  },
  onWrite: {
    func(data) {
      console.log(`[sqljs worker] write to indexeddb, length: ${data.length}`)
      writeFile('sqljsWorker', data)
    },
  },
})
onmessage = () => {
  console.log('start sqljs worker test')
  testDB(dialect).then((data) => {
    data?.forEach(e => console.log('[sqljs Worker]', e))
  })
}
