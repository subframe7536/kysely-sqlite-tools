import type { BunSqliteDialectConfig } from './type'

import Database from 'bun:sqlite'
import { GenericSqliteDialect } from 'kysely-generic-sqlite'

import { createSqliteExecutor } from './executor'

export class BunSqliteDialect extends GenericSqliteDialect {
  constructor(config?: BunSqliteDialectConfig) {
    const {
      url = ':memory:',
      cacheStatment = false,
      onCreateConnection,
      dbOptions = { create: true },
    } = config || {}
    super(
      () => createSqliteExecutor(new Database(url, dbOptions), cacheStatment),
      onCreateConnection,
    )
  }
}
