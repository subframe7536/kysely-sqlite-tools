# kysely-dialect-tauri

[kysely](https://github.com/kysely-org/kysely) dialect for [`Tauri`](https://tauri.app/) with SQLite, using [official sql plugin](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql)

## Install

```shell
pnpm add kysely kysely-dialect-tauri @tauri-apps/plugin-sql
```

## Usage

```ts
import { appDataDir } from '@tauri-apps/api/path'
import Database from '@tauri-apps/plugin-sql'
import { Kysely } from 'kysely'

const kysely = new Kysely<DB>({
  dialect: new TauriSqlDialect({
    database: prefix => Database.load(`${prefix}${await appDataDir()}test.db`)
  }),
})
```

## Config

```ts
export interface TauriSqliteDialectConfig {
  database: Promisable<TauriSqlDB> | ((prefix: 'sqlite:') => Promisable<TauriSqlDB>)
  /**
   * Called once when the first query is executed.
   *
   * This is a Kysely specific feature and does not come from the `better-sqlite3` module.
   */
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}
```
