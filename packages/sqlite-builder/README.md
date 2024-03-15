# Kysely-sqlite-builder

[kysely](https://github.com/kysely-org/kysely) table builder for SQLite

## Features

- infer tables type by schema
- support auto migrate by schema (experimental)
- auto serialize / deserialize
- trigger for `updateAt`
- auto detect transaction, catch all errors
- support nest transaction (using `savepoint`)
- support precompile querys for performance
- support soft delete
- more utils for SQLite

## Install

```shell
pnpm add kysely kysely-sqlite-builder
```

### Dialect for Electron without recompile

```shell
pnpm i kysely-wasm
```

choose [NodeWasmDialect](../dialect-wasm/README.md#nodewasmdialect)

## Example

### Define / Initialize

```ts
import { SqliteDialect } from 'kysely'
import Database from 'better-sqlite3'
import { SqliteBuilder } from 'kysely-sqlite-builder'
import { Column, defineTable, useSchema } from 'kysely-sqlite-builder/schema'
import type { InferDatabase } from 'kysely-sqlite-builder/schema'

// schemas for sync database
const testTable = defineTable({
  id: Column.Increments(),
  // or just object
  simple: { type: 'string', defaultTo: 'test' }
  person: Column.Object({ name: 'test' }),
  gender: Column.Boolean().NotNull(),
  array: Column.Object<string[]>(),
  literal: Column.String<'l1' | 'l2'>(),
  buffer: Column.Blob(),
}, {
  primary: 'id',
  index: ['person', ['id', 'gender']],
  timeTrigger: { create: true, update: true },
})

const baseTables = {
  test: testTable,
}

// infer type from baseTables
type DB = InferDatabase<typeof baseTables>

const db = new SqliteBuilder<DB>({
  dialect: new SqliteDialect({
    database: new Database(':memory:'),
  }),
  logger: console,
  onQuery: true,
})

// update table using schema
await db.syncDB(useSchema(baseTables, { logger: false }))

import { useMigrator } from 'kysely-sqlite-builder'
import { FileMigrationProvider } from 'kysely'

// update tables using MigrationProvider and migrate to latest
await db.syncDB(useMigrator(new FileMigrationProvider(/* ... */)))
```

### Usage

```ts
// run transaction
await db.transaction(async (trx) => {
  // use transaction
  await trx.insertInto('test').values({ gender: false }).execute()
  // auto use `trx`
  await db.execute(d => d.insertInto('test').values({ gender: true }).execute())
  // nest transaction, using savepoint
  await db.transaction(async () => {
    // auto use savepoint
    await db.execute(d => d.selectFrom('test').where('gender', '=', true))
  })
})

// use origin instance
await db.kysely.insertInto('test').values({ gender: false }).execute()

// run raw
await db.raw(sql`PRAGMA user_version = 2`)

// destroy
await db.destroy()
```

### Precompile

inspired by [kysely-params](https://github.com/jtlapp/kysely-params), optimized for sqlite

```ts
const select = db.precompile<{ name: string }>()
  .query((d, param) =>
    d.selectFrom('test').selectAll().where('name', '=', param('name')),
  )
const compileResult = select.generate({ name: 'test' })
// {
//   sql: 'select * from "test" where "name" = ?',
//   parameters: ['test'],
//   query: { kind: 'SelectQueryNode' } // only node kind by default
// }
select.dispose() // clear cached query

// or auto disposed by using
using selectWithUsing = db.precompile<{ name: string }>()
  .query((d, param) =>
    d.selectFrom('test').selectAll().where('name', '=', param('name')),
  )
```

### Soft delete

```ts
import { SqliteDialect } from 'kysely'
import Database from 'better-sqlite3'
import type { InferDatabase } from 'sqlite-builder/schema'
import { Column, defineTable, useSchema } from 'sqlite-builder/schema'
import { SqliteBuilder } from 'sqlite-builder'
import { createSoftDeleteExecutorFn } from 'sqlite-builder/utils'

const softDeleteTable = defineTable({
  id: Column.Increments(),
  name: Column.String(),
}, {
  primary: 'id',
  softDelete: true,
})
const softDeleteSchema = {
  testSoftDelete: softDeleteTable,
}

const db = new SqliteBuilder<InferDatabase<typeof softDeleteSchema>>({
  dialect: new SqliteDialect({
    database: new Database(':memory:'),
    async onCreateConnection(connection) {
      await optimizePragma(connection)
    },
  }),
  executorFn: createSoftDeleteExecutorFn(),
})

await db.executeTakeFirst(d => d.deleteFrom('testSoftDelete').where('id', '=', 1))
// update "testSoftDelete" set "isDeleted" = 1 where "id" = 1
```

## Utils

in `kysely-sqlite-builder/utils`

see details in [sqlite-utils](../sqlite-utils/)

## Credit

- [trilogy](https://github.com/haltcase/trilogy)

## License

MIT
