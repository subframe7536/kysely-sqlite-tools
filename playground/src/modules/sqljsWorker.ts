import { SqlJsDialect } from 'kysely-wasm'
import InitSqlJS from 'sql.js'
import { loadFile, writeFile } from './indexeddb'
import { testDB } from './utils'

const dialect = new SqlJsDialect({
  async database() {
    const SQL = await InitSqlJS({
      // locateFile: file => `https://sql.js.org/dist/${file}`,
      locateFile: () => new URL('../../node_modules/sql.js/dist/sql-wasm.wasm', import.meta.url).href,
    })
    return new SQL.Database(await loadFile('sqlijsWorker'))
  },
  onWrite: {
    func(data) {
      console.log(`[sqljs worker] write to indexeddb, length: ${data.length}`)
      writeFile('sqlijsWorker', data)
    },
  },
})
onmessage = () => {
  console.log('start sqljs test')
  testDB(dialect).then((data) => {
    data?.forEach(e => console.log('[sqlijs]', e))
  })
}
