import type { DatabaseIntrospector, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import type { TauriSqliteDialectConfig } from './type'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { TauriSqliteDriver } from './driver'

export type { TauriSqliteDialectConfig } from './type'
/**
 * https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql
 */
export class TauriSqliteDialect {
  /**
   * SQLite dialect for Tauri, using [official sql plugin](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql)
   */
  constructor(
    private config: TauriSqliteDialectConfig,
  ) { }

  createDriver(): Driver {
    return new TauriSqliteDriver(this.config)
  }

  createQueryCompiler(): QueryCompiler {
    return new SqliteQueryCompiler()
  }

  createAdapter(): DialectAdapter {
    return new SqliteAdapter()
  }

  createIntrospector(db: Kysely<any>): DatabaseIntrospector {
    return new SqliteIntrospector(db)
  }
}
