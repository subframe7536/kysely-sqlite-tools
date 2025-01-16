import type { DatabaseConnection, Driver, QueryResult } from 'kysely'
import { CompiledQuery, SelectQueryNode } from 'kysely'
import { ConnectionMutex } from '../mutex'
import {
  closeEvent,
  type CommonEventEmitter,
  type CommonSqliteWorkerDialectConfig,
  type CommonWorker,
  dataEvent,
  endEvent,
  initEvent,
  type MainToWorkerMsg,
  runEvent,
  type WorkerToMainMsg,
} from './type'

export class CommonSqliteWorkerDriver implements Driver {
  private connection?: DatabaseConnection
  private connectionMutex = new ConnectionMutex()
  constructor(
    private config: CommonSqliteWorkerDialectConfig,
  ) { }

  async init(): Promise<void> {
    this.config.worker.onmessage = ({ data: [type, ...msg] }: MessageEvent<WorkerToMainMsg>) => {
      this.config.mitt.emit(type, ...msg)
    }
    this.config.worker.postMessage([initEvent] satisfies MainToWorkerMsg)
    await new Promise<void>((resolve, reject) => {
      this.config.mitt.once(initEvent, (_, err) => err ? reject(err) : resolve())
    })

    this.connection = new CommonSqliteWorkerConnection(this.config.worker, this.config.mitt)
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
    if (!this.config.worker) {
      return
    }
    this.config.worker.postMessage([closeEvent] satisfies MainToWorkerMsg)
    return new Promise<void>((resolve, reject) => {
      this.config.mitt?.once(closeEvent, (_, err) => {
        if (err) {
          reject(err)
        } else {
          this.config.worker?.terminate()
          this.config.mitt?.off()
          this.config.mitt = undefined as any
          resolve()
        }
      })
    })
  }
}

class CommonSqliteWorkerConnection implements DatabaseConnection {
  constructor(
    readonly worker: CommonWorker,
    readonly mitt: CommonEventEmitter,
  ) { }

  async *streamQuery<R>({ parameters, sql, query }: CompiledQuery): AsyncIterableIterator<QueryResult<R>> {
    this.worker.postMessage([dataEvent, SelectQueryNode.is(query), sql, parameters] satisfies MainToWorkerMsg)
    let done = false
    let resolveFn: (value: IteratorResult<QueryResult<R>>) => void
    let rejectFn: (reason?: any) => void

    this.mitt!.on(dataEvent, (data, err): void => {
      if (err) {
        rejectFn(err)
      } else {
        resolveFn({ value: { rows: data as any }, done: false })
      }
    })

    this.mitt!.on(endEvent, (_, err): void => {
      if (err) {
        rejectFn(err)
      } else {
        resolveFn({ value: undefined, done: true })
      }
    })

    while (!done) {
      const result = await new Promise<IteratorResult<QueryResult<R>>>((res, rej) => {
        resolveFn = res
        rejectFn = rej
      })

      if (result.done) {
        done = true
        this.mitt?.off(dataEvent)
        this.mitt?.off(endEvent)
      } else {
        yield result.value
      }
    }
  }

  async executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const { parameters, sql, query } = compiledQuery
    const isSelect = SelectQueryNode.is(query)
    this.worker.postMessage([runEvent, isSelect, sql, parameters] satisfies MainToWorkerMsg)
    return new Promise((resolve, reject) => {
      if (!this.mitt) {
        reject(new Error('kysely instance has been destroyed'))
      }

      this.mitt!.once(runEvent, (data, err) => (!err && data) ? resolve(data) : reject(err))
    })
  }
}
