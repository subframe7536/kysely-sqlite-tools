import type { DatabaseConnection, DatabaseIntrospector, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import { MysqlAdapter, MysqlIntrospector, MysqlQueryCompiler, PostgresAdapter, PostgresIntrospector, PostgresQueryCompiler, SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { TaruiSqlDriver } from './driver'
import type { Promisable, TauriSqlDB } from './type'

export interface TauriSqlDialectConfig<T extends 'sqlite' | 'mysql' | 'postgres'> {
  /**
   * Tauri database instance.
   *
   * @example
   * ```ts
   * import Database from 'tauri-plugin-sql-api'
   * import { appDataDir } from '@tauri-apps/api/path'
   *
   * const kysely = new Kysely<DB>({
   *   dialect: new TauriSqlDialect({
   *     type: 'sqlite',
   *     database: prefix => Database.load(`${prefix}${await appDataDir()}test.db`)
   *   }),
   * })
   * ```
   */
  database: Promisable<TauriSqlDB> | ((prefix: T extends 'sqlite' ? `${T}:` : `${T}://`) => Promisable<TauriSqlDB>)
  /**
   * database type
   */
  type: T
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
export class TauriSqlDialect<T extends 'sqlite' | 'mysql' | 'postgres'> {
  #config: TauriSqlDialectConfig<T>
  /**
   * dialect for Tauri,
   * using [official sql plugin](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql),
   * support MySQL, PostgreSQL and SQLite
   */
  constructor(config: TauriSqlDialectConfig<T>) {
    this.#config = config
  }

  createDriver(): Driver {
    return new TaruiSqlDriver(this.#config)
  }

  createQueryCompiler(): QueryCompiler {
    switch (this.#config.type) {
      case 'mysql':
        return new MysqlQueryCompiler()
      case 'postgres':
        return new PostgresQueryCompiler()
      default:
        return new SqliteQueryCompiler()
    }
  }

  createAdapter(): DialectAdapter {
    switch (this.#config.type) {
      case 'mysql':
        return new MysqlAdapter()
      case 'postgres':
        return new PostgresAdapter()
      default:
        return new SqliteAdapter()
    }
  }

  createIntrospector(db: Kysely<any>): DatabaseIntrospector {
    switch (this.#config.type) {
      case 'mysql':
        return new MysqlIntrospector(db)
      case 'postgres':
        return new PostgresIntrospector(db)
      default:
        return new SqliteIntrospector(db)
    }
  }
}
