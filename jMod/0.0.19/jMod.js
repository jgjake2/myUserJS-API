// ==UserScript==
// @name             jMod
// @namespace        http://myuserjs.org/
// @author           jgjake2
// @homepage         http://myuserjs.org/
// @license          GNU GPL version 3; http://www.gnu.org/licenses/gpl-3.0.txt
// @exclude          *
// @version          0.0.19
// @grant            unsafeWindow
// @grant            GM_info
// @grant            GM_log
// @grant            GM_addStyle
// @grant            GM_getMetadata
// @grant            GM_installScript
// @grant            GM_xmlhttpRequest
// @grant            GM_getResourceURL
// @grant            GM_getResourceText
// @grant            GM_registerMenuCommand
// @grant            GM_getValue
// @grant            GM_setValue
// @grant            GM_listValues
// @grant            GM_deleteValue
// @unwrap
// @run-at           document-start
// ==/UserScript==
+function($, unsafeWindow, window, factory) {
    var jMod = factory.call(this, window && "undefined" !== typeof window.performance ? window.performance.now() : 0, $, console, window, unsafeWindow, "undefined", void 0);
    var addToGlobalScope = jMod.Config.addToGlobalScope;
    if (this.jMod) {
        this._jMod = this.jMod;
        if (addToGlobalScope && unsafeWindow && unsafeWindow.jMod && unsafeWindow !== this) unsafeWindow._jMod = unsafeWindow.jMod;
    }
    this.jMod = jMod;
    if (addToGlobalScope) try {
        if (unsafeWindow !== this) unsafeWindow.jMod = jMod;
    } catch (e) {
        try {
            if (window !== this) window.jMod = jMod;
        } catch (x) {
            console.log("cannot add jMod to global scope", x);
        }
    }
    if (jMod.debug) jMod.log.groupEnd("jMod Initialize");
}.call(this, "undefined" !== typeof jQuery ? jQuery : void 0, "undefined" !== typeof unsafeWindow && unsafeWindow.top && "window" === Object.prototype.toString.call(unsafeWindow).replace(/^\[object |\]$/g, "").toLowerCase() ? unsafeWindow : "undefined" !== typeof window && window.top && "window" === Object.prototype.toString.call(window).replace(/^\[object |\]$/g, "").toLowerCase() ? window : this, window, function(initStart, $, console, window, unsafeWindow, _undefined, undefined) {
    function jMod() {
        return jMod._call.apply(jMod, arguments);
    }
    jMod.InitializeStartTime = initStart;
    jMod.InitializeEndTime = -1;
    const fontBaseURL = "http://code.jmod.info/fonts";
    var Slice = Array.prototype.slice, _jQueryAvailable = _undefined != typeof $ ? true : false, jModReady = -1, _css = "@import url(//fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700);\n" + "@import url(http://code.jmod.info/fonts/sansation.css);\n", defaultjModCSSURL = false ? "@import url(//test2.myuserjs.org/API/0.0.19/jMod.css);\n" : "@import url(http://code.jmod.info/0.0.19/jMod.css);\n", CurrentRunningScript = {
        id: "jMod",
        config: {},
        el: undefined
    }, API = jMod.API = {
        addGlyphicons: function() {
            _css = "@import url(http://code.jmod.info/css/glyphicons.css);\n" + _css;
            jMod.CSS = "";
        }
    };
    try {
        CurrentRunningScript.el = unsafeWindow.document && unsafeWindow.document.currentScript ? unsafeWindow.document.currentScript : undefined;
    } catch (e) {}
    var DefineLockedProp = function(name, value, target, en) {
        var opts = {
            configurable: false,
            enumerable: false === en ? en : true
        };
        if ("function" === typeof value) opts.get = value; else {
            opts.value = value;
            opts.writable = false;
        }
        Object.defineProperty(target || jMod, name, opts);
    };
    DefineLockedProp("ScriptElement", function() {
        return CurrentRunningScript.el ? CurrentRunningScript : undefined;
    });
    DefineLockedProp("version", "0.0.19");
    DefineLockedProp("build_time", "1424180974000");
    DefineLockedProp("build_type", "release");
    DefineLockedProp("_debug", false);
    Object.defineProperty(jMod, "debug", {
        get: function() {
            try {
                return _undefined != typeof jMod.Config.debug ? jMod.Config.debug : jMod._debug;
            } catch (e) {
                return jMod._debug;
            }
        },
        set: function(val) {
            jMod.Config.debug = true === val ? true : false;
        },
        enumerable: false
    });
    Object.defineProperty(jMod, "jQueryAvailable", {
        get: function() {
            if (_jQueryAvailable || _undefined != typeof $) return _jQueryAvailable = true;
            if (_undefined != typeof jQuery) return $ = jQuery, _jQueryAvailable = true;
            if (_undefined != typeof unsafeWindow.jQuery) return $ = unsafeWindow.jQuery, _jQueryAvailable = true;
            return false;
        },
        set: function(val) {
            _jQueryAvailable = val ? true : false;
            try {
                if ("jQuery" == RealTypeOf(val)) $ = val;
            } catch (e) {}
        },
        enumerable: false
    });
    DefineLockedProp("jQuery", function() {
        return jMod.jQueryAvailable ? $ : undefined;
    });
    var performance = new function() {
        var _performance;
        var getPerformance = function() {
            if (_performance === undefined) _performance = typeof unsafeWindow.performance !== _undefined && typeof unsafeWindow.performance.timing !== _undefined ? unsafeWindow.performance : undefined;
            return _performance;
        };
        this.__defineGetter__("performanceObject", function() {
            return getPerformance();
        });
        this.__defineGetter__("available", function() {
            return this.performanceObject === undefined ? false : true;
        });
        this.__defineGetter__("now", function() {
            try {
                return this.performanceObject.now();
            } catch (e) {
                jMod.Warning("Performance not available!");
            }
        });
        this.get = function(str) {
            var i = 0, names = str.split("."), p = this.performanceObject;
            if (p === undefined) return;
            for (i; i < names.length; i++) {
                if (typeof p[names[i]] === _undefined) return;
                p = p[names[i]];
            }
            return p;
        };
        this.getAllTiming = function(ignore) {
            if (ignore === undefined) ignore = [];
            var timingData = [];
            var p = this.performanceObject;
            for (var key in p.timing) if (!isNaN(p.timing[key]) && ignore.indexOf(key) == -1) timingData[key] = p.timing[key];
            return timingData;
        };
        this.pageLoadTime = function() {
            try {
                var t = this.performanceObject.timing;
                if (isNaN(t.loadEventEnd)) return;
                return t.loadEventEnd - t.navigationStart;
            } catch (e) {}
        };
    }();
    Object.defineProperty(jMod, "timeElapsed", {
        get: function() {
            return performance.now - jMod.InitializeStartTime;
        }
    });
    var Loading = jMod.Loading = {
        headAvailable: false,
        DOMLoaded: false,
        CSSAdded: false,
        performanceReady: false,
        documentComplete: false,
        jModReady: false,
        Complete: false
    };
    Object.defineProperty(jMod, "CSS", {
        get: function() {
            return _css;
        },
        set: function(str) {
            _css += str;
            if (Loading.CSSAdded) jMod.AddCSS();
        },
        enumerable: false
    });
    jMod.AddCSS = function(input) {
        addStyle(_css + (input || ""));
        _css = "";
    };
    function getFirstValidKey(obj, arr, filter) {
        var hasFilter = "function" === typeof filter ? true : false;
        var args = arr;
        if ("object" !== typeof arr) {
            args = Slice.call(arguments, 1);
            hasFilter = false;
        }
        for (var i = 0; i < args.length; i++) if (typeof obj[args[i]] !== _undefined) if (!hasFilter || hasFilter && filter(args[i], obj[args[i]])) return args[i];
        return undefined;
    }
    function getFirstValidKeyValue(obj, arr, filter) {
        var key = getFirstValidKey.apply(this, arguments);
        if (typeof key !== _undefined) return obj[key];
        return undefined;
    }
    function Object_SearchForKey(str) {
        var i = 0, tmp = this, names = str.split(".");
        for (i; i < names.length; i++) {
            if (typeof tmp[names[i]] === _undefined) return undefined;
            tmp = tmp[names[i]];
        }
        return tmp;
    }
    function Object_SearchForKeyCaseInsensitive(str) {
        var x, i = 0, tmp = this, names = str.split(".");
        if (0 == names.length) return undefined;
        for (i; i < names.length; i++) if ((x = Object.keys(tmp).join("|").toLowerCase().split("|").indexOf(names[i].toLowerCase())) != -1) tmp = tmp[Object.keys(tmp)[x]]; else return undefined;
        return tmp;
    }
    function Object_setKeyValueCaseInsensitive(str, val) {
        var parent, x, i = 0, names = str.split("."), tmp = this;
        if (0 == names.length) return undefined;
        for (i; i < names.length; i++) if ((x = Object.keys(tmp).join("|").toLowerCase().split("|").indexOf(names[i].toLowerCase())) != -1) {
            parent = tmp;
            names[i] = Object.keys(tmp)[x];
            tmp = tmp[Object.keys(tmp)[x]];
        } else return undefined;
        parent[names[names.length - 1]] = val;
        return names;
    }
    function Object_SearchForKeys(arr) {
        var tmp, i = 0, args = "string" === typeof arr ? Slice.call(arguments) : arr;
        for (i; i < args.length; i++) if ((tmp = Object_SearchForKey.apply(this, [ args[i] ])) !== undefined) return tmp;
        return undefined;
    }
    function Object_setKeyValue(str, val, force) {
        var index = 0, names = str.split("."), tmp = this;
        for (index; index < names.length - 1; index++) {
            if (typeof tmp[names[index]] === _undefined) if (force) tmp[names[index]] = {}; else return;
            tmp = tmp[names[index]];
        }
        tmp[names[names.length - 1]] = val;
    }
    var props = {
        SearchForKey: {
            value: Object_SearchForKey,
            enumerable: false
        },
        SearchForKeys: {
            value: Object_SearchForKeys,
            enumerable: false
        },
        setKeyValue: {
            value: Object_setKeyValue,
            enumerable: false
        },
        SearchForKeyI: {
            value: Object_SearchForKeyCaseInsensitive,
            enumerable: false
        },
        setKeyValueI: {
            value: Object_setKeyValueCaseInsensitive,
            enumerable: false
        }
    };
    function mCloneInto(obj, scope, args, debug, depth) {
        if (typeof cloneInto !== _undefined) {
            depth = depth || 0;
            try {
                return cloneInto(obj, scope, args);
            } catch (e) {
                if (debug) console.log("mCloneInto error", e);
            }
            var i, x, objType, keys = [], tmp;
            objType = typeof obj;
            try {
                if ("object" == objType) if (obj.constructor === new Array().constructor) objType = "array"; else if (null === obj) objTypr = "null";
            } catch (e) {}
            if ("undefined" == objType || "null" == objType) return obj; else if ("array" == objType) tmp = cloneInto([], scope, args); else tmp = cloneInto({}, scope, args);
            var objFn = function(i) {
                var type = typeof obj[i], r;
                if ("string" == type || "number" == type || "boolean" == type) r = obj[i]; else if (obj[i] instanceof Error) {
                    var errRef = "Error", scopeRef = scope.Error && "function" === typeof scope.Error ? scope : unsafeWindow;
                    if (!scopeRef) return;
                    if ("Error" != obj[i].name && "function" == typeof scopeRef[obj[i].name]) errRef = obj[i].name;
                    r = new scopeRef[errRef](obj[i].message || null, obj[i].fileName || null, obj[i].lineNumber || null);
                    r.name = obj[i].name;
                    r.stack = obj[i].stack;
                    r.message = obj[i].message;
                    r.fileName = obj[i].fileName;
                    r.lineNumber = obj[i].lineNumber;
                    r.columnNumber = obj[i].columnNumber;
                    delete r.toString;
                    r.toString = function() {
                        return this.name + ": " + this.message;
                    }.bind(r);
                } else if ("object" == type) if (depth < 3) try {
                    r = mCloneInto(obj[i], scope, args, debug, depth + 1);
                } catch (e) {
                    try {
                        r = cloneInto(obj[i], scope, args);
                    } catch (e2) {}
                } else try {
                    r = cloneInto(obj[i], scope, args);
                } catch (e) {} else if ("function" == type && args.cloneFunctions) try {
                    r = cloneInto(obj[i], scope, args);
                } catch (e) {}
                return r;
            };
            if ("array" == objType) for (x = 0; x < obj.length; x++) {
                var tmpValue;
                try {
                    tmpValue = objFn(x);
                } catch (e) {}
                try {
                    tmp.push(tmpValue);
                } catch (e) {
                    tmp.push(undefined);
                }
            } else for (x in obj) if ("constructor" != x && Object.prototype.hasOwnProperty.call(obj, x)) {
                var tmpValue;
                try {
                    tmpValue = objFn(x);
                } catch (e) {}
                tmp[x] = objFn(x);
            }
            return tmp;
            try {
                return cloneInto(tmp, scope, args);
            } catch (e) {}
            return tmp;
        } else ;
        return obj;
    }
    function mExportFunction(func, scope, args) {
        if (_undefined != typeof exportFunction) try {
            return exportFunction(func, scope, args);
        } catch (e) {}
        var name = "";
        if (args && args.defineAs) name = args.defineAs; else if ("function" === typeof func && "" != func.name) name = func.name;
        if ("" != name) try {
            return scope[name] = func;
        } catch (e) {}
    }
    jMod.parseStack = function(stackText) {
        var o = [];
        var stackPatt = /(([^\s]*)\@file\:\/\/\/([^\s]+?(?:\/([^\/]+?\.(user\.js|js|json|php|htm|html|asp)))?):(\d+)(?:\:(\d+))?)/gi;
        var match;
        while (null != (match = stackPatt.exec(stackText))) {
            var tmp = {
                line: match[1],
                functionName: match[2],
                fullFileName: match[3],
                fileName: match[4],
                fileExt: match[5],
                lineNumber: match[6],
                columnNumber: match[7]
            };
            o.push(tmp);
        }
        return o;
    };
    var isElement = function(obj) {
        try {
            return obj instanceof HTMLElement;
        } catch (e) {
            return "object" === typeof obj && 1 === obj.nodeType && "object" === typeof obj.style && "object" === typeof obj.ownerDocument;
        }
    };
    jMod.Versions = {
        parseVersion: function(str) {
            var fullVersionPatt = /^\s*(.*?)\s*((?:[\d]+\.)*[\d]+)\s*(.*?)\s*$/i;
            var versionNumsPatt = /([\d]+)\.?/gi;
            var matches;
            var output = {
                fullVersion: str.trim(),
                versionStr: null,
                prefixStr: null,
                suffixStr: null,
                version: []
            };
            if (matches = fullVersionPatt.exec(str.trim())) {
                output.prefixStr = matches[1];
                output.versionStr = matches[2];
                output.suffixStr = matches[3];
                var tmp = matches[2].split(".");
                for (var index in tmp) output.version.push(parseInt(tmp[index]));
            }
            return output;
        },
        compare: function(v1, v2) {
            var versionObj1 = v1;
            var versionObj2 = v2;
            if ("string" === typeof v1) versionObj1 = this.parseVersion(v1);
            if ("string" === typeof v2) versionObj2 = this.parseVersion(v2);
            var versionArray1 = [].concat(versionObj1.version);
            var versionArray2 = [].concat(versionObj2.version);
            while (true) {
                var val1 = versionArray1.shift();
                var val2 = versionArray2.shift();
                if (null != val1 && null != val2) {
                    if (parseInt(val1) > parseInt(val2)) return 1;
                    if (parseInt(val1) < parseInt(val2)) return -1;
                } else if (null != val1 && null == val2) return 1; else if (null == val1 && null != val2) return -1; else break;
            }
            return 0;
        }
    };
    var URLBuilder = jMod.URLBuilder = function(input) {
        this.protocol = "http:";
        this.hostname = "";
        this.pathname = "";
        this.args = [];
        this.setHostname = function(str) {
            try {
                if ("string" === typeof str) {
                    var parser = document.createElement("a");
                    if (!/^\s*(?:https?\:)?\/\//i.test(str)) str = "http://" + str;
                    parser.href = str;
                    this.hostname = parser.hostname;
                    this.protocol = parser.protocol;
                }
            } catch (e) {} finally {
                return this;
            }
        };
        this.setPath = function(str) {
            if ("/" != str[0]) str = "/" + str;
            this.pathname = str;
            return this;
        };
        this.addArg = function(key, value) {
            this.args.push({
                name: key,
                value: value
            });
            return this;
        };
        this.addArgs = function(args) {
            for (var i = 0; i < args.length; i++) switch (RealTypeOf(args[i])) {
              case "array":
                this.addArg(args[i][0], args[i][1]);
                break;

              case "map":
              case "object":
                var tmpName = getFirstValidKeyValue(args[i], [ "name", "key" ]);
                var tmpValue = getFirstValidKeyValue(args[i], [ "value" ]);
                if (tmpName && tmpValue) this.addArg(tmpName, tmpValue);
            }
            return this;
        };
        this.buildArgs = function() {
            var argStr = "";
            var argsArr = [];
            for (var i = 0; i < this.args.length; i++) argsArr.push(this.args[i].name + "=" + this.args[i].value);
            return argsArr.join("&");
        };
        this.toString = function() {
            return this.protocol + "//" + this.hostname + this.pathname + "?" + this.buildArgs();
        };
        this.setHostname(input);
    };
    var jModError = function() {
        function jModError(arg0) {
            var err, i = 0, data = {}, length = arguments.length;
            if (length > 0) {
                if ("string" !== typeof arg0) {
                    if (arg0 instanceof Error) data.e = arg0; else data = arg0;
                    arg0 = length > 1 ? arguments[1] : undefined;
                    i++;
                }
                if ("string" === typeof arg0) {
                    data.message = arg0;
                    if (length > i + 1) data.fileName = arguments[i + 1];
                    if (length > i + 2) data.lineNumber = arguments[i + 2];
                    if (length > i + 3) data.columnNumber = arguments[i + 3];
                    if (length > i + 4) if (arguments[i + 4] instanceof Error) data.e = arguments[i + 4];
                }
                if (data.e) try {
                    err = data.e;
                    this.stack = err.stack;
                } catch (e) {}
            }
            if (!err) {
                err = new Error(data.message || null, data.fileName || null, data.lineNumber || null);
                err.constructor = jModError;
                err.__proto__ = Object.create(err.__proto__, {
                    name: {
                        value: "jModError",
                        enumerable: false
                    },
                    toString: {
                        value: function() {
                            return this.name + ": " + this.message;
                        }
                    }
                });
                delete err.toString;
                err.toString = function() {
                    return this.name + ": " + this.message;
                }.bind(err);
                if (err.stack) if ("undefined" != typeof Components) err.stack = this.stack = err.stack.substring(err.stack.indexOf("\n") + 1); else if ("undefined" != typeof chrome || "undefined" != typeof process) {
                    err.stack = this.stack = err.stack.replace(/\n[^\n]*/, "");
                    Object.defineProperty(err, "stack", {
                        value: this.stack
                    });
                } else this.stack = err.stack;
            }
            if (this.stack && !data.fileName) {
                var tmp = jMod.parseStack(this.stack);
                if (tmp && tmp.length > 0) {
                    this.pStack = tmp;
                    data.lineNumber = parseInt(tmp[0].lineNumber);
                    data.columnNumber = parseInt(tmp[0].columnNumber || 0);
                    data.fileName = tmp[0].fileName;
                    if (!err.fileName || "null" == err.fileName) try {
                        err.lineNumber = data.lineNumber;
                        err.columnNumber = data.columnNumber;
                        err.fileName = data.fileName;
                        err.stack = this.stack;
                    } catch (e) {
                        try {} catch (e) {}
                    }
                }
            }
            this.displayName = this.name = "jModError";
            this.err = err;
            this.message = data.message || err.message;
            this.fileName = data.fileName || err.fileName;
            this.lineNumber = null != data.lineNumber ? data.lineNumber : err.lineNumber;
            this.columnNumber = null != data.columnNumber ? data.columnNumber : err.columnNumber;
            this.toString = function() {
                return this.name + ": " + this.message;
            };
            this.constructor = Error;
        }
        jModError.prototype = Object.create(Error.prototype, {
            name: {
                value: "jModError",
                enumerable: true
            }
        });
        jModError.prototype.constructor = jModError;
        jModError.prototype.constructor.constructor = Error;
        jModError.prototype.log = function(title, message) {
            var title = title || "jMod Error", message = message || this.message;
            jModLogError(this, title, message);
        };
        return jModError;
    }();
    if (!String.prototype.trim) (function() {
        Object.defineProperty(String.prototype, "trim", {
            value: function() {
                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
            },
            enumerable: false
        });
    })();
    function eventCancel(e) {
        var win = window || unsafeWindow;
        if (!e) if (win.event) e = win.event; else return;
        if (null != e.cancelBubble) e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        if (win.event) e.returnValue = false;
        if (null != e.cancel) e.cancel = true;
    }
    function isEvent(a) {
        var patt = /^\[object |\]$/g;
        try {
            if ("event" == Object.prototype.toString.call(a).replace(patt, "").toLowerCase()) return true;
        } catch (e) {}
        try {
            if ("event" == a.constructor.toString().replace(patt, "").toLowerCase()) return true;
        } catch (e) {}
        return false;
    }
    var RealTypeOf = jMod.RealTypeOf = function(_obj) {
        var obj;
        try {
            if (_obj.constructor === {}.constructor || _obj) obj = _obj;
        } catch (e) {
            obj = mCloneInto(_obj, unsafeWindow, {
                cloneFunctions: true,
                wrapReflectors: true
            });
        }
        try {
            if (typeof obj === _undefined) return _undefined;
            if ("number" === typeof obj && true == isNaN(obj)) return "nan";
            if ("object" === typeof obj) {
                if (null === obj) return "null";
                if (obj.constructor === {}.constructor) return "map";
                if (obj.constructor === new Array().constructor) return "array";
                if (obj.constructor === new Date().constructor) {
                    if (isNaN(obj.getTime())) return "invaliddate";
                    return "date";
                }
                if (obj.constructor === new RegExp().constructor) return "regex";
                return Object.prototype.toString.call(obj).replace(/^\[object |\]$/g, "").toLowerCase();
            }
        } catch (e) {}
        return typeof obj;
    };
    var isPlainObject = function(obj) {
        try {
            if ("object" !== typeof obj || obj.nodeType || obj === obj.window) return false;
            if (obj.constructor && !obj.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) return false;
        } catch (e) {
            var obj2 = mCloneInto(obj, unsafeWindow, {
                cloneFunctions: true,
                wrapReflectors: true
            });
            if ("object" !== typeof obj2 || obj2.nodeType || obj2 === obj2.window) return false;
            if (obj2.constructor && !obj2.hasOwnProperty.call(obj2.constructor.prototype, "isPrototypeOf")) return false;
        }
        return true;
    };
    var isArray = function(obj) {
        try {
            if (obj.constructor === new Array().constructor) return true;
        } catch (e) {
            var obj2 = mCloneInto(obj, unsafeWindow, {
                cloneFunctions: true,
                wrapReflectors: true
            });
            if (obj2.constructor === new Array().constructor) return true;
        }
        return false;
    };
    var isFunction = function(obj) {
        return "function" === typeof obj;
    };
    jMod.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if ("boolean" === typeof target) {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if ("object" !== typeof target && "function" !== typeof target) target = {};
        if (i === length) {
            target = this;
            i--;
        }
        for (;i < length; i++) if (null != (options = arguments[i])) for (name in options) {
            src = target[name];
            try {
                if (("object" === typeof options[name] || "function" === typeof options[name]) && options[name].constructor === {}.constructor || options[name] || target) copy = options[name];
            } catch (e) {
                copy = mCloneInto(options[name], target, {
                    cloneFunctions: true,
                    wrapReflectors: true
                });
            }
            if (target === options[name] || target === copy) continue;
            if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                    copyIsArray = false;
                    clone = src && isArray(src) ? src : [];
                } else clone = src && isPlainObject(src) ? src : {};
                target[name] = jMod.extend(deep, clone, copy);
            } else if (copy !== undefined) try {
                target[name] = copy;
            } catch (e) {
                target[name] = mCloneInto(copy, target, {
                    cloneFunctions: true,
                    wrapReflectors: true
                });
            }
        }
        return target;
    };
    jMod.extendp = function() {
        var options, name, src, copy, copyIsArray, clone, j, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if ("boolean" === typeof target) {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if ("object" !== typeof target && "function" !== typeof target) target = {};
        if (i === length) {
            target = this;
            i--;
        }
        for (;i < length; i++) if (null != (options = arguments[i])) for (name in options) {
            src = target[name];
            try {
                if (("object" === typeof options[name] || "function" === typeof options[name]) && options[name].constructor === {}.constructor || options[name] || target) copy = options[name];
            } catch (e) {
                copy = mCloneInto(options[name], target, {
                    cloneFunctions: true,
                    wrapReflectors: true
                });
            }
            if (target === copy) continue;
            if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                    if (isArray(src) && Array.prototype.push.apply(target[name], copy)) continue;
                    clone = src && isArray(src) ? src : [];
                } else clone = src && isPlainObject(src) ? src : {};
                target[name] = jQuery.extendp(deep, clone, copy);
            } else if (copy !== undefined) try {
                target[name] = copy;
            } catch (e) {
                target[name] = mCloneInto(copy, target, {
                    cloneFunctions: true,
                    wrapReflectors: true
                });
            }
        }
        return target;
    };
    jMod.CloneProperties = function() {
        var nextSource, descriptor, keysArray, nextIndex, nextKey, desc, to, length = arguments.length, target = arguments[0], deep = false, i = 1;
        if ("boolean" == typeof target && length > 2) {
            deep = target;
            target = arguments[i++];
        }
        if (target === undefined || null === target) return target;
        to = Object(target);
        for (i; i < length; i++) {
            nextSource = arguments[i];
            if (nextSource === undefined || null === nextSource) continue;
            keysArray = deep ? Object.getOwnPropertyNames(Object(nextSource)) : Object.keys(Object(nextSource));
            for (nextIndex = 0; nextIndex < keysArray.length; nextIndex++) {
                nextKey = keysArray[nextIndex];
                desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                if (desc !== undefined) if ("function" == typeof nextSource[nextKey]) to[nextKey] = nextSource[nextKey].bind(to); else if ("object" == typeof nextSource[nextKey] && isPlainObject(nextSource[nextKey])) Object.defineProperty(to, nextKey, {
                    enumerable: desc.enumerable,
                    configurable: desc.configurable,
                    writable: desc.writable,
                    value: deep ? jMod.CloneProperties(deep, to[nextKey] || {}, nextSource[nextKey]) : nextSource[nextKey]
                }); else {
                    descriptor = {
                        enumerable: desc.enumerable,
                        configurable: desc.configurable
                    };
                    if (_undefined != typeof desc.get) descriptor.get = desc.get.bind(to);
                    if (_undefined != typeof desc.set) descriptor.set = desc.set.bind(to);
                    if (_undefined != typeof desc.value) {
                        descriptor.writable = desc.writable;
                        if ("function" == typeof desc.value) descriptor.value = desc.value.bind(to); else descriptor.value = desc.value;
                    }
                    Object.defineProperty(to, nextKey, descriptor);
                }
            }
        }
        return to;
    };
    (function() {
        var EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", EMBEDDED = "embedded";
        jMod.Browser = {
            getAgent: function() {
                return navigator.userAgent;
            },
            get: function() {},
            getRegexMatches: function(str, regexList) {
                var matches;
                var results = [];
                for (var i = 0; i < regexList.length; i += 2) {
                    var tGroup = regexList[i];
                    var tGroupMatches = [];
                    for (var x = 0; x < tGroup.length; x++) if (matches = tGroup[x].exec(str)) tGroupMatches.push(matches);
                    if (tGroupMatches.length > 0) results.push({
                        matches: tGroupMatches,
                        map: regexList[i + 1]
                    });
                }
                return results;
            },
            getRegexFirstMatch: function(str, regexList) {
                var matches;
                for (var i = 0; i < regexList.length; i += 2) {
                    var tGroup = regexList[i];
                    var tGroupMatches = [];
                    for (var x = 0; x < tGroup.length; x++) if (matches = tGroup[x].exec(str)) return [ matches, regexList[i + 1] ];
                }
                return [];
            },
            getBrowser: function() {
                var result = {};
                try {
                    var agent = this.getAgent();
                    var matchesList = this.getRegexFirstMatch(agent, this.regexes.browser);
                    if (matchesList.length > 1) for (var i = 0; i < matchesList[1].length; i++) result[matchesList[1][i]] = matchesList[0][i + 1];
                } catch (e) {}
                return result;
            },
            regexes: {
                browser: [ [ /(opera\smini)\/((\d+)?[\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i, /(opera).+version\/((\d+)?[\w\.]+)/i, /(opera)[\/\s]+((\d+)?[\w\.]+)/i ], [ NAME, VERSION, MAJOR ], [ /\s(opr)\/((\d+)?[\w\.]+)/i ], [ [ NAME, "Opera" ], VERSION, MAJOR ], [ /(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i ], [ [ NAME, "IE" ], VERSION, MAJOR ], [ /(yabrowser)\/((\d+)?[\w\.]+)/i ], [ [ NAME, "Yandex" ], VERSION, MAJOR ], [ /(comodo_dragon)\/((\d+)?[\w\.]+)/i ], [ [ NAME, /_/g, " " ], VERSION, MAJOR ], [ /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i, /(uc\s?browser|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i ], [ NAME, VERSION, MAJOR ], [ /((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i ], [ [ NAME, "Chrome" ], VERSION, MAJOR ], [ /version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i ], [ VERSION, MAJOR, [ NAME, "Mobile Safari" ] ], [ /version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i ], [ VERSION, MAJOR, NAME ], [ /(konqueror)\/((\d+)?[\w\.]+)/i, /(webkit|khtml)\/((\d+)?[\w\.]+)/i ], [ NAME, VERSION, MAJOR ], [ /(navigator|netscape)\/((\d+)?[\w\.-]+)/i ], [ [ NAME, "Netscape" ], VERSION, MAJOR ], [ /(swiftfox)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i, /(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i ], [ NAME, VERSION, MAJOR ] ]
            }
        };
    })();
    var hexToRgb = function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            a: null
        } : null;
    };
    var parseRGB = function(str) {
        var r = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))?\s*\)/im.exec(str);
        return r ? {
            r: parseInt(r[1]),
            g: parseInt(r[2]),
            b: parseInt(r[3]),
            a: r[4] && "" != r[4] ? parseFloat(r[4]) : null
        } : null;
    };
    var parseColorString = function(str) {
        var r = parseRGB(str);
        return r ? r : hexToRgb(str);
    };
    var PI_OVER_2 = .5 * Math.PI, TEN_LOG2 = 10 * Math.log(2);
    var timeFromPosition = function(b, c, d, x) {
        return 2 * d / Math.PI * Math.asin((x - b) / c);
    };
    var easeOutSin = function(c, d, t) {
        var b = PI_OVER_2 / d, a = c * b;
        return Math.round(a * Math.cos(b * t));
    };
    var jConfig = jMod.Config = function(key, value) {
        try {
            if (jConfig.getScriptFileInfo && !ScriptInfo.gotFileInfo) ScriptInfo.getScriptFileInfo();
        } catch (e) {}
        if (typeof value === _undefined) return "string" == typeof key ? jMod.Config.SearchForKey(key) : jMod.Config.SearchForKeys(key); else return jMod.Config.setKeyValue(key, value);
    };
    jMod.extend(jMod.Config, {
        host: "http://myuserjs.org",
        scopeLock: false,
        secure: false,
        browser: jMod.Browser.getBrowser(),
        getScriptFileInfo: true,
        addToGlobalScope: true,
        script: {
            username: undefined,
            script_name: undefined
        },
        Update: {
            DOMTiming: false,
            args: {},
            updateVeriableName: "USMetaData",
            getType: "data",
            jQuery: false,
            XMLHttpRequest: false,
            getStats: false,
            sampleRate: 100
        },
        Error: {
            autoReportErrors: false,
            errorFilter: function(message, url, linenumber) {
                return true;
            }
        },
        API: {
            log: {
                disabled: [],
                verbosity_level: jMod._debug ? 5 : 3,
                GM_log: true,
                Firebug: true,
                WebConsole: true,
                debug: false
            },
            Storage: {
                prefix: "jMod_",
                engine: "GM_Storage"
            }
        },
        Language: {
            Current: "en"
        },
        jQueryExtensions: {
            CrossOrigin: true
        },
        debug: false
    });
    if ("object" === typeof unsafeWindow["jMOD_CONFIGURATION"]) jMod.Config = jMod.extend(true, jMod.Config, unsafeWindow["jMOD_CONFIGURATION"]);
    Object.defineProperties(jMod.Config, props);
    var jConfigCaseInsensitive = function(key, value) {
        if (typeof value === _undefined) return jMod.Config.SearchForKeyI(key); else return jMod.Config.setKeyValueI(key, value);
    };
    jConfig.scanElement = function(el) {
        if (el && isElement(el)) {
            var r = {}, i = 0, attrName, attrValue, origVal, nodeNamePatt = /^(?:data-)?(.*?)$/i, attrs = el.attributes;
            for (i; i < attrs.length; i++) {
                attrName = attrs[i].nodeName;
                attrName = nodeNamePatt.exec(attrName)[1];
                attrValue = attrs[i].value;
                if (attrValue) {
                    switch (attrName.toLowerCase()) {
                      case "src":
                      case "type":
                      case "async":
                      case "defer":
                      case "onload":
                      case "onerror":
                      case "charset":
                      case "crossorigin":
                        continue;
                        break;

                      case "username":
                        jMod.Config.script.username = attrValue;
                        break;

                      case "scriptname":
                      case "script_name":
                      case "script-name":
                        jMod.Config.script.script_name = attrValue;
                        break;

                      case "jmod-config":
                        try {
                            attrValue = JSON.parse(attrValue);
                            if (attrValue) jMod.extend(true, jMod.Config, attrValue);
                        } catch (e) {
                            console.error('Error parsing "' + attrs[i].nodeName + '"', el, e);
                            continue;
                        }
                        break;

                      default:
                        attrName = attrName.split("-").join(".");
                        origVal = jConfigCaseInsensitive(attrName);
                        switch (typeof origVal) {
                          case "number":
                            jConfigCaseInsensitive(attrName, parseInt(attrValue));
                            break;

                          case "boolean":
                            jConfigCaseInsensitive(attrName, "true" == attrValue.trim().toLowerCase() ? true : false);
                            break;

                          case "string":
                            jConfigCaseInsensitive(attrName, attrValue);

                          case "object":
                            try {
                                attrValue = JSON.parse(attrValue);
                                if (attrValue) jConfigCaseInsensitive(attrName, attrValue);
                            } catch (e) {
                                console.error('Error parsing "' + attrs[i].nodeName + '"', el, e);
                                continue;
                            }
                            break;

                          default:
                            continue;
                        }
                    }
                    r[attrName] = attrValue;
                }
            }
            return r;
        }
    };
    if (CurrentRunningScript.el) {
        CurrentRunningScript.config = jConfig.scanElement(CurrentRunningScript.el);
        if (CurrentRunningScript.el.id && "" != CurrentRunningScript.el.id.trim()) CurrentRunningScript.id = CurrentRunningScript.el.id; else {
            if ((window || unsafeWindow).document.getElementById(CurrentRunningScript.id)) {
                var i = 0;
                while ((window || unsafeWindow).document.getElementById(CurrentRunningScript.id + "-" + i)) i++;
                CurrentRunningScript.id = CurrentRunningScript.id + "-" + i;
            }
            CurrentRunningScript.el.id = CurrentRunningScript.id;
        }
    }
    jMod.API.ParseMetaData_Types = [];
    jMod.API.ParseMetaData_Types.push(function(name, obj) {
        if ("history" == name.toLowerCase() && "object" === typeof obj) {
            var history_patt = /\(([0-9\.]+)\)\s+(.*?)$/i;
            var o = {};
            for (var i = 0; i < obj.length; i++) if (history_patt.test(obj[i])) {
                var r = history_patt.exec(obj[i]);
                var vers = r[1];
                var des = r[2];
                if (typeof o[vers] === _undefined) o[vers] = [];
                o[vers].push(des);
            }
            return o;
        }
    });
    jMod.API.ParseMetaData_Types.push(function(name, obj) {
        if ("resource" == name.toLowerCase()) {
            if ("object" !== typeof obj) obj = [ obj ];
            var r, i = 0, o = {}, resource_patt = /^\s*([\w]+)\s+(.*?)\s*$/;
            for (i; i < obj.length; i++) if (resource_patt.test(obj[i])) {
                r = resource_patt.exec(obj[i]);
                o[r[1]] = r[2];
            }
            return o;
        }
    });
    jMod.API.ParseMetaData = function(headerBlock) {
        var tmp, key, i, r, o = {}, patt = /@([\S]+)\s+(.*?)$/i;
        if ("string" === typeof headerBlock) headerBlock = headerBlock.split(/\r?\n/i);
        for (i = 0; i < headerBlock.length; i++) if (patt.test(headerBlock[i])) {
            r = patt.exec(headerBlock[i]);
            if (typeof o[r[1]] === _undefined) o[r[1]] = r[2]; else if ("string" !== typeof o[r[1]]) o[r[1]].push(r[2]); else {
                tmp = o[r[1]];
                o[r[1]] = [];
                o[r[1]].push(tmp);
                o[r[1]].push(r[2]);
            }
        }
        for (key in o) for (i = 0; i < jMod.API.ParseMetaData_Types.length; i++) if (typeof (tmp = jMod.API.ParseMetaData_Types[i](key, o[key])) !== _undefined) {
            o[key] = tmp;
            break;
        }
        return o;
    };
    var ScriptInfo = jMod.ScriptInfo = function() {
        if (0 == arguments.length) return jMod.ScriptInfo.get(); else {
            var type = typeof arguments[0];
            if (1 == arguments.length && ("object" === type || "string" == type)) return jMod.ScriptInfo.GM_info(arguments[0]);
        }
    };
    ScriptInfo.getURLInfo = function(str) {
        var patt = /myuserjs\.org\/script\/([^\/]+)\/([^\s]+)(?:\.(user|meta|metajs|data)\.js){1}?/i;
        if (patt.test(str)) {
            var matches = patt.exec(str);
            return {
                username: matches[1],
                script_name: matches[2],
                get_type: matches[3]
            };
        }
        return false;
    };
    ScriptInfo.gotFileInfo = false;
    ScriptInfo.getScriptFileInfo = function() {
        if (ScriptInfo.gotFileInfo || !jConfig.getScriptFileInfo) return jConfig.script.script_file_info;
        var i = 0, tStack, callerScriptInfo, output = {}, e = new Error(), tStackStr = e.stack.toString();
        if (tStackStr.indexOf("user.js") == -1) return;
        tStack = jMod.parseStack(tStackStr);
        if (tStack.length > 0) for (i; i < tStack.length; i++) {
            callerScriptInfo = tStack[i];
            if (_undefined == typeof jConfig.jMod_File_Path && [ "jmod.js", "jmod.min.js", "jmod.full.js", "jmod.min.expanded.js", "mujs.js", "mujs.min.js" ].indexOf(callerScriptInfo.fileName.toLowerCase()) != -1) {
                jConfig.jMod_Full_File_Name = callerScriptInfo.fileName;
                jConfig.jMod_File_Name = callerScriptInfo.fileName.substr(0, callerScriptInfo.fileName.length - 3);
                jConfig.jMod_File_Path = callerScriptInfo.fullFileName;
            }
            if ("" != callerScriptInfo.fileName && "user.js" == callerScriptInfo.fileExt.toLowerCase()) {
                ScriptInfo.gotFileInfo = true;
                output = jConfig.script.script_file_info = {
                    userscript_full_file_name: callerScriptInfo.fileName,
                    userscript_file_name: callerScriptInfo.fileName.substr(0, callerScriptInfo.fileName.length - 8),
                    userscript_file_path: callerScriptInfo.fullFileName,
                    caller_lineNumber: callerScriptInfo.lineNumber,
                    caller_functionName: callerScriptInfo.functionName
                };
                if (jMod.debug) jModLogInfo("ScriptInfo.getScriptFileInfo", "Get Script File Info Successful!!", output, callerScriptInfo);
                return output;
            }
        }
        return;
    };
    Object.defineProperty(ScriptInfo, "InfoSet", {
        get: function() {
            return _undefined != typeof jConfig.script.script_info;
        }
    });
    ScriptInfo.set = function(data) {
        var callerScriptInfo, gm_info, scriptMetaStr, pMetaData, key, tmp, urlInfo, output = {};
        try {
            callerScriptInfo = ScriptInfo.getScriptFileInfo();
            if (_undefined != typeof callerScriptInfo) output = jMod.extend(output, callerScriptInfo);
        } catch (e) {}
        try {
            if (typeof data === _undefined && (_undefined != typeof GM_info || _undefined != typeof GM_getMetadata)) try {
                data = {
                    gm_info: _undefined != typeof GM_info ? GM_info : GM_getMetadata(),
                    has_GM_info: _undefined != typeof GM_info,
                    has_GM_getMetadata: _undefined != typeof GM_getMetadata
                };
            } catch (e) {}
            if ("object" === typeof data) {
                gm_info = data.GM_info || data.gm_info || data.ginfo;
                if (_undefined == typeof gm_info && _undefined != typeof data.scriptSource) gm_info = data;
                if (_undefined != typeof gm_info && _undefined != typeof gm_info.scriptMetaStr) scriptMetaStr = gm_info.scriptMetaStr;
            } else if ("string" === typeof data) scriptMetaStr = data;
            if (_undefined != typeof scriptMetaStr) {
                pMetaData = jMod.API.ParseMetaData(scriptMetaStr);
                for (key in pMetaData) if (_undefined == typeof output[key]) output[key] = pMetaData[key];
            }
            if (_undefined != typeof gm_info) {
                if (_undefined != typeof gm_info.script) {
                    for (key in gm_info.script) if (typeof output[key] === _undefined) output[key] = gm_info.script[key];
                } else console.warn("ScriptInfo", "GM_info.script does not exist", gm_info, data);
                if (_undefined != typeof gm_info.uuid) output["gmUUID"] = gm_info.uuid; else if (_undefined != typeof gm_info.script.uuid) output["gmUUID"] = gm_info.script.uuid;
                if (_undefined != typeof gm_info.scriptHandler) {
                    if ("tampermonkey" == gm_info.scriptHandler.toLowerCase()) {
                        output.script_handler = "Tampermonkey";
                        output.script_handler_version = gm_info.version;
                        jConfig.getScriptFileInfo = false;
                    } else if ("greasemonkey" == gm_info.scriptHandler.toLowerCase()) {
                        output.script_handler = "Greasemonkey";
                        output.script_handler_version = gm_info.version;
                    }
                } else if (data.has_GM_info) {
                    output.script_handler = "Greasemonkey";
                    output.script_handler_version = gm_info.version;
                } else if (data.has_GM_getMetadata) output.script_handler = "Scriptish";
            }
            if (_undefined != typeof pMetaData) {
                key = getFirstValidKey(pMetaData, [ "downloadURL", "updateURL", "jModupdateURL", "jModUpdateURL", "jModdownloadURL", "jModDownloadURL" ], function(k, val) {
                    return jMod.ScriptInfo.getURLInfo(val);
                });
                if (_undefined != typeof key && (urlInfo = ScriptInfo.getURLInfo(pMetaData[key]))) {
                    jConfig.script.username = urlInfo.username;
                    jConfig.script.script_name = urlInfo.script_name;
                    if ([ "meta", "metajs", "data" ].indexOf(urlInfo.get_type.toLowerCase()) != -1) jConfig.script.get_type = urlInfo.get_type.toLowerCase();
                } else {
                    if (tmp = getFirstValidKeyValue(pMetaData, [ "jModusername", "jMod_username" ])) jConfig.script.username = tmp;
                    if (tmp = getFirstValidKeyValue(pMetaData, [ "jModscriptname", "jMod_script_name" ])) jConfig.script.script_name = tmp;
                }
                if (_undefined != typeof pMetaData.jMod) try {
                    if (tmp = JSON.parse(pMetaData["jMod"])) jMod.extend(true, jMod.Config, tmp);
                } catch (e) {
                    jModLogError(e, "ScriptInfo.set", "Error parsing options in MetaBlock");
                }
            }
        } catch (e) {
            console.error("Error ScriptInfo.set", e);
        }
        Object.defineProperty(jMod.Config.script, "script_info", {
            value: Object.freeze(output),
            writable: false,
            enumerable: true,
            configurable: false
        });
        return Object.freeze(output);
    };
    ScriptInfo.get = function() {
        var r = jMod.Config.script.script_info;
        return _undefined != typeof r ? r : ScriptInfo.set.apply(this, arguments);
    };
    var cssResourceAdded = false;
    if (_undefined != typeof GM_info || _undefined != typeof GM_getMetadata) {
        try {
            ScriptInfo.set();
        } catch (e) {}
        var resources = jConfig("script.script_info.resource");
        if (resources && resources.jModCSS && _undefined != typeof GM_getResourceText) try {
            var tmp = GM_getResourceText("jModCSS");
            if (tmp && "" != tmp) {
                _css += tmp;
                cssResourceAdded = true;
            }
        } catch (e) {}
    }
    if (!cssResourceAdded) _css = defaultjModCSSURL + _css;
    var StringFormat = function(str, arr) {
        var i = -1;
        function callback(exp, p0, p1, p2, p3, p4) {
            if ("%%" == exp) return "%";
            if (arr[++i] === undefined) return undefined;
            var exp = p2 ? parseInt(p2.substr(1)) : undefined;
            var base = p3 ? parseInt(p3.substr(1)) : undefined;
            var val;
            switch (p4) {
              case "s":
                val = arr[i];
                break;

              case "c":
                val = arr[i][0];
                break;

              case "f":
                val = parseFloat(arr[i]).toFixed(exp);
                break;

              case "p":
                val = parseFloat(arr[i]).toPrecision(exp);
                break;

              case "e":
                val = parseFloat(arr[i]).toExponential(exp);
                break;

              case "x":
                val = parseInt(arr[i]).toString(base ? base : 16);
                break;

              case "d":
                val = parseFloat(parseInt(arr[i], base ? base : 10).toPrecision(exp)).toFixed(0);
            }
            val = "object" == typeof val ? JSON.stringify(val) : val.toString(base);
            var sz = parseInt(p1);
            var ch = p1 && "0" == p1[0] ? "0" : " ";
            while (val.length < sz) val = p0 !== undefined ? val + ch : ch + val;
            return val;
        }
        var regex = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd])/g;
        return str.replace(regex, callback);
    };
    var Lang = jMod.Language = function(keys) {
        var type, value, tmpLanguageObj = Lang.getLanguage(Lang.Current, true);
        if (!tmpLanguageObj) return;
        value = Object_SearchForKey.call(tmpLanguageObj, keys);
        type = typeof value;
        if (_undefined == type) {
            if (Lang.Current === Lang.Default) return;
            tmpLanguageObj = Lang.getLanguage(Lang.Default);
            value = Object_SearchForKey.call(tmpLanguageObj, keys);
            type = typeof value;
            if (_undefined == type) return;
        }
        if (1 == arguments.length || "string" !== type) return value;
        return StringFormat.call(StringFormat, value, Slice.call(arguments, 1));
    };
    Lang.Default = "en";
    Object.defineProperty(Lang, "Current", {
        get: function() {
            try {
                return jConfig.Language.Current;
            } catch (e) {
                return Lang.Default;
            }
        },
        set: function(value) {
            try {
                if (_undefined !== typeof Lang.Names[value]) jConfig.Language.Current = value;
            } catch (e) {}
        }
    });
    Lang.Names = {};
    Lang.getLanguage = function(name, revertToDefault) {
        if (Lang.Names[name] !== undefined) return Lang[name];
        if (revertToDefault) return Lang[Lang.Default];
    };
    Lang.Names.en = "English";
    Lang.en = {};
    Lang.Names.es = "Espanol";
    Lang.es = {};
    jMod._call = function() {
        var type, tmp, arg0, arg1, length = arguments.length;
        try {
            if (jConfig.getScriptFileInfo && !ScriptInfo.gotFileInfo) ScriptInfo.getScriptFileInfo();
        } catch (e) {}
        try {
            if (length > 0) {
                arg0 = arguments[0];
                type = typeof arg0;
                if ("string" == type) {
                    if (1 == length) {
                        if (_undefined !== typeof (tmp = jConfig(arg0))) return tmp;
                    } else {
                        arg1 = arguments[1];
                        switch (arg0) {
                          case "get":
                            return jConfig(arg1);
                            break;

                          case "set":
                            return jConfig(arg1, arguments[2]);
                        }
                        if ("function" === typeof arg1 && typeof jMod.Events.e[arg0] !== _undefined) return jMod.Events.addListener.apply(jMod.Events, Slice.call(arguments));
                        if (2 == length) if (_undefined !== typeof (tmp = jConfig(arg0))) if (typeof tmp === typeof arg1) return jConfig(arg0, arg1);
                    }
                    if (jMod.log.fnList.join("|").toLowerCase().split("|").indexOf(arg0.toLowerCase()) != -1) if ("function" === typeof (tmp = Object_SearchForKeyCaseInsensitive.call(jMod.log, arg0))) return tmp.apply(jMod.log, Slice.call(arguments, 1));
                } else if ("object" == type) {
                    if (!isElement(arg0)) {
                        if (typeof getFirstValidKey(arg0, [ "GM_info", "gm_info", "ginfo" ]) !== _undefined) return ScriptInfo.set.apply(ScriptInfo, Slice.call(arguments));
                        if (typeof arg0.scriptSource !== _undefined && typeof arg0.scriptMetaStr !== _undefined) return ScriptInfo.set.apply(ScriptInfo, Slice.call(arguments));
                    }
                } else if ("function" == type) if (1 == length) {
                    jMod.onReady = arg0;
                    return arg0;
                }
                if (jConfig("debug")) jMod.Warning("Unable to process jMod() call:", Slice.call(arguments));
            }
        } catch (e) {}
    };
    jMod.$ = function(selector, target, nojQuery) {
        target = target || jMod.Element.document;
        try {
            if (true !== nojQuery && jMod.jQueryAvailable) try {
                return $(selector, target).first()[0];
            } catch (e) {}
            if ("string" !== typeof selector) return;
            return target.querySelector(selector);
        } catch (e) {
            jMod.Exception("jMod.Query", "Error!", e);
        }
    };
    jMod.$$ = function(selector, target, nojQuery) {
        target = target || jMod.Element.document;
        try {
            if (true !== nojQuery && jMod.jQueryAvailable) try {
                return $(selector, target).toArray();
            } catch (e) {}
            if ("string" !== typeof selector) return;
            var tmp = target.querySelectorAll(selector);
            return tmp ? [].map.call(tmp, function(element) {
                return element;
            }) : [];
        } catch (e) {
            jMod.Exception("jMod.Query", "Error!", e);
        }
    };
    jMod.Element = function(data, data2) {
        try {
            var args = Slice.call(arguments);
            switch (RealTypeOf(data)) {
              case "string":
                if ("function" === typeof jMod.Element[command]) return jMod.Element._call.apply(jMod.Element, arguments); else ;
                break;

              case "map":
              case "object":
                if (1 == args.length) return createNewElement.apply(jMod.Element, arguments); else return createNewElement(args);
                break;

              default:
                if (jMod.Element.isElement(data)) ; else ;
            }
        } catch (e) {
            jModLogError(e, "jMod.Element");
        }
    };
    jMod.Element._call = function(command) {
        if ("function" === typeof jMod.Element[command]) return jMod.Element[command].apply(jMod.Element, Slice.call(arguments, 1));
    };
    Object.defineProperty(jMod.Element, "document", {
        get: function() {
            try {
                return _undefined != typeof document ? document : window.document || unsafeWindow.document;
            } catch (e) {}
            return null;
        }
    });
    Object.defineProperty(jMod.Element, "head", {
        get: function() {
            try {
                var doc = jMod.Element.document;
                return doc.head || doc.getElementsByTagName("head")[0];
            } catch (e) {}
            return null;
        }
    });
    jMod.Element.isElement = isElement;
    var hasClass = jMod.Element.hasClass = function(el, className) {
        return (" " + el.className + " ").indexOf(" " + className + " ") != -1;
    };
    var hasClasses = jMod.Element.hasClasses = function(el, classNames) {
        var classNamesPad = " " + el.className + " ", classNamesArr = "string" == typeof classNames ? classNames.split(" ") : classNames;
        return classNamesArr.filter(function(name) {
            return classNamesPad.indexOf(" " + name + " ") != -1;
        });
    };
    var missingClasses = jMod.Element.missingClasses = function(el, classNames) {
        var classNamesPad = " " + el.className + " ", classNamesArr = "string" == typeof classNames ? classNames.split(" ") : classNames;
        return classNamesArr.filter(function(name) {
            return classNamesPad.indexOf(" " + name + " ") == -1;
        });
    };
    var addClass = jMod.Element.addClass = function(el, className) {
        if (!hasClass(el, className)) el.className = (el.className + " " + className).trim();
        return el;
    };
    var addClasses = jMod.Element.addClasses = function(el, classNames) {
        return el.className = (el.className + " " + missingClasses(el, classNames).join(" ")).trim(), 
        el;
    };
    var removeClassRegex = new RegExp("\\w+");
    var removeClass = jMod.Element.removeClass = function(el, className) {
        return el.className = (" " + el.className + " ").replace(new RegExp(" " + className + " ", "g"), " ").trim(), 
        el;
    };
    var removeClasses = jMod.Element.removeClasses = function(el, classNames) {
        return el.className = (" " + el.className + " ").replace(new RegExp(" (?:" + ("string" == typeof classNames ? classNames.split(" ") : classNames).join("|") + ") ", "g"), " ").trim(), 
        el;
    };
    var setAttributes = function(el, attrs) {
        for (var attr in attrs) el.setAttribute(attr, attrs[attr]);
        return el;
    };
    var hasAttribute = function(el, attr) {
        return el.hasAttribute(attr);
    };
    var hasAttributes = function(el, attrs) {
        var i = 0, r = [];
        if ("string" === typeof attrs) attrs = attrs.split(" ");
        for (;i < attrs.length; i++) if (el.hasAttribute(attrs[i])) r.push(attrs[i]);
        return r;
    };
    var getAttribute = function(el, attr, type) {
        var t, r = el.getAttribute(attr);
        if (!type) return r;
        switch (type) {
          case "int":
          case "integer":
            return parseInt(r);
            break;

          case "bool":
          case "boolean":
            t = null != r && "" != r ? r.trim().toLowerCase() : "false";
            return t.indexOf("true") !== -1 || "t" == t ? true : false;
        }
        return r;
    };
    var changeElementType = function(el, type, removeChildren) {
        var i = 0, doc = el.ownerDocument || jMod.Element.document, newElement = doc.createElement(type), attrs = el.attributes, nodes = el.childNodes, ElementPropertiesToCopy = [ "scrollLeft", "scrollTop" ];
        for (;i < attrs.length; i++) newElement.setAttributeNode(attrs[i]);
        for (i = 0; i < nodes.length; i++) if (removeChildren) newElement.appendChild(newElement.removeChild(nodes[i])); else newElement.appendChild(nodes[i]);
        for (i = 0; i < ElementPropertiesToCopy.length; i++) newElement[ElementPropertiesToCopy[i]] = el[ElementPropertiesToCopy[i]];
        return newElement;
    };
    var addEventListener = jMod.Element.addEventListener = function(el, eventName, handler, useCapture) {
        if (el.addEventListener) el.addEventListener(eventName, handler, useCapture ? true : false); else if (el.attachEvent) el.attachEvent("on" + eventName, handler); else el["on" + eventName] = handler;
    };
    var removeEventListener = jMod.Element.removeEventListener = function(el, eventName, handler, useCapture) {
        if (el.removeEventListener) el.removeEventListener(eventName, handler, useCapture ? true : false); else if (el.detachEvent) el.detachEvent("on" + eventName, handler); else el["on" + eventName] = null;
    };
    jMod.Element.viewportSize = {
        getHeight: function() {
            return this.getSize("Height");
        },
        getWidth: function() {
            return this.getSize("Width");
        },
        getSize: function(Name) {
            var size;
            var name = Name.toLowerCase();
            var win = window || unsafeWindow;
            var doc = jMod.Element.document;
            var head = jMod.Element.head;
            var documentElement = doc.documentElement;
            if (win["inner" + Name] === undefined) size = documentElement["client" + Name]; else if (win["inner" + Name] != documentElement["client" + Name]) {
                var bodyElement = doc.createElement("body");
                bodyElement.id = "vpw-test-b";
                bodyElement.style.cssText = "overflow:scroll";
                var divElement = doc.createElement("div");
                divElement.id = "vpw-test-d";
                divElement.style.cssText = "position:absolute;top:-1000px";
                divElement.innerHTML = "<style>@media(" + name + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + name + ":7px!important}}</style>";
                bodyElement.appendChild(divElement);
                documentElement.insertBefore(bodyElement, head);
                if (7 == divElement["offset" + Name]) size = documentElement["client" + Name]; else size = win["inner" + Name];
                documentElement.removeChild(bodyElement);
            } else size = win["inner" + Name];
            return size;
        }
    };
    function ElementBuilderClass(data) {
        this.data = data || {};
    }
    ElementBuilderClass.prototype = {
        appendChild: function(data) {
            var i, thisData = this.data, thisType = RealTypeOf(thisData), dataType = RealTypeOf(data);
            if ("array" == dataType) {
                for (i = 0; i < data.length; i++) this.appendChild(data[i]);
                return this;
            }
            if (isElement(thisData)) {
                if (isElement(data)) return thisData.appendChild(data), this;
                if ("ElementBuilderClass" == dataType) return thisData.appendChild(data.toElement()), 
                this;
            }
            if ("ElementBuilderClass" == thisType) return thisData.appendChild(data), this;
            if ("object" == typeof thisData) {
                i = thisData.innerHTML === undefined && thisData.text !== undefined ? "text" : "innerHTML";
                if ("array" == RealTypeOf(thisData[i])) thisData[i].push(data); else if (typeof thisData[i] == _undefined || null == thisData[i]) thisData[i] = [ data ]; else thisData[i] = [ thisData[i], data ];
                return this;
            }
            return this;
        },
        toElement: function() {
            if (isElement(this.data)) return this.data;
            return this.data = createNewElement(this.data);
        }
    };
    Object.defineProperties(ElementBuilderClass.prototype, {
        type: {
            get: function() {
                if (isElement(this.data)) return this.data.nodeName.toLowerCase(); else return this.data.type.toLowerCase();
            },
            set: function(newType) {
                if (isElement(this.data)) {
                    var parentElement = this.data.parentElement;
                    tmp = changeElementType(this.data, newType, true);
                    parentElement.replaceChild(tmp, this.data);
                    this.data = tmp;
                } else this.data.type = newType;
            },
            configurable: false,
            enumerable: true
        },
        children: {
            get: function() {
                if (isElement(this.data)) return this.data.children; else {
                    var i = this.data.innerHTML === undefined && this.data.text !== undefined ? "text" : "innerHTML";
                    return this.data[i] || null;
                }
            },
            configurable: false,
            enumerable: true
        }
    });
    var appendChild = jMod.Element.appendChild = function(el, data) {
        var nodes, dummy, i;
        try {
            if (!isElement(el) && "object" === typeof el && null != el.type) {
                i = el.innerHTML === undefined && el.text !== undefined ? "text" : "innerHTML";
                if ("array" == RealTypeOf(el[i])) el[i].push(data); else el[i] = [ el[i], data ];
            } else if (typeof data === _undefined || null === data) return el; else if (isElement(data)) el.appendChild(data); else switch (RealTypeOf(data)) {
              case _undefined:
              case "null":
                break;

              case "array":
                for (i = 0; i < data.length; i++) el = appendChild(el, data[i]);
                break;

              case "object":
              case "map":
                if (dummy = createNewElement(data)) el.appendChild(dummy);
                break;

              default:
                nodes, dummy = (el.ownerDocument || jMod.Element.document).createElement("div");
                dummy.innerHTML = data;
                nodes = dummy.childNodes;
                for (i = 0; i < nodes.length; i++) el.appendChild(nodes[i]);
            }
        } catch (e) {
            jModLogError(e, "jMod.Element.appendChild");
        } finally {
            return el;
        }
        return el;
    };
    var validElementProps = [ "id", "className", "checked", "defaultValue", "title", "async", "defer", "src", "onerror", "onload", "responseCallback", "value", "max", "min" ];
    var createNewElement = jMod.Element.createNewElement = function(data) {
        var i, x, eventName, capture, callback, event, eventListeners = data.EventListeners || data.eventListeners, doc = jMod.Element.document, newElement = doc.createElement(data.type || "div"), addListener = function(eventName, obj) {
            if ("function" === typeof obj) return addEventListener(newElement, eventName, obj);
            capture = obj.useCapture || obj.Capture || obj.capture || false;
            callback = obj.callback || obj["function"];
            if (callback) if ("array" == RealTypeOf(callback)) for (i in callback) {
                if ("function" !== typeof callback[i]) capture = callback[i].useCapture || callback[i].Capture || callback[i].capture || capture;
                addEventListener(newElement, eventName, callback[i], capture);
            } else addEventListener(newElement, eventName, callback, capture);
        };
        if ("string" === typeof data.style) newElement.setAttribute("style", data.style); else if ("object" === typeof data.style) for (i in data.style) newElement.style[i] = data.style[i];
        for (i = 0; i < validElementProps.length; i++) if (data[validElementProps[i]] !== undefined) newElement[validElementProps[i]] = data[validElementProps[i]];
        if (data.attributes !== undefined) for (i in data.attributes) if (null != data.attributes[i]) newElement.setAttribute(i, data.attributes[i]);
        if (eventListeners) for (eventName in eventListeners) {
            event = eventListeners[eventName];
            if ("array" == RealTypeOf(event)) for (x = 0; x < event.length; x++) addListener(eventName, event[x]); else addListener(eventName, event);
        }
        appendChild(newElement, data.innerHTML || data.text || null);
        return newElement;
    };
    var getOffset = jMod.Element.getOffset = function(el) {
        var box = el.getBoundingClientRect();
        var doc = el.ownerDocument;
        var docElem = doc.documentElement;
        var win = null != doc && doc === doc.window ? doc : 9 === doc.nodeType && doc.defaultView;
        return {
            top: parseInt(box.top + win.pageYOffset - docElem.clientTop),
            left: parseInt(box.left + win.pageXOffset - docElem.clientLeft),
            bottom: box.bottom,
            height: parseInt(box.height || parseInt(el.offsetHeight) - parseInt(el.clientHeight) + parseInt(el.scrollHeight)),
            width: parseInt(el.offsetWidth)
        };
    };
    var isNamespaced = jMod.Element.isNamespaced = function(el, className) {
        var parent = el;
        while (parent.parentElement) {
            parent = parent.parentElement;
            if (hasClass(parent, className)) return true;
        }
        return false;
    };
    var findParentWithClass = jMod.Element.findParentWithClass = function(el, className) {
        var parent = el;
        while (parent.parentElement) {
            parent = parent.parentElement;
            if (hasClass(parent, className)) return parent;
        }
    };
    var findParentWithAttribute = jMod.Element.findParentWithAttribute = function(el, attributeName, attributeValue) {
        var parent = el;
        while (parent.parentElement) {
            parent = parent.parentElement;
            if (parent.hasAttribute(attributeName) && (_undefined == typeof attributeValue || parent.getAttribute(attributeName) == attributeValue)) return parent;
        }
    };
    function fireClick(el, bubbles, cancelable) {
        var doc = jMod.Element.document;
        if (jMod.jQueryAvailable) $(el).click(); else if (doc.createEvent) {
            var evt = doc.createEvent("MouseEvents");
            evt.initEvent("click", bubbles || true, cancelable || true);
            el.dispatchEvent(evt);
        } else if (doc.createEventObject) el.fireEvent("onclick"); else if ("function" == typeof el.onclick) el.onclick();
    }
    jMod.Element.getCompStyleObj = function(el, pseudoEl) {
        var doc = el.ownerDocument || jMod.Element.document;
        if (el.currentStyle) return el.currentStyle; else if (doc.defaultView && doc.defaultView.getComputedStyle) return doc.defaultView.getComputedStyle(el, pseudoEl || null);
    };
    jMod.Element.getCompStyle = function() {
        var i = 0, arg, el, cssprop, pseudoEl, comp, doc;
        for (;i < arguments.length; i++) {
            arg = arguments[i];
            if (isElement(arg)) el = arg; else if ("string" == typeof arg) if (!cssprop) cssprop = arg; else pseudoEl = arg; else comp = arg;
        }
        if (comp) {
            if (comp[cssprop]) return comp[cssprop];
        } else {
            if (el.currentStyle) return el.currentStyle[cssprop];
            doc = el.ownerDocument || jMod.Element.document;
            if (doc.defaultView && doc.defaultView.getComputedStyle) {
                comp = doc.defaultView.getComputedStyle(el, pseudoEl || null);
                if (comp) return comp[cssprop] ? comp[cssprop] : comp.getPropertyValue(cssprop);
            }
        }
        return el ? el.style[cssprop] : null;
    };
    jMod.Element.getClientRect = function(el) {
        try {
            var comp, r = jMod.extend({}, el.getBoundingClientRect());
            if (null == r.height || null == r.width) {
                comp = jMod.Element.getCompStyleObj(el);
                r.height = parseFloat(jMod.Element.getCompStyle(el, "height", comp));
                r.width = parseFloat(jMod.Element.getCompStyle(el, "width", comp));
            }
            return r;
        } catch (e) {}
    };
    +function() {
        var win = window || unsafeWindow;
        var _requestAnimationFrameKey = win.requestAnimationFrame ? "requestAnimationFrame" : win.mozRequestAnimationFrame ? "mozRequestAnimationFrame" : win.webkitRequestAnimationFrame ? "webkitRequestAnimationFrame" : win.oRequestAnimationFrame ? "oRequestAnimationFrame" : win.msRequestAnimationFrame ? "msRequestAnimationFrame" : null;
        var _cancelAnimationFrameKey = win.cancelAnimationFrame ? "cancelAnimationFrame" : win.mozCancelAnimationFrame ? "mozCancelAnimationFrame" : win.webkitCancelAnimationFrame ? "webkitCancelAnimationFrame" : win.oCancelAnimationFrame ? "oCancelAnimationFrame" : win.msCancelAnimationFrame ? "msCancelAnimationFrame" : win.clearTimeout ? "clearTimeout" : null;
        jMod.Element.requestAnimationFrame = function(fn) {
            if (_requestAnimationFrameKey) try {
                return win[_requestAnimationFrameKey](fn);
            } catch (e) {}
            return win.setTimeout(fn, 17);
        };
        jMod.Element.cancelAnimationFrame = function(id) {
            if (_cancelAnimationFrameKey) return win[_cancelAnimationFrameKey](id);
        };
    }();
    +function() {
        function resetTriggers(element) {
            var triggers = element.__resizeTriggers__, expand = triggers.firstElementChild, contract = triggers.lastElementChild, expandChild = expand.firstElementChild;
            contract.scrollLeft = contract.scrollWidth;
            contract.scrollTop = contract.scrollHeight;
            expandChild.style.width = expand.offsetWidth + 1 + "px";
            expandChild.style.height = expand.offsetHeight + 1 + "px";
            expand.scrollLeft = expand.scrollWidth;
            expand.scrollTop = expand.scrollHeight;
        }
        function checkTriggers(element) {
            return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height;
        }
        function scrollListener(e) {
            var element = this;
            resetTriggers(this);
            if (this.__resizeRAF__) jMod.Element.cancelAnimationFrame(this.__resizeRAF__);
            this.__resizeRAF__ = jMod.Element.requestAnimationFrame(function() {
                if (checkTriggers(element)) {
                    element.__resizeLast__.width = element.offsetWidth;
                    element.__resizeLast__.height = element.offsetHeight;
                    element.__resizeListeners__.forEach(function(fn) {
                        fn.call(element, e);
                    });
                }
            });
        }
        jMod.Element.addResizeListener = function(el, fn) {
            if (el.attachEvent) el.attachEvent("onresize", fn); else {
                if (!el.__resizeTriggers__) {
                    if ("static" == (window || unsafeWindow).getComputedStyle(el, null).position) el.style.position = "relative";
                    el.__resizeLast__ = {};
                    el.__resizeListeners__ = [];
                    (el.__resizeTriggers__ = jMod.Element.document.createElement("div")).className = "resize-triggers";
                    el.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' + '<div class="contract-trigger"></div>';
                    el.appendChild(el.__resizeTriggers__);
                    resetTriggers(el);
                    el.addEventListener("scroll", scrollListener, true);
                    el.__resizeTriggers__.addEventListener("animationstart", function(e) {
                        if ("resizeanim" == e.animationName) resetTriggers(el);
                    });
                }
                el.__resizeListeners__.push(fn);
            }
        };
    }();
    jMod.CSS = '@-webkit-keyframes resizeanim{0%{opacity:0;}100%{opacity:0;}}@keyframes resizeanim{0%{opacity:0;}100%{opacity:0;}}.jmod-na .resize-triggers{-webkit-animation:1ms resizeanim;animation:1ms resizeanim;visibility:hidden;opacity:0;}.jmod-na .resize-triggers,.jmod-na .resize-triggers > div,.jmod-na .contract-trigger:before{content:" ";display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;}.jmod-na .resize-triggers > div{background:#eee;overflow:auto;}.jmod-na .contract-trigger:before{width:200%;height:200%;}';
    var LogFormatCSS = new function() {
        var _this = this, SansationFontFamily = 'font-family:"Sansation","Open Sans",Arial;', jModHeaderFontStyle = "font-size:175%;font-weight:300;" + SansationFontFamily, stripedBackground = "repeating-linear-gradient(-45deg, red, red 5px, transparent 5px, transparent 10px);background-size:auto 75% 100%, 0px 0px;";
        _this.time = "font-weight:bold;font-size:120%;color:red;";
        _this.stchange = "font-weight:bold;font-size:130%;color:blue;";
        _this.iconStyle = "" + "font-size:1.75em;" + "background-color: transparent;" + 'background-image:url("http://myuserjs.org/img/favicon/favicon.png");' + "background-clip: border-box;" + "background-position:left center;" + "background-size:auto 75%;" + "background-repeat: no-repeat;" + "letter-spacing: 20px;" + "white-space: pre;" + "display: run-in;";
        _this.logDefaultStyle = "display: run-in;";
        _this.logHeaderStyle = jModHeaderFontStyle;
        _this.logTitleStyle = "color:#000;font-size:125%;";
        _this.logTextStyle = "font-weight:bold;font-size:120%;color:#000;";
        _this.infoDefaultStyle = "display: run-in;";
        _this.infoHeaderStyle = jModHeaderFontStyle;
        _this.infoTitleStyle = "color:#000;font-size:125%;";
        _this.infoTextStyle = "font-weight:bold;font-size:120%;color:blue;";
        _this.warningDefaultStyle = "display: run-in;";
        _this.warningHeaderStyle = jModHeaderFontStyle;
        _this.warningTitleStyle = "color:#000;font-size:125%;";
        _this.warningTextStyle = "font-weight:bold;font-size:120%;color:red;";
        _this.errorDefaultStyle = "display: run-in;";
        _this.errorHeaderStyle = jModHeaderFontStyle + "color:red;";
        _this.errorTitleStyle = "color:#000;font-size:125%;";
        _this.errorLineStyle = "color:blue;";
    }();
    +function() {
        var i;
        var OUTPUT_TYPES = {
            ERROR: {
                level: 1,
                value: "error"
            },
            EXCEPTION: {
                level: 1,
                value: "exception"
            },
            WARNING: {
                level: 2,
                value: "warn"
            },
            INFO: {
                level: 3,
                value: "info"
            },
            LOG: {
                level: 4,
                value: "log"
            },
            DEBUG: {
                level: 5,
                value: "debug"
            }
        };
        var msgList = [ [ "Error", "ERROR" ], [ "logError", "ERROR" ], [ "Exception", "EXCEPTION" ], [ "Warning", "WARNING" ], [ "Info", "INFO" ], [ "Log", "LOG" ], [ "Debug", "DEBUG" ] ];
        var fnList = [ "assert", "clear", "count", "dir", "dirxml", "group", "groupCollapsed", "groupEnd", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace" ];
        var exportFunctions = [ "Debug", "Log", "Info", "Warning", "logError", "Exception" ];
        function isFirebug(ptr) {
            if (_undefined !== typeof ptr && _undefined !== typeof ptr.timeStamp) return true;
            return false;
        }
        function isWebConsole(ptr) {
            if ("console" == RealTypeOf(ptr)) return true;
            if (_undefined !== typeof ptr && !isFirebug(ptr) && _undefined === typeof ptr.dirxml && _undefined !== typeof ptr.trace) return true;
            return false;
        }
        function isConsole2(ptr) {
            if (_undefined !== typeof ptr && !isFirebug(ptr) && !isWebConsole(ptr) && _undefined === typeof ptr.dirxml && _undefined === typeof ptr.exception) return true;
            return false;
        }
        function checkConsole(fn) {
            if (fn(window.console)) return window.console;
            if (fn(console)) return console;
            if (fn(this.console)) return this.console;
            if (fn(unsafeWindow.console)) return unsafeWindow.console;
            if (fn(unsafeWindow.window.console)) return unsafeWindow.window.console;
            if (_undefined != typeof Console && fn(Console)) return Console;
            if (fn(this.Console)) return this.Console;
            if (fn(window.Console)) return window.Console;
            if (fn(unsafeWindow.Console)) return unsafeWindow.Console;
            if (fn(unsafeWindow.window.Console)) return unsafeWindow.window.Console;
            return undefined;
        }
        function getFB() {
            return checkConsole(isFirebug);
        }
        function getC2() {
            return checkConsole(isConsole2);
        }
        function getWC() {
            return checkConsole(isWebConsole);
        }
        function functionEnabled(name) {
            return jConfig("API.log.disabled").indexOf(name) == -1 && jConfig("API.log.verbosity_level") > 1;
        }
        jMod.isFormatted = function(command, value) {
            return [ "debug", "log", "info", "warn", "error", "exception" ].indexOf(command) != -1 && "string" == typeof value && /(?:\%s|\%c|\%o|\%d|\%f|\%\.\df|\%i)/.test(value);
        };
        jMod.log = API.log = {
            OUTPUT_TYPES: OUTPUT_TYPES,
            fb: undefined,
            c2: undefined,
            wc: undefined,
            fnList: [].concat(exportFunctions, fnList),
            updateFB: function(new_ptr) {
                if (isFirebug(new_ptr)) {
                    if (jConfig("API.log.debug")) console.info("jMod.API.log - Firebug Object: ", new_ptr);
                    this.fb = new_ptr;
                }
            },
            updateC2: function(new_ptr) {
                if (isConsole2(new_ptr)) {
                    if (jConfig("API.log.debug")) console.info("jMod.API.log - Console2 Object: ", new_ptr);
                    this.c2 = new_ptr;
                }
            },
            updateWC: function(new_ptr) {
                if (isWebConsole(new_ptr)) {
                    if (jConfig("API.log.debug")) console.info("jMod.API.log - Web Console Object: ", new_ptr);
                    this.wc = new_ptr;
                }
            },
            UpdateAll: function() {
                this.updateFB(getFB());
                this.updateC2(getC2());
                this.updateWC(getWC());
            },
            ScopedConsoleCommand: function(command, value) {
                var i = 0, ptr, cmd, args = arguments, order = [ "WebConsole", "Firebug" ], objs = {
                    Firebug: this.fb,
                    WebConsole: this.wc
                };
                if ([ "profile", "profileEnd", "error" ].indexOf(command) != -1 || !jConfig.API.log.WebConsole) order = [ "Firebug", "WebConsole" ];
                for (;i < order.length; i++) {
                    ptr = objs[order[i]];
                    cmd = ptr[command];
                    if (_undefined == typeof ptr || _undefined == typeof cmd) continue;
                    try {
                        if (ptr === this.fb) {
                            console.log("is fb");
                            if (!ptr._apply) {
                                var _apply = function(command, arg) {
                                    if (this && this.log && this[command]) try {
                                        this[command].apply(this, arg);
                                    } catch (ex) {
                                        console.log("fb _apply err", ex);
                                    } else console.log("no this", this, command);
                                };
                                if (unsafeWindow !== window) this.fb._apply = mExportFunction(_apply.bind(this.fb), unsafeWindow, {
                                    allowCallbacks: true,
                                    allowCrossOriginArguments: true
                                }); else this.fb._apply = _apply.bind(this.fb);
                            }
                            var tmp, tmp2;
                            try {
                                tmp = Slice.call(arguments, 1);
                            } catch (te) {
                                console.log("tmp error", te);
                                tmp = arguments;
                            }
                            try {
                                tmp2 = mCloneInto(tmp, unsafeWindow, {
                                    cloneFunctions: true,
                                    wrapReflectors: true
                                }, true);
                            } catch (te) {
                                console.log("tmp2 error", te);
                                tmp2 = tmp;
                            }
                            try {
                                console.log("_apply input", RealTypeOf(tmp2), tmp2);
                                return this.fb._apply.call(this.fb, command, tmp2);
                            } catch (te) {
                                console.log("_apply error", te);
                            }
                        }
                        switch (args.length) {
                          case 1:
                            return cmd.call(ptr);

                          case 2:
                            return cmd.call(ptr, args[1]);

                          case 3:
                            return cmd.call(ptr, args[1], args[2]);

                          case 4:
                            return cmd.call(ptr, args[1], args[2], args[3]);

                          case 5:
                            return cmd.call(ptr, args[1], args[2], args[3], args[4]);

                          case 6:
                            return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5]);

                          case 7:
                            return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6]);

                          case 8:
                            return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7]);

                          case 9:
                            return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);

                          case 10:
                            return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);

                          case 11:
                            return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10]);

                          case 12:
                            return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11]);

                          case 13:
                            return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12]);

                          case 14:
                            return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13]);

                          case 15:
                            return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14]);

                          case 16:
                            return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15]);

                          case 17:
                            return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15], args[16]);

                          case 18:
                            return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15], args[16], args[17]);

                          default:
                            return false;
                        }
                        return true;
                    } catch (e) {
                        console.log("log error", e);
                    }
                }
                return false;
            },
            ConsoleCommand: function(command, value) {
                try {
                    var i = 0, key, order = [ "WebConsole", "Firebug" ], args = Slice.call(arguments, 1), objs = {
                        Firebug: this.fb,
                        WebConsole: this.wc
                    };
                    var safeArgs = mCloneInto(args, unsafeWindow, {
                        cloneFunctions: true,
                        wrapReflectors: true
                    });
                    if ([ "profile", "profileEnd", "error" ].indexOf(command) != -1 || !jConfig.API.log.WebConsole) order = [ "Firebug", "WebConsole" ];
                    for (;i < order.length; i++) {
                        key = order[i];
                        if (null != objs[key] && typeof objs[key][command] !== _undefined && jConfig.API.log[key]) {
                            try {
                                return objs[key][command].apply(objs[key], args);
                            } catch (e) {}
                            try {
                                return objs[key][command].apply(objs[key], safeArgs);
                            } catch (e) {}
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
                return false;
            },
            outputMessage: function(output_type, str) {
                if (output_type.level <= jConfig("API.log.verbosity_level")) this.ConsoleCommand.apply(this, [ output_type.value ].concat(Slice.call(arguments, 1)));
            },
            fmt: LogFormatCSS
        };
        for (i = 0; i < msgList.length; i++) API.log[msgList[i][0]] = function(oType) {
            return function() {
                return this.outputMessage.apply(this, [ OUTPUT_TYPES[oType] ].concat(Slice.call(arguments)));
            }.bind(API.log);
        }(msgList[i][1]);
        for (i = 0; i < fnList.length; i++) API.log[fnList[i]] = function(fName) {
            return function() {
                if (functionEnabled(fName)) return this.ConsoleCommand.apply(this, [ fName ].concat(Slice.call(arguments)));
            }.bind(API.log);
        }(fnList[i]);
        for (i = 0; i < exportFunctions.length; i++) jMod[exportFunctions[i]] = jMod.log[exportFunctions[i]].bind(API.log);
        API.logFormatBuilder = function() {
            this.args = [];
            var addLine = function(value, type, style) {
                var isUndef = _undefined === typeof value, origType = typeof type;
                if (typeof type === _undefined) type = typeof value;
                var fmtType;
                switch (type) {
                  case "d":
                  case "%d":
                    fmtType = "%d";
                    break;

                  case "i":
                  case "%i":
                    fmtType = "%i";
                    break;

                  case "f":
                  case "%f":
                    fmtType = "%.2f";
                    break;

                  case "number":
                    if (parseInt(value) === value && value === +value) {
                        fmtType = "%d";
                        value = parseInt(value);
                    } else {
                        fmtType = "%.2f";
                        value = parseFloat(value);
                    }
                    break;

                  case "s":
                  case "%s":
                    if ("\n" == value || " \n" == value) {
                        fmtType = " \n";
                        value = undefined;
                        style = undefined;
                        isUndef = false;
                    } else fmtType = "%s";
                    break;

                  case "string":
                    fmtType = value;
                    value = undefined;
                    isUndef = false;
                    break;

                  case "o":
                  case "%o":
                    fmtType = "%o";
                    break;

                  case "object":
                  default:
                    if (origType == _undefined && _undefined == typeof style) fmtType = ""; else fmtType = "%o";
                }
                this.args.push({
                    valueIsUndefined: isUndef,
                    value: value,
                    fmtString: fmtType,
                    style: style
                });
            };
            this.add = function() {
                var i = 0, var0 = arguments[0];
                if (1 == arguments.length && "array" == RealTypeOf(var0)) for (;i < var0.length; i++) addLine.apply(this, var0[i]); else addLine.apply(this, Slice.call(arguments));
            };
            this.build = function() {
                var fmtString = "";
                var arr = [];
                for (var i = 0; i < this.args.length; i++) {
                    fmtString += ("undefined" !== typeof this.args[i].style ? "%c" : "") + this.args[i].fmtString;
                    if ("undefined" !== typeof this.args[i].style) arr.push("" != this.args[i].style ? this.args[i].style : " ");
                    if ("undefined" !== typeof this.args[i].value || this.args[i].valueIsUndefined) arr.push(this.args[i].value);
                }
                return [ fmtString ].concat(arr);
            };
            if (arguments.length > 0) this.add.apply(this, arguments);
        };
        jMod.log.UpdateAll();
    }();
    var jModLogError = function() {
        var i = 3, e = arguments[0], title = arguments[1], message;
        try {
            message = arguments[2];
        } catch (x) {}
        if (!(e && e instanceof Error)) {
            message = title;
            title = e;
            e = undefined;
            i = 2;
        }
        var errorDefaultStyle = LogFormatCSS.errorDefaultStyle;
        var fmtBuild = new API.logFormatBuilder([ [ "  ", "%s", errorDefaultStyle + LogFormatCSS.iconStyle ], [ "jMod", "string", errorDefaultStyle + LogFormatCSS.errorHeaderStyle ], [ " - ", "string", errorDefaultStyle ], [ title || " ", "%s", errorDefaultStyle + LogFormatCSS.errorTitleStyle ], [ " \n", "string" ], [ message || "", "%s", errorDefaultStyle + "color:red;" ] ]);
        for (;i < arguments.length; i++) fmtBuild.add([ [ " \n", "string" ], [ arguments[i], "string" == typeof arguments[i] ? "string" : "object", "color:red;" ] ]);
        if (typeof e != _undefined && null != e) fmtBuild.add([ [ " \n", "string" ], [ e.message + " ", "%s", errorDefaultStyle + "color:red;" ], [ e.lineNumber, "%s", errorDefaultStyle + LogFormatCSS.errorLineStyle + "color:red;" ], [ " \n", "string", " " ], [ e && e.err ? e.err : e, "%0", "color:red;" ] ]);
        try {
            jMod.logError.apply(jMod.log, fmtBuild.build());
        } catch (e) {}
    };
    var jModLogWarning = function(title, text) {
        if (jMod.log.OUTPUT_TYPES.WARNING.level > jConfig("API.log.verbosity_level")) return;
        var i = 2, warningDefaultStyle = LogFormatCSS.warningDefaultStyle, fmtBuild = new API.logFormatBuilder([ [ "  ", "%s", warningDefaultStyle + LogFormatCSS.iconStyle ], [ "jMod Warning", "string", warningDefaultStyle + LogFormatCSS.warningHeaderStyle ] ]);
        if (_undefined !== typeof text) fmtBuild.add([ [ " - ", "string", warningDefaultStyle ], [ title || " ", "%s", warningDefaultStyle + LogFormatCSS.warningTitleStyle ], [ " \n", "string" ], [ text || "", "%s", warningDefaultStyle + LogFormatCSS.warningTextStyle ] ]); else fmtBuild.add([ [ " \n", "string" ], [ title || "", "%s", warningDefaultStyle + LogFormatCSS.warningTextStyle ] ]);
        if (arguments.length > 2) fmtBuild.add(" \n", "string");
        for (i; i < arguments.length; i++) fmtBuild.add(arguments[i]);
        jMod.Warning.apply(jMod.log, fmtBuild.build());
    };
    var jModLogInfo = function(title, text) {
        if (jMod.log.OUTPUT_TYPES.INFO.level > jConfig("API.log.verbosity_level")) return;
        var i = 2, infoDefaultStyle = LogFormatCSS.infoDefaultStyle, fmtBuild = new API.logFormatBuilder([ [ "  ", "%s", infoDefaultStyle + LogFormatCSS.iconStyle ], [ "jMod", "string", infoDefaultStyle + LogFormatCSS.infoHeaderStyle ] ]);
        if (_undefined !== typeof text) fmtBuild.add([ [ " - ", "string", infoDefaultStyle ], [ title || " ", "%s", infoDefaultStyle + LogFormatCSS.infoTitleStyle ], [ " \n", "string" ], [ text || "", "%s", infoDefaultStyle + LogFormatCSS.infoTextStyle ] ]); else fmtBuild.add([ [ " \n", "string" ], [ title || "", "%s", infoDefaultStyle + LogFormatCSS.infoTextStyle ] ]);
        if (arguments.length > 2) fmtBuild.add(" \n", "string");
        for (i; i < arguments.length; i++) fmtBuild.add(arguments[i]);
        jMod.Info.apply(jMod.log, fmtBuild.build());
    };
    var jModLog = function(title, text) {
        if (jMod.log.OUTPUT_TYPES.LOG.level > jConfig("API.log.verbosity_level")) return;
        var i = 2, logDefaultStyle = LogFormatCSS.infoDefaultStyle, fmtBuild = new API.logFormatBuilder([ [ "  ", "%s", logDefaultStyle + LogFormatCSS.iconStyle ], [ "jMod", "string", logDefaultStyle + LogFormatCSS.logHeaderStyle ] ]);
        if (_undefined !== typeof text) fmtBuild.add([ [ " - ", "string", logDefaultStyle ], [ title || " ", "%s", logDefaultStyle + LogFormatCSS.logTitleStyle ], [ " \n", "string" ], [ text || "", "%s", logDefaultStyle + LogFormatCSS.logTextStyle ] ]); else fmtBuild.add([ [ " \n", "string" ], [ title || "", "%s", logDefaultStyle + LogFormatCSS.logTextStyle ] ]);
        if (arguments.length > 2) fmtBuild.add(" \n", "string");
        for (i; i < arguments.length; i++) fmtBuild.add(arguments[i]);
        jMod.Log.apply(jMod.log, fmtBuild.build());
    };
    var jModLogTime = function(title, prefix, suffix) {
        if (jMod.log.OUTPUT_TYPES.INFO.level > jConfig("API.log.verbosity_level")) return;
        var text = (prefix || "") + jMod.timeElapsed.toFixed(2) + "ms" + (suffix || "");
        var infoDefaultStyle = LogFormatCSS.infoDefaultStyle;
        var fmtBuild = new API.logFormatBuilder([ [ "  ", "%s", infoDefaultStyle + LogFormatCSS.iconStyle ], [ "jMod", "string", infoDefaultStyle + LogFormatCSS.infoHeaderStyle ], [ " - ", "string", infoDefaultStyle ], [ title || " ", "%s", infoDefaultStyle + LogFormatCSS.infoTitleStyle ], [ " ", "string" ], [ text, "%s", infoDefaultStyle + LogFormatCSS.time ] ]);
        jMod.Info.apply(jMod.log, fmtBuild.build());
    };
    jMod.log.Info("Loading jMod API v" + jMod.version + " " + jMod.build_type + (jMod.debug ? " (debug enabled)" : "") + " - " + new Date(parseInt(jMod.build_time)).toString());
    if (jMod.debug) {
        jModLogTime("jMod Init Start Time");
        jMod.log.group("jMod Start");
        if (jConfig.script.script_info) jModLogInfo("ScriptInfo.set", "Get Script_Info Successful!!", jConfig.script.script_info);
        jMod.log.group("jMod Initialize");
        if (CurrentRunningScript.el) jMod.Info("CurrentRunningScript", CurrentRunningScript);
    }
    jMod.Events = {
        e: {},
        fired: {},
        addEvent: function(name, recordEvent) {
            this.e[name] = {
                recordEvent: typeof recordEvent !== _undefined ? recordEvent : true,
                listeners: []
            };
            Object.defineProperty(jMod, name, new function(propName) {
                return {
                    set: function(callback) {
                        jMod["Events"]["addListener"](propName, callback);
                    },
                    get: function() {
                        return typeof jMod.Events.fired[propName] !== _undefined;
                    },
                    enumerable: false
                };
            }(name));
        },
        addListener: function(name, callback, fireRecorded) {
            this.e[name].listeners.push(callback);
            fireRecorded = typeof fireRecorded !== _undefined ? fireRecorded : true;
            if (fireRecorded && typeof this.fired[name] !== _undefined && typeof this.fired[name].args !== _undefined) callback.apply(this.fired[name]._this, this.fired[name].args);
        },
        fire: function(name, data) {
            if (typeof this.e[name] !== _undefined) {
                if (typeof this.fired[name] === _undefined) this.fired[name] = {
                    count: 0,
                    args: undefined,
                    _this: null
                };
                var args;
                var _this = null;
                if ("object" == typeof data && typeof data._this !== _undefined && typeof data.args !== _undefined) {
                    _this = data._this;
                    args = data.args;
                } else args = Slice.call(arguments, 1);
                if (this.e[name].recordEvent) {
                    this.fired[name].args = args;
                    this.fired[name]._this = _this;
                }
                var putBack = [];
                while (i = this.e[name].listeners.pop()) if (!i.apply(_this, args)) putBack.push(i);
                this.e[name].listeners = putBack;
                this.fired[name].count++;
            }
        }
    };
    jMod["Events"]["addEvent"]("onDOMReady");
    jMod["Events"]["addEvent"]("onReady");
    jMod["Events"]["addEvent"]("onPageReady");
    jMod["Events"]["addEvent"]("onPerformanceReady");
    jMod["Events"]["addEvent"]("load");
    jMod["Events"]["addEvent"]("DOMContentLoaded");
    jMod["Events"]["addEvent"]("onreadystatechange");
    jMod["Events"]["addEvent"]("afterscriptexecute", false);
    jMod["Events"]["addEvent"]("beforescriptexecute", false);
    var EventsClass = function(_events) {
        var listeners = {};
        this.events = _events || [];
        this.add = function(group, eventName, callback) {
            if (this.events.indexOf(eventName) == -1) this.events.push(eventName);
            if (typeof listeners[group] === _undefined) listeners[group] = {};
            if (typeof listeners[group][eventName] === _undefined) listeners[group][eventName] = [];
            listeners[group][eventName].push(callback);
        };
        this.addAll = function(data, group) {
            for (var evt in this.events) if ("function" === typeof data[this.events[evt]]) this.add(group, this.events[evt], data[this.events[evt]]);
        };
        this.getAll = function(group, eventName) {
            if (eventName) {
                if (listeners[group] && listeners[group][eventName]) return listeners[group][eventName];
            } else return listeners[group];
        };
        this.fire = function(eventName, group, _this, args) {
            var _args, i, evt, group = listeners[group || "0"];
            _args = "array" == RealTypeOf(args) ? args : [ args ];
            if (arguments.length > 4) _args = _args.concat(Slice.call(arguments, 4));
            try {
                if (typeof group !== _undefined && typeof (evt = group[eventName]) !== _undefined) for (i in evt) if (false === evt[i].apply(_this || null, _args || [])) {
                    console.log("fire canceled");
                    return false;
                }
            } catch (e) {
                jModLogError(e, "jMod.EventsClass.fire");
            }
        };
    };
    jMod.Observer = function() {
        this.filters = [];
        this.addFilter = function(callback, data, fireOnce) {
            this.filters.push({
                callback: callback,
                data: data,
                fireOnce: true === fireOnce ? true : false
            });
        };
        this.filterMutation = function(mutation) {
            var filterData, _continue, tmp, x, i = 0;
            for (i; i < this.filters.length; i++) {
                filterData = this.filters[i].data;
                _continue = false;
                if (filterData.type) {
                    if ("string" === typeof filterData.type) filterData.type = [ filterData.type ];
                    if (filterData.type.indexOf(mutation.type) == -1) continue;
                }
                if ("object" === typeof filterData.target) {
                    if (filterData.target.hasClass) {
                        if ("string" === typeof filterData.target.hasClass) filterData.target.hasClass = [ filterData.target.hasClass ];
                        for (x = 0; x < filterData.target.hasClass.length; x++) if (!hasClass(mutation.target, filterData.target.hasClass[x])) {
                            _continue = true;
                            break;
                        }
                        if (_continue) continue;
                    }
                    if (filterData.target.hasChildren) {
                        if ("string" === typeof filterData.target.hasChildren) filterData.target.hasChildren = [ filterData.target.hasChildren ];
                        for (x = 0; x < filterData.target.hasChildren.length; x++) {
                            tmp = jMod.$$(filterData.target.hasChildren[x], mutation.target);
                            if (!tmp || 0 == tmp.length) {
                                _continue = true;
                                break;
                            }
                        }
                        if (_continue) continue;
                    }
                }
                this.filters[i].callback(mutation, this);
                if (this.filters[i].fireOnce) return;
            }
        };
        this.MutationObserver = new MutationObserver(function(mutations) {
            for (var i = 0; i < mutations.length; i++) this.filterMutation(mutations[i]);
        });
        this.observe = function(target, config) {
            this.MutationObserver.observe(target, config || {
                childList: true,
                attributes: true,
                characterData: true,
                subtree: true
            });
        };
        this.disconnect = function() {
            this.MutationObserver.disconnect();
        };
    };
    jMod.FileSelector = function(data) {
        var _this = this;
        _this.events = {
            change: []
        };
        if (data.onChange) _this.events.change.push(data.onChange);
        _this.onChange = function(e) {
            for (var i = 0; i < _this.events.change.length; i++) _this.events.change[i].call(this || _this || jMod, e, _this.files(), _this.value());
        };
        _this.click = function(bubbles, cancelable) {
            return fireClick(_this.buttonTriggerElement, _undefined !== typeof bubbles ? bubbles : true, _undefined !== typeof cancelable ? cancelable : true);
        };
        _this.files = function() {
            return _this.inputElement.files;
        };
        _this.value = function() {
            return _this.inputElement.value;
        };
        var inputElementOpts = {
            type: "input",
            attributes: {
                type: "file",
                multiple: data.multiple ? true : false
            },
            style: {
                position: "absolute",
                opacity: "0",
                "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)",
                filter: "alpha(opacity=0)",
                width: "0"
            },
            EventListeners: {
                change: _this.onChange
            }
        };
        if (data.defaultValue) inputElementOpts.defaultValue = data.defaultValue;
        if (data.accept) inputElementOpts.attributes.accept = data.accept;
        _this.inputElement = createNewElement(inputElementOpts);
        var buttonTriggerElementOpts = {
            type: "button",
            EventListeners: {
                click: function(e) {
                    console.log("Button click triggered");
                    var fileInput = this.previousSibling;
                    fileInput.focus();
                    fireClick(fileInput);
                    eventCancel(e);
                    return false;
                }
            }
        };
        if ("object" == typeof data.button) {
            if (data.button.type) delete data.button.type;
            if (data.button.EventListeners && data.button.EventListeners.click) delete data.button.EventListeners.click;
            buttonTriggerElementOpts = jMod.extend(true, buttonTriggerElementOpts, data.button);
        }
        _this.buttonTriggerElement = createNewElement(buttonTriggerElementOpts);
        var formElementOpts = jMod.extend(true, data.form || {}, {
            type: "form",
            innerHTML: [ _this.inputElement, _this.buttonTriggerElement ]
        });
        _this.formElement = createNewElement(formElementOpts);
        jMod.FileSelector.FileSelectorForms.push(_this.formElement);
    };
    jMod.FileSelector.FileSelectorForms = [];
    jMod.FileSelector.FileReadSupport = function() {
        return window.File && window.FileReader;
    };
    jMod.FileSelector.BlobSupport = function() {
        return window.File && window.Blob;
    };
    jMod.FileSelector.ReadFileAsText = function(file, callback, error_callback) {
        if (!jMod.FileSelector.FileReadSupport) {
            if (jMod.debug) console.log("Error! No Support For File Reading!");
            return false;
        }
        var r = new FileReader();
        if (file) {
            r.onload = function(e) {
                return callback.call(this || jMod, e, e.target.result, file);
            };
            r.onerror = function(e) {
                if (jMod.debug) console.log("Error reading file", file);
                return (error_callback || callback)(e, undefined, file);
            };
            r.readAsText(file);
            return true;
        } else {
            if (jMod.debug) console.log("Error reading file", file);
            (error_callback || callback)(e, undefined, file);
        }
        return false;
    };
    jMod.FileSelector.ReadFileAsURL = function(file, callback, error_callback) {
        if (!jMod.FileSelector.FileReadSupport) {
            if (jMod.debug) console.log("Error! No Support For File Reading!");
            return false;
        }
        var r = new FileReader();
        if (file) {
            r.onload = function(e) {
                return callback.call(this || jMod, e, e.target.result, file);
            };
            r.onerror = function(e) {
                if (jMod.debug) console.log("Error reading file", file);
                return (error_callback || callback)(e, undefined, file);
            };
            r.readAsDataURL(file);
            return true;
        } else {
            if (jMod.debug) console.log("Error reading file", file);
            (error_callback || callback)(e, undefined, file);
        }
        return false;
    };
    jMod.FileSelector.ReadFileAsJSON = function(file, callback, error_callback) {
        return jMod.FileSelector.ReadFileAsText(file, function(e, content, _file) {
            if (content && "" != content) try {
                return callback(e, JSON.parse(content), _file);
            } catch (err) {
                if (jMod.debug) console.log("Error! Cannot parse json file!", err, _file);
                return (error_callback || callback)(e, undefined, _file);
            } else {
                if (jMod.debug) console.log("Error! JSON file is empty!", _file);
                return (error_callback || callback)(e, undefined, _file);
            }
        });
    };
    var addStyle = jMod.API.addStyle = function(css) {
        if (css && "" != css) {
            if (typeof GM_addStyle !== _undefined) return GM_addStyle(css) || true;
            var style, head = jMod.Element.head;
            if (head) {
                style = jMod.Element.document.createElement("style");
                try {
                    style.innerHTML = css;
                } catch (x) {
                    style.innerText = css;
                }
                style.type = "text/css";
                return head.appendChild(style);
            } else if (jMod.debug) jModLogWarning("jMod.API.addStyle", "Could not add css", css);
        }
    };
    jMod.API.addStylesheet = function(url) {
        var style, head = jMod.Element.head;
        if (head) {
            style = jMod.Element.document.createElement("link");
            style.setAttribute("rel", "stylesheet");
            style.href = url;
            return head.appendChild(style);
        } else if (jMod.debug) jModLogWarning("jMod.API.addStylesheet", "Could not add stylesheet", url);
    };
    jMod.API.importStylesheet = function(url) {
        jMod.CSS = "@import url(" + url + ");\n";
    };
    jMod.API.addScript = function(js, src, id, type, async, defer) {
        var newScript, head = jMod.Element.head, data;
        if ("object" === typeof js) data = js; else data = {
            js: js,
            src: src,
            id: id,
            type: type,
            async: async,
            defer: defer
        };
        if (head) {
            newScript = jMod.Element.document.createElement("script");
            if (typeof data.id !== _undefined) try {
                newScript.id = data.id;
            } catch (x) {}
            if (typeof data.async !== _undefined) newScript.async = data.async;
            if (typeof data.defer !== _undefined) newScript.defer = data.defer;
            if (typeof data.onload !== _undefined) newScript.onload = data.onload;
            if (typeof data.onerror !== _undefined) newScript.onerror = data.onerror;
            newScript.type = data.type || "text/javascript";
            if (typeof data.js != _undefined && null != data.js && "" != data.js) try {
                newScript.innerHTML = data.js;
            } catch (x) {
                newScript.innerText = data.js;
            }
            if (typeof data.src != _undefined && null != data.src && "" != data.src) try {
                newScript.src = data.src;
            } catch (x) {}
            try {
                return head.appendChild(newScript);
            } catch (x) {}
        }
        return null;
    };
    jMod.API.contentEval = function(source) {
        if ("function" == typeof source) source = "(" + source + ")();";
        var doc = jMod.Element.document, head = jMod.Element.head, script = doc.createElement("script");
        script.setAttribute("type", "application/javascript");
        script.textContent = source;
        head.appendChild(script);
        head.removeChild(script);
    };
    +function() {
        function parseCookieValue(s) {
            if (0 === s.indexOf('"')) s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
            try {
                s = decodeURIComponent(s.replace(/\+/g, " "));
                return jMod.API.Cookie.defaults.JSON ? JSON.parse(s) : s;
            } catch (e) {}
        }
        function read(s, converter) {
            var value = parseCookieValue(s);
            return "function" == typeof converter ? converter(value) : value;
        }
        var isDate = function(date) {
            return "Invalid Date" !== new Date(date) && !isNaN(new Date(date));
        };
        jMod.API.Cookie = function(key, value, options) {
            var i, parts, name, cookie, cookies, tmp, doc = jMod.Element.document, result = key ? undefined : {}, defaults = jMod.API.Cookie.defaults;
            if (!doc) {
                jModLogWarning("jMod.API.Cookie", "No document available");
                return;
            }
            if (arguments.length > 1 && "function" != typeof value) {
                options = jMod.extend({}, defaults, options);
                switch (jMod.RealTypeOf(options.expires)) {
                  case "number":
                    tmp = options.expires;
                    i = options.expires = new Date();
                    i.setTime(+i + 864e5 * tmp);
                    break;

                  case "string":
                    try {
                        options.expires = Date.parse(options.expires);
                    } catch (e) {
                        jModLogError(e, "jMod.API.Cookie", "Invalid Exp Date");
                        return;
                    }
                    break;

                  case "invaliddate":
                    jModLogError(e, "jMod.API.Cookie", "Invalid Exp Date");
                    return;

                  case "date":
                    break;

                  default:
                    options.expires = defaults.expires;
                }
                if (defaults.JSON) try {
                    cookie = encodeURIComponent(JSON.stringify(value));
                } catch (e) {
                    cookie = undefined;
                }
                if (_undefined == typeof cookie) cookie = encodeURIComponent(String(value));
                return doc.cookie = [ encodeURIComponent(key), "=", cookie, options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : "" ].join("");
            }
            cookies = doc.cookie ? doc.cookie.split("; ") : [];
            for (i = 0, l = cookies.length; i < l; i++) {
                parts = cookies[i].split("=");
                name = decodeURIComponent(parts.shift());
                cookie = parts.join("=");
                if (key && key === name) {
                    result = read(cookie, value);
                    break;
                }
                if (!key) {
                    var tmp = read(cookie) || cookie;
                    if (tmp) result[name] = tmp;
                }
            }
            return result;
        };
        jMod.API.Cookie.defaults = {
            expires: Date.parse("Jan 1, 2020"),
            JSON: true
        };
        jMod.API.Cookie.remove = function(key, options) {
            if (jMod.API.Cookie === undefined) return false;
            jMod.API.Cookie(key, "", jMod.extend({}, options || {}, {
                expires: -1
            }));
            return !jMod.API.Cookie(key);
        };
    }();
    jMod.API.GM_Storage = {
        available: function() {
            return typeof GM_getValue !== _undefined && typeof GM_setValue !== _undefined && typeof GM_deleteValue !== _undefined;
        },
        getValue: function(key, def) {
            return this.available() ? GM_getValue(jConfig("API.Storage.prefix") + key, def) : def;
        },
        setValue: function(key, value) {
            if (this.available()) return GM_setValue(jConfig("API.Storage.prefix") + key, value);
        },
        setJSON: function(key, value) {
            var tmp;
            try {
                tmp = JSON.stringify(value);
            } catch (e) {
                jModLogError(e, "GM_Storage.setJSON", "Cannot stringify value!");
            }
            try {
                return this.setValue(key, tmp || value);
            } catch (e) {}
        },
        getJSON: function(key, def) {
            var tmp = this.getValue(key, def);
            try {
                if ("string" === typeof tmp) return JSON.parse(tmp);
            } catch (e) {
                jModLogError(e, "GM_Storage.setJSON", "Error parsing value!");
            }
            return tmp || def;
        },
        deleteValue: function(key) {
            if (this.available()) return GM_deleteValue(jConfig("API.Storage.prefix") + key);
        }
    };
    jMod.API.localStorage = {
        available: function() {
            try {
                var s = this.stor;
                if (_undefined !== typeof s && null != s && s.getItem && s.setItem) return true;
            } catch (e) {}
            return false;
        },
        getValue: function(key, def) {
            if (!this.available()) return def;
            try {
                var r = this.stor.getItem(jConfig("API.Storage.prefix") + key);
                return null !== r ? r : def;
            } catch (e) {}
            return def;
        },
        setValue: function(key, value) {
            if (!this.available()) return;
            try {
                return this.stor.setItem(jConfig("API.Storage.prefix") + key, value);
            } catch (e) {}
        },
        setJSON: function(key, value) {
            if (!this.available()) return;
            var tmp;
            try {
                tmp = JSON.stringify(value);
            } catch (e) {
                jModLogError(e, "localStorage.setJSON", "Cannot stringify value!");
            }
            try {
                return this.setValue(key, tmp || value);
            } catch (e) {}
        },
        getJSON: function(key, def) {
            if (!this.available()) return def;
            var tmp;
            try {
                tmp = this.getValue(key, def);
            } catch (e) {}
            try {
                if ("string" === typeof tmp) return JSON.parse(tmp);
            } catch (e) {
                jModLogError(e, "localStorage.setJSON", "Error parsing value!");
            }
            return tmp || def;
        },
        deleteValue: function(key) {
            if (!this.available()) return;
            try {
                return this.stor.removeItem(jConfig("API.Storage.prefix") + key);
            } catch (e) {}
        }
    };
    Object.defineProperty(jMod.API.localStorage, "stor", {
        get: function() {
            try {
                return window.localStorage && null != window.localStorage ? window.localStorage : _undefined !== typeof localStorage && null != localStorage ? localStorage : unsafeWindow.localStorage && null != unsafeWindow.localStorage ? unsafeWindow.localStorage : undefined;
            } catch (e) {
                jModLogWarning("jMod.API.localStorage", "localStorage unavailable!", e.message);
            }
        },
        enumerable: false
    });
    jMod.API.sessionStorage = {
        available: function() {
            try {
                var s = this.stor;
                if (_undefined !== typeof s && null != s && s.getItem && s.setItem) return true;
            } catch (e) {}
            return false;
        },
        getValue: function(key, def) {
            if (!this.available()) return def;
            try {
                var r = this.stor.getItem(jConfig("API.Storage.prefix") + key);
                return null !== r ? r : def;
            } catch (e) {}
            return def;
        },
        setValue: function(key, value) {
            if (!this.available()) return;
            try {
                return this.stor.setItem(jConfig("API.Storage.prefix") + key, value);
            } catch (e) {}
        },
        setJSON: function(key, value) {
            if (!this.available()) return;
            var tmp;
            try {
                tmp = JSON.stringify(value);
            } catch (e) {
                jModLogError(e, "sessionStorage.setJSON", "Cannot stringify value!");
            }
            try {
                return this.setValue(key, tmp || value);
            } catch (e) {}
        },
        getJSON: function(key, def) {
            if (!this.available()) return def;
            var tmp;
            try {
                tmp = this.getValue(key, def);
            } catch (e) {}
            try {
                if ("string" === typeof tmp) return JSON.parse(tmp);
            } catch (e) {
                jModLogError(e, "sessionStorage.setJSON", "Error parsing value!");
            }
            return tmp || def;
        },
        deleteValue: function(key) {
            if (!this.available()) return;
            try {
                return this.stor.removeItem(jConfig("API.Storage.prefix") + key);
            } catch (e) {}
        }
    };
    Object.defineProperty(jMod.API.sessionStorage, "stor", {
        get: function() {
            try {
                return window.localStorage && null != window.localStorage ? window.localStorage : _undefined !== typeof localStorage && null != localStorage ? localStorage : unsafeWindow.localStorage && null != unsafeWindow.localStorage ? unsafeWindow.localStorage : undefined;
            } catch (e) {
                jModLogWarning("jMod.API.sessionStorage", "sessionStorage unavailable!", e.message);
            }
        },
        enumerable: false
    });
    +function() {
        var storageEngineOrder = function() {
            var order = [], engine = jConfig("API.Storage.engine"), gm = "GM_Storage", ls = "localStorage", ss = "sessionStorage";
            try {
                try {
                    if (API[engine] && API[engine].available()) order = [ engine ];
                } catch (e) {}
                if (order.indexOf(gm) == -1 && API[gm].available()) order.push(gm);
                if (order.indexOf(ls) == -1 && API[ls].available()) order.push(ls);
                if (order.indexOf(ss) == -1 && API[ss].available()) order.push(ss);
            } catch (e) {}
            return order;
        };
        jMod.getValue = function(key, def) {
            var i = 0, storageEngines = storageEngineOrder();
            for (;i < storageEngines.length; i++) try {
                return API[storageEngines[i]].getValue.apply(API[storageEngines[i]], arguments);
            } catch (e) {}
            return def;
        };
        jMod.setValue = function(key) {
            var i = 0, storageEngines = storageEngineOrder();
            for (;i < storageEngines.length; i++) try {
                return API[storageEngines[i]].setValue.apply(API[storageEngines[i]], arguments);
            } catch (e) {}
        };
        jMod.getJSON = function(key, def) {
            var i = 0, storageEngines = storageEngineOrder();
            for (;i < storageEngines.length; i++) try {
                return API[storageEngines[i]].getJSON.apply(API[storageEngines[i]], arguments);
            } catch (e) {}
            return def;
        };
        jMod.setJSON = function(key) {
            var i = 0, storageEngines = storageEngineOrder();
            for (;i < storageEngines.length; i++) try {
                return API[storageEngines[i]].setJSON.apply(API[storageEngines[i]], arguments);
            } catch (e) {}
        };
        jMod.deleteValue = function(key) {
            var i = 0;
            storageEngines = storageEngineOrder();
            for (;i < storageEngines.length; i++) try {
                return API[storageEngines[i]].deleteValue.apply(API[storageEngines[i]], arguments);
            } catch (e) {}
        };
    }();
    function customBase64Encode(inputStr) {
        var bbLen = 3, enCharLen = 4, inpLen = inputStr.length, inx = 0, jnx, keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" + "0123456789+/=", output = "", paddingBytes = 0;
        var bytebuffer = new Array(bbLen), encodedCharIndexes = new Array(enCharLen);
        while (inx < inpLen) {
            for (jnx = 0; jnx < bbLen; ++jnx) if (inx < inpLen) bytebuffer[jnx] = 255 & inputStr.charCodeAt(inx++); else bytebuffer[jnx] = 0;
            encodedCharIndexes[0] = bytebuffer[0] >> 2;
            encodedCharIndexes[1] = (3 & bytebuffer[0]) << 4 | bytebuffer[1] >> 4;
            encodedCharIndexes[2] = (15 & bytebuffer[1]) << 2 | bytebuffer[2] >> 6;
            encodedCharIndexes[3] = 63 & bytebuffer[2];
            paddingBytes = inx - (inpLen - 1);
            switch (paddingBytes) {
              case 1:
                encodedCharIndexes[3] = 64;
                break;

              case 2:
                encodedCharIndexes[3] = 64;
                encodedCharIndexes[2] = 64;
            }
            for (jnx = 0; jnx < enCharLen; ++jnx) output += keyStr.charAt(encodedCharIndexes[jnx]);
        }
        return output;
    }
    jMod.API.getRemoteImageAsURL = function(url, mime, callback) {
        if (_undefined == typeof GM_xmlhttpRequest) return;
        var mimePatt = /Content-Type:\s*([^\s]+)/i;
        if ("function" === typeof mime && _undefined === typeof callback) {
            callback = mime;
            mime = undefined;
        }
        return GM_xmlhttpRequest({
            method: "GET",
            url: url,
            overrideMimeType: "text/plain; charset=x-user-defined",
            onload: function(response) {
                if (_undefined == typeof mime || null == mime || "" == mime) try {
                    var rMime = mimePatt.exec(response.responseHeaders);
                    if (rMime && rMime.length > 1) mime = rMime[1].trim();
                } catch (e) {}
                callback("data:" + (mime && "" != mime ? mime : "image/png") + ";base64," + customBase64Encode(response.responseText));
            }
        });
    };
    jMod.API.getResourceText = function(name, callback, useLiveOnFail) {
        if (_undefined !== typeof GM_getResourceText) try {
            var tmp = GM_getResourceText(name);
            if (callback) callback(tmp);
            return tmp;
        } catch (e) {}
        if (useLiveOnFail) return jMod.API.getResourceTextLive(name, callback);
    };
    jMod.API.getResourceURL = function(name, callback, useLiveOnFail) {
        if (_undefined !== typeof GM_getResourceURL) try {
            var tmp = GM_getResourceURL(name);
            if (callback) callback(tmp);
            return tmp;
        } catch (e) {}
        if (useLiveOnFail) return jMod.API.getResourceURLLive(name, callback);
    };
    jMod.API.getResourceTextLive = function(name, callback) {
        if (_undefined == typeof GM_xmlhttpRequest) return;
        var resourceObj = jConfig("script.script_info.resource");
        if (resourceObj && _undefined !== typeof resourceObj[name]) return GM_xmlhttpRequest({
            method: "GET",
            url: resourceObj[name],
            onload: function(response) {
                callback(response.responseText);
            }
        });
    };
    jMod.API.getResourceURLLive = function(name, callback) {
        var resourceObj = jConfig("script.script_info.resource");
        if (resourceObj && _undefined !== typeof resourceObj[name]) return jMod.API.getRemoteImageAsURL(resourceObj[name], callback);
    };
    jMod.API.addResourceCSS = function(name) {
        if (!jMod.API.getResourceText(name, function(result) {
            if ("string" === typeof result && "" != result) jMod.CSS = result;
        }, false)) {
            var resourceObj = jConfig("script.script_info.resource");
            if (resourceObj && _undefined !== typeof resourceObj[name]) jMod.API.addStylesheet(resourceObj[name]);
        }
    };
    jMod.API.addResourceScript = function(name) {
        if (!jMod.API.getResourceText(name, function(result) {
            if ("string" === typeof result && "" != result) jMod.API.addScript({
                js: result
            });
        }, false)) {
            var resourceObj = jConfig("script.script_info.resource");
            if (resourceObj && _undefined !== typeof resourceObj[name]) jMod.API.addScript({
                src: resourceObj[name],
                async: true,
                defer: true
            });
        }
    };
    jMod.API.Date = function(command, args) {
        switch (command) {
          case "parseUTC":
          case "parseUTCDate":
            return jMod.API.Date.parseUTCDate.apply(jMod.API.Date, Slice.call(arguments, 1));
        }
    };
    Object.defineProperties(jMod.API.Date, {
        now: {
            get: function() {
                return Date.now();
            }
        }
    });
    jMod.API.Date.parseUTCDate = function(value) {
        if ("string" === typeof value) {
            var a = /^(\d{4})[\-\/](\d{2})[\-\/](\d{2})(?:T|\s)(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z?$/i.exec(value);
            if (a) return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
        } else if ("date" == RealTypeOf(value)) return new Date(value);
        return null;
    };
    jMod.API.Date.getScriptTimeDiff = function(dateObj) {
        var tDate;
        if ("string" === typeof dateObj) tDate = jMod.API.Date.parseUTCDate(dateObj); else if ("object" === typeof dateObj && typeof dateObj.scriptUploadTimestamp !== _undefined) tDate = jMod.API.Date.parseUTCDate(dateObj.scriptUploadTimestamp);
        if (!tDate) return null;
        var nowDate = Date.now();
        var milliseconds = Math.abs(nowDate - tDate);
        var minutes = milliseconds / 1e3 / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        return {
            date: tDate,
            now: nowDate,
            milliseconds: milliseconds,
            minutes: minutes,
            hours: hours,
            days: days
        };
    };
    jMod.jQueryExtensions = {};
    +function() {
        jMod.jQueryExtensions.CrossOriginSupportTransportFn = function(_jQueryObj, dataType) {
            return function(options, originalOptions, jqXHR) {
                var CrossOriginEnabled = true;
                try {
                    CrossOriginEnabled = jMod.Config("jQueryExtensions.CrossOrigin");
                } catch (e) {}
                if (_undefined != typeof GM_xmlhttpRequest && CrossOriginEnabled) {
                    var extend = (_jQueryObj || $ || jMod).extend, mergedOptions = extend(true, {}, options, originalOptions), optionMap = {
                        context: "context",
                        overrideMimeType: "overrideMimeType",
                        timeout: "timeout",
                        username: "user",
                        password: "password",
                        onreadystatechange: "onreadystatechange",
                        ontimeout: "ontimeout",
                        onprogress: "onprogress",
                        binary: "binary"
                    };
                    return {
                        send: function(headers, callback) {
                            var origType = (originalOptions.dataType || "").toLowerCase(), gm_request_options = {
                                method: options.type || "GET",
                                url: options.url,
                                data: extend({}, options.data || {}, originalOptions.data || {}),
                                headers: headers,
                                onload: function(response) {
                                    var dResponse = {
                                        text: response.responseText
                                    }, rContentType = "", key;
                                    try {
                                        rContentType = /Content-Type:\s*([^\s]+)/i.exec(response.responseHeaders)[1];
                                    } catch (e) {}
                                    if ("html" === origType || /text\/html/i.test(rContentType)) dResponse.html = response.responseText; else if ("json" === origType || "text" !== origType && /\/json/i.test(rContentType)) try {
                                        dResponse.json = $.parseJSON(response.responseText);
                                    } catch (e) {} else if ("xml" == origType || "text" !== origType && /\/xml/i.test(rContentType)) if (response.responseXML) dResponse.xml = response.responseXML; else try {
                                        dResponse.xml = new DOMParser().parseFromString(response.responseText, "text/xml");
                                    } catch (e) {}
                                    callback(200, "success", dResponse, response.responseHeaders);
                                },
                                onerror: function(response) {
                                    callback(404, "error", {
                                        text: response.responseText
                                    }, response.responseHeaders);
                                }
                            };
                            for (key in optionMap) if (_undefined != typeof mergedOptions[key]) gm_request_options[optionMap[key]] = mergedOptions[key];
                            if (false === mergedOptions.async) gm_request_options.synchronous = true;
                            GM_xmlhttpRequest(gm_request_options);
                        },
                        abort: function() {}
                    };
                }
            };
        };
        function exportjQueryTransportFn(_jQueryObj, dataType) {
            return unsafeWindow.globaljQueryCrossOriginSupportFn || (jMod.jQueryExtensions._globaljQueryCrossOriginSupportFn = mExportFunction(jMod.jQueryExtensions.CrossOriginSupportTransportFn(_jQueryObj, dataType), unsafeWindow, {
                defineAs: "globaljQueryCrossOriginSupportFn",
                allowCallbacks: true,
                allowCrossOriginArguments: true
            }));
        }
        jMod.jQueryExtensions.addCrossOriginSupport = function(_jQueryObj, dataType) {
            if (_undefined == typeof GM_xmlhttpRequest) return;
            if (!_jQueryObj && !(_jQueryObj = jMod.jQuery)) return;
            if (true === _jQueryObj.jModCrossOriginSupport) return;
            _jQueryObj.ajaxTransport(dataType || "* text html xml json", jMod.jQueryExtensions.CrossOriginSupportTransportFn(_jQueryObj, dataType));
            _jQueryObj.extend({
                jModCrossOriginSupport: true
            });
        };
        jMod.jQueryExtensions.exportCrossOriginSupport = function(_jQueryObj, dataType) {
            if (_undefined == typeof GM_xmlhttpRequest) return;
            if (!_jQueryObj) return;
            if (true === _jQueryObj.jModCrossOriginSupport) return;
            _jQueryObj.ajaxTransport(dataType || "* text html xml json", exportjQueryTransportFn(_jQueryObj, dataType));
            _jQueryObj.extend({
                jModCrossOriginSupport: true
            });
        };
    }() + function() {
        var Selectors = jMod.jQueryExtensions.Selectors = function(_jQueryObj, name) {
            if (!_jQueryObj) return;
            var i;
            if (1 == arguments.length) {
                for (i in Selectors.ext) Selectors[i](_jQueryObj);
                return;
            }
            for (i = 1; i < arguments.length; i++) if (_undefined != typeof Selectors.ext[arguments[i]]) Selectors.ext[arguments[i]](_jQueryObj);
        };
        Selectors.ext = {};
        Selectors.ext.inView = function(_jQueryObj) {
            if (_jQueryObj && !_jQueryObj.expr[":"].inView) _jQueryObj.extend(_jQueryObj.expr[":"], {
                inView: function(a) {
                    win = window || unsafeWindow;
                    doc = document || win.document;
                    var scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop, offsetTop = _jQueryObj(a).offset().top, windowHeight = win.innerHeight && win.innerHeight < _jQueryObj(win).height() ? win.innerHeight : _jQueryObj(win).height();
                    return offsetTop > scrollTop && _jQueryObj(a).height() + offsetTop < scrollTop + windowHeight;
                }
            });
        };
    }() + function() {
        var nextRegex = /^\s*((?:(?:\:\w+\([^\)]+\))|[^\s\<\>\~\+\|]|[\<\>\~\+\|\^\$\*](?=\=.+\]))+)\s*(.*?)$/;
        function getNext(str) {
            if (!str || str.length < 3) return [ str || "" ];
            var m = nextRegex.exec(str);
            return m ? [ m[1].trim(), m[2].trim() ] : [ str ];
        }
        jMod.jQueryExtensions.extendTokenizer = function(_jQueryObj) {
            if (!_jQueryObj && !(_jQueryObj = jMod.jQuery) || _undefined != typeof _jQueryObj.jModTokenizer) return;
            _jQueryObj._oldFindFn = _jQueryObj.find;
            _jQueryObj.find = function(selector, context, results, seed) {
                context = context || document || unsafeWindow.document;
                results = results || [];
                if (_jQueryObj.jModTokenizer && _jQueryObj.find.jModTokens.regexTest.test(selector)) {
                    var i, j, x, t, firstToken, parts, ctx, tmp, next, tokenResults;
                    parts = selector.split(",");
                    for (x = 0; x < parts.length; x++) if (_jQueryObj.find.jModTokens.regexTest.test(parts[x]) && (firstToken = _jQueryObj.find.jModTokens.regex.exec(parts[x])[1]) && (t = _jQueryObj.find.jModTokens.tokens[firstToken])) {
                        tmp = parts[x].split(firstToken, 2);
                        ctx = _jQueryObj._oldFindFn(tmp[0], context);
                        if (ctx && ctx.length > 0) for (i = 0; i < ctx.length; i++) if (t.find) {
                            next = getNext(tmp[1]);
                            if (1 == next.length || "" == next[1]) t.find(tmp[1], ctx[i], results, seed); else {
                                tokenResults = t.find(next[0], ctx[i]);
                                for (j = 0; j < tokenResults.length; j++) _jQueryObj.find(next[1], tokenResults[j], results, seed);
                            }
                        } else _jQueryObj.find(tmp[1], ctx[i], results, seed);
                    } else _jQueryObj._oldFindFn(parts[x], context, results, seed);
                    return results;
                }
                return _jQueryObj._oldFindFn(selector, context, results, seed);
            };
            for (i in _jQueryObj._oldFindFn) _jQueryObj.find[i] = _jQueryObj._oldFindFn[i];
            var restrictedTokens = ",.";
            _jQueryObj.find.jModTokens = {
                tokens: {},
                tokenOrder: [],
                sortOrder: function(a, b) {
                    return a.length > b.length ? -1 : a.length < b.length ? 1 : 0;
                },
                _regex: null,
                _regexTest: null,
                add: function(token, data) {
                    if (restrictedTokens.indexOf(token) != -1) return;
                    var jModTokens = _jQueryObj.find.jModTokens;
                    jModTokens._regex = null;
                    jModTokens._regexTest = null;
                    jModTokens.tokens[token] = data;
                    jModTokens.tokenOrder.push(token);
                    jModTokens.tokenOrder.sort(this.sortOrder);
                },
                remove: function(token) {
                    var jModTokens = _jQueryObj.find.jModTokens;
                    if (jModTokens.tokens[token]) {
                        delete jModTokens.tokens[token];
                        jModTokens._regex = null;
                        jModTokens._regexTest = null;
                        jModTokens.tokenOrder.splice(jModTokens.tokenOrder.indexOf(token), 1);
                        jModTokens.tokenOrder.sort(this.sortOrder);
                    }
                },
                removeAll: function() {
                    var jModTokens = _jQueryObj.find.jModTokens;
                    jModTokens.tokens[token] = {};
                    jModTokens.tokenOrder = [];
                    jModTokens._regex = null;
                    jModTokens._regexTest = null;
                }
            };
            function convertTokensToRegex(tokens) {
                return tokens.join("|").replace(/\./g, "\\.").replace(/\+/g, "\\+").replace(/\</g, "\\<").replace(/\>/g, "\\>").replace(/\)/g, "\\)").replace(/\(/g, "\\(");
            }
            Object.defineProperty(_jQueryObj.find.jModTokens, "regex", {
                get: function() {
                    if (_jQueryObj.find.jModTokens._regex) return _jQueryObj.find.jModTokens._regex;
                    var tokens = convertTokensToRegex(_jQueryObj.find.jModTokens.tokenOrder);
                    _jQueryObj.find.jModTokens._regex = new RegExp("(" + tokens + ")");
                    return _jQueryObj.find.jModTokens._regex;
                }
            });
            Object.defineProperty(_jQueryObj.find.jModTokens, "regexTest", {
                get: function() {
                    if (_jQueryObj.find.jModTokens._regexTest) return _jQueryObj.find.jModTokens._regexTest;
                    var tokens = convertTokensToRegex(_jQueryObj.find.jModTokens.tokenOrder);
                    _jQueryObj.find.jModTokens._regexTest = new RegExp("(?:^|[^\\.])(" + tokens + ")(?:[\\s\\.\\#\\w\\*\\:]|$)");
                    return _jQueryObj.find.jModTokens._regexTest;
                }
            });
            _jQueryObj.extend({
                jModTokenizer: true
            });
            return _jQueryObj;
        };
        jMod.jQueryExtensions.addSiblingTokens = function(_jQueryObj) {
            if (!_jQueryObj && !(_jQueryObj = jMod.jQuery) || _undefined == typeof _jQueryObj.find.jModTokens) return;
            _jQueryObj.find.jModTokens.add("++", {
                find: function(selector, context, results, seed) {
                    results = results || [];
                    var i = 0, sibs = _jQueryObj(context).siblings(selector);
                    if (sibs) for (;i < sibs.length; i++) if (results.indexOf(sibs[i]) == -1) results.push(sibs[i]);
                    return results;
                }
            });
            _jQueryObj.find.jModTokens.add("+>", {
                find: function(selector, context, results, seed) {
                    results = results || [];
                    var i = 0, sibs = _jQueryObj(context).nextAll(selector);
                    if (sibs) for (;i < sibs.length; i++) if (results.indexOf(sibs[i]) == -1) results.push(sibs[i]);
                    return results;
                }
            });
            _jQueryObj.find.jModTokens.add("+<", {
                find: function(selector, context, results, seed) {
                    results = results || [];
                    var i = 0, sibs = _jQueryObj(context).prevAll(selector);
                    if (sibs) for (;i < sibs.length; i++) if (results.indexOf(sibs[i]) == -1) results.push(sibs[i]);
                    return results;
                }
            });
        };
        jMod.jQueryExtensions.removeTokenizer = function(_jQueryObj) {
            if (!_jQueryObj && !(_jQueryObj = jMod.jQuery) || _undefined == typeof _jQueryObj.jModTokenizer) return;
            delete _jQueryObj.jModTokenizer;
            _jQueryObj.find = _jQueryObj._oldFindFn;
            _jQueryObj._oldFindFn = undefined;
            delete _jQueryObj._oldFindFn;
            return _jQueryObj;
        };
    }() + function() {
        jMod.Scrollbar = function(el, data) {
            jMod.Scrollbar.addScrollBar(el, data);
        };
        jMod.Scrollbar.addScrollBar = function(el, data) {
            if (!isElement(el)) return;
            var newScrollBar = {
                type: "div",
                className: "jModScrollBar",
                style: {
                    position: "absolute",
                    margin: "0px",
                    padding: "0px",
                    display: "block",
                    top: "0px"
                },
                innerHTML: {
                    type: "div",
                    className: "enscroll-track track3",
                    style: {
                        position: "relative"
                    },
                    innerHTML: {
                        type: "div",
                        className: "handle3",
                        style: {
                            position: "absolute"
                        },
                        innerHTML: [ {
                            type: "div",
                            className: "top"
                        }, {
                            type: "div",
                            className: "bottom"
                        } ],
                        attributes: {
                            href: ""
                        }
                    }
                }
            };
            var newScrollBarEl = createNewElement(newScrollBar);
            jMod.Element.addResizeListener(el, function() {
                console.log("Element Resized");
                jMod.Scrollbar.resizeScrollBar(this);
            });
            appendChild(el, newScrollBarEl);
            jMod.Scrollbar.resizeScrollBar(el);
            var _onWheelFn = function(e) {
                jMod.Scrollbar.handlers.target_onScroll.call(this, e);
            };
            if ("onwheel" in el || "WheelEvent" in window && navigator.userAgent.toLowerCase().indexOf("msie") >= 0) addEventListener(el, "wheel", _onWheelFn, false); else addEventListener(el, "mousewheel", _onWheelFn, false);
            var trackEl = jMod.$(".enscroll-track", newScrollBarEl);
            var handleEl = jMod.$(".handle3", newScrollBarEl);
            var _mouseDownFn = function(e) {
                console.log("mousedown", this, e);
                startDragging(e, this);
            };
            setDraggableListeners(handleEl);
            handleEl.whenDragging(function(args) {
                console.log("whenDragging args", args, this);
                var scrollbarEl = findParentWithClass(args.el, "jModScrollBar");
                var target = scrollbarEl.parentElement;
            });
            addEventListener(handleEl, "mousedown", _mouseDownFn, false);
            addEventListener(handleEl, "touchstart", function(e) {
                console.log("touchstart", e);
            }, false);
            el.onscroll = function(e) {
                if (!hasClass(trackEl, "dragging")) jMod.Scrollbar.resizeScrollBar(this);
            };
        };
        var currentElement;
        var fairlyHighZIndex = "10";
        function inPixels(value) {
            return value + "px";
        }
        function addListener(element, type) {
            return function(listener) {
                element.draggableListeners[type].push(listener);
            };
        }
        function getInitialPosition(element) {
            return {
                top: parseInt(element.offsetTop),
                left: parseInt(element.offsetLeft)
            };
        }
        function setDraggableListeners(element) {
            element.draggableListeners = {
                start: [],
                drag: [],
                stop: []
            };
            element.whenDragStarts = addListener(element, "start");
            element.whenDragging = addListener(element, "drag");
            element.whenDragStops = addListener(element, "stop");
        }
        function startDragging(event, element) {
            currentElement = element;
            var trackEl = findParentWithClass(currentElement, "enscroll-track");
            if (trackEl) addClass(trackEl, "dragging");
            var initialPosition = getInitialPosition(currentElement);
            currentElement.style.top = inPixels(initialPosition.top);
            currentElement.lastXPosition = event.clientX;
            currentElement.lastYPosition = event.clientY;
            var okToGoOn = triggerEvent("start", {
                x: initialPosition.left,
                y: initialPosition.top,
                el: currentElement,
                mouseEvent: event
            });
            if (!okToGoOn) return;
            addDocumentListeners();
        }
        function triggerEvent(type, args) {
            var result = true;
            var listeners = currentElement.draggableListeners[type];
            for (var i = listeners.length - 1; i >= 0; i--) if (false === listeners[i](args)) result = false;
            return result;
        }
        function addDocumentListeners() {
            var doc = jMod.Element.document;
            addEventListener(doc, "selectstart", cancelDocumentSelection);
            addEventListener(doc, "mousemove", repositionElement);
            addEventListener(doc, "mouseup", removeDocumentListeners);
        }
        function removeDocumentListeners(event) {
            var doc = jMod.Element.document;
            removeEventListener(doc, "selectstart", cancelDocumentSelection);
            removeEventListener(doc, "mousemove", repositionElement);
            removeEventListener(doc, "mouseup", removeDocumentListeners);
            var left = parseInt(currentElement.style.left, 10);
            var top = parseInt(currentElement.style.top, 10);
            var trackEl = findParentWithClass(currentElement, "enscroll-track");
            if (trackEl) removeClass(trackEl, "dragging");
            triggerEvent("stop", {
                x: left,
                y: top,
                el: currentElement,
                mouseEvent: event
            });
        }
        function cancelDocumentSelection(event) {
            event.preventDefault && event.preventDefault();
            event.stopPropagation && event.stopPropagation();
            event.returnValue = false;
            eventCancel(event);
            return false;
        }
        function repositionElement(event) {
            event.preventDefault && event.preventDefault();
            event.returnValue = false;
            var style = currentElement.style;
            var elementXPosition = parseInt(style.left, 10);
            var elementYPosition = parseInt(style.top, 10);
            var elementNewXPosition = elementXPosition + (event.clientX - currentElement.lastXPosition);
            var elementNewYPosition = elementYPosition + (event.clientY - currentElement.lastYPosition);
            var scrollBarEl = findParentWithClass(currentElement, "jModScrollBar");
            if (scrollBarEl) {
                var parentEl = scrollBarEl.parentElement;
                var computedEl = window.getComputedStyle(parentEl), height = parseFloat(computedEl.height), width = parseFloat(computedEl.width);
                var computedCurrentEl = window.getComputedStyle(currentElement), cheight = parseFloat(computedCurrentEl.height), cwidth = parseFloat(computedCurrentEl.width);
                var scrollMax = parseFloat(parentEl.scrollHeight) - height;
                if (parseInt(elementNewYPosition) + cheight > height) elementNewYPosition = height - cheight; else if (parseInt(elementNewYPosition) < 0) elementNewYPosition = 0;
            }
            style.top = inPixels(elementNewYPosition);
            currentElement.lastXPosition = event.clientX;
            currentElement.lastYPosition = event.clientY;
            try {
                document.selection.empty();
            } catch (e) {}
            try {
                window.getSelection().removeAllRanges();
            } catch (e) {}
            triggerEvent("drag", {
                x: elementNewXPosition,
                y: elementNewYPosition,
                el: currentElement,
                mouseEvent: event
            });
        }
        jMod.Scrollbar.resizeScrollBar = function(el) {
            var scrollBar = jMod.$(".jModScrollBar");
            if (scrollBar) {
                var track = jMod.$(".enscroll-track", scrollBar);
                var handle = jMod.$(".handle3", scrollBar);
                var computedEl = (window || unsafeWindow).getComputedStyle(el, null), height = parseFloat(computedEl.height), width = parseFloat(computedEl.width), scrollHeight = parseFloat(el.scrollHeight), scrollWidth = parseFloat(el.scrollWidth), scrollTop = parseFloat(el.scrollTop), scrollLeft = parseFloat(el.scrollLeft), handleHeight = 0, handleTop = 0;
                scrollBar.style.left = parseInt(width - 10) + "px";
                track.style.height = parseInt(height) + "px";
                handleHeight = height / scrollHeight * height;
                handleTop = height / scrollHeight * scrollTop;
                if (handleTop < 0) handleTop = 0;
                handleTop += scrollTop;
                handle.style.height = handleHeight + "px";
                handle.style.top = handleTop + "px";
            }
        };
        function preventDefault(event) {
            if (event.preventDefault) event.preventDefault(); else event.returnValue = false;
            if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;
        }
        var reqAnimFrame = window.requestAnimationFrame ? "requestAnimationFrame" : window.mozRequestAnimationFrame ? "mozRequestAnimationFrame" : window.webkitRequestAnimationFrame ? "webkitRequestAnimationFrame" : window.oRequestAnimationFrame ? "oRequestAnimationFrame" : window.msRequestAnimationFrame ? "msRequestAnimationFrame" : function(f) {
            setTimeout(f, 17);
        };
        var PI_OVER_2 = .5 * Math.PI, TEN_LOG2 = 10 * Math.log(2);
        var easeOutSin = function(c, d, t) {
            var b = PI_OVER_2 / d, a = c * b;
            return Math.round(a * Math.cos(b * t));
        };
        var easeOutExpo = function(c, d, t) {
            return Math.round(c * TEN_LOG2 * Math.pow(2, -10 * t / d + 1) / d);
        };
        var timeFromPosition = function(b, c, d, x) {
            return 2 * d / Math.PI * Math.asin((x - b) / c);
        };
        var scrollVertical = function(el, dy) {
            el.scrollTop = parseInt(el.scrollTop) + parseInt(dy);
        };
        function scrollAnimate(el) {
            var dataset = el.dataset;
            var duration = dataset._duration || parseInt(300 / 16.66666, 10);
            if (true === el.dataset._scrollingY || "true" === el.dataset._scrollingY) {
                var remaining = parseInt(dataset._endY) - parseInt(dataset._startY);
                if (0 === remaining) el.dataset._scrollingY = false; else {
                    var curPos = el.scrollTop;
                    var time = timeFromPosition(parseInt(dataset._startY), remaining, duration, curPos);
                    if (remaining > 0) if (curPos >= parseInt(dataset._endY) || curPos < parseInt(dataset._startY)) el.dataset._scrollingY = false; else {
                        scrollVertical(el, Math.max(1, easeOutSin(remaining, duration, time)));
                        if ("function" === typeof reqAnimFrame) reqAnimFrame(function() {
                            scrollAnimate(el);
                        }); else window[reqAnimFrame](function() {
                            scrollAnimate(el);
                        });
                    } else if (curPos <= parseInt(dataset._endY) || curPos > parseInt(dataset._startY)) el.dataset._scrollingY = false; else {
                        scrollVertical(el, Math.min(-1, easeOutSin(remaining, duration, time)));
                        if ("function" === typeof reqAnimFrame) reqAnimFrame(function() {
                            scrollAnimate(el);
                        }); else window[reqAnimFrame](function() {
                            scrollAnimate(el);
                        });
                    }
                }
            }
        }
        function animateVertical(el, delta) {
            var curPos = parseInt(el.scrollTop);
            var computedEl = window.getComputedStyle(el), height = parseFloat(computedEl.height), width = parseFloat(computedEl.width);
            var scrollMax = parseFloat(el.scrollHeight) - height;
            if (!el.dataset._scrollingY || "false" == el.dataset._scrollingY) {
                el.dataset._scrollingY = true;
                el.dataset._startY = curPos;
                el.dataset._endY = el.dataset._startY;
                if ("function" === typeof reqAnimFrame) reqAnimFrame(function() {
                    scrollAnimate(el);
                }); else window[reqAnimFrame](function() {
                    scrollAnimate(el);
                });
            }
            var remaining = parseInt(el.dataset._endY) - parseInt(el.dataset._startY);
            if (remaining > 0 && delta < 0 || remaining < 0 && delta > 0) {
                el.dataset._startY = curPos;
                el.dataset._endY = el.dataset._startY;
            } else el.dataset._endY = delta > 0 ? Math.min(curPos + delta + parseInt(2 * remaining / 3), scrollMax) : Math.max(0, curPos + delta + parseInt(2 * remaining / 3));
            return delta < 0 && curPos > 0 || delta > 0 && curPos < scrollMax;
        }
        function startVerticalDrag(e) {
            if (1 !== event.which) return;
            var handleEl = this, trackEl = findParentWithClass(this, "enscroll-track");
            if (trackEl) addClass(trackEl, "dragging");
        }
        jMod.Scrollbar.handlers = {
            target_onScroll: function(event) {
                var _this = this;
                var scrollIncrement = 10;
                var deltaX = "deltaX" in event ? -event.deltaX : "wheelDeltaX" in event ? event.wheelDeltaX : 0, deltaY = "deltaY" in event ? -event.deltaY : "wheelDeltaY" in event ? event.wheelDeltaY : "wheelDelta" in event ? event.wheelDelta : 0, delta;
                if (Math.abs(deltaX) > Math.abs(deltaY)) delta = (deltaX > 0 ? -scrollIncrement : scrollIncrement) << 2; else {
                    delta = (deltaY > 0 ? -1 * scrollIncrement : scrollIncrement) << 2;
                    if (animateVertical(this, delta)) preventDefault(event);
                }
            },
            target_onResize: function() {},
            track_onMouseDown: function() {},
            track_onMouseUp: function() {},
            track_handle_onMouseDown: function(e) {
                var handleEl = this, trackEl = findParentWithClass(this, "enscroll-track");
                if (trackEl) addClass(trackEl, "dragging");
            },
            track_handle_onMouseUp: function(e) {
                var handleEl = this, trackEl = findParentWithClass(this, "enscroll-track");
                if (trackEl) removeClass(trackEl, "dragging");
            }
        };
    }();
    jMod.CSS = ".jmod-na .track3{width:10px;background:rgba(0,0,0,0);margin-right:0px;-webkit-transition:background 250ms linear;transition:background 250ms linear;}.jmod-na .track3:hover,.jmod-na .track3.dragging{background:#d9d9d9;background:rgba(0,0,0,0.15);}.jmod-na .handle3{width:7px;right:0;background:#999;background:rgba(0,0,0,0.4);-webkit-transition:width 250ms;transition:width 250ms;cursor:pointer;}.jmod-na .track3:hover .handle3,.jmod-na .track3.dragging .handle3{width:10px;}";
    jMod.Config.Tooltip = jMod.extend({
        enabled: false,
        containerId: "jModTooltipContainer",
        attributeNames: {
            id: "data-tooltip-id",
            tooltip: "data-tooltip",
            placement: "data-tooltip-placement",
            margin: "data-tooltip-margin"
        },
        classNames: {
            tooltipTarget: "jmod-tooltip-target",
            tooltip: "tooltip"
        }
    }, jMod.Config.Tooltip || {});
    var Tooltip_ContainerId_Key = "Tooltip.containerId", Tooltip_IdAttribute_Key = "Tooltip.attributeNames.id", Tooltip_TooltipAttribute_Key = "Tooltip.attributeNames.tooltip", Tooltip_PlacementAttribute_Key = "Tooltip.attributeNames.placement", Tooltip_MarginAttribute_Key = "Tooltip.attributeNames.margin", Tooltip_TooltipTargetClass_Key = "Tooltip.classNames.tooltipTarget", Tooltip_TooltipClass_Key = "Tooltip.classNames.tooltip";
    var Tooltip = jMod.Tooltip = function(data, data2) {
        if (isElement(data)) jMod.Tooltip.AddTooltipsToElement.apply(jMod.Tooltip, arguments);
    };
    var _TooltipContainer;
    Object.defineProperties(Tooltip, {
        Initialized: {
            value: false,
            writable: true
        },
        Count: {
            value: 0,
            writable: true
        },
        TooltipContainer: {
            get: function() {
                if (!Tooltip.Initialized) Tooltip.init();
                if (!_TooltipContainer) _TooltipContainer = document.getElementById(jConfig(Tooltip_ContainerId_Key));
                return _TooltipContainer;
            },
            set: function(el) {
                _TooltipContainer = el;
            }
        },
        get: {
            value: function(obj) {
                var tooltipId, tooltipEl, tmpEl, idAttName = jConfig(Tooltip_IdAttribute_Key);
                if (isElement(obj)) {
                    if (hasClass(obj, jConfig(Tooltip_TooltipClass_Key))) return document.querySelector("." + jConfig(Tooltip_TooltipTargetClass_Key) + " [" + idAttName + '="' + obj.id + '"]');
                    if (hasClass(obj, jConfig(Tooltip_TooltipTargetClass_Key)) && obj.hasAttribute(idAttName)) tooltipId = obj.getAttribute(idAttName); else if (this.TooltipContainer && null !== (tmpEl = this.TooltipContainer.querySelector("." + jConfig(Tooltip_TooltipTargetClass_Key) + " [" + idAttName + "]"))) tooltipId = tmpEl.getAttribute(idAttName);
                    return document.getElementById(tooltipId);
                } else if ("string" === typeof obj) {
                    if (null !== (tooltipEl = document.getElementById(obj))) return tooltipEl;
                } else if ("number" === typeof obj) if (this.TooltipContainer && this.TooltipContainer.childElementCount > obj) return tooltipContainer.children[obj];
                return null;
            }.bind(Tooltip)
        }
    });
    var fadeTime = 200;
    Tooltip.MoveTooltip = function(targetEl, tooltipEl, position) {
        if ("top" in position) tooltipEl.style.top = position.top; else if ("bottom" in position) tooltipEl.style.bottom = position.bottom;
        if ("left" in position) tooltipEl.style.left = position.left; else if ("right" in position) tooltipEl.style.right = position.right;
        var marginAttributeName = jConfig("Tooltip.attributeNames.margin");
        if (targetEl.hasAttribute(marginAttributeName + "-top")) tooltipEl.style.marginTop = targetEl.getAttribute(marginAttributeName + "-top");
        if (targetEl.hasAttribute(marginAttributeName + "-left")) tooltipEl.style.marginLeft = targetEl.getAttribute(marginAttributeName + "-left");
        if (targetEl.hasAttribute(marginAttributeName + "-bottom")) tooltipEl.style.marginBottom = targetEl.getAttribute(marginAttributeName + "-bottom");
        if (targetEl.hasAttribute(marginAttributeName + "-right")) tooltipEl.style.marginRight = targetEl.getAttribute(marginAttributeName + "-right");
    };
    Tooltip.MoveTooltipToTarget = function(tooltip, targetEl, callback) {
        var tooltipEl, top, left, bottom, right;
        if (hasClass(tooltip, jConfig(Tooltip_TooltipClass_Key))) tooltipEl = tooltip; else if (tooltip.hasAttribute(jConfig(Tooltip_IdAttribute_Key))) tooltipEl = document.getElementById(tooltip.getAttribute(jConfig(Tooltip_IdAttribute_Key))); else return;
        var tooltipPlacement = targetEl.getAttribute(jConfig(Tooltip_PlacementAttribute_Key)) || "top";
        var offset = getOffset(targetEl);
        switch (tooltipPlacement) {
          case "left-top":
            top = parseInt(offset.top);
            left = offset.left - parseInt(tooltipEl.offsetWidth);
            Tooltip.MoveTooltip(targetEl, tooltipEl, {
                top: top + "px",
                left: left + "px"
            });
            break;

          case "left-bottom":
            top = offset.top + offset.height - parseInt(tooltipEl.offsetHeight);
            left = offset.left - parseInt(tooltipEl.offsetWidth);
            Tooltip.MoveTooltip(targetEl, tooltipEl, {
                top: top + "px",
                left: left + "px"
            });
            break;

          case "left":
            top = offset.top + parseInt(offset.height / 2) - parseInt(parseInt(tooltipEl.offsetHeight) / 2);
            left = offset.left - parseInt(tooltipEl.offsetWidth);
            Tooltip.MoveTooltip(targetEl, tooltipEl, {
                top: top + "px",
                left: left + "px"
            });
            break;

          case "right-top":
            top = parseInt(offset.top);
            left = offset.left + offset.width;
            Tooltip.MoveTooltip(targetEl, tooltipEl, {
                top: top + "px",
                left: left + "px"
            });
            break;

          case "right-bottom":
            top = offset.top + offset.height - parseInt(tooltipEl.offsetHeight);
            left = offset.left + offset.width;
            Tooltip.MoveTooltip(targetEl, tooltipEl, {
                top: top + "px",
                left: left + "px"
            });
            break;

          case "right":
            top = offset.top + parseInt(offset.height / 2) - parseInt(tooltipEl.offsetHeight / 2);
            left = offset.left + offset.width;
            Tooltip.MoveTooltip(targetEl, tooltipEl, {
                top: top + "px",
                left: left + "px"
            });
            break;

          case "bottom-left":
            top = offset.top + offset.height;
            left = offset.left;
            Tooltip.MoveTooltip(targetEl, tooltipEl, {
                top: top + "px",
                left: left + "px"
            });
            break;

          case "bottom-right":
            top = offset.top + offset.height;
            left = offset.left + offset.width - parseInt(tooltipEl.offsetWidth);
            Tooltip.MoveTooltip(targetEl, tooltipEl, {
                top: top + "px",
                left: left + "px"
            });
            break;

          case "bottom":
            top = offset.top + offset.height;
            left = offset.left + parseInt(offset.width / 2) - parseInt(parseInt(tooltipEl.offsetWidth) / 2);
            Tooltip.MoveTooltip(targetEl, tooltipEl, {
                top: top + "px",
                left: left + "px"
            });
            break;

          case "top-left":
            top = offset.top - parseInt(tooltipEl.offsetHeight);
            left = offset.left;
            Tooltip.MoveTooltip(targetEl, tooltipEl, {
                top: top + "px",
                left: left + "px"
            });
            break;

          case "top-right":
            top = offset.top - parseInt(tooltipEl.offsetHeight);
            left = offset.left + offset.width - parseInt(tooltipEl.offsetWidth);
            Tooltip.MoveTooltip(targetEl, tooltipEl, {
                top: top + "px",
                left: left + "px"
            });
            break;

          case "top":
          default:
            top = offset.top - parseInt(tooltipEl.offsetHeight);
            left = offset.left + parseInt(offset.width / 2) - parseInt(parseInt(tooltipEl.offsetWidth) / 2);
            Tooltip.MoveTooltip(targetEl, tooltipEl, {
                top: top + "px",
                left: left + "px"
            });
        }
    };
    Tooltip.HideAllExcept = function(except) {
        var hide = [], tooltipEl, tooltips = jMod.$$(".jmod-na ." + jConfig(Tooltip_TooltipClass_Key) + ".in");
        for (var i = 0; i < tooltips.length; i++) {
            tooltipEl = tooltips[i];
            if ("block" == tooltipEl.style.display && tooltipEl !== except) {
                removeClass(tooltipEl, "in");
                hide.push(tooltipEl);
            }
        }
        setTimeout(function(_hide) {
            for (var i = 0; i < _hide.length; i++) if (!hasClass(_hide[i], "in")) _hide[i].style.display = "none";
        }, fadeTime, hide);
    };
    Tooltip.handler = {
        mouseenter: function(e) {
            var tooltipId = this.getAttribute(jConfig(Tooltip_IdAttribute_Key));
            var tooltipValue = this.getAttribute(jConfig(Tooltip_TooltipAttribute_Key));
            var tooltipPlacement = this.getAttribute(jConfig(Tooltip_PlacementAttribute_Key)) || "top";
            var tooltipContainer = Tooltip.TooltipContainer;
            switch (tooltipPlacement) {
              case "top-left":
              case "top-right":
                tooltipPlacement = "top " + tooltipPlacement;
                break;

              case "bottom-left":
              case "bottom-right":
                tooltipPlacement = "bottom " + tooltipPlacement;
                break;

              case "left-top":
              case "left-bottom":
                tooltipPlacement = "left " + tooltipPlacement;
                break;

              case "right-top":
              case "right-bottom":
                tooltipPlacement = "right " + tooltipPlacement;
            }
            var tooltipEl = document.getElementById(tooltipId);
            if (!tooltipEl) {
                tooltipEl = createNewElement({
                    type: "div",
                    id: tooltipId,
                    className: jConfig(Tooltip_TooltipClass_Key) + " " + tooltipPlacement + " fade slow",
                    style: {
                        display: "none"
                    },
                    innerHTML: [ '<div class="tooltip-arrow"></div>', '<div class="tooltip-inner">' + tooltipValue + "</div>" ]
                });
                tooltipEl.addEventListener("mouseenter", function(ev) {
                    var currentOpacity = window.getComputedStyle(this, null).getPropertyValue("opacity");
                    if (currentOpacity > .2) {
                        addClass(this, "in");
                        Tooltip.HideAllExcept(this);
                    }
                });
                tooltipEl.addEventListener("mouseleave", function(ev) {
                    var currentOpacity = window.getComputedStyle(this, null).getPropertyValue("opacity");
                    removeClass(this, "in");
                    setTimeout(function(el) {
                        if (!hasClass(el, "in")) el.style.display = "none";
                    }, fadeTime, this);
                });
                tooltipEl.addEventListener("click", function(ev) {
                    removeClass(this, "in");
                    setTimeout(function(el) {
                        if (!hasClass(el, "in")) el.style.display = "none";
                    }, fadeTime, this);
                });
                tooltipContainer.appendChild(tooltipEl);
            }
            Tooltip.HideAllExcept(tooltipEl);
            tooltipEl.style.display = "block";
            setTimeout(function(targetEl, tooltipEl) {
                addClass(tooltipEl, "in");
                Tooltip.MoveTooltipToTarget(tooltipEl, targetEl);
            }, 1, this, tooltipEl);
        },
        mouseleave: function(e) {
            var tooltipEl = Tooltip.get(this);
            if (tooltipEl) {
                removeClass(tooltipEl, "in");
                setTimeout(function(tooltipEl) {
                    if (!hasClass(tooltipEl, "in")) tooltipEl.style.display = "none";
                }, fadeTime, tooltipEl);
            }
        },
        scroll: function(e) {
            var tooltips, tooltipId, tooltipEl;
            if (isNamespaced(this, "jmod-na")) tooltips = jMod.$$("." + jConfig(Tooltip_TooltipTargetClass_Key) + "[" + jConfig(Tooltip_TooltipAttribute_Key) + "]", this); else tooltips = jMod.$$(".jmod-na ." + jConfig(Tooltip_TooltipTargetClass_Key) + "[" + jConfig(Tooltip_TooltipAttribute_Key) + "]", this);
            for (var i = 0; i < tooltips.length; i++) {
                tooltipId = tooltips[i].getAttribute(jConfig(Tooltip_IdAttribute_Key));
                tooltipEl = document.getElementById(tooltipId);
                if (tooltipEl && "block" == tooltipEl.style.display) Tooltip.MoveTooltipToTarget(tooltipEl, tooltips[i]);
            }
        }
    };
    Tooltip.getTooltipsFromElement = function(el) {
        var val, r = [];
        var tooltips = jMod.$$("." + jConfig(Tooltip_TooltipTargetClass_Key) + "[" + jConfig(Tooltip_TooltipAttribute_Key) + "]", el);
        for (var i = 0; i < tooltips.length; i++) if (tooltips[i].getAttribute(jConfig(Tooltip_TooltipAttribute_Key))) r.push(tooltips[i]);
        return r;
    };
    Tooltip.AddTooltipsToElement = function(el) {
        var tooltips = Tooltip.getTooltipsFromElement(el);
        for (var i = 0; i < tooltips.length; i++) {
            tooltips[i].setAttribute(jConfig(Tooltip_IdAttribute_Key), "jmod-tooltip-" + Tooltip.Count++);
            tooltips[i].addEventListener("mouseenter", Tooltip.handler.mouseenter);
            tooltips[i].addEventListener("mouseleave", Tooltip.handler.mouseleave);
            var parent = tooltips[i];
            while (parent.parentElement) {
                parent = parent.parentElement;
                if (!parent.hasAttribute("data-jmod-scroll-event")) {
                    parent.setAttribute("data-jmod-scroll-event", true);
                    parent.addEventListener("scroll", Tooltip.handler.scroll);
                }
            }
        }
        el.addEventListener("scroll", Tooltip.handler.scroll);
    };
    Tooltip.init = function() {
        Tooltip.Initialized = true;
        var tooltipContainer = document.getElementById(jConfig(Tooltip_ContainerId_Key));
        if (null == tooltipContainer) {
            tooltipContainer = document.createElement("div");
            tooltipContainer.id = jConfig(Tooltip_ContainerId_Key);
            tooltipContainer.className = "jModTooltipContainer jmod-na jmod-fa";
            document.body.appendChild(tooltipContainer);
            _TooltipContainer = tooltipContainer;
        }
    };
    jMod.CSS = ".jmod-na .fade.slow {transition: opacity " + (fadeTime / 1e3).toFixed(2).toString() + "s linear 0s;}";
    jMod.Config.Notifications = {
        enabled: true
    };
    var Notification = jMod.Notification = function(data, data2) {
        if (!jConfig("Notifications.enabled")) return false;
        if (!jMod.Notification.Initialized) jMod.Notification.init();
        if ("string" === typeof data) switch (data.toLowerCase()) {
          case "get":
          case "getelement":
            return jMod.Notification.getElement.apply(jMod.Notification, Slice.call(arguments, 1));
            break;

          case "getid":
          case "getelementid":
            return jMod.Notification.getElementId.apply(jMod.Notification, Slice.call(arguments, 1));
            break;

          case "updatenotification":
            return jMod.Notification.UpdateNotification.apply(jMod.Notification, Slice.call(arguments, 1));
        } else if ("object" === typeof data) if (data.type) Notification.Types.create(data.type.toLowerCase(), data);
    };
    Notification.Types = {
        types: {},
        add: function(obj) {
            this.types[obj.name] = obj;
        },
        callMethod: function(typeName, methodName) {
            if (_undefined !== typeof this.types[typeName] && "function" === typeof this.types[typeName][methodName]) return this.types[typeName][methodName].apply(this.types[typeName], Slice.call(arguments, 2));
        },
        create: function(typeName, data) {
            this.callMethod(typeName, "create", data);
        },
        init: function() {
            for (var name in this.types) this.callMethod(name, "init");
        }
    };
    +function(Notification) {
        var LargeWrapperId = "jModSmallNotificationsWrapper";
        Notification.LargeCount = 0;
        Object.defineProperty(Notification, "CurrentLargeCount", {
            get: function() {
                var largeNotificationsContainer = document.getElementById(LargeWrapperId);
                return jMod.$$("div[data-jmod-large-notification]", largeNotificationsContainer).length;
            }
        });
        jMod.Notification.Types.add({
            name: "large",
            getWrapper: function() {
                return document.getElementById(LargeWrapperId);
            },
            generateElement: function(data) {
                var newNotification = {
                    type: "div",
                    className: "jModLargeNotification animated fadeIn fast",
                    style: {},
                    attributes: {
                        "data-jmod-notification": Notification.count,
                        "data-jmod-notification-type": "large",
                        "data-jmod-large-notification": Notification.LargeCount
                    }
                };
                if (data.background) {
                    var color;
                    if ("string" === typeof data.background) {
                        if ((color = parseColorString(data.background)) && _undefined != typeof data["background-opacity"]) color.a = parseFloat(data["background-opacity"]);
                    } else if ("object" === typeof data.background && _undefined != typeof data.background.color) if ((color = parseColorString(data.background.color)) && _undefined != typeof data.background.opacity) color.a = parseFloat(data.background.opacity);
                    if (color) newNotification.style.backgroundColor = "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + (isNaN(parseFloat(color.a)) ? "0.8" : parseFloat(color.a)) + ")";
                }
                var newNotificationContent = {
                    type: "div",
                    className: "",
                    innerHTML: [ {
                        type: "i",
                        id: "jModbtnClose" + Notification.LargeCount,
                        className: "btnClose fa fa-times",
                        EventListeners: {
                            click: function(e) {
                                if (!hasClass(this, "fadeOut")) {
                                    Notification.close(e.target);
                                    try {
                                        this.removeEventListener("click", arguments.callee);
                                    } catch (e) {}
                                }
                            }
                        }
                    } ],
                    style: {}
                };
                if (typeof data.title !== _undefined) newNotificationContent.innerHTML.push({
                    type: "span",
                    innerHTML: data.title
                });
                newNotificationContent.innerHTML.push({
                    type: "div",
                    innerHTML: data.body
                });
                if (typeof data.icon !== _undefined) newNotificationContent.innerHTML.push({
                    type: "div",
                    className: "jmod-na largeIcon",
                    style: {
                        backgroundColor: "transparent"
                    },
                    innerHTML: {
                        type: "i",
                        className: "fa " + data.icon + " " + (data.iconAnimation || "swing") + " animated",
                        style: {
                            color: "#fff"
                        }
                    }
                });
                newNotification.innerHTML = newNotificationContent;
                return createNewElement(newNotification);
            },
            create: function(data) {
                var largeNotificationsContainer = this.getWrapper();
                var newNotification = this.generateElement(data);
                largeNotificationsContainer.appendChild(newNotification);
                jMod.Notification.Events.addAll(data, jMod.Notification.count);
                jMod.Notification.count++;
                jMod.Notification.LargeCount++;
            },
            close: function(el, num) {
                Notification.Events.fire("onBeforeClose", num, null, el);
                removeClass(el, "fadeIn");
                addClass(el, "fadeOut");
                setTimeout(function(el, num) {
                    el.style.display = "none";
                    Notification.Events.fire("onAfterClose", num, null, el);
                    el.parentElement.removeChild(el);
                }, 1e3, el, num);
            },
            init: function() {
                var notificationsFullWrapper = Notification("getElement", "notificationsWrapper");
                var largeNotificationsContainer = this.getWrapper();
                if (null == largeNotificationsContainer) {
                    largeNotificationsContainer = document.createElement("div");
                    largeNotificationsContainer.id = LargeWrapperId;
                    largeNotificationsContainer.className = "jModNotifications";
                    notificationsFullWrapper.appendChild(largeNotificationsContainer);
                }
            }
        });
    }(jMod.Notification);
    +function(Notification) {
        var SmallWrapperId = "jModSmallNotificationsWrapper";
        Notification.SmallCount = 0;
        Object.defineProperty(Notification, "CurrentSmallCount", {
            get: function() {
                var smallNotificationsContainer = document.getElementById(SmallWrapperId);
                return jMod.$$("div[data-jmod-small-notification]", smallNotificationsContainer).length;
            }
        });
        jMod.Notification.Types.add({
            name: "small",
            getWrapper: function() {
                return document.getElementById(SmallWrapperId);
            },
            generateElement: function(data) {
                var tmpTop = 25;
                var totalCount = Notification.CurrentSmallCount;
                if (totalCount > 0) {
                    var tHeight = 25 * totalCount;
                    var smallNotificationsContainer = Notification("getElement", "notificationsSmallWrapper");
                    var smNotes = smallNotificationsContainer.querySelectorAll("div[data-jmod-small-notification]");
                    for (var i = 0; i < smNotes.length; i++) tHeight += parseInt(smNotes[i].offsetHeight);
                    tmpTop += tHeight;
                }
                var newNotification = {
                    type: "div",
                    className: "jModSmallNotification animated fadeIn",
                    style: {
                        top: tmpTop + "px"
                    },
                    innerHTML: [],
                    attributes: {
                        "data-jmod-notification": Notification.count,
                        "data-jmod-notification-type": "small",
                        "data-jmod-small-notification": Notification.SmallCount
                    },
                    EventListeners: {
                        click: function(e) {
                            var tCount = 0;
                            var tParent = e.target;
                            while (!tParent.hasAttribute("data-jmod-small-notification") && null != tParent && tCount < 20) {
                                tParent = tParent.parentElement;
                                tCount++;
                            }
                            if (null != tParent && !hasClass(tParent, "fadeOut")) {
                                var notificationNum = parseInt(tParent.getAttribute("data-jmod-notification"));
                                var smallNotificationNum = parseInt(tParent.getAttribute("data-jmod-small-notification"));
                                jMod.Notification.close(tParent);
                                try {
                                    this.removeEventListener("click", arguments.callee);
                                } catch (e) {}
                            }
                        }
                    }
                };
                var bgColor = parseColorString("rgba(50, 118, 177, 0.8)"), tmp;
                if (data.background) if ("object" === typeof data.background) {
                    if (_undefined != typeof data.background.color) if (tmp = parseColorString(data.background.color)) {
                        if (null == tmp.a) tmp.a = bgColor.a;
                        bgColor = tmp;
                    }
                    if (_undefined != typeof data.background.opacity) bgColor.a = data.background.opacity;
                } else if (tmp = parseColorString(data.background)) {
                    if (null == tmp.a) tmp.a = bgColor.a;
                    bgColor = tmp;
                }
                if (bgColor) newNotification.style.backgroundColor = "rgba(" + bgColor.r + ", " + bgColor.g + ", " + bgColor.b + ", " + bgColor.a + ")";
                var newNotificationContent = {
                    type: "div",
                    className: "NotificationContent",
                    innerHTML: [],
                    style: {}
                };
                if (typeof data.footer != _undefined) {
                    var largeIcon = document.createElement("div");
                    largeIcon.className = "largeIcon";
                    if (isElement(data.icon)) largeIcon.appendChild(data.icon); else largeIcon.innerHTML = '<i class="fa ' + data.icon + " " + (data.iconAnimation || "bounce") + ' animated"> </i>';
                    newNotification.innerHTML.push(largeIcon);
                }
                if (data.title) newNotificationContent.innerHTML.push({
                    type: "span",
                    innerHTML: data.title
                });
                if (data.body) newNotificationContent.innerHTML.push({
                    type: "p",
                    innerHTML: data.body
                });
                if (data.footer) newNotificationContent.innerHTML.push({
                    type: "p",
                    style: {
                        textAlign: "right"
                    },
                    innerHTML: data.footer
                });
                if (data.icon && !data.footer) newNotificationContent.innerHTML.push({
                    type: "div",
                    className: "smallIcon",
                    style: {
                        backgroundColor: "transparent"
                    },
                    innerHTML: {
                        type: "i",
                        className: "fa " + data.icon + " " + (data.iconAnimation || "swing") + " animated",
                        style: {
                            color: "#fff"
                        }
                    }
                });
                newNotification.innerHTML.push(newNotificationContent);
                return createNewElement(newNotification);
            },
            create: function(data) {
                var smallNotificationsContainer = this.getWrapper();
                var newNotification = this.generateElement(data);
                smallNotificationsContainer.appendChild(newNotification);
                jMod.Notification.Events.addAll(data, jMod.Notification.count);
                jMod.Notification.count++;
                jMod.Notification.SmallCount++;
            },
            close: function(el, num) {
                Notification.Events.fire("onBeforeClose", num, null, el);
                var top = parseInt(el.style.top);
                var tSib = el;
                removeClass(el, "fadeIn");
                addClass(el, "fast");
                addClass(el, "fadeOut");
                el.style.zIndex = "9998";
                while (null != tSib.nextElementSibling && tSib.nextElementSibling.hasAttribute("data-jmod-small-notification")) {
                    tSib = tSib.nextElementSibling;
                    addClass(tSib, "transitionUp");
                    setTimeout(function(sib, top) {
                        sib.style.top = top + "px";
                    }, 0, tSib, top);
                    top = top + parseInt(tSib.offsetHeight) + 25;
                }
                setTimeout(function(el, num) {
                    el.style.display = "none";
                    Notification.Events.fire("onAfterClose", num, null, el);
                    el.parentElement.removeChild(el);
                }, 1e3, el, num);
            },
            init: function() {
                var notificationsFullWrapper = Notification("getElement", "notificationsWrapper");
                var smallNotificationsContainer = this.getWrapper();
                if (null == smallNotificationsContainer) {
                    smallNotificationsContainer = document.createElement("div");
                    smallNotificationsContainer.id = SmallWrapperId;
                    smallNotificationsContainer.className = "jModSmallNotifications";
                    notificationsFullWrapper.appendChild(smallNotificationsContainer);
                }
            }
        });
    }(jMod.Notification);
    +function(Notification) {
        var FillWrapperId = "jModFillNotificationsWrapper";
        Notification.FillCount = 0;
        Object.defineProperty(Notification, "CurrentFillCount", {
            get: function() {
                var fillNotificationsContainer = document.getElementById(FillWrapperId);
                return jMod.$$("div[data-jmod-fill-notification]", fillNotificationsContainer).length;
            }
        });
        jMod.Notification.Types.add({
            name: "fill",
            getWrapper: function() {
                return document.getElementById(FillWrapperId);
            },
            generateElement: function(data) {
                var newNotification = {
                    type: "div",
                    className: "jModFillNotification",
                    style: {
                        backgroundColor: "rgba(0, 0, 0, 0.8);"
                    },
                    innerHTML: [ {
                        type: "div",
                        className: "NotificationContent",
                        style: {},
                        innerHTML: [ {
                            type: "span",
                            className: "NotificationTitle",
                            innerHTML: data.title
                        }, {
                            type: "p",
                            className: "NotificationText",
                            innerHTML: data.body
                        } ]
                    } ]
                };
                if (data.background) {
                    var color;
                    if ("string" === typeof data.background) {
                        if ((color = parseColorString(data.background)) && _undefined != typeof data["background-opacity"]) color.a = parseFloat(data["background-opacity"]);
                    } else if ("object" === typeof data.background && _undefined != typeof data.background.color) if ((color = parseColorString(data.background.color)) && _undefined != typeof data.background.opacity) color.a = parseFloat(data.background.opacity);
                    if (color) newNotification.style.backgroundColor = "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + (color.a || 0 === parseFloat(color.a) ? parseFloat(color.a) : "0.8") + ")";
                }
                var footer = {
                    type: "div",
                    className: "NotificationFooter",
                    style: {},
                    innerHTML: [ {
                        type: "button",
                        className: "btn btn-default btn-sm",
                        innerHTML: "Close",
                        EventListeners: {
                            click: function(e) {
                                if (this === e.target) {
                                    jMod.Notification.close(e.target);
                                    try {
                                        this.removeEventListener("click", arguments.callee);
                                    } catch (e) {}
                                }
                            }
                        }
                    } ]
                };
                newNotification.innerHTML[0].innerHTML.push(footer);
                var newNotificationContainer = {
                    type: "div",
                    className: "jModFillNotificationContainer animated fadeIn fast",
                    innerHTML: [ newNotification ],
                    attributes: {
                        "data-jmod-notification": Notification.count,
                        "data-jmod-notification-type": "fill",
                        "data-jmod-fill-notification": Notification.FillCount
                    },
                    EventListeners: {
                        click: function(e) {
                            if (this === e.target && !hasClass(this, "fadeOut")) {
                                jMod.Notification.close(this);
                                eventCancel(e);
                                try {
                                    this.removeEventListener("click", arguments.callee);
                                } catch (e) {}
                                return false;
                            }
                        }
                    }
                };
                return createNewElement(newNotificationContainer);
            },
            create: function(data) {
                var fillNotificationsContainer = this.getWrapper();
                var newNotification = this.generateElement(data);
                fillNotificationsContainer.appendChild(newNotification);
                jMod.Notification.Events.addAll(data, jMod.Notification.count);
                jMod.Notification.count++;
                jMod.Notification.FillCount++;
            },
            close: function(el, num) {
                Notification.Events.fire("onBeforeClose", num, null, el);
                removeClass(el, "fadeIn");
                addClass(el, "fadeOut");
                setTimeout(function(el, num) {
                    el.style.display = "none";
                    Notification.Events.fire("onAfterClose", num, null, el);
                    el.parentElement.removeChild(el);
                }, 800, el, num);
            },
            init: function() {
                var notificationsFullWrapper = Notification("getElement", "notificationsWrapper");
                var fillNotificationsContainer = this.getWrapper();
                if (null == fillNotificationsContainer) {
                    fillNotificationsContainer = document.createElement("div");
                    fillNotificationsContainer.id = FillWrapperId;
                    fillNotificationsContainer.className = "jModFillNotifications";
                    fillNotificationsContainer.style.position = "absolute";
                    notificationsFullWrapper.appendChild(fillNotificationsContainer);
                }
            }
        });
    }(jMod.Notification);
    Notification.UpdateNotification = function(data) {
        var options = jMod.extend(true, {
            version: "N/A",
            script_name: null,
            time: "N/A",
            icon: "fa-download",
            iconAnimation: "",
            title: "%SCRIPTNAME% %VERSION% Available!",
            body: '<i class="fa fa-clock-o"></i> <i>Updated %TIME%...</i>',
            install: {
                href: null,
                onClick: null,
                target: null,
                text: "Install"
            },
            visit: {
                href: null,
                onClick: null,
                target: "_blank",
                text: "Visit Page"
            }
        }, data);
        if (null == options.script_name) options.script_name = jConfig("script.script_name");
        var title = options.title.replace("%SCRIPTNAME%", options.script_name).replace("%VERSION%", options.version).replace("%TIME%", options.time);
        var body = options.body.replace("%SCRIPTNAME%", options.script_name).replace("%VERSION%", options.version).replace("%TIME%", options.time);
        if (!options.install.href || null == options.install.href || "" == options.install.href) {
            options.install.href = jConfig([ "script.script_info.jModdownloadURL", "script.script_info.downloadURL" ]);
            if (typeof options.install.href === _undefined) options.install.href = "javascript:void(0);";
        }
        var btnInstall = document.createElement("a");
        btnInstall.setAttribute("href", options.install.href);
        if (null != options.install.target) btnInstall.setAttribute("target", options.install.target);
        btnInstall.className = "btn btn-success btn-sm";
        btnInstall.innerHTML = options.install.text;
        if ("function" === typeof options.install.onClick) btnInstall.addEventListener("click", options.install.onClick);
        if (!options.visit.href || null == options.visit.href || "" == options.visit.href) if (typeof jConfig("script.script_info.homepage") !== _undefined) options.visit.href = jConfig("script.script_info.homepage"); else options.visit.href = "http://myuserjs.org/script/" + jConfig("script.username") + "/" + jConfig("script.script_name");
        var btnVisit = document.createElement("a");
        btnVisit.setAttribute("href", options.visit.href);
        if (null != options.visit.target) btnVisit.setAttribute("target", options.visit.target);
        btnVisit.className = "btn btn-warning btn-sm";
        btnVisit.innerHTML = options.visit.text;
        if ("function" === typeof options.visit.onClick) btnVisit.addEventListener("click", options.visit.onClick);
        var btnClose = document.createElement("a");
        btnClose.setAttribute("href", "javascript:void(0);");
        btnClose.className = "btn btn-danger btn-sm";
        btnClose.innerHTML = "Close";
        var footer = [ btnInstall, btnVisit, btnClose ];
        Notification({
            title: title,
            body: body,
            footer: footer,
            icon: options.icon,
            iconAnimation: options.iconAnimation,
            type: "small"
        });
    };
    Notification.getElementId = function(name) {
        switch (name.toLowerCase()) {
          case "wrapper":
          case "notificationswrapper":
            return "jModNotificationsWrapper";
            break;

          case "smallwrapper":
          case "notificationssmallwrapper":
            return "jModSmallNotificationsWrapper";
            break;

          case "largewrapper":
          case "notificationslargewrapper":
            return "jModLargeNotificationsWrapper";
            break;

          case "fillwrapper":
          case "notificationsfillwrapper":
            return "jModFillNotificationsWrapper";
            break;

          default:
            return null;
        }
    };
    Notification.getElement = function(name) {
        var tId = Notification.getElementId(name);
        if (null != tId) return document.getElementById(tId);
        return document.getElementById(name);
    };
    Notification.remove = function(notification, notificationNumber) {
        if (null != notification) {
            if (notification.hasAttribute("data-jmod-small-notification")) {
                var tSib = notification;
                var oldTop = parseInt(notification.style.top || 0);
                if (oldTop <= 0) oldTop = 20;
                while (null != tSib.nextElementSibling && tSib.nextElementSibling.hasAttribute("data-jmod-small-notification")) {
                    tSib = tSib.nextElementSibling;
                    tSib.className = "jModSmallNotification SmallBox transitionUp";
                    tSib.style.top = oldTop + "px";
                    oldTop = oldTop + parseInt(tSib.offsetHeight) + 25;
                }
            }
            notification.parentElement.removeChild(notification);
        }
    };
    Notification.Events = new EventsClass([ "onBeforeClose", "onAfterClose" ]);
    Notification.close = function(data) {
        var notificationsFullWrapper = Notification("getElement", "notificationsWrapper");
        var el, num, type, attName = "data-jmod-notification";
        if ("number" === typeof data) {
            num = data;
            el = jMod.$("div[" + attName + '="' + data + '"]', notificationsFullWrapper);
        } else if (isElement(data)) {
            if (data.hasAttribute(attName)) el = data; else if (!(el = jMod.$("div[" + attName + "]", data))) if (!(el = jMod.Element.findParentWithAttribute(data, attName))) return;
            num = parseInt(el.getAttribute(attName));
        } else return;
        if (type = el.getAttribute("data-jmod-notification-type")) Notification.Types.callMethod(type, "close", el, num);
    };
    Notification.count = 0;
    Notification.Initialized = false;
    Notification.init = function() {
        if (!jConfig("Notifications.enabled")) return false;
        Notification.Initialized = true;
        var head = document.getElementsByTagName("head")[0];
        var body = document.getElementsByTagName("body")[0];
        var notificationsFullWrapper = Notification("getElement", "notificationsWrapper");
        if (null == notificationsFullWrapper) {
            notificationsFullWrapper = document.createElement("div");
            notificationsFullWrapper.id = Notification("getElementId", "notificationsWrapper");
            notificationsFullWrapper.className = "jModNotificationsFullWrapper jmod-na jmod-fa";
            document.body.appendChild(notificationsFullWrapper);
        }
        Notification.Types.init();
    };
    jMod.CSS = "";
    jMod.Config.Tabs = jMod.extend({
        enabled: true,
        att: {
            li: "data-jmod-tab",
            ul: "data-jmod-tab-nav-g",
            ct: "data-jmod-tab-cont-g",
            pane: "data-jmod-tab-content"
        },
        cn: {
            nav: "nav-tabs",
            ct: "tab-content"
        }
    }, jMod.Config.Tabs || {});
    var Tabs = jMod.Tabs = function(data) {};
    Tabs.Initialized = false;
    Tabs.GroupCount = 0;
    var TabAtt = Tabs.att = {};
    var TabCn = Tabs.cn = {};
    Object.defineProperties(Tabs.att, {
        li: {
            get: function() {
                return jConfig("Tabs.att.li");
            }
        },
        ul: {
            get: function() {
                return jConfig("Tabs.att.ul");
            }
        },
        ct: {
            get: function() {
                return jConfig("Tabs.att.ct");
            }
        },
        pane: {
            get: function() {
                return jConfig("Tabs.att.pane");
            }
        }
    });
    Object.defineProperties(Tabs.cn, {
        nav: {
            get: function() {
                return jConfig("Tabs.cn.nav");
            }
        },
        ct: {
            get: function() {
                return jConfig("Tabs.cn.ct");
            }
        }
    });
    Tabs.Events = new EventsClass([ "onBeforeShow", "onAfterShow" ]);
    Tabs.handler = {
        click: function(e) {
            var target = e.target;
            var targetLi = target.parentElement;
            if (this.contains(target) && "A" == target.nodeName) {
                var content = this.parentElement.querySelector("." + TabCn.ct);
                var href = getAttribute(target, "href");
                if (href) {
                    var activeContent = content.querySelector(".tab-pane.active");
                    var activeLink = this.querySelector("li.active");
                    var targetContent = content.querySelector(href);
                    if (targetContent) {
                        var tabGroupNum = getAttribute(this, TabAtt.ul);
                        if (false !== Tabs.Events.fire("onBeforeShow", parseInt(tabGroupNum), this, [ target, targetContent ])) {
                            if (activeLink) removeClass(activeLink, "active");
                            if (activeContent) removeClass(activeContent, "active");
                            addClass(targetLi, "active");
                            addClass(targetContent, "active");
                            Tabs.Events.fire("onAfterShow", parseInt(tabGroupNum), this, [ target, targetContent ]);
                        }
                    }
                }
                eventCancel(e);
            }
        }
    };
    Tabs.load = function(data) {
        var tabGroups, el, EventListeners;
        if (isElement(data)) el = data; else if ("object" === typeof data && data.target) {
            el = data.target;
            el.onAfterResize = function(modal) {
                return function() {
                    var tabsNav = this;
                    if (!hasClass(tabsNav, "nav-tabs")) {
                        tabsNav = jMod.$(".nav-tabs", tabsNav);
                        if (!tabsNav) tabsNav = jMod.$(".nav-tabs", modal);
                    }
                    if (tabsNav) waitForComputeableWidth(tabsNav, resizeTabs);
                };
            }(el);
            EventListeners = data.EventListeners;
        } else return;
        if (hasClass(el, "tabbable")) tabGroups = [ el ]; else tabGroups = jMod.$$("div.tabbable", el);
        if (tabGroups) for (var i = 0; i < tabGroups.length; i++) {
            var tabNav = tabGroups[i].querySelector(".nav." + TabCn.nav);
            var tabContent = tabGroups[i].querySelector("." + TabCn.ct);
            if (tabNav && tabContent) {
                tabNav.setAttribute(TabAtt.ul, Tabs.GroupCount);
                tabContent.setAttribute(TabAtt.ct, Tabs.GroupCount);
                if ("object" === typeof data) Tabs.Events.addAll(data, Tabs.GroupCount);
                tabNav.addEventListener("click", Tabs.handler.click);
                Tabs.GroupCount++;
            }
        }
    };
    Tabs.makeNavElement = function(data) {
        var r = {
            type: "li",
            id: data.id,
            className: (data.isActive || data.active ? "active " : "") + (data.className || data["class"] || ""),
            innerHTML: {
                type: "a",
                innerHTML: data.name || data.innerHTML || data.text,
                attributes: {
                    href: "#" + (data.contentId || data.targetId),
                    "data-toggle": "tab"
                }
            },
            attributes: data.attributes || {}
        };
        r.attributes[TabAtt.li] = data.index || -1;
        return r;
    };
    Tabs.makeContentElement = function(data) {
        var r = {
            type: "div",
            id: data.id,
            className: "container tab-pane " + (data.isActive || data.active ? "active " : "") + (data.className || data["class"] || ""),
            innerHTML: data.innerHTML || data.text || "",
            attributes: data.attributes || {}
        };
        r.attributes[TabAtt.pane] = data.index || -1;
        return r;
    };
    Tabs.show = function(tabGroup, tab) {
        var i, tmp, tabEl;
        if ("number" === typeof tabGroup) tabGroup = document.querySelector("ul[" + TabAtt.ul + '="' + tabGroup + '"]');
        if (isElement(tabGroup)) {
            if (hasAttribute(tabGroup, TabAtt.li)) tabEl = tabGroup; else if ("number" === typeof tab) tabEl = jMod.$$("li[" + TabAtt.li + "]", tabGroup)[tab]; else if ("string" === typeof tab) {
                tmp = jMod.$$("li[" + TabAtt.li + "]", tabGroup);
                for (i = 0; i < tmp.length; i++) if (tmp[i].innerHTML == tab) {
                    tabEl = tmp[i];
                    break;
                }
            } else if (isElement(tab) && hasAttribute(tab, TabAtt.li)) tabEl = tab;
            if (tabEl && isElement(tabEl)) return fireClick(tabEl.querySelector('a[data-toggle="tab"]'));
        }
    };
    function waitForComputeableWidth(el, callback, count) {
        var computedNav = (window || unsafeWindow).getComputedStyle(el, null), width = parseInt(computedNav.width);
        count = count || 0;
        if (count < 25 && (isNaN(width) || width > 300)) jMod.Element.requestAnimationFrame(function() {
            waitForComputeableWidth(el, callback, count + 1);
        }); else callback(el);
    }
    function resizeTabs(tabsNav) {
        var width, computedNav, tabsContent = jMod.$(".tab-content", tabsNav.parentElement);
        if (!tabsNav || !tabsContent || null === tabsContent.offsetParent) return;
        computedNav = (window || unsafeWindow).getComputedStyle(tabsNav, null);
        width = parseInt(computedNav.width);
        if (isNaN(width)) {
            if (jMod.debug) jModLogWarning("Tabs.resize", "Tab width is NaN!", tabsNav, tabsContent, computedNav);
        } else if (width > 300) {
            if (jMod.debug) jModLogWarning("Tabs.resize", "Tab width too wide!", width, tabsNav);
        } else if (width > 50) tabsContent.style.marginLeft = width + 11 + "px";
    }
    Tabs.resize = function(tabsNav) {
        jMod.Element.requestAnimationFrame(function() {
            waitForComputeableWidth(tabsNav, resizeTabs);
        });
    };
    jMod.Config.Modal = jMod.extend({
        enabled: true,
        cn: {
            container: "jModModalContainer"
        },
        id: {
            container: "jModModalContainer"
        }
    }, jMod.Config.Modal || {});
    var Modal_ContainerElementClass_Key = "Modal.cn.container";
    var Modal_ContainerElementId_Key = "Modal.id.container";
    var Modal = jMod.Modal = function(data, data2) {
        if (!jConfig("Modal.enabled")) return false;
        if (!jMod.Modal.Initialized) jMod.Modal.init();
        try {
            if ("string" === typeof data) switch (data.toLowerCase()) {
              case "show":
              case "showmodal":
                return jMod.Modal.show.apply(jMod.Modal, Slice.call(arguments, 1));
                break;

              case "hide":
              case "hidemodal":
                return jMod.Modal.hide.apply(jMod.Modal, Slice.call(arguments, 1));
            } else if ("object" === typeof data) {
                var newModal = jMod.Modal.createModal(data);
                var modalNum = parseInt(getAttribute(newModal, "data-jmod-modal"));
                var newModalBackdrop = createNewElement({
                    type: "div",
                    id: "jModModal-" + modalNum + "-backdrop",
                    className: "modal-backdrop fade",
                    style: "display: none;",
                    attributes: {
                        role: "dialog",
                        tabindex: "-1",
                        "data-jmod-modal-backdrop": modalNum
                    },
                    EventListeners: {
                        click: {
                            capture: false,
                            callback: function(e) {
                                if (e.target !== this) return;
                                this.style.display = "none";
                                removeClass(document.body, "jmod-modal-open");
                                eventCancel(e);
                                return false;
                            }
                        }
                    }
                });
                var modalContainer = Modal.Container;
                if (modalContainer) {
                    modalContainer.appendChild(newModalBackdrop);
                    modalContainer.appendChild(newModal);
                }
                jMod.Modal.Modals[modalNum] = {
                    index: modalNum,
                    element: newModal,
                    lockScreen: data.lockScreen || true,
                    data: data
                };
                if (typeof data.features !== _undefined) jMod.Modal.addJSFeatures(newModal, data.features);
                if (true === data2) jMod.Modal.show(newModal);
                return newModal;
            }
        } catch (e) {
            jModLogError(e, "jMod.Modal");
        }
    };
    var _ModalContainer;
    Object.defineProperties(Modal, {
        fn: {
            value: Modal.__proto__
        },
        ModalCount: {
            value: 0,
            writable: true
        },
        CurrentModal: {
            value: -1,
            writable: true
        },
        Modals: {
            value: {},
            writable: true
        },
        Initialized: {
            value: false,
            writable: true
        },
        TooltipCount: {
            value: 0,
            writable: true
        },
        Container: {
            get: function() {
                if (_ModalContainer) return _ModalContainer;
                return _ModalContainer = document.getElementById(jConfig(Modal_ContainerElementId_Key));
            },
            set: function(value) {
                _ModalContainer = value;
            }
        }
    });
    const fadeAnimationLength = 150;
    Modal.getModal = function(number) {
        var modal = document.querySelector('div[data-jmod-modal="' + number + '"]');
        if (modal) return modal;
        if (typeof Modal.Modals[number] !== _undefined) return Modal.Modals[number].element;
        return null;
    };
    Modal.addJSFeatures = function(modal, features) {
        if (features.enableTabs) jMod.Tabs.load({
            target: modal,
            onBeforeShow: function() {
                console.log("Tabs onBeforeShow: ", arguments);
            }
        });
        if (features.enableTooltips) Tooltip(modal);
    };
    Modal.getVisibleModals = function() {
        var i = 0, r = [], modals = jMod.$$("div.modal.in[data-jmod-modal]", Modal.Container);
        for (;i < modals.length; i++) r.push([ modals[i], modals[i].getAttribute("data-jmod-modal") ]);
        return r;
    };
    Modal.getModal2 = function() {
        var i = 0, length = arguments.length, arg, modal, modalNum;
        if (length > 0) {
            for (;i < length; i++) {
                arg = arguments[i];
                if (isElement(arg)) return arg; else if ("string" == typeof arg || "number" == typeof arg) modalNum = parseInt(modalNum);
            }
            if (null != modalNum) {
                if ((modal = jMod.$('div[data-jmod-modal="' + modalNum + '"]', Modal.Container)) && isElement(modal)) return modal;
                if (typeof Modal.Modals[modalNum] != _undefined) return Modal.Modals[modalNum].element;
            }
        }
        return null;
    };
    var modalResizingAttrName = "data-jmod-modal-resizing";
    Modal.resize = function() {
        var modalNum, evt, i, arg, viewportHeight, _dialog, _content, _body, _footer, _header, _modal, _dialogRect, length = arguments.length;
        for (i = 0; i < length; i++) {
            arg = arguments[i];
            if ("number" == typeof arg || "string" == typeof arg) modalNum = parseInt(arg); else if (isElement(arg)) _modal = arg; else if (isEvent(arg)) evt = arg;
        }
        if (_undefined == typeof _modal && _undefined == typeof modalNum) {
            var modals = Modal.getVisibleModals();
            for (i = 0; i < modals.length; i++) Modal.resize(modals[i][0], modals[i][1], evt);
            return;
        }
        if (!_modal) _modal = Modal.getModal2(_modal, modalNum);
        if (_modal && isElement(_modal)) {
            if (getAttribute(_modal, modalResizingAttrName, "boolean")) {
                if (null == _modal.__resizeLast__) return;
                jMod.Element.cancelAnimationFrame(_modal.__resizeLast__);
                _modal.__resizeLast__ = null;
            }
            _modal.setAttribute(modalResizingAttrName, "true");
            viewportHeight = parseInt(jMod.Element.viewportSize.getHeight());
            _dialog = jMod.$(".modal-dialog", _modal);
            _dialogRect = jMod.Element.getClientRect(_dialog);
            if (parseInt(_dialogRect.bottom) <= viewportHeight && !_modal.hasVerticalScrollBar()) addClass(_modal, "no-vertical-scroll");
            try {
                if (false === Modal.Events.fire("onBeforeResize", modalNum, _modal, evt)) {
                    _modal.setAttribute(modalResizingAttrName, "false");
                    return;
                }
            } catch (e) {
                jModLogError(e, "jMod.Modal.resize", 'Error firing event "onBeforeResize"');
                return;
            }
            if (null == modalNum) modalNum = getAttribute(_modal, "data-jmod-modal", "integer");
            _modal.__resizeLast__ = jMod.Element.requestAnimationFrame(function() {
                _modal.__resizeLast__ = null;
                _modal.__resizeLastStartY__ = 0;
                _modal.__resizeLastEndY__ = 0;
                _modal.__resizeLastCurrentY__ = null;
                _modal.__resizeLastCount__ = 0;
                if ("none" != _modal.style.display) {
                    if (null != _modal.__restoreVerticalScroll__) {
                        clearTimeout(_modal.__restoreVerticalScroll__);
                        _modal.__restoreVerticalScroll__ = null;
                    }
                    viewportHeight = parseInt(jMod.Element.viewportSize.getHeight());
                    _body = jMod.$(".modal-body", _dialog);
                    _footer = jMod.$(".modal-footer", _dialog);
                    _header = jMod.$(".modal-header", _dialog);
                    var resizeAnimFunction;
                    _bodyCurrentHeight = parseInt(jMod.Element.getCompStyle(_body, "height")), _bodyCurrentMaxHeight = parseInt(jMod.Element.getCompStyle(_body, "maxHeight")), 
                    _bodyMinHeight = parseInt(jMod.Element.getCompStyle(_body, "minHeight")), computedDialog = jMod.Element.getCompStyleObj(_dialog), 
                    marginTop = parseInt(computedDialog.getPropertyValue("margin-top")), marginBottom = parseInt(computedDialog.getPropertyValue("margin-bottom")), 
                    maxHeight = viewportHeight - parseInt(_header.offsetHeight) - parseInt(_footer.offsetHeight) - marginTop - marginBottom - 15;
                    if (_bodyMinHeight > maxHeight) maxHeight = _bodyMinHeight;
                    if (_bodyCurrentMaxHeight != maxHeight) {
                        _modal.__resizeLastCurrentY__ = _bodyCurrentMaxHeight;
                        _modal.__resizeLastStartY__ = _bodyCurrentMaxHeight;
                        _modal.__resizeLastEndY__ = parseInt(maxHeight);
                        resizeAnimFunction = function() {
                            var tmpId = _modal.__resizeLast__;
                            _modal.__resizeLastCount__++;
                            if (_modal.__resizeLastCount__ > 50) {
                                _body.style.maxHeight = _modal.__resizeLastEndY__ + "px";
                                return;
                            }
                            var current = null != _modal.__resizeLastCurrentY__ && !isNaN(parseInt(_modal.__resizeLastCurrentY__)) ? _modal.__resizeLastCurrentY__ : parseInt(jMod.Element.getCompStyle(_body, "maxHeight"));
                            var duration = parseInt(300 / 16.66666, 10) / 4;
                            var remaining = _modal.__resizeLastEndY__ - current;
                            var time = timeFromPosition(parseInt(_modal.__resizeLastStartY__), remaining, duration, current);
                            if (isNaN(time)) time = 0; else if (time < 0) time *= -1;
                            if (0 != remaining) {
                                var delta;
                                if (remaining > 0) delta = Math.max(1, easeOutSin(remaining, duration, time)); else delta = Math.min(-1, easeOutSin(remaining, duration, time));
                                if (0 == delta || isNaN(delta)) {
                                    _body.style.maxHeight = _modal.__resizeLastEndY__ + "px";
                                    return;
                                }
                                _modal.__resizeLastCurrentY__ = current + delta;
                                _body.style.maxHeight = _modal.__resizeLastCurrentY__ + "px";
                                if (null == _modal.__resizeLast__ || _modal.__resizeLast__ == tmpId) {
                                    if (_modal.__resizeLastCurrentY__ != _modal.__resizeLastEndY__ && null != _modal.__resizeLastCurrentY__) _modal.__resizeLast__ = jMod.Element.requestAnimationFrame(resizeAnimFunction); else _modal.__resizeLast__ = null;
                                    return;
                                }
                            }
                        };
                        _modal.__resizeLast__ = jMod.Element.requestAnimationFrame(resizeAnimFunction);
                    }
                    _dialogRect = jMod.Element.getClientRect(_dialog);
                    if (parseInt(_dialogRect.bottom) > viewportHeight && parseInt(_dialogRect.height) < _bodyMinHeight + parseInt(_header.offsetHeight) + parseInt(_footer.offsetHeight) + 15) removeClass(_modal, "no-vertical-scroll"); else _modal.__restoreVerticalScroll__ = setTimeout(function(_modal, modalResizingAttrName) {
                        _modal.__restoreVerticalScroll__ = null;
                        if (!getAttribute(_modal, modalResizingAttrName, "boolean")) removeClass(_modal, "no-vertical-scroll");
                    }, 100, _modal, modalResizingAttrName);
                }
                try {
                    Modal.Events.fire("onAfterResize", modalNum, _modal, evt);
                } catch (e) {
                    jModLogError(e, "jMod.Modal.resize", 'Error firing event "onAfterResize"');
                }
                _modal.setAttribute(modalResizingAttrName, "false");
            });
        }
    };
    Modal.show = function(modal, modalNum, e) {
        try {
            if ("number" === typeof modal && "number" !== typeof modalNum) {
                if (typeof e === _undefined && typeof modalNum !== _undefined) e = modalNum;
                modalNum = modal;
            }
            if ((typeof modal === _undefined || null == modal) && typeof modalNum === _undefined) return;
            if ((typeof modal === _undefined || null == modal || "number" === typeof modal) && "number" === typeof modalNum) modal = jMod.$('div[data-jmod-modal="' + modalNum + '"]'); else if (typeof modal !== _undefined && null != modal && typeof modalNum === _undefined) modalNum = getAttribute(modal, "data-jmod-modal");
            if (Modal.CurrentModal != -1 && Modal.CurrentModal != modalNum) Modal.hide();
            if (modal) {
                var modalBackdrop = jMod.$('div[data-jmod-modal-backdrop="' + modalNum + '"]');
                var r = Modal.Events.fire("onBeforeShow", modalNum, modal, [ e || null ]);
                Modal.CurrentModal = modalNum;
                addClass(jMod.Element.document.body, "jmod-modal-open");
                modalBackdrop.style.display = "block";
                modal.style.display = "block";
                setTimeout(function(modal, modalBackdrop) {
                    addClass(modalBackdrop, "in");
                    addClass(modal, "in");
                    jMod.Element.requestAnimationFrame(function() {
                        Modal.resize(modal);
                    });
                }, 1, modal, modalBackdrop);
                setTimeout(function(modal, modalNum, e) {
                    Modal.Events.fire("onAfterShow", modalNum, modal, [ e || null ]);
                }, fadeAnimationLength, modal, modalNum, e || null);
            }
        } catch (e) {
            jModLogError(e, "jMod.Modal.show");
        }
    };
    Modal.hide = function(modal, modalNum, e) {
        try {
            if (typeof modal === _undefined && typeof modalNum === _undefined && Modal.CurrentModal != -1) {
                modalNum = Modal.CurrentModal;
                modal = Modal.getModal(Modal.CurrentModal);
            }
            if ("number" === typeof modal && "number" !== typeof modalNum) {
                if (typeof e === _undefined && typeof modalNum !== _undefined) e = modalNum;
                modalNum = modal;
            }
            if (typeof modal === _undefined && typeof modalNum === _undefined) return;
            if (!isElement(modal) && "number" === typeof modalNum) modal = Modal.getModal(modalNum); else if (typeof modal !== _undefined && typeof modalNum === _undefined) modalNum = getAttribute(modal, "data-jmod-modal");
            if (modal) {
                var modalBackdrop = jMod.$('div[data-jmod-modal-backdrop="' + modalNum + '"]');
                var r = Modal.Events.fire("onBeforeHide", modalNum, modal, [ e || null ]);
                Modal.CurrentModal = -1;
                removeClass(jMod.Element.document.body, "jmod-modal-open");
                removeClasses(modal, [ "in", "no-vertical-scroll" ]);
                removeClass(modalBackdrop, "in");
                setTimeout(function(modal, modalNum, e, modalBackdrop) {
                    modal.style.display = "none";
                    modalBackdrop.style.display = "none";
                    Modal.Events.fire("onAfterHide", modalNum, modal, [ e || null ]);
                }, fadeAnimationLength, modal, modalNum, e || null, modalBackdrop);
            }
        } catch (e) {
            jModLogError(e, "jMod.Modal.hide");
        }
    };
    var modalEventNames = [ "onBeforeShow", "onAfterShow", "onBeforeHide", "onAfterHide", "onBeforeResize", "onAfterResize" ];
    Modal.Events = new EventsClass(modalEventNames);
    Modal.createModal = function(data) {
        var newModalNum = Modal.ModalCount++;
        Modal.Events.addAll(data, newModalNum);
        var newModal = createNewElement({
            type: "div",
            id: data.id || "jModModal-" + newModalNum,
            className: "modal fade " + (data.className || data["class"] || ""),
            style: "display: none;",
            attributes: {
                role: "dialog",
                tabindex: "-1",
                "data-jmod-modal": newModalNum
            },
            EventListeners: {
                click: {
                    capture: false,
                    callback: function(e) {
                        if (e.target !== this) return;
                        var modal = e.target;
                        var modalNum = parseInt(getAttribute(modal, "data-jmod-modal"));
                        Modal.hide(modal, modalNum, e);
                        eventCancel(e);
                        return false;
                    }
                }
            }
        });
        for (var i = 0; i < modalEventNames.length; i++) Object.defineProperty(newModal, modalEventNames[i], {
            get: function(evtName, modalEl, modalNum) {
                return function() {
                    Modal.Events.getAll(modalNum, evtName);
                }.bind(modalEl);
            }.call(newModal, modalEventNames[i], newModal, newModalNum),
            set: function(evtName, modalEl, modalNum) {
                return function(newListener) {
                    Modal.Events.add(modalNum, evtName, newListener);
                }.bind(modalEl);
            }.call(newModal, modalEventNames[i], newModal, newModalNum),
            enumerable: true,
            configurable: false
        });
        newModal.hasVerticalScrollBar = function() {
            var overflowY = jMod.Element.getCompStyle(this, "overflowY");
            if (null === this.offsetParent || "hidden" == overflowY || "visible" == overflowY) return false;
            return "scroll" == overflowY || this.scrollHeight > jMod.Element.viewportSize.getHeight();
        }.bind(newModal);
        var newModalDialog = createNewElement({
            type: "div",
            className: "modal-dialog"
        });
        if (typeof data.style !== _undefined) for (var styleName in data.style) newModalDialog.style[styleName] = data.style[styleName];
        newModal.appendChild(newModalDialog);
        var newModalContent = createNewElement({
            type: "div",
            className: "modal-content"
        });
        newModalDialog.appendChild(newModalContent);
        var newModalHeader = createNewElement({
            type: "div",
            className: "modal-header"
        });
        newModalContent.appendChild(newModalHeader);
        var newModalBody = createNewElement({
            type: "div",
            className: "modal-body"
        });
        newModalContent.appendChild(newModalBody);
        var newModalFooter = createNewElement({
            type: "div",
            className: "modal-footer"
        });
        newModalContent.appendChild(newModalFooter);
        appendChild(newModalHeader, data.title);
        var newModalTitleCloseButton = createNewElement({
            type: "div",
            className: "yt-close-btn-wrapper",
            innerHTML: '<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-close-btn">',
            EventListeners: {
                click: {
                    capture: false,
                    callback: function(e) {
                        var modal = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
                        var modalNum = parseInt(getAttribute(modal, "data-jmod-modal"));
                        return Modal.hide(modal, modalNum, e);
                    }
                }
            }
        });
        newModalHeader.appendChild(newModalTitleCloseButton);
        appendChild(newModalBody, data.body);
        appendChild(newModalFooter, data.footer);
        if (typeof data.buttons !== _undefined) for (var i in data.buttons) try {
            var newButtonArgs = jMod.extend(true, {
                type: "button",
                text: "button"
            }, data.buttons[i]);
            var newButton = createNewElement(newButtonArgs);
            if (newButton) {
                if (!hasClass(newButton, "btn")) addClass(newButton, "brn");
                if (!/btn\-(default|primary|success|info|warning|danger)/i.test(newButton.className)) addClass(newButton, "btn-default");
                newModalFooter.appendChild(newButton);
            }
        } catch (e) {
            jModLogError(e, "jMod.Modal.createModal", "footer buttons");
        }
        var newModalFooterCloseButton = createNewElement({
            type: "button",
            className: "btn btn-default",
            innerHTML: "Close",
            attributes: {
                type: "button"
            },
            EventListeners: {
                click: {
                    capture: false,
                    callback: function(e) {
                        if (e.target !== this) return;
                        var modal = e.target.parentElement.parentElement.parentElement.parentElement;
                        var modalNum = parseInt(getAttribute(modal, "data-jmod-modal"));
                        Modal.hide(modal, modalNum, e);
                        eventCancel(e);
                        return false;
                    }
                }
            }
        });
        newModalFooter.appendChild(newModalFooterCloseButton);
        return newModal;
    };
    Modal.init = function() {
        Modal.Initialized = true;
        var modalContainer = Modal.Container;
        if (null == modalContainer) {
            modalContainer = jMod.Element.document.createElement("div");
            modalContainer.id = jConfig(Modal_ContainerElementId_Key);
            modalContainer.className = "jmod-na jmod-fa jmod-gi " + jConfig(Modal_ContainerElementClass_Key);
            jMod.Element.document.body.appendChild(modalContainer);
        }
        (window || unsafeWindow).addEventListener("resize", function(e) {
            jMod.Modal.resize(e);
        });
    };
    jMod.CSS = ".jmod-na .nav.nav-tabs{border-width:0px;border-right-width:1px !important;border-style:solid !important;-webkit-border-image:-webkit-gradient(linear,0 0,0 100%,from(rgba(221,221,221,1)),color-stop(65%,rgba(221,221,221,1)),to(rgba(0,0,0,0))) 1 100%;-webkit-border-image:-webkit-linear-gradient(rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;-moz-border-image:-moz-linear-gradient(rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;-o-border-image:-o-linear-gradient(rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;border-image:linear-gradient(to bottom,rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;}.jmod-na .no-vertical-scroll[data-jmod-modal]{overflow-y:hidden;}";
    jMod.Config.Settings = jMod.extend({
        enabled: true,
        cn: {
            modal: "jModSettingsModal"
        },
        id: {
            modal: "jModSettingsModal"
        }
    }, jMod.Config.Settings || {});
    var Settings_ModalElementId_Key = "Settings.id.modal";
    var Settings_ModalElementClass_Key = "Settings.cn.modal";
    var Settings = jMod.Settings = function(data, data2) {
        if (!jConfig("Settings.enabled")) return false;
        if (!jMod.Settings.Initialized) jMod.Settings.init();
        if ("string" === typeof data) switch (data.toLowerCase()) {
          case "":        } else if ("object" === typeof data) {
            Settings._data = data;
            jMod.Settings.__storedData = undefined;
            jMod.Settings.settingsModalElement = jMod.Settings.MakeSettingsModal(data);
            Settings.PrefTypes.onChange();
            jMod.Settings.onResize();
        }
    };
    Settings.Initialized = false;
    Settings.getDefault = function(prefName) {
        var i = 0, data = Settings._data;
        if (data && (data = data.settings)) for (i; i < data.length; i++) if (data[i].name == prefName) return data[i]["default"];
    };
    Settings.get = function(prefName, noDefault) {
        var storedData = Settings._storedData;
        if (_undefined === typeof prefName) return storedData;
        return storedData && storedData[prefName] !== undefined ? storedData[prefName] : noDefault ? undefined : Settings.getDefault(prefName);
    };
    Settings.set = function(prefName, value) {
        var storedData = Settings._storedData || {};
        storedData[prefName] = value;
        Settings._storedData = storedData;
    };
    Settings.clear = function() {
        Settings._storedData = {};
    };
    Object.defineProperties(Settings, {
        _data: {
            value: {},
            writable: true,
            enumerable: false
        },
        __storedData: {
            value: undefined,
            enumerable: false,
            writable: true,
            configurable: true
        },
        _storedData: {
            get: function() {
                if (typeof Settings.__storedData !== _undefined) return Settings.__storedData;
                try {
                    var str = jMod.getValue("Settings_" + jConfig("script.script_name"));
                    if (str) return JSON.parse(str);
                } catch (e) {}
            },
            set: function(obj) {
                Settings.__storedData = obj;
                try {
                    jMod.setValue("Settings_" + jConfig("script.script_name"), JSON.stringify(obj));
                } catch (e) {}
            },
            enumerable: false
        },
        _settingsModalElement: {
            value: null,
            writable: true,
            enumerable: false,
            configurable: true
        },
        settingsModalElement: {
            get: function() {
                if (_undefined !== typeof Settings._settingsModalElement && null != Settings._settingsModalElement) return Settings._settingsModalElement;
                return Settings._settingsModalElement = jMod.$(".jModSettings");
            },
            set: function(value) {
                Settings._settingsModalElement = value;
            },
            enumerable: true
        }
    });
    Settings.PrefTypes = {
        _types: {},
        _call: function(fName, typeName, data) {
            if (typeof this._types[typeName] !== _undefined && "function" === typeof this._types[typeName][fName]) return this._types[typeName][fName].apply(this._types[typeName], Slice.call(arguments, 2));
            return undefined;
        },
        add: function(typeName, data) {
            this._types[typeName] = data;
        },
        make: function(typeName, data) {
            return this._call("make", typeName, data);
        },
        getValue: function(data) {
            var prefEl = jMod.$('#jModSettingsModal [name="' + data.name + '"]');
            return prefEl ? this._call("getValue", data.type, prefEl, data) : undefined;
        },
        getValueByName: function(name) {
            var data, i = 0;
            try {
                data = Settings._data.settings;
            } catch (e) {
                return;
            }
            for (i; i < data.length; i++) if (data[i].name == name) return this.getValue(data[i]);
        },
        getDataByName: function(name) {
            var data, i = 0;
            try {
                data = Settings._data.settings;
            } catch (e) {
                return;
            }
            for (i; i < data.length; i++) if (data[i].name == name) return data[i];
        },
        setValue: function(data, value) {
            var prefEl = jMod.$('#jModSettingsModal [name="' + data.name + '"]');
            return prefEl ? this._call("setValue", data.type, prefEl, data, value) : undefined;
        },
        enable: function(_data) {
            var data, sData, prefEl, i = 0;
            if ("object" == typeof _data) data = _data; else if ("string" == typeof _data) {
                try {
                    sData = Settings._data.settings;
                } catch (e) {
                    return;
                }
                for (i; i < sData.length; i++) if (sData[i].name == _data) {
                    data = sData[i];
                    break;
                }
            }
            if (data) {
                prefEl = jMod.$('#jModSettingsModal [name="' + data.name + '"]');
                return prefEl ? this._call("enable", data.type, prefEl, data) : undefined;
            }
        },
        disable: function(_data) {
            var data, sData, prefEl, i = 0;
            if ("object" == typeof _data) data = _data; else if ("string" == typeof _data) {
                try {
                    sData = Settings._data.settings;
                } catch (e) {
                    return;
                }
                for (i; i < sData.length; i++) if (sData[i].name == _data) {
                    data = sData[i];
                    break;
                }
            }
            if (data) {
                prefEl = jMod.$('#jModSettingsModal [name="' + data.name + '"]');
                return prefEl ? this._call("disable", data.type, prefEl, data) : undefined;
            }
        },
        onChange: function(name, newValue) {
            var data, depend, dependName, dependValue, x, enable = true, type, prefEl, multiValue = false, i = 0;
            try {
                data = Settings._data.settings;
            } catch (e) {
                return;
            }
            for (i; i < data.length; i++) {
                enable = true;
                if (data[i].depend && ("function" === typeof data[i].depend || _undefined == typeof name || _undefined !== typeof data[i].depend[name])) {
                    if ("function" === typeof data[i].depend) {
                        prefEl = jMod.$('#jModSettingsModal [name="' + data[i].name + '"]');
                        enable = data[i].depend(prefEl, data[i]);
                    } else for (dependName in data[i].depend) {
                        depend = data[i].depend[dependName];
                        type = typeof depend;
                        var dependData = Settings.PrefTypes.getDataByName(dependName);
                        try {
                            multiValue = true == Settings.PrefTypes._types[dependData.type].multiValue;
                        } catch (e) {
                            multiValue = false;
                        }
                        if (name == dependName) dependValue = newValue; else if (_undefined == typeof (dependValue = this.getValueByName(dependName))) dependValue = Settings.get(dependName);
                        if (multiValue) dependValue = dependValue.split(",");
                        switch (type) {
                          case "function":
                            enable = depend(jMod.$('#jModSettingsModal [name="' + data[i].name + '"]'), data[i], dependValue, dependData);
                            break;

                          case "object":
                            if ("array" == RealTypeOf(depend)) if (multiValue) {
                                for (x = 0; x < depend.length; x++) if (dependValue.indexOf(depend[x]) == -1) {
                                    enable = false;
                                    break;
                                }
                            } else {
                                enable = false;
                                for (x = 0; x < depend.length; x++) if (depend[x] == dependValue) {
                                    enable = true;
                                    break;
                                }
                            }
                            break;

                          case "string":
                            if (multiValue) {
                                depend = depend.split(",");
                                for (x = 0; x < depend.length; x++) if (dependValue.indexOf(depend[x]) == -1) {
                                    enable = false;
                                    break;
                                }
                            } else if (dependValue != depend) enable = false;
                            break;

                          case "number":
                            if (multiValue) {
                                if (dependValue.length < depend) enable = false;
                            } else if (parseInt(dependValue) != parseInt(depend)) enable = false;
                        }
                        if (!enable) break;
                    }
                    if (enable) Settings.PrefTypes.enable(data[i]); else Settings.PrefTypes.disable(data[i]);
                }
            }
        }
    };
    Settings.getElementId = function(name) {
        switch (name.toLowerCase()) {
          case "settings":
          case "settingselement":
          case "settingmodalselement":
            return "jModSettingsModal";
        }
        return null;
    };
    Settings.getElement = function(name) {
        var tId = Settings.getElementId(name);
        if (null != tId) return document.getElementById(tId);
        return document.getElementById(name);
    };
    function getIcon(data) {
        var iconName = data.name;
        var tmp = iconName.split(" ");
        if (tmp.indexOf("fa") == -1 && tmp.indexOf("glyphicon") == -1) if (iconName.indexOf("fa-") != -1) iconName = "fa " + iconName; else if (iconName.indexOf("glyphicon-") != -1) iconName = "glyphicon " + iconName;
        var iconOpts = {
            type: "i",
            className: iconName,
            attributes: {}
        };
        if (data.tooltip) iconOpts = setTooltipProperties(iconOpts, data.tooltip);
        return iconOpts;
    }
    Settings.PrefTypes.add("select", {
        make: function(data) {
            var text = data.description || data.name;
            var defaultValue = data["default"] || null;
            var storedValue = Settings.get(data.name);
            var currentValue = storedValue || defaultValue;
            var options = [];
            for (var optionName in data.options) options.push({
                type: "option",
                innerHTML: data.options[optionName],
                attributes: {
                    value: optionName,
                    selected: currentValue && currentValue == optionName ? true : null
                }
            });
            var opts = {
                type: "div",
                className: "pref-container",
                innerHTML: {
                    type: "select",
                    className: "form-control pref",
                    innerHTML: options,
                    style: data.style,
                    attributes: {
                        name: data.name,
                        "data-jmod-settings-pref": data.name,
                        "data-jmod-settings-pref-default": data["default"] || null,
                        "data-jmod-settings-pref-type": "select"
                    },
                    EventListeners: {
                        change: function(e) {
                            Settings.PrefTypes.onChange(e.target.getAttribute("name"), e.target.value);
                        }
                    }
                }
            };
            if (_undefined != typeof data["tooltip"] && (_undefined != typeof data.tooltip["innerHTML"] || _undefined != typeof data.tooltip["text"])) opts.innerHTML = setTooltipProperties(opts.innerHTML, data.tooltip);
            return opts;
        },
        getValue: function(prefEl, data) {
            return prefEl.options[prefEl.selectedIndex].value;
        },
        setValue: function(prefEl, data, value) {
            for (var i = 0; i < prefEl.options.length; i++) if (prefEl.options[i].value == value) {
                prefEl.selectedIndex = i;
                return true;
            }
            return false;
        },
        enable: function(prefEl, data) {
            if (prefEl.hasAttribute("disabled")) prefEl.removeAttribute("disabled");
        },
        disable: function(prefEl, data) {
            prefEl.setAttribute("disabled", "disabled");
        }
    });
    Settings.PrefTypes.add("checkbox", {
        multiValue: true,
        make: function(data) {
            var text = data.description || data.name;
            var defaultValue = data["default"] || "";
            var storedValue = Settings.get(data.name);
            var currentValue = storedValue || "" === storedValue ? storedValue : defaultValue;
            if ("object" !== typeof currentValue) currentValue = currentValue.split(",");
            var options = [];
            for (var optionName in data.options) {
                var tmpOption = {
                    type: "label",
                    className: "checkbox-inline",
                    innerHTML: [ {
                        type: "input",
                        className: "checkbox",
                        attributes: {
                            name: data.name + "-o",
                            type: "checkbox",
                            value: optionName
                        },
                        checked: currentValue.indexOf(optionName) != -1 ? true : false,
                        EventListeners: {
                            CheckboxStateChange: function(e) {
                                var name = e.target.parentElement.parentElement.getAttribute("name");
                                var value = Settings.PrefTypes.getValueByName(name);
                                Settings.PrefTypes.onChange(name, value);
                            }
                        }
                    }, {
                        type: "span",
                        innerHTML: data.options[optionName].label,
                        attributes: {}
                    } ],
                    attributes: {}
                };
                if (_undefined != typeof data.options[optionName]["tooltip"] && (_undefined != typeof data.options[optionName].tooltip["innerHTML"] || _undefined != typeof data.options[optionName].tooltip["text"])) tmpOption.innerHTML[1] = setTooltipProperties(tmpOption.innerHTML[1], data.options[optionName].tooltip);
                options.push(tmpOption);
            }
            var opts = {
                type: "div",
                className: "form-group pref-container",
                innerHTML: options,
                attributes: {
                    name: data.name
                }
            };
            return opts;
        },
        getValue: function(prefEl, data) {
            var r = [];
            var prefs = jMod.$$("input:checked", prefEl);
            for (var i = 0; i < prefs.length; i++) r.push(prefs[i].value);
            return r.join(",");
        },
        setValue: function(prefEl, data, value) {
            var valueArr = value.split(",");
            for (var i = 0; i < prefEl.options.length; i++) if (valueArr.indexOf(getAttribute(prefEl.options[i], "name")) != -1) prefEl.options[i].checked = true; else prefEl.options[i].checked = false;
            return true;
        },
        enable: function(prefEl, data) {
            var prefs = jMod.$$("input", prefEl);
            for (var i = 0; i < prefs.length; i++) if (prefs[i].hasAttribute("disabled")) prefs[i].removeAttribute("disabled");
        },
        disable: function(prefEl, data) {
            var prefs = jMod.$$("input", prefEl);
            for (var i = 0; i < prefs.length; i++) prefs[i].setAttribute("disabled", "disabled");
        }
    });
    Settings.PrefTypes.add("radio", {
        make: function(data) {
            var text = data.description || data.name;
            var defaultValue = data["default"] || "";
            var storedValue = Settings.get(data.name);
            var currentValue = storedValue || defaultValue;
            var options = [];
            for (var optionName in data.options) {
                var tmpOption = {
                    type: "label",
                    className: "radio radio-inline",
                    innerHTML: [ {
                        type: "input",
                        className: "radiobox",
                        attributes: {
                            type: "radio",
                            value: optionName,
                            name: data.name + "-o"
                        },
                        checked: currentValue.indexOf(optionName) != -1 ? true : false,
                        EventListeners: {
                            RadioStateChange: function(e) {
                                var name = e.target.parentElement.parentElement.getAttribute("name");
                                var value = Settings.PrefTypes.getValueByName(name);
                                Settings.PrefTypes.onChange(name, value);
                            }
                        }
                    }, {
                        type: "span",
                        innerHTML: data.options[optionName].label,
                        attributes: {}
                    } ],
                    attributes: {}
                };
                if (_undefined != typeof data.options[optionName]["tooltip"] && (_undefined != typeof data.options[optionName].tooltip["innerHTML"] || _undefined != typeof data.options[optionName].tooltip["text"])) tmpOption.innerHTML[1] = setTooltipProperties(tmpOption.innerHTML[1], data.options[optionName].tooltip);
                options.push(tmpOption);
            }
            var opts = {
                type: "div",
                className: "form-group pref-container",
                innerHTML: options,
                attributes: {
                    name: data.name
                }
            };
            return opts;
        },
        getValue: function(prefEl, data) {
            return jMod.$("input:checked", prefEl).value;
        },
        setValue: function(prefEl, data, value) {
            for (var i = 0; i < prefEl.options.length; i++) if (getAttribute(prefEl.options[i], "name") == value) prefEl.options[i].checked = true; else prefEl.options[i].checked = false;
            return true;
        },
        enable: function(prefEl, data) {
            var prefs = jMod.$$("input", prefEl);
            for (var i = 0; i < prefs.length; i++) if (prefs[i].hasAttribute("disabled")) prefs[i].removeAttribute("disabled");
        },
        disable: function(prefEl, data) {
            var prefs = jMod.$$("input", prefEl);
            for (var i = 0; i < prefs.length; i++) prefs[i].setAttribute("disabled", "disabled");
        }
    });
    Settings.PrefTypes.add("toggle", {
        multiValue: true,
        make: function(data) {
            var text = data.description || data.name;
            var defaultValue = data["default"] || "";
            var storedValue = Settings.get(data.name);
            var currentValue = storedValue || "" === storedValue.trim() ? storedValue : defaultValue;
            var options = [];
            for (var optionName in data.options) {
                var tmpOption = {
                    type: "label",
                    className: "toggle " + (data.options[optionName].className || ""),
                    innerHTML: [ {
                        type: "input",
                        className: "radiobox",
                        attributes: {
                            type: "checkbox",
                            value: optionName,
                            name: data.name + "-o"
                        },
                        checked: currentValue.indexOf(optionName) != -1 ? true : false,
                        EventListeners: {
                            RadioStateChange: function(e) {
                                var name = e.target.parentElement.parentElement.getAttribute("name");
                                var value = Settings.PrefTypes.getValueByName(name);
                                Settings.PrefTypes.onChange(name, value);
                            }
                        }
                    }, {
                        type: "i",
                        className: "",
                        attributes: {
                            "data-jmod-swchon-text": data.options[optionName].on || "ON",
                            "data-jmod-swchoff-text": data.options[optionName].off || "OFF"
                        }
                    }, data.options[optionName].label ],
                    attributes: {}
                };
                if (_undefined != typeof data.options[optionName]["tooltip"] && (_undefined != typeof data.options[optionName].tooltip["innerHTML"] || _undefined != typeof data.options[optionName].tooltip["text"])) tmpOption.innerHTML[1] = setTooltipProperties(tmpOption.innerHTML[1], data.options[optionName].tooltip);
                options.push(tmpOption);
            }
            var opts = {
                type: "div",
                className: "form-group pref-container",
                innerHTML: options,
                attributes: {
                    name: data.name
                }
            };
            return opts;
        },
        getValue: function(prefEl, data) {
            var r = [];
            var prefs = jMod.$$("input:checked", prefEl);
            for (var i = 0; i < prefs.length; i++) r.push(prefs[i].value);
            return r.join(",");
        },
        setValue: function(prefEl, data, value) {
            var valueArr = value.split(",");
            for (var i = 0; i < prefEl.options.length; i++) if (valueArr.indexOf(getAttribute(prefEl.options[i], "name")) != -1) prefEl.options[i].checked = true; else prefEl.options[i].checked = false;
            return true;
        },
        enable: function(prefEl, data) {
            var prefs = jMod.$$("input", prefEl);
            for (var i = 0; i < prefs.length; i++) if (prefs[i].hasAttribute("disabled")) prefs[i].removeAttribute("disabled");
        },
        disable: function(prefEl, data) {
            var prefs = jMod.$$("input", prefEl);
            for (var i = 0; i < prefs.length; i++) prefs[i].setAttribute("disabled", "disabled");
        }
    });
    Settings.PrefTypes.add("input", {
        make: function(data) {
            var text = data.description || data.name;
            var defaultValue = data["default"] || "";
            var storedValue = Settings.get(data.name);
            var opts = {
                type: "div",
                className: "pref-container",
                innerHTML: [ {
                    type: "input",
                    className: "form-control pref",
                    innerHTML: "",
                    style: data.style,
                    attributes: {
                        value: storedValue || "" === storedValue ? storedValue : defaultValue,
                        name: data.name,
                        type: "text",
                        "data-jmod-settings-pref": data.name,
                        "data-jmod-settings-pref-default": data["default"] || null
                    },
                    EventListeners: {
                        input: function(e) {
                            Settings.PrefTypes.onChange(e.target.getAttribute("name"), e.target.value);
                        }
                    }
                } ]
            };
            if (_undefined != typeof data["tooltip"] && (_undefined != typeof data.tooltip["innerHTML"] || _undefined != typeof data.tooltip["text"])) opts.innerHTML[0] = setTooltipProperties(opts.innerHTML[0], data.tooltip);
            if (_undefined != typeof data["icon"]) {
                opts.className += " input-icon-right";
                var iconOpts = getIcon(data.icon);
                opts.innerHTML.unshift(iconOpts);
            }
            return opts;
        },
        getValue: function(prefEl, data) {
            return prefEl.value;
        },
        setValue: function(prefEl, data, value) {
            prefEl.value = value;
            return true;
        },
        enable: function(prefEl, data) {
            if (prefEl.hasAttribute("disabled")) prefEl.removeAttribute("disabled");
        },
        disable: function(prefEl, data) {
            prefEl.setAttribute("disabled", "disabled");
        }
    });
    Settings.PrefTypes.add("textarea", {
        make: function(data) {
            var text = data.description || data.name;
            var defaultValue = data["default"] || "";
            var storedValue = Settings.get(data.name);
            var opts = {
                type: "div",
                className: "pref-container",
                innerHTML: [ {
                    type: "textarea",
                    className: "form-control pref",
                    innerHTML: storedValue || "" === storedValue ? storedValue : defaultValue,
                    style: data.style,
                    attributes: {
                        name: data.name,
                        type: "text",
                        "data-jmod-settings-pref": data.name,
                        "data-jmod-settings-pref-default": data["default"] || null
                    },
                    EventListeners: {
                        input: function(e) {
                            Settings.PrefTypes.onChange(e.target.getAttribute("name"), e.target.value);
                        }
                    }
                } ]
            };
            if (_undefined != typeof data["tooltip"] && (_undefined != typeof data.tooltip["innerHTML"] || _undefined != typeof data.tooltip["text"])) opts.innerHTML[0] = setTooltipProperties(opts.innerHTML[0], data.tooltip);
            if (_undefined != typeof data["icon"]) {
                var iconOpts = getIcon(data.icon);
                iconOpts.className += " icon-append";
                opts.innerHTML.unshift(iconOpts);
            }
            return opts;
        },
        getValue: function(prefEl, data) {
            return prefEl.value;
        },
        setValue: function(prefEl, data, value) {
            prefEl.value = value;
            return true;
        },
        enable: function(prefEl, data) {
            if (prefEl.hasAttribute("disabled")) prefEl.removeAttribute("disabled");
        },
        disable: function(prefEl, data) {
            prefEl.setAttribute("disabled", "disabled");
        }
    });
    Settings.PrefTypes.add("range", {
        make: function(data) {
            var text = data.description || data.name;
            var defaultValue = data["default"] || "";
            var storedValue = Settings.get(data.name);
            var opts = {
                type: "div",
                className: "pref-container",
                innerHTML: [ {
                    type: "input",
                    className: "form-control pref",
                    innerHTML: "",
                    style: data.style,
                    min: parseInt(data.min || "0"),
                    max: parseInt(data.max || "100"),
                    step: parseInt(data.step || "1"),
                    value: parseInt(storedValue || defaultValue),
                    attributes: {
                        name: data.name,
                        type: "range",
                        "data-jmod-settings-pref": data.name,
                        "data-jmod-settings-pref-default": data["default"] || null
                    },
                    EventListeners: {
                        change: function(e) {
                            var textbox = e.target.nextSibling;
                            textbox.value = this.value;
                        },
                        input: function(e) {
                            var textbox = e.target.nextSibling;
                            textbox.value = this.value;
                        }
                    }
                }, {
                    type: "input",
                    className: "form-control pref disabled range-value",
                    innerHTMLL: "",
                    attributes: {
                        value: storedValue || defaultValue,
                        disabled: "disabled"
                    },
                    EventListeners: {
                        keypress: function(e) {
                            console.log("keypress", e);
                        }
                    }
                } ]
            };
            if (_undefined != typeof data["tooltip"] && (_undefined != typeof data.tooltip["innerHTML"] || _undefined != typeof data.tooltip["text"])) opts.innerHTML[0] = setTooltipProperties(opts.innerHTML[0], data.tooltip);
            return opts;
        },
        getValue: function(prefEl, data) {
            return prefEl.value;
        },
        setValue: function(prefEl, data, value) {
            prefEl.value = value;
            return true;
        },
        enable: function(prefEl, data) {
            if (prefEl.hasAttribute("disabled")) prefEl.removeAttribute("disabled");
        },
        disable: function(prefEl, data) {
            prefEl.setAttribute("disabled", "disabled");
        }
    });
    var setBackgroundURI = function(el, uri, innerHTML) {
        el.innerHTML = innerHTML || "";
        el.style.backgroundImage = "url(" + uri + ")";
        el.setAttribute("data-src", uri);
        var bgimg = new Image();
        bgimg.onload = function() {
            var tmpHeight = parseInt(bgimg.naturalHeight) + "px";
            var tmpWidth = parseInt(bgimg.naturalWidth) + "px";
            if (!isNaN(bgimg.naturalHeight) && !isNaN(bgimg.naturalWidth)) {
                if (parseInt(tmpHeight) > 300) {
                    tmpHeight = "300px";
                    tmpWidth = "100%";
                    el.style.backgroundSize = "contain";
                } else el.style.backgroundSize = "100% 100%";
                el.style.height = tmpHeight;
                el.style.width = tmpWidth;
            }
            bgimg.parentElement.removeChild(bgimg);
        };
        bgimg.style.position = "absolute";
        bgimg.style.opacity = "0";
        (window || unsafeWindow).document.body.appendChild(bgimg);
        bgimg.src = uri;
    };
    Settings.PrefTypes.add("imagefile", {
        make: function(data) {
            var defaultValue = data["default"] || "";
            var storedValue = Settings.get(data.name);
            var currentValue = storedValue || defaultValue;
            var hasValidValue = "string" === typeof currentValue && "" != currentValue ? true : false;
            var fileSelector = new jMod.FileSelector({
                multiple: false,
                accept: "image/*",
                button: {
                    style: data.style,
                    className: "btn btn-success",
                    innerHTML: [ '<i class="fa ' + (data.buttonIcon || "fa-file-image-o") + '" style="margin-right:10px;"></i>', data.buttonText || "Select an Image" ],
                    attributes: {
                        type: "button"
                    }
                },
                form: {
                    className: "imagefile-form pref",
                    attributes: {
                        name: data.name,
                        "data-jmod-settings-pref": data.name,
                        "data-jmod-settings-pref-default": data["default"] || null
                    }
                },
                onChange: function(e, files, value) {
                    jMod.FileSelector.ReadFileAsURL(files[0], function(e, content, file) {
                        var imgContainerEl = fileSelector.formElement.parentElement.lastChild;
                        setBackgroundURI(imgContainerEl, content, "");
                        Settings.PrefTypes.onChange(fileSelector.formElement.getAttribute("name"), content);
                    }, function(e, content, file) {
                        var imgContainerEl = fileSelector.formElement.parentElement.lastChild;
                        setBackgroundURI(imgContainerEl, "", "No Preview");
                        Settings.PrefTypes.onChange(fileSelector.formElement.getAttribute("name"), "");
                    });
                }
            });
            var opts = {
                type: "div",
                className: "pref-container",
                innerHTML: [ fileSelector.formElement, createNewElement({
                    type: "div",
                    className: "image-preview-container",
                    style: {},
                    attributes: {},
                    innerHTML: hasValidValue ? "" : "No Preview"
                }) ]
            };
            if (Loading.DOMLoaded) setBackgroundURI(opts.innerHTML[1], hasValidValue ? currentValue : "", hasValidValue ? "" : "No Preview"); else setTimeout(setBackgroundURI, 150, opts.innerHTML[1], hasValidValue ? currentValue : "", hasValidValue ? "" : "No Preview");
            if (_undefined != typeof data["tooltip"] && (_undefined != typeof data.tooltip["innerHTML"] || _undefined != typeof data.tooltip["text"])) opts.innerHTML[0] = setTooltipProperties(opts.innerHTML[0], data.tooltip);
            return opts;
        },
        getValue: function(prefEl, data) {
            try {
                var imgContainerEl = prefEl.parentElement.lastChild;
                return imgContainerEl.getAttribute("data-src");
            } catch (e) {
                return "";
            }
        },
        setValue: function(prefEl, data, value) {
            var imgContainerEl = prefEl.parentElement.lastChild;
            setBackgroundURI(imgContainerEl, value, value && "" != value ? "" : "No Preview");
            return true;
        },
        enable: function(prefEl, data) {
            if (prefEl.hasAttribute("disabled")) prefEl.removeAttribute("disabled");
        },
        disable: function(prefEl, data) {
            prefEl.setAttribute("disabled", "disabled");
        }
    });
    function setTooltipProperties(obj, data) {
        if (!isElement(obj)) {
            obj.className = (obj.className || "") + " " + jConfig(Tooltip_TooltipTargetClass_Key);
            if (typeof obj.attributes === _undefined) obj.attributes = {};
            obj.attributes[jConfig(Tooltip_TooltipAttribute_Key)] = data.innerHTML || data.text || null;
            obj.attributes[jConfig(Tooltip_PlacementAttribute_Key)] = data.placement || "top";
            if (_undefined != typeof data["margin"]) {
                var marginAttributeName = jConfig("Tooltip.attributeNames.margin");
                if (_undefined != typeof data.margin["left"]) obj.attributes[marginAttributeName + "-left"] = data.margin.left;
                if (_undefined != typeof data.margin["right"]) obj.attributes[marginAttributeName + "-right"] = data.margin.right;
                if (_undefined != typeof data.margin["top"]) obj.attributes[marginAttributeName + "-top"] = data.margin.top;
                if (_undefined != typeof data.margin["bottom"]) obj.attributes[marginAttributeName + "-bottom"] = data.margin.bottom;
            }
        } else {
            addClass(obj, jConfig(Tooltip_TooltipTargetClass_Key));
            obj.setAttribute(jConfig(Tooltip_TooltipAttribute_Key), data.innerHTML || data.text || null);
            obj.setAttribute(jConfig(Tooltip_PlacementAttribute_Key), data.placement || "top");
            if (_undefined != typeof data["margin"]) {
                var marginAttributeName = jConfig("Tooltip.attributeNames.margin");
                if (_undefined != typeof data.margin["left"]) obj.setAttribute(marginAttributeName + "-left", data.margin.left);
                if (_undefined != typeof data.margin["right"]) obj.setAttribute(marginAttributeName + "-right", data.margin.right);
                if (_undefined != typeof data.margin["top"]) obj.setAttribute(marginAttributeName + "-top", data.margin.top);
                if (_undefined != typeof data.margin["bottom"]) obj.setAttribute(marginAttributeName + "-bottom", data.margin.bottom);
            }
        }
        return obj;
    }
    function makeLabel(data) {
        var text = data.description || data.name;
        if (!isElement(text) && "object" !== typeof text) text = {
            type: "span",
            className: "noselect",
            innerHTML: text,
            attributes: {}
        };
        var opts = {
            type: "label",
            className: "col-md-4 control-label noselect",
            innerHTML: text,
            attributes: {}
        };
        return opts;
    }
    Settings.MakePref = function(data) {
        var opts;
        if (isElement(data) || "element" == data.type) {
            opts = {
                type: "div",
                className: "row form-group section-row",
                innerHTML: {
                    type: "div",
                    className: "col-md-12",
                    innerHTML: isElement(data) ? data : data.innerHTML || data.options || data["default"]
                }
            };
            return createNewElement(opts);
        } else {
            var pref = Settings.PrefTypes.make(data.type, data);
            if (pref) {
                var label = makeLabel(data);
                switch (data.type) {
                  case "radio":
                  case "checkbox":
                  case "toggle":
                    if (_undefined != typeof data["tooltip"] && (_undefined != typeof data.tooltip["innerHTML"] || _undefined != typeof data.tooltip["text"])) opts = setTooltipProperties(label.innerHTML, data.tooltip);
                }
                opts = {
                    type: "div",
                    className: "row form-group section-row",
                    innerHTML: [ label, {
                        type: "div",
                        className: "col-md-8",
                        innerHTML: pref
                    } ]
                };
                return createNewElement(opts);
            }
        }
        return undefined;
    };
    Settings.MakeSettingsModal = function(data) {
        var tabs = {};
        var tabName, tTabOptions, tTabContentOptions, isActive = false;
        var settingsBody = createNewElement({
            type: "div",
            className: "jMod-settings tabbable tabs-left"
        });
        var settingsNavTabs = createNewElement({
            type: "ul",
            className: "nav nav-tabs"
        });
        var settingsTabContent = createNewElement({
            type: "div",
            className: "tab-content"
        });
        for (var i in data.settings) {
            var tabName = data.settings[i].tab || "Other";
            var sectionName = data.settings[i].section || "General";
            if (typeof tabs[tabName] === _undefined) tabs[tabName] = {
                name: tabName,
                color: null,
                sections: {}
            };
            if (typeof tabs[tabName].sections[sectionName] === _undefined) tabs[tabName].sections[sectionName] = [];
            tabs[tabName].sections[sectionName].push(data.settings[i]);
        }
        if (data.tabs) for (var i in data.tabs) {
            tabName = data.tabs[i].name;
            if (tabName && typeof tabs[tabName] !== _undefined) {
                if (data.tabs[i].displayName) tabs[tabName].displayName = data.tabs[i].displayName;
                if (data.tabs[i].content) {
                    if (data.tabs[i].content.header) tabs[tabName].contentHeader = data.tabs[i].content.header;
                    if (data.tabs[i].content.footer) tabs[tabName].contentFooter = data.tabs[i].content.footer;
                }
            }
        }
        var tabOrder = data.tabOrder || [];
        var tabElements = {};
        var tabCount = 0;
        for (tabName in tabs) {
            isActive = data.activeTab !== undefined && tabName === data.activeTab || data.activeTab === undefined && 0 == tabCount ? true : false;
            tTabOptions = Tabs.makeNavElement({
                innerHTML: tabs[tabName].displayName || tabName,
                id: "jMod-settings-tab-" + tabCount,
                isActive: isActive,
                contentId: "jMod-settings-tab-" + tabCount + "-content",
                index: tabCount
            });
            var tabContentEl = [];
            if (tabs[tabName].contentHeader) tabContentEl.push(tabs[tabName].contentHeader);
            for (var sectionName in tabs[tabName].sections) {
                tabContentEl.push('<div class="row section-title-row"><div class="col-md-12"><h3 class="section-title">' + sectionName + "</h3></div></div>");
                for (var prefName in tabs[tabName].sections[sectionName]) tabContentEl.push(Settings.MakePref(tabs[tabName].sections[sectionName][prefName]));
            }
            if (tabs[tabName].contentFooter) tabContentEl.push(tabs[tabName].contentFooter);
            tTabContentOptions = Tabs.makeContentElement({
                name: tabName,
                id: "jMod-settings-tab-" + tabCount + "-content",
                isActive: isActive,
                innerHTML: tabContentEl,
                index: tabCount
            });
            tabElements[tabName] = [ tTabOptions, tTabContentOptions ];
            if (tabOrder.indexOf(tabName) == -1) tabOrder.push(tabName);
            tabCount++;
        }
        if (data.tabs) for (var i in data.tabs) {
            tabName = data.tabs[i].name;
            if (tabName && tabs[tabName] === undefined) {
                isActive = data.activeTab !== undefined && tabName === data.activeTab || data.activeTab === undefined && 0 == tabCount ? true : false;
                tTabOptions = Tabs.makeNavElement({
                    innerHTML: tabName,
                    id: "jMod-settings-tab-" + tabCount,
                    isActive: isActive,
                    contentId: "jMod-settings-tab-" + tabCount + "-content",
                    index: tabCount
                });
                tTabContentOptions = Tabs.makeContentElement({
                    name: tabName,
                    id: "jMod-settings-tab-" + tabCount + "-content",
                    isActive: isActive,
                    innerHTML: data.tabs[i].innerHTML || data.tabs[i].text,
                    index: tabCount
                });
                tabElements[tabName] = [ tTabOptions, tTabContentOptions ];
                if (tabOrder.indexOf(tabName) == -1) tabOrder.push(tabName);
                tabCount++;
            }
        }
        for (var i = 0; i < tabOrder.length; i++) if (tabElements[tabOrder[i]] !== undefined) {
            appendChild(settingsNavTabs, tabElements[tabOrder[i]][0]);
            appendChild(settingsTabContent, tabElements[tabOrder[i]][1]);
        }
        appendChild(settingsBody, settingsNavTabs);
        appendChild(settingsBody, settingsTabContent);
        var title = data.title || "Settings";
        if (!isElement(title)) title = '<h2 class="title">' + title + "</h2>";
        var opts = {
            title: title,
            id: Settings.getElementId("settingModalsElement"),
            className: jConfig(Settings_ModalElementClass_Key),
            body: settingsBody,
            footer: [ {
                type: "span",
                className: "powered-by",
                innerHTML: {
                    type: "a",
                    innerHTML: [ {
                        type: "img",
                        src: "http://myuserjs.org/img/favicon/favicon.png",
                        attributes: {
                            height: "16px"
                        }
                    }, "Powered by jMod" ],
                    attributes: {
                        href: "http://doc.myuserjs.org"
                    }
                }
            }, {
                type: "a",
                innerHTML: "Clear Settings",
                className: "btn-clear-settings",
                attributes: {
                    href: "#"
                },
                EventListeners: {
                    click: {
                        capture: false,
                        callback: function(e) {
                            var r = confirm("Are you sure?");
                            if (r) Settings.clear();
                            eventCancel(e);
                            return false;
                        }
                    }
                }
            } ],
            buttons: [ {
                text: "Save",
                className: "btn btn-success",
                EventListeners: {
                    click: function() {
                        console.log("save button click");
                        Settings.save();
                    }
                }
            } ],
            onAfterShow: function() {
                Settings.onResize();
            },
            style: {
                width: "1000px"
            },
            features: {
                enableTabs: true,
                enableTooltips: true
            }
        };
        if (typeof data.onBeforeHide !== _undefined) opts.onBeforeHide = data.onBeforeHide;
        if (typeof data.onAfterHide !== _undefined) opts.onAfterHide = data.onAfterHide;
        return jMod.Modal(opts);
    };
    Settings.onResize = function() {
        var modal = jMod.Settings.settingsModalElement;
        var settingsDialog = jMod.$(".modal-dialog", modal);
        var settingsBody = jMod.$(".modal-body", modal);
        var settingsFooter = jMod.$(".modal-footer", modal);
        var settingsHeader = jMod.$(".modal-header", modal);
        var viewportHeight = jMod.Element.viewportSize.getHeight();
        var computedDialog = (window || unsafeWindow).getComputedStyle(settingsDialog, null);
        var marginTop = parseInt(computedDialog.getPropertyValue("margin-top"));
        var marginBottom = parseInt(computedDialog.getPropertyValue("margin-bottom"));
        var maxHeight = parseInt(viewportHeight) - parseInt(settingsHeader.offsetHeight) - parseInt(settingsFooter.offsetHeight) - marginTop - marginBottom - 15;
        settingsBody.style.maxHeight = maxHeight + "px";
        var settingsTabs = jMod.$(".nav-tabs", settingsBody);
        jMod.Tabs.resize(settingsTabs);
    };
    Settings.show = function() {
        jMod.Modal.show(Settings.settingsModalElement || 0);
        setTimeout(function() {
            Settings.onResize();
        }, 1);
    };
    Settings.hide = function() {
        jMod.Modal.hide(Settings.settingsModalElement);
    };
    Settings.save = function() {
        console.log("Saving");
        var data = Settings._data;
        var r = {};
        for (var i = 0; i < data.settings.length; i++) {
            var prefData = data.settings[i];
            if (!isElement(data) && "element" != prefData.type) {
                var value = Settings.PrefTypes.getValue(prefData);
                r[prefData.name] = value;
            }
        }
        Settings._storedData = r;
    };
    Settings.init = function() {
        Settings.Initialized = true;
    };
    jMod.CSS = ".jmod-na .modal-body{min-height:200px;max-height:500px;overflow-y:auto;}";
    jMod.getDOMTiming = function() {
        var _timingData, timingData = {};
        try {
            if (performance.available) {
                var ignore = [ "unloadEventStart", "unloadEventEnd", "navigationStart" ];
                _timingData = performance.getAllTiming();
                var navStart = performance.get("timing.navigationStart");
                for (var key in _timingData) {
                    timingData[key] = _timingData[key] - navStart;
                    if (timingData[key] <= 0 || isNaN(timingData[key])) delete timingData[key];
                }
                var pageLoadTime = (performance.get("timing.loadEventEnd") || performance.get("timing.loadEventStart")) - performance.get("timing.navigationStart");
                if (pageLoadTime > 0) timingData["pageLoadTime"] = pageLoadTime;
                var NetworkLatency = performance.get("timing.responseEnd") - performance.get("timing.fetchStart");
                if (NetworkLatency >= 0) timingData["NetworkLatency"] = NetworkLatency;
                var statReportTime = performance.now;
                if (statReportTime > 0) timingData["statReportTime"] = statReportTime;
                if (jMod.InitializeEndTime > 0) timingData["jModInitializeEnd"] = jMod.InitializeEndTime;
                if (jMod.InitializeStartTime >= 0) {
                    timingData["jModInitializeStart"] = jMod.InitializeStartTime;
                    if (jMod.InitializeEndTime > 0 && jMod.InitializeEndTime - jMod.InitializeStartTime > 0) timingData["jModInitializeTime"] = jMod.InitializeEndTime - jMod.InitializeStartTime;
                    if (jModReady > 0 && jModReady - jMod.InitializeStartTime > 0) timingData["jModReadyTime"] = jModReady - jMod.InitializeStartTime;
                }
            }
        } catch (e) {
            jModLogError(e, "jMod.getDOMTiming");
            return {};
        }
        return timingData;
    };
    var SendMessage = jMod.SendMessage = function(data) {
        if (!jMod.jQueryAvailable && "jquery" == data.method.toLowerCase()) if (typeof GM_xmlhttpRequest !== _undefined) data.method = "XMLHTTPRequest"; else data.method = "JSONP"; else if (typeof GM_xmlhttpRequest === _undefined && "xmlhttprequest" == data.method.toLowerCase()) if (jMod.jQueryAvailable) data.method = "jQuery"; else data.method = "JSONP";
        data.url = jMod.SendMessage.processURL(data);
        switch ((data.method || "XMLHTTPRequest").toLowerCase()) {
          case "jquery":
            if (jMod.debug) console.log("jMod.SendMessage - jquery", data);
            return jMod.SendMessage.jQuery(data);
            break;

          case "xmlhttprequest":
            if (jMod.debug) console.log("jMod.SendMessage - xmlhttprequest", data);
            return jMod.SendMessage.XMLHTTPRequest(data);
            break;

          case "jsonp":
          default:
            if (jMod.debug) console.log("jMod.SendMessage - JSONP", data);
            jMod.SendMessage.JSONP(data);
        }
    };
    var SendMessageResponseFunctionName = "jModSendMessageResponseFn";
    SendMessage.processURL = function(data) {
        var callback_str = "string" === typeof data.callback ? data.callback : SendMessageResponseFunctionName;
        if ("object" !== typeof data.url && data.url.indexOf("?") == -1) data.url += "?";
        switch (data.method.toLowerCase()) {
          case "jsonp":
            if (data.url instanceof URLBuilder) {
                data.url.addArg("callback", callback_str);
                data.url.addArg("jsonp", callback_str);
            } else data.url += "&callback=" + callback_str + "&jsonp=" + callback_str;
            break;

          case "xmlhttprequest":
            if (data.url instanceof URLBuilder) data.url.addArg("json", "1"); else data.url += "&json=1";
            break;

          case "jquery":
            if (data.responseType && "json" == data.responseType) if (data.url instanceof URLBuilder) data.url.addArg("json", "1"); else data.url += "&json=1";
        }
        return data.url;
    };
    SendMessage.jQuery = function(data) {
        var callback_str = "string" === typeof data.callback ? data.callback : SendMessageResponseFunctionName;
        var callbackIndex = SendMessage.addCallbacks(data);
        try {
            $.getJSON(data.url.toString(), {
                async: true,
                format: "json"
            }).done(function(result, textStatus, jqXHR) {
                SendMessage.execCallback(callbackIndex, null, result, textStatus, jqXHR);
            }).fail(function(jqxhr, textStatus, error) {
                SendMessage.execErrorCallback(callbackIndex, null, jqxhr, textStatus, error);
            });
        } catch (e) {
            return false;
        }
        return true;
    };
    SendMessage.XMLHTTPRequest = function(data) {
        try {
            if (typeof GM_xmlhttpRequest !== _undefined) {
                var callbackIndex = SendMessage.addCallbacks(data);
                GM_xmlhttpRequest({
                    method: "GET",
                    url: data.url.toString(),
                    headers: {
                        Accept: "application/javascript"
                    },
                    onload: function(callbackIndex, responseType) {
                        return function(response) {
                            if ("json" == responseType.toLowerCase()) {
                                var responseJSON;
                                try {
                                    responseJSON = JSON.parse(response.responseText);
                                } catch (e) {} finally {
                                    return SendMessage.execCallback(callbackIndex, null, responseJSON, response);
                                }
                            } else return SendMessage.execCallback(callbackIndex, null, response.responseText, response);
                        };
                    }(callbackIndex, data.responseType || "json"),
                    onerror: function(callbackIndex) {
                        return function(response) {
                            console.log("Error! XMLHttpRequest", response);
                            return SendMessage.execErrorCallback(callbackIndex, null, response.responseText, response);
                        };
                    }(callbackIndex)
                });
                return true;
            }
        } catch (e) {
            console.log("Error! getXMLHttpRequest", e);
        } finally {
            return false;
        }
    };
    SendMessage.JSONP = function(data) {
        var callbackIndex = SendMessage.addCallbacks(data);
        var newScriptEl = createNewElement({
            type: "script",
            async: true,
            defer: true,
            attributes: {
                "data-callback-index": callbackIndex
            }
        });
        try {
            var head = document.head || document.getElementsByTagName("head")[0];
            head.appendChild(newScriptEl);
            newScriptEl.src = data.url.toString();
        } catch (e) {
            return SendMessage.execErrorCallback(callbackIndex, null, e);
            return false;
        }
        return true;
    };
    SendMessage._callbacks = [];
    SendMessage.addCallbacks = function(data) {
        return SendMessage._callbacks.push({
            complete: data.callback,
            error: data.onerror
        }) - 1;
    };
    SendMessage.execCallback = function(index, thisVal) {
        try {
            var cb = SendMessage._callbacks[index].complete;
            if (typeof cb === _undefined) return false; else if ("function" === typeof cb) return cb.apply(thisVal || null, Slice.call(arguments, 2)); else if ("string" === typeof cb) if ("function" === typeof unsafeWindow[cb]) return unsafeWindow[cb].apply(thisVal || null, Slice.call(arguments, 2));
        } catch (e) {
            console.log("Error SendMessage.execCallback!", e);
            return false;
        }
    };
    SendMessage.execErrorCallback = function(index, thisVal) {
        try {
            var cb = SendMessage._callbacks[index].onerror;
            if (typeof cb === _undefined) return false; else if ("function" === typeof cb) return cb.apply(thisVal || null, Slice.call(arguments, 2)); else if ("string" === typeof cb) if ("function" === typeof unsafeWindow[cb]) return unsafeWindow[cb].apply(thisVal || null, Slice.call(arguments, 2));
        } catch (e) {
            console.log("Error SendMessage.execErrorCallback!", e);
            return false;
        }
    };
    function SendMessage_responseCallback(response) {
        SendMessage.execCallback(document.currentScript.getAttribute("data-callback-index"), document.currentScript, response, document.currentScript);
    }
    SendMessage._globalResponseCallback = mExportFunction(SendMessage_responseCallback, unsafeWindow, {
        defineAs: SendMessageResponseFunctionName,
        allowCallbacks: true,
        allowCrossOriginArguments: true
    });
    jMod["Update"] = new function() {
        var combineOptions = function() {
            var args = [ true ].concat(Slice.call(arguments), {
                script_info: jConfig("script.script_info"),
                script_file_info: jConfig("script.script_file_info") || undefined
            });
            return jMod.extend.apply(jMod, args);
        };
        this.getURL = function(data) {
            opts = combineOptions({}, jMod.Config.Update, data);
            var builder = new URLBuilder(jConfig("host") || "http://myuserjs.org");
            var un = (opts.username || jConfig("script.username")).trim();
            if (typeof un === _undefined || "" == un) throw "No Username Provided";
            var sn = (opts.script_name || jConfig("script.script_name")).trim();
            if (typeof sn === _undefined || "" == sn) throw "No Script Name Provided";
            var gt = opts.getType || jConfig("Update.getType");
            if ("meta" != gt && "metajs" != gt && "data" != gt && "none" != gt) gt = "data";
            var args = opts.args;
            if (opts.DOMTiming) {
                var domTiming = jMod.getDOMTiming();
                for (var key in domTiming) if (domTiming.hasOwnProperty(key)) args[key] = domTiming[key];
            }
            var args_arr = [];
            for (var key in args) args_arr.push(key + "=" + args[key]);
            builder.addArg("args", escape(args_arr.join(",")));
            builder.addArg("api_version", jMod.version);
            builder.addArg("updateVeriableName", opts.updateVeriableName);
            if (typeof opts.noDownload !== _undefined && true == opts.noDownload) builder.addArg("nodownload", "1"); else if (jConfig("Update.sampleRate") < 100) if (Math.floor(100 * Math.random() + 1) > jConfig("Update.sampleRate")) builder.addArg("nodownload", "1");
            if (jConfig("Update.getStats")) builder.addArg("getstats", "1");
            if (typeof opts.script_info !== _undefined) {
                if (typeof opts.script_info.version !== _undefined) builder.addArg("scriptversion", escape(opts.script_info.version));
                if (typeof opts.script_info.script_handler !== _undefined) {
                    builder.addArg("scripthandler", escape(opts.script_info.script_handler));
                    if (typeof opts.script_info.script_handler_version !== _undefined) builder.addArg("scripthandlerversion", escape(opts.script_info.script_handler_version));
                }
            }
            builder.addArg("cachebuster", Math.round(new Date().getTime() / 1e3));
            var host = jConfig("host") || "myuserjs.org";
            builder.setPath("/script/" + un + "/" + sn + "." + gt + ".js");
            return builder;
        };
        this.sendRequest = function(data) {
            try {
                var mData = combineOptions({}, jMod.Config.Update, data);
                if (typeof unsafeWindow[mData.updateVeriableName] !== _undefined) {
                    unsafeWindow[mData.updateVeriableName] = undefined;
                    delete unsafeWindow[mData.updateVeriableName];
                }
                var url = jMod.Update.getURL(mData);
                if (jConfig("debug")) jMod.Log("URL: ", url.toString());
                var method = "JSONP";
                if (mData.jQuery) method = "jQuery"; else if (mData.XMLHttpRequest) method = "XMLHTTPRequest";
                return jMod.SendMessage({
                    url: url.toString(),
                    method: method,
                    responseType: "json",
                    callback: function(_callback, _updateVeriableName) {
                        return function(response) {
                            unsafeWindow[_updateVeriableName] = response;
                            return _callback.apply(this, arguments);
                        };
                    }(mData.callback, mData.updateVeriableName),
                    onerror: mData.onerror
                });
            } catch (e) {
                console.log("Error! getUpdateData: ", e.name, e.fileName, e.lineNumber + ":" + e.columnNumber);
                console.error(e);
                if (mData.callback) mData.onerror(e);
                return undefined;
            }
        };
        this.getUpdateData = function(data) {
            return this.sendRequest(data);
        };
    }();
    Object.defineProperty(jMod.Update, "MetaData", {
        get: function(varName) {
            if (typeof unsafeWindow[varName || jConfig("Update.updateVeriableName")] !== _undefined) return unsafeWindow[varName || jConfig("Update.updateVeriableName")]; else if (typeof window[varName || jConfig("Update.updateVeriableName")] !== _undefined) return window[varName || jConfig("Update.updateVeriableName")];
            return undefined;
        }
    });
    +function() {
        function UserError() {
            var err, data = {}, arg0 = _undefined != typeof arguments[0] ? arguments[0] : undefined, length = arguments.length;
            if (length > 0) {
                if ("string" === typeof arg0) {
                    data.message = arg0;
                    if (length > 1) data.fileName = arguments[1];
                    if (length > 2) data.lineNumber = arguments[2];
                    if (length > 3) data.columnNumber = arguments[3];
                    if (length > 4) if (arguments[4] instanceof Error) data.e = arguments[4];
                } else if (arg0 instanceof Error) data.e = arg0; else data = arg0;
                if (data.e) try {
                    err = data.e;
                    this.stack = err.stack;
                } catch (e) {}
            }
            if (!err) {
                err = new Error();
                if (err.stack) if ("undefined" != typeof Components) this.stack = err.stack.substring(err.stack.indexOf("\n") + 1); else if ("undefined" != typeof chrome || "undefined" != typeof process) this.stack = err.stack.replace(/\n[^\n]*/, ""); else this.stack = err.stack;
            }
            this.message = _undefined !== typeof data.message ? data.message : err.message;
            this.fileName = _undefined !== typeof data.fileName ? data.fileName : err.fileName;
            this.lineNumber = _undefined !== typeof data.lineNumber ? data.lineNumber : err.lineNumber;
            this.columnNumber = _undefined !== typeof data.columnNumber ? data.columnNumber : err.columnNumber;
            this.toString = function() {
                return this.name + ": " + this.message;
            };
        }
        UserError.prototype = Object.create(Error.prototype);
        UserError.prototype.constructor = UserError;
        jMod.UserError = UserError;
    }();
    jMod["ERROR"] = new function() {
        this.ERROR_CODES = {
            ERROR_RESULT: {
                FATAL: 1048576
            },
            ERROR_NAME: {
                EVALERROR: 65536,
                INTERNALERROR: 131072,
                RANGEERROR: 196608,
                REFERENCEERROR: 262144,
                SYNTAXERROR: 327680,
                TYPEERROR: 393216,
                URIERROR: 458752
            }
        };
        Object.defineProperties(this.ERROR_CODES, props);
        Object.defineProperty(this.ERROR_CODES, "get", {
            value: function(key, value) {
                if ("undefined" === typeof value) return jMod.ERROR.ERROR_CODES.SearchForKey(key); else return jMod.ERROR.ERROR_CODES.setKeyValue(key, value);
            },
            enumerable: false
        });
        this.getCode = function(key) {
            var val = this.ERROR_CODES.get(key);
            if ("undefined" !== typeof val) return Number(val.toString(2));
            return undefined;
        };
        var defaultFilter = function(message, url, linenumber, colNumber, eObj, stackInfo) {
            try {
                if (jConfig("script.script_info.userscript_full_file_name") == stackInfo[0].fileName) {
                    console.log("Error is from userscript!");
                    switch (eObj.name) {
                      case "EvalError":
                      case "InternalError":
                      case "RangeError":
                      case "ReferenceError":
                      case "SyntaxError":
                      case "TypeError":
                      case "URIError":                    }
                    return true;
                }
            } catch (e) {} finally {
                return false;
            }
        };
        this.send = function(data) {
            try {
                var mData = jMod.extend(true, {}, jMod.Config.Update, data);
                if ("undefined" === typeof mData.args) mData.args = {};
                if ("undefined" === typeof mData.args["scriptError"]) mData.args["scriptError"] = "1";
                if ("undefined" === typeof mData.args["scriptErrorCode"]) mData.args["scriptErrorCode"] = "-1";
                mData.getType = "none";
                mData.noDownload = true;
                return jMod["UPDATE"]["sendRequest"](mData);
            } catch (e) {
                console.log("Error! Error.send: ", e);
                return undefined;
            }
        };
        this.catchError = function(message, url, linenumber, colNumber, eObj, stackInfo) {
            try {
                console.log("stackInfo", stackInfo);
                if ("undefined" !== typeof eObj && "undefined" !== typeof eObj.stack) {
                    var args = Slice.call(arguments, 0);
                    if (jConfig("Error.autoReportErrors")) {
                        var filter = jConfig("Error.errorFilter").apply(this, args);
                        if (filter) {
                            var opts = {
                                getType: "none",
                                args: {}
                            };
                            opts.args.scriptErrorLineNumber = linenumber;
                            opts.args.scriptErrorColNumber = colNumber;
                            switch (typeof filter) {
                              case "object":
                                opts.args = merge(opts.args, filter);
                                break;

                              case "number":
                              case "string":
                                opts.args.scriptError = filter;
                                break;

                              case "boolean":
                                opts.args.scriptError = "1";
                            }
                        }
                    }
                }
            } catch (e) {}
            return false;
        };
        this.processError = function(e) {
            var tStack = "";
            try {
                tStack = e.stack.toString();
            } catch (e) {}
            var data = {
                message: e.message,
                name: e.name,
                fileName: e.fileName,
                lineNumber: e.lineNumber,
                columnNumber: e.columnNumber,
                stack: tStack
            };
            return jMod["ERROR"]["catchError"](e.message, e.fileName, e.lineNumber, e.columnNumber, data, jMod.parseStack(tStack));
        };
    }();
    function _jModListenError(message, url, linenumber, colNumber, data) {
        console.log("jModListenError", message, url, linenumber, colNumber);
        var tData = jMod.parseStack(data.stack);
        if (tData.length > 0) return jMod["ERROR"]["catchError"](message, url, linenumber, colNumber, data, tData);
    }
    mExportFunction(_jModListenError, unsafeWindow, {
        defineAs: "jModListenError",
        allowCallbacks: true,
        allowCrossOriginArguments: true
    });
    var onErrorFunction = function() {
        var win = "undefined" !== typeof this.document ? this.document.defaultView : "undefined" !== typeof document ? document.defaultView : null != this.top ? this : null;
        var console = null != win.console ? win.console : this.console;
        if (win._jModErrorHandlerStack) return;
        win._origErrorHandler = win.onerror;
        win._jModErrorHandlerStack = [];
        function jModGlobalErrorHandler(message, url, linenumber, colNumber, eObj) {
            var win = "undefined" !== typeof document ? document.defaultView : null != this.top ? this : null;
            var console = null != this.console ? this.console : win.console;
            console.log("tErrHandle", message, url, linenumber, eObj);
            try {
                var data = {}, tStack = "";
                if (eObj) {
                    try {
                        tStack = String(eObj.stack);
                    } catch (e) {
                        console.log("Error eObj.stack.toString", e);
                    }
                    data = {
                        message: eObj.message,
                        name: eObj.name,
                        fileName: eObj.fileName,
                        lineNumber: eObj.lineNumber,
                        columnNumber: eObj.columnNumber,
                        stack: tStack,
                        url: url
                    };
                } else data = {
                    message: message,
                    name: null,
                    fileName: null,
                    lineNumber: linenumber,
                    columnNumber: colNumber,
                    stack: tStack,
                    url: url
                };
                var fn;
                if ("undefined" !== typeof jModListenError) fn = jModListenError; else if (win.jModListenError) fn = win.jModListenError; else fn = document.defaultView.jModListenError;
                fn(message, url, linenumber, colNumber, data);
            } catch (e) {
                console.log("error calling jModListenError", e, win);
            }
            for (var i = win._jModErrorHandlerStack.length - 1; i >= 0; i--) try {
                if (true === win._jModErrorHandlerStack[i].apply(this, arguments)) return true;
            } catch (e) {
                console.log("Error processing error handler", win._jModErrorHandlerStack[i]);
            }
            try {
                if (win._origErrorHandler) return win._origErrorHandler.apply(this, arguments);
            } catch (e) {}
            return false;
        }
        win.onerror = jModGlobalErrorHandler;
        try {
            win.__defineSetter__("onerror", function(fn) {
                win._jModErrorHandlerStack.push(fn);
            });
        } catch (e) {}
    };
    if (_undefined == typeof jMod.Config.script.script_info && _undefined != typeof GM_info) ScriptInfo.set();
    +function() {
        const maxCallCount = 200;
        var pageLoadTime, totalCallCount = 0, doc = jMod.Element.document, InitHandlers = {
            addCSS: function() {
                if (!Loading.CSSAdded) {
                    Loading.CSSAdded = true;
                    jMod.AddCSS();
                }
            },
            headAvailable: function() {
                Loading.headAvailable = true;
                InitHandlers.addCSS();
                if (jMod.debug) jMod.API.contentEval(onErrorFunction);
            },
            DOMLoaded: function() {
                Loading.DOMLoaded = true;
                if (jMod.debug) jModLogTime("DOM Loaded", null, " - Begin Init");
                if (!Loading.headAvailable) InitHandlers.headAvailable();
                jMod.Events.fire("onDOMReady");
                jMod.Notification.init();
                jMod.Modal.init();
                jMod.Settings.init();
                Loading.jModReady = true;
                if (jMod.debug) jModLogTime("jModReady" + (_undefined != typeof window.mozPaintCount ? " (Mozilla Paint Count: " + window.mozPaintCount + ")" : ""));
                jMod.Events.fire("onReady");
                if (performance.available) jModReady = performance.now;
            },
            documentComplete: function() {
                Loading.documentComplete = true;
                if (jMod.debug) {
                    jModLogTime("onPageReady" + (_undefined != typeof window.mozPaintCount ? " (Mozilla Paint Count: " + window.mozPaintCount + ")" : ""));
                    console.groupEnd("jMod Start");
                }
                jMod.Events.fire("onPageReady");
            },
            performanceReady: function() {
                Loading.performanceReady = true;
                if (jMod.debug) jModLogTime("onPerformanceReady");
                jMod.Events.fire("onPerformanceReady");
            }
        };
        function tryInit(e) {
            if (!Loading.headAvailable) if (jMod.Element.head) InitHandlers.headAvailable();
            if (!Loading.DOMLoaded) if ([ "interactive", "complete" ].indexOf(doc.readyState.toLowerCase()) != -1) InitHandlers.DOMLoaded();
            if (Loading.DOMLoaded) {
                if (!Loading.documentComplete && "complete" == doc.readyState) InitHandlers.documentComplete();
                if (!Loading.performanceReady) {
                    pageLoadTime = performance.pageLoadTime();
                    if (!isNaN(pageLoadTime) && pageLoadTime > 0 || !performance.available) InitHandlers.performanceReady();
                }
                if (Loading.performanceReady && Loading.documentComplete) {
                    Loading.Complete = true;
                    clearInterval(checkTimer);
                    if (jMod.debug) jModLogTime("jMod Finish Init" + (_undefined != typeof window.mozPaintCount ? " (Mozilla Paint Count: " + window.mozPaintCount + ")" : ""));
                    return;
                }
            }
            if (totalCallCount++ > maxCallCount) {
                Loading.Complete = true;
                clearInterval(checkTimer);
                if (!Loading.DOMLoaded) InitHandlers.DOMLoaded();
                if (!Loading.documentComplete) InitHandlers.documentComplete();
                if (!Loading.performanceReady) InitHandlers.performanceReady();
                if (jMod.debug) jModLogTime("jMod Finish Init (timeout)" + (_undefined != typeof window.mozPaintCount ? " (Mozilla Paint Count: " + window.mozPaintCount + ")" : ""));
                return;
            }
            if (jMod.debug) jMod.log.count("Try Init");
        }
        function checkTimer() {
            if (!Loading.Complete) tryInit("checkTimer"); else clearInterval(checkTimer);
        }
        function onDOMContentLoaded(e) {
            if (!Loading.Complete) tryInit("DOMContentLoaded");
            doc.removeEventListener("DOMContentLoaded", onDOMContentLoaded, false);
            jMod.Events.fire.apply(jMod.Events, [ "DOMContentLoaded", {
                _this: this,
                args: arguments
            } ]);
            if (jMod.debug) jMod.Debug("DOMContentLoaded", e);
        }
        doc.addEventListener("DOMContentLoaded", onDOMContentLoaded, false);
        doc.onreadystatechange = function(e) {
            if (!Loading.Complete) tryInit("onreadystatechange");
            jMod.Events.fire.apply(jMod.Events, [ "onreadystatechange", {
                _this: this,
                args: arguments
            } ]);
            if (jMod.debug) jMod.Debug("onreadystatechange %c%s%c %o", jMod.log.fmt.stchange, doc.readyState, " ", e);
        };
        function onLoadEvent(e) {
            window.removeEventListener("load", onLoadEvent, false);
            jMod.Events.fire.apply(jMod.Events, [ "load", {
                _this: this,
                args: arguments
            } ]);
            if (jMod.debug) jMod.Debug("onLoadEvent", e);
        }
        window.addEventListener("load", onLoadEvent, false);
        function BeforeScriptExec(e) {
            jMod.Events.fire.apply(jMod.Events, [ "beforescriptexecute", {
                _this: this,
                args: arguments
            } ]);
        }
        window.addEventListener("beforescriptexecute", BeforeScriptExec, false);
        function AfterScriptExec(e) {
            jMod.Events.fire.apply(jMod.Events, [ "afterscriptexecute", {
                _this: this,
                args: arguments
            } ]);
        }
        window.addEventListener("afterscriptexecute", AfterScriptExec, false);
        tryInit();
        setInterval(checkTimer, 25);
    }();
    if (performance.available) setTimeout(function() {
        jMod.InitializeEndTime = performance.now;
    }, 0);
    if (jMod.debug) jModLogTime("jMod Initialize Time Elapsed");
    console.log("unsafeWindow", unsafeWindow);
    console.log("window", window);
    console.log("global", this);
    try {
        var x = fofofo(a);
    } catch (e) {
        var foo = new jModError(e);
        foo.log("Error Title", "Error body");
    }
    return jMod;
});