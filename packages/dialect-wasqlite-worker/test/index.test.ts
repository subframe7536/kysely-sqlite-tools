import { Worker as NodeWorker } from 'node:worker_threads'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { testCase } from '../../test-utils'
import { WaSqliteWorkerDialect } from '../src'

const { isModuleWorkerSupportMock, isOpfsSupportedMock } = vi.hoisted(() => ({
  isModuleWorkerSupportMock: vi.fn<() => boolean>(),
  isOpfsSupportedMock: vi.fn<() => boolean | Promise<boolean>>(),
}))

vi.mock('@subframe7536/sqlite-wasm', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@subframe7536/sqlite-wasm')>()),
  isModuleWorkerSupport: isModuleWorkerSupportMock,
  isOpfsSupported: isOpfsSupportedMock,
}))

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

class RecordingWorkerMock {
  static instances: RecordingWorkerMock[] = []

  onmessage: ((event: MessageEvent) => void) | null = null
  readonly options: WorkerOptions | undefined
  readonly url: string | URL
  readonly messages: unknown[] = []
  terminated = false

  constructor(url: string | URL, options?: WorkerOptions) {
    this.url = url
    this.options = options
    RecordingWorkerMock.instances.push(this)
  }

  postMessage(data: unknown): void {
    this.messages.push(data)
    const request = data as { id?: string | number; type?: string }
    if (request.type === 'init' || request.type === 'close') {
      queueMicrotask(() =>
        this.onmessage?.({
          data: { id: request.id, type: request.type === 'init' ? 'ready' : 'closed' },
        } as MessageEvent),
      )
    }
  }

  terminate(): void {
    this.terminated = true
  }
}

globalThis.Worker = WebWorkerMock as never

describe('wasqlite worker dialect test', () => {
  beforeEach(() => {
    globalThis.Worker = WebWorkerMock as never
    isModuleWorkerSupportMock.mockClear()
    isOpfsSupportedMock.mockClear()
    isModuleWorkerSupportMock.mockReturnValue(true)
    isOpfsSupportedMock.mockResolvedValue(false)
    RecordingWorkerMock.instances = []
  })

  it('mock web worker', async () => {
    const dialect = new WaSqliteWorkerDialect({
      fileName: ':memory:',
      preferOPFS: false,
      worker: new WebWorkerMock(new URL('./worker.mock.ts', import.meta.url)) as never,
    })

    await testCase(dialect, expect, true)
  })

  it('uses OPFS by default when supported', async () => {
    globalThis.Worker = RecordingWorkerMock as never
    isOpfsSupportedMock.mockResolvedValue(true)
    const url = vi.fn((useAsyncWasm: boolean) => `wasm-${String(useAsyncWasm)}`)

    const dialect = new WaSqliteWorkerDialect({
      fileName: 'opfs.db',
      url,
    })

    const driver = dialect.createDriver()
    await driver.init()

    expect(isOpfsSupportedMock).toHaveBeenCalledOnce()
    expect(url).toHaveBeenCalledWith(false)
    expect(RecordingWorkerMock.instances).toHaveLength(1)
    expect(RecordingWorkerMock.instances[0]?.options).toEqual({ type: 'module' })
    expect(RecordingWorkerMock.instances[0]?.messages).toEqual([
      {
        id: 'generic-sqlite-1',
        type: 'init',
        data: { fileName: 'opfs.db', useOPFS: true, url: 'wasm-false' },
      },
    ])
    await driver.destroy()
  })

  it('uses IndexedDB without OPFS detection when preferOPFS is false', async () => {
    globalThis.Worker = RecordingWorkerMock as never
    const url = vi.fn((useAsyncWasm: boolean) => `wasm-${String(useAsyncWasm)}`)

    const dialect = new WaSqliteWorkerDialect({
      fileName: 'idb.db',
      preferOPFS: false,
      url,
    })

    const driver = dialect.createDriver()
    await driver.init()

    expect(isOpfsSupportedMock).not.toHaveBeenCalled()
    expect(url).toHaveBeenCalledWith(true)
    expect(RecordingWorkerMock.instances[0]?.messages).toEqual([
      {
        id: 'generic-sqlite-1',
        type: 'init',
        data: { fileName: 'idb.db', useOPFS: false, url: 'wasm-true' },
      },
    ])
    await driver.destroy()
  })

  it('throws an actionable error without module worker support or a custom worker', async () => {
    globalThis.Worker = RecordingWorkerMock as never
    isModuleWorkerSupportMock.mockReturnValue(false)

    const dialect = new WaSqliteWorkerDialect({
      fileName: 'legacy.db',
      preferOPFS: false,
    })

    await expect(dialect.createDriver().init()).rejects.toThrow(
      'WaSqliteWorkerDialect requires module worker support for the built-in worker. Provide config.worker with a classic-compatible bundled worker for this browser.',
    )
    expect(RecordingWorkerMock.instances).toHaveLength(0)
  })

  it('passes module support to a custom worker factory', async () => {
    globalThis.Worker = RecordingWorkerMock as never
    isModuleWorkerSupportMock.mockReturnValue(false)
    const workerFactory = vi.fn(
      (_supportModuleWorker: boolean) => new RecordingWorkerMock('classic-worker.js'),
    )

    const dialect = new WaSqliteWorkerDialect({
      fileName: 'custom.db',
      preferOPFS: false,
      worker: workerFactory as never,
    })

    const driver = dialect.createDriver()
    await driver.init()

    expect(workerFactory).toHaveBeenCalledWith(false)
    expect(RecordingWorkerMock.instances).toHaveLength(1)
    expect(RecordingWorkerMock.instances[0]?.url).toBe('classic-worker.js')
    await driver.destroy()
  })
})
