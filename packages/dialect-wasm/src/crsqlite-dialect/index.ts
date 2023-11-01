import type { DatabaseConnection, Driver } from 'kysely'
import type { Promisable } from '../types'
import { BaseDialect } from '../baseDialect'
import { CrSqliteDriver } from './driver'
import type { CrSqliteDB } from './type'

export interface CrSqliteDialectConfig {
  database: CrSqliteDB | (() => Promisable<CrSqliteDB>)
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}
export class CrSqliteDialect extends BaseDialect {
  #config: CrSqliteDialectConfig
  /**
   * dialect for [vlcn.io/wasm](https://vlcn.io/js/wasm)
   */
  constructor(config: CrSqliteDialectConfig) {
    super()
    this.#config = config
  }

  createDriver(): Driver {
    return new CrSqliteDriver(this.#config)
  }
}
