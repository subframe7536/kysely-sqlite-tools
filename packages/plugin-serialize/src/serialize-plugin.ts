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
  }

  public transformQuery({ node, queryId }: PluginTransformQueryArgs): RootOperationNode {
    if (this.only && (node.kind === 'SelectQueryNode' || node.kind === 'RawNode')) {
      this.ctx?.add(queryId)
    }
    return this.serializeParametersTransformer.transformNode(node)
  }

  private async parseResult(rows: any[]) {
    if (!rows.length) {
      return []
    }
    return await Promise.all(rows.map(async (row) => {
      const deserializedRow = { ...row }
      for (const key in deserializedRow) {
        deserializedRow[key] = await this.deserializer(deserializedRow[key])
      }
      return deserializedRow
    }))
  }

  public async transformResult(
    { result, queryId }: PluginTransformResultArgs,
  ): Promise<QueryResult<UnknownRow>> {
    const parse = async () => ({
      ...result,
      rows: await this.parseResult(result.rows),
    })
    if (!this.only) {
      return await parse()
    }
    if (!this.ctx?.has(queryId)) {
      return result
    }
    this.ctx?.delete(queryId)
    return await parse()
  }
}

/**
 * @deprecated alias for {@link SerializePlugin}
 */
export const SqliteSerializePlugin = SerializePlugin
