import type { SQLiteDBCore } from '@subframe7536/sqlite-wasm'
import {
  close as coreClose,
  lastInsertRowId,
  changes,
  initSQLiteCore,
} from '@subframe7536/sqlite-wasm'
import { SQLITE_ROW, SQLITE_DONE } from '@subframe7536/sqlite-wasm/constant'
import { parseBigInt } from 'kysely-generic-sqlite'
import type { IGenericSqlite, Promisable } from 'kysely-generic-sqlite'
import type { WorkerRequestHandler } from 'kysely-generic-sqlite/worker'
import { createWebOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-web'

import type { InitData } from '../type'

/**
 * Factory signature for creating a {@link SQLiteDBCore}.
 */
export type CreateDatabaseFn = (init: InitData) => Promisable<SQLiteDBCore>

/**
 * Default database factory.
 *
 * Automatically selects OPFS or IndexedDB storage based on the init data.
 */
export const defaultCreateDatabaseFn: CreateDatabaseFn = async ({ fileName, url, useOPFS }) => {
  return initSQLiteCore(
    (useOPFS
      ? (await import('@subframe7536/sqlite-wasm/opfs')).useOpfsStorage
      : (await import('@subframe7536/sqlite-wasm/idb')).useIdbStorage)(fileName, { url }),
  )
}

/**
 * Create a function that maps raw row arrays to objects using column names.
 */
function createRowMapper(sqlite: SQLiteDBCore['sqlite'], stmt: number) {
  const cols = sqlite.column_names(stmt)
  return (row: any[]) => Object.fromEntries(cols.map((key, i) => [key, row[i]]))
}

/**
 * Prepare a SQL statement and bind parameters.
 *
 * Returns the statement handle and a release function.
 */
async function prepareStatement(
  db: SQLiteDBCore,
  sql: string,
  parameters: any[] | readonly any[],
): Promise<{ stmt: number; release: () => Promise<any> }> {
  const iterator = db.sqlite.statements(db.pointer, sql)[Symbol.asyncIterator]()
  const { value: stmt, done } = await iterator.next()

  if (done || !stmt) {
    await iterator.return?.()
    throw new Error(`No statement returned for sql: ${sql}`)
  }

  try {
    if (parameters.length) {
      db.sqlite.bind_collection(stmt, parameters as any[])
    }
  } catch (error) {
    await iterator.return?.()
    throw error
  }

  return {
    stmt,
    release: async () => await iterator.return?.(),
  }
}

/**
 * Handle worker messages, with optional custom message handler.
 *
 * Uses {@link defaultCreateDatabaseFn} by default.
 *
 * @example
 * In `worker.ts`:
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
  custom?: WorkerRequestHandler<SQLiteDBCore>,
): void {
  createWebOnMessageCallback<InitData, SQLiteDBCore>(async (initData) => {
    const core = await create(initData!)
    return createSqliteExecutor(core)
  }, custom)
}

/**
 * Build a {@link IGenericSqlite} executor from a {@link SQLiteDBCore}.
 */
export function createSqliteExecutor(db: SQLiteDBCore): IGenericSqlite<SQLiteDBCore> {
  return {
    db,
    close: async () => await coreClose(db),
    query: async (_isSelect, sql, parameters) => {
      const { stmt, release } = await prepareStatement(db, sql, parameters)

      try {
        const size = db.sqlite.column_count(stmt)
        if (size === 0) {
          await db.sqlite.step(stmt)
          return {
            rows: [],
            insertId: parseBigInt(lastInsertRowId(db)),
            numAffectedRows: parseBigInt(changes(db)),
          }
        }

        const mapRow = createRowMapper(db.sqlite, stmt)
        const result = []
        let idx = 0
        while ((await db.sqlite.step(stmt)) === SQLITE_ROW) {
          result[idx++] = mapRow(db.sqlite.row(stmt))
        }
        return { rows: result }
      } finally {
        await release()
      }
    },
    async *iterator(_isSelect, sql, parameters, chunkSize = 1) {
      const { stmt, release } = await prepareStatement(db, sql, parameters)

      try {
        const cache = new Array(chunkSize)
        let idx = 0
        const mapRow = createRowMapper(db.sqlite, stmt)

        while (1) {
          const result = await db.sqlite.step(stmt)

          if (result === SQLITE_ROW) {
            cache[idx] = mapRow(db.sqlite.row(stmt))

            if (++idx === chunkSize) {
              for (let i = 0; i < idx; i++) {
                yield cache[i]
              }
              idx = 0
            }
            continue
          }

          if (result === SQLITE_DONE) {
            for (let i = 0; i < idx; i++) {
              yield cache[i]
            }
            return
          }
        }
      } finally {
        await release()
      }
    },
  }
}
