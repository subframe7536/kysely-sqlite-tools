import type { IBaseSqliteDialectConfig, Promisable } from 'kysely-generic-sqlite'
import { access, buildQueryFn, GenericSqliteDialect } from 'kysely-generic-sqlite'

export interface CrSqliteDialectConfig extends IBaseSqliteDialectConfig {
  database:
    | import('@vlcn.io/crsqlite-wasm').DB
    | (() => Promisable<import('@vlcn.io/crsqlite-wasm').DB>)
}
export class CrSqliteDialect extends GenericSqliteDialect {
  /**
   * dialect for [vlcn.io/wasm](https://vlcn.io/js/wasm)
   */
  constructor(config: CrSqliteDialectConfig) {
    super(async () => {
      const db = await access(config.database)
      return {
        db,
        close: () => db.close(),
        query: buildQueryFn({
          all: async (sql, parameters) => {
            return await db.execO(sql, parameters as any)
          },
          run: async (sql, parameters) => {
            await db.execA(sql, parameters as any)
            return {
              numAffectedRows: BigInt(db.api.changes(db.db)),
              insertId: BigInt((await db.execA('SELECT last_insert_rowid()'))[0][0]),
            }
          },
        }),
      }
    }, config.onCreateConnection)
  }
}
