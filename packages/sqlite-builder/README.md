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
import type { Generated } from 'kysely'
import { SqliteDB, SqliteSerializePlugin } from 'kysely-wrapper-sqlite'

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
const db = new SqliteDB<DB>({
  path: ':memory:',
  tables: {
    test: {
      column: {
        id: { type: 'increments' },
        person: { type: 'object', defaultTo: { name: 'test' } },
        gender: { type: 'boolean', notNull: true },
        createAt: { type: 'date' },
        updateAt: { type: 'date' },
      },
      property: {
        primary: 'id', // sqlite only support one single/composite primary key,
        index: ['person', ['id', 'gender']],
        timestamp: true
      },
    },
  },
  dropTableBeforeInit: true,
  plugins: [new SqliteSerializePlugin()],
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
0.39420008659362793ms drop table if exists "test" []
0.17670011520385742ms create table if not exists "test" ("id" integer primary key autoincrement, "person" text default '{"name":"test"}', "gender" text not null, "createAt" date, "updateAt" date) []
0.1129000186920166ms create index if not exists "idx_person" on "test" ("person") []
0.09209990501403809ms create index if not exists "idx_id_gender" on "test" ("id", "gender") []
0.10260009765625ms
      create trigger if not exists test_createAt
      after insert
      on "test"
      begin
        update "test"
        set "createAt" = datetime('now','localtime')
        where "id" = NEW."id";
      end
       []
0.14520001411437988ms
      create trigger if not exists test_updateAt
      after update
      on "test"
      begin
        update "test"
        set "updateAt" = datetime('now','localtime')
        where "id" = NEW."id";
      end
       []
0.029700040817260742ms begin []
0.9845001697540283ms insert into "test" ("gender") values (?) [ 'false' ]
0.04629993438720703ms commit []
0.11979985237121582ms select * from "test" []
result:
[
  {
    id: 1,
    person: { name: 'test' },
    gender: false,
    createAt: 2023-03-04T05:26:49.000Z,
    updateAt: 2023-03-04T05:26:49.000Z
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