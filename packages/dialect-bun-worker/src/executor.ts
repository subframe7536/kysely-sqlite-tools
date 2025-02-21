import type { Statement } from 'bun:sqlite'
import type Database from 'bun:sqlite'
import type { IGenericSqlite } from 'kysely-generic-sqlite'

import { parseBigInt } from 'kysely-generic-sqlite'

export function createSqliteExecutor(db: Database, cache: boolean): IGenericSqlite<Database> {
  const fn = cache ? 'query' : 'prepare'
  const getStmt = (sql: string, parameters?: any[]) => db[fn](sql, parameters)

  return {
    db,
    query: (_, sql, parameters) => {
      const stmt = getStmt(sql, parameters as any[])
      if (stmt.columnNames.length > 0) {
        return {
          rows: stmt.all(),
        }
      } else {
        const { changes, lastInsertRowid } = stmt.run()
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
async function* iterateData(
  stmt: Statement,
  parameters?: readonly unknown[],
): AsyncIterableIterator<Record<string, any>> {
  if (!('iterate' in stmt)) {
    throw new Error('Streaming not supported, please upgrade to Bun@1.1.31 or later')
  }
  for (const row of stmt.iterate(...parameters || [] as any)) {
    yield row as any
  }
}
