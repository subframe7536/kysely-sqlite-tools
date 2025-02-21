import type { BunWorkerDialectConfig, InitData } from './type'

import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
import { createNodeMitt } from 'kysely-generic-sqlite/worker-helper-node'
import { handleWebWorker } from 'kysely-generic-sqlite/worker-helper-web'

export * from './type'
export * from './worker/utils'

export class BunWorkerDialect extends GenericSqliteWorkerDialect<globalThis.Worker, InitData> {
  /**
   * dialect for `bun:sqlite`, run sql in worker
   */
  constructor(config?: BunWorkerDialectConfig) {
    const {
      url: fileName = ':memory:',
      cacheStatment: cache = false,
      onCreateConnection,
      worker = new Worker(
        new URL('./worker', import.meta.url),
        { type: 'module' },
      ),
      dbOptions: opt = { create: true },
    } = config || {}
    super(
      () => ({
        data: { cache, fileName, opt },
        mitt: createNodeMitt(),
        handle: handleWebWorker,
        worker,
      }),
      onCreateConnection,
    )
  }
}
