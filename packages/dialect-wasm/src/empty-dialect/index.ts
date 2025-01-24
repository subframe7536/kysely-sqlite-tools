import { DummyDriver } from 'kysely'
import { BaseSqliteDialect } from 'kysely-generic-sqlite'

/**
 * Should only be used to generate sql statements
 */
export class EmptyDialect extends BaseSqliteDialect {
  constructor() {
    super(() => new DummyDriver())
  }
}
