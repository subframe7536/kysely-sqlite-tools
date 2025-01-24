import type { OnCreateConnection, Promisable } from '../type'
import type { IGenericSqliteWorker, IGenericWorker } from './types'
import { BaseSqliteDialect } from '../base'
import { GenericSqliteWorkerDriver } from './driver'

export class GenericSqliteWorkerDialect<
  T extends IGenericWorker,
  R extends Record<string, unknown>,
> extends BaseSqliteDialect {
  /**
   * Dialect for generic SQLite that run SQLs in worker thread
   *
   * @param executor function to create {@link IGenericSqliteWorker}
   * @param onCreateConnection optional callback after connection created
   */
  constructor(
    executor: () => Promisable<IGenericSqliteWorker<T, R>>,
    onCreateConnection?: OnCreateConnection,
  ) {
    super(() => new GenericSqliteWorkerDriver(executor, onCreateConnection))
  }
}
