import type { Kysely } from 'kysely'
import type { DBLogger, SyncTableFn } from '../types'
import type { Schema } from './types'
import type { SyncOptions } from './core'
import { syncTables } from './core'

export * from './types'
export { defineTable, defineLiteral, defineObject } from './define'

/**
 * create sync schema function
 * @param schema table schema, see {@link defineTable}
 * @param options sync options
 */
export function createAutoSyncSchemaFn<T extends Schema>(
  schema: T,
  options: SyncOptions<T> = {},
): SyncTableFn {
  const { log } = options
  return async (db: Kysely<any>, logger?: DBLogger) => {
    await syncTables(db, schema, options, log ? logger : undefined)
  }
}
