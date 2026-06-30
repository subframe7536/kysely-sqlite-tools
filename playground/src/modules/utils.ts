import type { ColumnType, Dialect, Generated, Selectable } from 'kysely'
import { Kysely, sql } from 'kysely'

type TestTable = {
  id: Generated<number>
  name: string
  blobtest: Uint8Array
  created_at: ColumnType<string, string | undefined, never>
  updated_at: ColumnType<string, string | undefined, string | undefined>
}

export type TestRow = Selectable<TestTable>

type DB = {
  test: TestTable
}

async function syncSchema(db: Kysely<DB>) {
  await db.schema
    .createTable('test')
    .ifNotExists()
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('blobtest', 'blob', (col) => col.notNull())
    .addColumn('created_at', 'text', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'text', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute()
}

export async function testDB(dialect: Dialect, onBeforeDestroy?: () => void | Promise<void>) {
  const db = new Kysely<DB>({ dialect })

  await syncSchema(db)

  for (let i = 0; i < 10; i++) {
    try {
      await db.transaction().execute(async (trx) => {
        if (i > 8) {
          throw new Error('test rollback')
        }
        await trx
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
  }

  const data = await db.selectFrom('test').selectAll().orderBy('id', 'asc').execute()

  await onBeforeDestroy?.()
  await db.destroy()
  return data
}
