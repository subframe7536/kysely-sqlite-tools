//#region \0@oxc-project+runtime@0.137.0/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/toPrimitive.js
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
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/checkPrivateRedeclaration.js
function _checkPrivateRedeclaration(e, t) {
	if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/classPrivateMethodInitSpec.js
function _classPrivateMethodInitSpec(e, a) {
	_checkPrivateRedeclaration(e, a), a.add(e);
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/assertClassBrand.js
function _assertClassBrand(e, t, n) {
	if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw new TypeError("Private element is not present on this object");
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/classPrivateFieldInitSpec.js
function _classPrivateFieldInitSpec(e, t, a) {
	_checkPrivateRedeclaration(e, t), t.set(e, a);
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/classPrivateFieldGet2.js
function _classPrivateFieldGet2(s, a) {
	return s.get(_assertClassBrand(s, a));
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/classPrivateFieldSet2.js
function _classPrivateFieldSet2(s, a, r) {
	return s.set(_assertClassBrand(s, a), r), r;
}
//#endregion
//#region ../node_modules/.pnpm/@subframe7536+sqlite-wasm@1.3.0/node_modules/@subframe7536/sqlite-wasm/dist/FacadeVFS-XQtZprLW.js
var _Class_brand, _module, _array, _Class_brand2, _module2, _type, _view, _Class_brand3;
let _Symbol$iterator;
const SQLITE_IOERR_ACCESS = 3338;
const SQLITE_IOERR_CHECKRESERVEDLOCK = 3594;
const SQLITE_IOERR_CLOSE = 4106;
const SQLITE_IOERR_DELETE = 2570;
const SQLITE_IOERR_FSTAT = 1802;
const SQLITE_IOERR_FSYNC = 1034;
const SQLITE_IOERR_LOCK = 3850;
const SQLITE_IOERR_TRUNCATE = 1546;
const SQLITE_IOERR_UNLOCK = 2058;
const SQLITE_OPEN_TRANSIENT_DB = 1024;
const SQLITE_OPEN_MAIN_JOURNAL = 2048;
const SQLITE_OPEN_TEMP_JOURNAL = 4096;
const SQLITE_OPEN_SUBJOURNAL = 8192;
const SQLITE_OPEN_SUPER_JOURNAL = 16384;
const SQLITE_OPEN_WAL = 524288;
const SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN = 2048;
const SQLITE_IOCAP_BATCH_ATOMIC = 16384;
const DEFAULT_SECTOR_SIZE = 512;
var Base = class {
	/**
	* @param {string} name 
	* @param {object} module 
	*/
	constructor(name, module) {
		_defineProperty(this, "name", void 0);
		_defineProperty(this, "mxPathname", 64);
		_defineProperty(this, "_module", void 0);
		this.name = name;
		this._module = module;
	}
	/**
	* @returns {void|Promise<void>} 
	*/
	close() {}
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
		return 14;
	}
	/**
	* @param {number} pVfs 
	* @param {number} zName 
	* @param {number} syncDir 
	* @returns {number|Promise<number>}
	*/
	xDelete(pVfs, zName, syncDir) {
		return 0;
	}
	/**
	* @param {number} pVfs 
	* @param {number} zName 
	* @param {number} flags 
	* @param {number} pResOut 
	* @returns {number|Promise<number>}
	*/
	xAccess(pVfs, zName, flags, pResOut) {
		return 0;
	}
	/**
	* @param {number} pVfs 
	* @param {number} zName 
	* @param {number} nOut 
	* @param {number} zOut 
	* @returns {number|Promise<number>}
	*/
	xFullPathname(pVfs, zName, nOut, zOut) {
		return 0;
	}
	/**
	* @param {number} pVfs 
	* @param {number} nBuf 
	* @param {number} zBuf 
	* @returns {number|Promise<number>}
	*/
	xGetLastError(pVfs, nBuf, zBuf) {
		return 0;
	}
	/**
	* @param {number} pFile 
	* @returns {number|Promise<number>}
	*/
	xClose(pFile) {
		return 0;
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
		return 0;
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
		return 0;
	}
	/**
	* @param {number} pFile 
	* @param {number} sizeLo 
	* @param {number} sizeHi 
	* @returns {number|Promise<number>}
	*/
	xTruncate(pFile, sizeLo, sizeHi) {
		return 0;
	}
	/**
	* @param {number} pFile 
	* @param {number} flags 
	* @returns {number|Promise<number>}
	*/
	xSync(pFile, flags) {
		return 0;
	}
	/**
	* 
	* @param {number} pFile 
	* @param {number} pSize 
	* @returns {number|Promise<number>}
	*/
	xFileSize(pFile, pSize) {
		return 0;
	}
	/**
	* @param {number} pFile 
	* @param {number} lockType 
	* @returns {number|Promise<number>}
	*/
	xLock(pFile, lockType) {
		return 0;
	}
	/**
	* @param {number} pFile 
	* @param {number} lockType 
	* @returns {number|Promise<number>}
	*/
	xUnlock(pFile, lockType) {
		return 0;
	}
	/**
	* @param {number} pFile 
	* @param {number} pResOut 
	* @returns {number|Promise<number>}
	*/
	xCheckReservedLock(pFile, pResOut) {
		return 0;
	}
	/**
	* @param {number} pFile 
	* @param {number} op 
	* @param {number} pArg 
	* @returns {number|Promise<number>}
	*/
	xFileControl(pFile, op, pArg) {
		return 12;
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
[
	256,
	SQLITE_OPEN_MAIN_JOURNAL,
	512,
	SQLITE_OPEN_TEMP_JOURNAL,
	SQLITE_OPEN_TRANSIENT_DB,
	SQLITE_OPEN_SUBJOURNAL,
	SQLITE_OPEN_SUPER_JOURNAL,
	SQLITE_OPEN_WAL
].reduce((mask, element) => mask | element);
const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
var FacadeVFS = (_Class_brand = /* @__PURE__ */ new WeakSet(), class extends Base {
	/**
	* @param {string} name 
	* @param {object} module 
	*/
	constructor(name, module) {
		super(name, module);
		_classPrivateMethodInitSpec(this, _Class_brand);
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
		return 14;
	}
	/**
	* @param {string} filename 
	* @param {number} syncDir 
	* @returns {number|Promise<number>}
	*/
	jDelete(filename, syncDir) {
		return 0;
	}
	/**
	* @param {string} filename 
	* @param {number} flags 
	* @param {DataView} pResOut 
	* @returns {number|Promise<number>}
	*/
	jAccess(filename, flags, pResOut) {
		return 0;
	}
	/**
	* @param {string} filename 
	* @param {Uint8Array} zOut 
	* @returns {number|Promise<number>}
	*/
	jFullPathname(filename, zOut) {
		const { read, written } = new TextEncoder().encodeInto(filename, zOut);
		if (read < filename.length) return 10;
		if (written >= zOut.length) return 10;
		zOut[written] = 0;
		return 0;
	}
	/**
	* @param {Uint8Array} zBuf 
	* @returns {number|Promise<number>}
	*/
	jGetLastError(zBuf) {
		return 0;
	}
	/**
	* @param {number} pFile 
	* @returns {number|Promise<number>}
	*/
	jClose(pFile) {
		return 0;
	}
	/**
	* @param {number} pFile 
	* @param {Uint8Array} pData 
	* @param {number} iOffset 
	* @returns {number|Promise<number>}
	*/
	jRead(pFile, pData, iOffset) {
		pData.fill(0);
		return 522;
	}
	/**
	* @param {number} pFile 
	* @param {Uint8Array} pData 
	* @param {number} iOffset 
	* @returns {number|Promise<number>}
	*/
	jWrite(pFile, pData, iOffset) {
		return 778;
	}
	/**
	* @param {number} pFile 
	* @param {number} size 
	* @returns {number|Promise<number>}
	*/
	jTruncate(pFile, size) {
		return 0;
	}
	/**
	* @param {number} pFile 
	* @param {number} flags 
	* @returns {number|Promise<number>}
	*/
	jSync(pFile, flags) {
		return 0;
	}
	/**
	* @param {number} pFile 
	* @param {DataView} pSize
	* @returns {number|Promise<number>}
	*/
	jFileSize(pFile, pSize) {
		return 0;
	}
	/**
	* @param {number} pFile 
	* @param {number} lockType 
	* @returns {number|Promise<number>}
	*/
	jLock(pFile, lockType) {
		return 0;
	}
	/**
	* @param {number} pFile 
	* @param {number} lockType 
	* @returns {number|Promise<number>}
	*/
	jUnlock(pFile, lockType) {
		return 0;
	}
	/**
	* @param {number} pFile 
	* @param {DataView} pResOut 
	* @returns {number|Promise<number>}
	*/
	jCheckReservedLock(pFile, pResOut) {
		pResOut.setInt32(0, 0, true);
		return 0;
	}
	/**
	* @param {number} pFile
	* @param {number} op
	* @param {DataView} pArg
	* @returns {number|Promise<number>}
	*/
	jFileControl(pFile, op, pArg) {
		return 12;
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
		const filename = _assertClassBrand(_Class_brand, this, _decodeFilename).call(this, zName, flags);
		const pOutFlagsView = _assertClassBrand(_Class_brand, this, _makeTypedDataView).call(this, "Int32", pOutFlags);
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
		const pResOutView = _assertClassBrand(_Class_brand, this, _makeTypedDataView).call(this, "Int32", pResOut);
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
		const pDataArray = _assertClassBrand(_Class_brand, this, _makeDataArray).call(this, pData, iAmt);
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
		const pDataArray = _assertClassBrand(_Class_brand, this, _makeDataArray).call(this, pData, iAmt);
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
		const pSizeView = _assertClassBrand(_Class_brand, this, _makeTypedDataView).call(this, "BigInt64", pSize);
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
		const pResOutView = _assertClassBrand(_Class_brand, this, _makeTypedDataView).call(this, "Int32", pResOut);
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
		const pArgView = new DataView(this._module.HEAPU8.buffer, this._module.HEAPU8.byteOffset + pArg);
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
});
/**
* Wrapped DataView for pointer arguments.
* Pointers to a single value are passed using a DataView-like class.
* This wrapper class prevents use of incorrect type or endianness, and
* reacquires the underlying buffer when the WebAssembly memory is resized.
* @param {'Int32'|'BigInt64'} type 
* @param {number} byteOffset 
* @returns {DataView}
*/
function _makeTypedDataView(type, byteOffset) {
	return new DataViewProxy(this._module, byteOffset, type);
}
/**
* Wrapped Uint8Array for buffer arguments.
* Memory blocks are passed as a Uint8Array-like class. This wrapper
* class reacquires the underlying buffer when the WebAssembly memory
* is resized.
* @param {number} byteOffset 
* @param {number} byteLength 
* @returns {Uint8Array}
*/
function _makeDataArray(byteOffset, byteLength) {
	return new Uint8ArrayProxy(this._module, byteOffset, byteLength);
}
function _decodeFilename(zName, flags) {
	if (flags & 64) {
		let pName = zName;
		let state = 1;
		const charCodes = [];
		while (state) {
			const charCode = this._module.HEAPU8[pName++];
			if (charCode) charCodes.push(charCode);
			else {
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
}
function delegalize(lo32, hi32) {
	return hi32 * 4294967296 + lo32 + (lo32 < 0 ? 2 ** 32 : 0);
}
var Uint8ArrayProxy = (_module = /* @__PURE__ */ new WeakMap(), _array = /* @__PURE__ */ new WeakMap(), _Class_brand2 = /* @__PURE__ */ new WeakSet(), _Symbol$iterator = Symbol.iterator, class {
	/**
	* @param {*} module
	* @param {number} byteOffset 
	* @param {number} byteLength 
	*/
	constructor(module, byteOffset, byteLength) {
		_classPrivateMethodInitSpec(this, _Class_brand2);
		_classPrivateFieldInitSpec(this, _module, void 0);
		_classPrivateFieldInitSpec(this, _array, /* @__PURE__ */ new Uint8Array());
		_classPrivateFieldSet2(_module, this, module);
		this.byteOffset = byteOffset;
		this.length = this.byteLength = byteLength;
	}
	get buffer() {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).buffer;
	}
	at(index) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).at(index);
	}
	copyWithin(target, start, end) {
		_get_array.call(_assertClassBrand(_Class_brand2, this)).copyWithin(target, start, end);
	}
	entries() {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).entries();
	}
	every(predicate) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).every(predicate);
	}
	fill(value, start, end) {
		_get_array.call(_assertClassBrand(_Class_brand2, this)).fill(value, start, end);
	}
	filter(predicate) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).filter(predicate);
	}
	find(predicate) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).find(predicate);
	}
	findIndex(predicate) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).findIndex(predicate);
	}
	findLast(predicate) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).findLast(predicate);
	}
	findLastIndex(predicate) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).findLastIndex(predicate);
	}
	forEach(callback) {
		_get_array.call(_assertClassBrand(_Class_brand2, this)).forEach(callback);
	}
	includes(value, start) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).includes(value, start);
	}
	indexOf(value, start) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).indexOf(value, start);
	}
	join(separator) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).join(separator);
	}
	keys() {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).keys();
	}
	lastIndexOf(value, start) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).lastIndexOf(value, start);
	}
	map(callback) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).map(callback);
	}
	reduce(callback, initialValue) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).reduce(callback, initialValue);
	}
	reduceRight(callback, initialValue) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).reduceRight(callback, initialValue);
	}
	reverse() {
		_get_array.call(_assertClassBrand(_Class_brand2, this)).reverse();
	}
	set(array, offset) {
		_get_array.call(_assertClassBrand(_Class_brand2, this)).set(array, offset);
	}
	slice(start, end) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).slice(start, end);
	}
	some(predicate) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).some(predicate);
	}
	sort(compareFn) {
		_get_array.call(_assertClassBrand(_Class_brand2, this)).sort(compareFn);
	}
	subarray(begin, end) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).subarray(begin, end);
	}
	toLocaleString(locales, options) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).toLocaleString(locales, options);
	}
	toReversed() {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).toReversed();
	}
	toSorted(compareFn) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).toSorted(compareFn);
	}
	toString() {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).toString();
	}
	values() {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).values();
	}
	with(index, value) {
		return _get_array.call(_assertClassBrand(_Class_brand2, this)).with(index, value);
	}
	[_Symbol$iterator]() {
		return _get_array.call(_assertClassBrand(_Class_brand2, this))[Symbol.iterator]();
	}
});
function _get_array() {
	if (_classPrivateFieldGet2(_array, this).buffer.byteLength === 0) _classPrivateFieldSet2(_array, this, _classPrivateFieldGet2(_module, this).HEAPU8.subarray(this.byteOffset, this.byteOffset + this.byteLength));
	return _classPrivateFieldGet2(_array, this);
}
var DataViewProxy = (_module2 = /* @__PURE__ */ new WeakMap(), _type = /* @__PURE__ */ new WeakMap(), _view = /* @__PURE__ */ new WeakMap(), _Class_brand3 = /* @__PURE__ */ new WeakSet(), class {
	/**
	* @param {*} module
	* @param {number} byteOffset 
	* @param {'Int32'|'BigInt64'} type
	*/
	constructor(module, byteOffset, type) {
		_classPrivateMethodInitSpec(this, _Class_brand3);
		_classPrivateFieldInitSpec(this, _module2, void 0);
		_classPrivateFieldInitSpec(this, _type, void 0);
		_classPrivateFieldInitSpec(this, _view, /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(0)));
		_classPrivateFieldSet2(_module2, this, module);
		this.byteOffset = byteOffset;
		_classPrivateFieldSet2(_type, this, type);
	}
	get buffer() {
		return _get_view.call(_assertClassBrand(_Class_brand3, this)).buffer;
	}
	get byteLength() {
		return _classPrivateFieldGet2(_type, this) === "Int32" ? 4 : 8;
	}
	getInt32(byteOffset, littleEndian) {
		if (_classPrivateFieldGet2(_type, this) !== "Int32") throw new Error("invalid type");
		if (!littleEndian) throw new Error("must be little endian");
		return _get_view.call(_assertClassBrand(_Class_brand3, this)).getInt32(byteOffset, littleEndian);
	}
	setInt32(byteOffset, value, littleEndian) {
		if (_classPrivateFieldGet2(_type, this) !== "Int32") throw new Error("invalid type");
		if (!littleEndian) throw new Error("must be little endian");
		_get_view.call(_assertClassBrand(_Class_brand3, this)).setInt32(byteOffset, value, littleEndian);
	}
	getBigInt64(byteOffset, littleEndian) {
		if (_classPrivateFieldGet2(_type, this) !== "BigInt64") throw new Error("invalid type");
		if (!littleEndian) throw new Error("must be little endian");
		return _get_view.call(_assertClassBrand(_Class_brand3, this)).getBigInt64(byteOffset, littleEndian);
	}
	setBigInt64(byteOffset, value, littleEndian) {
		if (_classPrivateFieldGet2(_type, this) !== "BigInt64") throw new Error("invalid type");
		if (!littleEndian) throw new Error("must be little endian");
		_get_view.call(_assertClassBrand(_Class_brand3, this)).setBigInt64(byteOffset, value, littleEndian);
	}
});
function _get_view() {
	if (_classPrivateFieldGet2(_view, this).buffer.byteLength === 0) _classPrivateFieldSet2(_view, this, new DataView(_classPrivateFieldGet2(_module2, this).HEAPU8.buffer, _classPrivateFieldGet2(_module2, this).HEAPU8.byteOffset + this.byteOffset));
	return _classPrivateFieldGet2(_view, this);
}
//#endregion
export { _classPrivateMethodInitSpec as _, SQLITE_IOERR_CHECKRESERVEDLOCK as a, SQLITE_IOERR_FSTAT as c, SQLITE_IOERR_TRUNCATE as d, SQLITE_IOERR_UNLOCK as f, _assertClassBrand as g, _classPrivateFieldInitSpec as h, SQLITE_IOERR_ACCESS as i, SQLITE_IOERR_FSYNC as l, _classPrivateFieldGet2 as m, SQLITE_IOCAP_BATCH_ATOMIC as n, SQLITE_IOERR_CLOSE as o, _classPrivateFieldSet2 as p, SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN as r, SQLITE_IOERR_DELETE as s, FacadeVFS as t, SQLITE_IOERR_LOCK as u, _defineProperty as v };
