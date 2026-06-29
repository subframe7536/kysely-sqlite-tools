import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
import { createNodeMitt } from 'kysely-generic-sqlite/worker-helper-node'
import { handleWebWorker } from 'kysely-generic-sqlite/worker-helper-web'

import type { BunWorkerDialectConfig, InitData } from './type'

export * from './type'
export * from './worker/utils'

export class BunWorkerDialect extends GenericSqliteWorkerDialect<globalThis.Worker, InitData> {
  /**
   * dialect for `bun:sqlite`, run sql in worker
   */
  constructor(config?: BunWorkerDialectConfig) {
    let {
      url: fileName = ':memory:',
      cacheStatement = false,
      onCreateConnection,
      worker,
      dbOptions: opt = { create: true },
    } = config || {}
    if (!worker) {
      worker = new Worker(new URL('./worker', import.meta.url), { type: 'module' })
    }
    super(
      () => ({
        data: { cache: cacheStatement, fileName, opt },
        mitt: createNodeMitt(),
        handle: handleWebWorker,
        worker,
      }),
      onCreateConnection,
    )
  }
}
