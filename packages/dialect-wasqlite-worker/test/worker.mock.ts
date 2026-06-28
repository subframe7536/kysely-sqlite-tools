import { parentPort } from 'node:worker_threads'

import Database from 'better-sqlite3'

import { createWebOnMessageCallback } from '../../dialect-generic-sqlite/dist/worker-helper-web.js'
import { createSqliteExecutor } from '../../dialect-sqlite-worker/dist/index.mjs'

globalThis.postMessage = (data) => parentPort?.postMessage(data)
parentPort?.on('message', (data) => {
  const onmessage = globalThis.onmessage as ((event: MessageEvent) => void) | null
  onmessage?.({ data } as MessageEvent)
})

createWebOnMessageCallback(async ({ fileName }: { fileName?: string }) =>
  createSqliteExecutor(new Database(fileName || ':memory:')),
)
