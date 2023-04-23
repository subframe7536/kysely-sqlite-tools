import { afterAll, describe, expect, test } from 'vitest'
import type { Dialect, Generated } from 'kysely'
import InitSqlJs from 'sql.js'
import { Kysely } from 'kysely'
import { SqlJsDialect } from '../../packages/dialect-wasm/src'

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
  test('sql.js', async () => {
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

  // test('crsqlite', async () => {
  //   const path = new URL('../../node_modules/@vlcn.io/crsqlite-wasm/dist/crsqlite.wasm', import.meta.url).href
  //   try {
  //     const dialect = new CrSqliteDialect({
  //       async database() {
  //         const sqlite3 = await InitCrsqlite()
  //         return sqlite3.open('crsqlite.db')
  //       },
  //     })
  //     await init(dialect)
  //   } catch (e) {
  //     console.error(path, e)
  //   }
  // })

  // todo)) find out test opfs
  //
  // test('official wasm', async () => {
  //   const dialect = new OfficialWasmDialect({
  //     database: async () => {
  //       const sqlite3 = (await sqlite3InitModule()).oo1
  //       if (!sqlite3) {
  //         return Promise.reject('fail to load sqlite')
  //       }
  //       const path = '/test.db'
  //       if (sqlite3.OpfsDb) {
  //         console.log('support OPFS')
  //         return new sqlite3.OpfsDb(path)
  //       }
  //       console.log('doesn\'t support OPFS')
  //       return new sqlite3.DB(path)
  //     },
  //   })
  //   await init(dialect)
  // })
})
