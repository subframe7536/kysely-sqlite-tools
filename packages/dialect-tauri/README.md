# Tauri dialect

[kysely](https://github.com/kysely-org/kysely) dialect for [`Tauri`](https://tauri.app/), using [official sql plugin](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql), support MySQL, PostgreSQL and SQLite

## install

```shell
pnpm add kysely kysely-dialect-tauri @tauri-apps/plugin-sql
```

## usage

```ts
import { Kysely } from 'kysely'
import Database from '@tauri-apps/plugin-sql'
import { appDataDir } from '@tauri-apps/api/path'

const kysely = new Kysely<DB>({
  dialect: new TauriSqlDialect({
    type: 'sqlite',
    database: prefix => Database.load(`${prefix}${await appDataDir()}test.db`)
  }),
})
```

## config

```ts
export interface TauriSqlDialectConfig<T extends 'sqlite' | 'mysql' | 'postgres'> {
  database: Promisable<TauriSqlDB> | ((prefix: T extends 'sqlite' ? `${T}:` : `${T}://`) => Promisable<TauriSqlDB>)
  type: T
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}
```

### known issue

- no RETURNING support
- only return rows when executing raw sql