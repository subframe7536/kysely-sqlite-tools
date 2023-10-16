import type {
  Compilable,
  DeleteQueryBuilder,
  Dialect,
  InsertQueryBuilder,
  Kysely,
  KyselyPlugin,
  SelectQueryBuilder,
  UpdateQueryBuilder,
} from 'kysely'
import type { SerializePluginOptions } from 'kysely-plugin-serialize'
import type { LoggerOptions } from './utils'

export interface SqliteBuilderOptions {
  dialect: Dialect
  /**
   * call on `dialect.log`, wrapped with {@link createKyselyLogger}
   *
   * if value is `true`, logger is `console.log` and `merge: true`
   */
  onQuery?: boolean | LoggerOptions
  /**
   * additional plugins
   *
   * **do NOT use camelCase plugin**, this will lead to sync table fail
   */
  plugins?: KyselyPlugin[]
  logger?: DBLogger
  serializerPluginOptions?: SerializePluginOptions
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

export type QueryBuilderOutput<QB> = QB extends Compilable<infer O> ? O : never

export type StatusResult =
  | { ready: true }
  | { ready: false; error: unknown }

export type SyncTableFn = (db: Kysely<any>, logger?: DBLogger) => Promise<void>
