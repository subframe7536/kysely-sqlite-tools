# kysely-bun-worker

[kysely](https://github.com/kysely-org/kysely) dialect for `bun:sqlite`, run sql in worker

From `v0.7.0`, this dialect requires `Bun@^1.1.14`

## Install

```shell
bun install kysely kysely-bun-worker
```

## Usage

```ts
import { BunWorkerDialect } from 'kysely-bun-worker'

const dialect = new BunWorkerDialect({
  // default
  url: ':memory:',
})
```

### Custom Worker

in `worker.ts`

```ts
import { createOnMessageCallback, defaultCreateDatabaseFn } from 'kysely-bun-worker'

createOnMessageCallback((fileName, options) => {
  const db = defaultCreateDatabaseFn(fileName, options)
  db.loadExtension(/* ... */)
  return db
})
```

When passing a custom worker, prefer a factory if initialization may be retried:

```ts
const dialect = new BunWorkerDialect({
  worker: () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
})
```

A worker instance is still supported, but it cannot be recreated after the driver terminates it during failed initialization.

### Normal Dialect

Use `BunSqliteDialect` to run SQL on the main thread.

```ts
import { BunSqliteDialect } from 'kysely-bun-worker/normal'

const dialect = new BunSqliteDialect({
  // default
  url: ':memory:',
})
```

## Config

```ts
export type BunWorkerDialectConfig = {
  /**
   * db file path
   *
   * @default ':memory:'
   */
  url?: string
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
  /**
   * use bun:sqlite's built-in statement cache
   * @see https://bun.sh/docs/api/sqlite#query
   */
  cacheStatement?: boolean
  /**
   * Custom worker instance or factory.
   *
   * A worker instance cannot be recreated after a failed initialization because
   * the driver terminates failed workers. Use a factory when retryable custom
   * worker initialization is required.
   */
  worker?: Worker | (() => Worker)
  /**
   * DB constructor options
   * @default { create: true }
   */
  dbOptions?: ConstructorParameters<typeof Database>[1]
}
```
