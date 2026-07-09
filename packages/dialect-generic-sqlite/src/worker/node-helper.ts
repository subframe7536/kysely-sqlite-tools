import { EventEmitter } from 'node:events'
import type { Worker } from 'node:worker_threads'
import { parentPort } from 'node:worker_threads'

import type { Promisable } from '../type'

import type {
  HandleMessageFn,
  IGenericEventEmitter,
  IGenericSqliteWorkerExecutor,
  InitFn,
  MessageHandleFn,
} from './types'
import { access, createGenericOnMessageCallback } from './utils'

/**
 * Wraps a Node.js `EventEmitter` to conform to {@link IGenericEventEmitter}.
 */
class NodeEventEmitterWrapper extends EventEmitter {
  override off(eventName?: string | symbol): this {
    return this.removeAllListeners(eventName)
  }
}

/**
 * Register the generic message callback on a Node.js worker thread's
 * `parentPort`.
 */
export function createNodeOnMessageCallback<T extends Record<string, unknown>, DB = unknown>(
  init: InitFn<T, DB>,
  rest?: MessageHandleFn<DB>,
): void {
  if (!parentPort) {
    throw new Error('Must run in a worker thread')
  }
  parentPort.on(
    'message',
    createGenericOnMessageCallback<T, DB>(init, (value) => parentPort!.postMessage(value), rest),
  )
}

/**
 * Util for handle node worker message in main thread
 */
/**
 * Wire a Node.js `Worker` message event to the provided callback.
 */
export const handleNodeWorker: HandleMessageFn<Worker> = (worker, cb) => worker.on('message', cb)

/**
 * Util to create node mitt
 */
/**
 * Create a Node.js-compatible event emitter for worker communication.
 */
export function createNodeMitt(): IGenericEventEmitter {
  return new NodeEventEmitterWrapper()
}

/**
 * Configuration for {@link createNodeWorkerExecutor}.
 */
export interface INodeWorkerDialectConfig<T extends Record<string, unknown>> extends Pick<
  IGenericSqliteWorkerExecutor<Worker, T>,
  'data'
> {
  worker: Worker | (() => Promisable<Worker>)
}

/**
 * Create worker executor for node
 * @param config {@link INodeWorkerDialectConfig}
 * @example
 * You can also manually create executor for node worker:
 * ```ts
 * import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
 * import { handleNodeWorker, createNodeMitt } from 'kysely-generic-sqlite/worker-helper-node'
 *
 * const worker = new Worker('./worker.js')
 * const dialect = new GenericSqliteWorkerDialect(
 *   () => {
 *     worker,
 *     mitt: createNodeMitt(),
 *     handle: handleWebWorker,
 *   }),
 * )
 * ```
 */
export function createNodeWorkerExecutor<T extends Record<string, unknown>>(
  config: INodeWorkerDialectConfig<T>,
): () => Promise<IGenericSqliteWorkerExecutor<Worker, T>> {
  const { worker, data } = config
  return async () => ({
    data,
    worker: await access(worker),
    handle: handleNodeWorker,
    mitt: createNodeMitt(),
  })
}
