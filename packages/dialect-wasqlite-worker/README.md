# kysely-wasqlite-worker

[kysely](https://github.com/kysely-org/kysely) dialect for [`wa-sqlite`](https://github.com/rhashimoto/wa-sqlite), execute sql in `Web Worker`, store data in [OPFS](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) or IndexedDB

No need to set response header like [official wasm](../dialect-wasm/README.md#officialwasmdialect-performance)

## Install

```shell
pnpm add kysely kysely-wasqlite-worker @subframe7536/sqlite-wasm
```

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
import { customFunctionCore } from '@subframe7536/sqlite-wasm'
import { createOnMessageCallback, defaultCreateDatabaseFn } from 'kysely-wasqlite-worker'

onmessage = createOnMessageCallback(
  async (...args) => {
    const sqliteDB = await defaultCreateDatabaseFn(...args)
    customFunctionCore(sqliteDB, 'customFunction', (a, b) => a + b)
    return sqliteDB
  }
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
   * built-in: {@link useDefaultWorker}
   * @param supportModuleWorker if support { type: 'module' } in worker options
   * @example
   * import { useDefaultWorker } from 'kysely-wasqlite-worker'
   * @example
   * (support) => support
   *   ? new Worker(
   *       new URL('kysely-wasqlite-worker/worker-module', import.meta.url),
   *       { type: 'module', credentials: 'same-origin' }
   *     )
   *   : new Worker(
   *       new URL('kysely-wasqlite-worker/worker-classic', import.meta.url),
   *       { type: 'classic', name: 'test' }
   *     )
   */
  worker?: Worker | ((supportModuleWorker: boolean) => Worker)
  /**
   * wasm URL
   *
   * built-in: {@link useDefaultWasmURL}
   * @param useAsyncWasm if need to use wa-sqlite-async.wasm
   * @example
   * import { useDefaultWasmURL } from 'kysely-wasqlite-worker'
   * @example
   * (useAsync) => useAsync
   *   ? 'https://cdn.jsdelivr.net/gh/rhashimoto/wa-sqlite@v0.9.9/dist/wa-sqlite-async.wasm'
   *   : new URL('kysely-wasqlite-worker/wasm-sync', import.meta.url).href
   */
  url?: string | ((useAsyncWasm: boolean) => string)
  onCreateConnection?: (connection: DatabaseConnection) => Promisable<void>
}
```

see more in [playground](../../playground/src/modules/wasqliteWorker.ts)

if throw error when using `Vite` to build, add worker config

```ts
export default defineConfig({
  // ...
  worker: {
    format: 'es',
  },
})
```

## Limitation

- [minimal IndexedDB backend browser version](https://caniuse.com/mdn-api_lockmanager)
- [minimal OPFS backend browser version](https://caniuse.com/mdn-api_filesystemsyncaccesshandle)
- only worked in secure environment, like:
  - localhost
  - https
