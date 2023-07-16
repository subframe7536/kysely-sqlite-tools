import type { DatabaseConnection, Driver } from 'kysely'
import { BaseDialect } from '../baseDialect'
import type { Promisable } from '../util'
import { CrSqliteDriver } from './driver'
import type { CrSqliteDB } from './type'

export interface CrSqliteDialectConfig {
  database: CrSqliteDB | (() => Promisable<CrSqliteDB>)
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}
export class CrSqliteDialect extends BaseDialect {
  #config: CrSqliteDialectConfig
  /**
   * dialect for {@link https://vlcn.io/js/wasm vlcn.io wasm},
   * a {@link https://github.com/vlcn-io/wa-sqlite/tree/master/demo wa-sqlite} wrapper using indexeddb as backend
   */
  constructor(config: CrSqliteDialectConfig) {
    super()
    this.#config = config
  }

  createDriver(): Driver {
    return new CrSqliteDriver(this.#config)
  }
}
