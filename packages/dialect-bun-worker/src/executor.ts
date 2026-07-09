import type { Statement } from 'bun:sqlite'
import type Database from 'bun:sqlite'

import type { IGenericSqlite } from 'kysely-generic-sqlite'
import { parseBigInt } from 'kysely-generic-sqlite'

/**
 * Create a {@link IGenericSqlite} executor backed by `bun:sqlite`.
 *
 * When `cache` is `true`, uses `db.query()` for statement caching;
 * otherwise uses `db.prepare()`.
 */
export function createSqliteExecutor(db: Database, cache: boolean): IGenericSqlite<Database> {
  const fn = cache ? 'query' : 'prepare'
  const getStmt = (sql: string): Statement => db[fn](sql)

  return {
    db,
    query: (_, sql, parameters) => {
      const stmt = getStmt(sql)
      if (stmt.columnNames.length > 0) {
        return {
          rows: stmt.all(parameters),
        }
      } else {
        const { changes, lastInsertRowid } = stmt.run(parameters)
        return {
          numAffectedRows: parseBigInt(changes),
          insertId: parseBigInt(lastInsertRowid),
          rows: [],
        }
      }
    },
    close: () => db.close(),
    iterator: (_, sql, parameters) => iterateData(getStmt(sql), parameters),
  }
}
/**
 * Iterate over query results lazily.
 *
 * Requires Bun >= 1.1.31 for `stmt.iterate()` support.
 *
 * @yields rows as plain objects
 */
async function* iterateData(
  stmt: Statement,
  parameters?: readonly unknown[],
): AsyncIterableIterator<Record<string, any>> {
  if (!('iterate' in stmt)) {
    throw new Error('Streaming not supported, please upgrade to Bun@1.1.31 or later')
  }
  for (const row of stmt.iterate(...(parameters || ([] as any)))) {
    yield row as any
  }
}
