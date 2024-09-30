import type { DatabaseIntrospector, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import type { TauriSqliteDialectConfig } from './type'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { TauriSqlDriver } from './driver'

/**
 * https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql
 */
export class TauriSqliteDialect {
  private config: TauriSqliteDialectConfig
  /**
   * SQLite dialect for Tauri, using [official sql plugin](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql)
   */
  constructor(config: TauriSqliteDialectConfig) {
    this.config = config
  }

  createDriver(): Driver {
    return new TauriSqlDriver(this.config)
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
