import type { Promisable } from 'kysely-generic-sqlite'
import type { InitData } from '../type'
import {
  changes as changesCore,
  close as closeCore,
  lastInsertRowId as lastInsertRowIdCore,
  run as runCore,
  type SQLiteDBCore,
} from '@subframe7536/sqlite-wasm'
import { SQLITE_ROW } from '@subframe7536/sqlite-wasm/constant'
import { createWebOnMessageCallback } from 'kysely-generic-sqlite/web-helper'

export async function* iteratorCore(
  core: SQLiteDBCore,
  sql: string,
  parameters?: any[],
): AsyncIterableIterator<Record<string, any>> {
  const { sqlite, pointer } = core
  for await (const stmt of sqlite.statements(pointer, sql)) {
    if (parameters?.length) {
      sqlite.bind_collection(stmt, parameters)
    }
    const cols = sqlite.column_names(stmt)
    while (await sqlite.step(stmt) === SQLITE_ROW) {
      const row = sqlite.row(stmt)
      // @ts-expect-error no check
      yield Object.fromEntries(cols.map((key, i) => [key, row[i]]))
    }
  }
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
  createCore: (fileName: string, data: InitData) => Promisable<SQLiteDBCore>,
): void {
  createWebOnMessageCallback<InitData>(async (fileName, initData) => {
    const core = await createCore(fileName, initData!)
    return {
      async all(sql, parameters) {
        return await runCore(core, sql, parameters as any[])
      },
      async run(sql, parameters) {
        await runCore(core, sql, parameters as any[])
        return {
          changes: changesCore(core),
          lastInsertRowid: lastInsertRowIdCore(core),
        }
      },
      async close() {
        await closeCore(core)
      },
      iterator(_, sql, parameters) {
        return iteratorCore(core, sql, parameters as any[])
      },
    }
  })
}
