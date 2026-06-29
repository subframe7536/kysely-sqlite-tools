import { v as _defineProperty } from "./FacadeVFS-XQtZprLW-CP1BfLXw.js";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region ../node_modules/.pnpm/@subframe7536+sqlite-wasm@1.3.0/node_modules/@subframe7536/sqlite-wasm/dist/wa-sqlite-DfKPyFeY.js
var Module = (() => {
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
//#endregion
//#region ../node_modules/.pnpm/@subframe7536+sqlite-wasm@1.3.0/node_modules/@subframe7536/sqlite-wasm/dist/index.js
var dist_exports = /* @__PURE__ */ __exportAll({
	close: () => close,
	initSQLiteCore: () => initSQLiteCore,
	iterator: () => iterator,
	parseOpenV2Flag: () => parseOpenV2Flag,
	query: () => query
});
const MAX_INT64 = 9223372036854775807n;
const MIN_INT64 = -9223372036854775808n;
const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
var SQLiteError = class extends Error {
	constructor(message, code) {
		super(message);
		this.code = code;
	}
};
const async = true;
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
new Uint8Array([
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
async function close(core) {
	await core.sqlite.close(core.pointer);
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
//#endregion
//#region ../packages/dialect-generic-sqlite/dist/utils-Bru-SywF.js
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
//#endregion
//#region ../packages/dialect-generic-sqlite/dist/worker-helper-web.js
function createWebOnMessageCallback(init, message) {
	const cb = createGenericOnMessageCallback(init, (value) => globalThis.postMessage(value), message);
	globalThis.onmessage = ({ data }) => cb(data);
}
//#endregion
//#region ../packages/dialect-wasqlite-worker/dist/utils-en6L8fHD.mjs
const defaultCreateDatabaseFn = async ({ fileName, url, useOPFS }) => {
	return (await Promise.resolve().then(() => dist_exports)).initSQLiteCore((useOPFS ? (await import("./opfs-mmVU7UV8.js")).useOpfsStorage : (await import("./idb-D7F607Ov.js")).useIdbStorage)(fileName, { url }));
};
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
	createWebOnMessageCallback(async (initData) => {
		return createSqliteExecutor(await create(initData));
	}, message);
}
function createSqliteExecutor(db) {
	return {
		db,
		query: async (_isSelect, sql, parameters) => ({ rows: await query(db, sql, parameters) }),
		close: async () => await close(db),
		iterator: (_isSelect, sql, parameters, chunkSize) => iterator(db, sql, parameters, chunkSize)
	};
}
//#endregion
//#region ../packages/dialect-wasqlite-worker/dist/worker.mjs
createOnMessageCallback(defaultCreateDatabaseFn);
//#endregion
export { Module as t };
