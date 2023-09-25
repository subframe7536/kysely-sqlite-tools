# Kysely-sqlite-builder

[kysely](https://github.com/kysely-org/kysely) table builder for SQLite

## features

- infer tables type by schema
- support auto migrate by schema (experimental)
- auto serialize / deserialize
- trigger for `updateAt`
- auto detect transaction, catch all errors
- support nest transaction (using `savepoint`)
- support precompile querys for performance
- more utils for SQLite

## install

```shell
pnpm add kysely kysely-sqlite-builder
```

### dialect for Electron without recompile

```shell
pnpm i kysely-wasm
```

choose [NodeWasmDialect](../dialect-wasm/README.md#nodewasmdialect)

## example

### define / initialze

```ts
// schemas for AutoSyncTables
const testTable = defineTable({
  id: { type: 'increments' },
  person: { type: 'object', defaultTo: { name: 'test' } },
  gender: { type: 'boolean', notNull: true },
  array: defineColumn<string[]>({ type: 'object' }),
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
await db.updateTables(createAutoSyncTableFn(baseTables, { logger: false }))

// update tables using MigrationProvider and migrate to latest
await db.updateTables(createMigrateFn(new FileMigrationProvider(/**/)))
```

### usage

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

### precompile

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

### utils

```ts
// util for `KyselyConfig.log`
function createKyselyLogger(options: LoggerOptions): (event: LogEvent) => void

// create savepoint, release or rollback it later
function savePoint(db: Kysely<any> | Transaction<any>, name?: string): Promise<SavePoint>

// check integrity_check pragma
function checkIntegrity(db: Kysely<any>): Promise<boolean>

// get or set user_version pragma
function getOrSetDBVersion(db: Kysely<any>, version?: number): Promise<number>

// call optimize pragma
function optimzePragma(conn: DatabaseConnection, options?: OptimizePragmaOptions): Promise<void>

// create precompiled query
function precompileQuery<O>(
  queryBuilder: QueryBuilderOutput<Compilable<O>>,
  serializer?: (value: unknown) => unknown
): {
  setParam: <T extends Record<string, any>>(
    paramBuilder: ({ param, qb }: SetParam<O, T>) => Compilable<O>
  ) => CompileFn<O, T>
}
```

## credit

- [trilogy](https://github.com/haltcase/trilogy)

## license
MIT