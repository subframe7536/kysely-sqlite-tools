# WaSqlite Worker Dialect

execute sql in `Web Worker`, using `wa-sqlite`, store data in IndexedDB

## install

```shell
pnpm add -D kysely kysely-wasqlite-worker
```

## usage

see in [playground](../../playground/src/modules/wasqliteWorker.ts)

## limitation

only worked in secure environment, like:

- localhost
- https