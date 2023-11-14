import {
  WaSqliteWorkerDialect,
  isIdbSupported,
  isModuleWorkerSupport,
  isOpfsSupported,
} from 'kysely-wasqlite-worker'

// import wasmURL from 'kysely-wasqlite-worker/wasm-sync?url'
import { testDB } from './utils'

const dialect = new WaSqliteWorkerDialect({
  fileName: 'wa-sqlite-worker-test',
  // test classic worker
  // worker: () => new Worker(
  //   new URL('kysely-wasqlite-worker/worker-classic', import.meta.url),
  // ),
  // test custom wasm URL
  // url: () => wasmURL,
})

export async function useWaSqliteWorker() {
  console.log('start wa-sqlite-worker test')
  testDB(dialect)
    .then(async (data) => {
      data?.forEach(e => console.log('[wa-sqlite-worker]', e))
      const supportModuleWorker = isModuleWorkerSupport()
      const supportIDB = isIdbSupported()
      const supportOPFS = await isOpfsSupported()
      console.log('support module worker:', supportModuleWorker)
      console.log('support IDBBatchAtomicVFS:', supportIDB)
      console.log('support AccessHandlePoolVFS:', supportOPFS)
    })
}
