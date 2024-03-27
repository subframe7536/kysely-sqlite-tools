import type {
  KyselyPlugin,
  PluginTransformQueryArgs,
  PluginTransformResultArgs,
  QueryResult,
  RootOperationNode,
  UnknownRow,
} from 'kysely'
import type { QueryId } from 'kysely/dist/esm/util/query-id'
import { SerializeParametersTransformer } from './serialize-transformer'
import type { Deserializer, Serializer } from './serializer'
import { defaultDeserializer, defaultSerializer } from './serializer'

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
   * node kind to skip transform
   */
  skipNodeKind?: Array<RootOperationNode['kind']>
}

export class SerializePlugin implements KyselyPlugin {
  private transformer: SerializeParametersTransformer
  private deserializer: Deserializer
  private skipNodeSet?: Set<RootOperationNode['kind']>
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
    const {
      deserializer = defaultDeserializer,
      serializer = defaultSerializer,
      skipNodeKind = [],
    } = options

    this.transformer = new SerializeParametersTransformer(serializer)
    this.deserializer = deserializer
    if (skipNodeKind.length) {
      this.skipNodeSet = new Set(skipNodeKind)
      this.ctx = new WeakSet()
    }
  }

  public transformQuery({ node, queryId }: PluginTransformQueryArgs): RootOperationNode {
    if (this.skipNodeSet?.has(node.kind)) {
      this.ctx?.add(queryId)
      return node
    }
    return this.transformer.transformNode(node)
  }

  public async transformResult(
    { result, queryId }: PluginTransformResultArgs,
  ): Promise<QueryResult<UnknownRow>> {
    return this.ctx?.has(queryId)
      ? result
      : { ...result, rows: this.parseRows(result.rows) }
  }

  private parseRows(rows: UnknownRow[]): UnknownRow[] {
    const result: UnknownRow[] = []
    for (const row of rows) {
      const parsedRow: UnknownRow = {}
      for (const [key, value] of Object.entries(row)) {
        parsedRow[key] = this.deserializer(value)
      }
      result.push(parsedRow)
    }
    return result
  }
}

/**
 * @deprecated prefer to use {@link SerializePlugin}
 */
export const SqliteSerializePlugin = SerializePlugin
