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
  await sql`
    CREATE TABLE IF NOT EXISTS test (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      blobtest BLOB NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `.execute(db)
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

  try {
    for await (const _row of db.selectFrom('test').selectAll().stream(2)) {
      // Streaming is exercised to verify dialect support; the final table query below drives the UI.
    }
  } catch {
    // Some browser-backed dialects do not support streaming consistently. The playground still shows
    // the final materialized query so users can compare dialect behavior without opening devtools.
  }

  const data = await db.selectFrom('test').selectAll().orderBy('id', 'asc').execute()

  await onBeforeDestroy?.()
  await db.destroy()
  return data
}
