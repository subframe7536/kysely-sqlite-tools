# wasm dialect

Wasm dialect for Kysely

## install

```shell
pnpm add -D kysely kysely-wasm
```

## usage

there are four dialects

- SqlJsDialect: dialect for [sql.js](https://github.com/sql-js/sql.js)
- CrsqliteDialect: dialect for [vlcn.io/wasm](https://vlcn.io/js/wasm)
- OfficialWasmDialct: dialect for [official wasm build](https://sqlite.org/wasm/doc/trunk/index.md)
- EmptyDialect: only for sql generation, no backend
  - maybe can be used in [kikko](https://github.com/kikko-land/kikko)

### difference between `SqlJsDialect` and `OfficialSqliteWasmDialect`

using `SqlJsDialect`, you can get the total buffer on every sql execution except `select`, no backend storage

using `CrsqliteDialect`, you can choose to use `Indexeddb` as backend storage, which have better compability and larger database size.

using `OfficialWasmDialect`, you can choose [OPFS](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API#origin_private_file_system) as backend(your server must response[COOP and COEP](https://sqlite.org/wasm/doc/trunk/persistence.md#coop-coep) in header), which is recommended officaially (see [this](https://sqlite.org/forum/forumpost/59097f57cbe647a2d1950fab93e7ab82dd24c1e384d38b90ec1e2f03a2a4e580) and [this](https://sqlite.org/forum/forumpost/8f50dc99149a6cedade784595238f45aa912144fae81821d5f9db31965f754dd)) and only work in WebWorker.

### type

see in jsdoc

### more detali

see [test](../../test/dialect-wasm.test.ts) and [playground](../../playground/src/modules)

## remark

[wa-sqlite](https://github.com/rhashimoto/wa-sqlite) is also a good choise, you can see usage in [kikko](https://github.com/kikko-land/kikko/tree/main/packages/wa-sqlite-backend/src)