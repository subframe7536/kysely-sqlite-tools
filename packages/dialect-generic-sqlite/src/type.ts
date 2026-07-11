import type {
  AbortableOperationOptions,
  DatabaseConnection,
  QueryResult,
  RootOperationNode,
} from 'kysely'

/**
 * A value or a Promise of that value.
 */
export type Promisable<T> = T | Promise<T>

/**
 * Factory that returns (possibly asynchronously) an executor or dialect
 * component.
 */
export type SqliteExecutorFactory<T> = (options?: AbortableOperationOptions) => Promisable<T>

/**
 * Minimal executor interface that `buildQueryFn` requires.
 */
export interface IGenericSqliteExecutor {
  /**
   * Decides whether a Kysely operation returns rows. The default classifier
   * does not parse SQL, so this callback is required when raw SQL, PRAGMA, or
   * other statements without a recognized Kysely operation node return rows.
   * In a worker dialect, `node` is always `undefined` because operation nodes
   * are not transferred to workers.
   */
  isQuery?: (sql: string, node: RootOperationNode | undefined) => boolean

  /**
   * Executes a SQL query and returns all resulting rows.
   * @param sql - The SQL query string to execute.
   * @param parameters - Optional array of parameters to bind to the query.
   */
  all: (sql: string, parameters?: any[] | readonly any[]) => Promisable<any[]>

  /**
   * Executes a SQL query that modifies the database (e.g., `INSERT`, `UPDATE`, `DELETE`),
   * returns the number of changes and the last inserted row ID.
   *
   * It may also return `rows` when the statement produces rows, such as a `RETURNING`
   * clause or a client-specific write statement with a result set.
   * @param sql - The SQL query string to execute.
   * @param parameters - Optional array of parameters to bind to the query.
   */
  run: (
    sql: string,
    parameters?: any[] | readonly any[],
  ) => Promisable<
    Pick<QueryResult<any>, 'insertId' | 'numAffectedRows'> & {
      rows?: any[]
    }
  >
}

/**
 * Interface for generic sqlite
 */
/**
 * Generic SQLite executor contract.
 *
 * Every dialect adapter must provide an object conforming to this interface.
 */
export interface IGenericSqlite<DB = unknown> {
  /**
   * Original database instance
   */
  db: DB
  /**
   * Closes the database connection.
   */
  close: () => Promisable<any>

  /**
   * Basic function for executing SQL queries and get query result
   * @param isSelect Whether the sql is SELECT query
   * @param sql The SQL query string to execute.
   * @param parameters Optional array of parameters to bind to the query.
   * @param node Optional {@link RootOperationNode} for the query, used to determine if the query is a read or returning query. `undefined` when in worker dialect.
   * @returns Kysely's {@link QueryResult}
   */
  query: (
    isSelect: boolean,
    sql: string,
    parameters: any[] | readonly any[],
    node?: RootOperationNode,
  ) => Promisable<QueryResult<any>>

  /**
   * Iterator for executing SQL queries and iterating over the results.
   * This is useful for large datasets or streaming results.
   * @param isSelect Whether the sql is SELECT query
   * @param sql The SQL query string to execute.
   * @param parameters Optional array of parameters to bind to the query.
   */
  iterator?: (
    isSelect: boolean,
    sql: string,
    parameters: any[] | readonly any[],
    chunkSize?: number,
  ) => IterableIterator<unknown> | AsyncIterableIterator<unknown>
}

/**
 * Callback invoked when a new database connection is established.
 */
export type OnCreateConnection = (
  connection: DatabaseConnection,
  options?: AbortableOperationOptions,
) => Promisable<void>

/**
 * Base configuration shared by all dialect configs.
 */
export interface IBaseSqliteDialectConfig {
  /**
   * Optional callback function that is invoked when a new database connection is created.
   * This allows for custom setup or configuration of the connection.
   *
   * @param connection The newly created database connection.
   */
  onCreateConnection?: OnCreateConnection
}
