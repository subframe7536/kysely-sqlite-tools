// @ts-expect-error bun type
import { describe, expect, it } from 'bun:test'
import { BunWorkerDialect } from '../packages/dialect-bun-worker/src'
import { testCase } from '../test/utils'

describe('bun worker dialect test', () => {
  it('test bun worker', async () => {
    const dialect = new BunWorkerDialect({
      url: ':memory:',
    })
    await testCase(dialect, expect)
  })
})
