import type { SQLiteDBCore } from '@subframe7536/sqlite-wasm'
import {
  close as coreClose,
  query as coreQuery,
  iterator as coreIterator,
} from '@subframe7536/sqlite-wasm'
import type { IGenericSqlite, Promisable } from 'kysely-generic-sqlite'
import type { MessageHandleFn } from 'kysely-generic-sqlite/worker'
import { createWebOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-web'

import type { InitData } from '../type'

export type CreateDatabaseFn = (init: InitData) => Promisable<SQLiteDBCore>

export const defaultCreateDatabaseFn: CreateDatabaseFn = async ({ fileName, url, useOPFS }) => {
  return (await import('@subframe7536/sqlite-wasm')).initSQLiteCore(
    (useOPFS
      ? (await import('@subframe7536/sqlite-wasm/opfs')).useOpfsStorage
      : (await import('@subframe7536/sqlite-wasm/idb')).useIdbStorage)(fileName, { url }),
  )
}

/**
 * Handle worker message, support custom message handler,
 * built-in: {@link defaultCreateDatabaseFn}
 * @example
 * in `worker.ts`
 * ```ts
 * import { customFunctionCore, exportDatabase } from '@subframe7536/sqlite-wasm'
 * import { createOnMessageCallback, defaultCreateDatabaseFn } from 'kysely-wasqlite-worker'
 *
 * createOnMessageCallback(
 *   async (...args) => {
 *     const sqliteDB = await defaultCreateDatabaseFn(...args)
 *     customFunctionCore(sqliteDB, 'customFunction', (a, b) => a + b)
 *     return sqliteDB
 *   },
 *   ([type, exec, data1, data2, data3]) => {
 *     if (type === 'export') {
 *       return exportDatabase(exec.db)
 *     }
 *   }
 * )
 * ```
 */
export function createOnMessageCallback(
  create: CreateDatabaseFn,
  message?: MessageHandleFn<SQLiteDBCore>,
): void {
  createWebOnMessageCallback<InitData, SQLiteDBCore>(async (initData) => {
    const core = await create(initData!)
    return createSqliteExecutor(core)
  }, message)
}

export function createSqliteExecutor(db: SQLiteDBCore): IGenericSqlite<SQLiteDBCore> {
  return {
    db,
    query: async (_isSelect, sql, parameters) => ({
      rows: await coreQuery(db, sql, parameters as any[]),
    }),
    close: async () => await coreClose(db),
    iterator: (_isSelect, sql, parameters, chunkSize) =>
      coreIterator(db, sql, parameters as any[], chunkSize),
  }
}
