import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
import { handleWebWorker } from 'kysely-generic-sqlite/worker-helper-web'

import type { BunWorkerDialectConfig, InitData } from './type'

export * from './type'
export * from './worker/utils'

export class BunWorkerDialect extends GenericSqliteWorkerDialect<globalThis.Worker, InitData> {
  /**
   * SQLite dialect for Bun, backed by `bun:sqlite` running in a web worker.
   *
   * Offloads all queries to a worker thread so the main thread stays responsive.
   */
  constructor(config?: BunWorkerDialectConfig) {
    let {
      url: fileName = ':memory:',
      cacheStatement = false,
      onCreateConnection,
      worker,
      dbOptions: opt = { create: true },
    } = config || {}
    super(
      () => ({
        data: { cache: cacheStatement, fileName, opt },
        handle: handleWebWorker,
        worker:
          typeof worker === 'function'
            ? worker()
            : (worker ?? new Worker(new URL('./worker', import.meta.url), { type: 'module' })),
      }),
      onCreateConnection,
    )
  }
}
