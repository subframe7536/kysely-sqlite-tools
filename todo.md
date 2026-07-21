# Verified Issue Remediation TODO

Planned against commit `10b4b51` on 2026-07-21. The audit was read-only except for this file.

## Verification summary

All seven reported issues are reproducible. Item 6 is an adapter API gap rather than a bug in `defaultIsQuery`: the generic package intentionally avoids parsing raw SQL, but the affected adapters do not expose the existing `isQuery` escape hatch.

| Status | Priority | Issue                                                              | Effort | Fix risk | Confidence |
| ------ | -------- | ------------------------------------------------------------------ | ------ | -------- | ---------- |
| TODO   | P0       | Merge duplicate Bun SQLite type imports                            | S      | Low      | High       |
| TODO   | P1       | Preserve `Buffer` database sources across the Node worker boundary | S      | Low      | High       |
| TODO   | P1       | Recreate the default Bun worker after failed initialization        | S      | Medium   | High       |
| TODO   | P1       | Apply the documented `preferOPFS: true` default                    | S      | Low      | High       |
| TODO   | P1       | Remove the invalid built-in classic-worker fallback                | S      | Medium   | High       |
| TODO   | P2       | Expose raw-query classification in Tauri, NodeWasm, and CrSqlite   | M      | Medium   | High       |
| TODO   | P2       | Await direct Promise database values in the Tauri dialect          | S      | Low      | High       |

## Recommended execution order

1. Complete item 1 first because it restores the release lint gate.
2. Complete items 2 through 5 next; they are independent production correctness fixes.
3. Complete items 6 and 7 after the P1 work; they change public adapter configuration or documented behavior.
4. Run the full verification gate at the end. Items 4 and 5 may share one wa-sqlite test file, but they should remain separate commits so either behavior can be reverted independently.

## 1. Merge duplicate Bun SQLite type imports

- [ ] Replace the two `bun:sqlite` type-only imports in `packages/dialect-bun-worker/src/executor.ts:1-2` with one import containing both `Database` and `Statement`.
- [ ] Do not change runtime imports or executor behavior.
- [ ] Run `pnpm lint:check`; it must exit 0 with no `import(no-duplicates)` diagnostic.

Observed failure:

```text
packages/dialect-bun-worker/src/executor.ts:1:32: error import(no-duplicates):
Module 'bun:sqlite' is imported more than once in this file
```

Scope: `packages/dialect-bun-worker/src/executor.ts` only.

## 2. Preserve Buffer database sources across the Node worker boundary

`SqliteWorkerDialectConfig.source` accepts `Buffer` at `packages/dialect-sqlite-worker/src/index.ts:15-20`. The main thread places it in `workerData` at lines 48-52, but Node structured cloning delivers it to the worker as a `Uint8Array`. `defaultCreateDatabaseFn` forwards that value unchanged to better-sqlite3 at `packages/dialect-sqlite-worker/src/worker/utils.ts:21-22`, which rejects it with `TypeError: Expected first argument to be a string`.

- [ ] Normalize the worker-side `src` value before database construction: keep string paths unchanged and reconstruct a Node `Buffer` from the cloned byte view.
- [ ] Keep the public `source` contract unchanged and avoid copying string sources.
- [ ] Add a regression test in `packages/dialect-sqlite-worker/test/index.test.ts` that serializes a populated in-memory better-sqlite3 database, passes that `Buffer` through the default worker, and verifies a pre-existing row can be queried.
- [ ] Cover the default ESM worker path used by the current test suite. If the normalization is placed in shared worker code, do not duplicate the same assertion for CJS.

Verification:

```sh
pnpm exec vitest run packages/dialect-sqlite-worker/test/index.test.ts
```

Expected result: the suite passes, and a serialized `Buffer` source returns its seeded row instead of rejecting initialization.

Scope: `packages/dialect-sqlite-worker/src/worker/utils.ts` and `packages/dialect-sqlite-worker/test/index.test.ts`. Stop if the fix requires changing the public source type away from `Buffer`.

## 3. Recreate the default Bun worker after failed initialization

`BunWorkerDialect` currently creates its default worker once in the constructor at `packages/dialect-bun-worker/src/index.ts:23-25`, then captures that instance in the executor closure. When `onCreateConnection` rejects, `GenericSqliteWorkerDriver` terminates the worker and clears its state at `packages/dialect-generic-sqlite/src/worker/driver.ts:60-68`. Kysely retries failed initialization, but the closure returns the already-terminated worker, so the second init request never receives a response.

Runtime reproduction at the planned commit:

