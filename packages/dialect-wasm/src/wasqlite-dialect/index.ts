import type { DatabaseConnection, Driver } from 'kysely'
import { BaseDialect } from '../baseDialect'
import { WaSqliteDriver } from './driver'
import type { WaSqliteDatabase } from './type'

export interface WaSqliteDialectConfig {
  database: WaSqliteDatabase | (() => Promise<WaSqliteDatabase>)
  onWrite?: {
    func: (buffer: Uint8Array) => void
    isThrottle?: boolean
    delay?: number
    maxCalls?: number
  }
  onCreateConnection?: (connection: DatabaseConnection) => Promise<void>
}
export class WaSqliteDialect extends BaseDialect {
  readonly #config: WaSqliteDialectConfig

  /**
   * currently no support for bigint
   */
  constructor(config: WaSqliteDialectConfig) {
    super()
    this.#config = config
  }

  createDriver(): Driver {
    return new WaSqliteDriver(this.#config)
  }
}
