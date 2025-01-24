import type { DatabaseConnection, QueryResult } from 'kysely'

export type Promisable<T> = T | Promise<T>

export interface IGenericSqliteExecutor {
  /**
   * Executes a SQL query and returns all resulting rows.
   * @param sql - The SQL query string to execute.
   * @param parameters - Optional array of parameters to bind to the query.
   */
  all: (
    sql: string,
    parameters?: any[] | readonly any[]
  ) => Promisable<any[]>

  /**
   * Executes a SQL query that modifies the database (e.g., `INSERT`, `UPDATE`, `DELETE`),
   * returns the number of changes and the last inserted row ID.
   * @param sql - The SQL query string to execute.
   * @param parameters - Optional array of parameters to bind to the query.
   */
  run: (
    sql: string,
    parameters?: any[] | readonly any[]
  ) => Promisable<Pick<QueryResult<any>, 'insertId' | 'numAffectedRows'>>
}

/**
 * Interface for generic sqlite
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
   * @returns Kysely's {@link QueryResult}
   */
  query: (
    isSelect: boolean,
    sql: string,
    parameters?: any[] | readonly any[]
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
    parameters?: any[] | readonly any[],
    chunkSize?: number
  ) => IterableIterator<unknown> | AsyncIterableIterator<unknown>
}

export type OnCreateConnection = (connection: DatabaseConnection) => Promisable<void>

export interface IBaseSqliteDialectConfig {
  /**
   * Optional callback function that is invoked when a new database connection is created.
   * This allows for custom setup or configuration of the connection.
   *
   * @param connection The newly created database connection.
   */
  onCreateConnection?: OnCreateConnection
}
