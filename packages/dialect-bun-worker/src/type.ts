import type { Database } from 'bun:sqlite'

import type { IBaseSqliteDialectConfig } from 'kysely-generic-sqlite'

export type DBOptions = Exclude<ConstructorParameters<typeof Database>[1], undefined>

/**
 * Configuration for {@link BunWorkerDialect}.
 */
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
  /**
   * use `bun:sqlite` built-in statement cache
   * @see https://bun.sh/docs/api/sqlite#query
   */
  cacheStatement?: boolean
  /**
   * custom worker, default is a worker that use bun:sqlite
   */
  worker?: Worker
}

/**
 * Initialization data passed to the worker.
 */
export type InitData = {
  fileName: string
  cache: boolean
  opt: DBOptions
}

/**
 * Configuration for {@link BunSqliteDialect}.
 */
export interface BunSqliteDialectConfig extends IBaseSqliteDialectConfig {
  /**
   * db file path
   *
   * @default ':memory:'
   */
  url?: string
  /**
   * use `bun:sqlite` built-in statement cache
   * @see https://bun.sh/docs/api/sqlite#query
   */
  cacheStatement?: boolean
  /**
   * DB constructor options
   * @default { create: true }
   */
  dbOptions?: DBOptions
}
