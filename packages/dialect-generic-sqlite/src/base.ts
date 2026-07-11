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

export type QueryClassification = 'read' | 'write'

export interface QueryClassifierContext {
  isSelect: boolean
  node?: RootOperationNode
  sql: string
}

export type QueryClassifier = (context: QueryClassifierContext) => QueryClassification | undefined

export interface BuildQueryFnOptions {
  /**
   * Classifies raw SQL that Kysely's AST cannot decide. SQLite PRAGMA, WITH and
   * raw SQL are intentionally not parsed by this package; provide this callback
   * when their default prefix heuristic is not appropriate for your executor.
   */
  classifyQuery?: QueryClassifier
}

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
 * When `isSelectQueryNode` is true or sql starts with `select`, call `exec.all`, otherwise call `exec.run`.
 * This is a simple implementation that does not support `returning`.
 */
export function buildQueryFnAlt(
  exec: IGenericSqliteExecutor,
  options: BuildQueryFnOptions = {},
): IGenericSqlite['query'] {
  return async (isSelect, sql, parameters, node) =>
    isReadQuery(isSelect, node, sql, options)
      ? { rows: await exec.all(sql, parameters) }
      : { rows: [], ...(await exec.run(sql, parameters)) }
}

/**
 * Wrapper for {@link IGenericSqlite}'s `query` function
 *
 * This implementation supports `returning` queries
 * by checking {@link isReadOrReturningQuery} and calling `exec.all` for those queries, otherwise, it calls `exec.run`.
 *
 * Limitation: `returning` is only detected from Kysely's query AST. Raw SQL
 * `INSERT`, `UPDATE`, or `DELETE` statements with a `RETURNING` clause are
 * treated as write queries and executed with `exec.run`.
 */
export function buildQueryFn(
  exec: IGenericSqliteExecutor,
  options: BuildQueryFnOptions = {},
): IGenericSqlite['query'] {
  return async (isSelect, sql, parameters, node) => {
    if (isReadOrReturningQuery(node, sql, isSelect, options)) {
      const rows = await exec.all(sql, parameters)
      return { rows }
    }
    return { rows: [], ...(await exec.run(sql, parameters)) }
  }
}

export function parseBigInt(num: number | bigint | null | undefined): bigint | undefined {
  return num === undefined || num === null ? undefined : BigInt(num)
}

/**
 * Returns true if the query is a read query or a returning query.
 *
 * Checking:
 * - if Kysely INSERT, UPDATE, and DELETE query nodes have a RETURNING clause.
 * - if the query is a SELECT, PRAGMA, VALUES, or WITH query.
 *
 * Limitation: raw SQL `returning` clauses are not inspected.
 */
export function isReadOrReturningQuery(
  node: RootOperationNode | undefined,
  sql: string,
  isSelect = false,
  options: BuildQueryFnOptions = {},
): boolean {
  if (node) {
    if (SelectQueryNode.is(node)) {
      return true
    }
    if (InsertQueryNode.is(node) || UpdateQueryNode.is(node) || DeleteQueryNode.is(node)) {
      return Boolean(node.returning)
    }
  }
  return isReadQuery(isSelect, undefined, sql, options)
}

function isReadQuery(
  isSelect: boolean,
  node: RootOperationNode | undefined,
  sql: string,
  options: BuildQueryFnOptions,
): boolean {
  if (isSelect || (node && SelectQueryNode.is(node))) {
    return true
  }
  const classification = options.classifyQuery?.({ isSelect, node, sql })
  if (classification) {
    return classification === 'read'
  }
  return /^\s*(select|pragma|values|with)\b/i.test(sql)
}
