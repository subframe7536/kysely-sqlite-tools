import type { Compilable, CompiledQuery, KyselyPlugin, LogEvent, QueryResult, RawBuilder, Sql, Transaction } from 'kysely'
import { Kysely, sql } from 'kysely'
import { SqliteSerializePlugin } from 'kysely-plugin-serialize'
import type { Simplify } from 'kysely/dist/cjs/util/type-utils'
import { parseTableMap, precompileQuery, runCreateTable } from './utils'
import type { AvailableBuilder, Logger, QueryBuilderOutput, QueryBuilderResult, SqliteBuilderOption, Table } from './types'
import { Stack } from './stack'

type DBStatus =
  | 'needDrop'
  | 'noNeedDrop'
  | 'ready'
  | 'destroy'

export class SqliteBuilder<DB extends Record<string, any>> {
  public kysely: Kysely<DB>
  private status: DBStatus
  private tableMap: Map<string, Table<DB[keyof DB & string]>>
  private logger?: Logger
  private trxs: Stack<Transaction<DB>>
  public constructor(option: SqliteBuilderOption<DB>) {
    const { dialect, tables, dropTableBeforeInit: truncateBeforeInit, onQuery, plugins: additionalPlugin, logger } = option
    this.logger = logger
    const plugins: KyselyPlugin[] = additionalPlugin ?? []
    plugins.push(new SqliteSerializePlugin())
    this.kysely = new Kysely<DB>({
      dialect,
      log: (event: LogEvent) => {
        event.level === 'error'
          ? this.logger?.error('Uncaught DB Error', event.error as Error)
          : onQuery?.(event.query, event.queryDurationMillis)
      },
      plugins,
    })
    this.status = truncateBeforeInit
      ? 'needDrop'
      : 'noNeedDrop'
    this.tableMap = parseTableMap(tables)
    this.trxs = new Stack()
  }

  public async init(dropTableBeforeInit = false): Promise<SqliteBuilder<DB>> {
    const drop = dropTableBeforeInit || this.status === 'needDrop'
    await runCreateTable(this.kysely, this.tableMap, drop)
    this.status = 'ready'
    return this
  }

  private async isFailToInitDB(): Promise<boolean> {
    if (this.status === 'destroy') {
      this.logger?.error('DB have been destroyed')
      return true
    }
    this.status !== 'ready' && await this.init()
    if (this.status === 'ready') {
      return false
    }
    this.logger?.error('fail to init DB')
    return true
  }

  /**
   * execute sql in transaction, support nest transactions
   */
  public async transaction<T>(
    cb: (trx: Transaction<DB>) => Promise<T>,
    errorMsg?: string,
  ): Promise<T | undefined> {
    if (await this.isFailToInitDB()) {
      return undefined
    }
    return await this.kysely.transaction()
      .execute((trx) => {
        this.trxs.push(trx)
        return cb(trx)
      })
      .catch((err) => {
        errorMsg && this.logger?.error(errorMsg, err)
        return undefined
      })
      .finally(() => {
        this.trxs.pop()
      })
  }

  private getDB(): Kysely<DB> {
    return this.trxs.isEmpty() ? this.kysely : this.trxs.peek()
  }

  /**
   * execute query manually, auto detect transaction
   */
  public async exec<O>(
    cb: (db: Kysely<DB> | Transaction<DB>) => Promise<O>,
    errorMsg?: string,
  ): Promise<O | undefined> {
    if (await this.isFailToInitDB()) {
      return undefined
    }
    return cb(this.getDB())
      .catch((err) => {
        errorMsg && this.logger?.error(errorMsg, err)
        return undefined
      })
  }

  /**
   * execute query and auto return first result, auto detect transaction
   */
  public async execOne<O>(
    cb: (db: Kysely<DB> | Transaction<DB>) => AvailableBuilder<DB, O>,
    errorMsg?: string,
  ): Promise<Simplify<O> | undefined> {
    const resultList = await this.execList(cb, errorMsg)
    return resultList?.length ? resultList[0] : undefined
  }

  /**
   * execute query and auto return results, auto detect transaction
   */
  public async execList<O>(
    cb: (db: Kysely<DB> | Transaction<DB>) => AvailableBuilder<DB, O>,
    errorMsg?: string,
  ): Promise<Simplify<O>[] | undefined> {
    if (await this.isFailToInitDB()) {
      return undefined
    }
    return cb(this.getDB())
      .execute()
      .catch((err) => {
        errorMsg && this.logger?.error(errorMsg, err)
        return undefined
      })
  }

  /**
   * see {@link precompileQuery}
   */
  public precompile<O>(
    queryBuilder: (db: Kysely<DB> | Transaction<DB>) => QueryBuilderOutput<Compilable<O>>,
  ): ReturnType<typeof precompileQuery<O>> {
    return precompileQuery(queryBuilder(this.kysely))
  }

  /**
   * exec compiled query, and return rows in result, auto detect transaction, useful for select
   */
  public async execCompiledRows<O>(
    query: CompiledQuery<O>,
    errorMsg?: string,
  ): Promise<QueryBuilderResult<O>['rows'] | undefined> {
    const result = await this.execCompiled(query, errorMsg)
    return result?.rows?.length ? result.rows : undefined
  }

  /**
   * exec compiled query, return result, auto detect transaction
   */
  public async execCompiled<O>(
    query: CompiledQuery<O>,
    errorMsg?: string,
  ): Promise<QueryBuilderResult<O> | undefined> {
    if (await this.isFailToInitDB()) {
      return undefined
    }
    return this.getDB().executeQuery(query)
      .catch((err) => {
        errorMsg && this.logger?.error(errorMsg, err)
        return undefined
      }) as any
  }

  /**
   * compile query builder
   */
  public async toSQL<T extends Compilable>(cb: (db: Kysely<DB>) => T): Promise<CompiledQuery<unknown>> {
    return cb(this.kysely).compile()
  }

  /**
   * execute raw sql, auto detect transaction
   * @see {@link Sql}
   */
  public async raw<O = any>(rawSql: (s: Sql) => RawBuilder<O>): Promise<QueryResult<O> | undefined> {
    if (await this.isFailToInitDB()) {
      return undefined
    }
    return rawSql(sql).execute(this.getDB())
  }

  /**
   * destroy db connection
   */
  public async destroy() {
    await this.kysely.destroy()
    this.status = 'destroy'
    this.tableMap.clear()
    this.trxs.clear()
  }
}
