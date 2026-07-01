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

import type { IGenericSqlite, IGenericSqliteExecutor } from './type'

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
  public conn?: DatabaseConnection
  /**
   * Base abstract class that implements {@link Driver}
   *
   * You **MUST** assign `this.conn` in `init` and implement `destroy` method
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

  abstract destroy(): Promise<void>
}

/**
 * Wrapper for {@link IGenericSqlite}'s `query` function
 *
 * When `isSelectQueryNode` is true or sql starts with `select`, call `exec.all`, otherwise call `exec.run`.
 * This is a simple implementation that does not support `returning`.
 */
export function buildQueryFnAlt(exec: IGenericSqliteExecutor): IGenericSqlite['query'] {
  return async (isSelect, sql, parameters) =>
    isSelect || sql.toLowerCase().startsWith('select')
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
export function buildQueryFn(exec: IGenericSqliteExecutor): IGenericSqlite['query'] {
  return async (_isSelect, sql, parameters, node) => {
    if (isReadOrReturningQuery(node, sql)) {
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
export function isReadOrReturningQuery(node: RootOperationNode | undefined, sql: string): boolean {
  if (node) {
    if (SelectQueryNode.is(node)) {
      return true
    }
    if (
      (InsertQueryNode.is(node) || UpdateQueryNode.is(node) || DeleteQueryNode.is(node)) &&
      node.returning
    ) {
      return true
    }
  }

  return /^\s*(select|pragma|values|with)\b/i.test(sql)
}
