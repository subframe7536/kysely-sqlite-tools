import type {
  AbortableOperationOptions,
  CompiledQuery,
  DatabaseConnection,
  QueryResult,
} from 'kysely'
import { SelectQueryNode } from 'kysely'

import { BaseSqliteDriver } from './base'
import type { IGenericSqlite, OnCreateConnection, SqliteExecutorFactory } from './type'

export class GenericSqliteDriver extends BaseSqliteDriver {
  db?: IGenericSqlite
  constructor(
    executor: SqliteExecutorFactory<IGenericSqlite>,
    onCreateConnection?: OnCreateConnection,
  ) {
    super(async (options) => {
      this.db = await executor(options)
      this.conn = new GenericSqliteConnection(this.db)
      await onCreateConnection?.(this.conn, options)
    })
  }

  async destroy(): Promise<void> {
    await this.db?.close()
  }
}

export class GenericSqliteConnection implements DatabaseConnection {
  constructor(private db: IGenericSqlite) {}

  async *streamQuery<R>(
    { parameters, query, sql }: CompiledQuery,
    chunkSize?: number,
    options?: AbortableOperationOptions,
  ): AsyncIterableIterator<QueryResult<R>> {
    if (!this.db.iterator) {
      throw new Error('streamQuery() is not supported.')
    }
    const it = this.db.iterator(SelectQueryNode.is(query), sql, parameters, chunkSize)
    for await (const row of it) {
      if (options?.signal?.aborted) {
        break
      }
      yield { rows: [row as any] }
    }
  }

  async executeQuery<R>({
    parameters,
    query,
    sql,
  }: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    return await this.db.query(SelectQueryNode.is(query), sql, parameters)
  }
}
