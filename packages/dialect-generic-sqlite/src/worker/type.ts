import type { QueryResult } from 'kysely'
import type { IBaseSqliteDialectConfig, Promisable } from '../type'

export const initEvent = '0'
export const runEvent = '1'
export const closeEvent = '2'
export const dataEvent = '3'
export const endEvent = '4'

type InitMsg = [
  type: typeof initEvent,
  url?: string,
  cache?: boolean,
]

export type RunMsg = [
  type: typeof runEvent,
  isSelect: boolean,
  sql: string,
  parameters?: readonly unknown[],
]

type StreamMsg = [
  type: typeof dataEvent,
  isSelect: boolean,
  sql: string,
  parameters?: readonly unknown[],
]

type CloseMsg = [type: typeof closeEvent]

export type MainToWorkerMsg = InitMsg | RunMsg | CloseMsg | StreamMsg

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
  off: (eventName?: string) => void
}

export interface IGenericSqliteWorkerDialectConfig<T extends IGenericWorker> extends IBaseSqliteDialectConfig {
  mitt: IGenericEventEmitter
  worker: () => Promisable<T>
  /**
   * Convert data in worker `onmessage` callback to {@link WorkerToMainMsg}
   */
  handle: (worker: T, cb: (msg: WorkerToMainMsg) => any) => void
}
