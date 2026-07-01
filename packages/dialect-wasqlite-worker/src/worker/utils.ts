import type { SQLiteDBCore } from '@subframe7536/sqlite-wasm'
import { close as coreClose, lastInsertRowId, changes } from '@subframe7536/sqlite-wasm'
import { SQLITE_ROW, SQLITE_DONE } from '@subframe7536/sqlite-wasm/constant'
import { parseBigInt } from 'kysely-generic-sqlite'
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

function createRowMapper(sqlite: SQLiteDBCore['sqlite'], stmt: number) {
  const cols = sqlite.column_names(stmt)
  return (row: any[]) => Object.fromEntries(cols.map((key, i) => [key, row[i]]))
}

export async function queryFn<T>(
  core: SQLiteDBCore,
  convertResult: (noColumns: boolean, rows: Record<string, SQLiteCompatibleType>[]) => T,
  sql: string,
  parameters?: SQLiteCompatibleType[],
): Promise<T> {
  const iterator = core.sqlite.statements(core.pointer, sql)[Symbol.asyncIterator]()
  const { value: stmt } = await iterator.next()

  try {
    if (parameters?.length) {
      core.sqlite.bind_collection(stmt, parameters)
    }

    const size = core.sqlite.column_count(stmt)
    if (size === 0) {
      await core.sqlite.step(stmt)
      return convertResult(true, [])
    }

    const mapRow = createRowMapper(core.sqlite, stmt)
    const result = []
    let idx = 0
    while ((await core.sqlite.step(stmt)) === SQLITE_ROW) {
      result[idx++] = mapRow(core.sqlite.row(stmt))
    }
    return convertResult(false, result)
  } finally {
    await iterator.return?.()
  }
}

export async function* iteratorFn(
  core: SQLiteDBCore,
  sql: string,
  parameters?: SQLiteCompatibleType[],
  chunkSize = 1,
): AsyncIterableIterator<Record<string, SQLiteCompatibleType>> {
  const { sqlite, pointer } = core
  const cache = new Array(chunkSize)
  for await (const stmt of sqlite.statements(pointer, sql)) {
    if (parameters?.length) {
      sqlite.bind_collection(stmt, parameters)
    }
    let idx = 0
    const mapRow = createRowMapper(core.sqlite, stmt)

    while (1) {
      try {
        const result = await sqlite.step(stmt)

        if (result === SQLITE_ROW) {
          cache[idx] = mapRow(core.sqlite.row(stmt))

          if (++idx === chunkSize) {
            for (let i = 0; i < idx; i++) {
              yield cache[i]
            }
            idx = 0
          }
        } else if (result === SQLITE_DONE) {
          if (idx > 0) {
            for (let i = 0; i < idx; i++) {
              yield cache[i]
            }
            idx = 0
          }
          break
        }
      } finally {
        if (idx > 0) {
          for (let i = 0; i < idx; i++) {
            yield cache[i]
          }
        }
      }
    }
  }
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
    query: async (_isSelect, sql, parameters) => {
      return await queryFn(
        db,
        (noColumns, rows) => {
          if (!noColumns) {
            return { rows }
          }
          return {
            rows,
            insertId: parseBigInt(lastInsertRowId(db)),
            numAffectedRows: parseBigInt(changes(db)),
          }
        },
        sql,
        parameters as any[],
      )
    },
    close: async () => await coreClose(db),
    iterator: (_isSelect, sql, parameters, chunkSize) =>
      iteratorFn(db, sql, parameters as any[], chunkSize),
  }
}
