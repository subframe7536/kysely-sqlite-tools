import type { IGenericSqliteDialectConfig } from './type'
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
import { GenericSqliteDriver } from './driver'

export class GenericSqliteDialect implements Dialect {
  constructor(
    config: IGenericSqliteDialectConfig,
  ) {
    this.createDriver = () => new GenericSqliteDriver(config)
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
