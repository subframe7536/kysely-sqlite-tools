import type { DatabaseIntrospector, Dialect, DialectAdapter, Driver, Kysely, QueryCompiler } from 'kysely'
import { SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { WaSqliteWorkerDriver } from './driver'
import type { WaSqliteWorkerDialectConfig } from './type'

export { isIdbSupported, isOpfsSupported, isModuleWorkerSupport } from '@subframe7536/sqlite-wasm'

export class WaSqliteWorkerDialect implements Dialect {
  private config: WaSqliteWorkerDialectConfig

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
  constructor(config: WaSqliteWorkerDialectConfig) {
    this.config = config
  }

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
