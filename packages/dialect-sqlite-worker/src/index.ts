import { join } from 'node:path'
import { Worker } from 'node:worker_threads'

import type { Options } from 'better-sqlite3'
import { access } from 'kysely-generic-sqlite'
import type { IBaseSqliteDialectConfig, Promisable } from 'kysely-generic-sqlite'
import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
import { handleNodeWorker } from 'kysely-generic-sqlite/worker-helper-node'

export * from './worker/utils'

/**
 * Configuration for {@link SqliteWorkerDialect}.
 */
export interface SqliteWorkerDialectConfig extends IBaseSqliteDialectConfig {
  /**
   * SQLite database file path or an existing buffer.
   */
  source: string | Buffer | (() => Promisable<string | Buffer>)
  /**
   * Options forwarded to the `better-sqlite3` constructor.
   */
  dbOption?: Options
  /**
   * Path to a custom worker script.
   *
   * When omitted the built-in worker is used.
   */
  workerPath?: string
}

/**
 * SQLite dialect for Node.js using `better-sqlite3` running in a worker thread.
 */
export class SqliteWorkerDialect extends GenericSqliteWorkerDialect<Worker, {}> {
  /**
   * @param config - {@link SqliteWorkerDialectConfig}
   */
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
          src: await access(source),
          option: dbOption,
        },
      })
      return {
        handle: handleNodeWorker,
        worker,
      }
    }, onCreateConnection)
  }
}
