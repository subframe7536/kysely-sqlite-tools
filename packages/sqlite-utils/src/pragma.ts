import { CompiledQuery, sql } from 'kysely'
import type { DatabaseConnection, Kysely } from 'kysely'

/**
 * check integrity_check pragma
 */
export async function checkIntegrity(db: Kysely<any>): Promise<boolean> {
  const { rows } = await sql`PRAGMA integrity_check`.execute(db)
  if (!rows.length) {
    throw new Error('fail to check integrity')
  }
  // @ts-expect-error result
  return rows[0].integrity_check === 'ok'
}

/**
 * get or set user_version pragma
 */
export async function getOrSetDBVersion(
  db: Kysely<any>,
  version?: number,
): Promise<number> {
  if (version) {
    await sql`PRAGMA user_version = ${sql.raw(`${version}`)}`.execute(db)
    return version
  }
  const { rows } = await sql`PRAGMA user_version`.execute(db)
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
  cacheSize?: number
  /**
   * @default 32768
   * @see https://sqlite.org/pragma.html#pragma_page_size
   */
  pageSize?: number
  /**
   * @see https://sqlite.org/pragma.html#pragma_mmap_size
   */
  mmapSize?: number
  /**
   * @default 'WAL'
   * @see https://sqlite.org/pragma.html#pragma_journal_mode
   */
  journalMode?: PragmaJournalMode
  /**
   * @default 'MEMORY'
   * @see https://sqlite.org/pragma.html#pragma_temp_store
   */
  tempStore?: PragmaTempStore
  /**
   * @default 'NORMAL'
   * @see https://sqlite.org/pragma.html#pragma_synchronous
   */
  synchronous?: PragmaSynchronous
}

/**
 * call optimize pragma
 * @param conn database connection
 * @param options pragma options, {@link OptimizePragmaOptions details}
 */
export async function optimzePragma(
  conn: DatabaseConnection,
  options: OptimizePragmaOptions = {},
): Promise<void> {
  const {
    cacheSize = 4096,
    pageSize = 32768,
    mmapSize,
    journalMode = 'WAL',
    tempStore = 'MEMORY',
    synchronous = 'NORMAL',
  } = options
  const exec = (
    pragma: string,
    data: string | number,
  ) => conn.executeQuery(CompiledQuery.raw(
    `PRAGMA ? = ?`,
    [pragma, data],
  ))
  await exec('journal_mode', journalMode)
  await exec('synchronous', synchronous)
  await exec('temp_store', tempStore)
  await exec('cache_size', cacheSize)
  await exec('page_size', pageSize)
  mmapSize && await exec('mmap_size', mmapSize)
}
