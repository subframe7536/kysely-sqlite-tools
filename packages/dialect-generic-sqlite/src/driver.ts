import type { DatabaseConnection, Driver, QueryResult } from 'kysely'
import type { IGenericSqliteDialectConfig, IGenericSqliteExecutor } from './type'
import { CompiledQuery, SelectQueryNode } from 'kysely'
import { ConnectionMutex } from './mutex'

export abstract class BaseSqliteDriver implements Driver {
  private mutex = new ConnectionMutex()
  public conn?: DatabaseConnection
  constructor(init: () => Promise<void>) {
    this.init = init
  }

  init: () => Promise<void>

  async acquireConnection(): Promise<DatabaseConnection> {
    // SQLite only has one single connection. We use a mutex here to wait
    // until the single connection has been released.
    await this.mutex.lock()
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
    this.mutex.unlock()
  }

  abstract destroy(): Promise<void>
}

export class GenericSqliteDriver extends BaseSqliteDriver {
  db?: IGenericSqliteExecutor
  constructor(config: IGenericSqliteDialectConfig) {
    super(async () => {
      this.db = await config.create()
      this.conn = new GenericSqliteConnection(this.db)
      await config.onCreateConnection?.(this.conn)
    })
  }

  async destroy(): Promise<void> {
    await this.db?.close()
  }
}

export class GenericSqliteConnection implements DatabaseConnection {
  constructor(
    private db: IGenericSqliteExecutor,
  ) { }

  async *streamQuery<R>(
    { parameters, query, sql }: CompiledQuery,
  ): AsyncIterableIterator<QueryResult<R>> {
    if (!this.db.iterator) {
      throw new Error('streamQuery() is not supported.')
    }
    const it = this.db.iterator(SelectQueryNode.is(query), sql, parameters)
    for await (const row of it) {
      yield { rows: [row as any] }
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
