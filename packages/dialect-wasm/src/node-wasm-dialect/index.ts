import type { DatabaseConnection, Driver } from 'kysely'
import { BaseDialect } from '../baseDialect'
import type { NodeWasmDataBase } from './type'
import { NodeWasmDriver } from './driver'

export interface NodeWasmDialectConfig {
  database: NodeWasmDataBase | (() => Promise<NodeWasmDataBase>)
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
