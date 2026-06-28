# Kysely SQLite Utils

Various dialects for Kysely using SQLite

## Base Dialect

[dialect](packages/dialect-generic-sqlite) for generic SQLite, support run in current or worker thread

## Multiple Dialects

Base on `kysely-generic-sqlite`

- [dialect](packages/dialect-wasm) for `wasm`, run SQLite in browser
- [dialect](packages/dialect-sqlite-worker) for [`better-sqlite3`](https://github.com/WiseLibs/better-sqlite3), running sql in worker_thread
- [dialect](packages/dialect-wasqlite-worker) for [`wa-sqlite`](https://github.com/rhashimoto/wa-sqlite), running sql in web worker, store data in OPFS or IndexedDB
- [dialect](packages/dialect-tauri) for [`Tauri`](https://tauri.app/), using [official sql plugin](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/sql)
- [dialect](packages/dialect-bun-worker/) for [`Bun SQLite`](https://bun.sh/docs/api/sqlite), running sql in worker

## Other Old Utils

- ~~[plugin](packages/plugin-serialize) that auto serialize and deserialize params~~ move to [kysely-plugin-serialize](https://github.com/subframe7536/kysely-plugin-serialize)
- ~~[sqlite utils](packages/sqlite-utils) useful utils for SQLite~~ deprecated
- ~~[sqlite builder](packages/sqlite-builder) for various features~~ move to [kysely-sqlite-builder](https://github.com/subframe7536/kysely-sqlite-builder)

## Development

This repository uses [pnpm](https://pnpm.io/) workspaces. Install dependencies once from the repository root:

```sh
pnpm install
```

Common workspace commands:

```sh
pnpm dev       # watch-build all dialect packages
pnpm build     # build all dialect packages
pnpm qa        # lint, format, and typecheck
pnpm test      # build, then run shared Vitest suites
pnpm test:bun  # run the kysely-bun-worker-specific bun:test suite
```

## Release and publish

Version packages from the repository root:

```sh
pnpm release
```

Publishing intentionally uses npm trusted publishing from the GitHub Actions release workflow while the workspace is managed by pnpm.
