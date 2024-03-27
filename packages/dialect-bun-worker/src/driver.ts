import { EventEmitter } from 'node:events'
import type { DatabaseConnection, Driver, QueryResult } from 'kysely'
import { CompiledQuery, SelectQueryNode } from 'kysely'
import type { EventWithError, MainMsg, WorkerMsg } from './type'
import type { BunWorkerDialectConfig } from '.'

export class BunWorkerDriver implements Driver {
  private config?: BunWorkerDialectConfig
  private worker?: Worker
  private connection?: DatabaseConnection
  private connectionMutex = new ConnectionMutex()
  private mitt?: EventEmitter<EventWithError>
  constructor(config?: BunWorkerDialectConfig) {
    this.config = config
  }

  async init(): Promise<void> {
    this.worker = this.config?.worker ?? new Worker(
      new URL('./worker', import.meta.url),
      { type: 'module' },
    )
    this.mitt = new EventEmitter()
    this.worker.onmessage = ({ data: { data, err, type } }: MessageEvent<WorkerMsg>) => {
      this.mitt?.emit(type, { data, err })
    }
    this.worker.postMessage({
      type: 'init',
      url: this.config?.url,
      cache: this.config?.cacheStatment,
    } satisfies MainMsg)
    await new Promise<void>((resolve, reject) => {
      this.mitt?.once('init', ({ err }) => {
        err ? reject(err) : resolve()
      })
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
    this.worker.postMessage({ type: 'close' } satisfies MainMsg)
    return new Promise<void>((resolve, reject) => {
      this.mitt?.once('close', ({ err }) => {
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

  streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('Bun:sqlite-worker driver doesn\'t support streaming')
  }

  async executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const { parameters, sql, query } = compiledQuery
    const isSelect = SelectQueryNode.is(query)
    this.worker.postMessage({ type: 'run', isSelect, sql, parameters } satisfies MainMsg)
    return new Promise((resolve, reject) => {
      if (!this.mitt) {
        reject(new Error('kysely instance has been destroyed'))
      }
      this.mitt!.once('run', ({ data, err }) => {
        (!err && data) ? resolve(data) : reject(err)
      })
    })
  }
}
