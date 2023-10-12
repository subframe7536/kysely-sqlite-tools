import type { RawBuilder } from 'kysely'
import type { IsNotNull } from '@subframe7536/type-utils'
import type {
  Columns,
  ColumnsWithErrorInfo,
  Table,
  TableProperty,
  TimeTriggerOptions,
} from './types'

export const TGR = '__TIME_TRIGGER__'

/**
 * define table function
 *
 * if you want to explicitly declare column type,
 * use {@link defineColumn}
 */
export function defineTable<
  T extends Columns,
  C extends string | true | null = null,
  U extends string | true | null = null,
>(
  columns: T,
  property?: Omit<TableProperty<T>, 'timeTrigger'> & {
    timeTrigger?: TimeTriggerOptions<C, U>
  },
): Table<T, C, U> {
  const { create, update } = property?.timeTrigger || {}
  const options = { type: 'date', defaultTo: TGR }
  if (create === true) {
    // @ts-expect-error assign
    columns.createAt = options
  } else if (create) {
    // @ts-expect-error assign
    columns[create] = options
  }
  if (update === true) {
    // @ts-expect-error assign #hack
    columns.updateAt = { ...options, notNull: 0 }
  } else if (update) {
    // @ts-expect-error assign #hack
    columns[update] = { ...options, notNull: 0 }
  }
  return {
    columns: columns as unknown as ColumnsWithErrorInfo<T>,
    ...property,
  }
}

/**
 * explicitly declare object column type
 *
 * @example
 * ```ts
 * const pet = defineTable({
 *   // NotNull is optional
 *   owner: defineColumn<{ name: string }>().NotNull(),
 * }
 * ```
 */
export function defineObject<T extends object>(defaultTo?: T | RawBuilder<unknown> | null) {
  const base = {
    type: 'object',
    defaultTo: defaultTo as IsNotNull<typeof defaultTo> extends true ? T : T | null,
  } as const
  return {
    ...base,
    NotNull() {
      return {
        ...base,
        notNull: true,
      } as const
    },
  }
}
/**
 * explicitly declare string column type
 *
 * @example
 * ```ts
 * const typeTable = defineTable({
 *   // NotNull is optional
 *   type: defineColumn<'generic' | 'custom'>().NotNull(),
 * }
 * ```
 */
export function defineLiteral<T extends string>(defaultTo?: T | RawBuilder<unknown> | null) {
  const base = {
    type: 'string',
    defaultTo: defaultTo as IsNotNull<typeof defaultTo> extends true ? T : T | null,
  } as const
  return {
    ...base,
    NotNull() {
      return {
        ...base,
        notNull: true,
      } as const
    },
  }
}
