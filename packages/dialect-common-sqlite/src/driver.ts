import type { DatabaseConnection, Driver, QueryResult } from 'kysely'
import type { CommonSqliteDB, CommonSqliteDialectConfig } from './type'
import { CompiledQuery, SelectQueryNode } from 'kysely'
import { ConnectionMutex } from './mutex'

export class CommonSqliteDriver implements Driver {
  readonly connectionMutex = new ConnectionMutex()
  conn?: DatabaseConnection
  db?: CommonSqliteDB
  constructor(
    private config: CommonSqliteDialectConfig,
  ) {}

  async init(): Promise<void> {
    this.db = await this.config.create()
    this.conn = new CommonSqliteConnection(this.db)
    await this.config.onCreateConnection?.(this.conn)
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    // SQLite only has one single connection. We use a mutex here to wait
    // until the single connection has been released.
    await this.connectionMutex.lock()
    return this.conn!
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
    await this.db?.close()
  }
}

export class CommonSqliteConnection implements DatabaseConnection {
  constructor(
    private db: CommonSqliteDB,
  ) {}

  async *streamQuery<R>(
    { parameters, query, sql }: CompiledQuery,
    chunkSize?: number,
  ): AsyncIterableIterator<QueryResult<R>> {
    if (!this.db.iterater) {
      throw new Error('streamQuery() is not supported.')
    }
    const it = this.db.iterater(SelectQueryNode.is(query), sql, parameters, chunkSize)
    for await (const rows of it) {
      yield { rows }
    }
  }

  async executeQuery<R>({ parameters, query, sql }: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    return SelectQueryNode.is(query)
      ? {
          rows: await this.db.all(sql, parameters),
        }
      : {
          rows: [],
          ...await this.db.run(sql, parameters),
        }
  }
}
