# worker dialect

execute sql in `node:worker_threads`, using `better-sqlite3`

## install

```shell
pnpm add -D kysely kysely-sqlite-worker
pnpm add better-sqlite3
```

## Notice

the worker script is read from `join(__dirname, 'worker.js')`, please make sure it exists
