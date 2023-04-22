import type { DatabaseConnection } from 'kysely'
import { CompiledQuery } from 'kysely'
import { BaseDriver, BaseSqliteConnection } from '../baseDriver'
import type { SqlJSDB } from './type'
import type { SqlJsDialectConfig } from '.'

interface ThrottleParams<T> {
  func: (s: T) => void
  delay: number
  maxCalls: number
}

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
function throttle<T>({ func, delay, maxCalls }: ThrottleParams<T>): (s: T) => void {
  let timer: any
  let callCount = 0
  let lastArgs: T | null = null

  function reset() {
    timer && clearTimeout(timer)
    callCount = 0
    lastArgs = null
  }

  function callFunc() {
    if (callCount >= maxCalls) {
      func(lastArgs!)
      reset()
    } else {
      timer && clearTimeout(timer)
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
  readonly #config: SqlJsDialectConfig
  declare connection?: SqlJsConnection | undefined

  #db?: SqlJSDB

  constructor(config: SqlJsDialectConfig) {
    super()
    this.#config = config
  }

  async init(): Promise<void> {
    this.#db = typeof this.#config.database === 'function'
      ? await this.#config.database()
      : this.#config.database

    if (!this.#db) {
      throw new Error('no database')
    }

    this.connection = new SqlJsConnection(
      this.#db,
      this.#config.onWrite?.func,
      this.#config.onWrite?.isThrottle,
      this.#config.onWrite?.maxCalls,
      this.#config.onWrite?.delay,
    )

    if (this.#config.onCreateConnection) {
      await this.#config.onCreateConnection(this.connection)
    }
  }

  async beginTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw('begin'))
    this.connection && this.connection.transactionNum++
  }

  async commitTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw('commit'))
    this.connection && this.connection.transactionNum--
  }

  async rollbackTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw('rollback'))
    this.connection && this.connection.transactionNum--
  }
}
class SqlJsConnection extends BaseSqliteConnection {
  readonly #db: SqlJSDB
  readonly #onWrite: ((buffer: Uint8Array) => void) | undefined
  transactionNum = 0

  constructor(
    db: SqlJSDB,
    func?: ((buffer: Uint8Array) => void),
    isThrottle = false,
    maxCalls = 1000,
    delay = 2000,
  ) {
    super()
    this.#db = db
    this.#onWrite = func
      ? isThrottle
        ? throttle({ func, maxCalls, delay })
        : func
      : undefined
  }

  query(sql: string, parameters?: readonly unknown[]) {
    const stmt = this.#db.prepare(sql)
    stmt.bind(parameters as any[])
    const rows = []
    while (stmt.step()) {
      rows.push(stmt.getAsObject())
    }
    stmt.free()
    return rows
  }

  exec(sql: string, param: any[]) {
    this.#db.run(sql, param as any[])
    const insertId = BigInt(this.query('SELECT last_insert_rowid() as id')[0].id)
    const numAffectedRows = BigInt(this.#db.getRowsModified())
    this.transactionNum === 0 && this.#onWrite && this.#onWrite(this.#db.export())
    return {
      numAffectedRows,
      insertId,
    }
  }
}
export const TRANSACTION_REGEX = /^(\s|;)*(?:begin|end|commit|rollback)/i
