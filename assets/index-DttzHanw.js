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
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
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
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
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
const isString$1 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject$1(val) || isFunction$1(val)) && isFunction$1(val.then) && isFunction$1(val.catch);
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
const camelize = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  }
);
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, ...arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](...arg);
  }
};
const def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
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
const isRef$1 = (val) => {
  return !!(val && val["__v_isRef"] === true);
};
const toDisplayString = (val) => {
  return isString$1(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction$1(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (isRef$1(val)) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
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
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].resume();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].resume();
        }
      }
    }
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
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeSub;
const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this);
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
let batchDepth = 0;
let batchedSub;
let batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed2) {
  if (computed2.flags & 4 && !(computed2.flags & 16)) {
    return;
  }
  computed2.flags &= -17;
  if (computed2.globalVersion === globalVersion) {
    return;
  }
  computed2.globalVersion = globalVersion;
  const dep = computed2.dep;
  computed2.flags |= 2;
  if (dep.version > 0 && !computed2.isSSR && computed2.deps && !isDirty(computed2)) {
    computed2.flags &= -3;
    return;
  }
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed2;
  shouldTrack = true;
  try {
    prepareDeps(computed2);
    const value = computed2.fn(computed2._value);
    if (dep.version === 0 || hasChanged(value, computed2._value)) {
      computed2._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed2);
    computed2.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
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
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
let globalVersion = 0;
class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Dep {
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (false) ;
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed2 = link.dep.computed;
    if (computed2 && !link.dep.subs) {
      computed2.flags |= 4 | 16;
      for (let l = computed2.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    link.dep.subs = link;
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol(
  ""
);
const MAP_KEY_ITERATE_KEY = Symbol(
  ""
);
const ARRAY_ITERATE_KEY = Symbol(
  ""
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function reactiveReadArray(array) {
  const raw = toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, toReactive);
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toReactive(value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(this, "filter", fn, thisArg, (v) => v.map(toReactive), arguments);
  },
  find(fn, thisArg) {
    return apply(this, "find", fn, thisArg, toReactive, arguments);
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(this, "findLast", fn, thisArg, toReactive, arguments);
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", toReactive);
  }
};
function iterator(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (result.value) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
const arrayProto = Array.prototype;
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toReactive(item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  let wrappedFn = fn;
  if (arr !== self2) {
    if (!isShallow(self2)) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, toReactive(item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
}
function searchProxy(self2, method, args) {
  const arr = toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && isProxy(args[0])) {
    args[0] = toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = toRaw(self2)[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      isRef(target) ? target : receiver
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
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
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      isRef(target) ? target : receiver
    );
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
  constructor(isShallow2 = false) {
    super(true, isShallow2);
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
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
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
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
      return Reflect.get(target, "size", target);
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend(
    instrumentations,
    readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
          target.add(value);
          trigger(target, "add", value, value);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
        return this;
      },
      delete(key) {
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        }
        get ? get.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0);
        }
        return result;
      },
      clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0
          );
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
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
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
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
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
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
  return value ? !!value["__v_raw"] : false;
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
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
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
    newValue = useDirectValue ? newValue : toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      {
        this.dep.trigger();
      }
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
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
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = void 0;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = void 0;
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  /**
   * @internal
   */
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && // avoid infinite self recursion
    activeSub !== this) {
      batch(this, true);
      return true;
    }
  }
  get value() {
    const link = this.dep.track();
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    }
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction$1(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  return cRef;
}
const INITIAL_WATCHER_VALUE = {};
const cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  }
}
function watch$1(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect2;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction$1(s)) {
        return call ? call(s, 2) : s();
      } else ;
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect2.stop();
    if (scope && scope.active) {
      remove(scope.effects, effect2);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect2;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
          oldValue = newValue;
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect2.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect2 = new ReactiveEffect(getter);
  effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
  cleanup = effect2.onStop = () => {
    const cleanups = cleanupMap.get(effect2);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect2);
    }
  };
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect2.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect2.run();
  }
  watchHandle.pause = effect2.pause.bind(effect2);
  watchHandle.resume = effect2.resume.bind(effect2);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  depth--;
  if (isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack = [];
let isWarning = false;
function warn$1(msg, ...args) {
  if (isWarning) return;
  isWarning = true;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString$1(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction$1(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
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
  if (isArray(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
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
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}
const queue = [];
let flushIndex = -1;
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
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (!lastJob || // fast path when the job id is larger than the tail
    !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      cb();
      if (!(cb.flags & 4)) {
        cb.flags &= -2;
      }
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= -2;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (false) ;
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(
          job,
          job.i,
          job.i ? 15 : 14
        );
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        job.flags &= -2;
      }
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs();
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
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
  if (!ctx) return fn;
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
const TeleportEndKey = Symbol("_vte");
const isTeleport = (type) => type.__isTeleport;
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction$1(options) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
function markAsyncBoundary(instance) {
  instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
}
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
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
      setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    }
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref3 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  const rawSetupState = toRaw(setupState);
  const canSetSetupRef = setupState === EMPTY_OBJ ? () => false : (key) => {
    return hasOwn(rawSetupState, key);
  };
  if (oldRef != null && oldRef !== ref3) {
    if (isString$1(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction$1(ref3)) {
    callWithErrorHandling(ref3, owner, 12, [value, refs]);
  } else {
    const _isString = isString$1(ref3);
    const _isRef = isRef(ref3);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : ref3.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref3] = [refValue];
                if (canSetSetupRef(ref3)) {
                  setupState[ref3] = refs[ref3];
                }
              } else {
                ref3.value = [refValue];
                if (rawRef.k) refs[rawRef.k] = ref3.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref3] = value;
          if (canSetSetupRef(ref3)) {
            setupState[ref3] = value;
          }
        } else if (_isRef) {
          ref3.value = value;
          if (rawRef.k) refs[rawRef.k] = value;
        } else ;
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
getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
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
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
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
const createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook(
  "bu"
);
const onUpdated = createHook("u");
const onBeforeUnmount = createHook(
  "bum"
);
const onUnmounted = createHook("um");
const onServerPrefetch = createHook(
  "sp"
);
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
const getPublicInstance = (i) => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
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
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
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
        track(instance.attrs, "get", "");
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
    } else ;
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
      if (isFunction$1(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject$1(data)) ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get,
        set
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
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  if (serverPrefetch) {
    markAsyncBoundary(instance);
  }
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
    isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$1(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      {
        watch(getter, handler);
      }
    }
  } else if (isFunction$1(raw)) {
    {
      watch(getter, raw.bind(publicThis));
    }
  } else if (isObject$1(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else ;
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
    if (asMixin && key === "expose") ;
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
      isFunction$1(to) ? to.call(this, this) : to,
      isFunction$1(from) ? from.call(this, this) : from
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
  if (!to) return from;
  if (!from) return to;
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
    if (!isFunction$1(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const pluginCleanupFns = [];
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
        if (installedPlugins.has(plugin)) ;
        else if (plugin && isFunction$1(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction$1(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else ;
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
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getComponentPublicInstance(vnode.component);
        }
      },
      onUnmount(cleanupFn) {
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(
            pluginCleanupFns,
            app._instance,
            16
          );
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) ;
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
    const provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else ;
  }
}
const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
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
    trigger(instance.attrs, "set", "");
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
      if (opt.type !== Function && !opt.skipFactory && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
      if (instance.ce) {
        instance.ce._setProp(key, value);
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
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
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
      if (keys) needCastKeys.push(...keys);
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
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction$1(opt) ? { type: opt } : extend({}, opt);
        const propType = prop.type;
        let shouldCast = false;
        let shouldCastTrue = true;
        if (isArray(propType)) {
          for (let index = 0; index < propType.length; ++index) {
            const type = propType[index];
            const typeName = isFunction$1(type) && type.name;
            if (typeName === "Boolean") {
              shouldCast = true;
              break;
            } else if (typeName === "String") {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction$1(propType) && propType.name === "Boolean";
        }
        prop[
          0
          /* shouldCast */
        ] = shouldCast;
        prop[
          1
          /* shouldCastTrue */
        ] = shouldCastTrue;
        if (shouldCast || hasOwn(prop, "default")) {
          needCastKeys.push(normalizedKey);
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
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  }
  return false;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false) ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
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
const assignSlots = (slots, children, optimized) => {
  for (const key in children) {
    if (optimized || key !== "_") {
      slots[key] = children[key];
    }
  }
};
const initSlots = (instance, children, optimized) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def(slots, "_", type, true);
      }
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
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
        assignSlots(slots, children, optimized);
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
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
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
    const { type, ref: ref3, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
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
          namespace,
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
            namespace,
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
            namespace,
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
            namespace,
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
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else ;
    }
    if (ref3 != null && parentComponent) {
      setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
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
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
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
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
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
        resolveChildrenNamespace(vnode, namespace),
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
          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
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
      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
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
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
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
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
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
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
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
      patchProps(el, oldProps, newProps, parentComponent, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
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
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              parentComponent
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
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
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
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
          namespace,
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
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance, false, optimized);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent, root, type } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        {
          if (root.ce) {
            root.ce._injectChildStyle(type);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
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
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
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
          namespace
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
    instance.scope.on();
    const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
    instance.scope.off();
    const update = instance.update = effect2.run.bind(effect2);
    const job = instance.job = effect2.runIfDirty.bind(effect2);
    job.i = instance;
    job.id = instance.uid;
    effect2.scheduler = () => queueJob(job);
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
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
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
          namespace,
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
          namespace,
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
            namespace,
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
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
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
        namespace,
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
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
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
          namespace,
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
          namespace,
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
            namespace,
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
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
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
            namespace,
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
            namespace,
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
      ref: ref3,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex
    } = vnode;
    if (patchFlag === -2) {
      optimized = false;
    }
    if (ref3 != null) {
      setRef(ref3, null, parentSuspense, vnode, true);
    }
    if (cacheIndex != null) {
      parentComponent.renderCache[cacheIndex] = void 0;
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
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
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
    const { bum, scope, job, subTree, um, m, a } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (job) {
      job.flags |= 8;
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
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  let isFlushing = false;
  const render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    container._vnode = vnode;
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing = false;
    }
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
  return {
    render,
    hydrate,
    createApp: createAppAPI(render)
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, job }, allowed) {
  if (allowed) {
    effect2.flags |= 32;
    job.flags |= 4;
  } else {
    effect2.flags &= -33;
    job.flags &= -5;
  }
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
        if (!shallow && c2.patchFlag !== -2)
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
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function invalidateMount(hooks) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++)
      hooks[i].flags |= 8;
  }
}
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once } = options;
  const baseWatchOptions = extend({}, options);
  const runsImmediately = cb && immediate || !cb && flush !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {
      };
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush === "post") {
    baseWatchOptions.scheduler = (job) => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch$1(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(watchHandle);
    } else if (runsImmediately) {
      watchHandle();
    }
  }
  return watchHandle;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
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
const getModelModifiers = (props, modelName) => {
  return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map((a) => isString$1(a) ? a.trim() : a);
    }
    if (modifiers.number) {
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
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance(instance);
  let result;
  let fallthroughAttrs;
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = false ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          false ? shallowReadonly(props) : props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false) ;
      result = normalizeVNode(
        render2.length > 1 ? render2(
          false ? shallowReadonly(props) : props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return shallowReadonly(attrs);
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render2(
          false ? shallowReadonly(props) : props,
          null
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
        root = cloneVNode(root, fallthroughAttrs, false, true);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    setTransitionHooks(root, vnode.transition);
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
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
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
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
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
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref3,
  ref_key,
  ref_for
}) => {
  if (typeof ref3 === "number") {
    ref3 = "" + ref3;
  }
  return ref3 != null ? isString$1(ref3) || isRef(ref3) || isFunction$1(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
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
    targetStart: null,
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
    cloned.patchFlag = -2;
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
  const shapeFlag = isString$1(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction$1(type) ? 2 : 0;
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
  if (!props) return null;
  return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref3, patchFlag, children, transition } = vnode;
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
      mergeRef && ref3 ? isArray(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetStart: vnode.targetStart,
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
    transition,
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
  if (transition && cloneTransition) {
    setTransitionHooks(
      cloned,
      transition.clone(cloned)
    );
  }
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
  } else if (isVNode(child)) {
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
      if (!slotFlag && !isInternalObject(children)) {
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
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
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
    ids: parent ? parent.ids : ["", 0, 0],
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
let setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set) => set(v));
      else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children, optimized);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    pauseTracking();
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        instance.props,
        setupContext
      ]
    );
    const isAsyncSetup = isPromise(setupResult);
    resetTracking();
    reset();
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
      markAsyncBoundary(instance);
    }
    if (isAsyncSetup) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult);
    }
  } else {
    finishComponentSetup(instance);
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
  } else ;
  finishComponentSetup(instance);
}
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    instance.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
}
const attrsProxyHandlers = {
  get(target, key) {
    track(target, "get", "");
    return target[key];
  }
};
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getComponentPublicInstance(instance) {
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
  } else {
    return instance.proxy;
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction$1(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction$1(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  return c;
};
const version = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let policy = void 0;
const tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e) {
  }
}
const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
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
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
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
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
      );
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
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
const vShowOriginalDisplay = Symbol("_vod");
const vShowHidden = Symbol("_vsh");
const CSS_VAR_TEXT = Symbol("");
const displayRE = /(^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$1(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString$1(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null) val = "";
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
function patchAttr(el, key, value, isSVG, instance, isBoolean2 = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean2 ? "" : isSymbol(value) ? String(value) : value
      );
    }
  }
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) {
      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      el.type === "checkbox" ? "on" : ""
    ) : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
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
  needRemove && el.removeAttribute(attrName || key);
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
      const invoker = invokers[rawName] = createInvoker(
        nextValue,
        instance
      );
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
    return value.map(
      (fn) => (e2) => !e2._stopped && fn && fn(e2)
    );
  } else {
    return value;
  }
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE && (/[A-Z]/.test(key) || !isString$1(nextValue))
  ) {
    patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
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
    if (key in el && isNativeOn(key) && isFunction$1(value)) {
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
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString$1(value)) {
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
    if (!container) return;
    const component = app._component;
    if (!isFunction$1(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    if (container.nodeType === 1) {
      container.textContent = "";
    }
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function normalizeContainer(container) {
  if (isString$1(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
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
  truncate(size) {
    this._size = size;
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
  const db2 = await database;
  const file = await new Promise((resolve, reject) => {
    const store = db2.transaction("files", "readonly").objectStore("files");
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
  const db2 = await database;
  await new Promise((resolve, reject) => {
    const store = db2.transaction("files", "readwrite").objectStore("files");
    const request = store.put({ name: fileName, data });
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}
async function deleteFile(fileName) {
  const db2 = await database;
  await new Promise((resolve, reject) => {
    const store = db2.transaction("files", "readwrite").objectStore("files");
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
  return parseFilterList(Object.entries(obj).filter(([, v]) => !isUndefined(v)).map(([k, v]) => parseValueBinaryOperation(k, needsIsOperator(v) ? "is" : "=", v)), combinator);
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
      const db2 = new Kysely({
        ...__privateGet(this, _props39),
        executor
      });
      return await callback(db2);
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
  constructor(db2) {
    __privateAdd(this, _SqliteIntrospector_instances);
    __privateAdd(this, _db);
    __privateSet(this, _db, db2);
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
  const db2 = __privateGet(this, _db);
  const tableDefinition = await db2.selectFrom("sqlite_master").where("name", "=", table).select(["sql", "type"]).$castTo().executeTakeFirstOrThrow();
  const autoIncrementCol = tableDefinition.sql?.split(/[\(\),]/)?.find((it) => it.toLowerCase().includes("autoincrement"))?.trimStart()?.split(/\s+/)?.[0]?.replace(/["`]/g, "");
  const columns = await db2.selectFrom(sql`pragma_table_info(${table})`.as("table_info")).select(["name", "type", "notnull", "dflt_value"]).orderBy("cid").execute();
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
  createIntrospector(db2) {
    return new SqliteIntrospector(db2);
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
  constructor(db2) {
    this.db = db2;
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
var SqlJsDialect = class extends GenericSqliteDialect {
  /**
   * dialect for [sql.js](https://github.com/sql-js/sql.js)
   *
   * no support for bigint
   */
  constructor(config) {
    super(
      async () => {
        const db2 = await accessDB(config.database);
        return {
          db: db2,
          close: () => db2.close(),
          query: buildQueryFn({
            run: () => ({
              insertId: BigInt(db2.exec("SELECT last_insert_rowid()")[0].values[0][0]),
              numAffectedRows: BigInt(db2.getRowsModified())
            }),
            all: (sql2, parameters) => {
              const stmt = db2.prepare(sql2);
              try {
                if (parameters?.length) {
                  stmt.bind(parameters);
                }
                const rows = [];
                while (stmt.step()) {
                  rows.push(stmt.getAsObject());
                }
                return rows;
              } finally {
                stmt.free();
              }
            }
          })
        };
      },
      config.onCreateConnection
    );
  }
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
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
var hasRequiredSqlWasm;
function requireSqlWasm() {
  if (hasRequiredSqlWasm) return sqlWasm.exports;
  hasRequiredSqlWasm = 1;
  (function(module, exports) {
    var initSqlJsPromise = void 0;
    var initSqlJs = function(moduleConfig) {
      if (initSqlJsPromise) {
        return initSqlJsPromise;
      }
      initSqlJsPromise = new Promise(function(resolveModule, reject) {
        var Module = typeof moduleConfig !== "undefined" ? moduleConfig : {};
        var originalOnAbortFunction = Module["onAbort"];
        Module["onAbort"] = function(errorThatCausedAbort) {
          reject(new Error(errorThatCausedAbort));
          if (originalOnAbortFunction) {
            originalOnAbortFunction(errorThatCausedAbort);
          }
        };
        Module["postRun"] = Module["postRun"] || [];
        Module["postRun"].push(function() {
          resolveModule(Module);
        });
        module = void 0;
        var f;
        f || (f = typeof Module != "undefined" ? Module : {});
        var aa = "object" == typeof window, ba = "function" == typeof importScripts, ca = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node;
        f.onRuntimeInitialized = function() {
          function a(g, l) {
            switch (typeof l) {
              case "boolean":
                fc(g, l ? 1 : 0);
                break;
              case "number":
                gc(g, l);
                break;
              case "string":
                hc(g, l, -1, -1);
                break;
              case "object":
                if (null === l) ib(g);
                else if (null != l.length) {
                  var n = da(l, ea);
                  ic(g, n, l.length, -1);
                  fa(n);
                } else xa(g, "Wrong API use : tried to return a value of an unknown type (" + l + ").", -1);
                break;
              default:
                ib(g);
            }
          }
          function b(g, l) {
            for (var n = [], t = 0; t < g; t += 1) {
              var w = m(l + 4 * t, "i32"), A = jc(w);
              if (1 === A || 2 === A) w = kc(w);
              else if (3 === A) w = lc(w);
              else if (4 === A) {
                A = w;
                w = mc(A);
                A = nc(A);
                for (var N = new Uint8Array(w), M = 0; M < w; M += 1) N[M] = p2[A + M];
                w = N;
              } else w = null;
              n.push(w);
            }
            return n;
          }
          function c(g, l) {
            this.Ka = g;
            this.db = l;
            this.Ia = 1;
            this.eb = [];
          }
          function d(g, l) {
            this.db = l;
            l = ha(g) + 1;
            this.Xa = ia(l);
            if (null === this.Xa) throw Error("Unable to allocate memory for the SQL string");
            q(g, u, this.Xa, l);
            this.cb = this.Xa;
            this.Ta = this.hb = null;
          }
          function e(g) {
            this.filename = "dbfile_" + (4294967295 * Math.random() >>> 0);
            if (null != g) {
              var l = this.filename, n = "/", t = l;
              n && (n = "string" == typeof n ? n : ja(n), t = l ? x(n + "/" + l) : n);
              l = ka(true, true);
              t = la(t, (void 0 !== l ? l : 438) & 4095 | 32768, 0);
              if (g) {
                if ("string" == typeof g) {
                  n = Array(g.length);
                  for (var w = 0, A = g.length; w < A; ++w) n[w] = g.charCodeAt(w);
                  g = n;
                }
                ma(t, l | 146);
                n = na(t, 577);
                oa(n, g, 0, g.length, 0);
                pa(n);
                ma(t, l);
              }
            }
            this.handleError(r(this.filename, h));
            this.db = m(h, "i32");
            lb(this.db);
            this.Ya = {};
            this.Ma = {};
          }
          var h = y(4), k = f.cwrap, r = k("sqlite3_open", "number", ["string", "number"]), z = k("sqlite3_close_v2", "number", ["number"]), v = k("sqlite3_exec", "number", ["number", "string", "number", "number", "number"]), E = k(
            "sqlite3_changes",
            "number",
            ["number"]
          ), H = k("sqlite3_prepare_v2", "number", ["number", "string", "number", "number", "number"]), mb = k("sqlite3_sql", "string", ["number"]), oc = k("sqlite3_normalized_sql", "string", ["number"]), nb = k("sqlite3_prepare_v2", "number", ["number", "number", "number", "number", "number"]), pc = k("sqlite3_bind_text", "number", ["number", "number", "number", "number", "number"]), ob = k("sqlite3_bind_blob", "number", ["number", "number", "number", "number", "number"]), qc = k("sqlite3_bind_double", "number", ["number", "number", "number"]), rc = k("sqlite3_bind_int", "number", ["number", "number", "number"]), sc = k("sqlite3_bind_parameter_index", "number", ["number", "string"]), tc = k("sqlite3_step", "number", ["number"]), uc = k("sqlite3_errmsg", "string", ["number"]), vc = k("sqlite3_column_count", "number", ["number"]), wc = k("sqlite3_data_count", "number", ["number"]), xc = k("sqlite3_column_double", "number", ["number", "number"]), pb = k("sqlite3_column_text", "string", ["number", "number"]), yc = k("sqlite3_column_blob", "number", ["number", "number"]), zc = k(
            "sqlite3_column_bytes",
            "number",
            ["number", "number"]
          ), Ac = k("sqlite3_column_type", "number", ["number", "number"]), Bc = k("sqlite3_column_name", "string", ["number", "number"]), Cc = k("sqlite3_reset", "number", ["number"]), Dc = k("sqlite3_clear_bindings", "number", ["number"]), Ec = k("sqlite3_finalize", "number", ["number"]), qb = k("sqlite3_create_function_v2", "number", "number string number number number number number number number".split(" ")), jc = k("sqlite3_value_type", "number", ["number"]), mc = k("sqlite3_value_bytes", "number", ["number"]), lc = k(
            "sqlite3_value_text",
            "string",
            ["number"]
          ), nc = k("sqlite3_value_blob", "number", ["number"]), kc = k("sqlite3_value_double", "number", ["number"]), gc = k("sqlite3_result_double", "", ["number", "number"]), ib = k("sqlite3_result_null", "", ["number"]), hc = k("sqlite3_result_text", "", ["number", "string", "number", "number"]), ic = k("sqlite3_result_blob", "", ["number", "number", "number", "number"]), fc = k("sqlite3_result_int", "", ["number", "number"]), xa = k("sqlite3_result_error", "", ["number", "string", "number"]), rb = k(
            "sqlite3_aggregate_context",
            "number",
            ["number", "number"]
          ), lb = k("RegisterExtensionFunctions", "number", ["number"]);
          c.prototype.bind = function(g) {
            if (!this.Ka) throw "Statement closed";
            this.reset();
            return Array.isArray(g) ? this.vb(g) : null != g && "object" === typeof g ? this.wb(g) : true;
          };
          c.prototype.step = function() {
            if (!this.Ka) throw "Statement closed";
            this.Ia = 1;
            var g = tc(this.Ka);
            switch (g) {
              case 100:
                return true;
              case 101:
                return false;
              default:
                throw this.db.handleError(g);
            }
          };
          c.prototype.qb = function(g) {
            null == g && (g = this.Ia, this.Ia += 1);
            return xc(this.Ka, g);
          };
          c.prototype.zb = function(g) {
            null == g && (g = this.Ia, this.Ia += 1);
            g = pb(this.Ka, g);
            if ("function" !== typeof BigInt) throw Error("BigInt is not supported");
            return BigInt(g);
          };
          c.prototype.Ab = function(g) {
            null == g && (g = this.Ia, this.Ia += 1);
            return pb(this.Ka, g);
          };
          c.prototype.getBlob = function(g) {
            null == g && (g = this.Ia, this.Ia += 1);
            var l = zc(this.Ka, g);
            g = yc(this.Ka, g);
            for (var n = new Uint8Array(l), t = 0; t < l; t += 1) n[t] = p2[g + t];
            return n;
          };
          c.prototype.get = function(g, l) {
            l = l || {};
            null != g && this.bind(g) && this.step();
            g = [];
            for (var n = wc(this.Ka), t = 0; t < n; t += 1) switch (Ac(this.Ka, t)) {
              case 1:
                var w = l.useBigInt ? this.zb(t) : this.qb(t);
                g.push(w);
                break;
              case 2:
                g.push(this.qb(t));
                break;
              case 3:
                g.push(this.Ab(t));
                break;
              case 4:
                g.push(this.getBlob(t));
                break;
              default:
                g.push(null);
            }
            return g;
          };
          c.prototype.getColumnNames = function() {
            for (var g = [], l = vc(this.Ka), n = 0; n < l; n += 1) g.push(Bc(this.Ka, n));
            return g;
          };
          c.prototype.getAsObject = function(g, l) {
            g = this.get(g, l);
            l = this.getColumnNames();
            for (var n = {}, t = 0; t < l.length; t += 1) n[l[t]] = g[t];
            return n;
          };
          c.prototype.getSQL = function() {
            return mb(this.Ka);
          };
          c.prototype.getNormalizedSQL = function() {
            return oc(this.Ka);
          };
          c.prototype.run = function(g) {
            null != g && this.bind(g);
            this.step();
            return this.reset();
          };
          c.prototype.mb = function(g, l) {
            null == l && (l = this.Ia, this.Ia += 1);
            g = qa(g);
            var n = da(g, ea);
            this.eb.push(n);
            this.db.handleError(pc(this.Ka, l, n, g.length - 1, 0));
          };
          c.prototype.ub = function(g, l) {
            null == l && (l = this.Ia, this.Ia += 1);
            var n = da(g, ea);
            this.eb.push(n);
            this.db.handleError(ob(this.Ka, l, n, g.length, 0));
          };
          c.prototype.lb = function(g, l) {
            null == l && (l = this.Ia, this.Ia += 1);
            this.db.handleError((g === (g | 0) ? rc : qc)(this.Ka, l, g));
          };
          c.prototype.xb = function(g) {
            null == g && (g = this.Ia, this.Ia += 1);
            ob(this.Ka, g, 0, 0, 0);
          };
          c.prototype.nb = function(g, l) {
            null == l && (l = this.Ia, this.Ia += 1);
            switch (typeof g) {
              case "string":
                this.mb(g, l);
                return;
              case "number":
                this.lb(g, l);
                return;
              case "bigint":
                this.mb(g.toString(), l);
                return;
              case "boolean":
                this.lb(g + 0, l);
                return;
              case "object":
                if (null === g) {
                  this.xb(l);
                  return;
                }
                if (null != g.length) {
                  this.ub(g, l);
                  return;
                }
            }
            throw "Wrong API use : tried to bind a value of an unknown type (" + g + ").";
          };
          c.prototype.wb = function(g) {
            var l = this;
            Object.keys(g).forEach(function(n) {
              var t = sc(l.Ka, n);
              0 !== t && l.nb(g[n], t);
            });
            return true;
          };
          c.prototype.vb = function(g) {
            for (var l = 0; l < g.length; l += 1) this.nb(g[l], l + 1);
            return true;
          };
          c.prototype.reset = function() {
            this.freemem();
            return 0 === Dc(this.Ka) && 0 === Cc(this.Ka);
          };
          c.prototype.freemem = function() {
            for (var g; void 0 !== (g = this.eb.pop()); ) fa(g);
          };
          c.prototype.free = function() {
            this.freemem();
            var g = 0 === Ec(this.Ka);
            delete this.db.Ya[this.Ka];
            this.Ka = 0;
            return g;
          };
          d.prototype.next = function() {
            if (null === this.Xa) return { done: true };
            null !== this.Ta && (this.Ta.free(), this.Ta = null);
            if (!this.db.db) throw this.fb(), Error("Database closed");
            var g = ra(), l = y(4);
            sa(h);
            sa(l);
            try {
              this.db.handleError(nb(this.db.db, this.cb, -1, h, l));
              this.cb = m(l, "i32");
              var n = m(h, "i32");
              if (0 === n) return this.fb(), { done: true };
              this.Ta = new c(n, this.db);
              this.db.Ya[n] = this.Ta;
              return { value: this.Ta, done: false };
            } catch (t) {
              throw this.hb = ta(this.cb), this.fb(), t;
            } finally {
              ua(g);
            }
          };
          d.prototype.fb = function() {
            fa(this.Xa);
            this.Xa = null;
          };
          d.prototype.getRemainingSQL = function() {
            return null !== this.hb ? this.hb : ta(this.cb);
          };
          "function" === typeof Symbol && "symbol" === typeof Symbol.iterator && (d.prototype[Symbol.iterator] = function() {
            return this;
          });
          e.prototype.run = function(g, l) {
            if (!this.db) throw "Database closed";
            if (l) {
              g = this.prepare(g, l);
              try {
                g.step();
              } finally {
                g.free();
              }
            } else this.handleError(v(this.db, g, 0, 0, h));
            return this;
          };
          e.prototype.exec = function(g, l, n) {
            if (!this.db) throw "Database closed";
            var t = ra(), w = null;
            try {
              var A = va(g), N = y(4);
              for (g = []; 0 !== m(A, "i8"); ) {
                sa(h);
                sa(N);
                this.handleError(nb(
                  this.db,
                  A,
                  -1,
                  h,
                  N
                ));
                var M = m(h, "i32");
                A = m(N, "i32");
                if (0 !== M) {
                  var K = null;
                  w = new c(M, this);
                  for (null != l && w.bind(l); w.step(); ) null === K && (K = { columns: w.getColumnNames(), values: [] }, g.push(K)), K.values.push(w.get(null, n));
                  w.free();
                }
              }
              return g;
            } catch (O) {
              throw w && w.free(), O;
            } finally {
              ua(t);
            }
          };
          e.prototype.each = function(g, l, n, t, w) {
            "function" === typeof l && (t = n, n = l, l = void 0);
            g = this.prepare(g, l);
            try {
              for (; g.step(); ) n(g.getAsObject(null, w));
            } finally {
              g.free();
            }
            if ("function" === typeof t) return t();
          };
          e.prototype.prepare = function(g, l) {
            sa(h);
            this.handleError(H(this.db, g, -1, h, 0));
            g = m(h, "i32");
            if (0 === g) throw "Nothing to prepare";
            var n = new c(g, this);
            null != l && n.bind(l);
            return this.Ya[g] = n;
          };
          e.prototype.iterateStatements = function(g) {
            return new d(g, this);
          };
          e.prototype["export"] = function() {
            Object.values(this.Ya).forEach(function(l) {
              l.free();
            });
            Object.values(this.Ma).forEach(wa);
            this.Ma = {};
            this.handleError(z(this.db));
            var g = ya(this.filename);
            this.handleError(r(this.filename, h));
            this.db = m(h, "i32");
            lb(this.db);
            return g;
          };
          e.prototype.close = function() {
            null !== this.db && (Object.values(this.Ya).forEach(function(g) {
              g.free();
            }), Object.values(this.Ma).forEach(wa), this.Ma = {}, this.handleError(z(this.db)), za("/" + this.filename), this.db = null);
          };
          e.prototype.handleError = function(g) {
            if (0 === g) return null;
            g = uc(this.db);
            throw Error(g);
          };
          e.prototype.getRowsModified = function() {
            return E(this.db);
          };
          e.prototype.create_function = function(g, l) {
            Object.prototype.hasOwnProperty.call(this.Ma, g) && (wa(this.Ma[g]), delete this.Ma[g]);
            var n = Aa(function(t, w, A) {
              w = b(w, A);
              try {
                var N = l.apply(
                  null,
                  w
                );
              } catch (M) {
                xa(t, M, -1);
                return;
              }
              a(t, N);
            }, "viii");
            this.Ma[g] = n;
            this.handleError(qb(this.db, g, l.length, 1, 0, n, 0, 0, 0));
            return this;
          };
          e.prototype.create_aggregate = function(g, l) {
            var n = l.init || function() {
              return null;
            }, t = l.finalize || function(K) {
              return K;
            }, w = l.step;
            if (!w) throw "An aggregate function must have a step function in " + g;
            var A = {};
            Object.hasOwnProperty.call(this.Ma, g) && (wa(this.Ma[g]), delete this.Ma[g]);
            l = g + "__finalize";
            Object.hasOwnProperty.call(this.Ma, l) && (wa(this.Ma[l]), delete this.Ma[l]);
            var N = Aa(function(K, O, Ra) {
              var Y = rb(K, 1);
              Object.hasOwnProperty.call(A, Y) || (A[Y] = n());
              O = b(O, Ra);
              O = [A[Y]].concat(O);
              try {
                A[Y] = w.apply(null, O);
              } catch (Gc) {
                delete A[Y], xa(K, Gc, -1);
              }
            }, "viii"), M = Aa(function(K) {
              var O = rb(K, 1);
              try {
                var Ra = t(A[O]);
              } catch (Y) {
                delete A[O];
                xa(K, Y, -1);
                return;
              }
              a(K, Ra);
              delete A[O];
            }, "vi");
            this.Ma[g] = N;
            this.Ma[l] = M;
            this.handleError(qb(this.db, g, w.length - 1, 1, 0, 0, N, M, 0));
            return this;
          };
          f.Database = e;
        };
        var Ba = Object.assign({}, f), Ca = "./this.program", B = "", Da, Ea;
        if (ca) {
          var fs = require$$2, Fa = require$$2;
          B = __dirname + "/";
          Ea = (a) => {
            a = Ga(a) ? new URL(a) : Fa.normalize(a);
            return fs.readFileSync(a);
          };
          Da = (a) => {
            a = Ga(a) ? new URL(a) : Fa.normalize(a);
            return new Promise((b, c) => {
              fs.readFile(a, void 0, (d, e) => {
                d ? c(d) : b(e.buffer);
              });
            });
          };
          !f.thisProgram && 1 < process.argv.length && (Ca = process.argv[1].replace(/\\/g, "/"));
          process.argv.slice(2);
          module.exports = f;
        } else if (aa || ba) ba ? B = self.location.href : "undefined" != typeof document && document.currentScript && (B = document.currentScript.src), B = B.startsWith("blob:") ? "" : B.substr(0, B.replace(/[?#].*/, "").lastIndexOf("/") + 1), ba && (Ea = (a) => {
          var b = new XMLHttpRequest();
          b.open("GET", a, false);
          b.responseType = "arraybuffer";
          b.send(null);
          return new Uint8Array(b.response);
        }), Da = (a) => Ga(a) ? new Promise((b, c) => {
          var d = new XMLHttpRequest();
          d.open("GET", a, true);
          d.responseType = "arraybuffer";
          d.onload = () => {
            (200 == d.status || 0 == d.status && d.response) && c(d.response);
            b(d.status);
          };
          d.onerror = b;
          d.send(null);
        }) : fetch(a, { credentials: "same-origin" }).then((b) => b.ok ? b.arrayBuffer() : Promise.reject(Error(b.status + " : " + b.url)));
        var Ha = f.print || console.log.bind(console), C = f.printErr || console.error.bind(console);
        Object.assign(f, Ba);
        Ba = null;
        f.thisProgram && (Ca = f.thisProgram);
        var Ia;
        f.wasmBinary && (Ia = f.wasmBinary);
        var Ja, Ka = false, p2, u, La, D, F, Ma, Na;
        function Oa() {
          var a = Ja.buffer;
          f.HEAP8 = p2 = new Int8Array(a);
          f.HEAP16 = La = new Int16Array(a);
          f.HEAPU8 = u = new Uint8Array(a);
          f.HEAPU16 = new Uint16Array(a);
          f.HEAP32 = D = new Int32Array(a);
          f.HEAPU32 = F = new Uint32Array(a);
          f.HEAPF32 = Ma = new Float32Array(a);
          f.HEAPF64 = Na = new Float64Array(a);
        }
        var Pa = [], Qa = [], Sa = [];
        function Ta() {
          var a = f.preRun.shift();
          Pa.unshift(a);
        }
        var Ua = 0, Wa = null;
        function G(a) {
          f.onAbort?.(a);
          a = "Aborted(" + a + ")";
          C(a);
          Ka = true;
          throw new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
        }
        var Xa = (a) => a.startsWith("data:application/octet-stream;base64,"), Ga = (a) => a.startsWith("file://"), Ya;
        function Za(a) {
          if (a == Ya && Ia) return new Uint8Array(Ia);
          if (Ea) return Ea(a);
          throw "both async and sync fetching of the wasm failed";
        }
        function $a(a) {
          return Ia ? Promise.resolve().then(() => Za(a)) : Da(a).then((b) => new Uint8Array(b), () => Za(a));
        }
        function ab(a, b, c) {
          return $a(a).then((d) => WebAssembly.instantiate(d, b)).then(c, (d) => {
            C(`failed to asynchronously prepare wasm: ${d}`);
            G(d);
          });
        }
        function bb(a, b) {
          var c = Ya;
          Ia || "function" != typeof WebAssembly.instantiateStreaming || Xa(c) || Ga(c) || ca || "function" != typeof fetch ? ab(c, a, b) : fetch(c, { credentials: "same-origin" }).then((d) => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
            C(`wasm streaming compile failed: ${e}`);
            C("falling back to ArrayBuffer instantiation");
            return ab(c, a, b);
          }));
        }
        var I, J, cb = (a) => {
          for (; 0 < a.length; ) a.shift()(f);
        };
        function m(a, b = "i8") {
          b.endsWith("*") && (b = "*");
          switch (b) {
            case "i1":
              return p2[a];
            case "i8":
              return p2[a];
            case "i16":
              return La[a >> 1];
            case "i32":
              return D[a >> 2];
            case "i64":
              G("to do getValue(i64) use WASM_BIGINT");
            case "float":
              return Ma[a >> 2];
            case "double":
              return Na[a >> 3];
            case "*":
              return F[a >> 2];
            default:
              G(`invalid type for getValue: ${b}`);
          }
        }
        function sa(a) {
          var b = "i32";
          b.endsWith("*") && (b = "*");
          switch (b) {
            case "i1":
              p2[a] = 0;
              break;
            case "i8":
              p2[a] = 0;
              break;
            case "i16":
              La[a >> 1] = 0;
              break;
            case "i32":
              D[a >> 2] = 0;
              break;
            case "i64":
              G("to do setValue(i64) use WASM_BIGINT");
            case "float":
              Ma[a >> 2] = 0;
              break;
            case "double":
              Na[a >> 3] = 0;
              break;
            case "*":
              F[a >> 2] = 0;
              break;
            default:
              G(`invalid type for setValue: ${b}`);
          }
        }
        var db2 = "undefined" != typeof TextDecoder ? new TextDecoder() : void 0, L = (a, b, c) => {
          var d = b + c;
          for (c = b; a[c] && !(c >= d); ) ++c;
          if (16 < c - b && a.buffer && db2) return db2.decode(a.subarray(b, c));
          for (d = ""; b < c; ) {
            var e = a[b++];
            if (e & 128) {
              var h = a[b++] & 63;
              if (192 == (e & 224)) d += String.fromCharCode((e & 31) << 6 | h);
              else {
                var k = a[b++] & 63;
                e = 224 == (e & 240) ? (e & 15) << 12 | h << 6 | k : (e & 7) << 18 | h << 12 | k << 6 | a[b++] & 63;
                65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
              }
            } else d += String.fromCharCode(e);
          }
          return d;
        }, ta = (a, b) => a ? L(u, a, b) : "", eb = (a, b) => {
          for (var c = 0, d = a.length - 1; 0 <= d; d--) {
            var e = a[d];
            "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
          }
          if (b) for (; c; c--) a.unshift("..");
          return a;
        }, x = (a) => {
          var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
          (a = eb(a.split("/").filter((d) => !!d), !b).join("/")) || b || (a = ".");
          a && c && (a += "/");
          return (b ? "/" : "") + a;
        }, fb = (a) => {
          var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
          a = b[0];
          b = b[1];
          if (!a && !b) return ".";
          b && (b = b.substr(0, b.length - 1));
          return a + b;
        }, gb = (a) => {
          if ("/" === a) return "/";
          a = x(a);
          a = a.replace(/\/$/, "");
          var b = a.lastIndexOf("/");
          return -1 === b ? a : a.substr(b + 1);
        }, hb = () => {
          if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) return (c) => crypto.getRandomValues(c);
          if (ca) try {
            var a = require$$2;
            if (a.randomFillSync) return (c) => a.randomFillSync(c);
            var b = a.randomBytes;
            return (c) => (c.set(b(c.byteLength)), c);
          } catch (c) {
          }
          G("initRandomDevice");
        }, jb = (a) => (jb = hb())(a), kb = (...a) => {
          for (var b = "", c = false, d = a.length - 1; -1 <= d && !c; d--) {
            c = 0 <= d ? a[d] : "/";
            if ("string" != typeof c) throw new TypeError("Arguments to path.resolve must be strings");
            if (!c) return "";
            b = c + "/" + b;
            c = "/" === c.charAt(0);
          }
          b = eb(b.split("/").filter((e) => !!e), !c).join("/");
          return (c ? "/" : "") + b || ".";
        }, sb = [], ha = (a) => {
          for (var b = 0, c = 0; c < a.length; ++c) {
            var d = a.charCodeAt(c);
            127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
          }
          return b;
        }, q = (a, b, c, d) => {
          if (!(0 < d)) return 0;
          var e = c;
          d = c + d - 1;
          for (var h = 0; h < a.length; ++h) {
            var k = a.charCodeAt(h);
            if (55296 <= k && 57343 >= k) {
              var r = a.charCodeAt(++h);
              k = 65536 + ((k & 1023) << 10) | r & 1023;
            }
            if (127 >= k) {
              if (c >= d) break;
              b[c++] = k;
            } else {
              if (2047 >= k) {
                if (c + 1 >= d) break;
                b[c++] = 192 | k >> 6;
              } else {
                if (65535 >= k) {
                  if (c + 2 >= d) break;
                  b[c++] = 224 | k >> 12;
                } else {
                  if (c + 3 >= d) break;
                  b[c++] = 240 | k >> 18;
                  b[c++] = 128 | k >> 12 & 63;
                }
                b[c++] = 128 | k >> 6 & 63;
              }
              b[c++] = 128 | k & 63;
            }
          }
          b[c] = 0;
          return c - e;
        };
        function qa(a, b) {
          var c = Array(ha(a) + 1);
          a = q(a, c, 0, c.length);
          b && (c.length = a);
          return c;
        }
        var tb = [];
        function ub(a, b) {
          tb[a] = { input: [], output: [], Wa: b };
          vb(a, wb);
        }
        var wb = { open(a) {
          var b = tb[a.node.rdev];
          if (!b) throw new P(43);
          a.tty = b;
          a.seekable = false;
        }, close(a) {
          a.tty.Wa.fsync(a.tty);
        }, fsync(a) {
          a.tty.Wa.fsync(a.tty);
        }, read(a, b, c, d) {
          if (!a.tty || !a.tty.Wa.rb) throw new P(60);
          for (var e = 0, h = 0; h < d; h++) {
            try {
              var k = a.tty.Wa.rb(a.tty);
            } catch (r) {
              throw new P(29);
            }
            if (void 0 === k && 0 === e) throw new P(6);
            if (null === k || void 0 === k) break;
            e++;
            b[c + h] = k;
          }
          e && (a.node.timestamp = Date.now());
          return e;
        }, write(a, b, c, d) {
          if (!a.tty || !a.tty.Wa.ib) throw new P(60);
          try {
            for (var e = 0; e < d; e++) a.tty.Wa.ib(a.tty, b[c + e]);
          } catch (h) {
            throw new P(29);
          }
          d && (a.node.timestamp = Date.now());
          return e;
        } }, xb = { rb() {
          a: {
            if (!sb.length) {
              var a = null;
              if (ca) {
                var b = Buffer.alloc(256), c = 0, d = process.stdin.fd;
                try {
                  c = fs.readSync(d, b, 0, 256);
                } catch (e) {
                  if (e.toString().includes("EOF")) c = 0;
                  else throw e;
                }
                0 < c && (a = b.slice(0, c).toString("utf-8"));
              } else "undefined" != typeof window && "function" == typeof window.prompt && (a = window.prompt("Input: "), null !== a && (a += "\n"));
              if (!a) {
                a = null;
                break a;
              }
              sb = qa(a, true);
            }
            a = sb.shift();
          }
          return a;
        }, ib(a, b) {
          null === b || 10 === b ? (Ha(L(
            a.output,
            0
          )), a.output = []) : 0 != b && a.output.push(b);
        }, fsync(a) {
          a.output && 0 < a.output.length && (Ha(L(a.output, 0)), a.output = []);
        }, Lb() {
          return { Gb: 25856, Ib: 5, Fb: 191, Hb: 35387, Eb: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
        }, Mb() {
          return 0;
        }, Nb() {
          return [24, 80];
        } }, yb = { ib(a, b) {
          null === b || 10 === b ? (C(L(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
        }, fsync(a) {
          a.output && 0 < a.output.length && (C(L(a.output, 0)), a.output = []);
        } };
        function zb(a, b) {
          var c = a.Ha ? a.Ha.length : 0;
          c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.Ha, a.Ha = new Uint8Array(b), 0 < a.La && a.Ha.set(c.subarray(0, a.La), 0));
        }
        var Q = {
          Pa: null,
          Qa() {
            return Q.createNode(null, "/", 16895, 0);
          },
          createNode(a, b, c, d) {
            if (24576 === (c & 61440) || 4096 === (c & 61440)) throw new P(63);
            Q.Pa || (Q.Pa = { dir: { node: { Oa: Q.Fa.Oa, Na: Q.Fa.Na, lookup: Q.Fa.lookup, $a: Q.Fa.$a, rename: Q.Fa.rename, unlink: Q.Fa.unlink, rmdir: Q.Fa.rmdir, readdir: Q.Fa.readdir, symlink: Q.Fa.symlink }, stream: { Sa: Q.Ga.Sa } }, file: { node: { Oa: Q.Fa.Oa, Na: Q.Fa.Na }, stream: { Sa: Q.Ga.Sa, read: Q.Ga.read, write: Q.Ga.write, kb: Q.Ga.kb, ab: Q.Ga.ab, bb: Q.Ga.bb } }, link: {
              node: { Oa: Q.Fa.Oa, Na: Q.Fa.Na, readlink: Q.Fa.readlink },
              stream: {}
            }, ob: { node: { Oa: Q.Fa.Oa, Na: Q.Fa.Na }, stream: Ab } });
            c = Bb(a, b, c, d);
            R(c.mode) ? (c.Fa = Q.Pa.dir.node, c.Ga = Q.Pa.dir.stream, c.Ha = {}) : 32768 === (c.mode & 61440) ? (c.Fa = Q.Pa.file.node, c.Ga = Q.Pa.file.stream, c.La = 0, c.Ha = null) : 40960 === (c.mode & 61440) ? (c.Fa = Q.Pa.link.node, c.Ga = Q.Pa.link.stream) : 8192 === (c.mode & 61440) && (c.Fa = Q.Pa.ob.node, c.Ga = Q.Pa.ob.stream);
            c.timestamp = Date.now();
            a && (a.Ha[b] = c, a.timestamp = c.timestamp);
            return c;
          },
          Kb(a) {
            return a.Ha ? a.Ha.subarray ? a.Ha.subarray(0, a.La) : new Uint8Array(a.Ha) : new Uint8Array(0);
          },
          Fa: { Oa(a) {
            var b = {};
            b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
            b.ino = a.id;
            b.mode = a.mode;
            b.nlink = 1;
            b.uid = 0;
            b.gid = 0;
            b.rdev = a.rdev;
            R(a.mode) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.La : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
            b.atime = new Date(a.timestamp);
            b.mtime = new Date(a.timestamp);
            b.ctime = new Date(a.timestamp);
            b.yb = 4096;
            b.blocks = Math.ceil(b.size / b.yb);
            return b;
          }, Na(a, b) {
            void 0 !== b.mode && (a.mode = b.mode);
            void 0 !== b.timestamp && (a.timestamp = b.timestamp);
            if (void 0 !== b.size && (b = b.size, a.La != b)) if (0 == b) a.Ha = null, a.La = 0;
            else {
              var c = a.Ha;
              a.Ha = new Uint8Array(b);
              c && a.Ha.set(c.subarray(0, Math.min(b, a.La)));
              a.La = b;
            }
          }, lookup() {
            throw Cb[44];
          }, $a(a, b, c, d) {
            return Q.createNode(a, b, c, d);
          }, rename(a, b, c) {
            if (R(a.mode)) {
              try {
                var d = Db(b, c);
              } catch (h) {
              }
              if (d) for (var e in d.Ha) throw new P(55);
            }
            delete a.parent.Ha[a.name];
            a.parent.timestamp = Date.now();
            a.name = c;
            b.Ha[c] = a;
            b.timestamp = a.parent.timestamp;
          }, unlink(a, b) {
            delete a.Ha[b];
            a.timestamp = Date.now();
          }, rmdir(a, b) {
            var c = Db(a, b), d;
            for (d in c.Ha) throw new P(55);
            delete a.Ha[b];
            a.timestamp = Date.now();
          }, readdir(a) {
            var b = [".", ".."], c;
            for (c of Object.keys(a.Ha)) b.push(c);
            return b;
          }, symlink(a, b, c) {
            a = Q.createNode(a, b, 41471, 0);
            a.link = c;
            return a;
          }, readlink(a) {
            if (40960 !== (a.mode & 61440)) throw new P(28);
            return a.link;
          } },
          Ga: {
            read(a, b, c, d, e) {
              var h = a.node.Ha;
              if (e >= a.node.La) return 0;
              a = Math.min(a.node.La - e, d);
              if (8 < a && h.subarray) b.set(h.subarray(e, e + a), c);
              else for (d = 0; d < a; d++) b[c + d] = h[e + d];
              return a;
            },
            write(a, b, c, d, e, h) {
              b.buffer === p2.buffer && (h = false);
              if (!d) return 0;
              a = a.node;
              a.timestamp = Date.now();
              if (b.subarray && (!a.Ha || a.Ha.subarray)) {
                if (h) return a.Ha = b.subarray(c, c + d), a.La = d;
                if (0 === a.La && 0 === e) return a.Ha = b.slice(c, c + d), a.La = d;
                if (e + d <= a.La) return a.Ha.set(b.subarray(c, c + d), e), d;
              }
              zb(a, e + d);
              if (a.Ha.subarray && b.subarray) a.Ha.set(b.subarray(c, c + d), e);
              else for (h = 0; h < d; h++) a.Ha[e + h] = b[c + h];
              a.La = Math.max(a.La, e + d);
              return d;
            },
            Sa(a, b, c) {
              1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.La);
              if (0 > b) throw new P(28);
              return b;
            },
            kb(a, b, c) {
              zb(a.node, b + c);
              a.node.La = Math.max(a.node.La, b + c);
            },
            ab(a, b, c, d, e) {
              if (32768 !== (a.node.mode & 61440)) throw new P(43);
              a = a.node.Ha;
              if (e & 2 || a.buffer !== p2.buffer) {
                if (0 < c || c + b < a.length) a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
                c = true;
                b = 65536 * Math.ceil(b / 65536);
                (e = Eb(65536, b)) ? (u.fill(0, e, e + b), b = e) : b = 0;
                if (!b) throw new P(48);
                p2.set(a, b);
              } else c = false, b = a.byteOffset;
              return { Cb: b, tb: c };
            },
            bb(a, b, c, d) {
              Q.Ga.write(a, b, 0, d, c, false);
              return 0;
            }
          }
        }, ka = (a, b) => {
          var c = 0;
          a && (c |= 365);
          b && (c |= 146);
          return c;
        }, Fb = null, Gb = {}, Hb = [], Ib = 1, S = null, Jb = true, P = class {
          constructor(a) {
            this.name = "ErrnoError";
            this.Ja = a;
          }
        }, Cb = {}, Kb = class {
          constructor() {
            this.Za = {};
            this.node = null;
          }
          get flags() {
            return this.Za.flags;
          }
          set flags(a) {
            this.Za.flags = a;
          }
          get position() {
            return this.Za.position;
          }
          set position(a) {
            this.Za.position = a;
          }
        }, Lb = class {
          constructor(a, b, c, d) {
            a || (a = this);
            this.parent = a;
            this.Qa = a.Qa;
            this.Ua = null;
            this.id = Ib++;
            this.name = b;
            this.mode = c;
            this.Fa = {};
            this.Ga = {};
            this.rdev = d;
          }
          get read() {
            return 365 === (this.mode & 365);
          }
          set read(a) {
            a ? this.mode |= 365 : this.mode &= -366;
          }
          get write() {
            return 146 === (this.mode & 146);
          }
          set write(a) {
            a ? this.mode |= 146 : this.mode &= -147;
          }
        };
        function T(a, b = {}) {
          a = kb(a);
          if (!a) return { path: "", node: null };
          b = Object.assign({ pb: true, jb: 0 }, b);
          if (8 < b.jb) throw new P(32);
          a = a.split("/").filter((k) => !!k);
          for (var c = Fb, d = "/", e = 0; e < a.length; e++) {
            var h = e === a.length - 1;
            if (h && b.parent) break;
            c = Db(c, a[e]);
            d = x(d + "/" + a[e]);
            c.Ua && (!h || h && b.pb) && (c = c.Ua.root);
            if (!h || b.Ra) {
              for (h = 0; 40960 === (c.mode & 61440); ) if (c = Mb(d), d = kb(fb(d), c), c = T(d, { jb: b.jb + 1 }).node, 40 < h++) throw new P(32);
            }
          }
          return { path: d, node: c };
        }
        function ja(a) {
          for (var b; ; ) {
            if (a === a.parent) return a = a.Qa.sb, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
            b = b ? `${a.name}/${b}` : a.name;
            a = a.parent;
          }
        }
        function Nb(a, b) {
          for (var c = 0, d = 0; d < b.length; d++) c = (c << 5) - c + b.charCodeAt(d) | 0;
          return (a + c >>> 0) % S.length;
        }
        function Ob(a) {
          var b = Nb(a.parent.id, a.name);
          if (S[b] === a) S[b] = a.Va;
          else for (b = S[b]; b; ) {
            if (b.Va === a) {
              b.Va = a.Va;
              break;
            }
            b = b.Va;
          }
        }
        function Db(a, b) {
          var c = R(a.mode) ? (c = Pb(a, "x")) ? c : a.Fa.lookup ? 0 : 2 : 54;
          if (c) throw new P(c);
          for (c = S[Nb(a.id, b)]; c; c = c.Va) {
            var d = c.name;
            if (c.parent.id === a.id && d === b) return c;
          }
          return a.Fa.lookup(a, b);
        }
        function Bb(a, b, c, d) {
          a = new Lb(a, b, c, d);
          b = Nb(a.parent.id, a.name);
          a.Va = S[b];
          return S[b] = a;
        }
        function R(a) {
          return 16384 === (a & 61440);
        }
        function Qb(a) {
          var b = ["r", "w", "rw"][a & 3];
          a & 512 && (b += "w");
          return b;
        }
        function Pb(a, b) {
          if (Jb) return 0;
          if (!b.includes("r") || a.mode & 292) {
            if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) return 2;
          } else return 2;
          return 0;
        }
        function Rb(a, b) {
          try {
            return Db(a, b), 20;
          } catch (c) {
          }
          return Pb(a, "wx");
        }
        function Sb(a, b, c) {
          try {
            var d = Db(a, b);
          } catch (e) {
            return e.Ja;
          }
          if (a = Pb(a, "wx")) return a;
          if (c) {
            if (!R(d.mode)) return 54;
            if (d === d.parent || "/" === ja(d)) return 10;
          } else if (R(d.mode)) return 31;
          return 0;
        }
        function U(a) {
          a = Hb[a];
          if (!a) throw new P(8);
          return a;
        }
        function Tb(a, b = -1) {
          a = Object.assign(new Kb(), a);
          if (-1 == b) a: {
            for (b = 0; 4096 >= b; b++) if (!Hb[b]) break a;
            throw new P(33);
          }
          a.fd = b;
          return Hb[b] = a;
        }
        function Ub(a, b = -1) {
          a = Tb(a, b);
          a.Ga?.Jb?.(a);
          return a;
        }
        var Ab = { open(a) {
          a.Ga = Gb[a.node.rdev].Ga;
          a.Ga.open?.(a);
        }, Sa() {
          throw new P(70);
        } };
        function vb(a, b) {
          Gb[a] = { Ga: b };
        }
        function Vb(a, b) {
          var c = "/" === b;
          if (c && Fb) throw new P(10);
          if (!c && b) {
            var d = T(b, { pb: false });
            b = d.path;
            d = d.node;
            if (d.Ua) throw new P(10);
            if (!R(d.mode)) throw new P(54);
          }
          b = { type: a, Ob: {}, sb: b, Bb: [] };
          a = a.Qa(b);
          a.Qa = b;
          b.root = a;
          c ? Fb = a : d && (d.Ua = b, d.Qa && d.Qa.Bb.push(b));
        }
        function la(a, b, c) {
          var d = T(a, { parent: true }).node;
          a = gb(a);
          if (!a || "." === a || ".." === a) throw new P(28);
          var e = Rb(d, a);
          if (e) throw new P(e);
          if (!d.Fa.$a) throw new P(63);
          return d.Fa.$a(d, a, b, c);
        }
        function V(a, b) {
          return la(a, (void 0 !== b ? b : 511) & 1023 | 16384, 0);
        }
        function Wb(a, b, c) {
          "undefined" == typeof c && (c = b, b = 438);
          la(a, b | 8192, c);
        }
        function Xb(a, b) {
          if (!kb(a)) throw new P(44);
          var c = T(b, { parent: true }).node;
          if (!c) throw new P(44);
          b = gb(b);
          var d = Rb(c, b);
          if (d) throw new P(d);
          if (!c.Fa.symlink) throw new P(63);
          c.Fa.symlink(c, b, a);
        }
        function Yb(a) {
          var b = T(a, { parent: true }).node;
          a = gb(a);
          var c = Db(b, a), d = Sb(b, a, true);
          if (d) throw new P(d);
          if (!b.Fa.rmdir) throw new P(63);
          if (c.Ua) throw new P(10);
          b.Fa.rmdir(b, a);
          Ob(c);
        }
        function za(a) {
          var b = T(a, { parent: true }).node;
          if (!b) throw new P(44);
          a = gb(a);
          var c = Db(b, a), d = Sb(b, a, false);
          if (d) throw new P(d);
          if (!b.Fa.unlink) throw new P(63);
          if (c.Ua) throw new P(10);
          b.Fa.unlink(b, a);
          Ob(c);
        }
        function Mb(a) {
          a = T(a).node;
          if (!a) throw new P(44);
          if (!a.Fa.readlink) throw new P(28);
          return kb(ja(a.parent), a.Fa.readlink(a));
        }
        function Zb(a, b) {
          a = T(a, { Ra: !b }).node;
          if (!a) throw new P(44);
          if (!a.Fa.Oa) throw new P(63);
          return a.Fa.Oa(a);
        }
        function $b(a) {
          return Zb(a, true);
        }
        function ma(a, b) {
          a = "string" == typeof a ? T(a, { Ra: true }).node : a;
          if (!a.Fa.Na) throw new P(63);
          a.Fa.Na(a, { mode: b & 4095 | a.mode & -4096, timestamp: Date.now() });
        }
        function ac(a, b) {
          if (0 > b) throw new P(28);
          a = "string" == typeof a ? T(a, { Ra: true }).node : a;
          if (!a.Fa.Na) throw new P(63);
          if (R(a.mode)) throw new P(31);
          if (32768 !== (a.mode & 61440)) throw new P(28);
          var c = Pb(a, "w");
          if (c) throw new P(c);
          a.Fa.Na(a, { size: b, timestamp: Date.now() });
        }
        function na(a, b, c) {
          if ("" === a) throw new P(44);
          if ("string" == typeof b) {
            var d = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[b];
            if ("undefined" == typeof d) throw Error(`Unknown file open mode: ${b}`);
            b = d;
          }
          c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
          if ("object" == typeof a) var e = a;
          else {
            a = x(a);
            try {
              e = T(a, { Ra: !(b & 131072) }).node;
            } catch (h) {
            }
          }
          d = false;
          if (b & 64) if (e) {
            if (b & 128) throw new P(20);
          } else e = la(a, c, 0), d = true;
          if (!e) throw new P(44);
          8192 === (e.mode & 61440) && (b &= -513);
          if (b & 65536 && !R(e.mode)) throw new P(54);
          if (!d && (c = e ? 40960 === (e.mode & 61440) ? 32 : R(e.mode) && ("r" !== Qb(b) || b & 512) ? 31 : Pb(e, Qb(b)) : 44)) throw new P(c);
          b & 512 && !d && ac(e, 0);
          b &= -131713;
          e = Tb({ node: e, path: ja(e), flags: b, seekable: true, position: 0, Ga: e.Ga, Db: [], error: false });
          e.Ga.open && e.Ga.open(e);
          !f.logReadFiles || b & 1 || (bc || (bc = {}), a in bc || (bc[a] = 1));
          return e;
        }
        function pa(a) {
          if (null === a.fd) throw new P(8);
          a.gb && (a.gb = null);
          try {
            a.Ga.close && a.Ga.close(a);
          } catch (b) {
            throw b;
          } finally {
            Hb[a.fd] = null;
          }
          a.fd = null;
        }
        function cc(a, b, c) {
          if (null === a.fd) throw new P(8);
          if (!a.seekable || !a.Ga.Sa) throw new P(70);
          if (0 != c && 1 != c && 2 != c) throw new P(28);
          a.position = a.Ga.Sa(a, b, c);
          a.Db = [];
        }
        function dc(a, b, c, d, e) {
          if (0 > d || 0 > e) throw new P(28);
          if (null === a.fd) throw new P(8);
          if (1 === (a.flags & 2097155)) throw new P(8);
          if (R(a.node.mode)) throw new P(31);
          if (!a.Ga.read) throw new P(28);
          var h = "undefined" != typeof e;
          if (!h) e = a.position;
          else if (!a.seekable) throw new P(70);
          b = a.Ga.read(a, b, c, d, e);
          h || (a.position += b);
          return b;
        }
        function oa(a, b, c, d, e) {
          if (0 > d || 0 > e) throw new P(28);
          if (null === a.fd) throw new P(8);
          if (0 === (a.flags & 2097155)) throw new P(8);
          if (R(a.node.mode)) throw new P(31);
          if (!a.Ga.write) throw new P(28);
          a.seekable && a.flags & 1024 && cc(a, 0, 2);
          var h = "undefined" != typeof e;
          if (!h) e = a.position;
          else if (!a.seekable) throw new P(70);
          b = a.Ga.write(a, b, c, d, e, void 0);
          h || (a.position += b);
          return b;
        }
        function ya(a) {
          var c;
          var d = na(a, d || 0);
          a = Zb(a).size;
          var e = new Uint8Array(a);
          dc(d, e, 0, a, 0);
          c = e;
          pa(d);
          return c;
        }
        var ec;
        function Fc(a, b, c) {
          a = x("/dev/" + a);
          var d = ka(!!b, !!c);
          Hc || (Hc = 64);
          var e = Hc++ << 8 | 0;
          vb(e, { open(h) {
            h.seekable = false;
          }, close() {
            c?.buffer?.length && c(10);
          }, read(h, k, r, z) {
            for (var v = 0, E = 0; E < z; E++) {
              try {
                var H = b();
              } catch (mb) {
                throw new P(29);
              }
              if (void 0 === H && 0 === v) throw new P(6);
              if (null === H || void 0 === H) break;
              v++;
              k[r + E] = H;
            }
            v && (h.node.timestamp = Date.now());
            return v;
          }, write(h, k, r, z) {
            for (var v = 0; v < z; v++) try {
              c(k[r + v]);
            } catch (E) {
              throw new P(29);
            }
            z && (h.node.timestamp = Date.now());
            return v;
          } });
          Wb(a, d, e);
        }
        var Hc, W = {}, bc;
        function Ic(a, b, c) {
          if ("/" === b.charAt(0)) return b;
          a = -100 === a ? "/" : U(a).path;
          if (0 == b.length) {
            if (!c) throw new P(44);
            return a;
          }
          return x(a + "/" + b);
        }
        function Jc(a, b, c) {
          a = a(b);
          D[c >> 2] = a.dev;
          D[c + 4 >> 2] = a.mode;
          F[c + 8 >> 2] = a.nlink;
          D[c + 12 >> 2] = a.uid;
          D[c + 16 >> 2] = a.gid;
          D[c + 20 >> 2] = a.rdev;
          J = [a.size >>> 0, (I = a.size, 1 <= +Math.abs(I) ? 0 < I ? +Math.floor(I / 4294967296) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
          D[c + 24 >> 2] = J[0];
          D[c + 28 >> 2] = J[1];
          D[c + 32 >> 2] = 4096;
          D[c + 36 >> 2] = a.blocks;
          b = a.atime.getTime();
          var d = a.mtime.getTime(), e = a.ctime.getTime();
          J = [Math.floor(b / 1e3) >>> 0, (I = Math.floor(b / 1e3), 1 <= +Math.abs(I) ? 0 < I ? +Math.floor(I / 4294967296) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
          D[c + 40 >> 2] = J[0];
          D[c + 44 >> 2] = J[1];
          F[c + 48 >> 2] = b % 1e3 * 1e3;
          J = [Math.floor(d / 1e3) >>> 0, (I = Math.floor(d / 1e3), 1 <= +Math.abs(I) ? 0 < I ? +Math.floor(I / 4294967296) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
          D[c + 56 >> 2] = J[0];
          D[c + 60 >> 2] = J[1];
          F[c + 64 >> 2] = d % 1e3 * 1e3;
          J = [Math.floor(e / 1e3) >>> 0, (I = Math.floor(e / 1e3), 1 <= +Math.abs(I) ? 0 < I ? +Math.floor(I / 4294967296) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
          D[c + 72 >> 2] = J[0];
          D[c + 76 >> 2] = J[1];
          F[c + 80 >> 2] = e % 1e3 * 1e3;
          J = [a.ino >>> 0, (I = a.ino, 1 <= +Math.abs(I) ? 0 < I ? +Math.floor(I / 4294967296) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
          D[c + 88 >> 2] = J[0];
          D[c + 92 >> 2] = J[1];
          return 0;
        }
        var Kc = void 0;
        function Lc() {
          var a = D[+Kc >> 2];
          Kc += 4;
          return a;
        }
        var Mc = (a, b) => b + 2097152 >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN, Nc = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Oc = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Pc = {}, Rc = () => {
          if (!Qc) {
            var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: Ca || "./this.program" }, b;
            for (b in Pc) void 0 === Pc[b] ? delete a[b] : a[b] = Pc[b];
            var c = [];
            for (b in a) c.push(`${b}=${a[b]}`);
            Qc = c;
          }
          return Qc;
        }, Qc, va = (a) => {
          var b = ha(a) + 1, c = y(b);
          q(a, u, c, b);
          return c;
        }, Sc = (a, b, c, d) => {
          var e = { string: (v) => {
            var E = 0;
            null !== v && void 0 !== v && 0 !== v && (E = va(v));
            return E;
          }, array: (v) => {
            var E = y(v.length);
            p2.set(v, E);
            return E;
          } };
          a = f["_" + a];
          var h = [], k = 0;
          if (d) for (var r = 0; r < d.length; r++) {
            var z = e[c[r]];
            z ? (0 === k && (k = ra()), h[r] = z(d[r])) : h[r] = d[r];
          }
          c = a(...h);
          return c = function(v) {
            0 !== k && ua(k);
            return "string" === b ? v ? L(u, v) : "" : "boolean" === b ? !!v : v;
          }(c);
        }, ea = 0, da = (a, b) => {
          b = 1 == b ? y(a.length) : ia(a.length);
          a.subarray || a.slice || (a = new Uint8Array(a));
          u.set(
            a,
            b
          );
          return b;
        }, Tc, Uc = [], X, wa = (a) => {
          Tc.delete(X.get(a));
          X.set(a, null);
          Uc.push(a);
        }, Aa = (a, b) => {
          if (!Tc) {
            Tc = /* @__PURE__ */ new WeakMap();
            var c = X.length;
            if (Tc) for (var d = 0; d < 0 + c; d++) {
              var e = X.get(d);
              e && Tc.set(e, d);
            }
          }
          if (c = Tc.get(a) || 0) return c;
          if (Uc.length) c = Uc.pop();
          else {
            try {
              X.grow(1);
            } catch (r) {
              if (!(r instanceof RangeError)) throw r;
              throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
            }
            c = X.length - 1;
          }
          try {
            X.set(c, a);
          } catch (r) {
            if (!(r instanceof TypeError)) throw r;
            if ("function" == typeof WebAssembly.Function) {
              d = WebAssembly.Function;
              e = { i: "i32", j: "i64", f: "f32", d: "f64", e: "externref", p: "i32" };
              for (var h = { parameters: [], results: "v" == b[0] ? [] : [e[b[0]]] }, k = 1; k < b.length; ++k) h.parameters.push(e[b[k]]);
              b = new d(h, a);
            } else {
              d = [1];
              e = b.slice(0, 1);
              b = b.slice(1);
              h = { i: 127, p: 127, j: 126, f: 125, d: 124, e: 111 };
              d.push(96);
              k = b.length;
              128 > k ? d.push(k) : d.push(k % 128 | 128, k >> 7);
              for (k = 0; k < b.length; ++k) d.push(h[b[k]]);
              "v" == e ? d.push(0) : d.push(1, h[e]);
              b = [0, 97, 115, 109, 1, 0, 0, 0, 1];
              e = d.length;
              128 > e ? b.push(e) : b.push(e % 128 | 128, e >> 7);
              b.push(...d);
              b.push(
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
              b = new WebAssembly.Module(new Uint8Array(b));
              b = new WebAssembly.Instance(b, { e: { f: a } }).exports.f;
            }
            X.set(c, b);
          }
          Tc.set(a, c);
          return c;
        };
        [44].forEach((a) => {
          Cb[a] = new P(a);
          Cb[a].stack = "<generic error, no stack>";
        });
        S = Array(4096);
        Vb(Q, "/");
        V("/tmp");
        V("/home");
        V("/home/web_user");
        (function() {
          V("/dev");
          vb(259, { read: () => 0, write: (d, e, h, k) => k });
          Wb("/dev/null", 259);
          ub(1280, xb);
          ub(1536, yb);
          Wb("/dev/tty", 1280);
          Wb("/dev/tty1", 1536);
          var a = new Uint8Array(1024), b = 0, c = () => {
            0 === b && (b = jb(a).byteLength);
            return a[--b];
          };
          Fc("random", c);
          Fc("urandom", c);
          V("/dev/shm");
          V("/dev/shm/tmp");
        })();
        (function() {
          V("/proc");
          var a = V("/proc/self");
          V("/proc/self/fd");
          Vb({ Qa() {
            var b = Bb(a, "fd", 16895, 73);
            b.Fa = { lookup(c, d) {
              var e = U(+d);
              c = { parent: null, Qa: { sb: "fake" }, Fa: { readlink: () => e.path } };
              return c.parent = c;
            } };
            return b;
          } }, "/proc/self/fd");
        })();
        var Vc = {
          a: (a, b, c, d) => {
            G(`Assertion failed: ${a ? L(u, a) : ""}, at: ` + [b ? b ? L(u, b) : "" : "unknown filename", c, d ? d ? L(u, d) : "" : "unknown function"]);
          },
          h: function(a, b) {
            try {
              return a = a ? L(u, a) : "", ma(a, b), 0;
            } catch (c) {
              if ("undefined" == typeof W || "ErrnoError" !== c.name) throw c;
              return -c.Ja;
            }
          },
          H: function(a, b, c) {
            try {
              b = b ? L(u, b) : "";
              b = Ic(a, b);
              if (c & -8) return -28;
              var d = T(b, { Ra: true }).node;
              if (!d) return -44;
              a = "";
              c & 4 && (a += "r");
              c & 2 && (a += "w");
              c & 1 && (a += "x");
              return a && Pb(d, a) ? -2 : 0;
            } catch (e) {
              if ("undefined" == typeof W || "ErrnoError" !== e.name) throw e;
              return -e.Ja;
            }
          },
          i: function(a, b) {
            try {
              var c = U(a);
              ma(c.node, b);
              return 0;
            } catch (d) {
              if ("undefined" == typeof W || "ErrnoError" !== d.name) throw d;
              return -d.Ja;
            }
          },
          g: function(a) {
            try {
              var b = U(a).node;
              var c = "string" == typeof b ? T(b, { Ra: true }).node : b;
              if (!c.Fa.Na) throw new P(63);
              c.Fa.Na(c, { timestamp: Date.now() });
              return 0;
            } catch (d) {
              if ("undefined" == typeof W || "ErrnoError" !== d.name) throw d;
              return -d.Ja;
            }
          },
          b: function(a, b, c) {
            Kc = c;
            try {
              var d = U(a);
              switch (b) {
                case 0:
                  var e = Lc();
                  if (0 > e) break;
                  for (; Hb[e]; ) e++;
                  return Ub(d, e).fd;
                case 1:
                case 2:
                  return 0;
                case 3:
                  return d.flags;
                case 4:
                  return e = Lc(), d.flags |= e, 0;
                case 12:
                  return e = Lc(), La[e + 0 >> 1] = 2, 0;
                case 13:
                case 14:
                  return 0;
              }
              return -28;
            } catch (h) {
              if ("undefined" == typeof W || "ErrnoError" !== h.name) throw h;
              return -h.Ja;
            }
          },
          f: function(a, b) {
            try {
              var c = U(a);
              return Jc(Zb, c.path, b);
            } catch (d) {
              if ("undefined" == typeof W || "ErrnoError" !== d.name) throw d;
              return -d.Ja;
            }
          },
          n: function(a, b, c) {
            b = Mc(b, c);
            try {
              if (isNaN(b)) return 61;
              var d = U(a);
              if (0 === (d.flags & 2097155)) throw new P(28);
              ac(d.node, b);
              return 0;
            } catch (e) {
              if ("undefined" == typeof W || "ErrnoError" !== e.name) throw e;
              return -e.Ja;
            }
          },
          C: function(a, b) {
            try {
              if (0 === b) return -28;
              var c = ha("/") + 1;
              if (b < c) return -68;
              q("/", u, a, b);
              return c;
            } catch (d) {
              if ("undefined" == typeof W || "ErrnoError" !== d.name) throw d;
              return -d.Ja;
            }
          },
          F: function(a, b) {
            try {
              return a = a ? L(u, a) : "", Jc($b, a, b);
            } catch (c) {
              if ("undefined" == typeof W || "ErrnoError" !== c.name) throw c;
              return -c.Ja;
            }
          },
          z: function(a, b, c) {
            try {
              return b = b ? L(u, b) : "", b = Ic(a, b), b = x(b), "/" === b[b.length - 1] && (b = b.substr(0, b.length - 1)), V(b, c), 0;
            } catch (d) {
              if ("undefined" == typeof W || "ErrnoError" !== d.name) throw d;
              return -d.Ja;
            }
          },
          E: function(a, b, c, d) {
            try {
              b = b ? L(u, b) : "";
              var e = d & 256;
              b = Ic(a, b, d & 4096);
              return Jc(e ? $b : Zb, b, c);
            } catch (h) {
              if ("undefined" == typeof W || "ErrnoError" !== h.name) throw h;
              return -h.Ja;
            }
          },
          x: function(a, b, c, d) {
            Kc = d;
            try {
              b = b ? L(u, b) : "";
              b = Ic(a, b);
              var e = d ? Lc() : 0;
              return na(b, c, e).fd;
            } catch (h) {
              if ("undefined" == typeof W || "ErrnoError" !== h.name) throw h;
              return -h.Ja;
            }
          },
          v: function(a, b, c, d) {
            try {
              b = b ? L(u, b) : "";
              b = Ic(a, b);
              if (0 >= d) return -28;
              var e = Mb(b), h = Math.min(d, ha(e)), k = p2[c + h];
              q(e, u, c, d + 1);
              p2[c + h] = k;
              return h;
            } catch (r) {
              if ("undefined" == typeof W || "ErrnoError" !== r.name) throw r;
              return -r.Ja;
            }
          },
          u: function(a) {
            try {
              return a = a ? L(u, a) : "", Yb(a), 0;
            } catch (b) {
              if ("undefined" == typeof W || "ErrnoError" !== b.name) throw b;
              return -b.Ja;
            }
          },
          G: function(a, b) {
            try {
              return a = a ? L(u, a) : "", Jc(Zb, a, b);
            } catch (c) {
              if ("undefined" == typeof W || "ErrnoError" !== c.name) throw c;
              return -c.Ja;
            }
          },
          r: function(a, b, c) {
            try {
              return b = b ? L(u, b) : "", b = Ic(a, b), 0 === c ? za(b) : 512 === c ? Yb(b) : G("Invalid flags passed to unlinkat"), 0;
            } catch (d) {
              if ("undefined" == typeof W || "ErrnoError" !== d.name) throw d;
              return -d.Ja;
            }
          },
          q: function(a, b, c) {
            try {
              b = b ? L(u, b) : "";
              b = Ic(a, b, true);
              if (c) {
                var d = F[c >> 2] + 4294967296 * D[c + 4 >> 2], e = D[c + 8 >> 2];
                h = 1e3 * d + e / 1e6;
                c += 16;
                d = F[c >> 2] + 4294967296 * D[c + 4 >> 2];
                e = D[c + 8 >> 2];
                k = 1e3 * d + e / 1e6;
              } else var h = Date.now(), k = h;
              a = h;
              var r = T(b, { Ra: true }).node;
              r.Fa.Na(r, { timestamp: Math.max(a, k) });
              return 0;
            } catch (z) {
              if ("undefined" == typeof W || "ErrnoError" !== z.name) throw z;
              return -z.Ja;
            }
          },
          l: function(a, b, c) {
            a = new Date(1e3 * Mc(a, b));
            D[c >> 2] = a.getSeconds();
            D[c + 4 >> 2] = a.getMinutes();
            D[c + 8 >> 2] = a.getHours();
            D[c + 12 >> 2] = a.getDate();
            D[c + 16 >> 2] = a.getMonth();
            D[c + 20 >> 2] = a.getFullYear() - 1900;
            D[c + 24 >> 2] = a.getDay();
            b = a.getFullYear();
            D[c + 28 >> 2] = (0 !== b % 4 || 0 === b % 100 && 0 !== b % 400 ? Oc : Nc)[a.getMonth()] + a.getDate() - 1 | 0;
            D[c + 36 >> 2] = -(60 * a.getTimezoneOffset());
            b = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
            var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
            D[c + 32 >> 2] = (b != d && a.getTimezoneOffset() == Math.min(d, b)) | 0;
          },
          j: function(a, b, c, d, e, h, k, r) {
            e = Mc(e, h);
            try {
              if (isNaN(e)) return 61;
              var z = U(d);
              if (0 !== (b & 2) && 0 === (c & 2) && 2 !== (z.flags & 2097155)) throw new P(2);
              if (1 === (z.flags & 2097155)) throw new P(2);
              if (!z.Ga.ab) throw new P(43);
              var v = z.Ga.ab(z, a, e, b, c);
              var E = v.Cb;
              D[k >> 2] = v.tb;
              F[r >> 2] = E;
              return 0;
            } catch (H) {
              if ("undefined" == typeof W || "ErrnoError" !== H.name) throw H;
              return -H.Ja;
            }
          },
          k: function(a, b, c, d, e, h, k) {
            h = Mc(h, k);
            try {
              var r = U(e);
              if (c & 2) {
                if (32768 !== (r.node.mode & 61440)) throw new P(43);
                if (!(d & 2)) {
                  var z = u.slice(a, a + b);
                  r.Ga.bb && r.Ga.bb(r, z, h, b, d);
                }
              }
            } catch (v) {
              if ("undefined" == typeof W || "ErrnoError" !== v.name) throw v;
              return -v.Ja;
            }
          },
          y: (a, b, c, d) => {
            var e = (/* @__PURE__ */ new Date()).getFullYear(), h = new Date(e, 0, 1).getTimezoneOffset();
            e = new Date(e, 6, 1).getTimezoneOffset();
            F[a >> 2] = 60 * Math.max(h, e);
            D[b >> 2] = Number(h != e);
            b = (k) => {
              var r = Math.abs(k);
              return `UTC${0 <= k ? "-" : "+"}${String(Math.floor(r / 60)).padStart(2, "0")}${String(r % 60).padStart(2, "0")}`;
            };
            a = b(h);
            b = b(e);
            e < h ? (q(a, u, c, 17), q(b, u, d, 17)) : (q(a, u, d, 17), q(b, u, c, 17));
          },
          d: () => Date.now(),
          s: () => 2147483648,
          c: () => performance.now(),
          o: (a) => {
            var b = u.length;
            a >>>= 0;
            if (2147483648 < a) return false;
            for (var c = 1; 4 >= c; c *= 2) {
              var d = b * (1 + 0.2 / c);
              d = Math.min(d, a + 100663296);
              var e = Math;
              d = Math.max(a, d);
              a: {
                e = (e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536) - Ja.buffer.byteLength + 65535) / 65536;
                try {
                  Ja.grow(e);
                  Oa();
                  var h = 1;
                  break a;
                } catch (k) {
                }
                h = void 0;
              }
              if (h) return true;
            }
            return false;
          },
          A: (a, b) => {
            var c = 0;
            Rc().forEach((d, e) => {
              var h = b + c;
              e = F[a + 4 * e >> 2] = h;
              for (h = 0; h < d.length; ++h) p2[e++] = d.charCodeAt(h);
              p2[e] = 0;
              c += d.length + 1;
            });
            return 0;
          },
          B: (a, b) => {
            var c = Rc();
            F[a >> 2] = c.length;
            var d = 0;
            c.forEach((e) => d += e.length + 1);
            F[b >> 2] = d;
            return 0;
          },
          e: function(a) {
            try {
              var b = U(a);
              pa(b);
              return 0;
            } catch (c) {
              if ("undefined" == typeof W || "ErrnoError" !== c.name) throw c;
              return c.Ja;
            }
          },
          p: function(a, b) {
            try {
              var c = U(a);
              p2[b] = c.tty ? 2 : R(c.mode) ? 3 : 40960 === (c.mode & 61440) ? 7 : 4;
              La[b + 2 >> 1] = 0;
              J = [0, (I = 0, 1 <= +Math.abs(I) ? 0 < I ? +Math.floor(I / 4294967296) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
              D[b + 8 >> 2] = J[0];
              D[b + 12 >> 2] = J[1];
              J = [0, (I = 0, 1 <= +Math.abs(I) ? 0 < I ? +Math.floor(I / 4294967296) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
              D[b + 16 >> 2] = J[0];
              D[b + 20 >> 2] = J[1];
              return 0;
            } catch (d) {
              if ("undefined" == typeof W || "ErrnoError" !== d.name) throw d;
              return d.Ja;
            }
          },
          w: function(a, b, c, d) {
            try {
              a: {
                var e = U(a);
                a = b;
                for (var h, k = b = 0; k < c; k++) {
                  var r = F[a >> 2], z = F[a + 4 >> 2];
                  a += 8;
                  var v = dc(e, p2, r, z, h);
                  if (0 > v) {
                    var E = -1;
                    break a;
                  }
                  b += v;
                  if (v < z) break;
                  "undefined" != typeof h && (h += v);
                }
                E = b;
              }
              F[d >> 2] = E;
              return 0;
            } catch (H) {
              if ("undefined" == typeof W || "ErrnoError" !== H.name) throw H;
              return H.Ja;
            }
          },
          m: function(a, b, c, d, e) {
            b = Mc(b, c);
            try {
              if (isNaN(b)) return 61;
              var h = U(a);
              cc(h, b, d);
              J = [h.position >>> 0, (I = h.position, 1 <= +Math.abs(I) ? 0 < I ? +Math.floor(I / 4294967296) >>> 0 : ~~+Math.ceil((I - +(~~I >>> 0)) / 4294967296) >>> 0 : 0)];
              D[e >> 2] = J[0];
              D[e + 4 >> 2] = J[1];
              h.gb && 0 === b && 0 === d && (h.gb = null);
              return 0;
            } catch (k) {
              if ("undefined" == typeof W || "ErrnoError" !== k.name) throw k;
              return k.Ja;
            }
          },
          D: function(a) {
            try {
              var b = U(a);
              return b.Ga?.fsync ? b.Ga.fsync(b) : 0;
            } catch (c) {
              if ("undefined" == typeof W || "ErrnoError" !== c.name) throw c;
              return c.Ja;
            }
          },
          t: function(a, b, c, d) {
            try {
              a: {
                var e = U(a);
                a = b;
                for (var h, k = b = 0; k < c; k++) {
                  var r = F[a >> 2], z = F[a + 4 >> 2];
                  a += 8;
                  var v = oa(e, p2, r, z, h);
                  if (0 > v) {
                    var E = -1;
                    break a;
                  }
                  b += v;
                  "undefined" != typeof h && (h += v);
                }
                E = b;
              }
              F[d >> 2] = E;
              return 0;
            } catch (H) {
              if ("undefined" == typeof W || "ErrnoError" !== H.name) throw H;
              return H.Ja;
            }
          }
        }, Z = function() {
          function a(c) {
            Z = c.exports;
            Ja = Z.I;
            Oa();
            X = Z.K;
            Qa.unshift(Z.J);
            Ua--;
            f.monitorRunDependencies?.(Ua);
            0 == Ua && (Wa && (c = Wa, Wa = null, c()));
            return Z;
          }
          var b = { a: Vc };
          Ua++;
          f.monitorRunDependencies?.(Ua);
          if (f.instantiateWasm) try {
            return f.instantiateWasm(b, a);
          } catch (c) {
            return C(`Module.instantiateWasm callback failed with error: ${c}`), false;
          }
          Ya || (Ya = Xa("sql-wasm.wasm") ? "sql-wasm.wasm" : f.locateFile ? f.locateFile(
            "sql-wasm.wasm",
            B
          ) : B + "sql-wasm.wasm");
          bb(b, function(c) {
            a(c.instance);
          });
          return {};
        }();
        f._sqlite3_free = (a) => (f._sqlite3_free = Z.L)(a);
        f._sqlite3_value_text = (a) => (f._sqlite3_value_text = Z.M)(a);
        f._sqlite3_prepare_v2 = (a, b, c, d, e) => (f._sqlite3_prepare_v2 = Z.N)(a, b, c, d, e);
        f._sqlite3_step = (a) => (f._sqlite3_step = Z.O)(a);
        f._sqlite3_reset = (a) => (f._sqlite3_reset = Z.P)(a);
        f._sqlite3_exec = (a, b, c, d, e) => (f._sqlite3_exec = Z.Q)(a, b, c, d, e);
        f._sqlite3_finalize = (a) => (f._sqlite3_finalize = Z.R)(a);
        f._sqlite3_column_name = (a, b) => (f._sqlite3_column_name = Z.S)(a, b);
        f._sqlite3_column_text = (a, b) => (f._sqlite3_column_text = Z.T)(a, b);
        f._sqlite3_column_type = (a, b) => (f._sqlite3_column_type = Z.U)(a, b);
        f._sqlite3_errmsg = (a) => (f._sqlite3_errmsg = Z.V)(a);
        f._sqlite3_clear_bindings = (a) => (f._sqlite3_clear_bindings = Z.W)(a);
        f._sqlite3_value_blob = (a) => (f._sqlite3_value_blob = Z.X)(a);
        f._sqlite3_value_bytes = (a) => (f._sqlite3_value_bytes = Z.Y)(a);
        f._sqlite3_value_double = (a) => (f._sqlite3_value_double = Z.Z)(a);
        f._sqlite3_value_int = (a) => (f._sqlite3_value_int = Z._)(a);
        f._sqlite3_value_type = (a) => (f._sqlite3_value_type = Z.$)(a);
        f._sqlite3_result_blob = (a, b, c, d) => (f._sqlite3_result_blob = Z.aa)(a, b, c, d);
        f._sqlite3_result_double = (a, b) => (f._sqlite3_result_double = Z.ba)(a, b);
        f._sqlite3_result_error = (a, b, c) => (f._sqlite3_result_error = Z.ca)(a, b, c);
        f._sqlite3_result_int = (a, b) => (f._sqlite3_result_int = Z.da)(a, b);
        f._sqlite3_result_int64 = (a, b, c) => (f._sqlite3_result_int64 = Z.ea)(a, b, c);
        f._sqlite3_result_null = (a) => (f._sqlite3_result_null = Z.fa)(a);
        f._sqlite3_result_text = (a, b, c, d) => (f._sqlite3_result_text = Z.ga)(a, b, c, d);
        f._sqlite3_aggregate_context = (a, b) => (f._sqlite3_aggregate_context = Z.ha)(a, b);
        f._sqlite3_column_count = (a) => (f._sqlite3_column_count = Z.ia)(a);
        f._sqlite3_data_count = (a) => (f._sqlite3_data_count = Z.ja)(a);
        f._sqlite3_column_blob = (a, b) => (f._sqlite3_column_blob = Z.ka)(a, b);
        f._sqlite3_column_bytes = (a, b) => (f._sqlite3_column_bytes = Z.la)(a, b);
        f._sqlite3_column_double = (a, b) => (f._sqlite3_column_double = Z.ma)(a, b);
        f._sqlite3_bind_blob = (a, b, c, d, e) => (f._sqlite3_bind_blob = Z.na)(a, b, c, d, e);
        f._sqlite3_bind_double = (a, b, c) => (f._sqlite3_bind_double = Z.oa)(a, b, c);
        f._sqlite3_bind_int = (a, b, c) => (f._sqlite3_bind_int = Z.pa)(a, b, c);
        f._sqlite3_bind_text = (a, b, c, d, e) => (f._sqlite3_bind_text = Z.qa)(a, b, c, d, e);
        f._sqlite3_bind_parameter_index = (a, b) => (f._sqlite3_bind_parameter_index = Z.ra)(a, b);
        f._sqlite3_sql = (a) => (f._sqlite3_sql = Z.sa)(a);
        f._sqlite3_normalized_sql = (a) => (f._sqlite3_normalized_sql = Z.ta)(a);
        f._sqlite3_changes = (a) => (f._sqlite3_changes = Z.ua)(a);
        f._sqlite3_close_v2 = (a) => (f._sqlite3_close_v2 = Z.va)(a);
        f._sqlite3_create_function_v2 = (a, b, c, d, e, h, k, r, z) => (f._sqlite3_create_function_v2 = Z.wa)(a, b, c, d, e, h, k, r, z);
        f._sqlite3_open = (a, b) => (f._sqlite3_open = Z.xa)(a, b);
        var ia = f._malloc = (a) => (ia = f._malloc = Z.ya)(a), fa = f._free = (a) => (fa = f._free = Z.za)(a);
        f._RegisterExtensionFunctions = (a) => (f._RegisterExtensionFunctions = Z.Aa)(a);
        var Eb = (a, b) => (Eb = Z.Ba)(a, b), ua = (a) => (ua = Z.Ca)(a), y = (a) => (y = Z.Da)(a), ra = () => (ra = Z.Ea)();
        f.stackSave = () => ra();
        f.stackRestore = (a) => ua(a);
        f.stackAlloc = (a) => y(a);
        f.cwrap = (a, b, c, d) => {
          var e = !c || c.every((h) => "number" === h || "boolean" === h);
          return "string" !== b && e && !d ? f["_" + a] : (...h) => Sc(a, b, c, h);
        };
        f.addFunction = Aa;
        f.removeFunction = wa;
        f.UTF8ToString = ta;
        f.ALLOC_NORMAL = ea;
        f.allocate = da;
        f.allocateUTF8OnStack = va;
        var Wc;
        Wa = function Xc() {
          Wc || Yc();
          Wc || (Wa = Xc);
        };
        function Yc() {
          function a() {
            if (!Wc && (Wc = true, f.calledRun = true, !Ka)) {
              f.noFSInit || ec || (ec = true, f.stdin = f.stdin, f.stdout = f.stdout, f.stderr = f.stderr, f.stdin ? Fc("stdin", f.stdin) : Xb("/dev/tty", "/dev/stdin"), f.stdout ? Fc("stdout", null, f.stdout) : Xb("/dev/tty", "/dev/stdout"), f.stderr ? Fc("stderr", null, f.stderr) : Xb("/dev/tty1", "/dev/stderr"), na("/dev/stdin", 0), na("/dev/stdout", 1), na("/dev/stderr", 1));
              Jb = false;
              cb(Qa);
              f.onRuntimeInitialized?.();
              if (f.postRun) for ("function" == typeof f.postRun && (f.postRun = [f.postRun]); f.postRun.length; ) {
                var b = f.postRun.shift();
                Sa.unshift(b);
              }
              cb(Sa);
            }
          }
          if (!(0 < Ua)) {
            if (f.preRun) for ("function" == typeof f.preRun && (f.preRun = [f.preRun]); f.preRun.length; ) Ta();
            cb(Pa);
            0 < Ua || (f.setStatus ? (f.setStatus("Running..."), setTimeout(function() {
              setTimeout(function() {
                f.setStatus("");
              }, 1);
              a();
            }, 1)) : a());
          }
        }
        if (f.preInit) for ("function" == typeof f.preInit && (f.preInit = [f.preInit]); 0 < f.preInit.length; ) f.preInit.pop()();
        Yc();
        return Module;
      });
      return initSqlJsPromise;
    };
    {
      module.exports = initSqlJs;
      module.exports.default = initSqlJs;
    }
  })(sqlWasm);
  return sqlWasm.exports;
}
var sqlWasmExports = requireSqlWasm();
const InitSqlJS = /* @__PURE__ */ getDefaultExportFromCjs(sqlWasmExports);
const WasmUrl = "" + new URL("sql-wasm-Bku9E_kW.wasm", import.meta.url).href;
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
async function checkIntegrity(db2) {
  const { rows } = await executeSQL(db2, "PRAGMA integrity_check");
  if (!rows.length) {
    return false;
  }
  return rows[0].integrity_check === "ok";
}
async function getOrSetDBVersion(db2, version2) {
  if (version2) {
    await executeSQL(db2, `PRAGMA user_version = ${version2}`);
    return version2;
  }
  const { rows } = await executeSQL(db2, "PRAGMA user_version");
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
async function savePoint(db2, name) {
  const _name = name?.toUpperCase() || `SP_${Date.now() % 1e12}_${Math.floor(Math.random() * 1e4)}`;
  await sql`SAVEPOINT ${sql.raw(_name)}`.execute(db2);
  return {
    release: async () => {
      await sql`RELEASE SAVEPOINT ${sql.raw(_name)}`.execute(db2);
    },
    rollback: async () => {
      await sql`ROLLBACK TO SAVEPOINT ${sql.raw(_name)}`.execute(db2);
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
async function parseTable(db2, tableName, hasAutoIncrement) {
  const result = {
    columns: {},
    primary: [],
    unique: [],
    index: [],
    trigger: []
  };
  const cols = (await sql`SELECT "name", "type", "notnull", "dflt_value", "pk" FROM PRAGMA_TABLE_INFO(${tableName})`.execute(db2)).rows;
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
  const indexes = (await sql`SELECT "origin", (SELECT GROUP_CONCAT(name) FROM PRAGMA_INDEX_INFO(i.name)) as "columns" FROM PRAGMA_INDEX_LIST(${tableName}) as i WHERE "origin" != 'pk'`.execute(db2)).rows;
  for (const { columns, origin } of indexes) {
    result[origin === "u" ? "unique" : "index"].push(
      columns.split(",").map((c) => c.trim())
    );
  }
  return result;
}
async function parseExistSchema(db2, prefix = []) {
  const extraColumns = prefix.length ? ` AND ${prefix.map((t) => `"name" NOT LIKE '${t}%'`).join(" AND ")}` : "";
  const tables2 = (await sql`SELECT "type", "tbl_name" AS "table", CASE WHEN "sql" LIKE '%PRIMARY KEY AUTOINCREMENT%' THEN 1 ELSE "name" END AS "name" FROM "sqlite_master" WHERE "type" IN ('table', 'trigger') AND "name" NOT LIKE 'SQLITE_%'${sql.raw(extraColumns)} ORDER BY "type"`.execute(db2)).rows;
  const tableMap = {};
  for (const { name, table, type } of tables2) {
    if (type === "table") {
      tableMap[table] = await parseTable(db2, table, name === 1);
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
async function syncTables(db2, targetSchema, options = {}, logger) {
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
    oldVersion = await getOrSetDBVersion(db2);
    if (skipSyncWhenSame && current === oldVersion) {
      return { ready: true };
    }
    await getOrSetDBVersion(db2, current);
  }
  const debug = (e) => log && logger?.debug(e);
  debug("Sync tables start");
  const existSchema = await parseExistSchema(db2, excludeTablePrefix);
  let i = 0;
  let sqls = [];
  try {
    sqls = generateSyncTableSQL(
      db2,
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
  return await db2.transaction().execute(async (trx) => {
    for (; i < sqls.length; i++) {
      await executeSQL(trx, sqls[i]);
    }
  }).then(async () => {
    await onSuccess?.(db2, existSchema, oldVersion);
    debug("Sync success");
    return { ready: true };
  }).catch(async (e) => {
    await onError?.(e, sqls[i], existSchema, targetSchema);
    debug(`Sync failed, ${e}`);
    return { ready: false, error: e };
  });
}
var defaultFallbackFunction = ({ target }) => target.parsedType === "TEXT" ? sql`'0'` : sql`0`;
function generateSyncTableSQL(db2, existSchema, targetSchema, truncateIfExists = [], debug = () => {
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
        sqls.push(...createTableWithIndexAndTrigger(db2, existTableName, targetTable));
      } else {
        debug(`- Update table "${existTableName}"`);
        sqls.push(...updateTable(db2, existTableName, existTable, targetTable, fallback));
      }
    } else {
      debug(`- Delete table "${existTableName}"`);
      sqls.push(dropTable(existTableName));
    }
  }
  for (const [targetTableName, targetTable] of targetSchemaMap) {
    if (!existTableMap.has(targetTableName)) {
      debug(`- Create table "${targetTableName}"`);
      sqls.push(...createTableWithIndexAndTrigger(db2, targetTableName, targetTable));
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
  return existPK.some((v, i) => v !== targetPK[i]);
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
  return async (db2, logger) => await syncTables(
    db2,
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
  const db2 = new SqliteBuilder({
    dialect: dialect2
    // onQuery: true,
  });
  const result = await db2.syncDB(useSchema(tables));
  if (!result.ready) {
    throw result.error;
  }
  console.log(await db2.execute(`PRAGMA table_info('test')`));
  for (let i = 0; i < 10; i++) {
    await db2.transaction(async () => {
      await db2.transaction(async () => {
        if (i > 8) {
          console.log("test rollback");
          throw new Error("test rollback");
        }
        await db2.insertInto("test").values({
          name: `test at ${Date.now()}`,
          blobtest: Uint8Array.from([2, 3, 4, 5, 6, 7, 8])
        }).execute();
      });
    });
  }
  try {
    for await (const v of db2.selectFrom("test").selectAll().stream(2)) {
      console.log("Stream Query", v);
    }
  } catch (error) {
    console.warn(error);
  }
  return db2.selectFrom("test").selectAll().execute().then(async (data) => {
    await db2.destroy();
    console.log(data);
    return data;
  });
}
let db;
const dialect = new SqlJsDialect({
  async database() {
    const SQL = await InitSqlJS({
      // locateFile: file => `https://sql.js.org/dist/${file}`,
      locateFile: () => WasmUrl
    });
    db = new SQL.Database(await loadFile("sqljs"));
    return db;
  }
});
function useDB() {
  const result = ref();
  function run() {
    testDB(dialect).then((data) => {
      result.value = data;
      writeFile("sqljs", db?.export());
    });
  }
  return { result, run };
}
function WorkerWrapper$1(options) {
  return new Worker(
    "" + new URL("officialWasmWorker-G-xcDywo.js", import.meta.url).href,
    {
      type: "module",
      name: options?.name
    }
  );
}
function WorkerWrapper(options) {
  return new Worker(
    "" + new URL("sqljsWorker-D2OrVAVp.js", import.meta.url).href,
    {
      type: "module",
      name: options?.name
    }
  );
}
const wasmURL = "" + new URL("wa-sqlite-async-DOzpRqQg.wasm", import.meta.url).href;
Object.getPrototypeOf(async function() {
}).constructor;
Object.getPrototypeOf(async function() {
}).constructor;
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
      root.getFileHandle("_CHECK", { create: true }).then((handle) => handle.createSyncAccessHandle()).then((access) => (access.close(), root.removeEntry("_CHECK"))).then(() => resolve(true)).catch(
        () => root.removeEntry("_CHECK").then(() => resolve(false)).catch(() => resolve(false))
      );
    }).catch(() => resolve(false));
  });
  if ("importScripts" in globalThis) {
    return await inner();
  }
  try {
    if (typeof Worker === "undefined" || typeof Promise === "undefined") {
      return false;
    }
    const url = URL.createObjectURL(
      new Blob(
        [`(${inner})().then(postMessage)`],
        { type: "text/javascript" }
      )
    );
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
function isModuleWorkerSupport() {
  let supports = false;
  try {
    new Worker("data:,", {
      // @ts-expect-error check assign
      get type() {
        supports = true;
      }
    }).terminate();
  } finally {
    return supports;
  }
}
var initEvent = "0";
var runEvent = "1";
var closeEvent = "2";
var dataEvent = "3";
var endEvent = "4";
var handleWebWorker = (worker, cb) => worker.onmessage = ({ data }) => cb(data);
var GenericSqliteWorkerDriver = class extends BaseSqliteDriver {
  constructor(executor, onCreateConnection) {
    super(async () => {
      const exec = await executor();
      this.mitt = exec.mitt;
      this.worker = exec.worker;
      exec.handle(
        this.worker,
        ([type, ...msg]) => this.mitt.emit(type, ...msg)
      );
      this.worker.postMessage([
        initEvent,
        exec.data || {}
      ]);
      await new Promise((resolve, reject) => {
        this.mitt.once(initEvent, (_, err) => err ? reject(err) : resolve());
      });
      this.conn = new GenericSqliteWorkerConnection(this.worker, this.mitt);
      await onCreateConnection?.(this.conn);
    });
    __publicField(this, "worker");
    __publicField(this, "mitt");
  }
  async destroy() {
    if (!this.worker) {
      return;
    }
    this.worker.postMessage([closeEvent]);
    return new Promise((resolve, reject) => {
      this.mitt?.once(closeEvent, (_, err) => {
        if (err) {
          reject(err);
        } else {
          this.worker?.terminate();
          this.mitt?.off();
          this.mitt = this.worker = void 0;
          resolve();
        }
      });
    });
  }
};
var GenericSqliteWorkerConnection = class {
  constructor(worker, mitt2) {
    this.worker = worker;
    this.mitt = mitt2;
  }
  async *streamQuery({ parameters, sql: sql2, query }) {
    this.worker.postMessage([
      dataEvent,
      SelectQueryNode.is(query),
      sql2,
      parameters
    ]);
    let done = false;
    let resolveFn;
    let rejectFn;
    this.mitt.on(dataEvent, (data, err) => {
      if (err) {
        rejectFn(err);
      } else {
        resolveFn([{ rows: [data] }, false]);
      }
    });
    this.mitt.on(endEvent, (_, err) => {
      if (err) {
        rejectFn(err);
      } else {
        resolveFn([void 0, true]);
      }
    });
    while (!done) {
      const [data, isDone] = await new Promise((res, rej) => {
        resolveFn = res;
        rejectFn = rej;
      });
      if (isDone) {
        done = true;
        this.mitt?.off(dataEvent);
        this.mitt?.off(endEvent);
      } else {
        yield data;
      }
    }
  }
  async executeQuery(compiledQuery) {
    const { parameters, sql: sql2, query } = compiledQuery;
    this.worker.postMessage([
      runEvent,
      SelectQueryNode.is(query),
      sql2,
      parameters
    ]);
    return await new Promise((resolve, reject) => {
      if (!this.mitt) {
        reject(new Error("kysely instance has been destroyed"));
      }
      this.mitt.once(runEvent, (data, err) => !err && data ? resolve(data) : reject(err));
    });
  }
};
var GenericSqliteWorkerDialect = class extends BaseSqliteDialect {
  /**
   * Dialect for generic SQLite that run SQLs in worker thread
   *
   * @param executor function to create {@link IGenericSqliteWorkerExecutor}
   * @param onCreateConnection optional callback after connection created
   */
  constructor(executor, onCreateConnection) {
    super(() => new GenericSqliteWorkerDriver(executor, onCreateConnection));
  }
};
var mitt = (map = /* @__PURE__ */ new Map()) => ({
  on(event, handler) {
    map.get(event)?.push(handler) || map.set(event, [handler]);
  },
  off(event, handler) {
    let handlers;
    event ? handler ? (handlers = map.get(event)) && handlers.splice(handlers.indexOf(handler), 1) : map.set(event, []) : map.clear();
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
var WaSqliteWorkerDialect = class extends GenericSqliteWorkerDialect {
  constructor(config) {
    const { onCreateConnection, worker, fileName, preferOPFS, url, message } = config;
    super(
      async () => {
        const supportModule = isModuleWorkerSupport();
        const useOPFS = preferOPFS ? await isOpfsSupported() : false;
        const m = mitt();
        await message?.(m);
        return {
          data: {
            fileName,
            useOPFS,
            url: typeof url === "function" ? url(!useOPFS) : url
          },
          worker: worker ? worker instanceof globalThis.Worker ? worker : worker(supportModule) : supportModule ? new Worker(new URL(
            /* @vite-ignore */
            "" + new URL("worker-DI1Y0e_i.js", import.meta.url).href,
            import.meta.url
          ), { type: "module" }) : new Worker(new URL(
            /* @vite-ignore */
            "" + new URL("worker-BhxyJfkp.js", import.meta.url).href,
            import.meta.url
          )),
          mitt: m,
          handle: handleWebWorker
        };
      },
      onCreateConnection
    );
  }
};
async function useWaSqliteWorker() {
  const dialect2 = new WaSqliteWorkerDialect({
    fileName: "wa-sqlite-worker-test",
    // test classic worker
    // worker: () => new Worker(
    //   new URL('kysely-wasqlite-worker/worker-classic', import.meta.url),
    // ),
    // test custom wasm URL
    url: () => wasmURL
  });
  console.log("start wa-sqlite-worker test");
  testDB(dialect2).then(async (data) => {
    data?.forEach((e) => console.log("[wa-sqlite-worker]", e));
  });
}
const _hoisted_1 = { class: "buttons" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    const sqljsWorker = new WorkerWrapper();
    const { result, run } = useDB();
    const officialWorker = new WorkerWrapper$1();
    function testSqljsMain() {
      run();
    }
    function testSqljsWorker() {
      sqljsWorker.postMessage("");
    }
    function testOfficialWasm() {
      officialWorker.postMessage("");
    }
    function testWaSqliteWorker() {
      useWaSqliteWorker();
    }
    async function deleteDatabase() {
      try {
        const dbs = await window.indexedDB.databases();
        dbs.forEach((db2) => window.indexedDB.deleteDatabase(db2.name));
      } catch {
      }
    }
    async function clear() {
      console.clear();
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
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[5] || (_cache[5] = createBaseVNode("h1", null, [
          createTextVNode(" test "),
          createBaseVNode("a", {
            href: "https://github.com/kysely-org/kysely",
            target: "_blank"
          }, "Kysely"),
          createTextVNode(" WASM dialect ")
        ], -1)),
        _cache[6] || (_cache[6] = createBaseVNode("br", null, null, -1)),
        _cache[7] || (_cache[7] = createBaseVNode("h3", null, "see worker result in console", -1)),
        _cache[8] || (_cache[8] = createBaseVNode("h3", null, [
          createTextVNode(" you can explore "),
          createBaseVNode("a", {
            href: "https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API#origin_private_file_system",
            target: "_blank"
          }, " OPFS "),
          createTextVNode(" file using "),
          createBaseVNode("a", {
            href: "https://chrome.google.com/webstore/detail/opfs-explorer/acndjpgkpaclldomagafnognkcgjignd",
            target: "_blank"
          }, " opfs-explorer ")
        ], -1)),
        _cache[9] || (_cache[9] = createBaseVNode("br", null, null, -1)),
        createBaseVNode("div", _hoisted_1, [
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
            onClick: _cache[3] || (_cache[3] = ($event) => testWaSqliteWorker())
          }, " test wa-sqlite in Worker (Better Compability) "),
          createBaseVNode("button", {
            onClick: _cache[4] || (_cache[4] = ($event) => clear())
          }, " clear ")
        ]),
        _cache[10] || (_cache[10] = createBaseVNode("br", null, null, -1)),
        _cache[11] || (_cache[11] = createBaseVNode("div", null, " result run in main thread: ", -1)),
        createBaseVNode("pre", null, "" + toDisplayString(unref(result)) + "\n  ", 1)
      ], 64);
    };
  }
});
createApp(_sfc_main).mount("#root");
