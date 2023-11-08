import type { DatabaseConnection, Driver } from 'kysely'
import type { Promisable } from '../types'
import { BaseDialect } from '../baseDialect'
import { SqlJsDriver } from './driver'
import type { SqlJSDB } from './type'

export interface SqlJsDialectConfig {
  database: SqlJSDB | (() => Promisable<SqlJSDB>)
  onWrite?: {
    func: (buffer: Uint8Array) => void
    /**
     * whether to merge multiple writes
     */
    isThrottle?: boolean
    /**
     * merge all writes in [delay] ms
     * @default 2000
     */
    delay?: number
    /**
     * If more than [maxCalls] writes are called, write immediately
     * @default 1000
     */
    maxCalls?: number
  }
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}
export class SqlJsDialect extends BaseDialect {
  private config: SqlJsDialectConfig

  /**
   * dialect for [sql.js](https://github.com/sql-js/sql.js)
   *
   * no support for bigint
   */
  constructor(config: SqlJsDialectConfig) {
    super()
    this.config = config
  }

  createDriver(): Driver {
    return new SqlJsDriver(this.config)
  }
}
