import type { Promisable } from '../type'
import type {
  HandleMessageFn,
  IGenericEventEmitter,
  IGenericSqliteWorker,
  InitFn,
  MessageHandleFn,
} from './types'
import { EventEmitter } from 'node:events'
import { parentPort, type Worker } from 'node:worker_threads'
import { access, createGenericOnMessageCallback } from './utils'

class NodeEventEmitterWrapper extends EventEmitter {
  override off(eventName?: string | symbol): this {
    return this.removeAllListeners(eventName)
  }
}

export function createNodeOnMessageCallback<T extends Record<string, unknown>, DB = unknown>(
  init: InitFn<T, DB>,
  rest?: MessageHandleFn<DB>,
): void {
  if (!parentPort) {
    throw new Error('Must run in a worker thread')
  }
  parentPort.on(
    'message',
    createGenericOnMessageCallback<T, DB>(
      init,
      value => parentPort!.postMessage(value),
      rest,
    ),
  )
}

/**
 * Util for handle node worker message in main thread
 */
export const handleNodeWorker: HandleMessageFn<Worker> = (worker, cb) => worker.on('message', cb)

/**
 * Util to create node mitt
 */
export function createNodeMitt(): IGenericEventEmitter {
  return new NodeEventEmitterWrapper()
}

export interface INodeWorkerDialectConfig<
  T extends Record<string, unknown>,
> extends Pick<IGenericSqliteWorker<Worker, T>, 'data'> {
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
): () => Promise<IGenericSqliteWorker<Worker, T>> {
  const { worker, data } = config
  return async () => ({
    data,
    worker: await access(worker),
    handle: handleNodeWorker,
    mitt: createNodeMitt(),
  })
}
