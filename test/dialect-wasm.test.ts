import type { Dialect, Generated } from 'kysely'
import { Kysely } from 'kysely'
import { Database } from 'node-sqlite3-wasm'
import InitSqlJs from 'sql.js'
import { afterAll, describe, expect, it } from 'vitest'
import { NodeWasmDialect, SqlJsDialect } from '../packages/dialect-wasm/src'

interface DB {
  test: TestTable
}
interface TestTable {
  id: Generated<number>
  name: string
  age: number
  int8: Uint8Array
}
describe('dialect test', () => {
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
  }
  afterAll(async () => {
    await db.destroy()
  })
  it('sql.js', async () => {
    const dialect = new SqlJsDialect({
      async database() {
        const SQL = await InitSqlJs()
        return new SQL.Database()
      },
      onWrite: {
        func(buffer) {
          console.log(`size: ${buffer.length}`)
        },
        isThrottle: true,
      },
    })
    await init(dialect)
  })

  it('node-wasm', async () => {
    const dialect = new NodeWasmDialect({
      database: new Database(':memory:'),
    })
    await init(dialect)
  })
})
