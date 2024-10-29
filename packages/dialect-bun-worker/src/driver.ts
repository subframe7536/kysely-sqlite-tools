import type { DatabaseConnection, Driver, QueryResult } from 'kysely'
import type { BunWorkerDialectConfig, EventWithError, MainToWorkerMsg, WorkerToMainMsg } from './type'
import { EventEmitter } from 'node:events'
import { CompiledQuery, SelectQueryNode } from 'kysely'

export class BunWorkerDriver implements Driver {
  private worker?: Worker
  private connection?: DatabaseConnection
  private connectionMutex = new ConnectionMutex()
  private mitt?: EventEmitter<EventWithError>
  constructor(
    private config?: BunWorkerDialectConfig,
  ) { }

  async init(): Promise<void> {
    this.worker = this.config?.worker ?? new Worker(
      new URL('./worker', import.meta.url),
      { type: 'module' },
    )
    this.mitt = new EventEmitter()
    this.worker.onmessage = ({ data: [type, data, err] }: MessageEvent<WorkerToMainMsg>) => {
      this.mitt?.emit(type, data, err)
    }
    this.worker.postMessage([
      0, // init
      this.config?.url,
      this.config?.cacheStatment,
    ] satisfies MainToWorkerMsg)
    await new Promise<void>((resolve, reject) => {
      this.mitt?.once(0/* init */, (_, err) => err ? reject(err) : resolve())
    })
    this.connection = new BunWorkerConnection(this.worker, this.mitt)

    await this.config?.onCreateConnection?.(this.connection)
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    // SQLite only has one single connection. We use a mutex here to wait
    // until the single connection has been released.
    await this.connectionMutex.lock()
    return this.connection!
  }

  async beginTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw('begin'))
  }

  async commitTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw('commit'))
  }

  async rollbackTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw('rollback'))
  }

  async releaseConnection(): Promise<void> {
    this.connectionMutex.unlock()
  }

  async destroy(): Promise<void> {
    if (!this.worker) {
      return
    }
    this.worker.postMessage([2] satisfies MainToWorkerMsg)
    return new Promise<void>((resolve, reject) => {
      this.mitt?.once(2/* close */, (_, err) => {
        if (err) {
          reject(err)
        } else {
          this.worker?.terminate()
          this.mitt?.removeAllListeners()
          this.mitt = undefined
          resolve()
        }
      })
    })
  }
}

class ConnectionMutex {
  private promise?: Promise<void>
  private resolve?: () => void

  async lock(): Promise<void> {
    while (this.promise) {
      await this.promise
    }

    this.promise = new Promise((resolve) => {
      this.resolve = resolve
    })
  }

  unlock(): void {
    const resolve = this.resolve

    this.promise = undefined
    this.resolve = undefined

    resolve?.()
  }
}

class BunWorkerConnection implements DatabaseConnection {
  constructor(
    private worker: Worker,
    private mitt?: EventEmitter<EventWithError>,
  ) { }

  async *streamQuery<R>(compiledQuery: CompiledQuery): AsyncIterableIterator<QueryResult<R>> {
    const { parameters, sql, query } = compiledQuery
    if (!SelectQueryNode.is(query)) {
      throw new Error('WaSqlite dialect only supported SELECT queries')
    }
    this.worker.postMessage([3, sql, parameters] satisfies MainToWorkerMsg)
    let resolver: ((value: IteratorResult<{ rows: QueryResult<R>[] }>) => void) | null = null
    let rejecter: ((reason: any) => void) | null = null

    this.mitt!.on(3, (data, err) => {
      if (err && rejecter) {
        rejecter(err)
      }
      if (resolver) {
        resolver({ value: { rows: data! }, done: false })
        resolver = null
      }
    })

    this.mitt!.on(4, (_, err) => {
      if (err && rejecter) {
        rejecter(err)
      }
      if (resolver) {
        resolver({ value: undefined, done: true })
      }
    })

    return {
      [Symbol.asyncIterator]() {
        return this
      },
      async next() {
        return new Promise<IteratorResult<any>>((resolve, reject) => {
          resolver = resolve
          rejecter = reject
        })
      },
      async return() {
        return { value: undefined, done: true }
      },
    }
  }

  async executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const { parameters, sql, query } = compiledQuery
    const isSelect = SelectQueryNode.is(query)
    this.worker.postMessage([1/* run */, isSelect, sql, parameters] satisfies MainToWorkerMsg)
    return new Promise((resolve, reject) => {
      if (!this.mitt) {
        reject(new Error('kysely instance has been destroyed'))
      }
      this.mitt!.once(1/* run */, (data, err) => (!err && data) ? resolve(data) : reject(err))
    })
  }
}
