import type { QueryResult } from 'kysely'

export type Promisable<T> = T | Promise<T>

type RunMsg = [
  type: '0',
  sql: string,
  parameters?: readonly unknown[],
]

type CloseMsg = [type: '1']

export type MainMsg = RunMsg | CloseMsg

export type WorkerMsg =
  | [
    type: '0',
    data: QueryResult<any> | null,
    err: unknown,
  ]
  | [
    type: '1',
    data: null,
    err: unknown,
  ]
