import { WaSqliteWorkerDialect, isSupported } from 'kysely-wasqlite-worker'

// import Worker from 'kysely-wasqlite-worker/dist/worker?worker'
// import url from 'kysely-wasqlite-worker/dist/wa-sqlite-async.wasm?url'
import { testDB } from './utils'

const dialect = new WaSqliteWorkerDialect({
  fileName: 'wa-sqlite-worker-test',
  preferOPFS: true,
  // url,
  // worker: new Worker(),
})

export function useWaSqliteWorker() {
  console.log('start wa-sqlite-worker test')
  if (!isSupported()) {
    console.error('[wa-sqlite-worker]: unsupported browser')
    return
  }
  testDB(dialect)
    .then((data) => {
      data?.forEach(e => console.log('[wa-sqlite-worker]', e))
    })
}