```text
FIRST_ERROR setup failed
SECOND_TIMEOUT ATTEMPTS 1
```

- [ ] Move default worker construction into the executor passed to `super`, so every initialization attempt owns a fresh default worker.
- [ ] Preserve one worker per successful driver lifetime; do not create a worker per query.
- [ ] Decide the custom-worker retry contract explicitly. The preferred backward-compatible API is to continue accepting a `Worker` instance and additionally accept a worker factory for callers that need retryable custom workers. Document that an instance cannot be recreated after termination.
- [ ] Add a Bun regression test where `onCreateConnection` fails once, the first query rejects with that error, and a second query on the same `Kysely` instance succeeds within a bounded timeout.
- [ ] Assert the callback runs twice and destroy the database in `finally`.

Verification:

```sh
bun test packages/dialect-bun-worker/test/index.test.ts
```

Expected result: both the existing worker query and the fail-once/retry query pass without a timeout.

Scope: `packages/dialect-bun-worker/src/index.ts`, `packages/dialect-bun-worker/src/type.ts` if a factory is exposed, the package README if the public type changes, and `packages/dialect-bun-worker/test/index.test.ts`. Do not change generic driver retry semantics unless a new test proves a dialect-local fix cannot work.

## 4. Apply the documented preferOPFS default

`WaSqliteWorkerDialectConfig.preferOPFS` documents `@default true` at `packages/dialect-wasqlite-worker/src/type.ts:8-12`. The constructor leaves it undefined at `packages/dialect-wasqlite-worker/src/index.ts:22`, and line 25 treats undefined as false, so omitted configuration always selects IndexedDB.

Observed init payloads with OPFS support stubbed as available:

```text
preferOPFS omitted -> useOPFS false
preferOPFS true    -> useOPFS true
```

- [ ] Default `preferOPFS` to `true` during configuration destructuring.
- [ ] Preserve explicit `preferOPFS: false` as the opt-out that skips OPFS detection and uses IndexedDB.
- [ ] Add tests that mock `isOpfsSupported`: omitted preference with support returns `useOPFS: true`; explicit false returns `useOPFS: false` and does not require OPFS support.
- [ ] Assert the `url` callback still receives `useAsyncWasm = !useOPFS` for both branches.

Verification:

```sh
pnpm exec vitest run packages/dialect-wasqlite-worker/test/index.test.ts
```

Expected result: all existing tests pass and the new default/opt-out cases observe the correct worker init data.

Scope: `packages/dialect-wasqlite-worker/src/index.ts` and `packages/dialect-wasqlite-worker/test/index.test.ts`.

## 5. Remove the invalid built-in classic-worker fallback

When module workers are unavailable, `packages/dialect-wasqlite-worker/src/index.ts:36-38` starts the same packaged `worker.js` without `{ type: 'module' }`. The emitted `packages/dialect-wasqlite-worker/dist/worker.js` begins with a static `import`, so classic-script parsing fails before initialization. The package is intentionally ESM-only, and `packages/dialect-wasqlite-worker/src/type.ts:14-28` already documents a custom classic-worker factory.

Verified classic-script parse result:

```text
SyntaxError: Cannot use import statement outside a module
```

- [ ] Keep the built-in worker on the module-worker path only.
- [ ] When module workers are unsupported and no custom worker is provided, throw an actionable error that tells the caller to provide `config.worker` with a classic-compatible bundled worker.
- [ ] Preserve the custom worker factory call with `supportModuleWorker === false`; this remains the supported legacy-browser escape hatch.
- [ ] Add tests for: built-in module worker construction, explicit failure without module support, and a custom factory receiving false and supplying a usable worker.
- [ ] Update the wa-sqlite README/JSDoc so it never implies that the packaged ESM worker can run as a classic script.

Verification:

```sh
pnpm exec vitest run packages/dialect-wasqlite-worker/test/index.test.ts
pnpm --filter kysely-wasqlite-worker build
node -e "const fs=require('node:fs');const vm=require('node:vm');const code=fs.readFileSync('packages/dialect-wasqlite-worker/dist/worker.js','utf8');try{new vm.Script(code);process.exitCode=1}catch(e){if(!String(e.message).includes('import statement'))throw e}"
```

Expected result: tests and build pass; the final check confirms the emitted worker remains ESM, while no runtime code attempts to load it as classic.

Scope: `packages/dialect-wasqlite-worker/src/index.ts`, `packages/dialect-wasqlite-worker/src/type.ts`, `packages/dialect-wasqlite-worker/README.md`, and package tests. Do not add a second classic bundle unless maintainers explicitly choose to support and test a separate distribution artifact.

