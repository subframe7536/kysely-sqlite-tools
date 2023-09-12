import type { KyselyPlugin, PluginTransformQueryArgs, PluginTransformResultArgs, QueryResult, RootOperationNode, UnknownRow } from 'kysely'
import { SerializeParametersTransformer } from './sqlite-serialize-transformer'
import type { Deserializer, Serializer } from './sqlite-serialize'
import { defaultDeserializer } from './sqlite-serialize'

export interface SqliteSerializePluginOptions {
  /**
   * Function responsible for serialization of parameters.
   * Defaults to `JSON.stringify` of boolean, objects and arrays, buffer to array
   * @param parameter unknown
  */
  serializer?: Serializer
  /**
    * Function responsible for deserialization of parameters
    *
    * - `number`/`null` ignore
    *
    * - `'true'` convert to `true`
    *
    * - `/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/` convert to Date
    *
    * - others converted by `JSON.parse`
    *
    * @param parameter unknown
    */
  deserializer?: Deserializer
}

export class SqliteSerializePlugin implements KyselyPlugin {
  private serializeParametersTransformer: SerializeParametersTransformer
  private deserializer: Deserializer

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
   *     new SqliteSerializePlugin(),
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
   *     new SqliteSerializePlugin({
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
  public constructor({ deserializer, serializer }: SqliteSerializePluginOptions = {}) {
    this.serializeParametersTransformer = new SerializeParametersTransformer(serializer)
    this.deserializer = deserializer || defaultDeserializer
  }

  public transformQuery({ node }: PluginTransformQueryArgs): RootOperationNode {
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
    { result }: PluginTransformResultArgs,
  ): Promise<QueryResult<UnknownRow>> {
    return {
      ...result,
      rows: await this.parseResult(result.rows),
    }
  }
}
