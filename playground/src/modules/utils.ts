import type { Dialect } from 'kysely'
import { SqliteBuilder } from 'kysely-sqlite-builder'
import type { InferDatabase } from 'kysely-sqlite-builder/schema'
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
export type TestRow = DB['test']

export async function testDB(dialect: Dialect, onBeforeDestroy?: () => void | Promise<void>) {
  const db = new SqliteBuilder<DB>({
    dialect,
    // onQuery: true,
  })

  const result = await db.syncDB(useSchema(tables))
  if (!result.ready) {
    throw result.error
  }

  for (let i = 0; i < 10; i++) {
    await db.transaction(async () => {
      try {
        await db.transaction(async () => {
          if (i > 8) {
            throw new Error('test rollback')
          }
          await db
            .insertInto('test')
            .values({
              name: `test at ${Date.now()}`,
              blobtest: Uint8Array.from([2, 3, 4, 5, 6, 7, 8]),
            })
            .execute()
        })
      } catch {
        // Keep one intentional rollback in the sample flow without interrupting the visual result.
      }
    })
  }

  try {
    for await (const _row of db.selectFrom('test').selectAll().stream(2)) {
      // Streaming is exercised to verify dialect support; the final table query below drives the UI.
    }
  } catch {
    // Some browser-backed dialects do not support streaming consistently. The playground still shows
    // the final materialized query so users can compare dialect behavior without opening devtools.
  }

  const data = await db.selectFrom('test').selectAll().execute()

  await onBeforeDestroy?.()
  await db.destroy()
  return data
}
