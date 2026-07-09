import Database from 'bun:sqlite'

import { GenericSqliteDialect } from 'kysely-generic-sqlite'

import { createSqliteExecutor } from './executor'
import type { BunSqliteDialectConfig } from './type'

export type { BunSqliteDialectConfig } from './type'

/**
 * SQLite dialect for Bun, backed by `bun:sqlite`.
 *
 * Runs SQL on the main thread.
 */
export class BunSqliteDialect extends GenericSqliteDialect {
  constructor(config?: BunSqliteDialectConfig) {
    const {
      url = ':memory:',
      cacheStatement = false,
      onCreateConnection,
      dbOptions = { create: true },
    } = config || {}
    super(
      () => createSqliteExecutor(new Database(url, dbOptions), cacheStatement),
      onCreateConnection,
    )
  }
}
