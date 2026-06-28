import { describe, expect, it } from 'bun:test'
import { fileURLToPath } from 'node:url'

import { SqliteWorkerDialect } from 'kysely-sqlite-worker'

import { testCase } from './utils'

describe.skip('sqlite worker dialect test (requires Node better-sqlite3 runtime)', () => {
  it('test sqlite worker', async () => {
    const dialect = new SqliteWorkerDialect({
      source: ':memory:',
      workerPath: fileURLToPath(
        new URL('../packages/dialect-sqlite-worker/dist/worker.js', import.meta.url),
      ),
    })
    await testCase(dialect, expect)
  })
})
