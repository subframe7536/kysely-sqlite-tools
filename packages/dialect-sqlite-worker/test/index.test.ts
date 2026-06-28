import './better-sqlite3-preload'

import { describe, expect, it } from 'bun:test'
import { fileURLToPath } from 'node:url'

import { testCase } from '../../test-utils'

const { SqliteWorkerDialect } = await import('../src/index')

describe('sqlite worker dialect test (requires Node better-sqlite3 runtime)', () => {
  it('test sqlite worker', async () => {
    const dialect = new SqliteWorkerDialect({
      source: ':memory:',
      workerPath: fileURLToPath(new URL('./sqlite-worker.mock.ts', import.meta.url)),
    })
    await testCase(dialect as never, expect)
  })
})
