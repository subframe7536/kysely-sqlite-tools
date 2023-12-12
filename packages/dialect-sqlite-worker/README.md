# kysely-sqlite-worker

[kysely](https://github.com/kysely-org/kysely) dialect for better-sqlite, execute sql in `node:worker_threads`

the type is also availiable for [`better-sqlite3-multiple-ciphers`](https://github.com/m4heshd/better-sqlite3-multiple-ciphers)

## Install

```shell
pnpm add kysely kysely-sqlite-worker better-sqlite3
```

## Config

```ts
export type SqliteWorkerDialectConfig = {
  /**
   * db file path or existing buffer
   */
  source: string | Buffer | (() => Promisable<string | Buffer>)
  /**
   * better-sqlite3 initiate option
   */
  option?: Options
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}
```

## Notice

the worker script is read from `join(__dirname, 'worker.js')`, please make sure it exists
