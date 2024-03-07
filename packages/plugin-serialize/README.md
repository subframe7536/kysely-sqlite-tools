# kysely-plugin-serialize

Auto serialize / deserialize plugin for [kysely](https://github.com/kysely-org/kysely)

## Purpose

Kysely does not process the values passed in, so in some cases you may need to manually handle the values to ensure they can be processed correctly by the dialect. Therefore, the main goal of this plugin is DX, so the values serialized by the default serializer may not conform to the usual standards. If you need to ensure the actual values in the database, you can write your own serializer.

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

default serializer / deserializer is built for SQLite

rules:

1. `number` / `bigint` / `ArrayBuffer` / `Buffer` will skip serialization
2. `boolean` will be serialized to `'true'` / `'false'`
3. `Date` will be serialized to ISO string
4. others will be serialized by `JSON.stringify` / `JSON.parse`

## Credit

[kysely #138](https://github.com/koskimas/kysely/pull/138)
