import type { Dialect } from 'kysely'
import { SqliteBuilder } from 'kysely-sqlite-builder'
import type { InferDatabase } from 'kysely-sqlite-builder/schema'
import { defineTable, useSchema } from 'kysely-sqlite-builder/schema'

const tables = {
  test: defineTable({
    id: { type: 'increments' },
    name: { type: 'string' },
    blobtest: { type: 'blob' },
  }, {
    timeTrigger: { create: true, update: true },
  }),
}
export type DB = InferDatabase<typeof tables>
export async function testDB(dialect: Dialect) {
  const db = new SqliteBuilder<DB>({
    dialect,
    // onQuery: true,
  })

  const result = await db.syncDB(useSchema(tables))
  if (!result.ready) {
    throw result.error
  }
  console.log(await db.raw(`PRAGMA table_info('test')`))

  for (let i = 0; i < 10; i++) {
    await db.transaction(async () => {
      await db.transaction(async () => {
        if (i > 8) {
          console.log('test rollback')
          throw new Error('test rollback')
        }
        await db.execute(d => d
          .insertInto('test')
          .values({
            name: `test at ${Date.now()}`,
            blobtest: Uint8Array.from([2, 3, 4, 5, 6, 7, 8]),
          }),
        )
      })
    })
  }

  return db.execute(db => db.selectFrom('test').selectAll()).then(async (data) => {
    await db.destroy()
    console.log(data)
    return data
  })
}
