import wasmURL from '@subframe7536/sqlite-wasm/dist/wa-sqlite-async.wasm?url'
import {
  // isIdbSupported,
  // isModuleWorkerSupport,
  // isOpfsSupported,
  WaSqliteWorkerDialect,
} from 'kysely-wasqlite-worker'

import { testDB } from './utils'

export function runWaSqliteWorker() {
  const dialect = new WaSqliteWorkerDialect({
    fileName: 'wa-sqlite-worker-test',
    // test custom worker
    // worker: () => new Worker(new URL('kysely-wasqlite-worker/worker', import.meta.url), {
    //   type: 'module',
    // }),
    // test custom wasm URL
    url: () => wasmURL,
  })

  return testDB(dialect)
}
