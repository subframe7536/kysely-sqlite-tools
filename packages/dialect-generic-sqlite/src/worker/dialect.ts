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

export class GenericSqliteWorkerDialect<T extends IGenericWorker> implements Dialect {
  constructor(
    private config: IGenericSqliteWorkerDialectConfig<T>,
  ) {}

  createDriver(): Driver {
    return new GenericSqliteWorkerDriver<T>(this.config)
  }

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
