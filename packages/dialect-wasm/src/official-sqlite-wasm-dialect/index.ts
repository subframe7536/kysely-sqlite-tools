import type { DatabaseConnection } from 'kysely'
import { BaseDialect } from '../baseDialect'
import { OfficialSqliteWasmDriver } from './driver'
import type { OfficialSqliteWasmDB } from './type'

export interface OfficialSqliteWasmDialectConfig {
  database: OfficialSqliteWasmDB | (() => Promise<OfficialSqliteWasmDB>)
  onCreateConnection?: (connection: DatabaseConnection) => Promise<void>
}

export class OfficialSqliteWasmDialect extends BaseDialect {
  #config: OfficialSqliteWasmDialectConfig
  /**
   * use official wasm build, support bigint, recommend to use opfs,
   * see {@link https://sqlite.org/forum/forumpost/59097f57cbe647a2d1950fab93e7ab82dd24c1e384d38b90ec1e2f03a2a4e580 this}
   * and {@link https://sqlite.org/forum/forumpost/8f50dc99149a6cedade784595238f45aa912144fae81821d5f9db31965f754dd this}
   *
   * @example
   * add type for `jswasm/sqlite3-bundler-friendly.mjs`:
   * ```ts
   * export type OO = {
   *   OpfsDb: new (path: string) => OfficialSqliteWasmDB
   *   DB: new (path: string) => OfficialSqliteWasmDB
   * }
   * export default function sqlite3InitModule(): Promise<{ oo1:OO }>
   * ```
   * @example
   * usage
   * ```ts
   * import sqlite3InitModule from './jswasm/sqlite3-bundler-friendly'
   * const db = new Kysely({
   *   dialect: new OfficialSqliteWasmDialect({
   *     database: async () => {
   *       const sqlite3 = (await sqlite3InitModule()).oo1
   *       if (!sqlite3) {
   *         return Promise.reject('fail to load sqlite')
   *       }
   *       const path = '/test.db'
   *       return sqlite3.OpfsDb
   *         ? new sqlite3.OpfsDb(path)
   *         : new sqlite3.DB(path)
   *     },
   *   }),
   * })
   * ```
   * it can be used in Origin-Private FileSystem, but your server must response COOP and COEP in header,
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API#origin_private_file_system opfs}
   * and {@link https://sqlite.org/wasm/doc/trunk/persistence.md#coop-coep coop&coep}
   * ```ts
   * server.middlewares.use((_req, res, next) => {
   *   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
   *   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
   *   next()
   * })
   * ```
  */
  constructor(config: OfficialSqliteWasmDialectConfig) {
    super()
    this.#config = config
  }

  createDriver() {
    return new OfficialSqliteWasmDriver(this.#config)
  }
}
