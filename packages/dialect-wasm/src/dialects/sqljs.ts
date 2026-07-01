import type { IBaseSqliteDialectConfig, Promisable } from 'kysely-generic-sqlite'
import { GenericSqliteDialect } from 'kysely-generic-sqlite'

import { accessDB } from '../utils'

export interface SqlJsDialectConfig extends IBaseSqliteDialectConfig {
  database: import('sql.js').Database | (() => Promisable<import('sql.js').Database>)
}
export class SqlJsDialect extends GenericSqliteDialect {
  /**
   * dialect for [sql.js](https://github.com/sql-js/sql.js)
   *
   * no support for bigint
   */
  constructor(config: SqlJsDialectConfig) {
    super(async () => {
      const db = await accessDB(config.database)
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
          return runWithStatement(db, sql, parameters, iterator)
        },
      }
    }, config.onCreateConnection)
  }
}

function runWithStatement<T>(
  db: import('sql.js').Database,
  sql: string,
  parameters: any[] | readonly any[],
  callback: (stmt: import('sql.js').Statement) => T,
): T {
  const statement = db.prepare(sql)
  try {
    if (parameters.length) {
      statement.bind(parameters as any[])
    }
    return callback(statement)
  } finally {
    statement.free()
  }
}

function* iterator<T>(stmt: import('sql.js').Statement): IterableIterator<T> {
  try {
    while (stmt.step()) {
      yield stmt.getAsObject() as unknown as T
    }
  } finally {
    stmt.free()
  }
}
