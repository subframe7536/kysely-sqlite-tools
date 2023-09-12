import { Worker } from 'node:worker_threads'
import { join } from 'node:path'
import { EventEmitter } from 'node:events'
import type { DatabaseConnection, Driver, QueryResult } from 'kysely'
import { CompiledQuery } from 'kysely'
import type { MainMsg, WorkerMsg } from './type'
import type { SqliteWorkerDialectConfig } from '.'

export class SqliteWorkerDriver implements Driver {
  private connectionMutex = new ConnectionMutex()
  private connection?: SqliteWorkerConnection
  private config: SqliteWorkerDialectConfig
  private worker?: Worker
  private emit?: EventEmitter

  constructor(config: SqliteWorkerDialectConfig) {
    this.config = Object.freeze({ ...config })
  }

  async init(): Promise<void> {
    const { option, source, onCreateConnection } = this.config
    const src = typeof source === 'function' ? await source() : source
    this.emit = new EventEmitter()
    this.worker = new Worker(
      join(__dirname, 'worker.js'),
      { workerData: { src, option } },
    )
    this.worker.on('message', ({ data, type, err }: WorkerMsg) => {
      this.emit?.emit(type, data, err)
    })
    this.connection = new SqliteWorkerConnection(this.worker, this.emit)

    await onCreateConnection?.(this.connection)
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
    const msg: MainMsg = {
      type: 'close',
    }
    this.worker?.postMessage(msg)
    return new Promise<void>((resolve, reject) => {
      this.emit?.once('close', (_, err) => {
        if (err) {
          reject(err)
        } else {
          this.worker?.terminate()
          this.emit?.removeAllListeners()
          this.emit = undefined
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
export class SqliteWorkerConnection implements DatabaseConnection {
  readonly worker: Worker
  readonly emit?: EventEmitter
  constructor(worker: Worker, emit?: EventEmitter) {
    this.worker = worker
    this.emit = emit
  }

  streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('Sqlite driver doesn\'t support streaming')
  }

  async executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const { parameters, sql } = compiledQuery
    const msg: MainMsg = {
      type: 'exec',
      sql,
      parameters,
    }
    this.worker.postMessage(msg)
    return new Promise((resolve, reject) => {
      if (!this.emit) {
        reject('kysely instance has been destroyed')
      }
      this.emit!.once('exec', (data: QueryResult<any>, err) => {
        (data && !err) ? resolve(data) : reject(err)
      })
    })
  }
}
