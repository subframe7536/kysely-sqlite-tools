# kysely-bun-worker

[kysely](https://github.com/kysely-org/kysely) dialect for `bun:sqlite`, run sql in worker

## Install

```shell
bun install kysely kysely-bun-worker
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
