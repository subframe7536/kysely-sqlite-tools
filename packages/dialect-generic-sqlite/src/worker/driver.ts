import type {
  AbortableOperationOptions,
  CompiledQuery,
  DatabaseConnection,
  QueryResult,
} from 'kysely'
import { SelectQueryNode } from 'kysely'

import { BaseSqliteDriver } from '../base'
import type { OnCreateConnection, SqliteExecutorFactory } from '../type'

import type {
  CloseMsg,
  IGenericEventEmitter,
  IGenericSqliteWorkerExecutor,
  IGenericWorker,
  InitMsg,
  RunMsg,
  StreamMsg,
} from './types'
import { closeEvent, dataEvent, endEvent, initEvent, runEvent } from './types'

export class GenericSqliteWorkerDriver<
  T extends IGenericWorker,
  R extends Record<string, unknown>,
> extends BaseSqliteDriver {
  private worker?: T
  private mitt?: IGenericEventEmitter
  constructor(
    executor: SqliteExecutorFactory<IGenericSqliteWorkerExecutor<T, R>>,
    onCreateConnection?: OnCreateConnection,
  ) {
    super(async (options) => {
      const exec = await executor(options)
      this.mitt = exec.mitt
      this.worker = exec.worker

      exec.handle(this.worker, ([type, ...msg]) => this.mitt!.emit(type, ...msg))

      const initAck = new Promise<void>((resolve, reject) => {
        this.mitt!.once(initEvent, (_qid, _data, err) => (err ? reject(err) : resolve()))
      })

      this.worker.postMessage([initEvent, exec.data || ({} as any)] satisfies InitMsg<R>)

      await initAck

      this.conn = new GenericSqliteWorkerConnection(this.worker, this.mitt)
      await onCreateConnection?.(this.conn, options)
    })
  }

  async destroy(): Promise<void> {
    if (!this.worker) {
      return
    }
    const closeAck = new Promise<void>((resolve, reject) =>
      this.mitt?.once(closeEvent, (_qid, _data, err) => (err ? reject(err) : resolve())),
    )

    this.worker.postMessage([closeEvent] satisfies CloseMsg)

    return closeAck.finally(() => {
      ;(this.conn as GenericSqliteWorkerConnection)?.close()
      this.worker?.terminate()
      this.mitt?.off()
      this.mitt = this.worker = undefined
    })
  }
}

type PendingRun = { resolve: (data: any) => void; reject: (err: any) => void }
type StreamResult<R> = [data: QueryResult<R> | undefined, done: boolean]
type PendingStream = {
  queue: StreamResult<any>[]
  wait?: PendingRun
  error?: unknown
}

class GenericSqliteWorkerConnection implements DatabaseConnection {
  private pendingRuns = new Map<string, PendingRun>()
  private pendingStreams = new Map<string, PendingStream>()

  constructor(
    readonly worker: IGenericWorker,
    readonly mitt: IGenericEventEmitter,
  ) {
    // Central dispatcher — register once, route by queryId
    this.mitt.on(runEvent, (queryId: string | undefined, data: any, err: unknown) => {
      if (!queryId) {
        return
      }
      const pending = this.pendingRuns.get(queryId)
      if (!pending) {
        return
      }
      this.pendingRuns.delete(queryId)
      if (err) {
        pending.reject(err)
      } else {
        pending.resolve(data)
      }
    })

    this.mitt.on(dataEvent, (queryId: string | undefined, data: any, err: unknown) => {
      if (!queryId) {
        return
      }
      const state = this.pendingStreams.get(queryId)
      if (!state) {
        return
      }
      if (err) {
        this.rejectStream(queryId, state, err)
      } else {
        this.pushStreamResult(queryId, state, [{ rows: [data] }, false])
      }
    })

    this.mitt.on(endEvent, (queryId: string | undefined, _data: any, err: unknown) => {
      if (!queryId) {
        return
      }
      const state = this.pendingStreams.get(queryId)
      if (!state) {
        return
      }
      if (err) {
        this.rejectStream(queryId, state, err)
      } else {
        this.pushStreamResult(queryId, state, [undefined, true])
      }
    })
  }

  close(): void {
    const err = new Error('Connection closed')
    for (const [, pending] of this.pendingRuns) {
      pending.reject(err)
    }
    this.pendingRuns.clear()
    for (const [queryId, state] of this.pendingStreams) {
      this.rejectStream(queryId, state, err)
    }
  }

  async *streamQuery<R>(
    { parameters, sql, query, queryId }: CompiledQuery,
    chunkSize?: number,
    options?: AbortableOperationOptions,
  ): AsyncIterableIterator<QueryResult<R>> {
    if (options?.signal?.aborted) {
      return
    }

    const streamState: PendingStream = { queue: [] }
    this.pendingStreams.set(queryId.queryId, streamState)

    this.worker.postMessage([
      dataEvent,
      queryId.queryId,
      SelectQueryNode.is(query),
      sql,
      parameters,
      chunkSize,
    ] satisfies StreamMsg)

    const onAbort = (): void => {
      this.rejectStream(queryId.queryId, streamState, new Error('Query aborted'))
    }
    options?.signal?.addEventListener('abort', onAbort, { once: true })

    try {
      while (true) {
        const [data, isDone] = await this.nextStreamResult<R>(streamState)

        if (isDone) {
          return
        }
        yield data!
      }
    } finally {
      options?.signal?.removeEventListener('abort', onAbort)
      this.pendingStreams.delete(queryId.queryId)
    }
  }

  async executeQuery<R>(
    compiledQuery: CompiledQuery<unknown>,
    options?: AbortableOperationOptions,
  ): Promise<QueryResult<R>> {
    const { parameters, sql, query, queryId } = compiledQuery
    if (options?.signal?.aborted) {
      throw new Error('Query aborted')
    }

    return new Promise((resolve, reject) => {
      const queryKey = queryId.queryId
      let cleanup: () => void
      const onAbort = (): void => {
        cleanup()
        reject(new Error('Query aborted'))
      }
      cleanup = (): void => {
        this.pendingRuns.delete(queryKey)
        options?.signal?.removeEventListener('abort', onAbort)
      }
      const settle =
        <T>(callback: (value: T) => void) =>
        (value: T): void => {
          cleanup()
          callback(value)
        }

      this.pendingRuns.set(queryKey, {
        resolve: settle(resolve),
        reject: settle(reject),
      })
      options?.signal?.addEventListener('abort', onAbort, { once: true })

      try {
        this.worker.postMessage([
          runEvent,
          queryKey,
          SelectQueryNode.is(query),
          sql,
          parameters,
        ] satisfies RunMsg)
      } catch (error) {
        cleanup()
        reject(error)
      }
    })
  }

  private nextStreamResult<R>(state: PendingStream): Promise<StreamResult<R>> {
    const queued = state.queue.shift()
    if (queued) {
      return Promise.resolve(queued)
    }
    if (state.error) {
      return Promise.reject(state.error)
    }
    return new Promise((resolve, reject) => {
      state.wait = { resolve, reject }
    })
  }

  private pushStreamResult(queryId: string, state: PendingStream, result: StreamResult<any>): void {
    if (state.wait) {
      const { resolve } = state.wait
      state.wait = undefined
      resolve(result)
      return
    }
    state.queue.push(result)
    if (result[1]) {
      this.pendingStreams.delete(queryId)
    }
  }

  private rejectStream(queryId: string, state: PendingStream, err: unknown): void {
    this.pendingStreams.delete(queryId)
    state.queue.length = 0
    state.error = err
    if (state.wait) {
      const { reject } = state.wait
      state.wait = undefined
      reject(err)
    }
  }
}
