import type { DatabaseConnection, QueryResult } from 'kysely'

export type Promisable<T> = T | Promise<T>

export type BunWorkerDialectConfig = {
  /**
   * db file path
   *
   * @default ':memory:'
   */
  url?: string
  /**
   * use `bun:sqlite` built-in statment cache
   * @see https://bun.sh/docs/api/sqlite#query
   */
  cacheStatment?: boolean
  /**
   * custom worker, default is a worker that use bun:sqlite
   */
  worker?: Worker
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}

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

type StreamMsg = [
  type: 3,
  sql: string,
  parameters?: readonly unknown[],
]

export type MainToWorkerMsg = InitMsg | RunMsg | CloseMsg | StreamMsg

export type WorkerToMainMsg = {
  [K in keyof Events]: [ type: K, data: Events[K], err: unknown ]
}[keyof Events]

type Events = {
  0: null
  1: QueryResult<any> | null
  2: null
  3: QueryResult<any>[] | null
  4: null
}

export type EventWithError = {
  [K in keyof Events]: [ data: Events[K], err: unknown ]
}
