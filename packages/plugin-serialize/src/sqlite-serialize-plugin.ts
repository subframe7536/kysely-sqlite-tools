import type { KyselyPlugin, PluginTransformQueryArgs, PluginTransformResultArgs, QueryResult, RootOperationNode, UnknownRow } from 'kysely'
import type { QueryId } from 'kysely/dist/cjs/util/query-id'
import { SerializeParametersTransformer } from './sqlite-serialize-transformer'
import type { BlobType, BlobTypeConstructor, Deserializer, Serializer } from './sqlite-serialize'
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
    * `number`/`null` ignore
    *
    * `'true'` convert to `true`
    *
    * `/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/` convert to Date
    *
    * `blob` convert to `Uint8Array`
    *
    * others converted by `JSON.parse`
    *
    * @param parameter unknown
    */
  deserializer?: Deserializer
  /**
   * return type for blob
   */
  blobType?: BlobType | BlobTypeConstructor
}

export class SqliteSerializePlugin implements KyselyPlugin {
  readonly #serializeParametersTransformer: SerializeParametersTransformer
  readonly #deserializer: Deserializer
  readonly #type: BlobTypeConstructor
  #data: WeakMap<QueryId, string>

  /**
   * reference from https://github.com/koskimas/kysely/pull/138
   *
   * see {@link SqliteSerializePluginOptions plugin option}
   *
   * The following example will return an error when using sqlite dialects, unless using this plugin:
   *
   * ```ts
   * interface Person {
   *   firstName: string
   *   lastName: string
   *   tags: string[]
   * }
   *
   * interface Database {
   *   person: Person
   * }
   *
   * const db = new Kysely<Database>({
   *   dialect: new SqliteDialect({
   *     database: new Database(":memory:"),
   *   }),
   *   plugins: [
   *     new SqliteSerializePlugin(),
   *   ],
   * })
   *
   * await db.insertInto('person')
   *   .values([{
   *     firstName: 'Jennifer',
   *     lastName: 'Aniston',
   *     tags: ['celebrity', 'actress'],
   *   }])
   *   .execute()
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
  public constructor(opt: SqliteSerializePluginOptions = {}) {
    // this.#deep = opt.deepDeserialize ?? false
    this.#serializeParametersTransformer = new SerializeParametersTransformer(
      opt.serializer,
    )
    this.#deserializer = opt.deserializer || defaultDeserializer
    this.#type = typeof opt.blobType === 'string' ? Reflect.get(globalThis, opt.blobType) : opt.blobType ?? Uint8Array
    this.#data = new WeakMap()
  }

  public transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
    const { node, queryId } = args
    if (node.kind === 'SelectQueryNode') {
      this.#data.set(queryId, node.kind)
    }
    return this.#serializeParametersTransformer.transformNode(args.node)
  }

  private async parseResult(rows: any[]) {
    return await Promise.all(rows.map(async (row) => {
      const deserializedRow = { ...row }
      for (const key in deserializedRow) {
        deserializedRow[key] = await this.#deserializer(deserializedRow[key], this.#type)
      }
      return deserializedRow
    }))
  }

  public async transformResult(
    args: PluginTransformResultArgs,
  ): Promise<QueryResult<UnknownRow>> {
    const { result, queryId } = args
    const { rows } = result
    const ctx = this.#data.get(queryId)
    if (rows && ctx === 'SelectQueryNode') {
      return {
        ...args.result,
        rows: await this.parseResult(rows),
      }
    }
    return args.result
  }
}
