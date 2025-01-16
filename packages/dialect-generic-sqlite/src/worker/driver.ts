import type { DatabaseConnection, Driver, QueryResult } from 'kysely'
import { CompiledQuery, SelectQueryNode } from 'kysely'
import { ConnectionMutex } from '../mutex'
import {
  closeEvent,
  dataEvent,
  endEvent,
  type IGenericEventEmitter,
  type IGenericSqliteWorkerDialectConfig,
  type IGenericWorker,
  initEvent,
  type MainToWorkerMsg,
  runEvent,
} from './type'

export class GenericSqliteWorkerDriver<T extends IGenericWorker> implements Driver {
  private connection?: DatabaseConnection
  private connectionMutex = new ConnectionMutex()
  private worker?: T
  private mitt?: IGenericEventEmitter
  constructor(
    private config?: IGenericSqliteWorkerDialectConfig<T>,
  ) { }

  async init(): Promise<void> {
    this.mitt = this.config!.mitt
    this.worker = await this.config!.worker()

    this.config!.handle(
      this.worker,
      ([type, ...msg]) => this.mitt!.emit(type, ...msg),
    )
    this.worker!.postMessage([initEvent] satisfies MainToWorkerMsg)
    await new Promise<void>((resolve, reject) => {
      this.mitt!.once(initEvent, (_, err) => err ? reject(err) : resolve())
    })

    this.connection = new GenericSqliteWorkerConnection(this.worker!, this.mitt!)
    await this.config!.onCreateConnection?.(this.connection)

    this.config = undefined
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
    this.worker.postMessage([closeEvent] satisfies MainToWorkerMsg)
    return new Promise<void>((resolve, reject) => {
      this.mitt?.once(closeEvent, (_, err) => {
        if (err) {
          reject(err)
        } else {
          this.worker?.terminate()
          this.mitt?.off()
          this.mitt = this.worker = undefined
          resolve()
        }
      })
    })
  }
}

class GenericSqliteWorkerConnection implements DatabaseConnection {
  constructor(
    readonly worker: IGenericWorker,
    readonly mitt: IGenericEventEmitter,
  ) { }

  async *streamQuery<R>(
    { parameters, sql, query }: CompiledQuery,
  ): AsyncIterableIterator<QueryResult<R>> {
    this.worker.postMessage([
      dataEvent,
      SelectQueryNode.is(query),
      sql,
      parameters,
    ] satisfies MainToWorkerMsg)
    type ResolveData = [data: QueryResult<R> | undefined, done: boolean]
    let done = false
    let resolveFn: (value: ResolveData) => void
    let rejectFn: (reason?: any) => void

    this.mitt!.on(dataEvent, (data, err): void => {
      if (err) {
        rejectFn(err)
      } else {
        resolveFn([{ rows: [data] }, false])
      }
    })

    this.mitt!.on(endEvent, (_, err): void => {
      if (err) {
        rejectFn(err)
      } else {
        resolveFn([undefined, true])
      }
    })

    while (!done) {
      const [data, isDone] = await new Promise<ResolveData>((res, rej) => {
        resolveFn = res
        rejectFn = rej
      })

      if (isDone) {
        done = true
        this.mitt?.off(dataEvent)
        this.mitt?.off(endEvent)
      } else {
        console.log(data)
        yield data!
      }
    }
  }

  async executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const { parameters, sql, query } = compiledQuery
    this.worker.postMessage([
      runEvent,
      SelectQueryNode.is(query),
      sql,
      parameters,
    ] satisfies MainToWorkerMsg)
    return new Promise((resolve, reject) => {
      if (!this.mitt) {
        reject(new Error('kysely instance has been destroyed'))
      }

      this.mitt!.once(runEvent, (data, err) => (!err && data) ? resolve(data) : reject(err))
    })
  }
}
