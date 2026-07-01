import Database from 'better-sqlite3'
import { CompiledQuery, Kysely } from 'kysely'
import { describe, expect, it } from 'vitest'

import { testCase } from '../../test-utils'
import { buildQueryFn, GenericSqliteDialect, parseBigInt } from '../src'
import { createGenericOnMessageCallback, GenericSqliteWorkerDialect } from '../src/worker'
import type { IGenericEventEmitter } from '../src/worker'
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
  it('does not request metadata for empty returning queries', async () => {
    const calls: string[] = []
    const dialect = new GenericSqliteDialect(() => ({
      db: {},
      query: buildQueryFn({
        all: (sql) => {
          calls.push(sql)
          return []
        },
        run: (sql) => {
          calls.push(sql)
          return {
            insertId: 0n,
            numAffectedRows: 0n,
          }
        },
      }),
      close: () => {},
    }))
    const db = new Kysely<{ test: { age: number; id: number } }>({ dialect })

    try {
      await db.updateTable('test').set({ age: 1 }).where('id', '=', -1).returningAll().execute()
    } finally {
      await db.destroy()
    }

    expect(calls).toHaveLength(1)
    expect(calls[0]).toContain('returning')
  })
  it('ignores returning inside raw SQL literals', async () => {
    const calls: string[] = []
    const query = buildQueryFn({
      all: (sql) => {
        calls.push(sql)
        return []
      },
      run: (sql) => {
        calls.push(sql)
        return {
          insertId: 1n,
          numAffectedRows: 1n,
        }
      },
    })

    const result = await query(false, "insert into test(name) values ('returning')", [], {} as any)

    expect(result).toStrictEqual({
      insertId: 1n,
      numAffectedRows: 1n,
      rows: [],
    })
    expect(calls).toStrictEqual(["insert into test(name) values ('returning')"])
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
  it('buffers synchronous worker stream rows without dropping data', async () => {
    const mitt = createTestMitt()
    const messages: unknown[] = []
    const onMessage = createGenericOnMessageCallback(
      async () => ({
        db: {},
        close: () => {},
        query: () => ({ rows: [] }),
        *iterator() {
          yield { id: 1 }
          yield { id: 2 }
          yield { id: 3 }
        },
      }),
      (message) => {
        messages.push(message)
        const [type, ...args] = message as [string, ...unknown[]]
        mitt.emit(type, ...args)
      },
    )

    const dialect = new GenericSqliteWorkerDialect(() => ({
      mitt,
      worker: {
        postMessage: (message) => void onMessage(message as never),
        terminate: () => {},
      },
      handle: () => {},
    }))
    const driver = dialect.createDriver()
    await driver.init()

    const connection = await driver.acquireConnection()
    const query = CompiledQuery.raw('select 1')
    const rows: unknown[] = []
    for await (const result of connection.streamQuery(query, 1)) {
      rows.push(...result.rows)
    }
    await driver.releaseConnection(connection)
    await driver.destroy()

    expect(rows).toStrictEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
    expect(messages).toHaveLength(6)
  })
})

function createTestMitt(): IGenericEventEmitter {
  const listeners = new Map<string, Set<(...value: any[]) => void>>()

  return {
    emit: (eventName: string, ...args: any[]) => {
      for (const listener of listeners.get(eventName) ?? []) {
        listener(...args)
      }
    },
    on: (eventName: string, callback: (...value: any[]) => void) => {
      const eventListeners = listeners.get(eventName) ?? new Set()
      eventListeners.add(callback)
      listeners.set(eventName, eventListeners)
    },
    once: (eventName: string, callback: (...value: any[]) => void) => {
      const onceCallback = (...value: any[]): void => {
        listeners.get(eventName)?.delete(onceCallback)
        callback(...value)
      }
      const eventListeners = listeners.get(eventName) ?? new Set()
      eventListeners.add(onceCallback)
      listeners.set(eventName, eventListeners)
    },
    off: (eventName?: string): void => {
      if (eventName) {
        listeners.delete(eventName)
      } else {
        listeners.clear()
      }
    },
  }
}
