import type { Promisable } from '../type'
import type {
  HandleMessageFn,
  IGenericSqliteWorkerExecutor,
  InitFn,
  RestMessageHandleFn,
} from './types'
import { access, createGenericOnMessageCallback } from './utils'

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

export const handleWebWorker: HandleMessageFn<globalThis.Worker>
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
