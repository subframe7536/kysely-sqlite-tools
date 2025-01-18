import type { OnCreateConnection, Promisable } from '../type'
import type { IGenericSqliteWorkerExecutor, IGenericWorker } from './types'
import { BaseSqliteDialect } from '../dialect'
import { GenericSqliteWorkerDriver } from './driver'

export class GenericSqliteWorkerDialect<
  T extends IGenericWorker,
  R extends Record<string, unknown>,
> extends BaseSqliteDialect {
  constructor(
    executor: () => Promisable<IGenericSqliteWorkerExecutor<T, R>>,
    onCreateConnection?: OnCreateConnection,
  ) {
    super(() => new GenericSqliteWorkerDriver(executor, onCreateConnection))
  }
}
