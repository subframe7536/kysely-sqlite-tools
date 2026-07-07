import { join } from 'node:path'
import { Worker } from 'node:worker_threads'

import type { Options } from 'better-sqlite3'
import type { IBaseSqliteDialectConfig, Promisable } from 'kysely-generic-sqlite'
import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
import { createNodeMitt, handleNodeWorker } from 'kysely-generic-sqlite/worker-helper-node'

export * from './worker/utils'

export interface SqliteWorkerDialectConfig extends IBaseSqliteDialectConfig {
  /**
   * DB file path or existing buffer
   */
  source: string | Buffer | (() => Promisable<string | Buffer>)
  /**
   * `better-sqlite3` initiate option
   */
  dbOption?: Options
  /**
   * Custom worker path
   */
  workerPath?: string
}

export class SqliteWorkerDialect extends GenericSqliteWorkerDialect<Worker, {}> {
  constructor(config: SqliteWorkerDialectConfig) {
    let { source, dbOption, onCreateConnection, workerPath } = config
    super(async () => {
      if (!workerPath) {
        // default worker path, cjs format here, will be transformed to esm format in tsdown.config.ts
        // CJS: path.join(__dirname, 'worker.cjs')
        // ESM: new URL('./worker.mjs', import.meta.url)
        workerPath = join(__dirname, 'worker.cjs')
      }
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
