import { CompiledQuery, Migrator, sql } from 'kysely'
import type {
  Compilable,
  DatabaseConnection,
  Kysely,
  LogEvent,
  MigrationProvider,
  MigratorProps,
  RootOperationNode,
  SelectQueryBuilder,
  Transaction,
} from 'kysely'
import type { AvailableBuilder, QueryBuilderOutput, SyncTableFn } from './types'

function getParam<T extends Record<string, any>>(name: keyof T): T[keyof T] {
  return `__precomile_${name as string}` as unknown as T[keyof T]
}
type SetParam<O, T extends Record<string, any>> = {
  /**
   * query builder for setup params
   */
  qb: QueryBuilderOutput<Compilable<O>>
  /**
   * param builder
   */
  param: typeof getParam<T>
}
/**
 * @param param custom params
 * @param processRootOperatorNode process `query` in {@link CompiledQuery},
 * default is `(node) => ({ kind: node.kind })`
 */
type CompileFn<O, T extends Record<string, any>> = (
  param: T,
  processRootOperatorNode?: ((node: RootOperationNode) => RootOperationNode)
) => CompiledQuery<QueryBuilderOutput<O>>

/**
 * create precompiled query,
 * inspired by {@link https://github.com/jtlapp/kysely-params kysely-params},
 * included in `SqliteBuilder`
 * @param queryBuilder query builder without params
 * @param serializer custom parameter value serializer
 * @example
 * ```ts
 * const query = precompileQuery(
 *   db.selectFrom('test').selectAll(),
 * ).setParam<{ name: string }>((qb, param) =>
 *   qb.where('name', '=', param('name')),
 * )
 * const compiledQuery = query({ name: 'test' })
 * // {
 * //   sql: 'select * from "test" where "name" = ?',
 * //   parameters: ['test'],
 * //   query: { kind: 'SelectQueryNode' } // only node kind by default
 * // }
 * ```
 */
export function precompileQuery<O>(
  queryBuilder: QueryBuilderOutput<Compilable<O>>,
  serializer: (value: unknown) => unknown = v => v,
) {
  return {
    /**
     * setup params
     * @param paramBuilder param builder
     * @returns function to {@link CompileFn compile}
     */
    setParam: <T extends Record<string, any>>(
      paramBuilder: ({ param, qb }: SetParam<O, T>) => Compilable<O>,
    ): CompileFn<O, T> => {
      let compiled: CompiledQuery<Compilable<O>>
      return (param, processRootOperatorNode) => {
        if (!compiled) {
          const { parameters, sql, query } = paramBuilder({
            qb: queryBuilder,
            param: getParam,
          }).compile()
          compiled = {
            sql,
            query: processRootOperatorNode?.(query) || { kind: query.kind } as any,
            parameters,
          }
        }
        return {
          ...compiled,
          parameters: compiled.parameters.map(p => (typeof p === 'string' && p.startsWith('__precomile_'))
            ? serializer(param[p.slice(12)])
            : p,
          ),
        }
      }
    },
  }
}

/**
 * check integrity_check pragma
 */
export async function checkIntegrity(db: Kysely<any>): Promise<boolean> {
  const result = await sql`PRAGMA integrity_check`.execute(db)
  // @ts-expect-error result
  return result.rows[0].integrity_check === 'ok'
}

/**
 * get or set user_version pragma
 */
export async function getOrSetDBVersion(
  db: Kysely<any>,
  version?: number,
): Promise<number | undefined> {
  if (version) {
    await sql`PRAGMA user_version = ${sql.raw(`${version}`)}`.execute(db)
    return version
  }
  const result = await sql`PRAGMA user_version`.execute(db)
  // @ts-expect-error result
  return result.rows[0].user_version
}

export type SavePoint = {
  release: () => Promise<void>
  rollback: () => Promise<void>
}

/**
 * create savepoint, release or rollback it later,
 * included in `SqliteBuilder`
 * @example
 * ```ts
 * const sp = await savePoint(db, 'savepoint_1')
 * try {
 *   // do something...
 *   await sp.release()
 * } catch (e) {
 *   await sp.rollback()
 * }
 * ```
 */
export async function savePoint(
  db: Kysely<any> | Transaction<any>,
  name?: string,
): Promise<SavePoint> {
  const _name = name || `sp_${Date.now() % 1e8}`
  await sql`savepoint ${sql.raw(_name)}`.execute(db)
  return {
    release: async () => {
      await sql`release savepoint ${sql.raw(_name)}`.execute(db)
    },
    rollback: async () => {
      await sql`rollback to savepoint ${sql.raw(_name)}`.execute(db)
    },
  }
}

export type LoggerParams = {
  sql: string
  params: readonly unknown[]
  duration: number
  queryNode?: RootOperationNode
  error?: unknown
}

export type LoggerOptions = {
  /**
   * log functions
   */
  logger: (data: LoggerParams) => void
  /**
   * whether to merge parameters into sql
   */
  merge?: boolean
  /**
   * whether to log queryNode
   */
  queryNode?: boolean
}

/**
 * util for `dialect.log`
 */
export function createKyselyLogger(
  options: LoggerOptions,
): (event: LogEvent) => void {
  const { logger, merge, queryNode } = options

  return (event: LogEvent) => {
    const { level, queryDurationMillis, query: { parameters, sql, query } } = event
    const err = level === 'error' ? event.error : undefined
    let _sql = sql.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ')
    if (merge) {
      parameters.forEach((param) => {
        _sql = _sql.replace('?', JSON.stringify(param))
      })
    }
    const param: LoggerParams = {
      sql: _sql,
      params: parameters,
      duration: queryDurationMillis,
      error: err,
    }
    if (queryNode) {
      param.queryNode = query
    }
    logger(param)
  }
}

export function isSelectQueryBuilder<DB, O>(
  builder: AvailableBuilder<DB, O>,
): builder is SelectQueryBuilder<DB, any, O> {
  return builder.toOperationNode().kind === 'SelectQueryNode'
}

export type OptimizePragmaOptions = {
  cacheSize?: number
  pageSize?: number
}

/**
 * call optimze pragma, include:
 * - cache_size = `options.cacheSize` || 4096
 * - page_size = `options.pageSize` || 32768
 * - journel_mode = WAL
 * - temp_store = MEMORY
 * - synchronous = NORMAL
 */
export async function optimzePragma(
  conn: DatabaseConnection,
  options: OptimizePragmaOptions = {},
): Promise<void> {
  const { cacheSize = 4096, pageSize = 32768 } = options
  const exec = async (sql: string) => await conn.executeQuery(CompiledQuery.raw(sql))
  await exec(`PRAGMA cache_size = ${cacheSize};`)
  await exec('PRAGMA journal_mode = WAL;')
  await exec('PRAGMA temp_store = MEMORY;')
  await exec('PRAGMA synchronous = NORMAL;')
  await exec(`PRAGMA page_size = ${pageSize};`)
}

/**
 * migrate to latest
 */
export function createMigrateFn(
  provider: MigrationProvider,
  options?: Omit<MigratorProps, 'db' | 'provider'>,
): SyncTableFn {
  return async (db: Kysely<any>) => {
    const _ = new Migrator({ db, provider, ...options })
    await _.migrateToLatest()
  }
}
