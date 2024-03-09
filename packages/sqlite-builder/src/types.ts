import type {
  DeleteQueryBuilder,
  Dialect,
  InsertQueryBuilder,
  Kysely,
  KyselyPlugin,
  SelectQueryBuilder,
  UpdateQueryBuilder,
} from 'kysely'
import type { SerializePluginOptions } from 'kysely-plugin-serialize'
import type { LoggerOptions, SqliteExecutorFn } from 'kysely-sqlite-utils'
import type { IntegrityError } from './builder'

export interface SqliteBuilderOptions<T extends Record<string, any>, Extra extends Record<string, any>> {
  dialect: Dialect
  /**
   * call on `dialect.log`, wrapped with `createKyselyLogger`
   *
   * if value is `true`, logger is `console.log` and `merge: true`
   */
  onQuery?: boolean | LoggerOptions
  /**
   * additional plugins
   *
   * **do NOT use camelCase plugin with useSchema**, this will lead to sync table fail
   */
  plugins?: KyselyPlugin[]
  /**
   * db logger
   */
  logger?: DBLogger
  /**
   * options for serializer plugin
   */
  serializerPluginOptions?: SerializePluginOptions
  /**
   * custom executor
   * @example
   * import { createSoftDeleteExecutorFn } from 'kysely-sqlite-builder/utils'
   *
   * const softDeleteExecutorFn = createSoftDeleteExecutorFn({
   *   deleteColumn: 'isDeleted',
   *   deleteValue: 1,
   *   notDeleteValue: 0,
   * })
   * const db = new SqliteBuilder({
   *   dialect,
   *   executorFn: softDeleteExecutorFn,
   * })
   */
  executorFn?: SqliteExecutorFn<T, Extra>
}
export type DBLogger = {
  trace?: (args: any) => void
  debug: (args: any) => void
  info: (msg: any) => void
  warn: (msg: any) => void
  error: (msg: any, e?: Error) => void
}

export type AvailableBuilder<DB, O> =
  | SelectQueryBuilder<DB, any, O>
  | UpdateQueryBuilder<DB, any, any, O>
  | InsertQueryBuilder<DB, any, O>
  | DeleteQueryBuilder<DB, any, O>

export type StatusResult =
  | { ready: true }
  | { ready: false, error: IntegrityError | unknown }

export type TableUpdater = (db: Kysely<any>, logger?: DBLogger) => Promise<StatusResult>
