import type { BaseDB } from '../types'

type SqlValue = number | string | Uint8Array | null
type ParamsObject = Record<string, SqlValue>
type BindParams = SqlValue[] | ParamsObject | null
interface QueryExecResult {
  columns: string[]
  values: SqlValue[][]
}

export interface SqlJSDB extends BaseDB {
  exec: (sql: string, params?: BindParams) => QueryExecResult[]
  getRowsModified: () => number
  prepare: (sql: string, params?: any[]) => Statement
}
interface Statement {
  step: () => boolean
  bind: (values?: any[]) => boolean
  get: () => any[]
  getAsObject: (params?: any[]) => any
  free: () => boolean
}
