import type { CommonSqliteExecutor, Promisable } from '../type'
import { EventEmitter } from 'node:events'
import { parentPort } from 'node:worker_threads'
import { createOnMessageCallback } from './utils'

export class NodeEventEmitterWrapper extends EventEmitter {
  override off(eventName?: string | symbol): this {
    return this.removeAllListeners(eventName)
  }
}

export function createNodeOnMessageCallback(init: () => Promisable<CommonSqliteExecutor>) {
  if (!parentPort) {
    throw new Error('Must be run in a worker thread')
  }
  return createOnMessageCallback(init, parentPort.postMessage)
}

export function handleNodeMessage(data: any): any {
  return data
}
