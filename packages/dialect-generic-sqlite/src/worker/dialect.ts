import { BaseSqliteDialect } from '../base'
import type { OnCreateConnection, SqliteExecutorFactory } from '../type'

import { GenericSqliteWorkerDriver } from './driver'
import type { IGenericSqliteWorkerExecutor, IGenericWorker } from './types'

/**
 * Dialect for generic SQLite implementations running queries in a worker
 * thread.
 *
 * @template T - the worker type (e.g. `Worker` or `globalThis.Worker`)
 * @template R - extra init data shape passed to the worker
 *
 * @param executor - factory returning an {@link IGenericSqliteWorkerExecutor}
 * @param onCreateConnection - optional callback after connection is established
 */
export class GenericSqliteWorkerDialect<
  T extends IGenericWorker,
  R extends Record<string, unknown>,
> extends BaseSqliteDialect {
  /**
   * Dialect for generic SQLite that run SQLs in worker thread
   *
   * @param executor function to create {@link IGenericSqliteWorkerExecutor}
   * @param onCreateConnection optional callback after connection created
   */
  constructor(
    executor: SqliteExecutorFactory<IGenericSqliteWorkerExecutor<T, R>>,
    onCreateConnection?: OnCreateConnection,
  ) {
    super(() => new GenericSqliteWorkerDriver(executor, onCreateConnection))
  }
}
