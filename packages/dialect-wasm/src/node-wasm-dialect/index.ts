import type { NodeWasmDatabase } from './type'
import type { IBaseSqliteDialectConfig, Promisable } from 'kysely-generic-sqlite'

import { buildQueryFn, GenericSqliteDialect } from 'kysely-generic-sqlite'

import { accessDB } from '../utils'

export interface NodeWasmDialectConfig extends IBaseSqliteDialectConfig {
  database: NodeWasmDatabase | (() => Promisable<NodeWasmDatabase>)
}

export class NodeWasmDialect extends GenericSqliteDialect {
  /**
   * dialect for [node sqlite3 wasm](https://github.com/tndrle/node-sqlite3-wasm)
   */
  constructor(config: NodeWasmDialectConfig) {
    super(
      async () => {
        const db = await accessDB(config.database)
        return {
          db,
          close: () => db.close(),
          query: buildQueryFn({
            all: (sql, parameters) => {
              return db.all(sql, parameters as any)
            },
            run: (sql) => {
              const { changes, lastInsertRowid } = db.run(sql)
              return {
                insertId: BigInt(lastInsertRowid),
                numAffectedRows: BigInt(changes),
              }
            },
          }),
          iterator: (isSelect, sql, parameters) => {
            if (!isSelect) {
              throw new Error('Only support select query')
            }
            return db.prepare(sql).iterate(parameters as any)
          },
        }
      },
      config.onCreateConnection,
    )
  }
}
