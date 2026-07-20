import { describe, expect, it } from 'bun:test'
import { createRequire } from 'node:module'

import { Kysely, sql } from 'kysely'

const require = createRequire(import.meta.url)

describe('bun sqlite package', () => {
  it('executes a query through the CommonJS normal entry point', async () => {
    const { BunSqliteDialect } = require('../dist/normal.cjs')
    const db = new Kysely({ dialect: new BunSqliteDialect({ url: ':memory:' }) })

    try {
      const result = await sql<{ value: number }>`select 1 as value`.execute(db)
      expect(result.rows).toEqual([{ value: 1 }])
    } finally {
      await db.destroy()
    }
  })
})
