import type { DatabaseConnection, Driver, QueryResult } from 'kysely'
import { CompiledQuery, SelectQueryNode } from 'kysely'
import type { Emitter } from 'zen-mitt'
import { mitt } from 'zen-mitt'
import { isModuleWorkerSupport, isOpfsSupported } from '@subframe7536/sqlite-wasm'
import type { EventWithError, MainMsg, WaSqliteWorkerDialectConfig, WorkerMsg } from './type'
import { defaultWasmURL, defaultWorker, parseWorkerOrURL } from './utils'

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
    // try to persist storage, https://web.dev/articles/persistent-storage#request_persistent_storage
    try {
      if (!await navigator.storage.persisted()) {
        await navigator.storage.persist()
      }
    } catch { }

    const useOPFS = (this.config.preferOPFS ?? true) ? await isOpfsSupported() : false

    this.mitt = mitt<EventWithError>()

    this.worker = parseWorkerOrURL(this.config.worker || defaultWorker, useOPFS || isModuleWorkerSupport())

    this.worker.onmessage = ({ data: [type, ...msg] }: MessageEvent<WorkerMsg>) => {
      this.mitt?.emit(type, ...msg)
    }
    this.worker.postMessage([
      0,
      this.config.fileName,
      // if use OPFS, wasm should use sync version
      parseWorkerOrURL(this.config.url ?? defaultWasmURL, !useOPFS) as string,
      useOPFS,
    ] satisfies MainMsg)
    await new Promise<void>((resolve, reject) => {
      this.mitt?.once(0, (_, err) => err ? reject(err) : resolve())
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
    this.worker.postMessage([2] satisfies MainMsg)
    return new Promise<void>((resolve, reject) => {
      this.mitt?.once(2, (_, err) => {
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

  streamQuery<R>(compiledQuery: CompiledQuery): AsyncIterableIterator<QueryResult<R>> {
    const { parameters, sql, query } = compiledQuery
    if (!SelectQueryNode.is(query)) {
      throw new Error('WaSqlite dialect only supported SELECT queries')
    }
    this.worker.postMessage([3, sql, parameters] satisfies MainMsg)
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
    this.worker.postMessage([1, isSelect, sql, parameters] satisfies MainMsg)
    return new Promise((resolve, reject) => {
      if (!this.mitt) {
        reject(new Error('kysely instance has been destroyed'))
      }

      this.mitt!.once(1, (data, err) => (!err && data) ? resolve(data) : reject(err))
    })
  }
}
