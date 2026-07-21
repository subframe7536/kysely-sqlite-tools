import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import Database from 'better-sqlite3'
import { Kysely } from 'kysely'
import { describe, expect, it } from 'vitest'

import { testCase } from '../../test-utils'
import { SqliteWorkerDialect } from '../dist/index.mjs'

const distIndexUrl = pathToFileURL(
  join(dirname(fileURLToPath(import.meta.url)), '../dist/index.mjs'),
).href

interface SeededDb {
  seed: {
    id: number
    name: string
  }
}

describe('sqlite worker dialect test', () => {
  it('constructs with the default ESM worker path', async () => {
    const dialect = new SqliteWorkerDialect({
      source: ':memory:',
    })

    const driver = dialect.createDriver()
    await expect(driver.init()).resolves.toBeUndefined()
    await driver.destroy()
  })

  it('preserves Buffer database sources in the default ESM worker', async () => {
    const source = new Database(':memory:')
    source.exec(`
      create table seed (id integer primary key, name text not null);
      insert into seed (id, name) values (1, 'from serialized buffer');
    `)
    const serialized = source.serialize()
    source.close()

    const db = new Kysely<SeededDb>({
      dialect: new SqliteWorkerDialect({
        source: serialized,
      }),
    })

    try {
      await expect(db.selectFrom('seed').selectAll().execute()).resolves.toStrictEqual([
        { id: 1, name: 'from serialized buffer' },
      ])
    } finally {
      await db.destroy()
    }
  })

  it('passes Buffer database sources to custom worker create callbacks', async () => {
    const source = new Database(':memory:')
    source.exec(`
      create table seed (id integer primary key, name text not null);
      insert into seed (id, name) values (1, 'from custom worker');
    `)
    const serialized = source.serialize()
    source.close()

    const tempDir = await mkdtemp(join(tmpdir(), 'kysely-sqlite-worker-'))
    const workerPath = join(tempDir, 'custom-worker.mjs')

    await writeFile(
      workerPath,
      `
        import { createOnMessageCallback, defaultCreateDatabaseFn } from ${JSON.stringify(distIndexUrl)}

        createOnMessageCallback((source, options) => {
          if (!Buffer.isBuffer(source)) {
            throw new Error('expected Buffer source')
          }
          return defaultCreateDatabaseFn(source, options)
        })
      `,
    )

    const db = new Kysely<SeededDb>({
      dialect: new SqliteWorkerDialect({
        source: serialized,
        workerPath,
      }),
    })

    try {
      await expect(db.selectFrom('seed').selectAll().execute()).resolves.toStrictEqual([
        { id: 1, name: 'from custom worker' },
      ])
    } finally {
      await db.destroy()
      await rm(tempDir, { recursive: true })
    }
  })

  it('better-sqlite3 worker', async () => {
    const dialect = new SqliteWorkerDialect({
      source: ':memory:',
      workerPath: new URL('../dist/worker.mjs', import.meta.url) as never,
    })
    await testCase(dialect as never, expect, true)
  })
})
