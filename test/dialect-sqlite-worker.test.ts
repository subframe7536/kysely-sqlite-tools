import { describe, expect, it } from 'vitest'

import { SqliteWorkerDialect } from '../packages/dialect-sqlite-worker'
import { testCase } from './utils'

describe('sqlite worker dialect test', () => {
  it('test sqlite worker', async () => {
    const dialect = new SqliteWorkerDialect({
      source: ':memory:',
    })
    await testCase(dialect, expect)
  })
})
