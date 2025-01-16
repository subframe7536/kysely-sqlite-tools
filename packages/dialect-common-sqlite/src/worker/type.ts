import type { QueryResult } from 'kysely'
import type { BaseSqliteDialectConfig } from '../type'

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
  chunkSize?: number,
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

/**
 * For Node.js, use https://github.com/developit/web-worker
 */
export interface CommonWorker {
  onmessage: (ev: any) => void
  postMessage: (message: any) => void
  terminate: () => void
}

export interface CommonEventEmitter {
  emit: (eventName: string, ...args: any[]) => void
  on: (eventName: string, callback: (...value: any[]) => void) => void
  once: (eventName: string, callback: (...value: any[]) => void) => void
  off: (eventName?: string) => void
}

export interface CommonSqliteWorkerDialectConfig extends BaseSqliteDialectConfig {
  worker: CommonWorker
  mitt: CommonEventEmitter
}
