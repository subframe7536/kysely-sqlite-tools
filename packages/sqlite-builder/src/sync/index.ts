import type { Generated, Kysely } from 'kysely'
import type { DBLogger, SyncTableFn } from '../types'
import type { ColumnProperty, Columns, Tables, TimeTriggerOptions } from './types'
import type { SyncOptions } from './core'
import { syncTables } from './core'

export * from './types'
export { defineColumn, defineTable } from './define'

export function createAutoSyncTableFn<T extends Tables>(
  tables: T,
  options: SyncOptions<T> = {},
): SyncTableFn {
  const { logger: _l, ..._options } = options
  return async (db: Kysely<any>, logger?: DBLogger) => {
    await syncTables(db, tables, _options, _l ? logger : undefined)
  }
}

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

type ERROR_INFO = 'HAVE_TYPE_ERROR_AT_DEFINITION'

type TriggerKey<A, B> =
  | (A extends true ? 'createAt' : A extends string ? A : never)
  | (B extends true ? 'updateAt' : B extends string ? B : never)

type ParseTableWithTrigger<
  T extends Columns,
  P extends TimeTriggerOptions<any, any> | undefined,
> = P extends TimeTriggerOptions<infer A, infer B>
  ? Omit<T, TriggerKey<A, B>> & (
    { [K in TriggerKey<A, B>]: {
      type: 'increments' // #hack to ensure Generated
      defaultTo: Generated<Date> | null
      notNull: null
    } }
  )
  : never

type IsNotNull<T> = (T extends null ? T : never) extends never ? true : false

/**
 * util type for infering type of table
 */
export type InferTable<
  T extends {
    columns: Columns
    timeTrigger?: TimeTriggerOptions<any, any>
  },
  P = ParseTableWithTrigger<T['columns'], T['timeTrigger']>,
> = Prettify<{
  [K in keyof P]: P[K] extends ColumnProperty
    ? IsNotNull<P[K]['notNull']> extends true // if not null
      ? Exclude<P[K]['defaultTo'], null> // return required defaultTo
      : P[K]['type'] extends 'increments' // if type is "increments"
        ? Exclude<P[K]['defaultTo'], null> // return "Generated<...>"
        : IsNotNull<P[K]['defaultTo']> extends true // if defaultTo is required
          ? Generated<Exclude<P[K]['defaultTo'], null>> // return Generated
          : P[K]['defaultTo'] | null // return optional
    : ERROR_INFO // return error info
}>

/**
 * util type for infering type of database
 *
 * if infered type contains `"HAVE_DEFAULT_VALUE_TYPE_ERROR"`,
 * there is some error in target table's default value type
 *
 * use {@link InferTable} to check details
 */
export type InferDatabase<T extends Tables> = Prettify<{
  [K in keyof T]: T[K] extends {
    columns: Columns
    timeTrigger?: TimeTriggerOptions<any, any>
  }
    ? InferTable<T[K]>
    : ERROR_INFO
}>
