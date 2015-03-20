var wx;
(function (wx) {
    var WeakMapEmulated = (function () {
        function WeakMapEmulated() {
            this.inner = {};
        }
        WeakMapEmulated.prototype.set = function (key, value) {
            var oid = wx.getOid(key);
            this.inner[oid] = value;
        };
        WeakMapEmulated.prototype.get = function (key) {
            var oid = wx.getOid(key);
            return this.inner[oid];
        };
        WeakMapEmulated.prototype.has = function (key) {
            var oid = wx.getOid(key);
            return this.inner.hasOwnProperty(oid);
        };
        WeakMapEmulated.prototype.delete = function (key) {
            var oid = wx.getOid(key);
            return delete this.inner[oid];
        };
        Object.defineProperty(WeakMapEmulated.prototype, "isEmulated", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        return WeakMapEmulated;
    })();
    var hasNativeSupport = typeof WeakMap === "function";
    function createWeakMap(disableNativeSupport) {
        if (disableNativeSupport || !hasNativeSupport) {
            return new WeakMapEmulated();
        }
        return new WeakMap();
    }
    wx.createWeakMap = createWeakMap;
})(wx || (wx = {}));
var wx;
(function (wx) {
    var res;
    (function (res) {
        res.injector = "wx.injector";
        res.domManager = "wx.domservice";
        res.router = "wx.router";
        res.expressionCompiler = "wx.expressioncompiler";
        res.htmlTemplateEngine = "wx.htmlTemplateEngine";
        res.hasValueBindingValue = "has.wx.bindings.value";
        res.valueBindingValue = "wx.bindings.value";
    })(res = wx.res || (wx.res = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var cssClassNameRegex = /\S+/g;
    var RxObsConstructor = Rx.Observable;
    function isStrictMode() {
        return typeof this === "undefined";
    }
    wx.isStrictMode = isStrictMode;
    function isPrimitive(target) {
        var t = typeof target;
        return t === "boolean" || t === "number" || t === "string";
    }
    wx.isPrimitive = isPrimitive;
    function isProperty(target) {
        if (target == null)
            return false;
        return queryInterface(target, wx.IID.IObservableProperty);
    }
    wx.isProperty = isProperty;
    function isCommand(target) {
        if (target == null)
            return false;
        return target instanceof internal.commandConstructor || queryInterface(target, wx.IID.ICommand);
    }
    wx.isCommand = isCommand;
    function isList(target) {
        if (target == null)
            return false;
        return target instanceof internal.listConstructor || queryInterface(target, wx.IID.IObservableList);
    }
    wx.isList = isList;
    function isRxScheduler(target) {
        if (target == null)
            return false;
        return Rx.helpers.isScheduler(target);
    }
    wx.isRxScheduler = isRxScheduler;
    function isRxObservable(target) {
        if (target == null)
            return false;
        return target instanceof RxObsConstructor;
    }
    wx.isRxObservable = isRxObservable;
    function unwrapProperty(prop) {
        if (isProperty(prop))
            return prop();
        return prop;
    }
    wx.unwrapProperty = unwrapProperty;
    function isInUnitTest() {
        if (window && window["jasmine"] && window["jasmine"].version_ !== undefined) {
            return true;
        }
        if (window && window["getJasmineRequireObj"] && typeof window["getJasmineRequireObj"] === "function") {
            return true;
        }
        return false;
    }
    wx.isInUnitTest = isInUnitTest;
    function args2Array(args) {
        var result = [];
        for (var i = 0, len = args.length; i < len; i++) {
            result.push(args[i]);
        }
        return result;
    }
    wx.args2Array = args2Array;
    function formatString(fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var pattern = /\{\d+\}/g;
        return fmt.replace(pattern, function (capture) {
            return args[capture.match(/\d+/)];
        });
    }
    wx.formatString = formatString;
    function trimString(str) {
        return str.replace(/[ \t]+$/g, "").replace(/^[ \t]+/g, "");
    }
    wx.trimString = trimString;
    function extend(src, dst) {
        var ownProps = Object.getOwnPropertyNames(src);
        for (var i = 0; i < ownProps.length; i++) {
            var prop = ownProps[i];
            dst[prop] = src[prop];
        }
        return dst;
    }
    wx.extend = extend;
    var oid = 1;
    var oidPropertyName = "__rxui_oid__" + (new Date).getTime();
    var PropertyInfo = (function () {
        function PropertyInfo(propertyName, property) {
            this.property = property;
            this.propertyName = propertyName;
        }
        return PropertyInfo;
    })();
    wx.PropertyInfo = PropertyInfo;
    function queryInterface(target, iid) {
        if (supportsQueryInterface(target)) {
            return target.queryInterface(iid);
        }
        return false;
    }
    wx.queryInterface = queryInterface;
    function supportsQueryInterface(target) {
        return target !== undefined && target !== null && typeof target.queryInterface === "function";
    }
    wx.supportsQueryInterface = supportsQueryInterface;
    function getOwnPropertiesImplementingInterface(target, iid) {
        return Object.keys(target).filter(function (propertyName) {
            var o = target[propertyName];
            return queryInterface(o, iid);
        }).map(function (x) { return new PropertyInfo(x, target[x]); });
    }
    wx.getOwnPropertiesImplementingInterface = getOwnPropertiesImplementingInterface;
    function getOid(o) {
        if (isPrimitive(o))
            return (typeof o + ":" + o);
        var result = o[oidPropertyName];
        if (result === undefined) {
            result = (++oid).toString();
            o[oidPropertyName] = result;
        }
        return result;
    }
    wx.getOid = getOid;
    function toggleCssClass(node, shouldHaveClass) {
        var classNames = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            classNames[_i - 2] = arguments[_i];
        }
        if (classNames) {
            var currentClassNames = node.className.match(cssClassNameRegex) || [];
            var index;
            var i;
            var className;
            if (shouldHaveClass) {
                for (i = 0; i < classNames.length; i++) {
                    className = classNames[i];
                    index = currentClassNames.indexOf(className);
                    if (index === -1)
                        currentClassNames.push(className);
                }
            }
            else {
                for (i = 0; i < classNames.length; i++) {
                    className = classNames[i];
                    index = currentClassNames.indexOf(className);
                    if (index !== -1)
                        currentClassNames.splice(index, 1);
                }
            }
            node.className = currentClassNames.join(" ");
        }
    }
    wx.toggleCssClass = toggleCssClass;
    function isFunction(obj) {
        return typeof obj == 'function' || false;
    }
    wx.isFunction = isFunction;
    function isEqual(a, b, aStack, bStack) {
        var toString = ({}).toString;
        if (a === b)
            return a !== 0 || 1 / a === 1 / b;
        if (a == null || b == null)
            return a === b;
        var className = toString.call(a);
        if (className !== toString.call(b))
            return false;
        switch (className) {
            case '[object RegExp]':
            case '[object String]':
                return '' + a === '' + b;
            case '[object Number]':
                if (+a !== +a)
                    return +b !== +b;
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                return +a === +b;
        }
        var areArrays = className === '[object Array]';
        if (!areArrays) {
            if (typeof a != 'object' || typeof b != 'object')
                return false;
            var aCtor = a.constructor, bCtor = b.constructor;
            if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
                return false;
            }
        }
        aStack = aStack || [];
        bStack = bStack || [];
        var length = aStack.length;
        while (length--) {
            if (aStack[length] === a)
                return bStack[length] === b;
        }
        aStack.push(a);
        bStack.push(b);
        if (areArrays) {
            length = a.length;
            if (length !== b.length)
                return false;
            while (length--) {
                if (!isEqual(a[length], b[length], aStack, bStack))
                    return false;
            }
        }
        else {
            var keys = Object.keys(a), key;
            length = keys.length;
            if (Object.keys(b).length !== length)
                return false;
            while (length--) {
                key = keys[length];
                if (!(b.hasOwnProperty(key) && isEqual(a[key], b[key], aStack, bStack)))
                    return false;
            }
        }
        aStack.pop();
        bStack.pop();
        return true;
    }
    wx.isEqual = isEqual;
    function cloneNodeArray(nodes) {
        var length = nodes.length;
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = nodes[i].cloneNode(true);
        }
        return result;
    }
    wx.cloneNodeArray = cloneNodeArray;
    function using(disp, action) {
        if (!disp)
            throw new Error("disp");
        if (!action)
            throw new Error("action");
        try {
            action(disp);
        }
        finally {
            disp.dispose();
        }
    }
    wx.using = using;
    function observableRequire(module) {
        if (typeof require === "undefined")
            internal.throwError("there's no AMD-module loader available (Hint: did you forget to include RequireJS in your project?)");
        return Rx.Observable.create(function (observer) {
            try {
                require([module], function (m) {
                    observer.onNext(m);
                    observer.onCompleted();
                }, function (err) {
                    observer.onError(err);
                });
            }
            catch (e) {
                observer.onError(e);
            }
            return Rx.Disposable.empty;
        });
    }
    wx.observableRequire = observableRequire;
    function observeObject(target, onChanging) {
        if (onChanging === void 0) { onChanging = false; }
        var thrownExceptionsSubject = queryInterface(target, wx.IID.IHandleObservableErrors) ? target.thrownExceptions : wx.app.defaultExceptionHandler;
        return Rx.Observable.create(function (observer) {
            var result = new Rx.CompositeDisposable();
            var observableProperties = getOwnPropertiesImplementingInterface(target, wx.IID.IObservableProperty);
            observableProperties.forEach(function (x) {
                var prop = x.property;
                var obs = onChanging ? prop.changing : prop.changed;
                result.add(obs.subscribe(function (newVal) {
                    var e = new internal.PropertyChangedEventArgs(self, x.propertyName);
                    try {
                        observer.onNext(e);
                    }
                    catch (ex) {
                        thrownExceptionsSubject.onNext(ex);
                    }
                }));
            });
            return result;
        }).publish().refCount();
    }
    wx.observeObject = observeObject;
    function whenAny() {
        if (arguments.length === 2) {
            return arguments[0].changed.startWith(arguments[0]()).select(arguments[1]);
        }
        var args = args2Array(arguments);
        var selector = args.pop();
        args = args.map(function (x) { return x.changed.startWith(x()); });
        args.push(selector);
        return Rx.Observable.combineLatest.apply(this, args);
    }
    wx.whenAny = whenAny;
    var internal;
    (function (internal) {
        function throwError(fmt) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var msg = "WebRx: " + formatString(fmt, args);
            throw new Error(msg);
        }
        internal.throwError = throwError;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var Injector = (function () {
        function Injector() {
            this.registrations = {};
        }
        Injector.prototype.register = function () {
            var args = wx.args2Array(arguments);
            var key = args.shift();
            var factory;
            var isConstructor = false;
            var isSingleton = false;
            if (this.registrations.hasOwnProperty(key))
                wx.internal.throwError("'{0}' is already registered", key);
            var val = args.shift();
            if (typeof val !== "boolean") {
                factory = function (args, deps) { return val; };
            }
            else {
                isSingleton = val;
                val = args.shift();
                if (typeof val !== "boolean") {
                    var constructorArgs;
                    if (args) {
                        if (Array.isArray(args)) {
                            constructorArgs = args;
                        }
                        else {
                            constructorArgs = [args];
                        }
                    }
                    else {
                        constructorArgs = [];
                    }
                    factory = function (args, deps) { return val.apply(null, constructorArgs); };
                }
                else {
                    isConstructor = val;
                    args = args.pop();
                    var self = this;
                    var _constructor = args.pop();
                    var dependencies = args;
                    factory = function (args, deps) {
                        var resolved = dependencies.map(function (x) {
                            try {
                                return self.resolve(x, undefined, deps);
                            }
                            catch (e) {
                                wx.internal.throwError("error resolving dependency '{0}' for '{1}': {2}", x, key, e);
                            }
                        });
                        var constructorArgs;
                        if (args) {
                            if (Array.isArray(args)) {
                                constructorArgs = args;
                            }
                            else {
                                constructorArgs = [args];
                            }
                        }
                        else {
                            constructorArgs = [];
                        }
                        if (!isConstructor) {
                            return _constructor.apply(null, resolved.concat(constructorArgs));
                        }
                        else {
                            var _args = [null].concat(resolved).concat(constructorArgs);
                            var factoryFunction = _constructor.bind.apply(_constructor, _args);
                            return new factoryFunction();
                        }
                    };
                }
            }
            this.registrations[key] = { factory: factory, isSingleton: isSingleton };
        };
        Injector.prototype.resolve = function (key, args, deps) {
            deps = deps || {};
            if (deps.hasOwnProperty(key))
                wx.internal.throwError("detected circular dependency a from '{0}' to '{1}'", Object.keys(deps).join(", "), key);
            var registration = this.registrations[key];
            if (registration === undefined)
                wx.internal.throwError("'{0}' is not registered", key);
            if (registration.isSingleton && registration.value)
                return registration.value;
            var newDeps = {};
            newDeps[key] = true;
            wx.extend(deps, newDeps);
            var result = registration.factory(args, newDeps);
            if (registration.isSingleton)
                registration.value = result;
            return result;
        };
        return Injector;
    })();
    wx.injector = new Injector();
    wx.injector.register(wx.res.injector, false, function () { return new Injector(); });
})(wx || (wx = {}));
var wx;
(function (wx) {
    var SetEmulated = (function () {
        function SetEmulated() {
            this.values = [];
            this.keys = {};
        }
        SetEmulated.prototype.add = function (value) {
            var key = wx.getOid(value);
            if (!this.keys[key]) {
                this.values.push(value);
                this.keys[key] = true;
            }
            return this;
        };
        SetEmulated.prototype.delete = function (value) {
            var key = wx.getOid(value);
            if (this.keys[key]) {
                var index = this.values.indexOf(value);
                this.values.splice(index, 1);
                delete this.keys[key];
                return true;
            }
            return false;
        };
        SetEmulated.prototype.has = function (value) {
            var key = wx.getOid(value);
            return this.keys.hasOwnProperty(key);
        };
        SetEmulated.prototype.clear = function () {
            this.keys = {};
            this.values.length = 0;
        };
        SetEmulated.prototype.forEach = function (callback, thisArg) {
            this.values.forEach(callback, thisArg);
        };
        Object.defineProperty(SetEmulated.prototype, "size", {
            get: function () {
                return this.values.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SetEmulated.prototype, "isEmulated", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        return SetEmulated;
    })();
    var hasNativeSupport = typeof Set === "function" && Set.prototype.hasOwnProperty("forEach") && Set.prototype.hasOwnProperty("add") && Set.prototype.hasOwnProperty("clear") && Set.prototype.hasOwnProperty("delete") && Set.prototype.hasOwnProperty("has");
    function createSet(disableNativeSupport) {
        if (disableNativeSupport || !hasNativeSupport) {
            return new SetEmulated();
        }
        return new Set();
    }
    wx.createSet = createSet;
    function setToArray(src) {
        var result = new Array();
        src.forEach(function (x) { return result.push(x); });
        return result;
    }
    wx.setToArray = setToArray;
})(wx || (wx = {}));
var wx;
(function (wx) {
    var env;
    (function (env) {
        var _window = window;
        var userAgent = _window.navigator.userAgent;
        env.ie;
        env.opera;
        env.safari;
        env.firefox;
        var parseVersion = function (matches) {
            if (matches) {
                return parseFloat(matches[1]);
            }
            return undefined;
        };
        if (_window.opera && _window.opera.version) {
            env.opera = { version: parseInt(_window.opera.version()) };
        }
        var version = document && (function () {
            var version = 3, div = document.createElement('div'), iElems = div.getElementsByTagName('i');
            while (div.innerHTML = '<!--[if gt IE ' + (++version) + ']><i></i><![endif]-->', iElems[0]) {
            }
            return version > 4 ? version : undefined;
        }());
        if (version) {
            env.ie = { version: version };
            if (version < 10) {
                var map = wx.createWeakMap();
                env.ie.getSelectionChangeObservable = function (el) {
                    var doc = el.ownerDocument;
                    var result = map.get(doc);
                    if (result)
                        return result;
                    result = Rx.Observable.defer(function () {
                        return Rx.Observable.fromEvent(doc, 'selectionchange');
                    }).select(function (x) { return doc; }).publish().refCount();
                    map.set(doc, result);
                    return result;
                };
            }
        }
        version = parseVersion(userAgent.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i));
        if (version) {
            env.safari = { version: version };
        }
        version = parseVersion(userAgent.match(/Firefox\/([^ ]*)/));
        if (version) {
            env.firefox = { version: version };
        }
        env.isSupported = (!env.ie || env.ie.version >= 9) || (!env.safari || env.safari.version >= 5) || (!env.firefox || env.firefox.version >= 5);
        env.jQueryInstance = window["jQuery"];
        if (env.jQueryInstance && (typeof env.jQueryInstance['cleanData'] === "function")) {
            env.cleanExternalData = function (node) {
                env.jQueryInstance['cleanData']([node]);
            };
        }
        else {
            env.cleanExternalData = function (node) {
            };
        }
    })(env = wx.env || (wx.env = {}));
})(wx || (wx = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var wx;
(function (wx) {
    var Module = (function () {
        function Module(name) {
            this.bindings = {};
            this.components = {};
            this.name = name;
        }
        Module.prototype.registerComponent = function () {
            var args = wx.args2Array(arguments);
            var name = args.shift();
            var handler = args.shift();
            this.components[name] = handler;
        };
        Module.prototype.isComponentRegistered = function (name) {
            return this.components[name] !== undefined;
        };
        Module.prototype.getComponent = function (name) {
            var component = this.components[name];
            if (typeof component === "string") {
                component = wx.injector.resolve(component);
                this.components[name] = component;
                return component;
            }
            return this.components[name];
        };
        Module.prototype.registerBinding = function () {
            var _this = this;
            var args = wx.args2Array(arguments);
            var name = args.shift();
            var handler = args.shift();
            if (Array.isArray(name)) {
                name.forEach(function (x) { return _this.bindings[x] = handler; });
            }
            else {
                this.bindings[name] = handler;
            }
        };
        Module.prototype.isBindingRegistered = function (name) {
            return this.bindings[name] !== undefined;
        };
        Module.prototype.getBinding = function (name) {
            var directive = this.bindings[name];
            if (typeof directive === "string") {
                directive = wx.injector.resolve(directive);
                this.bindings[name] = directive;
                return directive;
            }
            return this.bindings[name];
        };
        return Module;
    })();
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            _super.call(this, "app");
            this.defaultExceptionHandler = Rx.Observer.create(function (ex) {
                if (!wx.isInUnitTest()) {
                    wx.log.error("An onError occurred on an object (usually a computedProperty) that would break a binding or command. To prevent this, subscribe to the thrownExceptions property of your objects: {0}", ex);
                }
            });
            if (!wx.isInUnitTest()) {
                this.history = this.createHistory();
            }
            else {
                this.history = createMockHistory();
            }
        }
        Object.defineProperty(App.prototype, "mainThreadScheduler", {
            get: function () {
                return this._unitTestMainThreadScheduler || this._mainThreadScheduler || Rx.Scheduler.currentThread;
            },
            set: function (value) {
                if (wx.isInUnitTest()) {
                    this._unitTestMainThreadScheduler = value;
                    this._mainThreadScheduler = this._mainThreadScheduler || value;
                }
                else {
                    this._mainThreadScheduler = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App.prototype, "templateEngine", {
            get: function () {
                if (!this._templateEngine) {
                    this._templateEngine = wx.injector.resolve(wx.res.htmlTemplateEngine);
                }
                return this._templateEngine;
            },
            set: function (newVal) {
                this._templateEngine = newVal;
            },
            enumerable: true,
            configurable: true
        });
        App.prototype.createHistory = function () {
            var result = {
                back: window.history.back,
                forward: window.history.forward,
                pushState: window.history.pushState,
                replaceState: window.history.replaceState
            };
            Object.defineProperty(result, "length", {
                get: function () {
                    return window.history.length;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(result, "state", {
                get: function () {
                    return window.history.state;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(result, "location", {
                get: function () {
                    return window.location;
                },
                enumerable: true,
                configurable: true
            });
            result.onPopState = Rx.Observable.fromEventPattern(function (h) { return window.addEventListener("popstate", h); }, function (h) { return window.removeEventListener("popstate", h); }).publish().refCount();
            return result;
        };
        return App;
    })(Module);
    wx.app = new App();
    var modules = { 'app': wx.app };
    function module(name) {
        var result = modules[name];
        if (result === undefined) {
            result = new Module(name);
            modules[name] = result;
        }
        return result;
    }
    wx.module = module;
})(wx || (wx = {}));
var wx;
(function (wx) {
    var DomManager = (function () {
        function DomManager(compiler) {
            this.expressionCache = {};
            this.dataContextExtensions = wx.createSet();
            this.parserOptions = {
                disallowFunctionCalls: true
            };
            this.elementState = wx.createWeakMap();
            this.compiler = compiler;
        }
        DomManager.prototype.applyBindings = function (model, rootNode) {
            if (rootNode === undefined || rootNode.nodeType !== 1)
                internal.throwError("first parameter should be your model, second parameter should be a DOM node!");
            if (this.isNodeBound(rootNode))
                internal.throwError("an element must not be bound multiple times!");
            var state = this.getNodeState(rootNode);
            if (state) {
                state.model = model;
            }
            else {
                state = this.createNodeState(model);
                this.setNodeState(rootNode, state);
            }
            var ctx = this.getDataContext(rootNode);
            this.applyBindingsRecursive(ctx, rootNode);
        };
        DomManager.prototype.applyBindingsToDescendants = function (ctx, node) {
            if (node.hasChildNodes()) {
                for (var i = 0; i < node.childNodes.length; i++) {
                    var child = node.childNodes[i];
                    if (child.nodeType !== 1)
                        continue;
                    this.applyBindingsRecursive(ctx, child);
                }
            }
        };
        DomManager.prototype.cleanNode = function (rootNode) {
            if (rootNode.nodeType !== 1)
                return;
            this.cleanNodeRecursive(rootNode);
        };
        DomManager.prototype.cleanDescendants = function (node) {
            if (node.hasChildNodes()) {
                for (var i = 0; i < node.childNodes.length; i++) {
                    var child = node.childNodes[i];
                    if (node.nodeType !== 1)
                        continue;
                    this.clearElementState(child);
                }
            }
        };
        DomManager.prototype.getObjectLiteralTokens = function (value) {
            value = wx.trimString(value);
            if (value !== '' && this.isObjectLiteralString(value)) {
                return this.compiler.parseObjectLiteral(value);
            }
            return [];
        };
        DomManager.prototype.compileBindingOptions = function (value) {
            value = wx.trimString(value);
            if (value === '') {
                return null;
            }
            if (this.isObjectLiteralString(value)) {
                var result = {};
                var tokens = this.compiler.parseObjectLiteral(value);
                var token;
                for (var i = 0; i < tokens.length; i++) {
                    token = tokens[i];
                    result[token.key] = this.compileBindingOptions(token.value);
                }
                return result;
            }
            else {
                return this.compiler.compileExpression(value, this.parserOptions, this.expressionCache);
            }
        };
        DomManager.prototype.getModuleContext = function (node) {
            var state;
            while (node) {
                state = this.getNodeState(node);
                if (state != null) {
                    if (state.module != null) {
                        return state.module;
                    }
                }
                node = node.parentNode;
            }
            return wx.app;
        };
        DomManager.prototype.registerDataContextExtension = function (extension) {
            this.dataContextExtensions.add(extension);
        };
        DomManager.prototype.getDataContext = function (node) {
            var models = [];
            var state = this.getNodeState(node);
            var _node = node;
            while (_node) {
                state = state != null ? state : this.getNodeState(_node);
                if (state != null) {
                    if (state.model != null) {
                        models.push(state.model);
                    }
                }
                state = null;
                _node = _node.parentNode;
            }
            var ctx;
            if (models.length > 0) {
                ctx = {
                    $data: models[0],
                    $root: models[models.length - 1],
                    $parent: models.length > 1 ? models[1] : null,
                    $parents: models.slice(1)
                };
            }
            else {
                ctx = {
                    $data: null,
                    $root: null,
                    $parent: null,
                    $parents: []
                };
            }
            this.dataContextExtensions.forEach(function (ext) { return ext(node, ctx); });
            return ctx;
        };
        DomManager.prototype.createNodeState = function (model, module) {
            return {
                cleanup: new Rx.CompositeDisposable(),
                model: model,
                module: module,
                isBound: false
            };
        };
        DomManager.prototype.isNodeBound = function (node) {
            var state = this.elementState.get(node);
            return state && state.isBound;
        };
        DomManager.prototype.setNodeState = function (node, state) {
            this.elementState.set(node, state);
        };
        DomManager.prototype.getNodeState = function (node) {
            return this.elementState.get(node);
        };
        DomManager.prototype.clearElementState = function (node) {
            var state = this.elementState.get(node);
            if (state) {
                if (state.cleanup != null) {
                    state.cleanup.dispose();
                    state.cleanup = undefined;
                }
                if (state.model != null) {
                    state.model = undefined;
                }
                if (state.module != null) {
                    state.module = undefined;
                }
            }
            this.elementState.delete(node);
            wx.env.cleanExternalData(node);
        };
        DomManager.prototype.evaluateExpression = function (exp, ctx) {
            var locals = this.createLocals(undefined, ctx);
            var result = exp(ctx.$data, locals);
            return result;
        };
        DomManager.prototype.expressionToObservable = function (exp, ctx, evalObs) {
            var _this = this;
            var captured = wx.createSet();
            var locals;
            var result;
            try {
                locals = this.createLocals(captured, ctx);
                result = exp(ctx.$data, locals);
                if (evalObs)
                    evalObs.onNext(true);
            }
            catch (e) {
                wx.app.defaultExceptionHandler.onNext(e);
                return Rx.Observable.return(undefined);
            }
            if (captured.size === 0) {
                if (wx.isRxObservable(result))
                    return result;
                return Rx.Observable.return(result);
            }
            var obs = Rx.Observable.create(function (observer) {
                var innerDisp = Rx.Observable.defer(function () {
                    return Rx.Observable.merge(wx.setToArray(captured)).take(1);
                }).repeat().subscribe(function (trigger) {
                    try {
                        captured.clear();
                        locals = _this.createLocals(captured, ctx);
                        result = exp(ctx.$data, locals);
                        if (!wx.isRxObservable(result)) {
                            observer.onNext(Rx.Observable.return(result));
                        }
                        else {
                            observer.onNext(result);
                        }
                        if (evalObs)
                            evalObs.onNext(true);
                    }
                    catch (e) {
                        wx.app.defaultExceptionHandler.onNext(e);
                    }
                });
                return innerDisp;
            });
            var startValue = wx.isRxObservable(result) ? result : Rx.Observable.return(result);
            return obs.startWith(startValue).concatAll().publish().refCount();
        };
        DomManager.prototype.applyBindingsInternal = function (ctx, el, module) {
            var result = false;
            var state = this.getNodeState(el);
            if (!state) {
                state = this.createNodeState();
                this.setNodeState(el, state);
            }
            else if (state.isBound) {
                internal.throwError("an element must not be bound multiple times!");
            }
            var _bindings;
            var tagName = el.tagName.toLowerCase();
            var i;
            if (module.isComponentRegistered(tagName) || wx.app.isComponentRegistered(tagName)) {
                var params = el.getAttribute(DomManager.paramsAttributename);
                var componentReference;
                if (params)
                    componentReference = "{ name: '" + tagName + "', params: {" + el.getAttribute(DomManager.paramsAttributename) + "} }";
                else
                    componentReference = "{ name: '" + tagName + "' }";
                _bindings = [{ key: 'component', value: componentReference }];
            }
            else {
                _bindings = this.getBindingDefinitions(el);
            }
            if (_bindings != null && _bindings.length > 0) {
                var bindings = _bindings.map(function (x) {
                    var handler = module.getBinding(x.key) || wx.app.getBinding(x.key);
                    if (!handler)
                        internal.throwError("binding '{0}' has not been registered.", x.key);
                    return { handler: handler, value: x.value };
                });
                bindings.sort(function (a, b) { return (b.handler.priority || 0) - (a.handler.priority || 0); });
                var hd = bindings.filter(function (x) { return x.handler.controlsDescendants; }).map(function (x) { return "'" + x.value + "'"; });
                if (hd.length > 1) {
                    internal.throwError("bindings {0} are competing for descendants of target element!", hd.join(", "));
                }
                result = hd.length > 0;
                for (i = 0; i < bindings.length; i++) {
                    var binding = bindings[i];
                    var handler = binding.handler;
                    handler.applyBinding(el, binding.value, ctx, state);
                }
            }
            state.isBound = true;
            return result;
        };
        DomManager.prototype.isObjectLiteralString = function (str) {
            return str[0] === "{" && str[str.length - 1] === "}";
        };
        DomManager.prototype.getBindingDefinitions = function (node) {
            var bindingText = null;
            if (node.nodeType === 1) {
                var attr = node.getAttribute(DomManager.bindingAttributeName);
                if (attr) {
                    bindingText = attr;
                }
            }
            if (bindingText) {
                bindingText = wx.trimString(bindingText);
            }
            if (bindingText)
                return this.compiler.parseObjectLiteral(bindingText);
            return null;
        };
        DomManager.prototype.applyBindingsRecursive = function (ctx, el, module) {
            module = module || this.getModuleContext(el);
            if (!this.applyBindingsInternal(ctx, el, module) && el.hasChildNodes()) {
                var state = this.getNodeState(el);
                if (state && state.module)
                    module = state.module;
                for (var i = 0; i < el.childNodes.length; i++) {
                    var child = el.childNodes[i];
                    if (child.nodeType !== 1)
                        continue;
                    this.applyBindingsRecursive(ctx, child, module);
                }
            }
        };
        DomManager.prototype.cleanNodeRecursive = function (node) {
            if (node.hasChildNodes()) {
                var length = node.childNodes.length;
                for (var i = 0; i < length; i++) {
                    var child = node.childNodes[i];
                    if (node.nodeType !== 1)
                        continue;
                    this.cleanNodeRecursive(child);
                }
            }
            this.clearElementState(node);
        };
        DomManager.prototype.createLocals = function (captured, ctx) {
            var locals = {};
            var list;
            var prop;
            var result, target;
            var hooks = {
                readFieldHook: function (o, field) {
                    var noUnwrap = false;
                    if (field[0] === '@') {
                        noUnwrap = true;
                        field = field.substring(1);
                    }
                    result = o[field];
                    if (!noUnwrap && wx.isProperty(result)) {
                        var prop = result;
                        if (captured)
                            captured.add(prop.changed);
                        result = prop();
                    }
                    return result;
                },
                writeFieldHook: function (o, field, newValue) {
                    target = o[field];
                    if (wx.isProperty(target)) {
                        var prop = target;
                        if (captured)
                            captured.add(prop.changed);
                        prop(newValue);
                    }
                    else {
                        o[field] = newValue;
                    }
                    return newValue;
                },
                readIndexHook: function (o, index) {
                    if (wx.queryInterface(o, wx.IID.IObservableList)) {
                        list = o;
                        result = list.get(index);
                        if (captured)
                            captured.add(list.listChanged);
                    }
                    else {
                        result = o[index];
                    }
                    if (wx.queryInterface(result, wx.IID.IObservableProperty)) {
                        var prop = result;
                        if (captured)
                            captured.add(prop.changed);
                        result = prop();
                    }
                    return result;
                },
                writeIndexHook: function (o, index, newValue) {
                    if (wx.queryInterface(o, wx.IID.IObservableList)) {
                        list = o;
                        target = list.get(index);
                        if (captured)
                            captured.add(list.listChanged);
                        if (wx.queryInterface(target, wx.IID.IObservableProperty)) {
                            prop = target;
                            if (captured)
                                captured.add(prop.changed);
                            prop(newValue);
                        }
                        else {
                            list.set(index, newValue);
                        }
                    }
                    else {
                        if (wx.queryInterface(o[index], wx.IID.IObservableProperty)) {
                            prop = target[index];
                            if (captured)
                                captured.add(prop.changed);
                            prop(newValue);
                        }
                        else {
                            o[index] = newValue;
                        }
                    }
                    return newValue;
                }
            };
            this.compiler.setRuntimeHooks(locals, hooks);
            var keys = Object.keys(ctx);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var key = keys[i];
                locals[key] = ctx[key];
            }
            return locals;
        };
        DomManager.bindingAttributeName = "data-bind";
        DomManager.paramsAttributename = "params";
        return DomManager;
    })();
    var internal;
    (function (internal) {
        internal.domManagerConstructor = DomManager;
    })(internal = wx.internal || (wx.internal = {}));
    function applyBindings(model, node) {
        wx.injector.resolve(wx.res.domManager).applyBindings(model, node);
    }
    wx.applyBindings = applyBindings;
    function cleanNode(node) {
        wx.injector.resolve(wx.res.domManager).cleanNode(node);
    }
    wx.cleanNode = cleanNode;
})(wx || (wx = {}));
var wx;
(function (wx) {
    var CheckedBinding = (function () {
        function CheckedBinding(domManager) {
            this.priority = 0;
            this.domManager = domManager;
        }
        CheckedBinding.prototype.applyBinding = function (node, options, ctx, state) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("checked-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var tag = el.tagName.toLowerCase();
            var isCheckBox = el.type === 'checkbox';
            var isRadioButton = el.type === 'radio';
            if (tag !== 'input' || (!isCheckBox && !isRadioButton))
                internal.throwError("checked-binding only operates on checkboxes and radio-buttons");
            var exp = this.domManager.compileBindingOptions(options);
            var prop;
            var locals;
            function cleanup() {
                if (locals) {
                    locals.dispose();
                    locals = null;
                }
            }
            function updateElement(value) {
                el.checked = value;
            }
            state.cleanup.add(this.domManager.expressionToObservable(exp, ctx).subscribe(function (model) {
                if (!wx.isProperty(model)) {
                    updateElement(model);
                }
                else {
                    cleanup();
                    locals = new Rx.CompositeDisposable();
                    prop = model;
                    locals.add(prop.changed.subscribe(function (x) {
                        updateElement(x);
                    }));
                    updateElement(prop());
                    if (!prop.source) {
                        var events = _this.getCheckedEventObservables(el);
                        locals.add(Rx.Observable.merge(events).subscribe(function (e) {
                            prop(el.checked);
                        }));
                    }
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                cleanup();
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
            }));
        };
        CheckedBinding.prototype.configure = function (options) {
        };
        CheckedBinding.prototype.getCheckedEventObservables = function (el) {
            var result = [];
            result.push(Rx.Observable.fromEvent(el, 'click'));
            result.push(Rx.Observable.fromEvent(el, 'change'));
            return result;
        };
        return CheckedBinding;
    })();
    var internal;
    (function (internal) {
        internal.checkedBindingConstructor = CheckedBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var CommandBinding = (function () {
        function CommandBinding(domManager) {
            this.priority = 0;
            this.domManager = domManager;
        }
        CommandBinding.prototype.applyBinding = function (node, options, ctx, state) {
            if (node.nodeType !== 1)
                internal.throwError("command-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var compiled = this.domManager.compileBindingOptions(options);
            var el = node;
            var cmd;
            var parameter;
            var exp;
            if (typeof compiled === "function") {
                exp = compiled;
                wx.using(this.domManager.expressionToObservable(exp, ctx).toProperty(), function (prop) {
                    cmd = prop();
                    parameter = null;
                });
            }
            else {
                var opt = compiled;
                exp = opt.command;
                wx.using(this.domManager.expressionToObservable(exp, ctx).toProperty(), function (prop) {
                    cmd = prop();
                });
                if (opt.parameter) {
                    exp = opt.parameter;
                    wx.using(this.domManager.expressionToObservable(exp, ctx).toProperty(), function (prop) {
                        parameter = prop();
                    });
                }
            }
            if (!wx.isCommand(cmd)) {
                internal.throwError("Command-Binding only works when bound to a Reactive Command!");
            }
            else {
                el.disabled = !cmd.canExecute(parameter);
                state.cleanup.add(cmd.canExecuteObservable.subscribe(function (canExecute) {
                    el.disabled = !canExecute;
                }));
                state.cleanup.add(Rx.Observable.fromEvent(el, "click").subscribe(function (e) {
                    cmd.execute(parameter);
                }));
            }
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
                cmd = null;
                parameter = null;
            }));
        };
        CommandBinding.prototype.configure = function (options) {
        };
        return CommandBinding;
    })();
    var internal;
    (function (internal) {
        internal.commandBindingConstructor = CommandBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var ModuleBinding = (function () {
        function ModuleBinding(domManager) {
            this.priority = 100;
            this.domManager = domManager;
        }
        ModuleBinding.prototype.applyBinding = function (node, options, ctx, state) {
            if (node.nodeType !== 1)
                internal.throwError("module-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var exp = this.domManager.compileBindingOptions(options);
            var obs = this.domManager.expressionToObservable(exp, ctx);
            state.cleanup.add(obs.subscribe(function (x) {
                if (typeof x === "string")
                    x = wx.module(x);
                state.module = x;
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                obs = null;
                self = null;
            }));
        };
        ModuleBinding.prototype.configure = function (options) {
        };
        return ModuleBinding;
    })();
    var internal;
    (function (internal) {
        internal.moduleBindingConstructor = ModuleBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var ComponentBinding = (function () {
        function ComponentBinding(domManager) {
            this.priority = 30;
            this.controlsDescendants = true;
            this.domManager = domManager;
        }
        ComponentBinding.prototype.applyBinding = function (node, options, ctx, state) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("component-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var compiled = this.domManager.compileBindingOptions(options);
            var opt = compiled;
            var exp;
            var observables = [];
            var paramsKeys = [];
            var componentName;
            var componentParams;
            var keepComponentParams = false;
            if (typeof compiled === "function") {
                exp = compiled;
                observables.push(this.domManager.expressionToObservable(exp, ctx));
            }
            else {
                observables.push(this.domManager.expressionToObservable(opt.name, ctx));
                if (opt.params) {
                    if (typeof opt.params === "function") {
                        componentParams = this.domManager.evaluateExpression(opt.params, ctx);
                        keepComponentParams = true;
                    }
                    else if (typeof opt.params === "object") {
                        Object.keys(opt.params).forEach(function (x) {
                            paramsKeys.push(x);
                            observables.push(_this.domManager.expressionToObservable(opt.params[x], ctx));
                        });
                    }
                    else {
                        internal.throwError("invalid component-params");
                    }
                }
            }
            var oldContents = new Array();
            while (el.firstChild) {
                oldContents.push(el.removeChild(el.firstChild));
            }
            state.cleanup.add(Rx.Observable.combineLatest(observables, function (_) { return wx.args2Array(arguments); }).subscribe(function (latest) {
                componentName = latest.shift();
                if (!keepComponentParams) {
                    componentParams = {};
                    for (var i = 0; i < paramsKeys.length; i++) {
                        componentParams[paramsKeys[i]] = latest[i];
                    }
                }
                var component = undefined;
                if (state.module)
                    component = state.module.getComponent(componentName);
                if (!component)
                    component = wx.app.getComponent(componentName);
                if (component == null)
                    internal.throwError("component '{0}' has not been registered.", componentName);
                if (component.viewModel) {
                    state.cleanup.add(Rx.Observable.combineLatest(_this.loadTemplate(component.template, componentParams), _this.loadViewModel(component.viewModel, componentParams), function (t, vm) {
                        if (typeof vm === "function") {
                            vm = vm(componentParams);
                        }
                        return { template: t, viewModel: vm };
                    }).subscribe(function (x) {
                        _this.applyTemplate(component, el, ctx, state, x.template, x.viewModel);
                    }, function (err) { return wx.app.defaultExceptionHandler.onNext(err); }));
                }
                else {
                    state.cleanup.add(_this.loadTemplate(component.template, componentParams).subscribe(function (t) {
                        _this.applyTemplate(component, el, ctx, state, t);
                    }, function (err) { return wx.app.defaultExceptionHandler.onNext(err); }));
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                oldContents = null;
                compiled = null;
            }));
        };
        ComponentBinding.prototype.configure = function (options) {
        };
        ComponentBinding.prototype.loadTemplate = function (template, params) {
            var syncResult;
            if (typeof template === "function") {
                syncResult = template(params);
                if (typeof syncResult === "string") {
                    syncResult = wx.app.templateEngine.parse(template(params));
                }
                return Rx.Observable.return(syncResult);
            }
            else if (typeof template === "string") {
                syncResult = wx.app.templateEngine.parse(template);
                return Rx.Observable.return(syncResult);
            }
            else if (Array.isArray(template)) {
                return Rx.Observable.return(template);
            }
            else if (typeof template === "object") {
                var options = template;
                if (options.resolve) {
                    syncResult = wx.injector.resolve(options.resolve);
                    return Rx.Observable.return(syncResult);
                }
                else if (options.promise) {
                    var promise = options.promise;
                    return Rx.Observable.fromPromise(promise);
                }
                else if (options.require) {
                    return wx.observableRequire(options.require).select(function (x) { return wx.app.templateEngine.parse(x); });
                }
                else if (options.element) {
                    if (typeof options.element === "string") {
                        syncResult = [document.querySelector(options.element)];
                        return Rx.Observable.return(syncResult);
                    }
                    else {
                        syncResult = [options.element];
                        return Rx.Observable.return(syncResult);
                    }
                }
            }
            internal.throwError("invalid template descriptor");
        };
        ComponentBinding.prototype.loadViewModel = function (vm, componentParams) {
            var syncResult;
            if (typeof vm === "function") {
                return Rx.Observable.return(vm);
            }
            else if (typeof vm === "object") {
                var options = vm;
                if (options.resolve) {
                    syncResult = wx.injector.resolve(options.resolve, componentParams);
                    return Rx.Observable.return(syncResult);
                }
                else if (options.promise) {
                    var promise = options.promise;
                    return Rx.Observable.fromPromise(promise);
                }
                else if (options.require) {
                    return wx.observableRequire(options.require);
                }
                else if (options.instance) {
                    return Rx.Observable.return(options.instance);
                }
            }
            internal.throwError("invalid view-model descriptor");
        };
        ComponentBinding.prototype.applyTemplate = function (component, el, ctx, state, template, vm) {
            while (el.firstChild) {
                this.domManager.cleanNode(el.firstChild);
                el.removeChild(el.firstChild);
            }
            for (var i = 0; i < template.length; i++) {
                var node = template[i].cloneNode(true);
                el.appendChild(node);
            }
            if (vm) {
                state.model = vm;
                ctx = this.domManager.getDataContext(el);
            }
            if (vm && component.preBindingInit && vm.hasOwnProperty(component.preBindingInit)) {
                vm[component.preBindingInit].call(vm, el);
            }
            this.domManager.applyBindingsToDescendants(ctx, el);
            if (vm && component.postBindingInit && vm.hasOwnProperty(component.postBindingInit)) {
                vm[component.postBindingInit].call(vm, el);
            }
        };
        return ComponentBinding;
    })();
    var internal;
    (function (internal) {
        internal.componentBindingConstructor = ComponentBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var EventBinding = (function () {
        function EventBinding(domManager) {
            this.priority = 0;
            this.domManager = domManager;
        }
        EventBinding.prototype.applyBinding = function (node, options, ctx, state) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("event-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var tokens = this.domManager.getObjectLiteralTokens(options);
            var eventDisposables = {};
            var eventHandlers = tokens.map(function (token) {
                var exp = _this.domManager.compileBindingOptions(token.value);
                return _this.domManager.expressionToObservable(exp, ctx);
            });
            for (var i = 0; i < tokens.length; i++) {
                ((function (_i) {
                    state.cleanup.add(eventHandlers[_i].subscribe(function (handler) {
                        var eventName = tokens[_i].key;
                        if (eventDisposables[eventName]) {
                            eventDisposables[eventName].dispose();
                        }
                        if (typeof handler === "function") {
                            eventDisposables[eventName] = Rx.Observable.fromEvent(el, eventName).subscribe(function (e) {
                                handler.apply(ctx.$data, [ctx, e]);
                            });
                        }
                        else {
                            var observer = handler;
                            eventDisposables[eventName] = Rx.Observable.fromEvent(el, eventName).subscribe(observer);
                        }
                    }));
                })(i));
            }
            state.cleanup.add(Rx.Disposable.create(function () {
                Object.keys(eventDisposables).forEach(function (x) {
                    if (eventDisposables[x])
                        eventDisposables[x].dispose();
                });
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
                eventDisposables = null;
                eventHandlers = null;
            }));
        };
        EventBinding.prototype.configure = function (options) {
        };
        return EventBinding;
    })();
    var internal;
    (function (internal) {
        internal.eventBindingConstructor = EventBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var internal;
    (function (internal) {
        var VirtualChildNodes = (function () {
            function VirtualChildNodes(targetNode, initialSyncToTarget, insertCB, removeCB) {
                this.childNodes = [];
                this.targetNode = targetNode;
                this.insertCB = insertCB;
                this.removeCB = removeCB;
                if (initialSyncToTarget) {
                    for (var i = 0; i < targetNode.childNodes.length; i++) {
                        this.childNodes.push(targetNode.childNodes[i]);
                    }
                }
            }
            VirtualChildNodes.prototype.appendChilds = function (nodes, callbackData) {
                var length = nodes.length;
                if (nodes.length > 1)
                    Array.prototype.push.apply(this.childNodes, nodes);
                else
                    this.childNodes.push(nodes[0]);
                for (var i = 0; i < length; i++) {
                    this.targetNode.appendChild(nodes[i]);
                }
                if (this.insertCB) {
                    for (i = 0; i < length; i++) {
                        this.insertCB(nodes[i], callbackData);
                    }
                }
            };
            VirtualChildNodes.prototype.insertChilds = function (index, nodes, callbackData) {
                if (index === this.childNodes.length) {
                    this.appendChilds(nodes, callbackData);
                }
                else {
                    var refNode = this.childNodes[index];
                    var length = nodes.length;
                    Array.prototype.splice.apply(this.childNodes, [index, 0].concat(nodes));
                    for (var i = 0; i < length; i++) {
                        this.targetNode.insertBefore(nodes[i], refNode);
                    }
                    if (this.insertCB) {
                        for (i = 0; i < length; i++) {
                            this.insertCB(nodes[i], callbackData);
                        }
                    }
                }
            };
            VirtualChildNodes.prototype.removeChilds = function (index, count, keepDom) {
                var node;
                if (count === 0)
                    return [];
                var nodes = this.childNodes.slice(index, index + count);
                this.childNodes.splice(index, count);
                if (!keepDom) {
                    var length = nodes.length;
                    for (var i = 0; i < length; i++) {
                        node = nodes[i];
                        if (this.removeCB)
                            this.removeCB(node);
                        this.targetNode.removeChild(node);
                    }
                }
                return nodes;
            };
            VirtualChildNodes.prototype.clear = function () {
                var length = this.childNodes.length;
                var node;
                for (var i = 0; i < length; i++) {
                    node = this.childNodes[i];
                    if (this.removeCB)
                        this.removeCB(node);
                    this.targetNode.removeChild(node);
                }
                this.childNodes = [];
            };
            return VirtualChildNodes;
        })();
        internal.VirtualChildNodes = VirtualChildNodes;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var ForEachBinding = (function () {
        function ForEachBinding(domManager) {
            this.priority = 40;
            this.controlsDescendants = true;
            this.domManager = domManager;
            domManager.registerDataContextExtension(function (node, ctx) {
                var state = domManager.getNodeState(node);
                ctx.$index = state.index;
            });
        }
        ForEachBinding.prototype.applyBinding = function (node, options, ctx, state) {
            if (node.nodeType !== 1)
                internal.throwError("forEach binding only operates on elements!");
            if (options == null)
                internal.throwError("** invalid binding options!");
            var compiled = this.domManager.compileBindingOptions(options);
            var el = node;
            var self = this;
            var initialApply = true;
            var cleanup = null;
            var hooks;
            var exp;
            var setProxyFunc;
            if (typeof compiled === "object" && compiled.hasOwnProperty("data")) {
                var opt = compiled;
                exp = opt.data;
                if (opt.hooks) {
                    hooks = this.domManager.evaluateExpression(opt.hooks, ctx);
                }
                if (opt['debug']) {
                    if (opt['debug']['setProxyFunc']) {
                        setProxyFunc = this.domManager.evaluateExpression(opt['debug']['setProxyFunc'], ctx);
                    }
                }
                if (typeof hooks === "string")
                    hooks = wx.injector.resolve(hooks);
            }
            else {
                exp = compiled;
            }
            var obs = this.domManager.expressionToObservable(exp, ctx);
            state.cleanup.add(Rx.Disposable.create(function () {
                if (cleanup) {
                    cleanup.dispose();
                    cleanup = null;
                }
            }));
            var template = new Array();
            state.cleanup.add(obs.subscribe(function (x) {
                if (cleanup) {
                    cleanup.dispose();
                }
                cleanup = new Rx.CompositeDisposable();
                self.applyValue(el, x, hooks, template, ctx, initialApply, cleanup, setProxyFunc);
                initialApply = false;
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                obs = null;
                el = null;
                self = null;
                template = null;
                hooks = null;
            }));
        };
        ForEachBinding.prototype.configure = function (options) {
        };
        ForEachBinding.prototype.createIndexObservableForNode = function (proxy, child, startIndex, trigger, indexes, templateLength) {
            return Rx.Observable.defer(function () {
                return Rx.Observable.create(function (obs) {
                    return trigger.subscribe(function (_) {
                        var index = proxy.childNodes.indexOf(child);
                        index /= templateLength;
                        obs.onNext(index);
                    });
                });
            }).startWith(startIndex).publish().refCount();
        };
        ForEachBinding.prototype.appendAllRows = function (proxy, list, ctx, template, hooks, indexes, indexTrigger, isInitial) {
            var length = list.length;
            for (var i = 0; i < length; i++) {
                this.appendRow(proxy, i, list.get(i), ctx, template, hooks, indexes, indexTrigger, isInitial);
            }
        };
        ForEachBinding.prototype.appendRow = function (proxy, index, item, ctx, template, hooks, indexes, indexTrigger, isInitial) {
            var nodes = wx.cloneNodeArray(template);
            var _index = indexTrigger ? this.createIndexObservableForNode(proxy, nodes[0], index, indexTrigger, indexes, template.length) : index;
            proxy.appendChilds(nodes, { index: _index, item: item });
            if (hooks) {
                if (hooks.afterRender)
                    hooks.afterRender(nodes, item);
                if (!isInitial && hooks.afterAdd)
                    hooks.afterAdd(nodes, item, index);
            }
        };
        ForEachBinding.prototype.insertRow = function (proxy, index, item, ctx, template, hooks, indexes, indexTrigger) {
            var templateLength = template.length;
            var nodes = wx.cloneNodeArray(template);
            var _index = this.createIndexObservableForNode(proxy, nodes[0], index, indexTrigger, indexes, template.length);
            proxy.insertChilds(index * templateLength, nodes, { index: _index, item: item });
            if (hooks) {
                if (hooks.afterRender)
                    hooks.afterRender(nodes, item);
                if (hooks.afterAdd)
                    hooks.afterAdd(nodes, item, index);
            }
        };
        ForEachBinding.prototype.removeRow = function (proxy, index, item, template, hooks) {
            var templateLength = template.length;
            var el = proxy.targetNode;
            var nodes = proxy.removeChilds(index * templateLength, templateLength, true);
            if (hooks && hooks.beforeRemove) {
                hooks.beforeRemove(nodes, item, index);
            }
            else {
                for (var i = 0; i < templateLength; i++) {
                    el.removeChild(nodes[i]);
                }
            }
        };
        ForEachBinding.prototype.moveRow = function (proxy, from, to, item, template, hooks, indexes, indexTrigger) {
            var templateLength = template.length;
            var el = proxy.targetNode;
            var nodes = proxy.removeChilds(from * templateLength, templateLength, true);
            if (hooks && hooks.beforeMove) {
                hooks.beforeMove(nodes, item, from);
            }
            for (var i = 0; i < templateLength; i++) {
                el.removeChild(nodes[i]);
            }
            nodes = wx.cloneNodeArray(template);
            var _index = this.createIndexObservableForNode(proxy, nodes[0], from, indexTrigger, indexes, template.length);
            proxy.insertChilds(templateLength * to, nodes, { index: _index, item: item });
            if (hooks && hooks.afterMove) {
                hooks.afterMove(nodes, item, from);
            }
        };
        ForEachBinding.prototype.rebindRow = function (proxy, index, item, template, indexes) {
            var templateLength = template.length;
            var savedIndex;
            for (var i = 0; i < template.length; i++) {
                var node = proxy.childNodes[(index * templateLength) + i];
                if (node.nodeType === 1) {
                    var state = this.domManager.getNodeState(node);
                    savedIndex = state != null ? state.index : undefined;
                    this.domManager.cleanNode(node);
                    state = this.domManager.createNodeState(item);
                    state.index = savedIndex;
                    this.domManager.setNodeState(node, state);
                    this.domManager.applyBindings(item, node);
                }
            }
        };
        ForEachBinding.prototype.observeList = function (proxy, ctx, template, cleanup, list, hooks, indexes, indexTrigger) {
            var _this = this;
            var i;
            var length;
            cleanup.add(indexTrigger);
            this.appendAllRows(proxy, list, ctx, template, hooks, indexes, indexTrigger, true);
            cleanup.add(list.itemsAdded.subscribe(function (e) {
                length = e.items.length;
                if (e.from === list.length) {
                    for (i = 0; i < length; i++) {
                        _this.appendRow(proxy, i + e.from, e.items[i], ctx, template, hooks, indexes, indexTrigger, false);
                    }
                }
                else {
                    for (i = 0; i < e.items.length; i++) {
                        _this.insertRow(proxy, i + e.from, e.items[i], ctx, template, hooks, indexes, indexTrigger);
                    }
                }
                indexTrigger.onNext(true);
            }));
            cleanup.add(list.itemsRemoved.subscribe(function (e) {
                length = e.items.length;
                for (i = 0; i < length; i++) {
                    _this.removeRow(proxy, i + e.from, e.items[i], template, hooks);
                }
                indexTrigger.onNext(true);
            }));
            cleanup.add(list.itemsMoved.subscribe(function (e) {
                _this.moveRow(proxy, e.from, e.to, e.items[0], template, hooks, indexes, indexTrigger);
                indexTrigger.onNext(true);
            }));
            cleanup.add(list.itemReplaced.subscribe(function (e) {
                _this.rebindRow(proxy, e.from, e.items[0], template, indexes);
                indexTrigger.onNext(true);
            }));
            cleanup.add(list.shouldReset.subscribe(function (e) {
                proxy.clear();
                _this.appendAllRows(proxy, list, ctx, template, hooks, indexes, indexTrigger, false);
                indexTrigger.onNext(true);
            }));
        };
        ForEachBinding.prototype.applyValue = function (el, value, hooks, template, ctx, initialApply, cleanup, setProxyFunc) {
            var i, length;
            if (initialApply) {
                length = el.childNodes.length;
                for (i = 0; i < length; i++) {
                    template.push(el.childNodes[i].cloneNode(true));
                }
            }
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
            if (template.length === 0)
                return;
            var proxy;
            var indexes;
            var self = this;
            var recalcIndextrigger;
            function nodeInsertCB(node, callbackData) {
                var item = callbackData.item;
                var index = callbackData.index;
                if (node.nodeType === 1) {
                    if (recalcIndextrigger) {
                        indexes.set(node, index);
                    }
                    var state = self.domManager.createNodeState(item);
                    state.index = index;
                    self.domManager.setNodeState(node, state);
                    if (item) {
                        self.domManager.applyBindings(item, node);
                    }
                }
            }
            function nodeRemoveCB(node) {
                if (node.nodeType === 1) {
                    self.domManager.cleanNode(node);
                    indexes.delete(node);
                }
            }
            proxy = new internal.VirtualChildNodes(el, false, nodeInsertCB, nodeRemoveCB);
            if (setProxyFunc)
                setProxyFunc(proxy);
            cleanup.add(Rx.Disposable.create(function () {
                indexes = null;
                proxy = null;
            }));
            if (Array.isArray(value)) {
                var arr = value;
                length = arr.length;
                for (i = 0; i < length; i++) {
                    this.appendRow(proxy, i, arr[i], ctx, template, hooks, undefined, undefined, true);
                }
            }
            else if (wx.isList(value)) {
                var list = value;
                indexes = wx.createWeakMap();
                recalcIndextrigger = new Rx.Subject();
                this.observeList(proxy, ctx, template, cleanup, list, hooks, indexes, recalcIndextrigger);
            }
            else {
                internal.throwError("forEach binding only operates on IObservableList or standard Javascript-Arrays");
            }
        };
        return ForEachBinding;
    })();
    var internal;
    (function (internal) {
        internal.forEachBindingConstructor = ForEachBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var HasFocusBinding = (function () {
        function HasFocusBinding(domManager) {
            this.priority = 0;
            this.domManager = domManager;
        }
        HasFocusBinding.prototype.applyBinding = function (node, options, ctx, state) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("hasFocus-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var prop;
            var locals;
            var exp = this.domManager.compileBindingOptions(options);
            function cleanup() {
                if (locals) {
                    locals.dispose();
                    locals = null;
                }
            }
            function handleElementFocusChange(isFocused) {
                var ownerDoc = el.ownerDocument;
                if ("activeElement" in ownerDoc) {
                    var active;
                    try {
                        active = ownerDoc.activeElement;
                    }
                    catch (e) {
                        active = ownerDoc.body;
                    }
                    isFocused = (active === el);
                }
                prop(isFocused);
            }
            function updateElement(value) {
                if (value) {
                    el.focus();
                }
                else {
                    el.blur();
                }
            }
            state.cleanup.add(this.domManager.expressionToObservable(exp, ctx).subscribe(function (model) {
                if (!wx.isProperty(model)) {
                    updateElement(model);
                }
                else {
                    cleanup();
                    locals = new Rx.CompositeDisposable();
                    prop = model;
                    locals.add(prop.changed.subscribe(function (x) {
                        updateElement(x);
                    }));
                    updateElement(prop());
                    if (!prop.source) {
                        locals.add(Rx.Observable.merge(_this.getFocusEventObservables(el)).subscribe(function (hasFocus) {
                            handleElementFocusChange(hasFocus);
                        }));
                    }
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                cleanup();
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
            }));
        };
        HasFocusBinding.prototype.configure = function (options) {
        };
        HasFocusBinding.prototype.getFocusEventObservables = function (el) {
            var result = [];
            result.push(Rx.Observable.fromEvent(el, 'focus').select(function (x) { return true; }));
            result.push(Rx.Observable.fromEvent(el, 'focusin').select(function (x) { return true; }));
            result.push(Rx.Observable.fromEvent(el, 'blur').select(function (x) { return false; }));
            result.push(Rx.Observable.fromEvent(el, 'focusout').select(function (x) { return false; }));
            return result;
        };
        return HasFocusBinding;
    })();
    var internal;
    (function (internal) {
        internal.hasFocusBindingConstructor = HasFocusBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var IfBinding = (function () {
        function IfBinding(domManager) {
            this.priority = 50;
            this.controlsDescendants = true;
            this.inverse = false;
            this.domManager = domManager;
        }
        IfBinding.prototype.applyBinding = function (node, options, ctx, state) {
            if (node.nodeType !== 1)
                internal.throwError("if-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var self = this;
            var initialApply = true;
            var exp = this.domManager.compileBindingOptions(options);
            var obs = this.domManager.expressionToObservable(exp, ctx);
            var template = new Array();
            state.cleanup.add(obs.subscribe(function (x) {
                self.applyValue(el, x, template, ctx, initialApply);
                initialApply = false;
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                obs = null;
                el = null;
                self = null;
                template = null;
            }));
        };
        IfBinding.prototype.configure = function (options) {
        };
        IfBinding.prototype.applyValue = function (el, value, template, ctx, initialApply) {
            var i;
            if (initialApply) {
                for (i = 0; i < el.childNodes.length; i++) {
                    template.push(el.childNodes[i].cloneNode(true));
                }
                while (el.firstChild) {
                    el.removeChild(el.firstChild);
                }
            }
            value = this.inverse ? !value : value;
            if (!value) {
                this.domManager.cleanDescendants(el);
                while (el.firstChild) {
                    el.removeChild(el.firstChild);
                }
            }
            else {
                for (i = 0; i < template.length; i++) {
                    var node = template[i].cloneNode(true);
                    el.appendChild(node);
                }
                this.domManager.applyBindingsToDescendants(ctx, el);
            }
        };
        return IfBinding;
    })();
    var NotIfBinding = (function (_super) {
        __extends(NotIfBinding, _super);
        function NotIfBinding(domManager) {
            _super.call(this, domManager);
            this.inverse = true;
        }
        return NotIfBinding;
    })(IfBinding);
    var internal;
    (function (internal) {
        internal.ifBindingConstructor = IfBinding;
        internal.notifBindingConstructor = NotIfBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var MultiOneWayChangeBindingBase = (function () {
        function MultiOneWayChangeBindingBase(domManager) {
            this.priority = 0;
            this.domManager = domManager;
        }
        MultiOneWayChangeBindingBase.prototype.applyBinding = function (node, options, ctx, state) {
            if (node.nodeType !== 1)
                internal.throwError("binding only operates on elements!");
            var compiled = this.domManager.compileBindingOptions(options);
            if (compiled == null || typeof compiled !== "object")
                internal.throwError("invalid binding-options!");
            var el = node;
            var observables = new Array();
            var obs;
            var exp;
            var keys = Object.keys(compiled);
            var i;
            for (i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = compiled[key];
                exp = value;
                obs = this.domManager.expressionToObservable(exp, ctx);
                observables.push([key, obs]);
            }
            for (i = 0; i < observables.length; i++) {
                key = observables[i][0];
                obs = observables[i][1];
                this.subscribe(el, obs, key, state);
            }
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
                keys = null;
                observables = null;
            }));
        };
        MultiOneWayChangeBindingBase.prototype.configure = function (options) {
        };
        MultiOneWayChangeBindingBase.prototype.subscribe = function (el, obs, key, state) {
            var _this = this;
            state.cleanup.add(obs.subscribe(function (x) {
                _this.applyValue(el, x, key);
            }));
        };
        MultiOneWayChangeBindingBase.prototype.applyValue = function (el, key, value) {
            internal.throwError("you need to override this method!");
        };
        return MultiOneWayChangeBindingBase;
    })();
    var CssBinding = (function (_super) {
        __extends(CssBinding, _super);
        function CssBinding(domManager) {
            _super.call(this, domManager);
        }
        CssBinding.prototype.applyValue = function (el, value, key) {
            wx.toggleCssClass(el, !!value, key);
        };
        return CssBinding;
    })(MultiOneWayChangeBindingBase);
    var AttrBinding = (function (_super) {
        __extends(AttrBinding, _super);
        function AttrBinding(domManager) {
            _super.call(this, domManager);
            this.priority = 5;
        }
        AttrBinding.prototype.applyValue = function (el, value, key) {
            var toRemove = (value === false) || (value === null) || (value === undefined);
            if (toRemove)
                el.removeAttribute(key);
            else {
                el.setAttribute(key, value.toString());
            }
        };
        return AttrBinding;
    })(MultiOneWayChangeBindingBase);
    var StyleBinding = (function (_super) {
        __extends(StyleBinding, _super);
        function StyleBinding(domManager) {
            _super.call(this, domManager);
        }
        StyleBinding.prototype.applyValue = function (el, value, key) {
            if (value === null || value === undefined || value === false) {
                value = "";
            }
            el.style[key] = value;
        };
        return StyleBinding;
    })(MultiOneWayChangeBindingBase);
    var internal;
    (function (internal) {
        internal.cssBindingConstructor = CssBinding;
        internal.attrBindingConstructor = AttrBinding;
        internal.styleBindingConstructor = StyleBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var impls = new Array();
    var RadioSingleSelectionImpl = (function () {
        function RadioSingleSelectionImpl(domManager) {
            this.domManager = domManager;
        }
        RadioSingleSelectionImpl.prototype.supports = function (el, model) {
            return (el.tagName.toLowerCase() === 'input' && el.getAttribute("type") === 'radio') && !wx.isList(model);
        };
        RadioSingleSelectionImpl.prototype.observeElement = function (el) {
            return Rx.Observable.merge(Rx.Observable.fromEvent(el, 'click'), Rx.Observable.fromEvent(el, 'change'));
        };
        RadioSingleSelectionImpl.prototype.observeModel = function (model) {
            if (wx.isProperty(model)) {
                var prop = model;
                return prop.changed;
            }
            return Rx.Observable.never();
        };
        RadioSingleSelectionImpl.prototype.updateElement = function (el, model) {
            var input = el;
            input.checked = internal.getNodeValue(input, this.domManager) == wx.unwrapProperty(model);
        };
        RadioSingleSelectionImpl.prototype.updateModel = function (el, model, e) {
            var input = el;
            if (input.checked) {
                model(internal.getNodeValue(input, this.domManager));
            }
        };
        return RadioSingleSelectionImpl;
    })();
    var OptionSingleSelectionImpl = (function () {
        function OptionSingleSelectionImpl(domManager) {
            this.domManager = domManager;
        }
        OptionSingleSelectionImpl.prototype.supports = function (el, model) {
            return el.tagName.toLowerCase() === 'select' && !wx.isList(model);
        };
        OptionSingleSelectionImpl.prototype.observeElement = function (el) {
            return Rx.Observable.fromEvent(el, 'change');
        };
        OptionSingleSelectionImpl.prototype.observeModel = function (model) {
            if (wx.isProperty(model)) {
                var prop = model;
                return prop.changed;
            }
            return Rx.Observable.never();
        };
        OptionSingleSelectionImpl.prototype.updateElement = function (el, model) {
            var select = el;
            var value = wx.unwrapProperty(model);
            var length = select.options.length;
            if (value == null) {
                select.selectedIndex = -1;
            }
            else {
                for (var i = 0; i < length; i++) {
                    var option = select.options[i];
                    if (internal.getNodeValue(option, this.domManager) == value) {
                        select.selectedIndex = i;
                        break;
                    }
                }
            }
        };
        OptionSingleSelectionImpl.prototype.updateModel = function (el, model, e) {
            var select = el;
            var value = select.selectedIndex !== -1 ? internal.getNodeValue(select.options[select.selectedIndex], this.domManager) : undefined;
            model(value);
        };
        return OptionSingleSelectionImpl;
    })();
    var SelectedValueBinding = (function () {
        function SelectedValueBinding(domManager) {
            this.priority = 0;
            this.domManager = domManager;
            impls.push(new RadioSingleSelectionImpl(domManager));
            impls.push(new OptionSingleSelectionImpl(domManager));
        }
        SelectedValueBinding.prototype.applyBinding = function (node, options, ctx, state) {
            if (node.nodeType !== 1)
                internal.throwError("selectedValue-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var impl;
            var implCleanup;
            var exp = this.domManager.compileBindingOptions(options);
            function cleanupImpl() {
                if (implCleanup) {
                    implCleanup.dispose();
                    implCleanup = null;
                }
            }
            state.cleanup.add(this.domManager.expressionToObservable(exp, ctx).subscribe(function (model) {
                cleanupImpl();
                impl = undefined;
                for (var i = 0; i < impls.length; i++) {
                    if (impls[i].supports(el, model)) {
                        impl = impls[i];
                        break;
                    }
                }
                if (!impl)
                    internal.throwError("selectedValue-binding does not support this combination of bound element and model!");
                implCleanup = new Rx.CompositeDisposable();
                impl.updateElement(el, model);
                implCleanup.add(impl.observeModel(model).subscribe(function (x) {
                    impl.updateElement(el, model);
                }));
                if (wx.isProperty(model)) {
                    implCleanup.add(impl.observeElement(el).subscribe(function (e) {
                        impl.updateModel(el, model, e);
                    }));
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
                cleanupImpl();
            }));
        };
        SelectedValueBinding.prototype.configure = function (options) {
        };
        return SelectedValueBinding;
    })();
    var internal;
    (function (internal) {
        internal.selectedValueBindingConstructor = SelectedValueBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var SingleOneWayChangeBindingBase = (function () {
        function SingleOneWayChangeBindingBase(domManager) {
            this.priority = 0;
            this.domManager = domManager;
        }
        SingleOneWayChangeBindingBase.prototype.applyBinding = function (node, options, ctx, state) {
            if (node.nodeType !== 1)
                internal.throwError("binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var self = this;
            var exp = this.domManager.compileBindingOptions(options);
            var obs = this.domManager.expressionToObservable(exp, ctx);
            state.cleanup.add(obs.subscribe(function (x) {
                self.applyValue(el, x);
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
                obs = null;
                self = null;
            }));
        };
        SingleOneWayChangeBindingBase.prototype.configure = function (options) {
        };
        SingleOneWayChangeBindingBase.prototype.applyValue = function (el, value) {
            internal.throwError("you need to override this method!");
        };
        return SingleOneWayChangeBindingBase;
    })();
    var TextBinding = (function (_super) {
        __extends(TextBinding, _super);
        function TextBinding(domManager) {
            _super.call(this, domManager);
        }
        TextBinding.prototype.applyValue = function (el, value) {
            if ((value === null) || (value === undefined))
                value = "";
            el.textContent = value;
        };
        return TextBinding;
    })(SingleOneWayChangeBindingBase);
    var VisibleBinding = (function (_super) {
        __extends(VisibleBinding, _super);
        function VisibleBinding(domManager) {
            _super.call(this, domManager);
            this.inverse = false;
            this.inverse = false;
        }
        VisibleBinding.prototype.configure = function (_options) {
            var options = _options;
            VisibleBinding.useCssClass = options.useCssClass;
            VisibleBinding.hiddenClass = options.hiddenClass;
        };
        VisibleBinding.prototype.applyValue = function (el, value) {
            value = this.inverse ? !value : value;
            if (!VisibleBinding.useCssClass) {
                if (!value) {
                    el.style.display = "none";
                }
                else {
                    el.style.display = "";
                }
            }
            else {
                wx.toggleCssClass(el, !value, VisibleBinding.hiddenClass);
            }
        };
        return VisibleBinding;
    })(SingleOneWayChangeBindingBase);
    var HiddenBinding = (function (_super) {
        __extends(HiddenBinding, _super);
        function HiddenBinding(domManager) {
            _super.call(this, domManager);
            this.inverse = true;
        }
        return HiddenBinding;
    })(VisibleBinding);
    var HtmlBinding = (function (_super) {
        __extends(HtmlBinding, _super);
        function HtmlBinding(domManager) {
            _super.call(this, domManager);
        }
        HtmlBinding.prototype.applyValue = function (el, value) {
            if ((value === null) || (value === undefined))
                value = "";
            el.innerHTML = value;
        };
        return HtmlBinding;
    })(SingleOneWayChangeBindingBase);
    var DisableBinding = (function (_super) {
        __extends(DisableBinding, _super);
        function DisableBinding(domManager) {
            _super.call(this, domManager);
            this.inverse = false;
            this.inverse = false;
        }
        DisableBinding.prototype.applyValue = function (el, value) {
            value = this.inverse ? !value : value;
            el.disabled = value;
        };
        return DisableBinding;
    })(SingleOneWayChangeBindingBase);
    var EnableBinding = (function (_super) {
        __extends(EnableBinding, _super);
        function EnableBinding(domManager) {
            _super.call(this, domManager);
            this.inverse = true;
        }
        return EnableBinding;
    })(DisableBinding);
    var internal;
    (function (internal) {
        internal.textBindingConstructor = TextBinding;
        internal.htmlBindingConstructor = HtmlBinding;
        internal.visibleBindingConstructor = VisibleBinding;
        internal.hiddenBindingConstructor = HiddenBinding;
        internal.disableBindingConstructor = DisableBinding;
        internal.enableBindingConstructor = EnableBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var TextInputBinding = (function () {
        function TextInputBinding(domManager) {
            this.priority = 0;
            this.domManager = domManager;
        }
        TextInputBinding.prototype.applyBinding = function (node, options, ctx, state) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("textInput-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var tag = el.tagName.toLowerCase();
            var isTextArea = tag === "textarea";
            if (tag !== 'input' && tag !== 'textarea')
                internal.throwError("textInput-binding can only be applied to input or textarea elements");
            var exp = this.domManager.compileBindingOptions(options);
            var prop;
            var propertySubscription;
            var eventSubscription;
            var previousElementValue;
            function updateElement(value) {
                if (value === null || value === undefined) {
                    value = "";
                }
                if (el.value !== value) {
                    previousElementValue = value;
                    el.value = value;
                }
            }
            function cleanup() {
                if (propertySubscription) {
                    propertySubscription.dispose();
                    propertySubscription = null;
                }
                if (eventSubscription) {
                    eventSubscription.dispose();
                    eventSubscription = null;
                }
            }
            state.cleanup.add(this.domManager.expressionToObservable(exp, ctx).subscribe(function (src) {
                if (!wx.isProperty(src)) {
                    updateElement(src);
                }
                else {
                    cleanup();
                    prop = src;
                    propertySubscription = prop.changed.subscribe(function (x) {
                        updateElement(x);
                    });
                    updateElement(prop());
                    if (!prop.source) {
                        var events = _this.getTextInputEventObservables(el, isTextArea);
                        eventSubscription = Rx.Observable.merge(events).subscribe(function (e) {
                            prop(el.value);
                        });
                    }
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                cleanup();
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
            }));
        };
        TextInputBinding.prototype.configure = function (options) {
        };
        TextInputBinding.prototype.getTextInputEventObservables = function (el, isTextArea) {
            var result = [];
            if (wx.env.ie && wx.env.ie.version < 10) {
                if (wx.env.ie.version <= 9) {
                    result.push(wx.env.ie.getSelectionChangeObservable(el).where(function (doc) { return doc.activeElement === el; }));
                    result.push(Rx.Observable.fromEvent(el, 'dragend'));
                    result.push(Rx.Observable.fromEvent(el, 'input'));
                    result.push(Rx.Observable.fromEvent(el, 'propertychange').where(function (e) { return e.propertyName === 'value'; }));
                }
            }
            else {
                result.push(Rx.Observable.fromEvent(el, 'input'));
                if (wx.env.safari && wx.env.safari.version < 5 && isTextArea) {
                    result.push(Rx.Observable.fromEvent(el, 'keydown'));
                    result.push(Rx.Observable.fromEvent(el, 'paste'));
                    result.push(Rx.Observable.fromEvent(el, 'cut'));
                }
                else if (wx.env.opera && wx.env.opera.version < 11) {
                    result.push(Rx.Observable.fromEvent(el, 'keydown'));
                }
                else if (wx.env.firefox && wx.env.firefox.version < 4.0) {
                    result.push(Rx.Observable.fromEvent(el, 'DOMAutoComplete'));
                    result.push(Rx.Observable.fromEvent(el, 'dragdrop'));
                    result.push(Rx.Observable.fromEvent(el, 'drop'));
                }
            }
            result.push(Rx.Observable.fromEvent(el, 'change'));
            return result;
        };
        return TextInputBinding;
    })();
    var internal;
    (function (internal) {
        internal.textInputBindingConstructor = TextInputBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var ValueBinding = (function () {
        function ValueBinding(domManager) {
            this.priority = 5;
            this.domManager = domManager;
        }
        ValueBinding.prototype.applyBinding = function (node, options, ctx, state) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("value-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var tag = el.tagName.toLowerCase();
            if (tag !== 'input' && tag !== 'option' && tag !== 'select' && tag !== 'textarea')
                internal.throwError("value-binding only operates on checkboxes and radio-buttons");
            var useDomManagerForValueUpdates = (tag === 'input' && el.type === 'radio') || tag === 'option';
            var prop;
            var locals;
            var exp = this.domManager.compileBindingOptions(options);
            function cleanup() {
                if (locals) {
                    locals.dispose();
                    locals = null;
                }
            }
            function updateElement(domManager, value) {
                if (useDomManagerForValueUpdates)
                    internal.setNodeValue(el, value, domManager);
                else {
                    if ((value === null) || (value === undefined))
                        value = "";
                    el.value = value;
                }
            }
            state.cleanup.add(this.domManager.expressionToObservable(exp, ctx).subscribe(function (model) {
                if (!wx.isProperty(model)) {
                    updateElement(_this.domManager, model);
                }
                else {
                    cleanup();
                    locals = new Rx.CompositeDisposable();
                    prop = model;
                    locals.add(prop.changed.subscribe(function (x) {
                        updateElement(_this.domManager, x);
                    }));
                    updateElement(_this.domManager, prop());
                    if (!prop.source) {
                        locals.add(Rx.Observable.fromEvent(el, 'change').subscribe(function (e) {
                            if (useDomManagerForValueUpdates)
                                prop(internal.getNodeValue(el, _this.domManager));
                            else
                                prop(el.value);
                        }));
                    }
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                cleanup();
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
            }));
        };
        ValueBinding.prototype.configure = function (options) {
        };
        return ValueBinding;
    })();
    var internal;
    (function (internal) {
        function getNodeValue(node, domManager) {
            var state = domManager.getNodeState(node);
            if (state != null && state[wx.res.hasValueBindingValue]) {
                return state[wx.res.valueBindingValue];
            }
            return node.value;
        }
        internal.getNodeValue = getNodeValue;
        function setNodeValue(node, value, domManager) {
            if ((value === null) || (value === undefined))
                value = "";
            var state = domManager.getNodeState(node);
            if (typeof value === "string") {
                if (node.value !== value) {
                    node.value = value;
                    if (state != null && state[wx.res.hasValueBindingValue]) {
                        state[wx.res.hasValueBindingValue] = false;
                        state[wx.res.valueBindingValue] = undefined;
                    }
                }
            }
            else {
                if (state == null) {
                    state = this.createNodeState();
                    this.setNodeState(node, state);
                }
                state[wx.res.valueBindingValue] = value;
                state[wx.res.hasValueBindingValue] = true;
            }
        }
        internal.setNodeValue = setNodeValue;
    })(internal = wx.internal || (wx.internal = {}));
    var internal;
    (function (internal) {
        internal.valueBindingConstructor = ValueBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var WithBinding = (function () {
        function WithBinding(domManager) {
            this.priority = 50;
            this.controlsDescendants = true;
            this.domManager = domManager;
        }
        WithBinding.prototype.applyBinding = function (node, options, ctx, state) {
            if (node.nodeType !== 1)
                internal.throwError("with-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var self = this;
            var exp = this.domManager.compileBindingOptions(options);
            var obs = this.domManager.expressionToObservable(exp, ctx);
            state.cleanup.add(obs.subscribe(function (x) {
                self.applyValue(el, x, state);
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                obs = null;
                el = null;
                self = null;
            }));
        };
        WithBinding.prototype.configure = function (options) {
        };
        WithBinding.prototype.applyValue = function (el, value, state) {
            state.model = value;
            var ctx = this.domManager.getDataContext(el);
            this.domManager.cleanDescendants(el);
            this.domManager.applyBindingsToDescendants(ctx, el);
        };
        return WithBinding;
    })();
    var internal;
    (function (internal) {
        internal.withBindingConstructor = WithBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var ObservableList = (function () {
        function ObservableList(initialContents, resetChangeThreshold) {
            if (resetChangeThreshold === void 0) { resetChangeThreshold = 0.3; }
            this.changeNotificationsSuppressed = 0;
            this.propertyChangeWatchers = null;
            this.resetChangeThreshold = 0;
            this.resetSubCount = 0;
            this.hasWhinedAboutNoResetSub = false;
            this.setupRx(initialContents, resetChangeThreshold);
        }
        ObservableList.prototype.queryInterface = function (iid) {
            if (iid === wx.IID.IUnknown || iid === wx.IID.IDisposable || iid === wx.IID.IObservableList || iid === wx.IID.IReadOnlyList || iid === wx.IID.IList)
                return true;
            return false;
        };
        ObservableList.prototype.dispose = function () {
            this.clearAllPropertyChangeWatchers();
        };
        Object.defineProperty(ObservableList.prototype, "isReadOnly", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "itemsAdded", {
            get: function () {
                if (!this._itemsAdded)
                    this._itemsAdded = this.itemsAddedSubject.value.asObservable();
                return this._itemsAdded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "beforeItemsAdded", {
            get: function () {
                if (!this._beforeItemsAdded)
                    this._beforeItemsAdded = this.beforeItemsAddedSubject.value.asObservable();
                return this._beforeItemsAdded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "itemsRemoved", {
            get: function () {
                if (!this._itemsRemoved)
                    this._itemsRemoved = this.itemsRemovedSubject.value.asObservable();
                return this._itemsRemoved;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "beforeItemsRemoved", {
            get: function () {
                if (!this._beforeItemsRemoved)
                    this._beforeItemsRemoved = this.beforeItemsRemovedSubject.value.asObservable();
                return this._beforeItemsRemoved;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "itemReplaced", {
            get: function () {
                if (!this._itemReplaced)
                    this._itemReplaced = this.itemReplacedSubject.value.asObservable();
                return this._itemReplaced;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "beforeItemReplaced", {
            get: function () {
                if (!this._beforeItemReplaced)
                    this._beforeItemReplaced = this.beforeItemReplacedSubject.value.asObservable();
                return this._beforeItemReplaced;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "beforeItemsMoved", {
            get: function () {
                if (!this._beforeItemsMoved)
                    this._beforeItemsMoved = this.beforeItemsMovedSubject.value.asObservable();
                return this._beforeItemsMoved;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "itemsMoved", {
            get: function () {
                if (!this._itemsMoved)
                    this._itemsMoved = this.itemsMovedSubject.value.asObservable();
                return this._itemsMoved;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "countChanging", {
            get: function () {
                var _this = this;
                if (!this._countChanging)
                    this._countChanging = this.listChanging.select(function (_) { return _this.inner.length; }).distinctUntilChanged();
                return this._countChanging;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "countChanged", {
            get: function () {
                var _this = this;
                if (!this._countChanged)
                    this._countChanged = this.listChanged.select(function (_) { return _this.inner.length; }).distinctUntilChanged();
                return this._countChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "itemChanging", {
            get: function () {
                if (!this._itemChanging)
                    this._itemChanging = this.itemChangingSubject.value.asObservable();
                return this._itemChanging;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "itemChanged", {
            get: function () {
                if (!this._itemChanged)
                    this._itemChanged = this.itemChangedSubject.value.asObservable();
                return this._itemChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "shouldReset", {
            get: function () {
                var _this = this;
                return this.refcountSubscribers(this.listChanged.selectMany(function (x) { return !x ? Rx.Observable.empty() : Rx.Observable.return(null); }), function (x) { return _this.resetSubCount += x; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "changeTrackingEnabled", {
            get: function () {
                return this.propertyChangeWatchers != null;
            },
            set: function (newValue) {
                var _this = this;
                if (this.propertyChangeWatchers != null && newValue)
                    return;
                if (this.propertyChangeWatchers == null && !newValue)
                    return;
                if (newValue) {
                    this.propertyChangeWatchers = {};
                    this.inner.forEach(function (x) { return _this.addItemToPropertyTracking(x); });
                }
                else {
                    this.clearAllPropertyChangeWatchers();
                    this.propertyChangeWatchers = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "length", {
            get: function () {
                return this.inner.length;
            },
            enumerable: true,
            configurable: true
        });
        ObservableList.prototype.addRange = function (items) {
            var _this = this;
            if (items == null) {
                internal.throwError("items");
            }
            var disp = this.isLengthAboveResetThreshold(items.length) ? this.suppressChangeNotifications() : Rx.Disposable.empty;
            wx.using(disp, function () {
                if (!_this.areChangeNotificationsEnabled()) {
                    Array.prototype.push.apply(_this.inner, items);
                    if (_this.changeTrackingEnabled) {
                        items.forEach(function (x) {
                            _this.addItemToPropertyTracking(x);
                        });
                    }
                }
                else if (true) {
                    if (_this.beforeItemsAddedSubject.isValueCreated) {
                        _this.beforeItemsAddedSubject.value.onNext({ items: items, from: _this.inner.length });
                    }
                    Array.prototype.push.apply(_this.inner, items);
                    if (_this.itemsAddedSubject.isValueCreated) {
                        _this.itemsAddedSubject.value.onNext({ items: items, from: _this.inner.length });
                    }
                    if (_this.changeTrackingEnabled) {
                        items.forEach(function (x) {
                            _this.addItemToPropertyTracking(x);
                        });
                    }
                }
                else {
                    items.forEach(function (x) {
                        _this.add(x);
                    });
                }
            });
        };
        ObservableList.prototype.insertRange = function (index, items) {
            var _this = this;
            if (items == null) {
                internal.throwError("collection");
            }
            if (index > this.inner.length) {
                internal.throwError("index");
            }
            var disp = this.isLengthAboveResetThreshold(items.length) ? this.suppressChangeNotifications() : Rx.Disposable.empty;
            wx.using(disp, function () {
                if (!_this.areChangeNotificationsEnabled()) {
                    Array.prototype.splice.apply(_this.inner, [index, 0].concat(items));
                    if (_this.changeTrackingEnabled) {
                        items.forEach(function (x) {
                            _this.addItemToPropertyTracking(x);
                        });
                    }
                }
                else if (true) {
                    if (_this.beforeItemsAddedSubject.isValueCreated) {
                        items.forEach(function (x) {
                            _this.beforeItemsAddedSubject.value.onNext({ items: items, from: index });
                        });
                    }
                    Array.prototype.splice.apply(_this.inner, [index, 0].concat(items));
                    if (_this.itemsAddedSubject.isValueCreated) {
                        items.forEach(function (x) {
                            _this.itemsAddedSubject.value.onNext({ items: items, from: index });
                        });
                    }
                    if (_this.changeTrackingEnabled) {
                        items.forEach(function (x) {
                            _this.addItemToPropertyTracking(x);
                        });
                    }
                }
                else {
                    items.forEach(function (x) {
                        _this.add(x);
                    });
                }
            });
        };
        ObservableList.prototype.removeAll = function (items) {
            var _this = this;
            if (items == null) {
                internal.throwError("items");
            }
            var disp = this.isLengthAboveResetThreshold(items.length) ? this.suppressChangeNotifications() : Rx.Disposable.empty;
            wx.using(disp, function () {
                items.forEach(function (x) { return _this.remove(x); });
            });
        };
        ObservableList.prototype.removeRange = function (index, count) {
            var _this = this;
            var disp = this.isLengthAboveResetThreshold(count) ? this.suppressChangeNotifications() : Rx.Disposable.empty;
            wx.using(disp, function () {
                var items = _this.inner.slice(index, index + count);
                if (!_this.areChangeNotificationsEnabled()) {
                    _this.inner.splice(index, count);
                    if (_this.changeTrackingEnabled) {
                        items.forEach(function (x) {
                            _this.removeItemFromPropertyTracking(x);
                        });
                    }
                }
                else if (true) {
                    if (_this.beforeItemsRemovedSubject.isValueCreated) {
                        items.forEach(function (x) {
                            _this.beforeItemsRemovedSubject.value.onNext({ items: items, from: index });
                        });
                    }
                    _this.inner.splice(index, count);
                    if (_this.changeTrackingEnabled) {
                        items.forEach(function (x) {
                            _this.removeItemFromPropertyTracking(x);
                        });
                    }
                    if (_this.itemsRemovedSubject.isValueCreated) {
                        items.forEach(function (x) {
                            _this.itemsRemovedSubject.value.onNext({ items: items, from: index });
                        });
                    }
                }
                else {
                    items.forEach(function (x) {
                        _this.remove(x);
                    });
                }
            });
        };
        ObservableList.prototype.toArray = function () {
            return this.inner;
        };
        ObservableList.prototype.reset = function () {
            this.publishResetNotification();
        };
        ObservableList.prototype.add = function (item) {
            this.insertItem(this.inner.length, item);
        };
        ObservableList.prototype.clear = function () {
            this.clearItems();
        };
        ObservableList.prototype.contains = function (item) {
            return this.inner.indexOf(item) !== -1;
        };
        ObservableList.prototype.remove = function (item) {
            var index = this.inner.indexOf(item);
            if (index === -1)
                return false;
            this.removeItem(index);
            return true;
        };
        ObservableList.prototype.indexOf = function (item) {
            return this.inner.indexOf(item);
        };
        ObservableList.prototype.insert = function (index, item) {
            this.insertItem(index, item);
        };
        ObservableList.prototype.removeAt = function (index) {
            this.removeItem(index);
        };
        ObservableList.prototype.move = function (oldIndex, newIndex) {
            this.moveItem(oldIndex, newIndex);
        };
        ObservableList.prototype.suppressChangeNotifications = function () {
            var _this = this;
            this.changeNotificationsSuppressed++;
            if (!this.hasWhinedAboutNoResetSub && this.resetSubCount === 0 && !wx.isInUnitTest()) {
                wx.log.info("suppressChangeNotifications was called (perhaps via addRange), yet you do not have a subscription to shouldReset. This probably isn't what you want, as itemsAdded and friends will appear to 'miss' items");
                this.hasWhinedAboutNoResetSub = true;
            }
            return Rx.Disposable.create(function () {
                _this.changeNotificationsSuppressed--;
                if (_this.changeNotificationsSuppressed === 0) {
                    _this.publishBeforeResetNotification();
                    _this.publishResetNotification();
                }
            });
        };
        ObservableList.prototype.get = function (index) {
            return this.inner[index];
        };
        Object.defineProperty(ObservableList.prototype, "isEmpty", {
            get: function () {
                return this.inner.length === 0;
            },
            enumerable: true,
            configurable: true
        });
        ObservableList.prototype.sort = function (comparison) {
            this.publishBeforeResetNotification();
            this.inner.sort(comparison);
            this.publishResetNotification();
        };
        ObservableList.prototype.forEach = function (callbackfn, thisArg) {
            this.inner.forEach(callbackfn, thisArg);
        };
        ObservableList.prototype.map = function (callbackfn, thisArg) {
            return this.inner.map(callbackfn, thisArg);
        };
        ObservableList.prototype.filter = function (callbackfn, thisArg) {
            return this.inner.filter(callbackfn, thisArg);
        };
        ObservableList.prototype.some = function (callbackfn, thisArg) {
            return this.inner.some(callbackfn, thisArg);
        };
        ObservableList.prototype.every = function (callbackfn, thisArg) {
            return this.inner.every(callbackfn, thisArg);
        };
        ObservableList.prototype.setupRx = function (initialContents, resetChangeThreshold) {
            if (resetChangeThreshold === void 0) { resetChangeThreshold = 0.3; }
            this.resetChangeThreshold = resetChangeThreshold;
            if (this.inner === undefined)
                this.inner = new Array();
            this.beforeItemsAddedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.itemsAddedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.beforeItemsRemovedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.itemsRemovedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.beforeItemReplacedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.itemReplacedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.resetSubject = new Rx.Subject();
            this.beforeResetSubject = new Rx.Subject();
            this.itemChangingSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.itemChangedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.beforeItemsMovedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.itemsMovedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.listChanged = Rx.Observable.merge(this.itemsAdded.select(function (x) { return false; }), this.itemsRemoved.select(function (x) { return false; }), this.itemReplaced.select(function (x) { return false; }), this.itemsMoved.select(function (x) { return false; }), this.resetSubject.select(function (x) { return true; }));
            this.listChanging = Rx.Observable.merge(this.beforeItemsAdded.select(function (x) { return false; }), this.beforeItemsRemoved.select(function (x) { return false; }), this.beforeItemReplaced.select(function (x) { return false; }), this.beforeItemsMoved.select(function (x) { return false; }), this.beforeResetSubject.select(function (x) { return true; }));
            if (initialContents) {
                Array.prototype.splice.apply(this.inner, [0, 0].concat(initialContents));
            }
        };
        ObservableList.prototype.areChangeNotificationsEnabled = function () {
            return this.changeNotificationsSuppressed === 0;
        };
        ObservableList.prototype.insertItem = function (index, item) {
            if (!this.areChangeNotificationsEnabled()) {
                this.inner.splice(index, 0, item);
                if (this.changeTrackingEnabled)
                    this.addItemToPropertyTracking(item);
                return;
            }
            if (this.beforeItemsAddedSubject.isValueCreated)
                this.beforeItemsAddedSubject.value.onNext({ items: [item], from: index });
            this.inner.splice(index, 0, item);
            if (this.itemsAddedSubject.isValueCreated)
                this.itemsAddedSubject.value.onNext({ items: [item], from: index });
            if (this.changeTrackingEnabled)
                this.addItemToPropertyTracking(item);
        };
        ObservableList.prototype.removeItem = function (index) {
            var item = this.inner[index];
            if (!this.areChangeNotificationsEnabled()) {
                this.inner.splice(index, 1);
                if (this.changeTrackingEnabled)
                    this.removeItemFromPropertyTracking(item);
                return;
            }
            if (this.beforeItemsRemovedSubject.isValueCreated)
                this.beforeItemsRemovedSubject.value.onNext({ items: [item], from: index });
            this.inner.splice(index, 1);
            if (this.itemsRemovedSubject.isValueCreated)
                this.itemsRemovedSubject.value.onNext({ items: [item], from: index });
            if (this.changeTrackingEnabled)
                this.removeItemFromPropertyTracking(item);
        };
        ObservableList.prototype.moveItem = function (oldIndex, newIndex) {
            var item = this.inner[oldIndex];
            if (!this.areChangeNotificationsEnabled()) {
                this.inner.splice(oldIndex, 1);
                this.inner.splice(newIndex, 0, item);
                return;
            }
            var mi = { items: [item], from: oldIndex, to: newIndex };
            if (this.beforeItemsMovedSubject.isValueCreated)
                this.beforeItemsMovedSubject.value.onNext(mi);
            this.inner.splice(oldIndex, 1);
            this.inner.splice(newIndex, 0, item);
            if (this.itemsMovedSubject.isValueCreated)
                this.itemsMovedSubject.value.onNext(mi);
        };
        ObservableList.prototype.set = function (index, item) {
            if (!this.areChangeNotificationsEnabled()) {
                if (this.changeTrackingEnabled) {
                    this.removeItemFromPropertyTracking(this.inner[index]);
                    this.addItemToPropertyTracking(item);
                }
                this.inner[index] = item;
                return;
            }
            if (this.beforeItemReplacedSubject.isValueCreated)
                this.beforeItemReplacedSubject.value.onNext({ from: index, items: [item] });
            if (this.changeTrackingEnabled) {
                this.removeItemFromPropertyTracking(this.inner[index]);
                this.addItemToPropertyTracking(item);
            }
            this.inner[index] = item;
            if (this.itemReplacedSubject.isValueCreated)
                this.itemReplacedSubject.value.onNext({ from: index, items: [item] });
        };
        ObservableList.prototype.clearItems = function () {
            if (!this.areChangeNotificationsEnabled()) {
                this.inner.length = 0;
                if (this.changeTrackingEnabled)
                    this.clearAllPropertyChangeWatchers();
                return;
            }
            this.publishBeforeResetNotification();
            this.inner.length = 0;
            this.publishResetNotification();
            if (this.changeTrackingEnabled)
                this.clearAllPropertyChangeWatchers();
        };
        ObservableList.prototype.addItemToPropertyTracking = function (toTrack) {
            var rcd = this.propertyChangeWatchers[wx.getOid(toTrack)];
            var self = this;
            if (rcd) {
                rcd.addRef();
                return;
            }
            var changing = wx.observeObject(toTrack, true).select(function (i) { return new internal.PropertyChangedEventArgs(toTrack, i.propertyName); });
            var changed = wx.observeObject(toTrack, false).select(function (i) { return new internal.PropertyChangedEventArgs(toTrack, i.propertyName); });
            var disp = new Rx.CompositeDisposable(changing.where(function (_) { return self.areChangeNotificationsEnabled(); }).subscribe(function (x) { return self.itemChangingSubject.value.onNext(x); }), changed.where(function (_) { return self.areChangeNotificationsEnabled(); }).subscribe(function (x) { return self.itemChangedSubject.value.onNext(x); }));
            this.propertyChangeWatchers[wx.getOid(toTrack)] = new wx.RefCountDisposeWrapper(Rx.Disposable.create(function () {
                disp.dispose();
                delete self.propertyChangeWatchers[wx.getOid(toTrack)];
            }));
        };
        ObservableList.prototype.removeItemFromPropertyTracking = function (toUntrack) {
            var rcd = this.propertyChangeWatchers[wx.getOid(toUntrack)];
            if (rcd) {
                rcd.release();
            }
        };
        ObservableList.prototype.clearAllPropertyChangeWatchers = function () {
            var _this = this;
            Object.keys(this.propertyChangeWatchers).forEach(function (x) {
                _this.propertyChangeWatchers[x].release();
            });
        };
        ObservableList.prototype.refcountSubscribers = function (input, block) {
            return Rx.Observable.create(function (subj) {
                block(1);
                return new Rx.CompositeDisposable(input.subscribe(subj), Rx.Disposable.create(function () { return block(-1); }));
            });
        };
        ObservableList.prototype.publishResetNotification = function () {
            this.resetSubject.onNext(true);
        };
        ObservableList.prototype.publishBeforeResetNotification = function () {
            this.beforeResetSubject.onNext(true);
        };
        ObservableList.prototype.isLengthAboveResetThreshold = function (toChangeLength) {
            return toChangeLength / this.inner.length > this.resetChangeThreshold && toChangeLength > 10;
        };
        return ObservableList;
    })();
    var internal;
    (function (internal) {
        internal.listConstructor = ObservableList;
    })(internal = wx.internal || (wx.internal = {}));
    function list(initialContents, resetChangeThreshold) {
        if (resetChangeThreshold === void 0) { resetChangeThreshold = 0.3; }
        return new ObservableList(initialContents, resetChangeThreshold);
    }
    wx.list = list;
})(wx || (wx = {}));
var wx;
(function (wx) {
    var groupId = 0;
    var templateCache = {};
    var RadioGroupComponent = (function () {
        function RadioGroupComponent(htmlTemplateEngine) {
            var _this = this;
            this.template = function (params) {
                return _this.buildTemplate(params);
            };
            this.viewModel = function (params) {
                var opt = params;
                var groupName = opt.groupName != null ? opt.groupName : wx.formatString("wx-radiogroup-{0}", groupId++);
                return {
                    items: params.items,
                    selectedValue: params.selectedValue,
                    groupName: groupName,
                    hooks: { afterRender: params.afterRender }
                };
            };
            this.htmlTemplateEngine = htmlTemplateEngine;
        }
        RadioGroupComponent.prototype.buildTemplate = function (params) {
            var result;
            var key = undefined;
            var nodes;
            if (!params.noCache) {
                key = (params.itemText != null ? params.itemText : "") + "-" + (params.itemValue != null ? params.itemValue : "") + "-" + (params.itemClass != null ? params.itemClass : "") + "-" + (params.selectedValue != null ? "true" : "false");
                nodes = templateCache[key];
                if (nodes != null) {
                    return nodes;
                }
            }
            result = '<div class="wx-radiogroup" data-bind="foreach: { data: items, hooks: hooks }"><input type="radio" data-bind="{0}">{1}</div>';
            var perItemExtraMarkup = "";
            var bindings = [];
            var attrs = [];
            bindings.push({ key: "value", value: params.itemValue || "$data" });
            attrs.push({ key: 'name', value: "$parent.groupName" });
            if (params.selectedValue) {
                bindings.push({ key: "selectedValue", value: "$parent.@selectedValue" });
            }
            if (params.itemText) {
                perItemExtraMarkup += wx.formatString('<label data-bind="text: {0}, attr: { for: {1} }"></label>', params.itemText, "$parent.groupName + '-' + $index");
                attrs.push({ key: 'id', value: "$parent.groupName + '-' + $index" });
            }
            if (params.itemClass) {
                attrs.push({ key: 'class', value: "'" + params.itemClass + "'" });
            }
            if (attrs.length)
                bindings.push({ key: "attr", value: "{ " + attrs.map(function (x) { return x.key + ": " + x.value; }).join(", ") + " }" });
            var bindingString = bindings.map(function (x) { return x.key + ": " + x.value; }).join(", ");
            result = wx.formatString(result, bindingString, perItemExtraMarkup);
            if (!params.noCache) {
                templateCache[key] = result;
            }
            nodes = this.htmlTemplateEngine.parse(result);
            return nodes;
        };
        return RadioGroupComponent;
    })();
    var internal;
    (function (internal) {
        internal.radioGroupComponentConstructor = RadioGroupComponent;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var templateCache = {};
    var SelectComponent = (function () {
        function SelectComponent(htmlTemplateEngine) {
            var _this = this;
            this.template = function (params) {
                return _this.buildTemplate(params);
            };
            this.viewModel = function (params) {
                var opt = params;
                return {
                    items: params.items,
                    selectedValue: params.selectedValue,
                    hooks: { afterRender: opt.afterRender }
                };
            };
            this.htmlTemplateEngine = htmlTemplateEngine;
        }
        SelectComponent.prototype.buildTemplate = function (params) {
            var result;
            var key = undefined;
            var nodes;
            if (!params.noCache) {
                key = (params.itemText != null ? params.itemText : "") + "-" + (params.itemValue != null ? params.itemValue : "") + "-" + (params.itemClass != null ? params.itemClass : "") + "-" + (params.selectedValue != null ? "true" : "false");
                nodes = templateCache[key];
                if (nodes != null) {
                    return nodes;
                }
            }
            if (params.selectedValue)
                result = '<select class="wx-select" data-bind="foreach: { data: items, hooks: hooks }, selectedValue: @selectedValue"><option data-bind="{0}"></option></select>';
            else
                result = '<select class="wx-select" data-bind="foreach: { data: items, hooks: hooks }"><option data-bind="{0}"></option></select>';
            var bindings = [];
            var attrs = [];
            bindings.push({ key: "value", value: params.itemValue || "$data" });
            bindings.push({ key: 'text', value: params.itemText || "$data" });
            if (params.itemClass) {
                attrs.push({ key: 'class', value: "'" + params.itemClass + "'" });
            }
            if (attrs.length)
                bindings.push({ key: "attr", value: "{ " + attrs.map(function (x) { return x.key + ": " + x.value; }).join(", ") + " }" });
            var bindingString = bindings.map(function (x) { return x.key + ": " + x.value; }).join(", ");
            result = wx.formatString(result, bindingString);
            if (!params.noCache) {
                templateCache[key] = result;
            }
            nodes = this.htmlTemplateEngine.parse(result);
            return nodes;
        };
        return SelectComponent;
    })();
    var internal;
    (function (internal) {
        internal.selectComponentConstructor = SelectComponent;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var IID = (function () {
        function IID() {
        }
        IID.IUnknown = "IUnknown";
        IID.IDisposable = "IDisposable";
        IID.IObservableProperty = "IObservableProperty";
        IID.IReactiveNotifyPropertyChanged = "IReactiveNotifyPropertyChanged";
        IID.IHandleObservableErrors = "IHandleObservableErrors";
        IID.IObservableList = "IObservableList";
        IID.IList = "IList";
        IID.IReactiveNotifyCollectionChanged = "IReactiveNotifyCollectionChanged";
        IID.IReactiveNotifyCollectionItemChanged = "IReactiveNotifyCollectionItemChanged";
        IID.IReactiveDerivedList = "IReactiveDerivedList";
        IID.IMoveInfo = "IMoveInfo";
        IID.IObservedChange = "IObservedChange";
        IID.ICommand = "ICommand";
        IID.IReadOnlyList = "IReadOnlyList";
        return IID;
    })();
    wx.IID = IID;
})(wx || (wx = {}));
var wx;
(function (wx) {
    var Command = (function () {
        function Command(canExecute, executeAsync, scheduler) {
            var _this = this;
            if (scheduler === void 0) { scheduler = null; }
            this.resultsSubject = new Rx.Subject();
            this.isExecutingSubject = new Rx.Subject();
            this.inflightCount = 0;
            this.canExecuteLatest = false;
            this.canExecuteDisp = null;
            this.scheduler = scheduler || wx.app.mainThreadScheduler;
            this.func = executeAsync;
            this.canExecuteObs = canExecute.combineLatest(this.isExecutingSubject.startWith(false), function (ce, ie) { return ce && !ie; }).catch(function (ex) {
                _this.exceptionsSubject.onNext(ex);
                return Rx.Observable.return(false);
            }).do(function (x) {
                _this.canExecuteLatest = x;
            }).publish();
            if (wx.isInUnitTest()) {
                this.canExecuteObs.connect();
            }
            this.exceptionsSubject = new Rx.Subject();
            this.thrownExceptions = this.exceptionsSubject.asObservable();
            this.exceptionsSubject.observeOn(this.scheduler).subscribe(wx.app.defaultExceptionHandler);
        }
        Command.prototype.queryInterface = function (iid) {
            if (iid === wx.IID.IUnknown || iid === wx.IID.ICommand || iid === wx.IID.IHandleObservableErrors || iid === wx.IID.IDisposable)
                return true;
            return false;
        };
        Command.prototype.dispose = function () {
            var disp = this.canExecuteDisp;
            if (disp != null)
                disp.dispose();
        };
        Object.defineProperty(Command.prototype, "canExecuteObservable", {
            get: function () {
                var _this = this;
                var ret = this.canExecuteObs.startWith(this.canExecuteLatest).distinctUntilChanged();
                if (this.canExecuteDisp != null)
                    return ret;
                return Rx.Observable.create(function (subj) {
                    var disp = ret.subscribe(subj);
                    _this.canExecuteDisp = _this.canExecuteObs.connect();
                    return disp;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Command.prototype, "isExecuting", {
            get: function () {
                return this.isExecutingSubject.startWith(this.inflightCount > 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Command.prototype, "results", {
            get: function () {
                return this.resultsSubject.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        Command.prototype.canExecute = function (parameter) {
            if (this.canExecuteDisp == null)
                this.canExecuteDisp = this.canExecuteObs.connect();
            return this.canExecuteLatest;
        };
        Command.prototype.execute = function (parameter) {
            this.executeAsync(parameter).catch(Rx.Observable.empty()).subscribe();
        };
        Command.prototype.executeAsync = function (parameter) {
            var self = this;
            var ret = Rx.Observable.create(function (subj) {
                if (++self.inflightCount === 1) {
                    self.isExecutingSubject.onNext(true);
                }
                var decrement = new Rx.SerialDisposable();
                decrement.setDisposable(Rx.Disposable.create(function () {
                    if (--self.inflightCount === 0) {
                        self.isExecutingSubject.onNext(false);
                    }
                }));
                var disp = self.func(parameter).observeOn(self.scheduler).do(function (_) {
                }, function (e) { return decrement.setDisposable(Rx.Disposable.empty); }, function () { return decrement.setDisposable(Rx.Disposable.empty); }).do(function (x) { return self.resultsSubject.onNext(x); }, function (x) { return self.exceptionsSubject.onNext(x); }).subscribe(subj);
                return new Rx.CompositeDisposable(disp, decrement);
            });
            return ret.publish().refCount();
        };
        return Command;
    })();
    var internal;
    (function (internal) {
        internal.commandConstructor = Command;
    })(internal = wx.internal || (wx.internal = {}));
    function command() {
        var canExecute;
        var execute;
        var scheduler;
        if (Rx.helpers.isFunction(arguments[0])) {
            execute = arguments[0];
            canExecute = arguments[1] || Rx.Observable.return(true);
            scheduler = arguments[2];
            return asyncCommand(canExecute, function (parameter) { return Rx.Observable.create(function (obs) {
                try {
                    execute(parameter);
                    obs.onNext(null);
                    obs.onCompleted();
                }
                catch (e) {
                    obs.onError(e);
                }
                return Rx.Disposable.empty;
            }); }, scheduler);
        }
        canExecute = arguments[0] || Rx.Observable.return(true);
        scheduler = arguments[1];
        return new Command(canExecute, function (x) { return Rx.Observable.return(x); }, scheduler);
    }
    wx.command = command;
    function asyncCommand() {
        var canExecute;
        var executeAsync;
        var scheduler;
        if (Rx.helpers.isFunction(arguments[0])) {
            executeAsync = arguments[0];
            scheduler = arguments[1];
            return new Command(Rx.Observable.return(true), executeAsync, scheduler);
        }
        canExecute = arguments[0];
        executeAsync = arguments[1];
        scheduler = arguments[2];
        return new Command(canExecute, executeAsync, scheduler);
    }
    wx.asyncCommand = asyncCommand;
    function combinedCommand() {
        var args = wx.args2Array(arguments);
        var commands = args.filter(function (x) { return wx.isCommand(x); });
        var canExecute = args.filter(function (x) { return wx.isRxObservable(x); }).pop();
        if (!canExecute)
            canExecute = Rx.Observable.return(true);
        var childrenCanExecute = Rx.Observable.combineLatest(commands.map(function (x) { return x.canExecuteObservable; }), function () {
            var latestCanExecute = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                latestCanExecute[_i - 0] = arguments[_i];
            }
            return latestCanExecute.every(function (x) { return x; });
        });
        var canExecuteSum = Rx.Observable.combineLatest(canExecute.startWith(true), childrenCanExecute, function (parent, child) { return parent && child; });
        var ret = command(canExecuteSum);
        ret.results.subscribe(function (x) { return commands.forEach(function (cmd) {
            cmd.execute(x);
        }); });
        return ret;
    }
    wx.combinedCommand = combinedCommand;
})(wx || (wx = {}));
var wx;
(function (wx) {
    var internal;
    (function (internal) {
        var PropertyChangedEventArgs = (function () {
            function PropertyChangedEventArgs(sender, propertyName) {
                this.propertyName = propertyName;
                this.sender = sender;
            }
            return PropertyChangedEventArgs;
        })();
        internal.PropertyChangedEventArgs = PropertyChangedEventArgs;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
"use strict";
var wx;
(function (wx) {
    var compiler;
    (function (compiler) {
        var stringDouble = '"(?:[^"\\\\]|\\\\.)*"';
        var stringSingle = "'(?:[^'\\\\]|\\\\.)*'";
        var stringRegexp = '/(?:[^/\\\\]|\\\\.)*/\w*';
        var specials = ',"\'{}()/:[\\]';
        var everyThingElse = '[^\\s:,/][^' + specials + ']*[^\\s' + specials + ']';
        var oneNotSpace = '[^\\s]';
        var bindingToken = RegExp(stringDouble + '|' + stringSingle + '|' + stringRegexp + '|' + everyThingElse + '|' + oneNotSpace, 'g');
        var divisionLookBehind = /[\])"'A-Za-z0-9_$]+$/;
        var keywordRegexLookBehind = { 'in': 1, 'return': 1, 'typeof': 1 };
        function parseObjectLiteral(objectLiteralString) {
            var str = wx.trimString(objectLiteralString);
            if (str.charCodeAt(0) === 123)
                str = str.slice(1, -1);
            var result = new Array(), toks = str.match(bindingToken), key, values, depth = 0;
            if (toks) {
                toks.push(',');
                for (var i = 0, tok; tok = toks[i]; ++i) {
                    var c = tok.charCodeAt(0);
                    if (c === 44) {
                        if (depth <= 0) {
                            if (key)
                                result.push(values ? { key: key, value: values.join('') } : { 'unknown': key, value: undefined });
                            key = values = depth = 0;
                            continue;
                        }
                    }
                    else if (c === 58) {
                        if (!values)
                            continue;
                    }
                    else if (c === 47 && i && tok.length > 1) {
                        var match = toks[i - 1].match(divisionLookBehind);
                        if (match && !keywordRegexLookBehind[match[0]]) {
                            str = str.substr(str.indexOf(tok) + 1);
                            toks = str.match(bindingToken);
                            toks.push(',');
                            i = -1;
                            tok = '/';
                        }
                    }
                    else if (c === 40 || c === 123 || c === 91) {
                        ++depth;
                    }
                    else if (c === 41 || c === 125 || c === 93) {
                        --depth;
                    }
                    else if (!key && !values) {
                        key = (c === 34 || c === 39) ? tok.slice(1, -1) : tok;
                        continue;
                    }
                    if (values)
                        values.push(tok);
                    else
                        values = [tok];
                }
            }
            return result;
        }
        compiler.parseObjectLiteral = parseObjectLiteral;
        var hookField = "___runtimeHooks";
        function noop() {
        }
        function extend(dst, obj) {
            var key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    dst[key] = obj[key];
                }
            }
            return dst;
        }
        function isDefined(value) {
            return typeof value !== "undefined";
        }
        function $parseMinErr(module, message, arg1, arg2, arg3, arg4, arg5) {
            var args = arguments;
            message = message.replace(/{(\d)}/g, function (match) {
                return args[2 + parseInt(match[1])];
            });
            throw new SyntaxError(message);
        }
        function lowercase(string) {
            return typeof string === "string" ? string.toLowerCase() : string;
        }
        function ensureSafeMemberName(name, fullExpression) {
            if (name === "constructor") {
                throw $parseMinErr("isecfld", "Referencing \"constructor\" field in WebRx expressions is disallowed! Expression: {0}", fullExpression);
            }
            return name;
        }
        function ensureSafeObject(obj, fullExpression) {
            if (obj) {
                if (obj.constructor === obj) {
                    throw $parseMinErr("isecfn", "Referencing Function in WebRx expressions is disallowed! Expression: {0}", fullExpression);
                }
                else if (obj.document && obj.location && obj.alert && obj.setInterval) {
                    throw $parseMinErr("isecwindow", "Referencing the Window in WebRx expressions is disallowed! Expression: {0}", fullExpression);
                }
                else if (obj.children && (obj.nodeName || (obj.prop && obj.attr && obj.find))) {
                    throw $parseMinErr("isecdom", "Referencing DOM nodes in WebRx expressions is disallowed! Expression: {0}", fullExpression);
                }
            }
            return obj;
        }
        var OPERATORS = {
            'null': function () {
                return null;
            },
            'true': function () {
                return true;
            },
            'false': function () {
                return false;
            },
            undefined: noop,
            '+': function (self, locals, a, b) {
                a = a(self, locals);
                b = b(self, locals);
                if (isDefined(a)) {
                    if (isDefined(b)) {
                        return a + b;
                    }
                    return a;
                }
                return isDefined(b) ? b : undefined;
            },
            '-': function (self, locals, a, b) {
                a = a(self, locals);
                b = b(self, locals);
                return (isDefined(a) ? a : 0) - (isDefined(b) ? b : 0);
            },
            '*': function (self, locals, a, b) {
                return a(self, locals) * b(self, locals);
            },
            '/': function (self, locals, a, b) {
                return a(self, locals) / b(self, locals);
            },
            '%': function (self, locals, a, b) {
                return a(self, locals) % b(self, locals);
            },
            '^': function (self, locals, a, b) {
                return a(self, locals) ^ b(self, locals);
            },
            '=': noop,
            '===': function (self, locals, a, b) {
                return a(self, locals) === b(self, locals);
            },
            '!==': function (self, locals, a, b) {
                return a(self, locals) !== b(self, locals);
            },
            '==': function (self, locals, a, b) {
                return a(self, locals) === b(self, locals);
            },
            '!=': function (self, locals, a, b) {
                return a(self, locals) !== b(self, locals);
            },
            '<': function (self, locals, a, b) {
                return a(self, locals) < b(self, locals);
            },
            '>': function (self, locals, a, b) {
                return a(self, locals) > b(self, locals);
            },
            '<=': function (self, locals, a, b) {
                return a(self, locals) <= b(self, locals);
            },
            '>=': function (self, locals, a, b) {
                return a(self, locals) >= b(self, locals);
            },
            '&&': function (self, locals, a, b) {
                return a(self, locals) && b(self, locals);
            },
            '||': function (self, locals, a, b) {
                return a(self, locals) || b(self, locals);
            },
            '&': function (self, locals, a, b) {
                return a(self, locals) & b(self, locals);
            },
            '|': function (self, locals, a, b) {
                return b(self, locals)(self, locals, a(self, locals));
            },
            '!': function (self, locals, a) {
                return !a(self, locals);
            }
        };
        var ESCAPE = { "n": "\n", "f": "\f", "r": "\r", "t": "\t", "v": "\v", "'": "'", '"': "\"" };
        var Lexer = (function () {
            function Lexer(options) {
                this.options = options;
            }
            Lexer.prototype.lex = function (text) {
                this.text = text;
                this.index = 0;
                this.ch = undefined;
                this.lastCh = ":";
                this.tokens = [];
                var token;
                var json = [];
                while (this.index < this.text.length) {
                    this.ch = this.text.charAt(this.index);
                    if (this.is("\"'")) {
                        this.readString(this.ch);
                    }
                    else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) {
                        this.readNumber();
                    }
                    else if (this.isIdent(this.ch)) {
                        this.readIdent();
                        if (this.was("{,") && json[0] === "{" && (token = this.tokens[this.tokens.length - 1])) {
                            token.json = token.text.indexOf(".") === -1;
                        }
                    }
                    else if (this.is("(){}[].,;:?")) {
                        this.tokens.push({
                            index: this.index,
                            text: this.ch,
                            json: (this.was(":[,") && this.is("{[")) || this.is("}]:,")
                        });
                        if (this.is("{["))
                            json.unshift(this.ch);
                        if (this.is("}]"))
                            json.shift();
                        this.index++;
                    }
                    else if (this.isWhitespace(this.ch)) {
                        this.index++;
                        continue;
                    }
                    else {
                        var ch2 = this.ch + this.peek();
                        var ch3 = ch2 + this.peek(2);
                        var fn = OPERATORS[this.ch];
                        var fn2 = OPERATORS[ch2];
                        var fn3 = OPERATORS[ch3];
                        if (fn3) {
                            this.tokens.push({ index: this.index, text: ch3, fn: fn3 });
                            this.index += 3;
                        }
                        else if (fn2) {
                            this.tokens.push({ index: this.index, text: ch2, fn: fn2 });
                            this.index += 2;
                        }
                        else if (fn) {
                            this.tokens.push({
                                index: this.index,
                                text: this.ch,
                                fn: fn,
                                json: (this.was("[,:") && this.is(" + -"))
                            });
                            this.index += 1;
                        }
                        else {
                            this.throwError("Unexpected next character ", this.index, this.index + 1);
                        }
                    }
                    this.lastCh = this.ch;
                }
                return this.tokens;
            };
            Lexer.prototype.is = function (chars) {
                return chars.indexOf(this.ch) !== -1;
            };
            Lexer.prototype.was = function (chars) {
                return chars.indexOf(this.lastCh) !== -1;
            };
            Lexer.prototype.peek = function (i) {
                var num = i || 1;
                return (this.index + num < this.text.length) ? this.text.charAt(this.index + num) : false;
            };
            Lexer.prototype.isNumber = function (ch) {
                return ("0" <= ch && ch <= "9");
            };
            Lexer.prototype.isWhitespace = function (ch) {
                return (ch === " " || ch === "\r" || ch === "\t" || ch === "\n" || ch === "\v" || ch === "\u00A0");
            };
            Lexer.prototype.isIdent = function (ch) {
                return ("a" <= ch && ch <= "z" || "A" <= ch && ch <= "Z" || "_" === ch || ch === "$" || ch === "@");
            };
            Lexer.prototype.isExpOperator = function (ch) {
                return (ch === "-" || ch === "+" || this.isNumber(ch));
            };
            Lexer.prototype.throwError = function (error, start, end) {
                end = end || this.index;
                var colStr = (isDefined(start) ? "s " + start + "-" + this.index + " [" + this.text.substring(start, end) + "]" : " " + end);
                throw $parseMinErr("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", error, colStr, this.text);
            };
            Lexer.prototype.readNumber = function () {
                var n = "";
                var start = this.index;
                while (this.index < this.text.length) {
                    var ch = lowercase(this.text.charAt(this.index));
                    if (ch === "." || this.isNumber(ch)) {
                        n += ch;
                    }
                    else {
                        var peekCh = this.peek();
                        if (ch === "e" && this.isExpOperator(peekCh)) {
                            n += ch;
                        }
                        else if (this.isExpOperator(ch) && peekCh && this.isNumber(peekCh) && n.charAt(n.length - 1) === "e") {
                            n += ch;
                        }
                        else if (this.isExpOperator(ch) && (!peekCh || !this.isNumber(peekCh)) && n.charAt(n.length - 1) === "e") {
                            this.throwError("Invalid exponent");
                        }
                        else {
                            break;
                        }
                    }
                    this.index++;
                }
                n = 1 * n;
                this.tokens.push({
                    index: start,
                    text: n,
                    json: true,
                    fn: function () {
                        return n;
                    }
                });
            };
            Lexer.prototype.readIdent = function () {
                var parser = this;
                var ident = "";
                var start = this.index;
                var lastDot, peekIndex, methodName, ch;
                while (this.index < this.text.length) {
                    ch = this.text.charAt(this.index);
                    if (ch === "." || this.isIdent(ch) || this.isNumber(ch)) {
                        if (ch === ".")
                            lastDot = this.index;
                        ident += ch;
                    }
                    else {
                        break;
                    }
                    this.index++;
                }
                if (lastDot) {
                    peekIndex = this.index;
                    while (peekIndex < this.text.length) {
                        ch = this.text.charAt(peekIndex);
                        if (ch === "(") {
                            methodName = ident.substr(lastDot - start + 1);
                            ident = ident.substr(0, lastDot - start);
                            this.index = peekIndex;
                            break;
                        }
                        if (this.isWhitespace(ch)) {
                            peekIndex++;
                        }
                        else {
                            break;
                        }
                    }
                }
                var token = {
                    index: start,
                    text: ident
                };
                if (OPERATORS.hasOwnProperty(ident)) {
                    token.fn = OPERATORS[ident];
                    token.json = OPERATORS[ident];
                }
                else {
                    var getter = getterFn(ident, this.options, this.text);
                    token.fn = extend(function (self, locals) {
                        return (getter(self, locals));
                    }, {
                        assign: function (self, value, locals) {
                            return setter(self, ident, value, parser.text, parser.options, locals);
                        }
                    });
                }
                this.tokens.push(token);
                if (methodName) {
                    this.tokens.push({
                        index: lastDot,
                        text: ".",
                        json: false
                    });
                    this.tokens.push({
                        index: lastDot + 1,
                        text: methodName,
                        json: false
                    });
                }
            };
            Lexer.prototype.readString = function (quote) {
                var start = this.index;
                this.index++;
                var value = "";
                var rawString = quote;
                var escape = false;
                while (this.index < this.text.length) {
                    var ch = this.text.charAt(this.index);
                    rawString += ch;
                    if (escape) {
                        if (ch === "u") {
                            var hex = this.text.substring(this.index + 1, this.index + 5);
                            if (!hex.match(/[\da-f]{4}/i))
                                this.throwError("Invalid unicode escape [\\u" + hex + "]");
                            this.index += 4;
                            value += String.fromCharCode(parseInt(hex, 16));
                        }
                        else {
                            var rep = ESCAPE[ch];
                            if (rep) {
                                value += rep;
                            }
                            else {
                                value += ch;
                            }
                        }
                        escape = false;
                    }
                    else if (ch === "\\") {
                        escape = true;
                    }
                    else if (ch === quote) {
                        this.index++;
                        this.tokens.push({
                            index: start,
                            text: rawString,
                            string: value,
                            json: true,
                            fn: function () {
                                return value;
                            }
                        });
                        return;
                    }
                    else {
                        value += ch;
                    }
                    this.index++;
                }
                this.throwError("Unterminated quote", start);
            };
            return Lexer;
        })();
        var Parser = (function () {
            function Parser(lexer, options) {
                this.lexer = lexer;
                this.options = options || { filters: {} };
            }
            Parser.prototype.parse = function (text) {
                this.text = text;
                this.tokens = this.lexer.lex(text);
                var value = this.statements();
                if (this.tokens.length !== 0) {
                    this.throwError("is an unexpected token", this.tokens[0]);
                }
                value.literal = !!value.literal;
                value.constant = !!value.constant;
                return value;
            };
            Parser.prototype.primary = function () {
                var primary;
                if (this.expect("(")) {
                    primary = this.filterChain();
                    this.consume(")");
                }
                else if (this.expect("[")) {
                    primary = this.arrayDeclaration();
                }
                else if (this.expect("{")) {
                    primary = this.object();
                }
                else {
                    var token = this.expect();
                    primary = token.fn;
                    if (!primary) {
                        this.throwError("not a primary expression", token);
                    }
                    if (token.json) {
                        primary.constant = true;
                        primary.literal = true;
                    }
                }
                var next, context;
                while ((next = this.expect("(", "[", "."))) {
                    if (next.text === "(") {
                        primary = this.functionCall(primary, context);
                        context = null;
                    }
                    else if (next.text === "[") {
                        context = primary;
                        primary = this.objectIndex(primary);
                    }
                    else if (next.text === ".") {
                        context = primary;
                        primary = this.fieldAccess(primary);
                    }
                    else {
                        this.throwError("IMPOSSIBLE");
                    }
                }
                return primary;
            };
            Parser.prototype.throwError = function (msg, token) {
                throw $parseMinErr("syntax", "WebRx Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", token.text, msg, (token.index + 1), this.text, this.text.substring(token.index));
            };
            Parser.prototype.peekToken = function () {
                if (this.tokens.length === 0)
                    throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
                return this.tokens[0];
            };
            Parser.prototype.peek = function (e1, e2, e3, e4) {
                if (this.tokens.length > 0) {
                    var token = this.tokens[0];
                    var t = token.text;
                    if (t === e1 || t === e2 || t === e3 || t === e4 || (!e1 && !e2 && !e3 && !e4)) {
                        return token;
                    }
                }
                return false;
            };
            Parser.prototype.expect = function (e1, e2, e3, e4) {
                var token = this.peek(e1, e2, e3, e4);
                if (token) {
                    this.tokens.shift();
                    return token;
                }
                return false;
            };
            Parser.prototype.consume = function (e1) {
                if (!this.expect(e1)) {
                    this.throwError("is unexpected, expecting [" + e1 + "]", this.peek());
                }
            };
            Parser.prototype.unaryFn = function (fn, right) {
                return extend(function (self, locals) {
                    return fn(self, locals, right);
                }, {
                    constant: right.constant
                });
            };
            Parser.prototype.ternaryFn = function (left, middle, right) {
                return extend(function (self, locals) {
                    return left(self, locals) ? middle(self, locals) : right(self, locals);
                }, {
                    constant: left.constant && middle.constant && right.constant
                });
            };
            Parser.prototype.binaryFn = function (left, fn, right) {
                return extend(function (self, locals) {
                    return fn(self, locals, left, right);
                }, {
                    constant: left.constant && right.constant
                });
            };
            Parser.prototype.statements = function () {
                var statements = [];
                while (true) {
                    if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]"))
                        statements.push(this.filterChain());
                    if (!this.expect(";")) {
                        return (statements.length === 1) ? statements[0] : function (self, locals) {
                            var value;
                            for (var i = 0; i < statements.length; i++) {
                                var statement = statements[i];
                                if (statement) {
                                    value = statement(self, locals);
                                }
                            }
                            return value;
                        };
                    }
                }
            };
            Parser.prototype.filterChain = function () {
                var left = this.expression();
                var token;
                while (true) {
                    if ((token = this.expect("|"))) {
                        left = this.binaryFn(left, token.fn, this.filter());
                    }
                    else {
                        return left;
                    }
                }
            };
            Parser.prototype.filter = function () {
                var token = this.expect();
                var fn = this.options.filters[token.text];
                var argsFn = [];
                while (true) {
                    if ((token = this.expect(":"))) {
                        argsFn.push(this.expression());
                    }
                    else {
                        var fnInvoke = function (self, locals, input) {
                            var args = [input];
                            for (var i = 0; i < argsFn.length; i++) {
                                args.push(argsFn[i](self, locals));
                            }
                            return fn.apply(self, args);
                        };
                        return function () {
                            return fnInvoke;
                        };
                    }
                }
            };
            Parser.prototype.expression = function () {
                return this.assignment();
            };
            Parser.prototype.assignment = function () {
                var left = this.ternary();
                var right;
                var token;
                if ((token = this.expect("="))) {
                    if (!left.assign) {
                        this.throwError("implies assignment but [" + this.text.substring(0, token.index) + "] can not be assigned to", token);
                    }
                    right = this.ternary();
                    return function (scope, locals) {
                        return left.assign(scope, right(scope, locals), locals);
                    };
                }
                return left;
            };
            Parser.prototype.ternary = function () {
                var left = this.logicalOR();
                var middle;
                var token;
                if ((token = this.expect("?"))) {
                    middle = this.ternary();
                    if ((token = this.expect(":"))) {
                        return this.ternaryFn(left, middle, this.ternary());
                    }
                    else {
                        this.throwError("expected :", token);
                    }
                }
                return left;
            };
            Parser.prototype.logicalOR = function () {
                var left = this.logicalAND();
                var token;
                while (true) {
                    if ((token = this.expect("||"))) {
                        left = this.binaryFn(left, token.fn, this.logicalAND());
                    }
                    else {
                        return left;
                    }
                }
            };
            Parser.prototype.logicalAND = function () {
                var left = this.equality();
                var token;
                if ((token = this.expect("&&"))) {
                    left = this.binaryFn(left, token.fn, this.logicalAND());
                }
                return left;
            };
            Parser.prototype.equality = function () {
                var left = this.relational();
                var token;
                if ((token = this.expect("==", "!=", "===", "!=="))) {
                    left = this.binaryFn(left, token.fn, this.equality());
                }
                return left;
            };
            Parser.prototype.relational = function () {
                var left = this.additive();
                var token;
                if ((token = this.expect("<", ">", "<=", ">="))) {
                    left = this.binaryFn(left, token.fn, this.relational());
                }
                return left;
            };
            Parser.prototype.additive = function () {
                var left = this.multiplicative();
                var token;
                while ((token = this.expect("+", "-"))) {
                    left = this.binaryFn(left, token.fn, this.multiplicative());
                }
                return left;
            };
            Parser.prototype.multiplicative = function () {
                var left = this.unary();
                var token;
                while ((token = this.expect("*", "/", "%"))) {
                    left = this.binaryFn(left, token.fn, this.unary());
                }
                return left;
            };
            Parser.prototype.unary = function () {
                var token;
                if (this.expect("+")) {
                    return this.primary();
                }
                else if ((token = this.expect("-"))) {
                    return this.binaryFn(ZERO, token.fn, this.unary());
                }
                else if ((token = this.expect("!"))) {
                    return this.unaryFn(token.fn, this.unary());
                }
                else {
                    return this.primary();
                }
            };
            Parser.prototype.fieldAccess = function (object) {
                var parser = this;
                var field = this.expect().text;
                var getter = getterFn(field, this.options, this.text);
                return extend(function (scope, locals, self) {
                    return getter(self || object(scope, locals));
                }, {
                    assign: function (scope, value, locals) {
                        return setter(object(scope, locals), field, value, parser.text, parser.options, locals);
                    }
                });
            };
            Parser.prototype.objectIndex = function (obj) {
                var parser = this;
                var indexFn = this.expression();
                this.consume("]");
                return extend(function (self, locals) {
                    var o = obj(self, locals), i = indexFn(self, locals), v, p;
                    if (!o)
                        return undefined;
                    var hooks = getRuntimeHooks(locals);
                    if (hooks && hooks.readIndexHook)
                        v = hooks.readIndexHook(o, i);
                    else
                        v = o[i];
                    v = ensureSafeObject(v, parser.text);
                    return v;
                }, {
                    assign: function (self, value, locals) {
                        var key = indexFn(self, locals);
                        var safe = ensureSafeObject(obj(self, locals), parser.text);
                        var hooks = getRuntimeHooks(locals);
                        if (hooks && hooks.writeIndexHook)
                            return hooks.writeIndexHook(safe, key, value);
                        return safe[key] = value;
                    }
                });
            };
            Parser.prototype.functionCall = function (fn, contextGetter) {
                if (this.options.disallowFunctionCalls)
                    this.throwError("Function calls are not allowed");
                var argsFn = [];
                if (this.peekToken().text !== ")") {
                    do {
                        argsFn.push(this.expression());
                    } while (this.expect(","));
                }
                this.consume(")");
                var parser = this;
                return function (scope, locals) {
                    var args = [];
                    var context = contextGetter ? contextGetter(scope, locals) : scope;
                    for (var i = 0; i < argsFn.length; i++) {
                        args.push(argsFn[i](scope, locals));
                    }
                    var fnPtr = fn(scope, locals, context) || noop;
                    ensureSafeObject(context, parser.text);
                    ensureSafeObject(fnPtr, parser.text);
                    var v = fnPtr.apply ? fnPtr.apply(context, args) : fnPtr(args[0], args[1], args[2], args[3], args[4]);
                    return ensureSafeObject(v, parser.text);
                };
            };
            Parser.prototype.arrayDeclaration = function () {
                var elementFns = [];
                var allConstant = true;
                if (this.peekToken().text !== "]") {
                    do {
                        if (this.peek("]")) {
                            break;
                        }
                        var elementFn = this.expression();
                        elementFns.push(elementFn);
                        if (!elementFn.constant) {
                            allConstant = false;
                        }
                    } while (this.expect(","));
                }
                this.consume("]");
                return extend(function (self, locals) {
                    var array = [];
                    for (var i = 0; i < elementFns.length; i++) {
                        array.push(elementFns[i](self, locals));
                    }
                    return array;
                }, {
                    literal: true,
                    constant: allConstant
                });
            };
            Parser.prototype.object = function () {
                var keyValues = [];
                var allConstant = true;
                if (this.peekToken().text !== "}") {
                    do {
                        if (this.peek("}")) {
                            break;
                        }
                        var token = this.expect(), key = token.string || token.text;
                        this.consume(":");
                        var value = this.expression();
                        keyValues.push({ key: key, value: value });
                        if (!value.constant) {
                            allConstant = false;
                        }
                    } while (this.expect(","));
                }
                this.consume("}");
                return extend(function (self, locals) {
                    var object = {};
                    for (var i = 0; i < keyValues.length; i++) {
                        var keyValue = keyValues[i];
                        object[keyValue.key] = keyValue.value(self, locals);
                    }
                    return object;
                }, {
                    literal: true,
                    constant: allConstant
                });
            };
            return Parser;
        })();
        function ZERO() {
            return 0;
        }
        ;
        function setter(obj, path, setValue, fullExp, options, locals) {
            var element = path.split("."), key;
            var i;
            var propertyObj;
            var hooks = getRuntimeHooks(locals);
            if (hooks) {
                for (i = 0; element.length > 1; i++) {
                    key = ensureSafeMemberName(element.shift(), fullExp);
                    propertyObj = hooks.readFieldHook ? hooks.readFieldHook(obj, key) : obj[key];
                    if (!propertyObj) {
                        propertyObj = {};
                        if (hooks.writeFieldHook)
                            hooks.writeFieldHook(obj, key, propertyObj);
                        else
                            obj[key] = propertyObj;
                    }
                    obj = propertyObj;
                }
            }
            else {
                for (i = 0; element.length > 1; i++) {
                    key = ensureSafeMemberName(element.shift(), fullExp);
                    propertyObj = obj[key];
                    if (!propertyObj) {
                        propertyObj = {};
                        obj[key] = propertyObj;
                    }
                    obj = propertyObj;
                }
            }
            key = ensureSafeMemberName(element.shift(), fullExp);
            if (hooks && hooks.writeFieldHook)
                hooks.writeFieldHook(obj, key, setValue);
            else
                obj[key] = setValue;
            return setValue;
        }
        var getterFnCache = {};
        function cspSafeGetterFn(key0, key1, key2, key3, key4, fullExp, options) {
            ensureSafeMemberName(key0, fullExp);
            ensureSafeMemberName(key1, fullExp);
            ensureSafeMemberName(key2, fullExp);
            ensureSafeMemberName(key3, fullExp);
            ensureSafeMemberName(key4, fullExp);
            return function (scope, locals) {
                var pathVal = (locals && locals.hasOwnProperty(key0)) ? locals : scope;
                var hooks = getRuntimeHooks(locals);
                if (hooks && hooks.readFieldHook) {
                    if (pathVal == null)
                        return pathVal;
                    pathVal = hooks.readFieldHook(pathVal, key0);
                    if (!key1)
                        return pathVal;
                    if (pathVal == null)
                        return undefined;
                    pathVal = hooks.readFieldHook(pathVal, key1);
                    if (!key2)
                        return pathVal;
                    if (pathVal == null)
                        return undefined;
                    pathVal = hooks.readFieldHook(pathVal, key2);
                    if (!key3)
                        return pathVal;
                    if (pathVal == null)
                        return undefined;
                    pathVal = hooks.readFieldHook(pathVal, key3);
                    if (!key4)
                        return pathVal;
                    if (pathVal == null)
                        return undefined;
                    pathVal = hooks.readFieldHook(pathVal, key4);
                    return pathVal;
                }
                if (pathVal == null)
                    return pathVal;
                pathVal = pathVal[key0];
                if (!key1)
                    return pathVal;
                if (pathVal == null)
                    return undefined;
                pathVal = pathVal[key1];
                if (!key2)
                    return pathVal;
                if (pathVal == null)
                    return undefined;
                pathVal = pathVal[key2];
                if (!key3)
                    return pathVal;
                if (pathVal == null)
                    return undefined;
                pathVal = pathVal[key3];
                if (!key4)
                    return pathVal;
                if (pathVal == null)
                    return undefined;
                pathVal = pathVal[key4];
                return pathVal;
            };
        }
        function simpleGetterFn1(key0, fullExp) {
            ensureSafeMemberName(key0, fullExp);
            return function (scope, locals) {
                if (scope == null)
                    return undefined;
                scope = ((locals && locals.hasOwnProperty(key0)) ? locals : scope);
                var hooks = getRuntimeHooks(locals);
                if (hooks && hooks.readFieldHook)
                    return hooks.readFieldHook(scope, key0);
                return scope[key0];
            };
        }
        function simpleGetterFn2(key0, key1, fullExp) {
            ensureSafeMemberName(key0, fullExp);
            ensureSafeMemberName(key1, fullExp);
            return function (scope, locals) {
                if (scope == null)
                    return undefined;
                var hooks = getRuntimeHooks(locals);
                if (hooks && hooks.readFieldHook) {
                    scope = (locals && locals.hasOwnProperty(key0)) ? locals : scope;
                    scope = hooks.readFieldHook(scope, key0);
                    return scope == null ? undefined : hooks.readFieldHook(scope, key1);
                }
                scope = ((locals && locals.hasOwnProperty(key0)) ? locals : scope)[key0];
                return scope == null ? undefined : scope[key1];
            };
        }
        function getterFn(path, options, fullExp) {
            if (getterFnCache.hasOwnProperty(path)) {
                return getterFnCache[path];
            }
            var pathKeys = path.split("."), pathKeysLength = pathKeys.length, fn;
            if (pathKeysLength === 1) {
                fn = simpleGetterFn1(pathKeys[0], fullExp);
            }
            else if (pathKeysLength === 2) {
                fn = simpleGetterFn2(pathKeys[0], pathKeys[1], fullExp);
            }
            else {
                if (pathKeysLength < 6) {
                    fn = cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4], fullExp, options);
                }
                else {
                    fn = function (scope, locals) {
                        var _locals = {};
                        Object.keys(locals).forEach(function (x) { return _locals[x] = locals[x]; });
                        var i = 0, val;
                        do {
                            val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], fullExp, options)(scope, locals);
                            scope = val;
                            locals = {};
                            Object.keys(_locals).forEach(function (x) { return locals[x] = _locals[x]; });
                        } while (i < pathKeysLength);
                        return val;
                    };
                }
            }
            if (path !== "hasOwnProperty") {
                getterFnCache[path] = fn;
            }
            return fn;
        }
        function getRuntimeHooks(locals) {
            return locals !== undefined ? locals[hookField] : undefined;
        }
        compiler.getRuntimeHooks = getRuntimeHooks;
        function setRuntimeHooks(locals, hooks) {
            locals[hookField] = hooks;
        }
        compiler.setRuntimeHooks = setRuntimeHooks;
        function compileExpression(src, options, cache) {
            if (typeof src !== "string") {
                throw new TypeError("src must be a string, instead saw '" + typeof src + "'");
            }
            var lexer = new Lexer({});
            var parser = new Parser(lexer, options);
            if (!cache) {
                return parser.parse(src);
            }
            var cached = cache[src];
            if (!cached) {
                cached = cache[src] = parser.parse(src);
            }
            return cached;
        }
        compiler.compileExpression = compileExpression;
    })(compiler || (compiler = {}));
    var internal;
    (function (internal) {
        var exports = compiler;
        internal.expressionCompilerConstructor = exports;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
;
var wx;
(function (wx) {
    var rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, rtagName = /<([\w:-]+)/, rhtml = /<|&#?\w+;/, rscriptType = /^$|\/(?:java|ecma)script/i, wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table>", "</table>"],
        td: [3, "<table>", "</table>"],
        _default: [0, "", ""]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    var supportsCreateHTMLDocument = (function () {
        var doc = document.implementation.createHTMLDocument("");
        if (!doc.body) {
            return false;
        }
        doc.body.innerHTML = "<form></form><form></form>";
        return doc.body.childNodes.length === 2;
    })();
    function merge(first, second) {
        var len = +second.length, j = 0, i = first.length;
        for (; j < len; j++) {
            first[i++] = second[j];
        }
        first.length = i;
        return first;
    }
    function buildFragment(elems, context) {
        var elem, tmp, tag, wrap, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
        for (; i < l; i++) {
            elem = elems[i];
            if (elem || elem === 0) {
                if (typeof elem === "object") {
                    merge(nodes, elem.nodeType ? [elem] : elem);
                }
                else if (!rhtml.test(elem)) {
                    nodes.push(context.createTextNode(elem));
                }
                else {
                    tmp = tmp || fragment.appendChild(context.createElement("div"));
                    tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                    wrap = wrapMap[tag] || wrapMap._default;
                    tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
                    j = wrap[0];
                    while (j--) {
                        tmp = tmp.lastChild;
                    }
                    merge(nodes, tmp.childNodes);
                    tmp = fragment.firstChild;
                    tmp.textContent = "";
                }
            }
        }
        fragment.textContent = "";
        i = 0;
        while ((elem = nodes[i++])) {
            if (elem.nodeType !== 1 || elem.tagName.toLowerCase() !== "script" || !rscriptType.test(elem.type || "")) {
                fragment.appendChild(elem);
            }
        }
        return fragment;
    }
    var HtmlTemplateEngine = (function () {
        function HtmlTemplateEngine() {
        }
        HtmlTemplateEngine.prototype.parse = function (data) {
            var context = supportsCreateHTMLDocument ? document.implementation.createHTMLDocument("") : document;
            var parsed = rsingleTag.exec(data);
            if (parsed) {
                return [context.createElement(parsed[1])];
            }
            parsed = buildFragment([data], context);
            var result = merge([], parsed.childNodes);
            return result;
        };
        return HtmlTemplateEngine;
    })();
    var internal;
    (function (internal) {
        internal.htmlTemplateEngineConstructor = HtmlTemplateEngine;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var Lazy = (function () {
        function Lazy(createValue) {
            this.createValue = createValue;
        }
        Object.defineProperty(Lazy.prototype, "value", {
            get: function () {
                if (!this.isValueCreated) {
                    this.createdValue = this.createValue();
                    this.isValueCreated = true;
                }
                return this.createdValue;
            },
            enumerable: true,
            configurable: true
        });
        return Lazy;
    })();
    wx.Lazy = Lazy;
})(wx || (wx = {}));
var wx;
(function (wx) {
    var log;
    (function (_log) {
        function log() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            try {
                console.log.apply(console, arguments);
            }
            catch (e) {
                try {
                    window['opera'].postError.apply(window['opera'], arguments);
                }
                catch (e) {
                    alert(Array.prototype.join.call(arguments, " "));
                }
            }
        }
        function critical(fmt) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (args.length) {
                fmt = wx.formatString.apply(null, [fmt].concat(args));
            }
            log("**** WebRx Critical: " + fmt);
        }
        _log.critical = critical;
        function error(fmt) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (args.length) {
                fmt = wx.formatString.apply(null, [fmt].concat(args));
            }
            log("*** WebRx Error: " + fmt);
        }
        _log.error = error;
        function info(fmt) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (args.length) {
                fmt = wx.formatString.apply(null, [fmt].concat(args));
            }
            log("* WebRx Info: " + fmt);
        }
        _log.info = info;
    })(log = wx.log || (wx.log = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    function property(initialValue) {
        var accessor = function (newVal) {
            if (arguments.length > 0) {
                if (newVal !== accessor.value) {
                    accessor.changingSubject.onNext(newVal);
                    accessor.value = newVal;
                    accessor.changedSubject.onNext(newVal);
                }
            }
            else {
                return accessor.value;
            }
        };
        accessor.queryInterface = function (iid) {
            if (iid === wx.IID.IUnknown || iid === wx.IID.IObservableProperty || iid === wx.IID.IDisposable)
                return true;
            return false;
        };
        accessor.dispose = function () {
        };
        if (initialValue !== undefined)
            accessor.value = initialValue;
        accessor.changedSubject = new Rx.Subject();
        accessor.changed = accessor.changedSubject.publish().refCount();
        accessor.changingSubject = new Rx.Subject();
        accessor.changing = accessor.changingSubject.publish().refCount();
        return accessor;
    }
    wx.property = property;
})(wx || (wx = {}));
var wx;
(function (wx) {
    var RefCountDisposeWrapper = (function () {
        function RefCountDisposeWrapper(inner) {
            this.refCount = 1;
            this.inner = inner;
        }
        RefCountDisposeWrapper.prototype.addRef = function () {
            this.refCount++;
        };
        RefCountDisposeWrapper.prototype.release = function () {
            if (--this.refCount === 0) {
                this.inner.dispose();
                this.inner = null;
            }
            return this.refCount;
        };
        return RefCountDisposeWrapper;
    })();
    wx.RefCountDisposeWrapper = RefCountDisposeWrapper;
})(wx || (wx = {}));
var wx;
(function (wx) {
    var StateRefBinding = (function () {
        function StateRefBinding(domManager, router) {
            this.priority = 5;
            this.domManager = domManager;
            this.router = router;
        }
        StateRefBinding.prototype.applyBinding = function (node, options, ctx, state) {
            var _this = this;
            if (node.nodeType !== 1 || node.tagName.toLowerCase() !== 'a')
                internal.throwError("stateRef-binding only operates on anchor-elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var compiled = this.domManager.compileBindingOptions(options);
            var exp;
            var observables = [];
            var opt = compiled;
            var paramsKeys = [];
            var stateName;
            var stateParams;
            if (typeof compiled === "function") {
                exp = compiled;
                observables.push(this.domManager.expressionToObservable(exp, ctx));
            }
            else {
                observables.push(this.domManager.expressionToObservable(opt.name, ctx));
                if (opt.params) {
                    Object.keys(opt.params).forEach(function (x) {
                        paramsKeys.push(x);
                        observables.push(_this.domManager.expressionToObservable(opt.params[x], ctx));
                    });
                }
            }
            state.cleanup.add(Rx.Observable.combineLatest(observables, function (_) { return wx.args2Array(arguments); }).subscribe(function (latest) {
                stateName = wx.unwrapProperty(latest.shift());
                stateParams = {};
                for (var i = 0; i < paramsKeys.length; i++) {
                    stateParams[paramsKeys[i]] = wx.unwrapProperty(latest[i]);
                }
                el.href = _this.router.uri(stateName, stateParams);
            }));
            state.cleanup.add(Rx.Observable.fromEvent(el, "click").subscribe(function (e) {
                _this.router.go(stateName, stateParams, { location: true });
                e.preventDefault();
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                observables = null;
                compiled = null;
                stateName = null;
                stateParams = null;
                opt = null;
                paramsKeys = null;
            }));
        };
        StateRefBinding.prototype.configure = function (options) {
        };
        return StateRefBinding;
    })();
    var internal;
    (function (internal) {
        internal.stateRefBindingConstructor = StateRefBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var ViewBinding = (function () {
        function ViewBinding(domManager, router) {
            this.priority = 1000;
            this.controlsDescendants = true;
            this.domManager = domManager;
            this.router = router;
        }
        ViewBinding.prototype.applyBinding = function (node, options, ctx, state) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("view-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var compiled = this.domManager.compileBindingOptions(options);
            var viewName = this.domManager.evaluateExpression(compiled, ctx);
            var componentName = null;
            var componentParams;
            var currentComponentName = null;
            var currentComponentParams;
            if (viewName == null || typeof viewName !== "string")
                internal.throwError("views must be named!");
            state.cleanup.add(this.router.current.changed.startWith(this.router.current()).subscribe(function (newState) {
                if (newState.views != null) {
                    var component = newState.views[viewName];
                    if (component != null) {
                        if (typeof component === "object") {
                            componentName = component.component;
                            componentParams = component.params;
                        }
                        else {
                            componentName = component;
                            componentParams = {};
                        }
                        if (newState.params != null)
                            componentParams = wx.extend(newState.params, wx.extend(componentParams, {}));
                        if (componentName !== currentComponentName || !wx.isEqual(componentParams, currentComponentParams)) {
                            _this.applyTemplate(componentName, componentParams, el, ctx);
                            currentComponentName = componentName;
                            currentComponentParams = componentParams;
                        }
                    }
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                self = null;
            }));
        };
        ViewBinding.prototype.configure = function (options) {
        };
        ViewBinding.prototype.applyTemplate = function (componentName, componentParams, el, ctx) {
            while (el.firstChild) {
                this.domManager.cleanNode(el.firstChild);
                el.removeChild(el.firstChild);
            }
            ctx.$componentParams = componentParams;
            var container = document.createElement("div");
            var binding = wx.formatString("component: { name: '{0}', params: $componentParams }", componentName);
            container.setAttribute("data-bind", binding);
            el.appendChild(container);
            this.domManager.applyBindingsToDescendants(ctx, el);
        };
        return ViewBinding;
    })();
    var internal;
    (function (internal) {
        internal.viewBindingConstructor = ViewBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var reEscape = /[\-\[\]{}()+?.,\\\^$|#\s]/g;
    var reParam = /([:*])(\w+)/g;
    var RouteMatcher = (function () {
        function RouteMatcher(route, rules) {
            var _this = this;
            this.route = route;
            this.rules = rules;
            var names = [];
            var re = route;
            if (typeof route === "string") {
                re = re.replace(reEscape, "\\$&");
                re = re.replace(reParam, function (_, mode, name) {
                    names.push(name);
                    return mode === ":" ? "([^/]*)" : "(.*)";
                });
                re = new RegExp("^" + re + "$");
                this.parse = function (url) {
                    var i = 0;
                    var param, value;
                    var params = {};
                    var matches = url.match(re);
                    if (!matches) {
                        return null;
                    }
                    while (i < names.length) {
                        param = names[i++];
                        value = matches[i];
                        if (rules && param in rules && !_this.validateRule(rules[param], value)) {
                            return null;
                        }
                        params[param] = value;
                    }
                    return params;
                };
                this.stringify = function (params) {
                    params = params || {};
                    var param, re;
                    var result = route;
                    for (param in params) {
                        re = new RegExp("[:*]" + param + "\\b");
                        result = result.replace(re, params[param]);
                    }
                    return result.replace(reParam, "");
                };
            }
            else {
                this.parse = function (url) {
                    var matches = url.match(re);
                    return matches && { captures: matches.slice(1) };
                };
                this.stringify = function () { return ""; };
            }
        }
        RouteMatcher.prototype.stripTrailingSlash = function (route) {
            if (route.length === 0 || route === "/" || route.lastIndexOf("/") !== route.length - 1)
                return route;
            return route.substr(0, route.length - 1);
        };
        Object.defineProperty(RouteMatcher.prototype, "isAbsolute", {
            get: function () {
                return this.route.indexOf("/") === 0;
            },
            enumerable: true,
            configurable: true
        });
        RouteMatcher.prototype.concat = function (route) {
            var other = route;
            var a = this.stripTrailingSlash(this.route);
            var b = this.stripTrailingSlash(other.route);
            var rules = null;
            if (other.rules) {
                if (this.rules) {
                    Object.keys(this.rules).forEach(function (rule) {
                        if (other.rules.hasOwnProperty(rule)) {
                            wx.internal.throwError("route '{0}' and '{1}' have conflicting rule '{2}", a, b, rule);
                        }
                    });
                    rules = wx.extend(this.rules, wx.extend(other.rules, {}));
                }
                else {
                    rules = wx.extend(other.rules, {});
                }
            }
            else if (this.rules) {
                rules = wx.extend(this.rules, {});
            }
            if (a === "/")
                a = "";
            return wx.route(a + "/" + b, rules);
        };
        RouteMatcher.prototype.validateRule = function (rule, value) {
            var type = this.toString.call(rule).charAt(8);
            return type === "R" ? rule.test(value) : type === "F" ? rule(value) : rule == value;
        };
        return RouteMatcher;
    })();
    function route(route, rules) {
        return new RouteMatcher(route, rules);
    }
    wx.route = route;
})(wx || (wx = {}));
var wx;
(function (wx) {
    var Router = (function () {
        function Router(domManager) {
            var _this = this;
            this.current = wx.property();
            this.states = {};
            this.pathSeparator = ".";
            this.parentPathDirective = "^";
            this.rootStateName = "$";
            this.validPathRegExp = /^[a-zA-Z]([\w-_]*$)/;
            this.domManager = domManager;
            this.reset();
            wx.app.history.onPopState.subscribe(function (e) {
                var stateName = e.state;
                if (stateName) {
                    var uri = wx.app.history.location.pathname + wx.app.history.location.search;
                    var route = _this.getAbsoluteRouteForState(stateName);
                    var params = route.parse(uri);
                    _this.go(stateName, params, { location: false });
                }
            });
        }
        Router.prototype.state = function (config) {
            this.registerStateInternal(config);
            return this;
        };
        Router.prototype.go = function (to, params, options) {
            to = this.mapPath(to);
            if (this.states[to] == null)
                internal.throwError("state '{0}' is not registered", to);
            this.activateState(to, params, options);
        };
        Router.prototype.get = function (state) {
            return this.states[state];
        };
        Router.prototype.uri = function (state, params) {
            state = this.mapPath(state);
            var route = this.getAbsoluteRouteForState(state);
            if (route != null)
                return route.stringify(params);
            return null;
        };
        Router.prototype.reset = function () {
            this.states = {};
            this.root = this.registerStateInternal({
                name: this.rootStateName,
                route: wx.route("/")
            });
            this.go(this.rootStateName);
        };
        Router.prototype.reload = function () {
            this.go(this.current().name, this.current().params, { force: true, location: false });
        };
        Router.prototype.registerStateInternal = function (state) {
            var _this = this;
            var parts = state.name.split(this.pathSeparator);
            if (state.name !== this.rootStateName) {
                if (parts.forEach(function (path) {
                    if (!_this.validPathRegExp.test(path)) {
                        internal.throwError("invalid state-path '{0}' (a state-path must start with a character, optionally followed by one or more alphanumeric characters, dashes or underscores)");
                    }
                }))
                    ;
            }
            state = wx.extend(state, {});
            this.states[state.name] = state;
            if (state.route != null) {
                if (typeof state.route === "string") {
                    state.route = wx.route(state.route);
                }
            }
            else {
                state.route = wx.route(parts[parts.length - 1]);
            }
            if (state.name === this.rootStateName)
                this.root = state;
            return state;
        };
        Router.prototype.mapPath = function (path) {
            if (path.indexOf(this.pathSeparator) === 0) {
                return this.current().name + path;
            }
            else if (path.indexOf(this.parentPathDirective) === 0) {
                var parent = this.current().name;
                if (parent === this.rootStateName)
                    return parent;
                var parts = parent.split(this.pathSeparator);
                for (var i = parts.length - 1; i > 0; i--) {
                    var tmp = parts.slice(0, i).join(this.pathSeparator);
                    if (this.get(tmp) || this.get(tmp + path.substr(1))) {
                        path = tmp + path.substr(1);
                        return path;
                    }
                }
                path = this.rootStateName + path.substr(1);
                return path;
            }
            return path;
        };
        Router.prototype.getStateHierarchy = function (name) {
            var parts = name.split(this.pathSeparator);
            var stateName = "";
            var result = [];
            var state;
            if (name !== this.rootStateName)
                result.push(this.root);
            for (var i = 0; i < parts.length; i++) {
                if (i > 0)
                    stateName += this.pathSeparator + parts[i];
                else
                    stateName = parts[i];
                state = this.states[stateName];
                if (state == null) {
                    state = {
                        name: stateName,
                        route: wx.route(stateName)
                    };
                }
                result.push(state);
            }
            return result;
        };
        Router.prototype.getAbsoluteRouteForState = function (name, hierarchy) {
            hierarchy = hierarchy != null ? hierarchy : this.getStateHierarchy(name);
            var result = null;
            hierarchy.forEach(function (state) {
                if (result != null) {
                    var route = state.route;
                    if (!route.isAbsolute)
                        result = result.concat(state.route);
                    else
                        result = route;
                }
                else {
                    result = state.route;
                }
            });
            return result;
        };
        Router.prototype.activateState = function (to, params, options) {
            var hierarchy = this.getStateHierarchy(to);
            var stateViews = {};
            var stateParams = {};
            hierarchy.forEach(function (state) {
                if (state.views != null) {
                    wx.extend(state.views, stateViews);
                }
                if (state.params != null) {
                    wx.extend(state.params, stateParams);
                }
            });
            if (params) {
                wx.extend(params, stateParams);
            }
            var route = this.getAbsoluteRouteForState(to, hierarchy);
            var state = wx.extend(this.states[to], {});
            state.uri = route.stringify(params);
            state.views = stateViews;
            state.params = stateParams;
            var _current = this.current();
            if ((options && options.force) || _current == null || _current.name !== to || !wx.isEqual(_current.params, state.params)) {
                if (options && options.location) {
                    if (options.location === 2 /* replace */)
                        wx.app.history.replaceState(state.name, "", state.uri);
                    else
                        wx.app.history.pushState(state.name, "", state.uri);
                }
                if (_current != null) {
                    if (_current.onLeave)
                        _current.onLeave(this.get(_current.name), _current.params);
                }
                this.current(state);
                if (state.onEnter)
                    state.onEnter(this.get(state.name), params);
            }
        };
        return Router;
    })();
    var internal;
    (function (internal) {
        internal.routerConstructor = Router;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    wx.injector.register(wx.res.expressionCompiler, wx.internal.expressionCompilerConstructor);
    wx.injector.register(wx.res.htmlTemplateEngine, true, true, [wx.internal.htmlTemplateEngineConstructor]);
    wx.injector.register(wx.res.domManager, true, true, [wx.res.expressionCompiler, wx.internal.domManagerConstructor]);
    wx.injector.register(wx.res.router, true, true, [wx.res.domManager, wx.internal.routerConstructor]);
    wx.injector.register("wx.bindings.module", true, true, [wx.res.domManager, wx.internal.moduleBindingConstructor]);
    wx.injector.register("wx.bindings.command", true, true, [wx.res.domManager, wx.internal.commandBindingConstructor]);
    wx.injector.register("wx.bindings.if", true, true, [wx.res.domManager, wx.internal.ifBindingConstructor]);
    wx.injector.register("wx.bindings.with", true, true, [wx.res.domManager, wx.internal.withBindingConstructor]);
    wx.injector.register("wx.bindings.notif", true, true, [wx.res.domManager, wx.internal.notifBindingConstructor]);
    wx.injector.register("wx.bindings.css", true, true, [wx.res.domManager, wx.internal.cssBindingConstructor]);
    wx.injector.register("wx.bindings.attr", true, true, [wx.res.domManager, wx.internal.attrBindingConstructor]);
    wx.injector.register("wx.bindings.style", true, true, [wx.res.domManager, wx.internal.styleBindingConstructor]);
    wx.injector.register("wx.bindings.text", true, true, [wx.res.domManager, wx.internal.textBindingConstructor]);
    wx.injector.register("wx.bindings.html", true, true, [wx.res.domManager, wx.internal.htmlBindingConstructor]);
    wx.injector.register("wx.bindings.visible", true, true, [wx.res.domManager, wx.internal.visibleBindingConstructor]);
    wx.injector.register("wx.bindings.hidden", true, true, [wx.res.domManager, wx.internal.hiddenBindingConstructor]);
    wx.injector.register("wx.bindings.enabled", true, true, [wx.res.domManager, wx.internal.enableBindingConstructor]);
    wx.injector.register("wx.bindings.disabled", true, true, [wx.res.domManager, wx.internal.disableBindingConstructor]);
    wx.injector.register("wx.bindings.foreach", true, true, [wx.res.domManager, wx.internal.forEachBindingConstructor]);
    wx.injector.register("wx.bindings.event", true, true, [wx.res.domManager, wx.internal.eventBindingConstructor]);
    wx.injector.register("wx.bindings.textInput", true, true, [wx.res.domManager, wx.internal.textInputBindingConstructor]);
    wx.injector.register("wx.bindings.checked", true, true, [wx.res.domManager, wx.internal.checkedBindingConstructor]);
    wx.injector.register("wx.bindings.selectedValue", true, true, [wx.res.domManager, wx.internal.selectedValueBindingConstructor]);
    wx.injector.register("wx.bindings.component", true, true, [wx.res.domManager, wx.internal.componentBindingConstructor]);
    wx.injector.register("wx.bindings.value", true, true, [wx.res.domManager, wx.internal.valueBindingConstructor]);
    wx.injector.register("wx.bindings.hasFocus", true, true, [wx.res.domManager, wx.internal.hasFocusBindingConstructor]);
    wx.injector.register("wx.bindings.view", true, true, [wx.res.domManager, wx.res.router, wx.internal.viewBindingConstructor]);
    wx.injector.register("wx.bindings.sref", true, true, [wx.res.domManager, wx.res.router, wx.internal.stateRefBindingConstructor]);
    wx.injector.register("wx.components.radiogroup", false, true, [wx.res.htmlTemplateEngine, wx.internal.radioGroupComponentConstructor]);
    wx.injector.register("wx.components.select", false, true, [wx.res.htmlTemplateEngine, wx.internal.selectComponentConstructor]);
    wx.app.registerBinding("module", "wx.bindings.module");
    wx.app.registerBinding("css", "wx.bindings.css");
    wx.app.registerBinding("attr", "wx.bindings.attr");
    wx.app.registerBinding("style", "wx.bindings.style");
    wx.app.registerBinding("command", "wx.bindings.command");
    wx.app.registerBinding("if", "wx.bindings.if");
    wx.app.registerBinding("with", "wx.bindings.with");
    wx.app.registerBinding("ifnot", "wx.bindings.notif");
    wx.app.registerBinding("text", "wx.bindings.text");
    wx.app.registerBinding("html", "wx.bindings.html");
    wx.app.registerBinding("visible", "wx.bindings.visible");
    wx.app.registerBinding("hidden", "wx.bindings.hidden");
    wx.app.registerBinding("disabled", "wx.bindings.disabled");
    wx.app.registerBinding("enabled", "wx.bindings.enabled");
    wx.app.registerBinding("foreach", "wx.bindings.foreach");
    wx.app.registerBinding("event", "wx.bindings.event");
    wx.app.registerBinding(["textInput", "textinput"], "wx.bindings.textInput");
    wx.app.registerBinding("checked", "wx.bindings.checked");
    wx.app.registerBinding("selectedValue", "wx.bindings.selectedValue");
    wx.app.registerBinding("component", "wx.bindings.component");
    wx.app.registerBinding("value", "wx.bindings.value");
    wx.app.registerBinding(["hasFocus", "hasfocus"], "wx.bindings.hasFocus");
    wx.app.registerBinding("view", "wx.bindings.view");
    wx.app.registerBinding("sref", "wx.bindings.sref");
    wx.app.registerComponent("wx-radiogroup", "wx.components.radiogroup");
    wx.app.registerComponent("wx-select", "wx.components.select");
})(wx || (wx = {}));
var wx;
(function (wx) {
    var RxObsConstructor = Rx.Observable;
    RxObsConstructor.prototype.toProperty = function (initialValue) {
        var accessor = function (newVal) {
            if (arguments.length > 0) {
                wx.internal.throwError("attempt to write to a read-only observable property");
            }
            return accessor.value;
        };
        accessor.queryInterface = function (iid) {
            if (iid === wx.IID.IUnknown || iid === wx.IID.IObservableProperty || iid === wx.IID.IDisposable)
                return true;
            return false;
        };
        accessor.dispose = function () {
            if (accessor.sub) {
                accessor.sub.dispose();
                accessor.sub = null;
            }
        };
        accessor.value = initialValue;
        accessor.changedSubject = new Rx.Subject();
        accessor.changed = accessor.changedSubject.publish().refCount();
        accessor.changingSubject = new Rx.Subject();
        accessor.changing = accessor.changingSubject.publish().refCount();
        accessor.source = this;
        var firedInitial = false;
        accessor.thrownExceptions = Rx.Subject.create(wx.app.defaultExceptionHandler);
        accessor.sub = this.distinctUntilChanged().subscribe(function (x) {
            if (firedInitial && x === accessor.value) {
                return;
            }
            firedInitial = true;
            accessor.changingSubject.onNext(x);
            accessor.value = x;
            accessor.changedSubject.onNext(x);
        }, accessor.thrownExceptions.onNext);
        return accessor;
    };
})(wx || (wx = {}));
var wx;
(function (wx) {
    wx.version = "0.9";
})(wx || (wx = {}));
//# sourceMappingURL=web.rx.js.map