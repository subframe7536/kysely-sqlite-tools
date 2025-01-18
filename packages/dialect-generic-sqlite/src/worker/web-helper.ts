import type { Promisable } from '../type'
import type { IGenericSqliteWorkerExecutor, IHandleMessage, InitFn } from './type'
import { access, createGenericOnMessageCallback, type RestMessageHandleFn } from './utils'

export function createWebOnMessageCallback<T extends Record<string, unknown>, DB = unknown>(
  init: InitFn<T, DB>,
  rest?: RestMessageHandleFn<DB>,
): void {
  const cb = createGenericOnMessageCallback<T, DB>(
    init,
    value => globalThis.postMessage(value),
    rest,
  )
  globalThis.onmessage = ({ data }) => cb(data)
}

export interface IWebWorkerDialectConfig<
  T extends Record<string, unknown>,
> extends Pick<IGenericSqliteWorkerExecutor<globalThis.Worker, T>, 'data' | 'mitt'> {
  worker: globalThis.Worker | (() => Promisable<globalThis.Worker>)
}

export const handleWebWorker: IHandleMessage<globalThis.Worker>
  = (worker, cb) => worker.onmessage = ({ data }) => cb(data)

export function createWebWorkerExecutor<T extends Record<string, unknown>>(
  config: IWebWorkerDialectConfig<T>,
): () => Promisable<IGenericSqliteWorkerExecutor<globalThis.Worker, T>> {
  const { worker, ...rest } = config
  return async () => ({
    ...rest,
    worker: await access(worker),
    handle: handleWebWorker,
  })
}
