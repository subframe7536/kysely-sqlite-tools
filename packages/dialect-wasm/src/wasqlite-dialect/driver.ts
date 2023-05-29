import { BaseDriver, BaseSqliteConnection } from '../baseDriver'
import type { SQLiteCompatibleType, Sqlite, WaSqliteDatabase } from './type'
import type { WaSqliteDialectConfig } from '.'

export class WaSqliteDriver extends BaseDriver {
  #config: WaSqliteDialectConfig
  #db?: WaSqliteDatabase
  constructor(config: WaSqliteDialectConfig) {
    super()
    this.#config = config
  }

  async init(): Promise<void> {
    this.#db = typeof this.#config.database === 'function'
      ? await this.#config.database()
      : this.#config.database
    this.connection = new WaSqliteConnection(this.#db)
    if (this.#config.onCreateConnection) {
      await this.#config.onCreateConnection(this.connection)
    }
  }
}

class WaSqliteConnection extends BaseSqliteConnection {
  #sqlite: Sqlite
  #db: number
  constructor(database: any) {
    super()
    this.#db = database.db
    this.#sqlite = database.sqlite
  }

  async run(statement: { sql: string; param?: any[] }) {
    const str = this.#sqlite.str_new(this.#db, statement.sql)
    let prepared
    prepared = await this.#sqlite.prepare_v2(
      this.#db,
      this.#sqlite.str_value(str),
    )

    if (prepared === null) {
      return [] as any[]
    }

    const stmt = prepared.stmt
    try {
      if (typeof statement.param !== 'undefined') {
        this.#sqlite.bind_collection(
          stmt,
          statement.param,
        )
      }

      const rows: Record<string, SQLiteCompatibleType>[] = []
      let cols: string[] = []

      while ((await this.#sqlite.step(stmt)) === /* SQLite.SQLITE_ROW */ 100) {
        cols = cols.length === 0 ? this.#sqlite.column_names(stmt) : cols
        const row = this.#sqlite.row(stmt)
        rows.push(cols.reduce((acc, key, i) => {
          acc[key] = row[i]
          return acc
        }, {} as Record<string, SQLiteCompatibleType>))
      }
      return rows
    } finally {
      await this.#sqlite.finalize(stmt)
    }
  }

  query(sql: string, param?: any[] | undefined): any[] | Promise<any[]> {
    return this.run({ sql, param })
  }

  exec(sql: string, param?: any[] | undefined): { numAffectedRows: bigint; insertId: any } | Promise<{ numAffectedRows: bigint; insertId: any }> {
    return new Promise((resolve) => {
      this.run({ sql, param }).then(() => {
        this.run({ sql: 'SELECT last_insert_rowid() as id' }).then((v) => {
          resolve({
            insertId: v[0].id,
            numAffectedRows: BigInt(this.#sqlite.changes(this.#db)),
          })
        })
      })
    })
  }
}
