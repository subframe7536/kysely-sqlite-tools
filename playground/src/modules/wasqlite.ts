import { initSQLite } from '@subframe7536/sqlite-wasm'
import { useIdbStorage } from '@subframe7536/sqlite-wasm/idb'
import { WaSqliteDialect } from 'kysely-wasm'
import url from '@subframe7536/sqlite-wasm/wasm-async?url'
import { testDB } from './utils'

const dialect = new WaSqliteDialect({
  async database() {
    return await initSQLite(useIdbStorage('test idb', { url }))
  },
})

export function useWaSqlite() {
  console.log('start wa-sqlite test')
  testDB(dialect).then((data) => {
    data?.forEach(e => console.log('[wa-sqlite]', e))
  })
}
