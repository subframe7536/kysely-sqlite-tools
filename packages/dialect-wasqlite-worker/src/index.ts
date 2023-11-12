import type { DatabaseConnection, DatabaseIntrospector, Dialect, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { WaSqliteWorkerDriver } from './driver'
import type { Promisable } from './type'

export { isIdbSupported as isSupported } from '@subframe7536/sqlite-wasm'
export interface WaSqliteWorkerDialectConfig {
  /**
   * db file name
   */
  fileName: string
  /**
   * the URL of `wa-sqlite` WASM
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
  /**
   * prefer to use OPFS, fallback to IndexedDB
   */
  preferOPFS?: boolean
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}
export class WaSqliteWorkerDialect implements Dialect {
  readonly #config: WaSqliteWorkerDialectConfig

  /**
   * dialect for [wa-sqlite](https://github.com/rhashimoto/wa-sqlite)
   *
   * execute sql in `Web Worker`, store data in IndexedDB
   */
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
