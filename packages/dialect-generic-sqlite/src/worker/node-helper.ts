import type { Promisable } from '../type'
import type {
  HandleMessageFn,
  IGenericEventEmitter,
  IGenericSqliteWorkerExecutor,
  InitFn,
  RestMessageHandleFn,
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
  rest?: RestMessageHandleFn<DB>,
): void {
  if (!parentPort) {
    throw new Error('Must be run in a worker thread')
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
export const handleNodeWorker: HandleMessageFn<Worker> = (worker, cb) => worker.on('message', cb)

export function createNodeMitt(): IGenericEventEmitter {
  return new NodeEventEmitterWrapper()
}

export interface INodeWorkerDialectConfig<
  T extends Record<string, unknown>,
> extends Pick<IGenericSqliteWorkerExecutor<Worker, T>, 'data'> {
  worker: Worker | (() => Promisable<Worker>)
}

export function createNodeWorkerExecutor<T extends Record<string, unknown>>(
  config: INodeWorkerDialectConfig<T>,
): () => Promisable<IGenericSqliteWorkerExecutor<Worker, T>> {
  const { worker, data } = config
  return async () => ({
    data,
    worker: await access(worker),
    handle: handleNodeWorker,
    mitt: createNodeMitt(),
  })
}
