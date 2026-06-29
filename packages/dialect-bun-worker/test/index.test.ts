import { describe, expect, it } from 'bun:test'

import { testCase } from '../../test-utils'
import { BunWorkerDialect } from '../src'

describe('bun worker dialect test', () => {
  it('bun:sqlite worker with non-cached statements', async () => {
    await testCase(new BunWorkerDialect() as never, expect, {
      insertId: true,
      numAffectedRows: true,
      stream: true,
    })
  })

  it('bun:sqlite worker with cached statements', async () => {
    await testCase(new BunWorkerDialect({ cacheStatment: true }) as never, expect, {
      insertId: true,
      numAffectedRows: true,
      stream: true,
    })
  })
})
