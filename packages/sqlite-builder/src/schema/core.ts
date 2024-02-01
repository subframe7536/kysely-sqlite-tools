import { type Kysely, sql } from 'kysely'
import { getOrSetDBVersion } from 'kysely-sqlite-utils'
import type { Promisable } from '@subframe7536/type-utils'
import type { DBLogger } from '../types'
import type { Columns, InferDatabase, Schema, Table } from './types'
import {
  parseColumnType,
  runCreateTable,
  runCreateTableIndex,
  runCreateTableWithIndexAndTrigger,
  runCreateTimeTrigger,
  runDropTable,
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
    skipSyncWhenSame?: boolean
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
  truncateIfExists?: boolean | Array<keyof T & string>
  /**
   * reserve old data in temp, clear after destroy
   */
  reserveOldData?: boolean
  /**
   * after update hook
   * @param db kysely instance
   */
  afterUpdate?: (db: Kysely<InferDatabase<T>>) => Promisable<void>
}

export async function syncTables<T extends Schema>(
  db: Kysely<any>,
  targetTables: T,
  options: SyncOptions<T> = {},
  logger?: DBLogger,
): Promise<void> {
  const {
    reserveOldData,
    truncateIfExists = [],
    log,
    version: { current, skipSyncWhenSame } = {},
    excludeTablePrefix,
    afterUpdate,
  } = options

  if (current) {
    if (skipSyncWhenSame && current === await getOrSetDBVersion(db)) {
      return
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

  for (const idx of indexList) {
    await db.schema.dropIndex(idx).ifExists().execute()
  }
  for (const tgr of triggerList) {
    await sql`drop trigger if exists ${sql.ref(tgr)}`.execute(db)
  }

  for (const [existTableName, existColumns] of Object.entries(existTables)) {
    if (!(existTableName in targetTables)) {
      debug(`remove table: ${existTableName}`)
      await runDropTable(db, existTableName)
    } else {
      debug(`diff table: ${existTableName}`)
      await diffTable(existTableName, existColumns, targetTables[existTableName])
    }
  }

  for (const [targetTableName, targetTable] of Object.entries(targetTables)) {
    if (!(targetTableName in existTables)) {
      debug(`create table: ${targetTableName}`)
      await runCreateTableWithIndexAndTrigger(db, targetTableName, targetTable)
    }
  }
  debug('======= after update hook =======')
  await afterUpdate?.(db)

  debug('======= update tables end =======')

  async function diffTable(
    tableName: string,
    existColumns: ParsedCreateTableSQL,
    targetColumns: Table,
  ): Promise<void> {
    if (truncateTableSet.has(tableName)) {
      await db.transaction().execute(async (trx) => {
        await runDropTable(trx, tableName)
        await runCreateTableWithIndexAndTrigger(trx, tableName, targetColumns)
        debug('clear and sync structure')
      })
      return
    }
    const { index, ...props } = targetColumns

    const restoreColumnList = getRestoreColumnList(existColumns.columns, targetColumns.columns)

    // if all columns are in same table structure, skip
    if (restoreColumnList.length === Object.keys(existColumns.columns).length) {
      debug('same table structure, skip')
      return
    }
    debug('different table structure, update')
    await db.transaction().execute(async (trx) => {
      const tempTableName = `_temp_${tableName}`

      // 1. copy struct to temporary table
      // @ts-expect-error existColumns.columns has parsed column type
      await runCreateTable(trx, tempTableName, existColumns, true)

      // 2. copy all data to temporary table
      await trx.insertInto(tempTableName)
        .expression(eb => eb.selectFrom(tableName).selectAll())
        .execute()

      // 3. remove exist table
      await runDropTable(trx, tableName)

      // 4. create target table
      const _triggerOptions = await runCreateTable(trx, tableName, props)

      // 5. diff and restore data from temporary table to target table
      if (restoreColumnList.length) {
        await trx.insertInto(tableName)
          .columns(restoreColumnList)
          .expression(eb => eb.selectFrom(tempTableName).select(restoreColumnList))
          .execute()
      }

      // 6. add indexes and triggers
      await runCreateTableIndex(trx, tableName, index)
      await runCreateTimeTrigger(trx, tableName, _triggerOptions)

      // 7. if not reserve old data, remove temporary table
      !reserveOldData && await runDropTable(trx, tempTableName)
    })
      .then(() => debug(`restore columns: ${restoreColumnList}`))
      .catch(e => logger?.error(`fail to sync ${tableName}`, e))
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
