import type { BaseDB } from '../baseDriver'

export interface SqlJSDB extends BaseDB {
  export(): Uint8Array
  getRowsModified(): number | bigint
  exec(arg0: string): unknown
  run(sql: string, params?: any[]): unknown
  prepare(sql: string, params?: any[]): Statement
}
interface Statement {
  step(): boolean
  bind(values?: any[]): boolean
  getAsObject(params?: any[]): any
  free(): boolean
}
