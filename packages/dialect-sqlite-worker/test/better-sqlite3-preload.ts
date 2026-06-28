import Database from 'bun:sqlite'
import { mock } from 'bun:test'

export class BetterSqlite3Mock {
  readonly #db: Database

  constructor(filename?: string | Buffer) {
    this.#db = new Database(typeof filename === 'string' ? filename : ':memory:')
  }

  prepare(sql: string): {
    readonly reader: boolean
    all: (parameters?: readonly unknown[]) => unknown[]
    iterate: (parameters?: readonly unknown[]) => IterableIterator<unknown>
    run: (parameters?: readonly unknown[]) => { changes: number; lastInsertRowid: number | bigint }
  } {
    const stmt = this.#db.prepare(sql)
    const isReader = /^\s*(?:select|with|pragma)\b/i.test(sql) || /\breturning\b/i.test(sql)

    return {
      get reader() {
        return isReader
      },
      all: (parameters?: readonly unknown[]) => stmt.all(...((parameters as any[]) ?? [])),
      iterate: (parameters?: readonly unknown[]) => stmt.iterate(...((parameters as any[]) ?? [])),
      run: (parameters?: readonly unknown[]) => stmt.run(...((parameters as any[]) ?? [])),
    }
  }

  close(): void {
    this.#db.close()
  }
}

mock.module('better-sqlite3', () => ({
  default: BetterSqlite3Mock,
}))
