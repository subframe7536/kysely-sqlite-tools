import type { IGenericSqliteExecutor, Promisable } from 'kysely-generic-sqlite'
import type { InitData } from '../type'
import {
  changes as changesCore,
  close as closeCore,
  iterator as iteratorCore,
  lastInsertRowId as lastInsertRowIdCore,
  run as runCore,
  type SQLiteDBCore,
} from '@subframe7536/sqlite-wasm'
import { createWebOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-web'

/**
 * Handle worker message, support custom callback on initialization
 * @example
 * // worker.ts
 * import { createOnMessageCallback, customFunction } from 'kysely-wasqlite-worker'
 *
 * onmessage = createOnMessageCallback(
 *   async (sqliteDB: SQLiteDB) => {
 *     customFunction(sqliteDB.sqlite, sqliteDB.db, 'customFunction', (a, b) => a + b)
 *   }
 * )
 */
export function createOnMessageCallback(
  create: (data: InitData) => Promisable<SQLiteDBCore>,
): void {
  createWebOnMessageCallback<InitData>(
    async (initData) => {
      const core = await create(initData!)
      return createSqliteExecutor(core)
    },
  )
}

export function createSqliteExecutor(core: SQLiteDBCore): IGenericSqliteExecutor {
  return {
    all: async (sql, parameters) => await runCore(core, sql, parameters as any[]),
    run: async (sql, parameters) => {
      await runCore(core, sql, parameters as any[])
      return {
        changes: changesCore(core),
        lastInsertRowid: lastInsertRowIdCore(core),
      }
    },
    close: async () => await closeCore(core),
    iterator: (_, sql, parameters) => iteratorCore(core, sql, parameters as any[]),
  }
}
