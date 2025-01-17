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

export class BaseSqliteDialect implements Dialect {
  constructor(create: () => Driver) {
    this.createDriver = create
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

export class GenericSqliteDialect extends BaseSqliteDialect {
  constructor(config: IGenericSqliteDialectConfig) {
    super(() => new GenericSqliteDriver(config))
  }
}
