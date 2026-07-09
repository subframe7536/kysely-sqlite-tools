import { buildQueryFn, GenericSqliteDialect, parseBigInt } from 'kysely-generic-sqlite'

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
    const { database, onCreateConnection } = config
    super(async () => {
      const db = typeof database === 'function' ? await database('sqlite:') : database
      return {
        db,
        query: buildQueryFn({
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
