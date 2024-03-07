import type { Kysely, MigrationProvider, MigratorProps } from 'kysely'
import { Migrator } from 'kysely'
import type { DBLogger, TableUpdater } from '../types'
import type { Schema } from './types'
import type { SyncOptions } from './core'
import { syncTables } from './core'

export * from './types'

export { defineTable, Column } from './define'

/**
 * auto sync table using schema, only sync table/index/trigger
 * @param schema table schema, see {@link defineTable}
 * @param options sync options
 */
export function useSchema<T extends Schema>(
  schema: T,
  options: SyncOptions<T> = {},
): TableUpdater {
  const { log } = options
  return (db: Kysely<any>, logger?: DBLogger) => syncTables(db, schema, options, log ? logger : undefined)
}

/**
 * use migrator to migrate to latest
 * @param provider migration provider
 * @param options migrator options
 */
export function useMigrator(
  provider: MigrationProvider,
  options?: Omit<MigratorProps, 'db' | 'provider'>,
): TableUpdater {
  return async (db: Kysely<any>, logger?: DBLogger) => {
    const migrator = new Migrator({ db, provider, ...options })
    const { error, results } = await migrator.migrateToLatest()

    results?.forEach((it) => {
      if (it.status === 'Success') {
        logger?.debug(`migration "${it.migrationName}" was executed successfully`)
      } else if (it.status === 'Error') {
        logger?.error(`failed to execute migration "${it.migrationName}"`)
      }
    })

    if (!error) {
      return { ready: true as const }
    }
    logger?.error('failed to run `migrateToLatest`', error as any)
    return { ready: false as const, error }
  }
}
