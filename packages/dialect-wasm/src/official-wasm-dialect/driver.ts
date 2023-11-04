import type { ExecuteReturn, QueryReturn } from '../baseDriver'
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

  async query(sql: string, param?: any[]): QueryReturn {
    return { rows: this.run(sql, param) }
  }

  private run(sql: string, param?: any[] | undefined) {
    const rows: any[] = []
    this.db.exec({
      sql,
      bind: param ?? [],
      rowMode: 'object',
      resultRows: rows,
    })
    return rows
  }

  async execute(sql: string, param?: any[]): ExecuteReturn {
    const rows = this.run(sql, param)
    return {
      rows,
      numAffectedRows: BigInt(this.db.changes(false, true)),
      insertId: BigInt(this.run('SELECT last_insert_rowid() as id')[0].id),
    }
  }
}
