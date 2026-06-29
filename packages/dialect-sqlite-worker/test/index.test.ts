import { describe, expect, it } from 'vitest'

import { testCase } from '../../test-utils'
import { SqliteWorkerDialect } from '../dist/index.mjs'

describe('sqlite worker dialect test', () => {
  it('better-sqlite3 worker', async () => {
    const dialect = new SqliteWorkerDialect({
      source: ':memory:',
      workerPath: new URL('../dist/worker.mjs', import.meta.url) as never,
    })
    await testCase(dialect as never, expect)
  })
})
