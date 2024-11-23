# Kysely Sqlite Tools

- [dialect](packages/dialect-wasm) for `wasm`, run SQLite in browser
- [dialect](packages/dialect-sqlite-worker) for [`better-sqlite3`](https://github.com/WiseLibs/better-sqlite3), running sql in worker_thread
- [dialect](packages/dialect-wasqlite-worker) for [`wa-sqlite`](https://github.com/rhashimoto/wa-sqlite), running sql in web worker, store data in OPFS or IndexedDB
- [dialect](packages/dialect-tauri) for [`Tauri`](https://tauri.app/), using [official sql plugin](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/sql)
- [dialect](packages/dialect-bun-worker/) for [`Bun SQLite`](https://bun.sh/docs/api/sqlite), running sql in worker
- [plugin](packages/plugin-serialize) that auto serialize and deserialize params
- ~~[sqlite utils](packages/sqlite-utils) useful utils for SQLite~~ deprecated
- ~~[sqlite builder](packages/sqlite-builder) for various features~~ move to [kysely sqlite builder](https://github.com/subframe7536/kysely-sqlite-builder)
