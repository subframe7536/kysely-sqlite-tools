import type { IBaseSqliteDialectConfig } from 'kysely-generic-sqlite'

export type Promisable<T> = T | Promise<T>

export interface BunWorkerDialectConfig extends IBaseSqliteDialectConfig {
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
   * custom worker, default is a worker that use bun:sqlite
   */
  worker?: Worker
}

export type InitData = {
  fileName: string
  cache: boolean
}
