import type { DatabaseConnection, DatabaseIntrospector, Dialect, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { BunWorkerDriver } from './driver'
import type { Promisable } from './type'

export type BunWorkerDialectConfig = {
  /**
   * db file path
   *
   * @default ':memory:'
   */
  url?: string
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
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

export class BunWorkerDialect implements Dialect {
  private config?: BunWorkerDialectConfig
  /**
   * dialect for `bun:sqlite`, run sql in worker
   */
  constructor(config?: BunWorkerDialectConfig) {
    this.config = config
  }

  createDriver(): Driver {
    return new BunWorkerDriver(this.config)
  }

  createQueryCompiler(): QueryCompiler {
    return new SqliteQueryCompiler()
  }

  createAdapter(): DialectAdapter {
    return new SqliteAdapter()
  }

  createIntrospector(db: Kysely<any>): DatabaseIntrospector {
    return new SqliteIntrospector(db)
  }
}
