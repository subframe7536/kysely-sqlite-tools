# Tauri dialect

using [Tauri official sqlite plugin](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql)

### type

```ts
export interface TauriSqlDialectConfig {
  /**
   * The path is relative to `tauri::api::path::BaseDirectory::App`.
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