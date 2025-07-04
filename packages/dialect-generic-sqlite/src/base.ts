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

async function runSavepoint(
  command: string,
  createQueryId: () => { readonly queryId: string },
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
  private mutex?: ConnectionMutex
  public conn?: DatabaseConnection
  savepoint: ((connection: DatabaseConnection, savepointName: string, compileQuery: QueryCompiler['compileQuery']) => Promise<void>) | undefined
  releaseSavepoint: ((connection: DatabaseConnection, savepointName: string, compileQuery: QueryCompiler['compileQuery']) => Promise<void>) | undefined
  rollbackToSavepoint: ((connection: DatabaseConnection, savepointName: string, compileQuery: QueryCompiler['compileQuery']) => Promise<void>) | undefined
  init: () => Promise<void>
  /**
   * Base abstract class that implements {@link Driver}
   *
   * You **MUST** assign `this.conn` in `init` and implement `destroy` method
   */
  constructor(init: () => Promise<void>) {
    this.init = () => import('kysely')
      .then(({ createQueryId }) => {
        if (createQueryId) {
          this.savepoint = runSavepoint.bind(null, 'savepoint', createQueryId)
          this.releaseSavepoint = runSavepoint.bind(null, 'release', createQueryId)
          this.rollbackToSavepoint = runSavepoint.bind(null, 'rollback to', createQueryId)
        }
      })
      .then(init)
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    // SQLite only has one single connection. We use a mutex here to wait
    // until the single connection has been released.
    if (!this.mutex) {
      this.mutex = new ConnectionMutex()
    }
    await this.mutex.lock()
    return this.conn!
  }

  async releaseConnection(): Promise<void> {
    this.mutex?.unlock()
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
