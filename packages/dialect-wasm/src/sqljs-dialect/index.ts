import type { DatabaseConnection, Driver } from 'kysely'
import { BaseDialect } from '../baseDialect'
import { SqlJsDriver } from './driver'
import type { SqlJSDB } from './type'

export interface SqlJsDialectConfig {
  database: SqlJSDB | (() => Promise<SqlJSDB>)
  onWrite?: {
    func: (buffer: Uint8Array) => void
    /**
     * whether to merge multiple writes
     */
    isThrottle?: boolean
    /**
     * merge all writes in [delay] time
     */
    delay?: number
    /**
     * If more than [maxCalls] writes are called, write immediately
     */
    maxCalls?: number
  }
  onCreateConnection?: (connection: DatabaseConnection) => Promise<void>
}
export class SqlJsDialect extends BaseDialect {
  readonly #config: SqlJsDialectConfig

  /**
   * currently no support for bigint
   */
  constructor(config: SqlJsDialectConfig) {
    super()
    this.#config = config
  }

  createDriver(): Driver {
    return new SqlJsDriver(this.#config)
  }
}
