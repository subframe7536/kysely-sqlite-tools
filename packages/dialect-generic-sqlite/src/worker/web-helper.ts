import type { Promisable } from '../type'
import type {
  HandleMessageFn,
  IGenericSqliteWorkerExecutor,
  InitFn,
  MessageHandleFn,
} from './types'

import { access, createGenericOnMessageCallback } from './utils'

export function createWebOnMessageCallback<T extends Record<string, unknown>, DB = unknown>(
  init: InitFn<T, DB>,
  message?: MessageHandleFn<DB>,
): void {
  const cb = createGenericOnMessageCallback<T, DB>(
    init,
    value => globalThis.postMessage(value),
    message,
  )
  globalThis.onmessage = ({ data }) => cb(data)
}

export interface IWebWorkerDialectConfig<
  T extends Record<string, unknown>,
> extends Pick<IGenericSqliteWorkerExecutor<globalThis.Worker, T>, 'data' | 'mitt'> {
  worker: globalThis.Worker | (() => Promisable<globalThis.Worker>)
}

/**
 * Util for handle web worker message in main thread
 */
export const handleWebWorker: HandleMessageFn<globalThis.Worker>
  = (worker, cb) => worker.onmessage = ({ data }) => cb(data)

/**
 * Create worker executor for web
 * @param config {@link IWebWorkerDialectConfig}
 * @example
 * You can also manually create executor for web worker:
 * ```ts
 * import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
 * import { handleWebWorker } from 'kysely-generic-sqlite/worker-helper-web'
 * import { mitt } from 'zen-mitt'
 *
 * const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })
 * const dialect = new GenericSqliteWorkerDialect(
 *   () => {
 *     worker,
 *     mitt: mitt(),
 *     handle: handleWebWorker,
 *   }),
 * )
 * ```
 */
export function createWebWorkerExecutor<T extends Record<string, unknown>>(
  config: IWebWorkerDialectConfig<T>,
): () => Promise<IGenericSqliteWorkerExecutor<globalThis.Worker, T>> {
  const { worker, ...rest } = config
  return async () => ({
    ...rest,
    worker: await access(worker),
    handle: handleWebWorker,
  })
}
