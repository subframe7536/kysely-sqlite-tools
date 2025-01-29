import type { Dialect } from 'kysely'
import type { InferDatabase } from 'kysely-sqlite-builder/schema'
import { SqliteBuilder } from 'kysely-sqlite-builder'
import { column, defineTable, useSchema } from 'kysely-sqlite-builder/schema'

const tables = {
  test: defineTable({
    columns: {
      id: column.increments(),
      name: column.string(),
      blobtest: column.blob(),
    },
    createAt: true,
    updateAt: true,
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
  console.log(await db.execute(`PRAGMA table_info('test')`))
  // console.log(await db.execute(`select fts5(?1)`))

  for (let i = 0; i < 10; i++) {
    await db.transaction(async () => {
      await db.transaction(async () => {
        if (i > 8) {
          console.log('test rollback')
          throw new Error('test rollback')
        }
        await db.insertInto('test')
          .values({
            name: `test at ${Date.now()}`,
            blobtest: Uint8Array.from([2, 3, 4, 5, 6, 7, 8]),
          })
          .execute()
      })
    })
  }

  try {
    for await (const v of db.selectFrom('test').selectAll().stream(2)) {
      console.log('Stream Query', v)
    }
  } catch (error) {
    console.warn(error)
  }

  return db.selectFrom('test').selectAll().execute().then(async (data) => {
    await db.destroy()
    console.log(data)
    return data
  })
}
