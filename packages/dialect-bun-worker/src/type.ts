import type { QueryResult } from 'kysely'

export type Promisable<T> = T | Promise<T>

export type RunMsg = [
  type: 1,
  isSelect: boolean,
  sql: string,
  parameters?: readonly unknown[],
]

type CloseMsg = [type: 2]

type InitMsg = [
  type: 0,
  url?: string,
  cache?: boolean,
]

export type MainMsg = InitMsg | RunMsg | CloseMsg

export type WorkerMsg = {
  [K in keyof Events]: [ type: K, data: Events[K], err: unknown ]
}[keyof Events]

type Events = {
  0: null
  1: QueryResult<any> | null
  2: null
}

export type EventWithError = {
  [K in keyof Events]: [ data: Events[K], err: unknown ]
}
