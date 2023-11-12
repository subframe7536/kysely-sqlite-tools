import type { Compilable, CompiledQuery, RootOperationNode } from 'kysely'

export type QueryBuilderOutput<QB> = QB extends Compilable<infer O> ? O : never

export type SetParamFn<O, T extends Record<string, any>> = {
  /**
   * query builder for setup params
   */
  qb: QueryBuilderOutput<Compilable<O>>
  /**
   * param builder
   */
  param: typeof getParam<T>
}
/**
 * @param param custom params
 * @param processRootOperatorNode process `query` in {@link CompiledQuery},
 * default is `(node) => ({ kind: node.kind })`
 */
export type CompileFn<O, T extends Record<string, any>> = (
  param: T,
  processRootOperatorNode?: ((node: RootOperationNode) => RootOperationNode)
) => CompiledQuery<QueryBuilderOutput<O>>

function getParam<T extends Record<string, any>>(name: keyof T): T[keyof T] {
  return `__pre_${name as string}` as unknown as T[keyof T]
}

/**
 * create precompiled query,
 * included in `SqliteBuilder`
 * @param queryBuilder query builder without params
 * @param serialize custom parameter value serializer
 * @example
 * ```ts
 * const query = precompileQuery(
 *   db.selectFrom('test').selectAll(),
 * ).setParam<{ name: string }>((qb, param) =>
 *   qb.where('name', '=', param('name'),
 * ))
 * const compiledQuery = query({ name: 'test' })
 * // {
 * //   sql: 'select * from "test" where "name" = ?',
 * //   parameters: ['test'],
 * //   query: { kind: 'SelectQueryNode' } // only node kind by default
 * // }
 * ```
 */
export function precompileQuery<O>(
  queryBuilder: QueryBuilderOutput<Compilable<O>>,
  serialize: (value: unknown) => unknown = v => v,
) {
  return {
    /**
     * setup params
     * @param paramBuilder param builder
     * @returns function to {@link CompileFn compile}
     */
    setParam: <T extends Record<string, any>>(
      paramBuilder: ({ param, qb }: SetParamFn<O, T>) => Compilable<O>,
    ): CompileFn<O, T> => {
      let compiled: CompiledQuery<Compilable<O>>
      return (param, processRootOperatorNode) => {
        if (!compiled) {
          const { parameters, sql, query } = paramBuilder({
            qb: queryBuilder,
            param: getParam,
          }).compile()
          compiled = {
            sql,
            query: processRootOperatorNode?.(query) || { kind: query.kind } as any,
            parameters,
          }
        }
        return {
          ...compiled,
          parameters: compiled.parameters.map(p => (typeof p === 'string' && p.startsWith('__pre_'))
            ? serialize(param[p.slice(6)])
            : p,
          ),
        }
      }
    },
  }
}
