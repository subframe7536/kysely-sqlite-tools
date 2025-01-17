import { workerData } from 'node:worker_threads'
import Database from 'better-sqlite3'
import { createNodeOnMessageCallback } from 'kysely-generic-sqlite/node-helper'

/**
 * Handle worker message, support custom callback on initialization
 * @example
 * // worker.ts
 * import { createOnMessageCallback } from 'kysely-sqlite-worker'
 *
 * createOnMessageCallback(
 *   async (db) => {
 *     db.loadExtension(...)
 *   }
 * )
 */
export function createOnMessageCallback(onInit?: (db: typeof Database) => void): void {
  const { src, option } = workerData
  createNodeOnMessageCallback<{}>(() => {
    const db = new Database(src, option)
    onInit?.(db as any)
    return {
      all: (sql, parameters) => db.prepare(sql).all(parameters),
      run: (sql, parameters) => db.prepare(sql).run(parameters),
      close: () => db.close(),
      iterator: (isSelect, sql, parameters) => {
        if (!isSelect) {
          throw new Error('Only support select in stream()')
        }
        return db.prepare(sql).iterate(parameters) as any
      },
    }
  })
}
