import type { IGenericSqlite, OnCreateConnection, Promisable } from './type'
import type { CompiledQuery, DatabaseConnection, QueryResult } from 'kysely'

import { SelectQueryNode } from 'kysely'

import { BaseSqliteDriver } from './base'

export class GenericSqliteDriver extends BaseSqliteDriver {
  db?: IGenericSqlite
  constructor(
    executor: () => Promisable<IGenericSqlite>,
    onCreateConnection?: OnCreateConnection,
  ) {
    super(async () => {
      this.db = await executor()
      this.conn = new GenericSqliteConnection(this.db)
      await onCreateConnection?.(this.conn)
    })
  }

  async destroy(): Promise<void> {
    await this.db?.close()
  }
}

export class GenericSqliteConnection implements DatabaseConnection {
  constructor(
    private db: IGenericSqlite,
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
    return await this.db.query(SelectQueryNode.is(query), sql, parameters)
  }
}
