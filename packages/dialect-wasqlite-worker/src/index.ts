import type { InitData, WaSqliteWorkerDialectConfig } from './type'
import { isModuleWorkerSupport, isOpfsSupported } from '@subframe7536/sqlite-wasm'
import { createWebWorkerDialectConfig } from 'kysely-generic-sqlite/web-helper'
import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
import { mitt } from 'zen-mitt'

export { createOnMessageCallback } from './worker/utils'

export class WaSqliteWorkerDialect extends GenericSqliteWorkerDialect<globalThis.Worker, InitData> {
  constructor(config: WaSqliteWorkerDialectConfig) {
    const { onCreateConnection, worker, fileName, preferOPFS, url } = config
    const supportModule = isModuleWorkerSupport()
    super(
      createWebWorkerDialectConfig({
        data: async () => {
          const useOPFS = preferOPFS ? await isOpfsSupported() : false
          return {
            fileName,
            useOPFS,
            url: typeof url === 'function' ? url(!useOPFS) : url,
          }
        },
        worker: worker
          ? worker instanceof globalThis.Worker
            ? worker
            : () => worker(supportModule)
          : supportModule
            ? new Worker(new URL('worker.mjs', import.meta.url), { type: 'module' })
            : new Worker(new URL('worker.js', import.meta.url)),
        mitt: mitt(),
      }),
      onCreateConnection,
    )
  }
}
