# kysely-generic-sqlite

Generic Kysely dialect for SQLite, supporting execution in the main thread or a worker.

## Install

```sh
pnpm install kysely kysely-generic-sqlite
```

## Usage

This is a abstraction for sqlite dialect, so the dialect is not worked out-of-box.

Below is the guide to create a new dialect, use `better-sqlite3` as example.

### Executor

First of all, you need to create a function that returns a `IGenericSqlite`

```ts
import type { Database } from 'better-sqlite3'
import type { IGenericSqlite } from 'kysely-generic-sqlite'

function createSqliteExecutor(db: Database): IGenericSqlite<Database> {
  const getStmt = (sql: string) => db.prepare(sql)

  return {
    db,
    query: (_isSelect, sql, parameters) => {
      const stmt = getStmt(sql)
      if (stmt.reader) {
        return { rows: stmt.all(parameters) }
      }
      const { changes, lastInsertRowid } = stmt.run(parameters)
      return {
        rows: [],
        numAffectedRows: parseBigInt(changes),
        insertId: parseBigInt(lastInsertRowid),
      }
    },
    close: () => db.close(),
    iterator: (isSelect, sql, parameters) => {
      if (!isSelect) {
        throw new Error('Only support select in stream()')
      }
      return getStmt(sql).iterate(parameters) as any
    },
  }
}
```

For client that does not support `stmt.reader`, there are 2 utils with same parameters:

- `buildQueryFn`: Support `returning`, get `insertId` and `numAffectedRows` by calling `select 1`
- `buildQueryFnAlt`: Do not support `returning`

```ts
import Database from 'bun:sqlite'
import { type IGenericSqlite, parseBigInt } from 'kysely-generic-sqlite'

function createSqliteExecutor(db: Database, cache: boolean): IGenericSqlite<Database> {
  const fn = cache ? 'query' : 'prepare'
  const getStmt = (sql: string) => db[fn](sql)

  return {
    db,
    query: buildQueryFn({
      all: (sql, parameters) => getStmt(sql).all(...parameters || []),
      run: (sql, parameters) => {
        const { changes, lastInsertRowid } = getStmt(sql).run(...parameters || [])
        return {
          insertId: parseBigInt(lastInsertRowid),
          numAffectedRows: parseBigInt(changes),
        }
      },
    }),
    close: () => db.close(),
  }
}
```

### Run SQLs In Current Thread

To create a dialect that run SQLs in current thread, you can use built-in dialect `GenericSqliteDialect`:

```ts
import type { DatabaseConnection } from 'kysely'
import { CompiledQuery, Kysely } from 'kysely'
import { GenericSqliteDialect } from 'kysely-generic-sqlite'

const dialect = new GenericSqliteDialect(
  createSqliteExecutor,
  // optional on created callback
  (conn: DatabaseConnection) => {
    await conn.execute(CompiledQuery.raw('PRAGMA optimize'))
  }
)

const db = new Kysely<YourDB>({ dialect })
```

### Run SQLs In NodeJS Worker Thread

To create a dialect that run SQLs in nodejs's `worker_threads`, you can use built-in dialect `GenericSqliteWorkerDialect`:

```ts
import { Worker } from 'node:worker_threads'
import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
import { createNodeWorkerExecutor } from 'kysely-generic-sqlite/worker-helper-node'

const worker = new Worker('./worker.js')
const dialect = new GenericSqliteWorkerDialect(
  createNodeWorkerExecutor({
    worker,
    // Optional extra data.
    // You can also transport data using `require('node:worker_threads').workerData`
    // or directly define in worker file
    data: { fileName: ':memory:' },
  }),
  // optional on created callback
  (conn: DatabaseConnection) => {
    await conn.execute(CompiledQuery.raw('PRAGMA optimize'))
  }
)
```

in `worker.ts`

```ts
import BetterSqlite3Database, { type Database } from 'better-sqlite3'
import { createNodeOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-node'

createNodeOnMessageCallback<{ fileName: string }>(
  data => createSqliteExecutor(data.fileName)
)
```

### Run SQLs In Web Worker

To create a dialect that run SQLs in web worker, you can use built-in dialect `GenericSqliteWorkerDialect`:

```ts
import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
import { createWebWorkerExecutor } from 'kysely-generic-sqlite/worker-helper-web'
import { mitt } from 'zen-mitt'

const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })
const dialect = new GenericSqliteWorkerDialect(
  createWebWorkerExecutor({
    worker,
    // Event Emitter to handle worker messages
    mitt: mitt(),
    // Optional extra data.
    data: { fileName: ':memory:' },
  }),
  // optional on created callback
  (conn: DatabaseConnection) => {
    await conn.execute(CompiledQuery.raw('PRAGMA optimize'))
  }
)
```

in `worker.ts`

```ts
import { createWebOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-web'

async function createSqliteExecutor(fileName: string) {
  // your implemention...
}

createWebOnMessageCallback<{ fileName: string }>(
  (data) => {
    const db = createSqliteExecutor(data.fileName)

    // more handle with db instance...

    return db
  }
)
```

### Send Custom Messages To Worker

dialect:

```ts
import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
import { createNodeMitt, handleNodeWorker } from 'kysely-generic-sqlite/worker-helper-node'

const outer = createNodeMitt()
const dialect = new GenericSqliteWorkerDialect(
  async () => {
    const m = createNodeMitt()
    m.on('test', console.log)
    outer.on('call-test', () => m.emit('test', 'your-data'))
    return {
      worker: new Worker('./worker.js'),
      mitt: m,
      handle: handleNodeWorker
    }
  }
)
```

in `worker.ts`

```ts
import type { Database } from 'better-sqlite3'
import { createNodeOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-node'

createNodeOnMessageCallback<{}, Database>(
  data => createSqliteExecutor(':memory:'),
  (exec, type, data1, data2, data3) => {
    if (type === 'test') {
      exec.db.pragma('optimize')
      console.log(data1) // 'your-data'
      return 'CUSTOM'
    }
  }
)
```

### Use Basic Dialect

```ts
import { BaseSqliteDialect } from 'kysely-generic-sqlite'

const dialect = new BaseSqliteDialect(() => new YourCustomDriver())
```

## Dialects Based On This dialect

- [kysely-dialect-tauri](https://github.com/subframe7536/kysely-sqlite-tools/tree/master/packages/dialect-tauri)
- [kysely-sqlite-worker](https://github.com/subframe7536/kysely-sqlite-tools/tree/master/packages/dialect-sqlite-worker)
- [kysely-bun-worker](https://github.com/subframe7536/kysely-sqlite-tools/tree/master/packages/dialect-bun-worker)
- [kysely-wasqlite-worker](https://github.com/subframe7536/kysely-sqlite-tools/tree/master/packages/dialect-wasqlite-worker)
- [kysely-wasm](https://github.com/subframe7536/kysely-sqlite-tools/tree/master/packages/dialect-wasm)
