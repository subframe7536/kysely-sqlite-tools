import { describe, expect, it } from 'bun:test'

import { testCase } from '../../test-utils'
import { BunWorkerDialect } from '../src'

describe('bun worker dialect test', () => {
  it('bun:sqlite worker', async () => {
    await testCase(new BunWorkerDialect() as never, expect)
  })
})
