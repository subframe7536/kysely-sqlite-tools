import type {
  AbortableOperationOptions,
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
  constructor(public init: (options?: AbortableOperationOptions) => Promise<void>) {
  }

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
 * Do not support `returning` in `INSERT`, `UPDATE`, `DELETE`
 * @param exec {@link IGenericSqliteExecutor}
 */
export function buildQueryFnAlt(exec: IGenericSqliteExecutor): IGenericSqlite['query'] {
  return async (isSelect, sql, parameters) =>
    isSelect
      ? { rows: await exec.all(sql, parameters) }
      : { rows: [], ...(await exec.run(sql, parameters)) }
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
    return isSelect || rows.length ? { rows } : { rows: [], ...(await exec.run('select 1')) }
  }
}

export function parseBigInt(num: number | bigint | null | undefined): bigint | undefined {
  return num === undefined || num === null ? undefined : BigInt(num)
}
