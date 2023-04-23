import type { Dialect, Generated } from 'kysely'
import { SqliteBuilder } from 'kysely-sqlite-builder'

export interface DB {
  test: TestTable
}
interface TestTable {
  id: Generated<number>
  name: string
  blobtest: ArrayBufferLike
  createAt: Date | null
  updateAt: Date | null
}
export async function testDB(dialect: Dialect) {
  const db = await new SqliteBuilder<DB>({
    dialect,
    tables: {
      test: {
        columns: {
          id: { type: 'increments' },
          name: { type: 'string' },
          blobtest: { type: 'blob' },
          createAt: { type: 'date' },
          updateAt: { type: 'date' },
        },
        property: {
          timestamp: true,
        },
      },
    },
  }).init()
  console.log('test')
  console.log(await db.raw(sql => sql`PRAGMA table_info(${sql.table('test')});`))

  for (let i = 0; i < 1e2; i++) {
    await db.transaction((trx) => {
      return trx.insertInto('test')
        .values({
          name: `test at ${Date.now()}`,
          blobtest: Uint8Array.from([2, 3, 4, 5, 6, 7, 8]),
        })
        .execute()
    })
  }

  return db.exec((db) => {
    return db.selectFrom('test').selectAll().execute()
  })
}
