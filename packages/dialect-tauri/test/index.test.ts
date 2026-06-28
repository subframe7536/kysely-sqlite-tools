import Database from 'bun:sqlite'
import { describe, expect, it } from 'bun:test'

import { testCase } from '../../test-utils'
import { TauriSqliteDialect } from '../src'

class TauriSqliteMock {
  readonly #db = new Database(':memory:')

  select(sql: string, parameters?: unknown[]): unknown[] {
    return this.#db.prepare(sql).all(...((parameters as any[]) ?? []))
  }

  execute(
    sql: string,
    parameters?: unknown[],
  ): { rowsAffected: number; lastInsertId: number | bigint } {
    const { changes, lastInsertRowid } = this.#db.prepare(sql).run(...((parameters as any[]) ?? []))
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

    await testCase(dialect, expect, false)
  })
})
