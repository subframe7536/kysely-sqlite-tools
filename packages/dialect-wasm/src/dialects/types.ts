import type { Promisable } from 'kysely-generic-sqlite'

export type SqliteParameters = readonly any[] | any[]

export interface CrSqliteDatabase {
  api: {
    changes: (db: number) => number | bigint
  }
  db: number
  close: () => Promisable<unknown>
  execA: <T extends unknown[]>(sql: string, bind?: SqliteParameters) => Promise<T[]>
  execO: <T>(sql: string, bind?: SqliteParameters) => Promise<T[]>
}

export interface NodeWasmStatement {
  iterate: (parameters?: any) => IterableIterator<unknown>
}

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

export interface OfficialPreparedStatement<
  Row extends Record<string, unknown> = Record<string, unknown>,
> {
  columnCount: number
  bind: (parameters: any) => unknown
  finalize: () => void
  get: (row: Row) => Row
  step: () => boolean
}

export interface OfficialWasmDatabase {
  changes: () => number | bigint
  close: () => Promisable<unknown>
  prepare: (sql: string) => OfficialPreparedStatement
  selectValue: (sql: string) => unknown
}

export interface SqlJsStatement<Row = Record<string, unknown>> {
  bind: (parameters?: any) => unknown
  free: () => void
  getAsObject: () => Row
  getColumnNames: () => readonly string[]
  step: () => boolean
}

export interface SqlJsDatabase {
  close: () => void
  exec: (sql: string) => Array<{ values: unknown[][] }>
  getRowsModified: () => number | bigint
  prepare: (sql: string) => SqlJsStatement
}
