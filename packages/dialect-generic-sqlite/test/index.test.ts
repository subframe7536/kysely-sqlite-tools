import Database from 'better-sqlite3'
import type { Generated } from 'kysely'
import { Kysely } from 'kysely'
import { describe, expect, it } from 'vitest'

import { testCase } from '../../test-utils'
import { buildQueryFn, GenericSqliteDialect, parseBigInt } from '../src'

interface IsolationDB {
  isolation: {
    id: Generated<number>
    name: string
  }
}

function createDialect(db = new Database(':memory:')): GenericSqliteDialect {
  return new GenericSqliteDialect(() => ({
    db,
    query: buildQueryFn({
      all: (sql, parameters) => {
        const stmt = db.prepare(sql)
        if (stmt.reader) {
          return stmt.all(parameters ?? [])
        }
        stmt.run(...(parameters ?? []))
        return []
      },
      run: (sql, parameters) => {
        const { changes, lastInsertRowid } = db.prepare(sql).run(...(parameters ?? []))
        return {
          numAffectedRows: parseBigInt(changes),
          insertId: parseBigInt(lastInsertRowid),
        }
      },
    }),
    close: () => db.close(),
  }))
}

describe('generic sqlite dialect test', () => {
  it('better-sqlite3 executor', async () => {
    await testCase(createDialect(), expect, { insertId: true, stream: false })
  })

  it('isolates requests across independent executors', async () => {
    const first = new Kysely<IsolationDB>({ dialect: createDialect() })
    const second = new Kysely<IsolationDB>({ dialect: createDialect() })

    try {
      await Promise.all([
        first.schema
          .createTable('isolation')
          .addColumn('id', 'integer', (builder) => builder.autoIncrement().primaryKey())
          .addColumn('name', 'text')
          .execute(),
        second.schema
          .createTable('isolation')
          .addColumn('id', 'integer', (builder) => builder.autoIncrement().primaryKey())
          .addColumn('name', 'text')
          .execute(),
      ])

      await Promise.all([
        first.insertInto('isolation').values({ name: 'first' }).execute(),
        second.insertInto('isolation').values({ name: 'second' }).execute(),
      ])

      const [firstRows, secondRows] = await Promise.all([
        first.selectFrom('isolation').select('name').execute(),
        second.selectFrom('isolation').select('name').execute(),
      ])

      expect(firstRows).toStrictEqual([{ name: 'first' }])
      expect(secondRows).toStrictEqual([{ name: 'second' }])
    } finally {
      await Promise.all([first.destroy(), second.destroy()])
    }
  })
})
