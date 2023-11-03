# WaSqlite Worker Dialect

[kysely](https://github.com/kysely-org/kysely) dialect for [`wa-sqlite`](https://github.com/rhashimoto/wa-sqlite), execute sql in `Web Worker`, store data in [OPFS](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) or IndexedDB

## install

```shell
pnpm add kysely kysely-wasqlite-worker
```

## config

```ts
export interface WaSqliteWorkerDialectConfig {
  dbName: string
  /**
   * the URL of wa-sqlite WASM
   * @example
   * ```ts
   * // vite
   * import url from 'kysely-wasqlite-worker/dist/wa-sqlite-async.wasm?url'
   * ```
   */
  url?: string
  /**
   * worker for executing sql
   * @example
   * ```ts
   * // vite
   * import Worker from 'kysely-wasqlite-worker/dist/worker?worker'
   * ```
   */
  worker?: Worker
  /**
   * prefer to store in OPFS, fallback to IndexedDB
   */
  preferOPFS?: boolean
  onCreateConnection?: (connection: DatabaseConnection) => Promise<void>
}
```

## usage

see in [playground](../../playground/src/modules/wasqliteWorker.ts)

## limitation

only worked in secure environment, like:

- localhost
- https