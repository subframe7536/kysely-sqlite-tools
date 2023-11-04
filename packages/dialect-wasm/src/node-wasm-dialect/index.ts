import type { DatabaseConnection, Driver } from 'kysely'
import type { Promisable } from '../types'
import { BaseDialect } from '../baseDialect'
import type { NodeWasmDataBase } from './type'
import { NodeWasmDriver } from './driver'

export interface NodeWasmDialectConfig {
  database: NodeWasmDataBase | (() => Promisable<NodeWasmDataBase>)
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}

export class NodeWasmDialect extends BaseDialect {
  config: NodeWasmDialectConfig
  /**
   * dialect for [node sqlite3 wasm](https://github.com/tndrle/node-sqlite3-wasm)
   *
   * - no `RETURNING` support
   * - only return rows when executing raw sql
   */
  constructor(config: NodeWasmDialectConfig) {
    super()
    this.config = config
  }

  createDriver(): Driver {
    return new NodeWasmDriver(this.config)
  }
}
