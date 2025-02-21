import type { IGenericSqlite, Promisable } from '../type'
import type { QueryResult } from 'kysely'

export const initEvent = '0'
export const runEvent = '1'
export const closeEvent = '2'
export const dataEvent = '3'
export const endEvent = '4'

export type InitMsg<T extends Record<string, unknown>> = [
  type: typeof initEvent,
  data: T,
]

export type RunMsg = [
  type: typeof runEvent,
  isSelect: boolean,
  sql: string,
  parameters?: readonly unknown[],
]

export type StreamMsg = [
  type: typeof dataEvent,
  isSelect: boolean,
  sql: string,
  parameters?: readonly unknown[],
]

export type CloseMsg = [type: typeof closeEvent]

export type MainToWorkerMsg<T extends Record<string, unknown>> = InitMsg<T> | RunMsg | CloseMsg | StreamMsg

export type WorkerToMainMsg = {
  [K in keyof Events]: [type: `${K}`, data: Events[K], err: unknown]
}[keyof Events]

type Events = {
  0: null
  1: QueryResult<any> | null
  2: null
  3: QueryResult<any>[] | null
  4: null
}

export interface IGenericWorker {
  postMessage: (message: any) => void
  terminate: () => void
}

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

export type HandleMessageFn<T extends IGenericWorker> = (worker: T, cb: (msg: WorkerToMainMsg) => any) => void

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
export type InitFn<
  T extends Record<string, unknown>,
  DB = unknown,
> = (data: T) => Promisable<IGenericSqlite<DB>>

/**
 * Function that handle all message
 */
export type MessageHandleFn<DB = unknown> = (
  exec: IGenericSqlite<DB>,
  type: string,
  data1: unknown,
  data2: unknown,
  data3: unknown
) => Promisable<any>
