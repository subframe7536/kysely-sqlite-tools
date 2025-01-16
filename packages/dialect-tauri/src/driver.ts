import type Database from '@tauri-apps/plugin-sql'
import type { DatabaseConnection, QueryResult } from 'kysely'
import type { TauriSqliteDialectConfig } from './type'
import { CompiledQuery, SelectQueryNode } from 'kysely'

export class TauriSqliteDriver {
  private db?: Database
  private connectionMutex = new ConnectionMutex()
  private connection?: DatabaseConnection
  constructor(
    private config: TauriSqliteDialectConfig,
  ) { }

  async init(): Promise<void> {
    this.db = typeof this.config.database === 'function'
      ? await this.config.database('sqlite:' as any)
      : await this.config.database
    this.connection = new TauriSqlConnection(this.db)

    await this.config.onCreateConnection?.(this.connection)
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    // plugin only has one single connection. We use a mutex here to wait
    // until the single connection has been released.
    await this.connectionMutex.lock()
    return this.connection!
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

  async releaseConnection(): Promise<void> {
    this.connectionMutex.unlock()
  }

  async destroy(): Promise<void> {
    this.db?.close()
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
class TauriSqlConnection implements DatabaseConnection {
  readonly db: Database
  constructor(db: any) {
    this.db = db
  }

  streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('Tauri sql plugin doesn\'t support streaming')
  }

  async executeQuery<R>({ parameters, query, sql }: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    const rows = await this.db.select<any[]>(sql, parameters as any[])
    if (SelectQueryNode.is(query) || rows.length) {
      return { rows }
    }
    const { lastInsertId, rowsAffected } = await this.db.execute('select 1')
    return {
      rows,
      insertId: BigInt(lastInsertId!),
      numAffectedRows: BigInt(rowsAffected),
    }
  }
}
