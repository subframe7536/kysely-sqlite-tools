import { sql } from 'kysely'
import type { Kysely, Transaction } from 'kysely'
import { getOrSetDBVersion } from 'kysely-sqlite-utils'
import type { Promisable, StringKeys } from '@subframe7536/type-utils'
import type { DBLogger, StatusResult } from '../types'
import type { Columns, InferDatabase, Schema, Table } from './types'
import {
  parseColumnType,
  runCreateTable,
  runCreateTableIndex,
  runCreateTableWithIndexAndTrigger,
  runCreateTimeTrigger,
  runDropTable,
  runRenameTable,
} from './run'
import { type ParsedCreateTableSQL, parseExistDB } from './parseExist'

export type SyncOptions<T extends Schema> = {
  /**
   * whether to enable debug logger
   */
  log?: boolean
  /**
   * version control
   */
  version?: {
    /**
     * current version
     */
    current: number
    /**
     * whether to skip sync when the db's `user_version` is same with `version.current`
     */
    skipSyncWhenSame: boolean
  }
  /**
   * exclude table prefix list, append with `%`
   *
   * `sqlite_%` and default Kysely migration table is built-in
   */
  excludeTablePrefix?: string[]
  /**
   * do not restore data from old table to new table
   */
  truncateIfExists?: boolean | Array<StringKeys<T> | string & {}>
  /**
   * trigger on update success
   * @param db kysely instance
   */
  onSyncSuccess?: (db: Kysely<InferDatabase<T>>) => Promisable<void>
  /**
   * trigger on update fail
   */
  onSyncFail?: (err: unknown) => Promisable<void>
}

export async function syncTables<T extends Schema>(
  db: Kysely<any>,
  targetTables: T,
  options: SyncOptions<T> = {},
  logger?: DBLogger,
): Promise<StatusResult> {
  const {
    truncateIfExists = [],
    log,
    version: { current, skipSyncWhenSame } = {},
    excludeTablePrefix,
    onSyncSuccess,
    onSyncFail,
  } = options

  if (current) {
    if (skipSyncWhenSame && current === await getOrSetDBVersion(db)) {
      return { ready: true }
    }
    await getOrSetDBVersion(db, current)
  }

  const debug = (e: any) => log && logger?.debug(e)
  const { existTables, indexList, triggerList } = await parseExistDB(db, excludeTablePrefix)
  debug('====== update tables start ======')

  const truncateTableSet = new Set(
    Array.isArray(truncateIfExists)
      ? truncateIfExists
      : truncateIfExists
        ? Object.keys(existTables)
        : [],
  )

  return await db.transaction()
    .execute(async (trx) => {
      for (const idx of indexList) {
        await trx.schema.dropIndex(idx).ifExists().execute()
      }
      for (const tgr of triggerList) {
        await sql`drop trigger if exists ${sql.ref(tgr)}`.execute(trx)
      }

      for (const [existTableName, existColumns] of Object.entries(existTables)) {
        if (!(existTableName in targetTables)) {
          debug(`remove table: ${existTableName}`)
          await runDropTable(trx, existTableName)
        } else {
          debug(`diff table: ${existTableName}`)
          try {
            await diffTable(trx, existTableName, existColumns, targetTables[existTableName])
          } catch (e) {
            logger?.error(`fail to sync ${existTableName}`, e as any)
            throw e
          }
        }
      }

      for (const [targetTableName, targetTable] of Object.entries(targetTables)) {
        if (!(targetTableName in existTables)) {
          debug(`create table: ${targetTableName}`)
          await runCreateTableWithIndexAndTrigger(trx, targetTableName, targetTable)
        }
      }
    })
    .then(() => {
      onSyncSuccess?.(db)
      debug('======= update tables success =======')
      return { ready: true as const }
    })
    .catch((e) => {
      onSyncFail?.(e)
      debug('======= update tables fail =======')
      return { ready: false, error: e }
    })

  async function diffTable(
    trx: Transaction<any>,
    tableName: string,
    existColumns: ParsedCreateTableSQL,
    targetColumns: Table,
  ): Promise<void> {
    if (truncateTableSet.has(tableName)) {
      await runDropTable(trx, tableName)
      await runCreateTableWithIndexAndTrigger(trx, tableName, targetColumns)
      debug('clear and sync structure')
      return
    }
    const { index, ...props } = targetColumns

    const restoreColumnList = getRestoreColumnList(existColumns.columns, targetColumns.columns)

    // if all columns are in same table structure, skip
    if (restoreColumnList.length === Object.keys(existColumns.columns).length) {
      debug('same table structure, skip')
      return
    }
    //
    // migrate table data
    // see https://sqlite.org/lang_altertable.html 7. Making Other Kinds Of Table Schema Changes
    //
    debug('different table structure, update')
    const tempTableName = `_temp_${tableName}`

    // 1. create target table with temp name
    const _triggerOptions = await runCreateTable(trx, tempTableName, props)

    // 2. diff and restore data from source table to target table
    if (restoreColumnList.length) {
      await trx.insertInto(tempTableName)
        .columns(restoreColumnList)
        .expression(eb => eb.selectFrom(tableName).select(restoreColumnList))
        .execute()
    }
    // 3. remove old table
    await runDropTable(trx, tableName)

    // 4. rename temp table to target table name
    await runRenameTable(trx, tempTableName, tableName)

    // 5. add indexes and triggers
    await runCreateTableIndex(trx, tableName, index)
    await runCreateTimeTrigger(trx, tableName, _triggerOptions)

    debug(`restore columns: ${restoreColumnList}`)
  }
}

function getRestoreColumnList(
  existColumns: ParsedCreateTableSQL['columns'],
  targetColumns: Table['columns'],
): string[] {
  const list: string[] = []
  for (const [col, targetColumn] of Object.entries(targetColumns as Columns)) {
    if (
      col in existColumns
      && parseColumnType(targetColumn.type).dataType === existColumns[col].type
      && (targetColumn.notNull || false) === (existColumns[col].notNull || false)
    ) {
      list.push(col)
    }
  }
  return list
}
