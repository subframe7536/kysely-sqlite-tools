# kysely-generic-sqlite

Build a Kysely SQLite dialect for any SQLite client, running on the main thread
or in a Node.js/Web Worker.

This package provides the Kysely driver, connection lifecycle, query routing,
and worker RPC. You provide the small adapter that executes SQL against your
SQLite client.

> [!IMPORTANT]
> Upgrading from v1.2.1? Follow [MIGRATE_TO_V2.md](./MIGRATE_TO_V2.md). The v2
> worker protocol is not compatible with v1.

## Requirements and installation

- Kysely `>=0.29`
- A SQLite client for the target runtime

```sh
pnpm add kysely kysely-generic-sqlite
```

Equivalent `npm`, `yarn`, `bun`, and `deno add npm:` commands also work.

## Choose an integration

| Requirement                                 | Use                                        |
| ------------------------------------------- | ------------------------------------------ |
| Execute in the current thread               | `GenericSqliteDialect`                     |
| Execute in a Node.js worker thread          | `GenericSqliteWorkerDialect` + Node helper |
| Execute in a Web Worker                     | `GenericSqliteWorkerDialect` + Web helper  |
| Implement a completely custom Kysely driver | `BaseSqliteDialect` / `BaseSqliteDriver`   |

## 1. Implement an executor

An executor owns the native database and implements `query`, `close`, and
optionally `iterator`.

The safest approach is to use statement metadata when the client exposes it:

```ts
import Database from 'better-sqlite3'
import type { IGenericSqlite } from 'kysely-generic-sqlite'
import { parseBigInt } from 'kysely-generic-sqlite'

export function createExecutor(fileName: string): IGenericSqlite<Database.Database> {
  const db = new Database(fileName)

  return {
    db,
    query: (_isSelect, sql, parameters) => {
      const statement = db.prepare(sql)
      if (statement.reader) {
        // `reader` calls `sqlite3_column_count` to check if the statement returns rows
        return { rows: statement.all(parameters) }
      }

      const result = statement.run(parameters)
      return {
        rows: [],
        insertId: parseBigInt(result.lastInsertRowid),
        numAffectedRows: parseBigInt(result.changes),
      }
    },
    iterator: (_isSelect, sql, parameters) => {
      return db.prepare(sql).iterate(parameters) as IterableIterator<unknown>
    },
    close: () => db.close(),
  }
}
```

### Use `buildQueryFn` helper

`buildQueryFn` simplifies creating query functions when the client has separate read and write APIs or the client does not expose statement metadata. Its `isQuery(sql, node)` callback decides which API to call.

```ts
import type { IGenericSqlite } from 'kysely-generic-sqlite'
import { buildQueryFn, defaultIsQuery, parseBigInt } from 'kysely-generic-sqlite'

function classifySql(sql: string): boolean {
  return /^\s*(select|pragma|explain|values)\b/i.test(sql)
}

export function createExecutor(client: SqliteClient): IGenericSqlite<SqliteClient> {
  return {
    db: client,
    query: buildQueryFn({
      isQuery: (sql, node) => defaultIsQuery(sql, node) || classifySql(sql),
      all: (sql, parameters) => client.all(sql, parameters ?? []),
      run: async (sql, parameters) => {
        const result = await client.run(sql, parameters ?? [])
        return {
          insertId: parseBigInt(result.lastInsertRowid),
          numAffectedRows: parseBigInt(result.changes),
        }
      },
    }),
    close: () => client.close(),
  }
}
```

`defaultIsQuery` recognizes Kysely AST nodes for `SELECT` and writes with
`RETURNING`. It intentionally returns `false` for `RawNode` (including raw
`SELECT` and `PRAGMA`) and when `node` is unavailable in a worker request.
Provide an `isQuery` classifier when those statements can return rows. For
complex SQL (`WITH`, comments, or client-specific syntax), prefer the client's
parser or statement metadata over the simple regular expression above.

`run` may optionally return `rows` in addition to `insertId` and
`numAffectedRows`. `buildQueryFn` forwards those rows, allowing executors whose
write API returns a result set to support `RETURNING` and similar statements.

## 2. Run on the main thread

```ts
import { CompiledQuery, Kysely } from 'kysely'
import { GenericSqliteDialect } from 'kysely-generic-sqlite'

const dialect = new GenericSqliteDialect(
  () => createExecutor('app.db'),
  async (connection, options) => {
    await connection.executeQuery(CompiledQuery.raw('PRAGMA optimize'), options)
  },
)

const db = new Kysely<DatabaseSchema>({ dialect })
```

The executor factory and connection callback receive optional Kysely
`AbortableOperationOptions`. Functions that do not need them may omit the
parameter.

Streaming is available when the executor implements `iterator`. The dialect
forwards Kysely's `chunkSize` as an optional hint and stops iteration after the
operation signal is aborted.

