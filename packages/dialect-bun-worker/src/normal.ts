import type { BunSqliteDialectConfig } from './type'

import Database from 'bun:sqlite'
import { GenericSqliteDialect } from 'kysely-generic-sqlite'

import { createSqliteExecutor } from './worker/utils'

export class BunSqliteDialect extends GenericSqliteDialect {
  constructor(config?: BunSqliteDialectConfig) {
    const {
      url = ':memory:',
      cacheStatment = false,
      onCreateConnection,
    } = config || {}
    super(
      () => createSqliteExecutor(new Database(url), cacheStatment),
      onCreateConnection,
    )
  }
}
