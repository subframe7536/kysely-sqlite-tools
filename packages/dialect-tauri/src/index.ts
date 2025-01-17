import type { TauriSqliteDialectConfig } from './type'
import { GenericSqliteDialect } from 'kysely-generic-sqlite'

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
    super({
      create: async () => {
        const db = typeof database === 'function' ? await database('sqlite:') : database
        return {
          all: (sql, parameters) => db.select(sql, parameters as any),
          run: async (sql, parameters) => {
            const { rowsAffected, lastInsertId } = await db.execute(sql, parameters as any)
            return {
              changes: rowsAffected,
              lastInsertRowid: lastInsertId!,
            }
          },
          close: () => db.close(),
        }
      },
      onCreateConnection,
    })
  }
}
