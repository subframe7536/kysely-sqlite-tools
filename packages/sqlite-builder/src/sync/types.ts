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
export type IsNotNull<T> = (T extends null ? T : never) extends never ? true : false
