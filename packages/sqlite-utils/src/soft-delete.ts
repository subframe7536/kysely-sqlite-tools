import type { DeleteQueryBuilder, DeleteResult, JoinType, Kysely, WhereInterface } from 'kysely'
import type { ExtractTableAlias, From, FromTables, TableReference } from 'kysely/dist/cjs/parser/table-parser'

type CamelCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? First extends Uppercase<First>
    ? `${Lowercase<First>}${Rest}`
    : S
  : S
type JoinFnName = CamelCase<JoinType>

export type SqliteExecutor<DB extends Record<string, any>, Extra extends Record<string, any> = {}> = {
  selectFrom: Kysely<DB>['selectFrom']
  insertInto: Kysely<DB>['insertInto']
  updateTable: Kysely<DB>['updateTable']
  /**
   * see {@link Kysely.deleteFrom}
   */
  deleteFrom: {
    <TR extends keyof DB & string>(from: TR): Omit<
      DeleteQueryBuilder<DB, ExtractTableAlias<DB, TR>, DeleteResult>,
      JoinFnName
    >
    <TR extends TableReference<DB>>(table: TR): Omit<
      DeleteQueryBuilder<From<DB, TR>, FromTables<DB, never, TR>, DeleteResult>,
      JoinFnName
    >
  }
} & Extra

export type SqliteExecutorFn<T extends Record<string, any>, Extra extends Record<string, any> = {}> = (db: () => Kysely<T>) => SqliteExecutor<T, Extra>

/**
 * basic executor function
 */
export function basicExecutorFn<DB extends Record<string, any>>(db: () => Kysely<DB>): SqliteExecutor<DB> {
  return {
    selectFrom: (tb: any) => db().selectFrom(tb),
    insertInto: (tb: any) => db().insertInto(tb),
    updateTable: (tb: any) => db().updateTable(tb),
    deleteFrom: (tb: any) => db().deleteFrom(tb),
  } as any
}

/**
 * create soft delete executor function
 * @param deleteColumnName delete column name, default is 'isDeleted'
 */
export function createSoftDeleteExecutorFn<DB extends Record<string, any>>(
  deleteColumnName = 'isDeleted',
): SqliteExecutorFn<DB, {
  withoutDelete: <W extends WhereInterface<DB, keyof DB>>(qb: W) => WhereInterface<DB, keyof DB>
}> {
  return (db: () => Kysely<DB>) => {
    return {
      selectFrom: <T extends keyof DB & string>(
        table: T,
      ) => db().selectFrom(table).where(deleteColumnName, '=', 0 as any),
      insertInto: <T extends keyof DB & string>(
        table: T,
      ) => db().insertInto(table),
      updateTable: <T extends keyof DB & string>(
        table: T,
      ) => db().updateTable(table).where(deleteColumnName, '=', 0 as any),
      deleteFrom: <T extends keyof DB & string>(
        table: T,
      ) => db().updateTable(table).set(deleteColumnName, 1 as any),
      withoutDelete: <W extends WhereInterface<DB, keyof DB>>(
        qb: W,
      ) => qb.where(deleteColumnName, '=', 0 as any),
    } as any
  }
}
