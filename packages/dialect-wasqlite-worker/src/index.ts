import type { DatabaseConnection, DatabaseIntrospector, Dialect, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { WaSqliteWorkerDriver } from './driver'
import type { Promisable } from './type'

export interface WaSqliteWorkerDialectConfig {
  /**
   * db file name
   */
  fileName: string
  /**
   * prefer to store data in OPFS
   * @default true
   */
  preferOPFS?: boolean
  /**
   * wasqlite worker
   *
   * built-in: {@link useDefaultWorker}
   * @param supportModuleWorker if support `{ type: 'module' }` in worker options
   * @example
   * import { useDefaultWorker } from 'kysely-wasqlite-worker'
   * @example
   * (supportModuleWorker) => supportModuleWorker
   *   ? new Worker(
   *       new URL('kysely-wasqlite-worker/worker-module', import.meta.url),
   *       { type: 'module', credentials: 'same-origin' }
   *     )
   *   : new Worker(
   *       new URL('kysely-wasqlite-worker/worker-classic', import.meta.url),
   *       { type: 'classic', name: 'test' }
   *     )
   */
  worker?: Worker | ((supportModuleWorker: boolean) => Worker)
  /**
   * wasm URL
   *
   * built-in: {@link useDefaultWasmURL}
   * @param useAsyncWasm if need to use wa-sqlite-async.wasm
   * @example
   * import { useDefaultWasmURL } from 'kysely-wasqlite-worker'
   * @example
   * (useAsyncWasm) => useAsyncWasm
   *   ? 'https://cdn.jsdelivr.net/gh/rhashimoto/wa-sqlite@v0.9.9/dist/wa-sqlite-async.wasm'
   *   : new URL('kysely-wasqlite-worker/wasm-sync', import.meta.url).href
   */
  url?: string | ((useAsyncWasm: boolean) => string)
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}

export { isIdbSupported, isOpfsSupported, isModuleWorkerSupport } from '@subframe7536/sqlite-wasm'

export class WaSqliteWorkerDialect implements Dialect {
  readonly #config: WaSqliteWorkerDialectConfig

  /**
   * dialect for [`wa-sqlite`](https://github.com/rhashimoto/wa-sqlite),
   * execute sql in `Web Worker`,
   * store data in [OPFS](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) or IndexedDB
   *
   * @example
   * import { WaSqliteWorkerDialect } from 'kysely-wasqlite-worker'
   *
   * const dialect = new WaSqliteWorkerDialect({
   *   fileName: 'test',
   * })
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
