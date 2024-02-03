import type {
  LogEvent,
  RootOperationNode,
} from 'kysely'

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
   *
   * e.g. from `select ? from ?` to `select name from user`
   */
  merge?: boolean
  /**
   * whether to log queryNode
   */
  queryNode?: boolean
}

/**
 * util for `KyselyConfig.log`, log on every execution
 * @example
 * import { Kysely } from 'kysely'
 * import { createKyselyLogger } from 'kysely-sqlite-utils'
 *
 * const db = new Kysely<DB>({
 *   dialect,
 *   log: createKyselyLogger({
 *     logger: console.log,
 *     merge: true,
 *   })
 * })
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
        _sql = _sql.replace('?', typeof param === 'string' ? param : JSON.stringify(param))
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
