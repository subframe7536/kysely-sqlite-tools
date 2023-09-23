# serialize plugin

Auto serialize / deserialize values in sql

## install

```shell
pnpm add -D kysely-plugin-serialize
```

## usage

The following example will return an error when using sqlite dialects, unless using this plugin:

```ts
interface TestTable {
  id: Generated<number>
  person: { name: string; age: number; time: Date } | null
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
    new SqliteSerializePlugin(),
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
    new SqliteSerializePlugin({
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

## notice

1. THIS PLUGIN SHOULD BE PLACED AT THE END OF PLUGINS ARRAY
2. in default serializer, only custom handle `boolean` and `Date`. `number`/`bigint`/`ArrayBuffer` / `Buffer` are skiped, `boolean` will transform to `'true'`/`'false'`, `Date` will transform to ISO string and other types will be transformed by `JSON.stringify`/`JSON.parse`

## credit

[kysely #138](https://github.com/koskimas/kysely/pull/138)