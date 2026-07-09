import Database from 'bun:sqlite'

import type { Promisable } from 'kysely-generic-sqlite'
import type { MessageHandleFn } from 'kysely-generic-sqlite/worker'
import { createWebOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-web'

import { createSqliteExecutor } from '../executor'
import type { DBOptions, InitData } from '../type'

export { createSqliteExecutor } from '../executor'

/**
 * Factory signature for creating a `bun:sqlite` Database.
 */
export type CreateDatabaseFn = (fileName: string, opt: DBOptions) => Promisable<Database>

/**
 * Default database factory — creates a new `bun:sqlite` Database instance.
 */
export const defaultCreateDatabaseFn: CreateDatabaseFn = (fileName, opt) =>
  new Database(fileName, opt)

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
  createWebOnMessageCallback<InitData, Database>(async ({ cache, fileName, opt }) => {
    const db = await create(fileName, opt)
    return createSqliteExecutor(db, cache)
  }, message)
}
