import type Database from '@tauri-apps/plugin-sql'
import type { IBaseSqliteDialectConfig } from 'kysely-generic-sqlite'

export interface TauriSqliteDialectConfig extends IBaseSqliteDialectConfig {
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
  database: Database | ((prefix: 'sqlite:') => Promisable<Database>)
}

export type Promisable<T> = T | Promise<T>
