import type { ExecuteReturn, QueryReturn } from '../baseDriver'
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
  private sqlite: Sqlite
  private db: number
  constructor(database: any) {
    super()
    this.db = database.db
    this.sqlite = database.sqlite
  }

  async run(sql: string, parameters?: any[]) {
    const str = this.sqlite.str_new(this.db, sql)
    const prepared = await this.sqlite.prepare_v2(this.db, this.sqlite.str_value(str))

    if (!prepared) {
      return []
    }

    const stmt = prepared.stmt
    try {
      parameters?.length && this.sqlite.bind_collection(stmt, parameters as [])

      const rows: Record<string, SQLiteCompatibleType>[] = []
      const cols = this.sqlite.column_names(stmt)

      while ((await this.sqlite.step(stmt)) === 100/* SQLITE_ROW */) {
        const row = this.sqlite.row(stmt)
        rows.push(Object.fromEntries(cols.map((key, i) => [key, row[i]])))
      }
      return rows
    } finally {
      await this.sqlite.finalize(stmt)
    }
  }

  async query(sql: string, param?: any[] | undefined): QueryReturn {
    return { rows: await this.run(sql, param) }
  }

  async execute(sql: string, param?: any[] | undefined): ExecuteReturn {
    const rows = await this.run(sql, param)
    return {
      rows,
      insertId: await new Promise<bigint>(resolve => this.sqlite.exec(
        this.db,
        'SELECT last_insert_rowid()',
        ([id]) => resolve(BigInt(id as number)),
      )),
      numAffectedRows: BigInt(this.sqlite.changes(this.db)),
    }
  }
}
