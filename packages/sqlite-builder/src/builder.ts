import type { Compilable, CompiledQuery, KyselyPlugin, LogEvent, QueryResult, RawBuilder, Simplify, Sql, Transaction } from 'kysely'
import { Kysely, sql } from 'kysely'
import { SqliteSerializePlugin } from 'kysely-plugin-serialize'
import { parseTableMap, runCreateTable } from './util'
import type { AvailableBuilder, ITable, Logger, SqliteBuilderOption } from './types'

const enum DBStatus {
  'needDrop',
  'noNeedDrop',
  'ready',
}
export class SqliteBuilder<DB extends Record<string, any>> {
  public kysely: Kysely<DB>
  private status: DBStatus
  private tableMap: Map<string, ITable<DB[Extract<keyof DB, string>]>>
  private logger?: Logger
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
      ? DBStatus.needDrop
      : DBStatus.noNeedDrop
    this.tableMap = parseTableMap(tables)
  }

  public async init(dropTableBeforeInit = false): Promise<SqliteBuilder<DB>> {
    const drop = dropTableBeforeInit || this.status === DBStatus.needDrop
    await runCreateTable(this.kysely, this.tableMap, drop)
    this.status = DBStatus.ready
    return this
  }

  private async isEmptyTable(): Promise<boolean> {
    this.status !== DBStatus.ready && await this.init()
    if (this.status === DBStatus.ready) {
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
    return await this.kysely.transaction().execute(cb)
      .catch((err) => {
        errorMsg && this.logger?.error(errorMsg, err)
        return undefined
      })
  }

  public async exec<T>(
    cb: (db: Kysely<DB>) => Promise<T>,
    errorMsg?: string,
  ): Promise<T | undefined> {
    if (await this.isEmptyTable()) {
      return undefined
    }
    return cb(this.kysely)
      .catch((err) => {
        errorMsg && this.logger?.error(errorMsg, err)
        return undefined
      })
  }

  public async execOne<O>(
    cb: (db: Kysely<DB>) => AvailableBuilder<DB, O>,
    errorMsg?: string,
  ): Promise<Simplify<O> | undefined> {
    if (await this.isEmptyTable()) {
      return undefined
    }
    return cb(this.kysely).executeTakeFirstOrThrow()
      .catch((err) => {
        errorMsg && this.logger?.error(errorMsg, err)
        return undefined
      })
  }

  public async execList<O>(
    cb: (db: Kysely<DB>) => AvailableBuilder<DB, O>,
    errorMsg?: string,
  ): Promise<Simplify<O>[] | undefined> {
    if (await this.isEmptyTable()) {
      return undefined
    }
    return cb(this.kysely).execute()
      .catch((err) => {
        errorMsg && this.logger?.error(errorMsg, err)
        return undefined
      })
  }

  public async toSQL<T extends Compilable>(cb: (db: Kysely<DB>) => T): Promise<CompiledQuery<unknown>> {
    return cb(this.kysely).compile()
  }

  public async raw<T = any>(rawSql: (s: Sql) => RawBuilder<T>): Promise<QueryResult<T> | undefined> {
    if (await this.isEmptyTable()) {
      return undefined
    }
    return rawSql(sql).execute(this.kysely)
  }
}
