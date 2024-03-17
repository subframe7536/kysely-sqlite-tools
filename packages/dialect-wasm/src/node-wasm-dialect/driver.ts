import type { InfoReturn, QueryReturn } from '../baseDriver'
import { BaseDriver, BaseSqliteConnection } from '../baseDriver'
import type { NodeWasmDatabase } from './type'
import type { NodeWasmDialectConfig } from '.'

export class NodeWasmDriver extends BaseDriver {
  private config: NodeWasmDialectConfig
  private db?: NodeWasmDatabase
  constructor(config: NodeWasmDialectConfig) {
    super()
    this.config = config
  }

  async init(): Promise<void> {
    this.db = typeof this.config.database === 'function'
      ? await this.config.database()
      : this.config.database
    this.connection = new NodeWasmConnection(this.db)

    await this.config.onCreateConnection?.(this.connection)
  }

  async destroy(): Promise<void> {
    this.db?.close()
  }
}

class NodeWasmConnection extends BaseSqliteConnection {
  private db: NodeWasmDatabase
  constructor(db: NodeWasmDatabase) {
    super()
    this.db = db
  }

  async query(sql: string, params?: any[]): QueryReturn {
    return this.db.all(sql, params)
  }

  async info(): InfoReturn {
    const { changes, lastInsertRowid } = this.db.run('select 1')
    return {
      numAffectedRows: BigInt(changes),
      insertId: BigInt(lastInsertRowid),
    }
  }
}
