import Database from 'better-sqlite3'
import { describe, expect, it } from 'vitest'

import { testCase } from '../../test-utils'
import { TauriSqliteDialect } from '../src'

class TauriSqliteMock {
  readonly #db = new Database(':memory:')

  select(sql: string, parameters?: unknown[]): unknown[] {
    const stmt = this.#db.prepare(sql)
    if (stmt.reader) {
      return stmt.all(parameters ?? [])
    }
    stmt.run(parameters ?? [])
    return []
  }

  execute(
    sql: string,
    parameters?: unknown[],
  ): { rowsAffected: number; lastInsertId: number | bigint } {
    const { changes, lastInsertRowid } = this.#db.prepare(sql).run(parameters ?? [])
    return {
      rowsAffected: changes,
      lastInsertId: lastInsertRowid,
    }
  }

  close(): void {
    this.#db.close()
  }
}

describe('tauri sqlite dialect test', () => {
  it('mock tauri sqlite plugin', async () => {
    const dialect = new TauriSqliteDialect({
      database: new TauriSqliteMock() as never,
    })

    await testCase(dialect, expect, { insertId: true, stream: false })
  })
})
