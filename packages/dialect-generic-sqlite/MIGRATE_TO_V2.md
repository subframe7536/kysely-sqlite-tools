# Migrate `kysely-generic-sqlite` from v1.2.1 to v2

This guide is a source-level comparison of tag `v1.2.1` with v2. It covers only
`kysely-generic-sqlite` and is organized so a migration agent can apply and
verify each change independently.

## Migration procedure

1. Upgrade `kysely` to `>=0.29`.
2. Migrate the main-thread executor contract.
3. Migrate worker code, if the project uses it.
4. Remove all imports of the deleted v1 symbols listed below.
5. Typecheck and run tests, including writes with `RETURNING`, streaming, early
   stream exit, worker failure, and shutdown while work is active.

## Complete compatibility checklist

- [ ] `kysely` satisfies `>=0.29`.
- [ ] Every `IGenericSqlite.query` accepts required `parameters` and optional `node`.
- [ ] Every `IGenericSqlite.iterator` accepts required `parameters` and optional `chunkSize`.
- [ ] `buildQueryFnAlt` is replaced.
- [ ] Every `buildQueryFn` write path executes the supplied SQL, not `select 1`.
- [ ] Ambiguous or raw SQL is classified with `isQuery` where necessary.
- [ ] Executor factories and connection callbacks accept optional operation options when explicitly typed.
- [ ] Custom drivers no longer rely on `BaseSqliteDriver`'s v1 mutex.
- [ ] Worker executors no longer provide `mitt`.
- [ ] Numeric worker messages and v1 event constants are removed.
- [ ] Custom worker calls use `WorkerRequestHandler` and `connection.request()`.
- [ ] Custom worker transports subscribe to message, error, and close events and return a disposer.
- [ ] Worker streams use positive batch sizes and support early cancellation.

## 1. Dependency and driver lifecycle

### Kysely peer version

```diff
- "kysely": ">=0.26"
+ "kysely": ">=0.29"
```

v2 delegates single-connection serialization to Kysely. The private mutex in
`BaseSqliteDriver` was removed: `acquireConnection()` returns the single
connection immediately and `releaseConnection()` is a no-op. Remove subclasses,
tests, or wrappers that expect `releaseConnection()` to unlock queued work.

`BaseSqliteDriver.init` now has this shape:

```ts
init: (options?: AbortableOperationOptions) => Promise<void>
```

Savepoint methods are always installed in v2; they are no longer initialized by
a dynamic Kysely import. Custom drivers should continue assigning `this.conn`
during `init` and releasing their resources in `destroy`.

## 2. Main-thread executor API

### `IGenericSqlite.query`

```diff
 query(
   isSelect: boolean,
   sql: string,
-  parameters?: any[] | readonly any[],
+  parameters: any[] | readonly any[],
+  node?: RootOperationNode,
 ): Promisable<QueryResult<any>>
```

Kysely always supplies `parameters`; use `[]` for direct calls with no bindings.
The main-thread connection passes the operation node so an executor can identify
`SELECT` and data-changing statements with `RETURNING`. Worker execution does
not transfer the AST, so `node` is `undefined` there.

### `IGenericSqlite.iterator`

```diff
 iterator?(
   isSelect: boolean,
   sql: string,
-  parameters?: any[] | readonly any[],
+  parameters: any[] | readonly any[],
+  chunkSize?: number,
 ): IterableIterator<unknown> | AsyncIterableIterator<unknown>
```

Use `chunkSize` as a performance hint when the SQLite client supports batching.
The main-thread connection stops iteration when its operation signal is aborted.

### Factories and connection callbacks

Replace explicit zero-argument factory types with:

```ts
type SqliteExecutorFactory<T> = (options?: AbortableOperationOptions) => Promisable<T>
```

`OnCreateConnection` also receives the same optional options:

```ts
type OnCreateConnection = (
  connection: DatabaseConnection,
  options?: AbortableOperationOptions,
) => Promisable<void>
```

Functions that ignore the new optional argument remain assignable.

## 3. Query routing helpers

### `buildQueryFnAlt` was removed

Replace both v1 helpers with `buildQueryFn`. v2 calls exactly one executor
method for each statement:

- `all(sql, parameters)` when `isQuery(sql, node)` is true.
- `run(sql, parameters)` otherwise.

The v1 `buildQueryFn` executed every SQL string through `all`, then called
`run('select 1')` to fetch write metadata. That workaround is gone. A v2 `run`
implementation must execute the original `sql` argument and return
`insertId`/`numAffectedRows`; it may also return `rows`. `buildQueryFn` forwards
those rows, allowing a write API that returns result sets to support
`RETURNING` and similar statements.

```ts
const query = buildQueryFn({
  isQuery: (sql, node) => defaultIsQuery(sql, node) || classifySql(sql),
  all: (sql, parameters) => client.all(sql, parameters),
  run: async (sql, parameters) => {
    const result = await client.run(sql, parameters)
    return {
      insertId: parseBigInt(result.lastInsertRowid),
      numAffectedRows: parseBigInt(result.changes),
    }
  },
})
```

The default classifier, exported as `defaultIsQuery`, recognizes Kysely AST
nodes for `SELECT` and `INSERT`/`UPDATE`/`DELETE ... RETURNING`. It returns
`false` for `RawNode`, including raw `SELECT` and `PRAGMA`, and when workers do
not receive an AST. Supply `isQuery` when the executor must support raw reads,
`WITH`, vendor-specific statements, or reads inside a worker.

