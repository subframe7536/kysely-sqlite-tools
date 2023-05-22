import type { DatabaseConnection, Driver } from 'kysely'
import { BaseDialect } from '../baseDialect'
import type { NodeWasmDB } from './type'
import { NodeWasmDriver } from './driver'

export interface NodeWasmDialectConfig {
  database: NodeWasmDB | (() => Promise<NodeWasmDB>)
  onCreateConnection?: (connection: DatabaseConnection) => Promise<void>
}

export class NodeWasmDialect extends BaseDialect {
  #config: NodeWasmDialectConfig
  constructor(config: NodeWasmDialectConfig) {
    super()
    this.#config = config
  }

  createDriver(): Driver {
    return new NodeWasmDriver(this.#config)
  }
}
