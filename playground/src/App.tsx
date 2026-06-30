import { For, Show, createSignal } from 'solid-js'

import { deleteFile } from './modules/indexeddb'
import { runSqlJsMain } from './modules/mainThread'
import OfficialWorker from './modules/officialWasmWorker?worker'
import SqljsWorker from './modules/sqljsWorker?worker'
import type { TestRow } from './modules/utils'
import { runWaSqliteWorker } from './modules/wasqliteWorker'

type RunnerKey = 'sqljs-main' | 'sqljs-worker' | 'official-wasm' | 'wa-sqlite-worker'

type RunnerState = {
  key: RunnerKey
  label: string
}

type RunStatus = 'idle' | 'running' | 'success' | 'error'

type WorkerResultMessage = {
  type: 'result'
  rows: TestRow[]
}

type WorkerErrorMessage = {
  type: 'error'
  error: string
}

type WorkerMessage = WorkerResultMessage | WorkerErrorMessage

const runners: RunnerState[] = [
  { key: 'sqljs-main', label: 'SQL.js main thread' },
  { key: 'sqljs-worker', label: 'SQL.js worker' },
  { key: 'official-wasm', label: 'Official SQLite WASM' },
  { key: 'wa-sqlite-worker', label: 'wa-sqlite worker' },
]

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error)
}

function runWorker(worker: Worker) {
  return new Promise<TestRow[]>((resolve, reject) => {
    worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
      if (event.data.type === 'result') {
        resolve(event.data.rows)
        return
      }
      reject(new Error(event.data.error))
    }
    worker.onerror = (event) => reject(new Error(event.message))
    worker.postMessage({ type: 'run' })
  })
}

export default function App() {
  const [rows, setRows] = createSignal<TestRow[]>([])
  const [activeRunner, setActiveRunner] = createSignal<RunnerKey>('sqljs-main')
  const [status, setStatus] = createSignal<RunStatus>('idle')
  const [error, setError] = createSignal('')
  const [clearedAt, setClearedAt] = createSignal('')

  let sqljsWorker = new SqljsWorker()
  let officialWorker = new OfficialWorker()

  async function run(key: RunnerKey) {
    setActiveRunner(key)
    setStatus('running')
    setError('')
    setClearedAt('')

    try {
      const nextRows = await executeRunner(key)
      setRows(nextRows)
      setStatus('success')
    } catch (runError) {
      setStatus('error')
      setError(getErrorMessage(runError))
    }
  }

  function executeRunner(key: RunnerKey) {
    switch (key) {
      case 'sqljs-main':
        return runSqlJsMain()
      case 'sqljs-worker':
        return runWorker(sqljsWorker)
      case 'official-wasm':
        return runWorker(officialWorker)
      case 'wa-sqlite-worker':
        return runWaSqliteWorker()
    }
  }

  async function deleteDatabase() {
    const dbs = await window.indexedDB.databases()
    await Promise.all(
      dbs.map((db) => (db.name ? window.indexedDB.deleteDatabase(db.name) : undefined)),
    )
  }

  async function removeOpfsEntries() {
    const root = await navigator.storage?.getDirectory()
    if (!root) {
      return
    }
    await Promise.allSettled([
      root.removeEntry('test.db'),
      root.removeEntry('test.db-journal'),
      root.removeEntry('wa-sqlite-worker-test', { recursive: true }),
    ])
  }

  async function clear() {
    setStatus('running')
    setError('')
    sqljsWorker.terminate()
    officialWorker.terminate()
    await deleteFile('sqljs')
    await deleteFile('sqljsWorker')
    await deleteDatabase()
    await removeOpfsEntries()
    sqljsWorker = new SqljsWorker()
    officialWorker = new OfficialWorker()
    setRows([])
    setStatus('idle')
    setClearedAt(new Date().toLocaleTimeString())
  }

  return (
    <main class="shell">
      <section class="hero">
        <div class="eyebrow">Kysely SQLite Tools Playground</div>
        <h1>Explore SQLite WASM dialects without opening the console.</h1>
        <p>
          Run each backend, inspect the inserted rows, and verify persisted browser storage from a
          polished Solid interface.
        </p>
        <div class="hero-links">
          <a href="https://github.com/kysely-org/kysely" target="_blank" rel="noreferrer">
            Kysely
          </a>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API#origin_private_file_system"
            target="_blank"
            rel="noreferrer"
          >
            OPFS docs
          </a>
        </div>
      </section>

      <section class="panel controls-panel">
        <div>
          <h2>Choose a runner</h2>
          <p>
            Each action creates sample records in the shared test table and renders the latest query
            below.
          </p>
        </div>
        <div class="runner-actions">
          <For each={runners}>
            {(runner) => (
              <button
                classList={{ 'runner-button': true, active: activeRunner() === runner.key }}
                disabled={status() === 'running'}
                onClick={() => run(runner.key)}
                type="button"
              >
                {runner.label}
              </button>
            )}
          </For>
        </div>
        <button
          class="clear-button"
          disabled={status() === 'running'}
          onClick={clear}
          type="button"
        >
          Clear playground storage
        </button>
      </section>

      <section class="panel results-panel">
        <div class="results-header">
          <div>
            <h2>Test table</h2>
            <p>{rows().length} rows returned from the latest run.</p>
          </div>
          <span
            classList={{
              badge: true,
              running: status() === 'running',
              error: status() === 'error',
            }}
          >
            {status() === 'running' ? 'Running…' : status()}
          </span>
        </div>

        <Show when={error()}>
          <div class="alert">{error()}</div>
        </Show>
        <Show when={clearedAt()}>
          <div class="success">Storage cleared at {clearedAt()}.</div>
        </Show>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Blob bytes</th>
              </tr>
            </thead>
            <tbody>
              <Show
                when={rows().length > 0}
                fallback={
                  <tr>
                    <td class="empty" colSpan={5}>
                      Run a dialect to populate the visual table.
                    </td>
                  </tr>
                }
              >
                <For each={rows()}>
                  {(row) => (
                    <tr>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.created_at}</td>
                      <td>{row.updated_at}</td>
                      <td>{Array.from(row.blobtest).join(', ')}</td>
                    </tr>
                  )}
                </For>
              </Show>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
