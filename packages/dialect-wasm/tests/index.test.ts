import { describe, test } from 'vitest'
import init from 'sql.js'
import { Kysely } from 'kysely'
import { SqliteSerializePlugin } from 'kysely-plugin-serialize'
import { SqlJsDialect } from '../src/sqljs-dialect'
import type { DB } from './type'

describe('dialect test', () => {
  test('sql.js', async () => {
    const dialect = new SqlJsDialect({
      async database() {
        const SQL = await init()
        return new SQL.Database()
      },
      onWrite: {
        func(buffer) {
          console.log(`size: ${buffer.length}`)
        },
        isThrottle: true,
      },
    })
    const db = new Kysely<DB>({
      dialect,
      plugins: [new SqliteSerializePlugin({ blobType: Float32Array })],
    })
    await db.schema.createTable('test')
      .addColumn('id', 'integer', build => build.autoIncrement().primaryKey())
      .addColumn('name', 'text')
      .addColumn('blobtest', 'blob')
      .ifNotExists()
      .execute()
    await db.transaction().execute((trx) => {
      return trx.insertInto('test')
        .values({
          name: `test at ${Date.now()}`,
          blobtest: Uint8Array.from([2, 3, 4, 5, 6, 7, 8]),
        })
        .execute()
    })
    console.log(await db.selectFrom('test').selectAll().execute())
  })
})
