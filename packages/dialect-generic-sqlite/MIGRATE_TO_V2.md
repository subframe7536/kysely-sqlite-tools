# `kysely-generic-sqlite` v1.2.x → v2 migration guide

Scope: this document only covers `kysely-generic-sqlite`. It is written for automated migration agents and humans reviewing their changes.

> [!important]
> The worker protocol was replaced during the v2 beta. Numeric tuple events,
> `mitt`, and `MessageHandleFn` no longer exist. Use the exported tagged
> `WorkerRequest`/`WorkerResponse` types, `WorkerRequestHandler`, and
> `GenericSqliteWorkerConnection.request()` instead. The built-in Node and Web
> helpers implement the protocol and should be preferred over manual transport code.

## Agent workflow

1. Read the repository's package manager files and TypeScript sources.
2. Apply the rules below in order.
3. Prefer public package exports over deep imports.
4. Run the project's existing typecheck and tests.
5. Do not change package versions unless the migration task explicitly asks for it.

## Migration checklist

- [ ] Set the `kysely` peer dependency range to `>=0.29`.
- [ ] Remove code that depends on `BaseSqliteDriver` owning a connection mutex.
- [ ] Update `BaseSqliteDriver.init` overrides/usages to accept optional `AbortableOperationOptions`.
- [ ] Update `IGenericSqlite.query` implementations to require `parameters` and accept optional Kysely AST `node`.
- [ ] Update `OnCreateConnection` callbacks to accept the optional `options` argument.
- [ ] Update executor factories to accept optional `options`.
- [ ] Update custom worker protocol handlers for `queryId`, `chunkSize`, stream cancellation, and cancellation acknowledgements.
- [ ] Update custom `MessageHandleFn` callbacks to the v2 positional signature.
- [ ] Update custom `streamQuery` implementations to accept `chunkSize` and `options`.
- [ ] Replace ad-hoc lazy value resolution with `access` where useful.
- [ ] Ensure `run(sql, parameters)` executes the real SQL when using `buildQueryFn`.

---

## Rule 1: Kysely peer dependency is `>=0.29`

### Find

```jsonc
{ "peerDependencies": { "kysely": ">=0.26" } }
```

### Replace with

```jsonc
{ "peerDependencies": { "kysely": ">=0.29" } }
```

### Reason

v2 relies on Kysely's single-connection serialization support instead of the v1 dialect-owned mutex.

---

## Rule 2: `BaseSqliteDriver` no longer owns the connection mutex

### Find

- Subclasses overriding `releaseConnection` only to unlock a mutex.
- Tests or wrappers that call `driver.releaseConnection()` expecting it to unlock queued work.
- Direct references to the old private `ConnectionMutex` behavior.

### Replace with

```ts
class MyDriver extends BaseSqliteDriver {
  // acquireConnection() returns the single connection.
  // releaseConnection() is inherited as a no-op.
}
```

### Notes

`releaseConnection()` still exists for the Kysely driver contract, but it does not unlock anything in v2.

---

## Rule 3: `BaseSqliteDriver.init` accepts optional operation options

### v1 shape

```ts
abstract class BaseSqliteDriver {
  init: () => Promise<void>
}
```

### v2 shape

```ts
abstract class BaseSqliteDriver {
  init: (options?: AbortableOperationOptions) => Promise<void>
}
```

### Migration action

If a subclass, test double, or wrapper types `init`, add the optional argument. Call sites that use `driver.init()` without arguments do not need to change.

---

## Rule 4: `IGenericSqlite.query` receives required parameters and optional AST node

### v1 shape

```ts
interface IGenericSqlite<DB> {
  query(
    isSelect: boolean,
    sql: string,
    parameters?: any[] | readonly any[],
  ): Promisable<QueryResult<any>>
}
```

### v2 shape

```ts
interface IGenericSqlite<DB> {
  query(
    isSelect: boolean,
    sql: string,
    parameters: any[] | readonly any[],
    node?: RootOperationNode,
  ): Promisable<QueryResult<any>>
}
```

### Migration actions

1. Replace `parameters?` with required `parameters`.
2. Pass `[]` instead of `undefined` when there are no parameters.
3. Add the optional `node` argument.
4. Forward `node` to `buildQueryFn` when using that helper.

```ts
const executor: IGenericSqlite = {
  query: (isSelect, sql, parameters, node) => {
    return buildQueryFn(exec)(isSelect, sql, parameters, node)
  },
}
```

### Reason

The AST node lets v2 detect `RETURNING` reliably without relying only on SQL text or Kysely's `isSelect` flag.

---

## Rule 5: `OnCreateConnection` receives operation options

### v1 shape

```ts
type OnCreateConnection = (connection: DatabaseConnection) => Promisable<void>
```

### v2 shape

```ts
type OnCreateConnection = (
  connection: DatabaseConnection,
  options?: AbortableOperationOptions,
) => Promisable<void>
```

### Migration action

Update typed callbacks passed to `GenericSqliteDialect`, `GenericSqliteWorkerDialect`, or `IBaseSqliteDialectConfig.onCreateConnection`.

```ts
const dialect = new GenericSqliteDialect(factory, async (conn, options) => {
  await conn.executeQuery(CompiledQuery.raw('PRAGMA journal_mode=WAL'), options)
})
```

If the callback ignores options, use `_options` or omit a type annotation and let TypeScript infer compatibility.

---

## Rule 6: Executor factories receive operation options

### v1 shape

