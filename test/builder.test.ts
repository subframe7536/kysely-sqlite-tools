import type { Generated } from 'kysely'
import { SqliteDialect } from 'kysely'
import Database from 'better-sqlite3'
import { describe, expect, test } from 'vitest'
import { SqliteBuilder } from '../packages/sqlite-builder/src'

interface DB {
  test: TestTable
}
interface TestTable {
  id: Generated<number>
  person: { name: string } | null
  gender: boolean
  createAt: Date | null
  updateAt: Date | null
}
describe('test builder', async () => {
  const db = new SqliteBuilder<DB>({
    dialect: new SqliteDialect({
      database: new Database(':memory:'),
    }),
    tables: {
      test: {
        columns: {
          id: { type: 'increments' },
          person: { type: 'object', defaultTo: { name: 'test' } },
          gender: { type: 'boolean', notNull: true },
          createAt: { type: 'date' },
          updateAt: { type: 'date' },
        },
        property: {
          primary: 'id', // sqlite only support one single/composite primary key,
          index: ['person', ['id', 'gender']],
          timestamp: true,
        },
      },
    },
    dropTableBeforeInit: true,
    errorLogger: reason => console.error(reason),
    queryLogger: (queryInfo, time) => console.log(`${time}ms`, queryInfo.sql, queryInfo.parameters),
  })
  // manually generate table
  await db.init(true)
  // auto generate table
  test('insert', async () => {
    await db.transaction(trx => trx.insertInto('test').values({ gender: false }).execute())
    // auto generate table
    const result = await db.exec(d => d.selectFrom('test').selectAll().execute())
    console.log('result:')
    console.log(result)
    expect(result).toBeInstanceOf(Array)
    expect(result![0].person).toStrictEqual({ name: 'test' })
    expect(result![0].gender).toStrictEqual(false)
    expect(result![0].createAt).toBeInstanceOf(Date)
    expect(result![0].updateAt).toBeInstanceOf(Date)
  })
  test('raw', () => {
    const { sql, parameters } = db.toSQL(d => d
      .selectFrom('test')
      .where('person', '=', { name: '1' })
      .selectAll(),
    )
    console.log(sql)
    expect(sql).toBe('select * from "test" where "person" = ?')
    console.log(parameters)
    expect(parameters).toStrictEqual(['{"name":"1"}'])
  })
})
