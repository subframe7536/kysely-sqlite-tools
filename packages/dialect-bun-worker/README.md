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
  url: ':memory:',
})
```

### Custom Worker

in `worker.ts`

```ts
import { createOnMessageCallback } from 'kysely-bun-worker'

onmessage = createOnMessageCallback(
  async (db) => {
    db.loadExtension(/* ... */)
  }
)
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
}
```
