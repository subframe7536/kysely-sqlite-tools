import { Worker } from 'node:worker_threads'

import type { Options } from 'better-sqlite3'
import type { IBaseSqliteDialectConfig, Promisable } from 'kysely-generic-sqlite'
import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
import { createNodeMitt, handleNodeWorker } from 'kysely-generic-sqlite/worker-helper-node'

export * from './worker/utils'

export interface SqliteWorkerDialectConfig extends IBaseSqliteDialectConfig {
  /**
   * db file path or existing buffer
   */
  source: string | Buffer | (() => Promisable<string | Buffer>)
  /**
   * better-sqlite3 initiate option
   */
  dbOption?: Options
  /**
   * db worker path
   *
   * Defaults to the packaged worker file for the current runtime format:
   * `worker.mjs` for ESM and `worker.js` for CJS.
   */
  workerPath?: string
}

export class SqliteWorkerDialect extends GenericSqliteWorkerDialect<Worker, {}> {
  constructor(config: SqliteWorkerDialectConfig) {
    const {
      source,
      dbOption,
      onCreateConnection,
      workerPath = new URL(
        import.meta.url.endsWith('.mjs') ? './worker.mjs' : './worker.js',
        import.meta.url,
      ),
    } = config
    super(async () => {
      const worker = new Worker(workerPath, {
        workerData: {
          src: typeof source === 'function' ? await source() : source,
          option: dbOption,
        },
      })
      return {
        handle: handleNodeWorker,
        mitt: createNodeMitt(),
        worker,
      }
    }, onCreateConnection)
  }
}
