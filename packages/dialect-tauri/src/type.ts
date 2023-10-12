/**
 * https://github.com/tauri-apps/plugins-workspace/blob/dev/plugins/sql/guest-js/index.ts
 */
export interface TauriSqlDB {
  execute(query: string, bindValues?: unknown[]): Promise<QueryResult>
  select<T>(query: string, bindValues?: unknown[]): Promise<T>
  close: () => Promise<boolean>
}
export interface QueryResult {
  rowsAffected: number
  lastInsertId: number
}

export type Promisable<T> = T | Promise<T>
