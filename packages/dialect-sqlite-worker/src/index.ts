import type { DatabaseConnection, DatabaseIntrospector, Dialect, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import type { Options } from 'better-sqlite3'
import { SqliteWorkerDriver } from './driver'
import type { Promisable } from './type'

export type SqliteWorkerDialectConfig = {
  /**
   * db file path or existing buffer
   */
  source: string | Buffer | (() => Promisable<string | Buffer>)
  /**
   * better-sqlite3 initiate option
   */
  option?: Options
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
  /**
   * use built-in pragmas
   */
  usePRAGMA?: boolean
}

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
