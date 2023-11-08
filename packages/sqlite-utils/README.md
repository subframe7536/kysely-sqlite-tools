# Kysely-sqlite-utils

SQLite utils for [kysely](https://github.com/kysely-org/kysely)

## features

- nest transaction support (using `savePoint`)
- check integrity (`integrity_check` pragma)
- precompile querys for performance
- get or set db version (`user_version` pragma)
- optimize pragma (typesafe `journal_mode`, `synchoronous`...)
- create kysely logger

## credit

- [kysely-params](https://github.com/jtlapp/kysely-params)

## license
MIT