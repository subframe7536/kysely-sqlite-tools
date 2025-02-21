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

createOnMessageCallback(
  async (...args) => {
    const db = defaultCreateDatabaseFn(...args)
    db.loadExtension(/* ... */)
    return db
  }
)
```

### Normal Dialect

In v1.1.0, you can use `BunSqliteDialect` to run SQLs in main thread

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
   * use bun:sqlite's built-in statment cache
   * @see https://bun.sh/docs/api/sqlite#query
   */
  cacheStatment?: boolean
  /**
   * custom worker, default is a worker that use bun:sqlite
   */
  worker?: Worker
  /**
   * DB constructor options
   * @default { create: true }
   */
  dbOptions?: ConstructorParameters<typeof Database>[1]
}
```
