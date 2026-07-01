import type { QueryResult } from 'kysely'
import type { IBaseSqliteDialectConfig, Promisable } from 'kysely-generic-sqlite'
import { GenericSqliteDialect } from 'kysely-generic-sqlite'

import { accessDB } from '../utils'

export interface OfficialWasmDialectConfig extends IBaseSqliteDialectConfig {
  database:
    | import('@sqlite.org/sqlite-wasm').Database
    | (() => Promisable<import('@sqlite.org/sqlite-wasm').Database>)
}

export class OfficialWasmDialect extends GenericSqliteDialect {
  /**
   * dialect for [official wasm build](https://sqlite.org/wasm/doc/trunk/index.md)
   *
   * support bigint, recommend to use opfs
   * (see {@link https://sqlite.org/forum/forumpost/59097f57cbe647a2d1950fab93e7ab82dd24c1e384d38b90ec1e2f03a2a4e580 this}
   * and {@link https://sqlite.org/forum/forumpost/8f50dc99149a6cedade784595238f45aa912144fae81821d5f9db31965f754dd this})
   *
   * you can also use [sqlite-wasm-esm](https://github.com/overtone-app/sqlite-wasm-esm)
   *
   * @example
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
   * when using Origin-Private FileSystem, your server must response COOP and COEP in header,
   * ```ts
   * server.middlewares.use((_req, res, next) => {
   *   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
   *   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
   *   next()
   * })
   * ```
   * @see https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API#origin_private_file_system
   * @see https://sqlite.org/wasm/doc/trunk/persistence.md#coop-coep
   */
  constructor(config: OfficialWasmDialectConfig) {
    super(async () => {
      const db = await accessDB(config.database)

      return {
        db,
        close: () => db.close(),
        query: (isSelect, sql, parameters) => executeQuery(db, isSelect, sql, parameters),
        iterator: (isSelect, sql, parameters) => {
          if (!isSelect) {
            throw new Error('Only support select query')
          }

          return queryIterator(db, sql, parameters)
        },
      }
    }, config.onCreateConnection)
  }
}

function executeQuery(
  db: import('@sqlite.org/sqlite-wasm').Database,
  isSelect: boolean,
  sql: string,
  parameters?: any[] | readonly any[],
): QueryResult<Record<string, import('@sqlite.org/sqlite-wasm').SqlValue>> {
  const rows = [...queryIterator(db, sql, parameters)]
  return isSelect || rows.length
    ? { rows }
    : {
        rows,
        insertId: getLastInsertId(db),
        numAffectedRows: db.changes(false, true),
      }
}

function getLastInsertId(db: import('@sqlite.org/sqlite-wasm').Database): bigint {
  const statement = db.prepare('SELECT last_insert_rowid()')
  try {
    return statement.step() ? BigInt((statement.get(0) as number | bigint | null) ?? 0) : 0n
  } finally {
    statement.finalize()
  }
}

function* queryIterator(
  db: import('@sqlite.org/sqlite-wasm').Database,
  sql: string,
  parameters?: any[] | readonly any[],
): IterableIterator<Record<string, import('@sqlite.org/sqlite-wasm').SqlValue>> {
  const statement = db.prepare(sql)
  try {
    if (parameters?.length) {
      statement.bind(parameters as import('@sqlite.org/sqlite-wasm').BindingSpec)
    }
    while (statement.step()) {
      yield statement.get({})
    }
  } finally {
    statement.finalize()
  }
}
