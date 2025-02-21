import type { InitData, WaSqliteWorkerDialectConfig } from './type'

import { isModuleWorkerSupport, isOpfsSupported } from '@subframe7536/sqlite-wasm'
import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
import { handleWebWorker } from 'kysely-generic-sqlite/worker-helper-web'
import { mitt } from 'zen-mitt'

export * from './type'
export * from './worker/utils'

export class WaSqliteWorkerDialect extends GenericSqliteWorkerDialect<globalThis.Worker, InitData> {
  constructor(config: WaSqliteWorkerDialectConfig) {
    const { onCreateConnection, worker, fileName, preferOPFS, url, message } = config
    super(
      async () => {
        const supportModule = isModuleWorkerSupport()
        const useOPFS = preferOPFS ? await isOpfsSupported() : false
        const m = mitt()
        await message?.(m)
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
              ? new Worker(new URL('worker.mjs', import.meta.url), { type: 'module' })
              : new Worker(new URL('worker.js', import.meta.url)),
          mitt: m,
          handle: handleWebWorker,
        }
      },
      onCreateConnection,
    )
  }
}
