import type { DatabaseConnection } from 'kysely'

export type Promisable<T> = T | Promise<T>

/**
 * Represents an interface for executing SQLite operations.
 * This interface provides methods for querying, modifying, and managing SQLite database connections.
 */
export interface IGenericSqliteExecutor {
  /**
   * Closes the database connection.
   * @returns A promise or value that resolves when the connection is closed.
   */
  close: () => Promisable<any>

  /**
   * Executes a SQL query and returns all resulting rows.
   * @param sql - The SQL query string to execute.
   * @param parameters - Optional array of parameters to bind to the query.
   * @returns A promise or value that resolves to an array of result rows.
   */
  all: (
    sql: string,
    parameters?: any[] | readonly any[]
  ) => Promisable<any[]>

  /**
   * Executes a SQL query that modifies the database (e.g., INSERT, UPDATE, DELETE).
   * @param sql - The SQL query string to execute.
   * @param parameters - Optional array of parameters to bind to the query.
   * @returns A promise or value that resolves to an object containing the number of changes and the last inserted row ID.
   */
  run: (
    sql: string,
    parameters?: any[] | readonly any[]
  ) => Promisable<{ changes: number | bigint, lastInsertRowid: number | bigint }>

  /**
   * Provides an iterator for executing SQL queries and iterating over the results.
   * This is useful for large datasets or streaming results.
   * @param isSelect - Indicates whether the query is a SELECT statement.
   * @param sql - The SQL query string to execute.
   * @param parameters - Optional array of parameters to bind to the query.
   * @returns An iterable or async iterable iterator for the query results.
   */
  iterator?: (
    isSelect: boolean,
    sql: string,
    parameters?: any[] | readonly any[],
  ) => IterableIterator<unknown> | AsyncIterableIterator<unknown>
}

export type OnCreateConnection = (connection: DatabaseConnection) => Promisable<void>

export interface IBaseSqliteDialectConfig {
  /**
   * Optional callback function that is invoked when a new database connection is created.
   * This allows for custom setup or configuration of the connection.
   *
   * @param connection - The newly created database connection.
   */
  onCreateConnection?: OnCreateConnection
}
