import { describe, expect, it } from 'bun:test'

import { testCase } from '../../test-utils'
import { WaSqliteWorkerDialect } from '../src'

describe('wasqlite worker dialect test', () => {
  it('mock web worker', async () => {
    const dialect = new WaSqliteWorkerDialect({
      fileName: ':memory:',
      preferOPFS: false,
      worker: () => new Worker(new URL('./worker.mock.ts', import.meta.url), { type: 'module' }),
    })

    await testCase(dialect as never, expect, false)
  })
})
