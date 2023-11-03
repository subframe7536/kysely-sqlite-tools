import type { QueryResult } from 'kysely'

export type MainMsg =
  | {
    type: 'run'
    isSelect: boolean
    sql: string
    parameters?: readonly unknown[]
  }
  | {
    type: 'close'
  }
  | {
    type: 'init'
    url?: string
    fileName: string
    preferOPFS?: boolean
  }

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
