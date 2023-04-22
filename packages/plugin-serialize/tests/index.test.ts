import { Buffer } from 'node:buffer'
import { beforeAll, describe, test } from 'vitest'
import Database from 'better-sqlite3'
import type { Generated } from 'kysely/dist/cjs/util/column-type'
import { Kysely, SqliteDialect } from 'kysely'
import { SqliteSerializePlugin } from '../src'

interface DB {
  test: TestTable
}
interface TestTable {
  id: Generated<number>
  person: { name: string } | null
  gender: boolean
  blob: Uint8Array | number[] | Buffer | null
}
describe('plugin test', () => {
  const database = new Database(':memory:')
  const db = new Kysely<DB>({
    dialect: new SqliteDialect({ database }),
    plugins: [new SqliteSerializePlugin()],
  })
  beforeAll(async () => {
    await db.schema.createTable('test')
      .addColumn('id', 'integer', build => build.autoIncrement().primaryKey())
      .addColumn('gender', 'text')
      .addColumn('person', 'text')
      .addColumn('blob', 'blob')
      .ifNotExists()
      .execute()
    await db.insertInto('test').values({
      gender: true,
      person: { name: 'test' },
      blob: Buffer.from([1, 2, 3]),
    }).execute()
  })
  test('test blob', async () => {
    const { blob, person, gender } = await db.selectFrom('test').selectAll().limit(1).executeTakeFirstOrThrow()
    console.log(blob, person, gender)
    // expect(blob?.buffer).toMatchTypeOf<Buffer>(null)
    // expect(person).eq({ name: 'test' })
    // expect(gender).eq(true)
  })
})
