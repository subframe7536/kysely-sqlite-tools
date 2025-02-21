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
var _dynamicReference, _props, _props2, _props3, _props4, _props5, _props6, _props7, _props8, _props9, _queryId, _transformers, _schema, _schemableIds, _ctes, _WithSchemaTransformer_instances, isRootOperationNode_fn, collectSchemableIds_fn, collectCTEs_fn, collectSchemableIdsFromTableExpr_fn, collectSchemableId_fn, collectCTEIds_fn, _transformer, _promise, _resolve, _reject, _plugins, _QueryExecutorBase_instances, transformResult_fn, _props10, _props11, _WheneableMergeQueryBuilder_instances, whenMatched_fn, whenNotMatched_fn, _props12, _props13, _props14, _node, _expr, _alias, _node2, _node3, _props15, _queryBuilder, _alias2, _props16, _aggregateFunctionBuilder, _alias3, _props17, _props18, _props19, _props20, _node4, _JSONPathBuilder_instances, createBuilderWithPathLeg_fn, _node5, _jsonPath, _alias4, _node6, _node7, _column, _alterColumnNode, _props21, _props22, _props23, _props24, _node8, _props25, _props26, _props27, _props28, _props29, _props30, _props31, _props32, _transformer2, _props33, _props34, _props35, _props36, _executor, _driver, _compiler, _adapter, _connectionProvider, _driver2, _log, _initPromise, _initDone, _destroyPromise, _connections, _RuntimeDriver_instances, needsLogging_fn, addLogging_fn, logError_fn, logQuery_fn, calculateDurationMillis_fn, _connection, _runningPromise, _SingleConnectionProvider_instances, run_fn, _levels, _logger, _props37, _props38, _props39, _props40, _props41, _RawBuilderImpl_instances, getExecutor_fn, toOperationNode_fn, compile_fn, _rawBuilder, _alias5, _visitors, _sql, _parameters, _db, _SqliteIntrospector_instances, getTableMetadata_fn;
var sqlite3InitModule = (() => {
  var _scriptName = import.meta.url;
  return function(moduleArg = {}) {
    var moduleRtn;
    var Module = moduleArg;
    var readyPromiseResolve, readyPromiseReject;
    var readyPromise = new Promise((resolve, reject) => {
      readyPromiseResolve = resolve;
      readyPromiseReject = reject;
    });
    var ENVIRONMENT_IS_WEB = typeof window == "object";
    var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
    typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type != "renderer";
    const sqlite3InitModuleState = globalThis.sqlite3InitModuleState || Object.assign(/* @__PURE__ */ Object.create(null), {
      debugModule: () => {
      }
    });
    delete globalThis.sqlite3InitModuleState;
    sqlite3InitModuleState.debugModule(
      "globalThis.location =",
      globalThis.location
    );
    var moduleOverrides = Object.assign({}, Module);
    var thisProgram = "./this.program";
    var scriptDirectory = "";
    function locateFile(path) {
      if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory);
      }
      return scriptDirectory + path;
    }
    var readAsync, readBinary;
    if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href;
      } else if (typeof document != "undefined" && document.currentScript) {
        scriptDirectory = document.currentScript.src;
      }
      if (_scriptName) {
        scriptDirectory = _scriptName;
      }
      if (scriptDirectory.startsWith("blob:")) {
        scriptDirectory = "";
      } else {
        scriptDirectory = scriptDirectory.substr(
          0,
          scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1
        );
      }
      {
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = (url) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(xhr.response);
          };
        }
        readAsync = (url) => {
          return fetch(url, { credentials: "same-origin" }).then((response) => {
            if (response.ok) {
              return response.arrayBuffer();
            }
            return Promise.reject(
              new Error(response.status + " : " + response.url)
            );
          });
        };
      }
    }
    var out = Module["print"] || console.log.bind(console);
    var err = Module["printErr"] || console.error.bind(console);
    Object.assign(Module, moduleOverrides);
    moduleOverrides = null;
    if (Module["arguments"]) Module["arguments"];
    if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
    var wasmBinary = Module["wasmBinary"];
    var wasmMemory;
    var ABORT = false;
    var HEAP8, HEAPU8, HEAP16, HEAP32, HEAPU32, HEAP64;
    function updateMemoryViews() {
      var b = wasmMemory.buffer;
      Module["HEAP8"] = HEAP8 = new Int8Array(b);
      Module["HEAP16"] = HEAP16 = new Int16Array(b);
      Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
      Module["HEAPU16"] = new Uint16Array(b);
      Module["HEAP32"] = HEAP32 = new Int32Array(b);
      Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
      Module["HEAPF32"] = new Float32Array(b);
      Module["HEAPF64"] = new Float64Array(b);
      Module["HEAP64"] = HEAP64 = new BigInt64Array(b);
      Module["HEAPU64"] = new BigUint64Array(b);
    }
    if (Module["wasmMemory"]) {
      wasmMemory = Module["wasmMemory"];
    } else {
      var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
      wasmMemory = new WebAssembly.Memory({
        initial: INITIAL_MEMORY / 65536,
        maximum: 32768
      });
    }
    updateMemoryViews();
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATPOSTRUN__ = [];
    function preRun() {
      var preRuns = Module["preRun"];
      if (preRuns) {
        if (typeof preRuns == "function") preRuns = [preRuns];
        preRuns.forEach(addOnPreRun);
      }
      callRuntimeCallbacks(__ATPRERUN__);
    }
    function initRuntime() {
      if (!Module["noFSInit"] && !FS.initialized) FS.init();
      FS.ignorePermissions = false;
      callRuntimeCallbacks(__ATINIT__);
    }
    function postRun() {
      var postRuns = Module["postRun"];
      if (postRuns) {
        if (typeof postRuns == "function") postRuns = [postRuns];
        postRuns.forEach(addOnPostRun);
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
      Module["monitorRunDependencies"]?.(runDependencies);
    }
    function removeRunDependency(id) {
      runDependencies--;
      Module["monitorRunDependencies"]?.(runDependencies);
      if (runDependencies == 0) {
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }
    function abort(what) {
      Module["onAbort"]?.(what);
      what = "Aborted(" + what + ")";
      err(what);
      ABORT = true;
      what += ". Build with -sASSERTIONS for more info.";
      var e = new WebAssembly.RuntimeError(what);
      readyPromiseReject(e);
      throw e;
    }
    var dataURIPrefix = "data:application/octet-stream;base64,";
    var isDataURI = (filename) => filename.startsWith(dataURIPrefix);
    function findWasmBinary() {
      if (Module["locateFile"]) {
        var f = "sqlite3.wasm";
        if (!isDataURI(f)) {
          return locateFile(f);
        }
        return f;
      }
      return new URL("" + new URL("sqlite3-WT1HU0S9.wasm", import.meta.url).href, import.meta.url).href;
    }
    var wasmBinaryFile;
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
      if (!wasmBinary) {
        return readAsync(binaryFile).then(
          (response) => new Uint8Array(response),
          () => getBinarySync(binaryFile)
        );
      }
      return Promise.resolve().then(() => getBinarySync(binaryFile));
    }
    function instantiateArrayBuffer(binaryFile, imports, receiver) {
      return getBinaryPromise(binaryFile).then((binary) => {
        return WebAssembly.instantiate(binary, imports);
      }).then(receiver, (reason) => {
        err(`failed to asynchronously prepare wasm: ${reason}`);
        abort(reason);
      });
    }
    function instantiateAsync(binary, binaryFile, imports, callback) {
      if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && typeof fetch == "function") {
        return fetch(binaryFile, { credentials: "same-origin" }).then(
          (response) => {
            var result = WebAssembly.instantiateStreaming(response, imports);
            return result.then(callback, function(reason) {
              err(`wasm streaming compile failed: ${reason}`);
              err("falling back to ArrayBuffer instantiation");
              return instantiateArrayBuffer(binaryFile, imports, callback);
            });
          }
        );
      }
      return instantiateArrayBuffer(binaryFile, imports, callback);
    }
    function getWasmImports() {
      return {
        env: wasmImports,
        wasi_snapshot_preview1: wasmImports
      };
    }
    function createWasm() {
      var info = getWasmImports();
      function receiveInstance(instance, module) {
        wasmExports = instance.exports;
        addOnInit(wasmExports["__wasm_call_ctors"]);
        removeRunDependency();
        return wasmExports;
      }
      addRunDependency();
      function receiveInstantiationResult(result) {
        receiveInstance(result["instance"]);
      }
      if (Module["instantiateWasm"]) {
        try {
          return Module["instantiateWasm"](info, receiveInstance);
        } catch (e) {
          err(`Module.instantiateWasm callback failed with error: ${e}`);
          readyPromiseReject(e);
        }
      }
      wasmBinaryFile ?? (wasmBinaryFile = findWasmBinary());
      instantiateAsync(
        wasmBinary,
        wasmBinaryFile,
        info,
        receiveInstantiationResult
      ).catch(readyPromiseReject);
      return {};
    }
    var callRuntimeCallbacks = (callbacks) => {
      callbacks.forEach((f) => f(Module));
    };
    Module["noExitRuntime"] || true;
    var PATH = {
      isAbs: (path) => path.charAt(0) === "/",
      splitPath: (filename) => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
      normalizeArray: (parts, allowAboveRoot) => {
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
      },
      normalize: (path) => {
        var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
        path = PATH.normalizeArray(
          path.split("/").filter((p) => !!p),
          !isAbsolute
        ).join("/");
        if (!path && !isAbsolute) {
          path = ".";
        }
        if (path && trailingSlash) {
          path += "/";
        }
        return (isAbsolute ? "/" : "") + path;
      },
      dirname: (path) => {
        var result = PATH.splitPath(path), root = result[0], dir = result[1];
        if (!root && !dir) {
          return ".";
        }
        if (dir) {
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },
      basename: (path) => {
        if (path === "/") return "/";
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf("/");
        if (lastSlash === -1) return path;
        return path.substr(lastSlash + 1);
      },
      join: (...paths) => PATH.normalize(paths.join("/")),
      join2: (l, r) => PATH.normalize(l + "/" + r)
    };
    var initRandomFill = () => {
      if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
        return (view) => crypto.getRandomValues(view);
      } else abort("initRandomDevice");
    };
    var randomFill = (view) => {
      return (randomFill = initRandomFill())(view);
    };
    var PATH_FS = {
      resolve: (...args) => {
        var resolvedPath = "", resolvedAbsolute = false;
        for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = i >= 0 ? args[i] : FS.cwd();
          if (typeof path != "string") {
            throw new TypeError("Arguments to path.resolve must be strings");
          } else if (!path) {
            return "";
          }
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        resolvedPath = PATH.normalizeArray(
          resolvedPath.split("/").filter((p) => !!p),
          !resolvedAbsolute
        ).join("/");
        return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
      },
      relative: (from, to) => {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim2(arr) {
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
        var fromParts = trim2(from.split("/"));
        var toParts = trim2(to.split("/"));
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
      }
    };
    var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder() : void 0;
    var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
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
          str += String.fromCharCode(
            55296 | ch >> 10,
            56320 | ch & 1023
          );
        }
      }
      return str;
    };
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
      var len = lengthBytesUTF8(stringy) + 1;
      var u8array = new Array(len);
      var numBytesWritten = stringToUTF8Array(
        stringy,
        u8array,
        0,
        u8array.length
      );
      u8array.length = numBytesWritten;
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
        }
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result);
      }
      return FS_stdin_getChar_buffer.shift();
    };
    var TTY = {
      ttys: [],
      init() {
      },
      shutdown() {
      },
      register(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },
      stream_ops: {
        open(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },
        close(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
        fsync(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
        read(stream, buffer, offset, length, pos) {
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
        },
        write(stream, buffer, offset, length, pos) {
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
        }
      },
      default_tty_ops: {
        get_char(tty) {
          return FS_stdin_getChar();
        },
        put_char(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
        fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output));
            tty.output = [];
          }
        },
        ioctl_tcgets(tty) {
          return {
            c_iflag: 25856,
            c_oflag: 5,
            c_cflag: 191,
            c_lflag: 35387,
            c_cc: [
              3,
              28,
              127,
              21,
              4,
              0,
              1,
              0,
              17,
              19,
              26,
              0,
              18,
              15,
              23,
              22,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          };
        },
        ioctl_tcsets(tty, optional_actions, data) {
          return 0;
        },
        ioctl_tiocgwinsz(tty) {
          return [24, 80];
        }
      },
      default_tty1_ops: {
        put_char(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
        fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output));
            tty.output = [];
          }
        }
      }
    };
    var zeroMemory = (address, size) => {
      HEAPU8.fill(0, address, address + size);
    };
    var alignMemory = (size, alignment) => {
      return Math.ceil(size / alignment) * alignment;
    };
    var mmapAlloc = (size) => {
      size = alignMemory(size, 65536);
      var ptr = _emscripten_builtin_memalign(65536, size);
      if (ptr) zeroMemory(ptr, size);
      return ptr;
    };
    var MEMFS = {
      ops_table: null,
      mount(mount) {
        return MEMFS.createNode(null, "/", 16384 | 511, 0);
      },
      createNode(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          throw new FS.ErrnoError(63);
        }
        MEMFS.ops_table || (MEMFS.ops_table = {
          dir: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              lookup: MEMFS.node_ops.lookup,
              mknod: MEMFS.node_ops.mknod,
              rename: MEMFS.node_ops.rename,
              unlink: MEMFS.node_ops.unlink,
              rmdir: MEMFS.node_ops.rmdir,
              readdir: MEMFS.node_ops.readdir,
              symlink: MEMFS.node_ops.symlink
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek
            }
          },
          file: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek,
              read: MEMFS.stream_ops.read,
              write: MEMFS.stream_ops.write,
              allocate: MEMFS.stream_ops.allocate,
              mmap: MEMFS.stream_ops.mmap,
              msync: MEMFS.stream_ops.msync
            }
          },
          link: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              readlink: MEMFS.node_ops.readlink
            },
            stream: {}
          },
          chrdev: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: FS.chrdev_stream_ops
          }
        });
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
      },
      getFileDataAsTypedArray(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray)
          return node.contents.subarray(0, node.usedBytes);
        return new Uint8Array(node.contents);
      },
      expandFileStorage(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return;
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(
          newCapacity,
          prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0
        );
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity);
        if (node.usedBytes > 0)
          node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
      },
      resizeFileStorage(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null;
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize);
          if (oldContents) {
            node.contents.set(
              oldContents.subarray(0, Math.min(newSize, node.usedBytes))
            );
          }
          node.usedBytes = newSize;
        }
      },
      node_ops: {
        getattr(node) {
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
        },
        setattr(node, attr) {
          if (attr.mode !== void 0) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== void 0) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== void 0) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
        lookup(parent, name) {
          throw FS.genericErrors[44];
        },
        mknod(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
        rename(old_node, new_dir, new_name) {
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
        },
        unlink(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
        rmdir(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
        readdir(node) {
          var entries = [".", ".."];
          for (var key of Object.keys(node.contents)) {
            entries.push(key);
          }
          return entries;
        },
        symlink(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
          node.link = oldpath;
          return node;
        },
        readlink(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        }
      },
      stream_ops: {
        read(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          if (size > 8 && contents.subarray) {
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++)
              buffer[offset + i] = contents[position + i];
          }
          return size;
        },
        write(stream, buffer, offset, length, position, canOwn) {
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
              node.contents.set(
                buffer.subarray(offset, offset + length),
                position
              );
              return length;
            }
          }
          MEMFS.expandFileStorage(node, position + length);
          if (node.contents.subarray && buffer.subarray) {
            node.contents.set(
              buffer.subarray(offset, offset + length),
              position
            );
          } else {
            for (var i = 0; i < length; i++) {
              node.contents[position + i] = buffer[offset + i];
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
        llseek(stream, offset, whence) {
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
        },
        allocate(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(
            stream.node.usedBytes,
            offset + length
          );
        },
        mmap(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            if (contents) {
              if (position > 0 || position + length < contents.length) {
                if (contents.subarray) {
                  contents = contents.subarray(position, position + length);
                } else {
                  contents = Array.prototype.slice.call(
                    contents,
                    position,
                    position + length
                  );
                }
              }
              HEAP8.set(contents, ptr);
            }
          }
          return { ptr, allocated };
        },
        msync(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          return 0;
        }
      }
    };
    var asyncLoad = (url, onload, onerror, noRunDep) => {
      var dep = getUniqueRunDependency(`al ${url}`);
      readAsync(url).then(
        (arrayBuffer) => {
          onload(new Uint8Array(arrayBuffer));
          if (dep) removeRunDependency();
        },
        (err2) => {
          if (onerror) {
            onerror();
          } else {
            throw `Loading data file "${url}" failed.`;
          }
        }
      );
      if (dep) addRunDependency();
    };
    var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
      FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
    };
    var preloadPlugins = Module["preloadPlugins"] || [];
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
          preFinish?.();
          if (!dontCreateFile) {
            FS_createDataFile(
              parent,
              name,
              byteArray2,
              canRead,
              canWrite,
              canOwn
            );
          }
          onload?.();
          removeRunDependency();
        }
        if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
          onerror?.();
          removeRunDependency();
        })) {
          return;
        }
        finish(byteArray);
      }
      addRunDependency();
      if (typeof url == "string") {
        asyncLoad(url, processData, onerror);
      } else {
        processData(url);
      }
    };
    var FS_modeStringToFlags = (str) => {
      var flagModes = {
        r: 0,
        "r+": 2,
        w: 512 | 64 | 1,
        "w+": 512 | 64 | 2,
        a: 1024 | 64 | 1,
        "a+": 1024 | 64 | 2
      };
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
    var FS = {
      root: null,
      mounts: [],
      devices: {},
      streams: [],
      nextInode: 1,
      nameTable: null,
      currentPath: "/",
      initialized: false,
      ignorePermissions: true,
      ErrnoError: class {
        constructor(errno) {
          this.name = "ErrnoError";
          this.errno = errno;
        }
      },
      genericErrors: {},
      filesystems: null,
      syncFSRequests: 0,
      readFiles: {},
      FSStream: class {
        constructor() {
          this.shared = {};
        }
        get object() {
          return this.node;
        }
        set object(val) {
          this.node = val;
        }
        get isRead() {
          return (this.flags & 2097155) !== 1;
        }
        get isWrite() {
          return (this.flags & 2097155) !== 0;
        }
        get isAppend() {
          return this.flags & 1024;
        }
        get flags() {
          return this.shared.flags;
        }
        set flags(val) {
          this.shared.flags = val;
        }
        get position() {
          return this.shared.position;
        }
        set position(val) {
          this.shared.position = val;
        }
      },
      FSNode: class {
        constructor(parent, name, mode, rdev) {
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
          this.readMode = 292 | 73;
          this.writeMode = 146;
        }
        get read() {
          return (this.mode & this.readMode) === this.readMode;
        }
        set read(val) {
          val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
        }
        get write() {
          return (this.mode & this.writeMode) === this.writeMode;
        }
        set write(val) {
          val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
        }
        get isFolder() {
          return FS.isDir(this.mode);
        }
        get isDevice() {
          return FS.isChrdev(this.mode);
        }
      },
      lookupPath(path, opts = {}) {
        path = PATH_FS.resolve(path);
        if (!path) return { path: "", node: null };
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
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
              var lookup = FS.lookupPath(current_path, {
                recurse_count: opts.recurse_count + 1
              });
              current = lookup.node;
              if (count++ > 40) {
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
        return { path: current_path, node: current };
      },
      getPath(node) {
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
      },
      hashName(parentid, name) {
        var hash = 0;
        for (var i = 0; i < name.length; i++) {
          hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
        }
        return (parentid + hash >>> 0) % FS.nameTable.length;
      },
      hashAddNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
      hashRemoveNode(node) {
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
      },
      lookupNode(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        return FS.lookup(parent, name);
      },
      createNode(parent, name, mode, rdev) {
        var node = new FS.FSNode(parent, name, mode, rdev);
        FS.hashAddNode(node);
        return node;
      },
      destroyNode(node) {
        FS.hashRemoveNode(node);
      },
      isRoot(node) {
        return node === node.parent;
      },
      isMountpoint(node) {
        return !!node.mounted;
      },
      isFile(mode) {
        return (mode & 61440) === 32768;
      },
      isDir(mode) {
        return (mode & 61440) === 16384;
      },
      isLink(mode) {
        return (mode & 61440) === 40960;
      },
      isChrdev(mode) {
        return (mode & 61440) === 8192;
      },
      isBlkdev(mode) {
        return (mode & 61440) === 24576;
      },
      isFIFO(mode) {
        return (mode & 61440) === 4096;
      },
      isSocket(mode) {
        return (mode & 49152) === 49152;
      },
      flagsToPermissionString(flag) {
        var perms = ["r", "w", "rw"][flag & 3];
        if (flag & 512) {
          perms += "w";
        }
        return perms;
      },
      nodePermissions(node, perms) {
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
      },
      mayLookup(dir) {
        if (!FS.isDir(dir.mode)) return 54;
        var errCode = FS.nodePermissions(dir, "x");
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },
      mayCreate(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, "wx");
      },
      mayDelete(dir, name, isdir) {
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
      },
      mayOpen(node, flags) {
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
      },
      MAX_OPEN_FDS: 4096,
      nextfd() {
        for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },
      getStreamChecked(fd) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        return stream;
      },
      getStream: (fd) => FS.streams[fd],
      createStream(stream, fd = -1) {
        stream = Object.assign(new FS.FSStream(), stream);
        if (fd == -1) {
          fd = FS.nextfd();
        }
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
      closeStream(fd) {
        FS.streams[fd] = null;
      },
      dupStream(origStream, fd = -1) {
        var stream = FS.createStream(origStream, fd);
        stream.stream_ops?.dup?.(stream);
        return stream;
      },
      chrdev_stream_ops: {
        open(stream) {
          var device = FS.getDevice(stream.node.rdev);
          stream.stream_ops = device.stream_ops;
          stream.stream_ops.open?.(stream);
        },
        llseek() {
          throw new FS.ErrnoError(70);
        }
      },
      major: (dev) => dev >> 8,
      minor: (dev) => dev & 255,
      makedev: (ma, mi) => ma << 8 | mi,
      registerDevice(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },
      getDevice: (dev) => FS.devices[dev],
      getMounts(mount) {
        var mounts = [];
        var check = [mount];
        while (check.length) {
          var m = check.pop();
          mounts.push(m);
          check.push(...m.mounts);
        }
        return mounts;
      },
      syncfs(populate, callback) {
        if (typeof populate == "function") {
          callback = populate;
          populate = false;
        }
        FS.syncFSRequests++;
        if (FS.syncFSRequests > 1) {
          err(
            `warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`
          );
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
      },
      mount(type, opts, mountpoint) {
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
        var mount = {
          type,
          opts,
          mountpoint,
          mounts: []
        };
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
      },
      unmount(mountpoint) {
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
      },
      lookup(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },
      mknod(path, mode, dev) {
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
      },
      create(path, mode) {
        mode = mode !== void 0 ? mode : 438;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
      mkdir(path, mode) {
        mode = mode !== void 0 ? mode : 511;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
      mkdirTree(path, mode) {
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
      },
      mkdev(path, mode, dev) {
        if (typeof dev == "undefined") {
          dev = mode;
          mode = 438;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
      symlink(oldpath, newpath) {
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
      },
      rename(old_path, new_path) {
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
          old_node.parent = new_dir;
        } catch (e) {
          throw e;
        } finally {
          FS.hashAddNode(old_node);
        }
      },
      rmdir(path) {
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
      },
      readdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },
      unlink(path) {
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
      },
      readlink(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(
          FS.getPath(link.parent),
          link.node_ops.readlink(link)
        );
      },
      stat(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },
      lstat(path) {
        return FS.stat(path, true);
      },
      chmod(path, mode, dontFollow) {
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
        node.node_ops.setattr(node, {
          mode: mode & 4095 | node.mode & -4096,
          timestamp: Date.now()
        });
      },
      lchmod(path, mode) {
        FS.chmod(path, mode, true);
      },
      fchmod(fd, mode) {
        var stream = FS.getStreamChecked(fd);
        FS.chmod(stream.node, mode);
      },
      chown(path, uid, gid, dontFollow) {
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
        node.node_ops.setattr(node, {
          timestamp: Date.now()
        });
      },
      lchown(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },
      fchown(fd, uid, gid) {
        var stream = FS.getStreamChecked(fd);
        FS.chown(stream.node, uid, gid);
      },
      truncate(path, len) {
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
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },
      ftruncate(fd, len) {
        var stream = FS.getStreamChecked(fd);
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },
      utime(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },
      open(path, flags, mode) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
        if (flags & 64) {
          mode = typeof mode == "undefined" ? 438 : mode;
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
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
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
          flags &= -513;
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
        flags &= -131713;
        var stream = FS.createStream({
          node,
          path: FS.getPath(node),
          flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          ungotten: [],
          error: false
        });
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module["logReadFiles"] && !(flags & 1)) {
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },
      close(stream) {
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
      },
      isClosed(stream) {
        return stream.fd === null;
      },
      llseek(stream, offset, whence) {
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
      },
      read(stream, buffer, offset, length, position) {
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
        var bytesRead = stream.stream_ops.read(
          stream,
          buffer,
          offset,
          length,
          position
        );
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },
      write(stream, buffer, offset, length, position, canOwn) {
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
        var bytesWritten = stream.stream_ops.write(
          stream,
          buffer,
          offset,
          length,
          position,
          canOwn
        );
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },
      allocate(stream, offset, length) {
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
      },
      mmap(stream, length, position, prot, flags) {
        if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        if (!length) {
          throw new FS.ErrnoError(28);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },
      msync(stream, buffer, offset, length, mmapFlags) {
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(
          stream,
          buffer,
          offset,
          length,
          mmapFlags
        );
      },
      ioctl(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
      readFile(path, opts = {}) {
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
          ret = UTF8ArrayToString(buf);
        } else if (opts.encoding === "binary") {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },
      writeFile(path, data, opts = {}) {
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
      },
      cwd: () => FS.currentPath,
      chdir(path) {
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
      },
      createDefaultDirectories() {
        FS.mkdir("/tmp");
        FS.mkdir("/home");
        FS.mkdir("/home/web_user");
      },
      createDefaultDevices() {
        FS.mkdir("/dev");
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length
        });
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
      },
      createSpecialDirectories() {
        FS.mkdir("/proc");
        var proc_self = FS.mkdir("/proc/self");
        FS.mkdir("/proc/self/fd");
        FS.mount(
          {
            mount() {
              var node = FS.createNode(proc_self, "fd", 16384 | 511, 73);
              node.node_ops = {
                lookup(parent, name) {
                  var fd = +name;
                  var stream = FS.getStreamChecked(fd);
                  var ret = {
                    parent: null,
                    mount: { mountpoint: "fake" },
                    node_ops: { readlink: () => stream.path }
                  };
                  ret.parent = ret;
                  return ret;
                }
              };
              return node;
            }
          },
          {},
          "/proc/self/fd"
        );
      },
      createStandardStreams(input, output, error) {
        if (input) {
          FS.createDevice("/dev", "stdin", input);
        } else {
          FS.symlink("/dev/tty", "/dev/stdin");
        }
        if (output) {
          FS.createDevice("/dev", "stdout", null, output);
        } else {
          FS.symlink("/dev/tty", "/dev/stdout");
        }
        if (error) {
          FS.createDevice("/dev", "stderr", null, error);
        } else {
          FS.symlink("/dev/tty1", "/dev/stderr");
        }
        FS.open("/dev/stdin", 0);
        FS.open("/dev/stdout", 1);
        FS.open("/dev/stderr", 1);
      },
      staticInit() {
        [44].forEach((code) => {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = "<generic error, no stack>";
        });
        FS.nameTable = new Array(4096);
        FS.mount(MEMFS, {}, "/");
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
        FS.filesystems = {
          MEMFS
        };
      },
      init(input, output, error) {
        FS.initialized = true;
        input ?? (input = Module["stdin"]);
        output ?? (output = Module["stdout"]);
        error ?? (error = Module["stderr"]);
        FS.createStandardStreams(input, output, error);
      },
      quit() {
        FS.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },
      findObject(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },
      analyzePath(path, dontResolveLastLink) {
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false,
          exists: false,
          error: 0,
          name: null,
          path: null,
          object: null,
          parentExists: false,
          parentPath: null,
          parentObject: null
        };
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
      },
      createPath(parent, path, canRead, canWrite) {
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
      },
      createFile(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(
          typeof parent == "string" ? parent : FS.getPath(parent),
          name
        );
        var mode = FS_getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
      createDataFile(parent, name, data, canRead, canWrite, canOwn) {
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
            for (var i = 0, len = data.length; i < len; ++i)
              arr[i] = data.charCodeAt(i);
            data = arr;
          }
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
      },
      createDevice(parent, name, input, output) {
        var _a;
        var path = PATH.join2(
          typeof parent == "string" ? parent : FS.getPath(parent),
          name
        );
        var mode = FS_getMode(!!input, !!output);
        (_a = FS.createDevice).major ?? (_a.major = 64);
        var dev = FS.makedev(FS.createDevice.major++, 0);
        FS.registerDevice(dev, {
          open(stream) {
            stream.seekable = false;
          },
          close(stream) {
            if (output?.buffer?.length) {
              output(10);
            }
          },
          read(stream, buffer, offset, length, pos) {
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
          },
          write(stream, buffer, offset, length, pos) {
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
          }
        });
        return FS.mkdev(path, mode, dev);
      },
      forceLoadFile(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
          return true;
        if (typeof XMLHttpRequest != "undefined") {
          throw new Error(
            "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
          );
        } else {
          try {
            obj.contents = readBinary(obj.url);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
      },
      createLazyFile(parent, name, url, canRead, canWrite) {
        class LazyUint8Array {
          constructor() {
            this.lengthKnown = false;
            this.chunks = [];
          }
          get(idx) {
            if (idx > this.length - 1 || idx < 0) {
              return void 0;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = idx / this.chunkSize | 0;
            return this.getter(chunkNum)[chunkOffset];
          }
          setDataGetter(getter) {
            this.getter = getter;
          }
          cacheLength() {
            var xhr = new XMLHttpRequest();
            xhr.open("HEAD", url, false);
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
              throw new Error(
                "Couldn't load " + url + ". Status: " + xhr.status
              );
            var datalength = Number(xhr.getResponseHeader("Content-length"));
            var header;
            var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
            var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
            var chunkSize = 1024 * 1024;
            if (!hasByteServing) chunkSize = datalength;
            var doXHR = (from, to) => {
              if (from > to)
                throw new Error(
                  "invalid range (" + from + ", " + to + ") or no bytes requested!"
                );
              if (to > datalength - 1)
                throw new Error(
                  "only " + datalength + " bytes available! programmer error!"
                );
              var xhr2 = new XMLHttpRequest();
              xhr2.open("GET", url, false);
              if (datalength !== chunkSize)
                xhr2.setRequestHeader("Range", "bytes=" + from + "-" + to);
              xhr2.responseType = "arraybuffer";
              if (xhr2.overrideMimeType) {
                xhr2.overrideMimeType("text/plain; charset=x-user-defined");
              }
              xhr2.send(null);
              if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304))
                throw new Error(
                  "Couldn't load " + url + ". Status: " + xhr2.status
                );
              if (xhr2.response !== void 0) {
                return new Uint8Array(xhr2.response || []);
              }
              return intArrayFromString(xhr2.responseText || "");
            };
            var lazyArray2 = this;
            lazyArray2.setDataGetter((chunkNum) => {
              var start = chunkNum * chunkSize;
              var end = (chunkNum + 1) * chunkSize - 1;
              end = Math.min(end, datalength - 1);
              if (typeof lazyArray2.chunks[chunkNum] == "undefined") {
                lazyArray2.chunks[chunkNum] = doXHR(start, end);
              }
              if (typeof lazyArray2.chunks[chunkNum] == "undefined")
                throw new Error("doXHR failed!");
              return lazyArray2.chunks[chunkNum];
            });
            if (usesGzip || !datalength) {
              chunkSize = datalength = 1;
              datalength = this.getter(0).length;
              chunkSize = datalength;
              out(
                "LazyFiles on gzip forces download of the whole file when length is accessed"
              );
            }
            this._length = datalength;
            this._chunkSize = chunkSize;
            this.lengthKnown = true;
          }
          get length() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._length;
          }
          get chunkSize() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._chunkSize;
          }
        }
        if (typeof XMLHttpRequest != "undefined") {
          if (!ENVIRONMENT_IS_WORKER)
            throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
          var lazyArray = new LazyUint8Array();
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
        Object.defineProperties(node, {
          usedBytes: {
            get: function() {
              return this.contents.length;
            }
          }
        });
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = (...args) => {
            FS.forceLoadFile(node);
            return fn(...args);
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
      }
    };
    var UTF8ToString = (ptr, maxBytesToRead) => {
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
    };
    var SYSCALLS = {
      DEFAULT_POLLMASK: 5,
      calculateAt(dirfd, path, allowEmpty) {
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
      },
      doStat(func, path, buf) {
        var stat = func(path);
        HEAP32[buf >> 2] = stat.dev;
        HEAP32[buf + 4 >> 2] = stat.mode;
        HEAPU32[buf + 8 >> 2] = stat.nlink;
        HEAP32[buf + 12 >> 2] = stat.uid;
        HEAP32[buf + 16 >> 2] = stat.gid;
        HEAP32[buf + 20 >> 2] = stat.rdev;
        HEAP64[buf + 24 >> 3] = BigInt(stat.size);
        HEAP32[buf + 32 >> 2] = 4096;
        HEAP32[buf + 36 >> 2] = stat.blocks;
        var atime = stat.atime.getTime();
        var mtime = stat.mtime.getTime();
        var ctime = stat.ctime.getTime();
        HEAP64[buf + 40 >> 3] = BigInt(Math.floor(atime / 1e3));
        HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3 * 1e3;
        HEAP64[buf + 56 >> 3] = BigInt(Math.floor(mtime / 1e3));
        HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3 * 1e3;
        HEAP64[buf + 72 >> 3] = BigInt(Math.floor(ctime / 1e3));
        HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3 * 1e3;
        HEAP64[buf + 88 >> 3] = BigInt(stat.ino);
        return 0;
      },
      doMsync(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          return 0;
        }
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },
      getStreamFromFD(fd) {
        var stream = FS.getStreamChecked(fd);
        return stream;
      },
      varargs: void 0,
      getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      }
    };
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
    function syscallGetVarargI() {
      var ret = HEAP32[+SYSCALLS.varargs >> 2];
      SYSCALLS.varargs += 4;
      return ret;
    }
    var syscallGetVarargP = syscallGetVarargI;
    function ___syscall_fcntl64(fd, cmd, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        switch (cmd) {
          case 0: {
            var arg = syscallGetVarargI();
            if (arg < 0) {
              return -28;
            }
            while (FS.streams[arg]) {
              arg++;
            }
            var newStream;
            newStream = FS.dupStream(stream, arg);
            return newStream.fd;
          }
          case 1:
          case 2:
            return 0;
          case 3:
            return stream.flags;
          case 4: {
            var arg = syscallGetVarargI();
            stream.flags |= arg;
            return 0;
          }
          case 12: {
            var arg = syscallGetVarargP();
            var offset = 0;
            HEAP16[arg + offset >> 1] = 2;
            return 0;
          }
          case 13:
          case 14:
            return 0;
        }
        return -28;
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
    var INT53_MAX = 9007199254740992;
    var INT53_MIN = -9007199254740992;
    var bigintToI53Checked = (num) => num < INT53_MIN || num > INT53_MAX ? NaN : Number(num);
    function ___syscall_ftruncate64(fd, length) {
      length = bigintToI53Checked(length);
      try {
        if (isNaN(length)) return 61;
        FS.ftruncate(fd, length);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
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
    function ___syscall_ioctl(fd, op, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        switch (op) {
          case 21509: {
            if (!stream.tty) return -59;
            return 0;
          }
          case 21505: {
            if (!stream.tty) return -59;
            if (stream.tty.ops.ioctl_tcgets) {
              var termios = stream.tty.ops.ioctl_tcgets(stream);
              var argp = syscallGetVarargP();
              HEAP32[argp >> 2] = termios.c_iflag || 0;
              HEAP32[argp + 4 >> 2] = termios.c_oflag || 0;
              HEAP32[argp + 8 >> 2] = termios.c_cflag || 0;
              HEAP32[argp + 12 >> 2] = termios.c_lflag || 0;
              for (var i = 0; i < 32; i++) {
                HEAP8[argp + i + 17] = termios.c_cc[i] || 0;
              }
              return 0;
            }
            return 0;
          }
          case 21510:
          case 21511:
          case 21512: {
            if (!stream.tty) return -59;
            return 0;
          }
          case 21506:
          case 21507:
          case 21508: {
            if (!stream.tty) return -59;
            if (stream.tty.ops.ioctl_tcsets) {
              var argp = syscallGetVarargP();
              var c_iflag = HEAP32[argp >> 2];
              var c_oflag = HEAP32[argp + 4 >> 2];
              var c_cflag = HEAP32[argp + 8 >> 2];
              var c_lflag = HEAP32[argp + 12 >> 2];
              var c_cc = [];
              for (var i = 0; i < 32; i++) {
                c_cc.push(HEAP8[argp + i + 17]);
              }
              return stream.tty.ops.ioctl_tcsets(stream.tty, op, {
                c_iflag,
                c_oflag,
                c_cflag,
                c_lflag,
                c_cc
              });
            }
            return 0;
          }
          case 21519: {
            if (!stream.tty) return -59;
            var argp = syscallGetVarargP();
            HEAP32[argp >> 2] = 0;
            return 0;
          }
          case 21520: {
            if (!stream.tty) return -59;
            return -28;
          }
          case 21531: {
            var argp = syscallGetVarargP();
            return FS.ioctl(stream, op, argp);
          }
          case 21523: {
            if (!stream.tty) return -59;
            if (stream.tty.ops.ioctl_tiocgwinsz) {
              var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
              var argp = syscallGetVarargP();
              HEAP16[argp >> 1] = winsize[0];
              HEAP16[argp + 2 >> 1] = winsize[1];
            }
            return 0;
          }
          case 21524: {
            if (!stream.tty) return -59;
            return 0;
          }
          case 21515: {
            if (!stream.tty) return -59;
            return 0;
          }
          default:
            return -28;
        }
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
        if (path[path.length - 1] === "/")
          path = path.substr(0, path.length - 1);
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
        var mode = varargs ? syscallGetVarargI() : 0;
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
    var readI53FromI64 = (ptr) => {
      return HEAPU32[ptr >> 2] + HEAP32[ptr + 4 >> 2] * 4294967296;
    };
    function ___syscall_utimensat(dirfd, path, times, flags) {
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path, true);
        var now = Date.now(), atime, mtime;
        if (!times) {
          atime = now;
          mtime = now;
        } else {
          var seconds = readI53FromI64(times);
          var nanoseconds = HEAP32[times + 8 >> 2];
          if (nanoseconds == 1073741823) {
            atime = now;
          } else if (nanoseconds == 1073741822) {
            atime = -1;
          } else {
            atime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
          }
          times += 16;
          seconds = readI53FromI64(times);
          nanoseconds = HEAP32[times + 8 >> 2];
          if (nanoseconds == 1073741823) {
            mtime = now;
          } else if (nanoseconds == 1073741822) {
            mtime = -1;
          } else {
            mtime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
          }
        }
        if (mtime != -1 || atime != -1) {
          FS.utime(path, atime, mtime);
        }
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    var nowIsMonotonic = 1;
    var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;
    var isLeapYear = (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    var MONTH_DAYS_LEAP_CUMULATIVE = [
      0,
      31,
      60,
      91,
      121,
      152,
      182,
      213,
      244,
      274,
      305,
      335
    ];
    var MONTH_DAYS_REGULAR_CUMULATIVE = [
      0,
      31,
      59,
      90,
      120,
      151,
      181,
      212,
      243,
      273,
      304,
      334
    ];
    var ydayFromDate = (date) => {
      var leap = isLeapYear(date.getFullYear());
      var monthDaysCumulative = leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE;
      var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
      return yday;
    };
    function __localtime_js(time, tmPtr) {
      time = bigintToI53Checked(time);
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
    function __mmap_js(len, prot, flags, fd, offset, allocated, addr) {
      offset = bigintToI53Checked(offset);
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
    function __munmap_js(addr, len, prot, flags, fd, offset) {
      offset = bigintToI53Checked(offset);
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        if (prot & 2) {
          SYSCALLS.doMsync(addr, stream, len, flags, offset);
        }
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return -e.errno;
      }
    }
    var __tzset_js = (timezone, daylight, std_name, dst_name) => {
      var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
      HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
      HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
      var extractZone = (timezoneOffset) => {
        var sign = timezoneOffset >= 0 ? "-" : "+";
        var absOffset = Math.abs(timezoneOffset);
        var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
        var minutes = String(absOffset % 60).padStart(2, "0");
        return `UTC${sign}${hours}${minutes}`;
      };
      var winterName = extractZone(winterOffset);
      var summerName = extractZone(summerOffset);
      if (summerOffset < winterOffset) {
        stringToUTF8(winterName, std_name, 17);
        stringToUTF8(summerName, dst_name, 17);
      } else {
        stringToUTF8(winterName, dst_name, 17);
        stringToUTF8(summerName, std_name, 17);
      }
    };
    var _emscripten_date_now = () => Date.now();
    var _emscripten_get_now = () => performance.now();
    var getHeapMax = () => 2147483648;
    var growMemory = (size) => {
      var b = wasmMemory.buffer;
      var pages = (size - b.byteLength + 65535) / 65536 | 0;
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
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
        overGrownHeapSize = Math.min(
          overGrownHeapSize,
          requestedSize + 100663296
        );
        var newSize = Math.min(
          maxHeapSize,
          alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536)
        );
        var replacement = growMemory(newSize);
        if (replacement) {
          return true;
        }
      }
      return false;
    };
    var ENV = {};
    var getExecutableName = () => {
      return thisProgram || "./this.program";
    };
    var getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
        var env = {
          USER: "web_user",
          LOGNAME: "web_user",
          PATH: "/",
          PWD: "/",
          HOME: "/home/web_user",
          LANG: lang,
          _: getExecutableName()
        };
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
        HEAP8[buffer++] = str.charCodeAt(i);
      }
      HEAP8[buffer] = 0;
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
        HEAP8[pbuf] = type;
        HEAP16[pbuf + 2 >> 1] = flags;
        HEAP64[pbuf + 8 >> 3] = BigInt(rightsBase);
        HEAP64[pbuf + 16 >> 3] = BigInt(rightsInheriting);
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
    function _fd_seek(fd, offset, whence, newOffset) {
      offset = bigintToI53Checked(offset);
      try {
        if (isNaN(offset)) return 61;
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.llseek(stream, offset, whence);
        HEAP64[newOffset >> 3] = BigInt(stream.position);
        if (stream.getdents && offset === 0 && whence === 0)
          stream.getdents = null;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
        return e.errno;
      }
    }
    function _fd_sync(fd) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        if (stream.stream_ops?.fsync) {
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
        if (curr < len) {
          break;
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
    FS.createPreloadedFile = FS_createPreloadedFile;
    FS.staticInit();
    var wasmImports = {
      __syscall_chmod: ___syscall_chmod,
      __syscall_faccessat: ___syscall_faccessat,
      __syscall_fchmod: ___syscall_fchmod,
      __syscall_fchown32: ___syscall_fchown32,
      __syscall_fcntl64: ___syscall_fcntl64,
      __syscall_fstat64: ___syscall_fstat64,
      __syscall_ftruncate64: ___syscall_ftruncate64,
      __syscall_getcwd: ___syscall_getcwd,
      __syscall_ioctl: ___syscall_ioctl,
      __syscall_lstat64: ___syscall_lstat64,
      __syscall_mkdirat: ___syscall_mkdirat,
      __syscall_newfstatat: ___syscall_newfstatat,
      __syscall_openat: ___syscall_openat,
      __syscall_readlinkat: ___syscall_readlinkat,
      __syscall_rmdir: ___syscall_rmdir,
      __syscall_stat64: ___syscall_stat64,
      __syscall_unlinkat: ___syscall_unlinkat,
      __syscall_utimensat: ___syscall_utimensat,
      _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
      _localtime_js: __localtime_js,
      _mmap_js: __mmap_js,
      _munmap_js: __munmap_js,
      _tzset_js: __tzset_js,
      emscripten_date_now: _emscripten_date_now,
      emscripten_get_now: _emscripten_get_now,
      emscripten_resize_heap: _emscripten_resize_heap,
      environ_get: _environ_get,
      environ_sizes_get: _environ_sizes_get,
      fd_close: _fd_close,
      fd_fdstat_get: _fd_fdstat_get,
      fd_read: _fd_read,
      fd_seek: _fd_seek,
      fd_sync: _fd_sync,
      fd_write: _fd_write,
      memory: wasmMemory
    };
    var wasmExports = createWasm();
    Module["_sqlite3_status64"] = (a0, a1, a2, a3) => (Module["_sqlite3_status64"] = wasmExports["sqlite3_status64"])(a0, a1, a2, a3);
    Module["_sqlite3_status"] = (a0, a1, a2, a3) => (Module["_sqlite3_status"] = wasmExports["sqlite3_status"])(a0, a1, a2, a3);
    Module["_sqlite3_db_status"] = (a0, a1, a2, a3, a4) => (Module["_sqlite3_db_status"] = wasmExports["sqlite3_db_status"])(a0, a1, a2, a3, a4);
    Module["_sqlite3_msize"] = (a0) => (Module["_sqlite3_msize"] = wasmExports["sqlite3_msize"])(a0);
    Module["_sqlite3_vfs_find"] = (a0) => (Module["_sqlite3_vfs_find"] = wasmExports["sqlite3_vfs_find"])(a0);
    Module["_sqlite3_initialize"] = () => (Module["_sqlite3_initialize"] = wasmExports["sqlite3_initialize"])();
    Module["_sqlite3_malloc"] = (a0) => (Module["_sqlite3_malloc"] = wasmExports["sqlite3_malloc"])(a0);
    Module["_sqlite3_free"] = (a0) => (Module["_sqlite3_free"] = wasmExports["sqlite3_free"])(
      a0
    );
    Module["_sqlite3_vfs_register"] = (a0, a1) => (Module["_sqlite3_vfs_register"] = wasmExports["sqlite3_vfs_register"])(a0, a1);
    Module["_sqlite3_vfs_unregister"] = (a0) => (Module["_sqlite3_vfs_unregister"] = wasmExports["sqlite3_vfs_unregister"])(a0);
    Module["_sqlite3_malloc64"] = (a0) => (Module["_sqlite3_malloc64"] = wasmExports["sqlite3_malloc64"])(a0);
    Module["_sqlite3_realloc"] = (a0, a1) => (Module["_sqlite3_realloc"] = wasmExports["sqlite3_realloc"])(a0, a1);
    Module["_sqlite3_realloc64"] = (a0, a1) => (Module["_sqlite3_realloc64"] = wasmExports["sqlite3_realloc64"])(a0, a1);
    Module["_sqlite3_value_text"] = (a0) => (Module["_sqlite3_value_text"] = wasmExports["sqlite3_value_text"])(a0);
    Module["_sqlite3_randomness"] = (a0, a1) => (Module["_sqlite3_randomness"] = wasmExports["sqlite3_randomness"])(a0, a1);
    Module["_sqlite3_stricmp"] = (a0, a1) => (Module["_sqlite3_stricmp"] = wasmExports["sqlite3_stricmp"])(a0, a1);
    Module["_sqlite3_strnicmp"] = (a0, a1, a2) => (Module["_sqlite3_strnicmp"] = wasmExports["sqlite3_strnicmp"])(a0, a1, a2);
    Module["_sqlite3_uri_parameter"] = (a0, a1) => (Module["_sqlite3_uri_parameter"] = wasmExports["sqlite3_uri_parameter"])(a0, a1);
    Module["_sqlite3_uri_boolean"] = (a0, a1, a2) => (Module["_sqlite3_uri_boolean"] = wasmExports["sqlite3_uri_boolean"])(a0, a1, a2);
    Module["_sqlite3_serialize"] = (a0, a1, a2, a3) => (Module["_sqlite3_serialize"] = wasmExports["sqlite3_serialize"])(a0, a1, a2, a3);
    Module["_sqlite3_prepare_v2"] = (a0, a1, a2, a3, a4) => (Module["_sqlite3_prepare_v2"] = wasmExports["sqlite3_prepare_v2"])(a0, a1, a2, a3, a4);
    Module["_sqlite3_step"] = (a0) => (Module["_sqlite3_step"] = wasmExports["sqlite3_step"])(
      a0
    );
    Module["_sqlite3_column_int64"] = (a0, a1) => (Module["_sqlite3_column_int64"] = wasmExports["sqlite3_column_int64"])(a0, a1);
    Module["_sqlite3_reset"] = (a0) => (Module["_sqlite3_reset"] = wasmExports["sqlite3_reset"])(a0);
    Module["_sqlite3_exec"] = (a0, a1, a2, a3, a4) => (Module["_sqlite3_exec"] = wasmExports["sqlite3_exec"])(
      a0,
      a1,
      a2,
      a3,
      a4
    );
    Module["_sqlite3_column_int"] = (a0, a1) => (Module["_sqlite3_column_int"] = wasmExports["sqlite3_column_int"])(a0, a1);
    Module["_sqlite3_finalize"] = (a0) => (Module["_sqlite3_finalize"] = wasmExports["sqlite3_finalize"])(a0);
    Module["_sqlite3_file_control"] = (a0, a1, a2, a3) => (Module["_sqlite3_file_control"] = wasmExports["sqlite3_file_control"])(a0, a1, a2, a3);
    Module["_sqlite3_column_name"] = (a0, a1) => (Module["_sqlite3_column_name"] = wasmExports["sqlite3_column_name"])(a0, a1);
    Module["_sqlite3_column_text"] = (a0, a1) => (Module["_sqlite3_column_text"] = wasmExports["sqlite3_column_text"])(a0, a1);
    Module["_sqlite3_column_type"] = (a0, a1) => (Module["_sqlite3_column_type"] = wasmExports["sqlite3_column_type"])(a0, a1);
    Module["_sqlite3_errmsg"] = (a0) => (Module["_sqlite3_errmsg"] = wasmExports["sqlite3_errmsg"])(a0);
    Module["_sqlite3_deserialize"] = (a0, a1, a2, a3, a4, a5) => (Module["_sqlite3_deserialize"] = wasmExports["sqlite3_deserialize"])(a0, a1, a2, a3, a4, a5);
    Module["_sqlite3_clear_bindings"] = (a0) => (Module["_sqlite3_clear_bindings"] = wasmExports["sqlite3_clear_bindings"])(a0);
    Module["_sqlite3_value_blob"] = (a0) => (Module["_sqlite3_value_blob"] = wasmExports["sqlite3_value_blob"])(a0);
    Module["_sqlite3_value_bytes"] = (a0) => (Module["_sqlite3_value_bytes"] = wasmExports["sqlite3_value_bytes"])(a0);
    Module["_sqlite3_value_double"] = (a0) => (Module["_sqlite3_value_double"] = wasmExports["sqlite3_value_double"])(a0);
    Module["_sqlite3_value_int"] = (a0) => (Module["_sqlite3_value_int"] = wasmExports["sqlite3_value_int"])(a0);
    Module["_sqlite3_value_int64"] = (a0) => (Module["_sqlite3_value_int64"] = wasmExports["sqlite3_value_int64"])(a0);
    Module["_sqlite3_value_subtype"] = (a0) => (Module["_sqlite3_value_subtype"] = wasmExports["sqlite3_value_subtype"])(a0);
    Module["_sqlite3_value_pointer"] = (a0, a1) => (Module["_sqlite3_value_pointer"] = wasmExports["sqlite3_value_pointer"])(a0, a1);
    Module["_sqlite3_value_type"] = (a0) => (Module["_sqlite3_value_type"] = wasmExports["sqlite3_value_type"])(a0);
    Module["_sqlite3_value_nochange"] = (a0) => (Module["_sqlite3_value_nochange"] = wasmExports["sqlite3_value_nochange"])(a0);
    Module["_sqlite3_value_frombind"] = (a0) => (Module["_sqlite3_value_frombind"] = wasmExports["sqlite3_value_frombind"])(a0);
    Module["_sqlite3_value_dup"] = (a0) => (Module["_sqlite3_value_dup"] = wasmExports["sqlite3_value_dup"])(a0);
    Module["_sqlite3_value_free"] = (a0) => (Module["_sqlite3_value_free"] = wasmExports["sqlite3_value_free"])(a0);
    Module["_sqlite3_result_blob"] = (a0, a1, a2, a3) => (Module["_sqlite3_result_blob"] = wasmExports["sqlite3_result_blob"])(a0, a1, a2, a3);
    Module["_sqlite3_result_error_toobig"] = (a0) => (Module["_sqlite3_result_error_toobig"] = wasmExports["sqlite3_result_error_toobig"])(a0);
    Module["_sqlite3_result_error_nomem"] = (a0) => (Module["_sqlite3_result_error_nomem"] = wasmExports["sqlite3_result_error_nomem"])(a0);
    Module["_sqlite3_result_double"] = (a0, a1) => (Module["_sqlite3_result_double"] = wasmExports["sqlite3_result_double"])(a0, a1);
    Module["_sqlite3_result_error"] = (a0, a1, a2) => (Module["_sqlite3_result_error"] = wasmExports["sqlite3_result_error"])(a0, a1, a2);
    Module["_sqlite3_result_int"] = (a0, a1) => (Module["_sqlite3_result_int"] = wasmExports["sqlite3_result_int"])(a0, a1);
    Module["_sqlite3_result_int64"] = (a0, a1) => (Module["_sqlite3_result_int64"] = wasmExports["sqlite3_result_int64"])(a0, a1);
    Module["_sqlite3_result_null"] = (a0) => (Module["_sqlite3_result_null"] = wasmExports["sqlite3_result_null"])(a0);
    Module["_sqlite3_result_pointer"] = (a0, a1, a2, a3) => (Module["_sqlite3_result_pointer"] = wasmExports["sqlite3_result_pointer"])(a0, a1, a2, a3);
    Module["_sqlite3_result_subtype"] = (a0, a1) => (Module["_sqlite3_result_subtype"] = wasmExports["sqlite3_result_subtype"])(a0, a1);
    Module["_sqlite3_result_text"] = (a0, a1, a2, a3) => (Module["_sqlite3_result_text"] = wasmExports["sqlite3_result_text"])(a0, a1, a2, a3);
    Module["_sqlite3_result_zeroblob"] = (a0, a1) => (Module["_sqlite3_result_zeroblob"] = wasmExports["sqlite3_result_zeroblob"])(a0, a1);
    Module["_sqlite3_result_zeroblob64"] = (a0, a1) => (Module["_sqlite3_result_zeroblob64"] = wasmExports["sqlite3_result_zeroblob64"])(a0, a1);
    Module["_sqlite3_result_error_code"] = (a0, a1) => (Module["_sqlite3_result_error_code"] = wasmExports["sqlite3_result_error_code"])(a0, a1);
    Module["_sqlite3_user_data"] = (a0) => (Module["_sqlite3_user_data"] = wasmExports["sqlite3_user_data"])(a0);
    Module["_sqlite3_context_db_handle"] = (a0) => (Module["_sqlite3_context_db_handle"] = wasmExports["sqlite3_context_db_handle"])(a0);
    Module["_sqlite3_vtab_nochange"] = (a0) => (Module["_sqlite3_vtab_nochange"] = wasmExports["sqlite3_vtab_nochange"])(a0);
    Module["_sqlite3_vtab_in_first"] = (a0, a1) => (Module["_sqlite3_vtab_in_first"] = wasmExports["sqlite3_vtab_in_first"])(a0, a1);
    Module["_sqlite3_vtab_in_next"] = (a0, a1) => (Module["_sqlite3_vtab_in_next"] = wasmExports["sqlite3_vtab_in_next"])(a0, a1);
    Module["_sqlite3_aggregate_context"] = (a0, a1) => (Module["_sqlite3_aggregate_context"] = wasmExports["sqlite3_aggregate_context"])(a0, a1);
    Module["_sqlite3_get_auxdata"] = (a0, a1) => (Module["_sqlite3_get_auxdata"] = wasmExports["sqlite3_get_auxdata"])(a0, a1);
    Module["_sqlite3_set_auxdata"] = (a0, a1, a2, a3) => (Module["_sqlite3_set_auxdata"] = wasmExports["sqlite3_set_auxdata"])(a0, a1, a2, a3);
    Module["_sqlite3_column_count"] = (a0) => (Module["_sqlite3_column_count"] = wasmExports["sqlite3_column_count"])(a0);
    Module["_sqlite3_data_count"] = (a0) => (Module["_sqlite3_data_count"] = wasmExports["sqlite3_data_count"])(a0);
    Module["_sqlite3_column_blob"] = (a0, a1) => (Module["_sqlite3_column_blob"] = wasmExports["sqlite3_column_blob"])(a0, a1);
    Module["_sqlite3_column_bytes"] = (a0, a1) => (Module["_sqlite3_column_bytes"] = wasmExports["sqlite3_column_bytes"])(a0, a1);
    Module["_sqlite3_column_double"] = (a0, a1) => (Module["_sqlite3_column_double"] = wasmExports["sqlite3_column_double"])(a0, a1);
    Module["_sqlite3_column_value"] = (a0, a1) => (Module["_sqlite3_column_value"] = wasmExports["sqlite3_column_value"])(a0, a1);
    Module["_sqlite3_column_decltype"] = (a0, a1) => (Module["_sqlite3_column_decltype"] = wasmExports["sqlite3_column_decltype"])(a0, a1);
    Module["_sqlite3_bind_blob"] = (a0, a1, a2, a3, a4) => (Module["_sqlite3_bind_blob"] = wasmExports["sqlite3_bind_blob"])(a0, a1, a2, a3, a4);
    Module["_sqlite3_bind_double"] = (a0, a1, a2) => (Module["_sqlite3_bind_double"] = wasmExports["sqlite3_bind_double"])(a0, a1, a2);
    Module["_sqlite3_bind_int"] = (a0, a1, a2) => (Module["_sqlite3_bind_int"] = wasmExports["sqlite3_bind_int"])(a0, a1, a2);
    Module["_sqlite3_bind_int64"] = (a0, a1, a2) => (Module["_sqlite3_bind_int64"] = wasmExports["sqlite3_bind_int64"])(a0, a1, a2);
    Module["_sqlite3_bind_null"] = (a0, a1) => (Module["_sqlite3_bind_null"] = wasmExports["sqlite3_bind_null"])(a0, a1);
    Module["_sqlite3_bind_pointer"] = (a0, a1, a2, a3, a4) => (Module["_sqlite3_bind_pointer"] = wasmExports["sqlite3_bind_pointer"])(a0, a1, a2, a3, a4);
    Module["_sqlite3_bind_text"] = (a0, a1, a2, a3, a4) => (Module["_sqlite3_bind_text"] = wasmExports["sqlite3_bind_text"])(a0, a1, a2, a3, a4);
    Module["_sqlite3_bind_parameter_count"] = (a0) => (Module["_sqlite3_bind_parameter_count"] = wasmExports["sqlite3_bind_parameter_count"])(a0);
    Module["_sqlite3_bind_parameter_name"] = (a0, a1) => (Module["_sqlite3_bind_parameter_name"] = wasmExports["sqlite3_bind_parameter_name"])(a0, a1);
    Module["_sqlite3_bind_parameter_index"] = (a0, a1) => (Module["_sqlite3_bind_parameter_index"] = wasmExports["sqlite3_bind_parameter_index"])(a0, a1);
    Module["_sqlite3_db_handle"] = (a0) => (Module["_sqlite3_db_handle"] = wasmExports["sqlite3_db_handle"])(a0);
    Module["_sqlite3_stmt_readonly"] = (a0) => (Module["_sqlite3_stmt_readonly"] = wasmExports["sqlite3_stmt_readonly"])(a0);
    Module["_sqlite3_stmt_isexplain"] = (a0) => (Module["_sqlite3_stmt_isexplain"] = wasmExports["sqlite3_stmt_isexplain"])(a0);
    Module["_sqlite3_stmt_explain"] = (a0, a1) => (Module["_sqlite3_stmt_explain"] = wasmExports["sqlite3_stmt_explain"])(a0, a1);
    Module["_sqlite3_stmt_busy"] = (a0) => (Module["_sqlite3_stmt_busy"] = wasmExports["sqlite3_stmt_busy"])(a0);
    Module["_sqlite3_stmt_status"] = (a0, a1, a2) => (Module["_sqlite3_stmt_status"] = wasmExports["sqlite3_stmt_status"])(a0, a1, a2);
    Module["_sqlite3_sql"] = (a0) => (Module["_sqlite3_sql"] = wasmExports["sqlite3_sql"])(a0);
    Module["_sqlite3_expanded_sql"] = (a0) => (Module["_sqlite3_expanded_sql"] = wasmExports["sqlite3_expanded_sql"])(a0);
    Module["_sqlite3_preupdate_old"] = (a0, a1, a2) => (Module["_sqlite3_preupdate_old"] = wasmExports["sqlite3_preupdate_old"])(a0, a1, a2);
    Module["_sqlite3_preupdate_count"] = (a0) => (Module["_sqlite3_preupdate_count"] = wasmExports["sqlite3_preupdate_count"])(a0);
    Module["_sqlite3_preupdate_depth"] = (a0) => (Module["_sqlite3_preupdate_depth"] = wasmExports["sqlite3_preupdate_depth"])(a0);
    Module["_sqlite3_preupdate_blobwrite"] = (a0) => (Module["_sqlite3_preupdate_blobwrite"] = wasmExports["sqlite3_preupdate_blobwrite"])(a0);
    Module["_sqlite3_preupdate_new"] = (a0, a1, a2) => (Module["_sqlite3_preupdate_new"] = wasmExports["sqlite3_preupdate_new"])(a0, a1, a2);
    Module["_sqlite3_value_numeric_type"] = (a0) => (Module["_sqlite3_value_numeric_type"] = wasmExports["sqlite3_value_numeric_type"])(a0);
    Module["_sqlite3_set_authorizer"] = (a0, a1, a2) => (Module["_sqlite3_set_authorizer"] = wasmExports["sqlite3_set_authorizer"])(a0, a1, a2);
    Module["_sqlite3_strglob"] = (a0, a1) => (Module["_sqlite3_strglob"] = wasmExports["sqlite3_strglob"])(a0, a1);
    Module["_sqlite3_strlike"] = (a0, a1, a2) => (Module["_sqlite3_strlike"] = wasmExports["sqlite3_strlike"])(a0, a1, a2);
    Module["_sqlite3_auto_extension"] = (a0) => (Module["_sqlite3_auto_extension"] = wasmExports["sqlite3_auto_extension"])(a0);
    Module["_sqlite3_cancel_auto_extension"] = (a0) => (Module["_sqlite3_cancel_auto_extension"] = wasmExports["sqlite3_cancel_auto_extension"])(a0);
    Module["_sqlite3_reset_auto_extension"] = () => (Module["_sqlite3_reset_auto_extension"] = wasmExports["sqlite3_reset_auto_extension"])();
    Module["_sqlite3_prepare_v3"] = (a0, a1, a2, a3, a4, a5) => (Module["_sqlite3_prepare_v3"] = wasmExports["sqlite3_prepare_v3"])(a0, a1, a2, a3, a4, a5);
    Module["_sqlite3_create_module"] = (a0, a1, a2, a3) => (Module["_sqlite3_create_module"] = wasmExports["sqlite3_create_module"])(a0, a1, a2, a3);
    Module["_sqlite3_create_module_v2"] = (a0, a1, a2, a3, a4) => (Module["_sqlite3_create_module_v2"] = wasmExports["sqlite3_create_module_v2"])(a0, a1, a2, a3, a4);
    Module["_sqlite3_drop_modules"] = (a0, a1) => (Module["_sqlite3_drop_modules"] = wasmExports["sqlite3_drop_modules"])(a0, a1);
    Module["_sqlite3_declare_vtab"] = (a0, a1) => (Module["_sqlite3_declare_vtab"] = wasmExports["sqlite3_declare_vtab"])(a0, a1);
    Module["_sqlite3_vtab_on_conflict"] = (a0) => (Module["_sqlite3_vtab_on_conflict"] = wasmExports["sqlite3_vtab_on_conflict"])(a0);
    Module["_sqlite3_vtab_collation"] = (a0, a1) => (Module["_sqlite3_vtab_collation"] = wasmExports["sqlite3_vtab_collation"])(a0, a1);
    Module["_sqlite3_vtab_in"] = (a0, a1, a2) => (Module["_sqlite3_vtab_in"] = wasmExports["sqlite3_vtab_in"])(a0, a1, a2);
    Module["_sqlite3_vtab_rhs_value"] = (a0, a1, a2) => (Module["_sqlite3_vtab_rhs_value"] = wasmExports["sqlite3_vtab_rhs_value"])(a0, a1, a2);
    Module["_sqlite3_vtab_distinct"] = (a0) => (Module["_sqlite3_vtab_distinct"] = wasmExports["sqlite3_vtab_distinct"])(a0);
    Module["_sqlite3_keyword_name"] = (a0, a1, a2) => (Module["_sqlite3_keyword_name"] = wasmExports["sqlite3_keyword_name"])(a0, a1, a2);
    Module["_sqlite3_keyword_count"] = () => (Module["_sqlite3_keyword_count"] = wasmExports["sqlite3_keyword_count"])();
    Module["_sqlite3_keyword_check"] = (a0, a1) => (Module["_sqlite3_keyword_check"] = wasmExports["sqlite3_keyword_check"])(a0, a1);
    Module["_sqlite3_complete"] = (a0) => (Module["_sqlite3_complete"] = wasmExports["sqlite3_complete"])(a0);
    Module["_sqlite3_libversion"] = () => (Module["_sqlite3_libversion"] = wasmExports["sqlite3_libversion"])();
    Module["_sqlite3_libversion_number"] = () => (Module["_sqlite3_libversion_number"] = wasmExports["sqlite3_libversion_number"])();
    Module["_sqlite3_shutdown"] = () => (Module["_sqlite3_shutdown"] = wasmExports["sqlite3_shutdown"])();
    Module["_sqlite3_last_insert_rowid"] = (a0) => (Module["_sqlite3_last_insert_rowid"] = wasmExports["sqlite3_last_insert_rowid"])(a0);
    Module["_sqlite3_set_last_insert_rowid"] = (a0, a1) => (Module["_sqlite3_set_last_insert_rowid"] = wasmExports["sqlite3_set_last_insert_rowid"])(a0, a1);
    Module["_sqlite3_changes64"] = (a0) => (Module["_sqlite3_changes64"] = wasmExports["sqlite3_changes64"])(a0);
    Module["_sqlite3_changes"] = (a0) => (Module["_sqlite3_changes"] = wasmExports["sqlite3_changes"])(a0);
    Module["_sqlite3_total_changes64"] = (a0) => (Module["_sqlite3_total_changes64"] = wasmExports["sqlite3_total_changes64"])(a0);
    Module["_sqlite3_total_changes"] = (a0) => (Module["_sqlite3_total_changes"] = wasmExports["sqlite3_total_changes"])(a0);
    Module["_sqlite3_txn_state"] = (a0, a1) => (Module["_sqlite3_txn_state"] = wasmExports["sqlite3_txn_state"])(a0, a1);
    Module["_sqlite3_close_v2"] = (a0) => (Module["_sqlite3_close_v2"] = wasmExports["sqlite3_close_v2"])(a0);
    Module["_sqlite3_busy_handler"] = (a0, a1, a2) => (Module["_sqlite3_busy_handler"] = wasmExports["sqlite3_busy_handler"])(a0, a1, a2);
    Module["_sqlite3_progress_handler"] = (a0, a1, a2, a3) => (Module["_sqlite3_progress_handler"] = wasmExports["sqlite3_progress_handler"])(a0, a1, a2, a3);
    Module["_sqlite3_busy_timeout"] = (a0, a1) => (Module["_sqlite3_busy_timeout"] = wasmExports["sqlite3_busy_timeout"])(a0, a1);
    Module["_sqlite3_interrupt"] = (a0) => (Module["_sqlite3_interrupt"] = wasmExports["sqlite3_interrupt"])(a0);
    Module["_sqlite3_is_interrupted"] = (a0) => (Module["_sqlite3_is_interrupted"] = wasmExports["sqlite3_is_interrupted"])(a0);
    Module["_sqlite3_create_function"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (Module["_sqlite3_create_function"] = wasmExports["sqlite3_create_function"])(
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7
    );
    Module["_sqlite3_create_function_v2"] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (Module["_sqlite3_create_function_v2"] = wasmExports["sqlite3_create_function_v2"])(
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8
    );
    Module["_sqlite3_create_window_function"] = (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) => (Module["_sqlite3_create_window_function"] = wasmExports["sqlite3_create_window_function"])(
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9
    );
    Module["_sqlite3_overload_function"] = (a0, a1, a2) => (Module["_sqlite3_overload_function"] = wasmExports["sqlite3_overload_function"])(a0, a1, a2);
    Module["_sqlite3_trace_v2"] = (a0, a1, a2, a3) => (Module["_sqlite3_trace_v2"] = wasmExports["sqlite3_trace_v2"])(a0, a1, a2, a3);
    Module["_sqlite3_commit_hook"] = (a0, a1, a2) => (Module["_sqlite3_commit_hook"] = wasmExports["sqlite3_commit_hook"])(a0, a1, a2);
    Module["_sqlite3_update_hook"] = (a0, a1, a2) => (Module["_sqlite3_update_hook"] = wasmExports["sqlite3_update_hook"])(a0, a1, a2);
    Module["_sqlite3_rollback_hook"] = (a0, a1, a2) => (Module["_sqlite3_rollback_hook"] = wasmExports["sqlite3_rollback_hook"])(a0, a1, a2);
    Module["_sqlite3_preupdate_hook"] = (a0, a1, a2) => (Module["_sqlite3_preupdate_hook"] = wasmExports["sqlite3_preupdate_hook"])(a0, a1, a2);
    Module["_sqlite3_error_offset"] = (a0) => (Module["_sqlite3_error_offset"] = wasmExports["sqlite3_error_offset"])(a0);
    Module["_sqlite3_errcode"] = (a0) => (Module["_sqlite3_errcode"] = wasmExports["sqlite3_errcode"])(a0);
    Module["_sqlite3_extended_errcode"] = (a0) => (Module["_sqlite3_extended_errcode"] = wasmExports["sqlite3_extended_errcode"])(a0);
    Module["_sqlite3_errstr"] = (a0) => (Module["_sqlite3_errstr"] = wasmExports["sqlite3_errstr"])(a0);
    Module["_sqlite3_limit"] = (a0, a1, a2) => (Module["_sqlite3_limit"] = wasmExports["sqlite3_limit"])(a0, a1, a2);
    Module["_sqlite3_open"] = (a0, a1) => (Module["_sqlite3_open"] = wasmExports["sqlite3_open"])(
      a0,
      a1
    );
    Module["_sqlite3_open_v2"] = (a0, a1, a2, a3) => (Module["_sqlite3_open_v2"] = wasmExports["sqlite3_open_v2"])(a0, a1, a2, a3);
    Module["_sqlite3_create_collation"] = (a0, a1, a2, a3, a4) => (Module["_sqlite3_create_collation"] = wasmExports["sqlite3_create_collation"])(a0, a1, a2, a3, a4);
    Module["_sqlite3_create_collation_v2"] = (a0, a1, a2, a3, a4, a5) => (Module["_sqlite3_create_collation_v2"] = wasmExports["sqlite3_create_collation_v2"])(a0, a1, a2, a3, a4, a5);
    Module["_sqlite3_collation_needed"] = (a0, a1, a2) => (Module["_sqlite3_collation_needed"] = wasmExports["sqlite3_collation_needed"])(a0, a1, a2);
    Module["_sqlite3_get_autocommit"] = (a0) => (Module["_sqlite3_get_autocommit"] = wasmExports["sqlite3_get_autocommit"])(a0);
    Module["_sqlite3_table_column_metadata"] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (Module["_sqlite3_table_column_metadata"] = wasmExports["sqlite3_table_column_metadata"])(
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8
    );
    Module["_sqlite3_extended_result_codes"] = (a0, a1) => (Module["_sqlite3_extended_result_codes"] = wasmExports["sqlite3_extended_result_codes"])(a0, a1);
    Module["_sqlite3_uri_key"] = (a0, a1) => (Module["_sqlite3_uri_key"] = wasmExports["sqlite3_uri_key"])(a0, a1);
    Module["_sqlite3_uri_int64"] = (a0, a1, a2) => (Module["_sqlite3_uri_int64"] = wasmExports["sqlite3_uri_int64"])(a0, a1, a2);
    Module["_sqlite3_db_name"] = (a0, a1) => (Module["_sqlite3_db_name"] = wasmExports["sqlite3_db_name"])(a0, a1);
    Module["_sqlite3_db_filename"] = (a0, a1) => (Module["_sqlite3_db_filename"] = wasmExports["sqlite3_db_filename"])(a0, a1);
    Module["_sqlite3_db_readonly"] = (a0, a1) => (Module["_sqlite3_db_readonly"] = wasmExports["sqlite3_db_readonly"])(a0, a1);
    Module["_sqlite3_compileoption_used"] = (a0) => (Module["_sqlite3_compileoption_used"] = wasmExports["sqlite3_compileoption_used"])(a0);
    Module["_sqlite3_compileoption_get"] = (a0) => (Module["_sqlite3_compileoption_get"] = wasmExports["sqlite3_compileoption_get"])(a0);
    Module["_sqlite3session_diff"] = (a0, a1, a2, a3) => (Module["_sqlite3session_diff"] = wasmExports["sqlite3session_diff"])(a0, a1, a2, a3);
    Module["_sqlite3session_attach"] = (a0, a1) => (Module["_sqlite3session_attach"] = wasmExports["sqlite3session_attach"])(a0, a1);
    Module["_sqlite3session_create"] = (a0, a1, a2) => (Module["_sqlite3session_create"] = wasmExports["sqlite3session_create"])(a0, a1, a2);
    Module["_sqlite3session_delete"] = (a0) => (Module["_sqlite3session_delete"] = wasmExports["sqlite3session_delete"])(a0);
    Module["_sqlite3session_table_filter"] = (a0, a1, a2) => (Module["_sqlite3session_table_filter"] = wasmExports["sqlite3session_table_filter"])(a0, a1, a2);
    Module["_sqlite3session_changeset"] = (a0, a1, a2) => (Module["_sqlite3session_changeset"] = wasmExports["sqlite3session_changeset"])(a0, a1, a2);
    Module["_sqlite3session_changeset_strm"] = (a0, a1, a2) => (Module["_sqlite3session_changeset_strm"] = wasmExports["sqlite3session_changeset_strm"])(a0, a1, a2);
    Module["_sqlite3session_patchset_strm"] = (a0, a1, a2) => (Module["_sqlite3session_patchset_strm"] = wasmExports["sqlite3session_patchset_strm"])(a0, a1, a2);
    Module["_sqlite3session_patchset"] = (a0, a1, a2) => (Module["_sqlite3session_patchset"] = wasmExports["sqlite3session_patchset"])(a0, a1, a2);
    Module["_sqlite3session_enable"] = (a0, a1) => (Module["_sqlite3session_enable"] = wasmExports["sqlite3session_enable"])(a0, a1);
    Module["_sqlite3session_indirect"] = (a0, a1) => (Module["_sqlite3session_indirect"] = wasmExports["sqlite3session_indirect"])(a0, a1);
    Module["_sqlite3session_isempty"] = (a0) => (Module["_sqlite3session_isempty"] = wasmExports["sqlite3session_isempty"])(a0);
    Module["_sqlite3session_memory_used"] = (a0) => (Module["_sqlite3session_memory_used"] = wasmExports["sqlite3session_memory_used"])(a0);
    Module["_sqlite3session_object_config"] = (a0, a1, a2) => (Module["_sqlite3session_object_config"] = wasmExports["sqlite3session_object_config"])(a0, a1, a2);
    Module["_sqlite3session_changeset_size"] = (a0) => (Module["_sqlite3session_changeset_size"] = wasmExports["sqlite3session_changeset_size"])(a0);
    Module["_sqlite3changeset_start"] = (a0, a1, a2) => (Module["_sqlite3changeset_start"] = wasmExports["sqlite3changeset_start"])(a0, a1, a2);
    Module["_sqlite3changeset_start_v2"] = (a0, a1, a2, a3) => (Module["_sqlite3changeset_start_v2"] = wasmExports["sqlite3changeset_start_v2"])(a0, a1, a2, a3);
    Module["_sqlite3changeset_start_strm"] = (a0, a1, a2) => (Module["_sqlite3changeset_start_strm"] = wasmExports["sqlite3changeset_start_strm"])(a0, a1, a2);
    Module["_sqlite3changeset_start_v2_strm"] = (a0, a1, a2, a3) => (Module["_sqlite3changeset_start_v2_strm"] = wasmExports["sqlite3changeset_start_v2_strm"])(a0, a1, a2, a3);
    Module["_sqlite3changeset_next"] = (a0) => (Module["_sqlite3changeset_next"] = wasmExports["sqlite3changeset_next"])(a0);
    Module["_sqlite3changeset_op"] = (a0, a1, a2, a3, a4) => (Module["_sqlite3changeset_op"] = wasmExports["sqlite3changeset_op"])(a0, a1, a2, a3, a4);
    Module["_sqlite3changeset_pk"] = (a0, a1, a2) => (Module["_sqlite3changeset_pk"] = wasmExports["sqlite3changeset_pk"])(a0, a1, a2);
    Module["_sqlite3changeset_old"] = (a0, a1, a2) => (Module["_sqlite3changeset_old"] = wasmExports["sqlite3changeset_old"])(a0, a1, a2);
    Module["_sqlite3changeset_new"] = (a0, a1, a2) => (Module["_sqlite3changeset_new"] = wasmExports["sqlite3changeset_new"])(a0, a1, a2);
    Module["_sqlite3changeset_conflict"] = (a0, a1, a2) => (Module["_sqlite3changeset_conflict"] = wasmExports["sqlite3changeset_conflict"])(a0, a1, a2);
    Module["_sqlite3changeset_fk_conflicts"] = (a0, a1) => (Module["_sqlite3changeset_fk_conflicts"] = wasmExports["sqlite3changeset_fk_conflicts"])(a0, a1);
    Module["_sqlite3changeset_finalize"] = (a0) => (Module["_sqlite3changeset_finalize"] = wasmExports["sqlite3changeset_finalize"])(a0);
    Module["_sqlite3changeset_invert"] = (a0, a1, a2, a3) => (Module["_sqlite3changeset_invert"] = wasmExports["sqlite3changeset_invert"])(a0, a1, a2, a3);
    Module["_sqlite3changeset_invert_strm"] = (a0, a1, a2, a3) => (Module["_sqlite3changeset_invert_strm"] = wasmExports["sqlite3changeset_invert_strm"])(a0, a1, a2, a3);
    Module["_sqlite3changeset_apply_v2"] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (Module["_sqlite3changeset_apply_v2"] = wasmExports["sqlite3changeset_apply_v2"])(
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8
    );
    Module["_sqlite3changeset_apply"] = (a0, a1, a2, a3, a4, a5) => (Module["_sqlite3changeset_apply"] = wasmExports["sqlite3changeset_apply"])(a0, a1, a2, a3, a4, a5);
    Module["_sqlite3changeset_apply_v2_strm"] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (Module["_sqlite3changeset_apply_v2_strm"] = wasmExports["sqlite3changeset_apply_v2_strm"])(
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8
    );
    Module["_sqlite3changeset_apply_strm"] = (a0, a1, a2, a3, a4, a5) => (Module["_sqlite3changeset_apply_strm"] = wasmExports["sqlite3changeset_apply_strm"])(a0, a1, a2, a3, a4, a5);
    Module["_sqlite3changegroup_new"] = (a0) => (Module["_sqlite3changegroup_new"] = wasmExports["sqlite3changegroup_new"])(a0);
    Module["_sqlite3changegroup_add"] = (a0, a1, a2) => (Module["_sqlite3changegroup_add"] = wasmExports["sqlite3changegroup_add"])(a0, a1, a2);
    Module["_sqlite3changegroup_output"] = (a0, a1, a2) => (Module["_sqlite3changegroup_output"] = wasmExports["sqlite3changegroup_output"])(a0, a1, a2);
    Module["_sqlite3changegroup_add_strm"] = (a0, a1, a2) => (Module["_sqlite3changegroup_add_strm"] = wasmExports["sqlite3changegroup_add_strm"])(a0, a1, a2);
    Module["_sqlite3changegroup_output_strm"] = (a0, a1, a2) => (Module["_sqlite3changegroup_output_strm"] = wasmExports["sqlite3changegroup_output_strm"])(a0, a1, a2);
    Module["_sqlite3changegroup_delete"] = (a0) => (Module["_sqlite3changegroup_delete"] = wasmExports["sqlite3changegroup_delete"])(a0);
    Module["_sqlite3changeset_concat"] = (a0, a1, a2, a3, a4, a5) => (Module["_sqlite3changeset_concat"] = wasmExports["sqlite3changeset_concat"])(a0, a1, a2, a3, a4, a5);
    Module["_sqlite3changeset_concat_strm"] = (a0, a1, a2, a3, a4, a5) => (Module["_sqlite3changeset_concat_strm"] = wasmExports["sqlite3changeset_concat_strm"])(a0, a1, a2, a3, a4, a5);
    Module["_sqlite3session_config"] = (a0, a1) => (Module["_sqlite3session_config"] = wasmExports["sqlite3session_config"])(a0, a1);
    Module["_sqlite3_sourceid"] = () => (Module["_sqlite3_sourceid"] = wasmExports["sqlite3_sourceid"])();
    Module["_sqlite3__wasm_pstack_ptr"] = () => (Module["_sqlite3__wasm_pstack_ptr"] = wasmExports["sqlite3__wasm_pstack_ptr"])();
    Module["_sqlite3__wasm_pstack_restore"] = (a0) => (Module["_sqlite3__wasm_pstack_restore"] = wasmExports["sqlite3__wasm_pstack_restore"])(a0);
    Module["_sqlite3__wasm_pstack_alloc"] = (a0) => (Module["_sqlite3__wasm_pstack_alloc"] = wasmExports["sqlite3__wasm_pstack_alloc"])(a0);
    Module["_sqlite3__wasm_pstack_remaining"] = () => (Module["_sqlite3__wasm_pstack_remaining"] = wasmExports["sqlite3__wasm_pstack_remaining"])();
    Module["_sqlite3__wasm_pstack_quota"] = () => (Module["_sqlite3__wasm_pstack_quota"] = wasmExports["sqlite3__wasm_pstack_quota"])();
    Module["_sqlite3__wasm_db_error"] = (a0, a1, a2) => (Module["_sqlite3__wasm_db_error"] = wasmExports["sqlite3__wasm_db_error"])(a0, a1, a2);
    Module["_sqlite3__wasm_test_struct"] = (a0) => (Module["_sqlite3__wasm_test_struct"] = wasmExports["sqlite3__wasm_test_struct"])(a0);
    Module["_sqlite3__wasm_enum_json"] = () => (Module["_sqlite3__wasm_enum_json"] = wasmExports["sqlite3__wasm_enum_json"])();
    Module["_sqlite3__wasm_vfs_unlink"] = (a0, a1) => (Module["_sqlite3__wasm_vfs_unlink"] = wasmExports["sqlite3__wasm_vfs_unlink"])(a0, a1);
    Module["_sqlite3__wasm_db_vfs"] = (a0, a1) => (Module["_sqlite3__wasm_db_vfs"] = wasmExports["sqlite3__wasm_db_vfs"])(a0, a1);
    Module["_sqlite3__wasm_db_reset"] = (a0) => (Module["_sqlite3__wasm_db_reset"] = wasmExports["sqlite3__wasm_db_reset"])(a0);
    Module["_sqlite3__wasm_db_export_chunked"] = (a0, a1) => (Module["_sqlite3__wasm_db_export_chunked"] = wasmExports["sqlite3__wasm_db_export_chunked"])(a0, a1);
    Module["_sqlite3__wasm_db_serialize"] = (a0, a1, a2, a3, a4) => (Module["_sqlite3__wasm_db_serialize"] = wasmExports["sqlite3__wasm_db_serialize"])(a0, a1, a2, a3, a4);
    Module["_sqlite3__wasm_vfs_create_file"] = (a0, a1, a2, a3) => (Module["_sqlite3__wasm_vfs_create_file"] = wasmExports["sqlite3__wasm_vfs_create_file"])(a0, a1, a2, a3);
    Module["_sqlite3__wasm_posix_create_file"] = (a0, a1, a2) => (Module["_sqlite3__wasm_posix_create_file"] = wasmExports["sqlite3__wasm_posix_create_file"])(a0, a1, a2);
    Module["_sqlite3__wasm_kvvfsMakeKeyOnPstack"] = (a0, a1) => (Module["_sqlite3__wasm_kvvfsMakeKeyOnPstack"] = wasmExports["sqlite3__wasm_kvvfsMakeKeyOnPstack"])(a0, a1);
    Module["_sqlite3__wasm_kvvfs_methods"] = () => (Module["_sqlite3__wasm_kvvfs_methods"] = wasmExports["sqlite3__wasm_kvvfs_methods"])();
    Module["_sqlite3__wasm_vtab_config"] = (a0, a1, a2) => (Module["_sqlite3__wasm_vtab_config"] = wasmExports["sqlite3__wasm_vtab_config"])(a0, a1, a2);
    Module["_sqlite3__wasm_db_config_ip"] = (a0, a1, a2, a3) => (Module["_sqlite3__wasm_db_config_ip"] = wasmExports["sqlite3__wasm_db_config_ip"])(a0, a1, a2, a3);
    Module["_sqlite3__wasm_db_config_pii"] = (a0, a1, a2, a3, a4) => (Module["_sqlite3__wasm_db_config_pii"] = wasmExports["sqlite3__wasm_db_config_pii"])(a0, a1, a2, a3, a4);
    Module["_sqlite3__wasm_db_config_s"] = (a0, a1, a2) => (Module["_sqlite3__wasm_db_config_s"] = wasmExports["sqlite3__wasm_db_config_s"])(a0, a1, a2);
    Module["_sqlite3__wasm_config_i"] = (a0, a1) => (Module["_sqlite3__wasm_config_i"] = wasmExports["sqlite3__wasm_config_i"])(a0, a1);
    Module["_sqlite3__wasm_config_ii"] = (a0, a1, a2) => (Module["_sqlite3__wasm_config_ii"] = wasmExports["sqlite3__wasm_config_ii"])(a0, a1, a2);
    Module["_sqlite3__wasm_config_j"] = (a0, a1) => (Module["_sqlite3__wasm_config_j"] = wasmExports["sqlite3__wasm_config_j"])(a0, a1);
    Module["_sqlite3__wasm_qfmt_token"] = (a0, a1) => (Module["_sqlite3__wasm_qfmt_token"] = wasmExports["sqlite3__wasm_qfmt_token"])(a0, a1);
    Module["_sqlite3__wasm_init_wasmfs"] = (a0) => (Module["_sqlite3__wasm_init_wasmfs"] = wasmExports["sqlite3__wasm_init_wasmfs"])(a0);
    Module["_sqlite3__wasm_test_intptr"] = (a0) => (Module["_sqlite3__wasm_test_intptr"] = wasmExports["sqlite3__wasm_test_intptr"])(a0);
    Module["_sqlite3__wasm_test_voidptr"] = (a0) => (Module["_sqlite3__wasm_test_voidptr"] = wasmExports["sqlite3__wasm_test_voidptr"])(a0);
    Module["_sqlite3__wasm_test_int64_max"] = () => (Module["_sqlite3__wasm_test_int64_max"] = wasmExports["sqlite3__wasm_test_int64_max"])();
    Module["_sqlite3__wasm_test_int64_min"] = () => (Module["_sqlite3__wasm_test_int64_min"] = wasmExports["sqlite3__wasm_test_int64_min"])();
    Module["_sqlite3__wasm_test_int64_times2"] = (a0) => (Module["_sqlite3__wasm_test_int64_times2"] = wasmExports["sqlite3__wasm_test_int64_times2"])(a0);
    Module["_sqlite3__wasm_test_int64_minmax"] = (a0, a1) => (Module["_sqlite3__wasm_test_int64_minmax"] = wasmExports["sqlite3__wasm_test_int64_minmax"])(a0, a1);
    Module["_sqlite3__wasm_test_int64ptr"] = (a0) => (Module["_sqlite3__wasm_test_int64ptr"] = wasmExports["sqlite3__wasm_test_int64ptr"])(a0);
    Module["_sqlite3__wasm_test_stack_overflow"] = (a0) => (Module["_sqlite3__wasm_test_stack_overflow"] = wasmExports["sqlite3__wasm_test_stack_overflow"])(a0);
    Module["_sqlite3__wasm_test_str_hello"] = (a0) => (Module["_sqlite3__wasm_test_str_hello"] = wasmExports["sqlite3__wasm_test_str_hello"])(a0);
    Module["_sqlite3__wasm_SQLTester_strglob"] = (a0, a1) => (Module["_sqlite3__wasm_SQLTester_strglob"] = wasmExports["sqlite3__wasm_SQLTester_strglob"])(a0, a1);
    Module["_malloc"] = (a0) => (Module["_malloc"] = wasmExports["malloc"])(a0);
    Module["_free"] = (a0) => (Module["_free"] = wasmExports["free"])(a0);
    Module["_realloc"] = (a0, a1) => (Module["_realloc"] = wasmExports["realloc"])(a0, a1);
    var _emscripten_builtin_memalign = (a0, a1) => (_emscripten_builtin_memalign = wasmExports["emscripten_builtin_memalign"])(a0, a1);
    Module["wasmMemory"] = wasmMemory;
    var calledRun;
    var calledPrerun;
    dependenciesFulfilled = function runCaller() {
      if (!calledRun) run();
      if (!calledRun) dependenciesFulfilled = runCaller;
    };
    function run() {
      if (runDependencies > 0) {
        return;
      }
      if (!calledPrerun) {
        calledPrerun = 1;
        preRun();
        if (runDependencies > 0) {
          return;
        }
      }
      function doRun() {
        if (calledRun) return;
        calledRun = 1;
        Module["calledRun"] = 1;
        if (ABORT) return;
        initRuntime();
        readyPromiseResolve(Module);
        Module["onRuntimeInitialized"]?.();
        postRun();
      }
      if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(() => {
          setTimeout(() => Module["setStatus"](""), 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
    }
    if (Module["preInit"]) {
      if (typeof Module["preInit"] == "function")
        Module["preInit"] = [Module["preInit"]];
      while (Module["preInit"].length > 0) {
        Module["preInit"].pop()();
      }
    }
    run();
    Module.runSQLite3PostLoadInit = function(EmscriptenModule) {
      globalThis.sqlite3ApiBootstrap = function sqlite3ApiBootstrap(apiConfig = globalThis.sqlite3ApiConfig || sqlite3ApiBootstrap.defaultConfig) {
        if (sqlite3ApiBootstrap.sqlite3) {
          (sqlite3ApiBootstrap.sqlite3.config || console).warn(
            "sqlite3ApiBootstrap() called multiple times.",
            "Config and external initializers are ignored on calls after the first."
          );
          return sqlite3ApiBootstrap.sqlite3;
        }
        const config = Object.assign(
          /* @__PURE__ */ Object.create(null),
          {
            exports: void 0,
            memory: void 0,
            bigIntEnabled: (() => {
              if ("undefined" !== typeof Module) {
                if (!!Module.HEAPU64) return true;
              }
              return !!globalThis.BigInt64Array;
            })(),
            debug: console.debug.bind(console),
            warn: console.warn.bind(console),
            error: console.error.bind(console),
            log: console.log.bind(console),
            wasmfsOpfsDir: "/opfs",
            useStdAlloc: false
          },
          apiConfig || {}
        );
        Object.assign(
          config,
          {
            allocExportName: config.useStdAlloc ? "malloc" : "sqlite3_malloc",
            deallocExportName: config.useStdAlloc ? "free" : "sqlite3_free",
            reallocExportName: config.useStdAlloc ? "realloc" : "sqlite3_realloc"
          },
          config
        );
        ["exports", "memory", "wasmfsOpfsDir"].forEach((k) => {
          if ("function" === typeof config[k]) {
            config[k] = config[k]();
          }
        });
        delete globalThis.sqlite3ApiConfig;
        delete sqlite3ApiBootstrap.defaultConfig;
        const capi = /* @__PURE__ */ Object.create(null);
        const wasm = /* @__PURE__ */ Object.create(null);
        const __rcStr = (rc) => {
          return capi.sqlite3_js_rc_str && capi.sqlite3_js_rc_str(rc) || "Unknown result code #" + rc;
        };
        const __isInt = (n) => "number" === typeof n && n === (n | 0);
        class SQLite3Error extends Error {
          constructor(...args) {
            let rc;
            if (args.length) {
              if (__isInt(args[0])) {
                rc = args[0];
                if (1 === args.length) {
                  super(__rcStr(args[0]));
                } else {
                  const rcStr = __rcStr(rc);
                  if ("object" === typeof args[1]) {
                    super(rcStr, args[1]);
                  } else {
                    args[0] = rcStr + ":";
                    super(args.join(" "));
                  }
                }
              } else {
                if (2 === args.length && "object" === typeof args[1]) {
                  super(...args);
                } else {
                  super(args.join(" "));
                }
              }
            }
            this.resultCode = rc || capi.SQLITE_ERROR;
            this.name = "SQLite3Error";
          }
        }
        SQLite3Error.toss = (...args) => {
          throw new SQLite3Error(...args);
        };
        const toss3 = SQLite3Error.toss;
        if (config.wasmfsOpfsDir && !/^\/[^/]+$/.test(config.wasmfsOpfsDir)) {
          toss3(
            "config.wasmfsOpfsDir must be falsy or in the form '/dir-name'."
          );
        }
        const isInt32 = (n) => {
          return "bigint" !== typeof n && !!(n === (n | 0) && n <= 2147483647 && n >= -2147483648);
        };
        const bigIntFits64 = function f(b) {
          if (!f._max) {
            f._max = BigInt("0x7fffffffffffffff");
            f._min = ~f._max;
          }
          return b >= f._min && b <= f._max;
        };
        const bigIntFits32 = (b) => b >= -0x7fffffffn - 1n && b <= 0x7fffffffn;
        const bigIntFitsDouble = function f(b) {
          if (!f._min) {
            f._min = Number.MIN_SAFE_INTEGER;
            f._max = Number.MAX_SAFE_INTEGER;
          }
          return b >= f._min && b <= f._max;
        };
        const isTypedArray = (v2) => {
          return v2 && v2.constructor && isInt32(v2.constructor.BYTES_PER_ELEMENT) ? v2 : false;
        };
        const __SAB = "undefined" === typeof SharedArrayBuffer ? function() {
        } : SharedArrayBuffer;
        const isSharedTypedArray = (aTypedArray) => aTypedArray.buffer instanceof __SAB;
        const typedArrayPart = (aTypedArray, begin, end) => {
          return isSharedTypedArray(aTypedArray) ? aTypedArray.slice(begin, end) : aTypedArray.subarray(begin, end);
        };
        const isBindableTypedArray = (v2) => {
          return v2 && (v2 instanceof Uint8Array || v2 instanceof Int8Array || v2 instanceof ArrayBuffer);
        };
        const isSQLableTypedArray = (v2) => {
          return v2 && (v2 instanceof Uint8Array || v2 instanceof Int8Array || v2 instanceof ArrayBuffer);
        };
        const affirmBindableTypedArray = (v2) => {
          return isBindableTypedArray(v2) || toss3("Value is not of a supported TypedArray type.");
        };
        const utf8Decoder = new TextDecoder("utf-8");
        const typedArrayToString = function(typedArray, begin, end) {
          return utf8Decoder.decode(typedArrayPart(typedArray, begin, end));
        };
        const flexibleString = function(v2) {
          if (isSQLableTypedArray(v2)) {
            return typedArrayToString(
              v2 instanceof ArrayBuffer ? new Uint8Array(v2) : v2
            );
          } else if (Array.isArray(v2)) return v2.join("");
          else if (wasm.isPtr(v2)) v2 = wasm.cstrToJs(v2);
          return v2;
        };
        class WasmAllocError extends Error {
          constructor(...args) {
            if (2 === args.length && "object" === typeof args[1]) {
              super(...args);
            } else if (args.length) {
              super(args.join(" "));
            } else {
              super("Allocation failed.");
            }
            this.resultCode = capi.SQLITE_NOMEM;
            this.name = "WasmAllocError";
          }
        }
        WasmAllocError.toss = (...args) => {
          throw new WasmAllocError(...args);
        };
        Object.assign(capi, {
          sqlite3_bind_blob: void 0,
          sqlite3_bind_text: void 0,
          sqlite3_create_function_v2: (pDb2, funcName, nArg, eTextRep, pApp, xFunc, xStep, xFinal, xDestroy) => {
          },
          sqlite3_create_function: (pDb2, funcName, nArg, eTextRep, pApp, xFunc, xStep, xFinal) => {
          },
          sqlite3_create_window_function: (pDb2, funcName, nArg, eTextRep, pApp, xStep, xFinal, xValue, xInverse, xDestroy) => {
          },
          sqlite3_prepare_v3: (dbPtr, sql2, sqlByteLen, prepFlags, stmtPtrPtr, strPtrPtr) => {
          },
          sqlite3_prepare_v2: (dbPtr, sql2, sqlByteLen, stmtPtrPtr, strPtrPtr) => {
          },
          sqlite3_exec: (pDb2, sql2, callback, pVoid, pErrMsg) => {
          },
          sqlite3_randomness: (n, outPtr) => {
          }
        });
        const util = {
          affirmBindableTypedArray,
          flexibleString,
          bigIntFits32,
          bigIntFits64,
          bigIntFitsDouble,
          isBindableTypedArray,
          isInt32,
          isSQLableTypedArray,
          isTypedArray,
          typedArrayToString,
          isUIThread: () => globalThis.window === globalThis && !!globalThis.document,
          isSharedTypedArray,
          toss: function(...args) {
            throw new Error(args.join(" "));
          },
          toss3,
          typedArrayPart,
          affirmDbHeader: function(bytes) {
            if (bytes instanceof ArrayBuffer) bytes = new Uint8Array(bytes);
            const header = "SQLite format 3";
            if (header.length > bytes.byteLength) {
              toss3("Input does not contain an SQLite3 database header.");
            }
            for (let i = 0; i < header.length; ++i) {
              if (header.charCodeAt(i) !== bytes[i]) {
                toss3("Input does not contain an SQLite3 database header.");
              }
            }
          },
          affirmIsDb: function(bytes) {
            if (bytes instanceof ArrayBuffer) bytes = new Uint8Array(bytes);
            const n = bytes.byteLength;
            if (n < 512 || n % 512 !== 0) {
              toss3("Byte array size", n, "is invalid for an SQLite3 db.");
            }
            util.affirmDbHeader(bytes);
          }
        };
        Object.assign(wasm, {
          ptrSizeof: config.wasmPtrSizeof || 4,
          ptrIR: config.wasmPtrIR || "i32",
          bigIntEnabled: !!config.bigIntEnabled,
          exports: config.exports || toss3("Missing API config.exports (WASM module exports)."),
          memory: config.memory || config.exports["memory"] || toss3(
            "API config object requires a WebAssembly.Memory object",
            "in either config.exports.memory (exported)",
            "or config.memory (imported)."
          ),
          alloc: void 0,
          realloc: void 0,
          dealloc: void 0
        });
        wasm.allocFromTypedArray = function(srcTypedArray) {
          if (srcTypedArray instanceof ArrayBuffer) {
            srcTypedArray = new Uint8Array(srcTypedArray);
          }
          affirmBindableTypedArray(srcTypedArray);
          const pRet = wasm.alloc(srcTypedArray.byteLength || 1);
          wasm.heapForSize(srcTypedArray.constructor).set(srcTypedArray.byteLength ? srcTypedArray : [0], pRet);
          return pRet;
        };
        {
          const keyAlloc = config.allocExportName, keyDealloc = config.deallocExportName, keyRealloc = config.reallocExportName;
          for (const key of [keyAlloc, keyDealloc, keyRealloc]) {
            const f = wasm.exports[key];
            if (!(f instanceof Function))
              toss3("Missing required exports[", key, "] function.");
          }
          wasm.alloc = function f(n) {
            return f.impl(n) || WasmAllocError.toss("Failed to allocate", n, " bytes.");
          };
          wasm.alloc.impl = wasm.exports[keyAlloc];
          wasm.realloc = function f(m, n) {
            const m2 = f.impl(m, n);
            return n ? m2 || WasmAllocError.toss("Failed to reallocate", n, " bytes.") : 0;
          };
          wasm.realloc.impl = wasm.exports[keyRealloc];
          wasm.dealloc = wasm.exports[keyDealloc];
        }
        wasm.compileOptionUsed = function f(optName) {
          if (!arguments.length) {
            if (f._result) return f._result;
            else if (!f._opt) {
              f._rx = /^([^=]+)=(.+)/;
              f._rxInt = /^-?\d+$/;
              f._opt = function(opt, rv) {
                const m = f._rx.exec(opt);
                rv[0] = m ? m[1] : opt;
                rv[1] = m ? f._rxInt.test(m[2]) ? +m[2] : m[2] : true;
              };
            }
            const rc = {}, ov = [0, 0];
            let i = 0, k;
            while (k = capi.sqlite3_compileoption_get(i++)) {
              f._opt(k, ov);
              rc[ov[0]] = ov[1];
            }
            return f._result = rc;
          } else if (Array.isArray(optName)) {
            const rc = {};
            optName.forEach((v2) => {
              rc[v2] = capi.sqlite3_compileoption_used(v2);
            });
            return rc;
          } else if ("object" === typeof optName) {
            Object.keys(optName).forEach((k) => {
              optName[k] = capi.sqlite3_compileoption_used(k);
            });
            return optName;
          }
          return "string" === typeof optName ? !!capi.sqlite3_compileoption_used(optName) : false;
        };
        wasm.pstack = Object.assign(/* @__PURE__ */ Object.create(null), {
          restore: wasm.exports.sqlite3__wasm_pstack_restore,
          alloc: function(n) {
            if ("string" === typeof n && !(n = wasm.sizeofIR(n))) {
              WasmAllocError.toss(
                "Invalid value for pstack.alloc(",
                arguments[0],
                ")"
              );
            }
            return wasm.exports.sqlite3__wasm_pstack_alloc(n) || WasmAllocError.toss(
              "Could not allocate",
              n,
              "bytes from the pstack."
            );
          },
          allocChunks: function(n, sz) {
            if ("string" === typeof sz && !(sz = wasm.sizeofIR(sz))) {
              WasmAllocError.toss(
                "Invalid size value for allocChunks(",
                arguments[1],
                ")"
              );
            }
            const mem = wasm.pstack.alloc(n * sz);
            const rc = [];
            let i = 0, offset = 0;
            for (; i < n; ++i, offset += sz) rc.push(mem + offset);
            return rc;
          },
          allocPtr: (n = 1, safePtrSize = true) => {
            return 1 === n ? wasm.pstack.alloc(safePtrSize ? 8 : wasm.ptrSizeof) : wasm.pstack.allocChunks(n, safePtrSize ? 8 : wasm.ptrSizeof);
          },
          call: function(f) {
            const stackPos = wasm.pstack.pointer;
            try {
              return f(sqlite3);
            } finally {
              wasm.pstack.restore(stackPos);
            }
          }
        });
        Object.defineProperties(wasm.pstack, {
          pointer: {
            configurable: false,
            iterable: true,
            writeable: false,
            get: wasm.exports.sqlite3__wasm_pstack_ptr
          },
          quota: {
            configurable: false,
            iterable: true,
            writeable: false,
            get: wasm.exports.sqlite3__wasm_pstack_quota
          },
          remaining: {
            configurable: false,
            iterable: true,
            writeable: false,
            get: wasm.exports.sqlite3__wasm_pstack_remaining
          }
        });
        capi.sqlite3_randomness = (...args) => {
          if (1 === args.length && util.isTypedArray(args[0]) && 1 === args[0].BYTES_PER_ELEMENT) {
            const ta = args[0];
            if (0 === ta.byteLength) {
              wasm.exports.sqlite3_randomness(0, 0);
              return ta;
            }
            const stack = wasm.pstack.pointer;
            try {
              let n = ta.byteLength, offset = 0;
              const r = wasm.exports.sqlite3_randomness;
              const heap = wasm.heap8u();
              const nAlloc = n < 512 ? n : 512;
              const ptr = wasm.pstack.alloc(nAlloc);
              do {
                const j = n > nAlloc ? nAlloc : n;
                r(j, ptr);
                ta.set(typedArrayPart(heap, ptr, ptr + j), offset);
                n -= j;
                offset += j;
              } while (n > 0);
            } catch (e) {
              console.error(
                "Highly unexpected (and ignored!) exception in sqlite3_randomness():",
                e
              );
            } finally {
              wasm.pstack.restore(stack);
            }
            return ta;
          }
          wasm.exports.sqlite3_randomness(...args);
        };
        let __wasmfsOpfsDir = void 0;
        capi.sqlite3_wasmfs_opfs_dir = function() {
          if (void 0 !== __wasmfsOpfsDir) return __wasmfsOpfsDir;
          const pdir = config.wasmfsOpfsDir;
          if (!pdir || !globalThis.FileSystemHandle || !globalThis.FileSystemDirectoryHandle || !globalThis.FileSystemFileHandle) {
            return __wasmfsOpfsDir = "";
          }
          try {
            if (pdir && 0 === wasm.xCallWrapped(
              "sqlite3__wasm_init_wasmfs",
              "i32",
              ["string"],
              pdir
            )) {
              return __wasmfsOpfsDir = pdir;
            } else {
              return __wasmfsOpfsDir = "";
            }
          } catch (e) {
            return __wasmfsOpfsDir = "";
          }
        };
        capi.sqlite3_wasmfs_filename_is_persistent = function(name) {
          const p = capi.sqlite3_wasmfs_opfs_dir();
          return p && name ? name.startsWith(p + "/") : false;
        };
        capi.sqlite3_js_db_uses_vfs = function(pDb2, vfsName, dbName = 0) {
          try {
            const pK = capi.sqlite3_vfs_find(vfsName);
            if (!pK) return false;
            else if (!pDb2) {
              return pK === capi.sqlite3_vfs_find(0) ? pK : false;
            } else {
              return pK === capi.sqlite3_js_db_vfs(pDb2, dbName) ? pK : false;
            }
          } catch (e) {
            return false;
          }
        };
        capi.sqlite3_js_vfs_list = function() {
          const rc = [];
          let pVfs = capi.sqlite3_vfs_find(0);
          while (pVfs) {
            const oVfs = new capi.sqlite3_vfs(pVfs);
            rc.push(wasm.cstrToJs(oVfs.$zName));
            pVfs = oVfs.$pNext;
            oVfs.dispose();
          }
          return rc;
        };
        capi.sqlite3_js_db_export = function(pDb2, schema = 0) {
          pDb2 = wasm.xWrap.testConvertArg("sqlite3*", pDb2);
          if (!pDb2) toss3("Invalid sqlite3* argument.");
          if (!wasm.bigIntEnabled) toss3("BigInt64 support is not enabled.");
          const scope = wasm.scopedAllocPush();
          let pOut;
          try {
            const pSize = wasm.scopedAlloc(8 + wasm.ptrSizeof);
            const ppOut = pSize + 8;
            const zSchema = schema ? wasm.isPtr(schema) ? schema : wasm.scopedAllocCString("" + schema) : 0;
            let rc = wasm.exports.sqlite3__wasm_db_serialize(
              pDb2,
              zSchema,
              ppOut,
              pSize,
              0
            );
            if (rc) {
              toss3(
                "Database serialization failed with code",
                sqlite3.capi.sqlite3_js_rc_str(rc)
              );
            }
            pOut = wasm.peekPtr(ppOut);
            const nOut = wasm.peek(pSize, "i64");
            rc = nOut ? wasm.heap8u().slice(pOut, pOut + Number(nOut)) : new Uint8Array();
            return rc;
          } finally {
            if (pOut) wasm.exports.sqlite3_free(pOut);
            wasm.scopedAllocPop(scope);
          }
        };
        capi.sqlite3_js_db_vfs = (dbPointer, dbName = 0) => util.sqlite3__wasm_db_vfs(dbPointer, dbName);
        capi.sqlite3_js_aggregate_context = (pCtx, n) => {
          return capi.sqlite3_aggregate_context(pCtx, n) || (n ? WasmAllocError.toss(
            "Cannot allocate",
            n,
            "bytes for sqlite3_aggregate_context()"
          ) : 0);
        };
        capi.sqlite3_js_posix_create_file = function(filename, data, dataLen) {
          let pData;
          if (data && wasm.isPtr(data)) {
            pData = data;
          } else if (data instanceof ArrayBuffer || data instanceof Uint8Array) {
            pData = wasm.allocFromTypedArray(data);
            if (arguments.length < 3 || !util.isInt32(dataLen) || dataLen < 0) {
              dataLen = data.byteLength;
            }
          } else {
            SQLite3Error.toss(
              "Invalid 2nd argument for sqlite3_js_posix_create_file()."
            );
          }
          try {
            if (!util.isInt32(dataLen) || dataLen < 0) {
              SQLite3Error.toss(
                "Invalid 3rd argument for sqlite3_js_posix_create_file()."
              );
            }
            const rc = util.sqlite3__wasm_posix_create_file(
              filename,
              pData,
              dataLen
            );
            if (rc)
              SQLite3Error.toss(
                "Creation of file failed with sqlite3 result code",
                capi.sqlite3_js_rc_str(rc)
              );
          } finally {
            wasm.dealloc(pData);
          }
        };
        capi.sqlite3_js_vfs_create_file = function(vfs, filename, data, dataLen) {
          config.warn(
            "sqlite3_js_vfs_create_file() is deprecated and",
            "should be avoided because it can lead to C-level crashes.",
            "See its documentation for alternative options."
          );
          let pData;
          if (data) {
            if (wasm.isPtr(data)) {
              pData = data;
            } else if (data instanceof ArrayBuffer) {
              data = new Uint8Array(data);
            }
            if (data instanceof Uint8Array) {
              pData = wasm.allocFromTypedArray(data);
              if (arguments.length < 4 || !util.isInt32(dataLen) || dataLen < 0) {
                dataLen = data.byteLength;
              }
            } else {
              SQLite3Error.toss(
                "Invalid 3rd argument type for sqlite3_js_vfs_create_file()."
              );
            }
          } else {
            pData = 0;
          }
          if (!util.isInt32(dataLen) || dataLen < 0) {
            wasm.dealloc(pData);
            SQLite3Error.toss(
              "Invalid 4th argument for sqlite3_js_vfs_create_file()."
            );
          }
          try {
            const rc = util.sqlite3__wasm_vfs_create_file(
              vfs,
              filename,
              pData,
              dataLen
            );
            if (rc)
              SQLite3Error.toss(
                "Creation of file failed with sqlite3 result code",
                capi.sqlite3_js_rc_str(rc)
              );
          } finally {
            wasm.dealloc(pData);
          }
        };
        capi.sqlite3_js_sql_to_string = (sql2) => {
          if ("string" === typeof sql2) {
            return sql2;
          }
          const x = flexibleString(v);
          return x === v ? void 0 : x;
        };
        if (util.isUIThread()) {
          const __kvvfsInfo = function(which) {
            const rc = /* @__PURE__ */ Object.create(null);
            rc.prefix = "kvvfs-" + which;
            rc.stores = [];
            if ("session" === which || "" === which)
              rc.stores.push(globalThis.sessionStorage);
            if ("local" === which || "" === which)
              rc.stores.push(globalThis.localStorage);
            return rc;
          };
          capi.sqlite3_js_kvvfs_clear = function(which = "") {
            let rc = 0;
            const kvinfo = __kvvfsInfo(which);
            kvinfo.stores.forEach((s) => {
              const toRm = [];
              let i;
              for (i = 0; i < s.length; ++i) {
                const k = s.key(i);
                if (k.startsWith(kvinfo.prefix)) toRm.push(k);
              }
              toRm.forEach((kk) => s.removeItem(kk));
              rc += toRm.length;
            });
            return rc;
          };
          capi.sqlite3_js_kvvfs_size = function(which = "") {
            let sz = 0;
            const kvinfo = __kvvfsInfo(which);
            kvinfo.stores.forEach((s) => {
              let i;
              for (i = 0; i < s.length; ++i) {
                const k = s.key(i);
                if (k.startsWith(kvinfo.prefix)) {
                  sz += k.length;
                  sz += s.getItem(k).length;
                }
              }
            });
            return sz * 2;
          };
        }
        capi.sqlite3_db_config = function(pDb2, op, ...args) {
          switch (op) {
            case capi.SQLITE_DBCONFIG_ENABLE_FKEY:
            case capi.SQLITE_DBCONFIG_ENABLE_TRIGGER:
            case capi.SQLITE_DBCONFIG_ENABLE_FTS3_TOKENIZER:
            case capi.SQLITE_DBCONFIG_ENABLE_LOAD_EXTENSION:
            case capi.SQLITE_DBCONFIG_NO_CKPT_ON_CLOSE:
            case capi.SQLITE_DBCONFIG_ENABLE_QPSG:
            case capi.SQLITE_DBCONFIG_TRIGGER_EQP:
            case capi.SQLITE_DBCONFIG_RESET_DATABASE:
            case capi.SQLITE_DBCONFIG_DEFENSIVE:
            case capi.SQLITE_DBCONFIG_WRITABLE_SCHEMA:
            case capi.SQLITE_DBCONFIG_LEGACY_ALTER_TABLE:
            case capi.SQLITE_DBCONFIG_DQS_DML:
            case capi.SQLITE_DBCONFIG_DQS_DDL:
            case capi.SQLITE_DBCONFIG_ENABLE_VIEW:
            case capi.SQLITE_DBCONFIG_LEGACY_FILE_FORMAT:
            case capi.SQLITE_DBCONFIG_TRUSTED_SCHEMA:
            case capi.SQLITE_DBCONFIG_STMT_SCANSTATUS:
            case capi.SQLITE_DBCONFIG_REVERSE_SCANORDER:
            case capi.SQLITE_DBCONFIG_ENABLE_ATTACH_CREATE:
            case capi.SQLITE_DBCONFIG_ENABLE_ATTACH_WRITE:
            case capi.SQLITE_DBCONFIG_ENABLE_COMMENTS:
              if (!this.ip) {
                this.ip = wasm.xWrap("sqlite3__wasm_db_config_ip", "int", [
                  "sqlite3*",
                  "int",
                  "int",
                  "*"
                ]);
              }
              return this.ip(pDb2, op, args[0], args[1] || 0);
            case capi.SQLITE_DBCONFIG_LOOKASIDE:
              if (!this.pii) {
                this.pii = wasm.xWrap("sqlite3__wasm_db_config_pii", "int", [
                  "sqlite3*",
                  "int",
                  "*",
                  "int",
                  "int"
                ]);
              }
              return this.pii(pDb2, op, args[0], args[1], args[2]);
            case capi.SQLITE_DBCONFIG_MAINDBNAME:
              if (!this.s) {
                this.s = wasm.xWrap("sqlite3__wasm_db_config_s", "int", [
                  "sqlite3*",
                  "int",
                  "string:static"
                ]);
              }
              return this.s(pDb2, op, args[0]);
            default:
              return capi.SQLITE_MISUSE;
          }
        }.bind(/* @__PURE__ */ Object.create(null));
        capi.sqlite3_value_to_js = function(pVal, throwIfCannotConvert = true) {
          let arg;
          const valType = capi.sqlite3_value_type(pVal);
          switch (valType) {
            case capi.SQLITE_INTEGER:
              if (wasm.bigIntEnabled) {
                arg = capi.sqlite3_value_int64(pVal);
                if (util.bigIntFitsDouble(arg)) arg = Number(arg);
              } else arg = capi.sqlite3_value_double(pVal);
              break;
            case capi.SQLITE_FLOAT:
              arg = capi.sqlite3_value_double(pVal);
              break;
            case capi.SQLITE_TEXT:
              arg = capi.sqlite3_value_text(pVal);
              break;
            case capi.SQLITE_BLOB: {
              const n = capi.sqlite3_value_bytes(pVal);
              const pBlob = capi.sqlite3_value_blob(pVal);
              if (n && !pBlob)
                sqlite3.WasmAllocError.toss(
                  "Cannot allocate memory for blob argument of",
                  n,
                  "byte(s)"
                );
              arg = n ? wasm.heap8u().slice(pBlob, pBlob + Number(n)) : null;
              break;
            }
            case capi.SQLITE_NULL:
              arg = null;
              break;
            default:
              if (throwIfCannotConvert) {
                toss3(
                  capi.SQLITE_MISMATCH,
                  "Unhandled sqlite3_value_type():",
                  valType
                );
              }
              arg = void 0;
          }
          return arg;
        };
        capi.sqlite3_values_to_js = function(argc, pArgv, throwIfCannotConvert = true) {
          let i;
          const tgt = [];
          for (i = 0; i < argc; ++i) {
            tgt.push(
              capi.sqlite3_value_to_js(
                wasm.peekPtr(pArgv + wasm.ptrSizeof * i),
                throwIfCannotConvert
              )
            );
          }
          return tgt;
        };
        capi.sqlite3_result_error_js = function(pCtx, e) {
          if (e instanceof WasmAllocError) {
            capi.sqlite3_result_error_nomem(pCtx);
          } else {
            capi.sqlite3_result_error(pCtx, "" + e, -1);
          }
        };
        capi.sqlite3_result_js = function(pCtx, val) {
          if (val instanceof Error) {
            capi.sqlite3_result_error_js(pCtx, val);
            return;
          }
          try {
            switch (typeof val) {
              case "undefined":
                break;
              case "boolean":
                capi.sqlite3_result_int(pCtx, val ? 1 : 0);
                break;
              case "bigint":
                if (util.bigIntFits32(val)) {
                  capi.sqlite3_result_int(pCtx, Number(val));
                } else if (util.bigIntFitsDouble(val)) {
                  capi.sqlite3_result_double(pCtx, Number(val));
                } else if (wasm.bigIntEnabled) {
                  if (util.bigIntFits64(val))
                    capi.sqlite3_result_int64(pCtx, val);
                  else
                    toss3(
                      "BigInt value",
                      val.toString(),
                      "is too BigInt for int64."
                    );
                } else {
                  toss3("BigInt value", val.toString(), "is too BigInt.");
                }
                break;
              case "number": {
                let f;
                if (util.isInt32(val)) {
                  f = capi.sqlite3_result_int;
                } else if (wasm.bigIntEnabled && Number.isInteger(val) && util.bigIntFits64(BigInt(val))) {
                  f = capi.sqlite3_result_int64;
                } else {
                  f = capi.sqlite3_result_double;
                }
                f(pCtx, val);
                break;
              }
              case "string": {
                const [p, n] = wasm.allocCString(val, true);
                capi.sqlite3_result_text(pCtx, p, n, capi.SQLITE_WASM_DEALLOC);
                break;
              }
              case "object":
                if (null === val) {
                  capi.sqlite3_result_null(pCtx);
                  break;
                } else if (util.isBindableTypedArray(val)) {
                  const pBlob = wasm.allocFromTypedArray(val);
                  capi.sqlite3_result_blob(
                    pCtx,
                    pBlob,
                    val.byteLength,
                    capi.SQLITE_WASM_DEALLOC
                  );
                  break;
                }
              default:
                toss3(
                  "Don't not how to handle this UDF result value:",
                  typeof val,
                  val
                );
            }
          } catch (e) {
            capi.sqlite3_result_error_js(pCtx, e);
          }
        };
        capi.sqlite3_column_js = function(pStmt, iCol, throwIfCannotConvert = true) {
          const v2 = capi.sqlite3_column_value(pStmt, iCol);
          return 0 === v2 ? void 0 : capi.sqlite3_value_to_js(v2, throwIfCannotConvert);
        };
        const __newOldValue = function(pObj, iCol, impl) {
          impl = capi[impl];
          if (!this.ptr) this.ptr = wasm.allocPtr();
          else wasm.pokePtr(this.ptr, 0);
          const rc = impl(pObj, iCol, this.ptr);
          if (rc)
            return SQLite3Error.toss(
              rc,
              arguments[2] + "() failed with code " + rc
            );
          const pv = wasm.peekPtr(this.ptr);
          return pv ? capi.sqlite3_value_to_js(pv, true) : void 0;
        }.bind(/* @__PURE__ */ Object.create(null));
        capi.sqlite3_preupdate_new_js = (pDb2, iCol) => __newOldValue(pDb2, iCol, "sqlite3_preupdate_new");
        capi.sqlite3_preupdate_old_js = (pDb2, iCol) => __newOldValue(pDb2, iCol, "sqlite3_preupdate_old");
        capi.sqlite3changeset_new_js = (pChangesetIter, iCol) => __newOldValue(pChangesetIter, iCol, "sqlite3changeset_new");
        capi.sqlite3changeset_old_js = (pChangesetIter, iCol) => __newOldValue(pChangesetIter, iCol, "sqlite3changeset_old");
        const sqlite3 = {
          WasmAllocError,
          SQLite3Error,
          capi,
          util,
          wasm,
          config,
          version: /* @__PURE__ */ Object.create(null),
          client: void 0,
          asyncPostInit: async function ff() {
            if (ff.isReady instanceof Promise) return ff.isReady;
            let lia = sqlite3ApiBootstrap.initializersAsync;
            delete sqlite3ApiBootstrap.initializersAsync;
            const postInit = async () => {
              if (!sqlite3.__isUnderTest) {
                delete sqlite3.util;
                delete sqlite3.StructBinder;
              }
              return sqlite3;
            };
            const catcher = (e) => {
              config.error("an async sqlite3 initializer failed:", e);
              throw e;
            };
            if (!lia || !lia.length) {
              return ff.isReady = postInit().catch(catcher);
            }
            lia = lia.map((f) => {
              return f instanceof Function ? async (x) => f(sqlite3) : f;
            });
            lia.push(postInit);
            let p = Promise.resolve(sqlite3);
            while (lia.length) p = p.then(lia.shift());
            return ff.isReady = p.catch(catcher);
          },
          scriptInfo: void 0
        };
        try {
          sqlite3ApiBootstrap.initializers.forEach((f) => {
            f(sqlite3);
          });
        } catch (e) {
          console.error("sqlite3 bootstrap initializer threw:", e);
          throw e;
        }
        delete sqlite3ApiBootstrap.initializers;
        sqlite3ApiBootstrap.sqlite3 = sqlite3;
        return sqlite3;
      };
      globalThis.sqlite3ApiBootstrap.initializers = [];
      globalThis.sqlite3ApiBootstrap.initializersAsync = [];
      globalThis.sqlite3ApiBootstrap.defaultConfig = /* @__PURE__ */ Object.create(null);
      globalThis.sqlite3ApiBootstrap.sqlite3 = void 0;
      globalThis.WhWasmUtilInstaller = function(target) {
        if (void 0 === target.bigIntEnabled) {
          target.bigIntEnabled = !!globalThis["BigInt64Array"];
        }
        const toss = (...args) => {
          throw new Error(args.join(" "));
        };
        if (!target.exports) {
          Object.defineProperty(target, "exports", {
            enumerable: true,
            configurable: true,
            get: () => target.instance && target.instance.exports
          });
        }
        const ptrIR = target.pointerIR || "i32";
        const ptrSizeof = target.ptrSizeof = "i32" === ptrIR ? 4 : "i64" === ptrIR ? 8 : toss("Unhandled ptrSizeof:", ptrIR);
        const cache = /* @__PURE__ */ Object.create(null);
        cache.heapSize = 0;
        cache.memory = null;
        cache.freeFuncIndexes = [];
        cache.scopedAlloc = [];
        cache.utf8Decoder = new TextDecoder();
        cache.utf8Encoder = new TextEncoder("utf-8");
        target.sizeofIR = (n) => {
          switch (n) {
            case "i8":
              return 1;
            case "i16":
              return 2;
            case "i32":
            case "f32":
            case "float":
              return 4;
            case "i64":
            case "f64":
            case "double":
              return 8;
            case "*":
              return ptrSizeof;
            default:
              return ("" + n).endsWith("*") ? ptrSizeof : void 0;
          }
        };
        const heapWrappers = function() {
          if (!cache.memory) {
            cache.memory = target.memory instanceof WebAssembly.Memory ? target.memory : target.exports.memory;
          } else if (cache.heapSize === cache.memory.buffer.byteLength) {
            return cache;
          }
          const b = cache.memory.buffer;
          cache.HEAP8 = new Int8Array(b);
          cache.HEAP8U = new Uint8Array(b);
          cache.HEAP16 = new Int16Array(b);
          cache.HEAP16U = new Uint16Array(b);
          cache.HEAP32 = new Int32Array(b);
          cache.HEAP32U = new Uint32Array(b);
          if (target.bigIntEnabled) {
            cache.HEAP64 = new BigInt64Array(b);
            cache.HEAP64U = new BigUint64Array(b);
          }
          cache.HEAP32F = new Float32Array(b);
          cache.HEAP64F = new Float64Array(b);
          cache.heapSize = b.byteLength;
          return cache;
        };
        target.heap8 = () => heapWrappers().HEAP8;
        target.heap8u = () => heapWrappers().HEAP8U;
        target.heap16 = () => heapWrappers().HEAP16;
        target.heap16u = () => heapWrappers().HEAP16U;
        target.heap32 = () => heapWrappers().HEAP32;
        target.heap32u = () => heapWrappers().HEAP32U;
        target.heapForSize = function(n, unsigned = true) {
          const c = cache.memory && cache.heapSize === cache.memory.buffer.byteLength ? cache : heapWrappers();
          switch (n) {
            case Int8Array:
              return c.HEAP8;
            case Uint8Array:
              return c.HEAP8U;
            case Int16Array:
              return c.HEAP16;
            case Uint16Array:
              return c.HEAP16U;
            case Int32Array:
              return c.HEAP32;
            case Uint32Array:
              return c.HEAP32U;
            case 8:
              return unsigned ? c.HEAP8U : c.HEAP8;
            case 16:
              return unsigned ? c.HEAP16U : c.HEAP16;
            case 32:
              return unsigned ? c.HEAP32U : c.HEAP32;
            case 64:
              if (c.HEAP64) return unsigned ? c.HEAP64U : c.HEAP64;
              break;
            default:
              if (target.bigIntEnabled) {
                if (n === globalThis["BigUint64Array"]) return c.HEAP64U;
                else if (n === globalThis["BigInt64Array"]) return c.HEAP64;
                break;
              }
          }
          toss(
            "Invalid heapForSize() size: expecting 8, 16, 32,",
            "or (if BigInt is enabled) 64."
          );
        };
        target.functionTable = function() {
          return target.exports.__indirect_function_table;
        };
        target.functionEntry = function(fptr) {
          const ft = target.functionTable();
          return fptr < ft.length ? ft.get(fptr) : void 0;
        };
        target.jsFuncToWasm = function f(func, sig) {
          if (!f._) {
            f._ = {
              sigTypes: Object.assign(/* @__PURE__ */ Object.create(null), {
                i: "i32",
                p: "i32",
                P: "i32",
                s: "i32",
                j: "i64",
                f: "f32",
                d: "f64"
              }),
              typeCodes: Object.assign(/* @__PURE__ */ Object.create(null), {
                f64: 124,
                f32: 125,
                i64: 126,
                i32: 127
              }),
              uleb128Encode: function(tgt, method, n) {
                if (n < 128) tgt[method](n);
                else tgt[method](n % 128 | 128, n >> 7);
              },
              rxJSig: /^(\w)\((\w*)\)$/,
              sigParams: function(sig2) {
                const m = f._.rxJSig.exec(sig2);
                return m ? m[2] : sig2.substr(1);
              },
              letterType: (x) => f._.sigTypes[x] || toss("Invalid signature letter:", x),
              pushSigType: (dest, letter) => dest.push(f._.typeCodes[f._.letterType(letter)])
            };
          }
          if ("string" === typeof func) {
            const x = sig;
            sig = func;
            func = x;
          }
          const sigParams = f._.sigParams(sig);
          const wasmCode = [1, 96];
          f._.uleb128Encode(wasmCode, "push", sigParams.length);
          for (const x of sigParams) f._.pushSigType(wasmCode, x);
          if ("v" === sig[0]) wasmCode.push(0);
          else {
            wasmCode.push(1);
            f._.pushSigType(wasmCode, sig[0]);
          }
          f._.uleb128Encode(wasmCode, "unshift", wasmCode.length);
          wasmCode.unshift(
            0,
            97,
            115,
            109,
            1,
            0,
            0,
            0,
            1
          );
          wasmCode.push(
            2,
            7,
            1,
            1,
            101,
            1,
            102,
            0,
            0,
            7,
            5,
            1,
            1,
            102,
            0,
            0
          );
          return new WebAssembly.Instance(
            new WebAssembly.Module(new Uint8Array(wasmCode)),
            {
              e: { f: func }
            }
          ).exports["f"];
        };
        const __installFunction = function f(func, sig, scoped) {
          if (scoped && !cache.scopedAlloc.length) {
            toss("No scopedAllocPush() scope is active.");
          }
          if ("string" === typeof func) {
            const x = sig;
            sig = func;
            func = x;
          }
          if ("string" !== typeof sig || !(func instanceof Function)) {
            toss(
              "Invalid arguments: expecting (function,signature) or (signature,function)."
            );
          }
          const ft = target.functionTable();
          const oldLen = ft.length;
          let ptr;
          while (cache.freeFuncIndexes.length) {
            ptr = cache.freeFuncIndexes.pop();
            if (ft.get(ptr)) {
              ptr = null;
              continue;
            } else {
              break;
            }
          }
          if (!ptr) {
            ptr = oldLen;
            ft.grow(1);
          }
          try {
            ft.set(ptr, func);
            if (scoped) {
              cache.scopedAlloc[cache.scopedAlloc.length - 1].push(ptr);
            }
            return ptr;
          } catch (e) {
            if (!(e instanceof TypeError)) {
              if (ptr === oldLen) cache.freeFuncIndexes.push(oldLen);
              throw e;
            }
          }
          try {
            const fptr = target.jsFuncToWasm(func, sig);
            ft.set(ptr, fptr);
            if (scoped) {
              cache.scopedAlloc[cache.scopedAlloc.length - 1].push(ptr);
            }
          } catch (e) {
            if (ptr === oldLen) cache.freeFuncIndexes.push(oldLen);
            throw e;
          }
          return ptr;
        };
        target.installFunction = (func, sig) => __installFunction(func, sig, false);
        target.scopedInstallFunction = (func, sig) => __installFunction(func, sig, true);
        target.uninstallFunction = function(ptr) {
          if (!ptr && 0 !== ptr) return void 0;
          const fi = cache.freeFuncIndexes;
          const ft = target.functionTable();
          fi.push(ptr);
          const rc = ft.get(ptr);
          ft.set(ptr, null);
          return rc;
        };
        target.peek = function f(ptr, type = "i8") {
          if (type.endsWith("*")) type = ptrIR;
          const c = cache.memory && cache.heapSize === cache.memory.buffer.byteLength ? cache : heapWrappers();
          const list = Array.isArray(ptr) ? [] : void 0;
          let rc;
          do {
            if (list) ptr = arguments[0].shift();
            switch (type) {
              case "i1":
              case "i8":
                rc = c.HEAP8[ptr >> 0];
                break;
              case "i16":
                rc = c.HEAP16[ptr >> 1];
                break;
              case "i32":
                rc = c.HEAP32[ptr >> 2];
                break;
              case "float":
              case "f32":
                rc = c.HEAP32F[ptr >> 2];
                break;
              case "double":
              case "f64":
                rc = Number(c.HEAP64F[ptr >> 3]);
                break;
              case "i64":
                if (target.bigIntEnabled) {
                  rc = BigInt(c.HEAP64[ptr >> 3]);
                  break;
                }
              default:
                toss("Invalid type for peek():", type);
            }
            if (list) list.push(rc);
          } while (list && arguments[0].length);
          return list || rc;
        };
        target.poke = function(ptr, value, type = "i8") {
          if (type.endsWith("*")) type = ptrIR;
          const c = cache.memory && cache.heapSize === cache.memory.buffer.byteLength ? cache : heapWrappers();
          for (const p of Array.isArray(ptr) ? ptr : [ptr]) {
            switch (type) {
              case "i1":
              case "i8":
                c.HEAP8[p >> 0] = value;
                continue;
              case "i16":
                c.HEAP16[p >> 1] = value;
                continue;
              case "i32":
                c.HEAP32[p >> 2] = value;
                continue;
              case "float":
              case "f32":
                c.HEAP32F[p >> 2] = value;
                continue;
              case "double":
              case "f64":
                c.HEAP64F[p >> 3] = value;
                continue;
              case "i64":
                if (c.HEAP64) {
                  c.HEAP64[p >> 3] = BigInt(value);
                  continue;
                }
              default:
                toss("Invalid type for poke(): " + type);
            }
          }
          return this;
        };
        target.peekPtr = (...ptr) => target.peek(1 === ptr.length ? ptr[0] : ptr, ptrIR);
        target.pokePtr = (ptr, value = 0) => target.poke(ptr, value, ptrIR);
        target.peek8 = (...ptr) => target.peek(1 === ptr.length ? ptr[0] : ptr, "i8");
        target.poke8 = (ptr, value) => target.poke(ptr, value, "i8");
        target.peek16 = (...ptr) => target.peek(1 === ptr.length ? ptr[0] : ptr, "i16");
        target.poke16 = (ptr, value) => target.poke(ptr, value, "i16");
        target.peek32 = (...ptr) => target.peek(1 === ptr.length ? ptr[0] : ptr, "i32");
        target.poke32 = (ptr, value) => target.poke(ptr, value, "i32");
        target.peek64 = (...ptr) => target.peek(1 === ptr.length ? ptr[0] : ptr, "i64");
        target.poke64 = (ptr, value) => target.poke(ptr, value, "i64");
        target.peek32f = (...ptr) => target.peek(1 === ptr.length ? ptr[0] : ptr, "f32");
        target.poke32f = (ptr, value) => target.poke(ptr, value, "f32");
        target.peek64f = (...ptr) => target.peek(1 === ptr.length ? ptr[0] : ptr, "f64");
        target.poke64f = (ptr, value) => target.poke(ptr, value, "f64");
        target.getMemValue = target.peek;
        target.getPtrValue = target.peekPtr;
        target.setMemValue = target.poke;
        target.setPtrValue = target.pokePtr;
        target.isPtr32 = (ptr) => "number" === typeof ptr && ptr === (ptr | 0) && ptr >= 0;
        target.isPtr = target.isPtr32;
        target.cstrlen = function(ptr) {
          if (!ptr || !target.isPtr(ptr)) return null;
          const h = heapWrappers().HEAP8U;
          let pos = ptr;
          for (; h[pos] !== 0; ++pos) {
          }
          return pos - ptr;
        };
        const __SAB = "undefined" === typeof SharedArrayBuffer ? function() {
        } : SharedArrayBuffer;
        const __utf8Decode = function(arrayBuffer, begin, end) {
          return cache.utf8Decoder.decode(
            arrayBuffer.buffer instanceof __SAB ? arrayBuffer.slice(begin, end) : arrayBuffer.subarray(begin, end)
          );
        };
        target.cstrToJs = function(ptr) {
          const n = target.cstrlen(ptr);
          return n ? __utf8Decode(heapWrappers().HEAP8U, ptr, ptr + n) : null === n ? n : "";
        };
        target.jstrlen = function(str) {
          if ("string" !== typeof str) return null;
          const n = str.length;
          let len = 0;
          for (let i = 0; i < n; ++i) {
            let u = str.charCodeAt(i);
            if (u >= 55296 && u <= 57343) {
              u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
            }
            if (u <= 127) ++len;
            else if (u <= 2047) len += 2;
            else if (u <= 65535) len += 3;
            else len += 4;
          }
          return len;
        };
        target.jstrcpy = function(jstr, tgt, offset = 0, maxBytes = -1, addNul = true) {
          if (!tgt || !(tgt instanceof Int8Array) && !(tgt instanceof Uint8Array)) {
            toss("jstrcpy() target must be an Int8Array or Uint8Array.");
          }
          if (maxBytes < 0) maxBytes = tgt.length - offset;
          if (!(maxBytes > 0) || !(offset >= 0)) return 0;
          let i = 0, max = jstr.length;
          const begin = offset, end = offset + maxBytes - (addNul ? 1 : 0);
          for (; i < max && offset < end; ++i) {
            let u = jstr.charCodeAt(i);
            if (u >= 55296 && u <= 57343) {
              u = 65536 + ((u & 1023) << 10) | jstr.charCodeAt(++i) & 1023;
            }
            if (u <= 127) {
              if (offset >= end) break;
              tgt[offset++] = u;
            } else if (u <= 2047) {
              if (offset + 1 >= end) break;
              tgt[offset++] = 192 | u >> 6;
              tgt[offset++] = 128 | u & 63;
            } else if (u <= 65535) {
              if (offset + 2 >= end) break;
              tgt[offset++] = 224 | u >> 12;
              tgt[offset++] = 128 | u >> 6 & 63;
              tgt[offset++] = 128 | u & 63;
            } else {
              if (offset + 3 >= end) break;
              tgt[offset++] = 240 | u >> 18;
              tgt[offset++] = 128 | u >> 12 & 63;
              tgt[offset++] = 128 | u >> 6 & 63;
              tgt[offset++] = 128 | u & 63;
            }
          }
          if (addNul) tgt[offset++] = 0;
          return offset - begin;
        };
        target.cstrncpy = function(tgtPtr, srcPtr, n) {
          if (!tgtPtr || !srcPtr)
            toss("cstrncpy() does not accept NULL strings.");
          if (n < 0) n = target.cstrlen(strPtr) + 1;
          else if (!(n > 0)) return 0;
          const heap = target.heap8u();
          let i = 0, ch;
          for (; i < n && (ch = heap[srcPtr + i]); ++i) {
            heap[tgtPtr + i] = ch;
          }
          if (i < n) heap[tgtPtr + i++] = 0;
          return i;
        };
        target.jstrToUintArray = (str, addNul = false) => {
          return cache.utf8Encoder.encode(addNul ? str + "\0" : str);
        };
        const __affirmAlloc = (obj, funcName) => {
          if (!(obj.alloc instanceof Function) || !(obj.dealloc instanceof Function)) {
            toss(
              "Object is missing alloc() and/or dealloc() function(s)",
              "required by",
              funcName + "()."
            );
          }
        };
        const __allocCStr = function(jstr, returnWithLength, allocator, funcName) {
          __affirmAlloc(target, funcName);
          if ("string" !== typeof jstr) return null;
          {
            const u = cache.utf8Encoder.encode(jstr), ptr = allocator(u.length + 1), heap = heapWrappers().HEAP8U;
            heap.set(u, ptr);
            heap[ptr + u.length] = 0;
            return returnWithLength ? [ptr, u.length] : ptr;
          }
        };
        target.allocCString = (jstr, returnWithLength = false) => __allocCStr(jstr, returnWithLength, target.alloc, "allocCString()");
        target.scopedAllocPush = function() {
          __affirmAlloc(target, "scopedAllocPush");
          const a = [];
          cache.scopedAlloc.push(a);
          return a;
        };
        target.scopedAllocPop = function(state) {
          __affirmAlloc(target, "scopedAllocPop");
          const n = arguments.length ? cache.scopedAlloc.indexOf(state) : cache.scopedAlloc.length - 1;
          if (n < 0) toss("Invalid state object for scopedAllocPop().");
          if (0 === arguments.length) state = cache.scopedAlloc[n];
          cache.scopedAlloc.splice(n, 1);
          for (let p; p = state.pop(); ) {
            if (target.functionEntry(p)) {
              target.uninstallFunction(p);
            } else target.dealloc(p);
          }
        };
        target.scopedAlloc = function(n) {
          if (!cache.scopedAlloc.length) {
            toss("No scopedAllocPush() scope is active.");
          }
          const p = target.alloc(n);
          cache.scopedAlloc[cache.scopedAlloc.length - 1].push(p);
          return p;
        };
        Object.defineProperty(target.scopedAlloc, "level", {
          configurable: false,
          enumerable: false,
          get: () => cache.scopedAlloc.length,
          set: () => toss("The 'active' property is read-only.")
        });
        target.scopedAllocCString = (jstr, returnWithLength = false) => __allocCStr(
          jstr,
          returnWithLength,
          target.scopedAlloc,
          "scopedAllocCString()"
        );
        const __allocMainArgv = function(isScoped, list) {
          const pList = target[isScoped ? "scopedAlloc" : "alloc"](
            (list.length + 1) * target.ptrSizeof
          );
          let i = 0;
          list.forEach((e) => {
            target.pokePtr(
              pList + target.ptrSizeof * i++,
              target[isScoped ? "scopedAllocCString" : "allocCString"]("" + e)
            );
          });
          target.pokePtr(pList + target.ptrSizeof * i, 0);
          return pList;
        };
        target.scopedAllocMainArgv = (list) => __allocMainArgv(true, list);
        target.allocMainArgv = (list) => __allocMainArgv(false, list);
        target.cArgvToJs = (argc, pArgv) => {
          const list = [];
          for (let i = 0; i < argc; ++i) {
            const arg = target.peekPtr(pArgv + target.ptrSizeof * i);
            list.push(arg ? target.cstrToJs(arg) : null);
          }
          return list;
        };
        target.scopedAllocCall = function(func) {
          target.scopedAllocPush();
          try {
            return func();
          } finally {
            target.scopedAllocPop();
          }
        };
        const __allocPtr = function(howMany, safePtrSize, method) {
          __affirmAlloc(target, method);
          const pIr = safePtrSize ? "i64" : ptrIR;
          let m = target[method](howMany * (safePtrSize ? 8 : ptrSizeof));
          target.poke(m, 0, pIr);
          if (1 === howMany) {
            return m;
          }
          const a = [m];
          for (let i = 1; i < howMany; ++i) {
            m += safePtrSize ? 8 : ptrSizeof;
            a[i] = m;
            target.poke(m, 0, pIr);
          }
          return a;
        };
        target.allocPtr = (howMany = 1, safePtrSize = true) => __allocPtr(howMany, safePtrSize, "alloc");
        target.scopedAllocPtr = (howMany = 1, safePtrSize = true) => __allocPtr(howMany, safePtrSize, "scopedAlloc");
        target.xGet = function(name) {
          return target.exports[name] || toss("Cannot find exported symbol:", name);
        };
        const __argcMismatch = (f, n) => toss(f + "() requires", n, "argument(s).");
        target.xCall = function(fname, ...args) {
          const f = fname instanceof Function ? fname : target.xGet(fname);
          if (!(f instanceof Function))
            toss("Exported symbol", fname, "is not a function.");
          if (f.length !== args.length)
            __argcMismatch(f === fname ? f.name : fname, f.length);
          return 2 === arguments.length && Array.isArray(arguments[1]) ? f.apply(null, arguments[1]) : f.apply(null, args);
        };
        cache.xWrap = /* @__PURE__ */ Object.create(null);
        cache.xWrap.convert = /* @__PURE__ */ Object.create(null);
        cache.xWrap.convert.arg = /* @__PURE__ */ new Map();
        cache.xWrap.convert.result = /* @__PURE__ */ new Map();
        const xArg = cache.xWrap.convert.arg, xResult = cache.xWrap.convert.result;
        if (target.bigIntEnabled) {
          xArg.set("i64", (i) => BigInt(i));
        }
        const __xArgPtr = "i32" === ptrIR ? (i) => i | 0 : (i) => BigInt(i) | BigInt(0);
        xArg.set("i32", __xArgPtr).set("i16", (i) => (i | 0) & 65535).set("i8", (i) => (i | 0) & 255).set("f32", (i) => Number(i).valueOf()).set("float", xArg.get("f32")).set("f64", xArg.get("f32")).set("double", xArg.get("f64")).set("int", xArg.get("i32")).set("null", (i) => i).set(null, xArg.get("null")).set("**", __xArgPtr).set("*", __xArgPtr);
        xResult.set("*", __xArgPtr).set("pointer", __xArgPtr).set("number", (v2) => Number(v2)).set("void", (v2) => void 0).set("null", (v2) => v2).set(null, xResult.get("null"));
        {
          const copyToResult = [
            "i8",
            "i16",
            "i32",
            "int",
            "f32",
            "float",
            "f64",
            "double"
          ];
          if (target.bigIntEnabled) copyToResult.push("i64");
          const adaptPtr = xArg.get(ptrIR);
          for (const t of copyToResult) {
            xArg.set(t + "*", adaptPtr);
            xResult.set(t + "*", adaptPtr);
            xResult.set(t, xArg.get(t) || toss("Missing arg converter:", t));
          }
        }
        const __xArgString = function(v2) {
          if ("string" === typeof v2) return target.scopedAllocCString(v2);
          return v2 ? __xArgPtr(v2) : null;
        };
        xArg.set("string", __xArgString).set("utf8", __xArgString).set("pointer", __xArgString);
        xResult.set("string", (i) => target.cstrToJs(i)).set("utf8", xResult.get("string")).set("string:dealloc", (i) => {
          try {
            return i ? target.cstrToJs(i) : null;
          } finally {
            target.dealloc(i);
          }
        }).set("utf8:dealloc", xResult.get("string:dealloc")).set("json", (i) => JSON.parse(target.cstrToJs(i))).set("json:dealloc", (i) => {
          try {
            return i ? JSON.parse(target.cstrToJs(i)) : null;
          } finally {
            target.dealloc(i);
          }
        });
        const AbstractArgAdapter = class {
          constructor(opt) {
            this.name = opt.name || "unnamed adapter";
          }
          convertArg(v2, argv, argIndex) {
            toss("AbstractArgAdapter must be subclassed.");
          }
        };
        xArg.FuncPtrAdapter = class FuncPtrAdapter extends AbstractArgAdapter {
          constructor(opt) {
            super(opt);
            if (xArg.FuncPtrAdapter.warnOnUse) {
              console.warn(
                "xArg.FuncPtrAdapter is an internal-only API",
                "and is not intended to be invoked from",
                "client-level code. Invoked with:",
                opt
              );
            }
            this.name = opt.name || "unnamed";
            this.signature = opt.signature;
            if (opt.contextKey instanceof Function) {
              this.contextKey = opt.contextKey;
              if (!opt.bindScope) opt.bindScope = "context";
            }
            this.bindScope = opt.bindScope || toss(
              "FuncPtrAdapter options requires a bindScope (explicit or implied)."
            );
            if (FuncPtrAdapter.bindScopes.indexOf(opt.bindScope) < 0) {
              toss(
                "Invalid options.bindScope (" + opt.bindMod + ") for FuncPtrAdapter. Expecting one of: (" + FuncPtrAdapter.bindScopes.join(", ") + ")"
              );
            }
            this.isTransient = "transient" === this.bindScope;
            this.isContext = "context" === this.bindScope;
            this.isPermanent = "permanent" === this.bindScope;
            this.singleton = "singleton" === this.bindScope ? [] : void 0;
            this.callProxy = opt.callProxy instanceof Function ? opt.callProxy : void 0;
          }
          contextKey(argv, argIndex) {
            return this;
          }
          contextMap(key) {
            const cm = this.__cmap || (this.__cmap = /* @__PURE__ */ new Map());
            let rc = cm.get(key);
            if (void 0 === rc) cm.set(key, rc = []);
            return rc;
          }
          convertArg(v2, argv, argIndex) {
            let pair = this.singleton;
            if (!pair && this.isContext) {
              pair = this.contextMap(this.contextKey(argv, argIndex));
            }
            if (pair && pair[0] === v2) return pair[1];
            if (v2 instanceof Function) {
              if (this.callProxy) v2 = this.callProxy(v2);
              const fp = __installFunction(v2, this.signature, this.isTransient);
              if (FuncPtrAdapter.debugFuncInstall) {
                FuncPtrAdapter.debugOut(
                  "FuncPtrAdapter installed",
                  this,
                  this.contextKey(argv, argIndex),
                  "@" + fp,
                  v2
                );
              }
              if (pair) {
                if (pair[1]) {
                  if (FuncPtrAdapter.debugFuncInstall) {
                    FuncPtrAdapter.debugOut(
                      "FuncPtrAdapter uninstalling",
                      this,
                      this.contextKey(argv, argIndex),
                      "@" + pair[1],
                      v2
                    );
                  }
                  try {
                    cache.scopedAlloc[cache.scopedAlloc.length - 1].push(
                      pair[1]
                    );
                  } catch (e) {
                  }
                }
                pair[0] = v2;
                pair[1] = fp;
              }
              return fp;
            } else if (target.isPtr(v2) || null === v2 || void 0 === v2) {
              if (pair && pair[1] && pair[1] !== v2) {
                if (FuncPtrAdapter.debugFuncInstall) {
                  FuncPtrAdapter.debugOut(
                    "FuncPtrAdapter uninstalling",
                    this,
                    this.contextKey(argv, argIndex),
                    "@" + pair[1],
                    v2
                  );
                }
                try {
                  cache.scopedAlloc[cache.scopedAlloc.length - 1].push(pair[1]);
                } catch (e) {
                }
                pair[0] = pair[1] = v2 | 0;
              }
              return v2 || 0;
            } else {
              throw new TypeError(
                "Invalid FuncPtrAdapter argument type. Expecting a function pointer or a " + (this.name ? this.name + " " : "") + "function matching signature " + this.signature + "."
              );
            }
          }
        };
        xArg.FuncPtrAdapter.warnOnUse = false;
        xArg.FuncPtrAdapter.debugFuncInstall = false;
        xArg.FuncPtrAdapter.debugOut = console.debug.bind(console);
        xArg.FuncPtrAdapter.bindScopes = [
          "transient",
          "context",
          "singleton",
          "permanent"
        ];
        const __xArgAdapterCheck = (t) => xArg.get(t) || toss("Argument adapter not found:", t);
        const __xResultAdapterCheck = (t) => xResult.get(t) || toss("Result adapter not found:", t);
        cache.xWrap.convertArg = (t, ...args) => __xArgAdapterCheck(t)(...args);
        cache.xWrap.convertArgNoCheck = (t, ...args) => xArg.get(t)(...args);
        cache.xWrap.convertResult = (t, v2) => null === t ? v2 : t ? __xResultAdapterCheck(t)(v2) : void 0;
        cache.xWrap.convertResultNoCheck = (t, v2) => null === t ? v2 : t ? xResult.get(t)(v2) : void 0;
        target.xWrap = function(fArg, resultType, ...argTypes) {
          if (3 === arguments.length && Array.isArray(arguments[2])) {
            argTypes = arguments[2];
          }
          if (target.isPtr(fArg)) {
            fArg = target.functionEntry(fArg) || toss("Function pointer not found in WASM function table.");
          }
          const fIsFunc = fArg instanceof Function;
          const xf = fIsFunc ? fArg : target.xGet(fArg);
          if (fIsFunc) fArg = xf.name || "unnamed function";
          if (argTypes.length !== xf.length) __argcMismatch(fArg, xf.length);
          if (null === resultType && 0 === xf.length) {
            return xf;
          }
          if (void 0 !== resultType && null !== resultType)
            __xResultAdapterCheck(resultType);
          for (const t of argTypes) {
            if (t instanceof AbstractArgAdapter)
              xArg.set(t, (...args) => t.convertArg(...args));
            else __xArgAdapterCheck(t);
          }
          const cxw = cache.xWrap;
          if (0 === xf.length) {
            return (...args) => args.length ? __argcMismatch(fArg, xf.length) : cxw.convertResult(resultType, xf.call(null));
          }
          return function(...args) {
            if (args.length !== xf.length) __argcMismatch(fArg, xf.length);
            const scope = target.scopedAllocPush();
            try {
              let i = 0;
              for (; i < args.length; ++i)
                args[i] = cxw.convertArgNoCheck(argTypes[i], args[i], args, i);
              return cxw.convertResultNoCheck(resultType, xf.apply(null, args));
            } finally {
              target.scopedAllocPop(scope);
            }
          };
        };
        const __xAdapter = function(func, argc, typeName, adapter, modeName, xcvPart) {
          if ("string" === typeof typeName) {
            if (1 === argc) return xcvPart.get(typeName);
            else if (2 === argc) {
              if (!adapter) {
                xcvPart.delete(typeName);
                return func;
              } else if (!(adapter instanceof Function)) {
                toss(modeName, "requires a function argument.");
              }
              xcvPart.set(typeName, adapter);
              return func;
            }
          }
          toss("Invalid arguments to", modeName);
        };
        target.xWrap.resultAdapter = function f(typeName, adapter) {
          return __xAdapter(
            f,
            arguments.length,
            typeName,
            adapter,
            "resultAdapter()",
            xResult
          );
        };
        target.xWrap.argAdapter = function f(typeName, adapter) {
          return __xAdapter(
            f,
            arguments.length,
            typeName,
            adapter,
            "argAdapter()",
            xArg
          );
        };
        target.xWrap.FuncPtrAdapter = xArg.FuncPtrAdapter;
        target.xCallWrapped = function(fArg, resultType, argTypes, ...args) {
          if (Array.isArray(arguments[3])) args = arguments[3];
          return target.xWrap(fArg, resultType, argTypes || []).apply(null, args || []);
        };
        target.xWrap.testConvertArg = cache.xWrap.convertArg;
        target.xWrap.testConvertResult = cache.xWrap.convertResult;
        return target;
      };
      globalThis.WhWasmUtilInstaller.yawl = function(config) {
        const wfetch = () => fetch(config.uri, { credentials: "same-origin" });
        const wui = this;
        const finalThen = function(arg) {
          if (config.wasmUtilTarget) {
            const toss = (...args) => {
              throw new Error(args.join(" "));
            };
            const tgt = config.wasmUtilTarget;
            tgt.module = arg.module;
            tgt.instance = arg.instance;
            if (!tgt.instance.exports.memory) {
              tgt.memory = config.imports && config.imports.env && config.imports.env.memory || toss("Missing 'memory' object!");
            }
            if (!tgt.alloc && arg.instance.exports.malloc) {
              const exports = arg.instance.exports;
              tgt.alloc = function(n) {
                return exports.malloc(n) || toss("Allocation of", n, "bytes failed.");
              };
              tgt.dealloc = function(m) {
                exports.free(m);
              };
            }
            wui(tgt);
          }
          if (config.onload) config.onload(arg, config);
          return arg;
        };
        const loadWasm = WebAssembly.instantiateStreaming ? function loadWasmStreaming() {
          return WebAssembly.instantiateStreaming(
            wfetch(),
            config.imports || {}
          ).then(finalThen);
        } : function loadWasmOldSchool() {
          return wfetch().then((response) => response.arrayBuffer()).then(
            (bytes) => WebAssembly.instantiate(bytes, config.imports || {})
          ).then(finalThen);
        };
        return loadWasm;
      }.bind(globalThis.WhWasmUtilInstaller);
      globalThis.Jaccwabyt = function StructBinderFactory(config) {
        const toss = (...args) => {
          throw new Error(args.join(" "));
        };
        if (!(config.heap instanceof WebAssembly.Memory) && !(config.heap instanceof Function)) {
          toss(
            "config.heap must be WebAssembly.Memory instance or a function."
          );
        }
        ["alloc", "dealloc"].forEach(function(k) {
          config[k] instanceof Function || toss("Config option '" + k + "' must be a function.");
        });
        const SBF = StructBinderFactory;
        const heap = config.heap instanceof Function ? config.heap : () => new Uint8Array(config.heap.buffer), alloc = config.alloc, dealloc = config.dealloc, log = config.log || console.log.bind(console), memberPrefix = config.memberPrefix || "", memberSuffix = config.memberSuffix || "", bigIntEnabled = void 0 === config.bigIntEnabled ? !!globalThis["BigInt64Array"] : !!config.bigIntEnabled, BigInt2 = globalThis["BigInt"], BigInt64Array2 = globalThis["BigInt64Array"], ptrSizeof = config.ptrSizeof || 4, ptrIR = config.ptrIR || "i32";
        if (!SBF.debugFlags) {
          SBF.__makeDebugFlags = function(deriveFrom = null) {
            if (deriveFrom && deriveFrom.__flags)
              deriveFrom = deriveFrom.__flags;
            const f = function f2(flags) {
              if (0 === arguments.length) {
                return f2.__flags;
              }
              if (flags < 0) {
                delete f2.__flags.getter;
                delete f2.__flags.setter;
                delete f2.__flags.alloc;
                delete f2.__flags.dealloc;
              } else {
                f2.__flags.getter = 0 !== (1 & flags);
                f2.__flags.setter = 0 !== (2 & flags);
                f2.__flags.alloc = 0 !== (4 & flags);
                f2.__flags.dealloc = 0 !== (8 & flags);
              }
              return f2._flags;
            };
            Object.defineProperty(f, "__flags", {
              iterable: false,
              writable: false,
              value: Object.create(deriveFrom)
            });
            if (!deriveFrom) f(0);
            return f;
          };
          SBF.debugFlags = SBF.__makeDebugFlags();
        }
        const isLittleEndian = function() {
          const buffer = new ArrayBuffer(2);
          new DataView(buffer).setInt16(0, 256, true);
          return new Int16Array(buffer)[0] === 256;
        }();
        const isFuncSig = (s) => "(" === s[1];
        const isAutoPtrSig = (s) => "P" === s;
        const sigLetter = (s) => isFuncSig(s) ? "p" : s[0];
        const sigIR = function(s) {
          switch (sigLetter(s)) {
            case "c":
            case "C":
              return "i8";
            case "i":
              return "i32";
            case "p":
            case "P":
            case "s":
              return ptrIR;
            case "j":
              return "i64";
            case "f":
              return "float";
            case "d":
              return "double";
          }
          toss("Unhandled signature IR:", s);
        };
        const affirmBigIntArray = BigInt64Array2 ? () => true : () => toss("BigInt64Array is not available.");
        const sigDVGetter = function(s) {
          switch (sigLetter(s)) {
            case "p":
            case "P":
            case "s": {
              switch (ptrSizeof) {
                case 4:
                  return "getInt32";
                case 8:
                  return affirmBigIntArray() && "getBigInt64";
              }
              break;
            }
            case "i":
              return "getInt32";
            case "c":
              return "getInt8";
            case "C":
              return "getUint8";
            case "j":
              return affirmBigIntArray() && "getBigInt64";
            case "f":
              return "getFloat32";
            case "d":
              return "getFloat64";
          }
          toss("Unhandled DataView getter for signature:", s);
        };
        const sigDVSetter = function(s) {
          switch (sigLetter(s)) {
            case "p":
            case "P":
            case "s": {
              switch (ptrSizeof) {
                case 4:
                  return "setInt32";
                case 8:
                  return affirmBigIntArray() && "setBigInt64";
              }
              break;
            }
            case "i":
              return "setInt32";
            case "c":
              return "setInt8";
            case "C":
              return "setUint8";
            case "j":
              return affirmBigIntArray() && "setBigInt64";
            case "f":
              return "setFloat32";
            case "d":
              return "setFloat64";
          }
          toss("Unhandled DataView setter for signature:", s);
        };
        const sigDVSetWrapper = function(s) {
          switch (sigLetter(s)) {
            case "i":
            case "f":
            case "c":
            case "C":
            case "d":
              return Number;
            case "j":
              return affirmBigIntArray() && BigInt2;
            case "p":
            case "P":
            case "s":
              switch (ptrSizeof) {
                case 4:
                  return Number;
                case 8:
                  return affirmBigIntArray() && BigInt2;
              }
              break;
          }
          toss("Unhandled DataView set wrapper for signature:", s);
        };
        const sPropName = (s, k) => s + "::" + k;
        const __propThrowOnSet = function(structName, propName) {
          return () => toss(sPropName(structName, propName), "is read-only.");
        };
        const __instancePointerMap = /* @__PURE__ */ new WeakMap();
        const xPtrPropName = "(pointer-is-external)";
        const __freeStruct = function(ctor, obj, m) {
          if (!m) m = __instancePointerMap.get(obj);
          if (m) {
            __instancePointerMap.delete(obj);
            if (Array.isArray(obj.ondispose)) {
              let x;
              while (x = obj.ondispose.shift()) {
                try {
                  if (x instanceof Function) x.call(obj);
                  else if (x instanceof StructType) x.dispose();
                  else if ("number" === typeof x) dealloc(x);
                } catch (e) {
                  console.warn(
                    "ondispose() for",
                    ctor.structName,
                    "@",
                    m,
                    "threw. NOT propagating it.",
                    e
                  );
                }
              }
            } else if (obj.ondispose instanceof Function) {
              try {
                obj.ondispose();
              } catch (e) {
                console.warn(
                  "ondispose() for",
                  ctor.structName,
                  "@",
                  m,
                  "threw. NOT propagating it.",
                  e
                );
              }
            }
            delete obj.ondispose;
            if (ctor.debugFlags.__flags.dealloc) {
              log(
                "debug.dealloc:",
                obj[xPtrPropName] ? "EXTERNAL" : "",
                ctor.structName,
                "instance:",
                ctor.structInfo.sizeof,
                "bytes @" + m
              );
            }
            if (!obj[xPtrPropName]) dealloc(m);
          }
        };
        const rop = (v2) => {
          return {
            configurable: false,
            writable: false,
            iterable: false,
            value: v2
          };
        };
        const __allocStruct = function(ctor, obj, m) {
          let fill = !m;
          if (m) Object.defineProperty(obj, xPtrPropName, rop(m));
          else {
            m = alloc(ctor.structInfo.sizeof);
            if (!m) toss("Allocation of", ctor.structName, "structure failed.");
          }
          try {
            if (ctor.debugFlags.__flags.alloc) {
              log(
                "debug.alloc:",
                fill ? "" : "EXTERNAL",
                ctor.structName,
                "instance:",
                ctor.structInfo.sizeof,
                "bytes @" + m
              );
            }
            if (fill) heap().fill(0, m, m + ctor.structInfo.sizeof);
            __instancePointerMap.set(obj, m);
          } catch (e) {
            __freeStruct(ctor, obj, m);
            throw e;
          }
        };
        const __memoryDump = function() {
          const p = this.pointer;
          return p ? new Uint8Array(heap().slice(p, p + this.structInfo.sizeof)) : null;
        };
        const __memberKey = (k) => memberPrefix + k + memberSuffix;
        const __memberKeyProp = rop(__memberKey);
        const __lookupMember = function(structInfo, memberName, tossIfNotFound = true) {
          let m = structInfo.members[memberName];
          if (!m && (memberPrefix || memberSuffix)) {
            for (const v2 of Object.values(structInfo.members)) {
              if (v2.key === memberName) {
                m = v2;
                break;
              }
            }
            if (!m && tossIfNotFound) {
              toss(
                sPropName(structInfo.name, memberName),
                "is not a mapped struct member."
              );
            }
          }
          return m;
        };
        const __memberSignature = function f(obj, memberName, emscriptenFormat = false) {
          if (!f._)
            f._ = (x) => x.replace(/[^vipPsjrdcC]/g, "").replace(/[pPscC]/g, "i");
          const m = __lookupMember(obj.structInfo, memberName, true);
          return emscriptenFormat ? f._(m.signature) : m.signature;
        };
        const __ptrPropDescriptor = {
          configurable: false,
          enumerable: false,
          get: function() {
            return __instancePointerMap.get(this);
          },
          set: () => toss("Cannot assign the 'pointer' property of a struct.")
        };
        const __structMemberKeys = rop(function() {
          const a = [];
          for (const k of Object.keys(this.structInfo.members)) {
            a.push(this.memberKey(k));
          }
          return a;
        });
        const __utf8Decoder = new TextDecoder("utf-8");
        const __utf8Encoder = new TextEncoder();
        const __SAB = "undefined" === typeof SharedArrayBuffer ? function() {
        } : SharedArrayBuffer;
        const __utf8Decode = function(arrayBuffer, begin, end) {
          return __utf8Decoder.decode(
            arrayBuffer.buffer instanceof __SAB ? arrayBuffer.slice(begin, end) : arrayBuffer.subarray(begin, end)
          );
        };
        const __memberIsString = function(obj, memberName, tossIfNotFound = false) {
          const m = __lookupMember(obj.structInfo, memberName, tossIfNotFound);
          return m && 1 === m.signature.length && "s" === m.signature[0] ? m : false;
        };
        const __affirmCStringSignature = function(member) {
          if ("s" === member.signature) return;
          toss(
            "Invalid member type signature for C-string value:",
            JSON.stringify(member)
          );
        };
        const __memberToJsString = function f(obj, memberName) {
          const m = __lookupMember(obj.structInfo, memberName, true);
          __affirmCStringSignature(m);
          const addr = obj[m.key];
          if (!addr) return null;
          let pos = addr;
          const mem = heap();
          for (; mem[pos] !== 0; ++pos) {
          }
          return addr === pos ? "" : __utf8Decode(mem, addr, pos);
        };
        const __addOnDispose = function(obj, ...v2) {
          if (obj.ondispose) {
            if (!Array.isArray(obj.ondispose)) {
              obj.ondispose = [obj.ondispose];
            }
          } else {
            obj.ondispose = [];
          }
          obj.ondispose.push(...v2);
        };
        const __allocCString = function(str) {
          const u = __utf8Encoder.encode(str);
          const mem = alloc(u.length + 1);
          if (!mem) toss("Allocation error while duplicating string:", str);
          const h = heap();
          h.set(u, mem);
          h[mem + u.length] = 0;
          return mem;
        };
        const __setMemberCString = function(obj, memberName, str) {
          const m = __lookupMember(obj.structInfo, memberName, true);
          __affirmCStringSignature(m);
          const mem = __allocCString(str);
          obj[m.key] = mem;
          __addOnDispose(obj, mem);
          return obj;
        };
        const StructType = function ctor(structName, structInfo) {
          if (arguments[2] !== rop) {
            toss(
              "Do not call the StructType constructor",
              "from client-level code."
            );
          }
          Object.defineProperties(this, {
            structName: rop(structName),
            structInfo: rop(structInfo)
          });
        };
        StructType.prototype = Object.create(null, {
          dispose: rop(function() {
            __freeStruct(this.constructor, this);
          }),
          lookupMember: rop(function(memberName, tossIfNotFound = true) {
            return __lookupMember(this.structInfo, memberName, tossIfNotFound);
          }),
          memberToJsString: rop(function(memberName) {
            return __memberToJsString(this, memberName);
          }),
          memberIsString: rop(function(memberName, tossIfNotFound = true) {
            return __memberIsString(this, memberName, tossIfNotFound);
          }),
          memberKey: __memberKeyProp,
          memberKeys: __structMemberKeys,
          memberSignature: rop(function(memberName, emscriptenFormat = false) {
            return __memberSignature(this, memberName, emscriptenFormat);
          }),
          memoryDump: rop(__memoryDump),
          pointer: __ptrPropDescriptor,
          setMemberCString: rop(function(memberName, str) {
            return __setMemberCString(this, memberName, str);
          })
        });
        Object.assign(StructType.prototype, {
          addOnDispose: function(...v2) {
            __addOnDispose(this, ...v2);
            return this;
          }
        });
        Object.defineProperties(StructType, {
          allocCString: rop(__allocCString),
          isA: rop((v2) => v2 instanceof StructType),
          hasExternalPointer: rop(
            (v2) => v2 instanceof StructType && !!v2[xPtrPropName]
          ),
          memberKey: __memberKeyProp
        });
        const isNumericValue = (v2) => Number.isFinite(v2) || v2 instanceof (BigInt2 || Number);
        const makeMemberWrapper = function f(ctor, name, descr) {
          if (!f._) {
            f._ = { getters: {}, setters: {}, sw: {} };
            const a = ["i", "c", "C", "p", "P", "s", "f", "d", "v()"];
            if (bigIntEnabled) a.push("j");
            a.forEach(function(v2) {
              f._.getters[v2] = sigDVGetter(v2);
              f._.setters[v2] = sigDVSetter(v2);
              f._.sw[v2] = sigDVSetWrapper(v2);
            });
            const rxSig1 = /^[ipPsjfdcC]$/, rxSig2 = /^[vipPsjfdcC]\([ipPsjfdcC]*\)$/;
            f.sigCheck = function(obj, name2, key2, sig) {
              if (Object.prototype.hasOwnProperty.call(obj, key2)) {
                toss(obj.structName, "already has a property named", key2 + ".");
              }
              rxSig1.test(sig) || rxSig2.test(sig) || toss(
                "Malformed signature for",
                sPropName(obj.structName, name2) + ":",
                sig
              );
            };
          }
          const key = ctor.memberKey(name);
          f.sigCheck(ctor.prototype, name, key, descr.signature);
          descr.key = key;
          descr.name = name;
          const sigGlyph = sigLetter(descr.signature);
          const xPropName = sPropName(ctor.prototype.structName, key);
          const dbg = ctor.prototype.debugFlags.__flags;
          const prop = /* @__PURE__ */ Object.create(null);
          prop.configurable = false;
          prop.enumerable = false;
          prop.get = function() {
            if (dbg.getter) {
              log(
                "debug.getter:",
                f._.getters[sigGlyph],
                "for",
                sigIR(sigGlyph),
                xPropName,
                "@",
                this.pointer,
                "+",
                descr.offset,
                "sz",
                descr.sizeof
              );
            }
            let rc = new DataView(
              heap().buffer,
              this.pointer + descr.offset,
              descr.sizeof
            )[f._.getters[sigGlyph]](0, isLittleEndian);
            if (dbg.getter) log("debug.getter:", xPropName, "result =", rc);
            return rc;
          };
          if (descr.readOnly) {
            prop.set = __propThrowOnSet(ctor.prototype.structName, key);
          } else {
            prop.set = function(v2) {
              if (dbg.setter) {
                log(
                  "debug.setter:",
                  f._.setters[sigGlyph],
                  "for",
                  sigIR(sigGlyph),
                  xPropName,
                  "@",
                  this.pointer,
                  "+",
                  descr.offset,
                  "sz",
                  descr.sizeof,
                  v2
                );
              }
              if (!this.pointer) {
                toss("Cannot set struct property on disposed instance.");
              }
              if (null === v2) v2 = 0;
              else
                while (!isNumericValue(v2)) {
                  if (isAutoPtrSig(descr.signature) && v2 instanceof StructType) {
                    v2 = v2.pointer || 0;
                    if (dbg.setter)
                      log("debug.setter:", xPropName, "resolved to", v2);
                    break;
                  }
                  toss("Invalid value for pointer-type", xPropName + ".");
                }
              new DataView(
                heap().buffer,
                this.pointer + descr.offset,
                descr.sizeof
              )[f._.setters[sigGlyph]](0, f._.sw[sigGlyph](v2), isLittleEndian);
            };
          }
          Object.defineProperty(ctor.prototype, key, prop);
        };
        const StructBinder = function StructBinder2(structName, structInfo) {
          if (1 === arguments.length) {
            structInfo = structName;
            structName = structInfo.name;
          } else if (!structInfo.name) {
            structInfo.name = structName;
          }
          if (!structName) toss("Struct name is required.");
          let lastMember = false;
          Object.keys(structInfo.members).forEach((k) => {
            const m = structInfo.members[k];
            if (!m.sizeof) toss(structName, "member", k, "is missing sizeof.");
            else if (m.sizeof === 1) {
              m.signature === "c" || m.signature === "C" || toss(
                "Unexpected sizeof==1 member",
                sPropName(structInfo.name, k),
                "with signature",
                m.signature
              );
            } else {
              if (0 !== m.sizeof % 4) {
                console.warn(
                  "Invalid struct member description =",
                  m,
                  "from",
                  structInfo
                );
                toss(
                  structName,
                  "member",
                  k,
                  "sizeof is not aligned. sizeof=" + m.sizeof
                );
              }
              if (0 !== m.offset % 4) {
                console.warn(
                  "Invalid struct member description =",
                  m,
                  "from",
                  structInfo
                );
                toss(
                  structName,
                  "member",
                  k,
                  "offset is not aligned. offset=" + m.offset
                );
              }
            }
            if (!lastMember || lastMember.offset < m.offset) lastMember = m;
          });
          if (!lastMember) toss("No member property descriptions found.");
          else if (structInfo.sizeof < lastMember.offset + lastMember.sizeof) {
            toss(
              "Invalid struct config:",
              structName,
              "max member offset (" + lastMember.offset + ") ",
              "extends past end of struct (sizeof=" + structInfo.sizeof + ")."
            );
          }
          const debugFlags = rop(SBF.__makeDebugFlags(StructBinder2.debugFlags));
          const StructCtor = function StructCtor2(externalMemory) {
            if (!(this instanceof StructCtor2)) {
              toss(
                "The",
                structName,
                "constructor may only be called via 'new'."
              );
            } else if (arguments.length) {
              if (externalMemory !== (externalMemory | 0) || externalMemory <= 0) {
                toss("Invalid pointer value for", structName, "constructor.");
              }
              __allocStruct(StructCtor2, this, externalMemory);
            } else {
              __allocStruct(StructCtor2, this);
            }
          };
          Object.defineProperties(StructCtor, {
            debugFlags,
            isA: rop((v2) => v2 instanceof StructCtor),
            memberKey: __memberKeyProp,
            memberKeys: __structMemberKeys,
            methodInfoForKey: rop(function(mKey) {
            }),
            structInfo: rop(structInfo),
            structName: rop(structName)
          });
          StructCtor.prototype = new StructType(structName, structInfo, rop);
          Object.defineProperties(StructCtor.prototype, {
            debugFlags,
            constructor: rop(StructCtor)
          });
          Object.keys(structInfo.members).forEach(
            (name) => makeMemberWrapper(StructCtor, name, structInfo.members[name])
          );
          return StructCtor;
        };
        StructBinder.StructType = StructType;
        StructBinder.config = config;
        StructBinder.allocCString = __allocCString;
        if (!StructBinder.debugFlags) {
          StructBinder.debugFlags = SBF.__makeDebugFlags(SBF.debugFlags);
        }
        return StructBinder;
      };
      globalThis.sqlite3ApiBootstrap.initializers.push(function(sqlite3) {
        const toss = (...args) => {
          throw new Error(args.join(" "));
        };
        sqlite3.SQLite3Error.toss;
        const capi = sqlite3.capi, wasm = sqlite3.wasm, util = sqlite3.util;
        globalThis.WhWasmUtilInstaller(wasm);
        delete globalThis.WhWasmUtilInstaller;
        wasm.bindingSignatures = [
          ["sqlite3_aggregate_context", "void*", "sqlite3_context*", "int"],
          ["sqlite3_bind_double", "int", "sqlite3_stmt*", "int", "f64"],
          ["sqlite3_bind_int", "int", "sqlite3_stmt*", "int", "int"],
          ["sqlite3_bind_null", void 0, "sqlite3_stmt*", "int"],
          ["sqlite3_bind_parameter_count", "int", "sqlite3_stmt*"],
          ["sqlite3_bind_parameter_index", "int", "sqlite3_stmt*", "string"],
          ["sqlite3_bind_parameter_name", "string", "sqlite3_stmt*", "int"],
          [
            "sqlite3_bind_pointer",
            "int",
            "sqlite3_stmt*",
            "int",
            "*",
            "string:static",
            "*"
          ],
          [
            "sqlite3_busy_handler",
            "int",
            [
              "sqlite3*",
              new wasm.xWrap.FuncPtrAdapter({
                signature: "i(pi)",
                contextKey: (argv, argIndex) => argv[0]
              }),
              "*"
            ]
          ],
          ["sqlite3_busy_timeout", "int", "sqlite3*", "int"],
          ["sqlite3_changes", "int", "sqlite3*"],
          ["sqlite3_clear_bindings", "int", "sqlite3_stmt*"],
          ["sqlite3_collation_needed", "int", "sqlite3*", "*", "*"],
          ["sqlite3_column_blob", "*", "sqlite3_stmt*", "int"],
          ["sqlite3_column_bytes", "int", "sqlite3_stmt*", "int"],
          ["sqlite3_column_count", "int", "sqlite3_stmt*"],
          ["sqlite3_column_decltype", "string", "sqlite3_stmt*", "int"],
          ["sqlite3_column_double", "f64", "sqlite3_stmt*", "int"],
          ["sqlite3_column_int", "int", "sqlite3_stmt*", "int"],
          ["sqlite3_column_name", "string", "sqlite3_stmt*", "int"],
          ["sqlite3_column_text", "string", "sqlite3_stmt*", "int"],
          ["sqlite3_column_type", "int", "sqlite3_stmt*", "int"],
          ["sqlite3_column_value", "sqlite3_value*", "sqlite3_stmt*", "int"],
          [
            "sqlite3_commit_hook",
            "void*",
            [
              "sqlite3*",
              new wasm.xWrap.FuncPtrAdapter({
                name: "sqlite3_commit_hook",
                signature: "i(p)",
                contextKey: (argv) => argv[0]
              }),
              "*"
            ]
          ],
          ["sqlite3_compileoption_get", "string", "int"],
          ["sqlite3_compileoption_used", "int", "string"],
          ["sqlite3_complete", "int", "string:flexible"],
          ["sqlite3_context_db_handle", "sqlite3*", "sqlite3_context*"],
          ["sqlite3_data_count", "int", "sqlite3_stmt*"],
          ["sqlite3_db_filename", "string", "sqlite3*", "string"],
          ["sqlite3_db_handle", "sqlite3*", "sqlite3_stmt*"],
          ["sqlite3_db_name", "string", "sqlite3*", "int"],
          ["sqlite3_db_readonly", "int", "sqlite3*", "string"],
          ["sqlite3_db_status", "int", "sqlite3*", "int", "*", "*", "int"],
          ["sqlite3_errcode", "int", "sqlite3*"],
          ["sqlite3_errmsg", "string", "sqlite3*"],
          ["sqlite3_error_offset", "int", "sqlite3*"],
          ["sqlite3_errstr", "string", "int"],
          [
            "sqlite3_exec",
            "int",
            [
              "sqlite3*",
              "string:flexible",
              new wasm.xWrap.FuncPtrAdapter({
                signature: "i(pipp)",
                bindScope: "transient",
                callProxy: (callback) => {
                  let aNames;
                  return (pVoid, nCols, pColVals, pColNames) => {
                    try {
                      const aVals = wasm.cArgvToJs(nCols, pColVals);
                      if (!aNames) aNames = wasm.cArgvToJs(nCols, pColNames);
                      return callback(aVals, aNames) | 0;
                    } catch (e) {
                      return e.resultCode || capi.SQLITE_ERROR;
                    }
                  };
                }
              }),
              "*",
              "**"
            ]
          ],
          ["sqlite3_expanded_sql", "string", "sqlite3_stmt*"],
          ["sqlite3_extended_errcode", "int", "sqlite3*"],
          ["sqlite3_extended_result_codes", "int", "sqlite3*", "int"],
          ["sqlite3_file_control", "int", "sqlite3*", "string", "int", "*"],
          ["sqlite3_finalize", "int", "sqlite3_stmt*"],
          ["sqlite3_free", void 0, "*"],
          ["sqlite3_get_autocommit", "int", "sqlite3*"],
          ["sqlite3_get_auxdata", "*", "sqlite3_context*", "int"],
          ["sqlite3_initialize", void 0],
          ["sqlite3_interrupt", void 0, "sqlite3*"],
          ["sqlite3_is_interrupted", "int", "sqlite3*"],
          ["sqlite3_keyword_count", "int"],
          ["sqlite3_keyword_name", "int", ["int", "**", "*"]],
          ["sqlite3_keyword_check", "int", ["string", "int"]],
          ["sqlite3_libversion", "string"],
          ["sqlite3_libversion_number", "int"],
          ["sqlite3_limit", "int", ["sqlite3*", "int", "int"]],
          ["sqlite3_malloc", "*", "int"],
          ["sqlite3_open", "int", "string", "*"],
          ["sqlite3_open_v2", "int", "string", "*", "int", "string"],
          ["sqlite3_realloc", "*", "*", "int"],
          ["sqlite3_reset", "int", "sqlite3_stmt*"],
          [
            "sqlite3_result_blob",
            void 0,
            "sqlite3_context*",
            "*",
            "int",
            "*"
          ],
          ["sqlite3_result_double", void 0, "sqlite3_context*", "f64"],
          [
            "sqlite3_result_error",
            void 0,
            "sqlite3_context*",
            "string",
            "int"
          ],
          ["sqlite3_result_error_code", void 0, "sqlite3_context*", "int"],
          ["sqlite3_result_error_nomem", void 0, "sqlite3_context*"],
          ["sqlite3_result_error_toobig", void 0, "sqlite3_context*"],
          ["sqlite3_result_int", void 0, "sqlite3_context*", "int"],
          ["sqlite3_result_null", void 0, "sqlite3_context*"],
          [
            "sqlite3_result_pointer",
            void 0,
            "sqlite3_context*",
            "*",
            "string:static",
            "*"
          ],
          ["sqlite3_result_subtype", void 0, "sqlite3_value*", "int"],
          [
            "sqlite3_result_text",
            void 0,
            "sqlite3_context*",
            "string",
            "int",
            "*"
          ],
          ["sqlite3_result_zeroblob", void 0, "sqlite3_context*", "int"],
          [
            "sqlite3_rollback_hook",
            "void*",
            [
              "sqlite3*",
              new wasm.xWrap.FuncPtrAdapter({
                name: "sqlite3_rollback_hook",
                signature: "v(p)",
                contextKey: (argv) => argv[0]
              }),
              "*"
            ]
          ],
          [
            "sqlite3_set_auxdata",
            void 0,
            [
              "sqlite3_context*",
              "int",
              "*",
              "*"
            ]
          ],
          ["sqlite3_shutdown", void 0],
          ["sqlite3_sourceid", "string"],
          ["sqlite3_sql", "string", "sqlite3_stmt*"],
          ["sqlite3_status", "int", "int", "*", "*", "int"],
          ["sqlite3_step", "int", "sqlite3_stmt*"],
          ["sqlite3_stmt_busy", "int", "sqlite3_stmt*"],
          ["sqlite3_stmt_readonly", "int", "sqlite3_stmt*"],
          ["sqlite3_stmt_status", "int", "sqlite3_stmt*", "int", "int"],
          ["sqlite3_strglob", "int", "string", "string"],
          ["sqlite3_stricmp", "int", "string", "string"],
          ["sqlite3_strlike", "int", "string", "string", "int"],
          ["sqlite3_strnicmp", "int", "string", "string", "int"],
          [
            "sqlite3_table_column_metadata",
            "int",
            "sqlite3*",
            "string",
            "string",
            "string",
            "**",
            "**",
            "*",
            "*",
            "*"
          ],
          ["sqlite3_total_changes", "int", "sqlite3*"],
          [
            "sqlite3_trace_v2",
            "int",
            [
              "sqlite3*",
              "int",
              new wasm.xWrap.FuncPtrAdapter({
                name: "sqlite3_trace_v2::callback",
                signature: "i(ippp)",
                contextKey: (argv, argIndex) => argv[0]
              }),
              "*"
            ]
          ],
          ["sqlite3_txn_state", "int", ["sqlite3*", "string"]],
          ["sqlite3_uri_boolean", "int", "sqlite3_filename", "string", "int"],
          ["sqlite3_uri_key", "string", "sqlite3_filename", "int"],
          ["sqlite3_uri_parameter", "string", "sqlite3_filename", "string"],
          ["sqlite3_user_data", "void*", "sqlite3_context*"],
          ["sqlite3_value_blob", "*", "sqlite3_value*"],
          ["sqlite3_value_bytes", "int", "sqlite3_value*"],
          ["sqlite3_value_double", "f64", "sqlite3_value*"],
          ["sqlite3_value_dup", "sqlite3_value*", "sqlite3_value*"],
          ["sqlite3_value_free", void 0, "sqlite3_value*"],
          ["sqlite3_value_frombind", "int", "sqlite3_value*"],
          ["sqlite3_value_int", "int", "sqlite3_value*"],
          ["sqlite3_value_nochange", "int", "sqlite3_value*"],
          ["sqlite3_value_numeric_type", "int", "sqlite3_value*"],
          ["sqlite3_value_pointer", "*", "sqlite3_value*", "string:static"],
          ["sqlite3_value_subtype", "int", "sqlite3_value*"],
          ["sqlite3_value_text", "string", "sqlite3_value*"],
          ["sqlite3_value_type", "int", "sqlite3_value*"],
          ["sqlite3_vfs_find", "*", "string"],
          ["sqlite3_vfs_register", "int", "sqlite3_vfs*", "int"],
          ["sqlite3_vfs_unregister", "int", "sqlite3_vfs*"]
        ];
        if (!!wasm.exports.sqlite3_progress_handler) {
          wasm.bindingSignatures.push([
            "sqlite3_progress_handler",
            void 0,
            [
              "sqlite3*",
              "int",
              new wasm.xWrap.FuncPtrAdapter({
                name: "xProgressHandler",
                signature: "i(p)",
                bindScope: "context",
                contextKey: (argv, argIndex) => argv[0]
              }),
              "*"
            ]
          ]);
        }
        if (!!wasm.exports.sqlite3_stmt_explain) {
          wasm.bindingSignatures.push(
            ["sqlite3_stmt_explain", "int", "sqlite3_stmt*", "int"],
            ["sqlite3_stmt_isexplain", "int", "sqlite3_stmt*"]
          );
        }
        if (!!wasm.exports.sqlite3_set_authorizer) {
          wasm.bindingSignatures.push([
            "sqlite3_set_authorizer",
            "int",
            [
              "sqlite3*",
              new wasm.xWrap.FuncPtrAdapter({
                name: "sqlite3_set_authorizer::xAuth",
                signature: "i(pissss)",
                contextKey: (argv, argIndex) => argv[0],
                callProxy: (callback) => {
                  return (pV, iCode, s0, s1, s2, s3) => {
                    try {
                      s0 = s0 && wasm.cstrToJs(s0);
                      s1 = s1 && wasm.cstrToJs(s1);
                      s2 = s2 && wasm.cstrToJs(s2);
                      s3 = s3 && wasm.cstrToJs(s3);
                      return callback(pV, iCode, s0, s1, s2, s3) || 0;
                    } catch (e) {
                      return e.resultCode || capi.SQLITE_ERROR;
                    }
                  };
                }
              }),
              "*"
            ]
          ]);
        }
        wasm.bindingSignatures.int64 = [
          ["sqlite3_bind_int64", "int", ["sqlite3_stmt*", "int", "i64"]],
          ["sqlite3_changes64", "i64", ["sqlite3*"]],
          ["sqlite3_column_int64", "i64", ["sqlite3_stmt*", "int"]],
          [
            "sqlite3_deserialize",
            "int",
            "sqlite3*",
            "string",
            "*",
            "i64",
            "i64",
            "int"
          ],
          ["sqlite3_last_insert_rowid", "i64", ["sqlite3*"]],
          ["sqlite3_malloc64", "*", "i64"],
          ["sqlite3_msize", "i64", "*"],
          ["sqlite3_overload_function", "int", ["sqlite3*", "string", "int"]],
          ["sqlite3_realloc64", "*", "*", "i64"],
          ["sqlite3_result_int64", void 0, "*", "i64"],
          ["sqlite3_result_zeroblob64", "int", "*", "i64"],
          ["sqlite3_serialize", "*", "sqlite3*", "string", "*", "int"],
          ["sqlite3_set_last_insert_rowid", void 0, ["sqlite3*", "i64"]],
          ["sqlite3_status64", "int", "int", "*", "*", "int"],
          ["sqlite3_total_changes64", "i64", ["sqlite3*"]],
          [
            "sqlite3_update_hook",
            "*",
            [
              "sqlite3*",
              new wasm.xWrap.FuncPtrAdapter({
                name: "sqlite3_update_hook",
                signature: "v(iippj)",
                contextKey: (argv) => argv[0],
                callProxy: (callback) => {
                  return (p, op, z0, z1, rowid) => {
                    callback(
                      p,
                      op,
                      wasm.cstrToJs(z0),
                      wasm.cstrToJs(z1),
                      rowid
                    );
                  };
                }
              }),
              "*"
            ]
          ],
          ["sqlite3_uri_int64", "i64", ["sqlite3_filename", "string", "i64"]],
          ["sqlite3_value_int64", "i64", "sqlite3_value*"]
        ];
        if (wasm.bigIntEnabled && !!wasm.exports.sqlite3_declare_vtab) {
          wasm.bindingSignatures.int64.push(
            [
              "sqlite3_create_module",
              "int",
              ["sqlite3*", "string", "sqlite3_module*", "*"]
            ],
            [
              "sqlite3_create_module_v2",
              "int",
              ["sqlite3*", "string", "sqlite3_module*", "*", "*"]
            ],
            ["sqlite3_declare_vtab", "int", ["sqlite3*", "string:flexible"]],
            ["sqlite3_drop_modules", "int", ["sqlite3*", "**"]],
            ["sqlite3_vtab_collation", "string", "sqlite3_index_info*", "int"],
            ["sqlite3_vtab_distinct", "int", "sqlite3_index_info*"],
            ["sqlite3_vtab_in", "int", "sqlite3_index_info*", "int", "int"],
            ["sqlite3_vtab_in_first", "int", "sqlite3_value*", "**"],
            ["sqlite3_vtab_in_next", "int", "sqlite3_value*", "**"],
            ["sqlite3_vtab_nochange", "int", "sqlite3_context*"],
            ["sqlite3_vtab_on_conflict", "int", "sqlite3*"],
            [
              "sqlite3_vtab_rhs_value",
              "int",
              "sqlite3_index_info*",
              "int",
              "**"
            ]
          );
        }
        if (wasm.bigIntEnabled && !!wasm.exports.sqlite3_preupdate_hook) {
          wasm.bindingSignatures.int64.push(
            ["sqlite3_preupdate_blobwrite", "int", "sqlite3*"],
            ["sqlite3_preupdate_count", "int", "sqlite3*"],
            ["sqlite3_preupdate_depth", "int", "sqlite3*"],
            [
              "sqlite3_preupdate_hook",
              "*",
              [
                "sqlite3*",
                new wasm.xWrap.FuncPtrAdapter({
                  name: "sqlite3_preupdate_hook",
                  signature: "v(ppippjj)",
                  contextKey: (argv) => argv[0],
                  callProxy: (callback) => {
                    return (p, db, op, zDb, zTbl, iKey1, iKey2) => {
                      callback(
                        p,
                        db,
                        op,
                        wasm.cstrToJs(zDb),
                        wasm.cstrToJs(zTbl),
                        iKey1,
                        iKey2
                      );
                    };
                  }
                }),
                "*"
              ]
            ],
            ["sqlite3_preupdate_new", "int", ["sqlite3*", "int", "**"]],
            ["sqlite3_preupdate_old", "int", ["sqlite3*", "int", "**"]]
          );
        }
        if (wasm.bigIntEnabled && !!wasm.exports.sqlite3changegroup_add && !!wasm.exports.sqlite3session_create && !!wasm.exports.sqlite3_preupdate_hook) {
          const __ipsProxy = {
            signature: "i(ps)",
            callProxy: (callback) => {
              return (p, s) => {
                try {
                  return callback(p, wasm.cstrToJs(s)) | 0;
                } catch (e) {
                  return e.resultCode || capi.SQLITE_ERROR;
                }
              };
            }
          };
          wasm.bindingSignatures.int64.push(
            ...[
              [
                "sqlite3changegroup_add",
                "int",
                ["sqlite3_changegroup*", "int", "void*"]
              ],
              [
                "sqlite3changegroup_add_strm",
                "int",
                [
                  "sqlite3_changegroup*",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xInput",
                    signature: "i(ppp)",
                    bindScope: "transient"
                  }),
                  "void*"
                ]
              ],
              [
                "sqlite3changegroup_delete",
                void 0,
                ["sqlite3_changegroup*"]
              ],
              ["sqlite3changegroup_new", "int", ["**"]],
              [
                "sqlite3changegroup_output",
                "int",
                ["sqlite3_changegroup*", "int*", "**"]
              ],
              [
                "sqlite3changegroup_output_strm",
                "int",
                [
                  "sqlite3_changegroup*",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xOutput",
                    signature: "i(ppi)",
                    bindScope: "transient"
                  }),
                  "void*"
                ]
              ],
              [
                "sqlite3changeset_apply",
                "int",
                [
                  "sqlite3*",
                  "int",
                  "void*",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xFilter",
                    bindScope: "transient",
                    ...__ipsProxy
                  }),
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xConflict",
                    signature: "i(pip)",
                    bindScope: "transient"
                  }),
                  "void*"
                ]
              ],
              [
                "sqlite3changeset_apply_strm",
                "int",
                [
                  "sqlite3*",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xInput",
                    signature: "i(ppp)",
                    bindScope: "transient"
                  }),
                  "void*",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xFilter",
                    bindScope: "transient",
                    ...__ipsProxy
                  }),
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xConflict",
                    signature: "i(pip)",
                    bindScope: "transient"
                  }),
                  "void*"
                ]
              ],
              [
                "sqlite3changeset_apply_v2",
                "int",
                [
                  "sqlite3*",
                  "int",
                  "void*",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xFilter",
                    bindScope: "transient",
                    ...__ipsProxy
                  }),
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xConflict",
                    signature: "i(pip)",
                    bindScope: "transient"
                  }),
                  "void*",
                  "**",
                  "int*",
                  "int"
                ]
              ],
              [
                "sqlite3changeset_apply_v2_strm",
                "int",
                [
                  "sqlite3*",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xInput",
                    signature: "i(ppp)",
                    bindScope: "transient"
                  }),
                  "void*",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xFilter",
                    bindScope: "transient",
                    ...__ipsProxy
                  }),
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xConflict",
                    signature: "i(pip)",
                    bindScope: "transient"
                  }),
                  "void*",
                  "**",
                  "int*",
                  "int"
                ]
              ],
              [
                "sqlite3changeset_concat",
                "int",
                ["int", "void*", "int", "void*", "int*", "**"]
              ],
              [
                "sqlite3changeset_concat_strm",
                "int",
                [
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xInputA",
                    signature: "i(ppp)",
                    bindScope: "transient"
                  }),
                  "void*",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xInputB",
                    signature: "i(ppp)",
                    bindScope: "transient"
                  }),
                  "void*",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xOutput",
                    signature: "i(ppi)",
                    bindScope: "transient"
                  }),
                  "void*"
                ]
              ],
              [
                "sqlite3changeset_conflict",
                "int",
                ["sqlite3_changeset_iter*", "int", "**"]
              ],
              ["sqlite3changeset_finalize", "int", ["sqlite3_changeset_iter*"]],
              [
                "sqlite3changeset_fk_conflicts",
                "int",
                ["sqlite3_changeset_iter*", "int*"]
              ],
              [
                "sqlite3changeset_invert",
                "int",
                ["int", "void*", "int*", "**"]
              ],
              [
                "sqlite3changeset_invert_strm",
                "int",
                [
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xInput",
                    signature: "i(ppp)",
                    bindScope: "transient"
                  }),
                  "void*",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xOutput",
                    signature: "i(ppi)",
                    bindScope: "transient"
                  }),
                  "void*"
                ]
              ],
              [
                "sqlite3changeset_new",
                "int",
                ["sqlite3_changeset_iter*", "int", "**"]
              ],
              ["sqlite3changeset_next", "int", ["sqlite3_changeset_iter*"]],
              [
                "sqlite3changeset_old",
                "int",
                ["sqlite3_changeset_iter*", "int", "**"]
              ],
              [
                "sqlite3changeset_op",
                "int",
                ["sqlite3_changeset_iter*", "**", "int*", "int*", "int*"]
              ],
              [
                "sqlite3changeset_pk",
                "int",
                ["sqlite3_changeset_iter*", "**", "int*"]
              ],
              ["sqlite3changeset_start", "int", ["**", "int", "*"]],
              [
                "sqlite3changeset_start_strm",
                "int",
                [
                  "**",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xInput",
                    signature: "i(ppp)",
                    bindScope: "transient"
                  }),
                  "void*"
                ]
              ],
              ["sqlite3changeset_start_v2", "int", ["**", "int", "*", "int"]],
              [
                "sqlite3changeset_start_v2_strm",
                "int",
                [
                  "**",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xInput",
                    signature: "i(ppp)",
                    bindScope: "transient"
                  }),
                  "void*",
                  "int"
                ]
              ],
              ["sqlite3session_attach", "int", ["sqlite3_session*", "string"]],
              [
                "sqlite3session_changeset",
                "int",
                ["sqlite3_session*", "int*", "**"]
              ],
              ["sqlite3session_changeset_size", "i64", ["sqlite3_session*"]],
              [
                "sqlite3session_changeset_strm",
                "int",
                [
                  "sqlite3_session*",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xOutput",
                    signature: "i(ppp)",
                    bindScope: "transient"
                  }),
                  "void*"
                ]
              ],
              ["sqlite3session_config", "int", ["int", "void*"]],
              ["sqlite3session_create", "int", ["sqlite3*", "string", "**"]],
              [
                "sqlite3session_diff",
                "int",
                ["sqlite3_session*", "string", "string", "**"]
              ],
              ["sqlite3session_enable", "int", ["sqlite3_session*", "int"]],
              ["sqlite3session_indirect", "int", ["sqlite3_session*", "int"]],
              ["sqlite3session_isempty", "int", ["sqlite3_session*"]],
              ["sqlite3session_memory_used", "i64", ["sqlite3_session*"]],
              [
                "sqlite3session_object_config",
                "int",
                ["sqlite3_session*", "int", "void*"]
              ],
              [
                "sqlite3session_patchset",
                "int",
                ["sqlite3_session*", "*", "**"]
              ],
              [
                "sqlite3session_patchset_strm",
                "int",
                [
                  "sqlite3_session*",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xOutput",
                    signature: "i(ppp)",
                    bindScope: "transient"
                  }),
                  "void*"
                ]
              ],
              [
                "sqlite3session_table_filter",
                void 0,
                [
                  "sqlite3_session*",
                  new wasm.xWrap.FuncPtrAdapter({
                    name: "xFilter",
                    ...__ipsProxy,
                    contextKey: (argv, argIndex) => argv[0]
                  }),
                  "*"
                ]
              ]
            ]
          );
        }
        wasm.bindingSignatures.wasmInternal = [
          ["sqlite3__wasm_db_reset", "int", "sqlite3*"],
          ["sqlite3__wasm_db_vfs", "sqlite3_vfs*", "sqlite3*", "string"],
          [
            "sqlite3__wasm_vfs_create_file",
            "int",
            "sqlite3_vfs*",
            "string",
            "*",
            "int"
          ],
          ["sqlite3__wasm_posix_create_file", "int", "string", "*", "int"],
          ["sqlite3__wasm_vfs_unlink", "int", "sqlite3_vfs*", "string"],
          ["sqlite3__wasm_qfmt_token", "string:dealloc", "string", "int"]
        ];
        sqlite3.StructBinder = globalThis.Jaccwabyt({
          heap: wasm.heap8u,
          alloc: wasm.alloc,
          dealloc: wasm.dealloc,
          bigIntEnabled: wasm.bigIntEnabled,
          memberPrefix: "$"
        });
        delete globalThis.Jaccwabyt;
        {
          const __xString = wasm.xWrap.argAdapter("string");
          wasm.xWrap.argAdapter(
            "string:flexible",
            (v2) => __xString(util.flexibleString(v2))
          );
          wasm.xWrap.argAdapter(
            "string:static",
            function(v2) {
              if (wasm.isPtr(v2)) return v2;
              v2 = "" + v2;
              let rc = this[v2];
              return rc || (this[v2] = wasm.allocCString(v2));
            }.bind(/* @__PURE__ */ Object.create(null))
          );
          const __xArgPtr = wasm.xWrap.argAdapter("*");
          const nilType = function() {
          };
          wasm.xWrap.argAdapter("sqlite3_filename", __xArgPtr)(
            "sqlite3_context*",
            __xArgPtr
          )("sqlite3_value*", __xArgPtr)("void*", __xArgPtr)(
            "sqlite3_changegroup*",
            __xArgPtr
          )("sqlite3_changeset_iter*", __xArgPtr)(
            "sqlite3_session*",
            __xArgPtr
          )(
            "sqlite3_stmt*",
            (v2) => __xArgPtr(
              v2 instanceof (sqlite3?.oo1?.Stmt || nilType) ? v2.pointer : v2
            )
          )(
            "sqlite3*",
            (v2) => __xArgPtr(
              v2 instanceof (sqlite3?.oo1?.DB || nilType) ? v2.pointer : v2
            )
          )("sqlite3_vfs*", (v2) => {
            if ("string" === typeof v2) {
              return capi.sqlite3_vfs_find(v2) || sqlite3.SQLite3Error.toss(
                capi.SQLITE_NOTFOUND,
                "Unknown sqlite3_vfs name:",
                v2
              );
            }
            return __xArgPtr(
              v2 instanceof (capi.sqlite3_vfs || nilType) ? v2.pointer : v2
            );
          });
          if (wasm.exports.sqlite3_declare_vtab) {
            wasm.xWrap.argAdapter(
              "sqlite3_index_info*",
              (v2) => __xArgPtr(
                v2 instanceof (capi.sqlite3_index_info || nilType) ? v2.pointer : v2
              )
            )(
              "sqlite3_module*",
              (v2) => __xArgPtr(
                v2 instanceof (capi.sqlite3_module || nilType) ? v2.pointer : v2
              )
            );
          }
          const __xRcPtr = wasm.xWrap.resultAdapter("*");
          wasm.xWrap.resultAdapter("sqlite3*", __xRcPtr)(
            "sqlite3_context*",
            __xRcPtr
          )("sqlite3_stmt*", __xRcPtr)("sqlite3_value*", __xRcPtr)(
            "sqlite3_vfs*",
            __xRcPtr
          )("void*", __xRcPtr);
          if (0 === wasm.exports.sqlite3_step.length) {
            wasm.xWrap.doArgcCheck = false;
            sqlite3.config.warn(
              "Disabling sqlite3.wasm.xWrap.doArgcCheck due to environmental quirks."
            );
          }
          for (const e of wasm.bindingSignatures) {
            capi[e[0]] = wasm.xWrap.apply(null, e);
          }
          for (const e of wasm.bindingSignatures.wasmInternal) {
            util[e[0]] = wasm.xWrap.apply(null, e);
          }
          const fI64Disabled = function(fname) {
            return () => toss(
              fname + "() is unavailable due to lack",
              "of BigInt support in this build."
            );
          };
          for (const e of wasm.bindingSignatures.int64) {
            capi[e[0]] = wasm.bigIntEnabled ? wasm.xWrap.apply(null, e) : fI64Disabled(e[0]);
          }
          delete wasm.bindingSignatures;
          if (wasm.exports.sqlite3__wasm_db_error) {
            const __db_err = wasm.xWrap(
              "sqlite3__wasm_db_error",
              "int",
              "sqlite3*",
              "int",
              "string"
            );
            util.sqlite3__wasm_db_error = function(pDb2, resultCode, message) {
              if (resultCode instanceof sqlite3.WasmAllocError) {
                resultCode = capi.SQLITE_NOMEM;
                message = 0;
              } else if (resultCode instanceof Error) {
                message = message || "" + resultCode;
                resultCode = resultCode.resultCode || capi.SQLITE_ERROR;
              }
              return pDb2 ? __db_err(pDb2, resultCode, message) : resultCode;
            };
          } else {
            util.sqlite3__wasm_db_error = function(pDb2, errCode, msg) {
              console.warn(
                "sqlite3__wasm_db_error() is not exported.",
                arguments
              );
              return errCode;
            };
          }
        }
        {
          const cJson = wasm.xCall("sqlite3__wasm_enum_json");
          if (!cJson) {
            toss(
              "Maintenance required: increase sqlite3__wasm_enum_json()'s",
              "static buffer size!"
            );
          }
          wasm.ctype = JSON.parse(wasm.cstrToJs(cJson));
          const defineGroups = [
            "access",
            "authorizer",
            "blobFinalizers",
            "changeset",
            "config",
            "dataTypes",
            "dbConfig",
            "dbStatus",
            "encodings",
            "fcntl",
            "flock",
            "ioCap",
            "limits",
            "openFlags",
            "prepareFlags",
            "resultCodes",
            "sqlite3Status",
            "stmtStatus",
            "syncFlags",
            "trace",
            "txnState",
            "udfFlags",
            "version"
          ];
          if (wasm.bigIntEnabled) {
            defineGroups.push("serialize", "session", "vtab");
          }
          for (const t of defineGroups) {
            for (const e of Object.entries(wasm.ctype[t])) {
              capi[e[0]] = e[1];
            }
          }
          if (!wasm.functionEntry(capi.SQLITE_WASM_DEALLOC)) {
            toss(
              "Internal error: cannot resolve exported function",
              "entry SQLITE_WASM_DEALLOC (==" + capi.SQLITE_WASM_DEALLOC + ")."
            );
          }
          const __rcMap = /* @__PURE__ */ Object.create(null);
          for (const t of ["resultCodes"]) {
            for (const e of Object.entries(wasm.ctype[t])) {
              __rcMap[e[1]] = e[0];
            }
          }
          capi.sqlite3_js_rc_str = (rc) => __rcMap[rc];
          const notThese = Object.assign(/* @__PURE__ */ Object.create(null), {
            WasmTestStruct: true,
            sqlite3_kvvfs_methods: !util.isUIThread(),
            sqlite3_index_info: !wasm.bigIntEnabled,
            sqlite3_index_constraint: !wasm.bigIntEnabled,
            sqlite3_index_orderby: !wasm.bigIntEnabled,
            sqlite3_index_constraint_usage: !wasm.bigIntEnabled
          });
          for (const s of wasm.ctype.structs) {
            if (!notThese[s.name]) {
              capi[s.name] = sqlite3.StructBinder(s);
            }
          }
          if (capi.sqlite3_index_info) {
            for (const k of [
              "sqlite3_index_constraint",
              "sqlite3_index_orderby",
              "sqlite3_index_constraint_usage"
            ]) {
              capi.sqlite3_index_info[k] = capi[k];
              delete capi[k];
            }
            capi.sqlite3_vtab_config = wasm.xWrap(
              "sqlite3__wasm_vtab_config",
              "int",
              ["sqlite3*", "int", "int"]
            );
          }
        }
        const __dbArgcMismatch = (pDb2, f, n) => {
          return util.sqlite3__wasm_db_error(
            pDb2,
            capi.SQLITE_MISUSE,
            f + "() requires " + n + " argument" + (1 === n ? "" : "s") + "."
          );
        };
        const __errEncoding = (pDb2) => {
          return util.sqlite3__wasm_db_error(
            pDb2,
            capi.SQLITE_FORMAT,
            "SQLITE_UTF8 is the only supported encoding."
          );
        };
        const __argPDb = (pDb2) => wasm.xWrap.argAdapter("sqlite3*")(pDb2);
        const __argStr = (str) => wasm.isPtr(str) ? wasm.cstrToJs(str) : str;
        const __dbCleanupMap = function(pDb2, mode) {
          pDb2 = __argPDb(pDb2);
          let m = this.dbMap.get(pDb2);
          if (!mode) {
            this.dbMap.delete(pDb2);
            return m;
          } else if (!m && mode > 0) {
            this.dbMap.set(pDb2, m = /* @__PURE__ */ Object.create(null));
          }
          return m;
        }.bind(
          Object.assign(/* @__PURE__ */ Object.create(null), {
            dbMap: /* @__PURE__ */ new Map()
          })
        );
        __dbCleanupMap.addCollation = function(pDb2, name) {
          const m = __dbCleanupMap(pDb2, 1);
          if (!m.collation) m.collation = /* @__PURE__ */ new Set();
          m.collation.add(__argStr(name).toLowerCase());
        };
        __dbCleanupMap._addUDF = function(pDb2, name, arity, map) {
          name = __argStr(name).toLowerCase();
          let u = map.get(name);
          if (!u) map.set(name, u = /* @__PURE__ */ new Set());
          u.add(arity < 0 ? -1 : arity);
        };
        __dbCleanupMap.addFunction = function(pDb2, name, arity) {
          const m = __dbCleanupMap(pDb2, 1);
          if (!m.udf) m.udf = /* @__PURE__ */ new Map();
          this._addUDF(pDb2, name, arity, m.udf);
        };
        if (wasm.exports.sqlite3_create_window_function) {
          __dbCleanupMap.addWindowFunc = function(pDb2, name, arity) {
            const m = __dbCleanupMap(pDb2, 1);
            if (!m.wudf) m.wudf = /* @__PURE__ */ new Map();
            this._addUDF(pDb2, name, arity, m.wudf);
          };
        }
        __dbCleanupMap.cleanup = function(pDb2) {
          pDb2 = __argPDb(pDb2);
          const closeArgs = [pDb2];
          for (const name of [
            "sqlite3_busy_handler",
            "sqlite3_commit_hook",
            "sqlite3_preupdate_hook",
            "sqlite3_progress_handler",
            "sqlite3_rollback_hook",
            "sqlite3_set_authorizer",
            "sqlite3_trace_v2",
            "sqlite3_update_hook"
          ]) {
            const x = wasm.exports[name];
            if (!x) {
              continue;
            }
            closeArgs.length = x.length;
            try {
              capi[name](...closeArgs);
            } catch (e) {
              sqlite3.config.warn(
                "close-time call of",
                name + "(",
                closeArgs,
                ") threw:",
                e
              );
            }
          }
          const m = __dbCleanupMap(pDb2, 0);
          if (!m) return;
          if (m.collation) {
            for (const name of m.collation) {
              try {
                capi.sqlite3_create_collation_v2(
                  pDb2,
                  name,
                  capi.SQLITE_UTF8,
                  0,
                  0,
                  0
                );
              } catch (e) {
              }
            }
            delete m.collation;
          }
          let i;
          for (i = 0; i < 2; ++i) {
            const fmap = i ? m.wudf : m.udf;
            if (!fmap) continue;
            const func = i ? capi.sqlite3_create_window_function : capi.sqlite3_create_function_v2;
            for (const e of fmap) {
              const name = e[0], arities = e[1];
              const fargs = [pDb2, name, 0, capi.SQLITE_UTF8, 0, 0, 0, 0, 0];
              if (i) fargs.push(0);
              for (const arity of arities) {
                try {
                  fargs[2] = arity;
                  func.apply(null, fargs);
                } catch (e2) {
                }
              }
              arities.clear();
            }
            fmap.clear();
          }
          delete m.udf;
          delete m.wudf;
        };
        {
          const __sqlite3CloseV2 = wasm.xWrap(
            "sqlite3_close_v2",
            "int",
            "sqlite3*"
          );
          capi.sqlite3_close_v2 = function(pDb2) {
            if (1 !== arguments.length)
              return __dbArgcMismatch(pDb2, "sqlite3_close_v2", 1);
            if (pDb2) {
              try {
                __dbCleanupMap.cleanup(pDb2);
              } catch (e) {
              }
            }
            return __sqlite3CloseV2(pDb2);
          };
        }
        if (capi.sqlite3session_create) {
          const __sqlite3SessionDelete = wasm.xWrap(
            "sqlite3session_delete",
            void 0,
            ["sqlite3_session*"]
          );
          capi.sqlite3session_delete = function(pSession) {
            if (1 !== arguments.length) {
              return __dbArgcMismatch(pDb, "sqlite3session_delete", 1);
            } else if (pSession) {
              capi.sqlite3session_table_filter(pSession, 0, 0);
            }
            __sqlite3SessionDelete(pSession);
          };
        }
        {
          const contextKey = (argv, argIndex) => {
            return "argv[" + argIndex + "]:" + argv[0] + ":" + wasm.cstrToJs(argv[1]).toLowerCase();
          };
          const __sqlite3CreateCollationV2 = wasm.xWrap(
            "sqlite3_create_collation_v2",
            "int",
            [
              "sqlite3*",
              "string",
              "int",
              "*",
              new wasm.xWrap.FuncPtrAdapter({
                name: "xCompare",
                signature: "i(pipip)",
                contextKey
              }),
              new wasm.xWrap.FuncPtrAdapter({
                name: "xDestroy",
                signature: "v(p)",
                contextKey
              })
            ]
          );
          capi.sqlite3_create_collation_v2 = function(pDb2, zName, eTextRep, pArg, xCompare, xDestroy) {
            if (6 !== arguments.length)
              return __dbArgcMismatch(pDb2, "sqlite3_create_collation_v2", 6);
            else if (0 === (eTextRep & 15)) {
              eTextRep |= capi.SQLITE_UTF8;
            } else if (capi.SQLITE_UTF8 !== (eTextRep & 15)) {
              return __errEncoding(pDb2);
            }
            try {
              const rc = __sqlite3CreateCollationV2(
                pDb2,
                zName,
                eTextRep,
                pArg,
                xCompare,
                xDestroy
              );
              if (0 === rc && xCompare instanceof Function) {
                __dbCleanupMap.addCollation(pDb2, zName);
              }
              return rc;
            } catch (e) {
              return util.sqlite3__wasm_db_error(pDb2, e);
            }
          };
          capi.sqlite3_create_collation = (pDb2, zName, eTextRep, pArg, xCompare) => {
            return 5 === arguments.length ? capi.sqlite3_create_collation_v2(
              pDb2,
              zName,
              eTextRep,
              pArg,
              xCompare,
              0
            ) : __dbArgcMismatch(pDb2, "sqlite3_create_collation", 5);
          };
        }
        {
          const contextKey = function(argv, argIndex) {
            return argv[0] + ":" + (argv[2] < 0 ? -1 : argv[2]) + ":" + argIndex + ":" + wasm.cstrToJs(argv[1]).toLowerCase();
          };
          const __cfProxy = Object.assign(/* @__PURE__ */ Object.create(null), {
            xInverseAndStep: {
              signature: "v(pip)",
              contextKey,
              callProxy: (callback) => {
                return (pCtx, argc, pArgv) => {
                  try {
                    callback(pCtx, ...capi.sqlite3_values_to_js(argc, pArgv));
                  } catch (e) {
                    capi.sqlite3_result_error_js(pCtx, e);
                  }
                };
              }
            },
            xFinalAndValue: {
              signature: "v(p)",
              contextKey,
              callProxy: (callback) => {
                return (pCtx) => {
                  try {
                    capi.sqlite3_result_js(pCtx, callback(pCtx));
                  } catch (e) {
                    capi.sqlite3_result_error_js(pCtx, e);
                  }
                };
              }
            },
            xFunc: {
              signature: "v(pip)",
              contextKey,
              callProxy: (callback) => {
                return (pCtx, argc, pArgv) => {
                  try {
                    capi.sqlite3_result_js(
                      pCtx,
                      callback(pCtx, ...capi.sqlite3_values_to_js(argc, pArgv))
                    );
                  } catch (e) {
                    capi.sqlite3_result_error_js(pCtx, e);
                  }
                };
              }
            },
            xDestroy: {
              signature: "v(p)",
              contextKey,
              callProxy: (callback) => {
                return (pVoid) => {
                  try {
                    callback(pVoid);
                  } catch (e) {
                    console.error("UDF xDestroy method threw:", e);
                  }
                };
              }
            }
          });
          const __sqlite3CreateFunction = wasm.xWrap(
            "sqlite3_create_function_v2",
            "int",
            [
              "sqlite3*",
              "string",
              "int",
              "int",
              "*",
              new wasm.xWrap.FuncPtrAdapter({
                name: "xFunc",
                ...__cfProxy.xFunc
              }),
              new wasm.xWrap.FuncPtrAdapter({
                name: "xStep",
                ...__cfProxy.xInverseAndStep
              }),
              new wasm.xWrap.FuncPtrAdapter({
                name: "xFinal",
                ...__cfProxy.xFinalAndValue
              }),
              new wasm.xWrap.FuncPtrAdapter({
                name: "xDestroy",
                ...__cfProxy.xDestroy
              })
            ]
          );
          const __sqlite3CreateWindowFunction = wasm.exports.sqlite3_create_window_function ? wasm.xWrap("sqlite3_create_window_function", "int", [
            "sqlite3*",
            "string",
            "int",
            "int",
            "*",
            new wasm.xWrap.FuncPtrAdapter({
              name: "xStep",
              ...__cfProxy.xInverseAndStep
            }),
            new wasm.xWrap.FuncPtrAdapter({
              name: "xFinal",
              ...__cfProxy.xFinalAndValue
            }),
            new wasm.xWrap.FuncPtrAdapter({
              name: "xValue",
              ...__cfProxy.xFinalAndValue
            }),
            new wasm.xWrap.FuncPtrAdapter({
              name: "xInverse",
              ...__cfProxy.xInverseAndStep
            }),
            new wasm.xWrap.FuncPtrAdapter({
              name: "xDestroy",
              ...__cfProxy.xDestroy
            })
          ]) : void 0;
          capi.sqlite3_create_function_v2 = function f(pDb2, funcName, nArg, eTextRep, pApp, xFunc, xStep, xFinal, xDestroy) {
            if (f.length !== arguments.length) {
              return __dbArgcMismatch(
                pDb2,
                "sqlite3_create_function_v2",
                f.length
              );
            } else if (0 === (eTextRep & 15)) {
              eTextRep |= capi.SQLITE_UTF8;
            } else if (capi.SQLITE_UTF8 !== (eTextRep & 15)) {
              return __errEncoding(pDb2);
            }
            try {
              const rc = __sqlite3CreateFunction(
                pDb2,
                funcName,
                nArg,
                eTextRep,
                pApp,
                xFunc,
                xStep,
                xFinal,
                xDestroy
              );
              if (0 === rc && (xFunc instanceof Function || xStep instanceof Function || xFinal instanceof Function || xDestroy instanceof Function)) {
                __dbCleanupMap.addFunction(pDb2, funcName, nArg);
              }
              return rc;
            } catch (e) {
              console.error("sqlite3_create_function_v2() setup threw:", e);
              return util.sqlite3__wasm_db_error(
                pDb2,
                e,
                "Creation of UDF threw: " + e
              );
            }
          };
          capi.sqlite3_create_function = function f(pDb2, funcName, nArg, eTextRep, pApp, xFunc, xStep, xFinal) {
            return f.length === arguments.length ? capi.sqlite3_create_function_v2(
              pDb2,
              funcName,
              nArg,
              eTextRep,
              pApp,
              xFunc,
              xStep,
              xFinal,
              0
            ) : __dbArgcMismatch(pDb2, "sqlite3_create_function", f.length);
          };
          if (__sqlite3CreateWindowFunction) {
            capi.sqlite3_create_window_function = function f(pDb2, funcName, nArg, eTextRep, pApp, xStep, xFinal, xValue, xInverse, xDestroy) {
              if (f.length !== arguments.length) {
                return __dbArgcMismatch(
                  pDb2,
                  "sqlite3_create_window_function",
                  f.length
                );
              } else if (0 === (eTextRep & 15)) {
                eTextRep |= capi.SQLITE_UTF8;
              } else if (capi.SQLITE_UTF8 !== (eTextRep & 15)) {
                return __errEncoding(pDb2);
              }
              try {
                const rc = __sqlite3CreateWindowFunction(
                  pDb2,
                  funcName,
                  nArg,
                  eTextRep,
                  pApp,
                  xStep,
                  xFinal,
                  xValue,
                  xInverse,
                  xDestroy
                );
                if (0 === rc && (xStep instanceof Function || xFinal instanceof Function || xValue instanceof Function || xInverse instanceof Function || xDestroy instanceof Function)) {
                  __dbCleanupMap.addWindowFunc(pDb2, funcName, nArg);
                }
                return rc;
              } catch (e) {
                console.error(
                  "sqlite3_create_window_function() setup threw:",
                  e
                );
                return util.sqlite3__wasm_db_error(
                  pDb2,
                  e,
                  "Creation of UDF threw: " + e
                );
              }
            };
          } else {
            delete capi.sqlite3_create_window_function;
          }
          capi.sqlite3_create_function_v2.udfSetResult = capi.sqlite3_create_function.udfSetResult = capi.sqlite3_result_js;
          if (capi.sqlite3_create_window_function) {
            capi.sqlite3_create_window_function.udfSetResult = capi.sqlite3_result_js;
          }
          capi.sqlite3_create_function_v2.udfConvertArgs = capi.sqlite3_create_function.udfConvertArgs = capi.sqlite3_values_to_js;
          if (capi.sqlite3_create_window_function) {
            capi.sqlite3_create_window_function.udfConvertArgs = capi.sqlite3_values_to_js;
          }
          capi.sqlite3_create_function_v2.udfSetError = capi.sqlite3_create_function.udfSetError = capi.sqlite3_result_error_js;
          if (capi.sqlite3_create_window_function) {
            capi.sqlite3_create_window_function.udfSetError = capi.sqlite3_result_error_js;
          }
        }
        {
          const __flexiString = (v2, n) => {
            if ("string" === typeof v2) {
              n = -1;
            } else if (util.isSQLableTypedArray(v2)) {
              n = v2.byteLength;
              v2 = util.typedArrayToString(
                v2 instanceof ArrayBuffer ? new Uint8Array(v2) : v2
              );
            } else if (Array.isArray(v2)) {
              v2 = v2.join("");
              n = -1;
            }
            return [v2, n];
          };
          const __prepare = {
            basic: wasm.xWrap("sqlite3_prepare_v3", "int", [
              "sqlite3*",
              "string",
              "int",
              "int",
              "**",
              "**"
            ]),
            full: wasm.xWrap("sqlite3_prepare_v3", "int", [
              "sqlite3*",
              "*",
              "int",
              "int",
              "**",
              "**"
            ])
          };
          capi.sqlite3_prepare_v3 = function f(pDb2, sql2, sqlLen, prepFlags, ppStmt, pzTail) {
            if (f.length !== arguments.length) {
              return __dbArgcMismatch(pDb2, "sqlite3_prepare_v3", f.length);
            }
            const [xSql, xSqlLen] = __flexiString(sql2, sqlLen);
            switch (typeof xSql) {
              case "string":
                return __prepare.basic(
                  pDb2,
                  xSql,
                  xSqlLen,
                  prepFlags,
                  ppStmt,
                  null
                );
              case "number":
                return __prepare.full(
                  pDb2,
                  xSql,
                  xSqlLen,
                  prepFlags,
                  ppStmt,
                  pzTail
                );
              default:
                return util.sqlite3__wasm_db_error(
                  pDb2,
                  capi.SQLITE_MISUSE,
                  "Invalid SQL argument type for sqlite3_prepare_v2/v3()."
                );
            }
          };
          capi.sqlite3_prepare_v2 = function f(pDb2, sql2, sqlLen, ppStmt, pzTail) {
            return f.length === arguments.length ? capi.sqlite3_prepare_v3(pDb2, sql2, sqlLen, 0, ppStmt, pzTail) : __dbArgcMismatch(pDb2, "sqlite3_prepare_v2", f.length);
          };
        }
        {
          const __bindText = wasm.xWrap("sqlite3_bind_text", "int", [
            "sqlite3_stmt*",
            "int",
            "string",
            "int",
            "*"
          ]);
          const __bindBlob = wasm.xWrap("sqlite3_bind_blob", "int", [
            "sqlite3_stmt*",
            "int",
            "*",
            "int",
            "*"
          ]);
          capi.sqlite3_bind_text = function f(pStmt, iCol, text, nText, xDestroy) {
            if (f.length !== arguments.length) {
              return __dbArgcMismatch(
                capi.sqlite3_db_handle(pStmt),
                "sqlite3_bind_text",
                f.length
              );
            } else if (wasm.isPtr(text) || null === text) {
              return __bindText(pStmt, iCol, text, nText, xDestroy);
            } else if (text instanceof ArrayBuffer) {
              text = new Uint8Array(text);
            } else if (Array.isArray(pMem)) {
              text = pMem.join("");
            }
            let p, n;
            try {
              if (util.isSQLableTypedArray(text)) {
                p = wasm.allocFromTypedArray(text);
                n = text.byteLength;
              } else if ("string" === typeof text) {
                [p, n] = wasm.allocCString(text);
              } else {
                return util.sqlite3__wasm_db_error(
                  capi.sqlite3_db_handle(pStmt),
                  capi.SQLITE_MISUSE,
                  "Invalid 3rd argument type for sqlite3_bind_text()."
                );
              }
              return __bindText(pStmt, iCol, p, n, capi.SQLITE_WASM_DEALLOC);
            } catch (e) {
              wasm.dealloc(p);
              return util.sqlite3__wasm_db_error(
                capi.sqlite3_db_handle(pStmt),
                e
              );
            }
          };
          capi.sqlite3_bind_blob = function f(pStmt, iCol, pMem2, nMem, xDestroy) {
            if (f.length !== arguments.length) {
              return __dbArgcMismatch(
                capi.sqlite3_db_handle(pStmt),
                "sqlite3_bind_blob",
                f.length
              );
            } else if (wasm.isPtr(pMem2) || null === pMem2) {
              return __bindBlob(pStmt, iCol, pMem2, nMem, xDestroy);
            } else if (pMem2 instanceof ArrayBuffer) {
              pMem2 = new Uint8Array(pMem2);
            } else if (Array.isArray(pMem2)) {
              pMem2 = pMem2.join("");
            }
            let p, n;
            try {
              if (util.isBindableTypedArray(pMem2)) {
                p = wasm.allocFromTypedArray(pMem2);
                n = nMem >= 0 ? nMem : pMem2.byteLength;
              } else if ("string" === typeof pMem2) {
                [p, n] = wasm.allocCString(pMem2);
              } else {
                return util.sqlite3__wasm_db_error(
                  capi.sqlite3_db_handle(pStmt),
                  capi.SQLITE_MISUSE,
                  "Invalid 3rd argument type for sqlite3_bind_blob()."
                );
              }
              return __bindBlob(pStmt, iCol, p, n, capi.SQLITE_WASM_DEALLOC);
            } catch (e) {
              wasm.dealloc(p);
              return util.sqlite3__wasm_db_error(
                capi.sqlite3_db_handle(pStmt),
                e
              );
            }
          };
        }
        {
          capi.sqlite3_config = function(op, ...args) {
            if (arguments.length < 2) return capi.SQLITE_MISUSE;
            switch (op) {
              case capi.SQLITE_CONFIG_COVERING_INDEX_SCAN:
              case capi.SQLITE_CONFIG_MEMSTATUS:
              case capi.SQLITE_CONFIG_SMALL_MALLOC:
              case capi.SQLITE_CONFIG_SORTERREF_SIZE:
              case capi.SQLITE_CONFIG_STMTJRNL_SPILL:
              case capi.SQLITE_CONFIG_URI:
                return wasm.exports.sqlite3__wasm_config_i(op, args[0]);
              case capi.SQLITE_CONFIG_LOOKASIDE:
                return wasm.exports.sqlite3__wasm_config_ii(
                  op,
                  args[0],
                  args[1]
                );
              case capi.SQLITE_CONFIG_MEMDB_MAXSIZE:
                return wasm.exports.sqlite3__wasm_config_j(op, args[0]);
              case capi.SQLITE_CONFIG_GETMALLOC:
              case capi.SQLITE_CONFIG_GETMUTEX:
              case capi.SQLITE_CONFIG_GETPCACHE2:
              case capi.SQLITE_CONFIG_GETPCACHE:
              case capi.SQLITE_CONFIG_HEAP:
              case capi.SQLITE_CONFIG_LOG:
              case capi.SQLITE_CONFIG_MALLOC:
              case capi.SQLITE_CONFIG_MMAP_SIZE:
              case capi.SQLITE_CONFIG_MULTITHREAD:
              case capi.SQLITE_CONFIG_MUTEX:
              case capi.SQLITE_CONFIG_PAGECACHE:
              case capi.SQLITE_CONFIG_PCACHE2:
              case capi.SQLITE_CONFIG_PCACHE:
              case capi.SQLITE_CONFIG_PCACHE_HDRSZ:
              case capi.SQLITE_CONFIG_PMASZ:
              case capi.SQLITE_CONFIG_SERIALIZED:
              case capi.SQLITE_CONFIG_SINGLETHREAD:
              case capi.SQLITE_CONFIG_SQLLOG:
              case capi.SQLITE_CONFIG_WIN32_HEAPSIZE:
              default:
                return capi.SQLITE_NOTFOUND;
            }
          };
        }
        {
          const __autoExtFptr = /* @__PURE__ */ new Set();
          capi.sqlite3_auto_extension = function(fPtr) {
            if (fPtr instanceof Function) {
              fPtr = wasm.installFunction("i(ppp)", fPtr);
            } else if (1 !== arguments.length || !wasm.isPtr(fPtr)) {
              return capi.SQLITE_MISUSE;
            }
            const rc = wasm.exports.sqlite3_auto_extension(fPtr);
            if (fPtr !== arguments[0]) {
              if (0 === rc) __autoExtFptr.add(fPtr);
              else wasm.uninstallFunction(fPtr);
            }
            return rc;
          };
          capi.sqlite3_cancel_auto_extension = function(fPtr) {
            if (!fPtr || 1 !== arguments.length || !wasm.isPtr(fPtr)) return 0;
            return wasm.exports.sqlite3_cancel_auto_extension(fPtr);
          };
          capi.sqlite3_reset_auto_extension = function() {
            wasm.exports.sqlite3_reset_auto_extension();
            for (const fp of __autoExtFptr) wasm.uninstallFunction(fp);
            __autoExtFptr.clear();
          };
        }
        const pKvvfs = capi.sqlite3_vfs_find("kvvfs");
        if (pKvvfs) {
          if (util.isUIThread()) {
            const kvvfsMethods = new capi.sqlite3_kvvfs_methods(
              wasm.exports.sqlite3__wasm_kvvfs_methods()
            );
            delete capi.sqlite3_kvvfs_methods;
            const kvvfsMakeKey = wasm.exports.sqlite3__wasm_kvvfsMakeKeyOnPstack, pstack = wasm.pstack;
            const kvvfsStorage = (zClass) => 115 === wasm.peek(zClass) ? sessionStorage : localStorage;
            const kvvfsImpls = {
              xRead: (zClass, zKey, zBuf, nBuf) => {
                const stack = pstack.pointer, astack = wasm.scopedAllocPush();
                try {
                  const zXKey = kvvfsMakeKey(zClass, zKey);
                  if (!zXKey) return -3;
                  const jKey = wasm.cstrToJs(zXKey);
                  const jV = kvvfsStorage(zClass).getItem(jKey);
                  if (!jV) return -1;
                  const nV = jV.length;
                  if (nBuf <= 0) return nV;
                  else if (1 === nBuf) {
                    wasm.poke(zBuf, 0);
                    return nV;
                  }
                  const zV = wasm.scopedAllocCString(jV);
                  if (nBuf > nV + 1) nBuf = nV + 1;
                  wasm.heap8u().copyWithin(zBuf, zV, zV + nBuf - 1);
                  wasm.poke(zBuf + nBuf - 1, 0);
                  return nBuf - 1;
                } catch (e) {
                  console.error("kvstorageRead()", e);
                  return -2;
                } finally {
                  pstack.restore(stack);
                  wasm.scopedAllocPop(astack);
                }
              },
              xWrite: (zClass, zKey, zData) => {
                const stack = pstack.pointer;
                try {
                  const zXKey = kvvfsMakeKey(zClass, zKey);
                  if (!zXKey) return 1;
                  const jKey = wasm.cstrToJs(zXKey);
                  kvvfsStorage(zClass).setItem(jKey, wasm.cstrToJs(zData));
                  return 0;
                } catch (e) {
                  console.error("kvstorageWrite()", e);
                  return capi.SQLITE_IOERR;
                } finally {
                  pstack.restore(stack);
                }
              },
              xDelete: (zClass, zKey) => {
                const stack = pstack.pointer;
                try {
                  const zXKey = kvvfsMakeKey(zClass, zKey);
                  if (!zXKey) return 1;
                  kvvfsStorage(zClass).removeItem(wasm.cstrToJs(zXKey));
                  return 0;
                } catch (e) {
                  console.error("kvstorageDelete()", e);
                  return capi.SQLITE_IOERR;
                } finally {
                  pstack.restore(stack);
                }
              }
            };
            for (const k of Object.keys(kvvfsImpls)) {
              kvvfsMethods[kvvfsMethods.memberKey(k)] = wasm.installFunction(
                kvvfsMethods.memberSignature(k),
                kvvfsImpls[k]
              );
            }
          } else {
            capi.sqlite3_vfs_unregister(pKvvfs);
          }
        }
        wasm.xWrap.FuncPtrAdapter.warnOnUse = true;
        const StructBinder = sqlite3.StructBinder;
        const installMethod = function callee2(tgt, name, func, applyArgcCheck = callee2.installMethodArgcCheck) {
          if (!(tgt instanceof StructBinder.StructType)) {
            toss("Usage error: target object is-not-a StructType.");
          } else if (!(func instanceof Function) && !wasm.isPtr(func)) {
            toss("Usage errror: expecting a Function or WASM pointer to one.");
          }
          if (1 === arguments.length) {
            return (n, f) => callee2(tgt, n, f, applyArgcCheck);
          }
          if (!callee2.argcProxy) {
            callee2.argcProxy = function(tgt2, funcName, func2, sig) {
              return function(...args) {
                if (func2.length !== arguments.length) {
                  toss(
                    "Argument mismatch for",
                    tgt2.structInfo.name + "::" + funcName + ": Native signature is:",
                    sig
                  );
                }
                return func2.apply(this, args);
              };
            };
            callee2.removeFuncList = function() {
              if (this.ondispose.__removeFuncList) {
                this.ondispose.__removeFuncList.forEach((v2, ndx) => {
                  if ("number" === typeof v2) {
                    try {
                      wasm.uninstallFunction(v2);
                    } catch (e) {
                    }
                  }
                });
                delete this.ondispose.__removeFuncList;
              }
            };
          }
          const sigN = tgt.memberSignature(name);
          if (sigN.length < 2) {
            toss(
              "Member",
              name,
              "does not have a function pointer signature:",
              sigN
            );
          }
          const memKey = tgt.memberKey(name);
          const fProxy = applyArgcCheck && !wasm.isPtr(func) ? callee2.argcProxy(tgt, memKey, func, sigN) : func;
          if (wasm.isPtr(fProxy)) {
            if (fProxy && !wasm.functionEntry(fProxy)) {
              toss("Pointer", fProxy, "is not a WASM function table entry.");
            }
            tgt[memKey] = fProxy;
          } else {
            const pFunc = wasm.installFunction(
              fProxy,
              tgt.memberSignature(name, true)
            );
            tgt[memKey] = pFunc;
            if (!tgt.ondispose || !tgt.ondispose.__removeFuncList) {
              tgt.addOnDispose(
                "ondispose.__removeFuncList handler",
                callee2.removeFuncList
              );
              tgt.ondispose.__removeFuncList = [];
            }
            tgt.ondispose.__removeFuncList.push(memKey, pFunc);
          }
          return (n, f) => callee2(tgt, n, f, applyArgcCheck);
        };
        installMethod.installMethodArgcCheck = false;
        const installMethods = function(structInstance, methods, applyArgcCheck = installMethod.installMethodArgcCheck) {
          const seen = /* @__PURE__ */ new Map();
          for (const k of Object.keys(methods)) {
            const m = methods[k];
            const prior = seen.get(m);
            if (prior) {
              const mkey = structInstance.memberKey(k);
              structInstance[mkey] = structInstance[structInstance.memberKey(prior)];
            } else {
              installMethod(structInstance, k, m, applyArgcCheck);
              seen.set(m, k);
            }
          }
          return structInstance;
        };
        StructBinder.StructType.prototype.installMethod = function callee2(name, func, applyArgcCheck = installMethod.installMethodArgcCheck) {
          return arguments.length < 3 && name && "object" === typeof name ? installMethods(this, ...arguments) : installMethod(this, ...arguments);
        };
        StructBinder.StructType.prototype.installMethods = function(methods, applyArgcCheck = installMethod.installMethodArgcCheck) {
          return installMethods(this, methods, applyArgcCheck);
        };
      });
      globalThis.sqlite3ApiBootstrap.initializers.push(function(sqlite3) {
        sqlite3.version = {
          libVersion: "3.49.1",
          libVersionNumber: 3049001,
          sourceId: "2025-02-18 13:38:58 873d4e274b4988d260ba8354a9718324a1c26187a4ab4c1cc0227c03d0f10e70",
          downloadVersion: 3490100
        };
      });
      globalThis.sqlite3ApiBootstrap.initializers.push(function(sqlite3) {
        const toss3 = (...args) => {
          throw new sqlite3.SQLite3Error(...args);
        };
        const capi = sqlite3.capi, wasm = sqlite3.wasm, util = sqlite3.util;
        const __ptrMap = /* @__PURE__ */ new WeakMap();
        const __stmtMap = /* @__PURE__ */ new WeakMap();
        const getOwnOption = (opts, p, dflt) => {
          const d = Object.getOwnPropertyDescriptor(opts, p);
          return d ? d.value : dflt;
        };
        const checkSqlite3Rc = function(dbPtr, sqliteResultCode) {
          if (sqliteResultCode) {
            if (dbPtr instanceof DB) dbPtr = dbPtr.pointer;
            toss3(
              sqliteResultCode,
              "sqlite3 result code",
              sqliteResultCode + ":",
              dbPtr ? capi.sqlite3_errmsg(dbPtr) : capi.sqlite3_errstr(sqliteResultCode)
            );
          }
          return arguments[0];
        };
        const __dbTraceToConsole = wasm.installFunction(
          "i(ippp)",
          function(t, c, p, x) {
            if (capi.SQLITE_TRACE_STMT === t) {
              console.log(
                "SQL TRACE #" + ++this.counter + " via sqlite3@" + c + ":",
                wasm.cstrToJs(x)
              );
            }
          }.bind({ counter: 0 })
        );
        const __vfsPostOpenCallback = /* @__PURE__ */ Object.create(null);
        const dbCtorHelper = function ctor(...args) {
          if (!ctor._name2vfs) {
            ctor._name2vfs = /* @__PURE__ */ Object.create(null);
            const isWorkerThread = "function" === typeof importScripts ? (n) => toss3(
              "The VFS for",
              n,
              "is only available in the main window thread."
            ) : false;
            ctor._name2vfs[":localStorage:"] = {
              vfs: "kvvfs",
              filename: isWorkerThread || (() => "local")
            };
            ctor._name2vfs[":sessionStorage:"] = {
              vfs: "kvvfs",
              filename: isWorkerThread || (() => "session")
            };
          }
          const opt = ctor.normalizeArgs(...args);
          let fn = opt.filename, vfsName = opt.vfs, flagsStr = opt.flags;
          if ("string" !== typeof fn && "number" !== typeof fn || "string" !== typeof flagsStr || vfsName && "string" !== typeof vfsName && "number" !== typeof vfsName) {
            sqlite3.config.error("Invalid DB ctor args", opt, arguments);
            toss3("Invalid arguments for DB constructor.");
          }
          let fnJs = "number" === typeof fn ? wasm.cstrToJs(fn) : fn;
          const vfsCheck = ctor._name2vfs[fnJs];
          if (vfsCheck) {
            vfsName = vfsCheck.vfs;
            fn = fnJs = vfsCheck.filename(fnJs);
          }
          let pDb2, oflags = 0;
          if (flagsStr.indexOf("c") >= 0) {
            oflags |= capi.SQLITE_OPEN_CREATE | capi.SQLITE_OPEN_READWRITE;
          }
          if (flagsStr.indexOf("w") >= 0) oflags |= capi.SQLITE_OPEN_READWRITE;
          if (0 === oflags) oflags |= capi.SQLITE_OPEN_READONLY;
          oflags |= capi.SQLITE_OPEN_EXRESCODE;
          const stack = wasm.pstack.pointer;
          try {
            const pPtr = wasm.pstack.allocPtr();
            let rc = capi.sqlite3_open_v2(fn, pPtr, oflags, vfsName || 0);
            pDb2 = wasm.peekPtr(pPtr);
            checkSqlite3Rc(pDb2, rc);
            capi.sqlite3_extended_result_codes(pDb2, 1);
            if (flagsStr.indexOf("t") >= 0) {
              capi.sqlite3_trace_v2(
                pDb2,
                capi.SQLITE_TRACE_STMT,
                __dbTraceToConsole,
                pDb2
              );
            }
          } catch (e) {
            if (pDb2) capi.sqlite3_close_v2(pDb2);
            throw e;
          } finally {
            wasm.pstack.restore(stack);
          }
          this.filename = fnJs;
          __ptrMap.set(this, pDb2);
          __stmtMap.set(this, /* @__PURE__ */ Object.create(null));
          try {
            const pVfs = capi.sqlite3_js_db_vfs(pDb2) || toss3("Internal error: cannot get VFS for new db handle.");
            const postInitSql = __vfsPostOpenCallback[pVfs];
            if (postInitSql) {
              if (postInitSql instanceof Function) {
                postInitSql(this, sqlite3);
              } else {
                checkSqlite3Rc(
                  pDb2,
                  capi.sqlite3_exec(pDb2, postInitSql, 0, 0, 0)
                );
              }
            }
          } catch (e) {
            this.close();
            throw e;
          }
        };
        dbCtorHelper.setVfsPostOpenCallback = function(pVfs, callback) {
          if (!(callback instanceof Function)) {
            toss3(
              "dbCtorHelper.setVfsPostOpenCallback() should not be used with a non-function argument.",
              arguments
            );
          }
          __vfsPostOpenCallback[pVfs] = callback;
        };
        dbCtorHelper.normalizeArgs = function(filename = ":memory:", flags = "c", vfs = null) {
          const arg = {};
          if (1 === arguments.length && arguments[0] && "object" === typeof arguments[0]) {
            Object.assign(arg, arguments[0]);
            if (void 0 === arg.flags) arg.flags = "c";
            if (void 0 === arg.vfs) arg.vfs = null;
            if (void 0 === arg.filename) arg.filename = ":memory:";
          } else {
            arg.filename = filename;
            arg.flags = flags;
            arg.vfs = vfs;
          }
          return arg;
        };
        const DB = function(...args) {
          dbCtorHelper.apply(this, args);
        };
        DB.dbCtorHelper = dbCtorHelper;
        const BindTypes = {
          null: 1,
          number: 2,
          string: 3,
          boolean: 4,
          blob: 5
        };
        BindTypes["undefined"] == BindTypes.null;
        if (wasm.bigIntEnabled) {
          BindTypes.bigint = BindTypes.number;
        }
        const Stmt = function() {
          if (BindTypes !== arguments[2]) {
            toss3(
              capi.SQLITE_MISUSE,
              "Do not call the Stmt constructor directly. Use DB.prepare()."
            );
          }
          this.db = arguments[0];
          __ptrMap.set(this, arguments[1]);
          this.parameterCount = capi.sqlite3_bind_parameter_count(this.pointer);
        };
        const affirmDbOpen = function(db) {
          if (!db.pointer) toss3("DB has been closed.");
          return db;
        };
        const affirmColIndex = function(stmt, ndx) {
          if (ndx !== (ndx | 0) || ndx < 0 || ndx >= stmt.columnCount) {
            toss3("Column index", ndx, "is out of range.");
          }
          return stmt;
        };
        const parseExecArgs = function(db, args) {
          const out2 = /* @__PURE__ */ Object.create(null);
          out2.opt = /* @__PURE__ */ Object.create(null);
          switch (args.length) {
            case 1:
              if ("string" === typeof args[0] || util.isSQLableTypedArray(args[0])) {
                out2.sql = args[0];
              } else if (Array.isArray(args[0])) {
                out2.sql = args[0];
              } else if (args[0] && "object" === typeof args[0]) {
                out2.opt = args[0];
                out2.sql = out2.opt.sql;
              }
              break;
            case 2:
              out2.sql = args[0];
              out2.opt = args[1];
              break;
            default:
              toss3("Invalid argument count for exec().");
          }
          out2.sql = util.flexibleString(out2.sql);
          if ("string" !== typeof out2.sql) {
            toss3("Missing SQL argument or unsupported SQL value type.");
          }
          const opt = out2.opt;
          switch (opt.returnValue) {
            case "resultRows":
              if (!opt.resultRows) opt.resultRows = [];
              out2.returnVal = () => opt.resultRows;
              break;
            case "saveSql":
              if (!opt.saveSql) opt.saveSql = [];
              out2.returnVal = () => opt.saveSql;
              break;
            case void 0:
            case "this":
              out2.returnVal = () => db;
              break;
            default:
              toss3("Invalid returnValue value:", opt.returnValue);
          }
          if (!opt.callback && !opt.returnValue && void 0 !== opt.rowMode) {
            if (!opt.resultRows) opt.resultRows = [];
            out2.returnVal = () => opt.resultRows;
          }
          if (opt.callback || opt.resultRows) {
            switch (void 0 === opt.rowMode ? "array" : opt.rowMode) {
              case "object":
                out2.cbArg = (stmt, cache) => {
                  if (!cache.columnNames)
                    cache.columnNames = stmt.getColumnNames([]);
                  const row = stmt.get([]);
                  const rv = /* @__PURE__ */ Object.create(null);
                  for (const i in cache.columnNames)
                    rv[cache.columnNames[i]] = row[i];
                  return rv;
                };
                break;
              case "array":
                out2.cbArg = (stmt) => stmt.get([]);
                break;
              case "stmt":
                if (Array.isArray(opt.resultRows)) {
                  toss3(
                    "exec(): invalid rowMode for a resultRows array: must",
                    "be one of 'array', 'object',",
                    "a result column number, or column name reference."
                  );
                }
                out2.cbArg = (stmt) => stmt;
                break;
              default:
                if (util.isInt32(opt.rowMode)) {
                  out2.cbArg = (stmt) => stmt.get(opt.rowMode);
                  break;
                } else if ("string" === typeof opt.rowMode && opt.rowMode.length > 1 && "$" === opt.rowMode[0]) {
                  const $colName = opt.rowMode.substr(1);
                  out2.cbArg = (stmt) => {
                    const rc = stmt.get(/* @__PURE__ */ Object.create(null))[$colName];
                    return void 0 === rc ? toss3(
                      capi.SQLITE_NOTFOUND,
                      "exec(): unknown result column:",
                      $colName
                    ) : rc;
                  };
                  break;
                }
                toss3("Invalid rowMode:", opt.rowMode);
            }
          }
          return out2;
        };
        const __selectFirstRow = (db, sql2, bind, ...getArgs) => {
          const stmt = db.prepare(sql2);
          try {
            const rc = stmt.bind(bind).step() ? stmt.get(...getArgs) : void 0;
            stmt.reset();
            return rc;
          } finally {
            stmt.finalize();
          }
        };
        const __selectAll = (db, sql2, bind, rowMode) => db.exec({
          sql: sql2,
          bind,
          rowMode,
          returnValue: "resultRows"
        });
        DB.checkRc = (db, resultCode) => checkSqlite3Rc(db, resultCode);
        DB.prototype = {
          isOpen: function() {
            return !!this.pointer;
          },
          affirmOpen: function() {
            return affirmDbOpen(this);
          },
          close: function() {
            if (this.pointer) {
              if (this.onclose && this.onclose.before instanceof Function) {
                try {
                  this.onclose.before(this);
                } catch (e) {
                }
              }
              const pDb2 = this.pointer;
              Object.keys(__stmtMap.get(this)).forEach((k, s) => {
                if (s && s.pointer) {
                  try {
                    s.finalize();
                  } catch (e) {
                  }
                }
              });
              __ptrMap.delete(this);
              __stmtMap.delete(this);
              capi.sqlite3_close_v2(pDb2);
              if (this.onclose && this.onclose.after instanceof Function) {
                try {
                  this.onclose.after(this);
                } catch (e) {
                }
              }
              delete this.filename;
            }
          },
          changes: function(total = false, sixtyFour = false) {
            const p = affirmDbOpen(this).pointer;
            if (total) {
              return sixtyFour ? capi.sqlite3_total_changes64(p) : capi.sqlite3_total_changes(p);
            } else {
              return sixtyFour ? capi.sqlite3_changes64(p) : capi.sqlite3_changes(p);
            }
          },
          dbFilename: function(dbName = "main") {
            return capi.sqlite3_db_filename(affirmDbOpen(this).pointer, dbName);
          },
          dbName: function(dbNumber = 0) {
            return capi.sqlite3_db_name(affirmDbOpen(this).pointer, dbNumber);
          },
          dbVfsName: function(dbName = 0) {
            let rc;
            const pVfs = capi.sqlite3_js_db_vfs(
              affirmDbOpen(this).pointer,
              dbName
            );
            if (pVfs) {
              const v2 = new capi.sqlite3_vfs(pVfs);
              try {
                rc = wasm.cstrToJs(v2.$zName);
              } finally {
                v2.dispose();
              }
            }
            return rc;
          },
          prepare: function(sql2) {
            affirmDbOpen(this);
            const stack = wasm.pstack.pointer;
            let ppStmt, pStmt;
            try {
              ppStmt = wasm.pstack.alloc(8);
              DB.checkRc(
                this,
                capi.sqlite3_prepare_v2(this.pointer, sql2, -1, ppStmt, null)
              );
              pStmt = wasm.peekPtr(ppStmt);
            } finally {
              wasm.pstack.restore(stack);
            }
            if (!pStmt) toss3("Cannot prepare empty SQL.");
            const stmt = new Stmt(this, pStmt, BindTypes);
            __stmtMap.get(this)[pStmt] = stmt;
            return stmt;
          },
          exec: function() {
            affirmDbOpen(this);
            const arg = parseExecArgs(this, arguments);
            if (!arg.sql) {
              return toss3("exec() requires an SQL string.");
            }
            const opt = arg.opt;
            const callback = opt.callback;
            const resultRows = Array.isArray(opt.resultRows) ? opt.resultRows : void 0;
            let stmt;
            let bind = opt.bind;
            let evalFirstResult = !!(arg.cbArg || opt.columnNames || resultRows);
            const stack = wasm.scopedAllocPush();
            const saveSql = Array.isArray(opt.saveSql) ? opt.saveSql : void 0;
            try {
              const isTA = util.isSQLableTypedArray(arg.sql);
              let sqlByteLen = isTA ? arg.sql.byteLength : wasm.jstrlen(arg.sql);
              const ppStmt = wasm.scopedAlloc(
                2 * wasm.ptrSizeof + (sqlByteLen + 1)
              );
              const pzTail = ppStmt + wasm.ptrSizeof;
              let pSql = pzTail + wasm.ptrSizeof;
              const pSqlEnd = pSql + sqlByteLen;
              if (isTA) wasm.heap8().set(arg.sql, pSql);
              else wasm.jstrcpy(arg.sql, wasm.heap8(), pSql, sqlByteLen, false);
              wasm.poke(pSql + sqlByteLen, 0);
              while (pSql && wasm.peek(pSql, "i8")) {
                wasm.pokePtr([ppStmt, pzTail], 0);
                DB.checkRc(
                  this,
                  capi.sqlite3_prepare_v3(
                    this.pointer,
                    pSql,
                    sqlByteLen,
                    0,
                    ppStmt,
                    pzTail
                  )
                );
                const pStmt = wasm.peekPtr(ppStmt);
                pSql = wasm.peekPtr(pzTail);
                sqlByteLen = pSqlEnd - pSql;
                if (!pStmt) continue;
                if (saveSql) saveSql.push(capi.sqlite3_sql(pStmt).trim());
                stmt = new Stmt(this, pStmt, BindTypes);
                if (bind && stmt.parameterCount) {
                  stmt.bind(bind);
                  bind = null;
                }
                if (evalFirstResult && stmt.columnCount) {
                  let gotColNames = Array.isArray(opt.columnNames) ? 0 : 1;
                  evalFirstResult = false;
                  if (arg.cbArg || resultRows) {
                    const cbArgCache = /* @__PURE__ */ Object.create(null);
                    for (; stmt.step(); stmt._lockedByExec = false) {
                      if (0 === gotColNames++) {
                        stmt.getColumnNames(
                          cbArgCache.columnNames = opt.columnNames || []
                        );
                      }
                      stmt._lockedByExec = true;
                      const row = arg.cbArg(stmt, cbArgCache);
                      if (resultRows) resultRows.push(row);
                      if (callback && false === callback.call(opt, row, stmt)) {
                        break;
                      }
                    }
                    stmt._lockedByExec = false;
                  }
                  if (0 === gotColNames) {
                    stmt.getColumnNames(opt.columnNames);
                  }
                } else {
                  stmt.step();
                }
                stmt.reset().finalize();
                stmt = null;
              }
            } finally {
              wasm.scopedAllocPop(stack);
              if (stmt) {
                delete stmt._lockedByExec;
                stmt.finalize();
              }
            }
            return arg.returnVal();
          },
          createFunction: function f(name, xFunc, opt) {
            const isFunc = (f2) => f2 instanceof Function;
            switch (arguments.length) {
              case 1:
                opt = name;
                name = opt.name;
                xFunc = opt.xFunc || 0;
                break;
              case 2:
                if (!isFunc(xFunc)) {
                  opt = xFunc;
                  xFunc = opt.xFunc || 0;
                }
                break;
            }
            if (!opt) opt = {};
            if ("string" !== typeof name) {
              toss3("Invalid arguments: missing function name.");
            }
            let xStep = opt.xStep || 0;
            let xFinal = opt.xFinal || 0;
            const xValue = opt.xValue || 0;
            const xInverse = opt.xInverse || 0;
            let isWindow = void 0;
            if (isFunc(xFunc)) {
              isWindow = false;
              if (isFunc(xStep) || isFunc(xFinal)) {
                toss3("Ambiguous arguments: scalar or aggregate?");
              }
              xStep = xFinal = null;
            } else if (isFunc(xStep)) {
              if (!isFunc(xFinal)) {
                toss3("Missing xFinal() callback for aggregate or window UDF.");
              }
              xFunc = null;
            } else if (isFunc(xFinal)) {
              toss3("Missing xStep() callback for aggregate or window UDF.");
            } else {
              toss3("Missing function-type properties.");
            }
            if (false === isWindow) {
              if (isFunc(xValue) || isFunc(xInverse)) {
                toss3(
                  "xValue and xInverse are not permitted for non-window UDFs."
                );
              }
            } else if (isFunc(xValue)) {
              if (!isFunc(xInverse)) {
                toss3("xInverse must be provided if xValue is.");
              }
              isWindow = true;
            } else if (isFunc(xInverse)) {
              toss3("xValue must be provided if xInverse is.");
            }
            const pApp = opt.pApp;
            if (void 0 !== pApp && null !== pApp && ("number" !== typeof pApp || !util.isInt32(pApp))) {
              toss3(
                "Invalid value for pApp property. Must be a legal WASM pointer value."
              );
            }
            const xDestroy = opt.xDestroy || 0;
            if (xDestroy && !isFunc(xDestroy)) {
              toss3("xDestroy property must be a function.");
            }
            let fFlags = 0;
            if (getOwnOption(opt, "deterministic"))
              fFlags |= capi.SQLITE_DETERMINISTIC;
            if (getOwnOption(opt, "directOnly"))
              fFlags |= capi.SQLITE_DIRECTONLY;
            if (getOwnOption(opt, "innocuous")) fFlags |= capi.SQLITE_INNOCUOUS;
            name = name.toLowerCase();
            const xArity = xFunc || xStep;
            const arity = getOwnOption(opt, "arity");
            const arityArg = "number" === typeof arity ? arity : xArity.length ? xArity.length - 1 : 0;
            let rc;
            if (isWindow) {
              rc = capi.sqlite3_create_window_function(
                this.pointer,
                name,
                arityArg,
                capi.SQLITE_UTF8 | fFlags,
                pApp || 0,
                xStep,
                xFinal,
                xValue,
                xInverse,
                xDestroy
              );
            } else {
              rc = capi.sqlite3_create_function_v2(
                this.pointer,
                name,
                arityArg,
                capi.SQLITE_UTF8 | fFlags,
                pApp || 0,
                xFunc,
                xStep,
                xFinal,
                xDestroy
              );
            }
            DB.checkRc(this, rc);
            return this;
          },
          selectValue: function(sql2, bind, asType) {
            return __selectFirstRow(this, sql2, bind, 0, asType);
          },
          selectValues: function(sql2, bind, asType) {
            const stmt = this.prepare(sql2), rc = [];
            try {
              stmt.bind(bind);
              while (stmt.step()) rc.push(stmt.get(0, asType));
              stmt.reset();
            } finally {
              stmt.finalize();
            }
            return rc;
          },
          selectArray: function(sql2, bind) {
            return __selectFirstRow(this, sql2, bind, []);
          },
          selectObject: function(sql2, bind) {
            return __selectFirstRow(this, sql2, bind, {});
          },
          selectArrays: function(sql2, bind) {
            return __selectAll(this, sql2, bind, "array");
          },
          selectObjects: function(sql2, bind) {
            return __selectAll(this, sql2, bind, "object");
          },
          openStatementCount: function() {
            return this.pointer ? Object.keys(__stmtMap.get(this)).length : 0;
          },
          transaction: function(callback) {
            let opener = "BEGIN";
            if (arguments.length > 1) {
              if (/[^a-zA-Z]/.test(arguments[0])) {
                toss3(
                  capi.SQLITE_MISUSE,
                  "Invalid argument for BEGIN qualifier."
                );
              }
              opener += " " + arguments[0];
              callback = arguments[1];
            }
            affirmDbOpen(this).exec(opener);
            try {
              const rc = callback(this);
              this.exec("COMMIT");
              return rc;
            } catch (e) {
              this.exec("ROLLBACK");
              throw e;
            }
          },
          savepoint: function(callback) {
            affirmDbOpen(this).exec("SAVEPOINT oo1");
            try {
              const rc = callback(this);
              this.exec("RELEASE oo1");
              return rc;
            } catch (e) {
              this.exec("ROLLBACK to SAVEPOINT oo1; RELEASE SAVEPOINT oo1");
              throw e;
            }
          },
          checkRc: function(resultCode) {
            return checkSqlite3Rc(this, resultCode);
          }
        };
        const affirmStmtOpen = function(stmt) {
          if (!stmt.pointer) toss3("Stmt has been closed.");
          return stmt;
        };
        const isSupportedBindType = function(v2) {
          let t = BindTypes[null === v2 || void 0 === v2 ? "null" : typeof v2];
          switch (t) {
            case BindTypes.boolean:
            case BindTypes.null:
            case BindTypes.number:
            case BindTypes.string:
              return t;
            case BindTypes.bigint:
              if (wasm.bigIntEnabled) return t;
            default:
              return util.isBindableTypedArray(v2) ? BindTypes.blob : void 0;
          }
        };
        const affirmSupportedBindType = function(v2) {
          return isSupportedBindType(v2) || toss3("Unsupported bind() argument type:", typeof v2);
        };
        const affirmParamIndex = function(stmt, key) {
          const n = "number" === typeof key ? key : capi.sqlite3_bind_parameter_index(stmt.pointer, key);
          if (0 === n || !util.isInt32(n)) {
            toss3("Invalid bind() parameter name: " + key);
          } else if (n < 1 || n > stmt.parameterCount)
            toss3("Bind index", key, "is out of range.");
          return n;
        };
        const affirmNotLockedByExec = function(stmt, currentOpName) {
          if (stmt._lockedByExec) {
            toss3(
              "Operation is illegal when statement is locked:",
              currentOpName
            );
          }
          return stmt;
        };
        const bindOne = function f(stmt, ndx, bindType, val) {
          affirmNotLockedByExec(affirmStmtOpen(stmt), "bind()");
          if (!f._) {
            f._tooBigInt = (v2) => toss3(
              "BigInt value is too big to store without precision loss:",
              v2
            );
            f._ = {
              string: function(stmt2, ndx2, val2, asBlob) {
                const [pStr, n] = wasm.allocCString(val2, true);
                const f2 = asBlob ? capi.sqlite3_bind_blob : capi.sqlite3_bind_text;
                return f2(stmt2.pointer, ndx2, pStr, n, capi.SQLITE_WASM_DEALLOC);
              }
            };
          }
          affirmSupportedBindType(val);
          ndx = affirmParamIndex(stmt, ndx);
          let rc = 0;
          switch (null === val || void 0 === val ? BindTypes.null : bindType) {
            case BindTypes.null:
              rc = capi.sqlite3_bind_null(stmt.pointer, ndx);
              break;
            case BindTypes.string:
              rc = f._.string(stmt, ndx, val, false);
              break;
            case BindTypes.number: {
              let m;
              if (util.isInt32(val)) m = capi.sqlite3_bind_int;
              else if ("bigint" === typeof val) {
                if (!util.bigIntFits64(val)) {
                  f._tooBigInt(val);
                } else if (wasm.bigIntEnabled) {
                  m = capi.sqlite3_bind_int64;
                } else if (util.bigIntFitsDouble(val)) {
                  val = Number(val);
                  m = capi.sqlite3_bind_double;
                } else {
                  f._tooBigInt(val);
                }
              } else {
                val = Number(val);
                if (wasm.bigIntEnabled && Number.isInteger(val)) {
                  m = capi.sqlite3_bind_int64;
                } else {
                  m = capi.sqlite3_bind_double;
                }
              }
              rc = m(stmt.pointer, ndx, val);
              break;
            }
            case BindTypes.boolean:
              rc = capi.sqlite3_bind_int(stmt.pointer, ndx, val ? 1 : 0);
              break;
            case BindTypes.blob: {
              if ("string" === typeof val) {
                rc = f._.string(stmt, ndx, val, true);
                break;
              } else if (val instanceof ArrayBuffer) {
                val = new Uint8Array(val);
              } else if (!util.isBindableTypedArray(val)) {
                toss3(
                  "Binding a value as a blob requires",
                  "that it be a string, Uint8Array, Int8Array, or ArrayBuffer."
                );
              }
              const pBlob = wasm.alloc(val.byteLength || 1);
              wasm.heap8().set(val.byteLength ? val : [0], pBlob);
              rc = capi.sqlite3_bind_blob(
                stmt.pointer,
                ndx,
                pBlob,
                val.byteLength,
                capi.SQLITE_WASM_DEALLOC
              );
              break;
            }
            default:
              sqlite3.config.warn("Unsupported bind() argument type:", val);
              toss3("Unsupported bind() argument type: " + typeof val);
          }
          if (rc) DB.checkRc(stmt.db.pointer, rc);
          stmt._mayGet = false;
          return stmt;
        };
        Stmt.prototype = {
          finalize: function() {
            if (this.pointer) {
              affirmNotLockedByExec(this, "finalize()");
              const rc = capi.sqlite3_finalize(this.pointer);
              delete __stmtMap.get(this.db)[this.pointer];
              __ptrMap.delete(this);
              delete this._mayGet;
              delete this.parameterCount;
              delete this._lockedByExec;
              delete this.db;
              return rc;
            }
          },
          clearBindings: function() {
            affirmNotLockedByExec(affirmStmtOpen(this), "clearBindings()");
            capi.sqlite3_clear_bindings(this.pointer);
            this._mayGet = false;
            return this;
          },
          reset: function(alsoClearBinds) {
            affirmNotLockedByExec(this, "reset()");
            if (alsoClearBinds) this.clearBindings();
            const rc = capi.sqlite3_reset(affirmStmtOpen(this).pointer);
            this._mayGet = false;
            checkSqlite3Rc(this.db, rc);
            return this;
          },
          bind: function() {
            affirmStmtOpen(this);
            let ndx, arg;
            switch (arguments.length) {
              case 1:
                ndx = 1;
                arg = arguments[0];
                break;
              case 2:
                ndx = arguments[0];
                arg = arguments[1];
                break;
              default:
                toss3("Invalid bind() arguments.");
            }
            if (void 0 === arg) {
              return this;
            } else if (!this.parameterCount) {
              toss3("This statement has no bindable parameters.");
            }
            this._mayGet = false;
            if (null === arg) {
              return bindOne(this, ndx, BindTypes.null, arg);
            } else if (Array.isArray(arg)) {
              if (1 !== arguments.length) {
                toss3(
                  "When binding an array, an index argument is not permitted."
                );
              }
              arg.forEach(
                (v2, i) => bindOne(this, i + 1, affirmSupportedBindType(v2), v2)
              );
              return this;
            } else if (arg instanceof ArrayBuffer) {
              arg = new Uint8Array(arg);
            }
            if ("object" === typeof arg && !util.isBindableTypedArray(arg)) {
              if (1 !== arguments.length) {
                toss3(
                  "When binding an object, an index argument is not permitted."
                );
              }
              Object.keys(arg).forEach(
                (k) => bindOne(this, k, affirmSupportedBindType(arg[k]), arg[k])
              );
              return this;
            } else {
              return bindOne(this, ndx, affirmSupportedBindType(arg), arg);
            }
          },
          bindAsBlob: function(ndx, arg) {
            affirmStmtOpen(this);
            if (1 === arguments.length) {
              arg = ndx;
              ndx = 1;
            }
            const t = affirmSupportedBindType(arg);
            if (BindTypes.string !== t && BindTypes.blob !== t && BindTypes.null !== t) {
              toss3("Invalid value type for bindAsBlob()");
            }
            return bindOne(this, ndx, BindTypes.blob, arg);
          },
          step: function() {
            affirmNotLockedByExec(this, "step()");
            const rc = capi.sqlite3_step(affirmStmtOpen(this).pointer);
            switch (rc) {
              case capi.SQLITE_DONE:
                return this._mayGet = false;
              case capi.SQLITE_ROW:
                return this._mayGet = true;
              default:
                this._mayGet = false;
                sqlite3.config.warn(
                  "sqlite3_step() rc=",
                  rc,
                  capi.sqlite3_js_rc_str(rc),
                  "SQL =",
                  capi.sqlite3_sql(this.pointer)
                );
                DB.checkRc(this.db.pointer, rc);
            }
          },
          stepReset: function() {
            this.step();
            return this.reset();
          },
          stepFinalize: function() {
            try {
              const rc = this.step();
              this.reset();
              return rc;
            } finally {
              try {
                this.finalize();
              } catch (e) {
              }
            }
          },
          get: function(ndx, asType) {
            if (!affirmStmtOpen(this)._mayGet) {
              toss3("Stmt.step() has not (recently) returned true.");
            }
            if (Array.isArray(ndx)) {
              let i = 0;
              const n = this.columnCount;
              while (i < n) {
                ndx[i] = this.get(i++);
              }
              return ndx;
            } else if (ndx && "object" === typeof ndx) {
              let i = 0;
              const n = this.columnCount;
              while (i < n) {
                ndx[capi.sqlite3_column_name(this.pointer, i)] = this.get(i++);
              }
              return ndx;
            }
            affirmColIndex(this, ndx);
            switch (void 0 === asType ? capi.sqlite3_column_type(this.pointer, ndx) : asType) {
              case capi.SQLITE_NULL:
                return null;
              case capi.SQLITE_INTEGER: {
                if (wasm.bigIntEnabled) {
                  const rc = capi.sqlite3_column_int64(this.pointer, ndx);
                  if (rc >= Number.MIN_SAFE_INTEGER && rc <= Number.MAX_SAFE_INTEGER) {
                    return Number(rc).valueOf();
                  }
                  return rc;
                } else {
                  const rc = capi.sqlite3_column_double(this.pointer, ndx);
                  if (rc > Number.MAX_SAFE_INTEGER || rc < Number.MIN_SAFE_INTEGER) {
                    toss3(
                      "Integer is out of range for JS integer range: " + rc
                    );
                  }
                  return util.isInt32(rc) ? rc | 0 : rc;
                }
              }
              case capi.SQLITE_FLOAT:
                return capi.sqlite3_column_double(this.pointer, ndx);
              case capi.SQLITE_TEXT:
                return capi.sqlite3_column_text(this.pointer, ndx);
              case capi.SQLITE_BLOB: {
                const n = capi.sqlite3_column_bytes(this.pointer, ndx), ptr = capi.sqlite3_column_blob(this.pointer, ndx), rc = new Uint8Array(n);
                if (n) rc.set(wasm.heap8u().slice(ptr, ptr + n), 0);
                if (n && this.db._blobXfer instanceof Array) {
                  this.db._blobXfer.push(rc.buffer);
                }
                return rc;
              }
              default:
                toss3(
                  "Don't know how to translate",
                  "type of result column #" + ndx + "."
                );
            }
            toss3("Not reached.");
          },
          getInt: function(ndx) {
            return this.get(ndx, capi.SQLITE_INTEGER);
          },
          getFloat: function(ndx) {
            return this.get(ndx, capi.SQLITE_FLOAT);
          },
          getString: function(ndx) {
            return this.get(ndx, capi.SQLITE_TEXT);
          },
          getBlob: function(ndx) {
            return this.get(ndx, capi.SQLITE_BLOB);
          },
          getJSON: function(ndx) {
            const s = this.get(ndx, capi.SQLITE_STRING);
            return null === s ? s : JSON.parse(s);
          },
          getColumnName: function(ndx) {
            return capi.sqlite3_column_name(
              affirmColIndex(affirmStmtOpen(this), ndx).pointer,
              ndx
            );
          },
          getColumnNames: function(tgt = []) {
            affirmColIndex(affirmStmtOpen(this), 0);
            const n = this.columnCount;
            for (let i = 0; i < n; ++i) {
              tgt.push(capi.sqlite3_column_name(this.pointer, i));
            }
            return tgt;
          },
          getParamIndex: function(name) {
            return affirmStmtOpen(this).parameterCount ? capi.sqlite3_bind_parameter_index(this.pointer, name) : void 0;
          },
          getParamName: function(ndx) {
            return affirmStmtOpen(this).parameterCount ? capi.sqlite3_bind_parameter_name(this.pointer, ndx) : void 0;
          },
          isBusy: function() {
            return 0 !== capi.sqlite3_stmt_busy(affirmStmtOpen(this));
          },
          isReadOnly: function() {
            return 0 !== capi.sqlite3_stmt_readonly(affirmStmtOpen(this));
          }
        };
        {
          const prop = {
            enumerable: true,
            get: function() {
              return __ptrMap.get(this);
            },
            set: () => toss3("The pointer property is read-only.")
          };
          Object.defineProperty(Stmt.prototype, "pointer", prop);
          Object.defineProperty(DB.prototype, "pointer", prop);
        }
        Object.defineProperty(Stmt.prototype, "columnCount", {
          enumerable: false,
          get: function() {
            return capi.sqlite3_column_count(this.pointer);
          },
          set: () => toss3("The columnCount property is read-only.")
        });
        sqlite3.oo1 = {
          DB,
          Stmt
        };
        if (util.isUIThread()) {
          sqlite3.oo1.JsStorageDb = function(storageName = "session") {
            const opt = dbCtorHelper.normalizeArgs(...arguments);
            storageName = opt.filename;
            if ("session" !== storageName && "local" !== storageName) {
              toss3("JsStorageDb db name must be one of 'session' or 'local'.");
            }
            opt.vfs = "kvvfs";
            dbCtorHelper.call(this, opt);
          };
          const jdb = sqlite3.oo1.JsStorageDb;
          jdb.prototype = Object.create(DB.prototype);
          jdb.clearStorage = capi.sqlite3_js_kvvfs_clear;
          jdb.prototype.clearStorage = function() {
            return jdb.clearStorage(affirmDbOpen(this).filename);
          };
          jdb.storageSize = capi.sqlite3_js_kvvfs_size;
          jdb.prototype.storageSize = function() {
            return jdb.storageSize(affirmDbOpen(this).filename);
          };
        }
      });
      globalThis.sqlite3ApiBootstrap.initializers.push(function(sqlite3) {
        const util = sqlite3.util;
        sqlite3.initWorker1API = function() {
          const toss = (...args) => {
            throw new Error(args.join(" "));
          };
          if (!(globalThis.WorkerGlobalScope instanceof Function)) {
            toss("initWorker1API() must be run from a Worker thread.");
          }
          const sqlite32 = this.sqlite3 || toss("Missing this.sqlite3 object.");
          const DB = sqlite32.oo1.DB;
          const getDbId = function(db) {
            let id = wState.idMap.get(db);
            if (id) return id;
            id = "db#" + ++wState.idSeq + "@" + db.pointer;
            wState.idMap.set(db, id);
            return id;
          };
          const wState = {
            dbList: [],
            idSeq: 0,
            idMap: /* @__PURE__ */ new WeakMap(),
            xfer: [],
            open: function(opt) {
              const db = new DB(opt);
              this.dbs[getDbId(db)] = db;
              if (this.dbList.indexOf(db) < 0) this.dbList.push(db);
              return db;
            },
            close: function(db, alsoUnlink) {
              if (db) {
                delete this.dbs[getDbId(db)];
                const filename = db.filename;
                const pVfs = util.sqlite3__wasm_db_vfs(db.pointer, 0);
                db.close();
                const ddNdx = this.dbList.indexOf(db);
                if (ddNdx >= 0) this.dbList.splice(ddNdx, 1);
                if (alsoUnlink && filename && pVfs) {
                  util.sqlite3__wasm_vfs_unlink(pVfs, filename);
                }
              }
            },
            post: function(msg, xferList) {
              if (xferList && xferList.length) {
                globalThis.postMessage(msg, Array.from(xferList));
                xferList.length = 0;
              } else {
                globalThis.postMessage(msg);
              }
            },
            dbs: /* @__PURE__ */ Object.create(null),
            getDb: function(id, require2 = true) {
              return this.dbs[id] || (require2 ? toss("Unknown (or closed) DB ID:", id) : void 0);
            }
          };
          const affirmDbOpen = function(db = wState.dbList[0]) {
            return db && db.pointer ? db : toss("DB is not opened.");
          };
          const getMsgDb = function(msgData, affirmExists = true) {
            const db = wState.getDb(msgData.dbId, false) || wState.dbList[0];
            return affirmExists ? affirmDbOpen(db) : db;
          };
          const getDefaultDbId = function() {
            return wState.dbList[0] && getDbId(wState.dbList[0]);
          };
          const wMsgHandler = {
            open: function(ev) {
              const oargs = /* @__PURE__ */ Object.create(null), args = ev.args || /* @__PURE__ */ Object.create(null);
              if (args.simulateError) {
                toss("Throwing because of simulateError flag.");
              }
              const rc = /* @__PURE__ */ Object.create(null);
              oargs.vfs = args.vfs;
              oargs.filename = args.filename || "";
              const db = wState.open(oargs);
              rc.filename = db.filename;
              rc.persistent = !!sqlite32.capi.sqlite3_js_db_uses_vfs(
                db.pointer,
                "opfs"
              );
              rc.dbId = getDbId(db);
              rc.vfs = db.dbVfsName();
              return rc;
            },
            close: function(ev) {
              const db = getMsgDb(ev, false);
              const response = {
                filename: db && db.filename
              };
              if (db) {
                const doUnlink = ev.args && "object" === typeof ev.args ? !!ev.args.unlink : false;
                wState.close(db, doUnlink);
              }
              return response;
            },
            exec: function(ev) {
              const rc = "string" === typeof ev.args ? { sql: ev.args } : ev.args || /* @__PURE__ */ Object.create(null);
              if ("stmt" === rc.rowMode) {
                toss(
                  "Invalid rowMode for 'exec': stmt mode",
                  "does not work in the Worker API."
                );
              } else if (!rc.sql) {
                toss("'exec' requires input SQL.");
              }
              const db = getMsgDb(ev);
              if (rc.callback || Array.isArray(rc.resultRows)) {
                db._blobXfer = wState.xfer;
              }
              const theCallback = rc.callback;
              let rowNumber = 0;
              const hadColNames = !!rc.columnNames;
              if ("string" === typeof theCallback) {
                if (!hadColNames) rc.columnNames = [];
                rc.callback = function(row, stmt) {
                  wState.post(
                    {
                      type: theCallback,
                      columnNames: rc.columnNames,
                      rowNumber: ++rowNumber,
                      row
                    },
                    wState.xfer
                  );
                };
              }
              try {
                const changeCount = !!rc.countChanges ? db.changes(true, 64 === rc.countChanges) : void 0;
                db.exec(rc);
                if (void 0 !== changeCount) {
                  rc.changeCount = db.changes(true, 64 === rc.countChanges) - changeCount;
                }
                if (rc.callback instanceof Function) {
                  rc.callback = theCallback;
                  wState.post({
                    type: theCallback,
                    columnNames: rc.columnNames,
                    rowNumber: null,
                    row: void 0
                  });
                }
              } finally {
                delete db._blobXfer;
                if (rc.callback) rc.callback = theCallback;
              }
              return rc;
            },
            "config-get": function() {
              const rc = /* @__PURE__ */ Object.create(null), src = sqlite32.config;
              ["bigIntEnabled"].forEach(function(k) {
                if (Object.getOwnPropertyDescriptor(src, k)) rc[k] = src[k];
              });
              rc.version = sqlite32.version;
              rc.vfsList = sqlite32.capi.sqlite3_js_vfs_list();
              return rc;
            },
            export: function(ev) {
              const db = getMsgDb(ev);
              const response = {
                byteArray: sqlite32.capi.sqlite3_js_db_export(db.pointer),
                filename: db.filename,
                mimetype: "application/x-sqlite3"
              };
              wState.xfer.push(response.byteArray.buffer);
              return response;
            },
            toss: function(ev) {
              toss("Testing worker exception");
            }
          };
          globalThis.onmessage = async function(ev) {
            ev = ev.data;
            let result, dbId = ev.dbId, evType = ev.type;
            const arrivalTime = performance.now();
            try {
              if (wMsgHandler.hasOwnProperty(evType) && wMsgHandler[evType] instanceof Function) {
                result = await wMsgHandler[evType](ev);
              } else {
                toss("Unknown db worker message type:", ev.type);
              }
            } catch (err2) {
              evType = "error";
              result = {
                operation: ev.type,
                message: err2.message,
                errorClass: err2.name,
                input: ev
              };
              if (err2.stack) {
                result.stack = "string" === typeof err2.stack ? err2.stack.split(/\n\s*/) : err2.stack;
              }
            }
            if (!dbId) {
              dbId = result.dbId || getDefaultDbId();
            }
            wState.post(
              {
                type: evType,
                dbId,
                messageId: ev.messageId,
                workerReceivedTime: arrivalTime,
                workerRespondTime: performance.now(),
                departureTime: ev.departureTime,
                result
              },
              wState.xfer
            );
          };
          globalThis.postMessage({
            type: "sqlite3-api",
            result: "worker1-ready"
          });
        }.bind({ sqlite3 });
      });
      globalThis.sqlite3ApiBootstrap.initializers.push(function(sqlite3) {
        const wasm = sqlite3.wasm, capi = sqlite3.capi, toss = sqlite3.util.toss3;
        const vfs = /* @__PURE__ */ Object.create(null);
        sqlite3.vfs = vfs;
        capi.sqlite3_vfs.prototype.registerVfs = function(asDefault = false) {
          if (!(this instanceof sqlite3.capi.sqlite3_vfs)) {
            toss("Expecting a sqlite3_vfs-type argument.");
          }
          const rc = capi.sqlite3_vfs_register(this, asDefault ? 1 : 0);
          if (rc) {
            toss("sqlite3_vfs_register(", this, ") failed with rc", rc);
          }
          if (this.pointer !== capi.sqlite3_vfs_find(this.$zName)) {
            toss(
              "BUG: sqlite3_vfs_find(vfs.$zName) failed for just-installed VFS",
              this
            );
          }
          return this;
        };
        vfs.installVfs = function(opt) {
          let count = 0;
          const propList = ["io", "vfs"];
          for (const key of propList) {
            const o = opt[key];
            if (o) {
              ++count;
              o.struct.installMethods(o.methods, !!o.applyArgcCheck);
              if ("vfs" === key) {
                if (!o.struct.$zName && "string" === typeof o.name) {
                  o.struct.addOnDispose(
                    o.struct.$zName = wasm.allocCString(o.name)
                  );
                }
                o.struct.registerVfs(!!o.asDefault);
              }
            }
          }
          if (!count)
            toss(
              "Misuse: installVfs() options object requires at least",
              "one of:",
              propList
            );
          return this;
        };
      });
      globalThis.sqlite3ApiBootstrap.initializers.push(function(sqlite3) {
        if (!sqlite3.wasm.exports.sqlite3_declare_vtab) {
          return;
        }
        const wasm = sqlite3.wasm, capi = sqlite3.capi, toss = sqlite3.util.toss3;
        const vtab = /* @__PURE__ */ Object.create(null);
        sqlite3.vtab = vtab;
        const sii = capi.sqlite3_index_info;
        sii.prototype.nthConstraint = function(n, asPtr = false) {
          if (n < 0 || n >= this.$nConstraint) return false;
          const ptr = this.$aConstraint + sii.sqlite3_index_constraint.structInfo.sizeof * n;
          return asPtr ? ptr : new sii.sqlite3_index_constraint(ptr);
        };
        sii.prototype.nthConstraintUsage = function(n, asPtr = false) {
          if (n < 0 || n >= this.$nConstraint) return false;
          const ptr = this.$aConstraintUsage + sii.sqlite3_index_constraint_usage.structInfo.sizeof * n;
          return asPtr ? ptr : new sii.sqlite3_index_constraint_usage(ptr);
        };
        sii.prototype.nthOrderBy = function(n, asPtr = false) {
          if (n < 0 || n >= this.$nOrderBy) return false;
          const ptr = this.$aOrderBy + sii.sqlite3_index_orderby.structInfo.sizeof * n;
          return asPtr ? ptr : new sii.sqlite3_index_orderby(ptr);
        };
        const __xWrapFactory = function(methodName, StructType) {
          return function(ptr, removeMapping = false) {
            if (0 === arguments.length) ptr = new StructType();
            if (ptr instanceof StructType) {
              this.set(ptr.pointer, ptr);
              return ptr;
            } else if (!wasm.isPtr(ptr)) {
              sqlite3.SQLite3Error.toss(
                "Invalid argument to",
                methodName + "()"
              );
            }
            let rc = this.get(ptr);
            if (removeMapping) this.delete(ptr);
            return rc;
          }.bind(/* @__PURE__ */ new Map());
        };
        const StructPtrMapper = function(name, StructType) {
          const __xWrap = __xWrapFactory(name, StructType);
          return Object.assign(/* @__PURE__ */ Object.create(null), {
            StructType,
            create: (ppOut) => {
              const rc = __xWrap();
              wasm.pokePtr(ppOut, rc.pointer);
              return rc;
            },
            get: (pCObj) => __xWrap(pCObj),
            unget: (pCObj) => __xWrap(pCObj, true),
            dispose: (pCObj) => {
              const o = __xWrap(pCObj, true);
              if (o) o.dispose();
            }
          });
        };
        vtab.xVtab = StructPtrMapper("xVtab", capi.sqlite3_vtab);
        vtab.xCursor = StructPtrMapper("xCursor", capi.sqlite3_vtab_cursor);
        vtab.xIndexInfo = (pIdxInfo) => new capi.sqlite3_index_info(pIdxInfo);
        vtab.xError = function f(methodName, err2, defaultRc) {
          if (f.errorReporter instanceof Function) {
            try {
              f.errorReporter(
                "sqlite3_module::" + methodName + "(): " + err2.message
              );
            } catch (e) {
            }
          }
          let rc;
          if (err2 instanceof sqlite3.WasmAllocError) rc = capi.SQLITE_NOMEM;
          else if (arguments.length > 2) rc = defaultRc;
          else if (err2 instanceof sqlite3.SQLite3Error) rc = err2.resultCode;
          return rc || capi.SQLITE_ERROR;
        };
        vtab.xError.errorReporter = console.error.bind(console);
        vtab.xRowid = (ppRowid64, value) => wasm.poke(ppRowid64, value, "i64");
        vtab.setupModule = function(opt) {
          let createdMod = false;
          const mod = this instanceof capi.sqlite3_module ? this : opt.struct || (createdMod = new capi.sqlite3_module());
          try {
            const methods = opt.methods || toss("Missing 'methods' object.");
            for (const e of Object.entries({
              xConnect: "xCreate",
              xDisconnect: "xDestroy"
            })) {
              const k = e[0], v2 = e[1];
              if (true === methods[k]) methods[k] = methods[v2];
              else if (true === methods[v2]) methods[v2] = methods[k];
            }
            if (opt.catchExceptions) {
              const fwrap = function(methodName, func) {
                if (["xConnect", "xCreate"].indexOf(methodName) >= 0) {
                  return function(pDb2, pAux, argc, argv, ppVtab, pzErr) {
                    try {
                      return func(...arguments) || 0;
                    } catch (e) {
                      if (!(e instanceof sqlite3.WasmAllocError)) {
                        wasm.dealloc(wasm.peekPtr(pzErr));
                        wasm.pokePtr(pzErr, wasm.allocCString(e.message));
                      }
                      return vtab.xError(methodName, e);
                    }
                  };
                } else {
                  return function(...args) {
                    try {
                      return func(...args) || 0;
                    } catch (e) {
                      return vtab.xError(methodName, e);
                    }
                  };
                }
              };
              const mnames = [
                "xCreate",
                "xConnect",
                "xBestIndex",
                "xDisconnect",
                "xDestroy",
                "xOpen",
                "xClose",
                "xFilter",
                "xNext",
                "xEof",
                "xColumn",
                "xRowid",
                "xUpdate",
                "xBegin",
                "xSync",
                "xCommit",
                "xRollback",
                "xFindFunction",
                "xRename",
                "xSavepoint",
                "xRelease",
                "xRollbackTo",
                "xShadowName"
              ];
              const remethods = /* @__PURE__ */ Object.create(null);
              for (const k of mnames) {
                const m = methods[k];
                if (!(m instanceof Function)) continue;
                else if ("xConnect" === k && methods.xCreate === m) {
                  remethods[k] = methods.xCreate;
                } else if ("xCreate" === k && methods.xConnect === m) {
                  remethods[k] = methods.xConnect;
                } else {
                  remethods[k] = fwrap(k, m);
                }
              }
              mod.installMethods(remethods, false);
            } else {
              mod.installMethods(methods, !!opt.applyArgcCheck);
            }
            if (0 === mod.$iVersion) {
              let v2;
              if ("number" === typeof opt.iVersion) v2 = opt.iVersion;
              else if (mod.$xShadowName) v2 = 3;
              else if (mod.$xSavePoint || mod.$xRelease || mod.$xRollbackTo)
                v2 = 2;
              else v2 = 1;
              mod.$iVersion = v2;
            }
          } catch (e) {
            if (createdMod) createdMod.dispose();
            throw e;
          }
          return mod;
        };
        capi.sqlite3_module.prototype.setupModule = function(opt) {
          return vtab.setupModule.call(this, opt);
        };
      });
      globalThis.sqlite3ApiBootstrap.initializers.push(function(sqlite3) {
        const installOpfsVfs = function callee2(options) {
          if (!globalThis.SharedArrayBuffer || !globalThis.Atomics) {
            return Promise.reject(
              new Error(
                "Cannot install OPFS: Missing SharedArrayBuffer and/or Atomics. The server must emit the COOP/COEP response headers to enable those. See https://sqlite.org/wasm/doc/trunk/persistence.md#coop-coep"
              )
            );
          } else if ("undefined" === typeof WorkerGlobalScope) {
            return Promise.reject(
              new Error(
                "The OPFS sqlite3_vfs cannot run in the main thread because it requires Atomics.wait()."
              )
            );
          } else if (!globalThis.FileSystemHandle || !globalThis.FileSystemDirectoryHandle || !globalThis.FileSystemFileHandle || !globalThis.FileSystemFileHandle.prototype.createSyncAccessHandle || !navigator?.storage?.getDirectory) {
            return Promise.reject(new Error("Missing required OPFS APIs."));
          }
          if (!options || "object" !== typeof options) {
            options = /* @__PURE__ */ Object.create(null);
          }
          const urlParams = new URL(globalThis.location.href).searchParams;
          if (urlParams.has("opfs-disable")) {
            return Promise.resolve(sqlite3);
          }
          if (void 0 === options.verbose) {
            options.verbose = urlParams.has("opfs-verbose") ? +urlParams.get("opfs-verbose") || 2 : 1;
          }
          if (void 0 === options.sanityChecks) {
            options.sanityChecks = urlParams.has("opfs-sanity-check");
          }
          if (void 0 === options.proxyUri) {
            options.proxyUri = callee2.defaultProxyUri;
          }
          if ("function" === typeof options.proxyUri) {
            options.proxyUri = options.proxyUri();
          }
          const thePromise = new Promise(function(promiseResolve_, promiseReject_) {
            const loggers = [
              sqlite3.config.error,
              sqlite3.config.warn,
              sqlite3.config.log
            ];
            const logImpl = (level, ...args) => {
              if (options.verbose > level)
                loggers[level]("OPFS syncer:", ...args);
            };
            const log = (...args) => logImpl(2, ...args);
            const warn = (...args) => logImpl(1, ...args);
            const error = (...args) => logImpl(0, ...args);
            const toss = sqlite3.util.toss;
            const capi = sqlite3.capi;
            const util = sqlite3.util;
            const wasm = sqlite3.wasm;
            const sqlite3_vfs = capi.sqlite3_vfs;
            const sqlite3_file = capi.sqlite3_file;
            const sqlite3_io_methods = capi.sqlite3_io_methods;
            const opfsUtil = /* @__PURE__ */ Object.create(null);
            const thisThreadHasOPFS = () => {
              return globalThis.FileSystemHandle && globalThis.FileSystemDirectoryHandle && globalThis.FileSystemFileHandle && globalThis.FileSystemFileHandle.prototype.createSyncAccessHandle && navigator?.storage?.getDirectory;
            };
            opfsUtil.metrics = {
              dump: function() {
                let k, n = 0, t = 0, w = 0;
                for (k in state.opIds) {
                  const m = metrics[k];
                  n += m.count;
                  t += m.time;
                  w += m.wait;
                  m.avgTime = m.count && m.time ? m.time / m.count : 0;
                  m.avgWait = m.count && m.wait ? m.wait / m.count : 0;
                }
                sqlite3.config.log(
                  globalThis.location.href,
                  "metrics for",
                  globalThis.location.href,
                  ":",
                  metrics,
                  "\nTotal of",
                  n,
                  "op(s) for",
                  t,
                  "ms (incl. " + w + " ms of waiting on the async side)"
                );
                sqlite3.config.log("Serialization metrics:", metrics.s11n);
                W.postMessage({ type: "opfs-async-metrics" });
              },
              reset: function() {
                let k;
                const r = (m) => m.count = m.time = m.wait = 0;
                for (k in state.opIds) {
                  r(metrics[k] = /* @__PURE__ */ Object.create(null));
                }
                let s = metrics.s11n = /* @__PURE__ */ Object.create(null);
                s = s.serialize = /* @__PURE__ */ Object.create(null);
                s.count = s.time = 0;
                s = metrics.s11n.deserialize = /* @__PURE__ */ Object.create(null);
                s.count = s.time = 0;
              }
            };
            const opfsIoMethods = new sqlite3_io_methods();
            const opfsVfs = new sqlite3_vfs().addOnDispose(
              () => opfsIoMethods.dispose()
            );
            let promiseWasRejected = void 0;
            const promiseReject = (err2) => {
              promiseWasRejected = true;
              opfsVfs.dispose();
              return promiseReject_(err2);
            };
            const promiseResolve = () => {
              promiseWasRejected = false;
              return promiseResolve_(sqlite3);
            };
            const W = new Worker(
              new URL(
                /* @vite-ignore */
                "" + new URL("sqlite3-opfs-async-proxy-CYRFPDln.js", import.meta.url).href,
                import.meta.url
              )
            );
            setTimeout(() => {
              if (void 0 === promiseWasRejected) {
                promiseReject(
                  new Error(
                    "Timeout while waiting for OPFS async proxy worker."
                  )
                );
              }
            }, 4e3);
            W._originalOnError = W.onerror;
            W.onerror = function(err2) {
              error("Error initializing OPFS asyncer:", err2);
              promiseReject(
                new Error(
                  "Loading OPFS async Worker failed for unknown reasons."
                )
              );
            };
            const pDVfs = capi.sqlite3_vfs_find(null);
            const dVfs = pDVfs ? new sqlite3_vfs(pDVfs) : null;
            opfsIoMethods.$iVersion = 1;
            opfsVfs.$iVersion = 2;
            opfsVfs.$szOsFile = capi.sqlite3_file.structInfo.sizeof;
            opfsVfs.$mxPathname = 1024;
            opfsVfs.$zName = wasm.allocCString("opfs");
            opfsVfs.$xDlOpen = opfsVfs.$xDlError = opfsVfs.$xDlSym = opfsVfs.$xDlClose = null;
            opfsVfs.addOnDispose(
              "$zName",
              opfsVfs.$zName,
              "cleanup default VFS wrapper",
              () => dVfs ? dVfs.dispose() : null
            );
            const state = /* @__PURE__ */ Object.create(null);
            state.verbose = options.verbose;
            state.littleEndian = (() => {
              const buffer = new ArrayBuffer(2);
              new DataView(buffer).setInt16(0, 256, true);
              return new Int16Array(buffer)[0] === 256;
            })();
            state.asyncIdleWaitTime = 150;
            state.asyncS11nExceptions = 1;
            state.fileBufferSize = 1024 * 64;
            state.sabS11nOffset = state.fileBufferSize;
            state.sabS11nSize = opfsVfs.$mxPathname * 2;
            state.sabIO = new SharedArrayBuffer(
              state.fileBufferSize + state.sabS11nSize
            );
            state.opIds = /* @__PURE__ */ Object.create(null);
            const metrics = /* @__PURE__ */ Object.create(null);
            {
              let i = 0;
              state.opIds.whichOp = i++;
              state.opIds.rc = i++;
              state.opIds.xAccess = i++;
              state.opIds.xClose = i++;
              state.opIds.xDelete = i++;
              state.opIds.xDeleteNoWait = i++;
              state.opIds.xFileSize = i++;
              state.opIds.xLock = i++;
              state.opIds.xOpen = i++;
              state.opIds.xRead = i++;
              state.opIds.xSleep = i++;
              state.opIds.xSync = i++;
              state.opIds.xTruncate = i++;
              state.opIds.xUnlock = i++;
              state.opIds.xWrite = i++;
              state.opIds.mkdir = i++;
              state.opIds["opfs-async-metrics"] = i++;
              state.opIds["opfs-async-shutdown"] = i++;
              state.opIds.retry = i++;
              state.sabOP = new SharedArrayBuffer(i * 4);
              opfsUtil.metrics.reset();
            }
            state.sq3Codes = /* @__PURE__ */ Object.create(null);
            [
              "SQLITE_ACCESS_EXISTS",
              "SQLITE_ACCESS_READWRITE",
              "SQLITE_BUSY",
              "SQLITE_CANTOPEN",
              "SQLITE_ERROR",
              "SQLITE_IOERR",
              "SQLITE_IOERR_ACCESS",
              "SQLITE_IOERR_CLOSE",
              "SQLITE_IOERR_DELETE",
              "SQLITE_IOERR_FSYNC",
              "SQLITE_IOERR_LOCK",
              "SQLITE_IOERR_READ",
              "SQLITE_IOERR_SHORT_READ",
              "SQLITE_IOERR_TRUNCATE",
              "SQLITE_IOERR_UNLOCK",
              "SQLITE_IOERR_WRITE",
              "SQLITE_LOCK_EXCLUSIVE",
              "SQLITE_LOCK_NONE",
              "SQLITE_LOCK_PENDING",
              "SQLITE_LOCK_RESERVED",
              "SQLITE_LOCK_SHARED",
              "SQLITE_LOCKED",
              "SQLITE_MISUSE",
              "SQLITE_NOTFOUND",
              "SQLITE_OPEN_CREATE",
              "SQLITE_OPEN_DELETEONCLOSE",
              "SQLITE_OPEN_MAIN_DB",
              "SQLITE_OPEN_READONLY"
            ].forEach((k) => {
              if (void 0 === (state.sq3Codes[k] = capi[k])) {
                toss("Maintenance required: not found:", k);
              }
            });
            state.opfsFlags = Object.assign(/* @__PURE__ */ Object.create(null), {
              OPFS_UNLOCK_ASAP: 1,
              OPFS_UNLINK_BEFORE_OPEN: 2,
              defaultUnlockAsap: false
            });
            const opRun = (op, ...args) => {
              const opNdx = state.opIds[op] || toss("Invalid op ID:", op);
              state.s11n.serialize(...args);
              Atomics.store(state.sabOPView, state.opIds.rc, -1);
              Atomics.store(state.sabOPView, state.opIds.whichOp, opNdx);
              Atomics.notify(state.sabOPView, state.opIds.whichOp);
              const t = performance.now();
              while ("not-equal" !== Atomics.wait(state.sabOPView, state.opIds.rc, -1)) {
              }
              const rc = Atomics.load(state.sabOPView, state.opIds.rc);
              metrics[op].wait += performance.now() - t;
              if (rc && state.asyncS11nExceptions) {
                const err2 = state.s11n.deserialize();
                if (err2) error(op + "() async error:", ...err2);
              }
              return rc;
            };
            opfsUtil.debug = {
              asyncShutdown: () => {
                warn(
                  "Shutting down OPFS async listener. The OPFS VFS will no longer work."
                );
                opRun("opfs-async-shutdown");
              },
              asyncRestart: () => {
                warn(
                  "Attempting to restart OPFS VFS async listener. Might work, might not."
                );
                W.postMessage({ type: "opfs-async-restart" });
              }
            };
            const initS11n = () => {
              if (state.s11n) return state.s11n;
              const textDecoder = new TextDecoder(), textEncoder = new TextEncoder("utf-8"), viewU8 = new Uint8Array(
                state.sabIO,
                state.sabS11nOffset,
                state.sabS11nSize
              ), viewDV = new DataView(
                state.sabIO,
                state.sabS11nOffset,
                state.sabS11nSize
              );
              state.s11n = /* @__PURE__ */ Object.create(null);
              const TypeIds = /* @__PURE__ */ Object.create(null);
              TypeIds.number = {
                id: 1,
                size: 8,
                getter: "getFloat64",
                setter: "setFloat64"
              };
              TypeIds.bigint = {
                id: 2,
                size: 8,
                getter: "getBigInt64",
                setter: "setBigInt64"
              };
              TypeIds.boolean = {
                id: 3,
                size: 4,
                getter: "getInt32",
                setter: "setInt32"
              };
              TypeIds.string = { id: 4 };
              const getTypeId = (v2) => TypeIds[typeof v2] || toss(
                "Maintenance required: this value type cannot be serialized.",
                v2
              );
              const getTypeIdById = (tid) => {
                switch (tid) {
                  case TypeIds.number.id:
                    return TypeIds.number;
                  case TypeIds.bigint.id:
                    return TypeIds.bigint;
                  case TypeIds.boolean.id:
                    return TypeIds.boolean;
                  case TypeIds.string.id:
                    return TypeIds.string;
                  default:
                    toss("Invalid type ID:", tid);
                }
              };
              state.s11n.deserialize = function(clear = false) {
                ++metrics.s11n.deserialize.count;
                const t = performance.now();
                const argc = viewU8[0];
                const rc = argc ? [] : null;
                if (argc) {
                  const typeIds = [];
                  let offset = 1, i, n, v2;
                  for (i = 0; i < argc; ++i, ++offset) {
                    typeIds.push(getTypeIdById(viewU8[offset]));
                  }
                  for (i = 0; i < argc; ++i) {
                    const t2 = typeIds[i];
                    if (t2.getter) {
                      v2 = viewDV[t2.getter](offset, state.littleEndian);
                      offset += t2.size;
                    } else {
                      n = viewDV.getInt32(offset, state.littleEndian);
                      offset += 4;
                      v2 = textDecoder.decode(viewU8.slice(offset, offset + n));
                      offset += n;
                    }
                    rc.push(v2);
                  }
                }
                if (clear) viewU8[0] = 0;
                metrics.s11n.deserialize.time += performance.now() - t;
                return rc;
              };
              state.s11n.serialize = function(...args) {
                const t = performance.now();
                ++metrics.s11n.serialize.count;
                if (args.length) {
                  const typeIds = [];
                  let i = 0, offset = 1;
                  viewU8[0] = args.length & 255;
                  for (; i < args.length; ++i, ++offset) {
                    typeIds.push(getTypeId(args[i]));
                    viewU8[offset] = typeIds[i].id;
                  }
                  for (i = 0; i < args.length; ++i) {
                    const t2 = typeIds[i];
                    if (t2.setter) {
                      viewDV[t2.setter](offset, args[i], state.littleEndian);
                      offset += t2.size;
                    } else {
                      const s = textEncoder.encode(args[i]);
                      viewDV.setInt32(offset, s.byteLength, state.littleEndian);
                      offset += 4;
                      viewU8.set(s, offset);
                      offset += s.byteLength;
                    }
                  }
                } else {
                  viewU8[0] = 0;
                }
                metrics.s11n.serialize.time += performance.now() - t;
              };
              return state.s11n;
            };
            const randomFilename = function f(len = 16) {
              if (!f._chars) {
                f._chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012346789";
                f._n = f._chars.length;
              }
              const a = [];
              let i = 0;
              for (; i < len; ++i) {
                const ndx = Math.random() * (f._n * 64) % f._n | 0;
                a[i] = f._chars[ndx];
              }
              return a.join("");
            };
            const __openFiles = /* @__PURE__ */ Object.create(null);
            const opTimer = /* @__PURE__ */ Object.create(null);
            opTimer.op = void 0;
            opTimer.start = void 0;
            const mTimeStart = (op) => {
              opTimer.start = performance.now();
              opTimer.op = op;
              ++metrics[op].count;
            };
            const mTimeEnd = () => metrics[opTimer.op].time += performance.now() - opTimer.start;
            const ioSyncWrappers = {
              xCheckReservedLock: function(pFile, pOut) {
                wasm.poke(pOut, 0, "i32");
                return 0;
              },
              xClose: function(pFile) {
                mTimeStart("xClose");
                let rc = 0;
                const f = __openFiles[pFile];
                if (f) {
                  delete __openFiles[pFile];
                  rc = opRun("xClose", pFile);
                  if (f.sq3File) f.sq3File.dispose();
                }
                mTimeEnd();
                return rc;
              },
              xDeviceCharacteristics: function(pFile) {
                return capi.SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN;
              },
              xFileControl: function(pFile, opId, pArg) {
                return capi.SQLITE_NOTFOUND;
              },
              xFileSize: function(pFile, pSz64) {
                mTimeStart("xFileSize");
                let rc = opRun("xFileSize", pFile);
                if (0 == rc) {
                  try {
                    const sz = state.s11n.deserialize()[0];
                    wasm.poke(pSz64, sz, "i64");
                  } catch (e) {
                    error("Unexpected error reading xFileSize() result:", e);
                    rc = state.sq3Codes.SQLITE_IOERR;
                  }
                }
                mTimeEnd();
                return rc;
              },
              xLock: function(pFile, lockType) {
                mTimeStart("xLock");
                const f = __openFiles[pFile];
                let rc = 0;
                if (!f.lockType) {
                  rc = opRun("xLock", pFile, lockType);
                  if (0 === rc) f.lockType = lockType;
                } else {
                  f.lockType = lockType;
                }
                mTimeEnd();
                return rc;
              },
              xRead: function(pFile, pDest, n, offset64) {
                mTimeStart("xRead");
                const f = __openFiles[pFile];
                let rc;
                try {
                  rc = opRun("xRead", pFile, n, Number(offset64));
                  if (0 === rc || capi.SQLITE_IOERR_SHORT_READ === rc) {
                    wasm.heap8u().set(f.sabView.subarray(0, n), pDest);
                  }
                } catch (e) {
                  error("xRead(", arguments, ") failed:", e, f);
                  rc = capi.SQLITE_IOERR_READ;
                }
                mTimeEnd();
                return rc;
              },
              xSync: function(pFile, flags) {
                mTimeStart("xSync");
                ++metrics.xSync.count;
                const rc = opRun("xSync", pFile, flags);
                mTimeEnd();
                return rc;
              },
              xTruncate: function(pFile, sz64) {
                mTimeStart("xTruncate");
                const rc = opRun("xTruncate", pFile, Number(sz64));
                mTimeEnd();
                return rc;
              },
              xUnlock: function(pFile, lockType) {
                mTimeStart("xUnlock");
                const f = __openFiles[pFile];
                let rc = 0;
                if (capi.SQLITE_LOCK_NONE === lockType && f.lockType) {
                  rc = opRun("xUnlock", pFile, lockType);
                }
                if (0 === rc) f.lockType = lockType;
                mTimeEnd();
                return rc;
              },
              xWrite: function(pFile, pSrc, n, offset64) {
                mTimeStart("xWrite");
                const f = __openFiles[pFile];
                let rc;
                try {
                  f.sabView.set(wasm.heap8u().subarray(pSrc, pSrc + n));
                  rc = opRun("xWrite", pFile, n, Number(offset64));
                } catch (e) {
                  error("xWrite(", arguments, ") failed:", e, f);
                  rc = capi.SQLITE_IOERR_WRITE;
                }
                mTimeEnd();
                return rc;
              }
            };
            const vfsSyncWrappers = {
              xAccess: function(pVfs, zName, flags, pOut) {
                mTimeStart("xAccess");
                const rc = opRun("xAccess", wasm.cstrToJs(zName));
                wasm.poke(pOut, rc ? 0 : 1, "i32");
                mTimeEnd();
                return 0;
              },
              xCurrentTime: function(pVfs, pOut) {
                wasm.poke(
                  pOut,
                  24405875e-1 + (/* @__PURE__ */ new Date()).getTime() / 864e5,
                  "double"
                );
                return 0;
              },
              xCurrentTimeInt64: function(pVfs, pOut) {
                wasm.poke(
                  pOut,
                  24405875e-1 * 864e5 + (/* @__PURE__ */ new Date()).getTime(),
                  "i64"
                );
                return 0;
              },
              xDelete: function(pVfs, zName, doSyncDir) {
                mTimeStart("xDelete");
                const rc = opRun(
                  "xDelete",
                  wasm.cstrToJs(zName),
                  doSyncDir,
                  false
                );
                mTimeEnd();
                return rc;
              },
              xFullPathname: function(pVfs, zName, nOut, pOut) {
                const i = wasm.cstrncpy(pOut, zName, nOut);
                return i < nOut ? 0 : capi.SQLITE_CANTOPEN;
              },
              xGetLastError: function(pVfs, nOut, pOut) {
                warn("OPFS xGetLastError() has nothing sensible to return.");
                return 0;
              },
              xOpen: function f(pVfs, zName, pFile, flags, pOutFlags) {
                mTimeStart("xOpen");
                let opfsFlags = 0;
                if (0 === zName) {
                  zName = randomFilename();
                } else if (wasm.isPtr(zName)) {
                  if (capi.sqlite3_uri_boolean(zName, "opfs-unlock-asap", 0)) {
                    opfsFlags |= state.opfsFlags.OPFS_UNLOCK_ASAP;
                  }
                  if (capi.sqlite3_uri_boolean(zName, "delete-before-open", 0)) {
                    opfsFlags |= state.opfsFlags.OPFS_UNLINK_BEFORE_OPEN;
                  }
                  zName = wasm.cstrToJs(zName);
                }
                const fh = /* @__PURE__ */ Object.create(null);
                fh.fid = pFile;
                fh.filename = zName;
                fh.sab = new SharedArrayBuffer(state.fileBufferSize);
                fh.flags = flags;
                fh.readOnly = !(sqlite3.SQLITE_OPEN_CREATE & flags) && !!(flags & capi.SQLITE_OPEN_READONLY);
                const rc = opRun("xOpen", pFile, zName, flags, opfsFlags);
                if (!rc) {
                  if (fh.readOnly) {
                    wasm.poke(pOutFlags, capi.SQLITE_OPEN_READONLY, "i32");
                  }
                  __openFiles[pFile] = fh;
                  fh.sabView = state.sabFileBufView;
                  fh.sq3File = new sqlite3_file(pFile);
                  fh.sq3File.$pMethods = opfsIoMethods.pointer;
                  fh.lockType = capi.SQLITE_LOCK_NONE;
                }
                mTimeEnd();
                return rc;
              }
            };
            if (dVfs) {
              opfsVfs.$xRandomness = dVfs.$xRandomness;
              opfsVfs.$xSleep = dVfs.$xSleep;
            }
            if (!opfsVfs.$xRandomness) {
              vfsSyncWrappers.xRandomness = function(pVfs, nOut, pOut) {
                const heap = wasm.heap8u();
                let i = 0;
                for (; i < nOut; ++i)
                  heap[pOut + i] = Math.random() * 255e3 & 255;
                return i;
              };
            }
            if (!opfsVfs.$xSleep) {
              vfsSyncWrappers.xSleep = function(pVfs, ms) {
                Atomics.wait(state.sabOPView, state.opIds.xSleep, 0, ms);
                return 0;
              };
            }
            opfsUtil.getResolvedPath = function(filename, splitIt) {
              const p = new URL(filename, "file://irrelevant").pathname;
              return splitIt ? p.split("/").filter((v2) => !!v2) : p;
            };
            opfsUtil.getDirForFilename = async function f(absFilename, createDirs = false) {
              const path = opfsUtil.getResolvedPath(absFilename, true);
              const filename = path.pop();
              let dh = opfsUtil.rootDirectory;
              for (const dirName of path) {
                if (dirName) {
                  dh = await dh.getDirectoryHandle(dirName, {
                    create: !!createDirs
                  });
                }
              }
              return [dh, filename];
            };
            opfsUtil.mkdir = async function(absDirName) {
              try {
                await opfsUtil.getDirForFilename(
                  absDirName + "/filepart",
                  true
                );
                return true;
              } catch (e) {
                return false;
              }
            };
            opfsUtil.entryExists = async function(fsEntryName) {
              try {
                const [dh, fn] = await opfsUtil.getDirForFilename(fsEntryName);
                await dh.getFileHandle(fn);
                return true;
              } catch (e) {
                return false;
              }
            };
            opfsUtil.randomFilename = randomFilename;
            opfsUtil.treeList = async function() {
              const doDir = async function callee3(dirHandle, tgt) {
                tgt.name = dirHandle.name;
                tgt.dirs = [];
                tgt.files = [];
                for await (const handle of dirHandle.values()) {
                  if ("directory" === handle.kind) {
                    const subDir = /* @__PURE__ */ Object.create(null);
                    tgt.dirs.push(subDir);
                    await callee3(handle, subDir);
                  } else {
                    tgt.files.push(handle.name);
                  }
                }
              };
              const root = /* @__PURE__ */ Object.create(null);
              await doDir(opfsUtil.rootDirectory, root);
              return root;
            };
            opfsUtil.rmfr = async function() {
              const dir = opfsUtil.rootDirectory, opt = { recurse: true };
              for await (const handle of dir.values()) {
                dir.removeEntry(handle.name, opt);
              }
            };
            opfsUtil.unlink = async function(fsEntryName, recursive = false, throwOnError = false) {
              try {
                const [hDir, filenamePart] = await opfsUtil.getDirForFilename(
                  fsEntryName,
                  false
                );
                await hDir.removeEntry(filenamePart, { recursive });
                return true;
              } catch (e) {
                if (throwOnError) {
                  throw new Error(
                    "unlink(",
                    arguments[0],
                    ") failed: " + e.message,
                    {
                      cause: e
                    }
                  );
                }
                return false;
              }
            };
            opfsUtil.traverse = async function(opt) {
              const defaultOpt = {
                recursive: true,
                directory: opfsUtil.rootDirectory
              };
              if ("function" === typeof opt) {
                opt = { callback: opt };
              }
              opt = Object.assign(defaultOpt, opt || {});
              const doDir = async function callee3(dirHandle, depth) {
                for await (const handle of dirHandle.values()) {
                  if (false === opt.callback(handle, dirHandle, depth))
                    return false;
                  else if (opt.recursive && "directory" === handle.kind) {
                    if (false === await callee3(handle, depth + 1)) break;
                  }
                }
              };
              doDir(opt.directory, 0);
            };
            const importDbChunked = async function(filename, callback) {
              const [hDir, fnamePart] = await opfsUtil.getDirForFilename(
                filename,
                true
              );
              const hFile = await hDir.getFileHandle(fnamePart, {
                create: true
              });
              let sah = await hFile.createSyncAccessHandle();
              let nWrote = 0, chunk, checkedHeader = false;
              try {
                sah.truncate(0);
                while (void 0 !== (chunk = await callback())) {
                  if (chunk instanceof ArrayBuffer)
                    chunk = new Uint8Array(chunk);
                  if (0 === nWrote && chunk.byteLength >= 15) {
                    util.affirmDbHeader(chunk);
                    checkedHeader = true;
                  }
                  sah.write(chunk, { at: nWrote });
                  nWrote += chunk.byteLength;
                }
                if (nWrote < 512 || 0 !== nWrote % 512) {
                  toss(
                    "Input size",
                    nWrote,
                    "is not correct for an SQLite database."
                  );
                }
                if (!checkedHeader) {
                  const header = new Uint8Array(20);
                  sah.read(header, { at: 0 });
                  util.affirmDbHeader(header);
                }
                sah.write(new Uint8Array([1, 1]), { at: 18 });
                return nWrote;
              } catch (e) {
                await sah.close();
                sah = void 0;
                await hDir.removeEntry(fnamePart).catch(() => {
                });
                throw e;
              } finally {
                if (sah) await sah.close();
              }
            };
            opfsUtil.importDb = async function(filename, bytes) {
              if (bytes instanceof Function) {
                return importDbChunked(filename, bytes);
              }
              if (bytes instanceof ArrayBuffer) bytes = new Uint8Array(bytes);
              util.affirmIsDb(bytes);
              const n = bytes.byteLength;
              const [hDir, fnamePart] = await opfsUtil.getDirForFilename(
                filename,
                true
              );
              let sah, nWrote = 0;
              try {
                const hFile = await hDir.getFileHandle(fnamePart, {
                  create: true
                });
                sah = await hFile.createSyncAccessHandle();
                sah.truncate(0);
                nWrote = sah.write(bytes, { at: 0 });
                if (nWrote != n) {
                  toss(
                    "Expected to write " + n + " bytes but wrote " + nWrote + "."
                  );
                }
                sah.write(new Uint8Array([1, 1]), { at: 18 });
                return nWrote;
              } catch (e) {
                if (sah) {
                  await sah.close();
                  sah = void 0;
                }
                await hDir.removeEntry(fnamePart).catch(() => {
                });
                throw e;
              } finally {
                if (sah) await sah.close();
              }
            };
            if (sqlite3.oo1) {
              const OpfsDb = function(...args) {
                const opt = sqlite3.oo1.DB.dbCtorHelper.normalizeArgs(...args);
                opt.vfs = opfsVfs.$zName;
                sqlite3.oo1.DB.dbCtorHelper.call(this, opt);
              };
              OpfsDb.prototype = Object.create(sqlite3.oo1.DB.prototype);
              sqlite3.oo1.OpfsDb = OpfsDb;
              OpfsDb.importDb = opfsUtil.importDb;
              sqlite3.oo1.DB.dbCtorHelper.setVfsPostOpenCallback(
                opfsVfs.pointer,
                function(oo1Db, sqlite32) {
                  sqlite32.capi.sqlite3_busy_timeout(oo1Db, 1e4);
                }
              );
            }
            const sanityCheck = function() {
              const scope = wasm.scopedAllocPush();
              const sq3File = new sqlite3_file();
              try {
                const fid = sq3File.pointer;
                const openFlags = capi.SQLITE_OPEN_CREATE | capi.SQLITE_OPEN_READWRITE | capi.SQLITE_OPEN_MAIN_DB;
                const pOut = wasm.scopedAlloc(8);
                const dbFile = "/sanity/check/file" + randomFilename(8);
                const zDbFile = wasm.scopedAllocCString(dbFile);
                let rc;
                state.s11n.serialize("This is ä string.");
                rc = state.s11n.deserialize();
                log("deserialize() says:", rc);
                if ("This is ä string." !== rc[0]) toss("String d13n error.");
                vfsSyncWrappers.xAccess(opfsVfs.pointer, zDbFile, 0, pOut);
                rc = wasm.peek(pOut, "i32");
                log("xAccess(", dbFile, ") exists ?=", rc);
                rc = vfsSyncWrappers.xOpen(
                  opfsVfs.pointer,
                  zDbFile,
                  fid,
                  openFlags,
                  pOut
                );
                log(
                  "open rc =",
                  rc,
                  "state.sabOPView[xOpen] =",
                  state.sabOPView[state.opIds.xOpen]
                );
                if (0 !== rc) {
                  error("open failed with code", rc);
                  return;
                }
                vfsSyncWrappers.xAccess(opfsVfs.pointer, zDbFile, 0, pOut);
                rc = wasm.peek(pOut, "i32");
                if (!rc) toss("xAccess() failed to detect file.");
                rc = ioSyncWrappers.xSync(sq3File.pointer, 0);
                if (rc) toss("sync failed w/ rc", rc);
                rc = ioSyncWrappers.xTruncate(sq3File.pointer, 1024);
                if (rc) toss("truncate failed w/ rc", rc);
                wasm.poke(pOut, 0, "i64");
                rc = ioSyncWrappers.xFileSize(sq3File.pointer, pOut);
                if (rc) toss("xFileSize failed w/ rc", rc);
                log("xFileSize says:", wasm.peek(pOut, "i64"));
                rc = ioSyncWrappers.xWrite(sq3File.pointer, zDbFile, 10, 1);
                if (rc) toss("xWrite() failed!");
                const readBuf = wasm.scopedAlloc(16);
                rc = ioSyncWrappers.xRead(sq3File.pointer, readBuf, 6, 2);
                wasm.poke(readBuf + 6, 0);
                let jRead = wasm.cstrToJs(readBuf);
                log("xRead() got:", jRead);
                if ("sanity" !== jRead) toss("Unexpected xRead() value.");
                if (vfsSyncWrappers.xSleep) {
                  log("xSleep()ing before close()ing...");
                  vfsSyncWrappers.xSleep(opfsVfs.pointer, 2e3);
                  log("waking up from xSleep()");
                }
                rc = ioSyncWrappers.xClose(fid);
                log("xClose rc =", rc, "sabOPView =", state.sabOPView);
                log("Deleting file:", dbFile);
                vfsSyncWrappers.xDelete(opfsVfs.pointer, zDbFile, 4660);
                vfsSyncWrappers.xAccess(opfsVfs.pointer, zDbFile, 0, pOut);
                rc = wasm.peek(pOut, "i32");
                if (rc)
                  toss(
                    "Expecting 0 from xAccess(",
                    dbFile,
                    ") after xDelete()."
                  );
                warn("End of OPFS sanity checks.");
              } finally {
                sq3File.dispose();
                wasm.scopedAllocPop(scope);
              }
            };
            W.onmessage = function({ data }) {
              switch (data.type) {
                case "opfs-unavailable":
                  promiseReject(new Error(data.payload.join(" ")));
                  break;
                case "opfs-async-loaded":
                  W.postMessage({ type: "opfs-async-init", args: state });
                  break;
                case "opfs-async-inited": {
                  if (true === promiseWasRejected) {
                    break;
                  }
                  try {
                    sqlite3.vfs.installVfs({
                      io: { struct: opfsIoMethods, methods: ioSyncWrappers },
                      vfs: { struct: opfsVfs, methods: vfsSyncWrappers }
                    });
                    state.sabOPView = new Int32Array(state.sabOP);
                    state.sabFileBufView = new Uint8Array(
                      state.sabIO,
                      0,
                      state.fileBufferSize
                    );
                    state.sabS11nView = new Uint8Array(
                      state.sabIO,
                      state.sabS11nOffset,
                      state.sabS11nSize
                    );
                    initS11n();
                    if (options.sanityChecks) {
                      warn(
                        "Running sanity checks because of opfs-sanity-check URL arg..."
                      );
                      sanityCheck();
                    }
                    if (thisThreadHasOPFS()) {
                      navigator.storage.getDirectory().then((d) => {
                        W.onerror = W._originalOnError;
                        delete W._originalOnError;
                        sqlite3.opfs = opfsUtil;
                        opfsUtil.rootDirectory = d;
                        log("End of OPFS sqlite3_vfs setup.", opfsVfs);
                        promiseResolve();
                      }).catch(promiseReject);
                    } else {
                      promiseResolve();
                    }
                  } catch (e) {
                    error(e);
                    promiseReject(e);
                  }
                  break;
                }
                default: {
                  const errMsg = "Unexpected message from the OPFS async worker: " + JSON.stringify(data);
                  error(errMsg);
                  promiseReject(new Error(errMsg));
                  break;
                }
              }
            };
          });
          return thePromise;
        };
        installOpfsVfs.defaultProxyUri = "sqlite3-opfs-async-proxy.js";
        globalThis.sqlite3ApiBootstrap.initializersAsync.push(
          async (sqlite32) => {
            try {
              let proxyJs = installOpfsVfs.defaultProxyUri;
              if (sqlite32.scriptInfo.sqlite3Dir) {
                installOpfsVfs.defaultProxyUri = sqlite32.scriptInfo.sqlite3Dir + proxyJs;
              }
              return installOpfsVfs().catch((e) => {
                sqlite32.config.warn(
                  "Ignoring inability to install OPFS sqlite3_vfs:",
                  e.message
                );
              });
            } catch (e) {
              sqlite32.config.error("installOpfsVfs() exception:", e);
              return Promise.reject(e);
            }
          }
        );
      });
      globalThis.sqlite3ApiBootstrap.initializers.push(function(sqlite3) {
        var _dhVfsRoot, _dhOpaque, _dhVfsParent, _mapSAHToName, _mapFilenameToSAH, _availableSAH, _mapS3FileToOFile_, _apBody, _dvBody, _cVfs, _verbosity, _OpfsSAHPool_instances, logImpl_fn, _p;
        const toss = sqlite3.util.toss;
        const toss3 = sqlite3.util.toss3;
        const initPromises = /* @__PURE__ */ Object.create(null);
        const capi = sqlite3.capi;
        const util = sqlite3.util;
        const wasm = sqlite3.wasm;
        const SECTOR_SIZE = 4096;
        const HEADER_MAX_PATH_SIZE = 512;
        const HEADER_FLAGS_SIZE = 4;
        const HEADER_DIGEST_SIZE = 8;
        const HEADER_CORPUS_SIZE = HEADER_MAX_PATH_SIZE + HEADER_FLAGS_SIZE;
        const HEADER_OFFSET_FLAGS = HEADER_MAX_PATH_SIZE;
        const HEADER_OFFSET_DIGEST = HEADER_CORPUS_SIZE;
        const HEADER_OFFSET_DATA = SECTOR_SIZE;
        const PERSISTENT_FILE_TYPES = capi.SQLITE_OPEN_MAIN_DB | capi.SQLITE_OPEN_MAIN_JOURNAL | capi.SQLITE_OPEN_SUPER_JOURNAL | capi.SQLITE_OPEN_WAL;
        const OPAQUE_DIR_NAME = ".opaque";
        const getRandomName = () => Math.random().toString(36).slice(2);
        const textDecoder = new TextDecoder();
        const textEncoder = new TextEncoder();
        const optionDefaults = Object.assign(/* @__PURE__ */ Object.create(null), {
          name: "opfs-sahpool",
          directory: void 0,
          initialCapacity: 6,
          clearOnInit: false,
          verbosity: 2,
          forceReinitIfPreviouslyFailed: false
        });
        const loggers = [
          sqlite3.config.error,
          sqlite3.config.warn,
          sqlite3.config.log
        ];
        sqlite3.config.log;
        const warn = sqlite3.config.warn;
        sqlite3.config.error;
        const __mapVfsToPool = /* @__PURE__ */ new Map();
        const getPoolForVfs = (pVfs) => __mapVfsToPool.get(pVfs);
        const setPoolForVfs = (pVfs, pool) => {
          if (pool) __mapVfsToPool.set(pVfs, pool);
          else __mapVfsToPool.delete(pVfs);
        };
        const __mapSqlite3File = /* @__PURE__ */ new Map();
        const getPoolForPFile = (pFile) => __mapSqlite3File.get(pFile);
        const setPoolForPFile = (pFile, pool) => {
          if (pool) __mapSqlite3File.set(pFile, pool);
          else __mapSqlite3File.delete(pFile);
        };
        const ioMethods = {
          xCheckReservedLock: function(pFile, pOut) {
            const pool = getPoolForPFile(pFile);
            pool.log("xCheckReservedLock");
            pool.storeErr();
            wasm.poke32(pOut, 1);
            return 0;
          },
          xClose: function(pFile) {
            const pool = getPoolForPFile(pFile);
            pool.storeErr();
            const file = pool.getOFileForS3File(pFile);
            if (file) {
              try {
                pool.log(`xClose ${file.path}`);
                pool.mapS3FileToOFile(pFile, false);
                file.sah.flush();
                if (file.flags & capi.SQLITE_OPEN_DELETEONCLOSE) {
                  pool.deletePath(file.path);
                }
              } catch (e) {
                return pool.storeErr(e, capi.SQLITE_IOERR);
              }
            }
            return 0;
          },
          xDeviceCharacteristics: function(pFile) {
            return capi.SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN;
          },
          xFileControl: function(pFile, opId, pArg) {
            return capi.SQLITE_NOTFOUND;
          },
          xFileSize: function(pFile, pSz64) {
            const pool = getPoolForPFile(pFile);
            pool.log(`xFileSize`);
            const file = pool.getOFileForS3File(pFile);
            const size = file.sah.getSize() - HEADER_OFFSET_DATA;
            wasm.poke64(pSz64, BigInt(size));
            return 0;
          },
          xLock: function(pFile, lockType) {
            const pool = getPoolForPFile(pFile);
            pool.log(`xLock ${lockType}`);
            pool.storeErr();
            const file = pool.getOFileForS3File(pFile);
            file.lockType = lockType;
            return 0;
          },
          xRead: function(pFile, pDest, n, offset64) {
            const pool = getPoolForPFile(pFile);
            pool.storeErr();
            const file = pool.getOFileForS3File(pFile);
            pool.log(`xRead ${file.path} ${n} @ ${offset64}`);
            try {
              const nRead = file.sah.read(
                wasm.heap8u().subarray(pDest, pDest + n),
                { at: HEADER_OFFSET_DATA + Number(offset64) }
              );
              if (nRead < n) {
                wasm.heap8u().fill(0, pDest + nRead, pDest + n);
                return capi.SQLITE_IOERR_SHORT_READ;
              }
              return 0;
            } catch (e) {
              return pool.storeErr(e, capi.SQLITE_IOERR);
            }
          },
          xSectorSize: function(pFile) {
            return SECTOR_SIZE;
          },
          xSync: function(pFile, flags) {
            const pool = getPoolForPFile(pFile);
            pool.log(`xSync ${flags}`);
            pool.storeErr();
            const file = pool.getOFileForS3File(pFile);
            try {
              file.sah.flush();
              return 0;
            } catch (e) {
              return pool.storeErr(e, capi.SQLITE_IOERR);
            }
          },
          xTruncate: function(pFile, sz64) {
            const pool = getPoolForPFile(pFile);
            pool.log(`xTruncate ${sz64}`);
            pool.storeErr();
            const file = pool.getOFileForS3File(pFile);
            try {
              file.sah.truncate(HEADER_OFFSET_DATA + Number(sz64));
              return 0;
            } catch (e) {
              return pool.storeErr(e, capi.SQLITE_IOERR);
            }
          },
          xUnlock: function(pFile, lockType) {
            const pool = getPoolForPFile(pFile);
            pool.log("xUnlock");
            const file = pool.getOFileForS3File(pFile);
            file.lockType = lockType;
            return 0;
          },
          xWrite: function(pFile, pSrc, n, offset64) {
            const pool = getPoolForPFile(pFile);
            pool.storeErr();
            const file = pool.getOFileForS3File(pFile);
            pool.log(`xWrite ${file.path} ${n} ${offset64}`);
            try {
              const nBytes = file.sah.write(
                wasm.heap8u().subarray(pSrc, pSrc + n),
                { at: HEADER_OFFSET_DATA + Number(offset64) }
              );
              return n === nBytes ? 0 : toss("Unknown write() failure.");
            } catch (e) {
              return pool.storeErr(e, capi.SQLITE_IOERR);
            }
          }
        };
        const opfsIoMethods = new capi.sqlite3_io_methods();
        opfsIoMethods.$iVersion = 1;
        sqlite3.vfs.installVfs({
          io: { struct: opfsIoMethods, methods: ioMethods }
        });
        const vfsMethods = {
          xAccess: function(pVfs, zName, flags, pOut) {
            const pool = getPoolForVfs(pVfs);
            pool.storeErr();
            try {
              const name = pool.getPath(zName);
              wasm.poke32(pOut, pool.hasFilename(name) ? 1 : 0);
            } catch (e) {
              wasm.poke32(pOut, 0);
            }
            return 0;
          },
          xCurrentTime: function(pVfs, pOut) {
            wasm.poke(
              pOut,
              24405875e-1 + (/* @__PURE__ */ new Date()).getTime() / 864e5,
              "double"
            );
            return 0;
          },
          xCurrentTimeInt64: function(pVfs, pOut) {
            wasm.poke(pOut, 24405875e-1 * 864e5 + (/* @__PURE__ */ new Date()).getTime(), "i64");
            return 0;
          },
          xDelete: function(pVfs, zName, doSyncDir) {
            const pool = getPoolForVfs(pVfs);
            pool.log(`xDelete ${wasm.cstrToJs(zName)}`);
            pool.storeErr();
            try {
              pool.deletePath(pool.getPath(zName));
              return 0;
            } catch (e) {
              pool.storeErr(e);
              return capi.SQLITE_IOERR_DELETE;
            }
          },
          xFullPathname: function(pVfs, zName, nOut, pOut) {
            const i = wasm.cstrncpy(pOut, zName, nOut);
            return i < nOut ? 0 : capi.SQLITE_CANTOPEN;
          },
          xGetLastError: function(pVfs, nOut, pOut) {
            const pool = getPoolForVfs(pVfs);
            const e = pool.popErr();
            pool.log(`xGetLastError ${nOut} e =`, e);
            if (e) {
              const scope = wasm.scopedAllocPush();
              try {
                const [cMsg, n] = wasm.scopedAllocCString(e.message, true);
                wasm.cstrncpy(pOut, cMsg, nOut);
                if (n > nOut) wasm.poke8(pOut + nOut - 1, 0);
              } catch (e2) {
                return capi.SQLITE_NOMEM;
              } finally {
                wasm.scopedAllocPop(scope);
              }
            }
            return e ? e.sqlite3Rc || capi.SQLITE_IOERR : 0;
          },
          xOpen: function f(pVfs, zName, pFile, flags, pOutFlags) {
            const pool = getPoolForVfs(pVfs);
            try {
              pool.log(`xOpen ${wasm.cstrToJs(zName)} ${flags}`);
              const path = zName && wasm.peek8(zName) ? pool.getPath(zName) : getRandomName();
              let sah = pool.getSAHForPath(path);
              if (!sah && flags & capi.SQLITE_OPEN_CREATE) {
                if (pool.getFileCount() < pool.getCapacity()) {
                  sah = pool.nextAvailableSAH();
                  pool.setAssociatedPath(sah, path, flags);
                } else {
                  toss("SAH pool is full. Cannot create file", path);
                }
              }
              if (!sah) {
                toss("file not found:", path);
              }
              const file = { path, flags, sah };
              pool.mapS3FileToOFile(pFile, file);
              file.lockType = capi.SQLITE_LOCK_NONE;
              const sq3File = new capi.sqlite3_file(pFile);
              sq3File.$pMethods = opfsIoMethods.pointer;
              sq3File.dispose();
              wasm.poke32(pOutFlags, flags);
              return 0;
            } catch (e) {
              pool.storeErr(e);
              return capi.SQLITE_CANTOPEN;
            }
          }
        };
        const createOpfsVfs = function(vfsName) {
          if (sqlite3.capi.sqlite3_vfs_find(vfsName)) {
            toss3("VFS name is already registered:", vfsName);
          }
          const opfsVfs = new capi.sqlite3_vfs();
          const pDVfs = capi.sqlite3_vfs_find(null);
          const dVfs = pDVfs ? new capi.sqlite3_vfs(pDVfs) : null;
          opfsVfs.$iVersion = 2;
          opfsVfs.$szOsFile = capi.sqlite3_file.structInfo.sizeof;
          opfsVfs.$mxPathname = HEADER_MAX_PATH_SIZE;
          opfsVfs.addOnDispose(
            opfsVfs.$zName = wasm.allocCString(vfsName),
            () => setPoolForVfs(opfsVfs.pointer, 0)
          );
          if (dVfs) {
            opfsVfs.$xRandomness = dVfs.$xRandomness;
            opfsVfs.$xSleep = dVfs.$xSleep;
            dVfs.dispose();
          }
          if (!opfsVfs.$xRandomness && !vfsMethods.xRandomness) {
            vfsMethods.xRandomness = function(pVfs, nOut, pOut) {
              const heap = wasm.heap8u();
              let i = 0;
              for (; i < nOut; ++i)
                heap[pOut + i] = Math.random() * 255e3 & 255;
              return i;
            };
          }
          if (!opfsVfs.$xSleep && !vfsMethods.xSleep) {
            vfsMethods.xSleep = (pVfs, ms) => 0;
          }
          sqlite3.vfs.installVfs({
            vfs: { struct: opfsVfs, methods: vfsMethods }
          });
          return opfsVfs;
        };
        class OpfsSAHPool {
          constructor(options = /* @__PURE__ */ Object.create(null)) {
            __privateAdd(this, _OpfsSAHPool_instances);
            __publicField(this, "vfsDir");
            __privateAdd(this, _dhVfsRoot);
            __privateAdd(this, _dhOpaque);
            __privateAdd(this, _dhVfsParent);
            __privateAdd(this, _mapSAHToName, /* @__PURE__ */ new Map());
            __privateAdd(this, _mapFilenameToSAH, /* @__PURE__ */ new Map());
            __privateAdd(this, _availableSAH, /* @__PURE__ */ new Set());
            __privateAdd(this, _mapS3FileToOFile_, /* @__PURE__ */ new Map());
            __privateAdd(this, _apBody, new Uint8Array(HEADER_CORPUS_SIZE));
            __privateAdd(this, _dvBody);
            __privateAdd(this, _cVfs);
            __privateAdd(this, _verbosity);
            __privateSet(this, _verbosity, options.verbosity ?? optionDefaults.verbosity);
            this.vfsName = options.name || optionDefaults.name;
            __privateSet(this, _cVfs, createOpfsVfs(this.vfsName));
            setPoolForVfs(__privateGet(this, _cVfs).pointer, this);
            this.vfsDir = options.directory || "." + this.vfsName;
            __privateSet(this, _dvBody, new DataView(
              __privateGet(this, _apBody).buffer,
              __privateGet(this, _apBody).byteOffset
            ));
            this.isReady = this.reset(
              !!(options.clearOnInit ?? optionDefaults.clearOnInit)
            ).then(() => {
              if (this.$error) throw this.$error;
              return this.getCapacity() ? Promise.resolve(void 0) : this.addCapacity(
                options.initialCapacity || optionDefaults.initialCapacity
              );
            });
          }
          log(...args) {
            __privateMethod(this, _OpfsSAHPool_instances, logImpl_fn).call(this, 2, ...args);
          }
          warn(...args) {
            __privateMethod(this, _OpfsSAHPool_instances, logImpl_fn).call(this, 1, ...args);
          }
          error(...args) {
            __privateMethod(this, _OpfsSAHPool_instances, logImpl_fn).call(this, 0, ...args);
          }
          getVfs() {
            return __privateGet(this, _cVfs);
          }
          getCapacity() {
            return __privateGet(this, _mapSAHToName).size;
          }
          getFileCount() {
            return __privateGet(this, _mapFilenameToSAH).size;
          }
          getFileNames() {
            const rc = [];
            const iter = __privateGet(this, _mapFilenameToSAH).keys();
            for (const n of iter) rc.push(n);
            return rc;
          }
          async addCapacity(n) {
            for (let i = 0; i < n; ++i) {
              const name = getRandomName();
              const h = await __privateGet(this, _dhOpaque).getFileHandle(name, {
                create: true
              });
              const ah = await h.createSyncAccessHandle();
              __privateGet(this, _mapSAHToName).set(ah, name);
              this.setAssociatedPath(ah, "", 0);
            }
            return this.getCapacity();
          }
          async reduceCapacity(n) {
            let nRm = 0;
            for (const ah of Array.from(__privateGet(this, _availableSAH))) {
              if (nRm === n || this.getFileCount() === this.getCapacity()) {
                break;
              }
              const name = __privateGet(this, _mapSAHToName).get(ah);
              ah.close();
              await __privateGet(this, _dhOpaque).removeEntry(name);
              __privateGet(this, _mapSAHToName).delete(ah);
              __privateGet(this, _availableSAH).delete(ah);
              ++nRm;
            }
            return nRm;
          }
          releaseAccessHandles() {
            for (const ah of __privateGet(this, _mapSAHToName).keys()) ah.close();
            __privateGet(this, _mapSAHToName).clear();
            __privateGet(this, _mapFilenameToSAH).clear();
            __privateGet(this, _availableSAH).clear();
          }
          async acquireAccessHandles(clearFiles) {
            const files = [];
            for await (const [name, h] of __privateGet(this, _dhOpaque)) {
              if ("file" === h.kind) {
                files.push([name, h]);
              }
            }
            return Promise.all(
              files.map(async ([name, h]) => {
                try {
                  const ah = await h.createSyncAccessHandle();
                  __privateGet(this, _mapSAHToName).set(ah, name);
                  if (clearFiles) {
                    ah.truncate(HEADER_OFFSET_DATA);
                    this.setAssociatedPath(ah, "", 0);
                  } else {
                    const path = this.getAssociatedPath(ah);
                    if (path) {
                      __privateGet(this, _mapFilenameToSAH).set(path, ah);
                    } else {
                      __privateGet(this, _availableSAH).add(ah);
                    }
                  }
                } catch (e) {
                  this.storeErr(e);
                  this.releaseAccessHandles();
                  throw e;
                }
              })
            );
          }
          getAssociatedPath(sah) {
            sah.read(__privateGet(this, _apBody), { at: 0 });
            const flags = __privateGet(this, _dvBody).getUint32(HEADER_OFFSET_FLAGS);
            if (__privateGet(this, _apBody)[0] && (flags & capi.SQLITE_OPEN_DELETEONCLOSE || (flags & PERSISTENT_FILE_TYPES) === 0)) {
              warn(
                `Removing file with unexpected flags ${flags.toString(16)}`,
                __privateGet(this, _apBody)
              );
              this.setAssociatedPath(sah, "", 0);
              return "";
            }
            const fileDigest = new Uint32Array(HEADER_DIGEST_SIZE / 4);
            sah.read(fileDigest, { at: HEADER_OFFSET_DIGEST });
            const compDigest = this.computeDigest(__privateGet(this, _apBody));
            if (fileDigest.every((v2, i) => v2 === compDigest[i])) {
              const pathBytes = __privateGet(this, _apBody).findIndex((v2) => 0 === v2);
              if (0 === pathBytes) {
                sah.truncate(HEADER_OFFSET_DATA);
              }
              return pathBytes ? textDecoder.decode(__privateGet(this, _apBody).subarray(0, pathBytes)) : "";
            } else {
              warn("Disassociating file with bad digest.");
              this.setAssociatedPath(sah, "", 0);
              return "";
            }
          }
          setAssociatedPath(sah, path, flags) {
            const enc = textEncoder.encodeInto(path, __privateGet(this, _apBody));
            if (HEADER_MAX_PATH_SIZE <= enc.written + 1) {
              toss("Path too long:", path);
            }
            __privateGet(this, _apBody).fill(0, enc.written, HEADER_MAX_PATH_SIZE);
            __privateGet(this, _dvBody).setUint32(HEADER_OFFSET_FLAGS, flags);
            const digest = this.computeDigest(__privateGet(this, _apBody));
            sah.write(__privateGet(this, _apBody), { at: 0 });
            sah.write(digest, { at: HEADER_OFFSET_DIGEST });
            sah.flush();
            if (path) {
              __privateGet(this, _mapFilenameToSAH).set(path, sah);
              __privateGet(this, _availableSAH).delete(sah);
            } else {
              sah.truncate(HEADER_OFFSET_DATA);
              __privateGet(this, _availableSAH).add(sah);
            }
          }
          computeDigest(byteArray) {
            let h1 = 3735928559;
            let h2 = 1103547991;
            for (const v2 of byteArray) {
              h1 = 31 * h1 + v2 * 307;
              h2 = 31 * h2 + v2 * 307;
            }
            return new Uint32Array([h1 >>> 0, h2 >>> 0]);
          }
          async reset(clearFiles) {
            await this.isReady;
            let h = await navigator.storage.getDirectory();
            let prev;
            for (const d of this.vfsDir.split("/")) {
              if (d) {
                prev = h;
                h = await h.getDirectoryHandle(d, { create: true });
              }
            }
            __privateSet(this, _dhVfsRoot, h);
            __privateSet(this, _dhVfsParent, prev);
            __privateSet(this, _dhOpaque, await __privateGet(this, _dhVfsRoot).getDirectoryHandle(
              OPAQUE_DIR_NAME,
              { create: true }
            ));
            this.releaseAccessHandles();
            return this.acquireAccessHandles(clearFiles);
          }
          getPath(arg) {
            if (wasm.isPtr(arg)) arg = wasm.cstrToJs(arg);
            return (arg instanceof URL ? arg : new URL(arg, "file://localhost/")).pathname;
          }
          deletePath(path) {
            const sah = __privateGet(this, _mapFilenameToSAH).get(path);
            if (sah) {
              __privateGet(this, _mapFilenameToSAH).delete(path);
              this.setAssociatedPath(sah, "", 0);
            }
            return !!sah;
          }
          storeErr(e, code) {
            if (e) {
              e.sqlite3Rc = code || capi.SQLITE_IOERR;
              this.error(e);
            }
            this.$error = e;
            return code;
          }
          popErr() {
            const rc = this.$error;
            this.$error = void 0;
            return rc;
          }
          nextAvailableSAH() {
            const [rc] = __privateGet(this, _availableSAH).keys();
            return rc;
          }
          getOFileForS3File(pFile) {
            return __privateGet(this, _mapS3FileToOFile_).get(pFile);
          }
          mapS3FileToOFile(pFile, file) {
            if (file) {
              __privateGet(this, _mapS3FileToOFile_).set(pFile, file);
              setPoolForPFile(pFile, this);
            } else {
              __privateGet(this, _mapS3FileToOFile_).delete(pFile);
              setPoolForPFile(pFile, false);
            }
          }
          hasFilename(name) {
            return __privateGet(this, _mapFilenameToSAH).has(name);
          }
          getSAHForPath(path) {
            return __privateGet(this, _mapFilenameToSAH).get(path);
          }
          async removeVfs() {
            if (!__privateGet(this, _cVfs).pointer || !__privateGet(this, _dhOpaque)) return false;
            capi.sqlite3_vfs_unregister(__privateGet(this, _cVfs).pointer);
            __privateGet(this, _cVfs).dispose();
            delete initPromises[this.vfsName];
            try {
              this.releaseAccessHandles();
              await __privateGet(this, _dhVfsRoot).removeEntry(OPAQUE_DIR_NAME, {
                recursive: true
              });
              __privateSet(this, _dhOpaque, void 0);
              await __privateGet(this, _dhVfsParent).removeEntry(__privateGet(this, _dhVfsRoot).name, {
                recursive: true
              });
              __privateSet(this, _dhVfsRoot, __privateSet(this, _dhVfsParent, void 0));
            } catch (e) {
              sqlite3.config.error(this.vfsName, "removeVfs() failed:", e);
            }
            return true;
          }
          exportFile(name) {
            const sah = __privateGet(this, _mapFilenameToSAH).get(name) || toss("File not found:", name);
            const n = sah.getSize() - HEADER_OFFSET_DATA;
            const b = new Uint8Array(n > 0 ? n : 0);
            if (n > 0) {
              const nRead = sah.read(b, { at: HEADER_OFFSET_DATA });
              if (nRead != n) {
                toss(
                  "Expected to read " + n + " bytes but read " + nRead + "."
                );
              }
            }
            return b;
          }
          async importDbChunked(name, callback) {
            const sah = __privateGet(this, _mapFilenameToSAH).get(name) || this.nextAvailableSAH() || toss("No available handles to import to.");
            sah.truncate(0);
            let nWrote = 0, chunk, checkedHeader = false;
            try {
              while (void 0 !== (chunk = await callback())) {
                if (chunk instanceof ArrayBuffer) chunk = new Uint8Array(chunk);
                if (0 === nWrote && chunk.byteLength >= 15) {
                  util.affirmDbHeader(chunk);
                  checkedHeader = true;
                }
                sah.write(chunk, { at: HEADER_OFFSET_DATA + nWrote });
                nWrote += chunk.byteLength;
              }
              if (nWrote < 512 || 0 !== nWrote % 512) {
                toss(
                  "Input size",
                  nWrote,
                  "is not correct for an SQLite database."
                );
              }
              if (!checkedHeader) {
                const header = new Uint8Array(20);
                sah.read(header, { at: 0 });
                util.affirmDbHeader(header);
              }
              sah.write(new Uint8Array([1, 1]), {
                at: HEADER_OFFSET_DATA + 18
              });
            } catch (e) {
              this.setAssociatedPath(sah, "", 0);
              throw e;
            }
            this.setAssociatedPath(sah, name, capi.SQLITE_OPEN_MAIN_DB);
            return nWrote;
          }
          importDb(name, bytes) {
            if (bytes instanceof ArrayBuffer) bytes = new Uint8Array(bytes);
            else if (bytes instanceof Function)
              return this.importDbChunked(name, bytes);
            const sah = __privateGet(this, _mapFilenameToSAH).get(name) || this.nextAvailableSAH() || toss("No available handles to import to.");
            const n = bytes.byteLength;
            if (n < 512 || n % 512 != 0) {
              toss("Byte array size is invalid for an SQLite db.");
            }
            const header = "SQLite format 3";
            for (let i = 0; i < header.length; ++i) {
              if (header.charCodeAt(i) !== bytes[i]) {
                toss("Input does not contain an SQLite database header.");
              }
            }
            const nWrote = sah.write(bytes, { at: HEADER_OFFSET_DATA });
            if (nWrote != n) {
              this.setAssociatedPath(sah, "", 0);
              toss(
                "Expected to write " + n + " bytes but wrote " + nWrote + "."
              );
            } else {
              sah.write(new Uint8Array([1, 1]), {
                at: HEADER_OFFSET_DATA + 18
              });
              this.setAssociatedPath(sah, name, capi.SQLITE_OPEN_MAIN_DB);
            }
            return nWrote;
          }
        }
        _dhVfsRoot = new WeakMap();
        _dhOpaque = new WeakMap();
        _dhVfsParent = new WeakMap();
        _mapSAHToName = new WeakMap();
        _mapFilenameToSAH = new WeakMap();
        _availableSAH = new WeakMap();
        _mapS3FileToOFile_ = new WeakMap();
        _apBody = new WeakMap();
        _dvBody = new WeakMap();
        _cVfs = new WeakMap();
        _verbosity = new WeakMap();
        _OpfsSAHPool_instances = new WeakSet();
        logImpl_fn = function(level, ...args) {
          if (__privateGet(this, _verbosity) > level)
            loggers[level](this.vfsName + ":", ...args);
        };
        class OpfsSAHPoolUtil {
          constructor(sahPool) {
            __privateAdd(this, _p);
            __privateSet(this, _p, sahPool);
            this.vfsName = sahPool.vfsName;
          }
          async addCapacity(n) {
            return __privateGet(this, _p).addCapacity(n);
          }
          async reduceCapacity(n) {
            return __privateGet(this, _p).reduceCapacity(n);
          }
          getCapacity() {
            return __privateGet(this, _p).getCapacity(__privateGet(this, _p));
          }
          getFileCount() {
            return __privateGet(this, _p).getFileCount();
          }
          getFileNames() {
            return __privateGet(this, _p).getFileNames();
          }
          async reserveMinimumCapacity(min) {
            const c = __privateGet(this, _p).getCapacity();
            return c < min ? __privateGet(this, _p).addCapacity(min - c) : c;
          }
          exportFile(name) {
            return __privateGet(this, _p).exportFile(name);
          }
          importDb(name, bytes) {
            return __privateGet(this, _p).importDb(name, bytes);
          }
          async wipeFiles() {
            return __privateGet(this, _p).reset(true);
          }
          unlink(filename) {
            return __privateGet(this, _p).deletePath(filename);
          }
          async removeVfs() {
            return __privateGet(this, _p).removeVfs();
          }
        }
        _p = new WeakMap();
        const apiVersionCheck = async () => {
          const dh = await navigator.storage.getDirectory();
          const fn = ".opfs-sahpool-sync-check-" + getRandomName();
          const fh = await dh.getFileHandle(fn, { create: true });
          const ah = await fh.createSyncAccessHandle();
          const close = ah.close();
          await close;
          await dh.removeEntry(fn);
          if (close?.then) {
            toss(
              "The local OPFS API is too old for opfs-sahpool:",
              "it has an async FileSystemSyncAccessHandle.close() method."
            );
          }
          return true;
        };
        sqlite3.installOpfsSAHPoolVfs = async function(options = /* @__PURE__ */ Object.create(null)) {
          options = Object.assign(
            /* @__PURE__ */ Object.create(null),
            optionDefaults,
            options || {}
          );
          const vfsName = options.name;
          if (options.$testThrowPhase1) {
            throw options.$testThrowPhase1;
          }
          if (initPromises[vfsName]) {
            try {
              const p = await initPromises[vfsName];
              return p;
            } catch (e) {
              if (options.forceReinitIfPreviouslyFailed) {
                delete initPromises[vfsName];
              } else {
                throw e;
              }
            }
          }
          if (!globalThis.FileSystemHandle || !globalThis.FileSystemDirectoryHandle || !globalThis.FileSystemFileHandle || !globalThis.FileSystemFileHandle.prototype.createSyncAccessHandle || !navigator?.storage?.getDirectory) {
            return initPromises[vfsName] = Promise.reject(
              new Error("Missing required OPFS APIs.")
            );
          }
          return initPromises[vfsName] = apiVersionCheck().then(async function() {
            if (options.$testThrowPhase2) {
              throw options.$testThrowPhase2;
            }
            const thePool = new OpfsSAHPool(options);
            return thePool.isReady.then(async () => {
              const poolUtil = new OpfsSAHPoolUtil(thePool);
              if (sqlite3.oo1) {
                const oo1 = sqlite3.oo1;
                const theVfs = thePool.getVfs();
                const OpfsSAHPoolDb = function(...args) {
                  const opt = oo1.DB.dbCtorHelper.normalizeArgs(...args);
                  opt.vfs = theVfs.$zName;
                  oo1.DB.dbCtorHelper.call(this, opt);
                };
                OpfsSAHPoolDb.prototype = Object.create(oo1.DB.prototype);
                poolUtil.OpfsSAHPoolDb = OpfsSAHPoolDb;
              }
              thePool.log("VFS initialized.");
              return poolUtil;
            }).catch(async (e) => {
              await thePool.removeVfs().catch(() => {
              });
              throw e;
            });
          }).catch((err2) => {
            return initPromises[vfsName] = Promise.reject(err2);
          });
        };
      });
      if ("undefined" !== typeof Module) {
        const SABC = Object.assign(
          /* @__PURE__ */ Object.create(null),
          {
            exports: "undefined" === typeof wasmExports ? Module["asm"] : wasmExports,
            memory: Module.wasmMemory
          },
          globalThis.sqlite3ApiConfig || {}
        );
        globalThis.sqlite3ApiConfig = SABC;
        let sqlite3;
        try {
          sqlite3 = globalThis.sqlite3ApiBootstrap();
        } catch (e) {
          console.error("sqlite3ApiBootstrap() error:", e);
          throw e;
        } finally {
          delete globalThis.sqlite3ApiBootstrap;
          delete globalThis.sqlite3ApiConfig;
        }
        Module.sqlite3 = sqlite3;
      } else {
        console.warn(
          "This is not running in an Emscripten module context, so",
          "globalThis.sqlite3ApiBootstrap() is _not_ being called due to lack",
          "of config info for the WASM environment.",
          "It must be called manually."
        );
      }
    };
    moduleRtn = readyPromise;
    return moduleRtn;
  };
})();
const toExportForESM = function() {
  const originalInit = sqlite3InitModule;
  if (!originalInit) {
    throw new Error(
      "Expecting globalThis.sqlite3InitModule to be defined by the Emscripten build."
    );
  }
  const initModuleState = globalThis.sqlite3InitModuleState = Object.assign(
    /* @__PURE__ */ Object.create(null),
    {
      moduleScript: globalThis?.document?.currentScript,
      isWorker: "undefined" !== typeof WorkerGlobalScope,
      location: globalThis.location,
      urlParams: globalThis?.location?.href ? new URL(globalThis.location.href).searchParams : new URLSearchParams()
    }
  );
  initModuleState.debugModule = initModuleState.urlParams.has(
    "sqlite3.debugModule"
  ) ? (...args) => console.warn("sqlite3.debugModule:", ...args) : () => {
  };
  if (initModuleState.urlParams.has("sqlite3.dir")) {
    initModuleState.sqlite3Dir = initModuleState.urlParams.get("sqlite3.dir") + "/";
  } else if (initModuleState.moduleScript) {
    const li = initModuleState.moduleScript.src.split("/");
    li.pop();
    initModuleState.sqlite3Dir = li.join("/") + "/";
  }
  globalThis.sqlite3InitModule = function ff(...args) {
    return originalInit(...args).then((EmscriptenModule) => {
      EmscriptenModule.runSQLite3PostLoadInit(EmscriptenModule);
      const s = EmscriptenModule.sqlite3;
      s.scriptInfo = initModuleState;
      if (ff.__isUnderTest) s.__isUnderTest = true;
      const f = s.asyncPostInit;
      delete s.asyncPostInit;
      const rv = f();
      return rv;
    }).catch((e) => {
      console.error("Exception loading sqlite3 module:", e);
      throw e;
    });
  };
  globalThis.sqlite3InitModule.ready = originalInit.ready;
  if (globalThis.sqlite3InitModuleState.moduleScript) {
    const sim = globalThis.sqlite3InitModuleState;
    let src = sim.moduleScript.src.split("/");
    src.pop();
    sim.scriptDir = src.join("/") + "/";
  }
  initModuleState.debugModule("sqlite3InitModuleState =", initModuleState);
  return globalThis.sqlite3InitModule;
}();
sqlite3InitModule = toExportForESM;
var sqlite3InitModule$1 = sqlite3InitModule;
globalThis.sqlite3Worker1Promiser = function callee(config = callee.defaultConfig) {
  if (1 === arguments.length && "function" === typeof arguments[0]) {
    const f = config;
    config = Object.assign(/* @__PURE__ */ Object.create(null), callee.defaultConfig);
    config.onready = f;
  } else {
    config = Object.assign(/* @__PURE__ */ Object.create(null), callee.defaultConfig, config);
  }
  const handlerMap = /* @__PURE__ */ Object.create(null);
  const noop2 = function() {
  };
  const err = config.onerror || noop2;
  const debug = config.debug || noop2;
  const idTypeMap = config.generateMessageId ? void 0 : /* @__PURE__ */ Object.create(null);
  const genMsgId = config.generateMessageId || function(msg) {
    return msg.type + "#" + (idTypeMap[msg.type] = (idTypeMap[msg.type] || 0) + 1);
  };
  const toss = (...args) => {
    throw new Error(args.join(" "));
  };
  if (!config.worker) config.worker = callee.defaultConfig.worker;
  if ("function" === typeof config.worker) config.worker = config.worker();
  let dbId;
  let promiserFunc;
  config.worker.onmessage = function(ev) {
    ev = ev.data;
    debug("worker1.onmessage", ev);
    let msgHandler = handlerMap[ev.messageId];
    if (!msgHandler) {
      if (ev && "sqlite3-api" === ev.type && "worker1-ready" === ev.result) {
        if (config.onready) config.onready(promiserFunc);
        return;
      }
      msgHandler = handlerMap[ev.type];
      if (msgHandler && msgHandler.onrow) {
        msgHandler.onrow(ev);
        return;
      }
      if (config.onunhandled) config.onunhandled(arguments[0]);
      else err("sqlite3Worker1Promiser() unhandled worker message:", ev);
      return;
    }
    delete handlerMap[ev.messageId];
    switch (ev.type) {
      case "error":
        msgHandler.reject(ev);
        return;
      case "open":
        if (!dbId) dbId = ev.dbId;
        break;
      case "close":
        if (ev.dbId === dbId) dbId = void 0;
        break;
    }
    try {
      msgHandler.resolve(ev);
    } catch (e) {
      msgHandler.reject(e);
    }
  };
  return promiserFunc = function() {
    let msg;
    if (1 === arguments.length) {
      msg = arguments[0];
    } else if (2 === arguments.length) {
      msg = /* @__PURE__ */ Object.create(null);
      msg.type = arguments[0];
      msg.args = arguments[1];
      msg.dbId = msg.args.dbId;
    } else {
      toss("Invalid arguments for sqlite3Worker1Promiser()-created factory.");
    }
    if (!msg.dbId && msg.type !== "open") msg.dbId = dbId;
    msg.messageId = genMsgId(msg);
    msg.departureTime = performance.now();
    const proxy = /* @__PURE__ */ Object.create(null);
    proxy.message = msg;
    let rowCallbackId;
    if ("exec" === msg.type && msg.args) {
      if ("function" === typeof msg.args.callback) {
        rowCallbackId = msg.messageId + ":row";
        proxy.onrow = msg.args.callback;
        msg.args.callback = rowCallbackId;
        handlerMap[rowCallbackId] = proxy;
      } else if ("string" === typeof msg.args.callback) {
        toss(
          "exec callback may not be a string when using the Promise interface."
        );
      }
    }
    let p = new Promise(function(resolve, reject) {
      proxy.resolve = resolve;
      proxy.reject = reject;
      handlerMap[msg.messageId] = proxy;
      debug(
        "Posting",
        msg.type,
        "message to Worker dbId=" + (dbId || "default") + ":",
        msg
      );
      config.worker.postMessage(msg);
    });
    if (rowCallbackId) p = p.finally(() => delete handlerMap[rowCallbackId]);
    return p;
  };
};
globalThis.sqlite3Worker1Promiser.defaultConfig = {
  worker: function() {
    return new Worker(
      new URL(
        /* @vite-ignore */
        "" + new URL("sqlite3-worker1-bundler-friendly-Czv2wTZj.js", import.meta.url).href,
        import.meta.url
      ),
      {
        type: "module"
      }
    );
  },
  onerror: (...args) => console.error("worker1 promiser error", ...args)
};
sqlite3Worker1Promiser.v2 = function(config) {
  let oldFunc;
  if ("function" == typeof config) {
    oldFunc = config;
    config = {};
  } else if ("function" === typeof config?.onready) {
    oldFunc = config.onready;
    delete config.onready;
  }
  const promiseProxy = /* @__PURE__ */ Object.create(null);
  config = Object.assign(config || /* @__PURE__ */ Object.create(null), {
    onready: async function(func) {
      try {
        if (oldFunc) await oldFunc(func);
        promiseProxy.resolve(func);
      } catch (e) {
        promiseProxy.reject(e);
      }
    }
  });
  const p = new Promise(function(resolve, reject) {
    promiseProxy.resolve = resolve;
    promiseProxy.reject = reject;
  });
  try {
    this.original(config);
  } catch (e) {
    promiseProxy.reject(e);
  }
  return p;
}.bind({
  original: sqlite3Worker1Promiser
});
sqlite3Worker1Promiser.v2;
function isUndefined(obj) {
  return typeof obj === "undefined" || obj === void 0;
}
function isString(obj) {
  return typeof obj === "string";
}
function isNumber(obj) {
  return typeof obj === "number";
}
function isBoolean(obj) {
  return typeof obj === "boolean";
}
function isNull(obj) {
  return obj === null;
}
function isDate(obj) {
  return obj instanceof Date;
}
function isBigInt(obj) {
  return typeof obj === "bigint";
}
function isFunction(obj) {
  return typeof obj === "function";
}
function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}
function freeze(obj) {
  return Object.freeze(obj);
}
function asArray$1(arg) {
  if (isReadonlyArray(arg)) {
    return arg;
  } else {
    return [arg];
  }
}
function isReadonlyArray(arg) {
  return Array.isArray(arg);
}
function noop(obj) {
  return obj;
}
const AlterTableNode = freeze({
  is(node) {
    return node.kind === "AlterTableNode";
  },
  create(table) {
    return freeze({
      kind: "AlterTableNode",
      table
    });
  },
  cloneWithTableProps(node, props) {
    return freeze({
      ...node,
      ...props
    });
  },
  cloneWithColumnAlteration(node, columnAlteration) {
    return freeze({
      ...node,
      columnAlterations: node.columnAlterations ? [...node.columnAlterations, columnAlteration] : [columnAlteration]
    });
  }
});
const IdentifierNode = freeze({
  is(node) {
    return node.kind === "IdentifierNode";
  },
  create(name) {
    return freeze({
      kind: "IdentifierNode",
      name
    });
  }
});
const CreateIndexNode = freeze({
  is(node) {
    return node.kind === "CreateIndexNode";
  },
  create(name) {
    return freeze({
      kind: "CreateIndexNode",
      name: IdentifierNode.create(name)
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  },
  cloneWithColumns(node, columns) {
    return freeze({
      ...node,
      columns: [...node.columns || [], ...columns]
    });
  }
});
const CreateSchemaNode = freeze({
  is(node) {
    return node.kind === "CreateSchemaNode";
  },
  create(schema, params) {
    return freeze({
      kind: "CreateSchemaNode",
      schema: IdentifierNode.create(schema),
      ...params
    });
  },
  cloneWith(createSchema, params) {
    return freeze({
      ...createSchema,
      ...params
    });
  }
});
const ON_COMMIT_ACTIONS = ["preserve rows", "delete rows", "drop"];
const CreateTableNode = freeze({
  is(node) {
    return node.kind === "CreateTableNode";
  },
  create(table) {
    return freeze({
      kind: "CreateTableNode",
      table,
      columns: freeze([])
    });
  },
  cloneWithColumn(createTable2, column2) {
    return freeze({
      ...createTable2,
      columns: freeze([...createTable2.columns, column2])
    });
  },
  cloneWithConstraint(createTable2, constraint) {
    return freeze({
      ...createTable2,
      constraints: createTable2.constraints ? freeze([...createTable2.constraints, constraint]) : freeze([constraint])
    });
  },
  cloneWithFrontModifier(createTable2, modifier) {
    return freeze({
      ...createTable2,
      frontModifiers: createTable2.frontModifiers ? freeze([...createTable2.frontModifiers, modifier]) : freeze([modifier])
    });
  },
  cloneWithEndModifier(createTable2, modifier) {
    return freeze({
      ...createTable2,
      endModifiers: createTable2.endModifiers ? freeze([...createTable2.endModifiers, modifier]) : freeze([modifier])
    });
  },
  cloneWith(createTable2, params) {
    return freeze({
      ...createTable2,
      ...params
    });
  }
});
const SchemableIdentifierNode = freeze({
  is(node) {
    return node.kind === "SchemableIdentifierNode";
  },
  create(identifier) {
    return freeze({
      kind: "SchemableIdentifierNode",
      identifier: IdentifierNode.create(identifier)
    });
  },
  createWithSchema(schema, identifier) {
    return freeze({
      kind: "SchemableIdentifierNode",
      schema: IdentifierNode.create(schema),
      identifier: IdentifierNode.create(identifier)
    });
  }
});
const DropIndexNode = freeze({
  is(node) {
    return node.kind === "DropIndexNode";
  },
  create(name, params) {
    return freeze({
      kind: "DropIndexNode",
      name: SchemableIdentifierNode.create(name),
      ...params
    });
  },
  cloneWith(dropIndex2, props) {
    return freeze({
      ...dropIndex2,
      ...props
    });
  }
});
const DropSchemaNode = freeze({
  is(node) {
    return node.kind === "DropSchemaNode";
  },
  create(schema, params) {
    return freeze({
      kind: "DropSchemaNode",
      schema: IdentifierNode.create(schema),
      ...params
    });
  },
  cloneWith(dropSchema, params) {
    return freeze({
      ...dropSchema,
      ...params
    });
  }
});
const DropTableNode = freeze({
  is(node) {
    return node.kind === "DropTableNode";
  },
  create(table, params) {
    return freeze({
      kind: "DropTableNode",
      table,
      ...params
    });
  },
  cloneWith(dropIndex2, params) {
    return freeze({
      ...dropIndex2,
      ...params
    });
  }
});
const AliasNode = freeze({
  is(node) {
    return node.kind === "AliasNode";
  },
  create(node, alias) {
    return freeze({
      kind: "AliasNode",
      node,
      alias
    });
  }
});
const TableNode = freeze({
  is(node) {
    return node.kind === "TableNode";
  },
  create(table) {
    return freeze({
      kind: "TableNode",
      table: SchemableIdentifierNode.create(table)
    });
  },
  createWithSchema(schema, table) {
    return freeze({
      kind: "TableNode",
      table: SchemableIdentifierNode.createWithSchema(schema, table)
    });
  }
});
function isOperationNodeSource(obj) {
  return isObject(obj) && isFunction(obj.toOperationNode);
}
function isExpression(obj) {
  return isObject(obj) && "expressionType" in obj && isOperationNodeSource(obj);
}
function isAliasedExpression(obj) {
  return isObject(obj) && "expression" in obj && isString(obj.alias) && isOperationNodeSource(obj);
}
const SelectModifierNode = freeze({
  is(node) {
    return node.kind === "SelectModifierNode";
  },
  create(modifier, of) {
    return freeze({
      kind: "SelectModifierNode",
      modifier,
      of
    });
  },
  createWithExpression(modifier) {
    return freeze({
      kind: "SelectModifierNode",
      rawModifier: modifier
    });
  }
});
const AndNode = freeze({
  is(node) {
    return node.kind === "AndNode";
  },
  create(left, right) {
    return freeze({
      kind: "AndNode",
      left,
      right
    });
  }
});
const OrNode = freeze({
  is(node) {
    return node.kind === "OrNode";
  },
  create(left, right) {
    return freeze({
      kind: "OrNode",
      left,
      right
    });
  }
});
const OnNode = freeze({
  is(node) {
    return node.kind === "OnNode";
  },
  create(filter) {
    return freeze({
      kind: "OnNode",
      on: filter
    });
  },
  cloneWithOperation(onNode, operator, operation) {
    return freeze({
      ...onNode,
      on: operator === "And" ? AndNode.create(onNode.on, operation) : OrNode.create(onNode.on, operation)
    });
  }
});
const JoinNode = freeze({
  is(node) {
    return node.kind === "JoinNode";
  },
  create(joinType, table) {
    return freeze({
      kind: "JoinNode",
      joinType,
      table,
      on: void 0
    });
  },
  createWithOn(joinType, table, on) {
    return freeze({
      kind: "JoinNode",
      joinType,
      table,
      on: OnNode.create(on)
    });
  },
  cloneWithOn(joinNode, operation) {
    return freeze({
      ...joinNode,
      on: joinNode.on ? OnNode.cloneWithOperation(joinNode.on, "And", operation) : OnNode.create(operation)
    });
  }
});
const BinaryOperationNode = freeze({
  is(node) {
    return node.kind === "BinaryOperationNode";
  },
  create(leftOperand, operator, rightOperand) {
    return freeze({
      kind: "BinaryOperationNode",
      leftOperand,
      operator,
      rightOperand
    });
  }
});
const COMPARISON_OPERATORS = [
  "=",
  "==",
  "!=",
  "<>",
  ">",
  ">=",
  "<",
  "<=",
  "in",
  "not in",
  "is",
  "is not",
  "like",
  "not like",
  "match",
  "ilike",
  "not ilike",
  "@>",
  "<@",
  "^@",
  "&&",
  "?",
  "?&",
  "?|",
  "!<",
  "!>",
  "<=>",
  "!~",
  "~",
  "~*",
  "!~*",
  "@@",
  "@@@",
  "!!",
  "<->",
  "regexp",
  "is distinct from",
  "is not distinct from"
];
const ARITHMETIC_OPERATORS = [
  "+",
  "-",
  "*",
  "/",
  "%",
  "^",
  "&",
  "|",
  "#",
  "<<",
  ">>"
];
const JSON_OPERATORS = ["->", "->>"];
const BINARY_OPERATORS = [
  ...COMPARISON_OPERATORS,
  ...ARITHMETIC_OPERATORS,
  "&&",
  "||"
];
const UNARY_FILTER_OPERATORS = ["exists", "not exists"];
const UNARY_OPERATORS = ["not", "-", ...UNARY_FILTER_OPERATORS];
const OPERATORS = [
  ...BINARY_OPERATORS,
  ...JSON_OPERATORS,
  ...UNARY_OPERATORS,
  "between",
  "between symmetric"
];
const OperatorNode = freeze({
  is(node) {
    return node.kind === "OperatorNode";
  },
  create(operator) {
    return freeze({
      kind: "OperatorNode",
      operator
    });
  }
});
function isJSONOperator(op) {
  return isString(op) && JSON_OPERATORS.includes(op);
}
const ColumnNode = freeze({
  is(node) {
    return node.kind === "ColumnNode";
  },
  create(column2) {
    return freeze({
      kind: "ColumnNode",
      column: IdentifierNode.create(column2)
    });
  }
});
const SelectAllNode = freeze({
  is(node) {
    return node.kind === "SelectAllNode";
  },
  create() {
    return freeze({
      kind: "SelectAllNode"
    });
  }
});
const ReferenceNode = freeze({
  is(node) {
    return node.kind === "ReferenceNode";
  },
  create(column2, table) {
    return freeze({
      kind: "ReferenceNode",
      table,
      column: column2
    });
  },
  createSelectAll(table) {
    return freeze({
      kind: "ReferenceNode",
      table,
      column: SelectAllNode.create()
    });
  }
});
class DynamicReferenceBuilder {
  constructor(reference) {
    __privateAdd(this, _dynamicReference);
    __privateSet(this, _dynamicReference, reference);
  }
  get dynamicReference() {
    return __privateGet(this, _dynamicReference);
  }
  /**
   * @private
   *
   * This needs to be here just so that the typings work. Without this
   * the generated .d.ts file contains no reference to the type param R
   * which causes this type to be equal to DynamicReferenceBuilder with
   * any R.
   */
  get refType() {
    return void 0;
  }
  toOperationNode() {
    return parseSimpleReferenceExpression(__privateGet(this, _dynamicReference));
  }
}
_dynamicReference = new WeakMap();
function isDynamicReferenceBuilder(obj) {
  return isObject(obj) && isOperationNodeSource(obj) && isString(obj.dynamicReference);
}
const OrderByItemNode = freeze({
  is(node) {
    return node.kind === "OrderByItemNode";
  },
  create(orderBy, direction) {
    return freeze({
      kind: "OrderByItemNode",
      orderBy,
      direction
    });
  }
});
const RawNode = freeze({
  is(node) {
    return node.kind === "RawNode";
  },
  create(sqlFragments, parameters) {
    return freeze({
      kind: "RawNode",
      sqlFragments: freeze(sqlFragments),
      parameters: freeze(parameters)
    });
  },
  createWithSql(sql2) {
    return RawNode.create([sql2], []);
  },
  createWithChild(child) {
    return RawNode.create(["", ""], [child]);
  },
  createWithChildren(children) {
    return RawNode.create(new Array(children.length + 1).fill(""), children);
  }
});
function isOrderByDirection(thing) {
  return thing === "asc" || thing === "desc";
}
function parseOrderBy(args) {
  if (args.length === 2) {
    return [parseOrderByItem(args[0], args[1])];
  }
  if (args.length === 1) {
    const [orderBy] = args;
    if (Array.isArray(orderBy)) {
      return orderBy.map((item) => parseOrderByItem(item));
    }
    return [parseOrderByItem(orderBy)];
  }
  throw new Error(`Invalid number of arguments at order by! expected 1-2, received ${args.length}`);
}
function parseOrderByItem(ref, direction) {
  const parsedRef = parseOrderByExpression(ref);
  if (OrderByItemNode.is(parsedRef)) {
    if (direction) {
      throw new Error("Cannot specify direction twice!");
    }
    return parsedRef;
  }
  return OrderByItemNode.create(parsedRef, parseOrderByDirectionExpression(direction));
}
function parseOrderByExpression(expr) {
  if (isExpressionOrFactory(expr)) {
    return parseExpression(expr);
  }
  if (isDynamicReferenceBuilder(expr)) {
    return expr.toOperationNode();
  }
  const [ref, direction] = expr.split(" ");
  if (direction) {
    if (!isOrderByDirection(direction)) {
      throw new Error(`Invalid order by direction: ${direction}`);
    }
    return OrderByItemNode.create(parseStringReference(ref), parseOrderByDirectionExpression(direction));
  }
  return parseStringReference(expr);
}
function parseOrderByDirectionExpression(expr) {
  if (!expr) {
    return void 0;
  }
  if (expr === "asc" || expr === "desc") {
    return RawNode.createWithSql(expr);
  }
  return expr.toOperationNode();
}
const JSONReferenceNode = freeze({
  is(node) {
    return node.kind === "JSONReferenceNode";
  },
  create(reference, traversal) {
    return freeze({
      kind: "JSONReferenceNode",
      reference,
      traversal
    });
  },
  cloneWithTraversal(node, traversal) {
    return freeze({
      ...node,
      traversal
    });
  }
});
const JSONOperatorChainNode = freeze({
  is(node) {
    return node.kind === "JSONOperatorChainNode";
  },
  create(operator) {
    return freeze({
      kind: "JSONOperatorChainNode",
      operator,
      values: freeze([])
    });
  },
  cloneWithValue(node, value) {
    return freeze({
      ...node,
      values: freeze([...node.values, value])
    });
  }
});
const JSONPathNode = freeze({
  is(node) {
    return node.kind === "JSONPathNode";
  },
  create(inOperator) {
    return freeze({
      kind: "JSONPathNode",
      inOperator,
      pathLegs: freeze([])
    });
  },
  cloneWithLeg(jsonPathNode, pathLeg) {
    return freeze({
      ...jsonPathNode,
      pathLegs: freeze([...jsonPathNode.pathLegs, pathLeg])
    });
  }
});
function parseSimpleReferenceExpression(exp) {
  if (isString(exp)) {
    return parseStringReference(exp);
  }
  return exp.toOperationNode();
}
function parseReferenceExpressionOrList(arg) {
  if (isReadonlyArray(arg)) {
    return arg.map((it) => parseReferenceExpression(it));
  } else {
    return [parseReferenceExpression(arg)];
  }
}
function parseReferenceExpression(exp) {
  if (isExpressionOrFactory(exp)) {
    return parseExpression(exp);
  }
  return parseSimpleReferenceExpression(exp);
}
function parseJSONReference(ref, op) {
  const referenceNode = parseStringReference(ref);
  if (isJSONOperator(op)) {
    return JSONReferenceNode.create(referenceNode, JSONOperatorChainNode.create(OperatorNode.create(op)));
  }
  const opWithoutLastChar = op.slice(0, -1);
  if (isJSONOperator(opWithoutLastChar)) {
    return JSONReferenceNode.create(referenceNode, JSONPathNode.create(OperatorNode.create(opWithoutLastChar)));
  }
  throw new Error(`Invalid JSON operator: ${op}`);
}
function parseStringReference(ref) {
  const COLUMN_SEPARATOR = ".";
  if (!ref.includes(COLUMN_SEPARATOR)) {
    return ReferenceNode.create(ColumnNode.create(ref));
  }
  const parts = ref.split(COLUMN_SEPARATOR).map(trim$2);
  if (parts.length === 3) {
    return parseStringReferenceWithTableAndSchema(parts);
  }
  if (parts.length === 2) {
    return parseStringReferenceWithTable(parts);
  }
  throw new Error(`invalid column reference ${ref}`);
}
function parseAliasedStringReference(ref) {
  const ALIAS_SEPARATOR = " as ";
  if (ref.includes(ALIAS_SEPARATOR)) {
    const [columnRef, alias] = ref.split(ALIAS_SEPARATOR).map(trim$2);
    return AliasNode.create(parseStringReference(columnRef), IdentifierNode.create(alias));
  } else {
    return parseStringReference(ref);
  }
}
function parseColumnName(column2) {
  return ColumnNode.create(column2);
}
function parseOrderedColumnName(column2) {
  const ORDER_SEPARATOR = " ";
  if (column2.includes(ORDER_SEPARATOR)) {
    const [columnName, order] = column2.split(ORDER_SEPARATOR).map(trim$2);
    if (!isOrderByDirection(order)) {
      throw new Error(`invalid order direction "${order}" next to "${columnName}"`);
    }
    return parseOrderBy([columnName, order])[0];
  } else {
    return parseColumnName(column2);
  }
}
function parseStringReferenceWithTableAndSchema(parts) {
  const [schema, table, column2] = parts;
  return ReferenceNode.create(ColumnNode.create(column2), TableNode.createWithSchema(schema, table));
}
function parseStringReferenceWithTable(parts) {
  const [table, column2] = parts;
  return ReferenceNode.create(ColumnNode.create(column2), TableNode.create(table));
}
function trim$2(str) {
  return str.trim();
}
const PrimitiveValueListNode = freeze({
  is(node) {
    return node.kind === "PrimitiveValueListNode";
  },
  create(values) {
    return freeze({
      kind: "PrimitiveValueListNode",
      values: freeze([...values])
    });
  }
});
const ValueListNode = freeze({
  is(node) {
    return node.kind === "ValueListNode";
  },
  create(values) {
    return freeze({
      kind: "ValueListNode",
      values: freeze(values)
    });
  }
});
const ValueNode = freeze({
  is(node) {
    return node.kind === "ValueNode";
  },
  create(value) {
    return freeze({
      kind: "ValueNode",
      value
    });
  },
  createImmediate(value) {
    return freeze({
      kind: "ValueNode",
      value,
      immediate: true
    });
  }
});
function parseValueExpressionOrList(arg) {
  if (isReadonlyArray(arg)) {
    return parseValueExpressionList(arg);
  }
  return parseValueExpression(arg);
}
function parseValueExpression(exp) {
  if (isExpressionOrFactory(exp)) {
    return parseExpression(exp);
  }
  return ValueNode.create(exp);
}
function isSafeImmediateValue(value) {
  return isNumber(value) || isBoolean(value) || isNull(value);
}
function parseSafeImmediateValue(value) {
  if (!isSafeImmediateValue(value)) {
    throw new Error(`unsafe immediate value ${JSON.stringify(value)}`);
  }
  return ValueNode.createImmediate(value);
}
function parseValueExpressionList(arg) {
  if (arg.some(isExpressionOrFactory)) {
    return ValueListNode.create(arg.map((it) => parseValueExpression(it)));
  }
  return PrimitiveValueListNode.create(arg);
}
const ParensNode = freeze({
  is(node) {
    return node.kind === "ParensNode";
  },
  create(node) {
    return freeze({
      kind: "ParensNode",
      node
    });
  }
});
function parseValueBinaryOperationOrExpression(args) {
  if (args.length === 3) {
    return parseValueBinaryOperation(args[0], args[1], args[2]);
  } else if (args.length === 1) {
    return parseValueExpression(args[0]);
  }
  throw new Error(`invalid arguments: ${JSON.stringify(args)}`);
}
function parseValueBinaryOperation(left, operator, right) {
  if (isIsOperator(operator) && needsIsOperator(right)) {
    return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), ValueNode.createImmediate(right));
  }
  return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), parseValueExpressionOrList(right));
}
function parseReferentialBinaryOperation(left, operator, right) {
  return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), parseReferenceExpression(right));
}
function parseFilterObject(obj, combinator) {
  return parseFilterList(Object.entries(obj).filter(([, v2]) => !isUndefined(v2)).map(([k, v2]) => parseValueBinaryOperation(k, needsIsOperator(v2) ? "is" : "=", v2)), combinator);
}
function parseFilterList(list, combinator, withParens = true) {
  const combine = combinator === "and" ? AndNode.create : OrNode.create;
  if (list.length === 0) {
    return BinaryOperationNode.create(ValueNode.createImmediate(1), OperatorNode.create("="), ValueNode.createImmediate(combinator === "and" ? 1 : 0));
  }
  let node = toOperationNode(list[0]);
  for (let i = 1; i < list.length; ++i) {
    node = combine(node, toOperationNode(list[i]));
  }
  if (list.length > 1 && withParens) {
    return ParensNode.create(node);
  }
  return node;
}
function isIsOperator(operator) {
  return operator === "is" || operator === "is not";
}
function needsIsOperator(value) {
  return isNull(value) || isBoolean(value);
}
function parseOperator(operator) {
  if (isString(operator) && OPERATORS.includes(operator)) {
    return OperatorNode.create(operator);
  }
  if (isOperationNodeSource(operator)) {
    return operator.toOperationNode();
  }
  throw new Error(`invalid operator ${JSON.stringify(operator)}`);
}
function toOperationNode(nodeOrSource) {
  return isOperationNodeSource(nodeOrSource) ? nodeOrSource.toOperationNode() : nodeOrSource;
}
const OrderByNode = freeze({
  is(node) {
    return node.kind === "OrderByNode";
  },
  create(items) {
    return freeze({
      kind: "OrderByNode",
      items: freeze([...items])
    });
  },
  cloneWithItems(orderBy, items) {
    return freeze({
      ...orderBy,
      items: freeze([...orderBy.items, ...items])
    });
  }
});
const PartitionByNode = freeze({
  is(node) {
    return node.kind === "PartitionByNode";
  },
  create(items) {
    return freeze({
      kind: "PartitionByNode",
      items: freeze(items)
    });
  },
  cloneWithItems(partitionBy, items) {
    return freeze({
      ...partitionBy,
      items: freeze([...partitionBy.items, ...items])
    });
  }
});
const OverNode = freeze({
  is(node) {
    return node.kind === "OverNode";
  },
  create() {
    return freeze({
      kind: "OverNode"
    });
  },
  cloneWithOrderByItems(overNode, items) {
    return freeze({
      ...overNode,
      orderBy: overNode.orderBy ? OrderByNode.cloneWithItems(overNode.orderBy, items) : OrderByNode.create(items)
    });
  },
  cloneWithPartitionByItems(overNode, items) {
    return freeze({
      ...overNode,
      partitionBy: overNode.partitionBy ? PartitionByNode.cloneWithItems(overNode.partitionBy, items) : PartitionByNode.create(items)
    });
  }
});
const FromNode = freeze({
  is(node) {
    return node.kind === "FromNode";
  },
  create(froms) {
    return freeze({
      kind: "FromNode",
      froms: freeze(froms)
    });
  },
  cloneWithFroms(from, froms) {
    return freeze({
      ...from,
      froms: freeze([...from.froms, ...froms])
    });
  }
});
const GroupByNode = freeze({
  is(node) {
    return node.kind === "GroupByNode";
  },
  create(items) {
    return freeze({
      kind: "GroupByNode",
      items: freeze(items)
    });
  },
  cloneWithItems(groupBy, items) {
    return freeze({
      ...groupBy,
      items: freeze([...groupBy.items, ...items])
    });
  }
});
const HavingNode = freeze({
  is(node) {
    return node.kind === "HavingNode";
  },
  create(filter) {
    return freeze({
      kind: "HavingNode",
      having: filter
    });
  },
  cloneWithOperation(havingNode, operator, operation) {
    return freeze({
      ...havingNode,
      having: operator === "And" ? AndNode.create(havingNode.having, operation) : OrNode.create(havingNode.having, operation)
    });
  }
});
const SelectQueryNode = freeze({
  is(node) {
    return node.kind === "SelectQueryNode";
  },
  create(withNode) {
    return freeze({
      kind: "SelectQueryNode",
      ...withNode && { with: withNode }
    });
  },
  createFrom(fromItems, withNode) {
    return freeze({
      kind: "SelectQueryNode",
      from: FromNode.create(fromItems),
      ...withNode && { with: withNode }
    });
  },
  cloneWithSelections(select, selections) {
    return freeze({
      ...select,
      selections: select.selections ? freeze([...select.selections, ...selections]) : freeze(selections)
    });
  },
  cloneWithDistinctOn(select, expressions) {
    return freeze({
      ...select,
      distinctOn: select.distinctOn ? freeze([...select.distinctOn, ...expressions]) : freeze(expressions)
    });
  },
  cloneWithFrontModifier(select, modifier) {
    return freeze({
      ...select,
      frontModifiers: select.frontModifiers ? freeze([...select.frontModifiers, modifier]) : freeze([modifier])
    });
  },
  cloneWithOrderByItems(selectNode, items) {
    return freeze({
      ...selectNode,
      orderBy: selectNode.orderBy ? OrderByNode.cloneWithItems(selectNode.orderBy, items) : OrderByNode.create(items)
    });
  },
  cloneWithGroupByItems(selectNode, items) {
    return freeze({
      ...selectNode,
      groupBy: selectNode.groupBy ? GroupByNode.cloneWithItems(selectNode.groupBy, items) : GroupByNode.create(items)
    });
  },
  cloneWithLimit(selectNode, limit) {
    return freeze({
      ...selectNode,
      limit
    });
  },
  cloneWithOffset(selectNode, offset) {
    return freeze({
      ...selectNode,
      offset
    });
  },
  cloneWithFetch(selectNode, fetch2) {
    return freeze({
      ...selectNode,
      fetch: fetch2
    });
  },
  cloneWithHaving(selectNode, operation) {
    return freeze({
      ...selectNode,
      having: selectNode.having ? HavingNode.cloneWithOperation(selectNode.having, "And", operation) : HavingNode.create(operation)
    });
  },
  cloneWithSetOperations(selectNode, setOperations) {
    return freeze({
      ...selectNode,
      setOperations: selectNode.setOperations ? freeze([...selectNode.setOperations, ...setOperations]) : freeze([...setOperations])
    });
  },
  cloneWithoutSelections(select) {
    return freeze({
      ...select,
      selections: []
    });
  },
  cloneWithoutLimit(select) {
    return freeze({
      ...select,
      limit: void 0
    });
  },
  cloneWithoutOffset(select) {
    return freeze({
      ...select,
      offset: void 0
    });
  },
  cloneWithoutOrderBy(select) {
    return freeze({
      ...select,
      orderBy: void 0
    });
  },
  cloneWithoutGroupBy(select) {
    return freeze({
      ...select,
      groupBy: void 0
    });
  }
});
function preventAwait(clazz, message) {
  Object.defineProperties(clazz.prototype, {
    then: {
      enumerable: false,
      value: () => {
        throw new Error(message);
      }
    }
  });
}
const _JoinBuilder = class _JoinBuilder {
  constructor(props) {
    __privateAdd(this, _props);
    __privateSet(this, _props, freeze(props));
  }
  on(...args) {
    return new _JoinBuilder({
      ...__privateGet(this, _props),
      joinNode: JoinNode.cloneWithOn(__privateGet(this, _props).joinNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  /**
   * Just like {@link WhereInterface.whereRef} but adds an item to the join's
   * `on` clause instead.
   *
   * See {@link WhereInterface.whereRef} for documentation and examples.
   */
  onRef(lhs, op, rhs) {
    return new _JoinBuilder({
      ...__privateGet(this, _props),
      joinNode: JoinNode.cloneWithOn(__privateGet(this, _props).joinNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  /**
   * Adds `on true`.
   */
  onTrue() {
    return new _JoinBuilder({
      ...__privateGet(this, _props),
      joinNode: JoinNode.cloneWithOn(__privateGet(this, _props).joinNode, RawNode.createWithSql("true"))
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _props).joinNode;
  }
};
_props = new WeakMap();
let JoinBuilder = _JoinBuilder;
preventAwait(JoinBuilder, "don't await JoinBuilder instances. They are never executed directly and are always just a part of a query.");
const PartitionByItemNode = freeze({
  is(node) {
    return node.kind === "PartitionByItemNode";
  },
  create(partitionBy) {
    return freeze({
      kind: "PartitionByItemNode",
      partitionBy
    });
  }
});
function parsePartitionBy(partitionBy) {
  return parseReferenceExpressionOrList(partitionBy).map(PartitionByItemNode.create);
}
const _OverBuilder = class _OverBuilder {
  constructor(props) {
    __privateAdd(this, _props2);
    __privateSet(this, _props2, freeze(props));
  }
  /**
   * Adds an order by clause item inside the over function.
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select(
   *     (eb) => eb.fn.avg<number>('age').over(
   *       ob => ob.orderBy('first_name', 'asc').orderBy('last_name', 'asc')
   *     ).as('average_age')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select avg("age") over(order by "first_name" asc, "last_name" asc) as "average_age"
   * from "person"
   * ```
   */
  orderBy(orderBy, direction) {
    return new _OverBuilder({
      overNode: OverNode.cloneWithOrderByItems(__privateGet(this, _props2).overNode, parseOrderBy([orderBy, direction]))
    });
  }
  partitionBy(partitionBy) {
    return new _OverBuilder({
      overNode: OverNode.cloneWithPartitionByItems(__privateGet(this, _props2).overNode, parsePartitionBy(partitionBy))
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _props2).overNode;
  }
};
_props2 = new WeakMap();
let OverBuilder = _OverBuilder;
preventAwait(OverBuilder, "don't await OverBuilder instances. They are never executed directly and are always just a part of a query.");
const SelectionNode = freeze({
  is(node) {
    return node.kind === "SelectionNode";
  },
  create(selection) {
    return freeze({
      kind: "SelectionNode",
      selection
    });
  },
  createSelectAll() {
    return freeze({
      kind: "SelectionNode",
      selection: SelectAllNode.create()
    });
  },
  createSelectAllFromTable(table) {
    return freeze({
      kind: "SelectionNode",
      selection: ReferenceNode.createSelectAll(table)
    });
  }
});
function parseSelectArg(selection) {
  if (isFunction(selection)) {
    return parseSelectArg(selection(expressionBuilder()));
  } else if (isReadonlyArray(selection)) {
    return selection.map((it) => parseSelectExpression(it));
  } else {
    return [parseSelectExpression(selection)];
  }
}
function parseSelectExpression(selection) {
  if (isString(selection)) {
    return SelectionNode.create(parseAliasedStringReference(selection));
  } else if (isDynamicReferenceBuilder(selection)) {
    return SelectionNode.create(selection.toOperationNode());
  } else {
    return SelectionNode.create(parseAliasedExpression(selection));
  }
}
function parseSelectAll(table) {
  if (!table) {
    return [SelectionNode.createSelectAll()];
  } else if (Array.isArray(table)) {
    return table.map(parseSelectAllArg);
  } else {
    return [parseSelectAllArg(table)];
  }
}
function parseSelectAllArg(table) {
  if (isString(table)) {
    return SelectionNode.createSelectAllFromTable(parseTable$1(table));
  }
  throw new Error(`invalid value selectAll expression: ${JSON.stringify(table)}`);
}
const ValuesNode = freeze({
  is(node) {
    return node.kind === "ValuesNode";
  },
  create(values) {
    return freeze({
      kind: "ValuesNode",
      values: freeze(values)
    });
  }
});
const DefaultInsertValueNode = freeze({
  is(node) {
    return node.kind === "DefaultInsertValueNode";
  },
  create() {
    return freeze({
      kind: "DefaultInsertValueNode"
    });
  }
});
function parseInsertExpression(arg) {
  const objectOrList = isFunction(arg) ? arg(expressionBuilder()) : arg;
  const list = isReadonlyArray(objectOrList) ? objectOrList : freeze([objectOrList]);
  return parseInsertColumnsAndValues(list);
}
function parseInsertColumnsAndValues(rows) {
  const columns = parseColumnNamesAndIndexes(rows);
  return [
    freeze([...columns.keys()].map(ColumnNode.create)),
    ValuesNode.create(rows.map((row) => parseRowValues(row, columns)))
  ];
}
function parseColumnNamesAndIndexes(rows) {
  const columns = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const cols = Object.keys(row);
    for (const col of cols) {
      if (!columns.has(col) && row[col] !== void 0) {
        columns.set(col, columns.size);
      }
    }
  }
  return columns;
}
function parseRowValues(row, columns) {
  const rowColumns = Object.keys(row);
  const rowValues = Array.from({
    length: columns.size
  });
  let hasUndefinedOrComplexColumns = false;
  for (const col of rowColumns) {
    const columnIdx = columns.get(col);
    if (isUndefined(columnIdx)) {
      continue;
    }
    const value = row[col];
    if (isUndefined(value) || isExpressionOrFactory(value)) {
      hasUndefinedOrComplexColumns = true;
    }
    rowValues[columnIdx] = value;
  }
  const hasMissingColumns = rowColumns.length < columns.size;
  if (hasMissingColumns || hasUndefinedOrComplexColumns) {
    const defaultValue = DefaultInsertValueNode.create();
    return ValueListNode.create(rowValues.map((it) => isUndefined(it) ? defaultValue : parseValueExpression(it)));
  }
  return PrimitiveValueListNode.create(rowValues);
}
const InsertQueryNode = freeze({
  is(node) {
    return node.kind === "InsertQueryNode";
  },
  create(into, withNode, replace) {
    return freeze({
      kind: "InsertQueryNode",
      into,
      ...withNode && { with: withNode },
      replace
    });
  },
  createWithoutInto() {
    return freeze({
      kind: "InsertQueryNode"
    });
  },
  cloneWith(insertQuery, props) {
    return freeze({
      ...insertQuery,
      ...props
    });
  }
});
const UpdateQueryNode = freeze({
  is(node) {
    return node.kind === "UpdateQueryNode";
  },
  create(table, withNode) {
    return freeze({
      kind: "UpdateQueryNode",
      table,
      ...withNode && { with: withNode }
    });
  },
  createWithoutTable() {
    return freeze({
      kind: "UpdateQueryNode"
    });
  },
  cloneWithFromItems(updateQuery, fromItems) {
    return freeze({
      ...updateQuery,
      from: updateQuery.from ? FromNode.cloneWithFroms(updateQuery.from, fromItems) : FromNode.create(fromItems)
    });
  },
  cloneWithUpdates(updateQuery, updates) {
    return freeze({
      ...updateQuery,
      updates: updateQuery.updates ? freeze([...updateQuery.updates, ...updates]) : updates
    });
  },
  cloneWithLimit(updateQuery, limit) {
    return freeze({
      ...updateQuery,
      limit
    });
  }
});
const UsingNode = freeze({
  is(node) {
    return node.kind === "UsingNode";
  },
  create(tables2) {
    return freeze({
      kind: "UsingNode",
      tables: freeze(tables2)
    });
  },
  cloneWithTables(using, tables2) {
    return freeze({
      ...using,
      tables: freeze([...using.tables, ...tables2])
    });
  }
});
const DeleteQueryNode = freeze({
  is(node) {
    return node.kind === "DeleteQueryNode";
  },
  create(fromItems, withNode) {
    return freeze({
      kind: "DeleteQueryNode",
      from: FromNode.create(fromItems),
      ...withNode && { with: withNode }
    });
  },
  cloneWithOrderByItems(deleteNode, items) {
    return freeze({
      ...deleteNode,
      orderBy: deleteNode.orderBy ? OrderByNode.cloneWithItems(deleteNode.orderBy, items) : OrderByNode.create(items)
    });
  },
  cloneWithoutOrderBy(deleteNode) {
    return freeze({
      ...deleteNode,
      orderBy: void 0
    });
  },
  cloneWithLimit(deleteNode, limit) {
    return freeze({
      ...deleteNode,
      limit
    });
  },
  cloneWithoutLimit(deleteNode) {
    return freeze({
      ...deleteNode,
      limit: void 0
    });
  },
  cloneWithUsing(deleteNode, tables2) {
    return freeze({
      ...deleteNode,
      using: deleteNode.using !== void 0 ? UsingNode.cloneWithTables(deleteNode.using, tables2) : UsingNode.create(tables2)
    });
  }
});
const WhereNode = freeze({
  is(node) {
    return node.kind === "WhereNode";
  },
  create(filter) {
    return freeze({
      kind: "WhereNode",
      where: filter
    });
  },
  cloneWithOperation(whereNode, operator, operation) {
    return freeze({
      ...whereNode,
      where: operator === "And" ? AndNode.create(whereNode.where, operation) : OrNode.create(whereNode.where, operation)
    });
  }
});
const ReturningNode = freeze({
  is(node) {
    return node.kind === "ReturningNode";
  },
  create(selections) {
    return freeze({
      kind: "ReturningNode",
      selections: freeze(selections)
    });
  },
  cloneWithSelections(returning, selections) {
    return freeze({
      ...returning,
      selections: returning.selections ? freeze([...returning.selections, ...selections]) : freeze(selections)
    });
  }
});
const ExplainNode = freeze({
  is(node) {
    return node.kind === "ExplainNode";
  },
  create(format, options) {
    return freeze({
      kind: "ExplainNode",
      format,
      options
    });
  }
});
const WhenNode = freeze({
  is(node) {
    return node.kind === "WhenNode";
  },
  create(condition) {
    return freeze({
      kind: "WhenNode",
      condition
    });
  },
  cloneWithResult(whenNode, result) {
    return freeze({
      ...whenNode,
      result
    });
  }
});
const MergeQueryNode = freeze({
  is(node) {
    return node.kind === "MergeQueryNode";
  },
  create(into, withNode) {
    return freeze({
      kind: "MergeQueryNode",
      into,
      ...withNode && { with: withNode }
    });
  },
  cloneWithUsing(mergeNode, using) {
    return freeze({
      ...mergeNode,
      using
    });
  },
  cloneWithWhen(mergeNode, when) {
    return freeze({
      ...mergeNode,
      whens: mergeNode.whens ? freeze([...mergeNode.whens, when]) : freeze([when])
    });
  },
  cloneWithThen(mergeNode, then) {
    return freeze({
      ...mergeNode,
      whens: mergeNode.whens ? freeze([
        ...mergeNode.whens.slice(0, -1),
        WhenNode.cloneWithResult(mergeNode.whens[mergeNode.whens.length - 1], then)
      ]) : void 0
    });
  }
});
const OutputNode = freeze({
  is(node) {
    return node.kind === "OutputNode";
  },
  create(selections) {
    return freeze({
      kind: "OutputNode",
      selections: freeze(selections)
    });
  },
  cloneWithSelections(output, selections) {
    return freeze({
      ...output,
      selections: output.selections ? freeze([...output.selections, ...selections]) : freeze(selections)
    });
  }
});
const QueryNode = freeze({
  is(node) {
    return SelectQueryNode.is(node) || InsertQueryNode.is(node) || UpdateQueryNode.is(node) || DeleteQueryNode.is(node) || MergeQueryNode.is(node);
  },
  cloneWithEndModifier(node, modifier) {
    return freeze({
      ...node,
      endModifiers: node.endModifiers ? freeze([...node.endModifiers, modifier]) : freeze([modifier])
    });
  },
  cloneWithWhere(node, operation) {
    return freeze({
      ...node,
      where: node.where ? WhereNode.cloneWithOperation(node.where, "And", operation) : WhereNode.create(operation)
    });
  },
  cloneWithJoin(node, join) {
    return freeze({
      ...node,
      joins: node.joins ? freeze([...node.joins, join]) : freeze([join])
    });
  },
  cloneWithReturning(node, selections) {
    return freeze({
      ...node,
      returning: node.returning ? ReturningNode.cloneWithSelections(node.returning, selections) : ReturningNode.create(selections)
    });
  },
  cloneWithoutReturning(node) {
    return freeze({
      ...node,
      returning: void 0
    });
  },
  cloneWithoutWhere(node) {
    return freeze({
      ...node,
      where: void 0
    });
  },
  cloneWithExplain(node, format, options) {
    return freeze({
      ...node,
      explain: ExplainNode.create(format, options?.toOperationNode())
    });
  },
  cloneWithTop(node, top) {
    return freeze({
      ...node,
      top
    });
  },
  cloneWithOutput(node, selections) {
    return freeze({
      ...node,
      output: node.output ? OutputNode.cloneWithSelections(node.output, selections) : OutputNode.create(selections)
    });
  }
});
const ColumnUpdateNode = freeze({
  is(node) {
    return node.kind === "ColumnUpdateNode";
  },
  create(column2, value) {
    return freeze({
      kind: "ColumnUpdateNode",
      column: column2,
      value
    });
  }
});
function parseUpdate(...args) {
  if (args.length === 2) {
    return [
      ColumnUpdateNode.create(parseReferenceExpression(args[0]), parseValueExpression(args[1]))
    ];
  }
  return parseUpdateObjectExpression(args[0]);
}
function parseUpdateObjectExpression(update) {
  const updateObj = isFunction(update) ? update(expressionBuilder()) : update;
  return Object.entries(updateObj).filter(([_, value]) => value !== void 0).map(([key, value]) => {
    return ColumnUpdateNode.create(ColumnNode.create(key), parseValueExpression(value));
  });
}
const OnDuplicateKeyNode = freeze({
  is(node) {
    return node.kind === "OnDuplicateKeyNode";
  },
  create(updates) {
    return freeze({
      kind: "OnDuplicateKeyNode",
      updates
    });
  }
});
class InsertResult {
  constructor(insertId, numInsertedOrUpdatedRows) {
    /**
     * The auto incrementing primary key of the inserted row.
     *
     * This property can be undefined when the query contains an `on conflict`
     * clause that makes the query succeed even when nothing gets inserted.
     *
     * This property is always undefined on dialects like PostgreSQL that
     * don't return the inserted id by default. On those dialects you need
     * to use the {@link ReturningInterface.returning | returning} method.
     */
    __publicField(this, "insertId");
    /**
     * Affected rows count.
     */
    __publicField(this, "numInsertedOrUpdatedRows");
    this.insertId = insertId;
    this.numInsertedOrUpdatedRows = numInsertedOrUpdatedRows;
  }
}
class NoResultError extends Error {
  constructor(node) {
    super("no result");
    /**
     * The operation node tree of the query that was executed.
     */
    __publicField(this, "node");
    this.node = node;
  }
}
function isNoResultErrorConstructor(fn) {
  return Object.prototype.hasOwnProperty.call(fn, "prototype");
}
const OnConflictNode = freeze({
  is(node) {
    return node.kind === "OnConflictNode";
  },
  create() {
    return freeze({
      kind: "OnConflictNode"
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  },
  cloneWithIndexWhere(node, operation) {
    return freeze({
      ...node,
      indexWhere: node.indexWhere ? WhereNode.cloneWithOperation(node.indexWhere, "And", operation) : WhereNode.create(operation)
    });
  },
  cloneWithIndexOrWhere(node, operation) {
    return freeze({
      ...node,
      indexWhere: node.indexWhere ? WhereNode.cloneWithOperation(node.indexWhere, "Or", operation) : WhereNode.create(operation)
    });
  },
  cloneWithUpdateWhere(node, operation) {
    return freeze({
      ...node,
      updateWhere: node.updateWhere ? WhereNode.cloneWithOperation(node.updateWhere, "And", operation) : WhereNode.create(operation)
    });
  },
  cloneWithUpdateOrWhere(node, operation) {
    return freeze({
      ...node,
      updateWhere: node.updateWhere ? WhereNode.cloneWithOperation(node.updateWhere, "Or", operation) : WhereNode.create(operation)
    });
  },
  cloneWithoutIndexWhere(node) {
    return freeze({
      ...node,
      indexWhere: void 0
    });
  },
  cloneWithoutUpdateWhere(node) {
    return freeze({
      ...node,
      updateWhere: void 0
    });
  }
});
const _OnConflictBuilder = class _OnConflictBuilder {
  constructor(props) {
    __privateAdd(this, _props3);
    __privateSet(this, _props3, freeze(props));
  }
  /**
   * Specify a single column as the conflict target.
   *
   * Also see the {@link columns}, {@link constraint} and {@link expression}
   * methods for alternative ways to specify the conflict target.
   */
  column(column2) {
    const columnNode = ColumnNode.create(column2);
    return new _OnConflictBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWith(__privateGet(this, _props3).onConflictNode, {
        columns: __privateGet(this, _props3).onConflictNode.columns ? freeze([...__privateGet(this, _props3).onConflictNode.columns, columnNode]) : freeze([columnNode])
      })
    });
  }
  /**
   * Specify a list of columns as the conflict target.
   *
   * Also see the {@link column}, {@link constraint} and {@link expression}
   * methods for alternative ways to specify the conflict target.
   */
  columns(columns) {
    const columnNodes = columns.map(ColumnNode.create);
    return new _OnConflictBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWith(__privateGet(this, _props3).onConflictNode, {
        columns: __privateGet(this, _props3).onConflictNode.columns ? freeze([...__privateGet(this, _props3).onConflictNode.columns, ...columnNodes]) : freeze(columnNodes)
      })
    });
  }
  /**
   * Specify a specific constraint by name as the conflict target.
   *
   * Also see the {@link column}, {@link columns} and {@link expression}
   * methods for alternative ways to specify the conflict target.
   */
  constraint(constraintName) {
    return new _OnConflictBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWith(__privateGet(this, _props3).onConflictNode, {
        constraint: IdentifierNode.create(constraintName)
      })
    });
  }
  /**
   * Specify an expression as the conflict target.
   *
   * This can be used if the unique index is an expression index.
   *
   * Also see the {@link column}, {@link columns} and {@link constraint}
   * methods for alternative ways to specify the conflict target.
   */
  expression(expression) {
    return new _OnConflictBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWith(__privateGet(this, _props3).onConflictNode, {
        indexExpression: expression.toOperationNode()
      })
    });
  }
  where(...args) {
    return new _OnConflictBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWithIndexWhere(__privateGet(this, _props3).onConflictNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  whereRef(lhs, op, rhs) {
    return new _OnConflictBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWithIndexWhere(__privateGet(this, _props3).onConflictNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  clearWhere() {
    return new _OnConflictBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWithoutIndexWhere(__privateGet(this, _props3).onConflictNode)
    });
  }
  /**
   * Adds the "do nothing" conflict action.
   *
   * ### Examples
   *
   * ```ts
   * const id = 1
   * const first_name = 'John'
   *
   * await db
   *   .insertInto('person')
   *   .values({ first_name, id })
   *   .onConflict((oc) => oc
   *     .column('id')
   *     .doNothing()
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "id")
   * values ($1, $2)
   * on conflict ("id") do nothing
   * ```
   */
  doNothing() {
    return new OnConflictDoNothingBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWith(__privateGet(this, _props3).onConflictNode, {
        doNothing: true
      })
    });
  }
  /**
   * Adds the "do update set" conflict action.
   *
   * ### Examples
   *
   * ```ts
   * const id = 1
   * const first_name = 'John'
   *
   * await db
   *   .insertInto('person')
   *   .values({ first_name, id })
   *   .onConflict((oc) => oc
   *     .column('id')
   *     .doUpdateSet({ first_name })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "id")
   * values ($1, $2)
   * on conflict ("id")
   * do update set "first_name" = $3
   * ```
   *
   * In the next example we use the `ref` method to reference
   * columns of the virtual table `excluded` in a type-safe way
   * to create an upsert operation:
   *
   * ```ts
   * import type { NewPerson } from 'type-editor' // imaginary module
   *
   * async function upsertPerson(person: NewPerson): Promise<void> {
   *   await db.insertInto('person')
   *     .values(person)
   *     .onConflict((oc) => oc
   *       .column('id')
   *       .doUpdateSet((eb) => ({
   *         first_name: eb.ref('excluded.first_name'),
   *         last_name: eb.ref('excluded.last_name')
   *       })
   *     )
   *   )
   *   .execute()
   * }
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "last_name")
   * values ($1, $2)
   * on conflict ("id")
   * do update set
   *  "first_name" = excluded."first_name",
   *  "last_name" = excluded."last_name"
   * ```
   */
  doUpdateSet(update) {
    return new OnConflictUpdateBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWith(__privateGet(this, _props3).onConflictNode, {
        updates: parseUpdateObjectExpression(update)
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
};
_props3 = new WeakMap();
let OnConflictBuilder = _OnConflictBuilder;
preventAwait(OnConflictBuilder, "don't await OnConflictBuilder instances.");
class OnConflictDoNothingBuilder {
  constructor(props) {
    __privateAdd(this, _props4);
    __privateSet(this, _props4, freeze(props));
  }
  toOperationNode() {
    return __privateGet(this, _props4).onConflictNode;
  }
}
_props4 = new WeakMap();
preventAwait(OnConflictDoNothingBuilder, "don't await OnConflictDoNothingBuilder instances.");
const _OnConflictUpdateBuilder = class _OnConflictUpdateBuilder {
  constructor(props) {
    __privateAdd(this, _props5);
    __privateSet(this, _props5, freeze(props));
  }
  where(...args) {
    return new _OnConflictUpdateBuilder({
      ...__privateGet(this, _props5),
      onConflictNode: OnConflictNode.cloneWithUpdateWhere(__privateGet(this, _props5).onConflictNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  /**
   * Specify a where condition for the update operation.
   *
   * See {@link WhereInterface.whereRef} for more info.
   */
  whereRef(lhs, op, rhs) {
    return new _OnConflictUpdateBuilder({
      ...__privateGet(this, _props5),
      onConflictNode: OnConflictNode.cloneWithUpdateWhere(__privateGet(this, _props5).onConflictNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  clearWhere() {
    return new _OnConflictUpdateBuilder({
      ...__privateGet(this, _props5),
      onConflictNode: OnConflictNode.cloneWithoutUpdateWhere(__privateGet(this, _props5).onConflictNode)
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _props5).onConflictNode;
  }
};
_props5 = new WeakMap();
let OnConflictUpdateBuilder = _OnConflictUpdateBuilder;
preventAwait(OnConflictUpdateBuilder, "don't await OnConflictUpdateBuilder instances.");
const TopNode = freeze({
  is(node) {
    return node.kind === "TopNode";
  },
  create(expression, modifiers) {
    return freeze({
      kind: "TopNode",
      expression,
      modifiers
    });
  }
});
function parseTop(expression, modifiers) {
  if (!isNumber(expression) && !isBigInt(expression)) {
    throw new Error(`Invalid top expression: ${expression}`);
  }
  if (!isUndefined(modifiers) && !isTopModifiers(modifiers)) {
    throw new Error(`Invalid top modifiers: ${modifiers}`);
  }
  return TopNode.create(expression, modifiers);
}
function isTopModifiers(modifiers) {
  return modifiers === "percent" || modifiers === "with ties" || modifiers === "percent with ties";
}
const _InsertQueryBuilder = class _InsertQueryBuilder {
  constructor(props) {
    __privateAdd(this, _props6);
    __privateSet(this, _props6, freeze(props));
  }
  /**
   * Sets the values to insert for an {@link Kysely.insertInto | insert} query.
   *
   * This method takes an object whose keys are column names and values are
   * values to insert. In addition to the column's type, the values can be
   * raw {@link sql} snippets or select queries.
   *
   * You must provide all fields you haven't explicitly marked as nullable
   * or optional using {@link Generated} or {@link ColumnType}.
   *
   * The return value of an `insert` query is an instance of {@link InsertResult}. The
   * {@link InsertResult.insertId | insertId} field holds the auto incremented primary
   * key if the database returned one.
   *
   * On PostgreSQL and some other dialects, you need to call `returning` to get
   * something out of the query.
   *
   * Also see the {@link expression} method for inserting the result of a select
   * query or any other expression.
   *
   * ### Examples
   *
   * <!-- siteExample("insert", "Single row", 10) -->
   *
   * Insert a single row:
   *
   * ```ts
   * const result = await db
   *   .insertInto('person')
   *   .values({
   *     first_name: 'Jennifer',
   *     last_name: 'Aniston',
   *     age: 40
   *   })
   *   .executeTakeFirst()
   *
   * // `insertId` is only available on dialects that
   * // automatically return the id of the inserted row
   * // such as MySQL and SQLite. On PostgreSQL, for example,
   * // you need to add a `returning` clause to the query to
   * // get anything out. See the "returning data" example.
   * console.log(result.insertId)
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * insert into `person` (`first_name`, `last_name`, `age`) values (?, ?, ?)
   * ```
   *
   * <!-- siteExample("insert", "Multiple rows", 20) -->
   *
   * On dialects that support it (for example PostgreSQL) you can insert multiple
   * rows by providing an array. Note that the return value is once again very
   * dialect-specific. Some databases may only return the id of the *last* inserted
   * row and some return nothing at all unless you call `returning`.
   *
   * ```ts
   * await db
   *   .insertInto('person')
   *   .values([{
   *     first_name: 'Jennifer',
   *     last_name: 'Aniston',
   *     age: 40,
   *   }, {
   *     first_name: 'Arnold',
   *     last_name: 'Schwarzenegger',
   *     age: 70,
   *   }])
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "last_name", "age") values (($1, $2, $3), ($4, $5, $6))
   * ```
   *
   * <!-- siteExample("insert", "Returning data", 30) -->
   *
   * On supported dialects like PostgreSQL you need to chain `returning` to the query to get
   * the inserted row's columns (or any other expression) as the return value. `returning`
   * works just like `select`. Refer to `select` method's examples and documentation for
   * more info.
   *
   * ```ts
   * const result = await db
   *   .insertInto('person')
   *   .values({
   *     first_name: 'Jennifer',
   *     last_name: 'Aniston',
   *     age: 40,
   *   })
   *   .returning(['id', 'first_name as name'])
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "last_name", "age") values ($1, $2, $3) returning "id", "first_name" as "name"
   * ```
   *
   * <!-- siteExample("insert", "Complex values", 40) -->
   *
   * In addition to primitives, the values can also be arbitrary expressions.
   * You can build the expressions by using a callback and calling the methods
   * on the expression builder passed to it:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * const ani = "Ani"
   * const ston = "ston"
   *
   * const result = await db
   *   .insertInto('person')
   *   .values(({ ref, selectFrom, fn }) => ({
   *     first_name: 'Jennifer',
   *     last_name: sql<string>`concat(${ani}, ${ston})`,
   *     middle_name: ref('first_name'),
   *     age: selectFrom('person')
   *       .select(fn.avg<number>('age').as('avg_age')),
   *   }))
   *   .executeTakeFirst()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" (
   *   "first_name",
   *   "last_name",
   *   "middle_name",
   *   "age"
   * )
   * values (
   *   $1,
   *   concat($2, $3),
   *   "first_name",
   *   (select avg("age") as "avg_age" from "person")
   * )
   * ```
   *
   * You can also use the callback version of subqueries or raw expressions:
   *
   * ```ts
   * await db.with('jennifer', (db) => db
   *   .selectFrom('person')
   *   .where('first_name', '=', 'Jennifer')
   *   .select(['id', 'first_name', 'gender'])
   *   .limit(1)
   * ).insertInto('pet').values((eb) => ({
   *   owner_id: eb.selectFrom('jennifer').select('id'),
   *   name: eb.selectFrom('jennifer').select('first_name'),
   *   species: 'cat',
   * }))
   * .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * with "jennifer" as (
   *   select "id", "first_name", "gender"
   *   from "person"
   *   where "first_name" = $1
   *   limit $2
   * )
   * insert into "pet" ("owner_id", "name", "species")
   * values (
   *  (select "id" from "jennifer"),
   *  (select "first_name" from "jennifer"),
   *  $3
   * )
   * ```
   */
  values(insert) {
    const [columns, values] = parseInsertExpression(insert);
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: InsertQueryNode.cloneWith(__privateGet(this, _props6).queryNode, {
        columns,
        values
      })
    });
  }
  /**
   * Sets the columns to insert.
   *
   * The {@link values} method sets both the columns and the values and this method
   * is not needed. But if you are using the {@link expression} method, you can use
   * this method to set the columns to insert.
   *
   * ### Examples
   *
   * ```ts
   * await db.insertInto('person')
   *   .columns(['first_name'])
   *   .expression((eb) => eb.selectFrom('pet').select('pet.name'))
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name")
   * select "pet"."name" from "pet"
   * ```
   */
  columns(columns) {
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: InsertQueryNode.cloneWith(__privateGet(this, _props6).queryNode, {
        columns: freeze(columns.map(ColumnNode.create))
      })
    });
  }
  /**
   * Insert an arbitrary expression. For example the result of a select query.
   *
   * ### Examples
   *
   * <!-- siteExample("insert", "Insert subquery", 50) -->
   *
   * You can create an `INSERT INTO SELECT FROM` query using the `expression` method.
   * This API doesn't follow our WYSIWYG principles and might be a bit difficult to
   * remember. The reasons for this design stem from implementation difficulties.
   *
   * ```ts
   * const result = await db.insertInto('person')
   *   .columns(['first_name', 'last_name', 'age'])
   *   .expression((eb) => eb
   *     .selectFrom('pet')
   *     .select((eb) => [
   *       'pet.name',
   *       eb.val('Petson').as('last_name'),
   *       eb.lit(7).as('age'),
   *     ])
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "last_name", "age")
   * select "pet"."name", $1 as "last_name", 7 as "age from "pet"
   * ```
   */
  expression(expression) {
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: InsertQueryNode.cloneWith(__privateGet(this, _props6).queryNode, {
        values: parseExpression(expression)
      })
    });
  }
  /**
   * Creates an `insert into "person" default values` query.
   *
   * ### Examples
   *
   * ```ts
   * await db.insertInto('person')
   *   .defaultValues()
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" default values
   * ```
   */
  defaultValues() {
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: InsertQueryNode.cloneWith(__privateGet(this, _props6).queryNode, {
        defaultValues: true
      })
    });
  }
  /**
   * This can be used to add any additional SQL to the end of the query.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.insertInto('person')
   *   .values({
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'male',
   *   })
   *   .modifyEnd(sql`-- This is a comment`)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * insert into `person` ("first_name", "last_name", "gender")
   * values (?, ?, ?) -- This is a comment
   * ```
   */
  modifyEnd(modifier) {
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: QueryNode.cloneWithEndModifier(__privateGet(this, _props6).queryNode, modifier.toOperationNode())
    });
  }
  /**
   * Changes an `insert into` query to an `insert ignore into` query.
   *
   * If you use the ignore modifier, ignorable errors that occur while executing the
   * insert statement are ignored. For example, without ignore, a row that duplicates
   * an existing unique index or primary key value in the table causes a duplicate-key
   * error and the statement is aborted. With ignore, the row is discarded and no error
   * occurs.
   *
   * This is only supported on some dialects like MySQL. On most dialects you should
   * use the {@link onConflict} method.
   *
   * ### Examples
   *
   * ```ts
   * await db.insertInto('person')
   *   .ignore()
   *   .values({
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'female',
   *   })
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * insert ignore into `person` ("first_name", "last_name", "gender") values (?, ?, ?)
   * ```
   */
  ignore() {
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: InsertQueryNode.cloneWith(__privateGet(this, _props6).queryNode, {
        ignore: true
      })
    });
  }
  /**
   * Changes an `insert into` query to an `insert top into` query.
   *
   * `top` clause is only supported by some dialects like MS SQL Server.
   *
   * ### Examples
   *
   * Insert the first 5 rows:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.insertInto('person')
   *   .top(5)
   *   .columns(['first_name', 'gender'])
   *   .expression(
   *     (eb) => eb.selectFrom('pet').select(['name', sql.lit('other').as('gender')])
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * insert top(5) into "person" ("first_name", "gender") select "name", 'other' as "gender" from "pet"
   * ```
   *
   * Insert the first 50 percent of rows:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.insertInto('person')
   *   .top(50, 'percent')
   *   .columns(['first_name', 'gender'])
   *   .expression(
   *     (eb) => eb.selectFrom('pet').select(['name', sql.lit('other').as('gender')])
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * insert top(50) percent into "person" ("first_name", "gender") select "name", 'other' as "gender" from "pet"
   * ```
   */
  top(expression, modifiers) {
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: QueryNode.cloneWithTop(__privateGet(this, _props6).queryNode, parseTop(expression, modifiers))
    });
  }
  /**
   * Adds an `on conflict` clause to the query.
   *
   * `on conflict` is only supported by some dialects like PostgreSQL and SQLite. On MySQL
   * you can use {@link ignore} and {@link onDuplicateKeyUpdate} to achieve similar results.
   *
   * ### Examples
   *
   * ```ts
   * await db
   *   .insertInto('pet')
   *   .values({
   *     name: 'Catto',
   *     species: 'cat',
   *     owner_id: 3,
   *   })
   *   .onConflict((oc) => oc
   *     .column('name')
   *     .doUpdateSet({ species: 'hamster' })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species", "owner_id")
   * values ($1, $2, $3)
   * on conflict ("name")
   * do update set "species" = $4
   * ```
   *
   * You can provide the name of the constraint instead of a column name:
   *
   * ```ts
   * await db
   *   .insertInto('pet')
   *   .values({
   *     name: 'Catto',
   *     species: 'cat',
   *     owner_id: 3,
   *   })
   *   .onConflict((oc) => oc
   *     .constraint('pet_name_key')
   *     .doUpdateSet({ species: 'hamster' })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species", "owner_id")
   * values ($1, $2, $3)
   * on conflict on constraint "pet_name_key"
   * do update set "species" = $4
   * ```
   *
   * You can also specify an expression as the conflict target in case
   * the unique index is an expression index:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db
   *   .insertInto('pet')
   *   .values({
   *     name: 'Catto',
   *     species: 'cat',
   *     owner_id: 3,
   *   })
   *   .onConflict((oc) => oc
   *     .expression(sql<string>`lower(name)`)
   *     .doUpdateSet({ species: 'hamster' })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species", "owner_id")
   * values ($1, $2, $3)
   * on conflict (lower(name))
   * do update set "species" = $4
   * ```
   *
   * You can add a filter for the update statement like this:
   *
   * ```ts
   * await db
   *   .insertInto('pet')
   *   .values({
   *     name: 'Catto',
   *     species: 'cat',
   *     owner_id: 3,
   *   })
   *   .onConflict((oc) => oc
   *     .column('name')
   *     .doUpdateSet({ species: 'hamster' })
   *     .where('excluded.name', '!=', 'Catto')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species", "owner_id")
   * values ($1, $2, $3)
   * on conflict ("name")
   * do update set "species" = $4
   * where "excluded"."name" != $5
   * ```
   *
   * You can create an `on conflict do nothing` clauses like this:
   *
   * ```ts
   * await db
   *   .insertInto('pet')
   *   .values({
   *     name: 'Catto',
   *     species: 'cat',
   *     owner_id: 3,
   *   })
   *   .onConflict((oc) => oc
   *     .column('name')
   *     .doNothing()
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species", "owner_id")
   * values ($1, $2, $3)
   * on conflict ("name") do nothing
   * ```
   *
   * You can refer to the columns of the virtual `excluded` table
   * in a type-safe way using a callback and the `ref` method of
   * `ExpressionBuilder`:
   *
   * ```ts
   * await db.insertInto('person')
   *   .values({
   *     id: 1,
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'male',
   *   })
   *   .onConflict(oc => oc
   *     .column('id')
   *     .doUpdateSet({
   *       first_name: (eb) => eb.ref('excluded.first_name'),
   *       last_name: (eb) => eb.ref('excluded.last_name')
   *     })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("id", "first_name", "last_name", "gender")
   * values ($1, $2, $3, $4)
   * on conflict ("id")
   * do update set
   *  "first_name" = "excluded"."first_name",
   *  "last_name" = "excluded"."last_name"
   * ```
   */
  onConflict(callback) {
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: InsertQueryNode.cloneWith(__privateGet(this, _props6).queryNode, {
        onConflict: callback(new OnConflictBuilder({
          onConflictNode: OnConflictNode.create()
        })).toOperationNode()
      })
    });
  }
  /**
   * Adds `on duplicate key update` to the query.
   *
   * If you specify `on duplicate key update`, and a row is inserted that would cause
   * a duplicate value in a unique index or primary key, an update of the old row occurs.
   *
   * This is only implemented by some dialects like MySQL. On most dialects you should
   * use {@link onConflict} instead.
   *
   * ### Examples
   *
   * ```ts
   * await db
   *   .insertInto('person')
   *   .values({
   *     id: 1,
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'male',
   *   })
   *   .onDuplicateKeyUpdate({ updated_at: new Date().toISOString() })
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * insert into `person` (`id`, `first_name`, `last_name`, `gender`)
   * values (?, ?, ?, ?)
   * on duplicate key update `updated_at` = ?
   * ```
   */
  onDuplicateKeyUpdate(update) {
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: InsertQueryNode.cloneWith(__privateGet(this, _props6).queryNode, {
        onDuplicateKey: OnDuplicateKeyNode.create(parseUpdateObjectExpression(update))
      })
    });
  }
  returning(selection) {
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: QueryNode.cloneWithReturning(__privateGet(this, _props6).queryNode, parseSelectArg(selection))
    });
  }
  returningAll() {
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: QueryNode.cloneWithReturning(__privateGet(this, _props6).queryNode, parseSelectAll())
    });
  }
  output(args) {
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: QueryNode.cloneWithOutput(__privateGet(this, _props6).queryNode, parseSelectArg(args))
    });
  }
  outputAll(table) {
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: QueryNode.cloneWithOutput(__privateGet(this, _props6).queryNode, parseSelectAll(table))
    });
  }
  /**
   * Clears all `returning` clauses from the query.
   *
   * ### Examples
   *
   * ```ts
   * await db.insertInto('person')
   *   .values({ first_name: 'James', last_name: 'Smith', gender: 'male' })
   *   .returning(['first_name'])
   *   .clearReturning()
   *   .execute()
   * ```
   *
   * The generated SQL(PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "last_name", "gender") values ($1, $2, $3)
   * ```
   */
  clearReturning() {
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: QueryNode.cloneWithoutReturning(__privateGet(this, _props6).queryNode)
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   *
   * If you want to conditionally call a method on `this`, see
   * the {@link $if} method.
   *
   * ### Examples
   *
   * The next example uses a helper function `log` to log a query:
   *
   * ```ts
   * import type { Compilable } from 'kysely'
   *
   * function log<T extends Compilable>(qb: T): T {
   *   console.log(qb.compile())
   *   return qb
   * }
   *
   * await db.insertInto('person')
   *   .values({ first_name: 'John', last_name: 'Doe', gender: 'male' })
   *   .$call(log)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  /**
   * Call `func(this)` if `condition` is true.
   *
   * This method is especially handy with optional selects. Any `returning` or `returningAll`
   * method calls add columns as optional fields to the output type when called inside
   * the `func` callback. This is because we can't know if those selections were actually
   * made before running the code.
   *
   * You can also call any other methods inside the callback.
   *
   * ### Examples
   *
   * ```ts
   * import type { NewPerson } from 'type-editor' // imaginary module
   *
   * async function insertPerson(values: NewPerson, returnLastName: boolean) {
   *   return await db
   *     .insertInto('person')
   *     .values(values)
   *     .returning(['id', 'first_name'])
   *     .$if(returnLastName, (qb) => qb.returning('last_name'))
   *     .executeTakeFirstOrThrow()
   * }
   * ```
   *
   * Any selections added inside the `if` callback will be added as optional fields to the
   * output type since we can't know if the selections were actually made before running
   * the code. In the example above the return type of the `insertPerson` function is:
   *
   * ```ts
   * Promise<{
   *   id: number
   *   first_name: string
   *   last_name?: string
   * }>
   * ```
   */
  $if(condition, func) {
    if (condition) {
      return func(this);
    }
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6)
    });
  }
  /**
   * Change the output type of the query.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `InsertQueryBuilder` with a new output type.
   */
  $castTo() {
    return new _InsertQueryBuilder(__privateGet(this, _props6));
  }
  /**
   * Narrows (parts of) the output type of the query.
   *
   * Kysely tries to be as type-safe as possible, but in some cases we have to make
   * compromises for better maintainability and compilation performance. At present,
   * Kysely doesn't narrow the output type of the query based on {@link values} input
   * when using {@link returning} or {@link returningAll}.
   *
   * This utility method is very useful for these situations, as it removes unncessary
   * runtime assertion/guard code. Its input type is limited to the output type
   * of the query, so you can't add a column that doesn't exist, or change a column's
   * type to something that doesn't exist in its union type.
   *
   * ### Examples
   *
   * Turn this code:
   *
   * ```ts
   * import type { Person } from 'type-editor' // imaginary module
   *
   * const person = await db.insertInto('person')
   *   .values({
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'male',
   *     nullable_column: 'hell yeah!'
   *   })
   *   .returningAll()
   *   .executeTakeFirstOrThrow()
   *
   * if (isWithNoNullValue(person)) {
   *   functionThatExpectsPersonWithNonNullValue(person)
   * }
   *
   * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
   *   return person.nullable_column != null
   * }
   * ```
   *
   * Into this:
   *
   * ```ts
   * import type { NotNull } from 'kysely'
   *
   * const person = await db.insertInto('person')
   *   .values({
   *     first_name: 'John',
   *     last_name: 'Doe',
   *     gender: 'male',
   *     nullable_column: 'hell yeah!'
   *   })
   *   .returningAll()
   *   .$narrowType<{ nullable_column: NotNull }>()
   *   .executeTakeFirstOrThrow()
   *
   * functionThatExpectsPersonWithNonNullValue(person)
   * ```
   */
  $narrowType() {
    return new _InsertQueryBuilder(__privateGet(this, _props6));
  }
  /**
   * Asserts that query's output row type equals the given type `T`.
   *
   * This method can be used to simplify excessively complex types to make TypeScript happy
   * and much faster.
   *
   * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
   * for TypeScript and you get errors like this:
   *
   * ```
   * error TS2589: Type instantiation is excessively deep and possibly infinite.
   * ```
   *
   * In these case you can often use this method to help TypeScript a little bit. When you use this
   * method to assert the output type of a query, Kysely can drop the complex output type that
   * consists of multiple nested helper types and replace it with the simple asserted type.
   *
   * Using this method doesn't reduce type safety at all. You have to pass in a type that is
   * structurally equal to the current type.
   *
   * ### Examples
   *
   * ```ts
   * import type { NewPerson, NewPet, Species } from 'type-editor' // imaginary module
   *
   * async function insertPersonAndPet(person: NewPerson, pet: Omit<NewPet, 'owner_id'>) {
   *   return await db
   *     .with('new_person', (qb) => qb
   *       .insertInto('person')
   *       .values(person)
   *       .returning('id')
   *       .$assertType<{ id: number }>()
   *     )
   *     .with('new_pet', (qb) => qb
   *       .insertInto('pet')
   *       .values((eb) => ({
   *         owner_id: eb.selectFrom('new_person').select('id'),
   *         ...pet
   *       }))
   *       .returning(['name as pet_name', 'species'])
   *       .$assertType<{ pet_name: string, species: Species }>()
   *     )
   *     .selectFrom(['new_person', 'new_pet'])
   *     .selectAll()
   *     .executeTakeFirstOrThrow()
   * }
   * ```
   */
  $assertType() {
    return new _InsertQueryBuilder(__privateGet(this, _props6));
  }
  /**
   * Returns a copy of this InsertQueryBuilder instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      executor: __privateGet(this, _props6).executor.withPlugin(plugin)
    });
  }
  toOperationNode() {
    return __privateGet(this, _props6).executor.transformQuery(__privateGet(this, _props6).queryNode, __privateGet(this, _props6).queryId);
  }
  compile() {
    return __privateGet(this, _props6).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props6).queryId);
  }
  /**
   * Executes the query and returns an array of rows.
   *
   * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
   */
  async execute() {
    const compiledQuery = this.compile();
    const result = await __privateGet(this, _props6).executor.executeQuery(compiledQuery, __privateGet(this, _props6).queryId);
    const { adapter } = __privateGet(this, _props6).executor;
    const query = compiledQuery.query;
    if (query.returning && adapter.supportsReturning || query.output && adapter.supportsOutput) {
      return result.rows;
    }
    return [
      new InsertResult(
        result.insertId,
        // TODO: remove numUpdatedOrDeletedRows.
        result.numAffectedRows ?? result.numUpdatedOrDeletedRows
      )
    ];
  }
  /**
   * Executes the query and returns the first result or undefined if
   * the query returned no result.
   */
  async executeTakeFirst() {
    const [result] = await this.execute();
    return result;
  }
  /**
   * Executes the query and returns the first result or throws if
   * the query returned no result.
   *
   * By default an instance of {@link NoResultError} is thrown, but you can
   * provide a custom error class, or callback as the only argument to throw a different
   * error.
   */
  async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
    const result = await this.executeTakeFirst();
    if (result === void 0) {
      const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
      throw error;
    }
    return result;
  }
  async *stream(chunkSize = 100) {
    const compiledQuery = this.compile();
    const stream = __privateGet(this, _props6).executor.stream(compiledQuery, chunkSize, __privateGet(this, _props6).queryId);
    for await (const item of stream) {
      yield* item.rows;
    }
  }
  async explain(format, options) {
    const builder = new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: QueryNode.cloneWithExplain(__privateGet(this, _props6).queryNode, format, options)
    });
    return await builder.execute();
  }
};
_props6 = new WeakMap();
let InsertQueryBuilder = _InsertQueryBuilder;
preventAwait(InsertQueryBuilder, "don't await InsertQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
class DeleteResult {
  constructor(numDeletedRows) {
    __publicField(this, "numDeletedRows");
    this.numDeletedRows = numDeletedRows;
  }
}
const LimitNode = freeze({
  is(node) {
    return node.kind === "LimitNode";
  },
  create(limit) {
    return freeze({
      kind: "LimitNode",
      limit
    });
  }
});
const _DeleteQueryBuilder = class _DeleteQueryBuilder {
  constructor(props) {
    __privateAdd(this, _props7);
    __privateSet(this, _props7, freeze(props));
  }
  where(...args) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props7).queryNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  whereRef(lhs, op, rhs) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props7).queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  clearWhere() {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithoutWhere(__privateGet(this, _props7).queryNode)
    });
  }
  /**
   * Changes a `delete from` query into a `delete top from` query.
   *
   * `top` clause is only supported by some dialects like MS SQL Server.
   *
   * ### Examples
   *
   * Delete the first 5 rows:
   *
   * ```ts
   * await db
   *   .deleteFrom('person')
   *   .top(5)
   *   .where('age', '>', 18)
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * delete top(5) from "person" where "age" > @1
   * ```
   *
   * Delete the first 50% of rows:
   *
   * ```ts
   * await db
   *   .deleteFrom('person')
   *   .top(50, 'percent')
   *   .where('age', '>', 18)
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * delete top(50) percent from "person" where "age" > @1
   * ```
   */
  top(expression, modifiers) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithTop(__privateGet(this, _props7).queryNode, parseTop(expression, modifiers))
    });
  }
  using(tables2) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: DeleteQueryNode.cloneWithUsing(__privateGet(this, _props7).queryNode, parseTableExpressionOrList(tables2))
    });
  }
  innerJoin(...args) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props7).queryNode, parseJoin("InnerJoin", args))
    });
  }
  leftJoin(...args) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props7).queryNode, parseJoin("LeftJoin", args))
    });
  }
  rightJoin(...args) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props7).queryNode, parseJoin("RightJoin", args))
    });
  }
  fullJoin(...args) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props7).queryNode, parseJoin("FullJoin", args))
    });
  }
  returning(selection) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithReturning(__privateGet(this, _props7).queryNode, parseSelectArg(selection))
    });
  }
  returningAll(table) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithReturning(__privateGet(this, _props7).queryNode, parseSelectAll(table))
    });
  }
  output(args) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithOutput(__privateGet(this, _props7).queryNode, parseSelectArg(args))
    });
  }
  outputAll(table) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithOutput(__privateGet(this, _props7).queryNode, parseSelectAll(table))
    });
  }
  /**
   * Clears all `returning` clauses from the query.
   *
   * ### Examples
   *
   * ```ts
   * await db.deleteFrom('pet')
   *   .returningAll()
   *   .where('name', '=', 'Max')
   *   .clearReturning()
   *   .execute()
   * ```
   *
   * The generated SQL(PostgreSQL):
   *
   * ```sql
   * delete from "pet" where "name" = "Max"
   * ```
   */
  clearReturning() {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithoutReturning(__privateGet(this, _props7).queryNode)
    });
  }
  /**
   * Clears the `limit` clause from the query.
   *
   * ### Examples
   *
   * ```ts
   * await db.deleteFrom('pet')
   *   .returningAll()
   *   .where('name', '=', 'Max')
   *   .limit(5)
   *   .clearLimit()
   *   .execute()
   * ```
   *
   * The generated SQL(PostgreSQL):
   *
   * ```sql
   * delete from "pet" where "name" = "Max" returning *
   * ```
   */
  clearLimit() {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: DeleteQueryNode.cloneWithoutLimit(__privateGet(this, _props7).queryNode)
    });
  }
  /**
   * Clears the `order by` clause from the query.
   *
   * ### Examples
   *
   * ```ts
   * await db.deleteFrom('pet')
   *   .returningAll()
   *   .where('name', '=', 'Max')
   *   .orderBy('id')
   *   .clearOrderBy()
   *   .execute()
   * ```
   *
   * The generated SQL(PostgreSQL):
   *
   * ```sql
   * delete from "pet" where "name" = "Max" returning *
   * ```
   */
  clearOrderBy() {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: DeleteQueryNode.cloneWithoutOrderBy(__privateGet(this, _props7).queryNode)
    });
  }
  /**
   * Adds an `order by` clause to the query.
   *
   * `orderBy` calls are additive. To order by multiple columns, call `orderBy`
   * multiple times.
   *
   * The first argument is the expression to order by and the second is the
   * order (`asc` or `desc`).
   *
   * An `order by` clause in a delete query is only supported by some dialects
   * like MySQL.
   *
   * See {@link SelectQueryBuilder.orderBy} for more examples.
   *
   * ### Examples
   *
   * Delete 5 oldest items in a table:
   *
   * ```ts
   * await db
   *   .deleteFrom('pet')
   *   .orderBy('created_at')
   *   .limit(5)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * delete from `pet`
   * order by `created_at`
   * limit ?
   * ```
   */
  orderBy(orderBy, direction) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: DeleteQueryNode.cloneWithOrderByItems(__privateGet(this, _props7).queryNode, parseOrderBy([orderBy, direction]))
    });
  }
  /**
   * Adds a limit clause to the query.
   *
   * A limit clause in a delete query is only supported by some dialects
   * like MySQL.
   *
   * ### Examples
   *
   * Delete 5 oldest items in a table:
   *
   * ```ts
   * await db
   *   .deleteFrom('pet')
   *   .orderBy('created_at')
   *   .limit(5)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * delete from `pet` order by `created_at` limit ?
   * ```
   */
  limit(limit) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: DeleteQueryNode.cloneWithLimit(__privateGet(this, _props7).queryNode, LimitNode.create(parseValueExpression(limit)))
    });
  }
  /**
   * This can be used to add any additional SQL to the end of the query.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.deleteFrom('person')
   *   .where('first_name', '=', 'John')
   *   .modifyEnd(sql`-- This is a comment`)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * delete from `person`
   * where `first_name` = "John" -- This is a comment
   * ```
   */
  modifyEnd(modifier) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithEndModifier(__privateGet(this, _props7).queryNode, modifier.toOperationNode())
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   *
   * If you want to conditionally call a method on `this`, see
   * the {@link $if} method.
   *
   * ### Examples
   *
   * The next example uses a helper function `log` to log a query:
   *
   * ```ts
   * import type { Compilable } from 'kysely'
   *
   * function log<T extends Compilable>(qb: T): T {
   *   console.log(qb.compile())
   *   return qb
   * }
   *
   * await db.deleteFrom('person')
   *   .$call(log)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  /**
   * Call `func(this)` if `condition` is true.
   *
   * This method is especially handy with optional selects. Any `returning` or `returningAll`
   * method calls add columns as optional fields to the output type when called inside
   * the `func` callback. This is because we can't know if those selections were actually
   * made before running the code.
   *
   * You can also call any other methods inside the callback.
   *
   * ### Examples
   *
   * ```ts
   * async function deletePerson(id: number, returnLastName: boolean) {
   *   return await db
   *     .deleteFrom('person')
   *     .where('id', '=', id)
   *     .returning(['id', 'first_name'])
   *     .$if(returnLastName, (qb) => qb.returning('last_name'))
   *     .executeTakeFirstOrThrow()
   * }
   * ```
   *
   * Any selections added inside the `if` callback will be added as optional fields to the
   * output type since we can't know if the selections were actually made before running
   * the code. In the example above the return type of the `deletePerson` function is:
   *
   * ```ts
   * Promise<{
   *   id: number
   *   first_name: string
   *   last_name?: string
   * }>
   * ```
   */
  $if(condition, func) {
    if (condition) {
      return func(this);
    }
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7)
    });
  }
  /**
   * Change the output type of the query.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `DeleteQueryBuilder` with a new output type.
   */
  $castTo() {
    return new _DeleteQueryBuilder(__privateGet(this, _props7));
  }
  /**
   * Narrows (parts of) the output type of the query.
   *
   * Kysely tries to be as type-safe as possible, but in some cases we have to make
   * compromises for better maintainability and compilation performance. At present,
   * Kysely doesn't narrow the output type of the query when using {@link where} and {@link returning} or {@link returningAll}.
   *
   * This utility method is very useful for these situations, as it removes unncessary
   * runtime assertion/guard code. Its input type is limited to the output type
   * of the query, so you can't add a column that doesn't exist, or change a column's
   * type to something that doesn't exist in its union type.
   *
   * ### Examples
   *
   * Turn this code:
   *
   * ```ts
   * import type { Person } from 'type-editor' // imaginary module
   *
   * const person = await db.deleteFrom('person')
   *   .where('id', '=', 3)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .executeTakeFirstOrThrow()
   *
   * if (isWithNoNullValue(person)) {
   *   functionThatExpectsPersonWithNonNullValue(person)
   * }
   *
   * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
   *   return person.nullable_column != null
   * }
   * ```
   *
   * Into this:
   *
   * ```ts
   * import type { NotNull } from 'kysely'
   *
   * const person = await db.deleteFrom('person')
   *   .where('id', '=', 3)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .$narrowType<{ nullable_column: NotNull }>()
   *   .executeTakeFirstOrThrow()
   *
   * functionThatExpectsPersonWithNonNullValue(person)
   * ```
   */
  $narrowType() {
    return new _DeleteQueryBuilder(__privateGet(this, _props7));
  }
  /**
   * Asserts that query's output row type equals the given type `T`.
   *
   * This method can be used to simplify excessively complex types to make TypeScript happy
   * and much faster.
   *
   * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
   * for TypeScript and you get errors like this:
   *
   * ```
   * error TS2589: Type instantiation is excessively deep and possibly infinite.
   * ```
   *
   * In these case you can often use this method to help TypeScript a little bit. When you use this
   * method to assert the output type of a query, Kysely can drop the complex output type that
   * consists of multiple nested helper types and replace it with the simple asserted type.
   *
   * Using this method doesn't reduce type safety at all. You have to pass in a type that is
   * structurally equal to the current type.
   *
   * ### Examples
   *
   * ```ts
   * import type { Species } from 'type-editor' // imaginary module
   *
   * async function deletePersonAndPets(personId: number) {
   *   return await db
   *     .with('deleted_person', (qb) => qb
   *        .deleteFrom('person')
   *        .where('id', '=', personId)
   *        .returning('first_name')
   *        .$assertType<{ first_name: string }>()
   *     )
   *     .with('deleted_pets', (qb) => qb
   *       .deleteFrom('pet')
   *       .where('owner_id', '=', personId)
   *       .returning(['name as pet_name', 'species'])
   *       .$assertType<{ pet_name: string, species: Species }>()
   *     )
   *     .selectFrom(['deleted_person', 'deleted_pets'])
   *     .selectAll()
   *     .execute()
   * }
   * ```
   */
  $assertType() {
    return new _DeleteQueryBuilder(__privateGet(this, _props7));
  }
  /**
   * Returns a copy of this DeleteQueryBuilder instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      executor: __privateGet(this, _props7).executor.withPlugin(plugin)
    });
  }
  toOperationNode() {
    return __privateGet(this, _props7).executor.transformQuery(__privateGet(this, _props7).queryNode, __privateGet(this, _props7).queryId);
  }
  compile() {
    return __privateGet(this, _props7).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props7).queryId);
  }
  /**
   * Executes the query and returns an array of rows.
   *
   * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
   */
  async execute() {
    const compiledQuery = this.compile();
    const result = await __privateGet(this, _props7).executor.executeQuery(compiledQuery, __privateGet(this, _props7).queryId);
    const { adapter } = __privateGet(this, _props7).executor;
    const query = compiledQuery.query;
    if (query.returning && adapter.supportsReturning || query.output && adapter.supportsOutput) {
      return result.rows;
    }
    return [
      new DeleteResult(
        // TODO: remove numUpdatedOrDeletedRows.
        result.numAffectedRows ?? result.numUpdatedOrDeletedRows ?? BigInt(0)
      )
    ];
  }
  /**
   * Executes the query and returns the first result or undefined if
   * the query returned no result.
   */
  async executeTakeFirst() {
    const [result] = await this.execute();
    return result;
  }
  /**
   * Executes the query and returns the first result or throws if
   * the query returned no result.
   *
   * By default an instance of {@link NoResultError} is thrown, but you can
   * provide a custom error class, or callback as the only argument to throw a different
   * error.
   */
  async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
    const result = await this.executeTakeFirst();
    if (result === void 0) {
      const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
      throw error;
    }
    return result;
  }
  async *stream(chunkSize = 100) {
    const compiledQuery = this.compile();
    const stream = __privateGet(this, _props7).executor.stream(compiledQuery, chunkSize, __privateGet(this, _props7).queryId);
    for await (const item of stream) {
      yield* item.rows;
    }
  }
  async explain(format, options) {
    const builder = new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithExplain(__privateGet(this, _props7).queryNode, format, options)
    });
    return await builder.execute();
  }
};
_props7 = new WeakMap();
let DeleteQueryBuilder = _DeleteQueryBuilder;
preventAwait(DeleteQueryBuilder, "don't await DeleteQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
class UpdateResult {
  constructor(numUpdatedRows, numChangedRows) {
    /**
     * The number of rows the update query updated (even if not changed).
     */
    __publicField(this, "numUpdatedRows");
    /**
     * The number of rows the update query changed.
     *
     * This is **optional** and only supported in dialects such as MySQL.
     * You would probably use {@link numUpdatedRows} in most cases.
     */
    __publicField(this, "numChangedRows");
    this.numUpdatedRows = numUpdatedRows;
    this.numChangedRows = numChangedRows;
  }
}
const _UpdateQueryBuilder = class _UpdateQueryBuilder {
  constructor(props) {
    __privateAdd(this, _props8);
    __privateSet(this, _props8, freeze(props));
  }
  where(...args) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props8).queryNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  whereRef(lhs, op, rhs) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props8).queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  clearWhere() {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithoutWhere(__privateGet(this, _props8).queryNode)
    });
  }
  /**
   * Changes an `update` query into a `update top` query.
   *
   * `top` clause is only supported by some dialects like MS SQL Server.
   *
   * ### Examples
   *
   * Update the first row:
   *
   * ```ts
   * await db.updateTable('person')
   *   .top(1)
   *   .set({ first_name: 'Foo' })
   *   .where('age', '>', 18)
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * update top(1) "person" set "first_name" = @1 where "age" > @2
   * ```
   *
   * Update the 50% first rows:
   *
   * ```ts
   * await db.updateTable('person')
   *   .top(50, 'percent')
   *   .set({ first_name: 'Foo' })
   *   .where('age', '>', 18)
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * update top(50) percent "person" set "first_name" = @1 where "age" > @2
   * ```
   */
  top(expression, modifiers) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithTop(__privateGet(this, _props8).queryNode, parseTop(expression, modifiers))
    });
  }
  from(from) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: UpdateQueryNode.cloneWithFromItems(__privateGet(this, _props8).queryNode, parseTableExpressionOrList(from))
    });
  }
  innerJoin(...args) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props8).queryNode, parseJoin("InnerJoin", args))
    });
  }
  leftJoin(...args) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props8).queryNode, parseJoin("LeftJoin", args))
    });
  }
  rightJoin(...args) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props8).queryNode, parseJoin("RightJoin", args))
    });
  }
  fullJoin(...args) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props8).queryNode, parseJoin("FullJoin", args))
    });
  }
  /**
   * Adds a limit clause to the update query for supported databases, such as MySQL.
   *
   * ### Examples
   *
   * Update the first 2 rows in the 'person' table:
   *
   * ```ts
   * await db
   *   .updateTable('person')
   *   .set({ first_name: 'Foo' })
   *   .limit(2)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * update `person` set `first_name` = ? limit ?
   * ```
   */
  limit(limit) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: UpdateQueryNode.cloneWithLimit(__privateGet(this, _props8).queryNode, LimitNode.create(parseValueExpression(limit)))
    });
  }
  set(...args) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: UpdateQueryNode.cloneWithUpdates(__privateGet(this, _props8).queryNode, parseUpdate(...args))
    });
  }
  returning(selection) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithReturning(__privateGet(this, _props8).queryNode, parseSelectArg(selection))
    });
  }
  returningAll(table) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithReturning(__privateGet(this, _props8).queryNode, parseSelectAll(table))
    });
  }
  output(args) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithOutput(__privateGet(this, _props8).queryNode, parseSelectArg(args))
    });
  }
  outputAll(table) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithOutput(__privateGet(this, _props8).queryNode, parseSelectAll(table))
    });
  }
  /**
   * This can be used to add any additional SQL to the end of the query.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.updateTable('person')
   *   .set({ age: 39 })
   *   .where('first_name', '=', 'John')
   *   .modifyEnd(sql.raw('-- This is a comment'))
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * update `person`
   * set `age` = 39
   * where `first_name` = "John" -- This is a comment
   * ```
   */
  modifyEnd(modifier) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithEndModifier(__privateGet(this, _props8).queryNode, modifier.toOperationNode())
    });
  }
  /**
   * Clears all `returning` clauses from the query.
   *
   * ### Examples
   *
   * ```ts
   * db.updateTable('person')
   *   .returningAll()
   *   .set({ age: 39 })
   *   .where('first_name', '=', 'John')
   *   .clearReturning()
   * ```
   *
   * The generated SQL(PostgreSQL):
   *
   * ```sql
   * update "person" set "age" = 39 where "first_name" = "John"
   * ```
   */
  clearReturning() {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithoutReturning(__privateGet(this, _props8).queryNode)
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   *
   * If you want to conditionally call a method on `this`, see
   * the {@link $if} method.
   *
   * ### Examples
   *
   * The next example uses a helper function `log` to log a query:
   *
   * ```ts
   * import type { Compilable } from 'kysely'
   * import type { PersonUpdate } from 'type-editor' // imaginary module
   *
   * function log<T extends Compilable>(qb: T): T {
   *   console.log(qb.compile())
   *   return qb
   * }
   *
   * const values = {
   *   first_name: 'John',
   * } satisfies PersonUpdate
   *
   * db.updateTable('person')
   *   .set(values)
   *   .$call(log)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  /**
   * Call `func(this)` if `condition` is true.
   *
   * This method is especially handy with optional selects. Any `returning` or `returningAll`
   * method calls add columns as optional fields to the output type when called inside
   * the `func` callback. This is because we can't know if those selections were actually
   * made before running the code.
   *
   * You can also call any other methods inside the callback.
   *
   * ### Examples
   *
   * ```ts
   * import type { PersonUpdate } from 'type-editor' // imaginary module
   *
   * async function updatePerson(id: number, updates: PersonUpdate, returnLastName: boolean) {
   *   return await db
   *     .updateTable('person')
   *     .set(updates)
   *     .where('id', '=', id)
   *     .returning(['id', 'first_name'])
   *     .$if(returnLastName, (qb) => qb.returning('last_name'))
   *     .executeTakeFirstOrThrow()
   * }
   * ```
   *
   * Any selections added inside the `if` callback will be added as optional fields to the
   * output type since we can't know if the selections were actually made before running
   * the code. In the example above the return type of the `updatePerson` function is:
   *
   * ```ts
   * Promise<{
   *   id: number
   *   first_name: string
   *   last_name?: string
   * }>
   * ```
   */
  $if(condition, func) {
    if (condition) {
      return func(this);
    }
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8)
    });
  }
  /**
   * Change the output type of the query.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `UpdateQueryBuilder` with a new output type.
   */
  $castTo() {
    return new _UpdateQueryBuilder(__privateGet(this, _props8));
  }
  /**
   * Narrows (parts of) the output type of the query.
   *
   * Kysely tries to be as type-safe as possible, but in some cases we have to make
   * compromises for better maintainability and compilation performance. At present,
   * Kysely doesn't narrow the output type of the query based on {@link set} input
   * when using {@link where} and/or {@link returning} or {@link returningAll}.
   *
   * This utility method is very useful for these situations, as it removes unncessary
   * runtime assertion/guard code. Its input type is limited to the output type
   * of the query, so you can't add a column that doesn't exist, or change a column's
   * type to something that doesn't exist in its union type.
   *
   * ### Examples
   *
   * Turn this code:
   *
   * ```ts
   * import type { Person } from 'type-editor' // imaginary module
   *
   * const id = 1
   * const now = new Date().toISOString()
   *
   * const person = await db.updateTable('person')
   *   .set({ deleted_at: now })
   *   .where('id', '=', id)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .executeTakeFirstOrThrow()
   *
   * if (isWithNoNullValue(person)) {
   *   functionThatExpectsPersonWithNonNullValue(person)
   * }
   *
   * function isWithNoNullValue(person: Person): person is Person & { nullable_column: string } {
   *   return person.nullable_column != null
   * }
   * ```
   *
   * Into this:
   *
   * ```ts
   * import type { NotNull } from 'kysely'
   *
   * const id = 1
   * const now = new Date().toISOString()
   *
   * const person = await db.updateTable('person')
   *   .set({ deleted_at: now })
   *   .where('id', '=', id)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .$narrowType<{ deleted_at: Date; nullable_column: NotNull }>()
   *   .executeTakeFirstOrThrow()
   *
   * functionThatExpectsPersonWithNonNullValue(person)
   * ```
   */
  $narrowType() {
    return new _UpdateQueryBuilder(__privateGet(this, _props8));
  }
  /**
   * Asserts that query's output row type equals the given type `T`.
   *
   * This method can be used to simplify excessively complex types to make TypeScript happy
   * and much faster.
   *
   * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
   * for TypeScript and you get errors like this:
   *
   * ```
   * error TS2589: Type instantiation is excessively deep and possibly infinite.
   * ```
   *
   * In these case you can often use this method to help TypeScript a little bit. When you use this
   * method to assert the output type of a query, Kysely can drop the complex output type that
   * consists of multiple nested helper types and replace it with the simple asserted type.
   *
   * Using this method doesn't reduce type safety at all. You have to pass in a type that is
   * structurally equal to the current type.
   *
   * ### Examples
   *
   * ```ts
   * import type { PersonUpdate, PetUpdate, Species } from 'type-editor' // imaginary module
   *
   * const person = {
   *   id: 1,
   *   gender: 'other',
   * } satisfies PersonUpdate
   *
   * const pet = {
   *   name: 'Fluffy',
   * } satisfies PetUpdate
   *
   * const result = await db
   *   .with('updated_person', (qb) => qb
   *     .updateTable('person')
   *     .set(person)
   *     .where('id', '=', person.id)
   *     .returning('first_name')
   *     .$assertType<{ first_name: string }>()
   *   )
   *   .with('updated_pet', (qb) => qb
   *     .updateTable('pet')
   *     .set(pet)
   *     .where('owner_id', '=', person.id)
   *     .returning(['name as pet_name', 'species'])
   *     .$assertType<{ pet_name: string, species: Species }>()
   *   )
   *   .selectFrom(['updated_person', 'updated_pet'])
   *   .selectAll()
   *   .executeTakeFirstOrThrow()
   * ```
   */
  $assertType() {
    return new _UpdateQueryBuilder(__privateGet(this, _props8));
  }
  /**
   * Returns a copy of this UpdateQueryBuilder instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      executor: __privateGet(this, _props8).executor.withPlugin(plugin)
    });
  }
  toOperationNode() {
    return __privateGet(this, _props8).executor.transformQuery(__privateGet(this, _props8).queryNode, __privateGet(this, _props8).queryId);
  }
  compile() {
    return __privateGet(this, _props8).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props8).queryId);
  }
  /**
   * Executes the query and returns an array of rows.
   *
   * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
   */
  async execute() {
    const compiledQuery = this.compile();
    const result = await __privateGet(this, _props8).executor.executeQuery(compiledQuery, __privateGet(this, _props8).queryId);
    const { adapter } = __privateGet(this, _props8).executor;
    const query = compiledQuery.query;
    if (query.returning && adapter.supportsReturning || query.output && adapter.supportsOutput) {
      return result.rows;
    }
    return [
      new UpdateResult(
        // TODO: remove numUpdatedOrDeletedRows.
        // TODO: https://github.com/kysely-org/kysely/pull/431#discussion_r1172330899
        result.numAffectedRows ?? result.numUpdatedOrDeletedRows ?? BigInt(0),
        result.numChangedRows
      )
    ];
  }
  /**
   * Executes the query and returns the first result or undefined if
   * the query returned no result.
   */
  async executeTakeFirst() {
    const [result] = await this.execute();
    return result;
  }
  /**
   * Executes the query and returns the first result or throws if
   * the query returned no result.
   *
   * By default an instance of {@link NoResultError} is thrown, but you can
   * provide a custom error class, or callback as the only argument to throw a different
   * error.
   */
  async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
    const result = await this.executeTakeFirst();
    if (result === void 0) {
      const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
      throw error;
    }
    return result;
  }
  async *stream(chunkSize = 100) {
    const compiledQuery = this.compile();
    const stream = __privateGet(this, _props8).executor.stream(compiledQuery, chunkSize, __privateGet(this, _props8).queryId);
    for await (const item of stream) {
      yield* item.rows;
    }
  }
  async explain(format, options) {
    const builder = new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithExplain(__privateGet(this, _props8).queryNode, format, options)
    });
    return await builder.execute();
  }
};
_props8 = new WeakMap();
let UpdateQueryBuilder = _UpdateQueryBuilder;
preventAwait(UpdateQueryBuilder, "don't await UpdateQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
const CommonTableExpressionNameNode = freeze({
  is(node) {
    return node.kind === "CommonTableExpressionNameNode";
  },
  create(tableName, columnNames) {
    return freeze({
      kind: "CommonTableExpressionNameNode",
      table: TableNode.create(tableName),
      columns: columnNames ? freeze(columnNames.map(ColumnNode.create)) : void 0
    });
  }
});
const CommonTableExpressionNode = freeze({
  is(node) {
    return node.kind === "CommonTableExpressionNode";
  },
  create(name, expression) {
    return freeze({
      kind: "CommonTableExpressionNode",
      name,
      expression
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});
const _CTEBuilder = class _CTEBuilder {
  constructor(props) {
    __privateAdd(this, _props9);
    __privateSet(this, _props9, freeze(props));
  }
  /**
   * Makes the common table expression materialized.
   */
  materialized() {
    return new _CTEBuilder({
      ...__privateGet(this, _props9),
      node: CommonTableExpressionNode.cloneWith(__privateGet(this, _props9).node, {
        materialized: true
      })
    });
  }
  /**
   * Makes the common table expression not materialized.
   */
  notMaterialized() {
    return new _CTEBuilder({
      ...__privateGet(this, _props9),
      node: CommonTableExpressionNode.cloneWith(__privateGet(this, _props9).node, {
        materialized: false
      })
    });
  }
  toOperationNode() {
    return __privateGet(this, _props9).node;
  }
};
_props9 = new WeakMap();
let CTEBuilder = _CTEBuilder;
preventAwait(CTEBuilder, "don't await CTEBuilder instances. They are never executed directly and are always just a part of a query.");
function parseCommonTableExpression(nameOrBuilderCallback, expression) {
  const expressionNode = expression(createQueryCreator()).toOperationNode();
  if (isFunction(nameOrBuilderCallback)) {
    return nameOrBuilderCallback(cteBuilderFactory(expressionNode)).toOperationNode();
  }
  return CommonTableExpressionNode.create(parseCommonTableExpressionName(nameOrBuilderCallback), expressionNode);
}
function cteBuilderFactory(expressionNode) {
  return (name) => {
    return new CTEBuilder({
      node: CommonTableExpressionNode.create(parseCommonTableExpressionName(name), expressionNode)
    });
  };
}
function parseCommonTableExpressionName(name) {
  if (name.includes("(")) {
    const parts = name.split(/[\(\)]/);
    const table = parts[0];
    const columns = parts[1].split(",").map((it) => it.trim());
    return CommonTableExpressionNameNode.create(table, columns);
  } else {
    return CommonTableExpressionNameNode.create(name);
  }
}
const WithNode = freeze({
  is(node) {
    return node.kind === "WithNode";
  },
  create(expression, params) {
    return freeze({
      kind: "WithNode",
      expressions: freeze([expression]),
      ...params
    });
  },
  cloneWithExpression(withNode, expression) {
    return freeze({
      ...withNode,
      expressions: freeze([...withNode.expressions, expression])
    });
  }
});
const CHARS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
];
function randomString(length) {
  let chars = "";
  for (let i = 0; i < length; ++i) {
    chars += randomChar();
  }
  return chars;
}
function randomChar() {
  return CHARS[~~(Math.random() * CHARS.length)];
}
function createQueryId() {
  return new LazyQueryId();
}
class LazyQueryId {
  constructor() {
    __privateAdd(this, _queryId);
  }
  get queryId() {
    if (__privateGet(this, _queryId) === void 0) {
      __privateSet(this, _queryId, randomString(8));
    }
    return __privateGet(this, _queryId);
  }
}
_queryId = new WeakMap();
function requireAllProps(obj) {
  return obj;
}
class OperationNodeTransformer {
  constructor() {
    __publicField(this, "nodeStack", []);
    __privateAdd(this, _transformers, freeze({
      AliasNode: this.transformAlias.bind(this),
      ColumnNode: this.transformColumn.bind(this),
      IdentifierNode: this.transformIdentifier.bind(this),
      SchemableIdentifierNode: this.transformSchemableIdentifier.bind(this),
      RawNode: this.transformRaw.bind(this),
      ReferenceNode: this.transformReference.bind(this),
      SelectQueryNode: this.transformSelectQuery.bind(this),
      SelectionNode: this.transformSelection.bind(this),
      TableNode: this.transformTable.bind(this),
      FromNode: this.transformFrom.bind(this),
      SelectAllNode: this.transformSelectAll.bind(this),
      AndNode: this.transformAnd.bind(this),
      OrNode: this.transformOr.bind(this),
      ValueNode: this.transformValue.bind(this),
      ValueListNode: this.transformValueList.bind(this),
      PrimitiveValueListNode: this.transformPrimitiveValueList.bind(this),
      ParensNode: this.transformParens.bind(this),
      JoinNode: this.transformJoin.bind(this),
      OperatorNode: this.transformOperator.bind(this),
      WhereNode: this.transformWhere.bind(this),
      InsertQueryNode: this.transformInsertQuery.bind(this),
      DeleteQueryNode: this.transformDeleteQuery.bind(this),
      ReturningNode: this.transformReturning.bind(this),
      CreateTableNode: this.transformCreateTable.bind(this),
      AddColumnNode: this.transformAddColumn.bind(this),
      ColumnDefinitionNode: this.transformColumnDefinition.bind(this),
      DropTableNode: this.transformDropTable.bind(this),
      DataTypeNode: this.transformDataType.bind(this),
      OrderByNode: this.transformOrderBy.bind(this),
      OrderByItemNode: this.transformOrderByItem.bind(this),
      GroupByNode: this.transformGroupBy.bind(this),
      GroupByItemNode: this.transformGroupByItem.bind(this),
      UpdateQueryNode: this.transformUpdateQuery.bind(this),
      ColumnUpdateNode: this.transformColumnUpdate.bind(this),
      LimitNode: this.transformLimit.bind(this),
      OffsetNode: this.transformOffset.bind(this),
      OnConflictNode: this.transformOnConflict.bind(this),
      OnDuplicateKeyNode: this.transformOnDuplicateKey.bind(this),
      CreateIndexNode: this.transformCreateIndex.bind(this),
      DropIndexNode: this.transformDropIndex.bind(this),
      ListNode: this.transformList.bind(this),
      PrimaryKeyConstraintNode: this.transformPrimaryKeyConstraint.bind(this),
      UniqueConstraintNode: this.transformUniqueConstraint.bind(this),
      ReferencesNode: this.transformReferences.bind(this),
      CheckConstraintNode: this.transformCheckConstraint.bind(this),
      WithNode: this.transformWith.bind(this),
      CommonTableExpressionNode: this.transformCommonTableExpression.bind(this),
      CommonTableExpressionNameNode: this.transformCommonTableExpressionName.bind(this),
      HavingNode: this.transformHaving.bind(this),
      CreateSchemaNode: this.transformCreateSchema.bind(this),
      DropSchemaNode: this.transformDropSchema.bind(this),
      AlterTableNode: this.transformAlterTable.bind(this),
      DropColumnNode: this.transformDropColumn.bind(this),
      RenameColumnNode: this.transformRenameColumn.bind(this),
      AlterColumnNode: this.transformAlterColumn.bind(this),
      ModifyColumnNode: this.transformModifyColumn.bind(this),
      AddConstraintNode: this.transformAddConstraint.bind(this),
      DropConstraintNode: this.transformDropConstraint.bind(this),
      ForeignKeyConstraintNode: this.transformForeignKeyConstraint.bind(this),
      CreateViewNode: this.transformCreateView.bind(this),
      DropViewNode: this.transformDropView.bind(this),
      GeneratedNode: this.transformGenerated.bind(this),
      DefaultValueNode: this.transformDefaultValue.bind(this),
      OnNode: this.transformOn.bind(this),
      ValuesNode: this.transformValues.bind(this),
      SelectModifierNode: this.transformSelectModifier.bind(this),
      CreateTypeNode: this.transformCreateType.bind(this),
      DropTypeNode: this.transformDropType.bind(this),
      ExplainNode: this.transformExplain.bind(this),
      DefaultInsertValueNode: this.transformDefaultInsertValue.bind(this),
      AggregateFunctionNode: this.transformAggregateFunction.bind(this),
      OverNode: this.transformOver.bind(this),
      PartitionByNode: this.transformPartitionBy.bind(this),
      PartitionByItemNode: this.transformPartitionByItem.bind(this),
      SetOperationNode: this.transformSetOperation.bind(this),
      BinaryOperationNode: this.transformBinaryOperation.bind(this),
      UnaryOperationNode: this.transformUnaryOperation.bind(this),
      UsingNode: this.transformUsing.bind(this),
      FunctionNode: this.transformFunction.bind(this),
      CaseNode: this.transformCase.bind(this),
      WhenNode: this.transformWhen.bind(this),
      JSONReferenceNode: this.transformJSONReference.bind(this),
      JSONPathNode: this.transformJSONPath.bind(this),
      JSONPathLegNode: this.transformJSONPathLeg.bind(this),
      JSONOperatorChainNode: this.transformJSONOperatorChain.bind(this),
      TupleNode: this.transformTuple.bind(this),
      MergeQueryNode: this.transformMergeQuery.bind(this),
      MatchedNode: this.transformMatched.bind(this),
      AddIndexNode: this.transformAddIndex.bind(this),
      CastNode: this.transformCast.bind(this),
      FetchNode: this.transformFetch.bind(this),
      TopNode: this.transformTop.bind(this),
      OutputNode: this.transformOutput.bind(this)
    }));
  }
  transformNode(node) {
    if (!node) {
      return node;
    }
    this.nodeStack.push(node);
    const out = this.transformNodeImpl(node);
    this.nodeStack.pop();
    return freeze(out);
  }
  transformNodeImpl(node) {
    return __privateGet(this, _transformers)[node.kind](node);
  }
  transformNodeList(list) {
    if (!list) {
      return list;
    }
    return freeze(list.map((node) => this.transformNode(node)));
  }
  transformSelectQuery(node) {
    return requireAllProps({
      kind: "SelectQueryNode",
      from: this.transformNode(node.from),
      selections: this.transformNodeList(node.selections),
      distinctOn: this.transformNodeList(node.distinctOn),
      joins: this.transformNodeList(node.joins),
      groupBy: this.transformNode(node.groupBy),
      orderBy: this.transformNode(node.orderBy),
      where: this.transformNode(node.where),
      frontModifiers: this.transformNodeList(node.frontModifiers),
      endModifiers: this.transformNodeList(node.endModifiers),
      limit: this.transformNode(node.limit),
      offset: this.transformNode(node.offset),
      with: this.transformNode(node.with),
      having: this.transformNode(node.having),
      explain: this.transformNode(node.explain),
      setOperations: this.transformNodeList(node.setOperations),
      fetch: this.transformNode(node.fetch),
      top: this.transformNode(node.top)
    });
  }
  transformSelection(node) {
    return requireAllProps({
      kind: "SelectionNode",
      selection: this.transformNode(node.selection)
    });
  }
  transformColumn(node) {
    return requireAllProps({
      kind: "ColumnNode",
      column: this.transformNode(node.column)
    });
  }
  transformAlias(node) {
    return requireAllProps({
      kind: "AliasNode",
      node: this.transformNode(node.node),
      alias: this.transformNode(node.alias)
    });
  }
  transformTable(node) {
    return requireAllProps({
      kind: "TableNode",
      table: this.transformNode(node.table)
    });
  }
  transformFrom(node) {
    return requireAllProps({
      kind: "FromNode",
      froms: this.transformNodeList(node.froms)
    });
  }
  transformReference(node) {
    return requireAllProps({
      kind: "ReferenceNode",
      column: this.transformNode(node.column),
      table: this.transformNode(node.table)
    });
  }
  transformAnd(node) {
    return requireAllProps({
      kind: "AndNode",
      left: this.transformNode(node.left),
      right: this.transformNode(node.right)
    });
  }
  transformOr(node) {
    return requireAllProps({
      kind: "OrNode",
      left: this.transformNode(node.left),
      right: this.transformNode(node.right)
    });
  }
  transformValueList(node) {
    return requireAllProps({
      kind: "ValueListNode",
      values: this.transformNodeList(node.values)
    });
  }
  transformParens(node) {
    return requireAllProps({
      kind: "ParensNode",
      node: this.transformNode(node.node)
    });
  }
  transformJoin(node) {
    return requireAllProps({
      kind: "JoinNode",
      joinType: node.joinType,
      table: this.transformNode(node.table),
      on: this.transformNode(node.on)
    });
  }
  transformRaw(node) {
    return requireAllProps({
      kind: "RawNode",
      sqlFragments: freeze([...node.sqlFragments]),
      parameters: this.transformNodeList(node.parameters)
    });
  }
  transformWhere(node) {
    return requireAllProps({
      kind: "WhereNode",
      where: this.transformNode(node.where)
    });
  }
  transformInsertQuery(node) {
    return requireAllProps({
      kind: "InsertQueryNode",
      into: this.transformNode(node.into),
      columns: this.transformNodeList(node.columns),
      values: this.transformNode(node.values),
      returning: this.transformNode(node.returning),
      onConflict: this.transformNode(node.onConflict),
      onDuplicateKey: this.transformNode(node.onDuplicateKey),
      endModifiers: this.transformNodeList(node.endModifiers),
      with: this.transformNode(node.with),
      ignore: node.ignore,
      replace: node.replace,
      explain: this.transformNode(node.explain),
      defaultValues: node.defaultValues,
      top: this.transformNode(node.top),
      output: this.transformNode(node.output)
    });
  }
  transformValues(node) {
    return requireAllProps({
      kind: "ValuesNode",
      values: this.transformNodeList(node.values)
    });
  }
  transformDeleteQuery(node) {
    return requireAllProps({
      kind: "DeleteQueryNode",
      from: this.transformNode(node.from),
      using: this.transformNode(node.using),
      joins: this.transformNodeList(node.joins),
      where: this.transformNode(node.where),
      returning: this.transformNode(node.returning),
      endModifiers: this.transformNodeList(node.endModifiers),
      with: this.transformNode(node.with),
      orderBy: this.transformNode(node.orderBy),
      limit: this.transformNode(node.limit),
      explain: this.transformNode(node.explain),
      top: this.transformNode(node.top),
      output: this.transformNode(node.output)
    });
  }
  transformReturning(node) {
    return requireAllProps({
      kind: "ReturningNode",
      selections: this.transformNodeList(node.selections)
    });
  }
  transformCreateTable(node) {
    return requireAllProps({
      kind: "CreateTableNode",
      table: this.transformNode(node.table),
      columns: this.transformNodeList(node.columns),
      constraints: this.transformNodeList(node.constraints),
      temporary: node.temporary,
      ifNotExists: node.ifNotExists,
      onCommit: node.onCommit,
      frontModifiers: this.transformNodeList(node.frontModifiers),
      endModifiers: this.transformNodeList(node.endModifiers),
      selectQuery: this.transformNode(node.selectQuery)
    });
  }
  transformColumnDefinition(node) {
    return requireAllProps({
      kind: "ColumnDefinitionNode",
      column: this.transformNode(node.column),
      dataType: this.transformNode(node.dataType),
      references: this.transformNode(node.references),
      primaryKey: node.primaryKey,
      autoIncrement: node.autoIncrement,
      unique: node.unique,
      notNull: node.notNull,
      unsigned: node.unsigned,
      defaultTo: this.transformNode(node.defaultTo),
      check: this.transformNode(node.check),
      generated: this.transformNode(node.generated),
      frontModifiers: this.transformNodeList(node.frontModifiers),
      endModifiers: this.transformNodeList(node.endModifiers),
      nullsNotDistinct: node.nullsNotDistinct,
      identity: node.identity,
      ifNotExists: node.ifNotExists
    });
  }
  transformAddColumn(node) {
    return requireAllProps({
      kind: "AddColumnNode",
      column: this.transformNode(node.column)
    });
  }
  transformDropTable(node) {
    return requireAllProps({
      kind: "DropTableNode",
      table: this.transformNode(node.table),
      ifExists: node.ifExists,
      cascade: node.cascade
    });
  }
  transformOrderBy(node) {
    return requireAllProps({
      kind: "OrderByNode",
      items: this.transformNodeList(node.items)
    });
  }
  transformOrderByItem(node) {
    return requireAllProps({
      kind: "OrderByItemNode",
      orderBy: this.transformNode(node.orderBy),
      direction: this.transformNode(node.direction)
    });
  }
  transformGroupBy(node) {
    return requireAllProps({
      kind: "GroupByNode",
      items: this.transformNodeList(node.items)
    });
  }
  transformGroupByItem(node) {
    return requireAllProps({
      kind: "GroupByItemNode",
      groupBy: this.transformNode(node.groupBy)
    });
  }
  transformUpdateQuery(node) {
    return requireAllProps({
      kind: "UpdateQueryNode",
      table: this.transformNode(node.table),
      from: this.transformNode(node.from),
      joins: this.transformNodeList(node.joins),
      where: this.transformNode(node.where),
      updates: this.transformNodeList(node.updates),
      returning: this.transformNode(node.returning),
      endModifiers: this.transformNodeList(node.endModifiers),
      with: this.transformNode(node.with),
      explain: this.transformNode(node.explain),
      limit: this.transformNode(node.limit),
      top: this.transformNode(node.top),
      output: this.transformNode(node.output)
    });
  }
  transformColumnUpdate(node) {
    return requireAllProps({
      kind: "ColumnUpdateNode",
      column: this.transformNode(node.column),
      value: this.transformNode(node.value)
    });
  }
  transformLimit(node) {
    return requireAllProps({
      kind: "LimitNode",
      limit: this.transformNode(node.limit)
    });
  }
  transformOffset(node) {
    return requireAllProps({
      kind: "OffsetNode",
      offset: this.transformNode(node.offset)
    });
  }
  transformOnConflict(node) {
    return requireAllProps({
      kind: "OnConflictNode",
      columns: this.transformNodeList(node.columns),
      constraint: this.transformNode(node.constraint),
      indexExpression: this.transformNode(node.indexExpression),
      indexWhere: this.transformNode(node.indexWhere),
      updates: this.transformNodeList(node.updates),
      updateWhere: this.transformNode(node.updateWhere),
      doNothing: node.doNothing
    });
  }
  transformOnDuplicateKey(node) {
    return requireAllProps({
      kind: "OnDuplicateKeyNode",
      updates: this.transformNodeList(node.updates)
    });
  }
  transformCreateIndex(node) {
    return requireAllProps({
      kind: "CreateIndexNode",
      name: this.transformNode(node.name),
      table: this.transformNode(node.table),
      columns: this.transformNodeList(node.columns),
      unique: node.unique,
      using: this.transformNode(node.using),
      ifNotExists: node.ifNotExists,
      where: this.transformNode(node.where),
      nullsNotDistinct: node.nullsNotDistinct
    });
  }
  transformList(node) {
    return requireAllProps({
      kind: "ListNode",
      items: this.transformNodeList(node.items)
    });
  }
  transformDropIndex(node) {
    return requireAllProps({
      kind: "DropIndexNode",
      name: this.transformNode(node.name),
      table: this.transformNode(node.table),
      ifExists: node.ifExists,
      cascade: node.cascade
    });
  }
  transformPrimaryKeyConstraint(node) {
    return requireAllProps({
      kind: "PrimaryKeyConstraintNode",
      columns: this.transformNodeList(node.columns),
      name: this.transformNode(node.name)
    });
  }
  transformUniqueConstraint(node) {
    return requireAllProps({
      kind: "UniqueConstraintNode",
      columns: this.transformNodeList(node.columns),
      name: this.transformNode(node.name),
      nullsNotDistinct: node.nullsNotDistinct
    });
  }
  transformForeignKeyConstraint(node) {
    return requireAllProps({
      kind: "ForeignKeyConstraintNode",
      columns: this.transformNodeList(node.columns),
      references: this.transformNode(node.references),
      name: this.transformNode(node.name),
      onDelete: node.onDelete,
      onUpdate: node.onUpdate
    });
  }
  transformSetOperation(node) {
    return requireAllProps({
      kind: "SetOperationNode",
      operator: node.operator,
      expression: this.transformNode(node.expression),
      all: node.all
    });
  }
  transformReferences(node) {
    return requireAllProps({
      kind: "ReferencesNode",
      table: this.transformNode(node.table),
      columns: this.transformNodeList(node.columns),
      onDelete: node.onDelete,
      onUpdate: node.onUpdate
    });
  }
  transformCheckConstraint(node) {
    return requireAllProps({
      kind: "CheckConstraintNode",
      expression: this.transformNode(node.expression),
      name: this.transformNode(node.name)
    });
  }
  transformWith(node) {
    return requireAllProps({
      kind: "WithNode",
      expressions: this.transformNodeList(node.expressions),
      recursive: node.recursive
    });
  }
  transformCommonTableExpression(node) {
    return requireAllProps({
      kind: "CommonTableExpressionNode",
      name: this.transformNode(node.name),
      materialized: node.materialized,
      expression: this.transformNode(node.expression)
    });
  }
  transformCommonTableExpressionName(node) {
    return requireAllProps({
      kind: "CommonTableExpressionNameNode",
      table: this.transformNode(node.table),
      columns: this.transformNodeList(node.columns)
    });
  }
  transformHaving(node) {
    return requireAllProps({
      kind: "HavingNode",
      having: this.transformNode(node.having)
    });
  }
  transformCreateSchema(node) {
    return requireAllProps({
      kind: "CreateSchemaNode",
      schema: this.transformNode(node.schema),
      ifNotExists: node.ifNotExists
    });
  }
  transformDropSchema(node) {
    return requireAllProps({
      kind: "DropSchemaNode",
      schema: this.transformNode(node.schema),
      ifExists: node.ifExists,
      cascade: node.cascade
    });
  }
  transformAlterTable(node) {
    return requireAllProps({
      kind: "AlterTableNode",
      table: this.transformNode(node.table),
      renameTo: this.transformNode(node.renameTo),
      setSchema: this.transformNode(node.setSchema),
      columnAlterations: this.transformNodeList(node.columnAlterations),
      addConstraint: this.transformNode(node.addConstraint),
      dropConstraint: this.transformNode(node.dropConstraint),
      addIndex: this.transformNode(node.addIndex),
      dropIndex: this.transformNode(node.dropIndex)
    });
  }
  transformDropColumn(node) {
    return requireAllProps({
      kind: "DropColumnNode",
      column: this.transformNode(node.column)
    });
  }
  transformRenameColumn(node) {
    return requireAllProps({
      kind: "RenameColumnNode",
      column: this.transformNode(node.column),
      renameTo: this.transformNode(node.renameTo)
    });
  }
  transformAlterColumn(node) {
    return requireAllProps({
      kind: "AlterColumnNode",
      column: this.transformNode(node.column),
      dataType: this.transformNode(node.dataType),
      dataTypeExpression: this.transformNode(node.dataTypeExpression),
      setDefault: this.transformNode(node.setDefault),
      dropDefault: node.dropDefault,
      setNotNull: node.setNotNull,
      dropNotNull: node.dropNotNull
    });
  }
  transformModifyColumn(node) {
    return requireAllProps({
      kind: "ModifyColumnNode",
      column: this.transformNode(node.column)
    });
  }
  transformAddConstraint(node) {
    return requireAllProps({
      kind: "AddConstraintNode",
      constraint: this.transformNode(node.constraint)
    });
  }
  transformDropConstraint(node) {
    return requireAllProps({
      kind: "DropConstraintNode",
      constraintName: this.transformNode(node.constraintName),
      ifExists: node.ifExists,
      modifier: node.modifier
    });
  }
  transformCreateView(node) {
    return requireAllProps({
      kind: "CreateViewNode",
      name: this.transformNode(node.name),
      temporary: node.temporary,
      orReplace: node.orReplace,
      ifNotExists: node.ifNotExists,
      materialized: node.materialized,
      columns: this.transformNodeList(node.columns),
      as: this.transformNode(node.as)
    });
  }
  transformDropView(node) {
    return requireAllProps({
      kind: "DropViewNode",
      name: this.transformNode(node.name),
      ifExists: node.ifExists,
      materialized: node.materialized,
      cascade: node.cascade
    });
  }
  transformGenerated(node) {
    return requireAllProps({
      kind: "GeneratedNode",
      byDefault: node.byDefault,
      always: node.always,
      identity: node.identity,
      stored: node.stored,
      expression: this.transformNode(node.expression)
    });
  }
  transformDefaultValue(node) {
    return requireAllProps({
      kind: "DefaultValueNode",
      defaultValue: this.transformNode(node.defaultValue)
    });
  }
  transformOn(node) {
    return requireAllProps({
      kind: "OnNode",
      on: this.transformNode(node.on)
    });
  }
  transformSelectModifier(node) {
    return requireAllProps({
      kind: "SelectModifierNode",
      modifier: node.modifier,
      rawModifier: this.transformNode(node.rawModifier),
      of: this.transformNodeList(node.of)
    });
  }
  transformCreateType(node) {
    return requireAllProps({
      kind: "CreateTypeNode",
      name: this.transformNode(node.name),
      enum: this.transformNode(node.enum)
    });
  }
  transformDropType(node) {
    return requireAllProps({
      kind: "DropTypeNode",
      name: this.transformNode(node.name),
      ifExists: node.ifExists
    });
  }
  transformExplain(node) {
    return requireAllProps({
      kind: "ExplainNode",
      format: node.format,
      options: this.transformNode(node.options)
    });
  }
  transformSchemableIdentifier(node) {
    return requireAllProps({
      kind: "SchemableIdentifierNode",
      schema: this.transformNode(node.schema),
      identifier: this.transformNode(node.identifier)
    });
  }
  transformAggregateFunction(node) {
    return requireAllProps({
      kind: "AggregateFunctionNode",
      aggregated: this.transformNodeList(node.aggregated),
      distinct: node.distinct,
      orderBy: this.transformNode(node.orderBy),
      filter: this.transformNode(node.filter),
      func: node.func,
      over: this.transformNode(node.over)
    });
  }
  transformOver(node) {
    return requireAllProps({
      kind: "OverNode",
      orderBy: this.transformNode(node.orderBy),
      partitionBy: this.transformNode(node.partitionBy)
    });
  }
  transformPartitionBy(node) {
    return requireAllProps({
      kind: "PartitionByNode",
      items: this.transformNodeList(node.items)
    });
  }
  transformPartitionByItem(node) {
    return requireAllProps({
      kind: "PartitionByItemNode",
      partitionBy: this.transformNode(node.partitionBy)
    });
  }
  transformBinaryOperation(node) {
    return requireAllProps({
      kind: "BinaryOperationNode",
      leftOperand: this.transformNode(node.leftOperand),
      operator: this.transformNode(node.operator),
      rightOperand: this.transformNode(node.rightOperand)
    });
  }
  transformUnaryOperation(node) {
    return requireAllProps({
      kind: "UnaryOperationNode",
      operator: this.transformNode(node.operator),
      operand: this.transformNode(node.operand)
    });
  }
  transformUsing(node) {
    return requireAllProps({
      kind: "UsingNode",
      tables: this.transformNodeList(node.tables)
    });
  }
  transformFunction(node) {
    return requireAllProps({
      kind: "FunctionNode",
      func: node.func,
      arguments: this.transformNodeList(node.arguments)
    });
  }
  transformCase(node) {
    return requireAllProps({
      kind: "CaseNode",
      value: this.transformNode(node.value),
      when: this.transformNodeList(node.when),
      else: this.transformNode(node.else),
      isStatement: node.isStatement
    });
  }
  transformWhen(node) {
    return requireAllProps({
      kind: "WhenNode",
      condition: this.transformNode(node.condition),
      result: this.transformNode(node.result)
    });
  }
  transformJSONReference(node) {
    return requireAllProps({
      kind: "JSONReferenceNode",
      reference: this.transformNode(node.reference),
      traversal: this.transformNode(node.traversal)
    });
  }
  transformJSONPath(node) {
    return requireAllProps({
      kind: "JSONPathNode",
      inOperator: this.transformNode(node.inOperator),
      pathLegs: this.transformNodeList(node.pathLegs)
    });
  }
  transformJSONPathLeg(node) {
    return requireAllProps({
      kind: "JSONPathLegNode",
      type: node.type,
      value: node.value
    });
  }
  transformJSONOperatorChain(node) {
    return requireAllProps({
      kind: "JSONOperatorChainNode",
      operator: this.transformNode(node.operator),
      values: this.transformNodeList(node.values)
    });
  }
  transformTuple(node) {
    return requireAllProps({
      kind: "TupleNode",
      values: this.transformNodeList(node.values)
    });
  }
  transformMergeQuery(node) {
    return requireAllProps({
      kind: "MergeQueryNode",
      into: this.transformNode(node.into),
      using: this.transformNode(node.using),
      whens: this.transformNodeList(node.whens),
      with: this.transformNode(node.with),
      top: this.transformNode(node.top),
      endModifiers: this.transformNodeList(node.endModifiers),
      output: this.transformNode(node.output)
    });
  }
  transformMatched(node) {
    return requireAllProps({
      kind: "MatchedNode",
      not: node.not,
      bySource: node.bySource
    });
  }
  transformAddIndex(node) {
    return requireAllProps({
      kind: "AddIndexNode",
      name: this.transformNode(node.name),
      columns: this.transformNodeList(node.columns),
      unique: node.unique,
      using: this.transformNode(node.using),
      ifNotExists: node.ifNotExists
    });
  }
  transformCast(node) {
    return requireAllProps({
      kind: "CastNode",
      expression: this.transformNode(node.expression),
      dataType: this.transformNode(node.dataType)
    });
  }
  transformFetch(node) {
    return requireAllProps({
      kind: "FetchNode",
      rowCount: this.transformNode(node.rowCount),
      modifier: node.modifier
    });
  }
  transformTop(node) {
    return requireAllProps({
      kind: "TopNode",
      expression: node.expression,
      modifiers: node.modifiers
    });
  }
  transformOutput(node) {
    return requireAllProps({
      kind: "OutputNode",
      selections: this.transformNodeList(node.selections)
    });
  }
  transformDataType(node) {
    return node;
  }
  transformSelectAll(node) {
    return node;
  }
  transformIdentifier(node) {
    return node;
  }
  transformValue(node) {
    return node;
  }
  transformPrimitiveValueList(node) {
    return node;
  }
  transformOperator(node) {
    return node;
  }
  transformDefaultInsertValue(node) {
    return node;
  }
}
_transformers = new WeakMap();
const ROOT_OPERATION_NODES = freeze({
  AlterTableNode: true,
  CreateIndexNode: true,
  CreateSchemaNode: true,
  CreateTableNode: true,
  CreateTypeNode: true,
  CreateViewNode: true,
  DeleteQueryNode: true,
  DropIndexNode: true,
  DropSchemaNode: true,
  DropTableNode: true,
  DropTypeNode: true,
  DropViewNode: true,
  InsertQueryNode: true,
  RawNode: true,
  SelectQueryNode: true,
  UpdateQueryNode: true,
  MergeQueryNode: true
});
class WithSchemaTransformer extends OperationNodeTransformer {
  constructor(schema) {
    super();
    __privateAdd(this, _WithSchemaTransformer_instances);
    __privateAdd(this, _schema);
    __privateAdd(this, _schemableIds, /* @__PURE__ */ new Set());
    __privateAdd(this, _ctes, /* @__PURE__ */ new Set());
    __privateSet(this, _schema, schema);
  }
  transformNodeImpl(node) {
    if (!__privateMethod(this, _WithSchemaTransformer_instances, isRootOperationNode_fn).call(this, node)) {
      return super.transformNodeImpl(node);
    }
    const ctes = __privateMethod(this, _WithSchemaTransformer_instances, collectCTEs_fn).call(this, node);
    for (const cte of ctes) {
      __privateGet(this, _ctes).add(cte);
    }
    const tables2 = __privateMethod(this, _WithSchemaTransformer_instances, collectSchemableIds_fn).call(this, node);
    for (const table of tables2) {
      __privateGet(this, _schemableIds).add(table);
    }
    const transformed = super.transformNodeImpl(node);
    for (const table of tables2) {
      __privateGet(this, _schemableIds).delete(table);
    }
    for (const cte of ctes) {
      __privateGet(this, _ctes).delete(cte);
    }
    return transformed;
  }
  transformSchemableIdentifier(node) {
    const transformed = super.transformSchemableIdentifier(node);
    if (transformed.schema || !__privateGet(this, _schemableIds).has(node.identifier.name)) {
      return transformed;
    }
    return {
      ...transformed,
      schema: IdentifierNode.create(__privateGet(this, _schema))
    };
  }
  transformReferences(node) {
    const transformed = super.transformReferences(node);
    if (transformed.table.table.schema) {
      return transformed;
    }
    return {
      ...transformed,
      table: TableNode.createWithSchema(__privateGet(this, _schema), transformed.table.table.identifier.name)
    };
  }
}
_schema = new WeakMap();
_schemableIds = new WeakMap();
_ctes = new WeakMap();
_WithSchemaTransformer_instances = new WeakSet();
isRootOperationNode_fn = function(node) {
  return node.kind in ROOT_OPERATION_NODES;
};
collectSchemableIds_fn = function(node) {
  const schemableIds = /* @__PURE__ */ new Set();
  if ("name" in node && node.name && SchemableIdentifierNode.is(node.name)) {
    __privateMethod(this, _WithSchemaTransformer_instances, collectSchemableId_fn).call(this, node.name, schemableIds);
  }
  if ("from" in node && node.from) {
    for (const from of node.from.froms) {
      __privateMethod(this, _WithSchemaTransformer_instances, collectSchemableIdsFromTableExpr_fn).call(this, from, schemableIds);
    }
  }
  if ("into" in node && node.into) {
    __privateMethod(this, _WithSchemaTransformer_instances, collectSchemableIdsFromTableExpr_fn).call(this, node.into, schemableIds);
  }
  if ("table" in node && node.table) {
    __privateMethod(this, _WithSchemaTransformer_instances, collectSchemableIdsFromTableExpr_fn).call(this, node.table, schemableIds);
  }
  if ("joins" in node && node.joins) {
    for (const join of node.joins) {
      __privateMethod(this, _WithSchemaTransformer_instances, collectSchemableIdsFromTableExpr_fn).call(this, join.table, schemableIds);
    }
  }
  if ("using" in node && node.using) {
    __privateMethod(this, _WithSchemaTransformer_instances, collectSchemableIdsFromTableExpr_fn).call(this, node.using, schemableIds);
  }
  return schemableIds;
};
collectCTEs_fn = function(node) {
  const ctes = /* @__PURE__ */ new Set();
  if ("with" in node && node.with) {
    __privateMethod(this, _WithSchemaTransformer_instances, collectCTEIds_fn).call(this, node.with, ctes);
  }
  return ctes;
};
collectSchemableIdsFromTableExpr_fn = function(node, schemableIds) {
  const table = TableNode.is(node) ? node : AliasNode.is(node) && TableNode.is(node.node) ? node.node : null;
  if (table) {
    __privateMethod(this, _WithSchemaTransformer_instances, collectSchemableId_fn).call(this, table.table, schemableIds);
  }
};
collectSchemableId_fn = function(node, schemableIds) {
  const id = node.identifier.name;
  if (!__privateGet(this, _schemableIds).has(id) && !__privateGet(this, _ctes).has(id)) {
    schemableIds.add(id);
  }
};
collectCTEIds_fn = function(node, ctes) {
  for (const expr of node.expressions) {
    const cteId = expr.name.table.table.identifier.name;
    if (!__privateGet(this, _ctes).has(cteId)) {
      ctes.add(cteId);
    }
  }
};
class WithSchemaPlugin {
  constructor(schema) {
    __privateAdd(this, _transformer);
    __privateSet(this, _transformer, new WithSchemaTransformer(schema));
  }
  transformQuery(args) {
    return __privateGet(this, _transformer).transformNode(args.node);
  }
  async transformResult(args) {
    return args.result;
  }
}
_transformer = new WeakMap();
const MatchedNode = freeze({
  is(node) {
    return node.kind === "MatchedNode";
  },
  create(not, bySource = false) {
    return freeze({
      kind: "MatchedNode",
      not,
      bySource
    });
  }
});
function parseMergeWhen(type, args, refRight) {
  return WhenNode.create(parseFilterList([
    MatchedNode.create(!type.isMatched, type.bySource),
    ...args && args.length > 0 ? [
      args.length === 3 && refRight ? parseReferentialBinaryOperation(args[0], args[1], args[2]) : parseValueBinaryOperationOrExpression(args)
    ] : []
  ], "and", false));
}
function parseMergeThen(result) {
  if (isString(result)) {
    return RawNode.create([result], []);
  }
  if (isOperationNodeSource(result)) {
    return result.toOperationNode();
  }
  return result;
}
class Deferred {
  constructor() {
    __privateAdd(this, _promise);
    __privateAdd(this, _resolve);
    __privateAdd(this, _reject);
    __publicField(this, "resolve", (value) => {
      if (__privateGet(this, _resolve)) {
        __privateGet(this, _resolve).call(this, value);
      }
    });
    __publicField(this, "reject", (reason) => {
      if (__privateGet(this, _reject)) {
        __privateGet(this, _reject).call(this, reason);
      }
    });
    __privateSet(this, _promise, new Promise((resolve, reject) => {
      __privateSet(this, _reject, reject);
      __privateSet(this, _resolve, resolve);
    }));
  }
  get promise() {
    return __privateGet(this, _promise);
  }
}
_promise = new WeakMap();
_resolve = new WeakMap();
_reject = new WeakMap();
const LOGGED_MESSAGES = /* @__PURE__ */ new Set();
function logOnce(message) {
  if (LOGGED_MESSAGES.has(message)) {
    return;
  }
  LOGGED_MESSAGES.add(message);
  console.log(message);
}
const NO_PLUGINS = freeze([]);
class QueryExecutorBase {
  constructor(plugins = NO_PLUGINS) {
    __privateAdd(this, _QueryExecutorBase_instances);
    __privateAdd(this, _plugins);
    __privateSet(this, _plugins, plugins);
  }
  get plugins() {
    return __privateGet(this, _plugins);
  }
  transformQuery(node, queryId) {
    for (const plugin of __privateGet(this, _plugins)) {
      const transformedNode = plugin.transformQuery({ node, queryId });
      if (transformedNode.kind === node.kind) {
        node = transformedNode;
      } else {
        throw new Error([
          `KyselyPlugin.transformQuery must return a node`,
          `of the same kind that was given to it.`,
          `The plugin was given a ${node.kind}`,
          `but it returned a ${transformedNode.kind}`
        ].join(" "));
      }
    }
    return node;
  }
  async executeQuery(compiledQuery, queryId) {
    return await this.provideConnection(async (connection) => {
      const result = await connection.executeQuery(compiledQuery);
      const transformedResult = await __privateMethod(this, _QueryExecutorBase_instances, transformResult_fn).call(this, result, queryId);
      warnOfOutdatedDriverOrPlugins(result, transformedResult);
      return transformedResult;
    });
  }
  async *stream(compiledQuery, chunkSize, queryId) {
    const connectionDefer = new Deferred();
    const connectionReleaseDefer = new Deferred();
    this.provideConnection(async (connection2) => {
      connectionDefer.resolve(connection2);
      return await connectionReleaseDefer.promise;
    }).catch((ex) => connectionDefer.reject(ex));
    const connection = await connectionDefer.promise;
    try {
      for await (const result of connection.streamQuery(compiledQuery, chunkSize)) {
        yield await __privateMethod(this, _QueryExecutorBase_instances, transformResult_fn).call(this, result, queryId);
      }
    } finally {
      connectionReleaseDefer.resolve();
    }
  }
}
_plugins = new WeakMap();
_QueryExecutorBase_instances = new WeakSet();
transformResult_fn = async function(result, queryId) {
  for (const plugin of __privateGet(this, _plugins)) {
    result = await plugin.transformResult({ result, queryId });
  }
  return result;
};
function warnOfOutdatedDriverOrPlugins(result, transformedResult) {
  const { numAffectedRows } = result;
  if (numAffectedRows === void 0 && result.numUpdatedOrDeletedRows === void 0 || numAffectedRows !== void 0 && transformedResult.numAffectedRows !== void 0) {
    return;
  }
  logOnce("kysely:warning: outdated driver/plugin detected! QueryResult.numUpdatedOrDeletedRows is deprecated and will be removed in a future release.");
}
class NoopQueryExecutor extends QueryExecutorBase {
  get adapter() {
    throw new Error("this query cannot be compiled to SQL");
  }
  compileQuery() {
    throw new Error("this query cannot be compiled to SQL");
  }
  provideConnection() {
    throw new Error("this query cannot be executed");
  }
  withConnectionProvider() {
    throw new Error("this query cannot have a connection provider");
  }
  withPlugin(plugin) {
    return new NoopQueryExecutor([...this.plugins, plugin]);
  }
  withPlugins(plugins) {
    return new NoopQueryExecutor([...this.plugins, ...plugins]);
  }
  withPluginAtFront(plugin) {
    return new NoopQueryExecutor([plugin, ...this.plugins]);
  }
  withoutPlugins() {
    return new NoopQueryExecutor([]);
  }
}
const NOOP_QUERY_EXECUTOR = new NoopQueryExecutor();
class MergeResult {
  constructor(numChangedRows) {
    __publicField(this, "numChangedRows");
    this.numChangedRows = numChangedRows;
  }
}
const _MergeQueryBuilder = class _MergeQueryBuilder {
  constructor(props) {
    __privateAdd(this, _props10);
    __privateSet(this, _props10, freeze(props));
  }
  /**
   * This can be used to add any additional SQL to the end of the query.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db
   *   .mergeInto('person')
   *   .using('pet', 'pet.owner_id', 'person.id')
   *   .whenMatched()
   *   .thenDelete()
   *   .modifyEnd(sql.raw('-- this is a comment'))
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person" using "pet" on "pet"."owner_id" = "person"."id" when matched then delete -- this is a comment
   * ```
   */
  modifyEnd(modifier) {
    return new _MergeQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithEndModifier(__privateGet(this, _props10).queryNode, modifier.toOperationNode())
    });
  }
  /**
   * Changes a `merge into` query to an `merge top into` query.
   *
   * `top` clause is only supported by some dialects like MS SQL Server.
   *
   * ### Examples
   *
   * Affect 5 matched rows at most:
   *
   * ```ts
   * await db.mergeInto('person')
   *   .top(5)
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenMatched()
   *   .thenDelete()
   *   .execute()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * merge top(5) into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when matched then
   *   delete
   * ```
   *
   * Affect 50% of matched rows:
   *
   * ```ts
   * await db.mergeInto('person')
   *   .top(50, 'percent')
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenMatched()
   *   .thenDelete()
   *   .execute()
   * ```
   *
   * The generated SQL (MS SQL Server):
   *
   * ```sql
   * merge top(50) percent into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when matched then
   *   delete
   * ```
   */
  top(expression, modifiers) {
    return new _MergeQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithTop(__privateGet(this, _props10).queryNode, parseTop(expression, modifiers))
    });
  }
  using(...args) {
    return new WheneableMergeQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: MergeQueryNode.cloneWithUsing(__privateGet(this, _props10).queryNode, parseJoin("Using", args))
    });
  }
  output(args) {
    return new _MergeQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithOutput(__privateGet(this, _props10).queryNode, parseSelectArg(args))
    });
  }
  outputAll(table) {
    return new _MergeQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithOutput(__privateGet(this, _props10).queryNode, parseSelectAll(table))
    });
  }
};
_props10 = new WeakMap();
let MergeQueryBuilder = _MergeQueryBuilder;
preventAwait(MergeQueryBuilder, "don't await MergeQueryBuilder instances directly. To execute the query you need to call `execute` when available.");
const _WheneableMergeQueryBuilder = class _WheneableMergeQueryBuilder {
  constructor(props) {
    __privateAdd(this, _WheneableMergeQueryBuilder_instances);
    __privateAdd(this, _props11);
    __privateSet(this, _props11, freeze(props));
  }
  /**
   * This can be used to add any additional SQL to the end of the query.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db
   *   .mergeInto('person')
   *   .using('pet', 'pet.owner_id', 'person.id')
   *   .whenMatched()
   *   .thenDelete()
   *   .modifyEnd(sql.raw('-- this is a comment'))
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person" using "pet" on "pet"."owner_id" = "person"."id" when matched then delete -- this is a comment
   * ```
   */
  modifyEnd(modifier) {
    return new _WheneableMergeQueryBuilder({
      ...__privateGet(this, _props11),
      queryNode: QueryNode.cloneWithEndModifier(__privateGet(this, _props11).queryNode, modifier.toOperationNode())
    });
  }
  /**
   * See {@link MergeQueryBuilder.top}.
   */
  top(expression, modifiers) {
    return new _WheneableMergeQueryBuilder({
      ...__privateGet(this, _props11),
      queryNode: QueryNode.cloneWithTop(__privateGet(this, _props11).queryNode, parseTop(expression, modifiers))
    });
  }
  /**
   * Adds a simple `when matched` clause to the query.
   *
   * For a `when matched` clause with an `and` condition, see {@link whenMatchedAnd}.
   *
   * For a simple `when not matched` clause, see {@link whenNotMatched}.
   *
   * For a `when not matched` clause with an `and` condition, see {@link whenNotMatchedAnd}.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db.mergeInto('person')
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenMatched()
   *   .thenDelete()
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when matched then
   *   delete
   * ```
   */
  whenMatched() {
    return __privateMethod(this, _WheneableMergeQueryBuilder_instances, whenMatched_fn).call(this, []);
  }
  whenMatchedAnd(...args) {
    return __privateMethod(this, _WheneableMergeQueryBuilder_instances, whenMatched_fn).call(this, args);
  }
  /**
   * Adds the `when matched` clause to the query with an `and` condition. But unlike
   * {@link whenMatchedAnd}, this method accepts a column reference as the 3rd argument.
   *
   * This method is similar to {@link SelectQueryBuilder.whereRef}, so see the documentation
   * for that method for more examples.
   */
  whenMatchedAndRef(lhs, op, rhs) {
    return __privateMethod(this, _WheneableMergeQueryBuilder_instances, whenMatched_fn).call(this, [lhs, op, rhs], true);
  }
  /**
   * Adds a simple `when not matched` clause to the query.
   *
   * For a `when not matched` clause with an `and` condition, see {@link whenNotMatchedAnd}.
   *
   * For a simple `when matched` clause, see {@link whenMatched}.
   *
   * For a `when matched` clause with an `and` condition, see {@link whenMatchedAnd}.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db.mergeInto('person')
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenNotMatched()
   *   .thenInsertValues({
   *     first_name: 'John',
   *     last_name: 'Doe',
   *   })
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when not matched then
   *   insert ("first_name", "last_name") values ($1, $2)
   * ```
   */
  whenNotMatched() {
    return __privateMethod(this, _WheneableMergeQueryBuilder_instances, whenNotMatched_fn).call(this, []);
  }
  whenNotMatchedAnd(...args) {
    return __privateMethod(this, _WheneableMergeQueryBuilder_instances, whenNotMatched_fn).call(this, args);
  }
  /**
   * Adds the `when not matched` clause to the query with an `and` condition. But unlike
   * {@link whenNotMatchedAnd}, this method accepts a column reference as the 3rd argument.
   *
   * Unlike {@link whenMatchedAndRef}, you cannot reference columns from the target table.
   *
   * This method is similar to {@link SelectQueryBuilder.whereRef}, so see the documentation
   * for that method for more examples.
   */
  whenNotMatchedAndRef(lhs, op, rhs) {
    return __privateMethod(this, _WheneableMergeQueryBuilder_instances, whenNotMatched_fn).call(this, [lhs, op, rhs], true);
  }
  /**
   * Adds a simple `when not matched by source` clause to the query.
   *
   * Supported in MS SQL Server.
   *
   * Similar to {@link whenNotMatched}, but returns a {@link MatchedThenableMergeQueryBuilder}.
   */
  whenNotMatchedBySource() {
    return __privateMethod(this, _WheneableMergeQueryBuilder_instances, whenNotMatched_fn).call(this, [], false, true);
  }
  whenNotMatchedBySourceAnd(...args) {
    return __privateMethod(this, _WheneableMergeQueryBuilder_instances, whenNotMatched_fn).call(this, args, false, true);
  }
  /**
   * Adds the `when not matched by source` clause to the query with an `and` condition.
   *
   * Similar to {@link whenNotMatchedAndRef}, but you can reference columns from
   * the target table, and not from source table and returns a {@link MatchedThenableMergeQueryBuilder}.
   */
  whenNotMatchedBySourceAndRef(lhs, op, rhs) {
    return __privateMethod(this, _WheneableMergeQueryBuilder_instances, whenNotMatched_fn).call(this, [lhs, op, rhs], true, true);
  }
  output(args) {
    return new _WheneableMergeQueryBuilder({
      ...__privateGet(this, _props11),
      queryNode: QueryNode.cloneWithOutput(__privateGet(this, _props11).queryNode, parseSelectArg(args))
    });
  }
  outputAll(table) {
    return new _WheneableMergeQueryBuilder({
      ...__privateGet(this, _props11),
      queryNode: QueryNode.cloneWithOutput(__privateGet(this, _props11).queryNode, parseSelectAll(table))
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   *
   * If you want to conditionally call a method on `this`, see
   * the {@link $if} method.
   *
   * ### Examples
   *
   * The next example uses a helper function `log` to log a query:
   *
   * ```ts
   * import type { Compilable } from 'kysely'
   *
   * function log<T extends Compilable>(qb: T): T {
   *   console.log(qb.compile())
   *   return qb
   * }
   *
   * await db.updateTable('person')
   *   .set({ first_name: 'John' })
   *   .$call(log)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  /**
   * Call `func(this)` if `condition` is true.
   *
   * This method is especially handy with optional selects. Any `returning` or `returningAll`
   * method calls add columns as optional fields to the output type when called inside
   * the `func` callback. This is because we can't know if those selections were actually
   * made before running the code.
   *
   * You can also call any other methods inside the callback.
   *
   * ### Examples
   *
   * ```ts
   * import type { PersonUpdate } from 'type-editor' // imaginary module
   *
   * async function updatePerson(id: number, updates: PersonUpdate, returnLastName: boolean) {
   *   return await db
   *     .updateTable('person')
   *     .set(updates)
   *     .where('id', '=', id)
   *     .returning(['id', 'first_name'])
   *     .$if(returnLastName, (qb) => qb.returning('last_name'))
   *     .executeTakeFirstOrThrow()
   * }
   * ```
   *
   * Any selections added inside the `if` callback will be added as optional fields to the
   * output type since we can't know if the selections were actually made before running
   * the code. In the example above the return type of the `updatePerson` function is:
   *
   * ```ts
   * Promise<{
   *   id: number
   *   first_name: string
   *   last_name?: string
   * }>
   * ```
   */
  $if(condition, func) {
    if (condition) {
      return func(this);
    }
    return new _WheneableMergeQueryBuilder({
      ...__privateGet(this, _props11)
    });
  }
  toOperationNode() {
    return __privateGet(this, _props11).executor.transformQuery(__privateGet(this, _props11).queryNode, __privateGet(this, _props11).queryId);
  }
  compile() {
    return __privateGet(this, _props11).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props11).queryId);
  }
  /**
   * Executes the query and returns an array of rows.
   *
   * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
   */
  async execute() {
    const compiledQuery = this.compile();
    const result = await __privateGet(this, _props11).executor.executeQuery(compiledQuery, __privateGet(this, _props11).queryId);
    if (compiledQuery.query.output && __privateGet(this, _props11).executor.adapter.supportsOutput) {
      return result.rows;
    }
    return [new MergeResult(result.numAffectedRows)];
  }
  /**
   * Executes the query and returns the first result or undefined if
   * the query returned no result.
   */
  async executeTakeFirst() {
    const [result] = await this.execute();
    return result;
  }
  /**
   * Executes the query and returns the first result or throws if
   * the query returned no result.
   *
   * By default an instance of {@link NoResultError} is thrown, but you can
   * provide a custom error class, or callback as the only argument to throw a different
   * error.
   */
  async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
    const result = await this.executeTakeFirst();
    if (result === void 0) {
      const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
      throw error;
    }
    return result;
  }
};
_props11 = new WeakMap();
_WheneableMergeQueryBuilder_instances = new WeakSet();
whenMatched_fn = function(args, refRight) {
  return new MatchedThenableMergeQueryBuilder({
    ...__privateGet(this, _props11),
    queryNode: MergeQueryNode.cloneWithWhen(__privateGet(this, _props11).queryNode, parseMergeWhen({ isMatched: true }, args, refRight))
  });
};
whenNotMatched_fn = function(args, refRight = false, bySource = false) {
  const props = {
    ...__privateGet(this, _props11),
    queryNode: MergeQueryNode.cloneWithWhen(__privateGet(this, _props11).queryNode, parseMergeWhen({ isMatched: false, bySource }, args, refRight))
  };
  const Builder = bySource ? MatchedThenableMergeQueryBuilder : NotMatchedThenableMergeQueryBuilder;
  return new Builder(props);
};
let WheneableMergeQueryBuilder = _WheneableMergeQueryBuilder;
preventAwait(WheneableMergeQueryBuilder, "don't await WheneableMergeQueryBuilder instances directly. To execute the query you need to call `execute`.");
class MatchedThenableMergeQueryBuilder {
  constructor(props) {
    __privateAdd(this, _props12);
    __privateSet(this, _props12, freeze(props));
  }
  /**
   * Performs the `delete` action.
   *
   * To perform the `do nothing` action, see {@link thenDoNothing}.
   *
   * To perform the `update` action, see {@link thenUpdate} or {@link thenUpdateSet}.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db.mergeInto('person')
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenMatched()
   *   .thenDelete()
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when matched then
   *   delete
   * ```
   */
  thenDelete() {
    return new WheneableMergeQueryBuilder({
      ...__privateGet(this, _props12),
      queryNode: MergeQueryNode.cloneWithThen(__privateGet(this, _props12).queryNode, parseMergeThen("delete"))
    });
  }
  /**
   * Performs the `do nothing` action.
   *
   * This is supported in PostgreSQL.
   *
   * To perform the `delete` action, see {@link thenDelete}.
   *
   * To perform the `update` action, see {@link thenUpdate} or {@link thenUpdateSet}.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db.mergeInto('person')
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenMatched()
   *   .thenDoNothing()
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when matched then
   *   do nothing
   * ```
   */
  thenDoNothing() {
    return new WheneableMergeQueryBuilder({
      ...__privateGet(this, _props12),
      queryNode: MergeQueryNode.cloneWithThen(__privateGet(this, _props12).queryNode, parseMergeThen("do nothing"))
    });
  }
  /**
   * Perform an `update` operation with a full-fledged {@link UpdateQueryBuilder}.
   * This is handy when multiple `set` invocations are needed.
   *
   * For a shorthand version of this method, see {@link thenUpdateSet}.
   *
   * To perform the `delete` action, see {@link thenDelete}.
   *
   * To perform the `do nothing` action, see {@link thenDoNothing}.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * const result = await db.mergeInto('person')
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenMatched()
   *   .thenUpdate((ub) => ub
   *     .set(sql`metadata['has_pets']`, 'Y')
   *     .set({
   *       updated_at: new Date().toISOString(),
   *     })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when matched then
   *   update set metadata['has_pets'] = $1, "updated_at" = $2
   * ```
   */
  thenUpdate(set) {
    return new WheneableMergeQueryBuilder({
      ...__privateGet(this, _props12),
      queryNode: MergeQueryNode.cloneWithThen(__privateGet(this, _props12).queryNode, parseMergeThen(set(new UpdateQueryBuilder({
        queryId: __privateGet(this, _props12).queryId,
        executor: NOOP_QUERY_EXECUTOR,
        queryNode: UpdateQueryNode.createWithoutTable()
      }))))
    });
  }
  thenUpdateSet(...args) {
    return this.thenUpdate((ub) => ub.set(...args));
  }
}
_props12 = new WeakMap();
preventAwait(MatchedThenableMergeQueryBuilder, "don't await MatchedThenableMergeQueryBuilder instances directly. To execute the query you need to call `execute` when available.");
class NotMatchedThenableMergeQueryBuilder {
  constructor(props) {
    __privateAdd(this, _props13);
    __privateSet(this, _props13, freeze(props));
  }
  /**
   * Performs the `do nothing` action.
   *
   * This is supported in PostgreSQL.
   *
   * To perform the `insert` action, see {@link thenInsertValues}.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db.mergeInto('person')
   *   .using('pet', 'person.id', 'pet.owner_id')
   *   .whenNotMatched()
   *   .thenDoNothing()
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * merge into "person"
   * using "pet" on "person"."id" = "pet"."owner_id"
   * when not matched then
   *   do nothing
   * ```
   */
  thenDoNothing() {
    return new WheneableMergeQueryBuilder({
      ...__privateGet(this, _props13),
      queryNode: MergeQueryNode.cloneWithThen(__privateGet(this, _props13).queryNode, parseMergeThen("do nothing"))
    });
  }
  thenInsertValues(insert) {
    const [columns, values] = parseInsertExpression(insert);
    return new WheneableMergeQueryBuilder({
      ...__privateGet(this, _props13),
      queryNode: MergeQueryNode.cloneWithThen(__privateGet(this, _props13).queryNode, parseMergeThen(InsertQueryNode.cloneWith(InsertQueryNode.createWithoutInto(), {
        columns,
        values
      })))
    });
  }
}
_props13 = new WeakMap();
preventAwait(NotMatchedThenableMergeQueryBuilder, "don't await NotMatchedThenableMergeQueryBuilder instances directly. To execute the query you need to call `execute` when available.");
const _QueryCreator = class _QueryCreator {
  constructor(props) {
    __privateAdd(this, _props14);
    __privateSet(this, _props14, freeze(props));
  }
  selectFrom(from) {
    return createSelectQueryBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _props14).executor,
      queryNode: SelectQueryNode.createFrom(parseTableExpressionOrList(from), __privateGet(this, _props14).withNode)
    });
  }
  selectNoFrom(selection) {
    return createSelectQueryBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _props14).executor,
      queryNode: SelectQueryNode.cloneWithSelections(SelectQueryNode.create(__privateGet(this, _props14).withNode), parseSelectArg(selection))
    });
  }
  /**
   * Creates an insert query.
   *
   * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
   * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
   * the inserted row if the db returned one.
   *
   * See the {@link InsertQueryBuilder.values | values} method for more info and examples. Also see
   * the {@link ReturningInterface.returning | returning} method for a way to return columns
   * on supported databases like PostgreSQL.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .insertInto('person')
   *   .values({
   *     first_name: 'Jennifer',
   *     last_name: 'Aniston'
   *   })
   *   .executeTakeFirst()
   *
   * console.log(result.insertId)
   * ```
   *
   * Some databases like PostgreSQL support the `returning` method:
   *
   * ```ts
   * const { id } = await db
   *   .insertInto('person')
   *   .values({
   *     first_name: 'Jennifer',
   *     last_name: 'Aniston'
   *   })
   *   .returning('id')
   *   .executeTakeFirstOrThrow()
   * ```
   */
  insertInto(table) {
    return new InsertQueryBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _props14).executor,
      queryNode: InsertQueryNode.create(parseTable$1(table), __privateGet(this, _props14).withNode)
    });
  }
  /**
   * Creates a replace query.
   *
   * A MySQL-only statement similar to {@link InsertQueryBuilder.onDuplicateKeyUpdate}
   * that deletes and inserts values on collision instead of updating existing rows.
   *
   * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
   * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
   * the inserted row if the db returned one.
   *
   * See the {@link InsertQueryBuilder.values | values} method for more info and examples.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .replaceInto('person')
   *   .values({
   *     first_name: 'Jennifer',
   *     last_name: 'Aniston'
   *   })
   *   .executeTakeFirst()
   *
   * console.log(result.insertId)
   * ```
   */
  replaceInto(table) {
    return new InsertQueryBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _props14).executor,
      queryNode: InsertQueryNode.create(parseTable$1(table), __privateGet(this, _props14).withNode, true)
    });
  }
  deleteFrom(tables2) {
    return new DeleteQueryBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _props14).executor,
      queryNode: DeleteQueryNode.create(parseTableExpressionOrList(tables2), __privateGet(this, _props14).withNode)
    });
  }
  updateTable(table) {
    return new UpdateQueryBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _props14).executor,
      queryNode: UpdateQueryNode.create(parseTableExpression(table), __privateGet(this, _props14).withNode)
    });
  }
  mergeInto(targetTable) {
    return new MergeQueryBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _props14).executor,
      queryNode: MergeQueryNode.create(parseAliasedTable(targetTable), __privateGet(this, _props14).withNode)
    });
  }
  /**
   * Creates a `with` query (Common Table Expression).
   *
   * ### Examples
   *
   * <!-- siteExample("cte", "Simple selects", 10) -->
   *
   * Common table expressions (CTE) are a great way to modularize complex queries.
   * Essentially they allow you to run multiple separate queries within a
   * single roundtrip to the DB.
   *
   * Since CTEs are a part of the main query, query optimizers inside DB
   * engines are able to optimize the overall query. For example, postgres
   * is able to inline the CTEs inside the using queries if it decides it's
   * faster.
   *
   * ```ts
   * const result = await db
   *   // Create a CTE called `jennifers` that selects all
   *   // persons named 'Jennifer'.
   *   .with('jennifers', (db) => db
   *     .selectFrom('person')
   *     .where('first_name', '=', 'Jennifer')
   *     .select(['id', 'age'])
   *   )
   *   // Select all rows from the `jennifers` CTE and
   *   // further filter it.
   *   .with('adult_jennifers', (db) => db
   *     .selectFrom('jennifers')
   *     .where('age', '>', 18)
   *     .select(['id', 'age'])
   *   )
   *   // Finally select all adult jennifers that are
   *   // also younger than 60.
   *   .selectFrom('adult_jennifers')
   *   .where('age', '<', 60)
   *   .selectAll()
   *   .execute()
   * ```
   *
   * <!-- siteExample("cte", "Inserts, updates and deletions", 20) -->
   *
   * Some databases like postgres also allow you to run other queries than selects
   * in CTEs. On these databases CTEs are extremely powerful:
   *
   * ```ts
   * const result = await db
   *   .with('new_person', (db) => db
   *     .insertInto('person')
   *     .values({
   *       first_name: 'Jennifer',
   *       age: 35,
   *     })
   *     .returning('id')
   *   )
   *   .with('new_pet', (db) => db
   *     .insertInto('pet')
   *     .values({
   *       name: 'Doggo',
   *       species: 'dog',
   *       is_favorite: true,
   *       // Use the id of the person we just inserted.
   *       owner_id: db
   *         .selectFrom('new_person')
   *         .select('id')
   *     })
   *     .returning('id')
   *   )
   *   .selectFrom(['new_person', 'new_pet'])
   *   .select([
   *     'new_person.id as person_id',
   *     'new_pet.id as pet_id'
   *   ])
   *   .execute()
   * ```
   *
   * The CTE name can optionally specify column names in addition to
   * a name. In that case Kysely requires the expression to retun
   * rows with the same columns.
   *
   * ```ts
   * await db
   *   .with('jennifers(id, age)', (db) => db
   *     .selectFrom('person')
   *     .where('first_name', '=', 'Jennifer')
   *     // This is ok since we return columns with the same
   *     // names as specified by `jennifers(id, age)`.
   *     .select(['id', 'age'])
   *   )
   *   .selectFrom('jennifers')
   *   .selectAll()
   *   .execute()
   * ```
   *
   * The first argument can also be a callback. The callback is passed
   * a `CTEBuilder` instance that can be used to configure the CTE:
   *
   * ```ts
   * await db
   *   .with(
   *     (cte) => cte('jennifers').materialized(),
   *     (db) => db
   *       .selectFrom('person')
   *       .where('first_name', '=', 'Jennifer')
   *       .select(['id', 'age'])
   *   )
   *   .selectFrom('jennifers')
   *   .selectAll()
   *   .execute()
   * ```
   */
  with(nameOrBuilder, expression) {
    const cte = parseCommonTableExpression(nameOrBuilder, expression);
    return new _QueryCreator({
      ...__privateGet(this, _props14),
      withNode: __privateGet(this, _props14).withNode ? WithNode.cloneWithExpression(__privateGet(this, _props14).withNode, cte) : WithNode.create(cte)
    });
  }
  /**
   * Creates a recursive `with` query (Common Table Expression).
   *
   * Note that recursiveness is a property of the whole `with` statement.
   * You cannot have recursive and non-recursive CTEs in a same `with` statement.
   * Therefore the recursiveness is determined by the **first** `with` or
   * `withRecusive` call you make.
   *
   * See the {@link with} method for examples and more documentation.
   */
  withRecursive(nameOrBuilder, expression) {
    const cte = parseCommonTableExpression(nameOrBuilder, expression);
    return new _QueryCreator({
      ...__privateGet(this, _props14),
      withNode: __privateGet(this, _props14).withNode ? WithNode.cloneWithExpression(__privateGet(this, _props14).withNode, cte) : WithNode.create(cte, { recursive: true })
    });
  }
  /**
   * Returns a copy of this query creator instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _QueryCreator({
      ...__privateGet(this, _props14),
      executor: __privateGet(this, _props14).executor.withPlugin(plugin)
    });
  }
  /**
   * Returns a copy of this query creator instance without any plugins.
   */
  withoutPlugins() {
    return new _QueryCreator({
      ...__privateGet(this, _props14),
      executor: __privateGet(this, _props14).executor.withoutPlugins()
    });
  }
  /**
   * Sets the schema to be used for all table references that don't explicitly
   * specify a schema.
   *
   * This only affects the query created through the builder returned from
   * this method and doesn't modify the `db` instance.
   *
   * See [this recipe](https://github.com/kysely-org/kysely/blob/master/site/docs/recipes/0007-schemas.md)
   * for a more detailed explanation.
   *
   * ### Examples
   *
   * ```
   * await db
   *   .withSchema('mammals')
   *   .selectFrom('pet')
   *   .selectAll()
   *   .innerJoin('public.person', 'public.person.id', 'pet.owner_id')
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select * from "mammals"."pet"
   * inner join "public"."person"
   * on "public"."person"."id" = "mammals"."pet"."owner_id"
   * ```
   *
   * `withSchema` is smart enough to not add schema for aliases,
   * common table expressions or other places where the schema
   * doesn't belong to:
   *
   * ```
   * await db
   *   .withSchema('mammals')
   *   .selectFrom('pet as p')
   *   .select('p.name')
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "p"."name" from "mammals"."pet" as "p"
   * ```
   */
  withSchema(schema) {
    return new _QueryCreator({
      ...__privateGet(this, _props14),
      executor: __privateGet(this, _props14).executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
};
_props14 = new WeakMap();
let QueryCreator = _QueryCreator;
function createQueryCreator() {
  return new QueryCreator({
    executor: NOOP_QUERY_EXECUTOR
  });
}
function createJoinBuilder(joinType, table) {
  return new JoinBuilder({
    joinNode: JoinNode.create(joinType, parseTableExpression(table))
  });
}
function createOverBuilder() {
  return new OverBuilder({
    overNode: OverNode.create()
  });
}
function parseJoin(joinType, args) {
  if (args.length === 3) {
    return parseSingleOnJoin(joinType, args[0], args[1], args[2]);
  } else if (args.length === 2) {
    return parseCallbackJoin(joinType, args[0], args[1]);
  } else {
    throw new Error("not implemented");
  }
}
function parseCallbackJoin(joinType, from, callback) {
  return callback(createJoinBuilder(joinType, from)).toOperationNode();
}
function parseSingleOnJoin(joinType, from, lhsColumn, rhsColumn) {
  return JoinNode.createWithOn(joinType, parseTableExpression(from), parseReferentialBinaryOperation(lhsColumn, "=", rhsColumn));
}
const OffsetNode = freeze({
  is(node) {
    return node.kind === "OffsetNode";
  },
  create(offset) {
    return freeze({
      kind: "OffsetNode",
      offset
    });
  }
});
const GroupByItemNode = freeze({
  is(node) {
    return node.kind === "GroupByItemNode";
  },
  create(groupBy) {
    return freeze({
      kind: "GroupByItemNode",
      groupBy
    });
  }
});
function parseGroupBy(groupBy) {
  groupBy = isFunction(groupBy) ? groupBy(expressionBuilder()) : groupBy;
  return parseReferenceExpressionOrList(groupBy).map(GroupByItemNode.create);
}
const SetOperationNode = freeze({
  is(node) {
    return node.kind === "SetOperationNode";
  },
  create(operator, expression, all) {
    return freeze({
      kind: "SetOperationNode",
      operator,
      expression,
      all
    });
  }
});
function parseSetOperations(operator, expression, all) {
  if (isFunction(expression)) {
    expression = expression(createExpressionBuilder());
  }
  if (!isReadonlyArray(expression)) {
    expression = [expression];
  }
  return expression.map((expr) => SetOperationNode.create(operator, parseExpression(expr), all));
}
const _ExpressionWrapper = class _ExpressionWrapper {
  constructor(node) {
    __privateAdd(this, _node);
    __privateSet(this, _node, node);
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  as(alias) {
    return new AliasedExpressionWrapper(this, alias);
  }
  or(...args) {
    return new OrWrapper(OrNode.create(__privateGet(this, _node), parseValueBinaryOperationOrExpression(args)));
  }
  and(...args) {
    return new AndWrapper(AndNode.create(__privateGet(this, _node), parseValueBinaryOperationOrExpression(args)));
  }
  /**
   * Change the output type of the expression.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `ExpressionWrapper` with a new output type.
   */
  $castTo() {
    return new _ExpressionWrapper(__privateGet(this, _node));
  }
  /**
   * Omit null from the expression's type.
   *
   * This function can be useful in cases where you know an expression can't be
   * null, but Kysely is unable to infer it.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of `this` with a new output type.
   */
  $notNull() {
    return new _ExpressionWrapper(__privateGet(this, _node));
  }
  toOperationNode() {
    return __privateGet(this, _node);
  }
};
_node = new WeakMap();
let ExpressionWrapper = _ExpressionWrapper;
class AliasedExpressionWrapper {
  constructor(expr, alias) {
    __privateAdd(this, _expr);
    __privateAdd(this, _alias);
    __privateSet(this, _expr, expr);
    __privateSet(this, _alias, alias);
  }
  /** @private */
  get expression() {
    return __privateGet(this, _expr);
  }
  /** @private */
  get alias() {
    return __privateGet(this, _alias);
  }
  toOperationNode() {
    return AliasNode.create(__privateGet(this, _expr).toOperationNode(), isOperationNodeSource(__privateGet(this, _alias)) ? __privateGet(this, _alias).toOperationNode() : IdentifierNode.create(__privateGet(this, _alias)));
  }
}
_expr = new WeakMap();
_alias = new WeakMap();
const _OrWrapper = class _OrWrapper {
  constructor(node) {
    __privateAdd(this, _node2);
    __privateSet(this, _node2, node);
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  as(alias) {
    return new AliasedExpressionWrapper(this, alias);
  }
  or(...args) {
    return new _OrWrapper(OrNode.create(__privateGet(this, _node2), parseValueBinaryOperationOrExpression(args)));
  }
  /**
   * Change the output type of the expression.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `OrWrapper` with a new output type.
   */
  $castTo() {
    return new _OrWrapper(__privateGet(this, _node2));
  }
  toOperationNode() {
    return ParensNode.create(__privateGet(this, _node2));
  }
};
_node2 = new WeakMap();
let OrWrapper = _OrWrapper;
const _AndWrapper = class _AndWrapper {
  constructor(node) {
    __privateAdd(this, _node3);
    __privateSet(this, _node3, node);
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  as(alias) {
    return new AliasedExpressionWrapper(this, alias);
  }
  and(...args) {
    return new _AndWrapper(AndNode.create(__privateGet(this, _node3), parseValueBinaryOperationOrExpression(args)));
  }
  /**
   * Change the output type of the expression.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `AndWrapper` with a new output type.
   */
  $castTo() {
    return new _AndWrapper(__privateGet(this, _node3));
  }
  toOperationNode() {
    return ParensNode.create(__privateGet(this, _node3));
  }
};
_node3 = new WeakMap();
let AndWrapper = _AndWrapper;
const FetchNode = {
  is(node) {
    return node.kind === "FetchNode";
  },
  create(rowCount, modifier) {
    return {
      kind: "FetchNode",
      rowCount: ValueNode.create(rowCount),
      modifier
    };
  }
};
function parseFetch(rowCount, modifier) {
  if (!isNumber(rowCount) && !isBigInt(rowCount)) {
    throw new Error(`Invalid fetch row count: ${rowCount}`);
  }
  if (!isFetchModifier(modifier)) {
    throw new Error(`Invalid fetch modifier: ${modifier}`);
  }
  return FetchNode.create(rowCount, modifier);
}
function isFetchModifier(value) {
  return value === "only" || value === "with ties";
}
const _SelectQueryBuilderImpl = class _SelectQueryBuilderImpl {
  constructor(props) {
    __privateAdd(this, _props15);
    __privateSet(this, _props15, freeze(props));
  }
  get expressionType() {
    return void 0;
  }
  get isSelectQueryBuilder() {
    return true;
  }
  where(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props15).queryNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  whereRef(lhs, op, rhs) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props15).queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  having(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithHaving(__privateGet(this, _props15).queryNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  havingRef(lhs, op, rhs) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithHaving(__privateGet(this, _props15).queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  select(selection) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithSelections(__privateGet(this, _props15).queryNode, parseSelectArg(selection))
    });
  }
  distinctOn(selection) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithDistinctOn(__privateGet(this, _props15).queryNode, parseReferenceExpressionOrList(selection))
    });
  }
  modifyFront(modifier) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithFrontModifier(__privateGet(this, _props15).queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
    });
  }
  modifyEnd(modifier) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithEndModifier(__privateGet(this, _props15).queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
    });
  }
  distinct() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithFrontModifier(__privateGet(this, _props15).queryNode, SelectModifierNode.create("Distinct"))
    });
  }
  forUpdate(of) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithEndModifier(__privateGet(this, _props15).queryNode, SelectModifierNode.create("ForUpdate", of ? asArray$1(of).map(parseTable$1) : void 0))
    });
  }
  forShare(of) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithEndModifier(__privateGet(this, _props15).queryNode, SelectModifierNode.create("ForShare", of ? asArray$1(of).map(parseTable$1) : void 0))
    });
  }
  forKeyShare(of) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithEndModifier(__privateGet(this, _props15).queryNode, SelectModifierNode.create("ForKeyShare", of ? asArray$1(of).map(parseTable$1) : void 0))
    });
  }
  forNoKeyUpdate(of) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithEndModifier(__privateGet(this, _props15).queryNode, SelectModifierNode.create("ForNoKeyUpdate", of ? asArray$1(of).map(parseTable$1) : void 0))
    });
  }
  skipLocked() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithEndModifier(__privateGet(this, _props15).queryNode, SelectModifierNode.create("SkipLocked"))
    });
  }
  noWait() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithEndModifier(__privateGet(this, _props15).queryNode, SelectModifierNode.create("NoWait"))
    });
  }
  selectAll(table) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithSelections(__privateGet(this, _props15).queryNode, parseSelectAll(table))
    });
  }
  innerJoin(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props15).queryNode, parseJoin("InnerJoin", args))
    });
  }
  leftJoin(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props15).queryNode, parseJoin("LeftJoin", args))
    });
  }
  rightJoin(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props15).queryNode, parseJoin("RightJoin", args))
    });
  }
  fullJoin(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props15).queryNode, parseJoin("FullJoin", args))
    });
  }
  innerJoinLateral(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props15).queryNode, parseJoin("LateralInnerJoin", args))
    });
  }
  leftJoinLateral(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props15).queryNode, parseJoin("LateralLeftJoin", args))
    });
  }
  orderBy(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithOrderByItems(__privateGet(this, _props15).queryNode, parseOrderBy(args))
    });
  }
  groupBy(groupBy) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithGroupByItems(__privateGet(this, _props15).queryNode, parseGroupBy(groupBy))
    });
  }
  limit(limit) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithLimit(__privateGet(this, _props15).queryNode, LimitNode.create(parseValueExpression(limit)))
    });
  }
  offset(offset) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithOffset(__privateGet(this, _props15).queryNode, OffsetNode.create(parseValueExpression(offset)))
    });
  }
  fetch(rowCount, modifier = "only") {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithFetch(__privateGet(this, _props15).queryNode, parseFetch(rowCount, modifier))
    });
  }
  top(expression, modifiers) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithTop(__privateGet(this, _props15).queryNode, parseTop(expression, modifiers))
    });
  }
  union(expression) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithSetOperations(__privateGet(this, _props15).queryNode, parseSetOperations("union", expression, false))
    });
  }
  unionAll(expression) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithSetOperations(__privateGet(this, _props15).queryNode, parseSetOperations("union", expression, true))
    });
  }
  intersect(expression) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithSetOperations(__privateGet(this, _props15).queryNode, parseSetOperations("intersect", expression, false))
    });
  }
  intersectAll(expression) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithSetOperations(__privateGet(this, _props15).queryNode, parseSetOperations("intersect", expression, true))
    });
  }
  except(expression) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithSetOperations(__privateGet(this, _props15).queryNode, parseSetOperations("except", expression, false))
    });
  }
  exceptAll(expression) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithSetOperations(__privateGet(this, _props15).queryNode, parseSetOperations("except", expression, true))
    });
  }
  as(alias) {
    return new AliasedSelectQueryBuilderImpl(this, alias);
  }
  clearSelect() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithoutSelections(__privateGet(this, _props15).queryNode)
    });
  }
  clearWhere() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithoutWhere(__privateGet(this, _props15).queryNode)
    });
  }
  clearLimit() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithoutLimit(__privateGet(this, _props15).queryNode)
    });
  }
  clearOffset() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithoutOffset(__privateGet(this, _props15).queryNode)
    });
  }
  clearOrderBy() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithoutOrderBy(__privateGet(this, _props15).queryNode)
    });
  }
  clearGroupBy() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: SelectQueryNode.cloneWithoutGroupBy(__privateGet(this, _props15).queryNode)
    });
  }
  $call(func) {
    return func(this);
  }
  $if(condition, func) {
    if (condition) {
      return func(this);
    }
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15)
    });
  }
  $castTo() {
    return new _SelectQueryBuilderImpl(__privateGet(this, _props15));
  }
  $narrowType() {
    return new _SelectQueryBuilderImpl(__privateGet(this, _props15));
  }
  $assertType() {
    return new _SelectQueryBuilderImpl(__privateGet(this, _props15));
  }
  $asTuple() {
    return new ExpressionWrapper(this.toOperationNode());
  }
  withPlugin(plugin) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      executor: __privateGet(this, _props15).executor.withPlugin(plugin)
    });
  }
  toOperationNode() {
    return __privateGet(this, _props15).executor.transformQuery(__privateGet(this, _props15).queryNode, __privateGet(this, _props15).queryId);
  }
  compile() {
    return __privateGet(this, _props15).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props15).queryId);
  }
  async execute() {
    const compiledQuery = this.compile();
    const result = await __privateGet(this, _props15).executor.executeQuery(compiledQuery, __privateGet(this, _props15).queryId);
    return result.rows;
  }
  async executeTakeFirst() {
    const [result] = await this.execute();
    return result;
  }
  async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
    const result = await this.executeTakeFirst();
    if (result === void 0) {
      const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
      throw error;
    }
    return result;
  }
  async *stream(chunkSize = 100) {
    const compiledQuery = this.compile();
    const stream = __privateGet(this, _props15).executor.stream(compiledQuery, chunkSize, __privateGet(this, _props15).queryId);
    for await (const item of stream) {
      yield* item.rows;
    }
  }
  async explain(format, options) {
    const builder = new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props15),
      queryNode: QueryNode.cloneWithExplain(__privateGet(this, _props15).queryNode, format, options)
    });
    return await builder.execute();
  }
};
_props15 = new WeakMap();
let SelectQueryBuilderImpl = _SelectQueryBuilderImpl;
preventAwait(SelectQueryBuilderImpl, "don't await SelectQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
function createSelectQueryBuilder(props) {
  return new SelectQueryBuilderImpl(props);
}
class AliasedSelectQueryBuilderImpl {
  constructor(queryBuilder, alias) {
    __privateAdd(this, _queryBuilder);
    __privateAdd(this, _alias2);
    __privateSet(this, _queryBuilder, queryBuilder);
    __privateSet(this, _alias2, alias);
  }
  get expression() {
    return __privateGet(this, _queryBuilder);
  }
  get alias() {
    return __privateGet(this, _alias2);
  }
  get isAliasedSelectQueryBuilder() {
    return true;
  }
  toOperationNode() {
    return AliasNode.create(__privateGet(this, _queryBuilder).toOperationNode(), IdentifierNode.create(__privateGet(this, _alias2)));
  }
}
_queryBuilder = new WeakMap();
_alias2 = new WeakMap();
preventAwait(AliasedSelectQueryBuilderImpl, "don't await AliasedSelectQueryBuilder instances directly. AliasedSelectQueryBuilder should never be executed directly since it's always a part of another query.");
const AggregateFunctionNode = freeze({
  is(node) {
    return node.kind === "AggregateFunctionNode";
  },
  create(aggregateFunction, aggregated = []) {
    return freeze({
      kind: "AggregateFunctionNode",
      func: aggregateFunction,
      aggregated
    });
  },
  cloneWithDistinct(aggregateFunctionNode) {
    return freeze({
      ...aggregateFunctionNode,
      distinct: true
    });
  },
  cloneWithOrderBy(aggregateFunctionNode, orderItems) {
    return freeze({
      ...aggregateFunctionNode,
      orderBy: aggregateFunctionNode.orderBy ? OrderByNode.cloneWithItems(aggregateFunctionNode.orderBy, orderItems) : OrderByNode.create(orderItems)
    });
  },
  cloneWithFilter(aggregateFunctionNode, filter) {
    return freeze({
      ...aggregateFunctionNode,
      filter: aggregateFunctionNode.filter ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, "And", filter) : WhereNode.create(filter)
    });
  },
  cloneWithOrFilter(aggregateFunctionNode, filter) {
    return freeze({
      ...aggregateFunctionNode,
      filter: aggregateFunctionNode.filter ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, "Or", filter) : WhereNode.create(filter)
    });
  },
  cloneWithOver(aggregateFunctionNode, over) {
    return freeze({
      ...aggregateFunctionNode,
      over
    });
  }
});
const FunctionNode = freeze({
  is(node) {
    return node.kind === "FunctionNode";
  },
  create(func, args) {
    return freeze({
      kind: "FunctionNode",
      func,
      arguments: args
    });
  }
});
const _AggregateFunctionBuilder = class _AggregateFunctionBuilder {
  constructor(props) {
    __privateAdd(this, _props16);
    __privateSet(this, _props16, freeze(props));
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  /**
   * Returns an aliased version of the function.
   *
   * In addition to slapping `as "the_alias"` to the end of the SQL,
   * this method also provides strict typing:
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select(
   *     (eb) => eb.fn.count<number>('id').as('person_count')
   *   )
   *   .executeTakeFirstOrThrow()
   *
   * // `person_count: number` field exists in the result type.
   * console.log(result.person_count)
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select count("id") as "person_count"
   * from "person"
   * ```
   */
  as(alias) {
    return new AliasedAggregateFunctionBuilder(this, alias);
  }
  /**
   * Adds a `distinct` clause inside the function.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select((eb) =>
   *     eb.fn.count<number>('first_name').distinct().as('first_name_count')
   *   )
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select count(distinct "first_name") as "first_name_count"
   * from "person"
   * ```
   */
  distinct() {
    return new _AggregateFunctionBuilder({
      ...__privateGet(this, _props16),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithDistinct(__privateGet(this, _props16).aggregateFunctionNode)
    });
  }
  /**
   * Adds an `order by` clause inside the aggregate function.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .innerJoin('pet', 'pet.owner_id', 'person.id')
   *   .select((eb) =>
   *     eb.fn.jsonAgg('pet').orderBy('pet.name').as('person_pets')
   *   )
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select json_agg("pet" order by "pet"."name") as "person_pets"
   * from "person"
   * inner join "pet" ON "pet"."owner_id" = "person"."id"
   * ```
   */
  orderBy(orderBy, direction) {
    return new _AggregateFunctionBuilder({
      ...__privateGet(this, _props16),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithOrderBy(__privateGet(this, _props16).aggregateFunctionNode, parseOrderBy([orderBy, direction]))
    });
  }
  filterWhere(...args) {
    return new _AggregateFunctionBuilder({
      ...__privateGet(this, _props16),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(__privateGet(this, _props16).aggregateFunctionNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  /**
   * Adds a `filter` clause with a nested `where` clause after the function, where
   * both sides of the operator are references to columns.
   *
   * Similar to {@link WhereInterface}'s `whereRef` method.
   *
   * ### Examples
   *
   * Count people with same first and last names versus general public:
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select((eb) => [
   *     eb.fn
   *       .count<number>('id')
   *       .filterWhereRef('first_name', '=', 'last_name')
   *       .as('repeat_name_count'),
   *     eb.fn.count<number>('id').as('total_count'),
   *   ])
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select
   *   count("id") filter(where "first_name" = "last_name") as "repeat_name_count",
   *   count("id") as "total_count"
   * from "person"
   * ```
   */
  filterWhereRef(lhs, op, rhs) {
    return new _AggregateFunctionBuilder({
      ...__privateGet(this, _props16),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(__privateGet(this, _props16).aggregateFunctionNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  /**
   * Adds an `over` clause (window functions) after the function.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select(
   *     (eb) => eb.fn.avg<number>('age').over().as('average_age')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select avg("age") over() as "average_age"
   * from "person"
   * ```
   *
   * Also supports passing a callback that returns an over builder,
   * allowing to add partition by and sort by clauses inside over.
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select(
   *     (eb) => eb.fn.avg<number>('age').over(
   *       ob => ob.partitionBy('last_name').orderBy('first_name', 'asc')
   *     ).as('average_age')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select avg("age") over(partition by "last_name" order by "first_name" asc) as "average_age"
   * from "person"
   * ```
   */
  over(over) {
    const builder = createOverBuilder();
    return new _AggregateFunctionBuilder({
      ...__privateGet(this, _props16),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithOver(__privateGet(this, _props16).aggregateFunctionNode, (over ? over(builder) : builder).toOperationNode())
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  /**
   * Casts the expression to the given type.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `AggregateFunctionBuilder` with a new output type.
   */
  $castTo() {
    return new _AggregateFunctionBuilder(__privateGet(this, _props16));
  }
  /**
   * Omit null from the expression's type.
   *
   * This function can be useful in cases where you know an expression can't be
   * null, but Kysely is unable to infer it.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of `this` with a new output type.
   */
  $notNull() {
    return new _AggregateFunctionBuilder(__privateGet(this, _props16));
  }
  toOperationNode() {
    return __privateGet(this, _props16).aggregateFunctionNode;
  }
};
_props16 = new WeakMap();
let AggregateFunctionBuilder = _AggregateFunctionBuilder;
preventAwait(AggregateFunctionBuilder, "don't await AggregateFunctionBuilder instances. They are never executed directly and are always just a part of a query.");
class AliasedAggregateFunctionBuilder {
  constructor(aggregateFunctionBuilder, alias) {
    __privateAdd(this, _aggregateFunctionBuilder);
    __privateAdd(this, _alias3);
    __privateSet(this, _aggregateFunctionBuilder, aggregateFunctionBuilder);
    __privateSet(this, _alias3, alias);
  }
  /** @private */
  get expression() {
    return __privateGet(this, _aggregateFunctionBuilder);
  }
  /** @private */
  get alias() {
    return __privateGet(this, _alias3);
  }
  toOperationNode() {
    return AliasNode.create(__privateGet(this, _aggregateFunctionBuilder).toOperationNode(), IdentifierNode.create(__privateGet(this, _alias3)));
  }
}
_aggregateFunctionBuilder = new WeakMap();
_alias3 = new WeakMap();
function createFunctionModule() {
  const fn = (name, args) => {
    return new ExpressionWrapper(FunctionNode.create(name, parseReferenceExpressionOrList(args ?? [])));
  };
  const agg = (name, args) => {
    return new AggregateFunctionBuilder({
      aggregateFunctionNode: AggregateFunctionNode.create(name, args ? parseReferenceExpressionOrList(args) : void 0)
    });
  };
  return Object.assign(fn, {
    agg,
    avg(column2) {
      return agg("avg", [column2]);
    },
    coalesce(...values) {
      return fn("coalesce", values);
    },
    count(column2) {
      return agg("count", [column2]);
    },
    countAll(table) {
      return new AggregateFunctionBuilder({
        aggregateFunctionNode: AggregateFunctionNode.create("count", parseSelectAll(table))
      });
    },
    max(column2) {
      return agg("max", [column2]);
    },
    min(column2) {
      return agg("min", [column2]);
    },
    sum(column2) {
      return agg("sum", [column2]);
    },
    any(column2) {
      return fn("any", [column2]);
    },
    jsonAgg(table) {
      return new AggregateFunctionBuilder({
        aggregateFunctionNode: AggregateFunctionNode.create("json_agg", [
          isString(table) ? parseTable$1(table) : table.toOperationNode()
        ])
      });
    },
    toJson(table) {
      return new ExpressionWrapper(FunctionNode.create("to_json", [
        isString(table) ? parseTable$1(table) : table.toOperationNode()
      ]));
    }
  });
}
const UnaryOperationNode = freeze({
  is(node) {
    return node.kind === "UnaryOperationNode";
  },
  create(operator, operand) {
    return freeze({
      kind: "UnaryOperationNode",
      operator,
      operand
    });
  }
});
function parseUnaryOperation(operator, operand) {
  return UnaryOperationNode.create(OperatorNode.create(operator), parseReferenceExpression(operand));
}
const CaseNode = freeze({
  is(node) {
    return node.kind === "CaseNode";
  },
  create(value) {
    return freeze({
      kind: "CaseNode",
      value
    });
  },
  cloneWithWhen(caseNode, when) {
    return freeze({
      ...caseNode,
      when: freeze(caseNode.when ? [...caseNode.when, when] : [when])
    });
  },
  cloneWithThen(caseNode, then) {
    return freeze({
      ...caseNode,
      when: caseNode.when ? freeze([
        ...caseNode.when.slice(0, -1),
        WhenNode.cloneWithResult(caseNode.when[caseNode.when.length - 1], then)
      ]) : void 0
    });
  },
  cloneWith(caseNode, props) {
    return freeze({
      ...caseNode,
      ...props
    });
  }
});
class CaseBuilder {
  constructor(props) {
    __privateAdd(this, _props17);
    __privateSet(this, _props17, freeze(props));
  }
  when(...args) {
    return new CaseThenBuilder({
      ...__privateGet(this, _props17),
      node: CaseNode.cloneWithWhen(__privateGet(this, _props17).node, WhenNode.create(parseValueBinaryOperationOrExpression(args)))
    });
  }
}
_props17 = new WeakMap();
class CaseThenBuilder {
  constructor(props) {
    __privateAdd(this, _props18);
    __privateSet(this, _props18, freeze(props));
  }
  then(valueExpression) {
    return new CaseWhenBuilder({
      ...__privateGet(this, _props18),
      node: CaseNode.cloneWithThen(__privateGet(this, _props18).node, isSafeImmediateValue(valueExpression) ? parseSafeImmediateValue(valueExpression) : parseValueExpression(valueExpression))
    });
  }
}
_props18 = new WeakMap();
class CaseWhenBuilder {
  constructor(props) {
    __privateAdd(this, _props19);
    __privateSet(this, _props19, freeze(props));
  }
  when(...args) {
    return new CaseThenBuilder({
      ...__privateGet(this, _props19),
      node: CaseNode.cloneWithWhen(__privateGet(this, _props19).node, WhenNode.create(parseValueBinaryOperationOrExpression(args)))
    });
  }
  else(valueExpression) {
    return new CaseEndBuilder({
      ...__privateGet(this, _props19),
      node: CaseNode.cloneWith(__privateGet(this, _props19).node, {
        else: isSafeImmediateValue(valueExpression) ? parseSafeImmediateValue(valueExpression) : parseValueExpression(valueExpression)
      })
    });
  }
  end() {
    return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props19).node, { isStatement: false }));
  }
  endCase() {
    return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props19).node, { isStatement: true }));
  }
}
_props19 = new WeakMap();
class CaseEndBuilder {
  constructor(props) {
    __privateAdd(this, _props20);
    __privateSet(this, _props20, freeze(props));
  }
  end() {
    return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props20).node, { isStatement: false }));
  }
  endCase() {
    return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props20).node, { isStatement: true }));
  }
}
_props20 = new WeakMap();
const JSONPathLegNode = freeze({
  is(node) {
    return node.kind === "JSONPathLegNode";
  },
  create(type, value) {
    return freeze({
      kind: "JSONPathLegNode",
      type,
      value
    });
  }
});
class JSONPathBuilder {
  constructor(node) {
    __privateAdd(this, _JSONPathBuilder_instances);
    __privateAdd(this, _node4);
    __privateSet(this, _node4, node);
  }
  /**
   * Access an element of a JSON array in a specific location.
   *
   * Since there's no guarantee an element exists in the given array location, the
   * resulting type is always nullable. If you're sure the element exists, you
   * should use {@link SelectQueryBuilder.$assertType} to narrow the type safely.
   *
   * See also {@link key} to access properties of JSON objects.
   *
   * ### Examples
   *
   * ```ts
   * await db.selectFrom('person')
   *   .select(eb =>
   *     eb.ref('nicknames', '->').at(0).as('primary_nickname')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "nicknames"->0 as "primary_nickname" from "person"
   *```
   *
   * Combined with {@link key}:
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('experience', '->').at(0).key('role').as('first_role')
   * )
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "experience"->0->'role' as "first_role" from "person"
   * ```
   *
   * You can use `'last'` to access the last element of the array in MySQL:
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('nicknames', '->$').at('last').as('last_nickname')
   * )
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * select `nicknames`->'$[last]' as `last_nickname` from `person`
   * ```
   *
   * Or `'#-1'` in SQLite:
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('nicknames', '->>$').at('#-1').as('last_nickname')
   * )
   * ```
   *
   * The generated SQL (SQLite):
   *
   * ```sql
   * select "nicknames"->>'$[#-1]' as `last_nickname` from `person`
   * ```
   */
  at(index) {
    return __privateMethod(this, _JSONPathBuilder_instances, createBuilderWithPathLeg_fn).call(this, "ArrayLocation", index);
  }
  /**
   * Access a property of a JSON object.
   *
   * If a field is optional, the resulting type will be nullable.
   *
   * See also {@link at} to access elements of JSON arrays.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('address', '->').key('city').as('city')
   * )
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "address"->'city' as "city" from "person"
   * ```
   *
   * Going deeper:
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('profile', '->$').key('website').key('url').as('website_url')
   * )
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * select `profile`->'$.website.url' as `website_url` from `person`
   * ```
   *
   * Combined with {@link at}:
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('profile', '->').key('addresses').at(0).key('city').as('city')
   * )
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "profile"->'addresses'->0->'city' as "city" from "person"
   * ```
   */
  key(key) {
    return __privateMethod(this, _JSONPathBuilder_instances, createBuilderWithPathLeg_fn).call(this, "Member", key);
  }
}
_node4 = new WeakMap();
_JSONPathBuilder_instances = new WeakSet();
createBuilderWithPathLeg_fn = function(legType, value) {
  if (JSONReferenceNode.is(__privateGet(this, _node4))) {
    return new TraversedJSONPathBuilder(JSONReferenceNode.cloneWithTraversal(__privateGet(this, _node4), JSONPathNode.is(__privateGet(this, _node4).traversal) ? JSONPathNode.cloneWithLeg(__privateGet(this, _node4).traversal, JSONPathLegNode.create(legType, value)) : JSONOperatorChainNode.cloneWithValue(__privateGet(this, _node4).traversal, ValueNode.createImmediate(value))));
  }
  return new TraversedJSONPathBuilder(JSONPathNode.cloneWithLeg(__privateGet(this, _node4), JSONPathLegNode.create(legType, value)));
};
const _TraversedJSONPathBuilder = class _TraversedJSONPathBuilder extends JSONPathBuilder {
  constructor(node) {
    super(node);
    __privateAdd(this, _node5);
    __privateSet(this, _node5, node);
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  as(alias) {
    return new AliasedJSONPathBuilder(this, alias);
  }
  /**
   * Change the output type of the json path.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `JSONPathBuilder` with a new output type.
   */
  $castTo() {
    return new _TraversedJSONPathBuilder(__privateGet(this, _node5));
  }
  $notNull() {
    return new _TraversedJSONPathBuilder(__privateGet(this, _node5));
  }
  toOperationNode() {
    return __privateGet(this, _node5);
  }
};
_node5 = new WeakMap();
let TraversedJSONPathBuilder = _TraversedJSONPathBuilder;
class AliasedJSONPathBuilder {
  constructor(jsonPath, alias) {
    __privateAdd(this, _jsonPath);
    __privateAdd(this, _alias4);
    __privateSet(this, _jsonPath, jsonPath);
    __privateSet(this, _alias4, alias);
  }
  /** @private */
  get expression() {
    return __privateGet(this, _jsonPath);
  }
  /** @private */
  get alias() {
    return __privateGet(this, _alias4);
  }
  toOperationNode() {
    return AliasNode.create(__privateGet(this, _jsonPath).toOperationNode(), isOperationNodeSource(__privateGet(this, _alias4)) ? __privateGet(this, _alias4).toOperationNode() : IdentifierNode.create(__privateGet(this, _alias4)));
  }
}
_jsonPath = new WeakMap();
_alias4 = new WeakMap();
const TupleNode = freeze({
  is(node) {
    return node.kind === "TupleNode";
  },
  create(values) {
    return freeze({
      kind: "TupleNode",
      values: freeze(values)
    });
  }
});
const SIMPLE_COLUMN_DATA_TYPES = [
  "varchar",
  "char",
  "text",
  "integer",
  "int2",
  "int4",
  "int8",
  "smallint",
  "bigint",
  "boolean",
  "real",
  "double precision",
  "float4",
  "float8",
  "decimal",
  "numeric",
  "binary",
  "bytea",
  "date",
  "datetime",
  "time",
  "timetz",
  "timestamp",
  "timestamptz",
  "serial",
  "bigserial",
  "uuid",
  "json",
  "jsonb",
  "blob",
  "varbinary",
  "int4range",
  "int4multirange",
  "int8range",
  "int8multirange",
  "numrange",
  "nummultirange",
  "tsrange",
  "tsmultirange",
  "tstzrange",
  "tstzmultirange",
  "daterange",
  "datemultirange"
];
const COLUMN_DATA_TYPE_REGEX = [
  /^varchar\(\d+\)$/,
  /^char\(\d+\)$/,
  /^decimal\(\d+, \d+\)$/,
  /^numeric\(\d+, \d+\)$/,
  /^binary\(\d+\)$/,
  /^datetime\(\d+\)$/,
  /^time\(\d+\)$/,
  /^timetz\(\d+\)$/,
  /^timestamp\(\d+\)$/,
  /^timestamptz\(\d+\)$/,
  /^varbinary\(\d+\)$/
];
const DataTypeNode = freeze({
  is(node) {
    return node.kind === "DataTypeNode";
  },
  create(dataType) {
    return freeze({
      kind: "DataTypeNode",
      dataType
    });
  }
});
function isColumnDataType(dataType) {
  if (SIMPLE_COLUMN_DATA_TYPES.includes(dataType)) {
    return true;
  }
  if (COLUMN_DATA_TYPE_REGEX.some((r) => r.test(dataType))) {
    return true;
  }
  return false;
}
function parseDataTypeExpression(dataType) {
  if (isOperationNodeSource(dataType)) {
    return dataType.toOperationNode();
  }
  if (isColumnDataType(dataType)) {
    return DataTypeNode.create(dataType);
  }
  throw new Error(`invalid column data type ${JSON.stringify(dataType)}`);
}
const CastNode = freeze({
  is(node) {
    return node.kind === "CastNode";
  },
  create(expression, dataType) {
    return freeze({
      kind: "CastNode",
      expression,
      dataType
    });
  }
});
function createExpressionBuilder(executor = NOOP_QUERY_EXECUTOR) {
  function binary(lhs, op, rhs) {
    return new ExpressionWrapper(parseValueBinaryOperation(lhs, op, rhs));
  }
  function unary(op, expr) {
    return new ExpressionWrapper(parseUnaryOperation(op, expr));
  }
  const eb = Object.assign(binary, {
    fn: void 0,
    eb: void 0,
    selectFrom(table) {
      return createSelectQueryBuilder({
        queryId: createQueryId(),
        executor,
        queryNode: SelectQueryNode.createFrom(parseTableExpressionOrList(table))
      });
    },
    case(reference) {
      return new CaseBuilder({
        node: CaseNode.create(isUndefined(reference) ? void 0 : parseReferenceExpression(reference))
      });
    },
    ref(reference, op) {
      if (isUndefined(op)) {
        return new ExpressionWrapper(parseStringReference(reference));
      }
      return new JSONPathBuilder(parseJSONReference(reference, op));
    },
    jsonPath() {
      return new JSONPathBuilder(JSONPathNode.create());
    },
    table(table) {
      return new ExpressionWrapper(parseTable$1(table));
    },
    val(value) {
      return new ExpressionWrapper(parseValueExpression(value));
    },
    refTuple(...values) {
      return new ExpressionWrapper(TupleNode.create(values.map(parseReferenceExpression)));
    },
    tuple(...values) {
      return new ExpressionWrapper(TupleNode.create(values.map(parseValueExpression)));
    },
    lit(value) {
      return new ExpressionWrapper(parseSafeImmediateValue(value));
    },
    unary,
    not(expr) {
      return unary("not", expr);
    },
    exists(expr) {
      return unary("exists", expr);
    },
    neg(expr) {
      return unary("-", expr);
    },
    between(expr, start, end) {
      return new ExpressionWrapper(BinaryOperationNode.create(parseReferenceExpression(expr), OperatorNode.create("between"), AndNode.create(parseValueExpression(start), parseValueExpression(end))));
    },
    betweenSymmetric(expr, start, end) {
      return new ExpressionWrapper(BinaryOperationNode.create(parseReferenceExpression(expr), OperatorNode.create("between symmetric"), AndNode.create(parseValueExpression(start), parseValueExpression(end))));
    },
    and(exprs) {
      if (isReadonlyArray(exprs)) {
        return new ExpressionWrapper(parseFilterList(exprs, "and"));
      }
      return new ExpressionWrapper(parseFilterObject(exprs, "and"));
    },
    or(exprs) {
      if (isReadonlyArray(exprs)) {
        return new ExpressionWrapper(parseFilterList(exprs, "or"));
      }
      return new ExpressionWrapper(parseFilterObject(exprs, "or"));
    },
    parens(...args) {
      const node = parseValueBinaryOperationOrExpression(args);
      if (ParensNode.is(node)) {
        return new ExpressionWrapper(node);
      } else {
        return new ExpressionWrapper(ParensNode.create(node));
      }
    },
    cast(expr, dataType) {
      return new ExpressionWrapper(CastNode.create(parseReferenceExpression(expr), parseDataTypeExpression(dataType)));
    },
    withSchema(schema) {
      return createExpressionBuilder(executor.withPluginAtFront(new WithSchemaPlugin(schema)));
    }
  });
  eb.fn = createFunctionModule();
  eb.eb = eb;
  return eb;
}
function expressionBuilder(_) {
  return createExpressionBuilder();
}
function parseExpression(exp) {
  if (isOperationNodeSource(exp)) {
    return exp.toOperationNode();
  } else if (isFunction(exp)) {
    return exp(expressionBuilder()).toOperationNode();
  }
  throw new Error(`invalid expression: ${JSON.stringify(exp)}`);
}
function parseAliasedExpression(exp) {
  if (isOperationNodeSource(exp)) {
    return exp.toOperationNode();
  } else if (isFunction(exp)) {
    return exp(expressionBuilder()).toOperationNode();
  }
  throw new Error(`invalid aliased expression: ${JSON.stringify(exp)}`);
}
function isExpressionOrFactory(obj) {
  return isExpression(obj) || isAliasedExpression(obj) || isFunction(obj);
}
function parseTableExpressionOrList(table) {
  if (isReadonlyArray(table)) {
    return table.map((it) => parseTableExpression(it));
  } else {
    return [parseTableExpression(table)];
  }
}
function parseTableExpression(table) {
  if (isString(table)) {
    return parseAliasedTable(table);
  } else {
    return parseAliasedExpression(table);
  }
}
function parseAliasedTable(from) {
  const ALIAS_SEPARATOR = " as ";
  if (from.includes(ALIAS_SEPARATOR)) {
    const [table, alias] = from.split(ALIAS_SEPARATOR).map(trim$1);
    return AliasNode.create(parseTable$1(table), IdentifierNode.create(alias));
  } else {
    return parseTable$1(from);
  }
}
function parseTable$1(from) {
  const SCHEMA_SEPARATOR = ".";
  if (from.includes(SCHEMA_SEPARATOR)) {
    const [schema, table] = from.split(SCHEMA_SEPARATOR).map(trim$1);
    return TableNode.createWithSchema(schema, table);
  } else {
    return TableNode.create(from);
  }
}
function trim$1(str) {
  return str.trim();
}
const AddColumnNode = freeze({
  is(node) {
    return node.kind === "AddColumnNode";
  },
  create(column2) {
    return freeze({
      kind: "AddColumnNode",
      column: column2
    });
  }
});
const ColumnDefinitionNode = freeze({
  is(node) {
    return node.kind === "ColumnDefinitionNode";
  },
  create(column2, dataType) {
    return freeze({
      kind: "ColumnDefinitionNode",
      column: ColumnNode.create(column2),
      dataType
    });
  },
  cloneWithFrontModifier(node, modifier) {
    return freeze({
      ...node,
      frontModifiers: node.frontModifiers ? freeze([...node.frontModifiers, modifier]) : [modifier]
    });
  },
  cloneWithEndModifier(node, modifier) {
    return freeze({
      ...node,
      endModifiers: node.endModifiers ? freeze([...node.endModifiers, modifier]) : [modifier]
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});
const DropColumnNode = freeze({
  is(node) {
    return node.kind === "DropColumnNode";
  },
  create(column2) {
    return freeze({
      kind: "DropColumnNode",
      column: ColumnNode.create(column2)
    });
  }
});
const RenameColumnNode = freeze({
  is(node) {
    return node.kind === "RenameColumnNode";
  },
  create(column2, newColumn) {
    return freeze({
      kind: "RenameColumnNode",
      column: ColumnNode.create(column2),
      renameTo: ColumnNode.create(newColumn)
    });
  }
});
const CheckConstraintNode = freeze({
  is(node) {
    return node.kind === "CheckConstraintNode";
  },
  create(expression, constraintName) {
    return freeze({
      kind: "CheckConstraintNode",
      expression,
      name: constraintName ? IdentifierNode.create(constraintName) : void 0
    });
  }
});
const ON_MODIFY_FOREIGN_ACTIONS = [
  "no action",
  "restrict",
  "cascade",
  "set null",
  "set default"
];
const ReferencesNode = freeze({
  is(node) {
    return node.kind === "ReferencesNode";
  },
  create(table, columns) {
    return freeze({
      kind: "ReferencesNode",
      table,
      columns: freeze([...columns])
    });
  },
  cloneWithOnDelete(references, onDelete) {
    return freeze({
      ...references,
      onDelete
    });
  },
  cloneWithOnUpdate(references, onUpdate) {
    return freeze({
      ...references,
      onUpdate
    });
  }
});
function parseDefaultValueExpression(value) {
  return isOperationNodeSource(value) ? value.toOperationNode() : ValueNode.createImmediate(value);
}
const GeneratedNode = freeze({
  is(node) {
    return node.kind === "GeneratedNode";
  },
  create(params) {
    return freeze({
      kind: "GeneratedNode",
      ...params
    });
  },
  createWithExpression(expression) {
    return freeze({
      kind: "GeneratedNode",
      always: true,
      expression
    });
  },
  cloneWith(node, params) {
    return freeze({
      ...node,
      ...params
    });
  }
});
const DefaultValueNode = freeze({
  is(node) {
    return node.kind === "DefaultValueNode";
  },
  create(defaultValue) {
    return freeze({
      kind: "DefaultValueNode",
      defaultValue
    });
  }
});
function parseOnModifyForeignAction(action) {
  if (ON_MODIFY_FOREIGN_ACTIONS.includes(action)) {
    return action;
  }
  throw new Error(`invalid OnModifyForeignAction ${action}`);
}
const _ColumnDefinitionBuilder = class _ColumnDefinitionBuilder {
  constructor(node) {
    __privateAdd(this, _node6);
    __privateSet(this, _node6, node);
  }
  /**
   * Adds `auto_increment` or `autoincrement` to the column definition
   * depending on the dialect.
   *
   * Some dialects like PostgreSQL don't support this. On PostgreSQL
   * you can use the `serial` or `bigserial` data type instead.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.autoIncrement().primaryKey())
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key auto_increment
   * )
   * ```
   */
  autoIncrement() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), { autoIncrement: true }));
  }
  /**
   * Makes the column an identity column.
   *
   * This only works on some dialects like MS SQL Server (MSSQL).
   *
   * For PostgreSQL's `generated always as identity` use {@link generatedAlwaysAsIdentity}.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.identity().primaryKey())
   *   .execute()
   * ```
   *
   * The generated SQL (MSSQL):
   *
   * ```sql
   * create table "person" (
   *   "id" integer identity primary key
   * )
   * ```
   */
  identity() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), { identity: true }));
  }
  /**
   * Makes the column the primary key.
   *
   * If you want to specify a composite primary key use the
   * {@link CreateTableBuilder.addPrimaryKeyConstraint} method.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key
   * )
   */
  primaryKey() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), { primaryKey: true }));
  }
  /**
   * Adds a foreign key constraint for the column.
   *
   * If your database engine doesn't support foreign key constraints in the
   * column definition (like MySQL 5) you need to call the table level
   * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('owner_id', 'integer', (col) => col.references('person.id'))
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "pet" (
   *   "owner_id" integer references "person" ("id")
   * )
   * ```
   */
  references(ref) {
    const references = parseStringReference(ref);
    if (!references.table || SelectAllNode.is(references.column)) {
      throw new Error(`invalid call references('${ref}'). The reference must have format table.column or schema.table.column`);
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), {
      references: ReferencesNode.create(references.table, [
        references.column
      ])
    }));
  }
  /**
   * Adds an `on delete` constraint for the foreign key column.
   *
   * If your database engine doesn't support foreign key constraints in the
   * column definition (like MySQL 5) you need to call the table level
   * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn(
   *     'owner_id',
   *     'integer',
   *     (col) => col.references('person.id').onDelete('cascade')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "pet" (
   *   "owner_id" integer references "person" ("id") on delete cascade
   * )
   * ```
   */
  onDelete(onDelete) {
    if (!__privateGet(this, _node6).references) {
      throw new Error("on delete constraint can only be added for foreign keys");
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), {
      references: ReferencesNode.cloneWithOnDelete(__privateGet(this, _node6).references, parseOnModifyForeignAction(onDelete))
    }));
  }
  /**
   * Adds an `on update` constraint for the foreign key column.
   *
   * If your database engine doesn't support foreign key constraints in the
   * column definition (like MySQL 5) you need to call the table level
   * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn(
   *     'owner_id',
   *     'integer',
   *     (col) => col.references('person.id').onUpdate('cascade')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "pet" (
   *   "owner_id" integer references "person" ("id") on update cascade
   * )
   * ```
   */
  onUpdate(onUpdate) {
    if (!__privateGet(this, _node6).references) {
      throw new Error("on update constraint can only be added for foreign keys");
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), {
      references: ReferencesNode.cloneWithOnUpdate(__privateGet(this, _node6).references, parseOnModifyForeignAction(onUpdate))
    }));
  }
  /**
   * Adds a unique constraint for the column.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('email', 'varchar(255)', col => col.unique())
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `email` varchar(255) unique
   * )
   * ```
   */
  unique() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), { unique: true }));
  }
  /**
   * Adds a `not null` constraint for the column.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('first_name', 'varchar(255)', col => col.notNull())
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `first_name` varchar(255) not null
   * )
   * ```
   */
  notNull() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), { notNull: true }));
  }
  /**
   * Adds a `unsigned` modifier for the column.
   *
   * This only works on some dialects like MySQL.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('age', 'integer', col => col.unsigned())
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `age` integer unsigned
   * )
   * ```
   */
  unsigned() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), { unsigned: true }));
  }
  /**
   * Adds a default value constraint for the column.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('number_of_legs', 'integer', (col) => col.defaultTo(4))
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `pet` (
   *   `number_of_legs` integer default 4
   * )
   * ```
   *
   * Values passed to `defaultTo` are interpreted as value literals by default. You can define
   * an arbitrary SQL expression using the {@link sql} template tag:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('pet')
   *   .addColumn(
   *     'created_at',
   *     'timestamp',
   *     (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`)
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `pet` (
   *   `created_at` timestamp default CURRENT_TIMESTAMP
   * )
   * ```
   */
  defaultTo(value) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), {
      defaultTo: DefaultValueNode.create(parseDefaultValueExpression(value))
    }));
  }
  /**
   * Adds a check constraint for the column.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('number_of_legs', 'integer', (col) =>
   *     col.check(sql`number_of_legs < 5`)
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `pet` (
   *   `number_of_legs` integer check (number_of_legs < 5)
   * )
   * ```
   */
  check(expression) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), {
      check: CheckConstraintNode.create(expression.toOperationNode())
    }));
  }
  /**
   * Makes the column a generated column using a `generated always as` statement.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('full_name', 'varchar(255)',
   *     (col) => col.generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `full_name` varchar(255) generated always as (concat(first_name, ' ', last_name))
   * )
   * ```
   */
  generatedAlwaysAs(expression) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), {
      generated: GeneratedNode.createWithExpression(expression.toOperationNode())
    }));
  }
  /**
   * Adds the `generated always as identity` specifier.
   *
   * This only works on some dialects like PostgreSQL.
   *
   * For MS SQL Server (MSSQL)'s identity column use {@link identity}.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.generatedAlwaysAsIdentity().primaryKey())
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "person" (
   *   "id" integer generated always as identity primary key
   * )
   * ```
   */
  generatedAlwaysAsIdentity() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), {
      generated: GeneratedNode.create({ identity: true, always: true })
    }));
  }
  /**
   * Adds the `generated by default as identity` specifier on supported dialects.
   *
   * This only works on some dialects like PostgreSQL.
   *
   * For MS SQL Server (MSSQL)'s identity column use {@link identity}.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.generatedByDefaultAsIdentity().primaryKey())
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "person" (
   *   "id" integer generated by default as identity primary key
   * )
   * ```
   */
  generatedByDefaultAsIdentity() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), {
      generated: GeneratedNode.create({ identity: true, byDefault: true })
    }));
  }
  /**
   * Makes a generated column stored instead of virtual. This method can only
   * be used with {@link generatedAlwaysAs}
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('full_name', 'varchar(255)', (col) => col
   *     .generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
   *     .stored()
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `full_name` varchar(255) generated always as (concat(first_name, ' ', last_name)) stored
   * )
   * ```
   */
  stored() {
    if (!__privateGet(this, _node6).generated) {
      throw new Error("stored() can only be called after generatedAlwaysAs");
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), {
      generated: GeneratedNode.cloneWith(__privateGet(this, _node6).generated, {
        stored: true
      })
    }));
  }
  /**
   * This can be used to add any additional SQL right after the column's data type.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn(
   *     'first_name',
   *     'varchar(36)',
   *     (col) => col.modifyFront(sql`collate utf8mb4_general_ci`).notNull()
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key,
   *   `first_name` varchar(36) collate utf8mb4_general_ci not null
   * )
   * ```
   */
  modifyFront(modifier) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithFrontModifier(__privateGet(this, _node6), modifier.toOperationNode()));
  }
  /**
   * Adds `nulls not distinct` specifier.
   * Should be used with `unique` constraint.
   *
   * This only works on some dialects like PostgreSQL.
   *
   * ### Examples
   *
   * ```ts
   * db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn('first_name', 'varchar(30)', col => col.unique().nullsNotDistinct())
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create table "person" (
   *   "id" integer primary key,
   *   "first_name" varchar(30) unique nulls not distinct
   * )
   * ```
   */
  nullsNotDistinct() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), { nullsNotDistinct: true }));
  }
  /**
   * Adds `if not exists` specifier. This only works for PostgreSQL.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .alterTable('person')
   *   .addColumn('email', 'varchar(255)', col => col.unique().ifNotExists())
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * alter table "person" add column if not exists "email" varchar(255) unique
   * ```
   */
  ifNotExists() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), { ifNotExists: true }));
  }
  /**
   * This can be used to add any additional SQL to the end of the column definition.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn(
   *     'age',
   *     'integer',
   *     col => col.unsigned()
   *       .notNull()
   *       .modifyEnd(sql`comment ${sql.lit('it is not polite to ask a woman her age')}`)
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key,
   *   `age` integer unsigned not null comment 'it is not polite to ask a woman her age'
   * )
   * ```
   */
  modifyEnd(modifier) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithEndModifier(__privateGet(this, _node6), modifier.toOperationNode()));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _node6);
  }
};
_node6 = new WeakMap();
let ColumnDefinitionBuilder = _ColumnDefinitionBuilder;
preventAwait(ColumnDefinitionBuilder, "don't await ColumnDefinitionBuilder instances directly.");
const ModifyColumnNode = freeze({
  is(node) {
    return node.kind === "ModifyColumnNode";
  },
  create(column2) {
    return freeze({
      kind: "ModifyColumnNode",
      column: column2
    });
  }
});
const ForeignKeyConstraintNode = freeze({
  is(node) {
    return node.kind === "ForeignKeyConstraintNode";
  },
  create(sourceColumns, targetTable, targetColumns, constraintName) {
    return freeze({
      kind: "ForeignKeyConstraintNode",
      columns: sourceColumns,
      references: ReferencesNode.create(targetTable, targetColumns),
      name: constraintName ? IdentifierNode.create(constraintName) : void 0
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});
const _ForeignKeyConstraintBuilder = class _ForeignKeyConstraintBuilder {
  constructor(node) {
    __privateAdd(this, _node7);
    __privateSet(this, _node7, node);
  }
  onDelete(onDelete) {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(__privateGet(this, _node7), {
      onDelete: parseOnModifyForeignAction(onDelete)
    }));
  }
  onUpdate(onUpdate) {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(__privateGet(this, _node7), {
      onUpdate: parseOnModifyForeignAction(onUpdate)
    }));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _node7);
  }
};
_node7 = new WeakMap();
let ForeignKeyConstraintBuilder = _ForeignKeyConstraintBuilder;
preventAwait(ForeignKeyConstraintBuilder, "don't await ForeignKeyConstraintBuilder instances directly.");
const AddConstraintNode = freeze({
  is(node) {
    return node.kind === "AddConstraintNode";
  },
  create(constraint) {
    return freeze({
      kind: "AddConstraintNode",
      constraint
    });
  }
});
const UniqueConstraintNode = freeze({
  is(node) {
    return node.kind === "UniqueConstraintNode";
  },
  create(columns, constraintName, nullsNotDistinct) {
    return freeze({
      kind: "UniqueConstraintNode",
      columns: freeze(columns.map(ColumnNode.create)),
      name: constraintName ? IdentifierNode.create(constraintName) : void 0,
      nullsNotDistinct
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});
const DropConstraintNode = freeze({
  is(node) {
    return node.kind === "DropConstraintNode";
  },
  create(constraintName) {
    return freeze({
      kind: "DropConstraintNode",
      constraintName: IdentifierNode.create(constraintName)
    });
  },
  cloneWith(dropConstraint, props) {
    return freeze({
      ...dropConstraint,
      ...props
    });
  }
});
const AlterColumnNode = freeze({
  is(node) {
    return node.kind === "AlterColumnNode";
  },
  create(column2, prop, value) {
    return freeze({
      kind: "AlterColumnNode",
      column: ColumnNode.create(column2),
      [prop]: value
    });
  }
});
class AlterColumnBuilder {
  constructor(column2) {
    __privateAdd(this, _column);
    __privateSet(this, _column, column2);
  }
  setDataType(dataType) {
    return new AlteredColumnBuilder(AlterColumnNode.create(__privateGet(this, _column), "dataType", parseDataTypeExpression(dataType)));
  }
  setDefault(value) {
    return new AlteredColumnBuilder(AlterColumnNode.create(__privateGet(this, _column), "setDefault", parseDefaultValueExpression(value)));
  }
  dropDefault() {
    return new AlteredColumnBuilder(AlterColumnNode.create(__privateGet(this, _column), "dropDefault", true));
  }
  setNotNull() {
    return new AlteredColumnBuilder(AlterColumnNode.create(__privateGet(this, _column), "setNotNull", true));
  }
  dropNotNull() {
    return new AlteredColumnBuilder(AlterColumnNode.create(__privateGet(this, _column), "dropNotNull", true));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
}
_column = new WeakMap();
preventAwait(AlterColumnBuilder, "don't await AlterColumnBuilder instances");
class AlteredColumnBuilder {
  constructor(alterColumnNode) {
    __privateAdd(this, _alterColumnNode);
    __privateSet(this, _alterColumnNode, alterColumnNode);
  }
  toOperationNode() {
    return __privateGet(this, _alterColumnNode);
  }
}
_alterColumnNode = new WeakMap();
preventAwait(AlteredColumnBuilder, "don't await AlteredColumnBuilder instances");
class AlterTableExecutor {
  constructor(props) {
    __privateAdd(this, _props21);
    __privateSet(this, _props21, freeze(props));
  }
  toOperationNode() {
    return __privateGet(this, _props21).executor.transformQuery(__privateGet(this, _props21).node, __privateGet(this, _props21).queryId);
  }
  compile() {
    return __privateGet(this, _props21).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props21).queryId);
  }
  async execute() {
    await __privateGet(this, _props21).executor.executeQuery(this.compile(), __privateGet(this, _props21).queryId);
  }
}
_props21 = new WeakMap();
preventAwait(AlterTableExecutor, "don't await AlterTableExecutor instances directly. To execute the query you need to call `execute`");
const _AlterTableAddForeignKeyConstraintBuilder = class _AlterTableAddForeignKeyConstraintBuilder {
  constructor(props) {
    __privateAdd(this, _props22);
    __privateSet(this, _props22, freeze(props));
  }
  onDelete(onDelete) {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...__privateGet(this, _props22),
      constraintBuilder: __privateGet(this, _props22).constraintBuilder.onDelete(onDelete)
    });
  }
  onUpdate(onUpdate) {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...__privateGet(this, _props22),
      constraintBuilder: __privateGet(this, _props22).constraintBuilder.onUpdate(onUpdate)
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _props22).executor.transformQuery(AlterTableNode.cloneWithTableProps(__privateGet(this, _props22).node, {
      addConstraint: AddConstraintNode.create(__privateGet(this, _props22).constraintBuilder.toOperationNode())
    }), __privateGet(this, _props22).queryId);
  }
  compile() {
    return __privateGet(this, _props22).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props22).queryId);
  }
  async execute() {
    await __privateGet(this, _props22).executor.executeQuery(this.compile(), __privateGet(this, _props22).queryId);
  }
};
_props22 = new WeakMap();
let AlterTableAddForeignKeyConstraintBuilder = _AlterTableAddForeignKeyConstraintBuilder;
preventAwait(AlterTableAddForeignKeyConstraintBuilder, "don't await AlterTableAddForeignKeyConstraintBuilder instances directly. To execute the query you need to call `execute`");
const _AlterTableDropConstraintBuilder = class _AlterTableDropConstraintBuilder {
  constructor(props) {
    __privateAdd(this, _props23);
    __privateSet(this, _props23, freeze(props));
  }
  ifExists() {
    return new _AlterTableDropConstraintBuilder({
      ...__privateGet(this, _props23),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props23).node, {
        dropConstraint: DropConstraintNode.cloneWith(__privateGet(this, _props23).node.dropConstraint, {
          ifExists: true
        })
      })
    });
  }
  cascade() {
    return new _AlterTableDropConstraintBuilder({
      ...__privateGet(this, _props23),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props23).node, {
        dropConstraint: DropConstraintNode.cloneWith(__privateGet(this, _props23).node.dropConstraint, {
          modifier: "cascade"
        })
      })
    });
  }
  restrict() {
    return new _AlterTableDropConstraintBuilder({
      ...__privateGet(this, _props23),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props23).node, {
        dropConstraint: DropConstraintNode.cloneWith(__privateGet(this, _props23).node.dropConstraint, {
          modifier: "restrict"
        })
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _props23).executor.transformQuery(__privateGet(this, _props23).node, __privateGet(this, _props23).queryId);
  }
  compile() {
    return __privateGet(this, _props23).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props23).queryId);
  }
  async execute() {
    await __privateGet(this, _props23).executor.executeQuery(this.compile(), __privateGet(this, _props23).queryId);
  }
};
_props23 = new WeakMap();
let AlterTableDropConstraintBuilder = _AlterTableDropConstraintBuilder;
preventAwait(AlterTableDropConstraintBuilder, "don't await AlterTableDropConstraintBuilder instances directly. To execute the query you need to call `execute`");
const PrimaryConstraintNode = freeze({
  is(node) {
    return node.kind === "PrimaryKeyConstraintNode";
  },
  create(columns, constraintName) {
    return freeze({
      kind: "PrimaryKeyConstraintNode",
      columns: freeze(columns.map(ColumnNode.create)),
      name: constraintName ? IdentifierNode.create(constraintName) : void 0
    });
  }
});
const AddIndexNode = freeze({
  is(node) {
    return node.kind === "AddIndexNode";
  },
  create(name) {
    return freeze({
      kind: "AddIndexNode",
      name: IdentifierNode.create(name)
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  },
  cloneWithColumns(node, columns) {
    return freeze({
      ...node,
      columns: [...node.columns || [], ...columns]
    });
  }
});
const _AlterTableAddIndexBuilder = class _AlterTableAddIndexBuilder {
  constructor(props) {
    __privateAdd(this, _props24);
    __privateSet(this, _props24, freeze(props));
  }
  /**
   * Makes the index unique.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .alterTable('person')
   *   .addIndex('person_first_name_index')
   *   .unique()
   *   .column('email')
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` add unique index `person_first_name_index` (`email`)
   * ```
   */
  unique() {
    return new _AlterTableAddIndexBuilder({
      ...__privateGet(this, _props24),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props24).node, {
        addIndex: AddIndexNode.cloneWith(__privateGet(this, _props24).node.addIndex, {
          unique: true
        })
      })
    });
  }
  /**
   * Adds a column to the index.
   *
   * Also see {@link columns} for adding multiple columns at once or {@link expression}
   * for specifying an arbitrary expression.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .alterTable('person')
   *   .addIndex('person_first_name_and_age_index')
   *   .column('first_name')
   *   .column('age desc')
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` add index `person_first_name_and_age_index` (`first_name`, `age` desc)
   * ```
   */
  column(column2) {
    return new _AlterTableAddIndexBuilder({
      ...__privateGet(this, _props24),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props24).node, {
        addIndex: AddIndexNode.cloneWithColumns(__privateGet(this, _props24).node.addIndex, [
          parseOrderedColumnName(column2)
        ])
      })
    });
  }
  /**
   * Specifies a list of columns for the index.
   *
   * Also see {@link column} for adding a single column or {@link expression} for
   * specifying an arbitrary expression.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .alterTable('person')
   *   .addIndex('person_first_name_and_age_index')
   *   .columns(['first_name', 'age desc'])
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` add index `person_first_name_and_age_index` (`first_name`, `age` desc)
   * ```
   */
  columns(columns) {
    return new _AlterTableAddIndexBuilder({
      ...__privateGet(this, _props24),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props24).node, {
        addIndex: AddIndexNode.cloneWithColumns(__privateGet(this, _props24).node.addIndex, columns.map(parseOrderedColumnName))
      })
    });
  }
  /**
   * Specifies an arbitrary expression for the index.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .alterTable('person')
   *   .addIndex('person_first_name_index')
   *   .expression(sql<boolean>`(first_name < 'Sami')`)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` add index `person_first_name_index` ((first_name < 'Sami'))
   * ```
   */
  expression(expression) {
    return new _AlterTableAddIndexBuilder({
      ...__privateGet(this, _props24),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props24).node, {
        addIndex: AddIndexNode.cloneWithColumns(__privateGet(this, _props24).node.addIndex, [
          expression.toOperationNode()
        ])
      })
    });
  }
  using(indexType) {
    return new _AlterTableAddIndexBuilder({
      ...__privateGet(this, _props24),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props24).node, {
        addIndex: AddIndexNode.cloneWith(__privateGet(this, _props24).node.addIndex, {
          using: RawNode.createWithSql(indexType)
        })
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _props24).executor.transformQuery(__privateGet(this, _props24).node, __privateGet(this, _props24).queryId);
  }
  compile() {
    return __privateGet(this, _props24).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props24).queryId);
  }
  async execute() {
    await __privateGet(this, _props24).executor.executeQuery(this.compile(), __privateGet(this, _props24).queryId);
  }
};
_props24 = new WeakMap();
let AlterTableAddIndexBuilder = _AlterTableAddIndexBuilder;
preventAwait(AlterTableAddIndexBuilder, "don't await AlterTableAddIndexBuilder instances directly. To execute the query you need to call `execute`");
const _UniqueConstraintNodeBuilder = class _UniqueConstraintNodeBuilder {
  constructor(node) {
    __privateAdd(this, _node8);
    __privateSet(this, _node8, node);
  }
  toOperationNode() {
    return __privateGet(this, _node8);
  }
  /**
   * Adds `nulls not distinct` to the unique constraint definition
   *
   * Supported by PostgreSQL dialect only
   */
  nullsNotDistinct() {
    return new _UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(__privateGet(this, _node8), { nullsNotDistinct: true }));
  }
};
_node8 = new WeakMap();
let UniqueConstraintNodeBuilder = _UniqueConstraintNodeBuilder;
preventAwait(UniqueConstraintNodeBuilder, "don't await UniqueConstraintNodeBuilder instances directly.");
class AlterTableBuilder {
  constructor(props) {
    __privateAdd(this, _props25);
    __privateSet(this, _props25, freeze(props));
  }
  renameTo(newTableName) {
    return new AlterTableExecutor({
      ...__privateGet(this, _props25),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props25).node, {
        renameTo: parseTable$1(newTableName)
      })
    });
  }
  setSchema(newSchema) {
    return new AlterTableExecutor({
      ...__privateGet(this, _props25),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props25).node, {
        setSchema: IdentifierNode.create(newSchema)
      })
    });
  }
  alterColumn(column2, alteration) {
    const builder = alteration(new AlterColumnBuilder(column2));
    return new AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props25),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props25).node, builder.toOperationNode())
    });
  }
  dropColumn(column2) {
    return new AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props25),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props25).node, DropColumnNode.create(column2))
    });
  }
  renameColumn(column2, newColumn) {
    return new AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props25),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props25).node, RenameColumnNode.create(column2, newColumn))
    });
  }
  addColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props25),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props25).node, AddColumnNode.create(builder.toOperationNode()))
    });
  }
  modifyColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props25),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props25).node, ModifyColumnNode.create(builder.toOperationNode()))
    });
  }
  /**
   * See {@link CreateTableBuilder.addUniqueConstraint}
   */
  addUniqueConstraint(constraintName, columns, build = noop) {
    const uniqueConstraintBuilder = build(new UniqueConstraintNodeBuilder(UniqueConstraintNode.create(columns, constraintName)));
    return new AlterTableExecutor({
      ...__privateGet(this, _props25),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props25).node, {
        addConstraint: AddConstraintNode.create(uniqueConstraintBuilder.toOperationNode())
      })
    });
  }
  /**
   * See {@link CreateTableBuilder.addCheckConstraint}
   */
  addCheckConstraint(constraintName, checkExpression) {
    return new AlterTableExecutor({
      ...__privateGet(this, _props25),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props25).node, {
        addConstraint: AddConstraintNode.create(CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName))
      })
    });
  }
  /**
   * See {@link CreateTableBuilder.addForeignKeyConstraint}
   *
   * Unlike {@link CreateTableBuilder.addForeignKeyConstraint} this method returns
   * the constraint builder and doesn't take a callback as the last argument. This
   * is because you can only add one column per `ALTER TABLE` query.
   */
  addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns) {
    return new AlterTableAddForeignKeyConstraintBuilder({
      ...__privateGet(this, _props25),
      constraintBuilder: new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable$1(targetTable), targetColumns.map(ColumnNode.create), constraintName))
    });
  }
  /**
   * See {@link CreateTableBuilder.addPrimaryKeyConstraint}
   */
  addPrimaryKeyConstraint(constraintName, columns) {
    return new AlterTableExecutor({
      ...__privateGet(this, _props25),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props25).node, {
        addConstraint: AddConstraintNode.create(PrimaryConstraintNode.create(columns, constraintName))
      })
    });
  }
  dropConstraint(constraintName) {
    return new AlterTableDropConstraintBuilder({
      ...__privateGet(this, _props25),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props25).node, {
        dropConstraint: DropConstraintNode.create(constraintName)
      })
    });
  }
  /**
   * This can be used to add index to table.
   *
   *  ### Examples
   *
   * ```ts
   * db.schema.alterTable('person')
   *   .addIndex('person_email_index')
   *   .column('email')
   *   .unique()
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` add unique index `person_email_index` (`email`)
   * ```
   */
  addIndex(indexName) {
    return new AlterTableAddIndexBuilder({
      ...__privateGet(this, _props25),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props25).node, {
        addIndex: AddIndexNode.create(indexName)
      })
    });
  }
  /**
   * This can be used to drop index from table.
   *
   * ### Examples
   *
   * ```ts
   * db.schema.alterTable('person')
   *   .dropIndex('person_email_index')
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * alter table `person` drop index `test_first_name_index`
   * ```
   */
  dropIndex(indexName) {
    return new AlterTableExecutor({
      ...__privateGet(this, _props25),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props25).node, {
        dropIndex: DropIndexNode.create(indexName)
      })
    });
  }
  /**
   * Calls the given function passing `this` as the only argument.
   *
   * See {@link CreateTableBuilder.$call}
   */
  $call(func) {
    return func(this);
  }
}
_props25 = new WeakMap();
preventAwait(AlterTableBuilder, "don't await AlterTableBuilder instances");
const _AlterTableColumnAlteringBuilder = class _AlterTableColumnAlteringBuilder {
  constructor(props) {
    __privateAdd(this, _props26);
    __privateSet(this, _props26, freeze(props));
  }
  alterColumn(column2, alteration) {
    const builder = alteration(new AlterColumnBuilder(column2));
    return new _AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props26),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props26).node, builder.toOperationNode())
    });
  }
  dropColumn(column2) {
    return new _AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props26),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props26).node, DropColumnNode.create(column2))
    });
  }
  renameColumn(column2, newColumn) {
    return new _AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props26),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props26).node, RenameColumnNode.create(column2, newColumn))
    });
  }
  addColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new _AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props26),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props26).node, AddColumnNode.create(builder.toOperationNode()))
    });
  }
  modifyColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new _AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props26),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props26).node, ModifyColumnNode.create(builder.toOperationNode()))
    });
  }
  toOperationNode() {
    return __privateGet(this, _props26).executor.transformQuery(__privateGet(this, _props26).node, __privateGet(this, _props26).queryId);
  }
  compile() {
    return __privateGet(this, _props26).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props26).queryId);
  }
  async execute() {
    await __privateGet(this, _props26).executor.executeQuery(this.compile(), __privateGet(this, _props26).queryId);
  }
};
_props26 = new WeakMap();
let AlterTableColumnAlteringBuilder = _AlterTableColumnAlteringBuilder;
preventAwait(AlterTableColumnAlteringBuilder, "don't await AlterTableColumnAlteringBuilder instances directly. To execute the query you need to call `execute`");
class ImmediateValueTransformer extends OperationNodeTransformer {
  transformValue(node) {
    return {
      ...super.transformValue(node),
      immediate: true
    };
  }
}
const _CreateIndexBuilder = class _CreateIndexBuilder {
  constructor(props) {
    __privateAdd(this, _props27);
    __privateSet(this, _props27, freeze(props));
  }
  /**
   * Adds the "if not exists" modifier.
   *
   * If the index already exists, no error is thrown if this method has been called.
   */
  ifNotExists() {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props27),
      node: CreateIndexNode.cloneWith(__privateGet(this, _props27).node, {
        ifNotExists: true
      })
    });
  }
  /**
   * Makes the index unique.
   */
  unique() {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props27),
      node: CreateIndexNode.cloneWith(__privateGet(this, _props27).node, {
        unique: true
      })
    });
  }
  /**
   * Adds `nulls not distinct` specifier to index.
   * This only works on some dialects like PostgreSQL.
   *
   * ### Examples
   *
   * ```ts
   * db.schema.createIndex('person_first_name_index')
   *  .on('person')
   *  .column('first_name')
   *  .nullsNotDistinct()
   *  .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create index "person_first_name_index"
   * on "test" ("first_name")
   * nulls not distinct;
   * ```
   */
  nullsNotDistinct() {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props27),
      node: CreateIndexNode.cloneWith(__privateGet(this, _props27).node, {
        nullsNotDistinct: true
      })
    });
  }
  /**
   * Specifies the table for the index.
   */
  on(table) {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props27),
      node: CreateIndexNode.cloneWith(__privateGet(this, _props27).node, {
        table: parseTable$1(table)
      })
    });
  }
  /**
   * Adds a column to the index.
   *
   * Also see {@link columns} for adding multiple columns at once or {@link expression}
   * for specifying an arbitrary expression.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *         .createIndex('person_first_name_and_age_index')
   *         .on('person')
   *         .column('first_name')
   *         .column('age desc')
   *         .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
   * ```
   */
  column(column2) {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props27),
      node: CreateIndexNode.cloneWithColumns(__privateGet(this, _props27).node, [
        parseOrderedColumnName(column2)
      ])
    });
  }
  /**
   * Specifies a list of columns for the index.
   *
   * Also see {@link column} for adding a single column or {@link expression} for
   * specifying an arbitrary expression.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *         .createIndex('person_first_name_and_age_index')
   *         .on('person')
   *         .columns(['first_name', 'age desc'])
   *         .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
   * ```
   */
  columns(columns) {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props27),
      node: CreateIndexNode.cloneWithColumns(__privateGet(this, _props27).node, columns.map(parseOrderedColumnName))
    });
  }
  /**
   * Specifies an arbitrary expression for the index.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createIndex('person_first_name_index')
   *   .on('person')
   *   .expression(sql`first_name COLLATE "fi_FI"`)
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create index "person_first_name_index" on "person" (first_name COLLATE "fi_FI")
   * ```
   */
  expression(expression) {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props27),
      node: CreateIndexNode.cloneWithColumns(__privateGet(this, _props27).node, [
        expression.toOperationNode()
      ])
    });
  }
  using(indexType) {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props27),
      node: CreateIndexNode.cloneWith(__privateGet(this, _props27).node, {
        using: RawNode.createWithSql(indexType)
      })
    });
  }
  where(...args) {
    const transformer = new ImmediateValueTransformer();
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props27),
      node: QueryNode.cloneWithWhere(__privateGet(this, _props27).node, transformer.transformNode(parseValueBinaryOperationOrExpression(args)))
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _props27).executor.transformQuery(__privateGet(this, _props27).node, __privateGet(this, _props27).queryId);
  }
  compile() {
    return __privateGet(this, _props27).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props27).queryId);
  }
  async execute() {
    await __privateGet(this, _props27).executor.executeQuery(this.compile(), __privateGet(this, _props27).queryId);
  }
};
_props27 = new WeakMap();
let CreateIndexBuilder = _CreateIndexBuilder;
preventAwait(CreateIndexBuilder, "don't await CreateIndexBuilder instances directly. To execute the query you need to call `execute`");
const _CreateSchemaBuilder = class _CreateSchemaBuilder {
  constructor(props) {
    __privateAdd(this, _props28);
    __privateSet(this, _props28, freeze(props));
  }
  ifNotExists() {
    return new _CreateSchemaBuilder({
      ...__privateGet(this, _props28),
      node: CreateSchemaNode.cloneWith(__privateGet(this, _props28).node, { ifNotExists: true })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _props28).executor.transformQuery(__privateGet(this, _props28).node, __privateGet(this, _props28).queryId);
  }
  compile() {
    return __privateGet(this, _props28).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props28).queryId);
  }
  async execute() {
    await __privateGet(this, _props28).executor.executeQuery(this.compile(), __privateGet(this, _props28).queryId);
  }
};
_props28 = new WeakMap();
let CreateSchemaBuilder = _CreateSchemaBuilder;
preventAwait(CreateSchemaBuilder, "don't await CreateSchemaBuilder instances directly. To execute the query you need to call `execute`");
function parseOnCommitAction(action) {
  if (ON_COMMIT_ACTIONS.includes(action)) {
    return action;
  }
  throw new Error(`invalid OnCommitAction ${action}`);
}
const _CreateTableBuilder = class _CreateTableBuilder {
  constructor(props) {
    __privateAdd(this, _props29);
    __privateSet(this, _props29, freeze(props));
  }
  /**
   * Adds the "temporary" modifier.
   *
   * Use this to create a temporary table.
   */
  temporary() {
    return new _CreateTableBuilder({
      ...__privateGet(this, _props29),
      node: CreateTableNode.cloneWith(__privateGet(this, _props29).node, {
        temporary: true
      })
    });
  }
  /**
   * Adds an "on commit" statement.
   *
   * This can be used in conjunction with temporary tables on supported databases
   * like PostgreSQL.
   */
  onCommit(onCommit) {
    return new _CreateTableBuilder({
      ...__privateGet(this, _props29),
      node: CreateTableNode.cloneWith(__privateGet(this, _props29).node, {
        onCommit: parseOnCommitAction(onCommit)
      })
    });
  }
  /**
   * Adds the "if not exists" modifier.
   *
   * If the table already exists, no error is thrown if this method has been called.
   */
  ifNotExists() {
    return new _CreateTableBuilder({
      ...__privateGet(this, _props29),
      node: CreateTableNode.cloneWith(__privateGet(this, _props29).node, {
        ifNotExists: true
      })
    });
  }
  /**
   * Adds a column to the table.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
   *   .addColumn('first_name', 'varchar(50)', (col) => col.notNull())
   *   .addColumn('last_name', 'varchar(255)')
   *   .addColumn('bank_balance', 'numeric(8, 2)')
   *   // You can specify any data type using the `sql` tag if the types
   *   // don't include it.
   *   .addColumn('data', sql`any_type_here`)
   *   .addColumn('parent_id', 'integer', (col) =>
   *     col.references('person.id').onDelete('cascade')
   *   )
   * ```
   *
   * With this method, it's once again good to remember that Kysely just builds the
   * query and doesn't provide the same API for all databases. For example, some
   * databases like older MySQL don't support the `references` statement in the
   * column definition. Instead foreign key constraints need to be defined in the
   * `create table` query. See the next example:
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', (col) => col.primaryKey())
   *   .addColumn('parent_id', 'integer')
   *   .addForeignKeyConstraint(
   *     'person_parent_id_fk',
   *     ['parent_id'],
   *     'person',
   *     ['id'],
   *     (cb) => cb.onDelete('cascade')
   *   )
   *   .execute()
   * ```
   *
   * Another good example is that PostgreSQL doesn't support the `auto_increment`
   * keyword and you need to define an autoincrementing column for example using
   * `serial`:
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'serial', (col) => col.primaryKey())
   *   .execute()
   * ```
   */
  addColumn(columnName, dataType, build = noop) {
    const columnBuilder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new _CreateTableBuilder({
      ...__privateGet(this, _props29),
      node: CreateTableNode.cloneWithColumn(__privateGet(this, _props29).node, columnBuilder.toOperationNode())
    });
  }
  /**
   * Adds a primary key constraint for one or more columns.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('first_name', 'varchar(64)')
   *   .addColumn('last_name', 'varchar(64)')
   *   .addPrimaryKeyConstraint('primary_key', ['first_name', 'last_name'])
   *   .execute()
   * ```
   */
  addPrimaryKeyConstraint(constraintName, columns) {
    return new _CreateTableBuilder({
      ...__privateGet(this, _props29),
      node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props29).node, PrimaryConstraintNode.create(columns, constraintName))
    });
  }
  /**
   * Adds a unique constraint for one or more columns.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('first_name', 'varchar(64)')
   *   .addColumn('last_name', 'varchar(64)')
   *   .addUniqueConstraint(
   *     'first_name_last_name_unique',
   *     ['first_name', 'last_name']
   *   )
   *   .execute()
   * ```
   *
   * In dialects such as PostgreSQL you can specify `nulls not distinct` as follows:
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('first_name', 'varchar(64)')
   *   .addColumn('last_name', 'varchar(64)')
   *   .addUniqueConstraint(
   *     'first_name_last_name_unique',
   *     ['first_name', 'last_name'],
   *     (cb) => cb.nullsNotDistinct()
   *   )
   *   .execute()
   * ```
   */
  addUniqueConstraint(constraintName, columns, build = noop) {
    const uniqueConstraintBuilder = build(new UniqueConstraintNodeBuilder(UniqueConstraintNode.create(columns, constraintName)));
    return new _CreateTableBuilder({
      ...__privateGet(this, _props29),
      node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props29).node, uniqueConstraintBuilder.toOperationNode())
    });
  }
  /**
   * Adds a check constraint.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('animal')
   *   .addColumn('number_of_legs', 'integer')
   *   .addCheckConstraint('check_legs', sql`number_of_legs < 5`)
   *   .execute()
   * ```
   */
  addCheckConstraint(constraintName, checkExpression) {
    return new _CreateTableBuilder({
      ...__privateGet(this, _props29),
      node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props29).node, CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName))
    });
  }
  /**
   * Adds a foreign key constraint.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('owner_id', 'integer')
   *   .addForeignKeyConstraint(
   *     'owner_id_foreign',
   *     ['owner_id'],
   *     'person',
   *     ['id'],
   *   )
   *   .execute()
   * ```
   *
   * Add constraint for multiple columns:
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('owner_id1', 'integer')
   *   .addColumn('owner_id2', 'integer')
   *   .addForeignKeyConstraint(
   *     'owner_id_foreign',
   *     ['owner_id1', 'owner_id2'],
   *     'person',
   *     ['id1', 'id2'],
   *     (cb) => cb.onDelete('cascade')
   *   )
   *   .execute()
   * ```
   */
  addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = noop) {
    const builder = build(new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable$1(targetTable), targetColumns.map(ColumnNode.create), constraintName)));
    return new _CreateTableBuilder({
      ...__privateGet(this, _props29),
      node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props29).node, builder.toOperationNode())
    });
  }
  /**
   * This can be used to add any additional SQL to the front of the query __after__ the `create` keyword.
   *
   * Also see {@link temporary}.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .modifyFront(sql`global temporary`)
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
   *   .addColumn('last_name', 'varchar(64)', col => col.notNull())
   *   .execute()
   * ```
   *
   * The generated SQL (Postgres):
   *
   * ```sql
   * create global temporary table "person" (
   *   "id" integer primary key,
   *   "first_name" varchar(64) not null,
   *   "last_name" varchar(64) not null
   * )
   * ```
   */
  modifyFront(modifier) {
    return new _CreateTableBuilder({
      ...__privateGet(this, _props29),
      node: CreateTableNode.cloneWithFrontModifier(__privateGet(this, _props29).node, modifier.toOperationNode())
    });
  }
  /**
   * This can be used to add any additional SQL to the end of the query.
   *
   * Also see {@link onCommit}.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
   *   .addColumn('last_name', 'varchar(64)', col => col.notNull())
   *   .modifyEnd(sql`collate utf8_unicode_ci`)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key,
   *   `first_name` varchar(64) not null,
   *   `last_name` varchar(64) not null
   * ) collate utf8_unicode_ci
   * ```
   */
  modifyEnd(modifier) {
    return new _CreateTableBuilder({
      ...__privateGet(this, _props29),
      node: CreateTableNode.cloneWithEndModifier(__privateGet(this, _props29).node, modifier.toOperationNode())
    });
  }
  /**
   * Allows to create table from `select` query.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('copy')
   *   .temporary()
   *   .as(db.selectFrom('person').select(['first_name', 'last_name']))
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create temporary table "copy" as
   * select "first_name", "last_name" from "person"
   * ```
   */
  as(expression) {
    return new _CreateTableBuilder({
      ...__privateGet(this, _props29),
      node: CreateTableNode.cloneWith(__privateGet(this, _props29).node, {
        selectQuery: parseExpression(expression)
      })
    });
  }
  /**
   * Calls the given function passing `this` as the only argument.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createTable('test')
   *   .$call((builder) => builder.addColumn('id', 'integer'))
   *   .execute()
   * ```
   *
   * This is useful for creating reusable functions that can be called with a builder.
   *
   * ```ts
   * import { type CreateTableBuilder, sql } from 'kysely'
   *
   * const addDefaultColumns = (ctb: CreateTableBuilder<any, any>) => {
   *   return ctb
   *     .addColumn('id', 'integer', (col) => col.notNull())
   *     .addColumn('created_at', 'date', (col) =>
   *       col.notNull().defaultTo(sql`now()`)
   *     )
   *     .addColumn('updated_at', 'date', (col) =>
   *       col.notNull().defaultTo(sql`now()`)
   *     )
   * }
   *
   * await db.schema
   *   .createTable('test')
   *   .$call(addDefaultColumns)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _props29).executor.transformQuery(__privateGet(this, _props29).node, __privateGet(this, _props29).queryId);
  }
  compile() {
    return __privateGet(this, _props29).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props29).queryId);
  }
  async execute() {
    await __privateGet(this, _props29).executor.executeQuery(this.compile(), __privateGet(this, _props29).queryId);
  }
};
_props29 = new WeakMap();
let CreateTableBuilder = _CreateTableBuilder;
preventAwait(CreateTableBuilder, "don't await CreateTableBuilder instances directly. To execute the query you need to call `execute`");
const _DropIndexBuilder = class _DropIndexBuilder {
  constructor(props) {
    __privateAdd(this, _props30);
    __privateSet(this, _props30, freeze(props));
  }
  /**
   * Specifies the table the index was created for. This is not needed
   * in all dialects.
   */
  on(table) {
    return new _DropIndexBuilder({
      ...__privateGet(this, _props30),
      node: DropIndexNode.cloneWith(__privateGet(this, _props30).node, {
        table: parseTable$1(table)
      })
    });
  }
  ifExists() {
    return new _DropIndexBuilder({
      ...__privateGet(this, _props30),
      node: DropIndexNode.cloneWith(__privateGet(this, _props30).node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropIndexBuilder({
      ...__privateGet(this, _props30),
      node: DropIndexNode.cloneWith(__privateGet(this, _props30).node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _props30).executor.transformQuery(__privateGet(this, _props30).node, __privateGet(this, _props30).queryId);
  }
  compile() {
    return __privateGet(this, _props30).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props30).queryId);
  }
  async execute() {
    await __privateGet(this, _props30).executor.executeQuery(this.compile(), __privateGet(this, _props30).queryId);
  }
};
_props30 = new WeakMap();
let DropIndexBuilder = _DropIndexBuilder;
preventAwait(DropIndexBuilder, "don't await DropIndexBuilder instances directly. To execute the query you need to call `execute`");
const _DropSchemaBuilder = class _DropSchemaBuilder {
  constructor(props) {
    __privateAdd(this, _props31);
    __privateSet(this, _props31, freeze(props));
  }
  ifExists() {
    return new _DropSchemaBuilder({
      ...__privateGet(this, _props31),
      node: DropSchemaNode.cloneWith(__privateGet(this, _props31).node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropSchemaBuilder({
      ...__privateGet(this, _props31),
      node: DropSchemaNode.cloneWith(__privateGet(this, _props31).node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _props31).executor.transformQuery(__privateGet(this, _props31).node, __privateGet(this, _props31).queryId);
  }
  compile() {
    return __privateGet(this, _props31).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props31).queryId);
  }
  async execute() {
    await __privateGet(this, _props31).executor.executeQuery(this.compile(), __privateGet(this, _props31).queryId);
  }
};
_props31 = new WeakMap();
let DropSchemaBuilder = _DropSchemaBuilder;
preventAwait(DropSchemaBuilder, "don't await DropSchemaBuilder instances directly. To execute the query you need to call `execute`");
const _DropTableBuilder = class _DropTableBuilder {
  constructor(props) {
    __privateAdd(this, _props32);
    __privateSet(this, _props32, freeze(props));
  }
  ifExists() {
    return new _DropTableBuilder({
      ...__privateGet(this, _props32),
      node: DropTableNode.cloneWith(__privateGet(this, _props32).node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropTableBuilder({
      ...__privateGet(this, _props32),
      node: DropTableNode.cloneWith(__privateGet(this, _props32).node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _props32).executor.transformQuery(__privateGet(this, _props32).node, __privateGet(this, _props32).queryId);
  }
  compile() {
    return __privateGet(this, _props32).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props32).queryId);
  }
  async execute() {
    await __privateGet(this, _props32).executor.executeQuery(this.compile(), __privateGet(this, _props32).queryId);
  }
};
_props32 = new WeakMap();
let DropTableBuilder = _DropTableBuilder;
preventAwait(DropTableBuilder, "don't await DropTableBuilder instances directly. To execute the query you need to call `execute`");
const CreateViewNode = freeze({
  is(node) {
    return node.kind === "CreateViewNode";
  },
  create(name) {
    return freeze({
      kind: "CreateViewNode",
      name: SchemableIdentifierNode.create(name)
    });
  },
  cloneWith(createView, params) {
    return freeze({
      ...createView,
      ...params
    });
  }
});
class ImmediateValuePlugin {
  constructor() {
    __privateAdd(this, _transformer2, new ImmediateValueTransformer());
  }
  transformQuery(args) {
    return __privateGet(this, _transformer2).transformNode(args.node);
  }
  transformResult(args) {
    return Promise.resolve(args.result);
  }
}
_transformer2 = new WeakMap();
const _CreateViewBuilder = class _CreateViewBuilder {
  constructor(props) {
    __privateAdd(this, _props33);
    __privateSet(this, _props33, freeze(props));
  }
  /**
   * Adds the "temporary" modifier.
   *
   * Use this to create a temporary view.
   */
  temporary() {
    return new _CreateViewBuilder({
      ...__privateGet(this, _props33),
      node: CreateViewNode.cloneWith(__privateGet(this, _props33).node, {
        temporary: true
      })
    });
  }
  materialized() {
    return new _CreateViewBuilder({
      ...__privateGet(this, _props33),
      node: CreateViewNode.cloneWith(__privateGet(this, _props33).node, {
        materialized: true
      })
    });
  }
  /**
   * Only implemented on some dialects like SQLite. On most dialects, use {@link orReplace}.
   */
  ifNotExists() {
    return new _CreateViewBuilder({
      ...__privateGet(this, _props33),
      node: CreateViewNode.cloneWith(__privateGet(this, _props33).node, {
        ifNotExists: true
      })
    });
  }
  orReplace() {
    return new _CreateViewBuilder({
      ...__privateGet(this, _props33),
      node: CreateViewNode.cloneWith(__privateGet(this, _props33).node, {
        orReplace: true
      })
    });
  }
  columns(columns) {
    return new _CreateViewBuilder({
      ...__privateGet(this, _props33),
      node: CreateViewNode.cloneWith(__privateGet(this, _props33).node, {
        columns: columns.map(parseColumnName)
      })
    });
  }
  /**
   * Sets the select query or a `values` statement that creates the view.
   *
   * WARNING!
   * Some dialects don't support parameterized queries in DDL statements and therefore
   * the query or raw {@link sql } expression passed here is interpolated into a single
   * string opening an SQL injection vulnerability. DO NOT pass unchecked user input
   * into the query or raw expression passed to this method!
   */
  as(query) {
    const queryNode = query.withPlugin(new ImmediateValuePlugin()).toOperationNode();
    return new _CreateViewBuilder({
      ...__privateGet(this, _props33),
      node: CreateViewNode.cloneWith(__privateGet(this, _props33).node, {
        as: queryNode
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _props33).executor.transformQuery(__privateGet(this, _props33).node, __privateGet(this, _props33).queryId);
  }
  compile() {
    return __privateGet(this, _props33).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props33).queryId);
  }
  async execute() {
    await __privateGet(this, _props33).executor.executeQuery(this.compile(), __privateGet(this, _props33).queryId);
  }
};
_props33 = new WeakMap();
let CreateViewBuilder = _CreateViewBuilder;
preventAwait(CreateViewBuilder, "don't await CreateViewBuilder instances directly. To execute the query you need to call `execute`");
const DropViewNode = freeze({
  is(node) {
    return node.kind === "DropViewNode";
  },
  create(name) {
    return freeze({
      kind: "DropViewNode",
      name: SchemableIdentifierNode.create(name)
    });
  },
  cloneWith(dropView, params) {
    return freeze({
      ...dropView,
      ...params
    });
  }
});
const _DropViewBuilder = class _DropViewBuilder {
  constructor(props) {
    __privateAdd(this, _props34);
    __privateSet(this, _props34, freeze(props));
  }
  materialized() {
    return new _DropViewBuilder({
      ...__privateGet(this, _props34),
      node: DropViewNode.cloneWith(__privateGet(this, _props34).node, {
        materialized: true
      })
    });
  }
  ifExists() {
    return new _DropViewBuilder({
      ...__privateGet(this, _props34),
      node: DropViewNode.cloneWith(__privateGet(this, _props34).node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropViewBuilder({
      ...__privateGet(this, _props34),
      node: DropViewNode.cloneWith(__privateGet(this, _props34).node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _props34).executor.transformQuery(__privateGet(this, _props34).node, __privateGet(this, _props34).queryId);
  }
  compile() {
    return __privateGet(this, _props34).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props34).queryId);
  }
  async execute() {
    await __privateGet(this, _props34).executor.executeQuery(this.compile(), __privateGet(this, _props34).queryId);
  }
};
_props34 = new WeakMap();
let DropViewBuilder = _DropViewBuilder;
preventAwait(DropViewBuilder, "don't await DropViewBuilder instances directly. To execute the query you need to call `execute`");
const CreateTypeNode = freeze({
  is(node) {
    return node.kind === "CreateTypeNode";
  },
  create(name) {
    return freeze({
      kind: "CreateTypeNode",
      name
    });
  },
  cloneWithEnum(createType, values) {
    return freeze({
      ...createType,
      enum: ValueListNode.create(values.map((value) => ValueNode.createImmediate(value)))
    });
  }
});
const _CreateTypeBuilder = class _CreateTypeBuilder {
  constructor(props) {
    __privateAdd(this, _props35);
    __privateSet(this, _props35, freeze(props));
  }
  toOperationNode() {
    return __privateGet(this, _props35).executor.transformQuery(__privateGet(this, _props35).node, __privateGet(this, _props35).queryId);
  }
  /**
   * Creates an anum type.
   *
   * ### Examples
   *
   * ```ts
   * db.schema.createType('species').asEnum(['cat', 'dog', 'frog'])
   * ```
   */
  asEnum(values) {
    return new _CreateTypeBuilder({
      ...__privateGet(this, _props35),
      node: CreateTypeNode.cloneWithEnum(__privateGet(this, _props35).node, values)
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  compile() {
    return __privateGet(this, _props35).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props35).queryId);
  }
  async execute() {
    await __privateGet(this, _props35).executor.executeQuery(this.compile(), __privateGet(this, _props35).queryId);
  }
};
_props35 = new WeakMap();
let CreateTypeBuilder = _CreateTypeBuilder;
preventAwait(CreateTypeBuilder, "don't await CreateTypeBuilder instances directly. To execute the query you need to call `execute`");
const DropTypeNode = freeze({
  is(node) {
    return node.kind === "DropTypeNode";
  },
  create(name) {
    return freeze({
      kind: "DropTypeNode",
      name
    });
  },
  cloneWith(dropType, params) {
    return freeze({
      ...dropType,
      ...params
    });
  }
});
const _DropTypeBuilder = class _DropTypeBuilder {
  constructor(props) {
    __privateAdd(this, _props36);
    __privateSet(this, _props36, freeze(props));
  }
  ifExists() {
    return new _DropTypeBuilder({
      ...__privateGet(this, _props36),
      node: DropTypeNode.cloneWith(__privateGet(this, _props36).node, {
        ifExists: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _props36).executor.transformQuery(__privateGet(this, _props36).node, __privateGet(this, _props36).queryId);
  }
  compile() {
    return __privateGet(this, _props36).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props36).queryId);
  }
  async execute() {
    await __privateGet(this, _props36).executor.executeQuery(this.compile(), __privateGet(this, _props36).queryId);
  }
};
_props36 = new WeakMap();
let DropTypeBuilder = _DropTypeBuilder;
preventAwait(DropTypeBuilder, "don't await DropTypeBuilder instances directly. To execute the query you need to call `execute`");
function parseSchemableIdentifier(id) {
  const SCHEMA_SEPARATOR = ".";
  if (id.includes(SCHEMA_SEPARATOR)) {
    const parts = id.split(SCHEMA_SEPARATOR).map(trim);
    if (parts.length === 2) {
      return SchemableIdentifierNode.createWithSchema(parts[0], parts[1]);
    } else {
      throw new Error(`invalid schemable identifier ${id}`);
    }
  } else {
    return SchemableIdentifierNode.create(id);
  }
}
function trim(str) {
  return str.trim();
}
const _SchemaModule = class _SchemaModule {
  constructor(executor) {
    __privateAdd(this, _executor);
    __privateSet(this, _executor, executor);
  }
  /**
   * Create a new table.
   *
   * ### Examples
   *
   * This example creates a new table with columns `id`, `first_name`,
   * `last_name` and `gender`:
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
   *   .addColumn('first_name', 'varchar', col => col.notNull())
   *   .addColumn('last_name', 'varchar', col => col.notNull())
   *   .addColumn('gender', 'varchar')
   *   .execute()
   * ```
   *
   * This example creates a table with a foreign key. Not all database
   * engines support column-level foreign key constraint definitions.
   * For example if you are using MySQL 5.X see the next example after
   * this one.
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
   *   .addColumn('owner_id', 'integer', col => col
   *     .references('person.id')
   *     .onDelete('cascade')
   *   )
   *   .execute()
   * ```
   *
   * This example adds a foreign key constraint for a columns just
   * like the previous example, but using a table-level statement.
   * On MySQL 5.X you need to define foreign key constraints like
   * this:
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
   *   .addColumn('owner_id', 'integer')
   *   .addForeignKeyConstraint(
   *     'pet_owner_id_foreign', ['owner_id'], 'person', ['id'],
   *     (constraint) => constraint.onDelete('cascade')
   *   )
   *   .execute()
   * ```
   */
  createTable(table) {
    return new CreateTableBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _executor),
      node: CreateTableNode.create(parseTable$1(table))
    });
  }
  /**
   * Drop a table.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropTable('person')
   *   .execute()
   * ```
   */
  dropTable(table) {
    return new DropTableBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _executor),
      node: DropTableNode.create(parseTable$1(table))
    });
  }
  /**
   * Create a new index.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createIndex('person_full_name_unique_index')
   *   .on('person')
   *   .columns(['first_name', 'last_name'])
   *   .execute()
   * ```
   */
  createIndex(indexName) {
    return new CreateIndexBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _executor),
      node: CreateIndexNode.create(indexName)
    });
  }
  /**
   * Drop an index.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropIndex('person_full_name_unique_index')
   *   .execute()
   * ```
   */
  dropIndex(indexName) {
    return new DropIndexBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _executor),
      node: DropIndexNode.create(indexName)
    });
  }
  /**
   * Create a new schema.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createSchema('some_schema')
   *   .execute()
   * ```
   */
  createSchema(schema) {
    return new CreateSchemaBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _executor),
      node: CreateSchemaNode.create(schema)
    });
  }
  /**
   * Drop a schema.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropSchema('some_schema')
   *   .execute()
   * ```
   */
  dropSchema(schema) {
    return new DropSchemaBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _executor),
      node: DropSchemaNode.create(schema)
    });
  }
  /**
   * Alter a table.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .alterTable('person')
   *   .alterColumn('first_name', (ac) => ac.setDataType('text'))
   *   .execute()
   * ```
   */
  alterTable(table) {
    return new AlterTableBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _executor),
      node: AlterTableNode.create(parseTable$1(table))
    });
  }
  /**
   * Create a new view.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createView('dogs')
   *   .orReplace()
   *   .as(db.selectFrom('pet').selectAll().where('species', '=', 'dog'))
   *   .execute()
   * ```
   */
  createView(viewName) {
    return new CreateViewBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _executor),
      node: CreateViewNode.create(viewName)
    });
  }
  /**
   * Drop a view.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropView('dogs')
   *   .ifExists()
   *   .execute()
   * ```
   */
  dropView(viewName) {
    return new DropViewBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _executor),
      node: DropViewNode.create(viewName)
    });
  }
  /**
   * Create a new type.
   *
   * Only some dialects like PostgreSQL have user-defined types.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createType('species')
   *   .asEnum(['dog', 'cat', 'frog'])
   *   .execute()
   * ```
   */
  createType(typeName) {
    return new CreateTypeBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _executor),
      node: CreateTypeNode.create(parseSchemableIdentifier(typeName))
    });
  }
  /**
   * Drop a type.
   *
   * Only some dialects like PostgreSQL have user-defined types.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropType('species')
   *   .ifExists()
   *   .execute()
   * ```
   */
  dropType(typeName) {
    return new DropTypeBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _executor),
      node: DropTypeNode.create(parseSchemableIdentifier(typeName))
    });
  }
  /**
   * Returns a copy of this schema module with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _SchemaModule(__privateGet(this, _executor).withPlugin(plugin));
  }
  /**
   * Returns a copy of this schema module  without any plugins.
   */
  withoutPlugins() {
    return new _SchemaModule(__privateGet(this, _executor).withoutPlugins());
  }
  /**
   * See {@link QueryCreator.withSchema}
   */
  withSchema(schema) {
    return new _SchemaModule(__privateGet(this, _executor).withPluginAtFront(new WithSchemaPlugin(schema)));
  }
};
_executor = new WeakMap();
let SchemaModule = _SchemaModule;
class DynamicModule {
  /**
   * Creates a dynamic reference to a column that is not know at compile time.
   *
   * Kysely is built in a way that by default you can't refer to tables or columns
   * that are not actually visible in the current query and context. This is all
   * done by TypeScript at compile time, which means that you need to know the
   * columns and tables at compile time. This is not always the case of course.
   *
   * This method is meant to be used in those cases where the column names
   * come from the user input or are not otherwise known at compile time.
   *
   * WARNING! Unlike values, column names are not escaped by the database engine
   * or Kysely and if you pass in unchecked column names using this method, you
   * create an SQL injection vulnerability. Always __always__ validate the user
   * input before passing it to this method.
   *
   * There are couple of examples below for some use cases, but you can pass
   * `ref` to other methods as well. If the types allow you to pass a `ref`
   * value to some place, it should work.
   *
   * ### Examples
   *
   * Filter by a column not know at compile time:
   *
   * ```ts
   * async function someQuery(filterColumn: string, filterValue: string) {
   *   const { ref } = db.dynamic
   *
   *   return await db
   *     .selectFrom('person')
   *     .selectAll()
   *     .where(ref(filterColumn), '=', filterValue)
   *     .execute()
   * }
   *
   * someQuery('first_name', 'Arnold')
   * someQuery('person.last_name', 'Aniston')
   * ```
   *
   * Order by a column not know at compile time:
   *
   * ```ts
   * async function someQuery(orderBy: string) {
   *   const { ref } = db.dynamic
   *
   *   return await db
   *     .selectFrom('person')
   *     .select('person.first_name as fn')
   *     .orderBy(ref(orderBy))
   *     .execute()
   * }
   *
   * someQuery('fn')
   * ```
   *
   * In this example we add selections dynamically:
   *
   * ```ts
   * const { ref } = db.dynamic
   *
   * // Some column name provided by the user. Value not known at compile time.
   * const columnFromUserInput: PossibleColumns = 'birthdate';
   *
   * // A type that lists all possible values `columnFromUserInput` can have.
   * // You can use `keyof Person` if any column of an interface is allowed.
   * type PossibleColumns = 'last_name' | 'first_name' | 'birthdate'
   *
   * const [person] = await db.selectFrom('person')
   *   .select([
   *     ref<PossibleColumns>(columnFromUserInput),
   *     'id'
   *   ])
   *   .execute()
   *
   * // The resulting type contains all `PossibleColumns` as optional fields
   * // because we cannot know which field was actually selected before
   * // running the code.
   * const lastName: string | null | undefined = person?.last_name
   * const firstName: string | undefined = person?.first_name
   * const birthDate: Date | null | undefined = person?.birthdate
   *
   * // The result type also contains the compile time selection `id`.
   * person?.id
   * ```
   */
  ref(reference) {
    return new DynamicReferenceBuilder(reference);
  }
}
class DefaultConnectionProvider {
  constructor(driver) {
    __privateAdd(this, _driver);
    __privateSet(this, _driver, driver);
  }
  async provideConnection(consumer) {
    const connection = await __privateGet(this, _driver).acquireConnection();
    try {
      return await consumer(connection);
    } finally {
      await __privateGet(this, _driver).releaseConnection(connection);
    }
  }
}
_driver = new WeakMap();
const _DefaultQueryExecutor = class _DefaultQueryExecutor extends QueryExecutorBase {
  constructor(compiler, adapter, connectionProvider, plugins = []) {
    super(plugins);
    __privateAdd(this, _compiler);
    __privateAdd(this, _adapter);
    __privateAdd(this, _connectionProvider);
    __privateSet(this, _compiler, compiler);
    __privateSet(this, _adapter, adapter);
    __privateSet(this, _connectionProvider, connectionProvider);
  }
  get adapter() {
    return __privateGet(this, _adapter);
  }
  compileQuery(node) {
    return __privateGet(this, _compiler).compileQuery(node);
  }
  provideConnection(consumer) {
    return __privateGet(this, _connectionProvider).provideConnection(consumer);
  }
  withPlugins(plugins) {
    return new _DefaultQueryExecutor(__privateGet(this, _compiler), __privateGet(this, _adapter), __privateGet(this, _connectionProvider), [...this.plugins, ...plugins]);
  }
  withPlugin(plugin) {
    return new _DefaultQueryExecutor(__privateGet(this, _compiler), __privateGet(this, _adapter), __privateGet(this, _connectionProvider), [...this.plugins, plugin]);
  }
  withPluginAtFront(plugin) {
    return new _DefaultQueryExecutor(__privateGet(this, _compiler), __privateGet(this, _adapter), __privateGet(this, _connectionProvider), [plugin, ...this.plugins]);
  }
  withConnectionProvider(connectionProvider) {
    return new _DefaultQueryExecutor(__privateGet(this, _compiler), __privateGet(this, _adapter), connectionProvider, [...this.plugins]);
  }
  withoutPlugins() {
    return new _DefaultQueryExecutor(__privateGet(this, _compiler), __privateGet(this, _adapter), __privateGet(this, _connectionProvider), []);
  }
};
_compiler = new WeakMap();
_adapter = new WeakMap();
_connectionProvider = new WeakMap();
let DefaultQueryExecutor = _DefaultQueryExecutor;
function performanceNow() {
  if (typeof performance !== "undefined" && isFunction(performance.now)) {
    return performance.now();
  } else {
    return Date.now();
  }
}
class RuntimeDriver {
  constructor(driver, log) {
    __privateAdd(this, _RuntimeDriver_instances);
    __privateAdd(this, _driver2);
    __privateAdd(this, _log);
    __privateAdd(this, _initPromise);
    __privateAdd(this, _initDone);
    __privateAdd(this, _destroyPromise);
    __privateAdd(this, _connections, /* @__PURE__ */ new WeakSet());
    __privateSet(this, _initDone, false);
    __privateSet(this, _driver2, driver);
    __privateSet(this, _log, log);
  }
  async init() {
    if (__privateGet(this, _destroyPromise)) {
      throw new Error("driver has already been destroyed");
    }
    if (!__privateGet(this, _initPromise)) {
      __privateSet(this, _initPromise, __privateGet(this, _driver2).init().then(() => {
        __privateSet(this, _initDone, true);
      }).catch((err) => {
        __privateSet(this, _initPromise, void 0);
        return Promise.reject(err);
      }));
    }
    await __privateGet(this, _initPromise);
  }
  async acquireConnection() {
    if (__privateGet(this, _destroyPromise)) {
      throw new Error("driver has already been destroyed");
    }
    if (!__privateGet(this, _initDone)) {
      await this.init();
    }
    const connection = await __privateGet(this, _driver2).acquireConnection();
    if (!__privateGet(this, _connections).has(connection)) {
      if (__privateMethod(this, _RuntimeDriver_instances, needsLogging_fn).call(this)) {
        __privateMethod(this, _RuntimeDriver_instances, addLogging_fn).call(this, connection);
      }
      __privateGet(this, _connections).add(connection);
    }
    return connection;
  }
  async releaseConnection(connection) {
    await __privateGet(this, _driver2).releaseConnection(connection);
  }
  beginTransaction(connection, settings) {
    return __privateGet(this, _driver2).beginTransaction(connection, settings);
  }
  commitTransaction(connection) {
    return __privateGet(this, _driver2).commitTransaction(connection);
  }
  rollbackTransaction(connection) {
    return __privateGet(this, _driver2).rollbackTransaction(connection);
  }
  async destroy() {
    if (!__privateGet(this, _initPromise)) {
      return;
    }
    await __privateGet(this, _initPromise);
    if (!__privateGet(this, _destroyPromise)) {
      __privateSet(this, _destroyPromise, __privateGet(this, _driver2).destroy().catch((err) => {
        __privateSet(this, _destroyPromise, void 0);
        return Promise.reject(err);
      }));
    }
    await __privateGet(this, _destroyPromise);
  }
}
_driver2 = new WeakMap();
_log = new WeakMap();
_initPromise = new WeakMap();
_initDone = new WeakMap();
_destroyPromise = new WeakMap();
_connections = new WeakMap();
_RuntimeDriver_instances = new WeakSet();
needsLogging_fn = function() {
  return __privateGet(this, _log).isLevelEnabled("query") || __privateGet(this, _log).isLevelEnabled("error");
};
// This method monkey patches the database connection's executeQuery method
// by adding logging code around it. Monkey patching is not pretty, but it's
// the best option in this case.
addLogging_fn = function(connection) {
  const executeQuery = connection.executeQuery;
  connection.executeQuery = async (compiledQuery) => {
    let caughtError;
    const startTime = performanceNow();
    try {
      return await executeQuery.call(connection, compiledQuery);
    } catch (error) {
      caughtError = error;
      await __privateMethod(this, _RuntimeDriver_instances, logError_fn).call(this, error, compiledQuery, startTime);
      throw error;
    } finally {
      if (!caughtError) {
        await __privateMethod(this, _RuntimeDriver_instances, logQuery_fn).call(this, compiledQuery, startTime);
      }
    }
  };
};
logError_fn = async function(error, compiledQuery, startTime) {
  await __privateGet(this, _log).error(() => ({
    level: "error",
    error,
    query: compiledQuery,
    queryDurationMillis: __privateMethod(this, _RuntimeDriver_instances, calculateDurationMillis_fn).call(this, startTime)
  }));
};
logQuery_fn = async function(compiledQuery, startTime) {
  await __privateGet(this, _log).query(() => ({
    level: "query",
    query: compiledQuery,
    queryDurationMillis: __privateMethod(this, _RuntimeDriver_instances, calculateDurationMillis_fn).call(this, startTime)
  }));
};
calculateDurationMillis_fn = function(startTime) {
  return performanceNow() - startTime;
};
const ignoreError = () => {
};
class SingleConnectionProvider {
  constructor(connection) {
    __privateAdd(this, _SingleConnectionProvider_instances);
    __privateAdd(this, _connection);
    __privateAdd(this, _runningPromise);
    __privateSet(this, _connection, connection);
  }
  async provideConnection(consumer) {
    while (__privateGet(this, _runningPromise)) {
      await __privateGet(this, _runningPromise).catch(ignoreError);
    }
    __privateSet(this, _runningPromise, __privateMethod(this, _SingleConnectionProvider_instances, run_fn).call(this, consumer).finally(() => {
      __privateSet(this, _runningPromise, void 0);
    }));
    return __privateGet(this, _runningPromise);
  }
}
_connection = new WeakMap();
_runningPromise = new WeakMap();
_SingleConnectionProvider_instances = new WeakSet();
run_fn = async function(runner) {
  return await runner(__privateGet(this, _connection));
};
const TRANSACTION_ISOLATION_LEVELS = [
  "read uncommitted",
  "read committed",
  "repeatable read",
  "serializable",
  "snapshot"
];
freeze(["query", "error"]);
class Log {
  constructor(config) {
    __privateAdd(this, _levels);
    __privateAdd(this, _logger);
    if (isFunction(config)) {
      __privateSet(this, _logger, config);
      __privateSet(this, _levels, freeze({
        query: true,
        error: true
      }));
    } else {
      __privateSet(this, _logger, defaultLogger);
      __privateSet(this, _levels, freeze({
        query: config.includes("query"),
        error: config.includes("error")
      }));
    }
  }
  isLevelEnabled(level) {
    return __privateGet(this, _levels)[level];
  }
  async query(getEvent) {
    if (__privateGet(this, _levels).query) {
      await __privateGet(this, _logger).call(this, getEvent());
    }
  }
  async error(getEvent) {
    if (__privateGet(this, _levels).error) {
      await __privateGet(this, _logger).call(this, getEvent());
    }
  }
}
_levels = new WeakMap();
_logger = new WeakMap();
function defaultLogger(event) {
  if (event.level === "query") {
    console.log(`kysely:query: ${event.query.sql}`);
    console.log(`kysely:query: duration: ${event.queryDurationMillis.toFixed(1)}ms`);
  } else if (event.level === "error") {
    if (event.error instanceof Error) {
      console.error(`kysely:error: ${event.error.stack ?? event.error.message}`);
    } else {
      console.error(`kysely:error: ${JSON.stringify({
        error: event.error,
        query: event.query.sql,
        queryDurationMillis: event.queryDurationMillis
      })}`);
    }
  }
}
function isCompilable(value) {
  return isObject(value) && isFunction(value.compile);
}
const _Kysely = class _Kysely extends QueryCreator {
  constructor(args) {
    let superProps;
    let props;
    if (isKyselyProps(args)) {
      superProps = { executor: args.executor };
      props = { ...args };
    } else {
      const dialect2 = args.dialect;
      const driver = dialect2.createDriver();
      const compiler = dialect2.createQueryCompiler();
      const adapter = dialect2.createAdapter();
      const log = new Log(args.log ?? []);
      const runtimeDriver = new RuntimeDriver(driver, log);
      const connectionProvider = new DefaultConnectionProvider(runtimeDriver);
      const executor = new DefaultQueryExecutor(compiler, adapter, connectionProvider, args.plugins ?? []);
      superProps = { executor };
      props = {
        config: args,
        executor,
        dialect: dialect2,
        driver: runtimeDriver
      };
    }
    super(superProps);
    __privateAdd(this, _props37);
    __privateSet(this, _props37, freeze(props));
  }
  /**
   * Returns the {@link SchemaModule} module for building database schema.
   */
  get schema() {
    return new SchemaModule(__privateGet(this, _props37).executor);
  }
  /**
   * Returns a the {@link DynamicModule} module.
   *
   * The {@link DynamicModule} module can be used to bypass strict typing and
   * passing in dynamic values for the queries.
   */
  get dynamic() {
    return new DynamicModule();
  }
  /**
   * Returns a {@link DatabaseIntrospector | database introspector}.
   */
  get introspection() {
    return __privateGet(this, _props37).dialect.createIntrospector(this.withoutPlugins());
  }
  case(value) {
    return new CaseBuilder({
      node: CaseNode.create(isUndefined(value) ? void 0 : parseExpression(value))
    });
  }
  /**
   * Returns a {@link FunctionModule} that can be used to write somewhat type-safe function
   * calls.
   *
   * ```ts
   * const { count } = db.fn
   *
   * await db.selectFrom('person')
   *   .innerJoin('pet', 'pet.owner_id', 'person.id')
   *   .select([
   *     'id',
   *     count('pet.id').as('person_count'),
   *   ])
   *   .groupBy('person.id')
   *   .having(count('pet.id'), '>', 10)
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "person"."id", count("pet"."id") as "person_count"
   * from "person"
   * inner join "pet" on "pet"."owner_id" = "person"."id"
   * group by "person"."id"
   * having count("pet"."id") > $1
   * ```
   *
   * Why "somewhat" type-safe? Because the function calls are not bound to the
   * current query context. They allow you to reference columns and tables that
   * are not in the current query. E.g. remove the `innerJoin` from the previous
   * query and TypeScript won't even complain.
   *
   * If you want to make the function calls fully type-safe, you can use the
   * {@link ExpressionBuilder.fn} getter for a query context-aware, stricter {@link FunctionModule}.
   *
   * ```ts
   * await db.selectFrom('person')
   *   .innerJoin('pet', 'pet.owner_id', 'person.id')
   *   .select((eb) => [
   *     'person.id',
   *     eb.fn.count('pet.id').as('pet_count')
   *   ])
   *   .groupBy('person.id')
   *   .having((eb) => eb.fn.count('pet.id'), '>', 10)
   *   .execute()
   * ```
   */
  get fn() {
    return createFunctionModule();
  }
  /**
   * Creates a {@link TransactionBuilder} that can be used to run queries inside a transaction.
   *
   * The returned {@link TransactionBuilder} can be used to configure the transaction. The
   * {@link TransactionBuilder.execute} method can then be called to run the transaction.
   * {@link TransactionBuilder.execute} takes a function that is run inside the
   * transaction. If the function throws an exception,
   * 1. the exception is caught,
   * 2. the transaction is rolled back, and
   * 3. the exception is thrown again.
   * Otherwise the transaction is committed.
   *
   * The callback function passed to the {@link TransactionBuilder.execute | execute}
   * method gets the transaction object as its only argument. The transaction is
   * of type {@link Transaction} which inherits {@link Kysely}. Any query
   * started through the transaction object is executed inside the transaction.
   *
   * ### Examples
   *
   * <!-- siteExample("transactions", "Simple transaction", 10) -->
   *
   * This example inserts two rows in a transaction. If an exception is thrown inside
   * the callback passed to the `execute` method,
   * 1. the exception is caught,
   * 2. the transaction is rolled back, and
   * 3. the exception is thrown again.
   * Otherwise the transaction is committed.
   *
   * ```ts
   * const catto = await db.transaction().execute(async (trx) => {
   *   const jennifer = await trx.insertInto('person')
   *     .values({
   *       first_name: 'Jennifer',
   *       last_name: 'Aniston',
   *       age: 40,
   *     })
   *     .returning('id')
   *     .executeTakeFirstOrThrow()
   *
   *   return await trx.insertInto('pet')
   *     .values({
   *       owner_id: jennifer.id,
   *       name: 'Catto',
   *       species: 'cat',
   *       is_favorite: false,
   *     })
   *     .returningAll()
   *     .executeTakeFirst()
   * })
   * ```
   *
   * Setting the isolation level:
   *
   * ```ts
   * import type { Kysely } from 'kysely'
   *
   * await db
   *   .transaction()
   *   .setIsolationLevel('serializable')
   *   .execute(async (trx) => {
   *     await doStuff(trx)
   *   })
   *
   * async function doStuff(kysely: typeof db) {
   *   // ...
   * }
   * ```
   */
  transaction() {
    return new TransactionBuilder({ ...__privateGet(this, _props37) });
  }
  /**
   * Provides a kysely instance bound to a single database connection.
   *
   * ### Examples
   *
   * ```ts
   * await db
   *   .connection()
   *   .execute(async (db) => {
   *     // `db` is an instance of `Kysely` that's bound to a single
   *     // database connection. All queries executed through `db` use
   *     // the same connection.
   *     await doStuff(db)
   *   })
   *
   * async function doStuff(kysely: typeof db) {
   *   // ...
   * }
   * ```
   */
  connection() {
    return new ConnectionBuilder({ ...__privateGet(this, _props37) });
  }
  /**
   * Returns a copy of this Kysely instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _Kysely({
      ...__privateGet(this, _props37),
      executor: __privateGet(this, _props37).executor.withPlugin(plugin)
    });
  }
  /**
   * Returns a copy of this Kysely instance without any plugins.
   */
  withoutPlugins() {
    return new _Kysely({
      ...__privateGet(this, _props37),
      executor: __privateGet(this, _props37).executor.withoutPlugins()
    });
  }
  /**
   * @override
   */
  withSchema(schema) {
    return new _Kysely({
      ...__privateGet(this, _props37),
      executor: __privateGet(this, _props37).executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
  /**
   * Returns a copy of this Kysely instance with tables added to its
   * database type.
   *
   * This method only modifies the types and doesn't affect any of the
   * executed queries in any way.
   *
   * ### Examples
   *
   * The following example adds and uses a temporary table:
   *
   * ```ts
   * await db.schema
   *   .createTable('temp_table')
   *   .temporary()
   *   .addColumn('some_column', 'integer')
   *   .execute()
   *
   * const tempDb = db.withTables<{
   *   temp_table: {
   *     some_column: number
   *   }
   * }>()
   *
   * await tempDb
   *   .insertInto('temp_table')
   *   .values({ some_column: 100 })
   *   .execute()
   * ```
   */
  withTables() {
    return new _Kysely({ ...__privateGet(this, _props37) });
  }
  /**
   * Releases all resources and disconnects from the database.
   *
   * You need to call this when you are done using the `Kysely` instance.
   */
  async destroy() {
    await __privateGet(this, _props37).driver.destroy();
  }
  /**
   * Returns true if this `Kysely` instance is a transaction.
   *
   * You can also use `db instanceof Transaction`.
   */
  get isTransaction() {
    return false;
  }
  /**
   * @internal
   * @private
   */
  getExecutor() {
    return __privateGet(this, _props37).executor;
  }
  /**
   * Executes a given compiled query or query builder.
   *
   * See {@link https://github.com/kysely-org/kysely/blob/master/site/docs/recipes/0004-splitting-query-building-and-execution.md#execute-compiled-queries splitting build, compile and execute code recipe} for more information.
   */
  executeQuery(query, queryId = createQueryId()) {
    const compiledQuery = isCompilable(query) ? query.compile() : query;
    return this.getExecutor().executeQuery(compiledQuery, queryId);
  }
};
_props37 = new WeakMap();
let Kysely = _Kysely;
const _Transaction = class _Transaction extends Kysely {
  constructor(props) {
    super(props);
    __privateAdd(this, _props38);
    __privateSet(this, _props38, props);
  }
  // The return type is `true` instead of `boolean` to make Kysely<DB>
  // unassignable to Transaction<DB> while allowing assignment the
  // other way around.
  get isTransaction() {
    return true;
  }
  transaction() {
    throw new Error("calling the transaction method for a Transaction is not supported");
  }
  connection() {
    throw new Error("calling the connection method for a Transaction is not supported");
  }
  async destroy() {
    throw new Error("calling the destroy method for a Transaction is not supported");
  }
  withPlugin(plugin) {
    return new _Transaction({
      ...__privateGet(this, _props38),
      executor: __privateGet(this, _props38).executor.withPlugin(plugin)
    });
  }
  withoutPlugins() {
    return new _Transaction({
      ...__privateGet(this, _props38),
      executor: __privateGet(this, _props38).executor.withoutPlugins()
    });
  }
  withSchema(schema) {
    return new _Transaction({
      ...__privateGet(this, _props38),
      executor: __privateGet(this, _props38).executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
  withTables() {
    return new _Transaction({ ...__privateGet(this, _props38) });
  }
};
_props38 = new WeakMap();
let Transaction = _Transaction;
function isKyselyProps(obj) {
  return isObject(obj) && isObject(obj.config) && isObject(obj.driver) && isObject(obj.executor) && isObject(obj.dialect);
}
class ConnectionBuilder {
  constructor(props) {
    __privateAdd(this, _props39);
    __privateSet(this, _props39, freeze(props));
  }
  async execute(callback) {
    return __privateGet(this, _props39).executor.provideConnection(async (connection) => {
      const executor = __privateGet(this, _props39).executor.withConnectionProvider(new SingleConnectionProvider(connection));
      const db = new Kysely({
        ...__privateGet(this, _props39),
        executor
      });
      return await callback(db);
    });
  }
}
_props39 = new WeakMap();
preventAwait(ConnectionBuilder, "don't await ConnectionBuilder instances directly. To execute the query you need to call the `execute` method");
const _TransactionBuilder = class _TransactionBuilder {
  constructor(props) {
    __privateAdd(this, _props40);
    __privateSet(this, _props40, freeze(props));
  }
  setIsolationLevel(isolationLevel) {
    return new _TransactionBuilder({
      ...__privateGet(this, _props40),
      isolationLevel
    });
  }
  async execute(callback) {
    const { isolationLevel, ...kyselyProps } = __privateGet(this, _props40);
    const settings = { isolationLevel };
    validateTransactionSettings(settings);
    return __privateGet(this, _props40).executor.provideConnection(async (connection) => {
      const executor = __privateGet(this, _props40).executor.withConnectionProvider(new SingleConnectionProvider(connection));
      const transaction = new Transaction({
        ...kyselyProps,
        executor
      });
      try {
        await __privateGet(this, _props40).driver.beginTransaction(connection, settings);
        const result = await callback(transaction);
        await __privateGet(this, _props40).driver.commitTransaction(connection);
        return result;
      } catch (error) {
        await __privateGet(this, _props40).driver.rollbackTransaction(connection);
        throw error;
      }
    });
  }
};
_props40 = new WeakMap();
let TransactionBuilder = _TransactionBuilder;
preventAwait(TransactionBuilder, "don't await TransactionBuilder instances directly. To execute the transaction you need to call the `execute` method");
function validateTransactionSettings(settings) {
  if (settings.isolationLevel && !TRANSACTION_ISOLATION_LEVELS.includes(settings.isolationLevel)) {
    throw new Error(`invalid transaction isolation level ${settings.isolationLevel}`);
  }
}
const _RawBuilderImpl = class _RawBuilderImpl {
  constructor(props) {
    __privateAdd(this, _RawBuilderImpl_instances);
    __privateAdd(this, _props41);
    __privateSet(this, _props41, freeze(props));
  }
  get expressionType() {
    return void 0;
  }
  get isRawBuilder() {
    return true;
  }
  as(alias) {
    return new AliasedRawBuilderImpl(this, alias);
  }
  $castTo() {
    return new _RawBuilderImpl({ ...__privateGet(this, _props41) });
  }
  $notNull() {
    return new _RawBuilderImpl(__privateGet(this, _props41));
  }
  withPlugin(plugin) {
    return new _RawBuilderImpl({
      ...__privateGet(this, _props41),
      plugins: __privateGet(this, _props41).plugins !== void 0 ? freeze([...__privateGet(this, _props41).plugins, plugin]) : freeze([plugin])
    });
  }
  toOperationNode() {
    return __privateMethod(this, _RawBuilderImpl_instances, toOperationNode_fn).call(this, __privateMethod(this, _RawBuilderImpl_instances, getExecutor_fn).call(this));
  }
  compile(executorProvider) {
    return __privateMethod(this, _RawBuilderImpl_instances, compile_fn).call(this, __privateMethod(this, _RawBuilderImpl_instances, getExecutor_fn).call(this, executorProvider));
  }
  async execute(executorProvider) {
    const executor = __privateMethod(this, _RawBuilderImpl_instances, getExecutor_fn).call(this, executorProvider);
    return executor.executeQuery(__privateMethod(this, _RawBuilderImpl_instances, compile_fn).call(this, executor), __privateGet(this, _props41).queryId);
  }
};
_props41 = new WeakMap();
_RawBuilderImpl_instances = new WeakSet();
getExecutor_fn = function(executorProvider) {
  const executor = executorProvider !== void 0 ? executorProvider.getExecutor() : NOOP_QUERY_EXECUTOR;
  return __privateGet(this, _props41).plugins !== void 0 ? executor.withPlugins(__privateGet(this, _props41).plugins) : executor;
};
toOperationNode_fn = function(executor) {
  return executor.transformQuery(__privateGet(this, _props41).rawNode, __privateGet(this, _props41).queryId);
};
compile_fn = function(executor) {
  return executor.compileQuery(__privateMethod(this, _RawBuilderImpl_instances, toOperationNode_fn).call(this, executor), __privateGet(this, _props41).queryId);
};
let RawBuilderImpl = _RawBuilderImpl;
function createRawBuilder(props) {
  return new RawBuilderImpl(props);
}
preventAwait(RawBuilderImpl, "don't await RawBuilder instances directly. To execute the query you need to call `execute`");
class AliasedRawBuilderImpl {
  constructor(rawBuilder, alias) {
    __privateAdd(this, _rawBuilder);
    __privateAdd(this, _alias5);
    __privateSet(this, _rawBuilder, rawBuilder);
    __privateSet(this, _alias5, alias);
  }
  get expression() {
    return __privateGet(this, _rawBuilder);
  }
  get alias() {
    return __privateGet(this, _alias5);
  }
  get rawBuilder() {
    return __privateGet(this, _rawBuilder);
  }
  toOperationNode() {
    return AliasNode.create(__privateGet(this, _rawBuilder).toOperationNode(), isOperationNodeSource(__privateGet(this, _alias5)) ? __privateGet(this, _alias5).toOperationNode() : IdentifierNode.create(__privateGet(this, _alias5)));
  }
}
_rawBuilder = new WeakMap();
_alias5 = new WeakMap();
preventAwait(AliasedRawBuilderImpl, "don't await AliasedRawBuilder instances directly. AliasedRawBuilder should never be executed directly since it's always a part of another query.");
const sql = Object.assign((sqlFragments, ...parameters) => {
  return createRawBuilder({
    queryId: createQueryId(),
    rawNode: RawNode.create(sqlFragments, parameters?.map(parseParameter) ?? [])
  });
}, {
  ref(columnReference) {
    return createRawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithChild(parseStringReference(columnReference))
    });
  },
  val(value) {
    return createRawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithChild(parseValueExpression(value))
    });
  },
  value(value) {
    return this.val(value);
  },
  table(tableReference) {
    return createRawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithChild(parseTable$1(tableReference))
    });
  },
  id(...ids) {
    const fragments = new Array(ids.length + 1).fill(".");
    fragments[0] = "";
    fragments[fragments.length - 1] = "";
    return createRawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.create(fragments, ids.map(IdentifierNode.create))
    });
  },
  lit(value) {
    return createRawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithChild(ValueNode.createImmediate(value))
    });
  },
  literal(value) {
    return this.lit(value);
  },
  raw(sql2) {
    return createRawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithSql(sql2)
    });
  },
  join(array, separator = sql`, `) {
    const nodes = new Array(2 * array.length - 1);
    const sep = separator.toOperationNode();
    for (let i = 0; i < array.length; ++i) {
      nodes[2 * i] = parseParameter(array[i]);
      if (i !== array.length - 1) {
        nodes[2 * i + 1] = sep;
      }
    }
    return createRawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithChildren(nodes)
    });
  }
});
function parseParameter(param) {
  if (isOperationNodeSource(param)) {
    return param.toOperationNode();
  }
  return parseValueExpression(param);
}
class OperationNodeVisitor {
  constructor() {
    __publicField(this, "nodeStack", []);
    __privateAdd(this, _visitors, freeze({
      AliasNode: this.visitAlias.bind(this),
      ColumnNode: this.visitColumn.bind(this),
      IdentifierNode: this.visitIdentifier.bind(this),
      SchemableIdentifierNode: this.visitSchemableIdentifier.bind(this),
      RawNode: this.visitRaw.bind(this),
      ReferenceNode: this.visitReference.bind(this),
      SelectQueryNode: this.visitSelectQuery.bind(this),
      SelectionNode: this.visitSelection.bind(this),
      TableNode: this.visitTable.bind(this),
      FromNode: this.visitFrom.bind(this),
      SelectAllNode: this.visitSelectAll.bind(this),
      AndNode: this.visitAnd.bind(this),
      OrNode: this.visitOr.bind(this),
      ValueNode: this.visitValue.bind(this),
      ValueListNode: this.visitValueList.bind(this),
      PrimitiveValueListNode: this.visitPrimitiveValueList.bind(this),
      ParensNode: this.visitParens.bind(this),
      JoinNode: this.visitJoin.bind(this),
      OperatorNode: this.visitOperator.bind(this),
      WhereNode: this.visitWhere.bind(this),
      InsertQueryNode: this.visitInsertQuery.bind(this),
      DeleteQueryNode: this.visitDeleteQuery.bind(this),
      ReturningNode: this.visitReturning.bind(this),
      CreateTableNode: this.visitCreateTable.bind(this),
      AddColumnNode: this.visitAddColumn.bind(this),
      ColumnDefinitionNode: this.visitColumnDefinition.bind(this),
      DropTableNode: this.visitDropTable.bind(this),
      DataTypeNode: this.visitDataType.bind(this),
      OrderByNode: this.visitOrderBy.bind(this),
      OrderByItemNode: this.visitOrderByItem.bind(this),
      GroupByNode: this.visitGroupBy.bind(this),
      GroupByItemNode: this.visitGroupByItem.bind(this),
      UpdateQueryNode: this.visitUpdateQuery.bind(this),
      ColumnUpdateNode: this.visitColumnUpdate.bind(this),
      LimitNode: this.visitLimit.bind(this),
      OffsetNode: this.visitOffset.bind(this),
      OnConflictNode: this.visitOnConflict.bind(this),
      OnDuplicateKeyNode: this.visitOnDuplicateKey.bind(this),
      CreateIndexNode: this.visitCreateIndex.bind(this),
      DropIndexNode: this.visitDropIndex.bind(this),
      ListNode: this.visitList.bind(this),
      PrimaryKeyConstraintNode: this.visitPrimaryKeyConstraint.bind(this),
      UniqueConstraintNode: this.visitUniqueConstraint.bind(this),
      ReferencesNode: this.visitReferences.bind(this),
      CheckConstraintNode: this.visitCheckConstraint.bind(this),
      WithNode: this.visitWith.bind(this),
      CommonTableExpressionNode: this.visitCommonTableExpression.bind(this),
      CommonTableExpressionNameNode: this.visitCommonTableExpressionName.bind(this),
      HavingNode: this.visitHaving.bind(this),
      CreateSchemaNode: this.visitCreateSchema.bind(this),
      DropSchemaNode: this.visitDropSchema.bind(this),
      AlterTableNode: this.visitAlterTable.bind(this),
      DropColumnNode: this.visitDropColumn.bind(this),
      RenameColumnNode: this.visitRenameColumn.bind(this),
      AlterColumnNode: this.visitAlterColumn.bind(this),
      ModifyColumnNode: this.visitModifyColumn.bind(this),
      AddConstraintNode: this.visitAddConstraint.bind(this),
      DropConstraintNode: this.visitDropConstraint.bind(this),
      ForeignKeyConstraintNode: this.visitForeignKeyConstraint.bind(this),
      CreateViewNode: this.visitCreateView.bind(this),
      DropViewNode: this.visitDropView.bind(this),
      GeneratedNode: this.visitGenerated.bind(this),
      DefaultValueNode: this.visitDefaultValue.bind(this),
      OnNode: this.visitOn.bind(this),
      ValuesNode: this.visitValues.bind(this),
      SelectModifierNode: this.visitSelectModifier.bind(this),
      CreateTypeNode: this.visitCreateType.bind(this),
      DropTypeNode: this.visitDropType.bind(this),
      ExplainNode: this.visitExplain.bind(this),
      DefaultInsertValueNode: this.visitDefaultInsertValue.bind(this),
      AggregateFunctionNode: this.visitAggregateFunction.bind(this),
      OverNode: this.visitOver.bind(this),
      PartitionByNode: this.visitPartitionBy.bind(this),
      PartitionByItemNode: this.visitPartitionByItem.bind(this),
      SetOperationNode: this.visitSetOperation.bind(this),
      BinaryOperationNode: this.visitBinaryOperation.bind(this),
      UnaryOperationNode: this.visitUnaryOperation.bind(this),
      UsingNode: this.visitUsing.bind(this),
      FunctionNode: this.visitFunction.bind(this),
      CaseNode: this.visitCase.bind(this),
      WhenNode: this.visitWhen.bind(this),
      JSONReferenceNode: this.visitJSONReference.bind(this),
      JSONPathNode: this.visitJSONPath.bind(this),
      JSONPathLegNode: this.visitJSONPathLeg.bind(this),
      JSONOperatorChainNode: this.visitJSONOperatorChain.bind(this),
      TupleNode: this.visitTuple.bind(this),
      MergeQueryNode: this.visitMergeQuery.bind(this),
      MatchedNode: this.visitMatched.bind(this),
      AddIndexNode: this.visitAddIndex.bind(this),
      CastNode: this.visitCast.bind(this),
      FetchNode: this.visitFetch.bind(this),
      TopNode: this.visitTop.bind(this),
      OutputNode: this.visitOutput.bind(this)
    }));
    __publicField(this, "visitNode", (node) => {
      this.nodeStack.push(node);
      __privateGet(this, _visitors)[node.kind](node);
      this.nodeStack.pop();
    });
  }
  get parentNode() {
    return this.nodeStack[this.nodeStack.length - 2];
  }
}
_visitors = new WeakMap();
class DefaultQueryCompiler extends OperationNodeVisitor {
  constructor() {
    super(...arguments);
    __privateAdd(this, _sql, "");
    __privateAdd(this, _parameters, []);
  }
  get numParameters() {
    return __privateGet(this, _parameters).length;
  }
  compileQuery(node) {
    __privateSet(this, _sql, "");
    __privateSet(this, _parameters, []);
    this.nodeStack.splice(0, this.nodeStack.length);
    this.visitNode(node);
    return freeze({
      query: node,
      sql: this.getSql(),
      parameters: [...__privateGet(this, _parameters)]
    });
  }
  getSql() {
    return __privateGet(this, _sql);
  }
  visitSelectQuery(node) {
    const wrapInParens = this.parentNode !== void 0 && !ParensNode.is(this.parentNode) && !InsertQueryNode.is(this.parentNode) && !CreateTableNode.is(this.parentNode) && !CreateViewNode.is(this.parentNode) && !SetOperationNode.is(this.parentNode);
    if (this.parentNode === void 0 && node.explain) {
      this.visitNode(node.explain);
      this.append(" ");
    }
    if (wrapInParens) {
      this.append("(");
    }
    if (node.with) {
      this.visitNode(node.with);
      this.append(" ");
    }
    this.append("select");
    if (node.distinctOn) {
      this.append(" ");
      this.compileDistinctOn(node.distinctOn);
    }
    if (node.frontModifiers?.length) {
      this.append(" ");
      this.compileList(node.frontModifiers, " ");
    }
    if (node.top) {
      this.append(" ");
      this.visitNode(node.top);
    }
    if (node.selections) {
      this.append(" ");
      this.compileList(node.selections);
    }
    if (node.from) {
      this.append(" ");
      this.visitNode(node.from);
    }
    if (node.joins) {
      this.append(" ");
      this.compileList(node.joins, " ");
    }
    if (node.where) {
      this.append(" ");
      this.visitNode(node.where);
    }
    if (node.groupBy) {
      this.append(" ");
      this.visitNode(node.groupBy);
    }
    if (node.having) {
      this.append(" ");
      this.visitNode(node.having);
    }
    if (node.setOperations) {
      this.append(" ");
      this.compileList(node.setOperations, " ");
    }
    if (node.orderBy) {
      this.append(" ");
      this.visitNode(node.orderBy);
    }
    if (node.limit) {
      this.append(" ");
      this.visitNode(node.limit);
    }
    if (node.offset) {
      this.append(" ");
      this.visitNode(node.offset);
    }
    if (node.fetch) {
      this.append(" ");
      this.visitNode(node.fetch);
    }
    if (node.endModifiers?.length) {
      this.append(" ");
      this.compileList(this.sortSelectModifiers([...node.endModifiers]), " ");
    }
    if (wrapInParens) {
      this.append(")");
    }
  }
  visitFrom(node) {
    this.append("from ");
    this.compileList(node.froms);
  }
  visitSelection(node) {
    this.visitNode(node.selection);
  }
  visitColumn(node) {
    this.visitNode(node.column);
  }
  compileDistinctOn(expressions) {
    this.append("distinct on (");
    this.compileList(expressions);
    this.append(")");
  }
  compileList(nodes, separator = ", ") {
    const lastIndex = nodes.length - 1;
    for (let i = 0; i <= lastIndex; i++) {
      this.visitNode(nodes[i]);
      if (i < lastIndex) {
        this.append(separator);
      }
    }
  }
  visitWhere(node) {
    this.append("where ");
    this.visitNode(node.where);
  }
  visitHaving(node) {
    this.append("having ");
    this.visitNode(node.having);
  }
  visitInsertQuery(node) {
    const rootQueryNode = this.nodeStack.find(QueryNode.is);
    const isSubQuery = rootQueryNode !== node;
    if (!isSubQuery && node.explain) {
      this.visitNode(node.explain);
      this.append(" ");
    }
    if (isSubQuery && !MergeQueryNode.is(rootQueryNode)) {
      this.append("(");
    }
    if (node.with) {
      this.visitNode(node.with);
      this.append(" ");
    }
    this.append(node.replace ? "replace" : "insert");
    if (node.ignore) {
      this.append(" ignore");
    }
    if (node.top) {
      this.append(" ");
      this.visitNode(node.top);
    }
    if (node.into) {
      this.append(" into ");
      this.visitNode(node.into);
    }
    if (node.columns) {
      this.append(" (");
      this.compileList(node.columns);
      this.append(")");
    }
    if (node.output) {
      this.append(" ");
      this.visitNode(node.output);
    }
    if (node.values) {
      this.append(" ");
      this.visitNode(node.values);
    }
    if (node.defaultValues) {
      this.append(" ");
      this.append("default values");
    }
    if (node.onConflict) {
      this.append(" ");
      this.visitNode(node.onConflict);
    }
    if (node.onDuplicateKey) {
      this.append(" ");
      this.visitNode(node.onDuplicateKey);
    }
    if (node.returning) {
      this.append(" ");
      this.visitNode(node.returning);
    }
    if (isSubQuery && !MergeQueryNode.is(rootQueryNode)) {
      this.append(")");
    }
    if (node.endModifiers?.length) {
      this.append(" ");
      this.compileList(node.endModifiers, " ");
    }
  }
  visitValues(node) {
    this.append("values ");
    this.compileList(node.values);
  }
  visitDeleteQuery(node) {
    const isSubQuery = this.nodeStack.find(QueryNode.is) !== node;
    if (!isSubQuery && node.explain) {
      this.visitNode(node.explain);
      this.append(" ");
    }
    if (isSubQuery) {
      this.append("(");
    }
    if (node.with) {
      this.visitNode(node.with);
      this.append(" ");
    }
    this.append("delete ");
    if (node.top) {
      this.visitNode(node.top);
      this.append(" ");
    }
    this.visitNode(node.from);
    if (node.output) {
      this.append(" ");
      this.visitNode(node.output);
    }
    if (node.using) {
      this.append(" ");
      this.visitNode(node.using);
    }
    if (node.joins) {
      this.append(" ");
      this.compileList(node.joins, " ");
    }
    if (node.where) {
      this.append(" ");
      this.visitNode(node.where);
    }
    if (node.orderBy) {
      this.append(" ");
      this.visitNode(node.orderBy);
    }
    if (node.limit) {
      this.append(" ");
      this.visitNode(node.limit);
    }
    if (node.returning) {
      this.append(" ");
      this.visitNode(node.returning);
    }
    if (isSubQuery) {
      this.append(")");
    }
    if (node.endModifiers?.length) {
      this.append(" ");
      this.compileList(node.endModifiers, " ");
    }
  }
  visitReturning(node) {
    this.append("returning ");
    this.compileList(node.selections);
  }
  visitAlias(node) {
    this.visitNode(node.node);
    this.append(" as ");
    this.visitNode(node.alias);
  }
  visitReference(node) {
    if (node.table) {
      this.visitNode(node.table);
      this.append(".");
    }
    this.visitNode(node.column);
  }
  visitSelectAll(_) {
    this.append("*");
  }
  visitIdentifier(node) {
    this.append(this.getLeftIdentifierWrapper());
    this.compileUnwrappedIdentifier(node);
    this.append(this.getRightIdentifierWrapper());
  }
  compileUnwrappedIdentifier(node) {
    if (!isString(node.name)) {
      throw new Error("a non-string identifier was passed to compileUnwrappedIdentifier.");
    }
    this.append(this.sanitizeIdentifier(node.name));
  }
  visitAnd(node) {
    this.visitNode(node.left);
    this.append(" and ");
    this.visitNode(node.right);
  }
  visitOr(node) {
    this.visitNode(node.left);
    this.append(" or ");
    this.visitNode(node.right);
  }
  visitValue(node) {
    if (node.immediate) {
      this.appendImmediateValue(node.value);
    } else {
      this.appendValue(node.value);
    }
  }
  visitValueList(node) {
    this.append("(");
    this.compileList(node.values);
    this.append(")");
  }
  visitTuple(node) {
    this.append("(");
    this.compileList(node.values);
    this.append(")");
  }
  visitPrimitiveValueList(node) {
    this.append("(");
    const { values } = node;
    for (let i = 0; i < values.length; ++i) {
      this.appendValue(values[i]);
      if (i !== values.length - 1) {
        this.append(", ");
      }
    }
    this.append(")");
  }
  visitParens(node) {
    this.append("(");
    this.visitNode(node.node);
    this.append(")");
  }
  visitJoin(node) {
    this.append(JOIN_TYPE_SQL[node.joinType]);
    this.append(" ");
    this.visitNode(node.table);
    if (node.on) {
      this.append(" ");
      this.visitNode(node.on);
    }
  }
  visitOn(node) {
    this.append("on ");
    this.visitNode(node.on);
  }
  visitRaw(node) {
    const { sqlFragments, parameters: params } = node;
    for (let i = 0; i < sqlFragments.length; ++i) {
      this.append(sqlFragments[i]);
      if (params.length > i) {
        this.visitNode(params[i]);
      }
    }
  }
  visitOperator(node) {
    this.append(node.operator);
  }
  visitTable(node) {
    this.visitNode(node.table);
  }
  visitSchemableIdentifier(node) {
    if (node.schema) {
      this.visitNode(node.schema);
      this.append(".");
    }
    this.visitNode(node.identifier);
  }
  visitCreateTable(node) {
    this.append("create ");
    if (node.frontModifiers && node.frontModifiers.length > 0) {
      this.compileList(node.frontModifiers, " ");
      this.append(" ");
    }
    if (node.temporary) {
      this.append("temporary ");
    }
    this.append("table ");
    if (node.ifNotExists) {
      this.append("if not exists ");
    }
    this.visitNode(node.table);
    if (node.selectQuery) {
      this.append(" as ");
      this.visitNode(node.selectQuery);
    } else {
      this.append(" (");
      this.compileList([...node.columns, ...node.constraints ?? []]);
      this.append(")");
      if (node.onCommit) {
        this.append(" on commit ");
        this.append(node.onCommit);
      }
      if (node.endModifiers && node.endModifiers.length > 0) {
        this.append(" ");
        this.compileList(node.endModifiers, " ");
      }
    }
  }
  visitColumnDefinition(node) {
    if (node.ifNotExists) {
      this.append("if not exists ");
    }
    this.visitNode(node.column);
    this.append(" ");
    this.visitNode(node.dataType);
    if (node.unsigned) {
      this.append(" unsigned");
    }
    if (node.frontModifiers && node.frontModifiers.length > 0) {
      this.append(" ");
      this.compileList(node.frontModifiers, " ");
    }
    if (node.generated) {
      this.append(" ");
      this.visitNode(node.generated);
    }
    if (node.identity) {
      this.append(" identity");
    }
    if (node.defaultTo) {
      this.append(" ");
      this.visitNode(node.defaultTo);
    }
    if (node.notNull) {
      this.append(" not null");
    }
    if (node.unique) {
      this.append(" unique");
    }
    if (node.nullsNotDistinct) {
      this.append(" nulls not distinct");
    }
    if (node.primaryKey) {
      this.append(" primary key");
    }
    if (node.autoIncrement) {
      this.append(" ");
      this.append(this.getAutoIncrement());
    }
    if (node.references) {
      this.append(" ");
      this.visitNode(node.references);
    }
    if (node.check) {
      this.append(" ");
      this.visitNode(node.check);
    }
    if (node.endModifiers && node.endModifiers.length > 0) {
      this.append(" ");
      this.compileList(node.endModifiers, " ");
    }
  }
  getAutoIncrement() {
    return "auto_increment";
  }
  visitReferences(node) {
    this.append("references ");
    this.visitNode(node.table);
    this.append(" (");
    this.compileList(node.columns);
    this.append(")");
    if (node.onDelete) {
      this.append(" on delete ");
      this.append(node.onDelete);
    }
    if (node.onUpdate) {
      this.append(" on update ");
      this.append(node.onUpdate);
    }
  }
  visitDropTable(node) {
    this.append("drop table ");
    if (node.ifExists) {
      this.append("if exists ");
    }
    this.visitNode(node.table);
    if (node.cascade) {
      this.append(" cascade");
    }
  }
  visitDataType(node) {
    this.append(node.dataType);
  }
  visitOrderBy(node) {
    this.append("order by ");
    this.compileList(node.items);
  }
  visitOrderByItem(node) {
    this.visitNode(node.orderBy);
    if (node.direction) {
      this.append(" ");
      this.visitNode(node.direction);
    }
  }
  visitGroupBy(node) {
    this.append("group by ");
    this.compileList(node.items);
  }
  visitGroupByItem(node) {
    this.visitNode(node.groupBy);
  }
  visitUpdateQuery(node) {
    const rootQueryNode = this.nodeStack.find(QueryNode.is);
    const isSubQuery = rootQueryNode !== node;
    if (!isSubQuery && node.explain) {
      this.visitNode(node.explain);
      this.append(" ");
    }
    if (isSubQuery && !MergeQueryNode.is(rootQueryNode)) {
      this.append("(");
    }
    if (node.with) {
      this.visitNode(node.with);
      this.append(" ");
    }
    this.append("update ");
    if (node.top) {
      this.visitNode(node.top);
      this.append(" ");
    }
    if (node.table) {
      this.visitNode(node.table);
      this.append(" ");
    }
    this.append("set ");
    if (node.updates) {
      this.compileList(node.updates);
    }
    if (node.output) {
      this.append(" ");
      this.visitNode(node.output);
    }
    if (node.from) {
      this.append(" ");
      this.visitNode(node.from);
    }
    if (node.joins) {
      this.append(" ");
      this.compileList(node.joins, " ");
    }
    if (node.where) {
      this.append(" ");
      this.visitNode(node.where);
    }
    if (node.limit) {
      this.append(" ");
      this.visitNode(node.limit);
    }
    if (node.returning) {
      this.append(" ");
      this.visitNode(node.returning);
    }
    if (isSubQuery && !MergeQueryNode.is(rootQueryNode)) {
      this.append(")");
    }
    if (node.endModifiers?.length) {
      this.append(" ");
      this.compileList(node.endModifiers, " ");
    }
  }
  visitColumnUpdate(node) {
    this.visitNode(node.column);
    this.append(" = ");
    this.visitNode(node.value);
  }
  visitLimit(node) {
    this.append("limit ");
    this.visitNode(node.limit);
  }
  visitOffset(node) {
    this.append("offset ");
    this.visitNode(node.offset);
  }
  visitOnConflict(node) {
    this.append("on conflict");
    if (node.columns) {
      this.append(" (");
      this.compileList(node.columns);
      this.append(")");
    } else if (node.constraint) {
      this.append(" on constraint ");
      this.visitNode(node.constraint);
    } else if (node.indexExpression) {
      this.append(" (");
      this.visitNode(node.indexExpression);
      this.append(")");
    }
    if (node.indexWhere) {
      this.append(" ");
      this.visitNode(node.indexWhere);
    }
    if (node.doNothing === true) {
      this.append(" do nothing");
    } else if (node.updates) {
      this.append(" do update set ");
      this.compileList(node.updates);
      if (node.updateWhere) {
        this.append(" ");
        this.visitNode(node.updateWhere);
      }
    }
  }
  visitOnDuplicateKey(node) {
    this.append("on duplicate key update ");
    this.compileList(node.updates);
  }
  visitCreateIndex(node) {
    this.append("create ");
    if (node.unique) {
      this.append("unique ");
    }
    this.append("index ");
    if (node.ifNotExists) {
      this.append("if not exists ");
    }
    this.visitNode(node.name);
    if (node.table) {
      this.append(" on ");
      this.visitNode(node.table);
    }
    if (node.using) {
      this.append(" using ");
      this.visitNode(node.using);
    }
    if (node.columns) {
      this.append(" (");
      this.compileList(node.columns);
      this.append(")");
    }
    if (node.nullsNotDistinct) {
      this.append(" nulls not distinct");
    }
    if (node.where) {
      this.append(" ");
      this.visitNode(node.where);
    }
  }
  visitDropIndex(node) {
    this.append("drop index ");
    if (node.ifExists) {
      this.append("if exists ");
    }
    this.visitNode(node.name);
    if (node.table) {
      this.append(" on ");
      this.visitNode(node.table);
    }
    if (node.cascade) {
      this.append(" cascade");
    }
  }
  visitCreateSchema(node) {
    this.append("create schema ");
    if (node.ifNotExists) {
      this.append("if not exists ");
    }
    this.visitNode(node.schema);
  }
  visitDropSchema(node) {
    this.append("drop schema ");
    if (node.ifExists) {
      this.append("if exists ");
    }
    this.visitNode(node.schema);
    if (node.cascade) {
      this.append(" cascade");
    }
  }
  visitPrimaryKeyConstraint(node) {
    if (node.name) {
      this.append("constraint ");
      this.visitNode(node.name);
      this.append(" ");
    }
    this.append("primary key (");
    this.compileList(node.columns);
    this.append(")");
  }
  visitUniqueConstraint(node) {
    if (node.name) {
      this.append("constraint ");
      this.visitNode(node.name);
      this.append(" ");
    }
    this.append("unique");
    if (node.nullsNotDistinct) {
      this.append(" nulls not distinct");
    }
    this.append(" (");
    this.compileList(node.columns);
    this.append(")");
  }
  visitCheckConstraint(node) {
    if (node.name) {
      this.append("constraint ");
      this.visitNode(node.name);
      this.append(" ");
    }
    this.append("check (");
    this.visitNode(node.expression);
    this.append(")");
  }
  visitForeignKeyConstraint(node) {
    if (node.name) {
      this.append("constraint ");
      this.visitNode(node.name);
      this.append(" ");
    }
    this.append("foreign key (");
    this.compileList(node.columns);
    this.append(") ");
    this.visitNode(node.references);
    if (node.onDelete) {
      this.append(" on delete ");
      this.append(node.onDelete);
    }
    if (node.onUpdate) {
      this.append(" on update ");
      this.append(node.onUpdate);
    }
  }
  visitList(node) {
    this.compileList(node.items);
  }
  visitWith(node) {
    this.append("with ");
    if (node.recursive) {
      this.append("recursive ");
    }
    this.compileList(node.expressions);
  }
  visitCommonTableExpression(node) {
    this.visitNode(node.name);
    this.append(" as ");
    if (isBoolean(node.materialized)) {
      if (!node.materialized) {
        this.append("not ");
      }
      this.append("materialized ");
    }
    this.visitNode(node.expression);
  }
  visitCommonTableExpressionName(node) {
    this.visitNode(node.table);
    if (node.columns) {
      this.append("(");
      this.compileList(node.columns);
      this.append(")");
    }
  }
  visitAlterTable(node) {
    this.append("alter table ");
    this.visitNode(node.table);
    this.append(" ");
    if (node.renameTo) {
      this.append("rename to ");
      this.visitNode(node.renameTo);
    }
    if (node.setSchema) {
      this.append("set schema ");
      this.visitNode(node.setSchema);
    }
    if (node.addConstraint) {
      this.visitNode(node.addConstraint);
    }
    if (node.dropConstraint) {
      this.visitNode(node.dropConstraint);
    }
    if (node.columnAlterations) {
      this.compileColumnAlterations(node.columnAlterations);
    }
    if (node.addIndex) {
      this.visitNode(node.addIndex);
    }
    if (node.dropIndex) {
      this.visitNode(node.dropIndex);
    }
  }
  visitAddColumn(node) {
    this.append("add column ");
    this.visitNode(node.column);
  }
  visitRenameColumn(node) {
    this.append("rename column ");
    this.visitNode(node.column);
    this.append(" to ");
    this.visitNode(node.renameTo);
  }
  visitDropColumn(node) {
    this.append("drop column ");
    this.visitNode(node.column);
  }
  visitAlterColumn(node) {
    this.append("alter column ");
    this.visitNode(node.column);
    this.append(" ");
    if (node.dataType) {
      if (this.announcesNewColumnDataType()) {
        this.append("type ");
      }
      this.visitNode(node.dataType);
      if (node.dataTypeExpression) {
        this.append("using ");
        this.visitNode(node.dataTypeExpression);
      }
    }
    if (node.setDefault) {
      this.append("set default ");
      this.visitNode(node.setDefault);
    }
    if (node.dropDefault) {
      this.append("drop default");
    }
    if (node.setNotNull) {
      this.append("set not null");
    }
    if (node.dropNotNull) {
      this.append("drop not null");
    }
  }
  visitModifyColumn(node) {
    this.append("modify column ");
    this.visitNode(node.column);
  }
  visitAddConstraint(node) {
    this.append("add ");
    this.visitNode(node.constraint);
  }
  visitDropConstraint(node) {
    this.append("drop constraint ");
    if (node.ifExists) {
      this.append("if exists ");
    }
    this.visitNode(node.constraintName);
    if (node.modifier === "cascade") {
      this.append(" cascade");
    } else if (node.modifier === "restrict") {
      this.append(" restrict");
    }
  }
  visitSetOperation(node) {
    this.append(node.operator);
    this.append(" ");
    if (node.all) {
      this.append("all ");
    }
    this.visitNode(node.expression);
  }
  visitCreateView(node) {
    this.append("create ");
    if (node.orReplace) {
      this.append("or replace ");
    }
    if (node.materialized) {
      this.append("materialized ");
    }
    if (node.temporary) {
      this.append("temporary ");
    }
    this.append("view ");
    if (node.ifNotExists) {
      this.append("if not exists ");
    }
    this.visitNode(node.name);
    this.append(" ");
    if (node.columns) {
      this.append("(");
      this.compileList(node.columns);
      this.append(") ");
    }
    if (node.as) {
      this.append("as ");
      this.visitNode(node.as);
    }
  }
  visitDropView(node) {
    this.append("drop ");
    if (node.materialized) {
      this.append("materialized ");
    }
    this.append("view ");
    if (node.ifExists) {
      this.append("if exists ");
    }
    this.visitNode(node.name);
    if (node.cascade) {
      this.append(" cascade");
    }
  }
  visitGenerated(node) {
    this.append("generated ");
    if (node.always) {
      this.append("always ");
    }
    if (node.byDefault) {
      this.append("by default ");
    }
    this.append("as ");
    if (node.identity) {
      this.append("identity");
    }
    if (node.expression) {
      this.append("(");
      this.visitNode(node.expression);
      this.append(")");
    }
    if (node.stored) {
      this.append(" stored");
    }
  }
  visitDefaultValue(node) {
    this.append("default ");
    this.visitNode(node.defaultValue);
  }
  visitSelectModifier(node) {
    if (node.rawModifier) {
      this.visitNode(node.rawModifier);
    } else {
      this.append(SELECT_MODIFIER_SQL[node.modifier]);
    }
    if (node.of) {
      this.append(" of ");
      this.compileList(node.of, ", ");
    }
  }
  visitCreateType(node) {
    this.append("create type ");
    this.visitNode(node.name);
    if (node.enum) {
      this.append(" as enum ");
      this.visitNode(node.enum);
    }
  }
  visitDropType(node) {
    this.append("drop type ");
    if (node.ifExists) {
      this.append("if exists ");
    }
    this.visitNode(node.name);
  }
  visitExplain(node) {
    this.append("explain");
    if (node.options || node.format) {
      this.append(" ");
      this.append(this.getLeftExplainOptionsWrapper());
      if (node.options) {
        this.visitNode(node.options);
        if (node.format) {
          this.append(this.getExplainOptionsDelimiter());
        }
      }
      if (node.format) {
        this.append("format");
        this.append(this.getExplainOptionAssignment());
        this.append(node.format);
      }
      this.append(this.getRightExplainOptionsWrapper());
    }
  }
  visitDefaultInsertValue(_) {
    this.append("default");
  }
  visitAggregateFunction(node) {
    this.append(node.func);
    this.append("(");
    if (node.distinct) {
      this.append("distinct ");
    }
    this.compileList(node.aggregated);
    if (node.orderBy) {
      this.append(" ");
      this.visitNode(node.orderBy);
    }
    this.append(")");
    if (node.filter) {
      this.append(" filter(");
      this.visitNode(node.filter);
      this.append(")");
    }
    if (node.over) {
      this.append(" ");
      this.visitNode(node.over);
    }
  }
  visitOver(node) {
    this.append("over(");
    if (node.partitionBy) {
      this.visitNode(node.partitionBy);
      if (node.orderBy) {
        this.append(" ");
      }
    }
    if (node.orderBy) {
      this.visitNode(node.orderBy);
    }
    this.append(")");
  }
  visitPartitionBy(node) {
    this.append("partition by ");
    this.compileList(node.items);
  }
  visitPartitionByItem(node) {
    this.visitNode(node.partitionBy);
  }
  visitBinaryOperation(node) {
    this.visitNode(node.leftOperand);
    this.append(" ");
    this.visitNode(node.operator);
    this.append(" ");
    this.visitNode(node.rightOperand);
  }
  visitUnaryOperation(node) {
    this.visitNode(node.operator);
    if (!this.isMinusOperator(node.operator)) {
      this.append(" ");
    }
    this.visitNode(node.operand);
  }
  isMinusOperator(node) {
    return OperatorNode.is(node) && node.operator === "-";
  }
  visitUsing(node) {
    this.append("using ");
    this.compileList(node.tables);
  }
  visitFunction(node) {
    this.append(node.func);
    this.append("(");
    this.compileList(node.arguments);
    this.append(")");
  }
  visitCase(node) {
    this.append("case");
    if (node.value) {
      this.append(" ");
      this.visitNode(node.value);
    }
    if (node.when) {
      this.append(" ");
      this.compileList(node.when, " ");
    }
    if (node.else) {
      this.append(" else ");
      this.visitNode(node.else);
    }
    this.append(" end");
    if (node.isStatement) {
      this.append(" case");
    }
  }
  visitWhen(node) {
    this.append("when ");
    this.visitNode(node.condition);
    if (node.result) {
      this.append(" then ");
      this.visitNode(node.result);
    }
  }
  visitJSONReference(node) {
    this.visitNode(node.reference);
    this.visitNode(node.traversal);
  }
  visitJSONPath(node) {
    if (node.inOperator) {
      this.visitNode(node.inOperator);
    }
    this.append("'$");
    for (const pathLeg of node.pathLegs) {
      this.visitNode(pathLeg);
    }
    this.append("'");
  }
  visitJSONPathLeg(node) {
    const isArrayLocation = node.type === "ArrayLocation";
    this.append(isArrayLocation ? "[" : ".");
    this.append(String(node.value));
    if (isArrayLocation) {
      this.append("]");
    }
  }
  visitJSONOperatorChain(node) {
    for (let i = 0, len = node.values.length; i < len; i++) {
      if (i === len - 1) {
        this.visitNode(node.operator);
      } else {
        this.append("->");
      }
      this.visitNode(node.values[i]);
    }
  }
  visitMergeQuery(node) {
    if (node.with) {
      this.visitNode(node.with);
      this.append(" ");
    }
    this.append("merge ");
    if (node.top) {
      this.visitNode(node.top);
      this.append(" ");
    }
    this.append("into ");
    this.visitNode(node.into);
    if (node.using) {
      this.append(" ");
      this.visitNode(node.using);
    }
    if (node.whens) {
      this.append(" ");
      this.compileList(node.whens, " ");
    }
    if (node.output) {
      this.append(" ");
      this.visitNode(node.output);
    }
    if (node.endModifiers?.length) {
      this.append(" ");
      this.compileList(node.endModifiers, " ");
    }
  }
  visitMatched(node) {
    if (node.not) {
      this.append("not ");
    }
    this.append("matched");
    if (node.bySource) {
      this.append(" by source");
    }
  }
  visitAddIndex(node) {
    this.append("add ");
    if (node.unique) {
      this.append("unique ");
    }
    this.append("index ");
    this.visitNode(node.name);
    if (node.columns) {
      this.append(" (");
      this.compileList(node.columns);
      this.append(")");
    }
    if (node.using) {
      this.append(" using ");
      this.visitNode(node.using);
    }
  }
  visitCast(node) {
    this.append("cast(");
    this.visitNode(node.expression);
    this.append(" as ");
    this.visitNode(node.dataType);
    this.append(")");
  }
  visitFetch(node) {
    this.append("fetch next ");
    this.visitNode(node.rowCount);
    this.append(` rows ${node.modifier}`);
  }
  visitOutput(node) {
    this.append("output ");
    this.compileList(node.selections);
  }
  visitTop(node) {
    this.append(`top(${node.expression})`);
    if (node.modifiers) {
      this.append(` ${node.modifiers}`);
    }
  }
  append(str) {
    __privateSet(this, _sql, __privateGet(this, _sql) + str);
  }
  appendValue(parameter) {
    this.addParameter(parameter);
    this.append(this.getCurrentParameterPlaceholder());
  }
  getLeftIdentifierWrapper() {
    return '"';
  }
  getRightIdentifierWrapper() {
    return '"';
  }
  getCurrentParameterPlaceholder() {
    return "$" + this.numParameters;
  }
  getLeftExplainOptionsWrapper() {
    return "(";
  }
  getExplainOptionAssignment() {
    return " ";
  }
  getExplainOptionsDelimiter() {
    return ", ";
  }
  getRightExplainOptionsWrapper() {
    return ")";
  }
  sanitizeIdentifier(identifier) {
    const leftWrap = this.getLeftIdentifierWrapper();
    const rightWrap = this.getRightIdentifierWrapper();
    let sanitized = "";
    for (const c of identifier) {
      sanitized += c;
      if (c === leftWrap) {
        sanitized += leftWrap;
      } else if (c === rightWrap) {
        sanitized += rightWrap;
      }
    }
    return sanitized;
  }
  addParameter(parameter) {
    __privateGet(this, _parameters).push(parameter);
  }
  appendImmediateValue(value) {
    if (isString(value)) {
      this.append(`'${value}'`);
    } else if (isNumber(value) || isBoolean(value)) {
      this.append(value.toString());
    } else if (isNull(value)) {
      this.append("null");
    } else if (isDate(value)) {
      this.appendImmediateValue(value.toISOString());
    } else if (isBigInt(value)) {
      this.appendImmediateValue(value.toString());
    } else {
      throw new Error(`invalid immediate value ${value}`);
    }
  }
  sortSelectModifiers(arr) {
    arr.sort((left, right) => left.modifier && right.modifier ? SELECT_MODIFIER_PRIORITY[left.modifier] - SELECT_MODIFIER_PRIORITY[right.modifier] : 1);
    return freeze(arr);
  }
  compileColumnAlterations(columnAlterations) {
    this.compileList(columnAlterations);
  }
  /**
   * controls whether the dialect adds a "type" keyword before a column's new data
   * type in an ALTER TABLE statement.
   */
  announcesNewColumnDataType() {
    return true;
  }
}
_sql = new WeakMap();
_parameters = new WeakMap();
const SELECT_MODIFIER_SQL = freeze({
  ForKeyShare: "for key share",
  ForNoKeyUpdate: "for no key update",
  ForUpdate: "for update",
  ForShare: "for share",
  NoWait: "nowait",
  SkipLocked: "skip locked",
  Distinct: "distinct"
});
const SELECT_MODIFIER_PRIORITY = freeze({
  ForKeyShare: 1,
  ForNoKeyUpdate: 1,
  ForUpdate: 1,
  ForShare: 1,
  NoWait: 2,
  SkipLocked: 2,
  Distinct: 0
});
const JOIN_TYPE_SQL = freeze({
  InnerJoin: "inner join",
  LeftJoin: "left join",
  RightJoin: "right join",
  FullJoin: "full join",
  LateralInnerJoin: "inner join lateral",
  LateralLeftJoin: "left join lateral",
  Using: "using"
});
const CompiledQuery = freeze({
  raw(sql2, parameters = []) {
    return freeze({
      sql: sql2,
      query: RawNode.createWithSql(sql2),
      parameters: freeze(parameters)
    });
  }
});
class DialectAdapterBase {
  get supportsCreateIfNotExists() {
    return true;
  }
  get supportsTransactionalDdl() {
    return false;
  }
  get supportsReturning() {
    return false;
  }
  get supportsOutput() {
    return false;
  }
}
const ID_WRAP_REGEX = /"/g;
class SqliteQueryCompiler extends DefaultQueryCompiler {
  getCurrentParameterPlaceholder() {
    return "?";
  }
  getLeftExplainOptionsWrapper() {
    return "";
  }
  getRightExplainOptionsWrapper() {
    return "";
  }
  getLeftIdentifierWrapper() {
    return '"';
  }
  getRightIdentifierWrapper() {
    return '"';
  }
  getAutoIncrement() {
    return "autoincrement";
  }
  sanitizeIdentifier(identifier) {
    return identifier.replace(ID_WRAP_REGEX, '""');
  }
  visitDefaultInsertValue(_) {
    this.append("null");
  }
}
const DEFAULT_MIGRATION_TABLE = "kysely_migration";
const DEFAULT_MIGRATION_LOCK_TABLE = "kysely_migration_lock";
freeze({ __noMigrations__: true });
class SqliteIntrospector {
  constructor(db) {
    __privateAdd(this, _SqliteIntrospector_instances);
    __privateAdd(this, _db);
    __privateSet(this, _db, db);
  }
  async getSchemas() {
    return [];
  }
  async getTables(options = { withInternalKyselyTables: false }) {
    let query = __privateGet(this, _db).selectFrom("sqlite_master").where("type", "in", ["table", "view"]).where("name", "not like", "sqlite_%").select("name").orderBy("name").$castTo();
    if (!options.withInternalKyselyTables) {
      query = query.where("name", "!=", DEFAULT_MIGRATION_TABLE).where("name", "!=", DEFAULT_MIGRATION_LOCK_TABLE);
    }
    const tables2 = await query.execute();
    return Promise.all(tables2.map(({ name }) => __privateMethod(this, _SqliteIntrospector_instances, getTableMetadata_fn).call(this, name)));
  }
  async getMetadata(options) {
    return {
      tables: await this.getTables(options)
    };
  }
}
_db = new WeakMap();
_SqliteIntrospector_instances = new WeakSet();
getTableMetadata_fn = async function(table) {
  const db = __privateGet(this, _db);
  const tableDefinition = await db.selectFrom("sqlite_master").where("name", "=", table).select(["sql", "type"]).$castTo().executeTakeFirstOrThrow();
  const autoIncrementCol = tableDefinition.sql?.split(/[\(\),]/)?.find((it) => it.toLowerCase().includes("autoincrement"))?.trimStart()?.split(/\s+/)?.[0]?.replace(/["`]/g, "");
  const columns = await db.selectFrom(sql`pragma_table_info(${table})`.as("table_info")).select(["name", "type", "notnull", "dflt_value"]).orderBy("cid").execute();
  return {
    name: table,
    isView: tableDefinition.type === "view",
    columns: columns.map((col) => ({
      name: col.name,
      dataType: col.type,
      isNullable: !col.notnull,
      isAutoIncrementing: col.name === autoIncrementCol,
      hasDefaultValue: col.dflt_value != null,
      comment: void 0
    }))
  };
};
class SqliteAdapter extends DialectAdapterBase {
  get supportsTransactionalDdl() {
    return false;
  }
  get supportsReturning() {
    return true;
  }
  async acquireMigrationLock(_db2, _opt) {
  }
  async releaseMigrationLock(_db2, _opt) {
  }
}
var BaseSqliteDialect = class {
  /**
   * Base class that implements {@link Dialect}
   * @param create function that create {@link Driver}
   */
  constructor(create) {
    __publicField(this, "createDriver");
    this.createDriver = create;
  }
  createQueryCompiler() {
    return new SqliteQueryCompiler();
  }
  createAdapter() {
    return new SqliteAdapter();
  }
  createIntrospector(db) {
    return new SqliteIntrospector(db);
  }
};
var ConnectionMutex = class {
  constructor() {
    __publicField(this, "promise");
    __publicField(this, "resolve");
  }
  async lock() {
    while (this.promise) {
      await this.promise;
    }
    this.promise = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
  unlock() {
    const resolve = this.resolve;
    this.promise = void 0;
    this.resolve = void 0;
    resolve?.();
  }
};
var BaseSqliteDriver = class {
  /**
   * Base abstract class that implements {@link Driver}
   *
   * You **MUST** assign `this.conn` in `init` and implement `destroy` method
   */
  constructor(init) {
    __publicField(this, "mutex", new ConnectionMutex());
    __publicField(this, "conn");
    __publicField(this, "init");
    this.init = init;
  }
  async acquireConnection() {
    await this.mutex.lock();
    return this.conn;
  }
  async beginTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("begin"));
  }
  async commitTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("commit"));
  }
  async rollbackTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("rollback"));
  }
  async releaseConnection() {
    this.mutex.unlock();
  }
};
function buildQueryFn(exec) {
  return async (isSelect, sql2, parameters) => {
    const rows = await exec.all(sql2, parameters);
    return isSelect || rows.length ? { rows } : { rows: [], ...await exec.run("select 1") };
  };
}
var GenericSqliteDriver = class extends BaseSqliteDriver {
  constructor(executor, onCreateConnection) {
    super(async () => {
      this.db = await executor();
      this.conn = new GenericSqliteConnection(this.db);
      await onCreateConnection?.(this.conn);
    });
    __publicField(this, "db");
  }
  async destroy() {
    await this.db?.close();
  }
};
var GenericSqliteConnection = class {
  constructor(db) {
    this.db = db;
  }
  async *streamQuery({ parameters, query, sql: sql2 }) {
    if (!this.db.iterator) {
      throw new Error("streamQuery() is not supported.");
    }
    const it = this.db.iterator(SelectQueryNode.is(query), sql2, parameters);
    for await (const row of it) {
      yield { rows: [row] };
    }
  }
  async executeQuery({ parameters, query, sql: sql2 }) {
    return await this.db.query(SelectQueryNode.is(query), sql2, parameters);
  }
};
var GenericSqliteDialect = class extends BaseSqliteDialect {
  /**
   * Dialect for generic SQLite that run SQLs in current thread
   *
   * @param executor function to create {@link IGenericSqlite}
   * @param onCreateConnection optional callback after connection created
   */
  constructor(executor, onCreateConnection) {
    super(() => new GenericSqliteDriver(executor, onCreateConnection));
  }
};
async function accessDB(accessor) {
  return typeof accessor === "function" ? await accessor() : accessor;
}
var OfficialWasmDialect = class extends GenericSqliteDialect {
  /**
   * dialect for [official wasm build](https://sqlite.org/wasm/doc/trunk/index.md)
   *
   * support bigint, recommend to use opfs
   * (see {@link https://sqlite.org/forum/forumpost/59097f57cbe647a2d1950fab93e7ab82dd24c1e384d38b90ec1e2f03a2a4e580 this}
   * and {@link https://sqlite.org/forum/forumpost/8f50dc99149a6cedade784595238f45aa912144fae81821d5f9db31965f754dd this})
   *
   * you can also use [sqlite-wasm-esm](https://github.com/overtone-app/sqlite-wasm-esm)
   *
   * #### partial typescript support:
   * ```ts
   * /// <reference types="kysely-wasm/official-wasm" />
   * ```
   *
   * @example
   * ```ts
   * import sqlite3InitModule from './jswasm/sqlite3-bundler-friendly'
   * const db = new Kysely({
   *   dialect: new OfficialSqliteWasmDialect({
   *     database: async () => {
   *       const sqlite3 = (await sqlite3InitModule()).oo1
   *       if (!sqlite3) {
   *         return Promise.reject('fail to load sqlite')
   *       }
   *       const path = '/test.db'
   *       return sqlite3.OpfsDb
   *         ? new sqlite3.OpfsDb(path)
   *         : new sqlite3.DB(path)
   *     },
   *   }),
   * })
   * ```
   * when using Origin-Private FileSystem, your server must response COOP and COEP in header,
   * ```ts
   * server.middlewares.use((_req, res, next) => {
   *   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
   *   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
   *   next()
   * })
   * ```
   * @see https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API#origin_private_file_system
   * @see https://sqlite.org/wasm/doc/trunk/persistence.md#coop-coep
   */
  constructor(config) {
    super(
      async () => {
        const db = await accessDB(config.database);
        return {
          db,
          close: () => db.close(),
          query: buildQueryFn({
            all: (sql2, parameters) => {
              return db.selectObjects(sql2, parameters);
            },
            run: () => ({
              insertId: BigInt(db.selectArray("SELECT last_insert_rowid()")?.[0] || 0),
              numAffectedRows: BigInt(db.changes(false, true))
            })
          })
        };
      },
      config.onCreateConnection
    );
  }
};
var SerializeParametersTransformer = class extends OperationNodeTransformer {
  constructor(serializer) {
    super();
    __publicField(this, "serializer");
    this.serializer = serializer;
  }
  transformPrimitiveValueList(node) {
    return {
      ...node,
      values: node.values.map(this.serializer)
    };
  }
  // https://www.npmjs.com/package/zodsql
  transformColumnUpdate(node) {
    const { value: valueNode } = node;
    if (valueNode.kind !== "ValueNode") {
      return super.transformColumnUpdate(node);
    }
    const { value, ...item } = valueNode;
    const serializedValue = this.serializer(value);
    return value === serializedValue ? super.transformColumnUpdate(node) : super.transformColumnUpdate({
      ...node,
      value: { ...item, value: serializedValue }
    });
  }
  transformValue(node) {
    return {
      ...node,
      value: this.serializer(node.value)
    };
  }
};
var dateRegex = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/;
function maybeJson(parameter) {
  return parameter.startsWith("{") && parameter.endsWith("}") || parameter.startsWith("[") && parameter.endsWith("]");
}
function skipTransform$1(parameter) {
  return parameter === void 0 || parameter === null || typeof parameter === "bigint" || typeof parameter === "number" || typeof parameter === "object" && "buffer" in parameter;
}
var BaseSerializePlugin = class {
  /**
   * Base class for {@link SerializePlugin}, without default options
   */
  constructor(serializer, deserializer, skipNodeKind) {
    __publicField(this, "transformer");
    __publicField(this, "deserializer");
    __publicField(this, "skipNodeSet");
    __publicField(this, "ctx");
    this.transformer = new SerializeParametersTransformer(serializer);
    this.deserializer = deserializer;
    if (skipNodeKind.length) {
      this.skipNodeSet = new Set(skipNodeKind);
      this.ctx = /* @__PURE__ */ new WeakSet();
    }
  }
  transformQuery({ node, queryId }) {
    if (this.skipNodeSet?.has(node.kind)) {
      this.ctx?.add(queryId);
      return node;
    }
    return this.transformer.transformNode(node);
  }
  async transformResult({ result, queryId }) {
    return this.ctx?.has(queryId) ? result : { ...result, rows: this.parseRows(result.rows) };
  }
  parseRows(rows) {
    const result = [];
    for (const row of rows) {
      if (!row) {
        continue;
      }
      const parsedRow = {};
      for (const [key, value] of Object.entries(row)) {
        parsedRow[key] = this.deserializer(value);
      }
      result.push(parsedRow);
    }
    return result;
  }
};
async function executeSQL(kysely, data, parameters) {
  if (typeof data === "string") {
    data = CompiledQuery.raw(data, parameters);
  }
  return await kysely.executeQuery(data);
}
async function checkIntegrity(db) {
  const { rows } = await executeSQL(db, "PRAGMA integrity_check");
  if (!rows.length) {
    return false;
  }
  return rows[0].integrity_check === "ok";
}
async function getOrSetDBVersion(db, version) {
  if (version) {
    await executeSQL(db, `PRAGMA user_version = ${version}`);
    return version;
  }
  const { rows } = await executeSQL(db, "PRAGMA user_version");
  if (!rows.length) {
    throw new Error("Fail to get DBVersion");
  }
  return rows[0].user_version;
}
var skipTransform = (parameter) => skipTransform$1(parameter) || typeof parameter === "boolean";
var defaultSerializer = (parameter) => {
  if (skipTransform(parameter) || typeof parameter === "string") {
    return parameter;
  } else {
    try {
      return JSON.stringify(parameter);
    } catch {
      return parameter;
    }
  }
};
var defaultDeserializer = (parameter) => {
  if (skipTransform(parameter)) {
    return parameter;
  }
  if (typeof parameter === "string") {
    if (dateRegex.test(parameter)) {
      return new Date(parameter);
    } else if (maybeJson(parameter)) {
      try {
        return JSON.parse(parameter);
      } catch {
      }
    }
  }
  return parameter;
};
var QUESTION_MARKER = "_Q_";
var QUESTION_MARKER_REGEX = new RegExp(QUESTION_MARKER, "g");
var QUESTION_MATCH_REGEX = /\?/;
var QUESTION_MATCH_REGEX_GLOBAL = /\?/g;
function createKyselyLogger(options = {}) {
  const {
    enable = "error",
    logger = console.log,
    merge,
    logQueryNode
  } = options;
  return (event) => {
    if (!enable || typeof enable === "string" && event.level !== enable) {
      return;
    }
    const {
      level,
      queryDurationMillis,
      query: { parameters, sql: sql2, query }
    } = event;
    const err = level === "error" ? event.error : void 0;
    let _sql2 = sql2.replace(/\r?\n/g, " ").replace(/\s+/g, " ");
    if (merge) {
      for (let param2 of parameters) {
        if (param2 instanceof Date) {
          param2 = param2.toLocaleString();
        }
        if (typeof param2 === "string") {
          param2 = `'${param2}'`.replace(QUESTION_MATCH_REGEX_GLOBAL, QUESTION_MARKER);
        }
        _sql2 = _sql2.replace(QUESTION_MATCH_REGEX, param2);
      }
    }
    const param = {
      sql: _sql2.replace(QUESTION_MARKER_REGEX, "?"),
      params: parameters,
      duration: Math.round(queryDurationMillis * 100) / 100,
      error: err
    };
    if (logQueryNode) {
      param.queryNode = query;
    }
    logger(param);
  };
}
async function savePoint(db, name) {
  const _name = name?.toUpperCase() || `SP_${Date.now() % 1e12}_${Math.floor(Math.random() * 1e4)}`;
  await sql`SAVEPOINT ${sql.raw(_name)}`.execute(db);
  return {
    release: async () => {
      await sql`RELEASE SAVEPOINT ${sql.raw(_name)}`.execute(db);
    },
    rollback: async () => {
      await sql`ROLLBACK TO SAVEPOINT ${sql.raw(_name)}`.execute(db);
    }
  };
}
var IntegrityError = class extends Error {
  constructor() {
    super("DB file maybe corrupted");
  }
};
var BaseSqliteBuilder = class {
  constructor(options) {
    __publicField(this, "trxCount", 0);
    __publicField(this, "ky");
    __publicField(this, "trx");
    __publicField(this, "log");
    const {
      dialect: dialect2,
      logger,
      onQuery,
      plugins = []
    } = options;
    this.log = logger;
    plugins.push(new BaseSerializePlugin(defaultSerializer, defaultDeserializer, []));
    let log;
    if (onQuery === true) {
      log = createKyselyLogger({
        logger: this.log?.debug || console.log,
        merge: true
      });
    } else if (onQuery) {
      log = createKyselyLogger(onQuery);
    }
    this.ky = new Kysely({ dialect: dialect2, log, plugins });
  }
  /**
   * Current kysely / transaction instance
   */
  get kysely() {
    return this.trx || this.ky;
  }
  /**
   * sync db schema
   * @param updater sync table function, built-in: {@link useSchema}, {@link useMigrator}
   * @param checkIntegrity whether to check integrity
   * @example
   * import { useSchema } from 'kysely-sqlite-builder/schema'
   * import { useMigrator } from 'kysely-sqlite-builder/migrator'
   * import { createCodeProvider } from 'kysely-sqlite-builder/migrator'
   *
   * // update tables using schema
   * await db.syncDB(useSchema(Schema, { logger: false }))
   *
   * // update tables using MigrationProvider and migrate to latest
   * await db.syncDB(useMigrator(createCodeProvider(...)))
   */
  async syncDB(updater, checkIntegrity2) {
    try {
      if (checkIntegrity2 && !await checkIntegrity(this.ky)) {
        this.log?.error("Integrity check fail");
        return { ready: false, error: new IntegrityError() };
      }
      const result = await updater(this.ky, this.log);
      this.log?.info("Sync completed");
      return result;
    } catch (error) {
      this.logError(error, "Unknown error while syncing");
      return {
        ready: false,
        error
      };
    }
  }
  logError(e, errorMsg) {
    if (errorMsg) {
      this.log?.error(errorMsg, e instanceof Error ? e : new Error(String(e)));
    }
  }
  /**
   * Run in transaction, support nest call (using `savepoint`)
   * @example
   * db.transaction(async (trx) => {
   *   // auto load transaction
   *   await db.insertInto('test').values({ gender: true }).execute()
   *   // or
   *   await trx.insertInto('test').values({ person: { name: 'test' }, gender: true }).execute()
   *   db.transaction(async () => {
   *     // nest transaction, use savepoint
   *     await db.selectFrom('test').where('gender', '=', true).execute()
   *   })
   * })
   */
  async transaction(fn, options = {}) {
    if (!this.trx) {
      return await this.ky.transaction().execute(async (trx) => {
        this.trx = trx;
        this.log?.debug("Run in transaction");
        return await fn(trx);
      }).then(async (result) => {
        await options.onCommit?.(result);
        return result;
      }).catch(async (e) => {
        await options.onRollback?.(e);
        this.logError(e, options.errorMsg);
        return void 0;
      }).finally(() => this.trx = void 0);
    }
    this.trxCount++;
    const sp = `SP_${this.trxCount}`;
    this.log?.debug(`Run in savepoint: ${sp}`);
    const { release, rollback } = await savePoint(this.kysely, sp);
    return await fn(this.kysely).then(async (result) => {
      await release();
      await options.onCommit?.(result);
      return result;
    }).catch(async (e) => {
      await rollback();
      await options.onRollback?.(e);
      this.logError(e, options.errorMsg);
      return void 0;
    }).finally(() => this.trxCount--);
  }
  async execute(data, parameters) {
    if (data.as) {
      return await data.execute(this.kysely);
    }
    return await executeSQL(this.kysely, data, parameters);
  }
  /**
   * Destroy db connection
   */
  async destroy() {
    this.log?.info("Destroyed");
    await this.ky.destroy();
    this.trx = void 0;
  }
};
var SqliteBuilder = class extends BaseSqliteBuilder {
  constructor() {
    super(...arguments);
    __publicField(this, "insertInto", (tb) => this.kysely.insertInto(tb));
    __publicField(this, "replaceInto", (tb) => this.kysely.replaceInto(tb));
    __publicField(this, "selectFrom", (tb) => this.kysely.selectFrom(tb));
    __publicField(this, "updateTable", (tb) => this.kysely.updateTable(tb));
    /**
     * Creates a delete query.
     *
     * See the {@link DeleteQueryBuilder.where} method for examples on how to specify
     * a where clause for the delete operation.
     *
     * The return value of the query is an instance of {@link DeleteResult}.
     *
     * ### Examples
     *
     * <!-- siteExample("delete", "Single row", 10) -->
     *
     * Delete a single row:
     *
     * ```ts
     * const result = await db
     *   .deleteFrom('person')
     *   .where('person.id', '=', '1')
     *   .executeTakeFirst()
     *
     * console.log(result.numDeletedRows)
     * ```
     *
     * The generated SQL (SQLite):
     *
     * ```sql
     * delete from "person" where "person"."id" = $1
     * ```
     */
    __publicField(this, "deleteFrom", (tb) => this.kysely.deleteFrom(tb));
  }
};
var DataType = {
  increments: 0,
  int: 1,
  float: 2,
  string: 3,
  blob: 4,
  object: 5,
  boolean: 6,
  date: 7
};
var TGRC = "_TC_";
var TGRU = "_TU_";
function defineTable(options) {
  const { columns, ...rest } = options;
  const { updateAt, createAt, softDelete } = rest;
  if (createAt) {
    columns[createAt === true ? "createAt" : createAt] = { type: DataType.date, defaultTo: TGRC };
  }
  if (updateAt) {
    columns[updateAt === true ? "updateAt" : updateAt] = { type: DataType.date, defaultTo: TGRU };
  }
  if (softDelete) {
    columns[softDelete === true ? "isDeleted" : softDelete] = { type: DataType.int, defaultTo: 0 };
  }
  return {
    ...rest,
    columns
  };
}
function parse(type, options) {
  const data = { type, ...options };
  return { ...data, $cast: () => data };
}
var column = {
  /**
   * Column type: INTEGER AUTO INCREMENT
   */
  increments: () => ({ type: DataType.increments }),
  /**
   * Column type: INTEGER
   */
  int: (options) => parse(DataType.int, options),
  /**
   * Column type: REAL
   */
  float: (options) => parse(DataType.float, options),
  /**
   * Column type: text
   */
  string: (options) => parse(DataType.string, options),
  /**
   * Column type: BLOB
   */
  blob: (options) => parse(DataType.blob, options),
  /**
   * Column type: INTEGER
   */
  boolean: (options) => parse(DataType.boolean, options),
  /**
   * Column type: TEXT (serialize with `JSON.parse` and `JSON.stringify`)
   */
  date: (options) => parse(DataType.date, options),
  /**
   * Column type: TEXT (serialize with `JSON.parse` and `JSON.stringify`)
   */
  object: (options) => parse(DataType.object, options)
};
async function parseTable(db, tableName, hasAutoIncrement) {
  const result = {
    columns: {},
    primary: [],
    unique: [],
    index: [],
    trigger: []
  };
  const cols = (await sql`SELECT "name", "type", "notnull", "dflt_value", "pk" FROM PRAGMA_TABLE_INFO(${tableName})`.execute(db)).rows;
  for (const { dflt_value, name, notnull, pk, type } of cols) {
    result.columns[name] = {
      type,
      notNull: !!notnull,
      defaultTo: dflt_value
    };
    if (pk !== 0) {
      if (hasAutoIncrement && pk === 1 && type === "INTEGER") {
        result.increment = name;
      }
      result.primary.push(name);
    }
  }
  const indexes = (await sql`SELECT "origin", (SELECT GROUP_CONCAT(name) FROM PRAGMA_INDEX_INFO(i.name)) as "columns" FROM PRAGMA_INDEX_LIST(${tableName}) as i WHERE "origin" != 'pk'`.execute(db)).rows;
  for (const { columns, origin } of indexes) {
    result[origin === "u" ? "unique" : "index"].push(
      columns.split(",").map((c) => c.trim())
    );
  }
  return result;
}
async function parseExistSchema(db, prefix = []) {
  const extraColumns = prefix.length ? ` AND ${prefix.map((t) => `"name" NOT LIKE '${t}%'`).join(" AND ")}` : "";
  const tables2 = (await sql`SELECT "type", "tbl_name" AS "table", CASE WHEN "sql" LIKE '%PRIMARY KEY AUTOINCREMENT%' THEN 1 ELSE "name" END AS "name" FROM "sqlite_master" WHERE "type" IN ('table', 'trigger') AND "name" NOT LIKE 'SQLITE_%'${sql.raw(extraColumns)} ORDER BY "type"`.execute(db)).rows;
  const tableMap = {};
  for (const { name, table, type } of tables2) {
    if (type === "table") {
      tableMap[table] = await parseTable(db, table, name === 1);
    } else {
      tableMap[table].trigger.push(name);
    }
  }
  return tableMap;
}
function parseColumnType(type) {
  let dataType;
  let isIncrements = false;
  switch (type) {
    case DataType.float:
      dataType = "REAL";
      break;
    case DataType.increments:
      isIncrements = true;
    // eslint-disable-next-line no-fallthrough
    case DataType.boolean:
    case DataType.int:
      dataType = "INTEGER";
      break;
    case DataType.blob:
      dataType = "BLOB";
      break;
    // date, object, string or other
    default:
      dataType = "TEXT";
  }
  return [dataType, isIncrements];
}
function asArray(arr) {
  return Array.isArray(arr) ? arr : [arr];
}
function parseArray(arr) {
  const columns = asArray(arr);
  let key = "";
  let columnList = "";
  for (const c of columns) {
    key += `_${c}`;
    columnList += `"${c}",`;
  }
  return [columnList.slice(0, -1), key, columns[0]];
}
function parseDefaultValue(trx, defaultTo) {
  if (defaultTo === void 0 || defaultTo === null) {
    return "";
  }
  if (defaultTo === TGRC || defaultTo === TGRU) {
    return "CURRENT_TIMESTAMP";
  }
  let _defaultTo = defaultTo.isRawBuilder ? defaultTo.compile(trx).sql : defaultSerializer(defaultTo);
  _defaultTo = typeof _defaultTo === "string" ? `'${_defaultTo}'` : _defaultTo;
  return _defaultTo !== void 0 ? String(_defaultTo) : "";
}
function parseDefaultValueWithPrefix(trx, defaultTo) {
  const result = parseDefaultValue(trx, defaultTo);
  return result ? ` DEFAULT ${result}` : "";
}
function dropTable(tableName) {
  return `DROP TABLE IF EXISTS "${tableName}";`;
}
function createTableWithIndexAndTrigger(trx, tableName, table) {
  const { index, ...props } = table;
  const result = [];
  const [sql3, updateColumn, triggerColumn] = createTable(trx, tableName, props);
  result.push(sql3, ...createTableIndex(tableName, index));
  const triggerSql = createTimeTrigger(tableName, updateColumn, triggerColumn);
  if (triggerSql) {
    result.push(triggerSql);
  }
  return result;
}
function createTableIndex(tableName, index = []) {
  return index.map((i) => {
    const [columnListStr, key] = parseArray(i);
    return `CREATE INDEX IF NOT EXISTS idx_${tableName + key} on "${tableName}" (${columnListStr});`;
  });
}
function createTable(trx, tableName, { columns, primary, unique, withoutRowId }) {
  let updateColumn;
  let triggerColumn;
  const columnList = [];
  for (const [columnName, columnProperty] of Object.entries(columns)) {
    const { type, notNull, defaultTo } = columnProperty;
    const [dataType, isIncrements] = parseColumnType(type);
    if (isIncrements) {
      if (withoutRowId) {
        throw new Error(`Cannot setup AUTOINCREMENT column "${columnName}" in table "${tableName}" without rowid `);
      }
      if (triggerColumn) {
        throw new Error(`Multiple AUTOINCREMENT columns (${triggerColumn}, ${columnName}) in table ${tableName}`);
      }
      triggerColumn = columnName;
      columnList.push(`"${columnName}" ${dataType} PRIMARY KEY AUTOINCREMENT`);
    } else {
      if (defaultTo === TGRU) {
        updateColumn = columnName;
      }
      columnList.push(`"${columnName}" ${dataType}${notNull ? " NOT NULL" : ""}${parseDefaultValueWithPrefix(trx, defaultTo)}`);
    }
  }
  if (primary) {
    const [targetColumns, key, first] = parseArray(primary);
    if (!triggerColumn) {
      columnList.push(`PRIMARY KEY (${targetColumns})`);
      triggerColumn = first;
    } else if (triggerColumn !== key.substring(1)) {
      throw new Error(`Exists AUTOINCREMENT column "${triggerColumn}" in table "${tableName}", cannot setup extra primary key (${targetColumns})`);
    }
  } else if (withoutRowId) {
    throw new Error(`No primary key in table "${tableName}" and "withoutRowId" setup`);
  }
  if (unique) {
    for (const uk of unique) {
      columnList.push(`UNIQUE (${parseArray(uk)[0]})`);
    }
  }
  const rowIdClause = withoutRowId ? " WITHOUT ROWID" : "";
  return [
    `CREATE TABLE IF NOT EXISTS "${tableName}" (${columnList})${rowIdClause};`,
    updateColumn,
    triggerColumn || "rowid"
  ];
}
function createTimeTrigger(tableName, updateColumn, triggerColumn) {
  if (!updateColumn || !triggerColumn) {
    return;
  }
  const triggerName = `tgr_${tableName}_${updateColumn}`;
  return `CREATE TRIGGER IF NOT EXISTS "${triggerName}" AFTER UPDATE ON "${tableName}" BEGIN UPDATE "${tableName}" SET "${updateColumn}" = CURRENT_TIMESTAMP WHERE "${triggerColumn}" = NEW."${triggerColumn}"; END;`;
}
function renameTable(tableName, newTableName) {
  return `ALTER TABLE "${tableName}" RENAME TO "${newTableName}";`;
}
function addColumn(trx, tableName, columnName, columnProperty) {
  const { type, notNull, defaultTo } = columnProperty;
  const [dataType] = parseColumnType(type);
  return `ALTER TABLE "${tableName}" ADD COLUMN "${columnName}" ${dataType}${notNull ? " NOT NULL" : ""}${parseDefaultValueWithPrefix(trx, defaultTo)};`;
}
function dropColumn(tableName, columnName) {
  return `ALTER TABLE "${tableName}" DROP COLUMN "${columnName}";`;
}
function createIndex(tableName, columns) {
  const [columnListStr, indexSuffix] = parseArray(columns);
  return `CREATE INDEX IF NOT EXISTS "idx_${tableName}${indexSuffix}" on "${tableName}"(${columnListStr});`;
}
function dropIndex(tableName, columns) {
  const [, indexSuffix] = parseArray(columns);
  return `DROP INDEX IF EXISTS "idx_${tableName}${indexSuffix}";`;
}
function dropTrigger(triggerName) {
  return `DROP TRIGGER IF EXISTS "${triggerName}";`;
}
function migrateWholeTable(trx, tableName, restoreColumnList, targetTable) {
  const result = [];
  const tempTableName = `_temp_${tableName}`;
  const [sql3, updateColumn, triggerColumn] = createTable(trx, tempTableName, targetTable);
  result.push(sql3);
  if (restoreColumnList.length) {
    let cols = "";
    let values = "";
    for (const [name, selectSQL] of restoreColumnList) {
      cols += `,"${name}"`;
      values += `,${selectSQL}`;
    }
    result.push(`INSERT INTO "${tempTableName}" (${cols.substring(1)}) SELECT ${values.substring(1)} FROM "${tableName}";`);
  }
  result.push(dropTable(tableName));
  result.push(renameTable(tempTableName, tableName));
  result.push(...createTableIndex(tableName, targetTable.index));
  const triggerSql = createTimeTrigger(tableName, updateColumn, triggerColumn);
  if (triggerSql) {
    result.push(triggerSql);
  }
  return result;
}
async function syncTables(db, targetSchema, options = {}, logger) {
  const {
    truncateIfExists = [],
    log,
    version: { current, skipSyncWhenSame } = {},
    excludeTablePrefix,
    onSuccess,
    onError,
    fallback
  } = options;
  let oldVersion;
  if (current) {
    oldVersion = await getOrSetDBVersion(db);
    if (skipSyncWhenSame && current === oldVersion) {
      return { ready: true };
    }
    await getOrSetDBVersion(db, current);
  }
  const debug = (e) => log && logger?.debug(e);
  debug("Sync tables start");
  const existSchema = await parseExistSchema(db, excludeTablePrefix);
  let i = 0;
  let sqls = [];
  try {
    sqls = generateSyncTableSQL(
      db,
      existSchema,
      targetSchema,
      truncateIfExists,
      debug,
      fallback
    );
  } catch (e) {
    await onError?.(e, void 0, existSchema, targetSchema);
    debug(`Sync failed, ${e}`);
    return { ready: false, error: e };
  }
  return await db.transaction().execute(async (trx) => {
    for (; i < sqls.length; i++) {
      await executeSQL(trx, sqls[i]);
    }
  }).then(async () => {
    await onSuccess?.(db, existSchema, oldVersion);
    debug("Sync success");
    return { ready: true };
  }).catch(async (e) => {
    await onError?.(e, sqls[i], existSchema, targetSchema);
    debug(`Sync failed, ${e}`);
    return { ready: false, error: e };
  });
}
var defaultFallbackFunction = ({ target }) => target.parsedType === "TEXT" ? sql`'0'` : sql`0`;
function generateSyncTableSQL(db, existSchema, targetSchema, truncateIfExists = [], debug = () => {
}, fallback = defaultFallbackFunction) {
  const existTableMap = new Map(Object.entries(existSchema));
  const targetSchemaMap = new Map(Object.entries(targetSchema));
  const truncateTableSet = new Set(
    Array.isArray(truncateIfExists) ? truncateIfExists : truncateIfExists ? existTableMap.keys() : []
  );
  const sqls = [];
  for (const [existTableName, existTable] of existTableMap) {
    if (targetSchemaMap.has(existTableName)) {
      const targetTable = targetSchemaMap.get(existTableName);
      if (truncateTableSet.has(existTableName)) {
        debug(`- Update table "${existTableName}" and truncate`);
        sqls.push(dropTable(existTableName));
        sqls.push(...createTableWithIndexAndTrigger(db, existTableName, targetTable));
      } else {
        debug(`- Update table "${existTableName}"`);
        sqls.push(...updateTable(db, existTableName, existTable, targetTable, fallback));
      }
    } else {
      debug(`- Delete table "${existTableName}"`);
      sqls.push(dropTable(existTableName));
    }
  }
  for (const [targetTableName, targetTable] of targetSchemaMap) {
    if (!existTableMap.has(targetTableName)) {
      debug(`- Create table "${targetTableName}"`);
      sqls.push(...createTableWithIndexAndTrigger(db, targetTableName, targetTable));
    }
  }
  return sqls;
}
function updateTable(trx, tableName, existTable, targetTable, migrateColumn) {
  const targetColumnMap = new Map(Object.entries(targetTable.columns));
  const existColumnMap = new Map(Object.entries(existTable.columns));
  const insertColumnList = [];
  const updateColumnList = [];
  const deleteColumnList = [];
  let updateTimeColumn;
  let autoIncrementColumn;
  let isChanged = false;
  for (const [name, { type, defaultTo, notNull }] of targetColumnMap) {
    const existColumnInfo = existColumnMap.get(name);
    const parsedTargetColumn = {
      type,
      parsedType: parseColumnType(type)[0],
      defaultTo: parseDefaultValue(trx, defaultTo) || null,
      notNull: !!notNull
    };
    const getFallbackValue = () => migrateColumn({
      column: name,
      exist: existColumnInfo,
      target: parsedTargetColumn,
      table: tableName
    }).compile(trx).sql;
    if (defaultTo === TGRU) {
      updateTimeColumn = name;
    }
    if (type === DataType.increments) {
      if (autoIncrementColumn) {
        throw new Error(`Multiple AUTOINCREMENT columns (${autoIncrementColumn}, ${name}) in table ${tableName}`);
      }
      autoIncrementColumn = name;
    }
    if (existColumnInfo) {
      if (existColumnInfo.type === parsedTargetColumn.parsedType && existColumnInfo.notNull === parsedTargetColumn.notNull && existColumnInfo.defaultTo === parsedTargetColumn.defaultTo) {
        updateColumnList.push([name, `"${name}"`]);
      } else {
        isChanged = true;
        updateColumnList.push([
          name,
          // exist column already not null,
          // or new table column is nullable,
          // so no need to set fallback value
          existColumnInfo.notNull || !notNull ? `"${name}"` : `IFNULL(CAST("${name}" AS ${parsedTargetColumn.parsedType}),${getFallbackValue()})`
        ]);
      }
    } else {
      insertColumnList.push(name);
      if (notNull && !defaultTo) {
        isChanged = true;
        updateColumnList.push([name, getFallbackValue()]);
      }
    }
  }
  for (const [name] of existColumnMap) {
    if (!targetColumnMap.has(name)) {
      deleteColumnList.push(name);
    }
  }
  if (isChanged || isPrimaryKeyChanged(existTable.primary, targetTable.primary || autoIncrementColumn) || isUniqueChanged(existTable.unique, targetTable.unique) || targetTable.withoutRowId) {
    return migrateWholeTable(trx, tableName, updateColumnList, targetTable);
  }
  const result = [
    ...insertColumnList.map((col) => addColumn(trx, tableName, col, targetColumnMap.get(col))),
    // no need to handle drop column on unique / primary key
    // because in this case, `isChanged` will be true
    ...deleteColumnList.map((col) => dropColumn(tableName, col))
  ];
  const [insertIndexList, deleteIndexList] = parseChangedList(existTable.index, targetTable.index || []);
  result.push(
    ...insertIndexList.map((colList) => createIndex(tableName, colList)),
    ...deleteIndexList.map((colList) => dropIndex(tableName, colList))
  );
  const existTrigger = existTable.trigger[0];
  if (existTrigger !== `tgr_${tableName}_${updateTimeColumn}`) {
    if (existTrigger) {
      result.splice(0, 0, dropTrigger(existTrigger));
    }
    if (updateTimeColumn) {
      result.push(createTimeTrigger(tableName, updateTimeColumn, asArray(targetTable.primary)[0] || autoIncrementColumn));
    }
  }
  return result;
}
function isPrimaryKeyChanged(existPK, targetPK) {
  if (!targetPK) {
    return existPK.length > 0;
  }
  if (!Array.isArray(targetPK)) {
    targetPK = [targetPK];
  }
  if (existPK.length !== targetPK.length) {
    return true;
  }
  return existPK.some((v2, i) => v2 !== targetPK[i]);
}
function isUniqueChanged(existUnique, targetUnique) {
  if (!targetUnique) {
    return existUnique.length > 0;
  }
  const [insertUniqueList, deleteUniqueList] = parseChangedList(existUnique, targetUnique);
  return insertUniqueList.length > 0 || deleteUniqueList.length > 0;
}
function parseChangedList(existIndexList, targetIndexList) {
  const existSet = new Set(existIndexList.map((arr) => arr.join("|")));
  const targetSet = /* @__PURE__ */ new Set();
  const addList = [];
  for (const index of targetIndexList) {
    const hash = Array.isArray(index) ? index.join("|") : index;
    targetSet.add(hash);
    if (!existSet.has(hash)) {
      addList.push(Array.isArray(index) ? index : [index]);
    }
  }
  const delList = existIndexList.filter((index) => !targetSet.has(index.join("|")));
  return [addList, delList];
}
function useSchema(schema, options = {}) {
  return async (db, logger) => await syncTables(
    db,
    schema,
    options,
    options.log ? logger : void 0
  );
}
const tables = {
  test: defineTable({
    columns: {
      id: column.increments(),
      name: column.string(),
      blobtest: column.blob()
    },
    createAt: true,
    updateAt: true
  })
};
async function testDB(dialect2) {
  const db = new SqliteBuilder({
    dialect: dialect2
    // onQuery: true,
  });
  const result = await db.syncDB(useSchema(tables));
  if (!result.ready) {
    throw result.error;
  }
  console.log(await db.execute(`PRAGMA table_info('test')`));
  for (let i = 0; i < 10; i++) {
    await db.transaction(async () => {
      await db.transaction(async () => {
        if (i > 8) {
          console.log("test rollback");
          throw new Error("test rollback");
        }
        await db.insertInto("test").values({
          name: `test at ${Date.now()}`,
          blobtest: Uint8Array.from([2, 3, 4, 5, 6, 7, 8])
        }).execute();
      });
    });
  }
  try {
    for await (const v2 of db.selectFrom("test").selectAll().stream(2)) {
      console.log("Stream Query", v2);
    }
  } catch (error) {
    console.warn(error);
  }
  return db.selectFrom("test").selectAll().execute().then(async (data) => {
    await db.destroy();
    console.log(data);
    return data;
  });
}
const dialect = new OfficialWasmDialect({
  database: async () => {
    const sqlite3 = (await sqlite3InitModule$1()).oo1;
    if (!sqlite3) {
      return Promise.reject("fail to load sqlite");
    }
    const path = "/test.db";
    if (sqlite3.OpfsDb) {
      console.log("support OPFS");
      return new sqlite3.OpfsDb(path);
    }
    console.log("doesn't support OPFS");
    return new sqlite3.DB(path);
  }
});
onmessage = () => {
  console.log("start official wasm test");
  testDB(dialect).then((data) => {
    data?.forEach((e) => console.log("[official wasm]", e));
  });
};
