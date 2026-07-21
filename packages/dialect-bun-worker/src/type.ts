import type { Database } from 'bun:sqlite'

import type { IBaseSqliteDialectConfig } from 'kysely-generic-sqlite'

export type DBOptions = Exclude<ConstructorParameters<typeof Database>[1], undefined>

/**
 * Configuration for {@link BunWorkerDialect}.
 */
export type BunWorkerFactory = () => Worker

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
   * Custom worker instance or factory.
   *
   * A worker instance cannot be recreated after a failed initialization because
   * the driver terminates failed workers. Use a factory when retryable custom
   * worker initialization is required.
   */
  worker?: Worker | BunWorkerFactory
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
