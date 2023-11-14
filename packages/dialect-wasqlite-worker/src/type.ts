import type { QueryResult } from 'kysely'

export type Promisable<T> = T | Promise<T>

export type RunMsg = {
  type: 'run'
  isSelect: boolean
  sql: string
  parameters?: readonly unknown[]
}

export type InitMsg = {
  type: 'init'
  url: string
  fileName: string
  useOPFS: boolean
}

export type MainMsg =
  | RunMsg
  | { type: 'close' }
  | InitMsg

export type WorkerMsg = {
  [K in keyof Events]: {
    type: K
    data: Events[K]
    err: unknown
  }
}[keyof Events]
type Events = {
  run: QueryResult<any> | null
  init: null
  close: null
}
export type EventWithError = {
  [K in keyof Events]: {
    data: Events[K]
    err: unknown
  }
}
