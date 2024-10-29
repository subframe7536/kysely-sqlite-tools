import type Database from '@tauri-apps/plugin-sql'
import type { DatabaseConnection } from 'kysely'

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
  database: Promisable<Database> | ((prefix: 'sqlite:') => Promisable<Database>)
  /**
   * Called once when the first query is executed.
   *
   * This is a Kysely specific feature and does not come from the `better-sqlite3` module.
   */
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}

export type Promisable<T> = T | Promise<T>
