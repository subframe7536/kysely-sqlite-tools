# Tauri dialect

dialect that using [Tauri official sql plugin](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql), support MySQL, PostgreSQL and SQLite

### usage

```ts
import Database from 'tauri-plugin-sql-api'
import { appDataDir } from '@tauri-apps/api/path'

const kysely = new Kysely<DB>({
  type: 'sqlite',
  dialect: new TauriSqlDialect({
    database: prefix => Database.load(`${prefix}${await appDataDir()}test.db`)
  }),
})
```

### type

```ts
export interface TauriSqlDialectConfig<T extends 'sqlite' | 'mysql' | 'postgres'> {
  database: Promisable<TauriSqlDB> | ((prefix: T extends 'sqlite' ? `${T}:` : `${T}://`) => Promisable<TauriSqlDB>)
  type: T
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}
```