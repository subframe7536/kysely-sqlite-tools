import type {
  Compilable,
  QueryResult,
  RawBuilder,
  Simplify,
  Transaction,
} from 'kysely'
import { CompiledQuery, Kysely } from 'kysely'
import { SqliteSerializePlugin, defaultSerializer } from 'kysely-plugin-serialize'
import {
  createKyselyLogger,
  isSelectQueryBuilder,
  precompileQuery,
  checkIntegrity as runCheckIntegrity,
  savePoint,
} from './utils'
import type {
  AvailableBuilder,
  DBLogger,
  QueryBuilderOutput,
  SqliteBuilderOptions,
  StatusResult,
  SyncTableFn,
} from './types'

export class IntegrityError extends Error {
  constructor() {
    super('db file maybe broken')
  }
}

export class SqliteBuilder<DB extends Record<string, any>> {
  public kysely: Kysely<DB>
  public trxCount = 0
  private trx?: Transaction<DB>
  private logger?: DBLogger
  private serializer = defaultSerializer

  constructor(options: SqliteBuilderOptions) {
    const {
      dialect,
      logger,
      onQuery,
      plugins = [],
      serializerPluginOptions,
    } = options
    this.logger = logger

    if (serializerPluginOptions?.serializer) {
      this.serializer = serializerPluginOptions.serializer
    }
    plugins.push(new SqliteSerializePlugin(serializerPluginOptions))

    let log
    if (onQuery === true) {
      log = createKyselyLogger({
        logger: console.log,
        merge: true,
      })
    } else if (onQuery) {
      log = createKyselyLogger(onQuery)
    }

    this.kysely = new Kysely<DB>({
      dialect,
      log,
      plugins,
    })
  }

  /**
   * update the db tables
   * @param syncFn sync table, built-in: {@link createSyncTableFn}, {@link createMigrateFn}
   * @param checkIntegrity whether to check integrity
   */
  public async updateTables(
    syncFn: SyncTableFn,
    checkIntegrity?: boolean,
  ): Promise<StatusResult> {
    try {
      if (checkIntegrity && !(await runCheckIntegrity(this.kysely))) {
        this.logger?.error('integrity check fail')
        return { ready: false, error: new IntegrityError() }
      }
      await syncFn(this.kysely, this.logger)
    } catch (error) {
      this.logError(error, 'sync table fail')
      return {
        ready: false,
        error,
      }
    }
    this.logger?.info('table updated')
    return { ready: true }
  }

  private getDB() {
    return this.trx || this.kysely
  }

  private logError(e: unknown, errorMsg?: string) {
    errorMsg && this.logger?.error(errorMsg, e instanceof Error ? e : undefined)
  }

  /**
   * run in transaction, support nest call (using savepoint)
   */
  public async transaction<O>(
    fn: (trx: Transaction<DB>) => Promise<O>,
    errorMsg?: string,
  ): Promise<O | undefined> {
    if (!this.trx) {
      try {
        return await this.kysely
          .transaction()
          .execute(async (trx) => {
            this.trx = trx
            this.logger?.debug('run in transaction')
            const result = await fn(trx)
            return result
          })
      } catch (e) {
        this.logError(e, errorMsg)
        return undefined
      } finally {
        this.trx = undefined
      }
    }
    this.trxCount++
    const _db = this.getDB()
    const sp = await savePoint(_db, `sp_${this.trxCount}`)
    this.logger?.debug(`run in savepoint:${this.trxCount}`)

    try {
      // @ts-expect-error _db assert Transaction
      const result = await fn(_db)
      await sp.release()
      this.trxCount--
      return result
    } catch (e) {
      await sp.rollback()
      this.logError(e, errorMsg)
      this.trxCount--
      return undefined
    }
  }

  /**
   * execute and return result list,
   * auto detect transaction, auto catch error
   */
  public async execute<O>(
    fn: (db: Kysely<DB> | Transaction<DB>) => AvailableBuilder<DB, O>,
    errorMsg?: string,
  ): Promise<Simplify<O>[] | undefined> {
    try {
      return await fn(this.getDB()).execute()
    } catch (e) {
      this.logError(e, errorMsg)
      return undefined
    }
  }

  /**
   * execute and return first result,
   * auto detect transaction, auto catch error
   */
  public async executeTakeFirst<O>(
    fn: (db: Kysely<DB> | Transaction<DB>) => AvailableBuilder<DB, O>,
    errorMsg?: string,
  ): Promise<Simplify<O> | undefined> {
    try {
      let _sql = fn(this.getDB())
      if (isSelectQueryBuilder(_sql)) {
        _sql = _sql.limit(1)
      }
      return await _sql.executeTakeFirstOrThrow()
    } catch (e) {
      this.logError(e, errorMsg)
      return undefined
    }
  }

  /**
   * precompile query, call it later
   *
   * used for better performance, details: {@link precompileQuery}
   */
  public precompile<O>(
    queryBuilder: (db: Kysely<DB>) => QueryBuilderOutput<Compilable<O>>,
  ): ReturnType<typeof precompileQuery<O>> {
    this.logger?.debug?.('precompile')
    return precompileQuery(queryBuilder(this.kysely), this.serializer)
  }

  /**
   * exec compiled query, return result,
   * auto detect transaction, auto catch error
   */
  public async executeCompiled<O>(
    query: CompiledQuery<O>,
    errorMsg?: string,
  ): Promise<QueryResult<O> | undefined> {
    try {
      return await this.getDB().executeQuery(query)
    } catch (e) {
      this.logError(e, errorMsg)
      return undefined
    }
  }

  /**
   * run {@link execCompiled} and get its rows,
   * auto detect transaction, auto catch error
   */
  public async executeCompiledTakeList<O>(
    query: CompiledQuery<O>,
    errorMsg?: string,
  ): Promise<O[] | undefined> {
    const ret = await this.executeCompiled(query, errorMsg)
    return ret?.rows
  }

  /**
   * execute raw sql,
   * auto detect transaction, auto catch error
   */
  public async raw<O = unknown>(
    rawSql: RawBuilder<O> | string,
    errorMsg?: string,
  ): Promise<QueryResult<O | unknown> | undefined> {
    try {
      return typeof rawSql === 'string'
        ? await this.getDB().executeQuery(CompiledQuery.raw(rawSql))
        : await rawSql.execute(this.getDB())
    } catch (e) {
      this.logError(e, errorMsg)
      return undefined
    }
  }

  /**
   * destroy db connection
   */
  public async destroy() {
    this.logger?.info('destroyed')
    await this.kysely.destroy()
    this.trx = undefined
  }
}