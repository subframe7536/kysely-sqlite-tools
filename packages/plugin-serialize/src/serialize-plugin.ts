import type { KyselyPlugin, PluginTransformQueryArgs, PluginTransformResultArgs, QueryResult, RootOperationNode, UnknownRow } from 'kysely'
import type { QueryId } from 'kysely/dist/esm/util/query-id'
import { SerializeParametersTransformer } from './serialize-transformer'
import type { Deserializer, Serializer } from './serializer'
import { defaultDeserializer } from './serializer'

export interface SerializePluginOptions {
  /**
   * serialize params
   */
  serializer?: Serializer
  /**
   * deserialize params
   */
  deserializer?: Deserializer
  /**
   * only transform select query or raw sql return
   */
  selectOrRawOnly?: boolean
}

export class SerializePlugin implements KyselyPlugin {
  private serializeParametersTransformer: SerializeParametersTransformer
  private deserializer: Deserializer
  private only: boolean
  private ctx?: WeakSet<QueryId>

  /**
   * _**THIS PLUGIN SHOULD BE PLACED AT THE END OF PLUGINS ARRAY !!!**_
   *
   * reference from https://github.com/koskimas/kysely/pull/138
   *
   * The following example will return an error when using sqlite dialects, unless using this plugin:
   * ```ts
   * interface TestTable {
   *   id: Generated<number>
   *   person: { name: string; age: number; time: Date } | null
   *   gender: boolean
   *   blob: Uint8Array | null
   *   date: Date
   * }
   *
   * interface Database {
   *   test: TestTable
   * }
   *
   * const db = new Kysely<Database>({
   *   dialect: new SqliteDialect({
   *     database: new Database(':memory:'),
   *   }),
   *   plugins: [
   *     new SerializePlugin(),
   *   ],
   * })
   *
   * await db.insertInto('test').values({
   *   gender: true,
   *   person: { name: 'test', age: 2, time: new Date() },
   *   blob: Uint8Array.from([1, 2, 3]),
   *   date: new Date(),
   * }).execute()
   * ```
   *
   * You can also provide a custom serializer function:
   *
   * ```ts
   * const db = new Kysely<Database>({
   *   dialect: new SqliteDialect({
   *     database: new Database(":memory:"),
   *   }),
   *   plugins: [
   *     new SerializePlugin({
   *         serializer: (value) => {
   *             if (value instanceof Date) {
   *                 return formatDatetime(value)
   *             }
   *
   *             if (value !== null && typeof value === 'object') {
   *                 return JSON.stringify(value)
   *             }
   *
   *             return value
   *         }
   *     }),
   *   ],
   * })
   * ```
   */
  public constructor(options: SerializePluginOptions = {}) {
    const { deserializer = defaultDeserializer, selectOrRawOnly = false, serializer } = options
    this.serializeParametersTransformer = new SerializeParametersTransformer(serializer)
    this.deserializer = deserializer
    this.only = selectOrRawOnly
    selectOrRawOnly && (this.ctx = new WeakSet())
  }

  public transformQuery({ node, queryId }: PluginTransformQueryArgs): RootOperationNode {
    if (this.only && ['SelectQueryNode', 'RawNode'].includes(node.kind)) {
      this.ctx?.add(queryId)
    }
    return this.serializeParametersTransformer.transformNode(node)
  }

  public async transformResult(
    { result, queryId }: PluginTransformResultArgs,
  ): Promise<QueryResult<UnknownRow>> {
    const parsedResult = {
      ...result,
      rows: result.rows.map(row => Object.fromEntries(
        Object.entries(row).map(([key, value]) =>
          ([key, this.deserializer(value)]),
        ),
      )),
    }
    if (!this.only) {
      return parsedResult
    }
    this.ctx?.delete(queryId)
    return parsedResult
  }
}

/**
 * @deprecated prefer to use {@link SerializePlugin}
 */
export const SqliteSerializePlugin = SerializePlugin
