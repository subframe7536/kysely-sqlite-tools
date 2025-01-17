import type { Promisable } from '../type'
import type { IGenericEventEmitter, IGenericSqliteWorkerDialectConfig, IHandleMessage, InitFn } from './type'
import { EventEmitter } from 'node:events'
import { parentPort, type Worker } from 'node:worker_threads'
import { createGenericOnMessageCallback } from './utils'

class NodeEventEmitterWrapper extends EventEmitter {
  override off(eventName?: string | symbol): this {
    return this.removeAllListeners(eventName)
  }
}

export function createNodeOnMessageCallback<T extends Record<string, unknown>>(
  init: InitFn<T>,
): void {
  if (!parentPort) {
    throw new Error('Must be run in a worker thread')
  }
  parentPort.on(
    'message',
    createGenericOnMessageCallback<T>(init, value => parentPort!.postMessage(value)),
  )
}
export const handleNodeWorker: IHandleMessage<Worker> = (worker, cb) => worker.on('message', cb)

export function createNodeMitt(): IGenericEventEmitter {
  return new NodeEventEmitterWrapper()
}

export interface INodeWorkerDialectConfig<
  T extends Record<string, unknown>,
> extends Pick<
    IGenericSqliteWorkerDialectConfig<Worker, T>,
    'data' | 'fileName' | 'worker' | 'onCreateConnection'
  > { }

export function createNodeWorkerDialectConfig<T extends Record<string, unknown>>(
  config: INodeWorkerDialectConfig<T>,
): () => Promisable<IGenericSqliteWorkerDialectConfig<Worker, T>> {
  return async () => ({
    ...config,
    handle: handleNodeWorker,
    mitt: createNodeMitt(),
  })
}
