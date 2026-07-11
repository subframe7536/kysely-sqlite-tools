import type { QueryResult } from 'kysely'

import type { IGenericSqlite, Promisable } from '../type'

export interface IGenericWorker {
  postMessage: (message: unknown) => void
  terminate: () => Promisable<unknown>
}

export interface WorkerHandlers {
  message: (message: WorkerResponse) => void
  error: (error: unknown) => void
  close: (error?: unknown) => void
}

export type HandleWorkerFn<T extends IGenericWorker> = (
  worker: T,
  handlers: WorkerHandlers,
) => () => void

export interface IGenericSqliteWorkerExecutor<
  W extends IGenericWorker,
  T extends Record<string, unknown>,
> {
  data?: T
  worker: W
  handle: HandleWorkerFn<W>
}

export interface WorkerRequestHandler<DB = unknown> {
  (executor: IGenericSqlite<DB>, request: { type: string; payload: unknown }): Promisable<unknown>
}

export type InitFn<T extends Record<string, unknown>, DB = unknown> = (
  data: T,
) => Promisable<IGenericSqlite<DB>>

export type WorkerRequest<T extends Record<string, unknown> = Record<string, unknown>> =
  | { type: 'init'; id: string; data: T }
  | { type: 'execute'; id: string; isSelect: boolean; sql: string; parameters: readonly unknown[] }
  | {
      type: 'stream'
      id: string
      streamId: string
      isSelect: boolean
      sql: string
      parameters: readonly unknown[]
      chunkSize: number
    }
  | { type: 'pull'; id: string; streamId: string; chunkSize: number }
  | { type: 'cancel'; id: string; streamId: string }
  | { type: 'close'; id: string }
  | { type: 'custom'; id: string; name: string; payload: unknown }

export type SerializedWorkerError = {
  name: string
  message: string
  stack?: string
}

export type WorkerResponse =
  | { type: 'ready'; id: string }
  | { type: 'result'; id: string; result: QueryResult<unknown> }
  | { type: 'stream'; id: string; rows: unknown[]; done: boolean }
  | { type: 'cancelled'; id: string; error?: SerializedWorkerError }
  | { type: 'closed'; id: string }
  | { type: 'custom'; id: string; result: unknown }
  | { type: 'error'; id: string; error: SerializedWorkerError }
