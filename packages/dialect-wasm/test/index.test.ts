import { describe, expect, it } from 'bun:test'

import { Database } from 'node-sqlite3-wasm'
import InitSqlJs from 'sql.js'

import { testCase } from '../../test-utils'
import { NodeWasmDialect, SqlJsDialect } from '../src'

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
