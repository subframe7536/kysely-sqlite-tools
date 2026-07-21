import type Database from '@tauri-apps/plugin-sql'
import type {
  IBaseSqliteDialectConfig,
  IGenericSqliteExecutor,
  Promisable,
} from 'kysely-generic-sqlite'

/**
 * Configuration for {@link TauriSqliteDialect}.
 */
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
   *     database: async (prefix) => Database.load(`${prefix}${await appDataDir()}test.db`)
   *   }),
   * })
   * ```
   */
  database: Promisable<Database> | ((prefix: 'sqlite:') => Promisable<Database>)

  /**
   * Optional classifier for raw SQL statements that return rows.
   *
   * The default does not parse raw SQL; provide this when executing row-returning
   * raw statements such as `sql.raw('select 1')`.
   */
  isQuery?: IGenericSqliteExecutor['isQuery']
}
