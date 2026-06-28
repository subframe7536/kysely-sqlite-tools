import Database from 'bun:sqlite'

import { buildQueryFn, parseBigInt } from '../../dialect-generic-sqlite/src'
import { createWebOnMessageCallback } from '../../dialect-generic-sqlite/src/worker/web-helper'

createWebOnMessageCallback(async ({ fileName }: { fileName?: string }) => {
  const db = new Database(fileName || ':memory:')
  return {
    db,
    query: buildQueryFn({
      all: (sql, parameters) => db.prepare(sql).all(...((parameters as any[]) ?? [])),
      run: (sql, parameters) => {
        const { changes, lastInsertRowid } = db.prepare(sql).run(...((parameters as any[]) ?? []))
        return {
          numAffectedRows: parseBigInt(changes),
          insertId: parseBigInt(lastInsertRowid),
        }
      },
    }),
    close: () => db.close(),
  }
})
