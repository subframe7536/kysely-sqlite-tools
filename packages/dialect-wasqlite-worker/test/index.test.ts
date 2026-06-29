import { Worker as NodeWorker } from 'node:worker_threads'

import { describe, expect, it } from 'vitest'

import { testCase } from '../../test-utils'
import { WaSqliteWorkerDialect } from '../src'

class WebWorkerMock {
  onmessage: ((event: MessageEvent) => void) | null = null
  readonly #worker: NodeWorker

  constructor(url: URL) {
    this.#worker = new NodeWorker(url)
    this.#worker.on('message', (data) => this.onmessage?.({ data } as MessageEvent))
  }

  postMessage(data: unknown): void {
    this.#worker.postMessage(data)
  }

  terminate(): void {
    void this.#worker.terminate()
  }
}

globalThis.Worker = WebWorkerMock as never

describe('wasqlite worker dialect test', () => {
  it('mock web worker', async () => {
    const dialect = new WaSqliteWorkerDialect({
      fileName: ':memory:',
      preferOPFS: false,
      worker: new WebWorkerMock(new URL('./worker.mock.ts', import.meta.url)) as never,
    })

    await testCase(dialect as never, expect, false)
  })
})
