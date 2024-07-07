var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __OPFSCoopSyncVFS_instances, initialize_fn, createPersistentFile_fn, requestAccessHandle_fn, releaseAccessHandle_fn, acquireLock_fn, _a;
import { F as FacadeVFS, S as SQLITE_OPEN_MAIN_DB, a as SQLITE_BUSY, b as SQLITE_OPEN_CREATE, c as SQLITE_CANTOPEN, d as SQLITE_OK, e as SQLITE_IOERR_DELETE, f as SQLITE_IOERR_ACCESS, g as SQLITE_OPEN_DELETEONCLOSE, h as SQLITE_IOERR_CLOSE, i as SQLITE_IOERR_SHORT_READ, j as SQLITE_IOERR_READ, k as SQLITE_IOERR_WRITE, l as SQLITE_IOERR_TRUNCATE, m as SQLITE_IOERR_FSYNC, n as SQLITE_IOERR_FSTAT, o as SQLITE_LOCK_NONE, p as SQLITE_FCNTL_PRAGMA, q as SQLITE_IOERR, r as SQLITE_NOTFOUND } from "./worker-Y4YB_dIi.js";
var Module = (() => {
  var _scriptDir = import.meta.url;
  return function(moduleArg = {}) {
    var Module2 = moduleArg;
    var readyPromiseResolve, readyPromiseReject;
    Module2["ready"] = new Promise((resolve, reject) => {
      readyPromiseResolve = resolve;
      readyPromiseReject = reject;
    });
    var moduleOverrides = Object.assign({}, Module2);
    var thisProgram = "./this.program";
    var quit_ = (status, toThrow) => {
      throw toThrow;
    };
    var ENVIRONMENT_IS_WEB = typeof window == "object";
    var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
    typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
    var scriptDirectory = "";
    function locateFile(path) {
      if (Module2["locateFile"]) {
        return Module2["locateFile"](path, scriptDirectory);
      }
      return scriptDirectory + path;
    }
    var read_, readAsync, readBinary;
    if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href;
      } else if (typeof document != "undefined" && document.currentScript) {
        scriptDirectory = document.currentScript.src;
      }
      if (_scriptDir) {
        scriptDirectory = _scriptDir;
      }
      if (scriptDirectory.indexOf("blob:") !== 0) {
        scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
      } else {
        scriptDirectory = "";
      }
      {
        read_ = (url) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          xhr.send(null);
          return xhr.responseText;
        };
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = (url) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(xhr.response);
          };
        }
        readAsync = (url, onload, onerror) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = () => {
            if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
              onload(xhr.response);
              return;
            }
            onerror();
          };
          xhr.onerror = onerror;
          xhr.send(null);
        };
      }
    }
    var out = Module2["print"] || console.log.bind(console);
    var err = Module2["printErr"] || console.error.bind(console);
    Object.assign(Module2, moduleOverrides);
    moduleOverrides = null;
    if (Module2["arguments"]) Module2["arguments"];
    if (Module2["thisProgram"]) thisProgram = Module2["thisProgram"];
    if (Module2["quit"]) quit_ = Module2["quit"];
    var wasmBinary;
    if (Module2["wasmBinary"]) wasmBinary = Module2["wasmBinary"];
    if (typeof WebAssembly != "object") {
      abort("no native wasm support detected");
    }
    var wasmMemory;
    var ABORT = false;
    var EXITSTATUS;
    function assert(condition, text) {
      if (!condition) {
        abort(text);
      }
    }
    var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
    function updateMemoryViews() {
      var b = wasmMemory.buffer;
      Module2["HEAP8"] = HEAP8 = new Int8Array(b);
      Module2["HEAP16"] = HEAP16 = new Int16Array(b);
      Module2["HEAPU8"] = HEAPU8 = new Uint8Array(b);
      Module2["HEAPU16"] = HEAPU16 = new Uint16Array(b);
      Module2["HEAP32"] = HEAP32 = new Int32Array(b);
      Module2["HEAPU32"] = HEAPU32 = new Uint32Array(b);
      Module2["HEAPF32"] = HEAPF32 = new Float32Array(b);
      Module2["HEAPF64"] = HEAPF64 = new Float64Array(b);
    }
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATMAIN__ = [];
    var __ATPOSTRUN__ = [];
    function preRun() {
      if (Module2["preRun"]) {
        if (typeof Module2["preRun"] == "function") Module2["preRun"] = [Module2["preRun"]];
        while (Module2["preRun"].length) {
          addOnPreRun(Module2["preRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPRERUN__);
    }
    function initRuntime() {
      if (!Module2["noFSInit"] && !FS.init.initialized) FS.init();
      FS.ignorePermissions = false;
      callRuntimeCallbacks(__ATINIT__);
    }
    function preMain() {
      callRuntimeCallbacks(__ATMAIN__);
    }
    function postRun() {
      if (Module2["postRun"]) {
        if (typeof Module2["postRun"] == "function") Module2["postRun"] = [Module2["postRun"]];
        while (Module2["postRun"].length) {
          addOnPostRun(Module2["postRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPOSTRUN__);
    }
    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb);
    }
    function addOnInit(cb) {
      __ATINIT__.unshift(cb);
    }
    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb);
    }
    var runDependencies = 0;
    var dependenciesFulfilled = null;
    function getUniqueRunDependency(id) {
      return id;
    }
    function addRunDependency(id) {
      runDependencies++;
      if (Module2["monitorRunDependencies"]) {
        Module2["monitorRunDependencies"](runDependencies);
      }
    }
    function removeRunDependency(id) {
      runDependencies--;
      if (Module2["monitorRunDependencies"]) {
        Module2["monitorRunDependencies"](runDependencies);
      }
      if (runDependencies == 0) {
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }
    function abort(what) {
      if (Module2["onAbort"]) {
        Module2["onAbort"](what);
      }
      what = "Aborted(" + what + ")";
      err(what);
      ABORT = true;
      EXITSTATUS = 1;
      what += ". Build with -sASSERTIONS for more info.";
      var e = new WebAssembly.RuntimeError(what);
      readyPromiseReject(e);
      throw e;
    }
    var dataURIPrefix = "data:application/octet-stream;base64,";
    var isDataURI = (filename) => filename.startsWith(dataURIPrefix);
    var wasmBinaryFile;
    if (Module2["locateFile"]) {
      wasmBinaryFile = "wa-sqlite.wasm";
      if (!isDataURI(wasmBinaryFile)) {
        wasmBinaryFile = locateFile(wasmBinaryFile);
      }
    } else {
      wasmBinaryFile = new URL("" + new URL("wa-sqlite-DLmqw8IQ.wasm", import.meta.url).href, import.meta.url).href;
    }
    function getBinarySync(file) {
      if (file == wasmBinaryFile && wasmBinary) {
        return new Uint8Array(wasmBinary);
      }
      if (readBinary) {
        return readBinary(file);
      }
      throw "both async and sync fetching of the wasm failed";
    }
    function getBinaryPromise(binaryFile) {
      if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
        if (typeof fetch == "function") {
          return fetch(binaryFile, { credentials: "same-origin" }).then((response) => {
            if (!response["ok"]) {
              throw "failed to load wasm binary file at '" + binaryFile + "'";
            }
            return response["arrayBuffer"]();
          }).catch(() => getBinarySync(binaryFile));
        }
      }
      return Promise.resolve().then(() => getBinarySync(binaryFile));
    }
    function instantiateArrayBuffer(binaryFile, imports, receiver) {
      return getBinaryPromise(binaryFile).then((binary) => WebAssembly.instantiate(binary, imports)).then((instance) => instance).then(receiver, (reason) => {
        err(`failed to asynchronously prepare wasm: ${reason}`);
        abort(reason);
      });
    }
    function instantiateAsync(binary, binaryFile, imports, callback) {
      if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && typeof fetch == "function") {
        return fetch(binaryFile, { credentials: "same-origin" }).then((response) => {
          var result = WebAssembly.instantiateStreaming(response, imports);
          return result.then(callback, function(reason) {
            err(`wasm streaming compile failed: ${reason}`);
            err("falling back to ArrayBuffer instantiation");
            return instantiateArrayBuffer(binaryFile, imports, callback);
          });
        });
      }
      return instantiateArrayBuffer(binaryFile, imports, callback);
    }
    function createWasm() {
      var info = { "a": wasmImports };
      function receiveInstance(instance, module) {
        wasmExports = instance.exports;
        wasmMemory = wasmExports["ja"];
        updateMemoryViews();
        wasmTable = wasmExports["bf"];
        addOnInit(wasmExports["ka"]);
        removeRunDependency();
        return wasmExports;
      }
      addRunDependency();
      function receiveInstantiationResult(result) {
        receiveInstance(result["instance"]);
      }
      if (Module2["instantiateWasm"]) {
        try {
          return Module2["instantiateWasm"](info, receiveInstance);
        } catch (e) {
          err(`Module.instantiateWasm callback failed with error: ${e}`);
          readyPromiseReject(e);
        }
      }
      instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
      return {};
    }
    var tempDouble;
    var tempI64;
    function ExitStatus(status) {
      this.name = "ExitStatus";
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }
    var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        callbacks.shift()(Module2);
      }
    };
    function getValue(ptr, type = "i8") {
      if (type.endsWith("*")) type = "*";
      switch (type) {
        case "i1":
          return HEAP8[ptr >> 0];
        case "i8":
          return HEAP8[ptr >> 0];
        case "i16":
          return HEAP16[ptr >> 1];
        case "i32":
          return HEAP32[ptr >> 2];
        case "i64":
          abort("to do getValue(i64) use WASM_BIGINT");
        case "float":
          return HEAPF32[ptr >> 2];
        case "double":
          return HEAPF64[ptr >> 3];
        case "*":
          return HEAPU32[ptr >> 2];
        default:
          abort(`invalid type for getValue: ${type}`);
      }
    }
    var noExitRuntime = Module2["noExitRuntime"] || true;
    function setValue(ptr, value, type = "i8") {
      if (type.endsWith("*")) type = "*";
      switch (type) {
        case "i1":
          HEAP8[ptr >> 0] = value;
          break;
        case "i8":
          HEAP8[ptr >> 0] = value;
          break;
        case "i16":
          HEAP16[ptr >> 1] = value;
          break;
        case "i32":
          HEAP32[ptr >> 2] = value;
          break;
        case "i64":
          abort("to do setValue(i64) use WASM_BIGINT");
        case "float":
          HEAPF32[ptr >> 2] = value;
          break;
        case "double":
          HEAPF64[ptr >> 3] = value;
          break;
        case "*":
          HEAPU32[ptr >> 2] = value;
          break;
        default:
          abort(`invalid type for setValue: ${type}`);
      }
    }
    var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : void 0;
    var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = "";
      while (idx < endPtr) {
        var u0 = heapOrArray[idx++];
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0);
          continue;
        }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 224) == 192) {
          str += String.fromCharCode((u0 & 31) << 6 | u1);
          continue;
        }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 240) == 224) {
          u0 = (u0 & 15) << 12 | u1 << 6 | u2;
        } else {
          u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 65536;
          str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
        }
      }
      return str;
    };
    var UTF8ToString = (ptr, maxBytesToRead) => ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
    var ___assert_fail = (condition, filename, line, func) => {
      abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"]);
    };
    var PATH = { isAbs: (path) => path.charAt(0) === "/", splitPath: (filename) => {
      var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      return splitPathRe.exec(filename).slice(1);
    }, normalizeArray: (parts, allowAboveRoot) => {
      var up = 0;
      for (var i = parts.length - 1; i >= 0; i--) {
        var last = parts[i];
        if (last === ".") {
          parts.splice(i, 1);
        } else if (last === "..") {
          parts.splice(i, 1);
          up++;
        } else if (up) {
          parts.splice(i, 1);
          up--;
        }
      }
      if (allowAboveRoot) {
        for (; up; up--) {
          parts.unshift("..");
        }
      }
      return parts;
    }, normalize: (path) => {
      var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
      path = PATH.normalizeArray(path.split("/").filter((p) => !!p), !isAbsolute).join("/");
      if (!path && !isAbsolute) {
        path = ".";
      }
      if (path && trailingSlash) {
        path += "/";
      }
      return (isAbsolute ? "/" : "") + path;
    }, dirname: (path) => {
      var result = PATH.splitPath(path), root = result[0], dir = result[1];
      if (!root && !dir) {
        return ".";
      }
      if (dir) {
        dir = dir.substr(0, dir.length - 1);
      }
      return root + dir;
    }, basename: (path) => {
      if (path === "/") return "/";
      path = PATH.normalize(path);
      path = path.replace(/\/$/, "");
      var lastSlash = path.lastIndexOf("/");
      if (lastSlash === -1) return path;
      return path.substr(lastSlash + 1);
    }, join: function() {
      var paths = Array.prototype.slice.call(arguments);
      return PATH.normalize(paths.join("/"));
    }, join2: (l, r) => PATH.normalize(l + "/" + r) };
    var initRandomFill = () => {
      if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
        return (view) => crypto.getRandomValues(view);
      } else abort("initRandomDevice");
    };
    var randomFill = (view) => (randomFill = initRandomFill())(view);
    var PATH_FS = { resolve: function() {
      var resolvedPath = "", resolvedAbsolute = false;
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = i >= 0 ? arguments[i] : FS.cwd();
        if (typeof path != "string") {
          throw new TypeError("Arguments to path.resolve must be strings");
        } else if (!path) {
          return "";
        }
        resolvedPath = path + "/" + resolvedPath;
        resolvedAbsolute = PATH.isAbs(path);
      }
      resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p) => !!p), !resolvedAbsolute).join("/");
      return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
    }, relative: (from, to) => {
      from = PATH_FS.resolve(from).substr(1);
      to = PATH_FS.resolve(to).substr(1);
      function trim(arr) {
        var start = 0;
        for (; start < arr.length; start++) {
          if (arr[start] !== "") break;
        }
        var end = arr.length - 1;
        for (; end >= 0; end--) {
          if (arr[end] !== "") break;
        }
        if (start > end) return [];
        return arr.slice(start, end - start + 1);
      }
      var fromParts = trim(from.split("/"));
      var toParts = trim(to.split("/"));
      var length = Math.min(fromParts.length, toParts.length);
      var samePartsLength = length;
      for (var i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
          samePartsLength = i;
          break;
        }
      }
      var outputParts = [];
      for (var i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push("..");
      }
      outputParts = outputParts.concat(toParts.slice(samePartsLength));
      return outputParts.join("/");
    } };
    var FS_stdin_getChar_buffer = [];
    var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var c = str.charCodeAt(i);
        if (c <= 127) {
          len++;
        } else if (c <= 2047) {
          len += 2;
        } else if (c >= 55296 && c <= 57343) {
          len += 4;
          ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
    var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      if (!(maxBytesToWrite > 0)) return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1;
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
          var u1 = str.charCodeAt(++i);
          u = 65536 + ((u & 1023) << 10) | u1 & 1023;
        }
        if (u <= 127) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 192 | u >> 6;
          heap[outIdx++] = 128 | u & 63;
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 224 | u >> 12;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        } else {
          if (outIdx + 3 >= endIdx) break;
          heap[outIdx++] = 240 | u >> 18;
          heap[outIdx++] = 128 | u >> 12 & 63;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        }
      }
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
    function intArrayFromString(stringy, dontAddNull, length) {
      var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
      var u8array = new Array(len);
      var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
      if (dontAddNull) u8array.length = numBytesWritten;
      return u8array;
    }
    var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (typeof window != "undefined" && typeof window.prompt == "function") {
          result = window.prompt("Input: ");
          if (result !== null) {
            result += "\n";
          }
        } else if (typeof readline == "function") {
          result = readline();
          if (result !== null) {
            result += "\n";
          }
        }
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
      }
      return FS_stdin_getChar_buffer.shift();
    };
    var TTY = { ttys: [], init() {
    }, shutdown() {
    }, register(dev, ops) {
      TTY.ttys[dev] = { input: [], output: [], ops };
      FS.registerDevice(dev, TTY.stream_ops);
    }, stream_ops: { open(stream) {
      var tty = TTY.ttys[stream.node.rdev];
      if (!tty) {
        throw new FS.ErrnoError(43);
      }
      stream.tty = tty;
      stream.seekable = false;
    }, close(stream) {
      stream.tty.ops.fsync(stream.tty);
    }, fsync(stream) {
      stream.tty.ops.fsync(stream.tty);
    }, read(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.get_char) {
        throw new FS.ErrnoError(60);
      }
      var bytesRead = 0;
      for (var i = 0; i < length; i++) {
        var result;
        try {
          result = stream.tty.ops.get_char(stream.tty);
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
        if (result === void 0 && bytesRead === 0) {
          throw new FS.ErrnoError(6);
        }
        if (result === null || result === void 0) break;
        bytesRead++;
        buffer[offset + i] = result;
      }
      if (bytesRead) {
        stream.node.timestamp = Date.now();
      }
      return bytesRead;
    }, write(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.put_char) {
        throw new FS.ErrnoError(60);
      }
      try {
        for (var i = 0; i < length; i++) {
          stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
        }
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
      if (length) {
        stream.node.timestamp = Date.now();
      }
      return i;
    } }, default_tty_ops: { get_char(tty) {
      return FS_stdin_getChar();
    }, put_char(tty, val) {
      if (val === null || val === 10) {
        out(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    }, fsync(tty) {
      if (tty.output && tty.output.length > 0) {
        out(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      }
    }, ioctl_tcgets(tty) {
      return { c_iflag: 25856, c_oflag: 5, c_cflag: 191, c_lflag: 35387, c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
    }, ioctl_tcsets(tty, optional_actions, data) {
      return 0;
    }, ioctl_tiocgwinsz(tty) {
      return [24, 80];
    } }, default_tty1_ops: { put_char(tty, val) {
      if (val === null || val === 10) {
        err(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    }, fsync(tty) {
      if (tty.output && tty.output.length > 0) {
        err(UTF8ArrayToString(tty.output, 0));
        tty.output = [];
      }
    } } };
    var zeroMemory = (address, size) => {
      HEAPU8.fill(0, address, address + size);
      return address;
    };
    var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
    var mmapAlloc = (size) => {
      size = alignMemory(size, 65536);
      var ptr = _emscripten_builtin_memalign(65536, size);
      if (!ptr) return 0;
      return zeroMemory(ptr, size);
    };
    var MEMFS = { ops_table: null, mount(mount) {
      return MEMFS.createNode(null, "/", 16384 | 511, 0);
    }, createNode(parent, name, mode, dev) {
      if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
        throw new FS.ErrnoError(63);
      }
      if (!MEMFS.ops_table) {
        MEMFS.ops_table = { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, allocate: MEMFS.stream_ops.allocate, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } };
      }
      var node = FS.createNode(parent, name, mode, dev);
      if (FS.isDir(node.mode)) {
        node.node_ops = MEMFS.ops_table.dir.node;
        node.stream_ops = MEMFS.ops_table.dir.stream;
        node.contents = {};
      } else if (FS.isFile(node.mode)) {
        node.node_ops = MEMFS.ops_table.file.node;
        node.stream_ops = MEMFS.ops_table.file.stream;
        node.usedBytes = 0;
        node.contents = null;
      } else if (FS.isLink(node.mode)) {
        node.node_ops = MEMFS.ops_table.link.node;
        node.stream_ops = MEMFS.ops_table.link.stream;
      } else if (FS.isChrdev(node.mode)) {
        node.node_ops = MEMFS.ops_table.chrdev.node;
        node.stream_ops = MEMFS.ops_table.chrdev.stream;
      }
      node.timestamp = Date.now();
      if (parent) {
        parent.contents[name] = node;
        parent.timestamp = node.timestamp;
      }
      return node;
    }, getFileDataAsTypedArray(node) {
      if (!node.contents) return new Uint8Array(0);
      if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
      return new Uint8Array(node.contents);
    }, expandFileStorage(node, newCapacity) {
      var prevCapacity = node.contents ? node.contents.length : 0;
      if (prevCapacity >= newCapacity) return;
      var CAPACITY_DOUBLING_MAX = 1024 * 1024;
      newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
      if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
      var oldContents = node.contents;
      node.contents = new Uint8Array(newCapacity);
      if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
    }, resizeFileStorage(node, newSize) {
      if (node.usedBytes == newSize) return;
      if (newSize == 0) {
        node.contents = null;
        node.usedBytes = 0;
      } else {
        var oldContents = node.contents;
        node.contents = new Uint8Array(newSize);
        if (oldContents) {
          node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
        }
        node.usedBytes = newSize;
      }
    }, node_ops: { getattr(node) {
      var attr = {};
      attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
      attr.ino = node.id;
      attr.mode = node.mode;
      attr.nlink = 1;
      attr.uid = 0;
      attr.gid = 0;
      attr.rdev = node.rdev;
      if (FS.isDir(node.mode)) {
        attr.size = 4096;
      } else if (FS.isFile(node.mode)) {
        attr.size = node.usedBytes;
      } else if (FS.isLink(node.mode)) {
        attr.size = node.link.length;
      } else {
        attr.size = 0;
      }
      attr.atime = new Date(node.timestamp);
      attr.mtime = new Date(node.timestamp);
      attr.ctime = new Date(node.timestamp);
      attr.blksize = 4096;
      attr.blocks = Math.ceil(attr.size / attr.blksize);
      return attr;
    }, setattr(node, attr) {
      if (attr.mode !== void 0) {
        node.mode = attr.mode;
      }
      if (attr.timestamp !== void 0) {
        node.timestamp = attr.timestamp;
      }
      if (attr.size !== void 0) {
        MEMFS.resizeFileStorage(node, attr.size);
      }
    }, lookup(parent, name) {
      throw FS.genericErrors[44];
    }, mknod(parent, name, mode, dev) {
      return MEMFS.createNode(parent, name, mode, dev);
    }, rename(old_node, new_dir, new_name) {
      if (FS.isDir(old_node.mode)) {
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
        }
        if (new_node) {
          for (var i in new_node.contents) {
            throw new FS.ErrnoError(55);
          }
        }
      }
      delete old_node.parent.contents[old_node.name];
      old_node.parent.timestamp = Date.now();
      old_node.name = new_name;
      new_dir.contents[new_name] = old_node;
      new_dir.timestamp = old_node.parent.timestamp;
      old_node.parent = new_dir;
    }, unlink(parent, name) {
      delete parent.contents[name];
      parent.timestamp = Date.now();
    }, rmdir(parent, name) {
      var node = FS.lookupNode(parent, name);
      for (var i in node.contents) {
        throw new FS.ErrnoError(55);
      }
      delete parent.contents[name];
      parent.timestamp = Date.now();
    }, readdir(node) {
      var entries = [".", ".."];
      for (var key in node.contents) {
        if (!node.contents.hasOwnProperty(key)) {
          continue;
        }
        entries.push(key);
      }
      return entries;
    }, symlink(parent, newname, oldpath) {
      var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
      node.link = oldpath;
      return node;
    }, readlink(node) {
      if (!FS.isLink(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      return node.link;
    } }, stream_ops: { read(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= stream.node.usedBytes) return 0;
      var size = Math.min(stream.node.usedBytes - position, length);
      if (size > 8 && contents.subarray) {
        buffer.set(contents.subarray(position, position + size), offset);
      } else {
        for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
      }
      return size;
    }, write(stream, buffer, offset, length, position, canOwn) {
      if (buffer.buffer === HEAP8.buffer) {
        canOwn = false;
      }
      if (!length) return 0;
      var node = stream.node;
      node.timestamp = Date.now();
      if (buffer.subarray && (!node.contents || node.contents.subarray)) {
        if (canOwn) {
          node.contents = buffer.subarray(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (node.usedBytes === 0 && position === 0) {
          node.contents = buffer.slice(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (position + length <= node.usedBytes) {
          node.contents.set(buffer.subarray(offset, offset + length), position);
          return length;
        }
      }
      MEMFS.expandFileStorage(node, position + length);
      if (node.contents.subarray && buffer.subarray) {
        node.contents.set(buffer.subarray(offset, offset + length), position);
      } else {
        for (var i = 0; i < length; i++) {
          node.contents[position + i] = buffer[offset + i];
        }
      }
      node.usedBytes = Math.max(node.usedBytes, position + length);
      return length;
    }, llseek(stream, offset, whence) {
      var position = offset;
      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          position += stream.node.usedBytes;
        }
      }
      if (position < 0) {
        throw new FS.ErrnoError(28);
      }
      return position;
    }, allocate(stream, offset, length) {
      MEMFS.expandFileStorage(stream.node, offset + length);
      stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
    }, mmap(stream, length, position, prot, flags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      var ptr;
      var allocated;
      var contents = stream.node.contents;
      if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
        allocated = false;
        ptr = contents.byteOffset;
      } else {
        if (position > 0 || position + length < contents.length) {
          if (contents.subarray) {
            contents = contents.subarray(position, position + length);
          } else {
            contents = Array.prototype.slice.call(contents, position, position + length);
          }
        }
        allocated = true;
        ptr = mmapAlloc(length);
        if (!ptr) {
          throw new FS.ErrnoError(48);
        }
        HEAP8.set(contents, ptr);
      }
      return { ptr, allocated };
    }, msync(stream, buffer, offset, length, mmapFlags) {
      MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
      return 0;
    } } };
    var asyncLoad = (url, onload, onerror, noRunDep) => {
      var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : "";
      readAsync(url, (arrayBuffer) => {
        assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
        onload(new Uint8Array(arrayBuffer));
        if (dep) removeRunDependency();
      }, (event) => {
        if (onerror) {
          onerror();
        } else {
          throw `Loading data file "${url}" failed.`;
        }
      });
      if (dep) addRunDependency();
    };
    var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
    var preloadPlugins = Module2["preloadPlugins"] || [];
    var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
      if (typeof Browser != "undefined") Browser.init();
      var handled = false;
      preloadPlugins.forEach((plugin) => {
        if (handled) return;
        if (plugin["canHandle"](fullname)) {
          plugin["handle"](byteArray, fullname, finish, onerror);
          handled = true;
        }
      });
      return handled;
    };
    var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      function processData(byteArray) {
        function finish(byteArray2) {
          if (preFinish) preFinish();
          if (!dontCreateFile) {
            FS_createDataFile(parent, name, byteArray2, canRead, canWrite, canOwn);
          }
          if (onload) onload();
          removeRunDependency();
        }
        if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
          if (onerror) onerror();
          removeRunDependency();
        })) {
          return;
        }
        finish(byteArray);
      }
      addRunDependency();
      if (typeof url == "string") {
        asyncLoad(url, (byteArray) => processData(byteArray), onerror);
      } else {
        processData(url);
      }
    };
    var FS_modeStringToFlags = (str) => {
      var flagModes = { "r": 0, "r+": 2, "w": 512 | 64 | 1, "w+": 512 | 64 | 2, "a": 1024 | 64 | 1, "a+": 1024 | 64 | 2 };
      var flags = flagModes[str];
      if (typeof flags == "undefined") {
        throw new Error(`Unknown file open mode: ${str}`);
      }
      return flags;
    };
    var FS_getMode = (canRead, canWrite) => {
      var mode = 0;
      if (canRead) mode |= 292 | 73;
      if (canWrite) mode |= 146;
      return mode;
    };
    var FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, ErrnoError: null, genericErrors: {}, filesystems: null, syncFSRequests: 0, lookupPath(path, opts = {}) {
      path = PATH_FS.resolve(path);
      if (!path) return { path: "", node: null };
      var defaults = { follow_mount: true, recurse_count: 0 };
      opts = Object.assign(defaults, opts);
      if (opts.recurse_count > 8) {
        throw new FS.ErrnoError(32);
      }
      var parts = path.split("/").filter((p) => !!p);
      var current = FS.root;
      var current_path = "/";
      for (var i = 0; i < parts.length; i++) {
        var islast = i === parts.length - 1;
        if (islast && opts.parent) {
          break;
        }
        current = FS.lookupNode(current, parts[i]);
        current_path = PATH.join2(current_path, parts[i]);
        if (FS.isMountpoint(current)) {
          if (!islast || islast && opts.follow_mount) {
            current = current.mounted.root;
          }
        }
        if (!islast || opts.follow) {
          var count = 0;
          while (FS.isLink(current.mode)) {
            var link = FS.readlink(current_path);
            current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
            var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 });
            current = lookup.node;
            if (count++ > 40) {
              throw new FS.ErrnoError(32);
            }
          }
        }
      }
      return { path: current_path, node: current };
    }, getPath(node) {
      var path;
      while (true) {
        if (FS.isRoot(node)) {
          var mount = node.mount.mountpoint;
          if (!path) return mount;
          return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
        }
        path = path ? `${node.name}/${path}` : node.name;
        node = node.parent;
      }
    }, hashName(parentid, name) {
      var hash = 0;
      for (var i = 0; i < name.length; i++) {
        hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
      }
      return (parentid + hash >>> 0) % FS.nameTable.length;
    }, hashAddNode(node) {
      var hash = FS.hashName(node.parent.id, node.name);
      node.name_next = FS.nameTable[hash];
      FS.nameTable[hash] = node;
    }, hashRemoveNode(node) {
      var hash = FS.hashName(node.parent.id, node.name);
      if (FS.nameTable[hash] === node) {
        FS.nameTable[hash] = node.name_next;
      } else {
        var current = FS.nameTable[hash];
        while (current) {
          if (current.name_next === node) {
            current.name_next = node.name_next;
            break;
          }
          current = current.name_next;
        }
      }
    }, lookupNode(parent, name) {
      var errCode = FS.mayLookup(parent);
      if (errCode) {
        throw new FS.ErrnoError(errCode, parent);
      }
      var hash = FS.hashName(parent.id, name);
      for (var node = FS.nameTable[hash]; node; node = node.name_next) {
        var nodeName = node.name;
        if (node.parent.id === parent.id && nodeName === name) {
          return node;
        }
      }
      return FS.lookup(parent, name);
    }, createNode(parent, name, mode, rdev) {
      var node = new FS.FSNode(parent, name, mode, rdev);
      FS.hashAddNode(node);
      return node;
    }, destroyNode(node) {
      FS.hashRemoveNode(node);
    }, isRoot(node) {
      return node === node.parent;
    }, isMountpoint(node) {
      return !!node.mounted;
    }, isFile(mode) {
      return (mode & 61440) === 32768;
    }, isDir(mode) {
      return (mode & 61440) === 16384;
    }, isLink(mode) {
      return (mode & 61440) === 40960;
    }, isChrdev(mode) {
      return (mode & 61440) === 8192;
    }, isBlkdev(mode) {
      return (mode & 61440) === 24576;
    }, isFIFO(mode) {
      return (mode & 61440) === 4096;
    }, isSocket(mode) {
      return (mode & 49152) === 49152;
    }, flagsToPermissionString(flag) {
      var perms = ["r", "w", "rw"][flag & 3];
      if (flag & 512) {
        perms += "w";
      }
      return perms;
    }, nodePermissions(node, perms) {
      if (FS.ignorePermissions) {
        return 0;
      }
      if (perms.includes("r") && !(node.mode & 292)) {
        return 2;
      } else if (perms.includes("w") && !(node.mode & 146)) {
        return 2;
      } else if (perms.includes("x") && !(node.mode & 73)) {
        return 2;
      }
      return 0;
    }, mayLookup(dir) {
      var errCode = FS.nodePermissions(dir, "x");
      if (errCode) return errCode;
      if (!dir.node_ops.lookup) return 2;
      return 0;
    }, mayCreate(dir, name) {
      try {
        var node = FS.lookupNode(dir, name);
        return 20;
      } catch (e) {
      }
      return FS.nodePermissions(dir, "wx");
    }, mayDelete(dir, name, isdir) {
      var node;
      try {
        node = FS.lookupNode(dir, name);
      } catch (e) {
        return e.errno;
      }
      var errCode = FS.nodePermissions(dir, "wx");
      if (errCode) {
        return errCode;
      }
      if (isdir) {
        if (!FS.isDir(node.mode)) {
          return 54;
        }
        if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
          return 10;
        }
      } else {
        if (FS.isDir(node.mode)) {
          return 31;
        }
      }
      return 0;
    }, mayOpen(node, flags) {
      if (!node) {
        return 44;
      }
      if (FS.isLink(node.mode)) {
        return 32;
      } else if (FS.isDir(node.mode)) {
        if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
          return 31;
        }
      }
      return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
    }, MAX_OPEN_FDS: 4096, nextfd() {
      for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
        if (!FS.streams[fd]) {
          return fd;
        }
      }
      throw new FS.ErrnoError(33);
    }, getStreamChecked(fd) {
      var stream = FS.getStream(fd);
      if (!stream) {
        throw new FS.ErrnoError(8);
      }
      return stream;
    }, getStream: (fd) => FS.streams[fd], createStream(stream, fd = -1) {
      if (!FS.FSStream) {
        FS.FSStream = function() {
          this.shared = {};
        };
        FS.FSStream.prototype = {};
        Object.defineProperties(FS.FSStream.prototype, { object: { get() {
          return this.node;
        }, set(val) {
          this.node = val;
        } }, isRead: { get() {
          return (this.flags & 2097155) !== 1;
        } }, isWrite: { get() {
          return (this.flags & 2097155) !== 0;
        } }, isAppend: { get() {
          return this.flags & 1024;
        } }, flags: { get() {
          return this.shared.flags;
        }, set(val) {
          this.shared.flags = val;
        } }, position: { get() {
          return this.shared.position;
        }, set(val) {
          this.shared.position = val;
        } } });
      }
      stream = Object.assign(new FS.FSStream(), stream);
      if (fd == -1) {
        fd = FS.nextfd();
      }
      stream.fd = fd;
      FS.streams[fd] = stream;
      return stream;
    }, closeStream(fd) {
      FS.streams[fd] = null;
    }, chrdev_stream_ops: { open(stream) {
      var device = FS.getDevice(stream.node.rdev);
      stream.stream_ops = device.stream_ops;
      if (stream.stream_ops.open) {
        stream.stream_ops.open(stream);
      }
    }, llseek() {
      throw new FS.ErrnoError(70);
    } }, major: (dev) => dev >> 8, minor: (dev) => dev & 255, makedev: (ma, mi) => ma << 8 | mi, registerDevice(dev, ops) {
      FS.devices[dev] = { stream_ops: ops };
    }, getDevice: (dev) => FS.devices[dev], getMounts(mount) {
      var mounts = [];
      var check = [mount];
      while (check.length) {
        var m = check.pop();
        mounts.push(m);
        check.push.apply(check, m.mounts);
      }
      return mounts;
    }, syncfs(populate, callback) {
      if (typeof populate == "function") {
        callback = populate;
        populate = false;
      }
      FS.syncFSRequests++;
      if (FS.syncFSRequests > 1) {
        err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
      }
      var mounts = FS.getMounts(FS.root.mount);
      var completed = 0;
      function doCallback(errCode) {
        FS.syncFSRequests--;
        return callback(errCode);
      }
      function done(errCode) {
        if (errCode) {
          if (!done.errored) {
            done.errored = true;
            return doCallback(errCode);
          }
          return;
        }
        if (++completed >= mounts.length) {
          doCallback(null);
        }
      }
      mounts.forEach((mount) => {
        if (!mount.type.syncfs) {
          return done(null);
        }
        mount.type.syncfs(mount, populate, done);
      });
    }, mount(type, opts, mountpoint) {
      var root = mountpoint === "/";
      var pseudo = !mountpoint;
      var node;
      if (root && FS.root) {
        throw new FS.ErrnoError(10);
      } else if (!root && !pseudo) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
        mountpoint = lookup.path;
        node = lookup.node;
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        if (!FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
      }
      var mount = { type, opts, mountpoint, mounts: [] };
      var mountRoot = type.mount(mount);
      mountRoot.mount = mount;
      mount.root = mountRoot;
      if (root) {
        FS.root = mountRoot;
      } else if (node) {
        node.mounted = mount;
        if (node.mount) {
          node.mount.mounts.push(mount);
        }
      }
      return mountRoot;
    }, unmount(mountpoint) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
      if (!FS.isMountpoint(lookup.node)) {
        throw new FS.ErrnoError(28);
      }
      var node = lookup.node;
      var mount = node.mounted;
      var mounts = FS.getMounts(mount);
      Object.keys(FS.nameTable).forEach((hash) => {
        var current = FS.nameTable[hash];
        while (current) {
          var next = current.name_next;
          if (mounts.includes(current.mount)) {
            FS.destroyNode(current);
          }
          current = next;
        }
      });
      node.mounted = null;
      var idx = node.mount.mounts.indexOf(mount);
      node.mount.mounts.splice(idx, 1);
    }, lookup(parent, name) {
      return parent.node_ops.lookup(parent, name);
    }, mknod(path, mode, dev) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      var name = PATH.basename(path);
      if (!name || name === "." || name === "..") {
        throw new FS.ErrnoError(28);
      }
      var errCode = FS.mayCreate(parent, name);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.mknod) {
        throw new FS.ErrnoError(63);
      }
      return parent.node_ops.mknod(parent, name, mode, dev);
    }, create(path, mode) {
      mode = mode !== void 0 ? mode : 438;
      mode &= 4095;
      mode |= 32768;
      return FS.mknod(path, mode, 0);
    }, mkdir(path, mode) {
      mode = mode !== void 0 ? mode : 511;
      mode &= 511 | 512;
      mode |= 16384;
      return FS.mknod(path, mode, 0);
    }, mkdirTree(path, mode) {
      var dirs = path.split("/");
      var d = "";
      for (var i = 0; i < dirs.length; ++i) {
        if (!dirs[i]) continue;
        d += "/" + dirs[i];
        try {
          FS.mkdir(d, mode);
        } catch (e) {
          if (e.errno != 20) throw e;
        }
      }
    }, mkdev(path, mode, dev) {
      if (typeof dev == "undefined") {
        dev = mode;
        mode = 438;
      }
      mode |= 8192;
      return FS.mknod(path, mode, dev);
    }, symlink(oldpath, newpath) {
      if (!PATH_FS.resolve(oldpath)) {
        throw new FS.ErrnoError(44);
      }
      var lookup = FS.lookupPath(newpath, { parent: true });
      var parent = lookup.node;
      if (!parent) {
        throw new FS.ErrnoError(44);
      }
      var newname = PATH.basename(newpath);
      var errCode = FS.mayCreate(parent, newname);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.symlink) {
        throw new FS.ErrnoError(63);
      }
      return parent.node_ops.symlink(parent, newname, oldpath);
    }, rename(old_path, new_path) {
      var old_dirname = PATH.dirname(old_path);
      var new_dirname = PATH.dirname(new_path);
      var old_name = PATH.basename(old_path);
      var new_name = PATH.basename(new_path);
      var lookup, old_dir, new_dir;
      lookup = FS.lookupPath(old_path, { parent: true });
      old_dir = lookup.node;
      lookup = FS.lookupPath(new_path, { parent: true });
      new_dir = lookup.node;
      if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
      if (old_dir.mount !== new_dir.mount) {
        throw new FS.ErrnoError(75);
      }
      var old_node = FS.lookupNode(old_dir, old_name);
      var relative = PATH_FS.relative(old_path, new_dirname);
      if (relative.charAt(0) !== ".") {
        throw new FS.ErrnoError(28);
      }
      relative = PATH_FS.relative(new_path, old_dirname);
      if (relative.charAt(0) !== ".") {
        throw new FS.ErrnoError(55);
      }
      var new_node;
      try {
        new_node = FS.lookupNode(new_dir, new_name);
      } catch (e) {
      }
      if (old_node === new_node) {
        return;
      }
      var isdir = FS.isDir(old_node.mode);
      var errCode = FS.mayDelete(old_dir, old_name, isdir);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!old_dir.node_ops.rename) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
        throw new FS.ErrnoError(10);
      }
      if (new_dir !== old_dir) {
        errCode = FS.nodePermissions(old_dir, "w");
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
      }
      FS.hashRemoveNode(old_node);
      try {
        old_dir.node_ops.rename(old_node, new_dir, new_name);
      } catch (e) {
        throw e;
      } finally {
        FS.hashAddNode(old_node);
      }
    }, rmdir(path) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      var name = PATH.basename(path);
      var node = FS.lookupNode(parent, name);
      var errCode = FS.mayDelete(parent, name, true);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.rmdir) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      parent.node_ops.rmdir(parent, name);
      FS.destroyNode(node);
    }, readdir(path) {
      var lookup = FS.lookupPath(path, { follow: true });
      var node = lookup.node;
      if (!node.node_ops.readdir) {
        throw new FS.ErrnoError(54);
      }
      return node.node_ops.readdir(node);
    }, unlink(path) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      if (!parent) {
        throw new FS.ErrnoError(44);
      }
      var name = PATH.basename(path);
      var node = FS.lookupNode(parent, name);
      var errCode = FS.mayDelete(parent, name, false);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.unlink) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      parent.node_ops.unlink(parent, name);
      FS.destroyNode(node);
    }, readlink(path) {
      var lookup = FS.lookupPath(path);
      var link = lookup.node;
      if (!link) {
        throw new FS.ErrnoError(44);
      }
      if (!link.node_ops.readlink) {
        throw new FS.ErrnoError(28);
      }
      return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
    }, stat(path, dontFollow) {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      var node = lookup.node;
      if (!node) {
        throw new FS.ErrnoError(44);
      }
      if (!node.node_ops.getattr) {
        throw new FS.ErrnoError(63);
      }
      return node.node_ops.getattr(node);
    }, lstat(path) {
      return FS.stat(path, true);
    }, chmod(path, mode, dontFollow) {
      var node;
      if (typeof path == "string") {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        node = lookup.node;
      } else {
        node = path;
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(63);
      }
      node.node_ops.setattr(node, { mode: mode & 4095 | node.mode & ~4095, timestamp: Date.now() });
    }, lchmod(path, mode) {
      FS.chmod(path, mode, true);
    }, fchmod(fd, mode) {
      var stream = FS.getStreamChecked(fd);
      FS.chmod(stream.node, mode);
    }, chown(path, uid, gid, dontFollow) {
      var node;
      if (typeof path == "string") {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        node = lookup.node;
      } else {
        node = path;
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(63);
      }
      node.node_ops.setattr(node, { timestamp: Date.now() });
    }, lchown(path, uid, gid) {
      FS.chown(path, uid, gid, true);
    }, fchown(fd, uid, gid) {
      var stream = FS.getStreamChecked(fd);
      FS.chown(stream.node, uid, gid);
    }, truncate(path, len) {
      if (len < 0) {
        throw new FS.ErrnoError(28);
      }
      var node;
      if (typeof path == "string") {
        var lookup = FS.lookupPath(path, { follow: true });
        node = lookup.node;
      } else {
        node = path;
      }
      if (!node.node_ops.setattr) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isDir(node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!FS.isFile(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      var errCode = FS.nodePermissions(node, "w");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      node.node_ops.setattr(node, { size: len, timestamp: Date.now() });
    }, ftruncate(fd, len) {
      var stream = FS.getStreamChecked(fd);
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(28);
      }
      FS.truncate(stream.node, len);
    }, utime(path, atime, mtime) {
      var lookup = FS.lookupPath(path, { follow: true });
      var node = lookup.node;
      node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) });
    }, open(path, flags, mode) {
      if (path === "") {
        throw new FS.ErrnoError(44);
      }
      flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
      mode = typeof mode == "undefined" ? 438 : mode;
      if (flags & 64) {
        mode = mode & 4095 | 32768;
      } else {
        mode = 0;
      }
      var node;
      if (typeof path == "object") {
        node = path;
      } else {
        path = PATH.normalize(path);
        try {
          var lookup = FS.lookupPath(path, { follow: !(flags & 131072) });
          node = lookup.node;
        } catch (e) {
        }
      }
      var created = false;
      if (flags & 64) {
        if (node) {
          if (flags & 128) {
            throw new FS.ErrnoError(20);
          }
        } else {
          node = FS.mknod(path, mode, 0);
          created = true;
        }
      }
      if (!node) {
        throw new FS.ErrnoError(44);
      }
      if (FS.isChrdev(node.mode)) {
        flags &= ~512;
      }
      if (flags & 65536 && !FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54);
      }
      if (!created) {
        var errCode = FS.mayOpen(node, flags);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
      }
      if (flags & 512 && !created) {
        FS.truncate(node, 0);
      }
      flags &= ~(128 | 512 | 131072);
      var stream = FS.createStream({ node, path: FS.getPath(node), flags, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false });
      if (stream.stream_ops.open) {
        stream.stream_ops.open(stream);
      }
      if (Module2["logReadFiles"] && !(flags & 1)) {
        if (!FS.readFiles) FS.readFiles = {};
        if (!(path in FS.readFiles)) {
          FS.readFiles[path] = 1;
        }
      }
      return stream;
    }, close(stream) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if (stream.getdents) stream.getdents = null;
      try {
        if (stream.stream_ops.close) {
          stream.stream_ops.close(stream);
        }
      } catch (e) {
        throw e;
      } finally {
        FS.closeStream(stream.fd);
      }
      stream.fd = null;
    }, isClosed(stream) {
      return stream.fd === null;
    }, llseek(stream, offset, whence) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if (!stream.seekable || !stream.stream_ops.llseek) {
        throw new FS.ErrnoError(70);
      }
      if (whence != 0 && whence != 1 && whence != 2) {
        throw new FS.ErrnoError(28);
      }
      stream.position = stream.stream_ops.llseek(stream, offset, whence);
      stream.ungotten = [];
      return stream.position;
    }, read(stream, buffer, offset, length, position) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28);
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(8);
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!stream.stream_ops.read) {
        throw new FS.ErrnoError(28);
      }
      var seeking = typeof position != "undefined";
      if (!seeking) {
        position = stream.position;
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70);
      }
      var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
      if (!seeking) stream.position += bytesRead;
      return bytesRead;
    }, write(stream, buffer, offset, length, position, canOwn) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28);
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(8);
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!stream.stream_ops.write) {
        throw new FS.ErrnoError(28);
      }
      if (stream.seekable && stream.flags & 1024) {
        FS.llseek(stream, 0, 2);
      }
      var seeking = typeof position != "undefined";
      if (!seeking) {
        position = stream.position;
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70);
      }
      var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
      if (!seeking) stream.position += bytesWritten;
      return bytesWritten;
    }, allocate(stream, offset, length) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if (offset < 0 || length <= 0) {
        throw new FS.ErrnoError(28);
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(8);
      }
      if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      if (!stream.stream_ops.allocate) {
        throw new FS.ErrnoError(138);
      }
      stream.stream_ops.allocate(stream, offset, length);
    }, mmap(stream, length, position, prot, flags) {
      if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
        throw new FS.ErrnoError(2);
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(2);
      }
      if (!stream.stream_ops.mmap) {
        throw new FS.ErrnoError(43);
      }
      return stream.stream_ops.mmap(stream, length, position, prot, flags);
    }, msync(stream, buffer, offset, length, mmapFlags) {
      if (!stream.stream_ops.msync) {
        return 0;
      }
      return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
    }, munmap: (stream) => 0, ioctl(stream, cmd, arg) {
      if (!stream.stream_ops.ioctl) {
        throw new FS.ErrnoError(59);
      }
      return stream.stream_ops.ioctl(stream, cmd, arg);
    }, readFile(path, opts = {}) {
      opts.flags = opts.flags || 0;
      opts.encoding = opts.encoding || "binary";
      if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
        throw new Error(`Invalid encoding type "${opts.encoding}"`);
      }
      var ret;
      var stream = FS.open(path, opts.flags);
      var stat = FS.stat(path);
      var length = stat.size;
      var buf = new Uint8Array(length);
      FS.read(stream, buf, 0, length, 0);
      if (opts.encoding === "utf8") {
        ret = UTF8ArrayToString(buf, 0);
      } else if (opts.encoding === "binary") {
        ret = buf;
      }
      FS.close(stream);
      return ret;
    }, writeFile(path, data, opts = {}) {
      opts.flags = opts.flags || 577;
      var stream = FS.open(path, opts.flags, opts.mode);
      if (typeof data == "string") {
        var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
        var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
        FS.write(stream, buf, 0, actualNumBytes, void 0, opts.canOwn);
      } else if (ArrayBuffer.isView(data)) {
        FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
      } else {
        throw new Error("Unsupported data type");
      }
      FS.close(stream);
    }, cwd: () => FS.currentPath, chdir(path) {
      var lookup = FS.lookupPath(path, { follow: true });
      if (lookup.node === null) {
        throw new FS.ErrnoError(44);
      }
      if (!FS.isDir(lookup.node.mode)) {
        throw new FS.ErrnoError(54);
      }
      var errCode = FS.nodePermissions(lookup.node, "x");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      FS.currentPath = lookup.path;
    }, createDefaultDirectories() {
      FS.mkdir("/tmp");
      FS.mkdir("/home");
      FS.mkdir("/home/web_user");
    }, createDefaultDevices() {
      FS.mkdir("/dev");
      FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (stream, buffer, offset, length, pos) => length });
      FS.mkdev("/dev/null", FS.makedev(1, 3));
      TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
      TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
      FS.mkdev("/dev/tty", FS.makedev(5, 0));
      FS.mkdev("/dev/tty1", FS.makedev(6, 0));
      var randomBuffer = new Uint8Array(1024), randomLeft = 0;
      var randomByte = () => {
        if (randomLeft === 0) {
          randomLeft = randomFill(randomBuffer).byteLength;
        }
        return randomBuffer[--randomLeft];
      };
      FS.createDevice("/dev", "random", randomByte);
      FS.createDevice("/dev", "urandom", randomByte);
      FS.mkdir("/dev/shm");
      FS.mkdir("/dev/shm/tmp");
    }, createSpecialDirectories() {
      FS.mkdir("/proc");
      var proc_self = FS.mkdir("/proc/self");
      FS.mkdir("/proc/self/fd");
      FS.mount({ mount() {
        var node = FS.createNode(proc_self, "fd", 16384 | 511, 73);
        node.node_ops = { lookup(parent, name) {
          var fd = +name;
          var stream = FS.getStreamChecked(fd);
          var ret = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => stream.path } };
          ret.parent = ret;
          return ret;
        } };
        return node;
      } }, {}, "/proc/self/fd");
    }, createStandardStreams() {
      if (Module2["stdin"]) {
        FS.createDevice("/dev", "stdin", Module2["stdin"]);
      } else {
        FS.symlink("/dev/tty", "/dev/stdin");
      }
      if (Module2["stdout"]) {
        FS.createDevice("/dev", "stdout", null, Module2["stdout"]);
      } else {
        FS.symlink("/dev/tty", "/dev/stdout");
      }
      if (Module2["stderr"]) {
        FS.createDevice("/dev", "stderr", null, Module2["stderr"]);
      } else {
        FS.symlink("/dev/tty1", "/dev/stderr");
      }
      FS.open("/dev/stdin", 0);
      FS.open("/dev/stdout", 1);
      FS.open("/dev/stderr", 1);
    }, ensureErrnoError() {
      if (FS.ErrnoError) return;
      FS.ErrnoError = function ErrnoError(errno, node) {
        this.name = "ErrnoError";
        this.node = node;
        this.setErrno = function(errno2) {
          this.errno = errno2;
        };
        this.setErrno(errno);
        this.message = "FS error";
      };
      FS.ErrnoError.prototype = new Error();
      FS.ErrnoError.prototype.constructor = FS.ErrnoError;
      [44].forEach((code) => {
        FS.genericErrors[code] = new FS.ErrnoError(code);
        FS.genericErrors[code].stack = "<generic error, no stack>";
      });
    }, staticInit() {
      FS.ensureErrnoError();
      FS.nameTable = new Array(4096);
      FS.mount(MEMFS, {}, "/");
      FS.createDefaultDirectories();
      FS.createDefaultDevices();
      FS.createSpecialDirectories();
      FS.filesystems = { "MEMFS": MEMFS };
    }, init(input, output, error) {
      FS.init.initialized = true;
      FS.ensureErrnoError();
      Module2["stdin"] = input || Module2["stdin"];
      Module2["stdout"] = output || Module2["stdout"];
      Module2["stderr"] = error || Module2["stderr"];
      FS.createStandardStreams();
    }, quit() {
      FS.init.initialized = false;
      for (var i = 0; i < FS.streams.length; i++) {
        var stream = FS.streams[i];
        if (!stream) {
          continue;
        }
        FS.close(stream);
      }
    }, findObject(path, dontResolveLastLink) {
      var ret = FS.analyzePath(path, dontResolveLastLink);
      if (!ret.exists) {
        return null;
      }
      return ret.object;
    }, analyzePath(path, dontResolveLastLink) {
      try {
        var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
        path = lookup.path;
      } catch (e) {
      }
      var ret = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null };
      try {
        var lookup = FS.lookupPath(path, { parent: true });
        ret.parentExists = true;
        ret.parentPath = lookup.path;
        ret.parentObject = lookup.node;
        ret.name = PATH.basename(path);
        lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
        ret.exists = true;
        ret.path = lookup.path;
        ret.object = lookup.node;
        ret.name = lookup.node.name;
        ret.isRoot = lookup.path === "/";
      } catch (e) {
        ret.error = e.errno;
      }
      return ret;
    }, createPath(parent, path, canRead, canWrite) {
      parent = typeof parent == "string" ? parent : FS.getPath(parent);
      var parts = path.split("/").reverse();
      while (parts.length) {
        var part = parts.pop();
        if (!part) continue;
        var current = PATH.join2(parent, part);
        try {
          FS.mkdir(current);
        } catch (e) {
        }
        parent = current;
      }
      return current;
    }, createFile(parent, name, properties, canRead, canWrite) {
      var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
      var mode = FS_getMode(canRead, canWrite);
      return FS.create(path, mode);
    }, createDataFile(parent, name, data, canRead, canWrite, canOwn) {
      var path = name;
      if (parent) {
        parent = typeof parent == "string" ? parent : FS.getPath(parent);
        path = name ? PATH.join2(parent, name) : parent;
      }
      var mode = FS_getMode(canRead, canWrite);
      var node = FS.create(path, mode);
      if (data) {
        if (typeof data == "string") {
          var arr = new Array(data.length);
          for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
          data = arr;
        }
        FS.chmod(node, mode | 146);
        var stream = FS.open(node, 577);
        FS.write(stream, data, 0, data.length, 0, canOwn);
        FS.close(stream);
        FS.chmod(node, mode);
      }
      return node;
    }, createDevice(parent, name, input, output) {
      var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
      var mode = FS_getMode(!!input, !!output);
      if (!FS.createDevice.major) FS.createDevice.major = 64;
      var dev = FS.makedev(FS.createDevice.major++, 0);
      FS.registerDevice(dev, { open(stream) {
        stream.seekable = false;
      }, close(stream) {
        if (output && output.buffer && output.buffer.length) {
          output(10);
        }
      }, read(stream, buffer, offset, length, pos) {
        var bytesRead = 0;
        for (var i = 0; i < length; i++) {
          var result;
          try {
            result = input();
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (result === void 0 && bytesRead === 0) {
            throw new FS.ErrnoError(6);
          }
          if (result === null || result === void 0) break;
          bytesRead++;
          buffer[offset + i] = result;
        }
        if (bytesRead) {
          stream.node.timestamp = Date.now();
        }
        return bytesRead;
      }, write(stream, buffer, offset, length, pos) {
        for (var i = 0; i < length; i++) {
          try {
            output(buffer[offset + i]);
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
        if (length) {
          stream.node.timestamp = Date.now();
        }
        return i;
      } });
      return FS.mkdev(path, mode, dev);
    }, forceLoadFile(obj) {
      if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
      if (typeof XMLHttpRequest != "undefined") {
        throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
      } else if (read_) {
        try {
          obj.contents = intArrayFromString(read_(obj.url), true);
          obj.usedBytes = obj.contents.length;
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
      } else {
        throw new Error("Cannot load without read() or XMLHttpRequest.");
      }
    }, createLazyFile(parent, name, url, canRead, canWrite) {
      function LazyUint8Array() {
        this.lengthKnown = false;
        this.chunks = [];
      }
      LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
        if (idx > this.length - 1 || idx < 0) {
          return void 0;
        }
        var chunkOffset = idx % this.chunkSize;
        var chunkNum = idx / this.chunkSize | 0;
        return this.getter(chunkNum)[chunkOffset];
      };
      LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
        this.getter = getter;
      };
      LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", url, false);
        xhr.send(null);
        if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
        var datalength = Number(xhr.getResponseHeader("Content-length"));
        var header;
        var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
        var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
        var chunkSize = 1024 * 1024;
        if (!hasByteServing) chunkSize = datalength;
        var doXHR = (from, to) => {
          if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
          if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
          var xhr2 = new XMLHttpRequest();
          xhr2.open("GET", url, false);
          if (datalength !== chunkSize) xhr2.setRequestHeader("Range", "bytes=" + from + "-" + to);
          xhr2.responseType = "arraybuffer";
          if (xhr2.overrideMimeType) {
            xhr2.overrideMimeType("text/plain; charset=x-user-defined");
          }
          xhr2.send(null);
          if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr2.status);
          if (xhr2.response !== void 0) {
            return new Uint8Array(xhr2.response || []);
          }
          return intArrayFromString(xhr2.responseText || "", true);
        };
        var lazyArray2 = this;
        lazyArray2.setDataGetter((chunkNum) => {
          var start = chunkNum * chunkSize;
          var end = (chunkNum + 1) * chunkSize - 1;
          end = Math.min(end, datalength - 1);
          if (typeof lazyArray2.chunks[chunkNum] == "undefined") {
            lazyArray2.chunks[chunkNum] = doXHR(start, end);
          }
          if (typeof lazyArray2.chunks[chunkNum] == "undefined") throw new Error("doXHR failed!");
          return lazyArray2.chunks[chunkNum];
        });
        if (usesGzip || !datalength) {
          chunkSize = datalength = 1;
          datalength = this.getter(0).length;
          chunkSize = datalength;
          out("LazyFiles on gzip forces download of the whole file when length is accessed");
        }
        this._length = datalength;
        this._chunkSize = chunkSize;
        this.lengthKnown = true;
      };
      if (typeof XMLHttpRequest != "undefined") {
        if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
        var lazyArray = new LazyUint8Array();
        Object.defineProperties(lazyArray, { length: { get: function() {
          if (!this.lengthKnown) {
            this.cacheLength();
          }
          return this._length;
        } }, chunkSize: { get: function() {
          if (!this.lengthKnown) {
            this.cacheLength();
          }
          return this._chunkSize;
        } } });
        var properties = { isDevice: false, contents: lazyArray };
      } else {
        var properties = { isDevice: false, url };
      }
      var node = FS.createFile(parent, name, properties, canRead, canWrite);
      if (properties.contents) {
        node.contents = properties.contents;
      } else if (properties.url) {
        node.contents = null;
        node.url = properties.url;
      }
      Object.defineProperties(node, { usedBytes: { get: function() {
        return this.contents.length;
      } } });
      var stream_ops = {};
      var keys = Object.keys(node.stream_ops);
      keys.forEach((key) => {
        var fn = node.stream_ops[key];
        stream_ops[key] = function forceLoadLazyFile() {
          FS.forceLoadFile(node);
          return fn.apply(null, arguments);
        };
      });
      function writeChunks(stream, buffer, offset, length, position) {
        var contents = stream.node.contents;
        if (position >= contents.length) return 0;
        var size = Math.min(contents.length - position, length);
        if (contents.slice) {
          for (var i = 0; i < size; i++) {
            buffer[offset + i] = contents[position + i];
          }
        } else {
          for (var i = 0; i < size; i++) {
            buffer[offset + i] = contents.get(position + i);
          }
        }
        return size;
      }
      stream_ops.read = (stream, buffer, offset, length, position) => {
        FS.forceLoadFile(node);
        return writeChunks(stream, buffer, offset, length, position);
      };
      stream_ops.mmap = (stream, length, position, prot, flags) => {
        FS.forceLoadFile(node);
        var ptr = mmapAlloc(length);
        if (!ptr) {
          throw new FS.ErrnoError(48);
        }
        writeChunks(stream, HEAP8, ptr, length, position);
        return { ptr, allocated: true };
      };
      node.stream_ops = stream_ops;
      return node;
    } };
    var SYSCALLS = { DEFAULT_POLLMASK: 5, calculateAt(dirfd, path, allowEmpty) {
      if (PATH.isAbs(path)) {
        return path;
      }
      var dir;
      if (dirfd === -100) {
        dir = FS.cwd();
      } else {
        var dirstream = SYSCALLS.getStreamFromFD(dirfd);
        dir = dirstream.path;
      }
      if (path.length == 0) {
        if (!allowEmpty) {
          throw new FS.ErrnoError(44);
        }
        return dir;
      }
      return PATH.join2(dir, path);
    }, doStat(func, path, buf) {
      try {
        var stat = func(path);
      } catch (e) {
        if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
          return -54;
        }
        throw e;
      }
      HEAP32[buf >> 2] = stat.dev;
      HEAP32[buf + 4 >> 2] = stat.mode;
      HEAPU32[buf + 8 >> 2] = stat.nlink;
      HEAP32[buf + 12 >> 2] = stat.uid;
      HEAP32[buf + 16 >> 2] = stat.gid;
      HEAP32[buf + 20 >> 2] = stat.rdev;
      tempI64 = [stat.size >>> 0, (tempDouble = stat.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 24 >> 2] = tempI64[0], HEAP32[buf + 28 >> 2] = tempI64[1];
      HEAP32[buf + 32 >> 2] = 4096;
      HEAP32[buf + 36 >> 2] = stat.blocks;
      var atime = stat.atime.getTime();
      var mtime = stat.mtime.getTime();
      var ctime = stat.ctime.getTime();
      tempI64 = [Math.floor(atime / 1e3) >>> 0, (tempDouble = Math.floor(atime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
      HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3;
      tempI64 = [Math.floor(mtime / 1e3) >>> 0, (tempDouble = Math.floor(mtime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 56 >> 2] = tempI64[0], HEAP32[buf + 60 >> 2] = tempI64[1];
      HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3;
      tempI64 = [Math.floor(ctime / 1e3) >>> 0, (tempDouble = Math.floor(ctime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 72 >> 2] = tempI64[0], HEAP32[buf + 76 >> 2] = tempI64[1];
      HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3;
      tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 88 >> 2] = tempI64[0], HEAP32[buf + 92 >> 2] = tempI64[1];
      return 0;
    }, doMsync(addr, stream, len, flags, offset) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      if (flags & 2) {
        return 0;
      }
      var buffer = HEAPU8.slice(addr, addr + len);
      FS.msync(stream, buffer, offset, len, flags);
    }, varargs: void 0, get() {
      var ret = HEAP32[+SYSCALLS.varargs >> 2];
      SYSCALLS.varargs += 4;
      return ret;
    }, getp() {
      return SYSCALLS.get();
    }, getStr(ptr) {
      var ret = UTF8ToString(ptr);
      return ret;
    }, getStreamFromFD(fd) {
      var stream = FS.getStreamChecked(fd);
      return stream;
    } };
    function ___syscall_chmod(path, mode) {
      try {
        path = SYSCALLS.getStr(path);
        FS.chmod(path, mode);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    function ___syscall_faccessat(dirfd, path, amode, flags) {
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        if (amode & ~7) {
          return -28;
        }
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node) {
          return -44;
        }
        var perms = "";
        if (amode & 4) perms += "r";
        if (amode & 2) perms += "w";
        if (amode & 1) perms += "x";
        if (perms && FS.nodePermissions(node, perms)) {
          return -2;
        }
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    function ___syscall_fchmod(fd, mode) {
      try {
        FS.fchmod(fd, mode);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    function ___syscall_fchown32(fd, owner, group) {
      try {
        FS.fchown(fd, owner, group);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    var setErrNo = (value) => {
      HEAP32[___errno_location() >> 2] = value;
      return value;
    };
    function ___syscall_fcntl64(fd, cmd, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        switch (cmd) {
          case 0: {
            var arg = SYSCALLS.get();
            if (arg < 0) {
              return -28;
            }
            while (FS.streams[arg]) {
              arg++;
            }
            var newStream;
            newStream = FS.createStream(stream, arg);
            return newStream.fd;
          }
          case 1:
          case 2:
            return 0;
          case 3:
            return stream.flags;
          case 4: {
            var arg = SYSCALLS.get();
            stream.flags |= arg;
            return 0;
          }
          case 5: {
            var arg = SYSCALLS.getp();
            var offset = 0;
            HEAP16[arg + offset >> 1] = 2;
            return 0;
          }
          case 6:
          case 7:
            return 0;
          case 16:
          case 8:
            return -28;
          case 9:
            setErrNo(28);
            return -1;
          default: {
            return -28;
          }
        }
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    function ___syscall_fstat64(fd, buf) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        return SYSCALLS.doStat(FS.stat, stream.path, buf);
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    var convertI32PairToI53Checked = (lo, hi) => hi + 2097152 >>> 0 < 4194305 - !!lo ? (lo >>> 0) + hi * 4294967296 : NaN;
    function ___syscall_ftruncate64(fd, length_low, length_high) {
      var length = convertI32PairToI53Checked(length_low, length_high);
      try {
        if (isNaN(length)) return 61;
        FS.ftruncate(fd, length);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    function ___syscall_getcwd(buf, size) {
      try {
        if (size === 0) return -28;
        var cwd = FS.cwd();
        var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
        if (size < cwdLengthInBytes) return -68;
        stringToUTF8(cwd, buf, size);
        return cwdLengthInBytes;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    function ___syscall_lstat64(path, buf) {
      try {
        path = SYSCALLS.getStr(path);
        return SYSCALLS.doStat(FS.lstat, path, buf);
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    function ___syscall_mkdirat(dirfd, path, mode) {
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        path = PATH.normalize(path);
        if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
        FS.mkdir(path, mode, 0);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    function ___syscall_newfstatat(dirfd, path, buf, flags) {
      try {
        path = SYSCALLS.getStr(path);
        var nofollow = flags & 256;
        var allowEmpty = flags & 4096;
        flags = flags & ~6400;
        path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
        return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    function ___syscall_openat(dirfd, path, flags, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        var mode = varargs ? SYSCALLS.get() : 0;
        return FS.open(path, flags, mode).fd;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        if (bufsize <= 0) return -28;
        var ret = FS.readlink(path);
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = HEAP8[buf + len];
        stringToUTF8(ret, buf, bufsize + 1);
        HEAP8[buf + len] = endChar;
        return len;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    function ___syscall_rmdir(path) {
      try {
        path = SYSCALLS.getStr(path);
        FS.rmdir(path);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    function ___syscall_stat64(path, buf) {
      try {
        path = SYSCALLS.getStr(path);
        return SYSCALLS.doStat(FS.stat, path, buf);
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    function ___syscall_unlinkat(dirfd, path, flags) {
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        if (flags === 0) {
          FS.unlink(path);
        } else if (flags === 512) {
          FS.rmdir(path);
        } else {
          abort("Invalid flags passed to unlinkat");
        }
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    var readI53FromI64 = (ptr) => HEAPU32[ptr >> 2] + HEAP32[ptr + 4 >> 2] * 4294967296;
    function ___syscall_utimensat(dirfd, path, times, flags) {
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path, true);
        if (!times) {
          var atime = Date.now();
          var mtime = atime;
        } else {
          var seconds = readI53FromI64(times);
          var nanoseconds = HEAP32[times + 8 >> 2];
          atime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
          times += 16;
          seconds = readI53FromI64(times);
          nanoseconds = HEAP32[times + 8 >> 2];
          mtime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
        }
        FS.utime(path, atime, mtime);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    var isLeapYear = (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    var MONTH_DAYS_LEAP_CUMULATIVE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
    var MONTH_DAYS_REGULAR_CUMULATIVE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var ydayFromDate = (date) => {
      var leap = isLeapYear(date.getFullYear());
      var monthDaysCumulative = leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE;
      var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
      return yday;
    };
    function __localtime_js(time_low, time_high, tmPtr) {
      var time = convertI32PairToI53Checked(time_low, time_high);
      var date = new Date(time * 1e3);
      HEAP32[tmPtr >> 2] = date.getSeconds();
      HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
      HEAP32[tmPtr + 8 >> 2] = date.getHours();
      HEAP32[tmPtr + 12 >> 2] = date.getDate();
      HEAP32[tmPtr + 16 >> 2] = date.getMonth();
      HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
      HEAP32[tmPtr + 24 >> 2] = date.getDay();
      var yday = ydayFromDate(date) | 0;
      HEAP32[tmPtr + 28 >> 2] = yday;
      HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
      var start = new Date(date.getFullYear(), 0, 1);
      var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
      var winterOffset = start.getTimezoneOffset();
      var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
      HEAP32[tmPtr + 32 >> 2] = dst;
    }
    function __mmap_js(len, prot, flags, fd, offset_low, offset_high, allocated, addr) {
      var offset = convertI32PairToI53Checked(offset_low, offset_high);
      try {
        if (isNaN(offset)) return 61;
        var stream = SYSCALLS.getStreamFromFD(fd);
        var res = FS.mmap(stream, len, offset, prot, flags);
        var ptr = res.ptr;
        HEAP32[allocated >> 2] = res.allocated;
        HEAPU32[addr >> 2] = ptr;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    function __munmap_js(addr, len, prot, flags, fd, offset_low, offset_high) {
      var offset = convertI32PairToI53Checked(offset_low, offset_high);
      try {
        if (isNaN(offset)) return 61;
        var stream = SYSCALLS.getStreamFromFD(fd);
        if (prot & 2) {
          SYSCALLS.doMsync(addr, stream, len, flags, offset);
        }
        FS.munmap(stream);
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    var stringToNewUTF8 = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret) stringToUTF8(str, ret, size);
      return ret;
    };
    var __tzset_js = (timezone, daylight, tzname) => {
      var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
      HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
      HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
      function extractZone(date) {
        var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
        return match ? match[1] : "GMT";
      }
      var winterName = extractZone(winter);
      var summerName = extractZone(summer);
      var winterNamePtr = stringToNewUTF8(winterName);
      var summerNamePtr = stringToNewUTF8(summerName);
      if (summerOffset < winterOffset) {
        HEAPU32[tzname >> 2] = winterNamePtr;
        HEAPU32[tzname + 4 >> 2] = summerNamePtr;
      } else {
        HEAPU32[tzname >> 2] = summerNamePtr;
        HEAPU32[tzname + 4 >> 2] = winterNamePtr;
      }
    };
    var _emscripten_date_now = () => Date.now();
    var _emscripten_get_now;
    _emscripten_get_now = () => performance.now();
    var getHeapMax = () => 2147483648;
    var growMemory = (size) => {
      var b = wasmMemory.buffer;
      var pages = (size - b.byteLength + 65535) / 65536;
      try {
        wasmMemory.grow(pages);
        updateMemoryViews();
        return 1;
      } catch (e) {
      }
    };
    var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      requestedSize >>>= 0;
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        return false;
      }
      var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
        var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
        var replacement = growMemory(newSize);
        if (replacement) {
          return true;
        }
      }
      return false;
    };
    var ENV = {};
    var getExecutableName = () => thisProgram || "./this.program";
    var getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
        var env = { "USER": "web_user", "LOGNAME": "web_user", "PATH": "/", "PWD": "/", "HOME": "/home/web_user", "LANG": lang, "_": getExecutableName() };
        for (var x in ENV) {
          if (ENV[x] === void 0) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(`${x}=${env[x]}`);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    };
    var stringToAscii = (str, buffer) => {
      for (var i = 0; i < str.length; ++i) {
        HEAP8[buffer++ >> 0] = str.charCodeAt(i);
      }
      HEAP8[buffer >> 0] = 0;
    };
    var _environ_get = (__environ, environ_buf) => {
      var bufSize = 0;
      getEnvStrings().forEach((string, i) => {
        var ptr = environ_buf + bufSize;
        HEAPU32[__environ + i * 4 >> 2] = ptr;
        stringToAscii(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    };
    var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
      var strings = getEnvStrings();
      HEAPU32[penviron_count >> 2] = strings.length;
      var bufSize = 0;
      strings.forEach((string) => bufSize += string.length + 1);
      HEAPU32[penviron_buf_size >> 2] = bufSize;
      return 0;
    };
    function _fd_close(fd) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.close(stream);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return e.errno;
      }
    }
    function _fd_fdstat_get(fd, pbuf) {
      try {
        var rightsBase = 0;
        var rightsInheriting = 0;
        var flags = 0;
        {
          var stream = SYSCALLS.getStreamFromFD(fd);
          var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4;
        }
        HEAP8[pbuf >> 0] = type;
        HEAP16[pbuf + 2 >> 1] = flags;
        tempI64 = [rightsBase >>> 0, (tempDouble = rightsBase, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[pbuf + 8 >> 2] = tempI64[0], HEAP32[pbuf + 12 >> 2] = tempI64[1];
        tempI64 = [rightsInheriting >>> 0, (tempDouble = rightsInheriting, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[pbuf + 16 >> 2] = tempI64[0], HEAP32[pbuf + 20 >> 2] = tempI64[1];
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return e.errno;
      }
    }
    var doReadv = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[iov + 4 >> 2];
        iov += 8;
        var curr = FS.read(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break;
        if (typeof offset !== "undefined") {
          offset += curr;
        }
      }
      return ret;
    };
    function _fd_read(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = doReadv(stream, iov, iovcnt);
        HEAPU32[pnum >> 2] = num;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return e.errno;
      }
    }
    function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
      var offset = convertI32PairToI53Checked(offset_low, offset_high);
      try {
        if (isNaN(offset)) return 61;
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.llseek(stream, offset, whence);
        tempI64 = [stream.position >>> 0, (tempDouble = stream.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
        if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return e.errno;
      }
    }
    function _fd_sync(fd) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        if (stream.stream_ops && stream.stream_ops.fsync) {
          return stream.stream_ops.fsync(stream);
        }
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return e.errno;
      }
    }
    var doWritev = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[iov + 4 >> 2];
        iov += 8;
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (typeof offset !== "undefined") {
          offset += curr;
        }
      }
      return ret;
    };
    function _fd_write(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = doWritev(stream, iov, iovcnt);
        HEAPU32[pnum >> 2] = num;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return e.errno;
      }
    }
    var adapters_support = function() {
      const handleAsync = typeof Asyncify === "object" ? Asyncify.handleAsync.bind(Asyncify) : null;
      Module2["handleAsync"] = handleAsync;
      const targets = /* @__PURE__ */ new Map();
      Module2["setCallback"] = (key, target) => targets.set(key, target);
      Module2["getCallback"] = (key) => targets.get(key);
      Module2["deleteCallback"] = (key) => targets.delete(key);
      adapters_support = function(isAsync, key, ...args) {
        const receiver = targets.get(key);
        let methodName = null;
        const f = typeof receiver === "function" ? receiver : receiver[methodName = UTF8ToString(args.shift())];
        if (isAsync) {
          if (handleAsync) {
            return handleAsync(() => f.apply(receiver, args));
          }
          throw new Error("Synchronous WebAssembly cannot call async function");
        }
        const result = f.apply(receiver, args);
        if (typeof result?.then == "function") {
          console.error("unexpected Promise", f);
          throw new Error(`${methodName} unexpectedly returned a Promise`);
        }
        return result;
      };
    };
    function _ipp(...args) {
      return adapters_support(false, ...args);
    }
    function _ipp_async(...args) {
      return adapters_support(true, ...args);
    }
    function _ippipppp(...args) {
      return adapters_support(false, ...args);
    }
    function _ippipppp_async(...args) {
      return adapters_support(true, ...args);
    }
    function _ippp(...args) {
      return adapters_support(false, ...args);
    }
    function _ippp_async(...args) {
      return adapters_support(true, ...args);
    }
    function _ipppi(...args) {
      return adapters_support(false, ...args);
    }
    function _ipppi_async(...args) {
      return adapters_support(true, ...args);
    }
    function _ipppiii(...args) {
      return adapters_support(false, ...args);
    }
    function _ipppiii_async(...args) {
      return adapters_support(true, ...args);
    }
    function _ipppiiip(...args) {
      return adapters_support(false, ...args);
    }
    function _ipppiiip_async(...args) {
      return adapters_support(true, ...args);
    }
    function _ipppip(...args) {
      return adapters_support(false, ...args);
    }
    function _ipppip_async(...args) {
      return adapters_support(true, ...args);
    }
    function _ipppj(...args) {
      return adapters_support(false, ...args);
    }
    function _ipppj_async(...args) {
      return adapters_support(true, ...args);
    }
    function _ipppp(...args) {
      return adapters_support(false, ...args);
    }
    function _ipppp_async(...args) {
      return adapters_support(true, ...args);
    }
    function _ippppi(...args) {
      return adapters_support(false, ...args);
    }
    function _ippppi_async(...args) {
      return adapters_support(true, ...args);
    }
    function _ippppij(...args) {
      return adapters_support(false, ...args);
    }
    function _ippppij_async(...args) {
      return adapters_support(true, ...args);
    }
    function _ippppip(...args) {
      return adapters_support(false, ...args);
    }
    function _ippppip_async(...args) {
      return adapters_support(true, ...args);
    }
    function _ipppppip(...args) {
      return adapters_support(false, ...args);
    }
    function _ipppppip_async(...args) {
      return adapters_support(true, ...args);
    }
    function _vppp(...args) {
      return adapters_support(false, ...args);
    }
    function _vppp_async(...args) {
      return adapters_support(true, ...args);
    }
    function _vpppip(...args) {
      return adapters_support(false, ...args);
    }
    function _vpppip_async(...args) {
      return adapters_support(true, ...args);
    }
    var runtimeKeepaliveCounter = 0;
    var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
    var _proc_exit = (code) => {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        if (Module2["onExit"]) Module2["onExit"](code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    };
    var exitJS = (status, implicit) => {
      EXITSTATUS = status;
      _proc_exit(status);
    };
    var handleException = (e) => {
      if (e instanceof ExitStatus || e == "unwind") {
        return EXITSTATUS;
      }
      quit_(1, e);
    };
    var uleb128Encode = (n, target) => {
      if (n < 128) {
        target.push(n);
      } else {
        target.push(n % 128 | 128, n >> 7);
      }
    };
    var sigToWasmTypes = (sig) => {
      var typeNames = { "i": "i32", "j": "i64", "f": "f32", "d": "f64", "e": "externref", "p": "i32" };
      var type = { parameters: [], results: sig[0] == "v" ? [] : [typeNames[sig[0]]] };
      for (var i = 1; i < sig.length; ++i) {
        type.parameters.push(typeNames[sig[i]]);
      }
      return type;
    };
    var generateFuncType = (sig, target) => {
      var sigRet = sig.slice(0, 1);
      var sigParam = sig.slice(1);
      var typeCodes = { "i": 127, "p": 127, "j": 126, "f": 125, "d": 124, "e": 111 };
      target.push(96);
      uleb128Encode(sigParam.length, target);
      for (var i = 0; i < sigParam.length; ++i) {
        target.push(typeCodes[sigParam[i]]);
      }
      if (sigRet == "v") {
        target.push(0);
      } else {
        target.push(1, typeCodes[sigRet]);
      }
    };
    var convertJsFunctionToWasm = (func, sig) => {
      if (typeof WebAssembly.Function == "function") {
        return new WebAssembly.Function(sigToWasmTypes(sig), func);
      }
      var typeSectionBody = [1];
      generateFuncType(sig, typeSectionBody);
      var bytes = [0, 97, 115, 109, 1, 0, 0, 0, 1];
      uleb128Encode(typeSectionBody.length, bytes);
      bytes.push.apply(bytes, typeSectionBody);
      bytes.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
      var module = new WebAssembly.Module(new Uint8Array(bytes));
      var instance = new WebAssembly.Instance(module, { "e": { "f": func } });
      var wrappedFunc = instance.exports["f"];
      return wrappedFunc;
    };
    var wasmTable;
    var getWasmTableEntry = (funcPtr) => wasmTable.get(funcPtr);
    var updateTableMap = (offset, count) => {
      if (functionsInTableMap) {
        for (var i = offset; i < offset + count; i++) {
          var item = getWasmTableEntry(i);
          if (item) {
            functionsInTableMap.set(item, i);
          }
        }
      }
    };
    var functionsInTableMap;
    var getFunctionAddress = (func) => {
      if (!functionsInTableMap) {
        functionsInTableMap = /* @__PURE__ */ new WeakMap();
        updateTableMap(0, wasmTable.length);
      }
      return functionsInTableMap.get(func) || 0;
    };
    var freeTableIndexes = [];
    var getEmptyTableSlot = () => {
      if (freeTableIndexes.length) {
        return freeTableIndexes.pop();
      }
      try {
        wasmTable.grow(1);
      } catch (err2) {
        if (!(err2 instanceof RangeError)) {
          throw err2;
        }
        throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
      }
      return wasmTable.length - 1;
    };
    var setWasmTableEntry = (idx, func) => wasmTable.set(idx, func);
    var addFunction = (func, sig) => {
      var rtn = getFunctionAddress(func);
      if (rtn) {
        return rtn;
      }
      var ret = getEmptyTableSlot();
      try {
        setWasmTableEntry(ret, func);
      } catch (err2) {
        if (!(err2 instanceof TypeError)) {
          throw err2;
        }
        var wrapped = convertJsFunctionToWasm(func, sig);
        setWasmTableEntry(ret, wrapped);
      }
      functionsInTableMap.set(func, ret);
      return ret;
    };
    var getCFunc = (ident) => {
      var func = Module2["_" + ident];
      return func;
    };
    var writeArrayToMemory = (array, buffer) => {
      HEAP8.set(array, buffer);
    };
    var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    };
    var ccall = (ident, returnType, argTypes, args, opts) => {
      var toC = { "string": (str) => {
        var ret2 = 0;
        if (str !== null && str !== void 0 && str !== 0) {
          ret2 = stringToUTF8OnStack(str);
        }
        return ret2;
      }, "array": (arr) => {
        var ret2 = stackAlloc(arr.length);
        writeArrayToMemory(arr, ret2);
        return ret2;
      } };
      function convertReturnValue(ret2) {
        if (returnType === "string") {
          return UTF8ToString(ret2);
        }
        if (returnType === "boolean") return Boolean(ret2);
        return ret2;
      }
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func.apply(null, cArgs);
      function onDone(ret2) {
        if (stack !== 0) stackRestore(stack);
        return convertReturnValue(ret2);
      }
      ret = onDone(ret);
      return ret;
    };
    var cwrap = (ident, returnType, argTypes, opts) => {
      var numericArgs = !argTypes || argTypes.every((type) => type === "number" || type === "boolean");
      var numericRet = returnType !== "string";
      if (numericRet && numericArgs && !opts) {
        return getCFunc(ident);
      }
      return function() {
        return ccall(ident, returnType, argTypes, arguments);
      };
    };
    var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
      if (maxBytesToWrite === void 0) {
        maxBytesToWrite = 2147483647;
      }
      if (maxBytesToWrite < 2) return 0;
      maxBytesToWrite -= 2;
      var startPtr = outPtr;
      var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
      for (var i = 0; i < numCharsToWrite; ++i) {
        var codeUnit = str.charCodeAt(i);
        HEAP16[outPtr >> 1] = codeUnit;
        outPtr += 2;
      }
      HEAP16[outPtr >> 1] = 0;
      return outPtr - startPtr;
    };
    var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
      if (maxBytesToWrite === void 0) {
        maxBytesToWrite = 2147483647;
      }
      if (maxBytesToWrite < 4) return 0;
      var startPtr = outPtr;
      var endPtr = startPtr + maxBytesToWrite - 4;
      for (var i = 0; i < str.length; ++i) {
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 55296 && codeUnit <= 57343) {
          var trailSurrogate = str.charCodeAt(++i);
          codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
        }
        HEAP32[outPtr >> 2] = codeUnit;
        outPtr += 4;
        if (outPtr + 4 > endPtr) break;
      }
      HEAP32[outPtr >> 2] = 0;
      return outPtr - startPtr;
    };
    var AsciiToString = (ptr) => {
      var str = "";
      while (1) {
        var ch = HEAPU8[ptr++ >> 0];
        if (!ch) return str;
        str += String.fromCharCode(ch);
      }
    };
    var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : void 0;
    var UTF16ToString = (ptr, maxBytesToRead) => {
      var endPtr = ptr;
      var idx = endPtr >> 1;
      var maxIdx = idx + maxBytesToRead / 2;
      while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
      endPtr = idx << 1;
      if (endPtr - ptr > 32 && UTF16Decoder) return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
      var str = "";
      for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
        var codeUnit = HEAP16[ptr + i * 2 >> 1];
        if (codeUnit == 0) break;
        str += String.fromCharCode(codeUnit);
      }
      return str;
    };
    var UTF32ToString = (ptr, maxBytesToRead) => {
      var i = 0;
      var str = "";
      while (!(i >= maxBytesToRead / 4)) {
        var utf32 = HEAP32[ptr + i * 4 >> 2];
        if (utf32 == 0) break;
        ++i;
        if (utf32 >= 65536) {
          var ch = utf32 - 65536;
          str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
        } else {
          str += String.fromCharCode(utf32);
        }
      }
      return str;
    };
    function intArrayToString(array) {
      var ret = [];
      for (var i = 0; i < array.length; i++) {
        var chr = array[i];
        if (chr > 255) {
          chr &= 255;
        }
        ret.push(String.fromCharCode(chr));
      }
      return ret.join("");
    }
    var FSNode = function(parent, name, mode, rdev) {
      if (!parent) {
        parent = this;
      }
      this.parent = parent;
      this.mount = parent.mount;
      this.mounted = null;
      this.id = FS.nextInode++;
      this.name = name;
      this.mode = mode;
      this.node_ops = {};
      this.stream_ops = {};
      this.rdev = rdev;
    };
    var readMode = 292 | 73;
    var writeMode = 146;
    Object.defineProperties(FSNode.prototype, { read: { get: function() {
      return (this.mode & readMode) === readMode;
    }, set: function(val) {
      val ? this.mode |= readMode : this.mode &= ~readMode;
    } }, write: { get: function() {
      return (this.mode & writeMode) === writeMode;
    }, set: function(val) {
      val ? this.mode |= writeMode : this.mode &= ~writeMode;
    } }, isFolder: { get: function() {
      return FS.isDir(this.mode);
    } }, isDevice: { get: function() {
      return FS.isChrdev(this.mode);
    } } });
    FS.FSNode = FSNode;
    FS.createPreloadedFile = FS_createPreloadedFile;
    FS.staticInit();
    adapters_support();
    var wasmImports = { a: ___assert_fail, Y: ___syscall_chmod, $: ___syscall_faccessat, Z: ___syscall_fchmod, X: ___syscall_fchown32, b: ___syscall_fcntl64, W: ___syscall_fstat64, y: ___syscall_ftruncate64, Q: ___syscall_getcwd, U: ___syscall_lstat64, N: ___syscall_mkdirat, T: ___syscall_newfstatat, M: ___syscall_openat, K: ___syscall_readlinkat, J: ___syscall_rmdir, V: ___syscall_stat64, G: ___syscall_unlinkat, F: ___syscall_utimensat, w: __localtime_js, u: __mmap_js, v: __munmap_js, H: __tzset_js, n: _emscripten_date_now, m: _emscripten_get_now, D: _emscripten_resize_heap, O: _environ_get, P: _environ_sizes_get, o: _fd_close, E: _fd_fdstat_get, L: _fd_read, x: _fd_seek, S: _fd_sync, I: _fd_write, s: _ipp, t: _ipp_async, fa: _ippipppp, ia: _ippipppp_async, i: _ippp, j: _ippp_async, c: _ipppi, d: _ipppi_async, ca: _ipppiii, da: _ipppiii_async, ea: _ipppiiip, ga: _ipppiiip_async, g: _ipppip, h: _ipppip_async, z: _ipppj, A: _ipppj_async, e: _ipppp, f: _ipppp_async, aa: _ippppi, ba: _ippppi_async, B: _ippppij, C: _ippppij_async, p: _ippppip, q: _ippppip_async, ha: _ipppppip, r: _ipppppip_async, k: _vppp, l: _vppp_async, R: _vpppip, _: _vpppip_async };
    var wasmExports = createWasm();
    Module2["_sqlite3_status64"] = (a0, a1, a2, a3) => (Module2["_sqlite3_status64"] = wasmExports["la"])(a0, a1, a2, a3);
    Module2["_sqlite3_status"] = (a0, a1, a2, a3) => (Module2["_sqlite3_status"] = wasmExports["ma"])(a0, a1, a2, a3);
    Module2["_sqlite3_db_status"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_db_status"] = wasmExports["na"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_msize"] = (a0) => (Module2["_sqlite3_msize"] = wasmExports["oa"])(a0);
    Module2["_sqlite3_vfs_find"] = (a0) => (Module2["_sqlite3_vfs_find"] = wasmExports["pa"])(a0);
    Module2["_sqlite3_vfs_register"] = (a0, a1) => (Module2["_sqlite3_vfs_register"] = wasmExports["qa"])(a0, a1);
    Module2["_sqlite3_vfs_unregister"] = (a0) => (Module2["_sqlite3_vfs_unregister"] = wasmExports["ra"])(a0);
    Module2["_sqlite3_release_memory"] = (a0) => (Module2["_sqlite3_release_memory"] = wasmExports["sa"])(a0);
    Module2["_sqlite3_soft_heap_limit64"] = (a0, a1) => (Module2["_sqlite3_soft_heap_limit64"] = wasmExports["ta"])(a0, a1);
    Module2["_sqlite3_memory_used"] = () => (Module2["_sqlite3_memory_used"] = wasmExports["ua"])();
    Module2["_sqlite3_hard_heap_limit64"] = (a0, a1) => (Module2["_sqlite3_hard_heap_limit64"] = wasmExports["va"])(a0, a1);
    Module2["_sqlite3_memory_highwater"] = (a0) => (Module2["_sqlite3_memory_highwater"] = wasmExports["wa"])(a0);
    Module2["_sqlite3_malloc"] = (a0) => (Module2["_sqlite3_malloc"] = wasmExports["xa"])(a0);
    Module2["_sqlite3_malloc64"] = (a0, a1) => (Module2["_sqlite3_malloc64"] = wasmExports["ya"])(a0, a1);
    Module2["_sqlite3_free"] = (a0) => (Module2["_sqlite3_free"] = wasmExports["za"])(a0);
    Module2["_sqlite3_realloc"] = (a0, a1) => (Module2["_sqlite3_realloc"] = wasmExports["Aa"])(a0, a1);
    Module2["_sqlite3_realloc64"] = (a0, a1, a2) => (Module2["_sqlite3_realloc64"] = wasmExports["Ba"])(a0, a1, a2);
    Module2["_sqlite3_str_vappendf"] = (a0, a1, a2) => (Module2["_sqlite3_str_vappendf"] = wasmExports["Ca"])(a0, a1, a2);
    Module2["_sqlite3_str_append"] = (a0, a1, a2) => (Module2["_sqlite3_str_append"] = wasmExports["Da"])(a0, a1, a2);
    Module2["_sqlite3_str_appendchar"] = (a0, a1, a2) => (Module2["_sqlite3_str_appendchar"] = wasmExports["Ea"])(a0, a1, a2);
    Module2["_sqlite3_str_appendall"] = (a0, a1) => (Module2["_sqlite3_str_appendall"] = wasmExports["Fa"])(a0, a1);
    Module2["_sqlite3_str_appendf"] = (a0, a1, a2) => (Module2["_sqlite3_str_appendf"] = wasmExports["Ga"])(a0, a1, a2);
    Module2["_sqlite3_str_finish"] = (a0) => (Module2["_sqlite3_str_finish"] = wasmExports["Ha"])(a0);
    Module2["_sqlite3_str_errcode"] = (a0) => (Module2["_sqlite3_str_errcode"] = wasmExports["Ia"])(a0);
    Module2["_sqlite3_str_length"] = (a0) => (Module2["_sqlite3_str_length"] = wasmExports["Ja"])(a0);
    Module2["_sqlite3_str_value"] = (a0) => (Module2["_sqlite3_str_value"] = wasmExports["Ka"])(a0);
    Module2["_sqlite3_str_reset"] = (a0) => (Module2["_sqlite3_str_reset"] = wasmExports["La"])(a0);
    Module2["_sqlite3_str_new"] = (a0) => (Module2["_sqlite3_str_new"] = wasmExports["Ma"])(a0);
    Module2["_sqlite3_vmprintf"] = (a0, a1) => (Module2["_sqlite3_vmprintf"] = wasmExports["Na"])(a0, a1);
    Module2["_sqlite3_mprintf"] = (a0, a1) => (Module2["_sqlite3_mprintf"] = wasmExports["Oa"])(a0, a1);
    Module2["_sqlite3_vsnprintf"] = (a0, a1, a2, a3) => (Module2["_sqlite3_vsnprintf"] = wasmExports["Pa"])(a0, a1, a2, a3);
    Module2["_sqlite3_snprintf"] = (a0, a1, a2, a3) => (Module2["_sqlite3_snprintf"] = wasmExports["Qa"])(a0, a1, a2, a3);
    Module2["_sqlite3_log"] = (a0, a1, a2) => (Module2["_sqlite3_log"] = wasmExports["Ra"])(a0, a1, a2);
    Module2["_sqlite3_randomness"] = (a0, a1) => (Module2["_sqlite3_randomness"] = wasmExports["Sa"])(a0, a1);
    Module2["_sqlite3_stricmp"] = (a0, a1) => (Module2["_sqlite3_stricmp"] = wasmExports["Ta"])(a0, a1);
    Module2["_sqlite3_strnicmp"] = (a0, a1, a2) => (Module2["_sqlite3_strnicmp"] = wasmExports["Ua"])(a0, a1, a2);
    Module2["_sqlite3_os_init"] = () => (Module2["_sqlite3_os_init"] = wasmExports["Va"])();
    Module2["_sqlite3_os_end"] = () => (Module2["_sqlite3_os_end"] = wasmExports["Wa"])();
    Module2["_sqlite3_serialize"] = (a0, a1, a2, a3) => (Module2["_sqlite3_serialize"] = wasmExports["Xa"])(a0, a1, a2, a3);
    Module2["_sqlite3_prepare_v2"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_prepare_v2"] = wasmExports["Ya"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_step"] = (a0) => (Module2["_sqlite3_step"] = wasmExports["Za"])(a0);
    Module2["_sqlite3_column_int64"] = (a0, a1) => (Module2["_sqlite3_column_int64"] = wasmExports["_a"])(a0, a1);
    Module2["_sqlite3_reset"] = (a0) => (Module2["_sqlite3_reset"] = wasmExports["$a"])(a0);
    Module2["_sqlite3_exec"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_exec"] = wasmExports["ab"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_column_int"] = (a0, a1) => (Module2["_sqlite3_column_int"] = wasmExports["bb"])(a0, a1);
    Module2["_sqlite3_finalize"] = (a0) => (Module2["_sqlite3_finalize"] = wasmExports["cb"])(a0);
    Module2["_sqlite3_deserialize"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module2["_sqlite3_deserialize"] = wasmExports["db"])(a0, a1, a2, a3, a4, a5, a6, a7);
    Module2["_sqlite3_database_file_object"] = (a0) => (Module2["_sqlite3_database_file_object"] = wasmExports["eb"])(a0);
    Module2["_sqlite3_backup_init"] = (a0, a1, a2, a3) => (Module2["_sqlite3_backup_init"] = wasmExports["fb"])(a0, a1, a2, a3);
    Module2["_sqlite3_backup_step"] = (a0, a1) => (Module2["_sqlite3_backup_step"] = wasmExports["gb"])(a0, a1);
    Module2["_sqlite3_backup_finish"] = (a0) => (Module2["_sqlite3_backup_finish"] = wasmExports["hb"])(a0);
    Module2["_sqlite3_backup_remaining"] = (a0) => (Module2["_sqlite3_backup_remaining"] = wasmExports["ib"])(a0);
    Module2["_sqlite3_backup_pagecount"] = (a0) => (Module2["_sqlite3_backup_pagecount"] = wasmExports["jb"])(a0);
    Module2["_sqlite3_clear_bindings"] = (a0) => (Module2["_sqlite3_clear_bindings"] = wasmExports["kb"])(a0);
    Module2["_sqlite3_value_blob"] = (a0) => (Module2["_sqlite3_value_blob"] = wasmExports["lb"])(a0);
    Module2["_sqlite3_value_text"] = (a0) => (Module2["_sqlite3_value_text"] = wasmExports["mb"])(a0);
    Module2["_sqlite3_value_bytes"] = (a0) => (Module2["_sqlite3_value_bytes"] = wasmExports["nb"])(a0);
    Module2["_sqlite3_value_bytes16"] = (a0) => (Module2["_sqlite3_value_bytes16"] = wasmExports["ob"])(a0);
    Module2["_sqlite3_value_double"] = (a0) => (Module2["_sqlite3_value_double"] = wasmExports["pb"])(a0);
    Module2["_sqlite3_value_int"] = (a0) => (Module2["_sqlite3_value_int"] = wasmExports["qb"])(a0);
    Module2["_sqlite3_value_int64"] = (a0) => (Module2["_sqlite3_value_int64"] = wasmExports["rb"])(a0);
    Module2["_sqlite3_value_subtype"] = (a0) => (Module2["_sqlite3_value_subtype"] = wasmExports["sb"])(a0);
    Module2["_sqlite3_value_pointer"] = (a0, a1) => (Module2["_sqlite3_value_pointer"] = wasmExports["tb"])(a0, a1);
    Module2["_sqlite3_value_text16"] = (a0) => (Module2["_sqlite3_value_text16"] = wasmExports["ub"])(a0);
    Module2["_sqlite3_value_text16be"] = (a0) => (Module2["_sqlite3_value_text16be"] = wasmExports["vb"])(a0);
    Module2["_sqlite3_value_text16le"] = (a0) => (Module2["_sqlite3_value_text16le"] = wasmExports["wb"])(a0);
    Module2["_sqlite3_value_type"] = (a0) => (Module2["_sqlite3_value_type"] = wasmExports["xb"])(a0);
    Module2["_sqlite3_value_encoding"] = (a0) => (Module2["_sqlite3_value_encoding"] = wasmExports["yb"])(a0);
    Module2["_sqlite3_value_nochange"] = (a0) => (Module2["_sqlite3_value_nochange"] = wasmExports["zb"])(a0);
    Module2["_sqlite3_value_frombind"] = (a0) => (Module2["_sqlite3_value_frombind"] = wasmExports["Ab"])(a0);
    Module2["_sqlite3_value_dup"] = (a0) => (Module2["_sqlite3_value_dup"] = wasmExports["Bb"])(a0);
    Module2["_sqlite3_value_free"] = (a0) => (Module2["_sqlite3_value_free"] = wasmExports["Cb"])(a0);
    Module2["_sqlite3_result_blob"] = (a0, a1, a2, a3) => (Module2["_sqlite3_result_blob"] = wasmExports["Db"])(a0, a1, a2, a3);
    Module2["_sqlite3_result_blob64"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_result_blob64"] = wasmExports["Eb"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_result_double"] = (a0, a1) => (Module2["_sqlite3_result_double"] = wasmExports["Fb"])(a0, a1);
    Module2["_sqlite3_result_error"] = (a0, a1, a2) => (Module2["_sqlite3_result_error"] = wasmExports["Gb"])(a0, a1, a2);
    Module2["_sqlite3_result_error16"] = (a0, a1, a2) => (Module2["_sqlite3_result_error16"] = wasmExports["Hb"])(a0, a1, a2);
    Module2["_sqlite3_result_int"] = (a0, a1) => (Module2["_sqlite3_result_int"] = wasmExports["Ib"])(a0, a1);
    Module2["_sqlite3_result_int64"] = (a0, a1, a2) => (Module2["_sqlite3_result_int64"] = wasmExports["Jb"])(a0, a1, a2);
    Module2["_sqlite3_result_null"] = (a0) => (Module2["_sqlite3_result_null"] = wasmExports["Kb"])(a0);
    Module2["_sqlite3_result_pointer"] = (a0, a1, a2, a3) => (Module2["_sqlite3_result_pointer"] = wasmExports["Lb"])(a0, a1, a2, a3);
    Module2["_sqlite3_result_subtype"] = (a0, a1) => (Module2["_sqlite3_result_subtype"] = wasmExports["Mb"])(a0, a1);
    Module2["_sqlite3_result_text"] = (a0, a1, a2, a3) => (Module2["_sqlite3_result_text"] = wasmExports["Nb"])(a0, a1, a2, a3);
    Module2["_sqlite3_result_text64"] = (a0, a1, a2, a3, a4, a5) => (Module2["_sqlite3_result_text64"] = wasmExports["Ob"])(a0, a1, a2, a3, a4, a5);
    Module2["_sqlite3_result_text16"] = (a0, a1, a2, a3) => (Module2["_sqlite3_result_text16"] = wasmExports["Pb"])(a0, a1, a2, a3);
    Module2["_sqlite3_result_text16be"] = (a0, a1, a2, a3) => (Module2["_sqlite3_result_text16be"] = wasmExports["Qb"])(a0, a1, a2, a3);
    Module2["_sqlite3_result_text16le"] = (a0, a1, a2, a3) => (Module2["_sqlite3_result_text16le"] = wasmExports["Rb"])(a0, a1, a2, a3);
    Module2["_sqlite3_result_value"] = (a0, a1) => (Module2["_sqlite3_result_value"] = wasmExports["Sb"])(a0, a1);
    Module2["_sqlite3_result_error_toobig"] = (a0) => (Module2["_sqlite3_result_error_toobig"] = wasmExports["Tb"])(a0);
    Module2["_sqlite3_result_zeroblob"] = (a0, a1) => (Module2["_sqlite3_result_zeroblob"] = wasmExports["Ub"])(a0, a1);
    Module2["_sqlite3_result_zeroblob64"] = (a0, a1, a2) => (Module2["_sqlite3_result_zeroblob64"] = wasmExports["Vb"])(a0, a1, a2);
    Module2["_sqlite3_result_error_code"] = (a0, a1) => (Module2["_sqlite3_result_error_code"] = wasmExports["Wb"])(a0, a1);
    Module2["_sqlite3_result_error_nomem"] = (a0) => (Module2["_sqlite3_result_error_nomem"] = wasmExports["Xb"])(a0);
    Module2["_sqlite3_user_data"] = (a0) => (Module2["_sqlite3_user_data"] = wasmExports["Yb"])(a0);
    Module2["_sqlite3_context_db_handle"] = (a0) => (Module2["_sqlite3_context_db_handle"] = wasmExports["Zb"])(a0);
    Module2["_sqlite3_vtab_nochange"] = (a0) => (Module2["_sqlite3_vtab_nochange"] = wasmExports["_b"])(a0);
    Module2["_sqlite3_vtab_in_first"] = (a0, a1) => (Module2["_sqlite3_vtab_in_first"] = wasmExports["$b"])(a0, a1);
    Module2["_sqlite3_vtab_in_next"] = (a0, a1) => (Module2["_sqlite3_vtab_in_next"] = wasmExports["ac"])(a0, a1);
    Module2["_sqlite3_aggregate_context"] = (a0, a1) => (Module2["_sqlite3_aggregate_context"] = wasmExports["bc"])(a0, a1);
    Module2["_sqlite3_get_auxdata"] = (a0, a1) => (Module2["_sqlite3_get_auxdata"] = wasmExports["cc"])(a0, a1);
    Module2["_sqlite3_set_auxdata"] = (a0, a1, a2, a3) => (Module2["_sqlite3_set_auxdata"] = wasmExports["dc"])(a0, a1, a2, a3);
    Module2["_sqlite3_column_count"] = (a0) => (Module2["_sqlite3_column_count"] = wasmExports["ec"])(a0);
    Module2["_sqlite3_data_count"] = (a0) => (Module2["_sqlite3_data_count"] = wasmExports["fc"])(a0);
    Module2["_sqlite3_column_blob"] = (a0, a1) => (Module2["_sqlite3_column_blob"] = wasmExports["gc"])(a0, a1);
    Module2["_sqlite3_column_bytes"] = (a0, a1) => (Module2["_sqlite3_column_bytes"] = wasmExports["hc"])(a0, a1);
    Module2["_sqlite3_column_bytes16"] = (a0, a1) => (Module2["_sqlite3_column_bytes16"] = wasmExports["ic"])(a0, a1);
    Module2["_sqlite3_column_double"] = (a0, a1) => (Module2["_sqlite3_column_double"] = wasmExports["jc"])(a0, a1);
    Module2["_sqlite3_column_text"] = (a0, a1) => (Module2["_sqlite3_column_text"] = wasmExports["kc"])(a0, a1);
    Module2["_sqlite3_column_value"] = (a0, a1) => (Module2["_sqlite3_column_value"] = wasmExports["lc"])(a0, a1);
    Module2["_sqlite3_column_text16"] = (a0, a1) => (Module2["_sqlite3_column_text16"] = wasmExports["mc"])(a0, a1);
    Module2["_sqlite3_column_type"] = (a0, a1) => (Module2["_sqlite3_column_type"] = wasmExports["nc"])(a0, a1);
    Module2["_sqlite3_column_name"] = (a0, a1) => (Module2["_sqlite3_column_name"] = wasmExports["oc"])(a0, a1);
    Module2["_sqlite3_column_name16"] = (a0, a1) => (Module2["_sqlite3_column_name16"] = wasmExports["pc"])(a0, a1);
    Module2["_sqlite3_bind_blob"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_bind_blob"] = wasmExports["qc"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_bind_blob64"] = (a0, a1, a2, a3, a4, a5) => (Module2["_sqlite3_bind_blob64"] = wasmExports["rc"])(a0, a1, a2, a3, a4, a5);
    Module2["_sqlite3_bind_double"] = (a0, a1, a2) => (Module2["_sqlite3_bind_double"] = wasmExports["sc"])(a0, a1, a2);
    Module2["_sqlite3_bind_int"] = (a0, a1, a2) => (Module2["_sqlite3_bind_int"] = wasmExports["tc"])(a0, a1, a2);
    Module2["_sqlite3_bind_int64"] = (a0, a1, a2, a3) => (Module2["_sqlite3_bind_int64"] = wasmExports["uc"])(a0, a1, a2, a3);
    Module2["_sqlite3_bind_null"] = (a0, a1) => (Module2["_sqlite3_bind_null"] = wasmExports["vc"])(a0, a1);
    Module2["_sqlite3_bind_pointer"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_bind_pointer"] = wasmExports["wc"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_bind_text"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_bind_text"] = wasmExports["xc"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_bind_text64"] = (a0, a1, a2, a3, a4, a5, a6) => (Module2["_sqlite3_bind_text64"] = wasmExports["yc"])(a0, a1, a2, a3, a4, a5, a6);
    Module2["_sqlite3_bind_text16"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_bind_text16"] = wasmExports["zc"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_bind_value"] = (a0, a1, a2) => (Module2["_sqlite3_bind_value"] = wasmExports["Ac"])(a0, a1, a2);
    Module2["_sqlite3_bind_zeroblob"] = (a0, a1, a2) => (Module2["_sqlite3_bind_zeroblob"] = wasmExports["Bc"])(a0, a1, a2);
    Module2["_sqlite3_bind_zeroblob64"] = (a0, a1, a2, a3) => (Module2["_sqlite3_bind_zeroblob64"] = wasmExports["Cc"])(a0, a1, a2, a3);
    Module2["_sqlite3_bind_parameter_count"] = (a0) => (Module2["_sqlite3_bind_parameter_count"] = wasmExports["Dc"])(a0);
    Module2["_sqlite3_bind_parameter_name"] = (a0, a1) => (Module2["_sqlite3_bind_parameter_name"] = wasmExports["Ec"])(a0, a1);
    Module2["_sqlite3_bind_parameter_index"] = (a0, a1) => (Module2["_sqlite3_bind_parameter_index"] = wasmExports["Fc"])(a0, a1);
    Module2["_sqlite3_db_handle"] = (a0) => (Module2["_sqlite3_db_handle"] = wasmExports["Gc"])(a0);
    Module2["_sqlite3_stmt_readonly"] = (a0) => (Module2["_sqlite3_stmt_readonly"] = wasmExports["Hc"])(a0);
    Module2["_sqlite3_stmt_isexplain"] = (a0) => (Module2["_sqlite3_stmt_isexplain"] = wasmExports["Ic"])(a0);
    Module2["_sqlite3_stmt_explain"] = (a0, a1) => (Module2["_sqlite3_stmt_explain"] = wasmExports["Jc"])(a0, a1);
    Module2["_sqlite3_stmt_busy"] = (a0) => (Module2["_sqlite3_stmt_busy"] = wasmExports["Kc"])(a0);
    Module2["_sqlite3_next_stmt"] = (a0, a1) => (Module2["_sqlite3_next_stmt"] = wasmExports["Lc"])(a0, a1);
    Module2["_sqlite3_stmt_status"] = (a0, a1, a2) => (Module2["_sqlite3_stmt_status"] = wasmExports["Mc"])(a0, a1, a2);
    Module2["_sqlite3_sql"] = (a0) => (Module2["_sqlite3_sql"] = wasmExports["Nc"])(a0);
    Module2["_sqlite3_expanded_sql"] = (a0) => (Module2["_sqlite3_expanded_sql"] = wasmExports["Oc"])(a0);
    Module2["_sqlite3_value_numeric_type"] = (a0) => (Module2["_sqlite3_value_numeric_type"] = wasmExports["Pc"])(a0);
    Module2["_sqlite3_blob_open"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module2["_sqlite3_blob_open"] = wasmExports["Qc"])(a0, a1, a2, a3, a4, a5, a6, a7);
    Module2["_sqlite3_blob_close"] = (a0) => (Module2["_sqlite3_blob_close"] = wasmExports["Rc"])(a0);
    Module2["_sqlite3_blob_read"] = (a0, a1, a2, a3) => (Module2["_sqlite3_blob_read"] = wasmExports["Sc"])(a0, a1, a2, a3);
    Module2["_sqlite3_blob_write"] = (a0, a1, a2, a3) => (Module2["_sqlite3_blob_write"] = wasmExports["Tc"])(a0, a1, a2, a3);
    Module2["_sqlite3_blob_bytes"] = (a0) => (Module2["_sqlite3_blob_bytes"] = wasmExports["Uc"])(a0);
    Module2["_sqlite3_blob_reopen"] = (a0, a1, a2) => (Module2["_sqlite3_blob_reopen"] = wasmExports["Vc"])(a0, a1, a2);
    Module2["_sqlite3_set_authorizer"] = (a0, a1, a2) => (Module2["_sqlite3_set_authorizer"] = wasmExports["Wc"])(a0, a1, a2);
    Module2["_sqlite3_strglob"] = (a0, a1) => (Module2["_sqlite3_strglob"] = wasmExports["Xc"])(a0, a1);
    Module2["_sqlite3_strlike"] = (a0, a1, a2) => (Module2["_sqlite3_strlike"] = wasmExports["Yc"])(a0, a1, a2);
    Module2["_sqlite3_errmsg"] = (a0) => (Module2["_sqlite3_errmsg"] = wasmExports["Zc"])(a0);
    Module2["_sqlite3_auto_extension"] = (a0) => (Module2["_sqlite3_auto_extension"] = wasmExports["_c"])(a0);
    Module2["_sqlite3_cancel_auto_extension"] = (a0) => (Module2["_sqlite3_cancel_auto_extension"] = wasmExports["$c"])(a0);
    Module2["_sqlite3_reset_auto_extension"] = () => (Module2["_sqlite3_reset_auto_extension"] = wasmExports["ad"])();
    Module2["_sqlite3_prepare"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_prepare"] = wasmExports["bd"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_prepare_v3"] = (a0, a1, a2, a3, a4, a5) => (Module2["_sqlite3_prepare_v3"] = wasmExports["cd"])(a0, a1, a2, a3, a4, a5);
    Module2["_sqlite3_prepare16"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_prepare16"] = wasmExports["dd"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_prepare16_v2"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_prepare16_v2"] = wasmExports["ed"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_prepare16_v3"] = (a0, a1, a2, a3, a4, a5) => (Module2["_sqlite3_prepare16_v3"] = wasmExports["fd"])(a0, a1, a2, a3, a4, a5);
    Module2["_sqlite3_get_table"] = (a0, a1, a2, a3, a4, a5) => (Module2["_sqlite3_get_table"] = wasmExports["gd"])(a0, a1, a2, a3, a4, a5);
    Module2["_sqlite3_free_table"] = (a0) => (Module2["_sqlite3_free_table"] = wasmExports["hd"])(a0);
    Module2["_sqlite3_create_module"] = (a0, a1, a2, a3) => (Module2["_sqlite3_create_module"] = wasmExports["id"])(a0, a1, a2, a3);
    Module2["_sqlite3_create_module_v2"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_create_module_v2"] = wasmExports["jd"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_drop_modules"] = (a0, a1) => (Module2["_sqlite3_drop_modules"] = wasmExports["kd"])(a0, a1);
    Module2["_sqlite3_declare_vtab"] = (a0, a1) => (Module2["_sqlite3_declare_vtab"] = wasmExports["ld"])(a0, a1);
    Module2["_sqlite3_vtab_on_conflict"] = (a0) => (Module2["_sqlite3_vtab_on_conflict"] = wasmExports["md"])(a0);
    Module2["_sqlite3_vtab_config"] = (a0, a1, a2) => (Module2["_sqlite3_vtab_config"] = wasmExports["nd"])(a0, a1, a2);
    Module2["_sqlite3_vtab_collation"] = (a0, a1) => (Module2["_sqlite3_vtab_collation"] = wasmExports["od"])(a0, a1);
    Module2["_sqlite3_vtab_in"] = (a0, a1, a2) => (Module2["_sqlite3_vtab_in"] = wasmExports["pd"])(a0, a1, a2);
    Module2["_sqlite3_vtab_rhs_value"] = (a0, a1, a2) => (Module2["_sqlite3_vtab_rhs_value"] = wasmExports["qd"])(a0, a1, a2);
    Module2["_sqlite3_vtab_distinct"] = (a0) => (Module2["_sqlite3_vtab_distinct"] = wasmExports["rd"])(a0);
    Module2["_sqlite3_keyword_name"] = (a0, a1, a2) => (Module2["_sqlite3_keyword_name"] = wasmExports["sd"])(a0, a1, a2);
    Module2["_sqlite3_keyword_count"] = () => (Module2["_sqlite3_keyword_count"] = wasmExports["td"])();
    Module2["_sqlite3_keyword_check"] = (a0, a1) => (Module2["_sqlite3_keyword_check"] = wasmExports["ud"])(a0, a1);
    Module2["_sqlite3_complete"] = (a0) => (Module2["_sqlite3_complete"] = wasmExports["vd"])(a0);
    Module2["_sqlite3_complete16"] = (a0) => (Module2["_sqlite3_complete16"] = wasmExports["wd"])(a0);
    Module2["_sqlite3_libversion"] = () => (Module2["_sqlite3_libversion"] = wasmExports["xd"])();
    Module2["_sqlite3_libversion_number"] = () => (Module2["_sqlite3_libversion_number"] = wasmExports["yd"])();
    Module2["_sqlite3_threadsafe"] = () => (Module2["_sqlite3_threadsafe"] = wasmExports["zd"])();
    Module2["_sqlite3_initialize"] = () => (Module2["_sqlite3_initialize"] = wasmExports["Ad"])();
    Module2["_sqlite3_shutdown"] = () => (Module2["_sqlite3_shutdown"] = wasmExports["Bd"])();
    Module2["_sqlite3_config"] = (a0, a1) => (Module2["_sqlite3_config"] = wasmExports["Cd"])(a0, a1);
    Module2["_sqlite3_db_mutex"] = (a0) => (Module2["_sqlite3_db_mutex"] = wasmExports["Dd"])(a0);
    Module2["_sqlite3_db_release_memory"] = (a0) => (Module2["_sqlite3_db_release_memory"] = wasmExports["Ed"])(a0);
    Module2["_sqlite3_db_cacheflush"] = (a0) => (Module2["_sqlite3_db_cacheflush"] = wasmExports["Fd"])(a0);
    Module2["_sqlite3_db_config"] = (a0, a1, a2) => (Module2["_sqlite3_db_config"] = wasmExports["Gd"])(a0, a1, a2);
    Module2["_sqlite3_last_insert_rowid"] = (a0) => (Module2["_sqlite3_last_insert_rowid"] = wasmExports["Hd"])(a0);
    Module2["_sqlite3_set_last_insert_rowid"] = (a0, a1, a2) => (Module2["_sqlite3_set_last_insert_rowid"] = wasmExports["Id"])(a0, a1, a2);
    Module2["_sqlite3_changes64"] = (a0) => (Module2["_sqlite3_changes64"] = wasmExports["Jd"])(a0);
    Module2["_sqlite3_changes"] = (a0) => (Module2["_sqlite3_changes"] = wasmExports["Kd"])(a0);
    Module2["_sqlite3_total_changes64"] = (a0) => (Module2["_sqlite3_total_changes64"] = wasmExports["Ld"])(a0);
    Module2["_sqlite3_total_changes"] = (a0) => (Module2["_sqlite3_total_changes"] = wasmExports["Md"])(a0);
    Module2["_sqlite3_txn_state"] = (a0, a1) => (Module2["_sqlite3_txn_state"] = wasmExports["Nd"])(a0, a1);
    Module2["_sqlite3_close"] = (a0) => (Module2["_sqlite3_close"] = wasmExports["Od"])(a0);
    Module2["_sqlite3_close_v2"] = (a0) => (Module2["_sqlite3_close_v2"] = wasmExports["Pd"])(a0);
    Module2["_sqlite3_busy_handler"] = (a0, a1, a2) => (Module2["_sqlite3_busy_handler"] = wasmExports["Qd"])(a0, a1, a2);
    Module2["_sqlite3_progress_handler"] = (a0, a1, a2, a3) => (Module2["_sqlite3_progress_handler"] = wasmExports["Rd"])(a0, a1, a2, a3);
    Module2["_sqlite3_busy_timeout"] = (a0, a1) => (Module2["_sqlite3_busy_timeout"] = wasmExports["Sd"])(a0, a1);
    Module2["_sqlite3_interrupt"] = (a0) => (Module2["_sqlite3_interrupt"] = wasmExports["Td"])(a0);
    Module2["_sqlite3_is_interrupted"] = (a0) => (Module2["_sqlite3_is_interrupted"] = wasmExports["Ud"])(a0);
    Module2["_sqlite3_create_function"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module2["_sqlite3_create_function"] = wasmExports["Vd"])(a0, a1, a2, a3, a4, a5, a6, a7);
    Module2["_sqlite3_create_function_v2"] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (Module2["_sqlite3_create_function_v2"] = wasmExports["Wd"])(a0, a1, a2, a3, a4, a5, a6, a7, a8);
    Module2["_sqlite3_create_window_function"] = (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) => (Module2["_sqlite3_create_window_function"] = wasmExports["Xd"])(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
    Module2["_sqlite3_create_function16"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module2["_sqlite3_create_function16"] = wasmExports["Yd"])(a0, a1, a2, a3, a4, a5, a6, a7);
    Module2["_sqlite3_overload_function"] = (a0, a1, a2) => (Module2["_sqlite3_overload_function"] = wasmExports["Zd"])(a0, a1, a2);
    Module2["_sqlite3_trace_v2"] = (a0, a1, a2, a3) => (Module2["_sqlite3_trace_v2"] = wasmExports["_d"])(a0, a1, a2, a3);
    Module2["_sqlite3_commit_hook"] = (a0, a1, a2) => (Module2["_sqlite3_commit_hook"] = wasmExports["$d"])(a0, a1, a2);
    Module2["_sqlite3_update_hook"] = (a0, a1, a2) => (Module2["_sqlite3_update_hook"] = wasmExports["ae"])(a0, a1, a2);
    Module2["_sqlite3_rollback_hook"] = (a0, a1, a2) => (Module2["_sqlite3_rollback_hook"] = wasmExports["be"])(a0, a1, a2);
    Module2["_sqlite3_autovacuum_pages"] = (a0, a1, a2, a3) => (Module2["_sqlite3_autovacuum_pages"] = wasmExports["ce"])(a0, a1, a2, a3);
    Module2["_sqlite3_wal_autocheckpoint"] = (a0, a1) => (Module2["_sqlite3_wal_autocheckpoint"] = wasmExports["de"])(a0, a1);
    Module2["_sqlite3_wal_hook"] = (a0, a1, a2) => (Module2["_sqlite3_wal_hook"] = wasmExports["ee"])(a0, a1, a2);
    Module2["_sqlite3_wal_checkpoint_v2"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_wal_checkpoint_v2"] = wasmExports["fe"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_wal_checkpoint"] = (a0, a1) => (Module2["_sqlite3_wal_checkpoint"] = wasmExports["ge"])(a0, a1);
    Module2["_sqlite3_error_offset"] = (a0) => (Module2["_sqlite3_error_offset"] = wasmExports["he"])(a0);
    Module2["_sqlite3_errmsg16"] = (a0) => (Module2["_sqlite3_errmsg16"] = wasmExports["ie"])(a0);
    Module2["_sqlite3_errcode"] = (a0) => (Module2["_sqlite3_errcode"] = wasmExports["je"])(a0);
    Module2["_sqlite3_extended_errcode"] = (a0) => (Module2["_sqlite3_extended_errcode"] = wasmExports["ke"])(a0);
    Module2["_sqlite3_system_errno"] = (a0) => (Module2["_sqlite3_system_errno"] = wasmExports["le"])(a0);
    Module2["_sqlite3_errstr"] = (a0) => (Module2["_sqlite3_errstr"] = wasmExports["me"])(a0);
    Module2["_sqlite3_limit"] = (a0, a1, a2) => (Module2["_sqlite3_limit"] = wasmExports["ne"])(a0, a1, a2);
    Module2["_sqlite3_open"] = (a0, a1) => (Module2["_sqlite3_open"] = wasmExports["oe"])(a0, a1);
    Module2["_sqlite3_open_v2"] = (a0, a1, a2, a3) => (Module2["_sqlite3_open_v2"] = wasmExports["pe"])(a0, a1, a2, a3);
    Module2["_sqlite3_open16"] = (a0, a1) => (Module2["_sqlite3_open16"] = wasmExports["qe"])(a0, a1);
    Module2["_sqlite3_create_collation"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_create_collation"] = wasmExports["re"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_create_collation_v2"] = (a0, a1, a2, a3, a4, a5) => (Module2["_sqlite3_create_collation_v2"] = wasmExports["se"])(a0, a1, a2, a3, a4, a5);
    Module2["_sqlite3_create_collation16"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_create_collation16"] = wasmExports["te"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_collation_needed"] = (a0, a1, a2) => (Module2["_sqlite3_collation_needed"] = wasmExports["ue"])(a0, a1, a2);
    Module2["_sqlite3_collation_needed16"] = (a0, a1, a2) => (Module2["_sqlite3_collation_needed16"] = wasmExports["ve"])(a0, a1, a2);
    Module2["_sqlite3_get_clientdata"] = (a0, a1) => (Module2["_sqlite3_get_clientdata"] = wasmExports["we"])(a0, a1);
    Module2["_sqlite3_set_clientdata"] = (a0, a1, a2, a3) => (Module2["_sqlite3_set_clientdata"] = wasmExports["xe"])(a0, a1, a2, a3);
    Module2["_sqlite3_get_autocommit"] = (a0) => (Module2["_sqlite3_get_autocommit"] = wasmExports["ye"])(a0);
    Module2["_sqlite3_table_column_metadata"] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (Module2["_sqlite3_table_column_metadata"] = wasmExports["ze"])(a0, a1, a2, a3, a4, a5, a6, a7, a8);
    Module2["_sqlite3_sleep"] = (a0) => (Module2["_sqlite3_sleep"] = wasmExports["Ae"])(a0);
    Module2["_sqlite3_extended_result_codes"] = (a0, a1) => (Module2["_sqlite3_extended_result_codes"] = wasmExports["Be"])(a0, a1);
    Module2["_sqlite3_file_control"] = (a0, a1, a2, a3) => (Module2["_sqlite3_file_control"] = wasmExports["Ce"])(a0, a1, a2, a3);
    Module2["_sqlite3_test_control"] = (a0, a1) => (Module2["_sqlite3_test_control"] = wasmExports["De"])(a0, a1);
    Module2["_sqlite3_create_filename"] = (a0, a1, a2, a3, a4) => (Module2["_sqlite3_create_filename"] = wasmExports["Ee"])(a0, a1, a2, a3, a4);
    Module2["_sqlite3_free_filename"] = (a0) => (Module2["_sqlite3_free_filename"] = wasmExports["Fe"])(a0);
    Module2["_sqlite3_uri_parameter"] = (a0, a1) => (Module2["_sqlite3_uri_parameter"] = wasmExports["Ge"])(a0, a1);
    Module2["_sqlite3_uri_key"] = (a0, a1) => (Module2["_sqlite3_uri_key"] = wasmExports["He"])(a0, a1);
    Module2["_sqlite3_uri_boolean"] = (a0, a1, a2) => (Module2["_sqlite3_uri_boolean"] = wasmExports["Ie"])(a0, a1, a2);
    Module2["_sqlite3_uri_int64"] = (a0, a1, a2, a3) => (Module2["_sqlite3_uri_int64"] = wasmExports["Je"])(a0, a1, a2, a3);
    Module2["_sqlite3_filename_database"] = (a0) => (Module2["_sqlite3_filename_database"] = wasmExports["Ke"])(a0);
    Module2["_sqlite3_filename_journal"] = (a0) => (Module2["_sqlite3_filename_journal"] = wasmExports["Le"])(a0);
    Module2["_sqlite3_filename_wal"] = (a0) => (Module2["_sqlite3_filename_wal"] = wasmExports["Me"])(a0);
    Module2["_sqlite3_db_name"] = (a0, a1) => (Module2["_sqlite3_db_name"] = wasmExports["Ne"])(a0, a1);
    Module2["_sqlite3_db_filename"] = (a0, a1) => (Module2["_sqlite3_db_filename"] = wasmExports["Oe"])(a0, a1);
    Module2["_sqlite3_db_readonly"] = (a0, a1) => (Module2["_sqlite3_db_readonly"] = wasmExports["Pe"])(a0, a1);
    Module2["_sqlite3_compileoption_used"] = (a0) => (Module2["_sqlite3_compileoption_used"] = wasmExports["Qe"])(a0);
    Module2["_sqlite3_compileoption_get"] = (a0) => (Module2["_sqlite3_compileoption_get"] = wasmExports["Re"])(a0);
    Module2["_sqlite3_sourceid"] = () => (Module2["_sqlite3_sourceid"] = wasmExports["Se"])();
    var ___errno_location = () => (___errno_location = wasmExports["Te"])();
    var _malloc = Module2["_malloc"] = (a0) => (_malloc = Module2["_malloc"] = wasmExports["Ue"])(a0);
    Module2["_free"] = (a0) => (Module2["_free"] = wasmExports["Ve"])(a0);
    Module2["_RegisterExtensionFunctions"] = (a0) => (Module2["_RegisterExtensionFunctions"] = wasmExports["We"])(a0);
    Module2["_getSqliteFree"] = () => (Module2["_getSqliteFree"] = wasmExports["Xe"])();
    var _main = Module2["_main"] = (a0, a1) => (_main = Module2["_main"] = wasmExports["Ye"])(a0, a1);
    Module2["_libauthorizer_set_authorizer"] = (a0, a1, a2) => (Module2["_libauthorizer_set_authorizer"] = wasmExports["Ze"])(a0, a1, a2);
    Module2["_libfunction_create_function"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module2["_libfunction_create_function"] = wasmExports["_e"])(a0, a1, a2, a3, a4, a5, a6, a7);
    Module2["_libprogress_progress_handler"] = (a0, a1, a2, a3) => (Module2["_libprogress_progress_handler"] = wasmExports["$e"])(a0, a1, a2, a3);
    Module2["_libvfs_vfs_register"] = (a0, a1, a2, a3, a4, a5) => (Module2["_libvfs_vfs_register"] = wasmExports["af"])(a0, a1, a2, a3, a4, a5);
    var _emscripten_builtin_memalign = (a0, a1) => (_emscripten_builtin_memalign = wasmExports["cf"])(a0, a1);
    var getTempRet0 = () => (getTempRet0 = wasmExports["df"])();
    var stackSave = () => (stackSave = wasmExports["ef"])();
    var stackRestore = (a0) => (stackRestore = wasmExports["ff"])(a0);
    var stackAlloc = (a0) => (stackAlloc = wasmExports["gf"])(a0);
    Module2["_sqlite3_version"] = 3232;
    Module2["getTempRet0"] = getTempRet0;
    Module2["ccall"] = ccall;
    Module2["cwrap"] = cwrap;
    Module2["addFunction"] = addFunction;
    Module2["setValue"] = setValue;
    Module2["getValue"] = getValue;
    Module2["UTF8ToString"] = UTF8ToString;
    Module2["stringToUTF8"] = stringToUTF8;
    Module2["lengthBytesUTF8"] = lengthBytesUTF8;
    Module2["intArrayFromString"] = intArrayFromString;
    Module2["intArrayToString"] = intArrayToString;
    Module2["AsciiToString"] = AsciiToString;
    Module2["UTF16ToString"] = UTF16ToString;
    Module2["stringToUTF16"] = stringToUTF16;
    Module2["UTF32ToString"] = UTF32ToString;
    Module2["stringToUTF32"] = stringToUTF32;
    Module2["writeArrayToMemory"] = writeArrayToMemory;
    var calledRun;
    dependenciesFulfilled = function runCaller() {
      if (!calledRun) run();
      if (!calledRun) dependenciesFulfilled = runCaller;
    };
    function callMain() {
      var entryFunction = _main;
      var argc = 0;
      var argv = 0;
      try {
        var ret = entryFunction(argc, argv);
        exitJS(ret, true);
        return ret;
      } catch (e) {
        return handleException(e);
      }
    }
    function run() {
      if (runDependencies > 0) {
        return;
      }
      preRun();
      if (runDependencies > 0) {
        return;
      }
      function doRun() {
        if (calledRun) return;
        calledRun = true;
        Module2["calledRun"] = true;
        if (ABORT) return;
        initRuntime();
        preMain();
        readyPromiseResolve(Module2);
        if (Module2["onRuntimeInitialized"]) Module2["onRuntimeInitialized"]();
        if (shouldRunNow) callMain();
        postRun();
      }
      if (Module2["setStatus"]) {
        Module2["setStatus"]("Running...");
        setTimeout(function() {
          setTimeout(function() {
            Module2["setStatus"]("");
          }, 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
    }
    if (Module2["preInit"]) {
      if (typeof Module2["preInit"] == "function") Module2["preInit"] = [Module2["preInit"]];
      while (Module2["preInit"].length > 0) {
        Module2["preInit"].pop()();
      }
    }
    var shouldRunNow = true;
    if (Module2["noInitialRun"]) shouldRunNow = false;
    run();
    (function() {
      const AsyncFunction = Object.getPrototypeOf(async function() {
      }).constructor;
      let pAsyncFlags = 0;
      Module2["set_authorizer"] = function(db, xAuthorizer, pApp) {
        if (pAsyncFlags) {
          Module2["deleteCallback"](pAsyncFlags);
          Module2["_sqlite3_free"](pAsyncFlags);
          pAsyncFlags = 0;
        }
        pAsyncFlags = Module2["_sqlite3_malloc"](4);
        setValue(pAsyncFlags, xAuthorizer instanceof AsyncFunction ? 1 : 0, "i32");
        const result = ccall("libauthorizer_set_authorizer", "number", ["number", "number", "number"], [db, xAuthorizer ? 1 : 0, pAsyncFlags]);
        if (!result && xAuthorizer) {
          Module2["setCallback"](pAsyncFlags, (_, iAction, p3, p4, p5, p6) => xAuthorizer(pApp, iAction, p3, p4, p5, p6));
        }
        return result;
      };
    })();
    (function() {
      const AsyncFunction = Object.getPrototypeOf(async function() {
      }).constructor;
      const FUNC_METHODS = ["xFunc", "xStep", "xFinal"];
      const mapFunctionNameToKey = /* @__PURE__ */ new Map();
      Module2["create_function"] = function(db, zFunctionName, nArg, eTextRep, pApp, xFunc, xStep, xFinal) {
        const pAsyncFlags = Module2["_sqlite3_malloc"](4);
        const target = { xFunc, xStep, xFinal };
        setValue(pAsyncFlags, FUNC_METHODS.reduce((mask, method, i) => {
          if (target[method] instanceof AsyncFunction) {
            return mask | 1 << i;
          }
          return mask;
        }, 0), "i32");
        const result = ccall("libfunction_create_function", "number", ["number", "string", "number", "number", "number", "number", "number", "number"], [db, zFunctionName, nArg, eTextRep, pAsyncFlags, xFunc ? 1 : 0, xStep ? 1 : 0, xFinal ? 1 : 0]);
        if (!result) {
          if (mapFunctionNameToKey.has(zFunctionName)) {
            const oldKey = mapFunctionNameToKey.get(zFunctionName);
            Module2["deleteCallback"](oldKey);
          }
          mapFunctionNameToKey.set(zFunctionName, pAsyncFlags);
          Module2["setCallback"](pAsyncFlags, { xFunc, xStep, xFinal });
        }
        return result;
      };
    })();
    (function() {
      const AsyncFunction = Object.getPrototypeOf(async function() {
      }).constructor;
      let pAsyncFlags = 0;
      Module2["progress_handler"] = function(db, nOps, xProgress, pApp) {
        if (pAsyncFlags) {
          Module2["deleteCallback"](pAsyncFlags);
          Module2["_sqlite3_free"](pAsyncFlags);
          pAsyncFlags = 0;
        }
        pAsyncFlags = Module2["_sqlite3_malloc"](4);
        setValue(pAsyncFlags, xProgress instanceof AsyncFunction ? 1 : 0, "i32");
        ccall("libprogress_progress_handler", "number", ["number", "number", "number", "number"], [db, nOps, xProgress ? 1 : 0, pAsyncFlags]);
        if (xProgress) {
          Module2["setCallback"](pAsyncFlags, (_) => xProgress(pApp));
        }
      };
    })();
    (function() {
      const VFS_METHODS = ["xOpen", "xDelete", "xAccess", "xFullPathname", "xRandomness", "xSleep", "xCurrentTime", "xGetLastError", "xCurrentTimeInt64", "xClose", "xRead", "xWrite", "xTruncate", "xSync", "xFileSize", "xLock", "xUnlock", "xCheckReservedLock", "xFileControl", "xSectorSize", "xDeviceCharacteristics", "xShmMap", "xShmLock", "xShmBarrier", "xShmUnmap"];
      const mapVFSNameToKey = /* @__PURE__ */ new Map();
      Module2["vfs_register"] = function(vfs, makeDefault) {
        let methodMask = 0;
        let asyncMask = 0;
        VFS_METHODS.forEach((method, i) => {
          if (vfs[method]) {
            methodMask |= 1 << i;
            if (vfs["hasAsyncMethod"](method)) {
              asyncMask |= 1 << i;
            }
          }
        });
        const vfsReturn = Module2["_sqlite3_malloc"](4);
        try {
          const result = ccall("libvfs_vfs_register", "number", ["string", "number", "number", "number", "number", "number"], [vfs.name, vfs.mxPathname, methodMask, asyncMask, makeDefault ? 1 : 0, vfsReturn]);
          if (!result) {
            if (mapVFSNameToKey.has(vfs.name)) {
              const oldKey = mapVFSNameToKey.get(vfs.name);
              Module2["deleteCallback"](oldKey);
            }
            const key = getValue(vfsReturn, "*");
            mapVFSNameToKey.set(vfs.name, key);
            Module2["setCallback"](key, vfs);
          }
          return result;
        } finally {
          Module2["_sqlite3_free"](vfsReturn);
        }
      };
    })();
    return moduleArg.ready;
  };
})();
var wa_sqlite_default = Module;
var DEFAULT_TEMPORARY_FILES = 10;
var LOCK_NOTIFY_INTERVAL = 1e3;
var DB_RELATED_FILE_SUFFIXES = ["", "-journal", "-wal"];
var finalizationRegistry = new FinalizationRegistry((releaser) => releaser());
var File = class {
  constructor(path, flags) {
    /** @type {string} */
    __publicField(this, "path");
    /** @type {number} */
    __publicField(this, "flags");
    /** @type {FileSystemSyncAccessHandle} */
    __publicField(this, "accessHandle");
    /** @type {PersistentFile?} */
    __publicField(this, "persistentFile");
    this.path = path;
    this.flags = flags;
  }
};
var PersistentFile = class {
  constructor(fileHandle) {
    /** @type {FileSystemFileHandle} */
    __publicField(this, "fileHandle");
    /** @type {FileSystemSyncAccessHandle} */
    __publicField(this, "accessHandle", null);
    // The following properties are for main database files.
    /** @type {boolean} */
    __publicField(this, "isLockBusy", false);
    /** @type {boolean} */
    __publicField(this, "isFileLocked", false);
    /** @type {boolean} */
    __publicField(this, "isRequestInProgress", false);
    /** @type {function} */
    __publicField(this, "handleLockReleaser", null);
    /** @type {BroadcastChannel} */
    __publicField(this, "handleRequestChannel");
    /** @type {boolean} */
    __publicField(this, "isHandleRequested", false);
    this.fileHandle = fileHandle;
  }
};
var OPFSCoopSyncVFS = (_a = class extends FacadeVFS {
  constructor(name, module) {
    super(name, module);
    __privateAdd(this, __OPFSCoopSyncVFS_instances);
    /** @type {Map<number, File>} */
    __publicField(this, "mapIdToFile", /* @__PURE__ */ new Map());
    __publicField(this, "lastError", null);
    __publicField(this, "log", null);
    //function(...args) { console.log(`[${contextName}]`, ...args) };
    /** @type {Map<string, PersistentFile>} */
    __publicField(this, "persistentFiles", /* @__PURE__ */ new Map());
    /** @type {Map<string, FileSystemSyncAccessHandle>} */
    __publicField(this, "boundAccessHandles", /* @__PURE__ */ new Map());
    /** @type {Set<FileSystemSyncAccessHandle>} */
    __publicField(this, "unboundAccessHandles", /* @__PURE__ */ new Set());
    /** @type {Set<string>} */
    __publicField(this, "accessiblePaths", /* @__PURE__ */ new Set());
    __publicField(this, "releaser", null);
  }
  static async create(name, module) {
    var _a2;
    const vfs = new _a(name, module);
    await Promise.all([
      vfs.isReady(),
      __privateMethod(_a2 = vfs, __OPFSCoopSyncVFS_instances, initialize_fn).call(_a2, DEFAULT_TEMPORARY_FILES)
    ]);
    return vfs;
  }
  /**
   * @param {string?} zName 
   * @param {number} fileId 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {number}
   */
  jOpen(zName, fileId, flags, pOutFlags) {
    try {
      const url = new URL(zName || Math.random().toString(36).slice(2), "file://");
      const path = url.pathname;
      if (flags & SQLITE_OPEN_MAIN_DB) {
        const persistentFile = this.persistentFiles.get(path);
        if (persistentFile?.isRequestInProgress) {
          return SQLITE_BUSY;
        } else if (!persistentFile) {
          this.log?.(`creating persistent file for ${path}`);
          const create = !!(flags & SQLITE_OPEN_CREATE);
          this._module.retryOps.push((async () => {
            try {
              let dirHandle = await navigator.storage.getDirectory();
              const directories = path.split("/").filter((d) => d);
              const filename = directories.pop();
              for (const directory of directories) {
                dirHandle = await dirHandle.getDirectoryHandle(directory, { create });
              }
              for (const suffix of DB_RELATED_FILE_SUFFIXES) {
                const fileHandle = await dirHandle.getFileHandle(filename + suffix, { create });
                await __privateMethod(this, __OPFSCoopSyncVFS_instances, createPersistentFile_fn).call(this, fileHandle);
              }
              const file2 = new File(path, flags);
              file2.persistentFile = this.persistentFiles.get(path);
              await __privateMethod(this, __OPFSCoopSyncVFS_instances, requestAccessHandle_fn).call(this, file2);
            } catch (e) {
              const persistentFile2 = new PersistentFile(null);
              this.persistentFiles.set(path, persistentFile2);
              console.error(e);
            }
          })());
          return SQLITE_BUSY;
        } else if (!persistentFile.fileHandle) {
          this.persistentFiles.delete(path);
          return SQLITE_CANTOPEN;
        } else if (!persistentFile.accessHandle) {
          this._module.retryOps.push((async () => {
            const file2 = new File(path, flags);
            file2.persistentFile = this.persistentFiles.get(path);
            await __privateMethod(this, __OPFSCoopSyncVFS_instances, requestAccessHandle_fn).call(this, file2);
          })());
          return SQLITE_BUSY;
        }
      }
      if (!this.accessiblePaths.has(path) && !(flags & SQLITE_OPEN_CREATE)) {
        throw new Error(`File ${path} not found`);
      }
      const file = new File(path, flags);
      this.mapIdToFile.set(fileId, file);
      if (this.persistentFiles.has(path)) {
        file.persistentFile = this.persistentFiles.get(path);
      } else if (this.boundAccessHandles.has(path)) {
        file.accessHandle = this.boundAccessHandles.get(path);
      } else if (this.unboundAccessHandles.size) {
        file.accessHandle = this.unboundAccessHandles.values().next().value;
        file.accessHandle.truncate(0);
        this.unboundAccessHandles.delete(file.accessHandle);
        this.boundAccessHandles.set(path, file.accessHandle);
      }
      this.accessiblePaths.add(path);
      pOutFlags.setInt32(0, flags, true);
      return SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return SQLITE_CANTOPEN;
    }
  }
  /**
   * @param {string} zName 
   * @param {number} syncDir 
   * @returns {number}
   */
  jDelete(zName, syncDir) {
    try {
      const url = new URL(zName, "file://");
      const path = url.pathname;
      if (this.persistentFiles.has(path)) {
        const persistentFile = this.persistentFiles.get(path);
        persistentFile.accessHandle.truncate(0);
      } else {
        this.boundAccessHandles.get(path)?.truncate(0);
      }
      this.accessiblePaths.delete(path);
      return SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return SQLITE_IOERR_DELETE;
    }
  }
  /**
   * @param {string} zName 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {number}
   */
  jAccess(zName, flags, pResOut) {
    try {
      const url = new URL(zName, "file://");
      const path = url.pathname;
      pResOut.setInt32(0, this.accessiblePaths.has(path) ? 1 : 0, true);
      return SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return SQLITE_IOERR_ACCESS;
    }
  }
  /**
   * @param {number} fileId 
   * @returns {number}
   */
  jClose(fileId) {
    try {
      const file = this.mapIdToFile.get(fileId);
      this.mapIdToFile.delete(fileId);
      if (file?.flags & SQLITE_OPEN_MAIN_DB) {
        if (file.persistentFile?.handleLockReleaser) {
          __privateMethod(this, __OPFSCoopSyncVFS_instances, releaseAccessHandle_fn).call(this, file);
        }
      } else if (file?.flags & SQLITE_OPEN_DELETEONCLOSE) {
        file.accessHandle.truncate(0);
        this.accessiblePaths.delete(file.path);
        if (!this.persistentFiles.has(file.path)) {
          this.boundAccessHandles.delete(file.path);
          this.unboundAccessHandles.add(file.accessHandle);
        }
      }
      return SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return SQLITE_IOERR_CLOSE;
    }
  }
  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  jRead(fileId, pData, iOffset) {
    try {
      const file = this.mapIdToFile.get(fileId);
      const accessHandle = file.accessHandle || file.persistentFile.accessHandle;
      const bytesRead = accessHandle.read(pData.subarray(), { at: iOffset });
      if (file.flags & SQLITE_OPEN_MAIN_DB && !file.persistentFile.isFileLocked) {
        __privateMethod(this, __OPFSCoopSyncVFS_instances, releaseAccessHandle_fn).call(this, file);
      }
      if (bytesRead < pData.byteLength) {
        pData.fill(0, bytesRead);
        return SQLITE_IOERR_SHORT_READ;
      }
      return SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return SQLITE_IOERR_READ;
    }
  }
  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  jWrite(fileId, pData, iOffset) {
    try {
      const file = this.mapIdToFile.get(fileId);
      const accessHandle = file.accessHandle || file.persistentFile.accessHandle;
      const nBytes = accessHandle.write(pData.subarray(), { at: iOffset });
      if (nBytes !== pData.byteLength) throw new Error("short write");
      return SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return SQLITE_IOERR_WRITE;
    }
  }
  /**
   * @param {number} fileId 
   * @param {number} iSize 
   * @returns {number}
   */
  jTruncate(fileId, iSize) {
    try {
      const file = this.mapIdToFile.get(fileId);
      const accessHandle = file.accessHandle || file.persistentFile.accessHandle;
      accessHandle.truncate(iSize);
      return SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return SQLITE_IOERR_TRUNCATE;
    }
  }
  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {number}
   */
  jSync(fileId, flags) {
    try {
      const file = this.mapIdToFile.get(fileId);
      const accessHandle = file.accessHandle || file.persistentFile.accessHandle;
      accessHandle.flush();
      return SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return SQLITE_IOERR_FSYNC;
    }
  }
  /**
   * @param {number} fileId 
   * @param {DataView} pSize64 
   * @returns {number}
   */
  jFileSize(fileId, pSize64) {
    try {
      const file = this.mapIdToFile.get(fileId);
      const accessHandle = file.accessHandle || file.persistentFile.accessHandle;
      const size = accessHandle.getSize();
      pSize64.setBigInt64(0, BigInt(size), true);
      return SQLITE_OK;
    } catch (e) {
      this.lastError = e;
      return SQLITE_IOERR_FSTAT;
    }
  }
  /**
   * @param {number} fileId 
   * @param {number} lockType 
   * @returns {number}
   */
  jLock(fileId, lockType) {
    const file = this.mapIdToFile.get(fileId);
    if (file.persistentFile.isRequestInProgress) {
      file.persistentFile.isLockBusy = true;
      return SQLITE_BUSY;
    }
    file.persistentFile.isFileLocked = true;
    if (!file.persistentFile.handleLockReleaser) {
      file.persistentFile.handleRequestChannel.onmessage = () => {
        this.log?.(`received notification for ${file.path}`);
        if (file.persistentFile.isFileLocked) {
          file.persistentFile.isHandleRequested = true;
        } else {
          __privateMethod(this, __OPFSCoopSyncVFS_instances, releaseAccessHandle_fn).call(this, file);
        }
        file.persistentFile.handleRequestChannel.onmessage = null;
      };
      __privateMethod(this, __OPFSCoopSyncVFS_instances, requestAccessHandle_fn).call(this, file);
      this.log?.("returning SQLITE_BUSY");
      file.persistentFile.isLockBusy = true;
      return SQLITE_BUSY;
    }
    file.persistentFile.isLockBusy = false;
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId 
   * @param {number} lockType 
   * @returns {number}
   */
  jUnlock(fileId, lockType) {
    const file = this.mapIdToFile.get(fileId);
    if (lockType === SQLITE_LOCK_NONE) {
      if (!file.persistentFile.isLockBusy) {
        if (file.persistentFile.isHandleRequested) {
          __privateMethod(this, __OPFSCoopSyncVFS_instances, releaseAccessHandle_fn).call(this, file);
          this.isHandleRequested = false;
        }
        file.persistentFile.isFileLocked = false;
      }
    }
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId
   * @param {number} op
   * @param {DataView} pArg
   * @returns {number|Promise<number>}
   */
  jFileControl(fileId, op, pArg) {
    try {
      const file = this.mapIdToFile.get(fileId);
      switch (op) {
        case SQLITE_FCNTL_PRAGMA:
          const key = extractString(pArg, 4);
          const value = extractString(pArg, 8);
          this.log?.("xFileControl", file.path, "PRAGMA", key, value);
          switch (key.toLowerCase()) {
            case "journal_mode":
              if (value && !["off", "memory", "delete", "wal"].includes(value.toLowerCase())) {
                throw new Error('journal_mode must be "off", "memory", "delete", or "wal"');
              }
              break;
          }
          break;
      }
    } catch (e) {
      this.lastError = e;
      return SQLITE_IOERR;
    }
    return SQLITE_NOTFOUND;
  }
  /**
   * @param {Uint8Array} zBuf 
   * @returns 
   */
  jGetLastError(zBuf) {
    if (this.lastError) {
      console.error(this.lastError);
      const outputArray = zBuf.subarray(0, zBuf.byteLength - 1);
      const { written } = new TextEncoder().encodeInto(this.lastError.message, outputArray);
      zBuf[written] = 0;
    }
    return SQLITE_OK;
  }
}, __OPFSCoopSyncVFS_instances = new WeakSet(), initialize_fn = async function(nTemporaryFiles) {
  const root = await navigator.storage.getDirectory();
  for await (const entry of root.values()) {
    if (entry.kind === "directory" && entry.name.startsWith(".ahp-")) {
      await navigator.locks.request(entry.name, { ifAvailable: true }, async (lock) => {
        if (lock) {
          this.log?.(`Deleting temporary directory ${entry.name}`);
          await root.removeEntry(entry.name, { recursive: true });
        } else {
          this.log?.(`Temporary directory ${entry.name} is in use`);
        }
      });
    }
  }
  const tmpDirName = `.ahp-${Math.random().toString(36).slice(2)}`;
  this.releaser = await new Promise((resolve) => {
    navigator.locks.request(tmpDirName, () => {
      return new Promise((release) => {
        resolve(release);
      });
    });
  });
  finalizationRegistry.register(this, this.releaser);
  const tmpDir = await root.getDirectoryHandle(tmpDirName, { create: true });
  for (let i = 0; i < nTemporaryFiles; i++) {
    const tmpFile = await tmpDir.getFileHandle(`${i}.tmp`, { create: true });
    const tmpAccessHandle = await tmpFile.createSyncAccessHandle();
    this.unboundAccessHandles.add(tmpAccessHandle);
  }
}, createPersistentFile_fn = async function(fileHandle) {
  const persistentFile = new PersistentFile(fileHandle);
  const root = await navigator.storage.getDirectory();
  const relativePath = await root.resolve(fileHandle);
  const path = `/${relativePath.join("/")}`;
  persistentFile.handleRequestChannel = new BroadcastChannel(`ahp:${path}`);
  this.persistentFiles.set(path, persistentFile);
  const f = await fileHandle.getFile();
  if (f.size) {
    this.accessiblePaths.add(path);
  }
  return persistentFile;
}, /**
 * @param {File} file 
 */
requestAccessHandle_fn = function(file) {
  console.assert(!file.persistentFile.handleLockReleaser);
  if (!file.persistentFile.isRequestInProgress) {
    file.persistentFile.isRequestInProgress = true;
    this._module.retryOps.push((async () => {
      file.persistentFile.handleLockReleaser = await __privateMethod(this, __OPFSCoopSyncVFS_instances, acquireLock_fn).call(this, file.persistentFile);
      this.log?.(`creating access handles for ${file.path}`);
      await Promise.all(DB_RELATED_FILE_SUFFIXES.map(async (suffix) => {
        const persistentFile = this.persistentFiles.get(file.path + suffix);
        if (persistentFile) {
          persistentFile.accessHandle = await persistentFile.fileHandle.createSyncAccessHandle();
        }
      }));
      file.persistentFile.isRequestInProgress = false;
    })());
    return this._module.retryOps.at(-1);
  }
  return Promise.resolve();
}, releaseAccessHandle_fn = async function(file) {
  DB_RELATED_FILE_SUFFIXES.forEach(async (suffix) => {
    const persistentFile = this.persistentFiles.get(file.path + suffix);
    if (persistentFile) {
      persistentFile.accessHandle?.close();
      persistentFile.accessHandle = null;
    }
  });
  this.log?.(`access handles closed for ${file.path}`);
  file.persistentFile.handleLockReleaser?.();
  file.persistentFile.handleLockReleaser = null;
  this.log?.(`lock released for ${file.path}`);
}, /**
 * @param {PersistentFile} persistentFile 
 * @returns  {Promise<function>} lock releaser
 */
acquireLock_fn = function(persistentFile) {
  return new Promise((resolve) => {
    const lockName = persistentFile.handleRequestChannel.name;
    const notify = () => {
      this.log?.(`notifying for ${lockName}`);
      persistentFile.handleRequestChannel.postMessage(null);
    };
    const notifyId = setInterval(notify, LOCK_NOTIFY_INTERVAL);
    setTimeout(notify);
    this.log?.(`lock requested: ${lockName}`);
    navigator.locks.request(lockName, (lock) => {
      this.log?.(`lock acquired: ${lockName}`, lock);
      clearInterval(notifyId);
      return new Promise(resolve);
    });
  });
}, _a);
function extractString(dataView, offset) {
  const p = dataView.getUint32(offset, true);
  if (p) {
    const chars = new Uint8Array(dataView.buffer, p);
    return new TextDecoder().decode(chars.subarray(0, chars.indexOf(0)));
  }
  return null;
}
async function useOpfsStorage(path, options = {}) {
  const sqliteModule = await wa_sqlite_default(
    options.url ? { locateFile: () => options.url } : void 0
  );
  return {
    path,
    readonly: options.readonly,
    sqliteModule,
    vfsFn: OPFSCoopSyncVFS.create
  };
}
export {
  OPFSCoopSyncVFS,
  useOpfsStorage
};
