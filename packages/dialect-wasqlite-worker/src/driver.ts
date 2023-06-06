import type { DatabaseConnection, Driver, QueryResult } from 'kysely'
import { CompiledQuery } from 'kysely'
import Mitt from 'mitt'
import type { EventWithError, MainMsg, WorkerMsg } from './type'
import type { WaSqliteWorkerDialectConfig } from '.'

const mitt = Mitt<EventWithError>()
export class WaSqliteWorkerDriver implements Driver {
  #config: WaSqliteWorkerDialectConfig
  #worker: Worker
  connection?: DatabaseConnection
  #connectionMutex = new ConnectionMutex()
  constructor(config: WaSqliteWorkerDialectConfig) {
    this.#config = config
    this.#worker = this.#config.worker
      ?? new Worker(new URL('./worker', import.meta.url), { type: 'module' })
    this.#worker.onmessage = (ev: MessageEvent<WorkerMsg>) => {
      const { type, msg } = ev.data
      mitt.emit(type, msg)
    }
    const msg: MainMsg = {
      type: 'init',
      dbName: this.#config.dbName,
      url: this.#config.url,
    }
    this.#worker.postMessage(msg)
  }

  async init(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      mitt.on('init', (msg) => {
        mitt.off('init')
        const { err } = msg
        err ? reject(err) : resolve()
      })
    })
    this.connection = new WaSqliteWorkerConnection(this.#worker)
    if (this.#config.onCreateConnection) {
      await this.#config.onCreateConnection(this.connection)
    }
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    // SQLite only has one single connection. We use a mutex here to wait
    // until the single connection has been released.
    await this.#connectionMutex.lock()
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
    this.#connectionMutex.unlock()
  }

  async destroy(): Promise<void> {
    if (!this.#worker) {
      return
    }
    this.#worker.postMessage({
      type: 'close',
    })
    return new Promise<void>((resolve, reject) => {
      mitt.on('close', (msg) => {
        mitt.off('close')
        const { err } = msg
        if (err) {
          reject(err)
        } else {
          this.#worker.terminate()
          this.#worker = null as any
          resolve()
        }
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

class WaSqliteWorkerConnection implements DatabaseConnection {
  #worker: Worker
  constructor(worker: Worker) {
    this.#worker = worker
  }

  streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('Sqlite driver doesn\'t support streaming')
  }

  async executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const { parameters, sql, query } = compiledQuery
    const isQuery = ['SelectQueryNode', 'RawNode'].includes(query.kind)
    const msg: MainMsg = { type: 'run', isQuery, sql, parameters }
    this.#worker.postMessage(msg)
    return new Promise((resolve, reject) => {
      mitt.on('run', (msg) => {
        mitt.off('run')
        const { data, err } = msg
        if (!err && data) {
          resolve(data)
        } else {
          reject(err)
        }
      })
    })
  }
}
