import type { IGenericSqliteExecutor } from 'kysely-generic-sqlite'
import { workerData } from 'node:worker_threads'
import Database, { type Database as BetterSqlite3Database } from 'better-sqlite3'
import { createNodeOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-node'

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
    return createSqliteExecutor(db)
  })
}

export function createSqliteExecutor(db: BetterSqlite3Database): IGenericSqliteExecutor {
  const getStmt = (sql: string) => db.prepare(sql)

  return {
    all: (sql, parameters) => getStmt(sql).all(parameters),
    run: (sql, parameters) => getStmt(sql).run(parameters),
    close: () => db.close(),
    iterator: (isSelect, sql, parameters) => {
      if (!isSelect) {
        throw new Error('Only support select in stream()')
      }
      return getStmt(sql).iterate(parameters) as any
    },
  }
}
