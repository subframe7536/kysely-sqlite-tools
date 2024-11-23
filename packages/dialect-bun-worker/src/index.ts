import type { DatabaseIntrospector, Dialect, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import type { BunWorkerDialectConfig } from './type'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { BunWorkerDriver } from './driver'

export type { BunWorkerDialectConfig, Promisable } from './type'
export { createOnMessageCallback } from './worker/utils'

export class BunWorkerDialect implements Dialect {
  /**
   * dialect for `bun:sqlite`, run sql in worker
   */
  constructor(
    private config?: BunWorkerDialectConfig,
  ) { }

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
