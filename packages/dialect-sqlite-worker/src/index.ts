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
  dbOption?: Options
  /**
   * db worker path
   * @default join(__dirname, 'worker.js')
   */
  workerPath?: string
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}

export class SqliteWorkerDialect implements Dialect {
  private config: SqliteWorkerDialectConfig

  /**
   * dialect for better-sqlite, execute sql in `node:worker_threads`
   */
  constructor(config: SqliteWorkerDialectConfig) {
    this.config = config
  }

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
