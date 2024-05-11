import type { DatabaseConnection, DatabaseIntrospector, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { TaruiSqlDriver } from './driver'
import type { Promisable, TauriSqlDB } from './type'

export interface TauriSqliteDialectConfig {
  /**
   * Tauri database instance.
   *
   * @example
   * ```ts
   * import Database from '@tauri-apps/plugin-sql'
   * import { appDataDir } from '@tauri-apps/api/path'
   *
   * const kysely = new Kysely<DB>({
   *   dialect: new TauriSqlDialect({
   *     database: prefix => Database.load(`${prefix}${await appDataDir()}test.db`)
   *   }),
   * })
   * ```
   */
  database: Promisable<TauriSqlDB> | ((prefix: 'sqlite:') => Promisable<TauriSqlDB>)
  /**
   * Called once when the first query is executed.
   *
   * This is a Kysely specific feature and does not come from the `better-sqlite3` module.
   */
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}
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
