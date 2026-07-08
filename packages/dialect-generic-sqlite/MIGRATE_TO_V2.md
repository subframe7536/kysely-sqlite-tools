## Migrate from v1.2.x to v2.0.0

This guide lists every breaking change between `v1.2.1` and `v2.0.0`. It is organized so an automated agent can apply each rule mechanically — every rule has a **before** (v1) and **after** (v2) code sample.

---

### Rule 1 — Bump Kysely peer dependency

`kysely` peer range changed from `>=0.26` to `>=0.29`. Update `package.json`:

```jsonc
// ❌ v1.2.1
{ "peerDependencies": { "kysely": ">=0.26" } }

// ✅ v2
{ "peerDependencies": { "kysely": ">=0.29" } }
```

v2 relies on `SqliteAdapter.supportsMultipleConnections` (added in Kysely 0.29) to serialize access to the single SQLite connection. The `ConnectionMutex` that v1 maintained internally is removed (see Rule 2).

---

### Rule 2 — `BaseSqliteDriver` mutex removed; `releaseConnection` is a no-op

v1 had a private `ConnectionMutex` that serialized `acquireConnection` / `releaseConnection`. v2 removes it — Kysely ≥ 0.29 handles this at the adapter level.

If you extend `BaseSqliteDriver` directly:

```ts
// ❌ v1.2.1 — override releaseConnection to unlock
class MyDriver extends BaseSqliteDriver {
  // acquireConnection() locks, releaseConnection() unlocks — both handle mutex
}

// ✅ v2 — releaseConnection is already implemented as a no-op; do NOT override it
class MyDriver extends BaseSqliteDriver {
  // acquireConnection() returns this.conn! directly
  // releaseConnection() — inherited no-op, do not touch
}
```

If you were calling `driver.releaseConnection()` in tests or wrapper code expecting it to unlock — remove those calls; they are harmless no-ops in v2.

---

### Rule 3 — `BaseSqliteDriver.init` signature changed

```ts
// ❌ v1.2.1
abstract class BaseSqliteDriver {
  init: () => Promise<void> // public property, assigned in constructor
  constructor(init: () => Promise<void>) {
    /* ... */
  }
}

// ✅ v2
abstract class BaseSqliteDriver {
  constructor(public init: (options?: AbortableOperationOptions) => Promise<void>) {}
}
```

`init` is now a **constructor parameter property** (still public, still assignable). The key differences:

- It now receives an optional `options?: AbortableOperationOptions` (with an `AbortSignal`).
- The v1 constructor ran `import('kysely').then(...)` as a side effect to bind savepoint methods dynamically. v2 imports `createQueryId` statically and defines savepoint methods as concrete class members — no dynamic import side effect.

If you were calling `driver.init()` with no arguments — **no change needed**, the `options` parameter is optional.

---

### Rule 4 — `IGenericSqlite.query` gained a 4th parameter `node`

```ts
// ❌ v1.2.1
interface IGenericSqlite<DB> {
  query(
    isSelect: boolean,
    sql: string,
    parameters?: any[] | readonly any[], // optional
  ): Promisable<QueryResult<any>>
}

// ✅ v2
interface IGenericSqlite<DB> {
  query(
    isSelect: boolean,
    sql: string,
    parameters: any[] | readonly any[], // required
    node?: RootOperationNode, // new — Kysely query AST
  ): Promisable<QueryResult<any>>
}
```

Two changes in this signature:

1. **`parameters` is now required** (was optional). If you pass `undefined`, change it to `[]`.
2. **New 4th parameter `node`** — the Kysely query AST node, used by `isReadOrReturningQuery` to detect `RETURNING` clauses. If you hand-roll an executor, forward it; if you ignore it the dialect still works but raw-SQL `RETURNING` detection degrades.

```ts
// ✅ v2 — hand-rolled executor
const executor: IGenericSqlite = {
  query: (isSelect, sql, parameters, node) => {
    // pass node through if using buildQueryFn
    return buildQueryFn(exec)(isSelect, sql, parameters, node)
  },
}
```

---

### Rule 5 — `OnCreateConnection` callback receives a second argument

```ts
// ❌ v1.2.1
type OnCreateConnection = (connection: DatabaseConnection) => Promisable<void>

// ✅ v2
type OnCreateConnection = (
  connection: DatabaseConnection,
  options?: AbortableOperationOptions,
) => Promisable<void>
```

All callbacks passed as the second constructor argument to `GenericSqliteDialect`, `GenericSqliteWorkerDialect`, or any `IBaseSqliteDialectConfig.onCreateConnection` now receive kysely's `AbortableOperationOptions` as the second parameter. Update callback signatures:

