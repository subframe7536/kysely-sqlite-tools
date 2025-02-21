import type { TauriSqliteDialectConfig } from './type'

import { buildQueryFn, GenericSqliteDialect, parseBigInt } from 'kysely-generic-sqlite'

export type { TauriSqliteDialectConfig } from './type'
/**
 * https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql
 */
export class TauriSqliteDialect extends GenericSqliteDialect {
  /**
   * SQLite dialect for Tauri, using [official sql plugin](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql)
   */
  constructor(
    config: TauriSqliteDialectConfig,
  ) {
    const { database, onCreateConnection } = config
    super(
      async () => {
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
      },
      onCreateConnection,
    )
  }
}
