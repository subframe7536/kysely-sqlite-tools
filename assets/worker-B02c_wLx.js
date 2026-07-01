import { A as __exportAll, C as init_assertClassBrand, D as init_defineProperty, E as _defineProperty, O as __commonJSMin, S as _assertClassBrand, T as init_classPrivateMethodInitSpec, _ as init_classPrivateFieldSet2, b as _classPrivateFieldInitSpec, g as _classPrivateFieldSet2, h as init_FacadeVFS_XQtZprLW, j as __toCommonJS, k as __esmMin, n as SQLITE_DETERMINISTIC$1, r as SQLITE_DIRECTONLY$1, t as FacadeVFS, v as _classPrivateFieldGet2, w as _classPrivateMethodInitSpec, x as init_classPrivateFieldInitSpec, y as init_classPrivateFieldGet2 } from "./FacadeVFS-XQtZprLW-0G3Zn85o.js";
//#region ../node_modules/.pnpm/@subframe7536+sqlite-wasm@1.3.0/node_modules/@subframe7536/sqlite-wasm/dist/wa-sqlite-DfKPyFeY.js
var Module;
var init_wa_sqlite_DfKPyFeY = __esmMin((() => {
	init_defineProperty();
	Module = (() => {
		return (async function(moduleArg = {}) {
			var moduleRtn;
			var Module = moduleArg;
			var readyPromiseResolve, readyPromiseReject;
			var readyPromise = new Promise((resolve, reject) => {
				readyPromiseResolve = resolve;
				readyPromiseReject = reject;
			});
			var ENVIRONMENT_IS_WEB = typeof window == "object";
			var ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope != "undefined";
			typeof process == "object" && process.versions?.node && process.type;
			var thisProgram = "./this.program";
			var quit_ = (status, toThrow) => {
				throw toThrow;
			};
			var _scriptName = import.meta.url;
			var scriptDirectory = "";
			function locateFile(path) {
				if (Module["locateFile"]) return Module["locateFile"](path, scriptDirectory);
				return scriptDirectory + path;
			}
			var readAsync, readBinary;
			if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
				try {
					scriptDirectory = new URL(".", _scriptName).href;
				} catch {}
				if (ENVIRONMENT_IS_WORKER) readBinary = (url) => {
					var xhr = new XMLHttpRequest();
					xhr.open("GET", url, false);
					xhr.responseType = "arraybuffer";
					xhr.send(null);
					return new Uint8Array(xhr.response);
				};
				readAsync = async (url) => {
					var response = await fetch(url, { credentials: "same-origin" });
					if (response.ok) return response.arrayBuffer();
					throw new Error(response.status + " : " + response.url);
				};
			}
			var out = console.log.bind(console);
			var err = console.error.bind(console);
			var wasmBinary;
			var wasmMemory;
			var ABORT = false;
			var EXITSTATUS;
			var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
			function updateMemoryViews() {
				var b = wasmMemory.buffer;
				HEAP8 = new Int8Array(b);
				HEAP16 = new Int16Array(b);
				Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
				HEAPU16 = new Uint16Array(b);
				Module["HEAP32"] = HEAP32 = new Int32Array(b);
				HEAPU32 = new Uint32Array(b);
				HEAPF32 = new Float32Array(b);
				HEAPF64 = new Float64Array(b);
			}
			function preRun() {
				if (Module["preRun"]) {
					if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
					while (Module["preRun"].length) addOnPreRun(Module["preRun"].shift());
				}
				callRuntimeCallbacks(onPreRuns);
			}
			function initRuntime() {
				if (!Module["noFSInit"] && !FS.initialized) FS.init();
				TTY.init();
				wasmExports["qa"]();
				FS.ignorePermissions = false;
			}
			function postRun() {
				if (Module["postRun"]) {
					if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
					while (Module["postRun"].length) addOnPostRun(Module["postRun"].shift());
				}
				callRuntimeCallbacks(onPostRuns);
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
			var wasmBinaryFile;
			function findWasmBinary() {
				if (Module["locateFile"]) return locateFile("wa-sqlite.wasm");
				return new URL("" + new URL("wa-sqlite-CRP71yW3.wasm", import.meta.url).href, "" + import.meta.url).href;
			}
			function getBinarySync(file) {
				if (file == wasmBinaryFile && wasmBinary) return new Uint8Array(wasmBinary);
				if (readBinary) return readBinary(file);
				throw "both async and sync fetching of the wasm failed";
			}
			async function getWasmBinary(binaryFile) {
				if (!wasmBinary) try {
					var response = await readAsync(binaryFile);
					return new Uint8Array(response);
				} catch {}
				return getBinarySync(binaryFile);
			}
			async function instantiateArrayBuffer(binaryFile, imports) {
				try {
					var binary = await getWasmBinary(binaryFile);
					return await WebAssembly.instantiate(binary, imports);
				} catch (reason) {
					err(`failed to asynchronously prepare wasm: ${reason}`);
					abort(reason);
				}
			}
			async function instantiateAsync(binary, binaryFile, imports) {
				if (!binary && typeof WebAssembly.instantiateStreaming == "function") try {
					var response = fetch(binaryFile, { credentials: "same-origin" });
					return await WebAssembly.instantiateStreaming(response, imports);
				} catch (reason) {
					err(`wasm streaming compile failed: ${reason}`);
					err("falling back to ArrayBuffer instantiation");
				}
				return instantiateArrayBuffer(binaryFile, imports);
			}
			function getWasmImports() {
				return { a: wasmImports };
			}
			async function createWasm() {
				function receiveInstance(instance, module) {
					wasmExports = instance.exports;
					wasmMemory = wasmExports["pa"];
					updateMemoryViews();
					wasmTable = wasmExports["jf"];
					removeRunDependency("wasm-instantiate");
					return wasmExports;
				}
				addRunDependency("wasm-instantiate");
				function receiveInstantiationResult(result) {
					return receiveInstance(result["instance"]);
				}
				var info = getWasmImports();
				if (Module["instantiateWasm"]) return new Promise((resolve, reject) => {
					Module["instantiateWasm"](info, (mod, inst) => {
						resolve(receiveInstance(mod, inst));
					});
				});
				wasmBinaryFile ?? (wasmBinaryFile = findWasmBinary());
				try {
					return receiveInstantiationResult(await instantiateAsync(wasmBinary, wasmBinaryFile, info));
				} catch (e) {
					readyPromiseReject(e);
					return Promise.reject(e);
				}
			}
			var tempDouble;
			var tempI64;
			class ExitStatus {
				constructor(status) {
					_defineProperty(this, "name", "ExitStatus");
					this.message = `Program terminated with exit(${status})`;
					this.status = status;
				}
			}
			var callRuntimeCallbacks = (callbacks) => {
				while (callbacks.length > 0) callbacks.shift()(Module);
			};
			var onPostRuns = [];
			var addOnPostRun = (cb) => onPostRuns.push(cb);
			var onPreRuns = [];
			var addOnPreRun = (cb) => onPreRuns.push(cb);
			function getValue(ptr, type = "i8") {
				if (type.endsWith("*")) type = "*";
				switch (type) {
					case "i1": return HEAP8[ptr];
					case "i8": return HEAP8[ptr];
					case "i16": return HEAP16[ptr >> 1];
					case "i32": return HEAP32[ptr >> 2];
					case "i64": abort("to do getValue(i64) use WASM_BIGINT");
					case "float": return HEAPF32[ptr >> 2];
					case "double": return HEAPF64[ptr >> 3];
					case "*": return HEAPU32[ptr >> 2];
					default: abort(`invalid type for getValue: ${type}`);
				}
			}
			var noExitRuntime = true;
			function setValue(ptr, value, type = "i8") {
				if (type.endsWith("*")) type = "*";
				switch (type) {
					case "i1":
						HEAP8[ptr] = value;
						break;
					case "i8":
						HEAP8[ptr] = value;
						break;
					case "i16":
						HEAP16[ptr >> 1] = value;
						break;
					case "i32":
						HEAP32[ptr >> 2] = value;
						break;
					case "i64": abort("to do setValue(i64) use WASM_BIGINT");
					case "float":
						HEAPF32[ptr >> 2] = value;
						break;
					case "double":
						HEAPF64[ptr >> 3] = value;
						break;
					case "*":
						HEAPU32[ptr >> 2] = value;
						break;
					default: abort(`invalid type for setValue: ${type}`);
				}
			}
			var stackRestore = (val) => __emscripten_stack_restore(val);
			var stackSave = () => _emscripten_stack_get_current();
			var UTF8Decoder = new TextDecoder();
			var UTF8ToString = (ptr, maxBytesToRead) => {
				if (!ptr) return "";
				var maxPtr = ptr + maxBytesToRead;
				for (var end = ptr; !(end >= maxPtr) && HEAPU8[end];) ++end;
				return UTF8Decoder.decode(HEAPU8.subarray(ptr, end));
			};
			var ___assert_fail = (condition, filename, line, func) => abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [
				filename ? UTF8ToString(filename) : "unknown filename",
				line,
				func ? UTF8ToString(func) : "unknown function"
			]);
			var PATH = {
				isAbs: (path) => path.charAt(0) === "/",
				splitPath: (filename) => {
					return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(filename).slice(1);
				},
				normalizeArray: (parts, allowAboveRoot) => {
					var up = 0;
					for (var i = parts.length - 1; i >= 0; i--) {
						var last = parts[i];
						if (last === ".") parts.splice(i, 1);
						else if (last === "..") {
							parts.splice(i, 1);
							up++;
						} else if (up) {
							parts.splice(i, 1);
							up--;
						}
					}
					if (allowAboveRoot) for (; up; up--) parts.unshift("..");
					return parts;
				},
				normalize: (path) => {
					var isAbsolute = PATH.isAbs(path), trailingSlash = path.slice(-1) === "/";
					path = PATH.normalizeArray(path.split("/").filter((p) => !!p), !isAbsolute).join("/");
					if (!path && !isAbsolute) path = ".";
					if (path && trailingSlash) path += "/";
					return (isAbsolute ? "/" : "") + path;
				},
				dirname: (path) => {
					var result = PATH.splitPath(path), root = result[0], dir = result[1];
					if (!root && !dir) return ".";
					if (dir) dir = dir.slice(0, -1);
					return root + dir;
				},
				basename: (path) => path && path.match(/([^\/]+|\/)\/*$/)[1],
				join: (...paths) => PATH.normalize(paths.join("/")),
				join2: (l, r) => PATH.normalize(l + "/" + r)
			};
			var initRandomFill = () => (view) => crypto.getRandomValues(view);
			var randomFill = (view) => {
				(randomFill = initRandomFill())(view);
			};
			var PATH_FS = {
				resolve: (...args) => {
					var resolvedPath = "", resolvedAbsolute = false;
					for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
						var path = i >= 0 ? args[i] : FS.cwd();
						if (typeof path != "string") throw new TypeError("Arguments to path.resolve must be strings");
						else if (!path) return "";
						resolvedPath = path + "/" + resolvedPath;
						resolvedAbsolute = PATH.isAbs(path);
					}
					resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p) => !!p), !resolvedAbsolute).join("/");
					return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
				},
				relative: (from, to) => {
					from = PATH_FS.resolve(from).slice(1);
					to = PATH_FS.resolve(to).slice(1);
					function trim(arr) {
						var start = 0;
						for (; start < arr.length; start++) if (arr[start] !== "") break;
						var end = arr.length - 1;
						for (; end >= 0; end--) if (arr[end] !== "") break;
						if (start > end) return [];
						return arr.slice(start, end - start + 1);
					}
					var fromParts = trim(from.split("/"));
					var toParts = trim(to.split("/"));
					var length = Math.min(fromParts.length, toParts.length);
					var samePartsLength = length;
					for (var i = 0; i < length; i++) if (fromParts[i] !== toParts[i]) {
						samePartsLength = i;
						break;
					}
					var outputParts = [];
					for (var i = samePartsLength; i < fromParts.length; i++) outputParts.push("..");
					outputParts = outputParts.concat(toParts.slice(samePartsLength));
					return outputParts.join("/");
				}
			};
			var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
				var endIdx = idx + maxBytesToRead;
				var endPtr = idx;
				while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
				return UTF8Decoder.decode(heapOrArray.buffer ? heapOrArray.subarray(idx, endPtr) : new Uint8Array(heapOrArray.slice(idx, endPtr)));
			};
			var FS_stdin_getChar_buffer = [];
			var lengthBytesUTF8 = (str) => {
				var len = 0;
				for (var i = 0; i < str.length; ++i) {
					var c = str.charCodeAt(i);
					if (c <= 127) len++;
					else if (c <= 2047) len += 2;
					else if (c >= 55296 && c <= 57343) {
						len += 4;
						++i;
					} else len += 3;
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
			var intArrayFromString = (stringy, dontAddNull, length) => {
				var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
				var u8array = new Array(len);
				var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
				if (dontAddNull) u8array.length = numBytesWritten;
				return u8array;
			};
			var FS_stdin_getChar = () => {
				if (!FS_stdin_getChar_buffer.length) {
					var result = null;
					if (typeof window != "undefined" && typeof window.prompt == "function") {
						result = window.prompt("Input: ");
						if (result !== null) result += "\n";
					}
					if (!result) return null;
					FS_stdin_getChar_buffer = intArrayFromString(result, true);
				}
				return FS_stdin_getChar_buffer.shift();
			};
			var TTY = {
				ttys: [],
				init() {},
				shutdown() {},
				register(dev, ops) {
					TTY.ttys[dev] = {
						input: [],
						output: [],
						ops
					};
					FS.registerDevice(dev, TTY.stream_ops);
				},
				stream_ops: {
					open(stream) {
						var tty = TTY.ttys[stream.node.rdev];
						if (!tty) throw new FS.ErrnoError(43);
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
						if (!stream.tty || !stream.tty.ops.get_char) throw new FS.ErrnoError(60);
						var bytesRead = 0;
						for (var i = 0; i < length; i++) {
							var result;
							try {
								result = stream.tty.ops.get_char(stream.tty);
							} catch (e) {
								throw new FS.ErrnoError(29);
							}
							if (result === void 0 && bytesRead === 0) throw new FS.ErrnoError(6);
							if (result === null || result === void 0) break;
							bytesRead++;
							buffer[offset + i] = result;
						}
						if (bytesRead) stream.node.atime = Date.now();
						return bytesRead;
					},
					write(stream, buffer, offset, length, pos) {
						if (!stream.tty || !stream.tty.ops.put_char) throw new FS.ErrnoError(60);
						try {
							for (var i = 0; i < length; i++) stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
						} catch (e) {
							throw new FS.ErrnoError(29);
						}
						if (length) stream.node.mtime = stream.node.ctime = Date.now();
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
						} else if (val != 0) tty.output.push(val);
					},
					fsync(tty) {
						if (tty.output?.length > 0) {
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
						} else if (val != 0) tty.output.push(val);
					},
					fsync(tty) {
						if (tty.output?.length > 0) {
							err(UTF8ArrayToString(tty.output));
							tty.output = [];
						}
					}
				}
			};
			var zeroMemory = (ptr, size) => HEAPU8.fill(0, ptr, ptr + size);
			var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
			var mmapAlloc = (size) => {
				size = alignMemory(size, 65536);
				var ptr = _emscripten_builtin_memalign(65536, size);
				if (ptr) zeroMemory(ptr, size);
				return ptr;
			};
			var MEMFS = {
				ops_table: null,
				mount(mount) {
					return MEMFS.createNode(null, "/", 16895, 0);
				},
				createNode(parent, name, mode, dev) {
					if (FS.isBlkdev(mode) || FS.isFIFO(mode)) throw new FS.ErrnoError(63);
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
							stream: { llseek: MEMFS.stream_ops.llseek }
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
					node.atime = node.mtime = node.ctime = Date.now();
					if (parent) {
						parent.contents[name] = node;
						parent.atime = parent.mtime = parent.ctime = node.atime;
					}
					return node;
				},
				getFileDataAsTypedArray(node) {
					if (!node.contents) return /* @__PURE__ */ new Uint8Array(0);
					if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
					return new Uint8Array(node.contents);
				},
				expandFileStorage(node, newCapacity) {
					var prevCapacity = node.contents ? node.contents.length : 0;
					if (prevCapacity >= newCapacity) return;
					newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < 1024 * 1024 ? 2 : 1.125) >>> 0);
					if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
					var oldContents = node.contents;
					node.contents = new Uint8Array(newCapacity);
					if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
				},
				resizeFileStorage(node, newSize) {
					if (node.usedBytes == newSize) return;
					if (newSize == 0) {
						node.contents = null;
						node.usedBytes = 0;
					} else {
						var oldContents = node.contents;
						node.contents = new Uint8Array(newSize);
						if (oldContents) node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
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
						if (FS.isDir(node.mode)) attr.size = 4096;
						else if (FS.isFile(node.mode)) attr.size = node.usedBytes;
						else if (FS.isLink(node.mode)) attr.size = node.link.length;
						else attr.size = 0;
						attr.atime = new Date(node.atime);
						attr.mtime = new Date(node.mtime);
						attr.ctime = new Date(node.ctime);
						attr.blksize = 4096;
						attr.blocks = Math.ceil(attr.size / attr.blksize);
						return attr;
					},
					setattr(node, attr) {
						for (const key of [
							"mode",
							"atime",
							"mtime",
							"ctime"
						]) if (attr[key] != null) node[key] = attr[key];
						if (attr.size !== void 0) MEMFS.resizeFileStorage(node, attr.size);
					},
					lookup(parent, name) {
						throw MEMFS.doesNotExistError;
					},
					mknod(parent, name, mode, dev) {
						return MEMFS.createNode(parent, name, mode, dev);
					},
					rename(old_node, new_dir, new_name) {
						var new_node;
						try {
							new_node = FS.lookupNode(new_dir, new_name);
						} catch (e) {}
						if (new_node) {
							if (FS.isDir(old_node.mode)) for (var i in new_node.contents) throw new FS.ErrnoError(55);
							FS.hashRemoveNode(new_node);
						}
						delete old_node.parent.contents[old_node.name];
						new_dir.contents[new_name] = old_node;
						old_node.name = new_name;
						new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
					},
					unlink(parent, name) {
						delete parent.contents[name];
						parent.ctime = parent.mtime = Date.now();
					},
					rmdir(parent, name) {
						for (var i in FS.lookupNode(parent, name).contents) throw new FS.ErrnoError(55);
						delete parent.contents[name];
						parent.ctime = parent.mtime = Date.now();
					},
					readdir(node) {
						return [
							".",
							"..",
							...Object.keys(node.contents)
						];
					},
					symlink(parent, newname, oldpath) {
						var node = MEMFS.createNode(parent, newname, 41471, 0);
						node.link = oldpath;
						return node;
					},
					readlink(node) {
						if (!FS.isLink(node.mode)) throw new FS.ErrnoError(28);
						return node.link;
					}
				},
				stream_ops: {
					read(stream, buffer, offset, length, position) {
						var contents = stream.node.contents;
						if (position >= stream.node.usedBytes) return 0;
						var size = Math.min(stream.node.usedBytes - position, length);
						if (size > 8 && contents.subarray) buffer.set(contents.subarray(position, position + size), offset);
						else for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
						return size;
					},
					write(stream, buffer, offset, length, position, canOwn) {
						if (buffer.buffer === HEAP8.buffer) canOwn = false;
						if (!length) return 0;
						var node = stream.node;
						node.mtime = node.ctime = Date.now();
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
						if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position);
						else for (var i = 0; i < length; i++) node.contents[position + i] = buffer[offset + i];
						node.usedBytes = Math.max(node.usedBytes, position + length);
						return length;
					},
					llseek(stream, offset, whence) {
						var position = offset;
						if (whence === 1) position += stream.position;
						else if (whence === 2) {
							if (FS.isFile(stream.node.mode)) position += stream.node.usedBytes;
						}
						if (position < 0) throw new FS.ErrnoError(28);
						return position;
					},
					mmap(stream, length, position, prot, flags) {
						if (!FS.isFile(stream.node.mode)) throw new FS.ErrnoError(43);
						var ptr;
						var allocated;
						var contents = stream.node.contents;
						if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
							allocated = false;
							ptr = contents.byteOffset;
						} else {
							allocated = true;
							ptr = mmapAlloc(length);
							if (!ptr) throw new FS.ErrnoError(48);
							if (contents) {
								if (position > 0 || position + length < contents.length) if (contents.subarray) contents = contents.subarray(position, position + length);
								else contents = Array.prototype.slice.call(contents, position, position + length);
								HEAP8.set(contents, ptr);
							}
						}
						return {
							ptr,
							allocated
						};
					},
					msync(stream, buffer, offset, length, mmapFlags) {
						MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
						return 0;
					}
				}
			};
			var asyncLoad = async (url) => {
				var arrayBuffer = await readAsync(url);
				return new Uint8Array(arrayBuffer);
			};
			var FS_createDataFile = (...args) => FS.createDataFile(...args);
			var preloadPlugins = [];
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
				var dep = getUniqueRunDependency(`cp ${fullname}`);
				function processData(byteArray) {
					function finish(byteArray) {
						preFinish?.();
						if (!dontCreateFile) FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
						onload?.();
						removeRunDependency(dep);
					}
					if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
						onerror?.();
						removeRunDependency(dep);
					})) return;
					finish(byteArray);
				}
				addRunDependency(dep);
				if (typeof url == "string") asyncLoad(url).then(processData, onerror);
				else processData(url);
			};
			var FS_modeStringToFlags = (str) => {
				var flags = {
					r: 0,
					"r+": 2,
					w: 577,
					"w+": 578,
					a: 1089,
					"a+": 1090
				}[str];
				if (typeof flags == "undefined") throw new Error(`Unknown file open mode: ${str}`);
				return flags;
			};
			var FS_getMode = (canRead, canWrite) => {
				var mode = 0;
				if (canRead) mode |= 365;
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
				filesystems: null,
				syncFSRequests: 0,
				readFiles: {},
				ErrnoError: class {
					constructor(errno) {
						_defineProperty(this, "name", "ErrnoError");
						this.errno = errno;
					}
				},
				FSStream: class {
					constructor() {
						_defineProperty(this, "shared", {});
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
						_defineProperty(this, "node_ops", {});
						_defineProperty(this, "stream_ops", {});
						_defineProperty(this, "readMode", 365);
						_defineProperty(this, "writeMode", 146);
						_defineProperty(this, "mounted", null);
						if (!parent) parent = this;
						this.parent = parent;
						this.mount = parent.mount;
						this.id = FS.nextInode++;
						this.name = name;
						this.mode = mode;
						this.rdev = rdev;
						this.atime = this.mtime = this.ctime = Date.now();
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
					if (!path) throw new FS.ErrnoError(44);
					opts.follow_mount ?? (opts.follow_mount = true);
					if (!PATH.isAbs(path)) path = FS.cwd() + "/" + path;
					linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
						var parts = path.split("/").filter((p) => !!p);
						var current = FS.root;
						var current_path = "/";
						for (var i = 0; i < parts.length; i++) {
							var islast = i === parts.length - 1;
							if (islast && opts.parent) break;
							if (parts[i] === ".") continue;
							if (parts[i] === "..") {
								current_path = PATH.dirname(current_path);
								if (FS.isRoot(current)) {
									path = current_path + "/" + parts.slice(i + 1).join("/");
									continue linkloop;
								} else current = current.parent;
								continue;
							}
							current_path = PATH.join2(current_path, parts[i]);
							try {
								current = FS.lookupNode(current, parts[i]);
							} catch (e) {
								if (e?.errno === 44 && islast && opts.noent_okay) return { path: current_path };
								throw e;
							}
							if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) current = current.mounted.root;
							if (FS.isLink(current.mode) && (!islast || opts.follow)) {
								if (!current.node_ops.readlink) throw new FS.ErrnoError(52);
								var link = current.node_ops.readlink(current);
								if (!PATH.isAbs(link)) link = PATH.dirname(current_path) + "/" + link;
								path = link + "/" + parts.slice(i + 1).join("/");
								continue linkloop;
							}
						}
						return {
							path: current_path,
							node: current
						};
					}
					throw new FS.ErrnoError(32);
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
					for (var i = 0; i < name.length; i++) hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
					return (parentid + hash >>> 0) % FS.nameTable.length;
				},
				hashAddNode(node) {
					var hash = FS.hashName(node.parent.id, node.name);
					node.name_next = FS.nameTable[hash];
					FS.nameTable[hash] = node;
				},
				hashRemoveNode(node) {
					var hash = FS.hashName(node.parent.id, node.name);
					if (FS.nameTable[hash] === node) FS.nameTable[hash] = node.name_next;
					else {
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
					if (errCode) throw new FS.ErrnoError(errCode);
					var hash = FS.hashName(parent.id, name);
					for (var node = FS.nameTable[hash]; node; node = node.name_next) {
						var nodeName = node.name;
						if (node.parent.id === parent.id && nodeName === name) return node;
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
					var perms = [
						"r",
						"w",
						"rw"
					][flag & 3];
					if (flag & 512) perms += "w";
					return perms;
				},
				nodePermissions(node, perms) {
					if (FS.ignorePermissions) return 0;
					if (perms.includes("r") && !(node.mode & 292)) return 2;
					else if (perms.includes("w") && !(node.mode & 146)) return 2;
					else if (perms.includes("x") && !(node.mode & 73)) return 2;
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
					if (!FS.isDir(dir.mode)) return 54;
					try {
						FS.lookupNode(dir, name);
						return 20;
					} catch (e) {}
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
					if (errCode) return errCode;
					if (isdir) {
						if (!FS.isDir(node.mode)) return 54;
						if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) return 10;
					} else if (FS.isDir(node.mode)) return 31;
					return 0;
				},
				mayOpen(node, flags) {
					if (!node) return 44;
					if (FS.isLink(node.mode)) return 32;
					else if (FS.isDir(node.mode)) {
						if (FS.flagsToPermissionString(flags) !== "r" || flags & 576) return 31;
					}
					return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
				},
				checkOpExists(op, err) {
					if (!op) throw new FS.ErrnoError(err);
					return op;
				},
				MAX_OPEN_FDS: 4096,
				nextfd() {
					for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) if (!FS.streams[fd]) return fd;
					throw new FS.ErrnoError(33);
				},
				getStreamChecked(fd) {
					var stream = FS.getStream(fd);
					if (!stream) throw new FS.ErrnoError(8);
					return stream;
				},
				getStream: (fd) => FS.streams[fd],
				createStream(stream, fd = -1) {
					stream = Object.assign(new FS.FSStream(), stream);
					if (fd == -1) fd = FS.nextfd();
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
				doSetAttr(stream, node, attr) {
					var setattr = stream?.stream_ops.setattr;
					var arg = setattr ? stream : node;
					setattr ?? (setattr = node.node_ops.setattr);
					FS.checkOpExists(setattr, 63);
					setattr(arg, attr);
				},
				chrdev_stream_ops: {
					open(stream) {
						stream.stream_ops = FS.getDevice(stream.node.rdev).stream_ops;
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
					if (FS.syncFSRequests > 1) err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
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
						if (++completed >= mounts.length) doCallback(null);
					}
					mounts.forEach((mount) => {
						if (!mount.type.syncfs) return done(null);
						mount.type.syncfs(mount, populate, done);
					});
				},
				mount(type, opts, mountpoint) {
					var root = mountpoint === "/";
					var pseudo = !mountpoint;
					var node;
					if (root && FS.root) throw new FS.ErrnoError(10);
					else if (!root && !pseudo) {
						var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
						mountpoint = lookup.path;
						node = lookup.node;
						if (FS.isMountpoint(node)) throw new FS.ErrnoError(10);
						if (!FS.isDir(node.mode)) throw new FS.ErrnoError(54);
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
					if (root) FS.root = mountRoot;
					else if (node) {
						node.mounted = mount;
						if (node.mount) node.mount.mounts.push(mount);
					}
					return mountRoot;
				},
				unmount(mountpoint) {
					var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
					if (!FS.isMountpoint(lookup.node)) throw new FS.ErrnoError(28);
					var node = lookup.node;
					var mount = node.mounted;
					var mounts = FS.getMounts(mount);
					Object.keys(FS.nameTable).forEach((hash) => {
						var current = FS.nameTable[hash];
						while (current) {
							var next = current.name_next;
							if (mounts.includes(current.mount)) FS.destroyNode(current);
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
					var parent = FS.lookupPath(path, { parent: true }).node;
					var name = PATH.basename(path);
					if (!name) throw new FS.ErrnoError(28);
					if (name === "." || name === "..") throw new FS.ErrnoError(20);
					var errCode = FS.mayCreate(parent, name);
					if (errCode) throw new FS.ErrnoError(errCode);
					if (!parent.node_ops.mknod) throw new FS.ErrnoError(63);
					return parent.node_ops.mknod(parent, name, mode, dev);
				},
				statfs(path) {
					return FS.statfsNode(FS.lookupPath(path, { follow: true }).node);
				},
				statfsStream(stream) {
					return FS.statfsNode(stream.node);
				},
				statfsNode(node) {
					var rtn = {
						bsize: 4096,
						frsize: 4096,
						blocks: 1e6,
						bfree: 5e5,
						bavail: 5e5,
						files: FS.nextInode,
						ffree: FS.nextInode - 1,
						fsid: 42,
						flags: 2,
						namelen: 255
					};
					if (node.node_ops.statfs) Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
					return rtn;
				},
				create(path, mode = 438) {
					mode &= 4095;
					mode |= 32768;
					return FS.mknod(path, mode, 0);
				},
				mkdir(path, mode = 511) {
					mode &= 1023;
					mode |= 16384;
					return FS.mknod(path, mode, 0);
				},
				mkdirTree(path, mode) {
					var dirs = path.split("/");
					var d = "";
					for (var dir of dirs) {
						if (!dir) continue;
						if (d || PATH.isAbs(path)) d += "/";
						d += dir;
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
					if (!PATH_FS.resolve(oldpath)) throw new FS.ErrnoError(44);
					var parent = FS.lookupPath(newpath, { parent: true }).node;
					if (!parent) throw new FS.ErrnoError(44);
					var newname = PATH.basename(newpath);
					var errCode = FS.mayCreate(parent, newname);
					if (errCode) throw new FS.ErrnoError(errCode);
					if (!parent.node_ops.symlink) throw new FS.ErrnoError(63);
					return parent.node_ops.symlink(parent, newname, oldpath);
				},
				rename(old_path, new_path) {
					var old_dirname = PATH.dirname(old_path);
					var new_dirname = PATH.dirname(new_path);
					var old_name = PATH.basename(old_path);
					var new_name = PATH.basename(new_path);
					var lookup = FS.lookupPath(old_path, { parent: true }), old_dir = lookup.node, new_dir;
					lookup = FS.lookupPath(new_path, { parent: true });
					new_dir = lookup.node;
					if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
					if (old_dir.mount !== new_dir.mount) throw new FS.ErrnoError(75);
					var old_node = FS.lookupNode(old_dir, old_name);
					var relative = PATH_FS.relative(old_path, new_dirname);
					if (relative.charAt(0) !== ".") throw new FS.ErrnoError(28);
					relative = PATH_FS.relative(new_path, old_dirname);
					if (relative.charAt(0) !== ".") throw new FS.ErrnoError(55);
					var new_node;
					try {
						new_node = FS.lookupNode(new_dir, new_name);
					} catch (e) {}
					if (old_node === new_node) return;
					var isdir = FS.isDir(old_node.mode);
					var errCode = FS.mayDelete(old_dir, old_name, isdir);
					if (errCode) throw new FS.ErrnoError(errCode);
					errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
					if (errCode) throw new FS.ErrnoError(errCode);
					if (!old_dir.node_ops.rename) throw new FS.ErrnoError(63);
					if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) throw new FS.ErrnoError(10);
					if (new_dir !== old_dir) {
						errCode = FS.nodePermissions(old_dir, "w");
						if (errCode) throw new FS.ErrnoError(errCode);
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
					var parent = FS.lookupPath(path, { parent: true }).node;
					var name = PATH.basename(path);
					var node = FS.lookupNode(parent, name);
					var errCode = FS.mayDelete(parent, name, true);
					if (errCode) throw new FS.ErrnoError(errCode);
					if (!parent.node_ops.rmdir) throw new FS.ErrnoError(63);
					if (FS.isMountpoint(node)) throw new FS.ErrnoError(10);
					parent.node_ops.rmdir(parent, name);
					FS.destroyNode(node);
				},
				readdir(path) {
					var node = FS.lookupPath(path, { follow: true }).node;
					return FS.checkOpExists(node.node_ops.readdir, 54)(node);
				},
				unlink(path) {
					var parent = FS.lookupPath(path, { parent: true }).node;
					if (!parent) throw new FS.ErrnoError(44);
					var name = PATH.basename(path);
					var node = FS.lookupNode(parent, name);
					var errCode = FS.mayDelete(parent, name, false);
					if (errCode) throw new FS.ErrnoError(errCode);
					if (!parent.node_ops.unlink) throw new FS.ErrnoError(63);
					if (FS.isMountpoint(node)) throw new FS.ErrnoError(10);
					parent.node_ops.unlink(parent, name);
					FS.destroyNode(node);
				},
				readlink(path) {
					var link = FS.lookupPath(path).node;
					if (!link) throw new FS.ErrnoError(44);
					if (!link.node_ops.readlink) throw new FS.ErrnoError(28);
					return link.node_ops.readlink(link);
				},
				stat(path, dontFollow) {
					var node = FS.lookupPath(path, { follow: !dontFollow }).node;
					return FS.checkOpExists(node.node_ops.getattr, 63)(node);
				},
				fstat(fd) {
					var stream = FS.getStreamChecked(fd);
					var node = stream.node;
					var getattr = stream.stream_ops.getattr;
					var arg = getattr ? stream : node;
					getattr ?? (getattr = node.node_ops.getattr);
					FS.checkOpExists(getattr, 63);
					return getattr(arg);
				},
				lstat(path) {
					return FS.stat(path, true);
				},
				doChmod(stream, node, mode, dontFollow) {
					FS.doSetAttr(stream, node, {
						mode: mode & 4095 | node.mode & -4096,
						ctime: Date.now(),
						dontFollow
					});
				},
				chmod(path, mode, dontFollow) {
					var node;
					if (typeof path == "string") node = FS.lookupPath(path, { follow: !dontFollow }).node;
					else node = path;
					FS.doChmod(null, node, mode, dontFollow);
				},
				lchmod(path, mode) {
					FS.chmod(path, mode, true);
				},
				fchmod(fd, mode) {
					var stream = FS.getStreamChecked(fd);
					FS.doChmod(stream, stream.node, mode, false);
				},
				doChown(stream, node, dontFollow) {
					FS.doSetAttr(stream, node, {
						timestamp: Date.now(),
						dontFollow
					});
				},
				chown(path, uid, gid, dontFollow) {
					var node;
					if (typeof path == "string") node = FS.lookupPath(path, { follow: !dontFollow }).node;
					else node = path;
					FS.doChown(null, node, dontFollow);
				},
				lchown(path, uid, gid) {
					FS.chown(path, uid, gid, true);
				},
				fchown(fd, uid, gid) {
					var stream = FS.getStreamChecked(fd);
					FS.doChown(stream, stream.node, false);
				},
				doTruncate(stream, node, len) {
					if (FS.isDir(node.mode)) throw new FS.ErrnoError(31);
					if (!FS.isFile(node.mode)) throw new FS.ErrnoError(28);
					var errCode = FS.nodePermissions(node, "w");
					if (errCode) throw new FS.ErrnoError(errCode);
					FS.doSetAttr(stream, node, {
						size: len,
						timestamp: Date.now()
					});
				},
				truncate(path, len) {
					if (len < 0) throw new FS.ErrnoError(28);
					var node;
					if (typeof path == "string") node = FS.lookupPath(path, { follow: true }).node;
					else node = path;
					FS.doTruncate(null, node, len);
				},
				ftruncate(fd, len) {
					var stream = FS.getStreamChecked(fd);
					if (len < 0 || (stream.flags & 2097155) === 0) throw new FS.ErrnoError(28);
					FS.doTruncate(stream, stream.node, len);
				},
				utime(path, atime, mtime) {
					var node = FS.lookupPath(path, { follow: true }).node;
					FS.checkOpExists(node.node_ops.setattr, 63)(node, {
						atime,
						mtime
					});
				},
				open(path, flags, mode = 438) {
					if (path === "") throw new FS.ErrnoError(44);
					flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
					if (flags & 64) mode = mode & 4095 | 32768;
					else mode = 0;
					var node;
					var isDirPath;
					if (typeof path == "object") node = path;
					else {
						isDirPath = path.endsWith("/");
						var lookup = FS.lookupPath(path, {
							follow: !(flags & 131072),
							noent_okay: true
						});
						node = lookup.node;
						path = lookup.path;
					}
					var created = false;
					if (flags & 64) if (node) {
						if (flags & 128) throw new FS.ErrnoError(20);
					} else if (isDirPath) throw new FS.ErrnoError(31);
					else {
						node = FS.mknod(path, mode | 511, 0);
						created = true;
					}
					if (!node) throw new FS.ErrnoError(44);
					if (FS.isChrdev(node.mode)) flags &= -513;
					if (flags & 65536 && !FS.isDir(node.mode)) throw new FS.ErrnoError(54);
					if (!created) {
						var errCode = FS.mayOpen(node, flags);
						if (errCode) throw new FS.ErrnoError(errCode);
					}
					if (flags & 512 && !created) FS.truncate(node, 0);
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
					if (stream.stream_ops.open) stream.stream_ops.open(stream);
					if (created) FS.chmod(node, mode & 511);
					if (Module["logReadFiles"] && !(flags & 1)) {
						if (!(path in FS.readFiles)) FS.readFiles[path] = 1;
					}
					return stream;
				},
				close(stream) {
					if (FS.isClosed(stream)) throw new FS.ErrnoError(8);
					if (stream.getdents) stream.getdents = null;
					try {
						if (stream.stream_ops.close) stream.stream_ops.close(stream);
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
					if (FS.isClosed(stream)) throw new FS.ErrnoError(8);
					if (!stream.seekable || !stream.stream_ops.llseek) throw new FS.ErrnoError(70);
					if (whence != 0 && whence != 1 && whence != 2) throw new FS.ErrnoError(28);
					stream.position = stream.stream_ops.llseek(stream, offset, whence);
					stream.ungotten = [];
					return stream.position;
				},
				read(stream, buffer, offset, length, position) {
					if (length < 0 || position < 0) throw new FS.ErrnoError(28);
					if (FS.isClosed(stream)) throw new FS.ErrnoError(8);
					if ((stream.flags & 2097155) === 1) throw new FS.ErrnoError(8);
					if (FS.isDir(stream.node.mode)) throw new FS.ErrnoError(31);
					if (!stream.stream_ops.read) throw new FS.ErrnoError(28);
					var seeking = typeof position != "undefined";
					if (!seeking) position = stream.position;
					else if (!stream.seekable) throw new FS.ErrnoError(70);
					var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
					if (!seeking) stream.position += bytesRead;
					return bytesRead;
				},
				write(stream, buffer, offset, length, position, canOwn) {
					if (length < 0 || position < 0) throw new FS.ErrnoError(28);
					if (FS.isClosed(stream)) throw new FS.ErrnoError(8);
					if ((stream.flags & 2097155) === 0) throw new FS.ErrnoError(8);
					if (FS.isDir(stream.node.mode)) throw new FS.ErrnoError(31);
					if (!stream.stream_ops.write) throw new FS.ErrnoError(28);
					if (stream.seekable && stream.flags & 1024) FS.llseek(stream, 0, 2);
					var seeking = typeof position != "undefined";
					if (!seeking) position = stream.position;
					else if (!stream.seekable) throw new FS.ErrnoError(70);
					var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
					if (!seeking) stream.position += bytesWritten;
					return bytesWritten;
				},
				mmap(stream, length, position, prot, flags) {
					if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) throw new FS.ErrnoError(2);
					if ((stream.flags & 2097155) === 1) throw new FS.ErrnoError(2);
					if (!stream.stream_ops.mmap) throw new FS.ErrnoError(43);
					if (!length) throw new FS.ErrnoError(28);
					return stream.stream_ops.mmap(stream, length, position, prot, flags);
				},
				msync(stream, buffer, offset, length, mmapFlags) {
					if (!stream.stream_ops.msync) return 0;
					return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
				},
				ioctl(stream, cmd, arg) {
					if (!stream.stream_ops.ioctl) throw new FS.ErrnoError(59);
					return stream.stream_ops.ioctl(stream, cmd, arg);
				},
				readFile(path, opts = {}) {
					opts.flags = opts.flags || 0;
					opts.encoding = opts.encoding || "binary";
					if (opts.encoding !== "utf8" && opts.encoding !== "binary") throw new Error(`Invalid encoding type "${opts.encoding}"`);
					var ret;
					var stream = FS.open(path, opts.flags);
					var length = FS.stat(path).size;
					var buf = new Uint8Array(length);
					FS.read(stream, buf, 0, length, 0);
					if (opts.encoding === "utf8") ret = UTF8ArrayToString(buf);
					else if (opts.encoding === "binary") ret = buf;
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
					} else if (ArrayBuffer.isView(data)) FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
					else throw new Error("Unsupported data type");
					FS.close(stream);
				},
				cwd: () => FS.currentPath,
				chdir(path) {
					var lookup = FS.lookupPath(path, { follow: true });
					if (lookup.node === null) throw new FS.ErrnoError(44);
					if (!FS.isDir(lookup.node.mode)) throw new FS.ErrnoError(54);
					var errCode = FS.nodePermissions(lookup.node, "x");
					if (errCode) throw new FS.ErrnoError(errCode);
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
						write: (stream, buffer, offset, length, pos) => length,
						llseek: () => 0
					});
					FS.mkdev("/dev/null", FS.makedev(1, 3));
					TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
					TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
					FS.mkdev("/dev/tty", FS.makedev(5, 0));
					FS.mkdev("/dev/tty1", FS.makedev(6, 0));
					var randomBuffer = /* @__PURE__ */ new Uint8Array(1024), randomLeft = 0;
					var randomByte = () => {
						if (randomLeft === 0) {
							randomFill(randomBuffer);
							randomLeft = randomBuffer.byteLength;
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
					FS.mount({ mount() {
						var node = FS.createNode(proc_self, "fd", 16895, 73);
						node.stream_ops = { llseek: MEMFS.stream_ops.llseek };
						node.node_ops = {
							lookup(parent, name) {
								var fd = +name;
								var stream = FS.getStreamChecked(fd);
								var ret = {
									parent: null,
									mount: { mountpoint: "fake" },
									node_ops: { readlink: () => stream.path },
									id: fd + 1
								};
								ret.parent = ret;
								return ret;
							},
							readdir() {
								return Array.from(FS.streams.entries()).filter(([k, v]) => v).map(([k, v]) => k.toString());
							}
						};
						return node;
					} }, {}, "/proc/self/fd");
				},
				createStandardStreams(input, output, error) {
					if (input) FS.createDevice("/dev", "stdin", input);
					else FS.symlink("/dev/tty", "/dev/stdin");
					if (output) FS.createDevice("/dev", "stdout", null, output);
					else FS.symlink("/dev/tty", "/dev/stdout");
					if (error) FS.createDevice("/dev", "stderr", null, error);
					else FS.symlink("/dev/tty1", "/dev/stderr");
					FS.open("/dev/stdin", 0);
					FS.open("/dev/stdout", 1);
					FS.open("/dev/stderr", 1);
				},
				staticInit() {
					FS.nameTable = new Array(4096);
					FS.mount(MEMFS, {}, "/");
					FS.createDefaultDirectories();
					FS.createDefaultDevices();
					FS.createSpecialDirectories();
					FS.filesystems = { MEMFS };
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
					for (var stream of FS.streams) if (stream) FS.close(stream);
				},
				findObject(path, dontResolveLastLink) {
					var ret = FS.analyzePath(path, dontResolveLastLink);
					if (!ret.exists) return null;
					return ret.object;
				},
				analyzePath(path, dontResolveLastLink) {
					try {
						var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
						path = lookup.path;
					} catch (e) {}
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
							if (e.errno != 20) throw e;
						}
						parent = current;
					}
					return current;
				},
				createFile(parent, name, properties, canRead, canWrite) {
					var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
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
							for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
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
					var _FS$createDevice;
					var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
					var mode = FS_getMode(!!input, !!output);
					(_FS$createDevice = FS.createDevice).major ?? (_FS$createDevice.major = 64);
					var dev = FS.makedev(FS.createDevice.major++, 0);
					FS.registerDevice(dev, {
						open(stream) {
							stream.seekable = false;
						},
						close(stream) {
							if (output?.buffer?.length) output(10);
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
								if (result === void 0 && bytesRead === 0) throw new FS.ErrnoError(6);
								if (result === null || result === void 0) break;
								bytesRead++;
								buffer[offset + i] = result;
							}
							if (bytesRead) stream.node.atime = Date.now();
							return bytesRead;
						},
						write(stream, buffer, offset, length, pos) {
							for (var i = 0; i < length; i++) try {
								output(buffer[offset + i]);
							} catch (e) {
								throw new FS.ErrnoError(29);
							}
							if (length) stream.node.mtime = stream.node.ctime = Date.now();
							return i;
						}
					});
					return FS.mkdev(path, mode, dev);
				},
				forceLoadFile(obj) {
					if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
					if (typeof XMLHttpRequest != "undefined") throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
					else try {
						obj.contents = readBinary(obj.url);
						obj.usedBytes = obj.contents.length;
					} catch (e) {
						throw new FS.ErrnoError(29);
					}
				},
				createLazyFile(parent, name, url, canRead, canWrite) {
					class LazyUint8Array {
						constructor() {
							_defineProperty(this, "lengthKnown", false);
							_defineProperty(this, "chunks", []);
						}
						get(idx) {
							if (idx > this.length - 1 || idx < 0) return;
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
								var xhr = new XMLHttpRequest();
								xhr.open("GET", url, false);
								if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
								xhr.responseType = "arraybuffer";
								if (xhr.overrideMimeType) xhr.overrideMimeType("text/plain; charset=x-user-defined");
								xhr.send(null);
								if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
								if (xhr.response !== void 0) return new Uint8Array(xhr.response || []);
								return intArrayFromString(xhr.responseText || "", true);
							};
							var lazyArray = this;
							lazyArray.setDataGetter((chunkNum) => {
								var start = chunkNum * chunkSize;
								var end = (chunkNum + 1) * chunkSize - 1;
								end = Math.min(end, datalength - 1);
								if (typeof lazyArray.chunks[chunkNum] == "undefined") lazyArray.chunks[chunkNum] = doXHR(start, end);
								if (typeof lazyArray.chunks[chunkNum] == "undefined") throw new Error("doXHR failed!");
								return lazyArray.chunks[chunkNum];
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
						}
						get length() {
							if (!this.lengthKnown) this.cacheLength();
							return this._length;
						}
						get chunkSize() {
							if (!this.lengthKnown) this.cacheLength();
							return this._chunkSize;
						}
					}
					if (typeof XMLHttpRequest != "undefined") {
						if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
						var properties = {
							isDevice: false,
							contents: new LazyUint8Array()
						};
					} else var properties = {
						isDevice: false,
						url
					};
					var node = FS.createFile(parent, name, properties, canRead, canWrite);
					if (properties.contents) node.contents = properties.contents;
					else if (properties.url) {
						node.contents = null;
						node.url = properties.url;
					}
					Object.defineProperties(node, { usedBytes: { get: function() {
						return this.contents.length;
					} } });
					var stream_ops = {};
					Object.keys(node.stream_ops).forEach((key) => {
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
						if (contents.slice) for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
						else for (var i = 0; i < size; i++) buffer[offset + i] = contents.get(position + i);
						return size;
					}
					stream_ops.read = (stream, buffer, offset, length, position) => {
						FS.forceLoadFile(node);
						return writeChunks(stream, buffer, offset, length, position);
					};
					stream_ops.mmap = (stream, length, position, prot, flags) => {
						FS.forceLoadFile(node);
						var ptr = mmapAlloc(length);
						if (!ptr) throw new FS.ErrnoError(48);
						writeChunks(stream, HEAP8, ptr, length, position);
						return {
							ptr,
							allocated: true
						};
					};
					node.stream_ops = stream_ops;
					return node;
				}
			};
			var SYSCALLS = {
				DEFAULT_POLLMASK: 5,
				calculateAt(dirfd, path, allowEmpty) {
					if (PATH.isAbs(path)) return path;
					var dir;
					if (dirfd === -100) dir = FS.cwd();
					else dir = SYSCALLS.getStreamFromFD(dirfd).path;
					if (path.length == 0) {
						if (!allowEmpty) throw new FS.ErrnoError(44);
						return dir;
					}
					return dir + "/" + path;
				},
				writeStat(buf, stat) {
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
					HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3 * 1e3;
					tempI64 = [Math.floor(mtime / 1e3) >>> 0, (tempDouble = Math.floor(mtime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 56 >> 2] = tempI64[0], HEAP32[buf + 60 >> 2] = tempI64[1];
					HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3 * 1e3;
					tempI64 = [Math.floor(ctime / 1e3) >>> 0, (tempDouble = Math.floor(ctime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 72 >> 2] = tempI64[0], HEAP32[buf + 76 >> 2] = tempI64[1];
					HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3 * 1e3;
					tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 88 >> 2] = tempI64[0], HEAP32[buf + 92 >> 2] = tempI64[1];
					return 0;
				},
				writeStatFs(buf, stats) {
					HEAP32[buf + 4 >> 2] = stats.bsize;
					HEAP32[buf + 40 >> 2] = stats.bsize;
					HEAP32[buf + 8 >> 2] = stats.blocks;
					HEAP32[buf + 12 >> 2] = stats.bfree;
					HEAP32[buf + 16 >> 2] = stats.bavail;
					HEAP32[buf + 20 >> 2] = stats.files;
					HEAP32[buf + 24 >> 2] = stats.ffree;
					HEAP32[buf + 28 >> 2] = stats.fsid;
					HEAP32[buf + 44 >> 2] = stats.flags;
					HEAP32[buf + 36 >> 2] = stats.namelen;
				},
				doMsync(addr, stream, len, flags, offset) {
					if (!FS.isFile(stream.node.mode)) throw new FS.ErrnoError(43);
					if (flags & 2) return 0;
					var buffer = HEAPU8.slice(addr, addr + len);
					FS.msync(stream, buffer, offset, len, flags);
				},
				getStreamFromFD(fd) {
					return FS.getStreamChecked(fd);
				},
				varargs: void 0,
				getStr(ptr) {
					return UTF8ToString(ptr);
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
					if (amode & -8) return -28;
					var node = FS.lookupPath(path, { follow: true }).node;
					if (!node) return -44;
					var perms = "";
					if (amode & 4) perms += "r";
					if (amode & 2) perms += "w";
					if (amode & 1) perms += "x";
					if (perms && FS.nodePermissions(node, perms)) return -2;
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
			var syscallGetVarargI = () => {
				var ret = HEAP32[+SYSCALLS.varargs >> 2];
				SYSCALLS.varargs += 4;
				return ret;
			};
			var syscallGetVarargP = syscallGetVarargI;
			function ___syscall_fcntl64(fd, cmd, varargs) {
				SYSCALLS.varargs = varargs;
				try {
					var stream = SYSCALLS.getStreamFromFD(fd);
					switch (cmd) {
						case 0:
							var arg = syscallGetVarargI();
							if (arg < 0) return -28;
							while (FS.streams[arg]) arg++;
							return FS.dupStream(stream, arg).fd;
						case 1:
						case 2: return 0;
						case 3: return stream.flags;
						case 4:
							var arg = syscallGetVarargI();
							stream.flags |= arg;
							return 0;
						case 12:
							var arg = syscallGetVarargP();
							var offset = 0;
							HEAP16[arg + offset >> 1] = 2;
							return 0;
						case 13:
						case 14: return 0;
					}
					return -28;
				} catch (e) {
					if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
					return -e.errno;
				}
			}
			function ___syscall_fstat64(fd, buf) {
				try {
					return SYSCALLS.writeStat(buf, FS.fstat(fd));
				} catch (e) {
					if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
					return -e.errno;
				}
			}
			var convertI32PairToI53Checked = (lo, hi) => hi + 2097152 >>> 0 < 4194305 - !!lo ? (lo >>> 0) + hi * 4294967296 : NaN;
			function ___syscall_ftruncate64(fd, length_low, length_high) {
				var length = convertI32PairToI53Checked(length_low, length_high);
				try {
					if (isNaN(length)) return -61;
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
					return SYSCALLS.writeStat(buf, FS.lstat(path));
				} catch (e) {
					if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
					return -e.errno;
				}
			}
			function ___syscall_mkdirat(dirfd, path, mode) {
				try {
					path = SYSCALLS.getStr(path);
					path = SYSCALLS.calculateAt(dirfd, path);
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
					flags = flags & -6401;
					path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
					return SYSCALLS.writeStat(buf, nofollow ? FS.lstat(path) : FS.stat(path));
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
					return SYSCALLS.writeStat(buf, FS.stat(path));
				} catch (e) {
					if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
					return -e.errno;
				}
			}
			function ___syscall_unlinkat(dirfd, path, flags) {
				try {
					path = SYSCALLS.getStr(path);
					path = SYSCALLS.calculateAt(dirfd, path);
					if (!flags) FS.unlink(path);
					else if (flags === 512) FS.rmdir(path);
					else return -28;
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
					var now = Date.now(), atime, mtime;
					if (!times) {
						atime = now;
						mtime = now;
					} else {
						var seconds = readI53FromI64(times);
						var nanoseconds = HEAP32[times + 8 >> 2];
						if (nanoseconds == 1073741823) atime = now;
						else if (nanoseconds == 1073741822) atime = null;
						else atime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
						times += 16;
						seconds = readI53FromI64(times);
						nanoseconds = HEAP32[times + 8 >> 2];
						if (nanoseconds == 1073741823) mtime = now;
						else if (nanoseconds == 1073741822) mtime = null;
						else mtime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
					}
					if ((mtime ?? atime) !== null) FS.utime(path, atime, mtime);
					return 0;
				} catch (e) {
					if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
					return -e.errno;
				}
			}
			var __abort_js = () => abort("");
			var runtimeKeepaliveCounter = 0;
			var __emscripten_runtime_keepalive_clear = () => {
				noExitRuntime = false;
				runtimeKeepaliveCounter = 0;
			};
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
				return (isLeapYear(date.getFullYear()) ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE)[date.getMonth()] + date.getDate() - 1;
			};
			function __localtime_js(time_low, time_high, tmPtr) {
				var time = convertI32PairToI53Checked(time_low, time_high);
				var date = /* @__PURE__ */ new Date(time * 1e3);
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
					var stream = SYSCALLS.getStreamFromFD(fd);
					if (prot & 2) SYSCALLS.doMsync(addr, stream, len, flags, offset);
				} catch (e) {
					if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
					return -e.errno;
				}
			}
			var timers = {};
			var handleException = (e) => {
				if (e instanceof ExitStatus || e == "unwind") return EXITSTATUS;
				quit_(1, e);
			};
			var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
			var _proc_exit = (code) => {
				EXITSTATUS = code;
				if (!keepRuntimeAlive()) {
					Module["onExit"]?.(code);
					ABORT = true;
				}
				quit_(code, new ExitStatus(code));
			};
			var exitJS = (status, implicit) => {
				EXITSTATUS = status;
				_proc_exit(status);
			};
			var _exit = exitJS;
			var maybeExit = () => {
				if (!keepRuntimeAlive()) try {
					_exit(EXITSTATUS);
				} catch (e) {
					handleException(e);
				}
			};
			var callUserCallback = (func) => {
				if (ABORT) return;
				try {
					func();
					maybeExit();
				} catch (e) {
					handleException(e);
				}
			};
			var _emscripten_get_now = () => performance.now();
			var __setitimer_js = (which, timeout_ms) => {
				if (timers[which]) {
					clearTimeout(timers[which].id);
					delete timers[which];
				}
				if (!timeout_ms) return 0;
				timers[which] = {
					id: setTimeout(() => {
						delete timers[which];
						callUserCallback(() => __emscripten_timeout(which, _emscripten_get_now()));
					}, timeout_ms),
					timeout_ms
				};
				return 0;
			};
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
					return `UTC${sign}${String(Math.floor(absOffset / 60)).padStart(2, "0")}${String(absOffset % 60).padStart(2, "0")}`;
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
			var getHeapMax = () => 2147483648;
			var growMemory = (size) => {
				var pages = (size - wasmMemory.buffer.byteLength + 65535) / 65536 | 0;
				try {
					wasmMemory.grow(pages);
					updateMemoryViews();
					return 1;
				} catch (e) {}
			};
			var _emscripten_resize_heap = (requestedSize) => {
				var oldSize = HEAPU8.length;
				requestedSize >>>= 0;
				var maxHeapSize = getHeapMax();
				if (requestedSize > maxHeapSize) return false;
				for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
					var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
					overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
					if (growMemory(Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536)))) return true;
				}
				return false;
			};
			var ENV = {};
			var getExecutableName = () => thisProgram || "./this.program";
			var getEnvStrings = () => {
				if (!getEnvStrings.strings) {
					var env = {
						USER: "web_user",
						LOGNAME: "web_user",
						PATH: "/",
						PWD: "/",
						HOME: "/home/web_user",
						LANG: (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
						_: getExecutableName()
					};
					for (var x in ENV) if (ENV[x] === void 0) delete env[x];
					else env[x] = ENV[x];
					var strings = [];
					for (var x in env) strings.push(`${x}=${env[x]}`);
					getEnvStrings.strings = strings;
				}
				return getEnvStrings.strings;
			};
			var _environ_get = (__environ, environ_buf) => {
				var bufSize = 0;
				var envp = 0;
				for (var string of getEnvStrings()) {
					var ptr = environ_buf + bufSize;
					HEAPU32[__environ + envp >> 2] = ptr;
					bufSize += stringToUTF8(string, ptr, Infinity) + 1;
					envp += 4;
				}
				return 0;
			};
			var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
				var strings = getEnvStrings();
				HEAPU32[penviron_count >> 2] = strings.length;
				var bufSize = 0;
				for (var string of strings) bufSize += lengthBytesUTF8(string) + 1;
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
					var stream = SYSCALLS.getStreamFromFD(fd);
					var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4;
					HEAP8[pbuf] = type;
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
					if (typeof offset != "undefined") offset += curr;
				}
				return ret;
			};
			function _fd_read(fd, iov, iovcnt, pnum) {
				try {
					var num = doReadv(SYSCALLS.getStreamFromFD(fd), iov, iovcnt);
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
					if (stream.stream_ops?.fsync) return stream.stream_ops.fsync(stream);
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
					if (curr < len) break;
					if (typeof offset != "undefined") offset += curr;
				}
				return ret;
			};
			function _fd_write(fd, iov, iovcnt, pnum) {
				try {
					var num = doWritev(SYSCALLS.getStreamFromFD(fd), iov, iovcnt);
					HEAPU32[pnum >> 2] = num;
					return 0;
				} catch (e) {
					if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
					return e.errno;
				}
			}
			var adapters_support = function() {
				const handleAsync = typeof Asyncify === "object" ? Asyncify.handleAsync.bind(Asyncify) : null;
				Module["handleAsync"] = handleAsync;
				const targets = /* @__PURE__ */ new Map();
				Module["setCallback"] = (key, target) => targets.set(key, target);
				Module["getCallback"] = (key) => targets.get(key);
				Module["deleteCallback"] = (key) => targets.delete(key);
				adapters_support = function(isAsync, key, ...args) {
					const receiver = targets.get(key);
					let methodName = null;
					const f = typeof receiver === "function" ? receiver : receiver[methodName = UTF8ToString(args.shift())];
					if (isAsync) {
						if (handleAsync) return handleAsync(() => f.apply(receiver, args));
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
			function _vppippii(...args) {
				return adapters_support(false, ...args);
			}
			function _vppippii_async(...args) {
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
			var uleb128Encode = (n, target) => {
				if (n < 128) target.push(n);
				else target.push(n % 128 | 128, n >> 7);
			};
			var sigToWasmTypes = (sig) => {
				var typeNames = {
					i: "i32",
					j: "i64",
					f: "f32",
					d: "f64",
					e: "externref",
					p: "i32"
				};
				var type = {
					parameters: [],
					results: sig[0] == "v" ? [] : [typeNames[sig[0]]]
				};
				for (var i = 1; i < sig.length; ++i) type.parameters.push(typeNames[sig[i]]);
				return type;
			};
			var generateFuncType = (sig, target) => {
				var sigRet = sig.slice(0, 1);
				var sigParam = sig.slice(1);
				var typeCodes = {
					i: 127,
					p: 127,
					j: 126,
					f: 125,
					d: 124,
					e: 111
				};
				target.push(96);
				uleb128Encode(sigParam.length, target);
				for (var paramType of sigParam) target.push(typeCodes[paramType]);
				if (sigRet == "v") target.push(0);
				else target.push(1, typeCodes[sigRet]);
			};
			var convertJsFunctionToWasm = (func, sig) => {
				if (typeof WebAssembly.Function == "function") return new WebAssembly.Function(sigToWasmTypes(sig), func);
				var typeSectionBody = [1];
				generateFuncType(sig, typeSectionBody);
				var bytes = [
					0,
					97,
					115,
					109,
					1,
					0,
					0,
					0,
					1
				];
				uleb128Encode(typeSectionBody.length, bytes);
				bytes.push(...typeSectionBody);
				bytes.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
				var module = new WebAssembly.Module(new Uint8Array(bytes));
				return new WebAssembly.Instance(module, { e: { f: func } }).exports["f"];
			};
			var wasmTable;
			var getWasmTableEntry = (funcPtr) => wasmTable.get(funcPtr);
			var updateTableMap = (offset, count) => {
				if (functionsInTableMap) for (var i = offset; i < offset + count; i++) {
					var item = getWasmTableEntry(i);
					if (item) functionsInTableMap.set(item, i);
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
				if (freeTableIndexes.length) return freeTableIndexes.pop();
				try {
					wasmTable.grow(1);
				} catch (err) {
					if (!(err instanceof RangeError)) throw err;
					throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
				}
				return wasmTable.length - 1;
			};
			var setWasmTableEntry = (idx, func) => wasmTable.set(idx, func);
			var addFunction = (func, sig) => {
				var rtn = getFunctionAddress(func);
				if (rtn) return rtn;
				var ret = getEmptyTableSlot();
				try {
					setWasmTableEntry(ret, func);
				} catch (err) {
					if (!(err instanceof TypeError)) throw err;
					setWasmTableEntry(ret, convertJsFunctionToWasm(func, sig));
				}
				functionsInTableMap.set(func, ret);
				return ret;
			};
			var getCFunc = (ident) => {
				return Module["_" + ident];
			};
			var writeArrayToMemory = (array, buffer) => {
				HEAP8.set(array, buffer);
			};
			var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
			var stringToUTF8OnStack = (str) => {
				var size = lengthBytesUTF8(str) + 1;
				var ret = stackAlloc(size);
				stringToUTF8(str, ret, size);
				return ret;
			};
			var ccall = (ident, returnType, argTypes, args, opts) => {
				var toC = {
					string: (str) => {
						var ret = 0;
						if (str !== null && str !== void 0 && str !== 0) ret = stringToUTF8OnStack(str);
						return ret;
					},
					array: (arr) => {
						var ret = stackAlloc(arr.length);
						writeArrayToMemory(arr, ret);
						return ret;
					}
				};
				function convertReturnValue(ret) {
					if (returnType === "string") return UTF8ToString(ret);
					if (returnType === "boolean") return Boolean(ret);
					return ret;
				}
				var func = getCFunc(ident);
				var cArgs = [];
				var stack = 0;
				if (args) for (var i = 0; i < args.length; i++) {
					var converter = toC[argTypes[i]];
					if (converter) {
						if (stack === 0) stack = stackSave();
						cArgs[i] = converter(args[i]);
					} else cArgs[i] = args[i];
				}
				var ret = func(...cArgs);
				function onDone(ret) {
					if (stack !== 0) stackRestore(stack);
					return convertReturnValue(ret);
				}
				ret = onDone(ret);
				return ret;
			};
			var cwrap = (ident, returnType, argTypes, opts) => {
				var numericArgs = !argTypes || argTypes.every((type) => type === "number" || type === "boolean");
				if (returnType !== "string" && numericArgs && !opts) return getCFunc(ident);
				return (...args) => ccall(ident, returnType, argTypes, args, opts);
			};
			var getTempRet0 = (val) => __emscripten_tempret_get();
			var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
				maxBytesToWrite ?? (maxBytesToWrite = 2147483647);
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
				maxBytesToWrite ?? (maxBytesToWrite = 2147483647);
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
					var ch = HEAPU8[ptr++];
					if (!ch) return str;
					str += String.fromCharCode(ch);
				}
			};
			var UTF16Decoder = new TextDecoder("utf-16le");
			var UTF16ToString = (ptr, maxBytesToRead) => {
				var idx = ptr >> 1;
				var maxIdx = idx + maxBytesToRead / 2;
				var endIdx = idx;
				while (!(endIdx >= maxIdx) && HEAPU16[endIdx]) ++endIdx;
				return UTF16Decoder.decode(HEAPU16.subarray(idx, endIdx));
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
					} else str += String.fromCharCode(utf32);
				}
				return str;
			};
			var intArrayToString = (array) => {
				var ret = [];
				for (var i = 0; i < array.length; i++) {
					var chr = array[i];
					if (chr > 255) chr &= 255;
					ret.push(String.fromCharCode(chr));
				}
				return ret.join("");
			};
			FS.createPreloadedFile = FS_createPreloadedFile;
			FS.staticInit();
			MEMFS.doesNotExistError = new FS.ErrnoError(44);
			MEMFS.doesNotExistError.stack = "<generic error, no stack>";
			adapters_support();
			if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
			if (Module["preloadPlugins"]) preloadPlugins = Module["preloadPlugins"];
			if (Module["print"]) out = Module["print"];
			if (Module["printErr"]) err = Module["printErr"];
			if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
			if (Module["arguments"]) Module["arguments"];
			if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
			Module["getTempRet0"] = getTempRet0;
			Module["ccall"] = ccall;
			Module["cwrap"] = cwrap;
			Module["addFunction"] = addFunction;
			Module["setValue"] = setValue;
			Module["getValue"] = getValue;
			Module["UTF8ToString"] = UTF8ToString;
			Module["stringToUTF8"] = stringToUTF8;
			Module["lengthBytesUTF8"] = lengthBytesUTF8;
			Module["intArrayFromString"] = intArrayFromString;
			Module["intArrayToString"] = intArrayToString;
			Module["AsciiToString"] = AsciiToString;
			Module["UTF16ToString"] = UTF16ToString;
			Module["stringToUTF16"] = stringToUTF16;
			Module["UTF32ToString"] = UTF32ToString;
			Module["stringToUTF32"] = stringToUTF32;
			Module["writeArrayToMemory"] = writeArrayToMemory;
			var wasmImports = {
				a: ___assert_fail,
				aa: ___syscall_chmod,
				da: ___syscall_faccessat,
				ba: ___syscall_fchmod,
				$: ___syscall_fchown32,
				b: ___syscall_fcntl64,
				_: ___syscall_fstat64,
				y: ___syscall_ftruncate64,
				U: ___syscall_getcwd,
				Y: ___syscall_lstat64,
				R: ___syscall_mkdirat,
				X: ___syscall_newfstatat,
				P: ___syscall_openat,
				N: ___syscall_readlinkat,
				M: ___syscall_rmdir,
				Z: ___syscall_stat64,
				K: ___syscall_unlinkat,
				J: ___syscall_utimensat,
				F: __abort_js,
				E: __emscripten_runtime_keepalive_clear,
				w: __localtime_js,
				u: __mmap_js,
				v: __munmap_js,
				G: __setitimer_js,
				Q: __tzset_js,
				n: _emscripten_date_now,
				g: _emscripten_get_now,
				H: _emscripten_resize_heap,
				S: _environ_get,
				T: _environ_sizes_get,
				o: _fd_close,
				I: _fd_fdstat_get,
				O: _fd_read,
				x: _fd_seek,
				V: _fd_sync,
				L: _fd_write,
				s: _ipp,
				t: _ipp_async,
				ka: _ippipppp,
				oa: _ippipppp_async,
				j: _ippp,
				k: _ippp_async,
				c: _ipppi,
				d: _ipppi_async,
				ga: _ipppiii,
				ha: _ipppiii_async,
				ia: _ipppiiip,
				ja: _ipppiiip_async,
				h: _ipppip,
				i: _ipppip_async,
				z: _ipppj,
				A: _ipppj_async,
				e: _ipppp,
				f: _ipppp_async,
				ea: _ippppi,
				fa: _ippppi_async,
				B: _ippppij,
				C: _ippppij_async,
				p: _ippppip,
				q: _ippppip_async,
				la: _ipppppip,
				ma: _ipppppip_async,
				D: _proc_exit,
				na: _vppippii,
				r: _vppippii_async,
				l: _vppp,
				m: _vppp_async,
				W: _vpppip,
				ca: _vpppip_async
			};
			var wasmExports = await createWasm();
			wasmExports["qa"];
			Module["_sqlite3_status64"] = wasmExports["ra"];
			Module["_sqlite3_status"] = wasmExports["sa"];
			Module["_sqlite3_msize"] = wasmExports["ta"];
			Module["_sqlite3_db_status"] = wasmExports["ua"];
			Module["_sqlite3_vfs_find"] = wasmExports["va"];
			Module["_sqlite3_vfs_register"] = wasmExports["wa"];
			Module["_sqlite3_vfs_unregister"] = wasmExports["xa"];
			Module["_sqlite3_release_memory"] = wasmExports["ya"];
			Module["_sqlite3_soft_heap_limit64"] = wasmExports["za"];
			Module["_sqlite3_memory_used"] = wasmExports["Aa"];
			Module["_sqlite3_hard_heap_limit64"] = wasmExports["Ba"];
			Module["_sqlite3_memory_highwater"] = wasmExports["Ca"];
			Module["_sqlite3_malloc"] = wasmExports["Da"];
			Module["_sqlite3_malloc64"] = wasmExports["Ea"];
			Module["_sqlite3_free"] = wasmExports["Fa"];
			Module["_sqlite3_realloc"] = wasmExports["Ga"];
			Module["_sqlite3_realloc64"] = wasmExports["Ha"];
			Module["_sqlite3_str_vappendf"] = wasmExports["Ia"];
			Module["_sqlite3_str_append"] = wasmExports["Ja"];
			Module["_sqlite3_str_appendchar"] = wasmExports["Ka"];
			Module["_sqlite3_str_appendall"] = wasmExports["La"];
			Module["_sqlite3_str_appendf"] = wasmExports["Ma"];
			Module["_sqlite3_str_finish"] = wasmExports["Na"];
			Module["_sqlite3_str_errcode"] = wasmExports["Oa"];
			Module["_sqlite3_str_length"] = wasmExports["Pa"];
			Module["_sqlite3_str_value"] = wasmExports["Qa"];
			Module["_sqlite3_str_reset"] = wasmExports["Ra"];
			Module["_sqlite3_str_new"] = wasmExports["Sa"];
			Module["_sqlite3_vmprintf"] = wasmExports["Ta"];
			Module["_sqlite3_mprintf"] = wasmExports["Ua"];
			Module["_sqlite3_vsnprintf"] = wasmExports["Va"];
			Module["_sqlite3_snprintf"] = wasmExports["Wa"];
			Module["_sqlite3_log"] = wasmExports["Xa"];
			Module["_sqlite3_randomness"] = wasmExports["Ya"];
			Module["_sqlite3_stricmp"] = wasmExports["Za"];
			Module["_sqlite3_strnicmp"] = wasmExports["_a"];
			Module["_sqlite3_os_init"] = wasmExports["$a"];
			Module["_sqlite3_os_end"] = wasmExports["ab"];
			Module["_sqlite3_serialize"] = wasmExports["bb"];
			Module["_sqlite3_prepare_v2"] = wasmExports["cb"];
			Module["_sqlite3_step"] = wasmExports["db"];
			Module["_sqlite3_column_int64"] = wasmExports["eb"];
			Module["_sqlite3_reset"] = wasmExports["fb"];
			Module["_sqlite3_exec"] = wasmExports["gb"];
			Module["_sqlite3_column_int"] = wasmExports["hb"];
			Module["_sqlite3_finalize"] = wasmExports["ib"];
			Module["_sqlite3_deserialize"] = wasmExports["jb"];
			Module["_sqlite3_database_file_object"] = wasmExports["kb"];
			Module["_sqlite3_backup_init"] = wasmExports["lb"];
			Module["_sqlite3_backup_step"] = wasmExports["mb"];
			Module["_sqlite3_backup_finish"] = wasmExports["nb"];
			Module["_sqlite3_backup_remaining"] = wasmExports["ob"];
			Module["_sqlite3_backup_pagecount"] = wasmExports["pb"];
			Module["_sqlite3_clear_bindings"] = wasmExports["qb"];
			Module["_sqlite3_value_blob"] = wasmExports["rb"];
			Module["_sqlite3_value_text"] = wasmExports["sb"];
			Module["_sqlite3_value_bytes"] = wasmExports["tb"];
			Module["_sqlite3_value_bytes16"] = wasmExports["ub"];
			Module["_sqlite3_value_double"] = wasmExports["vb"];
			Module["_sqlite3_value_int"] = wasmExports["wb"];
			Module["_sqlite3_value_int64"] = wasmExports["xb"];
			Module["_sqlite3_value_subtype"] = wasmExports["yb"];
			Module["_sqlite3_value_pointer"] = wasmExports["zb"];
			Module["_sqlite3_value_text16"] = wasmExports["Ab"];
			Module["_sqlite3_value_text16be"] = wasmExports["Bb"];
			Module["_sqlite3_value_text16le"] = wasmExports["Cb"];
			Module["_sqlite3_value_type"] = wasmExports["Db"];
			Module["_sqlite3_value_encoding"] = wasmExports["Eb"];
			Module["_sqlite3_value_nochange"] = wasmExports["Fb"];
			Module["_sqlite3_value_frombind"] = wasmExports["Gb"];
			Module["_sqlite3_value_dup"] = wasmExports["Hb"];
			Module["_sqlite3_value_free"] = wasmExports["Ib"];
			Module["_sqlite3_result_blob"] = wasmExports["Jb"];
			Module["_sqlite3_result_blob64"] = wasmExports["Kb"];
			Module["_sqlite3_result_double"] = wasmExports["Lb"];
			Module["_sqlite3_result_error"] = wasmExports["Mb"];
			Module["_sqlite3_result_error16"] = wasmExports["Nb"];
			Module["_sqlite3_result_int"] = wasmExports["Ob"];
			Module["_sqlite3_result_int64"] = wasmExports["Pb"];
			Module["_sqlite3_result_null"] = wasmExports["Qb"];
			Module["_sqlite3_result_pointer"] = wasmExports["Rb"];
			Module["_sqlite3_result_subtype"] = wasmExports["Sb"];
			Module["_sqlite3_result_text"] = wasmExports["Tb"];
			Module["_sqlite3_result_text64"] = wasmExports["Ub"];
			Module["_sqlite3_result_text16"] = wasmExports["Vb"];
			Module["_sqlite3_result_text16be"] = wasmExports["Wb"];
			Module["_sqlite3_result_text16le"] = wasmExports["Xb"];
			Module["_sqlite3_result_value"] = wasmExports["Yb"];
			Module["_sqlite3_result_error_toobig"] = wasmExports["Zb"];
			Module["_sqlite3_result_zeroblob"] = wasmExports["_b"];
			Module["_sqlite3_result_zeroblob64"] = wasmExports["$b"];
			Module["_sqlite3_result_error_code"] = wasmExports["ac"];
			Module["_sqlite3_result_error_nomem"] = wasmExports["bc"];
			Module["_sqlite3_user_data"] = wasmExports["cc"];
			Module["_sqlite3_context_db_handle"] = wasmExports["dc"];
			Module["_sqlite3_vtab_nochange"] = wasmExports["ec"];
			Module["_sqlite3_vtab_in_first"] = wasmExports["fc"];
			Module["_sqlite3_vtab_in_next"] = wasmExports["gc"];
			Module["_sqlite3_aggregate_context"] = wasmExports["hc"];
			Module["_sqlite3_get_auxdata"] = wasmExports["ic"];
			Module["_sqlite3_set_auxdata"] = wasmExports["jc"];
			Module["_sqlite3_column_count"] = wasmExports["kc"];
			Module["_sqlite3_data_count"] = wasmExports["lc"];
			Module["_sqlite3_column_blob"] = wasmExports["mc"];
			Module["_sqlite3_column_bytes"] = wasmExports["nc"];
			Module["_sqlite3_column_bytes16"] = wasmExports["oc"];
			Module["_sqlite3_column_double"] = wasmExports["pc"];
			Module["_sqlite3_column_text"] = wasmExports["qc"];
			Module["_sqlite3_column_value"] = wasmExports["rc"];
			Module["_sqlite3_column_text16"] = wasmExports["sc"];
			Module["_sqlite3_column_type"] = wasmExports["tc"];
			Module["_sqlite3_column_name"] = wasmExports["uc"];
			Module["_sqlite3_column_name16"] = wasmExports["vc"];
			Module["_sqlite3_bind_blob"] = wasmExports["wc"];
			Module["_sqlite3_bind_blob64"] = wasmExports["xc"];
			Module["_sqlite3_bind_double"] = wasmExports["yc"];
			Module["_sqlite3_bind_int"] = wasmExports["zc"];
			Module["_sqlite3_bind_int64"] = wasmExports["Ac"];
			Module["_sqlite3_bind_null"] = wasmExports["Bc"];
			Module["_sqlite3_bind_pointer"] = wasmExports["Cc"];
			Module["_sqlite3_bind_text"] = wasmExports["Dc"];
			Module["_sqlite3_bind_text64"] = wasmExports["Ec"];
			Module["_sqlite3_bind_text16"] = wasmExports["Fc"];
			Module["_sqlite3_bind_value"] = wasmExports["Gc"];
			Module["_sqlite3_bind_zeroblob"] = wasmExports["Hc"];
			Module["_sqlite3_bind_zeroblob64"] = wasmExports["Ic"];
			Module["_sqlite3_bind_parameter_count"] = wasmExports["Jc"];
			Module["_sqlite3_bind_parameter_name"] = wasmExports["Kc"];
			Module["_sqlite3_bind_parameter_index"] = wasmExports["Lc"];
			Module["_sqlite3_db_handle"] = wasmExports["Mc"];
			Module["_sqlite3_stmt_readonly"] = wasmExports["Nc"];
			Module["_sqlite3_stmt_isexplain"] = wasmExports["Oc"];
			Module["_sqlite3_stmt_explain"] = wasmExports["Pc"];
			Module["_sqlite3_stmt_busy"] = wasmExports["Qc"];
			Module["_sqlite3_next_stmt"] = wasmExports["Rc"];
			Module["_sqlite3_stmt_status"] = wasmExports["Sc"];
			Module["_sqlite3_sql"] = wasmExports["Tc"];
			Module["_sqlite3_expanded_sql"] = wasmExports["Uc"];
			Module["_sqlite3_value_numeric_type"] = wasmExports["Vc"];
			Module["_sqlite3_blob_open"] = wasmExports["Wc"];
			Module["_sqlite3_blob_close"] = wasmExports["Xc"];
			Module["_sqlite3_blob_read"] = wasmExports["Yc"];
			Module["_sqlite3_blob_write"] = wasmExports["Zc"];
			Module["_sqlite3_blob_bytes"] = wasmExports["_c"];
			Module["_sqlite3_blob_reopen"] = wasmExports["$c"];
			Module["_sqlite3_set_authorizer"] = wasmExports["ad"];
			Module["_sqlite3_strglob"] = wasmExports["bd"];
			Module["_sqlite3_strlike"] = wasmExports["cd"];
			Module["_sqlite3_errmsg"] = wasmExports["dd"];
			Module["_sqlite3_auto_extension"] = wasmExports["ed"];
			Module["_sqlite3_cancel_auto_extension"] = wasmExports["fd"];
			Module["_sqlite3_reset_auto_extension"] = wasmExports["gd"];
			Module["_sqlite3_prepare"] = wasmExports["hd"];
			Module["_sqlite3_prepare_v3"] = wasmExports["id"];
			Module["_sqlite3_prepare16"] = wasmExports["jd"];
			Module["_sqlite3_prepare16_v2"] = wasmExports["kd"];
			Module["_sqlite3_prepare16_v3"] = wasmExports["ld"];
			Module["_sqlite3_get_table"] = wasmExports["md"];
			Module["_sqlite3_free_table"] = wasmExports["nd"];
			Module["_sqlite3_create_module"] = wasmExports["od"];
			Module["_sqlite3_create_module_v2"] = wasmExports["pd"];
			Module["_sqlite3_drop_modules"] = wasmExports["qd"];
			Module["_sqlite3_declare_vtab"] = wasmExports["rd"];
			Module["_sqlite3_vtab_on_conflict"] = wasmExports["sd"];
			Module["_sqlite3_vtab_config"] = wasmExports["td"];
			Module["_sqlite3_vtab_collation"] = wasmExports["ud"];
			Module["_sqlite3_vtab_in"] = wasmExports["vd"];
			Module["_sqlite3_vtab_rhs_value"] = wasmExports["wd"];
			Module["_sqlite3_vtab_distinct"] = wasmExports["xd"];
			Module["_sqlite3_keyword_name"] = wasmExports["yd"];
			Module["_sqlite3_keyword_count"] = wasmExports["zd"];
			Module["_sqlite3_keyword_check"] = wasmExports["Ad"];
			Module["_sqlite3_complete"] = wasmExports["Bd"];
			Module["_sqlite3_complete16"] = wasmExports["Cd"];
			Module["_sqlite3_libversion"] = wasmExports["Dd"];
			Module["_sqlite3_libversion_number"] = wasmExports["Ed"];
			Module["_sqlite3_threadsafe"] = wasmExports["Fd"];
			Module["_sqlite3_initialize"] = wasmExports["Gd"];
			Module["_sqlite3_shutdown"] = wasmExports["Hd"];
			Module["_sqlite3_config"] = wasmExports["Id"];
			Module["_sqlite3_db_mutex"] = wasmExports["Jd"];
			Module["_sqlite3_db_release_memory"] = wasmExports["Kd"];
			Module["_sqlite3_db_cacheflush"] = wasmExports["Ld"];
			Module["_sqlite3_db_config"] = wasmExports["Md"];
			Module["_sqlite3_last_insert_rowid"] = wasmExports["Nd"];
			Module["_sqlite3_set_last_insert_rowid"] = wasmExports["Od"];
			Module["_sqlite3_changes64"] = wasmExports["Pd"];
			Module["_sqlite3_changes"] = wasmExports["Qd"];
			Module["_sqlite3_total_changes64"] = wasmExports["Rd"];
			Module["_sqlite3_total_changes"] = wasmExports["Sd"];
			Module["_sqlite3_txn_state"] = wasmExports["Td"];
			Module["_sqlite3_close"] = wasmExports["Ud"];
			Module["_sqlite3_close_v2"] = wasmExports["Vd"];
			Module["_sqlite3_busy_handler"] = wasmExports["Wd"];
			Module["_sqlite3_progress_handler"] = wasmExports["Xd"];
			Module["_sqlite3_busy_timeout"] = wasmExports["Yd"];
			Module["_sqlite3_interrupt"] = wasmExports["Zd"];
			Module["_sqlite3_is_interrupted"] = wasmExports["_d"];
			Module["_sqlite3_create_function"] = wasmExports["$d"];
			Module["_sqlite3_create_function_v2"] = wasmExports["ae"];
			Module["_sqlite3_create_window_function"] = wasmExports["be"];
			Module["_sqlite3_create_function16"] = wasmExports["ce"];
			Module["_sqlite3_overload_function"] = wasmExports["de"];
			Module["_sqlite3_trace_v2"] = wasmExports["ee"];
			Module["_sqlite3_commit_hook"] = wasmExports["fe"];
			Module["_sqlite3_update_hook"] = wasmExports["ge"];
			Module["_sqlite3_rollback_hook"] = wasmExports["he"];
			Module["_sqlite3_autovacuum_pages"] = wasmExports["ie"];
			Module["_sqlite3_wal_autocheckpoint"] = wasmExports["je"];
			Module["_sqlite3_wal_hook"] = wasmExports["ke"];
			Module["_sqlite3_wal_checkpoint_v2"] = wasmExports["le"];
			Module["_sqlite3_wal_checkpoint"] = wasmExports["me"];
			Module["_sqlite3_error_offset"] = wasmExports["ne"];
			Module["_sqlite3_errmsg16"] = wasmExports["oe"];
			Module["_sqlite3_errcode"] = wasmExports["pe"];
			Module["_sqlite3_extended_errcode"] = wasmExports["qe"];
			Module["_sqlite3_system_errno"] = wasmExports["re"];
			Module["_sqlite3_errstr"] = wasmExports["se"];
			Module["_sqlite3_limit"] = wasmExports["te"];
			Module["_sqlite3_open"] = wasmExports["ue"];
			Module["_sqlite3_open_v2"] = wasmExports["ve"];
			Module["_sqlite3_open16"] = wasmExports["we"];
			Module["_sqlite3_create_collation"] = wasmExports["xe"];
			Module["_sqlite3_create_collation_v2"] = wasmExports["ye"];
			Module["_sqlite3_create_collation16"] = wasmExports["ze"];
			Module["_sqlite3_collation_needed"] = wasmExports["Ae"];
			Module["_sqlite3_collation_needed16"] = wasmExports["Be"];
			Module["_sqlite3_get_clientdata"] = wasmExports["Ce"];
			Module["_sqlite3_set_clientdata"] = wasmExports["De"];
			Module["_sqlite3_get_autocommit"] = wasmExports["Ee"];
			Module["_sqlite3_table_column_metadata"] = wasmExports["Fe"];
			Module["_sqlite3_sleep"] = wasmExports["Ge"];
			Module["_sqlite3_extended_result_codes"] = wasmExports["He"];
			Module["_sqlite3_file_control"] = wasmExports["Ie"];
			Module["_sqlite3_test_control"] = wasmExports["Je"];
			Module["_sqlite3_create_filename"] = wasmExports["Ke"];
			Module["_sqlite3_free_filename"] = wasmExports["Le"];
			Module["_sqlite3_uri_parameter"] = wasmExports["Me"];
			Module["_sqlite3_uri_key"] = wasmExports["Ne"];
			Module["_sqlite3_uri_boolean"] = wasmExports["Oe"];
			Module["_sqlite3_uri_int64"] = wasmExports["Pe"];
			Module["_sqlite3_filename_database"] = wasmExports["Qe"];
			Module["_sqlite3_filename_journal"] = wasmExports["Re"];
			Module["_sqlite3_filename_wal"] = wasmExports["Se"];
			Module["_sqlite3_db_name"] = wasmExports["Te"];
			Module["_sqlite3_db_filename"] = wasmExports["Ue"];
			Module["_sqlite3_db_readonly"] = wasmExports["Ve"];
			Module["_sqlite3_compileoption_used"] = wasmExports["We"];
			Module["_sqlite3_compileoption_get"] = wasmExports["Xe"];
			Module["_sqlite3_sourceid"] = wasmExports["Ye"];
			Module["_malloc"] = wasmExports["Ze"];
			Module["_free"] = wasmExports["_e"];
			Module["_RegisterExtensionFunctions"] = wasmExports["$e"];
			Module["_getSqliteFree"] = wasmExports["af"];
			var _main = Module["_main"] = wasmExports["bf"];
			Module["_libauthorizer_set_authorizer"] = wasmExports["cf"];
			Module["_libfunction_create_function"] = wasmExports["df"];
			Module["_libhook_commit_hook"] = wasmExports["ef"];
			Module["_libhook_update_hook"] = wasmExports["ff"];
			Module["_libprogress_progress_handler"] = wasmExports["gf"];
			Module["_libvfs_vfs_register"] = wasmExports["hf"];
			var _emscripten_builtin_memalign = wasmExports["kf"];
			var __emscripten_timeout = wasmExports["lf"];
			var __emscripten_tempret_get = wasmExports["mf"];
			var __emscripten_stack_restore = wasmExports["nf"];
			var __emscripten_stack_alloc = wasmExports["of"];
			var _emscripten_stack_get_current = wasmExports["pf"];
			Module["dynCall_vijii"] = wasmExports["dynCall_vijii"];
			Module["dynCall_iiiij"] = wasmExports["dynCall_iiiij"];
			Module["dynCall_viji"] = wasmExports["dynCall_viji"];
			Module["dynCall_viiiij"] = wasmExports["dynCall_viiiij"];
			Module["dynCall_iij"] = wasmExports["dynCall_iij"];
			Module["dynCall_iijii"] = wasmExports["dynCall_iijii"];
			Module["dynCall_iiji"] = wasmExports["dynCall_iiji"];
			Module["dynCall_iiiiiij"] = wasmExports["dynCall_iiiiiij"];
			Module["dynCall_ji"] = wasmExports["dynCall_ji"];
			Module["_sqlite3_version"] = 5472;
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
					dependenciesFulfilled = run;
					return;
				}
				preRun();
				if (runDependencies > 0) {
					dependenciesFulfilled = run;
					return;
				}
				function doRun() {
					Module["calledRun"] = true;
					if (ABORT) return;
					initRuntime();
					readyPromiseResolve(Module);
					Module["onRuntimeInitialized"]?.();
					if (!(Module["noInitialRun"] || false)) callMain();
					postRun();
				}
				if (Module["setStatus"]) {
					Module["setStatus"]("Running...");
					setTimeout(() => {
						setTimeout(() => Module["setStatus"](""), 1);
						doRun();
					}, 1);
				} else doRun();
			}
			function preInit() {
				if (Module["preInit"]) {
					if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
					while (Module["preInit"].length > 0) Module["preInit"].shift()();
				}
			}
			preInit();
			run();
			(function() {
				const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
				let pAsyncFlags = 0;
				Module["set_authorizer"] = function(db, xAuthorizer, pApp) {
					if (pAsyncFlags) {
						Module["deleteCallback"](pAsyncFlags);
						Module["_sqlite3_free"](pAsyncFlags);
						pAsyncFlags = 0;
					}
					pAsyncFlags = Module["_sqlite3_malloc"](4);
					setValue(pAsyncFlags, xAuthorizer instanceof AsyncFunction ? 1 : 0, "i32");
					const result = ccall("libauthorizer_set_authorizer", "number", [
						"number",
						"number",
						"number"
					], [
						db,
						xAuthorizer ? 1 : 0,
						pAsyncFlags
					]);
					if (!result && xAuthorizer) Module["setCallback"](pAsyncFlags, (_, iAction, p3, p4, p5, p6) => xAuthorizer(pApp, iAction, p3, p4, p5, p6));
					return result;
				};
			})();
			(function() {
				const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
				const FUNC_METHODS = [
					"xFunc",
					"xStep",
					"xFinal"
				];
				const mapFunctionNameToKey = /* @__PURE__ */ new Map();
				Module["create_function"] = function(db, zFunctionName, nArg, eTextRep, pApp, xFunc, xStep, xFinal) {
					const pAsyncFlags = Module["_sqlite3_malloc"](4);
					const target = {
						xFunc,
						xStep,
						xFinal
					};
					setValue(pAsyncFlags, FUNC_METHODS.reduce((mask, method, i) => {
						if (target[method] instanceof AsyncFunction) return mask | 1 << i;
						return mask;
					}, 0), "i32");
					const result = ccall("libfunction_create_function", "number", [
						"number",
						"string",
						"number",
						"number",
						"number",
						"number",
						"number",
						"number"
					], [
						db,
						zFunctionName,
						nArg,
						eTextRep,
						pAsyncFlags,
						xFunc ? 1 : 0,
						xStep ? 1 : 0,
						xFinal ? 1 : 0
					]);
					if (!result) {
						if (mapFunctionNameToKey.has(zFunctionName)) {
							const oldKey = mapFunctionNameToKey.get(zFunctionName);
							Module["deleteCallback"](oldKey);
						}
						mapFunctionNameToKey.set(zFunctionName, pAsyncFlags);
						Module["setCallback"](pAsyncFlags, {
							xFunc,
							xStep,
							xFinal
						});
					}
					return result;
				};
			})();
			(function() {
				const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
				let pAsyncFlags = 0;
				Module["update_hook"] = function(db, xUpdateHook) {
					if (pAsyncFlags) {
						Module["deleteCallback"](pAsyncFlags);
						Module["_sqlite3_free"](pAsyncFlags);
						pAsyncFlags = 0;
					}
					pAsyncFlags = Module["_sqlite3_malloc"](4);
					setValue(pAsyncFlags, xUpdateHook instanceof AsyncFunction ? 1 : 0, "i32");
					ccall("libhook_update_hook", "void", [
						"number",
						"number",
						"number"
					], [
						db,
						xUpdateHook ? 1 : 0,
						pAsyncFlags
					]);
					if (xUpdateHook) Module["setCallback"](pAsyncFlags, (_, iUpdateType, dbName, tblName, lo32, hi32) => xUpdateHook(iUpdateType, dbName, tblName, lo32, hi32));
				};
			})();
			(function() {
				const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
				let pAsyncFlags = 0;
				Module["commit_hook"] = function(db, xCommitHook) {
					if (pAsyncFlags) {
						Module["deleteCallback"](pAsyncFlags);
						Module["_sqlite3_free"](pAsyncFlags);
						pAsyncFlags = 0;
					}
					pAsyncFlags = Module["_sqlite3_malloc"](4);
					setValue(pAsyncFlags, xCommitHook instanceof AsyncFunction ? 1 : 0, "i32");
					ccall("libhook_commit_hook", "void", [
						"number",
						"number",
						"number"
					], [
						db,
						xCommitHook ? 1 : 0,
						pAsyncFlags
					]);
					if (xCommitHook) Module["setCallback"](pAsyncFlags, (_) => xCommitHook());
				};
			})();
			(function() {
				const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
				let pAsyncFlags = 0;
				Module["progress_handler"] = function(db, nOps, xProgress, pApp) {
					if (pAsyncFlags) {
						Module["deleteCallback"](pAsyncFlags);
						Module["_sqlite3_free"](pAsyncFlags);
						pAsyncFlags = 0;
					}
					pAsyncFlags = Module["_sqlite3_malloc"](4);
					setValue(pAsyncFlags, xProgress instanceof AsyncFunction ? 1 : 0, "i32");
					ccall("libprogress_progress_handler", "number", [
						"number",
						"number",
						"number",
						"number"
					], [
						db,
						nOps,
						xProgress ? 1 : 0,
						pAsyncFlags
					]);
					if (xProgress) Module["setCallback"](pAsyncFlags, (_) => xProgress(pApp));
				};
			})();
			(function() {
				const VFS_METHODS = [
					"xOpen",
					"xDelete",
					"xAccess",
					"xFullPathname",
					"xRandomness",
					"xSleep",
					"xCurrentTime",
					"xGetLastError",
					"xCurrentTimeInt64",
					"xClose",
					"xRead",
					"xWrite",
					"xTruncate",
					"xSync",
					"xFileSize",
					"xLock",
					"xUnlock",
					"xCheckReservedLock",
					"xFileControl",
					"xSectorSize",
					"xDeviceCharacteristics",
					"xShmMap",
					"xShmLock",
					"xShmBarrier",
					"xShmUnmap"
				];
				const mapVFSNameToKey = /* @__PURE__ */ new Map();
				Module["vfs_register"] = function(vfs, makeDefault) {
					let methodMask = 0;
					let asyncMask = 0;
					VFS_METHODS.forEach((method, i) => {
						if (vfs[method]) {
							methodMask |= 1 << i;
							if (vfs["hasAsyncMethod"](method)) asyncMask |= 1 << i;
						}
					});
					const vfsReturn = Module["_sqlite3_malloc"](4);
					try {
						const result = ccall("libvfs_vfs_register", "number", [
							"string",
							"number",
							"number",
							"number",
							"number",
							"number"
						], [
							vfs.name,
							vfs.mxPathname,
							methodMask,
							asyncMask,
							makeDefault ? 1 : 0,
							vfsReturn
						]);
						if (!result) {
							if (mapVFSNameToKey.has(vfs.name)) {
								const oldKey = mapVFSNameToKey.get(vfs.name);
								Module["deleteCallback"](oldKey);
							}
							const key = getValue(vfsReturn, "*");
							mapVFSNameToKey.set(vfs.name, key);
							Module["setCallback"](key, vfs);
						}
						return result;
					} finally {
						Module["_sqlite3_free"](vfsReturn);
					}
				};
			})();
			moduleRtn = readyPromise;
			return moduleRtn;
		});
	})();
}));
//#endregion
//#region ../node_modules/.pnpm/@subframe7536+sqlite-wasm@1.3.0/node_modules/@subframe7536/sqlite-wasm/dist/index.js
var dist_exports$1 = /* @__PURE__ */ __exportAll({
	MemoryVFS: () => MemoryVFS,
	changes: () => changes,
	close: () => close,
	customFunction: () => customFunction,
	customFunctionCore: () => customFunctionCore,
	dumpVFS: () => dumpVFS,
	exportDatabase: () => exportDatabase,
	exportDatabaseFromFsHandle: () => exportDatabaseFromFsHandle,
	exportDatabaseFromIDB: () => exportDatabaseFromIDB,
	importDatabase: () => importDatabase,
	importDatabaseToIdb: () => importDatabaseToIdb,
	initSQLite: () => initSQLite,
	initSQLiteCore: () => initSQLiteCore,
	isIdbSupported: () => isIdbSupported,
	isModuleWorkerSupport: () => isModuleWorkerSupport,
	isOpfsReadWriteUnsafeSupported: () => isOpfsReadWriteUnsafeSupported,
	isOpfsSupported: () => isOpfsSupported,
	iterator: () => iterator,
	lastInsertRowId: () => lastInsertRowId,
	parseOpenV2Flag: () => parseOpenV2Flag,
	query: () => query,
	reopen: () => reopen,
	run: () => run,
	stream: () => stream,
	useMemoryStorage: () => useMemoryStorage,
	withExistDB: () => withExistDB
});
/**
* Builds a Javascript API from the Emscripten module. This API is still
* low-level and closely corresponds to the C API exported by the module,
* but differs in some specifics like throwing exceptions on errors.
* @param {*} Module SQLite Emscripten module
* @returns {SQLiteAPI}
*/
function Factory(Module) {
	/** @type {SQLiteAPI} */ const sqlite3 = {};
	Module.retryOps = [];
	Module.pendingOps = [];
	const sqliteFreeAddress = Module._getSqliteFree();
	const tmp = Module._malloc(8);
	const tmpPtr = [tmp, tmp + 4];
	const textEncoder = new TextEncoder();
	function createUTF8(s) {
		if (typeof s !== "string") return 0;
		const utf8 = textEncoder.encode(s);
		const zts = Module._sqlite3_malloc(utf8.byteLength + 1);
		Module.HEAPU8.set(utf8, zts);
		Module.HEAPU8[zts + utf8.byteLength] = 0;
		return zts;
	}
	/**
	* Concatenate 32-bit numbers into a 64-bit (signed) BigInt.
	* @param {number} lo32
	* @param {number} hi32
	* @returns {bigint}
	*/
	function cvt32x2ToBigInt(lo32, hi32) {
		return BigInt(hi32) << 32n | BigInt(lo32) & 4294967295n;
	}
	/**
	* Concatenate 32-bit numbers and return as number or BigInt, depending
	* on the value.
	* @param {number} lo32 
	* @param {number} hi32 
	* @returns {number|bigint}
	*/
	const cvt32x2AsSafe = (function() {
		const hiMax = BigInt(Number.MAX_SAFE_INTEGER) >> 32n;
		const hiMin = BigInt(Number.MIN_SAFE_INTEGER) >> 32n;
		return function(lo32, hi32) {
			if (hi32 > hiMax || hi32 < hiMin) return cvt32x2ToBigInt(lo32, hi32);
			else return hi32 * 4294967296 + (lo32 & 2147483647) - (lo32 & 2147483648);
		};
	})();
	const databases = /* @__PURE__ */ new Set();
	function verifyDatabase(db) {
		if (!databases.has(db)) throw new SQLiteError("not a database", 21);
	}
	const mapStmtToDB = /* @__PURE__ */ new Map();
	function verifyStatement(stmt) {
		if (!mapStmtToDB.has(stmt)) throw new SQLiteError("not a statement", 21);
	}
	sqlite3.bind_collection = function(stmt, bindings) {
		verifyStatement(stmt);
		const isArray = Array.isArray(bindings);
		const nBindings = sqlite3.bind_parameter_count(stmt);
		for (let i = 1; i <= nBindings; ++i) {
			const value = bindings[isArray ? i - 1 : sqlite3.bind_parameter_name(stmt, i)];
			if (value !== void 0) sqlite3.bind(stmt, i, value);
		}
		return 0;
	};
	sqlite3.bind = function(stmt, i, value) {
		verifyStatement(stmt);
		switch (typeof value) {
			case "number": if (value === (value | 0)) return sqlite3.bind_int(stmt, i, value);
			else return sqlite3.bind_double(stmt, i, value);
			case "string": return sqlite3.bind_text(stmt, i, value);
			case "boolean": return sqlite3.bind_int(stmt, i, value ? 1 : 0);
			default: if (value instanceof Uint8Array || Array.isArray(value)) return sqlite3.bind_blob(stmt, i, value);
			else if (value === null) return sqlite3.bind_null(stmt, i);
			else if (typeof value === "bigint") return sqlite3.bind_int64(stmt, i, value);
			else if (value === void 0) return 27;
			else {
				console.warn("unknown binding converted to null", value);
				return sqlite3.bind_null(stmt, i);
			}
		}
	};
	sqlite3.bind_blob = (function() {
		const fname = "sqlite3_bind_blob";
		const f = Module.cwrap(fname, ...decl("nnnnn:n"));
		return function(stmt, i, value) {
			verifyStatement(stmt);
			const byteLength = value.byteLength ?? value.length;
			const ptr = Module._sqlite3_malloc(byteLength);
			Module.HEAPU8.subarray(ptr).set(value);
			return check(fname, f(stmt, i, ptr, byteLength, sqliteFreeAddress), mapStmtToDB.get(stmt));
		};
	})();
	sqlite3.bind_parameter_count = (function() {
		const f = Module.cwrap("sqlite3_bind_parameter_count", ...decl("n:n"));
		return function(stmt) {
			verifyStatement(stmt);
			return f(stmt);
		};
	})();
	sqlite3.bind_double = (function() {
		const fname = "sqlite3_bind_double";
		const f = Module.cwrap(fname, ...decl("nnn:n"));
		return function(stmt, i, value) {
			verifyStatement(stmt);
			return check(fname, f(stmt, i, value), mapStmtToDB.get(stmt));
		};
	})();
	sqlite3.bind_int = (function() {
		const fname = "sqlite3_bind_int";
		const f = Module.cwrap(fname, ...decl("nnn:n"));
		return function(stmt, i, value) {
			verifyStatement(stmt);
			if (value > 2147483647 || value < -2147483648) return 25;
			return check(fname, f(stmt, i, value), mapStmtToDB.get(stmt));
		};
	})();
	sqlite3.bind_int64 = (function() {
		const fname = "sqlite3_bind_int64";
		const f = Module.cwrap(fname, ...decl("nnnn:n"));
		return function(stmt, i, value) {
			verifyStatement(stmt);
			if (value > MAX_INT64 || value < MIN_INT64) return 25;
			const lo32 = value & 4294967295n;
			const hi32 = value >> 32n;
			return check(fname, f(stmt, i, Number(lo32), Number(hi32)), mapStmtToDB.get(stmt));
		};
	})();
	sqlite3.bind_null = (function() {
		const fname = "sqlite3_bind_null";
		const f = Module.cwrap(fname, ...decl("nn:n"));
		return function(stmt, i) {
			verifyStatement(stmt);
			return check(fname, f(stmt, i), mapStmtToDB.get(stmt));
		};
	})();
	sqlite3.bind_parameter_name = (function() {
		const f = Module.cwrap("sqlite3_bind_parameter_name", ...decl("n:s"));
		return function(stmt, i) {
			verifyStatement(stmt);
			return f(stmt, i);
		};
	})();
	sqlite3.bind_text = (function() {
		const fname = "sqlite3_bind_text";
		const f = Module.cwrap(fname, ...decl("nnnnn:n"));
		return function(stmt, i, value) {
			verifyStatement(stmt);
			return check(fname, f(stmt, i, createUTF8(value), -1, sqliteFreeAddress), mapStmtToDB.get(stmt));
		};
	})();
	sqlite3.changes = (function() {
		const f = Module.cwrap("sqlite3_changes", ...decl("n:n"));
		return function(db) {
			verifyDatabase(db);
			return f(db);
		};
	})();
	sqlite3.clear_bindings = (function() {
		const fname = "sqlite3_clear_bindings";
		const f = Module.cwrap(fname, ...decl("n:n"));
		return function(stmt) {
			verifyStatement(stmt);
			return check(fname, f(stmt), mapStmtToDB.get(stmt));
		};
	})();
	sqlite3.close = (function() {
		const fname = "sqlite3_close";
		const f = Module.cwrap(fname, ...decl("n:n"), { async });
		return async function(db) {
			verifyDatabase(db);
			const result = await f(db);
			databases.delete(db);
			return check(fname, result, db);
		};
	})();
	sqlite3.column = function(stmt, iCol) {
		verifyStatement(stmt);
		const type = sqlite3.column_type(stmt, iCol);
		switch (type) {
			case 4: return sqlite3.column_blob(stmt, iCol);
			case 2: return sqlite3.column_double(stmt, iCol);
			case 1: return cvt32x2AsSafe(sqlite3.column_int(stmt, iCol), Module.getTempRet0());
			case 5: return null;
			case 3: return sqlite3.column_text(stmt, iCol);
			default: throw new SQLiteError("unknown type", type);
		}
	};
	sqlite3.column_blob = (function() {
		const f = Module.cwrap("sqlite3_column_blob", ...decl("nn:n"));
		return function(stmt, iCol) {
			verifyStatement(stmt);
			const nBytes = sqlite3.column_bytes(stmt, iCol);
			const address = f(stmt, iCol);
			return Module.HEAPU8.subarray(address, address + nBytes);
		};
	})();
	sqlite3.column_bytes = (function() {
		const f = Module.cwrap("sqlite3_column_bytes", ...decl("nn:n"));
		return function(stmt, iCol) {
			verifyStatement(stmt);
			return f(stmt, iCol);
		};
	})();
	sqlite3.column_count = (function() {
		const f = Module.cwrap("sqlite3_column_count", ...decl("n:n"));
		return function(stmt) {
			verifyStatement(stmt);
			return f(stmt);
		};
	})();
	sqlite3.column_double = (function() {
		const f = Module.cwrap("sqlite3_column_double", ...decl("nn:n"));
		return function(stmt, iCol) {
			verifyStatement(stmt);
			return f(stmt, iCol);
		};
	})();
	sqlite3.column_int = (function() {
		const f = Module.cwrap("sqlite3_column_int64", ...decl("nn:n"));
		return function(stmt, iCol) {
			verifyStatement(stmt);
			return f(stmt, iCol);
		};
	})();
	sqlite3.column_int64 = (function() {
		const f = Module.cwrap("sqlite3_column_int64", ...decl("nn:n"));
		return function(stmt, iCol) {
			verifyStatement(stmt);
			return cvt32x2ToBigInt(f(stmt, iCol), Module.getTempRet0());
		};
	})();
	sqlite3.column_name = (function() {
		const f = Module.cwrap("sqlite3_column_name", ...decl("nn:s"));
		return function(stmt, iCol) {
			verifyStatement(stmt);
			return f(stmt, iCol);
		};
	})();
	sqlite3.column_names = function(stmt) {
		const columns = [];
		const nColumns = sqlite3.column_count(stmt);
		for (let i = 0; i < nColumns; ++i) columns.push(sqlite3.column_name(stmt, i));
		return columns;
	};
	sqlite3.column_text = (function() {
		const f = Module.cwrap("sqlite3_column_text", ...decl("nn:s"));
		return function(stmt, iCol) {
			verifyStatement(stmt);
			return f(stmt, iCol);
		};
	})();
	sqlite3.column_type = (function() {
		const f = Module.cwrap("sqlite3_column_type", ...decl("nn:n"));
		return function(stmt, iCol) {
			verifyStatement(stmt);
			return f(stmt, iCol);
		};
	})();
	sqlite3.create_function = function(db, zFunctionName, nArg, eTextRep, pApp, xFunc, xStep, xFinal) {
		verifyDatabase(db);
		function adapt(f) {
			return f instanceof AsyncFunction ? (async (ctx, n, values) => f(ctx, Module.HEAP32.subarray(values / 4, values / 4 + n))) : ((ctx, n, values) => f(ctx, Module.HEAP32.subarray(values / 4, values / 4 + n)));
		}
		return check("sqlite3_create_function", Module.create_function(db, zFunctionName, nArg, eTextRep, pApp, xFunc && adapt(xFunc), xStep && adapt(xStep), xFinal), db);
	};
	sqlite3.data_count = (function() {
		const f = Module.cwrap("sqlite3_data_count", ...decl("n:n"));
		return function(stmt) {
			verifyStatement(stmt);
			return f(stmt);
		};
	})();
	sqlite3.exec = async function(db, sql, callback) {
		for await (const stmt of sqlite3.statements(db, sql)) {
			let columns;
			while (await sqlite3.step(stmt) === 100) if (callback) {
				columns = columns ?? sqlite3.column_names(stmt);
				await callback(sqlite3.row(stmt), columns);
			}
		}
		return 0;
	};
	sqlite3.finalize = (function() {
		const f = Module.cwrap("sqlite3_finalize", ...decl("n:n"), { async });
		return async function(stmt) {
			const result = await f(stmt);
			mapStmtToDB.delete(stmt);
			return result;
		};
	})();
	sqlite3.get_autocommit = (function() {
		const f = Module.cwrap("sqlite3_get_autocommit", ...decl("n:n"));
		return function(db) {
			return f(db);
		};
	})();
	sqlite3.libversion = (function() {
		const f = Module.cwrap("sqlite3_libversion", ...decl(":s"));
		return function() {
			return f();
		};
	})();
	sqlite3.libversion_number = (function() {
		const f = Module.cwrap("sqlite3_libversion_number", ...decl(":n"));
		return function() {
			return f();
		};
	})();
	sqlite3.limit = (function() {
		const f = Module.cwrap("sqlite3_limit", ...decl("nnn:n"));
		return function(db, id, newVal) {
			return f(db, id, newVal);
		};
	})();
	sqlite3.open_v2 = (function() {
		const fname = "sqlite3_open_v2";
		const f = Module.cwrap(fname, ...decl("snnn:n"), { async });
		return async function(zFilename, flags, zVfs) {
			flags = flags || 6;
			zVfs = createUTF8(zVfs);
			try {
				const rc = await retry(() => f(zFilename, tmpPtr[0], flags, zVfs));
				const db = Module.getValue(tmpPtr[0], "*");
				databases.add(db);
				Module.ccall("RegisterExtensionFunctions", "void", ["number"], [db]);
				check(fname, rc);
				return db;
			} finally {
				Module._sqlite3_free(zVfs);
			}
		};
	})();
	sqlite3.progress_handler = function(db, nProgressOps, handler, userData) {
		verifyDatabase(db);
		Module.progress_handler(db, nProgressOps, handler, userData);
	};
	sqlite3.reset = (function() {
		const fname = "sqlite3_reset";
		const f = Module.cwrap(fname, ...decl("n:n"), { async });
		return async function(stmt) {
			verifyStatement(stmt);
			return check(fname, await f(stmt), mapStmtToDB.get(stmt));
		};
	})();
	sqlite3.result = function(context, value) {
		switch (typeof value) {
			case "number":
				if (value === (value | 0)) sqlite3.result_int(context, value);
				else sqlite3.result_double(context, value);
				break;
			case "string":
				sqlite3.result_text(context, value);
				break;
			default:
				if (value instanceof Uint8Array || Array.isArray(value)) sqlite3.result_blob(context, value);
				else if (value === null) sqlite3.result_null(context);
				else if (typeof value === "bigint") return sqlite3.result_int64(context, value);
				else {
					console.warn("unknown result converted to null", value);
					sqlite3.result_null(context);
				}
				break;
		}
	};
	sqlite3.result_blob = (function() {
		const f = Module.cwrap("sqlite3_result_blob", ...decl("nnnn:n"));
		return function(context, value) {
			const byteLength = value.byteLength ?? value.length;
			const ptr = Module._sqlite3_malloc(byteLength);
			Module.HEAPU8.subarray(ptr).set(value);
			f(context, ptr, byteLength, sqliteFreeAddress);
		};
	})();
	sqlite3.result_double = (function() {
		const f = Module.cwrap("sqlite3_result_double", ...decl("nn:n"));
		return function(context, value) {
			f(context, value);
		};
	})();
	sqlite3.result_int = (function() {
		const f = Module.cwrap("sqlite3_result_int", ...decl("nn:n"));
		return function(context, value) {
			f(context, value);
		};
	})();
	sqlite3.result_int64 = (function() {
		const f = Module.cwrap("sqlite3_result_int64", ...decl("nnn:n"));
		return function(context, value) {
			if (value > MAX_INT64 || value < MIN_INT64) return 25;
			const lo32 = value & 4294967295n;
			const hi32 = value >> 32n;
			f(context, Number(lo32), Number(hi32));
		};
	})();
	sqlite3.result_null = (function() {
		const f = Module.cwrap("sqlite3_result_null", ...decl("n:n"));
		return function(context) {
			f(context);
		};
	})();
	sqlite3.result_text = (function() {
		const f = Module.cwrap("sqlite3_result_text", ...decl("nnnn:n"));
		return function(context, value) {
			f(context, createUTF8(value), -1, sqliteFreeAddress);
		};
	})();
	sqlite3.row = function(stmt) {
		const row = [];
		const nColumns = sqlite3.data_count(stmt);
		for (let i = 0; i < nColumns; ++i) {
			const value = sqlite3.column(stmt, i);
			row.push(value?.buffer === Module.HEAPU8.buffer ? value.slice() : value);
		}
		return row;
	};
	sqlite3.set_authorizer = function(db, xAuth, pApp) {
		verifyDatabase(db);
		function cvtArgs(_, iAction, p3, p4, p5, p6) {
			return [
				_,
				iAction,
				Module.UTF8ToString(p3),
				Module.UTF8ToString(p4),
				Module.UTF8ToString(p5),
				Module.UTF8ToString(p6)
			];
		}
		function adapt(f) {
			return f instanceof AsyncFunction ? (async (_, iAction, p3, p4, p5, p6) => f(...cvtArgs(_, iAction, p3, p4, p5, p6))) : ((_, iAction, p3, p4, p5, p6) => f(...cvtArgs(_, iAction, p3, p4, p5, p6)));
		}
		return check("sqlite3_set_authorizer", Module.set_authorizer(db, adapt(xAuth), pApp), db);
	};
	sqlite3.sql = (function() {
		const f = Module.cwrap("sqlite3_sql", ...decl("n:s"));
		return function(stmt) {
			verifyStatement(stmt);
			return f(stmt);
		};
	})();
	sqlite3.statements = function(db, sql, options = {}) {
		const prepare = Module.cwrap("sqlite3_prepare_v3", "number", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"number"
		], { async: true });
		return (async function* () {
			const onFinally = [];
			try {
				const utf8 = textEncoder.encode(sql);
				const allocSize = utf8.byteLength - utf8.byteLength % 4 + 12;
				const pzHead = Module._sqlite3_malloc(allocSize);
				const pzEnd = pzHead + utf8.byteLength + 1;
				onFinally.push(() => Module._sqlite3_free(pzHead));
				Module.HEAPU8.set(utf8, pzHead);
				Module.HEAPU8[pzEnd - 1] = 0;
				const pStmt = pzHead + allocSize - 8;
				const pzTail = pzHead + allocSize - 4;
				let stmt;
				function maybeFinalize() {
					if (stmt && !options.unscoped) sqlite3.finalize(stmt);
					stmt = 0;
				}
				onFinally.push(maybeFinalize);
				Module.setValue(pzTail, pzHead, "*");
				do {
					maybeFinalize();
					const zTail = Module.getValue(pzTail, "*");
					const rc = await retry(() => {
						return prepare(db, zTail, pzEnd - pzTail, options.flags || 0, pStmt, pzTail);
					});
					if (rc !== 0) check("sqlite3_prepare_v3", rc, db);
					stmt = Module.getValue(pStmt, "*");
					if (stmt) {
						mapStmtToDB.set(stmt, db);
						yield stmt;
					}
				} while (stmt);
			} finally {
				while (onFinally.length) onFinally.pop()();
			}
		})();
	};
	sqlite3.step = (function() {
		const fname = "sqlite3_step";
		const f = Module.cwrap(fname, ...decl("n:n"), { async });
		return async function(stmt) {
			verifyStatement(stmt);
			return check(fname, await retry(() => f(stmt)), mapStmtToDB.get(stmt), [100, 101]);
		};
	})();
	sqlite3.commit_hook = function(db, xCommitHook) {
		verifyDatabase(db);
		Module.commit_hook(db, xCommitHook);
	};
	sqlite3.update_hook = function(db, xUpdateHook) {
		verifyDatabase(db);
		function cvtArgs(iUpdateType, dbName, tblName, lo32, hi32) {
			return [
				iUpdateType,
				Module.UTF8ToString(dbName),
				Module.UTF8ToString(tblName),
				cvt32x2ToBigInt(lo32, hi32)
			];
		}
		function adapt(f) {
			return f instanceof AsyncFunction ? (async (iUpdateType, dbName, tblName, lo32, hi32) => f(...cvtArgs(iUpdateType, dbName, tblName, lo32, hi32))) : ((iUpdateType, dbName, tblName, lo32, hi32) => f(...cvtArgs(iUpdateType, dbName, tblName, lo32, hi32)));
		}
		Module.update_hook(db, adapt(xUpdateHook));
	};
	sqlite3.value = function(pValue) {
		const type = sqlite3.value_type(pValue);
		switch (type) {
			case 4: return sqlite3.value_blob(pValue);
			case 2: return sqlite3.value_double(pValue);
			case 1: return cvt32x2AsSafe(sqlite3.value_int(pValue), Module.getTempRet0());
			case 5: return null;
			case 3: return sqlite3.value_text(pValue);
			default: throw new SQLiteError("unknown type", type);
		}
	};
	sqlite3.value_blob = (function() {
		const f = Module.cwrap("sqlite3_value_blob", ...decl("n:n"));
		return function(pValue) {
			const nBytes = sqlite3.value_bytes(pValue);
			const address = f(pValue);
			return Module.HEAPU8.subarray(address, address + nBytes);
		};
	})();
	sqlite3.value_bytes = (function() {
		const f = Module.cwrap("sqlite3_value_bytes", ...decl("n:n"));
		return function(pValue) {
			return f(pValue);
		};
	})();
	sqlite3.value_double = (function() {
		const f = Module.cwrap("sqlite3_value_double", ...decl("n:n"));
		return function(pValue) {
			return f(pValue);
		};
	})();
	sqlite3.value_int = (function() {
		const f = Module.cwrap("sqlite3_value_int64", ...decl("n:n"));
		return function(pValue) {
			return f(pValue);
		};
	})();
	sqlite3.value_int64 = (function() {
		const f = Module.cwrap("sqlite3_value_int64", ...decl("n:n"));
		return function(pValue) {
			return cvt32x2ToBigInt(f(pValue), Module.getTempRet0());
		};
	})();
	sqlite3.value_text = (function() {
		const f = Module.cwrap("sqlite3_value_text", ...decl("n:s"));
		return function(pValue) {
			return f(pValue);
		};
	})();
	sqlite3.value_type = (function() {
		const f = Module.cwrap("sqlite3_value_type", ...decl("n:n"));
		return function(pValue) {
			return f(pValue);
		};
	})();
	sqlite3.vfs_register = function(vfs, makeDefault) {
		return check("sqlite3_vfs_register", Module.vfs_register(vfs, makeDefault));
	};
	function check(fname, result, db = null, allowed = [0]) {
		if (allowed.includes(result)) return result;
		throw new SQLiteError(db ? Module.ccall("sqlite3_errmsg", "string", ["number"], [db]) : fname, result);
	}
	async function retry(f) {
		let rc;
		for (let retryCount = 0; retryCount < 2; ++retryCount) {
			if (Module.retryOps.length) try {
				await Promise.all(Module.retryOps);
			} finally {
				Module.retryOps = [];
			}
			rc = await f();
			if (rc === 0 || Module.retryOps.length === 0) {
				if (Module.pendingOps.length) try {
					await Promise.all(Module.pendingOps);
				} catch (e) {
					console.error("Error in pendingOps:", e);
					return e.code || 1;
				} finally {
					Module.pendingOps = [];
				}
				return rc;
			}
		}
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
	for (let c of m[1]) switch (c) {
		case "n":
			args.push("number");
			break;
		case "s":
			args.push("string");
			break;
	}
	result.push(args);
	return result;
}
async function check(code) {
	if (await code !== 0) throw new Error(`Error code: ${await code}`);
}
function ignoredDataView() {
	return /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(4));
}
async function getHandle(vfs, path, create) {
	let root;
	if (vfs.releaser instanceof FileSystemDirectoryHandle) [root] = await vfs.getPathComponents(path, create);
	else root = await navigator.storage.getDirectory();
	return await root.getFileHandle(path, { create });
}
function isFsHandleVFS(vfs) {
	return "releaser" in vfs;
}
function dumpVFS(vfs, path, onDone) {
	const cleanupTasks = [];
	let resolve;
	let reject;
	new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	}).finally(async () => {
		while (cleanupTasks.length) await cleanupTasks.pop()();
		onDone?.(vfs, path);
	});
	const fileId = Math.floor(Math.random() * 4294967296);
	let iOffset = 0;
	let bytesRemaining = 0;
	return new ReadableStream({
		async start(controller) {
			try {
				await check(vfs.jOpen(path, fileId, 257, ignoredDataView()));
				cleanupTasks.push(() => vfs.jClose(fileId));
				await check(vfs.jLock(fileId, 1));
				cleanupTasks.push(() => vfs.jUnlock(fileId, 0));
				const fileSize = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(8));
				await check(vfs.jFileSize(fileId, fileSize));
				bytesRemaining = Number(fileSize.getBigUint64(0, true));
			} catch (e) {
				controller.error(e);
				reject(e);
			}
		},
		async pull(controller) {
			if (bytesRemaining === 0) {
				controller.close();
				resolve();
				return;
			}
			try {
				const chunkSize = Math.min(bytesRemaining, 65536);
				const buffer = new Uint8Array(chunkSize);
				await check(vfs.jRead(fileId, buffer, iOffset));
				controller.enqueue(buffer);
				iOffset += chunkSize;
				bytesRemaining -= chunkSize;
				if (bytesRemaining === 0) {
					controller.close();
					resolve();
				}
			} catch (e) {
				controller.error(e);
				reject(e);
			}
		},
		cancel(reason) {
			reject(new Error(reason));
		}
	});
}
async function exportDatabaseFromIDB(vfs, path) {
	const stream = dumpVFS(vfs, path);
	const chunks = [];
	const reader = stream.getReader();
	let totalLength = 0;
	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			chunks.push(value);
			totalLength += value.length;
		}
	} finally {
		reader.releaseLock();
	}
	const result = new Uint8Array(totalLength);
	let position = 0;
	for (const chunk of chunks) {
		result.set(chunk, position);
		position += chunk.length;
	}
	return result;
}
async function exportDatabaseFromFsHandle(vfs, path) {
	return await getHandle(vfs, path).then((handle) => handle.getFile()).then((file) => file.arrayBuffer()).then((buf) => new Uint8Array(buf));
}
/**
* Export database to `Uint8Array`
* @param vfs SQLite VFS
* @param path database path
*/
async function exportDatabase(vfs, path) {
	return isFsHandleVFS(vfs) ? await exportDatabaseFromFsHandle(vfs, path) : await exportDatabaseFromIDB(vfs, path);
}
async function parseHeaderAndVerify(reader) {
	const headerData = await readExactBytes(reader, 32);
	for (let i = 0; i < SQLITE_BINARY_HEADER.length; i++) if (headerData[i] !== SQLITE_BINARY_HEADER[i]) throw new Error("Not a SQLite database file");
	return headerData;
}
async function readExactBytes(reader, size) {
	const result = new Uint8Array(size);
	let offset = 0;
	while (offset < size) {
		const { done, value } = await reader.read();
		if (done) throw new Error("Unexpected EOF");
		const bytesToCopy = Math.min(size - offset, value.length);
		result.set(value.subarray(0, bytesToCopy), offset);
		offset += bytesToCopy;
	}
	return result;
}
async function* pagify(stream) {
	const reader = stream.getReader();
	try {
		const headerData = await parseHeaderAndVerify(reader);
		const view = new DataView(headerData.buffer);
		const rawPageSize = view.getUint16(16);
		const pageSize = rawPageSize === 1 ? 65536 : rawPageSize;
		const pageCount = view.getUint32(28);
		for (let i = 0; i < pageCount; i++) yield await readExactBytes(reader, pageSize);
		const { done } = await reader.read();
		if (!done) throw new Error("Unexpected data after last page");
	} finally {
		reader.releaseLock();
	}
}
async function importDatabaseToIdb(vfs, path, stream) {
	const onFinally = [];
	try {
		const fileId = 1234;
		await check(vfs.jOpen(path, fileId, 262, ignoredDataView()));
		onFinally.push(() => vfs.jClose(fileId));
		await check(vfs.jLock(fileId, 1));
		onFinally.push(() => vfs.jUnlock(fileId, 0));
		await check(vfs.jLock(fileId, 2));
		onFinally.push(() => vfs.jUnlock(fileId, 1));
		await check(vfs.jLock(fileId, 4));
		const ignored = ignoredDataView();
		await vfs.jFileControl(fileId, 31, ignored);
		await check(vfs.jTruncate(fileId, 0));
		let iOffset = 0;
		for await (const page of pagify(stream)) {
			await check(vfs.jWrite(fileId, page, iOffset));
			iOffset += page.byteLength;
		}
		await vfs.jFileControl(fileId, 32, ignored);
		await vfs.jFileControl(fileId, 21, ignored);
		await vfs.jSync(fileId, 2);
	} finally {
		while (onFinally.length) await onFinally.pop()();
	}
}
async function importDatabaseToFsHandle(vfs, path, stream) {
	const handle = await getHandle(vfs, path, true);
	const [verifyStream, dataStream] = stream.tee();
	const verifyReader = verifyStream.getReader();
	try {
		await parseHeaderAndVerify(verifyReader);
	} finally {
		verifyReader.releaseLock();
	}
	const writable = await handle.createWritable();
	await dataStream.pipeTo(writable);
}
/**
* Import database from `File` or `ReadableStream`
* @param vfs SQLite VFS
* @param path db path
* @param data existing database
*/
async function importDatabase(vfs, path, data) {
	const stream = data instanceof globalThis.File ? data.stream() : data;
	if (isFsHandleVFS(vfs)) await importDatabaseToFsHandle(vfs, path, stream);
	else await importDatabaseToIdb(vfs, path, stream);
}
/**
* check if IndexedDB and Web Locks API supported
*/
function isIdbSupported() {
	return "locks" in navigator;
}
/**
* check if [OPFS SyncAccessHandle](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemSyncAccessHandle) supported
*/
async function isOpfsSupported() {
	const inner = () => new Promise((resolve) => {
		if (typeof navigator?.storage?.getDirectory !== "function") {
			resolve(false);
			return;
		}
		navigator.storage.getDirectory().then((root) => {
			if (!root) {
				resolve(false);
				return;
			}
			root.getFileHandle("_CHECK", { create: true }).then((handle) => handle.createSyncAccessHandle()).then((access) => (access.close(), root.removeEntry("_CHECK"))).then(() => resolve(true)).catch(() => root.removeEntry("_CHECK").then(() => resolve(false)).catch(() => resolve(false)));
		}).catch(() => resolve(false));
	});
	if ("importScripts" in globalThis) return await inner();
	try {
		if (typeof Worker === "undefined" || typeof Promise === "undefined") return false;
		const url = URL.createObjectURL(new Blob([`(${inner})().then(postMessage)`], { type: "text/javascript" }));
		const worker = new Worker(url);
		const result = await new Promise((resolve, reject) => {
			worker.onmessage = ({ data }) => resolve(data);
			worker.onerror = (err) => (err.preventDefault(), reject(false));
		});
		worker.terminate();
		URL.revokeObjectURL(url);
		return result;
	} catch {
		return false;
	}
}
/**
* check if OPFS [`readwrite-unsafe`](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle/createSyncAccessHandle#mode) locking mode is supported,
* required by {@link useOpfsWriteAheadStorage}
*
* **MUST RUN IN WEB WORKER**
*
* [minimal browser version](https://caniuse.com/mdn-api_filesystemsyncaccesshandle_mode_readwrite-unsafe)
*/
async function isOpfsReadWriteUnsafeSupported() {
	if (typeof navigator?.storage?.getDirectory !== "function") return false;
	try {
		const root = await navigator.storage.getDirectory();
		(await (await root.getFileHandle("_CHECK_RWU", { create: true })).createSyncAccessHandle({ mode: "readwrite-unsafe" })).close();
		await root.removeEntry("_CHECK_RWU");
		return true;
	} catch {
		try {
			await (await navigator.storage.getDirectory()).removeEntry("_CHECK_RWU");
		} catch {}
		return false;
	}
}
/**
* check `new Worker(url, { type: 'module' })` support
*
* {@link https://stackoverflow.com/questions/62954570/javascript-feature-detect-module-support-for-web-workers Reference}
*/
function isModuleWorkerSupport() {
	let supports = false;
	const url = URL.createObjectURL(new Blob([""], { type: "text/javascript" }));
	try {
		new Worker(url, { get type() {
			supports = true;
		} }).terminate();
	} finally {
		URL.revokeObjectURL(url);
		return supports;
	}
}
/**
* Create custom function, run js script in SQLite
*
* @example
* ```ts
* import { customFunction, initSQLite, isOpfsSupported } from '@subframe7536/sqlite-wasm'
* import { useOpfsStorage } from '@subframe7536/sqlite-wasm/opfs'
* import { uuidv7 } from 'uuidv7'
*
* const { run, sqlite, db } = await initSQLite(
*   useOpfsStorage('test')
* )
* customFunction(sqlite, db, 'uuidv7', () => uuidv7())
* console.log(await run('select uuidv7() as a'))
* // [{ "a": "01932f1b-b663-7714-af4d-17a3d9efc7b3" }]
* ```
*/
function customFunction(sqlite, db, fnName, fn, options = {}) {
	let flags = 1;
	if (options.deterministic) flags |= SQLITE_DETERMINISTIC$1;
	if (options.directOnly) flags |= SQLITE_DIRECTONLY$1;
	sqlite.create_function(db, fnName, options.varargs || fn.length === 0 ? -1 : fn.length, flags, 0, (ctx, value) => {
		const args = [];
		for (let i = 0; i < fn.length; i++) args.push(sqlite.value(value[i]));
		return sqlite.result(ctx, fn(...args));
	});
}
function customFunctionCore(core, fnName, fn, options = {}) {
	return customFunction(core.sqlite, core.db, fnName, fn, options);
}
/**
* Parse options with existing database
* @param data database File or ReadableStream
* @param options extra options
* @example
* ```ts
* import { initSQLite, withExistDB } from '@subframe7536/sqlite-wasm'
* import { useIdbStorage } from '@subframe7536/sqlite-wasm/idb'
*
* const db = initSQLite(
*   useIdbStorage('test.db', withExistDB(FileOrReadableStream, { url }))
* )
* ```
*/
function withExistDB(data, options) {
	return {
		...options,
		beforeOpen: (vfs, path) => importDatabase(vfs, path, data)
	};
}
async function close(core) {
	await core.sqlite.close(core.pointer);
}
function changes(core) {
	return core.sqliteModule._sqlite3_changes(core.pointer);
}
function lastInsertRowId(core) {
	return core.sqliteModule._sqlite3_last_insert_rowid(core.pointer);
}
async function stream(core, onData, sql, parameters) {
	const { sqlite, pointer } = core;
	for await (const stmt of sqlite.statements(pointer, sql)) {
		if (parameters?.length) sqlite.bind_collection(stmt, parameters);
		const cols = sqlite.column_names(stmt);
		while (await sqlite.step(stmt) === 100) {
			const row = sqlite.row(stmt);
			onData(Object.fromEntries(cols.map((key, i) => [key, row[i]])));
		}
	}
}
async function run(core, sql, parameters) {
	const results = [];
	await stream(core, (data) => results.push(data), sql, parameters);
	return results;
}
function createRowMapper(sqlite, stmt) {
	const cols = sqlite.column_names(stmt);
	return (row) => Object.fromEntries(cols.map((key, i) => [key, row[i]]));
}
async function query(core, sql, parameters) {
	const iterator = core.sqlite.statements(core.pointer, sql)[Symbol.asyncIterator]();
	const { value: stmt } = await iterator.next();
	try {
		if (parameters?.length) core.sqlite.bind_collection(stmt, parameters);
		if (core.sqlite.column_count(stmt) === 0) {
			await core.sqlite.step(stmt);
			return [];
		}
		const mapRow = createRowMapper(core.sqlite, stmt);
		const result = [];
		let idx = 0;
		while (await core.sqlite.step(stmt) === 100) result[idx++] = mapRow(core.sqlite.row(stmt));
		return result;
	} finally {
		await iterator.return?.();
	}
}
async function* iterator(core, sql, parameters, chunkSize = 1) {
	const { sqlite, pointer } = core;
	const cache = new Array(chunkSize);
	for await (const stmt of sqlite.statements(pointer, sql)) {
		if (parameters?.length) sqlite.bind_collection(stmt, parameters);
		let idx = 0;
		const mapRow = createRowMapper(core.sqlite, stmt);
		while (1) try {
			const result = await sqlite.step(stmt);
			if (result === 100) {
				cache[idx] = mapRow(core.sqlite.row(stmt));
				if (++idx === chunkSize) {
					for (let i = 0; i < idx; i++) yield cache[i];
					idx = 0;
				}
			} else if (result === 101) {
				if (idx > 0) {
					for (let i = 0; i < idx; i++) yield cache[i];
					idx = 0;
				}
				break;
			}
		} finally {
			if (idx > 0) for (let i = 0; i < idx; i++) yield cache[i];
		}
	}
}
function parseOpenV2Flag(readonly) {
	return readonly ? 1 : 6;
}
async function reopen(core, readonly) {
	await close(core);
	core.pointer = await core.sqlite.open_v2(core.path, parseOpenV2Flag(readonly));
}
/**
* Load SQLite database, presets:
* - `useMemoryStorage`
* - `useIdbStorage`
* - `useIdbMemoryStorage`
* - `useOpfsStorage`
* - `useFsHandleStorage`
* @param options {@link InitSQLiteOptions}
*/
async function initSQLite(options) {
	const core = await initSQLiteCore(options);
	return {
		...core,
		changes: () => changes(core),
		close: () => close(core),
		dump: () => exportDatabase(core.vfs, core.path),
		lastInsertRowId: () => lastInsertRowId(core),
		run: (...args) => run(core, ...args),
		stream: (...args) => stream(core, ...args),
		sync: (data) => importDatabase(core.vfs, core.path, data)
	};
}
/**
* Load SQLite database without utils
*
* Presets: `useMemoryStorage`, `useIdbStorage`, `useOpfsStorage`
* @param options {@link InitSQLiteOptions}
*/
async function initSQLiteCore(options) {
	const { path, sqliteModule, vfsFn, vfsOptions, readonly, beforeOpen } = await options;
	const sqlite = Factory(sqliteModule);
	const vfs = await vfsFn(path, sqliteModule, vfsOptions);
	sqlite.vfs_register(vfs, true);
	await beforeOpen?.(vfs, path);
	const pointer = await sqlite.open_v2(path, parseOpenV2Flag(readonly));
	return {
		db: pointer,
		path,
		pointer,
		sqlite,
		sqliteModule,
		vfs
	};
}
/**
* Store data in memory,
* use `MemoryVFS` with `wa-sqlite.wasm`,
* no data persistence
* @param options options
* @example
* ```ts
* import { initSQLite, isOpfsSupported, useMemoryStorage } from '@subframe7536/sqlite-wasm'
*
* // optional url
* const url = 'https://cdn.jsdelivr.net/npm/@subframe7536/sqlite-wasm@0.5.0/wa-sqlite.wasm'
* const url1 = 'https://cdn.jsdelivr.net/gh/subframe7536/sqlite-wasm@v0.5.0/wa-sqlite-fts5/wa-sqlite.wasm'
*
* const { run, changes, lastInsertRowId, close } = await initSQLite(
*   useMemoryStorage({ url })
* )
* ```
*/
async function useMemoryStorage(options = {}) {
	const { url, ...rest } = options;
	return {
		path: ":memory:",
		sqliteModule: await Module(url ? { locateFile: () => url } : void 0),
		vfsFn: MemoryVFS.create,
		...rest
	};
}
var MAX_INT64, MIN_INT64, AsyncFunction, SQLiteError, async, SQLITE_BINARY_HEADER, MemoryVFS;
var init_dist$1 = __esmMin((() => {
	init_FacadeVFS_XQtZprLW();
	init_wa_sqlite_DfKPyFeY();
	init_defineProperty();
	MAX_INT64 = 9223372036854775807n;
	MIN_INT64 = -9223372036854775808n;
	AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
	SQLiteError = class extends Error {
		constructor(message, code) {
			super(message);
			this.code = code;
		}
	};
	async = true;
	SQLITE_BINARY_HEADER = new Uint8Array([
		83,
		81,
		76,
		105,
		116,
		101,
		32,
		102,
		111,
		114,
		109,
		97,
		116,
		32,
		51,
		0
	]);
	MemoryVFS = class MemoryVFS extends FacadeVFS {
		static async create(name, module) {
			const vfs = new MemoryVFS(name, module);
			await vfs.isReady();
			return vfs;
		}
		constructor(name, module) {
			super(name, module);
			_defineProperty(this, "mapNameToFile", /* @__PURE__ */ new Map());
			_defineProperty(this, "mapIdToFile", /* @__PURE__ */ new Map());
		}
		close() {
			for (const fileId of this.mapIdToFile.keys()) this.jClose(fileId);
		}
		/**
		* @param {string?} filename 
		* @param {number} fileId 
		* @param {number} flags 
		* @param {DataView} pOutFlags 
		* @returns {number|Promise<number>}
		*/
		jOpen(filename, fileId, flags, pOutFlags) {
			const pathname = new URL(filename || Math.random().toString(36).slice(2), "file://").pathname;
			let file = this.mapNameToFile.get(pathname);
			if (!file) if (flags & 4) {
				file = {
					pathname,
					flags,
					size: 0,
					data: /* @__PURE__ */ new ArrayBuffer(0)
				};
				this.mapNameToFile.set(pathname, file);
			} else return 14;
			this.mapIdToFile.set(fileId, file);
			pOutFlags.setInt32(0, flags, true);
			return 0;
		}
		/**
		* @param {number} fileId 
		* @returns {number|Promise<number>}
		*/
		jClose(fileId) {
			const file = this.mapIdToFile.get(fileId);
			this.mapIdToFile.delete(fileId);
			if (file.flags & 8) this.mapNameToFile.delete(file.pathname);
			return 0;
		}
		/**
		* @param {number} fileId 
		* @param {Uint8Array} pData 
		* @param {number} iOffset
		* @returns {number|Promise<number>}
		*/
		jRead(fileId, pData, iOffset) {
			const file = this.mapIdToFile.get(fileId);
			const bgn = Math.min(iOffset, file.size);
			const nBytes = Math.min(iOffset + pData.byteLength, file.size) - bgn;
			if (nBytes) pData.set(new Uint8Array(file.data, bgn, nBytes));
			if (nBytes < pData.byteLength) {
				pData.fill(0, nBytes);
				return 522;
			}
			return 0;
		}
		/**
		* @param {number} fileId 
		* @param {Uint8Array} pData 
		* @param {number} iOffset
		* @returns {number|Promise<number>}
		*/
		jWrite(fileId, pData, iOffset) {
			const file = this.mapIdToFile.get(fileId);
			if (iOffset + pData.byteLength > file.data.byteLength) {
				const newSize = Math.max(iOffset + pData.byteLength, 2 * file.data.byteLength);
				const data = new ArrayBuffer(newSize);
				new Uint8Array(data).set(new Uint8Array(file.data, 0, file.size));
				file.data = data;
			}
			new Uint8Array(file.data, iOffset, pData.byteLength).set(pData.subarray());
			file.size = Math.max(file.size, iOffset + pData.byteLength);
			return 0;
		}
		/**
		* @param {number} fileId 
		* @param {number} iSize 
		* @returns {number|Promise<number>}
		*/
		jTruncate(fileId, iSize) {
			const file = this.mapIdToFile.get(fileId);
			file.size = Math.min(file.size, iSize);
			return 0;
		}
		/**
		* @param {number} fileId 
		* @param {DataView} pSize64 
		* @returns {number|Promise<number>}
		*/
		jFileSize(fileId, pSize64) {
			const file = this.mapIdToFile.get(fileId);
			pSize64.setBigInt64(0, BigInt(file.size), true);
			return 0;
		}
		/**
		* @param {string} name 
		* @param {number} syncDir 
		* @returns {number|Promise<number>}
		*/
		jDelete(name, syncDir) {
			const pathname = new URL(name, "file://").pathname;
			this.mapNameToFile.delete(pathname);
			return 0;
		}
		/**
		* @param {string} name 
		* @param {number} flags 
		* @param {DataView} pResOut 
		* @returns {number|Promise<number>}
		*/
		jAccess(name, flags, pResOut) {
			const pathname = new URL(name, "file://").pathname;
			const file = this.mapNameToFile.get(pathname);
			pResOut.setInt32(0, file ? 1 : 0, true);
			return 0;
		}
	};
}));
//#endregion
//#region ../packages/dialect-generic-sqlite/dist/utils-8n2Z7a5w.cjs
var require_utils_8n2Z7a5w = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Create generic message handler
	* @param init Function that init sqlite executor
	* @param post Function that post message to main thread
	* @param message Handle custom messages. If returning data is not `undefined` and `null`, it will be set as second element of first param
	*/
	function createGenericOnMessageCallback(init, post, message) {
		let db;
		return async ([type, data1, data2, data3, data4, data5]) => {
			const ret = [
				type,
				null,
				null,
				null
			];
			try {
				switch (type) {
					case "0":
						db = await init(data1);
						break;
					case "1":
						ret[1] = data1;
						ret[2] = await db.query(data2, data3, data4);
						break;
					case "2":
						await db.close();
						break;
					case "3": {
						if (!db.iterator) throw new Error("streamQuery() is not supported.");
						const it = db.iterator(data2, data3, data4, data5);
						for await (const row of it) post([
							type,
							data1,
							row,
							null
						]);
						ret[0] = "4";
						ret[1] = data1;
						break;
					}
					default: if (message) {
						const data = await message(db, type, data1, data2, data3, data4);
						if (data !== void 0 && data !== null) ret[2] = data;
					}
				}
			} catch (error) {
				ret[3] = error;
			}
			post(ret);
		};
	}
	async function access(data) {
		return typeof data === "function" ? await data() : data;
	}
	Object.defineProperty(exports, "access", {
		enumerable: true,
		get: function() {
			return access;
		}
	});
	Object.defineProperty(exports, "createGenericOnMessageCallback", {
		enumerable: true,
		get: function() {
			return createGenericOnMessageCallback;
		}
	});
}));
//#endregion
//#region ../packages/dialect-generic-sqlite/dist/worker-helper-web.cjs
var require_worker_helper_web = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
	const require_utils = require_utils_8n2Z7a5w();
	function createWebOnMessageCallback(init, message) {
		const cb = require_utils.createGenericOnMessageCallback(init, (value) => globalThis.postMessage(value), message);
		globalThis.onmessage = ({ data }) => cb(data);
	}
	/**
	* Util for handle web worker message in main thread
	*/
	const handleWebWorker = (worker, cb) => worker.onmessage = ({ data }) => cb(data);
	/**
	* Create worker executor for web
	* @param config {@link IWebWorkerDialectConfig}
	* @example
	* You can also manually create executor for web worker:
	* ```ts
	* import { GenericSqliteWorkerDialect } from 'kysely-generic-sqlite/worker'
	* import { handleWebWorker } from 'kysely-generic-sqlite/worker-helper-web'
	* import { mitt } from 'zen-mitt'
	*
	* const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })
	* const dialect = new GenericSqliteWorkerDialect(
	*   () => {
	*     worker,
	*     mitt: mitt(),
	*     handle: handleWebWorker,
	*   }),
	* )
	* ```
	*/
	function createWebWorkerExecutor(config) {
		const { worker, ...rest } = config;
		return async () => ({
			...rest,
			worker: await require_utils.access(worker),
			handle: handleWebWorker
		});
	}
	exports.createWebOnMessageCallback = createWebOnMessageCallback;
	exports.createWebWorkerExecutor = createWebWorkerExecutor;
	exports.handleWebWorker = handleWebWorker;
}));
//#endregion
//#region ../node_modules/.pnpm/@subframe7536+sqlite-wasm@1.3.0/node_modules/@subframe7536/sqlite-wasm/dist/constant.js
var constant_exports = /* @__PURE__ */ __exportAll({
	SQLITE_ABORT: () => 4,
	SQLITE_ACCESS_EXISTS: () => 0,
	SQLITE_ACCESS_READ: () => 2,
	SQLITE_ACCESS_READWRITE: () => 1,
	SQLITE_ALTER_TABLE: () => 26,
	SQLITE_ANALYZE: () => 28,
	SQLITE_ATTACH: () => 24,
	SQLITE_AUTH: () => 23,
	SQLITE_BLOB: () => 4,
	SQLITE_BUSY: () => 5,
	SQLITE_CANTOPEN: () => 14,
	SQLITE_CONSTRAINT: () => 19,
	SQLITE_CONSTRAINT_CHECK: () => 275,
	SQLITE_CONSTRAINT_COMMITHOOK: () => 531,
	SQLITE_CONSTRAINT_FOREIGNKEY: () => 787,
	SQLITE_CONSTRAINT_FUNCTION: () => SQLITE_CONSTRAINT_FUNCTION,
	SQLITE_CONSTRAINT_NOTNULL: () => SQLITE_CONSTRAINT_NOTNULL,
	SQLITE_CONSTRAINT_PINNED: () => SQLITE_CONSTRAINT_PINNED,
	SQLITE_CONSTRAINT_PRIMARYKEY: () => SQLITE_CONSTRAINT_PRIMARYKEY,
	SQLITE_CONSTRAINT_ROWID: () => SQLITE_CONSTRAINT_ROWID,
	SQLITE_CONSTRAINT_TRIGGER: () => SQLITE_CONSTRAINT_TRIGGER,
	SQLITE_CONSTRAINT_UNIQUE: () => SQLITE_CONSTRAINT_UNIQUE,
	SQLITE_CONSTRAINT_VTAB: () => SQLITE_CONSTRAINT_VTAB,
	SQLITE_COPY: () => 0,
	SQLITE_CORRUPT: () => 11,
	SQLITE_CREATE_INDEX: () => 1,
	SQLITE_CREATE_TABLE: () => 2,
	SQLITE_CREATE_TEMP_INDEX: () => 3,
	SQLITE_CREATE_TEMP_TABLE: () => 4,
	SQLITE_CREATE_TEMP_TRIGGER: () => 5,
	SQLITE_CREATE_TEMP_VIEW: () => 6,
	SQLITE_CREATE_TRIGGER: () => 7,
	SQLITE_CREATE_VIEW: () => 8,
	SQLITE_CREATE_VTABLE: () => 29,
	SQLITE_DELETE: () => 9,
	SQLITE_DENY: () => 1,
	SQLITE_DETACH: () => 25,
	SQLITE_DETERMINISTIC: () => SQLITE_DETERMINISTIC,
	SQLITE_DIRECTONLY: () => SQLITE_DIRECTONLY,
	SQLITE_DONE: () => 101,
	SQLITE_DROP_INDEX: () => 10,
	SQLITE_DROP_TABLE: () => 11,
	SQLITE_DROP_TEMP_INDEX: () => 12,
	SQLITE_DROP_TEMP_TABLE: () => 13,
	SQLITE_DROP_TEMP_TRIGGER: () => 14,
	SQLITE_DROP_TEMP_VIEW: () => 15,
	SQLITE_DROP_TRIGGER: () => 16,
	SQLITE_DROP_VIEW: () => 17,
	SQLITE_DROP_VTABLE: () => 30,
	SQLITE_EMPTY: () => 16,
	SQLITE_ERROR: () => 1,
	SQLITE_FCNTL_BEGIN_ATOMIC_WRITE: () => 31,
	SQLITE_FCNTL_BUSYHANDLER: () => 15,
	SQLITE_FCNTL_CHUNK_SIZE: () => 6,
	SQLITE_FCNTL_CKPT_DONE: () => 37,
	SQLITE_FCNTL_CKPT_START: () => 39,
	SQLITE_FCNTL_COMMIT_ATOMIC_WRITE: () => 32,
	SQLITE_FCNTL_COMMIT_PHASETWO: () => 22,
	SQLITE_FCNTL_DATA_VERSION: () => 35,
	SQLITE_FCNTL_FILE_POINTER: () => 7,
	SQLITE_FCNTL_GET_LOCKPROXYFILE: () => 2,
	SQLITE_FCNTL_HAS_MOVED: () => 20,
	SQLITE_FCNTL_JOURNAL_POINTER: () => 28,
	SQLITE_FCNTL_LAST_ERRNO: () => 4,
	SQLITE_FCNTL_LOCKSTATE: () => 1,
	SQLITE_FCNTL_LOCK_TIMEOUT: () => 34,
	SQLITE_FCNTL_MMAP_SIZE: () => 18,
	SQLITE_FCNTL_OVERWRITE: () => 11,
	SQLITE_FCNTL_PDB: () => 30,
	SQLITE_FCNTL_PERSIST_WAL: () => 10,
	SQLITE_FCNTL_POWERSAFE_OVERWRITE: () => 13,
	SQLITE_FCNTL_PRAGMA: () => 14,
	SQLITE_FCNTL_RBU: () => 26,
	SQLITE_FCNTL_RESERVE_BYTES: () => 38,
	SQLITE_FCNTL_ROLLBACK_ATOMIC_WRITE: () => 33,
	SQLITE_FCNTL_SET_LOCKPROXYFILE: () => 3,
	SQLITE_FCNTL_SIZE_HINT: () => 5,
	SQLITE_FCNTL_SIZE_LIMIT: () => 36,
	SQLITE_FCNTL_SYNC: () => 21,
	SQLITE_FCNTL_SYNC_OMITTED: () => 8,
	SQLITE_FCNTL_TEMPFILENAME: () => 16,
	SQLITE_FCNTL_TRACE: () => 19,
	SQLITE_FCNTL_VFSNAME: () => 12,
	SQLITE_FCNTL_VFS_POINTER: () => 27,
	SQLITE_FCNTL_WAL_BLOCK: () => 24,
	SQLITE_FCNTL_WIN32_AV_RETRY: () => 9,
	SQLITE_FCNTL_WIN32_GET_HANDLE: () => 29,
	SQLITE_FCNTL_WIN32_SET_HANDLE: () => 23,
	SQLITE_FCNTL_ZIPVFS: () => 25,
	SQLITE_FLOAT: () => 2,
	SQLITE_FORMAT: () => 24,
	SQLITE_FULL: () => 13,
	SQLITE_FUNCTION: () => 31,
	SQLITE_IGNORE: () => 2,
	SQLITE_INDEX_CONSTRAINT_EQ: () => 2,
	SQLITE_INDEX_CONSTRAINT_FUNCTION: () => 150,
	SQLITE_INDEX_CONSTRAINT_GE: () => 32,
	SQLITE_INDEX_CONSTRAINT_GLOB: () => 66,
	SQLITE_INDEX_CONSTRAINT_GT: () => 4,
	SQLITE_INDEX_CONSTRAINT_IS: () => 72,
	SQLITE_INDEX_CONSTRAINT_ISNOT: () => 69,
	SQLITE_INDEX_CONSTRAINT_ISNOTNULL: () => 70,
	SQLITE_INDEX_CONSTRAINT_ISNULL: () => 71,
	SQLITE_INDEX_CONSTRAINT_LE: () => 8,
	SQLITE_INDEX_CONSTRAINT_LIKE: () => 65,
	SQLITE_INDEX_CONSTRAINT_LT: () => 16,
	SQLITE_INDEX_CONSTRAINT_MATCH: () => 64,
	SQLITE_INDEX_CONSTRAINT_NE: () => 68,
	SQLITE_INDEX_CONSTRAINT_REGEXP: () => 67,
	SQLITE_INDEX_SCAN_UNIQUE: () => 1,
	SQLITE_INNOCUOUS: () => SQLITE_INNOCUOUS,
	SQLITE_INSERT: () => 18,
	SQLITE_INTEGER: () => 1,
	SQLITE_INTERNAL: () => 2,
	SQLITE_INTERRUPT: () => 9,
	SQLITE_IOCAP_ATOMIC: () => 1,
	SQLITE_IOCAP_ATOMIC16K: () => 64,
	SQLITE_IOCAP_ATOMIC1K: () => 4,
	SQLITE_IOCAP_ATOMIC2K: () => 8,
	SQLITE_IOCAP_ATOMIC32K: () => 128,
	SQLITE_IOCAP_ATOMIC4K: () => 16,
	SQLITE_IOCAP_ATOMIC512: () => 2,
	SQLITE_IOCAP_ATOMIC64K: () => 256,
	SQLITE_IOCAP_ATOMIC8K: () => 32,
	SQLITE_IOCAP_BATCH_ATOMIC: () => SQLITE_IOCAP_BATCH_ATOMIC,
	SQLITE_IOCAP_IMMUTABLE: () => SQLITE_IOCAP_IMMUTABLE,
	SQLITE_IOCAP_POWERSAFE_OVERWRITE: () => SQLITE_IOCAP_POWERSAFE_OVERWRITE,
	SQLITE_IOCAP_SAFE_APPEND: () => 512,
	SQLITE_IOCAP_SEQUENTIAL: () => SQLITE_IOCAP_SEQUENTIAL,
	SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN: () => SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN,
	SQLITE_IOERR: () => 10,
	SQLITE_IOERR_ACCESS: () => SQLITE_IOERR_ACCESS,
	SQLITE_IOERR_BEGIN_ATOMIC: () => SQLITE_IOERR_BEGIN_ATOMIC,
	SQLITE_IOERR_CHECKRESERVEDLOCK: () => SQLITE_IOERR_CHECKRESERVEDLOCK,
	SQLITE_IOERR_CLOSE: () => SQLITE_IOERR_CLOSE,
	SQLITE_IOERR_COMMIT_ATOMIC: () => SQLITE_IOERR_COMMIT_ATOMIC,
	SQLITE_IOERR_DATA: () => SQLITE_IOERR_DATA,
	SQLITE_IOERR_DELETE: () => SQLITE_IOERR_DELETE,
	SQLITE_IOERR_DELETE_NOENT: () => SQLITE_IOERR_DELETE_NOENT,
	SQLITE_IOERR_DIR_FSYNC: () => SQLITE_IOERR_DIR_FSYNC,
	SQLITE_IOERR_FSTAT: () => SQLITE_IOERR_FSTAT,
	SQLITE_IOERR_FSYNC: () => SQLITE_IOERR_FSYNC,
	SQLITE_IOERR_GETTEMPPATH: () => SQLITE_IOERR_GETTEMPPATH,
	SQLITE_IOERR_LOCK: () => SQLITE_IOERR_LOCK,
	SQLITE_IOERR_NOMEM: () => SQLITE_IOERR_NOMEM,
	SQLITE_IOERR_RDLOCK: () => SQLITE_IOERR_RDLOCK,
	SQLITE_IOERR_READ: () => 266,
	SQLITE_IOERR_ROLLBACK_ATOMIC: () => SQLITE_IOERR_ROLLBACK_ATOMIC,
	SQLITE_IOERR_SEEK: () => SQLITE_IOERR_SEEK,
	SQLITE_IOERR_SHORT_READ: () => 522,
	SQLITE_IOERR_TRUNCATE: () => SQLITE_IOERR_TRUNCATE,
	SQLITE_IOERR_UNLOCK: () => SQLITE_IOERR_UNLOCK,
	SQLITE_IOERR_VNODE: () => SQLITE_IOERR_VNODE,
	SQLITE_IOERR_WRITE: () => 778,
	SQLITE_LIMIT_ATTACHED: () => 7,
	SQLITE_LIMIT_COLUMN: () => 2,
	SQLITE_LIMIT_COMPOUND_SELECT: () => 4,
	SQLITE_LIMIT_EXPR_DEPTH: () => 3,
	SQLITE_LIMIT_FUNCTION_ARG: () => 6,
	SQLITE_LIMIT_LENGTH: () => 0,
	SQLITE_LIMIT_LIKE_PATTERN_LENGTH: () => 8,
	SQLITE_LIMIT_SQL_LENGTH: () => 1,
	SQLITE_LIMIT_TRIGGER_DEPTH: () => 10,
	SQLITE_LIMIT_VARIABLE_NUMBER: () => 9,
	SQLITE_LIMIT_VDBE_OP: () => 5,
	SQLITE_LIMIT_WORKER_THREADS: () => 11,
	SQLITE_LOCKED: () => 6,
	SQLITE_LOCK_EXCLUSIVE: () => 4,
	SQLITE_LOCK_NONE: () => 0,
	SQLITE_LOCK_PENDING: () => 3,
	SQLITE_LOCK_RESERVED: () => 2,
	SQLITE_LOCK_SHARED: () => 1,
	SQLITE_MISMATCH: () => 20,
	SQLITE_MISUSE: () => 21,
	SQLITE_NOLFS: () => 22,
	SQLITE_NOMEM: () => 7,
	SQLITE_NOTADB: () => 26,
	SQLITE_NOTFOUND: () => 12,
	SQLITE_NOTICE: () => 27,
	SQLITE_NULL: () => 5,
	SQLITE_OK: () => 0,
	SQLITE_OPEN_AUTOPROXY: () => 32,
	SQLITE_OPEN_CREATE: () => 4,
	SQLITE_OPEN_DELETEONCLOSE: () => 8,
	SQLITE_OPEN_EXCLUSIVE: () => 16,
	SQLITE_OPEN_FULLMUTEX: () => SQLITE_OPEN_FULLMUTEX,
	SQLITE_OPEN_MAIN_DB: () => 256,
	SQLITE_OPEN_MAIN_JOURNAL: () => SQLITE_OPEN_MAIN_JOURNAL,
	SQLITE_OPEN_MEMORY: () => 128,
	SQLITE_OPEN_NOFOLLOW: () => SQLITE_OPEN_NOFOLLOW,
	SQLITE_OPEN_NOMUTEX: () => SQLITE_OPEN_NOMUTEX,
	SQLITE_OPEN_PRIVATECACHE: () => SQLITE_OPEN_PRIVATECACHE,
	SQLITE_OPEN_READONLY: () => 1,
	SQLITE_OPEN_READWRITE: () => 2,
	SQLITE_OPEN_SHAREDCACHE: () => SQLITE_OPEN_SHAREDCACHE,
	SQLITE_OPEN_SUBJOURNAL: () => SQLITE_OPEN_SUBJOURNAL,
	SQLITE_OPEN_SUPER_JOURNAL: () => SQLITE_OPEN_SUPER_JOURNAL,
	SQLITE_OPEN_TEMP_DB: () => 512,
	SQLITE_OPEN_TEMP_JOURNAL: () => SQLITE_OPEN_TEMP_JOURNAL,
	SQLITE_OPEN_TRANSIENT_DB: () => SQLITE_OPEN_TRANSIENT_DB,
	SQLITE_OPEN_URI: () => 64,
	SQLITE_OPEN_WAL: () => SQLITE_OPEN_WAL,
	SQLITE_PERM: () => 3,
	SQLITE_PRAGMA: () => 19,
	SQLITE_PREPARE_NORMALIZED: () => 2,
	SQLITE_PREPARE_NO_VTAB: () => 4,
	SQLITE_PREPARE_PERSISTENT: () => 1,
	SQLITE_PROTOCOL: () => 15,
	SQLITE_RANGE: () => 25,
	SQLITE_READ: () => 20,
	SQLITE_READONLY: () => 8,
	SQLITE_RECURSIVE: () => 33,
	SQLITE_REINDEX: () => 27,
	SQLITE_ROW: () => 100,
	SQLITE_SAVEPOINT: () => 32,
	SQLITE_SCHEMA: () => 17,
	SQLITE_SELECT: () => 21,
	SQLITE_STATIC: () => 0,
	SQLITE_SUBTYPE: () => SQLITE_SUBTYPE,
	SQLITE_SYNC_DATAONLY: () => 16,
	SQLITE_SYNC_FULL: () => 3,
	SQLITE_SYNC_NORMAL: () => 2,
	SQLITE_TEXT: () => 3,
	SQLITE_TOOBIG: () => 18,
	SQLITE_TRANSACTION: () => 22,
	SQLITE_TRANSIENT: () => -1,
	SQLITE_UPDATE: () => 23,
	SQLITE_UTF16: () => 4,
	SQLITE_UTF16BE: () => 3,
	SQLITE_UTF16LE: () => 2,
	SQLITE_UTF8: () => 1,
	SQLITE_WARNING: () => 28
}), SQLITE_IOERR_ACCESS, SQLITE_IOERR_CHECKRESERVEDLOCK, SQLITE_IOERR_CLOSE, SQLITE_IOERR_DATA, SQLITE_IOERR_DELETE, SQLITE_IOERR_DELETE_NOENT, SQLITE_IOERR_DIR_FSYNC, SQLITE_IOERR_FSTAT, SQLITE_IOERR_FSYNC, SQLITE_IOERR_GETTEMPPATH, SQLITE_IOERR_LOCK, SQLITE_IOERR_NOMEM, SQLITE_IOERR_RDLOCK, SQLITE_IOERR_SEEK, SQLITE_IOERR_TRUNCATE, SQLITE_IOERR_UNLOCK, SQLITE_IOERR_VNODE, SQLITE_IOERR_BEGIN_ATOMIC, SQLITE_IOERR_COMMIT_ATOMIC, SQLITE_IOERR_ROLLBACK_ATOMIC, SQLITE_CONSTRAINT_FUNCTION, SQLITE_CONSTRAINT_NOTNULL, SQLITE_CONSTRAINT_PINNED, SQLITE_CONSTRAINT_PRIMARYKEY, SQLITE_CONSTRAINT_ROWID, SQLITE_CONSTRAINT_TRIGGER, SQLITE_CONSTRAINT_UNIQUE, SQLITE_CONSTRAINT_VTAB, SQLITE_OPEN_TRANSIENT_DB, SQLITE_OPEN_MAIN_JOURNAL, SQLITE_OPEN_TEMP_JOURNAL, SQLITE_OPEN_SUBJOURNAL, SQLITE_OPEN_SUPER_JOURNAL, SQLITE_OPEN_NOMUTEX, SQLITE_OPEN_FULLMUTEX, SQLITE_OPEN_SHAREDCACHE, SQLITE_OPEN_PRIVATECACHE, SQLITE_OPEN_WAL, SQLITE_OPEN_NOFOLLOW, SQLITE_IOCAP_SEQUENTIAL, SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN, SQLITE_IOCAP_POWERSAFE_OVERWRITE, SQLITE_IOCAP_IMMUTABLE, SQLITE_IOCAP_BATCH_ATOMIC, SQLITE_DETERMINISTIC, SQLITE_DIRECTONLY, SQLITE_SUBTYPE, SQLITE_INNOCUOUS;
var init_constant = __esmMin((() => {
	SQLITE_IOERR_ACCESS = 3338;
	SQLITE_IOERR_CHECKRESERVEDLOCK = 3594;
	SQLITE_IOERR_CLOSE = 4106;
	SQLITE_IOERR_DATA = 8202;
	SQLITE_IOERR_DELETE = 2570;
	SQLITE_IOERR_DELETE_NOENT = 5898;
	SQLITE_IOERR_DIR_FSYNC = 1290;
	SQLITE_IOERR_FSTAT = 1802;
	SQLITE_IOERR_FSYNC = 1034;
	SQLITE_IOERR_GETTEMPPATH = 6410;
	SQLITE_IOERR_LOCK = 3850;
	SQLITE_IOERR_NOMEM = 3082;
	SQLITE_IOERR_RDLOCK = 2314;
	SQLITE_IOERR_SEEK = 5642;
	SQLITE_IOERR_TRUNCATE = 1546;
	SQLITE_IOERR_UNLOCK = 2058;
	SQLITE_IOERR_VNODE = 6922;
	SQLITE_IOERR_BEGIN_ATOMIC = 7434;
	SQLITE_IOERR_COMMIT_ATOMIC = 7690;
	SQLITE_IOERR_ROLLBACK_ATOMIC = 7946;
	SQLITE_CONSTRAINT_FUNCTION = 1043;
	SQLITE_CONSTRAINT_NOTNULL = 1299;
	SQLITE_CONSTRAINT_PINNED = 2835;
	SQLITE_CONSTRAINT_PRIMARYKEY = 1555;
	SQLITE_CONSTRAINT_ROWID = 2579;
	SQLITE_CONSTRAINT_TRIGGER = 1811;
	SQLITE_CONSTRAINT_UNIQUE = 2067;
	SQLITE_CONSTRAINT_VTAB = 2323;
	SQLITE_OPEN_TRANSIENT_DB = 1024;
	SQLITE_OPEN_MAIN_JOURNAL = 2048;
	SQLITE_OPEN_TEMP_JOURNAL = 4096;
	SQLITE_OPEN_SUBJOURNAL = 8192;
	SQLITE_OPEN_SUPER_JOURNAL = 16384;
	SQLITE_OPEN_NOMUTEX = 32768;
	SQLITE_OPEN_FULLMUTEX = 65536;
	SQLITE_OPEN_SHAREDCACHE = 131072;
	SQLITE_OPEN_PRIVATECACHE = 262144;
	SQLITE_OPEN_WAL = 524288;
	SQLITE_OPEN_NOFOLLOW = 16777216;
	SQLITE_IOCAP_SEQUENTIAL = 1024;
	SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN = 2048;
	SQLITE_IOCAP_POWERSAFE_OVERWRITE = 4096;
	SQLITE_IOCAP_IMMUTABLE = 8192;
	SQLITE_IOCAP_BATCH_ATOMIC = 16384;
	SQLITE_DETERMINISTIC = 2048;
	SQLITE_DIRECTONLY = 524288;
	SQLITE_SUBTYPE = 1048576;
	SQLITE_INNOCUOUS = 2097152;
}));
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/typeof.js
var require_typeof = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
	}
	module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/toPrimitive.js
var require_toPrimitive = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _typeof = require_typeof()["default"];
	function toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/toPropertyKey.js
var require_toPropertyKey = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _typeof = require_typeof()["default"];
	var toPrimitive = require_toPrimitive();
	function toPropertyKey(t) {
		var i = toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/defineProperty.js
var require_defineProperty = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toPropertyKey = require_toPropertyKey();
	function _defineProperty(e, r, t) {
		return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/object-utils.js
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
function isBuffer(obj) {
	return typeof Buffer !== "undefined" && Buffer.isBuffer(obj);
}
function isFunction(obj) {
	return typeof obj === "function";
}
function isObject(obj) {
	return typeof obj === "object" && obj !== null;
}
function isPlainObject(obj) {
	if (!isObject(obj) || getTag(obj) !== "[object Object]") return false;
	if (Object.getPrototypeOf(obj) === null) return true;
	let proto = obj;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return Object.getPrototypeOf(obj) === proto;
}
function freeze(obj) {
	return Object.freeze(obj);
}
function asArray(arg) {
	if (isReadonlyArray(arg)) return arg;
	else return [arg];
}
function isReadonlyArray(arg) {
	return Array.isArray(arg);
}
function noop(obj) {
	return obj;
}
function compare(obj1, obj2) {
	if (isReadonlyArray(obj1) && isReadonlyArray(obj2)) return compareArrays(obj1, obj2);
	else if (isObject(obj1) && isObject(obj2)) return compareObjects(obj1, obj2);
	return obj1 === obj2;
}
function getMessage(error) {
	return error instanceof Error ? error.message : String(error);
}
function compareArrays(arr1, arr2) {
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; ++i) if (!compare(arr1[i], arr2[i])) return false;
	return true;
}
function compareObjects(obj1, obj2) {
	if (isBuffer(obj1) && isBuffer(obj2)) return compareBuffers(obj1, obj2);
	else if (isDate(obj1) && isDate(obj2)) return compareDates(obj1, obj2);
	return compareGenericObjects(obj1, obj2);
}
function compareBuffers(buf1, buf2) {
	return Buffer.compare(buf1, buf2) === 0;
}
function compareDates(date1, date2) {
	return date1.getTime() === date2.getTime();
}
function compareGenericObjects(obj1, obj2) {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) return false;
	for (const key of keys1) if (!compare(obj1[key], obj2[key])) return false;
	return true;
}
function getTag(value) {
	if (value == null) return value === void 0 ? "[object Undefined]" : "[object Null]";
	return toString.call(value);
}
var toString;
var init_object_utils = __esmMin((() => {
	toString = Object.prototype.toString;
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/alter-table-node.js
var AlterTableNode;
var init_alter_table_node = __esmMin((() => {
	init_object_utils();
	AlterTableNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/identifier-node.js
var IdentifierNode;
var init_identifier_node = __esmMin((() => {
	init_object_utils();
	IdentifierNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/create-index-node.js
var CreateIndexNode;
var init_create_index_node = __esmMin((() => {
	init_object_utils();
	init_identifier_node();
	CreateIndexNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/create-schema-node.js
var CreateSchemaNode;
var init_create_schema_node = __esmMin((() => {
	init_object_utils();
	init_identifier_node();
	CreateSchemaNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/create-table-node.js
var ON_COMMIT_ACTIONS, CreateTableNode;
var init_create_table_node = __esmMin((() => {
	init_object_utils();
	ON_COMMIT_ACTIONS = [
		"preserve rows",
		"delete rows",
		"drop"
	];
	CreateTableNode = freeze({
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
		cloneWithColumn(node, column) {
			return freeze({
				...node,
				columns: freeze([...node.columns, column])
			});
		},
		cloneWithConstraint(node, constraint) {
			return freeze({
				...node,
				constraints: node.constraints ? freeze([...node.constraints, constraint]) : freeze([constraint])
			});
		},
		cloneWithIndex(node, index) {
			return freeze({
				...node,
				indexes: node.indexes ? freeze([...node.indexes, index]) : freeze([index])
			});
		},
		cloneWithFrontModifier(node, modifier) {
			return freeze({
				...node,
				frontModifiers: node.frontModifiers ? freeze([...node.frontModifiers, modifier]) : freeze([modifier])
			});
		},
		cloneWithEndModifier(node, modifier) {
			return freeze({
				...node,
				endModifiers: node.endModifiers ? freeze([...node.endModifiers, modifier]) : freeze([modifier])
			});
		},
		cloneWith(node, params) {
			return freeze({
				...node,
				...params
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/schemable-identifier-node.js
var SchemableIdentifierNode;
var init_schemable_identifier_node = __esmMin((() => {
	init_object_utils();
	init_identifier_node();
	SchemableIdentifierNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/drop-index-node.js
var DropIndexNode;
var init_drop_index_node = __esmMin((() => {
	init_object_utils();
	init_schemable_identifier_node();
	DropIndexNode = freeze({
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
		cloneWith(dropIndex, props) {
			return freeze({
				...dropIndex,
				...props
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/drop-schema-node.js
var DropSchemaNode;
var init_drop_schema_node = __esmMin((() => {
	init_object_utils();
	init_identifier_node();
	DropSchemaNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/drop-table-node.js
var DropTableNode;
var init_drop_table_node = __esmMin((() => {
	init_object_utils();
	DropTableNode = freeze({
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
		cloneWith(dropIndex, params) {
			return freeze({
				...dropIndex,
				...params
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/alias-node.js
var AliasNode;
var init_alias_node = __esmMin((() => {
	init_object_utils();
	AliasNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/table-node.js
var TableNode;
var init_table_node = __esmMin((() => {
	init_object_utils();
	init_schemable_identifier_node();
	TableNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/operation-node-source.js
function isOperationNodeSource(obj) {
	return isObject(obj) && isFunction(obj.toOperationNode);
}
var init_operation_node_source = __esmMin((() => {
	init_object_utils();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/expression/expression.js
function isExpression(obj) {
	return isObject(obj) && "expressionType" in obj && isOperationNodeSource(obj);
}
function isAliasedExpression(obj) {
	return isObject(obj) && "expression" in obj && isString(obj.alias) && isOperationNodeSource(obj);
}
var init_expression = __esmMin((() => {
	init_operation_node_source();
	init_object_utils();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/select-modifier-node.js
var SelectModifierNode;
var init_select_modifier_node = __esmMin((() => {
	init_object_utils();
	SelectModifierNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/and-node.js
var AndNode;
var init_and_node = __esmMin((() => {
	init_object_utils();
	AndNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/or-node.js
var OrNode;
var init_or_node = __esmMin((() => {
	init_object_utils();
	OrNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/on-node.js
var OnNode;
var init_on_node = __esmMin((() => {
	init_object_utils();
	init_and_node();
	init_or_node();
	OnNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/join-node.js
var JoinNode;
var init_join_node = __esmMin((() => {
	init_object_utils();
	init_on_node();
	JoinNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/binary-operation-node.js
var BinaryOperationNode;
var init_binary_operation_node = __esmMin((() => {
	init_object_utils();
	BinaryOperationNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/operator-node.js
/**
* @deprecated will be removed in version 0.30.x
*/
function isOperator(op) {
	return isString(op) && OPERATORS.includes(op);
}
function isBinaryOperator(op) {
	return isString(op) && BINARY_OPERATORS_DICTIONARY[op];
}
/**
* @deprecated will be removed in version 0.30.x
*/
function isComparisonOperator(op) {
	return isString(op) && COMPARISON_OPERATORS.includes(op);
}
/**
* @deprecated will be removed in version 0.30.x
*/
function isArithmeticOperator(op) {
	return isString(op) && ARITHMETIC_OPERATORS.includes(op);
}
function isJSONOperator(op) {
	return isString(op) && JSON_OPERATORS_DICTIONARY[op];
}
function isUnaryOperator(op) {
	return isString(op) && UNARY_OPERATORS_DICTIONARY[op];
}
var COMPARISON_OPERATORS_DICTIONARY, COMPARISON_OPERATORS, ARITHMETIC_OPERATORS_DICTIONARY, ARITHMETIC_OPERATORS, JSON_OPERATORS_DICTIONARY, JSON_OPERATORS, BINARY_OPERATORS_DICTIONARY, BINARY_OPERATORS, UNARY_FILTER_OPERATORS_DICTIONARY, UNARY_FILTER_OPERATORS, UNARY_OPERATORS_DICTIONARY, UNARY_OPERATORS, OPERATORS, OperatorNode;
var init_operator_node = __esmMin((() => {
	init_object_utils();
	COMPARISON_OPERATORS_DICTIONARY = freeze({
		"=": true,
		"==": true,
		"!=": true,
		"<>": true,
		">": true,
		">=": true,
		"<": true,
		"<=": true,
		in: true,
		"not in": true,
		is: true,
		"is not": true,
		like: true,
		"not like": true,
		match: true,
		ilike: true,
		"not ilike": true,
		"@>": true,
		"<@": true,
		"^@": true,
		"&&": true,
		"?": true,
		"?&": true,
		"?|": true,
		"!<": true,
		"!>": true,
		"<=>": true,
		"!~": true,
		"~": true,
		"~*": true,
		"!~*": true,
		"@@": true,
		"@@@": true,
		"!!": true,
		"<->": true,
		regexp: true,
		"is distinct from": true,
		"is not distinct from": true
	});
	COMPARISON_OPERATORS = Object.keys(COMPARISON_OPERATORS_DICTIONARY);
	ARITHMETIC_OPERATORS_DICTIONARY = freeze({
		"+": true,
		"-": true,
		"*": true,
		"/": true,
		"%": true,
		"^": true,
		"&": true,
		"|": true,
		"#": true,
		"<<": true,
		">>": true
	});
	ARITHMETIC_OPERATORS = Object.keys(ARITHMETIC_OPERATORS_DICTIONARY);
	JSON_OPERATORS_DICTIONARY = freeze({
		"->": true,
		"->>": true
	});
	JSON_OPERATORS = Object.keys(JSON_OPERATORS_DICTIONARY);
	BINARY_OPERATORS_DICTIONARY = freeze({
		...COMPARISON_OPERATORS_DICTIONARY,
		...ARITHMETIC_OPERATORS_DICTIONARY,
		"||": true
	});
	BINARY_OPERATORS = Object.keys(BINARY_OPERATORS_DICTIONARY);
	UNARY_FILTER_OPERATORS_DICTIONARY = freeze({
		exists: true,
		"not exists": true
	});
	UNARY_FILTER_OPERATORS = Object.keys(UNARY_FILTER_OPERATORS_DICTIONARY);
	UNARY_OPERATORS_DICTIONARY = freeze({
		...UNARY_FILTER_OPERATORS_DICTIONARY,
		"-": true,
		not: true
	});
	UNARY_OPERATORS = Object.keys(UNARY_OPERATORS_DICTIONARY);
	OPERATORS = [
		...BINARY_OPERATORS,
		...JSON_OPERATORS,
		...UNARY_OPERATORS,
		"between",
		"between symmetric"
	];
	OperatorNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/column-node.js
var ColumnNode;
var init_column_node = __esmMin((() => {
	init_object_utils();
	init_identifier_node();
	ColumnNode = freeze({
		is(node) {
			return node.kind === "ColumnNode";
		},
		create(column) {
			return freeze({
				kind: "ColumnNode",
				column: IdentifierNode.create(column)
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/select-all-node.js
var SelectAllNode;
var init_select_all_node = __esmMin((() => {
	init_object_utils();
	SelectAllNode = freeze({
		is(node) {
			return node.kind === "SelectAllNode";
		},
		create() {
			return freeze({ kind: "SelectAllNode" });
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/reference-node.js
var ReferenceNode;
var init_reference_node = __esmMin((() => {
	init_select_all_node();
	init_object_utils();
	ReferenceNode = freeze({
		is(node) {
			return node.kind === "ReferenceNode";
		},
		create(column, table) {
			return freeze({
				kind: "ReferenceNode",
				table,
				column
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dynamic/dynamic-reference-builder.js
function isDynamicReferenceBuilder(obj) {
	return isObject(obj) && isOperationNodeSource(obj) && isString(obj.dynamicReference);
}
var _dynamicReference, DynamicReferenceBuilder;
var init_dynamic_reference_builder = __esmMin((() => {
	init_operation_node_source();
	init_reference_parser();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldGet2();
	init_classPrivateFieldSet2();
	_dynamicReference = /* @__PURE__ */ new WeakMap();
	DynamicReferenceBuilder = class {
		get dynamicReference() {
			return _classPrivateFieldGet2(_dynamicReference, this);
		}
		/**
		* @private
		*
		* This needs to be here just so that the typings work. Without this
		* the generated .d.ts file contains no reference to the type param R
		* which causes this type to be equal to DynamicReferenceBuilder with
		* any R.
		*/
		get refType() {}
		constructor(reference) {
			_classPrivateFieldInitSpec(this, _dynamicReference, void 0);
			_classPrivateFieldSet2(_dynamicReference, this, reference);
		}
		toOperationNode() {
			return parseSimpleReferenceExpression(_classPrivateFieldGet2(_dynamicReference, this));
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/order-by-item-node.js
var OrderByItemNode;
var init_order_by_item_node = __esmMin((() => {
	init_object_utils();
	OrderByItemNode = freeze({
		is(node) {
			return node.kind === "OrderByItemNode";
		},
		create(orderBy, direction) {
			return freeze({
				kind: "OrderByItemNode",
				orderBy,
				direction
			});
		},
		cloneWith(node, props) {
			return freeze({
				...node,
				...props
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/raw-node.js
var RawNode;
var init_raw_node = __esmMin((() => {
	init_object_utils();
	RawNode = freeze({
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
		createWithSql(sql) {
			return RawNode.create([sql], []);
		},
		createWithChild(child) {
			return RawNode.create(["", ""], [child]);
		},
		createWithChildren(children) {
			return RawNode.create(new Array(children.length + 1).fill(""), children);
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/collate-node.js
var CollateNode;
var init_collate_node = __esmMin((() => {
	init_object_utils();
	init_identifier_node();
	CollateNode = freeze({
		is(node) {
			return node.kind === "CollateNode";
		},
		create(collation) {
			return freeze({
				kind: "CollateNode",
				collation: IdentifierNode.create(collation)
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/order-by-item-builder.js
var _props$34, OrderByItemBuilder;
var init_order_by_item_builder = __esmMin((() => {
	init_collate_node();
	init_order_by_item_node();
	init_raw_node();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$34 = /* @__PURE__ */ new WeakMap();
	OrderByItemBuilder = class OrderByItemBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$34, void 0);
			_classPrivateFieldSet2(_props$34, this, freeze(props));
		}
		/**
		* Adds `desc` to the `order by` item.
		*
		* See {@link asc} for the opposite.
		*/
		desc() {
			return new OrderByItemBuilder({ node: OrderByItemNode.cloneWith(_classPrivateFieldGet2(_props$34, this).node, { direction: RawNode.createWithSql("desc") }) });
		}
		/**
		* Adds `asc` to the `order by` item.
		*
		* See {@link desc} for the opposite.
		*/
		asc() {
			return new OrderByItemBuilder({ node: OrderByItemNode.cloneWith(_classPrivateFieldGet2(_props$34, this).node, { direction: RawNode.createWithSql("asc") }) });
		}
		/**
		* Adds `nulls last` to the `order by` item.
		*
		* This is only supported by some dialects like PostgreSQL and SQLite.
		*
		* See {@link nullsFirst} for the opposite.
		*/
		nullsLast() {
			return new OrderByItemBuilder({ node: OrderByItemNode.cloneWith(_classPrivateFieldGet2(_props$34, this).node, { nulls: "last" }) });
		}
		/**
		* Adds `nulls first` to the `order by` item.
		*
		* This is only supported by some dialects like PostgreSQL and SQLite.
		*
		* See {@link nullsLast} for the opposite.
		*/
		nullsFirst() {
			return new OrderByItemBuilder({ node: OrderByItemNode.cloneWith(_classPrivateFieldGet2(_props$34, this).node, { nulls: "first" }) });
		}
		/**
		* Adds `collate <collationName>` to the `order by` item.
		*/
		collate(collation) {
			return new OrderByItemBuilder({ node: OrderByItemNode.cloneWith(_classPrivateFieldGet2(_props$34, this).node, { collation: CollateNode.create(collation) }) });
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_props$34, this).node;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/log-once.js
/**
* Use for system-level logging, such as deprecation messages.
* Logs a message and ensures it won't be logged again.
*/
function logOnce(message) {
	if (LOGGED_MESSAGES.has(message)) return;
	LOGGED_MESSAGES.add(message);
	console.log(message);
}
var LOGGED_MESSAGES;
var init_log_once = __esmMin((() => {
	LOGGED_MESSAGES = /* @__PURE__ */ new Set();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/order-by-parser.js
function isOrderByDirection(thing) {
	return thing === "asc" || thing === "desc";
}
function parseOrderBy(args) {
	if (args.length === 2) return [parseOrderByItem(args[0], args[1])];
	if (args.length === 1) {
		const [orderBy] = args;
		if (Array.isArray(orderBy)) {
			logOnce("orderBy(array) is deprecated, use multiple orderBy calls instead.");
			return orderBy.map((item) => parseOrderByItem(item));
		}
		return [parseOrderByItem(orderBy)];
	}
	throw new Error(`Invalid number of arguments at order by! expected 1-2, received ${args.length}`);
}
function parseOrderByItem(expr, modifiers) {
	const parsedRef = parseOrderByExpression(expr);
	if (OrderByItemNode.is(parsedRef)) {
		if (modifiers) throw new Error("Cannot specify direction twice!");
		return parsedRef;
	}
	return parseOrderByWithModifiers(parsedRef, modifiers);
}
function parseOrderByExpression(expr) {
	if (isExpressionOrFactory(expr)) return parseExpression(expr);
	if (isDynamicReferenceBuilder(expr)) return expr.toOperationNode();
	const [ref, direction] = expr.split(" ");
	if (direction) {
		logOnce("`orderBy('column asc')` is deprecated. Use `orderBy('column', 'asc')` instead.");
		return parseOrderByWithModifiers(parseStringReference(ref), direction);
	}
	return parseStringReference(expr);
}
function parseOrderByWithModifiers(expr, modifiers) {
	if (typeof modifiers === "string") {
		if (!isOrderByDirection(modifiers)) throw new Error(`Invalid order by direction: ${modifiers}`);
		return OrderByItemNode.create(expr, RawNode.createWithSql(modifiers));
	}
	if (isExpression(modifiers)) {
		logOnce("`orderBy(..., expr)` is deprecated. Use `orderBy(..., 'asc')` or `orderBy(..., (ob) => ...)` instead.");
		return OrderByItemNode.create(expr, modifiers.toOperationNode());
	}
	const node = OrderByItemNode.create(expr);
	if (!modifiers) return node;
	return modifiers(new OrderByItemBuilder({ node })).toOperationNode();
}
var init_order_by_parser = __esmMin((() => {
	init_dynamic_reference_builder();
	init_expression();
	init_order_by_item_node();
	init_raw_node();
	init_order_by_item_builder();
	init_log_once();
	init_expression_parser();
	init_reference_parser();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/json-reference-node.js
var JSONReferenceNode;
var init_json_reference_node = __esmMin((() => {
	init_object_utils();
	JSONReferenceNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/json-operator-chain-node.js
var JSONOperatorChainNode;
var init_json_operator_chain_node = __esmMin((() => {
	init_object_utils();
	JSONOperatorChainNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/json-path-node.js
var JSONPathNode;
var init_json_path_node = __esmMin((() => {
	init_object_utils();
	JSONPathNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/reference-parser.js
function parseSimpleReferenceExpression(exp) {
	if (isString(exp)) return parseStringReference(exp);
	return exp.toOperationNode();
}
function parseReferenceExpressionOrList(arg) {
	if (isReadonlyArray(arg)) return arg.map((it) => parseReferenceExpression(it));
	else return [parseReferenceExpression(arg)];
}
function parseReferenceExpression(exp) {
	if (isExpressionOrFactory(exp)) return parseExpression(exp);
	return parseSimpleReferenceExpression(exp);
}
function parseJSONReference(ref, op) {
	if (isJSONOperator(op)) return JSONReferenceNode.create(parseStringReference(ref), JSONOperatorChainNode.create(OperatorNode.create(op)));
	if (op === "->$" || op === "->>$") return JSONReferenceNode.create(parseStringReference(ref), JSONPathNode.create(OperatorNode.create(op.slice(0, -1))));
	throw new Error(`Invalid JSON operator: ${op}`);
}
function parseStringReference(ref) {
	const COLUMN_SEPARATOR = ".";
	if (!ref.includes(COLUMN_SEPARATOR)) return ReferenceNode.create(ColumnNode.create(ref));
	const parts = ref.split(COLUMN_SEPARATOR).map(trim$2);
	if (parts.length === 3) return parseStringReferenceWithTableAndSchema(parts);
	if (parts.length === 2) return parseStringReferenceWithTable(parts);
	throw new Error(`invalid column reference ${ref}`);
}
function parseAliasedStringReference(ref) {
	const ALIAS_SEPARATOR = " as ";
	if (ref.includes(ALIAS_SEPARATOR)) {
		const [columnRef, alias] = ref.split(ALIAS_SEPARATOR).map(trim$2);
		return AliasNode.create(parseStringReference(columnRef), IdentifierNode.create(alias));
	} else return parseStringReference(ref);
}
function parseColumnName(column) {
	return ColumnNode.create(column);
}
function parseOrderedColumnName(column) {
	const ORDER_SEPARATOR = " ";
	if (column.includes(ORDER_SEPARATOR)) {
		const [columnName, order] = column.split(ORDER_SEPARATOR).map(trim$2);
		if (!isOrderByDirection(order)) throw new Error(`invalid order direction "${order}" next to "${columnName}"`);
		return parseOrderBy([columnName, order])[0];
	} else return parseColumnName(column);
}
function parseStringReferenceWithTableAndSchema(parts) {
	const [schema, table, column] = parts;
	return ReferenceNode.create(ColumnNode.create(column), TableNode.createWithSchema(schema, table));
}
function parseStringReferenceWithTable(parts) {
	const [table, column] = parts;
	return ReferenceNode.create(ColumnNode.create(column), TableNode.create(table));
}
function trim$2(str) {
	return str.trim();
}
var init_reference_parser = __esmMin((() => {
	init_alias_node();
	init_column_node();
	init_reference_node();
	init_table_node();
	init_object_utils();
	init_expression_parser();
	init_identifier_node();
	init_order_by_parser();
	init_operator_node();
	init_json_reference_node();
	init_json_operator_chain_node();
	init_json_path_node();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/primitive-value-list-node.js
var PrimitiveValueListNode;
var init_primitive_value_list_node = __esmMin((() => {
	init_object_utils();
	PrimitiveValueListNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/value-list-node.js
var ValueListNode;
var init_value_list_node = __esmMin((() => {
	init_object_utils();
	ValueListNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/value-node.js
var ValueNode;
var init_value_node = __esmMin((() => {
	init_object_utils();
	ValueNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/value-parser.js
function parseValueExpressionOrList(arg) {
	if (isReadonlyArray(arg)) return parseValueExpressionList(arg);
	return parseValueExpression(arg);
}
function parseValueExpression(exp) {
	if (isExpressionOrFactory(exp)) return parseExpression(exp);
	return ValueNode.create(exp);
}
function isSafeImmediateValue(value) {
	return isNumber(value) || isBoolean(value) || isNull(value);
}
function parseSafeImmediateValue(value) {
	if (!isSafeImmediateValue(value)) throw new Error(`unsafe immediate value ${JSON.stringify(value)}`);
	return ValueNode.createImmediate(value);
}
function parseValueExpressionList(arg) {
	if (arg.some(isExpressionOrFactory)) return ValueListNode.create(arg.map((it) => parseValueExpression(it)));
	return PrimitiveValueListNode.create(arg);
}
var init_value_parser = __esmMin((() => {
	init_primitive_value_list_node();
	init_value_list_node();
	init_value_node();
	init_object_utils();
	init_expression_parser();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/parens-node.js
var ParensNode;
var init_parens_node = __esmMin((() => {
	init_object_utils();
	ParensNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/binary-operation-parser.js
function parseValueBinaryOperationOrExpression(args) {
	if (args.length === 3) return parseValueBinaryOperation(args[0], args[1], args[2]);
	else if (args.length === 1) return parseValueExpression(args[0]);
	throw new Error(`invalid arguments: ${JSON.stringify(args)}`);
}
function parseValueBinaryOperation(left, operator, right) {
	if (isIsOperator(operator) && needsIsOperator(right)) return BinaryOperationNode.create(parseReferenceExpression(left), parseBinaryOperator(operator), ValueNode.createImmediate(right));
	return BinaryOperationNode.create(parseReferenceExpression(left), parseBinaryOperator(operator), parseValueExpressionOrList(right));
}
function parseReferentialBinaryOperation(left, operator, right) {
	return BinaryOperationNode.create(parseReferenceExpression(left), parseBinaryOperator(operator), parseReferenceExpression(right));
}
function parseFilterObject(obj, combinator) {
	return parseFilterList(Object.entries(obj).filter(([, v]) => !isUndefined(v)).map(([k, v]) => parseValueBinaryOperation(k, needsIsOperator(v) ? "is" : "=", v)), combinator);
}
function parseFilterList(list, combinator, withParens = true) {
	const combine = combinator === "and" ? AndNode.create : OrNode.create;
	if (list.length === 0) return BinaryOperationNode.create(ValueNode.createImmediate(1), OperatorNode.create("="), ValueNode.createImmediate(combinator === "and" ? 1 : 0));
	let node = toOperationNode(list[0]);
	for (let i = 1; i < list.length; ++i) node = combine(node, toOperationNode(list[i]));
	if (list.length > 1 && withParens) return ParensNode.create(node);
	return node;
}
function isIsOperator(operator) {
	return operator === "is" || operator === "is not";
}
function needsIsOperator(value) {
	return isNull(value) || isBoolean(value);
}
function parseBinaryOperator(operator) {
	if (isBinaryOperator(operator)) return OperatorNode.create(operator);
	if (isOperationNodeSource(operator)) return operator.toOperationNode();
	throw new Error(`invalid operator ${JSON.stringify(operator)}`);
}
function toOperationNode(nodeOrSource) {
	return isOperationNodeSource(nodeOrSource) ? nodeOrSource.toOperationNode() : nodeOrSource;
}
var init_binary_operation_parser = __esmMin((() => {
	init_binary_operation_node();
	init_object_utils();
	init_operation_node_source();
	init_operator_node();
	init_reference_parser();
	init_value_parser();
	init_value_node();
	init_and_node();
	init_parens_node();
	init_or_node();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/order-by-node.js
var OrderByNode;
var init_order_by_node = __esmMin((() => {
	init_object_utils();
	OrderByNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/partition-by-node.js
var PartitionByNode;
var init_partition_by_node = __esmMin((() => {
	init_object_utils();
	PartitionByNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/over-node.js
var OverNode;
var init_over_node = __esmMin((() => {
	init_object_utils();
	init_order_by_node();
	init_partition_by_node();
	OverNode = freeze({
		is(node) {
			return node.kind === "OverNode";
		},
		create() {
			return freeze({ kind: "OverNode" });
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/from-node.js
var FromNode;
var init_from_node = __esmMin((() => {
	init_object_utils();
	FromNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/group-by-node.js
var GroupByNode;
var init_group_by_node = __esmMin((() => {
	init_object_utils();
	GroupByNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/having-node.js
var HavingNode;
var init_having_node = __esmMin((() => {
	init_object_utils();
	init_and_node();
	init_or_node();
	HavingNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/insert-query-node.js
var InsertQueryNode;
var init_insert_query_node = __esmMin((() => {
	init_object_utils();
	InsertQueryNode = freeze({
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
			return freeze({ kind: "InsertQueryNode" });
		},
		cloneWith(insertQuery, props) {
			return freeze({
				...insertQuery,
				...props
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/list-node.js
var ListNode;
var init_list_node = __esmMin((() => {
	init_object_utils();
	ListNode = freeze({
		is(node) {
			return node.kind === "ListNode";
		},
		create(items) {
			return freeze({
				kind: "ListNode",
				items: freeze(items)
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/update-query-node.js
var UpdateQueryNode;
var init_update_query_node = __esmMin((() => {
	init_object_utils();
	init_from_node();
	init_list_node();
	UpdateQueryNode = freeze({
		is(node) {
			return node.kind === "UpdateQueryNode";
		},
		create(tables, withNode) {
			return freeze({
				kind: "UpdateQueryNode",
				table: tables.length === 1 ? tables[0] : ListNode.create(tables),
				...withNode && { with: withNode }
			});
		},
		createWithoutTable() {
			return freeze({ kind: "UpdateQueryNode" });
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/using-node.js
var UsingNode;
var init_using_node = __esmMin((() => {
	init_object_utils();
	UsingNode = freeze({
		is(node) {
			return node.kind === "UsingNode";
		},
		create(tables) {
			return freeze({
				kind: "UsingNode",
				tables: freeze(tables)
			});
		},
		cloneWithTables(using, tables) {
			return freeze({
				...using,
				tables: freeze([...using.tables, ...tables])
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/delete-query-node.js
var DeleteQueryNode;
var init_delete_query_node = __esmMin((() => {
	init_object_utils();
	init_from_node();
	init_using_node();
	init_query_node();
	DeleteQueryNode = freeze({
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
		/**
		* @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
		*/
		cloneWithOrderByItems: (node, items) => QueryNode.cloneWithOrderByItems(node, items),
		/**
		* @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
		*/
		cloneWithoutOrderBy: (node) => QueryNode.cloneWithoutOrderBy(node),
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
		cloneWithUsing(deleteNode, tables) {
			return freeze({
				...deleteNode,
				using: deleteNode.using !== void 0 ? UsingNode.cloneWithTables(deleteNode.using, tables) : UsingNode.create(tables)
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/where-node.js
var WhereNode;
var init_where_node = __esmMin((() => {
	init_object_utils();
	init_and_node();
	init_or_node();
	WhereNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/returning-node.js
var ReturningNode;
var init_returning_node = __esmMin((() => {
	init_object_utils();
	ReturningNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/explain-node.js
var ExplainNode;
var init_explain_node = __esmMin((() => {
	init_object_utils();
	ExplainNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/when-node.js
var WhenNode;
var init_when_node = __esmMin((() => {
	init_object_utils();
	WhenNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/merge-query-node.js
var MergeQueryNode;
var init_merge_query_node = __esmMin((() => {
	init_object_utils();
	init_when_node();
	MergeQueryNode = freeze({
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
				whens: mergeNode.whens ? freeze([...mergeNode.whens.slice(0, -1), WhenNode.cloneWithResult(mergeNode.whens[mergeNode.whens.length - 1], then)]) : void 0
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/output-node.js
var OutputNode;
var init_output_node = __esmMin((() => {
	init_object_utils();
	OutputNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/query-node.js
var QueryNode;
var init_query_node = __esmMin((() => {
	init_insert_query_node();
	init_select_query_node();
	init_update_query_node();
	init_delete_query_node();
	init_where_node();
	init_object_utils();
	init_returning_node();
	init_explain_node();
	init_merge_query_node();
	init_output_node();
	init_order_by_node();
	QueryNode = freeze({
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
		},
		cloneWithOrderByItems(node, items) {
			return freeze({
				...node,
				orderBy: node.orderBy ? OrderByNode.cloneWithItems(node.orderBy, items) : OrderByNode.create(items)
			});
		},
		cloneWithoutOrderBy(node) {
			return freeze({
				...node,
				orderBy: void 0
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/select-query-node.js
var SelectQueryNode;
var init_select_query_node = __esmMin((() => {
	init_object_utils();
	init_from_node();
	init_group_by_node();
	init_having_node();
	init_query_node();
	SelectQueryNode = freeze({
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
		/**
		* @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
		*/
		cloneWithOrderByItems: (node, items) => QueryNode.cloneWithOrderByItems(node, items),
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
		cloneWithFetch(selectNode, fetch) {
			return freeze({
				...selectNode,
				fetch
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
		/**
		* @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
		*/
		cloneWithoutOrderBy: (node) => QueryNode.cloneWithoutOrderBy(node),
		cloneWithoutGroupBy(select) {
			return freeze({
				...select,
				groupBy: void 0
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/join-builder.js
var _props$33, JoinBuilder;
var init_join_builder = __esmMin((() => {
	init_join_node();
	init_raw_node();
	init_binary_operation_parser();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$33 = /* @__PURE__ */ new WeakMap();
	JoinBuilder = class JoinBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$33, void 0);
			_classPrivateFieldSet2(_props$33, this, freeze(props));
		}
		on(...args) {
			return new JoinBuilder({
				..._classPrivateFieldGet2(_props$33, this),
				joinNode: JoinNode.cloneWithOn(_classPrivateFieldGet2(_props$33, this).joinNode, parseValueBinaryOperationOrExpression(args))
			});
		}
		/**
		* Just like {@link WhereInterface.whereRef} but adds an item to the join's
		* `on` clause instead.
		*
		* See {@link WhereInterface.whereRef} for documentation and examples.
		*/
		onRef(lhs, op, rhs) {
			return new JoinBuilder({
				..._classPrivateFieldGet2(_props$33, this),
				joinNode: JoinNode.cloneWithOn(_classPrivateFieldGet2(_props$33, this).joinNode, parseReferentialBinaryOperation(lhs, op, rhs))
			});
		}
		/**
		* Adds `on true`.
		*/
		onTrue() {
			return new JoinBuilder({
				..._classPrivateFieldGet2(_props$33, this),
				joinNode: JoinNode.cloneWithOn(_classPrivateFieldGet2(_props$33, this).joinNode, RawNode.createWithSql("true"))
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
			return _classPrivateFieldGet2(_props$33, this).joinNode;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/partition-by-item-node.js
var PartitionByItemNode;
var init_partition_by_item_node = __esmMin((() => {
	init_object_utils();
	PartitionByItemNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/partition-by-parser.js
function parsePartitionBy(partitionBy) {
	return parseReferenceExpressionOrList(partitionBy).map(PartitionByItemNode.create);
}
var init_partition_by_parser = __esmMin((() => {
	init_partition_by_item_node();
	init_reference_parser();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/over-builder.js
var _props$32, OverBuilder;
var init_over_builder = __esmMin((() => {
	init_over_node();
	init_query_node();
	init_order_by_parser();
	init_partition_by_parser();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$32 = /* @__PURE__ */ new WeakMap();
	OverBuilder = class OverBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$32, void 0);
			_classPrivateFieldSet2(_props$32, this, freeze(props));
		}
		orderBy(...args) {
			return new OverBuilder({ overNode: OverNode.cloneWithOrderByItems(_classPrivateFieldGet2(_props$32, this).overNode, parseOrderBy(args)) });
		}
		clearOrderBy() {
			return new OverBuilder({ overNode: QueryNode.cloneWithoutOrderBy(_classPrivateFieldGet2(_props$32, this).overNode) });
		}
		partitionBy(partitionBy) {
			return new OverBuilder({ overNode: OverNode.cloneWithPartitionByItems(_classPrivateFieldGet2(_props$32, this).overNode, parsePartitionBy(partitionBy)) });
		}
		/**
		* Simply calls the provided function passing `this` as the only argument. `$call` returns
		* what the provided function returns.
		*/
		$call(func) {
			return func(this);
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_props$32, this).overNode;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/selection-node.js
var SelectionNode;
var init_selection_node = __esmMin((() => {
	init_object_utils();
	init_reference_node();
	init_select_all_node();
	SelectionNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/select-parser.js
function parseSelectArg(selection) {
	if (isFunction(selection)) return parseSelectArg(selection(expressionBuilder()));
	else if (isReadonlyArray(selection)) return selection.map((it) => parseSelectExpression(it));
	else return [parseSelectExpression(selection)];
}
function parseSelectExpression(selection) {
	if (isString(selection)) return SelectionNode.create(parseAliasedStringReference(selection));
	else if (isDynamicReferenceBuilder(selection)) return SelectionNode.create(selection.toOperationNode());
	else return SelectionNode.create(parseAliasedExpression(selection));
}
function parseSelectAll(table) {
	if (!table) return [SelectionNode.createSelectAll()];
	else if (Array.isArray(table)) return table.map(parseSelectAllArg);
	else return [parseSelectAllArg(table)];
}
function parseSelectAllArg(table) {
	if (isString(table)) return SelectionNode.createSelectAllFromTable(parseTable(table));
	throw new Error(`invalid value selectAll expression: ${JSON.stringify(table)}`);
}
var init_select_parser = __esmMin((() => {
	init_object_utils();
	init_selection_node();
	init_reference_parser();
	init_dynamic_reference_builder();
	init_expression_parser();
	init_table_parser();
	init_expression_builder();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/values-node.js
var ValuesNode;
var init_values_node = __esmMin((() => {
	init_object_utils();
	ValuesNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/default-insert-value-node.js
var DefaultInsertValueNode;
var init_default_insert_value_node = __esmMin((() => {
	init_object_utils();
	DefaultInsertValueNode = freeze({
		is(node) {
			return node.kind === "DefaultInsertValueNode";
		},
		create() {
			return freeze({ kind: "DefaultInsertValueNode" });
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/insert-values-parser.js
function parseInsertExpression(arg) {
	const objectOrList = isFunction(arg) ? arg(expressionBuilder()) : arg;
	return parseInsertColumnsAndValues(isReadonlyArray(objectOrList) ? objectOrList : freeze([objectOrList]));
}
function parseInsertColumnsAndValues(rows) {
	const columns = parseColumnNamesAndIndexes(rows);
	return [freeze([...columns.keys()].map(ColumnNode.create)), ValuesNode.create(rows.map((row) => parseRowValues(row, columns)))];
}
function parseColumnNamesAndIndexes(rows) {
	const columns = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const cols = Object.keys(row);
		for (const col of cols) if (!columns.has(col) && row[col] !== void 0) columns.set(col, columns.size);
	}
	return columns;
}
function parseRowValues(row, columns) {
	const rowColumns = Object.keys(row);
	const rowValues = Array.from({ length: columns.size });
	let hasUndefinedOrComplexColumns = false;
	let indexedRowColumns = rowColumns.length;
	for (const col of rowColumns) {
		const columnIdx = columns.get(col);
		if (isUndefined(columnIdx)) {
			indexedRowColumns--;
			continue;
		}
		const value = row[col];
		if (isUndefined(value) || isExpressionOrFactory(value)) hasUndefinedOrComplexColumns = true;
		rowValues[columnIdx] = value;
	}
	if (indexedRowColumns < columns.size || hasUndefinedOrComplexColumns) {
		const defaultValue = DefaultInsertValueNode.create();
		return ValueListNode.create(rowValues.map((it) => isUndefined(it) ? defaultValue : parseValueExpression(it)));
	}
	return PrimitiveValueListNode.create(rowValues);
}
var init_insert_values_parser = __esmMin((() => {
	init_column_node();
	init_primitive_value_list_node();
	init_value_list_node();
	init_object_utils();
	init_value_parser();
	init_values_node();
	init_expression_parser();
	init_default_insert_value_node();
	init_expression_builder();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/column-update-node.js
var ColumnUpdateNode;
var init_column_update_node = __esmMin((() => {
	init_object_utils();
	ColumnUpdateNode = freeze({
		is(node) {
			return node.kind === "ColumnUpdateNode";
		},
		create(column, value) {
			return freeze({
				kind: "ColumnUpdateNode",
				column,
				value
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/update-set-parser.js
function parseUpdate(...args) {
	if (args.length === 2) return [ColumnUpdateNode.create(parseReferenceExpression(args[0]), parseValueExpression(args[1]))];
	return parseUpdateObjectExpression(args[0]);
}
function parseUpdateObjectExpression(update) {
	const updateObj = isFunction(update) ? update(expressionBuilder()) : update;
	return Object.entries(updateObj).filter(([_, value]) => value !== void 0).map(([key, value]) => {
		return ColumnUpdateNode.create(ColumnNode.create(key), parseValueExpression(value));
	});
}
var init_update_set_parser = __esmMin((() => {
	init_column_node();
	init_column_update_node();
	init_expression_builder();
	init_object_utils();
	init_value_parser();
	init_reference_parser();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/on-duplicate-key-node.js
var OnDuplicateKeyNode;
var init_on_duplicate_key_node = __esmMin((() => {
	init_object_utils();
	OnDuplicateKeyNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/insert-result.js
var InsertResult;
var init_insert_result = __esmMin((() => {
	init_defineProperty();
	InsertResult = class {
		constructor(insertId, numInsertedOrUpdatedRows) {
			_defineProperty(
				this,
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
				"insertId",
				void 0
			);
			_defineProperty(
				this,
				/**
				* Affected rows count.
				*/
				"numInsertedOrUpdatedRows",
				void 0
			);
			this.insertId = insertId;
			this.numInsertedOrUpdatedRows = numInsertedOrUpdatedRows;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/no-result-error.js
function isNoResultErrorConstructor(fn) {
	return Object.prototype.hasOwnProperty.call(fn, "prototype");
}
var NoResultError;
var init_no_result_error = __esmMin((() => {
	init_defineProperty();
	NoResultError = class extends Error {
		constructor(node) {
			super("no result");
			_defineProperty(
				this,
				/**
				* The operation node tree of the query that was executed.
				*/
				"node",
				void 0
			);
			this.node = node;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/on-conflict-node.js
var OnConflictNode;
var init_on_conflict_node = __esmMin((() => {
	init_object_utils();
	init_where_node();
	OnConflictNode = freeze({
		is(node) {
			return node.kind === "OnConflictNode";
		},
		create() {
			return freeze({ kind: "OnConflictNode" });
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/on-conflict-builder.js
var _props$31, OnConflictBuilder, _props2$4, OnConflictDoNothingBuilder, _props3$3, OnConflictUpdateBuilder;
var init_on_conflict_builder = __esmMin((() => {
	init_column_node();
	init_identifier_node();
	init_on_conflict_node();
	init_binary_operation_parser();
	init_update_set_parser();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$31 = /* @__PURE__ */ new WeakMap();
	OnConflictBuilder = class OnConflictBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$31, void 0);
			_classPrivateFieldSet2(_props$31, this, freeze(props));
		}
		/**
		* Specify a single column as the conflict target.
		*
		* Also see the {@link columns}, {@link constraint} and {@link expression}
		* methods for alternative ways to specify the conflict target.
		*/
		column(column) {
			const columnNode = ColumnNode.create(column);
			return new OnConflictBuilder({
				..._classPrivateFieldGet2(_props$31, this),
				onConflictNode: OnConflictNode.cloneWith(_classPrivateFieldGet2(_props$31, this).onConflictNode, { columns: _classPrivateFieldGet2(_props$31, this).onConflictNode.columns ? freeze([..._classPrivateFieldGet2(_props$31, this).onConflictNode.columns, columnNode]) : freeze([columnNode]) })
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
			return new OnConflictBuilder({
				..._classPrivateFieldGet2(_props$31, this),
				onConflictNode: OnConflictNode.cloneWith(_classPrivateFieldGet2(_props$31, this).onConflictNode, { columns: _classPrivateFieldGet2(_props$31, this).onConflictNode.columns ? freeze([..._classPrivateFieldGet2(_props$31, this).onConflictNode.columns, ...columnNodes]) : freeze(columnNodes) })
			});
		}
		/**
		* Specify a specific constraint by name as the conflict target.
		*
		* Also see the {@link column}, {@link columns} and {@link expression}
		* methods for alternative ways to specify the conflict target.
		*/
		constraint(constraintName) {
			return new OnConflictBuilder({
				..._classPrivateFieldGet2(_props$31, this),
				onConflictNode: OnConflictNode.cloneWith(_classPrivateFieldGet2(_props$31, this).onConflictNode, { constraint: IdentifierNode.create(constraintName) })
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
			return new OnConflictBuilder({
				..._classPrivateFieldGet2(_props$31, this),
				onConflictNode: OnConflictNode.cloneWith(_classPrivateFieldGet2(_props$31, this).onConflictNode, { indexExpression: expression.toOperationNode() })
			});
		}
		where(...args) {
			return new OnConflictBuilder({
				..._classPrivateFieldGet2(_props$31, this),
				onConflictNode: OnConflictNode.cloneWithIndexWhere(_classPrivateFieldGet2(_props$31, this).onConflictNode, parseValueBinaryOperationOrExpression(args))
			});
		}
		whereRef(lhs, op, rhs) {
			return new OnConflictBuilder({
				..._classPrivateFieldGet2(_props$31, this),
				onConflictNode: OnConflictNode.cloneWithIndexWhere(_classPrivateFieldGet2(_props$31, this).onConflictNode, parseReferentialBinaryOperation(lhs, op, rhs))
			});
		}
		clearWhere() {
			return new OnConflictBuilder({
				..._classPrivateFieldGet2(_props$31, this),
				onConflictNode: OnConflictNode.cloneWithoutIndexWhere(_classPrivateFieldGet2(_props$31, this).onConflictNode)
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
				..._classPrivateFieldGet2(_props$31, this),
				onConflictNode: OnConflictNode.cloneWith(_classPrivateFieldGet2(_props$31, this).onConflictNode, { doNothing: true })
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
				..._classPrivateFieldGet2(_props$31, this),
				onConflictNode: OnConflictNode.cloneWith(_classPrivateFieldGet2(_props$31, this).onConflictNode, { updates: parseUpdateObjectExpression(update) })
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
	_props2$4 = /* @__PURE__ */ new WeakMap();
	OnConflictDoNothingBuilder = class {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props2$4, void 0);
			_classPrivateFieldSet2(_props2$4, this, freeze(props));
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_props2$4, this).onConflictNode;
		}
	};
	_props3$3 = /* @__PURE__ */ new WeakMap();
	OnConflictUpdateBuilder = class OnConflictUpdateBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props3$3, void 0);
			_classPrivateFieldSet2(_props3$3, this, freeze(props));
		}
		where(...args) {
			return new OnConflictUpdateBuilder({
				..._classPrivateFieldGet2(_props3$3, this),
				onConflictNode: OnConflictNode.cloneWithUpdateWhere(_classPrivateFieldGet2(_props3$3, this).onConflictNode, parseValueBinaryOperationOrExpression(args))
			});
		}
		/**
		* Specify a where condition for the update operation.
		*
		* See {@link WhereInterface.whereRef} for more info.
		*/
		whereRef(lhs, op, rhs) {
			return new OnConflictUpdateBuilder({
				..._classPrivateFieldGet2(_props3$3, this),
				onConflictNode: OnConflictNode.cloneWithUpdateWhere(_classPrivateFieldGet2(_props3$3, this).onConflictNode, parseReferentialBinaryOperation(lhs, op, rhs))
			});
		}
		clearWhere() {
			return new OnConflictUpdateBuilder({
				..._classPrivateFieldGet2(_props3$3, this),
				onConflictNode: OnConflictNode.cloneWithoutUpdateWhere(_classPrivateFieldGet2(_props3$3, this).onConflictNode)
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
			return _classPrivateFieldGet2(_props3$3, this).onConflictNode;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/top-node.js
var TopNode;
var init_top_node = __esmMin((() => {
	init_object_utils();
	TopNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/top-parser.js
function parseTop(expression, modifiers) {
	if (!isNumber(expression) && !isBigInt(expression)) throw new Error(`Invalid top expression: ${expression}`);
	if (!isUndefined(modifiers) && !isTopModifiers(modifiers)) throw new Error(`Invalid top modifiers: ${modifiers}`);
	return TopNode.create(expression, modifiers);
}
function isTopModifiers(modifiers) {
	return modifiers === "percent" || modifiers === "with ties" || modifiers === "percent with ties";
}
var init_top_parser = __esmMin((() => {
	init_top_node();
	init_object_utils();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/or-action-node.js
var OrActionNode;
var init_or_action_node = __esmMin((() => {
	init_object_utils();
	OrActionNode = freeze({
		is(node) {
			return node.kind === "OrActionNode";
		},
		create(action) {
			return freeze({
				kind: "OrActionNode",
				action
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/insert-query-builder.js
var _props$30, InsertQueryBuilder;
var init_insert_query_builder = __esmMin((() => {
	init_select_parser();
	init_insert_values_parser();
	init_insert_query_node();
	init_query_node();
	init_update_set_parser();
	init_object_utils();
	init_on_duplicate_key_node();
	init_insert_result();
	init_no_result_error();
	init_expression_parser();
	init_column_node();
	init_on_conflict_builder();
	init_on_conflict_node();
	init_top_parser();
	init_or_action_node();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$30 = /* @__PURE__ */ new WeakMap();
	InsertQueryBuilder = class InsertQueryBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$30, void 0);
			_classPrivateFieldSet2(_props$30, this, freeze(props));
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
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: InsertQueryNode.cloneWith(_classPrivateFieldGet2(_props$30, this).queryNode, {
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
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: InsertQueryNode.cloneWith(_classPrivateFieldGet2(_props$30, this).queryNode, { columns: freeze(columns.map(ColumnNode.create)) })
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
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: InsertQueryNode.cloneWith(_classPrivateFieldGet2(_props$30, this).queryNode, { values: parseExpression(expression) })
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
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: InsertQueryNode.cloneWith(_classPrivateFieldGet2(_props$30, this).queryNode, { defaultValues: true })
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
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: QueryNode.cloneWithEndModifier(_classPrivateFieldGet2(_props$30, this).queryNode, modifier.toOperationNode())
			});
		}
		/**
		* Changes an `insert into` query to an `insert ignore into` query.
		*
		* This is only supported by some dialects like MySQL.
		*
		* To avoid a footgun, when invoked with the SQLite dialect, this method will
		* be handled like {@link orIgnore}. See also, {@link orAbort}, {@link orFail},
		* {@link orReplace}, and {@link orRollback}.
		*
		* If you use the ignore modifier, ignorable errors that occur while executing the
		* insert statement are ignored. For example, without ignore, a row that duplicates
		* an existing unique index or primary key value in the table causes a duplicate-key
		* error and the statement is aborted. With ignore, the row is discarded and no error
		* occurs.
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
		* insert ignore into `person` (`first_name`, `last_name`, `gender`) values (?, ?, ?)
		* ```
		*
		* The generated SQL (SQLite):
		*
		* ```sql
		* insert or ignore into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
		* ```
		*/
		ignore() {
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: InsertQueryNode.cloneWith(_classPrivateFieldGet2(_props$30, this).queryNode, { orAction: OrActionNode.create("ignore") })
			});
		}
		/**
		* Changes an `insert into` query to an `insert or ignore into` query.
		*
		* This is only supported by some dialects like SQLite.
		*
		* To avoid a footgun, when invoked with the MySQL dialect, this method will
		* be handled like {@link ignore}.
		*
		* See also, {@link orAbort}, {@link orFail}, {@link orReplace}, and {@link orRollback}.
		*
		* ### Examples
		*
		* ```ts
		* await db.insertInto('person')
		*   .orIgnore()
		*   .values({
		*     first_name: 'John',
		*     last_name: 'Doe',
		*     gender: 'female',
		*   })
		*   .execute()
		* ```
		*
		* The generated SQL (SQLite):
		*
		* ```sql
		* insert or ignore into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
		* ```
		*
		* The generated SQL (MySQL):
		*
		* ```sql
		* insert ignore into `person` (`first_name`, `last_name`, `gender`) values (?, ?, ?)
		* ```
		*/
		orIgnore() {
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: InsertQueryNode.cloneWith(_classPrivateFieldGet2(_props$30, this).queryNode, { orAction: OrActionNode.create("ignore") })
			});
		}
		/**
		* Changes an `insert into` query to an `insert or abort into` query.
		*
		* This is only supported by some dialects like SQLite.
		*
		* See also, {@link orIgnore}, {@link orFail}, {@link orReplace}, and {@link orRollback}.
		*
		* ### Examples
		*
		* ```ts
		* await db.insertInto('person')
		*   .orAbort()
		*   .values({
		*     first_name: 'John',
		*     last_name: 'Doe',
		*     gender: 'female',
		*   })
		*   .execute()
		* ```
		*
		* The generated SQL (SQLite):
		*
		* ```sql
		* insert or abort into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
		* ```
		*/
		orAbort() {
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: InsertQueryNode.cloneWith(_classPrivateFieldGet2(_props$30, this).queryNode, { orAction: OrActionNode.create("abort") })
			});
		}
		/**
		* Changes an `insert into` query to an `insert or fail into` query.
		*
		* This is only supported by some dialects like SQLite.
		*
		* See also, {@link orIgnore}, {@link orAbort}, {@link orReplace}, and {@link orRollback}.
		*
		* ### Examples
		*
		* ```ts
		* await db.insertInto('person')
		*   .orFail()
		*   .values({
		*     first_name: 'John',
		*     last_name: 'Doe',
		*     gender: 'female',
		*   })
		*   .execute()
		* ```
		*
		* The generated SQL (SQLite):
		*
		* ```sql
		* insert or fail into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
		* ```
		*/
		orFail() {
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: InsertQueryNode.cloneWith(_classPrivateFieldGet2(_props$30, this).queryNode, { orAction: OrActionNode.create("fail") })
			});
		}
		/**
		* Changes an `insert into` query to an `insert or replace into` query.
		*
		* This is only supported by some dialects like SQLite.
		*
		* You can also use {@link Kysely.replaceInto} to achieve the same result.
		*
		* See also, {@link orIgnore}, {@link orAbort}, {@link orFail}, and {@link orRollback}.
		*
		* ### Examples
		*
		* ```ts
		* await db.insertInto('person')
		*   .orReplace()
		*   .values({
		*     first_name: 'John',
		*     last_name: 'Doe',
		*     gender: 'female',
		*   })
		*   .execute()
		* ```
		*
		* The generated SQL (SQLite):
		*
		* ```sql
		* insert or replace into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
		* ```
		*/
		orReplace() {
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: InsertQueryNode.cloneWith(_classPrivateFieldGet2(_props$30, this).queryNode, { orAction: OrActionNode.create("replace") })
			});
		}
		/**
		* Changes an `insert into` query to an `insert or rollback into` query.
		*
		* This is only supported by some dialects like SQLite.
		*
		* See also, {@link orIgnore}, {@link orAbort}, {@link orFail}, and {@link orReplace}.
		*
		* ### Examples
		*
		* ```ts
		* await db.insertInto('person')
		*   .orRollback()
		*   .values({
		*     first_name: 'John',
		*     last_name: 'Doe',
		*     gender: 'female',
		*   })
		*   .execute()
		* ```
		*
		* The generated SQL (SQLite):
		*
		* ```sql
		* insert or rollback into "person" ("first_name", "last_name", "gender") values (?, ?, ?)
		* ```
		*/
		orRollback() {
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: InsertQueryNode.cloneWith(_classPrivateFieldGet2(_props$30, this).queryNode, { orAction: OrActionNode.create("rollback") })
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
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: QueryNode.cloneWithTop(_classPrivateFieldGet2(_props$30, this).queryNode, parseTop(expression, modifiers))
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
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: InsertQueryNode.cloneWith(_classPrivateFieldGet2(_props$30, this).queryNode, { onConflict: callback(new OnConflictBuilder({ onConflictNode: OnConflictNode.create() })).toOperationNode() })
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
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: InsertQueryNode.cloneWith(_classPrivateFieldGet2(_props$30, this).queryNode, { onDuplicateKey: OnDuplicateKeyNode.create(parseUpdateObjectExpression(update)) })
			});
		}
		returning(selection) {
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: QueryNode.cloneWithReturning(_classPrivateFieldGet2(_props$30, this).queryNode, parseSelectArg(selection))
			});
		}
		returningAll() {
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: QueryNode.cloneWithReturning(_classPrivateFieldGet2(_props$30, this).queryNode, parseSelectAll())
			});
		}
		output(args) {
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: QueryNode.cloneWithOutput(_classPrivateFieldGet2(_props$30, this).queryNode, parseSelectArg(args))
			});
		}
		outputAll(table) {
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: QueryNode.cloneWithOutput(_classPrivateFieldGet2(_props$30, this).queryNode, parseSelectAll(table))
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
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: QueryNode.cloneWithoutReturning(_classPrivateFieldGet2(_props$30, this).queryNode)
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
			if (condition) return func(this);
			return new InsertQueryBuilder({ ..._classPrivateFieldGet2(_props$30, this) });
		}
		/**
		* Change the output type of the query.
		*
		* This method call doesn't change the SQL in any way. This methods simply
		* returns a copy of this `InsertQueryBuilder` with a new output type.
		*/
		$castTo() {
			return new InsertQueryBuilder(_classPrivateFieldGet2(_props$30, this));
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
			return new InsertQueryBuilder(_classPrivateFieldGet2(_props$30, this));
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
			return new InsertQueryBuilder(_classPrivateFieldGet2(_props$30, this));
		}
		/**
		* Returns a copy of this InsertQueryBuilder instance with the given plugin installed.
		*/
		withPlugin(plugin) {
			return new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				executor: _classPrivateFieldGet2(_props$30, this).executor.withPlugin(plugin)
			});
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_props$30, this).executor.transformQuery(_classPrivateFieldGet2(_props$30, this).queryNode, _classPrivateFieldGet2(_props$30, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$30, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$30, this).queryId);
		}
		async execute(options) {
			const compiledQuery = this.compile();
			const result = await _classPrivateFieldGet2(_props$30, this).executor.executeQuery(compiledQuery, options);
			const { adapter } = _classPrivateFieldGet2(_props$30, this).executor;
			const query = compiledQuery.query;
			if (query.returning && adapter.supportsReturning || query.output && adapter.supportsOutput) return result.rows;
			return [new InsertResult(result.insertId, result.numAffectedRows ?? BigInt(0))];
		}
		async executeTakeFirst(options) {
			const [result] = await this.execute(options);
			return result;
		}
		async executeTakeFirstOrThrow(errorConstructorOrOptions) {
			if (typeof errorConstructorOrOptions === "function") errorConstructorOrOptions = { errorConstructor: errorConstructorOrOptions };
			const result = await this.executeTakeFirst(errorConstructorOrOptions);
			if (result === void 0) {
				const errorConstructor = errorConstructorOrOptions?.errorConstructor ?? NoResultError;
				throw isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
			}
			return result;
		}
		async *stream(chunkSizeOrOptions) {
			if (typeof chunkSizeOrOptions !== "object") chunkSizeOrOptions = { chunkSize: chunkSizeOrOptions };
			const compiledQuery = this.compile();
			const stream = _classPrivateFieldGet2(_props$30, this).executor.stream(compiledQuery, chunkSizeOrOptions.chunkSize ?? 100, chunkSizeOrOptions);
			for await (const item of stream) yield* item.rows;
		}
		async explain(format, options) {
			return await new InsertQueryBuilder({
				..._classPrivateFieldGet2(_props$30, this),
				queryNode: QueryNode.cloneWithExplain(_classPrivateFieldGet2(_props$30, this).queryNode, format, options)
			}).execute();
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/delete-result.js
var DeleteResult;
var init_delete_result = __esmMin((() => {
	init_defineProperty();
	DeleteResult = class {
		constructor(numDeletedRows) {
			_defineProperty(this, "numDeletedRows", void 0);
			this.numDeletedRows = numDeletedRows;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/limit-node.js
var LimitNode;
var init_limit_node = __esmMin((() => {
	init_object_utils();
	LimitNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/delete-query-builder.js
function _join$2(joinType, args) {
	return new _a$3({
		..._classPrivateFieldGet2(_props$29, this),
		queryNode: QueryNode.cloneWithJoin(_classPrivateFieldGet2(_props$29, this).queryNode, parseJoin(joinType, args))
	});
}
var _a$3, _props$29, _DeleteQueryBuilder_brand, DeleteQueryBuilder;
var init_delete_query_builder = __esmMin((() => {
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_assertClassBrand();
	init_join_parser();
	init_table_parser();
	init_select_parser();
	init_query_node();
	init_object_utils();
	init_no_result_error();
	init_delete_result();
	init_delete_query_node();
	init_limit_node();
	init_order_by_parser();
	init_binary_operation_parser();
	init_value_parser();
	init_top_parser();
	_props$29 = /* @__PURE__ */ new WeakMap();
	_DeleteQueryBuilder_brand = /* @__PURE__ */ new WeakSet();
	DeleteQueryBuilder = class {
		constructor(props) {
			_classPrivateMethodInitSpec(this, _DeleteQueryBuilder_brand);
			_classPrivateFieldInitSpec(this, _props$29, void 0);
			_classPrivateFieldSet2(_props$29, this, freeze(props));
		}
		where(...args) {
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: QueryNode.cloneWithWhere(_classPrivateFieldGet2(_props$29, this).queryNode, parseValueBinaryOperationOrExpression(args))
			});
		}
		whereRef(lhs, op, rhs) {
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: QueryNode.cloneWithWhere(_classPrivateFieldGet2(_props$29, this).queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
			});
		}
		clearWhere() {
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: QueryNode.cloneWithoutWhere(_classPrivateFieldGet2(_props$29, this).queryNode)
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
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: QueryNode.cloneWithTop(_classPrivateFieldGet2(_props$29, this).queryNode, parseTop(expression, modifiers))
			});
		}
		using(tables) {
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: DeleteQueryNode.cloneWithUsing(_classPrivateFieldGet2(_props$29, this).queryNode, parseTableExpressionOrList(tables))
			});
		}
		innerJoin(...args) {
			return _assertClassBrand(_DeleteQueryBuilder_brand, this, _join$2).call(this, "InnerJoin", args);
		}
		leftJoin(...args) {
			return _assertClassBrand(_DeleteQueryBuilder_brand, this, _join$2).call(this, "LeftJoin", args);
		}
		rightJoin(...args) {
			return _assertClassBrand(_DeleteQueryBuilder_brand, this, _join$2).call(this, "RightJoin", args);
		}
		fullJoin(...args) {
			return _assertClassBrand(_DeleteQueryBuilder_brand, this, _join$2).call(this, "FullJoin", args);
		}
		returning(selection) {
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: QueryNode.cloneWithReturning(_classPrivateFieldGet2(_props$29, this).queryNode, parseSelectArg(selection))
			});
		}
		returningAll(table) {
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: QueryNode.cloneWithReturning(_classPrivateFieldGet2(_props$29, this).queryNode, parseSelectAll(table))
			});
		}
		output(args) {
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: QueryNode.cloneWithOutput(_classPrivateFieldGet2(_props$29, this).queryNode, parseSelectArg(args))
			});
		}
		outputAll(table) {
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: QueryNode.cloneWithOutput(_classPrivateFieldGet2(_props$29, this).queryNode, parseSelectAll(table))
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
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: QueryNode.cloneWithoutReturning(_classPrivateFieldGet2(_props$29, this).queryNode)
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
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: DeleteQueryNode.cloneWithoutLimit(_classPrivateFieldGet2(_props$29, this).queryNode)
			});
		}
		orderBy(...args) {
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: QueryNode.cloneWithOrderByItems(_classPrivateFieldGet2(_props$29, this).queryNode, parseOrderBy(args))
			});
		}
		clearOrderBy() {
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: QueryNode.cloneWithoutOrderBy(_classPrivateFieldGet2(_props$29, this).queryNode)
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
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: DeleteQueryNode.cloneWithLimit(_classPrivateFieldGet2(_props$29, this).queryNode, LimitNode.create(parseValueExpression(limit)))
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
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: QueryNode.cloneWithEndModifier(_classPrivateFieldGet2(_props$29, this).queryNode, modifier.toOperationNode())
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
			if (condition) return func(this);
			return new _a$3({ ..._classPrivateFieldGet2(_props$29, this) });
		}
		/**
		* Change the output type of the query.
		*
		* This method call doesn't change the SQL in any way. This methods simply
		* returns a copy of this `DeleteQueryBuilder` with a new output type.
		*/
		$castTo() {
			return new _a$3(_classPrivateFieldGet2(_props$29, this));
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
			return new _a$3(_classPrivateFieldGet2(_props$29, this));
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
			return new _a$3(_classPrivateFieldGet2(_props$29, this));
		}
		/**
		* Returns a copy of this DeleteQueryBuilder instance with the given plugin installed.
		*/
		withPlugin(plugin) {
			return new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				executor: _classPrivateFieldGet2(_props$29, this).executor.withPlugin(plugin)
			});
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_props$29, this).executor.transformQuery(_classPrivateFieldGet2(_props$29, this).queryNode, _classPrivateFieldGet2(_props$29, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$29, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$29, this).queryId);
		}
		async execute(options) {
			const compiledQuery = this.compile();
			const result = await _classPrivateFieldGet2(_props$29, this).executor.executeQuery(compiledQuery, options);
			const { adapter } = _classPrivateFieldGet2(_props$29, this).executor;
			const query = compiledQuery.query;
			if (query.returning && adapter.supportsReturning || query.output && adapter.supportsOutput) return result.rows;
			return [new DeleteResult(result.numAffectedRows ?? BigInt(0))];
		}
		async executeTakeFirst(options) {
			const [result] = await this.execute(options);
			return result;
		}
		async executeTakeFirstOrThrow(errorConstructorOrOptions) {
			if (typeof errorConstructorOrOptions === "function") errorConstructorOrOptions = { errorConstructor: errorConstructorOrOptions };
			const result = await this.executeTakeFirst(errorConstructorOrOptions);
			if (result === void 0) {
				const errorConstructor = errorConstructorOrOptions?.errorConstructor ?? NoResultError;
				throw isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
			}
			return result;
		}
		async *stream(chunkSizeOrOptions) {
			if (typeof chunkSizeOrOptions !== "object") chunkSizeOrOptions = { chunkSize: chunkSizeOrOptions };
			const compiledQuery = this.compile();
			const stream = _classPrivateFieldGet2(_props$29, this).executor.stream(compiledQuery, chunkSizeOrOptions.chunkSize ?? 100, chunkSizeOrOptions);
			for await (const item of stream) yield* item.rows;
		}
		async explain(format, options) {
			return await new _a$3({
				..._classPrivateFieldGet2(_props$29, this),
				queryNode: QueryNode.cloneWithExplain(_classPrivateFieldGet2(_props$29, this).queryNode, format, options)
			}).execute();
		}
	};
	_a$3 = DeleteQueryBuilder;
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/update-result.js
var UpdateResult;
var init_update_result = __esmMin((() => {
	init_defineProperty();
	UpdateResult = class {
		constructor(numUpdatedRows, numChangedRows) {
			_defineProperty(
				this,
				/**
				* The number of rows the update query updated (even if not changed).
				*/
				"numUpdatedRows",
				void 0
			);
			_defineProperty(
				this,
				/**
				* The number of rows the update query changed.
				*
				* This is **optional** and only supported in dialects such as MySQL.
				* You would probably use {@link numUpdatedRows} in most cases.
				*/
				"numChangedRows",
				void 0
			);
			this.numUpdatedRows = numUpdatedRows;
			this.numChangedRows = numChangedRows;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/update-query-builder.js
function _join$1(joinType, args) {
	return new _a$2({
		..._classPrivateFieldGet2(_props$28, this),
		queryNode: QueryNode.cloneWithJoin(_classPrivateFieldGet2(_props$28, this).queryNode, parseJoin(joinType, args))
	});
}
var _a$2, _props$28, _UpdateQueryBuilder_brand, UpdateQueryBuilder;
var init_update_query_builder = __esmMin((() => {
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_assertClassBrand();
	init_join_parser();
	init_table_parser();
	init_select_parser();
	init_query_node();
	init_update_query_node();
	init_update_set_parser();
	init_object_utils();
	init_update_result();
	init_no_result_error();
	init_binary_operation_parser();
	init_value_parser();
	init_limit_node();
	init_top_parser();
	init_order_by_parser();
	_props$28 = /* @__PURE__ */ new WeakMap();
	_UpdateQueryBuilder_brand = /* @__PURE__ */ new WeakSet();
	UpdateQueryBuilder = class {
		constructor(props) {
			_classPrivateMethodInitSpec(this, _UpdateQueryBuilder_brand);
			_classPrivateFieldInitSpec(this, _props$28, void 0);
			_classPrivateFieldSet2(_props$28, this, freeze(props));
		}
		where(...args) {
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: QueryNode.cloneWithWhere(_classPrivateFieldGet2(_props$28, this).queryNode, parseValueBinaryOperationOrExpression(args))
			});
		}
		whereRef(lhs, op, rhs) {
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: QueryNode.cloneWithWhere(_classPrivateFieldGet2(_props$28, this).queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
			});
		}
		clearWhere() {
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: QueryNode.cloneWithoutWhere(_classPrivateFieldGet2(_props$28, this).queryNode)
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
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: QueryNode.cloneWithTop(_classPrivateFieldGet2(_props$28, this).queryNode, parseTop(expression, modifiers))
			});
		}
		from(from) {
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: UpdateQueryNode.cloneWithFromItems(_classPrivateFieldGet2(_props$28, this).queryNode, parseTableExpressionOrList(from))
			});
		}
		innerJoin(...args) {
			return _assertClassBrand(_UpdateQueryBuilder_brand, this, _join$1).call(this, "InnerJoin", args);
		}
		leftJoin(...args) {
			return _assertClassBrand(_UpdateQueryBuilder_brand, this, _join$1).call(this, "LeftJoin", args);
		}
		rightJoin(...args) {
			return _assertClassBrand(_UpdateQueryBuilder_brand, this, _join$1).call(this, "RightJoin", args);
		}
		fullJoin(...args) {
			return _assertClassBrand(_UpdateQueryBuilder_brand, this, _join$1).call(this, "FullJoin", args);
		}
		orderBy(...args) {
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: QueryNode.cloneWithOrderByItems(_classPrivateFieldGet2(_props$28, this).queryNode, parseOrderBy(args))
			});
		}
		clearOrderBy() {
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: QueryNode.cloneWithoutOrderBy(_classPrivateFieldGet2(_props$28, this).queryNode)
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
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: UpdateQueryNode.cloneWithLimit(_classPrivateFieldGet2(_props$28, this).queryNode, LimitNode.create(parseValueExpression(limit)))
			});
		}
		set(...args) {
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: UpdateQueryNode.cloneWithUpdates(_classPrivateFieldGet2(_props$28, this).queryNode, parseUpdate(...args))
			});
		}
		returning(selection) {
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: QueryNode.cloneWithReturning(_classPrivateFieldGet2(_props$28, this).queryNode, parseSelectArg(selection))
			});
		}
		returningAll(table) {
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: QueryNode.cloneWithReturning(_classPrivateFieldGet2(_props$28, this).queryNode, parseSelectAll(table))
			});
		}
		output(args) {
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: QueryNode.cloneWithOutput(_classPrivateFieldGet2(_props$28, this).queryNode, parseSelectArg(args))
			});
		}
		outputAll(table) {
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: QueryNode.cloneWithOutput(_classPrivateFieldGet2(_props$28, this).queryNode, parseSelectAll(table))
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
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: QueryNode.cloneWithEndModifier(_classPrivateFieldGet2(_props$28, this).queryNode, modifier.toOperationNode())
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
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: QueryNode.cloneWithoutReturning(_classPrivateFieldGet2(_props$28, this).queryNode)
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
			if (condition) return func(this);
			return new _a$2({ ..._classPrivateFieldGet2(_props$28, this) });
		}
		/**
		* Change the output type of the query.
		*
		* This method call doesn't change the SQL in any way. This methods simply
		* returns a copy of this `UpdateQueryBuilder` with a new output type.
		*/
		$castTo() {
			return new _a$2(_classPrivateFieldGet2(_props$28, this));
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
			return new _a$2(_classPrivateFieldGet2(_props$28, this));
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
			return new _a$2(_classPrivateFieldGet2(_props$28, this));
		}
		/**
		* Returns a copy of this UpdateQueryBuilder instance with the given plugin installed.
		*/
		withPlugin(plugin) {
			return new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				executor: _classPrivateFieldGet2(_props$28, this).executor.withPlugin(plugin)
			});
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_props$28, this).executor.transformQuery(_classPrivateFieldGet2(_props$28, this).queryNode, _classPrivateFieldGet2(_props$28, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$28, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$28, this).queryId);
		}
		async execute(options) {
			const compiledQuery = this.compile();
			const result = await _classPrivateFieldGet2(_props$28, this).executor.executeQuery(compiledQuery, options);
			const { adapter } = _classPrivateFieldGet2(_props$28, this).executor;
			const query = compiledQuery.query;
			if (query.returning && adapter.supportsReturning || query.output && adapter.supportsOutput) return result.rows;
			return [new UpdateResult(result.numAffectedRows ?? BigInt(0), result.numChangedRows)];
		}
		async executeTakeFirst(options) {
			const [result] = await this.execute(options);
			return result;
		}
		async executeTakeFirstOrThrow(errorConstructorOrOptions) {
			if (typeof errorConstructorOrOptions === "function") errorConstructorOrOptions = { errorConstructor: errorConstructorOrOptions };
			const result = await this.executeTakeFirst(errorConstructorOrOptions);
			if (result === void 0) {
				const errorConstructor = errorConstructorOrOptions?.errorConstructor ?? NoResultError;
				throw isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
			}
			return result;
		}
		async *stream(chunkSizeOrOptions) {
			if (typeof chunkSizeOrOptions !== "object") chunkSizeOrOptions = { chunkSize: chunkSizeOrOptions };
			const compiledQuery = this.compile();
			const stream = _classPrivateFieldGet2(_props$28, this).executor.stream(compiledQuery, chunkSizeOrOptions.chunkSize ?? 100, chunkSizeOrOptions);
			for await (const item of stream) yield* item.rows;
		}
		async explain(format, options) {
			return await new _a$2({
				..._classPrivateFieldGet2(_props$28, this),
				queryNode: QueryNode.cloneWithExplain(_classPrivateFieldGet2(_props$28, this).queryNode, format, options)
			}).execute();
		}
	};
	_a$2 = UpdateQueryBuilder;
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/common-table-expression-name-node.js
var CommonTableExpressionNameNode;
var init_common_table_expression_name_node = __esmMin((() => {
	init_object_utils();
	init_column_node();
	init_table_node();
	CommonTableExpressionNameNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/common-table-expression-node.js
var CommonTableExpressionNode;
var init_common_table_expression_node = __esmMin((() => {
	init_object_utils();
	CommonTableExpressionNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/cte-builder.js
var _props$27, CTEBuilder;
var init_cte_builder = __esmMin((() => {
	init_common_table_expression_node();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$27 = /* @__PURE__ */ new WeakMap();
	CTEBuilder = class CTEBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$27, void 0);
			_classPrivateFieldSet2(_props$27, this, freeze(props));
		}
		/**
		* Makes the common table expression materialized.
		*/
		materialized() {
			return new CTEBuilder({
				..._classPrivateFieldGet2(_props$27, this),
				node: CommonTableExpressionNode.cloneWith(_classPrivateFieldGet2(_props$27, this).node, { materialized: true })
			});
		}
		/**
		* Makes the common table expression not materialized.
		*/
		notMaterialized() {
			return new CTEBuilder({
				..._classPrivateFieldGet2(_props$27, this),
				node: CommonTableExpressionNode.cloneWith(_classPrivateFieldGet2(_props$27, this).node, { materialized: false })
			});
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_props$27, this).node;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/with-parser.js
function parseCommonTableExpression(nameOrBuilderCallback, expression) {
	const expressionNode = isOperationNodeSource(expression) ? expression.toOperationNode() : expression(createQueryCreator()).toOperationNode();
	if (isFunction(nameOrBuilderCallback)) return nameOrBuilderCallback(cteBuilderFactory(expressionNode)).toOperationNode();
	return CommonTableExpressionNode.create(parseCommonTableExpressionName(nameOrBuilderCallback), expressionNode);
}
function cteBuilderFactory(expressionNode) {
	return (name) => {
		return new CTEBuilder({ node: CommonTableExpressionNode.create(parseCommonTableExpressionName(name), expressionNode) });
	};
}
function parseCommonTableExpressionName(name) {
	if (name.includes("(")) {
		const parts = name.split(/[\(\)]/);
		const table = parts[0];
		const columns = parts[1].split(",").map((it) => it.trim());
		return CommonTableExpressionNameNode.create(table, columns);
	} else return CommonTableExpressionNameNode.create(name);
}
var init_with_parser = __esmMin((() => {
	init_common_table_expression_name_node();
	init_parse_utils();
	init_object_utils();
	init_cte_builder();
	init_common_table_expression_node();
	init_operation_node_source();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/with-node.js
var WithNode;
var init_with_node = __esmMin((() => {
	init_object_utils();
	WithNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/random-string.js
function randomString(length) {
	let chars = "";
	for (let i = 0; i < length; ++i) chars += randomChar();
	return chars;
}
function randomChar() {
	return CHARS[~~(Math.random() * CHARS.length)];
}
var CHARS;
var init_random_string = __esmMin((() => {
	CHARS = [
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/query-id.js
function createQueryId() {
	return new LazyQueryId();
}
var _queryId$2, LazyQueryId;
var init_query_id = __esmMin((() => {
	init_random_string();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldGet2();
	init_classPrivateFieldSet2();
	_queryId$2 = /* @__PURE__ */ new WeakMap();
	LazyQueryId = class {
		constructor() {
			_classPrivateFieldInitSpec(this, _queryId$2, void 0);
		}
		get queryId() {
			if (_classPrivateFieldGet2(_queryId$2, this) === void 0) _classPrivateFieldSet2(_queryId$2, this, randomString(8));
			return _classPrivateFieldGet2(_queryId$2, this);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/operation-node-transformer.js
var _transformers, OperationNodeTransformer;
var init_operation_node_transformer = __esmMin((() => {
	init_object_utils();
	init_defineProperty();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldGet2();
	_transformers = /* @__PURE__ */ new WeakMap();
	OperationNodeTransformer = class {
		constructor() {
			_defineProperty(this, "nodeStack", []);
			_classPrivateFieldInitSpec(this, _transformers, freeze({
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
				RenameConstraintNode: this.transformRenameConstraint.bind(this),
				ForeignKeyConstraintNode: this.transformForeignKeyConstraint.bind(this),
				CreateViewNode: this.transformCreateView.bind(this),
				RefreshMaterializedViewNode: this.transformRefreshMaterializedView.bind(this),
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
				OutputNode: this.transformOutput.bind(this),
				OrActionNode: this.transformOrAction.bind(this),
				CollateNode: this.transformCollate.bind(this),
				AlterTypeNode: this.transformAlterType.bind(this),
				AddValueNode: this.transformAddValue.bind(this),
				RenameValueNode: this.transformRenameValue.bind(this)
			}));
		}
		transformNode(node, queryId) {
			if (!node) return node;
			this.nodeStack.push(node);
			const out = this.transformNodeImpl(node, queryId);
			this.nodeStack.pop();
			return freeze(out);
		}
		transformNodeImpl(node, queryId) {
			return _classPrivateFieldGet2(_transformers, this)[node.kind](node, queryId);
		}
		transformNodeList(list, queryId) {
			if (!list) return list;
			return freeze(list.map((node) => this.transformNode(node, queryId)));
		}
		transformSelectQuery(node, queryId) {
			return {
				kind: "SelectQueryNode",
				from: this.transformNode(node.from, queryId),
				selections: this.transformNodeList(node.selections, queryId),
				distinctOn: this.transformNodeList(node.distinctOn, queryId),
				joins: this.transformNodeList(node.joins, queryId),
				groupBy: this.transformNode(node.groupBy, queryId),
				orderBy: this.transformNode(node.orderBy, queryId),
				where: this.transformNode(node.where, queryId),
				frontModifiers: this.transformNodeList(node.frontModifiers, queryId),
				endModifiers: this.transformNodeList(node.endModifiers, queryId),
				limit: this.transformNode(node.limit, queryId),
				offset: this.transformNode(node.offset, queryId),
				with: this.transformNode(node.with, queryId),
				having: this.transformNode(node.having, queryId),
				explain: this.transformNode(node.explain, queryId),
				setOperations: this.transformNodeList(node.setOperations, queryId),
				fetch: this.transformNode(node.fetch, queryId),
				top: this.transformNode(node.top, queryId)
			};
		}
		transformSelection(node, queryId) {
			return {
				kind: "SelectionNode",
				selection: this.transformNode(node.selection, queryId)
			};
		}
		transformColumn(node, queryId) {
			return {
				kind: "ColumnNode",
				column: this.transformNode(node.column, queryId)
			};
		}
		transformAlias(node, queryId) {
			return {
				kind: "AliasNode",
				node: this.transformNode(node.node, queryId),
				alias: this.transformNode(node.alias, queryId)
			};
		}
		transformTable(node, queryId) {
			return {
				kind: "TableNode",
				table: this.transformNode(node.table, queryId)
			};
		}
		transformFrom(node, queryId) {
			return {
				kind: "FromNode",
				froms: this.transformNodeList(node.froms, queryId)
			};
		}
		transformReference(node, queryId) {
			return {
				kind: "ReferenceNode",
				column: this.transformNode(node.column, queryId),
				table: this.transformNode(node.table, queryId)
			};
		}
		transformAnd(node, queryId) {
			return {
				kind: "AndNode",
				left: this.transformNode(node.left, queryId),
				right: this.transformNode(node.right, queryId)
			};
		}
		transformOr(node, queryId) {
			return {
				kind: "OrNode",
				left: this.transformNode(node.left, queryId),
				right: this.transformNode(node.right, queryId)
			};
		}
		transformValueList(node, queryId) {
			return {
				kind: "ValueListNode",
				values: this.transformNodeList(node.values, queryId)
			};
		}
		transformParens(node, queryId) {
			return {
				kind: "ParensNode",
				node: this.transformNode(node.node, queryId)
			};
		}
		transformJoin(node, queryId) {
			return {
				kind: "JoinNode",
				joinType: node.joinType,
				table: this.transformNode(node.table, queryId),
				on: this.transformNode(node.on, queryId)
			};
		}
		transformRaw(node, queryId) {
			return {
				kind: "RawNode",
				sqlFragments: freeze([...node.sqlFragments]),
				parameters: this.transformNodeList(node.parameters, queryId)
			};
		}
		transformWhere(node, queryId) {
			return {
				kind: "WhereNode",
				where: this.transformNode(node.where, queryId)
			};
		}
		transformInsertQuery(node, queryId) {
			return {
				kind: "InsertQueryNode",
				into: this.transformNode(node.into, queryId),
				columns: this.transformNodeList(node.columns, queryId),
				values: this.transformNode(node.values, queryId),
				returning: this.transformNode(node.returning, queryId),
				onConflict: this.transformNode(node.onConflict, queryId),
				onDuplicateKey: this.transformNode(node.onDuplicateKey, queryId),
				endModifiers: this.transformNodeList(node.endModifiers, queryId),
				with: this.transformNode(node.with, queryId),
				orAction: this.transformNode(node.orAction, queryId),
				replace: node.replace,
				explain: this.transformNode(node.explain, queryId),
				defaultValues: node.defaultValues,
				top: this.transformNode(node.top, queryId),
				output: this.transformNode(node.output, queryId)
			};
		}
		transformValues(node, queryId) {
			return {
				kind: "ValuesNode",
				values: this.transformNodeList(node.values, queryId)
			};
		}
		transformDeleteQuery(node, queryId) {
			return {
				kind: "DeleteQueryNode",
				from: this.transformNode(node.from, queryId),
				using: this.transformNode(node.using, queryId),
				joins: this.transformNodeList(node.joins, queryId),
				where: this.transformNode(node.where, queryId),
				returning: this.transformNode(node.returning, queryId),
				endModifiers: this.transformNodeList(node.endModifiers, queryId),
				with: this.transformNode(node.with, queryId),
				orderBy: this.transformNode(node.orderBy, queryId),
				limit: this.transformNode(node.limit, queryId),
				explain: this.transformNode(node.explain, queryId),
				top: this.transformNode(node.top, queryId),
				output: this.transformNode(node.output, queryId)
			};
		}
		transformReturning(node, queryId) {
			return {
				kind: "ReturningNode",
				selections: this.transformNodeList(node.selections, queryId)
			};
		}
		transformCreateTable(node, queryId) {
			return {
				kind: "CreateTableNode",
				table: this.transformNode(node.table, queryId),
				columns: this.transformNodeList(node.columns, queryId),
				constraints: this.transformNodeList(node.constraints, queryId),
				indexes: this.transformNodeList(node.indexes, queryId),
				temporary: node.temporary,
				ifNotExists: node.ifNotExists,
				onCommit: node.onCommit,
				frontModifiers: this.transformNodeList(node.frontModifiers, queryId),
				endModifiers: this.transformNodeList(node.endModifiers, queryId),
				selectQuery: this.transformNode(node.selectQuery, queryId)
			};
		}
		transformColumnDefinition(node, queryId) {
			return {
				kind: "ColumnDefinitionNode",
				column: this.transformNode(node.column, queryId),
				dataType: this.transformNode(node.dataType, queryId),
				references: this.transformNode(node.references, queryId),
				primaryKey: node.primaryKey,
				autoIncrement: node.autoIncrement,
				unique: node.unique,
				notNull: node.notNull,
				unsigned: node.unsigned,
				defaultTo: this.transformNode(node.defaultTo, queryId),
				check: this.transformNode(node.check, queryId),
				generated: this.transformNode(node.generated, queryId),
				frontModifiers: this.transformNodeList(node.frontModifiers, queryId),
				endModifiers: this.transformNodeList(node.endModifiers, queryId),
				nullsNotDistinct: node.nullsNotDistinct,
				identity: node.identity,
				ifNotExists: node.ifNotExists
			};
		}
		transformAddColumn(node, queryId) {
			return {
				kind: "AddColumnNode",
				column: this.transformNode(node.column, queryId)
			};
		}
		transformDropTable(node, queryId) {
			return {
				kind: "DropTableNode",
				table: this.transformNode(node.table, queryId),
				ifExists: node.ifExists,
				cascade: node.cascade,
				temporary: node.temporary
			};
		}
		transformOrderBy(node, queryId) {
			return {
				kind: "OrderByNode",
				items: this.transformNodeList(node.items, queryId)
			};
		}
		transformOrderByItem(node, queryId) {
			return {
				kind: "OrderByItemNode",
				orderBy: this.transformNode(node.orderBy, queryId),
				direction: this.transformNode(node.direction, queryId),
				collation: this.transformNode(node.collation, queryId),
				nulls: node.nulls
			};
		}
		transformGroupBy(node, queryId) {
			return {
				kind: "GroupByNode",
				items: this.transformNodeList(node.items, queryId)
			};
		}
		transformGroupByItem(node, queryId) {
			return {
				kind: "GroupByItemNode",
				groupBy: this.transformNode(node.groupBy, queryId)
			};
		}
		transformUpdateQuery(node, queryId) {
			return {
				kind: "UpdateQueryNode",
				table: this.transformNode(node.table, queryId),
				from: this.transformNode(node.from, queryId),
				joins: this.transformNodeList(node.joins, queryId),
				where: this.transformNode(node.where, queryId),
				updates: this.transformNodeList(node.updates, queryId),
				returning: this.transformNode(node.returning, queryId),
				endModifiers: this.transformNodeList(node.endModifiers, queryId),
				with: this.transformNode(node.with, queryId),
				explain: this.transformNode(node.explain, queryId),
				limit: this.transformNode(node.limit, queryId),
				top: this.transformNode(node.top, queryId),
				output: this.transformNode(node.output, queryId),
				orderBy: this.transformNode(node.orderBy, queryId)
			};
		}
		transformColumnUpdate(node, queryId) {
			return {
				kind: "ColumnUpdateNode",
				column: this.transformNode(node.column, queryId),
				value: this.transformNode(node.value, queryId)
			};
		}
		transformLimit(node, queryId) {
			return {
				kind: "LimitNode",
				limit: this.transformNode(node.limit, queryId)
			};
		}
		transformOffset(node, queryId) {
			return {
				kind: "OffsetNode",
				offset: this.transformNode(node.offset, queryId)
			};
		}
		transformOnConflict(node, queryId) {
			return {
				kind: "OnConflictNode",
				columns: this.transformNodeList(node.columns, queryId),
				constraint: this.transformNode(node.constraint, queryId),
				indexExpression: this.transformNode(node.indexExpression, queryId),
				indexWhere: this.transformNode(node.indexWhere, queryId),
				updates: this.transformNodeList(node.updates, queryId),
				updateWhere: this.transformNode(node.updateWhere, queryId),
				doNothing: node.doNothing
			};
		}
		transformOnDuplicateKey(node, queryId) {
			return {
				kind: "OnDuplicateKeyNode",
				updates: this.transformNodeList(node.updates, queryId)
			};
		}
		transformCreateIndex(node, queryId) {
			return {
				kind: "CreateIndexNode",
				name: this.transformNode(node.name, queryId),
				table: this.transformNode(node.table, queryId),
				columns: this.transformNodeList(node.columns, queryId),
				unique: node.unique,
				using: this.transformNode(node.using, queryId),
				ifNotExists: node.ifNotExists,
				where: this.transformNode(node.where, queryId),
				nullsNotDistinct: node.nullsNotDistinct
			};
		}
		transformList(node, queryId) {
			return {
				kind: "ListNode",
				items: this.transformNodeList(node.items, queryId)
			};
		}
		transformDropIndex(node, queryId) {
			return {
				kind: "DropIndexNode",
				name: this.transformNode(node.name, queryId),
				table: this.transformNode(node.table, queryId),
				ifExists: node.ifExists,
				cascade: node.cascade
			};
		}
		transformPrimaryKeyConstraint(node, queryId) {
			return {
				kind: "PrimaryKeyConstraintNode",
				columns: this.transformNodeList(node.columns, queryId),
				name: this.transformNode(node.name, queryId),
				deferrable: node.deferrable,
				initiallyDeferred: node.initiallyDeferred
			};
		}
		transformUniqueConstraint(node, queryId) {
			return {
				kind: "UniqueConstraintNode",
				columns: this.transformNodeList(node.columns, queryId),
				name: this.transformNode(node.name, queryId),
				nullsNotDistinct: node.nullsNotDistinct,
				deferrable: node.deferrable,
				initiallyDeferred: node.initiallyDeferred
			};
		}
		transformForeignKeyConstraint(node, queryId) {
			return {
				kind: "ForeignKeyConstraintNode",
				columns: this.transformNodeList(node.columns, queryId),
				references: this.transformNode(node.references, queryId),
				name: this.transformNode(node.name, queryId),
				onDelete: node.onDelete,
				onUpdate: node.onUpdate,
				deferrable: node.deferrable,
				initiallyDeferred: node.initiallyDeferred
			};
		}
		transformSetOperation(node, queryId) {
			return {
				kind: "SetOperationNode",
				operator: node.operator,
				expression: this.transformNode(node.expression, queryId),
				all: node.all
			};
		}
		transformReferences(node, queryId) {
			return {
				kind: "ReferencesNode",
				table: this.transformNode(node.table, queryId),
				columns: this.transformNodeList(node.columns, queryId),
				onDelete: node.onDelete,
				onUpdate: node.onUpdate
			};
		}
		transformCheckConstraint(node, queryId) {
			return {
				kind: "CheckConstraintNode",
				expression: this.transformNode(node.expression, queryId),
				name: this.transformNode(node.name, queryId)
			};
		}
		transformWith(node, queryId) {
			return {
				kind: "WithNode",
				expressions: this.transformNodeList(node.expressions, queryId),
				recursive: node.recursive
			};
		}
		transformCommonTableExpression(node, queryId) {
			return {
				kind: "CommonTableExpressionNode",
				name: this.transformNode(node.name, queryId),
				materialized: node.materialized,
				expression: this.transformNode(node.expression, queryId)
			};
		}
		transformCommonTableExpressionName(node, queryId) {
			return {
				kind: "CommonTableExpressionNameNode",
				table: this.transformNode(node.table, queryId),
				columns: this.transformNodeList(node.columns, queryId)
			};
		}
		transformHaving(node, queryId) {
			return {
				kind: "HavingNode",
				having: this.transformNode(node.having, queryId)
			};
		}
		transformCreateSchema(node, queryId) {
			return {
				kind: "CreateSchemaNode",
				schema: this.transformNode(node.schema, queryId),
				ifNotExists: node.ifNotExists
			};
		}
		transformDropSchema(node, queryId) {
			return {
				kind: "DropSchemaNode",
				schema: this.transformNode(node.schema, queryId),
				ifExists: node.ifExists,
				cascade: node.cascade
			};
		}
		transformAlterTable(node, queryId) {
			return {
				kind: "AlterTableNode",
				table: this.transformNode(node.table, queryId),
				renameTo: this.transformNode(node.renameTo, queryId),
				setSchema: this.transformNode(node.setSchema, queryId),
				columnAlterations: this.transformNodeList(node.columnAlterations, queryId),
				addConstraint: this.transformNode(node.addConstraint, queryId),
				dropConstraint: this.transformNode(node.dropConstraint, queryId),
				renameConstraint: this.transformNode(node.renameConstraint, queryId),
				addIndex: this.transformNode(node.addIndex, queryId),
				dropIndex: this.transformNode(node.dropIndex, queryId)
			};
		}
		transformDropColumn(node, queryId) {
			return {
				kind: "DropColumnNode",
				column: this.transformNode(node.column, queryId),
				ifExists: node.ifExists
			};
		}
		transformRenameColumn(node, queryId) {
			return {
				kind: "RenameColumnNode",
				column: this.transformNode(node.column, queryId),
				renameTo: this.transformNode(node.renameTo, queryId)
			};
		}
		transformAlterColumn(node, queryId) {
			return {
				kind: "AlterColumnNode",
				column: this.transformNode(node.column, queryId),
				dataType: this.transformNode(node.dataType, queryId),
				dataTypeExpression: this.transformNode(node.dataTypeExpression, queryId),
				setDefault: this.transformNode(node.setDefault, queryId),
				dropDefault: node.dropDefault,
				setNotNull: node.setNotNull,
				dropNotNull: node.dropNotNull
			};
		}
		transformModifyColumn(node, queryId) {
			return {
				kind: "ModifyColumnNode",
				column: this.transformNode(node.column, queryId)
			};
		}
		transformAddConstraint(node, queryId) {
			return {
				kind: "AddConstraintNode",
				constraint: this.transformNode(node.constraint, queryId)
			};
		}
		transformDropConstraint(node, queryId) {
			return {
				kind: "DropConstraintNode",
				constraintName: this.transformNode(node.constraintName, queryId),
				ifExists: node.ifExists,
				modifier: node.modifier
			};
		}
		transformRenameConstraint(node, queryId) {
			return {
				kind: "RenameConstraintNode",
				oldName: this.transformNode(node.oldName, queryId),
				newName: this.transformNode(node.newName, queryId)
			};
		}
		transformCreateView(node, queryId) {
			return {
				kind: "CreateViewNode",
				name: this.transformNode(node.name, queryId),
				temporary: node.temporary,
				orReplace: node.orReplace,
				ifNotExists: node.ifNotExists,
				materialized: node.materialized,
				columns: this.transformNodeList(node.columns, queryId),
				as: this.transformNode(node.as, queryId)
			};
		}
		transformRefreshMaterializedView(node, queryId) {
			return {
				kind: "RefreshMaterializedViewNode",
				name: this.transformNode(node.name, queryId),
				concurrently: node.concurrently,
				withNoData: node.withNoData
			};
		}
		transformDropView(node, queryId) {
			return {
				kind: "DropViewNode",
				name: this.transformNode(node.name, queryId),
				ifExists: node.ifExists,
				materialized: node.materialized,
				cascade: node.cascade
			};
		}
		transformGenerated(node, queryId) {
			return {
				kind: "GeneratedNode",
				byDefault: node.byDefault,
				always: node.always,
				identity: node.identity,
				stored: node.stored,
				expression: this.transformNode(node.expression, queryId)
			};
		}
		transformDefaultValue(node, queryId) {
			return {
				kind: "DefaultValueNode",
				defaultValue: this.transformNode(node.defaultValue, queryId)
			};
		}
		transformOn(node, queryId) {
			return {
				kind: "OnNode",
				on: this.transformNode(node.on, queryId)
			};
		}
		transformSelectModifier(node, queryId) {
			return {
				kind: "SelectModifierNode",
				modifier: node.modifier,
				rawModifier: this.transformNode(node.rawModifier, queryId),
				of: this.transformNodeList(node.of, queryId)
			};
		}
		transformCreateType(node, queryId) {
			return {
				kind: "CreateTypeNode",
				name: this.transformNode(node.name, queryId),
				enum: this.transformNode(node.enum, queryId)
			};
		}
		transformDropType(node, queryId) {
			return {
				kind: "DropTypeNode",
				name: this.transformNode(node.name, queryId),
				additionalNames: this.transformNodeList(node.additionalNames, queryId),
				cascade: node.cascade,
				ifExists: node.ifExists
			};
		}
		transformExplain(node, queryId) {
			return {
				kind: "ExplainNode",
				format: node.format,
				options: this.transformNode(node.options, queryId)
			};
		}
		transformSchemableIdentifier(node, queryId) {
			return {
				kind: "SchemableIdentifierNode",
				schema: this.transformNode(node.schema, queryId),
				identifier: this.transformNode(node.identifier, queryId)
			};
		}
		transformAggregateFunction(node, queryId) {
			return {
				kind: "AggregateFunctionNode",
				func: node.func,
				aggregated: this.transformNodeList(node.aggregated, queryId),
				distinct: node.distinct,
				orderBy: this.transformNode(node.orderBy, queryId),
				withinGroup: this.transformNode(node.withinGroup, queryId),
				filter: this.transformNode(node.filter, queryId),
				over: this.transformNode(node.over, queryId)
			};
		}
		transformOver(node, queryId) {
			return {
				kind: "OverNode",
				orderBy: this.transformNode(node.orderBy, queryId),
				partitionBy: this.transformNode(node.partitionBy, queryId)
			};
		}
		transformPartitionBy(node, queryId) {
			return {
				kind: "PartitionByNode",
				items: this.transformNodeList(node.items, queryId)
			};
		}
		transformPartitionByItem(node, queryId) {
			return {
				kind: "PartitionByItemNode",
				partitionBy: this.transformNode(node.partitionBy, queryId)
			};
		}
		transformBinaryOperation(node, queryId) {
			return {
				kind: "BinaryOperationNode",
				leftOperand: this.transformNode(node.leftOperand, queryId),
				operator: this.transformNode(node.operator, queryId),
				rightOperand: this.transformNode(node.rightOperand, queryId)
			};
		}
		transformUnaryOperation(node, queryId) {
			return {
				kind: "UnaryOperationNode",
				operator: this.transformNode(node.operator, queryId),
				operand: this.transformNode(node.operand, queryId)
			};
		}
		transformUsing(node, queryId) {
			return {
				kind: "UsingNode",
				tables: this.transformNodeList(node.tables, queryId)
			};
		}
		transformFunction(node, queryId) {
			return {
				kind: "FunctionNode",
				func: node.func,
				arguments: this.transformNodeList(node.arguments, queryId)
			};
		}
		transformCase(node, queryId) {
			return {
				kind: "CaseNode",
				value: this.transformNode(node.value, queryId),
				when: this.transformNodeList(node.when, queryId),
				else: this.transformNode(node.else, queryId),
				isStatement: node.isStatement
			};
		}
		transformWhen(node, queryId) {
			return {
				kind: "WhenNode",
				condition: this.transformNode(node.condition, queryId),
				result: this.transformNode(node.result, queryId)
			};
		}
		transformJSONReference(node, queryId) {
			return {
				kind: "JSONReferenceNode",
				reference: this.transformNode(node.reference, queryId),
				traversal: this.transformNode(node.traversal, queryId)
			};
		}
		transformJSONPath(node, queryId) {
			return {
				kind: "JSONPathNode",
				inOperator: this.transformNode(node.inOperator, queryId),
				pathLegs: this.transformNodeList(node.pathLegs, queryId)
			};
		}
		transformJSONPathLeg(node, _queryId) {
			return {
				kind: "JSONPathLegNode",
				type: node.type,
				value: node.value
			};
		}
		transformJSONOperatorChain(node, queryId) {
			return {
				kind: "JSONOperatorChainNode",
				operator: this.transformNode(node.operator, queryId),
				values: this.transformNodeList(node.values, queryId)
			};
		}
		transformTuple(node, queryId) {
			return {
				kind: "TupleNode",
				values: this.transformNodeList(node.values, queryId)
			};
		}
		transformMergeQuery(node, queryId) {
			return {
				kind: "MergeQueryNode",
				into: this.transformNode(node.into, queryId),
				using: this.transformNode(node.using, queryId),
				whens: this.transformNodeList(node.whens, queryId),
				with: this.transformNode(node.with, queryId),
				top: this.transformNode(node.top, queryId),
				endModifiers: this.transformNodeList(node.endModifiers, queryId),
				output: this.transformNode(node.output, queryId),
				returning: this.transformNode(node.returning, queryId)
			};
		}
		transformMatched(node, _queryId) {
			return {
				kind: "MatchedNode",
				not: node.not,
				bySource: node.bySource
			};
		}
		transformAddIndex(node, queryId) {
			return {
				kind: "AddIndexNode",
				name: this.transformNode(node.name, queryId),
				columns: this.transformNodeList(node.columns, queryId),
				unique: node.unique,
				using: this.transformNode(node.using, queryId),
				ifNotExists: node.ifNotExists
			};
		}
		transformCast(node, queryId) {
			return {
				kind: "CastNode",
				expression: this.transformNode(node.expression, queryId),
				dataType: this.transformNode(node.dataType, queryId)
			};
		}
		transformFetch(node, queryId) {
			return {
				kind: "FetchNode",
				rowCount: this.transformNode(node.rowCount, queryId),
				modifier: node.modifier
			};
		}
		transformTop(node, _queryId) {
			return {
				kind: "TopNode",
				expression: node.expression,
				modifiers: node.modifiers
			};
		}
		transformOutput(node, queryId) {
			return {
				kind: "OutputNode",
				selections: this.transformNodeList(node.selections, queryId)
			};
		}
		transformAlterType(node, queryId) {
			return {
				kind: "AlterTypeNode",
				name: this.transformNode(node.name, queryId),
				addValue: this.transformNode(node.addValue, queryId),
				renameTo: this.transformNode(node.renameTo, queryId),
				renameValue: this.transformNode(node.renameValue, queryId),
				setSchema: this.transformNode(node.setSchema, queryId)
			};
		}
		transformAddValue(node, queryId) {
			return {
				kind: "AddValueNode",
				value: this.transformNode(node.value, queryId),
				ifNotExists: node.ifNotExists,
				isBefore: node.isBefore,
				neighborValue: this.transformNode(node.neighborValue, queryId)
			};
		}
		transformRenameValue(node, queryId) {
			return {
				kind: "RenameValueNode",
				oldValue: this.transformNode(node.oldValue, queryId),
				newValue: this.transformNode(node.newValue, queryId)
			};
		}
		transformDataType(node, _queryId) {
			return node;
		}
		transformSelectAll(node, _queryId) {
			return node;
		}
		transformIdentifier(node, _queryId) {
			return node;
		}
		transformValue(node, _queryId) {
			return node;
		}
		transformPrimitiveValueList(node, _queryId) {
			return node;
		}
		transformOperator(node, _queryId) {
			return node;
		}
		transformDefaultInsertValue(node, _queryId) {
			return node;
		}
		transformOrAction(node, _queryId) {
			return node;
		}
		transformCollate(node, _queryId) {
			return node;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/operation-node.js
function isOperationNode(thing) {
	return isObject(thing) && isString(thing.kind);
}
var init_operation_node = __esmMin((() => {
	init_object_utils();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/root-operation-node.js
function isRootOperationNode(thing) {
	return isOperationNode(thing) && ROOT_OPERATION_NODE_KINDS[thing.kind] === true;
}
var ROOT_OPERATION_NODE_KINDS;
var init_root_operation_node = __esmMin((() => {
	init_operation_node();
	ROOT_OPERATION_NODE_KINDS = {
		AlterTableNode: true,
		AlterTypeNode: true,
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
		RefreshMaterializedViewNode: true,
		DropViewNode: true,
		InsertQueryNode: true,
		RawNode: true,
		SelectQueryNode: true,
		UpdateQueryNode: true,
		MergeQueryNode: true
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/with-schema/with-schema-transformer.js
function _transformTableArgsWithoutSchemas(node, queryId, argsKey) {
	return SCHEMALESS_FUNCTIONS[node.func] ? node[argsKey].map((arg) => !TableNode.is(arg) || arg.table.schema ? this.transformNode(arg, queryId) : {
		...arg,
		table: this.transformIdentifier(arg.table.identifier, queryId)
	}) : this.transformNodeList(node[argsKey], queryId);
}
function _collectSchemableIds(node) {
	const schemableIds = /* @__PURE__ */ new Set();
	if ("name" in node && node.name && SchemableIdentifierNode.is(node.name)) _assertClassBrand(_WithSchemaTransformer_brand, this, _collectSchemableId).call(this, node.name, schemableIds);
	if ("from" in node && node.from) for (const from of node.from.froms) _assertClassBrand(_WithSchemaTransformer_brand, this, _collectSchemableIdsFromTableExpr).call(this, from, schemableIds);
	if ("into" in node && node.into) _assertClassBrand(_WithSchemaTransformer_brand, this, _collectSchemableIdsFromTableExpr).call(this, node.into, schemableIds);
	if ("table" in node && node.table) _assertClassBrand(_WithSchemaTransformer_brand, this, _collectSchemableIdsFromTableExpr).call(this, node.table, schemableIds);
	if ("joins" in node && node.joins) for (const join of node.joins) _assertClassBrand(_WithSchemaTransformer_brand, this, _collectSchemableIdsFromTableExpr).call(this, join.table, schemableIds);
	if ("using" in node && node.using) if (JoinNode.is(node.using)) _assertClassBrand(_WithSchemaTransformer_brand, this, _collectSchemableIdsFromTableExpr).call(this, node.using.table, schemableIds);
	else _assertClassBrand(_WithSchemaTransformer_brand, this, _collectSchemableIdsFromTableExpr).call(this, node.using, schemableIds);
	return schemableIds;
}
function _collectCTEs(node) {
	const ctes = /* @__PURE__ */ new Set();
	if ("with" in node && node.with) _assertClassBrand(_WithSchemaTransformer_brand, this, _collectCTEIds).call(this, node.with, ctes);
	return ctes;
}
function _collectSchemableIdsFromTableExpr(node, schemableIds) {
	if (TableNode.is(node)) return _assertClassBrand(_WithSchemaTransformer_brand, this, _collectSchemableId).call(this, node.table, schemableIds);
	if (AliasNode.is(node) && TableNode.is(node.node)) return _assertClassBrand(_WithSchemaTransformer_brand, this, _collectSchemableId).call(this, node.node.table, schemableIds);
	if (ListNode.is(node)) {
		for (const table of node.items) _assertClassBrand(_WithSchemaTransformer_brand, this, _collectSchemableIdsFromTableExpr).call(this, table, schemableIds);
		return;
	}
	if (UsingNode.is(node)) {
		for (const table of node.tables) _assertClassBrand(_WithSchemaTransformer_brand, this, _collectSchemableIdsFromTableExpr).call(this, table, schemableIds);
		return;
	}
}
function _collectSchemableId(node, schemableIds) {
	const id = node.identifier.name;
	if (!_classPrivateFieldGet2(_schemableIds, this).has(id) && !_classPrivateFieldGet2(_ctes, this).has(id)) schemableIds.add(id);
}
function _collectCTEIds(node, ctes) {
	for (const expr of node.expressions) {
		const cteId = expr.name.table.table.identifier.name;
		if (!_classPrivateFieldGet2(_ctes, this).has(cteId)) ctes.add(cteId);
	}
}
var SCHEMALESS_FUNCTIONS, _schema, _schemableIds, _ctes, _WithSchemaTransformer_brand, WithSchemaTransformer;
var init_with_schema_transformer = __esmMin((() => {
	init_alias_node();
	init_identifier_node();
	init_join_node();
	init_list_node();
	init_operation_node_transformer();
	init_root_operation_node();
	init_schemable_identifier_node();
	init_table_node();
	init_using_node();
	init_object_utils();
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_assertClassBrand();
	init_classPrivateFieldGet2();
	SCHEMALESS_FUNCTIONS = freeze({
		json_agg: true,
		to_json: true
	});
	_schema = /* @__PURE__ */ new WeakMap();
	_schemableIds = /* @__PURE__ */ new WeakMap();
	_ctes = /* @__PURE__ */ new WeakMap();
	_WithSchemaTransformer_brand = /* @__PURE__ */ new WeakSet();
	WithSchemaTransformer = class extends OperationNodeTransformer {
		constructor(schema) {
			super();
			_classPrivateMethodInitSpec(this, _WithSchemaTransformer_brand);
			_classPrivateFieldInitSpec(this, _schema, void 0);
			_classPrivateFieldInitSpec(this, _schemableIds, /* @__PURE__ */ new Set());
			_classPrivateFieldInitSpec(this, _ctes, /* @__PURE__ */ new Set());
			_classPrivateFieldSet2(_schema, this, schema);
		}
		transformNodeImpl(node, queryId) {
			if (!isRootOperationNode(node)) return super.transformNodeImpl(node, queryId);
			const ctes = _assertClassBrand(_WithSchemaTransformer_brand, this, _collectCTEs).call(this, node);
			for (const cte of ctes) _classPrivateFieldGet2(_ctes, this).add(cte);
			const tables = _assertClassBrand(_WithSchemaTransformer_brand, this, _collectSchemableIds).call(this, node);
			for (const table of tables) _classPrivateFieldGet2(_schemableIds, this).add(table);
			const transformed = super.transformNodeImpl(node, queryId);
			for (const table of tables) _classPrivateFieldGet2(_schemableIds, this).delete(table);
			for (const cte of ctes) _classPrivateFieldGet2(_ctes, this).delete(cte);
			return transformed;
		}
		transformSchemableIdentifier(node, queryId) {
			const transformed = super.transformSchemableIdentifier(node, queryId);
			if (transformed.schema || !_classPrivateFieldGet2(_schemableIds, this).has(node.identifier.name)) return transformed;
			return {
				...transformed,
				schema: IdentifierNode.create(_classPrivateFieldGet2(_schema, this))
			};
		}
		transformReferences(node, queryId) {
			const transformed = super.transformReferences(node, queryId);
			if (transformed.table.table.schema) return transformed;
			return {
				...transformed,
				table: TableNode.createWithSchema(_classPrivateFieldGet2(_schema, this), transformed.table.table.identifier.name)
			};
		}
		transformAggregateFunction(node, queryId) {
			return {
				...super.transformAggregateFunction({
					...node,
					aggregated: []
				}, queryId),
				aggregated: _assertClassBrand(_WithSchemaTransformer_brand, this, _transformTableArgsWithoutSchemas).call(this, node, queryId, "aggregated")
			};
		}
		transformFunction(node, queryId) {
			return {
				...super.transformFunction({
					...node,
					arguments: []
				}, queryId),
				arguments: _assertClassBrand(_WithSchemaTransformer_brand, this, _transformTableArgsWithoutSchemas).call(this, node, queryId, "arguments")
			};
		}
		transformSelectModifier(node, queryId) {
			return {
				...super.transformSelectModifier({
					...node,
					of: void 0
				}, queryId),
				of: node.of?.map((item) => TableNode.is(item) && !item.table.schema ? {
					...item,
					table: this.transformIdentifier(item.table.identifier, queryId)
				} : this.transformNode(item, queryId))
			};
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/with-schema/with-schema-plugin.js
var _transformer$4, WithSchemaPlugin;
var init_with_schema_plugin = __esmMin((() => {
	init_with_schema_transformer();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_transformer$4 = /* @__PURE__ */ new WeakMap();
	WithSchemaPlugin = class {
		constructor(schema) {
			_classPrivateFieldInitSpec(this, _transformer$4, void 0);
			_classPrivateFieldSet2(_transformer$4, this, new WithSchemaTransformer(schema));
		}
		transformQuery(args) {
			return _classPrivateFieldGet2(_transformer$4, this).transformNode(args.node, args.queryId);
		}
		async transformResult(args) {
			return args.result;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/matched-node.js
var MatchedNode;
var init_matched_node = __esmMin((() => {
	init_object_utils();
	MatchedNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/merge-parser.js
function parseMergeWhen(type, args, refRight) {
	return WhenNode.create(parseFilterList([MatchedNode.create(!type.isMatched, type.bySource), ...args && args.length > 0 ? [args.length === 3 && refRight ? parseReferentialBinaryOperation(args[0], args[1], args[2]) : parseValueBinaryOperationOrExpression(args)] : []], "and", false));
}
function parseMergeThen(result) {
	if (isString(result)) return RawNode.create([result], []);
	if (isOperationNodeSource(result)) return result.toOperationNode();
	return result;
}
var init_merge_parser = __esmMin((() => {
	init_matched_node();
	init_operation_node_source();
	init_raw_node();
	init_when_node();
	init_object_utils();
	init_binary_operation_parser();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/deferred.js
var _promise$1, _resolve$1, _reject, Deferred;
var init_deferred = __esmMin((() => {
	init_classPrivateFieldInitSpec();
	init_defineProperty();
	init_classPrivateFieldGet2();
	init_classPrivateFieldSet2();
	_promise$1 = /* @__PURE__ */ new WeakMap();
	_resolve$1 = /* @__PURE__ */ new WeakMap();
	_reject = /* @__PURE__ */ new WeakMap();
	Deferred = class {
		constructor() {
			_classPrivateFieldInitSpec(this, _promise$1, void 0);
			_classPrivateFieldInitSpec(this, _resolve$1, void 0);
			_classPrivateFieldInitSpec(this, _reject, void 0);
			_defineProperty(this, "resolve", (value) => {
				_classPrivateFieldGet2(_resolve$1, this)?.call(this, value);
				_classPrivateFieldSet2(_resolve$1, this, _classPrivateFieldSet2(_reject, this, void 0));
			});
			_defineProperty(this, "reject", (reason) => {
				_classPrivateFieldGet2(_reject, this)?.call(this, reason);
				_classPrivateFieldSet2(_reject, this, _classPrivateFieldSet2(_resolve$1, this, void 0));
			});
			_classPrivateFieldSet2(_promise$1, this, new Promise((resolve, reject) => {
				_classPrivateFieldSet2(_reject, this, reject);
				_classPrivateFieldSet2(_resolve$1, this, resolve);
			}));
		}
		get promise() {
			return _classPrivateFieldGet2(_promise$1, this);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/provide-controlled-connection.js
async function provideControlledConnection(connectionProvider, options) {
	const connectionDefer = new Deferred();
	const connectionReleaseDefer = new Deferred();
	connectionProvider.provideConnection(async (connection) => {
		connectionDefer.resolve(connection);
		return await connectionReleaseDefer.promise;
	}, options).catch((ex) => connectionDefer.reject(ex));
	return freeze({
		connection: await connectionDefer.promise,
		release: connectionReleaseDefer.resolve
	});
}
var init_provide_controlled_connection = __esmMin((() => {
	init_deferred();
	init_object_utils();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/abort.js
function getInflightQueryAbortHandler(abortStrategy = "ignore query", connection, beforeThrow) {
	if (abortStrategy === "ignore query") return;
	if (abortStrategy === "cancel query") {
		const handler = connection.cancelQuery;
		if (!handler) throwUnsupportedInflightQueryAbortStrategyError(abortStrategy, connection.killSession ? "kill session" : void 0);
		return handler.bind(connection);
	}
	if (abortStrategy === "kill session") {
		const handler = connection.killSession;
		if (!handler) throwUnsupportedInflightQueryAbortStrategyError(abortStrategy, connection.cancelQuery ? "cancel query" : void 0);
		return handler.bind(connection);
	}
	beforeThrow();
	throw new Error(`Unexpected \`inflightQueryAbortStrategy\`: "${abortStrategy}"`);
}
function throwUnsupportedInflightQueryAbortStrategyError(abortStrategy, alt) {
	throw new Error(`This dialect doesn't support \`inflightQueryAbortStrategy\` "${abortStrategy}". Use "ignore query"${alt ? ` or "${alt}"` : ""} instead.`);
}
function assertNotAborted(signal, timing, beforeThrow) {
	if (signal?.aborted) {
		beforeThrow?.();
		throwReasonWithTiming(signal.reason, timing);
	}
}
function throwReasonWithTiming(reason, timing) {
	decorateWithTiming(reason, timing);
	throw reason;
}
async function waitOrAbort(promise, signal, name, onAbort) {
	if (!signal) return promise;
	assertNotAborted(signal, `before ${name}`, onAbort);
	const { promise: abortPromise, resolve } = new Deferred();
	const abortListener = () => resolve(ABORTED);
	signal.addEventListener("abort", abortListener);
	try {
		assertNotAborted(signal, `before ${name}`, onAbort);
		const result = await Promise.race([promise, abortPromise]);
		if (result !== ABORTED) return result;
		onAbort?.();
		throwReasonWithTiming(signal.reason, `during ${name}`);
	} finally {
		signal.removeEventListener("abort", abortListener);
		resolve(ABORTED);
	}
}
function printBackgroundFail(name) {
	return (reason) => console.error(`\`${name}\` failed in the background after abortion: ${getMessage(reason)}`);
}
function decorateWithTiming(reason, timing) {
	if (reason !== null && typeof reason === "object" && !Object.isFrozen(reason)) Object.defineProperty(reason, "__kysely_timing__", {
		configurable: true,
		enumerable: false,
		value: timing,
		writable: false
	});
}
var ABORTED;
var init_abort = __esmMin((() => {
	init_deferred();
	init_object_utils();
	ABORTED = {};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-executor/query-executor-base.js
async function _transformResult(result, queryId, options) {
	const { signal } = options || {};
	for (const plugin of _classPrivateFieldGet2(_plugins, this)) result = await plugin.transformResult(freeze({
		queryId,
		result,
		signal
	}));
	return result;
}
var NO_PLUGINS, _plugins, _QueryExecutorBase_brand, QueryExecutorBase;
var init_query_executor_base = __esmMin((() => {
	init_object_utils();
	init_provide_controlled_connection();
	init_abort();
	init_deferred();
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_assertClassBrand();
	NO_PLUGINS = freeze([]);
	_plugins = /* @__PURE__ */ new WeakMap();
	_QueryExecutorBase_brand = /* @__PURE__ */ new WeakSet();
	QueryExecutorBase = class {
		constructor(plugins = NO_PLUGINS) {
			_classPrivateMethodInitSpec(this, _QueryExecutorBase_brand);
			_classPrivateFieldInitSpec(this, _plugins, void 0);
			_classPrivateFieldSet2(_plugins, this, plugins);
		}
		get plugins() {
			return _classPrivateFieldGet2(_plugins, this);
		}
		transformQuery(node, queryId) {
			for (const plugin of _classPrivateFieldGet2(_plugins, this)) {
				const transformedNode = plugin.transformQuery({
					node,
					queryId
				});
				if (transformedNode.kind === node.kind) node = transformedNode;
				else throw new Error([
					`KyselyPlugin.transformQuery must return a node`,
					`of the same kind that was given to it.`,
					`The plugin was given a ${node.kind}`,
					`but it returned a ${transformedNode.kind}`
				].join(" "));
			}
			return node;
		}
		async executeQuery(compiledQuery, options) {
			const { inflightQueryAbortStrategy = "ignore query", signal } = options || {};
			if (!signal) {
				const result = await this.provideConnection(async (connection) => {
					return await connection.executeQuery(compiledQuery);
				}, options);
				return await _assertClassBrand(_QueryExecutorBase_brand, this, _transformResult).call(this, result, compiledQuery.queryId);
			}
			assertNotAborted(signal, "before query execution");
			options = freeze({ signal });
			const { connection, release } = await provideControlledConnection(this, options);
			const controlConnectionProvider = this.provideConnection.bind(this);
			const { promise: abortPromise, resolve } = new Deferred();
			const abortListener = () => resolve(ABORTED);
			signal.addEventListener("abort", abortListener, { once: true });
			try {
				assertNotAborted(signal, "before query execution", release);
				const inflightQueryAbortHandler = getInflightQueryAbortHandler(inflightQueryAbortStrategy, connection, release);
				if (inflightQueryAbortHandler && connection.collectSessionInfo) {
					assertNotAborted(signal, "before query execution", release);
					const collectPromise = connection.collectSessionInfo();
					if (await Promise.race([abortPromise, collectPromise]).catch((error) => {
						release();
						throw error;
					}) === ABORTED) {
						collectPromise.catch(printBackgroundFail("collectSessionInfo")).finally(release);
						throwReasonWithTiming(signal.reason, "before query execution");
					}
				}
				const queryPromise = connection.executeQuery(compiledQuery, options);
				const result = await Promise.race([abortPromise, queryPromise]).catch((error) => {
					release();
					throw error;
				});
				if (result === ABORTED) {
					Promise.allSettled([queryPromise.catch(printBackgroundFail("query")), inflightQueryAbortHandler?.(controlConnectionProvider).catch(printBackgroundFail("inflightQueryAbortHandler"))]).finally(release);
					throwReasonWithTiming(signal.reason, "during query execution");
				} else release();
				const transformPromise = _assertClassBrand(_QueryExecutorBase_brand, this, _transformResult).call(this, result, compiledQuery.queryId, options);
				const transformedResult = await Promise.race([abortPromise, transformPromise]);
				if (transformedResult === ABORTED) {
					transformPromise.catch(printBackgroundFail("plugins.transformResult"));
					throwReasonWithTiming(signal.reason, "during result transformation");
				}
				return transformedResult;
			} finally {
				resolve(ABORTED);
				signal.removeEventListener("abort", abortListener);
			}
		}
		async *stream(compiledQuery, chunkSize, options) {
			const { signal } = options || {};
			if (!signal) {
				const { connection, release } = await provideControlledConnection(this);
				try {
					for await (const result of connection.streamQuery(compiledQuery, chunkSize)) yield await _assertClassBrand(_QueryExecutorBase_brand, this, _transformResult).call(this, result, compiledQuery.queryId, options);
				} finally {
					release();
				}
				return;
			}
			options = freeze({ signal });
			assertNotAborted(signal, "before connection acquisition");
			const { connection, release } = await provideControlledConnection(this, options);
			const { promise: abortPromise, resolve } = new Deferred();
			const abortListener = () => resolve(ABORTED);
			signal.addEventListener("abort", abortListener, { once: true });
			let asyncIterator;
			let releasePrerequisite;
			assertNotAborted(signal, "before query streaming", release);
			const { queryId } = compiledQuery;
			try {
				asyncIterator = connection.streamQuery(compiledQuery, chunkSize, options);
				while (true) {
					assertNotAborted(signal, "during query streaming");
					const nextPromise = asyncIterator.next();
					const result = await Promise.race([abortPromise, nextPromise]);
					if (result === ABORTED) {
						releasePrerequisite = nextPromise.catch(printBackgroundFail("iterator.next"));
						throwReasonWithTiming(signal.reason, "during query streaming");
					}
					if (result.done) break;
					const transformPromise = _assertClassBrand(_QueryExecutorBase_brand, this, _transformResult).call(this, result.value, queryId, options);
					const transformedResult = await Promise.race([abortPromise, transformPromise]);
					if (transformedResult === ABORTED) {
						releasePrerequisite = transformPromise.catch(printBackgroundFail("plugins.transformResult"));
						throwReasonWithTiming(signal.reason, "during result transformation");
					}
					yield transformedResult;
				}
			} finally {
				resolve(ABORTED);
				signal.removeEventListener("abort", abortListener);
				const cleanup = (asyncIterator?.return?.() || Promise.resolve()).finally(() => releasePrerequisite).finally(release);
				if (!releasePrerequisite) await cleanup;
			}
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-executor/noop-query-executor.js
var NoopQueryExecutor, NOOP_QUERY_EXECUTOR;
var init_noop_query_executor = __esmMin((() => {
	init_query_executor_base();
	NoopQueryExecutor = class NoopQueryExecutor extends QueryExecutorBase {
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
	};
	NOOP_QUERY_EXECUTOR = new NoopQueryExecutor();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/merge-result.js
var MergeResult;
var init_merge_result = __esmMin((() => {
	init_defineProperty();
	MergeResult = class {
		constructor(numChangedRows) {
			_defineProperty(this, "numChangedRows", void 0);
			this.numChangedRows = numChangedRows;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/merge-query-builder.js
function _whenMatched(args, refRight) {
	return new MatchedThenableMergeQueryBuilder({
		..._classPrivateFieldGet2(_props2$3, this),
		queryNode: MergeQueryNode.cloneWithWhen(_classPrivateFieldGet2(_props2$3, this).queryNode, parseMergeWhen({ isMatched: true }, args, refRight))
	});
}
function _whenNotMatched(args, refRight = false, bySource = false) {
	const props = {
		..._classPrivateFieldGet2(_props2$3, this),
		queryNode: MergeQueryNode.cloneWithWhen(_classPrivateFieldGet2(_props2$3, this).queryNode, parseMergeWhen({
			isMatched: false,
			bySource
		}, args, refRight))
	};
	return new (bySource ? MatchedThenableMergeQueryBuilder : NotMatchedThenableMergeQueryBuilder)(props);
}
var _props$26, MergeQueryBuilder, _props2$3, _WheneableMergeQueryBuilder_brand, WheneableMergeQueryBuilder, _props3$2, MatchedThenableMergeQueryBuilder, _props4$2, NotMatchedThenableMergeQueryBuilder;
var init_merge_query_builder = __esmMin((() => {
	init_insert_query_node();
	init_merge_query_node();
	init_query_node();
	init_update_query_node();
	init_insert_values_parser();
	init_join_parser();
	init_merge_parser();
	init_select_parser();
	init_top_parser();
	init_noop_query_executor();
	init_object_utils();
	init_merge_result();
	init_no_result_error();
	init_update_query_builder();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_classPrivateMethodInitSpec();
	init_assertClassBrand();
	_props$26 = /* @__PURE__ */ new WeakMap();
	MergeQueryBuilder = class MergeQueryBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$26, void 0);
			_classPrivateFieldSet2(_props$26, this, freeze(props));
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
			return new MergeQueryBuilder({
				..._classPrivateFieldGet2(_props$26, this),
				queryNode: QueryNode.cloneWithEndModifier(_classPrivateFieldGet2(_props$26, this).queryNode, modifier.toOperationNode())
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
			return new MergeQueryBuilder({
				..._classPrivateFieldGet2(_props$26, this),
				queryNode: QueryNode.cloneWithTop(_classPrivateFieldGet2(_props$26, this).queryNode, parseTop(expression, modifiers))
			});
		}
		using(...args) {
			return new WheneableMergeQueryBuilder({
				..._classPrivateFieldGet2(_props$26, this),
				queryNode: MergeQueryNode.cloneWithUsing(_classPrivateFieldGet2(_props$26, this).queryNode, parseJoin("Using", args))
			});
		}
		returning(args) {
			return new MergeQueryBuilder({
				..._classPrivateFieldGet2(_props$26, this),
				queryNode: QueryNode.cloneWithReturning(_classPrivateFieldGet2(_props$26, this).queryNode, parseSelectArg(args))
			});
		}
		returningAll(table) {
			return new MergeQueryBuilder({
				..._classPrivateFieldGet2(_props$26, this),
				queryNode: QueryNode.cloneWithReturning(_classPrivateFieldGet2(_props$26, this).queryNode, parseSelectAll(table))
			});
		}
		output(args) {
			return new MergeQueryBuilder({
				..._classPrivateFieldGet2(_props$26, this),
				queryNode: QueryNode.cloneWithOutput(_classPrivateFieldGet2(_props$26, this).queryNode, parseSelectArg(args))
			});
		}
		outputAll(table) {
			return new MergeQueryBuilder({
				..._classPrivateFieldGet2(_props$26, this),
				queryNode: QueryNode.cloneWithOutput(_classPrivateFieldGet2(_props$26, this).queryNode, parseSelectAll(table))
			});
		}
	};
	_props2$3 = /* @__PURE__ */ new WeakMap();
	_WheneableMergeQueryBuilder_brand = /* @__PURE__ */ new WeakSet();
	WheneableMergeQueryBuilder = class WheneableMergeQueryBuilder {
		constructor(props) {
			_classPrivateMethodInitSpec(this, _WheneableMergeQueryBuilder_brand);
			_classPrivateFieldInitSpec(this, _props2$3, void 0);
			_classPrivateFieldSet2(_props2$3, this, freeze(props));
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
			return new WheneableMergeQueryBuilder({
				..._classPrivateFieldGet2(_props2$3, this),
				queryNode: QueryNode.cloneWithEndModifier(_classPrivateFieldGet2(_props2$3, this).queryNode, modifier.toOperationNode())
			});
		}
		/**
		* See {@link MergeQueryBuilder.top}.
		*/
		top(expression, modifiers) {
			return new WheneableMergeQueryBuilder({
				..._classPrivateFieldGet2(_props2$3, this),
				queryNode: QueryNode.cloneWithTop(_classPrivateFieldGet2(_props2$3, this).queryNode, parseTop(expression, modifiers))
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
			return _assertClassBrand(_WheneableMergeQueryBuilder_brand, this, _whenMatched).call(this, []);
		}
		whenMatchedAnd(...args) {
			return _assertClassBrand(_WheneableMergeQueryBuilder_brand, this, _whenMatched).call(this, args);
		}
		/**
		* Adds the `when matched` clause to the query with an `and` condition. But unlike
		* {@link whenMatchedAnd}, this method accepts a column reference as the 3rd argument.
		*
		* This method is similar to {@link SelectQueryBuilder.whereRef}, so see the documentation
		* for that method for more examples.
		*/
		whenMatchedAndRef(lhs, op, rhs) {
			return _assertClassBrand(_WheneableMergeQueryBuilder_brand, this, _whenMatched).call(this, [
				lhs,
				op,
				rhs
			], true);
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
			return _assertClassBrand(_WheneableMergeQueryBuilder_brand, this, _whenNotMatched).call(this, []);
		}
		whenNotMatchedAnd(...args) {
			return _assertClassBrand(_WheneableMergeQueryBuilder_brand, this, _whenNotMatched).call(this, args);
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
			return _assertClassBrand(_WheneableMergeQueryBuilder_brand, this, _whenNotMatched).call(this, [
				lhs,
				op,
				rhs
			], true);
		}
		/**
		* Adds a simple `when not matched by source` clause to the query.
		*
		* Supported in MS SQL Server.
		*
		* Similar to {@link whenNotMatched}, but returns a {@link MatchedThenableMergeQueryBuilder}.
		*/
		whenNotMatchedBySource() {
			return _assertClassBrand(_WheneableMergeQueryBuilder_brand, this, _whenNotMatched).call(this, [], false, true);
		}
		whenNotMatchedBySourceAnd(...args) {
			return _assertClassBrand(_WheneableMergeQueryBuilder_brand, this, _whenNotMatched).call(this, args, false, true);
		}
		/**
		* Adds the `when not matched by source` clause to the query with an `and` condition.
		*
		* Similar to {@link whenNotMatchedAndRef}, but you can reference columns from
		* the target table, and not from source table and returns a {@link MatchedThenableMergeQueryBuilder}.
		*/
		whenNotMatchedBySourceAndRef(lhs, op, rhs) {
			return _assertClassBrand(_WheneableMergeQueryBuilder_brand, this, _whenNotMatched).call(this, [
				lhs,
				op,
				rhs
			], true, true);
		}
		returning(args) {
			return new WheneableMergeQueryBuilder({
				..._classPrivateFieldGet2(_props2$3, this),
				queryNode: QueryNode.cloneWithReturning(_classPrivateFieldGet2(_props2$3, this).queryNode, parseSelectArg(args))
			});
		}
		returningAll(table) {
			return new WheneableMergeQueryBuilder({
				..._classPrivateFieldGet2(_props2$3, this),
				queryNode: QueryNode.cloneWithReturning(_classPrivateFieldGet2(_props2$3, this).queryNode, parseSelectAll(table))
			});
		}
		output(args) {
			return new WheneableMergeQueryBuilder({
				..._classPrivateFieldGet2(_props2$3, this),
				queryNode: QueryNode.cloneWithOutput(_classPrivateFieldGet2(_props2$3, this).queryNode, parseSelectArg(args))
			});
		}
		outputAll(table) {
			return new WheneableMergeQueryBuilder({
				..._classPrivateFieldGet2(_props2$3, this),
				queryNode: QueryNode.cloneWithOutput(_classPrivateFieldGet2(_props2$3, this).queryNode, parseSelectAll(table))
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
			if (condition) return func(this);
			return new WheneableMergeQueryBuilder({ ..._classPrivateFieldGet2(_props2$3, this) });
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_props2$3, this).executor.transformQuery(_classPrivateFieldGet2(_props2$3, this).queryNode, _classPrivateFieldGet2(_props2$3, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props2$3, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props2$3, this).queryId);
		}
		async execute(options) {
			const compiledQuery = this.compile();
			const result = await _classPrivateFieldGet2(_props2$3, this).executor.executeQuery(compiledQuery, options);
			const { adapter } = _classPrivateFieldGet2(_props2$3, this).executor;
			const query = compiledQuery.query;
			if (query.returning && adapter.supportsReturning || query.output && adapter.supportsOutput) return result.rows;
			return [new MergeResult(result.numAffectedRows)];
		}
		async executeTakeFirst(options) {
			const [result] = await this.execute(options);
			return result;
		}
		async executeTakeFirstOrThrow(errorConstructorOrOptions) {
			if (typeof errorConstructorOrOptions === "function") errorConstructorOrOptions = { errorConstructor: errorConstructorOrOptions };
			const result = await this.executeTakeFirst(errorConstructorOrOptions);
			if (result === void 0) {
				const errorConstructor = errorConstructorOrOptions?.errorConstructor ?? NoResultError;
				throw isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
			}
			return result;
		}
	};
	_props3$2 = /* @__PURE__ */ new WeakMap();
	MatchedThenableMergeQueryBuilder = class {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props3$2, void 0);
			_classPrivateFieldSet2(_props3$2, this, freeze(props));
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
				..._classPrivateFieldGet2(_props3$2, this),
				queryNode: MergeQueryNode.cloneWithThen(_classPrivateFieldGet2(_props3$2, this).queryNode, parseMergeThen("delete"))
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
				..._classPrivateFieldGet2(_props3$2, this),
				queryNode: MergeQueryNode.cloneWithThen(_classPrivateFieldGet2(_props3$2, this).queryNode, parseMergeThen("do nothing"))
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
				..._classPrivateFieldGet2(_props3$2, this),
				queryNode: MergeQueryNode.cloneWithThen(_classPrivateFieldGet2(_props3$2, this).queryNode, parseMergeThen(set(new UpdateQueryBuilder({
					queryId: _classPrivateFieldGet2(_props3$2, this).queryId,
					executor: NOOP_QUERY_EXECUTOR,
					queryNode: UpdateQueryNode.createWithoutTable()
				}))))
			});
		}
		thenUpdateSet(...args) {
			return this.thenUpdate((ub) => ub.set(...args));
		}
	};
	_props4$2 = /* @__PURE__ */ new WeakMap();
	NotMatchedThenableMergeQueryBuilder = class {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props4$2, void 0);
			_classPrivateFieldSet2(_props4$2, this, freeze(props));
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
				..._classPrivateFieldGet2(_props4$2, this),
				queryNode: MergeQueryNode.cloneWithThen(_classPrivateFieldGet2(_props4$2, this).queryNode, parseMergeThen("do nothing"))
			});
		}
		thenInsertValues(insert) {
			const [columns, values] = parseInsertExpression(insert);
			return new WheneableMergeQueryBuilder({
				..._classPrivateFieldGet2(_props4$2, this),
				queryNode: MergeQueryNode.cloneWithThen(_classPrivateFieldGet2(_props4$2, this).queryNode, parseMergeThen(InsertQueryNode.cloneWith(InsertQueryNode.createWithoutInto(), {
					columns,
					values
				})))
			});
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-creator.js
var _props$25, QueryCreator;
var init_query_creator = __esmMin((() => {
	init_select_query_builder();
	init_insert_query_builder();
	init_delete_query_builder();
	init_update_query_builder();
	init_delete_query_node();
	init_insert_query_node();
	init_select_query_node();
	init_update_query_node();
	init_table_parser();
	init_with_parser();
	init_with_node();
	init_query_id();
	init_with_schema_plugin();
	init_object_utils();
	init_select_parser();
	init_merge_query_builder();
	init_merge_query_node();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$25 = /* @__PURE__ */ new WeakMap();
	QueryCreator = class QueryCreator {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$25, void 0);
			_classPrivateFieldSet2(_props$25, this, freeze(props));
		}
		/**
		* Creates a `select` query builder for the given table or tables.
		*
		* The tables passed to this method are built as the query's `from` clause.
		*
		* ### Examples
		*
		* Create a select query for one table:
		*
		* ```ts
		* db.selectFrom('person').selectAll()
		* ```
		*
		* The generated SQL (PostgreSQL):
		*
		* ```sql
		* select * from "person"
		* ```
		*
		* Create a select query for one table with an alias:
		*
		* ```ts
		* const persons = await db.selectFrom('person as p')
		*   .select(['p.id', 'first_name'])
		*   .execute()
		*
		* console.log(persons[0].id)
		* ```
		*
		* The generated SQL (PostgreSQL):
		*
		* ```sql
		* select "p"."id", "first_name" from "person" as "p"
		* ```
		*
		* Create a select query from a subquery:
		*
		* ```ts
		* const persons = await db.selectFrom(
		*     (eb) => eb.selectFrom('person').select('person.id as identifier').as('p')
		*   )
		*   .select('p.identifier')
		*   .execute()
		*
		* console.log(persons[0].identifier)
		* ```
		*
		* The generated SQL (PostgreSQL):
		*
		* ```sql
		* select "p"."identifier",
		* from (
		*   select "person"."id" as "identifier" from "person"
		* ) as p
		* ```
		*
		* Create a select query from raw sql:
		*
		* ```ts
		* import { sql } from 'kysely'
		*
		* const items = await db
		*   .selectFrom(sql<{ one: number }>`(select 1 as one)`.as('q'))
		*   .select('q.one')
		*   .execute()
		*
		* console.log(items[0].one)
		* ```
		*
		* The generated SQL (PostgreSQL):
		*
		* ```sql
		* select "q"."one",
		* from (
		*   select 1 as one
		* ) as q
		* ```
		*
		* When you use the `sql` tag you need to also provide the result type of the
		* raw snippet / query so that Kysely can figure out what columns are
		* available for the rest of the query.
		*
		* The `selectFrom` method also accepts an array for multiple tables. All
		* the above examples can also be used in an array.
		*
		* ```ts
		* import { sql } from 'kysely'
		*
		* const items = await db.selectFrom([
		*     'person as p',
		*     db.selectFrom('pet').select('pet.species').as('a'),
		*     sql<{ one: number }>`(select 1 as one)`.as('q')
		*   ])
		*   .select(['p.id', 'a.species', 'q.one'])
		*   .execute()
		* ```
		*
		* The generated SQL (PostgreSQL):
		*
		* ```sql
		* select "p".id, "a"."species", "q"."one"
		* from
		*   "person" as "p",
		*   (select "pet"."species" from "pet") as a,
		*   (select 1 as one) as "q"
		* ```
		*/
		selectFrom(from) {
			return createSelectQueryBuilder({
				queryId: createQueryId(),
				executor: _classPrivateFieldGet2(_props$25, this).executor,
				queryNode: SelectQueryNode.createFrom(parseTableExpressionOrList(from), _classPrivateFieldGet2(_props$25, this).withNode)
			});
		}
		selectNoFrom(selection) {
			return createSelectQueryBuilder({
				queryId: createQueryId(),
				executor: _classPrivateFieldGet2(_props$25, this).executor,
				queryNode: SelectQueryNode.cloneWithSelections(SelectQueryNode.create(_classPrivateFieldGet2(_props$25, this).withNode), parseSelectArg(selection))
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
				executor: _classPrivateFieldGet2(_props$25, this).executor,
				queryNode: InsertQueryNode.create(parseTable(table), _classPrivateFieldGet2(_props$25, this).withNode)
			});
		}
		/**
		* Creates a "replace into" query.
		*
		* This is only supported by some dialects like MySQL or SQLite.
		*
		* Similar to MySQL's {@link InsertQueryBuilder.onDuplicateKeyUpdate} that deletes
		* and inserts values on collision instead of updating existing rows.
		*
		* An alias of SQLite's {@link InsertQueryBuilder.orReplace}.
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
		*   .executeTakeFirstOrThrow()
		*
		* console.log(result.insertId)
		* ```
		*
		* The generated SQL (MySQL):
		*
		* ```sql
		* replace into `person` (`first_name`, `last_name`) values (?, ?)
		* ```
		*/
		replaceInto(table) {
			return new InsertQueryBuilder({
				queryId: createQueryId(),
				executor: _classPrivateFieldGet2(_props$25, this).executor,
				queryNode: InsertQueryNode.create(parseTable(table), _classPrivateFieldGet2(_props$25, this).withNode, true)
			});
		}
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
		*   .where('person.id', '=', 1)
		*   .executeTakeFirst()
		*
		* console.log(result.numDeletedRows)
		* ```
		*
		* The generated SQL (PostgreSQL):
		*
		* ```sql
		* delete from "person" where "person"."id" = $1
		* ```
		*
		* Some databases such as MySQL support deleting from multiple tables:
		*
		* ```ts
		* const result = await db
		*   .deleteFrom(['person', 'pet'])
		*   .using('person')
		*   .innerJoin('pet', 'pet.owner_id', 'person.id')
		*   .where('person.id', '=', 1)
		*   .executeTakeFirst()
		* ```
		*
		* The generated SQL (MySQL):
		*
		* ```sql
		* delete from `person`, `pet`
		* using `person`
		* inner join `pet` on `pet`.`owner_id` = `person`.`id`
		* where `person`.`id` = ?
		* ```
		*/
		deleteFrom(from) {
			return new DeleteQueryBuilder({
				queryId: createQueryId(),
				executor: _classPrivateFieldGet2(_props$25, this).executor,
				queryNode: DeleteQueryNode.create(parseTableExpressionOrList(from), _classPrivateFieldGet2(_props$25, this).withNode)
			});
		}
		/**
		* Creates an update query.
		*
		* See the {@link UpdateQueryBuilder.where} method for examples on how to specify
		* a where clause for the update operation.
		*
		* See the {@link UpdateQueryBuilder.set} method for examples on how to
		* specify the updates.
		*
		* The return value of the query is an {@link UpdateResult}.
		*
		* ### Examples
		*
		* ```ts
		* const result = await db
		*   .updateTable('person')
		*   .set({ first_name: 'Jennifer' })
		*   .where('person.id', '=', 1)
		*   .executeTakeFirst()
		*
		* console.log(result.numUpdatedRows)
		* ```
		*/
		updateTable(tables) {
			return new UpdateQueryBuilder({
				queryId: createQueryId(),
				executor: _classPrivateFieldGet2(_props$25, this).executor,
				queryNode: UpdateQueryNode.create(parseTableExpressionOrList(tables), _classPrivateFieldGet2(_props$25, this).withNode)
			});
		}
		/**
		* Creates a merge query.
		*
		* The return value of the query is a {@link MergeResult}.
		*
		* See the {@link MergeQueryBuilder.using} method for examples on how to specify
		* the other table.
		*
		* ### Examples
		*
		* <!-- siteExample("merge", "Source row existence", 10) -->
		*
		* Update a target column based on the existence of a source row:
		*
		* ```ts
		* const result = await db
		*   .mergeInto('person as target')
		*   .using('pet as source', 'source.owner_id', 'target.id')
		*   .whenMatchedAnd('target.has_pets', '!=', 'Y')
		*   .thenUpdateSet({ has_pets: 'Y' })
		*   .whenNotMatchedBySourceAnd('target.has_pets', '=', 'Y')
		*   .thenUpdateSet({ has_pets: 'N' })
		*   .executeTakeFirstOrThrow()
		*
		* console.log(result.numChangedRows)
		* ```
		*
		* The generated SQL (PostgreSQL):
		*
		* ```sql
		* merge into "person"
		* using "pet"
		* on "pet"."owner_id" = "person"."id"
		* when matched and "has_pets" != $1
		* then update set "has_pets" = $2
		* when not matched by source and "has_pets" = $3
		* then update set "has_pets" = $4
		* ```
		*
		* <!-- siteExample("merge", "Temporary changes table", 20) -->
		*
		* Merge new entries from a temporary changes table:
		*
		* ```ts
		* const result = await db
		*   .mergeInto('wine as target')
		*   .using(
		*     'wine_stock_change as source',
		*     'source.wine_name',
		*     'target.name',
		*   )
		*   .whenNotMatchedAnd('source.stock_delta', '>', 0)
		*   .thenInsertValues(({ ref }) => ({
		*     name: ref('source.wine_name'),
		*     stock: ref('source.stock_delta'),
		*   }))
		*   .whenMatchedAnd(
		*     (eb) => eb('target.stock', '+', eb.ref('source.stock_delta')),
		*     '>',
		*     0,
		*   )
		*   .thenUpdateSet('stock', (eb) =>
		*     eb('target.stock', '+', eb.ref('source.stock_delta')),
		*   )
		*   .whenMatched()
		*   .thenDelete()
		*   .executeTakeFirstOrThrow()
		* ```
		*
		* The generated SQL (PostgreSQL):
		*
		* ```sql
		* merge into "wine" as "target"
		* using "wine_stock_change" as "source"
		* on "source"."wine_name" = "target"."name"
		* when not matched and "source"."stock_delta" > $1
		* then insert ("name", "stock") values ("source"."wine_name", "source"."stock_delta")
		* when matched and "target"."stock" + "source"."stock_delta" > $2
		* then update set "stock" = "target"."stock" + "source"."stock_delta"
		* when matched
		* then delete
		* ```
		*/
		mergeInto(targetTable) {
			return new MergeQueryBuilder({
				queryId: createQueryId(),
				executor: _classPrivateFieldGet2(_props$25, this).executor,
				queryNode: MergeQueryNode.create(parseAliasedTable(targetTable), _classPrivateFieldGet2(_props$25, this).withNode)
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
		*   .with(
		*     'jennifers',
		*     db
		*       .selectFrom('person')
		*       .where('first_name', '=', 'Jennifer')
		*       .select(['id', 'age']),
		*   )
		*   // Select all rows from the `jennifers` CTE and
		*   // further filter it.
		*   // To refer to a CTE in another CTE, use the callback variant of `with`.
		*   .with('adult_jennifers', (db) =>
		*     db.selectFrom('jennifers').where('age', '>', 18).select(['id', 'age']),
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
			return new QueryCreator({
				..._classPrivateFieldGet2(_props$25, this),
				withNode: _classPrivateFieldGet2(_props$25, this).withNode ? WithNode.cloneWithExpression(_classPrivateFieldGet2(_props$25, this).withNode, cte) : WithNode.create(cte)
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
			return new QueryCreator({
				..._classPrivateFieldGet2(_props$25, this),
				withNode: _classPrivateFieldGet2(_props$25, this).withNode ? WithNode.cloneWithExpression(_classPrivateFieldGet2(_props$25, this).withNode, cte) : WithNode.create(cte, { recursive: true })
			});
		}
		/**
		* Returns a copy of this query creator instance with the given plugin installed.
		*/
		withPlugin(plugin) {
			return new QueryCreator({
				..._classPrivateFieldGet2(_props$25, this),
				executor: _classPrivateFieldGet2(_props$25, this).executor.withPlugin(plugin)
			});
		}
		/**
		* Returns a copy of this query creator instance without any plugins.
		*/
		withoutPlugins() {
			return new QueryCreator({
				..._classPrivateFieldGet2(_props$25, this),
				executor: _classPrivateFieldGet2(_props$25, this).executor.withoutPlugins()
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
			return new QueryCreator({
				..._classPrivateFieldGet2(_props$25, this),
				executor: _classPrivateFieldGet2(_props$25, this).executor.withPluginAtFront(new WithSchemaPlugin(schema))
			});
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/parse-utils.js
function createQueryCreator() {
	return new QueryCreator({ executor: NOOP_QUERY_EXECUTOR });
}
function createJoinBuilder(joinType, table) {
	return new JoinBuilder({ joinNode: JoinNode.create(joinType, parseTableExpression(table)) });
}
function createOverBuilder() {
	return new OverBuilder({ overNode: OverNode.create() });
}
var init_parse_utils = __esmMin((() => {
	init_join_node();
	init_over_node();
	init_join_builder();
	init_over_builder();
	init_query_creator();
	init_noop_query_executor();
	init_table_parser();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/join-parser.js
function parseJoin(joinType, args) {
	if (args.length === 3) return parseSingleOnJoin(joinType, args[0], args[1], args[2]);
	else if (args.length === 2) return parseCallbackJoin(joinType, args[0], args[1]);
	else if (args.length === 1) return parseOnlessJoin(joinType, args[0]);
	else throw new Error("not implemented");
}
function parseCallbackJoin(joinType, from, callback) {
	return callback(createJoinBuilder(joinType, from)).toOperationNode();
}
function parseSingleOnJoin(joinType, from, lhsColumn, rhsColumn) {
	return JoinNode.createWithOn(joinType, parseTableExpression(from), parseReferentialBinaryOperation(lhsColumn, "=", rhsColumn));
}
function parseOnlessJoin(joinType, from) {
	return JoinNode.create(joinType, parseTableExpression(from));
}
var init_join_parser = __esmMin((() => {
	init_join_node();
	init_binary_operation_parser();
	init_parse_utils();
	init_table_parser();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/offset-node.js
var OffsetNode;
var init_offset_node = __esmMin((() => {
	init_object_utils();
	OffsetNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/group-by-item-node.js
var GroupByItemNode;
var init_group_by_item_node = __esmMin((() => {
	init_object_utils();
	GroupByItemNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/group-by-parser.js
function parseGroupBy(groupBy) {
	groupBy = isFunction(groupBy) ? groupBy(expressionBuilder()) : groupBy;
	return parseReferenceExpressionOrList(groupBy).map(GroupByItemNode.create);
}
var init_group_by_parser = __esmMin((() => {
	init_group_by_item_node();
	init_expression_builder();
	init_object_utils();
	init_reference_parser();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/set-operation-node.js
var SetOperationNode;
var init_set_operation_node = __esmMin((() => {
	init_object_utils();
	SetOperationNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/set-operation-parser.js
function parseSetOperations(operator, expression, all) {
	if (isFunction(expression)) expression = expression(createExpressionBuilder());
	if (!isReadonlyArray(expression)) expression = [expression];
	return expression.map((expr) => SetOperationNode.create(operator, parseExpression(expr), all));
}
var init_set_operation_parser = __esmMin((() => {
	init_expression_builder();
	init_set_operation_node();
	init_object_utils();
	init_expression_parser();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/expression/expression-wrapper.js
var _node$7, ExpressionWrapper, _expr, _alias$5, AliasedExpressionWrapper, _node2$1, OrWrapper, _node3, AndWrapper;
var init_expression_wrapper = __esmMin((() => {
	init_alias_node();
	init_and_node();
	init_identifier_node();
	init_operation_node_source();
	init_or_node();
	init_parens_node();
	init_binary_operation_parser();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_node$7 = /* @__PURE__ */ new WeakMap();
	ExpressionWrapper = class ExpressionWrapper {
		constructor(node) {
			_classPrivateFieldInitSpec(this, _node$7, void 0);
			_classPrivateFieldSet2(_node$7, this, node);
		}
		/** @private */
		get expressionType() {}
		as(alias) {
			return new AliasedExpressionWrapper(this, alias);
		}
		or(...args) {
			return new OrWrapper(OrNode.create(_classPrivateFieldGet2(_node$7, this), parseValueBinaryOperationOrExpression(args)));
		}
		and(...args) {
			return new AndWrapper(AndNode.create(_classPrivateFieldGet2(_node$7, this), parseValueBinaryOperationOrExpression(args)));
		}
		/**
		* Change the output type of the expression.
		*
		* This method call doesn't change the SQL in any way. This methods simply
		* returns a copy of this `ExpressionWrapper` with a new output type.
		*/
		$castTo() {
			return new ExpressionWrapper(_classPrivateFieldGet2(_node$7, this));
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
			return new ExpressionWrapper(_classPrivateFieldGet2(_node$7, this));
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_node$7, this);
		}
	};
	_expr = /* @__PURE__ */ new WeakMap();
	_alias$5 = /* @__PURE__ */ new WeakMap();
	AliasedExpressionWrapper = class {
		constructor(expr, alias) {
			_classPrivateFieldInitSpec(this, _expr, void 0);
			_classPrivateFieldInitSpec(this, _alias$5, void 0);
			_classPrivateFieldSet2(_expr, this, expr);
			_classPrivateFieldSet2(_alias$5, this, alias);
		}
		/** @private */
		get expression() {
			return _classPrivateFieldGet2(_expr, this);
		}
		/** @private */
		get alias() {
			return _classPrivateFieldGet2(_alias$5, this);
		}
		toOperationNode() {
			return AliasNode.create(_classPrivateFieldGet2(_expr, this).toOperationNode(), isOperationNodeSource(_classPrivateFieldGet2(_alias$5, this)) ? _classPrivateFieldGet2(_alias$5, this).toOperationNode() : IdentifierNode.create(_classPrivateFieldGet2(_alias$5, this)));
		}
	};
	_node2$1 = /* @__PURE__ */ new WeakMap();
	OrWrapper = class OrWrapper {
		constructor(node) {
			_classPrivateFieldInitSpec(this, _node2$1, void 0);
			_classPrivateFieldSet2(_node2$1, this, node);
		}
		/** @private */
		get expressionType() {}
		as(alias) {
			return new AliasedExpressionWrapper(this, alias);
		}
		or(...args) {
			return new OrWrapper(OrNode.create(_classPrivateFieldGet2(_node2$1, this), parseValueBinaryOperationOrExpression(args)));
		}
		/**
		* Change the output type of the expression.
		*
		* This method call doesn't change the SQL in any way. This methods simply
		* returns a copy of this `OrWrapper` with a new output type.
		*/
		$castTo() {
			return new OrWrapper(_classPrivateFieldGet2(_node2$1, this));
		}
		toOperationNode() {
			return ParensNode.create(_classPrivateFieldGet2(_node2$1, this));
		}
	};
	_node3 = /* @__PURE__ */ new WeakMap();
	AndWrapper = class AndWrapper {
		constructor(node) {
			_classPrivateFieldInitSpec(this, _node3, void 0);
			_classPrivateFieldSet2(_node3, this, node);
		}
		/** @private */
		get expressionType() {}
		as(alias) {
			return new AliasedExpressionWrapper(this, alias);
		}
		and(...args) {
			return new AndWrapper(AndNode.create(_classPrivateFieldGet2(_node3, this), parseValueBinaryOperationOrExpression(args)));
		}
		/**
		* Change the output type of the expression.
		*
		* This method call doesn't change the SQL in any way. This methods simply
		* returns a copy of this `AndWrapper` with a new output type.
		*/
		$castTo() {
			return new AndWrapper(_classPrivateFieldGet2(_node3, this));
		}
		toOperationNode() {
			return ParensNode.create(_classPrivateFieldGet2(_node3, this));
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/fetch-node.js
var FetchNode;
var init_fetch_node = __esmMin((() => {
	init_object_utils();
	init_value_node();
	FetchNode = freeze({
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
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/fetch-parser.js
function parseFetch(rowCount, modifier) {
	if (!isNumber(rowCount) && !isBigInt(rowCount)) throw new Error(`Invalid fetch row count: ${rowCount}`);
	if (!isFetchModifier(modifier)) throw new Error(`Invalid fetch modifier: ${modifier}`);
	return FetchNode.create(rowCount, modifier);
}
function isFetchModifier(value) {
	return value === "only" || value === "with ties";
}
var init_fetch_parser = __esmMin((() => {
	init_fetch_node();
	init_object_utils();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/select-query-builder.js
function _join(joinType, args) {
	return new _a$1({
		..._classPrivateFieldGet2(_props$24, this),
		queryNode: QueryNode.cloneWithJoin(_classPrivateFieldGet2(_props$24, this).queryNode, parseJoin(joinType, args))
	});
}
function createSelectQueryBuilder(props) {
	return new SelectQueryBuilderImpl(props);
}
var _a$1, _props$24, _SelectQueryBuilderImpl_brand, SelectQueryBuilderImpl, _queryBuilder, _alias$4, AliasedSelectQueryBuilderImpl;
var init_select_query_builder = __esmMin((() => {
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_assertClassBrand();
	init_alias_node();
	init_select_modifier_node();
	init_join_parser();
	init_table_parser();
	init_select_parser();
	init_reference_parser();
	init_select_query_node();
	init_query_node();
	init_order_by_parser();
	init_limit_node();
	init_offset_node();
	init_object_utils();
	init_group_by_parser();
	init_no_result_error();
	init_identifier_node();
	init_set_operation_parser();
	init_binary_operation_parser();
	init_expression_wrapper();
	init_value_parser();
	init_fetch_parser();
	init_top_parser();
	_props$24 = /* @__PURE__ */ new WeakMap();
	_SelectQueryBuilderImpl_brand = /* @__PURE__ */ new WeakSet();
	SelectQueryBuilderImpl = class {
		constructor(props) {
			_classPrivateMethodInitSpec(this, _SelectQueryBuilderImpl_brand);
			_classPrivateFieldInitSpec(this, _props$24, void 0);
			_classPrivateFieldSet2(_props$24, this, freeze(props));
		}
		get expressionType() {}
		get isSelectQueryBuilder() {
			return true;
		}
		where(...args) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: QueryNode.cloneWithWhere(_classPrivateFieldGet2(_props$24, this).queryNode, parseValueBinaryOperationOrExpression(args))
			});
		}
		whereRef(lhs, op, rhs) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: QueryNode.cloneWithWhere(_classPrivateFieldGet2(_props$24, this).queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
			});
		}
		having(...args) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithHaving(_classPrivateFieldGet2(_props$24, this).queryNode, parseValueBinaryOperationOrExpression(args))
			});
		}
		havingRef(lhs, op, rhs) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithHaving(_classPrivateFieldGet2(_props$24, this).queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
			});
		}
		select(selection) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithSelections(_classPrivateFieldGet2(_props$24, this).queryNode, parseSelectArg(selection))
			});
		}
		distinctOn(selection) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithDistinctOn(_classPrivateFieldGet2(_props$24, this).queryNode, parseReferenceExpressionOrList(selection))
			});
		}
		modifyFront(modifier) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithFrontModifier(_classPrivateFieldGet2(_props$24, this).queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
			});
		}
		modifyEnd(modifier) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: QueryNode.cloneWithEndModifier(_classPrivateFieldGet2(_props$24, this).queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
			});
		}
		distinct() {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithFrontModifier(_classPrivateFieldGet2(_props$24, this).queryNode, SelectModifierNode.create("Distinct"))
			});
		}
		forUpdate(of) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: QueryNode.cloneWithEndModifier(_classPrivateFieldGet2(_props$24, this).queryNode, SelectModifierNode.create("ForUpdate", of ? asArray(of).map(parseTable) : void 0))
			});
		}
		forShare(of) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: QueryNode.cloneWithEndModifier(_classPrivateFieldGet2(_props$24, this).queryNode, SelectModifierNode.create("ForShare", of ? asArray(of).map(parseTable) : void 0))
			});
		}
		forKeyShare(of) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: QueryNode.cloneWithEndModifier(_classPrivateFieldGet2(_props$24, this).queryNode, SelectModifierNode.create("ForKeyShare", of ? asArray(of).map(parseTable) : void 0))
			});
		}
		forNoKeyUpdate(of) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: QueryNode.cloneWithEndModifier(_classPrivateFieldGet2(_props$24, this).queryNode, SelectModifierNode.create("ForNoKeyUpdate", of ? asArray(of).map(parseTable) : void 0))
			});
		}
		skipLocked() {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: QueryNode.cloneWithEndModifier(_classPrivateFieldGet2(_props$24, this).queryNode, SelectModifierNode.create("SkipLocked"))
			});
		}
		noWait() {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: QueryNode.cloneWithEndModifier(_classPrivateFieldGet2(_props$24, this).queryNode, SelectModifierNode.create("NoWait"))
			});
		}
		selectAll(table) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithSelections(_classPrivateFieldGet2(_props$24, this).queryNode, parseSelectAll(table))
			});
		}
		innerJoin(...args) {
			return _assertClassBrand(_SelectQueryBuilderImpl_brand, this, _join).call(this, "InnerJoin", args);
		}
		leftJoin(...args) {
			return _assertClassBrand(_SelectQueryBuilderImpl_brand, this, _join).call(this, "LeftJoin", args);
		}
		rightJoin(...args) {
			return _assertClassBrand(_SelectQueryBuilderImpl_brand, this, _join).call(this, "RightJoin", args);
		}
		fullJoin(...args) {
			return _assertClassBrand(_SelectQueryBuilderImpl_brand, this, _join).call(this, "FullJoin", args);
		}
		crossJoin(...args) {
			return _assertClassBrand(_SelectQueryBuilderImpl_brand, this, _join).call(this, "CrossJoin", args);
		}
		innerJoinLateral(...args) {
			return _assertClassBrand(_SelectQueryBuilderImpl_brand, this, _join).call(this, "LateralInnerJoin", args);
		}
		leftJoinLateral(...args) {
			return _assertClassBrand(_SelectQueryBuilderImpl_brand, this, _join).call(this, "LateralLeftJoin", args);
		}
		crossJoinLateral(...args) {
			return _assertClassBrand(_SelectQueryBuilderImpl_brand, this, _join).call(this, "LateralCrossJoin", args);
		}
		crossApply(...args) {
			return _assertClassBrand(_SelectQueryBuilderImpl_brand, this, _join).call(this, "CrossApply", args);
		}
		outerApply(...args) {
			return _assertClassBrand(_SelectQueryBuilderImpl_brand, this, _join).call(this, "OuterApply", args);
		}
		orderBy(...args) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: QueryNode.cloneWithOrderByItems(_classPrivateFieldGet2(_props$24, this).queryNode, parseOrderBy(args))
			});
		}
		groupBy(groupBy) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithGroupByItems(_classPrivateFieldGet2(_props$24, this).queryNode, parseGroupBy(groupBy))
			});
		}
		limit(limit) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithLimit(_classPrivateFieldGet2(_props$24, this).queryNode, LimitNode.create(parseValueExpression(limit)))
			});
		}
		offset(offset) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithOffset(_classPrivateFieldGet2(_props$24, this).queryNode, OffsetNode.create(parseValueExpression(offset)))
			});
		}
		fetch(rowCount, modifier = "only") {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithFetch(_classPrivateFieldGet2(_props$24, this).queryNode, parseFetch(rowCount, modifier))
			});
		}
		top(expression, modifiers) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: QueryNode.cloneWithTop(_classPrivateFieldGet2(_props$24, this).queryNode, parseTop(expression, modifiers))
			});
		}
		union(expression) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithSetOperations(_classPrivateFieldGet2(_props$24, this).queryNode, parseSetOperations("union", expression, false))
			});
		}
		unionAll(expression) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithSetOperations(_classPrivateFieldGet2(_props$24, this).queryNode, parseSetOperations("union", expression, true))
			});
		}
		intersect(expression) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithSetOperations(_classPrivateFieldGet2(_props$24, this).queryNode, parseSetOperations("intersect", expression, false))
			});
		}
		intersectAll(expression) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithSetOperations(_classPrivateFieldGet2(_props$24, this).queryNode, parseSetOperations("intersect", expression, true))
			});
		}
		except(expression) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithSetOperations(_classPrivateFieldGet2(_props$24, this).queryNode, parseSetOperations("except", expression, false))
			});
		}
		exceptAll(expression) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithSetOperations(_classPrivateFieldGet2(_props$24, this).queryNode, parseSetOperations("except", expression, true))
			});
		}
		as(alias) {
			return new AliasedSelectQueryBuilderImpl(this, alias);
		}
		clearSelect() {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithoutSelections(_classPrivateFieldGet2(_props$24, this).queryNode)
			});
		}
		clearWhere() {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: QueryNode.cloneWithoutWhere(_classPrivateFieldGet2(_props$24, this).queryNode)
			});
		}
		clearLimit() {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithoutLimit(_classPrivateFieldGet2(_props$24, this).queryNode)
			});
		}
		clearOffset() {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithoutOffset(_classPrivateFieldGet2(_props$24, this).queryNode)
			});
		}
		clearOrderBy() {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: QueryNode.cloneWithoutOrderBy(_classPrivateFieldGet2(_props$24, this).queryNode)
			});
		}
		clearGroupBy() {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: SelectQueryNode.cloneWithoutGroupBy(_classPrivateFieldGet2(_props$24, this).queryNode)
			});
		}
		$call(func) {
			return func(this);
		}
		$if(condition, func) {
			if (condition) return func(this);
			return new _a$1({ ..._classPrivateFieldGet2(_props$24, this) });
		}
		$castTo() {
			return new _a$1(_classPrivateFieldGet2(_props$24, this));
		}
		$narrowType() {
			return new _a$1(_classPrivateFieldGet2(_props$24, this));
		}
		$assertType() {
			return new _a$1(_classPrivateFieldGet2(_props$24, this));
		}
		$asTuple() {
			return new ExpressionWrapper(this.toOperationNode());
		}
		$asScalar() {
			return new ExpressionWrapper(this.toOperationNode());
		}
		withPlugin(plugin) {
			return new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				executor: _classPrivateFieldGet2(_props$24, this).executor.withPlugin(plugin)
			});
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_props$24, this).executor.transformQuery(_classPrivateFieldGet2(_props$24, this).queryNode, _classPrivateFieldGet2(_props$24, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$24, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$24, this).queryId);
		}
		async execute(options) {
			const compiledQuery = this.compile();
			return (await _classPrivateFieldGet2(_props$24, this).executor.executeQuery(compiledQuery, options)).rows;
		}
		async executeTakeFirst(options) {
			const [result] = await this.execute(options);
			return result;
		}
		async executeTakeFirstOrThrow(errorConstructorOrOptions) {
			if (typeof errorConstructorOrOptions === "function") errorConstructorOrOptions = { errorConstructor: errorConstructorOrOptions };
			const result = await this.executeTakeFirst(errorConstructorOrOptions);
			if (result === void 0) {
				const errorConstructor = errorConstructorOrOptions?.errorConstructor ?? NoResultError;
				throw isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
			}
			return result;
		}
		async *stream(chunkSizeOrOptions) {
			if (typeof chunkSizeOrOptions !== "object") chunkSizeOrOptions = { chunkSize: chunkSizeOrOptions };
			const compiledQuery = this.compile();
			const stream = _classPrivateFieldGet2(_props$24, this).executor.stream(compiledQuery, chunkSizeOrOptions.chunkSize ?? 100, chunkSizeOrOptions);
			for await (const item of stream) yield* item.rows;
		}
		async explain(format, options) {
			return await new _a$1({
				..._classPrivateFieldGet2(_props$24, this),
				queryNode: QueryNode.cloneWithExplain(_classPrivateFieldGet2(_props$24, this).queryNode, format, options)
			}).execute();
		}
	};
	_a$1 = SelectQueryBuilderImpl;
	_queryBuilder = /* @__PURE__ */ new WeakMap();
	_alias$4 = /* @__PURE__ */ new WeakMap();
	AliasedSelectQueryBuilderImpl = class {
		constructor(queryBuilder, alias) {
			_classPrivateFieldInitSpec(this, _queryBuilder, void 0);
			_classPrivateFieldInitSpec(this, _alias$4, void 0);
			_classPrivateFieldSet2(_queryBuilder, this, queryBuilder);
			_classPrivateFieldSet2(_alias$4, this, alias);
		}
		get expression() {
			return _classPrivateFieldGet2(_queryBuilder, this);
		}
		get alias() {
			return _classPrivateFieldGet2(_alias$4, this);
		}
		get isAliasedSelectQueryBuilder() {
			return true;
		}
		toOperationNode() {
			return AliasNode.create(_classPrivateFieldGet2(_queryBuilder, this).toOperationNode(), IdentifierNode.create(_classPrivateFieldGet2(_alias$4, this)));
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/aggregate-function-node.js
var AggregateFunctionNode;
var init_aggregate_function_node = __esmMin((() => {
	init_object_utils();
	init_where_node();
	init_order_by_node();
	AggregateFunctionNode = freeze({
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
		cloneWithOrderBy(aggregateFunctionNode, orderItems, withinGroup = false) {
			const prop = withinGroup ? "withinGroup" : "orderBy";
			return freeze({
				...aggregateFunctionNode,
				[prop]: aggregateFunctionNode[prop] ? OrderByNode.cloneWithItems(aggregateFunctionNode[prop], orderItems) : OrderByNode.create(orderItems)
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/function-node.js
var FunctionNode;
var init_function_node = __esmMin((() => {
	init_object_utils();
	FunctionNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/aggregate-function-builder.js
var _props$23, AggregateFunctionBuilder, _aggregateFunctionBuilder, _alias$3, AliasedAggregateFunctionBuilder;
var init_aggregate_function_builder = __esmMin((() => {
	init_object_utils();
	init_aggregate_function_node();
	init_alias_node();
	init_identifier_node();
	init_parse_utils();
	init_binary_operation_parser();
	init_order_by_parser();
	init_query_node();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$23 = /* @__PURE__ */ new WeakMap();
	AggregateFunctionBuilder = class AggregateFunctionBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$23, void 0);
			_classPrivateFieldSet2(_props$23, this, freeze(props));
		}
		/** @private */
		get expressionType() {}
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
			return new AggregateFunctionBuilder({
				..._classPrivateFieldGet2(_props$23, this),
				aggregateFunctionNode: AggregateFunctionNode.cloneWithDistinct(_classPrivateFieldGet2(_props$23, this).aggregateFunctionNode)
			});
		}
		orderBy(...args) {
			return new AggregateFunctionBuilder({
				..._classPrivateFieldGet2(_props$23, this),
				aggregateFunctionNode: QueryNode.cloneWithOrderByItems(_classPrivateFieldGet2(_props$23, this).aggregateFunctionNode, parseOrderBy(args))
			});
		}
		clearOrderBy() {
			return new AggregateFunctionBuilder({
				..._classPrivateFieldGet2(_props$23, this),
				aggregateFunctionNode: QueryNode.cloneWithoutOrderBy(_classPrivateFieldGet2(_props$23, this).aggregateFunctionNode)
			});
		}
		withinGroupOrderBy(...args) {
			return new AggregateFunctionBuilder({
				..._classPrivateFieldGet2(_props$23, this),
				aggregateFunctionNode: AggregateFunctionNode.cloneWithOrderBy(_classPrivateFieldGet2(_props$23, this).aggregateFunctionNode, parseOrderBy(args), true)
			});
		}
		filterWhere(...args) {
			return new AggregateFunctionBuilder({
				..._classPrivateFieldGet2(_props$23, this),
				aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(_classPrivateFieldGet2(_props$23, this).aggregateFunctionNode, parseValueBinaryOperationOrExpression(args))
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
			return new AggregateFunctionBuilder({
				..._classPrivateFieldGet2(_props$23, this),
				aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(_classPrivateFieldGet2(_props$23, this).aggregateFunctionNode, parseReferentialBinaryOperation(lhs, op, rhs))
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
			return new AggregateFunctionBuilder({
				..._classPrivateFieldGet2(_props$23, this),
				aggregateFunctionNode: AggregateFunctionNode.cloneWithOver(_classPrivateFieldGet2(_props$23, this).aggregateFunctionNode, (over ? over(builder) : builder).toOperationNode())
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
			return new AggregateFunctionBuilder(_classPrivateFieldGet2(_props$23, this));
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
			return new AggregateFunctionBuilder(_classPrivateFieldGet2(_props$23, this));
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_props$23, this).aggregateFunctionNode;
		}
	};
	_aggregateFunctionBuilder = /* @__PURE__ */ new WeakMap();
	_alias$3 = /* @__PURE__ */ new WeakMap();
	AliasedAggregateFunctionBuilder = class {
		constructor(aggregateFunctionBuilder, alias) {
			_classPrivateFieldInitSpec(this, _aggregateFunctionBuilder, void 0);
			_classPrivateFieldInitSpec(this, _alias$3, void 0);
			_classPrivateFieldSet2(_aggregateFunctionBuilder, this, aggregateFunctionBuilder);
			_classPrivateFieldSet2(_alias$3, this, alias);
		}
		/** @private */
		get expression() {
			return _classPrivateFieldGet2(_aggregateFunctionBuilder, this);
		}
		/** @private */
		get alias() {
			return _classPrivateFieldGet2(_alias$3, this);
		}
		toOperationNode() {
			return AliasNode.create(_classPrivateFieldGet2(_aggregateFunctionBuilder, this).toOperationNode(), IdentifierNode.create(_classPrivateFieldGet2(_alias$3, this)));
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/function-module.js
function createFunctionModule() {
	const fn = (name, args) => {
		return new ExpressionWrapper(FunctionNode.create(name, parseReferenceExpressionOrList(args ?? [])));
	};
	const agg = (name, args) => {
		return new AggregateFunctionBuilder({ aggregateFunctionNode: AggregateFunctionNode.create(name, args ? parseReferenceExpressionOrList(args) : void 0) });
	};
	return Object.assign(fn, {
		agg,
		avg(column) {
			return agg("avg", [column]);
		},
		coalesce(...values) {
			return fn("coalesce", values);
		},
		count(column) {
			return agg("count", [column]);
		},
		countAll(table) {
			return new AggregateFunctionBuilder({ aggregateFunctionNode: AggregateFunctionNode.create("count", parseSelectAll(table)) });
		},
		max(column) {
			return agg("max", [column]);
		},
		min(column) {
			return agg("min", [column]);
		},
		sum(column) {
			return agg("sum", [column]);
		},
		any(column) {
			return fn("any", [column]);
		},
		jsonAgg(table) {
			return new AggregateFunctionBuilder({ aggregateFunctionNode: AggregateFunctionNode.create("json_agg", [isString(table) ? parseTable(table) : table.toOperationNode()]) });
		},
		toJson(table) {
			return new ExpressionWrapper(FunctionNode.create("to_json", [isString(table) ? parseTable(table) : table.toOperationNode()]));
		}
	});
}
var init_function_module = __esmMin((() => {
	init_expression_wrapper();
	init_aggregate_function_node();
	init_function_node();
	init_reference_parser();
	init_select_parser();
	init_aggregate_function_builder();
	init_object_utils();
	init_table_parser();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/unary-operation-node.js
var UnaryOperationNode;
var init_unary_operation_node = __esmMin((() => {
	init_object_utils();
	UnaryOperationNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/unary-operation-parser.js
function parseUnaryOperation(operator, operand) {
	if (isUnaryOperator(operator)) return UnaryOperationNode.create(OperatorNode.create(operator), parseReferenceExpression(operand));
	throw new Error(`invalid unary operator ${JSON.stringify(operator)}`);
}
var init_unary_operation_parser = __esmMin((() => {
	init_operator_node();
	init_unary_operation_node();
	init_reference_parser();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/case-node.js
var CaseNode;
var init_case_node = __esmMin((() => {
	init_object_utils();
	init_when_node();
	CaseNode = freeze({
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
				when: caseNode.when ? freeze([...caseNode.when.slice(0, -1), WhenNode.cloneWithResult(caseNode.when[caseNode.when.length - 1], then)]) : void 0
			});
		},
		cloneWith(caseNode, props) {
			return freeze({
				...caseNode,
				...props
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/case-builder.js
var _props$22, CaseBuilder, _props2$2, CaseThenBuilder, _props3$1, CaseWhenBuilder, _props4$1, CaseEndBuilder;
var init_case_builder = __esmMin((() => {
	init_expression_wrapper();
	init_object_utils();
	init_reference_parser();
	init_case_node();
	init_when_node();
	init_binary_operation_parser();
	init_value_parser();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$22 = /* @__PURE__ */ new WeakMap();
	CaseBuilder = class {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$22, void 0);
			_classPrivateFieldSet2(_props$22, this, freeze(props));
		}
		when(...args) {
			return new CaseThenBuilder({
				..._classPrivateFieldGet2(_props$22, this),
				node: CaseNode.cloneWithWhen(_classPrivateFieldGet2(_props$22, this).node, WhenNode.create(parseValueBinaryOperationOrExpression(args)))
			});
		}
		whenRef(lhs, op, rhs) {
			return new CaseThenBuilder({
				..._classPrivateFieldGet2(_props$22, this),
				node: CaseNode.cloneWithWhen(_classPrivateFieldGet2(_props$22, this).node, WhenNode.create(parseReferentialBinaryOperation(lhs, op, rhs)))
			});
		}
	};
	_props2$2 = /* @__PURE__ */ new WeakMap();
	CaseThenBuilder = class {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props2$2, void 0);
			_classPrivateFieldSet2(_props2$2, this, freeze(props));
		}
		then(valueExpression) {
			return new CaseWhenBuilder({
				..._classPrivateFieldGet2(_props2$2, this),
				node: CaseNode.cloneWithThen(_classPrivateFieldGet2(_props2$2, this).node, isSafeImmediateValue(valueExpression) ? parseSafeImmediateValue(valueExpression) : parseValueExpression(valueExpression))
			});
		}
		/**
		* Adds a `then` clause to the `case` statement where the value is a reference to a column.
		*
		* See {@link then} for value-first variant.
		*
		* A `thenRef` call can be followed by {@link Whenable.when}, {@link Whenable.whenRef},
		* {@link CaseWhenBuilder.else}, {@link CaseWhenBuilder.elseRef},
		* {@link CaseWhenBuilder.end} or {@link CaseWhenBuilder.endCase} call.
		*/
		thenRef(expression) {
			return new CaseWhenBuilder({
				..._classPrivateFieldGet2(_props2$2, this),
				node: CaseNode.cloneWithThen(_classPrivateFieldGet2(_props2$2, this).node, parseReferenceExpression(expression))
			});
		}
	};
	_props3$1 = /* @__PURE__ */ new WeakMap();
	CaseWhenBuilder = class {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props3$1, void 0);
			_classPrivateFieldSet2(_props3$1, this, freeze(props));
		}
		when(...args) {
			return new CaseThenBuilder({
				..._classPrivateFieldGet2(_props3$1, this),
				node: CaseNode.cloneWithWhen(_classPrivateFieldGet2(_props3$1, this).node, WhenNode.create(parseValueBinaryOperationOrExpression(args)))
			});
		}
		whenRef(lhs, op, rhs) {
			return new CaseThenBuilder({
				..._classPrivateFieldGet2(_props3$1, this),
				node: CaseNode.cloneWithWhen(_classPrivateFieldGet2(_props3$1, this).node, WhenNode.create(parseReferentialBinaryOperation(lhs, op, rhs)))
			});
		}
		else(valueExpression) {
			return new CaseEndBuilder({
				..._classPrivateFieldGet2(_props3$1, this),
				node: CaseNode.cloneWith(_classPrivateFieldGet2(_props3$1, this).node, { else: isSafeImmediateValue(valueExpression) ? parseSafeImmediateValue(valueExpression) : parseValueExpression(valueExpression) })
			});
		}
		/**
		* Adds an `else` clause to the `case` statement where the value is a reference to a column.
		*
		* See {@link else} for value-first variant.
		*
		* An `elseRef` call must be followed by an {@link Endable.end} or {@link Endable.endCase} call.
		*/
		elseRef(expression) {
			return new CaseEndBuilder({
				..._classPrivateFieldGet2(_props3$1, this),
				node: CaseNode.cloneWith(_classPrivateFieldGet2(_props3$1, this).node, { else: parseReferenceExpression(expression) })
			});
		}
		end() {
			return new ExpressionWrapper(CaseNode.cloneWith(_classPrivateFieldGet2(_props3$1, this).node, { isStatement: false }));
		}
		endCase() {
			return new ExpressionWrapper(CaseNode.cloneWith(_classPrivateFieldGet2(_props3$1, this).node, { isStatement: true }));
		}
	};
	_props4$1 = /* @__PURE__ */ new WeakMap();
	CaseEndBuilder = class {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props4$1, void 0);
			_classPrivateFieldSet2(_props4$1, this, freeze(props));
		}
		end() {
			return new ExpressionWrapper(CaseNode.cloneWith(_classPrivateFieldGet2(_props4$1, this).node, { isStatement: false }));
		}
		endCase() {
			return new ExpressionWrapper(CaseNode.cloneWith(_classPrivateFieldGet2(_props4$1, this).node, { isStatement: true }));
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/json-path-leg-node.js
var JSONPathLegNode;
var init_json_path_leg_node = __esmMin((() => {
	init_object_utils();
	JSONPathLegNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/json-path-builder.js
function _createBuilderWithPathLeg(legType, value) {
	if (JSONReferenceNode.is(_classPrivateFieldGet2(_node$6, this))) return new TraversedJSONPathBuilder(JSONReferenceNode.cloneWithTraversal(_classPrivateFieldGet2(_node$6, this), JSONPathNode.is(_classPrivateFieldGet2(_node$6, this).traversal) ? JSONPathNode.cloneWithLeg(_classPrivateFieldGet2(_node$6, this).traversal, JSONPathLegNode.create(legType, value)) : JSONOperatorChainNode.cloneWithValue(_classPrivateFieldGet2(_node$6, this).traversal, ValueNode.createImmediate(value))));
	return new TraversedJSONPathBuilder(JSONPathNode.cloneWithLeg(_classPrivateFieldGet2(_node$6, this), JSONPathLegNode.create(legType, value)));
}
var HASH_NEGATIVE_INDEX_REGEX, _node$6, _JSONPathBuilder_brand, JSONPathBuilder, _node2, TraversedJSONPathBuilder, _jsonPath, _alias$2, AliasedJSONPathBuilder;
var init_json_path_builder = __esmMin((() => {
	init_alias_node();
	init_identifier_node();
	init_json_operator_chain_node();
	init_json_path_leg_node();
	init_json_path_node();
	init_json_reference_node();
	init_operation_node_source();
	init_value_node();
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_assertClassBrand();
	init_classPrivateFieldGet2();
	HASH_NEGATIVE_INDEX_REGEX = /^#-\d+$/;
	_node$6 = /* @__PURE__ */ new WeakMap();
	_JSONPathBuilder_brand = /* @__PURE__ */ new WeakSet();
	JSONPathBuilder = class {
		constructor(node) {
			_classPrivateMethodInitSpec(this, _JSONPathBuilder_brand);
			_classPrivateFieldInitSpec(this, _node$6, void 0);
			_classPrivateFieldSet2(_node$6, this, node);
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
			if (typeof index !== "number" && typeof index !== "string" || typeof index === "number" && !Number.isInteger(index) || typeof index === "string" && index !== "last" && !HASH_NEGATIVE_INDEX_REGEX.test(index)) throw new Error(`Unexpected index value in .at(...): ${index}`);
			return _assertClassBrand(_JSONPathBuilder_brand, this, _createBuilderWithPathLeg).call(this, "ArrayLocation", index);
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
			return _assertClassBrand(_JSONPathBuilder_brand, this, _createBuilderWithPathLeg).call(this, "Member", key);
		}
	};
	_node2 = /* @__PURE__ */ new WeakMap();
	TraversedJSONPathBuilder = class TraversedJSONPathBuilder extends JSONPathBuilder {
		constructor(node) {
			super(node);
			_classPrivateFieldInitSpec(this, _node2, void 0);
			_classPrivateFieldSet2(_node2, this, node);
		}
		/** @private */
		get expressionType() {}
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
			return new TraversedJSONPathBuilder(_classPrivateFieldGet2(_node2, this));
		}
		$notNull() {
			return new TraversedJSONPathBuilder(_classPrivateFieldGet2(_node2, this));
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_node2, this);
		}
	};
	_jsonPath = /* @__PURE__ */ new WeakMap();
	_alias$2 = /* @__PURE__ */ new WeakMap();
	AliasedJSONPathBuilder = class {
		constructor(jsonPath, alias) {
			_classPrivateFieldInitSpec(this, _jsonPath, void 0);
			_classPrivateFieldInitSpec(this, _alias$2, void 0);
			_classPrivateFieldSet2(_jsonPath, this, jsonPath);
			_classPrivateFieldSet2(_alias$2, this, alias);
		}
		/** @private */
		get expression() {
			return _classPrivateFieldGet2(_jsonPath, this);
		}
		/** @private */
		get alias() {
			return _classPrivateFieldGet2(_alias$2, this);
		}
		toOperationNode() {
			return AliasNode.create(_classPrivateFieldGet2(_jsonPath, this).toOperationNode(), isOperationNodeSource(_classPrivateFieldGet2(_alias$2, this)) ? _classPrivateFieldGet2(_alias$2, this).toOperationNode() : IdentifierNode.create(_classPrivateFieldGet2(_alias$2, this)));
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/tuple-node.js
var TupleNode;
var init_tuple_node = __esmMin((() => {
	init_object_utils();
	TupleNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/data-type-node.js
function isColumnDataType(dataType) {
	return SIMPLE_COLUMN_DATA_TYPES[dataType] || COLUMN_DATA_TYPE_REGEX.some((r) => r.test(dataType));
}
var SIMPLE_COLUMN_DATA_TYPES, COLUMN_DATA_TYPE_REGEX, DataTypeNode;
var init_data_type_node = __esmMin((() => {
	init_object_utils();
	SIMPLE_COLUMN_DATA_TYPES = freeze({
		bigint: true,
		bigserial: true,
		binary: true,
		blob: true,
		boolean: true,
		bytea: true,
		char: true,
		date: true,
		datemultirange: true,
		daterange: true,
		datetime: true,
		datetime2: true,
		decimal: true,
		"double precision": true,
		float4: true,
		float8: true,
		int2: true,
		int4: true,
		int4multirange: true,
		int4range: true,
		int8: true,
		int8multirange: true,
		int8range: true,
		integer: true,
		json: true,
		jsonb: true,
		numeric: true,
		nummultirange: true,
		numrange: true,
		real: true,
		serial: true,
		smallint: true,
		text: true,
		time: true,
		timestamp: true,
		timestamptz: true,
		timetz: true,
		tsmultirange: true,
		tsrange: true,
		tstzmultirange: true,
		tstzrange: true,
		uuid: true,
		varbinary: true,
		varchar: true
	});
	COLUMN_DATA_TYPE_REGEX = freeze([
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
		/^datetime2\(\d+\)$/,
		/^varbinary\(\d+\)$/
	]);
	DataTypeNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/data-type-parser.js
function parseDataTypeExpression(dataType) {
	if (isOperationNodeSource(dataType)) return dataType.toOperationNode();
	if (isColumnDataType(dataType)) return DataTypeNode.create(dataType);
	throw new Error(`invalid column data type ${JSON.stringify(dataType)}`);
}
var init_data_type_parser = __esmMin((() => {
	init_data_type_node();
	init_operation_node_source();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/cast-node.js
var CastNode;
var init_cast_node = __esmMin((() => {
	init_object_utils();
	CastNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/expression/expression-builder.js
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
			return new CaseBuilder({ node: CaseNode.create(isUndefined(reference) ? void 0 : parseReferenceExpression(reference)) });
		},
		ref(reference, op) {
			if (isUndefined(op)) return new ExpressionWrapper(parseStringReference(reference));
			return new JSONPathBuilder(parseJSONReference(reference, op));
		},
		jsonPath() {
			return new JSONPathBuilder(JSONPathNode.create());
		},
		table(table) {
			return new ExpressionWrapper(parseTable(table));
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
			if (isReadonlyArray(exprs)) return new ExpressionWrapper(parseFilterList(exprs, "and"));
			return new ExpressionWrapper(parseFilterObject(exprs, "and"));
		},
		or(exprs) {
			if (isReadonlyArray(exprs)) return new ExpressionWrapper(parseFilterList(exprs, "or"));
			return new ExpressionWrapper(parseFilterObject(exprs, "or"));
		},
		parens(...args) {
			const node = parseValueBinaryOperationOrExpression(args);
			if (ParensNode.is(node)) return new ExpressionWrapper(node);
			else return new ExpressionWrapper(ParensNode.create(node));
		},
		cast(expr, dataType) {
			return new ExpressionWrapper(CastNode.create(parseReferenceExpression(expr), parseDataTypeExpression(dataType)));
		}
	});
	eb.fn = createFunctionModule();
	eb.eb = eb;
	return eb;
}
function expressionBuilder(_) {
	return createExpressionBuilder();
}
var init_expression_builder = __esmMin((() => {
	init_select_query_builder();
	init_select_query_node();
	init_table_parser();
	init_query_id();
	init_function_module();
	init_reference_parser();
	init_binary_operation_parser();
	init_parens_node();
	init_expression_wrapper();
	init_operator_node();
	init_unary_operation_parser();
	init_value_parser();
	init_noop_query_executor();
	init_case_builder();
	init_case_node();
	init_object_utils();
	init_json_path_builder();
	init_binary_operation_node();
	init_and_node();
	init_tuple_node();
	init_json_path_node();
	init_data_type_parser();
	init_cast_node();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/expression-parser.js
function parseExpression(exp) {
	if (isOperationNodeSource(exp)) return exp.toOperationNode();
	else if (isFunction(exp)) return exp(expressionBuilder()).toOperationNode();
	throw new Error(`invalid expression: ${JSON.stringify(exp)}`);
}
function parseAliasedExpression(exp) {
	if (isOperationNodeSource(exp)) return exp.toOperationNode();
	else if (isFunction(exp)) return exp(expressionBuilder()).toOperationNode();
	throw new Error(`invalid aliased expression: ${JSON.stringify(exp)}`);
}
function isExpressionOrFactory(obj) {
	return isExpression(obj) || isAliasedExpression(obj) || isFunction(obj);
}
var init_expression_parser = __esmMin((() => {
	init_expression();
	init_operation_node_source();
	init_expression_builder();
	init_object_utils();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dynamic/dynamic-table-builder.js
function isAliasedDynamicTableBuilder(obj) {
	return isObject(obj) && isOperationNodeSource(obj) && isString(obj.table) && isString(obj.alias);
}
var _table, DynamicTableBuilder, _table2, _alias$1, AliasedDynamicTableBuilder;
var init_dynamic_table_builder = __esmMin((() => {
	init_alias_node();
	init_identifier_node();
	init_operation_node_source();
	init_table_parser();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldGet2();
	init_classPrivateFieldSet2();
	_table = /* @__PURE__ */ new WeakMap();
	DynamicTableBuilder = class {
		get table() {
			return _classPrivateFieldGet2(_table, this);
		}
		constructor(table) {
			_classPrivateFieldInitSpec(this, _table, void 0);
			_classPrivateFieldSet2(_table, this, table);
		}
		as(alias) {
			return new AliasedDynamicTableBuilder(_classPrivateFieldGet2(_table, this), alias);
		}
	};
	_table2 = /* @__PURE__ */ new WeakMap();
	_alias$1 = /* @__PURE__ */ new WeakMap();
	AliasedDynamicTableBuilder = class {
		get table() {
			return _classPrivateFieldGet2(_table2, this);
		}
		get alias() {
			return _classPrivateFieldGet2(_alias$1, this);
		}
		constructor(table, alias) {
			_classPrivateFieldInitSpec(this, _table2, void 0);
			_classPrivateFieldInitSpec(this, _alias$1, void 0);
			_classPrivateFieldSet2(_table2, this, table);
			_classPrivateFieldSet2(_alias$1, this, alias);
		}
		toOperationNode() {
			return AliasNode.create(parseTable(_classPrivateFieldGet2(_table2, this)), IdentifierNode.create(_classPrivateFieldGet2(_alias$1, this)));
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/table-parser.js
function parseTableExpressionOrList(table) {
	if (isReadonlyArray(table)) return table.map((it) => parseTableExpression(it));
	else return [parseTableExpression(table)];
}
function parseTableExpression(table) {
	if (isString(table)) return parseAliasedTable(table);
	else if (isAliasedDynamicTableBuilder(table)) return table.toOperationNode();
	else return parseAliasedExpression(table);
}
function parseAliasedTable(from) {
	const ALIAS_SEPARATOR = " as ";
	if (from.includes(ALIAS_SEPARATOR)) {
		const [table, alias] = from.split(ALIAS_SEPARATOR).map(trim$1);
		return AliasNode.create(parseTable(table), IdentifierNode.create(alias));
	} else return parseTable(from);
}
function parseTable(from) {
	const SCHEMA_SEPARATOR = ".";
	if (from.includes(SCHEMA_SEPARATOR)) {
		const [schema, table] = from.split(SCHEMA_SEPARATOR).map(trim$1);
		return TableNode.createWithSchema(schema, table);
	} else return TableNode.create(from);
}
function trim$1(str) {
	return str.trim();
}
var init_table_parser = __esmMin((() => {
	init_object_utils();
	init_alias_node();
	init_table_node();
	init_expression_parser();
	init_identifier_node();
	init_dynamic_table_builder();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/add-column-node.js
var AddColumnNode;
var init_add_column_node = __esmMin((() => {
	init_object_utils();
	AddColumnNode = freeze({
		is(node) {
			return node.kind === "AddColumnNode";
		},
		create(column) {
			return freeze({
				kind: "AddColumnNode",
				column
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/column-definition-node.js
var ColumnDefinitionNode;
var init_column_definition_node = __esmMin((() => {
	init_object_utils();
	init_column_node();
	ColumnDefinitionNode = freeze({
		is(node) {
			return node.kind === "ColumnDefinitionNode";
		},
		create(column, dataType) {
			return freeze({
				kind: "ColumnDefinitionNode",
				column: ColumnNode.create(column),
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/drop-column-node.js
var DropColumnNode;
var init_drop_column_node = __esmMin((() => {
	init_object_utils();
	init_column_node();
	DropColumnNode = freeze({
		is(node) {
			return node.kind === "DropColumnNode";
		},
		create(column) {
			return freeze({
				kind: "DropColumnNode",
				column: ColumnNode.create(column)
			});
		},
		cloneWith(node, props) {
			return freeze({
				...node,
				...props
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/rename-column-node.js
var RenameColumnNode;
var init_rename_column_node = __esmMin((() => {
	init_object_utils();
	init_column_node();
	RenameColumnNode = freeze({
		is(node) {
			return node.kind === "RenameColumnNode";
		},
		create(column, newColumn) {
			return freeze({
				kind: "RenameColumnNode",
				column: ColumnNode.create(column),
				renameTo: ColumnNode.create(newColumn)
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/check-constraint-node.js
var CheckConstraintNode;
var init_check_constraint_node = __esmMin((() => {
	init_object_utils();
	init_identifier_node();
	CheckConstraintNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/references-node.js
function isOnModifyForeignAction(thing) {
	return isString(thing) && ON_MODIFY_FOREIGN_ACTIONS_DICTIONARY[thing];
}
var ON_MODIFY_FOREIGN_ACTIONS_DICTIONARY, ON_MODIFY_FOREIGN_ACTIONS, ReferencesNode;
var init_references_node = __esmMin((() => {
	init_object_utils();
	ON_MODIFY_FOREIGN_ACTIONS_DICTIONARY = freeze({
		cascade: true,
		"no action": true,
		restrict: true,
		"set default": true,
		"set null": true
	});
	ON_MODIFY_FOREIGN_ACTIONS = Object.keys(ON_MODIFY_FOREIGN_ACTIONS_DICTIONARY);
	ReferencesNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/default-value-parser.js
function parseDefaultValueExpression(value) {
	return isOperationNodeSource(value) ? value.toOperationNode() : ValueNode.createImmediate(value);
}
var init_default_value_parser = __esmMin((() => {
	init_operation_node_source();
	init_value_node();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/generated-node.js
var GeneratedNode;
var init_generated_node = __esmMin((() => {
	init_object_utils();
	GeneratedNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/default-value-node.js
var DefaultValueNode;
var init_default_value_node = __esmMin((() => {
	init_object_utils();
	DefaultValueNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/on-modify-action-parser.js
function parseOnModifyForeignAction(action) {
	if (isOnModifyForeignAction(action)) return action;
	throw new Error(`invalid OnModifyForeignAction ${action}`);
}
var init_on_modify_action_parser = __esmMin((() => {
	init_references_node();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/column-definition-builder.js
var _node$5, ColumnDefinitionBuilder;
var init_column_definition_builder = __esmMin((() => {
	init_check_constraint_node();
	init_references_node();
	init_select_all_node();
	init_reference_parser();
	init_column_definition_node();
	init_default_value_parser();
	init_generated_node();
	init_default_value_node();
	init_on_modify_action_parser();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_node$5 = /* @__PURE__ */ new WeakMap();
	ColumnDefinitionBuilder = class ColumnDefinitionBuilder {
		constructor(node) {
			_classPrivateFieldInitSpec(this, _node$5, void 0);
			_classPrivateFieldSet2(_node$5, this, node);
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
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { autoIncrement: true }));
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
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { identity: true }));
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
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { primaryKey: true }));
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
			if (!references.table || SelectAllNode.is(references.column)) throw new Error(`invalid call references('${ref}'). The reference must have format table.column or schema.table.column`);
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { references: ReferencesNode.create(references.table, [references.column]) }));
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
			if (!_classPrivateFieldGet2(_node$5, this).references) throw new Error("on delete constraint can only be added for foreign keys");
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { references: ReferencesNode.cloneWithOnDelete(_classPrivateFieldGet2(_node$5, this).references, parseOnModifyForeignAction(onDelete)) }));
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
			if (!_classPrivateFieldGet2(_node$5, this).references) throw new Error("on update constraint can only be added for foreign keys");
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { references: ReferencesNode.cloneWithOnUpdate(_classPrivateFieldGet2(_node$5, this).references, parseOnModifyForeignAction(onUpdate)) }));
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
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { unique: true }));
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
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { notNull: true }));
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
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { unsigned: true }));
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
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { defaultTo: DefaultValueNode.create(parseDefaultValueExpression(value)) }));
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
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { check: CheckConstraintNode.create(expression.toOperationNode()) }));
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
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { generated: GeneratedNode.createWithExpression(expression.toOperationNode()) }));
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
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { generated: GeneratedNode.create({
				identity: true,
				always: true
			}) }));
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
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { generated: GeneratedNode.create({
				identity: true,
				byDefault: true
			}) }));
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
			if (!_classPrivateFieldGet2(_node$5, this).generated) throw new Error("stored() can only be called after generatedAlwaysAs");
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { generated: GeneratedNode.cloneWith(_classPrivateFieldGet2(_node$5, this).generated, { stored: true }) }));
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
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithFrontModifier(_classPrivateFieldGet2(_node$5, this), modifier.toOperationNode()));
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
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { nullsNotDistinct: true }));
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
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(_classPrivateFieldGet2(_node$5, this), { ifNotExists: true }));
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
			return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithEndModifier(_classPrivateFieldGet2(_node$5, this), modifier.toOperationNode()));
		}
		/**
		* Simply calls the provided function passing `this` as the only argument. `$call` returns
		* what the provided function returns.
		*/
		$call(func) {
			return func(this);
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_node$5, this);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/modify-column-node.js
var ModifyColumnNode;
var init_modify_column_node = __esmMin((() => {
	init_object_utils();
	ModifyColumnNode = freeze({
		is(node) {
			return node.kind === "ModifyColumnNode";
		},
		create(column) {
			return freeze({
				kind: "ModifyColumnNode",
				column
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/foreign-key-constraint-node.js
var ForeignKeyConstraintNode;
var init_foreign_key_constraint_node = __esmMin((() => {
	init_object_utils();
	init_identifier_node();
	init_references_node();
	ForeignKeyConstraintNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/foreign-key-constraint-builder.js
var _node$4, ForeignKeyConstraintBuilder;
var init_foreign_key_constraint_builder = __esmMin((() => {
	init_foreign_key_constraint_node();
	init_on_modify_action_parser();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_node$4 = /* @__PURE__ */ new WeakMap();
	ForeignKeyConstraintBuilder = class ForeignKeyConstraintBuilder {
		constructor(node) {
			_classPrivateFieldInitSpec(this, _node$4, void 0);
			_classPrivateFieldSet2(_node$4, this, node);
		}
		onDelete(onDelete) {
			return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(_classPrivateFieldGet2(_node$4, this), { onDelete: parseOnModifyForeignAction(onDelete) }));
		}
		onUpdate(onUpdate) {
			return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(_classPrivateFieldGet2(_node$4, this), { onUpdate: parseOnModifyForeignAction(onUpdate) }));
		}
		deferrable() {
			return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(_classPrivateFieldGet2(_node$4, this), { deferrable: true }));
		}
		notDeferrable() {
			return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(_classPrivateFieldGet2(_node$4, this), { deferrable: false }));
		}
		initiallyDeferred() {
			return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(_classPrivateFieldGet2(_node$4, this), { initiallyDeferred: true }));
		}
		initiallyImmediate() {
			return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(_classPrivateFieldGet2(_node$4, this), { initiallyDeferred: false }));
		}
		/**
		* Simply calls the provided function passing `this` as the only argument. `$call` returns
		* what the provided function returns.
		*/
		$call(func) {
			return func(this);
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_node$4, this);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/add-constraint-node.js
var AddConstraintNode;
var init_add_constraint_node = __esmMin((() => {
	init_object_utils();
	AddConstraintNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/unique-constraint-node.js
var UniqueConstraintNode;
var init_unique_constraint_node = __esmMin((() => {
	init_log_once();
	init_object_utils();
	init_column_node();
	init_identifier_node();
	UniqueConstraintNode = freeze({
		is(node) {
			return node.kind === "UniqueConstraintNode";
		},
		create(columns, constraintName, nullsNotDistinct) {
			if (isString(columns.at(0))) {
				logOnce("`UniqueConstraintNode.create(columns: string[], ...)` is deprecated - pass `ColumnNode[]` instead.");
				columns = columns.map(ColumnNode.create);
			}
			return freeze({
				kind: "UniqueConstraintNode",
				columns: freeze(columns),
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/drop-constraint-node.js
var DropConstraintNode;
var init_drop_constraint_node = __esmMin((() => {
	init_object_utils();
	init_identifier_node();
	DropConstraintNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/alter-column-node.js
var AlterColumnNode;
var init_alter_column_node = __esmMin((() => {
	init_object_utils();
	init_column_node();
	AlterColumnNode = freeze({
		is(node) {
			return node.kind === "AlterColumnNode";
		},
		create(column, prop, value) {
			return freeze({
				kind: "AlterColumnNode",
				column: ColumnNode.create(column),
				[prop]: value
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-column-builder.js
var _column, AlterColumnBuilder, _alterColumnNode, AlteredColumnBuilder;
var init_alter_column_builder = __esmMin((() => {
	init_alter_column_node();
	init_data_type_parser();
	init_default_value_parser();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_column = /* @__PURE__ */ new WeakMap();
	AlterColumnBuilder = class {
		constructor(column) {
			_classPrivateFieldInitSpec(this, _column, void 0);
			_classPrivateFieldSet2(_column, this, column);
		}
		setDataType(dataType) {
			return new AlteredColumnBuilder(AlterColumnNode.create(_classPrivateFieldGet2(_column, this), "dataType", parseDataTypeExpression(dataType)));
		}
		setDefault(value) {
			return new AlteredColumnBuilder(AlterColumnNode.create(_classPrivateFieldGet2(_column, this), "setDefault", parseDefaultValueExpression(value)));
		}
		dropDefault() {
			return new AlteredColumnBuilder(AlterColumnNode.create(_classPrivateFieldGet2(_column, this), "dropDefault", true));
		}
		setNotNull() {
			return new AlteredColumnBuilder(AlterColumnNode.create(_classPrivateFieldGet2(_column, this), "setNotNull", true));
		}
		dropNotNull() {
			return new AlteredColumnBuilder(AlterColumnNode.create(_classPrivateFieldGet2(_column, this), "dropNotNull", true));
		}
		/**
		* Simply calls the provided function passing `this` as the only argument. `$call` returns
		* what the provided function returns.
		*/
		$call(func) {
			return func(this);
		}
	};
	_alterColumnNode = /* @__PURE__ */ new WeakMap();
	AlteredColumnBuilder = class {
		constructor(alterColumnNode) {
			_classPrivateFieldInitSpec(this, _alterColumnNode, void 0);
			_classPrivateFieldSet2(_alterColumnNode, this, alterColumnNode);
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_alterColumnNode, this);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-table-executor.js
var _props$21, AlterTableExecutor;
var init_alter_table_executor = __esmMin((() => {
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$21 = /* @__PURE__ */ new WeakMap();
	AlterTableExecutor = class {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$21, void 0);
			_classPrivateFieldSet2(_props$21, this, freeze(props));
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_props$21, this).executor.transformQuery(_classPrivateFieldGet2(_props$21, this).node, _classPrivateFieldGet2(_props$21, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$21, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$21, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props$21, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-table-add-foreign-key-constraint-builder.js
var _props$20, AlterTableAddForeignKeyConstraintBuilder;
var init_alter_table_add_foreign_key_constraint_builder = __esmMin((() => {
	init_add_constraint_node();
	init_alter_table_node();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$20 = /* @__PURE__ */ new WeakMap();
	AlterTableAddForeignKeyConstraintBuilder = class AlterTableAddForeignKeyConstraintBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$20, void 0);
			_classPrivateFieldSet2(_props$20, this, freeze(props));
		}
		onDelete(onDelete) {
			return new AlterTableAddForeignKeyConstraintBuilder({
				..._classPrivateFieldGet2(_props$20, this),
				constraintBuilder: _classPrivateFieldGet2(_props$20, this).constraintBuilder.onDelete(onDelete)
			});
		}
		onUpdate(onUpdate) {
			return new AlterTableAddForeignKeyConstraintBuilder({
				..._classPrivateFieldGet2(_props$20, this),
				constraintBuilder: _classPrivateFieldGet2(_props$20, this).constraintBuilder.onUpdate(onUpdate)
			});
		}
		deferrable() {
			return new AlterTableAddForeignKeyConstraintBuilder({
				..._classPrivateFieldGet2(_props$20, this),
				constraintBuilder: _classPrivateFieldGet2(_props$20, this).constraintBuilder.deferrable()
			});
		}
		notDeferrable() {
			return new AlterTableAddForeignKeyConstraintBuilder({
				..._classPrivateFieldGet2(_props$20, this),
				constraintBuilder: _classPrivateFieldGet2(_props$20, this).constraintBuilder.notDeferrable()
			});
		}
		initiallyDeferred() {
			return new AlterTableAddForeignKeyConstraintBuilder({
				..._classPrivateFieldGet2(_props$20, this),
				constraintBuilder: _classPrivateFieldGet2(_props$20, this).constraintBuilder.initiallyDeferred()
			});
		}
		initiallyImmediate() {
			return new AlterTableAddForeignKeyConstraintBuilder({
				..._classPrivateFieldGet2(_props$20, this),
				constraintBuilder: _classPrivateFieldGet2(_props$20, this).constraintBuilder.initiallyImmediate()
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
			return _classPrivateFieldGet2(_props$20, this).executor.transformQuery(AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$20, this).node, { addConstraint: AddConstraintNode.create(_classPrivateFieldGet2(_props$20, this).constraintBuilder.toOperationNode()) }), _classPrivateFieldGet2(_props$20, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$20, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$20, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props$20, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-table-drop-constraint-builder.js
var _props$19, AlterTableDropConstraintBuilder;
var init_alter_table_drop_constraint_builder = __esmMin((() => {
	init_alter_table_node();
	init_drop_constraint_node();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$19 = /* @__PURE__ */ new WeakMap();
	AlterTableDropConstraintBuilder = class AlterTableDropConstraintBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$19, void 0);
			_classPrivateFieldSet2(_props$19, this, freeze(props));
		}
		ifExists() {
			return new AlterTableDropConstraintBuilder({
				..._classPrivateFieldGet2(_props$19, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$19, this).node, { dropConstraint: DropConstraintNode.cloneWith(_classPrivateFieldGet2(_props$19, this).node.dropConstraint, { ifExists: true }) })
			});
		}
		cascade() {
			return new AlterTableDropConstraintBuilder({
				..._classPrivateFieldGet2(_props$19, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$19, this).node, { dropConstraint: DropConstraintNode.cloneWith(_classPrivateFieldGet2(_props$19, this).node.dropConstraint, { modifier: "cascade" }) })
			});
		}
		restrict() {
			return new AlterTableDropConstraintBuilder({
				..._classPrivateFieldGet2(_props$19, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$19, this).node, { dropConstraint: DropConstraintNode.cloneWith(_classPrivateFieldGet2(_props$19, this).node.dropConstraint, { modifier: "restrict" }) })
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
			return _classPrivateFieldGet2(_props$19, this).executor.transformQuery(_classPrivateFieldGet2(_props$19, this).node, _classPrivateFieldGet2(_props$19, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$19, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$19, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props$19, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/primary-key-constraint-node.js
var PrimaryKeyConstraintNode;
var init_primary_key_constraint_node = __esmMin((() => {
	init_object_utils();
	init_column_node();
	init_identifier_node();
	PrimaryKeyConstraintNode = freeze({
		is(node) {
			return node.kind === "PrimaryKeyConstraintNode";
		},
		create(columns, constraintName) {
			return freeze({
				kind: "PrimaryKeyConstraintNode",
				columns: freeze(columns.map(ColumnNode.create)),
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/add-index-node.js
var AddIndexNode;
var init_add_index_node = __esmMin((() => {
	init_object_utils();
	init_identifier_node();
	AddIndexNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-table-add-index-builder.js
var _props$18, AlterTableAddIndexBuilder;
var init_alter_table_add_index_builder = __esmMin((() => {
	init_add_index_node();
	init_alter_table_node();
	init_raw_node();
	init_reference_parser();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$18 = /* @__PURE__ */ new WeakMap();
	AlterTableAddIndexBuilder = class AlterTableAddIndexBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$18, void 0);
			_classPrivateFieldSet2(_props$18, this, freeze(props));
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
			return new AlterTableAddIndexBuilder({
				..._classPrivateFieldGet2(_props$18, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$18, this).node, { addIndex: AddIndexNode.cloneWith(_classPrivateFieldGet2(_props$18, this).node.addIndex, { unique: true }) })
			});
		}
		column(arg) {
			return new AlterTableAddIndexBuilder({
				..._classPrivateFieldGet2(_props$18, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$18, this).node, { addIndex: AddIndexNode.cloneWithColumns(_classPrivateFieldGet2(_props$18, this).node.addIndex, [isString(arg) ? parseOrderedColumnName(arg) : arg.toOperationNode()]) })
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
		* import { sql } from 'kysely'
		*
		* await db.schema
		*   .alterTable('person')
		*   .addIndex('person_first_name_and_age_index')
		*   .columns(['first_name', sql`(left(lower(last_name), 1))`, 'age desc'])
		*   .execute()
		* ```
		*
		* The generated SQL (MySQL):
		*
		* ```sql
		* alter table `person`
		* add index `person_first_name_and_age_index` (
		*   `first_name`,
		*   (left(lower(last_name), 1)),
		*   `age` desc
		* )
		* ```
		*/
		columns(columns) {
			return new AlterTableAddIndexBuilder({
				..._classPrivateFieldGet2(_props$18, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$18, this).node, { addIndex: AddIndexNode.cloneWithColumns(_classPrivateFieldGet2(_props$18, this).node.addIndex, columns.map((item) => isString(item) ? parseOrderedColumnName(item) : item.toOperationNode())) })
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
		*
		* @deprecated Use {@link column} or {@link columns} with an {@link Expression} instead.
		*/
		expression(expression) {
			return new AlterTableAddIndexBuilder({
				..._classPrivateFieldGet2(_props$18, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$18, this).node, { addIndex: AddIndexNode.cloneWithColumns(_classPrivateFieldGet2(_props$18, this).node.addIndex, [expression.toOperationNode()]) })
			});
		}
		using(indexType) {
			return new AlterTableAddIndexBuilder({
				..._classPrivateFieldGet2(_props$18, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$18, this).node, { addIndex: AddIndexNode.cloneWith(_classPrivateFieldGet2(_props$18, this).node.addIndex, { using: RawNode.createWithSql(indexType) }) })
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
			return _classPrivateFieldGet2(_props$18, this).executor.transformQuery(_classPrivateFieldGet2(_props$18, this).node, _classPrivateFieldGet2(_props$18, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$18, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$18, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props$18, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/unique-constraint-builder.js
var _node$3, UniqueConstraintNodeBuilder;
var init_unique_constraint_builder = __esmMin((() => {
	init_unique_constraint_node();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_node$3 = /* @__PURE__ */ new WeakMap();
	UniqueConstraintNodeBuilder = class UniqueConstraintNodeBuilder {
		constructor(node) {
			_classPrivateFieldInitSpec(this, _node$3, void 0);
			_classPrivateFieldSet2(_node$3, this, node);
		}
		/**
		* Adds `nulls not distinct` to the unique constraint definition
		*
		* Supported by PostgreSQL dialect only
		*/
		nullsNotDistinct() {
			return new UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(_classPrivateFieldGet2(_node$3, this), { nullsNotDistinct: true }));
		}
		deferrable() {
			return new UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(_classPrivateFieldGet2(_node$3, this), { deferrable: true }));
		}
		notDeferrable() {
			return new UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(_classPrivateFieldGet2(_node$3, this), { deferrable: false }));
		}
		initiallyDeferred() {
			return new UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(_classPrivateFieldGet2(_node$3, this), { initiallyDeferred: true }));
		}
		initiallyImmediate() {
			return new UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(_classPrivateFieldGet2(_node$3, this), { initiallyDeferred: false }));
		}
		/**
		* Simply calls the provided function passing `this` as the only argument. `$call` returns
		* what the provided function returns.
		*/
		$call(func) {
			return func(this);
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_node$3, this);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/primary-key-constraint-builder.js
var _node$2, PrimaryKeyConstraintBuilder;
var init_primary_key_constraint_builder = __esmMin((() => {
	init_primary_key_constraint_node();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_node$2 = /* @__PURE__ */ new WeakMap();
	PrimaryKeyConstraintBuilder = class PrimaryKeyConstraintBuilder {
		constructor(node) {
			_classPrivateFieldInitSpec(this, _node$2, void 0);
			_classPrivateFieldSet2(_node$2, this, node);
		}
		deferrable() {
			return new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(_classPrivateFieldGet2(_node$2, this), { deferrable: true }));
		}
		notDeferrable() {
			return new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(_classPrivateFieldGet2(_node$2, this), { deferrable: false }));
		}
		initiallyDeferred() {
			return new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(_classPrivateFieldGet2(_node$2, this), { initiallyDeferred: true }));
		}
		initiallyImmediate() {
			return new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.cloneWith(_classPrivateFieldGet2(_node$2, this), { initiallyDeferred: false }));
		}
		/**
		* Simply calls the provided function passing `this` as the only argument. `$call` returns
		* what the provided function returns.
		*/
		$call(func) {
			return func(this);
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_node$2, this);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/check-constraint-builder.js
var _node$1, CheckConstraintBuilder;
var init_check_constraint_builder = __esmMin((() => {
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_node$1 = /* @__PURE__ */ new WeakMap();
	CheckConstraintBuilder = class {
		constructor(node) {
			_classPrivateFieldInitSpec(this, _node$1, void 0);
			_classPrivateFieldSet2(_node$1, this, node);
		}
		/**
		* Simply calls the provided function passing `this` as the only argument. `$call` returns
		* what the provided function returns.
		*/
		$call(func) {
			return func(this);
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_node$1, this);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/rename-constraint-node.js
var RenameConstraintNode;
var init_rename_constraint_node = __esmMin((() => {
	init_object_utils();
	init_identifier_node();
	RenameConstraintNode = freeze({
		is(node) {
			return node.kind === "RenameConstraintNode";
		},
		create(oldName, newName) {
			return freeze({
				kind: "RenameConstraintNode",
				oldName: IdentifierNode.create(oldName),
				newName: IdentifierNode.create(newName)
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/drop-column-builder.js
var _props$17, DropColumnBuilder;
var init_drop_column_builder = __esmMin((() => {
	init_drop_column_node();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$17 = /* @__PURE__ */ new WeakMap();
	DropColumnBuilder = class DropColumnBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$17, void 0);
			_classPrivateFieldSet2(_props$17, this, freeze({ ...props }));
		}
		ifExists() {
			return new DropColumnBuilder({
				..._classPrivateFieldGet2(_props$17, this),
				node: DropColumnNode.cloneWith(_classPrivateFieldGet2(_props$17, this).node, { ifExists: true })
			});
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_props$17, this).node;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-table-builder.js
var _props$16, AlterTableBuilder, _props2$1, AlterTableColumnAlteringBuilder;
var init_alter_table_builder = __esmMin((() => {
	init_add_column_node();
	init_alter_table_node();
	init_column_definition_node();
	init_drop_column_node();
	init_identifier_node();
	init_rename_column_node();
	init_object_utils();
	init_column_definition_builder();
	init_modify_column_node();
	init_data_type_parser();
	init_foreign_key_constraint_builder();
	init_add_constraint_node();
	init_unique_constraint_node();
	init_check_constraint_node();
	init_foreign_key_constraint_node();
	init_column_node();
	init_table_parser();
	init_drop_constraint_node();
	init_alter_column_builder();
	init_alter_table_executor();
	init_alter_table_add_foreign_key_constraint_builder();
	init_alter_table_drop_constraint_builder();
	init_primary_key_constraint_node();
	init_drop_index_node();
	init_add_index_node();
	init_alter_table_add_index_builder();
	init_unique_constraint_builder();
	init_primary_key_constraint_builder();
	init_check_constraint_builder();
	init_rename_constraint_node();
	init_expression_parser();
	init_drop_column_builder();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$16 = /* @__PURE__ */ new WeakMap();
	AlterTableBuilder = class {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$16, void 0);
			_classPrivateFieldSet2(_props$16, this, freeze(props));
		}
		renameTo(newTableName) {
			return new AlterTableExecutor({
				..._classPrivateFieldGet2(_props$16, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$16, this).node, { renameTo: parseTable(newTableName) })
			});
		}
		setSchema(newSchema) {
			return new AlterTableExecutor({
				..._classPrivateFieldGet2(_props$16, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$16, this).node, { setSchema: IdentifierNode.create(newSchema) })
			});
		}
		alterColumn(column, alteration) {
			const builder = alteration(new AlterColumnBuilder(column));
			return new AlterTableColumnAlteringBuilder({
				..._classPrivateFieldGet2(_props$16, this),
				node: AlterTableNode.cloneWithColumnAlteration(_classPrivateFieldGet2(_props$16, this).node, builder.toOperationNode())
			});
		}
		dropColumn(column, build = noop) {
			const builder = build(new DropColumnBuilder({ node: DropColumnNode.create(column) }));
			return new AlterTableColumnAlteringBuilder({
				..._classPrivateFieldGet2(_props$16, this),
				node: AlterTableNode.cloneWithColumnAlteration(_classPrivateFieldGet2(_props$16, this).node, builder.toOperationNode())
			});
		}
		renameColumn(column, newColumn) {
			return new AlterTableColumnAlteringBuilder({
				..._classPrivateFieldGet2(_props$16, this),
				node: AlterTableNode.cloneWithColumnAlteration(_classPrivateFieldGet2(_props$16, this).node, RenameColumnNode.create(column, newColumn))
			});
		}
		addColumn(columnName, dataType, build = noop) {
			const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
			return new AlterTableColumnAlteringBuilder({
				..._classPrivateFieldGet2(_props$16, this),
				node: AlterTableNode.cloneWithColumnAlteration(_classPrivateFieldGet2(_props$16, this).node, AddColumnNode.create(builder.toOperationNode()))
			});
		}
		modifyColumn(columnName, dataType, build = noop) {
			const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
			return new AlterTableColumnAlteringBuilder({
				..._classPrivateFieldGet2(_props$16, this),
				node: AlterTableNode.cloneWithColumnAlteration(_classPrivateFieldGet2(_props$16, this).node, ModifyColumnNode.create(builder.toOperationNode()))
			});
		}
		/**
		* See {@link CreateTableBuilder.addUniqueConstraint}
		*/
		addUniqueConstraint(constraintName, columns, build = noop) {
			const uniqueConstraintBuilder = build(new UniqueConstraintNodeBuilder(UniqueConstraintNode.create(columns.map((column) => isString(column) ? ColumnNode.create(column) : parseExpression(column)), constraintName)));
			return new AlterTableExecutor({
				..._classPrivateFieldGet2(_props$16, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$16, this).node, { addConstraint: AddConstraintNode.create(uniqueConstraintBuilder.toOperationNode()) })
			});
		}
		/**
		* See {@link CreateTableBuilder.addCheckConstraint}
		*/
		addCheckConstraint(constraintName, checkExpression, build = noop) {
			const constraintBuilder = build(new CheckConstraintBuilder(CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName)));
			return new AlterTableExecutor({
				..._classPrivateFieldGet2(_props$16, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$16, this).node, { addConstraint: AddConstraintNode.create(constraintBuilder.toOperationNode()) })
			});
		}
		/**
		* See {@link CreateTableBuilder.addForeignKeyConstraint}
		*
		* Unlike {@link CreateTableBuilder.addForeignKeyConstraint} this method returns
		* the constraint builder and doesn't take a callback as the last argument. This
		* is because you can only add one column per `ALTER TABLE` query.
		*/
		addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = noop) {
			const constraintBuilder = build(new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName)));
			return new AlterTableAddForeignKeyConstraintBuilder({
				..._classPrivateFieldGet2(_props$16, this),
				constraintBuilder
			});
		}
		/**
		* See {@link CreateTableBuilder.addPrimaryKeyConstraint}
		*/
		addPrimaryKeyConstraint(constraintName, columns, build = noop) {
			const constraintBuilder = build(new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.create(columns, constraintName)));
			return new AlterTableExecutor({
				..._classPrivateFieldGet2(_props$16, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$16, this).node, { addConstraint: AddConstraintNode.create(constraintBuilder.toOperationNode()) })
			});
		}
		dropConstraint(constraintName) {
			return new AlterTableDropConstraintBuilder({
				..._classPrivateFieldGet2(_props$16, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$16, this).node, { dropConstraint: DropConstraintNode.create(constraintName) })
			});
		}
		renameConstraint(oldName, newName) {
			return new AlterTableDropConstraintBuilder({
				..._classPrivateFieldGet2(_props$16, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$16, this).node, { renameConstraint: RenameConstraintNode.create(oldName, newName) })
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
				..._classPrivateFieldGet2(_props$16, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$16, this).node, { addIndex: AddIndexNode.create(indexName) })
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
				..._classPrivateFieldGet2(_props$16, this),
				node: AlterTableNode.cloneWithTableProps(_classPrivateFieldGet2(_props$16, this).node, { dropIndex: DropIndexNode.create(indexName) })
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
	};
	_props2$1 = /* @__PURE__ */ new WeakMap();
	AlterTableColumnAlteringBuilder = class AlterTableColumnAlteringBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props2$1, void 0);
			_classPrivateFieldSet2(_props2$1, this, freeze(props));
		}
		alterColumn(column, alteration) {
			const builder = alteration(new AlterColumnBuilder(column));
			return new AlterTableColumnAlteringBuilder({
				..._classPrivateFieldGet2(_props2$1, this),
				node: AlterTableNode.cloneWithColumnAlteration(_classPrivateFieldGet2(_props2$1, this).node, builder.toOperationNode())
			});
		}
		dropColumn(column, build = noop) {
			const builder = build(new DropColumnBuilder({ node: DropColumnNode.create(column) }));
			return new AlterTableColumnAlteringBuilder({
				..._classPrivateFieldGet2(_props2$1, this),
				node: AlterTableNode.cloneWithColumnAlteration(_classPrivateFieldGet2(_props2$1, this).node, builder.toOperationNode())
			});
		}
		renameColumn(column, newColumn) {
			return new AlterTableColumnAlteringBuilder({
				..._classPrivateFieldGet2(_props2$1, this),
				node: AlterTableNode.cloneWithColumnAlteration(_classPrivateFieldGet2(_props2$1, this).node, RenameColumnNode.create(column, newColumn))
			});
		}
		addColumn(columnName, dataType, build = noop) {
			const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
			return new AlterTableColumnAlteringBuilder({
				..._classPrivateFieldGet2(_props2$1, this),
				node: AlterTableNode.cloneWithColumnAlteration(_classPrivateFieldGet2(_props2$1, this).node, AddColumnNode.create(builder.toOperationNode()))
			});
		}
		modifyColumn(columnName, dataType, build = noop) {
			const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
			return new AlterTableColumnAlteringBuilder({
				..._classPrivateFieldGet2(_props2$1, this),
				node: AlterTableNode.cloneWithColumnAlteration(_classPrivateFieldGet2(_props2$1, this).node, ModifyColumnNode.create(builder.toOperationNode()))
			});
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_props2$1, this).executor.transformQuery(_classPrivateFieldGet2(_props2$1, this).node, _classPrivateFieldGet2(_props2$1, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props2$1, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props2$1, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props2$1, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/immediate-value/immediate-value-transformer.js
var ImmediateValueTransformer;
var init_immediate_value_transformer = __esmMin((() => {
	init_operation_node_transformer();
	init_value_list_node();
	init_value_node();
	ImmediateValueTransformer = class extends OperationNodeTransformer {
		transformPrimitiveValueList(node) {
			return ValueListNode.create(node.values.map(ValueNode.createImmediate));
		}
		transformValue(node) {
			return ValueNode.createImmediate(node.value);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/create-index-builder.js
var _props$15, CreateIndexBuilder;
var init_create_index_builder = __esmMin((() => {
	init_create_index_node();
	init_raw_node();
	init_reference_parser();
	init_table_parser();
	init_object_utils();
	init_binary_operation_parser();
	init_query_node();
	init_immediate_value_transformer();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$15 = /* @__PURE__ */ new WeakMap();
	CreateIndexBuilder = class CreateIndexBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$15, void 0);
			_classPrivateFieldSet2(_props$15, this, freeze(props));
		}
		/**
		* Adds the "if not exists" modifier.
		*
		* If the index already exists, no error is thrown if this method has been called.
		*/
		ifNotExists() {
			return new CreateIndexBuilder({
				..._classPrivateFieldGet2(_props$15, this),
				node: CreateIndexNode.cloneWith(_classPrivateFieldGet2(_props$15, this).node, { ifNotExists: true })
			});
		}
		/**
		* Makes the index unique.
		*/
		unique() {
			return new CreateIndexBuilder({
				..._classPrivateFieldGet2(_props$15, this),
				node: CreateIndexNode.cloneWith(_classPrivateFieldGet2(_props$15, this).node, { unique: true })
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
			return new CreateIndexBuilder({
				..._classPrivateFieldGet2(_props$15, this),
				node: CreateIndexNode.cloneWith(_classPrivateFieldGet2(_props$15, this).node, { nullsNotDistinct: true })
			});
		}
		/**
		* Specifies the table for the index.
		*/
		on(table) {
			return new CreateIndexBuilder({
				..._classPrivateFieldGet2(_props$15, this),
				node: CreateIndexNode.cloneWith(_classPrivateFieldGet2(_props$15, this).node, { table: parseTable(table) })
			});
		}
		column(arg) {
			return new CreateIndexBuilder({
				..._classPrivateFieldGet2(_props$15, this),
				node: CreateIndexNode.cloneWithColumns(_classPrivateFieldGet2(_props$15, this).node, [isString(arg) ? parseOrderedColumnName(arg) : arg.toOperationNode()])
			});
		}
		/**
		* Adds a list of columns to the index.
		*
		* Also see {@link column} for adding a single column.
		*
		* ### Examples
		*
		* ```ts
		* import { sql } from 'kysely'
		*
		* await db.schema
		*   .createIndex('person_first_name_and_age_index')
		*   .on('person')
		*   .columns(['first_name', sql`left(lower("last_name"), 1)`, 'age desc'])
		*   .execute()
		* ```
		*
		* The generated SQL (PostgreSQL):
		*
		* ```sql
		* create index "person_first_name_and_age_index"
		* on "person" ("first_name", left(lower("last_name"), 1), "age" desc)
		* ```
		*/
		columns(columns) {
			return new CreateIndexBuilder({
				..._classPrivateFieldGet2(_props$15, this),
				node: CreateIndexNode.cloneWithColumns(_classPrivateFieldGet2(_props$15, this).node, columns.map((item) => isString(item) ? parseOrderedColumnName(item) : item.toOperationNode()))
			});
		}
		/**
		* Adds an arbitrary expression as a column to the index.
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
		*   .column('gender')
		*   .execute()
		* ```
		*
		* The generated SQL (PostgreSQL):
		*
		* ```sql
		* create index "person_first_name_index"
		* on "person" (first_name COLLATE "fi_FI", "gender")
		* ```
		*
		* @deprecated Use {@link column} or {@link columns} with an {@link Expression} instead.
		*/
		expression(expression) {
			return new CreateIndexBuilder({
				..._classPrivateFieldGet2(_props$15, this),
				node: CreateIndexNode.cloneWithColumns(_classPrivateFieldGet2(_props$15, this).node, [expression.toOperationNode()])
			});
		}
		using(indexType) {
			return new CreateIndexBuilder({
				..._classPrivateFieldGet2(_props$15, this),
				node: CreateIndexNode.cloneWith(_classPrivateFieldGet2(_props$15, this).node, { using: RawNode.createWithSql(indexType) })
			});
		}
		where(...args) {
			const transformer = new ImmediateValueTransformer();
			return new CreateIndexBuilder({
				..._classPrivateFieldGet2(_props$15, this),
				node: QueryNode.cloneWithWhere(_classPrivateFieldGet2(_props$15, this).node, transformer.transformNode(parseValueBinaryOperationOrExpression(args), _classPrivateFieldGet2(_props$15, this).queryId))
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
			return _classPrivateFieldGet2(_props$15, this).executor.transformQuery(_classPrivateFieldGet2(_props$15, this).node, _classPrivateFieldGet2(_props$15, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$15, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$15, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props$15, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/create-schema-builder.js
var _props$14, CreateSchemaBuilder;
var init_create_schema_builder = __esmMin((() => {
	init_create_schema_node();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$14 = /* @__PURE__ */ new WeakMap();
	CreateSchemaBuilder = class CreateSchemaBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$14, void 0);
			_classPrivateFieldSet2(_props$14, this, freeze(props));
		}
		ifNotExists() {
			return new CreateSchemaBuilder({
				..._classPrivateFieldGet2(_props$14, this),
				node: CreateSchemaNode.cloneWith(_classPrivateFieldGet2(_props$14, this).node, { ifNotExists: true })
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
			return _classPrivateFieldGet2(_props$14, this).executor.transformQuery(_classPrivateFieldGet2(_props$14, this).node, _classPrivateFieldGet2(_props$14, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$14, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$14, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props$14, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/on-commit-action-parse.js
function parseOnCommitAction(action) {
	if (ON_COMMIT_ACTIONS.includes(action)) return action;
	throw new Error(`invalid OnCommitAction ${action}`);
}
var init_on_commit_action_parse = __esmMin((() => {
	init_create_table_node();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/create-table-add-index-builder.js
var _node, CreateTableAddIndexBuilder;
var init_create_table_add_index_builder = __esmMin((() => {
	init_add_index_node();
	init_raw_node();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_node = /* @__PURE__ */ new WeakMap();
	CreateTableAddIndexBuilder = class CreateTableAddIndexBuilder {
		constructor(node) {
			_classPrivateFieldInitSpec(this, _node, void 0);
			_classPrivateFieldSet2(_node, this, node);
		}
		using(indexType) {
			return new CreateTableAddIndexBuilder(AddIndexNode.cloneWith(_classPrivateFieldGet2(_node, this), { using: RawNode.createWithSql(indexType) }));
		}
		/**
		* Simply calls the provided function passing `this` as the only argument. `$call` returns
		* what the provided function returns.
		*/
		$call(func) {
			return func(this);
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_node, this);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/create-table-builder.js
var _props$13, CreateTableBuilder;
var init_create_table_builder = __esmMin((() => {
	init_column_definition_node();
	init_create_table_node();
	init_column_definition_builder();
	init_object_utils();
	init_foreign_key_constraint_node();
	init_column_node();
	init_foreign_key_constraint_builder();
	init_data_type_parser();
	init_primary_key_constraint_node();
	init_unique_constraint_node();
	init_check_constraint_node();
	init_table_parser();
	init_on_commit_action_parse();
	init_unique_constraint_builder();
	init_expression_parser();
	init_primary_key_constraint_builder();
	init_check_constraint_builder();
	init_add_index_node();
	init_create_table_add_index_builder();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$13 = /* @__PURE__ */ new WeakMap();
	CreateTableBuilder = class CreateTableBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$13, void 0);
			_classPrivateFieldSet2(_props$13, this, freeze(props));
		}
		/**
		* Adds the "temporary" modifier.
		*
		* Use this to create a temporary table.
		*/
		temporary() {
			return new CreateTableBuilder({
				..._classPrivateFieldGet2(_props$13, this),
				node: CreateTableNode.cloneWith(_classPrivateFieldGet2(_props$13, this).node, { temporary: true })
			});
		}
		/**
		* Adds an "on commit" statement.
		*
		* This can be used in conjunction with temporary tables on supported databases
		* like PostgreSQL.
		*/
		onCommit(onCommit) {
			return new CreateTableBuilder({
				..._classPrivateFieldGet2(_props$13, this),
				node: CreateTableNode.cloneWith(_classPrivateFieldGet2(_props$13, this).node, { onCommit: parseOnCommitAction(onCommit) })
			});
		}
		/**
		* Adds the "if not exists" modifier.
		*
		* If the table already exists, no error is thrown if this method has been called.
		*/
		ifNotExists() {
			return new CreateTableBuilder({
				..._classPrivateFieldGet2(_props$13, this),
				node: CreateTableNode.cloneWith(_classPrivateFieldGet2(_props$13, this).node, { ifNotExists: true })
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
			return new CreateTableBuilder({
				..._classPrivateFieldGet2(_props$13, this),
				node: CreateTableNode.cloneWithColumn(_classPrivateFieldGet2(_props$13, this).node, columnBuilder.toOperationNode())
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
		addPrimaryKeyConstraint(constraintName, columns, build = noop) {
			const constraintBuilder = build(new PrimaryKeyConstraintBuilder(PrimaryKeyConstraintNode.create(columns, constraintName)));
			return new CreateTableBuilder({
				..._classPrivateFieldGet2(_props$13, this),
				node: CreateTableNode.cloneWithConstraint(_classPrivateFieldGet2(_props$13, this).node, constraintBuilder.toOperationNode())
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
		*
		* In dialects such as MySQL you create unique constraints on expressions as follows:
		*
		* ```ts
		*
		* import { sql } from 'kysely'
		*
		* await db.schema
		*   .createTable('person')
		*   .addColumn('first_name', 'varchar(64)')
		*   .addColumn('last_name', 'varchar(64)')
		*   .addUniqueConstraint(
		*     'first_name_last_name_unique',
		*     [sql`(lower('first_name'))`, 'last_name']
		*   )
		*   .execute()
		* ```
		*/
		addUniqueConstraint(constraintName, columns, build = noop) {
			const uniqueConstraintBuilder = build(new UniqueConstraintNodeBuilder(UniqueConstraintNode.create(columns.map((column) => isString(column) ? ColumnNode.create(column) : parseExpression(column)), constraintName)));
			return new CreateTableBuilder({
				..._classPrivateFieldGet2(_props$13, this),
				node: CreateTableNode.cloneWithConstraint(_classPrivateFieldGet2(_props$13, this).node, uniqueConstraintBuilder.toOperationNode())
			});
		}
		/**
		* Adds an index that includes one or more columns.
		*
		* This is only supported by some dialects like MySQL.
		*
		* ### Examples
		*
		* ```ts
		* await db.schema
		*   .createTable('person')
		*   .addColumn('first_name', 'varchar(64)')
		*   .addColumn('last_name', 'varchar(64)')
		*   .addIndex('last_name_key', ['last_name'])
		*   .execute()
		* ```
		*
		* The generated SQL (MySQL):
		*
		* ```sql
		* create table `person` (
		*   `id` integer primary key,
		*   `first_name` varchar(64) not null,
		*   `last_name` varchar(64) not null,
		*   index `last_name_key` (`last_name`)
		* )
		* ```
		*/
		addIndex(indexName, columns, build = noop) {
			const addIndexBuilder = build(new CreateTableAddIndexBuilder(AddIndexNode.cloneWithColumns(AddIndexNode.create(indexName), columns.map((column) => isString(column) ? ColumnNode.create(column) : parseExpression(column)))));
			return new CreateTableBuilder({
				..._classPrivateFieldGet2(_props$13, this),
				node: CreateTableNode.cloneWithIndex(_classPrivateFieldGet2(_props$13, this).node, addIndexBuilder.toOperationNode())
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
		addCheckConstraint(constraintName, checkExpression, build = noop) {
			const constraintBuilder = build(new CheckConstraintBuilder(CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName)));
			return new CreateTableBuilder({
				..._classPrivateFieldGet2(_props$13, this),
				node: CreateTableNode.cloneWithConstraint(_classPrivateFieldGet2(_props$13, this).node, constraintBuilder.toOperationNode())
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
			const builder = build(new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName)));
			return new CreateTableBuilder({
				..._classPrivateFieldGet2(_props$13, this),
				node: CreateTableNode.cloneWithConstraint(_classPrivateFieldGet2(_props$13, this).node, builder.toOperationNode())
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
			return new CreateTableBuilder({
				..._classPrivateFieldGet2(_props$13, this),
				node: CreateTableNode.cloneWithFrontModifier(_classPrivateFieldGet2(_props$13, this).node, modifier.toOperationNode())
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
			return new CreateTableBuilder({
				..._classPrivateFieldGet2(_props$13, this),
				node: CreateTableNode.cloneWithEndModifier(_classPrivateFieldGet2(_props$13, this).node, modifier.toOperationNode())
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
			return new CreateTableBuilder({
				..._classPrivateFieldGet2(_props$13, this),
				node: CreateTableNode.cloneWith(_classPrivateFieldGet2(_props$13, this).node, { selectQuery: parseExpression(expression) })
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
			return _classPrivateFieldGet2(_props$13, this).executor.transformQuery(_classPrivateFieldGet2(_props$13, this).node, _classPrivateFieldGet2(_props$13, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$13, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$13, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props$13, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/drop-index-builder.js
var _props$12, DropIndexBuilder;
var init_drop_index_builder = __esmMin((() => {
	init_drop_index_node();
	init_table_parser();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$12 = /* @__PURE__ */ new WeakMap();
	DropIndexBuilder = class DropIndexBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$12, void 0);
			_classPrivateFieldSet2(_props$12, this, freeze(props));
		}
		/**
		* Specifies the table the index was created for. This is not needed
		* in all dialects.
		*/
		on(table) {
			return new DropIndexBuilder({
				..._classPrivateFieldGet2(_props$12, this),
				node: DropIndexNode.cloneWith(_classPrivateFieldGet2(_props$12, this).node, { table: parseTable(table) })
			});
		}
		ifExists() {
			return new DropIndexBuilder({
				..._classPrivateFieldGet2(_props$12, this),
				node: DropIndexNode.cloneWith(_classPrivateFieldGet2(_props$12, this).node, { ifExists: true })
			});
		}
		cascade() {
			return new DropIndexBuilder({
				..._classPrivateFieldGet2(_props$12, this),
				node: DropIndexNode.cloneWith(_classPrivateFieldGet2(_props$12, this).node, { cascade: true })
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
			return _classPrivateFieldGet2(_props$12, this).executor.transformQuery(_classPrivateFieldGet2(_props$12, this).node, _classPrivateFieldGet2(_props$12, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$12, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$12, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props$12, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/drop-schema-builder.js
var _props$11, DropSchemaBuilder;
var init_drop_schema_builder = __esmMin((() => {
	init_drop_schema_node();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$11 = /* @__PURE__ */ new WeakMap();
	DropSchemaBuilder = class DropSchemaBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$11, void 0);
			_classPrivateFieldSet2(_props$11, this, freeze(props));
		}
		ifExists() {
			return new DropSchemaBuilder({
				..._classPrivateFieldGet2(_props$11, this),
				node: DropSchemaNode.cloneWith(_classPrivateFieldGet2(_props$11, this).node, { ifExists: true })
			});
		}
		cascade() {
			return new DropSchemaBuilder({
				..._classPrivateFieldGet2(_props$11, this),
				node: DropSchemaNode.cloneWith(_classPrivateFieldGet2(_props$11, this).node, { cascade: true })
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
			return _classPrivateFieldGet2(_props$11, this).executor.transformQuery(_classPrivateFieldGet2(_props$11, this).node, _classPrivateFieldGet2(_props$11, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$11, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$11, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props$11, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/drop-table-builder.js
var _props$10, DropTableBuilder;
var init_drop_table_builder = __esmMin((() => {
	init_drop_table_node();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$10 = /* @__PURE__ */ new WeakMap();
	DropTableBuilder = class DropTableBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$10, void 0);
			_classPrivateFieldSet2(_props$10, this, freeze(props));
		}
		/**
		* Adds the "temporary" modifier.
		*
		* This is only supported by some dialects like MySQL.
		*/
		temporary() {
			return new DropTableBuilder({
				..._classPrivateFieldGet2(_props$10, this),
				node: DropTableNode.cloneWith(_classPrivateFieldGet2(_props$10, this).node, { temporary: true })
			});
		}
		ifExists() {
			return new DropTableBuilder({
				..._classPrivateFieldGet2(_props$10, this),
				node: DropTableNode.cloneWith(_classPrivateFieldGet2(_props$10, this).node, { ifExists: true })
			});
		}
		cascade() {
			return new DropTableBuilder({
				..._classPrivateFieldGet2(_props$10, this),
				node: DropTableNode.cloneWith(_classPrivateFieldGet2(_props$10, this).node, { cascade: true })
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
			return _classPrivateFieldGet2(_props$10, this).executor.transformQuery(_classPrivateFieldGet2(_props$10, this).node, _classPrivateFieldGet2(_props$10, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$10, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$10, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props$10, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/create-view-node.js
var CreateViewNode;
var init_create_view_node = __esmMin((() => {
	init_object_utils();
	init_schemable_identifier_node();
	CreateViewNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/immediate-value/immediate-value-plugin.js
var _transformer$3, ImmediateValuePlugin;
var init_immediate_value_plugin = __esmMin((() => {
	init_immediate_value_transformer();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldGet2();
	_transformer$3 = /* @__PURE__ */ new WeakMap();
	ImmediateValuePlugin = class {
		constructor() {
			_classPrivateFieldInitSpec(this, _transformer$3, new ImmediateValueTransformer());
		}
		transformQuery(args) {
			return _classPrivateFieldGet2(_transformer$3, this).transformNode(args.node, args.queryId);
		}
		transformResult(args) {
			return Promise.resolve(args.result);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/create-view-builder.js
var _props$9, CreateViewBuilder;
var init_create_view_builder = __esmMin((() => {
	init_object_utils();
	init_create_view_node();
	init_reference_parser();
	init_immediate_value_plugin();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$9 = /* @__PURE__ */ new WeakMap();
	CreateViewBuilder = class CreateViewBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$9, void 0);
			_classPrivateFieldSet2(_props$9, this, freeze(props));
		}
		/**
		* Adds the "temporary" modifier.
		*
		* Use this to create a temporary view.
		*/
		temporary() {
			return new CreateViewBuilder({
				..._classPrivateFieldGet2(_props$9, this),
				node: CreateViewNode.cloneWith(_classPrivateFieldGet2(_props$9, this).node, { temporary: true })
			});
		}
		materialized() {
			return new CreateViewBuilder({
				..._classPrivateFieldGet2(_props$9, this),
				node: CreateViewNode.cloneWith(_classPrivateFieldGet2(_props$9, this).node, { materialized: true })
			});
		}
		/**
		* Only implemented on some dialects like SQLite. On most dialects, use {@link orReplace}.
		*/
		ifNotExists() {
			return new CreateViewBuilder({
				..._classPrivateFieldGet2(_props$9, this),
				node: CreateViewNode.cloneWith(_classPrivateFieldGet2(_props$9, this).node, { ifNotExists: true })
			});
		}
		orReplace() {
			return new CreateViewBuilder({
				..._classPrivateFieldGet2(_props$9, this),
				node: CreateViewNode.cloneWith(_classPrivateFieldGet2(_props$9, this).node, { orReplace: true })
			});
		}
		columns(columns) {
			return new CreateViewBuilder({
				..._classPrivateFieldGet2(_props$9, this),
				node: CreateViewNode.cloneWith(_classPrivateFieldGet2(_props$9, this).node, { columns: columns.map(parseColumnName) })
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
			return new CreateViewBuilder({
				..._classPrivateFieldGet2(_props$9, this),
				node: CreateViewNode.cloneWith(_classPrivateFieldGet2(_props$9, this).node, { as: queryNode })
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
			return _classPrivateFieldGet2(_props$9, this).executor.transformQuery(_classPrivateFieldGet2(_props$9, this).node, _classPrivateFieldGet2(_props$9, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$9, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$9, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props$9, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/drop-view-node.js
var DropViewNode;
var init_drop_view_node = __esmMin((() => {
	init_object_utils();
	init_schemable_identifier_node();
	DropViewNode = freeze({
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/drop-view-builder.js
var _props$8, DropViewBuilder;
var init_drop_view_builder = __esmMin((() => {
	init_object_utils();
	init_drop_view_node();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$8 = /* @__PURE__ */ new WeakMap();
	DropViewBuilder = class DropViewBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$8, void 0);
			_classPrivateFieldSet2(_props$8, this, freeze(props));
		}
		materialized() {
			return new DropViewBuilder({
				..._classPrivateFieldGet2(_props$8, this),
				node: DropViewNode.cloneWith(_classPrivateFieldGet2(_props$8, this).node, { materialized: true })
			});
		}
		ifExists() {
			return new DropViewBuilder({
				..._classPrivateFieldGet2(_props$8, this),
				node: DropViewNode.cloneWith(_classPrivateFieldGet2(_props$8, this).node, { ifExists: true })
			});
		}
		cascade() {
			return new DropViewBuilder({
				..._classPrivateFieldGet2(_props$8, this),
				node: DropViewNode.cloneWith(_classPrivateFieldGet2(_props$8, this).node, { cascade: true })
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
			return _classPrivateFieldGet2(_props$8, this).executor.transformQuery(_classPrivateFieldGet2(_props$8, this).node, _classPrivateFieldGet2(_props$8, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$8, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$8, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props$8, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/create-type-node.js
var CreateTypeNode;
var init_create_type_node = __esmMin((() => {
	init_object_utils();
	init_value_list_node();
	init_value_node();
	CreateTypeNode = freeze({
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
				enum: ValueListNode.create(values.map(ValueNode.createImmediate))
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/create-type-builder.js
var _props$7, CreateTypeBuilder;
var init_create_type_builder = __esmMin((() => {
	init_object_utils();
	init_create_type_node();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$7 = /* @__PURE__ */ new WeakMap();
	CreateTypeBuilder = class CreateTypeBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$7, void 0);
			_classPrivateFieldSet2(_props$7, this, freeze(props));
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_props$7, this).executor.transformQuery(_classPrivateFieldGet2(_props$7, this).node, _classPrivateFieldGet2(_props$7, this).queryId);
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
			return new CreateTypeBuilder({
				..._classPrivateFieldGet2(_props$7, this),
				node: CreateTypeNode.cloneWithEnum(_classPrivateFieldGet2(_props$7, this).node, values)
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
			return _classPrivateFieldGet2(_props$7, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$7, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props$7, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/drop-type-node.js
var DropTypeNode;
var init_drop_type_node = __esmMin((() => {
	init_object_utils();
	DropTypeNode = freeze({
		is(node) {
			return node.kind === "DropTypeNode";
		},
		create(names) {
			if (!Array.isArray(names)) names = [names];
			return freeze({
				kind: "DropTypeNode",
				name: names[0],
				additionalNames: names.slice(1)
			});
		},
		cloneWith(dropType, params) {
			return freeze({
				...dropType,
				...params
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/drop-type-builder.js
var _props$6, DropTypeBuilder;
var init_drop_type_builder = __esmMin((() => {
	init_drop_type_node();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$6 = /* @__PURE__ */ new WeakMap();
	DropTypeBuilder = class DropTypeBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$6, void 0);
			_classPrivateFieldSet2(_props$6, this, freeze(props));
		}
		/**
		* Adds `if exists` to the query.
		*/
		ifExists() {
			return new DropTypeBuilder({
				..._classPrivateFieldGet2(_props$6, this),
				node: DropTypeNode.cloneWith(_classPrivateFieldGet2(_props$6, this).node, { ifExists: true })
			});
		}
		/**
		* Adds `cascade` to the query.
		*/
		cascade() {
			return new DropTypeBuilder({
				..._classPrivateFieldGet2(_props$6, this),
				node: DropTypeNode.cloneWith(_classPrivateFieldGet2(_props$6, this).node, { cascade: true })
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
			return _classPrivateFieldGet2(_props$6, this).executor.transformQuery(_classPrivateFieldGet2(_props$6, this).node, _classPrivateFieldGet2(_props$6, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$6, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$6, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props$6, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/identifier-parser.js
function parseSchemableIdentifier(id) {
	const SCHEMA_SEPARATOR = ".";
	if (id.includes(SCHEMA_SEPARATOR)) {
		const parts = id.split(SCHEMA_SEPARATOR).map(trim);
		if (parts.length === 2) return SchemableIdentifierNode.createWithSchema(parts[0], parts[1]);
		else throw new Error(`invalid schemable identifier ${id}`);
	} else return SchemableIdentifierNode.create(id);
}
function parseSchemableIdentifierArray(id) {
	if (!Array.isArray(id)) id = [id];
	return id.map(parseSchemableIdentifier);
}
function trim(str) {
	return str.trim();
}
var init_identifier_parser = __esmMin((() => {
	init_schemable_identifier_node();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/refresh-materialized-view-node.js
var RefreshMaterializedViewNode;
var init_refresh_materialized_view_node = __esmMin((() => {
	init_object_utils();
	init_schemable_identifier_node();
	RefreshMaterializedViewNode = freeze({
		is(node) {
			return node.kind === "RefreshMaterializedViewNode";
		},
		create(name) {
			return freeze({
				kind: "RefreshMaterializedViewNode",
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/refresh-materialized-view-builder.js
var _props$5, RefreshMaterializedViewBuilder;
var init_refresh_materialized_view_builder = __esmMin((() => {
	init_object_utils();
	init_refresh_materialized_view_node();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$5 = /* @__PURE__ */ new WeakMap();
	RefreshMaterializedViewBuilder = class RefreshMaterializedViewBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$5, void 0);
			_classPrivateFieldSet2(_props$5, this, freeze(props));
		}
		/**
		* Adds the "concurrently" modifier.
		*
		* Use this to refresh the view without locking out concurrent selects on the materialized view.
		*
		* WARNING!
		* This cannot be used with the "with no data" modifier.
		*/
		concurrently() {
			return new RefreshMaterializedViewBuilder({
				..._classPrivateFieldGet2(_props$5, this),
				node: RefreshMaterializedViewNode.cloneWith(_classPrivateFieldGet2(_props$5, this).node, {
					concurrently: true,
					withNoData: false
				})
			});
		}
		/**
		* Adds the "with data" modifier.
		*
		* If specified (or defaults) the backing query is executed to provide the new data, and the materialized view is left in a scannable state
		*/
		withData() {
			return new RefreshMaterializedViewBuilder({
				..._classPrivateFieldGet2(_props$5, this),
				node: RefreshMaterializedViewNode.cloneWith(_classPrivateFieldGet2(_props$5, this).node, { withNoData: false })
			});
		}
		/**
		* Adds the "with no data" modifier.
		*
		* If specified, no new data is generated and the materialized view is left in an unscannable state.
		*
		* WARNING!
		* This cannot be used with the "concurrently" modifier.
		*/
		withNoData() {
			return new RefreshMaterializedViewBuilder({
				..._classPrivateFieldGet2(_props$5, this),
				node: RefreshMaterializedViewNode.cloneWith(_classPrivateFieldGet2(_props$5, this).node, {
					withNoData: true,
					concurrently: false
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
			return _classPrivateFieldGet2(_props$5, this).executor.transformQuery(_classPrivateFieldGet2(_props$5, this).node, _classPrivateFieldGet2(_props$5, this).queryId);
		}
		compile() {
			return _classPrivateFieldGet2(_props$5, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$5, this).queryId);
		}
		async execute(options) {
			await _classPrivateFieldGet2(_props$5, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/alter-type-node.js
var AlterTypeNode;
var init_alter_type_node = __esmMin((() => {
	init_object_utils();
	AlterTypeNode = freeze({
		is(node) {
			return node.kind === "AlterTypeNode";
		},
		create(name) {
			return freeze({
				kind: "AlterTypeNode",
				name
			});
		},
		cloneWith(node, props) {
			return freeze({
				...node,
				...props
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/add-value-node.js
var AddValueNode;
var init_add_value_node = __esmMin((() => {
	init_object_utils();
	AddValueNode = freeze({
		is(node) {
			return node.kind === "AddValueNode";
		},
		create(value) {
			return freeze({
				kind: "AddValueNode",
				value
			});
		},
		cloneWith(node, props) {
			return freeze({
				...node,
				...props
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-finalizer.js
var _props$4, QueryFinalizer;
var init_query_finalizer = __esmMin((() => {
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$4 = /* @__PURE__ */ new WeakMap();
	QueryFinalizer = class {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$4, void 0);
			_classPrivateFieldSet2(_props$4, this, freeze(props));
		}
		toOperationNode() {
			return _classPrivateFieldGet2(_props$4, this).executor.transformQuery(_classPrivateFieldGet2(_props$4, this).node, _classPrivateFieldGet2(_props$4, this).queryId);
		}
		/**
		* Compiles the query.
		*/
		compile() {
			return _classPrivateFieldGet2(_props$4, this).executor.compileQuery(this.toOperationNode(), _classPrivateFieldGet2(_props$4, this).queryId);
		}
		/**
		* Executes the query.
		*/
		async execute(options) {
			return await _classPrivateFieldGet2(_props$4, this).executor.executeQuery(this.compile(), options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-type-add-value-builder.js
function _setNeighbor(neighborValue, isBefore) {
	return new _a({
		..._classPrivateFieldGet2(_props$3, this),
		node: AlterTypeNode.cloneWith(_classPrivateFieldGet2(_props$3, this).node, { addValue: AddValueNode.cloneWith(_classPrivateFieldGet2(_props$3, this).node.addValue, {
			isBefore,
			neighborValue: ValueNode.createImmediate(neighborValue)
		}) })
	});
}
var _a, _props$3, _AlterTypeAddValueBuilder_brand, AlterTypeAddValueBuilder;
var init_alter_type_add_value_builder = __esmMin((() => {
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_assertClassBrand();
	init_add_value_node();
	init_value_node();
	init_alter_type_node();
	init_query_finalizer();
	_props$3 = /* @__PURE__ */ new WeakMap();
	_AlterTypeAddValueBuilder_brand = /* @__PURE__ */ new WeakSet();
	AlterTypeAddValueBuilder = class extends QueryFinalizer {
		constructor(props) {
			super(props);
			_classPrivateMethodInitSpec(this, _AlterTypeAddValueBuilder_brand);
			_classPrivateFieldInitSpec(this, _props$3, void 0);
			_classPrivateFieldSet2(_props$3, this, props);
		}
		/**
		* Adds an `if not exists` clause.
		*/
		ifNotExists() {
			return new _a({
				..._classPrivateFieldGet2(_props$3, this),
				node: AlterTypeNode.cloneWith(_classPrivateFieldGet2(_props$3, this).node, { addValue: AddValueNode.cloneWith(_classPrivateFieldGet2(_props$3, this).node.addValue, { ifNotExists: true }) })
			});
		}
		/**
		* Sets a `before <value>` clause.
		*/
		before(neighborValue) {
			return _assertClassBrand(_AlterTypeAddValueBuilder_brand, this, _setNeighbor).call(this, neighborValue, true);
		}
		/**
		* Sets an `after <value>` clause.
		*/
		after(neighborValue) {
			return _assertClassBrand(_AlterTypeAddValueBuilder_brand, this, _setNeighbor).call(this, neighborValue, false);
		}
	};
	_a = AlterTypeAddValueBuilder;
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/rename-value-node.js
var RenameValueNode;
var init_rename_value_node = __esmMin((() => {
	init_object_utils();
	RenameValueNode = freeze({
		is(node) {
			return node.kind === "RenameValueNode";
		},
		create(oldValue, newValue) {
			return freeze({
				kind: "RenameValueNode",
				oldValue,
				newValue
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-type-builder.js
var _props$2, AlterTypeBuilder;
var init_alter_type_builder = __esmMin((() => {
	init_object_utils();
	init_alter_type_node();
	init_identifier_node();
	init_alter_type_add_value_builder();
	init_add_value_node();
	init_value_node();
	init_query_finalizer();
	init_rename_value_node();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_props$2 = /* @__PURE__ */ new WeakMap();
	AlterTypeBuilder = class {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props$2, void 0);
			_classPrivateFieldSet2(_props$2, this, freeze(props));
		}
		/**
		* Adds a new value to an enum type.
		*/
		addValue(value) {
			return new AlterTypeAddValueBuilder({
				..._classPrivateFieldGet2(_props$2, this),
				node: AlterTypeNode.cloneWith(_classPrivateFieldGet2(_props$2, this).node, { addValue: AddValueNode.create(ValueNode.createImmediate(value)) })
			});
		}
		/**
		* Rename the type.
		*/
		renameTo(newName) {
			return new QueryFinalizer({
				..._classPrivateFieldGet2(_props$2, this),
				node: AlterTypeNode.cloneWith(_classPrivateFieldGet2(_props$2, this).node, { renameTo: IdentifierNode.create(newName) })
			});
		}
		/**
		* Renames a value of an enum type.
		*/
		renameValue(oldValue, newValue) {
			return new QueryFinalizer({
				..._classPrivateFieldGet2(_props$2, this),
				node: AlterTypeNode.cloneWith(_classPrivateFieldGet2(_props$2, this).node, { renameValue: RenameValueNode.create(ValueNode.createImmediate(oldValue), ValueNode.createImmediate(newValue)) })
			});
		}
		/**
		* Changes the type's schema.
		*/
		setSchema(schema) {
			return new QueryFinalizer({
				..._classPrivateFieldGet2(_props$2, this),
				node: AlterTypeNode.cloneWith(_classPrivateFieldGet2(_props$2, this).node, { setSchema: IdentifierNode.create(schema) })
			});
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/schema-module.js
var _executor$1, SchemaModule;
var init_schema_module = __esmMin((() => {
	init_alter_table_node();
	init_create_index_node();
	init_create_schema_node();
	init_create_table_node();
	init_drop_index_node();
	init_drop_schema_node();
	init_drop_table_node();
	init_table_parser();
	init_alter_table_builder();
	init_create_index_builder();
	init_create_schema_builder();
	init_create_table_builder();
	init_drop_index_builder();
	init_drop_schema_builder();
	init_drop_table_builder();
	init_query_id();
	init_with_schema_plugin();
	init_create_view_builder();
	init_create_view_node();
	init_drop_view_builder();
	init_drop_view_node();
	init_create_type_builder();
	init_drop_type_builder();
	init_create_type_node();
	init_drop_type_node();
	init_identifier_parser();
	init_refresh_materialized_view_builder();
	init_refresh_materialized_view_node();
	init_alter_type_builder();
	init_alter_type_node();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_executor$1 = /* @__PURE__ */ new WeakMap();
	SchemaModule = class SchemaModule {
		constructor(executor) {
			_classPrivateFieldInitSpec(this, _executor$1, void 0);
			_classPrivateFieldSet2(_executor$1, this, executor);
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
				executor: _classPrivateFieldGet2(_executor$1, this),
				node: CreateTableNode.create(parseTable(table))
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
				executor: _classPrivateFieldGet2(_executor$1, this),
				node: DropTableNode.create(parseTable(table))
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
				executor: _classPrivateFieldGet2(_executor$1, this),
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
				executor: _classPrivateFieldGet2(_executor$1, this),
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
				executor: _classPrivateFieldGet2(_executor$1, this),
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
				executor: _classPrivateFieldGet2(_executor$1, this),
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
				executor: _classPrivateFieldGet2(_executor$1, this),
				node: AlterTableNode.create(parseTable(table))
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
				executor: _classPrivateFieldGet2(_executor$1, this),
				node: CreateViewNode.create(viewName)
			});
		}
		/**
		* Refresh a materialized view.
		*
		* ### Examples
		*
		* ```ts
		* await db.schema
		*   .refreshMaterializedView('my_view')
		*   .concurrently()
		*   .execute()
		* ```
		*/
		refreshMaterializedView(viewName) {
			return new RefreshMaterializedViewBuilder({
				queryId: createQueryId(),
				executor: _classPrivateFieldGet2(_executor$1, this),
				node: RefreshMaterializedViewNode.create(viewName)
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
				executor: _classPrivateFieldGet2(_executor$1, this),
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
				executor: _classPrivateFieldGet2(_executor$1, this),
				node: CreateTypeNode.create(parseSchemableIdentifier(typeName))
			});
		}
		/**
		* Alter a type. Rename it, change schema or add/rename enum type values.
		*
		* Only some dialects like PostgreSQL have user-defined types.
		*
		* ```ts
		* await db.schema
		*   .alterType('species')
		*   .addValue('capybara')
		*   .execute()
		* ```
		*/
		alterType(name) {
			return new AlterTypeBuilder({
				executor: _classPrivateFieldGet2(_executor$1, this),
				node: AlterTypeNode.create(parseSchemableIdentifier(name)),
				queryId: createQueryId()
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
		*
		* You can also provide multiple type names:
		*
		* ```ts
		* await db.schema
		*   .dropType(['species', 'colors'])
		*   .ifExists()
		*   .cascade()
		*   .execute()
		* ```
		*/
		dropType(typeName) {
			return new DropTypeBuilder({
				queryId: createQueryId(),
				executor: _classPrivateFieldGet2(_executor$1, this),
				node: DropTypeNode.create(parseSchemableIdentifierArray(typeName))
			});
		}
		/**
		* Returns a copy of this schema module with the given plugin installed.
		*/
		withPlugin(plugin) {
			return new SchemaModule(_classPrivateFieldGet2(_executor$1, this).withPlugin(plugin));
		}
		/**
		* Returns a copy of this schema module  without any plugins.
		*/
		withoutPlugins() {
			return new SchemaModule(_classPrivateFieldGet2(_executor$1, this).withoutPlugins());
		}
		/**
		* See {@link QueryCreator.withSchema}
		*/
		withSchema(schema) {
			return new SchemaModule(_classPrivateFieldGet2(_executor$1, this).withPluginAtFront(new WithSchemaPlugin(schema)));
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dynamic/dynamic.js
var DynamicModule;
var init_dynamic = __esmMin((() => {
	init_dynamic_reference_builder();
	init_dynamic_table_builder();
	DynamicModule = class {
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
		/**
		* Creates a table reference to a table that's not fully known at compile time.
		*
		* The type `T` is allowed to be a union of multiple tables.
		*
		* <!-- siteExample("select", "Generic find query", 130) -->
		*
		* A generic type-safe helper function for finding a row by a column value:
		*
		* ```ts
		* import { SelectType } from 'kysely'
		* import { Database } from 'type-editor'
		*
		* async function getRowByColumn<
		*   T extends keyof Database,
		*   C extends keyof Database[T] & string,
		*   V extends SelectType<Database[T][C]>,
		* >(t: T, c: C, v: V) {
		*   // We need to use the dynamic module since the table name
		*   // is not known at compile time.
		*   const { table, ref } = db.dynamic
		*
		*   return await db
		*     .selectFrom(table(t).as('t'))
		*     .selectAll()
		*     .where(ref(c), '=', v)
		*     .orderBy('t.id')
		*     .executeTakeFirstOrThrow()
		* }
		*
		* const person = await getRowByColumn('person', 'first_name', 'Arnold')
		* ```
		*/
		table(table) {
			return new DynamicTableBuilder(table);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/driver/default-connection-provider.js
var _driver$1, DefaultConnectionProvider;
var init_default_connection_provider = __esmMin((() => {
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_driver$1 = /* @__PURE__ */ new WeakMap();
	DefaultConnectionProvider = class {
		constructor(driver) {
			_classPrivateFieldInitSpec(this, _driver$1, void 0);
			_classPrivateFieldSet2(_driver$1, this, driver);
		}
		async provideConnection(consumer, options) {
			const connection = await _classPrivateFieldGet2(_driver$1, this).acquireConnection(options);
			try {
				return await consumer(connection);
			} finally {
				await _classPrivateFieldGet2(_driver$1, this).releaseConnection(connection, options);
			}
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-executor/default-query-executor.js
var _compiler, _adapter, _connectionProvider, DefaultQueryExecutor;
var init_default_query_executor = __esmMin((() => {
	init_query_executor_base();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_compiler = /* @__PURE__ */ new WeakMap();
	_adapter = /* @__PURE__ */ new WeakMap();
	_connectionProvider = /* @__PURE__ */ new WeakMap();
	DefaultQueryExecutor = class DefaultQueryExecutor extends QueryExecutorBase {
		constructor(compiler, adapter, connectionProvider, plugins = []) {
			super(plugins);
			_classPrivateFieldInitSpec(this, _compiler, void 0);
			_classPrivateFieldInitSpec(this, _adapter, void 0);
			_classPrivateFieldInitSpec(this, _connectionProvider, void 0);
			_classPrivateFieldSet2(_compiler, this, compiler);
			_classPrivateFieldSet2(_adapter, this, adapter);
			_classPrivateFieldSet2(_connectionProvider, this, connectionProvider);
		}
		get adapter() {
			return _classPrivateFieldGet2(_adapter, this);
		}
		compileQuery(node, queryId) {
			return _classPrivateFieldGet2(_compiler, this).compileQuery(node, queryId);
		}
		provideConnection(consumer, options) {
			return _classPrivateFieldGet2(_connectionProvider, this).provideConnection(consumer, options);
		}
		withPlugins(plugins) {
			return new DefaultQueryExecutor(_classPrivateFieldGet2(_compiler, this), _classPrivateFieldGet2(_adapter, this), _classPrivateFieldGet2(_connectionProvider, this), [...this.plugins, ...plugins]);
		}
		withPlugin(plugin) {
			return new DefaultQueryExecutor(_classPrivateFieldGet2(_compiler, this), _classPrivateFieldGet2(_adapter, this), _classPrivateFieldGet2(_connectionProvider, this), [...this.plugins, plugin]);
		}
		withPluginAtFront(plugin) {
			return new DefaultQueryExecutor(_classPrivateFieldGet2(_compiler, this), _classPrivateFieldGet2(_adapter, this), _classPrivateFieldGet2(_connectionProvider, this), [plugin, ...this.plugins]);
		}
		withConnectionProvider(connectionProvider) {
			return new DefaultQueryExecutor(_classPrivateFieldGet2(_compiler, this), _classPrivateFieldGet2(_adapter, this), connectionProvider, [...this.plugins]);
		}
		withoutPlugins() {
			return new DefaultQueryExecutor(_classPrivateFieldGet2(_compiler, this), _classPrivateFieldGet2(_adapter, this), _classPrivateFieldGet2(_connectionProvider, this), []);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/performance-now.js
function performanceNow() {
	if (typeof performance !== "undefined" && isFunction(performance.now)) return performance.now();
	else return Date.now();
}
var init_performance_now = __esmMin((() => {
	init_object_utils();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/driver/connection-mutex.js
var _promise, _resolve, ConnectionMutex;
var init_connection_mutex = __esmMin((() => {
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldGet2();
	init_classPrivateFieldSet2();
	_promise = /* @__PURE__ */ new WeakMap();
	_resolve = /* @__PURE__ */ new WeakMap();
	ConnectionMutex = class {
		constructor() {
			_classPrivateFieldInitSpec(this, _promise, void 0);
			_classPrivateFieldInitSpec(this, _resolve, void 0);
		}
		async obtainLock() {
			while (_classPrivateFieldGet2(_promise, this)) await _classPrivateFieldGet2(_promise, this);
			_classPrivateFieldSet2(_promise, this, new Promise((resolve) => {
				_classPrivateFieldSet2(_resolve, this, resolve);
			}));
		}
		releaseLock() {
			const resolve = _classPrivateFieldGet2(_resolve, this);
			_classPrivateFieldSet2(_promise, this, void 0);
			_classPrivateFieldSet2(_resolve, this, void 0);
			resolve?.();
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/driver/runtime-driver.js
function _needsLogging() {
	return _classPrivateFieldGet2(_log, this).isLevelEnabled("query") || _classPrivateFieldGet2(_log, this).isLevelEnabled("error");
}
function _addLogging(connection) {
	const executeQuery = connection.executeQuery;
	const streamQuery = connection.streamQuery;
	const dis = this;
	connection.executeQuery = async (compiledQuery, options) => {
		let caughtError;
		const startTime = performanceNow();
		try {
			return await executeQuery.call(connection, compiledQuery, options);
		} catch (error) {
			caughtError = error;
			await _assertClassBrand(_RuntimeDriver_brand, dis, _logError).call(dis, error, compiledQuery, startTime);
			throw error;
		} finally {
			if (!caughtError) await _assertClassBrand(_RuntimeDriver_brand, dis, _logQuery).call(dis, compiledQuery, startTime);
		}
	};
	connection.streamQuery = async function* (compiledQuery, chunkSize, options) {
		let caughtError;
		const startTime = performanceNow();
		try {
			for await (const result of streamQuery.call(connection, compiledQuery, chunkSize, options)) yield result;
		} catch (error) {
			caughtError = error;
			await _assertClassBrand(_RuntimeDriver_brand, dis, _logError).call(dis, error, compiledQuery, startTime);
			throw error;
		} finally {
			if (!caughtError) await _assertClassBrand(_RuntimeDriver_brand, dis, _logQuery).call(dis, compiledQuery, startTime, true);
		}
	};
}
async function _logError(error, compiledQuery, startTime) {
	await _classPrivateFieldGet2(_log, this).error(() => ({
		level: "error",
		error,
		query: compiledQuery,
		queryDurationMillis: _assertClassBrand(_RuntimeDriver_brand, this, _calculateDurationMillis).call(this, startTime)
	}));
}
async function _logQuery(compiledQuery, startTime, isStream = false) {
	await _classPrivateFieldGet2(_log, this).query(() => ({
		level: "query",
		isStream,
		query: compiledQuery,
		queryDurationMillis: _assertClassBrand(_RuntimeDriver_brand, this, _calculateDurationMillis).call(this, startTime)
	}));
}
function _calculateDurationMillis(startTime) {
	return performanceNow() - startTime;
}
var _driver, _log, _initPromise, _initDone, _destroyPromise, _connections$2, _connectionMutex, _RuntimeDriver_brand, RuntimeDriver;
var init_runtime_driver = __esmMin((() => {
	init_abort();
	init_performance_now();
	init_connection_mutex();
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_assertClassBrand();
	_driver = /* @__PURE__ */ new WeakMap();
	_log = /* @__PURE__ */ new WeakMap();
	_initPromise = /* @__PURE__ */ new WeakMap();
	_initDone = /* @__PURE__ */ new WeakMap();
	_destroyPromise = /* @__PURE__ */ new WeakMap();
	_connections$2 = /* @__PURE__ */ new WeakMap();
	_connectionMutex = /* @__PURE__ */ new WeakMap();
	_RuntimeDriver_brand = /* @__PURE__ */ new WeakSet();
	RuntimeDriver = class {
		constructor(driver, adapter, log) {
			_classPrivateMethodInitSpec(this, _RuntimeDriver_brand);
			_classPrivateFieldInitSpec(this, _driver, void 0);
			_classPrivateFieldInitSpec(this, _log, void 0);
			_classPrivateFieldInitSpec(this, _initPromise, void 0);
			_classPrivateFieldInitSpec(this, _initDone, void 0);
			_classPrivateFieldInitSpec(this, _destroyPromise, void 0);
			_classPrivateFieldInitSpec(this, _connections$2, /* @__PURE__ */ new WeakSet());
			_classPrivateFieldInitSpec(this, _connectionMutex, void 0);
			_classPrivateFieldSet2(_driver, this, driver);
			_classPrivateFieldSet2(_initDone, this, false);
			_classPrivateFieldSet2(_log, this, log);
			if (adapter.supportsMultipleConnections === false) _classPrivateFieldSet2(_connectionMutex, this, new ConnectionMutex());
		}
		async init(options) {
			if (_classPrivateFieldGet2(_destroyPromise, this)) throw new Error("driver has already been destroyed");
			_classPrivateFieldGet2(_initPromise, this) ?? _classPrivateFieldSet2(_initPromise, this, _classPrivateFieldGet2(_driver, this).init(options).then(() => {
				_classPrivateFieldSet2(_initDone, this, true);
			}).catch((reason) => {
				_classPrivateFieldSet2(_initPromise, this, void 0);
				throw reason;
			}));
			await waitOrAbort(_classPrivateFieldGet2(_initPromise, this), options?.signal, "init");
		}
		async acquireConnection(options) {
			if (_classPrivateFieldGet2(_destroyPromise, this)) throw new Error("driver has already been destroyed");
			if (!_classPrivateFieldGet2(_initDone, this)) await this.init(options);
			if (_classPrivateFieldGet2(_connectionMutex, this)) {
				const lockPromise = _classPrivateFieldGet2(_connectionMutex, this).obtainLock();
				await waitOrAbort(lockPromise, options?.signal, "acquireConnection:mutex", () => lockPromise.then(() => _classPrivateFieldGet2(_connectionMutex, this)?.releaseLock()));
			}
			const connectionPromise = _classPrivateFieldGet2(_driver, this).acquireConnection(options);
			const connection = await waitOrAbort(connectionPromise, options?.signal, "acquireConnection:acquire", () => connectionPromise?.then((connection) => this.releaseConnection(connection).catch(printBackgroundFail("driver.releaseConnection"))).catch(printBackgroundFail("driver.acquireConnection")));
			if (!_classPrivateFieldGet2(_connections$2, this).has(connection)) {
				if (_assertClassBrand(_RuntimeDriver_brand, this, _needsLogging).call(this)) _assertClassBrand(_RuntimeDriver_brand, this, _addLogging).call(this, connection);
				_classPrivateFieldGet2(_connections$2, this).add(connection);
			}
			return connection;
		}
		async releaseConnection(connection, options) {
			await _classPrivateFieldGet2(_driver, this).releaseConnection(connection, options);
			_classPrivateFieldGet2(_connectionMutex, this)?.releaseLock();
		}
		async beginTransaction(connection, settings) {
			return await _classPrivateFieldGet2(_driver, this).beginTransaction(connection, settings);
		}
		async commitTransaction(connection) {
			return await _classPrivateFieldGet2(_driver, this).commitTransaction(connection);
		}
		async rollbackTransaction(connection) {
			return await _classPrivateFieldGet2(_driver, this).rollbackTransaction(connection);
		}
		async savepoint(connection, savepointName, compileQuery) {
			if (_classPrivateFieldGet2(_driver, this).savepoint) return await _classPrivateFieldGet2(_driver, this).savepoint(connection, savepointName, compileQuery);
			throw new Error("The `savepoint` method is not supported by this driver");
		}
		async rollbackToSavepoint(connection, savepointName, compileQuery) {
			if (_classPrivateFieldGet2(_driver, this).rollbackToSavepoint) return await _classPrivateFieldGet2(_driver, this).rollbackToSavepoint(connection, savepointName, compileQuery);
			throw new Error("The `rollbackToSavepoint` method is not supported by this driver");
		}
		async releaseSavepoint(connection, savepointName, compileQuery) {
			if (_classPrivateFieldGet2(_driver, this).releaseSavepoint) return await _classPrivateFieldGet2(_driver, this).releaseSavepoint(connection, savepointName, compileQuery);
			throw new Error("The `releaseSavepoint` method is not supported by this driver");
		}
		async destroy(options) {
			if (!_classPrivateFieldGet2(_initPromise, this)) return;
			await waitOrAbort(_classPrivateFieldGet2(_initPromise, this), options?.signal, "destroy:initPromise");
			_classPrivateFieldGet2(_destroyPromise, this) ?? _classPrivateFieldSet2(_destroyPromise, this, _classPrivateFieldGet2(_driver, this).destroy(options).catch((reason) => {
				_classPrivateFieldSet2(_destroyPromise, this, void 0);
				throw reason;
			}));
			await waitOrAbort(_classPrivateFieldGet2(_destroyPromise, this), options?.signal, "destroy");
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/driver/single-connection-provider.js
async function _run(runner) {
	return await runner(_classPrivateFieldGet2(_connection$4, this));
}
var ignoreError, _connection$4, _runningPromise, _SingleConnectionProvider_brand, SingleConnectionProvider;
var init_single_connection_provider = __esmMin((() => {
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_assertClassBrand();
	ignoreError = () => {};
	_connection$4 = /* @__PURE__ */ new WeakMap();
	_runningPromise = /* @__PURE__ */ new WeakMap();
	_SingleConnectionProvider_brand = /* @__PURE__ */ new WeakSet();
	SingleConnectionProvider = class {
		constructor(connection) {
			_classPrivateMethodInitSpec(this, _SingleConnectionProvider_brand);
			_classPrivateFieldInitSpec(this, _connection$4, void 0);
			_classPrivateFieldInitSpec(this, _runningPromise, void 0);
			_classPrivateFieldSet2(_connection$4, this, connection);
		}
		async provideConnection(consumer) {
			while (_classPrivateFieldGet2(_runningPromise, this)) await _classPrivateFieldGet2(_runningPromise, this).catch(ignoreError);
			_classPrivateFieldSet2(_runningPromise, this, _assertClassBrand(_SingleConnectionProvider_brand, this, _run).call(this, consumer).finally(() => {
				_classPrivateFieldSet2(_runningPromise, this, void 0);
			}));
			return _classPrivateFieldGet2(_runningPromise, this);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/driver/driver.js
function validateTransactionSettings(settings) {
	if (settings.accessMode && !TRANSACTION_ACCESS_MODES.includes(settings.accessMode)) throw new Error(`invalid transaction access mode ${settings.accessMode}`);
	if (settings.isolationLevel && !TRANSACTION_ISOLATION_LEVELS.includes(settings.isolationLevel)) throw new Error(`invalid transaction isolation level ${settings.isolationLevel}`);
}
var TRANSACTION_ACCESS_MODES, TRANSACTION_ISOLATION_LEVELS;
var init_driver = __esmMin((() => {
	TRANSACTION_ACCESS_MODES = ["read only", "read write"];
	TRANSACTION_ISOLATION_LEVELS = [
		"read uncommitted",
		"read committed",
		"repeatable read",
		"serializable",
		"snapshot"
	];
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/log.js
function defaultLogger(event) {
	if (event.level === "query") {
		const prefix = `kysely:query:${event.isStream ? "stream:" : ""}`;
		console.log(`${prefix} ${event.query.sql}`);
		console.log(`${prefix} duration: ${event.queryDurationMillis.toFixed(1)}ms`);
	} else if (event.level === "error") if (event.error instanceof Error) console.error(`kysely:error: ${event.error.stack ?? event.error.message}`);
	else console.error(`kysely:error: ${JSON.stringify({
		error: event.error,
		query: event.query.sql,
		queryDurationMillis: event.queryDurationMillis
	})}`);
}
var logLevels, LOG_LEVELS, _levels, _logger, Log;
var init_log = __esmMin((() => {
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	logLevels = ["query", "error"];
	LOG_LEVELS = freeze(logLevels);
	_levels = /* @__PURE__ */ new WeakMap();
	_logger = /* @__PURE__ */ new WeakMap();
	Log = class {
		constructor(config) {
			_classPrivateFieldInitSpec(this, _levels, void 0);
			_classPrivateFieldInitSpec(this, _logger, void 0);
			if (isFunction(config)) {
				_classPrivateFieldSet2(_logger, this, config);
				_classPrivateFieldSet2(_levels, this, freeze({
					query: true,
					error: true
				}));
			} else {
				_classPrivateFieldSet2(_logger, this, defaultLogger);
				_classPrivateFieldSet2(_levels, this, freeze({
					query: config.includes("query"),
					error: config.includes("error")
				}));
			}
		}
		isLevelEnabled(level) {
			return _classPrivateFieldGet2(_levels, this)[level];
		}
		async query(getEvent) {
			if (_classPrivateFieldGet2(_levels, this).query) await _classPrivateFieldGet2(_logger, this).call(this, getEvent());
		}
		async error(getEvent) {
			if (_classPrivateFieldGet2(_levels, this).error) await _classPrivateFieldGet2(_logger, this).call(this, getEvent());
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/compilable.js
function isCompilable(value) {
	return isObject(value) && isFunction(value.compile);
}
var init_compilable = __esmMin((() => {
	init_object_utils();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/kysely.js
function isKyselyProps(obj) {
	return isObject(obj) && isObject(obj.config) && isObject(obj.driver) && isObject(obj.executor) && isObject(obj.dialect);
}
function assertNotCommittedOrRolledBack(state) {
	if (state.isCommitted) throw new Error("Transaction is already committed");
	if (state.isRolledBack) throw new Error("Transaction is already rolled back");
}
var _Symbol, _Symbol$asyncDispose, _props$1, Kysely, _props2, Transaction, _props3, ConnectionBuilder, _props4, TransactionBuilder, _props5, ControlledTransactionBuilder, _props6, _compileQuery, _state, ControlledTransaction, _cb, Command, _executor, _state2, NotCommittedOrRolledBackAssertingExecutor;
var init_kysely = __esmMin((() => {
	init_schema_module();
	init_dynamic();
	init_default_connection_provider();
	init_query_creator();
	init_default_query_executor();
	init_object_utils();
	init_runtime_driver();
	init_single_connection_provider();
	init_driver();
	init_function_module();
	init_log();
	init_query_id();
	init_compilable();
	init_case_builder();
	init_case_node();
	init_expression_parser();
	init_with_schema_plugin();
	init_provide_controlled_connection();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	(_Symbol = Symbol).asyncDispose ?? (_Symbol.asyncDispose = Symbol("Symbol.asyncDispose"));
	_props$1 = /* @__PURE__ */ new WeakMap();
	_Symbol$asyncDispose = Symbol.asyncDispose;
	Kysely = class Kysely extends QueryCreator {
		constructor(args) {
			let superProps;
			let props;
			if (isKyselyProps(args)) {
				superProps = { executor: args.executor };
				props = { ...args };
			} else {
				const dialect = args.dialect;
				const driver = dialect.createDriver();
				const compiler = dialect.createQueryCompiler();
				const adapter = dialect.createAdapter();
				const runtimeDriver = new RuntimeDriver(driver, adapter, new Log(args.log ?? []));
				const executor = new DefaultQueryExecutor(compiler, adapter, new DefaultConnectionProvider(runtimeDriver), args.plugins ?? []);
				superProps = { executor };
				props = {
					config: args,
					executor,
					dialect,
					driver: runtimeDriver
				};
			}
			super(superProps);
			_classPrivateFieldInitSpec(this, _props$1, void 0);
			_classPrivateFieldSet2(_props$1, this, freeze(props));
		}
		/**
		* Returns the {@link SchemaModule} module for building database schema.
		*/
		get schema() {
			return new SchemaModule(_classPrivateFieldGet2(_props$1, this).executor);
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
			return _classPrivateFieldGet2(_props$1, this).dialect.createIntrospector(this.withoutPlugins());
		}
		case(value) {
			return new CaseBuilder({ node: CaseNode.create(isUndefined(value) ? void 0 : parseExpression(value)) });
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
		* To run a controlled transaction, allowing you to commit and rollback manually,
		* use {@link startTransaction} instead.
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
			return new TransactionBuilder({ ..._classPrivateFieldGet2(_props$1, this) });
		}
		/**
		* Creates a {@link ControlledTransactionBuilder} that can be used to run queries inside a controlled transaction.
		*
		* The returned {@link ControlledTransactionBuilder} can be used to configure the transaction.
		* The {@link ControlledTransactionBuilder.execute} method can then be called
		* to start the transaction and return a {@link ControlledTransaction}.
		*
		* A {@link ControlledTransaction} allows you to commit and rollback manually,
		* execute savepoint commands. It extends {@link Transaction} which extends {@link Kysely},
		* so you can run queries inside the transaction. Once the transaction is committed,
		* or rolled back, it can't be used anymore - all queries will throw an error.
		* This is to prevent accidentally running queries outside the transaction - where
		* atomicity is not guaranteed anymore.
		*
		* ### Examples
		*
		* <!-- siteExample("transactions", "Controlled transaction", 11) -->
		*
		* A controlled transaction allows you to commit and rollback manually, execute
		* savepoint commands, and queries in general.
		*
		* In this example we start a transaction, use it to insert two rows and then commit
		* the transaction. If an error is thrown, we catch it and rollback the transaction.
		*
		* ```ts
		* const trx = await db.startTransaction().execute()
		*
		* try {
		*   const jennifer = await trx.insertInto('person')
		*     .values({
		*       first_name: 'Jennifer',
		*       last_name: 'Aniston',
		*       age: 40,
		*     })
		*     .returning('id')
		*     .executeTakeFirstOrThrow()
		*
		*   const catto = await trx.insertInto('pet')
		*     .values({
		*       owner_id: jennifer.id,
		*       name: 'Catto',
		*       species: 'cat',
		*       is_favorite: false,
		*     })
		*     .returningAll()
		*     .executeTakeFirstOrThrow()
		*
		*   await trx.commit().execute()
		*
		*   // ...
		* } catch (error) {
		*   await trx.rollback().execute()
		* }
		* ```
		*
		* <!-- siteExample("transactions", "Controlled transaction /w savepoints", 12) -->
		*
		* A controlled transaction allows you to commit and rollback manually, execute
		* savepoint commands, and queries in general.
		*
		* In this example we start a transaction, insert a person, create a savepoint,
		* try inserting a toy and a pet, and if an error is thrown, we rollback to the
		* savepoint. Eventually we release the savepoint, insert an audit record and
		* commit the transaction. If an error is thrown, we catch it and rollback the
		* transaction.
		*
		* ```ts
		* const trx = await db.startTransaction().execute()
		*
		* try {
		*   const jennifer = await trx
		*     .insertInto('person')
		*     .values({
		*       first_name: 'Jennifer',
		*       last_name: 'Aniston',
		*       age: 40,
		*     })
		*     .returning('id')
		*     .executeTakeFirstOrThrow()
		*
		*   const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
		*
		*   try {
		*     const catto = await trxAfterJennifer
		*       .insertInto('pet')
		*       .values({
		*         owner_id: jennifer.id,
		*         name: 'Catto',
		*         species: 'cat',
		*       })
		*       .returning('id')
		*       .executeTakeFirstOrThrow()
		*
		*     await trxAfterJennifer
		*       .insertInto('toy')
		*       .values({ name: 'Bone', price: 1.99, pet_id: catto.id })
		*       .execute()
		*   } catch (error) {
		*     await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
		*   }
		*
		*   await trxAfterJennifer.releaseSavepoint('after_jennifer').execute()
		*
		*   await trx.insertInto('audit').values({ action: 'added Jennifer' }).execute()
		*
		*   await trx.commit().execute()
		* } catch (error) {
		*   await trx.rollback().execute()
		* }
		* ```
		*/
		startTransaction() {
			return new ControlledTransactionBuilder({ ..._classPrivateFieldGet2(_props$1, this) });
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
			return new ConnectionBuilder({ ..._classPrivateFieldGet2(_props$1, this) });
		}
		/**
		* Returns a copy of this Kysely instance with the given plugin installed.
		*/
		withPlugin(plugin) {
			return new Kysely({
				..._classPrivateFieldGet2(_props$1, this),
				executor: _classPrivateFieldGet2(_props$1, this).executor.withPlugin(plugin)
			});
		}
		/**
		* Returns a copy of this Kysely instance without any plugins.
		*/
		withoutPlugins() {
			return new Kysely({
				..._classPrivateFieldGet2(_props$1, this),
				executor: _classPrivateFieldGet2(_props$1, this).executor.withoutPlugins()
			});
		}
		/**
		* @override
		*/
		withSchema(schema) {
			return new Kysely({
				..._classPrivateFieldGet2(_props$1, this),
				executor: _classPrivateFieldGet2(_props$1, this).executor.withPluginAtFront(new WithSchemaPlugin(schema))
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
		* const tempDb = db.$extendTables<{
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
		$extendTables() {
			return new Kysely({ ..._classPrivateFieldGet2(_props$1, this) });
		}
		/**
		* Returns a copy of this Kysely instance without the given tables (provided as
		* a union type of table names).
		*
		* This method only modifies the types and doesn't affect any of the executed
		* queries in any way.
		*
		* See also {@link $pickTables} and {@link $extendTables}.
		*
		* ### Examples
		*
		* The following example omits tables not used in the downstream query. This
		* can help with compile-time performance as downstream checks and calculations
		* work against a smaller scope of the database - less tables and columns.
		*
		* Don't optimize prematurely! Build your queries first, measure later. If you
		* realize the query has a noticeable impact on compilation - try the helper.
		*
		* ```ts
		* const results = await db
		*   .$omitTables<'toy'>()
		*   .selectFrom('person')
		*   .innerJoin('pet', 'pet.owner_id', 'person.id')
		*   .selectAll()
		*   .execute()
		* ```
		*
		* The query is arguably less readable now, and changing it is less obvious -
		* e.g. adding another table.
		*/
		$omitTables() {
			return new Kysely({ ..._classPrivateFieldGet2(_props$1, this) });
		}
		/**
		* Returns a copy of this Kysely instance with just the given tables (provided as
		* a union type of table names).
		*
		* This method only modifies the types and doesn't affect any of the executed
		* queries in any way.
		*
		* See also {@link $omitTables} and {@link $extendTables}.
		*
		* ### Examples
		*
		* The following example picks the tables used in the downstream query. This
		* can help with compile-time performance as downstream checks and calculations
		* work against a smaller scope of the database - less tables and columns.
		*
		* Don't optimize prematurely! Build your queries first, measure later. If you
		* realize the query has a noticeable impact on compilation - try the helper.
		*
		* ```ts
		* const results = await db
		*   .$pickTables<'person' | 'pet'>()
		*   .selectFrom('person')
		*   .innerJoin('pet', 'pet.owner_id', 'person.id')
		*   .selectAll()
		*   .execute()
		* ```
		*
		* The query is arguably less readable now, and changing it is less obvious -
		* e.g. adding another table.
		*/
		$pickTables() {
			return new Kysely({ ..._classPrivateFieldGet2(_props$1, this) });
		}
		/**
		* @deprecated use {@link $extendTables} instead.
		*/
		withTables() {
			return this.$extendTables();
		}
		/**
		* Releases all resources and disconnects from the database.
		*
		* You need to call this when you are done using the `Kysely` instance.
		*/
		async destroy() {
			await _classPrivateFieldGet2(_props$1, this).driver.destroy();
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
			return _classPrivateFieldGet2(_props$1, this).executor;
		}
		/**
		* Executes a given compiled query or query builder.
		*
		* See {@link https://github.com/kysely-org/kysely/blob/master/site/docs/recipes/0004-splitting-query-building-and-execution.md#execute-compiled-queries splitting build, compile and execute code recipe} for more information.
		*/
		async executeQuery(query, options) {
			const compiledQuery = isCompilable(query) ? query.compile() : query;
			return await _classPrivateFieldGet2(_props$1, this).executor.executeQuery(compiledQuery, options);
		}
		async [_Symbol$asyncDispose]() {
			await this.destroy();
		}
	};
	_props2 = /* @__PURE__ */ new WeakMap();
	Transaction = class Transaction extends Kysely {
		constructor(props) {
			super(props);
			_classPrivateFieldInitSpec(this, _props2, void 0);
			_classPrivateFieldSet2(_props2, this, props);
		}
		get isTransaction() {
			return true;
		}
		/**
		* @deprecated calling the transaction method for a Transaction is not supported
		*/
		transaction() {
			throw new Error("calling the transaction method for a Transaction is not supported");
		}
		/**
		* @deprecated calling the controlled transaction method for a Transaction is not supported
		*/
		startTransaction() {
			throw new Error("calling the controlled transaction method for a Transaction is not supported");
		}
		/**
		* @deprecated calling the connection method for a Transaction is not supported
		*/
		connection() {
			throw new Error("calling the connection method for a Transaction is not supported");
		}
		/**
		* @deprecated calling the destroy method for a Transaction is not supported
		*/
		destroy() {
			throw new Error("calling the destroy method for a Transaction is not supported");
		}
		/**
		* Similar to {@link Kysely.withPlugin} but returns the transaction.
		*/
		withPlugin(plugin) {
			return new Transaction({
				..._classPrivateFieldGet2(_props2, this),
				executor: _classPrivateFieldGet2(_props2, this).executor.withPlugin(plugin)
			});
		}
		/**
		* Similar to {@link Kysely.withoutPlugins} but returns the transaction.
		*/
		withoutPlugins() {
			return new Transaction({
				..._classPrivateFieldGet2(_props2, this),
				executor: _classPrivateFieldGet2(_props2, this).executor.withoutPlugins()
			});
		}
		/**
		* Similar to {@link Kysely.withSchema} but returns the transaction.
		*/
		withSchema(schema) {
			return new Transaction({
				..._classPrivateFieldGet2(_props2, this),
				executor: _classPrivateFieldGet2(_props2, this).executor.withPluginAtFront(new WithSchemaPlugin(schema))
			});
		}
		/**
		* Similar to {@link Kysely.withTables} but returns the transaction.
		*
		* @deprecated use {@link $extendTables} instead.
		*/
		withTables() {
			return new Transaction({ ..._classPrivateFieldGet2(_props2, this) });
		}
		/**
		* Similar to {@link Kysely.$extendTables} but returns the transaction.
		*/
		$extendTables() {
			return new Transaction({ ..._classPrivateFieldGet2(_props2, this) });
		}
		/**
		* Similar to {@link Kysely.$omitTables} but returns the transaction.
		*/
		$omitTables() {
			return new Transaction({ ..._classPrivateFieldGet2(_props2, this) });
		}
		/**
		* Similar to {@link Kysely.$pickTables} but returns the transaction.
		*/
		$pickTables() {
			return new Transaction({ ..._classPrivateFieldGet2(_props2, this) });
		}
	};
	_props3 = /* @__PURE__ */ new WeakMap();
	ConnectionBuilder = class {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props3, void 0);
			_classPrivateFieldSet2(_props3, this, freeze(props));
		}
		async execute(callback, options) {
			return _classPrivateFieldGet2(_props3, this).executor.provideConnection(async (connection) => {
				const executor = _classPrivateFieldGet2(_props3, this).executor.withConnectionProvider(new SingleConnectionProvider(connection));
				return await callback(new Kysely({
					..._classPrivateFieldGet2(_props3, this),
					executor
				}));
			}, freeze({ signal: options?.signal }));
		}
	};
	_props4 = /* @__PURE__ */ new WeakMap();
	TransactionBuilder = class TransactionBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props4, void 0);
			_classPrivateFieldSet2(_props4, this, freeze(props));
		}
		setAccessMode(accessMode) {
			return new TransactionBuilder({
				..._classPrivateFieldGet2(_props4, this),
				accessMode
			});
		}
		setIsolationLevel(isolationLevel) {
			return new TransactionBuilder({
				..._classPrivateFieldGet2(_props4, this),
				isolationLevel
			});
		}
		async execute(callback) {
			const { isolationLevel, accessMode, ...kyselyProps } = _classPrivateFieldGet2(_props4, this);
			const settings = {
				isolationLevel,
				accessMode
			};
			validateTransactionSettings(settings);
			return _classPrivateFieldGet2(_props4, this).executor.provideConnection(async (connection) => {
				const state = {
					isCommitted: false,
					isRolledBack: false
				};
				const executor = new NotCommittedOrRolledBackAssertingExecutor(_classPrivateFieldGet2(_props4, this).executor.withConnectionProvider(new SingleConnectionProvider(connection)), state);
				const transaction = new Transaction({
					...kyselyProps,
					executor
				});
				let transactionBegun = false;
				try {
					await _classPrivateFieldGet2(_props4, this).driver.beginTransaction(connection, settings);
					transactionBegun = true;
					const result = await callback(transaction);
					await _classPrivateFieldGet2(_props4, this).driver.commitTransaction(connection);
					state.isCommitted = true;
					return result;
				} catch (error) {
					if (transactionBegun) {
						await _classPrivateFieldGet2(_props4, this).driver.rollbackTransaction(connection);
						state.isRolledBack = true;
					}
					throw error;
				}
			});
		}
	};
	_props5 = /* @__PURE__ */ new WeakMap();
	ControlledTransactionBuilder = class ControlledTransactionBuilder {
		constructor(props) {
			_classPrivateFieldInitSpec(this, _props5, void 0);
			_classPrivateFieldSet2(_props5, this, freeze(props));
		}
		setAccessMode(accessMode) {
			return new ControlledTransactionBuilder({
				..._classPrivateFieldGet2(_props5, this),
				accessMode
			});
		}
		setIsolationLevel(isolationLevel) {
			return new ControlledTransactionBuilder({
				..._classPrivateFieldGet2(_props5, this),
				isolationLevel
			});
		}
		async execute() {
			const { isolationLevel, accessMode, ...props } = _classPrivateFieldGet2(_props5, this);
			const settings = {
				isolationLevel,
				accessMode
			};
			validateTransactionSettings(settings);
			const connection = await provideControlledConnection(_classPrivateFieldGet2(_props5, this).executor);
			await _classPrivateFieldGet2(_props5, this).driver.beginTransaction(connection.connection, settings);
			return new ControlledTransaction({
				...props,
				connection,
				executor: _classPrivateFieldGet2(_props5, this).executor.withConnectionProvider(new SingleConnectionProvider(connection.connection))
			});
		}
	};
	_props6 = /* @__PURE__ */ new WeakMap();
	_compileQuery = /* @__PURE__ */ new WeakMap();
	_state = /* @__PURE__ */ new WeakMap();
	ControlledTransaction = class ControlledTransaction extends Transaction {
		constructor(props) {
			const state = {
				isCommitted: false,
				isRolledBack: false
			};
			props = {
				...props,
				executor: new NotCommittedOrRolledBackAssertingExecutor(props.executor, state)
			};
			const { connection, ...transactionProps } = props;
			super(transactionProps);
			_classPrivateFieldInitSpec(this, _props6, void 0);
			_classPrivateFieldInitSpec(this, _compileQuery, void 0);
			_classPrivateFieldInitSpec(this, _state, void 0);
			_classPrivateFieldSet2(_props6, this, freeze(props));
			_classPrivateFieldSet2(_state, this, state);
			const queryId = createQueryId();
			_classPrivateFieldSet2(_compileQuery, this, (node) => props.executor.compileQuery(node, queryId));
		}
		get isCommitted() {
			return _classPrivateFieldGet2(_state, this).isCommitted;
		}
		get isRolledBack() {
			return _classPrivateFieldGet2(_state, this).isRolledBack;
		}
		/**
		* Commits the transaction.
		*
		* See {@link rollback}.
		*
		* ### Examples
		*
		* ```ts
		* import type { Kysely } from 'kysely'
		* import type { Database } from 'type-editor' // imaginary module
		*
		* const trx = await db.startTransaction().execute()
		*
		* try {
		*   await doSomething(trx)
		*
		*   await trx.commit().execute()
		* } catch (error) {
		*   await trx.rollback().execute()
		* }
		*
		* async function doSomething(kysely: Kysely<Database>) {}
		* ```
		*/
		commit() {
			assertNotCommittedOrRolledBack(_classPrivateFieldGet2(_state, this));
			return new Command(async () => {
				await _classPrivateFieldGet2(_props6, this).driver.commitTransaction(_classPrivateFieldGet2(_props6, this).connection.connection);
				_classPrivateFieldGet2(_state, this).isCommitted = true;
				_classPrivateFieldGet2(_props6, this).connection.release();
			});
		}
		/**
		* Rolls back the transaction.
		*
		* See {@link commit} and {@link rollbackToSavepoint}.
		*
		* ### Examples
		*
		* ```ts
		* import type { Kysely } from 'kysely'
		* import type { Database } from 'type-editor' // imaginary module
		*
		* const trx = await db.startTransaction().execute()
		*
		* try {
		*   await doSomething(trx)
		*
		*   await trx.commit().execute()
		* } catch (error) {
		*   await trx.rollback().execute()
		* }
		*
		* async function doSomething(kysely: Kysely<Database>) {}
		* ```
		*/
		rollback() {
			assertNotCommittedOrRolledBack(_classPrivateFieldGet2(_state, this));
			return new Command(async () => {
				await _classPrivateFieldGet2(_props6, this).driver.rollbackTransaction(_classPrivateFieldGet2(_props6, this).connection.connection);
				_classPrivateFieldGet2(_state, this).isRolledBack = true;
				_classPrivateFieldGet2(_props6, this).connection.release();
			});
		}
		/**
		* Creates a savepoint with a given name.
		*
		* See {@link rollbackToSavepoint} and {@link releaseSavepoint}.
		*
		* For a type-safe experience, you should use the returned instance from now on.
		*
		* ### Examples
		*
		* ```ts
		* import type { Kysely } from 'kysely'
		* import type { Database } from 'type-editor' // imaginary module
		*
		* const trx = await db.startTransaction().execute()
		*
		* await insertJennifer(trx)
		*
		* const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
		*
		* try {
		*   await doSomething(trxAfterJennifer)
		* } catch (error) {
		*   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
		* }
		*
		* async function insertJennifer(kysely: Kysely<Database>) {}
		* async function doSomething(kysely: Kysely<Database>) {}
		* ```
		*/
		savepoint(savepointName) {
			assertNotCommittedOrRolledBack(_classPrivateFieldGet2(_state, this));
			return new Command(async () => {
				await _classPrivateFieldGet2(_props6, this).driver.savepoint?.(_classPrivateFieldGet2(_props6, this).connection.connection, savepointName, _classPrivateFieldGet2(_compileQuery, this));
				return new ControlledTransaction({ ..._classPrivateFieldGet2(_props6, this) });
			});
		}
		/**
		* Rolls back to a savepoint with a given name.
		*
		* See {@link savepoint} and {@link releaseSavepoint}.
		*
		* You must use the same instance returned by {@link savepoint}, or
		* escape the type-check by using `as any`.
		*
		* ### Examples
		*
		* ```ts
		* import type { Kysely } from 'kysely'
		* import type { Database } from 'type-editor' // imaginary module
		*
		* const trx = await db.startTransaction().execute()
		*
		* await insertJennifer(trx)
		*
		* const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
		*
		* try {
		*   await doSomething(trxAfterJennifer)
		* } catch (error) {
		*   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
		* }
		*
		* async function insertJennifer(kysely: Kysely<Database>) {}
		* async function doSomething(kysely: Kysely<Database>) {}
		* ```
		*/
		rollbackToSavepoint(savepointName) {
			assertNotCommittedOrRolledBack(_classPrivateFieldGet2(_state, this));
			return new Command(async () => {
				await _classPrivateFieldGet2(_props6, this).driver.rollbackToSavepoint?.(_classPrivateFieldGet2(_props6, this).connection.connection, savepointName, _classPrivateFieldGet2(_compileQuery, this));
				return new ControlledTransaction({ ..._classPrivateFieldGet2(_props6, this) });
			});
		}
		/**
		* Releases a savepoint with a given name.
		*
		* See {@link savepoint} and {@link rollbackToSavepoint}.
		*
		* You must use the same instance returned by {@link savepoint}, or
		* escape the type-check by using `as any`.
		*
		* ### Examples
		*
		* ```ts
		* import type { Kysely } from 'kysely'
		* import type { Database } from 'type-editor' // imaginary module
		*
		* const trx = await db.startTransaction().execute()
		*
		* await insertJennifer(trx)
		*
		* const trxAfterJennifer = await trx.savepoint('after_jennifer').execute()
		*
		* try {
		*   await doSomething(trxAfterJennifer)
		* } catch (error) {
		*   await trxAfterJennifer.rollbackToSavepoint('after_jennifer').execute()
		* }
		*
		* await trxAfterJennifer.releaseSavepoint('after_jennifer').execute()
		*
		* await doSomethingElse(trx)
		*
		* async function insertJennifer(kysely: Kysely<Database>) {}
		* async function doSomething(kysely: Kysely<Database>) {}
		* async function doSomethingElse(kysely: Kysely<Database>) {}
		* ```
		*/
		releaseSavepoint(savepointName) {
			assertNotCommittedOrRolledBack(_classPrivateFieldGet2(_state, this));
			return new Command(async () => {
				await _classPrivateFieldGet2(_props6, this).driver.releaseSavepoint?.(_classPrivateFieldGet2(_props6, this).connection.connection, savepointName, _classPrivateFieldGet2(_compileQuery, this));
				return new ControlledTransaction({ ..._classPrivateFieldGet2(_props6, this) });
			});
		}
		withPlugin(plugin) {
			return new ControlledTransaction({
				..._classPrivateFieldGet2(_props6, this),
				executor: _classPrivateFieldGet2(_props6, this).executor.withPlugin(plugin)
			});
		}
		withoutPlugins() {
			return new ControlledTransaction({
				..._classPrivateFieldGet2(_props6, this),
				executor: _classPrivateFieldGet2(_props6, this).executor.withoutPlugins()
			});
		}
		withSchema(schema) {
			return new ControlledTransaction({
				..._classPrivateFieldGet2(_props6, this),
				executor: _classPrivateFieldGet2(_props6, this).executor.withPluginAtFront(new WithSchemaPlugin(schema))
			});
		}
		withTables() {
			return new ControlledTransaction({ ..._classPrivateFieldGet2(_props6, this) });
		}
		$extendTables() {
			return new ControlledTransaction({ ..._classPrivateFieldGet2(_props6, this) });
		}
		$omitTables() {
			return new ControlledTransaction({ ..._classPrivateFieldGet2(_props6, this) });
		}
		$pickTables() {
			return new ControlledTransaction({ ..._classPrivateFieldGet2(_props6, this) });
		}
	};
	_cb = /* @__PURE__ */ new WeakMap();
	Command = class {
		constructor(cb) {
			_classPrivateFieldInitSpec(this, _cb, void 0);
			_classPrivateFieldSet2(_cb, this, cb);
		}
		/**
		* Executes the command.
		*/
		async execute() {
			return await _classPrivateFieldGet2(_cb, this).call(this);
		}
	};
	_executor = /* @__PURE__ */ new WeakMap();
	_state2 = /* @__PURE__ */ new WeakMap();
	NotCommittedOrRolledBackAssertingExecutor = class NotCommittedOrRolledBackAssertingExecutor {
		constructor(executor, state) {
			_classPrivateFieldInitSpec(this, _executor, void 0);
			_classPrivateFieldInitSpec(this, _state2, void 0);
			_classPrivateFieldSet2(_executor, this, executor instanceof NotCommittedOrRolledBackAssertingExecutor ? _classPrivateFieldGet2(_executor, executor) : executor);
			_classPrivateFieldSet2(_state2, this, state);
		}
		get adapter() {
			return _classPrivateFieldGet2(_executor, this).adapter;
		}
		get plugins() {
			return _classPrivateFieldGet2(_executor, this).plugins;
		}
		transformQuery(node, queryId) {
			return _classPrivateFieldGet2(_executor, this).transformQuery(node, queryId);
		}
		compileQuery(node, queryId) {
			return _classPrivateFieldGet2(_executor, this).compileQuery(node, queryId);
		}
		provideConnection(consumer, options) {
			return _classPrivateFieldGet2(_executor, this).provideConnection(consumer, options);
		}
		executeQuery(compiledQuery, options) {
			assertNotCommittedOrRolledBack(_classPrivateFieldGet2(_state2, this));
			return _classPrivateFieldGet2(_executor, this).executeQuery(compiledQuery, options);
		}
		stream(compiledQuery, chunkSize, options) {
			assertNotCommittedOrRolledBack(_classPrivateFieldGet2(_state2, this));
			return _classPrivateFieldGet2(_executor, this).stream(compiledQuery, chunkSize, options);
		}
		withConnectionProvider(connectionProvider) {
			return new NotCommittedOrRolledBackAssertingExecutor(_classPrivateFieldGet2(_executor, this).withConnectionProvider(connectionProvider), _classPrivateFieldGet2(_state2, this));
		}
		withPlugin(plugin) {
			return new NotCommittedOrRolledBackAssertingExecutor(_classPrivateFieldGet2(_executor, this).withPlugin(plugin), _classPrivateFieldGet2(_state2, this));
		}
		withPlugins(plugins) {
			return new NotCommittedOrRolledBackAssertingExecutor(_classPrivateFieldGet2(_executor, this).withPlugins(plugins), _classPrivateFieldGet2(_state2, this));
		}
		withPluginAtFront(plugin) {
			return new NotCommittedOrRolledBackAssertingExecutor(_classPrivateFieldGet2(_executor, this).withPluginAtFront(plugin), _classPrivateFieldGet2(_state2, this));
		}
		withoutPlugins() {
			return new NotCommittedOrRolledBackAssertingExecutor(_classPrivateFieldGet2(_executor, this).withoutPlugins(), _classPrivateFieldGet2(_state2, this));
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/raw-builder/raw-builder.js
function _getExecutor(executorProvider) {
	const executor = executorProvider !== void 0 ? executorProvider.getExecutor() : NOOP_QUERY_EXECUTOR;
	return _classPrivateFieldGet2(_props, this).plugins !== void 0 ? executor.withPlugins(_classPrivateFieldGet2(_props, this).plugins) : executor;
}
function _toOperationNode(executor) {
	return executor.transformQuery(_classPrivateFieldGet2(_props, this).rawNode, _classPrivateFieldGet2(_props, this).queryId);
}
function _compile(executor) {
	return executor.compileQuery(_assertClassBrand(_RawBuilderImpl_brand, this, _toOperationNode).call(this, executor), _classPrivateFieldGet2(_props, this).queryId);
}
function createRawBuilder(props) {
	return new RawBuilderImpl(props);
}
var _props, _RawBuilderImpl_brand, RawBuilderImpl, _rawBuilder, _alias, AliasedRawBuilderImpl;
var init_raw_builder = __esmMin((() => {
	init_alias_node();
	init_object_utils();
	init_noop_query_executor();
	init_identifier_node();
	init_operation_node_source();
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_assertClassBrand();
	_props = /* @__PURE__ */ new WeakMap();
	_RawBuilderImpl_brand = /* @__PURE__ */ new WeakSet();
	RawBuilderImpl = class RawBuilderImpl {
		constructor(props) {
			_classPrivateMethodInitSpec(this, _RawBuilderImpl_brand);
			_classPrivateFieldInitSpec(this, _props, void 0);
			_classPrivateFieldSet2(_props, this, freeze(props));
		}
		get expressionType() {}
		get isRawBuilder() {
			return true;
		}
		as(alias) {
			return new AliasedRawBuilderImpl(this, alias);
		}
		$castTo() {
			return new RawBuilderImpl({ ..._classPrivateFieldGet2(_props, this) });
		}
		$notNull() {
			return new RawBuilderImpl(_classPrivateFieldGet2(_props, this));
		}
		withPlugin(plugin) {
			return new RawBuilderImpl({
				..._classPrivateFieldGet2(_props, this),
				plugins: _classPrivateFieldGet2(_props, this).plugins !== void 0 ? freeze([..._classPrivateFieldGet2(_props, this).plugins, plugin]) : freeze([plugin])
			});
		}
		toOperationNode() {
			return _assertClassBrand(_RawBuilderImpl_brand, this, _toOperationNode).call(this, _assertClassBrand(_RawBuilderImpl_brand, this, _getExecutor).call(this));
		}
		compile(executorProvider) {
			return _assertClassBrand(_RawBuilderImpl_brand, this, _compile).call(this, _assertClassBrand(_RawBuilderImpl_brand, this, _getExecutor).call(this, executorProvider));
		}
		async execute(executorProvider, options) {
			const executor = _assertClassBrand(_RawBuilderImpl_brand, this, _getExecutor).call(this, executorProvider);
			return executor.executeQuery(_assertClassBrand(_RawBuilderImpl_brand, this, _compile).call(this, executor), options);
		}
	};
	_rawBuilder = /* @__PURE__ */ new WeakMap();
	_alias = /* @__PURE__ */ new WeakMap();
	AliasedRawBuilderImpl = class {
		constructor(rawBuilder, alias) {
			_classPrivateFieldInitSpec(this, _rawBuilder, void 0);
			_classPrivateFieldInitSpec(this, _alias, void 0);
			_classPrivateFieldSet2(_rawBuilder, this, rawBuilder);
			_classPrivateFieldSet2(_alias, this, alias);
		}
		get expression() {
			return _classPrivateFieldGet2(_rawBuilder, this);
		}
		get alias() {
			return _classPrivateFieldGet2(_alias, this);
		}
		get rawBuilder() {
			return _classPrivateFieldGet2(_rawBuilder, this);
		}
		toOperationNode() {
			return AliasNode.create(_classPrivateFieldGet2(_rawBuilder, this).toOperationNode(), isOperationNodeSource(_classPrivateFieldGet2(_alias, this)) ? _classPrivateFieldGet2(_alias, this).toOperationNode() : IdentifierNode.create(_classPrivateFieldGet2(_alias, this)));
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/raw-builder/sql.js
function parseParameter(param) {
	if (isOperationNodeSource(param)) return param.toOperationNode();
	return parseValueExpression(param);
}
var sql;
var init_sql = __esmMin((() => {
	init_identifier_node();
	init_operation_node_source();
	init_raw_node();
	init_value_node();
	init_reference_parser();
	init_table_parser();
	init_value_parser();
	init_query_id();
	init_raw_builder();
	sql = Object.assign((sqlFragments, ...parameters) => {
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
		table(tableReference) {
			return createRawBuilder({
				queryId: createQueryId(),
				rawNode: RawNode.createWithChild(parseTable(tableReference))
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
		raw(sql) {
			return createRawBuilder({
				queryId: createQueryId(),
				rawNode: RawNode.createWithSql(sql)
			});
		},
		join(array, separator = sql`, `) {
			const nodes = new Array(Math.max(2 * array.length - 1, 0));
			const sep = separator.toOperationNode();
			for (let i = 0; i < array.length; ++i) {
				nodes[2 * i] = parseParameter(array[i]);
				if (i !== array.length - 1) nodes[2 * i + 1] = sep;
			}
			return createRawBuilder({
				queryId: createQueryId(),
				rawNode: RawNode.createWithChildren(nodes)
			});
		}
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/operation-node-visitor.js
var _visitors, OperationNodeVisitor;
var init_operation_node_visitor = __esmMin((() => {
	init_object_utils();
	init_defineProperty();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldGet2();
	_visitors = /* @__PURE__ */ new WeakMap();
	OperationNodeVisitor = class {
		constructor() {
			_defineProperty(this, "nodeStack", []);
			_classPrivateFieldInitSpec(this, _visitors, freeze({
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
				RenameConstraintNode: this.visitRenameConstraint.bind(this),
				ForeignKeyConstraintNode: this.visitForeignKeyConstraint.bind(this),
				CreateViewNode: this.visitCreateView.bind(this),
				RefreshMaterializedViewNode: this.visitRefreshMaterializedView.bind(this),
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
				OutputNode: this.visitOutput.bind(this),
				OrActionNode: this.visitOrAction.bind(this),
				CollateNode: this.visitCollate.bind(this),
				AlterTypeNode: this.visitAlterType.bind(this),
				AddValueNode: this.visitAddValue.bind(this),
				RenameValueNode: this.visitRenameValue.bind(this)
			}));
			_defineProperty(this, "visitNode", (node) => {
				this.nodeStack.push(node);
				_classPrivateFieldGet2(_visitors, this)[node.kind](node);
				this.nodeStack.pop();
			});
		}
		get parentNode() {
			return this.nodeStack[this.nodeStack.length - 2];
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-compiler/default-query-compiler.js
var LIT_WRAP_REGEX, JSON_PATH_MEMBER_WRAP_REGEX, _sql, _parameters, DefaultQueryCompiler, SELECT_MODIFIER_SQL, SELECT_MODIFIER_PRIORITY, JOIN_TYPE_SQL;
var init_default_query_compiler = __esmMin((() => {
	init_create_table_node();
	init_insert_query_node();
	init_operation_node_visitor();
	init_operator_node();
	init_parens_node();
	init_raw_node();
	init_object_utils();
	init_create_view_node();
	init_set_operation_node();
	init_when_node();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldGet2();
	init_classPrivateFieldSet2();
	LIT_WRAP_REGEX = /'/g;
	JSON_PATH_MEMBER_WRAP_REGEX = /['"]/g;
	_sql = /* @__PURE__ */ new WeakMap();
	_parameters = /* @__PURE__ */ new WeakMap();
	DefaultQueryCompiler = class extends OperationNodeVisitor {
		constructor(..._args) {
			super(..._args);
			_classPrivateFieldInitSpec(this, _sql, "");
			_classPrivateFieldInitSpec(this, _parameters, []);
		}
		get numParameters() {
			return _classPrivateFieldGet2(_parameters, this).length;
		}
		compileQuery(node, queryId) {
			_classPrivateFieldSet2(_sql, this, "");
			_classPrivateFieldSet2(_parameters, this, []);
			this.nodeStack.splice(0, this.nodeStack.length);
			this.visitNode(node);
			return freeze({
				query: node,
				queryId,
				sql: this.getSql(),
				parameters: [..._classPrivateFieldGet2(_parameters, this)]
			});
		}
		getSql() {
			return _classPrivateFieldGet2(_sql, this);
		}
		visitSelectQuery(node) {
			const wrapInParens = this.parentNode !== void 0 && !ParensNode.is(this.parentNode) && !InsertQueryNode.is(this.parentNode) && !CreateTableNode.is(this.parentNode) && !CreateViewNode.is(this.parentNode) && !SetOperationNode.is(this.parentNode);
			if (this.parentNode === void 0 && node.explain) {
				this.visitNode(node.explain);
				this.append(" ");
			}
			if (wrapInParens) this.append("(");
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
				this.compileList(this.sortSelectModifiers(node.endModifiers), " ");
			}
			if (wrapInParens) this.append(")");
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
				if (i < lastIndex) this.append(separator);
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
			const wrapInParens = this.parentNode !== void 0 && !ParensNode.is(this.parentNode) && !RawNode.is(this.parentNode) && !WhenNode.is(this.parentNode);
			if (this.parentNode === void 0 && node.explain) {
				this.visitNode(node.explain);
				this.append(" ");
			}
			if (wrapInParens) this.append("(");
			if (node.with) {
				this.visitNode(node.with);
				this.append(" ");
			}
			this.append(node.replace ? "replace" : "insert");
			if (node.orAction) {
				this.append(" ");
				this.visitNode(node.orAction);
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
			if (wrapInParens) this.append(")");
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
			const wrapInParens = this.parentNode !== void 0 && !ParensNode.is(this.parentNode) && !RawNode.is(this.parentNode);
			if (this.parentNode === void 0 && node.explain) {
				this.visitNode(node.explain);
				this.append(" ");
			}
			if (wrapInParens) this.append("(");
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
			if (wrapInParens) this.append(")");
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
			if (!isString(node.name)) throw new Error("a non-string identifier was passed to compileUnwrappedIdentifier.");
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
			if (node.immediate) this.appendImmediateValue(node.value);
			else this.appendValue(node.value);
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
				if (i !== values.length - 1) this.append(", ");
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
				if (params.length > i) this.visitNode(params[i]);
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
			if (node.frontModifiers?.length) {
				this.compileList(node.frontModifiers, " ");
				this.append(" ");
			}
			if (node.temporary) this.append("temporary ");
			this.append("table ");
			if (node.ifNotExists) this.append("if not exists ");
			this.visitNode(node.table);
			if (!node.selectQuery) {
				this.append(" (");
				this.compileList([
					...node.columns,
					...node.constraints ?? [],
					...node.indexes ?? []
				]);
				this.append(")");
			}
			if (node.onCommit) {
				this.append(" on commit ");
				this.append(node.onCommit);
			}
			if (node.endModifiers?.length) {
				this.append(" ");
				this.compileList(node.endModifiers, " ");
			}
			if (node.selectQuery) {
				this.append(" as ");
				this.visitNode(node.selectQuery);
			}
		}
		visitColumnDefinition(node) {
			if (node.ifNotExists) this.append("if not exists ");
			this.visitNode(node.column);
			this.append(" ");
			this.visitNode(node.dataType);
			if (node.unsigned) this.append(" unsigned");
			if (node.frontModifiers && node.frontModifiers.length > 0) {
				this.append(" ");
				this.compileList(node.frontModifiers, " ");
			}
			if (node.generated) {
				this.append(" ");
				this.visitNode(node.generated);
			}
			if (node.identity) this.append(" identity");
			if (node.defaultTo) {
				this.append(" ");
				this.visitNode(node.defaultTo);
			}
			if (node.notNull) this.append(" not null");
			if (node.unique) this.append(" unique");
			if (node.nullsNotDistinct) this.append(" nulls not distinct");
			if (node.primaryKey) this.append(" primary key");
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
			this.append("drop ");
			if (node.temporary) this.append("temporary ");
			this.append("table ");
			if (node.ifExists) this.append("if exists ");
			this.visitNode(node.table);
			if (node.cascade) this.append(" cascade");
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
			if (node.collation) {
				this.append(" ");
				this.visitNode(node.collation);
			}
			if (node.direction) {
				this.append(" ");
				this.visitNode(node.direction);
			}
			if (node.nulls) {
				this.append(" nulls ");
				this.append(node.nulls);
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
			const wrapInParens = this.parentNode !== void 0 && !ParensNode.is(this.parentNode) && !RawNode.is(this.parentNode) && !WhenNode.is(this.parentNode);
			if (this.parentNode === void 0 && node.explain) {
				this.visitNode(node.explain);
				this.append(" ");
			}
			if (wrapInParens) this.append("(");
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
			if (node.updates) this.compileList(node.updates);
			if (node.output) {
				this.append(" ");
				this.visitNode(node.output);
			}
			if (node.from) {
				this.append(" ");
				this.visitNode(node.from);
			}
			if (node.joins) {
				if (!node.from) throw new Error("Joins in an update query are only supported as a part of a PostgreSQL 'update set from join' query. If you want to create a MySQL 'update join set' query, see https://kysely.dev/docs/examples/update/my-sql-joins");
				this.append(" ");
				this.compileList(node.joins, " ");
			}
			if (node.where) {
				this.append(" ");
				this.visitNode(node.where);
			}
			if (node.returning) {
				this.append(" ");
				this.visitNode(node.returning);
			}
			if (node.orderBy) {
				this.append(" ");
				this.visitNode(node.orderBy);
			}
			if (node.limit) {
				this.append(" ");
				this.visitNode(node.limit);
			}
			if (wrapInParens) this.append(")");
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
			if (node.doNothing === true) this.append(" do nothing");
			else if (node.updates) {
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
			if (node.unique) this.append("unique ");
			this.append("index ");
			if (node.ifNotExists) this.append("if not exists ");
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
			if (node.nullsNotDistinct) this.append(" nulls not distinct");
			if (node.where) {
				this.append(" ");
				this.visitNode(node.where);
			}
		}
		visitDropIndex(node) {
			this.append("drop index ");
			if (node.ifExists) this.append("if exists ");
			this.visitNode(node.name);
			if (node.table) {
				this.append(" on ");
				this.visitNode(node.table);
			}
			if (node.cascade) this.append(" cascade");
		}
		visitCreateSchema(node) {
			this.append("create schema ");
			if (node.ifNotExists) this.append("if not exists ");
			this.visitNode(node.schema);
		}
		visitDropSchema(node) {
			this.append("drop schema ");
			if (node.ifExists) this.append("if exists ");
			this.visitNode(node.schema);
			if (node.cascade) this.append(" cascade");
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
			this.buildDeferrable(node);
		}
		buildDeferrable(node) {
			if (node.deferrable !== void 0) if (node.deferrable) this.append(" deferrable");
			else this.append(" not deferrable");
			if (node.initiallyDeferred !== void 0) if (node.initiallyDeferred) this.append(" initially deferred");
			else this.append(" initially immediate");
		}
		visitUniqueConstraint(node) {
			if (node.name) {
				this.append("constraint ");
				this.visitNode(node.name);
				this.append(" ");
			}
			this.append("unique");
			if (node.nullsNotDistinct) this.append(" nulls not distinct");
			this.append(" (");
			this.compileList(node.columns);
			this.append(")");
			this.buildDeferrable(node);
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
			this.buildDeferrable(node);
		}
		visitList(node) {
			this.compileList(node.items);
		}
		visitWith(node) {
			this.append("with ");
			if (node.recursive) this.append("recursive ");
			this.compileList(node.expressions);
		}
		visitCommonTableExpression(node) {
			this.visitNode(node.name);
			this.append(" as ");
			if (isBoolean(node.materialized)) {
				if (!node.materialized) this.append("not ");
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
			if (node.addConstraint) this.visitNode(node.addConstraint);
			if (node.dropConstraint) this.visitNode(node.dropConstraint);
			if (node.renameConstraint) this.visitNode(node.renameConstraint);
			if (node.columnAlterations) this.compileColumnAlterations(node.columnAlterations);
			if (node.addIndex) this.visitNode(node.addIndex);
			if (node.dropIndex) this.visitNode(node.dropIndex);
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
			if (node.ifExists) this.append("if exists ");
			this.visitNode(node.column);
		}
		visitAlterColumn(node) {
			this.append("alter column ");
			this.visitNode(node.column);
			this.append(" ");
			if (node.dataType) {
				if (this.announcesNewColumnDataType()) this.append("type ");
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
			if (node.dropDefault) this.append("drop default");
			if (node.setNotNull) this.append("set not null");
			if (node.dropNotNull) this.append("drop not null");
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
			if (node.ifExists) this.append("if exists ");
			this.visitNode(node.constraintName);
			if (node.modifier === "cascade") this.append(" cascade");
			else if (node.modifier === "restrict") this.append(" restrict");
		}
		visitRenameConstraint(node) {
			this.append("rename constraint ");
			this.visitNode(node.oldName);
			this.append(" to ");
			this.visitNode(node.newName);
		}
		visitSetOperation(node) {
			this.append(node.operator);
			this.append(" ");
			if (node.all) this.append("all ");
			this.visitNode(node.expression);
		}
		visitCreateView(node) {
			this.append("create ");
			if (node.orReplace) this.append("or replace ");
			if (node.materialized) this.append("materialized ");
			if (node.temporary) this.append("temporary ");
			this.append("view ");
			if (node.ifNotExists) this.append("if not exists ");
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
		visitRefreshMaterializedView(node) {
			this.append("refresh materialized view ");
			if (node.concurrently) this.append("concurrently ");
			this.visitNode(node.name);
			if (node.withNoData) this.append(" with no data");
			else this.append(" with data");
		}
		visitDropView(node) {
			this.append("drop ");
			if (node.materialized) this.append("materialized ");
			this.append("view ");
			if (node.ifExists) this.append("if exists ");
			this.visitNode(node.name);
			if (node.cascade) this.append(" cascade");
		}
		visitGenerated(node) {
			this.append("generated ");
			if (node.always) this.append("always ");
			if (node.byDefault) this.append("by default ");
			this.append("as ");
			if (node.identity) this.append("identity");
			if (node.expression) {
				this.append("(");
				this.visitNode(node.expression);
				this.append(")");
			}
			if (node.stored) this.append(" stored");
		}
		visitDefaultValue(node) {
			this.append("default ");
			this.visitNode(node.defaultValue);
		}
		visitSelectModifier(node) {
			if (node.rawModifier) this.visitNode(node.rawModifier);
			else this.append(SELECT_MODIFIER_SQL[node.modifier]);
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
			if (node.ifExists) this.append("if exists ");
			this.visitNode(node.name);
			if (node.additionalNames?.length) {
				this.append(", ");
				this.compileList(node.additionalNames);
			}
			if (node.cascade) this.append(" cascade");
		}
		visitAlterType(node) {
			this.append("alter type ");
			this.visitNode(node.name);
			this.append(" ");
			if (node.addValue) this.visitNode(node.addValue);
			else if (node.renameTo) {
				this.append("rename to ");
				this.visitNode(node.renameTo);
			} else if (node.renameValue) this.visitNode(node.renameValue);
			else if (node.setSchema) {
				this.append("set schema ");
				this.visitNode(node.setSchema);
			}
		}
		visitAddValue(node) {
			this.append("add value ");
			if (node.ifNotExists) this.append("if not exists ");
			this.visitNode(node.value);
			if (node.neighborValue) {
				this.append(node.isBefore ? " before " : " after ");
				this.visitNode(node.neighborValue);
			}
		}
		visitRenameValue(node) {
			this.append("rename value ");
			this.visitNode(node.oldValue);
			this.append(" to ");
			this.visitNode(node.newValue);
		}
		visitExplain(node) {
			this.append("explain");
			if (node.options || node.format) {
				this.append(" ");
				this.append(this.getLeftExplainOptionsWrapper());
				if (node.options) {
					this.visitNode(node.options);
					if (node.format) this.append(this.getExplainOptionsDelimiter());
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
			if (node.distinct) this.append("distinct ");
			this.compileList(node.aggregated);
			if (node.orderBy) {
				this.append(" ");
				this.visitNode(node.orderBy);
			}
			this.append(")");
			if (node.withinGroup) {
				this.append(" within group (");
				this.visitNode(node.withinGroup);
				this.append(")");
			}
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
				if (node.orderBy) this.append(" ");
			}
			if (node.orderBy) this.visitNode(node.orderBy);
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
			if (!this.isMinusOperator(node.operator)) this.append(" ");
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
			if (node.isStatement) this.append(" case");
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
			if (node.inOperator) this.visitNode(node.inOperator);
			this.append("'$");
			for (const pathLeg of node.pathLegs) this.visitNode(pathLeg);
			this.append("'");
		}
		visitJSONPathLeg(node) {
			const isArrayLocation = node.type === "ArrayLocation";
			const value = String(node.value);
			if (isArrayLocation) {
				this.append("[");
				this.append(this.sanitizeStringLiteral(value));
				this.append("]");
			} else {
				this.append(".\"");
				this.append(this.sanitizeJSONPathMemberValue(value));
				this.append("\"");
			}
		}
		visitJSONOperatorChain(node) {
			for (let i = 0, len = node.values.length; i < len; i++) {
				if (i === len - 1) this.visitNode(node.operator);
				else this.append("->");
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
			if (node.returning) {
				this.append(" ");
				this.visitNode(node.returning);
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
			if (node.not) this.append("not ");
			this.append("matched");
			if (node.bySource) this.append(" by source");
		}
		visitAddIndex(node) {
			if (!this.parentNode || !CreateTableNode.is(this.parentNode)) this.append("add ");
			if (node.unique) this.append("unique ");
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
			if (node.modifiers) this.append(` ${node.modifiers}`);
		}
		visitOrAction(node) {
			this.append(node.action);
		}
		visitCollate(node) {
			this.append("collate ");
			this.visitNode(node.collation);
		}
		append(str) {
			_classPrivateFieldSet2(_sql, this, _classPrivateFieldGet2(_sql, this) + str);
		}
		appendValue(parameter) {
			this.addParameter(parameter);
			this.append(this.getCurrentParameterPlaceholder());
		}
		getLeftIdentifierWrapper() {
			return "\"";
		}
		getRightIdentifierWrapper() {
			return "\"";
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
				if (c === leftWrap) sanitized += leftWrap;
				else if (c === rightWrap) sanitized += rightWrap;
			}
			return sanitized;
		}
		sanitizeStringLiteral(value) {
			return value.replace(LIT_WRAP_REGEX, "''");
		}
		sanitizeJSONPathMemberValue(value) {
			return value.replace(JSON_PATH_MEMBER_WRAP_REGEX, (char) => char === "'" ? "''" : "\\\"");
		}
		addParameter(parameter) {
			_classPrivateFieldGet2(_parameters, this).push(parameter);
		}
		appendImmediateValue(value) {
			if (isString(value)) this.appendStringLiteral(value);
			else if (isNumber(value) || isBoolean(value) || isBigInt(value)) this.append(value.toString());
			else if (isNull(value)) this.append("null");
			else if (isDate(value)) this.appendImmediateValue(value.toISOString());
			else throw new Error(`invalid immediate value ${value}`);
		}
		appendStringLiteral(value) {
			this.append("'");
			this.append(this.sanitizeStringLiteral(value));
			this.append("'");
		}
		sortSelectModifiers(arr) {
			return freeze(arr.toSorted((left, right) => left.modifier && right.modifier ? SELECT_MODIFIER_PRIORITY[left.modifier] - SELECT_MODIFIER_PRIORITY[right.modifier] : 1));
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
	};
	SELECT_MODIFIER_SQL = freeze({
		ForKeyShare: "for key share",
		ForNoKeyUpdate: "for no key update",
		ForUpdate: "for update",
		ForShare: "for share",
		NoWait: "nowait",
		SkipLocked: "skip locked",
		Distinct: "distinct"
	});
	SELECT_MODIFIER_PRIORITY = freeze({
		ForKeyShare: 1,
		ForNoKeyUpdate: 1,
		ForUpdate: 1,
		ForShare: 1,
		NoWait: 2,
		SkipLocked: 2,
		Distinct: 0
	});
	JOIN_TYPE_SQL = freeze({
		InnerJoin: "inner join",
		LeftJoin: "left join",
		RightJoin: "right join",
		FullJoin: "full join",
		CrossJoin: "cross join",
		LateralInnerJoin: "inner join lateral",
		LateralLeftJoin: "left join lateral",
		LateralCrossJoin: "cross join lateral",
		OuterApply: "outer apply",
		CrossApply: "cross apply",
		Using: "using"
	});
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-compiler/compiled-query.js
function isCompiledQuery(thing) {
	return isObject(thing) && Object.hasOwn(thing, "parameters") && Object.hasOwn(thing, "query") && Object.hasOwn(thing, "queryId") && Object.hasOwn(thing, "sql") && isString(thing.sql) && Array.isArray(thing.parameters) && isRootOperationNode(thing.query);
}
var CompiledQuery;
var init_compiled_query = __esmMin((() => {
	init_raw_node();
	init_root_operation_node();
	init_object_utils();
	init_query_id();
	CompiledQuery = freeze({ raw(sql, parameters = []) {
		return freeze({
			sql,
			query: RawNode.createWithSql(sql),
			parameters: freeze(parameters),
			queryId: createQueryId()
		});
	} });
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/driver/dummy-driver.js
var DummyDriver, DummyConnection;
var init_dummy_driver = __esmMin((() => {
	DummyDriver = class {
		async init() {}
		async acquireConnection() {
			return new DummyConnection();
		}
		async beginTransaction() {}
		async commitTransaction() {}
		async rollbackTransaction() {}
		async releaseConnection() {}
		async destroy() {}
		async releaseSavepoint() {}
		async rollbackToSavepoint() {}
		async savepoint() {}
	};
	DummyConnection = class {
		async executeQuery() {
			return { rows: [] };
		}
		async *streamQuery() {}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/dialect-adapter-base.js
var DialectAdapterBase;
var init_dialect_adapter_base = __esmMin((() => {
	DialectAdapterBase = class {
		get supportsCreateIfNotExists() {
			return true;
		}
		get supportsMultipleConnections() {
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
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/savepoint-parser.js
function parseSavepointCommand(command, savepointName) {
	return RawNode.createWithChildren([RawNode.createWithSql(`${command} `), IdentifierNode.create(savepointName)]);
}
var init_savepoint_parser = __esmMin((() => {
	init_identifier_node();
	init_raw_node();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/sqlite/sqlite-driver.js
var _config$9, _db$4, _connection$3, SqliteDriver, _db2, SqliteConnection;
var init_sqlite_driver = __esmMin((() => {
	init_select_query_node();
	init_savepoint_parser();
	init_compiled_query();
	init_object_utils();
	init_query_id();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_config$9 = /* @__PURE__ */ new WeakMap();
	_db$4 = /* @__PURE__ */ new WeakMap();
	_connection$3 = /* @__PURE__ */ new WeakMap();
	SqliteDriver = class {
		constructor(config) {
			_classPrivateFieldInitSpec(this, _config$9, void 0);
			_classPrivateFieldInitSpec(this, _db$4, void 0);
			_classPrivateFieldInitSpec(this, _connection$3, void 0);
			_classPrivateFieldSet2(_config$9, this, freeze({ ...config }));
		}
		async init(options) {
			_classPrivateFieldSet2(_db$4, this, isFunction(_classPrivateFieldGet2(_config$9, this).database) ? await _classPrivateFieldGet2(_config$9, this).database(options) : _classPrivateFieldGet2(_config$9, this).database);
			_classPrivateFieldSet2(_connection$3, this, new SqliteConnection(_classPrivateFieldGet2(_db$4, this)));
			if (_classPrivateFieldGet2(_config$9, this).onCreateConnection) await _classPrivateFieldGet2(_config$9, this).onCreateConnection(_classPrivateFieldGet2(_connection$3, this), options);
		}
		async acquireConnection() {
			return _classPrivateFieldGet2(_connection$3, this);
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
		async savepoint(connection, savepointName, compileQuery) {
			await connection.executeQuery(compileQuery(parseSavepointCommand("savepoint", savepointName), createQueryId()));
		}
		async rollbackToSavepoint(connection, savepointName, compileQuery) {
			await connection.executeQuery(compileQuery(parseSavepointCommand("rollback to", savepointName), createQueryId()));
		}
		async releaseSavepoint(connection, savepointName, compileQuery) {
			await connection.executeQuery(compileQuery(parseSavepointCommand("release", savepointName), createQueryId()));
		}
		async releaseConnection() {}
		async destroy() {
			_classPrivateFieldGet2(_db$4, this)?.close();
		}
	};
	_db2 = /* @__PURE__ */ new WeakMap();
	SqliteConnection = class {
		constructor(db) {
			_classPrivateFieldInitSpec(this, _db2, void 0);
			_classPrivateFieldSet2(_db2, this, db);
		}
		async executeQuery(compiledQuery) {
			const { sql, parameters } = compiledQuery;
			const stmt = _classPrivateFieldGet2(_db2, this).prepare(sql);
			if (stmt.reader) return { rows: stmt.all(parameters) };
			const { changes, lastInsertRowid } = stmt.run(parameters);
			return {
				insertId: lastInsertRowid != null ? BigInt(lastInsertRowid) : void 0,
				numAffectedRows: changes != null ? BigInt(changes) : void 0,
				rows: []
			};
		}
		async *streamQuery(compiledQuery, _chunkSize) {
			const { sql, parameters, query } = compiledQuery;
			const stmt = _classPrivateFieldGet2(_db2, this).prepare(sql);
			if (!SelectQueryNode.is(query)) throw new Error("Sqlite driver only supports streaming of select queries");
			const iter = stmt.iterate(parameters);
			for (const row of iter) yield { rows: [row] };
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/sqlite/sqlite-query-compiler.js
var ID_WRAP_REGEX$2, JSON_PATH_MEMBER_ESCAPE_REGEX$1, SqliteQueryCompiler;
var init_sqlite_query_compiler = __esmMin((() => {
	init_default_query_compiler();
	ID_WRAP_REGEX$2 = /"/g;
	JSON_PATH_MEMBER_ESCAPE_REGEX$1 = /[\\'"]/g;
	SqliteQueryCompiler = class extends DefaultQueryCompiler {
		visitOrAction(node) {
			this.append("or ");
			this.append(node.action);
		}
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
			return "\"";
		}
		getRightIdentifierWrapper() {
			return "\"";
		}
		getAutoIncrement() {
			return "autoincrement";
		}
		sanitizeIdentifier(identifier) {
			return identifier.replace(ID_WRAP_REGEX$2, "\"\"");
		}
		sanitizeJSONPathMemberValue(value) {
			return value.replace(JSON_PATH_MEMBER_ESCAPE_REGEX$1, (char) => char === "\\" ? "\\\\" : char === "'" ? "''" : "\\\"");
		}
		visitDefaultInsertValue(_) {
			this.append("null");
		}
	};
})), DEFAULT_MIGRATION_TABLE, DEFAULT_MIGRATION_LOCK_TABLE;
var init_migrator = __esmMin((() => {
	init_object_utils();
	DEFAULT_MIGRATION_TABLE = "kysely_migration";
	DEFAULT_MIGRATION_LOCK_TABLE = "kysely_migration_lock";
	freeze({ __noMigrations__: true });
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/sqlite/sqlite-introspector.js
function _tablesQuery(qb, options) {
	let tablesQuery = qb.selectFrom("sqlite_master").where("type", "in", ["table", "view"]).where("name", "not like", "sqlite_%").select([
		"name",
		"sql",
		"type"
	]).orderBy("name");
	if (!options.withInternalKyselyTables) tablesQuery = tablesQuery.where("name", "!=", DEFAULT_MIGRATION_TABLE).where("name", "!=", DEFAULT_MIGRATION_LOCK_TABLE);
	return tablesQuery;
}
async function _getTableMetadata(options) {
	const tablesResult = await _assertClassBrand(_SqliteIntrospector_brand, this, _tablesQuery).call(this, _classPrivateFieldGet2(_db$3, this), options).execute();
	const tableMetadata = await _classPrivateFieldGet2(_db$3, this).with("table_list", (qb) => _assertClassBrand(_SqliteIntrospector_brand, this, _tablesQuery).call(this, qb, options)).selectFrom(["table_list as tl", sql`pragma_table_info(tl.name)`.as("p")]).select([
		"tl.name as table",
		"p.cid",
		"p.name",
		"p.type",
		"p.notnull",
		"p.dflt_value",
		"p.pk"
	]).orderBy("tl.name").orderBy("p.cid").execute();
	const columnsByTable = {};
	for (const row of tableMetadata) {
		var _row$table;
		columnsByTable[_row$table = row.table] ?? (columnsByTable[_row$table] = []);
		columnsByTable[row.table].push(row);
	}
	return tablesResult.map(({ name, sql, type }) => {
		let autoIncrementCol = sql?.split(/[\(\),]/)?.find((it) => it.toLowerCase().includes("autoincrement"))?.trimStart()?.split(/\s+/)?.[0]?.replace(/["`]/g, "");
		const columns = columnsByTable[name] ?? [];
		if (!autoIncrementCol) {
			const pkCols = columns.filter((r) => r.pk > 0);
			if (pkCols.length === 1 && pkCols[0].type.toLowerCase() === "integer") autoIncrementCol = pkCols[0].name;
		}
		return {
			name,
			isView: type === "view",
			isForeign: false,
			columns: columns.map((col) => ({
				name: col.name,
				dataType: col.type,
				isNullable: !col.notnull,
				isAutoIncrementing: col.name === autoIncrementCol,
				hasDefaultValue: col.dflt_value != null,
				comment: void 0
			}))
		};
	});
}
var _db$3, _SqliteIntrospector_brand, SqliteIntrospector;
var init_sqlite_introspector = __esmMin((() => {
	init_migrator();
	init_sql();
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_assertClassBrand();
	init_classPrivateFieldGet2();
	_db$3 = /* @__PURE__ */ new WeakMap();
	_SqliteIntrospector_brand = /* @__PURE__ */ new WeakSet();
	SqliteIntrospector = class {
		constructor(db) {
			_classPrivateMethodInitSpec(this, _SqliteIntrospector_brand);
			_classPrivateFieldInitSpec(this, _db$3, void 0);
			_classPrivateFieldSet2(_db$3, this, db);
		}
		async getSchemas() {
			return [];
		}
		async getTables(options = { withInternalKyselyTables: false }) {
			return await _assertClassBrand(_SqliteIntrospector_brand, this, _getTableMetadata).call(this, options);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/sqlite/sqlite-adapter.js
var SqliteAdapter;
var init_sqlite_adapter = __esmMin((() => {
	init_dialect_adapter_base();
	SqliteAdapter = class extends DialectAdapterBase {
		get supportsMultipleConnections() {
			return false;
		}
		get supportsTransactionalDdl() {
			return false;
		}
		get supportsReturning() {
			return true;
		}
		async acquireMigrationLock(_db, _opt) {}
		async releaseMigrationLock(_db, _opt) {}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/sqlite/sqlite-dialect.js
var _config$8, SqliteDialect;
var init_sqlite_dialect = __esmMin((() => {
	init_sqlite_driver();
	init_sqlite_query_compiler();
	init_sqlite_introspector();
	init_sqlite_adapter();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_config$8 = /* @__PURE__ */ new WeakMap();
	SqliteDialect = class {
		constructor(config) {
			_classPrivateFieldInitSpec(this, _config$8, void 0);
			_classPrivateFieldSet2(_config$8, this, freeze({ ...config }));
		}
		createDriver() {
			return new SqliteDriver(_classPrivateFieldGet2(_config$8, this));
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
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/stack-trace-utils.js
function extendStackTrace(err, stackError) {
	if (isStackHolder(err) && stackError.stack) {
		const stackExtension = stackError.stack.split("\n").slice(1).join("\n");
		err.stack += `\n${stackExtension}`;
		return err;
	}
	return err;
}
function isStackHolder(obj) {
	return isObject(obj) && isString(obj.stack);
}
var init_stack_trace_utils = __esmMin((() => {
	init_object_utils();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/mysql/mysql-driver.js
async function _acquireConnection() {
	return new Promise((resolve, reject) => {
		_classPrivateFieldGet2(_pool$2, this).getConnection(async (err, rawConnection) => {
			if (err) reject(err);
			else resolve(rawConnection);
		});
	});
}
function isOkPacket(obj) {
	return isObject(obj) && "insertId" in obj && "affectedRows" in obj;
}
function _executeQuery(compiledQuery) {
	return new Promise((resolve, reject) => {
		_classPrivateFieldGet2(_connection$2, this).query(compiledQuery.sql, compiledQuery.parameters, (err, result) => {
			if (err) reject(err);
			else resolve(result);
		});
	});
}
async function _executeControlQuery$1(query, controlConnectionProvider) {
	if (!_classPrivateFieldGet2(_queryId$1, this)) return;
	const { config } = _classPrivateFieldGet2(_connection$2, this);
	const queryIdToCancel = _classPrivateFieldGet2(_queryId$1, this);
	if (!_classPrivateFieldGet2(_controlConnection, this) || !config) return await controlConnectionProvider(async (controlConnection) => {
		if (queryIdToCancel.queryId === _classPrivateFieldGet2(_queryId$1, this)?.queryId) await controlConnection.executeQuery(CompiledQuery.raw(query, []));
	});
	const { clientFlags: _, maxPacketSize: __, ...cfg } = config;
	const controlConnection = _classPrivateFieldGet2(_controlConnection, this).call(this, cfg);
	try {
		await new Promise((resolve, reject) => {
			controlConnection.connect((connectError) => {
				if (connectError) return reject(connectError);
				if (queryIdToCancel.queryId !== _classPrivateFieldGet2(_queryId$1, this)?.queryId) return resolve();
				controlConnection.query(query, [], (queryError) => {
					if (queryError) return reject(queryError);
					resolve();
				});
			});
		});
	} finally {
		controlConnection.destroy();
	}
}
var PRIVATE_RELEASE_METHOD$1, _config$7, _connections$1, _pool$2, _MysqlDriver_brand, MysqlDriver, _connection$2, _controlConnection, _cid, _queryId$1, _MysqlConnection_brand, MysqlConnection;
var init_mysql_driver = __esmMin((() => {
	init_savepoint_parser();
	init_compiled_query();
	init_object_utils();
	init_query_id();
	init_stack_trace_utils();
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_assertClassBrand();
	PRIVATE_RELEASE_METHOD$1 = Symbol();
	_config$7 = /* @__PURE__ */ new WeakMap();
	_connections$1 = /* @__PURE__ */ new WeakMap();
	_pool$2 = /* @__PURE__ */ new WeakMap();
	_MysqlDriver_brand = /* @__PURE__ */ new WeakSet();
	MysqlDriver = class {
		constructor(config) {
			_classPrivateMethodInitSpec(this, _MysqlDriver_brand);
			_classPrivateFieldInitSpec(this, _config$7, void 0);
			_classPrivateFieldInitSpec(this, _connections$1, /* @__PURE__ */ new WeakMap());
			_classPrivateFieldInitSpec(this, _pool$2, void 0);
			_classPrivateFieldSet2(_config$7, this, freeze({ ...config }));
		}
		async init(options) {
			_classPrivateFieldSet2(_pool$2, this, isFunction(_classPrivateFieldGet2(_config$7, this).pool) ? await _classPrivateFieldGet2(_config$7, this).pool(options) : _classPrivateFieldGet2(_config$7, this).pool);
		}
		async acquireConnection(options) {
			const rawConnection = await _assertClassBrand(_MysqlDriver_brand, this, _acquireConnection).call(this);
			let connection = _classPrivateFieldGet2(_connections$1, this).get(rawConnection);
			if (!connection) {
				connection = new MysqlConnection(rawConnection, _classPrivateFieldGet2(_config$7, this).controlConnection);
				_classPrivateFieldGet2(_connections$1, this).set(rawConnection, connection);
				if (_classPrivateFieldGet2(_config$7, this)?.onCreateConnection) await _classPrivateFieldGet2(_config$7, this).onCreateConnection(connection, options);
			}
			if (_classPrivateFieldGet2(_config$7, this)?.onReserveConnection) await _classPrivateFieldGet2(_config$7, this).onReserveConnection(connection, options);
			return connection;
		}
		async beginTransaction(connection, settings) {
			if (settings.isolationLevel || settings.accessMode) {
				const parts = [];
				if (settings.isolationLevel) parts.push(`isolation level ${settings.isolationLevel}`);
				if (settings.accessMode) parts.push(settings.accessMode);
				const sql = `set transaction ${parts.join(", ")}`;
				await connection.executeQuery(CompiledQuery.raw(sql));
			}
			await connection.executeQuery(CompiledQuery.raw("begin"));
		}
		async commitTransaction(connection) {
			await connection.executeQuery(CompiledQuery.raw("commit"));
		}
		async rollbackTransaction(connection) {
			await connection.executeQuery(CompiledQuery.raw("rollback"));
		}
		async savepoint(connection, savepointName, compileQuery) {
			await connection.executeQuery(compileQuery(parseSavepointCommand("savepoint", savepointName), createQueryId()));
		}
		async rollbackToSavepoint(connection, savepointName, compileQuery) {
			await connection.executeQuery(compileQuery(parseSavepointCommand("rollback to", savepointName), createQueryId()));
		}
		async releaseSavepoint(connection, savepointName, compileQuery) {
			await connection.executeQuery(compileQuery(parseSavepointCommand("release savepoint", savepointName), createQueryId()));
		}
		async releaseConnection(connection) {
			connection[PRIVATE_RELEASE_METHOD$1]();
		}
		async destroy() {
			return new Promise((resolve, reject) => {
				_classPrivateFieldGet2(_pool$2, this).end((err) => {
					if (err) reject(err);
					else resolve();
				});
			});
		}
	};
	_connection$2 = /* @__PURE__ */ new WeakMap();
	_controlConnection = /* @__PURE__ */ new WeakMap();
	_cid = /* @__PURE__ */ new WeakMap();
	_queryId$1 = /* @__PURE__ */ new WeakMap();
	_MysqlConnection_brand = /* @__PURE__ */ new WeakSet();
	MysqlConnection = class {
		constructor(connection, controlConnection) {
			_classPrivateMethodInitSpec(this, _MysqlConnection_brand);
			_classPrivateFieldInitSpec(this, _connection$2, void 0);
			_classPrivateFieldInitSpec(this, _controlConnection, void 0);
			_classPrivateFieldInitSpec(this, _cid, void 0);
			_classPrivateFieldInitSpec(this, _queryId$1, void 0);
			_classPrivateFieldSet2(_connection$2, this, connection);
			_classPrivateFieldSet2(_controlConnection, this, controlConnection);
		}
		async cancelQuery(controlConnectionProvider) {
			await _assertClassBrand(_MysqlConnection_brand, this, _executeControlQuery$1).call(this, `kill query ${_classPrivateFieldGet2(_cid, this)}`, controlConnectionProvider);
		}
		async collectSessionInfo() {
			if (_classPrivateFieldGet2(_cid, this)) return;
			const { threadId } = _classPrivateFieldGet2(_connection$2, this);
			if (threadId != null) _classPrivateFieldSet2(_cid, this, threadId);
			else {
				const [{ cid }] = await _assertClassBrand(_MysqlConnection_brand, this, _executeQuery).call(this, CompiledQuery.raw(`select connection_id() as cid`));
				_classPrivateFieldSet2(_cid, this, Number(cid));
			}
		}
		async executeQuery(compiledQuery) {
			try {
				_classPrivateFieldSet2(_queryId$1, this, compiledQuery.queryId);
				const result = await _assertClassBrand(_MysqlConnection_brand, this, _executeQuery).call(this, compiledQuery);
				if (!isOkPacket(result)) return { rows: Array.isArray(result) ? result : [] };
				const { insertId, affectedRows, changedRows } = result;
				return {
					insertId: insertId != null && insertId.toString() !== "0" ? BigInt(insertId) : void 0,
					numAffectedRows: affectedRows != null ? BigInt(affectedRows) : void 0,
					numChangedRows: changedRows != null ? BigInt(changedRows) : void 0,
					rows: []
				};
			} catch (err) {
				throw extendStackTrace(err, /* @__PURE__ */ new Error());
			} finally {
				_classPrivateFieldSet2(_queryId$1, this, void 0);
			}
		}
		async killSession(controlConnectionProvider) {
			try {
				_classPrivateFieldGet2(_connection$2, this).destroy();
			} catch {}
			await _assertClassBrand(_MysqlConnection_brand, this, _executeControlQuery$1).call(this, `kill connection ${_classPrivateFieldGet2(_cid, this)}`, controlConnectionProvider);
		}
		async *streamQuery(compiledQuery, _chunkSize) {
			_classPrivateFieldSet2(_queryId$1, this, compiledQuery.queryId);
			const stream = _classPrivateFieldGet2(_connection$2, this).query(compiledQuery.sql, compiledQuery.parameters).stream({ objectMode: true });
			try {
				for await (const row of stream) yield { rows: [row] };
			} catch (error) {
				if (isObject(error) && "code" in error && error.code === "ERR_STREAM_PREMATURE_CLOSE") return;
				throw error;
			} finally {
				_classPrivateFieldSet2(_queryId$1, this, void 0);
			}
		}
		[PRIVATE_RELEASE_METHOD$1]() {
			_classPrivateFieldGet2(_connection$2, this).release();
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/mysql/mysql-query-compiler.js
var LITERAL_ESCAPE_REGEX, ID_WRAP_REGEX$1, JSON_PATH_MEMBER_ESCAPE_REGEX, MysqlQueryCompiler;
var init_mysql_query_compiler = __esmMin((() => {
	init_default_query_compiler();
	LITERAL_ESCAPE_REGEX = /[\\']/g;
	ID_WRAP_REGEX$1 = /`/g;
	JSON_PATH_MEMBER_ESCAPE_REGEX = /[\\'"]/g;
	MysqlQueryCompiler = class extends DefaultQueryCompiler {
		getCurrentParameterPlaceholder() {
			return "?";
		}
		getLeftExplainOptionsWrapper() {
			return "";
		}
		getExplainOptionAssignment() {
			return "=";
		}
		getExplainOptionsDelimiter() {
			return " ";
		}
		getRightExplainOptionsWrapper() {
			return "";
		}
		getLeftIdentifierWrapper() {
			return ID_WRAP_REGEX$1.source;
		}
		getRightIdentifierWrapper() {
			return ID_WRAP_REGEX$1.source;
		}
		sanitizeIdentifier(identifier) {
			return identifier.replace(ID_WRAP_REGEX$1, "``");
		}
		/**
		* MySQL requires escaping backslashes in string literals when using the
		* default NO_BACKSLASH_ESCAPES=OFF mode. Without this, a backslash
		* followed by a quote (\') can break out of the string literal.
		*
		* @see https://dev.mysql.com/doc/refman/9.6/en/string-literals.html
		*/
		sanitizeStringLiteral(value) {
			return value.replace(LITERAL_ESCAPE_REGEX, (char) => char === "\\" ? "\\\\" : "''");
		}
		/**
		* Member values appear inside `"..."` in the JSON path, which itself sits
		* inside a SQL string literal. They must therefore be escaped twice — once
		* for the JSON path grammar, then again for MySQL's string literal parser.
		*/
		sanitizeJSONPathMemberValue(value) {
			return value.replace(JSON_PATH_MEMBER_ESCAPE_REGEX, (char) => char === "\\" ? "\\\\\\\\" : char === "'" ? "''" : "\\\\\"");
		}
		visitCreateIndex(node) {
			this.append("create ");
			if (node.unique) this.append("unique ");
			this.append("index ");
			if (node.ifNotExists) this.append("if not exists ");
			this.visitNode(node.name);
			if (node.using) {
				this.append(" using ");
				this.visitNode(node.using);
			}
			if (node.table) {
				this.append(" on ");
				this.visitNode(node.table);
			}
			if (node.columns) {
				this.append(" (");
				this.compileList(node.columns);
				this.append(")");
			}
			if (node.where) {
				this.append(" ");
				this.visitNode(node.where);
			}
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/mysql/mysql-introspector.js
function _parseTableMetadata$1(columns) {
	return columns.reduce((tables, it) => {
		let table = tables.find((tbl) => tbl.name === it.TABLE_NAME);
		if (!table) {
			table = freeze({
				name: it.TABLE_NAME,
				isView: it.TABLE_TYPE === "VIEW",
				isForeign: it.ENGINE === "FEDERATED",
				schema: it.TABLE_SCHEMA,
				columns: []
			});
			tables.push(table);
		}
		table.columns.push(freeze({
			name: it.COLUMN_NAME,
			dataType: it.DATA_TYPE,
			isNullable: it.IS_NULLABLE === "YES",
			isAutoIncrementing: it.EXTRA.toLowerCase().includes("auto_increment"),
			hasDefaultValue: it.COLUMN_DEFAULT !== null,
			comment: it.COLUMN_COMMENT === "" ? void 0 : it.COLUMN_COMMENT
		}));
		return tables;
	}, []);
}
var _db$2, _MysqlIntrospector_brand, MysqlIntrospector;
var init_mysql_introspector = __esmMin((() => {
	init_migrator();
	init_object_utils();
	init_sql();
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_assertClassBrand();
	_db$2 = /* @__PURE__ */ new WeakMap();
	_MysqlIntrospector_brand = /* @__PURE__ */ new WeakSet();
	MysqlIntrospector = class {
		constructor(db) {
			_classPrivateMethodInitSpec(this, _MysqlIntrospector_brand);
			_classPrivateFieldInitSpec(this, _db$2, void 0);
			_classPrivateFieldSet2(_db$2, this, db);
		}
		async getSchemas() {
			return (await _classPrivateFieldGet2(_db$2, this).selectFrom("information_schema.schemata").select("schema_name").$castTo().execute()).map((it) => ({ name: it.SCHEMA_NAME }));
		}
		async getTables(options = { withInternalKyselyTables: false }) {
			let query = _classPrivateFieldGet2(_db$2, this).selectFrom("information_schema.columns as columns").innerJoin("information_schema.tables as tables", (b) => b.onRef("columns.TABLE_CATALOG", "=", "tables.TABLE_CATALOG").onRef("columns.TABLE_SCHEMA", "=", "tables.TABLE_SCHEMA").onRef("columns.TABLE_NAME", "=", "tables.TABLE_NAME")).select([
				"columns.COLUMN_NAME",
				"columns.COLUMN_DEFAULT",
				"columns.TABLE_NAME",
				"columns.TABLE_SCHEMA",
				"tables.TABLE_TYPE",
				"tables.ENGINE",
				"columns.IS_NULLABLE",
				"columns.DATA_TYPE",
				"columns.EXTRA",
				"columns.COLUMN_COMMENT"
			]).where("columns.TABLE_SCHEMA", "=", sql`database()`).orderBy("columns.TABLE_NAME").orderBy("columns.ORDINAL_POSITION").$castTo();
			if (!options.withInternalKyselyTables) query = query.where("columns.TABLE_NAME", "!=", DEFAULT_MIGRATION_TABLE).where("columns.TABLE_NAME", "!=", DEFAULT_MIGRATION_LOCK_TABLE);
			const rawColumns = await query.execute();
			return _assertClassBrand(_MysqlIntrospector_brand, this, _parseTableMetadata$1).call(this, rawColumns);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/mysql/mysql-adapter.js
var LOCK_ID$1, LOCK_TIMEOUT_SECONDS, MysqlAdapter;
var init_mysql_adapter = __esmMin((() => {
	init_sql();
	init_dialect_adapter_base();
	LOCK_ID$1 = "ea586330-2c93-47c8-908d-981d9d270f9d";
	LOCK_TIMEOUT_SECONDS = 3600;
	MysqlAdapter = class extends DialectAdapterBase {
		get supportsTransactionalDdl() {
			return false;
		}
		get supportsReturning() {
			return false;
		}
		async acquireMigrationLock(db, _opt) {
			await sql`select get_lock(${sql.lit(LOCK_ID$1)}, ${sql.lit(LOCK_TIMEOUT_SECONDS)})`.execute(db);
		}
		async releaseMigrationLock(db, _opt) {
			await sql`select release_lock(${sql.lit(LOCK_ID$1)})`.execute(db);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/mysql/mysql-dialect.js
var _config$6, MysqlDialect;
var init_mysql_dialect = __esmMin((() => {
	init_mysql_driver();
	init_mysql_query_compiler();
	init_mysql_introspector();
	init_mysql_adapter();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_config$6 = /* @__PURE__ */ new WeakMap();
	MysqlDialect = class {
		constructor(config) {
			_classPrivateFieldInitSpec(this, _config$6, void 0);
			_classPrivateFieldSet2(_config$6, this, config);
		}
		createDriver() {
			return new MysqlDriver(_classPrivateFieldGet2(_config$6, this));
		}
		createQueryCompiler() {
			return new MysqlQueryCompiler();
		}
		createAdapter() {
			return new MysqlAdapter();
		}
		createIntrospector(db) {
			return new MysqlIntrospector(db);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/postgres/postgres-driver.js
async function _executeControlQuery(query, controlConnectionProvider) {
	if (!_classPrivateFieldGet2(_queryId, this)) return;
	const { controlClient: Client, poolOptions } = _classPrivateFieldGet2(_options$1, this);
	const queryIdToCancel = _classPrivateFieldGet2(_queryId, this);
	if (!Client) return await controlConnectionProvider(async (controlConnection) => {
		if (queryIdToCancel.queryId === _classPrivateFieldGet2(_queryId, this)?.queryId) await controlConnection.executeQuery(CompiledQuery.raw(query, []));
	});
	const controlClient = new Client({ ...poolOptions });
	try {
		await controlClient.connect();
		if (queryIdToCancel.queryId !== _classPrivateFieldGet2(_queryId, this).queryId) return;
		await controlClient.query(query, []);
	} finally {
		controlClient.end();
	}
}
var PRIVATE_RELEASE_METHOD, _config$5, _connections, _pool$1, PostgresDriver, _client, _options$1, _queryId, _pid, _PostgresConnection_brand, PostgresConnection;
var init_postgres_driver = __esmMin((() => {
	init_savepoint_parser();
	init_compiled_query();
	init_object_utils();
	init_query_id();
	init_stack_trace_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_classPrivateMethodInitSpec();
	init_assertClassBrand();
	PRIVATE_RELEASE_METHOD = Symbol();
	_config$5 = /* @__PURE__ */ new WeakMap();
	_connections = /* @__PURE__ */ new WeakMap();
	_pool$1 = /* @__PURE__ */ new WeakMap();
	PostgresDriver = class {
		constructor(config) {
			_classPrivateFieldInitSpec(this, _config$5, void 0);
			_classPrivateFieldInitSpec(this, _connections, /* @__PURE__ */ new WeakMap());
			_classPrivateFieldInitSpec(this, _pool$1, void 0);
			_classPrivateFieldSet2(_config$5, this, freeze({ ...config }));
		}
		async init(options) {
			_classPrivateFieldSet2(_pool$1, this, isFunction(_classPrivateFieldGet2(_config$5, this).pool) ? await _classPrivateFieldGet2(_config$5, this).pool(options) : _classPrivateFieldGet2(_config$5, this).pool);
		}
		async acquireConnection(options) {
			const client = await _classPrivateFieldGet2(_pool$1, this).connect();
			let connection = _classPrivateFieldGet2(_connections, this).get(client);
			if (!connection) {
				connection = new PostgresConnection(client, {
					controlClient: _classPrivateFieldGet2(_config$5, this).controlClient || _classPrivateFieldGet2(_pool$1, this).Client,
					cursor: _classPrivateFieldGet2(_config$5, this).cursor ?? null,
					poolOptions: _classPrivateFieldGet2(_pool$1, this).options
				});
				_classPrivateFieldGet2(_connections, this).set(client, connection);
				if (_classPrivateFieldGet2(_config$5, this).onCreateConnection) await _classPrivateFieldGet2(_config$5, this).onCreateConnection(connection, options);
			}
			if (_classPrivateFieldGet2(_config$5, this).onReserveConnection) await _classPrivateFieldGet2(_config$5, this).onReserveConnection(connection, options);
			return connection;
		}
		async beginTransaction(connection, settings) {
			let sql = "begin";
			if (settings.isolationLevel || settings.accessMode) {
				sql = "start transaction";
				if (settings.isolationLevel) sql += ` isolation level ${settings.isolationLevel}`;
				if (settings.accessMode) sql += ` ${settings.accessMode}`;
			}
			await connection.executeQuery(CompiledQuery.raw(sql));
		}
		async commitTransaction(connection) {
			await connection.executeQuery(CompiledQuery.raw("commit"));
		}
		async rollbackTransaction(connection) {
			await connection.executeQuery(CompiledQuery.raw("rollback"));
		}
		async savepoint(connection, savepointName, compileQuery) {
			await connection.executeQuery(compileQuery(parseSavepointCommand("savepoint", savepointName), createQueryId()));
		}
		async rollbackToSavepoint(connection, savepointName, compileQuery) {
			await connection.executeQuery(compileQuery(parseSavepointCommand("rollback to", savepointName), createQueryId()));
		}
		async releaseSavepoint(connection, savepointName, compileQuery) {
			await connection.executeQuery(compileQuery(parseSavepointCommand("release", savepointName), createQueryId()));
		}
		async releaseConnection(connection) {
			connection[PRIVATE_RELEASE_METHOD]();
		}
		async destroy() {
			if (_classPrivateFieldGet2(_pool$1, this)) {
				const pool = _classPrivateFieldGet2(_pool$1, this);
				_classPrivateFieldSet2(_pool$1, this, void 0);
				await pool.end();
			}
		}
	};
	_client = /* @__PURE__ */ new WeakMap();
	_options$1 = /* @__PURE__ */ new WeakMap();
	_queryId = /* @__PURE__ */ new WeakMap();
	_pid = /* @__PURE__ */ new WeakMap();
	_PostgresConnection_brand = /* @__PURE__ */ new WeakSet();
	PostgresConnection = class {
		constructor(client, options) {
			_classPrivateMethodInitSpec(this, _PostgresConnection_brand);
			_classPrivateFieldInitSpec(this, _client, void 0);
			_classPrivateFieldInitSpec(this, _options$1, void 0);
			_classPrivateFieldInitSpec(this, _queryId, void 0);
			_classPrivateFieldInitSpec(this, _pid, void 0);
			_classPrivateFieldSet2(_client, this, client);
			_classPrivateFieldSet2(_options$1, this, options);
		}
		async cancelQuery(controlConnectionProvider) {
			return await _assertClassBrand(_PostgresConnection_brand, this, _executeControlQuery).call(this, `select pg_cancel_backend(${_classPrivateFieldGet2(_pid, this)})`, controlConnectionProvider);
		}
		async collectSessionInfo() {
			if (_classPrivateFieldGet2(_pid, this)) return;
			const { processID } = _classPrivateFieldGet2(_client, this);
			if (processID) _classPrivateFieldSet2(_pid, this, processID);
			else {
				const { rows: [{ pid }] } = await _classPrivateFieldGet2(_client, this).query("select pg_backend_pid() as pid", []);
				_classPrivateFieldSet2(_pid, this, Number(pid));
			}
		}
		async executeQuery(compiledQuery) {
			try {
				_classPrivateFieldSet2(_queryId, this, compiledQuery.queryId);
				const { command, rowCount, rows } = await _classPrivateFieldGet2(_client, this).query(compiledQuery.sql, compiledQuery.parameters);
				return {
					numAffectedRows: command === "INSERT" || command === "UPDATE" || command === "DELETE" || command === "MERGE" ? BigInt(rowCount) : void 0,
					rows: rows ?? []
				};
			} catch (err) {
				throw extendStackTrace(err, /* @__PURE__ */ new Error());
			} finally {
				_classPrivateFieldSet2(_queryId, this, void 0);
			}
		}
		async killSession(controlConnectionProvider) {
			return await _assertClassBrand(_PostgresConnection_brand, this, _executeControlQuery).call(this, `select pg_terminate_backend(${_classPrivateFieldGet2(_pid, this)})`, controlConnectionProvider);
		}
		async *streamQuery(compiledQuery, chunkSize) {
			if (!_classPrivateFieldGet2(_options$1, this).cursor) throw new Error("`cursor` is not present in your postgres dialect config. It's required to make streaming work in postgres.");
			_classPrivateFieldSet2(_queryId, this, compiledQuery.queryId);
			const cursor = _classPrivateFieldGet2(_client, this).query(new (_classPrivateFieldGet2(_options$1, this)).cursor(compiledQuery.sql, compiledQuery.parameters.slice()));
			try {
				while (true) {
					const rows = await cursor.read(chunkSize);
					if (rows.length === 0) break;
					yield { rows };
				}
			} finally {
				await cursor.close();
				_classPrivateFieldSet2(_queryId, this, void 0);
			}
		}
		[PRIVATE_RELEASE_METHOD]() {
			_classPrivateFieldGet2(_client, this).release();
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/postgres/postgres-introspector.js
function _parseTableMetadata(columns) {
	const tables = [];
	const schemas = /* @__PURE__ */ new Map();
	for (const column of columns) {
		let schema = schemas.get(column.schema);
		if (!schema) {
			schema = /* @__PURE__ */ new Map();
			schemas.set(column.schema, schema);
		}
		let table = schema.get(column.table);
		if (!table) {
			table = freeze({
				columns: [],
				isForeign: column.table_type === "f",
				isView: column.table_type === "v",
				name: column.table,
				schema: column.schema
			});
			schema.set(column.table, table);
			tables.push(table);
		}
		table.columns.push(freeze({
			comment: column.column_description ?? void 0,
			dataType: column.type,
			dataTypeSchema: column.type_schema,
			hasDefaultValue: column.has_default,
			isAutoIncrementing: column.auto_incrementing !== null,
			isNullable: !column.not_null,
			name: column.column
		}));
	}
	return tables;
}
var _db$1, _PostgresIntrospector_brand, PostgresIntrospector;
var init_postgres_introspector = __esmMin((() => {
	init_migrator();
	init_object_utils();
	init_sql();
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_assertClassBrand();
	_db$1 = /* @__PURE__ */ new WeakMap();
	_PostgresIntrospector_brand = /* @__PURE__ */ new WeakSet();
	PostgresIntrospector = class {
		constructor(db) {
			_classPrivateMethodInitSpec(this, _PostgresIntrospector_brand);
			_classPrivateFieldInitSpec(this, _db$1, void 0);
			_classPrivateFieldSet2(_db$1, this, db);
		}
		async getSchemas() {
			return (await _classPrivateFieldGet2(_db$1, this).selectFrom("pg_catalog.pg_namespace").select("nspname").$castTo().execute()).map((it) => ({ name: it.nspname }));
		}
		async getTables(options = { withInternalKyselyTables: false }) {
			let query = _classPrivateFieldGet2(_db$1, this).selectFrom("pg_catalog.pg_attribute as a").innerJoin("pg_catalog.pg_class as c", "a.attrelid", "c.oid").innerJoin("pg_catalog.pg_namespace as ns", "c.relnamespace", "ns.oid").innerJoin("pg_catalog.pg_type as typ", "a.atttypid", "typ.oid").innerJoin("pg_catalog.pg_namespace as dtns", "typ.typnamespace", "dtns.oid").select([
				"a.attname as column",
				"a.attnotnull as not_null",
				"a.atthasdef as has_default",
				"c.relname as table",
				"c.relkind as table_type",
				"ns.nspname as schema",
				"typ.typname as type",
				"dtns.nspname as type_schema",
				sql`col_description(a.attrelid, a.attnum)`.as("column_description"),
				sql`pg_get_serial_sequence(quote_ident(ns.nspname) || '.' || quote_ident(c.relname), a.attname)`.as("auto_incrementing")
			]).where("c.relkind", "in", [
				"r",
				"v",
				"p",
				"f"
			]).where("ns.nspname", "!~", "^pg_").where("ns.nspname", "!=", "information_schema").where("ns.nspname", "!=", "crdb_internal").where(sql`has_schema_privilege(ns.nspname, 'USAGE')`).where("a.attnum", ">=", 0).where("a.attisdropped", "!=", true).orderBy("ns.nspname").orderBy("c.relname").orderBy("a.attnum").$castTo();
			if (!options.withInternalKyselyTables) query = query.where("c.relname", "!=", DEFAULT_MIGRATION_TABLE).where("c.relname", "!=", DEFAULT_MIGRATION_LOCK_TABLE);
			const rawColumns = await query.execute();
			return _assertClassBrand(_PostgresIntrospector_brand, this, _parseTableMetadata).call(this, rawColumns);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/postgres/postgres-query-compiler.js
var ID_WRAP_REGEX, PostgresQueryCompiler;
var init_postgres_query_compiler = __esmMin((() => {
	init_default_query_compiler();
	ID_WRAP_REGEX = /"/g;
	PostgresQueryCompiler = class extends DefaultQueryCompiler {
		sanitizeIdentifier(identifier) {
			return identifier.replace(ID_WRAP_REGEX, "\"\"");
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/postgres/postgres-adapter.js
var LOCK_ID, PostgresAdapter;
var init_postgres_adapter = __esmMin((() => {
	init_sql();
	init_dialect_adapter_base();
	LOCK_ID = BigInt("3853314791062309107");
	PostgresAdapter = class extends DialectAdapterBase {
		get supportsTransactionalDdl() {
			return true;
		}
		get supportsReturning() {
			return true;
		}
		async acquireMigrationLock(db, _opt) {
			await sql`select pg_advisory_xact_lock(${sql.lit(LOCK_ID)})`.execute(db);
		}
		async releaseMigrationLock(_db, _opt) {}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/postgres/postgres-dialect.js
var _config$4, PostgresDialect;
var init_postgres_dialect = __esmMin((() => {
	init_postgres_driver();
	init_postgres_introspector();
	init_postgres_query_compiler();
	init_postgres_adapter();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_config$4 = /* @__PURE__ */ new WeakMap();
	PostgresDialect = class {
		constructor(config) {
			_classPrivateFieldInitSpec(this, _config$4, void 0);
			_classPrivateFieldSet2(_config$4, this, config);
		}
		createDriver() {
			return new PostgresDriver(_classPrivateFieldGet2(_config$4, this));
		}
		createQueryCompiler() {
			return new PostgresQueryCompiler();
		}
		createAdapter() {
			return new PostgresAdapter();
		}
		createIntrospector(db) {
			return new PostgresIntrospector(db);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/mssql/mssql-adapter.js
var MssqlAdapter;
var init_mssql_adapter = __esmMin((() => {
	init_migrator();
	init_sql();
	init_dialect_adapter_base();
	MssqlAdapter = class extends DialectAdapterBase {
		get supportsCreateIfNotExists() {
			return false;
		}
		get supportsTransactionalDdl() {
			return true;
		}
		get supportsOutput() {
			return true;
		}
		async acquireMigrationLock(db) {
			await sql`exec sp_getapplock @DbPrincipal = ${sql.lit("dbo")}, @Resource = ${sql.lit(DEFAULT_MIGRATION_TABLE)}, @LockMode = ${sql.lit("Exclusive")}`.execute(db);
		}
		async releaseMigrationLock() {}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/mssql/mssql-driver.js
function _getTediousIsolationLevel(isolationLevel) {
	const { ISOLATION_LEVEL } = _classPrivateFieldGet2(_tedious, this);
	const tediousIsolationLevel = {
		"read committed": ISOLATION_LEVEL.READ_COMMITTED,
		"read uncommitted": ISOLATION_LEVEL.READ_UNCOMMITTED,
		"repeatable read": ISOLATION_LEVEL.REPEATABLE_READ,
		serializable: ISOLATION_LEVEL.SERIALIZABLE,
		snapshot: ISOLATION_LEVEL.SNAPSHOT
	}[isolationLevel];
	if (tediousIsolationLevel === void 0) throw new Error(`Unknown isolation level: ${isolationLevel}`);
	return tediousIsolationLevel;
}
function _isConnectionClosed() {
	return "closed" in _classPrivateFieldGet2(_connection$1, this) && Boolean(_classPrivateFieldGet2(_connection$1, this).closed);
}
function _addParametersToRequest(parameters) {
	for (let i = 0; i < parameters.length; i++) {
		const parameter = parameters[i];
		_classPrivateFieldGet2(_request, this).addParameter(String(i + 1), _assertClassBrand(_MssqlRequest_brand, this, _getTediousDataType).call(this, parameter), parameter);
	}
}
function _attachListeners() {
	const pauseAndEmitChunkReady = _classPrivateFieldGet2(_streamChunkSize, this) ? () => {
		if (_classPrivateFieldGet2(_streamChunkSize, this) <= _classPrivateFieldGet2(_rows, this).length) {
			_classPrivateFieldGet2(_request, this).pause();
			Object.values(_classPrivateFieldGet2(_subscribers, this)).forEach((subscriber) => subscriber("chunkReady"));
		}
	} : () => {};
	const rowListener = (columns) => {
		const row = {};
		for (const column of columns) row[column.metadata.colName] = column.value;
		_classPrivateFieldGet2(_rows, this).push(row);
		pauseAndEmitChunkReady();
	};
	_classPrivateFieldGet2(_request, this).on("row", rowListener);
	_classPrivateFieldGet2(_request, this).once("requestCompleted", () => {
		Object.values(_classPrivateFieldGet2(_subscribers, this)).forEach((subscriber) => subscriber("completed"));
		_classPrivateFieldGet2(_request, this).off("row", rowListener);
	});
}
function _getTediousDataType(value) {
	if (isNull(value) || isUndefined(value) || isString(value)) return _classPrivateFieldGet2(_tedious2, this).TYPES.NVarChar;
	if (isBigInt(value) || isNumber(value) && value % 1 === 0) if (value < -2147483648 || value > 2147483647) return _classPrivateFieldGet2(_tedious2, this).TYPES.BigInt;
	else return _classPrivateFieldGet2(_tedious2, this).TYPES.Int;
	if (isNumber(value)) return _classPrivateFieldGet2(_tedious2, this).TYPES.Float;
	if (isBoolean(value)) return _classPrivateFieldGet2(_tedious2, this).TYPES.Bit;
	if (isDate(value)) return _classPrivateFieldGet2(_tedious2, this).TYPES.DateTime;
	if (isBuffer(value)) return _classPrivateFieldGet2(_tedious2, this).TYPES.VarBinary;
	return _classPrivateFieldGet2(_tedious2, this).TYPES.NVarChar;
}
var PRIVATE_RESET_METHOD, PRIVATE_DESTROY_METHOD, PRIVATE_VALIDATE_METHOD, _config$3, _pool, MssqlDriver, _connection$1, _hasSocketError, _tedious, _inflightRequest, _MssqlConnection_brand, MssqlConnection, _request, _rows, _streamChunkSize, _subscribers, _tedious2, _rowCount, _MssqlRequest_brand, MssqlRequest;
var init_mssql_driver = __esmMin((() => {
	init_object_utils();
	init_compiled_query();
	init_stack_trace_utils();
	init_random_string();
	init_deferred();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_classPrivateMethodInitSpec();
	init_assertClassBrand();
	PRIVATE_RESET_METHOD = Symbol();
	PRIVATE_DESTROY_METHOD = Symbol();
	PRIVATE_VALIDATE_METHOD = Symbol();
	_config$3 = /* @__PURE__ */ new WeakMap();
	_pool = /* @__PURE__ */ new WeakMap();
	MssqlDriver = class {
		constructor(config) {
			_classPrivateFieldInitSpec(this, _config$3, void 0);
			_classPrivateFieldInitSpec(this, _pool, void 0);
			_classPrivateFieldSet2(_config$3, this, freeze({ ...config }));
			const { tarn, tedious, validateConnections } = _classPrivateFieldGet2(_config$3, this);
			_classPrivateFieldSet2(_pool, this, new tarn.Pool({
				...tarn.options,
				create: async () => {
					return await new MssqlConnection(await tedious.connectionFactory(), tedious).connect();
				},
				destroy: async (connection) => {
					await connection[PRIVATE_DESTROY_METHOD]();
				},
				validate: validateConnections === false ? void 0 : (connection) => connection[PRIVATE_VALIDATE_METHOD]()
			}));
		}
		async init() {}
		async acquireConnection() {
			return await _classPrivateFieldGet2(_pool, this).acquire().promise;
		}
		async beginTransaction(connection, settings) {
			await connection.beginTransaction(settings);
		}
		async commitTransaction(connection) {
			await connection.commitTransaction();
		}
		async rollbackTransaction(connection) {
			await connection.rollbackTransaction();
		}
		async savepoint(connection, savepointName) {
			await connection.savepoint(savepointName);
		}
		async rollbackToSavepoint(connection, savepointName) {
			await connection.rollbackTransaction(savepointName);
		}
		async releaseConnection(connection) {
			if (_classPrivateFieldGet2(_config$3, this).resetConnectionsOnRelease) await connection[PRIVATE_RESET_METHOD]();
			_classPrivateFieldGet2(_pool, this).release(connection);
		}
		async destroy() {
			await _classPrivateFieldGet2(_pool, this).destroy();
		}
	};
	_connection$1 = /* @__PURE__ */ new WeakMap();
	_hasSocketError = /* @__PURE__ */ new WeakMap();
	_tedious = /* @__PURE__ */ new WeakMap();
	_inflightRequest = /* @__PURE__ */ new WeakMap();
	_MssqlConnection_brand = /* @__PURE__ */ new WeakSet();
	MssqlConnection = class {
		constructor(connection, tedious) {
			_classPrivateMethodInitSpec(this, _MssqlConnection_brand);
			_classPrivateFieldInitSpec(this, _connection$1, void 0);
			_classPrivateFieldInitSpec(this, _hasSocketError, void 0);
			_classPrivateFieldInitSpec(this, _tedious, void 0);
			_classPrivateFieldInitSpec(this, _inflightRequest, void 0);
			_classPrivateFieldSet2(_connection$1, this, connection);
			_classPrivateFieldSet2(_hasSocketError, this, false);
			_classPrivateFieldSet2(_tedious, this, tedious);
		}
		async beginTransaction(settings) {
			const { isolationLevel } = settings;
			await new Promise((resolve, reject) => _classPrivateFieldGet2(_connection$1, this).beginTransaction((error) => {
				if (error) reject(error);
				else resolve(void 0);
			}, isolationLevel ? randomString(8) : void 0, isolationLevel ? _assertClassBrand(_MssqlConnection_brand, this, _getTediousIsolationLevel).call(this, isolationLevel) : void 0));
		}
		async cancelQuery() {
			if (!_classPrivateFieldGet2(_inflightRequest, this)) return;
			return new Promise((resolve) => {
				_classPrivateFieldGet2(_inflightRequest, this)?.request.once("requestCompleted", resolve);
				if (!_classPrivateFieldGet2(_connection$1, this).cancel()) {
					_classPrivateFieldGet2(_inflightRequest, this)?.request.off("requestCompleted", resolve);
					resolve();
				}
			});
		}
		async commitTransaction() {
			await new Promise((resolve, reject) => _classPrivateFieldGet2(_connection$1, this).commitTransaction((error) => {
				if (error) reject(error);
				else resolve(void 0);
			}));
		}
		async connect() {
			const { promise: waitForConnected, reject, resolve } = new Deferred();
			_classPrivateFieldGet2(_connection$1, this).connect((error) => {
				if (error) return reject(error);
				resolve();
			});
			_classPrivateFieldGet2(_connection$1, this).on("error", (error) => {
				if (error instanceof Error && "code" in error && error.code === "ESOCKET") _classPrivateFieldSet2(_hasSocketError, this, true);
				console.error(error);
				reject(error);
			});
			function endListener() {
				reject(/* @__PURE__ */ new Error("The connection ended without ever completing the connection"));
			}
			_classPrivateFieldGet2(_connection$1, this).once("end", endListener);
			await waitForConnected;
			_classPrivateFieldGet2(_connection$1, this).off("end", endListener);
			return this;
		}
		async executeQuery(compiledQuery) {
			try {
				const deferred = new Deferred();
				_classPrivateFieldSet2(_inflightRequest, this, new MssqlRequest({
					compiledQuery,
					tedious: _classPrivateFieldGet2(_tedious, this),
					onDone: deferred
				}));
				_classPrivateFieldGet2(_connection$1, this).execSql(_classPrivateFieldGet2(_inflightRequest, this).request);
				const { rowCount, rows } = await deferred.promise;
				return {
					numAffectedRows: rowCount !== void 0 ? BigInt(rowCount) : void 0,
					rows
				};
			} catch (err) {
				throw extendStackTrace(err, /* @__PURE__ */ new Error());
			} finally {
				_classPrivateFieldSet2(_inflightRequest, this, void 0);
			}
		}
		async rollbackTransaction(savepointName) {
			await new Promise((resolve, reject) => _classPrivateFieldGet2(_connection$1, this).rollbackTransaction((error) => {
				if (error) reject(error);
				else resolve(void 0);
			}, savepointName));
		}
		async savepoint(savepointName) {
			await new Promise((resolve, reject) => _classPrivateFieldGet2(_connection$1, this).saveTransaction((error) => {
				if (error) reject(error);
				else resolve(void 0);
			}, savepointName));
		}
		async *streamQuery(compiledQuery, chunkSize) {
			_classPrivateFieldSet2(_inflightRequest, this, new MssqlRequest({
				compiledQuery,
				streamChunkSize: chunkSize,
				tedious: _classPrivateFieldGet2(_tedious, this)
			}));
			_classPrivateFieldGet2(_connection$1, this).execSql(_classPrivateFieldGet2(_inflightRequest, this).request);
			try {
				while (true) {
					const rows = await _classPrivateFieldGet2(_inflightRequest, this).readChunk();
					if (rows.length === 0) break;
					yield { rows };
					if (rows.length < chunkSize) break;
				}
			} finally {
				await this.cancelQuery();
				_classPrivateFieldSet2(_inflightRequest, this, void 0);
			}
		}
		[PRIVATE_DESTROY_METHOD]() {
			if ("closed" in _classPrivateFieldGet2(_connection$1, this) && _classPrivateFieldGet2(_connection$1, this).closed) return Promise.resolve();
			return new Promise((resolve) => {
				_classPrivateFieldGet2(_connection$1, this).once("end", resolve);
				_classPrivateFieldGet2(_connection$1, this).close();
			});
		}
		async [PRIVATE_RESET_METHOD]() {
			await new Promise((resolve, reject) => {
				_classPrivateFieldGet2(_connection$1, this).reset((error) => {
					if (error) return reject(error);
					resolve();
				});
			});
		}
		async [PRIVATE_VALIDATE_METHOD]() {
			if (_classPrivateFieldGet2(_hasSocketError, this) || _assertClassBrand(_MssqlConnection_brand, this, _isConnectionClosed).call(this)) return false;
			try {
				const deferred = new Deferred();
				const request = new MssqlRequest({
					compiledQuery: CompiledQuery.raw("select 1"),
					onDone: deferred,
					tedious: _classPrivateFieldGet2(_tedious, this)
				});
				_classPrivateFieldGet2(_connection$1, this).execSql(request.request);
				await deferred.promise;
				return true;
			} catch {
				return false;
			}
		}
	};
	_request = /* @__PURE__ */ new WeakMap();
	_rows = /* @__PURE__ */ new WeakMap();
	_streamChunkSize = /* @__PURE__ */ new WeakMap();
	_subscribers = /* @__PURE__ */ new WeakMap();
	_tedious2 = /* @__PURE__ */ new WeakMap();
	_rowCount = /* @__PURE__ */ new WeakMap();
	_MssqlRequest_brand = /* @__PURE__ */ new WeakSet();
	MssqlRequest = class {
		constructor(props) {
			_classPrivateMethodInitSpec(this, _MssqlRequest_brand);
			_classPrivateFieldInitSpec(this, _request, void 0);
			_classPrivateFieldInitSpec(this, _rows, void 0);
			_classPrivateFieldInitSpec(this, _streamChunkSize, void 0);
			_classPrivateFieldInitSpec(this, _subscribers, void 0);
			_classPrivateFieldInitSpec(this, _tedious2, void 0);
			_classPrivateFieldInitSpec(this, _rowCount, void 0);
			const { compiledQuery, onDone, streamChunkSize, tedious } = props;
			_classPrivateFieldSet2(_rows, this, []);
			_classPrivateFieldSet2(_streamChunkSize, this, streamChunkSize);
			_classPrivateFieldSet2(_subscribers, this, {});
			_classPrivateFieldSet2(_tedious2, this, tedious);
			if (onDone) {
				const subscriptionKey = "onDone";
				_classPrivateFieldGet2(_subscribers, this)[subscriptionKey] = (event, error) => {
					if (event === "chunkReady") return;
					delete _classPrivateFieldGet2(_subscribers, this)[subscriptionKey];
					if (event === "error") return onDone.reject(error);
					onDone.resolve({
						rowCount: _classPrivateFieldGet2(_rowCount, this),
						rows: _classPrivateFieldGet2(_rows, this)
					});
				};
			}
			_classPrivateFieldSet2(_request, this, new (_classPrivateFieldGet2(_tedious2, this)).Request(compiledQuery.sql, (err, rowCount) => {
				if (err) return Object.values(_classPrivateFieldGet2(_subscribers, this)).forEach((subscriber) => subscriber("error", err instanceof AggregateError ? err.errors : err));
				_classPrivateFieldSet2(_rowCount, this, rowCount);
			}));
			_assertClassBrand(_MssqlRequest_brand, this, _addParametersToRequest).call(this, compiledQuery.parameters);
			_assertClassBrand(_MssqlRequest_brand, this, _attachListeners).call(this);
		}
		get request() {
			return _classPrivateFieldGet2(_request, this);
		}
		readChunk() {
			const subscriptionKey = this.readChunk.name;
			return new Promise((resolve, reject) => {
				_classPrivateFieldGet2(_subscribers, this)[subscriptionKey] = (event, error) => {
					delete _classPrivateFieldGet2(_subscribers, this)[subscriptionKey];
					if (event === "error") return reject(error);
					resolve(_classPrivateFieldGet2(_rows, this).splice(0, _classPrivateFieldGet2(_streamChunkSize, this)));
				};
				_classPrivateFieldGet2(_request, this).resume();
			});
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/mssql/mssql-introspector.js
var _db, MssqlIntrospector;
var init_mssql_introspector = __esmMin((() => {
	init_migrator();
	init_object_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_db = /* @__PURE__ */ new WeakMap();
	MssqlIntrospector = class {
		constructor(db) {
			_classPrivateFieldInitSpec(this, _db, void 0);
			_classPrivateFieldSet2(_db, this, db);
		}
		async getSchemas() {
			return await _classPrivateFieldGet2(_db, this).selectFrom("sys.schemas").select("name").execute();
		}
		async getTables(options = { withInternalKyselyTables: false }) {
			const rawColumns = await _classPrivateFieldGet2(_db, this).selectFrom("sys.tables as tables").leftJoin("sys.schemas as table_schemas", "table_schemas.schema_id", "tables.schema_id").innerJoin("sys.columns as columns", "columns.object_id", "tables.object_id").innerJoin("sys.types as types", "types.user_type_id", "columns.user_type_id").leftJoin("sys.schemas as type_schemas", "type_schemas.schema_id", "types.schema_id").leftJoin("sys.extended_properties as comments", (join) => join.onRef("comments.major_id", "=", "tables.object_id").onRef("comments.minor_id", "=", "columns.column_id").on("comments.name", "=", "MS_Description")).$if(!options.withInternalKyselyTables, (qb) => qb.where("tables.name", "!=", DEFAULT_MIGRATION_TABLE).where("tables.name", "!=", DEFAULT_MIGRATION_LOCK_TABLE)).select([
				"tables.name as table_name",
				(eb) => eb.ref("tables.type").$castTo().as("table_type"),
				"table_schemas.name as table_schema_name",
				"columns.default_object_id as column_default_object_id",
				"columns.generated_always_type_desc as column_generated_always_type",
				"columns.is_computed as column_is_computed",
				"columns.is_identity as column_is_identity",
				"columns.is_nullable as column_is_nullable",
				"columns.is_rowguidcol as column_is_rowguidcol",
				"columns.name as column_name",
				"types.is_nullable as type_is_nullable",
				"types.name as type_name",
				"type_schemas.name as type_schema_name",
				"comments.value as column_comment"
			]).unionAll(_classPrivateFieldGet2(_db, this).selectFrom("sys.views as views").leftJoin("sys.schemas as view_schemas", "view_schemas.schema_id", "views.schema_id").innerJoin("sys.columns as columns", "columns.object_id", "views.object_id").innerJoin("sys.types as types", "types.user_type_id", "columns.user_type_id").leftJoin("sys.schemas as type_schemas", "type_schemas.schema_id", "types.schema_id").leftJoin("sys.extended_properties as comments", (join) => join.onRef("comments.major_id", "=", "views.object_id").onRef("comments.minor_id", "=", "columns.column_id").on("comments.name", "=", "MS_Description")).select([
				"views.name as table_name",
				"views.type as table_type",
				"view_schemas.name as table_schema_name",
				"columns.default_object_id as column_default_object_id",
				"columns.generated_always_type_desc as column_generated_always_type",
				"columns.is_computed as column_is_computed",
				"columns.is_identity as column_is_identity",
				"columns.is_nullable as column_is_nullable",
				"columns.is_rowguidcol as column_is_rowguidcol",
				"columns.name as column_name",
				"types.is_nullable as type_is_nullable",
				"types.name as type_name",
				"type_schemas.name as type_schema_name",
				"comments.value as column_comment"
			])).orderBy("table_schema_name").orderBy("table_name").orderBy("column_name").execute();
			const tableDictionary = {};
			for (const rawColumn of rawColumns) {
				const key = `${rawColumn.table_schema_name}.${rawColumn.table_name}`;
				(tableDictionary[key] = tableDictionary[key] || freeze({
					columns: [],
					isForeign: false,
					isView: rawColumn.table_type === "V ",
					name: rawColumn.table_name,
					schema: rawColumn.table_schema_name ?? void 0
				})).columns.push(freeze({
					dataType: rawColumn.type_name,
					dataTypeSchema: rawColumn.type_schema_name ?? void 0,
					hasDefaultValue: rawColumn.column_default_object_id > 0 || rawColumn.column_generated_always_type !== "NOT_APPLICABLE" || rawColumn.column_is_identity || rawColumn.column_is_computed || rawColumn.column_is_rowguidcol,
					isAutoIncrementing: rawColumn.column_is_identity,
					isNullable: rawColumn.column_is_nullable && rawColumn.type_is_nullable,
					name: rawColumn.column_name,
					comment: rawColumn.column_comment ?? void 0
				}));
			}
			return Object.values(tableDictionary);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/mssql/mssql-query-compiler.js
var COLLATION_CHAR_REGEX, MssqlQueryCompiler;
var init_mssql_query_compiler = __esmMin((() => {
	init_default_query_compiler();
	COLLATION_CHAR_REGEX = /^[a-z0-9_]$/i;
	MssqlQueryCompiler = class extends DefaultQueryCompiler {
		getCurrentParameterPlaceholder() {
			return `@${this.numParameters}`;
		}
		visitOffset(node) {
			super.visitOffset(node);
			this.append(" rows");
		}
		compileColumnAlterations(columnAlterations) {
			const nodesByKind = {};
			for (const columnAlteration of columnAlterations) {
				if (!nodesByKind[columnAlteration.kind]) nodesByKind[columnAlteration.kind] = [];
				nodesByKind[columnAlteration.kind].push(columnAlteration);
			}
			let first = true;
			if (nodesByKind.AddColumnNode) {
				this.append("add ");
				this.compileList(nodesByKind.AddColumnNode);
				first = false;
			}
			if (nodesByKind.AlterColumnNode) {
				if (!first) this.append(", ");
				this.compileList(nodesByKind.AlterColumnNode);
			}
			if (nodesByKind.DropColumnNode) {
				if (!first) this.append(", ");
				this.append("drop ");
				this.compileList(nodesByKind.DropColumnNode);
				first = false;
			}
			if (nodesByKind.ModifyColumnNode) {
				if (!first) this.append(", ");
				this.compileList(nodesByKind.ModifyColumnNode);
			}
			if (nodesByKind.RenameColumnNode) {
				if (!first) this.append(", ");
				this.compileList(nodesByKind.RenameColumnNode);
			}
		}
		visitAddColumn(node) {
			this.visitNode(node.column);
		}
		visitDropColumn(node) {
			this.append("column ");
			if (node.ifExists) this.append("if exists ");
			this.visitNode(node.column);
		}
		visitMergeQuery(node) {
			super.visitMergeQuery(node);
			this.append(";");
		}
		visitCollate(node) {
			this.append("collate ");
			const { name } = node.collation;
			for (const char of name) if (!COLLATION_CHAR_REGEX.test(char)) throw new Error(`Invalid collation: ${name}`);
			this.append(name);
		}
		announcesNewColumnDataType() {
			return false;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/mssql/mssql-dialect.js
var _config$2, MssqlDialect;
var init_mssql_dialect = __esmMin((() => {
	init_mssql_adapter();
	init_mssql_driver();
	init_mssql_introspector();
	init_mssql_query_compiler();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_config$2 = /* @__PURE__ */ new WeakMap();
	MssqlDialect = class {
		constructor(config) {
			_classPrivateFieldInitSpec(this, _config$2, void 0);
			_classPrivateFieldSet2(_config$2, this, config);
		}
		createDriver() {
			return new MssqlDriver(_classPrivateFieldGet2(_config$2, this));
		}
		createQueryCompiler() {
			return new MssqlQueryCompiler();
		}
		createAdapter() {
			return new MssqlAdapter();
		}
		createIntrospector(db) {
			return new MssqlIntrospector(db);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/pglite/pglite-adapter.js
var PGliteAdapter;
var init_pglite_adapter = __esmMin((() => {
	init_postgres_adapter();
	PGliteAdapter = class extends PostgresAdapter {
		get supportsMultipleConnections() {
			return false;
		}
		async acquireMigrationLock() {}
		async releaseMigrationLock() {}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/pglite/pglite-driver.js
var PRIVATE_BEGIN_TRANSACTION_METHOD, PRIVATE_COMMIT_TRANSACTION_METHOD, PRIVATE_ROLLBACK_TRANSACTION_METHOD, _config$1, _connection, _pglite, PGliteDriver, _pglite2, _commitTransaction, _rollbackTransaction, _transaction, _transactionClosedPromise, PGliteConnection;
var init_pglite_driver = __esmMin((() => {
	init_savepoint_parser();
	init_abort();
	init_deferred();
	init_object_utils();
	init_query_id();
	init_stack_trace_utils();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	PRIVATE_BEGIN_TRANSACTION_METHOD = Symbol();
	PRIVATE_COMMIT_TRANSACTION_METHOD = Symbol();
	PRIVATE_ROLLBACK_TRANSACTION_METHOD = Symbol();
	_config$1 = /* @__PURE__ */ new WeakMap();
	_connection = /* @__PURE__ */ new WeakMap();
	_pglite = /* @__PURE__ */ new WeakMap();
	PGliteDriver = class {
		constructor(config) {
			_classPrivateFieldInitSpec(this, _config$1, void 0);
			_classPrivateFieldInitSpec(this, _connection, void 0);
			_classPrivateFieldInitSpec(this, _pglite, void 0);
			_classPrivateFieldSet2(_config$1, this, freeze({ ...config }));
		}
		async acquireConnection() {
			return _classPrivateFieldGet2(_connection, this);
		}
		async beginTransaction(connection) {
			await connection[PRIVATE_BEGIN_TRANSACTION_METHOD]();
		}
		async commitTransaction(connection) {
			await connection[PRIVATE_COMMIT_TRANSACTION_METHOD]();
		}
		async destroy() {
			if (!_classPrivateFieldGet2(_pglite, this)?.closed) await _classPrivateFieldGet2(_pglite, this)?.close();
		}
		async init(options) {
			_classPrivateFieldGet2(_pglite, this) ?? _classPrivateFieldSet2(_pglite, this, isFunction(_classPrivateFieldGet2(_config$1, this).pglite) ? await _classPrivateFieldGet2(_config$1, this).pglite(options) : _classPrivateFieldGet2(_config$1, this).pglite);
			if (_classPrivateFieldGet2(_pglite, this).closed) throw new Error("PGlite instance is already closed.");
			if (!_classPrivateFieldGet2(_pglite, this).ready) await waitOrAbort(_classPrivateFieldGet2(_pglite, this).waitReady, options?.signal, "wait ready");
			_classPrivateFieldSet2(_connection, this, new PGliteConnection(_classPrivateFieldGet2(_pglite, this)));
			if (_classPrivateFieldGet2(_config$1, this).onCreateConnection) await _classPrivateFieldGet2(_config$1, this).onCreateConnection(_classPrivateFieldGet2(_connection, this), options);
		}
		async releaseConnection() {}
		async releaseSavepoint(connection, savepointName, compileQuery) {
			await connection.executeQuery(compileQuery(parseSavepointCommand("release", savepointName), createQueryId()));
		}
		async rollbackToSavepoint(connection, savepointName, compileQuery) {
			await connection.executeQuery(compileQuery(parseSavepointCommand("rollback to", savepointName), createQueryId()));
		}
		async rollbackTransaction(connection) {
			await connection[PRIVATE_ROLLBACK_TRANSACTION_METHOD]();
		}
		async savepoint(connection, savepointName, compileQuery) {
			await connection.executeQuery(compileQuery(parseSavepointCommand("savepoint", savepointName), createQueryId()));
		}
	};
	_pglite2 = /* @__PURE__ */ new WeakMap();
	_commitTransaction = /* @__PURE__ */ new WeakMap();
	_rollbackTransaction = /* @__PURE__ */ new WeakMap();
	_transaction = /* @__PURE__ */ new WeakMap();
	_transactionClosedPromise = /* @__PURE__ */ new WeakMap();
	PGliteConnection = class {
		constructor(pglite) {
			_classPrivateFieldInitSpec(this, _pglite2, void 0);
			_classPrivateFieldInitSpec(this, _commitTransaction, void 0);
			_classPrivateFieldInitSpec(this, _rollbackTransaction, void 0);
			_classPrivateFieldInitSpec(this, _transaction, void 0);
			_classPrivateFieldInitSpec(this, _transactionClosedPromise, void 0);
			_classPrivateFieldSet2(_pglite2, this, pglite);
		}
		async executeQuery(compiledQuery) {
			try {
				const { affectedRows, rows } = await (_classPrivateFieldGet2(_transaction, this) || _classPrivateFieldGet2(_pglite2, this)).query(compiledQuery.sql, compiledQuery.parameters, { rowMode: "object" });
				return {
					numAffectedRows: affectedRows != null ? BigInt(affectedRows) : void 0,
					rows: rows || []
				};
			} catch (error) {
				throw extendStackTrace(error, /* @__PURE__ */ new Error());
			}
		}
		async *streamQuery() {
			throw new Error("Streaming is not supported by PGlite.");
		}
		async [PRIVATE_BEGIN_TRANSACTION_METHOD]() {
			const { promise: waitForCommit, reject: rollback, resolve: commit } = new Deferred();
			const { promise: waitForBegin, resolve: hasBegun } = new Deferred();
			_classPrivateFieldSet2(_commitTransaction, this, commit);
			_classPrivateFieldSet2(_rollbackTransaction, this, rollback);
			_classPrivateFieldSet2(_transactionClosedPromise, this, _classPrivateFieldGet2(_pglite2, this).transaction(async (tx) => {
				_classPrivateFieldSet2(_transaction, this, tx);
				hasBegun();
				await waitForCommit;
			}));
			await waitForBegin;
		}
		async [PRIVATE_COMMIT_TRANSACTION_METHOD]() {
			_classPrivateFieldGet2(_commitTransaction, this)?.call(this);
			await _classPrivateFieldGet2(_transactionClosedPromise, this);
			_classPrivateFieldSet2(_commitTransaction, this, void 0);
			_classPrivateFieldSet2(_rollbackTransaction, this, void 0);
			_classPrivateFieldSet2(_transaction, this, void 0);
			_classPrivateFieldSet2(_transactionClosedPromise, this, void 0);
		}
		async [PRIVATE_ROLLBACK_TRANSACTION_METHOD]() {
			_classPrivateFieldGet2(_rollbackTransaction, this)?.call(this);
			await _classPrivateFieldGet2(_transactionClosedPromise, this)?.catch(() => {});
			_classPrivateFieldSet2(_commitTransaction, this, void 0);
			_classPrivateFieldSet2(_rollbackTransaction, this, void 0);
			_classPrivateFieldSet2(_transaction, this, void 0);
			_classPrivateFieldSet2(_transactionClosedPromise, this, void 0);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/pglite/pglite-dialect.js
var _config, PGliteDialect;
var init_pglite_dialect = __esmMin((() => {
	init_postgres_introspector();
	init_postgres_query_compiler();
	init_pglite_adapter();
	init_pglite_driver();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_config = /* @__PURE__ */ new WeakMap();
	PGliteDialect = class {
		constructor(config) {
			_classPrivateFieldInitSpec(this, _config, void 0);
			_classPrivateFieldSet2(_config, this, config);
		}
		createAdapter() {
			return new PGliteAdapter();
		}
		createDriver() {
			return new PGliteDriver(_classPrivateFieldGet2(_config, this));
		}
		createIntrospector(db) {
			return new PostgresIntrospector(db);
		}
		createQueryCompiler() {
			return new PostgresQueryCompiler();
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/camel-case/camel-case-transformer.js
var _snakeCase$1, SnakeCaseTransformer;
var init_camel_case_transformer = __esmMin((() => {
	init_operation_node_transformer();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_snakeCase$1 = /* @__PURE__ */ new WeakMap();
	SnakeCaseTransformer = class extends OperationNodeTransformer {
		constructor(snakeCase) {
			super();
			_classPrivateFieldInitSpec(this, _snakeCase$1, void 0);
			_classPrivateFieldSet2(_snakeCase$1, this, snakeCase);
		}
		transformIdentifier(node, queryId) {
			node = super.transformIdentifier(node, queryId);
			return {
				...node,
				name: _classPrivateFieldGet2(_snakeCase$1, this).call(this, node.name)
			};
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/camel-case/camel-case.js
/**
* Creates a function that transforms camel case strings to snake case.
*/
function createSnakeCaseMapper({ upperCase = false, underscoreBeforeDigits = false, underscoreBetweenUppercaseLetters = false } = {}) {
	return memoize((str) => {
		if (str.length === 0) return str;
		const upper = str.toUpperCase();
		const lower = str.toLowerCase();
		let out = lower[0];
		for (let i = 1, l = str.length; i < l; ++i) {
			const char = str[i];
			const prevChar = str[i - 1];
			const upperChar = upper[i];
			const prevUpperChar = upper[i - 1];
			const lowerChar = lower[i];
			const prevLowerChar = lower[i - 1];
			if (underscoreBeforeDigits && isDigit(char) && !isDigit(prevChar) && !out.endsWith("_")) {
				out += "_" + char;
				continue;
			}
			if (char === upperChar && upperChar !== lowerChar) if (underscoreBetweenUppercaseLetters || !(prevChar === prevUpperChar && prevUpperChar !== prevLowerChar)) out += "_" + lowerChar;
			else out += lowerChar;
			else out += char;
		}
		if (upperCase) return out.toUpperCase();
		else return out;
	});
}
/**
* Creates a function that transforms snake case strings to camel case.
*/
function createCamelCaseMapper({ upperCase = false } = {}) {
	return memoize((str) => {
		if (str.length === 0) return str;
		if (upperCase && isAllUpperCaseSnakeCase(str)) str = str.toLowerCase();
		let out = str[0];
		for (let i = 1, l = str.length; i < l; ++i) {
			const char = str[i];
			const prevChar = str[i - 1];
			if (char !== "_") if (prevChar === "_") out += char.toUpperCase();
			else out += char;
		}
		return out;
	});
}
function isAllUpperCaseSnakeCase(str) {
	for (let i = 1, l = str.length; i < l; ++i) {
		const char = str[i];
		if (char !== "_" && char !== char.toUpperCase()) return false;
	}
	return true;
}
function isDigit(char) {
	return char >= "0" && char <= "9";
}
function memoize(func) {
	const cache = /* @__PURE__ */ new Map();
	return (str) => {
		let mapped = cache.get(str);
		if (!mapped) {
			mapped = func(str);
			cache.set(str, mapped);
		}
		return mapped;
	};
}
var init_camel_case = __esmMin((() => {}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/camel-case/camel-case-plugin.js
function canMap(obj, opt) {
	return isPlainObject(obj) && !opt?.maintainNestedObjectKeys;
}
var _camelCase, _snakeCase, _snakeCaseTransformer, CamelCasePlugin;
var init_camel_case_plugin = __esmMin((() => {
	init_object_utils();
	init_camel_case_transformer();
	init_camel_case();
	init_defineProperty();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_camelCase = /* @__PURE__ */ new WeakMap();
	_snakeCase = /* @__PURE__ */ new WeakMap();
	_snakeCaseTransformer = /* @__PURE__ */ new WeakMap();
	CamelCasePlugin = class {
		constructor(opt = {}) {
			_defineProperty(this, "opt", void 0);
			_classPrivateFieldInitSpec(this, _camelCase, void 0);
			_classPrivateFieldInitSpec(this, _snakeCase, void 0);
			_classPrivateFieldInitSpec(this, _snakeCaseTransformer, void 0);
			this.opt = opt;
			_classPrivateFieldSet2(_camelCase, this, createCamelCaseMapper(opt));
			_classPrivateFieldSet2(_snakeCase, this, createSnakeCaseMapper(opt));
			_classPrivateFieldSet2(_snakeCaseTransformer, this, new SnakeCaseTransformer(this.snakeCase.bind(this)));
		}
		transformQuery(args) {
			return _classPrivateFieldGet2(_snakeCaseTransformer, this).transformNode(args.node, args.queryId);
		}
		async transformResult(args) {
			if (args.result.rows && Array.isArray(args.result.rows)) return {
				...args.result,
				rows: args.result.rows.map((row) => this.mapRow(row))
			};
			return args.result;
		}
		mapRow(row) {
			return Object.keys(row).reduce((obj, key) => {
				let value = row[key];
				if (Array.isArray(value)) value = value.map((it) => canMap(it, this.opt) ? this.mapRow(it) : it);
				else if (canMap(value, this.opt)) value = this.mapRow(value);
				obj[this.camelCase(key)] = value;
				return obj;
			}, {});
		}
		snakeCase(str) {
			return _classPrivateFieldGet2(_snakeCase, this).call(this, str);
		}
		camelCase(str) {
			return _classPrivateFieldGet2(_camelCase, this).call(this, str);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/deduplicate-joins/deduplicate-joins-transformer.js
function _transformQuery(node) {
	if (!node.joins || node.joins.length === 0) return node;
	return freeze({
		...node,
		joins: _assertClassBrand(_DeduplicateJoinsTransformer_brand, this, _deduplicateJoins).call(this, node.joins)
	});
}
function _deduplicateJoins(joins) {
	const out = [];
	for (let i = 0; i < joins.length; ++i) {
		let foundDuplicate = false;
		for (let j = 0; j < out.length; ++j) if (compare(joins[i], out[j])) {
			foundDuplicate = true;
			break;
		}
		if (!foundDuplicate) out.push(joins[i]);
	}
	return freeze(out);
}
var _DeduplicateJoinsTransformer_brand, DeduplicateJoinsTransformer;
var init_deduplicate_joins_transformer = __esmMin((() => {
	init_operation_node_transformer();
	init_object_utils();
	init_classPrivateMethodInitSpec();
	init_assertClassBrand();
	_DeduplicateJoinsTransformer_brand = /* @__PURE__ */ new WeakSet();
	DeduplicateJoinsTransformer = class extends OperationNodeTransformer {
		constructor(..._args) {
			super(..._args);
			_classPrivateMethodInitSpec(this, _DeduplicateJoinsTransformer_brand);
		}
		transformSelectQuery(node, queryId) {
			return _assertClassBrand(_DeduplicateJoinsTransformer_brand, this, _transformQuery).call(this, super.transformSelectQuery(node, queryId));
		}
		transformUpdateQuery(node, queryId) {
			return _assertClassBrand(_DeduplicateJoinsTransformer_brand, this, _transformQuery).call(this, super.transformUpdateQuery(node, queryId));
		}
		transformDeleteQuery(node, queryId) {
			return _assertClassBrand(_DeduplicateJoinsTransformer_brand, this, _transformQuery).call(this, super.transformDeleteQuery(node, queryId));
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/deduplicate-joins/deduplicate-joins-plugin.js
var _transformer$2, DeduplicateJoinsPlugin;
var init_deduplicate_joins_plugin = __esmMin((() => {
	init_deduplicate_joins_transformer();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldGet2();
	_transformer$2 = /* @__PURE__ */ new WeakMap();
	DeduplicateJoinsPlugin = class {
		constructor() {
			_classPrivateFieldInitSpec(this, _transformer$2, new DeduplicateJoinsTransformer());
		}
		transformQuery(args) {
			return _classPrivateFieldGet2(_transformer$2, this).transformNode(args.node, args.queryId);
		}
		transformResult(args) {
			return Promise.resolve(args.result);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/parse-json-results/parse-json-results-plugin.js
function parseArray(arr, jsonPath, options) {
	const target = options.objectStrategy === "create" ? new Array(arr.length) : arr;
	for (let i = 0; i < arr.length; ++i) target[i] = parse(arr[i], `${jsonPath}[${i}]`, options);
	return target;
}
function parse(value, jsonPath, options) {
	if (isString(value)) return parseString(value, jsonPath, options);
	if (Array.isArray(value)) return parseArray(value, jsonPath, options);
	if (isPlainObject(value)) return parseObject(value, jsonPath, options);
	return value;
}
function parseString(str, jsonPath, options) {
	const { shouldParse } = options;
	if (!shouldParse(str, jsonPath)) return str;
	try {
		return parse(JSON.parse(str, (key, value, ...otherArgs) => {
			if (key === "__proto__") return;
			if (key === "constructor" && isPlainObject(value) && Object.hasOwn(value, "prototype")) delete value.prototype;
			return options.reviver(key, value, ...otherArgs);
		}), jsonPath, {
			...options,
			objectStrategy: "in-place"
		});
	} catch (error) {
		if (shouldParse !== maybeJson) throw error;
		console.error(error);
		return str;
	}
}
function maybeJson(value) {
	return value.startsWith("{") && value.endsWith("}") || value.startsWith("[") && value.endsWith("]");
}
function parseObject(obj, jsonPath, options) {
	const { objectStrategy } = options;
	const target = objectStrategy === "create" ? {} : obj;
	for (const key of Object.keys(obj)) {
		if (key === "__proto__") continue;
		const parsed = parse(obj[key], `${jsonPath}."${key}"`, options);
		if (key === "constructor" && isPlainObject(parsed) && Object.hasOwn(parsed, "prototype")) delete parsed.prototype;
		target[key] = parsed;
	}
	return target;
}
var _options, ParseJSONResultsPlugin;
var init_parse_json_results_plugin = __esmMin((() => {
	init_object_utils();
	init_defineProperty();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_options = /* @__PURE__ */ new WeakMap();
	ParseJSONResultsPlugin = class {
		constructor(options = {}) {
			_defineProperty(this, "options", void 0);
			_classPrivateFieldInitSpec(this, _options, void 0);
			this.options = options;
			const { shouldParse } = options;
			_classPrivateFieldSet2(_options, this, freeze({
				objectStrategy: options.objectStrategy || "in-place",
				reviver: options.reviver || ((_, value) => value),
				shouldParse: shouldParse ? (value, jsonPath) => maybeJson(value) && shouldParse(value, jsonPath) : maybeJson
			}));
		}
		transformQuery(args) {
			return args.node;
		}
		async transformResult(args) {
			return {
				...args.result,
				rows: parseArray(args.result.rows, "$", _classPrivateFieldGet2(_options, this))
			};
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/handle-empty-in-lists/handle-empty-in-lists-transformer.js
function _isEmptyInListNode(node) {
	const { operator, rightOperand } = node;
	return (PrimitiveValueListNode.is(rightOperand) || ValueListNode.is(rightOperand)) && rightOperand.values.length === 0 && OperatorNode.is(operator) && (operator.operator === "in" || operator.operator === "not in");
}
var _strategy, _HandleEmptyInListsTransformer_brand, HandleEmptyInListsTransformer;
var init_handle_empty_in_lists_transformer = __esmMin((() => {
	init_operation_node_transformer();
	init_primitive_value_list_node();
	init_operator_node();
	init_value_list_node();
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_assertClassBrand();
	init_classPrivateFieldGet2();
	_strategy = /* @__PURE__ */ new WeakMap();
	_HandleEmptyInListsTransformer_brand = /* @__PURE__ */ new WeakSet();
	HandleEmptyInListsTransformer = class extends OperationNodeTransformer {
		constructor(strategy) {
			super();
			_classPrivateMethodInitSpec(this, _HandleEmptyInListsTransformer_brand);
			_classPrivateFieldInitSpec(this, _strategy, void 0);
			_classPrivateFieldSet2(_strategy, this, strategy);
		}
		transformBinaryOperation(node) {
			if (_assertClassBrand(_HandleEmptyInListsTransformer_brand, this, _isEmptyInListNode).call(this, node)) return _classPrivateFieldGet2(_strategy, this).call(this, node);
			return node;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/handle-empty-in-lists/handle-empty-in-lists-plugin.js
var _transformer$1, HandleEmptyInListsPlugin;
var init_handle_empty_in_lists_plugin = __esmMin((() => {
	init_handle_empty_in_lists_transformer();
	init_defineProperty();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	_transformer$1 = /* @__PURE__ */ new WeakMap();
	HandleEmptyInListsPlugin = class {
		constructor(opt) {
			_defineProperty(this, "opt", void 0);
			_classPrivateFieldInitSpec(this, _transformer$1, void 0);
			this.opt = opt;
			_classPrivateFieldSet2(_transformer$1, this, new HandleEmptyInListsTransformer(opt.strategy));
		}
		transformQuery(args) {
			return _classPrivateFieldGet2(_transformer$1, this).transformNode(args.node, args.queryId);
		}
		async transformResult(args) {
			return args.result;
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/handle-empty-in-lists/handle-empty-in-lists.js
/**
* Replaces the `in`/`not in` expression with a noncontingent expression (always true or always
* false) depending on the original operator.
*
* This is how Knex.js, PrismaORM, Laravel, and SQLAlchemy handle `in ()` and `not in ()`.
*
* See {@link pushValueIntoList} for an alternative strategy.
*/
function replaceWithNoncontingentExpression(node) {
	const _one = one || (one = ValueNode.createImmediate(1));
	const _eq = eq || (eq = OperatorNode.create("="));
	if (node.operator.operator === "in") return contradiction || (contradiction = BinaryOperationNode.create(_one, _eq, ValueNode.createImmediate(0)));
	return tautology || (tautology = BinaryOperationNode.create(_one, _eq, _one));
}
/**
* When `in`, pushes a `null` value into the list resulting in `in (null)`. This
* is how TypeORM and Sequelize handle `in ()`. `in (null)` is logically the equivalent
* of `= null`, which returns `null`, which is a falsy expression in most SQL databases.
* We recommend NOT using this strategy if you plan to use `in` in `select`, `returning`,
* or `output` clauses, as the return type differs from the `SqlBool` default type.
*
* When `not in`, casts the left operand as `char` and pushes a literal value into
* the list resulting in `cast({{lhs}} as char) not in ({{VALUE}})`. Casting
* is required to avoid database errors with non-string columns.
*
* See {@link replaceWithNoncontingentExpression} for an alternative strategy.
*/
function pushValueIntoList(uniqueNotInLiteral) {
	return function pushValueIntoList(node) {
		if (node.operator.operator === "in") return freeze({
			...node,
			rightOperand: listNull || (listNull = ValueListNode.create([ValueNode.createImmediate(null)]))
		});
		return freeze({
			...node,
			leftOperand: CastNode.create(node.leftOperand, char || (char = DataTypeNode.create("char"))),
			rightOperand: listVal || (listVal = ValueListNode.create([ValueNode.createImmediate(uniqueNotInLiteral)]))
		});
	};
}
var contradiction, eq, one, tautology, char, listNull, listVal;
var init_handle_empty_in_lists = __esmMin((() => {
	init_binary_operation_node();
	init_cast_node();
	init_data_type_node();
	init_operator_node();
	init_value_list_node();
	init_value_node();
	init_object_utils();
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/safe-null-comparison/safe-null-comparison-transformer.js
var SafeNullComparisonTransformer;
var init_safe_null_comparison_transformer = __esmMin((() => {
	init_binary_operation_node();
	init_operation_node_transformer();
	init_operator_node();
	init_value_node();
	SafeNullComparisonTransformer = class extends OperationNodeTransformer {
		transformBinaryOperation(node) {
			const { operator, leftOperand, rightOperand } = super.transformBinaryOperation(node);
			if (!ValueNode.is(rightOperand) || rightOperand.value !== null || !OperatorNode.is(operator)) return node;
			const op = operator.operator;
			if (op !== "=" && op !== "!=" && op !== "<>") return node;
			return BinaryOperationNode.create(leftOperand, OperatorNode.create(op === "=" ? "is" : "is not"), rightOperand);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/safe-null-comparison/safe-null-comparison-plugin.js
var _transformer, SafeNullComparisonPlugin;
var init_safe_null_comparison_plugin = __esmMin((() => {
	init_safe_null_comparison_transformer();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldGet2();
	_transformer = /* @__PURE__ */ new WeakMap();
	SafeNullComparisonPlugin = class {
		constructor() {
			_classPrivateFieldInitSpec(this, _transformer, new SafeNullComparisonTransformer());
		}
		transformQuery(args) {
			return _classPrivateFieldGet2(_transformer, this).transformNode(args.node);
		}
		transformResult(args) {
			return Promise.resolve(args.result);
		}
	};
}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/constraint-node.js
var init_constraint_node = __esmMin((() => {}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/simple-reference-expression-node.js
var init_simple_reference_expression_node = __esmMin((() => {}));
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/index.js
var dist_exports = /* @__PURE__ */ __exportAll({
	ARITHMETIC_OPERATORS: () => ARITHMETIC_OPERATORS,
	AddColumnNode: () => AddColumnNode,
	AddConstraintNode: () => AddConstraintNode,
	AddIndexNode: () => AddIndexNode,
	AddValueNode: () => AddValueNode,
	AggregateFunctionBuilder: () => AggregateFunctionBuilder,
	AggregateFunctionNode: () => AggregateFunctionNode,
	AliasNode: () => AliasNode,
	AliasedAggregateFunctionBuilder: () => AliasedAggregateFunctionBuilder,
	AliasedDynamicTableBuilder: () => AliasedDynamicTableBuilder,
	AliasedExpressionWrapper: () => AliasedExpressionWrapper,
	AliasedJSONPathBuilder: () => AliasedJSONPathBuilder,
	AlterColumnBuilder: () => AlterColumnBuilder,
	AlterColumnNode: () => AlterColumnNode,
	AlterTableBuilder: () => AlterTableBuilder,
	AlterTableColumnAlteringBuilder: () => AlterTableColumnAlteringBuilder,
	AlterTableNode: () => AlterTableNode,
	AlterTypeNode: () => AlterTypeNode,
	AlteredColumnBuilder: () => AlteredColumnBuilder,
	AndNode: () => AndNode,
	AndWrapper: () => AndWrapper,
	BINARY_OPERATORS: () => BINARY_OPERATORS,
	BinaryOperationNode: () => BinaryOperationNode,
	COMPARISON_OPERATORS: () => COMPARISON_OPERATORS,
	CamelCasePlugin: () => CamelCasePlugin,
	CaseBuilder: () => CaseBuilder,
	CaseEndBuilder: () => CaseEndBuilder,
	CaseNode: () => CaseNode,
	CaseThenBuilder: () => CaseThenBuilder,
	CaseWhenBuilder: () => CaseWhenBuilder,
	CastNode: () => CastNode,
	CheckConstraintNode: () => CheckConstraintNode,
	CollateNode: () => CollateNode,
	ColumnDefinitionBuilder: () => ColumnDefinitionBuilder,
	ColumnDefinitionNode: () => ColumnDefinitionNode,
	ColumnNode: () => ColumnNode,
	ColumnUpdateNode: () => ColumnUpdateNode,
	Command: () => Command,
	CommonTableExpressionNameNode: () => CommonTableExpressionNameNode,
	CommonTableExpressionNode: () => CommonTableExpressionNode,
	CompiledQuery: () => CompiledQuery,
	ConnectionBuilder: () => ConnectionBuilder,
	ControlledTransaction: () => ControlledTransaction,
	ControlledTransactionBuilder: () => ControlledTransactionBuilder,
	CreateIndexBuilder: () => CreateIndexBuilder,
	CreateIndexNode: () => CreateIndexNode,
	CreateSchemaBuilder: () => CreateSchemaBuilder,
	CreateSchemaNode: () => CreateSchemaNode,
	CreateTableBuilder: () => CreateTableBuilder,
	CreateTableNode: () => CreateTableNode,
	CreateTypeBuilder: () => CreateTypeBuilder,
	CreateTypeNode: () => CreateTypeNode,
	CreateViewBuilder: () => CreateViewBuilder,
	CreateViewNode: () => CreateViewNode,
	DataTypeNode: () => DataTypeNode,
	DeduplicateJoinsPlugin: () => DeduplicateJoinsPlugin,
	DefaultConnectionProvider: () => DefaultConnectionProvider,
	DefaultInsertValueNode: () => DefaultInsertValueNode,
	DefaultQueryCompiler: () => DefaultQueryCompiler,
	DefaultQueryExecutor: () => DefaultQueryExecutor,
	DefaultValueNode: () => DefaultValueNode,
	DeleteQueryBuilder: () => DeleteQueryBuilder,
	DeleteQueryNode: () => DeleteQueryNode,
	DeleteResult: () => DeleteResult,
	DialectAdapterBase: () => DialectAdapterBase,
	DropColumnBuilder: () => DropColumnBuilder,
	DropColumnNode: () => DropColumnNode,
	DropConstraintNode: () => DropConstraintNode,
	DropIndexBuilder: () => DropIndexBuilder,
	DropIndexNode: () => DropIndexNode,
	DropSchemaBuilder: () => DropSchemaBuilder,
	DropSchemaNode: () => DropSchemaNode,
	DropTableBuilder: () => DropTableBuilder,
	DropTableNode: () => DropTableNode,
	DropTypeBuilder: () => DropTypeBuilder,
	DropTypeNode: () => DropTypeNode,
	DropViewBuilder: () => DropViewBuilder,
	DropViewNode: () => DropViewNode,
	DummyDriver: () => DummyDriver,
	DynamicModule: () => DynamicModule,
	DynamicReferenceBuilder: () => DynamicReferenceBuilder,
	DynamicTableBuilder: () => DynamicTableBuilder,
	ExplainNode: () => ExplainNode,
	ExpressionWrapper: () => ExpressionWrapper,
	FetchNode: () => FetchNode,
	ForeignKeyConstraintBuilder: () => ForeignKeyConstraintBuilder,
	ForeignKeyConstraintNode: () => ForeignKeyConstraintNode,
	FromNode: () => FromNode,
	FunctionNode: () => FunctionNode,
	GeneratedNode: () => GeneratedNode,
	GroupByItemNode: () => GroupByItemNode,
	GroupByNode: () => GroupByNode,
	HandleEmptyInListsPlugin: () => HandleEmptyInListsPlugin,
	HavingNode: () => HavingNode,
	IdentifierNode: () => IdentifierNode,
	InsertQueryBuilder: () => InsertQueryBuilder,
	InsertQueryNode: () => InsertQueryNode,
	InsertResult: () => InsertResult,
	JSONOperatorChainNode: () => JSONOperatorChainNode,
	JSONPathBuilder: () => JSONPathBuilder,
	JSONPathLegNode: () => JSONPathLegNode,
	JSONPathNode: () => JSONPathNode,
	JSONReferenceNode: () => JSONReferenceNode,
	JSON_OPERATORS: () => JSON_OPERATORS,
	JoinBuilder: () => JoinBuilder,
	JoinNode: () => JoinNode,
	Kysely: () => Kysely,
	LOG_LEVELS: () => LOG_LEVELS,
	LimitNode: () => LimitNode,
	ListNode: () => ListNode,
	Log: () => Log,
	MatchedNode: () => MatchedNode,
	MatchedThenableMergeQueryBuilder: () => MatchedThenableMergeQueryBuilder,
	MergeQueryBuilder: () => MergeQueryBuilder,
	MergeQueryNode: () => MergeQueryNode,
	MergeResult: () => MergeResult,
	ModifyColumnNode: () => ModifyColumnNode,
	MssqlAdapter: () => MssqlAdapter,
	MssqlDialect: () => MssqlDialect,
	MssqlDriver: () => MssqlDriver,
	MssqlIntrospector: () => MssqlIntrospector,
	MssqlQueryCompiler: () => MssqlQueryCompiler,
	MysqlAdapter: () => MysqlAdapter,
	MysqlDialect: () => MysqlDialect,
	MysqlDriver: () => MysqlDriver,
	MysqlIntrospector: () => MysqlIntrospector,
	MysqlQueryCompiler: () => MysqlQueryCompiler,
	NOOP_QUERY_EXECUTOR: () => NOOP_QUERY_EXECUTOR,
	NoResultError: () => NoResultError,
	NoopQueryExecutor: () => NoopQueryExecutor,
	NotMatchedThenableMergeQueryBuilder: () => NotMatchedThenableMergeQueryBuilder,
	ON_COMMIT_ACTIONS: () => ON_COMMIT_ACTIONS,
	ON_MODIFY_FOREIGN_ACTIONS: () => ON_MODIFY_FOREIGN_ACTIONS,
	OPERATORS: () => OPERATORS,
	OffsetNode: () => OffsetNode,
	OnConflictBuilder: () => OnConflictBuilder,
	OnConflictDoNothingBuilder: () => OnConflictDoNothingBuilder,
	OnConflictNode: () => OnConflictNode,
	OnConflictUpdateBuilder: () => OnConflictUpdateBuilder,
	OnDuplicateKeyNode: () => OnDuplicateKeyNode,
	OnNode: () => OnNode,
	OperationNodeTransformer: () => OperationNodeTransformer,
	OperationNodeVisitor: () => OperationNodeVisitor,
	OperatorNode: () => OperatorNode,
	OrActionNode: () => OrActionNode,
	OrNode: () => OrNode,
	OrWrapper: () => OrWrapper,
	OrderByItemBuilder: () => OrderByItemBuilder,
	OrderByItemNode: () => OrderByItemNode,
	OrderByNode: () => OrderByNode,
	OutputNode: () => OutputNode,
	OverNode: () => OverNode,
	PGliteAdapter: () => PGliteAdapter,
	PGliteDialect: () => PGliteDialect,
	PGliteDriver: () => PGliteDriver,
	ParensNode: () => ParensNode,
	ParseJSONResultsPlugin: () => ParseJSONResultsPlugin,
	PartitionByItemNode: () => PartitionByItemNode,
	PartitionByNode: () => PartitionByNode,
	PostgresAdapter: () => PostgresAdapter,
	PostgresDialect: () => PostgresDialect,
	PostgresDriver: () => PostgresDriver,
	PostgresIntrospector: () => PostgresIntrospector,
	PostgresQueryCompiler: () => PostgresQueryCompiler,
	PrimaryKeyConstraintNode: () => PrimaryKeyConstraintNode,
	PrimitiveValueListNode: () => PrimitiveValueListNode,
	QueryCreator: () => QueryCreator,
	QueryFinalizer: () => QueryFinalizer,
	QueryNode: () => QueryNode,
	RawNode: () => RawNode,
	ReferenceNode: () => ReferenceNode,
	ReferencesNode: () => ReferencesNode,
	RefreshMaterializedViewBuilder: () => RefreshMaterializedViewBuilder,
	RefreshMaterializedViewNode: () => RefreshMaterializedViewNode,
	RenameColumnNode: () => RenameColumnNode,
	RenameConstraintNode: () => RenameConstraintNode,
	RenameValueNode: () => RenameValueNode,
	ReturningNode: () => ReturningNode,
	SafeNullComparisonPlugin: () => SafeNullComparisonPlugin,
	SchemaModule: () => SchemaModule,
	SchemableIdentifierNode: () => SchemableIdentifierNode,
	SelectAllNode: () => SelectAllNode,
	SelectModifierNode: () => SelectModifierNode,
	SelectQueryNode: () => SelectQueryNode,
	SelectionNode: () => SelectionNode,
	SetOperationNode: () => SetOperationNode,
	SingleConnectionProvider: () => SingleConnectionProvider,
	SqliteAdapter: () => SqliteAdapter,
	SqliteDialect: () => SqliteDialect,
	SqliteDriver: () => SqliteDriver,
	SqliteIntrospector: () => SqliteIntrospector,
	SqliteQueryCompiler: () => SqliteQueryCompiler,
	TRANSACTION_ACCESS_MODES: () => TRANSACTION_ACCESS_MODES,
	TRANSACTION_ISOLATION_LEVELS: () => TRANSACTION_ISOLATION_LEVELS,
	TableNode: () => TableNode,
	TopNode: () => TopNode,
	Transaction: () => Transaction,
	TransactionBuilder: () => TransactionBuilder,
	TraversedJSONPathBuilder: () => TraversedJSONPathBuilder,
	TupleNode: () => TupleNode,
	UNARY_FILTER_OPERATORS: () => UNARY_FILTER_OPERATORS,
	UNARY_OPERATORS: () => UNARY_OPERATORS,
	UnaryOperationNode: () => UnaryOperationNode,
	UniqueConstraintNode: () => UniqueConstraintNode,
	UpdateQueryBuilder: () => UpdateQueryBuilder,
	UpdateQueryNode: () => UpdateQueryNode,
	UpdateResult: () => UpdateResult,
	UsingNode: () => UsingNode,
	ValueListNode: () => ValueListNode,
	ValueNode: () => ValueNode,
	ValuesNode: () => ValuesNode,
	WhenNode: () => WhenNode,
	WheneableMergeQueryBuilder: () => WheneableMergeQueryBuilder,
	WhereNode: () => WhereNode,
	WithNode: () => WithNode,
	WithSchemaPlugin: () => WithSchemaPlugin,
	createFunctionModule: () => createFunctionModule,
	createQueryId: () => createQueryId,
	createRawBuilder: () => createRawBuilder,
	createSelectQueryBuilder: () => createSelectQueryBuilder,
	expressionBuilder: () => expressionBuilder,
	isAliasedDynamicTableBuilder: () => isAliasedDynamicTableBuilder,
	isAliasedExpression: () => isAliasedExpression,
	isArithmeticOperator: () => isArithmeticOperator,
	isBinaryOperator: () => isBinaryOperator,
	isColumnDataType: () => isColumnDataType,
	isComparisonOperator: () => isComparisonOperator,
	isCompilable: () => isCompilable,
	isCompiledQuery: () => isCompiledQuery,
	isDynamicReferenceBuilder: () => isDynamicReferenceBuilder,
	isExpression: () => isExpression,
	isJSONOperator: () => isJSONOperator,
	isKyselyProps: () => isKyselyProps,
	isNoResultErrorConstructor: () => isNoResultErrorConstructor,
	isOnModifyForeignAction: () => isOnModifyForeignAction,
	isOperationNodeSource: () => isOperationNodeSource,
	isOperator: () => isOperator,
	isUnaryOperator: () => isUnaryOperator,
	logOnce: () => logOnce,
	pushValueIntoList: () => pushValueIntoList,
	replaceWithNoncontingentExpression: () => replaceWithNoncontingentExpression,
	sql: () => sql,
	validateTransactionSettings: () => validateTransactionSettings
});
var init_dist = __esmMin((() => {
	init_kysely();
	init_query_creator();
	init_query_finalizer();
	init_expression();
	init_expression_builder();
	init_expression_wrapper();
	init_select_query_builder();
	init_insert_query_builder();
	init_update_query_builder();
	init_delete_query_builder();
	init_no_result_error();
	init_join_builder();
	init_function_module();
	init_insert_result();
	init_delete_result();
	init_update_result();
	init_on_conflict_builder();
	init_aggregate_function_builder();
	init_case_builder();
	init_json_path_builder();
	init_merge_query_builder();
	init_merge_result();
	init_order_by_item_builder();
	init_raw_builder();
	init_sql();
	init_default_query_executor();
	init_noop_query_executor();
	init_default_query_compiler();
	init_compiled_query();
	init_schema_module();
	init_create_table_builder();
	init_create_type_builder();
	init_drop_table_builder();
	init_drop_type_builder();
	init_create_index_builder();
	init_drop_index_builder();
	init_create_schema_builder();
	init_drop_schema_builder();
	init_column_definition_builder();
	init_foreign_key_constraint_builder();
	init_alter_table_builder();
	init_create_view_builder();
	init_refresh_materialized_view_builder();
	init_drop_view_builder();
	init_alter_column_builder();
	init_drop_column_builder();
	init_dynamic();
	init_dynamic_reference_builder();
	init_dynamic_table_builder();
	init_driver();
	init_default_connection_provider();
	init_single_connection_provider();
	init_dummy_driver();
	init_dialect_adapter_base();
	init_sqlite_dialect();
	init_sqlite_driver();
	init_sqlite_query_compiler();
	init_sqlite_introspector();
	init_sqlite_adapter();
	init_mysql_dialect();
	init_mysql_driver();
	init_mysql_query_compiler();
	init_mysql_introspector();
	init_mysql_adapter();
	init_postgres_driver();
	init_postgres_dialect();
	init_postgres_query_compiler();
	init_postgres_introspector();
	init_postgres_adapter();
	init_mssql_adapter();
	init_mssql_dialect();
	init_mssql_driver();
	init_mssql_introspector();
	init_mssql_query_compiler();
	init_pglite_adapter();
	init_pglite_driver();
	init_pglite_dialect();
	init_default_query_compiler();
	init_camel_case_plugin();
	init_deduplicate_joins_plugin();
	init_with_schema_plugin();
	init_parse_json_results_plugin();
	init_handle_empty_in_lists_plugin();
	init_handle_empty_in_lists();
	init_safe_null_comparison_plugin();
	init_add_column_node();
	init_add_constraint_node();
	init_add_index_node();
	init_aggregate_function_node();
	init_alias_node();
	init_alter_column_node();
	init_alter_table_node();
	init_and_node();
	init_binary_operation_node();
	init_case_node();
	init_cast_node();
	init_check_constraint_node();
	init_collate_node();
	init_column_definition_node();
	init_column_node();
	init_column_update_node();
	init_common_table_expression_name_node();
	init_common_table_expression_node();
	init_constraint_node();
	init_create_index_node();
	init_create_schema_node();
	init_create_table_node();
	init_create_type_node();
	init_create_view_node();
	init_refresh_materialized_view_node();
	init_data_type_node();
	init_default_insert_value_node();
	init_default_value_node();
	init_delete_query_node();
	init_drop_column_node();
	init_drop_constraint_node();
	init_drop_index_node();
	init_drop_schema_node();
	init_drop_table_node();
	init_drop_type_node();
	init_drop_view_node();
	init_explain_node();
	init_fetch_node();
	init_foreign_key_constraint_node();
	init_from_node();
	init_function_node();
	init_generated_node();
	init_group_by_item_node();
	init_group_by_node();
	init_having_node();
	init_identifier_node();
	init_insert_query_node();
	init_join_node();
	init_json_operator_chain_node();
	init_json_path_leg_node();
	init_json_path_node();
	init_json_reference_node();
	init_limit_node();
	init_list_node();
	init_matched_node();
	init_merge_query_node();
	init_modify_column_node();
	init_offset_node();
	init_on_conflict_node();
	init_on_duplicate_key_node();
	init_on_node();
	init_operation_node_source();
	init_operation_node_transformer();
	init_operation_node_visitor();
	init_operator_node();
	init_or_action_node();
	init_or_node();
	init_order_by_item_node();
	init_order_by_node();
	init_output_node();
	init_over_node();
	init_parens_node();
	init_partition_by_item_node();
	init_partition_by_node();
	init_primary_key_constraint_node();
	init_primitive_value_list_node();
	init_query_node();
	init_raw_node();
	init_reference_node();
	init_references_node();
	init_rename_column_node();
	init_rename_constraint_node();
	init_returning_node();
	init_schemable_identifier_node();
	init_select_all_node();
	init_select_modifier_node();
	init_select_query_node();
	init_selection_node();
	init_set_operation_node();
	init_simple_reference_expression_node();
	init_table_node();
	init_top_node();
	init_tuple_node();
	init_unary_operation_node();
	init_unique_constraint_node();
	init_update_query_node();
	init_using_node();
	init_value_list_node();
	init_value_node();
	init_values_node();
	init_when_node();
	init_where_node();
	init_with_node();
	init_alter_type_node();
	init_add_value_node();
	init_rename_value_node();
	init_compilable();
	init_log();
	init_log_once();
	init_query_id();
}));
//#endregion
//#region ../packages/dialect-generic-sqlite/dist/base-BE-k1Ali.cjs
var require_base_BE_k1Ali = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _defineProperty = require_defineProperty();
	let kysely = (init_dist(), __toCommonJS(dist_exports));
	var BaseSqliteDialect = class {
		/**
		* Base class that implements {@link Dialect}
		* @param create function that create {@link Driver}
		*/
		constructor(create) {
			_defineProperty(this, "createDriver", void 0);
			this.createDriver = create;
		}
		createQueryCompiler() {
			return new kysely.SqliteQueryCompiler();
		}
		createAdapter() {
			return new kysely.SqliteAdapter();
		}
		createIntrospector(db) {
			return new kysely.SqliteIntrospector(db);
		}
	};
	async function runSavepoint(command, connection, savepointName, compileQuery) {
		await connection.executeQuery(compileQuery(kysely.RawNode.createWithChildren([kysely.RawNode.createWithSql(`${command} `), kysely.IdentifierNode.create(savepointName)]), (0, kysely.createQueryId)()));
	}
	var BaseSqliteDriver = class {
		/**
		* Base abstract class that implements {@link Driver}
		*
		* You **MUST** assign `this.conn` in `init` and implement `destroy` method
		*/
		constructor(init) {
			_defineProperty(this, "init", void 0);
			_defineProperty(this, "conn", void 0);
			this.init = init;
		}
		async acquireConnection() {
			return this.conn;
		}
		async releaseConnection() {}
		async beginTransaction(connection) {
			await connection.executeQuery(kysely.CompiledQuery.raw("begin"));
		}
		async commitTransaction(connection) {
			await connection.executeQuery(kysely.CompiledQuery.raw("commit"));
		}
		async rollbackTransaction(connection) {
			await connection.executeQuery(kysely.CompiledQuery.raw("rollback"));
		}
		async savepoint(connection, savepointName, compileQuery) {
			await runSavepoint("savepoint", connection, savepointName, compileQuery);
		}
		async rollbackToSavepoint(connection, savepointName, compileQuery) {
			await runSavepoint("rollback to", connection, savepointName, compileQuery);
		}
		async releaseSavepoint(connection, savepointName, compileQuery) {
			await runSavepoint("release", connection, savepointName, compileQuery);
		}
	};
	/**
	* Wrapper for {@link IGenericSqlite}'s `query` function
	*
	* When `isSelectQueryNode` is true or sql starts with `select`, call `exec.all`, otherwise call `exec.run`.
	* This is a simple implementation that does not support `returning`.
	*/
	function buildQueryFnAlt(exec) {
		return async (isSelect, sql, parameters) => isSelect || sql.toLowerCase().startsWith("select") ? { rows: await exec.all(sql, parameters) } : {
			rows: [],
			...await exec.run(sql, parameters)
		};
	}
	/**
	* Wrapper for {@link IGenericSqlite}'s `query` function
	*
	* This implementation supports `returning` queries
	* by checking {@link isReadOrReturningQuery} and calling `exec.all` for those queries, otherwise, it calls `exec.run`.
	*
	* Limitation: `returning` is only detected from Kysely's query AST. Raw SQL
	* `INSERT`, `UPDATE`, or `DELETE` statements with a `RETURNING` clause are
	* treated as write queries and executed with `exec.run`.
	*/
	function buildQueryFn(exec) {
		return async (_isSelect, sql, parameters, node) => {
			if (isReadOrReturningQuery(node, sql)) return { rows: await exec.all(sql, parameters) };
			return {
				rows: [],
				...await exec.run(sql, parameters)
			};
		};
	}
	function parseBigInt(num) {
		return num === void 0 || num === null ? void 0 : BigInt(num);
	}
	/**
	* Returns true if the query is a read query or a returning query.
	*
	* Checking:
	* - if Kysely INSERT, UPDATE, and DELETE query nodes have a RETURNING clause.
	* - if the query is a SELECT, PRAGMA, VALUES, or WITH query.
	*
	* Limitation: raw SQL `returning` clauses are not inspected.
	*/
	function isReadOrReturningQuery(node, sql) {
		if (node) {
			if (kysely.SelectQueryNode.is(node)) return true;
			if ((kysely.InsertQueryNode.is(node) || kysely.UpdateQueryNode.is(node) || kysely.DeleteQueryNode.is(node)) && node.returning) return true;
		}
		return /^\s*(select|pragma|values|with)\b/i.test(sql);
	}
	Object.defineProperty(exports, "BaseSqliteDialect", {
		enumerable: true,
		get: function() {
			return BaseSqliteDialect;
		}
	});
	Object.defineProperty(exports, "BaseSqliteDriver", {
		enumerable: true,
		get: function() {
			return BaseSqliteDriver;
		}
	});
	Object.defineProperty(exports, "buildQueryFn", {
		enumerable: true,
		get: function() {
			return buildQueryFn;
		}
	});
	Object.defineProperty(exports, "buildQueryFnAlt", {
		enumerable: true,
		get: function() {
			return buildQueryFnAlt;
		}
	});
	Object.defineProperty(exports, "isReadOrReturningQuery", {
		enumerable: true,
		get: function() {
			return isReadOrReturningQuery;
		}
	});
	Object.defineProperty(exports, "parseBigInt", {
		enumerable: true,
		get: function() {
			return parseBigInt;
		}
	});
}));
//#endregion
//#region ../packages/dialect-generic-sqlite/dist/index.cjs
var require_dist = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _defineProperty = require_defineProperty();
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
	const require_base = require_base_BE_k1Ali();
	let kysely = (init_dist(), __toCommonJS(dist_exports));
	var GenericSqliteDriver = class extends require_base.BaseSqliteDriver {
		constructor(executor, onCreateConnection) {
			super(async (options) => {
				this.db = await executor(options);
				this.conn = new GenericSqliteConnection(this.db);
				await onCreateConnection?.(this.conn, options);
			});
			_defineProperty(this, "db", void 0);
		}
		async destroy() {
			await this.db?.close();
		}
	};
	var GenericSqliteConnection = class {
		constructor(db) {
			_defineProperty(this, "db", void 0);
			this.db = db;
		}
		async *streamQuery({ parameters, query, sql }, chunkSize, options) {
			if (!this.db.iterator) throw new Error("streamQuery() is not supported.");
			const it = this.db.iterator(kysely.SelectQueryNode.is(query), sql, parameters, chunkSize);
			for await (const row of it) {
				if (options?.signal?.aborted) break;
				yield { rows: [row] };
			}
		}
		async executeQuery({ parameters, query, sql }) {
			return await this.db.query(kysely.SelectQueryNode.is(query), sql, parameters, query);
		}
	};
	var GenericSqliteDialect = class extends require_base.BaseSqliteDialect {
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
	exports.BaseSqliteDialect = require_base.BaseSqliteDialect;
	exports.BaseSqliteDriver = require_base.BaseSqliteDriver;
	exports.GenericSqliteConnection = GenericSqliteConnection;
	exports.GenericSqliteDialect = GenericSqliteDialect;
	exports.GenericSqliteDriver = GenericSqliteDriver;
	exports.buildQueryFn = require_base.buildQueryFn;
	exports.buildQueryFnAlt = require_base.buildQueryFnAlt;
	exports.isReadOrReturningQuery = require_base.isReadOrReturningQuery;
	exports.parseBigInt = require_base.parseBigInt;
}));
//#endregion
//#region ../packages/dialect-wasqlite-worker/dist/worker.js
const require_utils = (/* @__PURE__ */ __commonJSMin(((exports) => {
	let _subframe7536_sqlite_wasm = (init_dist$1(), __toCommonJS(dist_exports$1));
	let kysely_generic_sqlite_worker_helper_web = require_worker_helper_web();
	let _subframe7536_sqlite_wasm_constant = (init_constant(), __toCommonJS(constant_exports));
	let kysely_generic_sqlite = require_dist();
	const defaultCreateDatabaseFn = async ({ fileName, url, useOPFS }) => {
		return (await Promise.resolve().then(() => (init_dist$1(), dist_exports$1))).initSQLiteCore((useOPFS ? (await import("./opfs-CLLKs8Ex.js")).useOpfsStorage : (await import("./idb-CM6jfNIu.js")).useIdbStorage)(fileName, { url }));
	};
	function createRowMapper(sqlite, stmt) {
		const cols = sqlite.column_names(stmt);
		return (row) => Object.fromEntries(cols.map((key, i) => [key, row[i]]));
	}
	async function prepareStatement(db, sql, parameters) {
		const iterator = db.sqlite.statements(db.pointer, sql)[Symbol.asyncIterator]();
		const { value: stmt, done } = await iterator.next();
		if (done || !stmt) {
			await iterator.return?.();
			throw new Error(`No statement returned for sql: ${sql}`);
		}
		try {
			if (parameters.length) db.sqlite.bind_collection(stmt, parameters);
		} catch (error) {
			await iterator.return?.();
			throw error;
		}
		return {
			stmt,
			release: async () => await iterator.return?.()
		};
	}
	/**
	* Handle worker message, support custom message handler,
	* built-in: {@link defaultCreateDatabaseFn}
	* @example
	* in `worker.ts`
	* ```ts
	* import { customFunctionCore, exportDatabase } from '@subframe7536/sqlite-wasm'
	* import { createOnMessageCallback, defaultCreateDatabaseFn } from 'kysely-wasqlite-worker'
	*
	* createOnMessageCallback(
	*   async (...args) => {
	*     const sqliteDB = await defaultCreateDatabaseFn(...args)
	*     customFunctionCore(sqliteDB, 'customFunction', (a, b) => a + b)
	*     return sqliteDB
	*   },
	*   ([type, exec, data1, data2, data3]) => {
	*     if (type === 'export') {
	*       return exportDatabase(exec.db)
	*     }
	*   }
	* )
	* ```
	*/
	function createOnMessageCallback(create, message) {
		(0, kysely_generic_sqlite_worker_helper_web.createWebOnMessageCallback)(async (initData) => {
			return createSqliteExecutor(await create(initData));
		}, message);
	}
	function createSqliteExecutor(db) {
		return {
			db,
			close: async () => await (0, _subframe7536_sqlite_wasm.close)(db),
			query: async (_isSelect, sql, parameters) => {
				const { stmt, release } = await prepareStatement(db, sql, parameters);
				try {
					if (db.sqlite.column_count(stmt) === 0) {
						await db.sqlite.step(stmt);
						return {
							rows: [],
							insertId: (0, kysely_generic_sqlite.parseBigInt)((0, _subframe7536_sqlite_wasm.lastInsertRowId)(db)),
							numAffectedRows: (0, kysely_generic_sqlite.parseBigInt)((0, _subframe7536_sqlite_wasm.changes)(db))
						};
					}
					const mapRow = createRowMapper(db.sqlite, stmt);
					const result = [];
					let idx = 0;
					while (await db.sqlite.step(stmt) === _subframe7536_sqlite_wasm_constant.SQLITE_ROW) result[idx++] = mapRow(db.sqlite.row(stmt));
					return { rows: result };
				} finally {
					await release();
				}
			},
			async *iterator(_isSelect, sql, parameters, chunkSize = 1) {
				const { stmt, release } = await prepareStatement(db, sql, parameters);
				try {
					const cache = new Array(chunkSize);
					let idx = 0;
					const mapRow = createRowMapper(db.sqlite, stmt);
					while (1) {
						const result = await db.sqlite.step(stmt);
						if (result === _subframe7536_sqlite_wasm_constant.SQLITE_ROW) {
							cache[idx] = mapRow(db.sqlite.row(stmt));
							if (++idx === chunkSize) {
								for (let i = 0; i < idx; i++) yield cache[i];
								idx = 0;
							}
							continue;
						}
						if (result === _subframe7536_sqlite_wasm_constant.SQLITE_DONE) {
							for (let i = 0; i < idx; i++) yield cache[i];
							return;
						}
					}
				} finally {
					await release();
				}
			}
		};
	}
	Object.defineProperty(exports, "createOnMessageCallback", {
		enumerable: true,
		get: function() {
			return createOnMessageCallback;
		}
	});
	Object.defineProperty(exports, "createSqliteExecutor", {
		enumerable: true,
		get: function() {
			return createSqliteExecutor;
		}
	});
	Object.defineProperty(exports, "defaultCreateDatabaseFn", {
		enumerable: true,
		get: function() {
			return defaultCreateDatabaseFn;
		}
	});
})))();
require_utils.createOnMessageCallback(require_utils.defaultCreateDatabaseFn);
//#endregion
export { init_wa_sqlite_DfKPyFeY as n, Module as t };
