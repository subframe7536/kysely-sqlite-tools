import type { IGenericSqlite, Promisable } from '../type'

import type {
  InitFn,
  SerializedWorkerError,
  WorkerRequest,
  WorkerRequestHandler,
  WorkerResponse,
} from './types'

export function serializeWorkerError(error: unknown): SerializedWorkerError {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      ...(error.stack ? { stack: error.stack } : {}),
    }
  }
  return { name: 'Error', message: String(error) }
}

export function deserializeWorkerError(error: SerializedWorkerError): Error {
  const result = new Error(error.message)
  result.name = error.name
  if (error.stack) {
    result.stack = error.stack
  }
  return result
}

export function createGenericOnMessageCallback<T extends Record<string, unknown>, DB = unknown>(
  init: InitFn<T, DB>,
  post: (data: WorkerResponse) => void,
  custom?: WorkerRequestHandler<DB>,
): (data: WorkerRequest<T>) => Promise<void> {
  let db: IGenericSqlite<DB> | undefined
  let closing = false
  let queue = Promise.resolve()
  const streams = new Map<string, AsyncIterator<unknown> | Iterator<unknown>>()

  const send = (response: WorkerResponse): void => {
    try {
      post(response)
    } catch {
      // There is no reliable recovery path if the transport cannot post a serializable response.
    }
  }
  const enqueue = (task: () => Promise<void>): Promise<void> => {
    const next = queue.then(task, task)
    queue = next.catch(() => {})
    return next
  }
  const cancel = async (id: string, streamId: string): Promise<void> => {
    const iterator = streams.get(streamId)
    streams.delete(streamId)
    let error: SerializedWorkerError | undefined
    try {
      await iterator?.return?.()
    } catch (cause) {
      error = serializeWorkerError(cause)
    }
    send({ type: 'cancelled', id, ...(error ? { error } : {}) })
  }
  const pull = async (id: string, streamId: string, chunkSize: number): Promise<void> => {
    const iterator = streams.get(streamId)
    if (!iterator) {
      throw new Error(`Unknown stream: ${streamId}`)
    }
    const rows: unknown[] = []
    for (let index = 0; index < chunkSize; index++) {
      const item = await iterator.next()
      if (item.done) {
        streams.delete(streamId)
        send({ type: 'stream', id, rows, done: true })
        return
      }
      rows.push(item.value)
    }
    send({ type: 'stream', id, rows, done: false })
  }

  return async (message) => {
    if (message.type === 'cancel') {
      await cancel(message.id, message.streamId)
      return
    }
    await enqueue(async () => {
      try {
        if (closing && message.type !== 'close') {
          throw new Error('Worker is closing')
        }
        switch (message.type) {
          case 'init':
            db = await init(message.data)
            send({ type: 'ready', id: message.id })
            return
          case 'execute':
            if (!db) {
              throw new Error('Worker is not initialized')
            }
            send({
              type: 'result',
              id: message.id,
              result: await db.query(message.isSelect, message.sql, message.parameters),
            })
            return
          case 'stream':
            if (!db?.iterator) {
              throw new Error('streamQuery() is not supported.')
            }
            if (!Number.isInteger(message.chunkSize) || message.chunkSize <= 0) {
              throw new RangeError('chunkSize must be a positive integer')
            }
            streams.set(
              message.streamId,
              db.iterator(message.isSelect, message.sql, message.parameters, message.chunkSize),
            )
            await pull(message.id, message.streamId, message.chunkSize)
            return
          case 'pull':
            if (!Number.isInteger(message.chunkSize) || message.chunkSize <= 0) {
              throw new RangeError('chunkSize must be a positive integer')
            }
            await pull(message.id, message.streamId, message.chunkSize)
            return
          case 'close':
            closing = true
            await Promise.all(
              [...streams.values()].map(async (iterator) => {
                try {
                  await iterator.return?.()
                } catch {
                  // Closing must continue even when an iterator cleanup fails.
                }
              }),
            )
            streams.clear()
            await db?.close()
            send({ type: 'closed', id: message.id })
            return
          case 'custom':
            if (!db || !custom) {
              throw new Error(`Unknown worker request: ${message.name}`)
            }
            send({
              type: 'custom',
              id: message.id,
              result: await custom(db, { type: message.name, payload: message.payload }),
            })
            break
        }
      } catch (error) {
        send({ type: 'error', id: message.id, error: serializeWorkerError(error) })
      }
    })
  }
}

export async function access<T>(data: T | (() => Promisable<T>)): Promise<T> {
  return typeof data === 'function' ? await (data as any)() : data
}
