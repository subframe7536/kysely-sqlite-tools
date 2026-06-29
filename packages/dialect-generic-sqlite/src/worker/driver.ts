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

      this.worker.postMessage([initEvent, exec.data || ({} as any)] satisfies InitMsg<R>)

      await new Promise<void>((resolve, reject) => {
        this.mitt!.once(initEvent, (_qid, _data, err) => (err ? reject(err) : resolve()))
      })

      this.conn = new GenericSqliteWorkerConnection(this.worker, this.mitt)
      await onCreateConnection?.(this.conn, options)
    })
  }

  async destroy(): Promise<void> {
    if (!this.worker) {
      return
    }
    this.worker.postMessage([closeEvent] satisfies CloseMsg)
    return new Promise<void>((resolve, reject) =>
      this.mitt?.once(closeEvent, (_qid, _data, err) => (err ? reject(err) : resolve())),
    ).finally(() => {
      this.worker?.terminate()
      this.mitt?.off()
      this.mitt = this.worker = undefined
    })
  }
}

class GenericSqliteWorkerConnection implements DatabaseConnection {
  private pendingRuns = new Map<
    string,
    { resolve: (data: any) => void; reject: (err: any) => void }
  >()
  private pendingStreams = new Map<
    string,
    { resolve: (data: any) => void; reject: (err: any) => void }
  >()

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
        this.pendingStreams.delete(queryId)
        state.reject(err)
      } else {
        state.resolve([{ rows: [data] }, false])
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
      this.pendingStreams.delete(queryId)
      if (err) {
        state.reject(err)
      } else {
        state.resolve([undefined, true])
      }
    })
  }

  async *streamQuery<R>(
    { parameters, sql, query, queryId }: CompiledQuery,
    chunkSize?: number,
    options?: AbortableOperationOptions,
  ): AsyncIterableIterator<QueryResult<R>> {
    if (options?.signal?.aborted) {
      return
    }

    this.worker.postMessage([
      dataEvent,
      queryId.queryId,
      SelectQueryNode.is(query),
      sql,
      parameters,
      chunkSize,
    ] satisfies StreamMsg)
    type ResolveData = [data: QueryResult<R> | undefined, done: boolean]
    let done = false
    let rejectFn: (reason?: any) => void

    const onAbort = (): void => rejectFn(new Error('Query aborted'))
    options?.signal?.addEventListener('abort', onAbort, { once: true })

    const streamState: { resolve: (data: any) => void; reject: (err: any) => void } = {
      resolve: undefined!,
      reject: undefined!,
    }
    this.pendingStreams.set(queryId.queryId, streamState)

    try {
      while (!done) {
        const [data, isDone] = await new Promise<ResolveData>((res, rej) => {
          rejectFn = rej
          streamState.resolve = res
          streamState.reject = rej
        })

        if (isDone) {
          done = true
        } else {
          yield data!
        }
      }
    } finally {
      options?.signal?.removeEventListener('abort', onAbort)
      this.pendingStreams.delete(queryId.queryId)
    }
  }

  async executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const { parameters, sql, query, queryId } = compiledQuery
    this.worker.postMessage([
      runEvent,
      queryId.queryId,
      SelectQueryNode.is(query),
      sql,
      parameters,
    ] satisfies RunMsg)

    return new Promise((resolve, reject) => {
      this.pendingRuns.set(queryId.queryId, { resolve, reject })
    })
  }
}
