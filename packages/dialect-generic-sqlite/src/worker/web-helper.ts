import type { IGenericSqliteExecutor, OnCreateConnection, Promisable } from '../type'
import type { IGenericEventEmitter, IGenericSqliteWorkerDialectConfig } from './type'
import { createGenericOnMessageCallback } from './utils'

export function createWebOnMessageCallback(init: () => Promisable<IGenericSqliteExecutor>) {
  const cb = createGenericOnMessageCallback(init, value => globalThis.postMessage(value))
  globalThis.onmessage = ({ data }) => cb(data)
}

export function createWebWorkerConfig(
  workerOrFn: Worker | (() => Promisable<Worker>),
  mitt: IGenericEventEmitter,
  onCreateConnection?: OnCreateConnection,
): IGenericSqliteWorkerDialectConfig<Worker> {
  return {
    handle: (worker, cb) => worker.onmessage = ({ data }) => cb(data),
    mitt,
    worker: typeof workerOrFn === 'function' ? workerOrFn : () => workerOrFn,
    onCreateConnection,
  }
}
