import type { DatabaseIntrospector, Dialect, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { SqliteWorkerDriver } from './driver'
import type { SqliteWorkerDialectConfig } from './type'

export class SqliteWorkerDialect implements Dialect {
  #config: SqliteWorkerDialectConfig
  constructor(config: SqliteWorkerDialectConfig) {
    this.#config = config
  }

  createDriver(): Driver {
    return new SqliteWorkerDriver(this.#config)
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
