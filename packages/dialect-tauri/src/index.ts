import {
  buildQueryFn,
  defaultIsQuery,
  GenericSqliteDialect,
  parseBigInt,
} from 'kysely-generic-sqlite'

import type { TauriSqliteDialectConfig } from './type'

export type { TauriSqliteDialectConfig } from './type'

/**
 * SQLite dialect for Tauri v2, using the
 * {@link https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql | official SQL plugin}.
 */
export class TauriSqliteDialect extends GenericSqliteDialect {
  /**
   * @param config - {@link TauriSqliteDialectConfig}
   */
  constructor(config: TauriSqliteDialectConfig) {
    const { database, isQuery, onCreateConnection } = config
    super(async () => {
      const db = await (typeof database === 'function' ? database('sqlite:') : database)
      return {
        db,
        query: buildQueryFn({
          isQuery: (sql, node) => defaultIsQuery(sql, node) || Boolean(isQuery?.(sql, node)),
          all: async (sql, parameters) => await db.select(sql, parameters as any),
          run: async (sql, parameters) => {
            const { rowsAffected, lastInsertId } = await db.execute(sql, parameters as any)
            return {
              numAffectedRows: parseBigInt(rowsAffected),
              insertId: parseBigInt(lastInsertId),
            }
          },
        }),
        close: async () => await db.close(),
      }
    }, onCreateConnection)
  }
}
