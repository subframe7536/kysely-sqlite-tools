import type { IBaseSqliteDialectConfig } from 'kysely-generic-sqlite'

export interface WaSqliteWorkerDialectConfig extends IBaseSqliteDialectConfig {
  /**
   * File name for the SQLite database file.
   */
  fileName: string
  /**
   * Whether prefer to store data in OPFS
   * @default true
   */
  preferOPFS?: boolean
  /**
   * Custom SQLite worker
   *
   * The built-in worker uses the packaged worker entry.
   * It prefers module workers when the runtime supports them.
   * You can still provide a custom worker if you need explicit worker options.
   * @param supportModuleWorker whether the runtime supports `{ type: 'module' }` workers
   * @example
   * (supportModuleWorker) => supportModuleWorker
   *   ? new Worker(new URL('kysely-wasqlite-worker/worker', import.meta.url), {
   *       type: 'module',
   *       credentials: 'same-origin',
   *     })
   *   : new Worker(new URL('./my-classic-worker.js', import.meta.url))
   */
  worker?: Worker | ((supportModuleWorker: boolean) => Worker)
  /**
   * wasm URL
   *
   * When omitted, `@subframe7536/sqlite-wasm` resolves its default runtime asset.
   * @param useAsyncWasm if need to use wa-sqlite-async.wasm
   * @example
   * const sqliteWasmVersion = '1.3.0'
   * (useAsyncWasm) => useAsyncWasm
   *   ? `https://esm.sh/@subframe7536/sqlite-wasm@${sqliteWasmVersion}/dist/wa-sqlite-async.wasm`
   *   : new URL(`@subframe7536/sqlite-wasm/dist/wa-sqlite.wasm`, import.meta.url).href
   */
  url?: string | ((useAsyncWasm: boolean) => string)
}

/**
 * Initialization data passed to the worker.
 */
export type InitData = {
  fileName: string
  url?: string
  useOPFS?: boolean
}
