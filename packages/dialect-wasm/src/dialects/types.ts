import type { Promisable } from 'kysely-generic-sqlite'

/** Bound parameter values for a SQL statement. */
export type SqliteParameters = readonly any[] | any[]

/**
 * Minimal interface for a
 * {@link https://vlcn.io/js/wasm | cr-sqlite} database handle.
 */
export interface CrSqliteDatabase {
  api: {
    changes: (db: number) => number | bigint
  }
  db: number
  close: () => Promisable<unknown>
  execA: <T extends unknown[]>(sql: string, bind?: SqliteParameters) => Promise<T[]>
  execO: <T>(sql: string, bind?: SqliteParameters) => Promise<T[]>
}

/** A prepared statement returned by `node-sqlite3-wasm`. */
export interface NodeWasmStatement {
  iterate: (parameters?: any) => IterableIterator<unknown>
}

/**
 * Minimal interface for a
 * {@link https://github.com/tndrle/node-sqlite3-wasm | node-sqlite3-wasm} database handle.
 */
export interface NodeWasmDatabase {
  all: (sql: string, parameters?: any, options?: any) => Promisable<any[]>
  close: () => Promisable<unknown>
  prepare: (sql: string) => NodeWasmStatement
  run: (
    sql: string,
    parameters?: any,
  ) => {
    changes: number | bigint
    lastInsertRowid: number | bigint
  }
}

/** A prepared statement returned by the official SQLite WASM build. */
export interface OfficialPreparedStatement<
  Row extends Record<string, unknown> = Record<string, unknown>,
> {
  columnCount: number
  bind: (parameters: any) => unknown
  finalize: () => void
  get: (row: Row) => Row
  step: () => boolean
}

/**
 * Minimal interface for the
 * {@link https://sqlite.org/wasm/doc/trunk/index.md | official SQLite WASM} database handle.
 */
export interface OfficialWasmDatabase {
  changes: () => number | bigint
  close: () => Promisable<unknown>
  prepare: (sql: string) => OfficialPreparedStatement
  selectValue: (sql: string) => unknown
}

/** A prepared statement returned by sql.js. */
export interface SqlJsStatement<Row = Record<string, unknown>> {
  bind: (parameters?: any) => unknown
  free: () => void
  getAsObject: () => Row
  getColumnNames: () => readonly string[]
  step: () => boolean
}

/**
 * Minimal interface for a
 * {@link https://github.com/sql-js/sql.js | sql.js} database handle.
 */
export interface SqlJsDatabase {
  close: () => void
  exec: (sql: string) => Array<{ values: unknown[][] }>
  getRowsModified: () => number | bigint
  prepare: (sql: string) => SqlJsStatement
}
