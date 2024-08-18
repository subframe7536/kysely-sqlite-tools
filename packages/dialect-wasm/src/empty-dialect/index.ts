import { type Driver, DummyDriver } from 'kysely'
import { BaseDialect } from '../baseDialect'

/**
 * Should only be used to generate sql statements
 */
export class EmptyDialect extends BaseDialect {
  createDriver(): Driver {
    return new DummyDriver()
  }
}
