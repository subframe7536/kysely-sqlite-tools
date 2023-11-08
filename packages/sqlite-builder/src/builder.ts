import type {
  Compilable,
  QueryResult,
  RawBuilder,
  SelectQueryBuilder,
  Simplify,
  Transaction,
} from 'kysely'
import { CompiledQuery, Kysely } from 'kysely'
import { SerializePlugin, defaultSerializer } from 'kysely-plugin-serialize'
import type { QueryBuilderOutput } from 'kysely-sqlite-utils'
import {
  createKyselyLogger,
  precompileQuery,
  checkIntegrity as runCheckIntegrity,
  savePoint,
} from 'kysely-sqlite-utils'
import type {
  AvailableBuilder,
  DBLogger,
  SqliteBuilderOptions,
  StatusResult,
  SyncTableFn,
} from './types'

export class IntegrityError extends Error {
  constructor() {
    super('db file maybe broken')
  }
}

function isSelectQueryBuilder<DB, O>(
  builder: AvailableBuilder<DB, O>,
): builder is SelectQueryBuilder<DB, any, O> {
  return builder.toOperationNode().kind === 'SelectQueryNode'
}

export class SqliteBuilder<DB extends Record<string, any>> {
  public kysely: Kysely<DB>
  public trxCount = 0
  private trx?: Transaction<DB>
  private logger?: DBLogger
  private serializer = defaultSerializer

  /**
   * sqlite builder
   * @param options options
   */
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
    plugins.push(new SerializePlugin(serializerPluginOptions))

    let log
    if (onQuery === true) {
      log = createKyselyLogger({
        logger: this.logger?.debug || console.log,
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
   * sync db schema
   * @param syncFn sync table function, built-in: {@link createAutoSyncSchemaFn}, {@link createMigrateFn}
   * @param checkIntegrity whether to check integrity
   * @example
   * usage of `createAutoSyncSchemaFn`:
   * ```
   * import {
   *   SqliteBuilder,
   *   createAutoSyncSchemaFn,
   *   defineLiteral,
   *   defineObject,
   *   defineTable
   * } from 'kysely-sqlite-builder'
   *
   * const testTable = defineTable({
   *   id: { type: 'increments' },
   *   person: { type: 'object', defaultTo: { name: 'test' } },
   *   gender: { type: 'boolean', notNull: true },
   *   array: defineObject<string[]>().NotNull(),
   *   literal: defineLiteral<'l1' | 'l2'>('l1'),
   *   buffer: { type: 'blob' },
   * }, {
   *   primary: 'id',
   *   index: ['person', ['id', 'gender']],
   *   timeTrigger: { create: true, update: true },
   * })
   * await db.syncSchema(createAutoSyncSchemaFn(
   *   { test: testTable },
   *   { log: false }
   * ))
   * ```
   */
  public async syncSchema(syncFn: SyncTableFn, checkIntegrity?: boolean): Promise<StatusResult> {
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
    return this.trxCount ? this.trx! : this.kysely
  }

  private logError(e: unknown, errorMsg?: string) {
    errorMsg && this.logger?.error(errorMsg, e instanceof Error ? e : undefined)
    return undefined
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
            return await fn(trx)
          })
      } catch (e) {
        return this.logError(e, errorMsg)
      } finally {
        this.trx = undefined
      }
    }
    this.trxCount++
    const _db = this.getDB()
    const sp = await savePoint(_db, `sp_${this.trxCount}`)
    this.logger?.debug(`run in savepoint:${this.trxCount}`)

    try {
      const result = await fn(_db as Transaction<DB>)
      await sp.release()
      this.trxCount--
      return result
    } catch (e) {
      await sp.rollback()
      this.trxCount--
      return this.logError(e, errorMsg)
    }
  }

  /**
   * execute and return result list,
   * auto detect transaction, auto catch error
   */
  public async execute<O>(
    fn: (db: Kysely<DB> | Transaction<DB>) => AvailableBuilder<DB, O>,
  ): Promise<Simplify<O>[] | undefined> {
    return await fn(this.getDB()).execute()
  }

  /**
   * execute and return first result,
   * auto detect transaction, auto catch error
   *
   * if is select, auto append `.limit(1)`
   */
  public async executeTakeFirst<O>(
    fn: (db: Kysely<DB> | Transaction<DB>) => AvailableBuilder<DB, O>,
  ): Promise<Simplify<O> | undefined> {
    let _sql = fn(this.getDB())
    if (isSelectQueryBuilder(_sql)) {
      _sql = _sql.limit(1)
    }
    return await _sql.executeTakeFirstOrThrow()
  }

  /**
   * precompile query, call it with different params later
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
  ): Promise<QueryResult<O>> {
    return await this.getDB().executeQuery(query)
  }

  /**
   * run {@link execCompiled} and get its rows,
   * auto detect transaction, auto catch error
   */
  public async executeCompiledTakeList<O>(
    query: CompiledQuery<O>,
  ): Promise<O[]> {
    return (await this.executeCompiled(query)).rows
  }

  /**
   * execute raw sql,
   * auto detect transaction, auto catch error
   */
  public async raw<O = unknown>(
    rawSql: RawBuilder<O>,
  ): Promise<QueryResult<O | unknown>>
  public async raw<O = unknown>(
    rawSql: string,
    parameters?: unknown[]
  ): Promise<QueryResult<O | unknown>>
  public async raw<O = unknown>(
    rawSql: RawBuilder<O> | string,
    parameters?: unknown[],
  ): Promise<QueryResult<O | unknown>> {
    return typeof rawSql === 'string'
      ? await this.getDB().executeQuery(CompiledQuery.raw(rawSql, parameters))
      : await rawSql.execute(this.getDB())
  }

  /**
   * optimize db file
   * @param rebuild run `vacuum` instead of `pragma optimize`
   * @see https://sqlite.org/pragma.html#pragma_optimize
   * @see https://www.sqlite.org/lang_vacuum.html
   */
  public async optimize(rebuild?: boolean) {
    await this.raw(rebuild ? 'vacuum' : 'pragma optimize')
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
