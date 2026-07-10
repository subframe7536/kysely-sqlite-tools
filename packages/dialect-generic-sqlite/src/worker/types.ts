import type { QueryResult } from 'kysely'

import type { IGenericSqlite, Promisable } from '../type'

export const initEvent = '0'
export const runEvent = '1'
export const closeEvent = '2'
export const dataEvent = '3'
export const endEvent = '4'
export const cancelEvent = '5'
export const cancelAckEvent = '6'

export type InitMsg<T extends Record<string, unknown>> = [type: typeof initEvent, data: T]

export type RunMsg = [
  type: typeof runEvent,
  queryId: string,
  isSelect: boolean,
  sql: string,
  parameters: readonly unknown[],
]

export type StreamMsg = [
  type: typeof dataEvent,
  queryId: string,
  isSelect: boolean,
  sql: string,
  parameters: readonly unknown[],
  chunkSize?: number,
]

export type CloseMsg = [type: typeof closeEvent]
export type CancelMsg = [type: typeof cancelEvent, queryId: string]

export type MainToWorkerMsg<T extends Record<string, unknown>> =
  | InitMsg<T>
  | RunMsg
  | CloseMsg
  | StreamMsg
  | CancelMsg

export type WorkerToMainMsg<Row = unknown> = {
  [K in keyof Events<Row>]: [
    type: `${K}`,
    queryId: string | null,
    data: Events<Row>[K],
    err: unknown,
  ]
}[keyof Events<Row>]

type Events<Row> = {
  0: null
  1: QueryResult<any> | null
  2: null
  3: Row | null
  4: null
  5: null
  6: null
}

/** Minimal interface for a worker (web or Node.js). */
export interface IGenericWorker {
  postMessage: (message: any) => void
  terminate: () => void
}

/**
 * Minimal event-emitter interface used to route messages between main thread
 * and worker.
 */
export interface IGenericEventEmitter {
  emit: (eventName: string, ...args: any[]) => void
  on: (eventName: string, callback: (...value: any[]) => void) => void
  once: (eventName: string, callback: (...value: any[]) => void) => void
  /**
   * Clear target or all listeners
   * @param eventName optional event name
   */
  off: (eventName?: string) => void
}

/**
 * Function that wires a worker's message event to a callback.
 */
export type HandleMessageFn<T extends IGenericWorker> = (
  worker: T,
  cb: (msg: WorkerToMainMsg) => any,
) => void

/**
 * Describes everything needed to bootstrap a worker-based SQLite executor.
 */
export interface IGenericSqliteWorkerExecutor<
  W extends IGenericWorker,
  T extends Record<string, unknown>,
> {
  /**
   * Extra data, as parameter in {@link InitFn}
   */
  data?: T
  /**
   * Worker creator
   */
  worker: W
  /**
   * Event emitter that used for dispatch messages from worker
   */
  mitt: IGenericEventEmitter
  /**
   * Convert data in worker message event callback and send to mitt
   */
  handle: HandleMessageFn<W>
}

/**
 * Initialize function for {@link createGenericOnMessageCallback}
 */
/**
 * Callback that initializes a SQLite executor inside a worker.
 */
export type InitFn<T extends Record<string, unknown>, DB = unknown> = (
  data: T,
) => Promisable<IGenericSqlite<DB>>

/**
 * Function that handle all message
 */
/**
 * Optional callback for handling custom worker messages beyond the built-in
 * protocol.
 */
export type MessageHandleFn<DB = unknown> = (
  exec: IGenericSqlite<DB>,
  type: string,
  data1: unknown,
  data2: unknown,
  data3: unknown,
  data4: unknown,
) => Promisable<any>
