import type { Options } from 'better-sqlite3'
import type { IBaseSqliteDialectConfig, Promisable } from 'kysely-generic-sqlite'

import path from 'node:path'
import { Worker } from 'node:worker_threads'

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
   * @default join(__dirname, 'worker.js')
   */
  workerPath?: string
}

export class SqliteWorkerDialect extends GenericSqliteWorkerDialect<Worker, {}> {
  constructor(config: SqliteWorkerDialectConfig) {
    const {
      source,
      dbOption,
      onCreateConnection,
      workerPath = path.join(__dirname, 'worker.js'),
    } = config
    super(
      async () => {
        const worker = new Worker(
          workerPath,
          {
            workerData: {
              src: typeof source === 'function' ? await source() : source,
              option: dbOption,
            },
          },
        )
        return {
          handle: handleNodeWorker,
          mitt: createNodeMitt(),
          worker,
        }
      },
      onCreateConnection,
    )
  }
}
