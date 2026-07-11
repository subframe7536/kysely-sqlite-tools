import { _ as _assertClassBrand, a as SQLITE_IOERR_ACCESS, c as SQLITE_IOERR_DELETE, f as SQLITE_IOERR_TRUNCATE, l as SQLITE_IOERR_FSTAT, n as FacadeVFS, s as SQLITE_IOERR_CLOSE, t as Module, u as SQLITE_IOERR_FSYNC, v as _classPrivateMethodInitSpec, y as _defineProperty } from "./worker-CN5bCYsx.js";
//#region ../node_modules/.pnpm/@subframe7536+sqlite-wasm@1.3.1/node_modules/@subframe7536/sqlite-wasm/dist/opfs.js
var _OPFSCoopSyncVFS$1_brand;
const DEFAULT_TEMPORARY_FILES = 10;
const LOCK_NOTIFY_INTERVAL = 1e3;
const DB_RELATED_FILE_SUFFIXES = [
	"",
	"-journal",
	"-wal"
];
const finalizationRegistry = new FinalizationRegistry((releaser) => releaser());
var File = class {
	constructor(path, flags) {
		_defineProperty(
			this,
			/** @type {string} */
			"path",
			void 0
		);
		_defineProperty(
			this,
			/** @type {number} */
			"flags",
			void 0
		);
		_defineProperty(
			this,
			/** @type {FileSystemSyncAccessHandle} */
			"accessHandle",
			void 0
		);
		_defineProperty(
			this,
			/** @type {PersistentFile?} */
			"persistentFile",
			void 0
		);
		this.path = path;
		this.flags = flags;
	}
};
var PersistentFile = class {
	constructor(fileHandle) {
		_defineProperty(
			this,
			/** @type {FileSystemFileHandle} */
			"fileHandle",
			void 0
		);
		_defineProperty(
			this,
			/** @type {FileSystemSyncAccessHandle} */
			"accessHandle",
			null
		);
		_defineProperty(
			this,
			/** @type {boolean} */
			"isLockBusy",
			false
		);
		_defineProperty(
			this,
			/** @type {boolean} */
			"isFileLocked",
			false
		);
		_defineProperty(
			this,
			/** @type {boolean} */
			"isRequestInProgress",
			false
		);
		_defineProperty(
			this,
			/** @type {function} */
			"handleLockReleaser",
			null
		);
		_defineProperty(
			this,
			/** @type {BroadcastChannel} */
			"handleRequestChannel",
			void 0
		);
		_defineProperty(
			this,
			/** @type {boolean} */
			"isHandleRequested",
			false
		);
		this.fileHandle = fileHandle;
	}
};
var OPFSCoopSyncVFS$1 = (_OPFSCoopSyncVFS$1_brand = /* @__PURE__ */ new WeakSet(), class OPFSCoopSyncVFS$1 extends FacadeVFS {
	static async create(name, module) {
		const vfs = new OPFSCoopSyncVFS$1(name, module);
		await Promise.all([vfs.isReady(), _assertClassBrand(_OPFSCoopSyncVFS$1_brand, vfs, _initialize).call(vfs, DEFAULT_TEMPORARY_FILES)]);
		return vfs;
	}
	constructor(name, module) {
		super(name, module);
		_classPrivateMethodInitSpec(this, _OPFSCoopSyncVFS$1_brand);
		_defineProperty(
			this,
			/** @type {Map<number, File>} */
			"mapIdToFile",
			/* @__PURE__ */ new Map()
		);
		_defineProperty(this, "lastError", null);
		_defineProperty(this, "log", null);
		_defineProperty(
			this,
			/** @type {Map<string, PersistentFile>} */
			"persistentFiles",
			/* @__PURE__ */ new Map()
		);
		_defineProperty(
			this,
			/** @type {Map<string, FileSystemSyncAccessHandle>} */
			"boundAccessHandles",
			/* @__PURE__ */ new Map()
		);
		_defineProperty(
			this,
			/** @type {Set<FileSystemSyncAccessHandle>} */
			"unboundAccessHandles",
			/* @__PURE__ */ new Set()
		);
		_defineProperty(
			this,
			/** @type {Set<string>} */
			"accessiblePaths",
			/* @__PURE__ */ new Set()
		);
		_defineProperty(this, "releaser", null);
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
			const path = new URL(zName || Math.random().toString(36).slice(2), "file://").pathname;
			if (flags & 256) {
				const persistentFile = this.persistentFiles.get(path);
				if (persistentFile?.isRequestInProgress) return 5;
				else if (!persistentFile) {
					this.log?.(`creating persistent file for ${path}`);
					const create = !!(flags & 4);
					this._module.retryOps.push((async () => {
						try {
							let dirHandle = await navigator.storage.getDirectory();
							const directories = path.split("/").filter((d) => d);
							const filename = directories.pop();
							for (const directory of directories) dirHandle = await dirHandle.getDirectoryHandle(directory, { create });
							for (const suffix of DB_RELATED_FILE_SUFFIXES) {
								const fileHandle = await dirHandle.getFileHandle(filename + suffix, { create });
								await _assertClassBrand(_OPFSCoopSyncVFS$1_brand, this, _createPersistentFile).call(this, fileHandle);
							}
							const file = new File(path, flags);
							file.persistentFile = this.persistentFiles.get(path);
							await _assertClassBrand(_OPFSCoopSyncVFS$1_brand, this, _requestAccessHandle).call(this, file);
						} catch (e) {
							const persistentFile = new PersistentFile(null);
							this.persistentFiles.set(path, persistentFile);
							console.error(e);
						}
					})());
					return 5;
				} else if (!persistentFile.fileHandle) {
					this.persistentFiles.delete(path);
					return 14;
				} else if (!persistentFile.accessHandle) {
					this._module.retryOps.push((async () => {
						const file = new File(path, flags);
						file.persistentFile = this.persistentFiles.get(path);
						await _assertClassBrand(_OPFSCoopSyncVFS$1_brand, this, _requestAccessHandle).call(this, file);
					})());
					return 5;
				}
			}
			if (!this.accessiblePaths.has(path) && !(flags & 4)) throw new Error(`File ${path} not found`);
			const file = new File(path, flags);
			this.mapIdToFile.set(fileId, file);
			if (this.persistentFiles.has(path)) file.persistentFile = this.persistentFiles.get(path);
			else if (this.boundAccessHandles.has(path)) file.accessHandle = this.boundAccessHandles.get(path);
			else if (this.unboundAccessHandles.size) {
				file.accessHandle = this.unboundAccessHandles.values().next().value;
				file.accessHandle.truncate(0);
				this.unboundAccessHandles.delete(file.accessHandle);
				this.boundAccessHandles.set(path, file.accessHandle);
			}
			this.accessiblePaths.add(path);
			pOutFlags.setInt32(0, flags, true);
			return 0;
		} catch (e) {
			this.lastError = e;
			return 14;
		}
	}
	/**
	* @param {string} zName 
	* @param {number} syncDir 
	* @returns {number}
	*/
	jDelete(zName, syncDir) {
		try {
			const path = new URL(zName, "file://").pathname;
			if (this.persistentFiles.has(path)) this.persistentFiles.get(path).accessHandle.truncate(0);
			else this.boundAccessHandles.get(path)?.truncate(0);
			this.accessiblePaths.delete(path);
			return 0;
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
			const path = new URL(zName, "file://").pathname;
			pResOut.setInt32(0, this.accessiblePaths.has(path) ? 1 : 0, true);
			return 0;
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
			if (file?.flags & 256) {
				if (file.persistentFile?.handleLockReleaser) _assertClassBrand(_OPFSCoopSyncVFS$1_brand, this, _releaseAccessHandle).call(this, file);
			} else if (file?.flags & 8) {
				file.accessHandle.truncate(0);
				this.accessiblePaths.delete(file.path);
				if (!this.persistentFiles.has(file.path)) {
					this.boundAccessHandles.delete(file.path);
					this.unboundAccessHandles.add(file.accessHandle);
				}
			}
			return 0;
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
			const bytesRead = (file.accessHandle || file.persistentFile.accessHandle).read(pData.subarray(), { at: iOffset });
			if (file.flags & 256 && !file.persistentFile.isFileLocked) _assertClassBrand(_OPFSCoopSyncVFS$1_brand, this, _releaseAccessHandle).call(this, file);
			if (bytesRead < pData.byteLength) {
				pData.fill(0, bytesRead);
				return 522;
			}
			return 0;
		} catch (e) {
			this.lastError = e;
			return 266;
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
			if ((file.accessHandle || file.persistentFile.accessHandle).write(pData.subarray(), { at: iOffset }) !== pData.byteLength) throw new Error("short write");
			return 0;
		} catch (e) {
			this.lastError = e;
			return 778;
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
			(file.accessHandle || file.persistentFile.accessHandle).truncate(iSize);
			return 0;
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
			(file.accessHandle || file.persistentFile.accessHandle).flush();
			return 0;
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
			const size = (file.accessHandle || file.persistentFile.accessHandle).getSize();
			pSize64.setBigInt64(0, BigInt(size), true);
			return 0;
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
			return 5;
		}
		file.persistentFile.isFileLocked = true;
		if (!file.persistentFile.handleLockReleaser) {
			file.persistentFile.handleRequestChannel.onmessage = () => {
				this.log?.(`received notification for ${file.path}`);
				if (file.persistentFile.isFileLocked) file.persistentFile.isHandleRequested = true;
				else _assertClassBrand(_OPFSCoopSyncVFS$1_brand, this, _releaseAccessHandle).call(this, file);
				file.persistentFile.handleRequestChannel.onmessage = null;
			};
			_assertClassBrand(_OPFSCoopSyncVFS$1_brand, this, _requestAccessHandle).call(this, file);
			this.log?.("returning SQLITE_BUSY");
			file.persistentFile.isLockBusy = true;
			return 5;
		}
		file.persistentFile.isLockBusy = false;
		return 0;
	}
	/**
	* @param {number} fileId 
	* @param {number} lockType 
	* @returns {number}
	*/
	jUnlock(fileId, lockType) {
		const file = this.mapIdToFile.get(fileId);
		if (lockType === 0) {
			if (!file.persistentFile.isLockBusy) {
				if (file.persistentFile.isHandleRequested) {
					_assertClassBrand(_OPFSCoopSyncVFS$1_brand, this, _releaseAccessHandle).call(this, file);
					file.persistentFile.isHandleRequested = false;
				}
				file.persistentFile.isFileLocked = false;
			}
		}
		return 0;
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
				case 14:
					const key = extractString(pArg, 4);
					const value = extractString(pArg, 8);
					this.log?.("xFileControl", file.path, "PRAGMA", key, value);
					switch (key.toLowerCase()) {
						case "journal_mode":
							if (value && ![
								"off",
								"memory",
								"delete",
								"wal"
							].includes(value.toLowerCase())) throw new Error("journal_mode must be \"off\", \"memory\", \"delete\", or \"wal\"");
							break;
					}
					break;
			}
		} catch (e) {
			this.lastError = e;
			return 10;
		}
		return 12;
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
		return 0;
	}
});
async function _initialize(nTemporaryFiles) {
	const root = await navigator.storage.getDirectory();
	for await (const entry of root.values()) if (entry.kind === "directory" && entry.name.startsWith(".ahp-")) await navigator.locks.request(entry.name, { ifAvailable: true }, async (lock) => {
		if (lock) {
			this.log?.(`Deleting temporary directory ${entry.name}`);
			await root.removeEntry(entry.name, { recursive: true });
		} else this.log?.(`Temporary directory ${entry.name} is in use`);
	});
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
		const tmpAccessHandle = await (await tmpDir.getFileHandle(`${i}.tmp`, { create: true })).createSyncAccessHandle();
		this.unboundAccessHandles.add(tmpAccessHandle);
	}
}
/**
* @param {FileSystemFileHandle} fileHandle 
* @returns {Promise<PersistentFile>}
*/
async function _createPersistentFile(fileHandle) {
	const persistentFile = new PersistentFile(fileHandle);
	const path = `/${(await (await navigator.storage.getDirectory()).resolve(fileHandle)).join("/")}`;
	persistentFile.handleRequestChannel = new BroadcastChannel(`ahp:${path}`);
	this.persistentFiles.set(path, persistentFile);
	if ((await fileHandle.getFile()).size) this.accessiblePaths.add(path);
	return persistentFile;
}
/**
* @param {File} file 
*/
function _requestAccessHandle(file) {
	console.assert(!file.persistentFile.handleLockReleaser);
	if (!file.persistentFile.isRequestInProgress) {
		file.persistentFile.isRequestInProgress = true;
		this._module.retryOps.push((async () => {
			file.persistentFile.handleLockReleaser = await _assertClassBrand(_OPFSCoopSyncVFS$1_brand, this, _acquireLock).call(this, file.persistentFile);
			try {
				this.log?.(`creating access handles for ${file.path}`);
				await Promise.all(DB_RELATED_FILE_SUFFIXES.map(async (suffix) => {
					const persistentFile = this.persistentFiles.get(file.path + suffix);
					if (persistentFile) persistentFile.accessHandle = await persistentFile.fileHandle.createSyncAccessHandle();
				}));
			} catch (e) {
				this.log?.(`failed to create access handles for ${file.path}`, e);
				_assertClassBrand(_OPFSCoopSyncVFS$1_brand, this, _releaseAccessHandle).call(this, file);
				throw e;
			} finally {
				file.persistentFile.isRequestInProgress = false;
			}
		})());
		return this._module.retryOps.at(-1);
	}
	return Promise.resolve();
}
/**
* @param {File} file 
*/
function _releaseAccessHandle(file) {
	DB_RELATED_FILE_SUFFIXES.forEach((suffix) => {
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
}
/**
* @param {PersistentFile} persistentFile 
* @returns  {Promise<function>} lock releaser
*/
function _acquireLock(persistentFile) {
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
}
function extractString(dataView, offset) {
	const p = dataView.getUint32(offset, true);
	if (p) {
		const chars = new Uint8Array(dataView.buffer, p);
		return new TextDecoder().decode(chars.subarray(0, chars.indexOf(0)));
	}
	return null;
}
const OPFSCoopSyncVFS = OPFSCoopSyncVFS$1;
/**
* Store data in [OPFS](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) through [FileSystemSyncAccessHandle](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemSyncAccessHandle),
* use `OPFSCoopSyncVFS` with `wa-sqlite.wasm`, smaller and faster than all other persist storages
*
* **MUST RUN IN WEB WORKER**
* @param path db file directory path
* @param options wasm file url
* @example
* ```ts
* import { initSQLite, isOpfsSupported } from '@subframe7536/sqlite-wasm'
* import { useOpfsStorage } from '@subframe7536/sqlite-wasm/opfs'
*
* // optional url
* const url = 'https://cdn.jsdelivr.net/npm/@subframe7536/sqlite-wasm@0.5.0/dist/wa-sqlite.wasm'
*
* onmessage = async () => {
*   if (!await isOpfsSupported()) { // this can be called in main thread
*     return
*   }
*   const { run, changes, lastInsertRowId, close } = await initSQLite(
*     useOpfsStorage('test.db', url)
*   )
* }
* ```
*/
async function useOpfsStorage(path, options = {}) {
	const { url, ...rest } = options;
	return {
		path,
		sqliteModule: await Module(url ? { locateFile: () => url } : void 0),
		vfsFn: OPFSCoopSyncVFS.create,
		...rest
	};
}
//#endregion
export { useOpfsStorage };
