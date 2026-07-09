import { BaseSqliteDialect } from './base'
import { GenericSqliteDriver } from './driver'
import type { IGenericSqlite, OnCreateConnection, SqliteExecutorFactory } from './type'

/**
 * Dialect for generic SQLite implementations running queries on the main
 * thread.
 *
 * @param executor - factory returning an {@link IGenericSqlite}
 * @param onCreateConnection - optional callback invoked after a connection is
 *   established
 */
export class GenericSqliteDialect extends BaseSqliteDialect {
  constructor(
    executor: SqliteExecutorFactory<IGenericSqlite>,
    onCreateConnection?: OnCreateConnection,
  ) {
    super(() => new GenericSqliteDriver(executor, onCreateConnection))
  }
}
