import { Worker as NodeWorker } from 'node:worker_threads'

import { describe, expect, it } from 'vitest'

import { testCase } from '../../test-utils'
import { WaSqliteWorkerDialect } from '../src'

class WebWorkerMock {
  readonly messages: unknown[] = []
  onmessage: ((event: MessageEvent) => void) | null = null
  readonly #worker: NodeWorker

  constructor(url: URL) {
    this.#worker = new NodeWorker(url)
    this.#worker.on('message', (data) => this.onmessage?.({ data } as MessageEvent))
  }

  postMessage(data: unknown): void {
    this.messages.push(data)
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

    await testCase(dialect, expect, { stream: true })
  })

  it('propagates chunkSize to the worker stream request', async () => {
    const worker = new WebWorkerMock(new URL('./worker.mock.ts', import.meta.url))
    const dialect = new WaSqliteWorkerDialect({
      fileName: ':memory:',
      preferOPFS: false,
      worker: worker as never,
    })

    await testCase(dialect, expect, { stream: true })

    expect(worker.messages).toContainEqual([
      '3',
      true,
      'select "name" from "test" where "name" like ? order by "age"',
      ['stream%'],
      2,
    ])
  })
})
