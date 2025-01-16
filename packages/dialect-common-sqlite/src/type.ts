import type { DatabaseConnection } from 'kysely'

export type Promisable<T> = T | Promise<T>

export interface CommonSqliteDB {
  close: () => Promisable<any>
  all: (
    sql: string,
    parameters?: any[] | readonly any[]
  ) => Promisable<any[]>
  run: (
    sql: string,
    parameters?: any[] | readonly any[]
  ) => Promisable<{ changes: number | bigint, lastInsertRowid: number | bigint }>
  iterater?: (
    isSelect: boolean,
    sql: string,
    parameters?: any[] | readonly any[],
    chunkSize?: number,
  ) => Iterable<any[]> | AsyncIterable<any[]>
}

export interface BaseSqliteDialectConfig {
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}
export interface CommonSqliteDialectConfig extends BaseSqliteDialectConfig {
  create: () => Promisable<CommonSqliteDB>
}
