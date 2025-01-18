import type BetterSqlite3 from 'better-sqlite3'
import type { IGenericSqliteExecutor, Promisable } from 'kysely-generic-sqlite'
import type { RestMessageHandleFn } from 'kysely-generic-sqlite/worker'
import { workerData } from 'node:worker_threads'
import Database from 'better-sqlite3'
import { createNodeOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-node'

export type CreateDatabaseFn = (
  filename?: string | Buffer,
  options?: BetterSqlite3.Options
) => Promisable<BetterSqlite3.Database>

export const defaultCreateDatabaseFn: CreateDatabaseFn
  = (fileName, options) => new Database(fileName, options)

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
  create: CreateDatabaseFn,
  rest?: RestMessageHandleFn<BetterSqlite3.Database>,
): void {
  const { src, option } = workerData
  createNodeOnMessageCallback<{}, BetterSqlite3.Database>(
    async () => {
      const db = await create(src, option)
      return createSqliteExecutor(db)
    },
    rest,
  )
}

function createSqliteExecutor(db: BetterSqlite3.Database): IGenericSqliteExecutor<BetterSqlite3.Database> {
  const getStmt = (sql: string) => db.prepare(sql)

  return {
    db,
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
