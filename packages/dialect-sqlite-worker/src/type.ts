import type { QueryResult } from 'kysely'

export type Promisable<T> = T | Promise<T>

export type SqlData = {
  sql: string
  parameters?: readonly unknown[]
}

export type MainMsg =
  | {
    type: 'exec'
    sql: string
    parameters?: readonly unknown[]
  }
  | {
    type: 'close'
  }

export type WorkerMsg =
  | {
    type: 'exec'
    data: QueryResult<any> | null
    err: unknown
  }
  | {
    type: 'close'
    data: null
    err: unknown
  }