The new root export `access(valueOrFactory)` resolves a direct value or a lazy,
possibly asynchronous factory. It is optional convenience, not a required
migration.

## 4. Worker API: replace, do not patch

### Removed v1 API

Delete imports and usages of:

- `initEvent`, `runEvent`, `closeEvent`, `dataEvent`, and `endEvent`
- `InitMsg`, `RunMsg`, `StreamMsg`, `CloseMsg`, `MainToWorkerMsg`, and `WorkerToMainMsg`
- `IGenericEventEmitter`, `HandleMessageFn`, and `MessageHandleFn`
- `createNodeMitt`
- the `mitt` property on `IGenericSqliteWorkerExecutor` and Web worker config

### Replacement API

The public `kysely-generic-sqlite/worker` entry point exports:

- `WorkerRequest` and `WorkerResponse`: the discriminated object protocol.
- `WorkerHandlers` and `HandleWorkerFn`: transport event wiring.
- `WorkerRequestHandler`: custom request handling inside the worker.
- `GenericSqliteWorkerConnection`: execution, streaming, cancellation, and custom requests.
- `serializeWorkerError` and `deserializeWorkerError`: error transport helpers.

Prefer `createNodeWorkerExecutor`/`createNodeOnMessageCallback` or
`createWebWorkerExecutor`/`createWebOnMessageCallback`. They implement the
protocol and worker lifecycle without application-owned event emitters.

### Custom requests

Replace arbitrary event names and positional `data1`...`data3` arguments with a
named request and one payload:

```ts
// worker.ts
import type { WorkerRequestHandler } from 'kysely-generic-sqlite/worker'
import { createNodeOnMessageCallback } from 'kysely-generic-sqlite/worker-helper-node'

const handleCustomRequest: WorkerRequestHandler<MyDatabase> = (executor, { type, payload }) => {
  if (type === 'optimize') {
    return executor.db.pragma('optimize')
  }
  throw new Error(`Unknown request: ${type}`)
}

createNodeOnMessageCallback(createExecutor, handleCustomRequest)
```

```ts
// main.ts
import type { GenericSqliteWorkerConnection } from 'kysely-generic-sqlite/worker'

let connection: GenericSqliteWorkerConnection | undefined

const dialect = new GenericSqliteWorkerDialect(
  createNodeWorkerExecutor({ worker }),
  (createdConnection) => {
    connection = createdConnection as GenericSqliteWorkerConnection
  },
)

await connection!.request('optimize', { source: 'startup' })
```

The promise returned by `request<T>()` resolves with the handler result and
rejects with a deserialized worker error.

### Custom transports

`handle` no longer receives one message callback. It receives lifecycle
handlers and must return an unsubscribe function:

```ts
const handle: HandleWorkerFn<MyWorker> = (worker, handlers) => {
  worker.onMessage(handlers.message)
  worker.onError(handlers.error)
  worker.onClose(handlers.close)

  return () => {
    worker.offMessage(handlers.message)
    worker.offError(handlers.error)
    worker.offClose(handlers.close)
  }
}
```

`IGenericWorker.postMessage` now accepts `unknown`, and `terminate` may be
asynchronous. A transport error or unexpected close rejects every pending
operation.

### Protocol behavior for manual implementations

Only implement the wire protocol manually when the built-in callbacks cannot be
used. Use the exported union types as the source of truth. Required behavior:

1. Correlate every request and response with `id`.
2. Reply to `init` with `ready`.
3. Serialize thrown values into the `error` response.
4. Serialize worker operations so `close` waits for queued execution.
5. Stream in pull-based batches using `streamId`, `chunkSize`, and `pull`.
6. On stream cancellation, call the iterator's `return()` before replying with
   `cancelled`, even if cleanup throws.
7. On close, return all active iterators, close the executor, then reply with
   `closed`.

Worker `streamQuery` requires a positive integer `chunkSize` and yields one
`QueryResult` per received batch. Early return sends a cancellation request and
waits for its acknowledgement. This replaces v1's unbounded row push and global
event listeners, which could not safely correlate concurrent work.

## 5. Public API difference table

| v1.2.1 API or behavior                              | v2 replacement                                     |
| --------------------------------------------------- | -------------------------------------------------- |
| `buildQueryFnAlt`                                   | `buildQueryFn` with optional `isQuery`             |
| `buildQueryFn` probes writes with `run('select 1')` | `run(sql, parameters)` executes the real statement |
| Optional executor parameters                        | Required parameters; Kysely supplies an array      |
| No operation node in `query`                        | Optional `RootOperationNode` on the main thread    |
| Zero-argument factories/callbacks                   | Optional `AbortableOperationOptions`               |
| Driver-owned connection mutex                       | Kysely single-connection serialization             |
| Numeric tuple worker protocol                       | `WorkerRequest`/`WorkerResponse` objects           |
| `mitt`/`IGenericEventEmitter`                       | Internal request map keyed by `id`                 |
| `MessageHandleFn` positional custom messages        | `WorkerRequestHandler` plus `connection.request()` |
| Worker pushes an entire stream                      | Pull-based batches and acknowledged cancellation   |
| Message-only transport hook                         | Message/error/close handlers plus disposer         |
| Synchronous `terminate(): void` contract            | `terminate(): Promisable<unknown>`                 |

## 6. Verification commands

Run relative tests to validate. Also search for stale v1 symbols:

```sh
rg 'buildQueryFnAlt|createNodeMitt|IGenericEventEmitter|HandleMessageFn|MessageHandleFn|initEvent|runEvent|dataEvent|endEvent|closeEvent|\bmitt\b'
```
