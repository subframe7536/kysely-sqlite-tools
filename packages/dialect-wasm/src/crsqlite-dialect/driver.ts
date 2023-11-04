import type { ExecuteReturn, QueryReturn } from '../baseDriver'
import { BaseDriver, BaseSqliteConnection } from '../baseDriver'
import type { CrSqliteDB } from './type'
import type { CrSqliteDialectConfig } from '.'

export class CrSqliteDriver extends BaseDriver {
  private config: CrSqliteDialectConfig
  private db?: CrSqliteDB
  constructor(config: CrSqliteDialectConfig) {
    super()
    this.config = config
  }

  async init(): Promise<void> {
    this.db = typeof this.config.database === 'function'
      ? await this.config.database()
      : this.config.database
    this.connection = new CrSqliteConnection(this.db)

    await this.config.onCreateConnection?.(this.connection)
  }

  async destroy(): Promise<void> {
    this.db?.close()
  }
}
class CrSqliteConnection extends BaseSqliteConnection {
  private db: CrSqliteDB
  constructor(db: any) {
    super()
    this.db = db
  }

  async query(sql: string, param?: any[]): QueryReturn {
    return { rows: await this.db.execO(sql, param) }
  }

  async execute(sql: string, param?: any[]): ExecuteReturn {
    const rows = await this.db.execO(sql, param)
    return {
      rows,
      numAffectedRows: BigInt(this.db.api.changes(this.db.db)),
      insertId: BigInt((await this.db.execA('SELECT last_insert_rowid() as id'))[0]),
    }
  }
}
