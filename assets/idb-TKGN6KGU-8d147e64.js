var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
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
var _e, _n, _t, _r, r_fn, _o, o_fn, _i, i_fn, _a, _e2, _n2, _t2, _r2, _o2, _i2, _s, _u, u_fn, _b, _e3, _c, _e4, _d, _e5, _n3, _t3, _r3, _o3, _i3, _s2, s_fn, _u2, u_fn2, _c2, c_fn, _a2, a_fn, _l, l_fn, _e6;
import { u } from "./chunk-C3CYAGCE-eafb0490.js";
import { a as an, K as K$1, j, v, W, Z, z, Y, t as tn, f as fn$1, c as cn, o as on, u as un, J, n as nn, G, X, r as rn, s as sn, e as en } from "./worker-cad26e17.js";
var kn = (() => {
  var s = import.meta.url;
  return function(d = {}) {
    var i = d, f, y;
    i.ready = new Promise((e, t) => {
      f = e, y = t;
    });
    var x = Object.assign({}, i), C = "./this.program", k = (e, t) => {
      throw t;
    }, P = typeof window == "object", Z2 = typeof importScripts == "function", O = "", se;
    (P || Z2) && (Z2 ? O = self.location.href : typeof document < "u" && document.currentScript && (O = document.currentScript.src), s && (O = s), O.indexOf("blob:") !== 0 ? O = O.substr(0, O.replace(/[?#].*/, "").lastIndexOf("/") + 1) : O = "", Z2 && (se = (e) => {
      var t = new XMLHttpRequest();
      return t.open("GET", e, false), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
    }));
    var J2 = i.print || console.log.bind(console), G2 = i.printErr || console.error.bind(console);
    Object.assign(i, x), x = null, i.thisProgram && (C = i.thisProgram), i.quit && (k = i.quit);
    var z2;
    i.wasmBinary && (z2 = i.wasmBinary), typeof WebAssembly != "object" && X2("no native wasm support detected");
    var F, W2 = false, ee, V, v2, Ee, E, M, He, je;
    function ut() {
      var e = F.buffer;
      i.HEAP8 = V = new Int8Array(e), i.HEAP16 = Ee = new Int16Array(e), i.HEAPU8 = v2 = new Uint8Array(e), i.HEAPU16 = new Uint16Array(e), i.HEAP32 = E = new Int32Array(e), i.HEAPU32 = M = new Uint32Array(e), i.HEAPF32 = He = new Float32Array(e), i.HEAPF64 = je = new Float64Array(e);
    }
    var ct = [], lt = [], dn = [], ft = [];
    function wn() {
      var e = i.preRun.shift();
      ct.unshift(e);
    }
    var de = 0, xe = null;
    function X2(e) {
      throw i.onAbort && i.onAbort(e), e = "Aborted(" + e + ")", G2(e), W2 = true, ee = 1, e = new WebAssembly.RuntimeError(e + ". Build with -sASSERTIONS for more info."), y(e), e;
    }
    var ht = (e) => e.startsWith("data:application/octet-stream;base64,"), we;
    if (i.locateFile) {
      if (we = "wa-sqlite-async.wasm", !ht(we)) {
        var dt = we;
        we = i.locateFile ? i.locateFile(dt, O) : O + dt;
      }
    } else
      we = new URL("" + new URL("wa-sqlite-async-715b3d85.wasm", import.meta.url).href, self.location).href;
    function wt(e) {
      if (e == we && z2)
        return new Uint8Array(z2);
      if (se)
        return se(e);
      throw "both async and sync fetching of the wasm failed";
    }
    function _n4(e) {
      return z2 || !P && !Z2 || typeof fetch != "function" ? Promise.resolve().then(() => wt(e)) : fetch(e, { credentials: "same-origin" }).then((t) => {
        if (!t.ok)
          throw "failed to load wasm binary file at '" + e + "'";
        return t.arrayBuffer();
      }).catch(() => wt(e));
    }
    function _t4(e, t, r) {
      return _n4(e).then((n) => WebAssembly.instantiate(n, t)).then((n) => n).then(r, (n) => {
        G2(`failed to asynchronously prepare wasm: ${n}`), X2(n);
      });
    }
    function bn(e, t) {
      var r = we;
      return z2 || typeof WebAssembly.instantiateStreaming != "function" || ht(r) || typeof fetch != "function" ? _t4(r, e, t) : fetch(r, { credentials: "same-origin" }).then((n) => WebAssembly.instantiateStreaming(n, e).then(t, function(o) {
        return G2(`wasm streaming compile failed: ${o}`), G2("falling back to ArrayBuffer instantiation"), _t4(r, e, t);
      }));
    }
    var g, N;
    function bt(e) {
      this.name = "ExitStatus", this.message = `Program terminated with exit(${e})`, this.status = e;
    }
    var Ie = (e) => {
      for (; 0 < e.length; )
        e.shift()(i);
    };
    function L(e, t = "i8") {
      switch (t.endsWith("*") && (t = "*"), t) {
        case "i1":
          return V[e >> 0];
        case "i8":
          return V[e >> 0];
        case "i16":
          return Ee[e >> 1];
        case "i32":
          return E[e >> 2];
        case "i64":
          X2("to do getValue(i64) use WASM_BIGINT");
        case "float":
          return He[e >> 2];
        case "double":
          return je[e >> 3];
        case "*":
          return M[e >> 2];
        default:
          X2(`invalid type for getValue: ${t}`);
      }
    }
    var pt = i.noExitRuntime || true;
    function te(e, t, r = "i8") {
      switch (r.endsWith("*") && (r = "*"), r) {
        case "i1":
          V[e >> 0] = t;
          break;
        case "i8":
          V[e >> 0] = t;
          break;
        case "i16":
          Ee[e >> 1] = t;
          break;
        case "i32":
          E[e >> 2] = t;
          break;
        case "i64":
          X2("to do setValue(i64) use WASM_BIGINT");
        case "float":
          He[e >> 2] = t;
          break;
        case "double":
          je[e >> 3] = t;
          break;
        case "*":
          M[e >> 2] = t;
          break;
        default:
          X2(`invalid type for setValue: ${r}`);
      }
    }
    var mt = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0, R = (e, t, r) => {
      var n = t + r;
      for (r = t; e[r] && !(r >= n); )
        ++r;
      if (16 < r - t && e.buffer && mt)
        return mt.decode(e.subarray(t, r));
      for (n = ""; t < r; ) {
        var o = e[t++];
        if (o & 128) {
          var u2 = e[t++] & 63;
          if ((o & 224) == 192)
            n += String.fromCharCode((o & 31) << 6 | u2);
          else {
            var a = e[t++] & 63;
            o = (o & 240) == 224 ? (o & 15) << 12 | u2 << 6 | a : (o & 7) << 18 | u2 << 12 | a << 6 | e[t++] & 63, 65536 > o ? n += String.fromCharCode(o) : (o -= 65536, n += String.fromCharCode(55296 | o >> 10, 56320 | o & 1023));
          }
        } else
          n += String.fromCharCode(o);
      }
      return n;
    }, yt = (e, t) => {
      for (var r = 0, n = e.length - 1; 0 <= n; n--) {
        var o = e[n];
        o === "." ? e.splice(n, 1) : o === ".." ? (e.splice(n, 1), r++) : r && (e.splice(n, 1), r--);
      }
      if (t)
        for (; r; r--)
          e.unshift("..");
      return e;
    }, ae = (e) => {
      var t = e.charAt(0) === "/", r = e.substr(-1) === "/";
      return (e = yt(e.split("/").filter((n) => !!n), !t).join("/")) || t || (e = "."), e && r && (e += "/"), (t ? "/" : "") + e;
    }, pn = (e) => {
      var t = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);
      return e = t[0], t = t[1], !e && !t ? "." : (t && (t = t.substr(0, t.length - 1)), e + t);
    }, Ne = (e) => {
      if (e === "/")
        return "/";
      e = ae(e), e = e.replace(/\/$/, "");
      var t = e.lastIndexOf("/");
      return t === -1 ? e : e.substr(t + 1);
    }, mn = () => {
      if (typeof crypto == "object" && typeof crypto.getRandomValues == "function")
        return (e) => crypto.getRandomValues(e);
      X2("initRandomDevice");
    }, vt = (e) => (vt = mn())(e);
    function De() {
      for (var e = "", t = false, r = arguments.length - 1; -1 <= r && !t; r--) {
        if (t = 0 <= r ? arguments[r] : "/", typeof t != "string")
          throw new TypeError("Arguments to path.resolve must be strings");
        if (!t)
          return "";
        e = t + "/" + e, t = t.charAt(0) === "/";
      }
      return e = yt(e.split("/").filter((n) => !!n), !t).join("/"), (t ? "/" : "") + e || ".";
    }
    var Ke = [], _e7 = (e) => {
      for (var t = 0, r = 0; r < e.length; ++r) {
        var n = e.charCodeAt(r);
        127 >= n ? t++ : 2047 >= n ? t += 2 : 55296 <= n && 57343 >= n ? (t += 4, ++r) : t += 3;
      }
      return t;
    }, be = (e, t, r, n) => {
      if (!(0 < n))
        return 0;
      var o = r;
      n = r + n - 1;
      for (var u2 = 0; u2 < e.length; ++u2) {
        var a = e.charCodeAt(u2);
        if (55296 <= a && 57343 >= a) {
          var w = e.charCodeAt(++u2);
          a = 65536 + ((a & 1023) << 10) | w & 1023;
        }
        if (127 >= a) {
          if (r >= n)
            break;
          t[r++] = a;
        } else {
          if (2047 >= a) {
            if (r + 1 >= n)
              break;
            t[r++] = 192 | a >> 6;
          } else {
            if (65535 >= a) {
              if (r + 2 >= n)
                break;
              t[r++] = 224 | a >> 12;
            } else {
              if (r + 3 >= n)
                break;
              t[r++] = 240 | a >> 18, t[r++] = 128 | a >> 12 & 63;
            }
            t[r++] = 128 | a >> 6 & 63;
          }
          t[r++] = 128 | a & 63;
        }
      }
      return t[r] = 0, r - o;
    }, gt = [];
    function Et(e, t) {
      gt[e] = { input: [], Rb: [], bc: t }, Ze(e, yn);
    }
    var yn = { open(e) {
      var t = gt[e.node.ec];
      if (!t)
        throw new _(43);
      e.Sb = t, e.seekable = false;
    }, close(e) {
      e.Sb.bc.ic(e.Sb);
    }, ic(e) {
      e.Sb.bc.ic(e.Sb);
    }, read(e, t, r, n) {
      if (!e.Sb || !e.Sb.bc.xc)
        throw new _(60);
      for (var o = 0, u2 = 0; u2 < n; u2++) {
        try {
          var a = e.Sb.bc.xc(e.Sb);
        } catch {
          throw new _(29);
        }
        if (a === void 0 && o === 0)
          throw new _(6);
        if (a == null)
          break;
        o++, t[r + u2] = a;
      }
      return o && (e.node.timestamp = Date.now()), o;
    }, write(e, t, r, n) {
      if (!e.Sb || !e.Sb.bc.rc)
        throw new _(60);
      try {
        for (var o = 0; o < n; o++)
          e.Sb.bc.rc(e.Sb, t[r + o]);
      } catch {
        throw new _(29);
      }
      return n && (e.node.timestamp = Date.now()), o;
    } }, vn = { xc() {
      e: {
        if (!Ke.length) {
          var e = null;
          if (typeof window < "u" && typeof window.prompt == "function" ? (e = window.prompt("Input: "), e !== null && (e += `
`)) : typeof readline == "function" && (e = readline(), e !== null && (e += `
`)), !e) {
            var t = null;
            break e;
          }
          t = Array(_e7(e) + 1), e = be(e, t, 0, t.length), t.length = e, Ke = t;
        }
        t = Ke.shift();
      }
      return t;
    }, rc(e, t) {
      t === null || t === 10 ? (J2(R(e.Rb, 0)), e.Rb = []) : t != 0 && e.Rb.push(t);
    }, ic(e) {
      e.Rb && 0 < e.Rb.length && (J2(R(e.Rb, 0)), e.Rb = []);
    }, Yc() {
      return { Uc: 25856, Wc: 5, Tc: 191, Vc: 35387, Sc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
    }, Zc() {
      return 0;
    }, $c() {
      return [24, 80];
    } }, gn = { rc(e, t) {
      t === null || t === 10 ? (G2(R(e.Rb, 0)), e.Rb = []) : t != 0 && e.Rb.push(t);
    }, ic(e) {
      e.Rb && 0 < e.Rb.length && (G2(R(e.Rb, 0)), e.Rb = []);
    } };
    function xt(e, t) {
      var r = e.Nb ? e.Nb.length : 0;
      r >= t || (t = Math.max(t, r * (1048576 > r ? 2 : 1.125) >>> 0), r != 0 && (t = Math.max(t, 256)), r = e.Nb, e.Nb = new Uint8Array(t), 0 < e.Pb && e.Nb.set(r.subarray(0, e.Pb), 0));
    }
    var A = { Vb: null, Ub() {
      return A.createNode(null, "/", 16895, 0);
    }, createNode(e, t, r, n) {
      if ((r & 61440) === 24576 || (r & 61440) === 4096)
        throw new _(63);
      return A.Vb || (A.Vb = { dir: { node: { Tb: A.Cb.Tb, Qb: A.Cb.Qb, cc: A.Cb.cc, jc: A.Cb.jc, Bc: A.Cb.Bc, oc: A.Cb.oc, mc: A.Cb.mc, Ac: A.Cb.Ac, nc: A.Cb.nc }, stream: { Zb: A.Mb.Zb } }, file: { node: { Tb: A.Cb.Tb, Qb: A.Cb.Qb }, stream: { Zb: A.Mb.Zb, read: A.Mb.read, write: A.Mb.write, uc: A.Mb.uc, kc: A.Mb.kc, lc: A.Mb.lc } }, link: { node: { Tb: A.Cb.Tb, Qb: A.Cb.Qb, fc: A.Cb.fc }, stream: {} }, vc: { node: { Tb: A.Cb.Tb, Qb: A.Cb.Qb }, stream: An } }), r = Ct(e, t, r, n), Y2(r.mode) ? (r.Cb = A.Vb.dir.node, r.Mb = A.Vb.dir.stream, r.Nb = {}) : (r.mode & 61440) === 32768 ? (r.Cb = A.Vb.file.node, r.Mb = A.Vb.file.stream, r.Pb = 0, r.Nb = null) : (r.mode & 61440) === 40960 ? (r.Cb = A.Vb.link.node, r.Mb = A.Vb.link.stream) : (r.mode & 61440) === 8192 && (r.Cb = A.Vb.vc.node, r.Mb = A.Vb.vc.stream), r.timestamp = Date.now(), e && (e.Nb[t] = r, e.timestamp = r.timestamp), r;
    }, Xc(e) {
      return e.Nb ? e.Nb.subarray ? e.Nb.subarray(0, e.Pb) : new Uint8Array(e.Nb) : new Uint8Array(0);
    }, Cb: { Tb(e) {
      var t = {};
      return t.Hc = (e.mode & 61440) === 8192 ? e.id : 1, t.yc = e.id, t.mode = e.mode, t.Nc = 1, t.uid = 0, t.Kc = 0, t.ec = e.ec, Y2(e.mode) ? t.size = 4096 : (e.mode & 61440) === 32768 ? t.size = e.Pb : (e.mode & 61440) === 40960 ? t.size = e.link.length : t.size = 0, t.Dc = new Date(e.timestamp), t.Mc = new Date(e.timestamp), t.Gc = new Date(e.timestamp), t.Ec = 4096, t.Fc = Math.ceil(t.size / t.Ec), t;
    }, Qb(e, t) {
      if (t.mode !== void 0 && (e.mode = t.mode), t.timestamp !== void 0 && (e.timestamp = t.timestamp), t.size !== void 0 && (t = t.size, e.Pb != t))
        if (t == 0)
          e.Nb = null, e.Pb = 0;
        else {
          var r = e.Nb;
          e.Nb = new Uint8Array(t), r && e.Nb.set(r.subarray(0, Math.min(t, e.Pb))), e.Pb = t;
        }
    }, cc() {
      throw Xe[44];
    }, jc(e, t, r, n) {
      return A.createNode(e, t, r, n);
    }, Bc(e, t, r) {
      if (Y2(e.mode)) {
        try {
          var n = pe(t, r);
        } catch {
        }
        if (n)
          for (var o in n.Nb)
            throw new _(55);
      }
      delete e.parent.Nb[e.name], e.parent.timestamp = Date.now(), e.name = r, t.Nb[r] = e, t.timestamp = e.parent.timestamp, e.parent = t;
    }, oc(e, t) {
      delete e.Nb[t], e.timestamp = Date.now();
    }, mc(e, t) {
      var r = pe(e, t), n;
      for (n in r.Nb)
        throw new _(55);
      delete e.Nb[t], e.timestamp = Date.now();
    }, Ac(e) {
      var t = [".", ".."], r;
      for (r in e.Nb)
        e.Nb.hasOwnProperty(r) && t.push(r);
      return t;
    }, nc(e, t, r) {
      return e = A.createNode(e, t, 41471, 0), e.link = r, e;
    }, fc(e) {
      if ((e.mode & 61440) !== 40960)
        throw new _(28);
      return e.link;
    } }, Mb: { read(e, t, r, n, o) {
      var u2 = e.node.Nb;
      if (o >= e.node.Pb)
        return 0;
      if (e = Math.min(e.node.Pb - o, n), 8 < e && u2.subarray)
        t.set(u2.subarray(o, o + e), r);
      else
        for (n = 0; n < e; n++)
          t[r + n] = u2[o + n];
      return e;
    }, write(e, t, r, n, o, u2) {
      if (t.buffer === V.buffer && (u2 = false), !n)
        return 0;
      if (e = e.node, e.timestamp = Date.now(), t.subarray && (!e.Nb || e.Nb.subarray)) {
        if (u2)
          return e.Nb = t.subarray(r, r + n), e.Pb = n;
        if (e.Pb === 0 && o === 0)
          return e.Nb = t.slice(r, r + n), e.Pb = n;
        if (o + n <= e.Pb)
          return e.Nb.set(t.subarray(r, r + n), o), n;
      }
      if (xt(e, o + n), e.Nb.subarray && t.subarray)
        e.Nb.set(t.subarray(r, r + n), o);
      else
        for (u2 = 0; u2 < n; u2++)
          e.Nb[o + u2] = t[r + u2];
      return e.Pb = Math.max(e.Pb, o + n), n;
    }, Zb(e, t, r) {
      if (r === 1 ? t += e.position : r === 2 && (e.node.mode & 61440) === 32768 && (t += e.node.Pb), 0 > t)
        throw new _(28);
      return t;
    }, uc(e, t, r) {
      xt(e.node, t + r), e.node.Pb = Math.max(e.node.Pb, t + r);
    }, kc(e, t, r, n, o) {
      if ((e.node.mode & 61440) !== 32768)
        throw new _(43);
      if (e = e.node.Nb, o & 2 || e.buffer !== V.buffer) {
        if ((0 < r || r + t < e.length) && (e.subarray ? e = e.subarray(r, r + t) : e = Array.prototype.slice.call(e, r, r + t)), r = true, t = 65536 * Math.ceil(t / 65536), (o = Ur(65536, t)) ? (v2.fill(0, o, o + t), t = o) : t = 0, !t)
          throw new _(48);
        V.set(e, t);
      } else
        r = false, t = e.byteOffset;
      return { Oc: t, Cc: r };
    }, lc(e, t, r, n) {
      return A.Mb.write(e, t, 0, n, r, false), 0;
    } } }, En = (e, t) => {
      var r = 0;
      return e && (r |= 365), t && (r |= 146), r;
    }, We = null, St = {}, Se = [], xn = 1, ue = null, At = true, _ = null, Xe = {};
    function H(e, t = {}) {
      if (e = De(e), !e)
        return { path: "", node: null };
      if (t = Object.assign({ wc: true, sc: 0 }, t), 8 < t.sc)
        throw new _(32);
      e = e.split("/").filter((a) => !!a);
      for (var r = We, n = "/", o = 0; o < e.length; o++) {
        var u2 = o === e.length - 1;
        if (u2 && t.parent)
          break;
        if (r = pe(r, e[o]), n = ae(n + "/" + e[o]), r.$b && (!u2 || u2 && t.wc) && (r = r.$b.root), !u2 || t.Yb) {
          for (u2 = 0; (r.mode & 61440) === 40960; )
            if (r = kt(n), n = De(pn(n), r), r = H(n, { sc: t.sc + 1 }).node, 40 < u2++)
              throw new _(32);
        }
      }
      return { path: n, node: r };
    }
    function Oe(e) {
      for (var t; ; ) {
        if (e === e.parent)
          return e = e.Ub.zc, t ? e[e.length - 1] !== "/" ? `${e}/${t}` : e + t : e;
        t = t ? `${e.name}/${t}` : e.name, e = e.parent;
      }
    }
    function Ye(e, t) {
      for (var r = 0, n = 0; n < t.length; n++)
        r = (r << 5) - r + t.charCodeAt(n) | 0;
      return (e + r >>> 0) % ue.length;
    }
    function Rt(e) {
      var t = Ye(e.parent.id, e.name);
      if (ue[t] === e)
        ue[t] = e.ac;
      else
        for (t = ue[t]; t; ) {
          if (t.ac === e) {
            t.ac = e.ac;
            break;
          }
          t = t.ac;
        }
    }
    function pe(e, t) {
      var r;
      if (r = (r = ve(e, "x")) ? r : e.Cb.cc ? 0 : 2)
        throw new _(r, e);
      for (r = ue[Ye(e.id, t)]; r; r = r.ac) {
        var n = r.name;
        if (r.parent.id === e.id && n === t)
          return r;
      }
      return e.Cb.cc(e, t);
    }
    function Ct(e, t, r, n) {
      return e = new Tr(e, t, r, n), t = Ye(e.parent.id, e.name), e.ac = ue[t], ue[t] = e;
    }
    function Y2(e) {
      return (e & 61440) === 16384;
    }
    function qt(e) {
      var t = ["r", "w", "rw"][e & 3];
      return e & 512 && (t += "w"), t;
    }
    function ve(e, t) {
      if (At)
        return 0;
      if (!t.includes("r") || e.mode & 292) {
        if (t.includes("w") && !(e.mode & 146) || t.includes("x") && !(e.mode & 73))
          return 2;
      } else
        return 2;
      return 0;
    }
    function Mt(e, t) {
      try {
        return pe(e, t), 20;
      } catch {
      }
      return ve(e, "wx");
    }
    function It(e, t, r) {
      try {
        var n = pe(e, t);
      } catch (o) {
        return o.Ob;
      }
      if (e = ve(e, "wx"))
        return e;
      if (r) {
        if (!Y2(n.mode))
          return 54;
        if (n === n.parent || Oe(n) === "/")
          return 10;
      } else if (Y2(n.mode))
        return 31;
      return 0;
    }
    function Sn() {
      for (var e = 0; 4096 >= e; e++)
        if (!Se[e])
          return e;
      throw new _(33);
    }
    function B(e) {
      if (e = Se[e], !e)
        throw new _(8);
      return e;
    }
    function Nt(e, t = -1) {
      return Re || (Re = function() {
        this.hc = {};
      }, Re.prototype = {}, Object.defineProperties(Re.prototype, { object: { get() {
        return this.node;
      }, set(r) {
        this.node = r;
      } }, flags: { get() {
        return this.hc.flags;
      }, set(r) {
        this.hc.flags = r;
      } }, position: { get() {
        return this.hc.position;
      }, set(r) {
        this.hc.position = r;
      } } })), e = Object.assign(new Re(), e), t == -1 && (t = Sn()), e.Wb = t, Se[t] = e;
    }
    var An = { open(e) {
      e.Mb = St[e.node.ec].Mb, e.Mb.open && e.Mb.open(e);
    }, Zb() {
      throw new _(70);
    } };
    function Ze(e, t) {
      St[e] = { Mb: t };
    }
    function Dt(e, t) {
      var r = t === "/", n = !t;
      if (r && We)
        throw new _(10);
      if (!r && !n) {
        var o = H(t, { wc: false });
        if (t = o.path, o = o.node, o.$b)
          throw new _(10);
        if (!Y2(o.mode))
          throw new _(54);
      }
      t = { type: e, bd: {}, zc: t, Lc: [] }, e = e.Ub(t), e.Ub = t, t.root = e, r ? We = e : o && (o.$b = t, o.Ub && o.Ub.Lc.push(t));
    }
    function Je(e, t, r) {
      var n = H(e, { parent: true }).node;
      if (e = Ne(e), !e || e === "." || e === "..")
        throw new _(28);
      var o = Mt(n, e);
      if (o)
        throw new _(o);
      if (!n.Cb.jc)
        throw new _(63);
      return n.Cb.jc(n, e, t, r);
    }
    function re(e, t) {
      return Je(e, (t !== void 0 ? t : 511) & 1023 | 16384, 0);
    }
    function ke(e, t, r) {
      typeof r > "u" && (r = t, t = 438), Je(e, t | 8192, r);
    }
    function Ge(e, t) {
      if (!De(e))
        throw new _(44);
      var r = H(t, { parent: true }).node;
      if (!r)
        throw new _(44);
      t = Ne(t);
      var n = Mt(r, t);
      if (n)
        throw new _(n);
      if (!r.Cb.nc)
        throw new _(63);
      r.Cb.nc(r, t, e);
    }
    function Ot(e) {
      var t = H(e, { parent: true }).node;
      e = Ne(e);
      var r = pe(t, e), n = It(t, e, true);
      if (n)
        throw new _(n);
      if (!t.Cb.mc)
        throw new _(63);
      if (r.$b)
        throw new _(10);
      t.Cb.mc(t, e), Rt(r);
    }
    function kt(e) {
      if (e = H(e).node, !e)
        throw new _(44);
      if (!e.Cb.fc)
        throw new _(28);
      return De(Oe(e.parent), e.Cb.fc(e));
    }
    function Te(e, t) {
      if (e = H(e, { Yb: !t }).node, !e)
        throw new _(44);
      if (!e.Cb.Tb)
        throw new _(63);
      return e.Cb.Tb(e);
    }
    function Tt(e) {
      return Te(e, true);
    }
    function Pt(e, t) {
      if (e = typeof e == "string" ? H(e, { Yb: true }).node : e, !e.Cb.Qb)
        throw new _(63);
      e.Cb.Qb(e, { mode: t & 4095 | e.mode & -4096, timestamp: Date.now() });
    }
    function Lt(e, t) {
      if (0 > t)
        throw new _(28);
      if (e = typeof e == "string" ? H(e, { Yb: true }).node : e, !e.Cb.Qb)
        throw new _(63);
      if (Y2(e.mode))
        throw new _(31);
      if ((e.mode & 61440) !== 32768)
        throw new _(28);
      var r = ve(e, "w");
      if (r)
        throw new _(r);
      e.Cb.Qb(e, { size: t, timestamp: Date.now() });
    }
    function Pe(e, t, r) {
      if (e === "")
        throw new _(44);
      if (typeof t == "string") {
        var n = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[t];
        if (typeof n > "u")
          throw Error(`Unknown file open mode: ${t}`);
        t = n;
      }
      if (r = t & 64 ? (typeof r > "u" ? 438 : r) & 4095 | 32768 : 0, typeof e == "object")
        var o = e;
      else {
        e = ae(e);
        try {
          o = H(e, { Yb: !(t & 131072) }).node;
        } catch {
        }
      }
      if (n = false, t & 64)
        if (o) {
          if (t & 128)
            throw new _(20);
        } else
          o = Je(e, r, 0), n = true;
      if (!o)
        throw new _(44);
      if ((o.mode & 61440) === 8192 && (t &= -513), t & 65536 && !Y2(o.mode))
        throw new _(54);
      if (!n && (r = o ? (o.mode & 61440) === 40960 ? 32 : Y2(o.mode) && (qt(t) !== "r" || t & 512) ? 31 : ve(o, qt(t)) : 44))
        throw new _(r);
      return t & 512 && !n && Lt(o, 0), t &= -131713, o = Nt({ node: o, path: Oe(o), flags: t, seekable: true, position: 0, Mb: o.Mb, Rc: [], error: false }), o.Mb.open && o.Mb.open(o), !i.logReadFiles || t & 1 || (Le || (Le = {}), e in Le || (Le[e] = 1)), o;
    }
    function $t(e, t, r) {
      if (e.Wb === null)
        throw new _(8);
      if (!e.seekable || !e.Mb.Zb)
        throw new _(70);
      if (r != 0 && r != 1 && r != 2)
        throw new _(28);
      e.position = e.Mb.Zb(e, t, r), e.Rc = [];
    }
    function Ut() {
      _ || (_ = function(e, t) {
        this.name = "ErrnoError", this.node = t, this.Pc = function(r) {
          this.Ob = r;
        }, this.Pc(e), this.message = "FS error";
      }, _.prototype = Error(), _.prototype.constructor = _, [44].forEach((e) => {
        Xe[e] = new _(e), Xe[e].stack = "<generic error, no stack>";
      }));
    }
    var Vt;
    function Ae(e, t, r) {
      e = ae("/dev/" + e);
      var n = En(!!t, !!r);
      et || (et = 64);
      var o = et++ << 8 | 0;
      Ze(o, { open(u2) {
        u2.seekable = false;
      }, close() {
        r && r.buffer && r.buffer.length && r(10);
      }, read(u2, a, w, c) {
        for (var l = 0, p = 0; p < c; p++) {
          try {
            var h = t();
          } catch {
            throw new _(29);
          }
          if (h === void 0 && l === 0)
            throw new _(6);
          if (h == null)
            break;
          l++, a[w + p] = h;
        }
        return l && (u2.node.timestamp = Date.now()), l;
      }, write(u2, a, w, c) {
        for (var l = 0; l < c; l++)
          try {
            r(a[w + l]);
          } catch {
            throw new _(29);
          }
        return c && (u2.node.timestamp = Date.now()), l;
      } }), ke(e, n, o);
    }
    var et, I = {}, Re, Le;
    function me(e, t, r) {
      if (t.charAt(0) === "/")
        return t;
      if (e = e === -100 ? "/" : B(e).path, t.length == 0) {
        if (!r)
          throw new _(44);
        return e;
      }
      return ae(e + "/" + t);
    }
    function $e(e, t, r) {
      try {
        var n = e(t);
      } catch (u2) {
        if (u2 && u2.node && ae(t) !== ae(Oe(u2.node)))
          return -54;
        throw u2;
      }
      E[r >> 2] = n.Hc, E[r + 4 >> 2] = n.mode, M[r + 8 >> 2] = n.Nc, E[r + 12 >> 2] = n.uid, E[r + 16 >> 2] = n.Kc, E[r + 20 >> 2] = n.ec, N = [n.size >>> 0, (g = n.size, 1 <= +Math.abs(g) ? 0 < g ? +Math.floor(g / 4294967296) >>> 0 : ~~+Math.ceil((g - +(~~g >>> 0)) / 4294967296) >>> 0 : 0)], E[r + 24 >> 2] = N[0], E[r + 28 >> 2] = N[1], E[r + 32 >> 2] = 4096, E[r + 36 >> 2] = n.Fc, e = n.Dc.getTime(), t = n.Mc.getTime();
      var o = n.Gc.getTime();
      return N = [Math.floor(e / 1e3) >>> 0, (g = Math.floor(e / 1e3), 1 <= +Math.abs(g) ? 0 < g ? +Math.floor(g / 4294967296) >>> 0 : ~~+Math.ceil((g - +(~~g >>> 0)) / 4294967296) >>> 0 : 0)], E[r + 40 >> 2] = N[0], E[r + 44 >> 2] = N[1], M[r + 48 >> 2] = e % 1e3 * 1e3, N = [Math.floor(t / 1e3) >>> 0, (g = Math.floor(t / 1e3), 1 <= +Math.abs(g) ? 0 < g ? +Math.floor(g / 4294967296) >>> 0 : ~~+Math.ceil((g - +(~~g >>> 0)) / 4294967296) >>> 0 : 0)], E[r + 56 >> 2] = N[0], E[r + 60 >> 2] = N[1], M[r + 64 >> 2] = t % 1e3 * 1e3, N = [Math.floor(o / 1e3) >>> 0, (g = Math.floor(o / 1e3), 1 <= +Math.abs(g) ? 0 < g ? +Math.floor(g / 4294967296) >>> 0 : ~~+Math.ceil((g - +(~~g >>> 0)) / 4294967296) >>> 0 : 0)], E[r + 72 >> 2] = N[0], E[r + 76 >> 2] = N[1], M[r + 80 >> 2] = o % 1e3 * 1e3, N = [n.yc >>> 0, (g = n.yc, 1 <= +Math.abs(g) ? 0 < g ? +Math.floor(g / 4294967296) >>> 0 : ~~+Math.ceil((g - +(~~g >>> 0)) / 4294967296) >>> 0 : 0)], E[r + 88 >> 2] = N[0], E[r + 92 >> 2] = N[1], 0;
    }
    var Ue = void 0;
    function Ve() {
      var e = E[+Ue >> 2];
      return Ue += 4, e;
    }
    var Ce = (e, t) => t + 2097152 >>> 0 < 4194305 - !!e ? (e >>> 0) + 4294967296 * t : NaN, Rn = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Cn = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], zt = (e) => {
      var t = _e7(e) + 1, r = ot(t);
      return r && be(e, v2, r, t), r;
    }, tt = {}, Ft = () => {
      if (!rt) {
        var e = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: C || "./this.program" }, t;
        for (t in tt)
          tt[t] === void 0 ? delete e[t] : e[t] = tt[t];
        var r = [];
        for (t in e)
          r.push(`${t}=${e[t]}`);
        rt = r;
      }
      return rt;
    }, rt;
    function Bt() {
    }
    function Qt() {
    }
    function Ht() {
    }
    function jt() {
    }
    function Kt() {
    }
    function Wt() {
    }
    function Xt() {
    }
    function Yt() {
    }
    function Zt() {
    }
    function Jt() {
    }
    function Gt() {
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
    function ar() {
    }
    function ur() {
    }
    function cr() {
    }
    function lr() {
    }
    function fr() {
    }
    function hr() {
    }
    function dr() {
    }
    function wr() {
    }
    function _r4() {
    }
    function br() {
    }
    function pr() {
    }
    function mr() {
    }
    function yr() {
    }
    function vr() {
    }
    function gr() {
    }
    function Er() {
    }
    function xr() {
    }
    function Sr() {
    }
    function Ar() {
    }
    function Rr() {
    }
    function Cr() {
    }
    var ze = 0, qr = (e) => {
      ee = e, pt || 0 < ze || (i.onExit && i.onExit(e), W2 = true), k(e, new bt(e));
    }, nt = (e) => {
      e instanceof bt || e == "unwind" || k(1, e);
    }, Fe = (e) => {
      try {
        e();
      } catch (t) {
        X2(t);
      }
    };
    function qn() {
      var e = m, t = {}, r;
      for (r in e)
        (function(n) {
          var o = e[n];
          t[n] = typeof o == "function" ? function() {
            Be.push(n);
            try {
              return o.apply(null, arguments);
            } finally {
              W2 || (Be.pop() === n || X2(), ne && ce === 1 && Be.length === 0 && (ce = 0, Fe(Qr), typeof Fibers < "u" && Fibers.cd()));
            }
          } : o;
        })(r);
      return t;
    }
    var ce = 0, ne = null, Mr = 0, Be = [], Ir = {}, Nr = {}, Mn = 0, it = null, In = [];
    function Nn() {
      return new Promise((e, t) => {
        it = { resolve: e, reject: t };
      });
    }
    function Dn() {
      var e = ot(16396), t = e + 12;
      M[e >> 2] = t, M[e + 4 >> 2] = t + 16384, t = Be[0];
      var r = Ir[t];
      return r === void 0 && (r = Mn++, Ir[t] = r, Nr[r] = t), E[e + 8 >> 2] = r, e;
    }
    function Dr(e) {
      if (!W2) {
        if (ce === 0) {
          var t = false, r = false;
          e((n = 0) => {
            if (!W2 && (Mr = n, t = true, r)) {
              ce = 2, Fe(() => Hr(ne)), typeof Browser < "u" && Browser.qc.Jc && Browser.qc.resume(), n = false;
              try {
                var o = (0, m[Nr[E[ne + 8 >> 2]]])();
              } catch (w) {
                o = w, n = true;
              }
              var u2 = false;
              if (!ne) {
                var a = it;
                a && (it = null, (n ? a.reject : a.resolve)(o), u2 = true);
              }
              if (n && !u2)
                throw o;
            }
          }), r = true, t || (ce = 1, ne = Dn(), typeof Browser < "u" && Browser.qc.Jc && Browser.qc.pause(), Fe(() => Br(ne)));
        } else
          ce === 2 ? (ce = 0, Fe(jr), Lr(ne), ne = null, In.forEach((n) => {
            if (!W2)
              try {
                if (n(), !(pt || 0 < ze))
                  try {
                    ee = n = ee, qr(n);
                  } catch (o) {
                    nt(o);
                  }
              } catch (o) {
                nt(o);
              }
          })) : X2(`invalid state: ${ce}`);
        return Mr;
      }
    }
    function Or(e) {
      return Dr((t) => {
        e().then(t);
      });
    }
    var kr = {}, ie = (e, t, r, n, o) => {
      function u2(h) {
        return --ze, c !== 0 && Fr(c), t === "string" ? h ? R(v2, h) : "" : t === "boolean" ? !!h : h;
      }
      var a = { string: (h) => {
        var b = 0;
        if (h != null && h !== 0) {
          b = _e7(h) + 1;
          var S = st(b);
          be(h, v2, S, b), b = S;
        }
        return b;
      }, array: (h) => {
        var b = st(h.length);
        return V.set(h, b), b;
      } };
      e = i["_" + e];
      var w = [], c = 0;
      if (n)
        for (var l = 0; l < n.length; l++) {
          var p = a[r[l]];
          p ? (c === 0 && (c = zr()), w[l] = p(n[l])) : w[l] = n[l];
        }
      return r = ne, n = e.apply(null, w), o = o && o.async, ze += 1, ne != r ? Nn().then(u2) : (n = u2(n), o ? Promise.resolve(n) : n);
    };
    function Tr(e, t, r, n) {
      e || (e = this), this.parent = e, this.Ub = e.Ub, this.$b = null, this.id = xn++, this.name = t, this.mode = r, this.Cb = {}, this.Mb = {}, this.ec = n;
    }
    Object.defineProperties(Tr.prototype, { read: { get: function() {
      return (this.mode & 365) === 365;
    }, set: function(e) {
      e ? this.mode |= 365 : this.mode &= -366;
    } }, write: { get: function() {
      return (this.mode & 146) === 146;
    }, set: function(e) {
      e ? this.mode |= 146 : this.mode &= -147;
    } } }), Ut(), ue = Array(4096), Dt(A, "/"), re("/tmp"), re("/home"), re("/home/web_user"), function() {
      re("/dev"), Ze(259, { read: () => 0, write: (n, o, u2, a) => a }), ke("/dev/null", 259), Et(1280, vn), Et(1536, gn), ke("/dev/tty", 1280), ke("/dev/tty1", 1536);
      var e = new Uint8Array(1024), t = 0, r = () => (t === 0 && (t = vt(e).byteLength), e[--t]);
      Ae("random", r), Ae("urandom", r), re("/dev/shm"), re("/dev/shm/tmp");
    }(), function() {
      re("/proc");
      var e = re("/proc/self");
      re("/proc/self/fd"), Dt({ Ub() {
        var t = Ct(e, "fd", 16895, 73);
        return t.Cb = { cc(r, n) {
          var o = B(+n);
          return r = { parent: null, Ub: { zc: "fake" }, Cb: { fc: () => o.path } }, r.parent = r;
        } }, t;
      } }, "/proc/self/fd");
    }(), function() {
      let e = /* @__PURE__ */ new Map();
      i.setAuthorizer = function(t, r, n) {
        return r ? e.set(t, { f: r, tc: n }) : e.delete(t), ie("set_authorizer", "number", ["number"], [t]);
      }, Bt = function(t, r, n, o, u2, a) {
        if (e.has(t)) {
          let { f: w, tc: c } = e.get(t);
          return w(c, r, n ? n ? R(v2, n) : "" : null, o ? o ? R(v2, o) : "" : null, u2 ? u2 ? R(v2, u2) : "" : null, a ? a ? R(v2, a) : "" : null);
        }
        return 0;
      };
    }(), function() {
      let e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
      i.createFunction = function(r, n, o, u2, a, w) {
        let c = e.size;
        return e.set(c, { f: w, Xb: a }), ie("create_function", "number", "number string number number number number".split(" "), [r, n, o, u2, c, 0]);
      }, i.createAggregate = function(r, n, o, u2, a, w, c) {
        let l = e.size;
        return e.set(l, { step: w, Ic: c, Xb: a }), ie("create_function", "number", "number string number number number number".split(" "), [r, n, o, u2, l, 1]);
      }, i.getFunctionUserData = function(r) {
        return t.get(r);
      }, Ht = function(r, n, o, u2) {
        r = e.get(r), t.set(n, r.Xb), r.f(n, new Uint32Array(v2.buffer, u2, o)), t.delete(n);
      }, Kt = function(r, n, o, u2) {
        r = e.get(r), t.set(n, r.Xb), r.step(n, new Uint32Array(v2.buffer, u2, o)), t.delete(n);
      }, Qt = function(r, n) {
        r = e.get(r), t.set(n, r.Xb), r.Ic(n), t.delete(n);
      };
    }(), function() {
      let e = /* @__PURE__ */ new Map();
      i.progressHandler = function(t, r, n, o) {
        return n ? e.set(t, { f: n, tc: o }) : e.delete(t), ie("progress_handler", null, ["number", "number"], [t, r]);
      }, jt = function(t) {
        if (e.has(t)) {
          let { f: r, tc: n } = e.get(t);
          return r(n);
        }
        return 0;
      };
    }(), function() {
      function e(c, l) {
        let p = `get${c}`, h = `set${c}`;
        return new Proxy(new DataView(v2.buffer, l, c === "Int32" ? 4 : 8), { get(b, S) {
          if (S === p)
            return function(q, $) {
              if (!$)
                throw Error("must be little endian");
              return b[S](q, $);
            };
          if (S === h)
            return function(q, $, T) {
              if (!T)
                throw Error("must be little endian");
              return b[S](q, $, T);
            };
          if (typeof S == "string" && S.match(/^(get)|(set)/))
            throw Error("invalid type");
          return b[S];
        } });
      }
      let t = typeof kr == "object", r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), u2 = t ? /* @__PURE__ */ new Set() : null, a = t ? /* @__PURE__ */ new Set() : null, w = /* @__PURE__ */ new Map();
      lr = function(c, l, p, h) {
        w.set(c ? R(v2, c) : "", { size: l, dc: Array.from(new Uint32Array(v2.buffer, h, p)) });
      }, i.createModule = function(c, l, p, h) {
        t && (p.handleAsync = Or);
        let b = r.size;
        return r.set(b, { module: p, Xb: h }), h = 0, p.xCreate && (h |= 1), p.xConnect && (h |= 2), p.xBestIndex && (h |= 4), p.xDisconnect && (h |= 8), p.xDestroy && (h |= 16), p.xOpen && (h |= 32), p.xClose && (h |= 64), p.xFilter && (h |= 128), p.xNext && (h |= 256), p.xEof && (h |= 512), p.xColumn && (h |= 1024), p.xRowid && (h |= 2048), p.xUpdate && (h |= 4096), p.xBegin && (h |= 8192), p.xSync && (h |= 16384), p.xCommit && (h |= 32768), p.xRollback && (h |= 65536), p.xFindFunction && (h |= 131072), p.xRename && (h |= 262144), ie("create_module", "number", ["number", "string", "number", "number"], [c, l, b, h]);
      }, er = function(c, l, p, h, b, S) {
        if (l = r.get(l), n.set(b, l), t) {
          u2.delete(b);
          for (let q of u2)
            n.delete(q);
        }
        return h = Array.from(new Uint32Array(v2.buffer, h, p)).map((q) => q ? R(v2, q) : ""), l.module.xCreate(c, l.Xb, h, b, e("Int32", S));
      }, Gt = function(c, l, p, h, b, S) {
        if (l = r.get(l), n.set(b, l), t) {
          u2.delete(b);
          for (let q of u2)
            n.delete(q);
        }
        return h = Array.from(new Uint32Array(v2.buffer, h, p)).map((q) => q ? R(v2, q) : ""), l.module.xConnect(c, l.Xb, h, b, e("Int32", S));
      }, Xt = function(c, l) {
        var p = n.get(c), h = w.get("sqlite3_index_info").dc;
        let b = {};
        b.nConstraint = L(l + h[0], "i32"), b.aConstraint = [];
        for (var S = L(l + h[1], "*"), q = w.get("sqlite3_index_constraint").size, $ = 0; $ < b.nConstraint; ++$) {
          var T = b.aConstraint, j2 = T.push, U = S + $ * q, ge = w.get("sqlite3_index_constraint").dc, le = {};
          le.iColumn = L(U + ge[0], "i32"), le.op = L(U + ge[1], "i8"), le.usable = !!L(U + ge[2], "i8"), j2.call(T, le);
        }
        for (b.nOrderBy = L(l + h[2], "i32"), b.aOrderBy = [], S = L(l + h[3], "*"), q = w.get("sqlite3_index_orderby").size, $ = 0; $ < b.nOrderBy; ++$)
          T = b.aOrderBy, j2 = T.push, U = S + $ * q, ge = w.get("sqlite3_index_orderby").dc, le = {}, le.iColumn = L(U + ge[0], "i32"), le.desc = !!L(U + ge[1], "i8"), j2.call(T, le);
        for (b.aConstraintUsage = [], S = 0; S < b.nConstraint; ++S)
          b.aConstraintUsage.push({ argvIndex: 0, omit: false });
        for (b.idxNum = L(l + h[5], "i32"), b.idxStr = null, b.orderByConsumed = !!L(l + h[8], "i8"), b.estimatedCost = L(l + h[9], "double"), b.estimatedRows = L(l + h[10], "i32"), b.idxFlags = L(l + h[11], "i32"), b.colUsed = L(l + h[12], "i32"), c = p.module.xBestIndex(c, b), p = w.get("sqlite3_index_info").dc, h = L(l + p[4], "*"), S = w.get("sqlite3_index_constraint_usage").size, j2 = 0; j2 < b.nConstraint; ++j2)
          q = h + j2 * S, T = b.aConstraintUsage[j2], U = w.get("sqlite3_index_constraint_usage").dc, te(q + U[0], T.argvIndex, "i32"), te(q + U[1], T.omit ? 1 : 0, "i8");
        return te(l + p[5], b.idxNum, "i32"), typeof b.idxStr == "string" && (h = _e7(b.idxStr), S = ie("sqlite3_malloc", "number", ["number"], [h + 1]), be(b.idxStr, v2, S, h + 1), te(l + p[6], S, "*"), te(l + p[7], 1, "i32")), te(l + p[8], b.orderByConsumed, "i32"), te(l + p[9], b.estimatedCost, "double"), te(l + p[10], b.estimatedRows, "i32"), te(l + p[11], b.idxFlags, "i32"), c;
      }, rr = function(c) {
        let l = n.get(c);
        return t ? u2.add(c) : n.delete(c), l.module.xDisconnect(c);
      }, tr = function(c) {
        let l = n.get(c);
        return t ? u2.add(c) : n.delete(c), l.module.xDestroy(c);
      }, sr = function(c, l) {
        let p = n.get(c);
        if (o.set(l, p), t) {
          a.delete(l);
          for (let h of a)
            o.delete(h);
        }
        return p.module.xOpen(c, l);
      }, Yt = function(c) {
        let l = o.get(c);
        return t ? a.add(c) : o.delete(c), l.module.xClose(c);
      }, nr = function(c) {
        return o.get(c).module.xEof(c) ? 1 : 0;
      }, ir = function(c, l, p, h, b) {
        let S = o.get(c);
        return p = p ? p ? R(v2, p) : "" : null, b = new Uint32Array(v2.buffer, b, h), S.module.xFilter(c, l, p, b);
      }, or = function(c) {
        return o.get(c).module.xNext(c);
      }, Zt = function(c, l, p) {
        return o.get(c).module.xColumn(c, l, p);
      }, cr = function(c, l) {
        return o.get(c).module.xRowid(c, e("BigInt64", l));
      }, hr = function(c, l, p, h) {
        let b = n.get(c);
        return p = new Uint32Array(v2.buffer, p, l), b.module.xUpdate(c, p, e("BigInt64", h));
      }, Wt = function(c) {
        return n.get(c).module.xBegin(c);
      }, fr = function(c) {
        return n.get(c).module.xSync(c);
      }, Jt = function(c) {
        return n.get(c).module.xCommit(c);
      }, ur = function(c) {
        return n.get(c).module.xRollback(c);
      }, ar = function(c, l) {
        let p = n.get(c);
        return l = l ? R(v2, l) : "", p.module.xRename(c, l);
      };
    }(), function() {
      function e(a, w) {
        let c = `get${a}`, l = `set${a}`;
        return new Proxy(new DataView(v2.buffer, w, a === "Int32" ? 4 : 8), { get(p, h) {
          if (h === c)
            return function(b, S) {
              if (!S)
                throw Error("must be little endian");
              return p[h](b, S);
            };
          if (h === l)
            return function(b, S, q) {
              if (!q)
                throw Error("must be little endian");
              return p[h](b, S, q);
            };
          if (typeof h == "string" && h.match(/^(get)|(set)/))
            throw Error("invalid type");
          return p[h];
        } });
      }
      function t(a) {
        return a >>= 2, M[a] + M[a + 1] * 2 ** 32;
      }
      let r = typeof kr == "object", n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
      i.registerVFS = function(a, w) {
        if (ie("sqlite3_vfs_find", "number", ["string"], [a.name]))
          throw Error(`VFS '${a.name}' already registered`);
        r && (a.handleAsync = Or);
        var c = a.ad ?? 64;
        let l = i._malloc(4);
        return w = ie("register_vfs", "number", ["string", "number", "number", "number"], [a.name, c, w ? 1 : 0, l]), w || (c = L(l, "*"), n.set(c, a)), i._free(l), w;
      };
      let u2 = r ? /* @__PURE__ */ new Set() : null;
      _r4 = function(a) {
        let w = o.get(a);
        return r ? u2.add(a) : o.delete(a), w.xClose(a);
      }, Er = function(a, w, c, l) {
        return o.get(a).xRead(a, v2.subarray(w, w + c), t(l));
      }, Cr = function(a, w, c, l) {
        return o.get(a).xWrite(a, v2.subarray(w, w + c), t(l));
      }, Ar = function(a, w) {
        return o.get(a).xTruncate(a, t(w));
      }, Sr = function(a, w) {
        return o.get(a).xSync(a, w);
      }, yr = function(a, w) {
        let c = o.get(a);
        return w = e("BigInt64", w), c.xFileSize(a, w);
      }, vr = function(a, w) {
        return o.get(a).xLock(a, w);
      }, Rr = function(a, w) {
        return o.get(a).xUnlock(a, w);
      }, wr = function(a, w) {
        let c = o.get(a);
        return w = e("Int32", w), c.xCheckReservedLock(a, w);
      }, mr = function(a, w, c) {
        let l = o.get(a);
        return c = new DataView(v2.buffer, c), l.xFileControl(a, w, c);
      }, xr = function(a) {
        return o.get(a).xSectorSize(a);
      }, pr = function(a) {
        return o.get(a).xDeviceCharacteristics(a);
      }, gr = function(a, w, c, l, p) {
        if (a = n.get(a), o.set(c, a), r) {
          u2.delete(c);
          for (var h of u2)
            o.delete(h);
        }
        if (h = null, l & 64) {
          h = 1;
          let b = [];
          for (; h; ) {
            let S = v2[w++];
            if (S)
              b.push(S);
            else
              switch (v2[w] || (h = null), h) {
                case 1:
                  b.push(63), h = 2;
                  break;
                case 2:
                  b.push(61), h = 3;
                  break;
                case 3:
                  b.push(38), h = 2;
              }
          }
          h = new TextDecoder().decode(new Uint8Array(b));
        } else
          w && (h = w ? R(v2, w) : "");
        return p = e("Int32", p), a.xOpen(h, c, l, p);
      }, br = function(a, w, c) {
        return n.get(a).xDelete(w ? R(v2, w) : "", c);
      }, dr = function(a, w, c, l) {
        return a = n.get(a), l = e("Int32", l), a.xAccess(w ? R(v2, w) : "", c, l);
      };
    }();
    var On = { a: (e, t, r, n) => {
      X2(`Assertion failed: ${e ? R(v2, e) : ""}, at: ` + [t ? t ? R(v2, t) : "" : "unknown filename", r, n ? n ? R(v2, n) : "" : "unknown function"]);
    }, K: function(e, t) {
      try {
        return e = e ? R(v2, e) : "", Pt(e, t), 0;
      } catch (r) {
        if (typeof I > "u" || r.name !== "ErrnoError")
          throw r;
        return -r.Ob;
      }
    }, M: function(e, t, r) {
      try {
        if (t = t ? R(v2, t) : "", t = me(e, t), r & -8)
          return -28;
        var n = H(t, { Yb: true }).node;
        return n ? (e = "", r & 4 && (e += "r"), r & 2 && (e += "w"), r & 1 && (e += "x"), e && ve(n, e) ? -2 : 0) : -44;
      } catch (o) {
        if (typeof I > "u" || o.name !== "ErrnoError")
          throw o;
        return -o.Ob;
      }
    }, L: function(e, t) {
      try {
        var r = B(e);
        return Pt(r.node, t), 0;
      } catch (n) {
        if (typeof I > "u" || n.name !== "ErrnoError")
          throw n;
        return -n.Ob;
      }
    }, J: function(e) {
      try {
        var t = B(e).node, r = typeof t == "string" ? H(t, { Yb: true }).node : t;
        if (!r.Cb.Qb)
          throw new _(63);
        return r.Cb.Qb(r, { timestamp: Date.now() }), 0;
      } catch (n) {
        if (typeof I > "u" || n.name !== "ErrnoError")
          throw n;
        return -n.Ob;
      }
    }, b: function(e, t, r) {
      Ue = r;
      try {
        var n = B(e);
        switch (t) {
          case 0:
            var o = Ve();
            if (0 > o)
              return -28;
            for (; Se[o]; )
              o++;
            return Nt(n, o).Wb;
          case 1:
          case 2:
            return 0;
          case 3:
            return n.flags;
          case 4:
            return o = Ve(), n.flags |= o, 0;
          case 5:
            return o = Ve(), Ee[o + 0 >> 1] = 2, 0;
          case 6:
          case 7:
            return 0;
          case 16:
          case 8:
            return -28;
          case 9:
            return E[Pr() >> 2] = 28, -1;
          default:
            return -28;
        }
      } catch (u2) {
        if (typeof I > "u" || u2.name !== "ErrnoError")
          throw u2;
        return -u2.Ob;
      }
    }, I: function(e, t) {
      try {
        var r = B(e);
        return $e(Te, r.path, t);
      } catch (n) {
        if (typeof I > "u" || n.name !== "ErrnoError")
          throw n;
        return -n.Ob;
      }
    }, n: function(e, t, r) {
      t = Ce(t, r);
      try {
        if (isNaN(t))
          return 61;
        var n = B(e);
        if (!(n.flags & 2097155))
          throw new _(28);
        return Lt(n.node, t), 0;
      } catch (o) {
        if (typeof I > "u" || o.name !== "ErrnoError")
          throw o;
        return -o.Ob;
      }
    }, C: function(e, t) {
      try {
        if (t === 0)
          return -28;
        var r = _e7("/") + 1;
        return t < r ? -68 : (be("/", v2, e, t), r);
      } catch (n) {
        if (typeof I > "u" || n.name !== "ErrnoError")
          throw n;
        return -n.Ob;
      }
    }, F: function(e, t) {
      try {
        return e = e ? R(v2, e) : "", $e(Tt, e, t);
      } catch (r) {
        if (typeof I > "u" || r.name !== "ErrnoError")
          throw r;
        return -r.Ob;
      }
    }, z: function(e, t, r) {
      try {
        return t = t ? R(v2, t) : "", t = me(e, t), t = ae(t), t[t.length - 1] === "/" && (t = t.substr(0, t.length - 1)), re(t, r), 0;
      } catch (n) {
        if (typeof I > "u" || n.name !== "ErrnoError")
          throw n;
        return -n.Ob;
      }
    }, E: function(e, t, r, n) {
      try {
        t = t ? R(v2, t) : "";
        var o = n & 256;
        return t = me(e, t, n & 4096), $e(o ? Tt : Te, t, r);
      } catch (u2) {
        if (typeof I > "u" || u2.name !== "ErrnoError")
          throw u2;
        return -u2.Ob;
      }
    }, y: function(e, t, r, n) {
      Ue = n;
      try {
        t = t ? R(v2, t) : "", t = me(e, t);
        var o = n ? Ve() : 0;
        return Pe(t, r, o).Wb;
      } catch (u2) {
        if (typeof I > "u" || u2.name !== "ErrnoError")
          throw u2;
        return -u2.Ob;
      }
    }, w: function(e, t, r, n) {
      try {
        if (t = t ? R(v2, t) : "", t = me(e, t), 0 >= n)
          return -28;
        var o = kt(t), u2 = Math.min(n, _e7(o)), a = V[r + u2];
        return be(o, v2, r, n + 1), V[r + u2] = a, u2;
      } catch (w) {
        if (typeof I > "u" || w.name !== "ErrnoError")
          throw w;
        return -w.Ob;
      }
    }, u: function(e) {
      try {
        return e = e ? R(v2, e) : "", Ot(e), 0;
      } catch (t) {
        if (typeof I > "u" || t.name !== "ErrnoError")
          throw t;
        return -t.Ob;
      }
    }, H: function(e, t) {
      try {
        return e = e ? R(v2, e) : "", $e(Te, e, t);
      } catch (r) {
        if (typeof I > "u" || r.name !== "ErrnoError")
          throw r;
        return -r.Ob;
      }
    }, r: function(e, t, r) {
      try {
        if (t = t ? R(v2, t) : "", t = me(e, t), r === 0) {
          e = t;
          var n = H(e, { parent: true }).node;
          if (!n)
            throw new _(44);
          var o = Ne(e), u2 = pe(n, o), a = It(n, o, false);
          if (a)
            throw new _(a);
          if (!n.Cb.oc)
            throw new _(63);
          if (u2.$b)
            throw new _(10);
          n.Cb.oc(n, o), Rt(u2);
        } else
          r === 512 ? Ot(t) : X2("Invalid flags passed to unlinkat");
        return 0;
      } catch (w) {
        if (typeof I > "u" || w.name !== "ErrnoError")
          throw w;
        return -w.Ob;
      }
    }, q: function(e, t, r) {
      try {
        if (t = t ? R(v2, t) : "", t = me(e, t, true), r) {
          var n = M[r >> 2] + 4294967296 * E[r + 4 >> 2], o = E[r + 8 >> 2];
          u2 = 1e3 * n + o / 1e6, r += 16, n = M[r >> 2] + 4294967296 * E[r + 4 >> 2], o = E[r + 8 >> 2], a = 1e3 * n + o / 1e6;
        } else
          var u2 = Date.now(), a = u2;
        e = u2;
        var w = H(t, { Yb: true }).node;
        return w.Cb.Qb(w, { timestamp: Math.max(e, a) }), 0;
      } catch (c) {
        if (typeof I > "u" || c.name !== "ErrnoError")
          throw c;
        return -c.Ob;
      }
    }, l: function(e, t, r) {
      e = new Date(1e3 * Ce(e, t)), E[r >> 2] = e.getSeconds(), E[r + 4 >> 2] = e.getMinutes(), E[r + 8 >> 2] = e.getHours(), E[r + 12 >> 2] = e.getDate(), E[r + 16 >> 2] = e.getMonth(), E[r + 20 >> 2] = e.getFullYear() - 1900, E[r + 24 >> 2] = e.getDay(), t = e.getFullYear(), E[r + 28 >> 2] = (t % 4 !== 0 || t % 100 === 0 && t % 400 !== 0 ? Cn : Rn)[e.getMonth()] + e.getDate() - 1 | 0, E[r + 36 >> 2] = -(60 * e.getTimezoneOffset()), t = new Date(e.getFullYear(), 6, 1).getTimezoneOffset();
      var n = new Date(e.getFullYear(), 0, 1).getTimezoneOffset();
      E[r + 32 >> 2] = (t != n && e.getTimezoneOffset() == Math.min(n, t)) | 0;
    }, i: function(e, t, r, n, o, u2, a, w) {
      o = Ce(o, u2);
      try {
        if (isNaN(o))
          return 61;
        var c = B(n);
        if (t & 2 && !(r & 2) && (c.flags & 2097155) !== 2)
          throw new _(2);
        if ((c.flags & 2097155) === 1)
          throw new _(2);
        if (!c.Mb.kc)
          throw new _(43);
        var l = c.Mb.kc(c, e, o, t, r), p = l.Oc;
        return E[a >> 2] = l.Cc, M[w >> 2] = p, 0;
      } catch (h) {
        if (typeof I > "u" || h.name !== "ErrnoError")
          throw h;
        return -h.Ob;
      }
    }, j: function(e, t, r, n, o, u2, a) {
      u2 = Ce(u2, a);
      try {
        if (isNaN(u2))
          return 61;
        var w = B(o);
        if (r & 2) {
          if ((w.node.mode & 61440) !== 32768)
            throw new _(43);
          n & 2 || w.Mb.lc && w.Mb.lc(w, v2.slice(e, e + t), u2, t, n);
        }
      } catch (c) {
        if (typeof I > "u" || c.name !== "ErrnoError")
          throw c;
        return -c.Ob;
      }
    }, s: (e, t, r) => {
      function n(c) {
        return (c = c.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? c[1] : "GMT";
      }
      var o = (/* @__PURE__ */ new Date()).getFullYear(), u2 = new Date(o, 0, 1), a = new Date(o, 6, 1);
      o = u2.getTimezoneOffset();
      var w = a.getTimezoneOffset();
      M[e >> 2] = 60 * Math.max(o, w), E[t >> 2] = +(o != w), e = n(u2), t = n(a), e = zt(e), t = zt(t), w < o ? (M[r >> 2] = e, M[r + 4 >> 2] = t) : (M[r >> 2] = t, M[r + 4 >> 2] = e);
    }, e: () => Date.now(), d: () => performance.now(), o: (e) => {
      var t = v2.length;
      if (e >>>= 0, 2147483648 < e)
        return false;
      for (var r = 1; 4 >= r; r *= 2) {
        var n = t * (1 + 0.2 / r);
        n = Math.min(n, e + 100663296);
        var o = Math;
        n = Math.max(e, n);
        e: {
          o = (o.min.call(o, 2147483648, n + (65536 - n % 65536) % 65536) - F.buffer.byteLength + 65535) / 65536;
          try {
            F.grow(o), ut();
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
      return Ft().forEach((n, o) => {
        var u2 = t + r;
        for (o = M[e + 4 * o >> 2] = u2, u2 = 0; u2 < n.length; ++u2)
          V[o++ >> 0] = n.charCodeAt(u2);
        V[o >> 0] = 0, r += n.length + 1;
      }), 0;
    }, B: (e, t) => {
      var r = Ft();
      M[e >> 2] = r.length;
      var n = 0;
      return r.forEach((o) => n += o.length + 1), M[t >> 2] = n, 0;
    }, f: function(e) {
      try {
        var t = B(e);
        if (t.Wb === null)
          throw new _(8);
        t.pc && (t.pc = null);
        try {
          t.Mb.close && t.Mb.close(t);
        } catch (r) {
          throw r;
        } finally {
          Se[t.Wb] = null;
        }
        return t.Wb = null, 0;
      } catch (r) {
        if (typeof I > "u" || r.name !== "ErrnoError")
          throw r;
        return r.Ob;
      }
    }, p: function(e, t) {
      try {
        var r = B(e);
        return V[t >> 0] = r.Sb ? 2 : Y2(r.mode) ? 3 : (r.mode & 61440) === 40960 ? 7 : 4, Ee[t + 2 >> 1] = 0, N = [0, (g = 0, 1 <= +Math.abs(g) ? 0 < g ? +Math.floor(g / 4294967296) >>> 0 : ~~+Math.ceil((g - +(~~g >>> 0)) / 4294967296) >>> 0 : 0)], E[t + 8 >> 2] = N[0], E[t + 12 >> 2] = N[1], N = [0, (g = 0, 1 <= +Math.abs(g) ? 0 < g ? +Math.floor(g / 4294967296) >>> 0 : ~~+Math.ceil((g - +(~~g >>> 0)) / 4294967296) >>> 0 : 0)], E[t + 16 >> 2] = N[0], E[t + 20 >> 2] = N[1], 0;
      } catch (n) {
        if (typeof I > "u" || n.name !== "ErrnoError")
          throw n;
        return n.Ob;
      }
    }, x: function(e, t, r, n) {
      try {
        e: {
          var o = B(e);
          e = t;
          for (var u2, a = t = 0; a < r; a++) {
            var w = M[e >> 2], c = M[e + 4 >> 2];
            e += 8;
            var l = o, p = w, h = c, b = u2, S = V;
            if (0 > h || 0 > b)
              throw new _(28);
            if (l.Wb === null)
              throw new _(8);
            if ((l.flags & 2097155) === 1)
              throw new _(8);
            if (Y2(l.node.mode))
              throw new _(31);
            if (!l.Mb.read)
              throw new _(28);
            var q = typeof b < "u";
            if (!q)
              b = l.position;
            else if (!l.seekable)
              throw new _(70);
            var $ = l.Mb.read(l, S, p, h, b);
            q || (l.position += $);
            var T = $;
            if (0 > T) {
              var j2 = -1;
              break e;
            }
            if (t += T, T < c)
              break;
            typeof u2 < "u" && (u2 += T);
          }
          j2 = t;
        }
        return M[n >> 2] = j2, 0;
      } catch (U) {
        if (typeof I > "u" || U.name !== "ErrnoError")
          throw U;
        return U.Ob;
      }
    }, m: function(e, t, r, n, o) {
      t = Ce(t, r);
      try {
        if (isNaN(t))
          return 61;
        var u2 = B(e);
        return $t(u2, t, n), N = [u2.position >>> 0, (g = u2.position, 1 <= +Math.abs(g) ? 0 < g ? +Math.floor(g / 4294967296) >>> 0 : ~~+Math.ceil((g - +(~~g >>> 0)) / 4294967296) >>> 0 : 0)], E[o >> 2] = N[0], E[o + 4 >> 2] = N[1], u2.pc && t === 0 && n === 0 && (u2.pc = null), 0;
      } catch (a) {
        if (typeof I > "u" || a.name !== "ErrnoError")
          throw a;
        return a.Ob;
      }
    }, D: function(e) {
      try {
        var t = B(e);
        return Dr((r) => {
          var n = t.node.Ub;
          n.type.Qc ? n.type.Qc(n, false, (o) => {
            r(o ? 29 : 0);
          }) : r(0);
        });
      } catch (r) {
        if (typeof I > "u" || r.name !== "ErrnoError")
          throw r;
        return r.Ob;
      }
    }, t: function(e, t, r, n) {
      try {
        e: {
          var o = B(e);
          e = t;
          for (var u2, a = t = 0; a < r; a++) {
            var w = M[e >> 2], c = M[e + 4 >> 2];
            e += 8;
            var l = o, p = w, h = c, b = u2, S = V;
            if (0 > h || 0 > b)
              throw new _(28);
            if (l.Wb === null)
              throw new _(8);
            if (!(l.flags & 2097155))
              throw new _(8);
            if (Y2(l.node.mode))
              throw new _(31);
            if (!l.Mb.write)
              throw new _(28);
            l.seekable && l.flags & 1024 && $t(l, 0, 2);
            var q = typeof b < "u";
            if (!q)
              b = l.position;
            else if (!l.seekable)
              throw new _(70);
            var $ = l.Mb.write(l, S, p, h, b, void 0);
            q || (l.position += $);
            var T = $;
            if (0 > T) {
              var j2 = -1;
              break e;
            }
            t += T, typeof u2 < "u" && (u2 += T);
          }
          j2 = t;
        }
        return M[n >> 2] = j2, 0;
      } catch (U) {
        if (typeof I > "u" || U.name !== "ErrnoError")
          throw U;
        return U.Ob;
      }
    }, ra: Bt, N: Qt, ga: Ht, ca: jt, Y: Kt, la: Wt, G: Xt, h: Yt, oa: Zt, ja: Jt, ea: Gt, fa: er, k: tr, v: rr, pa: nr, g: ir, qa: or, da: sr, ha: ar, ia: ur, na: cr, c: lr, ka: fr, ma: hr, aa: dr, V: wr, $: _r4, ba: br, S: pr, U: mr, Z: yr, X: vr, R: gr, Q: Er, T: xr, _: Sr, O: Ar, W: Rr, P: Cr }, m = function() {
      function e(r) {
        return m = r.exports, m = qn(), F = m.sa, ut(), lt.unshift(m.ta), de--, i.monitorRunDependencies && i.monitorRunDependencies(de), de == 0 && xe && (r = xe, xe = null, r()), m;
      }
      var t = { a: On };
      if (de++, i.monitorRunDependencies && i.monitorRunDependencies(de), i.instantiateWasm)
        try {
          return i.instantiateWasm(t, e);
        } catch (r) {
          G2(`Module.instantiateWasm callback failed with error: ${r}`), y(r);
        }
      return bn(t, function(r) {
        e(r.instance);
      }).catch(y), {};
    }();
    i._sqlite3_vfs_find = (e) => (i._sqlite3_vfs_find = m.ua)(e), i._sqlite3_malloc = (e) => (i._sqlite3_malloc = m.va)(e), i._sqlite3_free = (e) => (i._sqlite3_free = m.wa)(e), i._sqlite3_prepare_v2 = (e, t, r, n, o) => (i._sqlite3_prepare_v2 = m.xa)(e, t, r, n, o), i._sqlite3_step = (e) => (i._sqlite3_step = m.ya)(e), i._sqlite3_column_int64 = (e, t) => (i._sqlite3_column_int64 = m.za)(e, t), i._sqlite3_column_int = (e, t) => (i._sqlite3_column_int = m.Aa)(e, t), i._sqlite3_finalize = (e) => (i._sqlite3_finalize = m.Ba)(e), i._sqlite3_reset = (e) => (i._sqlite3_reset = m.Ca)(e), i._sqlite3_clear_bindings = (e) => (i._sqlite3_clear_bindings = m.Da)(e), i._sqlite3_value_blob = (e) => (i._sqlite3_value_blob = m.Ea)(e), i._sqlite3_value_text = (e) => (i._sqlite3_value_text = m.Fa)(e), i._sqlite3_value_bytes = (e) => (i._sqlite3_value_bytes = m.Ga)(e), i._sqlite3_value_double = (e) => (i._sqlite3_value_double = m.Ha)(e), i._sqlite3_value_int = (e) => (i._sqlite3_value_int = m.Ia)(e), i._sqlite3_value_int64 = (e) => (i._sqlite3_value_int64 = m.Ja)(e), i._sqlite3_value_type = (e) => (i._sqlite3_value_type = m.Ka)(e), i._sqlite3_result_blob = (e, t, r, n) => (i._sqlite3_result_blob = m.La)(e, t, r, n), i._sqlite3_result_double = (e, t) => (i._sqlite3_result_double = m.Ma)(e, t), i._sqlite3_result_error = (e, t, r) => (i._sqlite3_result_error = m.Na)(e, t, r), i._sqlite3_result_int = (e, t) => (i._sqlite3_result_int = m.Oa)(e, t), i._sqlite3_result_int64 = (e, t, r) => (i._sqlite3_result_int64 = m.Pa)(e, t, r), i._sqlite3_result_null = (e) => (i._sqlite3_result_null = m.Qa)(e), i._sqlite3_result_text = (e, t, r, n) => (i._sqlite3_result_text = m.Ra)(e, t, r, n), i._sqlite3_column_count = (e) => (i._sqlite3_column_count = m.Sa)(e), i._sqlite3_data_count = (e) => (i._sqlite3_data_count = m.Ta)(e), i._sqlite3_column_blob = (e, t) => (i._sqlite3_column_blob = m.Ua)(e, t), i._sqlite3_column_bytes = (e, t) => (i._sqlite3_column_bytes = m.Va)(e, t), i._sqlite3_column_double = (e, t) => (i._sqlite3_column_double = m.Wa)(e, t), i._sqlite3_column_text = (e, t) => (i._sqlite3_column_text = m.Xa)(e, t), i._sqlite3_column_type = (e, t) => (i._sqlite3_column_type = m.Ya)(e, t), i._sqlite3_column_name = (e, t) => (i._sqlite3_column_name = m.Za)(e, t), i._sqlite3_bind_blob = (e, t, r, n, o) => (i._sqlite3_bind_blob = m._a)(e, t, r, n, o), i._sqlite3_bind_double = (e, t, r) => (i._sqlite3_bind_double = m.$a)(e, t, r), i._sqlite3_bind_int = (e, t, r) => (i._sqlite3_bind_int = m.ab)(e, t, r), i._sqlite3_bind_int64 = (e, t, r, n) => (i._sqlite3_bind_int64 = m.bb)(e, t, r, n), i._sqlite3_bind_null = (e, t) => (i._sqlite3_bind_null = m.cb)(e, t), i._sqlite3_bind_text = (e, t, r, n, o) => (i._sqlite3_bind_text = m.db)(e, t, r, n, o), i._sqlite3_bind_parameter_count = (e) => (i._sqlite3_bind_parameter_count = m.eb)(e), i._sqlite3_bind_parameter_name = (e, t) => (i._sqlite3_bind_parameter_name = m.fb)(e, t), i._sqlite3_sql = (e) => (i._sqlite3_sql = m.gb)(e), i._sqlite3_exec = (e, t, r, n, o) => (i._sqlite3_exec = m.hb)(e, t, r, n, o), i._sqlite3_errmsg = (e) => (i._sqlite3_errmsg = m.ib)(e), i._sqlite3_declare_vtab = (e, t) => (i._sqlite3_declare_vtab = m.jb)(e, t), i._sqlite3_libversion = () => (i._sqlite3_libversion = m.kb)(), i._sqlite3_libversion_number = () => (i._sqlite3_libversion_number = m.lb)(), i._sqlite3_changes = (e) => (i._sqlite3_changes = m.mb)(e), i._sqlite3_close = (e) => (i._sqlite3_close = m.nb)(e), i._sqlite3_limit = (e, t, r) => (i._sqlite3_limit = m.ob)(e, t, r), i._sqlite3_open_v2 = (e, t, r, n) => (i._sqlite3_open_v2 = m.pb)(e, t, r, n), i._sqlite3_get_autocommit = (e) => (i._sqlite3_get_autocommit = m.qb)(e);
    var Pr = () => (Pr = m.rb)(), ot = i._malloc = (e) => (ot = i._malloc = m.sb)(e), Lr = i._free = (e) => (Lr = i._free = m.tb)(e);
    i._RegisterExtensionFunctions = (e) => (i._RegisterExtensionFunctions = m.ub)(e), i._set_authorizer = (e) => (i._set_authorizer = m.vb)(e), i._create_function = (e, t, r, n, o, u2) => (i._create_function = m.wb)(e, t, r, n, o, u2), i._create_module = (e, t, r, n) => (i._create_module = m.xb)(e, t, r, n), i._progress_handler = (e, t) => (i._progress_handler = m.yb)(e, t), i._register_vfs = (e, t, r, n) => (i._register_vfs = m.zb)(e, t, r, n), i._getSqliteFree = () => (i._getSqliteFree = m.Ab)();
    var $r = i._main = (e, t) => ($r = i._main = m.Bb)(e, t), Ur = (e, t) => (Ur = m.Db)(e, t), Vr = () => (Vr = m.Eb)(), zr = () => (zr = m.Fb)(), Fr = (e) => (Fr = m.Gb)(e), st = (e) => (st = m.Hb)(e), Br = (e) => (Br = m.Ib)(e), Qr = () => (Qr = m.Jb)(), Hr = (e) => (Hr = m.Kb)(e), jr = () => (jr = m.Lb)();
    i.getTempRet0 = Vr, i.ccall = ie, i.cwrap = (e, t, r, n) => {
      var o = !r || r.every((u2) => u2 === "number" || u2 === "boolean");
      return t !== "string" && o && !n ? i["_" + e] : function() {
        return ie(e, t, r, arguments, n);
      };
    }, i.setValue = te, i.getValue = L, i.UTF8ToString = (e, t) => e ? R(v2, e, t) : "", i.stringToUTF8 = (e, t, r) => be(e, v2, t, r), i.lengthBytesUTF8 = _e7;
    var Qe;
    xe = function e() {
      Qe || Kr(), Qe || (xe = e);
    };
    function Kr() {
      function e() {
        if (!Qe && (Qe = true, i.calledRun = true, !W2)) {
          if (i.noFSInit || Vt || (Vt = true, Ut(), i.stdin = i.stdin, i.stdout = i.stdout, i.stderr = i.stderr, i.stdin ? Ae("stdin", i.stdin) : Ge("/dev/tty", "/dev/stdin"), i.stdout ? Ae("stdout", null, i.stdout) : Ge("/dev/tty", "/dev/stdout"), i.stderr ? Ae("stderr", null, i.stderr) : Ge("/dev/tty1", "/dev/stderr"), Pe("/dev/stdin", 0), Pe("/dev/stdout", 1), Pe("/dev/stderr", 1)), At = false, Ie(lt), Ie(dn), f(i), i.onRuntimeInitialized && i.onRuntimeInitialized(), Wr) {
            var t = $r;
            try {
              var r = t(0, 0);
              ee = r, qr(r);
            } catch (n) {
              nt(n);
            }
          }
          if (i.postRun)
            for (typeof i.postRun == "function" && (i.postRun = [i.postRun]); i.postRun.length; )
              t = i.postRun.shift(), ft.unshift(t);
          Ie(ft);
        }
      }
      if (!(0 < de)) {
        if (i.preRun)
          for (typeof i.preRun == "function" && (i.preRun = [i.preRun]); i.preRun.length; )
            wn();
        Ie(ct), 0 < de || (i.setStatus ? (i.setStatus("Running..."), setTimeout(function() {
          setTimeout(function() {
            i.setStatus("");
          }, 1), e();
        }, 1)) : e());
      }
    }
    if (i.preInit)
      for (typeof i.preInit == "function" && (i.preInit = [i.preInit]); 0 < i.preInit.length; )
        i.preInit.pop()();
    var Wr = true;
    return i.noInitialRun && (Wr = false), Kr(), d.ready;
  };
})(), Tn = kn, Pn = nn | tn | rn | en | sn, Ln = (_a = class {
  constructor() {
    __privateAdd(this, _r);
    __privateAdd(this, _o);
    __privateAdd(this, _i);
    __privateAdd(this, _e, nn);
    __publicField(this, "timeoutMillis", 0);
    __privateAdd(this, _n, /* @__PURE__ */ new Map());
    __privateAdd(this, _t, Promise.resolve(0));
  }
  get state() {
    return __privateGet(this, _e);
  }
  async lock(s) {
    return __privateMethod(this, _r, r_fn).call(this, __privateMethod(this, _o, o_fn), s);
  }
  async unlock(s) {
    return __privateMethod(this, _r, r_fn).call(this, __privateMethod(this, _i, i_fn), s);
  }
  async isSomewhereReserved() {
    throw new Error("unimplemented");
  }
  async _NONEtoSHARED() {
  }
  async _SHAREDtoEXCLUSIVE() {
    await this._SHAREDtoRESERVED(), await this._RESERVEDtoEXCLUSIVE();
  }
  async _SHAREDtoRESERVED() {
  }
  async _RESERVEDtoEXCLUSIVE() {
  }
  async _EXCLUSIVEtoRESERVED() {
  }
  async _EXCLUSIVEtoSHARED() {
    await this._EXCLUSIVEtoRESERVED(), await this._RESERVEDtoSHARED();
  }
  async _EXCLUSIVEtoNONE() {
    await this._EXCLUSIVEtoRESERVED(), await this._RESERVEDtoSHARED(), await this._SHAREDtoNONE();
  }
  async _RESERVEDtoSHARED() {
  }
  async _RESERVEDtoNONE() {
    await this._RESERVEDtoSHARED(), await this._SHAREDtoNONE();
  }
  async _SHAREDtoNONE() {
  }
  _acquireWebLock(s, d) {
    return new Promise(async (i, f) => {
      try {
        await navigator.locks.request(s, d, (y) => {
          if (i(y), y)
            return new Promise((x) => __privateGet(this, _n).set(s, x));
        });
      } catch (y) {
        f(y);
      }
    });
  }
  _releaseWebLock(s) {
    __privateGet(this, _n).get(s)?.(), __privateGet(this, _n).delete(s);
  }
  async _pollWebLock(s) {
    return (await navigator.locks.query()).held.find(({ name: i }) => i === s)?.mode;
  }
  _getTimeoutSignal() {
    if (this.timeoutMillis) {
      let s = new AbortController();
      return setTimeout(() => s.abort(), this.timeoutMillis), s.signal;
    }
  }
}, _e = new WeakMap(), _n = new WeakMap(), _t = new WeakMap(), _r = new WeakSet(), r_fn = async function(s, d) {
  let i = d & Pn;
  try {
    let f = () => s.call(this, i);
    return await __privateSet(this, _t, __privateGet(this, _t).then(f, f)), __privateSet(this, _e, i), v;
  } catch (f) {
    return f.name === "AbortError" ? G : (console.error(f), X);
  }
}, _o = new WeakSet(), o_fn = async function(s) {
  if (s === __privateGet(this, _e))
    return v;
  switch (__privateGet(this, _e)) {
    case nn:
      switch (s) {
        case tn:
          return this._NONEtoSHARED();
        default:
          throw new Error(`unexpected transition ${__privateGet(this, _e)} -> ${s}`);
      }
    case tn:
      switch (s) {
        case rn:
          return this._SHAREDtoRESERVED();
        case sn:
          return this._SHAREDtoEXCLUSIVE();
        default:
          throw new Error(`unexpected transition ${__privateGet(this, _e)} -> ${s}`);
      }
    case rn:
      switch (s) {
        case sn:
          return this._RESERVEDtoEXCLUSIVE();
        default:
          throw new Error(`unexpected transition ${__privateGet(this, _e)} -> ${s}`);
      }
    default:
      throw new Error(`unexpected transition ${__privateGet(this, _e)} -> ${s}`);
  }
}, _i = new WeakSet(), i_fn = async function(s) {
  if (s === __privateGet(this, _e))
    return v;
  switch (__privateGet(this, _e)) {
    case sn:
      switch (s) {
        case tn:
          return this._EXCLUSIVEtoSHARED();
        case nn:
          return this._EXCLUSIVEtoNONE();
        default:
          throw new Error(`unexpected transition ${__privateGet(this, _e)} -> ${s}`);
      }
    case rn:
      switch (s) {
        case tn:
          return this._RESERVEDtoSHARED();
        case nn:
          return this._RESERVEDtoNONE();
        default:
          throw new Error(`unexpected transition ${__privateGet(this, _e)} -> ${s}`);
      }
    case tn:
      switch (s) {
        case nn:
          return this._SHAREDtoNONE();
        default:
          throw new Error(`unexpected transition ${__privateGet(this, _e)} -> ${s}`);
      }
    default:
      throw new Error(`unexpected transition ${__privateGet(this, _e)} -> ${s}`);
  }
}, _a), $n = class extends Ln {
  constructor(s) {
    super(), this._lockName = s + "-outer", this._reservedName = s + "-reserved";
  }
  async isSomewhereReserved() {
    return await this._pollWebLock(this._reservedName) === "exclusive";
  }
  async _NONEtoSHARED() {
    await this._acquireWebLock(this._lockName, { mode: "exclusive", signal: this._getTimeoutSignal() });
  }
  async _SHAREDtoRESERVED() {
    await this._acquireWebLock(this._reservedName, { mode: "exclusive", signal: this._getTimeoutSignal() });
  }
  async _RESERVEDtoSHARED() {
    this._releaseWebLock(this._reservedName);
  }
  async _SHAREDtoNONE() {
    this._releaseWebLock(this._lockName);
  }
}, Un = 5e3, Vn = 0, at = /* @__PURE__ */ new WeakMap();
function oe(...s) {
}
var zn = (_b = class {
  constructor(s, d = { durability: "default" }) {
    __privateAdd(this, _u);
    __privateAdd(this, _e2, void 0);
    __privateAdd(this, _n2, void 0);
    __privateAdd(this, _t2, void 0);
    __privateAdd(this, _r2, null);
    __privateAdd(this, _o2, 0);
    __privateAdd(this, _i2, Promise.resolve());
    __privateAdd(this, _s, Promise.resolve());
    __privateSet(this, _n2, Promise.resolve(s).then((i) => __privateSet(this, _e2, i))), __privateSet(this, _t2, d);
  }
  async close() {
    let s = __privateGet(this, _e2) ?? await __privateGet(this, _n2);
    await __privateGet(this, _i2), await this.sync(), s.close();
  }
  async run(s, d) {
    let i = __privateGet(this, _i2).then(() => __privateMethod(this, _u, u_fn).call(this, s, d));
    return __privateSet(this, _i2, i.catch(() => {
    })), i;
  }
  async sync() {
    await __privateGet(this, _s), __privateSet(this, _s, Promise.resolve());
  }
}, _e2 = new WeakMap(), _n2 = new WeakMap(), _t2 = new WeakMap(), _r2 = new WeakMap(), _o2 = new WeakMap(), _i2 = new WeakMap(), _s = new WeakMap(), _u = new WeakSet(), u_fn = async function(s, d) {
  let i = __privateGet(this, _e2) ?? await __privateGet(this, _n2);
  if (s === "readwrite" && __privateGet(this, _r2)?.mode === "readonly")
    __privateSet(this, _r2, null);
  else if (performance.now() - __privateGet(this, _o2) > Un) {
    try {
      __privateGet(this, _r2)?.commit();
    } catch (f) {
      if (f.name !== "InvalidStateError")
        throw f;
    }
    await new Promise((f) => setTimeout(f)), __privateSet(this, _r2, null);
  }
  for (let f = 0; f < 2; ++f) {
    if (!__privateGet(this, _r2)) {
      __privateSet(this, _r2, i.transaction(i.objectStoreNames, s, __privateGet(this, _t2)));
      let y = __privateSet(this, _o2, performance.now());
      __privateSet(this, _s, __privateGet(this, _s).then(() => new Promise((x, C) => {
        __privateGet(this, _r2).addEventListener("complete", (k) => {
          x(), __privateGet(this, _r2) === k.target && __privateSet(this, _r2, null), oe(`transaction ${at.get(k.target)} complete`);
        }), __privateGet(this, _r2).addEventListener("abort", (k) => {
          console.warn("tx abort", (performance.now() - y) / 1e3);
          let P = k.target.error;
          C(P), __privateGet(this, _r2) === k.target && __privateSet(this, _r2, null), oe(`transaction ${at.get(k.target)} aborted`, P);
        });
      }))), at.set(__privateGet(this, _r2), Vn++);
    }
    try {
      let y = Object.fromEntries(Array.from(i.objectStoreNames, (x) => [x, new Fn(__privateGet(this, _r2).objectStore(x))]));
      return await d(y);
    } catch (y) {
      if (__privateSet(this, _r2, null), f)
        throw y;
    }
  }
}, _b);
function he(s) {
  return new Promise((d, i) => {
    s.addEventListener("success", () => d(s.result)), s.addEventListener("error", () => i(s.error));
  });
}
var Fn = (_c = class {
  constructor(s) {
    __privateAdd(this, _e3, void 0);
    __privateSet(this, _e3, s);
  }
  get(s) {
    oe(`get ${__privateGet(this, _e3).name}`, s);
    let d = __privateGet(this, _e3).get(s);
    return he(d);
  }
  getAll(s, d) {
    oe(`getAll ${__privateGet(this, _e3).name}`, s, d);
    let i = __privateGet(this, _e3).getAll(s, d);
    return he(i);
  }
  getKey(s) {
    oe(`getKey ${__privateGet(this, _e3).name}`, s);
    let d = __privateGet(this, _e3).getKey(s);
    return he(d);
  }
  getAllKeys(s, d) {
    oe(`getAllKeys ${__privateGet(this, _e3).name}`, s, d);
    let i = __privateGet(this, _e3).getAllKeys(s, d);
    return he(i);
  }
  put(s, d) {
    oe(`put ${__privateGet(this, _e3).name}`, s, d);
    let i = __privateGet(this, _e3).put(s, d);
    return he(i);
  }
  delete(s) {
    oe(`delete ${__privateGet(this, _e3).name}`, s);
    let d = __privateGet(this, _e3).delete(s);
    return he(d);
  }
  clear() {
    oe(`clear ${__privateGet(this, _e3).name}`);
    let s = __privateGet(this, _e3).clear();
    return he(s);
  }
  index(s) {
    return new Bn(__privateGet(this, _e3).index(s));
  }
}, _e3 = new WeakMap(), _c), Bn = (_d = class {
  constructor(s) {
    __privateAdd(this, _e4, void 0);
    __privateSet(this, _e4, s);
  }
  getAllKeys(s, d) {
    oe(`IDBIndex.getAllKeys ${__privateGet(this, _e4).objectStore.name}<${__privateGet(this, _e4).name}>`, s, d);
    let i = __privateGet(this, _e4).getAllKeys(s, d);
    return he(i);
  }
}, _e4 = new WeakMap(), _d), Qn = 512, fn = 3e3, hn = { durability: "default", purge: "deferred", purgeAtLeast: 16 };
function K(...s) {
}
var Hn = (_e6 = class extends u {
  constructor(s = "wa-sqlite", d = hn) {
    super();
    __privateAdd(this, _s2);
    __privateAdd(this, _u2);
    __privateAdd(this, _c2);
    __privateAdd(this, _a2);
    __privateAdd(this, _l);
    __privateAdd(this, _e5, void 0);
    __privateAdd(this, _n3, /* @__PURE__ */ new Map());
    __privateAdd(this, _t3, void 0);
    __privateAdd(this, _r3, /* @__PURE__ */ new Set());
    __privateAdd(this, _o3, performance.now());
    __privateAdd(this, _i3, /* @__PURE__ */ new Set());
    this.name = s, __privateSet(this, _e5, Object.assign({}, hn, d)), __privateSet(this, _t3, new zn(jn(s), { durability: __privateGet(this, _e5).durability }));
  }
  async close() {
    for (let s of __privateGet(this, _n3).keys())
      await this.xClose(s);
    await __privateGet(this, _t3)?.close(), __privateSet(this, _t3, null);
  }
  xOpen(s, d, i$1, f) {
    return this.handleAsync(async () => {
      s === null && (s = `null_${d}`), K(`xOpen ${s} 0x${d.toString(16)} 0x${i$1.toString(16)}`);
      try {
        let y = new URL(s, "http://localhost/"), x = { path: y.pathname, flags: i$1, block0: null, isMetadataChanged: true, locks: new $n(y.pathname) };
        return __privateGet(this, _n3).set(d, x), await __privateGet(this, _t3).run("readwrite", async ({ blocks: C }) => {
          if (x.block0 = await C.get(__privateMethod(this, _a2, a_fn).call(this, x, 0)), !x.block0)
            if (i$1 & K$1)
              x.block0 = { path: x.path, offset: 0, version: 0, data: new Uint8Array(0), fileSize: 0 }, C.put(x.block0);
            else
              throw new Error(`file not found: ${x.path}`);
        }), f.setInt32(0, i$1 & j, true), v;
      } catch (y) {
        return console.error(y), W;
      }
    });
  }
  xClose(s) {
    return this.handleAsync(async () => {
      try {
        let d = __privateGet(this, _n3).get(s);
        return d && (K(`xClose ${d.path}`), __privateGet(this, _n3).delete(s), d.flags & Z && __privateGet(this, _t3).run("readwrite", ({ blocks: i }) => {
          i.delete(IDBKeyRange.bound([d.path], [d.path, []]));
        })), v;
      } catch (d) {
        return console.error(d), z;
      }
    });
  }
  xRead(s, d, i) {
    return this.handleAsync(async () => {
      let f = __privateGet(this, _n3).get(s);
      K(`xRead ${f.path} ${d.byteLength} ${i}`);
      try {
        return await __privateGet(this, _t3).run("readonly", async ({ blocks: x }) => {
          let C = 0;
          for (; C < d.byteLength; ) {
            let k = i + C, P = k < f.block0.data.byteLength ? f.block0 : await x.get(__privateMethod(this, _a2, a_fn).call(this, f, -k));
            if (!P || P.data.byteLength - P.offset <= k)
              return d.fill(0, C), Y;
            let Z2 = d.subarray(C), O = k + P.offset, se = Math.min(Math.max(P.data.byteLength - O, 0), Z2.byteLength);
            Z2.set(P.data.subarray(O, O + se)), C += se;
          }
          return v;
        });
      } catch (y) {
        return console.error(y), z;
      }
    });
  }
  xWrite(s, d, i) {
    let f = __privateGet(this, _i3).has(s);
    if (f || performance.now() - __privateGet(this, _o3) > fn) {
      let y = this.handleAsync(async () => {
        this.handleAsync !== super.handleAsync && __privateGet(this, _i3).add(s), await new Promise((C) => setTimeout(C));
        let x = __privateMethod(this, _s2, s_fn).call(this, s, d, i);
        return __privateSet(this, _o3, performance.now()), x;
      });
      return f && __privateGet(this, _i3).delete(s), y;
    }
    return __privateMethod(this, _s2, s_fn).call(this, s, d, i);
  }
  xTruncate(s, d) {
    let i = __privateGet(this, _n3).get(s);
    K(`xTruncate ${i.path} ${d}`);
    try {
      Object.assign(i.block0, { fileSize: d, data: i.block0.data.slice(0, d) });
      let f = Object.assign({}, i.block0);
      return __privateGet(this, _t3).run("readwrite", ({ blocks: y }) => {
        y.delete(__privateMethod(this, _a2, a_fn).call(this, i, -1 / 0, -d)), y.put(f);
      }), v;
    } catch (f) {
      return console.error(f), z;
    }
  }
  xSync(s, d) {
    let i = __privateGet(this, _i3).has(s);
    if (i || __privateGet(this, _e5).durability !== "relaxed" || performance.now() - __privateGet(this, _o3) > fn) {
      let y = this.handleAsync(async () => {
        this.handleAsync !== super.handleAsync && __privateGet(this, _i3).add(s);
        let x = await __privateMethod(this, _u2, u_fn2).call(this, s, d);
        return __privateSet(this, _o3, performance.now()), x;
      });
      return i && __privateGet(this, _i3).delete(s), y;
    }
    let f = __privateGet(this, _n3).get(s);
    return K(`xSync ${f.path} ${d}`), v;
  }
  xFileSize(s, d) {
    let i = __privateGet(this, _n3).get(s);
    return K(`xFileSize ${i.path}`), d.setBigInt64(0, BigInt(i.block0.fileSize), true), v;
  }
  xLock(s, d) {
    return this.handleAsync(async () => {
      let i = __privateGet(this, _n3).get(s);
      K(`xLock ${i.path} ${d}`);
      try {
        let f = await i.locks.lock(d);
        return f === v && i.locks.state === tn && (i.block0 = await __privateGet(this, _t3).run("readonly", ({ blocks: y }) => y.get(__privateMethod(this, _a2, a_fn).call(this, i, 0)))), f;
      } catch (f) {
        return console.error(f), z;
      }
    });
  }
  xUnlock(s, d) {
    return this.handleAsync(async () => {
      let i = __privateGet(this, _n3).get(s);
      K(`xUnlock ${i.path} ${d}`);
      try {
        return i.locks.unlock(d);
      } catch (f) {
        return console.error(f), z;
      }
    });
  }
  xCheckReservedLock(s, d) {
    return this.handleAsync(async () => {
      let i = __privateGet(this, _n3).get(s);
      K(`xCheckReservedLock ${i.path}`);
      let f = await i.locks.isSomewhereReserved();
      return d.setInt32(0, f ? 1 : 0, true), v;
    });
  }
  xSectorSize(s) {
    return Qn;
  }
  xDeviceCharacteristics(s) {
    return fn$1 | cn | on | un;
  }
  xFileControl(s, d$1, i) {
    let f = __privateGet(this, _n3).get(s);
    switch (K(`xFileControl ${f.path} ${d$1}`), d$1) {
      case 11:
        return f.overwrite = true, v;
      case 21:
        if (f.overwrite)
          try {
            return this.handleAsync(async () => (await __privateMethod(this, _l, l_fn).call(this, f), v));
          } catch (y) {
            return console.error(y), z;
          }
        if (f.isMetadataChanged)
          try {
            __privateGet(this, _t3).run("readwrite", async ({ blocks: y }) => {
              await y.put(f.block0);
            });
          } catch (y) {
            return console.error(y), z;
          }
        return v;
      case 22:
        return f.overwrite = false, v;
      case 31:
        return this.handleAsync(async () => {
          try {
            return f.block0.version--, f.changedPages = /* @__PURE__ */ new Set(), __privateGet(this, _t3).run("readwrite", async ({ blocks: y }) => {
              let x = await y.index("version").getAllKeys(IDBKeyRange.bound([f.path], [f.path, f.block0.version]));
              for (let C of x)
                y.delete(C);
            }), v;
          } catch (y) {
            return console.error(y), z;
          }
        });
      case 32:
        try {
          let y = Object.assign({}, f.block0);
          y.data = y.data.slice();
          let x = f.changedPages;
          return f.changedPages = null, f.isMetadataChanged = false, __privateGet(this, _t3).run("readwrite", async ({ blocks: C }) => {
            C.put(y);
            let k = await C.get([f.path, "purge", 0]) ?? { path: f.path, offset: "purge", version: 0, data: /* @__PURE__ */ new Map(), count: 0 };
            k.count += x.size;
            for (let P of x)
              k.data.set(P, y.version);
            C.put(k), __privateMethod(this, _c2, c_fn).call(this, f.path, k.count);
          }), v;
        } catch (y) {
          return console.error(y), z;
        }
      case 33:
        return this.handleAsync(async () => {
          try {
            return f.changedPages = null, f.isMetadataChanged = false, f.block0 = await __privateGet(this, _t3).run("readonly", ({ blocks: y }) => y.get([f.path, 0, f.block0.version + 1])), v;
          } catch (y) {
            return console.error(y), z;
          }
        });
      default:
        return J;
    }
  }
  xAccess(s, d, i) {
    return this.handleAsync(async () => {
      try {
        let f = new URL(s, "file://localhost/").pathname;
        K(`xAccess ${f} ${d}`);
        let y = await __privateGet(this, _t3).run("readonly", ({ blocks: x }) => x.getKey(__privateMethod(this, _a2, a_fn).call(this, { path: f }, 0)));
        return i.setInt32(0, y ? 1 : 0, true), v;
      } catch (f) {
        return console.error(f), z;
      }
    });
  }
  xDelete(s, d) {
    return this.handleAsync(async () => {
      let i = new URL(s, "file://localhost/").pathname;
      try {
        return __privateGet(this, _t3).run("readwrite", ({ blocks: f }) => f.delete(IDBKeyRange.bound([i], [i, []]))), d && await __privateGet(this, _t3).sync(), v;
      } catch (f) {
        return console.error(f), z;
      }
    });
  }
  async purge(s) {
    let d = Date.now();
    await __privateGet(this, _t3).run("readwrite", async ({ blocks: i }) => {
      let f = await i.get([s, "purge", 0]);
      if (f) {
        for (let [y, x] of f.data)
          i.delete(IDBKeyRange.bound([s, y, x], [s, y, 1 / 0], true, false));
        await i.delete([s, "purge", 0]);
      }
      K(`purge ${s} ${f?.data.size ?? 0} pages in ${Date.now() - d} ms`);
    });
  }
}, _e5 = new WeakMap(), _n3 = new WeakMap(), _t3 = new WeakMap(), _r3 = new WeakMap(), _o3 = new WeakMap(), _i3 = new WeakMap(), _s2 = new WeakSet(), s_fn = function(s, d, i) {
  let f = __privateGet(this, _n3).get(s);
  K(`xWrite ${f.path} ${d.byteLength} ${i}`);
  try {
    let y = f.block0.fileSize;
    f.block0.fileSize < i + d.byteLength && (f.block0.fileSize = i + d.byteLength, f.isMetadataChanged = true);
    let x = i === 0 ? f.block0 : { path: f.path, offset: -i, version: f.block0.version, data: null };
    return x.data = d.slice(), f.changedPages ? (y === f.block0.fileSize && f.changedPages.add(-i), i !== 0 && __privateGet(this, _t3).run("readwrite", ({ blocks: C }) => C.put(x))) : __privateGet(this, _t3).run("readwrite", ({ blocks: C }) => C.put(x)), f.isMetadataChanged = i === 0 ? false : f.isMetadataChanged, v;
  } catch (y) {
    return console.error(y), z;
  }
}, _u2 = new WeakSet(), u_fn2 = async function(s, d) {
  let i = __privateGet(this, _n3).get(s);
  K(`xSync ${i.path} ${d}`);
  try {
    await __privateGet(this, _t3).sync();
  } catch (f) {
    return console.error(f), z;
  }
  return v;
}, _c2 = new WeakSet(), c_fn = function(s, d) {
  __privateGet(this, _e5).purge === "manual" || __privateGet(this, _r3).has(s) || d < __privateGet(this, _e5).purgeAtLeast || (globalThis.requestIdleCallback ? globalThis.requestIdleCallback(() => {
    this.purge(s), __privateGet(this, _r3).delete(s);
  }) : setTimeout(() => {
    this.purge(s), __privateGet(this, _r3).delete(s);
  }), __privateGet(this, _r3).add(s));
}, _a2 = new WeakSet(), a_fn = function(s, d, i = 0) {
  let f = !d || -d < s.block0.data.length ? -1 / 0 : s.block0.version;
  return IDBKeyRange.bound([s.path, d, f], [s.path, i, 1 / 0]);
}, _l = new WeakSet(), l_fn = async function(s) {
  let d = s.block0.data.length;
  if (d < 18)
    return;
  let i = new DataView(s.block0.data.buffer, s.block0.data.byteOffset), f = i.getUint16(16);
  if (f === 1 && (f = 65536), f === d)
    return;
  let y = Math.max(d, f), x = y / d, C = y / f, P = i.getUint32(28) * f, Z2 = s.block0.version;
  await __privateGet(this, _t3).run("readwrite", async ({ blocks: O }) => {
    let se = await O.index("version").getAllKeys(IDBKeyRange.bound([s.path, Z2 + 1], [s.path, 1 / 0]));
    for (let J2 of se)
      O.delete(J2);
    O.delete([s.path, "purge", 0]);
    for (let J2 = 0; J2 < P; J2 += y) {
      let G2 = await O.getAll(IDBKeyRange.lowerBound([s.path, -(J2 + y), 1 / 0]), x);
      for (let z2 of G2)
        O.delete([z2.path, z2.offset, z2.version]);
      if (C === 1) {
        let z2 = new Uint8Array(f);
        for (let W2 of G2)
          z2.set(W2.data, -(J2 + W2.offset));
        let F = { path: s.path, offset: -J2, version: Z2, data: z2 };
        F.offset === 0 && (F.fileSize = P, s.block0 = F), O.put(F);
      } else {
        let z2 = G2[0];
        for (let F = 0; F < C; ++F) {
          let W2 = -(J2 + F * f);
          if (-W2 >= P)
            break;
          let ee = { path: z2.path, offset: W2, version: Z2, data: z2.data.subarray(F * f, (F + 1) * f) };
          ee.offset === 0 && (ee.fileSize = P, s.block0 = ee), O.put(ee);
        }
      }
    }
  });
}, _e6);
function jn(s) {
  return new Promise((d, i) => {
    let f = globalThis.indexedDB.open(s, 5);
    f.addEventListener("upgradeneeded", function() {
      f.result.createObjectStore("blocks", { keyPath: ["path", "offset", "version"] }).createIndex("version", ["path", "version"]);
    }), f.addEventListener("success", () => {
      d(f.result);
    }), f.addEventListener("error", () => {
      i(f.error);
    });
  });
}
async function Xn(s, d = {}) {
  let { url: i, durability: f = "relaxed", ...y$1 } = d, x = await Tn(i ? { locateFile: () => i } : void 0), C = an(x);
  return C.vfs_register(new Hn(s, { durability: f, ...y$1 })), { fileName: s, sqlite: C };
}
export {
  Xn as useIdbStorage
};
