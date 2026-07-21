# kysely-dialect-tauri

[kysely](https://github.com/kysely-org/kysely) dialect for [`Tauri`](https://tauri.app/), using [official sql plugin](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql)

Currently only supports SQLite

## Install

```shell
bun add kysely kysely-dialect-tauri @tauri-apps/plugin-sql
```

## Usage

```ts
import { appDataDir } from '@tauri-apps/api/path'
import Database from '@tauri-apps/plugin-sql'
import { Kysely } from 'kysely'

const kysely = new Kysely<DB>({
  dialect: new TauriSqliteDialect({
    database: async (prefix) => Database.load(`${prefix}${await appDataDir()}test.db`),
  }),
})
```

You can also pass the `Database.load(...)` promise directly:

```ts
const kysely = new Kysely<DB>({
  dialect: new TauriSqliteDialect({
    database: Database.load('sqlite:test.db'),
  }),
})
```

Raw SQL is conservatively treated as a write unless you classify row-returning statements:

```ts
const kysely = new Kysely<DB>({
  dialect: new TauriSqliteDialect({
    database: Database.load('sqlite:test.db'),
    isQuery: (sql) => sql === 'select 1 as value',
  }),
})
```

Classify any additional row-returning raw statements you rely on, including PRAGMAs or dialect-specific statements.

## Config

```ts
export interface TauriSqliteDialectConfig {
  database: Promisable<TauriSqlDB> | ((prefix: 'sqlite:') => Promisable<TauriSqlDB>)
  isQuery?: IGenericSqliteExecutor['isQuery']
  /**
   * Called once when the first query is executed.
   *
   * This is a Kysely specific feature and does not come from the `better-sqlite3` module.
   */
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}
```
