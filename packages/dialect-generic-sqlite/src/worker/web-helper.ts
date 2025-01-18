import type { Promisable } from '../type'
import type { IGenericSqliteWorkerDialectConfig, IHandleMessage, InitFn } from './type'
import { createGenericOnMessageCallback } from './utils'

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
    'data' | 'mitt' | 'worker'
  > { }

export const handleWebWorker: IHandleMessage<globalThis.Worker> = (worker, cb) => worker.onmessage = ({ data }) => cb(data)

export function createWebWorkerDialectConfig<T extends Record<string, unknown>>(
  config: IWebWorkerDialectConfig<T>,
): () => Promisable<IGenericSqliteWorkerDialectConfig<globalThis.Worker, T>> {
  return () => ({
    ...config,
    handle: handleWebWorker,
  })
}
