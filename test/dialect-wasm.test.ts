import { Database } from 'node-sqlite3-wasm'
import InitSqlJs from 'sql.js'
import { describe, expect, it } from 'vitest'
import { NodeWasmDialect, SqlJsDialect } from '../packages/dialect-wasm/src'
import { testCase } from './utils'

describe('dialect test', () => {
  it('sql.js', async () => {
    const dialect = new SqlJsDialect({
      async database() {
        const SQL = await InitSqlJs()
        return new SQL.Database()
      },
    })
    await testCase(dialect, expect, false)
  })

  it('node-wasm', async () => {
    const dialect = new NodeWasmDialect({
      database: new Database(':memory:'),
    })
    await testCase(dialect, expect)
  })
})
