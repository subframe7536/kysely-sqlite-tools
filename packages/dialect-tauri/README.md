# Tauri dialect

dialect that using [Tauri official sql plugin](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql), support MySQL, PostgreSQL and SQLite

### usage

```ts
import { appDataDir } from '@tauri-apps/api/path'

const kysely = new Kysely<DB>({
  dialect: new TauriSqlDialect({
    database: Database.load(`sqlite:${await appDataDir()}test.db`)
  }),
})
```

### type

```ts
export interface TauriSqlDialectConfig {
  /**
   * Tauri database instance
   */
  database: TauriSqlDB | (() => Promise<TauriSqlDB>)
  /**
   * Called once when the first query is executed.
   *
   * This is a Kysely specific feature and does not come from the `better-sqlite3` module.
   */
  onCreateConnection?: (connection: DatabaseConnection) => Promise<void>
}
```