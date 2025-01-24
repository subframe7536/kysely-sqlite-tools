import type { IBaseSqliteDialectConfig, Promisable } from 'kysely-generic-sqlite'
import type { IGenericEventEmitter } from 'kysely-generic-sqlite/worker'

export interface WaSqliteWorkerDialectConfig extends IBaseSqliteDialectConfig {
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
   *   ? 'https://cdn.jsdelivr.net/gh/rhashimoto/wa-sqlite@v1.0.0/dist/wa-sqlite-async.wasm'
   *   : new URL('kysely-wasqlite-worker/wasm-sync', import.meta.url).href
   */
  url?: string | ((useAsyncWasm: boolean) => string)
  /**
   * Handle custom messages for event emitter
   * @param mitt event emitter
   */
  message?: (mitt: IGenericEventEmitter) => Promisable<void>
}

export type InitData = {
  fileName: string
  url?: string
  useOPFS?: boolean
}
