import { initSQLiteCore } from '@subframe7536/sqlite-wasm'
import { createOnMessageCallback } from './utils'

createOnMessageCallback(async (fileName, config) => {
  const { useOPFS, url } = config
  return await initSQLiteCore(
    (
      useOPFS
        ? (await import('@subframe7536/sqlite-wasm/opfs')).useOpfsStorage
        : (await import('@subframe7536/sqlite-wasm/idb')).useIdbStorage
    )(
      fileName,
      { url },
    ),
  )
})
