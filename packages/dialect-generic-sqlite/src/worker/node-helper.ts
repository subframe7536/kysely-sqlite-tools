import type { Worker } from 'node:worker_threads'
import { parentPort } from 'node:worker_threads'

import type { Promisable } from '../type'

import type {
  HandleWorkerFn,
  IGenericSqliteWorkerExecutor,
  InitFn,
  WorkerRequestHandler,
} from './types'
import { access, createGenericOnMessageCallback } from './utils'

export function createNodeOnMessageCallback<T extends Record<string, unknown>, DB = unknown>(
  init: InitFn<T, DB>,
  custom?: WorkerRequestHandler<DB>,
): void {
  if (!parentPort) {
    throw new Error('Must run in a worker thread')
  }
  parentPort.on(
    'message',
    createGenericOnMessageCallback(init, (value) => parentPort!.postMessage(value), custom),
  )
}

export const handleNodeWorker: HandleWorkerFn<Worker> = (worker, handlers) => {
  const onMessage = handlers.message
  const onError = handlers.error
  const onExit = (code: number): void =>
    handlers.close(code === 0 ? undefined : new Error(`Worker exited with code ${code}`))
  worker.on('message', onMessage)
  worker.on('error', onError)
  worker.on('exit', onExit)
  return () => {
    worker.off('message', onMessage)
    worker.off('error', onError)
    worker.off('exit', onExit)
  }
}

export interface INodeWorkerDialectConfig<T extends Record<string, unknown>> extends Pick<
  IGenericSqliteWorkerExecutor<Worker, T>,
  'data'
> {
  worker: Worker | (() => Promisable<Worker>)
}

export function createNodeWorkerExecutor<T extends Record<string, unknown>>(
  config: INodeWorkerDialectConfig<T>,
): () => Promise<IGenericSqliteWorkerExecutor<Worker, T>> {
  const { worker, data } = config
  return async () => ({ data, worker: await access(worker), handle: handleNodeWorker })
}
