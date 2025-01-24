# kysely-sqlite-worker

[kysely](https://github.com/kysely-org/kysely) dialect for better-sqlite, execute sql in `node:worker_threads`

the type is also availiable for [`better-sqlite3-multiple-ciphers`](https://github.com/m4heshd/better-sqlite3-multiple-ciphers)

## Install

```shell
pnpm add kysely kysely-sqlite-worker better-sqlite3
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
  async (...args) => {
    const db = defaultCreateDatabaseFn(...args)
    db.loadExtension(/* ... */)
    return db
  },
  ([type, exec, data1, data2, data3]) => {
    if (type === 'export') {
      return exec.db.export()
    }
  }
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
  option?: Options
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}
```

## Notice

the worker script is read from `join(__dirname, 'worker.js')` by default, you can customize the path
