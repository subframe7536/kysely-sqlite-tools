declare interface VFSOptions {
  durability?: 'default' | 'strict' | 'relaxed'
  purge?: 'deferred' | 'manual'
  purgeAtLeast?: number
}

declare module 'wa-sqlite/src/examples/IDBBatchAtomicVFS.js' {
  interface IDBBatchAtomicVFS extends SQLiteVFS {}
  export class IDBBatchAtomicVFS {
    constructor(idbDatabaseName: string, options?: VFSOptions)
  }
}