import type { Kysely, MigrationProvider, MigratorProps } from 'kysely'
import { Migrator } from 'kysely'
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

/**
 * migrate to latest
 */

export function createMigrateFn(
  provider: MigrationProvider,
  options?: Omit<MigratorProps, 'db' | 'provider'>,
): SyncTableFn {
  return async (db: Kysely<any>) => {
    const migrator = new Migrator({ db, provider, ...options })
    await migrator.migrateToLatest()
  }
}
