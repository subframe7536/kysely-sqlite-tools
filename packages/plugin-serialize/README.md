# serialize plugin

The following example will return an error when using sqlite dialects, unless using this plugin:

## usage

```ts
interface Person {
  firstName: string
  lastName: string
  tags: string[]
}

interface Database {
  person: Person
}

const db = new Kysely<Database>({
  dialect: new SqliteDialect({
    database: new Database(':memory:'),
  }),
  plugins: [
    new SqliteSerializePlugin(),
  ],
})

await db.insertInto('person')
  .values([{
    firstName: 'Jennifer',
    lastName: 'Aniston',
    tags: ['celebrity', 'actress'],
  }])
  .execute()
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

## credit

[kysely #138](https://github.com/koskimas/kysely/pull/138)