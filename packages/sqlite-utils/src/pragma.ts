import { CompiledQuery } from 'kysely'
import type { DatabaseConnection, Kysely, Transaction } from 'kysely'

/**
 * check integrity_check pragma, **no param check**
 */
export async function checkIntegrity(db: Kysely<any>): Promise<boolean> {
  const { rows } = await db.executeQuery(CompiledQuery.raw('PRAGMA integrity_check'))
  if (!rows.length) {
    throw new Error('fail to check integrity')
  }
  // @ts-expect-error result
  return rows[0].integrity_check === 'ok'
}

/**
 * control whether to enable foreign keys, **no param check**
 */
export async function foreignKeys(db: Kysely<any>, enable: boolean): Promise<void> {
  await db.executeQuery(CompiledQuery.raw(`PRAGMA foreign_keys = ${enable}`))
}

/**
 * get or set user_version pragma, **no param check**
 */
export async function getOrSetDBVersion(
  db: Kysely<any>,
  version?: number,
): Promise<number> {
  if (version) {
    await db.executeQuery(CompiledQuery.raw(`PRAGMA user_version = ${version}`))
    return version
  }
  const { rows } = await db.executeQuery(CompiledQuery.raw('PRAGMA user_version'))
  if (!rows.length) {
    throw new Error('fail to get DBVersion')
  }
  // @ts-expect-error get user version
  return rows[0].user_version
}

export type PragmaJournalMode = 'DELETE' | 'TRUNCATE' | 'PERSIST' | 'MEMORY' | 'WAL' | 'OFF'

export type PragmaTempStore = 0 | 'DEFAULT' | 1 | 'FILE' | 2 | 'MEMORY'

export type PragmaSynchronous = 0 | 'OFF' | 1 | 'NORMAL' | 2 | 'FULL' | 3 | 'EXTRA'

export type OptimizePragmaOptions = {
  /**
   * @default 4096
   * @see https://sqlite.org/pragma.html#pragma_cache_size
   */
  cache_size?: number
  /**
   * @default 32768
   * @see https://sqlite.org/pragma.html#pragma_page_size
   */
  page_size?: number
  /**
   * @default -1 (default value)
   * @see https://sqlite.org/pragma.html#pragma_mmap_size
   */
  mmap_size?: number
  /**
   * @default 'WAL'
   * @see https://sqlite.org/pragma.html#pragma_journal_mode
   */
  journal_mode?: PragmaJournalMode
  /**
   * @default 'MEMORY'
   * @see https://sqlite.org/pragma.html#pragma_temp_store
   */
  temp_store?: PragmaTempStore
  /**
   * @default 'NORMAL'
   * @see https://sqlite.org/pragma.html#pragma_synchronous
   */
  synchronous?: PragmaSynchronous
}

/**
 * call optimize pragma, **no param check**
 * @param db database connection
 * @param options pragma options, {@link OptimizePragmaOptions details}
 */
export async function optimizePragma(
  db: DatabaseConnection | Kysely<any> | Transaction<any>,
  options: OptimizePragmaOptions = {},
) {
  const entries = Object.entries({
    mmap_size: -1,
    cache_size: 4096,
    page_size: 32768,
    journal_mode: 'WAL',
    temp_store: 'MEMORY',
    synchronous: 'NORMAL',
    ...options,
  })
  for (const [pragma, value] of entries) {
    await db.executeQuery(CompiledQuery.raw(`PRAGMA ${pragma} = ${value}`))
  }
}
