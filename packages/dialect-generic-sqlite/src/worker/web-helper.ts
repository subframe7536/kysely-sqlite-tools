import type { Promisable } from '../type'

import type {
  HandleWorkerFn,
  IGenericSqliteWorkerExecutor,
  InitFn,
  WorkerRequestHandler,
} from './types'
import { access, createGenericOnMessageCallback } from './utils'

export function createWebOnMessageCallback<T extends Record<string, unknown>, DB = unknown>(
  init: InitFn<T, DB>,
  custom?: WorkerRequestHandler<DB>,
): void {
  const callback = createGenericOnMessageCallback(
    init,
    (value) => globalThis.postMessage(value),
    custom,
  )
  const onMessage = ({ data }: MessageEvent): void => void callback(data)
  if ('addEventListener' in globalThis) {
    globalThis.addEventListener('message', onMessage)
  } else {
    globalThis.onmessage = onMessage
  }
}

export const handleWebWorker: HandleWorkerFn<globalThis.Worker> = (worker, handlers) => {
  const onMessage = ({ data }: MessageEvent): void => handlers.message(data)
  const onError = (event: ErrorEvent): void =>
    handlers.error(event.error ?? new Error(event.message))
  const onMessageError = (): void =>
    handlers.error(new Error('Worker message could not be deserialized'))
  if (!('addEventListener' in worker)) {
    const legacy = worker as unknown as { onmessage: ((event: MessageEvent) => void) | null }
    legacy.onmessage = onMessage
    return () => {
      legacy.onmessage = null
    }
  }
  worker.addEventListener('message', onMessage)
  worker.addEventListener('error', onError)
  worker.addEventListener('messageerror', onMessageError)
  return () => {
    worker.removeEventListener('message', onMessage)
    worker.removeEventListener('error', onError)
    worker.removeEventListener('messageerror', onMessageError)
  }
}

export interface IWebWorkerDialectConfig<T extends Record<string, unknown>> extends Pick<
  IGenericSqliteWorkerExecutor<globalThis.Worker, T>,
  'data'
> {
  worker: globalThis.Worker | (() => Promisable<globalThis.Worker>)
}

export function createWebWorkerExecutor<T extends Record<string, unknown>>(
  config: IWebWorkerDialectConfig<T>,
): () => Promise<IGenericSqliteWorkerExecutor<globalThis.Worker, T>> {
  const { worker, ...rest } = config
  return async () => ({ ...rest, worker: await access(worker), handle: handleWebWorker })
}
