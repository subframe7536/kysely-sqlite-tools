import type { Dialect, Generated } from 'kysely'
import { CompiledQuery, Kysely } from 'kysely'

interface DB {
  test: TestTable
}
interface TestTable {
  id: Generated<number>
  name: string
  age: number
  int8: Uint8Array | null
}

export interface TestCaseCapabilities {
  stream?: boolean
  streamAbortSignal?: boolean
  insertId?: boolean
  numAffectedRows?: boolean
}

const defaultCapabilities: Required<TestCaseCapabilities> = {
  stream: true,
  streamAbortSignal: false,
  insertId: false,
  numAffectedRows: false,
}

export async function testCase(
  dialect: Dialect,
  expect: any,
  capabilities: TestCaseCapabilities | boolean = {},
): Promise<void> {
  const support = normalizeCapabilities(capabilities)
  const db = new Kysely<DB>({ dialect })

  try {
    await createSchema(db)
    await assertInsert(db, expect, dialect, support)
    await assertParameterizedSelect(db, expect)
    await assertParameterizedUpdate(db, expect)
    await assertParameterizedDelete(db, expect)
    await assertRawCompiledQuery(db, expect, support)
    await assertTransaction(db, expect)
    await assertSavepoint(db, expect)

    if (support.stream) {
      await assertMultiRowStream(db, expect)
      await assertEmptyStream(db, expect)
    }

    if (support.streamAbortSignal) {
      await assertAbortSignalStream(dialect, expect)
    }
  } finally {
    await db.destroy()
  }
}

function normalizeCapabilities(
  capabilities: TestCaseCapabilities | boolean,
): Required<TestCaseCapabilities> {
  if (typeof capabilities === 'boolean') {
    return { ...defaultCapabilities, stream: capabilities }
  }
  return { ...defaultCapabilities, ...capabilities }
}

async function createSchema(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable('test')
    .addColumn('id', 'integer', (builder) => builder.autoIncrement().primaryKey())
    .addColumn('name', 'text')
    .addColumn('age', 'integer')
    .addColumn('int8', 'blob')
    .execute()
}

async function assertInsert(
  db: Kysely<DB>,
  expect: any,
  dialect: Dialect,
  support: Required<TestCaseCapabilities>,
): Promise<void> {
  const result = await db
    .insertInto('test')
    .values({
      age: 18,
      name: `test ${dialect.toString()}`,
      int8: new Uint8Array([1, 2, 3]),
    })
    .executeTakeFirstOrThrow()

  if (support.insertId) {
    expect(result.insertId).toStrictEqual(1n)
  }
}

async function assertParameterizedSelect(db: Kysely<DB>, expect: any): Promise<void> {
  const { age, name, int8 } = await db
    .selectFrom('test')
    .selectAll()
    .where('age', '=', 18)
    .where('name', 'like', 'test%')
    .limit(1)
    .executeTakeFirstOrThrow()

  expect(age).toStrictEqual(18)
  expect(name.startsWith('test ')).toStrictEqual(true)
  expect(Array.from(int8!)).toStrictEqual([1, 2, 3])
}

async function assertParameterizedUpdate(db: Kysely<DB>, expect: any): Promise<void> {
  await db
    .updateTable('test')
    .set({ age: 19 })
    .where('age', '=', 18)
    .where('name', 'like', 'test%')
    .executeTakeFirstOrThrow()

  const row = await db
    .selectFrom('test')
    .select('age')
    .where('id', '=', 1)
    .executeTakeFirstOrThrow()
  expect(row.age).toStrictEqual(19)
}

async function assertParameterizedDelete(db: Kysely<DB>, expect: any): Promise<void> {
  await db.insertInto('test').values({ age: 21, name: 'delete me', int8: null }).execute()
  await db
    .deleteFrom('test')
    .where('age', '=', 21)
    .where('name', '=', 'delete me')
    .executeTakeFirstOrThrow()

  const row = await db
    .selectFrom('test')
    .select('id')
    .where('name', '=', 'delete me')
    .executeTakeFirst()
  expect(row).toBeUndefined()
}

async function assertRawCompiledQuery(
  db: Kysely<DB>,
  expect: any,
  support: Required<TestCaseCapabilities>,
): Promise<void> {
  const insert = await db.executeQuery(
    CompiledQuery.raw('insert into test("age", "name") values (?, ?) returning *', [
      20,
      'test name',
    ]),
  )
  expect(insert.rows[0]).toStrictEqual({ age: 20, id: 3, int8: null, name: 'test name' })

  const update = await db.executeQuery(
    CompiledQuery.raw('update test set age = ? where id = ?', [22, 1]),
  )
  if (support.numAffectedRows) {
    expect((update as any).numAffectedRows).toStrictEqual(1n)
  }
}

async function assertTransaction(db: Kysely<DB>, expect: any): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await trx.insertInto('test').values({ age: 30, name: 'transaction', int8: null }).execute()
  })

  const row = await db
    .selectFrom('test')
    .select('age')
    .where('name', '=', 'transaction')
    .executeTakeFirstOrThrow()
  expect(row.age).toStrictEqual(30)
}

async function assertSavepoint(db: Kysely<DB>, expect: any): Promise<void> {
  const trx = await db.startTransaction().execute()
  try {
    await trx
      .insertInto('test')
      .values({ age: 31, name: 'savepoint committed', int8: null })
      .execute()

    const savepoint = await trx.savepoint('test_savepoint').execute()
    await savepoint
      .insertInto('test')
      .values({ age: 32, name: 'savepoint rolled back', int8: null })
      .execute()
    await savepoint.rollbackToSavepoint('test_savepoint').execute()
    await savepoint.commit().execute()
  } catch (error) {
    await trx.rollback().execute()
    throw error
  }

  const committed = await db
    .selectFrom('test')
    .select('id')
    .where('name', '=', 'savepoint committed')
    .executeTakeFirst()
  const rolledBack = await db
    .selectFrom('test')
    .select('id')
    .where('name', '=', 'savepoint rolled back')
    .executeTakeFirst()

  expect(committed).toBeDefined()
  expect(rolledBack).toBeUndefined()
}

async function assertMultiRowStream(db: Kysely<DB>, expect: any): Promise<void> {
  await db
    .insertInto('test')
    .values([
      { age: 40, name: 'stream 1', int8: null },
      { age: 41, name: 'stream 2', int8: null },
      { age: 42, name: 'stream 3', int8: null },
    ])
    .execute()

  const rows: string[] = []
  for await (const row of db
    .selectFrom('test')
    .select(['name'])
    .where('name', 'like', 'stream%')
    .orderBy('age')
    .stream(2)) {
    rows.push(row.name)
  }

  expect(rows).toStrictEqual(['stream 1', 'stream 2', 'stream 3'])
}

async function assertEmptyStream(db: Kysely<DB>, expect: any): Promise<void> {
  let count = 0
  for await (const _ of db
    .selectFrom('test')
    .selectAll()
    .where('name', '=', 'missing stream row')
    .stream()) {
    count++
  }
  expect(count).toStrictEqual(0)
}

async function assertAbortSignalStream(dialect: Dialect, expect: any): Promise<void> {
  const driver = dialect.createDriver()
  await driver.init()
  const connection = await driver.acquireConnection()
  const controller = new AbortController()
  controller.abort()

  try {
    const stream = (connection.streamQuery as any)(CompiledQuery.raw('select 1 as value'), 1, {
      signal: controller.signal,
    })
    let count = 0
    for await (const _ of stream) {
      count++
    }
    expect(count).toStrictEqual(0)
  } finally {
    await driver.releaseConnection(connection)
    await driver.destroy()
  }
}
