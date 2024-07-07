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
  // eslint-disable-next-line regexp/no-super-linear-backtracking
  const baseRegex = /create table (?:if not exist)?\s*"([^"]+)".*?\((.*)\)/i
  const columnRegex = /"([^"]+)"\s+(\w+)\s?(not null)?/gi
  const [, tableName, cols] = definition.replace(/\r?\n/g, '').match(baseRegex)!

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
type ExistTable = {
  name: string
  sql: string
  type: string
}

/**
 * parse exist db structures
 */
export async function parseExistDB(
  db: Kysely<any>,
  prefix: string[] = [],
): Promise<ParsedSchema> {
  const tables = await db
    .selectFrom('sqlite_master')
    .where('type', 'in', ['table', 'trigger', 'index'])
    .where('name', '!=', DEFAULT_MIGRATION_TABLE)
    .where('name', '!=', DEFAULT_MIGRATION_LOCK_TABLE)
    .where('name', 'not like', 'sqlite_%')
    .$if(!!prefix.length, qb => qb.where(
      eb => eb.and(
        prefix.map(t => eb('name', 'not like', `${t}%`)),
      ),
    ))
    .select(['name', 'sql', 'type'])
    .$castTo<ExistTable>()
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
