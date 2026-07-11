import type {
  AbortableOperationOptions,
  CompiledQuery,
  DatabaseConnection,
  QueryResult,
} from 'kysely'
import { SelectQueryNode } from 'kysely'

import { BaseSqliteDriver } from './base'
import type { IGenericSqlite, OnCreateConnection, SqliteExecutorFactory } from './type'

/**
 * {@link Driver} implementation that owns a single {@link IGenericSqlite}
 * instance.
 */
export class GenericSqliteDriver extends BaseSqliteDriver {
  /** The underlying SQLite executor. */
  db?: IGenericSqlite

  /**
   * @param executor - factory returning an {@link IGenericSqlite}
   * @param onCreateConnection - optional callback after connection is created
   */
  constructor(
    executor: SqliteExecutorFactory<IGenericSqlite>,
    onCreateConnection?: OnCreateConnection,
  ) {
    super(async (options) => {
      const db = await executor(options)
      this.db = db
      this.conn = new GenericSqliteConnection(db)
      try {
        await onCreateConnection?.(this.conn, options)
      } catch (error) {
        this.conn = undefined
        this.db = undefined
        await db.close()
        throw error
      }
    })
  }

  async destroy(): Promise<void> {
    await this.db?.close()
  }
}

/**
 * {@link DatabaseConnection} backed by an {@link IGenericSqlite} instance.
 */
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

  async executeQuery<R>(
    { parameters, query, sql }: CompiledQuery<unknown>,
    options?: AbortableOperationOptions,
  ): Promise<QueryResult<R>> {
    options?.signal?.throwIfAborted()
    return await this.db.query(SelectQueryNode.is(query), sql, parameters, query)
  }
}
