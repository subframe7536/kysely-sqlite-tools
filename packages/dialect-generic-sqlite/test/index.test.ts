import Database from 'bun:sqlite'
import { describe, expect, it } from 'bun:test'

import { testCase } from '../../test-utils'
import { GenericSqliteDialect, buildQueryFn, parseBigInt } from '../src'

describe('generic sqlite dialect test', () => {
  it('bun:sqlite executor', async () => {
    const dialect = new GenericSqliteDialect(() => {
      const db = new Database(':memory:')
      return {
        db,
        query: buildQueryFn({
          all: (sql, parameters) => db.prepare(sql).all(...((parameters as any[]) ?? [])),
          run: (sql, parameters) => {
            const { changes, lastInsertRowid } = db
              .prepare(sql)
              .run(...((parameters as any[]) ?? []))
            return {
              numAffectedRows: parseBigInt(changes),
              insertId: parseBigInt(lastInsertRowid),
            }
          },
        }),
        close: () => db.close(),
      }
    })

    await testCase(dialect, expect, false)
  })
})