```ts
// ❌ v1.2.1
const dialect = new GenericSqliteDialect(factory, async (conn) => {
  await conn.executeQuery(CompiledQuery.raw('PRAGMA journal_mode=WAL'))
})

// ✅ v2
const dialect = new GenericSqliteDialect(factory, async (conn, options) => {
  await conn.executeQuery(CompiledQuery.raw('PRAGMA journal_mode=WAL'))
})
```

If you ignore the second parameter, the callback still works — just add `, _options` or `options?` to satisfy the type.

---

### Rule 6 — Executor factory receives `options`

```ts
// ❌ v1.2.1
type Factory = () => Promisable<IGenericSqlite>

// ✅ v2
type SqliteExecutorFactory<T> = (options?: AbortableOperationOptions) => Promisable<T>
```

The factory passed to `GenericSqliteDialect` / `GenericSqliteWorkerDialect` constructors now receives `options`. If your factory ignores it, no change needed. If you have a type annotation, update to `SqliteExecutorFactory<IGenericSqlite>`.

---

### Rule 7 — Worker message format: `queryId` added for correlation

**v1.2.1 worker messages had no query ID.** `RunMsg` and `StreamMsg` were:

```ts
// ❌ v1.2.1
type RunMsg = [type, isSelect: boolean, sql: string, parameters?: readonly unknown[]]
type StreamMsg = [type, isSelect: boolean, sql: string, parameters?: readonly unknown[]]
```

**v2 adds `queryId`** as the second element, `chunkSize` to `StreamMsg`, and a
stream cancellation message:

```ts
// ✅ v2
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

`CancelMsg` is sent when the main thread stops consuming a worker stream before
the worker sends `endEvent`, including aborts, early iterator close, and
connection close. Custom worker protocol implementations must call `return()` on
the active iterator for that `queryId` and suppress the normal end response.

**Worker-side handler (`createGenericOnMessageCallback`) message destructuring changed:**

```ts
// ❌ v1.2.1 — 3 data args
return async ([type, data1, data2, data3]) => {
  /* ... */
}

// ✅ v2 — 5 data args (queryId, isSelect, sql, params, chunkSize)
return async ([type, data1, data2, data3, data4, data5]) => {
  /* ... */
}
```

If you wrote a custom `onmessage` handler that manually destructures the tuple, update the arity and positions. If you use `createNodeOnMessageCallback` / `createWebOnMessageCallback` (the recommended path), this is handled for you.

**`MessageHandleFn` data args also expanded:**

```ts
// ❌ v1.2.1
type MessageHandleFn<DB> = (
  exec: IGenericSqlite<DB>,
  type: string,
  data1: unknown,
  data2: unknown,
  data3: unknown,
) => Promisable<any>

// ✅ v2
type MessageHandleFn<DB> = (
  exec: IGenericSqlite<DB>,
  type: string,
  data1: unknown,
  data2: unknown,
  data3: unknown,
  data4: unknown,
) => Promisable<any>
```

---

### Rule 8 — `streamQuery` signature on connections changed

Both `GenericSqliteConnection` and `GenericSqliteWorkerConnection`:

```ts
// ❌ v1.2.1
async *streamQuery<R>(
  { parameters, query, sql }: CompiledQuery
): AsyncIterableIterator<QueryResult<R>>

// ✅ v2
async *streamQuery<R>(
  { parameters, query, sql, queryId }: CompiledQuery,
  chunkSize?: number,
  options?: AbortableOperationOptions
): AsyncIterableIterator<QueryResult<R>>
```

v2 adds `chunkSize` forwarding and `AbortSignal` support via `options?.signal`. If you implement a custom `DatabaseConnection`, update the signature and wire the abort listener.

For worker-backed connections, aborting or closing the async iterator also sends
`CancelMsg` to the worker so the worker-side iterator can stop and release its
statement. If you use `GenericSqliteWorkerDialect`, this is already implemented.
If you wrote your own worker connection, mirror this behavior instead of only
rejecting the main-thread promise.

---

### Rule 9 — `buildQueryFn` / `buildQueryFnAlt` routing and `IGenericSqliteExecutor.run` behavior changed

Three related changes: `buildQueryFn` now uses AST-aware routing, `buildQueryFnAlt` gained SQL-level detection, and `IGenericSqliteExecutor.run`'s return type expanded to match.

**`IGenericSqliteExecutor.run` return type:**

```ts
// ❌ v1.2.1
interface IGenericSqliteExecutor {
  run(sql, params): Promisable<Pick<QueryResult<any>, 'insertId' | 'numAffectedRows'>>
}

