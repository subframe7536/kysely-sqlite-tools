import type { Generated, RawBuilder } from 'kysely'
import type { Arrayable, IsNotNull, Prettify } from '@subframe7536/type-utils'

export type ColumnType =
  | 'string'
  | 'boolean'
  | 'int' | 'float'
  | 'increments'
  | 'date'
  | 'blob'
  | 'object'
export type InferGenereated<T> = T extends Generated<infer P> ? P : T
export type InferColumnTypeByString<T> =
  T extends 'string' ? string :
    T extends 'boolean' ? boolean :
      T extends 'int' | 'float' ? number :
        T extends 'increments' ? Generated<number> :
          T extends 'date' ? Date :
            T extends 'blob' ? ArrayBufferLike :
              T extends 'object' ? object :
                never

export type InferStringByColumnType<T> =
  T extends string ? 'string' :
    T extends boolean ? 'boolean' :
      T extends Generated<number> ? 'increments' | 'int' | 'float' :
        T extends number ? 'int' | 'float' :
          T extends Date ? 'date' :
            T extends ArrayBufferLike ? 'blob' :
              T extends Generated<infer P> ? InferStringByColumnType<P> :
                T extends object ? 'object' :
                  never

export type ColumnProperty<
  ColType extends ColumnType = ColumnType,
  DefaultTo extends InferColumnTypeByString<ColType> | null = InferColumnTypeByString<ColType> | null,
  NotNull extends true | null = true | null,
> = {
  type: ColType
  defaultTo?: DefaultTo | RawBuilder<unknown>
  notNull?: NotNull
}

export type TimeTriggerOptions<
  Create extends string | true | null,
  Update extends string | true | null,
> = {
  create?: Create
  update?: Update
}

export type TableProperty<
  Cols extends Columns,
  Create extends string | true | null = null,
  Update extends string | true | null = null,
> = {
  primary?: Arrayable<keyof Cols & string>
  unique?: Arrayable<keyof Cols & string>[]
  index?: Arrayable<keyof Cols & string>[]
  timeTrigger?: TimeTriggerOptions<Create, Update>
}
export type Columns = Record<string, ColumnProperty>

export type ColumnsWithErrorInfo<T extends Columns> = {
  [K in keyof T]: T[K] extends ColumnProperty<
  infer Type,
  infer DefaultTo,
  infer NotNull
  >
    ? {
      type: Type
      defaultTo: DefaultTo
      notNull: NotNull
    }
    : {
      type: {
        error: 'TypeError: [defaultTo] not satisfied [type]'
        column: K
        typeIs: InferColumnTypeByString<T[K]['type']>
        defaultToIs: T[K]['defaultTo']
      }
    };
}
export type Table<
  Cols extends Columns = any,
  Create extends string | true | null = null,
  Update extends string | true | null = null,
> = {
  columns: ColumnsWithErrorInfo<Cols>
} & TableProperty<Cols, Create, Update>
export type Schema = Record<string, Table<any, any, any>>
export type FilterGenerated<
  Table extends object,
  EscapeKeys extends string = never,
> = {
  [K in keyof Table]: K extends EscapeKeys
    ? Table[K]
    : InferGenereated<Table[K]>
}

type ERROR_INFO = 'HAVE_TYPE_ERROR_AT_DEFINITION'

type TriggerKey<A, B> =
  | (A extends true ? 'createAt' : A extends string ? A : never)
  | (B extends true ? 'updateAt' : B extends string ? B : never)

type ParseTableWithTrigger<
  T extends Columns,
  P extends TimeTriggerOptions<any, any> | undefined,
> = P extends TimeTriggerOptions<infer A, infer B> ? Omit<T, TriggerKey<A, B>> & ({
  [K in TriggerKey<A, B>]: {
    type: 'increments' // #hack to ensure Generated
    defaultTo: Generated<Date> | null
    notNull: null
  }
}) : never

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
  [K in keyof P]: P[K] extends ColumnProperty ? IsNotNull<P[K]['notNull']> extends true // if not null
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
export type InferDatabase<T extends Schema> = Prettify<{
  [K in keyof T]: T[K] extends {
    columns: Columns
    timeTrigger?: TimeTriggerOptions<any, any>
  } ? InferTable<T[K]> : ERROR_INFO
}>
