# kysely-wasm

[kysely](https://github.com/kysely-org/kysely) dialect for various SQLite wasm

no wasm denpendencies, your need to install yourself

## Install

```shell
bun add -d kysely kysely-wasm
```

## Introduce

there are 6 dialects

- SqlJsDialect: dialect for [sql.js](https://github.com/sql-js/sql.js)
- OfficialWasmDialct: dialect for [official wasm build](https://sqlite.org/wasm/doc/trunk/index.md)
- NodeWasmDialct: dialect for [node sqlite3 wasm](https://github.com/tndrle/node-sqlite3-wasm)
- EmptyDialect: only for sql generation, no backend
- CrsqliteDialect: dialect for [vlcn.io/wasm](https://vlcn.io/js/wasm)
  ~~- WaSqliteDialect: dialect for [wa-sqlite](https://github.com/rhashimoto/wa-sqlite)~~

### Differences

#### `SqlJsDialect`: easy to use

you can **get total buffer** on every sql execution except `select` and **no backend storage**

- no support for bigint

#### `OfficialWasmDialect`: performance

you can choose to use [OPFS](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API#origin_private_file_system) as backend storage(for some vfs, your server must response COOP and COEP in header, see [doc](https://sqlite.org/wasm/doc/trunk/persistence.md#coop-coep)), which is recommended officially (see [this](https://sqlite.org/forum/forumpost/59097f57cbe647a2d1950fab93e7ab82dd24c1e384d38b90ec1e2f03a2a4e580) and [this](https://sqlite.org/forum/forumpost/8f50dc99149a6cedade784595238f45aa912144fae81821d5f9db31965f754dd)) and **only work in WebWorker**.

The dialect executes Kysely queries with the official prepared-statement API (`prepare`, `bind`, `step`, `get`, `finalize`) instead of the higher-level `exec` helper. `stream()`/`streamQuery()` reuses the same low-level path and finalizes statements in a `finally` block, so large `select` results can be consumed incrementally instead of first collecting every row into an array.

```ts
const rows = db.selectFrom('person').selectAll().stream()

for await (const row of rows) {
  console.log(row)
}
```

#### `WaSqliteDialect`: polyfill

deprecated, you can choose to use [worker dialect](../dialect-wasqlite-worker/)

#### `NodeWasmDialect`: no compile

you can choose to use `native file system` as backend storage, which is no need to recompile for different platform

#### `CrsqliteDialect`: CRDT

you can choose to use `IndexedDB` as backend storage

### Raw row-returning SQL

`NodeWasmDialect` and `CrSqliteDialect` use conservative raw SQL handling. Raw statements are treated as writes unless you provide an `isQuery` classifier for statements that return rows:

```ts
const db = new Kysely<DB>({
  dialect: new NodeWasmDialect({
    database,
    isQuery: (sql) => sql === 'select 1 as value',
  }),
})
```

Use the same option with `CrSqliteDialect`. Classify any additional row-returning raw statements you rely on, including PRAGMAs or dialect-specific statements.

### Type

see in jsdoc

### Usage and more details

see [test](test/index.test.ts) and [playground](../../playground/src/modules)
