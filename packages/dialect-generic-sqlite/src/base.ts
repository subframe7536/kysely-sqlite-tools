import type { IGenericSqlite, IGenericSqliteExecutor } from './type'
import type {
  DatabaseConnection,
  DatabaseIntrospector,
  Dialect,
  DialectAdapter,
  Driver,
  Kysely,
  QueryCompiler,
} from 'kysely'

import {
  CompiledQuery,
  createQueryId,
  IdentifierNode,
  RawNode,
  SqliteAdapter,
  SqliteIntrospector,
  SqliteQueryCompiler,
} from 'kysely'

export class BaseSqliteDialect implements Dialect {
  /**
   * Base class that implements {@link Dialect}
   * @param create function that create {@link Driver}
   */
  constructor(create: () => Driver) {
    this.createDriver = create
  }

  createDriver: () => Driver

  createQueryCompiler(): QueryCompiler {
    return new SqliteQueryCompiler()
  }

  createAdapter(): DialectAdapter {
    return new SqliteAdapter()
  }

  createIntrospector(db: Kysely<any>): DatabaseIntrospector {
    return new SqliteIntrospector(db)
  }
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

export function parseSavepointCommand(command: string, savepointName: string) {
  return RawNode.createWithChildren([
    RawNode.createWithSql(`${command} `),
    IdentifierNode.create(savepointName), // ensures savepointName gets sanitized
  ])
}

export abstract class BaseSqliteDriver implements Driver {
  private mutex = new ConnectionMutex()
  public conn?: DatabaseConnection
  /**
   * Base abstract class that implements {@link Driver}
   *
   * You **MUST** assign `this.conn` in `init` and implement `destroy` method
   */
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

  async savepoint(
    connection: DatabaseConnection,
    savepointName: string,
    compileQuery: QueryCompiler['compileQuery'],
  ): Promise<void> {
    await connection.executeQuery(compileQuery(parseSavepointCommand('savepoint', savepointName), createQueryId()))
  }

  async rollbackToSavepoint(
    connection: DatabaseConnection,
    savepointName: string,
    compileQuery: QueryCompiler['compileQuery'],
  ): Promise<void> {
    await connection.executeQuery(compileQuery(parseSavepointCommand('rollback to', savepointName), createQueryId()))
  }

  async releaseSavepoint(
    connection: DatabaseConnection,
    savepointName: string,
    compileQuery: QueryCompiler['compileQuery'],
  ): Promise<void> {
    await connection.executeQuery(compileQuery(parseSavepointCommand('release', savepointName), createQueryId()))
  }

  async releaseConnection(): Promise<void> {
    this.mutex.unlock()
  }

  abstract destroy(): Promise<void>
}

/**
 * Wrapper for {@link IGenericSqlite}'s `query` function
 *
 * Do not support `returning` in `INSERT`, `UPDATE`, `DELETE`
 * @param exec {@link IGenericSqliteExecutor}
 */
export function buildQueryFnAlt(exec: IGenericSqliteExecutor): IGenericSqlite['query'] {
  return async (isSelect, sql, parameters) => isSelect
    ? { rows: await exec.all(sql, parameters) }
    : { rows: [], ...await exec.run(sql, parameters) }
}

/**
 * Wrapper for {@link IGenericSqlite}'s `query` function
 *
 * Support `returning`, get `insertId` and `numAffectedRows` by calling `select 1`
 * @param exec {@link IGenericSqliteExecutor} `exec.run` will never call real sqls
 */
export function buildQueryFn(exec: IGenericSqliteExecutor): IGenericSqlite['query'] {
  return async (isSelect, sql, parameters) => {
    const rows = await exec.all(sql, parameters)
    return (isSelect || rows.length)
      ? { rows }
      : { rows: [], ...await exec.run('select 1') }
  }
}

export function parseBigInt(num: number | bigint | null | undefined): bigint | undefined {
  return (num === undefined || num === null)
    ? undefined
    : BigInt(num)
}
