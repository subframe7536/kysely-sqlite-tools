import type { Kysely, MigrationProvider, MigratorProps } from 'kysely'
import { Migrator } from 'kysely'
import type { DBLogger, TablesUpdater } from '../types'
import type { Schema } from './types'
import type { SyncOptions } from './core'
import { syncTables } from './core'

export * from './types'

export { defineTable, defineLiteral, defineObject } from './define'

/**
 * auto sync table using schema, only sync table/index/trigger
 * @param schema table schema, see {@link defineTable}
 * @param options sync options
 */
export function useSchema<T extends Schema>(
  schema: T,
  options: SyncOptions<T> = {},
): TablesUpdater {
  const { log } = options
  return async (db: Kysely<any>, logger?: DBLogger) => {
    await syncTables(db, schema, options, log ? logger : undefined)
  }
}

/**
 * use migrator to migrate to latest
 * @param provider migration provider
 * @param options migrator options
 */
export function useMigrator(
  provider: MigrationProvider,
  options?: Omit<MigratorProps, 'db' | 'provider'>,
): TablesUpdater {
  return async (db: Kysely<any>) => {
    const migrator = new Migrator({ db, provider, ...options })
    await migrator.migrateToLatest()
  }
}
