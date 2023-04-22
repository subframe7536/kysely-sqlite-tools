import { BaseDriver, BaseSqliteConnection } from '../baseDriver'
import type { CrSqliteDB } from './type'
import type { CrSqliteDialectConfig } from '.'

export class CrSqliteDriver extends BaseDriver {
  #config: CrSqliteDialectConfig
  #db?: CrSqliteDB
  constructor(config: CrSqliteDialectConfig) {
    super()
    this.#config = config
  }

  async init(): Promise<void> {
    this.#db = typeof this.#config.database === 'function'
      ? await this.#config.database()
      : this.#config.database
    this.connection = new CrSqliteConnection(this.#db)
    if (this.#config.onCreateConnection) {
      await this.#config.onCreateConnection(this.connection)
    }
  }
}
class CrSqliteConnection extends BaseSqliteConnection {
  #db: CrSqliteDB
  #lastId = 0n
  constructor(db: any) {
    super()
    this.#db = db
    this.#db.onUpdate((_, __, ___, id) => this.#lastId = id)
  }

  async query(sql: string, param?: any[]) {
    return this.#db.execO(sql, param)
  }

  async exec(sql: string, param?: any[]) {
    await this.#db.exec(sql, param)
    return {
      numAffectedRows: BigInt(this.#db.api.changes(this.#db.db)),
      insertId: this.#lastId,
    }
  }
}
