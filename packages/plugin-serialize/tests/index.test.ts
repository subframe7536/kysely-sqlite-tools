import { Buffer } from 'node:buffer'
import { beforeAll, describe, expect, test } from 'vitest'
import Database from 'better-sqlite3'
import type { Generated } from 'kysely/dist/cjs/util/column-type'
import { Kysely, SqliteDialect } from 'kysely'
import { SqliteSerializePlugin } from '../src'

interface DB {
  test: TestTable
}
interface TestTable {
  id: Generated<number>
  person: { name: string; age: number; time: Date } | null
  gender: boolean
  blob: Uint8Array | null
  date: Date
}
describe('plugin basic test', () => {
  const database = new Database(':memory:')
  const db = new Kysely<DB>({
    dialect: new SqliteDialect({ database }),
    plugins: [new SqliteSerializePlugin()],
  })
  const testDate = new Date()
  beforeAll(async () => {
    await db.schema.createTable('test')
      .addColumn('id', 'integer', build => build.autoIncrement().primaryKey())
      .addColumn('gender', 'text')
      .addColumn('person', 'text')
      .addColumn('blob', 'blob')
      .addColumn('date', 'text')
      .ifNotExists()
      .execute()
    await db.insertInto('test').values({
      gender: true,
      person: { name: 'test', age: 2, time: testDate },
      blob: Buffer.from([1, 2, 3]),
      date: testDate,
    }).execute()
  })
  test('test types', async () => {
    const { blob, person, gender, date } = await db.selectFrom('test')
      .selectAll()
      .limit(1)
      .executeTakeFirstOrThrow()
    console.log(blob, person, gender, date)
    expect(blob?.buffer).toStrictEqual(Uint8Array.from([1, 2, 3]).buffer)
    expect(blob).toBeInstanceOf(Uint8Array)
    expect(person).toStrictEqual({ name: 'test', age: 2, time: testDate })
    expect(gender).toStrictEqual(true)
    expect(date).toStrictEqual(testDate)
  })
})
