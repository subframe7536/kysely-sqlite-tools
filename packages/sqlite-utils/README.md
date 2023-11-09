# Kysely-sqlite-utils

SQLite utils for [kysely](https://github.com/kysely-org/kysely)

## utils

```ts
// create logger of `KyselyConfig.log`
function createKyselyLogger(options: LoggerOptions): (event: LogEvent) => void

// nest transaction using savepoint, release or rollback it later
function savePoint(db: Kysely<any> | Transaction<any>, name?: string): Promise<SavePoint>

// check integrity (`integrity_check` pragma)
function checkIntegrity(db: Kysely<any>): Promise<boolean>

// get or set db version (`user_version` pragma)
function getOrSetDBVersion(db: Kysely<any>, version?: number): Promise<number>

// optimize pragma (typesafe `journal_mode`, `synchoronous`...)
function optimzePragma(conn: DatabaseConnection, options?: OptimizePragmaOptions): Promise<void>

// precompile querys for performance
function precompileQuery<O>(
  queryBuilder: QueryBuilderOutput<Compilable<O>>,
  serializer?: (value: unknown) => unknown
): {
  setParam: <T extends Record<string, any>>(
    paramBuilder: ({ param, qb }: SetParam<O, T>) => Compilable<O>
  ) => CompileFn<O, T>
}
```

## credit

- [kysely-params](https://github.com/jtlapp/kysely-params)

## license

MIT