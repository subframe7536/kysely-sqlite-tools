import type { BunWorkerDialectConfig, InitData } from './type'
import { createNodeMitt } from 'kysely-generic-sqlite/node-helper'
import { handleWebWorker } from 'kysely-generic-sqlite/web-helper'
import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'

export type { BunWorkerDialectConfig, Promisable } from './type'
export { createOnMessageCallback } from './worker/utils'

export class BunWorkerDialect extends GenericSqliteWorkerDialect<globalThis.Worker, InitData> {
  /**
   * dialect for `bun:sqlite`, run sql in worker
   */
  constructor(
    config?: BunWorkerDialectConfig,
  ) {
    const {
      url: fileName = ':memory:',
      cacheStatment: cache = false,
      onCreateConnection,
      worker = new Worker(
        new URL('./worker', import.meta.url),
        { type: 'module' },
      ),
    } = config || {}
    super(
      () => ({
        data: { cache, fileName },
        mitt: createNodeMitt(),
        handle: handleWebWorker,
        worker,
      }),
      onCreateConnection,
    )
  }
}
