import type { Statement } from 'bun:sqlite'
import { Database } from 'bun:sqlite'
import { workerData } from 'node:worker_threads'

import { parseBigInt } from '../../dialect-generic-sqlite/src'
import { createNodeOnMessageCallback } from '../../dialect-generic-sqlite/src/worker/node-helper'

const { src } = workerData

createNodeOnMessageCallback(async () => {
  const db = new Database(src)
  const getStmt = (sql: string): Statement => db.prepare(sql)

  return {
    db,
    query: (_isSelect: boolean, sql: string, parameters?: readonly unknown[]) => {
      const stmt = getStmt(sql)
      if (/^\s*(?:select|with|pragma)\b/i.test(sql) || /\breturning\b/i.test(sql)) {
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
    iterator: (isSelect: boolean, sql: string, parameters?: readonly unknown[]) => {
      if (!isSelect) {
        throw new Error('Only support select in stream()')
      }
      return getStmt(sql).iterate(parameters) as any
    },
  }
})
