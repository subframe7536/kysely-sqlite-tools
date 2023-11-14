import type { InfoReturn, QueryReturn } from '../baseDriver'
import { BaseDriver, BaseSqliteConnection } from '../baseDriver'
import type { Sqlite, WaSqliteDatabase } from './type'
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
  private sqlite: Sqlite
  private db: number
  constructor(database: any) {
    super()
    this.db = database.db
    this.sqlite = database.sqlite
  }

  async query(sql: string, params?: any[] | undefined): QueryReturn {
    const rows: any[] = []
    const str = this.sqlite.str_new(this.db, sql)
    try {
      const prepared = await this.sqlite.prepare_v2(this.db, this.sqlite.str_value(str))

      if (prepared) {
        const stmt = prepared.stmt
        try {
          params?.length && this.sqlite.bind_collection(stmt, params as [])

          const cols = this.sqlite.column_names(stmt)

          while ((await this.sqlite.step(stmt)) === 100/* SQLITE_ROW */) {
            const row = this.sqlite.row(stmt)
            rows.push(Object.fromEntries(cols.map((key, i) => [key, row[i]])))
          }
        } finally {
          await this.sqlite.finalize(stmt)
        }
      }
    } finally {
      this.sqlite.str_finish(str)
    }
    return rows
  }

  async info(): InfoReturn {
    return {
      insertId: await new Promise<bigint>(resolve => this.sqlite.exec(
        this.db,
        'SELECT last_insert_rowid()',
        ([id]) => resolve(BigInt(id as number)),
      )),
      numAffectedRows: BigInt(this.sqlite.changes(this.db)),
    }
  }
}