```ts
type Factory = () => Promisable<IGenericSqlite>
```

### v2 shape

```ts
type SqliteExecutorFactory<T> = (options?: AbortableOperationOptions) => Promisable<T>
```

### Migration action

Update explicit factory type annotations. Factory functions that ignore the parameter remain valid.

---

## Rule 7: Worker protocol tuples include `queryId`, stream chunk size, and cancellation acknowledgement

This rule only applies to custom worker transports or custom `onmessage` implementations. Code that uses the provided helper functions should not need protocol tuple changes.

### Main-to-worker messages

```ts
type RunMsg = [
  type,
  queryId: string,
  isSelect: boolean,
  sql: string,
  parameters: readonly unknown[],
]

type StreamMsg = [
  type,
  queryId: string,
  isSelect: boolean,
  sql: string,
  parameters: readonly unknown[],
  chunkSize?: number,
]

type CancelMsg = [type, queryId: string]
```

### Worker-to-main stream messages

```ts
// One raw row per data event.
type DataMsg<Row> = [type, queryId: string, data: Row, err: null]

type EndMsg = [type, queryId: string, data: null, err: unknown]
type CancelAckMsg = [type, queryId: string, data: null, err: unknown]
```

### Migration actions

1. Add `queryId` as the second tuple element for run and stream requests.
2. Forward `chunkSize` from `StreamMsg` to iterator-capable executors.
3. Treat `dataEvent` as one raw row, not `QueryResult[]`.
4. On `CancelMsg`, call `return()` on the active iterator for that `queryId`.
5. Send the cancellation acknowledgement only after `iterator.return()` has completed.
6. Suppress the normal stream end message for cancelled streams.

### Reason

The main thread must keep the worker-backed connection promise tied to the real worker execution lifetime. Cancellation acknowledgement prevents local stream cleanup from finishing before the worker has released the underlying SQLite statement.

---

## Rule 8: `MessageHandleFn` uses six positional parameters

### v1 shape

```ts
type MessageHandleFn<DB> = (
  exec: IGenericSqlite<DB>,
  type: string,
  data1: unknown,
  data2: unknown,
  data3: unknown,
) => Promisable<any>
```

### v2 shape

```ts
type MessageHandleFn<DB> = (
  exec: IGenericSqlite<DB>,
  type: string,
  data1: unknown,
  data2: unknown,
  data3: unknown,
  data4: unknown,
) => Promisable<any>
```

### Migration action

Update custom message handlers to accept the fourth data argument.

```ts
const handleCustomMessage: MessageHandleFn = async (exec, type, data1, data2, data3, data4) => {
  return undefined
}
```

---

## Rule 9: `streamQuery` accepts `chunkSize` and operation options

### v1 shape

```ts
async *streamQuery<R>(
  { parameters, query, sql }: CompiledQuery,
): AsyncIterableIterator<QueryResult<R>>
```

### v2 shape

```ts
async *streamQuery<R>(
  { parameters, query, sql, queryId }: CompiledQuery,
  chunkSize?: number,
  options?: AbortableOperationOptions,
): AsyncIterableIterator<QueryResult<R>>
```

### Migration actions

1. Add `queryId` when destructuring the compiled query if your implementation needs stream correlation.
2. Add `chunkSize?: number`.
3. Add `options?: AbortableOperationOptions`.
4. Respect `options.signal` for abort behavior.
5. For worker-backed streams, use the cancellation acknowledgement protocol from Rule 7.

---

## Rule 10: `buildQueryFn` and `buildQueryFnAlt` route queries differently

### `IGenericSqliteExecutor.run` return type

```ts
interface IGenericSqliteExecutor {
  run(
    sql: string,
    params: readonly unknown[],
  ): Promisable<Pick<QueryResult<any>, 'insertId' | 'numAffectedRows'> & { rows?: any[] }>
}
```

### Migration actions

1. Ensure `run(sql, params)` executes the supplied SQL.
2. Do not keep v1 implementations that only execute `select 1` for metadata.
3. If using `buildQueryFn`, forward the AST `node` from `IGenericSqlite.query`.
4. If using `buildQueryFnAlt`, verify raw SQL `SELECT` statements work when routed through `all`.

### Routing changes

| Helper            | v1 behavior                  | v2 behavior                                       |
| ----------------- | ---------------------------- | ------------------------------------------------- |
| `buildQueryFn`    | Mostly `isSelect`-driven     | Uses AST/text detection for read/returning SQL    |
| `buildQueryFnAlt` | `isSelect`-driven            | Uses `isSelect` plus SQL `select` prefix fallback |
| write path        | metadata workaround possible | executes the real write SQL                       |

---

## Rule 11: Prefer documented public exports

### Public exports added or promoted in v2

| Export                   | Import from                    | Purpose                             |
| ------------------------ | ------------------------------ | ----------------------------------- |
| `access`                 | `kysely-generic-sqlite`        | Resolve lazy values to `Promise<T>` |
| `isReadOrReturningQuery` | `kysely-generic-sqlite`        | Detect read or returning SQL        |
| `SqliteExecutorFactory`  | `kysely-generic-sqlite`        | Type executor factories             |
| Worker protocol exports  | `kysely-generic-sqlite/worker` | Build custom worker transports      |

### Migration action

Replace duplicated lazy-resolution code when appropriate:

```ts
import { access } from 'kysely-generic-sqlite'

const db = await access(config.database)
```

Avoid deep imports from `dist` or package-internal source files.
