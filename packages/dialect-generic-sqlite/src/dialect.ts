import type { IGenericSqliteExecutor, OnCreateConnection, Promisable } from './type'
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
  /**
   * Dialect for generic usage of SQLite
   *
   * @param executor function to create {@link IGenericSqliteExecutor}
   * @param onCreateConnection optional callback after connection created
   */
  constructor(
    executor: () => Promisable<IGenericSqliteExecutor>,
    onCreateConnection?: OnCreateConnection,
  ) {
    super(() => new GenericSqliteDriver(executor, onCreateConnection))
  }
}
