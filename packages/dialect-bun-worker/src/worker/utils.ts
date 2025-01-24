import type { Statement } from 'bun:sqlite'
import type { MessageHandleFn } from 'kysely-generic-sqlite/worker'
import type { InitData } from '../type'
import Database from 'bun:sqlite'
import { buildQueryFn, type IGenericSqlite, parseBigInt, type Promisable } from 'kysely-generic-sqlite'
import { createWebOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-web'

async function* iterateData(
  stmt: Statement,
  parameters?: readonly unknown[],
): AsyncIterableIterator<Record<string, any>> {
  if (!('iterate' in stmt)) {
    throw new Error('Streaming not supported, please upgrade to Bun@^1.1.31')
  }
  for (const row of stmt.iterate(...parameters || [] as any)) {
    yield row as any
  }
}

export type CreateDatabaseFn = (fileName: string) => Promisable<Database>

export const defaultCreateDatabaseFn: CreateDatabaseFn
  = fileName => new Database(fileName, { create: true })

/**
 * Handle worker message, support custom callback on initialization
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
    async ({ cache, fileName }) => {
      const db = await create(fileName)
      return createSqliteExecutor(db, cache)
    },
    message,
  )
}

function createSqliteExecutor(db: Database, cache: boolean): IGenericSqlite<Database> {
  const fn = cache ? 'query' : 'prepare'
  const getStmt = (sql: string) => db[fn](sql)

  return {
    db,
    query: buildQueryFn({
      all: (sql, parameters) => getStmt(sql).all(...parameters || []),
      run: (sql, parameters) => {
        const { changes, lastInsertRowid } = getStmt(sql).run(...parameters || [])
        return {
          insertId: parseBigInt(lastInsertRowid),
          numAffectedRows: parseBigInt(changes),
        }
      },
    }),
    close: () => db.close(),
    iterator: (_, sql, parameters) => iterateData(getStmt(sql), parameters),
  }
}
