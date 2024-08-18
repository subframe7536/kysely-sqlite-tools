import type { DatabaseConnection, QueryResult } from 'kysely'

export type Promisable<T> = T | Promise<T>

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
   *   ? 'https://cdn.jsdelivr.net/gh/rhashimoto/wa-sqlite@v1.0.0/dist/wa-sqlite-async.wasm'
   *   : new URL('kysely-wasqlite-worker/wasm-sync', import.meta.url).href
   */
  url?: string | ((useAsyncWasm: boolean) => string)
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}

type RunMsg = [
  type: 1,
  isSelect: boolean,
  sql: string,
  parameters?: readonly unknown[],
]
type StreamMsg = [
  type: 3,
  sql: string,
  parameters?: readonly unknown[],
]

type InitMsg = [
  type: 0,
  url: string,
  fileName: string,
  useOPFS: boolean,
]

type CloseMsg = [2]
export type MainMsg = InitMsg | RunMsg | CloseMsg | StreamMsg

export type WorkerMsg = {
  [K in keyof Events]: [
    type: K,
    data: Events[K],
    err: unknown,
  ]
}[keyof Events]
type Events = {
  0: null
  1: QueryResult<any> | null
  2: null
  3: QueryResult<any>[] | null
  4: null
}
export type EventWithError = {
  [K in keyof Events]: [data: Events[K], err: unknown]
}
