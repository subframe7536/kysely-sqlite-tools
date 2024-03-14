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
   * whether to merge parameters into sql, use `JSON.stringify` to serialize params
   *
   * e.g. from `select ? from ?` to `select "name" from "user"`
   */
  merge?: boolean
  /**
   * whether to log queryNode
   */
  logQueryNode?: boolean
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
  const { logger, merge, logQueryNode } = options

  return (event: LogEvent) => {
    const { level, queryDurationMillis, query: { parameters, sql, query } } = event
    const questionMarker = '__Q__'
    const err = level === 'error' ? event.error : undefined
    let _sql = sql.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ')
    if (merge) {
      parameters.forEach((param) => {
        let data: any = param
        if (param instanceof Date) {
          data = param.toLocaleString()
        }
        if (typeof data === 'string') {
          data = `'${data}'`.replace(/\?/g, questionMarker)
        }
        _sql = _sql.replace(/\?/, data)
      })
    }
    const param: LoggerParams = {
      sql: _sql.replace(new RegExp(questionMarker, 'g'), '?'),
      params: parameters,
      duration: queryDurationMillis,
      error: err,
    }
    if (logQueryNode) {
      param.queryNode = query
    }
    logger(param)
  }
}
