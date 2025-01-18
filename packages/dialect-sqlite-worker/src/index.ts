import type { Options } from 'better-sqlite3'
import type { IBaseSqliteDialectConfig, Promisable } from 'kysely-generic-sqlite'
import path from 'node:path'
import { Worker } from 'node:worker_threads'
import { createNodeWorkerDialectConfig } from 'kysely-generic-sqlite/node-helper'
import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'

export { createOnMessageCallback } from './worker/util'

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
      createNodeWorkerDialectConfig({
        worker: async () => new Worker(
          workerPath,
          {
            workerData: {
              src: typeof source === 'function' ? await source() : source,
              option: dbOption,
            },
          },
        ),
      }),
      onCreateConnection,
    )
  }
}
