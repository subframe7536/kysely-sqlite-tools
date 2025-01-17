import type { Promisable } from '../type'
import type { IGenericSqliteWorkerDialectConfig } from './type'
import { createGenericOnMessageCallback, type InitFn } from './utils'

export function createWebOnMessageCallback<T extends Record<string, unknown>>(
  init: InitFn<T>,
): void {
  const cb = createGenericOnMessageCallback<T>(init, value => globalThis.postMessage(value))
  globalThis.onmessage = ({ data }) => cb(data)
}

export interface IWebWorkerDialectConfig<
  T extends Record<string, unknown>,
> extends Pick<
    IGenericSqliteWorkerDialectConfig<globalThis.Worker, T>,
    'data' | 'fileName' | 'mitt' | 'worker' | 'onCreateConnection'
  > { }

export function createWebWorkerDialectConfig<T extends Record<string, unknown>>(
  config: IWebWorkerDialectConfig<T>,
): () => Promisable<IGenericSqliteWorkerDialectConfig<globalThis.Worker, T>> {
  return () => ({
    ...config,
    handle: (worker, cb) => worker.onmessage = ({ data }) => cb(data),
  })
}
