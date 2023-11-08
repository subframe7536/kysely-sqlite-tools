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

export interface OfficialWasmDB extends BaseDB {
  changes: (isTotal: boolean, isBigint: boolean) => number | bigint
  selectArray: (sql: string, bind?: any[]) => any[]
  selectObjects: (sql: string, bind?: any[]) => any[]
}
