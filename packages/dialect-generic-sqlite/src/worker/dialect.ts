import type { Promisable } from '../type'
import type { IGenericSqliteWorkerDialectConfig, IGenericWorker } from './type'
import { BaseSqliteDialect } from '../dialect'
import { GenericSqliteWorkerDriver } from './driver'

export class GenericSqliteWorkerDialect<
  T extends IGenericWorker,
  R extends Record<string, unknown>,
> extends BaseSqliteDialect {
  constructor(config: () => Promisable<IGenericSqliteWorkerDialectConfig<T, R>>) {
    super(() => new GenericSqliteWorkerDriver(config))
  }
}
