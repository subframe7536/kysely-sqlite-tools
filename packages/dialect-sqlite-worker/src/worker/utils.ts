import type BetterSqlite3 from 'better-sqlite3'
import type { IGenericSqlite, Promisable } from 'kysely-generic-sqlite'
import type { MessageHandleFn } from 'kysely-generic-sqlite/worker'

import { workerData } from 'node:worker_threads'

import Database from 'better-sqlite3'
import { parseBigInt } from 'kysely-generic-sqlite'
import { createNodeOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-node'

export type CreateDatabaseFn = (
  filename?: string | Buffer,
  options?: BetterSqlite3.Options
) => Promisable<BetterSqlite3.Database>

export const defaultCreateDatabaseFn: CreateDatabaseFn
  = (fileName, options) => new Database(fileName, options)

/**
 * Handle worker message, support custom message handler,
 * built-in: {@link defaultCreateDatabaseFn}
 * @example
 * in `worker.ts`
 * ```ts
 * import { createOnMessageCallback, defaultCreateDatabaseFn } from 'kysely-sqlite-worker'
 *
 * createOnMessageCallback(
 *   async (...args) => {
 *     const db = defaultCreateDatabaseFn(...args)
 *     db.loadExtension(...)
 *     return db
 *   },
 *   ([type, exec, data1, data2, data3]) => {
 *     if (type === 'export') {
 *       return exec.db.export()
 *     }
 *   },
 * )
 * ```
 */
export function createOnMessageCallback(
  create: CreateDatabaseFn,
  message?: MessageHandleFn<BetterSqlite3.Database>,
): void {
  const { src, option } = workerData
  createNodeOnMessageCallback<{}, BetterSqlite3.Database>(
    async () => {
      const db = await create(src, option)
      return createSqliteExecutor(db)
    },
    message,
  )
}

export function createSqliteExecutor(db: BetterSqlite3.Database): IGenericSqlite<BetterSqlite3.Database> {
  const getStmt = (sql: string) => db.prepare(sql)

  return {
    db,
    query: (_isSelect, sql, parameters) => {
      const stmt = getStmt(sql)
      if (stmt.reader) {
        return { rows: stmt.all(parameters) }
      }
      const { changes, lastInsertRowid } = stmt.run(parameters)
      return {
        rows: [],
        numAffectedRows: parseBigInt(changes),
        insertId: parseBigInt(lastInsertRowid),
      }
    },
    close: () => db.close(),
    iterator: (isSelect, sql, parameters) => {
      if (!isSelect) {
        throw new Error('Only support select in stream()')
      }
      return getStmt(sql).iterate(parameters) as any
    },
  }
}
