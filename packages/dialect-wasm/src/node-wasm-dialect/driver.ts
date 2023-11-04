import type { CompiledQuery, DatabaseConnection, QueryResult } from 'kysely'
import { BaseDriver } from '../baseDriver'
import type { NodeWasmDataBase } from './type'
import type { NodeWasmDialectConfig } from '.'

export class NodeWasmDriver extends BaseDriver {
  private config: NodeWasmDialectConfig
  private db?: NodeWasmDataBase
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

class NodeWasmConnection implements DatabaseConnection {
  private db: NodeWasmDataBase
  constructor(db: any) {
    this.db = db
  }

  async executeQuery<R>({ parameters, query, sql }: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    switch (query.kind) {
      case 'SelectQueryNode':
      case 'RawNode':
        return { rows: this.db.all(sql, parameters) }
      default: {
        const { changes, lastInsertRowid } = this.db.run(sql, parameters)
        return {
          rows: [],
          insertId: BigInt(lastInsertRowid),
          numAffectedRows: BigInt(changes),
        }
      }
    }
  }

  streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('SQLite driver doesn\'t support streaming')
  }
}
