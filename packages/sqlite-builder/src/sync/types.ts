import type { Generated, RawBuilder } from 'kysely'

export type Arrayable<T> = T | Array<T>
export type ColumnType =
  | 'string'
  | 'boolean'
  | 'int' | 'float'
  | 'increments'
  | 'date'
  | 'blob'
  | 'object'

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
      T extends Generated<number> ? 'increments' :
        T extends number ? 'int' | 'float' :
          T extends Date ? 'date' :
            T extends ArrayBufferLike ? 'blob' :
              T extends object ? 'object' :
                never

export type ColumnProperty<
  T extends ColumnType = ColumnType,
  DefaultTo extends InferColumnTypeByString<T> | null = InferColumnTypeByString<T> | null,
  NotNull extends true | null = true | null,
> = {
  type: T
  defaultTo?: DefaultTo | RawBuilder<unknown>
  notNull?: NotNull
}

export type TimeTriggerOptions<
  C extends string | true | null,
  U extends string | true | null,
> = {
  create?: C
  update?: U
}

export type TableProperty<
  T extends Columns,
  C extends string | true | null = null,
  U extends string | true | null = null,
> = {
  primary?: Arrayable<keyof T & string>
  unique?: Arrayable<keyof T & string>[]
  index?: Arrayable<keyof T & string>[]
  timeTrigger?: TimeTriggerOptions<C, U>
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
  T extends Columns = any,
  C extends string | true | null = null,
  U extends string | true | null = null,
> = {
  columns: ColumnsWithErrorInfo<T>
} & TableProperty<T, C, U>
export type Tables = Record<string, Table<any, any, any>>
