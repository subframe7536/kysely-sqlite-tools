import type { Kysely } from 'kysely'
import { DEFAULT_MIGRATION_LOCK_TABLE, DEFAULT_MIGRATION_TABLE } from 'kysely'

export type ParsedSchema = {
  existTables: ParsedTables
  indexList: string[]
  triggerList: string[]
}
type ParsedTables = Record<string, ParsedCreateTableSQL>
export type ParsedCreateTableSQL = {
  name: string
  columns: Record<string, ParsedColumnProperty>
  primary: string[] | undefined
  unique: string[][]
}
export type ParsedColumnProperty = {
  type: string
  notNull: boolean
  defaultTo?: any
}

/**
 * parse table object
 * @param definition create table sql
 * @todo support extra constraints
 */
export function parseCreateTableSQL(definition: string): ParsedCreateTableSQL {
  const baseRegex = /create table (?:if not exist)?\s*"([^"]+)".*?\((.*)\)/i
  // const columnRegex = /"([^"]+)"\s+(\w+)(?:\s+DEFAULT\s+(?:'([^']*)'|\bNULL\b))?(?:\s+NOT NULL)?/g
  const columnRegex = /"([^"]+)"\s+(\w+)\s?(not null)?/g
  const [, tableName, cols] = definition.replace(/\r\n?/g, '').match(baseRegex)!

  const ret: ParsedCreateTableSQL = {
    columns: {},
    name: tableName,
    primary: undefined,
    unique: [],
  }
  const columnMatches = cols.matchAll(columnRegex)
  for (const match of columnMatches) {
    const [, columnName, type, notNull] = match
    if (columnName.startsWith('pk#')) {
      const [, ...keys] = columnName.split('#')
      ret.primary = keys
    } else if (columnName.startsWith('un#')) {
      const [, ...keys] = columnName.split('#')
      ret.unique.push(keys)
    } else {
      ret.columns[columnName] = {
        type,
        notNull: !!notNull,
      }
    }
  }

  return ret
}

/**
 * parse exist db structures
 */
export async function parseExistDB(
  db: Kysely<any>,
  excludeTables: string[] = [],
): Promise<ParsedSchema> {
  const tables = await db
    .selectFrom('sqlite_master')
    .where(({ eb, and }) => {
      const builder = and([
        eb('type', 'in', ['table', 'trigger', 'index']),
        eb('name', '!=', DEFAULT_MIGRATION_TABLE),
        eb('name', '!=', DEFAULT_MIGRATION_LOCK_TABLE),
        eb('name', 'not like', 'sqlite_%'),
      ])
      excludeTables.forEach(t => builder.and('name', 'not like', `${t}%`))
      return builder
    })
    .select(['name', 'sql', 'type'])
    .$castTo<{
      name: string
      sql: string
      type: string
    }>()
    .execute()

  const tableMap: ParsedSchema = {
    existTables: {},
    indexList: [],
    triggerList: [],
  }
  for (const { name, sql, type } of tables) {
    if (!sql) {
      continue
    }
    if (type === 'table') {
      tableMap.existTables[name] = parseCreateTableSQL(sql)
    } else if (type === 'index') {
      tableMap.indexList.push(name)
    } else {
      tableMap.triggerList.push(name)
    }
  }
  return tableMap
}
