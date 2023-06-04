import type { Buffer } from 'node:buffer'
import type { DatabaseConnection } from 'kysely'
import type { Options } from 'better-sqlite3'

export type SqlData = {
  sql: string
  parameters?: readonly unknown[]
}

export type WorkerMsg = SqlData | 'close'

export type SqliteWorkerDialectConfig = {
  source: string | Buffer | (() => Promise<string | Buffer>)
  option?: Options
  onCreateConnection?: (connection: DatabaseConnection) => Promise<void>
}
