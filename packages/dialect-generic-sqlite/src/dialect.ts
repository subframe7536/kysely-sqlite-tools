import type { IGenericSqlite, OnCreateConnection, Promisable } from './type'
import { BaseSqliteDialect } from './base'
import { GenericSqliteDriver } from './driver'

export class GenericSqliteDialect extends BaseSqliteDialect {
  /**
   * Dialect for generic SQLite that run SQLs in current thread
   *
   * @param executor function to create {@link IGenericSqlite}
   * @param onCreateConnection optional callback after connection created
   */
  constructor(
    executor: () => Promisable<IGenericSqlite>,
    onCreateConnection?: OnCreateConnection,
  ) {
    super(() => new GenericSqliteDriver(executor, onCreateConnection))
  }
}
