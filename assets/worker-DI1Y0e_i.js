var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _FacadeVFS_instances, makeTypedDataView_fn, makeDataArray_fn, decodeFilename_fn, _a;
var SQLITE_OK = 0;
var SQLITE_ERROR = 1;
var SQLITE_BUSY = 5;
var SQLITE_IOERR = 10;
var SQLITE_NOTFOUND = 12;
var SQLITE_CANTOPEN = 14;
var SQLITE_MISUSE = 21;
var SQLITE_RANGE = 25;
var SQLITE_NOTICE = 27;
var SQLITE_ROW = 100;
var SQLITE_DONE = 101;
var SQLITE_IOERR_ACCESS = 3338;
var SQLITE_IOERR_CHECKRESERVEDLOCK = 3594;
var SQLITE_IOERR_CLOSE = 4106;
var SQLITE_IOERR_DELETE = 2570;
var SQLITE_IOERR_FSTAT = 1802;
var SQLITE_IOERR_FSYNC = 1034;
var SQLITE_IOERR_LOCK = 3850;
var SQLITE_IOERR_READ = 266;
var SQLITE_IOERR_SHORT_READ = 522;
var SQLITE_IOERR_TRUNCATE = 1546;
var SQLITE_IOERR_UNLOCK = 2058;
var SQLITE_IOERR_WRITE = 778;
var SQLITE_OPEN_READONLY = 1;
var SQLITE_OPEN_READWRITE = 2;
var SQLITE_OPEN_CREATE = 4;
var SQLITE_OPEN_DELETEONCLOSE = 8;
var SQLITE_OPEN_URI = 64;
var SQLITE_OPEN_MAIN_DB = 256;
var SQLITE_OPEN_TEMP_DB = 512;
var SQLITE_LOCK_NONE = 0;
var SQLITE_LOCK_SHARED = 1;
var SQLITE_LOCK_RESERVED = 2;
var SQLITE_LOCK_EXCLUSIVE = 4;
var SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN = 2048;
var SQLITE_IOCAP_BATCH_ATOMIC = 16384;
var SQLITE_FCNTL_PRAGMA = 14;
var SQLITE_FCNTL_SYNC = 21;
var SQLITE_FCNTL_BEGIN_ATOMIC_WRITE = 31;
var SQLITE_FCNTL_COMMIT_ATOMIC_WRITE = 32;
var SQLITE_FCNTL_ROLLBACK_ATOMIC_WRITE = 33;
var SQLITE_INTEGER = 1;
var SQLITE_FLOAT = 2;
var SQLITE_TEXT = 3;
var SQLITE_BLOB = 4;
var SQLITE_NULL = 5;
var DEFAULT_SECTOR_SIZE = 512;
var Base = class {
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
var AsyncFunction$1 = Object.getPrototypeOf(async function() {
}).constructor;
var FacadeVFS = (_a = class extends Base {
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
    return this[jMethodName] instanceof AsyncFunction$1;
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
function delegalize(lo32, hi32) {
  return hi32 * 4294967296 + lo32 + (lo32 < 0 ? 2 ** 32 : 0);
}
var MAX_INT64 = 0x7fffffffffffffffn;
var MIN_INT64 = -0x8000000000000000n;
var AsyncFunction = Object.getPrototypeOf(async function() {
}).constructor;
var SQLiteError = class extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
};
var async = true;
function Factory(Module) {
  const sqlite3 = {};
  Module.retryOps = [];
  const sqliteFreeAddress = Module._getSqliteFree();
  const tmp = Module._malloc(8);
  const tmpPtr = [tmp, tmp + 4];
  function createUTF8(s) {
    if (typeof s !== "string") return 0;
    const utf8 = new TextEncoder().encode(s);
    const zts = Module._sqlite3_malloc(utf8.byteLength + 1);
    Module.HEAPU8.set(utf8, zts);
    Module.HEAPU8[zts + utf8.byteLength] = 0;
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
  function verifyDatabase(db) {
    if (!databases.has(db)) {
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
    const f = Module.cwrap(fname, ...decl("nnnnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const byteLength = value.byteLength ?? value.length;
      const ptr = Module._sqlite3_malloc(byteLength);
      Module.HEAPU8.subarray(ptr).set(value);
      const result = f(stmt, i, ptr, byteLength, sqliteFreeAddress);
      return check2(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_parameter_count = function() {
    const fname = "sqlite3_bind_parameter_count";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.bind_double = function() {
    const fname = "sqlite3_bind_double";
    const f = Module.cwrap(fname, ...decl("nnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const result = f(stmt, i, value);
      return check2(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_int = function() {
    const fname = "sqlite3_bind_int";
    const f = Module.cwrap(fname, ...decl("nnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      if (value > 2147483647 || value < -2147483648) return SQLITE_RANGE;
      const result = f(stmt, i, value);
      return check2(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_int64 = function() {
    const fname = "sqlite3_bind_int64";
    const f = Module.cwrap(fname, ...decl("nnnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      if (value > MAX_INT64 || value < MIN_INT64) return SQLITE_RANGE;
      const lo32 = value & 0xffffffffn;
      const hi32 = value >> 32n;
      const result = f(stmt, i, Number(lo32), Number(hi32));
      return check2(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_null = function() {
    const fname = "sqlite3_bind_null";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(stmt, i) {
      verifyStatement(stmt);
      const result = f(stmt, i);
      return check2(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_parameter_name = function() {
    const fname = "sqlite3_bind_parameter_name";
    const f = Module.cwrap(fname, ...decl("n:s"));
    return function(stmt, i) {
      verifyStatement(stmt);
      const result = f(stmt, i);
      return result;
    };
  }();
  sqlite3.bind_text = function() {
    const fname = "sqlite3_bind_text";
    const f = Module.cwrap(fname, ...decl("nnnnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const ptr = createUTF8(value);
      const result = f(stmt, i, ptr, -1, sqliteFreeAddress);
      return check2(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.changes = function() {
    const fname = "sqlite3_changes";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(db) {
      verifyDatabase(db);
      const result = f(db);
      return result;
    };
  }();
  sqlite3.clear_bindings = function() {
    const fname = "sqlite3_clear_bindings";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return check2(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.close = function() {
    const fname = "sqlite3_close";
    const f = Module.cwrap(fname, ...decl("n:n"), { async });
    return async function(db) {
      verifyDatabase(db);
      const result = await f(db);
      databases.delete(db);
      return check2(fname, result, db);
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
        const hi32 = Module.getTempRet0();
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
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const nBytes = sqlite3.column_bytes(stmt, iCol);
      const address = f(stmt, iCol);
      const result = Module.HEAPU8.subarray(address, address + nBytes);
      return result;
    };
  }();
  sqlite3.column_bytes = function() {
    const fname = "sqlite3_column_bytes";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_count = function() {
    const fname = "sqlite3_column_count";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.column_double = function() {
    const fname = "sqlite3_column_double";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_int = function() {
    const fname = "sqlite3_column_int64";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_int64 = function() {
    const fname = "sqlite3_column_int64";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const lo32 = f(stmt, iCol);
      const hi32 = Module.getTempRet0();
      const result = cvt32x2ToBigInt(lo32, hi32);
      return result;
    };
  }();
  sqlite3.column_name = function() {
    const fname = "sqlite3_column_name";
    const f = Module.cwrap(fname, ...decl("nn:s"));
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
    const f = Module.cwrap(fname, ...decl("nn:s"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_type = function() {
    const fname = "sqlite3_column_type";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.create_function = function(db, zFunctionName, nArg, eTextRep, pApp, xFunc, xStep, xFinal) {
    verifyDatabase(db);
    function adapt(f) {
      return f instanceof AsyncFunction ? async (ctx, n, values) => f(ctx, Module.HEAP32.subarray(values / 4, values / 4 + n)) : (ctx, n, values) => f(ctx, Module.HEAP32.subarray(values / 4, values / 4 + n));
    }
    const result = Module.create_function(
      db,
      zFunctionName,
      nArg,
      eTextRep,
      pApp,
      xFunc && adapt(xFunc),
      xStep && adapt(xStep),
      xFinal
    );
    return check2("sqlite3_create_function", result, db);
  };
  sqlite3.data_count = function() {
    const fname = "sqlite3_data_count";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.exec = async function(db, sql, callback) {
    for await (const stmt of sqlite3.statements(db, sql)) {
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
    const f = Module.cwrap(fname, ...decl("n:n"), { async });
    return async function(stmt) {
      const result = await f(stmt);
      mapStmtToDB.delete(stmt);
      return result;
    };
  }();
  sqlite3.get_autocommit = function() {
    const fname = "sqlite3_get_autocommit";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(db) {
      const result = f(db);
      return result;
    };
  }();
  sqlite3.libversion = function() {
    const fname = "sqlite3_libversion";
    const f = Module.cwrap(fname, ...decl(":s"));
    return function() {
      const result = f();
      return result;
    };
  }();
  sqlite3.libversion_number = function() {
    const fname = "sqlite3_libversion_number";
    const f = Module.cwrap(fname, ...decl(":n"));
    return function() {
      const result = f();
      return result;
    };
  }();
  sqlite3.limit = function() {
    const fname = "sqlite3_limit";
    const f = Module.cwrap(fname, ...decl("nnn:n"));
    return function(db, id, newVal) {
      const result = f(db, id, newVal);
      return result;
    };
  }();
  sqlite3.open_v2 = function() {
    const fname = "sqlite3_open_v2";
    const f = Module.cwrap(fname, ...decl("snnn:n"), { async });
    return async function(zFilename, flags, zVfs) {
      flags = flags || SQLITE_OPEN_CREATE | SQLITE_OPEN_READWRITE;
      zVfs = createUTF8(zVfs);
      try {
        const rc = await retry(() => f(zFilename, tmpPtr[0], flags, zVfs));
        const db = Module.getValue(tmpPtr[0], "*");
        databases.add(db);
        Module.ccall("RegisterExtensionFunctions", "void", ["number"], [db]);
        check2(fname, rc);
        return db;
      } finally {
        Module._sqlite3_free(zVfs);
      }
    };
  }();
  sqlite3.progress_handler = function(db, nProgressOps, handler, userData) {
    verifyDatabase(db);
    Module.progress_handler(db, nProgressOps, handler, userData);
  };
  sqlite3.reset = function() {
    const fname = "sqlite3_reset";
    const f = Module.cwrap(fname, ...decl("n:n"), { async });
    return async function(stmt) {
      verifyStatement(stmt);
      const result = await f(stmt);
      return check2(fname, result, mapStmtToDB.get(stmt));
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
    const f = Module.cwrap(fname, ...decl("nnnn:n"));
    return function(context, value) {
      const byteLength = value.byteLength ?? value.length;
      const ptr = Module._sqlite3_malloc(byteLength);
      Module.HEAPU8.subarray(ptr).set(value);
      f(context, ptr, byteLength, sqliteFreeAddress);
    };
  }();
  sqlite3.result_double = function() {
    const fname = "sqlite3_result_double";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(context, value) {
      f(context, value);
    };
  }();
  sqlite3.result_int = function() {
    const fname = "sqlite3_result_int";
    const f = Module.cwrap(fname, ...decl("nn:n"));
    return function(context, value) {
      f(context, value);
    };
  }();
  sqlite3.result_int64 = function() {
    const fname = "sqlite3_result_int64";
    const f = Module.cwrap(fname, ...decl("nnn:n"));
    return function(context, value) {
      if (value > MAX_INT64 || value < MIN_INT64) return SQLITE_RANGE;
      const lo32 = value & 0xffffffffn;
      const hi32 = value >> 32n;
      f(context, Number(lo32), Number(hi32));
    };
  }();
  sqlite3.result_null = function() {
    const fname = "sqlite3_result_null";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(context) {
      f(context);
    };
  }();
  sqlite3.result_text = function() {
    const fname = "sqlite3_result_text";
    const f = Module.cwrap(fname, ...decl("nnnn:n"));
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
      return f instanceof AsyncFunction ? async (_, iAction, p3, p4, p5, p6) => f(...cvtArgs(_, iAction, p3, p4, p5, p6)) : (_, iAction, p3, p4, p5, p6) => f(...cvtArgs(_, iAction, p3, p4, p5, p6));
    }
    const result = Module.set_authorizer(db, adapt(xAuth), pApp);
    return check2("sqlite3_set_authorizer", result, db);
  };
  sqlite3.sql = function() {
    const fname = "sqlite3_sql";
    const f = Module.cwrap(fname, ...decl("n:s"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.statements = function(db, sql, options = {}) {
    const prepare = Module.cwrap(
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
        const pzHead = Module._sqlite3_malloc(allocSize);
        const pzEnd = pzHead + utf8.byteLength + 1;
        onFinally.push(() => Module._sqlite3_free(pzHead));
        Module.HEAPU8.set(utf8, pzHead);
        Module.HEAPU8[pzEnd - 1] = 0;
        const pStmt = pzHead + allocSize - 8;
        const pzTail = pzHead + allocSize - 4;
        let stmt;
        onFinally.push(maybeFinalize2);
        Module.setValue(pzTail, pzHead, "*");
        do {
          maybeFinalize2();
          const zTail = Module.getValue(pzTail, "*");
          const rc = await retry(() => {
            return prepare(
              db,
              zTail,
              pzEnd - pzTail,
              options.flags || 0,
              pStmt,
              pzTail
            );
          });
          if (rc !== SQLITE_OK) {
            check2("sqlite3_prepare_v3", rc, db);
          }
          stmt = Module.getValue(pStmt, "*");
          if (stmt) {
            mapStmtToDB.set(stmt, db);
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
    const f = Module.cwrap(fname, ...decl("n:n"), { async });
    return async function(stmt) {
      verifyStatement(stmt);
      const rc = await retry(() => f(stmt));
      return check2(fname, rc, mapStmtToDB.get(stmt), [SQLITE_ROW, SQLITE_DONE]);
    };
  }();
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
      return f instanceof AsyncFunction ? async (iUpdateType, dbName, tblName, lo32, hi32) => f(...cvtArgs(iUpdateType, dbName, tblName, lo32, hi32)) : (iUpdateType, dbName, tblName, lo32, hi32) => f(...cvtArgs(iUpdateType, dbName, tblName, lo32, hi32));
    }
    Module.update_hook(db, adapt(xUpdateHook));
  };
  sqlite3.value = function(pValue) {
    const type = sqlite3.value_type(pValue);
    switch (type) {
      case SQLITE_BLOB:
        return sqlite3.value_blob(pValue);
      case SQLITE_FLOAT:
        return sqlite3.value_double(pValue);
      case SQLITE_INTEGER:
        const lo32 = sqlite3.value_int(pValue);
        const hi32 = Module.getTempRet0();
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
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const nBytes = sqlite3.value_bytes(pValue);
      const address = f(pValue);
      const result = Module.HEAPU8.subarray(address, address + nBytes);
      return result;
    };
  }();
  sqlite3.value_bytes = function() {
    const fname = "sqlite3_value_bytes";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_double = function() {
    const fname = "sqlite3_value_double";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_int = function() {
    const fname = "sqlite3_value_int64";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_int64 = function() {
    const fname = "sqlite3_value_int64";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const lo32 = f(pValue);
      const hi32 = Module.getTempRet0();
      const result = cvt32x2ToBigInt(lo32, hi32);
      return result;
    };
  }();
  sqlite3.value_text = function() {
    const fname = "sqlite3_value_text";
    const f = Module.cwrap(fname, ...decl("n:s"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_type = function() {
    const fname = "sqlite3_value_type";
    const f = Module.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.vfs_register = function(vfs, makeDefault) {
    const result = Module.vfs_register(vfs, makeDefault);
    return check2("sqlite3_vfs_register", result);
  };
  function check2(fname, result, db = null, allowed = [SQLITE_OK]) {
    if (allowed.includes(result)) return result;
    const message = db ? Module.ccall("sqlite3_errmsg", "string", ["number"], [db]) : fname;
    throw new SQLiteError(message, result);
  }
  async function retry(f) {
    let rc;
    do {
      if (Module.retryOps.length) {
        await Promise.all(Module.retryOps);
        Module.retryOps = [];
      }
      rc = await f();
    } while (rc && Module.retryOps.length);
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
async function close(core) {
  await core.sqlite.close(core.pointer);
}
function changes(core) {
  return core.sqliteModule._sqlite3_changes(core.pointer);
}
function lastInsertRowId(core) {
  return core.sqliteModule._sqlite3_last_insert_rowid(core.pointer);
}
function parseOpenV2Flag(readonly) {
  return readonly ? SQLITE_OPEN_READONLY : SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE;
}
async function initSQLiteCore(options) {
  const { path, sqliteModule, vfsFn, vfsOptions, readonly, beforeOpen } = await options;
  const sqlite = Factory(sqliteModule);
  const vfs = await vfsFn(path, sqliteModule, vfsOptions);
  sqlite.vfs_register(vfs, true);
  await beforeOpen?.(vfs, path);
  const pointer = await sqlite.open_v2(
    path,
    parseOpenV2Flag(readonly)
  );
  return {
    db: pointer,
    path,
    pointer,
    sqlite,
    sqliteModule,
    vfs
  };
}
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  changes,
  close,
  initSQLiteCore,
  lastInsertRowId,
  parseOpenV2Flag
});
function parseBigInt(num) {
  return num === void 0 || num === null ? void 0 : BigInt(num);
}
var initEvent = "0";
var runEvent = "1";
var closeEvent = "2";
var dataEvent = "3";
var endEvent = "4";
function createGenericOnMessageCallback(init, post, message) {
  let db;
  return async ([type, data1, data2, data3]) => {
    const ret = [type, null, null];
    try {
      switch (type) {
        case initEvent: {
          db = await init(data1);
          break;
        }
        case runEvent: {
          ret[1] = await db.query(data1, data2, data3);
          break;
        }
        case closeEvent: {
          await db.close();
          break;
        }
        case dataEvent: {
          if (!db.iterator) {
            throw new Error("streamQuery() is not supported.");
          }
          const it = db.iterator(data1, data2, data3);
          for await (const row of it) {
            post([type, row, null]);
          }
          ret[0] = endEvent;
          break;
        }
        default: {
          if (message) ;
        }
      }
    } catch (error) {
      ret[2] = error;
    }
    post(ret);
  };
}
function createWebOnMessageCallback(init, message) {
  const cb = createGenericOnMessageCallback(
    init,
    (value) => globalThis.postMessage(value),
    message
  );
  globalThis.onmessage = ({ data }) => cb(data);
}
var defaultCreateDatabaseFn = async ({ fileName, url, useOPFS }) => {
  return (await Promise.resolve().then(function() {
    return index;
  })).initSQLiteCore(
    (useOPFS ? (await import("./opfs-CdaycY4w.js")).useOpfsStorage : (await import("./idb-C0B4Vu5R.js")).useIdbStorage)(
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
      insertId: parseBigInt(lastInsertRowId(core)),
      numAffectedRows: parseBigInt(changes(core))
    };
  }
  const mapRow = createRowMapper(core.sqlite, stmt);
  const result = new Array(size);
  let idx = 0;
  while (await core.sqlite.step(stmt) === SQLITE_ROW) {
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
      if (result === SQLITE_ROW) {
        cache[idx] = mapRow(core.sqlite.row(stmt));
        if (++idx === chunkSize) {
          yield cache.slice(0, idx);
          idx = 0;
        }
      } else if (result === SQLITE_OK) {
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
  createWebOnMessageCallback(
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
    close: async () => await close(db),
    iterator: (_isSelect, sql, parameters, chunkSize) => iterateDate(
      db,
      sql,
      parameters,
      chunkSize
    )
  };
}
createOnMessageCallback(defaultCreateDatabaseFn);
export {
  SQLITE_FCNTL_COMMIT_ATOMIC_WRITE as A,
  SQLITE_FCNTL_BEGIN_ATOMIC_WRITE as B,
  SQLITE_FCNTL_SYNC as C,
  SQLITE_ERROR as D,
  SQLITE_IOCAP_BATCH_ATOMIC as E,
  FacadeVFS as F,
  SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN as G,
  SQLITE_OPEN_MAIN_DB as S,
  SQLITE_BUSY as a,
  SQLITE_OPEN_CREATE as b,
  SQLITE_CANTOPEN as c,
  SQLITE_OK as d,
  SQLITE_IOERR_DELETE as e,
  SQLITE_IOERR_ACCESS as f,
  SQLITE_OPEN_DELETEONCLOSE as g,
  SQLITE_IOERR_CLOSE as h,
  SQLITE_IOERR_SHORT_READ as i,
  SQLITE_IOERR_READ as j,
  SQLITE_IOERR_WRITE as k,
  SQLITE_IOERR_TRUNCATE as l,
  SQLITE_IOERR_FSYNC as m,
  SQLITE_IOERR_FSTAT as n,
  SQLITE_LOCK_NONE as o,
  SQLITE_FCNTL_PRAGMA as p,
  SQLITE_IOERR as q,
  SQLITE_NOTFOUND as r,
  SQLITE_IOERR_LOCK as s,
  SQLITE_IOERR_UNLOCK as t,
  SQLITE_IOERR_CHECKRESERVEDLOCK as u,
  SQLITE_LOCK_RESERVED as v,
  SQLITE_LOCK_EXCLUSIVE as w,
  SQLITE_LOCK_SHARED as x,
  SQLITE_OPEN_TEMP_DB as y,
  SQLITE_FCNTL_ROLLBACK_ATOMIC_WRITE as z
};
