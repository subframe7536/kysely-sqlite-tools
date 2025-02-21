import type { DBOptions, InitData } from '../type'
import type { Promisable } from 'kysely-generic-sqlite'
import type { MessageHandleFn } from 'kysely-generic-sqlite/worker'

import Database from 'bun:sqlite'
import { createWebOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-web'

import { createSqliteExecutor } from '../executor'

export { createSqliteExecutor } from '../executor'

export type CreateDatabaseFn = (
  fileName: string,
  opt: DBOptions
) => Promisable<Database>

export const defaultCreateDatabaseFn: CreateDatabaseFn
  = (fileName, opt) => new Database(fileName, opt)

/**
 * Handle worker message, support custom callback on initialization.
 * Built-in: {@link defaultCreateDatabaseFn}
 * @example
 * // worker.ts
 * import { createOnMessageCallback } from 'kysely-bun-worker'
 *
 * createOnMessageCallback(
 *   async (db) => {
 *     db.loadExtension(...)
 *   }
 * )
 */
export function createOnMessageCallback(
  create: CreateDatabaseFn,
  message?: MessageHandleFn<Database>,
): void {
  createWebOnMessageCallback<InitData, Database>(
    async ({ cache, fileName, opt }) => {
      const db = await create(fileName, opt)
      return createSqliteExecutor(db, cache)
    },
    message,
  )
}
