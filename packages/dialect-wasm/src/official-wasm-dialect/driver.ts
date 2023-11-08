import type { InfoReturn, QueryReturn } from '../baseDriver'
import { BaseDriver, BaseSqliteConnection } from '../baseDriver'
import type { OfficialWasmDB } from './type'
import type { OfficialWasmDialectConfig } from '.'

export class OfficialWasmDriver extends BaseDriver {
  private config: OfficialWasmDialectConfig
  private db?: OfficialWasmDB
  constructor(config: OfficialWasmDialectConfig) {
    super()
    this.config = config
  }

  async init(): Promise<void> {
    this.db = typeof this.config.database === 'function'
      ? await this.config.database()
      : this.config.database
    this.connection = new OfficailSqliteWasmConnection(this.db)

    await this.config.onCreateConnection?.(this.connection)
  }

  async destroy(): Promise<void> {
    this.db?.close()
  }
}
class OfficailSqliteWasmConnection extends BaseSqliteConnection {
  readonly db: OfficialWasmDB
  constructor(db: any) {
    super()
    this.db = db
  }

  async query(sql: string, params?: any[] | undefined): QueryReturn {
    return this.db.selectObjects(sql, params as any)
  }

  async info(): InfoReturn {
    return {
      insertId: BigInt(this.db.selectArray('SELECT last_insert_rowid()')[0]),
      numAffectedRows: BigInt(this.db.changes(false, true)),
    }
  }
}
