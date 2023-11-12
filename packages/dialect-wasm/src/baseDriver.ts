import type { DatabaseConnection, Driver, QueryResult } from 'kysely'
import { CompiledQuery, SelectQueryNode } from 'kysely'

export interface BaseDB {
  close: () => void
}

export abstract class BaseDriver implements Driver {
  readonly #connectionMutex = new ConnectionMutex()
  connection?: DatabaseConnection

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

  abstract destroy(): Promise<void>
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

export type InfoReturn = Promise<Pick<QueryResult<any>, 'insertId' | 'numAffectedRows'>>
export type QueryReturn = Promise<Pick<QueryResult<any>, 'rows'>['rows']>

export abstract class BaseSqliteConnection implements DatabaseConnection {
  abstract query(sql: string, params?: any[]): QueryReturn
  abstract info(): InfoReturn
  streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('SQLite driver doesn\'t support streaming')
  }

  async executeQuery<R>({ parameters, query, sql }: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const rows = await this.query(sql, parameters as any[])
    return SelectQueryNode.is(query) || rows.length
      ? { rows }
      : {
          rows,
          ...await this.info(),
        }
  }
}
