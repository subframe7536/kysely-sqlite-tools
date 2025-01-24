import type { BaseDB } from '../types'

export interface NodeWasmDBOptions {
  path: string
  options?: {
    fileMustExist?: boolean
  }
}

type SQLiteValue = number | bigint | string | Uint8Array | null
type JSValue = boolean | SQLiteValue
type BindValues = JSValue | JSValue[] | Record<string, JSValue>
type NormalQueryResult = Record<string, SQLiteValue>
type ExpandedQueryResult = Record<string, NormalQueryResult>
type QueryResult = NormalQueryResult | ExpandedQueryResult
interface RunResult {
  changes: number
  lastInsertRowid: number | bigint
}

interface QueryOptions {
  expand?: boolean
}

export interface NodeWasmDatabase extends BaseDB {
  run: (sql: string, values?: BindValues) => RunResult
  all: (sql: string, values?: BindValues, options?: QueryOptions) => QueryResult[]
  prepare: (sql: string) => Statement
}
export interface Statement {
  iterate: (
    values?: BindValues,
    options?: QueryOptions
  ) => IterableIterator<QueryResult>
  finalize: () => void
}

export interface NodeWasmRunReturn {
  lastInsertRowid: number | bigint
  changes: number
}
