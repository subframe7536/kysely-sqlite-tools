import type Database from 'bun:sqlite'
import type { Statement } from 'bun:sqlite'
import type { IGenericSqliteExecutor, Promisable } from 'kysely-generic-sqlite'
import type { InitData } from '../type'
import { createWebOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-web'

async function* iterator(stmt: Statement, parameters?: readonly unknown[]): AsyncIterableIterator<Record<string, any>> {
  if (!('iterate' in stmt)) {
    throw new Error('Streaming not supported, please upgrade to Bun@^1.1.31')
  }
  for (const row of stmt.iterate(...parameters || [] as any)) {
    yield row as any
  }
}

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
  create: (fileName: string) => Promisable<Database>,
): void {
  createWebOnMessageCallback<InitData>(
    async ({ cache, fileName }) => {
      const db = await create(fileName)
      return createSqliteExecutor(db, cache)
    },
  )
}

export function createSqliteExecutor(db: Database, cache: boolean): IGenericSqliteExecutor {
  const fn = cache ? 'query' : 'prepare'
  const getStmt = (sql: string) => db[fn](sql)

  return {
    all: (sql, parameters) => getStmt(sql).all(...parameters || []),
    run: (sql, parameters) => getStmt(sql).run(...parameters || []),
    close: () => db.close(),
    iterator: (_, sql, parameters) => iterator(getStmt(sql), parameters),
  }
}
