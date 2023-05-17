import type { Dialect, Generated, KyselyPlugin } from 'kysely'
import type { CompiledQuery } from 'kysely/dist/cjs/query-compiler/compiled-query'

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type TriggerEvent = 'insert' | 'update' | 'delete'

export type InferColumnType<T> =
  T extends string ? 'string' :
    T extends boolean ? 'boolean' :
      T extends number ? 'number' :
        T extends Generated<any> ? 'increments' :
          T extends Date ? 'date' :
            T extends ArrayBufferLike ? 'blob' :
              'object'

export type ColumeOption<T> = Prettify<{
  type: InferColumnType<T>
  defaultTo?: T
  notNull?: boolean
}>
export type TableOption<T> = Prettify<{
  primary?: keyof T | Array<keyof T>
  unique?: Array<keyof T | Array<keyof T>>
  index?: Array<keyof T | Array<keyof T>>
  /**
   * set `True` to use default field
   * - create field: 'createAt'
   * - update field: 'updateAt'
   */
  timestamp?: boolean | { create?: keyof T; update?: keyof T }
}>
export type Column<T> = Prettify<{
  [k in keyof T]: ColumeOption<T[k]>
}>
export type ITable<T> = Prettify<{
  columns: Column<T>
  property?: TableOption<T>
}>
export type Tables<T> = Prettify<{
  [Key in keyof T]: ITable<T[Key]>
}>
export interface SqliteBuilderOption<T> {
  tables: Tables<T>
  dialect: Dialect
  dropTableBeforeInit?: boolean
  onQuery?: (queryInfo: CompiledQuery, time: number) => any
  onError?: (reason: unknown) => any
  plugins?: Array<KyselyPlugin>
}
