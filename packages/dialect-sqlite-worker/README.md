# kysely-sqlite-worker

[kysely](https://github.com/kysely-org/kysely) dialect for better-sqlite, execute sql in `node:worker_threads`

the type is also availiable for [`better-sqlite3-multiple-ciphers`](https://github.com/m4heshd/better-sqlite3-multiple-ciphers)

## Install

```shell
bun add kysely kysely-sqlite-worker better-sqlite3
```

## Usage

```ts
import { SqliteWorkerDialect } from 'kysely-sqlite-worker'

const dialect = new SqliteWorkerDialect({
  source: ':memory:',
})
```

### Custom Worker

in `worker.ts`

```ts
import { createOnMessageCallback, defaultCreateDatabaseFn } from 'kysely-sqlite-worker'

createOnMessageCallback(
  (fileName, options) => {
    const db = defaultCreateDatabaseFn(fileName, options)
    db.loadExtension(/* ... */)
    return db
  },
  (executor, { type, payload }) => {
    if (type === 'export') {
      return executor.db.export()
    }
    throw new Error(`Unknown worker request: ${type}`)
  },
)
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
  dbOption?: Options
  workerPath?: string
  onCreateConnection?: (
    connection: DatabaseConnection,
    options?: AbortableOperationOptions,
  ) => Promisable<void>
}
```

Custom worker requests use `connection.request(type, payload)` from the main
thread. They are serialized with SQL execution.

## Notice

The worker script defaults to the packaged worker file for the current runtime format (`worker.mjs` for ESM and `worker.cjs` for CJS), and you can customize the path with `workerPath`.
