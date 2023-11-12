var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _u, _o, _r, _e, _n, _t, _l, l_fn, _a, a_fn, _d, d_fn, _i, i_fn, _f, f_fn, _s, s_fn, _c, c_fn, _a2;
import { u } from "./chunk-C3CYAGCE-eafb0490.js";
import { a as an$1, K, v, W, Z, Y, z, u as un$1, $, V, d, M } from "./worker-cad26e17.js";
var tn = (() => {
  var m = import.meta.url;
  return function(_ = {}) {
    var i = _, g, I;
    i.ready = new Promise((e, t) => {
      g = e, I = t;
    });
    var z2 = Object.assign({}, i), $2 = "./this.program", Z2 = (e, t) => {
      throw t;
    }, Qe = typeof window == "object", we = typeof importScripts == "function", J = "", Me;
    (Qe || we) && (we ? J = self.location.href : typeof document < "u" && document.currentScript && (J = document.currentScript.src), m && (J = m), J.indexOf("blob:") !== 0 ? J = J.substr(0, J.replace(/[?#].*/, "").lastIndexOf("/") + 1) : J = "", we && (Me = (e) => {
      var t = new XMLHttpRequest();
      return t.open("GET", e, false), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
    }));
    var je = i.print || console.log.bind(console), X = i.printErr || console.error.bind(console);
    Object.assign(i, z2), z2 = null, i.thisProgram && ($2 = i.thisProgram), i.quit && (Z2 = i.quit);
    var ae;
    i.wasmBinary && (ae = i.wasmBinary), typeof WebAssembly != "object" && W2("no native wasm support detected");
    var be, Re = false, N, p, fe, v2, C, Te, De;
    function Ye() {
      var e = be.buffer;
      i.HEAP8 = N = new Int8Array(e), i.HEAP16 = fe = new Int16Array(e), i.HEAPU8 = p = new Uint8Array(e), i.HEAPU16 = new Uint16Array(e), i.HEAP32 = v2 = new Int32Array(e), i.HEAPU32 = C = new Uint32Array(e), i.HEAPF32 = Te = new Float32Array(e), i.HEAPF64 = De = new Float64Array(e);
    }
    var Ze = [], Xe = [], Lr = [], Ge = [];
    function zr() {
      var e = i.preRun.shift();
      Ze.unshift(e);
    }
    var G = 0, ce = null;
    function W2(e) {
      throw i.onAbort && i.onAbort(e), e = "Aborted(" + e + ")", X(e), Re = true, e = new WebAssembly.RuntimeError(e + ". Build with -sASSERTIONS for more info."), I(e), e;
    }
    var ke = (e) => e.startsWith("data:application/octet-stream;base64,"), k;
    if (i.locateFile) {
      if (k = "wa-sqlite.wasm", !ke(k)) {
        var et = k;
        k = i.locateFile ? i.locateFile(et, J) : J + et;
      }
    } else
      k = new URL("" + new URL("wa-sqlite-8ce1cb2d.wasm", import.meta.url).href, self.location).href;
    function tt(e) {
      if (e == k && ae)
        return new Uint8Array(ae);
      if (Me)
        return Me(e);
      throw "both async and sync fetching of the wasm failed";
    }
    function $r(e) {
      return ae || !Qe && !we || typeof fetch != "function" ? Promise.resolve().then(() => tt(e)) : fetch(e, { credentials: "same-origin" }).then((t) => {
        if (!t.ok)
          throw "failed to load wasm binary file at '" + e + "'";
        return t.arrayBuffer();
      }).catch(() => tt(e));
    }
    function rt(e, t, r) {
      return $r(e).then((n) => WebAssembly.instantiate(n, t)).then((n) => n).then(r, (n) => {
        X(`failed to asynchronously prepare wasm: ${n}`), W2(n);
      });
    }
    function Jr(e, t) {
      var r = k;
      return ae || typeof WebAssembly.instantiateStreaming != "function" || ke(r) || typeof fetch != "function" ? rt(r, e, t) : fetch(r, { credentials: "same-origin" }).then((n) => WebAssembly.instantiateStreaming(n, e).then(t, function(o) {
        return X(`wasm streaming compile failed: ${o}`), X("falling back to ArrayBuffer instantiation"), rt(r, e, t);
      }));
    }
    var y, M2;
    function nt(e) {
      this.name = "ExitStatus", this.message = `Program terminated with exit(${e})`, this.status = e;
    }
    var me = (e) => {
      for (; 0 < e.length; )
        e.shift()(i);
    };
    function T(e, t = "i8") {
      switch (t.endsWith("*") && (t = "*"), t) {
        case "i1":
          return N[e >> 0];
        case "i8":
          return N[e >> 0];
        case "i16":
          return fe[e >> 1];
        case "i32":
          return v2[e >> 2];
        case "i64":
          W2("to do getValue(i64) use WASM_BIGINT");
        case "float":
          return Te[e >> 2];
        case "double":
          return De[e >> 3];
        case "*":
          return C[e >> 2];
        default:
          W2(`invalid type for getValue: ${t}`);
      }
    }
    var Br = i.noExitRuntime || true;
    function B(e, t, r = "i8") {
      switch (r.endsWith("*") && (r = "*"), r) {
        case "i1":
          N[e >> 0] = t;
          break;
        case "i8":
          N[e >> 0] = t;
          break;
        case "i16":
          fe[e >> 1] = t;
          break;
        case "i32":
          v2[e >> 2] = t;
          break;
        case "i64":
          W2("to do setValue(i64) use WASM_BIGINT");
        case "float":
          Te[e >> 2] = t;
          break;
        case "double":
          De[e >> 3] = t;
          break;
        case "*":
          C[e >> 2] = t;
          break;
        default:
          W2(`invalid type for setValue: ${r}`);
      }
    }
    var it = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0, q = (e, t, r) => {
      var n = t + r;
      for (r = t; e[r] && !(r >= n); )
        ++r;
      if (16 < r - t && e.buffer && it)
        return it.decode(e.subarray(t, r));
      for (n = ""; t < r; ) {
        var o = e[t++];
        if (o & 128) {
          var u2 = e[t++] & 63;
          if ((o & 224) == 192)
            n += String.fromCharCode((o & 31) << 6 | u2);
          else {
            var s = e[t++] & 63;
            o = (o & 240) == 224 ? (o & 15) << 12 | u2 << 6 | s : (o & 7) << 18 | u2 << 12 | s << 6 | e[t++] & 63, 65536 > o ? n += String.fromCharCode(o) : (o -= 65536, n += String.fromCharCode(55296 | o >> 10, 56320 | o & 1023));
          }
        } else
          n += String.fromCharCode(o);
      }
      return n;
    }, ot = (e, t) => {
      for (var r = 0, n = e.length - 1; 0 <= n; n--) {
        var o = e[n];
        o === "." ? e.splice(n, 1) : o === ".." ? (e.splice(n, 1), r++) : r && (e.splice(n, 1), r--);
      }
      if (t)
        for (; r; r--)
          e.unshift("..");
      return e;
    }, Q = (e) => {
      var t = e.charAt(0) === "/", r = e.substr(-1) === "/";
      return (e = ot(e.split("/").filter((n) => !!n), !t).join("/")) || t || (e = "."), e && r && (e += "/"), (t ? "/" : "") + e;
    }, Hr = (e) => {
      var t = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);
      return e = t[0], t = t[1], !e && !t ? "." : (t && (t = t.substr(0, t.length - 1)), e + t);
    }, pe = (e) => {
      if (e === "/")
        return "/";
      e = Q(e), e = e.replace(/\/$/, "");
      var t = e.lastIndexOf("/");
      return t === -1 ? e : e.substr(t + 1);
    }, Kr = () => {
      if (typeof crypto == "object" && typeof crypto.getRandomValues == "function")
        return (e) => crypto.getRandomValues(e);
      W2("initRandomDevice");
    }, st = (e) => (st = Kr())(e);
    function ye() {
      for (var e = "", t = false, r = arguments.length - 1; -1 <= r && !t; r--) {
        if (t = 0 <= r ? arguments[r] : "/", typeof t != "string")
          throw new TypeError("Arguments to path.resolve must be strings");
        if (!t)
          return "";
        e = t + "/" + e, t = t.charAt(0) === "/";
      }
      return e = ot(e.split("/").filter((n) => !!n), !t).join("/"), (t ? "/" : "") + e || ".";
    }
    var Oe = [], ee = (e) => {
      for (var t = 0, r = 0; r < e.length; ++r) {
        var n = e.charCodeAt(r);
        127 >= n ? t++ : 2047 >= n ? t += 2 : 55296 <= n && 57343 >= n ? (t += 4, ++r) : t += 3;
      }
      return t;
    }, te = (e, t, r, n) => {
      if (!(0 < n))
        return 0;
      var o = r;
      n = r + n - 1;
      for (var u2 = 0; u2 < e.length; ++u2) {
        var s = e.charCodeAt(u2);
        if (55296 <= s && 57343 >= s) {
          var c = e.charCodeAt(++u2);
          s = 65536 + ((s & 1023) << 10) | c & 1023;
        }
        if (127 >= s) {
          if (r >= n)
            break;
          t[r++] = s;
        } else {
          if (2047 >= s) {
            if (r + 1 >= n)
              break;
            t[r++] = 192 | s >> 6;
          } else {
            if (65535 >= s) {
              if (r + 2 >= n)
                break;
              t[r++] = 224 | s >> 12;
            } else {
              if (r + 3 >= n)
                break;
              t[r++] = 240 | s >> 18, t[r++] = 128 | s >> 12 & 63;
            }
            t[r++] = 128 | s >> 6 & 63;
          }
          t[r++] = 128 | s & 63;
        }
      }
      return t[r] = 0, r - o;
    }, ut = [];
    function at(e, t) {
      ut[e] = { input: [], Nb: [], Zb: t }, Ue(e, Vr);
    }
    var Vr = { open(e) {
      var t = ut[e.node.bc];
      if (!t)
        throw new h(43);
      e.Ob = t, e.seekable = false;
    }, close(e) {
      e.Ob.Zb.Wb(e.Ob);
    }, Wb(e) {
      e.Ob.Zb.Wb(e.Ob);
    }, read(e, t, r, n) {
      if (!e.Ob || !e.Ob.Zb.sc)
        throw new h(60);
      for (var o = 0, u2 = 0; u2 < n; u2++) {
        try {
          var s = e.Ob.Zb.sc(e.Ob);
        } catch {
          throw new h(29);
        }
        if (s === void 0 && o === 0)
          throw new h(6);
        if (s == null)
          break;
        o++, t[r + u2] = s;
      }
      return o && (e.node.timestamp = Date.now()), o;
    }, write(e, t, r, n) {
      if (!e.Ob || !e.Ob.Zb.mc)
        throw new h(60);
      try {
        for (var o = 0; o < n; o++)
          e.Ob.Zb.mc(e.Ob, t[r + o]);
      } catch {
        throw new h(29);
      }
      return n && (e.node.timestamp = Date.now()), o;
    } }, Wr = { sc() {
      e: {
        if (!Oe.length) {
          var e = null;
          if (typeof window < "u" && typeof window.prompt == "function" ? (e = window.prompt("Input: "), e !== null && (e += `
`)) : typeof readline == "function" && (e = readline(), e !== null && (e += `
`)), !e) {
            var t = null;
            break e;
          }
          t = Array(ee(e) + 1), e = te(e, t, 0, t.length), t.length = e, Oe = t;
        }
        t = Oe.shift();
      }
      return t;
    }, mc(e, t) {
      t === null || t === 10 ? (je(q(e.Nb, 0)), e.Nb = []) : t != 0 && e.Nb.push(t);
    }, Wb(e) {
      e.Nb && 0 < e.Nb.length && (je(q(e.Nb, 0)), e.Nb = []);
    }, Sc() {
      return { Oc: 25856, Qc: 5, Nc: 191, Pc: 35387, Mc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
    }, Tc() {
      return 0;
    }, Uc() {
      return [24, 80];
    } }, Qr = { mc(e, t) {
      t === null || t === 10 ? (X(q(e.Nb, 0)), e.Nb = []) : t != 0 && e.Nb.push(t);
    }, Wb(e) {
      e.Nb && 0 < e.Nb.length && (X(q(e.Nb, 0)), e.Nb = []);
    } };
    function ft(e, t) {
      var r = e.Jb ? e.Jb.length : 0;
      r >= t || (t = Math.max(t, r * (1048576 > r ? 2 : 1.125) >>> 0), r != 0 && (t = Math.max(t, 256)), r = e.Jb, e.Jb = new Uint8Array(t), 0 < e.Lb && e.Jb.set(r.subarray(0, e.Lb), 0));
    }
    var E = { Qb: null, Rb() {
      return E.createNode(null, "/", 16895, 0);
    }, createNode(e, t, r, n) {
      if ((r & 61440) === 24576 || (r & 61440) === 4096)
        throw new h(63);
      return E.Qb || (E.Qb = { dir: { node: { Pb: E.Cb.Pb, Mb: E.Cb.Mb, $b: E.Cb.$b, ec: E.Cb.ec, wc: E.Cb.wc, kc: E.Cb.kc, ic: E.Cb.ic, vc: E.Cb.vc, jc: E.Cb.jc }, stream: { Vb: E.Ib.Vb } }, file: { node: { Pb: E.Cb.Pb, Mb: E.Cb.Mb }, stream: { Vb: E.Ib.Vb, read: E.Ib.read, write: E.Ib.write, pc: E.Ib.pc, fc: E.Ib.fc, hc: E.Ib.hc } }, link: { node: { Pb: E.Cb.Pb, Mb: E.Cb.Mb, cc: E.Cb.cc }, stream: {} }, qc: { node: { Pb: E.Cb.Pb, Mb: E.Cb.Mb }, stream: Xr } }), r = ht(e, t, r, n), L(r.mode) ? (r.Cb = E.Qb.dir.node, r.Ib = E.Qb.dir.stream, r.Jb = {}) : (r.mode & 61440) === 32768 ? (r.Cb = E.Qb.file.node, r.Ib = E.Qb.file.stream, r.Lb = 0, r.Jb = null) : (r.mode & 61440) === 40960 ? (r.Cb = E.Qb.link.node, r.Ib = E.Qb.link.stream) : (r.mode & 61440) === 8192 && (r.Cb = E.Qb.qc.node, r.Ib = E.Qb.qc.stream), r.timestamp = Date.now(), e && (e.Jb[t] = r, e.timestamp = r.timestamp), r;
    }, Rc(e) {
      return e.Jb ? e.Jb.subarray ? e.Jb.subarray(0, e.Lb) : new Uint8Array(e.Jb) : new Uint8Array(0);
    }, Cb: { Pb(e) {
      var t = {};
      return t.Cc = (e.mode & 61440) === 8192 ? e.id : 1, t.tc = e.id, t.mode = e.mode, t.Ic = 1, t.uid = 0, t.Ec = 0, t.bc = e.bc, L(e.mode) ? t.size = 4096 : (e.mode & 61440) === 32768 ? t.size = e.Lb : (e.mode & 61440) === 40960 ? t.size = e.link.length : t.size = 0, t.yc = new Date(e.timestamp), t.Hc = new Date(e.timestamp), t.Bc = new Date(e.timestamp), t.zc = 4096, t.Ac = Math.ceil(t.size / t.zc), t;
    }, Mb(e, t) {
      if (t.mode !== void 0 && (e.mode = t.mode), t.timestamp !== void 0 && (e.timestamp = t.timestamp), t.size !== void 0 && (t = t.size, e.Lb != t))
        if (t == 0)
          e.Jb = null, e.Lb = 0;
        else {
          var r = e.Jb;
          e.Jb = new Uint8Array(t), r && e.Jb.set(r.subarray(0, Math.min(t, e.Lb))), e.Lb = t;
        }
    }, $b() {
      throw Pe[44];
    }, ec(e, t, r, n) {
      return E.createNode(e, t, r, n);
    }, wc(e, t, r) {
      if (L(e.mode)) {
        try {
          var n = re(t, r);
        } catch {
        }
        if (n)
          for (var o in n.Jb)
            throw new h(55);
      }
      delete e.parent.Jb[e.name], e.parent.timestamp = Date.now(), e.name = r, t.Jb[r] = e, t.timestamp = e.parent.timestamp, e.parent = t;
    }, kc(e, t) {
      delete e.Jb[t], e.timestamp = Date.now();
    }, ic(e, t) {
      var r = re(e, t), n;
      for (n in r.Jb)
        throw new h(55);
      delete e.Jb[t], e.timestamp = Date.now();
    }, vc(e) {
      var t = [".", ".."], r;
      for (r in e.Jb)
        e.Jb.hasOwnProperty(r) && t.push(r);
      return t;
    }, jc(e, t, r) {
      return e = E.createNode(e, t, 41471, 0), e.link = r, e;
    }, cc(e) {
      if ((e.mode & 61440) !== 40960)
        throw new h(28);
      return e.link;
    } }, Ib: { read(e, t, r, n, o) {
      var u2 = e.node.Jb;
      if (o >= e.node.Lb)
        return 0;
      if (e = Math.min(e.node.Lb - o, n), 8 < e && u2.subarray)
        t.set(u2.subarray(o, o + e), r);
      else
        for (n = 0; n < e; n++)
          t[r + n] = u2[o + n];
      return e;
    }, write(e, t, r, n, o, u2) {
      if (t.buffer === N.buffer && (u2 = false), !n)
        return 0;
      if (e = e.node, e.timestamp = Date.now(), t.subarray && (!e.Jb || e.Jb.subarray)) {
        if (u2)
          return e.Jb = t.subarray(r, r + n), e.Lb = n;
        if (e.Lb === 0 && o === 0)
          return e.Jb = t.slice(r, r + n), e.Lb = n;
        if (o + n <= e.Lb)
          return e.Jb.set(t.subarray(r, r + n), o), n;
      }
      if (ft(e, o + n), e.Jb.subarray && t.subarray)
        e.Jb.set(t.subarray(r, r + n), o);
      else
        for (u2 = 0; u2 < n; u2++)
          e.Jb[o + u2] = t[r + u2];
      return e.Lb = Math.max(e.Lb, o + n), n;
    }, Vb(e, t, r) {
      if (r === 1 ? t += e.position : r === 2 && (e.node.mode & 61440) === 32768 && (t += e.node.Lb), 0 > t)
        throw new h(28);
      return t;
    }, pc(e, t, r) {
      ft(e.node, t + r), e.node.Lb = Math.max(e.node.Lb, t + r);
    }, fc(e, t, r, n, o) {
      if ((e.node.mode & 61440) !== 32768)
        throw new h(43);
      if (e = e.node.Jb, o & 2 || e.buffer !== N.buffer) {
        if ((0 < r || r + t < e.length) && (e.subarray ? e = e.subarray(r, r + t) : e = Array.prototype.slice.call(e, r, r + t)), r = true, t = 65536 * Math.ceil(t / 65536), (o = pr(65536, t)) ? (p.fill(0, o, o + t), t = o) : t = 0, !t)
          throw new h(48);
        N.set(e, t);
      } else
        r = false, t = e.byteOffset;
      return { Jc: t, xc: r };
    }, hc(e, t, r, n) {
      return E.Ib.write(e, t, 0, n, r, false), 0;
    } } }, jr = (e, t) => {
      var r = 0;
      return e && (r |= 365), t && (r |= 146), r;
    }, Ne = null, ct = {}, le = [], Yr = 1, j = null, lt = true, h = null, Pe = {};
    function F(e, t = {}) {
      if (e = ye(e), !e)
        return { path: "", node: null };
      if (t = Object.assign({ rc: true, nc: 0 }, t), 8 < t.nc)
        throw new h(32);
      e = e.split("/").filter((s) => !!s);
      for (var r = Ne, n = "/", o = 0; o < e.length; o++) {
        var u2 = o === e.length - 1;
        if (u2 && t.parent)
          break;
        if (r = re(r, e[o]), n = Q(n + "/" + e[o]), r.Xb && (!u2 || u2 && t.rc) && (r = r.Xb.root), !u2 || t.Ub) {
          for (u2 = 0; (r.mode & 61440) === 40960; )
            if (r = vt(n), n = ye(Hr(n), r), r = F(n, { nc: t.nc + 1 }).node, 40 < u2++)
              throw new h(32);
        }
      }
      return { path: n, node: r };
    }
    function ve(e) {
      for (var t; ; ) {
        if (e === e.parent)
          return e = e.Rb.uc, t ? e[e.length - 1] !== "/" ? `${e}/${t}` : e + t : e;
        t = t ? `${e.name}/${t}` : e.name, e = e.parent;
      }
    }
    function Fe(e, t) {
      for (var r = 0, n = 0; n < t.length; n++)
        r = (r << 5) - r + t.charCodeAt(n) | 0;
      return (e + r >>> 0) % j.length;
    }
    function dt(e) {
      var t = Fe(e.parent.id, e.name);
      if (j[t] === e)
        j[t] = e.Yb;
      else
        for (t = j[t]; t; ) {
          if (t.Yb === e) {
            t.Yb = e.Yb;
            break;
          }
          t = t.Yb;
        }
    }
    function re(e, t) {
      var r;
      if (r = (r = oe(e, "x")) ? r : e.Cb.$b ? 0 : 2)
        throw new h(r, e);
      for (r = j[Fe(e.id, t)]; r; r = r.Yb) {
        var n = r.name;
        if (r.parent.id === e.id && n === t)
          return r;
      }
      return e.Cb.$b(e, t);
    }
    function ht(e, t, r, n) {
      return e = new _r2(e, t, r, n), t = Fe(e.parent.id, e.name), e.Yb = j[t], j[t] = e;
    }
    function L(e) {
      return (e & 61440) === 16384;
    }
    function _t2(e) {
      var t = ["r", "w", "rw"][e & 3];
      return e & 512 && (t += "w"), t;
    }
    function oe(e, t) {
      if (lt)
        return 0;
      if (!t.includes("r") || e.mode & 292) {
        if (t.includes("w") && !(e.mode & 146) || t.includes("x") && !(e.mode & 73))
          return 2;
      } else
        return 2;
      return 0;
    }
    function wt(e, t) {
      try {
        return re(e, t), 20;
      } catch {
      }
      return oe(e, "wx");
    }
    function bt(e, t, r) {
      try {
        var n = re(e, t);
      } catch (o) {
        return o.Kb;
      }
      if (e = oe(e, "wx"))
        return e;
      if (r) {
        if (!L(n.mode))
          return 54;
        if (n === n.parent || ve(n) === "/")
          return 10;
      } else if (L(n.mode))
        return 31;
      return 0;
    }
    function Zr() {
      for (var e = 0; 4096 >= e; e++)
        if (!le[e])
          return e;
      throw new h(33);
    }
    function P(e) {
      if (e = le[e], !e)
        throw new h(8);
      return e;
    }
    function mt(e, t = -1) {
      return he || (he = function() {
        this.dc = {};
      }, he.prototype = {}, Object.defineProperties(he.prototype, { object: { get() {
        return this.node;
      }, set(r) {
        this.node = r;
      } }, flags: { get() {
        return this.dc.flags;
      }, set(r) {
        this.dc.flags = r;
      } }, position: { get() {
        return this.dc.position;
      }, set(r) {
        this.dc.position = r;
      } } })), e = Object.assign(new he(), e), t == -1 && (t = Zr()), e.Sb = t, le[t] = e;
    }
    var Xr = { open(e) {
      e.Ib = ct[e.node.bc].Ib, e.Ib.open && e.Ib.open(e);
    }, Vb() {
      throw new h(70);
    } };
    function Ue(e, t) {
      ct[e] = { Ib: t };
    }
    function pt(e, t) {
      var r = t === "/", n = !t;
      if (r && Ne)
        throw new h(10);
      if (!r && !n) {
        var o = F(t, { rc: false });
        if (t = o.path, o = o.node, o.Xb)
          throw new h(10);
        if (!L(o.mode))
          throw new h(54);
      }
      t = { type: e, Wc: {}, uc: t, Gc: [] }, e = e.Rb(t), e.Rb = t, t.root = e, r ? Ne = e : o && (o.Xb = t, o.Rb && o.Rb.Gc.push(t));
    }
    function Le(e, t, r) {
      var n = F(e, { parent: true }).node;
      if (e = pe(e), !e || e === "." || e === "..")
        throw new h(28);
      var o = wt(n, e);
      if (o)
        throw new h(o);
      if (!n.Cb.ec)
        throw new h(63);
      return n.Cb.ec(n, e, t, r);
    }
    function H(e, t) {
      return Le(e, (t !== void 0 ? t : 511) & 1023 | 16384, 0);
    }
    function ge(e, t, r) {
      typeof r > "u" && (r = t, t = 438), Le(e, t | 8192, r);
    }
    function ze(e, t) {
      if (!ye(e))
        throw new h(44);
      var r = F(t, { parent: true }).node;
      if (!r)
        throw new h(44);
      t = pe(t);
      var n = wt(r, t);
      if (n)
        throw new h(n);
      if (!r.Cb.jc)
        throw new h(63);
      r.Cb.jc(r, t, e);
    }
    function yt(e) {
      var t = F(e, { parent: true }).node;
      e = pe(e);
      var r = re(t, e), n = bt(t, e, true);
      if (n)
        throw new h(n);
      if (!t.Cb.ic)
        throw new h(63);
      if (r.Xb)
        throw new h(10);
      t.Cb.ic(t, e), dt(r);
    }
    function vt(e) {
      if (e = F(e).node, !e)
        throw new h(44);
      if (!e.Cb.cc)
        throw new h(28);
      return ye(ve(e.parent), e.Cb.cc(e));
    }
    function Ee(e, t) {
      if (e = F(e, { Ub: !t }).node, !e)
        throw new h(44);
      if (!e.Cb.Pb)
        throw new h(63);
      return e.Cb.Pb(e);
    }
    function gt(e) {
      return Ee(e, true);
    }
    function Et(e, t) {
      if (e = typeof e == "string" ? F(e, { Ub: true }).node : e, !e.Cb.Mb)
        throw new h(63);
      e.Cb.Mb(e, { mode: t & 4095 | e.mode & -4096, timestamp: Date.now() });
    }
    function xt(e, t) {
      if (0 > t)
        throw new h(28);
      if (e = typeof e == "string" ? F(e, { Ub: true }).node : e, !e.Cb.Mb)
        throw new h(63);
      if (L(e.mode))
        throw new h(31);
      if ((e.mode & 61440) !== 32768)
        throw new h(28);
      var r = oe(e, "w");
      if (r)
        throw new h(r);
      e.Cb.Mb(e, { size: t, timestamp: Date.now() });
    }
    function xe(e, t, r) {
      if (e === "")
        throw new h(44);
      if (typeof t == "string") {
        var n = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[t];
        if (typeof n > "u")
          throw Error(`Unknown file open mode: ${t}`);
        t = n;
      }
      if (r = t & 64 ? (typeof r > "u" ? 438 : r) & 4095 | 32768 : 0, typeof e == "object")
        var o = e;
      else {
        e = Q(e);
        try {
          o = F(e, { Ub: !(t & 131072) }).node;
        } catch {
        }
      }
      if (n = false, t & 64)
        if (o) {
          if (t & 128)
            throw new h(20);
        } else
          o = Le(e, r, 0), n = true;
      if (!o)
        throw new h(44);
      if ((o.mode & 61440) === 8192 && (t &= -513), t & 65536 && !L(o.mode))
        throw new h(54);
      if (!n && (r = o ? (o.mode & 61440) === 40960 ? 32 : L(o.mode) && (_t2(t) !== "r" || t & 512) ? 31 : oe(o, _t2(t)) : 44))
        throw new h(r);
      return t & 512 && !n && xt(o, 0), t &= -131713, o = mt({ node: o, path: ve(o), flags: t, seekable: true, position: 0, Ib: o.Ib, Lc: [], error: false }), o.Ib.open && o.Ib.open(o), !i.logReadFiles || t & 1 || (qe || (qe = {}), e in qe || (qe[e] = 1)), o;
    }
    function qt(e, t, r) {
      if (e.Sb === null)
        throw new h(8);
      if (!e.seekable || !e.Ib.Vb)
        throw new h(70);
      if (r != 0 && r != 1 && r != 2)
        throw new h(28);
      e.position = e.Ib.Vb(e, t, r), e.Lc = [];
    }
    function At() {
      h || (h = function(e, t) {
        this.name = "ErrnoError", this.node = t, this.Kc = function(r) {
          this.Kb = r;
        }, this.Kc(e), this.message = "FS error";
      }, h.prototype = Error(), h.prototype.constructor = h, [44].forEach((e) => {
        Pe[e] = new h(e), Pe[e].stack = "<generic error, no stack>";
      }));
    }
    var It;
    function de(e, t, r) {
      e = Q("/dev/" + e);
      var n = jr(!!t, !!r);
      $e || ($e = 64);
      var o = $e++ << 8 | 0;
      Ue(o, { open(u2) {
        u2.seekable = false;
      }, close() {
        r && r.buffer && r.buffer.length && r(10);
      }, read(u2, s, c, a) {
        for (var f = 0, d2 = 0; d2 < a; d2++) {
          try {
            var l = t();
          } catch {
            throw new h(29);
          }
          if (l === void 0 && f === 0)
            throw new h(6);
          if (l == null)
            break;
          f++, s[c + d2] = l;
        }
        return f && (u2.node.timestamp = Date.now()), f;
      }, write(u2, s, c, a) {
        for (var f = 0; f < a; f++)
          try {
            r(s[c + f]);
          } catch {
            throw new h(29);
          }
        return a && (u2.node.timestamp = Date.now()), f;
      } }), ge(e, n, o);
    }
    var $e, S = {}, he, qe;
    function ne(e, t, r) {
      if (t.charAt(0) === "/")
        return t;
      if (e = e === -100 ? "/" : P(e).path, t.length == 0) {
        if (!r)
          throw new h(44);
        return e;
      }
      return Q(e + "/" + t);
    }
    function Ae(e, t, r) {
      try {
        var n = e(t);
      } catch (u2) {
        if (u2 && u2.node && Q(t) !== Q(ve(u2.node)))
          return -54;
        throw u2;
      }
      v2[r >> 2] = n.Cc, v2[r + 4 >> 2] = n.mode, C[r + 8 >> 2] = n.Ic, v2[r + 12 >> 2] = n.uid, v2[r + 16 >> 2] = n.Ec, v2[r + 20 >> 2] = n.bc, M2 = [n.size >>> 0, (y = n.size, 1 <= +Math.abs(y) ? 0 < y ? +Math.floor(y / 4294967296) >>> 0 : ~~+Math.ceil((y - +(~~y >>> 0)) / 4294967296) >>> 0 : 0)], v2[r + 24 >> 2] = M2[0], v2[r + 28 >> 2] = M2[1], v2[r + 32 >> 2] = 4096, v2[r + 36 >> 2] = n.Ac, e = n.yc.getTime(), t = n.Hc.getTime();
      var o = n.Bc.getTime();
      return M2 = [Math.floor(e / 1e3) >>> 0, (y = Math.floor(e / 1e3), 1 <= +Math.abs(y) ? 0 < y ? +Math.floor(y / 4294967296) >>> 0 : ~~+Math.ceil((y - +(~~y >>> 0)) / 4294967296) >>> 0 : 0)], v2[r + 40 >> 2] = M2[0], v2[r + 44 >> 2] = M2[1], C[r + 48 >> 2] = e % 1e3 * 1e3, M2 = [Math.floor(t / 1e3) >>> 0, (y = Math.floor(t / 1e3), 1 <= +Math.abs(y) ? 0 < y ? +Math.floor(y / 4294967296) >>> 0 : ~~+Math.ceil((y - +(~~y >>> 0)) / 4294967296) >>> 0 : 0)], v2[r + 56 >> 2] = M2[0], v2[r + 60 >> 2] = M2[1], C[r + 64 >> 2] = t % 1e3 * 1e3, M2 = [Math.floor(o / 1e3) >>> 0, (y = Math.floor(o / 1e3), 1 <= +Math.abs(y) ? 0 < y ? +Math.floor(y / 4294967296) >>> 0 : ~~+Math.ceil((y - +(~~y >>> 0)) / 4294967296) >>> 0 : 0)], v2[r + 72 >> 2] = M2[0], v2[r + 76 >> 2] = M2[1], C[r + 80 >> 2] = o % 1e3 * 1e3, M2 = [n.tc >>> 0, (y = n.tc, 1 <= +Math.abs(y) ? 0 < y ? +Math.floor(y / 4294967296) >>> 0 : ~~+Math.ceil((y - +(~~y >>> 0)) / 4294967296) >>> 0 : 0)], v2[r + 88 >> 2] = M2[0], v2[r + 92 >> 2] = M2[1], 0;
    }
    var Ie = void 0;
    function Ce() {
      var e = v2[+Ie >> 2];
      return Ie += 4, e;
    }
    var _e2 = (e, t) => t + 2097152 >>> 0 < 4194305 - !!e ? (e >>> 0) + 4294967296 * t : NaN, Gr = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], kr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Ct = (e) => {
      var t = ee(e) + 1, r = br(t);
      return r && te(e, p, r, t), r;
    }, Je = {}, St = () => {
      if (!Be) {
        var e = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: $2 || "./this.program" }, t;
        for (t in Je)
          Je[t] === void 0 ? delete e[t] : e[t] = Je[t];
        var r = [];
        for (t in e)
          r.push(`${t}=${e[t]}`);
        Be = r;
      }
      return Be;
    }, Be;
    function Mt() {
    }
    function Rt() {
    }
    function Tt() {
    }
    function Dt() {
    }
    function Ot() {
    }
    function Nt() {
    }
    function Pt() {
    }
    function Ft() {
    }
    function Ut() {
    }
    function Lt() {
    }
    function zt() {
    }
    function $t() {
    }
    function Jt() {
    }
    function Bt() {
    }
    function Ht() {
    }
    function Kt() {
    }
    function Vt() {
    }
    function Wt() {
    }
    function Qt() {
    }
    function jt() {
    }
    function Yt() {
    }
    function Zt() {
    }
    function Xt() {
    }
    function Gt() {
    }
    function kt() {
    }
    function er() {
    }
    function tr() {
    }
    function rr() {
    }
    function nr() {
    }
    function ir() {
    }
    function or() {
    }
    function sr() {
    }
    function ur() {
    }
    function ar() {
    }
    function fr() {
    }
    function cr() {
    }
    function lr() {
    }
    function dr() {
    }
    function hr() {
    }
    var K2 = (e, t, r, n) => {
      var o = { string: (f) => {
        var d2 = 0;
        if (f != null && f !== 0) {
          d2 = ee(f) + 1;
          var l = He(d2);
          te(f, p, l, d2), d2 = l;
        }
        return d2;
      }, array: (f) => {
        var d2 = He(f.length);
        return N.set(f, d2), d2;
      } };
      e = i["_" + e];
      var u2 = [], s = 0;
      if (n)
        for (var c = 0; c < n.length; c++) {
          var a = o[r[c]];
          a ? (s === 0 && (s = vr()), u2[c] = a(n[c])) : u2[c] = n[c];
        }
      return r = e.apply(null, u2), r = function(f) {
        return s !== 0 && gr(s), t === "string" ? f ? q(p, f) : "" : t === "boolean" ? !!f : f;
      }(r);
    };
    function _r2(e, t, r, n) {
      e || (e = this), this.parent = e, this.Rb = e.Rb, this.Xb = null, this.id = Yr++, this.name = t, this.mode = r, this.Cb = {}, this.Ib = {}, this.bc = n;
    }
    Object.defineProperties(_r2.prototype, { read: { get: function() {
      return (this.mode & 365) === 365;
    }, set: function(e) {
      e ? this.mode |= 365 : this.mode &= -366;
    } }, write: { get: function() {
      return (this.mode & 146) === 146;
    }, set: function(e) {
      e ? this.mode |= 146 : this.mode &= -147;
    } } }), At(), j = Array(4096), pt(E, "/"), H("/tmp"), H("/home"), H("/home/web_user"), function() {
      H("/dev"), Ue(259, { read: () => 0, write: (n, o, u2, s) => s }), ge("/dev/null", 259), at(1280, Wr), at(1536, Qr), ge("/dev/tty", 1280), ge("/dev/tty1", 1536);
      var e = new Uint8Array(1024), t = 0, r = () => (t === 0 && (t = st(e).byteLength), e[--t]);
      de("random", r), de("urandom", r), H("/dev/shm"), H("/dev/shm/tmp");
    }(), function() {
      H("/proc");
      var e = H("/proc/self");
      H("/proc/self/fd"), pt({ Rb() {
        var t = ht(e, "fd", 16895, 73);
        return t.Cb = { $b(r, n) {
          var o = P(+n);
          return r = { parent: null, Rb: { uc: "fake" }, Cb: { cc: () => o.path } }, r.parent = r;
        } }, t;
      } }, "/proc/self/fd");
    }(), function() {
      let e = /* @__PURE__ */ new Map();
      i.setAuthorizer = function(t, r, n) {
        return r ? e.set(t, { f: r, oc: n }) : e.delete(t), K2("set_authorizer", "number", ["number"], [t]);
      }, Mt = function(t, r, n, o, u2, s) {
        if (e.has(t)) {
          let { f: c, oc: a } = e.get(t);
          return c(a, r, n ? n ? q(p, n) : "" : null, o ? o ? q(p, o) : "" : null, u2 ? u2 ? q(p, u2) : "" : null, s ? s ? q(p, s) : "" : null);
        }
        return 0;
      };
    }(), function() {
      let e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
      i.createFunction = function(r, n, o, u2, s, c) {
        let a = e.size;
        return e.set(a, { f: c, Tb: s }), K2("create_function", "number", "number string number number number number".split(" "), [r, n, o, u2, a, 0]);
      }, i.createAggregate = function(r, n, o, u2, s, c, a) {
        let f = e.size;
        return e.set(f, { step: c, Dc: a, Tb: s }), K2("create_function", "number", "number string number number number number".split(" "), [r, n, o, u2, f, 1]);
      }, i.getFunctionUserData = function(r) {
        return t.get(r);
      }, Tt = function(r, n, o, u2) {
        r = e.get(r), t.set(n, r.Tb), r.f(n, new Uint32Array(p.buffer, u2, o)), t.delete(n);
      }, Ot = function(r, n, o, u2) {
        r = e.get(r), t.set(n, r.Tb), r.step(n, new Uint32Array(p.buffer, u2, o)), t.delete(n);
      }, Rt = function(r, n) {
        r = e.get(r), t.set(n, r.Tb), r.Dc(n), t.delete(n);
      };
    }(), function() {
      let e = /* @__PURE__ */ new Map();
      i.progressHandler = function(t, r, n, o) {
        return n ? e.set(t, { f: n, oc: o }) : e.delete(t), K2("progress_handler", null, ["number", "number"], [t, r]);
      }, Dt = function(t) {
        if (e.has(t)) {
          let { f: r, oc: n } = e.get(t);
          return r(n);
        }
        return 0;
      };
    }(), function() {
      function e(a, f) {
        let d2 = `get${a}`, l = `set${a}`;
        return new Proxy(new DataView(p.buffer, f, a === "Int32" ? 4 : 8), { get(b, x) {
          if (x === d2)
            return function(A, D) {
              if (!D)
                throw Error("must be little endian");
              return b[x](A, D);
            };
          if (x === l)
            return function(A, D, R) {
              if (!R)
                throw Error("must be little endian");
              return b[x](A, D, R);
            };
          if (typeof x == "string" && x.match(/^(get)|(set)/))
            throw Error("invalid type");
          return b[x];
        } });
      }
      let t = typeof Asyncify == "object", r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), u2 = t ? /* @__PURE__ */ new Set() : null, s = t ? /* @__PURE__ */ new Set() : null, c = /* @__PURE__ */ new Map();
      Zt = function(a, f, d2, l) {
        c.set(a ? q(p, a) : "", { size: f, ac: Array.from(new Uint32Array(p.buffer, l, d2)) });
      }, i.createModule = function(a, f, d2, l) {
        t && (d2.handleAsync = Asyncify.Fc);
        let b = r.size;
        return r.set(b, { module: d2, Tb: l }), l = 0, d2.xCreate && (l |= 1), d2.xConnect && (l |= 2), d2.xBestIndex && (l |= 4), d2.xDisconnect && (l |= 8), d2.xDestroy && (l |= 16), d2.xOpen && (l |= 32), d2.xClose && (l |= 64), d2.xFilter && (l |= 128), d2.xNext && (l |= 256), d2.xEof && (l |= 512), d2.xColumn && (l |= 1024), d2.xRowid && (l |= 2048), d2.xUpdate && (l |= 4096), d2.xBegin && (l |= 8192), d2.xSync && (l |= 16384), d2.xCommit && (l |= 32768), d2.xRollback && (l |= 65536), d2.xFindFunction && (l |= 131072), d2.xRename && (l |= 262144), K2("create_module", "number", ["number", "string", "number", "number"], [a, f, b, l]);
      }, $t = function(a, f, d2, l, b, x) {
        if (f = r.get(f), n.set(b, f), t) {
          u2.delete(b);
          for (let A of u2)
            n.delete(A);
        }
        return l = Array.from(new Uint32Array(p.buffer, l, d2)).map((A) => A ? q(p, A) : ""), f.module.xCreate(a, f.Tb, l, b, e("Int32", x));
      }, zt = function(a, f, d2, l, b, x) {
        if (f = r.get(f), n.set(b, f), t) {
          u2.delete(b);
          for (let A of u2)
            n.delete(A);
        }
        return l = Array.from(new Uint32Array(p.buffer, l, d2)).map((A) => A ? q(p, A) : ""), f.module.xConnect(a, f.Tb, l, b, e("Int32", x));
      }, Pt = function(a, f) {
        var d2 = n.get(a), l = c.get("sqlite3_index_info").ac;
        let b = {};
        b.nConstraint = T(f + l[0], "i32"), b.aConstraint = [];
        for (var x = T(f + l[1], "*"), A = c.get("sqlite3_index_constraint").size, D = 0; D < b.nConstraint; ++D) {
          var R = b.aConstraint, U = R.push, O = x + D * A, se = c.get("sqlite3_index_constraint").ac, Y2 = {};
          Y2.iColumn = T(O + se[0], "i32"), Y2.op = T(O + se[1], "i8"), Y2.usable = !!T(O + se[2], "i8"), U.call(R, Y2);
        }
        for (b.nOrderBy = T(f + l[2], "i32"), b.aOrderBy = [], x = T(f + l[3], "*"), A = c.get("sqlite3_index_orderby").size, D = 0; D < b.nOrderBy; ++D)
          R = b.aOrderBy, U = R.push, O = x + D * A, se = c.get("sqlite3_index_orderby").ac, Y2 = {}, Y2.iColumn = T(O + se[0], "i32"), Y2.desc = !!T(O + se[1], "i8"), U.call(R, Y2);
        for (b.aConstraintUsage = [], x = 0; x < b.nConstraint; ++x)
          b.aConstraintUsage.push({ argvIndex: 0, omit: false });
        for (b.idxNum = T(f + l[5], "i32"), b.idxStr = null, b.orderByConsumed = !!T(f + l[8], "i8"), b.estimatedCost = T(f + l[9], "double"), b.estimatedRows = T(f + l[10], "i32"), b.idxFlags = T(f + l[11], "i32"), b.colUsed = T(f + l[12], "i32"), a = d2.module.xBestIndex(a, b), d2 = c.get("sqlite3_index_info").ac, l = T(f + d2[4], "*"), x = c.get("sqlite3_index_constraint_usage").size, U = 0; U < b.nConstraint; ++U)
          A = l + U * x, R = b.aConstraintUsage[U], O = c.get("sqlite3_index_constraint_usage").ac, B(A + O[0], R.argvIndex, "i32"), B(A + O[1], R.omit ? 1 : 0, "i8");
        return B(f + d2[5], b.idxNum, "i32"), typeof b.idxStr == "string" && (l = ee(b.idxStr), x = K2("sqlite3_malloc", "number", ["number"], [l + 1]), te(b.idxStr, p, x, l + 1), B(f + d2[6], x, "*"), B(f + d2[7], 1, "i32")), B(f + d2[8], b.orderByConsumed, "i32"), B(f + d2[9], b.estimatedCost, "double"), B(f + d2[10], b.estimatedRows, "i32"), B(f + d2[11], b.idxFlags, "i32"), a;
      }, Bt = function(a) {
        let f = n.get(a);
        return t ? u2.add(a) : n.delete(a), f.module.xDisconnect(a);
      }, Jt = function(a) {
        let f = n.get(a);
        return t ? u2.add(a) : n.delete(a), f.module.xDestroy(a);
      }, Wt = function(a, f) {
        let d2 = n.get(a);
        if (o.set(f, d2), t) {
          s.delete(f);
          for (let l of s)
            o.delete(l);
        }
        return d2.module.xOpen(a, f);
      }, Ft = function(a) {
        let f = o.get(a);
        return t ? s.add(a) : o.delete(a), f.module.xClose(a);
      }, Ht = function(a) {
        return o.get(a).module.xEof(a) ? 1 : 0;
      }, Kt = function(a, f, d2, l, b) {
        let x = o.get(a);
        return d2 = d2 ? d2 ? q(p, d2) : "" : null, b = new Uint32Array(p.buffer, b, l), x.module.xFilter(a, f, d2, b);
      }, Vt = function(a) {
        return o.get(a).module.xNext(a);
      }, Ut = function(a, f, d2) {
        return o.get(a).module.xColumn(a, f, d2);
      }, Yt = function(a, f) {
        return o.get(a).module.xRowid(a, e("BigInt64", f));
      }, Gt = function(a, f, d2, l) {
        let b = n.get(a);
        return d2 = new Uint32Array(p.buffer, d2, f), b.module.xUpdate(a, d2, e("BigInt64", l));
      }, Nt = function(a) {
        return n.get(a).module.xBegin(a);
      }, Xt = function(a) {
        return n.get(a).module.xSync(a);
      }, Lt = function(a) {
        return n.get(a).module.xCommit(a);
      }, jt = function(a) {
        return n.get(a).module.xRollback(a);
      }, Qt = function(a, f) {
        let d2 = n.get(a);
        return f = f ? q(p, f) : "", d2.module.xRename(a, f);
      };
    }(), function() {
      function e(s, c) {
        let a = `get${s}`, f = `set${s}`;
        return new Proxy(new DataView(p.buffer, c, s === "Int32" ? 4 : 8), { get(d2, l) {
          if (l === a)
            return function(b, x) {
              if (!x)
                throw Error("must be little endian");
              return d2[l](b, x);
            };
          if (l === f)
            return function(b, x, A) {
              if (!A)
                throw Error("must be little endian");
              return d2[l](b, x, A);
            };
          if (typeof l == "string" && l.match(/^(get)|(set)/))
            throw Error("invalid type");
          return d2[l];
        } });
      }
      function t(s) {
        return s >>= 2, C[s] + C[s + 1] * 2 ** 32;
      }
      let r = typeof Asyncify == "object", n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
      i.registerVFS = function(s, c) {
        if (K2("sqlite3_vfs_find", "number", ["string"], [s.name]))
          throw Error(`VFS '${s.name}' already registered`);
        r && (s.handleAsync = Asyncify.Fc);
        var a = s.Vc ?? 64;
        let f = i._malloc(4);
        return c = K2("register_vfs", "number", ["string", "number", "number", "number"], [s.name, a, c ? 1 : 0, f]), c || (a = T(f, "*"), n.set(a, s)), i._free(f), c;
      };
      let u2 = r ? /* @__PURE__ */ new Set() : null;
      tr = function(s) {
        let c = o.get(s);
        return r ? u2.add(s) : o.delete(s), c.xClose(s);
      }, ar = function(s, c, a, f) {
        return o.get(s).xRead(s, p.subarray(c, c + a), t(f));
      }, hr = function(s, c, a, f) {
        return o.get(s).xWrite(s, p.subarray(c, c + a), t(f));
      }, lr = function(s, c) {
        return o.get(s).xTruncate(s, t(c));
      }, cr = function(s, c) {
        return o.get(s).xSync(s, c);
      }, or = function(s, c) {
        let a = o.get(s);
        return c = e("BigInt64", c), a.xFileSize(s, c);
      }, sr = function(s, c) {
        return o.get(s).xLock(s, c);
      }, dr = function(s, c) {
        return o.get(s).xUnlock(s, c);
      }, er = function(s, c) {
        let a = o.get(s);
        return c = e("Int32", c), a.xCheckReservedLock(s, c);
      }, ir = function(s, c, a) {
        let f = o.get(s);
        return a = new DataView(p.buffer, a), f.xFileControl(s, c, a);
      }, fr = function(s) {
        return o.get(s).xSectorSize(s);
      }, nr = function(s) {
        return o.get(s).xDeviceCharacteristics(s);
      }, ur = function(s, c, a, f, d2) {
        if (s = n.get(s), o.set(a, s), r) {
          u2.delete(a);
          for (var l of u2)
            o.delete(l);
        }
        if (l = null, f & 64) {
          l = 1;
          let b = [];
          for (; l; ) {
            let x = p[c++];
            if (x)
              b.push(x);
            else
              switch (p[c] || (l = null), l) {
                case 1:
                  b.push(63), l = 2;
                  break;
                case 2:
                  b.push(61), l = 3;
                  break;
                case 3:
                  b.push(38), l = 2;
              }
          }
          l = new TextDecoder().decode(new Uint8Array(b));
        } else
          c && (l = c ? q(p, c) : "");
        return d2 = e("Int32", d2), s.xOpen(l, a, f, d2);
      }, rr = function(s, c, a) {
        return n.get(s).xDelete(c ? q(p, c) : "", a);
      }, kt = function(s, c, a, f) {
        return s = n.get(s), f = e("Int32", f), s.xAccess(c ? q(p, c) : "", a, f);
      };
    }();
    var en = { a: (e, t, r, n) => {
      W2(`Assertion failed: ${e ? q(p, e) : ""}, at: ` + [t ? t ? q(p, t) : "" : "unknown filename", r, n ? n ? q(p, n) : "" : "unknown function"]);
    }, K: function(e, t) {
      try {
        return e = e ? q(p, e) : "", Et(e, t), 0;
      } catch (r) {
        if (typeof S > "u" || r.name !== "ErrnoError")
          throw r;
        return -r.Kb;
      }
    }, M: function(e, t, r) {
      try {
        if (t = t ? q(p, t) : "", t = ne(e, t), r & -8)
          return -28;
        var n = F(t, { Ub: true }).node;
        return n ? (e = "", r & 4 && (e += "r"), r & 2 && (e += "w"), r & 1 && (e += "x"), e && oe(n, e) ? -2 : 0) : -44;
      } catch (o) {
        if (typeof S > "u" || o.name !== "ErrnoError")
          throw o;
        return -o.Kb;
      }
    }, L: function(e, t) {
      try {
        var r = P(e);
        return Et(r.node, t), 0;
      } catch (n) {
        if (typeof S > "u" || n.name !== "ErrnoError")
          throw n;
        return -n.Kb;
      }
    }, J: function(e) {
      try {
        var t = P(e).node, r = typeof t == "string" ? F(t, { Ub: true }).node : t;
        if (!r.Cb.Mb)
          throw new h(63);
        return r.Cb.Mb(r, { timestamp: Date.now() }), 0;
      } catch (n) {
        if (typeof S > "u" || n.name !== "ErrnoError")
          throw n;
        return -n.Kb;
      }
    }, b: function(e, t, r) {
      Ie = r;
      try {
        var n = P(e);
        switch (t) {
          case 0:
            var o = Ce();
            if (0 > o)
              return -28;
            for (; le[o]; )
              o++;
            return mt(n, o).Sb;
          case 1:
          case 2:
            return 0;
          case 3:
            return n.flags;
          case 4:
            return o = Ce(), n.flags |= o, 0;
          case 5:
            return o = Ce(), fe[o + 0 >> 1] = 2, 0;
          case 6:
          case 7:
            return 0;
          case 16:
          case 8:
            return -28;
          case 9:
            return v2[wr() >> 2] = 28, -1;
          default:
            return -28;
        }
      } catch (u2) {
        if (typeof S > "u" || u2.name !== "ErrnoError")
          throw u2;
        return -u2.Kb;
      }
    }, I: function(e, t) {
      try {
        var r = P(e);
        return Ae(Ee, r.path, t);
      } catch (n) {
        if (typeof S > "u" || n.name !== "ErrnoError")
          throw n;
        return -n.Kb;
      }
    }, n: function(e, t, r) {
      t = _e2(t, r);
      try {
        if (isNaN(t))
          return 61;
        var n = P(e);
        if (!(n.flags & 2097155))
          throw new h(28);
        return xt(n.node, t), 0;
      } catch (o) {
        if (typeof S > "u" || o.name !== "ErrnoError")
          throw o;
        return -o.Kb;
      }
    }, C: function(e, t) {
      try {
        if (t === 0)
          return -28;
        var r = ee("/") + 1;
        return t < r ? -68 : (te("/", p, e, t), r);
      } catch (n) {
        if (typeof S > "u" || n.name !== "ErrnoError")
          throw n;
        return -n.Kb;
      }
    }, F: function(e, t) {
      try {
        return e = e ? q(p, e) : "", Ae(gt, e, t);
      } catch (r) {
        if (typeof S > "u" || r.name !== "ErrnoError")
          throw r;
        return -r.Kb;
      }
    }, z: function(e, t, r) {
      try {
        return t = t ? q(p, t) : "", t = ne(e, t), t = Q(t), t[t.length - 1] === "/" && (t = t.substr(0, t.length - 1)), H(t, r), 0;
      } catch (n) {
        if (typeof S > "u" || n.name !== "ErrnoError")
          throw n;
        return -n.Kb;
      }
    }, E: function(e, t, r, n) {
      try {
        t = t ? q(p, t) : "";
        var o = n & 256;
        return t = ne(e, t, n & 4096), Ae(o ? gt : Ee, t, r);
      } catch (u2) {
        if (typeof S > "u" || u2.name !== "ErrnoError")
          throw u2;
        return -u2.Kb;
      }
    }, y: function(e, t, r, n) {
      Ie = n;
      try {
        t = t ? q(p, t) : "", t = ne(e, t);
        var o = n ? Ce() : 0;
        return xe(t, r, o).Sb;
      } catch (u2) {
        if (typeof S > "u" || u2.name !== "ErrnoError")
          throw u2;
        return -u2.Kb;
      }
    }, w: function(e, t, r, n) {
      try {
        if (t = t ? q(p, t) : "", t = ne(e, t), 0 >= n)
          return -28;
        var o = vt(t), u2 = Math.min(n, ee(o)), s = N[r + u2];
        return te(o, p, r, n + 1), N[r + u2] = s, u2;
      } catch (c) {
        if (typeof S > "u" || c.name !== "ErrnoError")
          throw c;
        return -c.Kb;
      }
    }, u: function(e) {
      try {
        return e = e ? q(p, e) : "", yt(e), 0;
      } catch (t) {
        if (typeof S > "u" || t.name !== "ErrnoError")
          throw t;
        return -t.Kb;
      }
    }, H: function(e, t) {
      try {
        return e = e ? q(p, e) : "", Ae(Ee, e, t);
      } catch (r) {
        if (typeof S > "u" || r.name !== "ErrnoError")
          throw r;
        return -r.Kb;
      }
    }, r: function(e, t, r) {
      try {
        if (t = t ? q(p, t) : "", t = ne(e, t), r === 0) {
          e = t;
          var n = F(e, { parent: true }).node;
          if (!n)
            throw new h(44);
          var o = pe(e), u2 = re(n, o), s = bt(n, o, false);
          if (s)
            throw new h(s);
          if (!n.Cb.kc)
            throw new h(63);
          if (u2.Xb)
            throw new h(10);
          n.Cb.kc(n, o), dt(u2);
        } else
          r === 512 ? yt(t) : W2("Invalid flags passed to unlinkat");
        return 0;
      } catch (c) {
        if (typeof S > "u" || c.name !== "ErrnoError")
          throw c;
        return -c.Kb;
      }
    }, q: function(e, t, r) {
      try {
        if (t = t ? q(p, t) : "", t = ne(e, t, true), r) {
          var n = C[r >> 2] + 4294967296 * v2[r + 4 >> 2], o = v2[r + 8 >> 2];
          u2 = 1e3 * n + o / 1e6, r += 16, n = C[r >> 2] + 4294967296 * v2[r + 4 >> 2], o = v2[r + 8 >> 2], s = 1e3 * n + o / 1e6;
        } else
          var u2 = Date.now(), s = u2;
        e = u2;
        var c = F(t, { Ub: true }).node;
        return c.Cb.Mb(c, { timestamp: Math.max(e, s) }), 0;
      } catch (a) {
        if (typeof S > "u" || a.name !== "ErrnoError")
          throw a;
        return -a.Kb;
      }
    }, l: function(e, t, r) {
      e = new Date(1e3 * _e2(e, t)), v2[r >> 2] = e.getSeconds(), v2[r + 4 >> 2] = e.getMinutes(), v2[r + 8 >> 2] = e.getHours(), v2[r + 12 >> 2] = e.getDate(), v2[r + 16 >> 2] = e.getMonth(), v2[r + 20 >> 2] = e.getFullYear() - 1900, v2[r + 24 >> 2] = e.getDay(), t = e.getFullYear(), v2[r + 28 >> 2] = (t % 4 !== 0 || t % 100 === 0 && t % 400 !== 0 ? kr : Gr)[e.getMonth()] + e.getDate() - 1 | 0, v2[r + 36 >> 2] = -(60 * e.getTimezoneOffset()), t = new Date(e.getFullYear(), 6, 1).getTimezoneOffset();
      var n = new Date(e.getFullYear(), 0, 1).getTimezoneOffset();
      v2[r + 32 >> 2] = (t != n && e.getTimezoneOffset() == Math.min(n, t)) | 0;
    }, i: function(e, t, r, n, o, u2, s, c) {
      o = _e2(o, u2);
      try {
        if (isNaN(o))
          return 61;
        var a = P(n);
        if (t & 2 && !(r & 2) && (a.flags & 2097155) !== 2)
          throw new h(2);
        if ((a.flags & 2097155) === 1)
          throw new h(2);
        if (!a.Ib.fc)
          throw new h(43);
        var f = a.Ib.fc(a, e, o, t, r), d2 = f.Jc;
        return v2[s >> 2] = f.xc, C[c >> 2] = d2, 0;
      } catch (l) {
        if (typeof S > "u" || l.name !== "ErrnoError")
          throw l;
        return -l.Kb;
      }
    }, j: function(e, t, r, n, o, u2, s) {
      u2 = _e2(u2, s);
      try {
        if (isNaN(u2))
          return 61;
        var c = P(o);
        if (r & 2) {
          if ((c.node.mode & 61440) !== 32768)
            throw new h(43);
          n & 2 || c.Ib.hc && c.Ib.hc(c, p.slice(e, e + t), u2, t, n);
        }
      } catch (a) {
        if (typeof S > "u" || a.name !== "ErrnoError")
          throw a;
        return -a.Kb;
      }
    }, s: (e, t, r) => {
      function n(a) {
        return (a = a.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? a[1] : "GMT";
      }
      var o = (/* @__PURE__ */ new Date()).getFullYear(), u2 = new Date(o, 0, 1), s = new Date(o, 6, 1);
      o = u2.getTimezoneOffset();
      var c = s.getTimezoneOffset();
      C[e >> 2] = 60 * Math.max(o, c), v2[t >> 2] = +(o != c), e = n(u2), t = n(s), e = Ct(e), t = Ct(t), c < o ? (C[r >> 2] = e, C[r + 4 >> 2] = t) : (C[r >> 2] = t, C[r + 4 >> 2] = e);
    }, e: () => Date.now(), d: () => performance.now(), o: (e) => {
      var t = p.length;
      if (e >>>= 0, 2147483648 < e)
        return false;
      for (var r = 1; 4 >= r; r *= 2) {
        var n = t * (1 + 0.2 / r);
        n = Math.min(n, e + 100663296);
        var o = Math;
        n = Math.max(e, n);
        e: {
          o = (o.min.call(o, 2147483648, n + (65536 - n % 65536) % 65536) - be.buffer.byteLength + 65535) / 65536;
          try {
            be.grow(o), Ye();
            var u2 = 1;
            break e;
          } catch {
          }
          u2 = void 0;
        }
        if (u2)
          return true;
      }
      return false;
    }, A: (e, t) => {
      var r = 0;
      return St().forEach((n, o) => {
        var u2 = t + r;
        for (o = C[e + 4 * o >> 2] = u2, u2 = 0; u2 < n.length; ++u2)
          N[o++ >> 0] = n.charCodeAt(u2);
        N[o >> 0] = 0, r += n.length + 1;
      }), 0;
    }, B: (e, t) => {
      var r = St();
      C[e >> 2] = r.length;
      var n = 0;
      return r.forEach((o) => n += o.length + 1), C[t >> 2] = n, 0;
    }, f: function(e) {
      try {
        var t = P(e);
        if (t.Sb === null)
          throw new h(8);
        t.lc && (t.lc = null);
        try {
          t.Ib.close && t.Ib.close(t);
        } catch (r) {
          throw r;
        } finally {
          le[t.Sb] = null;
        }
        return t.Sb = null, 0;
      } catch (r) {
        if (typeof S > "u" || r.name !== "ErrnoError")
          throw r;
        return r.Kb;
      }
    }, p: function(e, t) {
      try {
        var r = P(e);
        return N[t >> 0] = r.Ob ? 2 : L(r.mode) ? 3 : (r.mode & 61440) === 40960 ? 7 : 4, fe[t + 2 >> 1] = 0, M2 = [0, (y = 0, 1 <= +Math.abs(y) ? 0 < y ? +Math.floor(y / 4294967296) >>> 0 : ~~+Math.ceil((y - +(~~y >>> 0)) / 4294967296) >>> 0 : 0)], v2[t + 8 >> 2] = M2[0], v2[t + 12 >> 2] = M2[1], M2 = [0, (y = 0, 1 <= +Math.abs(y) ? 0 < y ? +Math.floor(y / 4294967296) >>> 0 : ~~+Math.ceil((y - +(~~y >>> 0)) / 4294967296) >>> 0 : 0)], v2[t + 16 >> 2] = M2[0], v2[t + 20 >> 2] = M2[1], 0;
      } catch (n) {
        if (typeof S > "u" || n.name !== "ErrnoError")
          throw n;
        return n.Kb;
      }
    }, x: function(e, t, r, n) {
      try {
        e: {
          var o = P(e);
          e = t;
          for (var u2, s = t = 0; s < r; s++) {
            var c = C[e >> 2], a = C[e + 4 >> 2];
            e += 8;
            var f = o, d2 = c, l = a, b = u2, x = N;
            if (0 > l || 0 > b)
              throw new h(28);
            if (f.Sb === null)
              throw new h(8);
            if ((f.flags & 2097155) === 1)
              throw new h(8);
            if (L(f.node.mode))
              throw new h(31);
            if (!f.Ib.read)
              throw new h(28);
            var A = typeof b < "u";
            if (!A)
              b = f.position;
            else if (!f.seekable)
              throw new h(70);
            var D = f.Ib.read(f, x, d2, l, b);
            A || (f.position += D);
            var R = D;
            if (0 > R) {
              var U = -1;
              break e;
            }
            if (t += R, R < a)
              break;
            typeof u2 < "u" && (u2 += R);
          }
          U = t;
        }
        return C[n >> 2] = U, 0;
      } catch (O) {
        if (typeof S > "u" || O.name !== "ErrnoError")
          throw O;
        return O.Kb;
      }
    }, m: function(e, t, r, n, o) {
      t = _e2(t, r);
      try {
        if (isNaN(t))
          return 61;
        var u2 = P(e);
        return qt(u2, t, n), M2 = [u2.position >>> 0, (y = u2.position, 1 <= +Math.abs(y) ? 0 < y ? +Math.floor(y / 4294967296) >>> 0 : ~~+Math.ceil((y - +(~~y >>> 0)) / 4294967296) >>> 0 : 0)], v2[o >> 2] = M2[0], v2[o + 4 >> 2] = M2[1], u2.lc && t === 0 && n === 0 && (u2.lc = null), 0;
      } catch (s) {
        if (typeof S > "u" || s.name !== "ErrnoError")
          throw s;
        return s.Kb;
      }
    }, D: function(e) {
      try {
        var t = P(e);
        return t.Ib && t.Ib.Wb ? t.Ib.Wb(t) : 0;
      } catch (r) {
        if (typeof S > "u" || r.name !== "ErrnoError")
          throw r;
        return r.Kb;
      }
    }, t: function(e, t, r, n) {
      try {
        e: {
          var o = P(e);
          e = t;
          for (var u2, s = t = 0; s < r; s++) {
            var c = C[e >> 2], a = C[e + 4 >> 2];
            e += 8;
            var f = o, d2 = c, l = a, b = u2, x = N;
            if (0 > l || 0 > b)
              throw new h(28);
            if (f.Sb === null)
              throw new h(8);
            if (!(f.flags & 2097155))
              throw new h(8);
            if (L(f.node.mode))
              throw new h(31);
            if (!f.Ib.write)
              throw new h(28);
            f.seekable && f.flags & 1024 && qt(f, 0, 2);
            var A = typeof b < "u";
            if (!A)
              b = f.position;
            else if (!f.seekable)
              throw new h(70);
            var D = f.Ib.write(f, x, d2, l, b, void 0);
            A || (f.position += D);
            var R = D;
            if (0 > R) {
              var U = -1;
              break e;
            }
            t += R, typeof u2 < "u" && (u2 += R);
          }
          U = t;
        }
        return C[n >> 2] = U, 0;
      } catch (O) {
        if (typeof S > "u" || O.name !== "ErrnoError")
          throw O;
        return O.Kb;
      }
    }, ra: Mt, N: Rt, ga: Tt, ca: Dt, Y: Ot, la: Nt, G: Pt, h: Ft, oa: Ut, ja: Lt, ea: zt, fa: $t, k: Jt, v: Bt, pa: Ht, g: Kt, qa: Vt, da: Wt, ha: Qt, ia: jt, na: Yt, c: Zt, ka: Xt, ma: Gt, aa: kt, V: er, $: tr, ba: rr, S: nr, U: ir, Z: or, X: sr, R: ur, Q: ar, T: fr, _: cr, O: lr, W: dr, P: hr }, w = function() {
      function e(r) {
        return w = r.exports, be = w.sa, Ye(), Xe.unshift(w.ta), G--, i.monitorRunDependencies && i.monitorRunDependencies(G), G == 0 && ce && (r = ce, ce = null, r()), w;
      }
      var t = { a: en };
      if (G++, i.monitorRunDependencies && i.monitorRunDependencies(G), i.instantiateWasm)
        try {
          return i.instantiateWasm(t, e);
        } catch (r) {
          X(`Module.instantiateWasm callback failed with error: ${r}`), I(r);
        }
      return Jr(t, function(r) {
        e(r.instance);
      }).catch(I), {};
    }();
    i._sqlite3_vfs_find = (e) => (i._sqlite3_vfs_find = w.ua)(e), i._sqlite3_malloc = (e) => (i._sqlite3_malloc = w.va)(e), i._sqlite3_free = (e) => (i._sqlite3_free = w.wa)(e), i._sqlite3_prepare_v2 = (e, t, r, n, o) => (i._sqlite3_prepare_v2 = w.xa)(e, t, r, n, o), i._sqlite3_step = (e) => (i._sqlite3_step = w.ya)(e), i._sqlite3_column_int64 = (e, t) => (i._sqlite3_column_int64 = w.za)(e, t), i._sqlite3_column_int = (e, t) => (i._sqlite3_column_int = w.Aa)(e, t), i._sqlite3_finalize = (e) => (i._sqlite3_finalize = w.Ba)(e), i._sqlite3_reset = (e) => (i._sqlite3_reset = w.Ca)(e), i._sqlite3_clear_bindings = (e) => (i._sqlite3_clear_bindings = w.Da)(e), i._sqlite3_value_blob = (e) => (i._sqlite3_value_blob = w.Ea)(e), i._sqlite3_value_text = (e) => (i._sqlite3_value_text = w.Fa)(e), i._sqlite3_value_bytes = (e) => (i._sqlite3_value_bytes = w.Ga)(e), i._sqlite3_value_double = (e) => (i._sqlite3_value_double = w.Ha)(e), i._sqlite3_value_int = (e) => (i._sqlite3_value_int = w.Ia)(e), i._sqlite3_value_int64 = (e) => (i._sqlite3_value_int64 = w.Ja)(e), i._sqlite3_value_type = (e) => (i._sqlite3_value_type = w.Ka)(e), i._sqlite3_result_blob = (e, t, r, n) => (i._sqlite3_result_blob = w.La)(e, t, r, n), i._sqlite3_result_double = (e, t) => (i._sqlite3_result_double = w.Ma)(e, t), i._sqlite3_result_error = (e, t, r) => (i._sqlite3_result_error = w.Na)(e, t, r), i._sqlite3_result_int = (e, t) => (i._sqlite3_result_int = w.Oa)(e, t), i._sqlite3_result_int64 = (e, t, r) => (i._sqlite3_result_int64 = w.Pa)(e, t, r), i._sqlite3_result_null = (e) => (i._sqlite3_result_null = w.Qa)(e), i._sqlite3_result_text = (e, t, r, n) => (i._sqlite3_result_text = w.Ra)(e, t, r, n), i._sqlite3_column_count = (e) => (i._sqlite3_column_count = w.Sa)(e), i._sqlite3_data_count = (e) => (i._sqlite3_data_count = w.Ta)(e), i._sqlite3_column_blob = (e, t) => (i._sqlite3_column_blob = w.Ua)(e, t), i._sqlite3_column_bytes = (e, t) => (i._sqlite3_column_bytes = w.Va)(e, t), i._sqlite3_column_double = (e, t) => (i._sqlite3_column_double = w.Wa)(e, t), i._sqlite3_column_text = (e, t) => (i._sqlite3_column_text = w.Xa)(e, t), i._sqlite3_column_type = (e, t) => (i._sqlite3_column_type = w.Ya)(e, t), i._sqlite3_column_name = (e, t) => (i._sqlite3_column_name = w.Za)(e, t), i._sqlite3_bind_blob = (e, t, r, n, o) => (i._sqlite3_bind_blob = w._a)(e, t, r, n, o), i._sqlite3_bind_double = (e, t, r) => (i._sqlite3_bind_double = w.$a)(e, t, r), i._sqlite3_bind_int = (e, t, r) => (i._sqlite3_bind_int = w.ab)(e, t, r), i._sqlite3_bind_int64 = (e, t, r, n) => (i._sqlite3_bind_int64 = w.bb)(e, t, r, n), i._sqlite3_bind_null = (e, t) => (i._sqlite3_bind_null = w.cb)(e, t), i._sqlite3_bind_text = (e, t, r, n, o) => (i._sqlite3_bind_text = w.db)(e, t, r, n, o), i._sqlite3_bind_parameter_count = (e) => (i._sqlite3_bind_parameter_count = w.eb)(e), i._sqlite3_bind_parameter_name = (e, t) => (i._sqlite3_bind_parameter_name = w.fb)(e, t), i._sqlite3_sql = (e) => (i._sqlite3_sql = w.gb)(e), i._sqlite3_exec = (e, t, r, n, o) => (i._sqlite3_exec = w.hb)(e, t, r, n, o), i._sqlite3_errmsg = (e) => (i._sqlite3_errmsg = w.ib)(e), i._sqlite3_declare_vtab = (e, t) => (i._sqlite3_declare_vtab = w.jb)(e, t), i._sqlite3_libversion = () => (i._sqlite3_libversion = w.kb)(), i._sqlite3_libversion_number = () => (i._sqlite3_libversion_number = w.lb)(), i._sqlite3_changes = (e) => (i._sqlite3_changes = w.mb)(e), i._sqlite3_close = (e) => (i._sqlite3_close = w.nb)(e), i._sqlite3_limit = (e, t, r) => (i._sqlite3_limit = w.ob)(e, t, r), i._sqlite3_open_v2 = (e, t, r, n) => (i._sqlite3_open_v2 = w.pb)(e, t, r, n), i._sqlite3_get_autocommit = (e) => (i._sqlite3_get_autocommit = w.qb)(e);
    var wr = () => (wr = w.rb)(), br = i._malloc = (e) => (br = i._malloc = w.sb)(e);
    i._free = (e) => (i._free = w.tb)(e), i._RegisterExtensionFunctions = (e) => (i._RegisterExtensionFunctions = w.ub)(e), i._set_authorizer = (e) => (i._set_authorizer = w.vb)(e), i._create_function = (e, t, r, n, o, u2) => (i._create_function = w.wb)(e, t, r, n, o, u2), i._create_module = (e, t, r, n) => (i._create_module = w.xb)(e, t, r, n), i._progress_handler = (e, t) => (i._progress_handler = w.yb)(e, t), i._register_vfs = (e, t, r, n) => (i._register_vfs = w.zb)(e, t, r, n), i._getSqliteFree = () => (i._getSqliteFree = w.Ab)();
    var mr = i._main = (e, t) => (mr = i._main = w.Bb)(e, t), pr = (e, t) => (pr = w.Db)(e, t), yr = () => (yr = w.Eb)(), vr = () => (vr = w.Fb)(), gr = (e) => (gr = w.Gb)(e), He = (e) => (He = w.Hb)(e);
    i.getTempRet0 = yr, i.ccall = K2, i.cwrap = (e, t, r, n) => {
      var o = !r || r.every((u2) => u2 === "number" || u2 === "boolean");
      return t !== "string" && o && !n ? i["_" + e] : function() {
        return K2(e, t, r, arguments);
      };
    }, i.setValue = B, i.getValue = T, i.UTF8ToString = (e, t) => e ? q(p, e, t) : "", i.stringToUTF8 = (e, t, r) => te(e, p, t, r), i.lengthBytesUTF8 = ee;
    var Se;
    ce = function e() {
      Se || Er(), Se || (ce = e);
    };
    function Er() {
      function e() {
        if (!Se && (Se = true, i.calledRun = true, !Re)) {
          if (i.noFSInit || It || (It = true, At(), i.stdin = i.stdin, i.stdout = i.stdout, i.stderr = i.stderr, i.stdin ? de("stdin", i.stdin) : ze("/dev/tty", "/dev/stdin"), i.stdout ? de("stdout", null, i.stdout) : ze("/dev/tty", "/dev/stdout"), i.stderr ? de("stderr", null, i.stderr) : ze("/dev/tty1", "/dev/stderr"), xe("/dev/stdin", 0), xe("/dev/stdout", 1), xe("/dev/stderr", 1)), lt = false, me(Xe), me(Lr), g(i), i.onRuntimeInitialized && i.onRuntimeInitialized(), xr) {
            var t = mr;
            try {
              var r = t(0, 0);
              Br || (i.onExit && i.onExit(r), Re = true), Z2(r, new nt(r));
            } catch (n) {
              n instanceof nt || n == "unwind" || Z2(1, n);
            }
          }
          if (i.postRun)
            for (typeof i.postRun == "function" && (i.postRun = [i.postRun]); i.postRun.length; )
              t = i.postRun.shift(), Ge.unshift(t);
          me(Ge);
        }
      }
      if (!(0 < G)) {
        if (i.preRun)
          for (typeof i.preRun == "function" && (i.preRun = [i.preRun]); i.preRun.length; )
            zr();
        me(Ze), 0 < G || (i.setStatus ? (i.setStatus("Running..."), setTimeout(function() {
          setTimeout(function() {
            i.setStatus("");
          }, 1), e();
        }, 1)) : e());
      }
    }
    if (i.preInit)
      for (typeof i.preInit == "function" && (i.preInit = [i.preInit]); 0 < i.preInit.length; )
        i.preInit.pop()();
    var xr = true;
    return i.noInitialRun && (xr = false), Er(), _.ready;
  };
})(), rn = tn, Ur = 4096, We = 512, nn = 4, on = 8, Ve = We + nn, Pr = We, Fr = Ve, ue = Ur, sn = $ | V | d | M, un = 6;
function ie(...m) {
}
var an = (_a2 = class extends u {
  constructor(m) {
    super();
    __privateAdd(this, _l);
    __privateAdd(this, _a);
    __privateAdd(this, _d);
    __privateAdd(this, _i);
    __privateAdd(this, _f);
    __privateAdd(this, _s);
    __privateAdd(this, _c);
    __privateAdd(this, _u, void 0);
    __privateAdd(this, _o, void 0);
    __privateAdd(this, _r, /* @__PURE__ */ new Map());
    __privateAdd(this, _e, /* @__PURE__ */ new Map());
    __privateAdd(this, _n, /* @__PURE__ */ new Set());
    __privateAdd(this, _t, /* @__PURE__ */ new Map());
    __privateSet(this, _u, m), this.isReady = this.reset().then(async () => {
      this.getCapacity() === 0 && await this.addCapacity(un);
    });
  }
  get name() {
    return "AccessHandlePool";
  }
  xOpen(m, _, i, g) {
    ie(`xOpen ${m} ${_} 0x${i.toString(16)}`);
    try {
      let I = m ? __privateMethod(this, _s, s_fn).call(this, m) : Math.random().toString(36), z2 = __privateGet(this, _e).get(I);
      if (!z2 && i & K)
        if (this.getSize() < this.getCapacity())
          [z2] = __privateGet(this, _n).keys(), __privateMethod(this, _i, i_fn).call(this, z2, I, i);
        else
          throw new Error("cannot create file");
      if (!z2)
        throw new Error("file not found");
      let $2 = { path: I, flags: i, accessHandle: z2 };
      return __privateGet(this, _t).set(_, $2), g.setInt32(0, i, true), v;
    } catch (I) {
      return console.error(I.message), W;
    }
  }
  xClose(m) {
    let _ = __privateGet(this, _t).get(m);
    return _ && (ie(`xClose ${_.path}`), _.accessHandle.flush(), __privateGet(this, _t).delete(m), _.flags & Z && __privateMethod(this, _c, c_fn).call(this, _.path)), v;
  }
  xRead(m, _, i) {
    let g = __privateGet(this, _t).get(m);
    ie(`xRead ${g.path} ${_.byteLength} ${i}`);
    let I = g.accessHandle.read(_, { at: ue + i });
    return I < _.byteLength ? (_.fill(0, I, _.byteLength), Y) : v;
  }
  xWrite(m, _, i) {
    let g = __privateGet(this, _t).get(m);
    return ie(`xWrite ${g.path} ${_.byteLength} ${i}`), g.accessHandle.write(_, { at: ue + i }) === _.byteLength ? v : z;
  }
  xTruncate(m, _) {
    let i = __privateGet(this, _t).get(m);
    return ie(`xTruncate ${i.path} ${_}`), i.accessHandle.truncate(ue + _), v;
  }
  xSync(m, _) {
    let i = __privateGet(this, _t).get(m);
    return ie(`xSync ${i.path} ${_}`), i.accessHandle.flush(), v;
  }
  xFileSize(m, _) {
    let i = __privateGet(this, _t).get(m), g = i.accessHandle.getSize() - ue;
    return ie(`xFileSize ${i.path} ${g}`), _.setBigInt64(0, BigInt(g), true), v;
  }
  xSectorSize(m) {
    return Ur;
  }
  xDeviceCharacteristics(m) {
    return un$1;
  }
  xAccess(m, _, i) {
    let g = __privateMethod(this, _s, s_fn).call(this, m);
    return i.setInt32(0, __privateGet(this, _e).has(g) ? 1 : 0, true), v;
  }
  xDelete(m, _) {
    let i = __privateMethod(this, _s, s_fn).call(this, m);
    return __privateMethod(this, _c, c_fn).call(this, i), v;
  }
  async close() {
    await __privateMethod(this, _a, a_fn).call(this);
  }
  async reset() {
    await this.isReady;
    let m = await navigator.storage.getDirectory();
    for (let _ of __privateGet(this, _u).split("/"))
      _ && (m = await m.getDirectoryHandle(_, { create: true }));
    __privateSet(this, _o, m), await __privateMethod(this, _a, a_fn).call(this), await __privateMethod(this, _l, l_fn).call(this);
  }
  getSize() {
    return __privateGet(this, _e).size;
  }
  getCapacity() {
    return __privateGet(this, _r).size;
  }
  async addCapacity(m) {
    for (let _ = 0; _ < m; ++_) {
      let i = Math.random().toString(36).replace("0.", ""), I = await (await __privateGet(this, _o).getFileHandle(i, { create: true })).createSyncAccessHandle();
      __privateGet(this, _r).set(I, i), __privateMethod(this, _i, i_fn).call(this, I, "", 0);
    }
    return m;
  }
  async removeCapacity(m) {
    let _ = 0;
    for (let i of Array.from(__privateGet(this, _n))) {
      if (_ == m || this.getSize() === this.getCapacity())
        return _;
      let g = __privateGet(this, _r).get(i);
      await i.close(), await __privateGet(this, _o).removeEntry(g), __privateGet(this, _r).delete(i), __privateGet(this, _n).delete(i), ++_;
    }
    return _;
  }
}, _u = new WeakMap(), _o = new WeakMap(), _r = new WeakMap(), _e = new WeakMap(), _n = new WeakMap(), _t = new WeakMap(), _l = new WeakSet(), l_fn = async function() {
  let m = [];
  for await (let [_, i] of __privateGet(this, _o))
    i.kind === "file" && m.push([_, i]);
  await Promise.all(m.map(async ([_, i]) => {
    let g = await i.createSyncAccessHandle();
    __privateGet(this, _r).set(g, _);
    let I = __privateMethod(this, _d, d_fn).call(this, g);
    I ? __privateGet(this, _e).set(I, g) : __privateGet(this, _n).add(g);
  }));
}, _a = new WeakSet(), a_fn = function() {
  for (let m of __privateGet(this, _r).keys())
    m.close();
  __privateGet(this, _r).clear(), __privateGet(this, _e).clear(), __privateGet(this, _n).clear();
}, _d = new WeakSet(), d_fn = function(m) {
  let _ = new Uint8Array(Ve);
  m.read(_, { at: 0 });
  let g = new DataView(_.buffer, _.byteOffset).getUint32(Pr);
  if (_[0] && (g & Z || !(g & sn)))
    return console.warn(`Remove file with unexpected flags ${g.toString(16)}`), __privateMethod(this, _i, i_fn).call(this, m, "", 0), "";
  let I = new Uint32Array(on / 4);
  m.read(I, { at: Fr });
  let z2 = __privateMethod(this, _f, f_fn).call(this, _);
  if (I.every(($2, Z2) => $2 === z2[Z2])) {
    let $2 = _.findIndex((Z2) => Z2 === 0);
    return $2 === 0 && m.truncate(ue), new TextDecoder().decode(_.subarray(0, $2));
  } else
    return console.warn("Disassociating file with bad digest."), __privateMethod(this, _i, i_fn).call(this, m, "", 0), "";
}, _i = new WeakSet(), i_fn = function(m, _, i) {
  let g = new Uint8Array(Ve);
  if (new TextEncoder().encodeInto(_, g).written >= We)
    throw new Error("path too long");
  new DataView(g.buffer, g.byteOffset).setUint32(Pr, i);
  let $2 = __privateMethod(this, _f, f_fn).call(this, g);
  m.write(g, { at: 0 }), m.write($2, { at: Fr }), m.flush(), _ ? (__privateGet(this, _e).set(_, m), __privateGet(this, _n).delete(m)) : (m.truncate(ue), __privateGet(this, _n).add(m));
}, _f = new WeakSet(), f_fn = function(m) {
  if (!m[0])
    return new Uint32Array([4274806656, 2899230775]);
  let _ = 3735928559, i = 1103547991;
  for (let g of m)
    _ = Math.imul(_ ^ g, 2654435761), i = Math.imul(i ^ g, 1597334677);
  return _ = Math.imul(_ ^ _ >>> 16, 2246822507) ^ Math.imul(i ^ i >>> 13, 3266489909), i = Math.imul(i ^ i >>> 16, 2246822507) ^ Math.imul(_ ^ _ >>> 13, 3266489909), new Uint32Array([_ >>> 0, i >>> 0]);
}, _s = new WeakSet(), s_fn = function(m) {
  return (typeof m == "string" ? new URL(m, "file://localhost/") : m).pathname;
}, _c = new WeakSet(), c_fn = function(m) {
  let _ = __privateGet(this, _e).get(m);
  _ && (__privateGet(this, _e).delete(m), __privateMethod(this, _i, i_fn).call(this, _, "", 0));
}, _a2);
async function ln(m, _ = {}) {
  let i = await rn(_.url ? { locateFile: () => _.url } : void 0), g = an$1(i), I = new an(m);
  return await I.isReady, g.vfs_register(I), { sqlite: g, fileName: m };
}
export {
  ln as useOpfsStorage
};
