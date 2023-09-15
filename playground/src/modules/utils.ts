import { type Dialect, sql } from 'kysely'
import type { InferDatabase } from 'kysely-sqlite-builder'
import { SqliteBuilder, createAutoSyncTableFn, defineTable } from 'kysely-sqlite-builder'

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
  const result = await db.updateTables(createAutoSyncTableFn(tables))
  if (!result.ready) {
    throw result.error
  }
  console.log('test')
  console.log(await db.raw(sql`PRAGMA table_info(${sql.table('test')});`))
  console.log(await db.raw(sql`select last_insert_rowid()`))

  for (let i = 0; i < 10; i++) {
    await db.transaction(async (trx) => {
      // await db.transaction(async (trx) => {
      await trx
        .insertInto('test')
        .values({
          name: `test at ${Date.now()}`,
          blobtest: Uint8Array.from([2, 3, 4, 5, 6, 7, 8]),
        })
        .execute()
      // })
    })
  }

  return db.execute(db => db.selectFrom('test').selectAll())
}
