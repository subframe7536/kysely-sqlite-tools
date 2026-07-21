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
    const { onCreateConnection, worker, fileName, preferOPFS = true, url } = config
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
          : createBuiltInWorker(supportModule),
        handle: handleWebWorker,
      }
    }, onCreateConnection)
  }
}

function createBuiltInWorker(supportModuleWorker: boolean): Worker {
  if (!supportModuleWorker) {
    throw new Error(
      'WaSqliteWorkerDialect requires module worker support for the built-in worker. Provide config.worker with a classic-compatible bundled worker for this browser.',
    )
  }

  return new Worker(new URL('worker.js', import.meta.url), { type: 'module' })
}
