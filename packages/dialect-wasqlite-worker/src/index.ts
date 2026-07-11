import { isModuleWorkerSupport, isOpfsSupported } from '@subframe7536/sqlite-wasm'
import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
import { handleWebWorker } from 'kysely-generic-sqlite/worker-helper-web'

import type { InitData, WaSqliteWorkerDialectConfig } from './type'

export * from './type'
export * from './worker/utils'

/**
 * SQLite dialect for the browser using
 * {@link https://github.com/subframe7536/sqlite-wasm | wa-sqlite} running in a
 * web worker.
 *
 * Supports OPFS and IndexedDB storage backends.
 */
export class WaSqliteWorkerDialect extends GenericSqliteWorkerDialect<globalThis.Worker, InitData> {
  /**
   * @param config - {@link WaSqliteWorkerDialectConfig}
   */
  constructor(config: WaSqliteWorkerDialectConfig) {
    const { onCreateConnection, worker, fileName, preferOPFS, url } = config
    super(async () => {
      const supportModule = isModuleWorkerSupport()
      const useOPFS = preferOPFS ? await isOpfsSupported() : false
      return {
        data: {
          fileName,
          useOPFS,
          url: typeof url === 'function' ? url(!useOPFS) : url,
        },
        worker: worker
          ? worker instanceof globalThis.Worker
            ? worker
            : worker(supportModule)
          : supportModule
            ? new Worker(new URL('worker.js', import.meta.url), { type: 'module' })
            : new Worker(new URL('worker.js', import.meta.url)),
        handle: handleWebWorker,
      }
    }, onCreateConnection)
  }
}
