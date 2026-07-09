import type { IBaseSqliteDialectConfig, Promisable } from 'kysely-generic-sqlite'
import { access, GenericSqliteDialect } from 'kysely-generic-sqlite'

import type { SqliteParameters, SqlJsDatabase, SqlJsStatement } from './types'

/**
 * Configuration for {@link SqlJsDialect}.
 */
export interface SqlJsDialectConfig extends IBaseSqliteDialectConfig {
  database: SqlJsDatabase | (() => Promisable<SqlJsDatabase>)
}

/**
 * SQLite dialect for {@link https://github.com/sql-js/sql.js | sql.js}.
 *
 * Does **not** support `BigInt`.
 */
export class SqlJsDialect extends GenericSqliteDialect {
  /**
   * @param config - {@link SqlJsDialectConfig}
   */
  constructor(config: SqlJsDialectConfig) {
    super(async () => {
      const db = await access(config.database)
      return {
        db,
        close: () => db.close(),
        query: (_, sql, parameters) => {
          const stmt = db.prepare(sql)
          try {
            if (parameters?.length) {
              stmt.bind(parameters as any[])
            }
            if (stmt.getColumnNames().length === 0) {
              stmt.step()
              return {
                rows: [],
                insertId: BigInt(db.exec('SELECT last_insert_rowid()')[0].values[0][0] as number),
                numAffectedRows: BigInt(db.getRowsModified()),
              }
            }
            const rows = []
            while (stmt.step()) {
              rows.push(stmt.getAsObject())
            }
            return { rows }
          } finally {
            stmt.free()
          }
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

/**
 * Yield rows from a sql.js prepared statement.
 *
 * @yields rows as plain objects
 */
function* iterator<T>(stmt: SqlJsStatement<T>): IterableIterator<T> {
  while (stmt.step()) {
    yield stmt.getAsObject() as unknown as T
  }
}

/**
 * Iterate rows from a SQL query via sql.js, freeing the statement when done.
 *
 * @yields rows as plain objects
 */
function* iterateWithStatement<T>(
  db: SqlJsDatabase,
  sql: string,
  parameters: SqliteParameters,
): IterableIterator<T> {
  const statement = db.prepare(sql)
  try {
    if (parameters.length) {
      statement.bind(parameters as any[])
    }
    yield* iterator(statement as SqlJsStatement<T>)
  } finally {
    statement.free()
  }
}
