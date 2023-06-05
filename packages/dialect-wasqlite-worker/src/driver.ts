import type { DatabaseConnection, Driver, QueryResult } from 'kysely'
import { CompiledQuery } from 'kysely'
import Mitt from 'mitt'
import type { Events, ExecType, MainMsg, WorkerMsg } from './type'
import type { WaSqliteWorkerDialectConfig } from '.'

const mitt = Mitt<Events>()
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
      const { type, data } = ev.data
      switch (type) {
        case 'close':
          mitt.emit('close', data)
          break
        case 'query':
          mitt.emit('query', data)
          break
        case 'exec':
          mitt.emit('exec', data)
          break
        case 'init':
          mitt.emit('init', data)
          break
        case 'error':
          throw data
      }
    }
    const msg: MainMsg = {
      type: 'init',
      dbName: this.#config.dbName,
      url: this.#config.url,
    }
    this.#worker.postMessage(msg)
  }

  async init(): Promise<void> {
    await new Promise<void>((resolve) => {
      mitt.on('init', () => {
        mitt.off('init')
        resolve()
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
    return new Promise<void>((resolve) => {
      mitt.on('close', () => {
        this.#worker.terminate()
        this.#worker = null as any
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

class WaSqliteWorkerConnection implements DatabaseConnection {
  #worker: Worker
  constructor(worker: Worker) {
    this.#worker = worker
  }

  query(sql: string, param?: any[] | undefined) {
    const msg: MainMsg = {
      type: 'query',
      sql,
      param,
    }
    this.#worker.postMessage(msg)
    return new Promise<any[]>((resolve) => {
      mitt.on('query', (data: any[]) => {
        mitt.off('query')
        resolve(data)
      })
    })
  }

  exec(sql: string, param?: any[] | undefined): { numAffectedRows: bigint; insertId: any } | Promise<{ numAffectedRows: bigint; insertId: any }> {
    const msg: MainMsg = {
      type: 'exec',
      sql,
      param,
    }
    this.#worker.postMessage(msg)
    return new Promise<ExecType>((resolve) => {
      mitt.on('exec', (data: ExecType) => {
        mitt.off('exec')
        resolve(data)
      })
    })
  }

  streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('Sqlite driver doesn\'t support streaming')
  }

  async executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const { parameters, sql, query } = compiledQuery
    return Promise.resolve((query.kind === 'SelectQueryNode' || query.kind === 'RawNode')
      ? {
          rows: await this.query(sql, parameters as any[]),
        }
      : {
          rows: [],
          ...await this.exec(sql, parameters as any[]),
        },
    )
  }
}
