import type { DatabaseConnection } from 'kysely'

export type Promisable<T> = T | Promise<T>

export type BunWorkerDialectConfig = {
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
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}

export type InitData = {
  cache: boolean
}
