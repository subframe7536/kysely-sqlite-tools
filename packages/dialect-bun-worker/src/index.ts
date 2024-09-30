import type { DatabaseIntrospector, Dialect, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import type { BunWorkerDialectConfig } from './type'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { BunWorkerDriver } from './driver'

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
