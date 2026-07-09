import type { IBaseSqliteDialectConfig, Promisable } from 'kysely-generic-sqlite'
import { access, buildQueryFn, GenericSqliteDialect } from 'kysely-generic-sqlite'

import type { NodeWasmDatabase } from './types'

/**
 * Configuration for {@link NodeWasmDialect}.
 */
export interface NodeWasmDialectConfig extends IBaseSqliteDialectConfig {
  database: NodeWasmDatabase | (() => Promisable<NodeWasmDatabase>)
}

/**
 * SQLite dialect for
 * {@link https://github.com/tndrle/node-sqlite3-wasm | node-sqlite3-wasm}.
 */
export class NodeWasmDialect extends GenericSqliteDialect {
  /**
   * @param config - {@link NodeWasmDialectConfig}
   */
  constructor(config: NodeWasmDialectConfig) {
    super(async () => {
      const db = await access(config.database)
      return {
        db,
        close: () => db.close(),
        query: buildQueryFn({
          all: (sql, parameters) => {
            return db.all(sql, parameters as any)
          },
          run: (sql, parameters) => {
            const { changes, lastInsertRowid } = db.run(sql, parameters as any)
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
    }, config.onCreateConnection)
  }
}
