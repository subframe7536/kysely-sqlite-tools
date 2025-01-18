import type BetterSqlite3 from 'better-sqlite3'
import type { IGenericSqliteExecutor, Promisable } from 'kysely-generic-sqlite'
import { workerData } from 'node:worker_threads'
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
export function createOnMessageCallback(
  create: (
    filename?: string | Buffer,
    options?: BetterSqlite3.Options
  ) => Promisable<BetterSqlite3.Database>,
): void {
  const { src, option } = workerData
  createNodeOnMessageCallback<{}>(
    async () => {
      const db = await create(src, option)
      return createSqliteExecutor(db)
    },
  )
}

export function createSqliteExecutor(db: BetterSqlite3.Database): IGenericSqliteExecutor {
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
