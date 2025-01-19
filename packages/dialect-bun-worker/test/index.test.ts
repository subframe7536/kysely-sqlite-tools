import { describe, expect, test } from 'bun:test'
import { CompiledQuery, type Dialect, type Generated } from 'kysely'
import { Kysely } from 'kysely'
import { BunWorkerDialect } from '../src'

interface DB {
  test: TestTable
}
interface TestTable {
  id: Generated<number>
  name: string
  age: number
  int8: Uint8Array
}

describe('test', () => {
  const dialect = new BunWorkerDialect() as unknown as Dialect
  test('test', async () => {
    const db = new Kysely<DB>({ dialect })
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
    let count = 0
    for await (const row of rows) {
      count++
      expect(row.age).toStrictEqual(18)
      expect(row.name).toStrictEqual(`test ${dialect.toString()}`)
      expect(row.int8).toStrictEqual(Uint8Array.from([1, 2, 3]))
    }
    expect(count).toStrictEqual(1)

    const result = await db.executeQuery(
      CompiledQuery.raw(
        'insert into test("age", "name") values (?, ?) returning *',
        [20, 'test name'],
      ),
    )
    expect(result).toMatchInlineSnapshot(`
{
  "rows": [
    {
      "age": 20,
      "id": 2,
      "int8": null,
      "name": "test name",
    },
  ],
}
`)
    const result1 = await db
      .insertInto('test')
      .values([
        { age: 1, int8: new Uint8Array(), name: 'test' },
        { age: 1, int8: new Uint8Array(), name: 'test' },
        { age: 1, int8: new Uint8Array(), name: 'test' },
        { age: 1, int8: new Uint8Array(), name: 'test' },
      ])
      .returningAll()
      .execute()
    console.log(result1)
    await db.destroy()
  })
})
