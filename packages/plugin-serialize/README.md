# kysely-plugin-serialize

Auto serialize / deserialize plugin for [kysely](https://github.com/kysely-org/kysely)

## Install

```shell
pnpm add kysely kysely-plugin-serialize
```

## Usage

The following example will return an error when using sqlite dialects, unless using this plugin:

```ts
interface TestTable {
  id: Generated<number>
  person: { name: string, age: number, time: Date } | null
  gender: boolean
  blob: Uint8Array | null
  date: Date
}

interface Database {
  test: TestTable
}

const db = new Kysely<Database>({
  dialect: new SqliteDialect({
    database: new Database(':memory:'),
  }),
  plugins: [
    new SerializePlugin(),
  ],
})

await db.insertInto('test').values({
  gender: true,
  person: { name: 'test', age: 2, time: new Date() },
  blob: Uint8Array.from([1, 2, 3]),
  date: new Date(),
}).execute()
```

You can also provide a custom serializer function:

```ts
const db = new Kysely<Database>({
  dialect: new SqliteDialect({
    database: new Database(':memory:'),
  }),
  plugins: [
    new SerializePlugin({
      serializer: (value) => {
        if (value instanceof Date) {
          return formatDatetime(value)
        }

        if (value !== null && typeof value === 'object') {
          return JSON.stringify(value)
        }

        return value
      }
    }),
  ],
})
```

## Notice

THIS PLUGIN SHOULD BE PLACED AT THE END OF PLUGINS ARRAY

default serializer / deserializer is for SQLite

rules:

1. `number` / `bigint` / `ArrayBuffer` / `Buffer` will skip serialization
2. `boolean` will be serialized to `'true'` / `'false'`
3. `Date` will be serialized to ISO string
4. others will be serialized by `JSON.stringify` / `JSON.parse`, `Date` inside `object` will also be serialized

## Credit

[kysely #138](https://github.com/koskimas/kysely/pull/138)
