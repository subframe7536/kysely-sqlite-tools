import { initSQLiteCore } from '@subframe7536/sqlite-wasm'
import { createOnMessageCallback } from './utils'

createOnMessageCallback(
  async ({ fileName, url, useOPFS }) => {
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
  },
)
