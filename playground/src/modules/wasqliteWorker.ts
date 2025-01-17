import wasmURL from '@subframe7536/sqlite-wasm/dist/wa-sqlite-async.wasm?url'

import {
  // isIdbSupported,
  // isModuleWorkerSupport,
  // isOpfsSupported,
  WaSqliteWorkerDialect,
} from 'kysely-wasqlite-worker'

import { testDB } from './utils'

export async function useWaSqliteWorker() {
  // console.log(wasmURL)
  const dialect = new WaSqliteWorkerDialect({
    fileName: 'wa-sqlite-worker-test',
    // test classic worker
    // worker: () => new Worker(
    //   new URL('kysely-wasqlite-worker/worker-classic', import.meta.url),
    // ),
    // test custom wasm URL
    url: () => wasmURL,
  })
  console.log('start wa-sqlite-worker test')
  testDB(dialect)
    .then(async (data) => {
      data?.forEach(e => console.log('[wa-sqlite-worker]', e))
      // const supportModuleWorker = isModuleWorkerSupport()
      // const supportIDB = isIdbSupported()
      // const supportOPFS = await isOpfsSupported()
      // console.log('support module worker:', supportModuleWorker)
      // console.log('support IDBBatchAtomicVFS:', supportIDB)
      // console.log('support AccessHandlePoolVFS:', supportOPFS)
    })
}
