import type { BaseDB } from '../baseDriver'

export type Option = {
  sql: string | string[]
  bind?: any[] | Record<string, any>
  returnValue?: 'resultRows' | 'saveSql' | 'this'
  resultRows?: any[]
  saveSql?: any[]
  columnNames?: string[]
  callback?: (row: any[], stmt: any) => void | false
  rowMode?: 'array' | 'object' | 'stmt'
}

export interface OfficialSqliteWasmDB extends BaseDB {
  exec: (option: Option) => void
  changes: (isTotal: boolean, isBigint: boolean) => number | bigint
}
