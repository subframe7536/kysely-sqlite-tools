import { describe, expect, test } from 'bun:test'
import type { Generated } from 'kysely'
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
  const db = new Kysely<DB>({
    dialect: new BunWorkerDialect(),
  })
  test('test', async () => {
    await db.schema.createTable('test')
      .addColumn('id', 'integer', builder => builder.autoIncrement().primaryKey())
      .addColumn('name', 'text')
      .addColumn('age', 'integer')
      .addColumn('int8', 'blob')
      .execute()
    await db.insertInto('test')
      .values({
        age: 18,
        name: 'test',
        int8: new Uint8Array([1, 2, 3]),
      })
      .execute()
    const { age, name, int8 } = await db
      .selectFrom('test')
      .selectAll()
      .limit(1)
      .executeTakeFirstOrThrow()
    expect(age).toStrictEqual(18)
    expect(name).toStrictEqual('test')
    expect(int8).toStrictEqual(Uint8Array.from([1, 2, 3]))
    await db.destroy()
  })
})
