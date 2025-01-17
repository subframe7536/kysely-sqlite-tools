import type { Promisable } from '../type'
import type { IGenericSqliteWorkerDialectConfig, IGenericWorker } from './type'
import {
  type DatabaseIntrospector,
  type Dialect,
  type DialectAdapter,
  type Driver,
  type Kysely,
  type QueryCompiler,
  SqliteAdapter,
  SqliteIntrospector,
  SqliteQueryCompiler,
} from 'kysely'
import { GenericSqliteWorkerDriver } from './driver'

export class GenericSqliteWorkerDialect<
  T extends IGenericWorker,
  R extends Record<string, unknown>,
> implements Dialect {
  constructor(
    config: () => Promisable<IGenericSqliteWorkerDialectConfig<T, R>>,
  ) {
    this.createDriver = () => new GenericSqliteWorkerDriver(config)
  }

  createDriver: () => Driver

  createQueryCompiler(): QueryCompiler {
    return new SqliteQueryCompiler()
  }

  createAdapter(): DialectAdapter {
    return new SqliteAdapter()
  }

  createIntrospector(db: Kysely<any>): DatabaseIntrospector {
    return new SqliteIntrospector(db)
  }
}
