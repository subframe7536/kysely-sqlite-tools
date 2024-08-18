var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __defProp2 = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
};
var Module, wa_sqlite_default;
var init_chunk_XYF4QS23 = __esm({
  "../../node_modules/.pnpm/@subframe7536+sqlite-wasm@0.3.1/node_modules/@subframe7536/sqlite-wasm/dist/chunk-XYF4QS23.mjs"() {
    Module = (() => {
      var _scriptDir = self.location.href;
      return function(moduleArg = {}) {
        var Module22 = moduleArg;
        var readyPromiseResolve, readyPromiseReject;
        Module22["ready"] = new Promise((resolve, reject) => {
          readyPromiseResolve = resolve;
          readyPromiseReject = reject;
        });
        var moduleOverrides = Object.assign({}, Module22);
        var thisProgram = "./this.program";
        var quit_ = (status, toThrow) => {
          throw toThrow;
        };
        var ENVIRONMENT_IS_WEB = typeof window == "object";
        var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
        typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
        var scriptDirectory = "";
        function locateFile(path) {
          if (Module22["locateFile"]) {
            return Module22["locateFile"](path, scriptDirectory);
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
        var out = Module22["print"] || console.log.bind(console);
        var err = Module22["printErr"] || console.error.bind(console);
        Object.assign(Module22, moduleOverrides);
        moduleOverrides = null;
        if (Module22["arguments"]) Module22["arguments"];
        if (Module22["thisProgram"]) thisProgram = Module22["thisProgram"];
        if (Module22["quit"]) quit_ = Module22["quit"];
        var wasmBinary;
        if (Module22["wasmBinary"]) wasmBinary = Module22["wasmBinary"];
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
          Module22["HEAP8"] = HEAP8 = new Int8Array(b);
          Module22["HEAP16"] = HEAP16 = new Int16Array(b);
          Module22["HEAPU8"] = HEAPU8 = new Uint8Array(b);
          Module22["HEAPU16"] = HEAPU16 = new Uint16Array(b);
          Module22["HEAP32"] = HEAP32 = new Int32Array(b);
          Module22["HEAPU32"] = HEAPU32 = new Uint32Array(b);
          Module22["HEAPF32"] = HEAPF32 = new Float32Array(b);
          Module22["HEAPF64"] = HEAPF64 = new Float64Array(b);
        }
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATMAIN__ = [];
        var __ATPOSTRUN__ = [];
        function preRun() {
          if (Module22["preRun"]) {
            if (typeof Module22["preRun"] == "function") Module22["preRun"] = [Module22["preRun"]];
            while (Module22["preRun"].length) {
              addOnPreRun(Module22["preRun"].shift());
            }
          }
          callRuntimeCallbacks(__ATPRERUN__);
        }
        function initRuntime() {
          if (!Module22["noFSInit"] && !FS.init.initialized) FS.init();
          FS.ignorePermissions = false;
          callRuntimeCallbacks(__ATINIT__);
        }
        function preMain() {
          callRuntimeCallbacks(__ATMAIN__);
        }
        function postRun() {
          if (Module22["postRun"]) {
            if (typeof Module22["postRun"] == "function") Module22["postRun"] = [Module22["postRun"]];
            while (Module22["postRun"].length) {
              addOnPostRun(Module22["postRun"].shift());
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
          if (Module22["monitorRunDependencies"]) {
            Module22["monitorRunDependencies"](runDependencies);
          }
        }
        function removeRunDependency(id) {
          runDependencies--;
          if (Module22["monitorRunDependencies"]) {
            Module22["monitorRunDependencies"](runDependencies);
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
          if (Module22["onAbort"]) {
            Module22["onAbort"](what);
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
        if (Module22["locateFile"]) {
          wasmBinaryFile = "wa-sqlite.wasm";
          if (!isDataURI(wasmBinaryFile)) {
            wasmBinaryFile = locateFile(wasmBinaryFile);
          }
        } else {
          wasmBinaryFile = new URL("wa-sqlite.wasm", self.location.href).href;
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
          if (Module22["instantiateWasm"]) {
            try {
              return Module22["instantiateWasm"](info, receiveInstance);
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
            callbacks.shift()(Module22);
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
        var noExitRuntime = Module22["noExitRuntime"] || true;
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
        }, stream_ops: { open(stream2) {
          var tty = TTY.ttys[stream2.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream2.tty = tty;
          stream2.seekable = false;
        }, close(stream2) {
          stream2.tty.ops.fsync(stream2.tty);
        }, fsync(stream2) {
          stream2.tty.ops.fsync(stream2.tty);
        }, read(stream2, buffer, offset, length, pos) {
          if (!stream2.tty || !stream2.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream2.tty.ops.get_char(stream2.tty);
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
            stream2.node.timestamp = Date.now();
          }
          return bytesRead;
        }, write(stream2, buffer, offset, length, pos) {
          if (!stream2.tty || !stream2.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream2.tty.ops.put_char(stream2.tty, buffer[offset + i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream2.node.timestamp = Date.now();
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
        } }, stream_ops: { read(stream2, buffer, offset, length, position) {
          var contents = stream2.node.contents;
          if (position >= stream2.node.usedBytes) return 0;
          var size = Math.min(stream2.node.usedBytes - position, length);
          if (size > 8 && contents.subarray) {
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        }, write(stream2, buffer, offset, length, position, canOwn) {
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false;
          }
          if (!length) return 0;
          var node = stream2.node;
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
        }, llseek(stream2, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream2.position;
          } else if (whence === 2) {
            if (FS.isFile(stream2.node.mode)) {
              position += stream2.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        }, allocate(stream2, offset, length) {
          MEMFS.expandFileStorage(stream2.node, offset + length);
          stream2.node.usedBytes = Math.max(stream2.node.usedBytes, offset + length);
        }, mmap(stream2, length, position, prot, flags) {
          if (!FS.isFile(stream2.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream2.node.contents;
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
        }, msync(stream2, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream2, buffer, 0, length, offset, false);
          return 0;
        } } };
        var asyncLoad = (url, onload, onerror, noRunDep) => {
          var dep = getUniqueRunDependency(`al ${url}`);
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
        var preloadPlugins = Module22["preloadPlugins"] || [];
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
          var stream2 = FS.getStream(fd);
          if (!stream2) {
            throw new FS.ErrnoError(8);
          }
          return stream2;
        }, getStream: (fd) => FS.streams[fd], createStream(stream2, fd = -1) {
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
          stream2 = Object.assign(new FS.FSStream(), stream2);
          if (fd == -1) {
            fd = FS.nextfd();
          }
          stream2.fd = fd;
          FS.streams[fd] = stream2;
          return stream2;
        }, closeStream(fd) {
          FS.streams[fd] = null;
        }, chrdev_stream_ops: { open(stream2) {
          var device = FS.getDevice(stream2.node.rdev);
          stream2.stream_ops = device.stream_ops;
          if (stream2.stream_ops.open) {
            stream2.stream_ops.open(stream2);
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
          var stream2 = FS.getStreamChecked(fd);
          FS.chmod(stream2.node, mode);
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
          var stream2 = FS.getStreamChecked(fd);
          FS.chown(stream2.node, uid, gid);
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
          var stream2 = FS.getStreamChecked(fd);
          if ((stream2.flags & 2097155) === 0) {
            throw new FS.ErrnoError(28);
          }
          FS.truncate(stream2.node, len);
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
          var stream2 = FS.createStream({ node, path: FS.getPath(node), flags, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false });
          if (stream2.stream_ops.open) {
            stream2.stream_ops.open(stream2);
          }
          if (Module22["logReadFiles"] && !(flags & 1)) {
            if (!FS.readFiles) FS.readFiles = {};
            if (!(path in FS.readFiles)) {
              FS.readFiles[path] = 1;
            }
          }
          return stream2;
        }, close(stream2) {
          if (FS.isClosed(stream2)) {
            throw new FS.ErrnoError(8);
          }
          if (stream2.getdents) stream2.getdents = null;
          try {
            if (stream2.stream_ops.close) {
              stream2.stream_ops.close(stream2);
            }
          } catch (e) {
            throw e;
          } finally {
            FS.closeStream(stream2.fd);
          }
          stream2.fd = null;
        }, isClosed(stream2) {
          return stream2.fd === null;
        }, llseek(stream2, offset, whence) {
          if (FS.isClosed(stream2)) {
            throw new FS.ErrnoError(8);
          }
          if (!stream2.seekable || !stream2.stream_ops.llseek) {
            throw new FS.ErrnoError(70);
          }
          if (whence != 0 && whence != 1 && whence != 2) {
            throw new FS.ErrnoError(28);
          }
          stream2.position = stream2.stream_ops.llseek(stream2, offset, whence);
          stream2.ungotten = [];
          return stream2.position;
        }, read(stream2, buffer, offset, length, position) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream2)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream2.flags & 2097155) === 1) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream2.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream2.stream_ops.read) {
            throw new FS.ErrnoError(28);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream2.position;
          } else if (!stream2.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesRead = stream2.stream_ops.read(stream2, buffer, offset, length, position);
          if (!seeking) stream2.position += bytesRead;
          return bytesRead;
        }, write(stream2, buffer, offset, length, position, canOwn) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream2)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream2.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream2.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream2.stream_ops.write) {
            throw new FS.ErrnoError(28);
          }
          if (stream2.seekable && stream2.flags & 1024) {
            FS.llseek(stream2, 0, 2);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream2.position;
          } else if (!stream2.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesWritten = stream2.stream_ops.write(stream2, buffer, offset, length, position, canOwn);
          if (!seeking) stream2.position += bytesWritten;
          return bytesWritten;
        }, allocate(stream2, offset, length) {
          if (FS.isClosed(stream2)) {
            throw new FS.ErrnoError(8);
          }
          if (offset < 0 || length <= 0) {
            throw new FS.ErrnoError(28);
          }
          if ((stream2.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (!FS.isFile(stream2.node.mode) && !FS.isDir(stream2.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (!stream2.stream_ops.allocate) {
            throw new FS.ErrnoError(138);
          }
          stream2.stream_ops.allocate(stream2, offset, length);
        }, mmap(stream2, length, position, prot, flags) {
          if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream2.flags & 2097155) !== 2) {
            throw new FS.ErrnoError(2);
          }
          if ((stream2.flags & 2097155) === 1) {
            throw new FS.ErrnoError(2);
          }
          if (!stream2.stream_ops.mmap) {
            throw new FS.ErrnoError(43);
          }
          return stream2.stream_ops.mmap(stream2, length, position, prot, flags);
        }, msync(stream2, buffer, offset, length, mmapFlags) {
          if (!stream2.stream_ops.msync) {
            return 0;
          }
          return stream2.stream_ops.msync(stream2, buffer, offset, length, mmapFlags);
        }, munmap: (stream2) => 0, ioctl(stream2, cmd, arg) {
          if (!stream2.stream_ops.ioctl) {
            throw new FS.ErrnoError(59);
          }
          return stream2.stream_ops.ioctl(stream2, cmd, arg);
        }, readFile(path, opts = {}) {
          opts.flags = opts.flags || 0;
          opts.encoding = opts.encoding || "binary";
          if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
            throw new Error(`Invalid encoding type "${opts.encoding}"`);
          }
          var ret;
          var stream2 = FS.open(path, opts.flags);
          var stat = FS.stat(path);
          var length = stat.size;
          var buf = new Uint8Array(length);
          FS.read(stream2, buf, 0, length, 0);
          if (opts.encoding === "utf8") {
            ret = UTF8ArrayToString(buf, 0);
          } else if (opts.encoding === "binary") {
            ret = buf;
          }
          FS.close(stream2);
          return ret;
        }, writeFile(path, data, opts = {}) {
          opts.flags = opts.flags || 577;
          var stream2 = FS.open(path, opts.flags, opts.mode);
          if (typeof data == "string") {
            var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
            var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
            FS.write(stream2, buf, 0, actualNumBytes, void 0, opts.canOwn);
          } else if (ArrayBuffer.isView(data)) {
            FS.write(stream2, data, 0, data.byteLength, void 0, opts.canOwn);
          } else {
            throw new Error("Unsupported data type");
          }
          FS.close(stream2);
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
          FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (stream2, buffer, offset, length, pos) => length });
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
              var stream2 = FS.getStreamChecked(fd);
              var ret = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => stream2.path } };
              ret.parent = ret;
              return ret;
            } };
            return node;
          } }, {}, "/proc/self/fd");
        }, createStandardStreams() {
          if (Module22["stdin"]) {
            FS.createDevice("/dev", "stdin", Module22["stdin"]);
          } else {
            FS.symlink("/dev/tty", "/dev/stdin");
          }
          if (Module22["stdout"]) {
            FS.createDevice("/dev", "stdout", null, Module22["stdout"]);
          } else {
            FS.symlink("/dev/tty", "/dev/stdout");
          }
          if (Module22["stderr"]) {
            FS.createDevice("/dev", "stderr", null, Module22["stderr"]);
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
          Module22["stdin"] = input || Module22["stdin"];
          Module22["stdout"] = output || Module22["stdout"];
          Module22["stderr"] = error || Module22["stderr"];
          FS.createStandardStreams();
        }, quit() {
          FS.init.initialized = false;
          for (var i = 0; i < FS.streams.length; i++) {
            var stream2 = FS.streams[i];
            if (!stream2) {
              continue;
            }
            FS.close(stream2);
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
            var stream2 = FS.open(node, 577);
            FS.write(stream2, data, 0, data.length, 0, canOwn);
            FS.close(stream2);
            FS.chmod(node, mode);
          }
          return node;
        }, createDevice(parent, name, input, output) {
          var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
          var mode = FS_getMode(!!input, !!output);
          if (!FS.createDevice.major) FS.createDevice.major = 64;
          var dev = FS.makedev(FS.createDevice.major++, 0);
          FS.registerDevice(dev, { open(stream2) {
            stream2.seekable = false;
          }, close(stream2) {
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          }, read(stream2, buffer, offset, length, pos) {
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
              stream2.node.timestamp = Date.now();
            }
            return bytesRead;
          }, write(stream2, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset + i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream2.node.timestamp = Date.now();
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
          function writeChunks(stream2, buffer, offset, length, position) {
            var contents = stream2.node.contents;
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
          stream_ops.read = (stream2, buffer, offset, length, position) => {
            FS.forceLoadFile(node);
            return writeChunks(stream2, buffer, offset, length, position);
          };
          stream_ops.mmap = (stream2, length, position, prot, flags) => {
            FS.forceLoadFile(node);
            var ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            writeChunks(stream2, HEAP8, ptr, length, position);
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
        }, doMsync(addr, stream2, len, flags, offset) {
          if (!FS.isFile(stream2.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (flags & 2) {
            return 0;
          }
          var buffer = HEAPU8.slice(addr, addr + len);
          FS.msync(stream2, buffer, offset, len, flags);
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
          var stream2 = FS.getStreamChecked(fd);
          return stream2;
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
            var stream2 = SYSCALLS.getStreamFromFD(fd);
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
                newStream = FS.createStream(stream2, arg);
                return newStream.fd;
              }
              case 1:
              case 2:
                return 0;
              case 3:
                return stream2.flags;
              case 4: {
                var arg = SYSCALLS.get();
                stream2.flags |= arg;
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
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            return SYSCALLS.doStat(FS.stat, stream2.path, buf);
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
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            var res = FS.mmap(stream2, len, offset, prot, flags);
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
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            if (prot & 2) {
              SYSCALLS.doMsync(addr, stream2, len, flags, offset);
            }
            FS.munmap(stream2);
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
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            FS.close(stream2);
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
              var stream2 = SYSCALLS.getStreamFromFD(fd);
              var type = stream2.tty ? 2 : FS.isDir(stream2.mode) ? 3 : FS.isLink(stream2.mode) ? 7 : 4;
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
        var doReadv = (stream2, iov, iovcnt, offset) => {
          var ret = 0;
          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAPU32[iov >> 2];
            var len = HEAPU32[iov + 4 >> 2];
            iov += 8;
            var curr = FS.read(stream2, HEAP8, ptr, len, offset);
            if (curr < 0) return -1;
            ret += curr;
            if (curr < len) break;
          }
          return ret;
        };
        function _fd_read(fd, iov, iovcnt, pnum) {
          try {
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            var num = doReadv(stream2, iov, iovcnt);
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
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            FS.llseek(stream2, offset, whence);
            tempI64 = [stream2.position >>> 0, (tempDouble = stream2.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
            if (stream2.getdents && offset === 0 && whence === 0) stream2.getdents = null;
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        function _fd_sync(fd) {
          try {
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            if (stream2.stream_ops && stream2.stream_ops.fsync) {
              return stream2.stream_ops.fsync(stream2);
            }
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        var doWritev = (stream2, iov, iovcnt, offset) => {
          var ret = 0;
          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAPU32[iov >> 2];
            var len = HEAPU32[iov + 4 >> 2];
            iov += 8;
            var curr = FS.write(stream2, HEAP8, ptr, len, offset);
            if (curr < 0) return -1;
            ret += curr;
          }
          return ret;
        };
        function _fd_write(fd, iov, iovcnt, pnum) {
          try {
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            var num = doWritev(stream2, iov, iovcnt);
            HEAPU32[pnum >> 2] = num;
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        var adapters_support = function() {
          const handleAsync = typeof Asyncify === "object" ? Asyncify.handleAsync.bind(Asyncify) : null;
          Module22["handleAsync"] = handleAsync;
          const targets = /* @__PURE__ */ new Map();
          Module22["setCallback"] = (key, target) => targets.set(key, target);
          Module22["getCallback"] = (key) => targets.get(key);
          Module22["deleteCallback"] = (key) => targets.delete(key);
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
            if (Module22["onExit"]) Module22["onExit"](code);
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
          var func = Module22["_" + ident];
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
        Module22["_sqlite3_status64"] = (a0, a1, a2, a3) => (Module22["_sqlite3_status64"] = wasmExports["la"])(a0, a1, a2, a3);
        Module22["_sqlite3_status"] = (a0, a1, a2, a3) => (Module22["_sqlite3_status"] = wasmExports["ma"])(a0, a1, a2, a3);
        Module22["_sqlite3_db_status"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_db_status"] = wasmExports["na"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_msize"] = (a0) => (Module22["_sqlite3_msize"] = wasmExports["oa"])(a0);
        Module22["_sqlite3_vfs_find"] = (a0) => (Module22["_sqlite3_vfs_find"] = wasmExports["pa"])(a0);
        Module22["_sqlite3_vfs_register"] = (a0, a1) => (Module22["_sqlite3_vfs_register"] = wasmExports["qa"])(a0, a1);
        Module22["_sqlite3_vfs_unregister"] = (a0) => (Module22["_sqlite3_vfs_unregister"] = wasmExports["ra"])(a0);
        Module22["_sqlite3_release_memory"] = (a0) => (Module22["_sqlite3_release_memory"] = wasmExports["sa"])(a0);
        Module22["_sqlite3_soft_heap_limit64"] = (a0, a1) => (Module22["_sqlite3_soft_heap_limit64"] = wasmExports["ta"])(a0, a1);
        Module22["_sqlite3_memory_used"] = () => (Module22["_sqlite3_memory_used"] = wasmExports["ua"])();
        Module22["_sqlite3_hard_heap_limit64"] = (a0, a1) => (Module22["_sqlite3_hard_heap_limit64"] = wasmExports["va"])(a0, a1);
        Module22["_sqlite3_memory_highwater"] = (a0) => (Module22["_sqlite3_memory_highwater"] = wasmExports["wa"])(a0);
        Module22["_sqlite3_malloc"] = (a0) => (Module22["_sqlite3_malloc"] = wasmExports["xa"])(a0);
        Module22["_sqlite3_malloc64"] = (a0, a1) => (Module22["_sqlite3_malloc64"] = wasmExports["ya"])(a0, a1);
        Module22["_sqlite3_free"] = (a0) => (Module22["_sqlite3_free"] = wasmExports["za"])(a0);
        Module22["_sqlite3_realloc"] = (a0, a1) => (Module22["_sqlite3_realloc"] = wasmExports["Aa"])(a0, a1);
        Module22["_sqlite3_realloc64"] = (a0, a1, a2) => (Module22["_sqlite3_realloc64"] = wasmExports["Ba"])(a0, a1, a2);
        Module22["_sqlite3_str_vappendf"] = (a0, a1, a2) => (Module22["_sqlite3_str_vappendf"] = wasmExports["Ca"])(a0, a1, a2);
        Module22["_sqlite3_str_append"] = (a0, a1, a2) => (Module22["_sqlite3_str_append"] = wasmExports["Da"])(a0, a1, a2);
        Module22["_sqlite3_str_appendchar"] = (a0, a1, a2) => (Module22["_sqlite3_str_appendchar"] = wasmExports["Ea"])(a0, a1, a2);
        Module22["_sqlite3_str_appendall"] = (a0, a1) => (Module22["_sqlite3_str_appendall"] = wasmExports["Fa"])(a0, a1);
        Module22["_sqlite3_str_appendf"] = (a0, a1, a2) => (Module22["_sqlite3_str_appendf"] = wasmExports["Ga"])(a0, a1, a2);
        Module22["_sqlite3_str_finish"] = (a0) => (Module22["_sqlite3_str_finish"] = wasmExports["Ha"])(a0);
        Module22["_sqlite3_str_errcode"] = (a0) => (Module22["_sqlite3_str_errcode"] = wasmExports["Ia"])(a0);
        Module22["_sqlite3_str_length"] = (a0) => (Module22["_sqlite3_str_length"] = wasmExports["Ja"])(a0);
        Module22["_sqlite3_str_value"] = (a0) => (Module22["_sqlite3_str_value"] = wasmExports["Ka"])(a0);
        Module22["_sqlite3_str_reset"] = (a0) => (Module22["_sqlite3_str_reset"] = wasmExports["La"])(a0);
        Module22["_sqlite3_str_new"] = (a0) => (Module22["_sqlite3_str_new"] = wasmExports["Ma"])(a0);
        Module22["_sqlite3_vmprintf"] = (a0, a1) => (Module22["_sqlite3_vmprintf"] = wasmExports["Na"])(a0, a1);
        Module22["_sqlite3_mprintf"] = (a0, a1) => (Module22["_sqlite3_mprintf"] = wasmExports["Oa"])(a0, a1);
        Module22["_sqlite3_vsnprintf"] = (a0, a1, a2, a3) => (Module22["_sqlite3_vsnprintf"] = wasmExports["Pa"])(a0, a1, a2, a3);
        Module22["_sqlite3_snprintf"] = (a0, a1, a2, a3) => (Module22["_sqlite3_snprintf"] = wasmExports["Qa"])(a0, a1, a2, a3);
        Module22["_sqlite3_log"] = (a0, a1, a2) => (Module22["_sqlite3_log"] = wasmExports["Ra"])(a0, a1, a2);
        Module22["_sqlite3_randomness"] = (a0, a1) => (Module22["_sqlite3_randomness"] = wasmExports["Sa"])(a0, a1);
        Module22["_sqlite3_stricmp"] = (a0, a1) => (Module22["_sqlite3_stricmp"] = wasmExports["Ta"])(a0, a1);
        Module22["_sqlite3_strnicmp"] = (a0, a1, a2) => (Module22["_sqlite3_strnicmp"] = wasmExports["Ua"])(a0, a1, a2);
        Module22["_sqlite3_os_init"] = () => (Module22["_sqlite3_os_init"] = wasmExports["Va"])();
        Module22["_sqlite3_os_end"] = () => (Module22["_sqlite3_os_end"] = wasmExports["Wa"])();
        Module22["_sqlite3_serialize"] = (a0, a1, a2, a3) => (Module22["_sqlite3_serialize"] = wasmExports["Xa"])(a0, a1, a2, a3);
        Module22["_sqlite3_prepare_v2"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_prepare_v2"] = wasmExports["Ya"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_step"] = (a0) => (Module22["_sqlite3_step"] = wasmExports["Za"])(a0);
        Module22["_sqlite3_column_int64"] = (a0, a1) => (Module22["_sqlite3_column_int64"] = wasmExports["_a"])(a0, a1);
        Module22["_sqlite3_reset"] = (a0) => (Module22["_sqlite3_reset"] = wasmExports["$a"])(a0);
        Module22["_sqlite3_exec"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_exec"] = wasmExports["ab"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_column_int"] = (a0, a1) => (Module22["_sqlite3_column_int"] = wasmExports["bb"])(a0, a1);
        Module22["_sqlite3_finalize"] = (a0) => (Module22["_sqlite3_finalize"] = wasmExports["cb"])(a0);
        Module22["_sqlite3_deserialize"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module22["_sqlite3_deserialize"] = wasmExports["db"])(a0, a1, a2, a3, a4, a5, a6, a7);
        Module22["_sqlite3_database_file_object"] = (a0) => (Module22["_sqlite3_database_file_object"] = wasmExports["eb"])(a0);
        Module22["_sqlite3_backup_init"] = (a0, a1, a2, a3) => (Module22["_sqlite3_backup_init"] = wasmExports["fb"])(a0, a1, a2, a3);
        Module22["_sqlite3_backup_step"] = (a0, a1) => (Module22["_sqlite3_backup_step"] = wasmExports["gb"])(a0, a1);
        Module22["_sqlite3_backup_finish"] = (a0) => (Module22["_sqlite3_backup_finish"] = wasmExports["hb"])(a0);
        Module22["_sqlite3_backup_remaining"] = (a0) => (Module22["_sqlite3_backup_remaining"] = wasmExports["ib"])(a0);
        Module22["_sqlite3_backup_pagecount"] = (a0) => (Module22["_sqlite3_backup_pagecount"] = wasmExports["jb"])(a0);
        Module22["_sqlite3_clear_bindings"] = (a0) => (Module22["_sqlite3_clear_bindings"] = wasmExports["kb"])(a0);
        Module22["_sqlite3_value_blob"] = (a0) => (Module22["_sqlite3_value_blob"] = wasmExports["lb"])(a0);
        Module22["_sqlite3_value_text"] = (a0) => (Module22["_sqlite3_value_text"] = wasmExports["mb"])(a0);
        Module22["_sqlite3_value_bytes"] = (a0) => (Module22["_sqlite3_value_bytes"] = wasmExports["nb"])(a0);
        Module22["_sqlite3_value_bytes16"] = (a0) => (Module22["_sqlite3_value_bytes16"] = wasmExports["ob"])(a0);
        Module22["_sqlite3_value_double"] = (a0) => (Module22["_sqlite3_value_double"] = wasmExports["pb"])(a0);
        Module22["_sqlite3_value_int"] = (a0) => (Module22["_sqlite3_value_int"] = wasmExports["qb"])(a0);
        Module22["_sqlite3_value_int64"] = (a0) => (Module22["_sqlite3_value_int64"] = wasmExports["rb"])(a0);
        Module22["_sqlite3_value_subtype"] = (a0) => (Module22["_sqlite3_value_subtype"] = wasmExports["sb"])(a0);
        Module22["_sqlite3_value_pointer"] = (a0, a1) => (Module22["_sqlite3_value_pointer"] = wasmExports["tb"])(a0, a1);
        Module22["_sqlite3_value_text16"] = (a0) => (Module22["_sqlite3_value_text16"] = wasmExports["ub"])(a0);
        Module22["_sqlite3_value_text16be"] = (a0) => (Module22["_sqlite3_value_text16be"] = wasmExports["vb"])(a0);
        Module22["_sqlite3_value_text16le"] = (a0) => (Module22["_sqlite3_value_text16le"] = wasmExports["wb"])(a0);
        Module22["_sqlite3_value_type"] = (a0) => (Module22["_sqlite3_value_type"] = wasmExports["xb"])(a0);
        Module22["_sqlite3_value_encoding"] = (a0) => (Module22["_sqlite3_value_encoding"] = wasmExports["yb"])(a0);
        Module22["_sqlite3_value_nochange"] = (a0) => (Module22["_sqlite3_value_nochange"] = wasmExports["zb"])(a0);
        Module22["_sqlite3_value_frombind"] = (a0) => (Module22["_sqlite3_value_frombind"] = wasmExports["Ab"])(a0);
        Module22["_sqlite3_value_dup"] = (a0) => (Module22["_sqlite3_value_dup"] = wasmExports["Bb"])(a0);
        Module22["_sqlite3_value_free"] = (a0) => (Module22["_sqlite3_value_free"] = wasmExports["Cb"])(a0);
        Module22["_sqlite3_result_blob"] = (a0, a1, a2, a3) => (Module22["_sqlite3_result_blob"] = wasmExports["Db"])(a0, a1, a2, a3);
        Module22["_sqlite3_result_blob64"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_result_blob64"] = wasmExports["Eb"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_result_double"] = (a0, a1) => (Module22["_sqlite3_result_double"] = wasmExports["Fb"])(a0, a1);
        Module22["_sqlite3_result_error"] = (a0, a1, a2) => (Module22["_sqlite3_result_error"] = wasmExports["Gb"])(a0, a1, a2);
        Module22["_sqlite3_result_error16"] = (a0, a1, a2) => (Module22["_sqlite3_result_error16"] = wasmExports["Hb"])(a0, a1, a2);
        Module22["_sqlite3_result_int"] = (a0, a1) => (Module22["_sqlite3_result_int"] = wasmExports["Ib"])(a0, a1);
        Module22["_sqlite3_result_int64"] = (a0, a1, a2) => (Module22["_sqlite3_result_int64"] = wasmExports["Jb"])(a0, a1, a2);
        Module22["_sqlite3_result_null"] = (a0) => (Module22["_sqlite3_result_null"] = wasmExports["Kb"])(a0);
        Module22["_sqlite3_result_pointer"] = (a0, a1, a2, a3) => (Module22["_sqlite3_result_pointer"] = wasmExports["Lb"])(a0, a1, a2, a3);
        Module22["_sqlite3_result_subtype"] = (a0, a1) => (Module22["_sqlite3_result_subtype"] = wasmExports["Mb"])(a0, a1);
        Module22["_sqlite3_result_text"] = (a0, a1, a2, a3) => (Module22["_sqlite3_result_text"] = wasmExports["Nb"])(a0, a1, a2, a3);
        Module22["_sqlite3_result_text64"] = (a0, a1, a2, a3, a4, a5) => (Module22["_sqlite3_result_text64"] = wasmExports["Ob"])(a0, a1, a2, a3, a4, a5);
        Module22["_sqlite3_result_text16"] = (a0, a1, a2, a3) => (Module22["_sqlite3_result_text16"] = wasmExports["Pb"])(a0, a1, a2, a3);
        Module22["_sqlite3_result_text16be"] = (a0, a1, a2, a3) => (Module22["_sqlite3_result_text16be"] = wasmExports["Qb"])(a0, a1, a2, a3);
        Module22["_sqlite3_result_text16le"] = (a0, a1, a2, a3) => (Module22["_sqlite3_result_text16le"] = wasmExports["Rb"])(a0, a1, a2, a3);
        Module22["_sqlite3_result_value"] = (a0, a1) => (Module22["_sqlite3_result_value"] = wasmExports["Sb"])(a0, a1);
        Module22["_sqlite3_result_error_toobig"] = (a0) => (Module22["_sqlite3_result_error_toobig"] = wasmExports["Tb"])(a0);
        Module22["_sqlite3_result_zeroblob"] = (a0, a1) => (Module22["_sqlite3_result_zeroblob"] = wasmExports["Ub"])(a0, a1);
        Module22["_sqlite3_result_zeroblob64"] = (a0, a1, a2) => (Module22["_sqlite3_result_zeroblob64"] = wasmExports["Vb"])(a0, a1, a2);
        Module22["_sqlite3_result_error_code"] = (a0, a1) => (Module22["_sqlite3_result_error_code"] = wasmExports["Wb"])(a0, a1);
        Module22["_sqlite3_result_error_nomem"] = (a0) => (Module22["_sqlite3_result_error_nomem"] = wasmExports["Xb"])(a0);
        Module22["_sqlite3_user_data"] = (a0) => (Module22["_sqlite3_user_data"] = wasmExports["Yb"])(a0);
        Module22["_sqlite3_context_db_handle"] = (a0) => (Module22["_sqlite3_context_db_handle"] = wasmExports["Zb"])(a0);
        Module22["_sqlite3_vtab_nochange"] = (a0) => (Module22["_sqlite3_vtab_nochange"] = wasmExports["_b"])(a0);
        Module22["_sqlite3_vtab_in_first"] = (a0, a1) => (Module22["_sqlite3_vtab_in_first"] = wasmExports["$b"])(a0, a1);
        Module22["_sqlite3_vtab_in_next"] = (a0, a1) => (Module22["_sqlite3_vtab_in_next"] = wasmExports["ac"])(a0, a1);
        Module22["_sqlite3_aggregate_context"] = (a0, a1) => (Module22["_sqlite3_aggregate_context"] = wasmExports["bc"])(a0, a1);
        Module22["_sqlite3_get_auxdata"] = (a0, a1) => (Module22["_sqlite3_get_auxdata"] = wasmExports["cc"])(a0, a1);
        Module22["_sqlite3_set_auxdata"] = (a0, a1, a2, a3) => (Module22["_sqlite3_set_auxdata"] = wasmExports["dc"])(a0, a1, a2, a3);
        Module22["_sqlite3_column_count"] = (a0) => (Module22["_sqlite3_column_count"] = wasmExports["ec"])(a0);
        Module22["_sqlite3_data_count"] = (a0) => (Module22["_sqlite3_data_count"] = wasmExports["fc"])(a0);
        Module22["_sqlite3_column_blob"] = (a0, a1) => (Module22["_sqlite3_column_blob"] = wasmExports["gc"])(a0, a1);
        Module22["_sqlite3_column_bytes"] = (a0, a1) => (Module22["_sqlite3_column_bytes"] = wasmExports["hc"])(a0, a1);
        Module22["_sqlite3_column_bytes16"] = (a0, a1) => (Module22["_sqlite3_column_bytes16"] = wasmExports["ic"])(a0, a1);
        Module22["_sqlite3_column_double"] = (a0, a1) => (Module22["_sqlite3_column_double"] = wasmExports["jc"])(a0, a1);
        Module22["_sqlite3_column_text"] = (a0, a1) => (Module22["_sqlite3_column_text"] = wasmExports["kc"])(a0, a1);
        Module22["_sqlite3_column_value"] = (a0, a1) => (Module22["_sqlite3_column_value"] = wasmExports["lc"])(a0, a1);
        Module22["_sqlite3_column_text16"] = (a0, a1) => (Module22["_sqlite3_column_text16"] = wasmExports["mc"])(a0, a1);
        Module22["_sqlite3_column_type"] = (a0, a1) => (Module22["_sqlite3_column_type"] = wasmExports["nc"])(a0, a1);
        Module22["_sqlite3_column_name"] = (a0, a1) => (Module22["_sqlite3_column_name"] = wasmExports["oc"])(a0, a1);
        Module22["_sqlite3_column_name16"] = (a0, a1) => (Module22["_sqlite3_column_name16"] = wasmExports["pc"])(a0, a1);
        Module22["_sqlite3_bind_blob"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_bind_blob"] = wasmExports["qc"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_bind_blob64"] = (a0, a1, a2, a3, a4, a5) => (Module22["_sqlite3_bind_blob64"] = wasmExports["rc"])(a0, a1, a2, a3, a4, a5);
        Module22["_sqlite3_bind_double"] = (a0, a1, a2) => (Module22["_sqlite3_bind_double"] = wasmExports["sc"])(a0, a1, a2);
        Module22["_sqlite3_bind_int"] = (a0, a1, a2) => (Module22["_sqlite3_bind_int"] = wasmExports["tc"])(a0, a1, a2);
        Module22["_sqlite3_bind_int64"] = (a0, a1, a2, a3) => (Module22["_sqlite3_bind_int64"] = wasmExports["uc"])(a0, a1, a2, a3);
        Module22["_sqlite3_bind_null"] = (a0, a1) => (Module22["_sqlite3_bind_null"] = wasmExports["vc"])(a0, a1);
        Module22["_sqlite3_bind_pointer"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_bind_pointer"] = wasmExports["wc"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_bind_text"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_bind_text"] = wasmExports["xc"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_bind_text64"] = (a0, a1, a2, a3, a4, a5, a6) => (Module22["_sqlite3_bind_text64"] = wasmExports["yc"])(a0, a1, a2, a3, a4, a5, a6);
        Module22["_sqlite3_bind_text16"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_bind_text16"] = wasmExports["zc"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_bind_value"] = (a0, a1, a2) => (Module22["_sqlite3_bind_value"] = wasmExports["Ac"])(a0, a1, a2);
        Module22["_sqlite3_bind_zeroblob"] = (a0, a1, a2) => (Module22["_sqlite3_bind_zeroblob"] = wasmExports["Bc"])(a0, a1, a2);
        Module22["_sqlite3_bind_zeroblob64"] = (a0, a1, a2, a3) => (Module22["_sqlite3_bind_zeroblob64"] = wasmExports["Cc"])(a0, a1, a2, a3);
        Module22["_sqlite3_bind_parameter_count"] = (a0) => (Module22["_sqlite3_bind_parameter_count"] = wasmExports["Dc"])(a0);
        Module22["_sqlite3_bind_parameter_name"] = (a0, a1) => (Module22["_sqlite3_bind_parameter_name"] = wasmExports["Ec"])(a0, a1);
        Module22["_sqlite3_bind_parameter_index"] = (a0, a1) => (Module22["_sqlite3_bind_parameter_index"] = wasmExports["Fc"])(a0, a1);
        Module22["_sqlite3_db_handle"] = (a0) => (Module22["_sqlite3_db_handle"] = wasmExports["Gc"])(a0);
        Module22["_sqlite3_stmt_readonly"] = (a0) => (Module22["_sqlite3_stmt_readonly"] = wasmExports["Hc"])(a0);
        Module22["_sqlite3_stmt_isexplain"] = (a0) => (Module22["_sqlite3_stmt_isexplain"] = wasmExports["Ic"])(a0);
        Module22["_sqlite3_stmt_explain"] = (a0, a1) => (Module22["_sqlite3_stmt_explain"] = wasmExports["Jc"])(a0, a1);
        Module22["_sqlite3_stmt_busy"] = (a0) => (Module22["_sqlite3_stmt_busy"] = wasmExports["Kc"])(a0);
        Module22["_sqlite3_next_stmt"] = (a0, a1) => (Module22["_sqlite3_next_stmt"] = wasmExports["Lc"])(a0, a1);
        Module22["_sqlite3_stmt_status"] = (a0, a1, a2) => (Module22["_sqlite3_stmt_status"] = wasmExports["Mc"])(a0, a1, a2);
        Module22["_sqlite3_sql"] = (a0) => (Module22["_sqlite3_sql"] = wasmExports["Nc"])(a0);
        Module22["_sqlite3_expanded_sql"] = (a0) => (Module22["_sqlite3_expanded_sql"] = wasmExports["Oc"])(a0);
        Module22["_sqlite3_value_numeric_type"] = (a0) => (Module22["_sqlite3_value_numeric_type"] = wasmExports["Pc"])(a0);
        Module22["_sqlite3_blob_open"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module22["_sqlite3_blob_open"] = wasmExports["Qc"])(a0, a1, a2, a3, a4, a5, a6, a7);
        Module22["_sqlite3_blob_close"] = (a0) => (Module22["_sqlite3_blob_close"] = wasmExports["Rc"])(a0);
        Module22["_sqlite3_blob_read"] = (a0, a1, a2, a3) => (Module22["_sqlite3_blob_read"] = wasmExports["Sc"])(a0, a1, a2, a3);
        Module22["_sqlite3_blob_write"] = (a0, a1, a2, a3) => (Module22["_sqlite3_blob_write"] = wasmExports["Tc"])(a0, a1, a2, a3);
        Module22["_sqlite3_blob_bytes"] = (a0) => (Module22["_sqlite3_blob_bytes"] = wasmExports["Uc"])(a0);
        Module22["_sqlite3_blob_reopen"] = (a0, a1, a2) => (Module22["_sqlite3_blob_reopen"] = wasmExports["Vc"])(a0, a1, a2);
        Module22["_sqlite3_set_authorizer"] = (a0, a1, a2) => (Module22["_sqlite3_set_authorizer"] = wasmExports["Wc"])(a0, a1, a2);
        Module22["_sqlite3_strglob"] = (a0, a1) => (Module22["_sqlite3_strglob"] = wasmExports["Xc"])(a0, a1);
        Module22["_sqlite3_strlike"] = (a0, a1, a2) => (Module22["_sqlite3_strlike"] = wasmExports["Yc"])(a0, a1, a2);
        Module22["_sqlite3_errmsg"] = (a0) => (Module22["_sqlite3_errmsg"] = wasmExports["Zc"])(a0);
        Module22["_sqlite3_auto_extension"] = (a0) => (Module22["_sqlite3_auto_extension"] = wasmExports["_c"])(a0);
        Module22["_sqlite3_cancel_auto_extension"] = (a0) => (Module22["_sqlite3_cancel_auto_extension"] = wasmExports["$c"])(a0);
        Module22["_sqlite3_reset_auto_extension"] = () => (Module22["_sqlite3_reset_auto_extension"] = wasmExports["ad"])();
        Module22["_sqlite3_prepare"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_prepare"] = wasmExports["bd"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_prepare_v3"] = (a0, a1, a2, a3, a4, a5) => (Module22["_sqlite3_prepare_v3"] = wasmExports["cd"])(a0, a1, a2, a3, a4, a5);
        Module22["_sqlite3_prepare16"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_prepare16"] = wasmExports["dd"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_prepare16_v2"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_prepare16_v2"] = wasmExports["ed"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_prepare16_v3"] = (a0, a1, a2, a3, a4, a5) => (Module22["_sqlite3_prepare16_v3"] = wasmExports["fd"])(a0, a1, a2, a3, a4, a5);
        Module22["_sqlite3_get_table"] = (a0, a1, a2, a3, a4, a5) => (Module22["_sqlite3_get_table"] = wasmExports["gd"])(a0, a1, a2, a3, a4, a5);
        Module22["_sqlite3_free_table"] = (a0) => (Module22["_sqlite3_free_table"] = wasmExports["hd"])(a0);
        Module22["_sqlite3_create_module"] = (a0, a1, a2, a3) => (Module22["_sqlite3_create_module"] = wasmExports["id"])(a0, a1, a2, a3);
        Module22["_sqlite3_create_module_v2"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_create_module_v2"] = wasmExports["jd"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_drop_modules"] = (a0, a1) => (Module22["_sqlite3_drop_modules"] = wasmExports["kd"])(a0, a1);
        Module22["_sqlite3_declare_vtab"] = (a0, a1) => (Module22["_sqlite3_declare_vtab"] = wasmExports["ld"])(a0, a1);
        Module22["_sqlite3_vtab_on_conflict"] = (a0) => (Module22["_sqlite3_vtab_on_conflict"] = wasmExports["md"])(a0);
        Module22["_sqlite3_vtab_config"] = (a0, a1, a2) => (Module22["_sqlite3_vtab_config"] = wasmExports["nd"])(a0, a1, a2);
        Module22["_sqlite3_vtab_collation"] = (a0, a1) => (Module22["_sqlite3_vtab_collation"] = wasmExports["od"])(a0, a1);
        Module22["_sqlite3_vtab_in"] = (a0, a1, a2) => (Module22["_sqlite3_vtab_in"] = wasmExports["pd"])(a0, a1, a2);
        Module22["_sqlite3_vtab_rhs_value"] = (a0, a1, a2) => (Module22["_sqlite3_vtab_rhs_value"] = wasmExports["qd"])(a0, a1, a2);
        Module22["_sqlite3_vtab_distinct"] = (a0) => (Module22["_sqlite3_vtab_distinct"] = wasmExports["rd"])(a0);
        Module22["_sqlite3_keyword_name"] = (a0, a1, a2) => (Module22["_sqlite3_keyword_name"] = wasmExports["sd"])(a0, a1, a2);
        Module22["_sqlite3_keyword_count"] = () => (Module22["_sqlite3_keyword_count"] = wasmExports["td"])();
        Module22["_sqlite3_keyword_check"] = (a0, a1) => (Module22["_sqlite3_keyword_check"] = wasmExports["ud"])(a0, a1);
        Module22["_sqlite3_complete"] = (a0) => (Module22["_sqlite3_complete"] = wasmExports["vd"])(a0);
        Module22["_sqlite3_complete16"] = (a0) => (Module22["_sqlite3_complete16"] = wasmExports["wd"])(a0);
        Module22["_sqlite3_libversion"] = () => (Module22["_sqlite3_libversion"] = wasmExports["xd"])();
        Module22["_sqlite3_libversion_number"] = () => (Module22["_sqlite3_libversion_number"] = wasmExports["yd"])();
        Module22["_sqlite3_threadsafe"] = () => (Module22["_sqlite3_threadsafe"] = wasmExports["zd"])();
        Module22["_sqlite3_initialize"] = () => (Module22["_sqlite3_initialize"] = wasmExports["Ad"])();
        Module22["_sqlite3_shutdown"] = () => (Module22["_sqlite3_shutdown"] = wasmExports["Bd"])();
        Module22["_sqlite3_config"] = (a0, a1) => (Module22["_sqlite3_config"] = wasmExports["Cd"])(a0, a1);
        Module22["_sqlite3_db_mutex"] = (a0) => (Module22["_sqlite3_db_mutex"] = wasmExports["Dd"])(a0);
        Module22["_sqlite3_db_release_memory"] = (a0) => (Module22["_sqlite3_db_release_memory"] = wasmExports["Ed"])(a0);
        Module22["_sqlite3_db_cacheflush"] = (a0) => (Module22["_sqlite3_db_cacheflush"] = wasmExports["Fd"])(a0);
        Module22["_sqlite3_db_config"] = (a0, a1, a2) => (Module22["_sqlite3_db_config"] = wasmExports["Gd"])(a0, a1, a2);
        Module22["_sqlite3_last_insert_rowid"] = (a0) => (Module22["_sqlite3_last_insert_rowid"] = wasmExports["Hd"])(a0);
        Module22["_sqlite3_set_last_insert_rowid"] = (a0, a1, a2) => (Module22["_sqlite3_set_last_insert_rowid"] = wasmExports["Id"])(a0, a1, a2);
        Module22["_sqlite3_changes64"] = (a0) => (Module22["_sqlite3_changes64"] = wasmExports["Jd"])(a0);
        Module22["_sqlite3_changes"] = (a0) => (Module22["_sqlite3_changes"] = wasmExports["Kd"])(a0);
        Module22["_sqlite3_total_changes64"] = (a0) => (Module22["_sqlite3_total_changes64"] = wasmExports["Ld"])(a0);
        Module22["_sqlite3_total_changes"] = (a0) => (Module22["_sqlite3_total_changes"] = wasmExports["Md"])(a0);
        Module22["_sqlite3_txn_state"] = (a0, a1) => (Module22["_sqlite3_txn_state"] = wasmExports["Nd"])(a0, a1);
        Module22["_sqlite3_close"] = (a0) => (Module22["_sqlite3_close"] = wasmExports["Od"])(a0);
        Module22["_sqlite3_close_v2"] = (a0) => (Module22["_sqlite3_close_v2"] = wasmExports["Pd"])(a0);
        Module22["_sqlite3_busy_handler"] = (a0, a1, a2) => (Module22["_sqlite3_busy_handler"] = wasmExports["Qd"])(a0, a1, a2);
        Module22["_sqlite3_progress_handler"] = (a0, a1, a2, a3) => (Module22["_sqlite3_progress_handler"] = wasmExports["Rd"])(a0, a1, a2, a3);
        Module22["_sqlite3_busy_timeout"] = (a0, a1) => (Module22["_sqlite3_busy_timeout"] = wasmExports["Sd"])(a0, a1);
        Module22["_sqlite3_interrupt"] = (a0) => (Module22["_sqlite3_interrupt"] = wasmExports["Td"])(a0);
        Module22["_sqlite3_is_interrupted"] = (a0) => (Module22["_sqlite3_is_interrupted"] = wasmExports["Ud"])(a0);
        Module22["_sqlite3_create_function"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module22["_sqlite3_create_function"] = wasmExports["Vd"])(a0, a1, a2, a3, a4, a5, a6, a7);
        Module22["_sqlite3_create_function_v2"] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (Module22["_sqlite3_create_function_v2"] = wasmExports["Wd"])(a0, a1, a2, a3, a4, a5, a6, a7, a8);
        Module22["_sqlite3_create_window_function"] = (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) => (Module22["_sqlite3_create_window_function"] = wasmExports["Xd"])(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
        Module22["_sqlite3_create_function16"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module22["_sqlite3_create_function16"] = wasmExports["Yd"])(a0, a1, a2, a3, a4, a5, a6, a7);
        Module22["_sqlite3_overload_function"] = (a0, a1, a2) => (Module22["_sqlite3_overload_function"] = wasmExports["Zd"])(a0, a1, a2);
        Module22["_sqlite3_trace_v2"] = (a0, a1, a2, a3) => (Module22["_sqlite3_trace_v2"] = wasmExports["_d"])(a0, a1, a2, a3);
        Module22["_sqlite3_commit_hook"] = (a0, a1, a2) => (Module22["_sqlite3_commit_hook"] = wasmExports["$d"])(a0, a1, a2);
        Module22["_sqlite3_update_hook"] = (a0, a1, a2) => (Module22["_sqlite3_update_hook"] = wasmExports["ae"])(a0, a1, a2);
        Module22["_sqlite3_rollback_hook"] = (a0, a1, a2) => (Module22["_sqlite3_rollback_hook"] = wasmExports["be"])(a0, a1, a2);
        Module22["_sqlite3_autovacuum_pages"] = (a0, a1, a2, a3) => (Module22["_sqlite3_autovacuum_pages"] = wasmExports["ce"])(a0, a1, a2, a3);
        Module22["_sqlite3_wal_autocheckpoint"] = (a0, a1) => (Module22["_sqlite3_wal_autocheckpoint"] = wasmExports["de"])(a0, a1);
        Module22["_sqlite3_wal_hook"] = (a0, a1, a2) => (Module22["_sqlite3_wal_hook"] = wasmExports["ee"])(a0, a1, a2);
        Module22["_sqlite3_wal_checkpoint_v2"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_wal_checkpoint_v2"] = wasmExports["fe"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_wal_checkpoint"] = (a0, a1) => (Module22["_sqlite3_wal_checkpoint"] = wasmExports["ge"])(a0, a1);
        Module22["_sqlite3_error_offset"] = (a0) => (Module22["_sqlite3_error_offset"] = wasmExports["he"])(a0);
        Module22["_sqlite3_errmsg16"] = (a0) => (Module22["_sqlite3_errmsg16"] = wasmExports["ie"])(a0);
        Module22["_sqlite3_errcode"] = (a0) => (Module22["_sqlite3_errcode"] = wasmExports["je"])(a0);
        Module22["_sqlite3_extended_errcode"] = (a0) => (Module22["_sqlite3_extended_errcode"] = wasmExports["ke"])(a0);
        Module22["_sqlite3_system_errno"] = (a0) => (Module22["_sqlite3_system_errno"] = wasmExports["le"])(a0);
        Module22["_sqlite3_errstr"] = (a0) => (Module22["_sqlite3_errstr"] = wasmExports["me"])(a0);
        Module22["_sqlite3_limit"] = (a0, a1, a2) => (Module22["_sqlite3_limit"] = wasmExports["ne"])(a0, a1, a2);
        Module22["_sqlite3_open"] = (a0, a1) => (Module22["_sqlite3_open"] = wasmExports["oe"])(a0, a1);
        Module22["_sqlite3_open_v2"] = (a0, a1, a2, a3) => (Module22["_sqlite3_open_v2"] = wasmExports["pe"])(a0, a1, a2, a3);
        Module22["_sqlite3_open16"] = (a0, a1) => (Module22["_sqlite3_open16"] = wasmExports["qe"])(a0, a1);
        Module22["_sqlite3_create_collation"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_create_collation"] = wasmExports["re"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_create_collation_v2"] = (a0, a1, a2, a3, a4, a5) => (Module22["_sqlite3_create_collation_v2"] = wasmExports["se"])(a0, a1, a2, a3, a4, a5);
        Module22["_sqlite3_create_collation16"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_create_collation16"] = wasmExports["te"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_collation_needed"] = (a0, a1, a2) => (Module22["_sqlite3_collation_needed"] = wasmExports["ue"])(a0, a1, a2);
        Module22["_sqlite3_collation_needed16"] = (a0, a1, a2) => (Module22["_sqlite3_collation_needed16"] = wasmExports["ve"])(a0, a1, a2);
        Module22["_sqlite3_get_clientdata"] = (a0, a1) => (Module22["_sqlite3_get_clientdata"] = wasmExports["we"])(a0, a1);
        Module22["_sqlite3_set_clientdata"] = (a0, a1, a2, a3) => (Module22["_sqlite3_set_clientdata"] = wasmExports["xe"])(a0, a1, a2, a3);
        Module22["_sqlite3_get_autocommit"] = (a0) => (Module22["_sqlite3_get_autocommit"] = wasmExports["ye"])(a0);
        Module22["_sqlite3_table_column_metadata"] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (Module22["_sqlite3_table_column_metadata"] = wasmExports["ze"])(a0, a1, a2, a3, a4, a5, a6, a7, a8);
        Module22["_sqlite3_sleep"] = (a0) => (Module22["_sqlite3_sleep"] = wasmExports["Ae"])(a0);
        Module22["_sqlite3_extended_result_codes"] = (a0, a1) => (Module22["_sqlite3_extended_result_codes"] = wasmExports["Be"])(a0, a1);
        Module22["_sqlite3_file_control"] = (a0, a1, a2, a3) => (Module22["_sqlite3_file_control"] = wasmExports["Ce"])(a0, a1, a2, a3);
        Module22["_sqlite3_test_control"] = (a0, a1) => (Module22["_sqlite3_test_control"] = wasmExports["De"])(a0, a1);
        Module22["_sqlite3_create_filename"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_create_filename"] = wasmExports["Ee"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_free_filename"] = (a0) => (Module22["_sqlite3_free_filename"] = wasmExports["Fe"])(a0);
        Module22["_sqlite3_uri_parameter"] = (a0, a1) => (Module22["_sqlite3_uri_parameter"] = wasmExports["Ge"])(a0, a1);
        Module22["_sqlite3_uri_key"] = (a0, a1) => (Module22["_sqlite3_uri_key"] = wasmExports["He"])(a0, a1);
        Module22["_sqlite3_uri_boolean"] = (a0, a1, a2) => (Module22["_sqlite3_uri_boolean"] = wasmExports["Ie"])(a0, a1, a2);
        Module22["_sqlite3_uri_int64"] = (a0, a1, a2, a3) => (Module22["_sqlite3_uri_int64"] = wasmExports["Je"])(a0, a1, a2, a3);
        Module22["_sqlite3_filename_database"] = (a0) => (Module22["_sqlite3_filename_database"] = wasmExports["Ke"])(a0);
        Module22["_sqlite3_filename_journal"] = (a0) => (Module22["_sqlite3_filename_journal"] = wasmExports["Le"])(a0);
        Module22["_sqlite3_filename_wal"] = (a0) => (Module22["_sqlite3_filename_wal"] = wasmExports["Me"])(a0);
        Module22["_sqlite3_db_name"] = (a0, a1) => (Module22["_sqlite3_db_name"] = wasmExports["Ne"])(a0, a1);
        Module22["_sqlite3_db_filename"] = (a0, a1) => (Module22["_sqlite3_db_filename"] = wasmExports["Oe"])(a0, a1);
        Module22["_sqlite3_db_readonly"] = (a0, a1) => (Module22["_sqlite3_db_readonly"] = wasmExports["Pe"])(a0, a1);
        Module22["_sqlite3_compileoption_used"] = (a0) => (Module22["_sqlite3_compileoption_used"] = wasmExports["Qe"])(a0);
        Module22["_sqlite3_compileoption_get"] = (a0) => (Module22["_sqlite3_compileoption_get"] = wasmExports["Re"])(a0);
        Module22["_sqlite3_sourceid"] = () => (Module22["_sqlite3_sourceid"] = wasmExports["Se"])();
        var ___errno_location = () => (___errno_location = wasmExports["Te"])();
        var _malloc = Module22["_malloc"] = (a0) => (_malloc = Module22["_malloc"] = wasmExports["Ue"])(a0);
        Module22["_free"] = (a0) => (Module22["_free"] = wasmExports["Ve"])(a0);
        Module22["_RegisterExtensionFunctions"] = (a0) => (Module22["_RegisterExtensionFunctions"] = wasmExports["We"])(a0);
        Module22["_getSqliteFree"] = () => (Module22["_getSqliteFree"] = wasmExports["Xe"])();
        var _main = Module22["_main"] = (a0, a1) => (_main = Module22["_main"] = wasmExports["Ye"])(a0, a1);
        Module22["_libauthorizer_set_authorizer"] = (a0, a1, a2) => (Module22["_libauthorizer_set_authorizer"] = wasmExports["Ze"])(a0, a1, a2);
        Module22["_libfunction_create_function"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module22["_libfunction_create_function"] = wasmExports["_e"])(a0, a1, a2, a3, a4, a5, a6, a7);
        Module22["_libprogress_progress_handler"] = (a0, a1, a2, a3) => (Module22["_libprogress_progress_handler"] = wasmExports["$e"])(a0, a1, a2, a3);
        Module22["_libvfs_vfs_register"] = (a0, a1, a2, a3, a4, a5) => (Module22["_libvfs_vfs_register"] = wasmExports["af"])(a0, a1, a2, a3, a4, a5);
        var _emscripten_builtin_memalign = (a0, a1) => (_emscripten_builtin_memalign = wasmExports["cf"])(a0, a1);
        var getTempRet0 = () => (getTempRet0 = wasmExports["df"])();
        var stackSave = () => (stackSave = wasmExports["ef"])();
        var stackRestore = (a0) => (stackRestore = wasmExports["ff"])(a0);
        var stackAlloc = (a0) => (stackAlloc = wasmExports["gf"])(a0);
        Module22["_sqlite3_version"] = 3232;
        Module22["getTempRet0"] = getTempRet0;
        Module22["ccall"] = ccall;
        Module22["cwrap"] = cwrap;
        Module22["addFunction"] = addFunction;
        Module22["setValue"] = setValue;
        Module22["getValue"] = getValue;
        Module22["UTF8ToString"] = UTF8ToString;
        Module22["stringToUTF8"] = stringToUTF8;
        Module22["lengthBytesUTF8"] = lengthBytesUTF8;
        Module22["intArrayFromString"] = intArrayFromString;
        Module22["intArrayToString"] = intArrayToString;
        Module22["AsciiToString"] = AsciiToString;
        Module22["UTF16ToString"] = UTF16ToString;
        Module22["stringToUTF16"] = stringToUTF16;
        Module22["UTF32ToString"] = UTF32ToString;
        Module22["stringToUTF32"] = stringToUTF32;
        Module22["writeArrayToMemory"] = writeArrayToMemory;
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
            Module22["calledRun"] = true;
            if (ABORT) return;
            initRuntime();
            preMain();
            readyPromiseResolve(Module22);
            if (Module22["onRuntimeInitialized"]) Module22["onRuntimeInitialized"]();
            if (shouldRunNow) callMain();
            postRun();
          }
          if (Module22["setStatus"]) {
            Module22["setStatus"]("Running...");
            setTimeout(function() {
              setTimeout(function() {
                Module22["setStatus"]("");
              }, 1);
              doRun();
            }, 1);
          } else {
            doRun();
          }
        }
        if (Module22["preInit"]) {
          if (typeof Module22["preInit"] == "function") Module22["preInit"] = [Module22["preInit"]];
          while (Module22["preInit"].length > 0) {
            Module22["preInit"].pop()();
          }
        }
        var shouldRunNow = true;
        if (Module22["noInitialRun"]) shouldRunNow = false;
        run();
        (function() {
          const AsyncFunction3 = Object.getPrototypeOf(async function() {
          }).constructor;
          let pAsyncFlags = 0;
          Module22["set_authorizer"] = function(db2, xAuthorizer, pApp) {
            if (pAsyncFlags) {
              Module22["deleteCallback"](pAsyncFlags);
              Module22["_sqlite3_free"](pAsyncFlags);
              pAsyncFlags = 0;
            }
            pAsyncFlags = Module22["_sqlite3_malloc"](4);
            setValue(pAsyncFlags, xAuthorizer instanceof AsyncFunction3 ? 1 : 0, "i32");
            const result = ccall("libauthorizer_set_authorizer", "number", ["number", "number", "number"], [db2, xAuthorizer ? 1 : 0, pAsyncFlags]);
            if (!result && xAuthorizer) {
              Module22["setCallback"](pAsyncFlags, (_, iAction, p3, p4, p5, p6) => xAuthorizer(pApp, iAction, p3, p4, p5, p6));
            }
            return result;
          };
        })();
        (function() {
          const AsyncFunction3 = Object.getPrototypeOf(async function() {
          }).constructor;
          const FUNC_METHODS = ["xFunc", "xStep", "xFinal"];
          const mapFunctionNameToKey = /* @__PURE__ */ new Map();
          Module22["create_function"] = function(db2, zFunctionName, nArg, eTextRep, pApp, xFunc, xStep, xFinal) {
            const pAsyncFlags = Module22["_sqlite3_malloc"](4);
            const target = { xFunc, xStep, xFinal };
            setValue(pAsyncFlags, FUNC_METHODS.reduce((mask, method, i) => {
              if (target[method] instanceof AsyncFunction3) {
                return mask | 1 << i;
              }
              return mask;
            }, 0), "i32");
            const result = ccall("libfunction_create_function", "number", ["number", "string", "number", "number", "number", "number", "number", "number"], [db2, zFunctionName, nArg, eTextRep, pAsyncFlags, xFunc ? 1 : 0, xStep ? 1 : 0, xFinal ? 1 : 0]);
            if (!result) {
              if (mapFunctionNameToKey.has(zFunctionName)) {
                const oldKey = mapFunctionNameToKey.get(zFunctionName);
                Module22["deleteCallback"](oldKey);
              }
              mapFunctionNameToKey.set(zFunctionName, pAsyncFlags);
              Module22["setCallback"](pAsyncFlags, { xFunc, xStep, xFinal });
            }
            return result;
          };
        })();
        (function() {
          const AsyncFunction3 = Object.getPrototypeOf(async function() {
          }).constructor;
          let pAsyncFlags = 0;
          Module22["progress_handler"] = function(db2, nOps, xProgress, pApp) {
            if (pAsyncFlags) {
              Module22["deleteCallback"](pAsyncFlags);
              Module22["_sqlite3_free"](pAsyncFlags);
              pAsyncFlags = 0;
            }
            pAsyncFlags = Module22["_sqlite3_malloc"](4);
            setValue(pAsyncFlags, xProgress instanceof AsyncFunction3 ? 1 : 0, "i32");
            ccall("libprogress_progress_handler", "number", ["number", "number", "number", "number"], [db2, nOps, xProgress ? 1 : 0, pAsyncFlags]);
            if (xProgress) {
              Module22["setCallback"](pAsyncFlags, (_) => xProgress(pApp));
            }
          };
        })();
        (function() {
          const VFS_METHODS = ["xOpen", "xDelete", "xAccess", "xFullPathname", "xRandomness", "xSleep", "xCurrentTime", "xGetLastError", "xCurrentTimeInt64", "xClose", "xRead", "xWrite", "xTruncate", "xSync", "xFileSize", "xLock", "xUnlock", "xCheckReservedLock", "xFileControl", "xSectorSize", "xDeviceCharacteristics", "xShmMap", "xShmLock", "xShmBarrier", "xShmUnmap"];
          const mapVFSNameToKey = /* @__PURE__ */ new Map();
          Module22["vfs_register"] = function(vfs, makeDefault) {
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
            const vfsReturn = Module22["_sqlite3_malloc"](4);
            try {
              const result = ccall("libvfs_vfs_register", "number", ["string", "number", "number", "number", "number", "number"], [vfs.name, vfs.mxPathname, methodMask, asyncMask, makeDefault ? 1 : 0, vfsReturn]);
              if (!result) {
                if (mapVFSNameToKey.has(vfs.name)) {
                  const oldKey = mapVFSNameToKey.get(vfs.name);
                  Module22["deleteCallback"](oldKey);
                }
                const key = getValue(vfsReturn, "*");
                mapVFSNameToKey.set(vfs.name, key);
                Module22["setCallback"](key, vfs);
              }
              return result;
            } finally {
              Module22["_sqlite3_free"](vfsReturn);
            }
          };
        })();
        return moduleArg.ready;
      };
    })();
    wa_sqlite_default = Module;
  }
});
function delegalize(lo32, hi32) {
  return hi32 * 4294967296 + lo32 + (lo32 < 0 ? 2 ** 32 : 0);
}
var SQLITE_OK, SQLITE_ERROR, SQLITE_BUSY, SQLITE_IOERR, SQLITE_NOTFOUND, SQLITE_CANTOPEN, SQLITE_MISUSE, SQLITE_RANGE, SQLITE_NOTICE, SQLITE_ROW, SQLITE_DONE, SQLITE_IOERR_ACCESS, SQLITE_IOERR_CHECKRESERVEDLOCK, SQLITE_IOERR_CLOSE, SQLITE_IOERR_DELETE, SQLITE_IOERR_FSTAT, SQLITE_IOERR_FSYNC, SQLITE_IOERR_LOCK, SQLITE_IOERR_READ, SQLITE_IOERR_SHORT_READ, SQLITE_IOERR_TRUNCATE, SQLITE_IOERR_UNLOCK, SQLITE_IOERR_WRITE, SQLITE_OPEN_READONLY, SQLITE_OPEN_READWRITE, SQLITE_OPEN_CREATE, SQLITE_OPEN_DELETEONCLOSE, SQLITE_OPEN_URI, SQLITE_OPEN_MAIN_DB, SQLITE_OPEN_TEMP_DB, SQLITE_LOCK_NONE, SQLITE_LOCK_SHARED, SQLITE_LOCK_RESERVED, SQLITE_LOCK_EXCLUSIVE, SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN, SQLITE_IOCAP_BATCH_ATOMIC, SQLITE_FCNTL_PRAGMA, SQLITE_FCNTL_SYNC, SQLITE_FCNTL_BEGIN_ATOMIC_WRITE, SQLITE_FCNTL_COMMIT_ATOMIC_WRITE, SQLITE_FCNTL_ROLLBACK_ATOMIC_WRITE, SQLITE_INTEGER, SQLITE_FLOAT, SQLITE_TEXT, SQLITE_BLOB, SQLITE_NULL, DEFAULT_SECTOR_SIZE, Base, AsyncFunction, FacadeVFS;
var init_chunk_QFCKR22C = __esm({
  "../../node_modules/.pnpm/@subframe7536+sqlite-wasm@0.3.1/node_modules/@subframe7536/sqlite-wasm/dist/chunk-QFCKR22C.mjs"() {
    var _FacadeVFS_instances, makeTypedDataView_fn, makeDataArray_fn, decodeFilename_fn, _a;
    SQLITE_OK = 0;
    SQLITE_ERROR = 1;
    SQLITE_BUSY = 5;
    SQLITE_IOERR = 10;
    SQLITE_NOTFOUND = 12;
    SQLITE_CANTOPEN = 14;
    SQLITE_MISUSE = 21;
    SQLITE_RANGE = 25;
    SQLITE_NOTICE = 27;
    SQLITE_ROW = 100;
    SQLITE_DONE = 101;
    SQLITE_IOERR_ACCESS = 3338;
    SQLITE_IOERR_CHECKRESERVEDLOCK = 3594;
    SQLITE_IOERR_CLOSE = 4106;
    SQLITE_IOERR_DELETE = 2570;
    SQLITE_IOERR_FSTAT = 1802;
    SQLITE_IOERR_FSYNC = 1034;
    SQLITE_IOERR_LOCK = 3850;
    SQLITE_IOERR_READ = 266;
    SQLITE_IOERR_SHORT_READ = 522;
    SQLITE_IOERR_TRUNCATE = 1546;
    SQLITE_IOERR_UNLOCK = 2058;
    SQLITE_IOERR_WRITE = 778;
    SQLITE_OPEN_READONLY = 1;
    SQLITE_OPEN_READWRITE = 2;
    SQLITE_OPEN_CREATE = 4;
    SQLITE_OPEN_DELETEONCLOSE = 8;
    SQLITE_OPEN_URI = 64;
    SQLITE_OPEN_MAIN_DB = 256;
    SQLITE_OPEN_TEMP_DB = 512;
    SQLITE_LOCK_NONE = 0;
    SQLITE_LOCK_SHARED = 1;
    SQLITE_LOCK_RESERVED = 2;
    SQLITE_LOCK_EXCLUSIVE = 4;
    SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN = 2048;
    SQLITE_IOCAP_BATCH_ATOMIC = 16384;
    SQLITE_FCNTL_PRAGMA = 14;
    SQLITE_FCNTL_SYNC = 21;
    SQLITE_FCNTL_BEGIN_ATOMIC_WRITE = 31;
    SQLITE_FCNTL_COMMIT_ATOMIC_WRITE = 32;
    SQLITE_FCNTL_ROLLBACK_ATOMIC_WRITE = 33;
    SQLITE_INTEGER = 1;
    SQLITE_FLOAT = 2;
    SQLITE_TEXT = 3;
    SQLITE_BLOB = 4;
    SQLITE_NULL = 5;
    DEFAULT_SECTOR_SIZE = 512;
    Base = class {
      /**
       * @param {string} name 
       * @param {object} module 
       */
      constructor(name, module) {
        __publicField(this, "name");
        __publicField(this, "mxPathname", 64);
        __publicField(this, "_module");
        this.name = name;
        this._module = module;
      }
      /**
       * @returns {void|Promise<void>} 
       */
      close() {
      }
      /**
       * @returns {boolean|Promise<boolean>}
       */
      isReady() {
        return true;
      }
      /**
       * Overload in subclasses to indicate which methods are asynchronous.
       * @param {string} methodName 
       * @returns {boolean}
       */
      hasAsyncMethod(methodName) {
        return false;
      }
      /**
       * @param {number} pVfs 
       * @param {number} zName 
       * @param {number} pFile 
       * @param {number} flags 
       * @param {number} pOutFlags 
       * @returns {number|Promise<number>}
       */
      xOpen(pVfs, zName, pFile, flags, pOutFlags) {
        return SQLITE_CANTOPEN;
      }
      /**
       * @param {number} pVfs 
       * @param {number} zName 
       * @param {number} syncDir 
       * @returns {number|Promise<number>}
       */
      xDelete(pVfs, zName, syncDir) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pVfs 
       * @param {number} zName 
       * @param {number} flags 
       * @param {number} pResOut 
       * @returns {number|Promise<number>}
       */
      xAccess(pVfs, zName, flags, pResOut) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pVfs 
       * @param {number} zName 
       * @param {number} nOut 
       * @param {number} zOut 
       * @returns {number|Promise<number>}
       */
      xFullPathname(pVfs, zName, nOut, zOut) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pVfs 
       * @param {number} nBuf 
       * @param {number} zBuf 
       * @returns {number|Promise<number>}
       */
      xGetLastError(pVfs, nBuf, zBuf) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @returns {number|Promise<number>}
       */
      xClose(pFile) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @param {number} pData 
       * @param {number} iAmt 
       * @param {number} iOffsetLo 
       * @param {number} iOffsetHi 
       * @returns {number|Promise<number>}
       */
      xRead(pFile, pData, iAmt, iOffsetLo, iOffsetHi) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @param {number} pData 
       * @param {number} iAmt 
       * @param {number} iOffsetLo 
       * @param {number} iOffsetHi 
       * @returns {number|Promise<number>}
       */
      xWrite(pFile, pData, iAmt, iOffsetLo, iOffsetHi) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @param {number} sizeLo 
       * @param {number} sizeHi 
       * @returns {number|Promise<number>}
       */
      xTruncate(pFile, sizeLo, sizeHi) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @param {number} flags 
       * @returns {number|Promise<number>}
       */
      xSync(pFile, flags) {
        return SQLITE_OK;
      }
      /**
       * 
       * @param {number} pFile 
       * @param {number} pSize 
       * @returns {number|Promise<number>}
       */
      xFileSize(pFile, pSize) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @param {number} lockType 
       * @returns {number|Promise<number>}
       */
      xLock(pFile, lockType) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @param {number} lockType 
       * @returns {number|Promise<number>}
       */
      xUnlock(pFile, lockType) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @param {number} pResOut 
       * @returns {number|Promise<number>}
       */
      xCheckReservedLock(pFile, pResOut) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @param {number} op 
       * @param {number} pArg 
       * @returns {number|Promise<number>}
       */
      xFileControl(pFile, op, pArg) {
        return SQLITE_NOTFOUND;
      }
      /**
       * @param {number} pFile 
       * @returns {number|Promise<number>}
       */
      xSectorSize(pFile) {
        return DEFAULT_SECTOR_SIZE;
      }
      /**
       * @param {number} pFile 
       * @returns {number|Promise<number>}
       */
      xDeviceCharacteristics(pFile) {
        return 0;
      }
    };
    AsyncFunction = Object.getPrototypeOf(async function() {
    }).constructor;
    FacadeVFS = (_a = class extends Base {
      /**
       * @param {string} name 
       * @param {object} module 
       */
      constructor(name, module) {
        super(name, module);
        __privateAdd(this, _FacadeVFS_instances);
      }
      /**
       * Override to indicate which methods are asynchronous.
       * @param {string} methodName 
       * @returns {boolean}
       */
      hasAsyncMethod(methodName) {
        const jMethodName = `j${methodName.slice(1)}`;
        return this[jMethodName] instanceof AsyncFunction;
      }
      /**
       * Return the filename for a file id for use by mixins.
       * @param {number} pFile 
       * @returns {string}
       */
      getFilename(pFile) {
        throw new Error("unimplemented");
      }
      /**
       * @param {string?} filename 
       * @param {number} pFile 
       * @param {number} flags 
       * @param {DataView} pOutFlags 
       * @returns {number|Promise<number>}
       */
      jOpen(filename, pFile, flags, pOutFlags) {
        return SQLITE_CANTOPEN;
      }
      /**
       * @param {string} filename 
       * @param {number} syncDir 
       * @returns {number|Promise<number>}
       */
      jDelete(filename, syncDir) {
        return SQLITE_OK;
      }
      /**
       * @param {string} filename 
       * @param {number} flags 
       * @param {DataView} pResOut 
       * @returns {number|Promise<number>}
       */
      jAccess(filename, flags, pResOut) {
        return SQLITE_OK;
      }
      /**
       * @param {string} filename 
       * @param {Uint8Array} zOut 
       * @returns {number|Promise<number>}
       */
      jFullPathname(filename, zOut) {
        const { read, written } = new TextEncoder().encodeInto(filename, zOut);
        if (read < filename.length) return SQLITE_IOERR;
        if (written >= zOut.length) return SQLITE_IOERR;
        zOut[written] = 0;
        return SQLITE_OK;
      }
      /**
       * @param {Uint8Array} zBuf 
       * @returns {number|Promise<number>}
       */
      jGetLastError(zBuf) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @returns {number|Promise<number>}
       */
      jClose(pFile) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @param {Uint8Array} pData 
       * @param {number} iOffset 
       * @returns {number|Promise<number>}
       */
      jRead(pFile, pData, iOffset) {
        pData.fill(0);
        return SQLITE_IOERR_SHORT_READ;
      }
      /**
       * @param {number} pFile 
       * @param {Uint8Array} pData 
       * @param {number} iOffset 
       * @returns {number|Promise<number>}
       */
      jWrite(pFile, pData, iOffset) {
        return SQLITE_IOERR_WRITE;
      }
      /**
       * @param {number} pFile 
       * @param {number} size 
       * @returns {number|Promise<number>}
       */
      jTruncate(pFile, size) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @param {number} flags 
       * @returns {number|Promise<number>}
       */
      jSync(pFile, flags) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @param {DataView} pSize
       * @returns {number|Promise<number>}
       */
      jFileSize(pFile, pSize) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @param {number} lockType 
       * @returns {number|Promise<number>}
       */
      jLock(pFile, lockType) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @param {number} lockType 
       * @returns {number|Promise<number>}
       */
      jUnlock(pFile, lockType) {
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile 
       * @param {DataView} pResOut 
       * @returns {number|Promise<number>}
       */
      jCheckReservedLock(pFile, pResOut) {
        pResOut.setInt32(0, 0, true);
        return SQLITE_OK;
      }
      /**
       * @param {number} pFile
       * @param {number} op
       * @param {DataView} pArg
       * @returns {number|Promise<number>}
       */
      jFileControl(pFile, op, pArg) {
        return SQLITE_NOTFOUND;
      }
      /**
       * @param {number} pFile
       * @returns {number|Promise<number>}
       */
      jSectorSize(pFile) {
        return super.xSectorSize(pFile);
      }
      /**
       * @param {number} pFile
       * @returns {number|Promise<number>}
       */
      jDeviceCharacteristics(pFile) {
        return 0;
      }
      /**
       * @param {number} pVfs 
       * @param {number} zName 
       * @param {number} pFile 
       * @param {number} flags 
       * @param {number} pOutFlags 
       * @returns {number|Promise<number>}
       */
      xOpen(pVfs, zName, pFile, flags, pOutFlags) {
        const filename = __privateMethod(this, _FacadeVFS_instances, decodeFilename_fn).call(this, zName, flags);
        const pOutFlagsView = __privateMethod(this, _FacadeVFS_instances, makeTypedDataView_fn).call(this, "Int32", pOutFlags);
        this["log"]?.("jOpen", filename, pFile, "0x" + flags.toString(16));
        return this.jOpen(filename, pFile, flags, pOutFlagsView);
      }
      /**
       * @param {number} pVfs 
       * @param {number} zName 
       * @param {number} syncDir 
       * @returns {number|Promise<number>}
       */
      xDelete(pVfs, zName, syncDir) {
        const filename = this._module.UTF8ToString(zName);
        this["log"]?.("jDelete", filename, syncDir);
        return this.jDelete(filename, syncDir);
      }
      /**
       * @param {number} pVfs 
       * @param {number} zName 
       * @param {number} flags 
       * @param {number} pResOut 
       * @returns {number|Promise<number>}
       */
      xAccess(pVfs, zName, flags, pResOut) {
        const filename = this._module.UTF8ToString(zName);
        const pResOutView = __privateMethod(this, _FacadeVFS_instances, makeTypedDataView_fn).call(this, "Int32", pResOut);
        this["log"]?.("jAccess", filename, flags);
        return this.jAccess(filename, flags, pResOutView);
      }
      /**
       * @param {number} pVfs 
       * @param {number} zName 
       * @param {number} nOut 
       * @param {number} zOut 
       * @returns {number|Promise<number>}
       */
      xFullPathname(pVfs, zName, nOut, zOut) {
        const filename = this._module.UTF8ToString(zName);
        const zOutArray = this._module.HEAPU8.subarray(zOut, zOut + nOut);
        this["log"]?.("jFullPathname", filename, nOut);
        return this.jFullPathname(filename, zOutArray);
      }
      /**
       * @param {number} pVfs 
       * @param {number} nBuf 
       * @param {number} zBuf 
       * @returns {number|Promise<number>}
       */
      xGetLastError(pVfs, nBuf, zBuf) {
        const zBufArray = this._module.HEAPU8.subarray(zBuf, zBuf + nBuf);
        this["log"]?.("jGetLastError", nBuf);
        return this.jGetLastError(zBufArray);
      }
      /**
       * @param {number} pFile 
       * @returns {number|Promise<number>}
       */
      xClose(pFile) {
        this["log"]?.("jClose", pFile);
        return this.jClose(pFile);
      }
      /**
       * @param {number} pFile 
       * @param {number} pData 
       * @param {number} iAmt 
       * @param {number} iOffsetLo 
       * @param {number} iOffsetHi 
       * @returns {number|Promise<number>}
       */
      xRead(pFile, pData, iAmt, iOffsetLo, iOffsetHi) {
        const pDataArray = __privateMethod(this, _FacadeVFS_instances, makeDataArray_fn).call(this, pData, iAmt);
        const iOffset = delegalize(iOffsetLo, iOffsetHi);
        this["log"]?.("jRead", pFile, iAmt, iOffset);
        return this.jRead(pFile, pDataArray, iOffset);
      }
      /**
       * @param {number} pFile 
       * @param {number} pData 
       * @param {number} iAmt 
       * @param {number} iOffsetLo 
       * @param {number} iOffsetHi 
       * @returns {number|Promise<number>}
       */
      xWrite(pFile, pData, iAmt, iOffsetLo, iOffsetHi) {
        const pDataArray = __privateMethod(this, _FacadeVFS_instances, makeDataArray_fn).call(this, pData, iAmt);
        const iOffset = delegalize(iOffsetLo, iOffsetHi);
        this["log"]?.("jWrite", pFile, pDataArray, iOffset);
        return this.jWrite(pFile, pDataArray, iOffset);
      }
      /**
       * @param {number} pFile 
       * @param {number} sizeLo 
       * @param {number} sizeHi 
       * @returns {number|Promise<number>}
       */
      xTruncate(pFile, sizeLo, sizeHi) {
        const size = delegalize(sizeLo, sizeHi);
        this["log"]?.("jTruncate", pFile, size);
        return this.jTruncate(pFile, size);
      }
      /**
       * @param {number} pFile 
       * @param {number} flags 
       * @returns {number|Promise<number>}
       */
      xSync(pFile, flags) {
        this["log"]?.("jSync", pFile, flags);
        return this.jSync(pFile, flags);
      }
      /**
       * 
       * @param {number} pFile 
       * @param {number} pSize 
       * @returns {number|Promise<number>}
       */
      xFileSize(pFile, pSize) {
        const pSizeView = __privateMethod(this, _FacadeVFS_instances, makeTypedDataView_fn).call(this, "BigInt64", pSize);
        this["log"]?.("jFileSize", pFile);
        return this.jFileSize(pFile, pSizeView);
      }
      /**
       * @param {number} pFile 
       * @param {number} lockType 
       * @returns {number|Promise<number>}
       */
      xLock(pFile, lockType) {
        this["log"]?.("jLock", pFile, lockType);
        return this.jLock(pFile, lockType);
      }
      /**
       * @param {number} pFile 
       * @param {number} lockType 
       * @returns {number|Promise<number>}
       */
      xUnlock(pFile, lockType) {
        this["log"]?.("jUnlock", pFile, lockType);
        return this.jUnlock(pFile, lockType);
      }
      /**
       * @param {number} pFile 
       * @param {number} pResOut 
       * @returns {number|Promise<number>}
       */
      xCheckReservedLock(pFile, pResOut) {
        const pResOutView = __privateMethod(this, _FacadeVFS_instances, makeTypedDataView_fn).call(this, "Int32", pResOut);
        this["log"]?.("jCheckReservedLock", pFile);
        return this.jCheckReservedLock(pFile, pResOutView);
      }
      /**
       * @param {number} pFile 
       * @param {number} op 
       * @param {number} pArg 
       * @returns {number|Promise<number>}
       */
      xFileControl(pFile, op, pArg) {
        const pArgView = new DataView(
          this._module.HEAPU8.buffer,
          this._module.HEAPU8.byteOffset + pArg
        );
        this["log"]?.("jFileControl", pFile, op, pArgView);
        return this.jFileControl(pFile, op, pArgView);
      }
      /**
       * @param {number} pFile 
       * @returns {number|Promise<number>}
       */
      xSectorSize(pFile) {
        this["log"]?.("jSectorSize", pFile);
        return this.jSectorSize(pFile);
      }
      /**
       * @param {number} pFile 
       * @returns {number|Promise<number>}
       */
      xDeviceCharacteristics(pFile) {
        this["log"]?.("jDeviceCharacteristics", pFile);
        return this.jDeviceCharacteristics(pFile);
      }
    }, _FacadeVFS_instances = new WeakSet(), /**
     * Wrapped DataView for pointer arguments.
     * Pointers to a single value are passed using DataView. A Proxy
     * wrapper prevents use of incorrect type or endianness.
     * @param {'Int32'|'BigInt64'} type 
     * @param {number} byteOffset 
     * @returns {DataView}
     */
    makeTypedDataView_fn = function(type, byteOffset) {
      const byteLength = type === "Int32" ? 4 : 8;
      const getter = `get${type}`;
      const setter = `set${type}`;
      const makeDataView = () => new DataView(
        this._module.HEAPU8.buffer,
        this._module.HEAPU8.byteOffset + byteOffset,
        byteLength
      );
      let dataView = makeDataView();
      return new Proxy(dataView, {
        get(_, prop) {
          if (dataView.buffer.byteLength === 0) {
            dataView = makeDataView();
          }
          if (prop === getter) {
            return function(byteOffset2, littleEndian) {
              if (!littleEndian) throw new Error("must be little endian");
              return dataView[prop](byteOffset2, littleEndian);
            };
          }
          if (prop === setter) {
            return function(byteOffset2, value, littleEndian) {
              if (!littleEndian) throw new Error("must be little endian");
              return dataView[prop](byteOffset2, value, littleEndian);
            };
          }
          if (typeof prop === "string" && prop.match(/^(get)|(set)/)) {
            throw new Error("invalid type");
          }
          const result = dataView[prop];
          return typeof result === "function" ? result.bind(dataView) : result;
        }
      });
    }, /**
     * @param {number} byteOffset 
     * @param {number} byteLength 
     */
    makeDataArray_fn = function(byteOffset, byteLength) {
      let target = this._module.HEAPU8.subarray(byteOffset, byteOffset + byteLength);
      return new Proxy(target, {
        get: (_, prop, receiver) => {
          if (target.buffer.byteLength === 0) {
            target = this._module.HEAPU8.subarray(byteOffset, byteOffset + byteLength);
          }
          const result = target[prop];
          return typeof result === "function" ? result.bind(target) : result;
        }
      });
    }, decodeFilename_fn = function(zName, flags) {
      if (flags & SQLITE_OPEN_URI) {
        let pName = zName;
        let state = 1;
        const charCodes = [];
        while (state) {
          const charCode = this._module.HEAPU8[pName++];
          if (charCode) {
            charCodes.push(charCode);
          } else {
            if (!this._module.HEAPU8[pName]) state = null;
            switch (state) {
              case 1:
                charCodes.push("?".charCodeAt(0));
                state = 2;
                break;
              case 2:
                charCodes.push("=".charCodeAt(0));
                state = 3;
                break;
              case 3:
                charCodes.push("&".charCodeAt(0));
                state = 2;
                break;
            }
          }
        }
        return new TextDecoder().decode(new Uint8Array(charCodes));
      }
      return zName ? this._module.UTF8ToString(zName) : null;
    }, _a);
  }
});
var opfs_exports = {};
__export(opfs_exports, {
  OPFSCoopSyncVFS: () => OPFSCoopSyncVFS,
  useOpfsStorage: () => useOpfsStorage
});
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
var DEFAULT_TEMPORARY_FILES, LOCK_NOTIFY_INTERVAL, DB_RELATED_FILE_SUFFIXES, finalizationRegistry, File, PersistentFile, OPFSCoopSyncVFS;
var init_opfs = __esm({
  "../../node_modules/.pnpm/@subframe7536+sqlite-wasm@0.3.1/node_modules/@subframe7536/sqlite-wasm/dist/opfs.mjs"() {
    var __OPFSCoopSyncVFS_instances, initialize_fn, createPersistentFile_fn, requestAccessHandle_fn, releaseAccessHandle_fn, acquireLock_fn, _a;
    init_chunk_XYF4QS23();
    init_chunk_QFCKR22C();
    DEFAULT_TEMPORARY_FILES = 10;
    LOCK_NOTIFY_INTERVAL = 1e3;
    DB_RELATED_FILE_SUFFIXES = ["", "-journal", "-wal"];
    finalizationRegistry = new FinalizationRegistry((releaser) => releaser());
    File = class {
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
    PersistentFile = class {
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
    OPFSCoopSyncVFS = (_a = class extends FacadeVFS {
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
  }
});
var idb_exports = {};
__export(idb_exports, {
  IDBBatchAtomicVFS: () => IDBBatchAtomicVFS,
  useIdbStorage: () => useIdbStorage
});
function extractString2(dataView, offset) {
  const p = dataView.getUint32(offset, true);
  if (p) {
    const chars = new Uint8Array(dataView.buffer, p);
    return new TextDecoder().decode(chars.subarray(0, chars.indexOf(0)));
  }
  return null;
}
function wrap(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function useIdbStorage(fileName, options = {}) {
  const {
    url,
    idbName = "idb-sqlite-vfs",
    lockPolicy = "shared+hint",
    lockTimeout = Infinity,
    readonly
  } = options;
  const sqliteModule = await wa_sqlite_async_default(
    url ? { locateFile: () => url } : void 0
  );
  const vfsOptions = { idbName, lockPolicy, lockTimeout };
  return {
    path: fileName.endsWith(".db") ? fileName : `${fileName}.db`,
    readonly,
    sqliteModule,
    vfsFn: IDBBatchAtomicVFS.create,
    vfsOptions
  };
}
var Module2, wa_sqlite_async_default, SHARED, POLL_SHARED, POLL_EXCLUSIVE, POLICIES, WebLocksMixin, File2, IDBBatchAtomicVFS, IDBContext;
var init_idb = __esm({
  "../../node_modules/.pnpm/@subframe7536+sqlite-wasm@0.3.1/node_modules/@subframe7536/sqlite-wasm/dist/idb.mjs"() {
    var _isReady, _idb, __IDBBatchAtomicVFS_instances, initialize_fn, _a, _database, _chain, _txComplete, _request, _txPending, __IDBContext_instances, q_fn, _b;
    init_chunk_QFCKR22C();
    Module2 = (() => {
      var _scriptDir = self.location.href;
      return function(moduleArg = {}) {
        var Module22 = moduleArg;
        var readyPromiseResolve, readyPromiseReject;
        Module22["ready"] = new Promise((resolve, reject) => {
          readyPromiseResolve = resolve;
          readyPromiseReject = reject;
        });
        var moduleOverrides = Object.assign({}, Module22);
        var thisProgram = "./this.program";
        var quit_ = (status, toThrow) => {
          throw toThrow;
        };
        var ENVIRONMENT_IS_WEB = typeof window == "object";
        var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
        typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
        var scriptDirectory = "";
        function locateFile(path) {
          if (Module22["locateFile"]) {
            return Module22["locateFile"](path, scriptDirectory);
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
        var out = Module22["print"] || console.log.bind(console);
        var err = Module22["printErr"] || console.error.bind(console);
        Object.assign(Module22, moduleOverrides);
        moduleOverrides = null;
        if (Module22["arguments"]) Module22["arguments"];
        if (Module22["thisProgram"]) thisProgram = Module22["thisProgram"];
        if (Module22["quit"]) quit_ = Module22["quit"];
        var wasmBinary;
        if (Module22["wasmBinary"]) wasmBinary = Module22["wasmBinary"];
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
          Module22["HEAP8"] = HEAP8 = new Int8Array(b);
          Module22["HEAP16"] = HEAP16 = new Int16Array(b);
          Module22["HEAPU8"] = HEAPU8 = new Uint8Array(b);
          Module22["HEAPU16"] = HEAPU16 = new Uint16Array(b);
          Module22["HEAP32"] = HEAP32 = new Int32Array(b);
          Module22["HEAPU32"] = HEAPU32 = new Uint32Array(b);
          Module22["HEAPF32"] = HEAPF32 = new Float32Array(b);
          Module22["HEAPF64"] = HEAPF64 = new Float64Array(b);
        }
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATMAIN__ = [];
        var __ATPOSTRUN__ = [];
        function preRun() {
          if (Module22["preRun"]) {
            if (typeof Module22["preRun"] == "function") Module22["preRun"] = [Module22["preRun"]];
            while (Module22["preRun"].length) {
              addOnPreRun(Module22["preRun"].shift());
            }
          }
          callRuntimeCallbacks(__ATPRERUN__);
        }
        function initRuntime() {
          if (!Module22["noFSInit"] && !FS.init.initialized) FS.init();
          FS.ignorePermissions = false;
          callRuntimeCallbacks(__ATINIT__);
        }
        function preMain() {
          callRuntimeCallbacks(__ATMAIN__);
        }
        function postRun() {
          if (Module22["postRun"]) {
            if (typeof Module22["postRun"] == "function") Module22["postRun"] = [Module22["postRun"]];
            while (Module22["postRun"].length) {
              addOnPostRun(Module22["postRun"].shift());
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
          if (Module22["monitorRunDependencies"]) {
            Module22["monitorRunDependencies"](runDependencies);
          }
        }
        function removeRunDependency(id) {
          runDependencies--;
          if (Module22["monitorRunDependencies"]) {
            Module22["monitorRunDependencies"](runDependencies);
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
          if (Module22["onAbort"]) {
            Module22["onAbort"](what);
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
        if (Module22["locateFile"]) {
          wasmBinaryFile = "wa-sqlite-async.wasm";
          if (!isDataURI(wasmBinaryFile)) {
            wasmBinaryFile = locateFile(wasmBinaryFile);
          }
        } else {
          wasmBinaryFile = new URL("wa-sqlite-async.wasm", self.location.href).href;
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
            wasmExports = Asyncify2.instrumentWasmExports(wasmExports);
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
          if (Module22["instantiateWasm"]) {
            try {
              return Module22["instantiateWasm"](info, receiveInstance);
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
            callbacks.shift()(Module22);
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
        var noExitRuntime = Module22["noExitRuntime"] || true;
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
        }, stream_ops: { open(stream2) {
          var tty = TTY.ttys[stream2.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream2.tty = tty;
          stream2.seekable = false;
        }, close(stream2) {
          stream2.tty.ops.fsync(stream2.tty);
        }, fsync(stream2) {
          stream2.tty.ops.fsync(stream2.tty);
        }, read(stream2, buffer, offset, length, pos) {
          if (!stream2.tty || !stream2.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream2.tty.ops.get_char(stream2.tty);
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
            stream2.node.timestamp = Date.now();
          }
          return bytesRead;
        }, write(stream2, buffer, offset, length, pos) {
          if (!stream2.tty || !stream2.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream2.tty.ops.put_char(stream2.tty, buffer[offset + i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream2.node.timestamp = Date.now();
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
        } }, stream_ops: { read(stream2, buffer, offset, length, position) {
          var contents = stream2.node.contents;
          if (position >= stream2.node.usedBytes) return 0;
          var size = Math.min(stream2.node.usedBytes - position, length);
          if (size > 8 && contents.subarray) {
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        }, write(stream2, buffer, offset, length, position, canOwn) {
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false;
          }
          if (!length) return 0;
          var node = stream2.node;
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
        }, llseek(stream2, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream2.position;
          } else if (whence === 2) {
            if (FS.isFile(stream2.node.mode)) {
              position += stream2.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        }, allocate(stream2, offset, length) {
          MEMFS.expandFileStorage(stream2.node, offset + length);
          stream2.node.usedBytes = Math.max(stream2.node.usedBytes, offset + length);
        }, mmap(stream2, length, position, prot, flags) {
          if (!FS.isFile(stream2.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream2.node.contents;
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
        }, msync(stream2, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream2, buffer, 0, length, offset, false);
          return 0;
        } } };
        var asyncLoad = (url, onload, onerror, noRunDep) => {
          var dep = getUniqueRunDependency(`al ${url}`);
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
        var preloadPlugins = Module22["preloadPlugins"] || [];
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
          var stream2 = FS.getStream(fd);
          if (!stream2) {
            throw new FS.ErrnoError(8);
          }
          return stream2;
        }, getStream: (fd) => FS.streams[fd], createStream(stream2, fd = -1) {
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
          stream2 = Object.assign(new FS.FSStream(), stream2);
          if (fd == -1) {
            fd = FS.nextfd();
          }
          stream2.fd = fd;
          FS.streams[fd] = stream2;
          return stream2;
        }, closeStream(fd) {
          FS.streams[fd] = null;
        }, chrdev_stream_ops: { open(stream2) {
          var device = FS.getDevice(stream2.node.rdev);
          stream2.stream_ops = device.stream_ops;
          if (stream2.stream_ops.open) {
            stream2.stream_ops.open(stream2);
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
          var stream2 = FS.getStreamChecked(fd);
          FS.chmod(stream2.node, mode);
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
          var stream2 = FS.getStreamChecked(fd);
          FS.chown(stream2.node, uid, gid);
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
          var stream2 = FS.getStreamChecked(fd);
          if ((stream2.flags & 2097155) === 0) {
            throw new FS.ErrnoError(28);
          }
          FS.truncate(stream2.node, len);
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
          var stream2 = FS.createStream({ node, path: FS.getPath(node), flags, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false });
          if (stream2.stream_ops.open) {
            stream2.stream_ops.open(stream2);
          }
          if (Module22["logReadFiles"] && !(flags & 1)) {
            if (!FS.readFiles) FS.readFiles = {};
            if (!(path in FS.readFiles)) {
              FS.readFiles[path] = 1;
            }
          }
          return stream2;
        }, close(stream2) {
          if (FS.isClosed(stream2)) {
            throw new FS.ErrnoError(8);
          }
          if (stream2.getdents) stream2.getdents = null;
          try {
            if (stream2.stream_ops.close) {
              stream2.stream_ops.close(stream2);
            }
          } catch (e) {
            throw e;
          } finally {
            FS.closeStream(stream2.fd);
          }
          stream2.fd = null;
        }, isClosed(stream2) {
          return stream2.fd === null;
        }, llseek(stream2, offset, whence) {
          if (FS.isClosed(stream2)) {
            throw new FS.ErrnoError(8);
          }
          if (!stream2.seekable || !stream2.stream_ops.llseek) {
            throw new FS.ErrnoError(70);
          }
          if (whence != 0 && whence != 1 && whence != 2) {
            throw new FS.ErrnoError(28);
          }
          stream2.position = stream2.stream_ops.llseek(stream2, offset, whence);
          stream2.ungotten = [];
          return stream2.position;
        }, read(stream2, buffer, offset, length, position) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream2)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream2.flags & 2097155) === 1) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream2.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream2.stream_ops.read) {
            throw new FS.ErrnoError(28);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream2.position;
          } else if (!stream2.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesRead = stream2.stream_ops.read(stream2, buffer, offset, length, position);
          if (!seeking) stream2.position += bytesRead;
          return bytesRead;
        }, write(stream2, buffer, offset, length, position, canOwn) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream2)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream2.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream2.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream2.stream_ops.write) {
            throw new FS.ErrnoError(28);
          }
          if (stream2.seekable && stream2.flags & 1024) {
            FS.llseek(stream2, 0, 2);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream2.position;
          } else if (!stream2.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesWritten = stream2.stream_ops.write(stream2, buffer, offset, length, position, canOwn);
          if (!seeking) stream2.position += bytesWritten;
          return bytesWritten;
        }, allocate(stream2, offset, length) {
          if (FS.isClosed(stream2)) {
            throw new FS.ErrnoError(8);
          }
          if (offset < 0 || length <= 0) {
            throw new FS.ErrnoError(28);
          }
          if ((stream2.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (!FS.isFile(stream2.node.mode) && !FS.isDir(stream2.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (!stream2.stream_ops.allocate) {
            throw new FS.ErrnoError(138);
          }
          stream2.stream_ops.allocate(stream2, offset, length);
        }, mmap(stream2, length, position, prot, flags) {
          if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream2.flags & 2097155) !== 2) {
            throw new FS.ErrnoError(2);
          }
          if ((stream2.flags & 2097155) === 1) {
            throw new FS.ErrnoError(2);
          }
          if (!stream2.stream_ops.mmap) {
            throw new FS.ErrnoError(43);
          }
          return stream2.stream_ops.mmap(stream2, length, position, prot, flags);
        }, msync(stream2, buffer, offset, length, mmapFlags) {
          if (!stream2.stream_ops.msync) {
            return 0;
          }
          return stream2.stream_ops.msync(stream2, buffer, offset, length, mmapFlags);
        }, munmap: (stream2) => 0, ioctl(stream2, cmd, arg) {
          if (!stream2.stream_ops.ioctl) {
            throw new FS.ErrnoError(59);
          }
          return stream2.stream_ops.ioctl(stream2, cmd, arg);
        }, readFile(path, opts = {}) {
          opts.flags = opts.flags || 0;
          opts.encoding = opts.encoding || "binary";
          if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
            throw new Error(`Invalid encoding type "${opts.encoding}"`);
          }
          var ret;
          var stream2 = FS.open(path, opts.flags);
          var stat = FS.stat(path);
          var length = stat.size;
          var buf = new Uint8Array(length);
          FS.read(stream2, buf, 0, length, 0);
          if (opts.encoding === "utf8") {
            ret = UTF8ArrayToString(buf, 0);
          } else if (opts.encoding === "binary") {
            ret = buf;
          }
          FS.close(stream2);
          return ret;
        }, writeFile(path, data, opts = {}) {
          opts.flags = opts.flags || 577;
          var stream2 = FS.open(path, opts.flags, opts.mode);
          if (typeof data == "string") {
            var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
            var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
            FS.write(stream2, buf, 0, actualNumBytes, void 0, opts.canOwn);
          } else if (ArrayBuffer.isView(data)) {
            FS.write(stream2, data, 0, data.byteLength, void 0, opts.canOwn);
          } else {
            throw new Error("Unsupported data type");
          }
          FS.close(stream2);
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
          FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (stream2, buffer, offset, length, pos) => length });
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
              var stream2 = FS.getStreamChecked(fd);
              var ret = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => stream2.path } };
              ret.parent = ret;
              return ret;
            } };
            return node;
          } }, {}, "/proc/self/fd");
        }, createStandardStreams() {
          if (Module22["stdin"]) {
            FS.createDevice("/dev", "stdin", Module22["stdin"]);
          } else {
            FS.symlink("/dev/tty", "/dev/stdin");
          }
          if (Module22["stdout"]) {
            FS.createDevice("/dev", "stdout", null, Module22["stdout"]);
          } else {
            FS.symlink("/dev/tty", "/dev/stdout");
          }
          if (Module22["stderr"]) {
            FS.createDevice("/dev", "stderr", null, Module22["stderr"]);
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
          Module22["stdin"] = input || Module22["stdin"];
          Module22["stdout"] = output || Module22["stdout"];
          Module22["stderr"] = error || Module22["stderr"];
          FS.createStandardStreams();
        }, quit() {
          FS.init.initialized = false;
          for (var i = 0; i < FS.streams.length; i++) {
            var stream2 = FS.streams[i];
            if (!stream2) {
              continue;
            }
            FS.close(stream2);
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
            var stream2 = FS.open(node, 577);
            FS.write(stream2, data, 0, data.length, 0, canOwn);
            FS.close(stream2);
            FS.chmod(node, mode);
          }
          return node;
        }, createDevice(parent, name, input, output) {
          var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
          var mode = FS_getMode(!!input, !!output);
          if (!FS.createDevice.major) FS.createDevice.major = 64;
          var dev = FS.makedev(FS.createDevice.major++, 0);
          FS.registerDevice(dev, { open(stream2) {
            stream2.seekable = false;
          }, close(stream2) {
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          }, read(stream2, buffer, offset, length, pos) {
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
              stream2.node.timestamp = Date.now();
            }
            return bytesRead;
          }, write(stream2, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset + i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream2.node.timestamp = Date.now();
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
          function writeChunks(stream2, buffer, offset, length, position) {
            var contents = stream2.node.contents;
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
          stream_ops.read = (stream2, buffer, offset, length, position) => {
            FS.forceLoadFile(node);
            return writeChunks(stream2, buffer, offset, length, position);
          };
          stream_ops.mmap = (stream2, length, position, prot, flags) => {
            FS.forceLoadFile(node);
            var ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            writeChunks(stream2, HEAP8, ptr, length, position);
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
        }, doMsync(addr, stream2, len, flags, offset) {
          if (!FS.isFile(stream2.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (flags & 2) {
            return 0;
          }
          var buffer = HEAPU8.slice(addr, addr + len);
          FS.msync(stream2, buffer, offset, len, flags);
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
          var stream2 = FS.getStreamChecked(fd);
          return stream2;
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
            var stream2 = SYSCALLS.getStreamFromFD(fd);
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
                newStream = FS.createStream(stream2, arg);
                return newStream.fd;
              }
              case 1:
              case 2:
                return 0;
              case 3:
                return stream2.flags;
              case 4: {
                var arg = SYSCALLS.get();
                stream2.flags |= arg;
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
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            return SYSCALLS.doStat(FS.stat, stream2.path, buf);
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
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            var res = FS.mmap(stream2, len, offset, prot, flags);
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
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            if (prot & 2) {
              SYSCALLS.doMsync(addr, stream2, len, flags, offset);
            }
            FS.munmap(stream2);
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
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            FS.close(stream2);
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
              var stream2 = SYSCALLS.getStreamFromFD(fd);
              var type = stream2.tty ? 2 : FS.isDir(stream2.mode) ? 3 : FS.isLink(stream2.mode) ? 7 : 4;
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
        var doReadv = (stream2, iov, iovcnt, offset) => {
          var ret = 0;
          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAPU32[iov >> 2];
            var len = HEAPU32[iov + 4 >> 2];
            iov += 8;
            var curr = FS.read(stream2, HEAP8, ptr, len, offset);
            if (curr < 0) return -1;
            ret += curr;
            if (curr < len) break;
          }
          return ret;
        };
        function _fd_read(fd, iov, iovcnt, pnum) {
          try {
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            var num = doReadv(stream2, iov, iovcnt);
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
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            FS.llseek(stream2, offset, whence);
            tempI64 = [stream2.position >>> 0, (tempDouble = stream2.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
            if (stream2.getdents && offset === 0 && whence === 0) stream2.getdents = null;
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        var _fd_sync = function(fd) {
          try {
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            return Asyncify2.handleSleep((wakeUp) => {
              var mount = stream2.node.mount;
              if (!mount.type.syncfs) {
                wakeUp(0);
                return;
              }
              mount.type.syncfs(mount, false, (err2) => {
                if (err2) {
                  wakeUp(29);
                  return;
                }
                wakeUp(0);
              });
            });
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        };
        _fd_sync.isAsync = true;
        var doWritev = (stream2, iov, iovcnt, offset) => {
          var ret = 0;
          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAPU32[iov >> 2];
            var len = HEAPU32[iov + 4 >> 2];
            iov += 8;
            var curr = FS.write(stream2, HEAP8, ptr, len, offset);
            if (curr < 0) return -1;
            ret += curr;
          }
          return ret;
        };
        function _fd_write(fd, iov, iovcnt, pnum) {
          try {
            var stream2 = SYSCALLS.getStreamFromFD(fd);
            var num = doWritev(stream2, iov, iovcnt);
            HEAPU32[pnum >> 2] = num;
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        var adapters_support = function() {
          const handleAsync = typeof Asyncify2 === "object" ? Asyncify2.handleAsync.bind(Asyncify2) : null;
          Module22["handleAsync"] = handleAsync;
          const targets = /* @__PURE__ */ new Map();
          Module22["setCallback"] = (key, target) => targets.set(key, target);
          Module22["getCallback"] = (key) => targets.get(key);
          Module22["deleteCallback"] = (key) => targets.delete(key);
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
        _ipp_async.isAsync = true;
        function _ippipppp(...args) {
          return adapters_support(false, ...args);
        }
        function _ippipppp_async(...args) {
          return adapters_support(true, ...args);
        }
        _ippipppp_async.isAsync = true;
        function _ippp(...args) {
          return adapters_support(false, ...args);
        }
        function _ippp_async(...args) {
          return adapters_support(true, ...args);
        }
        _ippp_async.isAsync = true;
        function _ipppi(...args) {
          return adapters_support(false, ...args);
        }
        function _ipppi_async(...args) {
          return adapters_support(true, ...args);
        }
        _ipppi_async.isAsync = true;
        function _ipppiii(...args) {
          return adapters_support(false, ...args);
        }
        function _ipppiii_async(...args) {
          return adapters_support(true, ...args);
        }
        _ipppiii_async.isAsync = true;
        function _ipppiiip(...args) {
          return adapters_support(false, ...args);
        }
        function _ipppiiip_async(...args) {
          return adapters_support(true, ...args);
        }
        _ipppiiip_async.isAsync = true;
        function _ipppip(...args) {
          return adapters_support(false, ...args);
        }
        function _ipppip_async(...args) {
          return adapters_support(true, ...args);
        }
        _ipppip_async.isAsync = true;
        function _ipppj(...args) {
          return adapters_support(false, ...args);
        }
        function _ipppj_async(...args) {
          return adapters_support(true, ...args);
        }
        _ipppj_async.isAsync = true;
        function _ipppp(...args) {
          return adapters_support(false, ...args);
        }
        function _ipppp_async(...args) {
          return adapters_support(true, ...args);
        }
        _ipppp_async.isAsync = true;
        function _ippppi(...args) {
          return adapters_support(false, ...args);
        }
        function _ippppi_async(...args) {
          return adapters_support(true, ...args);
        }
        _ippppi_async.isAsync = true;
        function _ippppij(...args) {
          return adapters_support(false, ...args);
        }
        function _ippppij_async(...args) {
          return adapters_support(true, ...args);
        }
        _ippppij_async.isAsync = true;
        function _ippppip(...args) {
          return adapters_support(false, ...args);
        }
        function _ippppip_async(...args) {
          return adapters_support(true, ...args);
        }
        _ippppip_async.isAsync = true;
        function _ipppppip(...args) {
          return adapters_support(false, ...args);
        }
        function _ipppppip_async(...args) {
          return adapters_support(true, ...args);
        }
        _ipppppip_async.isAsync = true;
        function _vppp(...args) {
          return adapters_support(false, ...args);
        }
        function _vppp_async(...args) {
          return adapters_support(true, ...args);
        }
        _vppp_async.isAsync = true;
        function _vpppip(...args) {
          return adapters_support(false, ...args);
        }
        function _vpppip_async(...args) {
          return adapters_support(true, ...args);
        }
        _vpppip_async.isAsync = true;
        var runtimeKeepaliveCounter = 0;
        var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
        var _proc_exit = (code) => {
          EXITSTATUS = code;
          if (!keepRuntimeAlive()) {
            if (Module22["onExit"]) Module22["onExit"](code);
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
        var runAndAbortIfError = (func) => {
          try {
            return func();
          } catch (e) {
            abort(e);
          }
        };
        var _exit = exitJS;
        var maybeExit = () => {
          if (!keepRuntimeAlive()) {
            try {
              _exit(EXITSTATUS);
            } catch (e) {
              handleException(e);
            }
          }
        };
        var callUserCallback = (func) => {
          if (ABORT) {
            return;
          }
          try {
            func();
            maybeExit();
          } catch (e) {
            handleException(e);
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
        var runtimeKeepalivePush = () => {
          runtimeKeepaliveCounter += 1;
        };
        var runtimeKeepalivePop = () => {
          runtimeKeepaliveCounter -= 1;
        };
        var Asyncify2 = { instrumentWasmImports(imports) {
          var importPattern = /^(ipp|ipp_async|ippp|ippp_async|vppp|vppp_async|ipppj|ipppj_async|ipppi|ipppi_async|ipppp|ipppp_async|ipppip|ipppip_async|vpppip|vpppip_async|ippppi|ippppi_async|ippppij|ippppij_async|ipppiii|ipppiii_async|ippppip|ippppip_async|ippipppp|ippipppp_async|ipppppip|ipppppip_async|ipppiiip|ipppiiip_async|invoke_.*|__asyncjs__.*)$/;
          for (var x in imports) {
            (function(x2) {
              var original = imports[x2];
              original.sig;
              if (typeof original == "function") {
                original.isAsync || importPattern.test(x2);
              }
            })(x);
          }
        }, instrumentWasmExports(exports) {
          var ret = {};
          for (var x in exports) {
            (function(x2) {
              var original = exports[x2];
              if (typeof original == "function") {
                ret[x2] = function() {
                  Asyncify2.exportCallStack.push(x2);
                  try {
                    return original.apply(null, arguments);
                  } finally {
                    if (!ABORT) {
                      var y = Asyncify2.exportCallStack.pop();
                      assert(y === x2);
                      Asyncify2.maybeStopUnwind();
                    }
                  }
                };
              } else {
                ret[x2] = original;
              }
            })(x);
          }
          return ret;
        }, State: { Normal: 0, Unwinding: 1, Rewinding: 2, Disabled: 3 }, state: 0, StackSize: 16384, currData: null, handleSleepReturnValue: 0, exportCallStack: [], callStackNameToId: {}, callStackIdToName: {}, callStackId: 0, asyncPromiseHandlers: null, sleepCallbacks: [], getCallStackId(funcName) {
          var id = Asyncify2.callStackNameToId[funcName];
          if (id === void 0) {
            id = Asyncify2.callStackId++;
            Asyncify2.callStackNameToId[funcName] = id;
            Asyncify2.callStackIdToName[id] = funcName;
          }
          return id;
        }, maybeStopUnwind() {
          if (Asyncify2.currData && Asyncify2.state === Asyncify2.State.Unwinding && Asyncify2.exportCallStack.length === 0) {
            Asyncify2.state = Asyncify2.State.Normal;
            runAndAbortIfError(_asyncify_stop_unwind);
            if (typeof Fibers != "undefined") {
              Fibers.trampoline();
            }
          }
        }, whenDone() {
          return new Promise((resolve, reject) => {
            Asyncify2.asyncPromiseHandlers = { resolve, reject };
          });
        }, allocateData() {
          var ptr = _malloc(12 + Asyncify2.StackSize);
          Asyncify2.setDataHeader(ptr, ptr + 12, Asyncify2.StackSize);
          Asyncify2.setDataRewindFunc(ptr);
          return ptr;
        }, setDataHeader(ptr, stack, stackSize) {
          HEAPU32[ptr >> 2] = stack;
          HEAPU32[ptr + 4 >> 2] = stack + stackSize;
        }, setDataRewindFunc(ptr) {
          var bottomOfCallStack = Asyncify2.exportCallStack[0];
          var rewindId = Asyncify2.getCallStackId(bottomOfCallStack);
          HEAP32[ptr + 8 >> 2] = rewindId;
        }, getDataRewindFunc(ptr) {
          var id = HEAP32[ptr + 8 >> 2];
          var name = Asyncify2.callStackIdToName[id];
          var func = wasmExports[name];
          return func;
        }, doRewind(ptr) {
          var start = Asyncify2.getDataRewindFunc(ptr);
          return start();
        }, handleSleep(startAsync) {
          if (ABORT) return;
          if (Asyncify2.state === Asyncify2.State.Normal) {
            var reachedCallback = false;
            var reachedAfterCallback = false;
            startAsync((handleSleepReturnValue = 0) => {
              if (ABORT) return;
              Asyncify2.handleSleepReturnValue = handleSleepReturnValue;
              reachedCallback = true;
              if (!reachedAfterCallback) {
                return;
              }
              Asyncify2.state = Asyncify2.State.Rewinding;
              runAndAbortIfError(() => _asyncify_start_rewind(Asyncify2.currData));
              if (typeof Browser != "undefined" && Browser.mainLoop.func) {
                Browser.mainLoop.resume();
              }
              var asyncWasmReturnValue, isError = false;
              try {
                asyncWasmReturnValue = Asyncify2.doRewind(Asyncify2.currData);
              } catch (err2) {
                asyncWasmReturnValue = err2;
                isError = true;
              }
              var handled = false;
              if (!Asyncify2.currData) {
                var asyncPromiseHandlers = Asyncify2.asyncPromiseHandlers;
                if (asyncPromiseHandlers) {
                  Asyncify2.asyncPromiseHandlers = null;
                  (isError ? asyncPromiseHandlers.reject : asyncPromiseHandlers.resolve)(asyncWasmReturnValue);
                  handled = true;
                }
              }
              if (isError && !handled) {
                throw asyncWasmReturnValue;
              }
            });
            reachedAfterCallback = true;
            if (!reachedCallback) {
              Asyncify2.state = Asyncify2.State.Unwinding;
              Asyncify2.currData = Asyncify2.allocateData();
              if (typeof Browser != "undefined" && Browser.mainLoop.func) {
                Browser.mainLoop.pause();
              }
              runAndAbortIfError(() => _asyncify_start_unwind(Asyncify2.currData));
            }
          } else if (Asyncify2.state === Asyncify2.State.Rewinding) {
            Asyncify2.state = Asyncify2.State.Normal;
            runAndAbortIfError(_asyncify_stop_rewind);
            _free(Asyncify2.currData);
            Asyncify2.currData = null;
            Asyncify2.sleepCallbacks.forEach((func) => callUserCallback(func));
          } else {
            abort(`invalid state: ${Asyncify2.state}`);
          }
          return Asyncify2.handleSleepReturnValue;
        }, handleAsync(startAsync) {
          return Asyncify2.handleSleep((wakeUp) => {
            startAsync().then(wakeUp);
          });
        } };
        var uleb128Encode = (n, target) => {
          if (n < 128) {
            target.push(n);
          } else {
            target.push(n % 128 | 128, n >> 7);
          }
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
          var func = Module22["_" + ident];
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
          var previousAsync = Asyncify2.currData;
          var ret = func.apply(null, cArgs);
          function onDone(ret2) {
            runtimeKeepalivePop();
            if (stack !== 0) stackRestore(stack);
            return convertReturnValue(ret2);
          }
          var asyncMode = opts && opts.async;
          runtimeKeepalivePush();
          if (Asyncify2.currData != previousAsync) {
            return Asyncify2.whenDone().then(onDone);
          }
          ret = onDone(ret);
          if (asyncMode) return Promise.resolve(ret);
          return ret;
        };
        var cwrap = (ident, returnType, argTypes, opts) => {
          var numericArgs = !argTypes || argTypes.every((type) => type === "number" || type === "boolean");
          var numericRet = returnType !== "string";
          if (numericRet && numericArgs && !opts) {
            return getCFunc(ident);
          }
          return function() {
            return ccall(ident, returnType, argTypes, arguments, opts);
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
        Module22["_sqlite3_status64"] = (a0, a1, a2, a3) => (Module22["_sqlite3_status64"] = wasmExports["la"])(a0, a1, a2, a3);
        Module22["_sqlite3_status"] = (a0, a1, a2, a3) => (Module22["_sqlite3_status"] = wasmExports["ma"])(a0, a1, a2, a3);
        Module22["_sqlite3_db_status"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_db_status"] = wasmExports["na"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_msize"] = (a0) => (Module22["_sqlite3_msize"] = wasmExports["oa"])(a0);
        Module22["_sqlite3_vfs_find"] = (a0) => (Module22["_sqlite3_vfs_find"] = wasmExports["pa"])(a0);
        Module22["_sqlite3_vfs_register"] = (a0, a1) => (Module22["_sqlite3_vfs_register"] = wasmExports["qa"])(a0, a1);
        Module22["_sqlite3_vfs_unregister"] = (a0) => (Module22["_sqlite3_vfs_unregister"] = wasmExports["ra"])(a0);
        Module22["_sqlite3_release_memory"] = (a0) => (Module22["_sqlite3_release_memory"] = wasmExports["sa"])(a0);
        Module22["_sqlite3_soft_heap_limit64"] = (a0, a1) => (Module22["_sqlite3_soft_heap_limit64"] = wasmExports["ta"])(a0, a1);
        Module22["_sqlite3_memory_used"] = () => (Module22["_sqlite3_memory_used"] = wasmExports["ua"])();
        Module22["_sqlite3_hard_heap_limit64"] = (a0, a1) => (Module22["_sqlite3_hard_heap_limit64"] = wasmExports["va"])(a0, a1);
        Module22["_sqlite3_memory_highwater"] = (a0) => (Module22["_sqlite3_memory_highwater"] = wasmExports["wa"])(a0);
        Module22["_sqlite3_malloc"] = (a0) => (Module22["_sqlite3_malloc"] = wasmExports["xa"])(a0);
        Module22["_sqlite3_malloc64"] = (a0, a1) => (Module22["_sqlite3_malloc64"] = wasmExports["ya"])(a0, a1);
        Module22["_sqlite3_free"] = (a0) => (Module22["_sqlite3_free"] = wasmExports["za"])(a0);
        Module22["_sqlite3_realloc"] = (a0, a1) => (Module22["_sqlite3_realloc"] = wasmExports["Aa"])(a0, a1);
        Module22["_sqlite3_realloc64"] = (a0, a1, a2) => (Module22["_sqlite3_realloc64"] = wasmExports["Ba"])(a0, a1, a2);
        Module22["_sqlite3_str_vappendf"] = (a0, a1, a2) => (Module22["_sqlite3_str_vappendf"] = wasmExports["Ca"])(a0, a1, a2);
        Module22["_sqlite3_str_append"] = (a0, a1, a2) => (Module22["_sqlite3_str_append"] = wasmExports["Da"])(a0, a1, a2);
        Module22["_sqlite3_str_appendchar"] = (a0, a1, a2) => (Module22["_sqlite3_str_appendchar"] = wasmExports["Ea"])(a0, a1, a2);
        Module22["_sqlite3_str_appendall"] = (a0, a1) => (Module22["_sqlite3_str_appendall"] = wasmExports["Fa"])(a0, a1);
        Module22["_sqlite3_str_appendf"] = (a0, a1, a2) => (Module22["_sqlite3_str_appendf"] = wasmExports["Ga"])(a0, a1, a2);
        Module22["_sqlite3_str_finish"] = (a0) => (Module22["_sqlite3_str_finish"] = wasmExports["Ha"])(a0);
        Module22["_sqlite3_str_errcode"] = (a0) => (Module22["_sqlite3_str_errcode"] = wasmExports["Ia"])(a0);
        Module22["_sqlite3_str_length"] = (a0) => (Module22["_sqlite3_str_length"] = wasmExports["Ja"])(a0);
        Module22["_sqlite3_str_value"] = (a0) => (Module22["_sqlite3_str_value"] = wasmExports["Ka"])(a0);
        Module22["_sqlite3_str_reset"] = (a0) => (Module22["_sqlite3_str_reset"] = wasmExports["La"])(a0);
        Module22["_sqlite3_str_new"] = (a0) => (Module22["_sqlite3_str_new"] = wasmExports["Ma"])(a0);
        Module22["_sqlite3_vmprintf"] = (a0, a1) => (Module22["_sqlite3_vmprintf"] = wasmExports["Na"])(a0, a1);
        Module22["_sqlite3_mprintf"] = (a0, a1) => (Module22["_sqlite3_mprintf"] = wasmExports["Oa"])(a0, a1);
        Module22["_sqlite3_vsnprintf"] = (a0, a1, a2, a3) => (Module22["_sqlite3_vsnprintf"] = wasmExports["Pa"])(a0, a1, a2, a3);
        Module22["_sqlite3_snprintf"] = (a0, a1, a2, a3) => (Module22["_sqlite3_snprintf"] = wasmExports["Qa"])(a0, a1, a2, a3);
        Module22["_sqlite3_log"] = (a0, a1, a2) => (Module22["_sqlite3_log"] = wasmExports["Ra"])(a0, a1, a2);
        Module22["_sqlite3_randomness"] = (a0, a1) => (Module22["_sqlite3_randomness"] = wasmExports["Sa"])(a0, a1);
        Module22["_sqlite3_stricmp"] = (a0, a1) => (Module22["_sqlite3_stricmp"] = wasmExports["Ta"])(a0, a1);
        Module22["_sqlite3_strnicmp"] = (a0, a1, a2) => (Module22["_sqlite3_strnicmp"] = wasmExports["Ua"])(a0, a1, a2);
        Module22["_sqlite3_os_init"] = () => (Module22["_sqlite3_os_init"] = wasmExports["Va"])();
        Module22["_sqlite3_os_end"] = () => (Module22["_sqlite3_os_end"] = wasmExports["Wa"])();
        Module22["_sqlite3_serialize"] = (a0, a1, a2, a3) => (Module22["_sqlite3_serialize"] = wasmExports["Xa"])(a0, a1, a2, a3);
        Module22["_sqlite3_prepare_v2"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_prepare_v2"] = wasmExports["Ya"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_step"] = (a0) => (Module22["_sqlite3_step"] = wasmExports["Za"])(a0);
        Module22["_sqlite3_column_int64"] = (a0, a1) => (Module22["_sqlite3_column_int64"] = wasmExports["_a"])(a0, a1);
        Module22["_sqlite3_reset"] = (a0) => (Module22["_sqlite3_reset"] = wasmExports["$a"])(a0);
        Module22["_sqlite3_exec"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_exec"] = wasmExports["ab"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_column_int"] = (a0, a1) => (Module22["_sqlite3_column_int"] = wasmExports["bb"])(a0, a1);
        Module22["_sqlite3_finalize"] = (a0) => (Module22["_sqlite3_finalize"] = wasmExports["cb"])(a0);
        Module22["_sqlite3_deserialize"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module22["_sqlite3_deserialize"] = wasmExports["db"])(a0, a1, a2, a3, a4, a5, a6, a7);
        Module22["_sqlite3_database_file_object"] = (a0) => (Module22["_sqlite3_database_file_object"] = wasmExports["eb"])(a0);
        Module22["_sqlite3_backup_init"] = (a0, a1, a2, a3) => (Module22["_sqlite3_backup_init"] = wasmExports["fb"])(a0, a1, a2, a3);
        Module22["_sqlite3_backup_step"] = (a0, a1) => (Module22["_sqlite3_backup_step"] = wasmExports["gb"])(a0, a1);
        Module22["_sqlite3_backup_finish"] = (a0) => (Module22["_sqlite3_backup_finish"] = wasmExports["hb"])(a0);
        Module22["_sqlite3_backup_remaining"] = (a0) => (Module22["_sqlite3_backup_remaining"] = wasmExports["ib"])(a0);
        Module22["_sqlite3_backup_pagecount"] = (a0) => (Module22["_sqlite3_backup_pagecount"] = wasmExports["jb"])(a0);
        Module22["_sqlite3_clear_bindings"] = (a0) => (Module22["_sqlite3_clear_bindings"] = wasmExports["kb"])(a0);
        Module22["_sqlite3_value_blob"] = (a0) => (Module22["_sqlite3_value_blob"] = wasmExports["lb"])(a0);
        Module22["_sqlite3_value_text"] = (a0) => (Module22["_sqlite3_value_text"] = wasmExports["mb"])(a0);
        Module22["_sqlite3_value_bytes"] = (a0) => (Module22["_sqlite3_value_bytes"] = wasmExports["nb"])(a0);
        Module22["_sqlite3_value_bytes16"] = (a0) => (Module22["_sqlite3_value_bytes16"] = wasmExports["ob"])(a0);
        Module22["_sqlite3_value_double"] = (a0) => (Module22["_sqlite3_value_double"] = wasmExports["pb"])(a0);
        Module22["_sqlite3_value_int"] = (a0) => (Module22["_sqlite3_value_int"] = wasmExports["qb"])(a0);
        Module22["_sqlite3_value_int64"] = (a0) => (Module22["_sqlite3_value_int64"] = wasmExports["rb"])(a0);
        Module22["_sqlite3_value_subtype"] = (a0) => (Module22["_sqlite3_value_subtype"] = wasmExports["sb"])(a0);
        Module22["_sqlite3_value_pointer"] = (a0, a1) => (Module22["_sqlite3_value_pointer"] = wasmExports["tb"])(a0, a1);
        Module22["_sqlite3_value_text16"] = (a0) => (Module22["_sqlite3_value_text16"] = wasmExports["ub"])(a0);
        Module22["_sqlite3_value_text16be"] = (a0) => (Module22["_sqlite3_value_text16be"] = wasmExports["vb"])(a0);
        Module22["_sqlite3_value_text16le"] = (a0) => (Module22["_sqlite3_value_text16le"] = wasmExports["wb"])(a0);
        Module22["_sqlite3_value_type"] = (a0) => (Module22["_sqlite3_value_type"] = wasmExports["xb"])(a0);
        Module22["_sqlite3_value_encoding"] = (a0) => (Module22["_sqlite3_value_encoding"] = wasmExports["yb"])(a0);
        Module22["_sqlite3_value_nochange"] = (a0) => (Module22["_sqlite3_value_nochange"] = wasmExports["zb"])(a0);
        Module22["_sqlite3_value_frombind"] = (a0) => (Module22["_sqlite3_value_frombind"] = wasmExports["Ab"])(a0);
        Module22["_sqlite3_value_dup"] = (a0) => (Module22["_sqlite3_value_dup"] = wasmExports["Bb"])(a0);
        Module22["_sqlite3_value_free"] = (a0) => (Module22["_sqlite3_value_free"] = wasmExports["Cb"])(a0);
        Module22["_sqlite3_result_blob"] = (a0, a1, a2, a3) => (Module22["_sqlite3_result_blob"] = wasmExports["Db"])(a0, a1, a2, a3);
        Module22["_sqlite3_result_blob64"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_result_blob64"] = wasmExports["Eb"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_result_double"] = (a0, a1) => (Module22["_sqlite3_result_double"] = wasmExports["Fb"])(a0, a1);
        Module22["_sqlite3_result_error"] = (a0, a1, a2) => (Module22["_sqlite3_result_error"] = wasmExports["Gb"])(a0, a1, a2);
        Module22["_sqlite3_result_error16"] = (a0, a1, a2) => (Module22["_sqlite3_result_error16"] = wasmExports["Hb"])(a0, a1, a2);
        Module22["_sqlite3_result_int"] = (a0, a1) => (Module22["_sqlite3_result_int"] = wasmExports["Ib"])(a0, a1);
        Module22["_sqlite3_result_int64"] = (a0, a1, a2) => (Module22["_sqlite3_result_int64"] = wasmExports["Jb"])(a0, a1, a2);
        Module22["_sqlite3_result_null"] = (a0) => (Module22["_sqlite3_result_null"] = wasmExports["Kb"])(a0);
        Module22["_sqlite3_result_pointer"] = (a0, a1, a2, a3) => (Module22["_sqlite3_result_pointer"] = wasmExports["Lb"])(a0, a1, a2, a3);
        Module22["_sqlite3_result_subtype"] = (a0, a1) => (Module22["_sqlite3_result_subtype"] = wasmExports["Mb"])(a0, a1);
        Module22["_sqlite3_result_text"] = (a0, a1, a2, a3) => (Module22["_sqlite3_result_text"] = wasmExports["Nb"])(a0, a1, a2, a3);
        Module22["_sqlite3_result_text64"] = (a0, a1, a2, a3, a4, a5) => (Module22["_sqlite3_result_text64"] = wasmExports["Ob"])(a0, a1, a2, a3, a4, a5);
        Module22["_sqlite3_result_text16"] = (a0, a1, a2, a3) => (Module22["_sqlite3_result_text16"] = wasmExports["Pb"])(a0, a1, a2, a3);
        Module22["_sqlite3_result_text16be"] = (a0, a1, a2, a3) => (Module22["_sqlite3_result_text16be"] = wasmExports["Qb"])(a0, a1, a2, a3);
        Module22["_sqlite3_result_text16le"] = (a0, a1, a2, a3) => (Module22["_sqlite3_result_text16le"] = wasmExports["Rb"])(a0, a1, a2, a3);
        Module22["_sqlite3_result_value"] = (a0, a1) => (Module22["_sqlite3_result_value"] = wasmExports["Sb"])(a0, a1);
        Module22["_sqlite3_result_error_toobig"] = (a0) => (Module22["_sqlite3_result_error_toobig"] = wasmExports["Tb"])(a0);
        Module22["_sqlite3_result_zeroblob"] = (a0, a1) => (Module22["_sqlite3_result_zeroblob"] = wasmExports["Ub"])(a0, a1);
        Module22["_sqlite3_result_zeroblob64"] = (a0, a1, a2) => (Module22["_sqlite3_result_zeroblob64"] = wasmExports["Vb"])(a0, a1, a2);
        Module22["_sqlite3_result_error_code"] = (a0, a1) => (Module22["_sqlite3_result_error_code"] = wasmExports["Wb"])(a0, a1);
        Module22["_sqlite3_result_error_nomem"] = (a0) => (Module22["_sqlite3_result_error_nomem"] = wasmExports["Xb"])(a0);
        Module22["_sqlite3_user_data"] = (a0) => (Module22["_sqlite3_user_data"] = wasmExports["Yb"])(a0);
        Module22["_sqlite3_context_db_handle"] = (a0) => (Module22["_sqlite3_context_db_handle"] = wasmExports["Zb"])(a0);
        Module22["_sqlite3_vtab_nochange"] = (a0) => (Module22["_sqlite3_vtab_nochange"] = wasmExports["_b"])(a0);
        Module22["_sqlite3_vtab_in_first"] = (a0, a1) => (Module22["_sqlite3_vtab_in_first"] = wasmExports["$b"])(a0, a1);
        Module22["_sqlite3_vtab_in_next"] = (a0, a1) => (Module22["_sqlite3_vtab_in_next"] = wasmExports["ac"])(a0, a1);
        Module22["_sqlite3_aggregate_context"] = (a0, a1) => (Module22["_sqlite3_aggregate_context"] = wasmExports["bc"])(a0, a1);
        Module22["_sqlite3_get_auxdata"] = (a0, a1) => (Module22["_sqlite3_get_auxdata"] = wasmExports["cc"])(a0, a1);
        Module22["_sqlite3_set_auxdata"] = (a0, a1, a2, a3) => (Module22["_sqlite3_set_auxdata"] = wasmExports["dc"])(a0, a1, a2, a3);
        Module22["_sqlite3_column_count"] = (a0) => (Module22["_sqlite3_column_count"] = wasmExports["ec"])(a0);
        Module22["_sqlite3_data_count"] = (a0) => (Module22["_sqlite3_data_count"] = wasmExports["fc"])(a0);
        Module22["_sqlite3_column_blob"] = (a0, a1) => (Module22["_sqlite3_column_blob"] = wasmExports["gc"])(a0, a1);
        Module22["_sqlite3_column_bytes"] = (a0, a1) => (Module22["_sqlite3_column_bytes"] = wasmExports["hc"])(a0, a1);
        Module22["_sqlite3_column_bytes16"] = (a0, a1) => (Module22["_sqlite3_column_bytes16"] = wasmExports["ic"])(a0, a1);
        Module22["_sqlite3_column_double"] = (a0, a1) => (Module22["_sqlite3_column_double"] = wasmExports["jc"])(a0, a1);
        Module22["_sqlite3_column_text"] = (a0, a1) => (Module22["_sqlite3_column_text"] = wasmExports["kc"])(a0, a1);
        Module22["_sqlite3_column_value"] = (a0, a1) => (Module22["_sqlite3_column_value"] = wasmExports["lc"])(a0, a1);
        Module22["_sqlite3_column_text16"] = (a0, a1) => (Module22["_sqlite3_column_text16"] = wasmExports["mc"])(a0, a1);
        Module22["_sqlite3_column_type"] = (a0, a1) => (Module22["_sqlite3_column_type"] = wasmExports["nc"])(a0, a1);
        Module22["_sqlite3_column_name"] = (a0, a1) => (Module22["_sqlite3_column_name"] = wasmExports["oc"])(a0, a1);
        Module22["_sqlite3_column_name16"] = (a0, a1) => (Module22["_sqlite3_column_name16"] = wasmExports["pc"])(a0, a1);
        Module22["_sqlite3_bind_blob"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_bind_blob"] = wasmExports["qc"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_bind_blob64"] = (a0, a1, a2, a3, a4, a5) => (Module22["_sqlite3_bind_blob64"] = wasmExports["rc"])(a0, a1, a2, a3, a4, a5);
        Module22["_sqlite3_bind_double"] = (a0, a1, a2) => (Module22["_sqlite3_bind_double"] = wasmExports["sc"])(a0, a1, a2);
        Module22["_sqlite3_bind_int"] = (a0, a1, a2) => (Module22["_sqlite3_bind_int"] = wasmExports["tc"])(a0, a1, a2);
        Module22["_sqlite3_bind_int64"] = (a0, a1, a2, a3) => (Module22["_sqlite3_bind_int64"] = wasmExports["uc"])(a0, a1, a2, a3);
        Module22["_sqlite3_bind_null"] = (a0, a1) => (Module22["_sqlite3_bind_null"] = wasmExports["vc"])(a0, a1);
        Module22["_sqlite3_bind_pointer"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_bind_pointer"] = wasmExports["wc"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_bind_text"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_bind_text"] = wasmExports["xc"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_bind_text64"] = (a0, a1, a2, a3, a4, a5, a6) => (Module22["_sqlite3_bind_text64"] = wasmExports["yc"])(a0, a1, a2, a3, a4, a5, a6);
        Module22["_sqlite3_bind_text16"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_bind_text16"] = wasmExports["zc"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_bind_value"] = (a0, a1, a2) => (Module22["_sqlite3_bind_value"] = wasmExports["Ac"])(a0, a1, a2);
        Module22["_sqlite3_bind_zeroblob"] = (a0, a1, a2) => (Module22["_sqlite3_bind_zeroblob"] = wasmExports["Bc"])(a0, a1, a2);
        Module22["_sqlite3_bind_zeroblob64"] = (a0, a1, a2, a3) => (Module22["_sqlite3_bind_zeroblob64"] = wasmExports["Cc"])(a0, a1, a2, a3);
        Module22["_sqlite3_bind_parameter_count"] = (a0) => (Module22["_sqlite3_bind_parameter_count"] = wasmExports["Dc"])(a0);
        Module22["_sqlite3_bind_parameter_name"] = (a0, a1) => (Module22["_sqlite3_bind_parameter_name"] = wasmExports["Ec"])(a0, a1);
        Module22["_sqlite3_bind_parameter_index"] = (a0, a1) => (Module22["_sqlite3_bind_parameter_index"] = wasmExports["Fc"])(a0, a1);
        Module22["_sqlite3_db_handle"] = (a0) => (Module22["_sqlite3_db_handle"] = wasmExports["Gc"])(a0);
        Module22["_sqlite3_stmt_readonly"] = (a0) => (Module22["_sqlite3_stmt_readonly"] = wasmExports["Hc"])(a0);
        Module22["_sqlite3_stmt_isexplain"] = (a0) => (Module22["_sqlite3_stmt_isexplain"] = wasmExports["Ic"])(a0);
        Module22["_sqlite3_stmt_explain"] = (a0, a1) => (Module22["_sqlite3_stmt_explain"] = wasmExports["Jc"])(a0, a1);
        Module22["_sqlite3_stmt_busy"] = (a0) => (Module22["_sqlite3_stmt_busy"] = wasmExports["Kc"])(a0);
        Module22["_sqlite3_next_stmt"] = (a0, a1) => (Module22["_sqlite3_next_stmt"] = wasmExports["Lc"])(a0, a1);
        Module22["_sqlite3_stmt_status"] = (a0, a1, a2) => (Module22["_sqlite3_stmt_status"] = wasmExports["Mc"])(a0, a1, a2);
        Module22["_sqlite3_sql"] = (a0) => (Module22["_sqlite3_sql"] = wasmExports["Nc"])(a0);
        Module22["_sqlite3_expanded_sql"] = (a0) => (Module22["_sqlite3_expanded_sql"] = wasmExports["Oc"])(a0);
        Module22["_sqlite3_value_numeric_type"] = (a0) => (Module22["_sqlite3_value_numeric_type"] = wasmExports["Pc"])(a0);
        Module22["_sqlite3_blob_open"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module22["_sqlite3_blob_open"] = wasmExports["Qc"])(a0, a1, a2, a3, a4, a5, a6, a7);
        Module22["_sqlite3_blob_close"] = (a0) => (Module22["_sqlite3_blob_close"] = wasmExports["Rc"])(a0);
        Module22["_sqlite3_blob_read"] = (a0, a1, a2, a3) => (Module22["_sqlite3_blob_read"] = wasmExports["Sc"])(a0, a1, a2, a3);
        Module22["_sqlite3_blob_write"] = (a0, a1, a2, a3) => (Module22["_sqlite3_blob_write"] = wasmExports["Tc"])(a0, a1, a2, a3);
        Module22["_sqlite3_blob_bytes"] = (a0) => (Module22["_sqlite3_blob_bytes"] = wasmExports["Uc"])(a0);
        Module22["_sqlite3_blob_reopen"] = (a0, a1, a2) => (Module22["_sqlite3_blob_reopen"] = wasmExports["Vc"])(a0, a1, a2);
        Module22["_sqlite3_set_authorizer"] = (a0, a1, a2) => (Module22["_sqlite3_set_authorizer"] = wasmExports["Wc"])(a0, a1, a2);
        Module22["_sqlite3_strglob"] = (a0, a1) => (Module22["_sqlite3_strglob"] = wasmExports["Xc"])(a0, a1);
        Module22["_sqlite3_strlike"] = (a0, a1, a2) => (Module22["_sqlite3_strlike"] = wasmExports["Yc"])(a0, a1, a2);
        Module22["_sqlite3_errmsg"] = (a0) => (Module22["_sqlite3_errmsg"] = wasmExports["Zc"])(a0);
        Module22["_sqlite3_auto_extension"] = (a0) => (Module22["_sqlite3_auto_extension"] = wasmExports["_c"])(a0);
        Module22["_sqlite3_cancel_auto_extension"] = (a0) => (Module22["_sqlite3_cancel_auto_extension"] = wasmExports["$c"])(a0);
        Module22["_sqlite3_reset_auto_extension"] = () => (Module22["_sqlite3_reset_auto_extension"] = wasmExports["ad"])();
        Module22["_sqlite3_prepare"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_prepare"] = wasmExports["bd"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_prepare_v3"] = (a0, a1, a2, a3, a4, a5) => (Module22["_sqlite3_prepare_v3"] = wasmExports["cd"])(a0, a1, a2, a3, a4, a5);
        Module22["_sqlite3_prepare16"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_prepare16"] = wasmExports["dd"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_prepare16_v2"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_prepare16_v2"] = wasmExports["ed"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_prepare16_v3"] = (a0, a1, a2, a3, a4, a5) => (Module22["_sqlite3_prepare16_v3"] = wasmExports["fd"])(a0, a1, a2, a3, a4, a5);
        Module22["_sqlite3_get_table"] = (a0, a1, a2, a3, a4, a5) => (Module22["_sqlite3_get_table"] = wasmExports["gd"])(a0, a1, a2, a3, a4, a5);
        Module22["_sqlite3_free_table"] = (a0) => (Module22["_sqlite3_free_table"] = wasmExports["hd"])(a0);
        Module22["_sqlite3_create_module"] = (a0, a1, a2, a3) => (Module22["_sqlite3_create_module"] = wasmExports["id"])(a0, a1, a2, a3);
        Module22["_sqlite3_create_module_v2"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_create_module_v2"] = wasmExports["jd"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_drop_modules"] = (a0, a1) => (Module22["_sqlite3_drop_modules"] = wasmExports["kd"])(a0, a1);
        Module22["_sqlite3_declare_vtab"] = (a0, a1) => (Module22["_sqlite3_declare_vtab"] = wasmExports["ld"])(a0, a1);
        Module22["_sqlite3_vtab_on_conflict"] = (a0) => (Module22["_sqlite3_vtab_on_conflict"] = wasmExports["md"])(a0);
        Module22["_sqlite3_vtab_config"] = (a0, a1, a2) => (Module22["_sqlite3_vtab_config"] = wasmExports["nd"])(a0, a1, a2);
        Module22["_sqlite3_vtab_collation"] = (a0, a1) => (Module22["_sqlite3_vtab_collation"] = wasmExports["od"])(a0, a1);
        Module22["_sqlite3_vtab_in"] = (a0, a1, a2) => (Module22["_sqlite3_vtab_in"] = wasmExports["pd"])(a0, a1, a2);
        Module22["_sqlite3_vtab_rhs_value"] = (a0, a1, a2) => (Module22["_sqlite3_vtab_rhs_value"] = wasmExports["qd"])(a0, a1, a2);
        Module22["_sqlite3_vtab_distinct"] = (a0) => (Module22["_sqlite3_vtab_distinct"] = wasmExports["rd"])(a0);
        Module22["_sqlite3_keyword_name"] = (a0, a1, a2) => (Module22["_sqlite3_keyword_name"] = wasmExports["sd"])(a0, a1, a2);
        Module22["_sqlite3_keyword_count"] = () => (Module22["_sqlite3_keyword_count"] = wasmExports["td"])();
        Module22["_sqlite3_keyword_check"] = (a0, a1) => (Module22["_sqlite3_keyword_check"] = wasmExports["ud"])(a0, a1);
        Module22["_sqlite3_complete"] = (a0) => (Module22["_sqlite3_complete"] = wasmExports["vd"])(a0);
        Module22["_sqlite3_complete16"] = (a0) => (Module22["_sqlite3_complete16"] = wasmExports["wd"])(a0);
        Module22["_sqlite3_libversion"] = () => (Module22["_sqlite3_libversion"] = wasmExports["xd"])();
        Module22["_sqlite3_libversion_number"] = () => (Module22["_sqlite3_libversion_number"] = wasmExports["yd"])();
        Module22["_sqlite3_threadsafe"] = () => (Module22["_sqlite3_threadsafe"] = wasmExports["zd"])();
        Module22["_sqlite3_initialize"] = () => (Module22["_sqlite3_initialize"] = wasmExports["Ad"])();
        Module22["_sqlite3_shutdown"] = () => (Module22["_sqlite3_shutdown"] = wasmExports["Bd"])();
        Module22["_sqlite3_config"] = (a0, a1) => (Module22["_sqlite3_config"] = wasmExports["Cd"])(a0, a1);
        Module22["_sqlite3_db_mutex"] = (a0) => (Module22["_sqlite3_db_mutex"] = wasmExports["Dd"])(a0);
        Module22["_sqlite3_db_release_memory"] = (a0) => (Module22["_sqlite3_db_release_memory"] = wasmExports["Ed"])(a0);
        Module22["_sqlite3_db_cacheflush"] = (a0) => (Module22["_sqlite3_db_cacheflush"] = wasmExports["Fd"])(a0);
        Module22["_sqlite3_db_config"] = (a0, a1, a2) => (Module22["_sqlite3_db_config"] = wasmExports["Gd"])(a0, a1, a2);
        Module22["_sqlite3_last_insert_rowid"] = (a0) => (Module22["_sqlite3_last_insert_rowid"] = wasmExports["Hd"])(a0);
        Module22["_sqlite3_set_last_insert_rowid"] = (a0, a1, a2) => (Module22["_sqlite3_set_last_insert_rowid"] = wasmExports["Id"])(a0, a1, a2);
        Module22["_sqlite3_changes64"] = (a0) => (Module22["_sqlite3_changes64"] = wasmExports["Jd"])(a0);
        Module22["_sqlite3_changes"] = (a0) => (Module22["_sqlite3_changes"] = wasmExports["Kd"])(a0);
        Module22["_sqlite3_total_changes64"] = (a0) => (Module22["_sqlite3_total_changes64"] = wasmExports["Ld"])(a0);
        Module22["_sqlite3_total_changes"] = (a0) => (Module22["_sqlite3_total_changes"] = wasmExports["Md"])(a0);
        Module22["_sqlite3_txn_state"] = (a0, a1) => (Module22["_sqlite3_txn_state"] = wasmExports["Nd"])(a0, a1);
        Module22["_sqlite3_close"] = (a0) => (Module22["_sqlite3_close"] = wasmExports["Od"])(a0);
        Module22["_sqlite3_close_v2"] = (a0) => (Module22["_sqlite3_close_v2"] = wasmExports["Pd"])(a0);
        Module22["_sqlite3_busy_handler"] = (a0, a1, a2) => (Module22["_sqlite3_busy_handler"] = wasmExports["Qd"])(a0, a1, a2);
        Module22["_sqlite3_progress_handler"] = (a0, a1, a2, a3) => (Module22["_sqlite3_progress_handler"] = wasmExports["Rd"])(a0, a1, a2, a3);
        Module22["_sqlite3_busy_timeout"] = (a0, a1) => (Module22["_sqlite3_busy_timeout"] = wasmExports["Sd"])(a0, a1);
        Module22["_sqlite3_interrupt"] = (a0) => (Module22["_sqlite3_interrupt"] = wasmExports["Td"])(a0);
        Module22["_sqlite3_is_interrupted"] = (a0) => (Module22["_sqlite3_is_interrupted"] = wasmExports["Ud"])(a0);
        Module22["_sqlite3_create_function"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module22["_sqlite3_create_function"] = wasmExports["Vd"])(a0, a1, a2, a3, a4, a5, a6, a7);
        Module22["_sqlite3_create_function_v2"] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (Module22["_sqlite3_create_function_v2"] = wasmExports["Wd"])(a0, a1, a2, a3, a4, a5, a6, a7, a8);
        Module22["_sqlite3_create_window_function"] = (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) => (Module22["_sqlite3_create_window_function"] = wasmExports["Xd"])(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
        Module22["_sqlite3_create_function16"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module22["_sqlite3_create_function16"] = wasmExports["Yd"])(a0, a1, a2, a3, a4, a5, a6, a7);
        Module22["_sqlite3_overload_function"] = (a0, a1, a2) => (Module22["_sqlite3_overload_function"] = wasmExports["Zd"])(a0, a1, a2);
        Module22["_sqlite3_trace_v2"] = (a0, a1, a2, a3) => (Module22["_sqlite3_trace_v2"] = wasmExports["_d"])(a0, a1, a2, a3);
        Module22["_sqlite3_commit_hook"] = (a0, a1, a2) => (Module22["_sqlite3_commit_hook"] = wasmExports["$d"])(a0, a1, a2);
        Module22["_sqlite3_update_hook"] = (a0, a1, a2) => (Module22["_sqlite3_update_hook"] = wasmExports["ae"])(a0, a1, a2);
        Module22["_sqlite3_rollback_hook"] = (a0, a1, a2) => (Module22["_sqlite3_rollback_hook"] = wasmExports["be"])(a0, a1, a2);
        Module22["_sqlite3_autovacuum_pages"] = (a0, a1, a2, a3) => (Module22["_sqlite3_autovacuum_pages"] = wasmExports["ce"])(a0, a1, a2, a3);
        Module22["_sqlite3_wal_autocheckpoint"] = (a0, a1) => (Module22["_sqlite3_wal_autocheckpoint"] = wasmExports["de"])(a0, a1);
        Module22["_sqlite3_wal_hook"] = (a0, a1, a2) => (Module22["_sqlite3_wal_hook"] = wasmExports["ee"])(a0, a1, a2);
        Module22["_sqlite3_wal_checkpoint_v2"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_wal_checkpoint_v2"] = wasmExports["fe"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_wal_checkpoint"] = (a0, a1) => (Module22["_sqlite3_wal_checkpoint"] = wasmExports["ge"])(a0, a1);
        Module22["_sqlite3_error_offset"] = (a0) => (Module22["_sqlite3_error_offset"] = wasmExports["he"])(a0);
        Module22["_sqlite3_errmsg16"] = (a0) => (Module22["_sqlite3_errmsg16"] = wasmExports["ie"])(a0);
        Module22["_sqlite3_errcode"] = (a0) => (Module22["_sqlite3_errcode"] = wasmExports["je"])(a0);
        Module22["_sqlite3_extended_errcode"] = (a0) => (Module22["_sqlite3_extended_errcode"] = wasmExports["ke"])(a0);
        Module22["_sqlite3_system_errno"] = (a0) => (Module22["_sqlite3_system_errno"] = wasmExports["le"])(a0);
        Module22["_sqlite3_errstr"] = (a0) => (Module22["_sqlite3_errstr"] = wasmExports["me"])(a0);
        Module22["_sqlite3_limit"] = (a0, a1, a2) => (Module22["_sqlite3_limit"] = wasmExports["ne"])(a0, a1, a2);
        Module22["_sqlite3_open"] = (a0, a1) => (Module22["_sqlite3_open"] = wasmExports["oe"])(a0, a1);
        Module22["_sqlite3_open_v2"] = (a0, a1, a2, a3) => (Module22["_sqlite3_open_v2"] = wasmExports["pe"])(a0, a1, a2, a3);
        Module22["_sqlite3_open16"] = (a0, a1) => (Module22["_sqlite3_open16"] = wasmExports["qe"])(a0, a1);
        Module22["_sqlite3_create_collation"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_create_collation"] = wasmExports["re"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_create_collation_v2"] = (a0, a1, a2, a3, a4, a5) => (Module22["_sqlite3_create_collation_v2"] = wasmExports["se"])(a0, a1, a2, a3, a4, a5);
        Module22["_sqlite3_create_collation16"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_create_collation16"] = wasmExports["te"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_collation_needed"] = (a0, a1, a2) => (Module22["_sqlite3_collation_needed"] = wasmExports["ue"])(a0, a1, a2);
        Module22["_sqlite3_collation_needed16"] = (a0, a1, a2) => (Module22["_sqlite3_collation_needed16"] = wasmExports["ve"])(a0, a1, a2);
        Module22["_sqlite3_get_clientdata"] = (a0, a1) => (Module22["_sqlite3_get_clientdata"] = wasmExports["we"])(a0, a1);
        Module22["_sqlite3_set_clientdata"] = (a0, a1, a2, a3) => (Module22["_sqlite3_set_clientdata"] = wasmExports["xe"])(a0, a1, a2, a3);
        Module22["_sqlite3_get_autocommit"] = (a0) => (Module22["_sqlite3_get_autocommit"] = wasmExports["ye"])(a0);
        Module22["_sqlite3_table_column_metadata"] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (Module22["_sqlite3_table_column_metadata"] = wasmExports["ze"])(a0, a1, a2, a3, a4, a5, a6, a7, a8);
        Module22["_sqlite3_sleep"] = (a0) => (Module22["_sqlite3_sleep"] = wasmExports["Ae"])(a0);
        Module22["_sqlite3_extended_result_codes"] = (a0, a1) => (Module22["_sqlite3_extended_result_codes"] = wasmExports["Be"])(a0, a1);
        Module22["_sqlite3_file_control"] = (a0, a1, a2, a3) => (Module22["_sqlite3_file_control"] = wasmExports["Ce"])(a0, a1, a2, a3);
        Module22["_sqlite3_test_control"] = (a0, a1) => (Module22["_sqlite3_test_control"] = wasmExports["De"])(a0, a1);
        Module22["_sqlite3_create_filename"] = (a0, a1, a2, a3, a4) => (Module22["_sqlite3_create_filename"] = wasmExports["Ee"])(a0, a1, a2, a3, a4);
        Module22["_sqlite3_free_filename"] = (a0) => (Module22["_sqlite3_free_filename"] = wasmExports["Fe"])(a0);
        Module22["_sqlite3_uri_parameter"] = (a0, a1) => (Module22["_sqlite3_uri_parameter"] = wasmExports["Ge"])(a0, a1);
        Module22["_sqlite3_uri_key"] = (a0, a1) => (Module22["_sqlite3_uri_key"] = wasmExports["He"])(a0, a1);
        Module22["_sqlite3_uri_boolean"] = (a0, a1, a2) => (Module22["_sqlite3_uri_boolean"] = wasmExports["Ie"])(a0, a1, a2);
        Module22["_sqlite3_uri_int64"] = (a0, a1, a2, a3) => (Module22["_sqlite3_uri_int64"] = wasmExports["Je"])(a0, a1, a2, a3);
        Module22["_sqlite3_filename_database"] = (a0) => (Module22["_sqlite3_filename_database"] = wasmExports["Ke"])(a0);
        Module22["_sqlite3_filename_journal"] = (a0) => (Module22["_sqlite3_filename_journal"] = wasmExports["Le"])(a0);
        Module22["_sqlite3_filename_wal"] = (a0) => (Module22["_sqlite3_filename_wal"] = wasmExports["Me"])(a0);
        Module22["_sqlite3_db_name"] = (a0, a1) => (Module22["_sqlite3_db_name"] = wasmExports["Ne"])(a0, a1);
        Module22["_sqlite3_db_filename"] = (a0, a1) => (Module22["_sqlite3_db_filename"] = wasmExports["Oe"])(a0, a1);
        Module22["_sqlite3_db_readonly"] = (a0, a1) => (Module22["_sqlite3_db_readonly"] = wasmExports["Pe"])(a0, a1);
        Module22["_sqlite3_compileoption_used"] = (a0) => (Module22["_sqlite3_compileoption_used"] = wasmExports["Qe"])(a0);
        Module22["_sqlite3_compileoption_get"] = (a0) => (Module22["_sqlite3_compileoption_get"] = wasmExports["Re"])(a0);
        Module22["_sqlite3_sourceid"] = () => (Module22["_sqlite3_sourceid"] = wasmExports["Se"])();
        var ___errno_location = () => (___errno_location = wasmExports["Te"])();
        var _malloc = Module22["_malloc"] = (a0) => (_malloc = Module22["_malloc"] = wasmExports["Ue"])(a0);
        var _free = Module22["_free"] = (a0) => (_free = Module22["_free"] = wasmExports["Ve"])(a0);
        Module22["_RegisterExtensionFunctions"] = (a0) => (Module22["_RegisterExtensionFunctions"] = wasmExports["We"])(a0);
        Module22["_getSqliteFree"] = () => (Module22["_getSqliteFree"] = wasmExports["Xe"])();
        var _main = Module22["_main"] = (a0, a1) => (_main = Module22["_main"] = wasmExports["Ye"])(a0, a1);
        Module22["_libauthorizer_set_authorizer"] = (a0, a1, a2) => (Module22["_libauthorizer_set_authorizer"] = wasmExports["Ze"])(a0, a1, a2);
        Module22["_libfunction_create_function"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module22["_libfunction_create_function"] = wasmExports["_e"])(a0, a1, a2, a3, a4, a5, a6, a7);
        Module22["_libprogress_progress_handler"] = (a0, a1, a2, a3) => (Module22["_libprogress_progress_handler"] = wasmExports["$e"])(a0, a1, a2, a3);
        Module22["_libvfs_vfs_register"] = (a0, a1, a2, a3, a4, a5) => (Module22["_libvfs_vfs_register"] = wasmExports["af"])(a0, a1, a2, a3, a4, a5);
        var _emscripten_builtin_memalign = (a0, a1) => (_emscripten_builtin_memalign = wasmExports["cf"])(a0, a1);
        var getTempRet0 = () => (getTempRet0 = wasmExports["df"])();
        var stackSave = () => (stackSave = wasmExports["ef"])();
        var stackRestore = (a0) => (stackRestore = wasmExports["ff"])(a0);
        var stackAlloc = (a0) => (stackAlloc = wasmExports["gf"])(a0);
        var _asyncify_start_unwind = (a0) => (_asyncify_start_unwind = wasmExports["hf"])(a0);
        var _asyncify_stop_unwind = () => (_asyncify_stop_unwind = wasmExports["jf"])();
        var _asyncify_start_rewind = (a0) => (_asyncify_start_rewind = wasmExports["kf"])(a0);
        var _asyncify_stop_rewind = () => (_asyncify_stop_rewind = wasmExports["lf"])();
        Module22["_sqlite3_version"] = 3232;
        Module22["getTempRet0"] = getTempRet0;
        Module22["ccall"] = ccall;
        Module22["cwrap"] = cwrap;
        Module22["addFunction"] = addFunction;
        Module22["setValue"] = setValue;
        Module22["getValue"] = getValue;
        Module22["UTF8ToString"] = UTF8ToString;
        Module22["stringToUTF8"] = stringToUTF8;
        Module22["lengthBytesUTF8"] = lengthBytesUTF8;
        Module22["intArrayFromString"] = intArrayFromString;
        Module22["intArrayToString"] = intArrayToString;
        Module22["AsciiToString"] = AsciiToString;
        Module22["UTF16ToString"] = UTF16ToString;
        Module22["stringToUTF16"] = stringToUTF16;
        Module22["UTF32ToString"] = UTF32ToString;
        Module22["stringToUTF32"] = stringToUTF32;
        Module22["writeArrayToMemory"] = writeArrayToMemory;
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
            Module22["calledRun"] = true;
            if (ABORT) return;
            initRuntime();
            preMain();
            readyPromiseResolve(Module22);
            if (Module22["onRuntimeInitialized"]) Module22["onRuntimeInitialized"]();
            if (shouldRunNow) callMain();
            postRun();
          }
          if (Module22["setStatus"]) {
            Module22["setStatus"]("Running...");
            setTimeout(function() {
              setTimeout(function() {
                Module22["setStatus"]("");
              }, 1);
              doRun();
            }, 1);
          } else {
            doRun();
          }
        }
        if (Module22["preInit"]) {
          if (typeof Module22["preInit"] == "function") Module22["preInit"] = [Module22["preInit"]];
          while (Module22["preInit"].length > 0) {
            Module22["preInit"].pop()();
          }
        }
        var shouldRunNow = true;
        if (Module22["noInitialRun"]) shouldRunNow = false;
        run();
        (function() {
          const AsyncFunction3 = Object.getPrototypeOf(async function() {
          }).constructor;
          let pAsyncFlags = 0;
          Module22["set_authorizer"] = function(db2, xAuthorizer, pApp) {
            if (pAsyncFlags) {
              Module22["deleteCallback"](pAsyncFlags);
              Module22["_sqlite3_free"](pAsyncFlags);
              pAsyncFlags = 0;
            }
            pAsyncFlags = Module22["_sqlite3_malloc"](4);
            setValue(pAsyncFlags, xAuthorizer instanceof AsyncFunction3 ? 1 : 0, "i32");
            const result = ccall("libauthorizer_set_authorizer", "number", ["number", "number", "number"], [db2, xAuthorizer ? 1 : 0, pAsyncFlags]);
            if (!result && xAuthorizer) {
              Module22["setCallback"](pAsyncFlags, (_, iAction, p3, p4, p5, p6) => xAuthorizer(pApp, iAction, p3, p4, p5, p6));
            }
            return result;
          };
        })();
        (function() {
          const AsyncFunction3 = Object.getPrototypeOf(async function() {
          }).constructor;
          const FUNC_METHODS = ["xFunc", "xStep", "xFinal"];
          const mapFunctionNameToKey = /* @__PURE__ */ new Map();
          Module22["create_function"] = function(db2, zFunctionName, nArg, eTextRep, pApp, xFunc, xStep, xFinal) {
            const pAsyncFlags = Module22["_sqlite3_malloc"](4);
            const target = { xFunc, xStep, xFinal };
            setValue(pAsyncFlags, FUNC_METHODS.reduce((mask, method, i) => {
              if (target[method] instanceof AsyncFunction3) {
                return mask | 1 << i;
              }
              return mask;
            }, 0), "i32");
            const result = ccall("libfunction_create_function", "number", ["number", "string", "number", "number", "number", "number", "number", "number"], [db2, zFunctionName, nArg, eTextRep, pAsyncFlags, xFunc ? 1 : 0, xStep ? 1 : 0, xFinal ? 1 : 0]);
            if (!result) {
              if (mapFunctionNameToKey.has(zFunctionName)) {
                const oldKey = mapFunctionNameToKey.get(zFunctionName);
                Module22["deleteCallback"](oldKey);
              }
              mapFunctionNameToKey.set(zFunctionName, pAsyncFlags);
              Module22["setCallback"](pAsyncFlags, { xFunc, xStep, xFinal });
            }
            return result;
          };
        })();
        (function() {
          const AsyncFunction3 = Object.getPrototypeOf(async function() {
          }).constructor;
          let pAsyncFlags = 0;
          Module22["progress_handler"] = function(db2, nOps, xProgress, pApp) {
            if (pAsyncFlags) {
              Module22["deleteCallback"](pAsyncFlags);
              Module22["_sqlite3_free"](pAsyncFlags);
              pAsyncFlags = 0;
            }
            pAsyncFlags = Module22["_sqlite3_malloc"](4);
            setValue(pAsyncFlags, xProgress instanceof AsyncFunction3 ? 1 : 0, "i32");
            ccall("libprogress_progress_handler", "number", ["number", "number", "number", "number"], [db2, nOps, xProgress ? 1 : 0, pAsyncFlags]);
            if (xProgress) {
              Module22["setCallback"](pAsyncFlags, (_) => xProgress(pApp));
            }
          };
        })();
        (function() {
          const VFS_METHODS = ["xOpen", "xDelete", "xAccess", "xFullPathname", "xRandomness", "xSleep", "xCurrentTime", "xGetLastError", "xCurrentTimeInt64", "xClose", "xRead", "xWrite", "xTruncate", "xSync", "xFileSize", "xLock", "xUnlock", "xCheckReservedLock", "xFileControl", "xSectorSize", "xDeviceCharacteristics", "xShmMap", "xShmLock", "xShmBarrier", "xShmUnmap"];
          const mapVFSNameToKey = /* @__PURE__ */ new Map();
          Module22["vfs_register"] = function(vfs, makeDefault) {
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
            const vfsReturn = Module22["_sqlite3_malloc"](4);
            try {
              const result = ccall("libvfs_vfs_register", "number", ["string", "number", "number", "number", "number", "number"], [vfs.name, vfs.mxPathname, methodMask, asyncMask, makeDefault ? 1 : 0, vfsReturn]);
              if (!result) {
                if (mapVFSNameToKey.has(vfs.name)) {
                  const oldKey = mapVFSNameToKey.get(vfs.name);
                  Module22["deleteCallback"](oldKey);
                }
                const key = getValue(vfsReturn, "*");
                mapVFSNameToKey.set(vfs.name, key);
                Module22["setCallback"](key, vfs);
              }
              return result;
            } finally {
              Module22["_sqlite3_free"](vfsReturn);
            }
          };
        })();
        return moduleArg.ready;
      };
    })();
    wa_sqlite_async_default = Module2;
    SHARED = { mode: "shared" };
    POLL_SHARED = { ifAvailable: true, mode: "shared" };
    POLL_EXCLUSIVE = { ifAvailable: true, mode: "exclusive" };
    POLICIES = ["exclusive", "shared", "shared+hint"];
    WebLocksMixin = (superclass) => {
      var _options, _mapIdToState, _instances, lockExclusive_fn, unlockExclusive_fn, checkReservedExclusive_fn, lockShared_fn, unlockShared_fn, checkReservedShared_fn, acquire_fn, _a2;
      return _a2 = class extends superclass {
        constructor(name, module, options) {
          super(name, module, options);
          __privateAdd(this, _instances);
          __privateAdd(this, _options, {
            lockPolicy: "exclusive",
            lockTimeout: Infinity
          });
          /** @type {Map<number, LockState>} */
          __privateAdd(this, _mapIdToState, /* @__PURE__ */ new Map());
          Object.assign(__privateGet(this, _options), options);
          if (POLICIES.indexOf(__privateGet(this, _options).lockPolicy) === -1) {
            throw new Error(`WebLocksMixin: invalid lock mode: ${options.lockPolicy}`);
          }
        }
        /**
         * @param {number} fileId 
         * @param {number} lockType 
         * @returns {Promise<number>}
         */
        async jLock(fileId, lockType) {
          try {
            if (!__privateGet(this, _mapIdToState).has(fileId)) {
              const name = this.getFilename(fileId);
              const state = {
                baseName: name,
                type: SQLITE_LOCK_NONE,
                writeHint: false
              };
              __privateGet(this, _mapIdToState).set(fileId, state);
            }
            const lockState = __privateGet(this, _mapIdToState).get(fileId);
            if (lockType <= lockState.type) return SQLITE_OK;
            switch (__privateGet(this, _options).lockPolicy) {
              case "exclusive":
                return await __privateMethod(this, _instances, lockExclusive_fn).call(this, lockState, lockType);
              case "shared":
              case "shared+hint":
                return await __privateMethod(this, _instances, lockShared_fn).call(this, lockState, lockType);
            }
          } catch (e) {
            console.error("WebLocksMixin: lock error", e);
            return SQLITE_IOERR_LOCK;
          }
        }
        /**
         * @param {number} fileId 
         * @param {number} lockType 
         * @returns {Promise<number>}
         */
        async jUnlock(fileId, lockType) {
          try {
            const lockState = __privateGet(this, _mapIdToState).get(fileId);
            if (lockType >= lockState.type) return SQLITE_OK;
            switch (__privateGet(this, _options).lockPolicy) {
              case "exclusive":
                return await __privateMethod(this, _instances, unlockExclusive_fn).call(this, lockState, lockType);
              case "shared":
              case "shared+hint":
                return await __privateMethod(this, _instances, unlockShared_fn).call(this, lockState, lockType);
            }
          } catch (e) {
            console.error("WebLocksMixin: unlock error", e);
            return SQLITE_IOERR_UNLOCK;
          }
        }
        /**
         * @param {number} fileId 
         * @param {DataView} pResOut 
         * @returns {Promise<number>}
         */
        async jCheckReservedLock(fileId, pResOut) {
          try {
            const lockState = __privateGet(this, _mapIdToState).get(fileId);
            switch (__privateGet(this, _options).lockPolicy) {
              case "exclusive":
                return __privateMethod(this, _instances, checkReservedExclusive_fn).call(this, lockState, pResOut);
              case "shared":
              case "shared+hint":
                return await __privateMethod(this, _instances, checkReservedShared_fn).call(this, lockState, pResOut);
            }
          } catch (e) {
            console.error("WebLocksMixin: check reserved lock error", e);
            return SQLITE_IOERR_CHECKRESERVEDLOCK;
          }
          pResOut.setInt32(0, 0, true);
          return SQLITE_OK;
        }
        /**
         * @param {number} pFile
         * @param {number} op
         * @param {DataView} pArg
         * @returns {number|Promise<number>}
         */
        jFileControl(pFile, op, pArg) {
          const lockState = __privateGet(this, _mapIdToState).get(pFile) ?? (() => {
            this.jLock(pFile, SQLITE_LOCK_NONE);
            return __privateGet(this, _mapIdToState).get(pFile);
          })();
          if (op === WebLocksMixin.WRITE_HINT_OP_CODE && __privateGet(this, _options).lockPolicy === "shared+hint") {
            lockState.writeHint = true;
          }
          return SQLITE_NOTFOUND;
        }
      }, _options = new WeakMap(), _mapIdToState = new WeakMap(), _instances = new WeakSet(), lockExclusive_fn = async function(lockState, lockType) {
        if (!lockState.access) {
          if (!await __privateMethod(this, _instances, acquire_fn).call(this, lockState, "access")) {
            return SQLITE_BUSY;
          }
          console.assert(!!lockState.access);
        }
        lockState.type = lockType;
        return SQLITE_OK;
      }, /**
       * @param {LockState} lockState 
       * @param {number} lockType 
       * @returns {number}
       */
      unlockExclusive_fn = function(lockState, lockType) {
        if (lockType === SQLITE_LOCK_NONE) {
          lockState.access?.();
          console.assert(!lockState.access);
        }
        lockState.type = lockType;
        return SQLITE_OK;
      }, /**
       * @param {LockState} lockState 
       * @param {DataView} pResOut 
       * @returns {number}
       */
      checkReservedExclusive_fn = function(lockState, pResOut) {
        pResOut.setInt32(0, 0, true);
        return SQLITE_OK;
      }, lockShared_fn = async function(lockState, lockType) {
        switch (lockState.type) {
          case SQLITE_LOCK_NONE:
            switch (lockType) {
              case SQLITE_LOCK_SHARED:
                if (lockState.writeHint) {
                  if (!await __privateMethod(this, _instances, acquire_fn).call(this, lockState, "hint")) {
                    return SQLITE_BUSY;
                  }
                }
                if (!await __privateMethod(this, _instances, acquire_fn).call(this, lockState, "gate", SHARED)) {
                  lockState.hint?.();
                  return SQLITE_BUSY;
                }
                await __privateMethod(this, _instances, acquire_fn).call(this, lockState, "access", SHARED);
                lockState.gate();
                console.assert(!lockState.gate);
                console.assert(!!lockState.access);
                console.assert(!lockState.reserved);
                break;
              default:
                throw new Error("unsupported lock transition");
            }
            break;
          case SQLITE_LOCK_SHARED:
            switch (lockType) {
              case SQLITE_LOCK_RESERVED:
                if (__privateGet(this, _options).lockPolicy === "shared+hint") {
                  if (!lockState.hint && !await __privateMethod(this, _instances, acquire_fn).call(this, lockState, "hint", POLL_EXCLUSIVE)) {
                    return SQLITE_BUSY;
                  }
                }
                if (!await __privateMethod(this, _instances, acquire_fn).call(this, lockState, "reserved", POLL_EXCLUSIVE)) {
                  lockState.hint?.();
                  return SQLITE_BUSY;
                }
                lockState.access();
                console.assert(!lockState.gate);
                console.assert(!lockState.access);
                console.assert(!!lockState.reserved);
                break;
              case SQLITE_LOCK_EXCLUSIVE:
                if (!await __privateMethod(this, _instances, acquire_fn).call(this, lockState, "gate")) {
                  return SQLITE_BUSY;
                }
                lockState.access();
                if (!await __privateMethod(this, _instances, acquire_fn).call(this, lockState, "access")) {
                  lockState.gate();
                  return SQLITE_BUSY;
                }
                console.assert(!!lockState.gate);
                console.assert(!!lockState.access);
                console.assert(!lockState.reserved);
                break;
              default:
                throw new Error("unsupported lock transition");
            }
            break;
          case SQLITE_LOCK_RESERVED:
            switch (lockType) {
              case SQLITE_LOCK_EXCLUSIVE:
                if (!await __privateMethod(this, _instances, acquire_fn).call(this, lockState, "gate")) {
                  return SQLITE_BUSY;
                }
                if (!await __privateMethod(this, _instances, acquire_fn).call(this, lockState, "access")) {
                  lockState.gate();
                  return SQLITE_BUSY;
                }
                console.assert(!!lockState.gate);
                console.assert(!!lockState.access);
                console.assert(!!lockState.reserved);
                break;
              default:
                throw new Error("unsupported lock transition");
            }
            break;
        }
        lockState.type = lockType;
        return SQLITE_OK;
      }, unlockShared_fn = async function(lockState, lockType) {
        if (lockType === SQLITE_LOCK_NONE) {
          lockState.access?.();
          lockState.gate?.();
          lockState.reserved?.();
          lockState.hint?.();
          lockState.writeHint = false;
          console.assert(!lockState.access);
          console.assert(!lockState.gate);
          console.assert(!lockState.reserved);
          console.assert(!lockState.hint);
        } else {
          switch (lockState.type) {
            case SQLITE_LOCK_EXCLUSIVE:
              lockState.access();
              await __privateMethod(this, _instances, acquire_fn).call(this, lockState, "access", SHARED);
              lockState.gate();
              lockState.reserved?.();
              lockState.hint?.();
              console.assert(!!lockState.access);
              console.assert(!lockState.gate);
              console.assert(!lockState.reserved);
              break;
            case SQLITE_LOCK_RESERVED:
              await __privateMethod(this, _instances, acquire_fn).call(this, lockState, "access", SHARED);
              lockState.reserved();
              lockState.hint?.();
              console.assert(!!lockState.access);
              console.assert(!lockState.gate);
              console.assert(!lockState.reserved);
              break;
          }
        }
        lockState.type = lockType;
        return SQLITE_OK;
      }, checkReservedShared_fn = async function(lockState, pResOut) {
        if (await __privateMethod(this, _instances, acquire_fn).call(this, lockState, "reserved", POLL_SHARED)) {
          lockState.reserved();
          pResOut.setInt32(0, 0, true);
        } else {
          pResOut.setInt32(0, 1, true);
        }
        return SQLITE_OK;
      }, /**
       * @param {LockState} lockState 
       * @param {'gate'|'access'|'reserved'|'hint'} name
       * @param {LockOptions} options 
       * @returns {Promise<boolean>}
       */
      acquire_fn = function(lockState, name, options = {}) {
        console.assert(!lockState[name]);
        return new Promise((resolve) => {
          if (!options.ifAvailable && __privateGet(this, _options).lockTimeout < Infinity) {
            const controller = new AbortController();
            options = Object.assign({}, options, { signal: controller.signal });
            setTimeout(() => {
              controller.abort();
              resolve?.(false);
            }, __privateGet(this, _options).lockTimeout);
          }
          const lockName = `lock##${lockState.baseName}##${name}`;
          navigator.locks.request(lockName, options, (lock) => {
            if (lock) {
              return new Promise((release) => {
                lockState[name] = () => {
                  release();
                  lockState[name] = null;
                };
                resolve(true);
                resolve = null;
              });
            } else {
              lockState[name] = null;
              resolve(false);
              resolve = null;
            }
          }).catch((e) => {
            if (e.name !== "AbortError") throw e;
          });
        });
      }, _a2;
    };
    WebLocksMixin.WRITE_HINT_OP_CODE = -9999;
    File2 = class {
      constructor(path, flags, metadata) {
        /** @type {string} */
        __publicField(this, "path");
        /** @type {number} */
        __publicField(this, "flags");
        /** @type {Metadata} */
        __publicField(this, "metadata");
        /** @type {number} */
        __publicField(this, "fileSize", 0);
        /** @type {boolean} */
        __publicField(this, "needsMetadataSync", false);
        /** @type {Metadata} */
        __publicField(this, "rollback", null);
        /** @type {Set<number>} */
        __publicField(this, "changedPages", /* @__PURE__ */ new Set());
        /** @type {string} */
        __publicField(this, "synchronous", "full");
        /** @type {IDBTransactionOptions} */
        __publicField(this, "txOptions", { durability: "strict" });
        this.path = path;
        this.flags = flags;
        this.metadata = metadata;
      }
    };
    IDBBatchAtomicVFS = (_a = class extends WebLocksMixin(FacadeVFS) {
      constructor(name, module, options = {}) {
        super(name, module, options);
        __privateAdd(this, __IDBBatchAtomicVFS_instances);
        /** @type {Map<number, File>} */
        __publicField(this, "mapIdToFile", /* @__PURE__ */ new Map());
        __publicField(this, "lastError", null);
        __publicField(this, "log", null);
        // console.log
        /** @type {Promise} */
        __privateAdd(this, _isReady);
        /** @type {IDBContext} */
        __privateAdd(this, _idb);
        __privateSet(this, _isReady, __privateMethod(this, __IDBBatchAtomicVFS_instances, initialize_fn).call(this, options.idbName ?? name));
      }
      static async create(name, module, options) {
        const vfs = new _a(name, module, options);
        await vfs.isReady();
        return vfs;
      }
      close() {
        __privateGet(this, _idb).close();
      }
      async isReady() {
        await super.isReady();
        await __privateGet(this, _isReady);
      }
      getFilename(fileId) {
        const pathname = this.mapIdToFile.get(fileId).path;
        return `IDB(${this.name}):${pathname}`;
      }
      /**
       * @param {string?} zName 
       * @param {number} fileId 
       * @param {number} flags 
       * @param {DataView} pOutFlags 
       * @returns {Promise<number>}
       */
      async jOpen(zName, fileId, flags, pOutFlags) {
        try {
          const url = new URL(zName || Math.random().toString(36).slice(2), "file://");
          const path = url.pathname;
          let meta = await __privateGet(this, _idb).q(({ metadata }) => metadata.get(path));
          if (!meta && flags & SQLITE_OPEN_CREATE) {
            meta = {
              name: path,
              fileSize: 0,
              version: 0
            };
            await __privateGet(this, _idb).q(({ metadata }) => metadata.put(meta), "rw");
          }
          if (!meta) {
            throw new Error(`File ${path} not found`);
          }
          const file = new File2(path, flags, meta);
          this.mapIdToFile.set(fileId, file);
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
       * @returns {Promise<number>}
       */
      async jDelete(zName, syncDir) {
        try {
          const url = new URL(zName, "file://");
          const path = url.pathname;
          __privateGet(this, _idb).q(({ metadata, blocks }) => {
            const range = IDBKeyRange.bound([path, -Infinity], [path, Infinity]);
            blocks.delete(range);
            metadata.delete(path);
          }, "rw");
          if (syncDir) {
            await __privateGet(this, _idb).sync(false);
          }
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
       * @returns {Promise<number>}
       */
      async jAccess(zName, flags, pResOut) {
        try {
          const url = new URL(zName, "file://");
          const path = url.pathname;
          const meta = await __privateGet(this, _idb).q(({ metadata }) => metadata.get(path));
          pResOut.setInt32(0, meta ? 1 : 0, true);
          return SQLITE_OK;
        } catch (e) {
          this.lastError = e;
          return SQLITE_IOERR_ACCESS;
        }
      }
      /**
       * @param {number} fileId 
       * @returns {Promise<number>}
       */
      async jClose(fileId) {
        try {
          const file = this.mapIdToFile.get(fileId);
          this.mapIdToFile.delete(fileId);
          if (file.flags & SQLITE_OPEN_DELETEONCLOSE) {
            await __privateGet(this, _idb).q(({ metadata, blocks }) => {
              metadata.delete(file.path);
              blocks.delete(IDBKeyRange.bound([file.path, 0], [file.path, Infinity]));
            }, "rw");
          }
          if (file.needsMetadataSync) {
            __privateGet(this, _idb).q(({ metadata }) => metadata.put(file.metadata), "rw");
          }
          await __privateGet(this, _idb).sync(file.synchronous === "full");
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
       * @returns {Promise<number>}
       */
      async jRead(fileId, pData, iOffset) {
        try {
          const file = this.mapIdToFile.get(fileId);
          let pDataOffset = 0;
          while (pDataOffset < pData.byteLength) {
            const fileOffset = iOffset + pDataOffset;
            const block = await __privateGet(this, _idb).q(({ blocks }) => {
              const range = IDBKeyRange.bound([file.path, -fileOffset], [file.path, Infinity]);
              return blocks.get(range);
            });
            if (!block || block.data.byteLength - block.offset <= fileOffset) {
              pData.fill(0, pDataOffset);
              return SQLITE_IOERR_SHORT_READ;
            }
            const dst = pData.subarray(pDataOffset);
            const srcOffset = fileOffset + block.offset;
            const nBytesToCopy = Math.min(
              Math.max(block.data.byteLength - srcOffset, 0),
              dst.byteLength
            );
            dst.set(block.data.subarray(srcOffset, srcOffset + nBytesToCopy));
            pDataOffset += nBytesToCopy;
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
          if (file.flags & SQLITE_OPEN_MAIN_DB) {
            if (!file.rollback) {
              const pending = Object.assign(
                { pendingVersion: file.metadata.version - 1 },
                file.metadata
              );
              __privateGet(this, _idb).q(({ metadata }) => metadata.put(pending), "rw", file.txOptions);
              file.rollback = Object.assign({}, file.metadata);
              file.metadata.version--;
            }
          }
          if (file.flags & SQLITE_OPEN_MAIN_DB) {
            file.changedPages.add(iOffset);
          }
          const data = pData.slice();
          const version = file.metadata.version;
          const isOverwrite = iOffset < file.metadata.fileSize;
          if (!isOverwrite || file.flags & SQLITE_OPEN_MAIN_DB || file.flags & SQLITE_OPEN_TEMP_DB) {
            const block = {
              path: file.path,
              offset: -iOffset,
              version,
              data: pData.slice()
            };
            __privateGet(this, _idb).q(({ blocks }) => {
              blocks.put(block);
              file.changedPages.add(iOffset);
            }, "rw", file.txOptions);
          } else {
            __privateGet(this, _idb).q(async ({ blocks }) => {
              const range = IDBKeyRange.bound(
                [file.path, -iOffset],
                [file.path, Infinity]
              );
              const block = await blocks.get(range);
              block.data.subarray(iOffset + block.offset).set(data);
              blocks.put(block);
            }, "rw", file.txOptions);
          }
          if (file.metadata.fileSize < iOffset + pData.length) {
            file.metadata.fileSize = iOffset + pData.length;
            file.needsMetadataSync = true;
          }
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
          if (iSize < file.metadata.fileSize) {
            __privateGet(this, _idb).q(({ blocks }) => {
              const range = IDBKeyRange.bound(
                [file.path, -Infinity],
                [file.path, -iSize, Infinity]
              );
              blocks.delete(range);
            }, "rw", file.txOptions);
            file.metadata.fileSize = iSize;
            file.needsMetadataSync = true;
          }
          return SQLITE_OK;
        } catch (e) {
          this.lastError = e;
          return SQLITE_IOERR_TRUNCATE;
        }
      }
      /**
       * @param {number} fileId 
       * @param {number} flags 
       * @returns {Promise<number>}
       */
      async jSync(fileId, flags) {
        try {
          const file = this.mapIdToFile.get(fileId);
          if (file.needsMetadataSync) {
            __privateGet(this, _idb).q(({ metadata }) => metadata.put(file.metadata), "rw", file.txOptions);
            file.needsMetadataSync = false;
          }
          if (file.flags & SQLITE_OPEN_MAIN_DB) {
            if (file.synchronous === "full") {
              await __privateGet(this, _idb).sync(true);
            }
          } else {
            await __privateGet(this, _idb).sync(file.synchronous === "full");
          }
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
          pSize64.setBigInt64(0, BigInt(file.metadata.fileSize), true);
          return SQLITE_OK;
        } catch (e) {
          this.lastError = e;
          return SQLITE_IOERR_FSTAT;
        }
      }
      /**
       * @param {number} fileId 
       * @param {number} lockType 
       * @returns {Promise<number>}
       */
      async jLock(fileId, lockType) {
        const file = this.mapIdToFile.get(fileId);
        const result = await super.jLock(fileId, lockType);
        if (lockType === SQLITE_LOCK_SHARED) {
          file.metadata = await __privateGet(this, _idb).q(async ({ metadata, blocks }) => {
            const m = await metadata.get(file.path);
            if (m.pendingVersion) {
              console.warn(`removing failed transaction ${m.pendingVersion}`);
              await new Promise((resolve, reject) => {
                const range = IDBKeyRange.bound([m.name, -Infinity], [m.name, Infinity]);
                const request = blocks.openCursor(range);
                request.onsuccess = () => {
                  const cursor = request.result;
                  if (cursor) {
                    const block = cursor.value;
                    if (block.version < m.version) {
                      cursor.delete();
                    }
                    cursor.continue();
                  } else {
                    resolve();
                  }
                };
                request.onerror = () => reject(request.error);
              });
              delete m.pendingVersion;
              metadata.put(m);
            }
            return m;
          }, "rw", file.txOptions);
        }
        return result;
      }
      /**
       * @param {number} fileId 
       * @param {number} lockType 
       * @returns {Promise<number>}
       */
      async jUnlock(fileId, lockType) {
        if (lockType === SQLITE_LOCK_NONE) {
          const file = this.mapIdToFile.get(fileId);
          await __privateGet(this, _idb).sync(file.synchronous === "full");
        }
        return super.jUnlock(fileId, lockType);
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
              const key = extractString2(pArg, 4);
              const value = extractString2(pArg, 8);
              this.log?.("xFileControl", file.path, "PRAGMA", key, value);
              const setPragmaResponse = (response) => {
                const encoded = new TextEncoder().encode(response);
                const out = this._module._sqlite3_malloc(encoded.byteLength);
                const outArray = this._module.HEAPU8.subarray(out, out + encoded.byteLength);
                outArray.set(encoded);
                pArg.setUint32(0, out, true);
                return SQLITE_ERROR;
              };
              switch (key.toLowerCase()) {
                case "page_size":
                  if (file.flags & SQLITE_OPEN_MAIN_DB) {
                    if (value && file.metadata.fileSize) {
                      return SQLITE_ERROR;
                    }
                  }
                  break;
                case "synchronous":
                  if (value) {
                    switch (value.toLowerCase()) {
                      case "0":
                      case "off":
                        file.synchronous = "off";
                        file.txOptions = { durability: "relaxed" };
                        break;
                      case "1":
                      case "normal":
                        file.synchronous = "normal";
                        file.txOptions = { durability: "relaxed" };
                        break;
                      case "2":
                      case "3":
                      case "full":
                      case "extra":
                        file.synchronous = "full";
                        file.txOptions = { durability: "strict" };
                        break;
                    }
                  }
                  break;
                case "write_hint":
                  return super.jFileControl(fileId, WebLocksMixin.WRITE_HINT_OP_CODE, null);
              }
              break;
            case SQLITE_FCNTL_SYNC:
              this.log?.("xFileControl", file.path, "SYNC");
              const commitMetadata = Object.assign({}, file.metadata);
              const prevFileSize = file.rollback.fileSize;
              __privateGet(this, _idb).q(({ metadata, blocks }) => {
                metadata.put(commitMetadata);
                for (const offset of file.changedPages) {
                  if (offset < prevFileSize) {
                    const range = IDBKeyRange.bound(
                      [file.path, -offset, commitMetadata.version],
                      [file.path, -offset, Infinity],
                      true
                    );
                    blocks.delete(range);
                  }
                }
                file.changedPages.clear();
              }, "rw", file.txOptions);
              file.needsMetadataSync = false;
              file.rollback = null;
              break;
            case SQLITE_FCNTL_BEGIN_ATOMIC_WRITE:
              this.log?.("xFileControl", file.path, "BEGIN_ATOMIC_WRITE");
              return SQLITE_OK;
            case SQLITE_FCNTL_COMMIT_ATOMIC_WRITE:
              this.log?.("xFileControl", file.path, "COMMIT_ATOMIC_WRITE");
              return SQLITE_OK;
            case SQLITE_FCNTL_ROLLBACK_ATOMIC_WRITE:
              this.log?.("xFileControl", file.path, "ROLLBACK_ATOMIC_WRITE");
              file.metadata = file.rollback;
              const rollbackMetadata = Object.assign({}, file.metadata);
              __privateGet(this, _idb).q(({ metadata, blocks }) => {
                metadata.put(rollbackMetadata);
                for (const offset of file.changedPages) {
                  blocks.delete([file.path, -offset, rollbackMetadata.version - 1]);
                }
                file.changedPages.clear();
              }, "rw", file.txOptions);
              file.needsMetadataSync = false;
              file.rollback = null;
              return SQLITE_OK;
          }
        } catch (e) {
          this.lastError = e;
          return SQLITE_IOERR;
        }
        return super.jFileControl(fileId, op, pArg);
      }
      /**
       * @param {number} pFile
       * @returns {number|Promise<number>}
       */
      jDeviceCharacteristics(pFile) {
        return 0 | SQLITE_IOCAP_BATCH_ATOMIC | SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN;
      }
      /**
       * @param {Uint8Array} zBuf 
       * @returns {number|Promise<number>}
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
    }, _isReady = new WeakMap(), _idb = new WeakMap(), __IDBBatchAtomicVFS_instances = new WeakSet(), initialize_fn = async function(name) {
      __privateSet(this, _idb, await IDBContext.create(name));
    }, _a);
    IDBContext = (_b = class {
      constructor(database) {
        __privateAdd(this, __IDBContext_instances);
        /** @type {IDBDatabase} */
        __privateAdd(this, _database);
        /** @type {Promise} */
        __privateAdd(this, _chain, null);
        /** @type {Promise<any>} */
        __privateAdd(this, _txComplete, Promise.resolve());
        /** @type {IDBRequest?} */
        __privateAdd(this, _request, null);
        /** @type {WeakSet<IDBTransaction>} */
        __privateAdd(this, _txPending, /* @__PURE__ */ new WeakSet());
        __publicField(this, "log", null);
        __privateSet(this, _database, database);
      }
      static async create(name) {
        const database = await new Promise((resolve, reject) => {
          const request = indexedDB.open(name, 6);
          request.onupgradeneeded = async (event) => {
            const db2 = request.result;
            if (event.oldVersion) {
              console.log(`Upgrading IndexedDB from version ${event.oldVersion}`);
            }
            switch (event.oldVersion) {
              case 0:
                db2.createObjectStore("blocks", { keyPath: ["path", "offset", "version"] }).createIndex("version", ["path", "version"]);
              case 5:
                const tx = request.transaction;
                const blocks = tx.objectStore("blocks");
                blocks.deleteIndex("version");
                const metadata = db2.createObjectStore("metadata", { keyPath: "name" });
                await new Promise((resolve2, reject2) => {
                  let lastBlock = {};
                  const request2 = tx.objectStore("blocks").openCursor();
                  request2.onsuccess = () => {
                    const cursor = request2.result;
                    if (cursor) {
                      const block = cursor.value;
                      if (typeof block.offset !== "number" || block.path === lastBlock.path && block.offset === lastBlock.offset) {
                        cursor.delete();
                      } else if (block.offset === 0) {
                        metadata.put({
                          name: block.path,
                          fileSize: block.fileSize,
                          version: block.version
                        });
                        delete block.fileSize;
                        cursor.update(block);
                      }
                      lastBlock = block;
                      cursor.continue();
                    } else {
                      resolve2();
                    }
                  };
                  request2.onerror = () => reject2(request2.error);
                });
                break;
            }
          };
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
        return new _b(database);
      }
      close() {
        __privateGet(this, _database).close();
      }
      /**
       * @param {(stores: Object.<string, IDBObjectStore>) => any} f 
       * @param {'ro'|'rw'} mode 
       * @returns {Promise<any>}
       */
      q(f, mode = "ro", options = {}) {
        const txMode = mode === "ro" ? "readonly" : "readwrite";
        const txOptions = Object.assign({
          /** @type {IDBTransactionDurability} */
          durability: "default"
        }, options);
        __privateSet(this, _chain, (__privateGet(this, _chain) || Promise.resolve()).then(() => __privateMethod(this, __IDBContext_instances, q_fn).call(this, f, txMode, txOptions)));
        return __privateGet(this, _chain);
      }
      /**
       * Object store methods that return an IDBRequest, except for cursor
       * creation, are wrapped to return a Promise. In addition, the
       * request is used internally for chaining.
       * @param {IDBObjectStore} objectStore 
       * @returns 
       */
      proxyStoreOrIndex(objectStore) {
        return new Proxy(objectStore, {
          get: (target, property, receiver) => {
            const result = Reflect.get(target, property, receiver);
            if (typeof result === "function") {
              return (...args) => {
                const maybeRequest = Reflect.apply(result, target, args);
                if (maybeRequest instanceof IDBRequest && !property.endsWith("Cursor")) {
                  __privateSet(this, _request, maybeRequest);
                  maybeRequest.addEventListener("error", () => {
                    console.error(maybeRequest.error);
                    maybeRequest.transaction.abort();
                  }, { once: true });
                  return wrap(maybeRequest);
                }
                return maybeRequest;
              };
            }
            return result;
          }
        });
      }
      /**
       * @param {boolean} durable 
       */
      async sync(durable) {
        if (__privateGet(this, _chain)) {
          await __privateGet(this, _chain);
          if (durable) {
            await __privateGet(this, _txComplete);
          }
          this.reset();
        }
      }
      reset() {
        __privateSet(this, _chain, null);
        __privateSet(this, _txComplete, Promise.resolve());
        __privateSet(this, _request, null);
      }
    }, _database = new WeakMap(), _chain = new WeakMap(), _txComplete = new WeakMap(), _request = new WeakMap(), _txPending = new WeakMap(), __IDBContext_instances = new WeakSet(), q_fn = async function(f, mode, options) {
      let tx;
      if (__privateGet(this, _request) && __privateGet(this, _txPending).has(__privateGet(this, _request).transaction) && __privateGet(this, _request).transaction.mode >= mode && __privateGet(this, _request).transaction.durability === options.durability) {
        tx = __privateGet(this, _request).transaction;
        if (__privateGet(this, _request).readyState === "pending") {
          await new Promise((resolve) => {
            __privateGet(this, _request).addEventListener("success", resolve, { once: true });
            __privateGet(this, _request).addEventListener("error", resolve, { once: true });
          });
        }
      }
      for (let i = 0; i < 2; ++i) {
        if (!tx) {
          await __privateGet(this, _txComplete);
          tx = __privateGet(this, _database).transaction(__privateGet(this, _database).objectStoreNames, mode, options);
          this.log?.("IDBTransaction open", mode);
          __privateGet(this, _txPending).add(tx);
          __privateSet(this, _txComplete, new Promise((resolve, reject) => {
            tx.addEventListener("complete", () => {
              this.log?.("IDBTransaction complete");
              __privateGet(this, _txPending).delete(tx);
              resolve();
            });
            tx.addEventListener("abort", () => {
              __privateGet(this, _txPending).delete(tx);
              reject(new Error("transaction aborted"));
            });
          }));
        }
        const objectStores = [...tx.objectStoreNames].map((name) => {
          return [name, this.proxyStoreOrIndex(tx.objectStore(name))];
        });
        try {
          return await f(Object.fromEntries(objectStores));
        } catch (e) {
          if (!i && e.name === "TransactionInactiveError") {
            this.log?.("TransactionInactiveError, retrying");
            tx = null;
            continue;
          }
          throw e;
        }
      }
    }, _b);
  }
});
init_chunk_XYF4QS23();
init_chunk_QFCKR22C();
var MAX_INT64 = 0x7fffffffffffffffn;
var MIN_INT64 = -0x8000000000000000n;
var AsyncFunction2 = Object.getPrototypeOf(async function() {
}).constructor;
var SQLiteError = class extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
};
var async = true;
function Factory(Module3) {
  const sqlite3 = {};
  Module3.retryOps = [];
  const sqliteFreeAddress = Module3._getSqliteFree();
  const tmp = Module3._malloc(8);
  const tmpPtr = [tmp, tmp + 4];
  function createUTF8(s) {
    if (typeof s !== "string") return 0;
    const utf8 = new TextEncoder().encode(s);
    const zts = Module3._sqlite3_malloc(utf8.byteLength + 1);
    Module3.HEAPU8.set(utf8, zts);
    Module3.HEAPU8[zts + utf8.byteLength] = 0;
    return zts;
  }
  function cvt32x2ToBigInt(lo32, hi32) {
    return BigInt(hi32) << 32n | BigInt(lo32) & 0xffffffffn;
  }
  const cvt32x2AsSafe = function() {
    const hiMax = BigInt(Number.MAX_SAFE_INTEGER) >> 32n;
    const hiMin = BigInt(Number.MIN_SAFE_INTEGER) >> 32n;
    return function(lo32, hi32) {
      if (hi32 > hiMax || hi32 < hiMin) {
        return cvt32x2ToBigInt(lo32, hi32);
      } else {
        return hi32 * 4294967296 + (lo32 & 2147483647) - (lo32 & 2147483648);
      }
    };
  }();
  const databases = /* @__PURE__ */ new Set();
  function verifyDatabase(db2) {
    if (!databases.has(db2)) {
      throw new SQLiteError("not a database", SQLITE_MISUSE);
    }
  }
  const mapStmtToDB = /* @__PURE__ */ new Map();
  function verifyStatement(stmt) {
    if (!mapStmtToDB.has(stmt)) {
      throw new SQLiteError("not a statement", SQLITE_MISUSE);
    }
  }
  sqlite3.bind_collection = function(stmt, bindings) {
    verifyStatement(stmt);
    const isArray = Array.isArray(bindings);
    const nBindings = sqlite3.bind_parameter_count(stmt);
    for (let i = 1; i <= nBindings; ++i) {
      const key = isArray ? i - 1 : sqlite3.bind_parameter_name(stmt, i);
      const value = bindings[key];
      if (value !== void 0) {
        sqlite3.bind(stmt, i, value);
      }
    }
    return SQLITE_OK;
  };
  sqlite3.bind = function(stmt, i, value) {
    verifyStatement(stmt);
    switch (typeof value) {
      case "number":
        if (value === (value | 0)) {
          return sqlite3.bind_int(stmt, i, value);
        } else {
          return sqlite3.bind_double(stmt, i, value);
        }
      case "string":
        return sqlite3.bind_text(stmt, i, value);
      default:
        if (value instanceof Uint8Array || Array.isArray(value)) {
          return sqlite3.bind_blob(stmt, i, value);
        } else if (value === null) {
          return sqlite3.bind_null(stmt, i);
        } else if (typeof value === "bigint") {
          return sqlite3.bind_int64(stmt, i, value);
        } else if (value === void 0) {
          return SQLITE_NOTICE;
        } else {
          console.warn("unknown binding converted to null", value);
          return sqlite3.bind_null(stmt, i);
        }
    }
  };
  sqlite3.bind_blob = function() {
    const fname = "sqlite3_bind_blob";
    const f = Module3.cwrap(fname, ...decl("nnnnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const byteLength = value.byteLength ?? value.length;
      const ptr = Module3._sqlite3_malloc(byteLength);
      Module3.HEAPU8.subarray(ptr).set(value);
      const result = f(stmt, i, ptr, byteLength, sqliteFreeAddress);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_parameter_count = function() {
    const fname = "sqlite3_bind_parameter_count";
    const f = Module3.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.bind_double = function() {
    const fname = "sqlite3_bind_double";
    const f = Module3.cwrap(fname, ...decl("nnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const result = f(stmt, i, value);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_int = function() {
    const fname = "sqlite3_bind_int";
    const f = Module3.cwrap(fname, ...decl("nnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      if (value > 2147483647 || value < -2147483648) return SQLITE_RANGE;
      const result = f(stmt, i, value);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_int64 = function() {
    const fname = "sqlite3_bind_int64";
    const f = Module3.cwrap(fname, ...decl("nnnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      if (value > MAX_INT64 || value < MIN_INT64) return SQLITE_RANGE;
      const lo32 = value & 0xffffffffn;
      const hi32 = value >> 32n;
      const result = f(stmt, i, Number(lo32), Number(hi32));
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_null = function() {
    const fname = "sqlite3_bind_null";
    const f = Module3.cwrap(fname, ...decl("nn:n"));
    return function(stmt, i) {
      verifyStatement(stmt);
      const result = f(stmt, i);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_parameter_name = function() {
    const fname = "sqlite3_bind_parameter_name";
    const f = Module3.cwrap(fname, ...decl("n:s"));
    return function(stmt, i) {
      verifyStatement(stmt);
      const result = f(stmt, i);
      return result;
    };
  }();
  sqlite3.bind_text = function() {
    const fname = "sqlite3_bind_text";
    const f = Module3.cwrap(fname, ...decl("nnnnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const ptr = createUTF8(value);
      const result = f(stmt, i, ptr, -1, sqliteFreeAddress);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.changes = function() {
    const fname = "sqlite3_changes";
    const f = Module3.cwrap(fname, ...decl("n:n"));
    return function(db2) {
      verifyDatabase(db2);
      const result = f(db2);
      return result;
    };
  }();
  sqlite3.close = function() {
    const fname = "sqlite3_close";
    const f = Module3.cwrap(fname, ...decl("n:n"), { async });
    return async function(db2) {
      verifyDatabase(db2);
      const result = await f(db2);
      databases.delete(db2);
      return check(fname, result, db2);
    };
  }();
  sqlite3.column = function(stmt, iCol) {
    verifyStatement(stmt);
    const type = sqlite3.column_type(stmt, iCol);
    switch (type) {
      case SQLITE_BLOB:
        return sqlite3.column_blob(stmt, iCol);
      case SQLITE_FLOAT:
        return sqlite3.column_double(stmt, iCol);
      case SQLITE_INTEGER:
        const lo32 = sqlite3.column_int(stmt, iCol);
        const hi32 = Module3.getTempRet0();
        return cvt32x2AsSafe(lo32, hi32);
      case SQLITE_NULL:
        return null;
      case SQLITE_TEXT:
        return sqlite3.column_text(stmt, iCol);
      default:
        throw new SQLiteError("unknown type", type);
    }
  };
  sqlite3.column_blob = function() {
    const fname = "sqlite3_column_blob";
    const f = Module3.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const nBytes = sqlite3.column_bytes(stmt, iCol);
      const address = f(stmt, iCol);
      const result = Module3.HEAPU8.subarray(address, address + nBytes);
      return result;
    };
  }();
  sqlite3.column_bytes = function() {
    const fname = "sqlite3_column_bytes";
    const f = Module3.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_count = function() {
    const fname = "sqlite3_column_count";
    const f = Module3.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.column_double = function() {
    const fname = "sqlite3_column_double";
    const f = Module3.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_int = function() {
    const fname = "sqlite3_column_int64";
    const f = Module3.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_int64 = function() {
    const fname = "sqlite3_column_int64";
    const f = Module3.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const lo32 = f(stmt, iCol);
      const hi32 = Module3.getTempRet0();
      const result = cvt32x2ToBigInt(lo32, hi32);
      return result;
    };
  }();
  sqlite3.column_name = function() {
    const fname = "sqlite3_column_name";
    const f = Module3.cwrap(fname, ...decl("nn:s"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_names = function(stmt) {
    const columns = [];
    const nColumns = sqlite3.column_count(stmt);
    for (let i = 0; i < nColumns; ++i) {
      columns.push(sqlite3.column_name(stmt, i));
    }
    return columns;
  };
  sqlite3.column_text = function() {
    const fname = "sqlite3_column_text";
    const f = Module3.cwrap(fname, ...decl("nn:s"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_type = function() {
    const fname = "sqlite3_column_type";
    const f = Module3.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.create_function = function(db2, zFunctionName, nArg, eTextRep, pApp, xFunc, xStep, xFinal) {
    verifyDatabase(db2);
    function adapt(f) {
      return f instanceof AsyncFunction2 ? async (ctx, n, values) => f(ctx, Module3.HEAP32.subarray(values / 4, values / 4 + n)) : (ctx, n, values) => f(ctx, Module3.HEAP32.subarray(values / 4, values / 4 + n));
    }
    const result = Module3.create_function(
      db2,
      zFunctionName,
      nArg,
      eTextRep,
      pApp,
      xFunc && adapt(xFunc),
      xStep && adapt(xStep),
      xFinal
    );
    return check("sqlite3_create_function", result, db2);
  };
  sqlite3.data_count = function() {
    const fname = "sqlite3_data_count";
    const f = Module3.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.exec = async function(db2, sql, callback) {
    for await (const stmt of sqlite3.statements(db2, sql)) {
      let columns;
      while (await sqlite3.step(stmt) === SQLITE_ROW) {
        if (callback) {
          columns = columns ?? sqlite3.column_names(stmt);
          const row = sqlite3.row(stmt);
          await callback(row, columns);
        }
      }
    }
    return SQLITE_OK;
  };
  sqlite3.finalize = function() {
    const fname = "sqlite3_finalize";
    const f = Module3.cwrap(fname, ...decl("n:n"), { async });
    return async function(stmt) {
      const result = await f(stmt);
      mapStmtToDB.delete(stmt);
      return result;
    };
  }();
  sqlite3.get_autocommit = function() {
    const fname = "sqlite3_get_autocommit";
    const f = Module3.cwrap(fname, ...decl("n:n"));
    return function(db2) {
      const result = f(db2);
      return result;
    };
  }();
  sqlite3.libversion = function() {
    const fname = "sqlite3_libversion";
    const f = Module3.cwrap(fname, ...decl(":s"));
    return function() {
      const result = f();
      return result;
    };
  }();
  sqlite3.libversion_number = function() {
    const fname = "sqlite3_libversion_number";
    const f = Module3.cwrap(fname, ...decl(":n"));
    return function() {
      const result = f();
      return result;
    };
  }();
  sqlite3.limit = function() {
    const fname = "sqlite3_limit";
    const f = Module3.cwrap(fname, ...decl("nnn:n"));
    return function(db2, id, newVal) {
      const result = f(db2, id, newVal);
      return result;
    };
  }();
  sqlite3.open_v2 = function() {
    const fname = "sqlite3_open_v2";
    const f = Module3.cwrap(fname, ...decl("snnn:n"), { async });
    return async function(zFilename, flags, zVfs) {
      flags = flags || SQLITE_OPEN_CREATE | SQLITE_OPEN_READWRITE;
      zVfs = createUTF8(zVfs);
      try {
        const rc = await retry(() => f(zFilename, tmpPtr[0], flags, zVfs));
        const db2 = Module3.getValue(tmpPtr[0], "*");
        databases.add(db2);
        Module3.ccall("RegisterExtensionFunctions", "void", ["number"], [db2]);
        check(fname, rc);
        return db2;
      } finally {
        Module3._sqlite3_free(zVfs);
      }
    };
  }();
  sqlite3.progress_handler = function(db2, nProgressOps, handler, userData) {
    verifyDatabase(db2);
    Module3.progress_handler(db2, nProgressOps, handler, userData);
  };
  sqlite3.reset = function() {
    const fname = "sqlite3_reset";
    const f = Module3.cwrap(fname, ...decl("n:n"), { async });
    return async function(stmt) {
      verifyStatement(stmt);
      const result = await f(stmt);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.result = function(context, value) {
    switch (typeof value) {
      case "number":
        if (value === (value | 0)) {
          sqlite3.result_int(context, value);
        } else {
          sqlite3.result_double(context, value);
        }
        break;
      case "string":
        sqlite3.result_text(context, value);
        break;
      default:
        if (value instanceof Uint8Array || Array.isArray(value)) {
          sqlite3.result_blob(context, value);
        } else if (value === null) {
          sqlite3.result_null(context);
        } else if (typeof value === "bigint") {
          return sqlite3.result_int64(context, value);
        } else {
          console.warn("unknown result converted to null", value);
          sqlite3.result_null(context);
        }
        break;
    }
  };
  sqlite3.result_blob = function() {
    const fname = "sqlite3_result_blob";
    const f = Module3.cwrap(fname, ...decl("nnnn:n"));
    return function(context, value) {
      const byteLength = value.byteLength ?? value.length;
      const ptr = Module3._sqlite3_malloc(byteLength);
      Module3.HEAPU8.subarray(ptr).set(value);
      f(context, ptr, byteLength, sqliteFreeAddress);
    };
  }();
  sqlite3.result_double = function() {
    const fname = "sqlite3_result_double";
    const f = Module3.cwrap(fname, ...decl("nn:n"));
    return function(context, value) {
      f(context, value);
    };
  }();
  sqlite3.result_int = function() {
    const fname = "sqlite3_result_int";
    const f = Module3.cwrap(fname, ...decl("nn:n"));
    return function(context, value) {
      f(context, value);
    };
  }();
  sqlite3.result_int64 = function() {
    const fname = "sqlite3_result_int64";
    const f = Module3.cwrap(fname, ...decl("nnn:n"));
    return function(context, value) {
      if (value > MAX_INT64 || value < MIN_INT64) return SQLITE_RANGE;
      const lo32 = value & 0xffffffffn;
      const hi32 = value >> 32n;
      f(context, Number(lo32), Number(hi32));
    };
  }();
  sqlite3.result_null = function() {
    const fname = "sqlite3_result_null";
    const f = Module3.cwrap(fname, ...decl("n:n"));
    return function(context) {
      f(context);
    };
  }();
  sqlite3.result_text = function() {
    const fname = "sqlite3_result_text";
    const f = Module3.cwrap(fname, ...decl("nnnn:n"));
    return function(context, value) {
      const ptr = createUTF8(value);
      f(context, ptr, -1, sqliteFreeAddress);
    };
  }();
  sqlite3.row = function(stmt) {
    const row = [];
    const nColumns = sqlite3.data_count(stmt);
    for (let i = 0; i < nColumns; ++i) {
      const value = sqlite3.column(stmt, i);
      row.push(value?.buffer === Module3.HEAPU8.buffer ? value.slice() : value);
    }
    return row;
  };
  sqlite3.set_authorizer = function(db2, xAuth, pApp) {
    verifyDatabase(db2);
    function cvtArgs(_, iAction, p3, p4, p5, p6) {
      return [
        _,
        iAction,
        Module3.UTF8ToString(p3),
        Module3.UTF8ToString(p4),
        Module3.UTF8ToString(p5),
        Module3.UTF8ToString(p6)
      ];
    }
    function adapt(f) {
      return f instanceof AsyncFunction2 ? async (_, iAction, p3, p4, p5, p6) => f(cvtArgs(_, iAction, p3, p4, p5, p6)) : (_, iAction, p3, p4, p5, p6) => f(cvtArgs(_, iAction, p3, p4, p5, p6));
    }
    const result = Module3.set_authorizer(db2, adapt(xAuth), pApp);
    return check("sqlite3_set_authorizer", result, db2);
  };
  sqlite3.sql = function() {
    const fname = "sqlite3_sql";
    const f = Module3.cwrap(fname, ...decl("n:s"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.statements = function(db2, sql, options = {}) {
    const prepare = Module3.cwrap(
      "sqlite3_prepare_v3",
      "number",
      ["number", "number", "number", "number", "number", "number"],
      { async: true }
    );
    return async function* () {
      const onFinally = [];
      try {
        let maybeFinalize2 = function() {
          if (stmt && !options.unscoped) {
            sqlite3.finalize(stmt);
          }
          stmt = 0;
        };
        var maybeFinalize = maybeFinalize2;
        const utf8 = new TextEncoder().encode(sql);
        const allocSize = utf8.byteLength - utf8.byteLength % 4 + 12;
        const pzHead = Module3._sqlite3_malloc(allocSize);
        const pzEnd = pzHead + utf8.byteLength + 1;
        onFinally.push(() => Module3._sqlite3_free(pzHead));
        Module3.HEAPU8.set(utf8, pzHead);
        Module3.HEAPU8[pzEnd - 1] = 0;
        const pStmt = pzHead + allocSize - 8;
        const pzTail = pzHead + allocSize - 4;
        let stmt;
        onFinally.push(maybeFinalize2);
        Module3.setValue(pzTail, pzHead, "*");
        do {
          maybeFinalize2();
          const zTail = Module3.getValue(pzTail, "*");
          const rc = await retry(() => {
            return prepare(
              db2,
              zTail,
              pzEnd - pzTail,
              options.flags || 0,
              pStmt,
              pzTail
            );
          });
          if (rc !== SQLITE_OK) {
            check("sqlite3_prepare_v3", rc, db2);
          }
          stmt = Module3.getValue(pStmt, "*");
          if (stmt) {
            mapStmtToDB.set(stmt, db2);
            yield stmt;
          }
        } while (stmt);
      } finally {
        while (onFinally.length) {
          onFinally.pop()();
        }
      }
    }();
  };
  sqlite3.step = function() {
    const fname = "sqlite3_step";
    const f = Module3.cwrap(fname, ...decl("n:n"), { async });
    return async function(stmt) {
      verifyStatement(stmt);
      const rc = await retry(() => f(stmt));
      return check(fname, rc, mapStmtToDB.get(stmt), [SQLITE_ROW, SQLITE_DONE]);
    };
  }();
  sqlite3.value = function(pValue) {
    const type = sqlite3.value_type(pValue);
    switch (type) {
      case SQLITE_BLOB:
        return sqlite3.value_blob(pValue);
      case SQLITE_FLOAT:
        return sqlite3.value_double(pValue);
      case SQLITE_INTEGER:
        const lo32 = sqlite3.value_int(pValue);
        const hi32 = Module3.getTempRet0();
        return cvt32x2AsSafe(lo32, hi32);
      case SQLITE_NULL:
        return null;
      case SQLITE_TEXT:
        return sqlite3.value_text(pValue);
      default:
        throw new SQLiteError("unknown type", type);
    }
  };
  sqlite3.value_blob = function() {
    const fname = "sqlite3_value_blob";
    const f = Module3.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const nBytes = sqlite3.value_bytes(pValue);
      const address = f(pValue);
      const result = Module3.HEAPU8.subarray(address, address + nBytes);
      return result;
    };
  }();
  sqlite3.value_bytes = function() {
    const fname = "sqlite3_value_bytes";
    const f = Module3.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_double = function() {
    const fname = "sqlite3_value_double";
    const f = Module3.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_int = function() {
    const fname = "sqlite3_value_int64";
    const f = Module3.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_int64 = function() {
    const fname = "sqlite3_value_int64";
    const f = Module3.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const lo32 = f(pValue);
      const hi32 = Module3.getTempRet0();
      const result = cvt32x2ToBigInt(lo32, hi32);
      return result;
    };
  }();
  sqlite3.value_text = function() {
    const fname = "sqlite3_value_text";
    const f = Module3.cwrap(fname, ...decl("n:s"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_type = function() {
    const fname = "sqlite3_value_type";
    const f = Module3.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.vfs_register = function(vfs, makeDefault) {
    const result = Module3.vfs_register(vfs, makeDefault);
    return check("sqlite3_vfs_register", result);
  };
  function check(fname, result, db2 = null, allowed = [SQLITE_OK]) {
    if (allowed.includes(result)) return result;
    const message = db2 ? Module3.ccall("sqlite3_errmsg", "string", ["number"], [db2]) : fname;
    throw new SQLiteError(message, result);
  }
  async function retry(f) {
    let rc;
    do {
      if (Module3.retryOps.length) {
        await Promise.all(Module3.retryOps);
        Module3.retryOps = [];
      }
      rc = await f();
    } while (rc && Module3.retryOps.length);
    return rc;
  }
  return sqlite3;
}
function decl(s) {
  const result = [];
  const m = s.match(/([ns@]*):([nsv@])/);
  switch (m[2]) {
    case "n":
      result.push("number");
      break;
    case "s":
      result.push("string");
      break;
    case "v":
      result.push(null);
      break;
  }
  const args = [];
  for (let c of m[1]) {
    switch (c) {
      case "n":
        args.push("number");
        break;
      case "s":
        args.push("string");
        break;
    }
  }
  result.push(args);
  return result;
}
async function initSQLite(options) {
  const { path, sqliteModule, vfsFn, vfsOptions, readonly } = await options;
  const sqlite = Factory(sqliteModule);
  const vfs = await vfsFn(path, sqliteModule, vfsOptions);
  sqlite.vfs_register(vfs, true);
  const db2 = await sqlite.open_v2(
    path,
    readonly ? SQLITE_OPEN_READONLY : void 0
  );
  const close = async () => {
    await sqlite.close(db2);
  };
  const changes = () => {
    return sqlite.changes(db2);
  };
  const lastInsertRowId = async () => {
    return await new Promise((resolve) => sqlite.exec(
      db2,
      "SELECT last_insert_rowid()",
      ([id]) => resolve(id)
    ));
  };
  const stream2 = async (onData, sql, parameters) => {
    for await (const stmt of sqlite.statements(db2, sql)) {
      if (parameters?.length) {
        sqlite.bind_collection(stmt, parameters);
      }
      const cols = sqlite.column_names(stmt);
      while (await sqlite.step(stmt) === SQLITE_ROW) {
        const row = sqlite.row(stmt);
        onData(Object.fromEntries(cols.map((key, i) => [key, row[i]])));
      }
    }
  };
  const run = async (sql, parameters) => {
    const results = [];
    await stream2((data) => results.push(data), sql, parameters);
    return results;
  };
  return {
    changes,
    close,
    db: db2,
    lastInsertRowId,
    path,
    run,
    sqlite,
    stream: stream2,
    vfs
  };
}
var db;
async function init(fileName, url, useOPFS) {
  db = await initSQLite(
    (useOPFS ? (await Promise.resolve().then(() => (init_opfs(), opfs_exports))).useOpfsStorage : (await Promise.resolve().then(() => (init_idb(), idb_exports))).useIdbStorage)(
      fileName,
      { url }
    )
  );
}
async function exec(isSelect, sql, parameters) {
  const rows = await db.run(sql, parameters);
  return isSelect || rows.length ? { rows } : {
    rows,
    insertId: BigInt(await db.lastInsertRowId()),
    numAffectedRows: BigInt(db.changes())
  };
}
async function stream(onData, sql, parameters) {
  await db.stream(onData, sql, parameters);
}
onmessage = async ({ data: [msg, data1, data2, data3] }) => {
  const ret = [msg, null, null];
  try {
    switch (msg) {
      case 0:
        await init(data1, data2, data3);
        break;
      case 1:
        ret[1] = await exec(data1, data2, data3);
        break;
      case 2:
        await db.close();
        break;
      case 3:
        await stream((val) => postMessage([3, [val], null]), data1, data2);
        ret[0] = 4;
        break;
    }
  } catch (error) {
    ret[2] = error;
  }
  postMessage(ret);
};
