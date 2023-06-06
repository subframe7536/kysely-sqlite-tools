import type { DatabaseConnection, Driver, QueryResult } from 'kysely'
import { CompiledQuery } from 'kysely'

export interface BaseDB {
  close: () => void
}

export abstract class BaseDriver implements Driver {
  readonly #connectionMutex = new ConnectionMutex()
  connection?: DatabaseConnection
  #db?: BaseDB

  abstract init(): Promise<void>

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
    this.#db?.close()
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
type Promisable<T> = T | Promise<T>
export type ExecReturn = Promisable<Omit<QueryResult<any>, 'rows' | 'numUpdatedOrDeletedRows'>>
export type QueryReturn = Promisable<any[]>

export abstract class BaseSqliteConnection implements DatabaseConnection {
  abstract query(sql: string, param?: any[]): QueryReturn
  abstract exec(sql: string, param?: any[]): ExecReturn
  streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('Sqlite driver doesn\'t support streaming')
  }

  async executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const { parameters, sql, query } = compiledQuery
    return ['SelectQueryNode', 'RawNode'].includes(query.kind)
      ? {
          rows: await this.query(sql, parameters as any[]),
        }
      : {
          rows: [],
          ...await this.exec(sql, parameters as any[]),
        }
  }
}
