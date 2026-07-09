import type { IBaseSqliteDialectConfig, Promisable } from 'kysely-generic-sqlite'
import { access, buildQueryFn, GenericSqliteDialect } from 'kysely-generic-sqlite'

import type { CrSqliteDatabase } from './types'

/**
 * Configuration for {@link CrSqliteDialect}.
 */
export interface CrSqliteDialectConfig extends IBaseSqliteDialectConfig {
  database: CrSqliteDatabase | (() => Promisable<CrSqliteDatabase>)
}

/**
 * SQLite dialect for {@link https://vlcn.io/js/wasm | cr-sqlite} (vlcn.io/wasm).
 */
export class CrSqliteDialect extends GenericSqliteDialect {
  /**
   * @param config - {@link CrSqliteDialectConfig}
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
              insertId: BigInt(
                (await db.execA('SELECT last_insert_rowid()'))[0][0] as number | bigint,
              ),
            }
          },
        }),
      }
    }, config.onCreateConnection)
  }
}
