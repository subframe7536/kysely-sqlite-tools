import type { CrSqliteDB } from './type'
import type { IBaseSqliteDialectConfig, Promisable } from 'kysely-generic-sqlite'

import { buildQueryFn, GenericSqliteDialect } from 'kysely-generic-sqlite'

import { accessDB } from '../utils'

export interface CrSqliteDialectConfig extends IBaseSqliteDialectConfig {
  database: CrSqliteDB | (() => Promisable<CrSqliteDB>)
}
export class CrSqliteDialect extends GenericSqliteDialect {
  /**
   * dialect for [vlcn.io/wasm](https://vlcn.io/js/wasm)
   */
  constructor(config: CrSqliteDialectConfig) {
    super(
      async () => {
        const db = await accessDB(config.database)
        return {
          db,
          close: () => db.close(),
          query: buildQueryFn({
            all: async (sql, parameters) => {
              return await db.execO(sql, parameters as any)
            },
            run: async () => ({
              numAffectedRows: BigInt(db.api.changes(db.db)),
              insertId: BigInt((await db.execA('SELECT last_insert_rowid()'))[0]),
            }),
          }),
        }
      },
      config.onCreateConnection,
    )
  }
}
