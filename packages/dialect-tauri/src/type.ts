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
  database: Promisable<TauriSqlDB> | ((prefix: 'sqlite:') => Promisable<TauriSqlDB>)
  /**
   * Called once when the first query is executed.
   *
   * This is a Kysely specific feature and does not come from the `better-sqlite3` module.
   */
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}
/**
 * https://github.com/tauri-apps/plugins-workspace/blob/dev/plugins/sql/guest-js/index.ts
 */
export interface TauriSqlDB {
  execute: (query: string, bindValues?: readonly unknown[]) => Promise<QueryResult>
  select: <T>(query: string, bindValues?: readonly unknown[]) => Promise<T>
  close: () => Promise<boolean>
}
export interface QueryResult {
  rowsAffected: number
  lastInsertId: number
}

export type Promisable<T> = T | Promise<T>
