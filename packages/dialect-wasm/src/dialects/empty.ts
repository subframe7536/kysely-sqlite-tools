import { DummyDriver } from 'kysely'
import { BaseSqliteDialect } from 'kysely-generic-sqlite'

/**
 * A no-op dialect that produces SQL strings without executing them.
 *
 * Useful for debugging, testing, or generating SQL offline.
 */
export class EmptyDialect extends BaseSqliteDialect {
  constructor() {
    super(() => new DummyDriver())
  }
}
