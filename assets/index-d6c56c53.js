var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _dynamicReference, _props, _props2, _props3, _props4, _props5, _props6, _props7, _props8, _props9, _queryId, _transformers, _schema, _schemableIds, _ctes, _isRootOperationNode, isRootOperationNode_fn, _collectSchemableIds, collectSchemableIds_fn, _collectCTEs, collectCTEs_fn, _collectSchemableIdsFromTableExpr, collectSchemableIdsFromTableExpr_fn, _collectSchemableId, collectSchemableId_fn, _collectCTEIds, collectCTEIds_fn, _transformer, _props10, _promise, _resolve, _reject, _plugins, _transformResult, transformResult_fn, _node, _expr, _alias, _node2, _node3, _props11, _queryBuilder, _alias2, _props12, _aggregateFunctionBuilder, _alias3, _props13, _props14, _props15, _props16, _node4, _createBuilderWithPathLeg, createBuilderWithPathLeg_fn, _node5, _jsonPath, _alias4, _node6, _node7, _column, _alterColumnNode, _props17, _props18, _props19, _props20, _props21, _props22, _props23, _props24, _props25, _props26, _props27, _transformer2, _props28, _props29, _props30, _props31, _executor, _driver, _compiler, _adapter, _connectionProvider, _driver2, _log, _initPromise, _initDone, _destroyPromise, _connections, _needsLogging, needsLogging_fn, _addLogging, addLogging_fn, _logError, logError_fn, _logQuery, logQuery_fn, _calculateDurationMillis, calculateDurationMillis_fn, _connection, _runningPromise, _run, run_fn, _levels, _logger, _props32, _props33, _props34, _props35, _props36, _getExecutor, getExecutor_fn, _toOperationNode, toOperationNode_fn, _compile, compile_fn, _rawBuilder, _alias5, _visitors, _sql, _parameters, _db, _getTableMetadata, getTableMetadata_fn, _connectionMutex, _a, _config, _b, _state, _releasers, _pending, _apply, apply_fn, _lock, lock_fn, _unlock, unlock_fn, _c, _db2, _dbReady, _txOptions, _tx, _txTimestamp, _runChain, _putChain, _run2, run_fn2, _d, _objectStore, _e, _index, _f, _options, _mapIdToFile, _idb, _pendingPurges, _taskTimestamp, _pendingAsync, _xWriteHelper, xWriteHelper_fn, _xSyncHelper, xSyncHelper_fn, _maybePurge, maybePurge_fn, _bound, bound_fn, _reblockIfNeeded, reblockIfNeeded_fn, _g, _config2, _h;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction$2 = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject$1(val) || isFunction$2(val)) && isFunction$2(val.then) && isFunction$2(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s = str ? `on${capitalize(str)}` : ``;
  return s;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$1(value) || isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$1(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const toDisplayString = (val) => {
  return isString$1(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction$2(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect2) {
  const { deps } = effect2;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect2);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    trackEffects(dep);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep];
  for (const effect2 of effects) {
    if (effect2.computed) {
      triggerEffect(effect2);
    }
  }
  for (const effect2 of effects) {
    if (!effect2.computed) {
      triggerEffect(effect2);
    }
  }
}
function triggerEffect(effect2, debuggerEventExtraInfo) {
  if (effect2 !== activeEffect || effect2.allowRecurse) {
    if (effect2.scheduler) {
      effect2.scheduler();
    } else {
      effect2.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _shallow = false) {
    this._isReadonly = _isReadonly;
    this._shallow = _shallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, shallow = this._shallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(shallow = false) {
    super(false, shallow);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!this._shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(shallow = false) {
    super(true, shallow);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
  true
);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(
      method,
      false,
      false
    );
    readonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      false
    );
    shallowInstrumentations2[method] = createIterableMethod(
      method,
      false,
      true
    );
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()));
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    {
      triggerEffects(dep);
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$2(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
function warn(msg, ...args) {
  return;
}
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$2(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  queue.sort(comparator);
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim: trim2 } = props[modifiersKey] || EMPTY_OBJ;
    if (trim2) {
      args = rawArgs.map((a) => isString$1(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$2(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(
        render.call(
          proxyToUse,
          proxyToUse,
          renderCache,
          props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false)
        ;
      result = normalizeVNode(
        render2.length > 1 ? render2(
          props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return attrs;
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render2(
          props,
          null
          /* we know it doesn't need it */
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  var _a2;
  const instance = getCurrentScope() === ((_a2 = currentInstance) == null ? void 0 : _a2.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction$2(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else
        ;
    });
  } else if (isFunction$2(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(
      effect.run.bind(effect),
      instance && instance.suspense
    );
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$2(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction$2(options) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$2(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject$1(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction$2(opt) ? opt.bind(publicThis, publicThis) : isFunction$2(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction$2(opt) && isFunction$2(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction$2(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$1(raw)) {
    const handler = ctx[raw];
    if (isFunction$2(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction$2(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction$2(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$2(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction$2(to) ? to.call(this, this) : to,
      isFunction$2(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction$2(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction$2(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction$2(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else
          ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = null;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$2(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else
      ;
  }
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction$2(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$2(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction$2(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction$2(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false)
      ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction$2(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(
        children,
        instance.slots = {}
      );
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString$1(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction$2(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString$1(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else
          ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else
          ;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      isSVG,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      isSVG,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        isSVG && type !== "foreignObject",
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(
            el,
            key,
            null,
            props[key],
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(
          el,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          isSVG
        );
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(
                el,
                key,
                prev,
                next,
                isSVG,
                n1.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(
        el,
        n2,
        oldProps,
        newProps,
        parentComponent,
        parentSuspense,
        isSVG
      );
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              isSVG,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(
            el,
            key,
            prev,
            next,
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        n2.children,
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          isSVG,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(
      instance,
      initialVNode,
      container,
      anchor,
      parentSuspense,
      isSVG,
      optimized
    );
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            isSVG
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => effect.run();
    update.id = instance.uid;
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref2,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          optimized,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(
      internals
    );
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
      /* isBlock */
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref2,
  ref_key,
  ref_for
}) => {
  if (typeof ref2 === "number") {
    ref2 = "" + ref2;
  }
  return ref2 != null ? isString$1(ref2) || isRef(ref2) || isFunction$2(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$1(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$1(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$1(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction$2(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction$2(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
let internalSetCurrentInstance;
let globalCurrentInstanceSetters;
let settersKey = "__VUE_INSTANCE_SETTERS__";
{
  if (!(globalCurrentInstanceSetters = getGlobalThis()[settersKey])) {
    globalCurrentInstanceSetters = getGlobalThis()[settersKey] = [];
  }
  globalCurrentInstanceSetters.push((i) => currentInstance = i);
  internalSetCurrentInstance = (instance) => {
    if (globalCurrentInstanceSetters.length > 1) {
      globalCurrentInstanceSetters.forEach((s) => s(instance));
    } else {
      globalCurrentInstanceSetters[0](instance);
    }
  };
}
const setCurrentInstance = (instance) => {
  internalSetCurrentInstance(instance);
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [instance.props, setupContext]
    );
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$2(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(
          extend(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      unsetCurrentInstance();
    }
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      }
    }
  ));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      get attrs() {
        return getAttrsProxy(instance);
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
function isClassComponent(value) {
  return isFunction$2(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
const version = "3.3.8";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const vtcKey = Symbol("_vtc");
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOldKey = Symbol("_vod");
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$1(next);
  if (next && !isCssString) {
    if (prev && !isString$1(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if (vShowOldKey in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean2 = isSpecialBooleanAttr(key);
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean2 ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    el._value = value;
    const oldValue = tag === "OPTION" ? el.getAttribute("value") : el.value;
    const newValue = value == null ? "" : value;
    if (oldValue !== newValue) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(
      el,
      key,
      nextValue,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren
    );
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction$2(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString$1(value)) {
    return false;
  }
  return key in el;
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app._component;
    if (!isFunction$2(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
function normalizeContainer(container) {
  if (isString$1(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
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
function isFunction$1(obj) {
  return typeof obj === "function";
}
function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}
function freeze(obj) {
  return Object.freeze(obj);
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
  cloneWithColumn(createTable, column) {
    return freeze({
      ...createTable,
      columns: freeze([...createTable.columns, column])
    });
  },
  cloneWithConstraint(createTable, constraint) {
    return freeze({
      ...createTable,
      constraints: createTable.constraints ? freeze([...createTable.constraints, constraint]) : freeze([constraint])
    });
  },
  cloneWithFrontModifier(createTable, modifier) {
    return freeze({
      ...createTable,
      frontModifiers: createTable.frontModifiers ? freeze([...createTable.frontModifiers, modifier]) : freeze([modifier])
    });
  },
  cloneWithEndModifier(createTable, modifier) {
    return freeze({
      ...createTable,
      endModifiers: createTable.endModifiers ? freeze([...createTable.endModifiers, modifier]) : freeze([modifier])
    });
  },
  cloneWith(createTable, params) {
    return freeze({
      ...createTable,
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
  cloneWith(dropIndex, props) {
    return freeze({
      ...dropIndex,
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
  cloneWith(dropIndex, params) {
    return freeze({
      ...dropIndex,
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
  return isObject(obj) && isFunction$1(obj.toOperationNode);
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
  create(modifier) {
    return freeze({
      kind: "SelectModifierNode",
      modifier
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
  "&&",
  "?",
  "?&",
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
  "regexp"
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
  create(column) {
    return freeze({
      kind: "ColumnNode",
      column: IdentifierNode.create(column)
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
class DynamicReferenceBuilder {
  constructor(reference) {
    __privateAdd(this, _dynamicReference, void 0);
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
function parseOrderByItem(ref2, direction) {
  const parsedRef = parseOrderByExpression(ref2);
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
  const [ref2, direction] = expr.split(" ");
  if (direction) {
    if (!isOrderByDirection(direction)) {
      throw new Error(`Invalid order by direction: ${direction}`);
    }
    return OrderByItemNode.create(parseStringReference(ref2), parseOrderByDirectionExpression(direction));
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
function parseJSONReference(ref2, op) {
  const referenceNode = parseStringReference(ref2);
  if (isJSONOperator(op)) {
    return JSONReferenceNode.create(referenceNode, JSONOperatorChainNode.create(OperatorNode.create(op)));
  }
  const opWithoutLastChar = op.slice(0, -1);
  if (isJSONOperator(opWithoutLastChar)) {
    return JSONReferenceNode.create(referenceNode, JSONPathNode.create(OperatorNode.create(opWithoutLastChar)));
  }
  throw new Error(`Invalid JSON operator: ${op}`);
}
function parseStringReference(ref2) {
  const COLUMN_SEPARATOR = ".";
  if (!ref2.includes(COLUMN_SEPARATOR)) {
    return ReferenceNode.create(ColumnNode.create(ref2));
  }
  const parts = ref2.split(COLUMN_SEPARATOR).map(trim$2);
  if (parts.length === 3) {
    return parseStringReferenceWithTableAndSchema(parts);
  }
  if (parts.length === 2) {
    return parseStringReferenceWithTable(parts);
  }
  throw new Error(`invalid column reference ${ref2}`);
}
function parseAliasedStringReference(ref2) {
  const ALIAS_SEPARATOR = " as ";
  if (ref2.includes(ALIAS_SEPARATOR)) {
    const [columnRef, alias] = ref2.split(ALIAS_SEPARATOR).map(trim$2);
    return AliasNode.create(parseStringReference(columnRef), IdentifierNode.create(alias));
  } else {
    return parseStringReference(ref2);
  }
}
function parseColumnName(column) {
  return ColumnNode.create(column);
}
function parseOrderedColumnName(column) {
  const ORDER_SEPARATOR = " ";
  if (column.includes(ORDER_SEPARATOR)) {
    const [columnName, order] = column.split(ORDER_SEPARATOR).map(trim$2);
    if (!isOrderByDirection(order)) {
      throw new Error(`invalid order direction "${order}" next to "${columnName}"`);
    }
    return parseOrderBy([columnName, order])[0];
  } else {
    return parseColumnName(column);
  }
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
  return parseFilterList(Object.entries(obj).filter(([, v]) => !isUndefined(v)).map(([k, v]) => parseValueBinaryOperation(k, needsIsOperator(v) ? "is" : "=", v)), combinator);
}
function parseFilterList(list, combinator) {
  const combine = combinator === "and" ? AndNode.create : OrNode.create;
  if (list.length === 0) {
    return ValueNode.createImmediate(combinator === "and");
  }
  let node = toOperationNode(list[0]);
  for (let i = 1; i < list.length; ++i) {
    node = combine(node, toOperationNode(list[i]));
  }
  if (list.length > 1) {
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
  cloneWithEndModifier(select, modifier) {
    return freeze({
      ...select,
      endModifiers: select.endModifiers ? freeze([...select.endModifiers, modifier]) : freeze([modifier])
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
    __privateAdd(this, _props, void 0);
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
    __privateAdd(this, _props2, void 0);
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
  if (isFunction$1(selection)) {
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
    return SelectionNode.createSelectAllFromTable(parseTable(table));
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
  const objectOrList = isFunction$1(arg) ? arg(expressionBuilder()) : arg;
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
  cloneWithLimit(deleteNode, limit) {
    return freeze({
      ...deleteNode,
      limit
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
const QueryNode = freeze({
  is(node) {
    return SelectQueryNode.is(node) || InsertQueryNode.is(node) || UpdateQueryNode.is(node) || DeleteQueryNode.is(node);
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
  }
});
const ColumnUpdateNode = freeze({
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
function parseUpdateExpression(update) {
  const updateObj = isFunction$1(update) ? update(expressionBuilder()) : update;
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
     * The auto incrementing primary key
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
    __privateAdd(this, _props3, void 0);
    __privateSet(this, _props3, freeze(props));
  }
  /**
   * Specify a single column as the conflict target.
   *
   * Also see the {@link columns}, {@link constraint} and {@link expression}
   * methods for alternative ways to specify the conflict target.
   */
  column(column) {
    const columnNode = ColumnNode.create(column);
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
  /**
   * Specify an index predicate for the index target.
   *
   * See {@link WhereInterface.whereRef} for more info.
   */
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
   * await db
   *   .insertInto('person')
   *   .values({ first_name, pic })
   *   .onConflict((oc) => oc
   *     .column('pic')
   *     .doNothing()
   *   )
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "pic")
   * values ($1, $2)
   * on conflict ("pic") do nothing
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
   * await db
   *   .insertInto('person')
   *   .values({ first_name, pic })
   *   .onConflict((oc) => oc
   *     .column('pic')
   *     .doUpdateSet({ first_name })
   *   )
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "pic")
   * values ($1, $2)
   * on conflict ("pic")
   * do update set "first_name" = $3
   * ```
   *
   * In the next example we use the `ref` method to reference
   * columns of the virtual table `excluded` in a type-safe way
   * to create an upsert operation:
   *
   * ```ts
   * db.insertInto('person')
   *   .values(person)
   *   .onConflict((oc) => oc
   *     .column('id')
   *     .doUpdateSet((eb) => ({
   *       first_name: eb.ref('excluded.first_name'),
   *       last_name: eb.ref('excluded.last_name')
   *     }))
   *   )
   * ```
   */
  doUpdateSet(update) {
    return new OnConflictUpdateBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWith(__privateGet(this, _props3).onConflictNode, {
        updates: parseUpdateExpression(update)
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
    __privateAdd(this, _props4, void 0);
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
    __privateAdd(this, _props5, void 0);
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
const _InsertQueryBuilder = class _InsertQueryBuilder {
  constructor(props) {
    __privateAdd(this, _props6, void 0);
    __privateSet(this, _props6, freeze(props));
  }
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
   * db.insertInto('person')
   *   .columns(['first_name'])
   *   .expression((eb) => eb.selectFrom('pet').select('pet.name'))
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
   * You can create an `INSERT INTO SELECT FROM` query using the `expression` method:
   *
   * ```ts
   * const result = await db.insertInto('person')
   *   .columns(['first_name', 'last_name', 'age'])
   *   .expression((eb) => eb
   *     .selectFrom('pet')
   *     .select((eb) => [
   *       'pet.name',
   *       eb.val('Petson').as('last_name'),
   *       eb.val(7).as('age'),
   *     ])
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "last_name", "age")
   * select "pet"."name", $1 as "first_name", $2 as "last_name" from "pet"
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
   *   .values(values)
   *   .execute()
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
   * insert into "pet" ("name", "species")
   * values ($1, $2)
   * on conflict ("name")
   * do update set "species" = $3
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
   * insert into "pet" ("name", "species")
   * values ($1, $2)
   * on conflict on constraint "pet_name_key"
   * do update set "species" = $3
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
   *   })
   *   .onConflict((oc) => oc
   *     .expression(sql`lower(name)`)
   *     .doUpdateSet({ species: 'hamster' })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species")
   * values ($1, $2)
   * on conflict (lower(name))
   * do update set "species" = $3
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
   *   })
   *   .onConflict((oc) => oc
   *     .column('name')
   *     .doUpdateSet({ species: 'hamster' })
   *     .where('excluded.name', '!=', 'Catto'')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species")
   * values ($1, $2)
   * on conflict ("name")
   * do update set "species" = $3
   * where "excluded"."name" != $4
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
   * insert into "pet" ("name", "species")
   * values ($1, $2)
   * on conflict ("name") do nothing
   * ```
   *
   * You can refer to the columns of the virtual `excluded` table
   * in a type-safe way using a callback and the `ref` method of
   * `ExpressionBuilder`:
   *
   * ```ts
   * db.insertInto('person')
   *   .values(person)
   *   .onConflict(oc => oc
   *     .column('id')
   *     .doUpdateSet({
   *       first_name: (eb) => eb.ref('excluded.first_name'),
   *       last_name: (eb) => eb.ref('excluded.last_name')
   *     })
   *   )
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
   *   .values(values)
   *   .onDuplicateKeyUpdate({ species: 'hamster' })
   * ```
   */
  onDuplicateKeyUpdate(update) {
    return new _InsertQueryBuilder({
      ...__privateGet(this, _props6),
      queryNode: InsertQueryNode.cloneWith(__privateGet(this, _props6).queryNode, {
        onDuplicateKey: OnDuplicateKeyNode.create(parseUpdateExpression(update))
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
   * function log<T extends Compilable>(qb: T): T {
   *   console.log(qb.compile())
   *   return qb
   * }
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
   * async function insertPerson(values: InsertablePerson, returnLastName: boolean) {
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
   * {
   *   id: number
   *   first_name: string
   *   last_name?: string
   * }
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
   * You should only use this method as the last resort if the types
   * don't support your use case.
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
   * const person = await db.insertInto('person')
   *   .values({ ...inputPerson, nullable_column: 'hell yeah!' })
   *   .returningAll()
   *   .executeTakeFirstOrThrow()
   *
   * if (nullable_column) {
   *   functionThatExpectsPersonWithNonNullValue(person)
   * }
   * ```
   *
   * Into this:
   *
   * ```ts
   * const person = await db.insertInto('person')
   *   .values({ ...inputPerson, nullable_column: 'hell yeah!' })
   *   .returningAll()
   *   .$narrowType<{ nullable_column: string }>()
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
   * This method can be used to simplify excessively complex types to make typescript happy
   * and much faster.
   *
   * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
   * for typescript and you get errors like this:
   *
   * ```
   * error TS2589: Type instantiation is excessively deep and possibly infinite.
   * ```
   *
   * In these case you can often use this method to help typescript a little bit. When you use this
   * method to assert the output type of a query, Kysely can drop the complex output type that
   * consists of multiple nested helper types and replace it with the simple asserted type.
   *
   * Using this method doesn't reduce type safety at all. You have to pass in a type that is
   * structurally equal to the current type.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .with('new_person', (qb) => qb
   *     .insertInto('person')
   *     .values(person)
   *     .returning('id')
   *     .$assertType<{ id: string }>()
   *   )
   *   .with('new_pet', (qb) => qb
   *     .insertInto('pet')
   *     .values((eb) => ({ owner_id: eb.selectFrom('new_person').select('id'), ...pet }))
   *     .returning(['name as pet_name', 'species'])
   *     .$assertType<{ pet_name: string, species: Species }>()
   *   )
   *   .selectFrom(['new_person', 'new_pet'])
   *   .selectAll()
   *   .executeTakeFirstOrThrow()
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
    const query = compiledQuery.query;
    const result = await __privateGet(this, _props6).executor.executeQuery(compiledQuery, __privateGet(this, _props6).queryId);
    if (__privateGet(this, _props6).executor.adapter.supportsReturning && query.returning) {
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
      limit: ValueNode.create(limit)
    });
  }
});
const _DeleteQueryBuilder = class _DeleteQueryBuilder {
  constructor(props) {
    __privateAdd(this, _props7, void 0);
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
   */
  limit(limit) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: DeleteQueryNode.cloneWithLimit(__privateGet(this, _props7).queryNode, LimitNode.create(limit))
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
   * function log<T extends Compilable>(qb: T): T {
   *   console.log(qb.compile())
   *   return qb
   * }
   *
   * db.deleteFrom('person')
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
   * {
   *   id: number
   *   first_name: string
   *   last_name?: string
   * }
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
   * You should only use this method as the last resort if the types
   * don't support your use case.
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
   * const person = await db.deleteFrom('person')
   *   .where('id', '=', id)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .executeTakeFirstOrThrow()
   *
   * if (person.nullable_column) {
   *   functionThatExpectsPersonWithNonNullValue(person)
   * }
   * ```
   *
   * Into this:
   *
   * ```ts
   * const person = await db.deleteFrom('person')
   *   .where('id', '=', id)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .$narrowType<{ nullable_column: string }>()
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
   * This method can be used to simplify excessively complex types to make typescript happy
   * and much faster.
   *
   * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
   * for typescript and you get errors like this:
   *
   * ```
   * error TS2589: Type instantiation is excessively deep and possibly infinite.
   * ```
   *
   * In these case you can often use this method to help typescript a little bit. When you use this
   * method to assert the output type of a query, Kysely can drop the complex output type that
   * consists of multiple nested helper types and replace it with the simple asserted type.
   *
   * Using this method doesn't reduce type safety at all. You have to pass in a type that is
   * structurally equal to the current type.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .with('deleted_person', (qb) => qb
   *     .deleteFrom('person')
   *     .where('id', '=', person.id)
   *     .returning('first_name')
   *     .$assertType<{ first_name: string }>()
   *   )
   *   .with('deleted_pet', (qb) => qb
   *     .deleteFrom('pet')
   *     .where('owner_id', '=', person.id)
   *     .returning(['name as pet_name', 'species'])
   *     .$assertType<{ pet_name: string, species: Species }>()
   *   )
   *   .selectFrom(['deleted_person', 'deleted_pet'])
   *   .selectAll()
   *   .executeTakeFirstOrThrow()
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
    const query = compiledQuery.query;
    const result = await __privateGet(this, _props7).executor.executeQuery(compiledQuery, __privateGet(this, _props7).queryId);
    if (__privateGet(this, _props7).executor.adapter.supportsReturning && query.returning) {
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
    __publicField(this, "numUpdatedRows");
    __publicField(this, "numChangedRows");
    this.numUpdatedRows = numUpdatedRows;
    this.numChangedRows = numChangedRows;
  }
}
const _UpdateQueryBuilder = class _UpdateQueryBuilder {
  constructor(props) {
    __privateAdd(this, _props8, void 0);
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
  set(update) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: UpdateQueryNode.cloneWithUpdates(__privateGet(this, _props8).queryNode, parseUpdateExpression(update))
    });
  }
  returning(selection) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithReturning(__privateGet(this, _props8).queryNode, parseSelectArg(selection))
    });
  }
  returningAll() {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithReturning(__privateGet(this, _props8).queryNode, parseSelectAll())
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
   * function log<T extends Compilable>(qb: T): T {
   *   console.log(qb.compile())
   *   return qb
   * }
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
   * async function updatePerson(id: number, updates: UpdateablePerson, returnLastName: boolean) {
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
   * {
   *   id: number
   *   first_name: string
   *   last_name?: string
   * }
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
   * You should only use this method as the last resort if the types
   * don't support your use case.
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
   * const person = await db.updateTable('person')
   *   .set({ deletedAt: now })
   *   .where('id', '=', id)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .executeTakeFirstOrThrow()
   *
   * if (person.nullable_column) {
   *   functionThatExpectsPersonWithNonNullValue(person)
   * }
   * ```
   *
   * Into this:
   *
   * ```ts
   * const person = await db.updateTable('person')
   *   .set({ deletedAt: now })
   *   .where('id', '=', id)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .$narrowType<{ deletedAt: Date; nullable_column: string }>()
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
   * This method can be used to simplify excessively complex types to make typescript happy
   * and much faster.
   *
   * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
   * for typescript and you get errors like this:
   *
   * ```
   * error TS2589: Type instantiation is excessively deep and possibly infinite.
   * ```
   *
   * In these case you can often use this method to help typescript a little bit. When you use this
   * method to assert the output type of a query, Kysely can drop the complex output type that
   * consists of multiple nested helper types and replace it with the simple asserted type.
   *
   * Using this method doesn't reduce type safety at all. You have to pass in a type that is
   * structurally equal to the current type.
   *
   * ### Examples
   *
   * ```ts
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
    const query = compiledQuery.query;
    const result = await __privateGet(this, _props8).executor.executeQuery(compiledQuery, __privateGet(this, _props8).queryId);
    if (__privateGet(this, _props8).executor.adapter.supportsReturning && query.returning) {
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
    __privateAdd(this, _props9, void 0);
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
  if (isFunction$1(nameOrBuilderCallback)) {
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
    __privateAdd(this, _queryId, void 0);
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
      TupleNode: this.transformTuple.bind(this)
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
      setOperations: this.transformNodeList(node.setOperations)
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
      with: this.transformNode(node.with),
      ignore: node.ignore,
      replace: node.replace,
      explain: this.transformNode(node.explain)
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
      with: this.transformNode(node.with),
      orderBy: this.transformNode(node.orderBy),
      limit: this.transformNode(node.limit),
      explain: this.transformNode(node.explain)
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
      endModifiers: this.transformNodeList(node.endModifiers)
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
      endModifiers: this.transformNodeList(node.endModifiers)
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
      with: this.transformNode(node.with),
      explain: this.transformNode(node.explain)
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
      where: this.transformNode(node.where)
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
      name: this.transformNode(node.name)
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
      dropConstraint: this.transformNode(node.dropConstraint)
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
      rawModifier: this.transformNode(node.rawModifier)
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
  UpdateQueryNode: true
});
class WithSchemaTransformer extends OperationNodeTransformer {
  constructor(schema) {
    super();
    __privateAdd(this, _isRootOperationNode);
    __privateAdd(this, _collectSchemableIds);
    __privateAdd(this, _collectCTEs);
    __privateAdd(this, _collectSchemableIdsFromTableExpr);
    __privateAdd(this, _collectSchemableId);
    __privateAdd(this, _collectCTEIds);
    __privateAdd(this, _schema, void 0);
    __privateAdd(this, _schemableIds, /* @__PURE__ */ new Set());
    __privateAdd(this, _ctes, /* @__PURE__ */ new Set());
    __privateSet(this, _schema, schema);
  }
  transformNodeImpl(node) {
    if (!__privateMethod(this, _isRootOperationNode, isRootOperationNode_fn).call(this, node)) {
      return super.transformNodeImpl(node);
    }
    const ctes = __privateMethod(this, _collectCTEs, collectCTEs_fn).call(this, node);
    for (const cte of ctes) {
      __privateGet(this, _ctes).add(cte);
    }
    const tables2 = __privateMethod(this, _collectSchemableIds, collectSchemableIds_fn).call(this, node);
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
_isRootOperationNode = new WeakSet();
isRootOperationNode_fn = function(node) {
  return node.kind in ROOT_OPERATION_NODES;
};
_collectSchemableIds = new WeakSet();
collectSchemableIds_fn = function(node) {
  const schemableIds = /* @__PURE__ */ new Set();
  if ("name" in node && node.name && SchemableIdentifierNode.is(node.name)) {
    __privateMethod(this, _collectSchemableId, collectSchemableId_fn).call(this, node.name, schemableIds);
  }
  if ("from" in node && node.from) {
    for (const from of node.from.froms) {
      __privateMethod(this, _collectSchemableIdsFromTableExpr, collectSchemableIdsFromTableExpr_fn).call(this, from, schemableIds);
    }
  }
  if ("into" in node && node.into) {
    __privateMethod(this, _collectSchemableIdsFromTableExpr, collectSchemableIdsFromTableExpr_fn).call(this, node.into, schemableIds);
  }
  if ("table" in node && node.table) {
    __privateMethod(this, _collectSchemableIdsFromTableExpr, collectSchemableIdsFromTableExpr_fn).call(this, node.table, schemableIds);
  }
  if ("joins" in node && node.joins) {
    for (const join of node.joins) {
      __privateMethod(this, _collectSchemableIdsFromTableExpr, collectSchemableIdsFromTableExpr_fn).call(this, join.table, schemableIds);
    }
  }
  return schemableIds;
};
_collectCTEs = new WeakSet();
collectCTEs_fn = function(node) {
  const ctes = /* @__PURE__ */ new Set();
  if ("with" in node && node.with) {
    __privateMethod(this, _collectCTEIds, collectCTEIds_fn).call(this, node.with, ctes);
  }
  return ctes;
};
_collectSchemableIdsFromTableExpr = new WeakSet();
collectSchemableIdsFromTableExpr_fn = function(node, schemableIds) {
  const table = TableNode.is(node) ? node : AliasNode.is(node) && TableNode.is(node.node) ? node.node : null;
  if (table) {
    __privateMethod(this, _collectSchemableId, collectSchemableId_fn).call(this, table.table, schemableIds);
  }
};
_collectSchemableId = new WeakSet();
collectSchemableId_fn = function(node, schemableIds) {
  const id = node.identifier.name;
  if (!__privateGet(this, _schemableIds).has(id) && !__privateGet(this, _ctes).has(id)) {
    schemableIds.add(id);
  }
};
_collectCTEIds = new WeakSet();
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
    __privateAdd(this, _transformer, void 0);
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
const _QueryCreator = class _QueryCreator {
  constructor(props) {
    __privateAdd(this, _props10, void 0);
    __privateSet(this, _props10, freeze(props));
  }
  selectFrom(from) {
    return createSelectQueryBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _props10).executor,
      queryNode: SelectQueryNode.createFrom(parseTableExpressionOrList(from), __privateGet(this, _props10).withNode)
    });
  }
  selectNoFrom(selection) {
    return createSelectQueryBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _props10).executor,
      queryNode: SelectQueryNode.cloneWithSelections(SelectQueryNode.create(__privateGet(this, _props10).withNode), parseSelectArg(selection))
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
   *   .executeTakeFirst()
   * ```
   */
  insertInto(table) {
    return new InsertQueryBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _props10).executor,
      queryNode: InsertQueryNode.create(parseTable(table), __privateGet(this, _props10).withNode)
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
      executor: __privateGet(this, _props10).executor,
      queryNode: InsertQueryNode.create(parseTable(table), __privateGet(this, _props10).withNode, true)
    });
  }
  deleteFrom(tables2) {
    return new DeleteQueryBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _props10).executor,
      queryNode: DeleteQueryNode.create(parseTableExpressionOrList(tables2), __privateGet(this, _props10).withNode)
    });
  }
  updateTable(table) {
    return new UpdateQueryBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _props10).executor,
      queryNode: UpdateQueryNode.create(parseTableExpression(table), __privateGet(this, _props10).withNode)
    });
  }
  /**
   * Creates a `with` query (Common Table Expression).
   *
   * ### Examples
   *
   * ```ts
   * await db
   *   .with('jennifers', (db) => db
   *     .selectFrom('person')
   *     .where('first_name', '=', 'Jennifer')
   *     .select(['id', 'age'])
   *   )
   *   .with('adult_jennifers', (db) => db
   *     .selectFrom('jennifers')
   *     .where('age', '>', 18)
   *     .select(['id', 'age'])
   *   )
   *   .selectFrom('adult_jennifers')
   *   .where('age', '<', 60)
   *   .selectAll()
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
      ...__privateGet(this, _props10),
      withNode: __privateGet(this, _props10).withNode ? WithNode.cloneWithExpression(__privateGet(this, _props10).withNode, cte) : WithNode.create(cte)
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
      ...__privateGet(this, _props10),
      withNode: __privateGet(this, _props10).withNode ? WithNode.cloneWithExpression(__privateGet(this, _props10).withNode, cte) : WithNode.create(cte, { recursive: true })
    });
  }
  /**
   * Returns a copy of this query creator instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _QueryCreator({
      ...__privateGet(this, _props10),
      executor: __privateGet(this, _props10).executor.withPlugin(plugin)
    });
  }
  /**
   * Returns a copy of this query creator instance without any plugins.
   */
  withoutPlugins() {
    return new _QueryCreator({
      ...__privateGet(this, _props10),
      executor: __privateGet(this, _props10).executor.withoutPlugins()
    });
  }
  /**
   * Sets the schema to be used for all table references that don't explicitly
   * specify a schema.
   *
   * This only affects the query created through the builder returned from
   * this method and doesn't modify the `db` instance.
   *
   * See [this recipe](https://github.com/koskimas/kysely/tree/master/site/docs/recipes/schemas.md)
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
      ...__privateGet(this, _props10),
      executor: __privateGet(this, _props10).executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
};
_props10 = new WeakMap();
let QueryCreator = _QueryCreator;
class Deferred {
  constructor() {
    __privateAdd(this, _promise, void 0);
    __privateAdd(this, _resolve, void 0);
    __privateAdd(this, _reject, void 0);
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
    __privateAdd(this, _transformResult);
    __privateAdd(this, _plugins, void 0);
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
      const transformedResult = await __privateMethod(this, _transformResult, transformResult_fn).call(this, result, queryId);
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
        yield await __privateMethod(this, _transformResult, transformResult_fn).call(this, result, queryId);
      }
    } finally {
      connectionReleaseDefer.resolve();
    }
  }
}
_plugins = new WeakMap();
_transformResult = new WeakSet();
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
      offset: ValueNode.create(offset)
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
  groupBy = isFunction$1(groupBy) ? groupBy(expressionBuilder()) : groupBy;
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
  if (isFunction$1(expression)) {
    expression = expression(createExpressionBuilder());
  }
  if (!isReadonlyArray(expression)) {
    expression = [expression];
  }
  return expression.map((expr) => SetOperationNode.create(operator, parseExpression(expr), all));
}
const _ExpressionWrapper = class _ExpressionWrapper {
  constructor(node) {
    __privateAdd(this, _node, void 0);
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
  toOperationNode() {
    return __privateGet(this, _node);
  }
};
_node = new WeakMap();
let ExpressionWrapper = _ExpressionWrapper;
class AliasedExpressionWrapper {
  constructor(expr, alias) {
    __privateAdd(this, _expr, void 0);
    __privateAdd(this, _alias, void 0);
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
    __privateAdd(this, _node2, void 0);
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
    __privateAdd(this, _node3, void 0);
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
const _SelectQueryBuilderImpl = class _SelectQueryBuilderImpl {
  constructor(props) {
    __privateAdd(this, _props11, void 0);
    __privateSet(this, _props11, freeze(props));
  }
  get expressionType() {
    return void 0;
  }
  get isSelectQueryBuilder() {
    return true;
  }
  where(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props11).queryNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  whereRef(lhs, op, rhs) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props11).queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  having(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithHaving(__privateGet(this, _props11).queryNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  havingRef(lhs, op, rhs) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithHaving(__privateGet(this, _props11).queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  select(selection) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithSelections(__privateGet(this, _props11).queryNode, parseSelectArg(selection))
    });
  }
  distinctOn(selection) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithDistinctOn(__privateGet(this, _props11).queryNode, parseReferenceExpressionOrList(selection))
    });
  }
  modifyFront(modifier) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithFrontModifier(__privateGet(this, _props11).queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
    });
  }
  modifyEnd(modifier) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props11).queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
    });
  }
  distinct() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithFrontModifier(__privateGet(this, _props11).queryNode, SelectModifierNode.create("Distinct"))
    });
  }
  forUpdate() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props11).queryNode, SelectModifierNode.create("ForUpdate"))
    });
  }
  forShare() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props11).queryNode, SelectModifierNode.create("ForShare"))
    });
  }
  forKeyShare() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props11).queryNode, SelectModifierNode.create("ForKeyShare"))
    });
  }
  forNoKeyUpdate() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props11).queryNode, SelectModifierNode.create("ForNoKeyUpdate"))
    });
  }
  skipLocked() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props11).queryNode, SelectModifierNode.create("SkipLocked"))
    });
  }
  noWait() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props11).queryNode, SelectModifierNode.create("NoWait"))
    });
  }
  selectAll(table) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithSelections(__privateGet(this, _props11).queryNode, parseSelectAll(table))
    });
  }
  innerJoin(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props11).queryNode, parseJoin("InnerJoin", args))
    });
  }
  leftJoin(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props11).queryNode, parseJoin("LeftJoin", args))
    });
  }
  rightJoin(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props11).queryNode, parseJoin("RightJoin", args))
    });
  }
  fullJoin(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props11).queryNode, parseJoin("FullJoin", args))
    });
  }
  innerJoinLateral(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props11).queryNode, parseJoin("LateralInnerJoin", args))
    });
  }
  leftJoinLateral(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props11).queryNode, parseJoin("LateralLeftJoin", args))
    });
  }
  orderBy(...args) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithOrderByItems(__privateGet(this, _props11).queryNode, parseOrderBy(args))
    });
  }
  groupBy(groupBy) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithGroupByItems(__privateGet(this, _props11).queryNode, parseGroupBy(groupBy))
    });
  }
  limit(limit) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithLimit(__privateGet(this, _props11).queryNode, LimitNode.create(limit))
    });
  }
  offset(offset) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithOffset(__privateGet(this, _props11).queryNode, OffsetNode.create(offset))
    });
  }
  union(expression) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithSetOperations(__privateGet(this, _props11).queryNode, parseSetOperations("union", expression, false))
    });
  }
  unionAll(expression) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithSetOperations(__privateGet(this, _props11).queryNode, parseSetOperations("union", expression, true))
    });
  }
  intersect(expression) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithSetOperations(__privateGet(this, _props11).queryNode, parseSetOperations("intersect", expression, false))
    });
  }
  intersectAll(expression) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithSetOperations(__privateGet(this, _props11).queryNode, parseSetOperations("intersect", expression, true))
    });
  }
  except(expression) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithSetOperations(__privateGet(this, _props11).queryNode, parseSetOperations("except", expression, false))
    });
  }
  exceptAll(expression) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithSetOperations(__privateGet(this, _props11).queryNode, parseSetOperations("except", expression, true))
    });
  }
  as(alias) {
    return new AliasedSelectQueryBuilderImpl(this, alias);
  }
  clearSelect() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithoutSelections(__privateGet(this, _props11).queryNode)
    });
  }
  clearWhere() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: QueryNode.cloneWithoutWhere(__privateGet(this, _props11).queryNode)
    });
  }
  clearLimit() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithoutLimit(__privateGet(this, _props11).queryNode)
    });
  }
  clearOffset() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithoutOffset(__privateGet(this, _props11).queryNode)
    });
  }
  clearOrderBy() {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: SelectQueryNode.cloneWithoutOrderBy(__privateGet(this, _props11).queryNode)
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
      ...__privateGet(this, _props11)
    });
  }
  $castTo() {
    return new _SelectQueryBuilderImpl(__privateGet(this, _props11));
  }
  $narrowType() {
    return new _SelectQueryBuilderImpl(__privateGet(this, _props11));
  }
  $assertType() {
    return new _SelectQueryBuilderImpl(__privateGet(this, _props11));
  }
  $asTuple() {
    return new ExpressionWrapper(this.toOperationNode());
  }
  withPlugin(plugin) {
    return new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      executor: __privateGet(this, _props11).executor.withPlugin(plugin)
    });
  }
  toOperationNode() {
    return __privateGet(this, _props11).executor.transformQuery(__privateGet(this, _props11).queryNode, __privateGet(this, _props11).queryId);
  }
  compile() {
    return __privateGet(this, _props11).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props11).queryId);
  }
  async execute() {
    const compiledQuery = this.compile();
    const result = await __privateGet(this, _props11).executor.executeQuery(compiledQuery, __privateGet(this, _props11).queryId);
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
    const stream = __privateGet(this, _props11).executor.stream(compiledQuery, chunkSize, __privateGet(this, _props11).queryId);
    for await (const item of stream) {
      yield* item.rows;
    }
  }
  async explain(format, options) {
    const builder = new _SelectQueryBuilderImpl({
      ...__privateGet(this, _props11),
      queryNode: QueryNode.cloneWithExplain(__privateGet(this, _props11).queryNode, format, options)
    });
    return await builder.execute();
  }
};
_props11 = new WeakMap();
let SelectQueryBuilderImpl = _SelectQueryBuilderImpl;
preventAwait(SelectQueryBuilderImpl, "don't await SelectQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
function createSelectQueryBuilder(props) {
  return new SelectQueryBuilderImpl(props);
}
class AliasedSelectQueryBuilderImpl {
  constructor(queryBuilder, alias) {
    __privateAdd(this, _queryBuilder, void 0);
    __privateAdd(this, _alias2, void 0);
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
    __privateAdd(this, _props12, void 0);
    __privateSet(this, _props12, freeze(props));
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
      ...__privateGet(this, _props12),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithDistinct(__privateGet(this, _props12).aggregateFunctionNode)
    });
  }
  filterWhere(...args) {
    return new _AggregateFunctionBuilder({
      ...__privateGet(this, _props12),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(__privateGet(this, _props12).aggregateFunctionNode, parseValueBinaryOperationOrExpression(args))
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
      ...__privateGet(this, _props12),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(__privateGet(this, _props12).aggregateFunctionNode, parseReferentialBinaryOperation(lhs, op, rhs))
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
      ...__privateGet(this, _props12),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithOver(__privateGet(this, _props12).aggregateFunctionNode, (over ? over(builder) : builder).toOperationNode())
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
    return __privateGet(this, _props12).aggregateFunctionNode;
  }
};
_props12 = new WeakMap();
let AggregateFunctionBuilder = _AggregateFunctionBuilder;
preventAwait(AggregateFunctionBuilder, "don't await AggregateFunctionBuilder instances. They are never executed directly and are always just a part of a query.");
class AliasedAggregateFunctionBuilder {
  constructor(aggregateFunctionBuilder, alias) {
    __privateAdd(this, _aggregateFunctionBuilder, void 0);
    __privateAdd(this, _alias3, void 0);
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
    return new ExpressionWrapper(FunctionNode.create(name, parseReferenceExpressionOrList(args)));
  };
  const agg = (name, args) => {
    return new AggregateFunctionBuilder({
      aggregateFunctionNode: AggregateFunctionNode.create(name, args ? parseReferenceExpressionOrList(args) : void 0)
    });
  };
  return Object.assign(fn, {
    agg,
    avg(column) {
      return agg("avg", [column]);
    },
    coalesce(value, ...otherValues) {
      return fn("coalesce", [value, ...otherValues]);
    },
    count(column) {
      return agg("count", [column]);
    },
    countAll(table) {
      return new AggregateFunctionBuilder({
        aggregateFunctionNode: AggregateFunctionNode.create("count", parseSelectAll(table))
      });
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
    __privateAdd(this, _props13, void 0);
    __privateSet(this, _props13, freeze(props));
  }
  when(...args) {
    return new CaseThenBuilder({
      ...__privateGet(this, _props13),
      node: CaseNode.cloneWithWhen(__privateGet(this, _props13).node, WhenNode.create(parseValueBinaryOperationOrExpression(args)))
    });
  }
}
_props13 = new WeakMap();
class CaseThenBuilder {
  constructor(props) {
    __privateAdd(this, _props14, void 0);
    __privateSet(this, _props14, freeze(props));
  }
  then(valueExpression) {
    return new CaseWhenBuilder({
      ...__privateGet(this, _props14),
      node: CaseNode.cloneWithThen(__privateGet(this, _props14).node, isSafeImmediateValue(valueExpression) ? parseSafeImmediateValue(valueExpression) : parseValueExpression(valueExpression))
    });
  }
}
_props14 = new WeakMap();
class CaseWhenBuilder {
  constructor(props) {
    __privateAdd(this, _props15, void 0);
    __privateSet(this, _props15, freeze(props));
  }
  when(...args) {
    return new CaseThenBuilder({
      ...__privateGet(this, _props15),
      node: CaseNode.cloneWithWhen(__privateGet(this, _props15).node, WhenNode.create(parseValueBinaryOperationOrExpression(args)))
    });
  }
  else(valueExpression) {
    return new CaseEndBuilder({
      ...__privateGet(this, _props15),
      node: CaseNode.cloneWith(__privateGet(this, _props15).node, {
        else: isSafeImmediateValue(valueExpression) ? parseSafeImmediateValue(valueExpression) : parseValueExpression(valueExpression)
      })
    });
  }
  end() {
    return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props15).node, { isStatement: false }));
  }
  endCase() {
    return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props15).node, { isStatement: true }));
  }
}
_props15 = new WeakMap();
class CaseEndBuilder {
  constructor(props) {
    __privateAdd(this, _props16, void 0);
    __privateSet(this, _props16, freeze(props));
  }
  end() {
    return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props16).node, { isStatement: false }));
  }
  endCase() {
    return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props16).node, { isStatement: true }));
  }
}
_props16 = new WeakMap();
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
    __privateAdd(this, _createBuilderWithPathLeg);
    __privateAdd(this, _node4, void 0);
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
   * db.selectFrom('person').select(eb =>
   *   eb.ref('nicknames', '->').at(0).as('primary_nickname')
   * )
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
    return __privateMethod(this, _createBuilderWithPathLeg, createBuilderWithPathLeg_fn).call(this, "ArrayLocation", index);
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
    return __privateMethod(this, _createBuilderWithPathLeg, createBuilderWithPathLeg_fn).call(this, "Member", key);
  }
}
_node4 = new WeakMap();
_createBuilderWithPathLeg = new WeakSet();
createBuilderWithPathLeg_fn = function(legType, value) {
  return new TraversedJSONPathBuilder(JSONReferenceNode.cloneWithTraversal(__privateGet(this, _node4), JSONPathNode.is(__privateGet(this, _node4).traversal) ? JSONPathNode.cloneWithLeg(__privateGet(this, _node4).traversal, JSONPathLegNode.create(legType, value)) : JSONOperatorChainNode.cloneWithValue(__privateGet(this, _node4).traversal, ValueNode.createImmediate(value))));
};
class TraversedJSONPathBuilder extends JSONPathBuilder {
  constructor(node) {
    super(node);
    __privateAdd(this, _node5, void 0);
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
    return new JSONPathBuilder(__privateGet(this, _node5));
  }
  toOperationNode() {
    return __privateGet(this, _node5);
  }
}
_node5 = new WeakMap();
class AliasedJSONPathBuilder {
  constructor(jsonPath, alias) {
    __privateAdd(this, _jsonPath, void 0);
    __privateAdd(this, _alias4, void 0);
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
    selectNoFrom(selection) {
      return createSelectQueryBuilder({
        queryId: createQueryId(),
        executor,
        queryNode: SelectQueryNode.cloneWithSelections(SelectQueryNode.create(), parseSelectArg(selection))
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
    val(value) {
      return new ExpressionWrapper(parseValueExpressionOrList(value));
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
    // @deprecated
    cmpr(lhs, op, rhs) {
      return new ExpressionWrapper(parseValueBinaryOperation(lhs, op, rhs));
    },
    // @deprecated
    bxp(lhs, op, rhs) {
      return new ExpressionWrapper(parseValueBinaryOperation(lhs, op, rhs));
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
  } else if (isFunction$1(exp)) {
    return exp(expressionBuilder()).toOperationNode();
  }
  throw new Error(`invalid expression: ${JSON.stringify(exp)}`);
}
function parseAliasedExpression(exp) {
  if (isOperationNodeSource(exp)) {
    return exp.toOperationNode();
  } else if (isFunction$1(exp)) {
    return exp(expressionBuilder()).toOperationNode();
  }
  throw new Error(`invalid aliased expression: ${JSON.stringify(exp)}`);
}
function isExpressionOrFactory(obj) {
  return isExpression(obj) || isAliasedExpression(obj) || isFunction$1(obj);
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
    return AliasNode.create(parseTable(table), IdentifierNode.create(alias));
  } else {
    return parseTable(from);
  }
}
function parseTable(from) {
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
  create(column) {
    return freeze({
      kind: "AddColumnNode",
      column
    });
  }
});
const ColumnDefinitionNode = freeze({
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
const DropColumnNode = freeze({
  is(node) {
    return node.kind === "DropColumnNode";
  },
  create(column) {
    return freeze({
      kind: "DropColumnNode",
      column: ColumnNode.create(column)
    });
  }
});
const RenameColumnNode = freeze({
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
    __privateAdd(this, _node6, void 0);
    __privateSet(this, _node6, node);
  }
  /**
   * Adds `auto_increment` or `autoincrement` to the column definition
   * depending on the dialect.
   *
   * Some dialects like PostgreSQL don't support this. On PostgreSQL
   * you can use the `serial` or `bigserial` data type instead.
   */
  autoIncrement() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), { autoIncrement: true }));
  }
  /**
   * Makes the column the primary key.
   *
   * If you want to specify a composite primary key use the
   * {@link CreateTableBuilder.addPrimaryKeyConstraint} method.
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
   * col.references('person.id')
   * ```
   */
  references(ref2) {
    const references = parseStringReference(ref2);
    if (!references.table || SelectAllNode.is(references.column)) {
      throw new Error(`invalid call references('${ref2}'). The reference must have format table.column or schema.table.column`);
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
   * col.references('person.id').onDelete('cascade')
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
   * ### Examples
   *
   * ```ts
   * col.references('person.id').onUpdate('cascade')
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
   */
  unique() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), { unique: true }));
  }
  /**
   * Adds a `not null` constraint for the column.
   */
  notNull() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), { notNull: true }));
  }
  /**
   * Adds a `unsigned` modifier for the column.
   *
   * This only works on some dialects like MySQL.
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
   * db.schema
   *   .createTable('pet')
   *   .addColumn('number_of_legs', 'integer', (col) => col.defaultTo(4))
   *   .execute()
   * ```
   *
   * Values passed to `defaultTo` are interpreted as value literals by default. You can define
   * an arbitrary SQL expression using the {@link sql} template tag:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * db.schema
   *   .createTable('pet')
   *   .addColumn(
   *     'number_of_legs',
   *     'integer',
   *     (col) => col.defaultTo(sql`any SQL here`)
   *   )
   *   .execute()
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
   * db.schema
   *   .createTable('pet')
   *   .addColumn('number_of_legs', 'integer', (col) =>
   *     col.check(sql`number_of_legs < 5`)
   *   )
   *   .execute()
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
   * db.schema
   *   .createTable('person')
   *   .addColumn('full_name', 'varchar(255)',
   *     (col) => col.generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
   *   )
   *   .execute()
   * ```
   */
  generatedAlwaysAs(expression) {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), {
      generated: GeneratedNode.createWithExpression(expression.toOperationNode())
    }));
  }
  /**
   * Adds the `generated always as identity` specifier on supported dialects.
   */
  generatedAlwaysAsIdentity() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node6), {
      generated: GeneratedNode.create({ identity: true, always: true })
    }));
  }
  /**
   * Adds the `generated by default as identity` specifier on supported dialects.
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
   * db.schema
   *   .createTable('person')
   *   .addColumn('full_name', 'varchar(255)', (col) => col
   *     .generatedAlwaysAs("concat(first_name, ' ', last_name)")
   *     .stored()
   *   )
   *   .execute()
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
   * db.schema.createTable('person')
   *  .addColumn('id', 'integer', col => col.primaryKey())
   *  .addColumn('first_name', 'varchar(36)', col => col.modifyFront(sql`collate utf8mb4_general_ci`).notNull())
   *  .execute()
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
   * This can be used to add any additional SQL to the end of the column definition.
   *
   * ### Examples
   *
   * ```ts
   * db.schema.createTable('person')
   *  .addColumn('id', 'integer', col => col.primaryKey())
   *  .addColumn('age', 'integer', col => col.unsigned().notNull().modifyEnd(sql`comment ${sql.lit('it is not polite to ask a woman her age')}`))
   *  .execute()
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
  create(column) {
    return freeze({
      kind: "ModifyColumnNode",
      column
    });
  }
});
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
function parseDataTypeExpression(dataType) {
  return isOperationNodeSource(dataType) ? dataType.toOperationNode() : DataTypeNode.create(dataType);
}
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
    __privateAdd(this, _node7, void 0);
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
  create(columns, constraintName) {
    return freeze({
      kind: "UniqueConstraintNode",
      columns: freeze(columns.map(ColumnNode.create)),
      name: constraintName ? IdentifierNode.create(constraintName) : void 0
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
  create(column, prop, value) {
    return freeze({
      kind: "AlterColumnNode",
      column: ColumnNode.create(column),
      [prop]: value
    });
  }
});
class AlterColumnBuilder {
  constructor(column) {
    __privateAdd(this, _column, void 0);
    __privateSet(this, _column, column);
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
class AlteredColumnBuilder {
  constructor(alterColumnNode) {
    __privateAdd(this, _alterColumnNode, void 0);
    __privateSet(this, _alterColumnNode, alterColumnNode);
  }
  toOperationNode() {
    return __privateGet(this, _alterColumnNode);
  }
}
_alterColumnNode = new WeakMap();
class AlterTableExecutor {
  constructor(props) {
    __privateAdd(this, _props17, void 0);
    __privateSet(this, _props17, freeze(props));
  }
  toOperationNode() {
    return __privateGet(this, _props17).executor.transformQuery(__privateGet(this, _props17).node, __privateGet(this, _props17).queryId);
  }
  compile() {
    return __privateGet(this, _props17).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props17).queryId);
  }
  async execute() {
    await __privateGet(this, _props17).executor.executeQuery(this.compile(), __privateGet(this, _props17).queryId);
  }
}
_props17 = new WeakMap();
preventAwait(AlterTableExecutor, "don't await AlterTableExecutor instances directly. To execute the query you need to call `execute`");
const _AlterTableAddForeignKeyConstraintBuilder = class _AlterTableAddForeignKeyConstraintBuilder {
  constructor(props) {
    __privateAdd(this, _props18, void 0);
    __privateSet(this, _props18, freeze(props));
  }
  onDelete(onDelete) {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...__privateGet(this, _props18),
      constraintBuilder: __privateGet(this, _props18).constraintBuilder.onDelete(onDelete)
    });
  }
  onUpdate(onUpdate) {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...__privateGet(this, _props18),
      constraintBuilder: __privateGet(this, _props18).constraintBuilder.onUpdate(onUpdate)
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
    return __privateGet(this, _props18).executor.transformQuery(AlterTableNode.cloneWithTableProps(__privateGet(this, _props18).node, {
      addConstraint: AddConstraintNode.create(__privateGet(this, _props18).constraintBuilder.toOperationNode())
    }), __privateGet(this, _props18).queryId);
  }
  compile() {
    return __privateGet(this, _props18).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props18).queryId);
  }
  async execute() {
    await __privateGet(this, _props18).executor.executeQuery(this.compile(), __privateGet(this, _props18).queryId);
  }
};
_props18 = new WeakMap();
let AlterTableAddForeignKeyConstraintBuilder = _AlterTableAddForeignKeyConstraintBuilder;
preventAwait(AlterTableAddForeignKeyConstraintBuilder, "don't await AlterTableAddForeignKeyConstraintBuilder instances directly. To execute the query you need to call `execute`");
const _AlterTableDropConstraintBuilder = class _AlterTableDropConstraintBuilder {
  constructor(props) {
    __privateAdd(this, _props19, void 0);
    __privateSet(this, _props19, freeze(props));
  }
  ifExists() {
    return new _AlterTableDropConstraintBuilder({
      ...__privateGet(this, _props19),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props19).node, {
        dropConstraint: DropConstraintNode.cloneWith(__privateGet(this, _props19).node.dropConstraint, {
          ifExists: true
        })
      })
    });
  }
  cascade() {
    return new _AlterTableDropConstraintBuilder({
      ...__privateGet(this, _props19),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props19).node, {
        dropConstraint: DropConstraintNode.cloneWith(__privateGet(this, _props19).node.dropConstraint, {
          modifier: "cascade"
        })
      })
    });
  }
  restrict() {
    return new _AlterTableDropConstraintBuilder({
      ...__privateGet(this, _props19),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props19).node, {
        dropConstraint: DropConstraintNode.cloneWith(__privateGet(this, _props19).node.dropConstraint, {
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
    return __privateGet(this, _props19).executor.transformQuery(__privateGet(this, _props19).node, __privateGet(this, _props19).queryId);
  }
  compile() {
    return __privateGet(this, _props19).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props19).queryId);
  }
  async execute() {
    await __privateGet(this, _props19).executor.executeQuery(this.compile(), __privateGet(this, _props19).queryId);
  }
};
_props19 = new WeakMap();
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
class AlterTableBuilder {
  constructor(props) {
    __privateAdd(this, _props20, void 0);
    __privateSet(this, _props20, freeze(props));
  }
  renameTo(newTableName) {
    return new AlterTableExecutor({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props20).node, {
        renameTo: parseTable(newTableName)
      })
    });
  }
  setSchema(newSchema) {
    return new AlterTableExecutor({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props20).node, {
        setSchema: IdentifierNode.create(newSchema)
      })
    });
  }
  alterColumn(column, alteration) {
    const builder = alteration(new AlterColumnBuilder(column));
    return new AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props20).node, builder.toOperationNode())
    });
  }
  dropColumn(column) {
    return new AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props20).node, DropColumnNode.create(column))
    });
  }
  renameColumn(column, newColumn) {
    return new AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props20).node, RenameColumnNode.create(column, newColumn))
    });
  }
  addColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props20).node, AddColumnNode.create(builder.toOperationNode()))
    });
  }
  modifyColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props20).node, ModifyColumnNode.create(builder.toOperationNode()))
    });
  }
  /**
   * See {@link CreateTableBuilder.addUniqueConstraint}
   */
  addUniqueConstraint(constraintName, columns) {
    return new AlterTableExecutor({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props20).node, {
        addConstraint: AddConstraintNode.create(UniqueConstraintNode.create(columns, constraintName))
      })
    });
  }
  /**
   * See {@link CreateTableBuilder.addCheckConstraint}
   */
  addCheckConstraint(constraintName, checkExpression) {
    return new AlterTableExecutor({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props20).node, {
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
      ...__privateGet(this, _props20),
      constraintBuilder: new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName))
    });
  }
  /**
   * See {@link CreateTableBuilder.addPrimaryKeyConstraint}
   */
  addPrimaryKeyConstraint(constraintName, columns) {
    return new AlterTableExecutor({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props20).node, {
        addConstraint: AddConstraintNode.create(PrimaryConstraintNode.create(columns, constraintName))
      })
    });
  }
  dropConstraint(constraintName) {
    return new AlterTableDropConstraintBuilder({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props20).node, {
        dropConstraint: DropConstraintNode.create(constraintName)
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
_props20 = new WeakMap();
const _AlterTableColumnAlteringBuilder = class _AlterTableColumnAlteringBuilder {
  constructor(props) {
    __privateAdd(this, _props21, void 0);
    __privateSet(this, _props21, freeze(props));
  }
  alterColumn(column, alteration) {
    const builder = alteration(new AlterColumnBuilder(column));
    return new _AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props21),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props21).node, builder.toOperationNode())
    });
  }
  dropColumn(column) {
    return new _AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props21),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props21).node, DropColumnNode.create(column))
    });
  }
  renameColumn(column, newColumn) {
    return new _AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props21),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props21).node, RenameColumnNode.create(column, newColumn))
    });
  }
  addColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new _AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props21),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props21).node, AddColumnNode.create(builder.toOperationNode()))
    });
  }
  modifyColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new _AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props21),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props21).node, ModifyColumnNode.create(builder.toOperationNode()))
    });
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
};
_props21 = new WeakMap();
let AlterTableColumnAlteringBuilder = _AlterTableColumnAlteringBuilder;
preventAwait(AlterTableBuilder, "don't await AlterTableBuilder instances");
preventAwait(AlterColumnBuilder, "don't await AlterColumnBuilder instances");
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
    __privateAdd(this, _props22, void 0);
    __privateSet(this, _props22, freeze(props));
  }
  /**
   * Adds the "if not exists" modifier.
   *
   * If the index already exists, no error is thrown if this method has been called.
   */
  ifNotExists() {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props22),
      node: CreateIndexNode.cloneWith(__privateGet(this, _props22).node, {
        ifNotExists: true
      })
    });
  }
  /**
   * Makes the index unique.
   */
  unique() {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props22),
      node: CreateIndexNode.cloneWith(__privateGet(this, _props22).node, {
        unique: true
      })
    });
  }
  /**
   * Specifies the table for the index.
   */
  on(table) {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props22),
      node: CreateIndexNode.cloneWith(__privateGet(this, _props22).node, {
        table: parseTable(table)
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
  column(column) {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props22),
      node: CreateIndexNode.cloneWithColumns(__privateGet(this, _props22).node, [
        parseOrderedColumnName(column)
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
      ...__privateGet(this, _props22),
      node: CreateIndexNode.cloneWithColumns(__privateGet(this, _props22).node, columns.map(parseOrderedColumnName))
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
      ...__privateGet(this, _props22),
      node: CreateIndexNode.cloneWithColumns(__privateGet(this, _props22).node, [
        expression.toOperationNode()
      ])
    });
  }
  using(indexType) {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props22),
      node: CreateIndexNode.cloneWith(__privateGet(this, _props22).node, {
        using: RawNode.createWithSql(indexType)
      })
    });
  }
  where(...args) {
    const transformer = new ImmediateValueTransformer();
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props22),
      node: QueryNode.cloneWithWhere(__privateGet(this, _props22).node, transformer.transformNode(parseValueBinaryOperationOrExpression(args)))
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
    return __privateGet(this, _props22).executor.transformQuery(__privateGet(this, _props22).node, __privateGet(this, _props22).queryId);
  }
  compile() {
    return __privateGet(this, _props22).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props22).queryId);
  }
  async execute() {
    await __privateGet(this, _props22).executor.executeQuery(this.compile(), __privateGet(this, _props22).queryId);
  }
};
_props22 = new WeakMap();
let CreateIndexBuilder = _CreateIndexBuilder;
preventAwait(CreateIndexBuilder, "don't await CreateIndexBuilder instances directly. To execute the query you need to call `execute`");
const _CreateSchemaBuilder = class _CreateSchemaBuilder {
  constructor(props) {
    __privateAdd(this, _props23, void 0);
    __privateSet(this, _props23, freeze(props));
  }
  ifNotExists() {
    return new _CreateSchemaBuilder({
      ...__privateGet(this, _props23),
      node: CreateSchemaNode.cloneWith(__privateGet(this, _props23).node, { ifNotExists: true })
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
    __privateAdd(this, _props24, void 0);
    __privateSet(this, _props24, freeze(props));
  }
  /**
   * Adds the "temporary" modifier.
   *
   * Use this to create a temporary table.
   */
  temporary() {
    return new _CreateTableBuilder({
      ...__privateGet(this, _props24),
      node: CreateTableNode.cloneWith(__privateGet(this, _props24).node, {
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
      ...__privateGet(this, _props24),
      node: CreateTableNode.cloneWith(__privateGet(this, _props24).node, {
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
      ...__privateGet(this, _props24),
      node: CreateTableNode.cloneWith(__privateGet(this, _props24).node, {
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
   *   .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey()),
   *   .addColumn('first_name', 'varchar(50)', (col) => col.notNull())
   *   .addColumn('last_name', 'varchar(255)')
   *   .addColumn('bank_balance', 'numeric(8, 2)')
   *   // You can specify any data type using the `sql` tag if the types
   *   // don't include it.
   *   .addColumn('data', sql`any_type_here`)
   *   .addColumn('parent_id', 'integer', (col) =>
   *     col.references('person.id').onDelete('cascade'))
   *   )
   * ```
   *
   * With this method, it's once again good to remember that Kysely just builds the
   * query and doesn't provide the same API for all databses. For example, some
   * databases like older MySQL don't support the `references` statement in the
   * column definition. Instead foreign key constraints need to be defined in the
   * `create table` query. See the next example:
   *
   * ```ts
   *   .addColumn('parent_id', 'integer')
   *   .addForeignKeyConstraint(
   *     'person_parent_id_fk', ['parent_id'], 'person', ['id'],
   *     (cb) => cb.onDelete('cascade')
   *   )
   * ```
   *
   * Another good example is that PostgreSQL doesn't support the `auto_increment`
   * keyword and you need to define an autoincrementing column for example using
   * `serial`:
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'serial', (col) => col.primaryKey()),
   * ```
   */
  addColumn(columnName, dataType, build = noop) {
    const columnBuilder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new _CreateTableBuilder({
      ...__privateGet(this, _props24),
      node: CreateTableNode.cloneWithColumn(__privateGet(this, _props24).node, columnBuilder.toOperationNode())
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
   * addPrimaryKeyConstraint('primary_key', ['first_name', 'last_name'])
   * ```
   */
  addPrimaryKeyConstraint(constraintName, columns) {
    return new _CreateTableBuilder({
      ...__privateGet(this, _props24),
      node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props24).node, PrimaryConstraintNode.create(columns, constraintName))
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
   * addUniqueConstraint('first_name_last_name_unique', ['first_name', 'last_name'])
   * ```
   */
  addUniqueConstraint(constraintName, columns) {
    return new _CreateTableBuilder({
      ...__privateGet(this, _props24),
      node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props24).node, UniqueConstraintNode.create(columns, constraintName))
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
   * addCheckConstraint('check_legs', sql`number_of_legs < 5`)
   * ```
   */
  addCheckConstraint(constraintName, checkExpression) {
    return new _CreateTableBuilder({
      ...__privateGet(this, _props24),
      node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props24).node, CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName))
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
   * addForeignKeyConstraint(
   *   'owner_id_foreign',
   *   ['owner_id'],
   *   'person',
   *   ['id'],
   * )
   * ```
   *
   * Add constraint for multiple columns:
   *
   * ```ts
   * addForeignKeyConstraint(
   *   'owner_id_foreign',
   *   ['owner_id1', 'owner_id2'],
   *   'person',
   *   ['id1', 'id2'],
   *   (cb) => cb.onDelete('cascade')
   * )
   * ```
   */
  addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = noop) {
    const builder = build(new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName)));
    return new _CreateTableBuilder({
      ...__privateGet(this, _props24),
      node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props24).node, builder.toOperationNode())
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
   * db.schema.createTable('person')
   *   .modifyFront(sql`global temporary`)
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
   *   .addColumn('last_name', 'varchar(64), col => col.notNull())
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
      ...__privateGet(this, _props24),
      node: CreateTableNode.cloneWithFrontModifier(__privateGet(this, _props24).node, modifier.toOperationNode())
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
   * db.schema.createTable('person')
   *   .addColumn('id', 'integer', col => col => primaryKey())
   *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
   *   .addColumn('last_name', 'varchar(64), col => col.notNull())
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
      ...__privateGet(this, _props24),
      node: CreateTableNode.cloneWithEndModifier(__privateGet(this, _props24).node, modifier.toOperationNode())
    });
  }
  /**
   * Calls the given function passing `this` as the only argument.
   *
   * ### Examples
   *
   * ```ts
   * db.schema
   *   .createTable('test')
   *   .$call((builder) => builder.addColumn('id', 'integer'))
   *   .execute()
   * ```
   *
   * ```ts
   * const addDefaultColumns = <T extends string, C extends string = never>(
   *   builder: CreateTableBuilder<T, C>
   * ) => {
   *   return builder
   *     .addColumn('id', 'integer', (col) => col.notNull())
   *     .addColumn('created_at', 'date', (col) =>
   *       col.notNull().defaultTo(sql`now()`)
   *     )
   *     .addColumn('updated_at', 'date', (col) =>
   *       col.notNull().defaultTo(sql`now()`)
   *     )
   * }
   *
   * db.schema
   *   .createTable('test')
   *   .$call(addDefaultColumns)
   *   .execute()
   * ```
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
let CreateTableBuilder = _CreateTableBuilder;
preventAwait(CreateTableBuilder, "don't await CreateTableBuilder instances directly. To execute the query you need to call `execute`");
const _DropIndexBuilder = class _DropIndexBuilder {
  constructor(props) {
    __privateAdd(this, _props25, void 0);
    __privateSet(this, _props25, freeze(props));
  }
  /**
   * Specifies the table the index was created for. This is not needed
   * in all dialects.
   */
  on(table) {
    return new _DropIndexBuilder({
      ...__privateGet(this, _props25),
      node: DropIndexNode.cloneWith(__privateGet(this, _props25).node, {
        table: parseTable(table)
      })
    });
  }
  ifExists() {
    return new _DropIndexBuilder({
      ...__privateGet(this, _props25),
      node: DropIndexNode.cloneWith(__privateGet(this, _props25).node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropIndexBuilder({
      ...__privateGet(this, _props25),
      node: DropIndexNode.cloneWith(__privateGet(this, _props25).node, {
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
    return __privateGet(this, _props25).executor.transformQuery(__privateGet(this, _props25).node, __privateGet(this, _props25).queryId);
  }
  compile() {
    return __privateGet(this, _props25).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props25).queryId);
  }
  async execute() {
    await __privateGet(this, _props25).executor.executeQuery(this.compile(), __privateGet(this, _props25).queryId);
  }
};
_props25 = new WeakMap();
let DropIndexBuilder = _DropIndexBuilder;
preventAwait(DropIndexBuilder, "don't await DropIndexBuilder instances directly. To execute the query you need to call `execute`");
const _DropSchemaBuilder = class _DropSchemaBuilder {
  constructor(props) {
    __privateAdd(this, _props26, void 0);
    __privateSet(this, _props26, freeze(props));
  }
  ifExists() {
    return new _DropSchemaBuilder({
      ...__privateGet(this, _props26),
      node: DropSchemaNode.cloneWith(__privateGet(this, _props26).node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropSchemaBuilder({
      ...__privateGet(this, _props26),
      node: DropSchemaNode.cloneWith(__privateGet(this, _props26).node, {
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
let DropSchemaBuilder = _DropSchemaBuilder;
preventAwait(DropSchemaBuilder, "don't await DropSchemaBuilder instances directly. To execute the query you need to call `execute`");
const _DropTableBuilder = class _DropTableBuilder {
  constructor(props) {
    __privateAdd(this, _props27, void 0);
    __privateSet(this, _props27, freeze(props));
  }
  ifExists() {
    return new _DropTableBuilder({
      ...__privateGet(this, _props27),
      node: DropTableNode.cloneWith(__privateGet(this, _props27).node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropTableBuilder({
      ...__privateGet(this, _props27),
      node: DropTableNode.cloneWith(__privateGet(this, _props27).node, {
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
    __privateAdd(this, _props28, void 0);
    __privateSet(this, _props28, freeze(props));
  }
  /**
   * Adds the "temporary" modifier.
   *
   * Use this to create a temporary view.
   */
  temporary() {
    return new _CreateViewBuilder({
      ...__privateGet(this, _props28),
      node: CreateViewNode.cloneWith(__privateGet(this, _props28).node, {
        temporary: true
      })
    });
  }
  materialized() {
    return new _CreateViewBuilder({
      ...__privateGet(this, _props28),
      node: CreateViewNode.cloneWith(__privateGet(this, _props28).node, {
        materialized: true
      })
    });
  }
  /**
   * Only implemented on some dialects like SQLite. On most dialects, use {@link orReplace}.
   */
  ifNotExists() {
    return new _CreateViewBuilder({
      ...__privateGet(this, _props28),
      node: CreateViewNode.cloneWith(__privateGet(this, _props28).node, {
        ifNotExists: true
      })
    });
  }
  orReplace() {
    return new _CreateViewBuilder({
      ...__privateGet(this, _props28),
      node: CreateViewNode.cloneWith(__privateGet(this, _props28).node, {
        orReplace: true
      })
    });
  }
  columns(columns) {
    return new _CreateViewBuilder({
      ...__privateGet(this, _props28),
      node: CreateViewNode.cloneWith(__privateGet(this, _props28).node, {
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
      ...__privateGet(this, _props28),
      node: CreateViewNode.cloneWith(__privateGet(this, _props28).node, {
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
    __privateAdd(this, _props29, void 0);
    __privateSet(this, _props29, freeze(props));
  }
  materialized() {
    return new _DropViewBuilder({
      ...__privateGet(this, _props29),
      node: DropViewNode.cloneWith(__privateGet(this, _props29).node, {
        materialized: true
      })
    });
  }
  ifExists() {
    return new _DropViewBuilder({
      ...__privateGet(this, _props29),
      node: DropViewNode.cloneWith(__privateGet(this, _props29).node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropViewBuilder({
      ...__privateGet(this, _props29),
      node: DropViewNode.cloneWith(__privateGet(this, _props29).node, {
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
    __privateAdd(this, _props30, void 0);
    __privateSet(this, _props30, freeze(props));
  }
  toOperationNode() {
    return __privateGet(this, _props30).executor.transformQuery(__privateGet(this, _props30).node, __privateGet(this, _props30).queryId);
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
      ...__privateGet(this, _props30),
      node: CreateTypeNode.cloneWithEnum(__privateGet(this, _props30).node, values)
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
    return __privateGet(this, _props30).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props30).queryId);
  }
  async execute() {
    await __privateGet(this, _props30).executor.executeQuery(this.compile(), __privateGet(this, _props30).queryId);
  }
};
_props30 = new WeakMap();
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
    __privateAdd(this, _props31, void 0);
    __privateSet(this, _props31, freeze(props));
  }
  ifExists() {
    return new _DropTypeBuilder({
      ...__privateGet(this, _props31),
      node: DropTypeNode.cloneWith(__privateGet(this, _props31).node, {
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
    __privateAdd(this, _executor, void 0);
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
      executor: __privateGet(this, _executor),
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
   * done by typescript at compile time, which means that you need to know the
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
   * const columnFromUserInput = req.query.select;
   *
   * // A type that lists all possible values `columnFromUserInput` can have.
   * // You can use `keyof Person` if any column of an interface is allowed.
   * type PossibleColumns = 'last_name' | 'first_name' | 'birth_date'
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
   * const lastName: string | undefined = person.last_name
   * const firstName: string | undefined = person.first_name
   * const birthDate: string | undefined = person.birth_date
   *
   * // The result type also contains the compile time selection `id`.
   * person.id
   * ```
   */
  ref(reference) {
    return new DynamicReferenceBuilder(reference);
  }
}
class DefaultConnectionProvider {
  constructor(driver) {
    __privateAdd(this, _driver, void 0);
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
    __privateAdd(this, _compiler, void 0);
    __privateAdd(this, _adapter, void 0);
    __privateAdd(this, _connectionProvider, void 0);
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
  if (typeof performance !== "undefined" && isFunction$1(performance.now)) {
    return performance.now();
  } else {
    return Date.now();
  }
}
class RuntimeDriver {
  constructor(driver, log3) {
    __privateAdd(this, _needsLogging);
    // This method monkey patches the database connection's executeQuery method
    // by adding logging code around it. Monkey patching is not pretty, but it's
    // the best option in this case.
    __privateAdd(this, _addLogging);
    __privateAdd(this, _logError);
    __privateAdd(this, _logQuery);
    __privateAdd(this, _calculateDurationMillis);
    __privateAdd(this, _driver2, void 0);
    __privateAdd(this, _log, void 0);
    __privateAdd(this, _initPromise, void 0);
    __privateAdd(this, _initDone, void 0);
    __privateAdd(this, _destroyPromise, void 0);
    __privateAdd(this, _connections, /* @__PURE__ */ new WeakSet());
    __privateSet(this, _initDone, false);
    __privateSet(this, _driver2, driver);
    __privateSet(this, _log, log3);
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
      if (__privateMethod(this, _needsLogging, needsLogging_fn).call(this)) {
        __privateMethod(this, _addLogging, addLogging_fn).call(this, connection);
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
_needsLogging = new WeakSet();
needsLogging_fn = function() {
  return __privateGet(this, _log).isLevelEnabled("query") || __privateGet(this, _log).isLevelEnabled("error");
};
_addLogging = new WeakSet();
addLogging_fn = function(connection) {
  const executeQuery = connection.executeQuery;
  connection.executeQuery = async (compiledQuery) => {
    const startTime = performanceNow();
    try {
      return await executeQuery.call(connection, compiledQuery);
    } catch (error) {
      await __privateMethod(this, _logError, logError_fn).call(this, error, compiledQuery, startTime);
      throw error;
    } finally {
      await __privateMethod(this, _logQuery, logQuery_fn).call(this, compiledQuery, startTime);
    }
  };
};
_logError = new WeakSet();
logError_fn = async function(error, compiledQuery, startTime) {
  await __privateGet(this, _log).error(() => ({
    level: "error",
    error,
    query: compiledQuery,
    queryDurationMillis: __privateMethod(this, _calculateDurationMillis, calculateDurationMillis_fn).call(this, startTime)
  }));
};
_logQuery = new WeakSet();
logQuery_fn = async function(compiledQuery, startTime) {
  await __privateGet(this, _log).query(() => ({
    level: "query",
    query: compiledQuery,
    queryDurationMillis: __privateMethod(this, _calculateDurationMillis, calculateDurationMillis_fn).call(this, startTime)
  }));
};
_calculateDurationMillis = new WeakSet();
calculateDurationMillis_fn = function(startTime) {
  return performanceNow() - startTime;
};
class SingleConnectionProvider {
  constructor(connection) {
    // Run the runner in an async function to make sure it doesn't
    // throw synchronous errors.
    __privateAdd(this, _run);
    __privateAdd(this, _connection, void 0);
    __privateAdd(this, _runningPromise, void 0);
    __privateSet(this, _connection, connection);
  }
  async provideConnection(consumer) {
    while (__privateGet(this, _runningPromise)) {
      await __privateGet(this, _runningPromise);
    }
    const promise = __privateMethod(this, _run, run_fn).call(this, consumer);
    __privateSet(this, _runningPromise, promise.then(() => {
      __privateSet(this, _runningPromise, void 0);
    }).catch(() => {
      __privateSet(this, _runningPromise, void 0);
    }));
    return promise;
  }
}
_connection = new WeakMap();
_runningPromise = new WeakMap();
_run = new WeakSet();
run_fn = async function(runner) {
  return await runner(__privateGet(this, _connection));
};
const TRANSACTION_ISOLATION_LEVELS = [
  "read uncommitted",
  "read committed",
  "repeatable read",
  "serializable"
];
freeze(["query", "error"]);
class Log {
  constructor(config) {
    __privateAdd(this, _levels, void 0);
    __privateAdd(this, _logger, void 0);
    if (isFunction$1(config)) {
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
      console.error(`kysely:error: ${event}`);
    }
  }
}
function isCompilable(value) {
  return isObject(value) && isFunction$1(value.compile);
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
      const log3 = new Log(args.log ?? []);
      const runtimeDriver = new RuntimeDriver(driver, log3);
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
    __privateAdd(this, _props32, void 0);
    __privateSet(this, _props32, freeze(props));
  }
  /**
   * Returns the {@link SchemaModule} module for building database schema.
   */
  get schema() {
    return new SchemaModule(__privateGet(this, _props32).executor);
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
    return __privateGet(this, _props32).dialect.createIntrospector(this.withoutPlugins());
  }
  case(value) {
    return new CaseBuilder({
      node: CaseNode.create(isUndefined(value) ? void 0 : parseExpression(value))
    });
  }
  /**
   * Returns a {@link FunctionModule} that can be used to write type safe function
   * calls.
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
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "person"."id", count("pet"."id") as "pet_count"
   * from "person"
   * inner join "pet" on "pet"."owner_id" = "person"."id"
   * group by "person"."id"
   * having count("pet"."id") > $1
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
   * transaction. If the function throws, the transaction is rolled back. Otherwise
   * the transaction is committed.
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
   * This example inserts two rows in a transaction. If an error is thrown inside
   * the callback passed to the `execute` method, the transaction is rolled back.
   * Otherwise it's committed.
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
   * await db
   *   .transaction()
   *   .setIsolationLevel('serializable')
   *   .execute(async (trx) => {
   *     await doStuff(trx)
   *   })
   * ```
   */
  transaction() {
    return new TransactionBuilder({ ...__privateGet(this, _props32) });
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
   * ```
   */
  connection() {
    return new ConnectionBuilder({ ...__privateGet(this, _props32) });
  }
  /**
   * Returns a copy of this Kysely instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _Kysely({
      ...__privateGet(this, _props32),
      executor: __privateGet(this, _props32).executor.withPlugin(plugin)
    });
  }
  /**
   * Returns a copy of this Kysely instance without any plugins.
   */
  withoutPlugins() {
    return new _Kysely({
      ...__privateGet(this, _props32),
      executor: __privateGet(this, _props32).executor.withoutPlugins()
    });
  }
  /**
   * @override
   */
  withSchema(schema) {
    return new _Kysely({
      ...__privateGet(this, _props32),
      executor: __privateGet(this, _props32).executor.withPluginAtFront(new WithSchemaPlugin(schema))
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
   * @example
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
    return new _Kysely({ ...__privateGet(this, _props32) });
  }
  /**
   * Releases all resources and disconnects from the database.
   *
   * You need to call this when you are done using the `Kysely` instance.
   */
  async destroy() {
    await __privateGet(this, _props32).driver.destroy();
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
    return __privateGet(this, _props32).executor;
  }
  /**
   * Executes a given compiled query or query builder.
   *
   * See {@link https://github.com/koskimas/kysely/blob/master/site/docs/recipes/splitting-build-compile-and-execute-code.md#execute-compiled-queries splitting build, compile and execute code recipe} for more information.
   */
  executeQuery(query, queryId = createQueryId()) {
    const compiledQuery = isCompilable(query) ? query.compile() : query;
    return this.getExecutor().executeQuery(compiledQuery, queryId);
  }
};
_props32 = new WeakMap();
let Kysely = _Kysely;
const _Transaction = class _Transaction extends Kysely {
  constructor(props) {
    super(props);
    __privateAdd(this, _props33, void 0);
    __privateSet(this, _props33, props);
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
      ...__privateGet(this, _props33),
      executor: __privateGet(this, _props33).executor.withPlugin(plugin)
    });
  }
  withoutPlugins() {
    return new _Transaction({
      ...__privateGet(this, _props33),
      executor: __privateGet(this, _props33).executor.withoutPlugins()
    });
  }
  /**
   * @override
   */
  withSchema(schema) {
    return new _Transaction({
      ...__privateGet(this, _props33),
      executor: __privateGet(this, _props33).executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
  withTables() {
    return new _Transaction({ ...__privateGet(this, _props33) });
  }
};
_props33 = new WeakMap();
let Transaction = _Transaction;
function isKyselyProps(obj) {
  return isObject(obj) && isObject(obj.config) && isObject(obj.driver) && isObject(obj.executor) && isObject(obj.dialect);
}
class ConnectionBuilder {
  constructor(props) {
    __privateAdd(this, _props34, void 0);
    __privateSet(this, _props34, freeze(props));
  }
  async execute(callback) {
    return __privateGet(this, _props34).executor.provideConnection(async (connection) => {
      const executor = __privateGet(this, _props34).executor.withConnectionProvider(new SingleConnectionProvider(connection));
      const db = new Kysely({
        ...__privateGet(this, _props34),
        executor
      });
      return await callback(db);
    });
  }
}
_props34 = new WeakMap();
preventAwait(ConnectionBuilder, "don't await ConnectionBuilder instances directly. To execute the query you need to call the `execute` method");
const _TransactionBuilder = class _TransactionBuilder {
  constructor(props) {
    __privateAdd(this, _props35, void 0);
    __privateSet(this, _props35, freeze(props));
  }
  setIsolationLevel(isolationLevel) {
    return new _TransactionBuilder({
      ...__privateGet(this, _props35),
      isolationLevel
    });
  }
  async execute(callback) {
    const { isolationLevel, ...kyselyProps } = __privateGet(this, _props35);
    const settings = { isolationLevel };
    validateTransactionSettings(settings);
    return __privateGet(this, _props35).executor.provideConnection(async (connection) => {
      const executor = __privateGet(this, _props35).executor.withConnectionProvider(new SingleConnectionProvider(connection));
      const transaction = new Transaction({
        ...kyselyProps,
        executor
      });
      try {
        await __privateGet(this, _props35).driver.beginTransaction(connection, settings);
        const result = await callback(transaction);
        await __privateGet(this, _props35).driver.commitTransaction(connection);
        return result;
      } catch (error) {
        await __privateGet(this, _props35).driver.rollbackTransaction(connection);
        throw error;
      }
    });
  }
};
_props35 = new WeakMap();
let TransactionBuilder = _TransactionBuilder;
preventAwait(TransactionBuilder, "don't await TransactionBuilder instances directly. To execute the transaction you need to call the `execute` method");
function validateTransactionSettings(settings) {
  if (settings.isolationLevel && !TRANSACTION_ISOLATION_LEVELS.includes(settings.isolationLevel)) {
    throw new Error(`invalid transaction isolation level ${settings.isolationLevel}`);
  }
}
const _RawBuilderImpl = class _RawBuilderImpl {
  constructor(props) {
    __privateAdd(this, _getExecutor);
    __privateAdd(this, _toOperationNode);
    __privateAdd(this, _compile);
    __privateAdd(this, _props36, void 0);
    __privateSet(this, _props36, freeze(props));
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
    return new _RawBuilderImpl({ ...__privateGet(this, _props36) });
  }
  withPlugin(plugin) {
    return new _RawBuilderImpl({
      ...__privateGet(this, _props36),
      plugins: __privateGet(this, _props36).plugins !== void 0 ? freeze([...__privateGet(this, _props36).plugins, plugin]) : freeze([plugin])
    });
  }
  toOperationNode() {
    return __privateMethod(this, _toOperationNode, toOperationNode_fn).call(this, __privateMethod(this, _getExecutor, getExecutor_fn).call(this));
  }
  compile(executorProvider) {
    return __privateMethod(this, _compile, compile_fn).call(this, __privateMethod(this, _getExecutor, getExecutor_fn).call(this, executorProvider));
  }
  async execute(executorProvider) {
    const executor = __privateMethod(this, _getExecutor, getExecutor_fn).call(this, executorProvider);
    return executor.executeQuery(__privateMethod(this, _compile, compile_fn).call(this, executor), __privateGet(this, _props36).queryId);
  }
};
_props36 = new WeakMap();
_getExecutor = new WeakSet();
getExecutor_fn = function(executorProvider) {
  const executor = executorProvider !== void 0 ? executorProvider.getExecutor() : NOOP_QUERY_EXECUTOR;
  return __privateGet(this, _props36).plugins !== void 0 ? executor.withPlugins(__privateGet(this, _props36).plugins) : executor;
};
_toOperationNode = new WeakSet();
toOperationNode_fn = function(executor) {
  return executor.transformQuery(__privateGet(this, _props36).rawNode, __privateGet(this, _props36).queryId);
};
_compile = new WeakSet();
compile_fn = function(executor) {
  return executor.compileQuery(__privateMethod(this, _toOperationNode, toOperationNode_fn).call(this, executor), __privateGet(this, _props36).queryId);
};
let RawBuilderImpl = _RawBuilderImpl;
function createRawBuilder(props) {
  return new RawBuilderImpl(props);
}
preventAwait(RawBuilderImpl, "don't await RawBuilder instances directly. To execute the query you need to call `execute`");
class AliasedRawBuilderImpl {
  constructor(rawBuilder, alias) {
    __privateAdd(this, _rawBuilder, void 0);
    __privateAdd(this, _alias5, void 0);
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
    rawNode: RawNode.create(sqlFragments, parameters?.map(parseValueExpression) ?? [])
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
      nodes[2 * i] = parseValueExpression(array[i]);
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
      TupleNode: this.visitTuple.bind(this)
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
    const wrapInParens = this.parentNode !== void 0 && !ParensNode.is(this.parentNode) && !InsertQueryNode.is(this.parentNode) && !CreateViewNode.is(this.parentNode) && !SetOperationNode.is(this.parentNode);
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
    this.append(node.replace ? "replace" : "insert");
    if (node.ignore) {
      this.append(" ignore");
    }
    this.append(" into ");
    this.visitNode(node.into);
    if (node.columns) {
      this.append(" (");
      this.compileList(node.columns);
      this.append(")");
    }
    if (node.values) {
      this.append(" ");
      this.visitNode(node.values);
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
    if (isSubQuery) {
      this.append(")");
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
    this.visitNode(node.from);
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
  visitColumnDefinition(node) {
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
    this.append("update ");
    this.visitNode(node.table);
    this.append(" set ");
    if (node.updates) {
      this.compileList(node.updates);
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
    if (node.returning) {
      this.append(" ");
      this.visitNode(node.returning);
    }
    if (isSubQuery) {
      this.append(")");
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
    this.append("unique (");
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
      this.compileList(node.columnAlterations);
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
      this.append("type ");
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
  LateralLeftJoin: "left join lateral"
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
    __privateAdd(this, _getTableMetadata);
    __privateAdd(this, _db, void 0);
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
    return Promise.all(tables2.map(({ name }) => __privateMethod(this, _getTableMetadata, getTableMetadata_fn).call(this, name)));
  }
  async getMetadata(options) {
    return {
      tables: await this.getTables(options)
    };
  }
}
_db = new WeakMap();
_getTableMetadata = new WeakSet();
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
      hasDefaultValue: col.dflt_value != null
    }))
  };
};
class SqliteAdapter {
  get supportsTransactionalDdl() {
    return false;
  }
  get supportsReturning() {
    return true;
  }
  async acquireMigrationLock(_db3, _opt) {
  }
  async releaseMigrationLock(_db3, _opt) {
  }
}
var BaseDialect = class {
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
var BaseDriver = (_a = class {
  constructor() {
    __privateAdd(this, _connectionMutex, new ConnectionMutex$1());
    __publicField(this, "connection");
  }
  async acquireConnection() {
    await __privateGet(this, _connectionMutex).lock();
    return this.connection;
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
    __privateGet(this, _connectionMutex).unlock();
  }
}, _connectionMutex = new WeakMap(), _a);
var ConnectionMutex$1 = class ConnectionMutex {
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
var BaseSqliteConnection = class {
  streamQuery() {
    throw new Error("SQLite driver doesn't support streaming");
  }
  async executeQuery({ parameters, query, sql: sql2 }) {
    const rows = await this.query(sql2, parameters);
    return SelectQueryNode.is(query) || rows.length ? { rows } : {
      rows,
      ...await this.info()
    };
  }
};
function throttle(func, delay, maxCalls) {
  let timer;
  let callCount = 0;
  let lastArgs = null;
  function reset() {
    timer && clearTimeout(timer);
    callCount = 0;
    lastArgs = null;
  }
  function callFunc() {
    if (callCount >= maxCalls) {
      func(lastArgs);
      reset();
    } else {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        func(lastArgs);
        reset();
        timer = void 0;
      }, delay);
    }
  }
  return (s) => {
    callCount++;
    lastArgs = s;
    if (timer === void 0 && callCount === 0) {
      func(s);
      callCount++;
    } else {
      callFunc();
    }
  };
}
var SqlJsDriver = class extends BaseDriver {
  constructor(config) {
    super();
    __publicField(this, "config");
    __publicField(this, "db");
    this.config = config;
  }
  async init() {
    this.db = typeof this.config.database === "function" ? await this.config.database() : this.config.database;
    if (!this.db) {
      throw new Error("no database");
    }
    this.connection = new SqlJsConnection(
      this.db,
      this.config.onWrite?.func,
      this.config.onWrite?.isThrottle,
      this.config.onWrite?.delay,
      this.config.onWrite?.maxCalls
    );
    await this.config.onCreateConnection?.(this.connection);
  }
  async beginTransaction(connection) {
    connection.trxCount++;
    await super.beginTransaction(connection);
  }
  async commitTransaction(connection) {
    connection.trxCount--;
    await super.commitTransaction(connection);
  }
  async rollbackTransaction(connection) {
    connection.trxCount--;
    await super.rollbackTransaction(connection);
  }
  async destroy() {
    this.db?.close();
  }
};
var SqlJsConnection = class extends BaseSqliteConnection {
  constructor(db, func, isThrottle = false, delay = 2e3, maxCalls = 1e3) {
    super();
    __publicField(this, "db");
    __publicField(this, "onWrite");
    __publicField(this, "trxCount", 0);
    this.db = db;
    this.onWrite = func ? isThrottle ? throttle(func, delay, maxCalls) : func : void 0;
  }
  async query(sql2, parameters) {
    const stmt = this.db.prepare(sql2);
    stmt.bind(parameters);
    const rows = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();
    return rows;
  }
  async info() {
    let id = 0;
    const _stmt = this.db.prepare("SELECT last_insert_rowid()");
    try {
      _stmt.step();
      id = _stmt.get()[0];
    } finally {
      _stmt.free();
    }
    this.trxCount === 0 && this.onWrite?.(this.db.export());
    return {
      insertId: BigInt(id),
      numAffectedRows: BigInt(this.db.getRowsModified())
    };
  }
};
var SqlJsDialect = class extends BaseDialect {
  /**
   * dialect for [sql.js](https://github.com/sql-js/sql.js)
   *
   * no support for bigint
   */
  constructor(config) {
    super();
    __publicField(this, "config");
    this.config = config;
  }
  createDriver() {
    return new SqlJsDriver(this.config);
  }
};
var WaSqliteDriver = class extends BaseDriver {
  constructor(config) {
    super();
    __publicField(this, "config");
    __publicField(this, "db");
    this.config = config;
  }
  async init() {
    this.db = typeof this.config.database === "function" ? await this.config.database() : this.config.database;
    this.connection = new WaSqliteConnection(this.db);
    await this.config.onCreateConnection?.(this.connection);
  }
  async destroy() {
    await this.db?.sqlite.close(this.db.db);
  }
};
var WaSqliteConnection = class extends BaseSqliteConnection {
  constructor(database2) {
    super();
    __publicField(this, "sqlite");
    __publicField(this, "db");
    this.db = database2.db;
    this.sqlite = database2.sqlite;
  }
  async query(sql2, params) {
    const rows = [];
    const str = this.sqlite.str_new(this.db, sql2);
    const prepared = await this.sqlite.prepare_v2(this.db, this.sqlite.str_value(str));
    if (prepared) {
      const stmt = prepared.stmt;
      try {
        params?.length && this.sqlite.bind_collection(stmt, params);
        const cols = this.sqlite.column_names(stmt);
        while (await this.sqlite.step(stmt) === 100) {
          const row = this.sqlite.row(stmt);
          rows.push(Object.fromEntries(cols.map((key, i) => [key, row[i]])));
        }
      } finally {
        await this.sqlite.finalize(stmt);
      }
    }
    return rows;
  }
  async info() {
    return {
      insertId: await new Promise((resolve) => this.sqlite.exec(
        this.db,
        "SELECT last_insert_rowid()",
        ([id]) => resolve(BigInt(id))
      )),
      numAffectedRows: BigInt(this.sqlite.changes(this.db))
    };
  }
};
var WaSqliteDialect = (_b = class extends BaseDialect {
  /**
   * dialect for [wa-sqlite](https://github.com/rhashimoto/wa-sqlite)
   *
   * better for polyfill, can use `IndexedDB` or `OPFS` as backend
   *
   * @example
   * import * as SQLite from 'wa-sqlite'
   * import SQLiteAsyncESMFactory from 'wa-sqlite/dist/wa-sqlite-async.mjs'
   * import { IDBBatchAtomicVFS } from 'wa-sqlite/src/examples/IDBBatchAtomicVFS.js'
   * import { WaSqliteDialect } from 'kysely-wasm'
   * import WaSqliteURL from 'wa-sqlite/dist/wa-sqlite-async.wasm?url'
   *
   * const dialect = new WaSqliteDialect({
   *   async database() {
   *     const SQLiteAsyncModule = await SQLiteAsyncESMFactory({
   *       locateFile: () => WaSqliteURL,
   *     })
   *
   *     const sqlite = SQLite.Factory(SQLiteAsyncModule)
   *     const dbName = 'wa-sqlite-test'
   *     sqlite.vfs_register(new IDBBatchAtomicVFS(dbName))
   *     const db = await sqlite.open_v2(
   *       dbName, undefined, dbName,
   *     )
   *     return {
   *       sqlite,
   *       db,
   *     }
   *   },
   * })
   */
  constructor(config) {
    super();
    __privateAdd(this, _config, void 0);
    __privateSet(this, _config, config);
  }
  createDriver() {
    return new WaSqliteDriver(__privateGet(this, _config));
  }
}, _config = new WeakMap(), _b);
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var sqlWasm = { exports: {} };
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
(function(module, exports) {
  var initSqlJsPromise = void 0;
  var initSqlJs = function(moduleConfig) {
    if (initSqlJsPromise) {
      return initSqlJsPromise;
    }
    initSqlJsPromise = new Promise(function(resolveModule, reject) {
      var Module2 = typeof moduleConfig !== "undefined" ? moduleConfig : {};
      var originalOnAbortFunction = Module2["onAbort"];
      Module2["onAbort"] = function(errorThatCausedAbort) {
        reject(new Error(errorThatCausedAbort));
        if (originalOnAbortFunction) {
          originalOnAbortFunction(errorThatCausedAbort);
        }
      };
      Module2["postRun"] = Module2["postRun"] || [];
      Module2["postRun"].push(function() {
        resolveModule(Module2);
      });
      module = void 0;
      var e;
      e || (e = typeof Module2 !== "undefined" ? Module2 : {});
      e.onRuntimeInitialized = function() {
        function a(g, m) {
          switch (typeof m) {
            case "boolean":
              gc(g, m ? 1 : 0);
              break;
            case "number":
              hc(g, m);
              break;
            case "string":
              ic(g, m, -1, -1);
              break;
            case "object":
              if (null === m)
                kb(g);
              else if (null != m.length) {
                var n = aa(m);
                jc(g, n, m.length, -1);
                ba(n);
              } else
                xa(g, "Wrong API use : tried to return a value of an unknown type (" + m + ").", -1);
              break;
            default:
              kb(g);
          }
        }
        function b(g, m) {
          for (var n = [], p2 = 0; p2 < g; p2 += 1) {
            var v = l(m + 4 * p2, "i32"), y = kc(v);
            if (1 === y || 2 === y)
              v = lc(v);
            else if (3 === y)
              v = mc(v);
            else if (4 === y) {
              y = v;
              v = nc(y);
              y = oc(y);
              for (var L = new Uint8Array(v), G = 0; G < v; G += 1)
                L[G] = r[y + G];
              v = L;
            } else
              v = null;
            n.push(v);
          }
          return n;
        }
        function c(g, m) {
          this.La = g;
          this.db = m;
          this.Ja = 1;
          this.fb = [];
        }
        function d(g, m) {
          this.db = m;
          m = ca(g) + 1;
          this.Ya = da(m);
          if (null === this.Ya)
            throw Error("Unable to allocate memory for the SQL string");
          t(g, u, this.Ya, m);
          this.eb = this.Ya;
          this.Ua = this.ib = null;
        }
        function f(g) {
          this.filename = "dbfile_" + (4294967295 * Math.random() >>> 0);
          if (null != g) {
            var m = this.filename, n = "/", p2 = m;
            n && (n = "string" == typeof n ? n : ea(n), p2 = m ? z(n + "/" + m) : n);
            m = fa(
              true,
              true
            );
            p2 = ha(p2, (void 0 !== m ? m : 438) & 4095 | 32768, 0);
            if (g) {
              if ("string" == typeof g) {
                n = Array(g.length);
                for (var v = 0, y = g.length; v < y; ++v)
                  n[v] = g.charCodeAt(v);
                g = n;
              }
              ia(p2, m | 146);
              n = ja(p2, 577);
              ka(n, g, 0, g.length, 0);
              la(n);
              ia(p2, m);
            }
          }
          this.handleError(q(this.filename, h));
          this.db = l(h, "i32");
          pc(this.db);
          this.Za = {};
          this.Na = {};
        }
        var h = B(4), k = e.cwrap, q = k("sqlite3_open", "number", ["string", "number"]), x = k("sqlite3_close_v2", "number", ["number"]), w = k("sqlite3_exec", "number", ["number", "string", "number", "number", "number"]), A = k(
          "sqlite3_changes",
          "number",
          ["number"]
        ), S = k("sqlite3_prepare_v2", "number", ["number", "string", "number", "number", "number"]), nb = k("sqlite3_sql", "string", ["number"]), qc = k("sqlite3_normalized_sql", "string", ["number"]), ob = k("sqlite3_prepare_v2", "number", ["number", "number", "number", "number", "number"]), rc = k("sqlite3_bind_text", "number", ["number", "number", "number", "number", "number"]), pb = k("sqlite3_bind_blob", "number", ["number", "number", "number", "number", "number"]), sc = k("sqlite3_bind_double", "number", ["number", "number", "number"]), tc = k("sqlite3_bind_int", "number", ["number", "number", "number"]), uc = k("sqlite3_bind_parameter_index", "number", ["number", "string"]), vc = k("sqlite3_step", "number", ["number"]), wc = k("sqlite3_errmsg", "string", ["number"]), xc = k("sqlite3_column_count", "number", ["number"]), yc = k("sqlite3_data_count", "number", ["number"]), zc = k("sqlite3_column_double", "number", ["number", "number"]), qb = k("sqlite3_column_text", "string", ["number", "number"]), Ac = k("sqlite3_column_blob", "number", ["number", "number"]), Bc = k(
          "sqlite3_column_bytes",
          "number",
          ["number", "number"]
        ), Cc = k("sqlite3_column_type", "number", ["number", "number"]), Dc = k("sqlite3_column_name", "string", ["number", "number"]), Ec = k("sqlite3_reset", "number", ["number"]), Fc = k("sqlite3_clear_bindings", "number", ["number"]), Gc = k("sqlite3_finalize", "number", ["number"]), rb = k("sqlite3_create_function_v2", "number", "number string number number number number number number number".split(" ")), kc = k("sqlite3_value_type", "number", ["number"]), nc = k("sqlite3_value_bytes", "number", ["number"]), mc = k(
          "sqlite3_value_text",
          "string",
          ["number"]
        ), oc = k("sqlite3_value_blob", "number", ["number"]), lc = k("sqlite3_value_double", "number", ["number"]), hc = k("sqlite3_result_double", "", ["number", "number"]), kb = k("sqlite3_result_null", "", ["number"]), ic = k("sqlite3_result_text", "", ["number", "string", "number", "number"]), jc = k("sqlite3_result_blob", "", ["number", "number", "number", "number"]), gc = k("sqlite3_result_int", "", ["number", "number"]), xa = k("sqlite3_result_error", "", ["number", "string", "number"]), sb = k(
          "sqlite3_aggregate_context",
          "number",
          ["number", "number"]
        ), pc = k("RegisterExtensionFunctions", "number", ["number"]);
        c.prototype.bind = function(g) {
          if (!this.La)
            throw "Statement closed";
          this.reset();
          return Array.isArray(g) ? this.xb(g) : null != g && "object" === typeof g ? this.yb(g) : true;
        };
        c.prototype.step = function() {
          if (!this.La)
            throw "Statement closed";
          this.Ja = 1;
          var g = vc(this.La);
          switch (g) {
            case 100:
              return true;
            case 101:
              return false;
            default:
              throw this.db.handleError(g);
          }
        };
        c.prototype.sb = function(g) {
          null == g && (g = this.Ja, this.Ja += 1);
          return zc(this.La, g);
        };
        c.prototype.Cb = function(g) {
          null == g && (g = this.Ja, this.Ja += 1);
          g = qb(this.La, g);
          if ("function" !== typeof BigInt)
            throw Error("BigInt is not supported");
          return BigInt(g);
        };
        c.prototype.Db = function(g) {
          null == g && (g = this.Ja, this.Ja += 1);
          return qb(this.La, g);
        };
        c.prototype.getBlob = function(g) {
          null == g && (g = this.Ja, this.Ja += 1);
          var m = Bc(this.La, g);
          g = Ac(this.La, g);
          for (var n = new Uint8Array(m), p2 = 0; p2 < m; p2 += 1)
            n[p2] = r[g + p2];
          return n;
        };
        c.prototype.get = function(g, m) {
          m = m || {};
          null != g && this.bind(g) && this.step();
          g = [];
          for (var n = yc(this.La), p2 = 0; p2 < n; p2 += 1)
            switch (Cc(this.La, p2)) {
              case 1:
                var v = m.useBigInt ? this.Cb(p2) : this.sb(p2);
                g.push(v);
                break;
              case 2:
                g.push(this.sb(p2));
                break;
              case 3:
                g.push(this.Db(p2));
                break;
              case 4:
                g.push(this.getBlob(p2));
                break;
              default:
                g.push(null);
            }
          return g;
        };
        c.prototype.getColumnNames = function() {
          for (var g = [], m = xc(this.La), n = 0; n < m; n += 1)
            g.push(Dc(this.La, n));
          return g;
        };
        c.prototype.getAsObject = function(g, m) {
          g = this.get(g, m);
          m = this.getColumnNames();
          for (var n = {}, p2 = 0; p2 < m.length; p2 += 1)
            n[m[p2]] = g[p2];
          return n;
        };
        c.prototype.getSQL = function() {
          return nb(this.La);
        };
        c.prototype.getNormalizedSQL = function() {
          return qc(this.La);
        };
        c.prototype.run = function(g) {
          null != g && this.bind(g);
          this.step();
          return this.reset();
        };
        c.prototype.nb = function(g, m) {
          null == m && (m = this.Ja, this.Ja += 1);
          g = ma(g);
          var n = aa(g);
          this.fb.push(n);
          this.db.handleError(rc(this.La, m, n, g.length - 1, 0));
        };
        c.prototype.wb = function(g, m) {
          null == m && (m = this.Ja, this.Ja += 1);
          var n = aa(g);
          this.fb.push(n);
          this.db.handleError(pb(this.La, m, n, g.length, 0));
        };
        c.prototype.mb = function(g, m) {
          null == m && (m = this.Ja, this.Ja += 1);
          this.db.handleError((g === (g | 0) ? tc : sc)(this.La, m, g));
        };
        c.prototype.zb = function(g) {
          null == g && (g = this.Ja, this.Ja += 1);
          pb(this.La, g, 0, 0, 0);
        };
        c.prototype.ob = function(g, m) {
          null == m && (m = this.Ja, this.Ja += 1);
          switch (typeof g) {
            case "string":
              this.nb(g, m);
              return;
            case "number":
              this.mb(g, m);
              return;
            case "bigint":
              this.nb(g.toString(), m);
              return;
            case "boolean":
              this.mb(g + 0, m);
              return;
            case "object":
              if (null === g) {
                this.zb(m);
                return;
              }
              if (null != g.length) {
                this.wb(g, m);
                return;
              }
          }
          throw "Wrong API use : tried to bind a value of an unknown type (" + g + ").";
        };
        c.prototype.yb = function(g) {
          var m = this;
          Object.keys(g).forEach(function(n) {
            var p2 = uc(m.La, n);
            0 !== p2 && m.ob(g[n], p2);
          });
          return true;
        };
        c.prototype.xb = function(g) {
          for (var m = 0; m < g.length; m += 1)
            this.ob(g[m], m + 1);
          return true;
        };
        c.prototype.reset = function() {
          this.freemem();
          return 0 === Fc(this.La) && 0 === Ec(this.La);
        };
        c.prototype.freemem = function() {
          for (var g; void 0 !== (g = this.fb.pop()); )
            ba(g);
        };
        c.prototype.free = function() {
          this.freemem();
          var g = 0 === Gc(this.La);
          delete this.db.Za[this.La];
          this.La = 0;
          return g;
        };
        d.prototype.next = function() {
          if (null === this.Ya)
            return { done: true };
          null !== this.Ua && (this.Ua.free(), this.Ua = null);
          if (!this.db.db)
            throw this.gb(), Error("Database closed");
          var g = oa(), m = B(4);
          pa(h);
          pa(m);
          try {
            this.db.handleError(ob(this.db.db, this.eb, -1, h, m));
            this.eb = l(m, "i32");
            var n = l(h, "i32");
            if (0 === n)
              return this.gb(), { done: true };
            this.Ua = new c(n, this.db);
            this.db.Za[n] = this.Ua;
            return { value: this.Ua, done: false };
          } catch (p2) {
            throw this.ib = C(this.eb), this.gb(), p2;
          } finally {
            qa(g);
          }
        };
        d.prototype.gb = function() {
          ba(this.Ya);
          this.Ya = null;
        };
        d.prototype.getRemainingSQL = function() {
          return null !== this.ib ? this.ib : C(this.eb);
        };
        "function" === typeof Symbol && "symbol" === typeof Symbol.iterator && (d.prototype[Symbol.iterator] = function() {
          return this;
        });
        f.prototype.run = function(g, m) {
          if (!this.db)
            throw "Database closed";
          if (m) {
            g = this.prepare(g, m);
            try {
              g.step();
            } finally {
              g.free();
            }
          } else
            this.handleError(w(this.db, g, 0, 0, h));
          return this;
        };
        f.prototype.exec = function(g, m, n) {
          if (!this.db)
            throw "Database closed";
          var p2 = oa(), v = null;
          try {
            var y = ca(g) + 1, L = B(y);
            t(g, r, L, y);
            var G = L;
            var H = B(4);
            for (g = []; 0 !== l(G, "i8"); ) {
              pa(h);
              pa(H);
              this.handleError(ob(this.db, G, -1, h, H));
              var I = l(h, "i32");
              G = l(H, "i32");
              if (0 !== I) {
                y = null;
                v = new c(I, this);
                for (null != m && v.bind(m); v.step(); )
                  null === y && (y = { columns: v.getColumnNames(), values: [] }, g.push(y)), y.values.push(v.get(null, n));
                v.free();
              }
            }
            return g;
          } catch (na) {
            throw v && v.free(), na;
          } finally {
            qa(p2);
          }
        };
        f.prototype.each = function(g, m, n, p2, v) {
          "function" === typeof m && (p2 = n, n = m, m = void 0);
          g = this.prepare(g, m);
          try {
            for (; g.step(); )
              n(g.getAsObject(null, v));
          } finally {
            g.free();
          }
          if ("function" === typeof p2)
            return p2();
        };
        f.prototype.prepare = function(g, m) {
          pa(h);
          this.handleError(S(this.db, g, -1, h, 0));
          g = l(h, "i32");
          if (0 === g)
            throw "Nothing to prepare";
          var n = new c(g, this);
          null != m && n.bind(m);
          return this.Za[g] = n;
        };
        f.prototype.iterateStatements = function(g) {
          return new d(g, this);
        };
        f.prototype["export"] = function() {
          Object.values(this.Za).forEach(function(m) {
            m.free();
          });
          Object.values(this.Na).forEach(ra);
          this.Na = {};
          this.handleError(x(this.db));
          var g = sa(this.filename);
          this.handleError(q(this.filename, h));
          this.db = l(h, "i32");
          return g;
        };
        f.prototype.close = function() {
          null !== this.db && (Object.values(this.Za).forEach(function(g) {
            g.free();
          }), Object.values(this.Na).forEach(ra), this.Na = {}, this.handleError(x(this.db)), ta("/" + this.filename), this.db = null);
        };
        f.prototype.handleError = function(g) {
          if (0 === g)
            return null;
          g = wc(this.db);
          throw Error(g);
        };
        f.prototype.getRowsModified = function() {
          return A(this.db);
        };
        f.prototype.create_function = function(g, m) {
          Object.prototype.hasOwnProperty.call(this.Na, g) && (ra(this.Na[g]), delete this.Na[g]);
          var n = ua(function(p2, v, y) {
            v = b(v, y);
            try {
              var L = m.apply(null, v);
            } catch (G) {
              xa(p2, G, -1);
              return;
            }
            a(p2, L);
          }, "viii");
          this.Na[g] = n;
          this.handleError(rb(this.db, g, m.length, 1, 0, n, 0, 0, 0));
          return this;
        };
        f.prototype.create_aggregate = function(g, m) {
          var n = m.init || function() {
            return null;
          }, p2 = m.finalize || function(H) {
            return H;
          }, v = m.step;
          if (!v)
            throw "An aggregate function must have a step function in " + g;
          var y = {};
          Object.hasOwnProperty.call(this.Na, g) && (ra(this.Na[g]), delete this.Na[g]);
          m = g + "__finalize";
          Object.hasOwnProperty.call(this.Na, m) && (ra(this.Na[m]), delete this.Na[m]);
          var L = ua(function(H, I, na) {
            var Z = sb(H, 1);
            Object.hasOwnProperty.call(y, Z) || (y[Z] = n());
            I = b(I, na);
            I = [y[Z]].concat(I);
            try {
              y[Z] = v.apply(null, I);
            } catch (Ic) {
              delete y[Z], xa(H, Ic, -1);
            }
          }, "viii"), G = ua(function(H) {
            var I = sb(H, 1);
            try {
              var na = p2(y[I]);
            } catch (Z) {
              delete y[I];
              xa(H, Z, -1);
              return;
            }
            a(H, na);
            delete y[I];
          }, "vi");
          this.Na[g] = L;
          this.Na[m] = G;
          this.handleError(rb(this.db, g, v.length - 1, 1, 0, 0, L, G, 0));
          return this;
        };
        e.Database = f;
      };
      var va = Object.assign({}, e), wa = "./this.program", ya = "object" == typeof window, za = "function" == typeof importScripts, Aa = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, D = "", Ba, Ca, Da, fs, Ea, Fa;
      if (Aa)
        D = za ? require$$2.dirname(D) + "/" : __dirname + "/", Fa = () => {
          Ea || (fs = require$$2, Ea = require$$2);
        }, Ba = function(a, b) {
          Fa();
          a = Ea.normalize(a);
          return fs.readFileSync(a, b ? void 0 : "utf8");
        }, Da = (a) => {
          a = Ba(a, true);
          a.buffer || (a = new Uint8Array(a));
          return a;
        }, Ca = (a, b, c) => {
          Fa();
          a = Ea.normalize(a);
          fs.readFile(a, function(d, f) {
            d ? c(d) : b(f.buffer);
          });
        }, 1 < process.argv.length && (wa = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2), module.exports = e, e.inspect = function() {
          return "[Emscripten Module object]";
        };
      else if (ya || za)
        za ? D = self.location.href : "undefined" != typeof document && document.currentScript && (D = document.currentScript.src), D = 0 !== D.indexOf("blob:") ? D.substr(0, D.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "", Ba = (a) => {
          var b = new XMLHttpRequest();
          b.open("GET", a, false);
          b.send(null);
          return b.responseText;
        }, za && (Da = (a) => {
          var b = new XMLHttpRequest();
          b.open("GET", a, false);
          b.responseType = "arraybuffer";
          b.send(null);
          return new Uint8Array(b.response);
        }), Ca = (a, b, c) => {
          var d = new XMLHttpRequest();
          d.open("GET", a, true);
          d.responseType = "arraybuffer";
          d.onload = () => {
            200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
          };
          d.onerror = c;
          d.send(null);
        };
      var Ga = e.print || console.log.bind(console), Ha = e.printErr || console.warn.bind(console);
      Object.assign(e, va);
      va = null;
      e.thisProgram && (wa = e.thisProgram);
      var Ia;
      e.wasmBinary && (Ia = e.wasmBinary);
      e.noExitRuntime || true;
      "object" != typeof WebAssembly && E("no native wasm support detected");
      var Ja, Ka = false, La = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
      function Ma(a, b, c) {
        var d = b + c;
        for (c = b; a[c] && !(c >= d); )
          ++c;
        if (16 < c - b && a.buffer && La)
          return La.decode(a.subarray(b, c));
        for (d = ""; b < c; ) {
          var f = a[b++];
          if (f & 128) {
            var h = a[b++] & 63;
            if (192 == (f & 224))
              d += String.fromCharCode((f & 31) << 6 | h);
            else {
              var k = a[b++] & 63;
              f = 224 == (f & 240) ? (f & 15) << 12 | h << 6 | k : (f & 7) << 18 | h << 12 | k << 6 | a[b++] & 63;
              65536 > f ? d += String.fromCharCode(f) : (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023));
            }
          } else
            d += String.fromCharCode(f);
        }
        return d;
      }
      function C(a, b) {
        return a ? Ma(u, a, b) : "";
      }
      function t(a, b, c, d) {
        if (!(0 < d))
          return 0;
        var f = c;
        d = c + d - 1;
        for (var h = 0; h < a.length; ++h) {
          var k = a.charCodeAt(h);
          if (55296 <= k && 57343 >= k) {
            var q = a.charCodeAt(++h);
            k = 65536 + ((k & 1023) << 10) | q & 1023;
          }
          if (127 >= k) {
            if (c >= d)
              break;
            b[c++] = k;
          } else {
            if (2047 >= k) {
              if (c + 1 >= d)
                break;
              b[c++] = 192 | k >> 6;
            } else {
              if (65535 >= k) {
                if (c + 2 >= d)
                  break;
                b[c++] = 224 | k >> 12;
              } else {
                if (c + 3 >= d)
                  break;
                b[c++] = 240 | k >> 18;
                b[c++] = 128 | k >> 12 & 63;
              }
              b[c++] = 128 | k >> 6 & 63;
            }
            b[c++] = 128 | k & 63;
          }
        }
        b[c] = 0;
        return c - f;
      }
      function ca(a) {
        for (var b = 0, c = 0; c < a.length; ++c) {
          var d = a.charCodeAt(c);
          127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
        }
        return b;
      }
      var Na, r, u, Oa, F, J, Pa, Qa;
      function Ra() {
        var a = Ja.buffer;
        Na = a;
        e.HEAP8 = r = new Int8Array(a);
        e.HEAP16 = Oa = new Int16Array(a);
        e.HEAP32 = F = new Int32Array(a);
        e.HEAPU8 = u = new Uint8Array(a);
        e.HEAPU16 = new Uint16Array(a);
        e.HEAPU32 = J = new Uint32Array(a);
        e.HEAPF32 = Pa = new Float32Array(a);
        e.HEAPF64 = Qa = new Float64Array(a);
      }
      var K, Sa = [], Ta = [], Ua = [];
      function Va() {
        var a = e.preRun.shift();
        Sa.unshift(a);
      }
      var Wa = 0, Ya = null;
      function E(a) {
        if (e.onAbort)
          e.onAbort(a);
        a = "Aborted(" + a + ")";
        Ha(a);
        Ka = true;
        throw new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
      }
      function Za() {
        return M.startsWith("data:application/octet-stream;base64,");
      }
      var M;
      M = "sql-wasm.wasm";
      if (!Za()) {
        var $a = M;
        M = e.locateFile ? e.locateFile($a, D) : D + $a;
      }
      function ab() {
        var a = M;
        try {
          if (a == M && Ia)
            return new Uint8Array(Ia);
          if (Da)
            return Da(a);
          throw "both async and sync fetching of the wasm failed";
        } catch (b) {
          E(b);
        }
      }
      function bb() {
        if (!Ia && (ya || za)) {
          if ("function" == typeof fetch && !M.startsWith("file://"))
            return fetch(M, { credentials: "same-origin" }).then(function(a) {
              if (!a.ok)
                throw "failed to load wasm binary file at '" + M + "'";
              return a.arrayBuffer();
            }).catch(function() {
              return ab();
            });
          if (Ca)
            return new Promise(function(a, b) {
              Ca(M, function(c) {
                a(new Uint8Array(c));
              }, b);
            });
        }
        return Promise.resolve().then(function() {
          return ab();
        });
      }
      var N, O;
      function cb(a) {
        for (; 0 < a.length; )
          a.shift()(e);
      }
      function l(a, b = "i8") {
        b.endsWith("*") && (b = "*");
        switch (b) {
          case "i1":
            return r[a >> 0];
          case "i8":
            return r[a >> 0];
          case "i16":
            return Oa[a >> 1];
          case "i32":
            return F[a >> 2];
          case "i64":
            return F[a >> 2];
          case "float":
            return Pa[a >> 2];
          case "double":
            return Qa[a >> 3];
          case "*":
            return J[a >> 2];
          default:
            E("invalid type for getValue: " + b);
        }
        return null;
      }
      function pa(a) {
        var b = "i32";
        b.endsWith("*") && (b = "*");
        switch (b) {
          case "i1":
            r[a >> 0] = 0;
            break;
          case "i8":
            r[a >> 0] = 0;
            break;
          case "i16":
            Oa[a >> 1] = 0;
            break;
          case "i32":
            F[a >> 2] = 0;
            break;
          case "i64":
            O = [0, (N = 0, 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
            F[a >> 2] = O[0];
            F[a + 4 >> 2] = O[1];
            break;
          case "float":
            Pa[a >> 2] = 0;
            break;
          case "double":
            Qa[a >> 3] = 0;
            break;
          case "*":
            J[a >> 2] = 0;
            break;
          default:
            E("invalid type for setValue: " + b);
        }
      }
      var db = (a, b) => {
        for (var c = 0, d = a.length - 1; 0 <= d; d--) {
          var f = a[d];
          "." === f ? a.splice(d, 1) : ".." === f ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
        }
        if (b)
          for (; c; c--)
            a.unshift("..");
        return a;
      }, z = (a) => {
        var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
        (a = db(a.split("/").filter((d) => !!d), !b).join("/")) || b || (a = ".");
        a && c && (a += "/");
        return (b ? "/" : "") + a;
      }, eb = (a) => {
        var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
        a = b[0];
        b = b[1];
        if (!a && !b)
          return ".";
        b && (b = b.substr(0, b.length - 1));
        return a + b;
      }, fb = (a) => {
        if ("/" === a)
          return "/";
        a = z(a);
        a = a.replace(/\/$/, "");
        var b = a.lastIndexOf("/");
        return -1 === b ? a : a.substr(b + 1);
      };
      function gb() {
        if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
          var a = new Uint8Array(1);
          return () => {
            crypto.getRandomValues(a);
            return a[0];
          };
        }
        if (Aa)
          try {
            var b = require$$2;
            return () => b.randomBytes(1)[0];
          } catch (c) {
          }
        return () => E("randomDevice");
      }
      function hb() {
        for (var a = "", b = false, c = arguments.length - 1; -1 <= c && !b; c--) {
          b = 0 <= c ? arguments[c] : "/";
          if ("string" != typeof b)
            throw new TypeError("Arguments to path.resolve must be strings");
          if (!b)
            return "";
          a = b + "/" + a;
          b = "/" === b.charAt(0);
        }
        a = db(a.split("/").filter((d) => !!d), !b).join("/");
        return (b ? "/" : "") + a || ".";
      }
      function ma(a, b) {
        var c = Array(ca(a) + 1);
        a = t(a, c, 0, c.length);
        b && (c.length = a);
        return c;
      }
      var ib = [];
      function jb(a, b) {
        ib[a] = { input: [], output: [], Xa: b };
        lb(a, mb);
      }
      var mb = { open: function(a) {
        var b = ib[a.node.rdev];
        if (!b)
          throw new P(43);
        a.tty = b;
        a.seekable = false;
      }, close: function(a) {
        a.tty.Xa.fsync(a.tty);
      }, fsync: function(a) {
        a.tty.Xa.fsync(a.tty);
      }, read: function(a, b, c, d) {
        if (!a.tty || !a.tty.Xa.tb)
          throw new P(60);
        for (var f = 0, h = 0; h < d; h++) {
          try {
            var k = a.tty.Xa.tb(a.tty);
          } catch (q) {
            throw new P(29);
          }
          if (void 0 === k && 0 === f)
            throw new P(6);
          if (null === k || void 0 === k)
            break;
          f++;
          b[c + h] = k;
        }
        f && (a.node.timestamp = Date.now());
        return f;
      }, write: function(a, b, c, d) {
        if (!a.tty || !a.tty.Xa.jb)
          throw new P(60);
        try {
          for (var f = 0; f < d; f++)
            a.tty.Xa.jb(a.tty, b[c + f]);
        } catch (h) {
          throw new P(29);
        }
        d && (a.node.timestamp = Date.now());
        return f;
      } }, tb = { tb: function(a) {
        if (!a.input.length) {
          var b = null;
          if (Aa) {
            var c = Buffer.alloc(256), d = 0;
            try {
              d = fs.readSync(process.stdin.fd, c, 0, 256, -1);
            } catch (f) {
              if (f.toString().includes("EOF"))
                d = 0;
              else
                throw f;
            }
            0 < d ? b = c.slice(0, d).toString("utf-8") : b = null;
          } else
            "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "), null !== b && (b += "\n")) : "function" == typeof readline && (b = readline(), null !== b && (b += "\n"));
          if (!b)
            return null;
          a.input = ma(b, true);
        }
        return a.input.shift();
      }, jb: function(a, b) {
        null === b || 10 === b ? (Ga(Ma(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
      }, fsync: function(a) {
        a.output && 0 < a.output.length && (Ga(Ma(a.output, 0)), a.output = []);
      } }, ub = { jb: function(a, b) {
        null === b || 10 === b ? (Ha(Ma(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
      }, fsync: function(a) {
        a.output && 0 < a.output.length && (Ha(Ma(a.output, 0)), a.output = []);
      } }, Q = { Qa: null, Ra: function() {
        return Q.createNode(
          null,
          "/",
          16895,
          0
        );
      }, createNode: function(a, b, c, d) {
        if (24576 === (c & 61440) || 4096 === (c & 61440))
          throw new P(63);
        Q.Qa || (Q.Qa = { dir: { node: { Pa: Q.Ga.Pa, Oa: Q.Ga.Oa, lookup: Q.Ga.lookup, ab: Q.Ga.ab, rename: Q.Ga.rename, unlink: Q.Ga.unlink, rmdir: Q.Ga.rmdir, readdir: Q.Ga.readdir, symlink: Q.Ga.symlink }, stream: { Ta: Q.Ha.Ta } }, file: { node: { Pa: Q.Ga.Pa, Oa: Q.Ga.Oa }, stream: { Ta: Q.Ha.Ta, read: Q.Ha.read, write: Q.Ha.write, lb: Q.Ha.lb, bb: Q.Ha.bb, cb: Q.Ha.cb } }, link: { node: { Pa: Q.Ga.Pa, Oa: Q.Ga.Oa, readlink: Q.Ga.readlink }, stream: {} }, pb: {
          node: { Pa: Q.Ga.Pa, Oa: Q.Ga.Oa },
          stream: vb
        } });
        c = wb(a, b, c, d);
        16384 === (c.mode & 61440) ? (c.Ga = Q.Qa.dir.node, c.Ha = Q.Qa.dir.stream, c.Ia = {}) : 32768 === (c.mode & 61440) ? (c.Ga = Q.Qa.file.node, c.Ha = Q.Qa.file.stream, c.Ma = 0, c.Ia = null) : 40960 === (c.mode & 61440) ? (c.Ga = Q.Qa.link.node, c.Ha = Q.Qa.link.stream) : 8192 === (c.mode & 61440) && (c.Ga = Q.Qa.pb.node, c.Ha = Q.Qa.pb.stream);
        c.timestamp = Date.now();
        a && (a.Ia[b] = c, a.timestamp = c.timestamp);
        return c;
      }, Jb: function(a) {
        return a.Ia ? a.Ia.subarray ? a.Ia.subarray(0, a.Ma) : new Uint8Array(a.Ia) : new Uint8Array(0);
      }, qb: function(a, b) {
        var c = a.Ia ? a.Ia.length : 0;
        c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.Ia, a.Ia = new Uint8Array(b), 0 < a.Ma && a.Ia.set(c.subarray(0, a.Ma), 0));
      }, Gb: function(a, b) {
        if (a.Ma != b)
          if (0 == b)
            a.Ia = null, a.Ma = 0;
          else {
            var c = a.Ia;
            a.Ia = new Uint8Array(b);
            c && a.Ia.set(c.subarray(0, Math.min(b, a.Ma)));
            a.Ma = b;
          }
      }, Ga: { Pa: function(a) {
        var b = {};
        b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
        b.ino = a.id;
        b.mode = a.mode;
        b.nlink = 1;
        b.uid = 0;
        b.gid = 0;
        b.rdev = a.rdev;
        16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.Ma : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
        b.atime = new Date(a.timestamp);
        b.mtime = new Date(a.timestamp);
        b.ctime = new Date(a.timestamp);
        b.Ab = 4096;
        b.blocks = Math.ceil(b.size / b.Ab);
        return b;
      }, Oa: function(a, b) {
        void 0 !== b.mode && (a.mode = b.mode);
        void 0 !== b.timestamp && (a.timestamp = b.timestamp);
        void 0 !== b.size && Q.Gb(a, b.size);
      }, lookup: function() {
        throw xb[44];
      }, ab: function(a, b, c, d) {
        return Q.createNode(a, b, c, d);
      }, rename: function(a, b, c) {
        if (16384 === (a.mode & 61440)) {
          try {
            var d = yb(b, c);
          } catch (h) {
          }
          if (d)
            for (var f in d.Ia)
              throw new P(55);
        }
        delete a.parent.Ia[a.name];
        a.parent.timestamp = Date.now();
        a.name = c;
        b.Ia[c] = a;
        b.timestamp = a.parent.timestamp;
        a.parent = b;
      }, unlink: function(a, b) {
        delete a.Ia[b];
        a.timestamp = Date.now();
      }, rmdir: function(a, b) {
        var c = yb(a, b), d;
        for (d in c.Ia)
          throw new P(55);
        delete a.Ia[b];
        a.timestamp = Date.now();
      }, readdir: function(a) {
        var b = [".", ".."], c;
        for (c in a.Ia)
          a.Ia.hasOwnProperty(c) && b.push(c);
        return b;
      }, symlink: function(a, b, c) {
        a = Q.createNode(a, b, 41471, 0);
        a.link = c;
        return a;
      }, readlink: function(a) {
        if (40960 !== (a.mode & 61440))
          throw new P(28);
        return a.link;
      } }, Ha: { read: function(a, b, c, d, f) {
        var h = a.node.Ia;
        if (f >= a.node.Ma)
          return 0;
        a = Math.min(a.node.Ma - f, d);
        if (8 < a && h.subarray)
          b.set(h.subarray(f, f + a), c);
        else
          for (d = 0; d < a; d++)
            b[c + d] = h[f + d];
        return a;
      }, write: function(a, b, c, d, f, h) {
        b.buffer === r.buffer && (h = false);
        if (!d)
          return 0;
        a = a.node;
        a.timestamp = Date.now();
        if (b.subarray && (!a.Ia || a.Ia.subarray)) {
          if (h)
            return a.Ia = b.subarray(c, c + d), a.Ma = d;
          if (0 === a.Ma && 0 === f)
            return a.Ia = b.slice(c, c + d), a.Ma = d;
          if (f + d <= a.Ma)
            return a.Ia.set(b.subarray(c, c + d), f), d;
        }
        Q.qb(a, f + d);
        if (a.Ia.subarray && b.subarray)
          a.Ia.set(b.subarray(c, c + d), f);
        else
          for (h = 0; h < d; h++)
            a.Ia[f + h] = b[c + h];
        a.Ma = Math.max(a.Ma, f + d);
        return d;
      }, Ta: function(a, b, c) {
        1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.Ma);
        if (0 > b)
          throw new P(28);
        return b;
      }, lb: function(a, b, c) {
        Q.qb(a.node, b + c);
        a.node.Ma = Math.max(a.node.Ma, b + c);
      }, bb: function(a, b, c, d, f) {
        if (32768 !== (a.node.mode & 61440))
          throw new P(43);
        a = a.node.Ia;
        if (f & 2 || a.buffer !== Na) {
          if (0 < c || c + b < a.length)
            a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(
              a,
              c,
              c + b
            );
          c = true;
          b = 65536 * Math.ceil(b / 65536);
          (f = zb(65536, b)) ? (u.fill(0, f, f + b), b = f) : b = 0;
          if (!b)
            throw new P(48);
          r.set(a, b);
        } else
          c = false, b = a.byteOffset;
        return { Fb: b, vb: c };
      }, cb: function(a, b, c, d, f) {
        if (32768 !== (a.node.mode & 61440))
          throw new P(43);
        if (f & 2)
          return 0;
        Q.Ha.write(a, b, 0, d, c, false);
        return 0;
      } } }, Ab = null, Bb = {}, R = [], Cb = 1, T = null, Db = true, P = null, xb = {}, U = (a, b = {}) => {
        a = hb("/", a);
        if (!a)
          return { path: "", node: null };
        b = Object.assign({ rb: true, kb: 0 }, b);
        if (8 < b.kb)
          throw new P(32);
        a = db(a.split("/").filter((k) => !!k), false);
        for (var c = Ab, d = "/", f = 0; f < a.length; f++) {
          var h = f === a.length - 1;
          if (h && b.parent)
            break;
          c = yb(c, a[f]);
          d = z(d + "/" + a[f]);
          c.Va && (!h || h && b.rb) && (c = c.Va.root);
          if (!h || b.Sa) {
            for (h = 0; 40960 === (c.mode & 61440); )
              if (c = Eb(d), d = hb(eb(d), c), c = U(d, { kb: b.kb + 1 }).node, 40 < h++)
                throw new P(32);
          }
        }
        return { path: d, node: c };
      }, ea = (a) => {
        for (var b; ; ) {
          if (a === a.parent)
            return a = a.Ra.ub, b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
          b = b ? a.name + "/" + b : a.name;
          a = a.parent;
        }
      }, Fb = (a, b) => {
        for (var c = 0, d = 0; d < b.length; d++)
          c = (c << 5) - c + b.charCodeAt(d) | 0;
        return (a + c >>> 0) % T.length;
      }, Gb = (a) => {
        var b = Fb(a.parent.id, a.name);
        if (T[b] === a)
          T[b] = a.Wa;
        else
          for (b = T[b]; b; ) {
            if (b.Wa === a) {
              b.Wa = a.Wa;
              break;
            }
            b = b.Wa;
          }
      }, yb = (a, b) => {
        var c;
        if (c = (c = Hb(a, "x")) ? c : a.Ga.lookup ? 0 : 2)
          throw new P(c, a);
        for (c = T[Fb(a.id, b)]; c; c = c.Wa) {
          var d = c.name;
          if (c.parent.id === a.id && d === b)
            return c;
        }
        return a.Ga.lookup(a, b);
      }, wb = (a, b, c, d) => {
        a = new Ib(a, b, c, d);
        b = Fb(a.parent.id, a.name);
        a.Wa = T[b];
        return T[b] = a;
      }, Jb = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }, Kb = (a) => {
        var b = ["r", "w", "rw"][a & 3];
        a & 512 && (b += "w");
        return b;
      }, Hb = (a, b) => {
        if (Db)
          return 0;
        if (!b.includes("r") || a.mode & 292) {
          if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73))
            return 2;
        } else
          return 2;
        return 0;
      }, Lb = (a, b) => {
        try {
          return yb(a, b), 20;
        } catch (c) {
        }
        return Hb(a, "wx");
      }, Mb = (a, b, c) => {
        try {
          var d = yb(a, b);
        } catch (f) {
          return f.Ka;
        }
        if (a = Hb(a, "wx"))
          return a;
        if (c) {
          if (16384 !== (d.mode & 61440))
            return 54;
          if (d === d.parent || "/" === ea(d))
            return 10;
        } else if (16384 === (d.mode & 61440))
          return 31;
        return 0;
      }, Nb = (a = 0) => {
        for (; 4096 >= a; a++)
          if (!R[a])
            return a;
        throw new P(33);
      }, Pb = (a, b) => {
        Ob || (Ob = function() {
          this.$a = {};
        }, Ob.prototype = {}, Object.defineProperties(Ob.prototype, { object: { get: function() {
          return this.node;
        }, set: function(c) {
          this.node = c;
        } }, flags: { get: function() {
          return this.$a.flags;
        }, set: function(c) {
          this.$a.flags = c;
        } }, position: { get: function() {
          return this.$a.position;
        }, set: function(c) {
          this.$a.position = c;
        } } }));
        a = Object.assign(new Ob(), a);
        b = Nb(b);
        a.fd = b;
        return R[b] = a;
      }, vb = { open: (a) => {
        a.Ha = Bb[a.node.rdev].Ha;
        a.Ha.open && a.Ha.open(a);
      }, Ta: () => {
        throw new P(70);
      } }, lb = (a, b) => {
        Bb[a] = { Ha: b };
      }, Qb = (a, b) => {
        var c = "/" === b, d = !b;
        if (c && Ab)
          throw new P(10);
        if (!c && !d) {
          var f = U(b, { rb: false });
          b = f.path;
          f = f.node;
          if (f.Va)
            throw new P(10);
          if (16384 !== (f.mode & 61440))
            throw new P(54);
        }
        b = { type: a, Kb: {}, ub: b, Eb: [] };
        a = a.Ra(b);
        a.Ra = b;
        b.root = a;
        c ? Ab = a : f && (f.Va = b, f.Ra && f.Ra.Eb.push(b));
      }, ha = (a, b, c) => {
        var d = U(a, { parent: true }).node;
        a = fb(a);
        if (!a || "." === a || ".." === a)
          throw new P(28);
        var f = Lb(d, a);
        if (f)
          throw new P(f);
        if (!d.Ga.ab)
          throw new P(63);
        return d.Ga.ab(d, a, b, c);
      }, V = (a, b) => ha(a, (void 0 !== b ? b : 511) & 1023 | 16384, 0), Rb = (a, b, c) => {
        "undefined" == typeof c && (c = b, b = 438);
        ha(a, b | 8192, c);
      }, Sb = (a, b) => {
        if (!hb(a))
          throw new P(44);
        var c = U(b, { parent: true }).node;
        if (!c)
          throw new P(44);
        b = fb(b);
        var d = Lb(c, b);
        if (d)
          throw new P(d);
        if (!c.Ga.symlink)
          throw new P(63);
        c.Ga.symlink(c, b, a);
      }, Tb = (a) => {
        var b = U(a, { parent: true }).node;
        a = fb(a);
        var c = yb(b, a), d = Mb(b, a, true);
        if (d)
          throw new P(d);
        if (!b.Ga.rmdir)
          throw new P(63);
        if (c.Va)
          throw new P(10);
        b.Ga.rmdir(b, a);
        Gb(c);
      }, ta = (a) => {
        var b = U(a, { parent: true }).node;
        if (!b)
          throw new P(44);
        a = fb(a);
        var c = yb(b, a), d = Mb(b, a, false);
        if (d)
          throw new P(d);
        if (!b.Ga.unlink)
          throw new P(63);
        if (c.Va)
          throw new P(10);
        b.Ga.unlink(b, a);
        Gb(c);
      }, Eb = (a) => {
        a = U(a).node;
        if (!a)
          throw new P(44);
        if (!a.Ga.readlink)
          throw new P(28);
        return hb(ea(a.parent), a.Ga.readlink(a));
      }, Ub = (a, b) => {
        a = U(a, { Sa: !b }).node;
        if (!a)
          throw new P(44);
        if (!a.Ga.Pa)
          throw new P(63);
        return a.Ga.Pa(a);
      }, Vb = (a) => Ub(a, true), ia = (a, b) => {
        a = "string" == typeof a ? U(a, { Sa: true }).node : a;
        if (!a.Ga.Oa)
          throw new P(63);
        a.Ga.Oa(a, { mode: b & 4095 | a.mode & -4096, timestamp: Date.now() });
      }, Wb = (a, b) => {
        if (0 > b)
          throw new P(28);
        a = "string" == typeof a ? U(a, { Sa: true }).node : a;
        if (!a.Ga.Oa)
          throw new P(63);
        if (16384 === (a.mode & 61440))
          throw new P(31);
        if (32768 !== (a.mode & 61440))
          throw new P(28);
        var c = Hb(a, "w");
        if (c)
          throw new P(c);
        a.Ga.Oa(a, { size: b, timestamp: Date.now() });
      }, ja = (a, b, c) => {
        if ("" === a)
          throw new P(44);
        if ("string" == typeof b) {
          var d = Jb[b];
          if ("undefined" == typeof d)
            throw Error("Unknown file open mode: " + b);
          b = d;
        }
        c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
        if ("object" == typeof a)
          var f = a;
        else {
          a = z(a);
          try {
            f = U(a, { Sa: !(b & 131072) }).node;
          } catch (h) {
          }
        }
        d = false;
        if (b & 64)
          if (f) {
            if (b & 128)
              throw new P(20);
          } else
            f = ha(a, c, 0), d = true;
        if (!f)
          throw new P(44);
        8192 === (f.mode & 61440) && (b &= -513);
        if (b & 65536 && 16384 !== (f.mode & 61440))
          throw new P(54);
        if (!d && (c = f ? 40960 === (f.mode & 61440) ? 32 : 16384 === (f.mode & 61440) && ("r" !== Kb(b) || b & 512) ? 31 : Hb(f, Kb(b)) : 44))
          throw new P(c);
        b & 512 && !d && Wb(f, 0);
        b &= -131713;
        f = Pb({ node: f, path: ea(f), flags: b, seekable: true, position: 0, Ha: f.Ha, Ib: [], error: false });
        f.Ha.open && f.Ha.open(f);
        !e.logReadFiles || b & 1 || (Xb || (Xb = {}), a in Xb || (Xb[a] = 1));
        return f;
      }, la = (a) => {
        if (null === a.fd)
          throw new P(8);
        a.hb && (a.hb = null);
        try {
          a.Ha.close && a.Ha.close(a);
        } catch (b) {
          throw b;
        } finally {
          R[a.fd] = null;
        }
        a.fd = null;
      }, Yb = (a, b, c) => {
        if (null === a.fd)
          throw new P(8);
        if (!a.seekable || !a.Ha.Ta)
          throw new P(70);
        if (0 != c && 1 != c && 2 != c)
          throw new P(28);
        a.position = a.Ha.Ta(a, b, c);
        a.Ib = [];
      }, Zb = (a, b, c, d, f) => {
        if (0 > d || 0 > f)
          throw new P(28);
        if (null === a.fd)
          throw new P(8);
        if (1 === (a.flags & 2097155))
          throw new P(8);
        if (16384 === (a.node.mode & 61440))
          throw new P(31);
        if (!a.Ha.read)
          throw new P(28);
        var h = "undefined" != typeof f;
        if (!h)
          f = a.position;
        else if (!a.seekable)
          throw new P(70);
        b = a.Ha.read(a, b, c, d, f);
        h || (a.position += b);
        return b;
      }, ka = (a, b, c, d, f) => {
        if (0 > d || 0 > f)
          throw new P(28);
        if (null === a.fd)
          throw new P(8);
        if (0 === (a.flags & 2097155))
          throw new P(8);
        if (16384 === (a.node.mode & 61440))
          throw new P(31);
        if (!a.Ha.write)
          throw new P(28);
        a.seekable && a.flags & 1024 && Yb(a, 0, 2);
        var h = "undefined" != typeof f;
        if (!h)
          f = a.position;
        else if (!a.seekable)
          throw new P(70);
        b = a.Ha.write(a, b, c, d, f, void 0);
        h || (a.position += b);
        return b;
      }, sa = (a) => {
        var c;
        var d = ja(a, d || 0);
        a = Ub(a).size;
        var f = new Uint8Array(a);
        Zb(d, f, 0, a, 0);
        c = f;
        la(d);
        return c;
      }, $b = () => {
        P || (P = function(a, b) {
          this.node = b;
          this.Hb = function(c) {
            this.Ka = c;
          };
          this.Hb(a);
          this.message = "FS error";
        }, P.prototype = Error(), P.prototype.constructor = P, [44].forEach((a) => {
          xb[a] = new P(a);
          xb[a].stack = "<generic error, no stack>";
        }));
      }, ac, fa = (a, b) => {
        var c = 0;
        a && (c |= 365);
        b && (c |= 146);
        return c;
      }, cc = (a, b, c) => {
        a = z("/dev/" + a);
        var d = fa(!!b, !!c);
        bc || (bc = 64);
        var f = bc++ << 8 | 0;
        lb(f, { open: (h) => {
          h.seekable = false;
        }, close: () => {
          c && c.buffer && c.buffer.length && c(10);
        }, read: (h, k, q, x) => {
          for (var w = 0, A = 0; A < x; A++) {
            try {
              var S = b();
            } catch (nb) {
              throw new P(29);
            }
            if (void 0 === S && 0 === w)
              throw new P(6);
            if (null === S || void 0 === S)
              break;
            w++;
            k[q + A] = S;
          }
          w && (h.node.timestamp = Date.now());
          return w;
        }, write: (h, k, q, x) => {
          for (var w = 0; w < x; w++)
            try {
              c(k[q + w]);
            } catch (A) {
              throw new P(29);
            }
          x && (h.node.timestamp = Date.now());
          return w;
        } });
        Rb(a, d, f);
      }, bc, W = {}, Ob, Xb;
      function dc(a, b, c) {
        if ("/" === b.charAt(0))
          return b;
        a = -100 === a ? "/" : X(a).path;
        if (0 == b.length) {
          if (!c)
            throw new P(44);
          return a;
        }
        return z(a + "/" + b);
      }
      function ec(a, b, c) {
        try {
          var d = a(b);
        } catch (f) {
          if (f && f.node && z(b) !== z(ea(f.node)))
            return -54;
          throw f;
        }
        F[c >> 2] = d.dev;
        F[c + 8 >> 2] = d.ino;
        F[c + 12 >> 2] = d.mode;
        J[c + 16 >> 2] = d.nlink;
        F[c + 20 >> 2] = d.uid;
        F[c + 24 >> 2] = d.gid;
        F[c + 28 >> 2] = d.rdev;
        O = [d.size >>> 0, (N = d.size, 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
        F[c + 40 >> 2] = O[0];
        F[c + 44 >> 2] = O[1];
        F[c + 48 >> 2] = 4096;
        F[c + 52 >> 2] = d.blocks;
        O = [Math.floor(d.atime.getTime() / 1e3) >>> 0, (N = Math.floor(d.atime.getTime() / 1e3), 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
        F[c + 56 >> 2] = O[0];
        F[c + 60 >> 2] = O[1];
        J[c + 64 >> 2] = 0;
        O = [Math.floor(d.mtime.getTime() / 1e3) >>> 0, (N = Math.floor(d.mtime.getTime() / 1e3), 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
        F[c + 72 >> 2] = O[0];
        F[c + 76 >> 2] = O[1];
        J[c + 80 >> 2] = 0;
        O = [Math.floor(d.ctime.getTime() / 1e3) >>> 0, (N = Math.floor(d.ctime.getTime() / 1e3), 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
        F[c + 88 >> 2] = O[0];
        F[c + 92 >> 2] = O[1];
        J[c + 96 >> 2] = 0;
        O = [d.ino >>> 0, (N = d.ino, 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
        F[c + 104 >> 2] = O[0];
        F[c + 108 >> 2] = O[1];
        return 0;
      }
      var fc = void 0;
      function Hc() {
        fc += 4;
        return F[fc - 4 >> 2];
      }
      function X(a) {
        a = R[a];
        if (!a)
          throw new P(8);
        return a;
      }
      function Jc(a) {
        return J[a >> 2] + 4294967296 * F[a + 4 >> 2];
      }
      function Kc(a) {
        var b = ca(a) + 1, c = da(b);
        c && t(a, r, c, b);
        return c;
      }
      function Lc(a, b, c) {
        function d(x) {
          return (x = x.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? x[1] : "GMT";
        }
        var f = (/* @__PURE__ */ new Date()).getFullYear(), h = new Date(f, 0, 1), k = new Date(f, 6, 1);
        f = h.getTimezoneOffset();
        var q = k.getTimezoneOffset();
        F[a >> 2] = 60 * Math.max(f, q);
        F[b >> 2] = Number(f != q);
        a = d(h);
        b = d(k);
        a = Kc(a);
        b = Kc(b);
        q < f ? (J[c >> 2] = a, J[c + 4 >> 2] = b) : (J[c >> 2] = b, J[c + 4 >> 2] = a);
      }
      function Mc(a, b, c) {
        Mc.Bb || (Mc.Bb = true, Lc(a, b, c));
      }
      var Nc;
      Nc = Aa ? () => {
        var a = process.hrtime();
        return 1e3 * a[0] + a[1] / 1e6;
      } : () => performance.now();
      var Oc = {};
      function Pc() {
        if (!Qc) {
          var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: wa || "./this.program" }, b;
          for (b in Oc)
            void 0 === Oc[b] ? delete a[b] : a[b] = Oc[b];
          var c = [];
          for (b in a)
            c.push(b + "=" + a[b]);
          Qc = c;
        }
        return Qc;
      }
      var Qc, Y = void 0, Rc = [];
      function ua(a, b) {
        if (!Y) {
          Y = /* @__PURE__ */ new WeakMap();
          var c = K.length;
          if (Y)
            for (var d = 0; d < 0 + c; d++) {
              var f = K.get(d);
              f && Y.set(f, d);
            }
        }
        if (Y.has(a))
          return Y.get(a);
        if (Rc.length)
          c = Rc.pop();
        else {
          try {
            K.grow(1);
          } catch (q) {
            if (!(q instanceof RangeError))
              throw q;
            throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
          }
          c = K.length - 1;
        }
        try {
          K.set(c, a);
        } catch (q) {
          if (!(q instanceof TypeError))
            throw q;
          if ("function" == typeof WebAssembly.Function) {
            d = WebAssembly.Function;
            f = { i: "i32", j: "i64", f: "f32", d: "f64", p: "i32" };
            for (var h = { parameters: [], results: "v" == b[0] ? [] : [f[b[0]]] }, k = 1; k < b.length; ++k)
              h.parameters.push(f[b[k]]);
            b = new d(h, a);
          } else {
            d = [1, 96];
            f = b.slice(0, 1);
            b = b.slice(1);
            h = { i: 127, p: 127, j: 126, f: 125, d: 124 };
            k = b.length;
            128 > k ? d.push(k) : d.push(k % 128 | 128, k >> 7);
            for (k = 0; k < b.length; ++k)
              d.push(h[b[k]]);
            "v" == f ? d.push(0) : d.push(1, h[f]);
            b = [0, 97, 115, 109, 1, 0, 0, 0, 1];
            f = d.length;
            128 > f ? b.push(f) : b.push(f % 128 | 128, f >> 7);
            b.push.apply(b, d);
            b.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
            b = new WebAssembly.Module(new Uint8Array(b));
            b = new WebAssembly.Instance(b, { e: { f: a } }).exports.f;
          }
          K.set(
            c,
            b
          );
        }
        Y.set(a, c);
        return c;
      }
      function ra(a) {
        Y.delete(K.get(a));
        Rc.push(a);
      }
      function aa(a) {
        var b = da(a.length);
        a.subarray || a.slice || (a = new Uint8Array(a));
        u.set(a, b);
        return b;
      }
      function Uc(a, b, c, d) {
        var f = { string: (w) => {
          var A = 0;
          if (null !== w && void 0 !== w && 0 !== w) {
            var S = (w.length << 2) + 1;
            A = B(S);
            t(w, u, A, S);
          }
          return A;
        }, array: (w) => {
          var A = B(w.length);
          r.set(w, A);
          return A;
        } };
        a = e["_" + a];
        var h = [], k = 0;
        if (d)
          for (var q = 0; q < d.length; q++) {
            var x = f[c[q]];
            x ? (0 === k && (k = oa()), h[q] = x(d[q])) : h[q] = d[q];
          }
        c = a.apply(null, h);
        return c = function(w) {
          0 !== k && qa(k);
          return "string" === b ? C(w) : "boolean" === b ? !!w : w;
        }(c);
      }
      function Ib(a, b, c, d) {
        a || (a = this);
        this.parent = a;
        this.Ra = a.Ra;
        this.Va = null;
        this.id = Cb++;
        this.name = b;
        this.mode = c;
        this.Ga = {};
        this.Ha = {};
        this.rdev = d;
      }
      Object.defineProperties(Ib.prototype, { read: { get: function() {
        return 365 === (this.mode & 365);
      }, set: function(a) {
        a ? this.mode |= 365 : this.mode &= -366;
      } }, write: { get: function() {
        return 146 === (this.mode & 146);
      }, set: function(a) {
        a ? this.mode |= 146 : this.mode &= -147;
      } } });
      $b();
      T = Array(4096);
      Qb(Q, "/");
      V("/tmp");
      V("/home");
      V("/home/web_user");
      (() => {
        V("/dev");
        lb(259, { read: () => 0, write: (b, c, d, f) => f });
        Rb("/dev/null", 259);
        jb(1280, tb);
        jb(1536, ub);
        Rb("/dev/tty", 1280);
        Rb("/dev/tty1", 1536);
        var a = gb();
        cc("random", a);
        cc("urandom", a);
        V("/dev/shm");
        V("/dev/shm/tmp");
      })();
      (() => {
        V("/proc");
        var a = V("/proc/self");
        V("/proc/self/fd");
        Qb({ Ra: () => {
          var b = wb(a, "fd", 16895, 73);
          b.Ga = { lookup: (c, d) => {
            var f = R[+d];
            if (!f)
              throw new P(8);
            c = { parent: null, Ra: { ub: "fake" }, Ga: { readlink: () => f.path } };
            return c.parent = c;
          } };
          return b;
        } }, "/proc/self/fd");
      })();
      var Wc = { a: function(a, b, c, d) {
        E("Assertion failed: " + C(a) + ", at: " + [b ? C(b) : "unknown filename", c, d ? C(d) : "unknown function"]);
      }, h: function(a, b) {
        try {
          return a = C(a), ia(a, b), 0;
        } catch (c) {
          if ("undefined" == typeof W || !(c instanceof P))
            throw c;
          return -c.Ka;
        }
      }, H: function(a, b, c) {
        try {
          b = C(b);
          b = dc(a, b);
          if (c & -8)
            return -28;
          var d = U(b, { Sa: true }).node;
          if (!d)
            return -44;
          a = "";
          c & 4 && (a += "r");
          c & 2 && (a += "w");
          c & 1 && (a += "x");
          return a && Hb(d, a) ? -2 : 0;
        } catch (f) {
          if ("undefined" == typeof W || !(f instanceof P))
            throw f;
          return -f.Ka;
        }
      }, i: function(a, b) {
        try {
          var c = R[a];
          if (!c)
            throw new P(8);
          ia(c.node, b);
          return 0;
        } catch (d) {
          if ("undefined" == typeof W || !(d instanceof P))
            throw d;
          return -d.Ka;
        }
      }, g: function(a) {
        try {
          var b = R[a];
          if (!b)
            throw new P(8);
          var c = b.node;
          var d = "string" == typeof c ? U(c, { Sa: true }).node : c;
          if (!d.Ga.Oa)
            throw new P(63);
          d.Ga.Oa(d, { timestamp: Date.now() });
          return 0;
        } catch (f) {
          if ("undefined" == typeof W || !(f instanceof P))
            throw f;
          return -f.Ka;
        }
      }, b: function(a, b, c) {
        fc = c;
        try {
          var d = X(a);
          switch (b) {
            case 0:
              var f = Hc();
              return 0 > f ? -28 : Pb(d, f).fd;
            case 1:
            case 2:
              return 0;
            case 3:
              return d.flags;
            case 4:
              return f = Hc(), d.flags |= f, 0;
            case 5:
              return f = Hc(), Oa[f + 0 >> 1] = 2, 0;
            case 6:
            case 7:
              return 0;
            case 16:
            case 8:
              return -28;
            case 9:
              return F[Vc() >> 2] = 28, -1;
            default:
              return -28;
          }
        } catch (h) {
          if ("undefined" == typeof W || !(h instanceof P))
            throw h;
          return -h.Ka;
        }
      }, G: function(a, b) {
        try {
          var c = X(a);
          return ec(Ub, c.path, b);
        } catch (d) {
          if ("undefined" == typeof W || !(d instanceof P))
            throw d;
          return -d.Ka;
        }
      }, l: function(a, b, c) {
        try {
          b = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
          if (isNaN(b))
            return -61;
          var d = R[a];
          if (!d)
            throw new P(8);
          if (0 === (d.flags & 2097155))
            throw new P(28);
          Wb(d.node, b);
          return 0;
        } catch (f) {
          if ("undefined" == typeof W || !(f instanceof P))
            throw f;
          return -f.Ka;
        }
      }, B: function(a, b) {
        try {
          if (0 === b)
            return -28;
          var c = ca("/") + 1;
          if (b < c)
            return -68;
          t("/", u, a, b);
          return c;
        } catch (d) {
          if ("undefined" == typeof W || !(d instanceof P))
            throw d;
          return -d.Ka;
        }
      }, E: function(a, b) {
        try {
          return a = C(a), ec(Vb, a, b);
        } catch (c) {
          if ("undefined" == typeof W || !(c instanceof P))
            throw c;
          return -c.Ka;
        }
      }, y: function(a, b, c) {
        try {
          return b = C(b), b = dc(a, b), b = z(b), "/" === b[b.length - 1] && (b = b.substr(0, b.length - 1)), V(b, c), 0;
        } catch (d) {
          if ("undefined" == typeof W || !(d instanceof P))
            throw d;
          return -d.Ka;
        }
      }, D: function(a, b, c, d) {
        try {
          b = C(b);
          var f = d & 256;
          b = dc(a, b, d & 4096);
          return ec(f ? Vb : Ub, b, c);
        } catch (h) {
          if ("undefined" == typeof W || !(h instanceof P))
            throw h;
          return -h.Ka;
        }
      }, v: function(a, b, c, d) {
        fc = d;
        try {
          b = C(b);
          b = dc(a, b);
          var f = d ? Hc() : 0;
          return ja(b, c, f).fd;
        } catch (h) {
          if ("undefined" == typeof W || !(h instanceof P))
            throw h;
          return -h.Ka;
        }
      }, t: function(a, b, c, d) {
        try {
          b = C(b);
          b = dc(a, b);
          if (0 >= d)
            return -28;
          var f = Eb(b), h = Math.min(
            d,
            ca(f)
          ), k = r[c + h];
          t(f, u, c, d + 1);
          r[c + h] = k;
          return h;
        } catch (q) {
          if ("undefined" == typeof W || !(q instanceof P))
            throw q;
          return -q.Ka;
        }
      }, s: function(a) {
        try {
          return a = C(a), Tb(a), 0;
        } catch (b) {
          if ("undefined" == typeof W || !(b instanceof P))
            throw b;
          return -b.Ka;
        }
      }, F: function(a, b) {
        try {
          return a = C(a), ec(Ub, a, b);
        } catch (c) {
          if ("undefined" == typeof W || !(c instanceof P))
            throw c;
          return -c.Ka;
        }
      }, p: function(a, b, c) {
        try {
          return b = C(b), b = dc(a, b), 0 === c ? ta(b) : 512 === c ? Tb(b) : E("Invalid flags passed to unlinkat"), 0;
        } catch (d) {
          if ("undefined" == typeof W || !(d instanceof P))
            throw d;
          return -d.Ka;
        }
      }, o: function(a, b, c) {
        try {
          b = C(b);
          b = dc(a, b, true);
          if (c) {
            var d = Jc(c), f = F[c + 8 >> 2];
            h = 1e3 * d + f / 1e6;
            c += 16;
            d = Jc(c);
            f = F[c + 8 >> 2];
            k = 1e3 * d + f / 1e6;
          } else
            var h = Date.now(), k = h;
          a = h;
          var q = U(b, { Sa: true }).node;
          q.Ga.Oa(q, { timestamp: Math.max(a, k) });
          return 0;
        } catch (x) {
          if ("undefined" == typeof W || !(x instanceof P))
            throw x;
          return -x.Ka;
        }
      }, e: function() {
        return Date.now();
      }, j: function(a, b) {
        a = new Date(1e3 * Jc(a));
        F[b >> 2] = a.getSeconds();
        F[b + 4 >> 2] = a.getMinutes();
        F[b + 8 >> 2] = a.getHours();
        F[b + 12 >> 2] = a.getDate();
        F[b + 16 >> 2] = a.getMonth();
        F[b + 20 >> 2] = a.getFullYear() - 1900;
        F[b + 24 >> 2] = a.getDay();
        var c = new Date(a.getFullYear(), 0, 1);
        F[b + 28 >> 2] = (a.getTime() - c.getTime()) / 864e5 | 0;
        F[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
        var d = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
        c = c.getTimezoneOffset();
        F[b + 32 >> 2] = (d != c && a.getTimezoneOffset() == Math.min(c, d)) | 0;
      }, w: function(a, b, c, d, f, h) {
        try {
          var k = X(d);
          if (0 !== (b & 2) && 0 === (c & 2) && 2 !== (k.flags & 2097155))
            throw new P(2);
          if (1 === (k.flags & 2097155))
            throw new P(2);
          if (!k.Ha.bb)
            throw new P(43);
          var q = k.Ha.bb(k, a, f, b, c);
          var x = q.Fb;
          F[h >> 2] = q.vb;
          return x;
        } catch (w) {
          if ("undefined" == typeof W || !(w instanceof P))
            throw w;
          return -w.Ka;
        }
      }, x: function(a, b, c, d, f, h) {
        try {
          var k = X(f);
          if (c & 2) {
            var q = u.slice(a, a + b);
            k && k.Ha.cb && k.Ha.cb(k, q, h, b, d);
          }
        } catch (x) {
          if ("undefined" == typeof W || !(x instanceof P))
            throw x;
          return -x.Ka;
        }
      }, n: Mc, q: function() {
        return 2147483648;
      }, d: Nc, c: function(a) {
        var b = u.length;
        a >>>= 0;
        if (2147483648 < a)
          return false;
        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + 0.2 / c);
          d = Math.min(d, a + 100663296);
          var f = Math;
          d = Math.max(
            a,
            d
          );
          f = f.min.call(f, 2147483648, d + (65536 - d % 65536) % 65536);
          a: {
            try {
              Ja.grow(f - Na.byteLength + 65535 >>> 16);
              Ra();
              var h = 1;
              break a;
            } catch (k) {
            }
            h = void 0;
          }
          if (h)
            return true;
        }
        return false;
      }, z: function(a, b) {
        var c = 0;
        Pc().forEach(function(d, f) {
          var h = b + c;
          f = J[a + 4 * f >> 2] = h;
          for (h = 0; h < d.length; ++h)
            r[f++ >> 0] = d.charCodeAt(h);
          r[f >> 0] = 0;
          c += d.length + 1;
        });
        return 0;
      }, A: function(a, b) {
        var c = Pc();
        J[a >> 2] = c.length;
        var d = 0;
        c.forEach(function(f) {
          d += f.length + 1;
        });
        J[b >> 2] = d;
        return 0;
      }, f: function(a) {
        try {
          var b = X(a);
          la(b);
          return 0;
        } catch (c) {
          if ("undefined" == typeof W || !(c instanceof P))
            throw c;
          return c.Ka;
        }
      }, m: function(a, b) {
        try {
          var c = X(a);
          r[b >> 0] = c.tty ? 2 : 16384 === (c.mode & 61440) ? 3 : 40960 === (c.mode & 61440) ? 7 : 4;
          return 0;
        } catch (d) {
          if ("undefined" == typeof W || !(d instanceof P))
            throw d;
          return d.Ka;
        }
      }, u: function(a, b, c, d) {
        try {
          a: {
            var f = X(a);
            a = b;
            for (var h = b = 0; h < c; h++) {
              var k = J[a >> 2], q = J[a + 4 >> 2];
              a += 8;
              var x = Zb(f, r, k, q);
              if (0 > x) {
                var w = -1;
                break a;
              }
              b += x;
              if (x < q)
                break;
            }
            w = b;
          }
          J[d >> 2] = w;
          return 0;
        } catch (A) {
          if ("undefined" == typeof W || !(A instanceof P))
            throw A;
          return A.Ka;
        }
      }, k: function(a, b, c, d, f) {
        try {
          b = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
          if (isNaN(b))
            return 61;
          var h = X(a);
          Yb(h, b, d);
          O = [h.position >>> 0, (N = h.position, 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
          F[f >> 2] = O[0];
          F[f + 4 >> 2] = O[1];
          h.hb && 0 === b && 0 === d && (h.hb = null);
          return 0;
        } catch (k) {
          if ("undefined" == typeof W || !(k instanceof P))
            throw k;
          return k.Ka;
        }
      }, C: function(a) {
        try {
          var b = X(a);
          return b.Ha && b.Ha.fsync ? b.Ha.fsync(b) : 0;
        } catch (c) {
          if ("undefined" == typeof W || !(c instanceof P))
            throw c;
          return c.Ka;
        }
      }, r: function(a, b, c, d) {
        try {
          a: {
            var f = X(a);
            a = b;
            for (var h = b = 0; h < c; h++) {
              var k = J[a >> 2], q = J[a + 4 >> 2];
              a += 8;
              var x = ka(f, r, k, q);
              if (0 > x) {
                var w = -1;
                break a;
              }
              b += x;
            }
            w = b;
          }
          J[d >> 2] = w;
          return 0;
        } catch (A) {
          if ("undefined" == typeof W || !(A instanceof P))
            throw A;
          return A.Ka;
        }
      } };
      (function() {
        function a(f) {
          e.asm = f.exports;
          Ja = e.asm.I;
          Ra();
          K = e.asm.Aa;
          Ta.unshift(e.asm.J);
          Wa--;
          e.monitorRunDependencies && e.monitorRunDependencies(Wa);
          0 == Wa && (Ya && (f = Ya, Ya = null, f()));
        }
        function b(f) {
          a(f.instance);
        }
        function c(f) {
          return bb().then(function(h) {
            return WebAssembly.instantiate(h, d);
          }).then(function(h) {
            return h;
          }).then(f, function(h) {
            Ha("failed to asynchronously prepare wasm: " + h);
            E(h);
          });
        }
        var d = { a: Wc };
        Wa++;
        e.monitorRunDependencies && e.monitorRunDependencies(Wa);
        if (e.instantiateWasm)
          try {
            return e.instantiateWasm(d, a);
          } catch (f) {
            return Ha("Module.instantiateWasm callback failed with error: " + f), false;
          }
        (function() {
          return Ia || "function" != typeof WebAssembly.instantiateStreaming || Za() || M.startsWith("file://") || Aa || "function" != typeof fetch ? c(b) : fetch(M, { credentials: "same-origin" }).then(function(f) {
            return WebAssembly.instantiateStreaming(f, d).then(b, function(h) {
              Ha("wasm streaming compile failed: " + h);
              Ha("falling back to ArrayBuffer instantiation");
              return c(b);
            });
          });
        })();
        return {};
      })();
      e.___wasm_call_ctors = function() {
        return (e.___wasm_call_ctors = e.asm.J).apply(null, arguments);
      };
      e._sqlite3_free = function() {
        return (e._sqlite3_free = e.asm.K).apply(null, arguments);
      };
      e._sqlite3_value_double = function() {
        return (e._sqlite3_value_double = e.asm.L).apply(null, arguments);
      };
      e._sqlite3_value_text = function() {
        return (e._sqlite3_value_text = e.asm.M).apply(null, arguments);
      };
      var Vc = e.___errno_location = function() {
        return (Vc = e.___errno_location = e.asm.N).apply(null, arguments);
      };
      e._sqlite3_prepare_v2 = function() {
        return (e._sqlite3_prepare_v2 = e.asm.O).apply(null, arguments);
      };
      e._sqlite3_step = function() {
        return (e._sqlite3_step = e.asm.P).apply(null, arguments);
      };
      e._sqlite3_finalize = function() {
        return (e._sqlite3_finalize = e.asm.Q).apply(null, arguments);
      };
      e._sqlite3_reset = function() {
        return (e._sqlite3_reset = e.asm.R).apply(null, arguments);
      };
      e._sqlite3_value_int = function() {
        return (e._sqlite3_value_int = e.asm.S).apply(null, arguments);
      };
      e._sqlite3_clear_bindings = function() {
        return (e._sqlite3_clear_bindings = e.asm.T).apply(null, arguments);
      };
      e._sqlite3_value_blob = function() {
        return (e._sqlite3_value_blob = e.asm.U).apply(null, arguments);
      };
      e._sqlite3_value_bytes = function() {
        return (e._sqlite3_value_bytes = e.asm.V).apply(null, arguments);
      };
      e._sqlite3_value_type = function() {
        return (e._sqlite3_value_type = e.asm.W).apply(null, arguments);
      };
      e._sqlite3_result_blob = function() {
        return (e._sqlite3_result_blob = e.asm.X).apply(null, arguments);
      };
      e._sqlite3_result_double = function() {
        return (e._sqlite3_result_double = e.asm.Y).apply(null, arguments);
      };
      e._sqlite3_result_error = function() {
        return (e._sqlite3_result_error = e.asm.Z).apply(null, arguments);
      };
      e._sqlite3_result_int = function() {
        return (e._sqlite3_result_int = e.asm._).apply(null, arguments);
      };
      e._sqlite3_result_int64 = function() {
        return (e._sqlite3_result_int64 = e.asm.$).apply(null, arguments);
      };
      e._sqlite3_result_null = function() {
        return (e._sqlite3_result_null = e.asm.aa).apply(null, arguments);
      };
      e._sqlite3_result_text = function() {
        return (e._sqlite3_result_text = e.asm.ba).apply(null, arguments);
      };
      e._sqlite3_sql = function() {
        return (e._sqlite3_sql = e.asm.ca).apply(null, arguments);
      };
      e._sqlite3_aggregate_context = function() {
        return (e._sqlite3_aggregate_context = e.asm.da).apply(null, arguments);
      };
      e._sqlite3_column_count = function() {
        return (e._sqlite3_column_count = e.asm.ea).apply(null, arguments);
      };
      e._sqlite3_data_count = function() {
        return (e._sqlite3_data_count = e.asm.fa).apply(null, arguments);
      };
      e._sqlite3_column_blob = function() {
        return (e._sqlite3_column_blob = e.asm.ga).apply(null, arguments);
      };
      e._sqlite3_column_bytes = function() {
        return (e._sqlite3_column_bytes = e.asm.ha).apply(null, arguments);
      };
      e._sqlite3_column_double = function() {
        return (e._sqlite3_column_double = e.asm.ia).apply(null, arguments);
      };
      e._sqlite3_column_text = function() {
        return (e._sqlite3_column_text = e.asm.ja).apply(null, arguments);
      };
      e._sqlite3_column_type = function() {
        return (e._sqlite3_column_type = e.asm.ka).apply(null, arguments);
      };
      e._sqlite3_column_name = function() {
        return (e._sqlite3_column_name = e.asm.la).apply(null, arguments);
      };
      e._sqlite3_bind_blob = function() {
        return (e._sqlite3_bind_blob = e.asm.ma).apply(null, arguments);
      };
      e._sqlite3_bind_double = function() {
        return (e._sqlite3_bind_double = e.asm.na).apply(null, arguments);
      };
      e._sqlite3_bind_int = function() {
        return (e._sqlite3_bind_int = e.asm.oa).apply(null, arguments);
      };
      e._sqlite3_bind_text = function() {
        return (e._sqlite3_bind_text = e.asm.pa).apply(null, arguments);
      };
      e._sqlite3_bind_parameter_index = function() {
        return (e._sqlite3_bind_parameter_index = e.asm.qa).apply(null, arguments);
      };
      e._sqlite3_normalized_sql = function() {
        return (e._sqlite3_normalized_sql = e.asm.ra).apply(null, arguments);
      };
      e._sqlite3_errmsg = function() {
        return (e._sqlite3_errmsg = e.asm.sa).apply(null, arguments);
      };
      e._sqlite3_exec = function() {
        return (e._sqlite3_exec = e.asm.ta).apply(null, arguments);
      };
      e._sqlite3_changes = function() {
        return (e._sqlite3_changes = e.asm.ua).apply(null, arguments);
      };
      e._sqlite3_close_v2 = function() {
        return (e._sqlite3_close_v2 = e.asm.va).apply(null, arguments);
      };
      e._sqlite3_create_function_v2 = function() {
        return (e._sqlite3_create_function_v2 = e.asm.wa).apply(null, arguments);
      };
      e._sqlite3_open = function() {
        return (e._sqlite3_open = e.asm.xa).apply(null, arguments);
      };
      var da = e._malloc = function() {
        return (da = e._malloc = e.asm.ya).apply(null, arguments);
      }, ba = e._free = function() {
        return (ba = e._free = e.asm.za).apply(null, arguments);
      };
      e._RegisterExtensionFunctions = function() {
        return (e._RegisterExtensionFunctions = e.asm.Ba).apply(null, arguments);
      };
      var zb = e._emscripten_builtin_memalign = function() {
        return (zb = e._emscripten_builtin_memalign = e.asm.Ca).apply(null, arguments);
      }, oa = e.stackSave = function() {
        return (oa = e.stackSave = e.asm.Da).apply(null, arguments);
      }, qa = e.stackRestore = function() {
        return (qa = e.stackRestore = e.asm.Ea).apply(null, arguments);
      }, B = e.stackAlloc = function() {
        return (B = e.stackAlloc = e.asm.Fa).apply(null, arguments);
      };
      e.UTF8ToString = C;
      e.stackAlloc = B;
      e.stackSave = oa;
      e.stackRestore = qa;
      e.cwrap = function(a, b, c, d) {
        c = c || [];
        var f = c.every((h) => "number" === h || "boolean" === h);
        return "string" !== b && f && !d ? e["_" + a] : function() {
          return Uc(a, b, c, arguments);
        };
      };
      var Xc;
      Ya = function Yc() {
        Xc || Zc();
        Xc || (Ya = Yc);
      };
      function Zc() {
        function a() {
          if (!Xc && (Xc = true, e.calledRun = true, !Ka)) {
            e.noFSInit || ac || (ac = true, $b(), e.stdin = e.stdin, e.stdout = e.stdout, e.stderr = e.stderr, e.stdin ? cc("stdin", e.stdin) : Sb("/dev/tty", "/dev/stdin"), e.stdout ? cc("stdout", null, e.stdout) : Sb("/dev/tty", "/dev/stdout"), e.stderr ? cc("stderr", null, e.stderr) : Sb("/dev/tty1", "/dev/stderr"), ja("/dev/stdin", 0), ja("/dev/stdout", 1), ja("/dev/stderr", 1));
            Db = false;
            cb(Ta);
            if (e.onRuntimeInitialized)
              e.onRuntimeInitialized();
            if (e.postRun)
              for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length; ) {
                var b = e.postRun.shift();
                Ua.unshift(b);
              }
            cb(Ua);
          }
        }
        if (!(0 < Wa)) {
          if (e.preRun)
            for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length; )
              Va();
          cb(Sa);
          0 < Wa || (e.setStatus ? (e.setStatus("Running..."), setTimeout(function() {
            setTimeout(function() {
              e.setStatus("");
            }, 1);
            a();
          }, 1)) : a());
        }
      }
      if (e.preInit)
        for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length; )
          e.preInit.pop()();
      Zc();
      return Module2;
    });
    return initSqlJsPromise;
  };
  {
    module.exports = initSqlJs;
    module.exports.default = initSqlJs;
  }
})(sqlWasm);
var sqlWasmExports = sqlWasm.exports;
const InitSqlJS = /* @__PURE__ */ getDefaultExportFromCjs(sqlWasmExports);
const WasmUrl = "" + new URL("sql-wasm-18fc45ef.wasm", import.meta.url).href;
const DB_NAME = "sqlitevfs";
const LOADED_FILES = /* @__PURE__ */ new Map();
const MIN_GROW_BYTES = 2048;
const MAX_GROW_BYTES = 65536;
class _Buffer {
  constructor(data) {
    __publicField(this, "_data");
    __publicField(this, "_size");
    this._data = data ?? new Uint8Array();
    this._size = this._data.length;
  }
  get size() {
    return this._size;
  }
  read(offset, buffer) {
    if (offset >= this._size) {
      return 0;
    }
    const toCopy = this._data.subarray(
      offset,
      Math.min(this._size, offset + buffer.length)
    );
    buffer.set(toCopy);
    return toCopy.length;
  }
  reserve(capacity) {
    if (this._data.length >= capacity) {
      return;
    }
    const neededBytes = capacity - this._data.length;
    const growBy = Math.min(
      MAX_GROW_BYTES,
      Math.max(MIN_GROW_BYTES, this._data.length)
    );
    const newArray = new Uint8Array(
      this._data.length + Math.max(growBy, neededBytes)
    );
    newArray.set(this._data);
    this._data = newArray;
  }
  write(offset, buffer) {
    this.reserve(offset + buffer.length);
    this._data.set(buffer, offset);
    this._size = Math.max(this._size, offset + buffer.length);
    return buffer.length;
  }
  truncate(size2) {
    this._size = size2;
  }
  toUint8Array() {
    return this._data.subarray(0, this._size);
  }
}
const indexedDB = globalThis.indexedDB || window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
const database = new Promise((resolve, reject) => {
  const request = indexedDB.open(DB_NAME, 1);
  request.onupgradeneeded = () => request.result.createObjectStore("files", { keyPath: "name" });
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});
async function loadFile(fileName) {
  const db = await database;
  const file = await new Promise((resolve, reject) => {
    const store = db.transaction("files", "readonly").objectStore("files");
    const request = store.get(fileName);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  if (file && !LOADED_FILES.has(fileName)) {
    const buffer = new _Buffer(file.data);
    LOADED_FILES.set(fileName, buffer);
    return buffer;
  } else if (LOADED_FILES.has(fileName)) {
    return LOADED_FILES.get(fileName);
  } else {
    return null;
  }
}
async function syncFile(fileName, data) {
  const db = await database;
  await new Promise((resolve, reject) => {
    const store = db.transaction("files", "readwrite").objectStore("files");
    const request = store.put({ name: fileName, data });
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}
async function deleteFile(fileName) {
  const db = await database;
  await new Promise((resolve, reject) => {
    const store = db.transaction("files", "readwrite").objectStore("files");
    const request = store.delete(fileName);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}
async function writeFile(fileName, data) {
  await syncFile(fileName, data);
  if (LOADED_FILES.has(fileName)) {
    const buffer = LOADED_FILES.get(fileName);
    buffer.truncate(0);
    buffer.write(0, data);
  }
}
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
var defaultSerializer = (parameter) => {
  if (skipTransform(parameter) || typeof parameter === "string") {
    return parameter;
  } else if (typeof parameter === "boolean") {
    return `${parameter}`;
  } else if (parameter instanceof Date) {
    return parameter.toISOString();
  } else {
    try {
      return JSON.stringify(parameter);
    } catch (error) {
      return parameter;
    }
  }
};
var dateRegex = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/;
var defaultDeserializer = (parameter) => {
  if (skipTransform(parameter)) {
    return parameter;
  }
  if (typeof parameter === "string") {
    if (/^(true|false)$/.test(parameter)) {
      return parameter === "true";
    } else if (dateRegex.test(parameter)) {
      return new Date(parameter);
    } else {
      try {
        return JSON.parse(parameter, (_k, v) => typeof v === "string" && dateRegex.exec(v) ? new Date(v) : v);
      } catch (e) {
        return parameter;
      }
    }
  }
};
function skipTransform(parameter) {
  return parameter === void 0 || parameter === null || typeof parameter === "bigint" || typeof parameter === "number" || typeof parameter === "object" && "buffer" in parameter;
}
var SerializePlugin = class {
  /**
   * _**THIS PLUGIN SHOULD BE PLACED AT THE END OF PLUGINS ARRAY !!!**_
   *
   * reference from https://github.com/koskimas/kysely/pull/138
   *
   * The following example will return an error when using sqlite dialects, unless using this plugin:
   * ```ts
   * interface TestTable {
   *   id: Generated<number>
   *   person: { name: string; age: number; time: Date } | null
   *   gender: boolean
   *   blob: Uint8Array | null
   *   date: Date
   * }
   *
   * interface Database {
   *   test: TestTable
   * }
   *
   * const db = new Kysely<Database>({
   *   dialect: new SqliteDialect({
   *     database: new Database(':memory:'),
   *   }),
   *   plugins: [
   *     new SerializePlugin(),
   *   ],
   * })
   *
   * await db.insertInto('test').values({
   *   gender: true,
   *   person: { name: 'test', age: 2, time: new Date() },
   *   blob: Uint8Array.from([1, 2, 3]),
   *   date: new Date(),
   * }).execute()
   * ```
   *
   * You can also provide a custom serializer function:
   *
   * ```ts
   * const db = new Kysely<Database>({
   *   dialect: new SqliteDialect({
   *     database: new Database(":memory:"),
   *   }),
   *   plugins: [
   *     new SerializePlugin({
   *         serializer: (value) => {
   *             if (value instanceof Date) {
   *                 return formatDatetime(value)
   *             }
   *
   *             if (value !== null && typeof value === 'object') {
   *                 return JSON.stringify(value)
   *             }
   *
   *             return value
   *         }
   *     }),
   *   ],
   * })
   * ```
   */
  constructor(options = {}) {
    __publicField(this, "transformer");
    __publicField(this, "deserializer");
    __publicField(this, "only");
    __publicField(this, "ctx");
    const {
      deserializer = defaultDeserializer,
      selectOrRawOnly,
      serializer = defaultSerializer
    } = options;
    this.transformer = new SerializeParametersTransformer(serializer);
    this.deserializer = deserializer;
    this.only = selectOrRawOnly;
    if (selectOrRawOnly) {
      this.ctx = /* @__PURE__ */ new WeakSet();
    }
  }
  transformQuery({ node, queryId }) {
    if (this.only && ["SelectQueryNode", "RawNode"].includes(node.kind)) {
      this.ctx?.add(queryId);
    }
    return this.transformer.transformNode(node);
  }
  async transformResult({ result, queryId }) {
    const parsedResult = {
      ...result,
      rows: result.rows.map((row) => Object.fromEntries(
        Object.entries(row).map(
          ([key, value]) => [key, this.deserializer(value)]
        )
      ))
    };
    if (!this.only) {
      return parsedResult;
    }
    this.ctx?.delete(queryId);
    return parsedResult;
  }
};
function createKyselyLogger(options) {
  const { logger, merge, queryNode } = options;
  return (event) => {
    const { level, queryDurationMillis, query: { parameters, sql: sql2, query } } = event;
    const err = level === "error" ? event.error : void 0;
    let _sql2 = sql2.replace(/\r?\n/g, " ").replace(/\s+/g, " ");
    if (merge) {
      parameters.forEach((param2) => {
        _sql2 = _sql2.replace("?", typeof param2 === "string" ? param2 : JSON.stringify(param2));
      });
    }
    const param = {
      sql: _sql2,
      params: parameters,
      duration: queryDurationMillis,
      error: err
    };
    if (queryNode) {
      param.queryNode = query;
    }
    logger(param);
  };
}
async function checkIntegrity(db) {
  const { rows } = await db.executeQuery(CompiledQuery.raw("PRAGMA integrity_check"));
  if (!rows.length) {
    throw new Error("fail to check integrity");
  }
  return rows[0].integrity_check === "ok";
}
async function getOrSetDBVersion(db, version2) {
  if (version2) {
    await db.executeQuery(CompiledQuery.raw(`PRAGMA user_version = ${version2}`));
    return version2;
  }
  const { rows } = await db.executeQuery(CompiledQuery.raw("PRAGMA user_version"));
  if (!rows.length) {
    throw new Error("fail to get DBVersion");
  }
  return rows[0].user_version;
}
function getParam(name) {
  return `__pre_${name}`;
}
function precompileQuery(queryBuilder, serialize = (v) => v) {
  return {
    /**
     * setup params
     * @param paramBuilder param builder
     * @returns function to {@link CompileFn compile}
     */
    setParam: (paramBuilder) => {
      let compiled;
      return (param, processRootOperatorNode) => {
        if (!compiled) {
          const { parameters, sql: sql2, query } = paramBuilder({
            qb: queryBuilder,
            param: getParam
          }).compile();
          compiled = {
            sql: sql2,
            query: processRootOperatorNode?.(query) || { kind: query.kind },
            parameters
          };
        }
        return {
          ...compiled,
          parameters: compiled.parameters.map(
            (p2) => typeof p2 === "string" && p2.startsWith("__pre_") ? serialize(param[p2.slice(6)]) : p2
          )
        };
      };
    }
  };
}
async function savePoint(db, name) {
  const _name = name || `sp_${Date.now() % 1e8}`;
  await sql`savepoint ${sql.raw(_name)}`.execute(db);
  return {
    release: async () => {
      await sql`release savepoint ${sql.raw(_name)}`.execute(db);
    },
    rollback: async () => {
      await sql`rollback to savepoint ${sql.raw(_name)}`.execute(db);
    }
  };
}
var IntegrityError = class extends Error {
  constructor() {
    super("db file maybe broken");
  }
};
function isSelectQueryBuilder(builder) {
  return builder.toOperationNode().kind === "SelectQueryNode";
}
var SqliteBuilder = class {
  /**
   * sqlite builder
   * @param options options
   */
  constructor(options) {
    __publicField(this, "kysely");
    __publicField(this, "trxCount", 0);
    __publicField(this, "trx");
    __publicField(this, "logger");
    __publicField(this, "serializer", defaultSerializer);
    const {
      dialect: dialect2,
      logger,
      onQuery,
      plugins = [],
      serializerPluginOptions
    } = options;
    this.logger = logger;
    if (serializerPluginOptions?.serializer) {
      this.serializer = serializerPluginOptions.serializer;
    }
    plugins.push(new SerializePlugin(serializerPluginOptions));
    let log3;
    if (onQuery === true) {
      log3 = createKyselyLogger({
        logger: this.logger?.debug || console.log,
        merge: true
      });
    } else if (onQuery) {
      log3 = createKyselyLogger(onQuery);
    }
    this.kysely = new Kysely({
      dialect: dialect2,
      log: log3,
      plugins
    });
  }
  /**
   * sync db schema
   * @param updater sync table function, built-in: {@link useSchema}, {@link useMigrator}
   * @param checkIntegrity whether to check integrity
   * @example
   * usage of `createAutoSyncSchemaFn`:
   * ```
   * import {
   *   SqliteBuilder,
   *   defineLiteral,
   *   defineObject,
   *   defineTable
   *   useSchema,
   * } from 'kysely-sqlite-builder'
   *
   * const testTable = defineTable({
   *   id: { type: 'increments' },
   *   person: { type: 'object', defaultTo: { name: 'test' } },
   *   gender: { type: 'boolean', notNull: true },
   *   array: defineObject<string[]>().NotNull(),
   *   literal: defineLiteral<'l1' | 'l2'>('l1'),
   *   buffer: { type: 'blob' },
   * }, {
   *   primary: 'id',
   *   index: ['person', ['id', 'gender']],
   *   timeTrigger: { create: true, update: true },
   * })
   * await db.updateTableSchema(useSchema(
   *   { test: testTable },
   *   { log: false }
   * ))
   * ```
   */
  async updateTableSchema(updater, checkIntegrity$1) {
    try {
      if (checkIntegrity$1 && !await checkIntegrity(this.kysely)) {
        this.logger?.error("integrity check fail");
        return { ready: false, error: new IntegrityError() };
      }
      await updater(this.kysely, this.logger);
    } catch (error) {
      this.logError(error, "sync table fail");
      return {
        ready: false,
        error
      };
    }
    this.logger?.info("table updated");
    return { ready: true };
  }
  getDB() {
    return this.trx || this.kysely;
  }
  logError(e, errorMsg) {
    errorMsg && this.logger?.error(errorMsg, e instanceof Error ? e : void 0);
    return void 0;
  }
  /**
   * run in transaction, support nest call (using savepoint)
   */
  async transaction(fn, errorMsg) {
    if (!this.trx) {
      try {
        return await this.kysely.transaction().execute(async (trx) => {
          this.trx = trx;
          this.logger?.debug("run in transaction");
          return await fn(trx);
        });
      } catch (e) {
        return this.logError(e, errorMsg);
      } finally {
        this.trx = void 0;
      }
    }
    this.trxCount++;
    const sp = await savePoint(this.trx, `sp_${this.trxCount}`);
    this.logger?.debug(`run in savepoint: sp_${this.trxCount}`);
    try {
      const result = await fn(this.trx);
      await sp.release();
      this.trxCount--;
      return result;
    } catch (e) {
      await sp.rollback();
      this.trxCount--;
      return this.logError(e, errorMsg);
    }
  }
  async execute(data) {
    return typeof data === "function" ? await data(this.getDB()).execute() : await this.getDB().executeQuery(data);
  }
  /**
   * execute and return first result,
   * auto detect transaction, auto catch error
   *
   * if is select, auto append `.limit(1)`
   */
  async executeTakeFirst(fn) {
    let _sql2 = fn(this.getDB());
    if (isSelectQueryBuilder(_sql2)) {
      _sql2 = _sql2.limit(1);
    }
    return await _sql2.executeTakeFirstOrThrow();
  }
  /**
   * precompile query, call it with different params later
   *
   * used for better performance, details: {@link precompileQuery}
   */
  precompile(queryBuilder) {
    this.logger?.debug?.("precompile");
    return precompileQuery(queryBuilder(this.kysely), this.serializer);
  }
  async raw(rawSql, parameters) {
    return typeof rawSql === "string" ? await this.getDB().executeQuery(CompiledQuery.raw(rawSql, parameters)) : await rawSql.execute(this.getDB());
  }
  /**
   * optimize db file
   * @param rebuild run `vacuum` instead of `pragma optimize`
   * @see https://sqlite.org/pragma.html#pragma_optimize
   * @see https://www.sqlite.org/lang_vacuum.html
   */
  async optimize(rebuild) {
    await this.raw(rebuild ? "vacuum" : "pragma optimize");
  }
  /**
   * destroy db connection
   */
  async destroy() {
    this.logger?.info("destroyed");
    await this.kysely.destroy();
    this.trx = void 0;
  }
};
var TGR = "__TIME_TRIGGER__";
function defineTable(columns, property) {
  const { create, update } = property?.timeTrigger || {};
  const options = { type: "date", defaultTo: TGR };
  if (create === true) {
    columns.createAt = options;
  } else if (create) {
    columns[create] = options;
  }
  if (update === true) {
    columns.updateAt = { ...options, notNull: 0 };
  } else if (update) {
    columns[update] = { ...options, notNull: 0 };
  }
  return {
    columns,
    ...property
  };
}
function parseColumnType(type) {
  let dataType = "text";
  let haveIncrements = false;
  switch (type) {
    case "boolean":
    case "date":
    case "object":
    case "string":
      dataType = "text";
      break;
    case "float":
      dataType = "real";
      break;
    case "increments":
      haveIncrements = true;
    case "int":
      dataType = "integer";
      break;
    default:
      dataType = type;
  }
  return {
    dataType,
    isIncrements: haveIncrements
  };
}
function parseArray(arr) {
  return Array.isArray(arr) ? arr : [arr];
}
function isFunction(value) {
  return typeof value === "function";
}
async function runDropTable(db, tableName) {
  await db.schema.dropTable(tableName).execute();
}
async function runCreateTableWithIndexAndTrigger(db, tableName, table) {
  const { index, ...props } = table;
  await db.transaction().execute(async (trx) => {
    const triggerOptions = await runCreateTable(trx, tableName, props);
    await runCreateTimeTrigger(trx, tableName, triggerOptions);
    await runCreateTableIndex(trx, tableName, index);
  });
}
async function runCreateTableIndex(db, tableName, index) {
  for (const i of index || []) {
    const _i = parseArray(i);
    await db.schema.createIndex(`idx_${tableName}_${_i.join("_")}`).on(tableName).columns(_i).ifNotExists().execute();
  }
}
async function runCreateTable(db, tableName, { columns, primary, timeTrigger, unique }, temporary = false) {
  const _triggerOptions = timeTrigger ? {
    triggerKey: "rowid",
    update: void 0
  } : void 0;
  let _haveAutoKey = false;
  let tableSql = db.schema.createTable(tableName);
  if (temporary) {
    tableSql = tableSql.temporary();
  }
  for (const [columnName, columnProperty] of Object.entries(columns)) {
    let dataType = "text";
    const { type, notNull, defaultTo } = columnProperty;
    const parsedType = parseColumnType(type);
    dataType = parsedType.dataType;
    tableSql = tableSql.addColumn(columnName, dataType, (builder) => {
      if (parsedType.isIncrements) {
        _haveAutoKey = true;
        if (_triggerOptions) {
          _triggerOptions.triggerKey = columnName;
        }
        return builder.autoIncrement().primaryKey();
      }
      if (defaultTo === TGR) {
        if (_triggerOptions && notNull === 0) {
          _triggerOptions.update = columnName;
        }
        return builder.defaultTo(sql`CURRENT_TIMESTAMP`);
      }
      if (notNull === true) {
        builder = builder.notNull();
      }
      if (defaultTo !== void 0) {
        builder = builder.defaultTo(isFunction(defaultTo) ? defaultTo(sql) : defaultTo);
      }
      return builder;
    });
  }
  if (!_haveAutoKey && primary) {
    const _p = parseArray(primary);
    tableSql = tableSql.addPrimaryKeyConstraint(
      `pk#${_p.join("#")}`,
      _p
    );
  }
  for (const uk of unique || []) {
    const _u = parseArray(uk);
    tableSql = tableSql.addUniqueConstraint(
      `un#${_u.join("#")}`,
      _u
    );
  }
  await tableSql.ifNotExists().execute();
  return _triggerOptions;
}
async function runCreateTimeTrigger(db, tableName, options) {
  if (!options || !options.update) {
    return;
  }
  const { triggerKey, update } = options;
  const triggerName = `tgr_${tableName}_${update}`;
  await sql`create trigger if not exists ${sql.ref(triggerName)}
after update
on ${sql.table(tableName)}
begin
  update ${sql.table(tableName)}
  set ${sql.ref(update)} = CURRENT_TIMESTAMP
  where ${sql.ref(triggerKey)} = NEW.${sql.ref(triggerKey)};
end`.execute(db);
}
function parseCreateTableSQL(definition) {
  const baseRegex = /create table (?:if not exist)?\s*"([^"]+)".*?\((.*)\)/i;
  const columnRegex = /"([^"]+)"\s+(\w+)\s?(not null)?/gi;
  const [, tableName, cols] = definition.replace(/\r?\n/g, "").match(baseRegex);
  const ret = {
    columns: {},
    name: tableName,
    primary: void 0,
    unique: []
  };
  const columnMatches = cols.matchAll(columnRegex);
  for (const match of columnMatches) {
    const [, columnName, type, notNull] = match;
    if (columnName.startsWith("pk#")) {
      const [, ...keys] = columnName.split("#");
      ret.primary = keys;
    } else if (columnName.startsWith("un#")) {
      const [, ...keys] = columnName.split("#");
      ret.unique.push(keys);
    } else {
      ret.columns[columnName] = {
        type,
        notNull: !!notNull
      };
    }
  }
  return ret;
}
async function parseExistDB(db, prefix = []) {
  const tables2 = await db.selectFrom("sqlite_master").where("type", "in", ["table", "trigger", "index"]).where("name", "!=", DEFAULT_MIGRATION_TABLE).where("name", "!=", DEFAULT_MIGRATION_LOCK_TABLE).where("name", "not like", "sqlite_%").$if(!!prefix.length, (qb) => qb.where(
    (eb) => eb.and(
      prefix.map((t) => eb("name", "not like", `${t}%`))
    )
  )).select(["name", "sql", "type"]).$castTo().execute();
  const tableMap = {
    existTables: {},
    indexList: [],
    triggerList: []
  };
  for (const { name, sql: sql3, type } of tables2) {
    if (!sql3) {
      continue;
    }
    if (type === "table") {
      tableMap.existTables[name] = parseCreateTableSQL(sql3);
    } else if (type === "index") {
      tableMap.indexList.push(name);
    } else {
      tableMap.triggerList.push(name);
    }
  }
  return tableMap;
}
async function syncTables(db, targetTables, options = {}, logger) {
  const {
    reserveOldData,
    truncateIfExists = [],
    log: log3,
    version: { current, skipSyncWhenSame } = {},
    excludeTablePrefix,
    afterUpdate
  } = options;
  if (current) {
    if (skipSyncWhenSame && current === await getOrSetDBVersion(db)) {
      return;
    }
    await getOrSetDBVersion(db, current);
  }
  const debug = (e) => log3 && logger?.debug(e);
  const { existTables, indexList, triggerList } = await parseExistDB(db, excludeTablePrefix);
  debug("====== update tables start ======");
  const truncateTableSet = new Set(
    Array.isArray(truncateIfExists) ? truncateIfExists : truncateIfExists ? Object.keys(existTables) : []
  );
  for (const idx of indexList) {
    await db.schema.dropIndex(idx).ifExists().execute();
  }
  for (const tgr of triggerList) {
    await sql`drop trigger if exists ${sql.ref(tgr)}`.execute(db);
  }
  for (const [existTableName, existColumns] of Object.entries(existTables)) {
    if (!(existTableName in targetTables)) {
      debug(`remove table: ${existTableName}`);
      await runDropTable(db, existTableName);
    } else {
      debug(`diff table: ${existTableName}`);
      await diffTable(existTableName, existColumns, targetTables[existTableName]);
    }
  }
  for (const [targetTableName, targetTable] of Object.entries(targetTables)) {
    if (!(targetTableName in existTables)) {
      debug(`create table: ${targetTableName}`);
      await runCreateTableWithIndexAndTrigger(db, targetTableName, targetTable);
    }
  }
  debug("======= after update hook =======");
  await afterUpdate?.(db);
  debug("======= update tables end =======");
  async function diffTable(tableName, existColumns, targetColumns) {
    if (truncateTableSet.has(tableName)) {
      await db.transaction().execute(async (trx) => {
        await runDropTable(trx, tableName);
        await runCreateTableWithIndexAndTrigger(trx, tableName, targetColumns);
        debug("clear and sync structure");
      });
      return;
    }
    const { index, ...props } = targetColumns;
    const restoreColumnList = getRestoreColumnList(existColumns.columns, targetColumns.columns);
    if (restoreColumnList.length === Object.keys(existColumns.columns).length) {
      debug("same table structure, skip");
      return;
    }
    debug("different table structure, update");
    await db.transaction().execute(async (trx) => {
      const tempTableName = `_temp_${tableName}`;
      await runCreateTable(trx, tempTableName, existColumns, true);
      await trx.insertInto(tempTableName).expression((eb) => eb.selectFrom(tableName).selectAll()).execute();
      await runDropTable(trx, tableName);
      const _triggerOptions = await runCreateTable(trx, tableName, props);
      if (restoreColumnList.length) {
        await trx.insertInto(tableName).columns(restoreColumnList).expression((eb) => eb.selectFrom(tempTableName).select(restoreColumnList)).execute();
      }
      await runCreateTableIndex(trx, tableName, index);
      await runCreateTimeTrigger(trx, tableName, _triggerOptions);
      !reserveOldData && await runDropTable(trx, tempTableName);
    }).then(() => debug(`restore columns: ${restoreColumnList}`)).catch((e) => logger?.error(`fail to sync ${tableName}`, e));
  }
}
function getRestoreColumnList(existColumns, targetColumns) {
  const list = [];
  for (const [col, targetColumn] of Object.entries(targetColumns)) {
    if (col in existColumns) {
      const { type, notNull = false } = existColumns[col];
      parseColumnType(targetColumn.type).dataType === type && (targetColumn.notNull || false) === notNull && list.push(col);
    }
  }
  return list;
}
function useSchema(schema, options = {}) {
  const { log: log3 } = options;
  return async (db, logger) => {
    await syncTables(db, schema, options, log3 ? logger : void 0);
  };
}
const tables = {
  test: defineTable({
    id: { type: "increments" },
    name: { type: "string" },
    blobtest: { type: "blob" }
  }, {
    timeTrigger: { create: true, update: true }
  })
};
async function testDB(dialect2) {
  const db = new SqliteBuilder({
    dialect: dialect2
    // onQuery: true,
  });
  const result = await db.updateTableSchema(useSchema(tables));
  if (!result.ready) {
    throw result.error;
  }
  console.log(await db.raw(`PRAGMA table_info('test')`));
  for (let i = 0; i < 10; i++) {
    await db.transaction(async () => {
      await db.transaction(async () => {
        if (i > 8) {
          console.log("test rollback");
          throw new Error("test rollback");
        }
        await db.execute(
          (d) => d.insertInto("test").values({
            name: `test at ${Date.now()}`,
            blobtest: Uint8Array.from([2, 3, 4, 5, 6, 7, 8])
          })
        );
      });
    });
  }
  return db.execute((db2) => db2.selectFrom("test").selectAll());
}
const dialect$2 = new SqlJsDialect({
  async database() {
    const SQL = await InitSqlJS({
      // locateFile: file => `https://sql.js.org/dist/${file}`,
      locateFile: () => WasmUrl
    });
    return new SQL.Database(await loadFile("sqljs"));
  },
  onWrite: {
    func(data) {
      console.log(`[sqljs] write to indexeddb, length: ${data.length}`);
      writeFile("sqljs", data);
    },
    isThrottle: true
  }
});
function useDB() {
  const result = ref();
  function run() {
    testDB(dialect$2).then((data) => {
      result.value = data;
    });
  }
  return { result, run };
}
function WorkerWrapper$1() {
  return new Worker("" + new URL("sqljsWorker-c9b730f1.js", import.meta.url).href, { type: "module" });
}
function WorkerWrapper() {
  return new Worker("" + new URL("officialWasmWorker-71698db8.js", import.meta.url).href, { type: "module" });
}
var SQLITE_OK = 0;
var SQLITE_BUSY = 5;
var SQLITE_IOERR = 10;
var SQLITE_NOTFOUND = 12;
var SQLITE_CANTOPEN = 14;
var SQLITE_MISUSE = 21;
var SQLITE_RANGE = 25;
var SQLITE_NOTICE = 27;
var SQLITE_ROW = 100;
var SQLITE_DONE = 101;
var SQLITE_IOERR_LOCK = 3850;
var SQLITE_IOERR_SHORT_READ = 522;
var SQLITE_OPEN_READONLY = 1;
var SQLITE_OPEN_READWRITE = 2;
var SQLITE_OPEN_CREATE = 4;
var SQLITE_OPEN_DELETEONCLOSE = 8;
var SQLITE_LOCK_NONE = 0;
var SQLITE_LOCK_SHARED = 1;
var SQLITE_LOCK_RESERVED = 2;
var SQLITE_LOCK_PENDING = 3;
var SQLITE_LOCK_EXCLUSIVE = 4;
var SQLITE_IOCAP_SAFE_APPEND = 512;
var SQLITE_IOCAP_SEQUENTIAL = 1024;
var SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN = 2048;
var SQLITE_IOCAP_BATCH_ATOMIC = 16384;
var SQLITE_INTEGER = 1;
var SQLITE_FLOAT = 2;
var SQLITE_TEXT = 3;
var SQLITE_BLOB = 4;
var SQLITE_NULL = 5;
var MAX_INT64 = 0x7fffffffffffffffn;
var MIN_INT64 = -0x8000000000000000n;
var SQLiteError = class extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
};
var async = true;
function Factory(Module2) {
  const sqlite3 = {};
  const sqliteFreeAddress = Module2._getSqliteFree();
  const tmp = Module2._malloc(8);
  const tmpPtr = [tmp, tmp + 4];
  function createUTF8(s) {
    if (typeof s !== "string")
      return 0;
    const n = Module2.lengthBytesUTF8(s);
    const zts = Module2._sqlite3_malloc(n + 1);
    Module2.stringToUTF8(s, zts, n + 1);
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
    const isArray2 = Array.isArray(bindings);
    const nBindings = sqlite3.bind_parameter_count(stmt);
    for (let i = 1; i <= nBindings; ++i) {
      const key = isArray2 ? i - 1 : sqlite3.bind_parameter_name(stmt, i);
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
    const f = Module2.cwrap(fname, ...decl("nnnnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const byteLength = value.byteLength ?? value.length;
      const ptr = Module2._sqlite3_malloc(byteLength);
      Module2.HEAPU8.subarray(ptr).set(value);
      const result = f(stmt, i, ptr, byteLength, sqliteFreeAddress);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_parameter_count = function() {
    const fname = "sqlite3_bind_parameter_count";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.bind_double = function() {
    const fname = "sqlite3_bind_double";
    const f = Module2.cwrap(fname, ...decl("nnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const result = f(stmt, i, value);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_int = function() {
    const fname = "sqlite3_bind_int";
    const f = Module2.cwrap(fname, ...decl("nnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      if (value > 2147483647 || value < -2147483648)
        return SQLITE_RANGE;
      const result = f(stmt, i, value);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_int64 = function() {
    const fname = "sqlite3_bind_int64";
    const f = Module2.cwrap(fname, ...decl("nnnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      if (value > MAX_INT64 || value < MIN_INT64)
        return SQLITE_RANGE;
      const lo32 = value & 0xffffffffn;
      const hi32 = value >> 32n;
      const result = f(stmt, i, Number(lo32), Number(hi32));
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_null = function() {
    const fname = "sqlite3_bind_null";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(stmt, i) {
      verifyStatement(stmt);
      const result = f(stmt, i);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_parameter_name = function() {
    const fname = "sqlite3_bind_parameter_name";
    const f = Module2.cwrap(fname, ...decl("n:s"));
    return function(stmt, i) {
      verifyStatement(stmt);
      const result = f(stmt, i);
      return result;
    };
  }();
  sqlite3.bind_text = function() {
    const fname = "sqlite3_bind_text";
    const f = Module2.cwrap(fname, ...decl("nnnnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const ptr = createUTF8(value);
      const result = f(stmt, i, ptr, -1, sqliteFreeAddress);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.changes = function() {
    const fname = "sqlite3_changes";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(db) {
      verifyDatabase(db);
      const result = f(db);
      return result;
    };
  }();
  sqlite3.close = function() {
    const fname = "sqlite3_close";
    const f = Module2.cwrap(fname, ...decl("n:n"), { async });
    return async function(db) {
      verifyDatabase(db);
      const result = await f(db);
      databases.delete(db);
      return check(fname, result, db);
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
        const hi32 = Module2.getTempRet0();
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
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const nBytes = sqlite3.column_bytes(stmt, iCol);
      const address = f(stmt, iCol);
      const result = Module2.HEAPU8.subarray(address, address + nBytes);
      return result;
    };
  }();
  sqlite3.column_bytes = function() {
    const fname = "sqlite3_column_bytes";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_count = function() {
    const fname = "sqlite3_column_count";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.column_double = function() {
    const fname = "sqlite3_column_double";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_int = function() {
    const fname = "sqlite3_column_int64";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_int64 = function() {
    const fname = "sqlite3_column_int64";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const lo32 = f(stmt, iCol);
      const hi32 = Module2.getTempRet0();
      const result = cvt32x2ToBigInt(lo32, hi32);
      return result;
    };
  }();
  sqlite3.column_name = function() {
    const fname = "sqlite3_column_name";
    const f = Module2.cwrap(fname, ...decl("nn:s"));
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
    const f = Module2.cwrap(fname, ...decl("nn:s"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_type = function() {
    const fname = "sqlite3_column_type";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.create_function = function(db, zFunctionName, nArg, eTextRep, pApp, xFunc, xStep, xFinal) {
    verifyDatabase(db);
    if (xFunc && !xStep && !xFinal) {
      const result = Module2.createFunction(db, zFunctionName, nArg, eTextRep, pApp, xFunc);
      return check("sqlite3_create_function", result, db);
    }
    if (!xFunc && xStep && xFinal) {
      const result = Module2.createAggregate(db, zFunctionName, nArg, eTextRep, pApp, xStep, xFinal);
      return check("sqlite3_create_function", result, db);
    }
    throw new SQLiteError("invalid function combination", SQLITE_MISUSE);
  };
  sqlite3.create_module = function(db, zName, module, appData) {
    verifyDatabase(db);
    const result = Module2.createModule(db, zName, module, appData);
    return check("sqlite3_create_module", result, db);
  };
  sqlite3.data_count = function() {
    const fname = "sqlite3_data_count";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.declare_vtab = function() {
    const fname = "sqlite3_declare_vtab";
    const f = Module2.cwrap(fname, ...decl("ns:n"));
    return function(pVTab, zSQL) {
      const result = f(pVTab, zSQL);
      return check("sqlite3_declare_vtab", result);
    };
  }();
  sqlite3.exec = async function(db, sql2, callback) {
    for await (const stmt of sqlite3.statements(db, sql2)) {
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
    const f = Module2.cwrap(fname, ...decl("n:n"), { async });
    return async function(stmt) {
      if (!mapStmtToDB.has(stmt)) {
        return SQLITE_MISUSE;
      }
      const result = await f(stmt);
      mapStmtToDB.get(stmt);
      mapStmtToDB.delete(stmt);
      return result;
    };
  }();
  sqlite3.get_autocommit = function() {
    const fname = "sqlite3_get_autocommit";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(db) {
      const result = f(db);
      return result;
    };
  }();
  sqlite3.libversion = function() {
    const fname = "sqlite3_libversion";
    const f = Module2.cwrap(fname, ...decl(":s"));
    return function() {
      const result = f();
      return result;
    };
  }();
  sqlite3.libversion_number = function() {
    const fname = "sqlite3_libversion_number";
    const f = Module2.cwrap(fname, ...decl(":n"));
    return function() {
      const result = f();
      return result;
    };
  }();
  sqlite3.limit = function() {
    const fname = "sqlite3_limit";
    const f = Module2.cwrap(fname, ...decl("nnn:n"));
    return function(db, id, newVal) {
      const result = f(db, id, newVal);
      return result;
    };
  }();
  sqlite3.open_v2 = function() {
    const fname = "sqlite3_open_v2";
    const f = Module2.cwrap(fname, ...decl("snnn:n"), { async });
    return async function(zFilename, flags, zVfs) {
      flags = flags || SQLITE_OPEN_CREATE | SQLITE_OPEN_READWRITE;
      zVfs = createUTF8(zVfs);
      const result = await f(zFilename, tmpPtr[0], flags, zVfs);
      const db = Module2.getValue(tmpPtr[0], "*");
      databases.add(db);
      Module2._sqlite3_free(zVfs);
      Module2.ccall("RegisterExtensionFunctions", "void", ["number"], [db]);
      check(fname, result);
      return db;
    };
  }();
  sqlite3.prepare_v2 = function() {
    const fname = "sqlite3_prepare_v2";
    const f = Module2.cwrap(fname, ...decl("nnnnn:n"), { async });
    return async function(db, sql2) {
      const result = await f(db, sql2, -1, tmpPtr[0], tmpPtr[1]);
      check(fname, result, db);
      const stmt = Module2.getValue(tmpPtr[0], "*");
      if (stmt) {
        mapStmtToDB.set(stmt, db);
        return { stmt, sql: Module2.getValue(tmpPtr[1], "*") };
      }
      return null;
    };
  }();
  sqlite3.progress_handler = function(db, nProgressOps, handler, userData) {
    verifyDatabase(db);
    Module2.progressHandler(db, nProgressOps, handler, userData);
  };
  sqlite3.reset = function() {
    const fname = "sqlite3_reset";
    const f = Module2.cwrap(fname, ...decl("n:n"), { async });
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
    const f = Module2.cwrap(fname, ...decl("nnnn:n"));
    return function(context, value) {
      const byteLength = value.byteLength ?? value.length;
      const ptr = Module2._sqlite3_malloc(byteLength);
      Module2.HEAPU8.subarray(ptr).set(value);
      f(context, ptr, byteLength, sqliteFreeAddress);
    };
  }();
  sqlite3.result_double = function() {
    const fname = "sqlite3_result_double";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(context, value) {
      f(context, value);
    };
  }();
  sqlite3.result_int = function() {
    const fname = "sqlite3_result_int";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(context, value) {
      f(context, value);
    };
  }();
  sqlite3.result_int64 = function() {
    const fname = "sqlite3_result_int64";
    const f = Module2.cwrap(fname, ...decl("nnn:n"));
    return function(context, value) {
      if (value > MAX_INT64 || value < MIN_INT64)
        return SQLITE_RANGE;
      const lo32 = value & 0xffffffffn;
      const hi32 = value >> 32n;
      f(context, Number(lo32), Number(hi32));
    };
  }();
  sqlite3.result_null = function() {
    const fname = "sqlite3_result_null";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(context) {
      f(context);
    };
  }();
  sqlite3.result_text = function() {
    const fname = "sqlite3_result_text";
    const f = Module2.cwrap(fname, ...decl("nnnn:n"));
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
      row.push(value?.buffer === Module2.HEAPU8.buffer ? value.slice() : value);
    }
    return row;
  };
  sqlite3.set_authorizer = function(db, authFunction, userData) {
    verifyDatabase(db);
    const result = Module2.setAuthorizer(db, authFunction, userData);
    return check("sqlite3_set_authorizer", result, db);
  };
  sqlite3.sql = function() {
    const fname = "sqlite3_sql";
    const f = Module2.cwrap(fname, ...decl("n:s"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.statements = function(db, sql2) {
    return async function* () {
      const str = sqlite3.str_new(db, sql2);
      let prepared = { stmt: null, sql: sqlite3.str_value(str) };
      try {
        while (prepared = await sqlite3.prepare_v2(db, prepared.sql)) {
          yield prepared.stmt;
          sqlite3.finalize(prepared.stmt);
          prepared.stmt = null;
        }
      } finally {
        if (prepared?.stmt) {
          sqlite3.finalize(prepared.stmt);
        }
        sqlite3.str_finish(str);
      }
    }();
  };
  sqlite3.step = function() {
    const fname = "sqlite3_step";
    const f = Module2.cwrap(fname, ...decl("n:n"), { async });
    return async function(stmt) {
      verifyStatement(stmt);
      const result = await f(stmt);
      return check(fname, result, mapStmtToDB.get(stmt), [SQLITE_ROW, SQLITE_DONE]);
    };
  }();
  let stringId = 0;
  const strings = /* @__PURE__ */ new Map();
  sqlite3.str_new = function(db, s = "") {
    const sBytes = Module2.lengthBytesUTF8(s);
    const str = stringId++ & 4294967295;
    const data = {
      offset: Module2._sqlite3_malloc(sBytes + 1),
      bytes: sBytes
    };
    strings.set(str, data);
    Module2.stringToUTF8(s, data.offset, data.bytes + 1);
    return str;
  };
  sqlite3.str_appendall = function(str, s) {
    if (!strings.has(str)) {
      throw new SQLiteError("not a string", SQLITE_MISUSE);
    }
    const data = strings.get(str);
    const sBytes = Module2.lengthBytesUTF8(s);
    const newBytes = data.bytes + sBytes;
    const newOffset = Module2._sqlite3_malloc(newBytes + 1);
    const newArray = Module2.HEAPU8.subarray(newOffset, newOffset + newBytes + 1);
    newArray.set(Module2.HEAPU8.subarray(data.offset, data.offset + data.bytes));
    Module2.stringToUTF8(s, newOffset + data.bytes, sBytes + 1);
    Module2._sqlite3_free(data.offset);
    data.offset = newOffset;
    data.bytes = newBytes;
    strings.set(str, data);
  };
  sqlite3.str_finish = function(str) {
    if (!strings.has(str)) {
      throw new SQLiteError("not a string", SQLITE_MISUSE);
    }
    const data = strings.get(str);
    strings.delete(str);
    Module2._sqlite3_free(data.offset);
  };
  sqlite3.str_value = function(str) {
    if (!strings.has(str)) {
      throw new SQLiteError("not a string", SQLITE_MISUSE);
    }
    return strings.get(str).offset;
  };
  sqlite3.user_data = function(context) {
    return Module2.getFunctionUserData(context);
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
        const hi32 = Module2.getTempRet0();
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
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const nBytes = sqlite3.value_bytes(pValue);
      const address = f(pValue);
      const result = Module2.HEAPU8.subarray(address, address + nBytes);
      return result;
    };
  }();
  sqlite3.value_bytes = function() {
    const fname = "sqlite3_value_bytes";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_double = function() {
    const fname = "sqlite3_value_double";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_int = function() {
    const fname = "sqlite3_value_int64";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_int64 = function() {
    const fname = "sqlite3_value_int64";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const lo32 = f(pValue);
      const hi32 = Module2.getTempRet0();
      const result = cvt32x2ToBigInt(lo32, hi32);
      return result;
    };
  }();
  sqlite3.value_text = function() {
    const fname = "sqlite3_value_text";
    const f = Module2.cwrap(fname, ...decl("n:s"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_type = function() {
    const fname = "sqlite3_value_type";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.vfs_register = function(vfs, makeDefault) {
    const result = Module2.registerVFS(vfs, makeDefault);
    return check("sqlite3_vfs_register", result);
  };
  function check(fname, result, db = null, allowed = [SQLITE_OK]) {
    if (allowed.includes(result))
      return result;
    const message = db ? Module2.ccall("sqlite3_errmsg", "string", ["number"], [db]) : fname;
    throw new SQLiteError(message, result);
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
  const { fileName, sqlite } = await options;
  const db = await sqlite.open_v2(fileName);
  return {
    db,
    sqlite,
    async close() {
      await sqlite.close(db);
    },
    changes() {
      return sqlite.changes(db);
    },
    async lastInsertRowId() {
      return await new Promise((resolve) => sqlite.exec(
        db,
        "SELECT last_insert_rowid()",
        ([id]) => resolve(id)
      ));
    },
    async run(sql2, parameters) {
      const str = sqlite.str_new(db, sql2);
      const prepared = await sqlite.prepare_v2(db, sqlite.str_value(str));
      if (!prepared) {
        return [];
      }
      const stmt = prepared.stmt;
      try {
        parameters?.length && sqlite.bind_collection(stmt, parameters);
        const rows = [];
        const cols = sqlite.column_names(stmt);
        while (await sqlite.step(stmt) === SQLITE_ROW) {
          const row = sqlite.row(stmt);
          rows.push(Object.fromEntries(cols.map((key, i) => [key, row[i]])));
        }
        return rows;
      } finally {
        await sqlite.finalize(stmt);
      }
    }
  };
}
function getAsyncWasmURL() {
  return new URL("" + new URL("wa-sqlite-async-715b3d85.wasm", import.meta.url).href, self.location).href;
}
var Base = class {
  constructor() {
    __publicField(this, "mxPathName", 64);
  }
  /**
   * @param {number} fileId 
   * @returns {number}
   */
  xClose(fileId) {
    return SQLITE_IOERR;
  }
  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  xRead(fileId, pData, iOffset) {
    return SQLITE_IOERR;
  }
  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  xWrite(fileId, pData, iOffset) {
    return SQLITE_IOERR;
  }
  /**
   * @param {number} fileId 
   * @param {number} iSize 
   * @returns {number}
   */
  xTruncate(fileId, iSize) {
    return SQLITE_IOERR;
  }
  /**
   * @param {number} fileId 
   * @param {*} flags 
   * @returns {number}
   */
  xSync(fileId, flags) {
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId 
   * @param {DataView} pSize64 
   * @returns {number}
   */
  xFileSize(fileId, pSize64) {
    return SQLITE_IOERR;
  }
  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {number}
   */
  xLock(fileId, flags) {
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {number}
   */
  xUnlock(fileId, flags) {
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId 
   * @param {DataView} pResOut 
   * @returns {number}
   */
  xCheckReservedLock(fileId, pResOut) {
    pResOut.setInt32(0, 0, true);
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId 
   * @param {number} op 
   * @param {DataView} pArg 
   * @returns {number}
   */
  xFileControl(fileId, op, pArg) {
    return SQLITE_NOTFOUND;
  }
  /**
   * @param {number} fileId 
   * @returns {number}
   */
  xSectorSize(fileId) {
    return 512;
  }
  /**
   * @param {number} fileId 
   * @returns {number}
   */
  xDeviceCharacteristics(fileId) {
    return 0;
  }
  /**
   * @param {string?} name 
   * @param {number} fileId 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {number}
   */
  xOpen(name, fileId, flags, pOutFlags) {
    return SQLITE_CANTOPEN;
  }
  /**
   * @param {string} name 
   * @param {number} syncDir 
   * @returns {number}
   */
  xDelete(name, syncDir) {
    return SQLITE_IOERR;
  }
  /**
   * @param {string} name 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {number}
   */
  xAccess(name, flags, pResOut) {
    return SQLITE_IOERR;
  }
  /**
   * Handle asynchronous operation. This implementation will be overriden on
   * registration by an Asyncify build.
   * @param {function(): Promise<number>} f 
   * @returns {number}
   */
  handleAsync(f) {
    return f();
  }
};
var Module = (() => {
  var _scriptDir = import.meta.url;
  return function(moduleArg = {}) {
    var f = moduleArg, aa, ba;
    f.ready = new Promise((a, b) => {
      aa = a;
      ba = b;
    });
    var ca = Object.assign({}, f), da = "./this.program", ea = (a, b) => {
      throw b;
    }, fa = "object" == typeof window, ia = "function" == typeof importScripts, p2 = "", ja;
    if (fa || ia)
      ia ? p2 = self.location.href : "undefined" != typeof document && document.currentScript && (p2 = document.currentScript.src), _scriptDir && (p2 = _scriptDir), 0 !== p2.indexOf("blob:") ? p2 = p2.substr(0, p2.replace(/[?#].*/, "").lastIndexOf("/") + 1) : p2 = "", ia && (ja = (a) => {
        var b = new XMLHttpRequest();
        b.open("GET", a, false);
        b.responseType = "arraybuffer";
        b.send(null);
        return new Uint8Array(b.response);
      });
    var ka = f.print || console.log.bind(console), t = f.printErr || console.error.bind(console);
    Object.assign(f, ca);
    ca = null;
    f.thisProgram && (da = f.thisProgram);
    f.quit && (ea = f.quit);
    var la;
    f.wasmBinary && (la = f.wasmBinary);
    "object" != typeof WebAssembly && u("no native wasm support detected");
    var ma, v = false, na, w, y, oa, z, B, pa, qa;
    function ra() {
      var a = ma.buffer;
      f.HEAP8 = w = new Int8Array(a);
      f.HEAP16 = oa = new Int16Array(a);
      f.HEAPU8 = y = new Uint8Array(a);
      f.HEAPU16 = new Uint16Array(a);
      f.HEAP32 = z = new Int32Array(a);
      f.HEAPU32 = B = new Uint32Array(a);
      f.HEAPF32 = pa = new Float32Array(a);
      f.HEAPF64 = qa = new Float64Array(a);
    }
    var sa = [], ta = [], ua = [], va = [];
    function wa() {
      var a = f.preRun.shift();
      sa.unshift(a);
    }
    var C = 0, ya = null;
    function u(a) {
      if (f.onAbort)
        f.onAbort(a);
      a = "Aborted(" + a + ")";
      t(a);
      v = true;
      na = 1;
      a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
      ba(a);
      throw a;
    }
    var za = (a) => a.startsWith("data:application/octet-stream;base64,"), Aa;
    if (f.locateFile) {
      if (Aa = "wa-sqlite-async.wasm", !za(Aa)) {
        var Ba = Aa;
        Aa = f.locateFile ? f.locateFile(Ba, p2) : p2 + Ba;
      }
    } else
      Aa = new URL("" + new URL("wa-sqlite-async-715b3d85.wasm", import.meta.url).href, self.location).href;
    function Ca(a) {
      if (a == Aa && la)
        return new Uint8Array(la);
      if (ja)
        return ja(a);
      throw "both async and sync fetching of the wasm failed";
    }
    function Da(a) {
      return la || !fa && !ia || "function" != typeof fetch ? Promise.resolve().then(() => Ca(a)) : fetch(a, { credentials: "same-origin" }).then((b) => {
        if (!b.ok)
          throw "failed to load wasm binary file at '" + a + "'";
        return b.arrayBuffer();
      }).catch(() => Ca(a));
    }
    function Ea(a, b, c) {
      return Da(a).then((d) => WebAssembly.instantiate(d, b)).then((d) => d).then(c, (d) => {
        t(`failed to asynchronously prepare wasm: ${d}`);
        u(d);
      });
    }
    function Fa(a, b) {
      var c = Aa;
      return la || "function" != typeof WebAssembly.instantiateStreaming || za(c) || "function" != typeof fetch ? Ea(c, a, b) : fetch(c, { credentials: "same-origin" }).then((d) => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
        t(`wasm streaming compile failed: ${e}`);
        t("falling back to ArrayBuffer instantiation");
        return Ea(c, a, b);
      }));
    }
    var D, F;
    function Ga(a) {
      this.name = "ExitStatus";
      this.message = `Program terminated with exit(${a})`;
      this.status = a;
    }
    var Ha = (a) => {
      for (; 0 < a.length; )
        a.shift()(f);
    };
    function I(a, b = "i8") {
      b.endsWith("*") && (b = "*");
      switch (b) {
        case "i1":
          return w[a >> 0];
        case "i8":
          return w[a >> 0];
        case "i16":
          return oa[a >> 1];
        case "i32":
          return z[a >> 2];
        case "i64":
          u("to do getValue(i64) use WASM_BIGINT");
        case "float":
          return pa[a >> 2];
        case "double":
          return qa[a >> 3];
        case "*":
          return B[a >> 2];
        default:
          u(`invalid type for getValue: ${b}`);
      }
    }
    var Ia = f.noExitRuntime || true;
    function J(a, b, c = "i8") {
      c.endsWith("*") && (c = "*");
      switch (c) {
        case "i1":
          w[a >> 0] = b;
          break;
        case "i8":
          w[a >> 0] = b;
          break;
        case "i16":
          oa[a >> 1] = b;
          break;
        case "i32":
          z[a >> 2] = b;
          break;
        case "i64":
          u("to do setValue(i64) use WASM_BIGINT");
        case "float":
          pa[a >> 2] = b;
          break;
        case "double":
          qa[a >> 3] = b;
          break;
        case "*":
          B[a >> 2] = b;
          break;
        default:
          u(`invalid type for setValue: ${c}`);
      }
    }
    var Ja = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, K = (a, b, c) => {
      var d = b + c;
      for (c = b; a[c] && !(c >= d); )
        ++c;
      if (16 < c - b && a.buffer && Ja)
        return Ja.decode(a.subarray(b, c));
      for (d = ""; b < c; ) {
        var e = a[b++];
        if (e & 128) {
          var h = a[b++] & 63;
          if (192 == (e & 224))
            d += String.fromCharCode((e & 31) << 6 | h);
          else {
            var g = a[b++] & 63;
            e = 224 == (e & 240) ? (e & 15) << 12 | h << 6 | g : (e & 7) << 18 | h << 12 | g << 6 | a[b++] & 63;
            65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
          }
        } else
          d += String.fromCharCode(e);
      }
      return d;
    }, Ka = (a, b) => {
      for (var c = 0, d = a.length - 1; 0 <= d; d--) {
        var e = a[d];
        "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
      }
      if (b)
        for (; c; c--)
          a.unshift("..");
      return a;
    }, M = (a) => {
      var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
      (a = Ka(a.split("/").filter((d) => !!d), !b).join("/")) || b || (a = ".");
      a && c && (a += "/");
      return (b ? "/" : "") + a;
    }, La = (a) => {
      var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
      a = b[0];
      b = b[1];
      if (!a && !b)
        return ".";
      b && (b = b.substr(0, b.length - 1));
      return a + b;
    }, Ma = (a) => {
      if ("/" === a)
        return "/";
      a = M(a);
      a = a.replace(/\/$/, "");
      var b = a.lastIndexOf("/");
      return -1 === b ? a : a.substr(b + 1);
    }, Na = () => {
      if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues)
        return (a) => crypto.getRandomValues(a);
      u("initRandomDevice");
    }, Oa = (a) => (Oa = Na())(a);
    function Pa() {
      for (var a = "", b = false, c = arguments.length - 1; -1 <= c && !b; c--) {
        b = 0 <= c ? arguments[c] : "/";
        if ("string" != typeof b)
          throw new TypeError("Arguments to path.resolve must be strings");
        if (!b)
          return "";
        a = b + "/" + a;
        b = "/" === b.charAt(0);
      }
      a = Ka(a.split("/").filter((d) => !!d), !b).join("/");
      return (b ? "/" : "") + a || ".";
    }
    var Qa = [], Ra = (a) => {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
      }
      return b;
    }, Sa = (a, b, c, d) => {
      if (!(0 < d))
        return 0;
      var e = c;
      d = c + d - 1;
      for (var h = 0; h < a.length; ++h) {
        var g = a.charCodeAt(h);
        if (55296 <= g && 57343 >= g) {
          var n = a.charCodeAt(++h);
          g = 65536 + ((g & 1023) << 10) | n & 1023;
        }
        if (127 >= g) {
          if (c >= d)
            break;
          b[c++] = g;
        } else {
          if (2047 >= g) {
            if (c + 1 >= d)
              break;
            b[c++] = 192 | g >> 6;
          } else {
            if (65535 >= g) {
              if (c + 2 >= d)
                break;
              b[c++] = 224 | g >> 12;
            } else {
              if (c + 3 >= d)
                break;
              b[c++] = 240 | g >> 18;
              b[c++] = 128 | g >> 12 & 63;
            }
            b[c++] = 128 | g >> 6 & 63;
          }
          b[c++] = 128 | g & 63;
        }
      }
      b[c] = 0;
      return c - e;
    }, Ta = [];
    function Ua(a, b) {
      Ta[a] = { input: [], Rb: [], bc: b };
      Va(a, Wa);
    }
    var Wa = { open(a) {
      var b = Ta[a.node.ec];
      if (!b)
        throw new N(43);
      a.Sb = b;
      a.seekable = false;
    }, close(a) {
      a.Sb.bc.ic(a.Sb);
    }, ic(a) {
      a.Sb.bc.ic(a.Sb);
    }, read(a, b, c, d) {
      if (!a.Sb || !a.Sb.bc.xc)
        throw new N(60);
      for (var e = 0, h = 0; h < d; h++) {
        try {
          var g = a.Sb.bc.xc(a.Sb);
        } catch (n) {
          throw new N(29);
        }
        if (void 0 === g && 0 === e)
          throw new N(6);
        if (null === g || void 0 === g)
          break;
        e++;
        b[c + h] = g;
      }
      e && (a.node.timestamp = Date.now());
      return e;
    }, write(a, b, c, d) {
      if (!a.Sb || !a.Sb.bc.rc)
        throw new N(60);
      try {
        for (var e = 0; e < d; e++)
          a.Sb.bc.rc(a.Sb, b[c + e]);
      } catch (h) {
        throw new N(29);
      }
      d && (a.node.timestamp = Date.now());
      return e;
    } }, Xa = { xc() {
      a: {
        if (!Qa.length) {
          var a = null;
          "undefined" != typeof window && "function" == typeof window.prompt ? (a = window.prompt("Input: "), null !== a && (a += "\n")) : "function" == typeof readline && (a = readline(), null !== a && (a += "\n"));
          if (!a) {
            var b = null;
            break a;
          }
          b = Array(Ra(a) + 1);
          a = Sa(a, b, 0, b.length);
          b.length = a;
          Qa = b;
        }
        b = Qa.shift();
      }
      return b;
    }, rc(a, b) {
      null === b || 10 === b ? (ka(K(a.Rb, 0)), a.Rb = []) : 0 != b && a.Rb.push(b);
    }, ic(a) {
      a.Rb && 0 < a.Rb.length && (ka(K(a.Rb, 0)), a.Rb = []);
    }, Yc() {
      return {
        Uc: 25856,
        Wc: 5,
        Tc: 191,
        Vc: 35387,
        Sc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      };
    }, Zc() {
      return 0;
    }, $c() {
      return [24, 80];
    } }, Ya = { rc(a, b) {
      null === b || 10 === b ? (t(K(a.Rb, 0)), a.Rb = []) : 0 != b && a.Rb.push(b);
    }, ic(a) {
      a.Rb && 0 < a.Rb.length && (t(K(a.Rb, 0)), a.Rb = []);
    } };
    function Za(a, b) {
      var c = a.Nb ? a.Nb.length : 0;
      c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.Nb, a.Nb = new Uint8Array(b), 0 < a.Pb && a.Nb.set(c.subarray(0, a.Pb), 0));
    }
    var O = { Vb: null, Ub() {
      return O.createNode(null, "/", 16895, 0);
    }, createNode(a, b, c, d) {
      if (24576 === (c & 61440) || 4096 === (c & 61440))
        throw new N(63);
      O.Vb || (O.Vb = { dir: { node: { Tb: O.Cb.Tb, Qb: O.Cb.Qb, cc: O.Cb.cc, jc: O.Cb.jc, Bc: O.Cb.Bc, oc: O.Cb.oc, mc: O.Cb.mc, Ac: O.Cb.Ac, nc: O.Cb.nc }, stream: { Zb: O.Mb.Zb } }, file: { node: { Tb: O.Cb.Tb, Qb: O.Cb.Qb }, stream: { Zb: O.Mb.Zb, read: O.Mb.read, write: O.Mb.write, uc: O.Mb.uc, kc: O.Mb.kc, lc: O.Mb.lc } }, link: { node: { Tb: O.Cb.Tb, Qb: O.Cb.Qb, fc: O.Cb.fc }, stream: {} }, vc: { node: { Tb: O.Cb.Tb, Qb: O.Cb.Qb }, stream: $a } });
      c = ab(a, b, c, d);
      P(c.mode) ? (c.Cb = O.Vb.dir.node, c.Mb = O.Vb.dir.stream, c.Nb = {}) : 32768 === (c.mode & 61440) ? (c.Cb = O.Vb.file.node, c.Mb = O.Vb.file.stream, c.Pb = 0, c.Nb = null) : 40960 === (c.mode & 61440) ? (c.Cb = O.Vb.link.node, c.Mb = O.Vb.link.stream) : 8192 === (c.mode & 61440) && (c.Cb = O.Vb.vc.node, c.Mb = O.Vb.vc.stream);
      c.timestamp = Date.now();
      a && (a.Nb[b] = c, a.timestamp = c.timestamp);
      return c;
    }, Xc(a) {
      return a.Nb ? a.Nb.subarray ? a.Nb.subarray(0, a.Pb) : new Uint8Array(a.Nb) : new Uint8Array(0);
    }, Cb: { Tb(a) {
      var b = {};
      b.Hc = 8192 === (a.mode & 61440) ? a.id : 1;
      b.yc = a.id;
      b.mode = a.mode;
      b.Nc = 1;
      b.uid = 0;
      b.Kc = 0;
      b.ec = a.ec;
      P(a.mode) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.Pb : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
      b.Dc = new Date(a.timestamp);
      b.Mc = new Date(a.timestamp);
      b.Gc = new Date(a.timestamp);
      b.Ec = 4096;
      b.Fc = Math.ceil(b.size / b.Ec);
      return b;
    }, Qb(a, b) {
      void 0 !== b.mode && (a.mode = b.mode);
      void 0 !== b.timestamp && (a.timestamp = b.timestamp);
      if (void 0 !== b.size && (b = b.size, a.Pb != b))
        if (0 == b)
          a.Nb = null, a.Pb = 0;
        else {
          var c = a.Nb;
          a.Nb = new Uint8Array(b);
          c && a.Nb.set(c.subarray(
            0,
            Math.min(b, a.Pb)
          ));
          a.Pb = b;
        }
    }, cc() {
      throw bb[44];
    }, jc(a, b, c, d) {
      return O.createNode(a, b, c, d);
    }, Bc(a, b, c) {
      if (P(a.mode)) {
        try {
          var d = cb(b, c);
        } catch (h) {
        }
        if (d)
          for (var e in d.Nb)
            throw new N(55);
      }
      delete a.parent.Nb[a.name];
      a.parent.timestamp = Date.now();
      a.name = c;
      b.Nb[c] = a;
      b.timestamp = a.parent.timestamp;
      a.parent = b;
    }, oc(a, b) {
      delete a.Nb[b];
      a.timestamp = Date.now();
    }, mc(a, b) {
      var c = cb(a, b), d;
      for (d in c.Nb)
        throw new N(55);
      delete a.Nb[b];
      a.timestamp = Date.now();
    }, Ac(a) {
      var b = [".", ".."], c;
      for (c in a.Nb)
        a.Nb.hasOwnProperty(c) && b.push(c);
      return b;
    }, nc(a, b, c) {
      a = O.createNode(a, b, 41471, 0);
      a.link = c;
      return a;
    }, fc(a) {
      if (40960 !== (a.mode & 61440))
        throw new N(28);
      return a.link;
    } }, Mb: { read(a, b, c, d, e) {
      var h = a.node.Nb;
      if (e >= a.node.Pb)
        return 0;
      a = Math.min(a.node.Pb - e, d);
      if (8 < a && h.subarray)
        b.set(h.subarray(e, e + a), c);
      else
        for (d = 0; d < a; d++)
          b[c + d] = h[e + d];
      return a;
    }, write(a, b, c, d, e, h) {
      b.buffer === w.buffer && (h = false);
      if (!d)
        return 0;
      a = a.node;
      a.timestamp = Date.now();
      if (b.subarray && (!a.Nb || a.Nb.subarray)) {
        if (h)
          return a.Nb = b.subarray(c, c + d), a.Pb = d;
        if (0 === a.Pb && 0 === e)
          return a.Nb = b.slice(c, c + d), a.Pb = d;
        if (e + d <= a.Pb)
          return a.Nb.set(b.subarray(c, c + d), e), d;
      }
      Za(a, e + d);
      if (a.Nb.subarray && b.subarray)
        a.Nb.set(b.subarray(c, c + d), e);
      else
        for (h = 0; h < d; h++)
          a.Nb[e + h] = b[c + h];
      a.Pb = Math.max(a.Pb, e + d);
      return d;
    }, Zb(a, b, c) {
      1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.Pb);
      if (0 > b)
        throw new N(28);
      return b;
    }, uc(a, b, c) {
      Za(a.node, b + c);
      a.node.Pb = Math.max(a.node.Pb, b + c);
    }, kc(a, b, c, d, e) {
      if (32768 !== (a.node.mode & 61440))
        throw new N(43);
      a = a.node.Nb;
      if (e & 2 || a.buffer !== w.buffer) {
        if (0 < c || c + b < a.length)
          a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
        c = true;
        b = 65536 * Math.ceil(b / 65536);
        (e = db(65536, b)) ? (y.fill(0, e, e + b), b = e) : b = 0;
        if (!b)
          throw new N(48);
        w.set(a, b);
      } else
        c = false, b = a.byteOffset;
      return { Oc: b, Cc: c };
    }, lc(a, b, c, d) {
      O.Mb.write(a, b, 0, d, c, false);
      return 0;
    } } }, eb = (a, b) => {
      var c = 0;
      a && (c |= 365);
      b && (c |= 146);
      return c;
    }, fb = null, gb = {}, hb = [], ib = 1, Q = null, jb = true, N = null, bb = {};
    function R(a, b = {}) {
      a = Pa(a);
      if (!a)
        return { path: "", node: null };
      b = Object.assign({ wc: true, sc: 0 }, b);
      if (8 < b.sc)
        throw new N(32);
      a = a.split("/").filter((g) => !!g);
      for (var c = fb, d = "/", e = 0; e < a.length; e++) {
        var h = e === a.length - 1;
        if (h && b.parent)
          break;
        c = cb(c, a[e]);
        d = M(d + "/" + a[e]);
        c.$b && (!h || h && b.wc) && (c = c.$b.root);
        if (!h || b.Yb) {
          for (h = 0; 40960 === (c.mode & 61440); )
            if (c = kb(d), d = Pa(La(d), c), c = R(d, { sc: b.sc + 1 }).node, 40 < h++)
              throw new N(32);
        }
      }
      return { path: d, node: c };
    }
    function lb(a) {
      for (var b; ; ) {
        if (a === a.parent)
          return a = a.Ub.zc, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
        b = b ? `${a.name}/${b}` : a.name;
        a = a.parent;
      }
    }
    function mb(a, b) {
      for (var c = 0, d = 0; d < b.length; d++)
        c = (c << 5) - c + b.charCodeAt(d) | 0;
      return (a + c >>> 0) % Q.length;
    }
    function nb(a) {
      var b = mb(a.parent.id, a.name);
      if (Q[b] === a)
        Q[b] = a.ac;
      else
        for (b = Q[b]; b; ) {
          if (b.ac === a) {
            b.ac = a.ac;
            break;
          }
          b = b.ac;
        }
    }
    function cb(a, b) {
      var c;
      if (c = (c = ob(a, "x")) ? c : a.Cb.cc ? 0 : 2)
        throw new N(c, a);
      for (c = Q[mb(a.id, b)]; c; c = c.ac) {
        var d = c.name;
        if (c.parent.id === a.id && d === b)
          return c;
      }
      return a.Cb.cc(a, b);
    }
    function ab(a, b, c, d) {
      a = new pb(a, b, c, d);
      b = mb(a.parent.id, a.name);
      a.ac = Q[b];
      return Q[b] = a;
    }
    function P(a) {
      return 16384 === (a & 61440);
    }
    function qb(a) {
      var b = ["r", "w", "rw"][a & 3];
      a & 512 && (b += "w");
      return b;
    }
    function ob(a, b) {
      if (jb)
        return 0;
      if (!b.includes("r") || a.mode & 292) {
        if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73))
          return 2;
      } else
        return 2;
      return 0;
    }
    function rb(a, b) {
      try {
        return cb(a, b), 20;
      } catch (c) {
      }
      return ob(a, "wx");
    }
    function sb(a, b, c) {
      try {
        var d = cb(a, b);
      } catch (e) {
        return e.Ob;
      }
      if (a = ob(a, "wx"))
        return a;
      if (c) {
        if (!P(d.mode))
          return 54;
        if (d === d.parent || "/" === lb(d))
          return 10;
      } else if (P(d.mode))
        return 31;
      return 0;
    }
    function tb() {
      for (var a = 0; 4096 >= a; a++)
        if (!hb[a])
          return a;
      throw new N(33);
    }
    function S(a) {
      a = hb[a];
      if (!a)
        throw new N(8);
      return a;
    }
    function ub(a, b = -1) {
      vb || (vb = function() {
        this.hc = {};
      }, vb.prototype = {}, Object.defineProperties(vb.prototype, { object: { get() {
        return this.node;
      }, set(c) {
        this.node = c;
      } }, flags: { get() {
        return this.hc.flags;
      }, set(c) {
        this.hc.flags = c;
      } }, position: { get() {
        return this.hc.position;
      }, set(c) {
        this.hc.position = c;
      } } }));
      a = Object.assign(new vb(), a);
      -1 == b && (b = tb());
      a.Wb = b;
      return hb[b] = a;
    }
    var $a = { open(a) {
      a.Mb = gb[a.node.ec].Mb;
      a.Mb.open && a.Mb.open(a);
    }, Zb() {
      throw new N(70);
    } };
    function Va(a, b) {
      gb[a] = { Mb: b };
    }
    function wb(a, b) {
      var c = "/" === b, d = !b;
      if (c && fb)
        throw new N(10);
      if (!c && !d) {
        var e = R(b, { wc: false });
        b = e.path;
        e = e.node;
        if (e.$b)
          throw new N(10);
        if (!P(e.mode))
          throw new N(54);
      }
      b = { type: a, bd: {}, zc: b, Lc: [] };
      a = a.Ub(b);
      a.Ub = b;
      b.root = a;
      c ? fb = a : e && (e.$b = b, e.Ub && e.Ub.Lc.push(b));
    }
    function xb(a, b, c) {
      var d = R(a, { parent: true }).node;
      a = Ma(a);
      if (!a || "." === a || ".." === a)
        throw new N(28);
      var e = rb(d, a);
      if (e)
        throw new N(e);
      if (!d.Cb.jc)
        throw new N(63);
      return d.Cb.jc(d, a, b, c);
    }
    function T(a, b) {
      return xb(a, (void 0 !== b ? b : 511) & 1023 | 16384, 0);
    }
    function yb(a, b, c) {
      "undefined" == typeof c && (c = b, b = 438);
      xb(a, b | 8192, c);
    }
    function zb(a, b) {
      if (!Pa(a))
        throw new N(44);
      var c = R(b, { parent: true }).node;
      if (!c)
        throw new N(44);
      b = Ma(b);
      var d = rb(c, b);
      if (d)
        throw new N(d);
      if (!c.Cb.nc)
        throw new N(63);
      c.Cb.nc(c, b, a);
    }
    function Ab(a) {
      var b = R(a, { parent: true }).node;
      a = Ma(a);
      var c = cb(b, a), d = sb(b, a, true);
      if (d)
        throw new N(d);
      if (!b.Cb.mc)
        throw new N(63);
      if (c.$b)
        throw new N(10);
      b.Cb.mc(b, a);
      nb(c);
    }
    function kb(a) {
      a = R(a).node;
      if (!a)
        throw new N(44);
      if (!a.Cb.fc)
        throw new N(28);
      return Pa(lb(a.parent), a.Cb.fc(a));
    }
    function Bb(a, b) {
      a = R(a, { Yb: !b }).node;
      if (!a)
        throw new N(44);
      if (!a.Cb.Tb)
        throw new N(63);
      return a.Cb.Tb(a);
    }
    function Cb(a) {
      return Bb(a, true);
    }
    function Db(a, b) {
      a = "string" == typeof a ? R(a, { Yb: true }).node : a;
      if (!a.Cb.Qb)
        throw new N(63);
      a.Cb.Qb(a, { mode: b & 4095 | a.mode & -4096, timestamp: Date.now() });
    }
    function Eb(a, b) {
      if (0 > b)
        throw new N(28);
      a = "string" == typeof a ? R(a, { Yb: true }).node : a;
      if (!a.Cb.Qb)
        throw new N(63);
      if (P(a.mode))
        throw new N(31);
      if (32768 !== (a.mode & 61440))
        throw new N(28);
      var c = ob(a, "w");
      if (c)
        throw new N(c);
      a.Cb.Qb(a, { size: b, timestamp: Date.now() });
    }
    function Fb(a, b, c) {
      if ("" === a)
        throw new N(44);
      if ("string" == typeof b) {
        var d = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[b];
        if ("undefined" == typeof d)
          throw Error(`Unknown file open mode: ${b}`);
        b = d;
      }
      c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
      if ("object" == typeof a)
        var e = a;
      else {
        a = M(a);
        try {
          e = R(a, { Yb: !(b & 131072) }).node;
        } catch (h) {
        }
      }
      d = false;
      if (b & 64)
        if (e) {
          if (b & 128)
            throw new N(20);
        } else
          e = xb(a, c, 0), d = true;
      if (!e)
        throw new N(44);
      8192 === (e.mode & 61440) && (b &= -513);
      if (b & 65536 && !P(e.mode))
        throw new N(54);
      if (!d && (c = e ? 40960 === (e.mode & 61440) ? 32 : P(e.mode) && ("r" !== qb(b) || b & 512) ? 31 : ob(e, qb(b)) : 44))
        throw new N(c);
      b & 512 && !d && Eb(e, 0);
      b &= -131713;
      e = ub({ node: e, path: lb(e), flags: b, seekable: true, position: 0, Mb: e.Mb, Rc: [], error: false });
      e.Mb.open && e.Mb.open(e);
      !f.logReadFiles || b & 1 || (Gb || (Gb = {}), a in Gb || (Gb[a] = 1));
      return e;
    }
    function Hb(a, b, c) {
      if (null === a.Wb)
        throw new N(8);
      if (!a.seekable || !a.Mb.Zb)
        throw new N(70);
      if (0 != c && 1 != c && 2 != c)
        throw new N(28);
      a.position = a.Mb.Zb(a, b, c);
      a.Rc = [];
    }
    function Ib() {
      N || (N = function(a, b) {
        this.name = "ErrnoError";
        this.node = b;
        this.Pc = function(c) {
          this.Ob = c;
        };
        this.Pc(a);
        this.message = "FS error";
      }, N.prototype = Error(), N.prototype.constructor = N, [44].forEach((a) => {
        bb[a] = new N(a);
        bb[a].stack = "<generic error, no stack>";
      }));
    }
    var Jb;
    function Kb(a, b, c) {
      a = M("/dev/" + a);
      var d = eb(!!b, !!c);
      Lb || (Lb = 64);
      var e = Lb++ << 8 | 0;
      Va(e, { open(h) {
        h.seekable = false;
      }, close() {
        c && c.buffer && c.buffer.length && c(10);
      }, read(h, g, n, k) {
        for (var l = 0, r = 0; r < k; r++) {
          try {
            var m = b();
          } catch (q) {
            throw new N(29);
          }
          if (void 0 === m && 0 === l)
            throw new N(6);
          if (null === m || void 0 === m)
            break;
          l++;
          g[n + r] = m;
        }
        l && (h.node.timestamp = Date.now());
        return l;
      }, write(h, g, n, k) {
        for (var l = 0; l < k; l++)
          try {
            c(g[n + l]);
          } catch (r) {
            throw new N(29);
          }
        k && (h.node.timestamp = Date.now());
        return l;
      } });
      yb(a, d, e);
    }
    var Lb, U = {}, vb, Gb;
    function Mb(a, b, c) {
      if ("/" === b.charAt(0))
        return b;
      a = -100 === a ? "/" : S(a).path;
      if (0 == b.length) {
        if (!c)
          throw new N(44);
        return a;
      }
      return M(a + "/" + b);
    }
    function Nb(a, b, c) {
      try {
        var d = a(b);
      } catch (h) {
        if (h && h.node && M(b) !== M(lb(h.node)))
          return -54;
        throw h;
      }
      z[c >> 2] = d.Hc;
      z[c + 4 >> 2] = d.mode;
      B[c + 8 >> 2] = d.Nc;
      z[c + 12 >> 2] = d.uid;
      z[c + 16 >> 2] = d.Kc;
      z[c + 20 >> 2] = d.ec;
      F = [d.size >>> 0, (D = d.size, 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
      z[c + 24 >> 2] = F[0];
      z[c + 28 >> 2] = F[1];
      z[c + 32 >> 2] = 4096;
      z[c + 36 >> 2] = d.Fc;
      a = d.Dc.getTime();
      b = d.Mc.getTime();
      var e = d.Gc.getTime();
      F = [Math.floor(a / 1e3) >>> 0, (D = Math.floor(a / 1e3), 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
      z[c + 40 >> 2] = F[0];
      z[c + 44 >> 2] = F[1];
      B[c + 48 >> 2] = a % 1e3 * 1e3;
      F = [Math.floor(b / 1e3) >>> 0, (D = Math.floor(b / 1e3), 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
      z[c + 56 >> 2] = F[0];
      z[c + 60 >> 2] = F[1];
      B[c + 64 >> 2] = b % 1e3 * 1e3;
      F = [Math.floor(e / 1e3) >>> 0, (D = Math.floor(e / 1e3), 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
      z[c + 72 >> 2] = F[0];
      z[c + 76 >> 2] = F[1];
      B[c + 80 >> 2] = e % 1e3 * 1e3;
      F = [d.yc >>> 0, (D = d.yc, 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
      z[c + 88 >> 2] = F[0];
      z[c + 92 >> 2] = F[1];
      return 0;
    }
    var Ob = void 0;
    function Pb() {
      var a = z[+Ob >> 2];
      Ob += 4;
      return a;
    }
    var Qb = (a, b) => b + 2097152 >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN, Rb = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Sb = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Ub = (a) => {
      var b = Ra(a) + 1, c = Tb(b);
      c && Sa(a, y, c, b);
      return c;
    }, Vb = {}, Xb = () => {
      if (!Wb) {
        var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: da || "./this.program" }, b;
        for (b in Vb)
          void 0 === Vb[b] ? delete a[b] : a[b] = Vb[b];
        var c = [];
        for (b in a)
          c.push(`${b}=${a[b]}`);
        Wb = c;
      }
      return Wb;
    }, Wb;
    function Yb() {
    }
    function Zb() {
    }
    function $b() {
    }
    function ac() {
    }
    function bc() {
    }
    function cc() {
    }
    function dc() {
    }
    function ec() {
    }
    function fc() {
    }
    function gc() {
    }
    function hc() {
    }
    function ic() {
    }
    function jc() {
    }
    function kc() {
    }
    function lc() {
    }
    function mc() {
    }
    function nc() {
    }
    function oc() {
    }
    function pc() {
    }
    function qc() {
    }
    function rc() {
    }
    function sc() {
    }
    function tc() {
    }
    function uc() {
    }
    function vc() {
    }
    function wc() {
    }
    function xc() {
    }
    function yc() {
    }
    function zc() {
    }
    function Ac() {
    }
    function Bc() {
    }
    function Cc() {
    }
    function Dc() {
    }
    function Ec() {
    }
    function Fc() {
    }
    function Gc() {
    }
    function Hc() {
    }
    function Ic() {
    }
    function Jc() {
    }
    var Kc = 0, Lc = (a) => {
      na = a;
      if (!(Ia || 0 < Kc)) {
        if (f.onExit)
          f.onExit(a);
        v = true;
      }
      ea(a, new Ga(a));
    }, Mc = (a) => {
      a instanceof Ga || "unwind" == a || ea(1, a);
    }, Nc = (a) => {
      try {
        a();
      } catch (b) {
        u(b);
      }
    };
    function Oc() {
      var a = V, b = {}, c;
      for (c in a)
        (function(d) {
          var e = a[d];
          b[d] = "function" == typeof e ? function() {
            Pc.push(d);
            try {
              return e.apply(null, arguments);
            } finally {
              v || (Pc.pop() === d || u(), X && 1 === Y && 0 === Pc.length && (Y = 0, Nc(Qc), "undefined" != typeof Fibers && Fibers.cd()));
            }
          } : e;
        })(c);
      return b;
    }
    var Y = 0, X = null, Rc = 0, Pc = [], Sc = {}, Tc = {}, Uc = 0, Vc = null, Wc = [];
    function Xc() {
      return new Promise((a, b) => {
        Vc = { resolve: a, reject: b };
      });
    }
    function Yc() {
      var a = Tb(16396), b = a + 12;
      B[a >> 2] = b;
      B[a + 4 >> 2] = b + 16384;
      b = Pc[0];
      var c = Sc[b];
      void 0 === c && (c = Uc++, Sc[b] = c, Tc[c] = b);
      z[a + 8 >> 2] = c;
      return a;
    }
    function Zc(a) {
      if (!v) {
        if (0 === Y) {
          var b = false, c = false;
          a((d = 0) => {
            if (!v && (Rc = d, b = true, c)) {
              Y = 2;
              Nc(() => $c(X));
              "undefined" != typeof Browser && Browser.qc.Jc && Browser.qc.resume();
              d = false;
              try {
                var e = (0, V[Tc[z[X + 8 >> 2]]])();
              } catch (n) {
                e = n, d = true;
              }
              var h = false;
              if (!X) {
                var g = Vc;
                g && (Vc = null, (d ? g.reject : g.resolve)(e), h = true);
              }
              if (d && !h)
                throw e;
            }
          });
          c = true;
          b || (Y = 1, X = Yc(), "undefined" != typeof Browser && Browser.qc.Jc && Browser.qc.pause(), Nc(() => ad(X)));
        } else
          2 === Y ? (Y = 0, Nc(bd), cd(X), X = null, Wc.forEach((d) => {
            if (!v)
              try {
                if (d(), !(Ia || 0 < Kc))
                  try {
                    na = d = na, Lc(d);
                  } catch (e) {
                    Mc(e);
                  }
              } catch (e) {
                Mc(e);
              }
          })) : u(`invalid state: ${Y}`);
        return Rc;
      }
    }
    function dd(a) {
      return Zc((b) => {
        a().then(b);
      });
    }
    var ed = {}, Z = (a, b, c, d, e) => {
      function h(m) {
        --Kc;
        0 !== k && fd(k);
        return "string" === b ? m ? K(y, m) : "" : "boolean" === b ? !!m : m;
      }
      var g = { string: (m) => {
        var q = 0;
        if (null !== m && void 0 !== m && 0 !== m) {
          q = Ra(m) + 1;
          var x = gd(q);
          Sa(m, y, x, q);
          q = x;
        }
        return q;
      }, array: (m) => {
        var q = gd(m.length);
        w.set(m, q);
        return q;
      } };
      a = f["_" + a];
      var n = [], k = 0;
      if (d)
        for (var l = 0; l < d.length; l++) {
          var r = g[c[l]];
          r ? (0 === k && (k = hd()), n[l] = r(d[l])) : n[l] = d[l];
        }
      c = X;
      d = a.apply(null, n);
      e = e && e.async;
      Kc += 1;
      if (X != c)
        return Xc().then(h);
      d = h(d);
      return e ? Promise.resolve(d) : d;
    };
    function pb(a, b, c, d) {
      a || (a = this);
      this.parent = a;
      this.Ub = a.Ub;
      this.$b = null;
      this.id = ib++;
      this.name = b;
      this.mode = c;
      this.Cb = {};
      this.Mb = {};
      this.ec = d;
    }
    Object.defineProperties(pb.prototype, { read: { get: function() {
      return 365 === (this.mode & 365);
    }, set: function(a) {
      a ? this.mode |= 365 : this.mode &= -366;
    } }, write: { get: function() {
      return 146 === (this.mode & 146);
    }, set: function(a) {
      a ? this.mode |= 146 : this.mode &= -147;
    } } });
    Ib();
    Q = Array(4096);
    wb(O, "/");
    T("/tmp");
    T("/home");
    T("/home/web_user");
    (function() {
      T("/dev");
      Va(259, { read: () => 0, write: (d, e, h, g) => g });
      yb("/dev/null", 259);
      Ua(1280, Xa);
      Ua(1536, Ya);
      yb("/dev/tty", 1280);
      yb("/dev/tty1", 1536);
      var a = new Uint8Array(1024), b = 0, c = () => {
        0 === b && (b = Oa(a).byteLength);
        return a[--b];
      };
      Kb("random", c);
      Kb("urandom", c);
      T("/dev/shm");
      T("/dev/shm/tmp");
    })();
    (function() {
      T("/proc");
      var a = T("/proc/self");
      T("/proc/self/fd");
      wb({ Ub() {
        var b = ab(a, "fd", 16895, 73);
        b.Cb = { cc(c, d) {
          var e = S(+d);
          c = { parent: null, Ub: { zc: "fake" }, Cb: { fc: () => e.path } };
          return c.parent = c;
        } };
        return b;
      } }, "/proc/self/fd");
    })();
    (function() {
      const a = /* @__PURE__ */ new Map();
      f.setAuthorizer = function(b, c, d) {
        c ? a.set(b, { f: c, tc: d }) : a.delete(b);
        return Z("set_authorizer", "number", ["number"], [b]);
      };
      Yb = function(b, c, d, e, h, g) {
        if (a.has(b)) {
          const { f: n, tc: k } = a.get(b);
          return n(k, c, d ? d ? K(y, d) : "" : null, e ? e ? K(y, e) : "" : null, h ? h ? K(y, h) : "" : null, g ? g ? K(y, g) : "" : null);
        }
        return 0;
      };
    })();
    (function() {
      const a = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map();
      f.createFunction = function(c, d, e, h, g, n) {
        const k = a.size;
        a.set(k, { f: n, Xb: g });
        return Z("create_function", "number", "number string number number number number".split(" "), [c, d, e, h, k, 0]);
      };
      f.createAggregate = function(c, d, e, h, g, n, k) {
        const l = a.size;
        a.set(l, { step: n, Ic: k, Xb: g });
        return Z("create_function", "number", "number string number number number number".split(" "), [c, d, e, h, l, 1]);
      };
      f.getFunctionUserData = function(c) {
        return b.get(c);
      };
      $b = function(c, d, e, h) {
        c = a.get(c);
        b.set(
          d,
          c.Xb
        );
        c.f(d, new Uint32Array(y.buffer, h, e));
        b.delete(d);
      };
      bc = function(c, d, e, h) {
        c = a.get(c);
        b.set(d, c.Xb);
        c.step(d, new Uint32Array(y.buffer, h, e));
        b.delete(d);
      };
      Zb = function(c, d) {
        c = a.get(c);
        b.set(d, c.Xb);
        c.Ic(d);
        b.delete(d);
      };
    })();
    (function() {
      const a = /* @__PURE__ */ new Map();
      f.progressHandler = function(b, c, d, e) {
        d ? a.set(b, { f: d, tc: e }) : a.delete(b);
        return Z("progress_handler", null, ["number", "number"], [b, c]);
      };
      ac = function(b) {
        if (a.has(b)) {
          const { f: c, tc: d } = a.get(b);
          return c(d);
        }
        return 0;
      };
    })();
    (function() {
      function a(k, l) {
        const r = `get${k}`, m = `set${k}`;
        return new Proxy(new DataView(y.buffer, l, "Int32" === k ? 4 : 8), { get(q, x) {
          if (x === r)
            return function(A, G) {
              if (!G)
                throw Error("must be little endian");
              return q[x](A, G);
            };
          if (x === m)
            return function(A, G, E) {
              if (!E)
                throw Error("must be little endian");
              return q[x](A, G, E);
            };
          if ("string" === typeof x && x.match(/^(get)|(set)/))
            throw Error("invalid type");
          return q[x];
        } });
      }
      const b = "object" === typeof ed, c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map(), h = b ? /* @__PURE__ */ new Set() : null, g = b ? /* @__PURE__ */ new Set() : null, n = /* @__PURE__ */ new Map();
      sc = function(k, l, r, m) {
        n.set(k ? K(y, k) : "", { size: l, dc: Array.from(new Uint32Array(y.buffer, m, r)) });
      };
      f.createModule = function(k, l, r, m) {
        b && (r.handleAsync = dd);
        const q = c.size;
        c.set(q, { module: r, Xb: m });
        m = 0;
        r.xCreate && (m |= 1);
        r.xConnect && (m |= 2);
        r.xBestIndex && (m |= 4);
        r.xDisconnect && (m |= 8);
        r.xDestroy && (m |= 16);
        r.xOpen && (m |= 32);
        r.xClose && (m |= 64);
        r.xFilter && (m |= 128);
        r.xNext && (m |= 256);
        r.xEof && (m |= 512);
        r.xColumn && (m |= 1024);
        r.xRowid && (m |= 2048);
        r.xUpdate && (m |= 4096);
        r.xBegin && (m |= 8192);
        r.xSync && (m |= 16384);
        r.xCommit && (m |= 32768);
        r.xRollback && (m |= 65536);
        r.xFindFunction && (m |= 131072);
        r.xRename && (m |= 262144);
        return Z("create_module", "number", ["number", "string", "number", "number"], [k, l, q, m]);
      };
      ic = function(k, l, r, m, q, x) {
        l = c.get(l);
        d.set(q, l);
        if (b) {
          h.delete(q);
          for (const A of h)
            d.delete(A);
        }
        m = Array.from(new Uint32Array(y.buffer, m, r)).map((A) => A ? K(y, A) : "");
        return l.module.xCreate(k, l.Xb, m, q, a("Int32", x));
      };
      hc = function(k, l, r, m, q, x) {
        l = c.get(l);
        d.set(q, l);
        if (b) {
          h.delete(q);
          for (const A of h)
            d.delete(A);
        }
        m = Array.from(new Uint32Array(
          y.buffer,
          m,
          r
        )).map((A) => A ? K(y, A) : "");
        return l.module.xConnect(k, l.Xb, m, q, a("Int32", x));
      };
      dc = function(k, l) {
        var r = d.get(k), m = n.get("sqlite3_index_info").dc;
        const q = {};
        q.nConstraint = I(l + m[0], "i32");
        q.aConstraint = [];
        var x = I(l + m[1], "*"), A = n.get("sqlite3_index_constraint").size;
        for (var G = 0; G < q.nConstraint; ++G) {
          var E = q.aConstraint, L = E.push, H = x + G * A, ha = n.get("sqlite3_index_constraint").dc, W = {};
          W.iColumn = I(H + ha[0], "i32");
          W.op = I(H + ha[1], "i8");
          W.usable = !!I(H + ha[2], "i8");
          L.call(E, W);
        }
        q.nOrderBy = I(l + m[2], "i32");
        q.aOrderBy = [];
        x = I(l + m[3], "*");
        A = n.get("sqlite3_index_orderby").size;
        for (G = 0; G < q.nOrderBy; ++G)
          E = q.aOrderBy, L = E.push, H = x + G * A, ha = n.get("sqlite3_index_orderby").dc, W = {}, W.iColumn = I(H + ha[0], "i32"), W.desc = !!I(H + ha[1], "i8"), L.call(E, W);
        q.aConstraintUsage = [];
        for (x = 0; x < q.nConstraint; ++x)
          q.aConstraintUsage.push({ argvIndex: 0, omit: false });
        q.idxNum = I(l + m[5], "i32");
        q.idxStr = null;
        q.orderByConsumed = !!I(l + m[8], "i8");
        q.estimatedCost = I(l + m[9], "double");
        q.estimatedRows = I(l + m[10], "i32");
        q.idxFlags = I(l + m[11], "i32");
        q.colUsed = I(
          l + m[12],
          "i32"
        );
        k = r.module.xBestIndex(k, q);
        r = n.get("sqlite3_index_info").dc;
        m = I(l + r[4], "*");
        x = n.get("sqlite3_index_constraint_usage").size;
        for (L = 0; L < q.nConstraint; ++L)
          A = m + L * x, E = q.aConstraintUsage[L], H = n.get("sqlite3_index_constraint_usage").dc, J(A + H[0], E.argvIndex, "i32"), J(A + H[1], E.omit ? 1 : 0, "i8");
        J(l + r[5], q.idxNum, "i32");
        "string" === typeof q.idxStr && (m = Ra(q.idxStr), x = Z("sqlite3_malloc", "number", ["number"], [m + 1]), Sa(q.idxStr, y, x, m + 1), J(l + r[6], x, "*"), J(l + r[7], 1, "i32"));
        J(l + r[8], q.orderByConsumed, "i32");
        J(
          l + r[9],
          q.estimatedCost,
          "double"
        );
        J(l + r[10], q.estimatedRows, "i32");
        J(l + r[11], q.idxFlags, "i32");
        return k;
      };
      kc = function(k) {
        const l = d.get(k);
        b ? h.add(k) : d.delete(k);
        return l.module.xDisconnect(k);
      };
      jc = function(k) {
        const l = d.get(k);
        b ? h.add(k) : d.delete(k);
        return l.module.xDestroy(k);
      };
      oc = function(k, l) {
        const r = d.get(k);
        e.set(l, r);
        if (b) {
          g.delete(l);
          for (const m of g)
            e.delete(m);
        }
        return r.module.xOpen(k, l);
      };
      ec = function(k) {
        const l = e.get(k);
        b ? g.add(k) : e.delete(k);
        return l.module.xClose(k);
      };
      lc = function(k) {
        return e.get(k).module.xEof(k) ? 1 : 0;
      };
      mc = function(k, l, r, m, q) {
        const x = e.get(k);
        r = r ? r ? K(y, r) : "" : null;
        q = new Uint32Array(y.buffer, q, m);
        return x.module.xFilter(k, l, r, q);
      };
      nc = function(k) {
        return e.get(k).module.xNext(k);
      };
      fc = function(k, l, r) {
        return e.get(k).module.xColumn(k, l, r);
      };
      rc = function(k, l) {
        return e.get(k).module.xRowid(k, a("BigInt64", l));
      };
      uc = function(k, l, r, m) {
        const q = d.get(k);
        r = new Uint32Array(y.buffer, r, l);
        return q.module.xUpdate(k, r, a("BigInt64", m));
      };
      cc = function(k) {
        return d.get(k).module.xBegin(k);
      };
      tc = function(k) {
        return d.get(k).module.xSync(k);
      };
      gc = function(k) {
        return d.get(k).module.xCommit(k);
      };
      qc = function(k) {
        return d.get(k).module.xRollback(k);
      };
      pc = function(k, l) {
        const r = d.get(k);
        l = l ? K(y, l) : "";
        return r.module.xRename(k, l);
      };
    })();
    (function() {
      function a(g, n) {
        const k = `get${g}`, l = `set${g}`;
        return new Proxy(new DataView(y.buffer, n, "Int32" === g ? 4 : 8), { get(r, m) {
          if (m === k)
            return function(q, x) {
              if (!x)
                throw Error("must be little endian");
              return r[m](q, x);
            };
          if (m === l)
            return function(q, x, A) {
              if (!A)
                throw Error("must be little endian");
              return r[m](q, x, A);
            };
          if ("string" === typeof m && m.match(/^(get)|(set)/))
            throw Error("invalid type");
          return r[m];
        } });
      }
      function b(g) {
        g >>= 2;
        return B[g] + B[g + 1] * 2 ** 32;
      }
      const c = "object" === typeof ed, d = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map();
      f.registerVFS = function(g, n) {
        if (Z("sqlite3_vfs_find", "number", ["string"], [g.name]))
          throw Error(`VFS '${g.name}' already registered`);
        c && (g.handleAsync = dd);
        var k = g.ad ?? 64;
        const l = f._malloc(4);
        n = Z("register_vfs", "number", ["string", "number", "number", "number"], [g.name, k, n ? 1 : 0, l]);
        n || (k = I(l, "*"), d.set(k, g));
        f._free(l);
        return n;
      };
      const h = c ? /* @__PURE__ */ new Set() : null;
      xc = function(g) {
        const n = e.get(g);
        c ? h.add(g) : e.delete(g);
        return n.xClose(g);
      };
      Ec = function(g, n, k, l) {
        return e.get(g).xRead(g, y.subarray(n, n + k), b(l));
      };
      Jc = function(g, n, k, l) {
        return e.get(g).xWrite(
          g,
          y.subarray(n, n + k),
          b(l)
        );
      };
      Hc = function(g, n) {
        return e.get(g).xTruncate(g, b(n));
      };
      Gc = function(g, n) {
        return e.get(g).xSync(g, n);
      };
      Bc = function(g, n) {
        const k = e.get(g);
        n = a("BigInt64", n);
        return k.xFileSize(g, n);
      };
      Cc = function(g, n) {
        return e.get(g).xLock(g, n);
      };
      Ic = function(g, n) {
        return e.get(g).xUnlock(g, n);
      };
      wc = function(g, n) {
        const k = e.get(g);
        n = a("Int32", n);
        return k.xCheckReservedLock(g, n);
      };
      Ac = function(g, n, k) {
        const l = e.get(g);
        k = new DataView(y.buffer, k);
        return l.xFileControl(g, n, k);
      };
      Fc = function(g) {
        return e.get(g).xSectorSize(g);
      };
      zc = function(g) {
        return e.get(g).xDeviceCharacteristics(g);
      };
      Dc = function(g, n, k, l, r) {
        g = d.get(g);
        e.set(k, g);
        if (c) {
          h.delete(k);
          for (var m of h)
            e.delete(m);
        }
        m = null;
        if (l & 64) {
          m = 1;
          const q = [];
          for (; m; ) {
            const x = y[n++];
            if (x)
              q.push(x);
            else
              switch (y[n] || (m = null), m) {
                case 1:
                  q.push(63);
                  m = 2;
                  break;
                case 2:
                  q.push(61);
                  m = 3;
                  break;
                case 3:
                  q.push(38), m = 2;
              }
          }
          m = new TextDecoder().decode(new Uint8Array(q));
        } else
          n && (m = n ? K(y, n) : "");
        r = a("Int32", r);
        return g.xOpen(m, k, l, r);
      };
      yc = function(g, n, k) {
        return d.get(g).xDelete(n ? K(y, n) : "", k);
      };
      vc = function(g, n, k, l) {
        g = d.get(g);
        l = a("Int32", l);
        return g.xAccess(n ? K(y, n) : "", k, l);
      };
    })();
    var kd = { a: (a, b, c, d) => {
      u(`Assertion failed: ${a ? K(y, a) : ""}, at: ` + [b ? b ? K(y, b) : "" : "unknown filename", c, d ? d ? K(y, d) : "" : "unknown function"]);
    }, K: function(a, b) {
      try {
        return a = a ? K(y, a) : "", Db(a, b), 0;
      } catch (c) {
        if ("undefined" == typeof U || "ErrnoError" !== c.name)
          throw c;
        return -c.Ob;
      }
    }, M: function(a, b, c) {
      try {
        b = b ? K(y, b) : "";
        b = Mb(a, b);
        if (c & -8)
          return -28;
        var d = R(b, { Yb: true }).node;
        if (!d)
          return -44;
        a = "";
        c & 4 && (a += "r");
        c & 2 && (a += "w");
        c & 1 && (a += "x");
        return a && ob(d, a) ? -2 : 0;
      } catch (e) {
        if ("undefined" == typeof U || "ErrnoError" !== e.name)
          throw e;
        return -e.Ob;
      }
    }, L: function(a, b) {
      try {
        var c = S(a);
        Db(c.node, b);
        return 0;
      } catch (d) {
        if ("undefined" == typeof U || "ErrnoError" !== d.name)
          throw d;
        return -d.Ob;
      }
    }, J: function(a) {
      try {
        var b = S(a).node;
        var c = "string" == typeof b ? R(b, { Yb: true }).node : b;
        if (!c.Cb.Qb)
          throw new N(63);
        c.Cb.Qb(c, { timestamp: Date.now() });
        return 0;
      } catch (d) {
        if ("undefined" == typeof U || "ErrnoError" !== d.name)
          throw d;
        return -d.Ob;
      }
    }, b: function(a, b, c) {
      Ob = c;
      try {
        var d = S(a);
        switch (b) {
          case 0:
            var e = Pb();
            if (0 > e)
              return -28;
            for (; hb[e]; )
              e++;
            return ub(d, e).Wb;
          case 1:
          case 2:
            return 0;
          case 3:
            return d.flags;
          case 4:
            return e = Pb(), d.flags |= e, 0;
          case 5:
            return e = Pb(), oa[e + 0 >> 1] = 2, 0;
          case 6:
          case 7:
            return 0;
          case 16:
          case 8:
            return -28;
          case 9:
            return z[jd() >> 2] = 28, -1;
          default:
            return -28;
        }
      } catch (h) {
        if ("undefined" == typeof U || "ErrnoError" !== h.name)
          throw h;
        return -h.Ob;
      }
    }, I: function(a, b) {
      try {
        var c = S(a);
        return Nb(Bb, c.path, b);
      } catch (d) {
        if ("undefined" == typeof U || "ErrnoError" !== d.name)
          throw d;
        return -d.Ob;
      }
    }, n: function(a, b, c) {
      b = Qb(b, c);
      try {
        if (isNaN(b))
          return 61;
        var d = S(a);
        if (0 === (d.flags & 2097155))
          throw new N(28);
        Eb(d.node, b);
        return 0;
      } catch (e) {
        if ("undefined" == typeof U || "ErrnoError" !== e.name)
          throw e;
        return -e.Ob;
      }
    }, C: function(a, b) {
      try {
        if (0 === b)
          return -28;
        var c = Ra("/") + 1;
        if (b < c)
          return -68;
        Sa("/", y, a, b);
        return c;
      } catch (d) {
        if ("undefined" == typeof U || "ErrnoError" !== d.name)
          throw d;
        return -d.Ob;
      }
    }, F: function(a, b) {
      try {
        return a = a ? K(y, a) : "", Nb(Cb, a, b);
      } catch (c) {
        if ("undefined" == typeof U || "ErrnoError" !== c.name)
          throw c;
        return -c.Ob;
      }
    }, z: function(a, b, c) {
      try {
        return b = b ? K(y, b) : "", b = Mb(a, b), b = M(b), "/" === b[b.length - 1] && (b = b.substr(
          0,
          b.length - 1
        )), T(b, c), 0;
      } catch (d) {
        if ("undefined" == typeof U || "ErrnoError" !== d.name)
          throw d;
        return -d.Ob;
      }
    }, E: function(a, b, c, d) {
      try {
        b = b ? K(y, b) : "";
        var e = d & 256;
        b = Mb(a, b, d & 4096);
        return Nb(e ? Cb : Bb, b, c);
      } catch (h) {
        if ("undefined" == typeof U || "ErrnoError" !== h.name)
          throw h;
        return -h.Ob;
      }
    }, y: function(a, b, c, d) {
      Ob = d;
      try {
        b = b ? K(y, b) : "";
        b = Mb(a, b);
        var e = d ? Pb() : 0;
        return Fb(b, c, e).Wb;
      } catch (h) {
        if ("undefined" == typeof U || "ErrnoError" !== h.name)
          throw h;
        return -h.Ob;
      }
    }, w: function(a, b, c, d) {
      try {
        b = b ? K(y, b) : "";
        b = Mb(a, b);
        if (0 >= d)
          return -28;
        var e = kb(b), h = Math.min(d, Ra(e)), g = w[c + h];
        Sa(e, y, c, d + 1);
        w[c + h] = g;
        return h;
      } catch (n) {
        if ("undefined" == typeof U || "ErrnoError" !== n.name)
          throw n;
        return -n.Ob;
      }
    }, u: function(a) {
      try {
        return a = a ? K(y, a) : "", Ab(a), 0;
      } catch (b) {
        if ("undefined" == typeof U || "ErrnoError" !== b.name)
          throw b;
        return -b.Ob;
      }
    }, H: function(a, b) {
      try {
        return a = a ? K(y, a) : "", Nb(Bb, a, b);
      } catch (c) {
        if ("undefined" == typeof U || "ErrnoError" !== c.name)
          throw c;
        return -c.Ob;
      }
    }, r: function(a, b, c) {
      try {
        b = b ? K(y, b) : "";
        b = Mb(a, b);
        if (0 === c) {
          a = b;
          var d = R(a, { parent: true }).node;
          if (!d)
            throw new N(44);
          var e = Ma(a), h = cb(d, e), g = sb(d, e, false);
          if (g)
            throw new N(g);
          if (!d.Cb.oc)
            throw new N(63);
          if (h.$b)
            throw new N(10);
          d.Cb.oc(d, e);
          nb(h);
        } else
          512 === c ? Ab(b) : u("Invalid flags passed to unlinkat");
        return 0;
      } catch (n) {
        if ("undefined" == typeof U || "ErrnoError" !== n.name)
          throw n;
        return -n.Ob;
      }
    }, q: function(a, b, c) {
      try {
        b = b ? K(y, b) : "";
        b = Mb(a, b, true);
        if (c) {
          var d = B[c >> 2] + 4294967296 * z[c + 4 >> 2], e = z[c + 8 >> 2];
          h = 1e3 * d + e / 1e6;
          c += 16;
          d = B[c >> 2] + 4294967296 * z[c + 4 >> 2];
          e = z[c + 8 >> 2];
          g = 1e3 * d + e / 1e6;
        } else
          var h = Date.now(), g = h;
        a = h;
        var n = R(b, { Yb: true }).node;
        n.Cb.Qb(n, { timestamp: Math.max(a, g) });
        return 0;
      } catch (k) {
        if ("undefined" == typeof U || "ErrnoError" !== k.name)
          throw k;
        return -k.Ob;
      }
    }, l: function(a, b, c) {
      a = new Date(1e3 * Qb(a, b));
      z[c >> 2] = a.getSeconds();
      z[c + 4 >> 2] = a.getMinutes();
      z[c + 8 >> 2] = a.getHours();
      z[c + 12 >> 2] = a.getDate();
      z[c + 16 >> 2] = a.getMonth();
      z[c + 20 >> 2] = a.getFullYear() - 1900;
      z[c + 24 >> 2] = a.getDay();
      b = a.getFullYear();
      z[c + 28 >> 2] = (0 !== b % 4 || 0 === b % 100 && 0 !== b % 400 ? Sb : Rb)[a.getMonth()] + a.getDate() - 1 | 0;
      z[c + 36 >> 2] = -(60 * a.getTimezoneOffset());
      b = new Date(
        a.getFullYear(),
        6,
        1
      ).getTimezoneOffset();
      var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
      z[c + 32 >> 2] = (b != d && a.getTimezoneOffset() == Math.min(d, b)) | 0;
    }, i: function(a, b, c, d, e, h, g, n) {
      e = Qb(e, h);
      try {
        if (isNaN(e))
          return 61;
        var k = S(d);
        if (0 !== (b & 2) && 0 === (c & 2) && 2 !== (k.flags & 2097155))
          throw new N(2);
        if (1 === (k.flags & 2097155))
          throw new N(2);
        if (!k.Mb.kc)
          throw new N(43);
        var l = k.Mb.kc(k, a, e, b, c);
        var r = l.Oc;
        z[g >> 2] = l.Cc;
        B[n >> 2] = r;
        return 0;
      } catch (m) {
        if ("undefined" == typeof U || "ErrnoError" !== m.name)
          throw m;
        return -m.Ob;
      }
    }, j: function(a, b, c, d, e, h, g) {
      h = Qb(h, g);
      try {
        if (isNaN(h))
          return 61;
        var n = S(e);
        if (c & 2) {
          if (32768 !== (n.node.mode & 61440))
            throw new N(43);
          d & 2 || n.Mb.lc && n.Mb.lc(n, y.slice(a, a + b), h, b, d);
        }
      } catch (k) {
        if ("undefined" == typeof U || "ErrnoError" !== k.name)
          throw k;
        return -k.Ob;
      }
    }, s: (a, b, c) => {
      function d(k) {
        return (k = k.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? k[1] : "GMT";
      }
      var e = (/* @__PURE__ */ new Date()).getFullYear(), h = new Date(e, 0, 1), g = new Date(e, 6, 1);
      e = h.getTimezoneOffset();
      var n = g.getTimezoneOffset();
      B[a >> 2] = 60 * Math.max(e, n);
      z[b >> 2] = Number(e != n);
      a = d(h);
      b = d(g);
      a = Ub(a);
      b = Ub(b);
      n < e ? (B[c >> 2] = a, B[c + 4 >> 2] = b) : (B[c >> 2] = b, B[c + 4 >> 2] = a);
    }, e: () => Date.now(), d: () => performance.now(), o: (a) => {
      var b = y.length;
      a >>>= 0;
      if (2147483648 < a)
        return false;
      for (var c = 1; 4 >= c; c *= 2) {
        var d = b * (1 + 0.2 / c);
        d = Math.min(d, a + 100663296);
        var e = Math;
        d = Math.max(a, d);
        a: {
          e = (e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536) - ma.buffer.byteLength + 65535) / 65536;
          try {
            ma.grow(e);
            ra();
            var h = 1;
            break a;
          } catch (g) {
          }
          h = void 0;
        }
        if (h)
          return true;
      }
      return false;
    }, A: (a, b) => {
      var c = 0;
      Xb().forEach((d, e) => {
        var h = b + c;
        e = B[a + 4 * e >> 2] = h;
        for (h = 0; h < d.length; ++h)
          w[e++ >> 0] = d.charCodeAt(h);
        w[e >> 0] = 0;
        c += d.length + 1;
      });
      return 0;
    }, B: (a, b) => {
      var c = Xb();
      B[a >> 2] = c.length;
      var d = 0;
      c.forEach((e) => d += e.length + 1);
      B[b >> 2] = d;
      return 0;
    }, f: function(a) {
      try {
        var b = S(a);
        if (null === b.Wb)
          throw new N(8);
        b.pc && (b.pc = null);
        try {
          b.Mb.close && b.Mb.close(b);
        } catch (c) {
          throw c;
        } finally {
          hb[b.Wb] = null;
        }
        b.Wb = null;
        return 0;
      } catch (c) {
        if ("undefined" == typeof U || "ErrnoError" !== c.name)
          throw c;
        return c.Ob;
      }
    }, p: function(a, b) {
      try {
        var c = S(a);
        w[b >> 0] = c.Sb ? 2 : P(c.mode) ? 3 : 40960 === (c.mode & 61440) ? 7 : 4;
        oa[b + 2 >> 1] = 0;
        F = [0, (D = 0, 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
        z[b + 8 >> 2] = F[0];
        z[b + 12 >> 2] = F[1];
        F = [0, (D = 0, 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
        z[b + 16 >> 2] = F[0];
        z[b + 20 >> 2] = F[1];
        return 0;
      } catch (d) {
        if ("undefined" == typeof U || "ErrnoError" !== d.name)
          throw d;
        return d.Ob;
      }
    }, x: function(a, b, c, d) {
      try {
        a: {
          var e = S(a);
          a = b;
          for (var h, g = b = 0; g < c; g++) {
            var n = B[a >> 2], k = B[a + 4 >> 2];
            a += 8;
            var l = e, r = n, m = k, q = h, x = w;
            if (0 > m || 0 > q)
              throw new N(28);
            if (null === l.Wb)
              throw new N(8);
            if (1 === (l.flags & 2097155))
              throw new N(8);
            if (P(l.node.mode))
              throw new N(31);
            if (!l.Mb.read)
              throw new N(28);
            var A = "undefined" != typeof q;
            if (!A)
              q = l.position;
            else if (!l.seekable)
              throw new N(70);
            var G = l.Mb.read(l, x, r, m, q);
            A || (l.position += G);
            var E = G;
            if (0 > E) {
              var L = -1;
              break a;
            }
            b += E;
            if (E < k)
              break;
            "undefined" !== typeof h && (h += E);
          }
          L = b;
        }
        B[d >> 2] = L;
        return 0;
      } catch (H) {
        if ("undefined" == typeof U || "ErrnoError" !== H.name)
          throw H;
        return H.Ob;
      }
    }, m: function(a, b, c, d, e) {
      b = Qb(b, c);
      try {
        if (isNaN(b))
          return 61;
        var h = S(a);
        Hb(h, b, d);
        F = [h.position >>> 0, (D = h.position, 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
        z[e >> 2] = F[0];
        z[e + 4 >> 2] = F[1];
        h.pc && 0 === b && 0 === d && (h.pc = null);
        return 0;
      } catch (g) {
        if ("undefined" == typeof U || "ErrnoError" !== g.name)
          throw g;
        return g.Ob;
      }
    }, D: function(a) {
      try {
        var b = S(a);
        return Zc((c) => {
          var d = b.node.Ub;
          d.type.Qc ? d.type.Qc(d, false, (e) => {
            e ? c(29) : c(0);
          }) : c(0);
        });
      } catch (c) {
        if ("undefined" == typeof U || "ErrnoError" !== c.name)
          throw c;
        return c.Ob;
      }
    }, t: function(a, b, c, d) {
      try {
        a: {
          var e = S(a);
          a = b;
          for (var h, g = b = 0; g < c; g++) {
            var n = B[a >> 2], k = B[a + 4 >> 2];
            a += 8;
            var l = e, r = n, m = k, q = h, x = w;
            if (0 > m || 0 > q)
              throw new N(28);
            if (null === l.Wb)
              throw new N(8);
            if (0 === (l.flags & 2097155))
              throw new N(8);
            if (P(l.node.mode))
              throw new N(31);
            if (!l.Mb.write)
              throw new N(28);
            l.seekable && l.flags & 1024 && Hb(l, 0, 2);
            var A = "undefined" != typeof q;
            if (!A)
              q = l.position;
            else if (!l.seekable)
              throw new N(70);
            var G = l.Mb.write(l, x, r, m, q, void 0);
            A || (l.position += G);
            var E = G;
            if (0 > E) {
              var L = -1;
              break a;
            }
            b += E;
            "undefined" !== typeof h && (h += E);
          }
          L = b;
        }
        B[d >> 2] = L;
        return 0;
      } catch (H) {
        if ("undefined" == typeof U || "ErrnoError" !== H.name)
          throw H;
        return H.Ob;
      }
    }, ra: Yb, N: Zb, ga: $b, ca: ac, Y: bc, la: cc, G: dc, h: ec, oa: fc, ja: gc, ea: hc, fa: ic, k: jc, v: kc, pa: lc, g: mc, qa: nc, da: oc, ha: pc, ia: qc, na: rc, c: sc, ka: tc, ma: uc, aa: vc, V: wc, $: xc, ba: yc, S: zc, U: Ac, Z: Bc, X: Cc, R: Dc, Q: Ec, T: Fc, _: Gc, O: Hc, W: Ic, P: Jc }, V = function() {
      function a(c) {
        V = c.exports;
        V = Oc();
        ma = V.sa;
        ra();
        ta.unshift(V.ta);
        C--;
        f.monitorRunDependencies && f.monitorRunDependencies(C);
        0 == C && (ya && (c = ya, ya = null, c()));
        return V;
      }
      var b = { a: kd };
      C++;
      f.monitorRunDependencies && f.monitorRunDependencies(C);
      if (f.instantiateWasm)
        try {
          return f.instantiateWasm(b, a);
        } catch (c) {
          t(`Module.instantiateWasm callback failed with error: ${c}`), ba(c);
        }
      Fa(b, function(c) {
        a(c.instance);
      }).catch(ba);
      return {};
    }();
    f._sqlite3_vfs_find = (a) => (f._sqlite3_vfs_find = V.ua)(a);
    f._sqlite3_malloc = (a) => (f._sqlite3_malloc = V.va)(a);
    f._sqlite3_free = (a) => (f._sqlite3_free = V.wa)(a);
    f._sqlite3_prepare_v2 = (a, b, c, d, e) => (f._sqlite3_prepare_v2 = V.xa)(a, b, c, d, e);
    f._sqlite3_step = (a) => (f._sqlite3_step = V.ya)(a);
    f._sqlite3_column_int64 = (a, b) => (f._sqlite3_column_int64 = V.za)(a, b);
    f._sqlite3_column_int = (a, b) => (f._sqlite3_column_int = V.Aa)(a, b);
    f._sqlite3_finalize = (a) => (f._sqlite3_finalize = V.Ba)(a);
    f._sqlite3_reset = (a) => (f._sqlite3_reset = V.Ca)(a);
    f._sqlite3_clear_bindings = (a) => (f._sqlite3_clear_bindings = V.Da)(a);
    f._sqlite3_value_blob = (a) => (f._sqlite3_value_blob = V.Ea)(a);
    f._sqlite3_value_text = (a) => (f._sqlite3_value_text = V.Fa)(a);
    f._sqlite3_value_bytes = (a) => (f._sqlite3_value_bytes = V.Ga)(a);
    f._sqlite3_value_double = (a) => (f._sqlite3_value_double = V.Ha)(a);
    f._sqlite3_value_int = (a) => (f._sqlite3_value_int = V.Ia)(a);
    f._sqlite3_value_int64 = (a) => (f._sqlite3_value_int64 = V.Ja)(a);
    f._sqlite3_value_type = (a) => (f._sqlite3_value_type = V.Ka)(a);
    f._sqlite3_result_blob = (a, b, c, d) => (f._sqlite3_result_blob = V.La)(a, b, c, d);
    f._sqlite3_result_double = (a, b) => (f._sqlite3_result_double = V.Ma)(a, b);
    f._sqlite3_result_error = (a, b, c) => (f._sqlite3_result_error = V.Na)(a, b, c);
    f._sqlite3_result_int = (a, b) => (f._sqlite3_result_int = V.Oa)(a, b);
    f._sqlite3_result_int64 = (a, b, c) => (f._sqlite3_result_int64 = V.Pa)(a, b, c);
    f._sqlite3_result_null = (a) => (f._sqlite3_result_null = V.Qa)(a);
    f._sqlite3_result_text = (a, b, c, d) => (f._sqlite3_result_text = V.Ra)(a, b, c, d);
    f._sqlite3_column_count = (a) => (f._sqlite3_column_count = V.Sa)(a);
    f._sqlite3_data_count = (a) => (f._sqlite3_data_count = V.Ta)(a);
    f._sqlite3_column_blob = (a, b) => (f._sqlite3_column_blob = V.Ua)(a, b);
    f._sqlite3_column_bytes = (a, b) => (f._sqlite3_column_bytes = V.Va)(a, b);
    f._sqlite3_column_double = (a, b) => (f._sqlite3_column_double = V.Wa)(a, b);
    f._sqlite3_column_text = (a, b) => (f._sqlite3_column_text = V.Xa)(a, b);
    f._sqlite3_column_type = (a, b) => (f._sqlite3_column_type = V.Ya)(a, b);
    f._sqlite3_column_name = (a, b) => (f._sqlite3_column_name = V.Za)(a, b);
    f._sqlite3_bind_blob = (a, b, c, d, e) => (f._sqlite3_bind_blob = V._a)(a, b, c, d, e);
    f._sqlite3_bind_double = (a, b, c) => (f._sqlite3_bind_double = V.$a)(a, b, c);
    f._sqlite3_bind_int = (a, b, c) => (f._sqlite3_bind_int = V.ab)(a, b, c);
    f._sqlite3_bind_int64 = (a, b, c, d) => (f._sqlite3_bind_int64 = V.bb)(a, b, c, d);
    f._sqlite3_bind_null = (a, b) => (f._sqlite3_bind_null = V.cb)(a, b);
    f._sqlite3_bind_text = (a, b, c, d, e) => (f._sqlite3_bind_text = V.db)(a, b, c, d, e);
    f._sqlite3_bind_parameter_count = (a) => (f._sqlite3_bind_parameter_count = V.eb)(a);
    f._sqlite3_bind_parameter_name = (a, b) => (f._sqlite3_bind_parameter_name = V.fb)(a, b);
    f._sqlite3_sql = (a) => (f._sqlite3_sql = V.gb)(a);
    f._sqlite3_exec = (a, b, c, d, e) => (f._sqlite3_exec = V.hb)(a, b, c, d, e);
    f._sqlite3_errmsg = (a) => (f._sqlite3_errmsg = V.ib)(a);
    f._sqlite3_declare_vtab = (a, b) => (f._sqlite3_declare_vtab = V.jb)(a, b);
    f._sqlite3_libversion = () => (f._sqlite3_libversion = V.kb)();
    f._sqlite3_libversion_number = () => (f._sqlite3_libversion_number = V.lb)();
    f._sqlite3_changes = (a) => (f._sqlite3_changes = V.mb)(a);
    f._sqlite3_close = (a) => (f._sqlite3_close = V.nb)(a);
    f._sqlite3_limit = (a, b, c) => (f._sqlite3_limit = V.ob)(a, b, c);
    f._sqlite3_open_v2 = (a, b, c, d) => (f._sqlite3_open_v2 = V.pb)(a, b, c, d);
    f._sqlite3_get_autocommit = (a) => (f._sqlite3_get_autocommit = V.qb)(a);
    var jd = () => (jd = V.rb)(), Tb = f._malloc = (a) => (Tb = f._malloc = V.sb)(a), cd = f._free = (a) => (cd = f._free = V.tb)(a);
    f._RegisterExtensionFunctions = (a) => (f._RegisterExtensionFunctions = V.ub)(a);
    f._set_authorizer = (a) => (f._set_authorizer = V.vb)(a);
    f._create_function = (a, b, c, d, e, h) => (f._create_function = V.wb)(a, b, c, d, e, h);
    f._create_module = (a, b, c, d) => (f._create_module = V.xb)(a, b, c, d);
    f._progress_handler = (a, b) => (f._progress_handler = V.yb)(a, b);
    f._register_vfs = (a, b, c, d) => (f._register_vfs = V.zb)(a, b, c, d);
    f._getSqliteFree = () => (f._getSqliteFree = V.Ab)();
    var ld = f._main = (a, b) => (ld = f._main = V.Bb)(a, b), db = (a, b) => (db = V.Db)(a, b), md = () => (md = V.Eb)(), hd = () => (hd = V.Fb)(), fd = (a) => (fd = V.Gb)(a), gd = (a) => (gd = V.Hb)(a), ad = (a) => (ad = V.Ib)(a), Qc = () => (Qc = V.Jb)(), $c = (a) => ($c = V.Kb)(a), bd = () => (bd = V.Lb)();
    f.getTempRet0 = md;
    f.ccall = Z;
    f.cwrap = (a, b, c, d) => {
      var e = !c || c.every((h) => "number" === h || "boolean" === h);
      return "string" !== b && e && !d ? f["_" + a] : function() {
        return Z(a, b, c, arguments, d);
      };
    };
    f.setValue = J;
    f.getValue = I;
    f.UTF8ToString = (a, b) => a ? K(y, a, b) : "";
    f.stringToUTF8 = (a, b, c) => Sa(a, y, b, c);
    f.lengthBytesUTF8 = Ra;
    var nd;
    ya = function od() {
      nd || pd();
      nd || (ya = od);
    };
    function pd() {
      function a() {
        if (!nd && (nd = true, f.calledRun = true, !v)) {
          f.noFSInit || Jb || (Jb = true, Ib(), f.stdin = f.stdin, f.stdout = f.stdout, f.stderr = f.stderr, f.stdin ? Kb("stdin", f.stdin) : zb("/dev/tty", "/dev/stdin"), f.stdout ? Kb("stdout", null, f.stdout) : zb("/dev/tty", "/dev/stdout"), f.stderr ? Kb("stderr", null, f.stderr) : zb("/dev/tty1", "/dev/stderr"), Fb("/dev/stdin", 0), Fb("/dev/stdout", 1), Fb("/dev/stderr", 1));
          jb = false;
          Ha(ta);
          Ha(ua);
          aa(f);
          if (f.onRuntimeInitialized)
            f.onRuntimeInitialized();
          if (qd) {
            var b = ld;
            try {
              var c = b(0, 0);
              na = c;
              Lc(c);
            } catch (d) {
              Mc(d);
            }
          }
          if (f.postRun)
            for ("function" == typeof f.postRun && (f.postRun = [f.postRun]); f.postRun.length; )
              b = f.postRun.shift(), va.unshift(b);
          Ha(va);
        }
      }
      if (!(0 < C)) {
        if (f.preRun)
          for ("function" == typeof f.preRun && (f.preRun = [f.preRun]); f.preRun.length; )
            wa();
        Ha(sa);
        0 < C || (f.setStatus ? (f.setStatus("Running..."), setTimeout(function() {
          setTimeout(function() {
            f.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }
    if (f.preInit)
      for ("function" == typeof f.preInit && (f.preInit = [f.preInit]); 0 < f.preInit.length; )
        f.preInit.pop()();
    var qd = true;
    f.noInitialRun && (qd = false);
    pd();
    return moduleArg.ready;
  };
})();
var wa_sqlite_async_default = Module;
var LOCK_TYPE_MASK = SQLITE_LOCK_NONE | SQLITE_LOCK_SHARED | SQLITE_LOCK_RESERVED | SQLITE_LOCK_PENDING | SQLITE_LOCK_EXCLUSIVE;
var WebLocksBase = (_c = class {
  constructor() {
    /**
     * 
     * @param {(targetState: number) => void} method 
     * @param {number} flags 
     */
    __privateAdd(this, _apply);
    __privateAdd(this, _lock);
    __privateAdd(this, _unlock);
    __privateAdd(this, _state, SQLITE_LOCK_NONE);
    __publicField(this, "timeoutMillis", 0);
    /** @type {Map<string, (value: any) => void>} */
    __privateAdd(this, _releasers, /* @__PURE__ */ new Map());
    /** @type {Promise<0|5|3850>} */
    __privateAdd(this, _pending, Promise.resolve(0));
  }
  get state() {
    return __privateGet(this, _state);
  }
  /**
   * @param {number} flags 
   * @returns {Promise<0|5|3850>} SQLITE_OK, SQLITE_BUSY, SQLITE_IOERR_LOCK
   */
  async lock(flags) {
    return __privateMethod(this, _apply, apply_fn).call(this, __privateMethod(this, _lock, lock_fn), flags);
  }
  /**
   * @param {number} flags 
   * @returns {Promise<0|5|3850>} SQLITE_OK, SQLITE_IOERR_LOCK
   */
  async unlock(flags) {
    return __privateMethod(this, _apply, apply_fn).call(this, __privateMethod(this, _unlock, unlock_fn), flags);
  }
  /**
   * @returns {Promise<boolean>}
   */
  async isSomewhereReserved() {
    throw new Error("unimplemented");
  }
  async _NONEtoSHARED() {
  }
  async _SHAREDtoEXCLUSIVE() {
    await this._SHAREDtoRESERVED();
    await this._RESERVEDtoEXCLUSIVE();
  }
  async _SHAREDtoRESERVED() {
  }
  async _RESERVEDtoEXCLUSIVE() {
  }
  async _EXCLUSIVEtoRESERVED() {
  }
  async _EXCLUSIVEtoSHARED() {
    await this._EXCLUSIVEtoRESERVED();
    await this._RESERVEDtoSHARED();
  }
  async _EXCLUSIVEtoNONE() {
    await this._EXCLUSIVEtoRESERVED();
    await this._RESERVEDtoSHARED();
    await this._SHAREDtoNONE();
  }
  async _RESERVEDtoSHARED() {
  }
  async _RESERVEDtoNONE() {
    await this._RESERVEDtoSHARED();
    await this._SHAREDtoNONE();
  }
  async _SHAREDtoNONE() {
  }
  /**
   * @param {string} lockName 
   * @param {LockOptions} options 
   * @returns {Promise<?Lock>}
   */
  _acquireWebLock(lockName, options) {
    return new Promise(async (resolve, reject) => {
      try {
        await navigator.locks.request(lockName, options, (lock) => {
          resolve(lock);
          if (lock) {
            return new Promise((release) => __privateGet(this, _releasers).set(lockName, release));
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * @param {string} lockName 
   */
  _releaseWebLock(lockName) {
    __privateGet(this, _releasers).get(lockName)?.();
    __privateGet(this, _releasers).delete(lockName);
  }
  /**
   * @param {string} lockName 
   */
  async _pollWebLock(lockName) {
    const query = await navigator.locks.query();
    return query.held.find(({ name }) => name === lockName)?.mode;
  }
  /**
   * @returns {?AbortSignal}
   */
  _getTimeoutSignal() {
    if (this.timeoutMillis) {
      const abortController = new AbortController();
      setTimeout(() => abortController.abort(), this.timeoutMillis);
      return abortController.signal;
    }
    return void 0;
  }
}, _state = new WeakMap(), _releasers = new WeakMap(), _pending = new WeakMap(), _apply = new WeakSet(), apply_fn = async function(method, flags) {
  const targetState = flags & LOCK_TYPE_MASK;
  try {
    const call = () => method.call(this, targetState);
    await __privateSet(this, _pending, __privateGet(this, _pending).then(call, call));
    __privateSet(this, _state, targetState);
    return SQLITE_OK;
  } catch (e) {
    if (e.name === "AbortError") {
      return SQLITE_BUSY;
    }
    console.error(e);
    return SQLITE_IOERR_LOCK;
  }
}, _lock = new WeakSet(), lock_fn = async function(targetState) {
  if (targetState === __privateGet(this, _state))
    return SQLITE_OK;
  switch (__privateGet(this, _state)) {
    case SQLITE_LOCK_NONE:
      switch (targetState) {
        case SQLITE_LOCK_SHARED:
          return this._NONEtoSHARED();
        default:
          throw new Error(`unexpected transition ${__privateGet(this, _state)} -> ${targetState}`);
      }
    case SQLITE_LOCK_SHARED:
      switch (targetState) {
        case SQLITE_LOCK_RESERVED:
          return this._SHAREDtoRESERVED();
        case SQLITE_LOCK_EXCLUSIVE:
          return this._SHAREDtoEXCLUSIVE();
        default:
          throw new Error(`unexpected transition ${__privateGet(this, _state)} -> ${targetState}`);
      }
    case SQLITE_LOCK_RESERVED:
      switch (targetState) {
        case SQLITE_LOCK_EXCLUSIVE:
          return this._RESERVEDtoEXCLUSIVE();
        default:
          throw new Error(`unexpected transition ${__privateGet(this, _state)} -> ${targetState}`);
      }
    default:
      throw new Error(`unexpected transition ${__privateGet(this, _state)} -> ${targetState}`);
  }
}, _unlock = new WeakSet(), unlock_fn = async function(targetState) {
  if (targetState === __privateGet(this, _state))
    return SQLITE_OK;
  switch (__privateGet(this, _state)) {
    case SQLITE_LOCK_EXCLUSIVE:
      switch (targetState) {
        case SQLITE_LOCK_SHARED:
          return this._EXCLUSIVEtoSHARED();
        case SQLITE_LOCK_NONE:
          return this._EXCLUSIVEtoNONE();
        default:
          throw new Error(`unexpected transition ${__privateGet(this, _state)} -> ${targetState}`);
      }
    case SQLITE_LOCK_RESERVED:
      switch (targetState) {
        case SQLITE_LOCK_SHARED:
          return this._RESERVEDtoSHARED();
        case SQLITE_LOCK_NONE:
          return this._RESERVEDtoNONE();
        default:
          throw new Error(`unexpected transition ${__privateGet(this, _state)} -> ${targetState}`);
      }
    case SQLITE_LOCK_SHARED:
      switch (targetState) {
        case SQLITE_LOCK_NONE:
          return this._SHAREDtoNONE();
        default:
          throw new Error(`unexpected transition ${__privateGet(this, _state)} -> ${targetState}`);
      }
    default:
      throw new Error(`unexpected transition ${__privateGet(this, _state)} -> ${targetState}`);
  }
}, _c);
var WebLocksExclusive = class extends WebLocksBase {
  /**
   * @param {string} name 
   */
  constructor(name) {
    super();
    this._lockName = name + "-outer";
    this._reservedName = name + "-reserved";
  }
  async isSomewhereReserved() {
    const mode = await this._pollWebLock(this._reservedName);
    return mode === "exclusive";
  }
  async _NONEtoSHARED() {
    await this._acquireWebLock(this._lockName, {
      mode: "exclusive",
      signal: this._getTimeoutSignal()
    });
  }
  async _SHAREDtoRESERVED() {
    await this._acquireWebLock(this._reservedName, {
      mode: "exclusive",
      signal: this._getTimeoutSignal()
    });
  }
  async _RESERVEDtoSHARED() {
    this._releaseWebLock(this._reservedName);
  }
  async _SHAREDtoNONE() {
    this._releaseWebLock(this._lockName);
  }
};
var MAX_TRANSACTION_LIFETIME_MILLIS = 5e3;
var nextTxId = 0;
var mapTxToId = /* @__PURE__ */ new WeakMap();
function log(...args) {
}
var IDBContext = (_d = class {
  /**
   * @param {IDBDatabase|Promise<IDBDatabase>} idbDatabase
   */
  constructor(idbDatabase, txOptions = { durability: "default" }) {
    /**
     * @param {IDBTransactionMode} mode
     * @param {(stores: Object.<string, ObjectStore>) => any} f 
     * @returns 
     */
    __privateAdd(this, _run2);
    /** @type {IDBDatabase} */
    __privateAdd(this, _db2, void 0);
    /** @type {Promise<IDBDatabase>} */
    __privateAdd(this, _dbReady, void 0);
    __privateAdd(this, _txOptions, void 0);
    /** @type {IDBTransaction} */
    __privateAdd(this, _tx, null);
    __privateAdd(this, _txTimestamp, 0);
    __privateAdd(this, _runChain, Promise.resolve());
    __privateAdd(this, _putChain, Promise.resolve());
    __privateSet(this, _dbReady, Promise.resolve(idbDatabase).then((db) => __privateSet(this, _db2, db)));
    __privateSet(this, _txOptions, txOptions);
  }
  async close() {
    const db = __privateGet(this, _db2) ?? await __privateGet(this, _dbReady);
    await __privateGet(this, _runChain);
    await this.sync();
    db.close();
  }
  /**
   * Run a function with the provided object stores. The function
   * should be idempotent in case it is passed an expired transaction.
   * @param {IDBTransactionMode} mode
   * @param {(stores: Object.<string, ObjectStore>) => any} f 
   */
  async run(mode, f) {
    const result = __privateGet(this, _runChain).then(() => __privateMethod(this, _run2, run_fn2).call(this, mode, f));
    __privateSet(this, _runChain, result.catch(() => {
    }));
    return result;
  }
  async sync() {
    await __privateGet(this, _putChain);
    __privateSet(this, _putChain, Promise.resolve());
  }
}, _db2 = new WeakMap(), _dbReady = new WeakMap(), _txOptions = new WeakMap(), _tx = new WeakMap(), _txTimestamp = new WeakMap(), _runChain = new WeakMap(), _putChain = new WeakMap(), _run2 = new WeakSet(), run_fn2 = async function(mode, f) {
  const db = __privateGet(this, _db2) ?? await __privateGet(this, _dbReady);
  if (mode === "readwrite" && __privateGet(this, _tx)?.mode === "readonly") {
    __privateSet(this, _tx, null);
  } else if (performance.now() - __privateGet(this, _txTimestamp) > MAX_TRANSACTION_LIFETIME_MILLIS) {
    try {
      __privateGet(this, _tx)?.commit();
    } catch (e) {
      if (e.name !== "InvalidStateError")
        throw e;
    }
    await new Promise((resolve) => setTimeout(resolve));
    __privateSet(this, _tx, null);
  }
  for (let i = 0; i < 2; ++i) {
    if (!__privateGet(this, _tx)) {
      __privateSet(this, _tx, db.transaction(db.objectStoreNames, mode, __privateGet(this, _txOptions)));
      const timestamp = __privateSet(this, _txTimestamp, performance.now());
      __privateSet(this, _putChain, __privateGet(this, _putChain).then(() => {
        return new Promise((resolve, reject) => {
          __privateGet(this, _tx).addEventListener("complete", (event) => {
            resolve();
            if (__privateGet(this, _tx) === event.target) {
              __privateSet(this, _tx, null);
            }
            log(`transaction ${mapTxToId.get(event.target)} complete`);
          });
          __privateGet(this, _tx).addEventListener("abort", (event) => {
            console.warn("tx abort", (performance.now() - timestamp) / 1e3);
            const e = event.target.error;
            reject(e);
            if (__privateGet(this, _tx) === event.target) {
              __privateSet(this, _tx, null);
            }
            log(`transaction ${mapTxToId.get(event.target)} aborted`, e);
          });
        });
      }));
      mapTxToId.set(__privateGet(this, _tx), nextTxId++);
    }
    try {
      const stores = Object.fromEntries(Array.from(db.objectStoreNames, (name) => {
        return [name, new ObjectStore(__privateGet(this, _tx).objectStore(name))];
      }));
      return await f(stores);
    } catch (e) {
      __privateSet(this, _tx, null);
      if (i)
        throw e;
    }
  }
}, _d);
function wrapRequest(request) {
  return new Promise((resolve, reject) => {
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
  });
}
var ObjectStore = (_e = class {
  /**
   * @param {IDBObjectStore} objectStore 
   */
  constructor(objectStore) {
    __privateAdd(this, _objectStore, void 0);
    __privateSet(this, _objectStore, objectStore);
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @returns {Promise}
   */
  get(query) {
    log(`get ${__privateGet(this, _objectStore).name}`, query);
    const request = __privateGet(this, _objectStore).get(query);
    return wrapRequest(request);
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @param {number} [count]
   * @returns {Promise}
   */
  getAll(query, count) {
    log(`getAll ${__privateGet(this, _objectStore).name}`, query, count);
    const request = __privateGet(this, _objectStore).getAll(query, count);
    return wrapRequest(request);
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @returns {Promise<IDBValidKey>}
   */
  getKey(query) {
    log(`getKey ${__privateGet(this, _objectStore).name}`, query);
    const request = __privateGet(this, _objectStore).getKey(query);
    return wrapRequest(request);
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @param {number} [count]
   * @returns {Promise}
   */
  getAllKeys(query, count) {
    log(`getAllKeys ${__privateGet(this, _objectStore).name}`, query, count);
    const request = __privateGet(this, _objectStore).getAllKeys(query, count);
    return wrapRequest(request);
  }
  /**
   * @param {any} value
   * @param {IDBValidKey} [key] 
   * @returns {Promise}
   */
  put(value, key) {
    log(`put ${__privateGet(this, _objectStore).name}`, value, key);
    const request = __privateGet(this, _objectStore).put(value, key);
    return wrapRequest(request);
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @returns {Promise}
   */
  delete(query) {
    log(`delete ${__privateGet(this, _objectStore).name}`, query);
    const request = __privateGet(this, _objectStore).delete(query);
    return wrapRequest(request);
  }
  clear() {
    log(`clear ${__privateGet(this, _objectStore).name}`);
    const request = __privateGet(this, _objectStore).clear();
    return wrapRequest(request);
  }
  index(name) {
    return new Index(__privateGet(this, _objectStore).index(name));
  }
}, _objectStore = new WeakMap(), _e);
var Index = (_f = class {
  /**
   * @param {IDBIndex} index 
   */
  constructor(index) {
    /** @type {IDBIndex} */
    __privateAdd(this, _index, void 0);
    __privateSet(this, _index, index);
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @param {number} [count]
   * @returns {Promise<IDBValidKey[]>}
   */
  getAllKeys(query, count) {
    log(`IDBIndex.getAllKeys ${__privateGet(this, _index).objectStore.name}<${__privateGet(this, _index).name}>`, query, count);
    const request = __privateGet(this, _index).getAllKeys(query, count);
    return wrapRequest(request);
  }
}, _index = new WeakMap(), _f);
var SECTOR_SIZE = 512;
var MAX_TASK_MILLIS = 3e3;
var DEFAULT_OPTIONS = {
  durability: "default",
  purge: "deferred",
  purgeAtLeast: 16
};
function log2(...args) {
}
var IDBBatchAtomicVFS = (_g = class extends Base {
  constructor(idbDatabaseName = "wa-sqlite", options = DEFAULT_OPTIONS) {
    super();
    /**
     * @param {number} fileId 
     * @param {Uint8Array} pData 
     * @param {number} iOffset
     * @returns {number}
     */
    __privateAdd(this, _xWriteHelper);
    /**
     * @param {number} fileId 
     * @param {number} flags 
     * @returns {Promise<number>}
     */
    __privateAdd(this, _xSyncHelper);
    /**
     * Conditionally schedule a purge task.
     * @param {string} path 
     * @param {number} nPages 
     */
    __privateAdd(this, _maybePurge);
    __privateAdd(this, _bound);
    // The database page size can be changed with PRAGMA page_size and VACUUM.
    // The updated file will be overwritten with a regular transaction using
    // the old page size. After that it will be read and written using the
    // new page size, so the IndexedDB objects must be combined or split
    // appropriately.
    __privateAdd(this, _reblockIfNeeded);
    __privateAdd(this, _options, void 0);
    /** @type {Map<number, OpenedFileEntry>} */
    __privateAdd(this, _mapIdToFile, /* @__PURE__ */ new Map());
    /** @type {IDBContext} */
    __privateAdd(this, _idb, void 0);
    /** @type {Set<string>} */
    __privateAdd(this, _pendingPurges, /* @__PURE__ */ new Set());
    __privateAdd(this, _taskTimestamp, performance.now());
    __privateAdd(this, _pendingAsync, /* @__PURE__ */ new Set());
    this.name = idbDatabaseName;
    __privateSet(this, _options, Object.assign({}, DEFAULT_OPTIONS, options));
    __privateSet(this, _idb, new IDBContext(openDatabase(idbDatabaseName), {
      durability: __privateGet(this, _options).durability
    }));
  }
  async close() {
    for (const fileId of __privateGet(this, _mapIdToFile).keys()) {
      await this.xClose(fileId);
    }
    await __privateGet(this, _idb)?.close();
    __privateSet(this, _idb, null);
  }
  /**
   * @param {string?} name 
   * @param {number} fileId 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {number}
   */
  xOpen(name, fileId, flags, pOutFlags) {
    return this.handleAsync(async () => {
      if (name === null)
        name = `null_${fileId}`;
      log2(`xOpen ${name} 0x${fileId.toString(16)} 0x${flags.toString(16)}`);
      try {
        const url = new URL(name, "http://localhost/");
        const file = {
          path: url.pathname,
          flags,
          block0: null,
          isMetadataChanged: true,
          locks: new WebLocksExclusive(url.pathname)
        };
        __privateGet(this, _mapIdToFile).set(fileId, file);
        await __privateGet(this, _idb).run("readwrite", async ({ blocks }) => {
          file.block0 = await blocks.get(__privateMethod(this, _bound, bound_fn).call(this, file, 0));
          if (!file.block0) {
            if (flags & SQLITE_OPEN_CREATE) {
              file.block0 = {
                path: file.path,
                offset: 0,
                version: 0,
                data: new Uint8Array(0),
                fileSize: 0
              };
              blocks.put(file.block0);
            } else {
              throw new Error(`file not found: ${file.path}`);
            }
          }
        });
        pOutFlags.setInt32(0, flags & SQLITE_OPEN_READONLY, true);
        return SQLITE_OK;
      } catch (e) {
        console.error(e);
        return SQLITE_CANTOPEN;
      }
    });
  }
  /**
   * @param {number} fileId 
   * @returns {number}
   */
  xClose(fileId) {
    return this.handleAsync(async () => {
      try {
        const file = __privateGet(this, _mapIdToFile).get(fileId);
        if (file) {
          log2(`xClose ${file.path}`);
          __privateGet(this, _mapIdToFile).delete(fileId);
          if (file.flags & SQLITE_OPEN_DELETEONCLOSE) {
            __privateGet(this, _idb).run("readwrite", ({ blocks }) => {
              blocks.delete(IDBKeyRange.bound([file.path], [file.path, []]));
            });
          }
        }
        return SQLITE_OK;
      } catch (e) {
        console.error(e);
        return SQLITE_IOERR;
      }
    });
  }
  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  xRead(fileId, pData, iOffset) {
    return this.handleAsync(async () => {
      const file = __privateGet(this, _mapIdToFile).get(fileId);
      log2(`xRead ${file.path} ${pData.byteLength} ${iOffset}`);
      try {
        const result = await __privateGet(this, _idb).run("readonly", async ({ blocks }) => {
          let pDataOffset = 0;
          while (pDataOffset < pData.byteLength) {
            const fileOffset = iOffset + pDataOffset;
            const block = fileOffset < file.block0.data.byteLength ? file.block0 : await blocks.get(__privateMethod(this, _bound, bound_fn).call(this, file, -fileOffset));
            if (!block || block.data.byteLength - block.offset <= fileOffset) {
              pData.fill(0, pDataOffset);
              return SQLITE_IOERR_SHORT_READ;
            }
            const buffer = pData.subarray(pDataOffset);
            const blockOffset = fileOffset + block.offset;
            const nBytesToCopy = Math.min(
              Math.max(block.data.byteLength - blockOffset, 0),
              // source bytes
              buffer.byteLength
            );
            buffer.set(block.data.subarray(blockOffset, blockOffset + nBytesToCopy));
            pDataOffset += nBytesToCopy;
          }
          return SQLITE_OK;
        });
        return result;
      } catch (e) {
        console.error(e);
        return SQLITE_IOERR;
      }
    });
  }
  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  xWrite(fileId, pData, iOffset) {
    const rewound = __privateGet(this, _pendingAsync).has(fileId);
    if (rewound || performance.now() - __privateGet(this, _taskTimestamp) > MAX_TASK_MILLIS) {
      const result = this.handleAsync(async () => {
        if (this.handleAsync !== super.handleAsync) {
          __privateGet(this, _pendingAsync).add(fileId);
        }
        await new Promise((resolve) => setTimeout(resolve));
        const result2 = __privateMethod(this, _xWriteHelper, xWriteHelper_fn).call(this, fileId, pData, iOffset);
        __privateSet(this, _taskTimestamp, performance.now());
        return result2;
      });
      if (rewound)
        __privateGet(this, _pendingAsync).delete(fileId);
      return result;
    }
    return __privateMethod(this, _xWriteHelper, xWriteHelper_fn).call(this, fileId, pData, iOffset);
  }
  /**
   * @param {number} fileId 
   * @param {number} iSize 
   * @returns {number}
   */
  xTruncate(fileId, iSize) {
    const file = __privateGet(this, _mapIdToFile).get(fileId);
    log2(`xTruncate ${file.path} ${iSize}`);
    try {
      Object.assign(file.block0, {
        fileSize: iSize,
        data: file.block0.data.slice(0, iSize)
      });
      const block0 = Object.assign({}, file.block0);
      __privateGet(this, _idb).run("readwrite", ({ blocks }) => {
        blocks.delete(__privateMethod(this, _bound, bound_fn).call(this, file, -Infinity, -iSize));
        blocks.put(block0);
      });
      return SQLITE_OK;
    } catch (e) {
      console.error(e);
      return SQLITE_IOERR;
    }
  }
  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {number}
   */
  xSync(fileId, flags) {
    const rewound = __privateGet(this, _pendingAsync).has(fileId);
    if (rewound || __privateGet(this, _options).durability !== "relaxed" || performance.now() - __privateGet(this, _taskTimestamp) > MAX_TASK_MILLIS) {
      const result = this.handleAsync(async () => {
        if (this.handleAsync !== super.handleAsync) {
          __privateGet(this, _pendingAsync).add(fileId);
        }
        const result2 = await __privateMethod(this, _xSyncHelper, xSyncHelper_fn).call(this, fileId, flags);
        __privateSet(this, _taskTimestamp, performance.now());
        return result2;
      });
      if (rewound)
        __privateGet(this, _pendingAsync).delete(fileId);
      return result;
    }
    const file = __privateGet(this, _mapIdToFile).get(fileId);
    log2(`xSync ${file.path} ${flags}`);
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId 
   * @param {DataView} pSize64 
   * @returns {number}
   */
  xFileSize(fileId, pSize64) {
    const file = __privateGet(this, _mapIdToFile).get(fileId);
    log2(`xFileSize ${file.path}`);
    pSize64.setBigInt64(0, BigInt(file.block0.fileSize), true);
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {number}
   */
  xLock(fileId, flags) {
    return this.handleAsync(async () => {
      const file = __privateGet(this, _mapIdToFile).get(fileId);
      log2(`xLock ${file.path} ${flags}`);
      try {
        const result = await file.locks.lock(flags);
        if (result === SQLITE_OK && file.locks.state === SQLITE_LOCK_SHARED) {
          file.block0 = await __privateGet(this, _idb).run("readonly", ({ blocks }) => {
            return blocks.get(__privateMethod(this, _bound, bound_fn).call(this, file, 0));
          });
        }
        return result;
      } catch (e) {
        console.error(e);
        return SQLITE_IOERR;
      }
    });
  }
  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {number}
   */
  xUnlock(fileId, flags) {
    return this.handleAsync(async () => {
      const file = __privateGet(this, _mapIdToFile).get(fileId);
      log2(`xUnlock ${file.path} ${flags}`);
      try {
        return file.locks.unlock(flags);
      } catch (e) {
        console.error(e);
        return SQLITE_IOERR;
      }
    });
  }
  /**
   * @param {number} fileId 
   * @param {DataView} pResOut 
   * @returns {number}
   */
  xCheckReservedLock(fileId, pResOut) {
    return this.handleAsync(async () => {
      const file = __privateGet(this, _mapIdToFile).get(fileId);
      log2(`xCheckReservedLock ${file.path}`);
      const isReserved = await file.locks.isSomewhereReserved();
      pResOut.setInt32(0, isReserved ? 1 : 0, true);
      return SQLITE_OK;
    });
  }
  /**
   * @param {number} fileId 
   * @returns {number}
   */
  xSectorSize(fileId) {
    return SECTOR_SIZE;
  }
  /**
   * @param {number} fileId 
   * @returns {number}
   */
  xDeviceCharacteristics(fileId) {
    return SQLITE_IOCAP_BATCH_ATOMIC | SQLITE_IOCAP_SAFE_APPEND | SQLITE_IOCAP_SEQUENTIAL | SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN;
  }
  /**
   * @param {number} fileId 
   * @param {number} op 
   * @param {DataView} pArg 
   * @returns {number}
   */
  xFileControl(fileId, op, pArg) {
    const file = __privateGet(this, _mapIdToFile).get(fileId);
    log2(`xFileControl ${file.path} ${op}`);
    switch (op) {
      case 11:
        file.overwrite = true;
        return SQLITE_OK;
      case 21:
        if (file.overwrite) {
          try {
            return this.handleAsync(async () => {
              await __privateMethod(this, _reblockIfNeeded, reblockIfNeeded_fn).call(this, file);
              return SQLITE_OK;
            });
          } catch (e) {
            console.error(e);
            return SQLITE_IOERR;
          }
        }
        if (file.isMetadataChanged) {
          try {
            __privateGet(this, _idb).run("readwrite", async ({ blocks }) => {
              await blocks.put(file.block0);
            });
          } catch (e) {
            console.error(e);
            return SQLITE_IOERR;
          }
        }
        return SQLITE_OK;
      case 22:
        file.overwrite = false;
        return SQLITE_OK;
      case 31:
        return this.handleAsync(async () => {
          try {
            file.block0.version--;
            file.changedPages = /* @__PURE__ */ new Set();
            __privateGet(this, _idb).run("readwrite", async ({ blocks }) => {
              const keys = await blocks.index("version").getAllKeys(IDBKeyRange.bound(
                [file.path],
                [file.path, file.block0.version]
              ));
              for (const key of keys) {
                blocks.delete(key);
              }
            });
            return SQLITE_OK;
          } catch (e) {
            console.error(e);
            return SQLITE_IOERR;
          }
        });
      case 32:
        try {
          const block0 = Object.assign({}, file.block0);
          block0.data = block0.data.slice();
          const changedPages = file.changedPages;
          file.changedPages = null;
          file.isMetadataChanged = false;
          __privateGet(this, _idb).run("readwrite", async ({ blocks }) => {
            blocks.put(block0);
            const purgeBlock = await blocks.get([file.path, "purge", 0]) ?? {
              path: file.path,
              offset: "purge",
              version: 0,
              data: /* @__PURE__ */ new Map(),
              count: 0
            };
            purgeBlock.count += changedPages.size;
            for (const pageIndex of changedPages) {
              purgeBlock.data.set(pageIndex, block0.version);
            }
            blocks.put(purgeBlock);
            __privateMethod(this, _maybePurge, maybePurge_fn).call(this, file.path, purgeBlock.count);
          });
          return SQLITE_OK;
        } catch (e) {
          console.error(e);
          return SQLITE_IOERR;
        }
      case 33:
        return this.handleAsync(async () => {
          try {
            file.changedPages = null;
            file.isMetadataChanged = false;
            file.block0 = await __privateGet(this, _idb).run("readonly", ({ blocks }) => {
              return blocks.get([file.path, 0, file.block0.version + 1]);
            });
            return SQLITE_OK;
          } catch (e) {
            console.error(e);
            return SQLITE_IOERR;
          }
        });
      default:
        return SQLITE_NOTFOUND;
    }
  }
  /**
   * @param {string} name 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {number}
   */
  xAccess(name, flags, pResOut) {
    return this.handleAsync(async () => {
      try {
        const path = new URL(name, "file://localhost/").pathname;
        log2(`xAccess ${path} ${flags}`);
        const key = await __privateGet(this, _idb).run("readonly", ({ blocks }) => {
          return blocks.getKey(__privateMethod(this, _bound, bound_fn).call(this, { path }, 0));
        });
        pResOut.setInt32(0, key ? 1 : 0, true);
        return SQLITE_OK;
      } catch (e) {
        console.error(e);
        return SQLITE_IOERR;
      }
    });
  }
  /**
   * @param {string} name 
   * @param {number} syncDir 
   * @returns {number}
   */
  xDelete(name, syncDir) {
    return this.handleAsync(async () => {
      const path = new URL(name, "file://localhost/").pathname;
      try {
        __privateGet(this, _idb).run("readwrite", ({ blocks }) => {
          return blocks.delete(IDBKeyRange.bound([path], [path, []]));
        });
        if (syncDir) {
          await __privateGet(this, _idb).sync();
        }
        return SQLITE_OK;
      } catch (e) {
        console.error(e);
        return SQLITE_IOERR;
      }
    });
  }
  /**
   * Purge obsolete blocks from a database file.
   * @param {string} path 
   */
  async purge(path) {
    const start = Date.now();
    await __privateGet(this, _idb).run("readwrite", async ({ blocks }) => {
      const purgeBlock = await blocks.get([path, "purge", 0]);
      if (purgeBlock) {
        for (const [pageOffset, version2] of purgeBlock.data) {
          blocks.delete(IDBKeyRange.bound(
            [path, pageOffset, version2],
            [path, pageOffset, Infinity],
            true,
            false
          ));
        }
        await blocks.delete([path, "purge", 0]);
      }
      log2(`purge ${path} ${purgeBlock?.data.size ?? 0} pages in ${Date.now() - start} ms`);
    });
  }
}, _options = new WeakMap(), _mapIdToFile = new WeakMap(), _idb = new WeakMap(), _pendingPurges = new WeakMap(), _taskTimestamp = new WeakMap(), _pendingAsync = new WeakMap(), _xWriteHelper = new WeakSet(), xWriteHelper_fn = function(fileId, pData, iOffset) {
  const file = __privateGet(this, _mapIdToFile).get(fileId);
  log2(`xWrite ${file.path} ${pData.byteLength} ${iOffset}`);
  try {
    const prevFileSize = file.block0.fileSize;
    if (file.block0.fileSize < iOffset + pData.byteLength) {
      file.block0.fileSize = iOffset + pData.byteLength;
      file.isMetadataChanged = true;
    }
    const block = iOffset === 0 ? file.block0 : {
      path: file.path,
      offset: -iOffset,
      version: file.block0.version,
      data: null
    };
    block.data = pData.slice();
    if (file.changedPages) {
      if (prevFileSize === file.block0.fileSize) {
        file.changedPages.add(-iOffset);
      }
      if (iOffset !== 0) {
        __privateGet(this, _idb).run("readwrite", ({ blocks }) => blocks.put(block));
      }
    } else {
      __privateGet(this, _idb).run("readwrite", ({ blocks }) => blocks.put(block));
    }
    file.isMetadataChanged = iOffset === 0 ? false : file.isMetadataChanged;
    return SQLITE_OK;
  } catch (e) {
    console.error(e);
    return SQLITE_IOERR;
  }
}, _xSyncHelper = new WeakSet(), xSyncHelper_fn = async function(fileId, flags) {
  const file = __privateGet(this, _mapIdToFile).get(fileId);
  log2(`xSync ${file.path} ${flags}`);
  try {
    await __privateGet(this, _idb).sync();
  } catch (e) {
    console.error(e);
    return SQLITE_IOERR;
  }
  return SQLITE_OK;
}, _maybePurge = new WeakSet(), maybePurge_fn = function(path, nPages) {
  if (__privateGet(this, _options).purge === "manual" || __privateGet(this, _pendingPurges).has(path) || nPages < __privateGet(this, _options).purgeAtLeast) {
    return;
  }
  if (globalThis.requestIdleCallback) {
    globalThis.requestIdleCallback(() => {
      this.purge(path);
      __privateGet(this, _pendingPurges).delete(path);
    });
  } else {
    setTimeout(() => {
      this.purge(path);
      __privateGet(this, _pendingPurges).delete(path);
    });
  }
  __privateGet(this, _pendingPurges).add(path);
}, _bound = new WeakSet(), bound_fn = function(file, begin, end = 0) {
  const version2 = !begin || -begin < file.block0.data.length ? -Infinity : file.block0.version;
  return IDBKeyRange.bound(
    [file.path, begin, version2],
    [file.path, end, Infinity]
  );
}, _reblockIfNeeded = new WeakSet(), reblockIfNeeded_fn = async function(file) {
  const oldPageSize = file.block0.data.length;
  if (oldPageSize < 18)
    return;
  const view = new DataView(file.block0.data.buffer, file.block0.data.byteOffset);
  let newPageSize = view.getUint16(16);
  if (newPageSize === 1)
    newPageSize = 65536;
  if (newPageSize === oldPageSize)
    return;
  const maxPageSize = Math.max(oldPageSize, newPageSize);
  const nOldPages = maxPageSize / oldPageSize;
  const nNewPages = maxPageSize / newPageSize;
  const newPageCount = view.getUint32(28);
  const fileSize = newPageCount * newPageSize;
  const version2 = file.block0.version;
  await __privateGet(this, _idb).run("readwrite", async ({ blocks }) => {
    const keys = await blocks.index("version").getAllKeys(IDBKeyRange.bound(
      [file.path, version2 + 1],
      [file.path, Infinity]
    ));
    for (const key of keys) {
      blocks.delete(key);
    }
    blocks.delete([file.path, "purge", 0]);
    for (let iOffset = 0; iOffset < fileSize; iOffset += maxPageSize) {
      const oldPages = await blocks.getAll(
        IDBKeyRange.lowerBound([file.path, -(iOffset + maxPageSize), Infinity]),
        nOldPages
      );
      for (const oldPage of oldPages) {
        blocks.delete([oldPage.path, oldPage.offset, oldPage.version]);
      }
      if (nNewPages === 1) {
        const buffer = new Uint8Array(newPageSize);
        for (const oldPage of oldPages) {
          buffer.set(oldPage.data, -(iOffset + oldPage.offset));
        }
        const newPage = {
          path: file.path,
          offset: -iOffset,
          version: version2,
          data: buffer
        };
        if (newPage.offset === 0) {
          newPage.fileSize = fileSize;
          file.block0 = newPage;
        }
        blocks.put(newPage);
      } else {
        const oldPage = oldPages[0];
        for (let i = 0; i < nNewPages; ++i) {
          const offset = -(iOffset + i * newPageSize);
          if (-offset >= fileSize)
            break;
          const newPage = {
            path: oldPage.path,
            offset,
            version: version2,
            data: oldPage.data.subarray(i * newPageSize, (i + 1) * newPageSize)
          };
          if (newPage.offset === 0) {
            newPage.fileSize = fileSize;
            file.block0 = newPage;
          }
          blocks.put(newPage);
        }
      }
    }
  });
}, _g);
function openDatabase(idbDatabaseName) {
  return new Promise((resolve, reject) => {
    const request = globalThis.indexedDB.open(idbDatabaseName, 5);
    request.addEventListener("upgradeneeded", function() {
      const blocks = request.result.createObjectStore("blocks", {
        keyPath: ["path", "offset", "version"]
      });
      blocks.createIndex("version", ["path", "version"]);
    });
    request.addEventListener("success", () => {
      resolve(request.result);
    });
    request.addEventListener("error", () => {
      reject(request.error);
    });
  });
}
async function useIdbStorage(fileName, options = {}) {
  const { url, durability = "relaxed", ...rest } = options;
  const SQLiteAsyncModule = await wa_sqlite_async_default(
    url ? { locateFile: () => url } : void 0
  );
  const sqlite = Factory(SQLiteAsyncModule);
  sqlite.vfs_register(
    new IDBBatchAtomicVFS(fileName, { durability, ...rest })
  );
  return { fileName, sqlite };
}
const dialect$1 = new WaSqliteDialect({
  async database() {
    return await initSQLite(useIdbStorage("test idb", {
      url: getAsyncWasmURL()
    }));
  }
});
function useWaSqlite() {
  console.log("start wa-sqlite test");
  testDB(dialect$1).then((data) => {
    data?.forEach((e) => console.log("[wa-sqlite]", e));
  });
}
var mitt = (map = /* @__PURE__ */ new Map()) => ({
  on(event, handler) {
    map.get(event)?.push(handler) || map.set(event, [handler]);
  },
  off(event, handler) {
    let handlers;
    event ? handler ? (handlers = map.get(event)) && handlers.splice(handlers.indexOf(handler) >>> 0, 1) : map.set(event, []) : map.clear();
  },
  emit(event, ...data) {
    map.get(event)?.slice().map((handler) => handler(...data));
  },
  once(event, handler) {
    let fn = (...args) => {
      handler(...args);
      this.off(event, fn);
    };
    this.on(event, fn);
  }
});
var WaSqliteWorkerDriver = class {
  constructor(config) {
    __publicField(this, "config");
    __publicField(this, "worker");
    __publicField(this, "connection");
    __publicField(this, "connectionMutex", new ConnectionMutex2());
    __publicField(this, "mitt");
    this.config = config;
  }
  async init() {
    this.worker = this.config.worker ?? new Worker(new URL("" + new URL("worker-cad26e17.js", import.meta.url).href, self.location), { type: "module" });
    this.mitt = mitt();
    this.worker.onmessage = ({ data: { type, ...msg } }) => {
      this.mitt?.emit(type, msg);
    };
    this.worker.postMessage({
      type: "init",
      fileName: this.config.fileName,
      url: this.config.url,
      preferOPFS: this.config.preferOPFS
    });
    await new Promise((resolve, reject) => {
      this.mitt?.once("init", ({ err }) => {
        err ? reject(err) : resolve();
      });
    });
    this.connection = new WaSqliteWorkerConnection(this.worker, this.mitt);
    await this.config.onCreateConnection?.(this.connection);
  }
  async acquireConnection() {
    await this.connectionMutex.lock();
    return this.connection;
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
    this.connectionMutex.unlock();
  }
  async destroy() {
    if (!this.worker) {
      return;
    }
    this.worker.postMessage({ type: "close" });
    return new Promise((resolve, reject) => {
      this.mitt?.once("close", ({ err }) => {
        if (err) {
          reject(err);
        } else {
          this.worker?.terminate();
          this.mitt?.off();
          this.mitt = void 0;
          resolve();
        }
      });
    });
  }
};
var ConnectionMutex2 = class {
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
var WaSqliteWorkerConnection = class {
  constructor(worker, mitt2) {
    __publicField(this, "worker");
    __publicField(this, "mitt");
    this.worker = worker;
    this.mitt = mitt2;
  }
  streamQuery() {
    throw new Error("SQLite driver doesn't support streaming");
  }
  async executeQuery(compiledQuery) {
    const { parameters, sql: sql2, query } = compiledQuery;
    const isSelect = SelectQueryNode.is(query);
    this.worker.postMessage({ type: "run", isSelect, sql: sql2, parameters });
    return new Promise((resolve, reject) => {
      !this.mitt && reject("kysely instance has been destroyed");
      this.mitt.once("run", ({ data, err }) => {
        !err && data ? resolve(data) : reject(err);
      });
    });
  }
};
function isIdbSupported() {
  return "locks" in navigator;
}
var WaSqliteWorkerDialect = (_h = class {
  /**
   * dialect for [wa-sqlite](https://github.com/rhashimoto/wa-sqlite)
   *
   * execute sql in `Web Worker`, store data in IndexedDB
   */
  constructor(config) {
    __privateAdd(this, _config2, void 0);
    __privateSet(this, _config2, config);
  }
  createDriver() {
    return new WaSqliteWorkerDriver(__privateGet(this, _config2));
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
}, _config2 = new WeakMap(), _h);
const dialect = new WaSqliteWorkerDialect({
  fileName: "wa-sqlite-worker-test",
  preferOPFS: true
  // url,
  // worker: new Worker(),
});
function useWaSqliteWorker() {
  console.log("start wa-sqlite-worker test");
  if (!isIdbSupported()) {
    console.error("[wa-sqlite-worker]: unsupported browser");
    return;
  }
  testDB(dialect).then((data) => {
    data?.forEach((e) => console.log("[wa-sqlite-worker]", e));
  });
}
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h1", null, [
  /* @__PURE__ */ createTextVNode(" test "),
  /* @__PURE__ */ createBaseVNode("a", {
    href: "https://github.com/kysely-org/kysely",
    target: "_blank"
  }, "Kysely"),
  /* @__PURE__ */ createTextVNode(" WASM dialect ")
], -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("h3", null, "see worker result in console", -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("h3", null, [
  /* @__PURE__ */ createTextVNode(" you can explore "),
  /* @__PURE__ */ createBaseVNode("a", {
    href: "https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API#origin_private_file_system",
    target: "_blank"
  }, " OPFS "),
  /* @__PURE__ */ createTextVNode(" file using "),
  /* @__PURE__ */ createBaseVNode("a", {
    href: "https://chrome.google.com/webstore/detail/opfs-explorer/acndjpgkpaclldomagafnognkcgjignd",
    target: "_blank"
  }, " opfs-explorer ")
], -1);
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_6 = { class: "buttons" };
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_8 = /* @__PURE__ */ createBaseVNode("div", null, " result run in main thread: ", -1);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    const sqljsWorker = new WorkerWrapper$1();
    const { result, run } = useDB();
    const officialWorker = new WorkerWrapper();
    function testSqljsMain() {
      run();
    }
    function testSqljsWorker() {
      sqljsWorker.postMessage("");
    }
    function testOfficialWasm() {
      officialWorker.postMessage("");
    }
    function testWaSqlite() {
      useWaSqlite();
    }
    function testWaSqliteWorker() {
      useWaSqliteWorker();
    }
    async function deleteDatabase() {
      try {
        const dbs = await window.indexedDB.databases();
        dbs.forEach((db) => window.indexedDB.deleteDatabase(db.name));
      } catch {
      }
    }
    async function clear2() {
      await deleteFile("sqljs");
      await deleteFile("sqljsWorker");
      await deleteDatabase();
      const root = await navigator.storage?.getDirectory();
      try {
        await root.removeEntry("test.db");
      } catch {
      }
      try {
        await root.removeEntry("test.db-journal");
      } catch {
      }
      try {
        await root.removeEntry("wa-sqlite-worker-test", { recursive: true });
      } catch {
      }
      console.log("clear all");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _hoisted_1,
        _hoisted_2,
        _hoisted_3,
        _hoisted_4,
        _hoisted_5,
        createBaseVNode("div", _hoisted_6, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => testSqljsMain())
          }, " test sqljs in main thread "),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => testSqljsWorker())
          }, " test sqljs in Worker "),
          createBaseVNode("button", {
            onClick: _cache[2] || (_cache[2] = ($event) => testOfficialWasm())
          }, " test officialWasm in Worker "),
          createBaseVNode("button", {
            onClick: _cache[3] || (_cache[3] = ($event) => testWaSqlite())
          }, " test wa-sqlite in main thread "),
          createBaseVNode("button", {
            onClick: _cache[4] || (_cache[4] = ($event) => testWaSqliteWorker())
          }, " test wa-sqlite in Worker "),
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => clear2())
          }, " clear ")
        ]),
        _hoisted_7,
        _hoisted_8,
        createBaseVNode("pre", null, "" + toDisplayString(unref(result)) + "\n  ", 1)
      ], 64);
    };
  }
});
const App_vue_vue_type_style_index_0_lang = "";
createApp(_sfc_main).mount("#root");
