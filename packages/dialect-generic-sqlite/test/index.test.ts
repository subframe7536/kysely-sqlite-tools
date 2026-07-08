import Database from 'better-sqlite3'
import { CompiledQuery, Kysely } from 'kysely'
import { describe, expect, it } from 'vitest'

import { testCase } from '../../test-utils'
import { buildQueryFn, GenericSqliteDialect, parseBigInt } from '../src'
import { createGenericOnMessageCallback, GenericSqliteWorkerDialect } from '../src/worker'
import type { IGenericEventEmitter } from '../src/worker'
import {
  cancelEvent,
  closeEvent,
  dataEvent,
  endEvent,
  initEvent,
  runEvent,
} from '../src/worker/types'

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

  it('rejects worker streams when iterator is unsupported', async () => {
    const mitt = createTestMitt()
    const onMessage = createGenericOnMessageCallback(
      async () => ({
        db: {},
        close: () => {},
        query: () => ({ rows: [] }),
      }),
      (message) => {
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
    const stream = connection.streamQuery(CompiledQuery.raw('select 1'), 1)

    await expect(stream.next()).rejects.toThrow('streamQuery() is not supported.')

    // await driver.releaseConnection(connection)
    await driver.destroy()
  })

  it('rejects worker streams when iterator throws', async () => {
    const mitt = createTestMitt()
    const onMessage = createGenericOnMessageCallback(
      async () => ({
        db: {},
        close: () => {},
        query: () => ({ rows: [] }),
        *iterator() {
          yield { id: 1 }
          throw new Error('iterator failed')
        },
      }),
      (message) => {
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
    const stream = connection.streamQuery(CompiledQuery.raw('select 1'), 1)

    await expect(stream.next()).resolves.toStrictEqual({
      done: false,
      value: { rows: [{ id: 1 }] },
    })
    await expect(stream.next()).rejects.toThrow('iterator failed')

    // await driver.releaseConnection(connection)
    await driver.destroy()
  })

  it('resolves init and destroy with synchronous worker acknowledgements', async () => {
    const mitt = createTestMitt()
    const driver = new GenericSqliteWorkerDialect(() => ({
      mitt,
      worker: {
        postMessage: (message) => {
          const [type] = message as [string]
          if (type === initEvent || type === closeEvent) {
            mitt.emit(type, null, null, null)
          }
        },
        terminate: () => {},
      },
      handle: () => {},
    })).createDriver()

    await expect(driver.init()).resolves.toBeUndefined()
    await expect(driver.destroy()).resolves.toBeUndefined()
  })

  it('rejects aborted worker queries and ignores late responses', async () => {
    const mitt = createTestMitt()
    let capturedMessage: unknown[] | undefined
    const driver = new GenericSqliteWorkerDialect(() => ({
      mitt,
      worker: {
        postMessage: (message) => {
          const [type] = message as [string]
          if (type === initEvent || type === closeEvent) {
            mitt.emit(type, null, null, null)
            return
          }
          capturedMessage = message as unknown[]
        },
        terminate: () => {},
      },
      handle: () => {},
    })).createDriver()

    await driver.init()

    const controller = new AbortController()
    const connection = await driver.acquireConnection()
    const promise = connection.executeQuery(CompiledQuery.raw('select 1'), {
      signal: controller.signal,
    })

    controller.abort()

    await expect(promise).rejects.toThrow('Query aborted')
    expect(capturedMessage?.[0]).toBe(runEvent)

    mitt.emit(runEvent, capturedMessage?.[1], { rows: [{ id: 1 }] }, null)

    await expect(driver.destroy()).resolves.toBeUndefined()
  })

  it('sends worker stream cancellation when aborted', async () => {
    const mitt = createTestMitt()
    const messages: unknown[][] = []
    const driver = new GenericSqliteWorkerDialect(() => ({
      mitt,
      worker: {
        postMessage: (message) => {
          const msg = message as unknown[]
          messages.push(msg)
          const [type] = msg as [string]
          if (type === initEvent || type === closeEvent) {
            mitt.emit(type, null, null, null)
          }
        },
        terminate: () => {},
      },
      handle: () => {},
    })).createDriver()

    await driver.init()

    const controller = new AbortController()
    const connection = await driver.acquireConnection()
    const stream = connection.streamQuery(CompiledQuery.raw('select 1'), 1, {
      signal: controller.signal,
    })
    const next = stream.next()
    const streamMsg = messages.find(([type]) => type === dataEvent)

    controller.abort()

    await expect(next).rejects.toThrow('Query aborted')
    expect(messages).toContainEqual([cancelEvent, streamMsg?.[1]])

    await expect(driver.destroy()).resolves.toBeUndefined()
  })

  it('returns active worker stream iterators when cancelled', async () => {
    const messages: unknown[][] = []
    let resolveNext: ((value: IteratorResult<unknown>) => void) | undefined
    let returned = false

    const iterator: AsyncIterableIterator<unknown> = {
      [Symbol.asyncIterator]() {
        return this
      },
      next: (() => {
        let first = true
        return () => {
          if (first) {
            first = false
            return Promise.resolve({ done: false, value: { id: 1 } })
          }
          return new Promise<IteratorResult<unknown>>((resolve) => {
            resolveNext = resolve
          })
        }
      })(),
      return: () => {
        returned = true
        resolveNext?.({ done: true, value: undefined })
        return Promise.resolve({ done: true, value: undefined })
      },
      throw: (error?: unknown) => Promise.reject(error),
    }

    const onMessage = createGenericOnMessageCallback(
      async () => ({
        db: {},
        close: () => {},
        query: () => ({ rows: [] }),
        iterator: () => iterator,
      }),
      (message) => messages.push(message as unknown[]),
    )

    await onMessage([initEvent, {}])
    const stream = onMessage([dataEvent, 'stream-a', true, 'select 1', [], 1])
    await Promise.resolve()

    await onMessage([cancelEvent, 'stream-a'])
    await stream

    expect(returned).toBe(true)
    expect(messages).toStrictEqual([
      [initEvent, null, null, null],
      [dataEvent, 'stream-a', { id: 1 }, null],
    ])
    expect(messages.some(([type]) => type === endEvent)).toBe(false)
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
    // await driver.releaseConnection(connection)
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
