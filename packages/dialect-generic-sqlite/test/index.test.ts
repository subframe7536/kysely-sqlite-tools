import Database from 'better-sqlite3'
import { describe, expect, it } from 'vitest'

import { testCase } from '../../test-utils'
import { buildQueryFn, GenericSqliteDialect, parseBigInt } from '../src'

describe('generic sqlite dialect test', () => {
  it('better-sqlite3 executor', async () => {
    const db = new Database(':memory:')
    const dialect = new GenericSqliteDialect(() => ({
      db,
      query: buildQueryFn({
        all: (sql, parameters) => {
          const stmt = db.prepare(sql)
          if (stmt.reader) {
            return stmt.all(parameters ?? [])
          }
          stmt.run(parameters ?? [])
          return []
        },
        run: (sql, parameters) => {
          const { changes, lastInsertRowid } = db.prepare(sql).run(parameters ?? [])
          return {
            numAffectedRows: parseBigInt(changes),
            insertId: parseBigInt(lastInsertRowid),
          }
        },
      }),
      close: () => db.close(),
    }))

    await testCase(dialect, expect, false)
  })
})
