# DEPRECATED

# Kysely-sqlite-utils

SQLite utils for [kysely](https://github.com/kysely-org/kysely)

## utils

```ts
// create logger of `KyselyConfig.log`
function createKyselyLogger(options: LoggerOptions): (event: LogEvent) => void

// nest transaction using savepoint, release or rollback it later
function savePoint(db: Kysely<any> | Transaction<any>, name?: string): Promise<SavePoint>

// run with savepoint, auto release or rollback
function runWithSavePoint<DB extends Kysely<any> | Transaction<any>, O>(
  db: Kysely<any> | Transaction<any>,
  fn: (db: DB) => Promise<O>,
  name?: string
): Promise<O>

// check integrity (`integrity_check` pragma)
function checkIntegrity(db: DatabaseConnection | Kysely<any> | Transaction<any>): Promise<boolean>

// get or set db version (`user_version` pragma)
function getOrSetDBVersion(db: DatabaseConnection | Kysely<any> | Transaction<any>, version?: number): Promise<number>

// optimize pragma (typesafe `journal_mode`, `synchoronous`...)
function optimzePragma(conn: DatabaseConnection | Kysely<any> | Transaction<any>, options?: OptimizePragmaOptions): Promise<void>

// control whether to enable foreign keys, **no param check**
export async function foreignKeys(db: DatabaseConnection | Kysely<any> | Transaction<any>, enable: boolean): Promise<void>

// precompile querys for performance
function createPrecompile<T extends Record<string, any>>(options?: PrecompileOptions): {
  /**
   * setup params
   * @param queryBuilder param builder
   * @returns function to {@link CompileFn compile}
   */
  build: <O>(queryBuilder: (param: <K extends keyof T>(name: K) => T[K]) => Compilable<O>) => {
    [Symbol.dispose]: () => null
    dispose: () => null
    compile: (param: T) => CompiledQuery<QueryBuilderOutput<O>>
  }
}
// old util, reference from https://github.com/jtlapp/kysely-params
// function precompileQuery<O>(
//   queryBuilder: QueryBuilderOutput<Compilable<O>>,
//   serializer?: (value: unknown) => unknown
// ): {
//   setParam: <T extends Record<string, any>>(
//     paramBuilder: ({ param, qb }: SetParam<O, T>) => Compilable<O>
//   ) => CompileFn<O, T>
// }

// create a wrapper for soft delete
function createSoftDeleteExecutorFn<DB extends Record<string, any>>(deleteColumnName?: string): SqliteExecutorFn<DB, {
  withoutDelete: <W extends WhereInterface<DB, keyof DB>>(qb: W) => WhereInterface<DB, keyof DB>
}>
```

## Credit

- [kysely-params](https://github.com/jtlapp/kysely-params)

## Todo

- [ ] improve docs

## license

MIT
