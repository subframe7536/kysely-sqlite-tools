import { BaseDriver, BaseSqliteConnection } from '../baseDriver'
import type { OfficialWasmDB } from './type'
import type { OfficialWasmDialectConfig } from '.'

export class OfficialWasmDriver extends BaseDriver {
  #config: OfficialWasmDialectConfig
  #db?: OfficialWasmDB
  constructor(config: OfficialWasmDialectConfig) {
    super()
    this.#config = config
  }

  async init(): Promise<void> {
    this.#db = typeof this.#config.database === 'function'
      ? await this.#config.database()
      : this.#config.database
    this.connection = new OfficailSqliteWasmConnection(this.#db)
    if (this.#config.onCreateConnection) {
      await this.#config.onCreateConnection(this.connection)
    }
  }
}
class OfficailSqliteWasmConnection extends BaseSqliteConnection {
  #db: OfficialWasmDB
  constructor(db: any) {
    super()
    this.#db = db
  }

  query(sql: string, param?: any[]): any[] {
    const resultRows: never[] = []
    this.#db.exec({
      sql,
      bind: param ?? [],
      rowMode: 'object',
      resultRows,
    })

    return resultRows
  }

  exec(sql: string, param?: any[]) {
    this.#db.exec({
      sql,
      bind: param ?? [],
    })
    return {
      numAffectedRows: this.#db.changes(false, true) as bigint,
      insertId: this.query('SELECT last_insert_rowid()')[0],
    }
  }
}
