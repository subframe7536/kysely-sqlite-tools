import type { DatabaseConnection, Driver } from 'kysely'
import type { Promisable } from '../types'
import type { CrSqliteDB } from './type'
import { BaseDialect } from '../baseDialect'
import { CrSqliteDriver } from './driver'

export interface CrSqliteDialectConfig {
  database: CrSqliteDB | (() => Promisable<CrSqliteDB>)
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}
export class CrSqliteDialect extends BaseDialect {
  private config: CrSqliteDialectConfig
  /**
   * dialect for [vlcn.io/wasm](https://vlcn.io/js/wasm)
   */
  constructor(config: CrSqliteDialectConfig) {
    super()
    this.config = config
  }

  createDriver(): Driver {
    return new CrSqliteDriver(this.config)
  }
}
