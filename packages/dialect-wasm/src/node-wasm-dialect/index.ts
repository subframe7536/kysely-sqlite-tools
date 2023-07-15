import type { DatabaseConnection, Driver } from 'kysely'
import { BaseDialect } from '../baseDialect'
import type { Promisable } from '../util'
import type { NodeWasmDataBase } from './type'
import { NodeWasmDriver } from './driver'

export interface NodeWasmDialectConfig {
  database: NodeWasmDataBase | (() => Promisable<NodeWasmDataBase>)
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
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
