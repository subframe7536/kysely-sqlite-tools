import { BaseDriver, BaseSqliteConnection } from '../baseDriver'
import type { NodeWasmDataBase } from './type'
import type { NodeWasmDialectConfig } from '.'

export class NodeWasmDriver extends BaseDriver {
  #config: NodeWasmDialectConfig
  #db?: NodeWasmDataBase
  constructor(config: NodeWasmDialectConfig) {
    super()
    this.#config = config
  }

  async init(): Promise<void> {
    this.#db = typeof this.#config.database === 'function'
      ? await this.#config.database()
      : this.#config.database
    this.connection = new NodeWasmConnection(this.#db)
    if (this.#config.onCreateConnection) {
      await this.#config.onCreateConnection(this.connection)
    }
  }
}

class NodeWasmConnection extends BaseSqliteConnection {
  #db: NodeWasmDataBase
  constructor(db: any) {
    super()
    this.#db = db
  }

  query(sql: string, param?: any[] | undefined): any[] | Promise<any[]> {
    return this.#db.all(sql, param)
  }

  exec(sql: string, param?: any[] | undefined): { numAffectedRows: bigint; insertId: any } | Promise<{ numAffectedRows: bigint; insertId: any }> {
    const { changes, lastInsertRowid } = this.#db.run(sql, param)
    return {
      insertId: lastInsertRowid,
      numAffectedRows: BigInt(changes),
    }
  }
}
