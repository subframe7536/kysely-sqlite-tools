import { sql } from 'kysely'
import type { Kysely, Transaction } from 'kysely'

export type SavePoint = {
  release: () => Promise<void>
  rollback: () => Promise<void>
}

/**
 * create savepoint, release or rollback it later,
 * included in `SqliteBuilder`
 * @example
 * ```ts
 * const sp = await savePoint(db, 'savepoint_1')
 * try {
 *   // do something...
 *   await sp.release()
 * } catch (e) {
 *   await sp.rollback()
 * }
 * ```
 */

export async function savePoint(
  db: Kysely<any> | Transaction<any>,
  name?: string,
): Promise<SavePoint> {
  const _name = name || `sp_${Date.now() % 100000000}`
  await sql`savepoint ${sql.raw(_name)}`.execute(db)
  return {
    release: async () => {
      await sql`release savepoint ${sql.raw(_name)}`.execute(db)
    },
    rollback: async () => {
      await sql`rollback to savepoint ${sql.raw(_name)}`.execute(db)
    },
  }
}
export async function runWithSavePoint<
  DB extends Kysely<any> | Transaction<any>,
  O,
>(
  db: DB,
  fn: (db: DB) => Promise<O>,
  name?: string,
): Promise<O> {
  const { release, rollback } = await savePoint(db, name)
  try {
    const result = await fn(db)
    await release()
    return result
  } catch (e) {
    await rollback()
    throw e
  }
}
