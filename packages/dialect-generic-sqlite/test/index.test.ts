import Database from 'better-sqlite3'
import { describe, expect, it } from 'vitest'

import { testCase } from '../../test-utils'
import { buildQueryFn, GenericSqliteDialect, parseBigInt } from '../src'
import { createGenericOnMessageCallback } from '../src/worker'
import { initEvent, dataEvent, runEvent } from '../src/worker/types'

describe('generic sqlite dialect test', () => {
  it('better-sqlite3 executor', async () => {
    const db = new Database(':memory:')
    const dialect = new GenericSqliteDialect(() => ({
      db,
      query: buildQueryFn({
        all: (sql, parameters) => {
          const stmt = db.prepare(sql)
          if (stmt.reader) {
            return stmt.all(parameters ?? [])
          }
          stmt.run(parameters ?? [])
          return []
        },
        run: (sql, parameters) => {
          const { changes, lastInsertRowid } = db.prepare(sql).run(parameters ?? [])
          return {
            numAffectedRows: parseBigInt(changes),
            insertId: parseBigInt(lastInsertRowid),
          }
        },
      }),
      close: () => db.close(),
    }))

    await testCase(dialect, expect, false)
  })
  it('keeps worker query responses isolated by query id', async () => {
    const messages: unknown[] = []
    const onMessage = createGenericOnMessageCallback(
      async () => ({
        db: {},
        close: () => {},
        query: async (_isSelect, _sql, parameters) => ({
          rows: [{ id: parameters?.[0] }],
        }),
        *iterator(_isSelect, _sql, parameters, chunkSize) {
          yield {
            chunkSize,
            id: parameters?.[0],
          }
        },
      }),
      (message) => messages.push(message),
    )

    await onMessage([initEvent, {}])
    await onMessage([runEvent, 'query-a', true, 'select ?', ['a']])
    await onMessage([runEvent, 'query-b', true, 'select ?', ['b']])
    await onMessage([dataEvent, 'stream-a', true, 'select ?', ['a'], 2])

    expect(messages).toStrictEqual([
      [initEvent, null, null, null],
      [runEvent, 'query-a', { rows: [{ id: 'a' }] }, null],
      [runEvent, 'query-b', { rows: [{ id: 'b' }] }, null],
      [dataEvent, 'stream-a', { chunkSize: 2, id: 'a' }, null],
      ['4', 'stream-a', null, null],
    ])
  })
})
