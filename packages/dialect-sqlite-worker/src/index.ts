import type { DatabaseIntrospector, Dialect, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import type { SqliteWorkerDialectConfig } from './type'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { SqliteWorkerDriver } from './driver'

export type { Promisable, SqliteWorkerDialectConfig } from './type'
export { createOnMessageCallback } from './worker/util'

export class SqliteWorkerDialect implements Dialect {
  /**
   * dialect for better-sqlite, execute sql in `node:worker_threads`
   */
  constructor(
    private config: SqliteWorkerDialectConfig,
  ) { }

  createDriver(): Driver {
    return new SqliteWorkerDriver(this.config)
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
