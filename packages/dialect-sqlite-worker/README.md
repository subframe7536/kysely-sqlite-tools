# worker dialect

execute sql in `node:worker_threads`, using [`better-sqlite3`](https://github.com/WiseLibs/better-sqlite3)

the type is also availiable for [`better-sqlite3-multiple-ciphers`](https://github.com/m4heshd/better-sqlite3-multiple-ciphers)

## install

```shell
pnpm add -D kysely kysely-sqlite-worker
pnpm add better-sqlite3
```

## Notice

the worker script is read from `join(__dirname, 'worker.js')`, please make sure it exists
