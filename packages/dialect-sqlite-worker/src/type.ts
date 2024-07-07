import type { Options } from 'better-sqlite3'
import type { DatabaseConnection, QueryResult } from 'kysely'

export type Promisable<T> = T | Promise<T>

export type SqliteWorkerDialectConfig = {
  /**
   * db file path or existing buffer
   */
  source: string | Buffer | (() => Promisable<string | Buffer>)
  /**
   * better-sqlite3 initiate option
   */
  dbOption?: Options
  /**
   * db worker path
   * @default join(__dirname, 'worker.js')
   */
  workerPath?: string
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}

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
