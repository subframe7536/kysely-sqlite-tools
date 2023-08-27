import type { Compilable, CompiledQuery, Kysely, RootOperationNode } from 'kysely'
import { sql } from 'kysely'
import type { DataTypeExpression } from 'kysely/dist/cjs/parser/data-type-parser'
import { defaultSerializer } from 'kysely-plugin-serialize'
import type { ColumeOption, QueryBuilderOutput, Table, Tables, TriggerEvent } from './types'

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
    end`.execute(kysely).catch((err) => {
      console.error(err)
      return undefined
    })
}

export function parseTableMap<T>(tables: Tables<T>): Map<string, Table<T[Extract<keyof T, string>]>> {
  const map = new Map()
  for (const [tableName, table] of Object.entries(tables)) {
    map.set(tableName, table)
  }
  return map
}

export async function runCreateTable<T>(
  kysely: Kysely<T>,
  tableMap: Map<keyof T & string, Table<T[keyof T & string]>>,
  dropTableBeforeInit = false,
) {
  for (const [tableName, table] of tableMap) {
    const { columns: columnList, property: tableProperty } = table
    if (dropTableBeforeInit) {
      await kysely.schema.dropTable(tableName).ifExists().execute().catch()
    }

    let tableSql = kysely.schema.createTable(tableName)

    const { index, primary, timestamp, unique } = tableProperty || {}

    let _triggerKey = 'rowid'
    let _haveAutoKey = false
    const _insertColumnName = (typeof timestamp === 'object' && timestamp.create) || 'createAt'
    const _updateColumnName = (typeof timestamp === 'object' && timestamp.update) || 'updateAt'

    for (const [columnName, columnOption] of Object.entries(columnList)) {
      let dataType: DataTypeExpression = 'text'
      const { type, notNull, defaultTo } = columnOption as ColumeOption<T[keyof T & string]>

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

        defaultTo !== undefined && (builder = builder.defaultTo(
          defaultTo instanceof Function ? defaultTo(sql) : defaultTo,
        ))

        return builder
      })
    }

    tableSql = timestamp
      ? tableSql
        .addColumn(_insertColumnName, 'text')
        .addColumn(_updateColumnName, 'text')
      : tableSql

    if (!_haveAutoKey && primary) {
      const is = Array.isArray(primary)
      _triggerKey = is ? primary[0] : primary
      tableSql = tableSql.addPrimaryKeyConstraint(
        `pk_${is ? primary.join('_') : primary}`,
        (is ? primary : [primary]) as any,
      )
    }

    for (const uk of unique ?? []) {
      const is = Array.isArray(uk)
      _triggerKey = (!primary && !_haveAutoKey)
        ? (is ? uk[0] : uk)
        : _triggerKey
      tableSql = tableSql.addUniqueConstraint(
        `un_${is ? uk.join('_') : uk}`,
        (is ? uk : [uk]) as any,
      )
    }

    await tableSql.ifNotExists().execute()

    for (const i of index ?? []) {
      const is = Array.isArray(i)
      await kysely.schema.createIndex(`idx_${is ? i.join('_') : i}`)
        .on(tableName)
        .columns((is ? i : [i]) as string[])
        .ifNotExists().execute()
    }

    if (timestamp) {
      await createTimeTrigger(kysely, tableName, 'insert', _insertColumnName, _triggerKey)
      await createTimeTrigger(kysely, tableName, 'update', _updateColumnName, _triggerKey)
    }
  }
}

export function preCompile<O>(
  queryBuilder: QueryBuilderOutput<Compilable<O>>,
) {
  function getParam<P extends Record<string, any>>(name: keyof P): P[keyof P] {
    return `__precomile_${name as string}` as unknown as P[keyof P]
  }
  return {
    setParam<P extends Record<string, any>>(
      paramBuilder: (
        queryBuilder: QueryBuilderOutput<Compilable<O>>,
        param: typeof getParam<P>
      ) => Compilable<O>,
    ) {
      let compiled: CompiledQuery<Compilable<O>>
      return (param: P, processRootOperatorNode?: (node: RootOperationNode) => RootOperationNode): CompiledQuery<O> => {
        if (!compiled) {
          const { parameters, sql, query } = paramBuilder(queryBuilder, getParam).compile()
          compiled = {
            sql,
            query: processRootOperatorNode?.(query) || { kind: query.kind } as any,
            parameters,
          }
        }
        return {
          ...compiled,
          parameters: compiled.parameters.map(p =>
            (typeof p === 'string' && p.startsWith('__precomile_'))
              ? defaultSerializer(param[p.slice(12)])
              : p,
          ),
        }
      }
    },
  }
}