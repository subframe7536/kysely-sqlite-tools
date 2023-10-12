import type { DatabaseConnection } from 'kysely'
import { BaseDialect } from '../baseDialect'
import type { Promisable } from '../util'
import { OfficialWasmDriver } from './driver'
import type { OfficialWasmDB } from './type'

export interface OfficialWasmDialectConfig {
  database: OfficialWasmDB | (() => Promisable<OfficialWasmDB>)
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}

export class OfficialWasmDialect extends BaseDialect {
  #config: OfficialWasmDialectConfig
  /**
   * use official wasm build, support bigint, recommend to use opfs
   * (see {@link https://sqlite.org/forum/forumpost/59097f57cbe647a2d1950fab93e7ab82dd24c1e384d38b90ec1e2f03a2a4e580 this}
   * and {@link https://sqlite.org/forum/forumpost/8f50dc99149a6cedade784595238f45aa912144fae81821d5f9db31965f754dd this})
   *
   * you can add a `d.ts` for `@sqlite.org/sqlite-wasm`
   * ```ts
   * export type OO = {
   *   OpfsDb: new (path: string) => OfficialWasmDB
   *   DB: new (path: string) => OfficialWasmDB
   * }
   * export default function sqlite3InitModule(): Promise<{ oo1:OO }>
   * ```
   * you can also use `sqlite-wasm-esm`
   *
   * usage:
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
   * see {@link https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API#origin_private_file_system opfs}
   * and {@link https://sqlite.org/wasm/doc/trunk/persistence.md#coop-coep coop&coep}
   * ```ts
   * server.middlewares.use((_req, res, next) => {
   *   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
   *   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
   *   next()
   * })
   * ```
   */
  constructor(config: OfficialWasmDialectConfig) {
    super()
    this.#config = config
  }

  createDriver() {
    return new OfficialWasmDriver(this.#config)
  }
}
