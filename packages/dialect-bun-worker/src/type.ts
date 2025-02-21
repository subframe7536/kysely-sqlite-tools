import type Database from 'bun:sqlite'
import type { IBaseSqliteDialectConfig } from 'kysely-generic-sqlite'

export type DBOptions = Exclude<ConstructorParameters<typeof Database>[1], undefined>

export interface BunWorkerDialectConfig extends IBaseSqliteDialectConfig {
  /**
   * DB file path
   *
   * @default ':memory:'
   */
  url?: string
  /**
   * DB constructor options
   * @default { create: true }
   */
  dbOptions?: DBOptions
  cacheStatment?: boolean
  /**
   * custom worker, default is a worker that use bun:sqlite
   */
  worker?: Worker
}

export type InitData = {
  fileName: string
  cache: boolean
  opt: DBOptions
}

export interface BunSqliteDialectConfig extends IBaseSqliteDialectConfig {
  /**
   * db file path
   *
   * @default ':memory:'
   */
  url?: string
  /**
   * use `bun:sqlite` built-in statment cache
   * @see https://bun.sh/docs/api/sqlite#query
   */
  cacheStatment?: boolean
  /**
   * DB constructor options
   * @default { create: true }
   */
  dbOptions?: DBOptions
}
