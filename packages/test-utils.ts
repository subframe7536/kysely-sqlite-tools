import type { Dialect, Generated } from 'kysely'
import { CompiledQuery, Kysely, sql } from 'kysely'

interface DB {
  audit: AuditTable
  test: TestTable
}
interface AuditTable {
  id: Generated<number>
  test_id: number
  note: string
}
interface TestTable {
  id: Generated<number>
  name: string
  age: number
  int8: Uint8Array | null
}

export async function testCase(dialect: Dialect, expect: any, supportStream = true): Promise<void> {
  const db = new Kysely<DB>({ dialect })

  try {
    await createSchema(db)
    await assertInsertSelectAndBlobRoundTrip(db, dialect, expect)
    await assertFilteringOrderingAndAggregates(db, expect)
    await assertUpdateDeleteAndJoins(db, expect)
    await assertTransactionsRollbackAndCommit(db, expect)
    await assertRawReturningQuery(db, expect)

    if (supportStream) {
      await assertStreaming(db, dialect, expect)
    }
  } finally {
    await db.destroy()
  }
}

async function createSchema(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable('test')
    .addColumn('id', 'integer', (builder) => builder.autoIncrement().primaryKey())
    .addColumn('name', 'text')
    .addColumn('age', 'integer')
    .addColumn('int8', 'blob')
    .execute()

  await db.schema
    .createTable('audit')
    .addColumn('id', 'integer', (builder) => builder.autoIncrement().primaryKey())
    .addColumn('test_id', 'integer')
    .addColumn('note', 'text')
    .execute()
}

async function assertInsertSelectAndBlobRoundTrip(
  db: Kysely<DB>,
  dialect: Dialect,
  expect: any,
): Promise<void> {
  await db
    .insertInto('test')
    .values([
      {
        age: 18,
        name: `test ${dialect.toString()}`,
        int8: new Uint8Array([1, 2, 3]),
      },
      {
        age: 42,
        name: 'second row',
        int8: new Uint8Array([4, 5, 6]),
      },
    ])
    .execute()

  const { age, name, int8 } = await db
    .selectFrom('test')
    .selectAll()
    .where('id', '=', 1)
    .executeTakeFirstOrThrow()

  expect(age).toStrictEqual(18)
  expect(name).toStrictEqual(`test ${dialect.toString()}`)
  expect(Array.from(int8 ?? [])).toStrictEqual([1, 2, 3])
}

async function assertFilteringOrderingAndAggregates(db: Kysely<DB>, expect: any): Promise<void> {
  const rows = await db
    .selectFrom('test')
    .select(['id', 'name'])
    .where('age', '>=', 18)
    .orderBy('age', 'desc')
    .execute()

  expect(rows).toStrictEqual([
    { id: 2, name: 'second row' },
    { id: 1, name: expect.stringContaining('test ') },
  ])

  const aggregate = await db
    .selectFrom('test')
    .select(({ fn }) => [
      fn.count<number>('id').as('total'),
      fn.avg<number>('age').as('averageAge'),
    ])
    .executeTakeFirstOrThrow()

  expect(aggregate).toStrictEqual({ total: 2, averageAge: 30 })
}

async function assertUpdateDeleteAndJoins(db: Kysely<DB>, expect: any): Promise<void> {
  await db.updateTable('test').set({ age: 19 }).where('id', '=', 1).execute()
  await db.deleteFrom('test').where('id', '=', 2).execute()
  await db.insertInto('audit').values({ test_id: 1, note: 'updated age' }).execute()

  const joined = await db
    .selectFrom('test')
    .innerJoin('audit', 'audit.test_id', 'test.id')
    .select(['test.id', 'test.age', 'audit.note'])
    .executeTakeFirstOrThrow()

  expect(joined).toStrictEqual({ id: 1, age: 19, note: 'updated age' })

  const remaining = await db.selectFrom('test').select('id').orderBy('id').execute()
  expect(remaining).toStrictEqual([{ id: 1 }])
}

async function assertTransactionsRollbackAndCommit(db: Kysely<DB>, expect: any): Promise<void> {
  await expect(
    db.transaction().execute(async (trx) => {
      await trx
        .insertInto('test')
        .values({ age: 99, name: 'rolled back', int8: new Uint8Array([9]) })
        .execute()
      throw new Error('rollback transaction')
    }),
  ).rejects.toThrow('rollback transaction')

  const rolledBack = await db
    .selectFrom('test')
    .select('id')
    .where('name', '=', 'rolled back')
    .execute()
  expect(rolledBack).toStrictEqual([])

  await db.transaction().execute(async (trx) => {
    await trx
      .insertInto('test')
      .values({ age: 21, name: 'committed', int8: new Uint8Array([7, 8]) })
      .execute()
  })

  const committed = await db
    .selectFrom('test')
    .select(['age', 'name', 'int8'])
    .where('name', '=', 'committed')
    .executeTakeFirstOrThrow()
  expect(committed.age).toStrictEqual(21)
  expect(committed.name).toStrictEqual('committed')
  expect(Array.from(committed.int8 ?? [])).toStrictEqual([7, 8])
}

async function assertRawReturningQuery(db: Kysely<DB>, expect: any): Promise<void> {
  const result = await db.executeQuery(
    CompiledQuery.raw('insert into test("age", "name") values (?, ?) returning *', [
      20,
      'test name',
    ]),
  )
  expect(result.rows[0]).toStrictEqual({
    age: 20,
    id: 4,
    int8: null,
    name: 'test name',
  })

  const rawSelection = await db
    .selectFrom('test')
    .select(sql<number>`age + 1`.as('nextAge'))
    .where('name', '=', 'test name')
    .executeTakeFirstOrThrow()
  expect(rawSelection).toStrictEqual({ nextAge: 21 })
}

async function assertStreaming(db: Kysely<DB>, dialect: Dialect, expect: any): Promise<void> {
  const rows = db.selectFrom('test').selectAll().orderBy('id').stream()
  const streamed: unknown[] = []

  for await (const row of rows) {
    streamed.push({
      age: row.age,
      id: row.id,
      int8: row.int8 === null ? null : Array.from(row.int8),
      name: row.name,
    })
  }

  expect(streamed).toStrictEqual([
    {
      age: 19,
      id: 1,
      int8: [1, 2, 3],
      name: `test ${dialect.toString()}`,
    },
    { age: 21, id: 3, int8: [7, 8], name: 'committed' },
    { age: 20, id: 4, int8: null, name: 'test name' },
  ])
}
