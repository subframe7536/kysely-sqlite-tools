var sqliteWasm = require("@subframe7536/sqlite-wasm");
var constant = require("@subframe7536/sqlite-wasm/constant");
var kyselyGenericSqlite = require("kysely-generic-sqlite");
var workerHelperWeb = require("kysely-generic-sqlite/worker-helper-web");
var defaultCreateDatabaseFn = async ({ fileName, url, useOPFS }) => {
  return (await import("./index-z2fEYO5s.js")).initSQLiteCore(
    (useOPFS ? (await import("./opfs-QFru_9Tg.js")).useOpfsStorage : (await import("./idb-CxboeKLJ.js")).useIdbStorage)(
      fileName,
      { url }
    )
  );
};
function createRowMapper(sqlite, stmt) {
  const cols = sqlite.column_names(stmt);
  return (row) => Object.fromEntries(cols.map((key, i) => [key, row[i]]));
}
async function queryData(core, sql, parameters) {
  const stmt = (await core.sqlite.statements(core.pointer, sql)[Symbol.asyncIterator]().next()).value;
  if (parameters?.length) {
    core.sqlite.bind_collection(stmt, parameters);
  }
  const size = core.sqlite.column_count(stmt);
  if (size === 0) {
    await core.sqlite.step(stmt);
    return {
      rows: [],
      insertId: kyselyGenericSqlite.parseBigInt(sqliteWasm.lastInsertRowId(core)),
      numAffectedRows: kyselyGenericSqlite.parseBigInt(sqliteWasm.changes(core))
    };
  }
  const mapRow = createRowMapper(core.sqlite, stmt);
  const result = new Array(size);
  let idx = 0;
  while (await core.sqlite.step(stmt) === constant.SQLITE_ROW) {
    result[idx++] = mapRow(core.sqlite.row(stmt));
  }
  return { rows: result };
}
async function* iterateDate(core, sql, parameters, chunkSize = 1) {
  const { sqlite, pointer } = core;
  let cache = new Array(chunkSize);
  for await (const stmt of sqlite.statements(pointer, sql)) {
    if (parameters?.length) {
      sqlite.bind_collection(stmt, parameters);
    }
    let idx = 0;
    const mapRow = createRowMapper(core.sqlite, stmt);
    while (1) {
      const result = await sqlite.step(stmt);
      if (result === constant.SQLITE_ROW) {
        cache[idx] = mapRow(core.sqlite.row(stmt));
        if (++idx === chunkSize) {
          yield cache.slice(0, idx);
          idx = 0;
        }
      } else if (result === constant.SQLITE_OK) {
        if (++idx === chunkSize) {
          yield [];
        }
      } else {
        if (idx > 0) {
          yield cache.slice(0, idx);
        }
        break;
      }
    }
  }
  cache = void 0;
}
function createOnMessageCallback(create, message) {
  workerHelperWeb.createWebOnMessageCallback(
    async (initData) => {
      const core = await create(initData);
      return createSqliteExecutor(core);
    },
    message
  );
}
function createSqliteExecutor(db) {
  return {
    db,
    query: async (_isSelect, sql, parameters) => await queryData(db, sql, parameters),
    close: async () => await sqliteWasm.close(db),
    iterator: (_isSelect, sql, parameters, chunkSize) => iterateDate(
      db,
      sql,
      parameters,
      chunkSize
    )
  };
}
createOnMessageCallback(defaultCreateDatabaseFn);
