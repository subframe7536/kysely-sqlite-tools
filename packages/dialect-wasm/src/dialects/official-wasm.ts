import type { IBaseSqliteDialectConfig, Promisable } from 'kysely-generic-sqlite'
import { access, GenericSqliteDialect, parseBigInt } from 'kysely-generic-sqlite'

import type { OfficialPreparedStatement, OfficialWasmDatabase, SqliteParameters } from './types'

export interface OfficialWasmDialectConfig extends IBaseSqliteDialectConfig {
  database: OfficialWasmDatabase | (() => Promisable<OfficialWasmDatabase>)
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
      const db = await access(config.database)

      return {
        db,
        close: () => db.close(),
        query: (_isSelect, sql, parameters) => {
          return runWithStatement(db, sql, parameters, (statement) => {
            if (statement.columnCount > 0) {
              return { rows: [...iterator(statement)] }
            }

            statement.step()

            return {
              rows: [],
              insertId: parseBigInt(
                db.selectValue('SELECT last_insert_rowid()') as number | bigint,
              ),
              numAffectedRows: parseBigInt(db.changes()),
            }
          })
        },
        iterator: (isSelect, sql, parameters) => {
          if (!isSelect) {
            throw new Error('Only support select query')
          }
          return iterateWithStatement(db, sql, parameters)
        },
      }
    }, config.onCreateConnection)
  }
}

function runWithStatement<T>(
  db: OfficialWasmDatabase,
  sql: string,
  parameters: SqliteParameters,
  callback: (stmt: OfficialPreparedStatement) => T,
): T {
  const statement = db.prepare(sql)
  try {
    if (parameters.length) {
      statement.bind(parameters)
    }
    return callback(statement)
  } finally {
    statement.finalize()
  }
}

function* iterator(
  statement: OfficialPreparedStatement,
): IterableIterator<Record<string, unknown>> {
  while (statement.step()) {
    yield statement.get({})
  }
}

function* iterateWithStatement(
  db: OfficialWasmDatabase,
  sql: string,
  parameters: SqliteParameters,
): IterableIterator<Record<string, unknown>> {
  const statement = db.prepare(sql)
  try {
    if (parameters.length) {
      statement.bind(parameters)
    }
    yield* iterator(statement)
  } finally {
    statement.finalize()
  }
}
