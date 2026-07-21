# kysely-wasqlite-worker

[kysely](https://github.com/kysely-org/kysely) dialect for [`@subframe7536/sqlite-wasm`](https://github.com/subframe7536/sqlite-wasm) (using custom build [`wa-sqlite`](https://github.com/subframe7536/sqwab) under the hood), execute sql in `Web Worker`, store data in [OPFS](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) or IndexedDB

No need to set response header like [official wasm](../dialect-wasm/README.md#officialwasmdialect-performance)

> [!important]
> This package is ESM-only in v2.

## Install

```shell
bun add kysely kysely-wasqlite-worker @subframe7536/sqlite-wasm
```

`kysely-wasqlite-worker` is an ESM-only package and only works in modern browsers.

## Usage

```ts
import { WaSqliteWorkerDialect } from 'kysely-wasqlite-worker'

const dialect = new WaSqliteWorkerDialect({
  fileName: 'test',
})
```

### Custom Worker

in `worker.ts`

```ts
import { customFunctionCore, exportDatabase } from '@subframe7536/sqlite-wasm'
import { createOnMessageCallback, defaultCreateDatabaseFn } from 'kysely-wasqlite-worker'

createOnMessageCallback(
  async (init) => {
    const sqliteDB = await defaultCreateDatabaseFn(init)
    customFunctionCore(sqliteDB, 'myFunction', (a, b) => a + b)
    return sqliteDB
  },
  (executor, { type, payload }) => {
    if (type === 'export') {
      return exportDatabase(executor.db)
    }
    throw new Error(`Unknown worker request: ${type}`)
  },
)
```

## Config

```ts
export interface WaSqliteWorkerDialectConfig {
  /**
   * db file name
   */
  fileName: string
  /**
   * prefer to store data in OPFS
   * @default true
   */
  preferOPFS?: boolean
  /**
   * wasqlite worker
   *
   * The built-in worker uses the packaged ESM worker entry and requires module worker support.
   * Provide a custom worker factory that returns a classic-compatible bundled worker
   * when supporting browsers without module workers.
   * @param supportModuleWorker if support { type: 'module' } in worker options
   * @example
   * (support) => support
   *   ? new Worker(new URL('kysely-wasqlite-worker/worker', import.meta.url), {
   *       type: 'module',
   *       credentials: 'same-origin',
   *     })
   *   : new Worker(new URL('./my-classic-worker.js', import.meta.url))
   */
  worker?: Worker | ((supportModuleWorker: boolean) => Worker)
  /**
   * wasm URL
   *
   * When omitted, `@subframe7536/sqlite-wasm` resolves its default runtime asset.
   * @param useAsyncWasm if need to use wa-sqlite-async.wasm
   * @example
   * const sqliteWasmVersion = '1.3.0'
   * (useAsync) => useAsync
   *   ? `https://esm.sh/@subframe7536/sqlite-wasm@${sqliteWasmVersion}/dist/wa-sqlite-async.wasm`
   *   : new URL(`@subframe7536/sqlite-wasm/dist/wa-sqlite.wasm`, import.meta.url).href
   */
  url?: string | ((useAsyncWasm: boolean) => string)
  onCreateConnection?: (
    connection: DatabaseConnection,
    options?: AbortableOperationOptions,
  ) => Promisable<void>
}
```

Custom worker requests use `connection.request(type, payload)` from the main
thread. They are serialized with SQL execution.

see more in [playground](../../playground/src/modules/wasqliteWorker.ts)

If `Vite` needs an explicit worker output format, configure it in `vite.config.ts`:

```ts
export default defineConfig({
  // ...
  worker: {
    format: 'es',
  },
})
```

## Limitation

- [Minimal IndexedDB backend browser version](https://caniuse.com/mdn-api_lockmanager)
- [Minimal OPFS backend browser version](https://caniuse.com/mdn-api_filesystemsyncaccesshandle)
- Only worked in secure environment, like:
  - localhost
  - https
