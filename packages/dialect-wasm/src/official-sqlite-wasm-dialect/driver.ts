import { BaseDriver, BaseSqliteConnection } from '../baseDriver'
import type { OfficialSqliteWasmDB } from './type'
import type { OfficialSqliteWasmDialectConfig } from '.'

export class OfficialSqliteWasmDriver extends BaseDriver {
  #config: OfficialSqliteWasmDialectConfig
  #db?: OfficialSqliteWasmDB
  constructor(config: OfficialSqliteWasmDialectConfig) {
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
  #db: OfficialSqliteWasmDB
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
