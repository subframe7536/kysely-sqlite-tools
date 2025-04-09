import type { InitData } from '../type'
import type { SQLiteDBCore } from '@subframe7536/sqlite-wasm'
import type { QueryResult } from 'kysely'
import type { IGenericSqlite, Promisable } from 'kysely-generic-sqlite'
import type { MessageHandleFn } from 'kysely-generic-sqlite/worker'

import {
  changes as changesCore,
  close as closeCore,
  lastInsertRowId as lastInsertRowIdCore,
} from '@subframe7536/sqlite-wasm'
import { SQLITE_OK, SQLITE_ROW } from '@subframe7536/sqlite-wasm/constant'
import { parseBigInt } from 'kysely-generic-sqlite'
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

function createRowMapper(sqlite: SQLiteDBCore['sqlite'], stmt: number) {
  const cols = sqlite.column_names(stmt)
  return (row: any[]) => Object.fromEntries(cols.map((key, i) => [key, row[i]]))
}

async function queryData(
  core: SQLiteDBCore,
  sql: string,
  parameters?: readonly any[],
): Promise<QueryResult<any>> {
  const stmt = (await core
    .sqlite
    .statements(core.pointer, sql)[Symbol.asyncIterator]()
    .next()).value

  if (parameters?.length) {
    core.sqlite.bind_collection(stmt, parameters)
  }

  const size = core.sqlite.column_count(stmt)
  if (size === 0) {
    await core.sqlite.step(stmt)
    return {
      rows: [],
      insertId: parseBigInt(lastInsertRowIdCore(core)),
      numAffectedRows: parseBigInt(changesCore(core)),
    }
  }

  const mapRow = createRowMapper(core.sqlite, stmt)
  const result = []
  let idx = 0
  while (await core.sqlite.step(stmt) === SQLITE_ROW) {
    result[idx++] = mapRow(core.sqlite.row(stmt))
  }
  return { rows: result }
}

async function* iterateDate(
  core: SQLiteDBCore,
  sql: string,
  parameters?: readonly any[],
  chunkSize = 1,
): AsyncIterableIterator<any[]> {
  const { sqlite, pointer } = core
  // eslint-disable-next-line unicorn/no-new-array
  let cache = new Array(chunkSize)
  for await (const stmt of sqlite.statements(pointer, sql)) {
    if (parameters?.length) {
      sqlite.bind_collection(stmt, parameters)
    }
    let idx = 0
    const mapRow = createRowMapper(core.sqlite, stmt)
    while (1) {
      const result = await sqlite.step(stmt)
      if (result === SQLITE_ROW) {
        cache[idx] = mapRow(core.sqlite.row(stmt))
        if (++idx === chunkSize) {
          yield cache.slice(0, idx)
          idx = 0
        }
      } else if (result === SQLITE_OK) {
        if (++idx === chunkSize) {
          yield []
        }
      } else {
        if (idx > 0) {
          yield cache.slice(0, idx)
        }
        break
      }
    }
  }
  cache = undefined!
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
  createWebOnMessageCallback<InitData, SQLiteDBCore>(
    async (initData) => {
      const core = await create(initData!)
      return createSqliteExecutor(core)
    },
    message,
  )
}

export function createSqliteExecutor(db: SQLiteDBCore): IGenericSqlite<SQLiteDBCore> {
  return {
    db,
    query: async (_isSelect, sql, parameters) => await queryData(db, sql, parameters),
    close: async () => await closeCore(db),
    iterator: (_isSelect, sql, parameters, chunkSize) => iterateDate(
      db,
      sql,
      parameters as any[],
      chunkSize,
    ),
  }
}
