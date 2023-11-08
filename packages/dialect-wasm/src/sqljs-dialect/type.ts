import type { BaseDB } from '../baseDriver'

export interface SqlJSDB extends BaseDB {
  export(): Uint8Array
  getRowsModified(): number | bigint
  prepare(sql: string, params?: any[]): Statement
}
interface Statement {
  step(): boolean
  bind(values?: any[]): boolean
  get(): any[]
  getAsObject(params?: any[]): any
  free(): boolean
}
