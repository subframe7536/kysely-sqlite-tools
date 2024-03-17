import type { DatabaseConnection, Driver } from 'kysely'
import type { Promisable } from '../types'
import { BaseDialect } from '../baseDialect'
import type { NodeWasmDatabase } from './type'
import { NodeWasmDriver } from './driver'

export interface NodeWasmDialectConfig {
  database: NodeWasmDatabase | (() => Promisable<NodeWasmDatabase>)
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}

export class NodeWasmDialect extends BaseDialect {
  config: NodeWasmDialectConfig
  /**
   * dialect for [node sqlite3 wasm](https://github.com/tndrle/node-sqlite3-wasm)
   */
  constructor(config: NodeWasmDialectConfig) {
    super()
    this.config = config
  }

  createDriver(): Driver {
    return new NodeWasmDriver(this.config)
  }
}
