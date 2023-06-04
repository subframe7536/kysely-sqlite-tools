import { Worker } from 'node:worker_threads'
import { join } from 'node:path'
import type { DatabaseConnection, Driver, QueryResult } from 'kysely'
import { CompiledQuery } from 'kysely'
import type { SqlData, SqliteWorkerDialectConfig } from './type'

export class SqliteWorkerDriver implements Driver {
  readonly #connectionMutex = new ConnectionMutex()
  #connection?: SqliteWorkerConnection
  #config: SqliteWorkerDialectConfig
  #worker?: Worker

  constructor(config: SqliteWorkerDialectConfig) {
    this.#config = Object.freeze({ ...config })
  }

  async init(): Promise<void> {
    const { option, source, onCreateConnection } = this.#config
    const src = typeof source === 'function' ? await source() : source
    this.#worker = new Worker(
      join(__dirname, 'worker.js'),
      { workerData: { src, option } },
    )
    this.#connection = new SqliteWorkerConnection(this.#worker)
    await onCreateConnection?.(this.#connection)
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    // SQLite only has one single connection. We use a mutex here to wait
    // until the single connection has been released.
    await this.#connectionMutex.lock()
    return this.#connection!
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
    this.#connectionMutex.unlock()
  }

  async destroy(): Promise<void> {
    this.#worker?.postMessage('close')
    return new Promise<void>((resolve) => {
      this.#worker?.once('message', () => {
        this.#worker?.terminate()
        resolve()
      })
    })
  }
}
class ConnectionMutex {
  #promise?: Promise<void>
  #resolve?: () => void

  async lock(): Promise<void> {
    while (this.#promise) {
      await this.#promise
    }

    this.#promise = new Promise((resolve) => {
      this.#resolve = resolve
    })
  }

  unlock(): void {
    const resolve = this.#resolve

    this.#promise = undefined
    this.#resolve = undefined

    resolve?.()
  }
}
export class SqliteWorkerConnection implements DatabaseConnection {
  #worker: Worker
  constructor(worker: Worker) {
    this.#worker = worker
  }

  streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('Sqlite driver doesn\'t support streaming')
  }

  async executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const { parameters, sql } = compiledQuery
    const data: SqlData = { sql, parameters }
    this.#worker.postMessage(data)
    return new Promise((resolve) => {
      this.#worker.once('message', (data) => {
        resolve(data)
      })
    })
  }
}
