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
import { SqliteBuilder, defineLiteral, defineObject, defineTable, useMigrator, useSchema } from 'kysely-sqlite-builder'
import { FileMigrationProvider } from 'kysely'

// schemas for AutoSyncTables
const testTable = defineTable({
  id: { type: 'increments' },
  person: { type: 'object', defaultTo: { name: 'test' } },
  gender: { type: 'boolean', notNull: true },
  str: defineLiteral<'str1' | 'str2'>('str1'),
  array: defineObject<string[]>().NotNull(),
  buffer: { type: 'blob' },
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

// update tables using syncTable
await db.updateTableSchema(useSchema(baseTables, { logger: false }))

// update tables using MigrationProvider and migrate to latest
await db.updateTableSchema(useMigrator(new FileMigrationProvider(/**/)))
```

### Usage

```ts
// run transaction
await db.transaction(async (trx) => {
  // use transaction
  await trx.insertInto('test').values({ gender: false }).execute()
  // nest transaction, using savepoint
  await db.transaction(async () => {
    // auto load transaction with savepoint
    await db.execute(
      d => d.selectFrom('test').where('gender', '=', true),
      'this is error message'
    )
  })
})

// use origin instance
await db.kysely.insertInto('test').values({ gender: false }).execute()

// run raw
await db.raw(sql`PRAGMA user_version = 2`, 'this is error message')

// destroy
await db.destroy()
```

### Precompile

inspired by [kysely-params](https://github.com/jtlapp/kysely-params), optimized for sqlite

```ts
const select = db.precompile(
  db => db.selectFrom('test').selectAll(),
).setParam<{ person: { name: string } }>(({ qb, param }) =>
  qb.where('person', '=', param('person')),
)

const result = await db.executeCompiledTakeList(
  select({ person: { name: 'John' } })
)
```

### Utils

see [sqlite-utils](../sqlite-utils/)

## Credit

- [trilogy](https://github.com/haltcase/trilogy)

## License

MIT
