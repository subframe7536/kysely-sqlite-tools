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
var _props, _props2, _dynamicReference, _insertId, _numInsertedOrUpdatedRows, _props3, _props4, _props5, _props6, _numDeletedRows, _props7, _numUpdatedRows, _props8, _queryId, _transformers, _schema, _schemableIds, _isRootOperationNode, isRootOperationNode_fn, _collectSchemableIds, collectSchemableIds_fn, _collectSchemableIdsFromTableExpr, collectSchemableIdsFromTableExpr_fn, _collectSchemableId, collectSchemableId_fn, _removeCommonTableExpressionTables, removeCommonTableExpressionTables_fn, _transformer, _props9, _promise, _resolve, _reject, _plugins, _transformResult, transformResult_fn, _props10, _queryBuilder, _alias, _node, _expr, _alias2, _props11, _aggregateFunctionBuilder, _alias3, _props12, _props13, _props14, _props15, _node2, _node3, _props16, _props17, _props18, _props19, _props20, _props21, _props22, _props23, _props24, _props25, _props26, _transformer2, _props27, _props28, _props29, _props30, _executor, _driver, _compiler, _adapter, _connectionProvider, _driver2, _log, _initPromise, _destroyPromise, _connections, _needsLogging, needsLogging_fn, _addLogging, addLogging_fn, _logError, logError_fn, _logQuery, logQuery_fn, _calculateDurationMillis, calculateDurationMillis_fn, _connection, _runningPromise, _run, run_fn, _levels, _logger, _props31, _props32, _props33, _props34, _props35, _getExecutor, getExecutor_fn, _toOperationNode, toOperationNode_fn, _compile, compile_fn, _rawBuilder, _alias4, _visitors, _sql, _parameters, _db, _getTableMetadata, getTableMetadata_fn, _connectionMutex, _db2, _a, _promise2, _resolve2, _b, _config, _db3, _c, _db4, _lastId, _d, _config2, _e, _config3, _db5, _f, _db6, _onWrite, _g, _config4, _h, _serializer, _i, _serializeParametersTransformer, _deserializer, _data, _j, _status, _tableMap, _k, _state, _releasers, _pending, _apply, apply_fn, _lock, lock_fn, _unlock, unlock_fn, _dbReady, _txOptions, _tx, _txComplete, _request, _chain, _run2, run_fn2, _setRequest, setRequest_fn, _options, _mapIdToFile, _idb, _pendingPurges, _maybePurge, maybePurge_fn, _bound, bound_fn, _reblockIfNeeded, reblockIfNeeded_fn, _siteid, _updateHooks, _closed, _tx2, _assertOpen, _onUpdate;
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
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$2(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$2(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*.*?\*\//gs;
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
  if (isString$2(value)) {
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
  return isString$2(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction$1(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
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
const isFunction$1 = (val) => typeof val === "function";
const isString$2 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$2(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
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
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
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
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
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
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
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
      if (key2 === "length" || key2 >= newLength) {
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
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
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
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
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
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
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
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
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
  const target = this[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
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
    const target = observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
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
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
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
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
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
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
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
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
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
  return value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    return target;
  }
  if (target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ] && !(isReadonly2 && target[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ])) {
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
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ]);
  }
  return !!(value && value[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ]);
}
function isReadonly(value) {
  return !!(value && value[
    "__v_isReadonly"
    /* ReactiveFlags.IS_READONLY */
  ]);
}
function isShallow(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
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
var _a$1;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a$1] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ] = isReadonly2;
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
_a$1 = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$1(getterOrOptions);
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
  if (isFunction$1(fn)) {
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
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
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
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
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
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
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
        callWithErrorHandling(
          job,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
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
/* @__PURE__ */ new Set();
/* @__PURE__ */ new Map();
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
      args = rawArgs.map((a) => isString$2(a) ? a.trim() : a);
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
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
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
  if (!isFunction$1(comp)) {
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
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false)
        ;
      result = normalizeVNode(render2.length > 1 ? render2(props, false ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit: emit2
      } : { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      ));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(
      err,
      instance,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    );
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
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
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else
      ;
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  const instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
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
      } else if (isFunction$1(s)) {
        return callWithErrorHandling(
          s,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else
        ;
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(
        source,
        instance,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
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
      callWithErrorHandling(
        fn,
        instance,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
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
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
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
  const getter = isString$2(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
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
  if (!isObject$1(value) || value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ]) {
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
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    // leave
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    // appear
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        for (const c of children) {
          if (c.type !== Comment) {
            child = c;
            break;
          }
        }
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options) {
  return isFunction$1(options) ? { setup: options, name: options.name } : options;
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
const onBeforeMount = createHook(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
);
const onMounted = createHook(
  "m"
  /* LifecycleHooks.MOUNTED */
);
const onBeforeUpdate = createHook(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
);
const onUpdated = createHook(
  "u"
  /* LifecycleHooks.UPDATED */
);
const onBeforeUnmount = createHook(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
);
const onUnmounted = createHook(
  "um"
  /* LifecycleHooks.UNMOUNTED */
);
const onServerPrefetch = createHook(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
);
const onRenderTriggered = createHook(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
);
const onRenderTracked = createHook(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
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
const NULL_DYNAMIC_COMPONENT = Symbol();
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
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
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
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(
      options.beforeCreate,
      instance,
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    );
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
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$1(methodHandler)) {
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
      const get2 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : NOOP;
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
    const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(
      created,
      instance,
      "c"
      /* LifecycleHooks.CREATED */
    );
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
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
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
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$2(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction$1(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
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
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
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
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
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
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
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
    return extend(isFunction$1(to) ? to.call(this, this) : to, isFunction$1(from) ? from.call(this, this) : from);
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
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
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
  const { props, attrs, vnode: { patchFlag } } = instance;
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
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
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
      if (opt.type !== Function && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* BooleanFlags.shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* BooleanFlags.shouldCastTrue */
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
  if (!isFunction$1(comp)) {
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
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction$1(opt) ? { type: opt } : Object.assign({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* BooleanFlags.shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* BooleanFlags.shouldCastTrue */
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
  } else if (isFunction$1(expectedTypes)) {
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
    if (isFunction$1(value)) {
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
      normalizeObjectSlots(children, instance.slots = {});
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
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
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
    if (!isFunction$1(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
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
        else if (plugin && isFunction$1(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction$1(plugin)) {
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
      }
    };
    return app;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
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
    if (isString$2(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction$1(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString$2(ref2);
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
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
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
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else
          ;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
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
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
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
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
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
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
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
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
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
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
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
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
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
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
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
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
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
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
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
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
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
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
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
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
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
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
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
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
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
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
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
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
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
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
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
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
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
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
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
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(
              nextChild,
              container,
              anchor,
              2
              /* MoveType.REORDER */
            );
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
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
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
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
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
    [hydrate, hydrateNode] = createHydrationFns(internals);
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
const Fragment = Symbol(void 0);
const Text = Symbol(void 0);
const Comment = Symbol(void 0);
const Static = Symbol(void 0);
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
  return setupBlock(createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    true
    /* isBlock */
  ));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null ? isString$2(ref2) || isRef(ref2) || isFunction$1(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
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
    vnode.shapeFlag |= isString$2(children) ? 8 : 16;
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
    if (klass && !isString$2(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$2(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction$1(type) ? 2 : 0;
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
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
  } else if (isFunction$1(children)) {
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
    next: null,
    subTree: null,
    effect: null,
    update: null,
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
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
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
    const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(
            e,
            instance,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
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
  if (isFunction$1(setupResult)) {
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
        const finalCompilerOptions = extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return {
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
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
  return isFunction$1(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const ssrContextKey = Symbol(``);
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
const version = "3.2.47";
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
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
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
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$2(next);
  if (next && !isCssString) {
    if (prev && !isString$2(prev)) {
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
    if ("_vod" in el) {
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
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
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
  if (key === "value" && el.tagName !== "PROGRESS" && // custom elements may use _value internally
  !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    el.tagName === "OPTION") {
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
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
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
    callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
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
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
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
    if (key in el && nativeOnRE.test(key) && isFunction$1(value)) {
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
  if (nativeOnRE.test(key) && isString$2(value)) {
    return false;
  }
  return key in el;
}
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
/* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators);
/* @__PURE__ */ new WeakMap();
/* @__PURE__ */ new WeakMap();
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
    if (!isFunction$1(component) && !component.render && !component.template) {
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
  if (isString$2(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
function isUndefined(obj) {
  return typeof obj === "undefined" || obj === void 0;
}
function isString$1(obj) {
  return typeof obj === "string";
}
function isNumber(obj) {
  return typeof obj === "number";
}
function isBoolean$1(obj) {
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
  return isObject(obj) && isFunction(obj.toOperationNode);
}
function isExpression(obj) {
  return isObject(obj) && "expressionType" in obj && isOperationNodeSource(obj);
}
function isAliasedExpression(obj) {
  return isObject(obj) && "expression" in obj && isString$1(obj.alias) && isOperationNodeSource(obj);
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
  },
  cloneWithOrOn(joinNode, operation) {
    return freeze({
      ...joinNode,
      on: joinNode.on ? OnNode.cloneWithOperation(joinNode.on, "Or", operation) : OnNode.create(operation)
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
  "<->"
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
const BINARY_OPERATORS = [
  ...COMPARISON_OPERATORS,
  ...ARITHMETIC_OPERATORS,
  "&&",
  "||"
];
const UNARY_FILTER_OPERATORS = ["exists", "not exists"];
const UNARY_OPERATORS = ["not", "-", ...UNARY_FILTER_OPERATORS];
const OPERATORS = [...BINARY_OPERATORS, ...UNARY_OPERATORS];
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
function isBinaryOperator(op) {
  return isString$1(op) && BINARY_OPERATORS.includes(op);
}
function isComparisonOperator(op) {
  return isString$1(op) && COMPARISON_OPERATORS.includes(op);
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
  create(table, column) {
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
function isOrderByDirection(thing) {
  return thing === "asc" || thing === "desc";
}
function parseOrderBy(orderBy, direction) {
  return OrderByItemNode.create(parseOrderByExpression(orderBy), parseOrderByDirectionExpression(direction));
}
function parseOrderByExpression(expr) {
  return parseReferenceExpression(expr);
}
function parseOrderByDirectionExpression(expr) {
  if (!expr) {
    return void 0;
  }
  if (expr === "asc" || expr === "desc") {
    return RawNode.createWithSql(expr);
  } else {
    return expr.toOperationNode();
  }
}
function parseSimpleReferenceExpression(exp) {
  if (isString$1(exp)) {
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
function parseStringReference(ref2) {
  const COLUMN_SEPARATOR = ".";
  if (ref2.includes(COLUMN_SEPARATOR)) {
    const parts = ref2.split(COLUMN_SEPARATOR).map(trim$2);
    if (parts.length === 3) {
      return parseStringReferenceWithTableAndSchema(parts);
    } else if (parts.length === 2) {
      return parseStringReferenceWithTable(parts);
    } else {
      throw new Error(`invalid column reference ${ref2}`);
    }
  } else {
    return ColumnNode.create(ref2);
  }
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
    return parseOrderBy(columnName, order);
  } else {
    return parseColumnName(column);
  }
}
function parseStringReferenceWithTableAndSchema(parts) {
  const [schema, table, column] = parts;
  return ReferenceNode.create(TableNode.createWithSchema(schema, table), ColumnNode.create(column));
}
function parseStringReferenceWithTable(parts) {
  const [table, column] = parts;
  return ReferenceNode.create(TableNode.create(table), ColumnNode.create(column));
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
function parseValueExpressionList(arg) {
  if (arg.some(isExpressionOrFactory)) {
    return ValueListNode.create(arg.map((it) => parseValueExpression(it)));
  }
  return PrimitiveValueListNode.create(arg);
}
const OrderByNode = freeze({
  is(node) {
    return node.kind === "OrderByNode";
  },
  create(item) {
    return freeze({
      kind: "OrderByNode",
      items: freeze([item])
    });
  },
  cloneWithItem(orderBy, item) {
    return freeze({
      ...orderBy,
      items: freeze([...orderBy.items, item])
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
  cloneWithOrderByItem(overNode, item) {
    return freeze({
      ...overNode,
      orderBy: overNode.orderBy ? OrderByNode.cloneWithItem(overNode.orderBy, item) : OrderByNode.create(item)
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
  create(fromItems, withNode) {
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
  cloneWithOrderByItem(selectNode, item) {
    return freeze({
      ...selectNode,
      orderBy: selectNode.orderBy ? OrderByNode.cloneWithItem(selectNode.orderBy, item) : OrderByNode.create(item)
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
  cloneWithOrHaving(selectNode, operation) {
    return freeze({
      ...selectNode,
      having: selectNode.having ? HavingNode.cloneWithOperation(selectNode.having, "Or", operation) : HavingNode.create(operation)
    });
  },
  cloneWithSetOperation(selectNode, setOperation) {
    return freeze({
      ...selectNode,
      setOperations: selectNode.setOperations ? freeze([...selectNode.setOperations, setOperation]) : freeze([setOperation])
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
function parseExists(operand) {
  return parseUnaryOperation("exists", operand);
}
function parseNotExists(operand) {
  return parseUnaryOperation("not exists", operand);
}
function parseUnaryOperation(operator, operand) {
  return UnaryOperationNode.create(OperatorNode.create(operator), parseReferenceExpression(operand));
}
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
const _JoinBuilder = class {
  constructor(props) {
    __privateAdd(this, _props, void 0);
    __privateSet(this, _props, freeze(props));
  }
  on(...args) {
    return new _JoinBuilder({
      ...__privateGet(this, _props),
      joinNode: JoinNode.cloneWithOn(__privateGet(this, _props).joinNode, parseOn(args))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orOn(...args) {
    return new _JoinBuilder({
      ...__privateGet(this, _props),
      joinNode: JoinNode.cloneWithOrOn(__privateGet(this, _props).joinNode, parseOn(args))
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
      joinNode: JoinNode.cloneWithOn(__privateGet(this, _props).joinNode, parseReferentialComparison(lhs, op, rhs))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orOnRef(lhs, op, rhs) {
    return new _JoinBuilder({
      ...__privateGet(this, _props),
      joinNode: JoinNode.cloneWithOrOn(__privateGet(this, _props).joinNode, parseReferentialComparison(lhs, op, rhs))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  onExists(arg) {
    return new _JoinBuilder({
      ...__privateGet(this, _props),
      joinNode: JoinNode.cloneWithOn(__privateGet(this, _props).joinNode, parseExists(arg))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  onNotExists(arg) {
    return new _JoinBuilder({
      ...__privateGet(this, _props),
      joinNode: JoinNode.cloneWithOn(__privateGet(this, _props).joinNode, parseNotExists(arg))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orOnExists(arg) {
    return new _JoinBuilder({
      ...__privateGet(this, _props),
      joinNode: JoinNode.cloneWithOrOn(__privateGet(this, _props).joinNode, parseExists(arg))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orOnNotExists(arg) {
    return new _JoinBuilder({
      ...__privateGet(this, _props),
      joinNode: JoinNode.cloneWithOrOn(__privateGet(this, _props).joinNode, parseNotExists(arg))
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
let JoinBuilder = _JoinBuilder;
_props = new WeakMap();
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
const _OverBuilder = class {
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
   *     eb => eb.fn.avg<number>('age').over(
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
      overNode: OverNode.cloneWithOrderByItem(__privateGet(this, _props2).overNode, parseOrderBy(orderBy, direction))
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
let OverBuilder = _OverBuilder;
_props2 = new WeakMap();
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
  return isObject(obj) && isOperationNodeSource(obj) && isString$1(obj.dynamicReference);
}
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
  if (isString$1(selection)) {
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
  if (isString$1(table)) {
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
  cloneWithOrderByItem(deleteNode, item) {
    return freeze({
      ...deleteNode,
      orderBy: deleteNode.orderBy ? OrderByNode.cloneWithItem(deleteNode.orderBy, item) : OrderByNode.create(item)
    });
  },
  cloneWithLimit(deleteNode, limit) {
    return freeze({
      ...deleteNode,
      limit
    });
  },
  cloneWithUsing(deleteNode, tables) {
    return freeze({
      ...deleteNode,
      using: deleteNode.using !== void 0 ? UsingNode.cloneWithTables(deleteNode.using, tables) : UsingNode.create(tables)
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
  cloneWithOrWhere(node, operation) {
    return freeze({
      ...node,
      where: node.where ? WhereNode.cloneWithOperation(node.where, "Or", operation) : WhereNode.create(operation)
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
      explain: ExplainNode.create(format, options == null ? void 0 : options.toOperationNode())
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
    __privateAdd(this, _insertId, void 0);
    __privateAdd(this, _numInsertedOrUpdatedRows, void 0);
    __privateSet(this, _insertId, insertId);
    __privateSet(this, _numInsertedOrUpdatedRows, numInsertedOrUpdatedRows);
  }
  /**
   * The auto incrementing primary key
   */
  get insertId() {
    return __privateGet(this, _insertId);
  }
  /**
   * Affected rows count.
   */
  get numInsertedOrUpdatedRows() {
    return __privateGet(this, _numInsertedOrUpdatedRows);
  }
}
_insertId = new WeakMap();
_numInsertedOrUpdatedRows = new WeakMap();
for (const property of ["insertId", "numInsertedOrUpdatedRows"]) {
  Object.defineProperty(InsertResult.prototype, property, { enumerable: true });
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
const _OnConflictBuilder = class {
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
      onConflictNode: OnConflictNode.cloneWithIndexWhere(__privateGet(this, _props3).onConflictNode, parseWhere(args))
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
      onConflictNode: OnConflictNode.cloneWithIndexWhere(__privateGet(this, _props3).onConflictNode, parseReferentialComparison(lhs, op, rhs))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orWhere(...args) {
    return new _OnConflictBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWithIndexOrWhere(__privateGet(this, _props3).onConflictNode, parseWhere(args))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orWhereRef(lhs, op, rhs) {
    return new _OnConflictBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWithIndexOrWhere(__privateGet(this, _props3).onConflictNode, parseReferentialComparison(lhs, op, rhs))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  whereExists(arg) {
    return new _OnConflictBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWithIndexWhere(__privateGet(this, _props3).onConflictNode, parseExists(arg))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  whereNotExists(arg) {
    return new _OnConflictBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWithIndexWhere(__privateGet(this, _props3).onConflictNode, parseNotExists(arg))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orWhereExists(arg) {
    return new _OnConflictBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWithIndexOrWhere(__privateGet(this, _props3).onConflictNode, parseExists(arg))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orWhereNotExists(arg) {
    return new _OnConflictBuilder({
      ...__privateGet(this, _props3),
      onConflictNode: OnConflictNode.cloneWithIndexOrWhere(__privateGet(this, _props3).onConflictNode, parseNotExists(arg))
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
let OnConflictBuilder = _OnConflictBuilder;
_props3 = new WeakMap();
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
const _OnConflictUpdateBuilder = class {
  constructor(props) {
    __privateAdd(this, _props5, void 0);
    __privateSet(this, _props5, freeze(props));
  }
  where(...args) {
    return new _OnConflictUpdateBuilder({
      ...__privateGet(this, _props5),
      onConflictNode: OnConflictNode.cloneWithUpdateWhere(__privateGet(this, _props5).onConflictNode, parseWhere(args))
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
      onConflictNode: OnConflictNode.cloneWithUpdateWhere(__privateGet(this, _props5).onConflictNode, parseReferentialComparison(lhs, op, rhs))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orWhere(...args) {
    return new _OnConflictUpdateBuilder({
      ...__privateGet(this, _props5),
      onConflictNode: OnConflictNode.cloneWithUpdateOrWhere(__privateGet(this, _props5).onConflictNode, parseWhere(args))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orWhereRef(lhs, op, rhs) {
    return new _OnConflictUpdateBuilder({
      ...__privateGet(this, _props5),
      onConflictNode: OnConflictNode.cloneWithUpdateOrWhere(__privateGet(this, _props5).onConflictNode, parseReferentialComparison(lhs, op, rhs))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  whereExists(arg) {
    return new _OnConflictUpdateBuilder({
      ...__privateGet(this, _props5),
      onConflictNode: OnConflictNode.cloneWithUpdateWhere(__privateGet(this, _props5).onConflictNode, parseExists(arg))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  whereNotExists(arg) {
    return new _OnConflictUpdateBuilder({
      ...__privateGet(this, _props5),
      onConflictNode: OnConflictNode.cloneWithUpdateWhere(__privateGet(this, _props5).onConflictNode, parseNotExists(arg))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orWhereExists(arg) {
    return new _OnConflictUpdateBuilder({
      ...__privateGet(this, _props5),
      onConflictNode: OnConflictNode.cloneWithUpdateOrWhere(__privateGet(this, _props5).onConflictNode, parseExists(arg))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orWhereNotExists(arg) {
    return new _OnConflictUpdateBuilder({
      ...__privateGet(this, _props5),
      onConflictNode: OnConflictNode.cloneWithUpdateOrWhere(__privateGet(this, _props5).onConflictNode, parseNotExists(arg))
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
let OnConflictUpdateBuilder = _OnConflictUpdateBuilder;
_props5 = new WeakMap();
preventAwait(OnConflictUpdateBuilder, "don't await OnConflictUpdateBuilder instances.");
const _InsertQueryBuilder = class {
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
   * @deprecated Use `$call` instead
   */
  call(func) {
    return this.$call(func);
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
   * @deprecated Use `$if` instead
   */
  if(condition, func) {
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
   * @deprecated Use `$castTo` instead.
   */
  castTo() {
    return this.$castTo();
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
   * @deprecated Use `$assertType` instead.
   */
  assertType() {
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
let InsertQueryBuilder = _InsertQueryBuilder;
_props6 = new WeakMap();
preventAwait(InsertQueryBuilder, "don't await InsertQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
class DeleteResult {
  constructor(numDeletedRows) {
    __privateAdd(this, _numDeletedRows, void 0);
    __privateSet(this, _numDeletedRows, numDeletedRows);
  }
  get numDeletedRows() {
    return __privateGet(this, _numDeletedRows);
  }
}
_numDeletedRows = new WeakMap();
Object.defineProperty(DeleteResult.prototype, "numDeletedRows", {
  enumerable: true
});
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
const _DeleteQueryBuilder = class {
  constructor(props) {
    __privateAdd(this, _props7, void 0);
    __privateSet(this, _props7, freeze(props));
  }
  where(...args) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props7).queryNode, parseWhere(args))
    });
  }
  whereRef(lhs, op, rhs) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props7).queryNode, parseReferentialComparison(lhs, op, rhs))
    });
  }
  orWhere(...args) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props7).queryNode, parseWhere(args))
    });
  }
  orWhereRef(lhs, op, rhs) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props7).queryNode, parseReferentialComparison(lhs, op, rhs))
    });
  }
  whereExists(arg) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props7).queryNode, parseExists(arg))
    });
  }
  whereNotExists(arg) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props7).queryNode, parseNotExists(arg))
    });
  }
  orWhereExists(arg) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props7).queryNode, parseExists(arg))
    });
  }
  orWhereNotExists(arg) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props7).queryNode, parseNotExists(arg))
    });
  }
  clearWhere() {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: QueryNode.cloneWithoutWhere(__privateGet(this, _props7).queryNode)
    });
  }
  using(tables) {
    return new _DeleteQueryBuilder({
      ...__privateGet(this, _props7),
      queryNode: DeleteQueryNode.cloneWithUsing(__privateGet(this, _props7).queryNode, parseTableExpressionOrList(tables))
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
      queryNode: DeleteQueryNode.cloneWithOrderByItem(__privateGet(this, _props7).queryNode, parseOrderBy(orderBy, direction))
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
   * @deprecated Use `$call` instead
   */
  call(func) {
    return this.$call(func);
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
   * @deprecated Use `$if` instead
   */
  if(condition, func) {
    return this.$if(condition, func);
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
   * @deprecated Use `$castTo` instead.
   */
  castTo() {
    return this.$castTo();
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
   * @deprecated Use `$assertType` instead.
   */
  assertType() {
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
let DeleteQueryBuilder = _DeleteQueryBuilder;
_props7 = new WeakMap();
preventAwait(DeleteQueryBuilder, "don't await DeleteQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
class UpdateResult {
  constructor(numUpdatedRows) {
    __privateAdd(this, _numUpdatedRows, void 0);
    __privateSet(this, _numUpdatedRows, numUpdatedRows);
  }
  get numUpdatedRows() {
    return __privateGet(this, _numUpdatedRows);
  }
}
_numUpdatedRows = new WeakMap();
Object.defineProperty(UpdateResult.prototype, "numUpdatedRows", {
  enumerable: true
});
const _UpdateQueryBuilder = class {
  constructor(props) {
    __privateAdd(this, _props8, void 0);
    __privateSet(this, _props8, freeze(props));
  }
  where(...args) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props8).queryNode, parseWhere(args))
    });
  }
  whereRef(lhs, op, rhs) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props8).queryNode, parseReferentialComparison(lhs, op, rhs))
    });
  }
  orWhere(...args) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props8).queryNode, parseWhere(args))
    });
  }
  orWhereRef(lhs, op, rhs) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props8).queryNode, parseReferentialComparison(lhs, op, rhs))
    });
  }
  whereExists(arg) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props8).queryNode, parseExists(arg))
    });
  }
  whereNotExists(arg) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props8).queryNode, parseNotExists(arg))
    });
  }
  orWhereExists(arg) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props8).queryNode, parseExists(arg))
    });
  }
  orWhereNotExists(arg) {
    return new _UpdateQueryBuilder({
      ...__privateGet(this, _props8),
      queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props8).queryNode, parseNotExists(arg))
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
   * @deprecated Use `$call` instead
   */
  call(func) {
    return this.$call(func);
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
   * @deprecated Use `$if` instead
   */
  if(condition, func) {
    return this.$if(condition, func);
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
   * @deprecated Use `$castTo` instead.
   */
  castTo() {
    return this.$castTo();
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
   * @deprecated Use `$assertType` instead.
   */
  assertType() {
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
let UpdateQueryBuilder = _UpdateQueryBuilder;
_props8 = new WeakMap();
preventAwait(UpdateQueryBuilder, "don't await UpdateQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
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
  }
});
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
function parseCommonTableExpression(name, expression) {
  const builder = expression(createQueryCreator());
  return CommonTableExpressionNode.create(parseCommonTableExpressionName(name), builder.toOperationNode());
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
      WhenNode: this.transformWhen.bind(this)
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
      table: this.transformNode(node.table),
      column: this.transformNode(node.column)
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
    __privateAdd(this, _collectSchemableIdsFromTableExpr);
    __privateAdd(this, _collectSchemableId);
    __privateAdd(this, _removeCommonTableExpressionTables);
    __privateAdd(this, _schema, void 0);
    __privateAdd(this, _schemableIds, /* @__PURE__ */ new Set());
    __privateSet(this, _schema, schema);
  }
  transformNodeImpl(node) {
    if (!__privateMethod(this, _isRootOperationNode, isRootOperationNode_fn).call(this, node)) {
      return super.transformNodeImpl(node);
    }
    const tables = __privateMethod(this, _collectSchemableIds, collectSchemableIds_fn).call(this, node);
    for (const table of tables) {
      __privateGet(this, _schemableIds).add(table);
    }
    const transformed = super.transformNodeImpl(node);
    for (const table of tables) {
      __privateGet(this, _schemableIds).delete(table);
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
  if ("with" in node && node.with) {
    __privateMethod(this, _removeCommonTableExpressionTables, removeCommonTableExpressionTables_fn).call(this, node.with, schemableIds);
  }
  return schemableIds;
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
  if (!__privateGet(this, _schemableIds).has(node.identifier.name)) {
    schemableIds.add(node.identifier.name);
  }
};
_removeCommonTableExpressionTables = new WeakSet();
removeCommonTableExpressionTables_fn = function(node, schemableIds) {
  for (const expr of node.expressions) {
    schemableIds.delete(expr.name.table.table.identifier.name);
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
const _QueryCreator = class {
  constructor(props) {
    __privateAdd(this, _props9, void 0);
    __privateSet(this, _props9, freeze(props));
  }
  selectFrom(from) {
    return new SelectQueryBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _props9).executor,
      queryNode: SelectQueryNode.create(parseTableExpressionOrList(from), __privateGet(this, _props9).withNode)
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
      executor: __privateGet(this, _props9).executor,
      queryNode: InsertQueryNode.create(parseTable(table), __privateGet(this, _props9).withNode)
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
      executor: __privateGet(this, _props9).executor,
      queryNode: InsertQueryNode.create(parseTable(table), __privateGet(this, _props9).withNode, true)
    });
  }
  deleteFrom(tables) {
    return new DeleteQueryBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _props9).executor,
      queryNode: DeleteQueryNode.create(parseTableExpressionOrList(tables), __privateGet(this, _props9).withNode)
    });
  }
  updateTable(table) {
    return new UpdateQueryBuilder({
      queryId: createQueryId(),
      executor: __privateGet(this, _props9).executor,
      queryNode: UpdateQueryNode.create(parseTableExpression(table), __privateGet(this, _props9).withNode)
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
   */
  with(name, expression) {
    const cte = parseCommonTableExpression(name, expression);
    return new _QueryCreator({
      ...__privateGet(this, _props9),
      withNode: __privateGet(this, _props9).withNode ? WithNode.cloneWithExpression(__privateGet(this, _props9).withNode, cte) : WithNode.create(cte)
    });
  }
  /**
   * Creates a recursive `with` query (Common Table Expression).
   *
   * See the {@link with} method for examples and more documentation.
   */
  withRecursive(name, expression) {
    const cte = parseCommonTableExpression(name, expression);
    return new _QueryCreator({
      ...__privateGet(this, _props9),
      withNode: __privateGet(this, _props9).withNode ? WithNode.cloneWithExpression(__privateGet(this, _props9).withNode, cte) : WithNode.create(cte, { recursive: true })
    });
  }
  /**
   * Returns a copy of this query creator instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _QueryCreator({
      ...__privateGet(this, _props9),
      executor: __privateGet(this, _props9).executor.withPlugin(plugin)
    });
  }
  /**
   * Returns a copy of this query creator instance without any plugins.
   */
  withoutPlugins() {
    return new _QueryCreator({
      ...__privateGet(this, _props9),
      executor: __privateGet(this, _props9).executor.withoutPlugins()
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
      ...__privateGet(this, _props9),
      executor: __privateGet(this, _props9).executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
};
let QueryCreator = _QueryCreator;
_props9 = new WeakMap();
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
function createSelectQueryBuilder() {
  return new SelectQueryBuilder({
    queryId: createQueryId(),
    executor: NOOP_QUERY_EXECUTOR,
    queryNode: SelectQueryNode.create(parseTableExpressionOrList([]))
  });
}
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
function parseValueBinaryOperation(leftOperand, operator, rightOperand) {
  if (!isBinaryOperator(operator) && !isOperationNodeSource(operator)) {
    throw new Error(`invalid binary operator ${JSON.stringify(operator)}`);
  }
  if (isIsComparison(operator, rightOperand)) {
    return parseIs(leftOperand, operator, rightOperand);
  }
  return BinaryOperationNode.create(parseReferenceExpression(leftOperand), parseOperator(operator), parseValueExpressionOrList(rightOperand));
}
function parseReferentialBinaryOperation(leftOperand, operator, rightOperand) {
  if (!isBinaryOperator(operator) && !isOperationNodeSource(operator)) {
    throw new Error(`invalid binary operator ${JSON.stringify(operator)}`);
  }
  return BinaryOperationNode.create(parseReferenceExpression(leftOperand), parseOperator(operator), parseReferenceExpression(rightOperand));
}
function parseValueComparison(leftOperand, operator, rightOperand) {
  if (!isComparisonOperator(operator) && !isOperationNodeSource(operator)) {
    throw new Error(`invalid comparison operator ${JSON.stringify(operator)}`);
  }
  return parseValueBinaryOperation(leftOperand, operator, rightOperand);
}
function parseReferentialComparison(leftOperand, operator, rightOperand) {
  if (!isComparisonOperator(operator) && !isOperationNodeSource(operator)) {
    throw new Error(`invalid comparison operator ${JSON.stringify(operator)}`);
  }
  return parseReferentialBinaryOperation(leftOperand, operator, rightOperand);
}
function parseWhere(args) {
  return parseFilter("where", args);
}
function parseHaving(args) {
  return parseFilter("having", args);
}
function parseOn(args) {
  return parseFilter("on", args);
}
function parseWhen(args) {
  return parseFilter("when", args);
}
function parseFilter(type, args) {
  if (args.length === 3) {
    return parseValueComparison(args[0], args[1], args[2]);
  }
  if (args.length === 1) {
    return parseOneArgFilterExpression(type, args[0]);
  }
  throw createFilterExpressionError(type, args);
}
function isIsComparison(operator, rightOperand) {
  return (operator === "is" || operator === "is not") && (isNull(rightOperand) || isBoolean$1(rightOperand));
}
function parseIs(leftOperand, operator, rightOperand) {
  return BinaryOperationNode.create(parseReferenceExpression(leftOperand), parseOperator(operator), ValueNode.createImmediate(rightOperand));
}
function parseOperator(operator) {
  if (isString$1(operator) && OPERATORS.includes(operator)) {
    return OperatorNode.create(operator);
  }
  if (isOperationNodeSource(operator)) {
    return operator.toOperationNode();
  }
  throw new Error(`invalid operator ${JSON.stringify(operator)}`);
}
function parseOneArgFilterExpression(type, arg) {
  if (isFunction(arg)) {
    if (type === "when") {
      throw new Error(`when method doesn't accept a callback as an argument`);
    }
    return CALLBACK_PARSERS[type](arg);
  } else if (isOperationNodeSource(arg)) {
    const node = arg.toOperationNode();
    if (RawNode.is(node) || BinaryOperationNode.is(node) || UnaryOperationNode.is(node) || ParensNode.is(node) || CaseNode.is(node)) {
      return node;
    }
  } else if (type === "when") {
    return ValueNode.create(arg);
  }
  throw createFilterExpressionError(type, arg);
}
function createFilterExpressionError(type, args) {
  return new Error(`invalid arguments passed to a '${type}' method: ${JSON.stringify(args)}`);
}
const CALLBACK_PARSERS = freeze({
  where(callback) {
    const whereBuilder = createSelectQueryBuilder();
    const exprBuilder = expressionBuilder();
    const res = callback(Object.assign(whereBuilder, exprBuilder));
    const node = res.toOperationNode();
    if (SelectQueryNode.is(node)) {
      if (!node.where) {
        throw new Error("no `where` methods called inside a group callback");
      }
      return ParensNode.create(node.where.where);
    } else {
      return node;
    }
  },
  having(callback) {
    const havingBuilder = createSelectQueryBuilder();
    const exprBuilder = expressionBuilder();
    const res = callback(Object.assign(havingBuilder, exprBuilder));
    const node = res.toOperationNode();
    if (SelectQueryNode.is(node)) {
      if (!node.having) {
        throw new Error("no `having` methods called inside a group callback");
      }
      return ParensNode.create(node.having.having);
    } else {
      return node;
    }
  },
  on(callback) {
    const onBuilder = createJoinBuilder("InnerJoin", "table");
    const exprBuilder = expressionBuilder();
    const res = callback(Object.assign(onBuilder, exprBuilder));
    const node = res.toOperationNode();
    if (JoinNode.is(node)) {
      if (!node.on) {
        throw new Error("no `on` methods called inside a group callback");
      }
      return ParensNode.create(node.on.on);
    } else {
      return node;
    }
  }
});
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
  const joinBuilder = callback(createJoinBuilder(joinType, from));
  return joinBuilder.toOperationNode();
}
function parseSingleOnJoin(joinType, from, lhsColumn, rhsColumn) {
  return JoinNode.createWithOn(joinType, parseTableExpression(from), parseReferentialComparison(lhsColumn, "=", rhsColumn));
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
function parseSetOperation(operator, expression, all) {
  return SetOperationNode.create(operator, expression.toOperationNode(), all);
}
const _SelectQueryBuilder = class {
  constructor(props) {
    __privateAdd(this, _props10, void 0);
    __privateSet(this, _props10, freeze(props));
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  where(...args) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props10).queryNode, parseWhere(args))
    });
  }
  whereRef(lhs, op, rhs) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props10).queryNode, parseReferentialComparison(lhs, op, rhs))
    });
  }
  orWhere(...args) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props10).queryNode, parseWhere(args))
    });
  }
  orWhereRef(lhs, op, rhs) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props10).queryNode, parseReferentialComparison(lhs, op, rhs))
    });
  }
  whereExists(arg) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props10).queryNode, parseExists(arg))
    });
  }
  whereNotExists(arg) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props10).queryNode, parseNotExists(arg))
    });
  }
  orWhereExists(arg) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props10).queryNode, parseExists(arg))
    });
  }
  orWhereNotExists(arg) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props10).queryNode, parseNotExists(arg))
    });
  }
  having(...args) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithHaving(__privateGet(this, _props10).queryNode, parseHaving(args))
    });
  }
  havingRef(lhs, op, rhs) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithHaving(__privateGet(this, _props10).queryNode, parseReferentialComparison(lhs, op, rhs))
    });
  }
  orHaving(...args) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithOrHaving(__privateGet(this, _props10).queryNode, parseHaving(args))
    });
  }
  orHavingRef(lhs, op, rhs) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithOrHaving(__privateGet(this, _props10).queryNode, parseReferentialComparison(lhs, op, rhs))
    });
  }
  havingExists(arg) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithHaving(__privateGet(this, _props10).queryNode, parseExists(arg))
    });
  }
  /**
   * @deprecated Use {@link havingNotExists} instead.
   */
  havingNotExist(arg) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithHaving(__privateGet(this, _props10).queryNode, parseNotExists(arg))
    });
  }
  havingNotExists(arg) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithHaving(__privateGet(this, _props10).queryNode, parseNotExists(arg))
    });
  }
  orHavingExists(arg) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithOrHaving(__privateGet(this, _props10).queryNode, parseExists(arg))
    });
  }
  orHavingNotExists(arg) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithOrHaving(__privateGet(this, _props10).queryNode, parseNotExists(arg))
    });
  }
  /**
   * Adds a select statement to the query.
   *
   * When a column (or any expression) is selected, Kysely adds its type to the return
   * type of the query. Kysely is smart enough to parse the selection names and types
   * from aliased columns, subqueries, raw expressions etc.
   *
   * Kysely only allows you to select columns and expressions that exist and would
   * produce valid SQL. However, Kysely is not perfect and there may be cases where
   * the type inference doesn't work and you need to override it. You can always
   * use the {@link Kysely.dynamic | dynamic} module and the {@link sql} tag
   * to override the types.
   *
   * Select calls are additive. Calling `select('id').select('first_name')` is the
   * same as calling `select(['id', 'first_name'])`.
   *
   * To select all columns of the query or specific tables see the
   * {@link selectAll} method.
   *
   * See the {@link $if} method if you are looking for a way to add selections
   * based on a runtime condition.
   *
   * ### Examples
   *
   * Select a single column:
   *
   * ```ts
   * const persons = await db
   *   .selectFrom('person')
   *   .select('id')
   *   .where('first_name', '=', 'Arnold')
   *   .execute()
   *
   * persons[0].id
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "id" from "person" where "first_name" = $1
   * ```
   *
   * Select a single column and specify a table:
   *
   * ```ts
   * const persons = await db
   *   .selectFrom(['person', 'pet'])
   *   .select('person.id')
   *   .execute()
   *
   * persons[0].id
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "person"."id" from "person", "pet"
   * ```
   *
   * Select multiple columns:
   *
   * ```ts
   * const persons = await db
   *   .selectFrom('person')
   *   .select(['person.id', 'first_name'])
   *   .execute()
   *
   * persons[0].id
   * persons[0].first_name
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "person"."id", "first_name" from "person"
   * ```
   *
   * Aliased selections:
   *
   * ```ts
   * const persons = await db
   *   .selectFrom('person')
   *   .select([
   *     'person.first_name as fn',
   *     'person.last_name as ln'
   *   ])
   *   .execute()
   *
   * persons[0].fn
   * persons[0].ln
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select
   *   "person"."first_name" as "fn",
   *   "person"."last_name" as "ln"
   * from "person"
   * ```
   *
   * You can also select arbitrary expression including subqueries and raw sql snippets.
   * When you do that, you need to give a name for the selections using the {@link as} method:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * const persons = await db.selectFrom('person')
   *   .select(({ selectFrom, or, cmpr }) => [
   *     // Select a correlated subquery
   *     selectFrom('pet')
   *       .whereRef('person.id', '=', 'pet.owner_id')
   *       .select('pet.name')
   *       .orderBy('pet.name')
   *       .limit(1)
   *       .as('first_pet_name'),
   *
   *     // Build and select an expression using the expression builder
   *     or([
   *       cmpr('first_name', '=', 'Jennifer'),
   *       cmpr('first_name', '=', 'Arnold')
   *     ]).as('is_jennifer_or_arnold'),
   *
   *     // Select a raw sql expression
   *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name')
   *   ])
   *   .execute()
   *
   * persons[0].first_pet_name
   * persons[0].is_jennifer_or_arnold
   * persons[0].full_name
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select
   *   (
   *     select "pet"."name"
   *     from "pet"
   *     where "person"."id" = "pet"."owner_id"
   *     order by "pet"."name"
   *     limit $1
   *   ) as "pet_name",
   *   ("first_name" = $2 or "first_name" = $3) as "jennifer_or_arnold",
   *   concat(first_name, ' ', last_name) as "full_name"
   * from "person"
   * ```
   *
   * In case you use the {@link sql} tag you need to specify the type of the expression
   * (in this example `string`).
   *
   * All the examples above assume you know the column names at compile time.
   * While it's better to build your code like that (that way you also know
   * the types) sometimes it's not possible or you just prefer to write more
   * dynamic code.
   * <br><br>
   * In this example, we use the `dynamic` module's methods to add selections
   * dynamically:
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
   * const spersons = await db
   *   .selectFrom('person')
   *   .select([
   *     ref<PossibleColumns>(columnFromUserInput)
   *     'id'
   *   ])
   *   .execute()
   *
   * // The resulting type contains all `PossibleColumns` as optional fields
   * // because we cannot know which field was actually selected before
   * // running the code.
   * const lastName: string | undefined = persons[0].last_name
   * const firstName: string | undefined = persons[0].first_name
   * const birthDate: string | undefined = persons[0].birth_date
   *
   * // The result type also contains the compile time selection `id`.
   * persons[0].id
   * ```
   */
  select(selection) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithSelections(__privateGet(this, _props10).queryNode, parseSelectArg(selection))
    });
  }
  distinctOn(selection) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithDistinctOn(__privateGet(this, _props10).queryNode, parseReferenceExpressionOrList(selection))
    });
  }
  /**
   * This can be used to add any additional SQL to the front of the query __after__ the `select` keyword.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person')
   *   .modifyFront(sql`sql_no_cache`)
   *   .select('first_name')
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * select sql_no_cache `first_name`
   * from `person`
   * ```
   */
  modifyFront(modifier) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithFrontModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
    });
  }
  /**
   * This can be used to add any additional SQL to the end of the query.
   *
   * Also see {@link forUpdate}, {@link forShare}, {@link forKeyShare}, {@link forNoKeyUpdate}
   * {@link skipLocked} and  {@link noWait}.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person')
   *   .select('first_name')
   *   .modifyEnd(sql`for update`)
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "first_name"
   * from "person"
   * for update
   * ```
   */
  modifyEnd(modifier) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
    });
  }
  /**
   * Makes the selection distinct.
   *
   * ### Examples
   *
   * ```ts
   * await db.selectFrom('person')
   *   .select('first_name')
   *   .distinct()
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select distinct "first_name" from "person"
   * ```
   */
  distinct() {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithFrontModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.create("Distinct"))
    });
  }
  /**
   * Adds the `for update` modifier to a select query on supported databases.
   */
  forUpdate() {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.create("ForUpdate"))
    });
  }
  /**
   * Adds the `for share` modifier to a select query on supported databases.
   */
  forShare() {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.create("ForShare"))
    });
  }
  /**
   * Adds the `for key share` modifier to a select query on supported databases.
   */
  forKeyShare() {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.create("ForKeyShare"))
    });
  }
  /**
   * Adds the `for no key update` modifier to a select query on supported databases.
   */
  forNoKeyUpdate() {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.create("ForNoKeyUpdate"))
    });
  }
  /**
   * Adds the `skip locked` modifier to a select query on supported databases.
   */
  skipLocked() {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.create("SkipLocked"))
    });
  }
  /**
   * Adds the `nowait` modifier to a select query on supported databases.
   */
  noWait() {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.create("NoWait"))
    });
  }
  selectAll(table) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithSelections(__privateGet(this, _props10).queryNode, parseSelectAll(table))
    });
  }
  innerJoin(...args) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props10).queryNode, parseJoin("InnerJoin", args))
    });
  }
  leftJoin(...args) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props10).queryNode, parseJoin("LeftJoin", args))
    });
  }
  rightJoin(...args) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props10).queryNode, parseJoin("RightJoin", args))
    });
  }
  fullJoin(...args) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props10).queryNode, parseJoin("FullJoin", args))
    });
  }
  innerJoinLateral(...args) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props10).queryNode, parseJoin("LateralInnerJoin", args))
    });
  }
  leftJoinLateral(...args) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props10).queryNode, parseJoin("LateralLeftJoin", args))
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
   * ### Examples
   *
   * ```ts
   * await db
   *   .selectFrom('person')
   *   .select('person.first_name as fn')
   *   .orderBy('id')
   *   .orderBy('fn', 'desc')
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "person"."first_name" as "fn"
   * from "person"
   * order by "id" asc, "fn" desc
   * ```
   *
   * The order by expression can also be a raw sql expression or a subquery
   * in addition to column references:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db
   *   .selectFrom('person')
   *   .selectAll()
   *   .orderBy((eb) => eb.selectFrom('pet')
   *     .select('pet.name')
   *     .whereRef('pet.owner_id', '=', 'person.id')
   *     .limit(1)
   *   )
   *   .orderBy(
   *     sql`concat(first_name, last_name)`
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select *
   * from "person"
   * order by
   *   ( select "pet"."name"
   *     from "pet"
   *     where "pet"."owner_id" = "person"."id"
   *     limit 1
   *   ) asc,
   *   concat(first_name, last_name) asc
   * ```
   *
   * `dynamic.ref` can be used to refer to columns not known at
   * compile time:
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
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "person"."first_name" as "fn"
   * from "person"
   * order by "fn" asc
   * ```
   */
  orderBy(orderBy, direction) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithOrderByItem(__privateGet(this, _props10).queryNode, parseOrderBy(orderBy, direction))
    });
  }
  /**
   * Adds a `group by` clause to the query.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db
   *   .selectFrom('person')
   *   .select([
   *     'first_name',
   *     sql`max(id)`.as('max_id')
   *   ])
   *   .groupBy('first_name')
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "first_name", max(id)
   * from "person"
   * group by "first_name"
   * ```
   *
   * `groupBy` also accepts an array:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db
   *   .selectFrom('person')
   *   .select([
   *     'first_name',
   *     'last_name',
   *     sql`max(id)`.as('max_id')
   *   ])
   *   .groupBy([
   *     'first_name',
   *     'last_name'
   *   ])
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "first_name", "last_name", max(id)
   * from "person"
   * group by "first_name", "last_name"
   * ```
   *
   * The group by expressions can also be subqueries or
   * raw sql expressions:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db
   *   .selectFrom('person')
   *   .select([
   *     'first_name',
   *     'last_name',
   *     sql`max(id)`.as('max_id')
   *   ])
   *   .groupBy([
   *     sql`concat(first_name, last_name)`,
   *     (qb) => qb.selectFrom('pet').select('id').limit(1)
   *   ])
   *   .execute()
   * ```
   *
   * `dynamic.ref` can be used to refer to columns not known at
   * compile time:
   *
   * ```ts
   * async function someQuery(groupBy: string) {
   *   const { ref } = db.dynamic
   *
   *   return await db
   *     .selectFrom('person')
   *     .select('first_name')
   *     .groupBy(ref(groupBy))
   *     .execute()
   * }
   *
   * someQuery('first_name')
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "first_name"
   * from "person"
   * group by "first_name"
   * ```
   */
  groupBy(groupBy) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithGroupByItems(__privateGet(this, _props10).queryNode, parseGroupBy(groupBy))
    });
  }
  /**
   * Adds a limit clause to the query.
   *
   * ### Examples
   *
   * Select the first 10 rows of the result:
   *
   * ```ts
   * return await db
   *   .selectFrom('person')
   *   .select('first_name')
   *   .limit(10)
   * ```
   *
   * Select rows from index 10 to index 19 of the result:
   *
   * ```ts
   * return await db
   *   .selectFrom('person')
   *   .select('first_name')
   *   .offset(10)
   *   .limit(10)
   * ```
   */
  limit(limit) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithLimit(__privateGet(this, _props10).queryNode, LimitNode.create(limit))
    });
  }
  /**
   * Adds an offset clause to the query.
   *
   * ### Examples
   *
   * Select rows from index 10 to index 19 of the result:
   *
   * ```ts
   * return await db
   *   .selectFrom('person')
   *   .select('first_name')
   *   .offset(10)
   *   .limit(10)
   * ```
   */
  offset(offset) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithOffset(__privateGet(this, _props10).queryNode, OffsetNode.create(offset))
    });
  }
  /**
   * Combines another select query or raw expression to this query using `union`.
   *
   * The output row type of the combined query must match `this` query.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person')
   *   .select(['id', 'first_name as name'])
   *   .union(db.selectFrom('pet').select(['id', 'name']))
   *   .orderBy('name')
   * ```
   */
  union(expression) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithSetOperation(__privateGet(this, _props10).queryNode, parseSetOperation("union", expression, false))
    });
  }
  /**
   * Combines another select query or raw expression to this query using `union all`.
   *
   * The output row type of the combined query must match `this` query.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person')
   *   .select(['id', 'first_name as name'])
   *   .unionAll(db.selectFrom('pet').select(['id', 'name']))
   *   .orderBy('name')
   * ```
   */
  unionAll(expression) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithSetOperation(__privateGet(this, _props10).queryNode, parseSetOperation("union", expression, true))
    });
  }
  /**
   * Combines another select query or raw expression to this query using `intersect`.
   *
   * The output row type of the combined query must match `this` query.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person')
   *   .select(['id', 'first_name as name'])
   *   .intersect(db.selectFrom('pet').select(['id', 'name']))
   *   .orderBy('name')
   * ```
   */
  intersect(expression) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithSetOperation(__privateGet(this, _props10).queryNode, parseSetOperation("intersect", expression, false))
    });
  }
  /**
   * Combines another select query or raw expression to this query using `intersect all`.
   *
   * The output row type of the combined query must match `this` query.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person')
   *   .select(['id', 'first_name as name'])
   *   .intersectAll(db.selectFrom('pet').select(['id', 'name']))
   *   .orderBy('name')
   * ```
   */
  intersectAll(expression) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithSetOperation(__privateGet(this, _props10).queryNode, parseSetOperation("intersect", expression, true))
    });
  }
  /**
   * Combines another select query or raw expression to this query using `except`.
   *
   * The output row type of the combined query must match `this` query.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person')
   *   .select(['id', 'first_name as name'])
   *   .except(db.selectFrom('pet').select(['id', 'name']))
   *   .orderBy('name')
   * ```
   */
  except(expression) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithSetOperation(__privateGet(this, _props10).queryNode, parseSetOperation("except", expression, false))
    });
  }
  /**
   * Combines another select query or raw expression to this query using `except all`.
   *
   * The output row type of the combined query must match `this` query.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person')
   *   .select(['id', 'first_name as name'])
   *   .exceptAll(db.selectFrom('pet').select(['id', 'name']))
   *   .orderBy('name')
   * ```
   */
  exceptAll(expression) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithSetOperation(__privateGet(this, _props10).queryNode, parseSetOperation("except", expression, true))
    });
  }
  /**
   * Gives an alias for the query. This method is only useful for sub queries.
   *
   * ### Examples
   *
   * ```ts
   * const pets = await db.selectFrom('pet')
   *   .selectAll('pet')
   *   .select(
   *     (qb) => qb.selectFrom('person')
   *       .select('first_name')
   *       .whereRef('pet.owner_id', '=', 'person.id')
   *       .as('owner_first_name')
   *   )
   *   .execute()
   *
   * pets[0].owner_first_name
   * ```
   */
  as(alias) {
    return new AliasedSelectQueryBuilder(this, alias);
  }
  /**
   * Clears all select clauses from the query.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person')
   *   .select(['id', 'first_name'])
   *   .clearSelect()
   *   .select(['id', 'gender'])
   * ```
   *
   * The generated SQL(PostgreSQL):
   *
   * ```sql
   * select "id", "gender" from "person"
   * ```
   */
  clearSelect() {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithoutSelections(__privateGet(this, _props10).queryNode)
    });
  }
  clearWhere() {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithoutWhere(__privateGet(this, _props10).queryNode)
    });
  }
  /**
   * Clears limit clause from the query.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person')
   *   .selectAll()
   *   .limit(10)
   *   .clearLimit()
   * ```
   *
   * The generated SQL(PostgreSQL):
   *
   * ```sql
   * select * from "person"
   * ```
   */
  clearLimit() {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithoutLimit(__privateGet(this, _props10).queryNode)
    });
  }
  /**
   * Clears offset clause from the query.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person')
   *   .selectAll()
   *   .limit(10)
   *   .offset(20)
   *   .clearOffset()
   * ```
   *
   * The generated SQL(PostgreSQL):
   *
   * ```sql
   * select * from "person" limit 10
   * ```
   */
  clearOffset() {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithoutOffset(__privateGet(this, _props10).queryNode)
    });
  }
  /**
   * Clears all `order by` clauses from the query.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person')
   *   .selectAll()
   *   .orderBy('id')
   *   .clearOrderBy()
   * ```
   *
   * The generated SQL(PostgreSQL):
   *
   * ```sql
   * select * from "person"
   * ```
   */
  clearOrderBy() {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: SelectQueryNode.cloneWithoutOrderBy(__privateGet(this, _props10).queryNode)
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
   * db.selectFrom('person')
   *   .selectAll()
   *   .$call(log)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  /**
   * @deprecated Use `$call` instead
   */
  call(func) {
    return this.$call(func);
  }
  /**
   * Call `func(this)` if `condition` is true.
   *
   * NOTE: This method has an impact on typescript performance and it should only be used
   * when necessary. Remember that you can call most methods like `where` conditionally
   * like this:
   *
   * ```ts
   * let query = db.selectFrom('person').selectAll()
   *
   * if (firstName) {
   *   query = query.where('first_name', '=', firstName)
   * }
   *
   * if (lastName) {
   *   query = query.where('last_name', '=', lastName)
   * }
   *
   * const result = await query.execute()
   * ```
   *
   * This method is mainly useful with optional selects. Any `select` or `selectAll`
   * method called inside the callback add optional fields to the result type. This is
   * because we can't know if those selections were actually made before running the code.
   *
   * Also see [this recipe](https://github.com/koskimas/kysely/tree/master/site/docs/recipes/conditional-selects.md)
   *
   * ### Examples
   *
   * ```ts
   * async function getPerson(id: number, withLastName: boolean) {
   *   return await db
   *     .selectFrom('person')
   *     .select(['id', 'first_name'])
   *     .$if(withLastName, (qb) => qb.select('last_name'))
   *     .where('id', '=', id)
   *     .executeTakeFirstOrThrow()
   * }
   * ```
   *
   * Any selections added inside the `if` callback will be added as optional fields to the
   * output type since we can't know if the selections were actually made before running
   * the code. In the example above the return type of the `getPerson` function is:
   *
   * ```ts
   * {
   *   id: number
   *   first_name: string
   *   last_name?: string
   * }
   * ```
   *
   * You can also call any other methods inside the callback:
   *
   * ```ts
   * const { count } = db.fn
   *
   * db.selectFrom('person')
   *   .select('person.id')
   *   .$if(filterByFirstName, (qb) => qb.where('first_name', '=', firstName))
   *   .$if(filterByPetCount, (qb) => qb
   *     .innerJoin('pet', 'pet.owner_id', 'person.id')
   *     .having(count('pet.id'), '>', petCountLimit)
   *     .groupBy('person.id')
   *   )
   * ```
   */
  $if(condition, func) {
    if (condition) {
      return func(this);
    }
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10)
    });
  }
  /**
   * @deprecated Use `$if` instead
   */
  if(condition, func) {
    return this.$if(condition, func);
  }
  /**
   * Change the output type of the query.
   *
   * You should only use this method as the last resort if the types
   * don't support your use case.
   */
  $castTo() {
    return new _SelectQueryBuilder(__privateGet(this, _props10));
  }
  /**
   * @deprecated Use `$castTo` instead.
   */
  castTo() {
    return this.$castTo();
  }
  /**
   * Narrows (parts of) the output type of the query.
   *
   * Kysely tries to be as type-safe as possible, but in some cases we have to make
   * compromises for better maintainability and compilation performance. At present,
   * Kysely doesn't narrow the output type of the query when using {@link where}, {@link having}
   * or {@link JoinQueryBuilder.on}.
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
   * const person = await db.selectFrom('person')
   *   .where('nullable_column', 'is not', null)
   *   .selectAll()
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
   * const person = await db.selectFrom('person')
   *   .where('nullable_column', 'is not', null)
   *   .selectAll()
   *   .$narrowType<{ nullable_column: string }>()
   *   .executeTakeFirstOrThrow()
   *
   * functionThatExpectsPersonWithNonNullValue(person)
   * ```
   */
  $narrowType() {
    return new _SelectQueryBuilder(__privateGet(this, _props10));
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
   *   .with('first_and_last', (qb) => qb
   *     .selectFrom('person')
   *     .select(['first_name', 'last_name'])
   *     .$assertType<{ first_name: string, last_name: string }>()
   *   )
   *   .with('age', (qb) => qb
   *     .selectFrom('person')
   *     .select('age')
   *     .$assertType<{ age: number }>()
   *   )
   *   .selectFrom(['first_and_last', 'age'])
   *   .selectAll()
   *   .executeTakeFirstOrThrow()
   * ```
   */
  $assertType() {
    return new _SelectQueryBuilder(__privateGet(this, _props10));
  }
  /**
   * @deprecated Use `$assertType` instead.
   */
  assertType() {
    return new _SelectQueryBuilder(__privateGet(this, _props10));
  }
  /**
   * Returns a copy of this SelectQueryBuilder instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      executor: __privateGet(this, _props10).executor.withPlugin(plugin)
    });
  }
  toOperationNode() {
    return __privateGet(this, _props10).executor.transformQuery(__privateGet(this, _props10).queryNode, __privateGet(this, _props10).queryId);
  }
  compile() {
    return __privateGet(this, _props10).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props10).queryId);
  }
  /**
   * Executes the query and returns an array of rows.
   *
   * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
   */
  async execute() {
    const compiledQuery = this.compile();
    const result = await __privateGet(this, _props10).executor.executeQuery(compiledQuery, __privateGet(this, _props10).queryId);
    return result.rows;
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
   * provide a custom error class, or callback to throw a different
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
    const stream = __privateGet(this, _props10).executor.stream(compiledQuery, chunkSize, __privateGet(this, _props10).queryId);
    for await (const item of stream) {
      yield* item.rows;
    }
  }
  async explain(format, options) {
    const builder = new _SelectQueryBuilder({
      ...__privateGet(this, _props10),
      queryNode: QueryNode.cloneWithExplain(__privateGet(this, _props10).queryNode, format, options)
    });
    return await builder.execute();
  }
};
let SelectQueryBuilder = _SelectQueryBuilder;
_props10 = new WeakMap();
preventAwait(SelectQueryBuilder, "don't await SelectQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
class AliasedSelectQueryBuilder {
  constructor(queryBuilder, alias) {
    __privateAdd(this, _queryBuilder, void 0);
    __privateAdd(this, _alias, void 0);
    __privateSet(this, _queryBuilder, queryBuilder);
    __privateSet(this, _alias, alias);
  }
  /** @private */
  get expression() {
    return __privateGet(this, _queryBuilder);
  }
  /** @private */
  get alias() {
    return __privateGet(this, _alias);
  }
  toOperationNode() {
    return AliasNode.create(__privateGet(this, _queryBuilder).toOperationNode(), IdentifierNode.create(__privateGet(this, _alias)));
  }
}
_queryBuilder = new WeakMap();
_alias = new WeakMap();
const _ExpressionWrapper = class {
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
  /**
   * Change the output type of the raw expression.
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
let ExpressionWrapper = _ExpressionWrapper;
_node = new WeakMap();
class AliasedExpressionWrapper {
  constructor(expr, alias) {
    __privateAdd(this, _expr, void 0);
    __privateAdd(this, _alias2, void 0);
    __privateSet(this, _expr, expr);
    __privateSet(this, _alias2, alias);
  }
  /** @private */
  get expression() {
    return __privateGet(this, _expr);
  }
  /** @private */
  get alias() {
    return __privateGet(this, _alias2);
  }
  toOperationNode() {
    return AliasNode.create(__privateGet(this, _expr).toOperationNode(), isOperationNodeSource(__privateGet(this, _alias2)) ? __privateGet(this, _alias2).toOperationNode() : IdentifierNode.create(__privateGet(this, _alias2)));
  }
}
_expr = new WeakMap();
_alias2 = new WeakMap();
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
const _AggregateFunctionBuilder = class {
  constructor(props) {
    __privateAdd(this, _props11, void 0);
    __privateSet(this, _props11, freeze(props));
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
   *     eb => eb.fn.count<number>('id').as('person_count')
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
      ...__privateGet(this, _props11),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithDistinct(__privateGet(this, _props11).aggregateFunctionNode)
    });
  }
  filterWhere(...args) {
    return new _AggregateFunctionBuilder({
      ...__privateGet(this, _props11),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(__privateGet(this, _props11).aggregateFunctionNode, parseWhere(args))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  filterWhereExists(arg) {
    return new _AggregateFunctionBuilder({
      ...__privateGet(this, _props11),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(__privateGet(this, _props11).aggregateFunctionNode, parseExists(arg))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  filterWhereNotExists(arg) {
    return new _AggregateFunctionBuilder({
      ...__privateGet(this, _props11),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(__privateGet(this, _props11).aggregateFunctionNode, parseNotExists(arg))
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
      ...__privateGet(this, _props11),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(__privateGet(this, _props11).aggregateFunctionNode, parseReferentialComparison(lhs, op, rhs))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orFilterWhere(...args) {
    return new _AggregateFunctionBuilder({
      ...__privateGet(this, _props11),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithOrFilter(__privateGet(this, _props11).aggregateFunctionNode, parseWhere(args))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orFilterWhereExists(arg) {
    return new _AggregateFunctionBuilder({
      ...__privateGet(this, _props11),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithOrFilter(__privateGet(this, _props11).aggregateFunctionNode, parseExists(arg))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orFilterWhereNotExists(arg) {
    return new _AggregateFunctionBuilder({
      ...__privateGet(this, _props11),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithOrFilter(__privateGet(this, _props11).aggregateFunctionNode, parseNotExists(arg))
    });
  }
  /**
   * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
   */
  orFilterWhereRef(lhs, op, rhs) {
    return new _AggregateFunctionBuilder({
      ...__privateGet(this, _props11),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithOrFilter(__privateGet(this, _props11).aggregateFunctionNode, parseReferentialComparison(lhs, op, rhs))
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
   *     eb => eb.fn.avg<number>('age').over().as('average_age')
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
   *     eb => eb.fn.avg<number>('age').over(
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
      ...__privateGet(this, _props11),
      aggregateFunctionNode: AggregateFunctionNode.cloneWithOver(__privateGet(this, _props11).aggregateFunctionNode, (over ? over(builder) : builder).toOperationNode())
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
    return __privateGet(this, _props11).aggregateFunctionNode;
  }
};
let AggregateFunctionBuilder = _AggregateFunctionBuilder;
_props11 = new WeakMap();
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
    }
  });
}
class CaseBuilder {
  constructor(props) {
    __privateAdd(this, _props12, void 0);
    __privateSet(this, _props12, freeze(props));
  }
  when(...args) {
    return new CaseThenBuilder({
      ...__privateGet(this, _props12),
      node: CaseNode.cloneWithWhen(__privateGet(this, _props12).node, WhenNode.create(parseWhen(args)))
    });
  }
}
_props12 = new WeakMap();
class CaseThenBuilder {
  constructor(props) {
    __privateAdd(this, _props13, void 0);
    __privateSet(this, _props13, freeze(props));
  }
  then(valueExpression) {
    return new CaseWhenBuilder({
      ...__privateGet(this, _props13),
      node: CaseNode.cloneWithThen(__privateGet(this, _props13).node, parseValueExpression(valueExpression))
    });
  }
}
_props13 = new WeakMap();
class CaseWhenBuilder {
  constructor(props) {
    __privateAdd(this, _props14, void 0);
    __privateSet(this, _props14, freeze(props));
  }
  when(...args) {
    return new CaseThenBuilder({
      ...__privateGet(this, _props14),
      node: CaseNode.cloneWithWhen(__privateGet(this, _props14).node, WhenNode.create(parseWhen(args)))
    });
  }
  else(valueExpression) {
    return new CaseEndBuilder({
      ...__privateGet(this, _props14),
      node: CaseNode.cloneWith(__privateGet(this, _props14).node, {
        else: parseValueExpression(valueExpression)
      })
    });
  }
  end() {
    return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props14).node, { isStatement: false }));
  }
  endCase() {
    return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props14).node, { isStatement: true }));
  }
}
_props14 = new WeakMap();
class CaseEndBuilder {
  constructor(props) {
    __privateAdd(this, _props15, void 0);
    __privateSet(this, _props15, freeze(props));
  }
  end() {
    return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props15).node, { isStatement: false }));
  }
  endCase() {
    return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props15).node, { isStatement: true }));
  }
}
_props15 = new WeakMap();
function createExpressionBuilder(executor = NOOP_QUERY_EXECUTOR) {
  function unary(op, expr) {
    return new ExpressionWrapper(parseUnaryOperation(op, expr));
  }
  return {
    get fn() {
      return createFunctionModule();
    },
    selectFrom(table) {
      return new SelectQueryBuilder({
        queryId: createQueryId(),
        executor,
        queryNode: SelectQueryNode.create(parseTableExpressionOrList(table))
      });
    },
    case(reference) {
      return new CaseBuilder({
        node: CaseNode.create(isUndefined(reference) ? void 0 : parseReferenceExpression(reference))
      });
    },
    ref(reference) {
      return new ExpressionWrapper(parseStringReference(reference));
    },
    val(value) {
      return new ExpressionWrapper(parseValueExpressionOrList(value));
    },
    cmpr(lhs, op, rhs) {
      return new ExpressionWrapper(parseValueBinaryOperation(lhs, op, rhs));
    },
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
    and(exprs) {
      if (exprs.length === 0) {
        return new ExpressionWrapper(ValueNode.createImmediate(true));
      } else if (exprs.length === 1) {
        return new ExpressionWrapper(exprs[0].toOperationNode());
      }
      let node = AndNode.create(exprs[0].toOperationNode(), exprs[1].toOperationNode());
      for (let i = 2; i < exprs.length; ++i) {
        node = AndNode.create(node, exprs[i].toOperationNode());
      }
      return new ExpressionWrapper(ParensNode.create(node));
    },
    or(exprs) {
      if (exprs.length === 0) {
        return new ExpressionWrapper(ValueNode.createImmediate(false));
      } else if (exprs.length === 1) {
        return new ExpressionWrapper(exprs[0].toOperationNode());
      }
      let node = OrNode.create(exprs[0].toOperationNode(), exprs[1].toOperationNode());
      for (let i = 2; i < exprs.length; ++i) {
        node = OrNode.create(node, exprs[i].toOperationNode());
      }
      return new ExpressionWrapper(ParensNode.create(node));
    },
    withSchema(schema) {
      return createExpressionBuilder(executor.withPluginAtFront(new WithSchemaPlugin(schema)));
    }
  };
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
  if (isString$1(table)) {
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
const AlterColumnNode = freeze({
  is(node) {
    return node.kind === "AlterColumnNode";
  },
  create(column) {
    return freeze({
      kind: "AlterColumnNode",
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
const _ColumnDefinitionBuilder = class {
  constructor(node) {
    __privateAdd(this, _node2, void 0);
    __privateSet(this, _node2, node);
  }
  /**
   * Adds `auto_increment` or `autoincrement` to the column definition
   * depending on the dialect.
   *
   * Some dialects like PostgreSQL don't support this. On PostgreSQL
   * you can use the `serial` or `bigserial` data type instead.
   */
  autoIncrement() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), { autoIncrement: true }));
  }
  /**
   * Makes the column the primary key.
   *
   * If you want to specify a composite primary key use the
   * {@link CreateTableBuilder.addPrimaryKeyConstraint} method.
   */
  primaryKey() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), { primaryKey: true }));
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
    if (!ReferenceNode.is(references) || SelectAllNode.is(references.column)) {
      throw new Error(`invalid call references('${ref2}'). The reference must have format table.column or schema.table.column`);
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
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
    if (!__privateGet(this, _node2).references) {
      throw new Error("on delete constraint can only be added for foreign keys");
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
      references: ReferencesNode.cloneWithOnDelete(__privateGet(this, _node2).references, parseOnModifyForeignAction(onDelete))
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
    if (!__privateGet(this, _node2).references) {
      throw new Error("on update constraint can only be added for foreign keys");
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
      references: ReferencesNode.cloneWithOnUpdate(__privateGet(this, _node2).references, parseOnModifyForeignAction(onUpdate))
    }));
  }
  /**
   * Adds a unique constraint for the column.
   */
  unique() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), { unique: true }));
  }
  /**
   * Adds a `not null` constraint for the column.
   */
  notNull() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), { notNull: true }));
  }
  /**
   * Adds a `unsigned` modifier for the column.
   *
   * This only works on some dialects like MySQL.
   */
  unsigned() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), { unsigned: true }));
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
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
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
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
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
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
      generated: GeneratedNode.createWithExpression(expression.toOperationNode())
    }));
  }
  /**
   * Adds the `generated always as identity` specifier on supported dialects.
   */
  generatedAlwaysAsIdentity() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
      generated: GeneratedNode.create({ identity: true, always: true })
    }));
  }
  /**
   * Adds the `generated by default as identity` specifier on supported dialects.
   */
  generatedByDefaultAsIdentity() {
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
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
    if (!__privateGet(this, _node2).generated) {
      throw new Error("stored() can only be called after generatedAlwaysAs");
    }
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
      generated: GeneratedNode.cloneWith(__privateGet(this, _node2).generated, {
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
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithFrontModifier(__privateGet(this, _node2), modifier.toOperationNode()));
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
    return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithEndModifier(__privateGet(this, _node2), modifier.toOperationNode()));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return __privateGet(this, _node2);
  }
};
let ColumnDefinitionBuilder = _ColumnDefinitionBuilder;
_node2 = new WeakMap();
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
const _ForeignKeyConstraintBuilder = class {
  constructor(node) {
    __privateAdd(this, _node3, void 0);
    __privateSet(this, _node3, node);
  }
  onDelete(onDelete) {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(__privateGet(this, _node3), {
      onDelete: parseOnModifyForeignAction(onDelete)
    }));
  }
  onUpdate(onUpdate) {
    return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(__privateGet(this, _node3), {
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
    return __privateGet(this, _node3);
  }
};
let ForeignKeyConstraintBuilder = _ForeignKeyConstraintBuilder;
_node3 = new WeakMap();
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
class AlterColumnBuilder {
  constructor(alterColumnNode) {
    __publicField(this, "alterColumnNode");
    this.alterColumnNode = alterColumnNode;
  }
  setDataType(dataType) {
    return new AlteredColumnBuilder(AlterColumnNode.cloneWith(this.alterColumnNode, {
      dataType: parseDataTypeExpression(dataType)
    }));
  }
  setDefault(value) {
    return new AlteredColumnBuilder(AlterColumnNode.cloneWith(this.alterColumnNode, {
      setDefault: parseDefaultValueExpression(value)
    }));
  }
  dropDefault() {
    return new AlteredColumnBuilder(AlterColumnNode.cloneWith(this.alterColumnNode, {
      dropDefault: true
    }));
  }
  setNotNull() {
    return new AlteredColumnBuilder(AlterColumnNode.cloneWith(this.alterColumnNode, {
      setNotNull: true
    }));
  }
  dropNotNull() {
    return new AlteredColumnBuilder(AlterColumnNode.cloneWith(this.alterColumnNode, {
      dropNotNull: true
    }));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
}
class AlteredColumnBuilder extends AlterColumnBuilder {
  toOperationNode() {
    return this.alterColumnNode;
  }
}
class AlterTableExecutor {
  constructor(props) {
    __privateAdd(this, _props16, void 0);
    __privateSet(this, _props16, freeze(props));
  }
  toOperationNode() {
    return __privateGet(this, _props16).executor.transformQuery(__privateGet(this, _props16).node, __privateGet(this, _props16).queryId);
  }
  compile() {
    return __privateGet(this, _props16).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props16).queryId);
  }
  async execute() {
    await __privateGet(this, _props16).executor.executeQuery(this.compile(), __privateGet(this, _props16).queryId);
  }
}
_props16 = new WeakMap();
preventAwait(AlterTableExecutor, "don't await AlterTableExecutor instances directly. To execute the query you need to call `execute`");
const _AlterTableAddForeignKeyConstraintBuilder = class {
  constructor(props) {
    __privateAdd(this, _props17, void 0);
    __privateSet(this, _props17, freeze(props));
  }
  onDelete(onDelete) {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...__privateGet(this, _props17),
      constraintBuilder: __privateGet(this, _props17).constraintBuilder.onDelete(onDelete)
    });
  }
  onUpdate(onUpdate) {
    return new _AlterTableAddForeignKeyConstraintBuilder({
      ...__privateGet(this, _props17),
      constraintBuilder: __privateGet(this, _props17).constraintBuilder.onUpdate(onUpdate)
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
    return __privateGet(this, _props17).executor.transformQuery(AlterTableNode.cloneWithTableProps(__privateGet(this, _props17).node, {
      addConstraint: AddConstraintNode.create(__privateGet(this, _props17).constraintBuilder.toOperationNode())
    }), __privateGet(this, _props17).queryId);
  }
  compile() {
    return __privateGet(this, _props17).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props17).queryId);
  }
  async execute() {
    await __privateGet(this, _props17).executor.executeQuery(this.compile(), __privateGet(this, _props17).queryId);
  }
};
let AlterTableAddForeignKeyConstraintBuilder = _AlterTableAddForeignKeyConstraintBuilder;
_props17 = new WeakMap();
preventAwait(AlterTableAddForeignKeyConstraintBuilder, "don't await AlterTableAddForeignKeyConstraintBuilder instances directly. To execute the query you need to call `execute`");
const _AlterTableDropConstraintBuilder = class {
  constructor(props) {
    __privateAdd(this, _props18, void 0);
    __privateSet(this, _props18, freeze(props));
  }
  ifExists() {
    return new _AlterTableDropConstraintBuilder({
      ...__privateGet(this, _props18),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props18).node, {
        dropConstraint: DropConstraintNode.cloneWith(__privateGet(this, _props18).node.dropConstraint, {
          ifExists: true
        })
      })
    });
  }
  cascade() {
    return new _AlterTableDropConstraintBuilder({
      ...__privateGet(this, _props18),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props18).node, {
        dropConstraint: DropConstraintNode.cloneWith(__privateGet(this, _props18).node.dropConstraint, {
          modifier: "cascade"
        })
      })
    });
  }
  restrict() {
    return new _AlterTableDropConstraintBuilder({
      ...__privateGet(this, _props18),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props18).node, {
        dropConstraint: DropConstraintNode.cloneWith(__privateGet(this, _props18).node.dropConstraint, {
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
    return __privateGet(this, _props18).executor.transformQuery(__privateGet(this, _props18).node, __privateGet(this, _props18).queryId);
  }
  compile() {
    return __privateGet(this, _props18).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props18).queryId);
  }
  async execute() {
    await __privateGet(this, _props18).executor.executeQuery(this.compile(), __privateGet(this, _props18).queryId);
  }
};
let AlterTableDropConstraintBuilder = _AlterTableDropConstraintBuilder;
_props18 = new WeakMap();
preventAwait(AlterTableDropConstraintBuilder, "don't await AlterTableDropConstraintBuilder instances directly. To execute the query you need to call `execute`");
class AlterTableBuilder {
  constructor(props) {
    __privateAdd(this, _props19, void 0);
    __privateSet(this, _props19, freeze(props));
  }
  renameTo(newTableName) {
    return new AlterTableExecutor({
      ...__privateGet(this, _props19),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props19).node, {
        renameTo: parseTable(newTableName)
      })
    });
  }
  setSchema(newSchema) {
    return new AlterTableExecutor({
      ...__privateGet(this, _props19),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props19).node, {
        setSchema: IdentifierNode.create(newSchema)
      })
    });
  }
  alterColumn(column, alteration) {
    const builder = alteration(new AlterColumnBuilder(AlterColumnNode.create(column)));
    return new AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props19),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props19).node, builder.toOperationNode())
    });
  }
  dropColumn(column) {
    return new AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props19),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props19).node, DropColumnNode.create(column))
    });
  }
  renameColumn(column, newColumn) {
    return new AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props19),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props19).node, RenameColumnNode.create(column, newColumn))
    });
  }
  addColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props19),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props19).node, AddColumnNode.create(builder.toOperationNode()))
    });
  }
  modifyColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props19),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props19).node, ModifyColumnNode.create(builder.toOperationNode()))
    });
  }
  /**
   * See {@link CreateTableBuilder.addUniqueConstraint}
   */
  addUniqueConstraint(constraintName, columns) {
    return new AlterTableExecutor({
      ...__privateGet(this, _props19),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props19).node, {
        addConstraint: AddConstraintNode.create(UniqueConstraintNode.create(columns, constraintName))
      })
    });
  }
  /**
   * See {@link CreateTableBuilder.addCheckConstraint}
   */
  addCheckConstraint(constraintName, checkExpression) {
    return new AlterTableExecutor({
      ...__privateGet(this, _props19),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props19).node, {
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
      ...__privateGet(this, _props19),
      constraintBuilder: new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName))
    });
  }
  dropConstraint(constraintName) {
    return new AlterTableDropConstraintBuilder({
      ...__privateGet(this, _props19),
      node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props19).node, {
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
  /**
   * @deprecated Use `$call` instead
   */
  call(func) {
    return this.$call(func);
  }
}
_props19 = new WeakMap();
const _AlterTableColumnAlteringBuilder = class {
  constructor(props) {
    __privateAdd(this, _props20, void 0);
    __privateSet(this, _props20, freeze(props));
  }
  alterColumn(column, alteration) {
    const builder = alteration(new AlterColumnBuilder(AlterColumnNode.create(column)));
    return new _AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props20).node, builder.toOperationNode())
    });
  }
  dropColumn(column) {
    return new _AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props20).node, DropColumnNode.create(column))
    });
  }
  renameColumn(column, newColumn) {
    return new _AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props20).node, RenameColumnNode.create(column, newColumn))
    });
  }
  addColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new _AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props20).node, AddColumnNode.create(builder.toOperationNode()))
    });
  }
  modifyColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new _AlterTableColumnAlteringBuilder({
      ...__privateGet(this, _props20),
      node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props20).node, ModifyColumnNode.create(builder.toOperationNode()))
    });
  }
  toOperationNode() {
    return __privateGet(this, _props20).executor.transformQuery(__privateGet(this, _props20).node, __privateGet(this, _props20).queryId);
  }
  compile() {
    return __privateGet(this, _props20).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props20).queryId);
  }
  async execute() {
    await __privateGet(this, _props20).executor.executeQuery(this.compile(), __privateGet(this, _props20).queryId);
  }
};
let AlterTableColumnAlteringBuilder = _AlterTableColumnAlteringBuilder;
_props20 = new WeakMap();
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
const _CreateIndexBuilder = class {
  constructor(props) {
    __privateAdd(this, _props21, void 0);
    __privateSet(this, _props21, freeze(props));
  }
  /**
   * Adds the "if not exists" modifier.
   *
   * If the index already exists, no error is thrown if this method has been called.
   */
  ifNotExists() {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props21),
      node: CreateIndexNode.cloneWith(__privateGet(this, _props21).node, {
        ifNotExists: true
      })
    });
  }
  /**
   * Makes the index unique.
   */
  unique() {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props21),
      node: CreateIndexNode.cloneWith(__privateGet(this, _props21).node, {
        unique: true
      })
    });
  }
  /**
   * Specifies the table for the index.
   */
  on(table) {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props21),
      node: CreateIndexNode.cloneWith(__privateGet(this, _props21).node, {
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
      ...__privateGet(this, _props21),
      node: CreateIndexNode.cloneWithColumns(__privateGet(this, _props21).node, [
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
      ...__privateGet(this, _props21),
      node: CreateIndexNode.cloneWithColumns(__privateGet(this, _props21).node, columns.map(parseOrderedColumnName))
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
      ...__privateGet(this, _props21),
      node: CreateIndexNode.cloneWithColumns(__privateGet(this, _props21).node, [
        expression.toOperationNode()
      ])
    });
  }
  using(indexType) {
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props21),
      node: CreateIndexNode.cloneWith(__privateGet(this, _props21).node, {
        using: RawNode.createWithSql(indexType)
      })
    });
  }
  where(...args) {
    const transformer = new ImmediateValueTransformer();
    return new _CreateIndexBuilder({
      ...__privateGet(this, _props21),
      node: QueryNode.cloneWithWhere(__privateGet(this, _props21).node, transformer.transformNode(parseWhere(args)))
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
    return __privateGet(this, _props21).executor.transformQuery(__privateGet(this, _props21).node, __privateGet(this, _props21).queryId);
  }
  compile() {
    return __privateGet(this, _props21).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props21).queryId);
  }
  async execute() {
    await __privateGet(this, _props21).executor.executeQuery(this.compile(), __privateGet(this, _props21).queryId);
  }
};
let CreateIndexBuilder = _CreateIndexBuilder;
_props21 = new WeakMap();
preventAwait(CreateIndexBuilder, "don't await CreateIndexBuilder instances directly. To execute the query you need to call `execute`");
const _CreateSchemaBuilder = class {
  constructor(props) {
    __privateAdd(this, _props22, void 0);
    __privateSet(this, _props22, freeze(props));
  }
  ifNotExists() {
    return new _CreateSchemaBuilder({
      ...__privateGet(this, _props22),
      node: CreateSchemaNode.cloneWith(__privateGet(this, _props22).node, { ifNotExists: true })
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
let CreateSchemaBuilder = _CreateSchemaBuilder;
_props22 = new WeakMap();
preventAwait(CreateSchemaBuilder, "don't await CreateSchemaBuilder instances directly. To execute the query you need to call `execute`");
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
function parseOnCommitAction(action) {
  if (ON_COMMIT_ACTIONS.includes(action)) {
    return action;
  }
  throw new Error(`invalid OnCommitAction ${action}`);
}
const _CreateTableBuilder = class {
  constructor(props) {
    __privateAdd(this, _props23, void 0);
    __privateSet(this, _props23, freeze(props));
  }
  /**
   * Adds the "temporary" modifier.
   *
   * Use this to create a temporary table.
   */
  temporary() {
    return new _CreateTableBuilder({
      ...__privateGet(this, _props23),
      node: CreateTableNode.cloneWith(__privateGet(this, _props23).node, {
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
      ...__privateGet(this, _props23),
      node: CreateTableNode.cloneWith(__privateGet(this, _props23).node, {
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
      ...__privateGet(this, _props23),
      node: CreateTableNode.cloneWith(__privateGet(this, _props23).node, {
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
      ...__privateGet(this, _props23),
      node: CreateTableNode.cloneWithColumn(__privateGet(this, _props23).node, columnBuilder.toOperationNode())
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
      ...__privateGet(this, _props23),
      node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props23).node, PrimaryConstraintNode.create(columns, constraintName))
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
      ...__privateGet(this, _props23),
      node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props23).node, UniqueConstraintNode.create(columns, constraintName))
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
      ...__privateGet(this, _props23),
      node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props23).node, CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName))
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
      ...__privateGet(this, _props23),
      node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props23).node, builder.toOperationNode())
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
      ...__privateGet(this, _props23),
      node: CreateTableNode.cloneWithFrontModifier(__privateGet(this, _props23).node, modifier.toOperationNode())
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
      ...__privateGet(this, _props23),
      node: CreateTableNode.cloneWithEndModifier(__privateGet(this, _props23).node, modifier.toOperationNode())
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
  /**
   * @deprecated Use `$call` instead
   */
  call(func) {
    return this.$call(func);
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
let CreateTableBuilder = _CreateTableBuilder;
_props23 = new WeakMap();
preventAwait(CreateTableBuilder, "don't await CreateTableBuilder instances directly. To execute the query you need to call `execute`");
const _DropIndexBuilder = class {
  constructor(props) {
    __privateAdd(this, _props24, void 0);
    __privateSet(this, _props24, freeze(props));
  }
  /**
   * Specifies the table the index was created for. This is not needed
   * in all dialects.
   */
  on(table) {
    return new _DropIndexBuilder({
      ...__privateGet(this, _props24),
      node: DropIndexNode.cloneWith(__privateGet(this, _props24).node, {
        table: parseTable(table)
      })
    });
  }
  ifExists() {
    return new _DropIndexBuilder({
      ...__privateGet(this, _props24),
      node: DropIndexNode.cloneWith(__privateGet(this, _props24).node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropIndexBuilder({
      ...__privateGet(this, _props24),
      node: DropIndexNode.cloneWith(__privateGet(this, _props24).node, {
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
    return __privateGet(this, _props24).executor.transformQuery(__privateGet(this, _props24).node, __privateGet(this, _props24).queryId);
  }
  compile() {
    return __privateGet(this, _props24).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props24).queryId);
  }
  async execute() {
    await __privateGet(this, _props24).executor.executeQuery(this.compile(), __privateGet(this, _props24).queryId);
  }
};
let DropIndexBuilder = _DropIndexBuilder;
_props24 = new WeakMap();
preventAwait(DropIndexBuilder, "don't await DropIndexBuilder instances directly. To execute the query you need to call `execute`");
const _DropSchemaBuilder = class {
  constructor(props) {
    __privateAdd(this, _props25, void 0);
    __privateSet(this, _props25, freeze(props));
  }
  ifExists() {
    return new _DropSchemaBuilder({
      ...__privateGet(this, _props25),
      node: DropSchemaNode.cloneWith(__privateGet(this, _props25).node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropSchemaBuilder({
      ...__privateGet(this, _props25),
      node: DropSchemaNode.cloneWith(__privateGet(this, _props25).node, {
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
let DropSchemaBuilder = _DropSchemaBuilder;
_props25 = new WeakMap();
preventAwait(DropSchemaBuilder, "don't await DropSchemaBuilder instances directly. To execute the query you need to call `execute`");
const _DropTableBuilder = class {
  constructor(props) {
    __privateAdd(this, _props26, void 0);
    __privateSet(this, _props26, freeze(props));
  }
  ifExists() {
    return new _DropTableBuilder({
      ...__privateGet(this, _props26),
      node: DropTableNode.cloneWith(__privateGet(this, _props26).node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropTableBuilder({
      ...__privateGet(this, _props26),
      node: DropTableNode.cloneWith(__privateGet(this, _props26).node, {
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
let DropTableBuilder = _DropTableBuilder;
_props26 = new WeakMap();
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
const _CreateViewBuilder = class {
  constructor(props) {
    __privateAdd(this, _props27, void 0);
    __privateSet(this, _props27, freeze(props));
  }
  /**
   * Adds the "temporary" modifier.
   *
   * Use this to create a temporary view.
   */
  temporary() {
    return new _CreateViewBuilder({
      ...__privateGet(this, _props27),
      node: CreateViewNode.cloneWith(__privateGet(this, _props27).node, {
        temporary: true
      })
    });
  }
  materialized() {
    return new _CreateViewBuilder({
      ...__privateGet(this, _props27),
      node: CreateViewNode.cloneWith(__privateGet(this, _props27).node, {
        materialized: true
      })
    });
  }
  /**
   * Only implemented on some dialects like SQLite. On most dialects, use {@link orReplace}.
   */
  ifNotExists() {
    return new _CreateViewBuilder({
      ...__privateGet(this, _props27),
      node: CreateViewNode.cloneWith(__privateGet(this, _props27).node, {
        ifNotExists: true
      })
    });
  }
  orReplace() {
    return new _CreateViewBuilder({
      ...__privateGet(this, _props27),
      node: CreateViewNode.cloneWith(__privateGet(this, _props27).node, {
        orReplace: true
      })
    });
  }
  columns(columns) {
    return new _CreateViewBuilder({
      ...__privateGet(this, _props27),
      node: CreateViewNode.cloneWith(__privateGet(this, _props27).node, {
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
      ...__privateGet(this, _props27),
      node: CreateViewNode.cloneWith(__privateGet(this, _props27).node, {
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
    return __privateGet(this, _props27).executor.transformQuery(__privateGet(this, _props27).node, __privateGet(this, _props27).queryId);
  }
  compile() {
    return __privateGet(this, _props27).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props27).queryId);
  }
  async execute() {
    await __privateGet(this, _props27).executor.executeQuery(this.compile(), __privateGet(this, _props27).queryId);
  }
};
let CreateViewBuilder = _CreateViewBuilder;
_props27 = new WeakMap();
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
const _DropViewBuilder = class {
  constructor(props) {
    __privateAdd(this, _props28, void 0);
    __privateSet(this, _props28, freeze(props));
  }
  materialized() {
    return new _DropViewBuilder({
      ...__privateGet(this, _props28),
      node: DropViewNode.cloneWith(__privateGet(this, _props28).node, {
        materialized: true
      })
    });
  }
  ifExists() {
    return new _DropViewBuilder({
      ...__privateGet(this, _props28),
      node: DropViewNode.cloneWith(__privateGet(this, _props28).node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new _DropViewBuilder({
      ...__privateGet(this, _props28),
      node: DropViewNode.cloneWith(__privateGet(this, _props28).node, {
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
    return __privateGet(this, _props28).executor.transformQuery(__privateGet(this, _props28).node, __privateGet(this, _props28).queryId);
  }
  compile() {
    return __privateGet(this, _props28).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props28).queryId);
  }
  async execute() {
    await __privateGet(this, _props28).executor.executeQuery(this.compile(), __privateGet(this, _props28).queryId);
  }
};
let DropViewBuilder = _DropViewBuilder;
_props28 = new WeakMap();
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
const _CreateTypeBuilder = class {
  constructor(props) {
    __privateAdd(this, _props29, void 0);
    __privateSet(this, _props29, freeze(props));
  }
  toOperationNode() {
    return __privateGet(this, _props29).executor.transformQuery(__privateGet(this, _props29).node, __privateGet(this, _props29).queryId);
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
      ...__privateGet(this, _props29),
      node: CreateTypeNode.cloneWithEnum(__privateGet(this, _props29).node, values)
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
    return __privateGet(this, _props29).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props29).queryId);
  }
  async execute() {
    await __privateGet(this, _props29).executor.executeQuery(this.compile(), __privateGet(this, _props29).queryId);
  }
};
let CreateTypeBuilder = _CreateTypeBuilder;
_props29 = new WeakMap();
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
const _DropTypeBuilder = class {
  constructor(props) {
    __privateAdd(this, _props30, void 0);
    __privateSet(this, _props30, freeze(props));
  }
  ifExists() {
    return new _DropTypeBuilder({
      ...__privateGet(this, _props30),
      node: DropTypeNode.cloneWith(__privateGet(this, _props30).node, {
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
    return __privateGet(this, _props30).executor.transformQuery(__privateGet(this, _props30).node, __privateGet(this, _props30).queryId);
  }
  compile() {
    return __privateGet(this, _props30).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props30).queryId);
  }
  async execute() {
    await __privateGet(this, _props30).executor.executeQuery(this.compile(), __privateGet(this, _props30).queryId);
  }
};
let DropTypeBuilder = _DropTypeBuilder;
_props30 = new WeakMap();
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
const _SchemaModule = class {
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
   *   .alterColumn('first_name')
   *   .setDataType('text')
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
let SchemaModule = _SchemaModule;
_executor = new WeakMap();
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
const _DefaultQueryExecutor = class extends QueryExecutorBase {
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
let DefaultQueryExecutor = _DefaultQueryExecutor;
_compiler = new WeakMap();
_adapter = new WeakMap();
_connectionProvider = new WeakMap();
function performanceNow() {
  if (typeof performance !== "undefined" && isFunction(performance.now)) {
    return performance.now();
  } else {
    return Date.now();
  }
}
class RuntimeDriver {
  constructor(driver, log2) {
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
    __privateAdd(this, _destroyPromise, void 0);
    __privateAdd(this, _connections, /* @__PURE__ */ new WeakSet());
    __privateSet(this, _driver2, driver);
    __privateSet(this, _log, log2);
  }
  async init() {
    if (!__privateGet(this, _initPromise)) {
      __privateSet(this, _initPromise, __privateGet(this, _driver2).init().catch((err) => {
        __privateSet(this, _initPromise, void 0);
        return Promise.reject(err);
      }));
    }
    await __privateGet(this, _initPromise);
  }
  async acquireConnection() {
    await this.init();
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
      console.error(`kysely:error: ${event}`);
    }
  }
}
function isCompilable(value) {
  return isObject(value) && isFunction(value.compile);
}
const _Kysely = class extends QueryCreator {
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
      const log2 = new Log(args.log ?? []);
      const runtimeDriver = new RuntimeDriver(driver, log2);
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
    __privateAdd(this, _props31, void 0);
    __privateSet(this, _props31, freeze(props));
  }
  /**
   * Returns the {@link SchemaModule} module for building database schema.
   */
  get schema() {
    return new SchemaModule(__privateGet(this, _props31).executor);
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
    return __privateGet(this, _props31).dialect.createIntrospector(this.withoutPlugins());
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
   * const { count } = db.fn
   *
   * await db.selectFrom('person')
   *   .innerJoin('pet', 'pet.owner_id', 'person.id')
   *   .select([
   *     'person.id',
   *     count('pet.id').as('pet_count')
   *   ])
   *   .groupBy('person.id')
   *   .having(count('pet.id'), '>', 10)
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
   * ```ts
   * const catto = await db.transaction().execute(async (trx) => {
   *   const jennifer = await trx.insertInto('person')
   *     .values({
   *       first_name: 'Jennifer',
   *       last_name: 'Aniston',
   *     })
   *     .returning('id')
   *     .executeTakeFirstOrThrow()
   *
   *   await someFunction(trx, jennifer)
   *
   *   return await trx.insertInto('pet')
   *     .values({
   *       user_id: jennifer.id,
   *       name: 'Catto',
   *       species: 'cat'
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
    return new TransactionBuilder({ ...__privateGet(this, _props31) });
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
    return new ConnectionBuilder({ ...__privateGet(this, _props31) });
  }
  /**
   * Returns a copy of this Kysely instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new _Kysely({
      ...__privateGet(this, _props31),
      executor: __privateGet(this, _props31).executor.withPlugin(plugin)
    });
  }
  /**
   * Returns a copy of this Kysely instance without any plugins.
   */
  withoutPlugins() {
    return new _Kysely({
      ...__privateGet(this, _props31),
      executor: __privateGet(this, _props31).executor.withoutPlugins()
    });
  }
  /**
   * @override
   */
  withSchema(schema) {
    return new _Kysely({
      ...__privateGet(this, _props31),
      executor: __privateGet(this, _props31).executor.withPluginAtFront(new WithSchemaPlugin(schema))
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
    return new _Kysely({ ...__privateGet(this, _props31) });
  }
  /**
   * Releases all resources and disconnects from the database.
   *
   * You need to call this when you are done using the `Kysely` instance.
   */
  async destroy() {
    await __privateGet(this, _props31).driver.destroy();
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
    return __privateGet(this, _props31).executor;
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
let Kysely = _Kysely;
_props31 = new WeakMap();
const _Transaction = class extends Kysely {
  constructor(props) {
    super(props);
    __privateAdd(this, _props32, void 0);
    __privateSet(this, _props32, props);
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
      ...__privateGet(this, _props32),
      executor: __privateGet(this, _props32).executor.withPlugin(plugin)
    });
  }
  withoutPlugins() {
    return new _Transaction({
      ...__privateGet(this, _props32),
      executor: __privateGet(this, _props32).executor.withoutPlugins()
    });
  }
  /**
   * @override
   */
  withSchema(schema) {
    return new _Transaction({
      ...__privateGet(this, _props32),
      executor: __privateGet(this, _props32).executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
  withTables() {
    return new _Transaction({ ...__privateGet(this, _props32) });
  }
};
let Transaction = _Transaction;
_props32 = new WeakMap();
function isKyselyProps(obj) {
  return isObject(obj) && isObject(obj.config) && isObject(obj.driver) && isObject(obj.executor) && isObject(obj.dialect);
}
class ConnectionBuilder {
  constructor(props) {
    __privateAdd(this, _props33, void 0);
    __privateSet(this, _props33, freeze(props));
  }
  async execute(callback) {
    return __privateGet(this, _props33).executor.provideConnection(async (connection) => {
      const executor = __privateGet(this, _props33).executor.withConnectionProvider(new SingleConnectionProvider(connection));
      const db = new Kysely({
        ...__privateGet(this, _props33),
        executor
      });
      return await callback(db);
    });
  }
}
_props33 = new WeakMap();
preventAwait(ConnectionBuilder, "don't await ConnectionBuilder instances directly. To execute the query you need to call the `execute` method");
const _TransactionBuilder = class {
  constructor(props) {
    __privateAdd(this, _props34, void 0);
    __privateSet(this, _props34, freeze(props));
  }
  setIsolationLevel(isolationLevel) {
    return new _TransactionBuilder({
      ...__privateGet(this, _props34),
      isolationLevel
    });
  }
  async execute(callback) {
    const { isolationLevel, ...kyselyProps } = __privateGet(this, _props34);
    const settings = { isolationLevel };
    validateTransactionSettings(settings);
    return __privateGet(this, _props34).executor.provideConnection(async (connection) => {
      const executor = __privateGet(this, _props34).executor.withConnectionProvider(new SingleConnectionProvider(connection));
      const transaction = new Transaction({
        ...kyselyProps,
        executor
      });
      try {
        await __privateGet(this, _props34).driver.beginTransaction(connection, settings);
        const result = await callback(transaction);
        await __privateGet(this, _props34).driver.commitTransaction(connection);
        return result;
      } catch (error) {
        await __privateGet(this, _props34).driver.rollbackTransaction(connection);
        throw error;
      }
    });
  }
};
let TransactionBuilder = _TransactionBuilder;
_props34 = new WeakMap();
preventAwait(TransactionBuilder, "don't await TransactionBuilder instances directly. To execute the transaction you need to call the `execute` method");
function validateTransactionSettings(settings) {
  if (settings.isolationLevel && !TRANSACTION_ISOLATION_LEVELS.includes(settings.isolationLevel)) {
    throw new Error(`invalid transaction isolation level ${settings.isolationLevel}`);
  }
}
const _RawBuilder = class {
  constructor(props) {
    __privateAdd(this, _getExecutor);
    __privateAdd(this, _toOperationNode);
    __privateAdd(this, _compile);
    __privateAdd(this, _props35, void 0);
    __privateSet(this, _props35, freeze(props));
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  as(alias) {
    return new AliasedRawBuilder(this, alias);
  }
  /**
   * Change the output type of the raw expression.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `RawBuilder` with a new output type.
   */
  $castTo() {
    return new _RawBuilder({ ...__privateGet(this, _props35) });
  }
  /**
   * @deprecated Use `$castTo` instead.
   */
  castTo() {
    return this.$castTo();
  }
  /**
   * Adds a plugin for this SQL snippet.
   */
  withPlugin(plugin) {
    return new _RawBuilder({
      ...__privateGet(this, _props35),
      plugins: __privateGet(this, _props35).plugins !== void 0 ? freeze([...__privateGet(this, _props35).plugins, plugin]) : freeze([plugin])
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
    return executor.executeQuery(__privateMethod(this, _compile, compile_fn).call(this, executor), __privateGet(this, _props35).queryId);
  }
};
let RawBuilder = _RawBuilder;
_props35 = new WeakMap();
_getExecutor = new WeakSet();
getExecutor_fn = function(executorProvider) {
  const executor = executorProvider !== void 0 ? executorProvider.getExecutor() : NOOP_QUERY_EXECUTOR;
  return __privateGet(this, _props35).plugins !== void 0 ? executor.withPlugins(__privateGet(this, _props35).plugins) : executor;
};
_toOperationNode = new WeakSet();
toOperationNode_fn = function(executor) {
  return executor.transformQuery(__privateGet(this, _props35).rawNode, __privateGet(this, _props35).queryId);
};
_compile = new WeakSet();
compile_fn = function(executor) {
  return executor.compileQuery(__privateMethod(this, _toOperationNode, toOperationNode_fn).call(this, executor), __privateGet(this, _props35).queryId);
};
preventAwait(RawBuilder, "don't await RawBuilder instances directly. To execute the query you need to call `execute`");
class AliasedRawBuilder {
  constructor(rawBuilder, alias) {
    __privateAdd(this, _rawBuilder, void 0);
    __privateAdd(this, _alias4, void 0);
    __privateSet(this, _rawBuilder, rawBuilder);
    __privateSet(this, _alias4, alias);
  }
  /** @private */
  get expression() {
    return __privateGet(this, _rawBuilder);
  }
  /** @private */
  get alias() {
    return __privateGet(this, _alias4);
  }
  toOperationNode() {
    return AliasNode.create(__privateGet(this, _rawBuilder).toOperationNode(), isOperationNodeSource(__privateGet(this, _alias4)) ? __privateGet(this, _alias4).toOperationNode() : IdentifierNode.create(__privateGet(this, _alias4)));
  }
}
_rawBuilder = new WeakMap();
_alias4 = new WeakMap();
const sql = Object.assign((sqlFragments, ...parameters) => {
  return new RawBuilder({
    queryId: createQueryId(),
    rawNode: RawNode.create(sqlFragments, (parameters == null ? void 0 : parameters.map(parseValueExpression)) ?? [])
  });
}, {
  ref(columnReference) {
    return new RawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithChild(parseStringReference(columnReference))
    });
  },
  val(value) {
    return new RawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithChild(parseValueExpression(value))
    });
  },
  value(value) {
    return this.val(value);
  },
  table(tableReference) {
    return new RawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithChild(parseTable(tableReference))
    });
  },
  id(...ids) {
    const fragments = new Array(ids.length + 1).fill(".");
    fragments[0] = "";
    fragments[fragments.length - 1] = "";
    return new RawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.create(fragments, ids.map(IdentifierNode.create))
    });
  },
  lit(value) {
    return new RawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.createWithChild(ValueNode.createImmediate(value))
    });
  },
  literal(value) {
    return this.lit(value);
  },
  raw(sql2) {
    return new RawBuilder({
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
    return new RawBuilder({
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
      WhenNode: this.visitWhen.bind(this)
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
    const wrapInParens = this.parentNode !== void 0 && !InsertQueryNode.is(this.parentNode) && !CreateViewNode.is(this.parentNode) && !SetOperationNode.is(this.parentNode);
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
    this.append("select ");
    if (node.distinctOn) {
      this.compileDistinctOn(node.distinctOn);
      this.append(" ");
    }
    if (node.frontModifiers && node.frontModifiers.length > 0) {
      this.compileList(node.frontModifiers, " ");
      this.append(" ");
    }
    if (node.selections) {
      this.compileList(node.selections);
      this.append(" ");
    }
    this.visitNode(node.from);
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
    if (node.endModifiers && node.endModifiers.length > 0) {
      this.append(" ");
      this.compileList(node.endModifiers, " ");
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
    this.visitNode(node.table);
    this.append(".");
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
    if (!isString$1(node.name)) {
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
    if (isString$1(value)) {
      this.append(`'${value}'`);
    } else if (isNumber(value) || isBoolean$1(value)) {
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
const JOIN_TYPE_SQL = freeze({
  InnerJoin: "inner join",
  LeftJoin: "left join",
  RightJoin: "right join",
  FullJoin: "full join",
  LateralInnerJoin: "inner join lateral",
  LateralLeftJoin: "left join lateral"
});
const CompiledQuery = freeze({
  raw(sql2) {
    return freeze({
      sql: sql2,
      query: RawNode.createWithSql(sql2),
      parameters: freeze([])
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
    let query = __privateGet(this, _db).selectFrom("sqlite_schema").where("type", "in", ["table", "view"]).where("name", "not like", "sqlite_%").select("name").orderBy("name").$castTo();
    if (!options.withInternalKyselyTables) {
      query = query.where("name", "!=", DEFAULT_MIGRATION_TABLE).where("name", "!=", DEFAULT_MIGRATION_LOCK_TABLE);
    }
    const tables = await query.execute();
    return Promise.all(tables.map(({ name }) => __privateMethod(this, _getTableMetadata, getTableMetadata_fn).call(this, name)));
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
  var _a2, _b2, _c2, _d2, _e2, _f2;
  const db = __privateGet(this, _db);
  const tableDefinition = await db.selectFrom("sqlite_master").where("name", "=", table).select(["sql", "type"]).$castTo().executeTakeFirstOrThrow();
  const autoIncrementCol = (_f2 = (_e2 = (_d2 = (_c2 = (_b2 = (_a2 = tableDefinition.sql) == null ? void 0 : _a2.split(/[\(\),]/)) == null ? void 0 : _b2.find((it) => it.toLowerCase().includes("autoincrement"))) == null ? void 0 : _c2.trimStart()) == null ? void 0 : _d2.split(/\s+/)) == null ? void 0 : _e2[0]) == null ? void 0 : _f2.replace(/["`]/g, "");
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
  async acquireMigrationLock() {
  }
  async releaseMigrationLock() {
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
    __privateAdd(this, _connectionMutex, new ConnectionMutex());
    __publicField(this, "connection");
    __privateAdd(this, _db2, void 0);
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
  async destroy() {
    var _a2;
    (_a2 = __privateGet(this, _db2)) == null ? void 0 : _a2.close();
  }
}, _connectionMutex = new WeakMap(), _db2 = new WeakMap(), _a);
var ConnectionMutex = (_b = class {
  constructor() {
    __privateAdd(this, _promise2, void 0);
    __privateAdd(this, _resolve2, void 0);
  }
  async lock() {
    while (__privateGet(this, _promise2)) {
      await __privateGet(this, _promise2);
    }
    __privateSet(this, _promise2, new Promise((resolve) => {
      __privateSet(this, _resolve2, resolve);
    }));
  }
  unlock() {
    const resolve = __privateGet(this, _resolve2);
    __privateSet(this, _promise2, void 0);
    __privateSet(this, _resolve2, void 0);
    resolve == null ? void 0 : resolve();
  }
}, _promise2 = new WeakMap(), _resolve2 = new WeakMap(), _b);
var BaseSqliteConnection = class {
  streamQuery() {
    throw new Error("Sqlite driver doesn't support streaming");
  }
  async executeQuery(compiledQuery) {
    const { parameters, sql: sql2, query } = compiledQuery;
    return Promise.resolve(
      query.kind === "SelectQueryNode" || query.kind === "RawNode" ? {
        rows: await this.query(sql2, parameters)
      } : {
        rows: [],
        ...await this.exec(sql2, parameters)
      }
    );
  }
};
var CrSqliteDriver = (_c = class extends BaseDriver {
  constructor(config) {
    super();
    __privateAdd(this, _config, void 0);
    __privateAdd(this, _db3, void 0);
    __privateSet(this, _config, config);
  }
  async init() {
    __privateSet(this, _db3, typeof __privateGet(this, _config).database === "function" ? await __privateGet(this, _config).database() : __privateGet(this, _config).database);
    this.connection = new CrSqliteConnection(__privateGet(this, _db3));
    if (__privateGet(this, _config).onCreateConnection) {
      await __privateGet(this, _config).onCreateConnection(this.connection);
    }
  }
}, _config = new WeakMap(), _db3 = new WeakMap(), _c);
var CrSqliteConnection = (_d = class extends BaseSqliteConnection {
  constructor(db) {
    super();
    __privateAdd(this, _db4, void 0);
    __privateAdd(this, _lastId, 0n);
    __privateSet(this, _db4, db);
    __privateGet(this, _db4).onUpdate((_, __, ___, id) => __privateSet(this, _lastId, id));
  }
  async query(sql2, param) {
    return __privateGet(this, _db4).execO(sql2, param);
  }
  async exec(sql2, param) {
    await __privateGet(this, _db4).exec(sql2, param);
    return {
      numAffectedRows: BigInt(__privateGet(this, _db4).api.changes(__privateGet(this, _db4).db)),
      insertId: __privateGet(this, _lastId)
    };
  }
}, _db4 = new WeakMap(), _lastId = new WeakMap(), _d);
var CrSqliteDialect = (_e = class extends BaseDialect {
  /**
   * dialect for {@link https://vlcn.io/js/wasm vlcn.io wasm},
   * a {@link https://github.com/vlcn-io/wa-sqlite/tree/master/demo wa-sqlite} wrapper using indexeddb as backend
   * @deprecated please use {@link WaSqliteDialect} for better performance
   */
  constructor(config) {
    super();
    __privateAdd(this, _config2, void 0);
    __privateSet(this, _config2, config);
  }
  createDriver() {
    return new CrSqliteDriver(__privateGet(this, _config2));
  }
}, _config2 = new WeakMap(), _e);
function throttle({ func, delay, maxCalls }) {
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
var SqlJsDriver = (_f = class extends BaseDriver {
  constructor(config) {
    super();
    __privateAdd(this, _config3, void 0);
    __privateAdd(this, _db5, void 0);
    __privateSet(this, _config3, config);
  }
  async init() {
    var _a2, _b2, _c2, _d2;
    __privateSet(this, _db5, typeof __privateGet(this, _config3).database === "function" ? await __privateGet(this, _config3).database() : __privateGet(this, _config3).database);
    if (!__privateGet(this, _db5)) {
      throw new Error("no database");
    }
    this.connection = new SqlJsConnection(
      __privateGet(this, _db5),
      (_a2 = __privateGet(this, _config3).onWrite) == null ? void 0 : _a2.func,
      (_b2 = __privateGet(this, _config3).onWrite) == null ? void 0 : _b2.isThrottle,
      (_c2 = __privateGet(this, _config3).onWrite) == null ? void 0 : _c2.maxCalls,
      (_d2 = __privateGet(this, _config3).onWrite) == null ? void 0 : _d2.delay
    );
    if (__privateGet(this, _config3).onCreateConnection) {
      await __privateGet(this, _config3).onCreateConnection(this.connection);
    }
  }
  async beginTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("begin"));
    this.connection && this.connection.transactionNum++;
  }
  async commitTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("commit"));
    this.connection && this.connection.transactionNum--;
  }
  async rollbackTransaction(connection) {
    await connection.executeQuery(CompiledQuery.raw("rollback"));
    this.connection && this.connection.transactionNum--;
  }
}, _config3 = new WeakMap(), _db5 = new WeakMap(), _f);
var SqlJsConnection = (_g = class extends BaseSqliteConnection {
  constructor(db, func, isThrottle = false, maxCalls = 1e3, delay = 2e3) {
    super();
    __privateAdd(this, _db6, void 0);
    __privateAdd(this, _onWrite, void 0);
    __publicField(this, "transactionNum", 0);
    __privateSet(this, _db6, db);
    __privateSet(this, _onWrite, func ? isThrottle ? throttle({ func, maxCalls, delay }) : func : void 0);
  }
  query(sql2, parameters) {
    const stmt = __privateGet(this, _db6).prepare(sql2);
    stmt.bind(parameters);
    const rows = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();
    return rows;
  }
  exec(sql2, param) {
    __privateGet(this, _db6).run(sql2, param);
    const insertId = BigInt(this.query("SELECT last_insert_rowid() as id")[0].id);
    const numAffectedRows = BigInt(__privateGet(this, _db6).getRowsModified());
    this.transactionNum === 0 && __privateGet(this, _onWrite) && __privateGet(this, _onWrite).call(this, __privateGet(this, _db6).export());
    return {
      numAffectedRows,
      insertId
    };
  }
}, _db6 = new WeakMap(), _onWrite = new WeakMap(), _g);
var SqlJsDialect = (_h = class extends BaseDialect {
  /**
   * currently no support for bigint
   */
  constructor(config) {
    super();
    __privateAdd(this, _config4, void 0);
    __privateSet(this, _config4, config);
  }
  createDriver() {
    return new SqlJsDriver(__privateGet(this, _config4));
  }
}, _config4 = new WeakMap(), _h);
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
        var args = [null];
        args.push.apply(args, arguments);
        var Ctor = Function.bind.apply(f, args);
        return new Ctor();
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
const indexedDB$1 = self.indexedDB || window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
const database = new Promise((resolve, reject) => {
  const request = indexedDB$1.open(DB_NAME, 1);
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
var defaultSerializer = (parameter) => {
  if (parameter === void 0 || parameter === null || typeof parameter === "bigint" || typeof parameter === "number" || typeof parameter === "object" && "buffer" in parameter) {
    return parameter;
  } else if (typeof parameter === "boolean") {
    return `${parameter}`;
  } else if (parameter instanceof Date) {
    return parameter.toISOString();
  } else {
    return JSON.stringify(parameter);
  }
};
var defaultDeserializer = (parameter) => {
  if (parameter === void 0 || parameter === null || typeof parameter === "bigint" || typeof parameter === "number" || typeof parameter === "object" && "buffer" in parameter) {
    return parameter;
  }
  if (typeof parameter === "string") {
    const dateRegex = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/;
    if (/^(true|false)$/.test(parameter)) {
      return parameter === "true";
    } else if (dateRegex.test(parameter)) {
      return new Date(parameter);
    } else {
      try {
        return JSON.parse(parameter, (_k2, v) => typeof v === "string" && dateRegex.exec(v) ? new Date(v) : v);
      } catch (e) {
      }
    }
  }
  return parameter;
};
var SerializeParametersTransformer = (_i = class extends OperationNodeTransformer {
  constructor(serializer) {
    super();
    __privateAdd(this, _serializer, void 0);
    __privateSet(this, _serializer, serializer || defaultSerializer);
  }
  transformPrimitiveValueList(node) {
    return {
      ...node,
      values: node.values.map(__privateGet(this, _serializer))
    };
  }
  // https://www.npmjs.com/package/zodsql
  transformColumnUpdate(node) {
    const { value: valueNode } = node;
    if (valueNode.kind !== "ValueNode") {
      return super.transformColumnUpdate(node);
    }
    const { value, ...item } = valueNode;
    const serializedValue = __privateGet(this, _serializer).call(this, value);
    if (value === serializedValue) {
      return super.transformColumnUpdate(node);
    }
    return super.transformColumnUpdate({
      ...node,
      value: { ...item, value: serializedValue }
    });
  }
  transformValue(node) {
    return {
      ...node,
      value: __privateGet(this, _serializer).call(this, node.value)
    };
  }
}, _serializer = new WeakMap(), _i);
var SqliteSerializePlugin = (_j = class {
  /**
   * reference from https://github.com/koskimas/kysely/pull/138
   *
   * see {@link SqliteSerializePluginOptions plugin option}
   *
   * The following example will return an error when using sqlite dialects, unless using this plugin:
   *
   * ```ts
   * interface Person {
   *   firstName: string
   *   lastName: string
   *   tags: string[]
   * }
   *
   * interface Database {
   *   person: Person
   * }
   *
   * const db = new Kysely<Database>({
   *   dialect: new SqliteDialect({
   *     database: new Database(":memory:"),
   *   }),
   *   plugins: [
   *     new SqliteSerializePlugin(),
   *   ],
   * })
   *
   * await db.insertInto('person')
   *   .values([{
   *     firstName: 'Jennifer',
   *     lastName: 'Aniston',
   *     tags: ['celebrity', 'actress'],
   *   }])
   *   .execute()
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
   *     new SqliteSerializePlugin({
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
  constructor(opt = {}) {
    __privateAdd(this, _serializeParametersTransformer, void 0);
    __privateAdd(this, _deserializer, void 0);
    __privateAdd(this, _data, void 0);
    __privateSet(this, _serializeParametersTransformer, new SerializeParametersTransformer(
      opt.serializer
    ));
    __privateSet(this, _deserializer, opt.deserializer || defaultDeserializer);
    __privateSet(this, _data, /* @__PURE__ */ new WeakMap());
  }
  transformQuery(args) {
    const { node, queryId } = args;
    if (node.kind === "SelectQueryNode") {
      __privateGet(this, _data).set(queryId, node.kind);
    }
    return __privateGet(this, _serializeParametersTransformer).transformNode(args.node);
  }
  async parseResult(rows) {
    return await Promise.all(rows.map(async (row) => {
      const deserializedRow = { ...row };
      for (const key in deserializedRow) {
        deserializedRow[key] = await __privateGet(this, _deserializer).call(this, deserializedRow[key]);
      }
      return deserializedRow;
    }));
  }
  async transformResult(args) {
    const { result, queryId } = args;
    const { rows } = result;
    const ctx = __privateGet(this, _data).get(queryId);
    if (rows && ctx === "SelectQueryNode") {
      return {
        ...args.result,
        rows: await this.parseResult(rows)
      };
    }
    return args.result;
  }
}, _serializeParametersTransformer = new WeakMap(), _deserializer = new WeakMap(), _data = new WeakMap(), _j);
function isString(value) {
  return typeof value === "string";
}
function isBoolean(value) {
  return typeof value === "boolean";
}
async function createTimeTrigger(kysely, table, event, column, key = "rowid") {
  await sql`
      create trigger if not exists ${sql.raw(table)}_${sql.raw(column)}
      after ${sql.raw(event)}
      on ${sql.table(table)}
      begin
        update ${sql.table(table)}
        set ${sql.ref(column)} = datetime('now','localtime')
        where ${sql.ref(key)} = NEW.${sql.ref(key)};
      end
      `.execute(kysely).catch((err) => {
    console.error(err);
    return void 0;
  });
}
function parseTableMap(tables) {
  const map = /* @__PURE__ */ new Map();
  for (const tableName in tables) {
    if (!Object.prototype.hasOwnProperty.call(tables, tableName)) {
      continue;
    }
    const table = tables[tableName];
    map.set(tableName, table);
  }
  return map;
}
async function runCreateTable(kysely, tableMap, dropTableBeforeInit = false) {
  for (const [tableName, table] of tableMap) {
    const { columns: columnList, property: tableProperty } = table;
    if (dropTableBeforeInit) {
      await kysely.schema.dropTable(tableName).ifExists().execute().catch();
    }
    let tableSql = kysely.schema.createTable(tableName);
    let _triggerKey = "rowid";
    let _haveAutoKey = false;
    let _insertColumnName = "createAt";
    let _updateColumnName = "updateAt";
    if ((tableProperty == null ? void 0 : tableProperty.timestamp) && !isBoolean(tableProperty.timestamp)) {
      const { create, update } = tableProperty.timestamp;
      _insertColumnName = create ?? "createAt";
      _updateColumnName = update ?? "updateAt";
    }
    for (const columnName in columnList) {
      if (!Object.prototype.hasOwnProperty.call(columnList, columnName)) {
        continue;
      }
      const columnOption = columnList[columnName];
      let dataType = "text";
      const { type, notNull, defaultTo } = columnOption;
      switch (type) {
        case "boolean":
        case "date":
        case "object":
        case "string":
          dataType = "text";
          break;
        case "increments":
          _triggerKey = columnName;
        case "number":
          dataType = "integer";
          break;
        case "blob":
          dataType = "blob";
      }
      if ([_insertColumnName, _updateColumnName].includes(columnName)) {
        continue;
      }
      tableSql = tableSql.addColumn(columnName, dataType, (builder) => {
        if (type === "increments") {
          _haveAutoKey = true;
          return builder.autoIncrement().primaryKey();
        }
        notNull && (builder = builder.notNull());
        defaultTo !== void 0 && (builder = builder.defaultTo(
          defaultTo instanceof Function ? defaultTo(sql) : defaultTo
        ));
        return builder;
      });
    }
    if (tableProperty) {
      const _primary = tableProperty.primary;
      const _unique = tableProperty.unique;
      if (tableProperty.timestamp) {
        if (_insertColumnName) {
          tableSql = tableSql.addColumn(_insertColumnName, "text");
        }
        if (_updateColumnName) {
          tableSql = tableSql.addColumn(_updateColumnName, "text");
        }
      }
      if (!_haveAutoKey && _primary) {
        const is = isString(_primary);
        _triggerKey = is ? _primary : _primary[0];
        tableSql = tableSql.addPrimaryKeyConstraint(`pk_${is ? _primary : _primary.join("_")}`, is ? [_primary] : _primary);
      }
      _unique == null ? void 0 : _unique.forEach((u) => {
        const is = isString(u);
        _triggerKey = !_primary && !_haveAutoKey ? is ? u : u[0] : _triggerKey;
        tableSql = tableSql.addUniqueConstraint(`un_${is ? u : u.join("_")}`, is ? [u] : u);
      });
    }
    await tableSql.ifNotExists().execute();
    if (tableProperty == null ? void 0 : tableProperty.index) {
      for (const i of tableProperty.index) {
        const is = isString(i);
        let _idx = kysely.schema.createIndex(`idx_${is ? i : i.join("_")}`).on(tableName);
        _idx = is ? _idx.column(i) : _idx.columns(i);
        await _idx.ifNotExists().execute();
      }
    }
    if (tableProperty == null ? void 0 : tableProperty.timestamp) {
      _insertColumnName && await createTimeTrigger(kysely, tableName, "insert", _insertColumnName, _triggerKey);
      _updateColumnName && await createTimeTrigger(kysely, tableName, "update", _updateColumnName, _triggerKey);
    }
  }
}
var SqliteBuilder = (_k = class {
  constructor(option) {
    __publicField(this, "kysely");
    __privateAdd(this, _status, void 0);
    __privateAdd(this, _tableMap, void 0);
    const { dialect: dialect2, tables, dropTableBeforeInit: truncateBeforeInit, onError, onQuery, plugins: additionalPlugin } = option;
    const plugins = [new SqliteSerializePlugin()];
    additionalPlugin && plugins.push(...additionalPlugin);
    this.kysely = new Kysely({
      dialect: dialect2,
      log: (event) => {
        event.level === "error" ? onError && onError(event.error) : onQuery && onQuery(event.query, event.queryDurationMillis);
      },
      plugins
    });
    __privateSet(this, _status, truncateBeforeInit ? 0 : 1);
    __privateSet(this, _tableMap, parseTableMap(tables));
  }
  async init(dropTableBeforeInit = false) {
    const drop = dropTableBeforeInit || __privateGet(this, _status) === 0;
    await runCreateTable(this.kysely, __privateGet(this, _tableMap), drop);
    __privateSet(this, _status, 2);
    return this;
  }
  async checkInit() {
    __privateGet(this, _status) !== 2 && await this.init();
    if (__privateGet(this, _status) !== 2) {
      throw new Error("fail to init table");
    }
  }
  async transaction(cb, errorLog = false) {
    await this.checkInit();
    return await this.kysely.transaction().execute(cb).catch((err) => {
      errorLog && console.error(err);
      return void 0;
    });
  }
  async exec(cb, errorLog = false) {
    await this.checkInit();
    return cb(this.kysely).catch((err) => {
      errorLog && console.error(err);
      return void 0;
    });
  }
  async toSQL(cb) {
    await this.checkInit();
    return cb(this.kysely).compile();
  }
  async raw(rawSql) {
    await this.checkInit();
    return rawSql(sql).execute(this.kysely);
  }
}, _status = new WeakMap(), _tableMap = new WeakMap(), _k);
async function testDB(dialect2) {
  const db = await new SqliteBuilder({
    dialect: dialect2,
    tables: {
      test: {
        columns: {
          id: { type: "increments" },
          name: { type: "string" },
          blobtest: { type: "blob" },
          createAt: { type: "date" },
          updateAt: { type: "date" }
        },
        property: {
          timestamp: true
        }
      }
    }
  }).init();
  console.log("test");
  console.log(await db.raw((sql2) => sql2`PRAGMA table_info(${sql2.table("test")});`));
  for (let i = 0; i < 100; i++) {
    await db.transaction((trx) => {
      return trx.insertInto("test").values({
        name: `test at ${Date.now()}`,
        blobtest: Uint8Array.from([2, 3, 4, 5, 6, 7, 8])
      }).execute();
    });
  }
  return db.exec((db2) => {
    return db2.selectFrom("test").selectAll().execute();
  });
}
const dialect$1 = new SqlJsDialect({
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
    testDB(dialect$1).then((data) => {
      result.value = data;
    });
  }
  return { result, run };
}
function WorkerWrapper$2() {
  return new Worker("" + new URL("sqljsWorker-aaee8793.js", import.meta.url).href);
}
function WorkerWrapper$1() {
  return new Worker("" + new URL("officialWasmWorker-0ede4c45.js", import.meta.url).href);
}
function WorkerWrapper() {
  return new Worker("" + new URL("wa-sqlite-7ddd839a.js", import.meta.url).href);
}
var Module = (() => {
  var _scriptDir = import.meta.url;
  return function(Module2 = {}) {
    var e;
    e || (e = typeof Module2 !== "undefined" ? Module2 : {});
    var aa, ba;
    e.ready = new Promise(function(a, b) {
      aa = a;
      ba = b;
    });
    var ca = Object.assign({}, e), da = "./this.program", ea = (a, b) => {
      throw b;
    }, ha = "object" == typeof window, ia = "function" == typeof importScripts, q = "", ja;
    if (ha || ia)
      ia ? q = self.location.href : "undefined" != typeof document && document.currentScript && (q = document.currentScript.src), _scriptDir && (q = _scriptDir), 0 !== q.indexOf("blob:") ? q = q.substr(0, q.replace(/[?#].*/, "").lastIndexOf("/") + 1) : q = "", ia && (ja = (a) => {
        var b = new XMLHttpRequest();
        b.open("GET", a, false);
        b.responseType = "arraybuffer";
        b.send(null);
        return new Uint8Array(b.response);
      });
    var ka = e.print || console.log.bind(console), t = e.printErr || console.warn.bind(console);
    Object.assign(e, ca);
    ca = null;
    e.thisProgram && (da = e.thisProgram);
    e.quit && (ea = e.quit);
    var la;
    e.wasmBinary && (la = e.wasmBinary);
    var noExitRuntime = e.noExitRuntime || true;
    "object" != typeof WebAssembly && u("no native wasm support detected");
    var ma, v = false, na, oa = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
    function pa(a, b, c) {
      var d = b + c;
      for (c = b; a[c] && !(c >= d); )
        ++c;
      if (16 < c - b && a.buffer && oa)
        return oa.decode(a.subarray(b, c));
      for (d = ""; b < c; ) {
        var f = a[b++];
        if (f & 128) {
          var g = a[b++] & 63;
          if (192 == (f & 224))
            d += String.fromCharCode((f & 31) << 6 | g);
          else {
            var h = a[b++] & 63;
            f = 224 == (f & 240) ? (f & 15) << 12 | g << 6 | h : (f & 7) << 18 | g << 12 | h << 6 | a[b++] & 63;
            65536 > f ? d += String.fromCharCode(f) : (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023));
          }
        } else
          d += String.fromCharCode(f);
      }
      return d;
    }
    function x(a, b) {
      return a ? pa(y, a, b) : "";
    }
    function qa(a, b, c, d) {
      if (!(0 < d))
        return 0;
      var f = c;
      d = c + d - 1;
      for (var g = 0; g < a.length; ++g) {
        var h = a.charCodeAt(g);
        if (55296 <= h && 57343 >= h) {
          var p2 = a.charCodeAt(++g);
          h = 65536 + ((h & 1023) << 10) | p2 & 1023;
        }
        if (127 >= h) {
          if (c >= d)
            break;
          b[c++] = h;
        } else {
          if (2047 >= h) {
            if (c + 1 >= d)
              break;
            b[c++] = 192 | h >> 6;
          } else {
            if (65535 >= h) {
              if (c + 2 >= d)
                break;
              b[c++] = 224 | h >> 12;
            } else {
              if (c + 3 >= d)
                break;
              b[c++] = 240 | h >> 18;
              b[c++] = 128 | h >> 12 & 63;
            }
            b[c++] = 128 | h >> 6 & 63;
          }
          b[c++] = 128 | h & 63;
        }
      }
      b[c] = 0;
      return c - f;
    }
    function ra(a, b, c) {
      return qa(a, y, b, c);
    }
    function sa(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
      }
      return b;
    }
    var A, y, ta, B, C, ua, va;
    function wa() {
      var a = ma.buffer;
      e.HEAP8 = A = new Int8Array(a);
      e.HEAP16 = ta = new Int16Array(a);
      e.HEAP32 = B = new Int32Array(a);
      e.HEAPU8 = y = new Uint8Array(a);
      e.HEAPU16 = new Uint16Array(a);
      e.HEAPU32 = C = new Uint32Array(a);
      e.HEAPF32 = ua = new Float32Array(a);
      e.HEAPF64 = va = new Float64Array(a);
    }
    var xa = [], ya = [], za = [], Aa = [], Ba = 0;
    function Ca() {
      var a = e.preRun.shift();
      xa.unshift(a);
    }
    var D = 0, Ea = null;
    function u(a) {
      if (e.onAbort)
        e.onAbort(a);
      a = "Aborted(" + a + ")";
      t(a);
      v = true;
      na = 1;
      a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
      ba(a);
      throw a;
    }
    function Fa(a) {
      return a.startsWith("data:application/octet-stream;base64,");
    }
    var F;
    if (e.locateFile) {
      if (F = "crsqlite.wasm", !Fa(F)) {
        var Ga = F;
        F = e.locateFile ? e.locateFile(Ga, q) : q + Ga;
      }
    } else
      F = new URL("" + new URL("crsqlite-81f51098.wasm", import.meta.url).href, self.location).href;
    function Ha(a) {
      try {
        if (a == F && la)
          return new Uint8Array(la);
        if (ja)
          return ja(a);
        throw "both async and sync fetching of the wasm failed";
      } catch (b) {
        u(b);
      }
    }
    function Ia(a) {
      return la || !ha && !ia || "function" != typeof fetch ? Promise.resolve().then(function() {
        return Ha(a);
      }) : fetch(a, { credentials: "same-origin" }).then(function(b) {
        if (!b.ok)
          throw "failed to load wasm binary file at '" + a + "'";
        return b.arrayBuffer();
      }).catch(function() {
        return Ha(a);
      });
    }
    function Ja(a, b, c) {
      return Ia(a).then(function(d) {
        return WebAssembly.instantiate(d, b);
      }).then(function(d) {
        return d;
      }).then(c, function(d) {
        t("failed to asynchronously prepare wasm: " + d);
        u(d);
      });
    }
    function Ka(a, b) {
      var c = F;
      return la || "function" != typeof WebAssembly.instantiateStreaming || Fa(c) || "function" != typeof fetch ? Ja(c, a, b) : fetch(c, { credentials: "same-origin" }).then(function(d) {
        return WebAssembly.instantiateStreaming(d, a).then(b, function(f) {
          t("wasm streaming compile failed: " + f);
          t("falling back to ArrayBuffer instantiation");
          return Ja(c, a, b);
        });
      });
    }
    var I, K;
    function La(a) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + a + ")";
      this.status = a;
    }
    function Ma(a) {
      for (; 0 < a.length; )
        a.shift()(e);
    }
    function L(a, b = "i8") {
      b.endsWith("*") && (b = "*");
      switch (b) {
        case "i1":
          return A[a >> 0];
        case "i8":
          return A[a >> 0];
        case "i16":
          return ta[a >> 1];
        case "i32":
          return B[a >> 2];
        case "i64":
          return B[a >> 2];
        case "float":
          return ua[a >> 2];
        case "double":
          return va[a >> 3];
        case "*":
          return C[a >> 2];
        default:
          u("invalid type for getValue: " + b);
      }
    }
    function M(a, b, c = "i8") {
      c.endsWith("*") && (c = "*");
      switch (c) {
        case "i1":
          A[a >> 0] = b;
          break;
        case "i8":
          A[a >> 0] = b;
          break;
        case "i16":
          ta[a >> 1] = b;
          break;
        case "i32":
          B[a >> 2] = b;
          break;
        case "i64":
          K = [b >>> 0, (I = b, 1 <= +Math.abs(I) ? 0 < I ? (Math.min(+Math.floor(I / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
          B[a >> 2] = K[0];
          B[a + 4 >> 2] = K[1];
          break;
        case "float":
          ua[a >> 2] = b;
          break;
        case "double":
          va[a >> 3] = b;
          break;
        case "*":
          C[a >> 2] = b;
          break;
        default:
          u("invalid type for setValue: " + c);
      }
    }
    var Na = (a, b) => {
      for (var c = 0, d = a.length - 1; 0 <= d; d--) {
        var f = a[d];
        "." === f ? a.splice(d, 1) : ".." === f ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
      }
      if (b)
        for (; c; c--)
          a.unshift("..");
      return a;
    }, N = (a) => {
      var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
      (a = Na(a.split("/").filter((d) => !!d), !b).join("/")) || b || (a = ".");
      a && c && (a += "/");
      return (b ? "/" : "") + a;
    }, Oa = (a) => {
      var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
      a = b[0];
      b = b[1];
      if (!a && !b)
        return ".";
      b && (b = b.substr(0, b.length - 1));
      return a + b;
    }, Pa = (a) => {
      if ("/" === a)
        return "/";
      a = N(a);
      a = a.replace(/\/$/, "");
      var b = a.lastIndexOf("/");
      return -1 === b ? a : a.substr(b + 1);
    };
    function Qa() {
      if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
        var a = new Uint8Array(1);
        return () => {
          crypto.getRandomValues(a);
          return a[0];
        };
      }
      return () => u("randomDevice");
    }
    function Ra() {
      for (var a = "", b = false, c = arguments.length - 1; -1 <= c && !b; c--) {
        b = 0 <= c ? arguments[c] : "/";
        if ("string" != typeof b)
          throw new TypeError("Arguments to path.resolve must be strings");
        if (!b)
          return "";
        a = b + "/" + a;
        b = "/" === b.charAt(0);
      }
      a = Na(a.split("/").filter((d) => !!d), !b).join("/");
      return (b ? "/" : "") + a || ".";
    }
    var Sa = [];
    function Ta(a, b) {
      Sa[a] = { input: [], Ob: [], Zb: b };
      Ua(a, Va);
    }
    var Va = { open: function(a) {
      var b = Sa[a.node.bc];
      if (!b)
        throw new O(43);
      a.Pb = b;
      a.seekable = false;
    }, close: function(a) {
      a.Pb.Zb.ec(a.Pb);
    }, ec: function(a) {
      a.Pb.Zb.ec(a.Pb);
    }, read: function(a, b, c, d) {
      if (!a.Pb || !a.Pb.Zb.vc)
        throw new O(60);
      for (var f = 0, g = 0; g < d; g++) {
        try {
          var h = a.Pb.Zb.vc(a.Pb);
        } catch (p2) {
          throw new O(29);
        }
        if (void 0 === h && 0 === f)
          throw new O(6);
        if (null === h || void 0 === h)
          break;
        f++;
        b[c + g] = h;
      }
      f && (a.node.timestamp = Date.now());
      return f;
    }, write: function(a, b, c, d) {
      if (!a.Pb || !a.Pb.Zb.pc)
        throw new O(60);
      try {
        for (var f = 0; f < d; f++)
          a.Pb.Zb.pc(a.Pb, b[c + f]);
      } catch (g) {
        throw new O(29);
      }
      d && (a.node.timestamp = Date.now());
      return f;
    } }, Wa = { vc: function(a) {
      if (!a.input.length) {
        var b = null;
        "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "), null !== b && (b += "\n")) : "function" == typeof readline && (b = readline(), null !== b && (b += "\n"));
        if (!b)
          return null;
        var c = Array(sa(b) + 1);
        b = qa(b, c, 0, c.length);
        c.length = b;
        a.input = c;
      }
      return a.input.shift();
    }, pc: function(a, b) {
      null === b || 10 === b ? (ka(pa(a.Ob, 0)), a.Ob = []) : 0 != b && a.Ob.push(b);
    }, ec: function(a) {
      a.Ob && 0 < a.Ob.length && (ka(pa(a.Ob, 0)), a.Ob = []);
    } }, Xa = { pc: function(a, b) {
      null === b || 10 === b ? (t(pa(a.Ob, 0)), a.Ob = []) : 0 != b && a.Ob.push(b);
    }, ec: function(a) {
      a.Ob && 0 < a.Ob.length && (t(pa(a.Ob, 0)), a.Ob = []);
    } }, P = { Sb: null, Rb: function() {
      return P.createNode(null, "/", 16895, 0);
    }, createNode: function(a, b, c, d) {
      if (24576 === (c & 61440) || 4096 === (c & 61440))
        throw new O(63);
      P.Sb || (P.Sb = { dir: { node: { Qb: P.Ab.Qb, Nb: P.Ab.Nb, $b: P.Ab.$b, fc: P.Ab.fc, yc: P.Ab.yc, lc: P.Ab.lc, jc: P.Ab.jc, xc: P.Ab.xc, kc: P.Ab.kc }, stream: { Wb: P.Jb.Wb } }, file: { node: {
        Qb: P.Ab.Qb,
        Nb: P.Ab.Nb
      }, stream: { Wb: P.Jb.Wb, read: P.Jb.read, write: P.Jb.write, rc: P.Jb.rc, hc: P.Jb.hc, ic: P.Jb.ic } }, link: { node: { Qb: P.Ab.Qb, Nb: P.Ab.Nb, cc: P.Ab.cc }, stream: {} }, sc: { node: { Qb: P.Ab.Qb, Nb: P.Ab.Nb }, stream: Ya } });
      c = Za(a, b, c, d);
      16384 === (c.mode & 61440) ? (c.Ab = P.Sb.dir.node, c.Jb = P.Sb.dir.stream, c.Kb = {}) : 32768 === (c.mode & 61440) ? (c.Ab = P.Sb.file.node, c.Jb = P.Sb.file.stream, c.Mb = 0, c.Kb = null) : 40960 === (c.mode & 61440) ? (c.Ab = P.Sb.link.node, c.Jb = P.Sb.link.stream) : 8192 === (c.mode & 61440) && (c.Ab = P.Sb.sc.node, c.Jb = P.Sb.sc.stream);
      c.timestamp = Date.now();
      a && (a.Kb[b] = c, a.timestamp = c.timestamp);
      return c;
    }, Qc: function(a) {
      return a.Kb ? a.Kb.subarray ? a.Kb.subarray(0, a.Mb) : new Uint8Array(a.Kb) : new Uint8Array(0);
    }, tc: function(a, b) {
      var c = a.Kb ? a.Kb.length : 0;
      c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.Kb, a.Kb = new Uint8Array(b), 0 < a.Mb && a.Kb.set(c.subarray(0, a.Mb), 0));
    }, Mc: function(a, b) {
      if (a.Mb != b)
        if (0 == b)
          a.Kb = null, a.Mb = 0;
        else {
          var c = a.Kb;
          a.Kb = new Uint8Array(b);
          c && a.Kb.set(c.subarray(0, Math.min(b, a.Mb)));
          a.Mb = b;
        }
    }, Ab: {
      Qb: function(a) {
        var b = {};
        b.Ec = 8192 === (a.mode & 61440) ? a.id : 1;
        b.nc = a.id;
        b.mode = a.mode;
        b.Kc = 1;
        b.uid = 0;
        b.Hc = 0;
        b.bc = a.bc;
        16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.Mb : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
        b.Ac = new Date(a.timestamp);
        b.Jc = new Date(a.timestamp);
        b.Dc = new Date(a.timestamp);
        b.Bc = 4096;
        b.Cc = Math.ceil(b.size / b.Bc);
        return b;
      },
      Nb: function(a, b) {
        void 0 !== b.mode && (a.mode = b.mode);
        void 0 !== b.timestamp && (a.timestamp = b.timestamp);
        void 0 !== b.size && P.Mc(a, b.size);
      },
      $b: function() {
        throw $a[44];
      },
      fc: function(a, b, c, d) {
        return P.createNode(a, b, c, d);
      },
      yc: function(a, b, c) {
        if (16384 === (a.mode & 61440)) {
          try {
            var d = ab(b, c);
          } catch (g) {
          }
          if (d)
            for (var f in d.Kb)
              throw new O(55);
        }
        delete a.parent.Kb[a.name];
        a.parent.timestamp = Date.now();
        a.name = c;
        b.Kb[c] = a;
        b.timestamp = a.parent.timestamp;
        a.parent = b;
      },
      lc: function(a, b) {
        delete a.Kb[b];
        a.timestamp = Date.now();
      },
      jc: function(a, b) {
        var c = ab(a, b), d;
        for (d in c.Kb)
          throw new O(55);
        delete a.Kb[b];
        a.timestamp = Date.now();
      },
      xc: function(a) {
        var b = [".", ".."], c;
        for (c in a.Kb)
          a.Kb.hasOwnProperty(c) && b.push(c);
        return b;
      },
      kc: function(a, b, c) {
        a = P.createNode(a, b, 41471, 0);
        a.link = c;
        return a;
      },
      cc: function(a) {
        if (40960 !== (a.mode & 61440))
          throw new O(28);
        return a.link;
      }
    }, Jb: { read: function(a, b, c, d, f) {
      var g = a.node.Kb;
      if (f >= a.node.Mb)
        return 0;
      a = Math.min(a.node.Mb - f, d);
      if (8 < a && g.subarray)
        b.set(g.subarray(f, f + a), c);
      else
        for (d = 0; d < a; d++)
          b[c + d] = g[f + d];
      return a;
    }, write: function(a, b, c, d, f, g) {
      b.buffer === A.buffer && (g = false);
      if (!d)
        return 0;
      a = a.node;
      a.timestamp = Date.now();
      if (b.subarray && (!a.Kb || a.Kb.subarray)) {
        if (g)
          return a.Kb = b.subarray(c, c + d), a.Mb = d;
        if (0 === a.Mb && 0 === f)
          return a.Kb = b.slice(c, c + d), a.Mb = d;
        if (f + d <= a.Mb)
          return a.Kb.set(b.subarray(c, c + d), f), d;
      }
      P.tc(a, f + d);
      if (a.Kb.subarray && b.subarray)
        a.Kb.set(b.subarray(c, c + d), f);
      else
        for (g = 0; g < d; g++)
          a.Kb[f + g] = b[c + g];
      a.Mb = Math.max(a.Mb, f + d);
      return d;
    }, Wb: function(a, b, c) {
      1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.Mb);
      if (0 > b)
        throw new O(28);
      return b;
    }, rc: function(a, b, c) {
      P.tc(a.node, b + c);
      a.node.Mb = Math.max(a.node.Mb, b + c);
    }, hc: function(a, b, c, d, f) {
      if (32768 !== (a.node.mode & 61440))
        throw new O(43);
      a = a.node.Kb;
      if (f & 2 || a.buffer !== A.buffer) {
        if (0 < c || c + b < a.length)
          a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
        c = true;
        b = 65536 * Math.ceil(b / 65536);
        (f = bb(65536, b)) ? (y.fill(0, f, f + b), b = f) : b = 0;
        if (!b)
          throw new O(48);
        A.set(a, b);
      } else
        c = false, b = a.byteOffset;
      return { Lc: b, zc: c };
    }, ic: function(a, b, c, d) {
      P.Jb.write(a, b, 0, d, c, false);
      return 0;
    } } }, cb = null, db = {}, Q = [], eb = 1, R = null, fb = true, O = null, $a = {}, S = (a, b = {}) => {
      a = Ra(a);
      if (!a)
        return {
          path: "",
          node: null
        };
      b = Object.assign({ uc: true, qc: 0 }, b);
      if (8 < b.qc)
        throw new O(32);
      a = a.split("/").filter((h) => !!h);
      for (var c = cb, d = "/", f = 0; f < a.length; f++) {
        var g = f === a.length - 1;
        if (g && b.parent)
          break;
        c = ab(c, a[f]);
        d = N(d + "/" + a[f]);
        c.Xb && (!g || g && b.uc) && (c = c.Xb.root);
        if (!g || b.Vb) {
          for (g = 0; 40960 === (c.mode & 61440); )
            if (c = gb(d), d = Ra(Oa(d), c), c = S(d, { qc: b.qc + 1 }).node, 40 < g++)
              throw new O(32);
        }
      }
      return { path: d, node: c };
    }, hb = (a) => {
      for (var b; ; ) {
        if (a === a.parent)
          return a = a.Rb.wc, b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
        b = b ? a.name + "/" + b : a.name;
        a = a.parent;
      }
    }, ib = (a, b) => {
      for (var c = 0, d = 0; d < b.length; d++)
        c = (c << 5) - c + b.charCodeAt(d) | 0;
      return (a + c >>> 0) % R.length;
    }, jb = (a) => {
      var b = ib(a.parent.id, a.name);
      if (R[b] === a)
        R[b] = a.Yb;
      else
        for (b = R[b]; b; ) {
          if (b.Yb === a) {
            b.Yb = a.Yb;
            break;
          }
          b = b.Yb;
        }
    }, ab = (a, b) => {
      var c;
      if (c = (c = kb(a, "x")) ? c : a.Ab.$b ? 0 : 2)
        throw new O(c, a);
      for (c = R[ib(a.id, b)]; c; c = c.Yb) {
        var d = c.name;
        if (c.parent.id === a.id && d === b)
          return c;
      }
      return a.Ab.$b(a, b);
    }, Za = (a, b, c, d) => {
      a = new lb(a, b, c, d);
      b = ib(a.parent.id, a.name);
      a.Yb = R[b];
      return R[b] = a;
    }, mb = {
      r: 0,
      "r+": 2,
      w: 577,
      "w+": 578,
      a: 1089,
      "a+": 1090
    }, nb = (a) => {
      var b = ["r", "w", "rw"][a & 3];
      a & 512 && (b += "w");
      return b;
    }, kb = (a, b) => {
      if (fb)
        return 0;
      if (!b.includes("r") || a.mode & 292) {
        if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73))
          return 2;
      } else
        return 2;
      return 0;
    }, ob = (a, b) => {
      try {
        return ab(a, b), 20;
      } catch (c) {
      }
      return kb(a, "wx");
    }, pb = (a, b, c) => {
      try {
        var d = ab(a, b);
      } catch (f) {
        return f.Lb;
      }
      if (a = kb(a, "wx"))
        return a;
      if (c) {
        if (16384 !== (d.mode & 61440))
          return 54;
        if (d === d.parent || "/" === hb(d))
          return 10;
      } else if (16384 === (d.mode & 61440))
        return 31;
      return 0;
    }, qb = (a = 0) => {
      for (; 4096 >= a; a++)
        if (!Q[a])
          return a;
      throw new O(33);
    }, sb = (a, b) => {
      rb || (rb = function() {
        this.dc = {};
      }, rb.prototype = {}, Object.defineProperties(rb.prototype, { object: { get: function() {
        return this.node;
      }, set: function(c) {
        this.node = c;
      } }, flags: { get: function() {
        return this.dc.flags;
      }, set: function(c) {
        this.dc.flags = c;
      } }, position: { get: function() {
        return this.dc.position;
      }, set: function(c) {
        this.dc.position = c;
      } } }));
      a = Object.assign(new rb(), a);
      b = qb(b);
      a.Tb = b;
      return Q[b] = a;
    }, Ya = {
      open: (a) => {
        a.Jb = db[a.node.bc].Jb;
        a.Jb.open && a.Jb.open(a);
      },
      Wb: () => {
        throw new O(70);
      }
    }, Ua = (a, b) => {
      db[a] = { Jb: b };
    }, tb = (a, b) => {
      var c = "/" === b, d = !b;
      if (c && cb)
        throw new O(10);
      if (!c && !d) {
        var f = S(b, { uc: false });
        b = f.path;
        f = f.node;
        if (f.Xb)
          throw new O(10);
        if (16384 !== (f.mode & 61440))
          throw new O(54);
      }
      b = { type: a, Sc: {}, wc: b, Ic: [] };
      a = a.Rb(b);
      a.Rb = b;
      b.root = a;
      c ? cb = a : f && (f.Xb = b, f.Rb && f.Rb.Ic.push(b));
    }, ub = (a, b, c) => {
      var d = S(a, { parent: true }).node;
      a = Pa(a);
      if (!a || "." === a || ".." === a)
        throw new O(28);
      var f = ob(d, a);
      if (f)
        throw new O(f);
      if (!d.Ab.fc)
        throw new O(63);
      return d.Ab.fc(d, a, b, c);
    }, T = (a, b) => ub(a, (void 0 !== b ? b : 511) & 1023 | 16384, 0), vb = (a, b, c) => {
      "undefined" == typeof c && (c = b, b = 438);
      ub(a, b | 8192, c);
    }, wb = (a, b) => {
      if (!Ra(a))
        throw new O(44);
      var c = S(b, { parent: true }).node;
      if (!c)
        throw new O(44);
      b = Pa(b);
      var d = ob(c, b);
      if (d)
        throw new O(d);
      if (!c.Ab.kc)
        throw new O(63);
      c.Ab.kc(c, b, a);
    }, xb = (a) => {
      var b = S(a, { parent: true }).node;
      a = Pa(a);
      var c = ab(b, a), d = pb(b, a, true);
      if (d)
        throw new O(d);
      if (!b.Ab.jc)
        throw new O(63);
      if (c.Xb)
        throw new O(10);
      b.Ab.jc(b, a);
      jb(c);
    }, gb = (a) => {
      a = S(a).node;
      if (!a)
        throw new O(44);
      if (!a.Ab.cc)
        throw new O(28);
      return Ra(hb(a.parent), a.Ab.cc(a));
    }, yb = (a, b) => {
      a = S(a, { Vb: !b }).node;
      if (!a)
        throw new O(44);
      if (!a.Ab.Qb)
        throw new O(63);
      return a.Ab.Qb(a);
    }, zb = (a) => yb(a, true), Ab = (a, b) => {
      a = "string" == typeof a ? S(a, { Vb: true }).node : a;
      if (!a.Ab.Nb)
        throw new O(63);
      a.Ab.Nb(a, { mode: b & 4095 | a.mode & -4096, timestamp: Date.now() });
    }, Bb = (a, b) => {
      if (0 > b)
        throw new O(28);
      a = "string" == typeof a ? S(a, { Vb: true }).node : a;
      if (!a.Ab.Nb)
        throw new O(63);
      if (16384 === (a.mode & 61440))
        throw new O(31);
      if (32768 !== (a.mode & 61440))
        throw new O(28);
      var c = kb(a, "w");
      if (c)
        throw new O(c);
      a.Ab.Nb(a, { size: b, timestamp: Date.now() });
    }, Db = (a, b, c) => {
      if ("" === a)
        throw new O(44);
      if ("string" == typeof b) {
        var d = mb[b];
        if ("undefined" == typeof d)
          throw Error("Unknown file open mode: " + b);
        b = d;
      }
      c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
      if ("object" == typeof a)
        var f = a;
      else {
        a = N(a);
        try {
          f = S(a, { Vb: !(b & 131072) }).node;
        } catch (g) {
        }
      }
      d = false;
      if (b & 64)
        if (f) {
          if (b & 128)
            throw new O(20);
        } else
          f = ub(a, c, 0), d = true;
      if (!f)
        throw new O(44);
      8192 === (f.mode & 61440) && (b &= -513);
      if (b & 65536 && 16384 !== (f.mode & 61440))
        throw new O(54);
      if (!d && (c = f ? 40960 === (f.mode & 61440) ? 32 : 16384 === (f.mode & 61440) && ("r" !== nb(b) || b & 512) ? 31 : kb(f, nb(b)) : 44))
        throw new O(c);
      b & 512 && !d && Bb(f, 0);
      b &= -131713;
      f = sb({ node: f, path: hb(f), flags: b, seekable: true, position: 0, Jb: f.Jb, Pc: [], error: false });
      f.Jb.open && f.Jb.open(f);
      !e.logReadFiles || b & 1 || (Cb || (Cb = {}), a in Cb || (Cb[a] = 1));
      return f;
    }, Eb = (a, b, c) => {
      if (null === a.Tb)
        throw new O(8);
      if (!a.seekable || !a.Jb.Wb)
        throw new O(70);
      if (0 != c && 1 != c && 2 != c)
        throw new O(28);
      a.position = a.Jb.Wb(a, b, c);
      a.Pc = [];
    }, Fb = () => {
      O || (O = function(a, b) {
        this.name = "ErrnoError";
        this.node = b;
        this.Nc = function(c) {
          this.Lb = c;
        };
        this.Nc(a);
        this.message = "FS error";
      }, O.prototype = Error(), O.prototype.constructor = O, [44].forEach((a) => {
        $a[a] = new O(a);
        $a[a].stack = "<generic error, no stack>";
      }));
    }, Gb, Hb = (a, b) => {
      var c = 0;
      a && (c |= 365);
      b && (c |= 146);
      return c;
    }, Jb = (a, b, c) => {
      a = N("/dev/" + a);
      var d = Hb(!!b, !!c);
      Ib || (Ib = 64);
      var f = Ib++ << 8 | 0;
      Ua(f, { open: (g) => {
        g.seekable = false;
      }, close: () => {
        c && c.buffer && c.buffer.length && c(10);
      }, read: (g, h, p2, k) => {
        for (var l = 0, m = 0; m < k; m++) {
          try {
            var n = b();
          } catch (r) {
            throw new O(29);
          }
          if (void 0 === n && 0 === l)
            throw new O(6);
          if (null === n || void 0 === n)
            break;
          l++;
          h[p2 + m] = n;
        }
        l && (g.node.timestamp = Date.now());
        return l;
      }, write: (g, h, p2, k) => {
        for (var l = 0; l < k; l++)
          try {
            c(h[p2 + l]);
          } catch (m) {
            throw new O(29);
          }
        k && (g.node.timestamp = Date.now());
        return l;
      } });
      vb(a, d, f);
    }, Ib, U = {}, rb, Cb;
    function Kb(a, b, c) {
      if ("/" === b.charAt(0))
        return b;
      a = -100 === a ? "/" : W(a).path;
      if (0 == b.length) {
        if (!c)
          throw new O(44);
        return a;
      }
      return N(a + "/" + b);
    }
    function Lb(a, b, c) {
      try {
        var d = a(b);
      } catch (g) {
        if (g && g.node && N(b) !== N(hb(g.node)))
          return -54;
        throw g;
      }
      B[c >> 2] = d.Ec;
      B[c + 8 >> 2] = d.nc;
      B[c + 12 >> 2] = d.mode;
      C[c + 16 >> 2] = d.Kc;
      B[c + 20 >> 2] = d.uid;
      B[c + 24 >> 2] = d.Hc;
      B[c + 28 >> 2] = d.bc;
      K = [d.size >>> 0, (I = d.size, 1 <= +Math.abs(I) ? 0 < I ? (Math.min(+Math.floor(I / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
      B[c + 40 >> 2] = K[0];
      B[c + 44 >> 2] = K[1];
      B[c + 48 >> 2] = 4096;
      B[c + 52 >> 2] = d.Cc;
      a = d.Ac.getTime();
      b = d.Jc.getTime();
      var f = d.Dc.getTime();
      K = [Math.floor(a / 1e3) >>> 0, (I = Math.floor(a / 1e3), 1 <= +Math.abs(I) ? 0 < I ? (Math.min(+Math.floor(I / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
      B[c + 56 >> 2] = K[0];
      B[c + 60 >> 2] = K[1];
      C[c + 64 >> 2] = a % 1e3 * 1e3;
      K = [Math.floor(b / 1e3) >>> 0, (I = Math.floor(b / 1e3), 1 <= +Math.abs(I) ? 0 < I ? (Math.min(+Math.floor(I / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
      B[c + 72 >> 2] = K[0];
      B[c + 76 >> 2] = K[1];
      C[c + 80 >> 2] = b % 1e3 * 1e3;
      K = [Math.floor(f / 1e3) >>> 0, (I = Math.floor(f / 1e3), 1 <= +Math.abs(I) ? 0 < I ? (Math.min(+Math.floor(I / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
      B[c + 88 >> 2] = K[0];
      B[c + 92 >> 2] = K[1];
      C[c + 96 >> 2] = f % 1e3 * 1e3;
      K = [d.nc >>> 0, (I = d.nc, 1 <= +Math.abs(I) ? 0 < I ? (Math.min(+Math.floor(I / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
      B[c + 104 >> 2] = K[0];
      B[c + 108 >> 2] = K[1];
      return 0;
    }
    var Mb = void 0;
    function Nb() {
      Mb += 4;
      return B[Mb - 4 >> 2];
    }
    function W(a) {
      a = Q[a];
      if (!a)
        throw new O(8);
      return a;
    }
    function Ob(a) {
      return C[a >> 2] + 4294967296 * B[a + 4 >> 2];
    }
    var Pb = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Qb = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    function Rb(a) {
      var b = sa(a) + 1, c = Sb(b);
      c && qa(a, A, c, b);
      return c;
    }
    var Tb = {};
    function Ub() {
      if (!Vb) {
        var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: da || "./this.program" }, b;
        for (b in Tb)
          void 0 === Tb[b] ? delete a[b] : a[b] = Tb[b];
        var c = [];
        for (b in a)
          c.push(b + "=" + a[b]);
        Vb = c;
      }
      return Vb;
    }
    var Vb;
    function Wb() {
    }
    function Xb() {
    }
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
    function Hc(a) {
      na = a;
      if (!(noExitRuntime || 0 < Ba)) {
        if (e.onExit)
          e.onExit(a);
        v = true;
      }
      ea(a, new La(a));
    }
    function Ic(a) {
      a instanceof La || "unwind" == a || ea(1, a);
    }
    function Jc(a) {
      try {
        a();
      } catch (b) {
        u(b);
      }
    }
    function Kc(a) {
      var b = {}, c;
      for (c in a)
        (function(d) {
          var f = a[d];
          b[d] = "function" == typeof f ? function() {
            Lc.push(d);
            try {
              return f.apply(null, arguments);
            } finally {
              v || (Lc.pop() === d || u(), X && 1 === Y && 0 === Lc.length && (Y = 0, Jc(Mc), "undefined" != typeof Fibers && Fibers.Tc()));
            }
          } : f;
        })(c);
      return b;
    }
    var Y = 0, X = null, Nc = 0, Lc = [], Oc = {}, Pc = {}, Qc = 0, Rc = null, Sc = [];
    function Tc() {
      return new Promise((a, b) => {
        Rc = { resolve: a, reject: b };
      });
    }
    function Uc() {
      var a = Sb(12300), b = a + 12;
      B[a >> 2] = b;
      B[a + 4 >> 2] = b + 12288;
      b = Lc[0];
      var c = Oc[b];
      void 0 === c && (c = Qc++, Oc[b] = c, Pc[c] = b);
      B[a + 8 >> 2] = c;
      return a;
    }
    function Vc(a) {
      if (!v) {
        if (0 === Y) {
          var b = false, c = false;
          a((d = 0) => {
            if (!v && (Nc = d, b = true, c)) {
              Y = 2;
              Jc(() => Wc(X));
              d = false;
              try {
                var f = (0, e.asm[Pc[B[X + 8 >> 2]]])();
              } catch (p2) {
                f = p2, d = true;
              }
              var g = false;
              if (!X) {
                var h = Rc;
                h && (Rc = null, (d ? h.reject : h.resolve)(f), g = true);
              }
              if (d && !g)
                throw f;
            }
          });
          c = true;
          b || (Y = 1, X = Uc(), Jc(() => Yc(X)));
        } else
          2 === Y ? (Y = 0, Jc(Zc), $c(X), X = null, Sc.forEach((d) => {
            if (!v)
              try {
                if (d(), !(noExitRuntime || 0 < Ba))
                  try {
                    na = d = na, Hc(d);
                  } catch (f) {
                    Ic(f);
                  }
              } catch (f) {
                Ic(f);
              }
          })) : u("invalid state: " + Y);
        return Nc;
      }
    }
    function ad(a) {
      return Vc((b) => {
        a().then(b);
      });
    }
    var bd = {};
    function Z(a, b, c, d, f) {
      function g(n) {
        --Ba;
        0 !== k && cd(k);
        return "string" === b ? x(n) : "boolean" === b ? !!n : n;
      }
      var h = { string: (n) => {
        var r = 0;
        if (null !== n && void 0 !== n && 0 !== n) {
          var w = (n.length << 2) + 1;
          r = dd(w);
          ra(n, r, w);
        }
        return r;
      }, array: (n) => {
        var r = dd(n.length);
        A.set(n, r);
        return r;
      } };
      a = e["_" + a];
      var p2 = [], k = 0;
      if (d)
        for (var l = 0; l < d.length; l++) {
          var m = h[c[l]];
          m ? (0 === k && (k = ed()), p2[l] = m(d[l])) : p2[l] = d[l];
        }
      c = X;
      d = a.apply(null, p2);
      Ba += 1;
      f = f && f.async;
      if (X != c)
        return Tc().then(g);
      d = g(d);
      return f ? Promise.resolve(d) : d;
    }
    function lb(a, b, c, d) {
      a || (a = this);
      this.parent = a;
      this.Rb = a.Rb;
      this.Xb = null;
      this.id = eb++;
      this.name = b;
      this.mode = c;
      this.Ab = {};
      this.Jb = {};
      this.bc = d;
    }
    Object.defineProperties(lb.prototype, { read: { get: function() {
      return 365 === (this.mode & 365);
    }, set: function(a) {
      a ? this.mode |= 365 : this.mode &= -366;
    } }, write: { get: function() {
      return 146 === (this.mode & 146);
    }, set: function(a) {
      a ? this.mode |= 146 : this.mode &= -147;
    } } });
    Fb();
    R = Array(4096);
    tb(P, "/");
    T("/tmp");
    T("/home");
    T("/home/web_user");
    (() => {
      T("/dev");
      Ua(259, { read: () => 0, write: (b, c, d, f) => f });
      vb("/dev/null", 259);
      Ta(1280, Wa);
      Ta(1536, Xa);
      vb("/dev/tty", 1280);
      vb("/dev/tty1", 1536);
      var a = Qa();
      Jb("random", a);
      Jb("urandom", a);
      T("/dev/shm");
      T("/dev/shm/tmp");
    })();
    (() => {
      T("/proc");
      var a = T("/proc/self");
      T("/proc/self/fd");
      tb({ Rb: () => {
        var b = Za(a, "fd", 16895, 73);
        b.Ab = { $b: (c, d) => {
          var f = Q[+d];
          if (!f)
            throw new O(8);
          c = { parent: null, Rb: { wc: "fake" }, Ab: { cc: () => f.path } };
          return c.parent = c;
        } };
        return b;
      } }, "/proc/self/fd");
    })();
    (function() {
      function a(d, f) {
        const g = [];
        for (let h = 0; 0 != d[f + h]; ++h) {
          if (1e3 < h)
            throw Error("C-string never terminated after 1k characters");
          g.push(d[f + h]);
        }
        return String.fromCharCode(...g);
      }
      const b = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
      e.updateHook = function(d, f) {
        const g = b.size;
        b.set(g, f);
        return Z("update_hook", "void", ["number", "number"], [d, g]);
      };
      e.createFunction = function(d, f, g, h, p2, k) {
        const l = b.size;
        b.set(l, { f: k, Ub: p2 });
        return Z("create_function", "number", "number string number number number number".split(" "), [d, f, g, h, l, 0]);
      };
      e.createAggregate = function(d, f, g, h, p2, k, l) {
        const m = b.size;
        b.set(m, { step: k, Fc: l, Ub: p2 });
        return Z("create_function", "number", "number string number number number number".split(" "), [d, f, g, h, m, 1]);
      };
      e.getFunctionUserData = function(d) {
        return c.get(d);
      };
      Zb = function(d, f, g, h, p2, k) {
        d = b.get(d);
        const l = A;
        p2 = BigInt(k) << 32n | BigInt(p2) & 4294967295n;
        d(f, a(l, g), a(l, h), p2);
      };
      Xb = function(d, f, g, h) {
        d = b.get(d);
        c.set(f, d.Ub);
        d.f(f, new Uint32Array(y.buffer, h, g));
        c.delete(f);
      };
      Yb = function(d, f, g, h) {
        d = b.get(d);
        c.set(f, d.Ub);
        d.step(f, new Uint32Array(y.buffer, h, g));
        c.delete(f);
      };
      Wb = function(d, f) {
        d = b.get(d);
        c.set(f, d.Ub);
        d.Fc(f);
        c.delete(f);
      };
    })();
    (function() {
      function a(k, l) {
        const m = `get${k}`, n = `set${k}`;
        return new Proxy(new DataView(y.buffer, l, "Int32" === k ? 4 : 8), { get(r, w) {
          if (w === m)
            return function(z, G) {
              if (!G)
                throw Error("must be little endian");
              return r[w](z, G);
            };
          if (w === n)
            return function(z, G, E) {
              if (!E)
                throw Error("must be little endian");
              return r[w](z, G, E);
            };
          if ("string" === typeof w && w.match(/^(get)|(set)/))
            throw Error("invalid type");
          return r[w];
        } });
      }
      const b = "object" === typeof bd, c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), g = b ? /* @__PURE__ */ new Set() : null, h = b ? /* @__PURE__ */ new Set() : null, p2 = /* @__PURE__ */ new Map();
      pc = function(k, l, m, n) {
        p2.set(x(k), { size: l, ac: Array.from(new Uint32Array(y.buffer, n, m)) });
      };
      e.createModule = function(k, l, m, n) {
        b && (m.handleAsync = ad);
        const r = c.size;
        c.set(r, { module: m, Ub: n });
        n = 0;
        m.xCreate && (n |= 1);
        m.xConnect && (n |= 2);
        m.xBestIndex && (n |= 4);
        m.xDisconnect && (n |= 8);
        m.xDestroy && (n |= 16);
        m.xOpen && (n |= 32);
        m.xClose && (n |= 64);
        m.xFilter && (n |= 128);
        m.xNext && (n |= 256);
        m.xEof && (n |= 512);
        m.xColumn && (n |= 1024);
        m.xRowid && (n |= 2048);
        m.xUpdate && (n |= 4096);
        m.xBegin && (n |= 8192);
        m.xSync && (n |= 16384);
        m.xCommit && (n |= 32768);
        m.xRollback && (n |= 65536);
        m.xFindFunction && (n |= 131072);
        m.xRename && (n |= 262144);
        return Z("create_module", "number", ["number", "string", "number", "number"], [k, l, r, n]);
      };
      fc = function(k, l, m, n, r, w) {
        l = c.get(l);
        d.set(r, l);
        if (b) {
          g.delete(r);
          for (const z of g)
            d.delete(z);
        }
        n = Array.from(new Uint32Array(y.buffer, n, m)).map((z) => x(z));
        return l.module.xCreate(k, l.Ub, n, r, a("Int32", w));
      };
      ec = function(k, l, m, n, r, w) {
        l = c.get(l);
        d.set(r, l);
        if (b) {
          g.delete(r);
          for (const z of g)
            d.delete(z);
        }
        n = Array.from(new Uint32Array(y.buffer, n, m)).map((z) => x(z));
        return l.module.xConnect(k, l.Ub, n, r, a("Int32", w));
      };
      ac = function(k, l) {
        var m = d.get(k), n = p2.get("sqlite3_index_info").ac;
        const r = {};
        r.nConstraint = L(l + n[0], "i32");
        r.aConstraint = [];
        var w = L(l + n[1], "i32"), z = p2.get("sqlite3_index_constraint").size;
        for (var G = 0; G < r.nConstraint; ++G) {
          var E = r.aConstraint, J = E.push, H = w + G * z, fa = p2.get("sqlite3_index_constraint").ac, V = {};
          V.iColumn = L(H + fa[0], "i32");
          V.op = L(H + fa[1], "i8");
          V.usable = !!L(H + fa[2], "i8");
          J.call(E, V);
        }
        r.nOrderBy = L(l + n[2], "i32");
        r.aOrderBy = [];
        w = L(l + n[3], "i32");
        z = p2.get("sqlite3_index_orderby").size;
        for (G = 0; G < r.nOrderBy; ++G)
          E = r.aOrderBy, J = E.push, H = w + G * z, fa = p2.get("sqlite3_index_orderby").ac, V = {}, V.iColumn = L(H + fa[0], "i32"), V.desc = !!L(H + fa[1], "i8"), J.call(E, V);
        r.aConstraintUsage = [];
        for (w = 0; w < r.nConstraint; ++w)
          r.aConstraintUsage.push({ argvIndex: 0, omit: false });
        r.idxNum = L(l + n[5], "i32");
        r.idxStr = null;
        r.orderByConsumed = !!L(l + n[8], "i8");
        r.estimatedCost = L(l + n[9], "double");
        r.estimatedRows = L(l + n[10], "i64");
        r.idxFlags = L(l + n[11], "i32");
        r.colUsed = L(l + n[12], "i64");
        k = m.module.xBestIndex(k, r);
        m = p2.get("sqlite3_index_info").ac;
        n = L(l + m[4], "i32");
        w = p2.get("sqlite3_index_constraint_usage").size;
        for (J = 0; J < r.nConstraint; ++J)
          z = n + J * w, E = r.aConstraintUsage[J], H = p2.get("sqlite3_index_constraint_usage").ac, M(z + H[0], E.argvIndex, "i32"), M(z + H[1], E.omit ? 1 : 0, "i8");
        M(l + m[5], r.idxNum, "i32");
        "string" === typeof r.idxStr && (n = sa(r.idxStr), w = Z("sqlite3_malloc", "number", ["number"], [n + 1]), ra(r.idxStr, w, n + 1), M(l + m[6], w, "i32"), M(l + m[7], 1, "i32"));
        M(l + m[8], r.orderByConsumed, "i32");
        M(l + m[9], r.estimatedCost, "double");
        M(l + m[10], r.estimatedRows, "i64");
        M(l + m[11], r.idxFlags, "i32");
        return k;
      };
      hc = function(k) {
        const l = d.get(k);
        b ? g.add(k) : d.delete(k);
        return l.module.xDisconnect(k);
      };
      gc = function(k) {
        const l = d.get(k);
        b ? g.add(k) : d.delete(k);
        return l.module.xDestroy(k);
      };
      lc = function(k, l) {
        const m = d.get(k);
        f.set(l, m);
        if (b) {
          h.delete(l);
          for (const n of h)
            f.delete(n);
        }
        return m.module.xOpen(k, l);
      };
      bc = function(k) {
        const l = f.get(k);
        b ? h.add(k) : f.delete(k);
        return l.module.xClose(k);
      };
      ic = function(k) {
        return f.get(k).module.xEof(k) ? 1 : 0;
      };
      jc = function(k, l, m, n, r) {
        const w = f.get(k);
        m = m ? x(m) : null;
        r = new Uint32Array(y.buffer, r, n);
        return w.module.xFilter(k, l, m, r);
      };
      kc = function(k) {
        return f.get(k).module.xNext(k);
      };
      cc = function(k, l, m) {
        return f.get(k).module.xColumn(k, l, m);
      };
      oc = function(k, l) {
        return f.get(k).module.xRowid(k, a("BigInt64", l));
      };
      rc = function(k, l, m, n) {
        const r = d.get(k);
        m = new Uint32Array(y.buffer, m, l);
        return r.module.xUpdate(k, m, a("BigInt64", n));
      };
      $b = function(k) {
        return d.get(k).module.xBegin(k);
      };
      qc = function(k) {
        return d.get(k).module.xSync(k);
      };
      dc = function(k) {
        return d.get(k).module.xCommit(k);
      };
      nc = function(k) {
        return d.get(k).module.xRollback(k);
      };
      mc = function(k, l) {
        const m = d.get(k);
        l = x(l);
        return m.module.xRename(k, l);
      };
    })();
    (function() {
      function a(g, h) {
        const p2 = `get${g}`, k = `set${g}`;
        return new Proxy(new DataView(y.buffer, h, "Int32" === g ? 4 : 8), { get(l, m) {
          if (m === p2)
            return function(n, r) {
              if (!r)
                throw Error("must be little endian");
              return l[m](n, r);
            };
          if (m === k)
            return function(n, r, w) {
              if (!w)
                throw Error("must be little endian");
              return l[m](n, r, w);
            };
          if ("string" === typeof m && m.match(/^(get)|(set)/))
            throw Error("invalid type");
          return l[m];
        } });
      }
      const b = "object" === typeof bd, c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
      e.registerVFS = function(g, h) {
        if (Z("sqlite3_vfs_find", "number", ["string"], [g.name]))
          throw Error(`VFS '${g.name}' already registered`);
        b && (g.handleAsync = ad);
        var p2 = g.Rc ?? 64;
        const k = e._malloc(4);
        h = Z("register_vfs", "number", ["string", "number", "number", "number"], [g.name, p2, h ? 1 : 0, k]);
        h || (p2 = L(k, "i32"), c.set(p2, g));
        e._free(k);
        return h;
      };
      const f = b ? /* @__PURE__ */ new Set() : null;
      uc = function(g) {
        const h = d.get(g);
        b ? f.add(g) : d.delete(g);
        return h.xClose(g);
      };
      Bc = function(g, h, p2, k) {
        return d.get(g).xRead(g, y.subarray(h, h + p2), L(k, "i64"));
      };
      Gc = function(g, h, p2, k) {
        return d.get(g).xWrite(g, y.subarray(h, h + p2), L(k, "i64"));
      };
      Ec = function(g, h) {
        return d.get(g).xTruncate(g, L(h, "i64"));
      };
      Dc = function(g, h) {
        return d.get(g).xSync(g, h);
      };
      yc = function(g, h) {
        const p2 = d.get(g);
        h = a("BigInt64", h);
        return p2.xFileSize(g, h);
      };
      zc = function(g, h) {
        return d.get(g).xLock(g, h);
      };
      Fc = function(g, h) {
        return d.get(g).xUnlock(g, h);
      };
      tc = function(g, h) {
        const p2 = d.get(g);
        h = a("Int32", h);
        return p2.xCheckReservedLock(g, h);
      };
      xc = function(g, h, p2) {
        const k = d.get(g);
        p2 = new DataView(y.buffer, p2);
        return k.xFileControl(g, h, p2);
      };
      Cc = function(g) {
        return d.get(g).xSectorSize(g);
      };
      wc = function(g) {
        return d.get(g).xDeviceCharacteristics(g);
      };
      Ac = function(g, h, p2, k, l) {
        g = c.get(g);
        d.set(p2, g);
        if (b) {
          f.delete(p2);
          for (var m of f)
            d.delete(m);
        }
        m = null;
        if (k & 64) {
          m = 1;
          const n = [];
          for (; m; ) {
            const r = y[h++];
            if (r)
              n.push(r);
            else
              switch (y[h] || (m = null), m) {
                case 1:
                  n.push(63);
                  m = 2;
                  break;
                case 2:
                  n.push(61);
                  m = 3;
                  break;
                case 3:
                  n.push(38), m = 2;
              }
          }
          m = new TextDecoder().decode(new Uint8Array(n));
        } else
          h && (m = x(h));
        l = a("Int32", l);
        return g.xOpen(m, p2, k, l);
      };
      vc = function(g, h, p2) {
        return c.get(g).xDelete(x(h), p2);
      };
      sc = function(g, h, p2, k) {
        g = c.get(g);
        k = a("Int32", k);
        return g.xAccess(x(h), p2, k);
      };
    })();
    var gd = {
      a: function(a, b, c, d) {
        u("Assertion failed: " + x(a) + ", at: " + [b ? x(b) : "unknown filename", c, d ? x(d) : "unknown function"]);
      },
      K: function(a, b) {
        try {
          return a = x(a), Ab(a, b), 0;
        } catch (c) {
          if ("undefined" == typeof U || "ErrnoError" !== c.name)
            throw c;
          return -c.Lb;
        }
      },
      N: function(a, b, c) {
        try {
          b = x(b);
          b = Kb(a, b);
          if (c & -8)
            return -28;
          var d = S(b, { Vb: true }).node;
          if (!d)
            return -44;
          a = "";
          c & 4 && (a += "r");
          c & 2 && (a += "w");
          c & 1 && (a += "x");
          return a && kb(d, a) ? -2 : 0;
        } catch (f) {
          if ("undefined" == typeof U || "ErrnoError" !== f.name)
            throw f;
          return -f.Lb;
        }
      },
      L: function(a, b) {
        try {
          var c = Q[a];
          if (!c)
            throw new O(8);
          Ab(c.node, b);
          return 0;
        } catch (d) {
          if ("undefined" == typeof U || "ErrnoError" !== d.name)
            throw d;
          return -d.Lb;
        }
      },
      J: function(a) {
        try {
          var b = Q[a];
          if (!b)
            throw new O(8);
          var c = b.node;
          var d = "string" == typeof c ? S(c, { Vb: true }).node : c;
          if (!d.Ab.Nb)
            throw new O(63);
          d.Ab.Nb(d, { timestamp: Date.now() });
          return 0;
        } catch (f) {
          if ("undefined" == typeof U || "ErrnoError" !== f.name)
            throw f;
          return -f.Lb;
        }
      },
      b: function(a, b, c) {
        Mb = c;
        try {
          var d = W(a);
          switch (b) {
            case 0:
              var f = Nb();
              return 0 > f ? -28 : sb(d, f).Tb;
            case 1:
            case 2:
              return 0;
            case 3:
              return d.flags;
            case 4:
              return f = Nb(), d.flags |= f, 0;
            case 5:
              return f = Nb(), ta[f + 0 >> 1] = 2, 0;
            case 6:
            case 7:
              return 0;
            case 16:
            case 8:
              return -28;
            case 9:
              return B[fd() >> 2] = 28, -1;
            default:
              return -28;
          }
        } catch (g) {
          if ("undefined" == typeof U || "ErrnoError" !== g.name)
            throw g;
          return -g.Lb;
        }
      },
      I: function(a, b) {
        try {
          var c = W(a);
          return Lb(yb, c.path, b);
        } catch (d) {
          if ("undefined" == typeof U || "ErrnoError" !== d.name)
            throw d;
          return -d.Lb;
        }
      },
      k: function(a, b, c) {
        try {
          b = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
          if (isNaN(b))
            return -61;
          var d = Q[a];
          if (!d)
            throw new O(8);
          if (0 === (d.flags & 2097155))
            throw new O(28);
          Bb(d.node, b);
          return 0;
        } catch (f) {
          if ("undefined" == typeof U || "ErrnoError" !== f.name)
            throw f;
          return -f.Lb;
        }
      },
      C: function(a, b) {
        try {
          if (0 === b)
            return -28;
          var c = sa("/") + 1;
          if (b < c)
            return -68;
          ra("/", a, b);
          return c;
        } catch (d) {
          if ("undefined" == typeof U || "ErrnoError" !== d.name)
            throw d;
          return -d.Lb;
        }
      },
      G: function(a, b) {
        try {
          return a = x(a), Lb(zb, a, b);
        } catch (c) {
          if ("undefined" == typeof U || "ErrnoError" !== c.name)
            throw c;
          return -c.Lb;
        }
      },
      z: function(a, b, c) {
        try {
          return b = x(b), b = Kb(a, b), b = N(b), "/" === b[b.length - 1] && (b = b.substr(0, b.length - 1)), T(b, c), 0;
        } catch (d) {
          if ("undefined" == typeof U || "ErrnoError" !== d.name)
            throw d;
          return -d.Lb;
        }
      },
      E: function(a, b, c, d) {
        try {
          b = x(b);
          var f = d & 256;
          b = Kb(a, b, d & 4096);
          return Lb(f ? zb : yb, b, c);
        } catch (g) {
          if ("undefined" == typeof U || "ErrnoError" !== g.name)
            throw g;
          return -g.Lb;
        }
      },
      v: function(a, b, c, d) {
        Mb = d;
        try {
          b = x(b);
          b = Kb(a, b);
          var f = d ? Nb() : 0;
          return Db(b, c, f).Tb;
        } catch (g) {
          if ("undefined" == typeof U || "ErrnoError" !== g.name)
            throw g;
          return -g.Lb;
        }
      },
      s: function(a, b, c, d) {
        try {
          b = x(b);
          b = Kb(a, b);
          if (0 >= d)
            return -28;
          var f = gb(b), g = Math.min(d, sa(f)), h = A[c + g];
          ra(f, c, d + 1);
          A[c + g] = h;
          return g;
        } catch (p2) {
          if ("undefined" == typeof U || "ErrnoError" !== p2.name)
            throw p2;
          return -p2.Lb;
        }
      },
      r: function(a) {
        try {
          return a = x(a), xb(a), 0;
        } catch (b) {
          if ("undefined" == typeof U || "ErrnoError" !== b.name)
            throw b;
          return -b.Lb;
        }
      },
      H: function(a, b) {
        try {
          return a = x(a), Lb(yb, a, b);
        } catch (c) {
          if ("undefined" == typeof U || "ErrnoError" !== c.name)
            throw c;
          return -c.Lb;
        }
      },
      o: function(a, b, c) {
        try {
          b = x(b);
          b = Kb(a, b);
          if (0 === c) {
            a = b;
            var d = S(a, { parent: true }).node;
            if (!d)
              throw new O(44);
            var f = Pa(a), g = ab(d, f), h = pb(d, f, false);
            if (h)
              throw new O(h);
            if (!d.Ab.lc)
              throw new O(63);
            if (g.Xb)
              throw new O(10);
            d.Ab.lc(d, f);
            jb(g);
          } else
            512 === c ? xb(b) : u("Invalid flags passed to unlinkat");
          return 0;
        } catch (p2) {
          if ("undefined" == typeof U || "ErrnoError" !== p2.name)
            throw p2;
          return -p2.Lb;
        }
      },
      n: function(a, b, c) {
        try {
          b = x(b);
          b = Kb(a, b, true);
          if (c) {
            var d = Ob(c), f = B[c + 8 >> 2];
            g = 1e3 * d + f / 1e6;
            c += 16;
            d = Ob(c);
            f = B[c + 8 >> 2];
            h = 1e3 * d + f / 1e6;
          } else
            var g = Date.now(), h = g;
          a = g;
          var p2 = S(b, { Vb: true }).node;
          p2.Ab.Nb(p2, { timestamp: Math.max(a, h) });
          return 0;
        } catch (k) {
          if ("undefined" == typeof U || "ErrnoError" !== k.name)
            throw k;
          return -k.Lb;
        }
      },
      y: function(a, b) {
        a = new Date(1e3 * Ob(a));
        B[b >> 2] = a.getSeconds();
        B[b + 4 >> 2] = a.getMinutes();
        B[b + 8 >> 2] = a.getHours();
        B[b + 12 >> 2] = a.getDate();
        B[b + 16 >> 2] = a.getMonth();
        B[b + 20 >> 2] = a.getFullYear() - 1900;
        B[b + 24 >> 2] = a.getDay();
        var c = a.getFullYear();
        B[b + 28 >> 2] = (0 !== c % 4 || 0 === c % 100 && 0 !== c % 400 ? Qb : Pb)[a.getMonth()] + a.getDate() - 1 | 0;
        B[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
        c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
        var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
        B[b + 32 >> 2] = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;
      },
      w: function(a, b, c, d, f, g, h) {
        try {
          var p2 = W(d);
          if (0 !== (b & 2) && 0 === (c & 2) && 2 !== (p2.flags & 2097155))
            throw new O(2);
          if (1 === (p2.flags & 2097155))
            throw new O(2);
          if (!p2.Jb.hc)
            throw new O(43);
          var k = p2.Jb.hc(p2, a, f, b, c);
          var l = k.Lc;
          B[g >> 2] = k.zc;
          C[h >> 2] = l;
          return 0;
        } catch (m) {
          if ("undefined" == typeof U || "ErrnoError" !== m.name)
            throw m;
          return -m.Lb;
        }
      },
      x: function(a, b, c, d, f, g) {
        try {
          var h = W(f);
          if (c & 2) {
            if (32768 !== (h.node.mode & 61440))
              throw new O(43);
            d & 2 || h.Jb.ic && h.Jb.ic(h, y.slice(a, a + b), g, b, d);
          }
        } catch (p2) {
          if ("undefined" == typeof U || "ErrnoError" !== p2.name)
            throw p2;
          return -p2.Lb;
        }
      },
      p: function(a, b, c) {
        function d(k) {
          return (k = k.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? k[1] : "GMT";
        }
        var f = (/* @__PURE__ */ new Date()).getFullYear(), g = new Date(f, 0, 1), h = new Date(f, 6, 1);
        f = g.getTimezoneOffset();
        var p2 = h.getTimezoneOffset();
        C[a >> 2] = 60 * Math.max(f, p2);
        B[b >> 2] = Number(f != p2);
        a = d(g);
        b = d(h);
        a = Rb(a);
        b = Rb(b);
        p2 < f ? (C[c >> 2] = a, C[c + 4 >> 2] = b) : (C[c >> 2] = b, C[c + 4 >> 2] = a);
      },
      e: function() {
        return Date.now();
      },
      d: () => performance.now(),
      l: function(a) {
        var b = y.length;
        a >>>= 0;
        if (2147483648 < a)
          return false;
        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + 0.2 / c);
          d = Math.min(d, a + 100663296);
          var f = Math, g = f.min;
          d = Math.max(a, d);
          d += (65536 - d % 65536) % 65536;
          a: {
            var h = ma.buffer;
            try {
              ma.grow(g.call(f, 2147483648, d) - h.byteLength + 65535 >>> 16);
              wa();
              var p2 = 1;
              break a;
            } catch (k) {
            }
            p2 = void 0;
          }
          if (p2)
            return true;
        }
        return false;
      },
      A: function(a, b) {
        var c = 0;
        Ub().forEach(function(d, f) {
          var g = b + c;
          f = C[a + 4 * f >> 2] = g;
          for (g = 0; g < d.length; ++g)
            A[f++ >> 0] = d.charCodeAt(g);
          A[f >> 0] = 0;
          c += d.length + 1;
        });
        return 0;
      },
      B: function(a, b) {
        var c = Ub();
        C[a >> 2] = c.length;
        var d = 0;
        c.forEach(function(f) {
          d += f.length + 1;
        });
        C[b >> 2] = d;
        return 0;
      },
      f: function(a) {
        try {
          var b = W(a);
          if (null === b.Tb)
            throw new O(8);
          b.mc && (b.mc = null);
          try {
            b.Jb.close && b.Jb.close(b);
          } catch (c) {
            throw c;
          } finally {
            Q[b.Tb] = null;
          }
          b.Tb = null;
          return 0;
        } catch (c) {
          if ("undefined" == typeof U || "ErrnoError" !== c.name)
            throw c;
          return c.Lb;
        }
      },
      m: function(a, b) {
        try {
          var c = W(a);
          A[b >> 0] = c.Pb ? 2 : 16384 === (c.mode & 61440) ? 3 : 40960 === (c.mode & 61440) ? 7 : 4;
          return 0;
        } catch (d) {
          if ("undefined" == typeof U || "ErrnoError" !== d.name)
            throw d;
          return d.Lb;
        }
      },
      t: function(a, b, c, d) {
        try {
          a: {
            var f = W(a);
            a = b;
            for (var g, h = b = 0; h < c; h++) {
              var p2 = C[a >> 2], k = C[a + 4 >> 2];
              a += 8;
              var l = f, m = p2, n = k, r = g, w = A;
              if (0 > n || 0 > r)
                throw new O(28);
              if (null === l.Tb)
                throw new O(8);
              if (1 === (l.flags & 2097155))
                throw new O(8);
              if (16384 === (l.node.mode & 61440))
                throw new O(31);
              if (!l.Jb.read)
                throw new O(28);
              var z = "undefined" != typeof r;
              if (!z)
                r = l.position;
              else if (!l.seekable)
                throw new O(70);
              var G = l.Jb.read(l, w, m, n, r);
              z || (l.position += G);
              var E = G;
              if (0 > E) {
                var J = -1;
                break a;
              }
              b += E;
              if (E < k)
                break;
              "undefined" !== typeof g && (g += E);
            }
            J = b;
          }
          C[d >> 2] = J;
          return 0;
        } catch (H) {
          if ("undefined" == typeof U || "ErrnoError" !== H.name)
            throw H;
          return H.Lb;
        }
      },
      i: function(a, b, c, d, f) {
        try {
          b = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
          if (isNaN(b))
            return 61;
          var g = W(a);
          Eb(g, b, d);
          K = [g.position >>> 0, (I = g.position, 1 <= +Math.abs(I) ? 0 < I ? (Math.min(+Math.floor(I / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
          B[f >> 2] = K[0];
          B[f + 4 >> 2] = K[1];
          g.mc && 0 === b && 0 === d && (g.mc = null);
          return 0;
        } catch (h) {
          if ("undefined" == typeof U || "ErrnoError" !== h.name)
            throw h;
          return h.Lb;
        }
      },
      D: function(a) {
        try {
          var b = W(a);
          return Vc(function(c) {
            var d = b.node.Rb;
            d.type.Oc ? d.type.Oc(d, false, function(f) {
              f ? c(function() {
                return 29;
              }) : c(0);
            }) : c(0);
          });
        } catch (c) {
          if ("undefined" == typeof U || "ErrnoError" !== c.name)
            throw c;
          return c.Lb;
        }
      },
      q: function(a, b, c, d) {
        try {
          a: {
            var f = W(a);
            a = b;
            for (var g, h = b = 0; h < c; h++) {
              var p2 = C[a >> 2], k = C[a + 4 >> 2];
              a += 8;
              var l = f, m = p2, n = k, r = g, w = A;
              if (0 > n || 0 > r)
                throw new O(28);
              if (null === l.Tb)
                throw new O(8);
              if (0 === (l.flags & 2097155))
                throw new O(8);
              if (16384 === (l.node.mode & 61440))
                throw new O(31);
              if (!l.Jb.write)
                throw new O(28);
              l.seekable && l.flags & 1024 && Eb(l, 0, 2);
              var z = "undefined" != typeof r;
              if (!z)
                r = l.position;
              else if (!l.seekable)
                throw new O(70);
              var G = l.Jb.write(l, w, m, n, r, void 0);
              z || (l.position += G);
              var E = G;
              if (0 > E) {
                var J = -1;
                break a;
              }
              b += E;
              "undefined" !== typeof g && (g += E);
            }
            J = b;
          }
          C[d >> 2] = J;
          return 0;
        } catch (H) {
          if ("undefined" == typeof U || "ErrnoError" !== H.name)
            throw H;
          return H.Lb;
        }
      },
      X: Wb,
      qa: Xb,
      fa: Yb,
      M: Zb,
      ka: $b,
      F: ac,
      h: bc,
      na: cc,
      ia: dc,
      da: ec,
      ea: fc,
      j: gc,
      u: hc,
      oa: ic,
      g: jc,
      pa: kc,
      ca: lc,
      ga: mc,
      ha: nc,
      ma: oc,
      c: pc,
      ja: qc,
      la: rc,
      aa: sc,
      V: tc,
      $: uc,
      ba: vc,
      S: wc,
      U: xc,
      Z: yc,
      Y: zc,
      R: Ac,
      Q: Bc,
      T: Cc,
      _: Dc,
      O: Ec,
      W: Fc,
      P: Gc
    };
    (function() {
      function a(c) {
        c = c.exports;
        c = Kc(c);
        e.asm = c;
        ma = e.asm.ra;
        wa();
        ya.unshift(e.asm.sa);
        D--;
        e.monitorRunDependencies && e.monitorRunDependencies(D);
        if (0 == D && Ea) {
          var d = Ea;
          Ea = null;
          d();
        }
        return c;
      }
      var b = { a: gd };
      D++;
      e.monitorRunDependencies && e.monitorRunDependencies(D);
      if (e.instantiateWasm)
        try {
          return e.instantiateWasm(b, a);
        } catch (c) {
          t("Module.instantiateWasm callback failed with error: " + c), ba(c);
        }
      Ka(b, function(c) {
        a(c.instance);
      }).catch(ba);
      return {};
    })();
    e._sqlite3_malloc = function() {
      return (e._sqlite3_malloc = e.asm.ta).apply(null, arguments);
    };
    e._sqlite3_free = function() {
      return (e._sqlite3_free = e.asm.ua).apply(null, arguments);
    };
    e._sqlite3_bind_blob = function() {
      return (e._sqlite3_bind_blob = e.asm.va).apply(null, arguments);
    };
    e._sqlite3_bind_int = function() {
      return (e._sqlite3_bind_int = e.asm.wa).apply(null, arguments);
    };
    e._sqlite3_bind_int64 = function() {
      return (e._sqlite3_bind_int64 = e.asm.xa).apply(null, arguments);
    };
    e._sqlite3_bind_text = function() {
      return (e._sqlite3_bind_text = e.asm.ya).apply(null, arguments);
    };
    e._sqlite3_close = function() {
      return (e._sqlite3_close = e.asm.za).apply(null, arguments);
    };
    e._sqlite3_column_type = function() {
      return (e._sqlite3_column_type = e.asm.Aa).apply(null, arguments);
    };
    e._sqlite3_column_count = function() {
      return (e._sqlite3_column_count = e.asm.Ba).apply(null, arguments);
    };
    e._sqlite3_column_text = function() {
      return (e._sqlite3_column_text = e.asm.Ca).apply(null, arguments);
    };
    e._sqlite3_column_blob = function() {
      return (e._sqlite3_column_blob = e.asm.Da).apply(null, arguments);
    };
    e._sqlite3_column_bytes = function() {
      return (e._sqlite3_column_bytes = e.asm.Ea).apply(null, arguments);
    };
    e._sqlite3_column_double = function() {
      return (e._sqlite3_column_double = e.asm.Fa).apply(null, arguments);
    };
    e._sqlite3_column_int = function() {
      return (e._sqlite3_column_int = e.asm.Ga).apply(null, arguments);
    };
    e._sqlite3_column_int64 = function() {
      return (e._sqlite3_column_int64 = e.asm.Ha).apply(null, arguments);
    };
    e._sqlite3_column_name = function() {
      return (e._sqlite3_column_name = e.asm.Ia).apply(null, arguments);
    };
    e._sqlite3_declare_vtab = function() {
      return (e._sqlite3_declare_vtab = e.asm.Ja).apply(null, arguments);
    };
    e._sqlite3_errmsg = function() {
      return (e._sqlite3_errmsg = e.asm.Ka).apply(null, arguments);
    };
    e._sqlite3_exec = function() {
      return (e._sqlite3_exec = e.asm.La).apply(null, arguments);
    };
    e._sqlite3_finalize = function() {
      return (e._sqlite3_finalize = e.asm.Ma).apply(null, arguments);
    };
    e._sqlite3_prepare_v2 = function() {
      return (e._sqlite3_prepare_v2 = e.asm.Na).apply(null, arguments);
    };
    e._sqlite3_result_int = function() {
      return (e._sqlite3_result_int = e.asm.Oa).apply(null, arguments);
    };
    e._sqlite3_result_blob = function() {
      return (e._sqlite3_result_blob = e.asm.Pa).apply(null, arguments);
    };
    e._sqlite3_result_int64 = function() {
      return (e._sqlite3_result_int64 = e.asm.Qa).apply(null, arguments);
    };
    e._sqlite3_result_double = function() {
      return (e._sqlite3_result_double = e.asm.Ra).apply(null, arguments);
    };
    e._sqlite3_result_null = function() {
      return (e._sqlite3_result_null = e.asm.Sa).apply(null, arguments);
    };
    e._sqlite3_result_error = function() {
      return (e._sqlite3_result_error = e.asm.Ta).apply(null, arguments);
    };
    e._sqlite3_result_text = function() {
      return (e._sqlite3_result_text = e.asm.Ua).apply(null, arguments);
    };
    e._sqlite3_sql = function() {
      return (e._sqlite3_sql = e.asm.Va).apply(null, arguments);
    };
    e._sqlite3_reset = function() {
      return (e._sqlite3_reset = e.asm.Wa).apply(null, arguments);
    };
    e._sqlite3_step = function() {
      return (e._sqlite3_step = e.asm.Xa).apply(null, arguments);
    };
    e._sqlite3_value_text = function() {
      return (e._sqlite3_value_text = e.asm.Ya).apply(null, arguments);
    };
    e._sqlite3_value_type = function() {
      return (e._sqlite3_value_type = e.asm.Za).apply(null, arguments);
    };
    e._sqlite3_value_bytes = function() {
      return (e._sqlite3_value_bytes = e.asm._a).apply(null, arguments);
    };
    e._sqlite3_value_blob = function() {
      return (e._sqlite3_value_blob = e.asm.$a).apply(null, arguments);
    };
    e._sqlite3_value_int = function() {
      return (e._sqlite3_value_int = e.asm.ab).apply(null, arguments);
    };
    e._sqlite3_value_int64 = function() {
      return (e._sqlite3_value_int64 = e.asm.bb).apply(null, arguments);
    };
    e._sqlite3_value_double = function() {
      return (e._sqlite3_value_double = e.asm.cb).apply(null, arguments);
    };
    e._RegisterExtensionFunctions = function() {
      return (e._RegisterExtensionFunctions = e.asm.db).apply(null, arguments);
    };
    var $c = e._free = function() {
      return ($c = e._free = e.asm.eb).apply(null, arguments);
    };
    function fd() {
      return (fd = e.asm.fb).apply(null, arguments);
    }
    e._create_function = function() {
      return (e._create_function = e.asm.gb).apply(null, arguments);
    };
    e._update_hook = function() {
      return (e._update_hook = e.asm.hb).apply(null, arguments);
    };
    e._create_module = function() {
      return (e._create_module = e.asm.ib).apply(null, arguments);
    };
    e._register_vfs = function() {
      return (e._register_vfs = e.asm.jb).apply(null, arguments);
    };
    e._sqlite3_vfs_find = function() {
      return (e._sqlite3_vfs_find = e.asm.kb).apply(null, arguments);
    };
    e._getSqliteFree = function() {
      return (e._getSqliteFree = e.asm.lb).apply(null, arguments);
    };
    var hd = e._main = function() {
      return (hd = e._main = e.asm.mb).apply(null, arguments);
    };
    e._sqlite3_bind_null = function() {
      return (e._sqlite3_bind_null = e.asm.nb).apply(null, arguments);
    };
    e._sqlite3_clear_bindings = function() {
      return (e._sqlite3_clear_bindings = e.asm.ob).apply(null, arguments);
    };
    e._sqlite3_data_count = function() {
      return (e._sqlite3_data_count = e.asm.pb).apply(null, arguments);
    };
    e._sqlite3_bind_double = function() {
      return (e._sqlite3_bind_double = e.asm.qb).apply(null, arguments);
    };
    e._sqlite3_bind_parameter_count = function() {
      return (e._sqlite3_bind_parameter_count = e.asm.rb).apply(null, arguments);
    };
    e._sqlite3_bind_parameter_name = function() {
      return (e._sqlite3_bind_parameter_name = e.asm.sb).apply(null, arguments);
    };
    e._sqlite3_libversion = function() {
      return (e._sqlite3_libversion = e.asm.tb).apply(null, arguments);
    };
    e._sqlite3_libversion_number = function() {
      return (e._sqlite3_libversion_number = e.asm.ub).apply(null, arguments);
    };
    e._sqlite3_changes = function() {
      return (e._sqlite3_changes = e.asm.vb).apply(null, arguments);
    };
    e._sqlite3_open_v2 = function() {
      return (e._sqlite3_open_v2 = e.asm.wb).apply(null, arguments);
    };
    e._sqlite3_get_autocommit = function() {
      return (e._sqlite3_get_autocommit = e.asm.xb).apply(null, arguments);
    };
    var Sb = e._malloc = function() {
      return (Sb = e._malloc = e.asm.yb).apply(null, arguments);
    };
    function bb() {
      return (bb = e.asm.zb).apply(null, arguments);
    }
    function jd() {
      return (jd = e.asm.Bb).apply(null, arguments);
    }
    function ed() {
      return (ed = e.asm.Cb).apply(null, arguments);
    }
    function cd() {
      return (cd = e.asm.Db).apply(null, arguments);
    }
    function dd() {
      return (dd = e.asm.Eb).apply(null, arguments);
    }
    function Yc() {
      return (Yc = e.asm.Fb).apply(null, arguments);
    }
    function Mc() {
      return (Mc = e.asm.Gb).apply(null, arguments);
    }
    function Wc() {
      return (Wc = e.asm.Hb).apply(null, arguments);
    }
    function Zc() {
      return (Zc = e.asm.Ib).apply(null, arguments);
    }
    e.UTF8ToString = x;
    e.stringToUTF8 = ra;
    e.lengthBytesUTF8 = sa;
    e.getTempRet0 = jd;
    e.ccall = Z;
    e.cwrap = function(a, b, c, d) {
      var f = !c || c.every((g) => "number" === g || "boolean" === g);
      return "string" !== b && f && !d ? e["_" + a] : function() {
        return Z(a, b, c, arguments, d);
      };
    };
    e.setValue = M;
    e.getValue = L;
    var kd;
    Ea = function ld() {
      kd || md();
      kd || (Ea = ld);
    };
    function md() {
      function a() {
        if (!kd && (kd = true, e.calledRun = true, !v)) {
          e.noFSInit || Gb || (Gb = true, Fb(), e.stdin = e.stdin, e.stdout = e.stdout, e.stderr = e.stderr, e.stdin ? Jb("stdin", e.stdin) : wb("/dev/tty", "/dev/stdin"), e.stdout ? Jb("stdout", null, e.stdout) : wb("/dev/tty", "/dev/stdout"), e.stderr ? Jb("stderr", null, e.stderr) : wb("/dev/tty1", "/dev/stderr"), Db("/dev/stdin", 0), Db("/dev/stdout", 1), Db("/dev/stderr", 1));
          fb = false;
          Ma(ya);
          Ma(za);
          aa(e);
          if (e.onRuntimeInitialized)
            e.onRuntimeInitialized();
          if (nd) {
            var b = hd;
            try {
              var c = b(0, 0);
              na = c;
              Hc(c);
            } catch (d) {
              Ic(d);
            }
          }
          if (e.postRun)
            for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length; )
              b = e.postRun.shift(), Aa.unshift(b);
          Ma(Aa);
        }
      }
      if (!(0 < D)) {
        if (e.preRun)
          for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length; )
            Ca();
        Ma(xa);
        0 < D || (e.setStatus ? (e.setStatus("Running..."), setTimeout(function() {
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
    var nd = true;
    e.noInitialRun && (nd = false);
    md();
    return Module2.ready;
  };
})();
const SQLiteAsyncESMFactory = Module;
const SQLITE_OK = 0;
const SQLITE_BUSY = 5;
const SQLITE_IOERR = 10;
const SQLITE_NOTFOUND = 12;
const SQLITE_CANTOPEN = 14;
const SQLITE_MISUSE = 21;
const SQLITE_RANGE = 25;
const SQLITE_NOTICE = 27;
const SQLITE_ROW = 100;
const SQLITE_DONE = 101;
const SQLITE_IOERR_LOCK = 3850;
const SQLITE_IOERR_SHORT_READ = 522;
const SQLITE_OPEN_READONLY = 1;
const SQLITE_OPEN_READWRITE = 2;
const SQLITE_OPEN_CREATE = 4;
const SQLITE_OPEN_DELETEONCLOSE = 8;
const SQLITE_OPEN_URI = 64;
const SQLITE_LOCK_NONE = 0;
const SQLITE_LOCK_SHARED = 1;
const SQLITE_LOCK_RESERVED = 2;
const SQLITE_LOCK_PENDING = 3;
const SQLITE_LOCK_EXCLUSIVE = 4;
const SQLITE_IOCAP_SAFE_APPEND = 512;
const SQLITE_IOCAP_SEQUENTIAL = 1024;
const SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN = 2048;
const SQLITE_IOCAP_BATCH_ATOMIC = 16384;
const SQLITE_INTEGER = 1;
const SQLITE_FLOAT = 2;
const SQLITE_TEXT = 3;
const SQLITE_BLOB = 4;
const SQLITE_NULL = 5;
const SQLITE_UTF8 = 1;
const MAX_INT64 = 0x7fffffffffffffffn;
const MIN_INT64 = -0x8000000000000000n;
class SQLiteError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
const async = true;
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
          throw new Error("Unknown binding type " + typeof value);
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
      const dst = new ArrayBuffer(result.byteLength);
      const ret = new Uint8Array(dst);
      ret.set(result);
      return ret;
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
  sqlite3.update_hook = function(db, xUpdate) {
    verifyDatabase(db);
    Module2.updateHook(db, xUpdate);
    return SQLITE_OK;
  };
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
      verifyStatement(stmt);
      const result = await f(stmt);
      const db = mapStmtToDB.get(stmt);
      mapStmtToDB.delete(stmt);
      return check(fname, result, db);
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
  sqlite3.open_v2 = function() {
    const fname = "sqlite3_open_v2";
    const f = Module2.cwrap(fname, ...decl("snnn:n"), { async });
    return async function(zFilename, flags, zVfs) {
      flags = flags || SQLITE_OPEN_CREATE | SQLITE_OPEN_READWRITE;
      zVfs = createUTF8(zVfs);
      const result = await f(zFilename, tmpPtr[0], flags, zVfs);
      const db = Module2.getValue(tmpPtr[0], "i32");
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
      const stmt = Module2.getValue(tmpPtr[0], "i32");
      if (stmt) {
        mapStmtToDB.set(stmt, db);
        return { stmt, sql: Module2.getValue(tmpPtr[1], "i32") };
      }
      return null;
    };
  }();
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
      row.push((value == null ? void 0 : value.buffer) === Module2.HEAPU8.buffer ? value.slice() : value);
    }
    return row;
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
        if (prepared == null ? void 0 : prepared.stmt) {
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
  const m = s.match(/([ns@]*):([ns@])/);
  switch (m[2]) {
    case "n":
      result.push("number");
      break;
    case "s":
      result.push("string");
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
class Base {
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
}
const LOCK_TYPE_MASK = SQLITE_LOCK_NONE | SQLITE_LOCK_SHARED | SQLITE_LOCK_RESERVED | SQLITE_LOCK_PENDING | SQLITE_LOCK_EXCLUSIVE;
class WebLocksBase {
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
    var _a2;
    (_a2 = __privateGet(this, _releasers).get(lockName)) == null ? void 0 : _a2();
    __privateGet(this, _releasers).delete(lockName);
  }
  /**
   * @param {string} lockName 
   */
  async _pollWebLock(lockName) {
    var _a2;
    const query = await navigator.locks.query();
    return (_a2 = query.held.find(({ name }) => name === lockName)) == null ? void 0 : _a2.mode;
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
}
_state = new WeakMap();
_releasers = new WeakMap();
_pending = new WeakMap();
_apply = new WeakSet();
apply_fn = async function(method, flags) {
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
};
_lock = new WeakSet();
lock_fn = async function(targetState) {
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
};
_unlock = new WeakSet();
unlock_fn = async function(targetState) {
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
};
class WebLocksExclusive extends WebLocksBase {
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
}
const RETRYABLE_EXCEPTIONS = /* @__PURE__ */ new Set(["TransactionInactiveError", "InvalidStateError"]);
let nextTxId = 0;
const mapTxToId = /* @__PURE__ */ new WeakMap();
function log$2(...args) {
}
class IDBContext {
  /**
   * @param {IDBDatabase|Promise<IDBDatabase>} idbDatabase
   */
  constructor(idbDatabase, txOptions = { durability: "default" }) {
    /**
     * @param {IDBTransactionMode} mode
     * @param {(stores: Object.<string, Store>) => any} f 
     * @returns 
     */
    __privateAdd(this, _run2);
    /**
     * @param {IDBRequest} request 
     */
    __privateAdd(this, _setRequest);
    /** @type {Promise<IDBDatabase>} */
    __privateAdd(this, _dbReady, void 0);
    __privateAdd(this, _txOptions, void 0);
    /** @type {IDBTransaction} */
    __privateAdd(this, _tx, null);
    /** @type {Promise<void>} */
    __privateAdd(this, _txComplete, null);
    /** @type {IDBRequest} */
    __privateAdd(this, _request, null);
    __privateAdd(this, _chain, Promise.resolve());
    __privateSet(this, _dbReady, Promise.resolve(idbDatabase));
    __privateSet(this, _txOptions, txOptions);
  }
  async close() {
    const db = await __privateGet(this, _dbReady);
    db.close();
  }
  /**
   * Run a function with the provided object stores. The function
   * should be idempotent in case it is passed an expired transaction.
   * @param {IDBTransactionMode} mode
   * @param {(stores: Object.<string, Store>) => any} f 
   */
  async run(mode, f) {
    return __privateSet(this, _chain, __privateGet(this, _chain).then(() => {
      return __privateMethod(this, _run2, run_fn2).call(this, mode, f);
    }));
  }
  async sync() {
    await new Promise((resolve) => this.run("readwrite", resolve));
    return __privateGet(this, _txComplete);
  }
}
_dbReady = new WeakMap();
_txOptions = new WeakMap();
_tx = new WeakMap();
_txComplete = new WeakMap();
_request = new WeakMap();
_chain = new WeakMap();
_run2 = new WeakSet();
run_fn2 = async function(mode, f) {
  var _a2, _b2;
  const db = await __privateGet(this, _dbReady);
  const storeNames = Array.from(db.objectStoreNames);
  if (mode !== "readonly" && ((_a2 = __privateGet(this, _tx)) == null ? void 0 : _a2.mode) === "readonly") {
    __privateSet(this, _tx, null);
  } else if (((_b2 = __privateGet(this, _request)) == null ? void 0 : _b2.readyState) === "pending") {
    await new Promise((done) => {
      __privateGet(this, _request).addEventListener("success", done);
      __privateGet(this, _request).addEventListener("error", done);
    });
  }
  for (let i = 0; i < 2; ++i) {
    if (!__privateGet(this, _tx)) {
      __privateSet(this, _tx, db.transaction(storeNames, mode, __privateGet(this, _txOptions)));
      __privateSet(this, _txComplete, new Promise((resolve) => {
        __privateGet(this, _tx).addEventListener("complete", (event) => {
          if (__privateGet(this, _tx) === event.target) {
            __privateSet(this, _tx, null);
          }
          resolve();
          log$2(`transaction ${mapTxToId.get(event.target)} complete`);
        });
      }));
      mapTxToId.set(__privateGet(this, _tx), nextTxId++);
    }
    try {
      const stores = Object.fromEntries(storeNames.map((name) => {
        const objectStore = __privateGet(this, _tx).objectStore(name);
        const store = new Store(objectStore, (request) => __privateMethod(this, _setRequest, setRequest_fn).call(this, request));
        return [name, store];
      }));
      return await f(stores);
    } catch (e) {
      if (i || !RETRYABLE_EXCEPTIONS.has(e.name)) {
        try {
          __privateGet(this, _tx).abort();
        } catch (ignored) {
        }
        throw e;
      }
      __privateSet(this, _tx, null);
    }
  }
};
_setRequest = new WeakSet();
setRequest_fn = function(request) {
  __privateSet(this, _request, request);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
class Store {
  /**
   * @param {IDBObjectStore} store 
   * @param {(request: IDBRequest) => Promise} addRequest
   */
  constructor(store, addRequest) {
    this.store = store;
    this.addRequest = addRequest;
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @returns {Promise}
   */
  get(query) {
    log$2(`get ${this.store.name}`, query);
    const request = this.store.get(query);
    return this.addRequest(request);
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @param {number} [count]
   * @returns {Promise}
   */
  getAll(query, count) {
    log$2(`getAll ${this.store.name}`, query, count);
    const request = this.store.getAll(query, count);
    return this.addRequest(request);
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @returns {Promise<IDBValidKey>}
   */
  getKey(query) {
    log$2(`getKey ${this.store.name}`, query);
    const request = this.store.getKey(query);
    return this.addRequest(request);
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @param {number} [count]
   * @returns {Promise}
   */
  getAllKeys(query, count) {
    log$2(`getAllKeys ${this.store.name}`, query, count);
    const request = this.store.getAllKeys(query, count);
    return this.addRequest(request);
  }
  /**
   * @param {any} value
   * @param {IDBValidKey} [key] 
   * @returns {Promise}
   */
  put(value, key) {
    log$2(`put ${this.store.name}`, value, key);
    const request = this.store.put(value, key);
    return this.addRequest(request);
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @returns {Promise}
   */
  delete(query) {
    log$2(`delete ${this.store.name}`, query);
    const request = this.store.delete(query);
    return this.addRequest(request);
  }
  clear() {
    log$2(`clear ${this.store.name}`);
    const request = this.store.clear();
    return this.addRequest(request);
  }
  index(name) {
    return new Index(this.store.index(name), (request) => this.addRequest(request));
  }
}
class Index {
  /**
   * @param {IDBIndex} index 
   * @param {(request: IDBRequest) => Promise} addRequest
   */
  constructor(index, addRequest) {
    this.index = index;
    this.addRequest = addRequest;
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @param {number} [count]
   * @returns {Promise<IDBValidKey[]>}
   */
  getAllKeys(query, count) {
    log$2(`IDBIndex.getAllKeys ${this.index.objectStore.name}<${this.index.name}>`, query, count);
    const request = this.index.getAllKeys(query, count);
    return this.addRequest(request);
  }
}
const SECTOR_SIZE = 512;
const DEFAULT_OPTIONS = {
  durability: "default",
  purge: "deferred",
  purgeAtLeast: 16
};
function log$1(...args) {
}
class IDBBatchAtomicVFS extends Base {
  constructor(idbDatabaseName = "wa-sqlite", options = DEFAULT_OPTIONS) {
    super();
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
    this.name = idbDatabaseName;
    __privateSet(this, _options, Object.assign({}, DEFAULT_OPTIONS, options));
    __privateSet(this, _idb, new IDBContext(openDatabase(idbDatabaseName), {
      durability: __privateGet(this, _options).durability
    }));
  }
  async close() {
    var _a2;
    for (const fileId of __privateGet(this, _mapIdToFile).keys()) {
      await this.xClose(fileId);
    }
    (_a2 = __privateGet(this, _idb)) == null ? void 0 : _a2.close();
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
      log$1(`xOpen ${name} 0x${fileId.toString(16)} 0x${flags.toString(16)}`);
      try {
        const url = new URL(name, "http://localhost/");
        const file = {
          path: url.pathname,
          flags,
          block0: null,
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
          log$1(`xClose ${file.path}`);
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
      log$1(`xRead ${file.path} ${pData.byteLength} ${iOffset}`);
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
    const file = __privateGet(this, _mapIdToFile).get(fileId);
    log$1(`xWrite ${file.path} ${pData.byteLength} ${iOffset}`);
    try {
      const prevFileSize = file.block0.fileSize;
      file.block0.fileSize = Math.max(file.block0.fileSize, iOffset + pData.byteLength);
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
      return SQLITE_OK;
    } catch (e) {
      console.error(e);
      return SQLITE_IOERR;
    }
  }
  /**
   * @param {number} fileId 
   * @param {number} iSize 
   * @returns {number}
   */
  xTruncate(fileId, iSize) {
    const file = __privateGet(this, _mapIdToFile).get(fileId);
    log$1(`xTruncate ${file.path} ${iSize}`);
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
   * @param {*} flags 
   * @returns {number}
   */
  xSync(fileId, flags) {
    const file = __privateGet(this, _mapIdToFile).get(fileId);
    log$1(`xSync ${file.path} ${flags}`);
    try {
      if (__privateGet(this, _options).durability !== "relaxed") {
        return this.handleAsync(async () => {
          await __privateGet(this, _idb).sync();
          return SQLITE_OK;
        });
      }
      return SQLITE_OK;
    } catch (e) {
      console.error(e);
      return SQLITE_IOERR;
    }
  }
  /**
   * @param {number} fileId 
   * @param {DataView} pSize64 
   * @returns {number}
   */
  xFileSize(fileId, pSize64) {
    const file = __privateGet(this, _mapIdToFile).get(fileId);
    log$1(`xFileSize ${file.path}`);
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
      log$1(`xLock ${file.path} ${flags}`);
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
      log$1(`xUnlock ${file.path} ${flags}`);
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
      log$1(`xCheckReservedLock ${file.path}`);
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
    log$1(`xFileControl ${file.path} ${op}`);
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
        log$1(`xAccess ${path} ${flags}`);
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
      log$1(`purge ${path} ${(purgeBlock == null ? void 0 : purgeBlock.data.size) ?? 0} pages in ${Date.now() - start} ms`);
    });
  }
}
_options = new WeakMap();
_mapIdToFile = new WeakMap();
_idb = new WeakMap();
_pendingPurges = new WeakMap();
_maybePurge = new WeakSet();
maybePurge_fn = function(path, nPages) {
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
};
_bound = new WeakSet();
bound_fn = function(file, begin, end = 0) {
  const version2 = !begin || -begin < file.block0.data.length ? -Infinity : file.block0.version;
  return IDBKeyRange.bound(
    [file.path, begin, version2],
    [file.path, end, Infinity]
  );
};
_reblockIfNeeded = new WeakSet();
reblockIfNeeded_fn = async function(file) {
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
};
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
const E_CANCELED = new Error("request for lock canceled");
var __awaiter$2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class Semaphore {
  constructor(_value, _cancelError = E_CANCELED) {
    this._value = _value;
    this._cancelError = _cancelError;
    this._weightedQueues = [];
    this._weightedWaiters = [];
  }
  acquire(weight = 1) {
    if (weight <= 0)
      throw new Error(`invalid weight ${weight}: must be positive`);
    return new Promise((resolve, reject) => {
      if (!this._weightedQueues[weight - 1])
        this._weightedQueues[weight - 1] = [];
      this._weightedQueues[weight - 1].push({ resolve, reject });
      this._dispatch();
    });
  }
  runExclusive(callback, weight = 1) {
    return __awaiter$2(this, void 0, void 0, function* () {
      const [value, release] = yield this.acquire(weight);
      try {
        return yield callback(value);
      } finally {
        release();
      }
    });
  }
  waitForUnlock(weight = 1) {
    if (weight <= 0)
      throw new Error(`invalid weight ${weight}: must be positive`);
    return new Promise((resolve) => {
      if (!this._weightedWaiters[weight - 1])
        this._weightedWaiters[weight - 1] = [];
      this._weightedWaiters[weight - 1].push(resolve);
      this._dispatch();
    });
  }
  isLocked() {
    return this._value <= 0;
  }
  getValue() {
    return this._value;
  }
  setValue(value) {
    this._value = value;
    this._dispatch();
  }
  release(weight = 1) {
    if (weight <= 0)
      throw new Error(`invalid weight ${weight}: must be positive`);
    this._value += weight;
    this._dispatch();
  }
  cancel() {
    this._weightedQueues.forEach((queue2) => queue2.forEach((entry) => entry.reject(this._cancelError)));
    this._weightedQueues = [];
  }
  _dispatch() {
    var _a2;
    for (let weight = this._value; weight > 0; weight--) {
      const queueEntry = (_a2 = this._weightedQueues[weight - 1]) === null || _a2 === void 0 ? void 0 : _a2.shift();
      if (!queueEntry)
        continue;
      const previousValue = this._value;
      const previousWeight = weight;
      this._value -= weight;
      weight = this._value + 1;
      queueEntry.resolve([previousValue, this._newReleaser(previousWeight)]);
    }
    this._drainUnlockWaiters();
  }
  _newReleaser(weight) {
    let called = false;
    return () => {
      if (called)
        return;
      called = true;
      this.release(weight);
    };
  }
  _drainUnlockWaiters() {
    for (let weight = this._value; weight > 0; weight--) {
      if (!this._weightedWaiters[weight - 1])
        continue;
      this._weightedWaiters[weight - 1].forEach((waiter) => waiter());
      this._weightedWaiters[weight - 1] = [];
    }
  }
}
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class Mutex {
  constructor(cancelError) {
    this._semaphore = new Semaphore(1, cancelError);
  }
  acquire() {
    return __awaiter$1(this, void 0, void 0, function* () {
      const [, releaser] = yield this._semaphore.acquire();
      return releaser;
    });
  }
  runExclusive(callback) {
    return this._semaphore.runExclusive(() => callback());
  }
  isLocked() {
    return this._semaphore.isLocked();
  }
  waitForUnlock() {
    return this._semaphore.waitForUnlock();
  }
  release() {
    if (this._semaphore.isLocked())
      this._semaphore.release();
  }
  cancel() {
    return this._semaphore.cancel();
  }
}
const isDebug = globalThis.__vlcn_wa_crsqlite_dbg;
function log(...data) {
  if (isDebug) {
    console.log("crsqlite-wasm: ", ...data);
  }
}
const re = /insert\s|update\s|delete\s/;
const txRe = /begin\s|commit\s|rollback\s|savepoint\s/;
function computeCacheKey(sql2, mode, bind) {
  const lower = sql2.toLowerCase();
  if (txRe.exec(lower) != null) {
    return void 0;
  }
  if (re.exec(lower) != null) {
    log("received write");
    return null;
  }
  if (bind != null) {
    const ret = lower + "|" + mode + "|" + bind.map((b) => b != null ? b.toString() : "null").join("|");
    return ret;
  }
  return lower;
}
class Stmt {
  constructor(originDB, stmtFinalizer, cache, api2, base, str, sql2) {
    __publicField(this, "originDB");
    __publicField(this, "cache");
    __publicField(this, "api");
    __publicField(this, "base");
    __publicField(this, "str");
    __publicField(this, "sql");
    // TOOD: use mode in get/all!
    __publicField(this, "mode", "o");
    __publicField(this, "finalized", false);
    __publicField(this, "bindings", []);
    this.originDB = originDB;
    this.cache = cache;
    this.api = api2;
    this.base = base;
    this.str = str;
    this.sql = sql2;
    stmtFinalizer.set(base, new WeakRef(this));
  }
  run(tx, ...bindArgs) {
    return serialize(this.cache, computeCacheKey(this.sql, this.mode, bindArgs.length > 0 ? bindArgs : this.bindings), () => {
      bindArgs.length > 0 && this.bind(bindArgs);
      return this.api.step(this.base).then(() => this.api.reset(this.base));
    }, (tx == null ? void 0 : tx.__mutex) || this.originDB.__mutex);
  }
  get(tx, ...bindArgs) {
    return serialize(this.cache, computeCacheKey(this.sql, this.mode, bindArgs.length > 0 ? bindArgs : this.bindings), async () => {
      bindArgs.length > 0 && this.bind(bindArgs);
      let ret = null;
      let columnNames = this.mode === "o" ? this.api.column_names(this.base) : null;
      if (await this.api.step(this.base) == SQLITE_ROW) {
        const row = this.api.row(this.base);
        if (columnNames != null) {
          const o = {};
          for (let i = 0; i < columnNames.length; ++i) {
            o[columnNames[i]] = row[i];
          }
          ret = o;
        } else {
          ret = row;
        }
      }
      await this.api.reset(this.base);
      return ret;
    }, (tx == null ? void 0 : tx.__mutex) || this.originDB.__mutex);
  }
  all(tx, ...bindArgs) {
    return serialize(this.cache, computeCacheKey(this.sql, this.mode, bindArgs.length > 0 ? bindArgs : this.bindings), async () => {
      bindArgs.length > 0 && this.bind(bindArgs);
      const ret = [];
      let columnNames = this.mode === "o" ? this.api.column_names(this.base) : null;
      while (await this.api.step(this.base) == SQLITE_ROW) {
        if (columnNames != null) {
          const row = {};
          for (let i = 0; i < columnNames.length; ++i) {
            row[columnNames[i]] = this.api.column(this.base, i);
          }
          ret.push(row);
        } else {
          ret.push(this.api.row(this.base));
          continue;
        }
      }
      await this.api.reset(this.base);
      return ret;
    }, (tx == null ? void 0 : tx.__mutex) || this.originDB.__mutex);
  }
  async *iterate(tx, ...bindArgs) {
    this.bind(bindArgs);
    while (await serialize(this.cache, void 0, () => this.api.step(this.base), (tx == null ? void 0 : tx.__mutex) || this.originDB.__mutex) == SQLITE_ROW) {
      yield this.api.row(this.base);
    }
    await serialize(this.cache, void 0, () => this.api.reset(this.base), (tx == null ? void 0 : tx.__mutex) || this.originDB.__mutex);
  }
  raw(isRaw) {
    if (isRaw) {
      this.mode = "a";
    } else {
      this.mode = "o";
    }
    return this;
  }
  bind(args) {
    this.bindings = args;
    for (let i = 0; i < args.length; ++i) {
      this.api.bind(this.base, i + 1, args[i]);
    }
    return this;
  }
  /**
   * Release the resources associated with the prepared statement.
   * If you fail to call this it will automatically be called when the statement is garbage collected.
   */
  finalize(tx) {
    return serialize(this.cache, void 0, () => {
      if (this.finalized)
        return;
      this.finalized = true;
      this.api.str_finish(this.str);
      return this.api.finalize(this.base);
    }, (tx == null ? void 0 : tx.__mutex) || this.originDB.__mutex);
  }
}
class TX {
  constructor(api2, db, __mutex, assertOpen, stmtFinalizer) {
    __publicField(this, "api");
    __publicField(this, "db");
    __publicField(this, "__mutex");
    __publicField(this, "assertOpen");
    __publicField(this, "stmtFinalizer");
    __publicField(this, "cache", /* @__PURE__ */ new Map());
    this.api = api2;
    this.db = db;
    this.__mutex = __mutex;
    this.assertOpen = assertOpen;
    this.stmtFinalizer = stmtFinalizer;
  }
  execMany(sql2) {
    this.assertOpen();
    return serialize(this.cache, null, () => this.api.exec(this.db, sql2.join("")), this.__mutex);
  }
  exec(sql2, bind) {
    this.assertOpen();
    return serialize(this.cache, computeCacheKey(sql2, "a", bind), () => {
      return this.statements(sql2, false, bind);
    }, this.__mutex);
  }
  execO(sql2, bind) {
    this.assertOpen();
    return serialize(this.cache, computeCacheKey(sql2, "o", bind), () => this.statements(sql2, true, bind), this.__mutex);
  }
  execA(sql2, bind) {
    this.assertOpen();
    return serialize(this.cache, computeCacheKey(sql2, "a", bind), () => this.statements(sql2, false, bind), this.__mutex);
  }
  prepare(sql2) {
    this.assertOpen();
    return serialize(this.cache, void 0, async () => {
      const str = this.api.str_new(this.db, sql2);
      const prepared = await this.api.prepare_v2(this.db, this.api.str_value(str));
      if (prepared == null) {
        this.api.str_finish(str);
        throw new Error(`Could not prepare ${sql2}`);
      }
      return new Stmt(
        this,
        this.stmtFinalizer,
        // this.stmtFinalizationRegistry,
        this.cache,
        this.api,
        prepared.stmt,
        str,
        sql2
      );
    }, this.__mutex);
  }
  tx(cb) {
    this.assertOpen();
    return serializeTx(async (tx) => {
      await tx.exec("SAVEPOINT crsql_transaction");
      try {
        await cb(tx);
      } catch (e) {
        await tx.exec("ROLLBACK");
        return;
      }
      await tx.exec("RELEASE crsql_transaction");
    }, this.__mutex, this);
  }
  imperativeTx() {
    return this.__mutex.acquire().then((release) => {
      const subMutex = new Mutex();
      return [
        release,
        new TX(this.api, this.db, subMutex, this.assertOpen, this.stmtFinalizer)
      ];
    });
  }
  async statements(sql2, retObjects, bind) {
    const results = [];
    try {
      for await (const stmt of this.api.statements(this.db, sql2)) {
        const rows = [];
        const columns = this.api.column_names(stmt);
        if (bind) {
          this.bind(stmt, bind);
        }
        while (await this.api.step(stmt) === SQLITE_ROW) {
          const row = this.api.row(stmt);
          rows.push(row);
        }
        if (columns.length) {
          results.push({ columns, rows });
        }
      }
    } catch (error) {
      console.error(`Failed running ${sql2}`, error);
      throw error;
    }
    const returning = results[0];
    if (returning == null)
      return null;
    if (!retObjects) {
      return returning.rows;
    }
    const objects = [];
    for (const row of returning.rows) {
      const o = {};
      for (let i = 0; i < returning.columns.length; ++i) {
        o[returning.columns[i]] = row[i];
      }
      objects.push(o);
    }
    return objects;
  }
  bind(stmt, values) {
    for (let i = 0; i < values.length; ++i) {
      const v = values[i];
      this.api.bind(stmt, i + 1, typeof v === "boolean" ? v && 1 || 0 : v);
    }
  }
}
const topLevelMutex = new Mutex();
topLevelMutex.name = "topLevelMutex";
function serialize(cache, key, cb, mutex) {
  if (key === null) {
    log("Cache clear");
    cache == null ? void 0 : cache.clear();
  } else if (key !== void 0) {
    const existing = cache == null ? void 0 : cache.get(key);
    if (existing) {
      log("Cache hit", key);
      return existing;
    }
  }
  log("Enqueueing query ", key);
  const res = mutex.runExclusive(cb);
  if (key) {
    cache == null ? void 0 : cache.set(key, res);
    res.finally(() => cache == null ? void 0 : cache.delete(key));
  }
  return res;
}
function serializeTx(cb, mutex, db) {
  return mutex.runExclusive(() => {
    const subMutex = new Mutex();
    const tx = new TX(db.api, db.db, subMutex, db.assertOpen, db.stmtFinalizer);
    return cb(tx);
  });
}
function cryb64(str, seed = 0) {
  let h1 = 3735928559 ^ seed, h2 = 1103547991 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
  h1 ^= Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
  h2 ^= Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return 4294967296n * BigInt(h2) + BigInt(h1);
}
function firstPick(data) {
  const d = data[0];
  if (d == null) {
    return void 0;
  }
  return d[Object.keys(d)[0]];
}
class DB {
  constructor(api2, db, filename) {
    __publicField(this, "api");
    __publicField(this, "db");
    __publicField(this, "filename");
    __publicField(this, "__mutex", topLevelMutex);
    __publicField(this, "stmtFinalizer", /* @__PURE__ */ new Map());
    // private stmtFinalizationRegistry = new FinalizationRegistry(
    //   (base: number) => {
    //     const ref = this.stmtFinalizer.get(base);
    //     const stmt = ref?.deref();
    //     if (stmt) {
    //       console.log("finalized ", base);
    //       stmt.finalize();
    //     }
    //     this.stmtFinalizer.delete(base);
    //   }
    // );
    __privateAdd(this, _siteid, null);
    __publicField(this, "cache", /* @__PURE__ */ new Map());
    __privateAdd(this, _updateHooks, null);
    __privateAdd(this, _closed, false);
    __privateAdd(this, _tx2, void 0);
    __privateAdd(this, _assertOpen, () => {
      if (__privateGet(this, _closed)) {
        throw new Error("The DB is closed");
      }
    });
    __privateAdd(this, _onUpdate, (type, dbName, tblName, rowid) => {
      if (__privateGet(this, _updateHooks) == null) {
        return;
      }
      __privateGet(this, _updateHooks).forEach((h) => {
        try {
          h(type, dbName, tblName, rowid);
        } catch (e) {
          console.error("Failed notifying a DB update listener");
          console.error(e);
        }
      });
    });
    this.api = api2;
    this.db = db;
    this.filename = filename;
    __privateSet(this, _tx2, new TX(api2, db, topLevelMutex, __privateGet(this, _assertOpen), this.stmtFinalizer));
  }
  get siteid() {
    return __privateGet(this, _siteid);
  }
  _setSiteid(siteid) {
    if (__privateGet(this, _siteid)) {
      throw new Error("Site id already set");
    }
    __privateSet(this, _siteid, siteid);
  }
  async automigrateTo(schemaName, schemaContent) {
    const version2 = cryb64(schemaContent);
    const storedName = firstPick(await this.execA(`SELECT value FROM crsql_master WHERE key = 'schema_name'`));
    const storedVersion = firstPick(await this.execA(`SELECT value FROM crsql_master WHERE key = 'schema_version'`));
    if (storedName === schemaName && BigInt(storedVersion || 0) === version2) {
      return "noop";
    }
    const ret = storedName === void 0 || storedName !== schemaName ? "apply" : "migrate";
    await this.tx(async (tx) => {
      if (storedVersion == null || storedName !== schemaName) {
        if (storedName !== schemaName) {
          const tables = await tx.execA(`SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE '%crsql_%'`);
          for (const table of tables) {
            await tx.exec(`DROP TABLE [${table[0]}]`);
          }
        }
        await tx.exec(schemaContent);
      } else {
        await tx.exec(`SELECT crsql_automigrate(?, 'SELECT crsql_finalize();')`, [schemaContent]);
      }
      await tx.exec(`INSERT OR REPLACE INTO crsql_master (key, value) VALUES (?, ?)`, ["schema_version", version2]);
      await tx.exec(`INSERT OR REPLACE INTO crsql_master (key, value) VALUES (?, ?)`, ["schema_name", schemaName]);
    });
    await this.exec(`VACUUM;`);
    return ret;
  }
  execMany(sql2) {
    return __privateGet(this, _tx2).execMany(sql2);
  }
  exec(sql2, bind) {
    return __privateGet(this, _tx2).exec(sql2, bind);
  }
  /**
   * @returns returns an object for each row, e.g. `{ col1: valA, col2: valB, ... }`
   */
  execO(sql2, bind) {
    return __privateGet(this, _tx2).execO(sql2, bind);
  }
  // TODO: execOCached() -- which takes a table list
  /**
   * @returns returns an array for each row, e.g. `[ valA, valB, ... ]`
   */
  execA(sql2, bind) {
    return __privateGet(this, _tx2).execA(sql2, bind);
  }
  prepare(sql2) {
    return __privateGet(this, _tx2).prepare(sql2);
  }
  tx(cb) {
    return __privateGet(this, _tx2).tx(cb);
  }
  imperativeTx() {
    return __privateGet(this, _tx2).imperativeTx();
  }
  /**
   * Close the database and finalize any prepared statements that were not freed for the given DB.
   */
  async close() {
    for (const ref2 of this.stmtFinalizer.values()) {
      const stmt = ref2.deref();
      if (stmt) {
        await stmt.finalize(this);
      }
    }
    return this.exec("SELECT crsql_finalize()").then(() => {
      __privateSet(this, _closed, true);
      return serialize(this.cache, void 0, () => this.api.close(this.db), this.__mutex);
    });
  }
  createFunction(name, fn, opts) {
    __privateGet(this, _assertOpen).call(this);
    this.api.create_function(this.db, name, fn.length, SQLITE_UTF8, 0, (context, values) => {
      const args = [];
      for (let i = 0; i < fn.length; ++i) {
        args.push(this.api.value(values[i]));
      }
      const r = fn(...args);
      if (r !== void 0) {
        this.api.result(context, r);
      }
    });
  }
  onUpdate(cb) {
    if (__privateGet(this, _updateHooks) == null) {
      this.api.update_hook(this.db, __privateGet(this, _onUpdate));
      __privateSet(this, _updateHooks, /* @__PURE__ */ new Set());
    }
    __privateGet(this, _updateHooks).add(cb);
    return () => {
      var _a2;
      return (_a2 = __privateGet(this, _updateHooks)) == null ? void 0 : _a2.delete(cb);
    };
  }
}
_siteid = new WeakMap();
_updateHooks = new WeakMap();
_closed = new WeakMap();
_tx2 = new WeakMap();
_assertOpen = new WeakMap();
_onUpdate = new WeakMap();
let api = null;
class SQLite3 {
  constructor(base) {
    __publicField(this, "base");
    this.base = base;
  }
  open(filename, mode = "c") {
    return serialize(null, void 0, () => {
      return this.base.open_v2(filename || ":memory:", SQLITE_OPEN_CREATE | SQLITE_OPEN_READWRITE | SQLITE_OPEN_URI, filename != null ? "idb-batch-atomic" : void 0);
    }, topLevelMutex).then((db) => {
      const ret = new DB(this.base, db, filename || ":memory:");
      return ret.execA("select quote(crsql_siteid());").then((siteid) => {
        ret._setSiteid(siteid[0][0].replace(/'|X/g, ""));
        return ret;
      });
    });
  }
}
async function initWasm(locateWasm) {
  if (api != null) {
    return api;
  }
  const wasmModule = await SQLiteAsyncESMFactory({
    locateFile(file) {
      if (locateWasm) {
        return locateWasm(file);
      }
      return new URL("" + new URL("crsqlite-81f51098.wasm", import.meta.url).href, self.location).href;
    }
  });
  const sqlite3 = Factory(wasmModule);
  sqlite3.vfs_register(new IDBBatchAtomicVFS("idb-batch-atomic", { durability: "relaxed" }));
  api = new SQLite3(sqlite3);
  return api;
}
const wasmUrl = "" + new URL("crsqlite-81f51098.wasm", import.meta.url).href;
const dialect = new CrSqliteDialect({
  database: async () => {
    const sqlite = await initWasm(() => wasmUrl);
    const db = await sqlite.open("crsqlite.db");
    return db;
  }
});
async function testCRSqlite() {
  testDB(dialect).then((data) => {
    data == null ? void 0 : data.forEach((e) => console.log("[crsqlite]", e));
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
    const sqljsWorker = new WorkerWrapper$2();
    const { result, run } = useDB();
    const officialWorker = new WorkerWrapper$1();
    const waSqliteWorker = new WorkerWrapper();
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
      waSqliteWorker.postMessage("");
    }
    async function clear2() {
      console.clear();
      const root = await navigator.storage.getDirectory();
      await deleteFile("sqljs");
      await deleteFile("sqlijsWorker");
      indexedDB.deleteDatabase("idb-batch-atomic");
      try {
        await root.removeEntry("test.db");
      } catch {
      }
      try {
        await root.removeEntry("test.db-journal");
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
            onClick: _cache[1] || (_cache[1] = ($event) => unref(testCRSqlite)())
          }, " test crsqlite in main thread "),
          createBaseVNode("button", {
            onClick: _cache[2] || (_cache[2] = ($event) => testSqljsWorker())
          }, " test sqljs in Worker "),
          createBaseVNode("button", {
            onClick: _cache[3] || (_cache[3] = ($event) => testOfficialWasm())
          }, " test officialWasm in Worker "),
          createBaseVNode("button", {
            onClick: _cache[4] || (_cache[4] = ($event) => testWaSqlite())
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