// ✅ v2
interface IGenericSqliteExecutor {
  run(
    sql,
    params,
  ): Promisable<Pick<QueryResult<any>, 'insertId' | 'numAffectedRows'> & { rows?: any[] }>
}
```

**`buildQueryFn` routing:**

| aspect              | v1.2.1                                              | v2                                              |
| ------------------- | --------------------------------------------------- | ----------------------------------------------- |
| Detection           | `isSelect` boolean only                             | `isReadOrReturningQuery(node, sql)` — AST-aware |
| Write path          | `exec.run('select 1')` for metadata                 | `exec.run(sql, parameters)` with actual SQL     |
| `returning` support | No (v1 `buildQueryFn` ran everything through `all`) | Yes — Kysely AST RETURNING detected             |

```ts
// ❌ v1.2.1 — buildQueryFn sent ALL queries through exec.all
// ✅ v2 — buildQueryFn routes: read/returning → exec.all, write → exec.run
```

If your `run` implementation already executes the SQL and returns metadata from it, **no change needed** — the extra `rows` property is optional. However, v1's `buildQueryFn` called `exec.run('select 1')` (a dummy query that only fetched `last_insert_rowid` and `changes` without executing the real SQL). In v2, `buildQueryFn` calls `exec.run(sql, parameters)` — your `run` implementation must now **execute the actual SQL** and return the resulting metadata.

**`buildQueryFnAlt` routing also enhanced:**

`buildQueryFnAlt` is a simpler alternative that does **not** support Kysely AST `returning` detection. Its detection logic was also broadened:

```ts
// ❌ v1.2.1 — pure boolean routing
return async (isSelect, sql, parameters) =>
  isSelect
    ? { rows: await exec.all(sql, parameters) }
    : { rows: [], ...(await exec.run(sql, parameters)) }

// ✅ v2 — boolean + SQL prefix routing
return async (isSelect, sql, parameters) =>
  isSelect || sql.toLowerCase().startsWith('select')
    ? { rows: await exec.all(sql, parameters) }
    : { rows: [], ...(await exec.run(sql, parameters)) }
```

The `sql.toLowerCase().startsWith('select')` guard catches raw SQL `SELECT` statements that arrive with `isSelect === false`. In practice this is safe — `all` is a superset of `run` — but if your `all` and `run` implementations have materially different side effects, verify that raw SELECTs routed through `all` still work as expected.

---

### Rule 10 — New exports (add to imports)

These were internal or absent in v1.2.1 and are now public:

| Export                   | Import from                    | Purpose                                                |
| ------------------------ | ------------------------------ | ------------------------------------------------------ |
| `access`                 | `kysely-generic-sqlite`        | Resolve `T \| (() => Promisable<T>)` to `Promise<T>`   |
| `isReadOrReturningQuery` | `kysely-generic-sqlite`        | Detect SELECT / PRAGMA / VALUES / WITH / RETURNING     |
| `SqliteExecutorFactory`  | `kysely-generic-sqlite`        | Type for `(options?) => Promisable<T>`                 |
| Worker protocol messages | `kysely-generic-sqlite/worker` | Types and event constants for custom worker transports |

The `access` helper replaces the common v1 pattern:

```ts
// ❌ v1.2.1
const db = typeof config.database === 'function' ? await config.database() : config.database

// ✅ v2
import { access } from 'kysely-generic-sqlite'
const db = await access(config.database)
```

---

### Quick migration checklist

- [ ] `package.json`: bump `kysely` peer to `>=0.29`
- [ ] Remove any `releaseConnection()` calls that expected unlocking behavior
- [ ] If extending `BaseSqliteDriver`: update `init` to accept `(options?)`; do not override `releaseConnection`
- [ ] `IGenericSqlite.query`: change `parameters?` → `parameters` (required); add 4th `node?` parameter
- [ ] `OnCreateConnection` callbacks: add second `options?` parameter
- [ ] Executor factories: accept `options?` parameter (or use `SqliteExecutorFactory<T>`)
- [ ] Worker `onmessage` handlers: update tuple destructuring for `queryId` position
- [ ] Custom worker stream protocol: handle `CancelMsg` and call `return()` on the active iterator
- [ ] Custom `MessageHandleFn`: add 4th data arg
- [ ] Custom `DatabaseConnection.streamQuery`: add `chunkSize?` and `options?` parameters
- [ ] Replace `typeof x === 'function' ? await x() : x` with `await access(x)`
- [ ] If using `buildQueryFn`: ensure `run` handles the real write SQL, not just `'select 1'`
