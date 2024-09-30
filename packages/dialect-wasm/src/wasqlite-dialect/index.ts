import type { DatabaseConnection, Driver } from 'kysely'
import type { Promisable } from '../types'
import type { WaSqliteDatabase } from './type'
import { BaseDialect } from '../baseDialect'
import { WaSqliteDriver } from './driver'

/**
 * @deprecated please use 'kysely-wasqlite-dialect'
 */
export interface WaSqliteDialectConfig {
  database: WaSqliteDatabase | (() => Promisable<WaSqliteDatabase>)
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}

export class WaSqliteDialect extends BaseDialect {
  private config: WaSqliteDialectConfig

  /**
   * @deprecated Please use 'kysely-wasqlite-dialect'
   *
   * dialect for [wa-sqlite](https://github.com/rhashimoto/wa-sqlite)
   *
   * better for polyfill, can use `IndexedDB` or `OPFS` as backend
   *
   * @example
   * import * as SQLite from 'wa-sqlite'
   * import SQLiteAsyncESMFactory from 'wa-sqlite/dist/wa-sqlite-async.mjs'
   * import { IDBBatchAtomicVFS } from 'wa-sqlite/src/examples/IDBBatchAtomicVFS.js'
   * import { WaSqliteDialect } from 'kysely-wasm'
   * import WaSqliteURL from 'wa-sqlite/dist/wa-sqlite-async.wasm?url'
   *
   * const dialect = new WaSqliteDialect({
   *   async database() {
   *     const SQLiteAsyncModule = await SQLiteAsyncESMFactory({
   *       locateFile: () => WaSqliteURL,
   *     })
   *
   *     const sqlite = SQLite.Factory(SQLiteAsyncModule)
   *     const dbName = 'wa-sqlite-test'
   *     sqlite.vfs_register(new IDBBatchAtomicVFS(dbName))
   *     const db = await sqlite.open_v2(
   *       dbName, undefined, dbName,
   *     )
   *     return {
   *       sqlite,
   *       db,
   *     }
   *   },
   * })
   */
  constructor(config: WaSqliteDialectConfig) {
    super()
    this.config = config
  }

  createDriver(): Driver {
    return new WaSqliteDriver(this.config)
  }
}
