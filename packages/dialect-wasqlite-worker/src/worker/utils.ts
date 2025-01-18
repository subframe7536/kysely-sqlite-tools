import type { IGenericSqliteExecutor, Promisable } from 'kysely-generic-sqlite'
import type { RestMessageHandleFn } from 'kysely-generic-sqlite/worker'
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

export type CreateDatabaseFn = (init: InitData) => Promisable<SQLiteDBCore>

export const defaultCreateDatabaseFn: CreateDatabaseFn
  = async ({ fileName, url, useOPFS }) => {
    return (await import('@subframe7536/sqlite-wasm')).initSQLiteCore(
      (
        useOPFS
          ? (await import('@subframe7536/sqlite-wasm/opfs')).useOpfsStorage
          : (await import('@subframe7536/sqlite-wasm/idb')).useIdbStorage
      )(
        fileName,
        { url },
      ),
    )
  }

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
  create: CreateDatabaseFn,
  rest?: RestMessageHandleFn<SQLiteDBCore>,
): void {
  createWebOnMessageCallback<InitData, SQLiteDBCore>(
    async (initData) => {
      const core = await create(initData!)
      return createSqliteExecutor(core)
    },
    rest,
  )
}

function createSqliteExecutor(db: SQLiteDBCore): IGenericSqliteExecutor<SQLiteDBCore> {
  return {
    db,
    all: async (sql, parameters) => await runCore(db, sql, parameters as any[]),
    run: async (sql, parameters) => {
      await runCore(db, sql, parameters as any[])
      return {
        changes: changesCore(db),
        lastInsertRowid: lastInsertRowIdCore(db),
      }
    },
    close: async () => await closeCore(db),
    iterator: (_, sql, parameters) => iteratorCore(db, sql, parameters as any[]),
  }
}
