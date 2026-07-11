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
  IGenericSqliteWorkerExecutor,
  IGenericWorker,
  WorkerRequest,
  WorkerResponse,
} from './types'
import { deserializeWorkerError } from './utils'

type Pending = {
  resolve: (response: Exclude<WorkerResponse, { type: 'error' }>) => void
  reject: (error: Error) => void
}
type OutgoingRequest = WorkerRequest extends infer U
  ? U extends { id: string }
    ? Omit<U, 'id'> & { id?: string }
    : never
  : never

export class GenericSqliteWorkerDriver<
  T extends IGenericWorker,
  R extends Record<string, unknown>,
> extends BaseSqliteDriver {
  private worker?: T
  private connection?: GenericSqliteWorkerConnection
  private dispose?: () => void
  private closing?: Promise<void>

  constructor(
    executor: SqliteExecutorFactory<IGenericSqliteWorkerExecutor<T, R>>,
    onCreateConnection?: OnCreateConnection,
  ) {
    super(async (options) => {
      let exec: IGenericSqliteWorkerExecutor<T, R> | undefined
      try {
        exec = await executor(options)
        this.worker = exec.worker
        this.connection = new GenericSqliteWorkerConnection(exec.worker)
        this.dispose = exec.handle(exec.worker, {
          message: (message) => this.connection?.handle(message),
          error: (error) => this.connection?.fail(error),
          close: (error) => this.connection?.fail(error ?? new Error('Worker closed')),
        })
        const ready = await this.connection.send({ type: 'init', data: exec.data ?? ({} as R) })
        if (ready.type !== 'ready') {
          throw new Error('Invalid worker initialization response')
        }
        this.conn = this.connection
        await onCreateConnection?.(this.connection, options)
      } catch (error) {
        this.connection?.fail(error)
        this.dispose?.()
        this.dispose = undefined
        await this.worker?.terminate()
        this.worker = undefined
        this.connection = undefined
        this.conn = undefined
        throw error
      }
    })
  }

  async destroy(): Promise<void> {
    this.closing ??= this.destroyInner()
    return this.closing
  }

  private async destroyInner(): Promise<void> {
    const connection = this.connection
    const worker = this.worker
    try {
      await connection?.close()
    } finally {
      this.dispose?.()
      this.dispose = undefined
      await worker?.terminate()
      this.worker = undefined
      this.connection = undefined
      this.conn = undefined
    }
  }
}

export class GenericSqliteWorkerConnection implements DatabaseConnection {
  private readonly pending = new Map<string, Pending>()
  private readonly streams = new Set<string>()
  private sequence = 0
  private failed?: Error
  private closing?: Promise<void>

  constructor(private readonly worker: IGenericWorker) {}

  handle(response: WorkerResponse): void {
    const pending = this.pending.get(response.id)
    if (!pending) {
      return
    }
    if (response.type === 'error') {
      this.pending.delete(response.id)
      pending.reject(deserializeWorkerError(response.error))
      return
    }
    this.pending.delete(response.id)
    pending.resolve(response)
  }

  fail(error: unknown): void {
    if (this.failed) {
      return
    }
    this.failed = error instanceof Error ? error : new Error(String(error))
    for (const pending of this.pending.values()) {
      pending.reject(this.failed)
    }
    this.pending.clear()
  }

  async executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const { parameters, sql, query } = compiledQuery
    const response = await this.send({
      type: 'execute',
      isSelect: SelectQueryNode.is(query),
      sql,
      parameters,
    })
    if (response.type !== 'result') {
      throw new Error('Invalid execute response')
    }
    return response.result as QueryResult<R>
  }

  async *streamQuery<R>(
    { parameters, sql, query, queryId }: CompiledQuery,
    chunkSize: number,
    _options?: AbortableOperationOptions,
  ): AsyncIterableIterator<QueryResult<R>> {
    if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
      throw new RangeError('chunkSize must be a positive integer')
    }
    const id = queryId.queryId
    this.streams.add(id)
    let done = false
    try {
      let response = await this.send({
        type: 'stream',
        streamId: id,
        isSelect: SelectQueryNode.is(query),
        sql,
        parameters,
        chunkSize,
      })
      while (true) {
        if (response.type !== 'stream') {
          throw new Error('Invalid stream response')
        }
        if (response.rows.length) {
          yield { rows: response.rows as R[] }
        }
        done = response.done
        if (done) {
          return
        }
        response = await this.send({ type: 'pull', streamId: id, chunkSize })
      }
    } finally {
      this.streams.delete(id)
      if (!done && !this.failed) {
        try {
          await this.send({ type: 'cancel', streamId: id })
        } catch {
          // Preserve the original stream error or cancellation reason.
        }
      }
    }
  }

  async request<T = unknown>(type: string, payload?: unknown): Promise<T> {
    const response = await this.send({ type: 'custom', name: type, payload })
    if (response.type !== 'custom') {
      throw new Error('Invalid custom response')
    }
    return response.result as T
  }

  async close(): Promise<void> {
    this.closing ??= this.closeInner()
    return this.closing
  }

  private async closeInner(): Promise<void> {
    await Promise.all(
      [...this.streams].map(async (streamId) => await this.send({ type: 'cancel', streamId })),
    )
    if (this.failed) {
      return
    }
    const response = await this.send({ type: 'close' })
    if (response.type !== 'closed') {
      throw new Error('Invalid close response')
    }
  }

  send(message: OutgoingRequest): Promise<Exclude<WorkerResponse, { type: 'error' }>> {
    if (this.failed) {
      return Promise.reject(this.failed)
    }
    const id = message.id ?? `generic-sqlite-${++this.sequence}`
    const request = { ...message, id } as WorkerRequest
    return new Promise((resolve, reject) => {
      this.pending.set(id, {
        resolve,
        reject,
      })
      try {
        this.worker.postMessage(request)
      } catch (error) {
        this.pending.delete(id)
        this.fail(error)
      }
    })
  }
}
