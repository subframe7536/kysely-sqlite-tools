import type { Compilable, DeleteQueryBuilder, Dialect, Generated, InsertQueryBuilder, KyselyPlugin, QueryResult, SelectQueryBuilder, Sql, UpdateQueryBuilder } from 'kysely'
import type { CompiledQuery } from 'kysely/dist/cjs/query-compiler/compiled-query'

export type TriggerEvent = 'insert' | 'update' | 'delete'

export type InferColumnType<T> =
  T extends string ? 'string' :
    T extends boolean ? 'boolean' :
      T extends number ? 'number' :
        T extends Generated<any> ? 'increments' :
          T extends Date ? 'date' :
            T extends ArrayBufferLike ? 'blob' :
              'object'

export type ColumeOption<T> = {
  type: InferColumnType<T>
  defaultTo?: T | ((sql: Sql) => unknown)
  notNull?: boolean
}
export type TableOption<T, K = keyof T & string> = {
  primary?: K | Array<K>
  unique?: Array<K | Array<K>>
  index?: Array<K | Array<K>>
  /**
   * set `True` to use default field
   * - create field: 'createAt'
   * - update field: 'updateAt'
   */
  timestamp?: boolean | { create?: K; update?: K }
}
export type Column<T> = {
  [k in keyof T]: ColumeOption<T[k]>
}
export type Table<T> = {
  columns: Column<T>
  property?: TableOption<T>
}
export type Tables<T> = {
  [Key in keyof T]: Table<T[Key]>
}
export interface SqliteBuilderOption<T> {
  tables: Tables<T>
  dialect: Dialect
  dropTableBeforeInit?: boolean
  onQuery?: (queryInfo: CompiledQuery, time: number) => any
  plugins?: Array<KyselyPlugin>
  logger?: Logger
}
export type Logger = {
  info: (msg: string) => void
  debug: (msg: string) => void
  warn: (msg: string) => void
  error: (msg: string, e?: Error) => void
}

export type AvailableBuilder<DB, O> =
  | SelectQueryBuilder<DB, any, O>
  | UpdateQueryBuilder<DB, any, any, O>
  | InsertQueryBuilder<DB, any, O>
  | DeleteQueryBuilder<DB, any, O>

export type QueryBuilderOutput<QB> = QB extends Compilable<infer O> ? O : never

export type BuilderResult<T> = T extends SelectQueryBuilder<any, any, infer P> ? QueryResult<P> : Omit<QueryResult<any>, 'rows'> & { rows: [] }