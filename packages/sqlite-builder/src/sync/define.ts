import type { RawBuilder } from 'kysely'
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
 * explicitly declare column type
 *
 * **if have error, please make sure
 * the first generic type is set**
 * @example
 * ```ts
 * const pet = defineTable({
 *   owner: defineColumn<{ name: string }, true>({
 *     type: 'object',
 *     defaultTo: { name: 'owner' },
 *     notNull: true
 *   }),
 * }
 * ```
 */
export function defineColumn<T, NotNull extends true | null = null>(prop: {
  type: T extends string ? 'string' : 'object'
  defaultTo?: T | RawBuilder<unknown> | null
  notNull?: NotNull
}) {
  return prop
}