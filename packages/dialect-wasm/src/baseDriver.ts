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
export abstract class BaseSqliteConnection implements DatabaseConnection {
  abstract query(sql: string, param?: any[]): any[] | Promise<any[]>
  abstract exec(sql: string, param?: any[]): { numAffectedRows: bigint; insertId: any } | Promise<{ numAffectedRows: bigint; insertId: any }>
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
