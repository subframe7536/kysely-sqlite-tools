# wasm dialect

[kysely](https://github.com/kysely-org/kysely) dialect for various SQLite wasm

no wasm denpendencies, your need to install yourself

## install

```shell
pnpm add -D kysely kysely-wasm
```

## introduce

there are 6 dialects

- SqlJsDialect: dialect for [sql.js](https://github.com/sql-js/sql.js)
- WaSqliteDialect: dialect for [wa-sqlite](https://github.com/rhashimoto/wa-sqlite)
- OfficialWasmDialct: dialect for [official wasm build](https://sqlite.org/wasm/doc/trunk/index.md)
- NodeWasmDialct: dialect for [node sqlite3 wasm](https://github.com/tndrle/node-sqlite3-wasm)
- EmptyDialect: only for sql generation, no backend
  - maybe can be used in [kikko](https://github.com/kikko-land/kikko)
- CrsqliteDialect: dialect for [vlcn.io/wasm](https://vlcn.io/js/wasm)

### Differences

#### `SqlJsDialect`
you can **get total buffer** on every sql execution except `select` and **no backend storage**

#### `OfficialWasmDialect`
you can choose to use [OPFS](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API#origin_private_file_system) as backend storage(your server must response [COOP and COEP](https://sqlite.org/wasm/doc/trunk/persistence.md#coop-coep) in header), which is recommended officially (see [this](https://sqlite.org/forum/forumpost/59097f57cbe647a2d1950fab93e7ab82dd24c1e384d38b90ec1e2f03a2a4e580) and [this](https://sqlite.org/forum/forumpost/8f50dc99149a6cedade784595238f45aa912144fae81821d5f9db31965f754dd)) and **only work in WebWorker**.

#### `WaSqliteDialect`
you can choose not only `OPFS` but also `IndexedDB` as backend storage for better compability, maybe better for **polyfill**

- only worked in secure environment, like localhost or https

#### `NodeWasmDialect`
you can choose to use `native file system` as backend storage, which is no need to recompile for different platform, **useful for Electron app**.

#### `CrsqliteDialect`
you can choose to use `IndexedDB` as backend storage (as forked version of `WaSqlite`). **useful for CRDT**

### type

see in jsdoc

### usage and more detali

see [test](../../test/dialect-wasm.test.ts) and [playground](../../playground/src/modules)


## TODO

- [ ] add type and use [worker client](https://github.com/tomayac/sqlite-wasm#usage-with-the-bundled-sqliteclient-with-opfs-if-available) for `OfficialWasmDialect`
- [ ] seem to have nodejs support for official wasm: https://github.com/tomayac/sqlite-wasm/blob/main/sqlite-wasm/jswasm/sqlite3-node.mjs
- [ ] add indexeddb support for official wasm, [example](https://sqlite.org/src/file/ext/wasm/api/sqlite3-vfs-opfs.js)