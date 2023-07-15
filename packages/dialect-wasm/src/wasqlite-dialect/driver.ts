import { BaseDriver, BaseSqliteConnection } from '../baseDriver'
import type { SQLiteCompatibleType, Sqlite, WaSqliteDatabase } from './type'
import type { WaSqliteDialectConfig } from '.'

export class WaSqliteDriver extends BaseDriver {
  private config: WaSqliteDialectConfig
  private db?: WaSqliteDatabase
  constructor(config: WaSqliteDialectConfig) {
    super()
    this.config = config
  }

  async init(): Promise<void> {
    this.db = typeof this.config.database === 'function'
      ? await this.config.database()
      : this.config.database
    this.connection = new WaSqliteConnection(this.db)

    await this.config.onCreateConnection?.(this.connection)
  }

  async destroy(): Promise<void> {
    await this.db?.sqlite.close(this.db.db)
  }
}

class WaSqliteConnection extends BaseSqliteConnection {
  readonly sqlite: Sqlite
  readonly db: number
  constructor(database: any) {
    super()
    this.db = database.db
    this.sqlite = database.sqlite
  }

  async run(statement: { sql: string; param?: any[] }) {
    const str = this.sqlite.str_new(this.db, statement.sql)
    const prepared = await this.sqlite.prepare_v2(
      this.db,
      this.sqlite.str_value(str),
    )

    if (prepared === null) {
      return [] as any[]
    }

    const stmt = prepared.stmt
    try {
      if (typeof statement.param !== 'undefined') {
        this.sqlite.bind_collection(
          stmt,
          statement.param,
        )
      }

      const rows: Record<string, SQLiteCompatibleType>[] = []
      let cols: string[] = []

      while ((await this.sqlite.step(stmt)) === /* SQLite.SQLITE_ROW */ 100) {
        cols = cols.length === 0 ? this.sqlite.column_names(stmt) : cols
        const row = this.sqlite.row(stmt)
        rows.push(cols.reduce((acc, key, i) => {
          acc[key] = row[i]
          return acc
        }, {} as Record<string, SQLiteCompatibleType>))
      }
      return rows
    } finally {
      await this.sqlite.finalize(stmt)
    }
  }

  async query(sql: string, param?: any[] | undefined) {
    return await this.run({ sql, param })
  }

  async exec(sql: string, param?: any[] | undefined) {
    await this.run({ sql, param })
    const v = await this.run({ sql: 'SELECT last_insert_rowid() as id' })
    return {
      insertId: BigInt(v[0].id),
      numAffectedRows: BigInt(this.sqlite.changes(this.db)),
    }
  }
}
