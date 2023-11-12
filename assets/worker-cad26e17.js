var v = 0, G = 5, z = 10, J = 12, W = 14, T = 21, N = 25, k = 27, O = 100, H = 101, X = 3850, Y = 522, j = 1, x = 2, K = 4, Z = 8, $ = 256;
var V = 2048;
var d = 16384, M = 524288, nn = 0, tn = 1, rn = 2, en = 3, sn = 4, cn = 512, on = 1024, un = 2048, fn = 16384, Q = 1, P = 2, R = 3, U = 4, B = 5, D = 0x7fffffffffffffffn, C = -0x8000000000000000n, b = class extends Error {
  constructor(c, s2) {
    super(c), this.code = s2;
  }
}, q = true;
function an(c) {
  let s2 = {}, m2 = c._getSqliteFree(), y = c._malloc(8), w2 = [y, y + 4];
  function g(n) {
    if (typeof n != "string")
      return 0;
    let r = c.lengthBytesUTF8(n), t = c._sqlite3_malloc(r + 1);
    return c.stringToUTF8(n, t, r + 1), t;
  }
  function L(n, r) {
    return BigInt(r) << 32n | BigInt(n) & 0xffffffffn;
  }
  let A = function() {
    let n = BigInt(Number.MAX_SAFE_INTEGER) >> 32n, r = BigInt(Number.MIN_SAFE_INTEGER) >> 32n;
    return function(t, e) {
      return e > n || e < r ? L(t, e) : e * 4294967296 + (t & 2147483647) - (t & 2147483648);
    };
  }(), S2 = /* @__PURE__ */ new Set();
  function I(n) {
    if (!S2.has(n))
      throw new b("not a database", T);
  }
  let l = /* @__PURE__ */ new Map();
  function f(n) {
    if (!l.has(n))
      throw new b("not a statement", T);
  }
  s2.bind_collection = function(n, r) {
    f(n);
    let t = Array.isArray(r), e = s2.bind_parameter_count(n);
    for (let o = 1; o <= e; ++o) {
      let i = t ? o - 1 : s2.bind_parameter_name(n, o), a = r[i];
      a !== void 0 && s2.bind(n, o, a);
    }
    return v;
  }, s2.bind = function(n, r, t) {
    switch (f(n), typeof t) {
      case "number":
        return t === (t | 0) ? s2.bind_int(n, r, t) : s2.bind_double(n, r, t);
      case "string":
        return s2.bind_text(n, r, t);
      default:
        return t instanceof Uint8Array || Array.isArray(t) ? s2.bind_blob(n, r, t) : t === null ? s2.bind_null(n, r) : typeof t == "bigint" ? s2.bind_int64(n, r, t) : t === void 0 ? k : (console.warn("unknown binding converted to null", t), s2.bind_null(n, r));
    }
  }, s2.bind_blob = function() {
    let n = "sqlite3_bind_blob", r = c.cwrap(n, ...u("nnnnn:n"));
    return function(t, e, o) {
      f(t);
      let i = o.byteLength ?? o.length, a = c._sqlite3_malloc(i);
      c.HEAPU8.subarray(a).set(o);
      let p = r(t, e, a, i, m2);
      return _(n, p, l.get(t));
    };
  }(), s2.bind_parameter_count = function() {
    let n = "sqlite3_bind_parameter_count", r = c.cwrap(n, ...u("n:n"));
    return function(t) {
      return f(t), r(t);
    };
  }(), s2.bind_double = function() {
    let n = "sqlite3_bind_double", r = c.cwrap(n, ...u("nnn:n"));
    return function(t, e, o) {
      f(t);
      let i = r(t, e, o);
      return _(n, i, l.get(t));
    };
  }(), s2.bind_int = function() {
    let n = "sqlite3_bind_int", r = c.cwrap(n, ...u("nnn:n"));
    return function(t, e, o) {
      if (f(t), o > 2147483647 || o < -2147483648)
        return N;
      let i = r(t, e, o);
      return _(n, i, l.get(t));
    };
  }(), s2.bind_int64 = function() {
    let n = "sqlite3_bind_int64", r = c.cwrap(n, ...u("nnnn:n"));
    return function(t, e, o) {
      if (f(t), o > D || o < C)
        return N;
      let i = o & 0xffffffffn, a = o >> 32n, p = r(t, e, Number(i), Number(a));
      return _(n, p, l.get(t));
    };
  }(), s2.bind_null = function() {
    let n = "sqlite3_bind_null", r = c.cwrap(n, ...u("nn:n"));
    return function(t, e) {
      f(t);
      let o = r(t, e);
      return _(n, o, l.get(t));
    };
  }(), s2.bind_parameter_name = function() {
    let n = "sqlite3_bind_parameter_name", r = c.cwrap(n, ...u("n:s"));
    return function(t, e) {
      return f(t), r(t, e);
    };
  }(), s2.bind_text = function() {
    let n = "sqlite3_bind_text", r = c.cwrap(n, ...u("nnnnn:n"));
    return function(t, e, o) {
      f(t);
      let i = g(o), a = r(t, e, i, -1, m2);
      return _(n, a, l.get(t));
    };
  }(), s2.changes = function() {
    let n = "sqlite3_changes", r = c.cwrap(n, ...u("n:n"));
    return function(t) {
      return I(t), r(t);
    };
  }(), s2.close = function() {
    let n = "sqlite3_close", r = c.cwrap(n, ...u("n:n"), { async: q });
    return async function(t) {
      I(t);
      let e = await r(t);
      return S2.delete(t), _(n, e, t);
    };
  }(), s2.column = function(n, r) {
    f(n);
    let t = s2.column_type(n, r);
    switch (t) {
      case U:
        return s2.column_blob(n, r);
      case P:
        return s2.column_double(n, r);
      case Q:
        let e = s2.column_int(n, r), o = c.getTempRet0();
        return A(e, o);
      case B:
        return null;
      case R:
        return s2.column_text(n, r);
      default:
        throw new b("unknown type", t);
    }
  }, s2.column_blob = function() {
    let n = "sqlite3_column_blob", r = c.cwrap(n, ...u("nn:n"));
    return function(t, e) {
      f(t);
      let o = s2.column_bytes(t, e), i = r(t, e);
      return c.HEAPU8.subarray(i, i + o);
    };
  }(), s2.column_bytes = function() {
    let n = "sqlite3_column_bytes", r = c.cwrap(n, ...u("nn:n"));
    return function(t, e) {
      return f(t), r(t, e);
    };
  }(), s2.column_count = function() {
    let n = "sqlite3_column_count", r = c.cwrap(n, ...u("n:n"));
    return function(t) {
      return f(t), r(t);
    };
  }(), s2.column_double = function() {
    let n = "sqlite3_column_double", r = c.cwrap(n, ...u("nn:n"));
    return function(t, e) {
      return f(t), r(t, e);
    };
  }(), s2.column_int = function() {
    let n = "sqlite3_column_int64", r = c.cwrap(n, ...u("nn:n"));
    return function(t, e) {
      return f(t), r(t, e);
    };
  }(), s2.column_int64 = function() {
    let n = "sqlite3_column_int64", r = c.cwrap(n, ...u("nn:n"));
    return function(t, e) {
      f(t);
      let o = r(t, e), i = c.getTempRet0();
      return L(o, i);
    };
  }(), s2.column_name = function() {
    let n = "sqlite3_column_name", r = c.cwrap(n, ...u("nn:s"));
    return function(t, e) {
      return f(t), r(t, e);
    };
  }(), s2.column_names = function(n) {
    let r = [], t = s2.column_count(n);
    for (let e = 0; e < t; ++e)
      r.push(s2.column_name(n, e));
    return r;
  }, s2.column_text = function() {
    let n = "sqlite3_column_text", r = c.cwrap(n, ...u("nn:s"));
    return function(t, e) {
      return f(t), r(t, e);
    };
  }(), s2.column_type = function() {
    let n = "sqlite3_column_type", r = c.cwrap(n, ...u("nn:n"));
    return function(t, e) {
      return f(t), r(t, e);
    };
  }(), s2.create_function = function(n, r, t, e, o, i, a, p) {
    if (I(n), i && !a && !p) {
      let h2 = c.createFunction(n, r, t, e, o, i);
      return _("sqlite3_create_function", h2, n);
    }
    if (!i && a && p) {
      let h2 = c.createAggregate(n, r, t, e, o, a, p);
      return _("sqlite3_create_function", h2, n);
    }
    throw new b("invalid function combination", T);
  }, s2.create_module = function(n, r, t, e) {
    I(n);
    let o = c.createModule(n, r, t, e);
    return _("sqlite3_create_module", o, n);
  }, s2.data_count = function() {
    let n = "sqlite3_data_count", r = c.cwrap(n, ...u("n:n"));
    return function(t) {
      return f(t), r(t);
    };
  }(), s2.declare_vtab = function() {
    let n = "sqlite3_declare_vtab", r = c.cwrap(n, ...u("ns:n"));
    return function(t, e) {
      let o = r(t, e);
      return _("sqlite3_declare_vtab", o);
    };
  }(), s2.exec = async function(n, r, t) {
    for await (let e of s2.statements(n, r)) {
      let o;
      for (; await s2.step(e) === O; )
        if (t) {
          o = o ?? s2.column_names(e);
          let i = s2.row(e);
          await t(i, o);
        }
    }
    return v;
  }, s2.finalize = function() {
    let n = "sqlite3_finalize", r = c.cwrap(n, ...u("n:n"), { async: q });
    return async function(t) {
      if (!l.has(t))
        return T;
      let e = await r(t);
      return l.get(t), l.delete(t), e;
    };
  }(), s2.get_autocommit = function() {
    let n = "sqlite3_get_autocommit", r = c.cwrap(n, ...u("n:n"));
    return function(t) {
      return r(t);
    };
  }(), s2.libversion = function() {
    let n = "sqlite3_libversion", r = c.cwrap(n, ...u(":s"));
    return function() {
      return r();
    };
  }(), s2.libversion_number = function() {
    let n = "sqlite3_libversion_number", r = c.cwrap(n, ...u(":n"));
    return function() {
      return r();
    };
  }(), s2.limit = function() {
    let n = "sqlite3_limit", r = c.cwrap(n, ...u("nnn:n"));
    return function(t, e, o) {
      return r(t, e, o);
    };
  }(), s2.open_v2 = function() {
    let n = "sqlite3_open_v2", r = c.cwrap(n, ...u("snnn:n"), { async: q });
    return async function(t, e, o) {
      e = e || K | x, o = g(o);
      let i = await r(t, w2[0], e, o), a = c.getValue(w2[0], "*");
      return S2.add(a), c._sqlite3_free(o), c.ccall("RegisterExtensionFunctions", "void", ["number"], [a]), _(n, i), a;
    };
  }(), s2.prepare_v2 = function() {
    let n = "sqlite3_prepare_v2", r = c.cwrap(n, ...u("nnnnn:n"), { async: q });
    return async function(t, e) {
      let o = await r(t, e, -1, w2[0], w2[1]);
      _(n, o, t);
      let i = c.getValue(w2[0], "*");
      return i ? (l.set(i, t), { stmt: i, sql: c.getValue(w2[1], "*") }) : null;
    };
  }(), s2.progress_handler = function(n, r, t, e) {
    I(n), c.progressHandler(n, r, t, e);
  }, s2.reset = function() {
    let n = "sqlite3_reset", r = c.cwrap(n, ...u("n:n"), { async: q });
    return async function(t) {
      f(t);
      let e = await r(t);
      return _(n, e, l.get(t));
    };
  }(), s2.result = function(n, r) {
    switch (typeof r) {
      case "number":
        r === (r | 0) ? s2.result_int(n, r) : s2.result_double(n, r);
        break;
      case "string":
        s2.result_text(n, r);
        break;
      default:
        if (r instanceof Uint8Array || Array.isArray(r))
          s2.result_blob(n, r);
        else if (r === null)
          s2.result_null(n);
        else {
          if (typeof r == "bigint")
            return s2.result_int64(n, r);
          console.warn("unknown result converted to null", r), s2.result_null(n);
        }
        break;
    }
  }, s2.result_blob = function() {
    let n = "sqlite3_result_blob", r = c.cwrap(n, ...u("nnnn:n"));
    return function(t, e) {
      let o = e.byteLength ?? e.length, i = c._sqlite3_malloc(o);
      c.HEAPU8.subarray(i).set(e), r(t, i, o, m2);
    };
  }(), s2.result_double = function() {
    let n = "sqlite3_result_double", r = c.cwrap(n, ...u("nn:n"));
    return function(t, e) {
      r(t, e);
    };
  }(), s2.result_int = function() {
    let n = "sqlite3_result_int", r = c.cwrap(n, ...u("nn:n"));
    return function(t, e) {
      r(t, e);
    };
  }(), s2.result_int64 = function() {
    let n = "sqlite3_result_int64", r = c.cwrap(n, ...u("nnn:n"));
    return function(t, e) {
      if (e > D || e < C)
        return N;
      let o = e & 0xffffffffn, i = e >> 32n;
      r(t, Number(o), Number(i));
    };
  }(), s2.result_null = function() {
    let n = "sqlite3_result_null", r = c.cwrap(n, ...u("n:n"));
    return function(t) {
      r(t);
    };
  }(), s2.result_text = function() {
    let n = "sqlite3_result_text", r = c.cwrap(n, ...u("nnnn:n"));
    return function(t, e) {
      let o = g(e);
      r(t, o, -1, m2);
    };
  }(), s2.row = function(n) {
    let r = [], t = s2.data_count(n);
    for (let e = 0; e < t; ++e) {
      let o = s2.column(n, e);
      r.push(o?.buffer === c.HEAPU8.buffer ? o.slice() : o);
    }
    return r;
  }, s2.set_authorizer = function(n, r, t) {
    I(n);
    let e = c.setAuthorizer(n, r, t);
    return _("sqlite3_set_authorizer", e, n);
  }, s2.sql = function() {
    let n = "sqlite3_sql", r = c.cwrap(n, ...u("n:s"));
    return function(t) {
      return f(t), r(t);
    };
  }(), s2.statements = function(n, r) {
    return async function* () {
      let t = s2.str_new(n, r), e = { stmt: null, sql: s2.str_value(t) };
      try {
        for (; e = await s2.prepare_v2(n, e.sql); )
          yield e.stmt, s2.finalize(e.stmt), e.stmt = null;
      } finally {
        e?.stmt && s2.finalize(e.stmt), s2.str_finish(t);
      }
    }();
  }, s2.step = function() {
    let n = "sqlite3_step", r = c.cwrap(n, ...u("n:n"), { async: q });
    return async function(t) {
      f(t);
      let e = await r(t);
      return _(n, e, l.get(t), [O, H]);
    };
  }();
  let F = 0, E = /* @__PURE__ */ new Map();
  s2.str_new = function(n, r = "") {
    let t = c.lengthBytesUTF8(r), e = F++ & 4294967295, o = { offset: c._sqlite3_malloc(t + 1), bytes: t };
    return E.set(e, o), c.stringToUTF8(r, o.offset, o.bytes + 1), e;
  }, s2.str_appendall = function(n, r) {
    if (!E.has(n))
      throw new b("not a string", T);
    let t = E.get(n), e = c.lengthBytesUTF8(r), o = t.bytes + e, i = c._sqlite3_malloc(o + 1);
    c.HEAPU8.subarray(i, i + o + 1).set(c.HEAPU8.subarray(t.offset, t.offset + t.bytes)), c.stringToUTF8(r, i + t.bytes, e + 1), c._sqlite3_free(t.offset), t.offset = i, t.bytes = o, E.set(n, t);
  }, s2.str_finish = function(n) {
    if (!E.has(n))
      throw new b("not a string", T);
    let r = E.get(n);
    E.delete(n), c._sqlite3_free(r.offset);
  }, s2.str_value = function(n) {
    if (!E.has(n))
      throw new b("not a string", T);
    return E.get(n).offset;
  }, s2.user_data = function(n) {
    return c.getFunctionUserData(n);
  }, s2.value = function(n) {
    let r = s2.value_type(n);
    switch (r) {
      case U:
        return s2.value_blob(n);
      case P:
        return s2.value_double(n);
      case Q:
        let t = s2.value_int(n), e = c.getTempRet0();
        return A(t, e);
      case B:
        return null;
      case R:
        return s2.value_text(n);
      default:
        throw new b("unknown type", r);
    }
  }, s2.value_blob = function() {
    let n = "sqlite3_value_blob", r = c.cwrap(n, ...u("n:n"));
    return function(t) {
      let e = s2.value_bytes(t), o = r(t);
      return c.HEAPU8.subarray(o, o + e);
    };
  }(), s2.value_bytes = function() {
    let n = "sqlite3_value_bytes", r = c.cwrap(n, ...u("n:n"));
    return function(t) {
      return r(t);
    };
  }(), s2.value_double = function() {
    let n = "sqlite3_value_double", r = c.cwrap(n, ...u("n:n"));
    return function(t) {
      return r(t);
    };
  }(), s2.value_int = function() {
    let n = "sqlite3_value_int64", r = c.cwrap(n, ...u("n:n"));
    return function(t) {
      return r(t);
    };
  }(), s2.value_int64 = function() {
    let n = "sqlite3_value_int64", r = c.cwrap(n, ...u("n:n"));
    return function(t) {
      let e = r(t), o = c.getTempRet0();
      return L(e, o);
    };
  }(), s2.value_text = function() {
    let n = "sqlite3_value_text", r = c.cwrap(n, ...u("n:s"));
    return function(t) {
      return r(t);
    };
  }(), s2.value_type = function() {
    let n = "sqlite3_value_type", r = c.cwrap(n, ...u("n:n"));
    return function(t) {
      return r(t);
    };
  }(), s2.vfs_register = function(n, r) {
    let t = c.registerVFS(n, r);
    return _("sqlite3_vfs_register", t);
  };
  function _(n, r, t = null, e = [v]) {
    if (e.includes(r))
      return r;
    let o = t ? c.ccall("sqlite3_errmsg", "string", ["number"], [t]) : n;
    throw new b(o, r);
  }
  return s2;
}
function u(c) {
  let s2 = [], m2 = c.match(/([ns@]*):([nsv@])/);
  switch (m2[2]) {
    case "n":
      s2.push("number");
      break;
    case "s":
      s2.push("string");
      break;
    case "v":
      s2.push(null);
      break;
  }
  let y = [];
  for (let w2 of m2[1])
    switch (w2) {
      case "n":
        y.push("number");
        break;
      case "s":
        y.push("string");
        break;
    }
  return s2.push(y), s2;
}
async function m(n) {
  let { fileName: e, sqlite: t } = await n, a = await t.open_v2(e);
  return { db: a, sqlite: t, async close() {
    await t.close(a);
  }, changes() {
    return t.changes(a);
  }, async lastInsertRowId() {
    return await new Promise((o) => t.exec(a, "SELECT last_insert_rowid()", ([i]) => o(i)));
  }, async run(o, i) {
    let p = t.str_new(a, o), c = await t.prepare_v2(a, t.str_value(p));
    if (!c)
      return [];
    let r = c.stmt;
    try {
      i?.length && t.bind_collection(r, i);
      let u2 = [], f$1 = t.column_names(r);
      for (; await t.step(r) === O; ) {
        let y = t.row(r);
        u2.push(Object.fromEntries(f$1.map((g, d2) => [g, y[d2]])));
      }
      return u2;
    } finally {
      await t.finalize(r);
    }
  } };
}
async function w() {
  let n = await navigator?.storage.getDirectory?.();
  if (!n)
    return false;
  let e = "_CHECK";
  try {
    return "createSyncAccessHandle" in await n.getFileHandle(e, { create: true });
  } catch {
    return false;
  } finally {
    await n.removeEntry(e);
  }
}
var s;
async function h({ fileName: n, preferOPFS: e, url: t }) {
  s = await m((await w() && e ? (await import("./opfs-DG5SPXLP-5713d6b9.js")).useOpfsStorage : (await import("./idb-TKGN6KGU-8d147e64.js")).useIdbStorage)(n, { url: t }));
}
async function S({ isSelect: n, sql: e, parameters: t }) {
  let a = await s.run(e, t);
  return n || a.length ? { rows: a } : { rows: a, insertId: BigInt(await s.lastInsertRowId()), numAffectedRows: BigInt(s.changes()) };
}
onmessage = async (n) => {
  let e = n.data, t = { type: e.type, data: null, err: null };
  try {
    switch (e.type) {
      case "init":
        await h(e);
        break;
      case "run":
        t.data = await S(e);
        break;
      case "close":
        await s.close();
        break;
    }
  } catch (a) {
    t.err = a;
  }
  postMessage(t);
};
export {
  $,
  G,
  J,
  K,
  M,
  V,
  W,
  X,
  Y,
  Z,
  an as a,
  cn as c,
  d,
  en as e,
  fn as f,
  j,
  nn as n,
  on as o,
  rn as r,
  sn as s,
  tn as t,
  un as u,
  v,
  z
};
