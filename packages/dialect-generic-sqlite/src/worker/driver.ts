import type { CompiledQuery, DatabaseConnection, QueryResult } from 'kysely'
import type { OnCreateConnection, Promisable } from '../type'
import { SelectQueryNode } from 'kysely'
import { BaseSqliteDriver } from '../base'
import {
  closeEvent,
  type CloseMsg,
  dataEvent,
  endEvent,
  type IGenericEventEmitter,
  type IGenericSqliteWorker,
  type IGenericWorker,
  initEvent,
  type InitMsg,
  runEvent,
  type RunMsg,
  type StreamMsg,
} from './types'

export class GenericSqliteWorkerDriver<
  T extends IGenericWorker,
  R extends Record<string, unknown>,
> extends BaseSqliteDriver {
  private worker?: T
  private mitt?: IGenericEventEmitter
  constructor(
    executor: () => Promisable<IGenericSqliteWorker<T, R>>,
    onCreateConnection?: OnCreateConnection,
  ) {
    super(async () => {
      const exec = await executor()
      this.mitt = exec.mitt
      this.worker = exec.worker

      exec.handle(
        this.worker,
        ([type, ...msg]) => this.mitt!.emit(type, ...msg),
      )

      this.worker.postMessage([
        initEvent,
        exec.data || {} as any,
      ] satisfies InitMsg<R>)

      await new Promise<void>((resolve, reject) => {
        this.mitt!.once(initEvent, (_, err) => err ? reject(err) : resolve())
      })

      this.conn = new GenericSqliteWorkerConnection(this.worker, this.mitt)
      onCreateConnection?.(this.conn)
    })
  }

  async destroy(): Promise<void> {
    if (!this.worker) {
      return
    }
    this.worker.postMessage([closeEvent] satisfies CloseMsg)
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
    ] satisfies StreamMsg)
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
    ] satisfies RunMsg)
    return await new Promise((resolve, reject) => {
      if (!this.mitt) {
        reject(new Error('kysely instance has been destroyed'))
      }

      this.mitt!.once(runEvent, (data, err) => (!err && data) ? resolve(data) : reject(err))
    })
  }
}
