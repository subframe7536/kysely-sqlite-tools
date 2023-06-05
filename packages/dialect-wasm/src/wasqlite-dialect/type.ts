export type SQLiteCompatibleType = number | string | Uint8Array | Array<number> | bigint | null

export interface WaSqliteDatabase {
  sqlite: Sqlite
  db: number
}
export interface Sqlite {
  str_new: (db: number, sql: string) => number
  str_value: (str: number) => number
  prepare_v2: (db: number, sql: number) => Promise<{ stmt: number; sql: number } | null>
  step: (stmt: number) => Promise<number>
  finalize: (stmt: number) => Promise<number>
  column_names: (stmt: number) => string[]
  row: (stmt: number) => SQLiteCompatibleType[]
  bind_collection: (stmt: number, params: any) => number
  changes: (db: number) => number
  close: (db: number) => Promise<number>
}
