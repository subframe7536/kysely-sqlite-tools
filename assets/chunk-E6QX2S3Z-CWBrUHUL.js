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
var AsyncFunction = Object.getPrototypeOf(async function() {
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
function delegalize(lo32, hi32) {
  return hi32 * 4294967296 + lo32 + (lo32 < 0 ? 2 ** 32 : 0);
}
export {
  SQLITE_LOCK_NONE as A,
  SQLITE_FCNTL_PRAGMA as B,
  SQLITE_IOERR as C,
  SQLITE_NOTFOUND as D,
  SQLITE_IOERR_LOCK as E,
  FacadeVFS as F,
  SQLITE_IOERR_UNLOCK as G,
  SQLITE_IOERR_CHECKRESERVEDLOCK as H,
  SQLITE_LOCK_RESERVED as I,
  SQLITE_LOCK_EXCLUSIVE as J,
  SQLITE_LOCK_SHARED as K,
  SQLITE_OPEN_TEMP_DB as L,
  SQLITE_FCNTL_ROLLBACK_ATOMIC_WRITE as M,
  SQLITE_FCNTL_COMMIT_ATOMIC_WRITE as N,
  SQLITE_FCNTL_BEGIN_ATOMIC_WRITE as O,
  SQLITE_FCNTL_SYNC as P,
  SQLITE_ERROR as Q,
  SQLITE_IOCAP_BATCH_ATOMIC as R,
  SQLITE_OK as S,
  SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN as T,
  SQLITE_NOTICE as a,
  SQLITE_RANGE as b,
  SQLITE_TEXT as c,
  SQLITE_NULL as d,
  SQLITE_INTEGER as e,
  SQLITE_FLOAT as f,
  SQLITE_BLOB as g,
  SQLITE_ROW as h,
  SQLITE_OPEN_READONLY as i,
  SQLITE_OPEN_READWRITE as j,
  SQLITE_OPEN_CREATE as k,
  SQLITE_MISUSE as l,
  SQLITE_DONE as m,
  SQLITE_OPEN_MAIN_DB as n,
  SQLITE_BUSY as o,
  SQLITE_CANTOPEN as p,
  SQLITE_IOERR_DELETE as q,
  SQLITE_IOERR_ACCESS as r,
  SQLITE_OPEN_DELETEONCLOSE as s,
  SQLITE_IOERR_CLOSE as t,
  SQLITE_IOERR_SHORT_READ as u,
  SQLITE_IOERR_READ as v,
  SQLITE_IOERR_WRITE as w,
  SQLITE_IOERR_TRUNCATE as x,
  SQLITE_IOERR_FSYNC as y,
  SQLITE_IOERR_FSTAT as z
};