## 3. Run in a Node.js worker

Main thread:

```ts
import { Worker } from 'node:worker_threads'

import { Kysely } from 'kysely'
import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
import { createNodeWorkerExecutor } from 'kysely-generic-sqlite/worker-helper-node'

const worker = new Worker(new URL('./database-worker.js', import.meta.url))
const dialect = new GenericSqliteWorkerDialect(
  createNodeWorkerExecutor({
    worker,
    data: { fileName: 'app.db' },
  }),
)

const db = new Kysely<DatabaseSchema>({ dialect })
```

Worker entry:

```ts
import { createNodeOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-node'

createNodeOnMessageCallback<{ fileName: string }>(({ fileName }) => createExecutor(fileName))
```

The helper handles initialization, request correlation, batched streams,
cancellation, errors, and orderly shutdown.

## 4. Run in a Web Worker

Main thread:

```ts
import { Kysely } from 'kysely'
import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
import { createWebWorkerExecutor } from 'kysely-generic-sqlite/worker-helper-web'

const worker = new Worker(new URL('./database-worker.js', import.meta.url), {
  type: 'module',
})
const dialect = new GenericSqliteWorkerDialect(
  createWebWorkerExecutor({
    worker,
    data: { fileName: 'app.db' },
  }),
)

const db = new Kysely<DatabaseSchema>({ dialect })
```

Worker entry:

```ts
import { createWebOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-web'

createWebOnMessageCallback<{ fileName: string }>(({ fileName }) => createExecutor(fileName))
```

No event emitter is required. Worker streams are pull-based: one batch is in
flight at a time, and early exit waits for the worker to release its iterator.

## 5. Custom worker requests

Register a `WorkerRequestHandler` in the worker and capture the created
connection on the main thread.

Worker entry:

```ts
import type { WorkerRequestHandler } from 'kysely-generic-sqlite/worker'
import { createNodeOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-node'

const handleCustomRequest: WorkerRequestHandler<NativeDatabase> = (executor, { type, payload }) => {
  if (type === 'optimize') {
    return executor.db.optimize(payload)
  }
  throw new Error(`Unknown request: ${type}`)
}

createNodeOnMessageCallback(createExecutor, handleCustomRequest)
```

Main thread:

```ts
import type { GenericSqliteWorkerConnection } from 'kysely-generic-sqlite/worker'
import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'

let connection: GenericSqliteWorkerConnection | undefined

const dialect = new GenericSqliteWorkerDialect(
  createNodeWorkerExecutor({ worker }),
  (createdConnection) => {
    connection = createdConnection as GenericSqliteWorkerConnection
  },
)

const result = await connection!.request<OptimizeResult>('optimize', {
  source: 'startup',
})
```

Custom requests are serialized with database work. Unknown requests reject with
an error returned from the worker.

## 6. Build a custom dialect or transport

For a custom Kysely driver, compose the base dialect:

```ts
import { BaseSqliteDialect } from 'kysely-generic-sqlite'

const dialect = new BaseSqliteDialect(() => new YourCustomDriver())
```

For a custom worker transport, implement
`IGenericSqliteWorkerExecutor`/`HandleWorkerFn`. Use the exported
`WorkerRequest` and `WorkerResponse` unions as the wire protocol; the required
lifecycle and cancellation semantics are documented in
[MIGRATE_TO_V2.md](./MIGRATE_TO_V2.md#4-worker-api-replace-do-not-patch).

## Public entry points

| Entry point                                | Main exports                                                                                    |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `kysely-generic-sqlite`                    | Dialects, drivers, executor types, `buildQueryFn`, `defaultIsQuery`, `parseBigInt`, `access`    |
| `kysely-generic-sqlite/worker`             | Worker dialect/driver/connection, protocol types, generic message callback, error serialization |
| `kysely-generic-sqlite/worker-helper-node` | Node worker executor and message callback                                                       |
| `kysely-generic-sqlite/worker-helper-web`  | Web Worker executor and message callback                                                        |

Avoid deep imports from `dist` or `src`; only the entry points above are public.

## Related dialects

- [kysely-dialect-tauri](https://github.com/subframe7536/kysely-sqlite-tools/tree/master/packages/dialect-tauri)
- [kysely-sqlite-worker](https://github.com/subframe7536/kysely-sqlite-tools/tree/master/packages/dialect-sqlite-worker)
- [kysely-bun-worker](https://github.com/subframe7536/kysely-sqlite-tools/tree/master/packages/dialect-bun-worker)
- [kysely-wasqlite-worker](https://github.com/subframe7536/kysely-sqlite-tools/tree/master/packages/dialect-wasqlite-worker)
- [kysely-wasm](https://github.com/subframe7536/kysely-sqlite-tools/tree/master/packages/dialect-wasm)
