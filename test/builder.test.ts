import type { Generated } from 'kysely'
import { SqliteDialect } from 'kysely'
import Database from 'better-sqlite3'
import { beforeAll, describe, expect, test } from 'vitest'
import { SqliteBuilder } from '../packages/sqlite-builder/src'

interface DB {
  test: TestTable
  pet: PetTable
}
interface TestTable {
  id: Generated<number>
  person: { name: string } | null
  gender: boolean
  createAt: Date | null
  updateAt: Date | null
  buffer: ArrayBuffer | null
}
interface PetTable {
  id: Generated<string>
  name: string
  owner_id: string
  species: 'cat' | 'dog'
  is_favorite: boolean
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
          buffer: { type: 'blob' },
        },
        property: {
          primary: 'id', // sqlite only support one single/composite primary key,
          index: ['person', ['id', 'gender']],
          timestamp: true,
        },
      },
      pet: {
        columns: {
          id: { type: 'increments' },
          is_favorite: { type: 'boolean' },
          name: { type: 'string' },
          owner_id: { type: 'string' },
          species: { type: 'string' },
        },
      },
    },
    dropTableBeforeInit: true,
    logger: console,
    // onQuery: (queryInfo, time) => console.log(`${time}ms`, queryInfo.sql, queryInfo.parameters),
  })
  beforeAll(async () => {
    // manually generate table
    await db.init(true)
  })
  test('insert', async () => {
    // auto generate table
    console.log(await db.transaction((trx) => {
      trx.insertInto('test').values([{ gender: false }, { gender: true }]).execute()
      return trx.updateTable('test').set({ gender: true }).where('id', '=', 2).execute()
    }))
    const result = await db.execList(d => d.selectFrom('test').selectAll())
    expect(result).toBeInstanceOf(Array)
    expect(result![0].person).toStrictEqual({ name: 'test' })
    expect(result![0].gender).toStrictEqual(false)
    expect(result![0].createAt).toBeInstanceOf(Date)
    expect(result![0].updateAt).toBeInstanceOf(Date)
    const result2 = await db.execOne(d => d.selectFrom('test').selectAll())
    expect(result).toBeInstanceOf(Object)
    expect(result2!.person).toStrictEqual({ name: 'test' })
    expect(result2!.gender).toStrictEqual(false)
    expect(result2!.createAt).toBeInstanceOf(Date)
    expect(result2!.updateAt).toBeInstanceOf(Date)
  })
  test('raw', async () => {
    const query = await db.toSQL(d => d
      .selectFrom('test')
      .where('person', '=', { name: '1' })
      .selectAll(),
    )
    expect(query.sql).toBe('select * from "test" where "person" = ?')
    expect(query.parameters).toStrictEqual(['{"name":"1"}'])
  })
  test('preCompile', async () => {
    const select = db.preCompile(db => db.selectFrom('test').selectAll())
      .setParam<{ person: { name: string } }>((qb, param) => qb.where('person', '=', param('person')))
    const insert = db.preCompile(db => db.insertInto('test'))
      .setParam<{ gender: boolean }>((qb, param) => qb.values({ gender: param('gender') }))
    const update = db.preCompile(db => db.updateTable('test'))
      .setParam<{ gender: boolean }>((qb, param) => qb.set({ gender: param('gender') }).where('id', '=', 1))

    const start = performance.now()

    const { parameters, sql } = select({ person: { name: '1' } })
    expect(sql).toBe('select * from "test" where "person" = ?')
    expect(parameters).toStrictEqual(['{"name":"1"}'])

    const start2 = performance.now()
    console.log('no compiled:', `${(start2 - start).toFixed(2)}ms`)

    const { parameters: p1, sql: s1 } = select({ person: { name: 'test' } })
    expect(s1).toBe('select * from "test" where "person" = ?')
    expect(p1).toStrictEqual(['{"name":"test"}'])

    console.log('   compiled:', `${(performance.now() - start2).toFixed(2)}ms`)

    const result = await db.execCompiled(insert({ gender: true }))
    expect(result!.rows).toStrictEqual([])
    const result2 = await db.execCompiled(update({ gender: false }))
    expect(result2!.rows).toStrictEqual([])
  })
})
