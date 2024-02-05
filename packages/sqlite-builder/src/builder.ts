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
  runWithSavePoint,
} from 'kysely-sqlite-utils'
import type { Promisable } from '@subframe7536/type-utils'
import type {
  AvailableBuilder,
  DBLogger,
  SqliteBuilderOptions,
  StatusResult,
  TableUpdater,
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

type TransactionOptions<T> = {
  errorMsg?: string
  /**
   * after commit hook
   */
  onCommit?: (result: T) => Promisable<void>
  /**
   * after rollback hook
   */
  onRollback?: (err: unknown) => Promisable<void>
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

    this.kysely = new Kysely<DB>({ dialect, log, plugins })
  }

  /**
   * sync db schema
   * @param updater sync table function, built-in: {@link useSchema}, {@link useMigrator}
   * @param checkIntegrity whether to check integrity
   * @example
   * import { SqliteBuilder } from 'kysely-sqlite-builder'
   * import { defineLiteral, defineObject, defineTable, useSchema } from 'kysely-sqlite-builder/schema'
   * import type { InferDatabase } from 'kysely-sqlite-builder/schema'
   * // schemas for AutoSyncTables
   * const testTable = defineTable({
   *   id: { type: 'increments' },
   *   person: { type: 'object', defaultTo: { name: 'test' } },
   *   gender: { type: 'boolean', notNull: true },
   *   str: defineLiteral<'str1' | 'str2'>('str1'),
   *   array: defineObject<string[]>().NotNull(),
   *   buffer: { type: 'blob' },
   * }, {
   *   primary: 'id',
   *   index: ['person', ['id', 'gender']],
   *   timeTrigger: { create: true, update: true },
   * })
   *
   * const baseTables = {
   *   test: testTable,
   * }
   *
   * // infer type from baseTables
   * type DB = InferDatabase<typeof baseTables>
   *
   * const db = new SqliteBuilder<DB>({
   *   dialect: new SqliteDialect({
   *     database: new Database(':memory:'),
   *   }),
   *   logger: console,
   *   onQuery: true,
   * })
   *
   * // update tables using syncTable
   * await db.updateTableSchema(useSchema(baseTables, { logger: false }))
   *
   * import { useMigrator } from 'kysely-sqlite-builder'
   * import { FileMigrationProvider } from 'kysely'
   *
   * // update tables using MigrationProvider and migrate to latest
   * await db.updateTableSchema(useMigrator(new FileMigrationProvider(...)))
   */
  public async updateTableSchema(updater: TableUpdater, checkIntegrity?: boolean): Promise<StatusResult> {
    try {
      if (checkIntegrity && !(await runCheckIntegrity(this.kysely))) {
        this.logger?.error('integrity check fail')
        return { ready: false, error: new IntegrityError() }
      }
      const result = await updater(this.kysely, this.logger)
      this.logger?.info('table updated')
      return result
    } catch (error) {
      this.logError(error, 'sync table fail')
      return {
        ready: false,
        error,
      }
    }
  }

  /**
   * get current db instance, auto detect transaction
   */
  private getDB() {
    return this.trx || this.kysely
  }

  private logError(e: unknown, errorMsg?: string) {
    errorMsg && this.logger?.error(errorMsg, e instanceof Error ? e : undefined)
  }

  /**
   * run in transaction, support nest call (using `savepoint`)
   */
  public async transaction<O>(
    fn: (trx: Transaction<DB>) => Promise<O>,
    options: TransactionOptions<O> = {},
  ): Promise<O | undefined> {
    if (!this.trx) {
      return await this.kysely.transaction()
        .execute(async (trx) => {
          this.trx = trx
          this.logger?.debug('run in transaction')
          return await fn(trx)
        })
        .then(async (result) => {
          await options.onCommit?.(result)
          return result
        })
        .catch(async (e) => {
          await options.onRollback?.(e)
          this.logError(e, options.errorMsg)
          return undefined
        })
        .finally(() => this.trx = undefined)
    }

    this.trxCount++
    this.logger?.debug(`run in savepoint: sp_${this.trxCount}`)
    return await runWithSavePoint(this.trx!, fn, `sp_${this.trxCount}`)
      .then(async (result) => {
        await options.onCommit?.(result)
        return result
      })
      .catch(async (e) => {
        await options.onRollback?.(e)
        this.logError(e, options.errorMsg)
        return undefined
      })
      .finally(() => this.trxCount--)
  }

  /**
   * execute and return result list, auto detect transaction
   */
  public async execute<O>(
    query: CompiledQuery<O>,
  ): Promise<QueryResult<O>>
  public async execute<O>(
    fn: (db: Kysely<DB> | Transaction<DB>) => AvailableBuilder<DB, O>,
  ): Promise<Simplify<O>[] | undefined>
  public async execute<O>(
    data: CompiledQuery<O> | ((db: Kysely<DB> | Transaction<DB>) => AvailableBuilder<DB, O>),
  ): Promise<QueryResult<O> | Simplify<O>[] | undefined> {
    return typeof data === 'function'
      ? await data(this.getDB()).execute()
      : await this.getDB().executeQuery(data)
  }

  /**
   * execute and return first result, auto detect transaction
   *
   * if is `select`, auto append `.limit(1)`
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
   * design for better performance, details: {@link precompileQuery}
   */
  public precompile<O>(
    queryBuilder: (db: Kysely<DB>) => QueryBuilderOutput<Compilable<O>>,
  ): ReturnType<typeof precompileQuery<O>> {
    this.logger?.debug?.('precompile')
    return precompileQuery(queryBuilder(this.kysely), this.serializer)
  }

  /**
   * execute raw sql, auto detect transaction
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
   * @param rebuild if is true, run `vacuum` instead of `pragma optimize`
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