## 6. Expose raw-query classification in Tauri, NodeWasm, and CrSqlite

`buildQueryFn` intentionally classifies `RawNode` as a write at `packages/dialect-generic-sqlite/src/base.ts:150-187` and exposes `IGenericSqliteExecutor.isQuery` for ambiguous statements. Tauri, NodeWasm, and CrSqlite call `buildQueryFn` but provide no `isQuery` option in their public configs:

- `packages/dialect-tauri/src/index.ts:15-30`
- `packages/dialect-wasm/src/dialects/node-wasm.ts:21-38`
- `packages/dialect-wasm/src/dialects/crsqlite.ts:20-39`

At the planned commit, `sql.raw('select 1 as value')` returned `rows: []` in all three adapters. The CrSqlite reproduction called `execA` for both the raw SELECT and `last_insert_rowid()`; it never called `execO`.

- [x] Add an optional `isQuery` classifier to `TauriSqliteDialectConfig`, `NodeWasmDialectConfig`, and `CrSqliteDialectConfig`, reusing the exact `IGenericSqliteExecutor['isQuery']` signature.
- [x] Pass the classifier into each `buildQueryFn` call.
- [x] Keep the conservative default unchanged. Do not parse SQL with a prefix regex because comments, CTEs, PRAGMAs, and write statements with `RETURNING` make that behavior unreliable.
- [x] Document a raw SELECT example for the affected public adapters, including that users must classify any additional row-returning raw statements they rely on.
- [x] Add adapter-level tests that execute `sql.raw('select 1 as value')` with a supplied classifier and assert `[{ value: 1 }]`. Also assert normal Kysely SELECT and mutation behavior remains unchanged.
- [x] Add a CrSqlite mock assertion proving the classified query calls `execO`, not `execA`.

Verification:

```sh
pnpm exec vitest run packages/dialect-tauri/test/index.test.ts packages/dialect-wasm/test/index.test.ts
pnpm typecheck
```

Expected result: raw SELECT returns rows when the classifier opts in, existing query-builder behavior passes, and all public config types compile.

Scope: the three adapter config/source files, their README/JSDoc, and their existing test files. Do not change `defaultIsQuery` or add SQL parsing in the generic package.

## 7. Await direct Promise database values in the Tauri dialect

The README declares `database: Promisable<TauriSqlDB> | ((prefix) => Promisable<TauriSqlDB>)` at `packages/dialect-tauri/README.md:29-38`, but the source type only allows a database instance or callback at `packages/dialect-tauri/src/type.ts:7-23`. Runtime code at `packages/dialect-tauri/src/index.ts:16-18` awaits only the callback branch. Passing `Database.load(...)` directly therefore stores the Promise as `db`, and the first SELECT fails with `TypeError: db.select is not a function`.

- [x] Make the source type match the documented contract by accepting `Promisable<Database>` directly as well as the prefix callback.
- [x] Await both branches before building the executor. Preserve the `'sqlite:'` argument for callback users.
- [x] Add a Tauri test that supplies `Promise.resolve(mockDatabase)` directly and verifies a query succeeds.
- [x] Correct the README and source JSDoc examples so any callback using `await appDataDir()` is declared `async`.

Verification:

```sh
pnpm exec vitest run packages/dialect-tauri/test/index.test.ts
pnpm typecheck
```

Expected result: instance, direct Promise, synchronous callback, and asynchronous callback inputs all initialize to a database object before the first query.

Scope: `packages/dialect-tauri/src/index.ts`, `packages/dialect-tauri/src/type.ts`, `packages/dialect-tauri/README.md`, and `packages/dialect-tauri/test/index.test.ts`.

## Full completion gate

- [ ] `pnpm lint:check` exits 0.
- [ ] `pnpm format:check` exits 0.
- [ ] `pnpm typecheck` exits 0.
- [ ] `pnpm build && pnpm test` exits 0, including the Bun suite.
- [ ] `pnpm smoke:packages` exits 0.
- [ ] `pnpm audit --prod` reports no known vulnerabilities.
- [ ] `git diff --check` exits 0.
- [ ] Review `git diff --stat` and confirm no files outside the scopes above changed.

Baseline results at `10b4b51`: typecheck, formatting, Vitest (17 tests), Bun tests (2 tests), package smoke tests, and production dependency audit passed. Only `pnpm lint:check` failed, for item 1. The sqlite-worker CJS root entry and Bun's CJS `normal` entry were also exercised with real queries successfully, so no CJS interoperability task is needed for the previously reported issue #41.
