# serialize plugin

The following example will return an error when using sqlite dialects, unless using this plugin:

## usage

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

THIS PLUGIN SHOULD BE PLACED AT THE END OF PLUGINS ARRAY

## credit

[kysely #138](https://github.com/koskimas/kysely/pull/138)