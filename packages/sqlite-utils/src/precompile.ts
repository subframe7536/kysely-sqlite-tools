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
  param: <K extends keyof T>(name: K) => T[K]
}
/**
 * @param param custom params
 * @param processRootOperatorNode process `query` in {@link CompiledQuery},
 * default is `(node) => ({ kind: node.kind })`
 */
export type CompileFn<O, T extends Record<string, any>> = (param: T) => CompiledQuery<QueryBuilderOutput<O>>

export function getPrecompileParam<T extends Record<string, any>, K extends keyof T>(name: K): T[K] {
  return `__pre_${name as string}` as unknown as T[K]
}
export function checkPrecompileKey(p: unknown) {
  return (typeof p === 'string' && p.startsWith('__pre_')) ? p.slice(6) : undefined
}

export type PrecompileOptions = {
  serialize?: (value: unknown) => unknown
  processRootOperatorNode?: (node: RootOperationNode) => RootOperationNode
}

/**
 * create precompiled query
 * @param queryBuilder query builder without params
 * @param options custom parameter value serializer and node processor
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
  options: PrecompileOptions = {},
) {
  const {
    processRootOperatorNode = v => ({ kind: v.kind }),
    serialize = v => v,
  } = options
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
      return (param) => {
        if (!compiled) {
          const { parameters, sql, query } = paramBuilder({
            qb: queryBuilder,
            param: getPrecompileParam,
          }).compile()
          compiled = {
            sql,
            query: processRootOperatorNode(query) as any,
            parameters,
          }
        }
        return {
          ...compiled,
          parameters: compiled.parameters.map((p) => {
            const key = checkPrecompileKey(p)
            return key ? serialize(param[key]) : p
          }),
        }
      }
    },
  }
}

/**
 * another way to precompile query
 * @param options query options
 * @example
 * const select = createPrecompile<{ name: string }>(options)
 *   .query((param) =>
 *     db.selectFrom('test').selectAll().where('name', '=', param('name')),
 *   )
 * const compileResult = select.compile({ name: 'test' })
 * // {
 * //   sql: 'select * from "test" where "name" = ?',
 * //   parameters: ['test'],
 * //   query: { kind: 'SelectQueryNode' } // only node kind by default
 * // }
 * select.dispose() // clear cached query
 *
 * // or auto disposed by using
 * using selectWithUsing = createPrecompile<{ name: string }>(options)
 *   .build((param) =>
 *     db.selectFrom('test').selectAll().where('name', '=', param('name')),
 *   )
 */
export function createPrecompile<T extends Record<string, any>>(options: PrecompileOptions = {}) {
  const {
    processRootOperatorNode = v => ({ kind: v.kind }),
    serialize = v => v,
  } = options
  return {
    /**
     * setup params
     * @param queryBuilder param builder
     * @returns function to {@link CompileFn compile}
     */
    build: <O>(
      queryBuilder: (param: <K extends keyof T>(name: K) => T[K]) => Compilable<O>,
    ) => {
      let compiled: CompiledQuery<Compilable<O>> | null
      const dispose = () => compiled = null
      return {
        [Symbol.dispose]: dispose,
        dispose,
        compile: (param: T) => {
          if (!compiled) {
            const { parameters, sql, query } = queryBuilder(getPrecompileParam).compile()
            compiled = {
              sql,
              query: processRootOperatorNode(query) as any,
              parameters,
            }
          }
          return {
            ...compiled,
            parameters: compiled.parameters.map((p) => {
              const key = checkPrecompileKey(p)
              return key ? serialize(param[key]) : p
            }),
          } as CompiledQuery<QueryBuilderOutput<O>>
        },
      }
    },
  }
}
