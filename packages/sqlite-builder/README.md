# Kysely-sqlite-builder

kysely wrapper for sqlite

## features

- generate table by config
- auto serialize/deserialize
- auto insert create time and update time

## install

```shell
pnpm i better-sqlite3 kysely-wrapper-sqlite
```

## example

```ts
interface DB {
  test: TestTable
}
interface TestTable {
  id: Generated<number>
  person: { name: string } | null
  gender: boolean
  createAt: Date | null
  updateAt: Date | null
}
const db = new SqliteBuilder<DB>({
  dialect: new SqliteDialect({
    database: new Database(':memory:'),
  }),
  tables: {
    test: {
      columns: {
        id: { type: 'increments' },
        person: { type: 'object', defaultTo: { name: 'test' } },
        gender: { type: 'boolean', notNull: true },
        createAt: { type: 'date' },
        updateAt: { type: 'date' },
      },
      property: {
        primary: 'id', // sqlite only support one single/composite primary key,
        index: ['person', ['id', 'gender']],
        timestamp: true,
      },
    },
  },
  dropTableBeforeInit: true,
  errorLogger: reason => console.error(reason),
  queryLogger: (queryInfo, time) => console.log(`${time}ms`, queryInfo.sql, queryInfo.parameters),
})
// manually generate table
db.init(true)
  // auto generate table
  .then(() => db.transaction(trx => trx.insertInto('test').values({ gender: false }).execute()))
  // auto generate table
  .then(() => db.exec(d => d.selectFrom('test').selectAll().execute()))
  .then((result) => {
    console.log('result:')
    console.log(result)
  })
  .then(() => {
    const { sql, parameters } = db.toSQL(d => d
      .selectFrom('test')
      .where('person', '=', { name: '1' })
      .selectAll(),
    )
    console.log(sql)
    console.log(parameters)
  })
```

### log

```log
6.895100001245737ms drop table if exists "test" []
5.431900002062321ms create table if not exists "test" ("id" integer primary key autoincrement, "person" text default '{"name":"test"}', "gender" text not null, "createAt" text, "updateAt" text) []
5.303100001066923ms create index if not exists "idx_person" on "test" ("person") []
5.393900003284216ms create index if not exists "idx_id_gender" on "test" ("id", "gender") []
4.941399998962879ms
      create trigger if not exists test_createAt
      after insert
      on "test"
      begin
        update "test"
        set "createAt" = datetime('now','localtime')
        where "id" = NEW."id";
      end
       []
5.110400002449751ms
      create trigger if not exists test_updateAt
      after update
      on "test"
      begin
        update "test"
        set "updateAt" = datetime('now','localtime')
        where "id" = NEW."id";
      end
       []
0.10300000011920929ms begin []
2.877199999988079ms insert into "test" ("gender") values (?) [ 'false' ]
4.603500001132488ms commit []
0.2833000011742115ms select * from "test" []
result:
[
  {
    id: 1,
    person: { name: 'test' },
    gender: false,
    createAt: 2023-04-23T08:40:33.000Z,
    updateAt: 2023-04-23T08:40:33.000Z
  }
]
select * from "test" where "person" = ?
[ '{"name":"1"}' ]
```

## credit

- [trilogy](https://github.com/haltcase/trilogy)
- [kysely #138](https://github.com/koskimas/kysely/pull/138)

## license
MIT