//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esmMin = (fn, res, err) => () => {
	if (err) throw err[0];
	try {
		return fn && (res = fn(fn = 0)), res;
	} catch (e) {
		throw err = [e], e;
	}
};
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region ../node_modules/.pnpm/solid-js@1.9.13/node_modules/solid-js/dist/solid.js
var sharedConfig = {
	context: void 0,
	registry: void 0,
	effects: void 0,
	done: false,
	getContextId() {
		return getContextId(this.context.count);
	},
	getNextContextId() {
		return getContextId(this.context.count++);
	}
};
function getContextId(count) {
	const num = String(count), len = num.length - 1;
	return sharedConfig.context.id + (len ? String.fromCharCode(96 + len) : "") + num;
}
function setHydrateContext(context) {
	sharedConfig.context = context;
}
function nextHydrateContext() {
	return {
		...sharedConfig.context,
		id: sharedConfig.getNextContextId(),
		count: 0
	};
}
var equalFn = (a, b) => a === b;
var $TRACK = Symbol("solid-track");
var signalOptions = { equals: equalFn };
var ERROR = null;
var runEffects = runQueue;
var STALE = 1;
var PENDING = 2;
var UNOWNED = {
	owned: null,
	cleanups: null,
	context: null,
	owner: null
};
var Owner = null;
var Transition = null;
var Scheduler = null;
var ExternalSourceConfig = null;
var Listener = null;
var Updates = null;
var Effects = null;
var ExecCount = 0;
function createRoot(fn, detachedOwner) {
	const listener = Listener, owner = Owner, unowned = fn.length === 0, current = detachedOwner === void 0 ? owner : detachedOwner, root = unowned ? UNOWNED : {
		owned: null,
		cleanups: null,
		context: current ? current.context : null,
		owner: current
	}, updateFn = unowned ? fn : () => fn(() => untrack(() => cleanNode(root)));
	Owner = root;
	Listener = null;
	try {
		return runUpdates(updateFn, true);
	} finally {
		Listener = listener;
		Owner = owner;
	}
}
function createSignal(value, options) {
	options = options ? Object.assign({}, signalOptions, options) : signalOptions;
	const s = {
		value,
		observers: null,
		observerSlots: null,
		comparator: options.equals || void 0
	};
	const setter = (value) => {
		if (typeof value === "function") if (Transition && Transition.running && Transition.sources.has(s)) value = value(s.tValue);
		else value = value(s.value);
		return writeSignal(s, value);
	};
	return [readSignal.bind(s), setter];
}
function createRenderEffect(fn, value, options) {
	const c = createComputation(fn, value, false, STALE);
	if (Scheduler && Transition && Transition.running) Updates.push(c);
	else updateComputation(c);
}
function createMemo(fn, value, options) {
	options = options ? Object.assign({}, signalOptions, options) : signalOptions;
	const c = createComputation(fn, value, true, 0);
	c.observers = null;
	c.observerSlots = null;
	c.comparator = options.equals || void 0;
	if (Scheduler && Transition && Transition.running) {
		c.tState = STALE;
		Updates.push(c);
	} else updateComputation(c);
	return readSignal.bind(c);
}
function untrack(fn) {
	if (!ExternalSourceConfig && Listener === null) return fn();
	const listener = Listener;
	Listener = null;
	try {
		if (ExternalSourceConfig) return ExternalSourceConfig.untrack(fn);
		return fn();
	} finally {
		Listener = listener;
	}
}
function onCleanup(fn) {
	if (Owner === null);
	else if (Owner.cleanups === null) Owner.cleanups = [fn];
	else Owner.cleanups.push(fn);
	return fn;
}
function startTransition(fn) {
	if (Transition && Transition.running) {
		fn();
		return Transition.done;
	}
	const l = Listener;
	const o = Owner;
	return Promise.resolve().then(() => {
		Listener = l;
		Owner = o;
		let t;
		if (Scheduler || SuspenseContext) {
			t = Transition || (Transition = {
				sources: /* @__PURE__ */ new Set(),
				effects: [],
				promises: /* @__PURE__ */ new Set(),
				disposed: /* @__PURE__ */ new Set(),
				queue: /* @__PURE__ */ new Set(),
				running: true
			});
			t.done || (t.done = new Promise((res) => t.resolve = res));
			t.running = true;
		}
		runUpdates(fn, false);
		Listener = Owner = null;
		return t ? t.done : void 0;
	});
}
var [transPending, setTransPending] = /*@__PURE__*/ createSignal(false);
var SuspenseContext;
function readSignal() {
	const runningTransition = Transition && Transition.running;
	if (this.sources && (runningTransition ? this.tState : this.state)) if ((runningTransition ? this.tState : this.state) === STALE) updateComputation(this);
	else {
		const updates = Updates;
		Updates = null;
		runUpdates(() => lookUpstream(this), false);
		Updates = updates;
	}
	if (Listener) {
		const observers = this.observers;
		if (!observers || observers[observers.length - 1] !== Listener) {
			const sSlot = observers ? observers.length : 0;
			if (!Listener.sources) {
				Listener.sources = [this];
				Listener.sourceSlots = [sSlot];
			} else {
				Listener.sources.push(this);
				Listener.sourceSlots.push(sSlot);
			}
			if (!observers) {
				this.observers = [Listener];
				this.observerSlots = [Listener.sources.length - 1];
			} else {
				observers.push(Listener);
				this.observerSlots.push(Listener.sources.length - 1);
			}
		}
	}
	if (runningTransition && Transition.sources.has(this)) return this.tValue;
	return this.value;
}
function writeSignal(node, value, isComp) {
	let current = Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value;
	if (!node.comparator || !node.comparator(current, value)) {
		if (Transition) {
			const TransitionRunning = Transition.running;
			if (TransitionRunning || !isComp && Transition.sources.has(node)) {
				Transition.sources.add(node);
				node.tValue = value;
			}
			if (!TransitionRunning) node.value = value;
		} else node.value = value;
		if (node.observers && node.observers.length) runUpdates(() => {
			for (let i = 0; i < node.observers.length; i += 1) {
				const o = node.observers[i];
				const TransitionRunning = Transition && Transition.running;
				if (TransitionRunning && Transition.disposed.has(o)) continue;
				if (TransitionRunning ? !o.tState : !o.state) {
					if (o.pure) Updates.push(o);
					else Effects.push(o);
					if (o.observers) markDownstream(o);
				}
				if (!TransitionRunning) o.state = STALE;
				else o.tState = STALE;
			}
			if (Updates.length > 1e6) {
				Updates = [];
				throw new Error();
			}
		}, false);
	}
	return value;
}
function updateComputation(node) {
	if (!node.fn) return;
	cleanNode(node);
	const time = ExecCount;
	runComputation(node, Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value, time);
	if (Transition && !Transition.running && Transition.sources.has(node)) queueMicrotask(() => {
		runUpdates(() => {
			Transition && (Transition.running = true);
			Listener = Owner = node;
			runComputation(node, node.tValue, time);
			Listener = Owner = null;
		}, false);
	});
}
function runComputation(node, value, time) {
	let nextValue;
	const owner = Owner, listener = Listener;
	Listener = Owner = node;
	try {
		nextValue = node.fn(value);
	} catch (err) {
		if (node.pure) if (Transition && Transition.running) {
			node.tState = STALE;
			node.tOwned && node.tOwned.forEach(cleanNode);
			node.tOwned = void 0;
		} else {
			node.state = STALE;
			node.owned && node.owned.forEach(cleanNode);
			node.owned = null;
		}
		node.updatedAt = time + 1;
		return handleError(err);
	} finally {
		Listener = listener;
		Owner = owner;
	}
	if (!node.updatedAt || node.updatedAt <= time) {
		if (node.updatedAt != null && "observers" in node) writeSignal(node, nextValue, true);
		else if (Transition && Transition.running && node.pure) {
			if (!Transition.sources.has(node)) node.value = nextValue;
			Transition.sources.add(node);
			node.tValue = nextValue;
		} else node.value = nextValue;
		node.updatedAt = time;
	}
}
function createComputation(fn, init, pure, state = STALE, options) {
	const c = {
		fn,
		state,
		updatedAt: null,
		owned: null,
		sources: null,
		sourceSlots: null,
		cleanups: null,
		value: init,
		owner: Owner,
		context: Owner ? Owner.context : null,
		pure
	};
	if (Transition && Transition.running) {
		c.state = 0;
		c.tState = state;
	}
	if (Owner === null);
	else if (Owner !== UNOWNED) if (Transition && Transition.running && Owner.pure) if (!Owner.tOwned) Owner.tOwned = [c];
	else Owner.tOwned.push(c);
	else if (!Owner.owned) Owner.owned = [c];
	else Owner.owned.push(c);
	if (ExternalSourceConfig && c.fn) {
		const sourceFn = c.fn;
		const [track, trigger] = createSignal(void 0, { equals: false });
		const ordinary = ExternalSourceConfig.factory(sourceFn, trigger);
		onCleanup(() => ordinary.dispose());
		let inTransition;
		const triggerInTransition = () => startTransition(trigger).then(() => {
			if (inTransition) {
				inTransition.dispose();
				inTransition = void 0;
			}
		});
		c.fn = (x) => {
			track();
			if (Transition && Transition.running) {
				if (!inTransition) inTransition = ExternalSourceConfig.factory(sourceFn, triggerInTransition);
				return inTransition.track(x);
			}
			return ordinary.track(x);
		};
	}
	return c;
}
function runTop(node) {
	const runningTransition = Transition && Transition.running;
	if ((runningTransition ? node.tState : node.state) === 0) return;
	if ((runningTransition ? node.tState : node.state) === PENDING) return lookUpstream(node);
	if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
	const ancestors = [node];
	while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
		if (runningTransition && Transition.disposed.has(node)) return;
		if (runningTransition ? node.tState : node.state) ancestors.push(node);
	}
	for (let i = ancestors.length - 1; i >= 0; i--) {
		node = ancestors[i];
		if (runningTransition) {
			let top = node, prev = ancestors[i + 1];
			while ((top = top.owner) && top !== prev) if (Transition.disposed.has(top)) return;
		}
		if ((runningTransition ? node.tState : node.state) === STALE) updateComputation(node);
		else if ((runningTransition ? node.tState : node.state) === PENDING) {
			const updates = Updates;
			Updates = null;
			runUpdates(() => lookUpstream(node, ancestors[0]), false);
			Updates = updates;
		}
	}
}
function runUpdates(fn, init) {
	if (Updates) return fn();
	let wait = false;
	if (!init) Updates = [];
	if (Effects) wait = true;
	else Effects = [];
	ExecCount++;
	try {
		const res = fn();
		completeUpdates(wait);
		return res;
	} catch (err) {
		if (!wait) Effects = null;
		Updates = null;
		handleError(err);
	}
}
function completeUpdates(wait) {
	if (Updates) {
		if (Scheduler && Transition && Transition.running) scheduleQueue(Updates);
		else runQueue(Updates);
		Updates = null;
	}
	if (wait) return;
	let res;
	if (Transition) {
		if (!Transition.promises.size && !Transition.queue.size) {
			const sources = Transition.sources;
			const disposed = Transition.disposed;
			Effects.push.apply(Effects, Transition.effects);
			res = Transition.resolve;
			for (const e of Effects) {
				"tState" in e && (e.state = e.tState);
				delete e.tState;
			}
			Transition = null;
			runUpdates(() => {
				for (const d of disposed) cleanNode(d);
				for (const v of sources) {
					v.value = v.tValue;
					if (v.owned) for (let i = 0, len = v.owned.length; i < len; i++) cleanNode(v.owned[i]);
					if (v.tOwned) v.owned = v.tOwned;
					delete v.tValue;
					delete v.tOwned;
					v.tState = 0;
				}
				setTransPending(false);
			}, false);
		} else if (Transition.running) {
			Transition.running = false;
			Transition.effects.push.apply(Transition.effects, Effects);
			Effects = null;
			setTransPending(true);
			return;
		}
	}
	const e = Effects;
	Effects = null;
	if (e.length) runUpdates(() => runEffects(e), false);
	if (res) res();
}
function runQueue(queue) {
	for (let i = 0; i < queue.length; i++) runTop(queue[i]);
}
function scheduleQueue(queue) {
	for (let i = 0; i < queue.length; i++) {
		const item = queue[i];
		const tasks = Transition.queue;
		if (!tasks.has(item)) {
			tasks.add(item);
			Scheduler(() => {
				tasks.delete(item);
				runUpdates(() => {
					Transition.running = true;
					runTop(item);
				}, false);
				Transition && (Transition.running = false);
			});
		}
	}
}
function lookUpstream(node, ignore) {
	const runningTransition = Transition && Transition.running;
	if (runningTransition) node.tState = 0;
	else node.state = 0;
	for (let i = 0; i < node.sources.length; i += 1) {
		const source = node.sources[i];
		if (source.sources) {
			const state = runningTransition ? source.tState : source.state;
			if (state === STALE) {
				if (source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount)) runTop(source);
			} else if (state === PENDING) lookUpstream(source, ignore);
		}
	}
}
function markDownstream(node) {
	const runningTransition = Transition && Transition.running;
	for (let i = 0; i < node.observers.length; i += 1) {
		const o = node.observers[i];
		if (runningTransition ? !o.tState : !o.state) {
			if (runningTransition) o.tState = PENDING;
			else o.state = PENDING;
			if (o.pure) Updates.push(o);
			else Effects.push(o);
			o.observers && markDownstream(o);
		}
	}
}
function cleanNode(node) {
	let i;
	if (node.sources) while (node.sources.length) {
		const source = node.sources.pop(), index = node.sourceSlots.pop(), obs = source.observers;
		if (obs && obs.length) {
			const n = obs.pop(), s = source.observerSlots.pop();
			if (index < obs.length) {
				n.sourceSlots[s] = index;
				obs[index] = n;
				source.observerSlots[index] = s;
			}
		}
	}
	if (node.tOwned) {
		for (i = node.tOwned.length - 1; i >= 0; i--) cleanNode(node.tOwned[i]);
		delete node.tOwned;
	}
	if (Transition && Transition.running && node.pure) reset(node, true);
	else if (node.owned) {
		for (i = node.owned.length - 1; i >= 0; i--) cleanNode(node.owned[i]);
		node.owned = null;
	}
	if (node.cleanups) {
		for (i = node.cleanups.length - 1; i >= 0; i--) node.cleanups[i]();
		node.cleanups = null;
	}
	if (Transition && Transition.running) node.tState = 0;
	else node.state = 0;
}
function reset(node, top) {
	if (!top) {
		node.tState = 0;
		Transition.disposed.add(node);
	}
	if (node.owned) for (let i = 0; i < node.owned.length; i++) reset(node.owned[i]);
}
function castError(err) {
	if (err instanceof Error) return err;
	return new Error(typeof err === "string" ? err : "Unknown error", { cause: err });
}
function runErrors(err, fns, owner) {
	try {
		for (const f of fns) f(err);
	} catch (e) {
		handleError(e, owner && owner.owner || null);
	}
}
function handleError(err, owner = Owner) {
	const fns = ERROR && owner && owner.context && owner.context[ERROR];
	const error = castError(err);
	if (!fns) throw error;
	if (Effects) Effects.push({
		fn() {
			runErrors(error, fns, owner);
		},
		state: STALE
	});
	else runErrors(error, fns, owner);
}
var FALLBACK = Symbol("fallback");
function dispose(d) {
	for (let i = 0; i < d.length; i++) d[i]();
}
function mapArray(list, mapFn, options = {}) {
	let items = [], mapped = [], disposers = [], len = 0, indexes = mapFn.length > 1 ? [] : null;
	onCleanup(() => dispose(disposers));
	return () => {
		let newItems = list() || [], newLen = newItems.length, i, j;
		newItems[$TRACK];
		return untrack(() => {
			let newIndices, newIndicesNext, temp, tempdisposers, tempIndexes, start, end, newEnd, item;
			if (newLen === 0) {
				if (len !== 0) {
					dispose(disposers);
					disposers = [];
					items = [];
					mapped = [];
					len = 0;
					indexes && (indexes = []);
				}
				if (options.fallback) {
					items = [FALLBACK];
					mapped[0] = createRoot((disposer) => {
						disposers[0] = disposer;
						return options.fallback();
					});
					len = 1;
				}
			} else if (len === 0) {
				mapped = new Array(newLen);
				for (j = 0; j < newLen; j++) {
					items[j] = newItems[j];
					mapped[j] = createRoot(mapper);
				}
				len = newLen;
			} else {
				temp = new Array(newLen);
				tempdisposers = new Array(newLen);
				indexes && (tempIndexes = new Array(newLen));
				for (start = 0, end = Math.min(len, newLen); start < end && items[start] === newItems[start]; start++);
				for (end = len - 1, newEnd = newLen - 1; end >= start && newEnd >= start && items[end] === newItems[newEnd]; end--, newEnd--) {
					temp[newEnd] = mapped[end];
					tempdisposers[newEnd] = disposers[end];
					indexes && (tempIndexes[newEnd] = indexes[end]);
				}
				newIndices = /* @__PURE__ */ new Map();
				newIndicesNext = new Array(newEnd + 1);
				for (j = newEnd; j >= start; j--) {
					item = newItems[j];
					i = newIndices.get(item);
					newIndicesNext[j] = i === void 0 ? -1 : i;
					newIndices.set(item, j);
				}
				for (i = start; i <= end; i++) {
					item = items[i];
					j = newIndices.get(item);
					if (j !== void 0 && j !== -1) {
						temp[j] = mapped[i];
						tempdisposers[j] = disposers[i];
						indexes && (tempIndexes[j] = indexes[i]);
						j = newIndicesNext[j];
						newIndices.set(item, j);
					} else disposers[i]();
				}
				for (j = start; j < newLen; j++) if (j in temp) {
					mapped[j] = temp[j];
					disposers[j] = tempdisposers[j];
					if (indexes) {
						indexes[j] = tempIndexes[j];
						indexes[j](j);
					}
				} else mapped[j] = createRoot(mapper);
				mapped = mapped.slice(0, len = newLen);
				items = newItems.slice(0);
			}
			return mapped;
		});
		function mapper(disposer) {
			disposers[j] = disposer;
			if (indexes) {
				const [s, set] = createSignal(j);
				indexes[j] = set;
				return mapFn(newItems[j], s);
			}
			return mapFn(newItems[j]);
		}
	};
}
var hydrationEnabled = false;
function createComponent(Comp, props) {
	if (hydrationEnabled) {
		if (sharedConfig.context) {
			const c = sharedConfig.context;
			setHydrateContext(nextHydrateContext());
			const r = untrack(() => Comp(props || {}));
			setHydrateContext(c);
			return r;
		}
	}
	return untrack(() => Comp(props || {}));
}
var narrowedError = (name) => `Stale read from <${name}>.`;
function For(props) {
	const fallback = "fallback" in props && { fallback: () => props.fallback };
	return createMemo(mapArray(() => props.each, props.children, fallback || void 0));
}
function Show(props) {
	const keyed = props.keyed;
	const conditionValue = createMemo(() => props.when, void 0, void 0);
	const condition = keyed ? conditionValue : createMemo(conditionValue, void 0, { equals: (a, b) => !a === !b });
	return createMemo(() => {
		const c = condition();
		if (c) {
			const child = props.children;
			return typeof child === "function" && child.length > 0 ? untrack(() => child(keyed ? c : () => {
				if (!untrack(condition)) throw narrowedError("Show");
				return conditionValue();
			})) : child;
		}
		return props.fallback;
	}, void 0, void 0);
}
//#endregion
//#region ../node_modules/.pnpm/solid-js@1.9.13/node_modules/solid-js/web/dist/web.js
var memo = (fn) => createMemo(() => fn());
function reconcileArrays(parentNode, a, b) {
	let bLength = b.length, aEnd = a.length, bEnd = bLength, aStart = 0, bStart = 0, after = a[aEnd - 1].nextSibling, map = null;
	while (aStart < aEnd || bStart < bEnd) {
		if (a[aStart] === b[bStart]) {
			aStart++;
			bStart++;
			continue;
		}
		while (a[aEnd - 1] === b[bEnd - 1]) {
			aEnd--;
			bEnd--;
		}
		if (aEnd === aStart) {
			const node = bEnd < bLength ? bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart] : after;
			while (bStart < bEnd) parentNode.insertBefore(b[bStart++], node);
		} else if (bEnd === bStart) while (aStart < aEnd) {
			if (!map || !map.has(a[aStart])) a[aStart].remove();
			aStart++;
		}
		else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
			const node = a[--aEnd].nextSibling;
			parentNode.insertBefore(b[bStart++], a[aStart++].nextSibling);
			parentNode.insertBefore(b[--bEnd], node);
			a[aEnd] = b[bEnd];
		} else {
			if (!map) {
				map = /* @__PURE__ */ new Map();
				let i = bStart;
				while (i < bEnd) map.set(b[i], i++);
			}
			const index = map.get(a[aStart]);
			if (index != null) if (bStart < index && index < bEnd) {
				let i = aStart, sequence = 1, t;
				while (++i < aEnd && i < bEnd) {
					if ((t = map.get(a[i])) == null || t !== index + sequence) break;
					sequence++;
				}
				if (sequence > index - bStart) {
					const node = a[aStart];
					while (bStart < index) parentNode.insertBefore(b[bStart++], node);
				} else parentNode.replaceChild(b[bStart++], a[aStart++]);
			} else aStart++;
			else a[aStart++].remove();
		}
	}
}
var $$EVENTS = "_$DX_DELEGATE";
function render(code, element, init, options = {}) {
	let disposer;
	createRoot((dispose) => {
		disposer = dispose;
		element === document ? code() : insert(element, code(), element.firstChild ? null : void 0, init);
	}, options.owner);
	return () => {
		disposer();
		element.textContent = "";
	};
}
function template(html, isImportNode, isSVG, isMathML) {
	let node;
	const create = () => {
		const t = isMathML ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
		t.innerHTML = html;
		return isSVG ? t.content.firstChild.firstChild : isMathML ? t.firstChild : t.content.firstChild;
	};
	const fn = isImportNode ? () => untrack(() => document.importNode(node || (node = create()), true)) : () => (node || (node = create())).cloneNode(true);
	fn.cloneNode = fn;
	return fn;
}
function delegateEvents(eventNames, document = window.document) {
	const e = document[$$EVENTS] || (document[$$EVENTS] = /* @__PURE__ */ new Set());
	for (let i = 0, l = eventNames.length; i < l; i++) {
		const name = eventNames[i];
		if (!e.has(name)) {
			e.add(name);
			document.addEventListener(name, eventHandler);
		}
	}
}
function insert(parent, accessor, marker, initial) {
	if (marker !== void 0 && !initial) initial = [];
	if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
	createRenderEffect((current) => insertExpression(parent, accessor(), current, marker), initial);
}
function isHydrating(node) {
	return !!sharedConfig.context && !sharedConfig.done && (!node || node.isConnected);
}
function eventHandler(e) {
	if (sharedConfig.registry && sharedConfig.events) {
		if (sharedConfig.events.find(([el, ev]) => ev === e)) return;
	}
	let node = e.target;
	const key = `$$${e.type}`;
	const oriTarget = e.target;
	const oriCurrentTarget = e.currentTarget;
	const retarget = (value) => Object.defineProperty(e, "target", {
		configurable: true,
		value
	});
	const handleNode = () => {
		const handler = node[key];
		if (handler && !node.disabled) {
			const data = node[`${key}Data`];
			data !== void 0 ? handler.call(node, data, e) : handler.call(node, e);
			if (e.cancelBubble) return;
		}
		node.host && typeof node.host !== "string" && !node.host._$host && node.contains(e.target) && retarget(node.host);
		return true;
	};
	const walkUpTree = () => {
		while (handleNode() && (node = node._$host || node.parentNode || node.host));
	};
	Object.defineProperty(e, "currentTarget", {
		configurable: true,
		get() {
			return node || document;
		}
	});
	if (sharedConfig.registry && !sharedConfig.done) sharedConfig.done = _$HY.done = true;
	if (e.composedPath) {
		const path = e.composedPath();
		retarget(path[0]);
		for (let i = 0; i < path.length - 2; i++) {
			node = path[i];
			if (!handleNode()) break;
			if (node._$host) {
				node = node._$host;
				walkUpTree();
				break;
			}
			if (node.parentNode === oriCurrentTarget) break;
		}
	} else walkUpTree();
	retarget(oriTarget);
}
function insertExpression(parent, value, current, marker, unwrapArray) {
	const hydrating = isHydrating(parent);
	if (hydrating) {
		!current && (current = [...parent.childNodes]);
		let cleaned = [];
		for (let i = 0; i < current.length; i++) {
			const node = current[i];
			if (node.nodeType === 8 && node.data.slice(0, 2) === "!$") node.remove();
			else cleaned.push(node);
		}
		current = cleaned;
	}
	while (typeof current === "function") current = current();
	if (value === current) return current;
	const t = typeof value, multi = marker !== void 0;
	parent = multi && current[0] && current[0].parentNode || parent;
	if (t === "string" || t === "number") {
		if (hydrating) return current;
		if (t === "number") {
			value = value.toString();
			if (value === current) return current;
		}
		if (multi) {
			let node = current[0];
			if (node && node.nodeType === 3) node.data !== value && (node.data = value);
			else node = document.createTextNode(value);
			current = cleanChildren(parent, current, marker, node);
		} else if (current !== "" && typeof current === "string") current = parent.firstChild.data = value;
		else current = parent.textContent = value;
	} else if (value == null || t === "boolean") {
		if (hydrating) return current;
		current = cleanChildren(parent, current, marker);
	} else if (t === "function") {
		createRenderEffect(() => {
			let v = value();
			while (typeof v === "function") v = v();
			current = insertExpression(parent, v, current, marker);
		});
		return () => current;
	} else if (Array.isArray(value)) {
		const array = [];
		const currentArray = current && Array.isArray(current);
		if (normalizeIncomingArray(array, value, current, unwrapArray)) {
			createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
			return () => current;
		}
		if (hydrating) {
			if (!array.length) return current;
			if (marker === void 0) return current = [...parent.childNodes];
			let node = array[0];
			if (node.parentNode !== parent) return current;
			const nodes = [node];
			while ((node = node.nextSibling) !== marker) nodes.push(node);
			return current = nodes;
		}
		if (array.length === 0) {
			current = cleanChildren(parent, current, marker);
			if (multi) return current;
		} else if (currentArray) if (current.length === 0) appendNodes(parent, array, marker);
		else reconcileArrays(parent, current, array);
		else {
			current && cleanChildren(parent);
			appendNodes(parent, array);
		}
		current = array;
	} else if (value.nodeType) {
		if (hydrating && value.parentNode) return current = multi ? [value] : value;
		if (Array.isArray(current)) {
			if (multi) return current = cleanChildren(parent, current, marker, value);
			cleanChildren(parent, current, null, value);
		} else if (current == null || current === "" || !parent.firstChild) parent.appendChild(value);
		else parent.replaceChild(value, parent.firstChild);
		current = value;
	}
	return current;
}
function normalizeIncomingArray(normalized, array, current, unwrap) {
	let dynamic = false;
	for (let i = 0, len = array.length; i < len; i++) {
		let item = array[i], prev = current && current[normalized.length], t;
		if (item == null || item === true || item === false);
		else if ((t = typeof item) === "object" && item.nodeType) normalized.push(item);
		else if (Array.isArray(item)) dynamic = normalizeIncomingArray(normalized, item, prev) || dynamic;
		else if (t === "function") if (unwrap) {
			while (typeof item === "function") item = item();
			dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item], Array.isArray(prev) ? prev : [prev]) || dynamic;
		} else {
			normalized.push(item);
			dynamic = true;
		}
		else {
			const value = String(item);
			if (prev && prev.nodeType === 3 && prev.data === value) normalized.push(prev);
			else normalized.push(document.createTextNode(value));
		}
	}
	return dynamic;
}
function appendNodes(parent, array, marker = null) {
	for (let i = 0, len = array.length; i < len; i++) parent.insertBefore(array[i], marker);
}
function cleanChildren(parent, current, marker, replacement) {
	if (marker === void 0) return parent.textContent = "";
	const node = replacement || document.createTextNode("");
	if (current.length) {
		let inserted = false;
		for (let i = current.length - 1; i >= 0; i--) {
			const el = current[i];
			if (node !== el) {
				const isParent = el.parentNode === parent;
				if (!inserted && !i) isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);
				else isParent && el.remove();
			} else inserted = true;
		}
	} else parent.insertBefore(node, marker);
	return [node];
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
var init_typeof = __esmMin((() => {}));
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
var init_toPrimitive = __esmMin((() => {
	init_typeof();
}));
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
var init_toPropertyKey = __esmMin((() => {
	init_typeof();
	init_toPrimitive();
}));
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
var init_defineProperty = __esmMin((() => {
	init_toPropertyKey();
}));
//#endregion
//#region src/modules/indexeddb.ts
init_defineProperty();
var DB_NAME = "sqlitevfs";
var LOADED_FILES = /* @__PURE__ */ new Map();
var MIN_GROW_BYTES = 2048;
var MAX_GROW_BYTES = 65536;
var _Buffer = class {
	constructor(data) {
		_defineProperty(this, "_data", void 0);
		_defineProperty(this, "_size", void 0);
		this._data = data ?? /* @__PURE__ */ new Uint8Array();
		this._size = this._data.length;
	}
	get size() {
		return this._size;
	}
	read(offset, buffer) {
		if (offset >= this._size) return 0;
		const toCopy = this._data.subarray(offset, Math.min(this._size, offset + buffer.length));
		buffer.set(toCopy);
		return toCopy.length;
	}
	reserve(capacity) {
		if (this._data.length >= capacity) return;
		const neededBytes = capacity - this._data.length;
		const growBy = Math.min(MAX_GROW_BYTES, Math.max(MIN_GROW_BYTES, this._data.length));
		const newArray = new Uint8Array(this._data.length + Math.max(growBy, neededBytes));
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
};
var indexedDB = globalThis.indexedDB || window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = new Promise((resolve, reject) => {
	const request = indexedDB.open(DB_NAME, 1);
	request.onupgradeneeded = () => request.result.createObjectStore("files", { keyPath: "name" });
	request.onsuccess = () => resolve(request.result);
	request.onerror = () => reject(request.error);
});
async function loadFile(fileName) {
	const db = await database;
	const file = await new Promise((resolve, reject) => {
		const request = db.transaction("files", "readonly").objectStore("files").get(fileName);
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
	if (file && !LOADED_FILES.has(fileName)) {
		const buffer = new _Buffer(file.data);
		LOADED_FILES.set(fileName, buffer);
		return buffer;
	} else if (LOADED_FILES.has(fileName)) return LOADED_FILES.get(fileName);
	else return null;
}
async function syncFile(fileName, data) {
	const db = await database;
	await new Promise((resolve, reject) => {
		const request = db.transaction("files", "readwrite").objectStore("files").put({
			name: fileName,
			data
		});
		request.onsuccess = () => resolve(true);
		request.onerror = () => reject(request.error);
	});
}
async function deleteFile(fileName) {
	LOADED_FILES.delete(fileName);
	const db = await database;
	await new Promise((resolve, reject) => {
		const request = db.transaction("files", "readwrite").objectStore("files").delete(fileName);
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
function isFunction(obj) {
	return typeof obj === "function";
}
function isObject(obj) {
	return typeof obj === "object" && obj !== null;
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
function getMessage(error) {
	return error instanceof Error ? error.message : String(error);
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/alter-table-node.js
/**
* @internal
*/
var AlterTableNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/identifier-node.js
/**
* @internal
*/
var IdentifierNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/create-index-node.js
/**
* @internal
*/
var CreateIndexNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/create-schema-node.js
/**
* @internal
*/
var CreateSchemaNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/create-table-node.js
var ON_COMMIT_ACTIONS = [
	"preserve rows",
	"delete rows",
	"drop"
];
/**
* @internal
*/
var CreateTableNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/schemable-identifier-node.js
/**
* @internal
*/
var SchemableIdentifierNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/drop-index-node.js
/**
* @internal
*/
var DropIndexNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/drop-schema-node.js
/**
* @internal
*/
var DropSchemaNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/drop-table-node.js
/**
* @internal
*/
var DropTableNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/alias-node.js
/**
* @internal
*/
var AliasNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/table-node.js
/**
* @internal
*/
var TableNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/operation-node-source.js
function isOperationNodeSource(obj) {
	return isObject(obj) && isFunction(obj.toOperationNode);
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/expression/expression.js
function isExpression(obj) {
	return isObject(obj) && "expressionType" in obj && isOperationNodeSource(obj);
}
function isAliasedExpression(obj) {
	return isObject(obj) && "expression" in obj && isString(obj.alias) && isOperationNodeSource(obj);
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
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/classPrivateFieldInitSpec.js
function _classPrivateFieldInitSpec(e, t, a) {
	_checkPrivateRedeclaration(e, t), t.set(e, a);
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/assertClassBrand.js
function _assertClassBrand(e, t, n) {
	if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw new TypeError("Private element is not present on this object");
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/classPrivateFieldSet2.js
function _classPrivateFieldSet2(s, a, r) {
	return s.set(_assertClassBrand(s, a), r), r;
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/classPrivateFieldGet2.js
function _classPrivateFieldGet2(s, a) {
	return s.get(_assertClassBrand(s, a));
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/select-modifier-node.js
/**
* @internal
*/
var SelectModifierNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/and-node.js
/**
* @internal
*/
var AndNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/or-node.js
/**
* @internal
*/
var OrNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/on-node.js
/**
* @internal
*/
var OnNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/join-node.js
/**
* @internal
*/
var JoinNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/binary-operation-node.js
/**
* @internal
*/
var BinaryOperationNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/operator-node.js
var COMPARISON_OPERATORS_DICTIONARY = freeze({
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
Object.keys(COMPARISON_OPERATORS_DICTIONARY);
var ARITHMETIC_OPERATORS_DICTIONARY = freeze({
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
Object.keys(ARITHMETIC_OPERATORS_DICTIONARY);
var JSON_OPERATORS_DICTIONARY = freeze({
	"->": true,
	"->>": true
});
/**
* @deprecated will be removed in version 0.30.x
*/
var JSON_OPERATORS = Object.keys(JSON_OPERATORS_DICTIONARY);
var BINARY_OPERATORS_DICTIONARY = freeze({
	...COMPARISON_OPERATORS_DICTIONARY,
	...ARITHMETIC_OPERATORS_DICTIONARY,
	"||": true
});
/**
* @deprecated will be removed in version 0.30.x
*/
var BINARY_OPERATORS = Object.keys(BINARY_OPERATORS_DICTIONARY);
var UNARY_FILTER_OPERATORS_DICTIONARY = freeze({
	exists: true,
	"not exists": true
});
Object.keys(UNARY_FILTER_OPERATORS_DICTIONARY);
var UNARY_OPERATORS_DICTIONARY = freeze({
	...UNARY_FILTER_OPERATORS_DICTIONARY,
	"-": true,
	not: true
});
/**
* @deprecated will be removed in version 0.30.x
*/
var UNARY_OPERATORS = Object.keys(UNARY_OPERATORS_DICTIONARY);
[
	...BINARY_OPERATORS,
	...JSON_OPERATORS,
	...UNARY_OPERATORS
];
/**
* @internal
*/
var OperatorNode = freeze({
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
	return isString(op) && BINARY_OPERATORS_DICTIONARY[op];
}
function isJSONOperator(op) {
	return isString(op) && JSON_OPERATORS_DICTIONARY[op];
}
function isUnaryOperator(op) {
	return isString(op) && UNARY_OPERATORS_DICTIONARY[op];
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/column-node.js
/**
* @internal
*/
var ColumnNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/select-all-node.js
/**
* @internal
*/
var SelectAllNode = freeze({
	is(node) {
		return node.kind === "SelectAllNode";
	},
	create() {
		return freeze({ kind: "SelectAllNode" });
	}
});
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/reference-node.js
/**
* @internal
*/
var ReferenceNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dynamic/dynamic-reference-builder.js
var _dynamicReference = /* @__PURE__ */ new WeakMap();
var DynamicReferenceBuilder = class {
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
function isDynamicReferenceBuilder(obj) {
	return isObject(obj) && isOperationNodeSource(obj) && isString(obj.dynamicReference);
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/order-by-item-node.js
/**
* @internal
*/
var OrderByItemNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/raw-node.js
/**
* @internal
*/
var RawNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/collate-node.js
/**
* @internal
*/
var CollateNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/order-by-item-builder.js
var _props$34 = /* @__PURE__ */ new WeakMap();
var OrderByItemBuilder = class OrderByItemBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/log-once.js
var LOGGED_MESSAGES = /* @__PURE__ */ new Set();
/**
* Use for system-level logging, such as deprecation messages.
* Logs a message and ensures it won't be logged again.
*/
function logOnce(message) {
	if (LOGGED_MESSAGES.has(message)) return;
	LOGGED_MESSAGES.add(message);
	console.log(message);
}
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/json-reference-node.js
/**
* @internal
*/
var JSONReferenceNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/json-operator-chain-node.js
/**
* @internal
*/
var JSONOperatorChainNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/json-path-node.js
/**
* @internal
*/
var JSONPathNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/primitive-value-list-node.js
/**
* @internal
*/
var PrimitiveValueListNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/value-list-node.js
/**
* @internal
*/
var ValueListNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/value-node.js
/**
* @internal
*/
var ValueNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/parens-node.js
/**
* @internal
*/
var ParensNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/order-by-node.js
/**
* @internal
*/
var OrderByNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/partition-by-node.js
/**
* @internal
*/
var PartitionByNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/over-node.js
/**
* @internal
*/
var OverNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/from-node.js
/**
* @internal
*/
var FromNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/group-by-node.js
/**
* @internal
*/
var GroupByNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/having-node.js
/**
* @internal
*/
var HavingNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/insert-query-node.js
/**
* @internal
*/
var InsertQueryNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/list-node.js
/**
* @internal
*/
var ListNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/update-query-node.js
/**
* @internal
*/
var UpdateQueryNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/using-node.js
/**
* @internal
*/
var UsingNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/delete-query-node.js
/**
* @internal
*/
var DeleteQueryNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/where-node.js
/**
* @internal
*/
var WhereNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/returning-node.js
/**
* @internal
*/
var ReturningNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/explain-node.js
/**
* @internal
*/
var ExplainNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/when-node.js
/**
* @internal
*/
var WhenNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/merge-query-node.js
/**
* @internal
*/
var MergeQueryNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/output-node.js
/**
* @internal
*/
var OutputNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/query-node.js
/**
* @internal
*/
var QueryNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/select-query-node.js
/**
* @internal
*/
var SelectQueryNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/join-builder.js
var _props$33 = /* @__PURE__ */ new WeakMap();
var JoinBuilder = class JoinBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/partition-by-item-node.js
/**
* @internal
*/
var PartitionByItemNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/partition-by-parser.js
function parsePartitionBy(partitionBy) {
	return parseReferenceExpressionOrList(partitionBy).map(PartitionByItemNode.create);
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/over-builder.js
var _props$32 = /* @__PURE__ */ new WeakMap();
var OverBuilder = class OverBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/selection-node.js
/**
* @internal
*/
var SelectionNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/values-node.js
/**
* @internal
*/
var ValuesNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/default-insert-value-node.js
/**
* @internal
*/
var DefaultInsertValueNode = freeze({
	is(node) {
		return node.kind === "DefaultInsertValueNode";
	},
	create() {
		return freeze({ kind: "DefaultInsertValueNode" });
	}
});
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/column-update-node.js
/**
* @internal
*/
var ColumnUpdateNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/on-duplicate-key-node.js
/**
* @internal
*/
var OnDuplicateKeyNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/insert-result.js
init_defineProperty();
/**
* The result of an insert query.
*
* If the table has an auto incrementing primary key {@link insertId} will hold
* the generated id on dialects that support it. For example PostgreSQL doesn't
* return the id by default and {@link insertId} is undefined. On PostgreSQL you
* need to use {@link ReturningInterface.returning} or {@link ReturningInterface.returningAll}
* to get out the inserted id.
*
* {@link numInsertedOrUpdatedRows} holds the number of (actually) inserted rows.
* On MySQL, updated rows are counted twice when using `on duplicate key update`.
*
* ### Examples
*
* ```ts
* import type { NewPerson } from 'type-editor' // imaginary module
*
* async function insertPerson(person: NewPerson) {
*   const result = await db
*     .insertInto('person')
*     .values(person)
*     .executeTakeFirstOrThrow()
*
*   console.log(result.insertId) // relevant on MySQL
*   console.log(result.numInsertedOrUpdatedRows) // always relevant
* }
* ```
*/
var InsertResult = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/no-result-error.js
init_defineProperty();
var NoResultError = class extends Error {
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
function isNoResultErrorConstructor(fn) {
	return Object.prototype.hasOwnProperty.call(fn, "prototype");
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/on-conflict-node.js
/**
* @internal
*/
var OnConflictNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/on-conflict-builder.js
var _props$31 = /* @__PURE__ */ new WeakMap();
var OnConflictBuilder = class OnConflictBuilder {
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
var _props2$4 = /* @__PURE__ */ new WeakMap();
var OnConflictDoNothingBuilder = class {
	constructor(props) {
		_classPrivateFieldInitSpec(this, _props2$4, void 0);
		_classPrivateFieldSet2(_props2$4, this, freeze(props));
	}
	toOperationNode() {
		return _classPrivateFieldGet2(_props2$4, this).onConflictNode;
	}
};
var _props3$3 = /* @__PURE__ */ new WeakMap();
var OnConflictUpdateBuilder = class OnConflictUpdateBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/top-node.js
/**
* @internal
*/
var TopNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/or-action-node.js
/**
* @internal
*/
var OrActionNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/insert-query-builder.js
var _props$30 = /* @__PURE__ */ new WeakMap();
var InsertQueryBuilder = class InsertQueryBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/delete-result.js
init_defineProperty();
var DeleteResult = class {
	constructor(numDeletedRows) {
		_defineProperty(this, "numDeletedRows", void 0);
		this.numDeletedRows = numDeletedRows;
	}
};
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/limit-node.js
/**
* @internal
*/
var LimitNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/delete-query-builder.js
var _a$3;
var _props$29 = /* @__PURE__ */ new WeakMap();
var _DeleteQueryBuilder_brand = /* @__PURE__ */ new WeakSet();
var DeleteQueryBuilder = class {
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
function _join$2(joinType, args) {
	return new _a$3({
		..._classPrivateFieldGet2(_props$29, this),
		queryNode: QueryNode.cloneWithJoin(_classPrivateFieldGet2(_props$29, this).queryNode, parseJoin(joinType, args))
	});
}
_a$3 = DeleteQueryBuilder;
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/update-result.js
init_defineProperty();
var UpdateResult = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/update-query-builder.js
var _a$2;
var _props$28 = /* @__PURE__ */ new WeakMap();
var _UpdateQueryBuilder_brand = /* @__PURE__ */ new WeakSet();
var UpdateQueryBuilder = class {
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
function _join$1(joinType, args) {
	return new _a$2({
		..._classPrivateFieldGet2(_props$28, this),
		queryNode: QueryNode.cloneWithJoin(_classPrivateFieldGet2(_props$28, this).queryNode, parseJoin(joinType, args))
	});
}
_a$2 = UpdateQueryBuilder;
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/common-table-expression-name-node.js
/**
* @internal
*/
var CommonTableExpressionNameNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/common-table-expression-node.js
/**
* @internal
*/
var CommonTableExpressionNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/cte-builder.js
var _props$27 = /* @__PURE__ */ new WeakMap();
var CTEBuilder = class CTEBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/with-node.js
/**
* @internal
*/
var WithNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/random-string.js
var CHARS = [
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
	for (let i = 0; i < length; ++i) chars += randomChar();
	return chars;
}
function randomChar() {
	return CHARS[~~(Math.random() * CHARS.length)];
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/query-id.js
function createQueryId() {
	return new LazyQueryId();
}
var _queryId = /* @__PURE__ */ new WeakMap();
var LazyQueryId = class {
	constructor() {
		_classPrivateFieldInitSpec(this, _queryId, void 0);
	}
	get queryId() {
		if (_classPrivateFieldGet2(_queryId, this) === void 0) _classPrivateFieldSet2(_queryId, this, randomString(8));
		return _classPrivateFieldGet2(_queryId, this);
	}
};
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/operation-node-transformer.js
init_defineProperty();
var _transformers = /* @__PURE__ */ new WeakMap();
/**
* Transforms an operation node tree into another one.
*
* Kysely queries are expressed internally as a tree of objects (operation nodes).
* `OperationNodeTransformer` takes such a tree as its input and returns a
* transformed deep copy of it. By default the `OperationNodeTransformer`
* does nothing. You need to override one or more methods to make it do
* something.
*
* There's a method for each node type. For example if you'd like to convert
* each identifier (table name, column name, alias etc.) from camelCase to
* snake_case, you'd do something like this:
*
* ```ts
* import { type IdentifierNode, OperationNodeTransformer } from 'kysely'
* import snakeCase from 'lodash/snakeCase'
*
* class CamelCaseTransformer extends OperationNodeTransformer {
*   override transformIdentifier(node: IdentifierNode): IdentifierNode {
*     node = super.transformIdentifier(node)
*
*     return {
*       ...node,
*       name: snakeCase(node.name),
*     }
*   }
* }
*
* const transformer = new CamelCaseTransformer()
*
* const query = db.selectFrom('person').select(['first_name', 'last_name'])
*
* const tree = transformer.transformNode(query.toOperationNode())
* ```
*/
var OperationNodeTransformer = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/operation-node.js
function isOperationNode(thing) {
	return isObject(thing) && isString(thing.kind);
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/root-operation-node.js
var ROOT_OPERATION_NODE_KINDS = {
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
function isRootOperationNode(thing) {
	return isOperationNode(thing) && ROOT_OPERATION_NODE_KINDS[thing.kind] === true;
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/with-schema/with-schema-transformer.js
var SCHEMALESS_FUNCTIONS = freeze({
	json_agg: true,
	to_json: true
});
var _schema = /* @__PURE__ */ new WeakMap();
var _schemableIds = /* @__PURE__ */ new WeakMap();
var _ctes = /* @__PURE__ */ new WeakMap();
var _WithSchemaTransformer_brand = /* @__PURE__ */ new WeakSet();
var WithSchemaTransformer = class extends OperationNodeTransformer {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/with-schema/with-schema-plugin.js
var _transformer$1 = /* @__PURE__ */ new WeakMap();
var WithSchemaPlugin = class {
	constructor(schema) {
		_classPrivateFieldInitSpec(this, _transformer$1, void 0);
		_classPrivateFieldSet2(_transformer$1, this, new WithSchemaTransformer(schema));
	}
	transformQuery(args) {
		return _classPrivateFieldGet2(_transformer$1, this).transformNode(args.node, args.queryId);
	}
	async transformResult(args) {
		return args.result;
	}
};
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/matched-node.js
/**
* @internal
*/
var MatchedNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/deferred.js
init_defineProperty();
var _promise$1 = /* @__PURE__ */ new WeakMap();
var _resolve$1 = /* @__PURE__ */ new WeakMap();
var _reject = /* @__PURE__ */ new WeakMap();
var Deferred = class {
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
var ABORTED = {};
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-executor/query-executor-base.js
var NO_PLUGINS = freeze([]);
var _plugins = /* @__PURE__ */ new WeakMap();
var _QueryExecutorBase_brand = /* @__PURE__ */ new WeakSet();
var QueryExecutorBase = class {
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
async function _transformResult(result, queryId, options) {
	const { signal } = options || {};
	for (const plugin of _classPrivateFieldGet2(_plugins, this)) result = await plugin.transformResult(freeze({
		queryId,
		result,
		signal
	}));
	return result;
}
var NOOP_QUERY_EXECUTOR = new class NoopQueryExecutor extends QueryExecutorBase {
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
}();
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/merge-result.js
init_defineProperty();
var MergeResult = class {
	constructor(numChangedRows) {
		_defineProperty(this, "numChangedRows", void 0);
		this.numChangedRows = numChangedRows;
	}
};
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/merge-query-builder.js
var _props$26 = /* @__PURE__ */ new WeakMap();
var MergeQueryBuilder = class MergeQueryBuilder {
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
var _props2$3 = /* @__PURE__ */ new WeakMap();
var _WheneableMergeQueryBuilder_brand = /* @__PURE__ */ new WeakSet();
var WheneableMergeQueryBuilder = class WheneableMergeQueryBuilder {
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
var _props3$2 = /* @__PURE__ */ new WeakMap();
var MatchedThenableMergeQueryBuilder = class {
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
var _props4$2 = /* @__PURE__ */ new WeakMap();
var NotMatchedThenableMergeQueryBuilder = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-creator.js
var _props$25 = /* @__PURE__ */ new WeakMap();
var QueryCreator = class QueryCreator {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/offset-node.js
/**
* @internal
*/
var OffsetNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/group-by-item-node.js
/**
* @internal
*/
var GroupByItemNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/group-by-parser.js
function parseGroupBy(groupBy) {
	groupBy = isFunction(groupBy) ? groupBy(expressionBuilder()) : groupBy;
	return parseReferenceExpressionOrList(groupBy).map(GroupByItemNode.create);
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/set-operation-node.js
/**
* @internal
*/
var SetOperationNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/set-operation-parser.js
function parseSetOperations(operator, expression, all) {
	if (isFunction(expression)) expression = expression(createExpressionBuilder());
	if (!isReadonlyArray(expression)) expression = [expression];
	return expression.map((expr) => SetOperationNode.create(operator, parseExpression(expr), all));
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/expression/expression-wrapper.js
var _node$7 = /* @__PURE__ */ new WeakMap();
var ExpressionWrapper = class ExpressionWrapper {
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
var _expr = /* @__PURE__ */ new WeakMap();
var _alias$5 = /* @__PURE__ */ new WeakMap();
var AliasedExpressionWrapper = class {
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
var _node2$1 = /* @__PURE__ */ new WeakMap();
var OrWrapper = class OrWrapper {
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
var _node3 = /* @__PURE__ */ new WeakMap();
var AndWrapper = class AndWrapper {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/fetch-node.js
/**
* @internal
*/
var FetchNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/select-query-builder.js
var _a$1;
var _props$24 = /* @__PURE__ */ new WeakMap();
var _SelectQueryBuilderImpl_brand = /* @__PURE__ */ new WeakSet();
var SelectQueryBuilderImpl = class {
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
function _join(joinType, args) {
	return new _a$1({
		..._classPrivateFieldGet2(_props$24, this),
		queryNode: QueryNode.cloneWithJoin(_classPrivateFieldGet2(_props$24, this).queryNode, parseJoin(joinType, args))
	});
}
_a$1 = SelectQueryBuilderImpl;
function createSelectQueryBuilder(props) {
	return new SelectQueryBuilderImpl(props);
}
var _queryBuilder = /* @__PURE__ */ new WeakMap();
var _alias$4 = /* @__PURE__ */ new WeakMap();
/**
* {@link SelectQueryBuilder} with an alias. The result of calling {@link SelectQueryBuilder.as}.
*/
var AliasedSelectQueryBuilderImpl = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/aggregate-function-node.js
/**
* @internal
*/
var AggregateFunctionNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/function-node.js
/**
* @internal
*/
var FunctionNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/aggregate-function-builder.js
var _props$23 = /* @__PURE__ */ new WeakMap();
var AggregateFunctionBuilder = class AggregateFunctionBuilder {
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
var _aggregateFunctionBuilder = /* @__PURE__ */ new WeakMap();
var _alias$3 = /* @__PURE__ */ new WeakMap();
/**
* {@link AggregateFunctionBuilder} with an alias. The result of calling {@link AggregateFunctionBuilder.as}.
*/
var AliasedAggregateFunctionBuilder = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/unary-operation-node.js
/**
* @internal
*/
var UnaryOperationNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/unary-operation-parser.js
function parseUnaryOperation(operator, operand) {
	if (isUnaryOperator(operator)) return UnaryOperationNode.create(OperatorNode.create(operator), parseReferenceExpression(operand));
	throw new Error(`invalid unary operator ${JSON.stringify(operator)}`);
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/case-node.js
/**
* @internal
*/
var CaseNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/case-builder.js
var _props$22 = /* @__PURE__ */ new WeakMap();
var CaseBuilder = class {
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
var _props2$2 = /* @__PURE__ */ new WeakMap();
var CaseThenBuilder = class {
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
var _props3$1 = /* @__PURE__ */ new WeakMap();
var CaseWhenBuilder = class {
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
var _props4$1 = /* @__PURE__ */ new WeakMap();
var CaseEndBuilder = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/json-path-leg-node.js
/**
* @internal
*/
var JSONPathLegNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-builder/json-path-builder.js
var HASH_NEGATIVE_INDEX_REGEX = /^#-\d+$/;
var _node$6 = /* @__PURE__ */ new WeakMap();
var _JSONPathBuilder_brand = /* @__PURE__ */ new WeakSet();
var JSONPathBuilder = class {
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
function _createBuilderWithPathLeg(legType, value) {
	if (JSONReferenceNode.is(_classPrivateFieldGet2(_node$6, this))) return new TraversedJSONPathBuilder(JSONReferenceNode.cloneWithTraversal(_classPrivateFieldGet2(_node$6, this), JSONPathNode.is(_classPrivateFieldGet2(_node$6, this).traversal) ? JSONPathNode.cloneWithLeg(_classPrivateFieldGet2(_node$6, this).traversal, JSONPathLegNode.create(legType, value)) : JSONOperatorChainNode.cloneWithValue(_classPrivateFieldGet2(_node$6, this).traversal, ValueNode.createImmediate(value))));
	return new TraversedJSONPathBuilder(JSONPathNode.cloneWithLeg(_classPrivateFieldGet2(_node$6, this), JSONPathLegNode.create(legType, value)));
}
var _node2 = /* @__PURE__ */ new WeakMap();
var TraversedJSONPathBuilder = class TraversedJSONPathBuilder extends JSONPathBuilder {
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
var _jsonPath = /* @__PURE__ */ new WeakMap();
var _alias$2 = /* @__PURE__ */ new WeakMap();
var AliasedJSONPathBuilder = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/tuple-node.js
/**
* @internal
*/
var TupleNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/data-type-node.js
var SIMPLE_COLUMN_DATA_TYPES = freeze({
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
var COLUMN_DATA_TYPE_REGEX = freeze([
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
/**
* @internal
*/
var DataTypeNode = freeze({
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
	return SIMPLE_COLUMN_DATA_TYPES[dataType] || COLUMN_DATA_TYPE_REGEX.some((r) => r.test(dataType));
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/data-type-parser.js
function parseDataTypeExpression(dataType) {
	if (isOperationNodeSource(dataType)) return dataType.toOperationNode();
	if (isColumnDataType(dataType)) return DataTypeNode.create(dataType);
	throw new Error(`invalid column data type ${JSON.stringify(dataType)}`);
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/cast-node.js
/**
* @internal
*/
var CastNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dynamic/dynamic-table-builder.js
var _table = /* @__PURE__ */ new WeakMap();
var DynamicTableBuilder = class {
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
var _table2 = /* @__PURE__ */ new WeakMap();
var _alias$1 = /* @__PURE__ */ new WeakMap();
var AliasedDynamicTableBuilder = class {
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
function isAliasedDynamicTableBuilder(obj) {
	return isObject(obj) && isOperationNodeSource(obj) && isString(obj.table) && isString(obj.alias);
}
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/add-column-node.js
/**
* @internal
*/
var AddColumnNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/column-definition-node.js
/**
* @internal
*/
var ColumnDefinitionNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/drop-column-node.js
/**
* @internal
*/
var DropColumnNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/rename-column-node.js
/**
* @internal
*/
var RenameColumnNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/check-constraint-node.js
/**
* @internal
*/
var CheckConstraintNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/references-node.js
var ON_MODIFY_FOREIGN_ACTIONS_DICTIONARY = freeze({
	cascade: true,
	"no action": true,
	restrict: true,
	"set default": true,
	"set null": true
});
Object.keys(ON_MODIFY_FOREIGN_ACTIONS_DICTIONARY);
/**
* @internal
*/
var ReferencesNode = freeze({
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
function isOnModifyForeignAction(thing) {
	return isString(thing) && ON_MODIFY_FOREIGN_ACTIONS_DICTIONARY[thing];
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/default-value-parser.js
function parseDefaultValueExpression(value) {
	return isOperationNodeSource(value) ? value.toOperationNode() : ValueNode.createImmediate(value);
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/generated-node.js
/**
* @internal
*/
var GeneratedNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/default-value-node.js
/**
* @internal
*/
var DefaultValueNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/on-modify-action-parser.js
function parseOnModifyForeignAction(action) {
	if (isOnModifyForeignAction(action)) return action;
	throw new Error(`invalid OnModifyForeignAction ${action}`);
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/column-definition-builder.js
var _node$5 = /* @__PURE__ */ new WeakMap();
var ColumnDefinitionBuilder = class ColumnDefinitionBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/modify-column-node.js
/**
* @internal
*/
var ModifyColumnNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/foreign-key-constraint-node.js
/**
* @internal
*/
var ForeignKeyConstraintNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/foreign-key-constraint-builder.js
var _node$4 = /* @__PURE__ */ new WeakMap();
var ForeignKeyConstraintBuilder = class ForeignKeyConstraintBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/add-constraint-node.js
/**
* @internal
*/
var AddConstraintNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/unique-constraint-node.js
/**
* @internal
*/
var UniqueConstraintNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/drop-constraint-node.js
/**
* @internal
*/
var DropConstraintNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/alter-column-node.js
/**
* @internal
*/
var AlterColumnNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-column-builder.js
var _column = /* @__PURE__ */ new WeakMap();
var AlterColumnBuilder = class {
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
var _alterColumnNode = /* @__PURE__ */ new WeakMap();
/**
* Allows us to force consumers to do exactly one alteration to a column.
*
* One cannot do no alterations:
*
* ```ts
* await db.schema
*   .alterTable('person')
* //  .execute() // Property 'execute' does not exist on type 'AlteredColumnBuilder'.
* ```
*
* ```ts
* await db.schema
*   .alterTable('person')
* //  .alterColumn('age', (ac) => ac) // Type 'AlterColumnBuilder' is not assignable to type 'AlteredColumnBuilder'.
* //  .execute()
* ```
*
* One cannot do multiple alterations:
*
* ```ts
* await db.schema
*   .alterTable('person')
* //  .alterColumn('age', (ac) => ac.dropNotNull().setNotNull()) // Property 'setNotNull' does not exist on type 'AlteredColumnBuilder'.
* //  .execute()
* ```
*
* Which would now throw a compilation error, instead of a runtime error.
*/
var AlteredColumnBuilder = class {
	constructor(alterColumnNode) {
		_classPrivateFieldInitSpec(this, _alterColumnNode, void 0);
		_classPrivateFieldSet2(_alterColumnNode, this, alterColumnNode);
	}
	toOperationNode() {
		return _classPrivateFieldGet2(_alterColumnNode, this);
	}
};
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-table-executor.js
var _props$21 = /* @__PURE__ */ new WeakMap();
var AlterTableExecutor = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-table-add-foreign-key-constraint-builder.js
var _props$20 = /* @__PURE__ */ new WeakMap();
var AlterTableAddForeignKeyConstraintBuilder = class AlterTableAddForeignKeyConstraintBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-table-drop-constraint-builder.js
var _props$19 = /* @__PURE__ */ new WeakMap();
var AlterTableDropConstraintBuilder = class AlterTableDropConstraintBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/primary-key-constraint-node.js
/**
* @internal
*/
var PrimaryKeyConstraintNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/add-index-node.js
/**
* @internal
*/
var AddIndexNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-table-add-index-builder.js
var _props$18 = /* @__PURE__ */ new WeakMap();
var AlterTableAddIndexBuilder = class AlterTableAddIndexBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/unique-constraint-builder.js
var _node$3 = /* @__PURE__ */ new WeakMap();
var UniqueConstraintNodeBuilder = class UniqueConstraintNodeBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/primary-key-constraint-builder.js
var _node$2 = /* @__PURE__ */ new WeakMap();
var PrimaryKeyConstraintBuilder = class PrimaryKeyConstraintBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/check-constraint-builder.js
var _node$1 = /* @__PURE__ */ new WeakMap();
var CheckConstraintBuilder = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/rename-constraint-node.js
/**
* @internal
*/
var RenameConstraintNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/drop-column-builder.js
var _props$17 = /* @__PURE__ */ new WeakMap();
var DropColumnBuilder = class DropColumnBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-table-builder.js
var _props$16 = /* @__PURE__ */ new WeakMap();
/**
* This builder can be used to create a `alter table` query.
*/
var AlterTableBuilder = class {
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
var _props2$1 = /* @__PURE__ */ new WeakMap();
var AlterTableColumnAlteringBuilder = class AlterTableColumnAlteringBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/immediate-value/immediate-value-transformer.js
/**
* Transforms all ValueNodes to immediate.
*
* WARNING! This should never be part of the public API. Users should never use this.
* This is an internal helper.
*
* @internal
*/
var ImmediateValueTransformer = class extends OperationNodeTransformer {
	transformPrimitiveValueList(node) {
		return ValueListNode.create(node.values.map(ValueNode.createImmediate));
	}
	transformValue(node) {
		return ValueNode.createImmediate(node.value);
	}
};
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/create-index-builder.js
var _props$15 = /* @__PURE__ */ new WeakMap();
var CreateIndexBuilder = class CreateIndexBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/create-schema-builder.js
var _props$14 = /* @__PURE__ */ new WeakMap();
var CreateSchemaBuilder = class CreateSchemaBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/parser/on-commit-action-parse.js
function parseOnCommitAction(action) {
	if (ON_COMMIT_ACTIONS.includes(action)) return action;
	throw new Error(`invalid OnCommitAction ${action}`);
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/create-table-add-index-builder.js
var _node = /* @__PURE__ */ new WeakMap();
var CreateTableAddIndexBuilder = class CreateTableAddIndexBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/create-table-builder.js
var _props$13 = /* @__PURE__ */ new WeakMap();
/**
* This builder can be used to create a `create table` query.
*/
var CreateTableBuilder = class CreateTableBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/drop-index-builder.js
var _props$12 = /* @__PURE__ */ new WeakMap();
var DropIndexBuilder = class DropIndexBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/drop-schema-builder.js
var _props$11 = /* @__PURE__ */ new WeakMap();
var DropSchemaBuilder = class DropSchemaBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/drop-table-builder.js
var _props$10 = /* @__PURE__ */ new WeakMap();
var DropTableBuilder = class DropTableBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/create-view-node.js
/**
* @internal
*/
var CreateViewNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/plugin/immediate-value/immediate-value-plugin.js
var _transformer = /* @__PURE__ */ new WeakMap();
/**
* Transforms all ValueNodes to immediate.
*
* WARNING! This should never be part of the public API. Users should never use this.
* This is an internal helper.
*
* @internal
*/
var ImmediateValuePlugin = class {
	constructor() {
		_classPrivateFieldInitSpec(this, _transformer, new ImmediateValueTransformer());
	}
	transformQuery(args) {
		return _classPrivateFieldGet2(_transformer, this).transformNode(args.node, args.queryId);
	}
	transformResult(args) {
		return Promise.resolve(args.result);
	}
};
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/create-view-builder.js
var _props$9 = /* @__PURE__ */ new WeakMap();
var CreateViewBuilder = class CreateViewBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/drop-view-node.js
/**
* @internal
*/
var DropViewNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/drop-view-builder.js
var _props$8 = /* @__PURE__ */ new WeakMap();
var DropViewBuilder = class DropViewBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/create-type-node.js
/**
* @internal
*/
var CreateTypeNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/create-type-builder.js
var _props$7 = /* @__PURE__ */ new WeakMap();
var CreateTypeBuilder = class CreateTypeBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/drop-type-node.js
/**
* @internal
*/
var DropTypeNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/drop-type-builder.js
var _props$6 = /* @__PURE__ */ new WeakMap();
var DropTypeBuilder = class DropTypeBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/refresh-materialized-view-node.js
/**
* @internal
*/
var RefreshMaterializedViewNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/refresh-materialized-view-builder.js
var _props$5 = /* @__PURE__ */ new WeakMap();
var RefreshMaterializedViewBuilder = class RefreshMaterializedViewBuilder {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/alter-type-node.js
/**
* @internal
*/
var AlterTypeNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/add-value-node.js
/**
* @internal
*/
var AddValueNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-finalizer.js
var _props$4 = /* @__PURE__ */ new WeakMap();
var QueryFinalizer = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-type-add-value-builder.js
var _a;
var _props$3 = /* @__PURE__ */ new WeakMap();
var _AlterTypeAddValueBuilder_brand = /* @__PURE__ */ new WeakSet();
var AlterTypeAddValueBuilder = class extends QueryFinalizer {
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
function _setNeighbor(neighborValue, isBefore) {
	return new _a({
		..._classPrivateFieldGet2(_props$3, this),
		node: AlterTypeNode.cloneWith(_classPrivateFieldGet2(_props$3, this).node, { addValue: AddValueNode.cloneWith(_classPrivateFieldGet2(_props$3, this).node.addValue, {
			isBefore,
			neighborValue: ValueNode.createImmediate(neighborValue)
		}) })
	});
}
_a = AlterTypeAddValueBuilder;
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/rename-value-node.js
var RenameValueNode = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/alter-type-builder.js
var _props$2 = /* @__PURE__ */ new WeakMap();
/**
* This builder can be used to create `alter type` queries.
*/
var AlterTypeBuilder = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/schema/schema-module.js
var _executor$1 = /* @__PURE__ */ new WeakMap();
/**
* Provides methods for building database schema.
*/
var SchemaModule = class SchemaModule {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dynamic/dynamic.js
var DynamicModule = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/driver/default-connection-provider.js
var _driver$1 = /* @__PURE__ */ new WeakMap();
var DefaultConnectionProvider = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-executor/default-query-executor.js
var _compiler = /* @__PURE__ */ new WeakMap();
var _adapter = /* @__PURE__ */ new WeakMap();
var _connectionProvider = /* @__PURE__ */ new WeakMap();
var DefaultQueryExecutor = class DefaultQueryExecutor extends QueryExecutorBase {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/performance-now.js
function performanceNow() {
	if (typeof performance !== "undefined" && isFunction(performance.now)) return performance.now();
	else return Date.now();
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/driver/connection-mutex.js
var _promise = /* @__PURE__ */ new WeakMap();
var _resolve = /* @__PURE__ */ new WeakMap();
/**
* This mutex is used to ensure that only one operation at a time can
* acquire a connection from the driver. This is necessary when the
* driver only has a single connection, like SQLite and PGlite.
*
* @internal
*/
var ConnectionMutex = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/driver/runtime-driver.js
var _driver = /* @__PURE__ */ new WeakMap();
var _log = /* @__PURE__ */ new WeakMap();
var _initPromise = /* @__PURE__ */ new WeakMap();
var _initDone = /* @__PURE__ */ new WeakMap();
var _destroyPromise = /* @__PURE__ */ new WeakMap();
var _connections = /* @__PURE__ */ new WeakMap();
var _connectionMutex = /* @__PURE__ */ new WeakMap();
var _RuntimeDriver_brand = /* @__PURE__ */ new WeakSet();
/**
* A small wrapper around {@link Driver} that makes sure the driver is
* initialized before it is used, only initialized and destroyed
* once etc.
*/
var RuntimeDriver = class {
	constructor(driver, adapter, log) {
		_classPrivateMethodInitSpec(this, _RuntimeDriver_brand);
		_classPrivateFieldInitSpec(this, _driver, void 0);
		_classPrivateFieldInitSpec(this, _log, void 0);
		_classPrivateFieldInitSpec(this, _initPromise, void 0);
		_classPrivateFieldInitSpec(this, _initDone, void 0);
		_classPrivateFieldInitSpec(this, _destroyPromise, void 0);
		_classPrivateFieldInitSpec(this, _connections, /* @__PURE__ */ new WeakSet());
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
		if (!_classPrivateFieldGet2(_connections, this).has(connection)) {
			if (_assertClassBrand(_RuntimeDriver_brand, this, _needsLogging).call(this)) _assertClassBrand(_RuntimeDriver_brand, this, _addLogging).call(this, connection);
			_classPrivateFieldGet2(_connections, this).add(connection);
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/driver/single-connection-provider.js
var ignoreError = () => {};
var _connection = /* @__PURE__ */ new WeakMap();
var _runningPromise = /* @__PURE__ */ new WeakMap();
var _SingleConnectionProvider_brand = /* @__PURE__ */ new WeakSet();
var SingleConnectionProvider = class {
	constructor(connection) {
		_classPrivateMethodInitSpec(this, _SingleConnectionProvider_brand);
		_classPrivateFieldInitSpec(this, _connection, void 0);
		_classPrivateFieldInitSpec(this, _runningPromise, void 0);
		_classPrivateFieldSet2(_connection, this, connection);
	}
	async provideConnection(consumer) {
		while (_classPrivateFieldGet2(_runningPromise, this)) await _classPrivateFieldGet2(_runningPromise, this).catch(ignoreError);
		_classPrivateFieldSet2(_runningPromise, this, _assertClassBrand(_SingleConnectionProvider_brand, this, _run).call(this, consumer).finally(() => {
			_classPrivateFieldSet2(_runningPromise, this, void 0);
		}));
		return _classPrivateFieldGet2(_runningPromise, this);
	}
};
async function _run(runner) {
	return await runner(_classPrivateFieldGet2(_connection, this));
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/driver/driver.js
var TRANSACTION_ACCESS_MODES = ["read only", "read write"];
var TRANSACTION_ISOLATION_LEVELS = [
	"read uncommitted",
	"read committed",
	"repeatable read",
	"serializable",
	"snapshot"
];
function validateTransactionSettings(settings) {
	if (settings.accessMode && !TRANSACTION_ACCESS_MODES.includes(settings.accessMode)) throw new Error(`invalid transaction access mode ${settings.accessMode}`);
	if (settings.isolationLevel && !TRANSACTION_ISOLATION_LEVELS.includes(settings.isolationLevel)) throw new Error(`invalid transaction isolation level ${settings.isolationLevel}`);
}
freeze(["query", "error"]);
var _levels = /* @__PURE__ */ new WeakMap();
var _logger = /* @__PURE__ */ new WeakMap();
var Log = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/util/compilable.js
function isCompilable(value) {
	return isObject(value) && isFunction(value.compile);
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/kysely.js
var _Symbol;
var _Symbol$asyncDispose;
(_Symbol = Symbol).asyncDispose ?? (_Symbol.asyncDispose = Symbol("Symbol.asyncDispose"));
var _props$1 = /* @__PURE__ */ new WeakMap();
_Symbol$asyncDispose = Symbol.asyncDispose;
/**
* The main Kysely class.
*
* You should create one instance of `Kysely` per database using the {@link Kysely}
* constructor. Each `Kysely` instance maintains its own connection pool.
*
* ### Examples
*
* This example assumes your database has a "person" table:
*
* ```ts
* import * as Sqlite from 'better-sqlite3'
* import { type Generated, Kysely, SqliteDialect } from 'kysely'
*
* interface Database {
*   person: {
*     id: Generated<number>
*     first_name: string
*     last_name: string | null
*   }
* }
*
* const db = new Kysely<Database>({
*   dialect: new SqliteDialect({
*     database: new Sqlite(':memory:'),
*   })
* })
* ```
*
* @typeParam DB - The database interface type. Keys of this type must be table names
*    in the database and values must be interfaces that describe the rows in those
*    tables. See the examples above.
*/
var Kysely = class Kysely extends QueryCreator {
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
var _props2 = /* @__PURE__ */ new WeakMap();
var Transaction = class Transaction extends Kysely {
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
function isKyselyProps(obj) {
	return isObject(obj) && isObject(obj.config) && isObject(obj.driver) && isObject(obj.executor) && isObject(obj.dialect);
}
var _props3 = /* @__PURE__ */ new WeakMap();
var ConnectionBuilder = class {
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
var _props4 = /* @__PURE__ */ new WeakMap();
var TransactionBuilder = class TransactionBuilder {
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
var _props5 = /* @__PURE__ */ new WeakMap();
var ControlledTransactionBuilder = class ControlledTransactionBuilder {
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
var _props6 = /* @__PURE__ */ new WeakMap();
var _compileQuery = /* @__PURE__ */ new WeakMap();
var _state = /* @__PURE__ */ new WeakMap();
var ControlledTransaction = class ControlledTransaction extends Transaction {
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
var _cb = /* @__PURE__ */ new WeakMap();
var Command = class {
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
function assertNotCommittedOrRolledBack(state) {
	if (state.isCommitted) throw new Error("Transaction is already committed");
	if (state.isRolledBack) throw new Error("Transaction is already rolled back");
}
var _executor = /* @__PURE__ */ new WeakMap();
var _state2 = /* @__PURE__ */ new WeakMap();
/**
* An executor wrapper that asserts that the transaction state is not committed
* or rolled back when a query is executed.
*
* @internal
*/
var NotCommittedOrRolledBackAssertingExecutor = class NotCommittedOrRolledBackAssertingExecutor {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/raw-builder/raw-builder.js
var _props = /* @__PURE__ */ new WeakMap();
var _RawBuilderImpl_brand = /* @__PURE__ */ new WeakSet();
var RawBuilderImpl = class RawBuilderImpl {
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
var _rawBuilder = /* @__PURE__ */ new WeakMap();
var _alias = /* @__PURE__ */ new WeakMap();
var AliasedRawBuilderImpl = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/raw-builder/sql.js
var sql = Object.assign((sqlFragments, ...parameters) => {
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
function parseParameter(param) {
	if (isOperationNodeSource(param)) return param.toOperationNode();
	return parseValueExpression(param);
}
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/operation-node/operation-node-visitor.js
init_defineProperty();
var _visitors = /* @__PURE__ */ new WeakMap();
var OperationNodeVisitor = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-compiler/default-query-compiler.js
var LIT_WRAP_REGEX = /'/g;
var JSON_PATH_MEMBER_WRAP_REGEX = /['"]/g;
var _sql = /* @__PURE__ */ new WeakMap();
var _parameters = /* @__PURE__ */ new WeakMap();
var DefaultQueryCompiler = class extends OperationNodeVisitor {
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
var SELECT_MODIFIER_SQL = freeze({
	ForKeyShare: "for key share",
	ForNoKeyUpdate: "for no key update",
	ForUpdate: "for update",
	ForShare: "for share",
	NoWait: "nowait",
	SkipLocked: "skip locked",
	Distinct: "distinct"
});
var SELECT_MODIFIER_PRIORITY = freeze({
	ForKeyShare: 1,
	ForNoKeyUpdate: 1,
	ForUpdate: 1,
	ForShare: 1,
	NoWait: 2,
	SkipLocked: 2,
	Distinct: 0
});
var JOIN_TYPE_SQL = freeze({
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/query-compiler/compiled-query.js
var CompiledQuery = freeze({ raw(sql, parameters = []) {
	return freeze({
		sql,
		query: RawNode.createWithSql(sql),
		parameters: freeze(parameters),
		queryId: createQueryId()
	});
} });
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/dialect-adapter-base.js
/**
* A basic implementation of `DialectAdapter` with sensible default values.
* Third-party dialects can extend this instead of implementing the `DialectAdapter`
* interface from scratch. That way all new settings will get default values when
* they are added and there will be less breaking changes.
*/
var DialectAdapterBase = class {
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/sqlite/sqlite-query-compiler.js
var ID_WRAP_REGEX = /"/g;
var JSON_PATH_MEMBER_ESCAPE_REGEX = /[\\'"]/g;
var SqliteQueryCompiler = class extends DefaultQueryCompiler {
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
		return identifier.replace(ID_WRAP_REGEX, "\"\"");
	}
	sanitizeJSONPathMemberValue(value) {
		return value.replace(JSON_PATH_MEMBER_ESCAPE_REGEX, (char) => char === "\\" ? "\\\\" : char === "'" ? "''" : "\\\"");
	}
	visitDefaultInsertValue(_) {
		this.append("null");
	}
};
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/migration/migrator.js
var DEFAULT_MIGRATION_TABLE = "kysely_migration";
var DEFAULT_MIGRATION_LOCK_TABLE = "kysely_migration_lock";
freeze({ __noMigrations__: true });
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/sqlite/sqlite-introspector.js
var _db = /* @__PURE__ */ new WeakMap();
var _SqliteIntrospector_brand = /* @__PURE__ */ new WeakSet();
var SqliteIntrospector = class {
	constructor(db) {
		_classPrivateMethodInitSpec(this, _SqliteIntrospector_brand);
		_classPrivateFieldInitSpec(this, _db, void 0);
		_classPrivateFieldSet2(_db, this, db);
	}
	async getSchemas() {
		return [];
	}
	async getTables(options = { withInternalKyselyTables: false }) {
		return await _assertClassBrand(_SqliteIntrospector_brand, this, _getTableMetadata).call(this, options);
	}
};
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
	const tablesResult = await _assertClassBrand(_SqliteIntrospector_brand, this, _tablesQuery).call(this, _classPrivateFieldGet2(_db, this), options).execute();
	const tableMetadata = await _classPrivateFieldGet2(_db, this).with("table_list", (qb) => _assertClassBrand(_SqliteIntrospector_brand, this, _tablesQuery).call(this, qb, options)).selectFrom(["table_list as tl", sql`pragma_table_info(tl.name)`.as("p")]).select([
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
//#endregion
//#region ../node_modules/.pnpm/kysely@0.29.2/node_modules/kysely/dist/dialect/sqlite/sqlite-adapter.js
var SqliteAdapter = class extends DialectAdapterBase {
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
//#endregion
//#region ../packages/dialect-generic-sqlite/dist/base-CsEzCtSy.mjs
init_defineProperty();
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
		return new SqliteQueryCompiler();
	}
	createAdapter() {
		return new SqliteAdapter();
	}
	createIntrospector(db) {
		return new SqliteIntrospector(db);
	}
};
async function runSavepoint(command, connection, savepointName, compileQuery) {
	await connection.executeQuery(compileQuery(RawNode.createWithChildren([RawNode.createWithSql(`${command} `), IdentifierNode.create(savepointName)]), createQueryId()));
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
		await connection.executeQuery(CompiledQuery.raw("begin"));
	}
	async commitTransaction(connection) {
		await connection.executeQuery(CompiledQuery.raw("commit"));
	}
	async rollbackTransaction(connection) {
		await connection.executeQuery(CompiledQuery.raw("rollback"));
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
* Resolve a value or a factory function into a promise.
* If the argument is a function, it is called and the result is awaited; otherwise the value is returned as-is.
*/
async function access(data) {
	return typeof data === "function" ? await data() : data;
}
//#endregion
//#region ../packages/dialect-generic-sqlite/dist/index.mjs
init_defineProperty();
var GenericSqliteDriver = class extends BaseSqliteDriver {
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
		const it = this.db.iterator(SelectQueryNode.is(query), sql, parameters, chunkSize);
		for await (const row of it) {
			if (options?.signal?.aborted) break;
			yield { rows: [row] };
		}
	}
	async executeQuery({ parameters, query, sql }) {
		return await this.db.query(SelectQueryNode.is(query), sql, parameters, query);
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
//#endregion
//#region ../packages/dialect-wasm/dist/index.mjs
var SqlJsDialect = class extends GenericSqliteDialect {
	/**
	* dialect for [sql.js](https://github.com/sql-js/sql.js)
	*
	* no support for bigint
	*/
	constructor(config) {
		super(async () => {
			const db = await access(config.database);
			return {
				db,
				close: () => db.close(),
				query: (_, sql, parameters) => {
					const stmt = db.prepare(sql);
					try {
						if (parameters?.length) stmt.bind(parameters);
						if (stmt.getColumnNames().length === 0) {
							stmt.step();
							return {
								rows: [],
								insertId: BigInt(db.exec("SELECT last_insert_rowid()")[0].values[0][0]),
								numAffectedRows: BigInt(db.getRowsModified())
							};
						}
						const rows = [];
						while (stmt.step()) rows.push(stmt.getAsObject());
						return { rows };
					} finally {
						stmt.free();
					}
				},
				iterator: (isSelect, sql, parameters) => {
					if (!isSelect) throw new Error("Only support select query");
					return iterateWithStatement(db, sql, parameters);
				}
			};
		}, config.onCreateConnection);
	}
};
function* iterator(stmt) {
	while (stmt.step()) yield stmt.getAsObject();
}
function* iterateWithStatement(db, sql, parameters) {
	const statement = db.prepare(sql);
	try {
		if (parameters.length) statement.bind(parameters);
		yield* iterator(statement);
	} finally {
		statement.free();
	}
}
//#endregion
//#region ../node_modules/.pnpm/sql.js@1.14.1/node_modules/sql.js/dist/sql-wasm.wasm?url
var import_sql_wasm_browser = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	init_defineProperty();
	var initSqlJsPromise = void 0;
	var initSqlJs = function(moduleConfig) {
		if (initSqlJsPromise) return initSqlJsPromise;
		initSqlJsPromise = new Promise(function(resolveModule, reject) {
			var Module = typeof moduleConfig !== "undefined" ? moduleConfig : {};
			var originalOnAbortFunction = Module["onAbort"];
			Module["onAbort"] = function(errorThatCausedAbort) {
				reject(new Error(errorThatCausedAbort));
				if (originalOnAbortFunction) originalOnAbortFunction(errorThatCausedAbort);
			};
			Module["postRun"] = Module["postRun"] || [];
			Module["postRun"].push(function() {
				resolveModule(Module);
			});
			module = void 0;
			var k;
			k || (k = typeof Module != "undefined" ? Module : {});
			var aa = !!globalThis.window, ba = !!globalThis.WorkerGlobalScope;
			k.onRuntimeInitialized = function() {
				function a(f, l) {
					switch (typeof l) {
						case "boolean":
							$b(f, l ? 1 : 0);
							break;
						case "number":
							ac(f, l);
							break;
						case "string":
							bc(f, l, -1, -1);
							break;
						case "object":
							if (null === l) eb(f);
							else if (null != l.length) {
								var n = ca(l.length);
								m.set(l, n);
								cc(f, n, l.length, -1);
								da(n);
							} else ra(f, "Wrong API use : tried to return a value of an unknown type (" + l + ").", -1);
							break;
						default: eb(f);
					}
				}
				function b(f, l) {
					for (var n = [], p = 0; p < f; p += 1) {
						var u = r(l + 4 * p, "i32"), v = dc(u);
						if (1 === v || 2 === v) u = ec(u);
						else if (3 === v) u = fc(u);
						else if (4 === v) {
							v = u;
							u = gc(v);
							v = hc(v);
							for (var K = new Uint8Array(u), I = 0; I < u; I += 1) K[I] = m[v + I];
							u = K;
						} else u = null;
						n.push(u);
					}
					return n;
				}
				function c(f, l) {
					this.Qa = f;
					this.db = l;
					this.Oa = 1;
					this.yb = [];
				}
				function d(f, l) {
					this.db = l;
					this.ob = ea(f);
					if (null === this.ob) throw Error("Unable to allocate memory for the SQL string");
					this.ub = this.ob;
					this.gb = this.Fb = null;
				}
				function e(f) {
					this.filename = "dbfile_" + (4294967295 * Math.random() >>> 0);
					if (null != f) {
						var l = this.filename, n = "/", p = l;
						n && (n = "string" == typeof n ? n : fa(n), p = l ? ha(n + "/" + l) : n);
						l = ia(!0, !0);
						p = ja(p, l);
						if (f) {
							if ("string" == typeof f) {
								n = Array(f.length);
								for (var u = 0, v = f.length; u < v; ++u) n[u] = f.charCodeAt(u);
								f = n;
							}
							ka(p, l | 146);
							n = la(p, 577);
							ma(n, f, 0, f.length, 0);
							na(n);
							ka(p, l);
						}
					}
					this.handleError(q(this.filename, g));
					this.db = r(g, "i32");
					hb(this.db);
					this.pb = {};
					this.Sa = {};
				}
				var g = y(4), h = k.cwrap, q = h("sqlite3_open", "number", ["string", "number"]), w = h("sqlite3_close_v2", "number", ["number"]), t = h("sqlite3_exec", "number", [
					"number",
					"string",
					"number",
					"number",
					"number"
				]), x = h("sqlite3_changes", "number", ["number"]), D = h("sqlite3_prepare_v2", "number", [
					"number",
					"string",
					"number",
					"number",
					"number"
				]), ib = h("sqlite3_sql", "string", ["number"]), jc = h("sqlite3_normalized_sql", "string", ["number"]), jb = h("sqlite3_prepare_v2", "number", [
					"number",
					"number",
					"number",
					"number",
					"number"
				]), kc = h("sqlite3_bind_text", "number", [
					"number",
					"number",
					"number",
					"number",
					"number"
				]), kb = h("sqlite3_bind_blob", "number", [
					"number",
					"number",
					"number",
					"number",
					"number"
				]), lc = h("sqlite3_bind_double", "number", [
					"number",
					"number",
					"number"
				]), mc = h("sqlite3_bind_int", "number", [
					"number",
					"number",
					"number"
				]), nc = h("sqlite3_bind_parameter_index", "number", ["number", "string"]), oc = h("sqlite3_step", "number", ["number"]), pc = h("sqlite3_errmsg", "string", ["number"]), qc = h("sqlite3_column_count", "number", ["number"]), rc = h("sqlite3_data_count", "number", ["number"]), sc = h("sqlite3_column_double", "number", ["number", "number"]), lb = h("sqlite3_column_text", "string", ["number", "number"]), tc = h("sqlite3_column_blob", "number", ["number", "number"]), uc = h("sqlite3_column_bytes", "number", ["number", "number"]), vc = h("sqlite3_column_type", "number", ["number", "number"]), wc = h("sqlite3_column_name", "string", ["number", "number"]), xc = h("sqlite3_reset", "number", ["number"]), yc = h("sqlite3_clear_bindings", "number", ["number"]), zc = h("sqlite3_finalize", "number", ["number"]), mb = h("sqlite3_create_function_v2", "number", "number string number number number number number number number".split(" ")), dc = h("sqlite3_value_type", "number", ["number"]), gc = h("sqlite3_value_bytes", "number", ["number"]), fc = h("sqlite3_value_text", "string", ["number"]), hc = h("sqlite3_value_blob", "number", ["number"]), ec = h("sqlite3_value_double", "number", ["number"]), ac = h("sqlite3_result_double", "", ["number", "number"]), eb = h("sqlite3_result_null", "", ["number"]), bc = h("sqlite3_result_text", "", [
					"number",
					"string",
					"number",
					"number"
				]), cc = h("sqlite3_result_blob", "", [
					"number",
					"number",
					"number",
					"number"
				]), $b = h("sqlite3_result_int", "", ["number", "number"]), ra = h("sqlite3_result_error", "", [
					"number",
					"string",
					"number"
				]), nb = h("sqlite3_aggregate_context", "number", ["number", "number"]), hb = h("RegisterExtensionFunctions", "number", ["number"]), ob = h("sqlite3_update_hook", "number", [
					"number",
					"number",
					"number"
				]);
				c.prototype.bind = function(f) {
					if (!this.Qa) throw "Statement closed";
					this.reset();
					return Array.isArray(f) ? this.Wb(f) : null != f && "object" === typeof f ? this.Xb(f) : !0;
				};
				c.prototype.step = function() {
					if (!this.Qa) throw "Statement closed";
					this.Oa = 1;
					var f = oc(this.Qa);
					switch (f) {
						case 100: return !0;
						case 101: return !1;
						default: throw this.db.handleError(f);
					}
				};
				c.prototype.Pb = function(f) {
					f ?? (f = this.Oa, this.Oa += 1);
					return sc(this.Qa, f);
				};
				c.prototype.hc = function(f) {
					f ?? (f = this.Oa, this.Oa += 1);
					f = lb(this.Qa, f);
					if ("function" !== typeof BigInt) throw Error("BigInt is not supported");
					return BigInt(f);
				};
				c.prototype.mc = function(f) {
					f ?? (f = this.Oa, this.Oa += 1);
					return lb(this.Qa, f);
				};
				c.prototype.getBlob = function(f) {
					f ?? (f = this.Oa, this.Oa += 1);
					var l = uc(this.Qa, f);
					f = tc(this.Qa, f);
					for (var n = new Uint8Array(l), p = 0; p < l; p += 1) n[p] = m[f + p];
					return n;
				};
				c.prototype.get = function(f, l) {
					l = l || {};
					null != f && this.bind(f) && this.step();
					f = [];
					for (var n = rc(this.Qa), p = 0; p < n; p += 1) switch (vc(this.Qa, p)) {
						case 1:
							var u = l.useBigInt ? this.hc(p) : this.Pb(p);
							f.push(u);
							break;
						case 2:
							f.push(this.Pb(p));
							break;
						case 3:
							f.push(this.mc(p));
							break;
						case 4:
							f.push(this.getBlob(p));
							break;
						default: f.push(null);
					}
					return f;
				};
				c.prototype.Db = function() {
					for (var f = [], l = qc(this.Qa), n = 0; n < l; n += 1) f.push(wc(this.Qa, n));
					return f;
				};
				c.prototype.Ob = function(f, l) {
					f = this.get(f, l);
					l = this.Db();
					for (var n = {}, p = 0; p < l.length; p += 1) n[l[p]] = f[p];
					return n;
				};
				c.prototype.lc = function() {
					return ib(this.Qa);
				};
				c.prototype.ic = function() {
					return jc(this.Qa);
				};
				c.prototype.Jb = function(f) {
					null != f && this.bind(f);
					this.step();
					return this.reset();
				};
				c.prototype.Lb = function(f, l) {
					l ?? (l = this.Oa, this.Oa += 1);
					f = ea(f);
					this.yb.push(f);
					this.db.handleError(kc(this.Qa, l, f, -1, 0));
				};
				c.prototype.Vb = function(f, l) {
					l ?? (l = this.Oa, this.Oa += 1);
					var n = ca(f.length);
					m.set(f, n);
					this.yb.push(n);
					this.db.handleError(kb(this.Qa, l, n, f.length, 0));
				};
				c.prototype.Kb = function(f, l) {
					l ?? (l = this.Oa, this.Oa += 1);
					this.db.handleError((f === (f | 0) ? mc : lc)(this.Qa, l, f));
				};
				c.prototype.Yb = function(f) {
					f ?? (f = this.Oa, this.Oa += 1);
					kb(this.Qa, f, 0, 0, 0);
				};
				c.prototype.Mb = function(f, l) {
					l ?? (l = this.Oa, this.Oa += 1);
					switch (typeof f) {
						case "string":
							this.Lb(f, l);
							return;
						case "number":
							this.Kb(f, l);
							return;
						case "bigint":
							this.Lb(f.toString(), l);
							return;
						case "boolean":
							this.Kb(f + 0, l);
							return;
						case "object":
							if (null === f) {
								this.Yb(l);
								return;
							}
							if (null != f.length) {
								this.Vb(f, l);
								return;
							}
					}
					throw "Wrong API use : tried to bind a value of an unknown type (" + f + ").";
				};
				c.prototype.Xb = function(f) {
					var l = this;
					Object.keys(f).forEach(function(n) {
						var p = nc(l.Qa, n);
						0 !== p && l.Mb(f[n], p);
					});
					return !0;
				};
				c.prototype.Wb = function(f) {
					for (var l = 0; l < f.length; l += 1) this.Mb(f[l], l + 1);
					return !0;
				};
				c.prototype.reset = function() {
					this.Cb();
					return 0 === yc(this.Qa) && 0 === xc(this.Qa);
				};
				c.prototype.Cb = function() {
					for (var f; void 0 !== (f = this.yb.pop());) da(f);
				};
				c.prototype.cb = function() {
					this.Cb();
					var f = 0 === zc(this.Qa);
					delete this.db.pb[this.Qa];
					this.Qa = 0;
					return f;
				};
				d.prototype.next = function() {
					if (null === this.ob) return { done: !0 };
					null !== this.gb && (this.gb.cb(), this.gb = null);
					if (!this.db.db) throw this.Ab(), Error("Database closed");
					var f = oa(), l = y(4);
					pa(g);
					pa(l);
					try {
						this.db.handleError(jb(this.db.db, this.ub, -1, g, l));
						this.ub = r(l, "i32");
						var n = r(g, "i32");
						if (0 === n) return this.Ab(), { done: !0 };
						this.gb = new c(n, this.db);
						this.db.pb[n] = this.gb;
						return {
							value: this.gb,
							done: !1
						};
					} catch (p) {
						throw this.Fb = z(this.ub), this.Ab(), p;
					} finally {
						qa(f);
					}
				};
				d.prototype.Ab = function() {
					da(this.ob);
					this.ob = null;
				};
				d.prototype.jc = function() {
					return null !== this.Fb ? this.Fb : z(this.ub);
				};
				"function" === typeof Symbol && "symbol" === typeof Symbol.iterator && (d.prototype[Symbol.iterator] = function() {
					return this;
				});
				e.prototype.Jb = function(f, l) {
					if (!this.db) throw "Database closed";
					if (l) {
						f = this.Gb(f, l);
						try {
							f.step();
						} finally {
							f.cb();
						}
					} else this.handleError(t(this.db, f, 0, 0, g));
					return this;
				};
				e.prototype.exec = function(f, l, n) {
					if (!this.db) throw "Database closed";
					var p = null, u = null, v = null;
					try {
						v = u = ea(f);
						var K = y(4);
						for (f = []; 0 !== r(v, "i8");) {
							pa(g);
							pa(K);
							this.handleError(jb(this.db, v, -1, g, K));
							var I = r(g, "i32");
							v = r(K, "i32");
							if (0 !== I) {
								var H = null;
								p = new c(I, this);
								for (null != l && p.bind(l); p.step();) null === H && (H = {
									columns: p.Db(),
									values: []
								}, f.push(H)), H.values.push(p.get(null, n));
								p.cb();
							}
						}
						return f;
					} catch (L) {
						throw p && p.cb(), L;
					} finally {
						u && da(u);
					}
				};
				e.prototype.ec = function(f, l, n, p, u) {
					"function" === typeof l && (p = n, n = l, l = void 0);
					f = this.Gb(f, l);
					try {
						for (; f.step();) n(f.Ob(null, u));
					} finally {
						f.cb();
					}
					if ("function" === typeof p) return p();
				};
				e.prototype.Gb = function(f, l) {
					pa(g);
					this.handleError(D(this.db, f, -1, g, 0));
					f = r(g, "i32");
					if (0 === f) throw "Nothing to prepare";
					var n = new c(f, this);
					null != l && n.bind(l);
					return this.pb[f] = n;
				};
				e.prototype.pc = function(f) {
					return new d(f, this);
				};
				e.prototype.fc = function() {
					Object.values(this.pb).forEach(function(l) {
						l.cb();
					});
					Object.values(this.Sa).forEach(A);
					this.Sa = {};
					this.handleError(w(this.db));
					var f = sa(this.filename);
					this.handleError(q(this.filename, g));
					this.db = r(g, "i32");
					hb(this.db);
					return f;
				};
				e.prototype.close = function() {
					null !== this.db && (Object.values(this.pb).forEach(function(f) {
						f.cb();
					}), Object.values(this.Sa).forEach(A), this.Sa = {}, this.fb && (A(this.fb), this.fb = void 0), this.handleError(w(this.db)), ta("/" + this.filename), this.db = null);
				};
				e.prototype.handleError = function(f) {
					if (0 === f) return null;
					f = pc(this.db);
					throw Error(f);
				};
				e.prototype.kc = function() {
					return x(this.db);
				};
				e.prototype.bc = function(f, l) {
					Object.prototype.hasOwnProperty.call(this.Sa, f) && (A(this.Sa[f]), delete this.Sa[f]);
					var n = ua(function(p, u, v) {
						u = b(u, v);
						try {
							var K = l.apply(null, u);
						} catch (I) {
							ra(p, I, -1);
							return;
						}
						a(p, K);
					}, "viii");
					this.Sa[f] = n;
					this.handleError(mb(this.db, f, l.length, 1, 0, n, 0, 0, 0));
					return this;
				};
				e.prototype.ac = function(f, l) {
					var n = l.init || function() {
						return null;
					}, p = l.finalize || function(H) {
						return H;
					}, u = l.step;
					if (!u) throw "An aggregate function must have a step function in " + f;
					var v = {};
					Object.hasOwnProperty.call(this.Sa, f) && (A(this.Sa[f]), delete this.Sa[f]);
					l = f + "__finalize";
					Object.hasOwnProperty.call(this.Sa, l) && (A(this.Sa[l]), delete this.Sa[l]);
					var K = ua(function(H, L, Ka) {
						var V = nb(H, 1);
						Object.hasOwnProperty.call(v, V) || (v[V] = n());
						L = b(L, Ka);
						L = [v[V]].concat(L);
						try {
							v[V] = u.apply(null, L);
						} catch (Bc) {
							delete v[V], ra(H, Bc, -1);
						}
					}, "viii"), I = ua(function(H) {
						var L = nb(H, 1);
						try {
							var Ka = p(v[L]);
						} catch (V) {
							delete v[L];
							ra(H, V, -1);
							return;
						}
						a(H, Ka);
						delete v[L];
					}, "vi");
					this.Sa[f] = K;
					this.Sa[l] = I;
					this.handleError(mb(this.db, f, u.length - 1, 1, 0, 0, K, I, 0));
					return this;
				};
				e.prototype.vc = function(f) {
					this.fb && (ob(this.db, 0, 0), A(this.fb), this.fb = void 0);
					if (!f) return this;
					this.fb = ua(function(l, n, p, u, v) {
						switch (n) {
							case 18:
								l = "insert";
								break;
							case 23:
								l = "update";
								break;
							case 9:
								l = "delete";
								break;
							default: throw "unknown operationCode in updateHook callback: " + n;
						}
						p = z(p);
						u = z(u);
						if (v > Number.MAX_SAFE_INTEGER) throw "rowId too big to fit inside a Number";
						f(l, p, u, Number(v));
					}, "viiiij");
					ob(this.db, this.fb, 0);
					return this;
				};
				c.prototype.bind = c.prototype.bind;
				c.prototype.step = c.prototype.step;
				c.prototype.get = c.prototype.get;
				c.prototype.getColumnNames = c.prototype.Db;
				c.prototype.getAsObject = c.prototype.Ob;
				c.prototype.getSQL = c.prototype.lc;
				c.prototype.getNormalizedSQL = c.prototype.ic;
				c.prototype.run = c.prototype.Jb;
				c.prototype.reset = c.prototype.reset;
				c.prototype.freemem = c.prototype.Cb;
				c.prototype.free = c.prototype.cb;
				d.prototype.next = d.prototype.next;
				d.prototype.getRemainingSQL = d.prototype.jc;
				e.prototype.run = e.prototype.Jb;
				e.prototype.exec = e.prototype.exec;
				e.prototype.each = e.prototype.ec;
				e.prototype.prepare = e.prototype.Gb;
				e.prototype.iterateStatements = e.prototype.pc;
				e.prototype["export"] = e.prototype.fc;
				e.prototype.close = e.prototype.close;
				e.prototype.handleError = e.prototype.handleError;
				e.prototype.getRowsModified = e.prototype.kc;
				e.prototype.create_function = e.prototype.bc;
				e.prototype.create_aggregate = e.prototype.ac;
				e.prototype.updateHook = e.prototype.vc;
				k.Database = e;
			};
			var va = "./this.program", wa = globalThis.document?.currentScript?.src;
			ba && (wa = self.location.href);
			var xa = "", ya, za;
			if (aa || ba) {
				try {
					xa = new URL(".", wa).href;
				} catch {}
				ba && (za = (a) => {
					var b = new XMLHttpRequest();
					b.open("GET", a, !1);
					b.responseType = "arraybuffer";
					b.send(null);
					return new Uint8Array(b.response);
				});
				ya = async (a) => {
					a = await fetch(a, { credentials: "same-origin" });
					if (a.ok) return a.arrayBuffer();
					throw Error(a.status + " : " + a.url);
				};
			}
			var Aa = console.log.bind(console), B = console.error.bind(console), Ba, Ca = !1, Da, m, C, Ea, E, F, Fa, Ga, G;
			function Ha() {
				var a = Ia.buffer;
				m = new Int8Array(a);
				Ea = new Int16Array(a);
				C = new Uint8Array(a);
				new Uint16Array(a);
				E = new Int32Array(a);
				F = new Uint32Array(a);
				Fa = new Float32Array(a);
				Ga = new Float64Array(a);
				G = new BigInt64Array(a);
				new BigUint64Array(a);
			}
			function Ja(a) {
				k.onAbort?.(a);
				a = "Aborted(" + a + ")";
				B(a);
				Ca = !0;
				throw new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
			}
			var La;
			async function Ma(a) {
				if (!Ba) try {
					var b = await ya(a);
					return new Uint8Array(b);
				} catch {}
				if (a == La && Ba) a = new Uint8Array(Ba);
				else if (za) a = za(a);
				else throw "both async and sync fetching of the wasm failed";
				return a;
			}
			async function Na(a, b) {
				try {
					var c = await Ma(a);
					return await WebAssembly.instantiate(c, b);
				} catch (d) {
					B(`failed to asynchronously prepare wasm: ${d}`), Ja(d);
				}
			}
			async function Oa(a) {
				var b = La;
				if (!Ba) try {
					var c = fetch(b, { credentials: "same-origin" });
					return await WebAssembly.instantiateStreaming(c, a);
				} catch (d) {
					B(`wasm streaming compile failed: ${d}`), B("falling back to ArrayBuffer instantiation");
				}
				return Na(b, a);
			}
			class Pa {
				constructor(a) {
					_defineProperty(this, "name", "ExitStatus");
					this.message = `Program terminated with exit(${a})`;
					this.status = a;
				}
			}
			var Qa = (a) => {
				for (; 0 < a.length;) a.shift()(k);
			}, Ra = [], Sa = [], Ta = () => {
				var a = k.preRun.shift();
				Sa.push(a);
			}, J = 0, Ua = null;
			function r(a, b = "i8") {
				b.endsWith("*") && (b = "*");
				switch (b) {
					case "i1": return m[a];
					case "i8": return m[a];
					case "i16": return Ea[a >> 1];
					case "i32": return E[a >> 2];
					case "i64": return G[a >> 3];
					case "float": return Fa[a >> 2];
					case "double": return Ga[a >> 3];
					case "*": return F[a >> 2];
					default: Ja(`invalid type for getValue: ${b}`);
				}
			}
			var Va = !0;
			function pa(a) {
				var b = "i32";
				b.endsWith("*") && (b = "*");
				switch (b) {
					case "i1":
						m[a] = 0;
						break;
					case "i8":
						m[a] = 0;
						break;
					case "i16":
						Ea[a >> 1] = 0;
						break;
					case "i32":
						E[a >> 2] = 0;
						break;
					case "i64":
						G[a >> 3] = BigInt(0);
						break;
					case "float":
						Fa[a >> 2] = 0;
						break;
					case "double":
						Ga[a >> 3] = 0;
						break;
					case "*":
						F[a >> 2] = 0;
						break;
					default: Ja(`invalid type for setValue: ${b}`);
				}
			}
			var Wa = new TextDecoder(), Xa = (a, b, c, d) => {
				c = b + c;
				if (d) return c;
				for (; a[b] && !(b >= c);) ++b;
				return b;
			}, z = (a, b, c) => a ? Wa.decode(C.subarray(a, Xa(C, a, b, c))) : "", Ya = (a, b) => {
				for (var c = 0, d = a.length - 1; 0 <= d; d--) {
					var e = a[d];
					"." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
				}
				if (b) for (; c; c--) a.unshift("..");
				return a;
			}, ha = (a) => {
				var b = "/" === a.charAt(0), c = "/" === a.slice(-1);
				(a = Ya(a.split("/").filter((d) => !!d), !b).join("/")) || b || (a = ".");
				a && c && (a += "/");
				return (b ? "/" : "") + a;
			}, Za = (a) => {
				var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
				a = b[0];
				b = b[1];
				if (!a && !b) return ".";
				b && (b = b.slice(0, -1));
				return a + b;
			}, $a = (a) => a && a.match(/([^\/]+|\/)\/*$/)[1], ab = () => (a) => crypto.getRandomValues(a), bb = (a) => {
				(bb = ab())(a);
			}, cb = (...a) => {
				for (var b = "", c = !1, d = a.length - 1; -1 <= d && !c; d--) {
					c = 0 <= d ? a[d] : "/";
					if ("string" != typeof c) throw new TypeError("Arguments to path.resolve must be strings");
					if (!c) return "";
					b = c + "/" + b;
					c = "/" === c.charAt(0);
				}
				b = Ya(b.split("/").filter((e) => !!e), !c).join("/");
				return (c ? "/" : "") + b || ".";
			}, db = (a) => {
				var b = Xa(a, 0);
				return Wa.decode(a.buffer ? a.subarray(0, b) : new Uint8Array(a.slice(0, b)));
			}, fb = [], gb = (a) => {
				for (var b = 0, c = 0; c < a.length; ++c) {
					var d = a.charCodeAt(c);
					127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
				}
				return b;
			}, M = (a, b, c, d) => {
				if (!(0 < d)) return 0;
				var e = c;
				d = c + d - 1;
				for (var g = 0; g < a.length; ++g) {
					var h = a.codePointAt(g);
					if (127 >= h) {
						if (c >= d) break;
						b[c++] = h;
					} else if (2047 >= h) {
						if (c + 1 >= d) break;
						b[c++] = 192 | h >> 6;
						b[c++] = 128 | h & 63;
					} else if (65535 >= h) {
						if (c + 2 >= d) break;
						b[c++] = 224 | h >> 12;
						b[c++] = 128 | h >> 6 & 63;
						b[c++] = 128 | h & 63;
					} else {
						if (c + 3 >= d) break;
						b[c++] = 240 | h >> 18;
						b[c++] = 128 | h >> 12 & 63;
						b[c++] = 128 | h >> 6 & 63;
						b[c++] = 128 | h & 63;
						g++;
					}
				}
				b[c] = 0;
				return c - e;
			}, pb = [];
			function qb(a, b) {
				pb[a] = {
					input: [],
					output: [],
					kb: b
				};
				rb(a, sb);
			}
			var sb = {
				open(a) {
					var b = pb[a.node.nb];
					if (!b) throw new N(43);
					a.Va = b;
					a.seekable = !1;
				},
				close(a) {
					a.Va.kb.lb(a.Va);
				},
				lb(a) {
					a.Va.kb.lb(a.Va);
				},
				read(a, b, c, d) {
					if (!a.Va || !a.Va.kb.Qb) throw new N(60);
					for (var e = 0, g = 0; g < d; g++) {
						try {
							var h = a.Va.kb.Qb(a.Va);
						} catch (q) {
							throw new N(29);
						}
						if (void 0 === h && 0 === e) throw new N(6);
						if (null === h || void 0 === h) break;
						e++;
						b[c + g] = h;
					}
					e && (a.node.$a = Date.now());
					return e;
				},
				write(a, b, c, d) {
					if (!a.Va || !a.Va.kb.Hb) throw new N(60);
					try {
						for (var e = 0; e < d; e++) a.Va.kb.Hb(a.Va, b[c + e]);
					} catch (g) {
						throw new N(29);
					}
					d && (a.node.Ua = a.node.Ta = Date.now());
					return e;
				}
			}, tb = {
				Qb() {
					a: {
						if (!fb.length) {
							var a = null;
							globalThis.window?.prompt && (a = window.prompt("Input: "), null !== a && (a += "\n"));
							if (!a) {
								var b = null;
								break a;
							}
							b = Array(gb(a) + 1);
							a = M(a, b, 0, b.length);
							b.length = a;
							fb = b;
						}
						b = fb.shift();
					}
					return b;
				},
				Hb(a, b) {
					null === b || 10 === b ? (Aa(db(a.output)), a.output = []) : 0 != b && a.output.push(b);
				},
				lb(a) {
					0 < a.output?.length && (Aa(db(a.output)), a.output = []);
				},
				Dc() {
					return {
						yc: 25856,
						Ac: 5,
						xc: 191,
						zc: 35387,
						wc: [
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
				Ec() {
					return 0;
				},
				Fc() {
					return [24, 80];
				}
			}, ub = {
				Hb(a, b) {
					null === b || 10 === b ? (B(db(a.output)), a.output = []) : 0 != b && a.output.push(b);
				},
				lb(a) {
					0 < a.output?.length && (B(db(a.output)), a.output = []);
				}
			}, O = {
				Za: null,
				ab() {
					return O.createNode(null, "/", 16895, 0);
				},
				createNode(a, b, c, d) {
					if (24576 === (c & 61440) || 4096 === (c & 61440)) throw new N(63);
					O.Za || (O.Za = {
						dir: {
							node: {
								Wa: O.La.Wa,
								Xa: O.La.Xa,
								mb: O.La.mb,
								rb: O.La.rb,
								Tb: O.La.Tb,
								xb: O.La.xb,
								vb: O.La.vb,
								Ib: O.La.Ib,
								wb: O.La.wb
							},
							stream: { Ya: O.Ma.Ya }
						},
						file: {
							node: {
								Wa: O.La.Wa,
								Xa: O.La.Xa
							},
							stream: {
								Ya: O.Ma.Ya,
								read: O.Ma.read,
								write: O.Ma.write,
								sb: O.Ma.sb,
								tb: O.Ma.tb
							}
						},
						link: {
							node: {
								Wa: O.La.Wa,
								Xa: O.La.Xa,
								eb: O.La.eb
							},
							stream: {}
						},
						Nb: {
							node: {
								Wa: O.La.Wa,
								Xa: O.La.Xa
							},
							stream: vb
						}
					});
					c = wb(a, b, c, d);
					P(c.mode) ? (c.La = O.Za.dir.node, c.Ma = O.Za.dir.stream, c.Na = {}) : 32768 === (c.mode & 61440) ? (c.La = O.Za.file.node, c.Ma = O.Za.file.stream, c.Ra = 0, c.Na = null) : 40960 === (c.mode & 61440) ? (c.La = O.Za.link.node, c.Ma = O.Za.link.stream) : 8192 === (c.mode & 61440) && (c.La = O.Za.Nb.node, c.Ma = O.Za.Nb.stream);
					c.$a = c.Ua = c.Ta = Date.now();
					a && (a.Na[b] = c, a.$a = a.Ua = a.Ta = c.$a);
					return c;
				},
				Cc(a) {
					return a.Na ? a.Na.subarray ? a.Na.subarray(0, a.Ra) : new Uint8Array(a.Na) : /* @__PURE__ */ new Uint8Array(0);
				},
				La: {
					Wa(a) {
						var b = {};
						b.cc = 8192 === (a.mode & 61440) ? a.id : 1;
						b.oc = a.id;
						b.mode = a.mode;
						b.rc = 1;
						b.uid = 0;
						b.nc = 0;
						b.nb = a.nb;
						P(a.mode) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.Ra : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
						b.$a = new Date(a.$a);
						b.Ua = new Date(a.Ua);
						b.Ta = new Date(a.Ta);
						b.Zb = 4096;
						b.$b = Math.ceil(b.size / b.Zb);
						return b;
					},
					Xa(a, b) {
						for (var c of [
							"mode",
							"atime",
							"mtime",
							"ctime"
						]) null != b[c] && (a[c] = b[c]);
						void 0 !== b.size && (b = b.size, a.Ra != b && (0 == b ? (a.Na = null, a.Ra = 0) : (c = a.Na, a.Na = new Uint8Array(b), c && a.Na.set(c.subarray(0, Math.min(b, a.Ra))), a.Ra = b)));
					},
					mb() {
						O.zb || (O.zb = new N(44), O.zb.stack = "<generic error, no stack>");
						throw O.zb;
					},
					rb(a, b, c, d) {
						return O.createNode(a, b, c, d);
					},
					Tb(a, b, c) {
						try {
							var d = Q(b, c);
						} catch (g) {}
						if (d) {
							if (P(a.mode)) for (var e in d.Na) throw new N(55);
							xb(d);
						}
						delete a.parent.Na[a.name];
						b.Na[c] = a;
						a.name = c;
						b.Ta = b.Ua = a.parent.Ta = a.parent.Ua = Date.now();
					},
					xb(a, b) {
						delete a.Na[b];
						a.Ta = a.Ua = Date.now();
					},
					vb(a, b) {
						var c = Q(a, b), d;
						for (d in c.Na) throw new N(55);
						delete a.Na[b];
						a.Ta = a.Ua = Date.now();
					},
					Ib(a) {
						return [
							".",
							"..",
							...Object.keys(a.Na)
						];
					},
					wb(a, b, c) {
						a = O.createNode(a, b, 41471, 0);
						a.link = c;
						return a;
					},
					eb(a) {
						if (40960 !== (a.mode & 61440)) throw new N(28);
						return a.link;
					}
				},
				Ma: {
					read(a, b, c, d, e) {
						var g = a.node.Na;
						if (e >= a.node.Ra) return 0;
						a = Math.min(a.node.Ra - e, d);
						if (8 < a && g.subarray) b.set(g.subarray(e, e + a), c);
						else for (d = 0; d < a; d++) b[c + d] = g[e + d];
						return a;
					},
					write(a, b, c, d, e, g) {
						b.buffer === m.buffer && (g = !1);
						if (!d) return 0;
						a = a.node;
						a.Ua = a.Ta = Date.now();
						if (b.subarray && (!a.Na || a.Na.subarray)) {
							if (g) return a.Na = b.subarray(c, c + d), a.Ra = d;
							if (0 === a.Ra && 0 === e) return a.Na = b.slice(c, c + d), a.Ra = d;
							if (e + d <= a.Ra) return a.Na.set(b.subarray(c, c + d), e), d;
						}
						g = e + d;
						var h = a.Na ? a.Na.length : 0;
						h >= g || (g = Math.max(g, h * (1048576 > h ? 2 : 1.125) >>> 0), 0 != h && (g = Math.max(g, 256)), h = a.Na, a.Na = new Uint8Array(g), 0 < a.Ra && a.Na.set(h.subarray(0, a.Ra), 0));
						if (a.Na.subarray && b.subarray) a.Na.set(b.subarray(c, c + d), e);
						else for (g = 0; g < d; g++) a.Na[e + g] = b[c + g];
						a.Ra = Math.max(a.Ra, e + d);
						return d;
					},
					Ya(a, b, c) {
						1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.Ra);
						if (0 > b) throw new N(28);
						return b;
					},
					sb(a, b, c, d, e) {
						if (32768 !== (a.node.mode & 61440)) throw new N(43);
						a = a.node.Na;
						if (e & 2 || !a || a.buffer !== m.buffer) {
							e = !0;
							d = 65536 * Math.ceil(b / 65536);
							var g = yb(65536, d);
							g && C.fill(0, g, g + d);
							d = g;
							if (!d) throw new N(48);
							if (a) {
								if (0 < c || c + b < a.length) a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
								m.set(a, d);
							}
						} else e = !1, d = a.byteOffset;
						return {
							tc: d,
							Ub: e
						};
					},
					tb(a, b, c, d) {
						O.Ma.write(a, b, 0, d, c, !1);
						return 0;
					}
				}
			}, ia = (a, b) => {
				var c = 0;
				a && (c |= 365);
				b && (c |= 146);
				return c;
			}, zb = null, Ab = {}, Bb = [], Cb = 1, R = null, Db = !1, Eb = !0, N = class {
				constructor(a) {
					_defineProperty(this, "name", "ErrnoError");
					this.Pa = a;
				}
			}, Fb = class {
				constructor() {
					_defineProperty(this, "qb", {});
					_defineProperty(this, "node", null);
				}
				get flags() {
					return this.qb.flags;
				}
				set flags(a) {
					this.qb.flags = a;
				}
				get position() {
					return this.qb.position;
				}
				set position(a) {
					this.qb.position = a;
				}
			}, Gb = class {
				constructor(a, b, c, d) {
					_defineProperty(this, "La", {});
					_defineProperty(this, "Ma", {});
					_defineProperty(this, "ib", null);
					a || (a = this);
					this.parent = a;
					this.ab = a.ab;
					this.id = Cb++;
					this.name = b;
					this.mode = c;
					this.nb = d;
					this.$a = this.Ua = this.Ta = Date.now();
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
			function S(a, b = {}) {
				if (!a) throw new N(44);
				b.Bb ?? (b.Bb = !0);
				"/" === a.charAt(0) || (a = "//" + a);
				var c = 0;
				a: for (; 40 > c; c++) {
					a = a.split("/").filter((q) => !!q);
					for (var d = zb, e = "/", g = 0; g < a.length; g++) {
						var h = g === a.length - 1;
						if (h && b.parent) break;
						if ("." !== a[g]) if (".." === a[g]) if (e = Za(e), d === d.parent) {
							a = e + "/" + a.slice(g + 1).join("/");
							c--;
							continue a;
						} else d = d.parent;
						else {
							e = ha(e + "/" + a[g]);
							try {
								d = Q(d, a[g]);
							} catch (q) {
								if (44 === q?.Pa && h && b.sc) return { path: e };
								throw q;
							}
							!d.ib || h && !b.Bb || (d = d.ib.root);
							if (40960 === (d.mode & 61440) && (!h || b.hb)) {
								if (!d.La.eb) throw new N(52);
								d = d.La.eb(d);
								"/" === d.charAt(0) || (d = Za(e) + "/" + d);
								a = d + "/" + a.slice(g + 1).join("/");
								continue a;
							}
						}
					}
					return {
						path: e,
						node: d
					};
				}
				throw new N(32);
			}
			function fa(a) {
				for (var b;;) {
					if (a === a.parent) return a = a.ab.Sb, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
					b = b ? `${a.name}/${b}` : a.name;
					a = a.parent;
				}
			}
			function Hb(a, b) {
				for (var c = 0, d = 0; d < b.length; d++) c = (c << 5) - c + b.charCodeAt(d) | 0;
				return (a + c >>> 0) % R.length;
			}
			function xb(a) {
				var b = Hb(a.parent.id, a.name);
				if (R[b] === a) R[b] = a.jb;
				else for (b = R[b]; b;) {
					if (b.jb === a) {
						b.jb = a.jb;
						break;
					}
					b = b.jb;
				}
			}
			function Q(a, b) {
				var c = P(a.mode) ? (c = Ib(a, "x")) ? c : a.La.mb ? 0 : 2 : 54;
				if (c) throw new N(c);
				for (c = R[Hb(a.id, b)]; c; c = c.jb) {
					var d = c.name;
					if (c.parent.id === a.id && d === b) return c;
				}
				return a.La.mb(a, b);
			}
			function wb(a, b, c, d) {
				a = new Gb(a, b, c, d);
				b = Hb(a.parent.id, a.name);
				a.jb = R[b];
				return R[b] = a;
			}
			function P(a) {
				return 16384 === (a & 61440);
			}
			function Ib(a, b) {
				return Eb ? 0 : b.includes("r") && !(a.mode & 292) || b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73) ? 2 : 0;
			}
			function Jb(a, b) {
				if (!P(a.mode)) return 54;
				try {
					return Q(a, b), 20;
				} catch (c) {}
				return Ib(a, "wx");
			}
			function Kb(a, b, c) {
				try {
					var d = Q(a, b);
				} catch (e) {
					return e.Pa;
				}
				if (a = Ib(a, "wx")) return a;
				if (c) {
					if (!P(d.mode)) return 54;
					if (d === d.parent || "/" === fa(d)) return 10;
				} else if (P(d.mode)) return 31;
				return 0;
			}
			function Lb(a) {
				if (!a) throw new N(63);
				return a;
			}
			function T(a) {
				a = Bb[a];
				if (!a) throw new N(8);
				return a;
			}
			function Mb(a, b = -1) {
				a = Object.assign(new Fb(), a);
				if (-1 == b) a: {
					for (b = 0; 4096 >= b; b++) if (!Bb[b]) break a;
					throw new N(33);
				}
				a.bb = b;
				return Bb[b] = a;
			}
			function Nb(a, b = -1) {
				a = Mb(a, b);
				a.Ma?.Bc?.(a);
				return a;
			}
			function Ob(a, b, c) {
				var d = a?.Ma.Xa;
				a = d ? a : b;
				d ?? (d = b.La.Xa);
				Lb(d);
				d(a, c);
			}
			var vb = {
				open(a) {
					a.Ma = Ab[a.node.nb].Ma;
					a.Ma.open?.(a);
				},
				Ya() {
					throw new N(70);
				}
			};
			function rb(a, b) {
				Ab[a] = { Ma: b };
			}
			function Pb(a, b) {
				var c = "/" === b;
				if (c && zb) throw new N(10);
				if (!c && b) {
					var d = S(b, { Bb: !1 });
					b = d.path;
					d = d.node;
					if (d.ib) throw new N(10);
					if (!P(d.mode)) throw new N(54);
				}
				b = {
					type: a,
					Gc: {},
					Sb: b,
					qc: []
				};
				a = a.ab(b);
				a.ab = b;
				b.root = a;
				c ? zb = a : d && (d.ib = b, d.ab && d.ab.qc.push(b));
			}
			function Qb(a, b, c) {
				var d = S(a, { parent: !0 }).node;
				a = $a(a);
				if (!a) throw new N(28);
				if ("." === a || ".." === a) throw new N(20);
				var e = Jb(d, a);
				if (e) throw new N(e);
				if (!d.La.rb) throw new N(63);
				return d.La.rb(d, a, b, c);
			}
			function ja(a, b = 438) {
				return Qb(a, b & 4095 | 32768, 0);
			}
			function U(a, b = 511) {
				return Qb(a, b & 1023 | 16384, 0);
			}
			function Rb(a, b, c) {
				"undefined" == typeof c && (c = b, b = 438);
				Qb(a, b | 8192, c);
			}
			function Sb(a, b) {
				if (!cb(a)) throw new N(44);
				var c = S(b, { parent: !0 }).node;
				if (!c) throw new N(44);
				b = $a(b);
				var d = Jb(c, b);
				if (d) throw new N(d);
				if (!c.La.wb) throw new N(63);
				c.La.wb(c, b, a);
			}
			function Tb(a) {
				var b = S(a, { parent: !0 }).node;
				a = $a(a);
				var c = Q(b, a), d = Kb(b, a, !0);
				if (d) throw new N(d);
				if (!b.La.vb) throw new N(63);
				if (c.ib) throw new N(10);
				b.La.vb(b, a);
				xb(c);
			}
			function ta(a) {
				var b = S(a, { parent: !0 }).node;
				if (!b) throw new N(44);
				a = $a(a);
				var c = Q(b, a), d = Kb(b, a, !1);
				if (d) throw new N(d);
				if (!b.La.xb) throw new N(63);
				if (c.ib) throw new N(10);
				b.La.xb(b, a);
				xb(c);
			}
			function Ub(a, b) {
				a = S(a, { hb: !b }).node;
				return Lb(a.La.Wa)(a);
			}
			function Vb(a, b, c, d) {
				Ob(a, b, {
					mode: c & 4095 | b.mode & -4096,
					Ta: Date.now(),
					dc: d
				});
			}
			function ka(a, b) {
				a = "string" == typeof a ? S(a, { hb: !0 }).node : a;
				Vb(null, a, b);
			}
			function Wb(a, b, c) {
				if (P(b.mode)) throw new N(31);
				if (32768 !== (b.mode & 61440)) throw new N(28);
				var d = Ib(b, "w");
				if (d) throw new N(d);
				Ob(a, b, {
					size: c,
					timestamp: Date.now()
				});
			}
			function la(a, b, c = 438) {
				if ("" === a) throw new N(44);
				if ("string" == typeof b) {
					var d = {
						r: 0,
						"r+": 2,
						w: 577,
						"w+": 578,
						a: 1089,
						"a+": 1090
					}[b];
					if ("undefined" == typeof d) throw Error(`Unknown file open mode: ${b}`);
					b = d;
				}
				c = b & 64 ? c & 4095 | 32768 : 0;
				if ("object" == typeof a) d = a;
				else {
					var e = a.endsWith("/");
					var g = S(a, {
						hb: !(b & 131072),
						sc: !0
					});
					d = g.node;
					a = g.path;
				}
				g = !1;
				if (b & 64) if (d) {
					if (b & 128) throw new N(20);
				} else {
					if (e) throw new N(31);
					d = Qb(a, c | 511, 0);
					g = !0;
				}
				if (!d) throw new N(44);
				8192 === (d.mode & 61440) && (b &= -513);
				if (b & 65536 && !P(d.mode)) throw new N(54);
				if (!g && (d ? 40960 === (d.mode & 61440) ? e = 32 : (e = [
					"r",
					"w",
					"rw"
				][b & 3], b & 512 && (e += "w"), e = P(d.mode) && ("r" !== e || b & 576) ? 31 : Ib(d, e)) : e = 44, e)) throw new N(e);
				b & 512 && !g && (e = d, e = "string" == typeof e ? S(e, { hb: !0 }).node : e, Wb(null, e, 0));
				b = Mb({
					node: d,
					path: fa(d),
					flags: b & -131713,
					seekable: !0,
					position: 0,
					Ma: d.Ma,
					uc: [],
					error: !1
				});
				b.Ma.open && b.Ma.open(b);
				g && ka(d, c & 511);
				return b;
			}
			function na(a) {
				if (null === a.bb) throw new N(8);
				a.Eb && (a.Eb = null);
				try {
					a.Ma.close && a.Ma.close(a);
				} catch (b) {
					throw b;
				} finally {
					Bb[a.bb] = null;
				}
				a.bb = null;
			}
			function Xb(a, b, c) {
				if (null === a.bb) throw new N(8);
				if (!a.seekable || !a.Ma.Ya) throw new N(70);
				if (0 != c && 1 != c && 2 != c) throw new N(28);
				a.position = a.Ma.Ya(a, b, c);
				a.uc = [];
			}
			function Yb(a, b, c, d, e) {
				if (0 > d || 0 > e) throw new N(28);
				if (null === a.bb) throw new N(8);
				if (1 === (a.flags & 2097155)) throw new N(8);
				if (P(a.node.mode)) throw new N(31);
				if (!a.Ma.read) throw new N(28);
				var g = "undefined" != typeof e;
				if (!g) e = a.position;
				else if (!a.seekable) throw new N(70);
				b = a.Ma.read(a, b, c, d, e);
				g || (a.position += b);
				return b;
			}
			function ma(a, b, c, d, e) {
				if (0 > d || 0 > e) throw new N(28);
				if (null === a.bb) throw new N(8);
				if (0 === (a.flags & 2097155)) throw new N(8);
				if (P(a.node.mode)) throw new N(31);
				if (!a.Ma.write) throw new N(28);
				a.seekable && a.flags & 1024 && Xb(a, 0, 2);
				var g = "undefined" != typeof e;
				if (!g) e = a.position;
				else if (!a.seekable) throw new N(70);
				b = a.Ma.write(a, b, c, d, e, void 0);
				g || (a.position += b);
				return b;
			}
			function sa(a) {
				var b = b || 0;
				var c = "binary";
				"utf8" !== c && "binary" !== c && Ja(`Invalid encoding type "${c}"`);
				b = la(a, b);
				a = Ub(a).size;
				var d = new Uint8Array(a);
				Yb(b, d, 0, a, 0);
				"utf8" === c && (d = db(d));
				na(b);
				return d;
			}
			function W(a, b, c) {
				a = ha("/dev/" + a);
				var d = ia(!!b, !!c);
				W.Rb ?? (W.Rb = 64);
				var e = W.Rb++ << 8 | 0;
				rb(e, {
					open(g) {
						g.seekable = !1;
					},
					close() {
						c?.buffer?.length && c(10);
					},
					read(g, h, q, w) {
						for (var t = 0, x = 0; x < w; x++) {
							try {
								var D = b();
							} catch (ib) {
								throw new N(29);
							}
							if (void 0 === D && 0 === t) throw new N(6);
							if (null === D || void 0 === D) break;
							t++;
							h[q + x] = D;
						}
						t && (g.node.$a = Date.now());
						return t;
					},
					write(g, h, q, w) {
						for (var t = 0; t < w; t++) try {
							c(h[q + t]);
						} catch (x) {
							throw new N(29);
						}
						w && (g.node.Ua = g.node.Ta = Date.now());
						return t;
					}
				});
				Rb(a, d, e);
			}
			var X = {};
			function Y(a, b, c) {
				if ("/" === b.charAt(0)) return b;
				a = -100 === a ? "/" : T(a).path;
				if (0 == b.length) {
					if (!c) throw new N(44);
					return a;
				}
				return a + "/" + b;
			}
			function Zb(a, b) {
				F[a >> 2] = b.cc;
				F[a + 4 >> 2] = b.mode;
				F[a + 8 >> 2] = b.rc;
				F[a + 12 >> 2] = b.uid;
				F[a + 16 >> 2] = b.nc;
				F[a + 20 >> 2] = b.nb;
				G[a + 24 >> 3] = BigInt(b.size);
				E[a + 32 >> 2] = 4096;
				E[a + 36 >> 2] = b.$b;
				var c = b.$a.getTime(), d = b.Ua.getTime(), e = b.Ta.getTime();
				G[a + 40 >> 3] = BigInt(Math.floor(c / 1e3));
				F[a + 48 >> 2] = c % 1e3 * 1e6;
				G[a + 56 >> 3] = BigInt(Math.floor(d / 1e3));
				F[a + 64 >> 2] = d % 1e3 * 1e6;
				G[a + 72 >> 3] = BigInt(Math.floor(e / 1e3));
				F[a + 80 >> 2] = e % 1e3 * 1e6;
				G[a + 88 >> 3] = BigInt(b.oc);
				return 0;
			}
			var ic = void 0, Ac = () => {
				var a = E[+ic >> 2];
				ic += 4;
				return a;
			}, Cc = 0, Dc = [
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
			], Ec = [
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
			], Fc = {}, Gc = (a) => {
				if (!(a instanceof Pa || "unwind" == a)) throw a;
			}, Hc = (a) => {
				Da = a;
				Va || 0 < Cc || (k.onExit?.(a), Ca = !0);
				throw new Pa(a);
			}, Ic = (a) => {
				if (!Ca) try {
					a();
				} catch (b) {
					Gc(b);
				} finally {
					if (!(Va || 0 < Cc)) try {
						Da = a = Da, Hc(a);
					} catch (b) {
						Gc(b);
					}
				}
			}, Jc = {}, Lc = () => {
				if (!Kc) {
					var a = {
						USER: "web_user",
						LOGNAME: "web_user",
						PATH: "/",
						PWD: "/",
						HOME: "/home/web_user",
						LANG: (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8",
						_: va || "./this.program"
					}, b;
					for (b in Jc) void 0 === Jc[b] ? delete a[b] : a[b] = Jc[b];
					var c = [];
					for (b in a) c.push(`${b}=${a[b]}`);
					Kc = c;
				}
				return Kc;
			}, Kc, Mc = (a, b, c, d) => {
				var e = {
					string: (t) => {
						var x = 0;
						if (null !== t && void 0 !== t && 0 !== t) {
							x = gb(t) + 1;
							var D = y(x);
							M(t, C, D, x);
							x = D;
						}
						return x;
					},
					array: (t) => {
						var x = y(t.length);
						m.set(t, x);
						return x;
					}
				};
				a = k["_" + a];
				var g = [], h = 0;
				if (d) for (var q = 0; q < d.length; q++) {
					var w = e[c[q]];
					w ? (0 === h && (h = oa()), g[q] = w(d[q])) : g[q] = d[q];
				}
				c = a(...g);
				return c = function(t) {
					0 !== h && qa(h);
					return "string" === b ? z(t) : "boolean" === b ? !!t : t;
				}(c);
			}, ea = (a) => {
				var b = gb(a) + 1, c = ca(b);
				c && M(a, C, c, b);
				return c;
			}, Nc, Oc = [], A = (a) => {
				Nc.delete(Z.get(a));
				Z.set(a, null);
				Oc.push(a);
			}, Pc = (a) => {
				const b = a.length;
				return [
					b % 128 | 128,
					b >> 7,
					...a
				];
			}, Qc = {
				i: 127,
				p: 127,
				j: 126,
				f: 125,
				d: 124,
				e: 111
			}, Rc = (a) => Pc(Array.from(a, (b) => Qc[b])), ua = (a, b) => {
				if (!Nc) {
					Nc = /* @__PURE__ */ new WeakMap();
					var c = Z.length;
					if (Nc) for (var d = 0; d < 0 + c; d++) {
						var e = Z.get(d);
						e && Nc.set(e, d);
					}
				}
				if (c = Nc.get(a) || 0) return c;
				c = Oc.length ? Oc.pop() : Z.grow(1);
				try {
					Z.set(c, a);
				} catch (g) {
					if (!(g instanceof TypeError)) throw g;
					b = Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0, 1, ...Pc([
						1,
						96,
						...Rc(b.slice(1)),
						...Rc("v" === b[0] ? "" : b[0])
					]), 2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
					b = new WebAssembly.Module(b);
					b = new WebAssembly.Instance(b, { e: { f: a } }).exports.f;
					Z.set(c, b);
				}
				Nc.set(a, c);
				return c;
			};
			R = Array(4096);
			Pb(O, "/");
			U("/tmp");
			U("/home");
			U("/home/web_user");
			(function() {
				U("/dev");
				rb(259, {
					read: () => 0,
					write: (d, e, g, h) => h,
					Ya: () => 0
				});
				Rb("/dev/null", 259);
				qb(1280, tb);
				qb(1536, ub);
				Rb("/dev/tty", 1280);
				Rb("/dev/tty1", 1536);
				var a = /* @__PURE__ */ new Uint8Array(1024), b = 0, c = () => {
					0 === b && (bb(a), b = a.byteLength);
					return a[--b];
				};
				W("random", c);
				W("urandom", c);
				U("/dev/shm");
				U("/dev/shm/tmp");
			})();
			(function() {
				U("/proc");
				var a = U("/proc/self");
				U("/proc/self/fd");
				Pb({ ab() {
					var b = wb(a, "fd", 16895, 73);
					b.Ma = { Ya: O.Ma.Ya };
					b.La = {
						mb(c, d) {
							c = +d;
							var e = T(c);
							c = {
								parent: null,
								ab: { Sb: "fake" },
								La: { eb: () => e.path },
								id: c + 1
							};
							return c.parent = c;
						},
						Ib() {
							return Array.from(Bb.entries()).filter(([, c]) => c).map(([c]) => c.toString());
						}
					};
					return b;
				} }, "/proc/self/fd");
			})();
			k.noExitRuntime && (Va = k.noExitRuntime);
			k.print && (Aa = k.print);
			k.printErr && (B = k.printErr);
			k.wasmBinary && (Ba = k.wasmBinary);
			k.thisProgram && (va = k.thisProgram);
			if (k.preInit) for ("function" == typeof k.preInit && (k.preInit = [k.preInit]); 0 < k.preInit.length;) k.preInit.shift()();
			k.stackSave = () => oa();
			k.stackRestore = (a) => qa(a);
			k.stackAlloc = (a) => y(a);
			k.cwrap = (a, b, c, d) => {
				var e = !c || c.every((g) => "number" === g || "boolean" === g);
				return "string" !== b && e && !d ? k["_" + a] : (...g) => Mc(a, b, c, g);
			};
			k.addFunction = ua;
			k.removeFunction = A;
			k.UTF8ToString = z;
			k.stringToNewUTF8 = ea;
			k.writeArrayToMemory = (a, b) => {
				m.set(a, b);
			};
			var ca, da, yb, Sc, qa, y, oa, Ia, Z, Tc = {
				a: (a, b, c, d) => Ja(`Assertion failed: ${z(a)}, at: ` + [
					b ? z(b) : "unknown filename",
					c,
					d ? z(d) : "unknown function"
				]),
				i: function(a, b) {
					try {
						return a = z(a), ka(a, b), 0;
					} catch (c) {
						if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
						return -c.Pa;
					}
				},
				L: function(a, b, c) {
					try {
						b = z(b);
						b = Y(a, b);
						if (c & -8) return -28;
						var d = S(b, { hb: !0 }).node;
						if (!d) return -44;
						a = "";
						c & 4 && (a += "r");
						c & 2 && (a += "w");
						c & 1 && (a += "x");
						return a && Ib(d, a) ? -2 : 0;
					} catch (e) {
						if ("undefined" == typeof X || "ErrnoError" !== e.name) throw e;
						return -e.Pa;
					}
				},
				j: function(a, b) {
					try {
						var c = T(a);
						Vb(c, c.node, b, !1);
						return 0;
					} catch (d) {
						if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
						return -d.Pa;
					}
				},
				h: function(a) {
					try {
						var b = T(a);
						Ob(b, b.node, {
							timestamp: Date.now(),
							dc: !1
						});
						return 0;
					} catch (c) {
						if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
						return -c.Pa;
					}
				},
				b: function(a, b, c) {
					ic = c;
					try {
						var d = T(a);
						switch (b) {
							case 0:
								var e = Ac();
								if (0 > e) break;
								for (; Bb[e];) e++;
								return Nb(d, e).bb;
							case 1:
							case 2: return 0;
							case 3: return d.flags;
							case 4: return e = Ac(), d.flags |= e, 0;
							case 12: return e = Ac(), Ea[e + 0 >> 1] = 2, 0;
							case 13:
							case 14: return 0;
						}
						return -28;
					} catch (g) {
						if ("undefined" == typeof X || "ErrnoError" !== g.name) throw g;
						return -g.Pa;
					}
				},
				g: function(a, b) {
					try {
						var c = T(a), d = c.node, e = c.Ma.Wa;
						a = e ? c : d;
						e ?? (e = d.La.Wa);
						Lb(e);
						return Zb(b, e(a));
					} catch (h) {
						if ("undefined" == typeof X || "ErrnoError" !== h.name) throw h;
						return -h.Pa;
					}
				},
				H: function(a, b) {
					b = -9007199254740992 > b || 9007199254740992 < b ? NaN : Number(b);
					try {
						if (isNaN(b)) return -61;
						var c = T(a);
						if (0 > b || 0 === (c.flags & 2097155)) throw new N(28);
						Wb(c, c.node, b);
						return 0;
					} catch (d) {
						if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
						return -d.Pa;
					}
				},
				G: function(a, b) {
					try {
						if (0 === b) return -28;
						var c = gb("/") + 1;
						if (b < c) return -68;
						M("/", C, a, b);
						return c;
					} catch (d) {
						if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
						return -d.Pa;
					}
				},
				K: function(a, b) {
					try {
						return a = z(a), Zb(b, Ub(a, !0));
					} catch (c) {
						if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
						return -c.Pa;
					}
				},
				C: function(a, b, c) {
					try {
						return b = z(b), b = Y(a, b), U(b, c), 0;
					} catch (d) {
						if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
						return -d.Pa;
					}
				},
				J: function(a, b, c, d) {
					try {
						b = z(b);
						var e = d & 256;
						b = Y(a, b, d & 4096);
						return Zb(c, e ? Ub(b, !0) : Ub(b));
					} catch (g) {
						if ("undefined" == typeof X || "ErrnoError" !== g.name) throw g;
						return -g.Pa;
					}
				},
				x: function(a, b, c, d) {
					ic = d;
					try {
						b = z(b);
						b = Y(a, b);
						var e = d ? Ac() : 0;
						return la(b, c, e).bb;
					} catch (g) {
						if ("undefined" == typeof X || "ErrnoError" !== g.name) throw g;
						return -g.Pa;
					}
				},
				v: function(a, b, c, d) {
					try {
						b = z(b);
						b = Y(a, b);
						if (0 >= d) return -28;
						var e = S(b).node;
						if (!e) throw new N(44);
						if (!e.La.eb) throw new N(28);
						var g = e.La.eb(e);
						var h = Math.min(d, gb(g)), q = m[c + h];
						M(g, C, c, d + 1);
						m[c + h] = q;
						return h;
					} catch (w) {
						if ("undefined" == typeof X || "ErrnoError" !== w.name) throw w;
						return -w.Pa;
					}
				},
				u: function(a) {
					try {
						return a = z(a), Tb(a), 0;
					} catch (b) {
						if ("undefined" == typeof X || "ErrnoError" !== b.name) throw b;
						return -b.Pa;
					}
				},
				f: function(a, b) {
					try {
						return a = z(a), Zb(b, Ub(a));
					} catch (c) {
						if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
						return -c.Pa;
					}
				},
				r: function(a, b, c) {
					try {
						b = z(b);
						b = Y(a, b);
						if (c) if (512 === c) Tb(b);
						else return -28;
						else ta(b);
						return 0;
					} catch (d) {
						if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
						return -d.Pa;
					}
				},
				q: function(a, b, c) {
					try {
						b = z(b);
						b = Y(a, b, !0);
						var d = Date.now(), e, g;
						if (c) {
							var h = F[c >> 2] + 4294967296 * E[c + 4 >> 2], q = E[c + 8 >> 2];
							1073741823 == q ? e = d : 1073741822 == q ? e = null : e = 1e3 * h + q / 1e6;
							c += 16;
							h = F[c >> 2] + 4294967296 * E[c + 4 >> 2];
							q = E[c + 8 >> 2];
							1073741823 == q ? g = d : 1073741822 == q ? g = null : g = 1e3 * h + q / 1e6;
						} else g = e = d;
						if (null !== (g ?? e)) {
							a = e;
							var w = S(b, { hb: !0 }).node;
							Lb(w.La.Xa)(w, {
								$a: a,
								Ua: g
							});
						}
						return 0;
					} catch (t) {
						if ("undefined" == typeof X || "ErrnoError" !== t.name) throw t;
						return -t.Pa;
					}
				},
				m: () => Ja(""),
				l: () => {
					Va = !1;
					Cc = 0;
				},
				A: function(a, b) {
					a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
					a = /* @__PURE__ */ new Date(1e3 * a);
					E[b >> 2] = a.getSeconds();
					E[b + 4 >> 2] = a.getMinutes();
					E[b + 8 >> 2] = a.getHours();
					E[b + 12 >> 2] = a.getDate();
					E[b + 16 >> 2] = a.getMonth();
					E[b + 20 >> 2] = a.getFullYear() - 1900;
					E[b + 24 >> 2] = a.getDay();
					var c = a.getFullYear();
					E[b + 28 >> 2] = (0 !== c % 4 || 0 === c % 100 && 0 !== c % 400 ? Ec : Dc)[a.getMonth()] + a.getDate() - 1 | 0;
					E[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
					c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
					var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
					E[b + 32 >> 2] = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;
				},
				y: function(a, b, c, d, e, g, h) {
					e = -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e);
					try {
						var q = T(d);
						if (0 !== (b & 2) && 0 === (c & 2) && 2 !== (q.flags & 2097155)) throw new N(2);
						if (1 === (q.flags & 2097155)) throw new N(2);
						if (!q.Ma.sb) throw new N(43);
						if (!a) throw new N(28);
						var w = q.Ma.sb(q, a, e, b, c);
						var t = w.tc;
						E[g >> 2] = w.Ub;
						F[h >> 2] = t;
						return 0;
					} catch (x) {
						if ("undefined" == typeof X || "ErrnoError" !== x.name) throw x;
						return -x.Pa;
					}
				},
				z: function(a, b, c, d, e, g) {
					g = -9007199254740992 > g || 9007199254740992 < g ? NaN : Number(g);
					try {
						var h = T(e);
						if (c & 2) {
							if (32768 !== (h.node.mode & 61440)) throw new N(43);
							d & 2 || h.Ma.tb && h.Ma.tb(h, C.slice(a, a + b), g, b, d);
						}
					} catch (q) {
						if ("undefined" == typeof X || "ErrnoError" !== q.name) throw q;
						return -q.Pa;
					}
				},
				n: (a, b) => {
					Fc[a] && (clearTimeout(Fc[a].id), delete Fc[a]);
					if (!b) return 0;
					Fc[a] = {
						id: setTimeout(() => {
							delete Fc[a];
							Ic(() => Sc(a, performance.now()));
						}, b),
						Hc: b
					};
					return 0;
				},
				B: (a, b, c, d) => {
					var e = (/* @__PURE__ */ new Date()).getFullYear(), g = new Date(e, 0, 1).getTimezoneOffset();
					e = new Date(e, 6, 1).getTimezoneOffset();
					F[a >> 2] = 60 * Math.max(g, e);
					E[b >> 2] = Number(g != e);
					b = (h) => {
						var q = Math.abs(h);
						return `UTC${0 <= h ? "-" : "+"}${String(Math.floor(q / 60)).padStart(2, "0")}${String(q % 60).padStart(2, "0")}`;
					};
					a = b(g);
					b = b(e);
					e < g ? (M(a, C, c, 17), M(b, C, d, 17)) : (M(a, C, d, 17), M(b, C, c, 17));
				},
				d: () => Date.now(),
				s: () => 2147483648,
				c: () => performance.now(),
				o: (a) => {
					var b = C.length;
					a >>>= 0;
					if (2147483648 < a) return !1;
					for (var c = 1; 4 >= c; c *= 2) {
						var d = b * (1 + .2 / c);
						d = Math.min(d, a + 100663296);
						a: {
							d = (Math.min(2147483648, 65536 * Math.ceil(Math.max(a, d) / 65536)) - Ia.buffer.byteLength + 65535) / 65536 | 0;
							try {
								Ia.grow(d);
								Ha();
								var e = 1;
								break a;
							} catch (g) {}
							e = void 0;
						}
						if (e) return !0;
					}
					return !1;
				},
				E: (a, b) => {
					var c = 0, d = 0, e;
					for (e of Lc()) {
						var g = b + c;
						F[a + d >> 2] = g;
						c += M(e, C, g, Infinity) + 1;
						d += 4;
					}
					return 0;
				},
				F: (a, b) => {
					var c = Lc();
					F[a >> 2] = c.length;
					a = 0;
					for (var d of c) a += gb(d) + 1;
					F[b >> 2] = a;
					return 0;
				},
				e: function(a) {
					try {
						na(T(a));
						return 0;
					} catch (c) {
						if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
						return c.Pa;
					}
				},
				p: function(a, b) {
					try {
						var c = T(a);
						m[b] = c.Va ? 2 : P(c.mode) ? 3 : 40960 === (c.mode & 61440) ? 7 : 4;
						Ea[b + 2 >> 1] = 0;
						G[b + 8 >> 3] = BigInt(0);
						G[b + 16 >> 3] = BigInt(0);
						return 0;
					} catch (d) {
						if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
						return d.Pa;
					}
				},
				w: function(a, b, c, d) {
					try {
						a: {
							var e = T(a);
							a = b;
							for (var g, h = b = 0; h < c; h++) {
								var q = F[a >> 2], w = F[a + 4 >> 2];
								a += 8;
								var t = Yb(e, m, q, w, g);
								if (0 > t) {
									var x = -1;
									break a;
								}
								b += t;
								if (t < w) break;
								"undefined" != typeof g && (g += t);
							}
							x = b;
						}
						F[d >> 2] = x;
						return 0;
					} catch (D) {
						if ("undefined" == typeof X || "ErrnoError" !== D.name) throw D;
						return D.Pa;
					}
				},
				D: function(a, b, c, d) {
					b = -9007199254740992 > b || 9007199254740992 < b ? NaN : Number(b);
					try {
						if (isNaN(b)) return 61;
						var e = T(a);
						Xb(e, b, c);
						G[d >> 3] = BigInt(e.position);
						e.Eb && 0 === b && 0 === c && (e.Eb = null);
						return 0;
					} catch (g) {
						if ("undefined" == typeof X || "ErrnoError" !== g.name) throw g;
						return g.Pa;
					}
				},
				I: function(a) {
					try {
						var b = T(a);
						return b.Ma?.lb?.(b);
					} catch (c) {
						if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
						return c.Pa;
					}
				},
				t: function(a, b, c, d) {
					try {
						a: {
							var e = T(a);
							a = b;
							for (var g, h = b = 0; h < c; h++) {
								var q = F[a >> 2], w = F[a + 4 >> 2];
								a += 8;
								var t = ma(e, m, q, w, g);
								if (0 > t) {
									var x = -1;
									break a;
								}
								b += t;
								if (t < w) break;
								"undefined" != typeof g && (g += t);
							}
							x = b;
						}
						F[d >> 2] = x;
						return 0;
					} catch (D) {
						if ("undefined" == typeof X || "ErrnoError" !== D.name) throw D;
						return D.Pa;
					}
				},
				k: Hc
			};
			function Uc() {
				function a() {
					k.calledRun = !0;
					if (!Ca) {
						if (!k.noFSInit && !Db) {
							var b, c;
							Db = !0;
							b ?? (b = k.stdin);
							c ?? (c = k.stdout);
							d ?? (d = k.stderr);
							b ? W("stdin", b) : Sb("/dev/tty", "/dev/stdin");
							c ? W("stdout", null, c) : Sb("/dev/tty", "/dev/stdout");
							d ? W("stderr", null, d) : Sb("/dev/tty1", "/dev/stderr");
							la("/dev/stdin", 0);
							la("/dev/stdout", 1);
							la("/dev/stderr", 1);
						}
						Vc.N();
						Eb = !1;
						k.onRuntimeInitialized?.();
						if (k.postRun) for ("function" == typeof k.postRun && (k.postRun = [k.postRun]); k.postRun.length;) {
							var d = k.postRun.shift();
							Ra.push(d);
						}
						Qa(Ra);
					}
				}
				if (0 < J) Ua = Uc;
				else {
					if (k.preRun) for ("function" == typeof k.preRun && (k.preRun = [k.preRun]); k.preRun.length;) Ta();
					Qa(Sa);
					0 < J ? Ua = Uc : k.setStatus ? (k.setStatus("Running..."), setTimeout(() => {
						setTimeout(() => k.setStatus(""), 1);
						a();
					}, 1)) : a();
				}
			}
			var Vc;
			(async function() {
				function a(c) {
					c = Vc = c.exports;
					k._sqlite3_free = c.P;
					k._sqlite3_value_text = c.Q;
					k._sqlite3_prepare_v2 = c.R;
					k._sqlite3_step = c.S;
					k._sqlite3_reset = c.T;
					k._sqlite3_exec = c.U;
					k._sqlite3_finalize = c.V;
					k._sqlite3_column_name = c.W;
					k._sqlite3_column_text = c.X;
					k._sqlite3_column_type = c.Y;
					k._sqlite3_errmsg = c.Z;
					k._sqlite3_clear_bindings = c._;
					k._sqlite3_value_blob = c.$;
					k._sqlite3_value_bytes = c.aa;
					k._sqlite3_value_double = c.ba;
					k._sqlite3_value_int = c.ca;
					k._sqlite3_value_type = c.da;
					k._sqlite3_result_blob = c.ea;
					k._sqlite3_result_double = c.fa;
					k._sqlite3_result_error = c.ga;
					k._sqlite3_result_int = c.ha;
					k._sqlite3_result_int64 = c.ia;
					k._sqlite3_result_null = c.ja;
					k._sqlite3_result_text = c.ka;
					k._sqlite3_aggregate_context = c.la;
					k._sqlite3_column_count = c.ma;
					k._sqlite3_data_count = c.na;
					k._sqlite3_column_blob = c.oa;
					k._sqlite3_column_bytes = c.pa;
					k._sqlite3_column_double = c.qa;
					k._sqlite3_bind_blob = c.ra;
					k._sqlite3_bind_double = c.sa;
					k._sqlite3_bind_int = c.ta;
					k._sqlite3_bind_text = c.ua;
					k._sqlite3_bind_parameter_index = c.va;
					k._sqlite3_sql = c.wa;
					k._sqlite3_normalized_sql = c.xa;
					k._sqlite3_changes = c.ya;
					k._sqlite3_close_v2 = c.za;
					k._sqlite3_create_function_v2 = c.Aa;
					k._sqlite3_update_hook = c.Ba;
					k._sqlite3_open = c.Ca;
					ca = k._malloc = c.Da;
					da = k._free = c.Ea;
					k._RegisterExtensionFunctions = c.Fa;
					yb = c.Ga;
					Sc = c.Ha;
					qa = c.Ia;
					y = c.Ja;
					oa = c.Ka;
					Ia = c.M;
					Z = c.O;
					Ha();
					J--;
					k.monitorRunDependencies?.(J);
					0 == J && Ua && (c = Ua, Ua = null, c());
					return Vc;
				}
				J++;
				k.monitorRunDependencies?.(J);
				var b = { a: Tc };
				if (k.instantiateWasm) return new Promise((c) => {
					k.instantiateWasm(b, (d, e) => {
						c(a(d, e));
					});
				});
				La ?? (La = k.locateFile ? k.locateFile("sql-wasm-browser.wasm", xa) : xa + "sql-wasm-browser.wasm");
				return a((await Oa(b)).instance);
			})();
			Uc();
			return Module;
		});
		return initSqlJsPromise;
	};
	if (typeof exports === "object" && typeof module === "object") {
		module.exports = initSqlJs;
		module.exports.default = initSqlJs;
	} else if (typeof define === "function" && define["amd"]) define([], function() {
		return initSqlJs;
	});
	else if (typeof exports === "object") exports["Module"] = initSqlJs;
})))(), 1);
var sql_wasm_default = "" + new URL("sql-wasm-UFUCzYNW.wasm", import.meta.url).href;
//#endregion
//#region src/modules/utils.ts
async function syncSchema(db) {
	await db.schema.createTable("test").ifNotExists().addColumn("id", "integer", (col) => col.primaryKey().autoIncrement()).addColumn("name", "text", (col) => col.notNull()).addColumn("blobtest", "blob", (col) => col.notNull()).addColumn("created_at", "text", (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)).addColumn("updated_at", "text", (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)).execute();
}
async function testDB(dialect, onBeforeDestroy) {
	const db = new Kysely({ dialect });
	await syncSchema(db);
	for (let i = 0; i < 10; i++) try {
		await db.transaction().execute(async (trx) => {
			if (i > 8) throw new Error("test rollback");
			await trx.insertInto("test").values({
				name: `test at ${Date.now()}`,
				blobtest: Uint8Array.from([
					2,
					3,
					4,
					5,
					6,
					7,
					8
				])
			}).execute();
		});
	} catch {}
	const data = await db.selectFrom("test").selectAll().orderBy("id", "asc").execute();
	await onBeforeDestroy?.();
	await db.destroy();
	return data;
}
//#endregion
//#region src/modules/mainThread.ts
var db;
var dialect = new SqlJsDialect({ async database() {
	const SQL = await (0, import_sql_wasm_browser.default)({ locateFile: () => sql_wasm_default });
	const buffer = await loadFile("sqljs");
	db = new SQL.Database(buffer?.toUint8Array());
	return db;
} });
function runSqlJsMain() {
	return testDB(dialect, () => writeFile("sqljs", db?.export()));
}
//#endregion
//#region src/modules/officialWasmWorker.ts?worker
function WorkerWrapper$1(options) {
	return new Worker("" + new URL("officialWasmWorker-D0rQyrrw.js", import.meta.url).href, {
		type: "module",
		name: options?.name
	});
}
//#endregion
//#region src/modules/sqljsWorker.ts?worker
function WorkerWrapper(options) {
	return new Worker("" + new URL("sqljsWorker-DovfYvYx.js", import.meta.url).href, {
		type: "module",
		name: options?.name
	});
}
//#endregion
//#region ../node_modules/.pnpm/@subframe7536+sqlite-wasm@1.2.0/node_modules/@subframe7536/sqlite-wasm/dist/wa-sqlite-async.wasm?url
var wa_sqlite_async_default = "" + new URL("wa-sqlite-async-ac_ajG-V.wasm", import.meta.url).href;
//#endregion
//#region ../node_modules/.pnpm/@subframe7536+sqlite-wasm@1.3.0/node_modules/@subframe7536/sqlite-wasm/dist/FacadeVFS-XQtZprLW.js
init_defineProperty();
[
	256,
	2048,
	512,
	4096,
	1024,
	8192,
	16384,
	524288
].reduce((mask, element) => mask | element);
Object.getPrototypeOf(async function() {}).constructor;
//#endregion
//#region ../node_modules/.pnpm/@subframe7536+sqlite-wasm@1.3.0/node_modules/@subframe7536/sqlite-wasm/dist/wa-sqlite-DfKPyFeY.js
init_defineProperty();
(() => {
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
Object.getPrototypeOf(async function() {}).constructor;
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
//#endregion
//#region ../packages/dialect-generic-sqlite/dist/worker-helper-web.mjs
/**
* Util for handle web worker message in main thread
*/
var handleWebWorker = (worker, cb) => worker.onmessage = ({ data }) => cb(data);
//#endregion
//#region ../packages/dialect-generic-sqlite/dist/worker.mjs
init_defineProperty();
var GenericSqliteWorkerDriver = class extends BaseSqliteDriver {
	constructor(executor, onCreateConnection) {
		super(async (options) => {
			const exec = await executor(options);
			this.mitt = exec.mitt;
			this.worker = exec.worker;
			exec.handle(this.worker, ([type, ...msg]) => this.mitt.emit(type, ...msg));
			const initAck = new Promise((resolve, reject) => {
				this.mitt.once("0", (_qid, _data, err) => err ? reject(err) : resolve());
			});
			this.worker.postMessage(["0", exec.data || {}]);
			await initAck;
			this.conn = new GenericSqliteWorkerConnection(this.worker, this.mitt);
			await onCreateConnection?.(this.conn, options);
		});
		_defineProperty(this, "worker", void 0);
		_defineProperty(this, "mitt", void 0);
	}
	async destroy() {
		if (!this.worker) return;
		const closeAck = new Promise((resolve, reject) => this.mitt?.once("2", (_qid, _data, err) => err ? reject(err) : resolve()));
		this.worker.postMessage(["2"]);
		return closeAck.finally(() => {
			this.conn?.close();
			this.worker?.terminate();
			this.mitt?.off();
			this.mitt = this.worker = void 0;
		});
	}
};
var GenericSqliteWorkerConnection = class {
	constructor(worker, mitt) {
		_defineProperty(this, "worker", void 0);
		_defineProperty(this, "mitt", void 0);
		_defineProperty(this, "pendingRuns", /* @__PURE__ */ new Map());
		_defineProperty(this, "pendingStreams", /* @__PURE__ */ new Map());
		this.worker = worker;
		this.mitt = mitt;
		this.mitt.on("1", (queryId, data, err) => {
			if (!queryId) return;
			const pending = this.pendingRuns.get(queryId);
			if (!pending) return;
			this.pendingRuns.delete(queryId);
			if (err) pending.reject(err);
			else pending.resolve(data);
		});
		this.mitt.on("3", (queryId, data, err) => {
			if (!queryId) return;
			const state = this.pendingStreams.get(queryId);
			if (!state) return;
			if (err) this.rejectStream(queryId, state, err);
			else this.pushStreamResult(queryId, state, [{ rows: [data] }, false]);
		});
		this.mitt.on("4", (queryId, _data, err) => {
			if (!queryId) return;
			const state = this.pendingStreams.get(queryId);
			if (!state) return;
			if (err) this.rejectStream(queryId, state, err);
			else this.pushStreamResult(queryId, state, [void 0, true]);
		});
	}
	close() {
		const err = /* @__PURE__ */ new Error("Connection closed");
		for (const [, pending] of this.pendingRuns) pending.reject(err);
		this.pendingRuns.clear();
		for (const [queryId, state] of this.pendingStreams) this.rejectStream(queryId, state, err);
	}
	async *streamQuery({ parameters, sql, query, queryId }, chunkSize, options) {
		if (options?.signal?.aborted) return;
		const streamState = { queue: [] };
		this.pendingStreams.set(queryId.queryId, streamState);
		this.worker.postMessage([
			"3",
			queryId.queryId,
			SelectQueryNode.is(query),
			sql,
			parameters,
			chunkSize
		]);
		const onAbort = () => {
			this.rejectStream(queryId.queryId, streamState, /* @__PURE__ */ new Error("Query aborted"));
		};
		options?.signal?.addEventListener("abort", onAbort, { once: true });
		try {
			while (true) {
				const [data, isDone] = await this.nextStreamResult(streamState);
				if (isDone) return;
				yield data;
			}
		} finally {
			options?.signal?.removeEventListener("abort", onAbort);
			this.pendingStreams.delete(queryId.queryId);
		}
	}
	async executeQuery(compiledQuery, options) {
		const { parameters, sql, query, queryId } = compiledQuery;
		if (options?.signal?.aborted) throw new Error("Query aborted");
		return new Promise((resolve, reject) => {
			const queryKey = queryId.queryId;
			let cleanup = () => {};
			const onAbort = () => {
				cleanup();
				reject(/* @__PURE__ */ new Error("Query aborted"));
			};
			cleanup = () => {
				this.pendingRuns.delete(queryKey);
				options?.signal?.removeEventListener("abort", onAbort);
			};
			const settle = (callback) => (value) => {
				cleanup();
				callback(value);
			};
			this.pendingRuns.set(queryKey, {
				resolve: settle(resolve),
				reject: settle(reject)
			});
			options?.signal?.addEventListener("abort", onAbort, { once: true });
			try {
				this.worker.postMessage([
					"1",
					queryKey,
					SelectQueryNode.is(query),
					sql,
					parameters
				]);
			} catch (error) {
				cleanup();
				reject(error);
			}
		});
	}
	nextStreamResult(state) {
		const queued = state.queue.shift();
		if (queued) return Promise.resolve(queued);
		if (state.error) return Promise.reject(state.error);
		return new Promise((resolve, reject) => {
			state.wait = {
				resolve,
				reject
			};
		});
	}
	pushStreamResult(queryId, state, result) {
		if (state.wait) {
			const { resolve } = state.wait;
			state.wait = void 0;
			resolve(result);
			return;
		}
		state.queue.push(result);
		if (result[1]) this.pendingStreams.delete(queryId);
	}
	rejectStream(queryId, state, err) {
		this.pendingStreams.delete(queryId);
		state.queue.length = 0;
		state.error = err;
		if (state.wait) {
			const { reject } = state.wait;
			state.wait = void 0;
			reject(err);
		}
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
//#endregion
//#region ../node_modules/.pnpm/zen-mitt@3.1.0/node_modules/zen-mitt/dist/chunk-IFRVLYJO.js
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
//#endregion
//#region ../packages/dialect-wasqlite-worker/dist/index.js
var WaSqliteWorkerDialect = class extends GenericSqliteWorkerDialect {
	constructor(config) {
		const { onCreateConnection, worker, fileName, preferOPFS, url, message } = config;
		super(async () => {
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
					"" + new URL("worker-Bn65awoT.js", import.meta.url).href,
					"" + import.meta.url
				), { type: "module" }) : new Worker(new URL(
					/* @vite-ignore */
					"" + new URL("worker-Bn65awoT.js", import.meta.url).href,
					"" + import.meta.url
				)),
				mitt: m,
				handle: handleWebWorker
			};
		}, onCreateConnection);
	}
};
//#endregion
//#region src/modules/wasqliteWorker.ts
function runWaSqliteWorker() {
	return testDB(new WaSqliteWorkerDialect({
		fileName: "wa-sqlite-worker-test",
		url: () => wa_sqlite_async_default
	}));
}
//#endregion
//#region src/App.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=alert>`), _tmpl$2 = /*#__PURE__*/ template(`<div class=success>Storage cleared at <!>.`), _tmpl$3 = /*#__PURE__*/ template(`<main class=shell><section class=hero><div class=eyebrow>Kysely SQLite Tools Playground</div><h1>Explore SQLite WASM dialects without opening the console.</h1><p>Run each backend, inspect the inserted rows, and verify persisted browser storage from a polished Solid interface.<br><br><a href=https://github.com/kysely-org/kysely target=_blank rel=noreferrer class=hero-link>Kysely docs</a><span style="padding:0 0.6rem">|</span><a href=https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API#origin_private_file_system target=_blank rel=noreferrer class=hero-link>OPFS docs</a></p></section><section class="panel controls-panel"><div class=section-heading><h2>Choose a runner</h2><p>Each runner creates sample records in the shared test table and renders the latest query below.</p></div><div class=runner-grid></div><button class=clear-button type=button>Clear playground storage</button></section><section class="panel results-panel"><div class=results-header><div><h2>Test result table of </h2><p> rows returned from the latest run.</p></div><span class=badge></span></div><div class=table-wrap><table><thead><tr><th>ID</th><th>Name</th><th>Created</th><th>Updated</th><th>Blob bytes</th></tr></thead><tbody>`), _tmpl$4 = /*#__PURE__*/ template(`<article class=runner-card><div><h3></h3><p></p></div><button type=button>Run test`), _tmpl$5 = /*#__PURE__*/ template(`<tr><td class=empty colspan=5>Run a dialect to populate the visual table.`), _tmpl$6 = /*#__PURE__*/ template(`<tr><td></td><td></td><td></td><td></td><td>`);
var runners = [
	{
		key: "sqljs-main",
		title: "SQL.js main thread",
		description: "Runs SQL.js directly in the browser thread and persists the database in IndexedDB."
	},
	{
		key: "sqljs-worker",
		title: "SQL.js worker",
		description: "Runs SQL.js in a dedicated worker and sends table rows back to the UI."
	},
	{
		key: "official-wasm",
		title: "Official SQLite WASM",
		description: "Uses @sqlite.org/sqlite-wasm in a worker, backed by OPFS when the browser supports it."
	},
	{
		key: "wa-sqlite-worker",
		title: "wa-sqlite worker",
		description: "Runs the wa-sqlite worker dialect with broad compatibility across browser storage APIs."
	}
];
function getErrorMessage(error) {
	return error instanceof Error ? error.message : String(error);
}
function runWorker(worker) {
	return new Promise((resolve, reject) => {
		worker.onmessage = (event) => {
			if (event.data.type === "result") {
				resolve(event.data.rows);
				return;
			}
			reject(new Error(event.data.error));
		};
		worker.onerror = (event) => reject(new Error(event.message));
		worker.postMessage({ type: "run" });
	});
}
function App() {
	const [rows, setRows] = createSignal([]);
	const [activeRunner, setActiveRunner] = createSignal("sqljs-main");
	const [status, setStatus] = createSignal("idle");
	const [error, setError] = createSignal("");
	const [clearedAt, setClearedAt] = createSignal("");
	let sqljsWorker = new WorkerWrapper();
	let officialWorker = new WorkerWrapper$1();
	async function run(key) {
		setActiveRunner(key);
		setStatus("running");
		setError("");
		setClearedAt("");
		try {
			setRows(await executeRunner(key));
			setStatus("success");
		} catch (runError) {
			setStatus("error");
			setError(getErrorMessage(runError));
		}
	}
	function executeRunner(key) {
		switch (key) {
			case "sqljs-main": return runSqlJsMain();
			case "sqljs-worker": return runWorker(sqljsWorker);
			case "official-wasm": return runWorker(officialWorker);
			case "wa-sqlite-worker": return runWaSqliteWorker();
		}
	}
	async function deleteDatabase(name) {
		await new Promise((resolve, reject) => {
			const request = window.indexedDB.deleteDatabase(name);
			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
			request.onblocked = () => resolve();
		});
	}
	async function deletePlaygroundDatabases() {
		const names = (await window.indexedDB.databases()).map((db) => db.name).filter((name) => Boolean(name) && name !== "sqlitevfs");
		await Promise.all(names.map((name) => deleteDatabase(name)));
	}
	async function removeOpfsEntries() {
		const root = await navigator.storage?.getDirectory();
		if (!root) return;
		await Promise.allSettled([
			root.removeEntry("test.db"),
			root.removeEntry("test.db-journal"),
			root.removeEntry("wa-sqlite-worker-test", { recursive: true })
		]);
	}
	async function clear() {
		setStatus("running");
		setError("");
		sqljsWorker.terminate();
		officialWorker.terminate();
		await deleteFile("sqljs");
		await deleteFile("sqljsWorker");
		await deletePlaygroundDatabases();
		await removeOpfsEntries();
		sqljsWorker = new WorkerWrapper();
		officialWorker = new WorkerWrapper$1();
		setRows([]);
		setStatus("idle");
		setClearedAt((/* @__PURE__ */ new Date()).toLocaleTimeString());
	}
	return (() => {
		var _el$ = _tmpl$3(), _el$2 = _el$.firstChild;
		_el$2.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling;
		var _el$1 = _el$2.nextSibling, _el$11 = _el$1.firstChild.nextSibling, _el$12 = _el$11.nextSibling, _el$13 = _el$1.nextSibling, _el$14 = _el$13.firstChild, _el$15 = _el$14.firstChild, _el$16 = _el$15.firstChild;
		_el$16.firstChild;
		var _el$18 = _el$16.nextSibling, _el$19 = _el$18.firstChild, _el$20 = _el$15.nextSibling, _el$26 = _el$14.nextSibling, _el$29 = _el$26.firstChild.firstChild.nextSibling;
		insert(_el$11, createComponent(For, {
			each: runners,
			children: (runner) => (() => {
				var _el$30 = _tmpl$4(), _el$31 = _el$30.firstChild, _el$32 = _el$31.firstChild, _el$33 = _el$32.nextSibling, _el$34 = _el$31.nextSibling;
				insert(_el$32, () => runner.title);
				insert(_el$33, () => runner.description);
				_el$34.$$click = () => run(runner.key);
				createRenderEffect((_p$) => {
					var _v$4 = !!(activeRunner() === runner.key), _v$5 = status() === "running";
					_v$4 !== _p$.e && _el$30.classList.toggle("active", _p$.e = _v$4);
					_v$5 !== _p$.t && (_el$34.disabled = _p$.t = _v$5);
					return _p$;
				}, {
					e: void 0,
					t: void 0
				});
				return _el$30;
			})()
		}));
		_el$12.$$click = clear;
		insert(_el$16, activeRunner, null);
		insert(_el$18, () => rows().length, _el$19);
		insert(_el$20, (() => {
			var _c$ = memo(() => status() === "running");
			return () => _c$() ? "Running…" : status();
		})());
		insert(_el$13, createComponent(Show, {
			get when() {
				return error();
			},
			get children() {
				var _el$21 = _tmpl$();
				insert(_el$21, error);
				return _el$21;
			}
		}), _el$26);
		insert(_el$13, createComponent(Show, {
			get when() {
				return clearedAt();
			},
			get children() {
				var _el$22 = _tmpl$2(), _el$25 = _el$22.firstChild.nextSibling;
				_el$25.nextSibling;
				insert(_el$22, clearedAt, _el$25);
				return _el$22;
			}
		}), _el$26);
		insert(_el$29, createComponent(Show, {
			get when() {
				return rows().length > 0;
			},
			get fallback() {
				return _tmpl$5();
			},
			get children() {
				return createComponent(For, {
					get each() {
						return rows();
					},
					children: (row) => (() => {
						var _el$36 = _tmpl$6(), _el$37 = _el$36.firstChild, _el$38 = _el$37.nextSibling, _el$39 = _el$38.nextSibling, _el$40 = _el$39.nextSibling, _el$41 = _el$40.nextSibling;
						insert(_el$37, () => row.id);
						insert(_el$38, () => row.name);
						insert(_el$39, () => row.created_at);
						insert(_el$40, () => row.updated_at);
						insert(_el$41, () => Array.from(row.blobtest).join(", "));
						return _el$36;
					})()
				});
			}
		}));
		createRenderEffect((_p$) => {
			var _v$ = status() === "running", _v$2 = !!(status() === "running"), _v$3 = !!(status() === "error");
			_v$ !== _p$.e && (_el$12.disabled = _p$.e = _v$);
			_v$2 !== _p$.t && _el$20.classList.toggle("running", _p$.t = _v$2);
			_v$3 !== _p$.a && _el$20.classList.toggle("error", _p$.a = _v$3);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		});
		return _el$;
	})();
}
delegateEvents(["click"]);
//#endregion
//#region src/main.tsx
render(() => createComponent(App, {}), document.querySelector("#root"));
//#endregion
