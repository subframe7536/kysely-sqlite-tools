/**
 * https://github.com/tauri-apps/plugins-workspace/blob/dev/plugins/sql/guest-js/index.ts
 */
export interface TauriSqlDB {
  execute: (query: string, bindValues?: readonly unknown[]) => Promise<QueryResult>
  select: <T>(query: string, bindValues?: readonly unknown[]) => Promise<T>
  close: () => Promise<boolean>
}
export interface QueryResult {
  rowsAffected: number
  lastInsertId: number
}

export type Promisable<T> = T | Promise<T>
