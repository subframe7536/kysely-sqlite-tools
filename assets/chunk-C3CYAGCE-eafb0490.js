var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { z, v, J, W } from "./worker-cad26e17.js";
var u = class {
  constructor() {
    __publicField(this, "mxPathName", 64);
  }
  xClose(e) {
    return z;
  }
  xRead(e, r, n) {
    return z;
  }
  xWrite(e, r, n) {
    return z;
  }
  xTruncate(e, r) {
    return z;
  }
  xSync(e, r) {
    return v;
  }
  xFileSize(e, r) {
    return z;
  }
  xLock(e, r) {
    return v;
  }
  xUnlock(e, r) {
    return v;
  }
  xCheckReservedLock(e, r) {
    return r.setInt32(0, 0, true), v;
  }
  xFileControl(e, r, n) {
    return J;
  }
  xSectorSize(e) {
    return 512;
  }
  xDeviceCharacteristics(e) {
    return 0;
  }
  xOpen(e$1, r, n, f) {
    return W;
  }
  xDelete(e, r) {
    return z;
  }
  xAccess(e, r, n) {
    return z;
  }
  handleAsync(e) {
    return e();
  }
};
export {
  u
};
