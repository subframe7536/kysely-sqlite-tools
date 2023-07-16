import type { DatabaseConnection, DatabaseIntrospector, Dialect, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { WaSqliteWorkerDriver } from './driver'

export interface WaSqliteWorkerDialectConfig {
  dbName: string
  /**
   * the URL of wa-sqlite WASM
   * @example
   * ```ts
   * // vite
   * import url from 'kysely-wasqlite-worker/dist/wa-sqlite-async.wasm?url'
   * ```
   */
  url?: string
  /**
   * worker for executing sql
   * @example
   * ```ts
   * // vite
   * import Worker from 'kysely-wasqlite-worker/dist/worker?worker'
   * ```
   */
  worker?: Worker
  onCreateConnection?: (connection: DatabaseConnection) => Promise<void>
  /**
   * use built-in pragmas
   */
  usePRAGMA?: boolean
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
