import type { DatabaseIntrospector, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { TaruiSqlDriver } from './driver'
import type { TauriSqliteDialectConfig } from './type'

/**
 * https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql
 */
export class TauriSqliteDialect {
  private config: TauriSqliteDialectConfig
  /**
   * dialect for Tauri,
   * using [official sql plugin](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql),
   * support MySQL, PostgreSQL and SQLite
   */
  constructor(config: TauriSqliteDialectConfig) {
    this.config = config
  }

  createDriver(): Driver {
    return new TaruiSqlDriver(this.config)
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
