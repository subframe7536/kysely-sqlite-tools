import type { Compilable, CompiledQuery, KyselyPlugin, LogEvent, QueryResult, RawBuilder, Sql, Transaction } from 'kysely'
import { Kysely, sql } from 'kysely'
import { SqliteSerializePlugin } from 'kysely-plugin-serialize'
import type { SimplifySingleResult } from 'kysely/dist/cjs/util/type-utils'
import { parseTableMap, preCompile, runCreateTable } from './utils'
import type { AvailableBuilder, BuilderResult, Logger, QueryBuilderOutput, SqliteBuilderOption, Table } from './types'
import { Stack } from './stack'

type DBStatus =
 | 'needDrop'
 | 'noNeedDrop'
 | 'ready'

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

  private async isEmptyTable(): Promise<boolean> {
    this.status !== 'ready' && await this.init()
    if (this.status === 'ready') {
      return false
    }
    this.logger?.error('fail to init table')
    return true
  }

  public async transaction<T>(
    cb: (trx: Transaction<DB>) => Promise<T>,
    errorMsg?: string,
  ): Promise<T | undefined> {
    if (await this.isEmptyTable()) {
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

  public async exec<O>(
    cb: (db: Kysely<DB> | Transaction<DB>) => Promise<O>,
    errorMsg?: string,
  ): Promise<O | undefined> {
    if (await this.isEmptyTable()) {
      return undefined
    }
    return cb(this.getDB())
      .catch((err) => {
        errorMsg && this.logger?.error(errorMsg, err)
        return undefined
      })
  }

  public async execOne<O>(
    cb: (db: Kysely<DB> | Transaction<DB>) => AvailableBuilder<DB, O>,
    errorMsg?: string,
  ): Promise<SimplifySingleResult<O> | undefined> {
    const resultList = await this.execList(cb, errorMsg)
    return resultList?.length ? resultList[0] : undefined
  }

  public async execList<O>(
    cb: (db: Kysely<DB> | Transaction<DB>) => AvailableBuilder<DB, O>,
    errorMsg?: string,
  ): Promise<Exclude<SimplifySingleResult<O>, undefined>[] | undefined> {
    if (await this.isEmptyTable()) {
      return undefined
    }
    return cb(this.getDB())
      .execute()
      .catch((err) => {
        errorMsg && this.logger?.error(errorMsg, err)
        return undefined
      }) as any
  }

  public preCompile<O>(
    queryBuilder: (db: Kysely<DB> | Transaction<DB>) => QueryBuilderOutput<Compilable<O>>,
  ): ReturnType<typeof preCompile<O>> {
    return preCompile(queryBuilder(this.kysely))
  }

  public async execCompiledRows<O>(
    query: CompiledQuery<O>,
    errorMsg?: string,
  ): Promise<BuilderResult<O>['rows'] | undefined> {
    const result = await this.execCompiled(query, errorMsg)
    return result?.rows ?? undefined
  }

  public async execCompiled<O>(
    query: CompiledQuery<O>,
    errorMsg?: string,
  ): Promise<BuilderResult<O> | undefined> {
    if (await this.isEmptyTable()) {
      return undefined
    }
    return this.getDB().executeQuery(query)
      .catch((err) => {
        errorMsg && this.logger?.error(errorMsg, err)
        return undefined
      }) as any
  }

  public async toSQL<T extends Compilable>(cb: (db: Kysely<DB>) => T): Promise<CompiledQuery<unknown>> {
    return cb(this.getDB()).compile()
  }

  public async raw<T = any>(rawSql: (s: Sql) => RawBuilder<T>): Promise<QueryResult<T> | undefined> {
    if (await this.isEmptyTable()) {
      return undefined
    }
    return rawSql(sql).execute(this.getDB())
  }
}
