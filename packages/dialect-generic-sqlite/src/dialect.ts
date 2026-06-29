import { BaseSqliteDialect } from './base'
import { GenericSqliteDriver } from './driver'
import type { IGenericSqlite, OnCreateConnection, SqliteExecutorFactory } from './type'

export class GenericSqliteDialect extends BaseSqliteDialect {
  /**
   * Dialect for generic SQLite that run SQLs in current thread
   *
   * @param executor function to create {@link IGenericSqlite}
   * @param onCreateConnection optional callback after connection created
   */
  constructor(
    executor: SqliteExecutorFactory<IGenericSqlite>,
    onCreateConnection?: OnCreateConnection,
  ) {
    super(() => new GenericSqliteDriver(executor, onCreateConnection))
  }
}
