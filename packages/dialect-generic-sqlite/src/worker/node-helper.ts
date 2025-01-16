import type { IGenericSqliteExecutor, OnCreateConnection, Promisable } from '../type'
import type { IGenericSqliteWorkerDialectConfig } from './type'
import { EventEmitter } from 'node:events'
import { parentPort, type Worker } from 'node:worker_threads'
import { createGenericOnMessageCallback } from './utils'

class NodeEventEmitterWrapper extends EventEmitter {
  override off(eventName?: string | symbol): this {
    return this.removeAllListeners(eventName)
  }
}

export function createNodeOnMessageCallback(init: () => Promisable<IGenericSqliteExecutor>) {
  if (!parentPort) {
    throw new Error('Must be run in a worker thread')
  }
  return parentPort.on(
    'message',
    createGenericOnMessageCallback(init, value => parentPort!.postMessage(value)),
  )
}

export function createNodeWorkerConfig(
  workerOrFn: Worker | (() => Promisable<Worker>),
  onCreateConnection?: OnCreateConnection,
): IGenericSqliteWorkerDialectConfig<Worker> {
  return {
    handle: (worker, cb) => worker.on('message', cb),
    mitt: new NodeEventEmitterWrapper(),
    worker: typeof workerOrFn === 'function' ? workerOrFn : () => workerOrFn,
    onCreateConnection,
  }
}
