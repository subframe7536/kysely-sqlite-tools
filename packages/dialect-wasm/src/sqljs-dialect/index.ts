import type { SqlJSDB } from './type'
import {
  buildQueryFn,
  GenericSqliteDialect,
  type IBaseSqliteDialectConfig,
  type Promisable,
} from 'kysely-generic-sqlite'
import { accessDB } from '../utils'

export interface SqlJsDialectConfig extends IBaseSqliteDialectConfig {
  database: SqlJSDB | (() => Promisable<SqlJSDB>)
}
export class SqlJsDialect extends GenericSqliteDialect {
  /**
   * dialect for [sql.js](https://github.com/sql-js/sql.js)
   *
   * no support for bigint
   */
  constructor(config: SqlJsDialectConfig) {
    super(
      async () => {
        const db = await accessDB(config.database)
        return {
          db,
          close: () => db.close(),
          query: buildQueryFn({
            run: () => ({
              insertId: BigInt(db.exec('SELECT last_insert_rowid()')[0].values[0][0] as number),
              numAffectedRows: BigInt(db.getRowsModified()),
            }),
            all: (sql, parameters) => {
              const stmt = db.prepare(sql)
              try {
                if (parameters?.length) {
                  stmt.bind(parameters as any[])
                }
                const rows = []
                while (stmt.step()) {
                  rows.push(stmt.getAsObject())
                }
                return rows
              } finally {
                stmt.free()
              }
            },
          }),
        }
      },
      config.onCreateConnection,
    )
  }
}
