import type { DatabaseConnection } from 'kysely'

export type Promisable<T> = T | Promise<T>

export interface IGenericSqliteExecutor {
  close: () => Promisable<any>
  all: (
    sql: string,
    parameters?: any[] | readonly any[]
  ) => Promisable<any[]>
  run: (
    sql: string,
    parameters?: any[] | readonly any[]
  ) => Promisable<{ changes: number | bigint, lastInsertRowid: number | bigint }>
  iterator?: (
    isSelect: boolean,
    sql: string,
    parameters?: any[] | readonly any[],
  ) => IterableIterator<unknown> | AsyncIterableIterator<unknown>
}

export type OnCreateConnection = (connection: DatabaseConnection) => Promisable<void>

export interface IBaseSqliteDialectConfig {
  onCreateConnection?: OnCreateConnection
}
export interface IGenericSqliteDialectConfig extends IBaseSqliteDialectConfig {
  create: () => Promisable<IGenericSqliteExecutor>
}
