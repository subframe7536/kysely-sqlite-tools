import type { Kysely } from 'kysely'
import { sql } from 'kysely'
import type { DataTypeExpression } from 'kysely/dist/cjs/parser/data-type-parser'
import type { ITable, Tables, TriggerEvent } from './types'

export function isString(value: any): value is string {
  return typeof value === 'string'
}
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

export async function createTimeTrigger<T>(
  kysely: Kysely<T>,
  table: keyof T,
  event: TriggerEvent,
  column: string,
  key = 'rowid',
): Promise<void> {
  // datetime('now') will return UTC Time
  await sql`
      create trigger if not exists ${sql.raw(table as string)}_${sql.raw(column)}
      after ${sql.raw(event)}
      on ${sql.table(table as string)}
      begin
        update ${sql.table(table as string)}
        set ${sql.ref(column)} = datetime('now','localtime')
        where ${sql.ref(key)} = NEW.${sql.ref(key)};
      end
      `.execute(kysely).catch((err) => {
      console.error(err)
      return undefined
    })
}

export function parseTableMap<T>(tables: Tables<T>): Map<string, ITable<T[Extract<keyof T, string>]>> {
  const map = new Map()
  for (const tableName in tables) {
    if (!Object.prototype.hasOwnProperty.call(tables, tableName)) {
      continue
    }
    const table = tables[tableName]
    map.set(tableName, table)
  }
  return map
}

export async function runCreateTable<T>(
  kysely: Kysely<T>,
  tableMap: Map<string, ITable<T[Extract<keyof T, string>]>>,
  dropTableBeforeInit = false,
) {
  for (const [tableName, table] of tableMap) {
    const { columns: columnList, property: tableProperty } = table
    if (dropTableBeforeInit) {
      await kysely.schema.dropTable(tableName).ifExists().execute().catch()
    }
    let tableSql = kysely.schema.createTable(tableName)
    let _triggerKey = 'rowid'
    let _haveAutoKey = false
    let _insertColumnName = 'createAt'
    let _updateColumnName = 'updateAt'
    if (tableProperty?.timestamp && !isBoolean(tableProperty.timestamp)) {
      const { create, update } = tableProperty.timestamp as { create?: string; update?: string }
      _insertColumnName = create ?? 'createAt'
      _updateColumnName = update ?? 'updateAt'
    }
    for (const columnName in columnList) {
      if (!Object.prototype.hasOwnProperty.call(columnList, columnName)) {
        continue
      }
      const columnOption = columnList[columnName]
      let dataType: DataTypeExpression = 'text'
      const { type, notNull, defaultTo } = columnOption
      switch (type) {
        case 'boolean':
        case 'date':
        case 'object':
        case 'string':
          dataType = 'text'
          break
        case 'increments':
          _triggerKey = columnName
          // eslint-disable-next-line no-fallthrough
        case 'number':
          dataType = 'integer'
          break
        case 'blob':
          dataType = 'blob'
      }
      if ([_insertColumnName, _updateColumnName].includes(columnName)) {
        continue
      }
      tableSql = tableSql.addColumn(columnName, dataType, (builder) => {
        if (type === 'increments') {
          _haveAutoKey = true
          return builder.autoIncrement().primaryKey()
        }
        notNull && (builder = builder.notNull())
        defaultTo !== undefined && (builder = builder.defaultTo(defaultTo))
        return builder
      })
    }
    if (tableProperty) {
      const _primary = tableProperty.primary as string | string[] | undefined
      const _unique = tableProperty.unique as string[] | (string[])[] | undefined
      if (tableProperty.timestamp) {
        if (_insertColumnName) {
          tableSql = tableSql.addColumn(_insertColumnName, 'text')
        }
        if (_updateColumnName) {
          tableSql = tableSql.addColumn(_updateColumnName, 'text')
        }
      }
      if (!_haveAutoKey && _primary) {
        const is = isString(_primary)
        _triggerKey = is ? _primary : _primary[0]
        tableSql = tableSql.addPrimaryKeyConstraint(`pk_${is ? _primary : _primary.join('_')}`, (is ? [_primary] : _primary) as any)
      }
      _unique?.forEach((u: string | string[]) => {
        const is = isString(u)
        _triggerKey = (!_primary && !_haveAutoKey) ? is ? u : u[0] : _triggerKey
        tableSql = tableSql.addUniqueConstraint(`un_${is ? u : u.join('_')}`, (is ? [u] : u) as any)
      })
    }
    await tableSql.ifNotExists().execute()
    if (tableProperty?.index) {
      for (const i of tableProperty.index) {
        const is = isString(i)
        let _idx = kysely.schema.createIndex(`idx_${is ? i : (i as []).join('_')}`).on(tableName)
        _idx = is ? _idx.column(i) : _idx.columns(i as [])
        await _idx.ifNotExists().execute()
      }
    }
    if (tableProperty?.timestamp) {
      _insertColumnName && await createTimeTrigger(kysely, tableName as keyof T, 'insert', _insertColumnName, _triggerKey)
      _updateColumnName && await createTimeTrigger(kysely, tableName as keyof T, 'update', _updateColumnName, _triggerKey)
    }
  }
}
