import Database from 'better-sqlite3'
import { Kysely, sql } from 'kysely'
import { Database as NodeWasmDatabase } from 'node-sqlite3-wasm'
import InitSqlJs from 'sql.js'
import { describe, expect, it, vi } from 'vitest'

import { testCase } from '../../test-utils'
import { CrSqliteDialect, NodeWasmDialect, SqlJsDialect } from '../src'
import type { CrSqliteDatabase, SqliteParameters } from '../src/dialects/types'

interface RawDb {
  value: {
    value: number
  }
}

class CrSqliteMock implements CrSqliteDatabase {
  readonly #db = new Database(':memory:')
  readonly api = {
    changes: () => this.#changes,
  }
  readonly db = 1
  #changes = 0

  readonly execASpy = vi.fn()
  readonly execOSpy = vi.fn()

  async execA<T extends unknown[]>(querySql: string, bind?: SqliteParameters): Promise<T[]> {
    this.execASpy(querySql, bind)
    const stmt = this.#db.prepare(querySql)

    if (stmt.reader) {
      return stmt.raw().all(bind ?? []) as T[]
    }

    const result = stmt.run(bind ?? [])
    this.#changes = result.changes
    return []
  }

  async execO<T>(querySql: string, bind?: SqliteParameters): Promise<T[]> {
    this.execOSpy(querySql, bind)
    return this.#db.prepare(querySql).all(bind ?? []) as T[]
  }

  close(): void {
    this.#db.close()
  }
}

describe('dialect test', () => {
  it('sql.js', async () => {
    const dialect = new SqlJsDialect({
      async database() {
        const SQL = await InitSqlJs()
        return new SQL.Database()
      },
    })
    await testCase(dialect, expect)
  })

  it('node-wasm', async () => {
    const dialect = new NodeWasmDialect({
      database: new NodeWasmDatabase(':memory:'),
    })
    await testCase(dialect, expect)
  })

  it('node-wasm executes classified raw select statements through all', async () => {
    const db = new Kysely<RawDb>({
      dialect: new NodeWasmDialect({
        database: new NodeWasmDatabase(':memory:'),
        isQuery: (querySql) => querySql === 'select 1 as value',
      }),
    })

    try {
      await expect(sql.raw('select 1 as value').execute(db)).resolves.toStrictEqual({
        rows: [{ value: 1 }],
      })
    } finally {
      await db.destroy()
    }
  })

  it('crsqlite executes classified raw select statements through execO', async () => {
    const crsqlite = new CrSqliteMock()
    const db = new Kysely<RawDb>({
      dialect: new CrSqliteDialect({
        database: crsqlite,
        isQuery: (querySql) => querySql === 'select 1 as value',
      }),
    })

    try {
      await db.schema.createTable('value').addColumn('value', 'integer').execute()
      await db.insertInto('value').values({ value: 2 }).execute()
      await expect(db.selectFrom('value').selectAll().execute()).resolves.toStrictEqual([
        { value: 2 },
      ])
      await expect(sql.raw('select 1 as value').execute(db)).resolves.toStrictEqual({
        rows: [{ value: 1 }],
      })
      expect(crsqlite.execOSpy).toHaveBeenCalledWith('select 1 as value', [])
      expect(crsqlite.execASpy).not.toHaveBeenCalledWith('select 1 as value', [])
    } finally {
      await db.destroy()
    }
  })
})
