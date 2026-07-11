import type {
  AbortableOperationOptions,
  DatabaseConnection,
  DatabaseIntrospector,
  Dialect,
  DialectAdapter,
  Driver,
  Kysely,
  QueryCompiler,
  RootOperationNode,
} from 'kysely'
import {
  CompiledQuery,
  createQueryId,
  DeleteQueryNode,
  IdentifierNode,
  InsertQueryNode,
  RawNode,
  SelectQueryNode,
  SqliteAdapter,
  SqliteIntrospector,
  SqliteQueryCompiler,
  UpdateQueryNode,
} from 'kysely'

import type { IGenericSqlite, IGenericSqliteExecutor, Promisable } from './type'

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

/**
 * Execute a savepoint command (savepoint / rollback to / release) with a
 * sanitized identifier.
 */
async function runSavepoint(
  command: string,
  connection: DatabaseConnection,
  savepointName: string,
  compileQuery: QueryCompiler['compileQuery'],
): Promise<void> {
  await connection.executeQuery(
    compileQuery(
      RawNode.createWithChildren([
        RawNode.createWithSql(`${command} `),
        IdentifierNode.create(savepointName), // ensures savepointName gets sanitized
      ]),
      createQueryId(),
    ),
  )
}

export abstract class BaseSqliteDriver implements Driver {
  /**
   * The active database connection, set during {@link init}.
   */
  public conn?: DatabaseConnection

  /**
   * @param init - async function that creates and assigns `this.conn`.
   *   You **must** implement {@link destroy} to release resources.
   */
  constructor(public init: (options?: AbortableOperationOptions) => Promise<void>) {}

  async acquireConnection(): Promise<DatabaseConnection> {
    return this.conn!
  }

  async releaseConnection(): Promise<void> {
    // Kysely 0.29+ serializes single-connection dialects using
    // SqliteAdapter.supportsMultipleConnections instead of driver-local locks.
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
    await runSavepoint('savepoint', connection, savepointName, compileQuery)
  }

  async rollbackToSavepoint(
    connection: DatabaseConnection,
    savepointName: string,
    compileQuery: QueryCompiler['compileQuery'],
  ): Promise<void> {
    await runSavepoint('rollback to', connection, savepointName, compileQuery)
  }

  async releaseSavepoint(
    connection: DatabaseConnection,
    savepointName: string,
    compileQuery: QueryCompiler['compileQuery'],
  ): Promise<void> {
    await runSavepoint('release', connection, savepointName, compileQuery)
  }

  /**
   * Release all resources held by this driver.
   */
  abstract destroy(): Promise<void>
}

/**
 * Resolve a value or a factory function into a promise.
 * If the argument is a function, it is called and the result is awaited; otherwise the value is returned as-is.
 */
export async function access<T>(data: T | (() => Promisable<T>)): Promise<T> {
  return typeof data === 'function' ? await (data as any)() : data
}

/**
 * Wrapper for {@link IGenericSqlite}'s `query` function
 *
 * Uses {@link IGenericSqliteExecutor.isQuery} to decide whether to call
 * `exec.all` or `exec.run`, default is {@link defaultIsQuery}.
 */
export function buildQueryFn(exec: IGenericSqliteExecutor): IGenericSqlite['query'] {
  const isQuery = exec.isQuery ?? defaultIsQuery
  return async (_isSelect, sql, parameters, node) => {
    if (isQuery(sql, node)) {
      const rows = await exec.all(sql, parameters)
      return { rows }
    }
    return { rows: [], ...(await exec.run(sql, parameters)) }
  }
}

export function parseBigInt(num: number | bigint | null | undefined): bigint | undefined {
  return num === undefined || num === null ? undefined : BigInt(num)
}

export function defaultIsQuery(_sql: string, node: RootOperationNode | undefined): boolean {
  if (node) {
    if (SelectQueryNode.is(node)) {
      return true
    }
    if (InsertQueryNode.is(node) || UpdateQueryNode.is(node) || DeleteQueryNode.is(node)) {
      return Boolean(node.returning)
    }
  }
  return false
}
