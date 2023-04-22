import type { DatabaseConnection, QueryResult } from 'kysely'
import { CompiledQuery } from 'kysely'
import type { TauriSqlDB } from './type'
import type { TauriSqlDialectConfig } from '.'

export class TaruiSqlDriver {
  #config: TauriSqlDialectConfig
  #db?: TauriSqlDB
  readonly #connectionMutex = new ConnectionMutex()
  connection?: DatabaseConnection
  constructor(config: TauriSqlDialectConfig) {
    this.#config = config
  }

  async init(): Promise<void> {
    this.#db = typeof this.#config.database === 'function'
      ? await this.#config.database()
      : this.#config.database
    this.connection = new TauriSqlConnection(this.#db)
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
class TauriSqlConnection implements DatabaseConnection {
  #db: TauriSqlDB
  constructor(db: any) {
    this.#db = db
  }

  async exec(sql: string, param?: readonly unknown[]) {
    const { lastInsertId, rowsAffected } = await this.#db.execute(sql, param as any)
    return {
      numAffectedRows: BigInt(rowsAffected),
      insertId: BigInt(lastInsertId),
    }
  }

  streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('Sqlite driver doesn\'t support streaming')
  }

  async executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const { parameters, sql, query } = compiledQuery
    return Promise.resolve((query.kind === 'SelectQueryNode' || query.kind === 'RawNode')
      ? {
          rows: await this.#db.select(sql, parameters as any),
        }
      : {
          rows: [],
          ...await this.exec(sql, parameters),
        },
    )
  }
}
