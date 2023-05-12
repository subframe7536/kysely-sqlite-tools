import type { Compilable, CompiledQuery, KyselyPlugin, LogEvent, QueryResult, RawBuilder, Sql, Transaction } from 'kysely'
import { Kysely, sql } from 'kysely'
import { SqliteSerializePlugin } from 'kysely-plugin-serialize'
import { parseTableMap, runCreateTable } from './util'
import type { ITable, SqliteBuilderOption } from './types'

const enum DBStatus {
  'needDrop',
  'noNeedDrop',
  'ready',
}
export class SqliteBuilder<DB extends Record<string, any>> {
  public kysely: Kysely<DB>
  #status: DBStatus
  readonly #tableMap: Map<string, ITable<DB[Extract<keyof DB, string>]>>
  public constructor(option: SqliteBuilderOption<DB>) {
    const { dialect, tables, dropTableBeforeInit: truncateBeforeInit, onError, onQuery, plugins: additionalPlugin } = option
    const plugins: KyselyPlugin[] = [new SqliteSerializePlugin()]
    additionalPlugin && plugins.push(...additionalPlugin)
    this.kysely = new Kysely<DB>({
      dialect,
      log: (event: LogEvent) => {
        event.level === 'error'
          ? (onError && onError(event.error))
          : (onQuery && onQuery(event.query, event.queryDurationMillis))
      },
      plugins,
    })
    this.#status = truncateBeforeInit
      ? DBStatus.needDrop
      : DBStatus.noNeedDrop
    this.#tableMap = parseTableMap(tables)
  }

  public async init(dropTableBeforeInit = false): Promise<SqliteBuilder<DB>> {
    const drop = dropTableBeforeInit || this.#status === DBStatus.needDrop
    await runCreateTable(this.kysely, this.#tableMap, drop)
    this.#status = DBStatus.ready
    return this
  }

  private async checkInit() {
    this.#status !== DBStatus.ready && await this.init()
    if (this.#status !== DBStatus.ready) {
      throw new Error('fail to init table')
    }
  }

  public async transaction<T>(
    cb: (trx: Transaction<DB>) => Promise<T>,
    errorLog = false,
  ): Promise<T | undefined> {
    await this.checkInit()
    return await this.kysely.transaction().execute(cb)
      .catch((err) => {
        errorLog && console.error(err)
        return undefined
      })
  }

  public async exec<T>(
    cb: (db: Kysely<DB>) => Promise<T>,
    errorLog = false,
  ): Promise<T | undefined> {
    await this.checkInit()
    return cb(this.kysely)
      .catch((err) => {
        errorLog && console.error(err)
        return undefined
      })
  }

  public async toSQL<T extends Compilable>(cb: (db: Kysely<DB>) => T): Promise<CompiledQuery<unknown>> {
    await this.checkInit()
    return cb(this.kysely).compile()
  }

  public async raw<T = any>(rawSql: (s: Sql) => RawBuilder<T>): Promise<QueryResult<T>> {
    await this.checkInit()
    return rawSql(sql).execute(this.kysely)
  }
}
