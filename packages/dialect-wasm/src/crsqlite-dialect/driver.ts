import type { CrSqliteDialectConfig } from '.'
import type { InfoReturn, QueryReturn } from '../baseDriver'
import type { CrSqliteDB } from './type'
import { BaseDriver, BaseSqliteConnection } from '../baseDriver'

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

  async query(sql: string, params?: any[]): QueryReturn {
    return await this.db.execO(sql, params as any[])
  }

  async info(): InfoReturn {
    return {
      numAffectedRows: BigInt(this.db.api.changes(this.db.db)),
      insertId: BigInt((await this.db.execA('SELECT last_insert_rowid()'))[0]),
    }
  }
}
