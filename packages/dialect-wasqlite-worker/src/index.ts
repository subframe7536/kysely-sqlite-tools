import type { DatabaseIntrospector, Dialect, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import type { WaSqliteWorkerDialectConfig } from './type'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { WaSqliteWorkerDriver } from './driver'

export type { Promisable, WaSqliteWorkerDialectConfig } from './type'
export { createOnMessageCallback } from './worker/utils'

export {
  customFunction,
  isIdbSupported,
  isModuleWorkerSupport,
  isOpfsSupported,
  type SQLiteDB,
} from '@subframe7536/sqlite-wasm'

export class WaSqliteWorkerDialect implements Dialect {
  /**
   * dialect for [`wa-sqlite`](https://github.com/rhashimoto/wa-sqlite),
   * execute sql in `Web Worker`,
   * store data in [OPFS](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) or IndexedDB
   *
   * @example
   * import { WaSqliteWorkerDialect } from 'kysely-wasqlite-worker'
   *
   * const dialect = new WaSqliteWorkerDialect({
   *   fileName: 'test',
   * })
   */
  constructor(
    private config: WaSqliteWorkerDialectConfig,
  ) { }

  createDriver(): Driver {
    return new WaSqliteWorkerDriver(this.config)
  }

  createQueryCompiler(): QueryCompiler {
    return new SqliteQueryCompiler()
  }

  createAdapter(): DialectAdapter {
    return new SqliteAdapter()
  }

  createIntrospector(db: Kysely<any>): DatabaseIntrospector {
    return new SqliteIntrospector(db)
  }
}
