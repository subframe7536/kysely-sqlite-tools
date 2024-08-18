import { afterAll, describe, expect, it } from 'vitest'
import type { Dialect, Generated } from 'kysely'
import { Kysely } from 'kysely'
import { SqliteWorkerDialect } from '../packages/dialect-sqlite-worker'

interface DB {
  test: TestTable
}
interface TestTable {
  id: Generated<number>
  name: string
  age: number
  int8: Uint8Array
}
describe('sqlite worker dialect test', () => {
  let db: Kysely<DB>
  async function init(dialect: Dialect) {
    db = new Kysely<DB>({ dialect })
    await db.schema.createTable('test')
      .addColumn('id', 'integer', builder => builder.autoIncrement().primaryKey())
      .addColumn('name', 'text')
      .addColumn('age', 'integer')
      .addColumn('int8', 'blob')
      .execute()
    await db.insertInto('test')
      .values({
        age: 18,
        name: `test ${dialect.toString()}`,
        int8: new Uint8Array([1, 2, 3]),
      })
      .execute()
    const { age, name, int8 } = await db.selectFrom('test').selectAll().limit(1).executeTakeFirstOrThrow()
    expect(age).toStrictEqual(18)
    expect(name).toStrictEqual(`test ${dialect.toString()}`)
    expect(int8).toStrictEqual(Uint8Array.from([1, 2, 3]))
    const rows = db.selectFrom('test').selectAll().stream()
    for await (const row of rows) {
      expect(row.age).toStrictEqual(18)
      expect(row.name).toStrictEqual(`test ${dialect.toString()}`)
      expect(row.int8).toStrictEqual(Uint8Array.from([1, 2, 3]))
    }
  }
  afterAll(async () => {
    await db.destroy()
  })
  it('test', async () => {
    const dialect = new SqliteWorkerDialect({
      source: ':memory:',
    })
    await init(dialect)
  })
})
