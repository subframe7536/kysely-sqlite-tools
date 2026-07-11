import Database from 'better-sqlite3'
import { CompiledQuery } from 'kysely'
import { describe, expect, it } from 'vitest'

import { testCase } from '../../test-utils'
import { buildQueryFn, GenericSqliteDialect, parseBigInt } from '../src'
import { GenericSqliteWorkerConnection, GenericSqliteWorkerDialect } from '../src/worker'
import type { WorkerHandlers, WorkerResponse } from '../src/worker'
import { createGenericOnMessageCallback } from '../src/worker/utils'

describe('generic sqlite dialect', () => {
  it('executes better-sqlite3 queries', async () => {
    const db = new Database(':memory:')
    await testCase(
      new GenericSqliteDialect(() => ({
        db,
        query: buildQueryFn({
          all: (sql, parameters) => db.prepare(sql).all(parameters ?? []),
          run: (sql, parameters) => {
            const result = db.prepare(sql).run(parameters ?? [])
            return {
              insertId: parseBigInt(result.lastInsertRowid),
              numAffectedRows: parseBigInt(result.changes),
            }
          },
        }),
        close: () => db.close(),
      })),
      expect,
      false,
    )
  })

  it('allows callers to classify ambiguous raw SQL', async () => {
    const calls: string[] = []
    const query = buildQueryFn({
      isQuery: () => false,
      all: (sql) => {
        calls.push(`all:${sql}`)
        return []
      },
      run: (sql) => {
        calls.push(`run:${sql}`)
        return { insertId: 1n, numAffectedRows: 1n }
      },
    })
    await query(false, 'with x(v) as (select 1) insert into test(v) select v from x', [])
    expect(calls[0]).toMatch(/^run:/)
  })

  it('closes the executor when connection setup fails', async () => {
    let closed = 0
    const dialect = new GenericSqliteDialect(
      () => ({
        db: {},
        close: () => {
          closed++
        },
        query: () => ({ rows: [] }),
      }),
      async () => {
        throw new Error('connection setup failed')
      },
    )
    const driver = dialect.createDriver()

    await expect(driver.init()).rejects.toThrow('connection setup failed')
    expect(closed).toBe(1)

    await driver.destroy()
    expect(closed).toBe(1)
  })

  it('pulls worker rows in batches without buffering the whole stream', async () => {
    let iteratorChunkSize: number | undefined
    const { dialect } = createInMemoryWorkerDialect(async () => ({
      db: {},
      close: () => {},
      query: () => ({ rows: [] }),
      *iterator(
        _isSelect: boolean,
        _sql: string,
        _parameters: readonly unknown[],
        chunkSize?: number,
      ) {
        iteratorChunkSize = chunkSize
        yield { id: 1 }
        yield { id: 2 }
        yield { id: 3 }
      },
    }))
    const driver = dialect.createDriver()
    await driver.init()
    const connection = await driver.acquireConnection()
    const batches: unknown[][] = []
    for await (const result of connection.streamQuery(CompiledQuery.raw('select 1'), 2)) {
      batches.push(result.rows)
    }
    expect(batches).toStrictEqual([[{ id: 1 }, { id: 2 }], [{ id: 3 }]])
    expect(iteratorChunkSize).toBe(2)
    await driver.destroy()
  })

  it('does not send an already-aborted query to the worker', async () => {
    const controller = new AbortController()
    controller.abort(new Error('query aborted'))
    const connection = new GenericSqliteWorkerConnection({
      postMessage: () => {
        throw new Error('worker should not receive an aborted query')
      },
      terminate: () => {},
    })

    await expect(
      connection.executeQuery(CompiledQuery.raw('select 1'), { signal: controller.signal }),
    ).rejects.toThrow('query aborted')
  })

  it('cancels a worker stream when its operation signal is aborted', async () => {
    let returned = false
    const { dialect } = createInMemoryWorkerDialect(async () => ({
      db: {},
      close: () => {},
      query: () => ({ rows: [] }),
      iterator: () => ({
        next: async () => ({ done: false, value: { id: 1 } }),
        return: async () => {
          returned = true
          return { done: true, value: undefined }
        },
        [Symbol.asyncIterator]() {
          return this
        },
      }),
    }))
    const driver = dialect.createDriver()
    await driver.init()
    const connection = await driver.acquireConnection()
    const controller = new AbortController()
    const stream = connection.streamQuery(CompiledQuery.raw('select 1'), 1, {
      signal: controller.signal,
    })

    await stream.next()
    controller.abort(new Error('stream aborted'))

    await expect(stream.next()).rejects.toThrow('stream aborted')
    expect(returned).toBe(true)
    await driver.destroy()
  })

  it('acknowledges cancellation even when iterator cleanup fails', async () => {
    const { dialect } = createInMemoryWorkerDialect(async () => ({
      db: {},
      close: () => {},
      query: () => ({ rows: [] }),
      iterator: () => ({
        next: async () => ({ done: false, value: { id: 1 } }),
        return: async () => {
          throw new Error('cleanup failed')
        },
        [Symbol.iterator]() {
          return this
        },
      }),
    }))
    const driver = dialect.createDriver()
    await driver.init()
    const connection = await driver.acquireConnection()
    const stream = connection.streamQuery(CompiledQuery.raw('select 1'), 1)
    await stream.next()
    await expect(stream.return!()).resolves.toMatchObject({ done: true })
    await driver.destroy()
  })

  it('waits for an active query before closing the worker database', async () => {
    let finish: (() => void) | undefined
    const events: string[] = []
    const { dialect } = createInMemoryWorkerDialect(async () => ({
      db: {},
      query: async () => {
        events.push('query')
        await new Promise<void>((resolve) => {
          finish = resolve
        })
        return { rows: [] }
      },
      close: () => events.push('close'),
    }))
    const driver = dialect.createDriver()
    await driver.init()
    const connection = await driver.acquireConnection()
    const running = connection.executeQuery(CompiledQuery.raw('select 1'))
    await Promise.resolve()
    const destroying = driver.destroy()
    await Promise.resolve()
    expect(events).toStrictEqual(['query'])
    finish?.()
    await running
    await destroying
    expect(events).toStrictEqual(['query', 'close'])
  })

  it('rejects pending operations when the worker fails', async () => {
    let handlers: WorkerHandlers | undefined
    const dialect = new GenericSqliteWorkerDialect(() => ({
      worker: { postMessage: () => {}, terminate: () => {} },
      handle: (_worker, value) => {
        handlers = value
        return () => {}
      },
    }))
    const driver = dialect.createDriver()
    const init = driver.init()
    await Promise.resolve()
    handlers?.error(new Error('worker crashed'))
    await expect(init).rejects.toThrow('worker crashed')
  })
})

function createInMemoryWorkerDialect(init: () => any): {
  dialect: GenericSqliteWorkerDialect<any, Record<string, unknown>>
} {
  let handlers: WorkerHandlers | undefined
  const post = createGenericOnMessageCallback(init, (response: WorkerResponse) =>
    handlers?.message(response),
  )
  const dialect = new GenericSqliteWorkerDialect(() => ({
    worker: { postMessage: (message) => void post(message as any), terminate: () => {} },
    handle: (_worker, value) => {
      handlers = value
      return () => {}
    },
  }))
  return { dialect }
}
