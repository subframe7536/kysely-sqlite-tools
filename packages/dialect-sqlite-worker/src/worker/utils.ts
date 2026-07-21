import { workerData } from 'node:worker_threads'

import type BetterSqlite3 from 'better-sqlite3'
import Database from 'better-sqlite3'
import type { IGenericSqlite, Promisable } from 'kysely-generic-sqlite'
import { parseBigInt } from 'kysely-generic-sqlite'
import type { WorkerRequestHandler } from 'kysely-generic-sqlite/worker'
import { createNodeOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-node'

/**
 * Factory signature for creating a `better-sqlite3` Database.
 */
export type CreateDatabaseFn = (
  filename?: string | Buffer,
  options?: BetterSqlite3.Options,
) => Promisable<BetterSqlite3.Database>

/**
 * Default database factory — creates a new `better-sqlite3` Database instance.
 */
export const defaultCreateDatabaseFn: CreateDatabaseFn = (fileName, options) =>
  new Database(normalizeDatabaseSource(fileName), options)

function normalizeDatabaseSource(
  source?: string | Buffer | Uint8Array,
): string | Buffer | undefined {
  if (typeof source === 'string' || source === undefined || Buffer.isBuffer(source)) {
    return source
  }
  return Buffer.from(source)
}

/**
 * Handle worker messages, with optional custom message handler.
 *
 * Uses {@link defaultCreateDatabaseFn} by default.
 *
 * @example
 * In `worker.ts`:
 * ```ts
 * import { createOnMessageCallback, defaultCreateDatabaseFn } from 'kysely-sqlite-worker'
 *
 * createOnMessageCallback(
 *   (fileName, options) => {
 *     const db = defaultCreateDatabaseFn(fileName, options)
 *     db.loadExtension(...)
 *     return db
 *   },
 *   (executor, { type, payload }) => {
 *     if (type === 'export') {
 *       return executor.db.export()
 *     }
 *     throw new Error(`Unknown worker request: ${type}`)
 *   },
 * )
 * ```
 */
export function createOnMessageCallback(
  create: CreateDatabaseFn,
  custom?: WorkerRequestHandler<BetterSqlite3.Database>,
): void {
  const { src, option } = workerData
  createNodeOnMessageCallback<{}, BetterSqlite3.Database>(async () => {
    const db = await create(src, option)
    return createSqliteExecutor(db)
  }, custom)
}

/**
 * Build a {@link IGenericSqlite} executor from a `better-sqlite3` Database.
 */
export function createSqliteExecutor(
  db: BetterSqlite3.Database,
): IGenericSqlite<BetterSqlite3.Database> {
  const getStmt = (sql: string): BetterSqlite3.Statement => db.prepare(sql)

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
      return getStmt(sql).iterate(parameters)
    },
  }
}
