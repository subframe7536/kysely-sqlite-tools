import { describe, expect, it } from 'bun:test'

import { Kysely, sql } from 'kysely'

import { testCase } from '../../test-utils'
import { BunWorkerDialect } from '../src'

describe('bun worker dialect test', () => {
  it('bun:sqlite worker', async () => {
    await testCase(new BunWorkerDialect() as never, expect)
  })

  it('recreates the default worker after failed initialization', async () => {
    let attempts = 0
    const db = new Kysely<never>({
      dialect: new BunWorkerDialect({
        onCreateConnection: async () => {
          attempts += 1
          if (attempts === 1) {
            throw new Error('setup failed')
          }
        },
      }) as never,
    })

    try {
      await expect(sql`select 1`.execute(db)).rejects.toThrow('setup failed')

      const result = await Promise.race([
        sql<{ value: number }>`select 1 as value`.execute(db),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('second query timed out')), 1_000),
        ),
      ])

      expect(result.rows).toStrictEqual([{ value: 1 }])
      expect(attempts).toBe(2)
    } finally {
      await db.destroy()
    }
  })
})
