import type { DatabaseConnection, DatabaseIntrospector, Dialect, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { WaSqliteWorkerDriver } from './driver'

export interface WaSqliteWorkerDialectConfig {
  url: string
  dbName: string
  worker?: Worker
  onCreateConnection?: (connection: DatabaseConnection) => Promise<void>
}
export class WaSqliteWorkerDialect implements Dialect {
  readonly #config: WaSqliteWorkerDialectConfig
  constructor(config: WaSqliteWorkerDialectConfig) {
    this.#config = config
  }

  createDriver(): Driver {
    return new WaSqliteWorkerDriver(this.#config)
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
