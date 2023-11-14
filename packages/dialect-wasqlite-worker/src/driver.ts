import type { DatabaseConnection, Driver, QueryResult } from 'kysely'
import { CompiledQuery, SelectQueryNode } from 'kysely'
import type { Emitter } from 'zen-mitt'
import { mitt } from 'zen-mitt'
import { isModuleWorkerSupport, isOpfsSupported } from '@subframe7536/sqlite-wasm'
import type { EventWithError, MainMsg, WorkerMsg } from './type'
import { defaultWasmURL, defaultWorker, parseObject } from './utils'
import type { WaSqliteWorkerDialectConfig } from '.'

export class WaSqliteWorkerDriver implements Driver {
  private config: WaSqliteWorkerDialectConfig
  private worker?: Worker
  private connection?: DatabaseConnection
  private connectionMutex = new ConnectionMutex()
  private mitt?: Emitter<EventWithError>
  constructor(config: WaSqliteWorkerDialectConfig) {
    this.config = config
  }

  async init(): Promise<void> {
    const useOPFS = (this.config.preferOPFS ?? true) ? await isOpfsSupported() : false
    this.worker = parseObject(this.config.worker || defaultWorker, useOPFS || isModuleWorkerSupport())
    this.mitt = mitt<EventWithError>()
    this.worker.onmessage = ({ data: { type, ...msg } }: MessageEvent<WorkerMsg>) => {
      this.mitt?.emit(type, msg)
    }
    this.worker.postMessage({
      type: 'init',
      fileName: this.config.fileName,
      // if use OPFS, wasm should use sync version
      url: parseObject(this.config.url || defaultWasmURL, !useOPFS),
      useOPFS,
    } satisfies MainMsg)
    await new Promise<void>((resolve, reject) => {
      this.mitt?.once('init', ({ err }) => {
        err ? reject(err) : resolve()
      })
    })
    this.connection = new WaSqliteWorkerConnection(this.worker, this.mitt)

    await this.config.onCreateConnection?.(this.connection)
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
          this.mitt?.off()
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

class WaSqliteWorkerConnection implements DatabaseConnection {
  readonly worker: Worker
  readonly mitt?: Emitter<EventWithError>
  constructor(worker: Worker, mitt?: Emitter<EventWithError>) {
    this.worker = worker
    this.mitt = mitt
  }

  streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('SQLite driver doesn\'t support streaming')
  }

  async executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const { parameters, sql, query } = compiledQuery
    const isSelect = SelectQueryNode.is(query)
    this.worker.postMessage({ type: 'run', isSelect, sql, parameters } satisfies MainMsg)
    return new Promise((resolve, reject) => {
      !this.mitt && reject('kysely instance has been destroyed')

      this.mitt!.once('run', ({ data, err }) => {
        (!err && data) ? resolve(data) : reject(err)
      })
    })
  }
}
