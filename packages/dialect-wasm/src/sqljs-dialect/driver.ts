import type { SqlJsDialectConfig } from '.'
import type { InfoReturn, QueryReturn } from '../baseDriver'
import type { AnyFunction } from '../types'
import type { SqlJSDB } from './type'
import { BaseDriver, BaseSqliteConnection } from '../baseDriver'

/**
 * Throttles a function call to a maximum number of calls per delay period.
 * @param func The function to throttle.
 * @param delay The delay period in milliseconds.
 * @param maxCalls The maximum number of calls allowed per delay period.
 * @returns A function that can be called with the same arguments as the original function, but will be throttled.
 *
 * @example
 * ```ts
 * const throttledFunc = throttle({ func: myFunction, delay: 2000, maxCalls: 1000 });
 * throttledFunc(myArgument);
 * ```
 */
function throttle<T>(func: AnyFunction, delay: number, maxCalls: number): (s: T) => void {
  let timer: any
  let callCount = 0
  let lastArgs: T | null = null

  function reset(): void {
    if (timer) {
      clearTimeout(timer)
    }
    callCount = 0
    lastArgs = null
  }

  function callFunc(): void {
    if (callCount >= maxCalls) {
      func(lastArgs!)
      reset()
    } else {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func(lastArgs!)
        reset()
        timer = undefined
      }, delay)
    }
  }

  return (s: T) => {
    callCount++
    lastArgs = s
    if (timer === undefined && callCount === 0) {
      func(s)
      callCount++
    } else {
      callFunc()
    }
  }
}

export class SqlJsDriver extends BaseDriver {
  private config: SqlJsDialectConfig
  private db?: SqlJSDB

  constructor(config: SqlJsDialectConfig) {
    super()
    this.config = config
  }

  async init(): Promise<void> {
    this.db = typeof this.config.database === 'function'
      ? await this.config.database()
      : this.config.database

    if (!this.db) {
      throw new Error('no database')
    }

    this.connection = new SqlJsConnection(
      this.db,
      this.config.onWrite?.func,
      this.config.onWrite?.isThrottle,
      this.config.onWrite?.delay,
      this.config.onWrite?.maxCalls,
    )

    await this.config.onCreateConnection?.(this.connection)
  }

  async beginTransaction(connection: SqlJsConnection): Promise<void> {
    connection.trxCount++
    await super.beginTransaction(connection)
  }

  async commitTransaction(connection: SqlJsConnection): Promise<void> {
    connection.trxCount--
    await super.commitTransaction(connection)
  }

  async rollbackTransaction(connection: SqlJsConnection): Promise<void> {
    connection.trxCount--
    await super.rollbackTransaction(connection)
  }

  async destroy(): Promise<void> {
    this.db?.close()
  }
}
class SqlJsConnection extends BaseSqliteConnection {
  private db: SqlJSDB
  private onWrite: ((buffer: Uint8Array) => void) | undefined
  trxCount = 0

  constructor(
    db: SqlJSDB,
    func?: ((buffer: Uint8Array) => void),
    isThrottle = false,
    delay = 2000,
    maxCalls = 1000,
  ) {
    super()
    this.db = db
    this.onWrite = func
      ? isThrottle
        ? throttle(func, delay, maxCalls)
        : func
      : undefined
  }

  async query(sql: string, parameters?: readonly unknown[]): QueryReturn {
    const stmt = this.db.prepare(sql)
    stmt.bind(parameters as any[])
    const rows = []
    while (stmt.step()) {
      rows.push(stmt.getAsObject())
    }
    stmt.free()
    return rows
  }

  async info(): InfoReturn {
    let id = 0
    const _stmt = this.db.prepare('SELECT last_insert_rowid()')
    try {
      _stmt.step()
      id = _stmt.get()[0]
    } finally {
      _stmt.free()
    }
    if (this.trxCount === 0) {
      this.onWrite?.(this.db.export())
    }
    return {
      insertId: BigInt(id),
      numAffectedRows: BigInt(this.db.getRowsModified()),
    }
  }
}
