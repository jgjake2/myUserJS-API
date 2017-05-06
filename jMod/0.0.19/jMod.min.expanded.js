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
+function($, e, t, a) {
    var n = a.call(this, t && void 0 !== t.performance ? t.performance.now() : 0, $, console, t, e, "undefined", void 0), r = n.Config.addToGlobalScope;
    if (this.jMod && (this._jMod = this.jMod, r && e && e.jMod && e !== this && (e._jMod = e.jMod)), 
    this.jMod = n, r) try {
        e !== this && (e.jMod = n);
    } catch (i) {
        try {
            t !== this && (t.jMod = n);
        } catch (o) {
            console.log("cannot add jMod to global scope", o);
        }
    }
    n.debug && n.log.groupEnd("jMod Initialize");
}.call(this, "undefined" != typeof jQuery ? jQuery : void 0, "undefined" != typeof unsafeWindow && unsafeWindow.top && "window" === Object.prototype.toString.call(unsafeWindow).replace(/^\[object |\]$/g, "").toLowerCase() ? unsafeWindow : "undefined" != typeof window && window.top && "window" === Object.prototype.toString.call(window).replace(/^\[object |\]$/g, "").toLowerCase() ? window : this, window, function(Wt, $, c, s, i, t, r) {
    function e() {
        return e._call.apply(e, arguments);
    }
    function vt(o, i, s) {
        var a = "function" == typeof s ? !0 : !1, e = i;
        "object" != typeof i && (e = d.call(arguments, 1), a = !1);
        for (var n = 0; n < e.length; n++) if (typeof o[e[n]] !== t && (!a || a && s(e[n], o[e[n]]))) return e[n];
        return r;
    }
    function dt(n, a, o) {
        var e = vt.apply(this, arguments);
        return typeof e !== t ? n[e] : r;
    }
    function ft(o) {
        var e = 0, n = this, a = o.split(".");
        for (e; e < a.length; e++) {
            if (typeof n[a[e]] === t) return r;
            n = n[a[e]];
        }
        return n;
    }
    function It(o) {
        var a, t = 0, e = this, n = o.split(".");
        if (0 == n.length) return r;
        for (t; t < n.length; t++) {
            if (-1 == (a = Object.keys(e).join("|").toLowerCase().split("|").indexOf(n[t].toLowerCase()))) return r;
            e = e[Object.keys(e)[a]];
        }
        return e;
    }
    function Qt(i, s) {
        var o, a, n = 0, e = i.split("."), t = this;
        if (0 == e.length) return r;
        for (n; n < e.length; n++) {
            if (-1 == (a = Object.keys(t).join("|").toLowerCase().split("|").indexOf(e[n].toLowerCase()))) return r;
            o = t, e[n] = Object.keys(t)[a], t = t[Object.keys(t)[a]];
        }
        return o[e[e.length - 1]] = s, e;
    }
    function Kt(t) {
        var n, e = 0, a = "string" == typeof t ? d.call(arguments) : t;
        for (e; e < a.length; e++) if ((n = ft.apply(this, [ a[e] ])) !== r) return n;
        return r;
    }
    function an(a, o, i) {
        var e = 0, n = a.split("."), r = this;
        for (e; e < n.length - 1; e++) {
            if (typeof r[n[e]] === t) {
                if (!i) return;
                r[n[e]] = {};
            }
            r = r[n[e]];
        }
        r[n[n.length - 1]] = o;
    }
    function R(e, n, o, p, u) {
        if (typeof cloneInto !== t) {
            u = u || 0;
            try {
                return cloneInto(e, n, o);
            } catch (g) {
                p && c.log("mCloneInto error", g);
            }
            var h, a, l, m = [], s;
            l = typeof e;
            try {
                "object" == l && (e.constructor === [].constructor ? l = "array" : null === e && (objTypr = "null"));
            } catch (g) {}
            if ("undefined" == l || "null" == l) return e;
            s = "array" == l ? cloneInto([], n, o) : cloneInto({}, n, o);
            var f = function(t) {
                var a = typeof e[t], r;
                if ("string" == a || "number" == a || "boolean" == a) r = e[t]; else if (e[t] instanceof Error) {
                    var l = "Error", s = n.Error && "function" == typeof n.Error ? n : i;
                    if (!s) return;
                    "Error" != e[t].name && "function" == typeof s[e[t].name] && (l = e[t].name), r = new s[l](e[t].message || null, e[t].fileName || null, e[t].lineNumber || null), 
                    r.name = e[t].name, r.stack = e[t].stack, r.message = e[t].message, r.fileName = e[t].fileName, 
                    r.lineNumber = e[t].lineNumber, r.columnNumber = e[t].columnNumber, delete r.toString, 
                    r.toString = function() {
                        return this.name + ": " + this.message;
                    }.bind(r);
                } else if ("object" == a) if (3 > u) try {
                    r = R(e[t], n, o, p, u + 1);
                } catch (c) {
                    try {
                        r = cloneInto(e[t], n, o);
                    } catch (f) {}
                } else try {
                    r = cloneInto(e[t], n, o);
                } catch (c) {} else if ("function" == a && o.cloneFunctions) try {
                    r = cloneInto(e[t], n, o);
                } catch (c) {}
                return r;
            };
            if ("array" == l) for (a = 0; a < e.length; a++) {
                var d;
                try {
                    d = f(a);
                } catch (g) {}
                try {
                    s.push(d);
                } catch (g) {
                    s.push(r);
                }
            } else for (a in e) if ("constructor" != a && Object.prototype.hasOwnProperty.call(e, a)) {
                var d;
                try {
                    d = f(a);
                } catch (g) {}
                s[a] = f(a);
            }
            return s;
            try {
                return cloneInto(s, n, o);
            } catch (g) {}
            return s;
        }
        return e;
    }
    function lt(e, a, n) {
        if (t != typeof exportFunction) try {
            return exportFunction(e, a, n);
        } catch (o) {}
        var r = "";
        if (n && n.defineAs ? r = n.defineAs : "function" == typeof e && "" != e.name && (r = e.name), 
        "" != r) try {
            return a[r] = e;
        } catch (o) {}
    }
    function z(e) {
        var t = s || i;
        if (!e) {
            if (!t.event) return;
            e = t.event;
        }
        null != e.cancelBubble && (e.cancelBubble = !0), e.stopPropagation && e.stopPropagation(), 
        e.preventDefault && e.preventDefault(), t.event && (e.returnValue = !1), null != e.cancel && (e.cancel = !0);
    }
    function nn(e) {
        var t = /^\[object |\]$/g;
        try {
            if ("event" == Object.prototype.toString.call(e).replace(t, "").toLowerCase()) return !0;
        } catch (n) {}
        try {
            if ("event" == ("" + e.constructor).replace(t, "").toLowerCase()) return !0;
        } catch (n) {}
        return !1;
    }
    function Nt(e) {
        this.data = e || {};
    }
    function pt(t, a, o) {
        var n = e.Element.document;
        if (e.jQueryAvailable) $(t).click(); else if (n.createEvent) {
            var r = n.createEvent("MouseEvents");
            r.initEvent("click", a || !0, o || !0), t.dispatchEvent(r);
        } else n.createEventObject ? t.fireEvent("onclick") : "function" == typeof t.onclick && t.onclick();
    }
    function Jt(l) {
        for (var i = 3, o = 4, a = l.length, r = 0, e, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", s = "", u = 0, n = Array(i), t = Array(o); a > r; ) {
            for (e = 0; i > e; ++e) n[e] = a > r ? 255 & l.charCodeAt(r++) : 0;
            switch (t[0] = n[0] >> 2, t[1] = (3 & n[0]) << 4 | n[1] >> 4, t[2] = (15 & n[1]) << 2 | n[2] >> 6, 
            t[3] = 63 & n[2], u = r - (a - 1)) {
              case 1:
                t[3] = 64;
                break;

              case 2:
                t[3] = 64, t[2] = 64;
            }
            for (e = 0; o > e; ++e) s += c.charAt(t[e]);
        }
        return s;
    }
    function ht(n, r, t) {
        var o = (s || i).getComputedStyle(n, null), a = parseInt(o.width);
        t = t || 0, 25 > t && (isNaN(a) || a > 300) ? e.Element.requestAnimationFrame(function() {
            ht(n, r, t + 1);
        }) : r(n);
    }
    function Ct(n) {
        var t, a, r = e.$(".tab-content", n.parentElement);
        n && r && null !== r.offsetParent && (a = (s || i).getComputedStyle(n, null), t = parseInt(a.width), 
        isNaN(t) ? e.debug && G("Tabs.resize", "Tab width is NaN!", n, r, a) : t > 300 ? e.debug && G("Tabs.resize", "Tab width too wide!", t, n) : t > 50 && (r.style.marginLeft = t + 11 + "px"));
    }
    function kt(t) {
        var e = t.name, r = e.split(" ");
        -1 == r.indexOf("fa") && -1 == r.indexOf("glyphicon") && (-1 != e.indexOf("fa-") ? e = "fa " + e : -1 != e.indexOf("glyphicon-") && (e = "glyphicon " + e));
        var n = {
            type: "i",
            className: e,
            attributes: {}
        };
        return t.tooltip && (n = I(n, t.tooltip)), n;
    }
    function I(r, e) {
        if (p(r)) {
            if (j(r, n(F)), r.setAttribute(n(V), e.innerHTML || e.text || null), r.setAttribute(n(at), e.placement || "top"), 
            t != typeof e.margin) {
                var a = n("Tooltip.attributeNames.margin");
                t != typeof e.margin.left && r.setAttribute(a + "-left", e.margin.left), t != typeof e.margin.right && r.setAttribute(a + "-right", e.margin.right), 
                t != typeof e.margin.top && r.setAttribute(a + "-top", e.margin.top), t != typeof e.margin.bottom && r.setAttribute(a + "-bottom", e.margin.bottom);
            }
        } else if (r.className = (r.className || "") + " " + n(F), typeof r.attributes === t && (r.attributes = {}), 
        r.attributes[n(V)] = e.innerHTML || e.text || null, r.attributes[n(at)] = e.placement || "top", 
        t != typeof e.margin) {
            var a = n("Tooltip.attributeNames.margin");
            t != typeof e.margin.left && (r.attributes[a + "-left"] = e.margin.left), t != typeof e.margin.right && (r.attributes[a + "-right"] = e.margin.right), 
            t != typeof e.margin.top && (r.attributes[a + "-top"] = e.margin.top), t != typeof e.margin.bottom && (r.attributes[a + "-bottom"] = e.margin.bottom);
        }
        return r;
    }
    function Ft(t) {
        var e = t.description || t.name;
        p(e) || "object" == typeof e || (e = {
            type: "span",
            className: "noselect",
            innerHTML: e,
            attributes: {}
        });
        var n = {
            type: "label",
            className: "col-md-4 control-label noselect",
            innerHTML: e,
            attributes: {}
        };
        return n;
    }
    function Vt(e) {
        v.execCallback(document.currentScript.getAttribute("data-callback-index"), document.currentScript, e, document.currentScript);
    }
    function Gt(t, n, a, o, i) {
        c.log("jModListenError", t, n, a, o);
        var s = e.parseStack(i.stack);
        return s.length > 0 ? e.ERROR.catchError(t, n, a, o, i, s) : r;
    }
    e.InitializeStartTime = Wt, e.InitializeEndTime = -1;
    const yn = "http://code.jmod.info/fonts";
    var d = Array.prototype.slice, X = t != typeof $ ? !0 : !1, ot = -1, H = "@import url(//fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700);\n@import url(http://code.jmod.info/fonts/sansation.css);\n", Zt = "@import url(http://code.jmod.info/0.0.19/jMod.css);\n", T = {
        id: "jMod",
        config: {},
        el: r
    }, h = e.API = {
        addGlyphicons: function() {
            H = "@import url(http://code.jmod.info/css/glyphicons.css);\n" + H, e.CSS = "";
        }
    };
    try {
        T.el = i.document && i.document.currentScript ? i.document.currentScript : r;
    } catch (mt) {}
    var q = function(a, n, o, r) {
        var t = {
            configurable: !1,
            enumerable: !1 === r ? r : !0
        };
        "function" == typeof n ? t.get = n : (t.value = n, t.writable = !1), Object.defineProperty(o || e, a, t);
    };
    q("ScriptElement", function() {
        return T.el ? T : r;
    }), q("version", "0.0.19"), q("build_time", "1424180974000"), q("build_type", "release"), 
    q("_debug", !1), Object.defineProperty(e, "debug", {
        get: function() {
            try {
                return t != typeof e.Config.debug ? e.Config.debug : e._debug;
            } catch (n) {
                return e._debug;
            }
        },
        set: function(t) {
            e.Config.debug = !0 === t ? !0 : !1;
        },
        enumerable: !1
    }), Object.defineProperty(e, "jQueryAvailable", {
        get: function() {
            return X || t != typeof $ ? X = !0 : t != typeof jQuery ? ($ = jQuery, X = !0) : t != typeof i.jQuery ? ($ = i.jQuery, 
            X = !0) : !1;
        },
        set: function(e) {
            X = e ? !0 : !1;
            try {
                "jQuery" == N(e) && ($ = e);
            } catch (t) {}
        },
        enumerable: !1
    }), q("jQuery", function() {
        return e.jQueryAvailable ? $ : r;
    });
    var k = new function() {
        var n, a = function() {
            return n === r && (n = typeof i.performance !== t && typeof i.performance.timing !== t ? i.performance : r), 
            n;
        };
        this.__defineGetter__("performanceObject", function() {
            return a();
        }), this.__defineGetter__("available", function() {
            return this.performanceObject === r ? !1 : !0;
        }), this.__defineGetter__("now", function() {
            try {
                return this.performanceObject.now();
            } catch (t) {
                e.Warning("Performance not available!");
            }
        }), this.get = function(o) {
            var e = 0, a = o.split("."), n = this.performanceObject;
            if (n !== r) {
                for (e; e < a.length; e++) {
                    if (typeof n[a[e]] === t) return;
                    n = n[a[e]];
                }
                return n;
            }
        }, this.getAllTiming = function(t) {
            t === r && (t = []);
            var a = [], n = this.performanceObject;
            for (var e in n.timing) isNaN(n.timing[e]) || -1 != t.indexOf(e) || (a[e] = n.timing[e]);
            return a;
        }, this.pageLoadTime = function() {
            try {
                var e = this.performanceObject.timing;
                if (isNaN(e.loadEventEnd)) return;
                return e.loadEventEnd - e.navigationStart;
            } catch (t) {}
        };
    }();
    Object.defineProperty(e, "timeElapsed", {
        get: function() {
            return k.now - e.InitializeStartTime;
        }
    });
    var b = e.Loading = {
        headAvailable: !1,
        DOMLoaded: !1,
        CSSAdded: !1,
        performanceReady: !1,
        documentComplete: !1,
        jModReady: !1,
        Complete: !1
    };
    Object.defineProperty(e, "CSS", {
        get: function() {
            return H;
        },
        set: function(t) {
            H += t, b.CSSAdded && e.AddCSS();
        },
        enumerable: !1
    }), e.AddCSS = function(e) {
        Ut(H + (e || "")), H = "";
    };
    var wt = {
        SearchForKey: {
            value: ft,
            enumerable: !1
        },
        SearchForKeys: {
            value: Kt,
            enumerable: !1
        },
        setKeyValue: {
            value: an,
            enumerable: !1
        },
        SearchForKeyI: {
            value: It,
            enumerable: !1
        },
        setKeyValueI: {
            value: Qt,
            enumerable: !1
        }
    };
    e.parseStack = function(n) {
        for (var t = [], r = /(([^\s]*)\@file\:\/\/\/([^\s]+?(?:\/([^\/]+?\.(user\.js|js|json|php|htm|html|asp)))?):(\d+)(?:\:(\d+))?)/gi, e; null != (e = r.exec(n)); ) {
            var a = {
                line: e[1],
                functionName: e[2],
                fullFileName: e[3],
                fileName: e[4],
                fileExt: e[5],
                lineNumber: e[6],
                columnNumber: e[7]
            };
            t.push(a);
        }
        return t;
    };
    var p = function(e) {
        try {
            return e instanceof HTMLElement;
        } catch (t) {
            return "object" == typeof e && 1 === e.nodeType && "object" == typeof e.style && "object" == typeof e.ownerDocument;
        }
    };
    e.Versions = {
        parseVersion: function(n) {
            var a = /^\s*(.*?)\s*((?:[\d]+\.)*[\d]+)\s*(.*?)\s*$/i, i = /([\d]+)\.?/gi, e, t = {
                fullVersion: n.trim(),
                versionStr: null,
                prefixStr: null,
                suffixStr: null,
                version: []
            };
            if (e = a.exec(n.trim())) {
                t.prefixStr = e[1], t.versionStr = e[2], t.suffixStr = e[3];
                var r = e[2].split(".");
                for (var o in r) t.version.push(parseInt(r[o]));
            }
            return t;
        },
        compare: function(n, r) {
            var a = n, o = r;
            "string" == typeof n && (a = this.parseVersion(n)), "string" == typeof r && (o = this.parseVersion(r));
            for (var i = [].concat(a.version), s = [].concat(o.version); ;) {
                var e = i.shift(), t = s.shift();
                if (null == e || null == t) {
                    if (null != e && null == t) return 1;
                    if (null == e && null != t) return -1;
                    break;
                }
                if (parseInt(e) > parseInt(t)) return 1;
                if (parseInt(e) < parseInt(t)) return -1;
            }
            return 0;
        }
    };
    var ct = e.URLBuilder = function(e) {
        this.protocol = "http:", this.hostname = "", this.pathname = "", this.args = [], 
        this.setHostname = function(e) {
            try {
                if ("string" == typeof e) {
                    var t = document.createElement("a");
                    /^\s*(?:https?\:)?\/\//i.test(e) || (e = "http://" + e), t.href = e, this.hostname = t.hostname, 
                    this.protocol = t.protocol;
                }
            } catch (n) {} finally {
                return this;
            }
        }, this.setPath = function(e) {
            return "/" != e[0] && (e = "/" + e), this.pathname = e, this;
        }, this.addArg = function(e, t) {
            return this.args.push({
                name: e,
                value: t
            }), this;
        }, this.addArgs = function(t) {
            for (var e = 0; e < t.length; e++) switch (N(t[e])) {
              case "array":
                this.addArg(t[e][0], t[e][1]);
                break;

              case "map":
              case "object":
                var n = dt(t[e], [ "name", "key" ]), r = dt(t[e], [ "value" ]);
                n && r && this.addArg(n, r);
            }
            return this;
        }, this.buildArgs = function() {
            for (var n = "", t = [], e = 0; e < this.args.length; e++) t.push(this.args[e].name + "=" + this.args[e].value);
            return t.join("&");
        }, this.toString = function() {
            return this.protocol + "//" + this.hostname + this.pathname + "?" + this.buildArgs();
        }, this.setHostname(e);
    }, Xt = function() {
        function t(i) {
            var n, o = 0, a = {}, s = arguments.length;
            if (s > 0 && ("string" != typeof i && (i instanceof Error ? a.e = i : a = i, i = s > 1 ? arguments[1] : r, 
            o++), "string" == typeof i && (a.message = i, s > o + 1 && (a.fileName = arguments[o + 1]), 
            s > o + 2 && (a.lineNumber = arguments[o + 2]), s > o + 3 && (a.columnNumber = arguments[o + 3]), 
            s > o + 4 && arguments[o + 4] instanceof Error && (a.e = arguments[o + 4])), a.e)) try {
                n = a.e, this.stack = n.stack;
            } catch (c) {}
            if (n || (n = Error(a.message || null, a.fileName || null, a.lineNumber || null), 
            n.constructor = t, n.__proto__ = Object.create(n.__proto__, {
                name: {
                    value: "jModError",
                    enumerable: !1
                },
                toString: {
                    value: function() {
                        return this.name + ": " + this.message;
                    }
                }
            }), delete n.toString, n.toString = function() {
                return this.name + ": " + this.message;
            }.bind(n), n.stack && ("undefined" != typeof Components ? n.stack = this.stack = n.stack.substring(n.stack.indexOf("\n") + 1) : "undefined" != typeof chrome || "undefined" != typeof process ? (n.stack = this.stack = n.stack.replace(/\n[^\n]*/, ""), 
            Object.defineProperty(n, "stack", {
                value: this.stack
            })) : this.stack = n.stack)), this.stack && !a.fileName) {
                var l = e.parseStack(this.stack);
                if (l && l.length > 0 && (this.pStack = l, a.lineNumber = parseInt(l[0].lineNumber), 
                a.columnNumber = parseInt(l[0].columnNumber || 0), a.fileName = l[0].fileName, !n.fileName || "null" == n.fileName)) try {
                    n.lineNumber = a.lineNumber, n.columnNumber = a.columnNumber, n.fileName = a.fileName, 
                    n.stack = this.stack;
                } catch (c) {
                    try {} catch (c) {}
                }
            }
            this.displayName = this.name = "jModError", this.err = n, this.message = a.message || n.message, 
            this.fileName = a.fileName || n.fileName, this.lineNumber = null != a.lineNumber ? a.lineNumber : n.lineNumber, 
            this.columnNumber = null != a.columnNumber ? a.columnNumber : n.columnNumber, this.toString = function() {
                return this.name + ": " + this.message;
            }, this.constructor = Error;
        }
        return t.prototype = Object.create(Error.prototype, {
            name: {
                value: "jModError",
                enumerable: !0
            }
        }), t.prototype.constructor = t, t.prototype.constructor.constructor = Error, t.prototype.log = function(e, t) {
            var e = e || "jMod Error", t = t || this.message;
            _(this, e, t);
        }, t;
    }();
    String.prototype.trim || function() {
        Object.defineProperty(String.prototype, "trim", {
            value: function() {
                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
            },
            enumerable: !1
        });
    }();
    var N = e.RealTypeOf = function(n) {
        var e;
        try {
            (n.constructor === {}.constructor || n) && (e = n);
        } catch (r) {
            e = R(n, i, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
        }
        try {
            if (typeof e === t) return t;
            if ("number" == typeof e && 1 == isNaN(e)) return "nan";
            if ("object" == typeof e) return null === e ? "null" : e.constructor === {}.constructor ? "map" : e.constructor === [].constructor ? "array" : e.constructor === new Date().constructor ? isNaN(e.getTime()) ? "invaliddate" : "date" : e.constructor === RegExp().constructor ? "regex" : Object.prototype.toString.call(e).replace(/^\[object |\]$/g, "").toLowerCase();
        } catch (r) {}
        return typeof e;
    }, Q = function(e) {
        try {
            if ("object" != typeof e || e.nodeType || e === e.window) return !1;
            if (e.constructor && !e.hasOwnProperty.call(e.constructor.prototype, "isPrototypeOf")) return !1;
        } catch (n) {
            var t = R(e, i, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
            if ("object" != typeof t || t.nodeType || t === t.window) return !1;
            if (t.constructor && !t.hasOwnProperty.call(t.constructor.prototype, "isPrototypeOf")) return !1;
        }
        return !0;
    }, J = function(e) {
        try {
            if (e.constructor === [].constructor) return !0;
        } catch (n) {
            var t = R(e, i, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
            if (t.constructor === [].constructor) return !0;
        }
        return !1;
    }, hn = function(e) {
        return "function" == typeof e;
    };
    e.extend = function() {
        var o, n, i, a, l, c, t = arguments[0] || {}, s = 1, f = arguments.length, u = !1;
        for ("boolean" == typeof t && (u = t, t = arguments[s] || {}, s++), "object" != typeof t && "function" != typeof t && (t = {}), 
        s === f && (t = this, s--); f > s; s++) if (null != (o = arguments[s])) for (n in o) {
            i = t[n];
            try {
                (("object" == typeof o[n] || "function" == typeof o[n]) && o[n].constructor === {}.constructor || o[n] || t) && (a = o[n]);
            } catch (d) {
                a = R(o[n], t, {
                    cloneFunctions: !0,
                    wrapReflectors: !0
                });
            }
            if (t !== o[n] && t !== a) if (u && a && (Q(a) || (l = J(a)))) l ? (l = !1, c = i && J(i) ? i : []) : c = i && Q(i) ? i : {}, 
            t[n] = e.extend(u, c, a); else if (a !== r) try {
                t[n] = a;
            } catch (d) {
                t[n] = R(a, t, {
                    cloneFunctions: !0,
                    wrapReflectors: !0
                });
            }
        }
        return t;
    }, e.extendp = function() {
        var a, t, o, n, c, s, d, e = arguments[0] || {}, i = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof e && (l = e, e = arguments[i] || {}, i++), "object" != typeof e && "function" != typeof e && (e = {}), 
        i === u && (e = this, i--); u > i; i++) if (null != (a = arguments[i])) for (t in a) {
            o = e[t];
            try {
                (("object" == typeof a[t] || "function" == typeof a[t]) && a[t].constructor === {}.constructor || a[t] || e) && (n = a[t]);
            } catch (f) {
                n = R(a[t], e, {
                    cloneFunctions: !0,
                    wrapReflectors: !0
                });
            }
            if (e !== n) if (l && n && (Q(n) || (c = J(n)))) {
                if (c) {
                    if (J(o) && Array.prototype.push.apply(e[t], n)) continue;
                    s = o && J(o) ? o : [];
                } else s = o && Q(o) ? o : {};
                e[t] = jQuery.extendp(l, s, n);
            } else if (n !== r) try {
                e[t] = n;
            } catch (f) {
                e[t] = R(n, e, {
                    cloneFunctions: !0,
                    wrapReflectors: !0
                });
            }
        }
        return e;
    }, e.CloneProperties = function() {
        var a, l, d, u, o, n, i, p = arguments.length, s = arguments[0], f = !1, c = 1;
        if ("boolean" == typeof s && p > 2 && (f = s, s = arguments[c++]), s === r || null === s) return s;
        for (i = Object(s), c; p > c; c++) if (a = arguments[c], a !== r && null !== a) for (d = f ? Object.getOwnPropertyNames(Object(a)) : Object.keys(Object(a)), 
        u = 0; u < d.length; u++) o = d[u], n = Object.getOwnPropertyDescriptor(a, o), n !== r && ("function" == typeof a[o] ? i[o] = a[o].bind(i) : "object" == typeof a[o] && Q(a[o]) ? Object.defineProperty(i, o, {
            enumerable: n.enumerable,
            configurable: n.configurable,
            writable: n.writable,
            value: f ? e.CloneProperties(f, i[o] || {}, a[o]) : a[o]
        }) : (l = {
            enumerable: n.enumerable,
            configurable: n.configurable
        }, t != typeof n.get && (l.get = n.get.bind(i)), t != typeof n.set && (l.set = n.set.bind(i)), 
        t != typeof n.value && (l.writable = n.writable, l.value = "function" == typeof n.value ? n.value.bind(i) : n.value), 
        Object.defineProperty(i, o, l)));
        return i;
    }, function() {
        var i = "", u = "?", l = "function", f = "undefined", o = "object", t = "major", s = "model", n = "name", c = "type", a = "vendor", r = "version", d = "architecture", p = "console", g = "mobile", m = "tablet", h = "smarttv", y = "wearable", b = "embedded";
        e.Browser = {
            getAgent: function() {
                return navigator.userAgent;
            },
            get: function() {},
            getRegexMatches: function(s, t) {
                for (var a, o = [], e = 0; e < t.length; e += 2) {
                    for (var i = t[e], n = [], r = 0; r < i.length; r++) (a = i[r].exec(s)) && n.push(a);
                    n.length > 0 && o.push({
                        matches: n,
                        map: t[e + 1]
                    });
                }
                return o;
            },
            getRegexFirstMatch: function(o, t) {
                for (var r, e = 0; e < t.length; e += 2) for (var a = t[e], i = [], n = 0; n < a.length; n++) if (r = a[n].exec(o)) return [ r, t[e + 1] ];
                return [];
            },
            getBrowser: function() {
                var n = {};
                try {
                    var r = this.getAgent(), e = this.getRegexFirstMatch(r, this.regexes.browser);
                    if (e.length > 1) for (var t = 0; t < e[1].length; t++) n[e[1][t]] = e[0][t + 1];
                } catch (a) {}
                return n;
            },
            regexes: {
                browser: [ [ /(opera\smini)\/((\d+)?[\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i, /(opera).+version\/((\d+)?[\w\.]+)/i, /(opera)[\/\s]+((\d+)?[\w\.]+)/i ], [ n, r, t ], [ /\s(opr)\/((\d+)?[\w\.]+)/i ], [ [ n, "Opera" ], r, t ], [ /(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i ], [ [ n, "IE" ], r, t ], [ /(yabrowser)\/((\d+)?[\w\.]+)/i ], [ [ n, "Yandex" ], r, t ], [ /(comodo_dragon)\/((\d+)?[\w\.]+)/i ], [ [ n, /_/g, " " ], r, t ], [ /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i, /(uc\s?browser|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i ], [ n, r, t ], [ /((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i ], [ [ n, "Chrome" ], r, t ], [ /version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i ], [ r, t, [ n, "Mobile Safari" ] ], [ /version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i ], [ r, t, n ], [ /(konqueror)\/((\d+)?[\w\.]+)/i, /(webkit|khtml)\/((\d+)?[\w\.]+)/i ], [ n, r, t ], [ /(navigator|netscape)\/((\d+)?[\w\.-]+)/i ], [ [ n, "Netscape" ], r, t ], [ /(swiftfox)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i, /(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i ], [ n, r, t ] ]
            }
        };
    }();
    var Rt = function(t) {
        var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return e ? {
            r: parseInt(e[1], 16),
            g: parseInt(e[2], 16),
            b: parseInt(e[3], 16),
            a: null
        } : null;
    }, Pt = function(t) {
        var e = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))?\s*\)/im.exec(t);
        return e ? {
            r: parseInt(e[1]),
            g: parseInt(e[2]),
            b: parseInt(e[3]),
            a: e[4] && "" != e[4] ? parseFloat(e[4]) : null
        } : null;
    }, U = function(e) {
        var t = Pt(e);
        return t ? t : Rt(e);
    }, zt = .5 * Math.PI, mn = 10 * Math.log(2), $t = function(e, t, n, r) {
        return 2 * n / Math.PI * Math.asin((r - e) / t);
    }, Tt = function(t, n, r) {
        var e = zt / n, a = t * e;
        return Math.round(a * Math.cos(e * r));
    }, n = e.Config = function(r, a) {
        try {
            n.getScriptFileInfo && !E.gotFileInfo && E.getScriptFileInfo();
        } catch (o) {}
        return typeof a === t ? "string" == typeof r ? e.Config.SearchForKey(r) : e.Config.SearchForKeys(r) : e.Config.setKeyValue(r, a);
    };
    e.extend(e.Config, {
        host: "http://myuserjs.org",
        scopeLock: !1,
        secure: !1,
        browser: e.Browser.getBrowser(),
        getScriptFileInfo: !0,
        addToGlobalScope: !0,
        script: {
            username: r,
            script_name: r
        },
        Update: {
            DOMTiming: !1,
            args: {},
            updateVeriableName: "USMetaData",
            getType: "data",
            jQuery: !1,
            XMLHttpRequest: !1,
            getStats: !1,
            sampleRate: 100
        },
        Error: {
            autoReportErrors: !1,
            errorFilter: function(e, t, n) {
                return !0;
            }
        },
        API: {
            log: {
                disabled: [],
                verbosity_level: e._debug ? 5 : 3,
                GM_log: !0,
                Firebug: !0,
                WebConsole: !0,
                debug: !1
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
            CrossOrigin: !0
        },
        debug: !1
    }), "object" == typeof i.jMOD_CONFIGURATION && (e.Config = e.extend(!0, e.Config, i.jMOD_CONFIGURATION)), 
    Object.defineProperties(e.Config, wt);
    var nt = function(n, r) {
        return typeof r === t ? e.Config.SearchForKeyI(n) : e.Config.setKeyValueI(n, r);
    };
    if (n.scanElement = function(a) {
        if (a && p(a)) {
            var i = {}, r = 0, n, t, s, u = /^(?:data-)?(.*?)$/i, o = a.attributes;
            for (r; r < o.length; r++) if (n = o[r].nodeName, n = u.exec(n)[1], t = o[r].value) {
                switch (n.toLowerCase()) {
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
                    e.Config.script.username = t;
                    break;

                  case "scriptname":
                  case "script_name":
                  case "script-name":
                    e.Config.script.script_name = t;
                    break;

                  case "jmod-config":
                    try {
                        t = JSON.parse(t), t && e.extend(!0, e.Config, t);
                    } catch (l) {
                        c.error('Error parsing "' + o[r].nodeName + '"', a, l);
                        continue;
                    }
                    break;

                  default:
                    switch (n = n.split("-").join("."), s = nt(n), typeof s) {
                      case "number":
                        nt(n, parseInt(t));
                        break;

                      case "boolean":
                        nt(n, "true" == t.trim().toLowerCase() ? !0 : !1);
                        break;

                      case "string":
                        nt(n, t);

                      case "object":
                        try {
                            t = JSON.parse(t), t && nt(n, t);
                        } catch (l) {
                            c.error('Error parsing "' + o[r].nodeName + '"', a, l);
                            continue;
                        }
                        break;

                      default:
                        continue;
                    }
                }
                i[n] = t;
            }
            return i;
        }
    }, T.el) if (T.config = n.scanElement(T.el), T.el.id && "" != T.el.id.trim()) T.id = T.el.id; else {
        if ((s || i).document.getElementById(T.id)) {
            for (var P = 0; (s || i).document.getElementById(T.id + "-" + P); ) P++;
            T.id = T.id + "-" + P;
        }
        T.el.id = T.id;
    }
    e.API.ParseMetaData_Types = [], e.API.ParseMetaData_Types.push(function(s, e) {
        if ("history" == s.toLowerCase() && "object" == typeof e) {
            for (var o = /\(([0-9\.]+)\)\s+(.*?)$/i, n = {}, r = 0; r < e.length; r++) if (o.test(e[r])) {
                var i = o.exec(e[r]), a = i[1], l = i[2];
                typeof n[a] === t && (n[a] = []), n[a].push(l);
            }
            return n;
        }
    }), e.API.ParseMetaData_Types.push(function(o, e) {
        if ("resource" == o.toLowerCase()) {
            "object" != typeof e && (e = [ e ]);
            var n, t = 0, r = {}, a = /^\s*([\w]+)\s+(.*?)\s*$/;
            for (t; t < e.length; t++) a.test(e[t]) && (n = a.exec(e[t]), r[n[1]] = n[2]);
            return r;
        }
    }), e.API.ParseMetaData = function(o) {
        var i, s, a, n, r = {}, l = /@([\S]+)\s+(.*?)$/i;
        for ("string" == typeof o && (o = o.split(/\r?\n/i)), a = 0; a < o.length; a++) l.test(o[a]) && (n = l.exec(o[a]), 
        typeof r[n[1]] === t ? r[n[1]] = n[2] : "string" != typeof r[n[1]] ? r[n[1]].push(n[2]) : (i = r[n[1]], 
        r[n[1]] = [], r[n[1]].push(i), r[n[1]].push(n[2])));
        for (s in r) for (a = 0; a < e.API.ParseMetaData_Types.length; a++) if (typeof (i = e.API.ParseMetaData_Types[a](s, r[s])) !== t) {
            r[s] = i;
            break;
        }
        return r;
    };
    var E = e.ScriptInfo = function() {
        if (0 == arguments.length) return e.ScriptInfo.get();
        var t = typeof arguments[0];
        return 1 != arguments.length || "object" !== t && "string" != t ? r : e.ScriptInfo.GM_info(arguments[0]);
    };
    E.getURLInfo = function(t) {
        var n = /myuserjs\.org\/script\/([^\/]+)\/([^\s]+)(?:\.(user|meta|metajs|data)\.js){1}?/i;
        if (n.test(t)) {
            var e = n.exec(t);
            return {
                username: e[1],
                script_name: e[2],
                get_type: e[3]
            };
        }
        return !1;
    }, E.gotFileInfo = !1, E.getScriptFileInfo = function() {
        if (E.gotFileInfo || !n.getScriptFileInfo) return n.script.script_file_info;
        var a = 0, o, r, i = {}, l = Error(), s = "" + l.stack;
        if (-1 != s.indexOf("user.js") && (o = e.parseStack(s), o.length > 0)) for (a; a < o.length; a++) if (r = o[a], 
        t == typeof n.jMod_File_Path && -1 != [ "jmod.js", "jmod.min.js", "jmod.full.js", "jmod.min.expanded.js", "mujs.js", "mujs.min.js" ].indexOf(r.fileName.toLowerCase()) && (n.jMod_Full_File_Name = r.fileName, 
        n.jMod_File_Name = r.fileName.substr(0, r.fileName.length - 3), n.jMod_File_Path = r.fullFileName), 
        "" != r.fileName && "user.js" == r.fileExt.toLowerCase()) return E.gotFileInfo = !0, 
        i = n.script.script_file_info = {
            userscript_full_file_name: r.fileName,
            userscript_file_name: r.fileName.substr(0, r.fileName.length - 8),
            userscript_file_path: r.fullFileName,
            caller_lineNumber: r.lineNumber,
            caller_functionName: r.functionName
        }, e.debug && xt("ScriptInfo.getScriptFileInfo", "Get Script File Info Successful!!", i, r), 
        i;
    }, Object.defineProperty(E, "InfoSet", {
        get: function() {
            return t != typeof n.script.script_info;
        }
    }), E.set = function(o) {
        var d, r, f, s, i, l, u, a = {};
        try {
            d = E.getScriptFileInfo(), t != typeof d && (a = e.extend(a, d));
        } catch (p) {}
        try {
            if (typeof o === t && (t != typeof GM_info || t != typeof GM_getMetadata)) try {
                o = {
                    gm_info: t != typeof GM_info ? GM_info : GM_getMetadata(),
                    has_GM_info: t != typeof GM_info,
                    has_GM_getMetadata: t != typeof GM_getMetadata
                };
            } catch (p) {}
            if ("object" == typeof o ? (r = o.GM_info || o.gm_info || o.ginfo, t == typeof r && t != typeof o.scriptSource && (r = o), 
            t != typeof r && t != typeof r.scriptMetaStr && (f = r.scriptMetaStr)) : "string" == typeof o && (f = o), 
            t != typeof f) {
                s = e.API.ParseMetaData(f);
                for (i in s) t == typeof a[i] && (a[i] = s[i]);
            }
            if (t != typeof r) {
                if (t != typeof r.script) for (i in r.script) typeof a[i] === t && (a[i] = r.script[i]); else c.warn("ScriptInfo", "GM_info.script does not exist", r, o);
                t != typeof r.uuid ? a.gmUUID = r.uuid : t != typeof r.script.uuid && (a.gmUUID = r.script.uuid), 
                t != typeof r.scriptHandler ? "tampermonkey" == r.scriptHandler.toLowerCase() ? (a.script_handler = "Tampermonkey", 
                a.script_handler_version = r.version, n.getScriptFileInfo = !1) : "greasemonkey" == r.scriptHandler.toLowerCase() && (a.script_handler = "Greasemonkey", 
                a.script_handler_version = r.version) : o.has_GM_info ? (a.script_handler = "Greasemonkey", 
                a.script_handler_version = r.version) : o.has_GM_getMetadata && (a.script_handler = "Scriptish");
            }
            if (t != typeof s && (i = vt(s, [ "downloadURL", "updateURL", "jModupdateURL", "jModUpdateURL", "jModdownloadURL", "jModDownloadURL" ], function(n, t) {
                return e.ScriptInfo.getURLInfo(t);
            }), t != typeof i && (u = E.getURLInfo(s[i])) ? (n.script.username = u.username, 
            n.script.script_name = u.script_name, -1 != [ "meta", "metajs", "data" ].indexOf(u.get_type.toLowerCase()) && (n.script.get_type = u.get_type.toLowerCase())) : ((l = dt(s, [ "jModusername", "jMod_username" ])) && (n.script.username = l), 
            (l = dt(s, [ "jModscriptname", "jMod_script_name" ])) && (n.script.script_name = l)), 
            t != typeof s.jMod)) try {
                (l = JSON.parse(s.jMod)) && e.extend(!0, e.Config, l);
            } catch (p) {
                _(p, "ScriptInfo.set", "Error parsing options in MetaBlock");
            }
        } catch (p) {
            c.error("Error ScriptInfo.set", p);
        }
        return Object.defineProperty(e.Config.script, "script_info", {
            value: Object.freeze(a),
            writable: !1,
            enumerable: !0,
            configurable: !1
        }), Object.freeze(a);
    }, E.get = function() {
        var n = e.Config.script.script_info;
        return t != typeof n ? n : E.set.apply(this, arguments);
    };
    var _t = !1;
    if (t != typeof GM_info || t != typeof GM_getMetadata) {
        try {
            E.set();
        } catch (mt) {}
        var Lt = n("script.script_info.resource");
        if (Lt && Lt.jModCSS && t != typeof GM_getResourceText) try {
            var W = GM_getResourceText("jModCSS");
            W && "" != W && (H += W, _t = !0);
        } catch (mt) {}
    }
    _t || (H = Zt + H);
    var At = function(n, e) {
        function a(a, u, i, s, l, f) {
            if ("%%" == a) return "%";
            if (e[++t] === r) return r;
            var a = s ? parseInt(s.substr(1)) : r, o = l ? parseInt(l.substr(1)) : r, n;
            switch (f) {
              case "s":
                n = e[t];
                break;

              case "c":
                n = e[t][0];
                break;

              case "f":
                n = parseFloat(e[t]).toFixed(a);
                break;

              case "p":
                n = parseFloat(e[t]).toPrecision(a);
                break;

              case "e":
                n = parseFloat(e[t]).toExponential(a);
                break;

              case "x":
                n = parseInt(e[t]).toString(o ? o : 16);
                break;

              case "d":
                n = parseFloat(parseInt(e[t], o ? o : 10).toPrecision(a)).toFixed(0);
            }
            n = "object" == typeof n ? JSON.stringify(n) : n.toString(o);
            for (var d = parseInt(i), c = i && "0" == i[0] ? "0" : " "; n.length < d; ) n = u !== r ? n + c : c + n;
            return n;
        }
        var t = -1, o = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd])/g;
        return n.replace(o, a);
    }, M = e.Language = function(a) {
        var n, e, r = M.getLanguage(M.Current, !0);
        if (r) {
            if (e = ft.call(r, a), n = typeof e, t == n) {
                if (M.Current === M.Default) return;
                if (r = M.getLanguage(M.Default), e = ft.call(r, a), n = typeof e, t == n) return;
            }
            return 1 == arguments.length || "string" !== n ? e : At.call(At, e, d.call(arguments, 1));
        }
    };
    M.Default = "en", Object.defineProperty(M, "Current", {
        get: function() {
            try {
                return n.Language.Current;
            } catch (e) {
                return M.Default;
            }
        },
        set: function(e) {
            try {
                t !== typeof M.Names[e] && (n.Language.Current = e);
            } catch (r) {}
        }
    }), M.Names = {}, M.getLanguage = function(e, t) {
        return M.Names[e] !== r ? M[e] : t ? M[M.Default] : r;
    }, M.Names.en = "English", M.en = {}, M.Names.es = "Espanol", M.es = {}, e._call = function() {
        var i, a, r, o, s = arguments.length;
        try {
            n.getScriptFileInfo && !E.gotFileInfo && E.getScriptFileInfo();
        } catch (l) {}
        try {
            if (s > 0) {
                if (r = arguments[0], i = typeof r, "string" == i) {
                    if (1 == s) {
                        if (t !== typeof (a = n(r))) return a;
                    } else {
                        switch (o = arguments[1], r) {
                          case "get":
                            return n(o);
                            break;

                          case "set":
                            return n(o, arguments[2]);
                        }
                        if ("function" == typeof o && typeof e.Events.e[r] !== t) return e.Events.addListener.apply(e.Events, d.call(arguments));
                        if (2 == s && t !== typeof (a = n(r)) && typeof a == typeof o) return n(r, o);
                    }
                    if (-1 != e.log.fnList.join("|").toLowerCase().split("|").indexOf(r.toLowerCase()) && "function" == typeof (a = It.call(e.log, r))) return a.apply(e.log, d.call(arguments, 1));
                } else if ("object" == i) {
                    if (!p(r)) {
                        if (typeof vt(r, [ "GM_info", "gm_info", "ginfo" ]) !== t) return E.set.apply(E, d.call(arguments));
                        if (typeof r.scriptSource !== t && typeof r.scriptMetaStr !== t) return E.set.apply(E, d.call(arguments));
                    }
                } else if ("function" == i && 1 == s) return e.onReady = r, r;
                n("debug") && e.Warning("Unable to process jMod() call:", d.call(arguments));
            }
        } catch (l) {}
    }, e.$ = function(n, t, r) {
        t = t || e.Element.document;
        try {
            if (!0 !== r && e.jQueryAvailable) try {
                return $(n, t).first()[0];
            } catch (a) {}
            if ("string" != typeof n) return;
            return t.querySelector(n);
        } catch (a) {
            e.Exception("jMod.Query", "Error!", a);
        }
    }, e.$$ = function(n, t, a) {
        t = t || e.Element.document;
        try {
            if (!0 !== a && e.jQueryAvailable) try {
                return $(n, t).toArray();
            } catch (o) {}
            if ("string" != typeof n) return;
            var r = t.querySelectorAll(n);
            return r ? [].map.call(r, function(e) {
                return e;
            }) : [];
        } catch (o) {
            e.Exception("jMod.Query", "Error!", o);
        }
    }, e.Element = function(t, a) {
        try {
            var n = d.call(arguments);
            switch (N(t)) {
              case "string":
                if ("function" == typeof e.Element[command]) return e.Element._call.apply(e.Element, arguments);
                break;

              case "map":
              case "object":
                return 1 == n.length ? g.apply(e.Element, arguments) : g(n);
                break;

              default:
                e.Element.isElement(t);
            }
        } catch (r) {
            _(r, "jMod.Element");
        }
    }, e.Element._call = function(t) {
        return "function" == typeof e.Element[t] ? e.Element[t].apply(e.Element, d.call(arguments, 1)) : r;
    }, Object.defineProperty(e.Element, "document", {
        get: function() {
            try {
                return t != typeof document ? document : s.document || i.document;
            } catch (e) {}
            return null;
        }
    }), Object.defineProperty(e.Element, "head", {
        get: function() {
            try {
                var t = e.Element.document;
                return t.head || t.getElementsByTagName("head")[0];
            } catch (n) {}
            return null;
        }
    }), e.Element.isElement = p;
    var C = e.Element.hasClass = function(e, t) {
        return -1 != (" " + e.className + " ").indexOf(" " + t + " ");
    }, gn = e.Element.hasClasses = function(t, e) {
        var n = " " + t.className + " ", r = "string" == typeof e ? e.split(" ") : e;
        return r.filter(function(e) {
            return -1 != n.indexOf(" " + e + " ");
        });
    }, Ht = e.Element.missingClasses = function(t, e) {
        var n = " " + t.className + " ", r = "string" == typeof e ? e.split(" ") : e;
        return r.filter(function(e) {
            return -1 == n.indexOf(" " + e + " ");
        });
    }, j = e.Element.addClass = function(e, t) {
        return C(e, t) || (e.className = (e.className + " " + t).trim()), e;
    }, vn = e.Element.addClasses = function(e, t) {
        return e.className = (e.className + " " + Ht(e, t).join(" ")).trim(), e;
    }, dn = RegExp("\\w+"), x = e.Element.removeClass = function(e, t) {
        return e.className = (" " + e.className + " ").replace(RegExp(" " + t + " ", "g"), " ").trim(), 
        e;
    }, Bt = e.Element.removeClasses = function(e, t) {
        return e.className = (" " + e.className + " ").replace(RegExp(" (?:" + ("string" == typeof t ? t.split(" ") : t).join("|") + ") ", "g"), " ").trim(), 
        e;
    }, un = function(e, t) {
        for (var n in t) e.setAttribute(n, t[n]);
        return e;
    }, jt = function(e, t) {
        return e.hasAttribute(t);
    }, cn = function(r, e) {
        var t = 0, n = [];
        for ("string" == typeof e && (e = e.split(" ")); t < e.length; t++) r.hasAttribute(e[t]) && n.push(e[t]);
        return n;
    }, w = function(r, a, n) {
        var t, e = r.getAttribute(a);
        if (!n) return e;
        switch (n) {
          case "int":
          case "integer":
            return parseInt(e);
            break;

          case "bool":
          case "boolean":
            return t = null != e && "" != e ? e.trim().toLowerCase() : "false", -1 !== t.indexOf("true") || "t" == t ? !0 : !1;
        }
        return e;
    }, Yt = function(r, s, l) {
        for (var t = 0, c = r.ownerDocument || e.Element.document, n = c.createElement(s), i = r.attributes, a = r.childNodes, o = [ "scrollLeft", "scrollTop" ]; t < i.length; t++) n.setAttributeNode(i[t]);
        for (t = 0; t < a.length; t++) n.appendChild(l ? n.removeChild(a[t]) : a[t]);
        for (t = 0; t < o.length; t++) n[o[t]] = r[o[t]];
        return n;
    }, L = e.Element.addEventListener = function(e, t, n, r) {
        e.addEventListener ? e.addEventListener(t, n, r ? !0 : !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n;
    }, gt = e.Element.removeEventListener = function(e, t, n, r) {
        e.removeEventListener ? e.removeEventListener(t, n, r ? !0 : !1) : e.detachEvent ? e.detachEvent("on" + t, n) : e["on" + t] = null;
    };
    e.Element.viewportSize = {
        getHeight: function() {
            return this.getSize("Height");
        },
        getWidth: function() {
            return this.getSize("Width");
        },
        getSize: function(t) {
            var l, f = t.toLowerCase(), c = s || i, u = e.Element.document, d = e.Element.head, n = u.documentElement;
            if (c["inner" + t] === r) l = n["client" + t]; else if (c["inner" + t] != n["client" + t]) {
                var a = u.createElement("body");
                a.id = "vpw-test-b", a.style.cssText = "overflow:scroll";
                var o = u.createElement("div");
                o.id = "vpw-test-d", o.style.cssText = "position:absolute;top:-1000px", o.innerHTML = "<style>@media(" + f + ":" + n["client" + t] + "px){body#vpw-test-b div#vpw-test-d{" + f + ":7px!important}}</style>", 
                a.appendChild(o), n.insertBefore(a, d), l = 7 == o["offset" + t] ? n["client" + t] : c["inner" + t], 
                n.removeChild(a);
            } else l = c["inner" + t];
            return l;
        }
    }, Nt.prototype = {
        appendChild: function(a) {
            var n, e = this.data, i = N(e), o = N(a);
            if ("array" == o) {
                for (n = 0; n < a.length; n++) this.appendChild(a[n]);
                return this;
            }
            if (p(e)) {
                if (p(a)) return e.appendChild(a), this;
                if ("ElementBuilderClass" == o) return e.appendChild(a.toElement()), this;
            }
            return "ElementBuilderClass" == i ? (e.appendChild(a), this) : "object" == typeof e ? (n = e.innerHTML === r && e.text !== r ? "text" : "innerHTML", 
            "array" == N(e[n]) ? e[n].push(a) : e[n] = typeof e[n] == t || null == e[n] ? [ a ] : [ e[n], a ], 
            this) : this;
        },
        toElement: function() {
            return p(this.data) ? this.data : this.data = g(this.data);
        }
    }, Object.defineProperties(Nt.prototype, {
        type: {
            get: function() {
                return p(this.data) ? this.data.nodeName.toLowerCase() : this.data.type.toLowerCase();
            },
            set: function(e) {
                if (p(this.data)) {
                    var t = this.data.parentElement;
                    W = Yt(this.data, e, !0), t.replaceChild(W, this.data), this.data = W;
                } else this.data.type = e;
            },
            configurable: !1,
            enumerable: !0
        },
        children: {
            get: function() {
                if (p(this.data)) return this.data.children;
                var e = this.data.innerHTML === r && this.data.text !== r ? "text" : "innerHTML";
                return this.data[e] || null;
            },
            configurable: !1,
            enumerable: !0
        }
    });
    var A = e.Element.appendChild = function(n, o) {
        var s, i, a;
        try {
            if (p(n) || "object" != typeof n || null == n.type) {
                if (typeof o === t || null === o) return n;
                if (p(o)) n.appendChild(o); else switch (N(o)) {
                  case t:
                  case "null":
                    break;

                  case "array":
                    for (a = 0; a < o.length; a++) n = A(n, o[a]);
                    break;

                  case "object":
                  case "map":
                    (i = g(o)) && n.appendChild(i);
                    break;

                  default:
                    for (i = (n.ownerDocument || e.Element.document).createElement("div"), i.innerHTML = o, 
                    s = i.childNodes, a = 0; a < s.length; a++) n.appendChild(s[a]);
                }
            } else a = n.innerHTML === r && n.text !== r ? "text" : "innerHTML", "array" == N(n[a]) ? n[a].push(o) : n[a] = [ n[a], o ];
        } catch (l) {
            _(l, "jMod.Element.appendChild");
        } finally {
            return n;
        }
        return n;
    }, it = [ "id", "className", "checked", "defaultValue", "title", "async", "defer", "src", "onerror", "onload", "responseCallback", "value", "max", "min" ], g = e.Element.createNewElement = function(n) {
        var t, c, l, i, o, s, u = n.EventListeners || n.eventListeners, d = e.Element.document, a = d.createElement(n.type || "div"), f = function(n, e) {
            if ("function" == typeof e) return L(a, n, e);
            if (i = e.useCapture || e.Capture || e.capture || !1, o = e.callback || e["function"]) if ("array" == N(o)) for (t in o) "function" != typeof o[t] && (i = o[t].useCapture || o[t].Capture || o[t].capture || i), 
            L(a, n, o[t], i); else L(a, n, o, i);
        };
        if ("string" == typeof n.style) a.setAttribute("style", n.style); else if ("object" == typeof n.style) for (t in n.style) a.style[t] = n.style[t];
        for (t = 0; t < it.length; t++) n[it[t]] !== r && (a[it[t]] = n[it[t]]);
        if (n.attributes !== r) for (t in n.attributes) null != n.attributes[t] && a.setAttribute(t, n.attributes[t]);
        if (u) for (l in u) if (s = u[l], "array" == N(s)) for (c = 0; c < s.length; c++) f(l, s[c]); else f(l, s);
        return A(a, n.innerHTML || n.text || null), a;
    }, en = e.Element.getOffset = function(t) {
        var n = t.getBoundingClientRect(), e = t.ownerDocument, r = e.documentElement, a = null != e && e === e.window ? e : 9 === e.nodeType && e.defaultView;
        return {
            top: parseInt(n.top + a.pageYOffset - r.clientTop),
            left: parseInt(n.left + a.pageXOffset - r.clientLeft),
            bottom: n.bottom,
            height: parseInt(n.height || parseInt(t.offsetHeight) - parseInt(t.clientHeight) + parseInt(t.scrollHeight)),
            width: parseInt(t.offsetWidth)
        };
    }, tn = e.Element.isNamespaced = function(t, n) {
        for (var e = t; e.parentElement; ) if (e = e.parentElement, C(e, n)) return !0;
        return !1;
    }, B = e.Element.findParentWithClass = function(t, n) {
        for (var e = t; e.parentElement; ) if (e = e.parentElement, C(e, n)) return e;
    }, ln = e.Element.findParentWithAttribute = function(a, n, r) {
        for (var e = a; e.parentElement; ) if (e = e.parentElement, e.hasAttribute(n) && (t == typeof r || e.getAttribute(n) == r)) return e;
    };
    e.Element.getCompStyleObj = function(t, a) {
        var n = t.ownerDocument || e.Element.document;
        return t.currentStyle ? t.currentStyle : n.defaultView && n.defaultView.getComputedStyle ? n.defaultView.getComputedStyle(t, a || null) : r;
    }, e.Element.getCompStyle = function() {
        for (var i = 0, r, a, t, s, n, o; i < arguments.length; i++) r = arguments[i], p(r) ? a = r : "string" == typeof r ? t ? s = r : t = r : n = r;
        if (n) {
            if (n[t]) return n[t];
        } else {
            if (a.currentStyle) return a.currentStyle[t];
            if (o = a.ownerDocument || e.Element.document, o.defaultView && o.defaultView.getComputedStyle && (n = o.defaultView.getComputedStyle(a, s || null))) return n[t] ? n[t] : n.getPropertyValue(t);
        }
        return a ? a.style[t] : null;
    }, e.Element.getClientRect = function(n) {
        try {
            var r, t = e.extend({}, n.getBoundingClientRect());
            return (null == t.height || null == t.width) && (r = e.Element.getCompStyleObj(n), 
            t.height = parseFloat(e.Element.getCompStyle(n, "height", r)), t.width = parseFloat(e.Element.getCompStyle(n, "width", r))), 
            t;
        } catch (a) {}
    }, +function() {
        var t = s || i, n = t.requestAnimationFrame ? "requestAnimationFrame" : t.mozRequestAnimationFrame ? "mozRequestAnimationFrame" : t.webkitRequestAnimationFrame ? "webkitRequestAnimationFrame" : t.oRequestAnimationFrame ? "oRequestAnimationFrame" : t.msRequestAnimationFrame ? "msRequestAnimationFrame" : null, a = t.cancelAnimationFrame ? "cancelAnimationFrame" : t.mozCancelAnimationFrame ? "mozCancelAnimationFrame" : t.webkitCancelAnimationFrame ? "webkitCancelAnimationFrame" : t.oCancelAnimationFrame ? "oCancelAnimationFrame" : t.msCancelAnimationFrame ? "msCancelAnimationFrame" : t.clearTimeout ? "clearTimeout" : null;
        e.Element.requestAnimationFrame = function(e) {
            if (n) try {
                return t[n](e);
            } catch (r) {}
            return t.setTimeout(e, 17);
        }, e.Element.cancelAnimationFrame = function(e) {
            return a ? t[a](e) : r;
        };
    }(), +function() {
        function t(a) {
            var n = a.__resizeTriggers__, e = n.firstElementChild, t = n.lastElementChild, r = e.firstElementChild;
            t.scrollLeft = t.scrollWidth, t.scrollTop = t.scrollHeight, r.style.width = e.offsetWidth + 1 + "px", 
            r.style.height = e.offsetHeight + 1 + "px", e.scrollLeft = e.scrollWidth, e.scrollTop = e.scrollHeight;
        }
        function n(e) {
            return e.offsetWidth != e.__resizeLast__.width || e.offsetHeight != e.__resizeLast__.height;
        }
        function r(a) {
            var r = this;
            t(this), this.__resizeRAF__ && e.Element.cancelAnimationFrame(this.__resizeRAF__), 
            this.__resizeRAF__ = e.Element.requestAnimationFrame(function() {
                n(r) && (r.__resizeLast__.width = r.offsetWidth, r.__resizeLast__.height = r.offsetHeight, 
                r.__resizeListeners__.forEach(function(e) {
                    e.call(r, a);
                }));
            });
        }
        e.Element.addResizeListener = function(n, a) {
            n.attachEvent ? n.attachEvent("onresize", a) : (n.__resizeTriggers__ || ("static" == (s || i).getComputedStyle(n, null).position && (n.style.position = "relative"), 
            n.__resizeLast__ = {}, n.__resizeListeners__ = [], (n.__resizeTriggers__ = e.Element.document.createElement("div")).className = "resize-triggers", 
            n.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>', 
            n.appendChild(n.__resizeTriggers__), t(n), n.addEventListener("scroll", r, !0), 
            n.__resizeTriggers__.addEventListener("animationstart", function(e) {
                "resizeanim" == e.animationName && t(n);
            })), n.__resizeListeners__.push(a));
        };
    }(), e.CSS = '@-webkit-keyframes resizeanim{0%{opacity:0;}100%{opacity:0;}}@keyframes resizeanim{0%{opacity:0;}100%{opacity:0;}}.jmod-na .resize-triggers{-webkit-animation:1ms resizeanim;animation:1ms resizeanim;visibility:hidden;opacity:0;}.jmod-na .resize-triggers,.jmod-na .resize-triggers > div,.jmod-na .contract-trigger:before{content:" ";display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;}.jmod-na .resize-triggers > div{background:#eee;overflow:auto;}.jmod-na .contract-trigger:before{width:200%;height:200%;}';
    var m = new function() {
        var e = this, n = 'font-family:"Sansation","Open Sans",Arial;', t = "font-size:175%;font-weight:300;" + n, r = "repeating-linear-gradient(-45deg, red, red 5px, transparent 5px, transparent 10px);background-size:auto 75% 100%, 0px 0px;";
        e.time = "font-weight:bold;font-size:120%;color:red;", e.stchange = "font-weight:bold;font-size:130%;color:blue;", 
        e.iconStyle = 'font-size:1.75em;background-color: transparent;background-image:url("http://myuserjs.org/img/favicon/favicon.png");background-clip: border-box;background-position:left center;background-size:auto 75%;background-repeat: no-repeat;letter-spacing: 20px;white-space: pre;display: run-in;', 
        e.logDefaultStyle = "display: run-in;", e.logHeaderStyle = t, e.logTitleStyle = "color:#000;font-size:125%;", 
        e.logTextStyle = "font-weight:bold;font-size:120%;color:#000;", e.infoDefaultStyle = "display: run-in;", 
        e.infoHeaderStyle = t, e.infoTitleStyle = "color:#000;font-size:125%;", e.infoTextStyle = "font-weight:bold;font-size:120%;color:blue;", 
        e.warningDefaultStyle = "display: run-in;", e.warningHeaderStyle = t, e.warningTitleStyle = "color:#000;font-size:125%;", 
        e.warningTextStyle = "font-weight:bold;font-size:120%;color:red;", e.errorDefaultStyle = "display: run-in;", 
        e.errorHeaderStyle = t + "color:red;", e.errorTitleStyle = "color:#000;font-size:125%;", 
        e.errorLineStyle = "color:blue;";
    }();
    +function() {
        function o(e) {
            return t !== typeof e && t !== typeof e.timeStamp ? !0 : !1;
        }
        function f(e) {
            return "console" == N(e) ? !0 : t === typeof e || o(e) || t !== typeof e.dirxml || t === typeof e.trace ? !1 : !0;
        }
        function b(e) {
            return t === typeof e || o(e) || f(e) || t !== typeof e.dirxml || t !== typeof e.exception ? !1 : !0;
        }
        function p(e) {
            return e(s.console) ? s.console : e(c) ? c : e(this.console) ? this.console : e(i.console) ? i.console : e(i.window.console) ? i.window.console : t != typeof Console && e(Console) ? Console : e(this.Console) ? this.Console : e(s.Console) ? s.Console : e(i.Console) ? i.Console : e(i.window.Console) ? i.window.Console : r;
        }
        function v() {
            return p(o);
        }
        function E() {
            return p(b);
        }
        function _() {
            return p(f);
        }
        function M(e) {
            return -1 == n("API.log.disabled").indexOf(e) && n("API.log.verbosity_level") > 1;
        }
        var a, y = {
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
        }, g = [ [ "Error", "ERROR" ], [ "logError", "ERROR" ], [ "Exception", "EXCEPTION" ], [ "Warning", "WARNING" ], [ "Info", "INFO" ], [ "Log", "LOG" ], [ "Debug", "DEBUG" ] ], l = [ "assert", "clear", "count", "dir", "dirxml", "group", "groupCollapsed", "groupEnd", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace" ], u = [ "Debug", "Log", "Info", "Warning", "logError", "Exception" ];
        for (e.isFormatted = function(t, e) {
            return -1 != [ "debug", "log", "info", "warn", "error", "exception" ].indexOf(t) && "string" == typeof e && /(?:\%s|\%c|\%o|\%d|\%f|\%\.\df|\%i)/.test(e);
        }, e.log = h.log = {
            OUTPUT_TYPES: y,
            fb: r,
            c2: r,
            wc: r,
            fnList: [].concat(u, l),
            updateFB: function(e) {
                o(e) && (n("API.log.debug") && c.info("jMod.API.log - Firebug Object: ", e), this.fb = e);
            },
            updateC2: function(e) {
                b(e) && (n("API.log.debug") && c.info("jMod.API.log - Console2 Object: ", e), this.c2 = e);
            },
            updateWC: function(e) {
                f(e) && (n("API.log.debug") && c.info("jMod.API.log - Web Console Object: ", e), 
                this.wc = e);
            },
            UpdateAll: function() {
                this.updateFB(v()), this.updateC2(E()), this.updateWC(_());
            },
            ScopedConsoleCommand: function(g, b) {
                var p = 0, r, a, e = arguments, u = [ "WebConsole", "Firebug" ], h = {
                    Firebug: this.fb,
                    WebConsole: this.wc
                };
                for (-1 == [ "profile", "profileEnd", "error" ].indexOf(g) && n.API.log.WebConsole || (u = [ "Firebug", "WebConsole" ]); p < u.length; p++) if (r = h[u[p]], 
                a = r[g], t != typeof r && t != typeof a) try {
                    if (r === this.fb) {
                        if (c.log("is fb"), !r._apply) {
                            var m = function(e, t) {
                                if (this && this.log && this[e]) try {
                                    this[e].apply(this, t);
                                } catch (n) {
                                    c.log("fb _apply err", n);
                                } else c.log("no this", this, e);
                            };
                            this.fb._apply = i !== s ? lt(m.bind(this.fb), i, {
                                allowCallbacks: !0,
                                allowCrossOriginArguments: !0
                            }) : m.bind(this.fb);
                        }
                        var l, o;
                        try {
                            l = d.call(arguments, 1);
                        } catch (f) {
                            c.log("tmp error", f), l = arguments;
                        }
                        try {
                            o = R(l, i, {
                                cloneFunctions: !0,
                                wrapReflectors: !0
                            }, !0);
                        } catch (f) {
                            c.log("tmp2 error", f), o = l;
                        }
                        try {
                            return c.log("_apply input", N(o), o), this.fb._apply.call(this.fb, g, o);
                        } catch (f) {
                            c.log("_apply error", f);
                        }
                    }
                    switch (e.length) {
                      case 1:
                        return a.call(r);

                      case 2:
                        return a.call(r, e[1]);

                      case 3:
                        return a.call(r, e[1], e[2]);

                      case 4:
                        return a.call(r, e[1], e[2], e[3]);

                      case 5:
                        return a.call(r, e[1], e[2], e[3], e[4]);

                      case 6:
                        return a.call(r, e[1], e[2], e[3], e[4], e[5]);

                      case 7:
                        return a.call(r, e[1], e[2], e[3], e[4], e[5], e[6]);

                      case 8:
                        return a.call(r, e[1], e[2], e[3], e[4], e[5], e[6], e[7]);

                      case 9:
                        return a.call(r, e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]);

                      case 10:
                        return a.call(r, e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9]);

                      case 11:
                        return a.call(r, e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10]);

                      case 12:
                        return a.call(r, e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11]);

                      case 13:
                        return a.call(r, e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12]);

                      case 14:
                        return a.call(r, e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13]);

                      case 15:
                        return a.call(r, e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14]);

                      case 16:
                        return a.call(r, e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]);

                      case 17:
                        return a.call(r, e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15], e[16]);

                      case 18:
                        return a.call(r, e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15], e[16], e[17]);

                      default:
                        return !1;
                    }
                    return !0;
                } catch (y) {
                    c.log("log error", y);
                }
                return !1;
            },
            ConsoleCommand: function(a, p) {
                try {
                    var o = 0, e, s = [ "WebConsole", "Firebug" ], l = d.call(arguments, 1), r = {
                        Firebug: this.fb,
                        WebConsole: this.wc
                    }, u = R(l, i, {
                        cloneFunctions: !0,
                        wrapReflectors: !0
                    });
                    for (-1 == [ "profile", "profileEnd", "error" ].indexOf(a) && n.API.log.WebConsole || (s = [ "Firebug", "WebConsole" ]); o < s.length; o++) if (e = s[o], 
                    null != r[e] && typeof r[e][a] !== t && n.API.log[e]) {
                        try {
                            return r[e][a].apply(r[e], l);
                        } catch (f) {}
                        try {
                            return r[e][a].apply(r[e], u);
                        } catch (f) {}
                    }
                } catch (f) {
                    c.error(f);
                }
                return !1;
            },
            outputMessage: function(e, t) {
                e.level <= n("API.log.verbosity_level") && this.ConsoleCommand.apply(this, [ e.value ].concat(d.call(arguments, 1)));
            },
            fmt: m
        }, a = 0; a < g.length; a++) h.log[g[a][0]] = function(e) {
            return function() {
                return this.outputMessage.apply(this, [ y[e] ].concat(d.call(arguments)));
            }.bind(h.log);
        }(g[a][1]);
        for (a = 0; a < l.length; a++) h.log[l[a]] = function(e) {
            return function() {
                return M(e) ? this.ConsoleCommand.apply(this, [ e ].concat(d.call(arguments))) : r;
            }.bind(h.log);
        }(l[a]);
        for (a = 0; a < u.length; a++) e[u[a]] = e.log[u[a]].bind(h.log);
        h.logFormatBuilder = function() {
            this.args = [];
            var e = function(e, a, o) {
                var i = t === typeof e, s = typeof a;
                typeof a === t && (a = typeof e);
                var n;
                switch (a) {
                  case "d":
                  case "%d":
                    n = "%d";
                    break;

                  case "i":
                  case "%i":
                    n = "%i";
                    break;

                  case "f":
                  case "%f":
                    n = "%.2f";
                    break;

                  case "number":
                    parseInt(e) === e && e === +e ? (n = "%d", e = parseInt(e)) : (n = "%.2f", e = parseFloat(e));
                    break;

                  case "s":
                  case "%s":
                    "\n" == e || " \n" == e ? (n = " \n", e = r, o = r, i = !1) : n = "%s";
                    break;

                  case "string":
                    n = e, e = r, i = !1;
                    break;

                  case "o":
                  case "%o":
                    n = "%o";
                    break;

                  case "object":
                  default:
                    n = s == t && t == typeof o ? "" : "%o";
                }
                this.args.push({
                    valueIsUndefined: i,
                    value: e,
                    fmtString: n,
                    style: o
                });
            };
            this.add = function() {
                var t = 0, n = arguments[0];
                if (1 == arguments.length && "array" == N(n)) for (;t < n.length; t++) e.apply(this, n[t]); else e.apply(this, d.call(arguments));
            }, this.build = function() {
                for (var n = "", t = [], e = 0; e < this.args.length; e++) n += (r !== this.args[e].style ? "%c" : "") + this.args[e].fmtString, 
                r !== this.args[e].style && t.push("" != this.args[e].style ? this.args[e].style : " "), 
                (r !== this.args[e].value || this.args[e].valueIsUndefined) && t.push(this.args[e].value);
                return [ n ].concat(t);
            }, arguments.length > 0 && this.add.apply(this, arguments);
        }, e.log.UpdateAll();
    }();
    var _ = function() {
        var o = 3, n = arguments[0], i = arguments[1], s;
        try {
            s = arguments[2];
        } catch (c) {}
        n && n instanceof Error || (s = i, i = n, n = r, o = 2);
        for (var a = m.errorDefaultStyle, l = new h.logFormatBuilder([ [ "  ", "%s", a + m.iconStyle ], [ "jMod", "string", a + m.errorHeaderStyle ], [ " - ", "string", a ], [ i || " ", "%s", a + m.errorTitleStyle ], [ " \n", "string" ], [ s || "", "%s", a + "color:red;" ] ]); o < arguments.length; o++) l.add([ [ " \n", "string" ], [ arguments[o], "string" == typeof arguments[o] ? "string" : "object", "color:red;" ] ]);
        typeof n != t && null != n && l.add([ [ " \n", "string" ], [ n.message + " ", "%s", a + "color:red;" ], [ n.lineNumber, "%s", a + m.errorLineStyle + "color:red;" ], [ " \n", "string", " " ], [ n && n.err ? n.err : n, "%0", "color:red;" ] ]);
        try {
            e.logError.apply(e.log, l.build());
        } catch (n) {}
    }, G = function(i, s) {
        if (!(e.log.OUTPUT_TYPES.WARNING.level > n("API.log.verbosity_level"))) {
            var a = 2, r = m.warningDefaultStyle, o = new h.logFormatBuilder([ [ "  ", "%s", r + m.iconStyle ], [ "jMod Warning", "string", r + m.warningHeaderStyle ] ]);
            for (o.add(t !== typeof s ? [ [ " - ", "string", r ], [ i || " ", "%s", r + m.warningTitleStyle ], [ " \n", "string" ], [ s || "", "%s", r + m.warningTextStyle ] ] : [ [ " \n", "string" ], [ i || "", "%s", r + m.warningTextStyle ] ]), 
            arguments.length > 2 && o.add(" \n", "string"), a; a < arguments.length; a++) o.add(arguments[a]);
            e.Warning.apply(e.log, o.build());
        }
    }, xt = function(i, s) {
        if (!(e.log.OUTPUT_TYPES.INFO.level > n("API.log.verbosity_level"))) {
            var a = 2, r = m.infoDefaultStyle, o = new h.logFormatBuilder([ [ "  ", "%s", r + m.iconStyle ], [ "jMod", "string", r + m.infoHeaderStyle ] ]);
            for (o.add(t !== typeof s ? [ [ " - ", "string", r ], [ i || " ", "%s", r + m.infoTitleStyle ], [ " \n", "string" ], [ s || "", "%s", r + m.infoTextStyle ] ] : [ [ " \n", "string" ], [ i || "", "%s", r + m.infoTextStyle ] ]), 
            arguments.length > 2 && o.add(" \n", "string"), a; a < arguments.length; a++) o.add(arguments[a]);
            e.Info.apply(e.log, o.build());
        }
    }, pn = function(i, s) {
        if (!(e.log.OUTPUT_TYPES.LOG.level > n("API.log.verbosity_level"))) {
            var a = 2, r = m.infoDefaultStyle, o = new h.logFormatBuilder([ [ "  ", "%s", r + m.iconStyle ], [ "jMod", "string", r + m.logHeaderStyle ] ]);
            for (o.add(t !== typeof s ? [ [ " - ", "string", r ], [ i || " ", "%s", r + m.logTitleStyle ], [ " \n", "string" ], [ s || "", "%s", r + m.logTextStyle ] ] : [ [ " \n", "string" ], [ i || "", "%s", r + m.logTextStyle ] ]), 
            arguments.length > 2 && o.add(" \n", "string"), a; a < arguments.length; a++) o.add(arguments[a]);
            e.Log.apply(e.log, o.build());
        }
    }, D = function(r, a, o) {
        if (!(e.log.OUTPUT_TYPES.INFO.level > n("API.log.verbosity_level"))) {
            var i = (a || "") + e.timeElapsed.toFixed(2) + "ms" + (o || ""), t = m.infoDefaultStyle, s = new h.logFormatBuilder([ [ "  ", "%s", t + m.iconStyle ], [ "jMod", "string", t + m.infoHeaderStyle ], [ " - ", "string", t ], [ r || " ", "%s", t + m.infoTitleStyle ], [ " ", "string" ], [ i, "%s", t + m.time ] ]);
            e.Info.apply(e.log, s.build());
        }
    };
    e.log.Info("Loading jMod API v" + e.version + " " + e.build_type + (e.debug ? " (debug enabled)" : "") + " - " + new Date(parseInt(e.build_time))), 
    e.debug && (D("jMod Init Start Time"), e.log.group("jMod Start"), n.script.script_info && xt("ScriptInfo.set", "Get Script_Info Successful!!", n.script.script_info), 
    e.log.group("jMod Initialize"), T.el && e.Info("CurrentRunningScript", T)), e.Events = {
        e: {},
        fired: {},
        addEvent: function(n, r) {
            this.e[n] = {
                recordEvent: typeof r !== t ? r : !0,
                listeners: []
            }, Object.defineProperty(e, n, new function(n) {
                return {
                    set: function(t) {
                        e.Events.addListener(n, t);
                    },
                    get: function() {
                        return typeof e.Events.fired[n] !== t;
                    },
                    enumerable: !1
                };
            }(n));
        },
        addListener: function(e, r, n) {
            this.e[e].listeners.push(r), n = typeof n !== t ? n : !0, n && typeof this.fired[e] !== t && typeof this.fired[e].args !== t && r.apply(this.fired[e]._this, this.fired[e].args);
        },
        fire: function(e, n) {
            if (typeof this.e[e] !== t) {
                typeof this.fired[e] === t && (this.fired[e] = {
                    count: 0,
                    args: r,
                    _this: null
                });
                var a, o = null;
                "object" == typeof n && typeof n._this !== t && typeof n.args !== t ? (o = n._this, 
                a = n.args) : a = d.call(arguments, 1), this.e[e].recordEvent && (this.fired[e].args = a, 
                this.fired[e]._this = o);
                for (var i = []; P = this.e[e].listeners.pop(); ) P.apply(o, a) || i.push(P);
                this.e[e].listeners = i, this.fired[e].count++;
            }
        }
    }, e.Events.addEvent("onDOMReady"), e.Events.addEvent("onReady"), e.Events.addEvent("onPageReady"), 
    e.Events.addEvent("onPerformanceReady"), e.Events.addEvent("load"), e.Events.addEvent("DOMContentLoaded"), 
    e.Events.addEvent("onreadystatechange"), e.Events.addEvent("afterscriptexecute", !1), 
    e.Events.addEvent("beforescriptexecute", !1);
    var yt = function(n) {
        var e = {};
        this.events = n || [], this.add = function(n, r, a) {
            -1 == this.events.indexOf(r) && this.events.push(r), typeof e[n] === t && (e[n] = {}), 
            typeof e[n][r] === t && (e[n][r] = []), e[n][r].push(a);
        }, this.addAll = function(t, n) {
            for (var e in this.events) "function" == typeof t[this.events[e]] && this.add(n, this.events[e], t[this.events[e]]);
        }, this.getAll = function(t, n) {
            return n ? e[t] && e[t][n] ? e[t][n] : r : e[t];
        }, this.fire = function(s, r, l, a) {
            var n, i, o, r = e[r || "0"];
            n = "array" == N(a) ? a : [ a ], arguments.length > 4 && (n = n.concat(d.call(arguments, 4)));
            try {
                if (typeof r !== t && typeof (o = r[s]) !== t) for (i in o) if (!1 === o[i].apply(l || null, n || [])) return c.log("fire canceled"), 
                !1;
            } catch (u) {
                _(u, "jMod.EventsClass.fire");
            }
        };
    };
    e.Observer = function() {
        this.filters = [], this.addFilter = function(e, t, n) {
            this.filters.push({
                callback: e,
                data: t,
                fireOnce: !0 === n ? !0 : !1
            });
        }, this.filterMutation = function(o) {
            var t, a, i, n, r = 0;
            for (r; r < this.filters.length; r++) if (t = this.filters[r].data, a = !1, !t.type || ("string" == typeof t.type && (t.type = [ t.type ]), 
            -1 != t.type.indexOf(o.type))) {
                if ("object" == typeof t.target) {
                    if (t.target.hasClass) {
                        for ("string" == typeof t.target.hasClass && (t.target.hasClass = [ t.target.hasClass ]), 
                        n = 0; n < t.target.hasClass.length; n++) if (!C(o.target, t.target.hasClass[n])) {
                            a = !0;
                            break;
                        }
                        if (a) continue;
                    }
                    if (t.target.hasChildren) {
                        for ("string" == typeof t.target.hasChildren && (t.target.hasChildren = [ t.target.hasChildren ]), 
                        n = 0; n < t.target.hasChildren.length; n++) if (i = e.$$(t.target.hasChildren[n], o.target), 
                        !i || 0 == i.length) {
                            a = !0;
                            break;
                        }
                        if (a) continue;
                    }
                }
                if (this.filters[r].callback(o, this), this.filters[r].fireOnce) return;
            }
        }, this.MutationObserver = new MutationObserver(function(t) {
            for (var e = 0; e < t.length; e++) this.filterMutation(t[e]);
        }), this.observe = function(e, t) {
            this.MutationObserver.observe(e, t || {
                childList: !0,
                attributes: !0,
                characterData: !0,
                subtree: !0
            });
        }, this.disconnect = function() {
            this.MutationObserver.disconnect();
        };
    }, e.FileSelector = function(r) {
        var n = this;
        n.events = {
            change: []
        }, r.onChange && n.events.change.push(r.onChange), n.onChange = function(r) {
            for (var t = 0; t < n.events.change.length; t++) n.events.change[t].call(this || n || e, r, n.files(), n.value());
        }, n.click = function(e, r) {
            return pt(n.buttonTriggerElement, t !== typeof e ? e : !0, t !== typeof r ? r : !0);
        }, n.files = function() {
            return n.inputElement.files;
        }, n.value = function() {
            return n.inputElement.value;
        };
        var a = {
            type: "input",
            attributes: {
                type: "file",
                multiple: r.multiple ? !0 : !1
            },
            style: {
                position: "absolute",
                opacity: "0",
                "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)",
                filter: "alpha(opacity=0)",
                width: "0"
            },
            EventListeners: {
                change: n.onChange
            }
        };
        r.defaultValue && (a.defaultValue = r.defaultValue), r.accept && (a.attributes.accept = r.accept), 
        n.inputElement = g(a);
        var o = {
            type: "button",
            EventListeners: {
                click: function(t) {
                    c.log("Button click triggered");
                    var e = this.previousSibling;
                    return e.focus(), pt(e), z(t), !1;
                }
            }
        };
        "object" == typeof r.button && (r.button.type && delete r.button.type, r.button.EventListeners && r.button.EventListeners.click && delete r.button.EventListeners.click, 
        o = e.extend(!0, o, r.button)), n.buttonTriggerElement = g(o);
        var i = e.extend(!0, r.form || {}, {
            type: "form",
            innerHTML: [ n.inputElement, n.buttonTriggerElement ]
        });
        n.formElement = g(i), e.FileSelector.FileSelectorForms.push(n.formElement);
    }, e.FileSelector.FileSelectorForms = [], e.FileSelector.FileReadSupport = function() {
        return s.File && s.FileReader;
    }, e.FileSelector.BlobSupport = function() {
        return s.File && s.Blob;
    }, e.FileSelector.ReadFileAsText = function(t, n, o) {
        if (!e.FileSelector.FileReadSupport) return e.debug && c.log("Error! No Support For File Reading!"), 
        !1;
        var a = new FileReader();
        return t ? (a.onload = function(r) {
            return n.call(this || e, r, r.target.result, t);
        }, a.onerror = function(a) {
            return e.debug && c.log("Error reading file", t), (o || n)(a, r, t);
        }, a.readAsText(t), !0) : (e.debug && c.log("Error reading file", t), (o || n)(mt, r, t), 
        !1);
    }, e.FileSelector.ReadFileAsURL = function(t, n, o) {
        if (!e.FileSelector.FileReadSupport) return e.debug && c.log("Error! No Support For File Reading!"), 
        !1;
        var a = new FileReader();
        return t ? (a.onload = function(r) {
            return n.call(this || e, r, r.target.result, t);
        }, a.onerror = function(a) {
            return e.debug && c.log("Error reading file", t), (o || n)(a, r, t);
        }, a.readAsDataURL(t), !0) : (e.debug && c.log("Error reading file", t), (o || n)(mt, r, t), 
        !1);
    }, e.FileSelector.ReadFileAsJSON = function(a, t, n) {
        return e.FileSelector.ReadFileAsText(a, function(o, i, a) {
            if (!i || "" == i) return e.debug && c.log("Error! JSON file is empty!", a), (n || t)(o, r, a);
            try {
                return t(o, JSON.parse(i), a);
            } catch (s) {
                return e.debug && c.log("Error! Cannot parse json file!", s, a), (n || t)(o, r, a);
            }
        });
    };
    var Ut = e.API.addStyle = function(n) {
        if (n && "" != n) {
            if (typeof GM_addStyle !== t) return GM_addStyle(n) || !0;
            var r, a = e.Element.head;
            if (a) {
                r = e.Element.document.createElement("style");
                try {
                    r.innerHTML = n;
                } catch (o) {
                    r.innerText = n;
                }
                return r.type = "text/css", a.appendChild(r);
            }
            e.debug && G("jMod.API.addStyle", "Could not add css", n);
        }
    };
    e.API.addStylesheet = function(n) {
        var t, a = e.Element.head;
        return a ? (t = e.Element.document.createElement("link"), t.setAttribute("rel", "stylesheet"), 
        t.href = n, a.appendChild(t)) : (e.debug && G("jMod.API.addStylesheet", "Could not add stylesheet", n), 
        r);
    }, e.API.importStylesheet = function(t) {
        e.CSS = "@import url(" + t + ");\n";
    }, e.API.addScript = function(a, i, s, l, c, u) {
        var r, o = e.Element.head, n;
        if (n = "object" == typeof a ? a : {
            js: a,
            src: i,
            id: s,
            type: l,
            async: c,
            defer: u
        }, o) {
            if (r = e.Element.document.createElement("script"), typeof n.id !== t) try {
                r.id = n.id;
            } catch (f) {}
            if (typeof n.async !== t && (r.async = n.async), typeof n.defer !== t && (r.defer = n.defer), 
            typeof n.onload !== t && (r.onload = n.onload), typeof n.onerror !== t && (r.onerror = n.onerror), 
            r.type = n.type || "text/javascript", typeof n.js != t && null != n.js && "" != n.js) try {
                r.innerHTML = n.js;
            } catch (f) {
                r.innerText = n.js;
            }
            if (typeof n.src != t && null != n.src && "" != n.src) try {
                r.src = n.src;
            } catch (f) {}
            try {
                return o.appendChild(r);
            } catch (f) {}
        }
        return null;
    }, e.API.contentEval = function(t) {
        "function" == typeof t && (t = "(" + t + ")();");
        var a = e.Element.document, r = e.Element.head, n = a.createElement("script");
        n.setAttribute("type", "application/javascript"), n.textContent = t, r.appendChild(n), 
        r.removeChild(n);
    }, +function() {
        function a(t) {
            0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return t = decodeURIComponent(t.replace(/\+/g, " ")), e.API.Cookie.defaults.JSON ? JSON.parse(t) : t;
            } catch (n) {}
        }
        function n(n, e) {
            var t = a(n);
            return "function" == typeof e ? e(t) : t;
        }
        var o = function(e) {
            return "Invalid Date" !== new Date(e) && !isNaN(new Date(e));
        };
        e.API.Cookie = function(s, c, a) {
            var i, d, p, o, g, u, f = e.Element.document, m = s ? r : {}, h = e.API.Cookie.defaults;
            if (!f) return G("jMod.API.Cookie", "No document available"), r;
            if (arguments.length > 1 && "function" != typeof c) {
                switch (a = e.extend({}, h, a), e.RealTypeOf(a.expires)) {
                  case "number":
                    u = a.expires, i = a.expires = new Date(), i.setTime(+i + 864e5 * u);
                    break;

                  case "string":
                    try {
                        a.expires = Date.parse(a.expires);
                    } catch (y) {
                        return _(y, "jMod.API.Cookie", "Invalid Exp Date"), r;
                    }
                    break;

                  case "invaliddate":
                    return _(y, "jMod.API.Cookie", "Invalid Exp Date"), r;

                  case "date":
                    break;

                  default:
                    a.expires = h.expires;
                }
                if (h.JSON) try {
                    o = encodeURIComponent(JSON.stringify(c));
                } catch (y) {
                    o = r;
                }
                return t == typeof o && (o = encodeURIComponent(c + "")), f.cookie = encodeURIComponent(s) + "=" + o + (a.expires ? "; expires=" + a.expires.toUTCString() : "") + (a.path ? "; path=" + a.path : "") + (a.domain ? "; domain=" + a.domain : "") + (a.secure ? "; secure" : "");
            }
            for (g = f.cookie ? f.cookie.split("; ") : [], i = 0, l = g.length; i < l; i++) {
                if (d = g[i].split("="), p = decodeURIComponent(d.shift()), o = d.join("="), s && s === p) {
                    m = n(o, c);
                    break;
                }
                if (!s) {
                    var u = n(o) || o;
                    u && (m[p] = u);
                }
            }
            return m;
        }, e.API.Cookie.defaults = {
            expires: Date.parse("Jan 1, 2020"),
            JSON: !0
        }, e.API.Cookie.remove = function(t, n) {
            return e.API.Cookie === r ? !1 : (e.API.Cookie(t, "", e.extend({}, n || {}, {
                expires: -1
            })), !e.API.Cookie(t));
        };
    }(), e.API.GM_Storage = {
        available: function() {
            return typeof GM_getValue !== t && typeof GM_setValue !== t && typeof GM_deleteValue !== t;
        },
        getValue: function(t, e) {
            return this.available() ? GM_getValue(n("API.Storage.prefix") + t, e) : e;
        },
        setValue: function(e, t) {
            return this.available() ? GM_setValue(n("API.Storage.prefix") + e, t) : r;
        },
        setJSON: function(n, e) {
            var t;
            try {
                t = JSON.stringify(e);
            } catch (r) {
                _(r, "GM_Storage.setJSON", "Cannot stringify value!");
            }
            try {
                return this.setValue(n, t || e);
            } catch (r) {}
        },
        getJSON: function(n, t) {
            var e = this.getValue(n, t);
            try {
                if ("string" == typeof e) return JSON.parse(e);
            } catch (r) {
                _(r, "GM_Storage.setJSON", "Error parsing value!");
            }
            return e || t;
        },
        deleteValue: function(e) {
            return this.available() ? GM_deleteValue(n("API.Storage.prefix") + e) : r;
        }
    }, e.API.localStorage = {
        available: function() {
            try {
                var e = this.stor;
                if (t !== typeof e && null != e && e.getItem && e.setItem) return !0;
            } catch (n) {}
            return !1;
        },
        getValue: function(r, e) {
            if (!this.available()) return e;
            try {
                var t = this.stor.getItem(n("API.Storage.prefix") + r);
                return null !== t ? t : e;
            } catch (a) {}
            return e;
        },
        setValue: function(e, t) {
            if (this.available()) try {
                return this.stor.setItem(n("API.Storage.prefix") + e, t);
            } catch (r) {}
        },
        setJSON: function(n, e) {
            if (this.available()) {
                var t;
                try {
                    t = JSON.stringify(e);
                } catch (r) {
                    _(r, "localStorage.setJSON", "Cannot stringify value!");
                }
                try {
                    return this.setValue(n, t || e);
                } catch (r) {}
            }
        },
        getJSON: function(n, t) {
            if (!this.available()) return t;
            var e;
            try {
                e = this.getValue(n, t);
            } catch (r) {}
            try {
                if ("string" == typeof e) return JSON.parse(e);
            } catch (r) {
                _(r, "localStorage.setJSON", "Error parsing value!");
            }
            return e || t;
        },
        deleteValue: function(e) {
            if (this.available()) try {
                return this.stor.removeItem(n("API.Storage.prefix") + e);
            } catch (t) {}
        }
    }, Object.defineProperty(e.API.localStorage, "stor", {
        get: function() {
            try {
                return s.localStorage && null != s.localStorage ? s.localStorage : t !== typeof localStorage && null != localStorage ? localStorage : i.localStorage && null != i.localStorage ? i.localStorage : r;
            } catch (e) {
                G("jMod.API.localStorage", "localStorage unavailable!", e.message);
            }
        },
        enumerable: !1
    }), e.API.sessionStorage = {
        available: function() {
            try {
                var e = this.stor;
                if (t !== typeof e && null != e && e.getItem && e.setItem) return !0;
            } catch (n) {}
            return !1;
        },
        getValue: function(r, e) {
            if (!this.available()) return e;
            try {
                var t = this.stor.getItem(n("API.Storage.prefix") + r);
                return null !== t ? t : e;
            } catch (a) {}
            return e;
        },
        setValue: function(e, t) {
            if (this.available()) try {
                return this.stor.setItem(n("API.Storage.prefix") + e, t);
            } catch (r) {}
        },
        setJSON: function(n, e) {
            if (this.available()) {
                var t;
                try {
                    t = JSON.stringify(e);
                } catch (r) {
                    _(r, "sessionStorage.setJSON", "Cannot stringify value!");
                }
                try {
                    return this.setValue(n, t || e);
                } catch (r) {}
            }
        },
        getJSON: function(n, t) {
            if (!this.available()) return t;
            var e;
            try {
                e = this.getValue(n, t);
            } catch (r) {}
            try {
                if ("string" == typeof e) return JSON.parse(e);
            } catch (r) {
                _(r, "sessionStorage.setJSON", "Error parsing value!");
            }
            return e || t;
        },
        deleteValue: function(e) {
            if (this.available()) try {
                return this.stor.removeItem(n("API.Storage.prefix") + e);
            } catch (t) {}
        }
    }, Object.defineProperty(e.API.sessionStorage, "stor", {
        get: function() {
            try {
                return s.localStorage && null != s.localStorage ? s.localStorage : t !== typeof localStorage && null != localStorage ? localStorage : i.localStorage && null != i.localStorage ? i.localStorage : r;
            } catch (e) {
                G("jMod.API.sessionStorage", "sessionStorage unavailable!", e.message);
            }
        },
        enumerable: !1
    }), +function() {
        var t = function() {
            var e = [], t = n("API.Storage.engine"), r = "GM_Storage", a = "localStorage", o = "sessionStorage";
            try {
                try {
                    h[t] && h[t].available() && (e = [ t ]);
                } catch (i) {}
                -1 == e.indexOf(r) && h[r].available() && e.push(r), -1 == e.indexOf(a) && h[a].available() && e.push(a), 
                -1 == e.indexOf(o) && h[o].available() && e.push(o);
            } catch (i) {}
            return e;
        };
        e.getValue = function(a, r) {
            for (var e = 0, n = t(); e < n.length; e++) try {
                return h[n[e]].getValue.apply(h[n[e]], arguments);
            } catch (o) {}
            return r;
        }, e.setValue = function(r) {
            for (var e = 0, n = t(); e < n.length; e++) try {
                return h[n[e]].setValue.apply(h[n[e]], arguments);
            } catch (a) {}
        }, e.getJSON = function(a, r) {
            for (var e = 0, n = t(); e < n.length; e++) try {
                return h[n[e]].getJSON.apply(h[n[e]], arguments);
            } catch (o) {}
            return r;
        }, e.setJSON = function(r) {
            for (var e = 0, n = t(); e < n.length; e++) try {
                return h[n[e]].setJSON.apply(h[n[e]], arguments);
            } catch (a) {}
        }, e.deleteValue = function(n) {
            var e = 0;
            for (storageEngines = t(); e < storageEngines.length; e++) try {
                return h[storageEngines[e]].deleteValue.apply(h[storageEngines[e]], arguments);
            } catch (r) {}
        };
    }(), e.API.getRemoteImageAsURL = function(a, e, n) {
        if (t != typeof GM_xmlhttpRequest) {
            var o = /Content-Type:\s*([^\s]+)/i;
            return "function" == typeof e && t === typeof n && (n = e, e = r), GM_xmlhttpRequest({
                method: "GET",
                url: a,
                overrideMimeType: "text/plain; charset=x-user-defined",
                onload: function(a) {
                    if (t == typeof e || null == e || "" == e) try {
                        var r = o.exec(a.responseHeaders);
                        r && r.length > 1 && (e = r[1].trim());
                    } catch (i) {}
                    n("data:" + (e && "" != e ? e : "image/png") + ";base64," + Jt(a.responseText));
                }
            });
        }
    }, e.API.getResourceText = function(a, n, i) {
        if (t !== typeof GM_getResourceText) try {
            var o = GM_getResourceText(a);
            return n && n(o), o;
        } catch (s) {}
        return i ? e.API.getResourceTextLive(a, n) : r;
    }, e.API.getResourceURL = function(a, n, i) {
        if (t !== typeof GM_getResourceURL) try {
            var o = GM_getResourceURL(a);
            return n && n(o), o;
        } catch (s) {}
        return i ? e.API.getResourceURLLive(a, n) : r;
    }, e.API.getResourceTextLive = function(a, o) {
        if (t != typeof GM_xmlhttpRequest) {
            var e = n("script.script_info.resource");
            return e && t !== typeof e[a] ? GM_xmlhttpRequest({
                method: "GET",
                url: e[a],
                onload: function(e) {
                    o(e.responseText);
                }
            }) : r;
        }
    }, e.API.getResourceURLLive = function(o, i) {
        var a = n("script.script_info.resource");
        return a && t !== typeof a[o] ? e.API.getRemoteImageAsURL(a[o], i) : r;
    }, e.API.addResourceCSS = function(r) {
        if (!e.API.getResourceText(r, function(t) {
            "string" == typeof t && "" != t && (e.CSS = t);
        }, !1)) {
            var a = n("script.script_info.resource");
            a && t !== typeof a[r] && e.API.addStylesheet(a[r]);
        }
    }, e.API.addResourceScript = function(r) {
        if (!e.API.getResourceText(r, function(t) {
            "string" == typeof t && "" != t && e.API.addScript({
                js: t
            });
        }, !1)) {
            var a = n("script.script_info.resource");
            a && t !== typeof a[r] && e.API.addScript({
                src: a[r],
                async: !0,
                defer: !0
            });
        }
    }, e.API.Date = function(t, n) {
        switch (t) {
          case "parseUTC":
          case "parseUTCDate":
            return e.API.Date.parseUTCDate.apply(e.API.Date, d.call(arguments, 1));
        }
    }, Object.defineProperties(e.API.Date, {
        now: {
            get: function() {
                return Date.now();
            }
        }
    }), e.API.Date.parseUTCDate = function(t) {
        if ("string" == typeof t) {
            var e = /^(\d{4})[\-\/](\d{2})[\-\/](\d{2})(?:T|\s)(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z?$/i.exec(t);
            if (e) return new Date(Date.UTC(+e[1], +e[2] - 1, +e[3], +e[4], +e[5], +e[6]));
        } else if ("date" == N(t)) return new Date(t);
        return null;
    }, e.API.Date.getScriptTimeDiff = function(n) {
        var r;
        if ("string" == typeof n ? r = e.API.Date.parseUTCDate(n) : "object" == typeof n && typeof n.scriptUploadTimestamp !== t && (r = e.API.Date.parseUTCDate(n.scriptUploadTimestamp)), 
        !r) return null;
        var a = Date.now(), o = Math.abs(a - r), i = o / 1e3 / 60, s = i / 60, l = s / 24;
        return {
            date: r,
            now: a,
            milliseconds: o,
            minutes: i,
            hours: s,
            days: l
        };
    }, e.jQueryExtensions = {}, +function() {
        function n(t, n) {
            return i.globaljQueryCrossOriginSupportFn || (e.jQueryExtensions._globaljQueryCrossOriginSupportFn = lt(e.jQueryExtensions.CrossOriginSupportTransportFn(t, n), i, {
                defineAs: "globaljQueryCrossOriginSupportFn",
                allowCallbacks: !0,
                allowCrossOriginArguments: !0
            }));
        }
        e.jQueryExtensions.CrossOriginSupportTransportFn = function(n, r) {
            return function(r, a, c) {
                var i = !0;
                try {
                    i = e.Config("jQueryExtensions.CrossOrigin");
                } catch (u) {}
                if (t != typeof GM_xmlhttpRequest && i) {
                    var s = (n || $ || e).extend, o = s(!0, {}, r, a), l = {
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
                        send: function(c, i) {
                            var e = (a.dataType || "").toLowerCase(), n = {
                                method: r.type || "GET",
                                url: r.url,
                                data: s({}, r.data || {}, a.data || {}),
                                headers: c,
                                onload: function(t) {
                                    var n = {
                                        text: t.responseText
                                    }, r = "", a;
                                    try {
                                        r = /Content-Type:\s*([^\s]+)/i.exec(t.responseHeaders)[1];
                                    } catch (o) {}
                                    if ("html" === e || /text\/html/i.test(r)) n.html = t.responseText; else if ("json" === e || "text" !== e && /\/json/i.test(r)) try {
                                        n.json = $.parseJSON(t.responseText);
                                    } catch (o) {} else if ("xml" == e || "text" !== e && /\/xml/i.test(r)) if (t.responseXML) n.xml = t.responseXML; else try {
                                        n.xml = new DOMParser().parseFromString(t.responseText, "text/xml");
                                    } catch (o) {}
                                    i(200, "success", n, t.responseHeaders);
                                },
                                onerror: function(e) {
                                    i(404, "error", {
                                        text: e.responseText
                                    }, e.responseHeaders);
                                }
                            };
                            for (key in l) t != typeof o[key] && (n[l[key]] = o[key]);
                            !1 === o.async && (n.synchronous = !0), GM_xmlhttpRequest(n);
                        },
                        abort: function() {}
                    };
                }
            };
        }, e.jQueryExtensions.addCrossOriginSupport = function(n, r) {
            t != typeof GM_xmlhttpRequest && (n || (n = e.jQuery)) && !0 !== n.jModCrossOriginSupport && (n.ajaxTransport(r || "* text html xml json", e.jQueryExtensions.CrossOriginSupportTransportFn(n, r)), 
            n.extend({
                jModCrossOriginSupport: !0
            }));
        }, e.jQueryExtensions.exportCrossOriginSupport = function(e, r) {
            t != typeof GM_xmlhttpRequest && e && !0 !== e.jModCrossOriginSupport && (e.ajaxTransport(r || "* text html xml json", n(e, r)), 
            e.extend({
                jModCrossOriginSupport: !0
            }));
        };
    }() + function() {
        var n = e.jQueryExtensions.Selectors = function(r, a) {
            if (r) {
                var e;
                if (1 != arguments.length) for (e = 1; e < arguments.length; e++) t != typeof n.ext[arguments[e]] && n.ext[arguments[e]](r); else for (e in n.ext) n[e](r);
            }
        };
        n.ext = {}, n.ext.inView = function(e) {
            e && !e.expr[":"].inView && e.extend(e.expr[":"], {
                inView: function(t) {
                    win = s || i, doc = document || win.document;
                    var n = doc.documentElement.scrollTop || doc.body.scrollTop, r = e(t).offset().top, a = win.innerHeight && win.innerHeight < e(win).height() ? win.innerHeight : e(win).height();
                    return r > n && e(t).height() + r < n + a;
                }
            });
        };
    }() + function() {
        function n(e) {
            if (!e || e.length < 3) return [ e || "" ];
            var t = a.exec(e);
            return t ? [ t[1].trim(), t[2].trim() ] : [ e ];
        }
        var a = /^\s*((?:(?:\:\w+\([^\)]+\))|[^\s\<\>\~\+\|]|[\<\>\~\+\|\^\$\*](?=\=.+\]))+)\s*(.*?)$/;
        e.jQueryExtensions.extendTokenizer = function(r) {
            function a(e) {
                return e.join("|").replace(/\./g, "\\.").replace(/\+/g, "\\+").replace(/\</g, "\\<").replace(/\>/g, "\\>").replace(/\)/g, "\\)").replace(/\(/g, "\\(");
            }
            if ((r || (r = e.jQuery)) && t == typeof r.jModTokenizer) {
                r._oldFindFn = r.find, r.find = function(g, c, e, l) {
                    if (c = c || document || i.document, e = e || [], r.jModTokenizer && r.find.jModTokens.regexTest.test(g)) {
                        var o, d, t, p, m, s, a, f, u, h;
                        for (s = g.split(","), t = 0; t < s.length; t++) if (r.find.jModTokens.regexTest.test(s[t]) && (m = r.find.jModTokens.regex.exec(s[t])[1]) && (p = r.find.jModTokens.tokens[m])) {
                            if (f = s[t].split(m, 2), a = r._oldFindFn(f[0], c), a && a.length > 0) for (o = 0; o < a.length; o++) if (p.find) if (u = n(f[1]), 
                            1 == u.length || "" == u[1]) p.find(f[1], a[o], e, l); else for (h = p.find(u[0], a[o]), 
                            d = 0; d < h.length; d++) r.find(u[1], h[d], e, l); else r.find(f[1], a[o], e, l);
                        } else r._oldFindFn(s[t], c, e, l);
                        return e;
                    }
                    return r._oldFindFn(g, c, e, l);
                };
                for (P in r._oldFindFn) r.find[P] = r._oldFindFn[P];
                var o = ",.";
                return r.find.jModTokens = {
                    tokens: {},
                    tokenOrder: [],
                    sortOrder: function(e, t) {
                        return e.length > t.length ? -1 : e.length < t.length ? 1 : 0;
                    },
                    _regex: null,
                    _regexTest: null,
                    add: function(t, n) {
                        if (-1 == o.indexOf(t)) {
                            var e = r.find.jModTokens;
                            e._regex = null, e._regexTest = null, e.tokens[t] = n, e.tokenOrder.push(t), e.tokenOrder.sort(this.sortOrder);
                        }
                    },
                    remove: function(t) {
                        var e = r.find.jModTokens;
                        e.tokens[t] && (delete e.tokens[t], e._regex = null, e._regexTest = null, e.tokenOrder.splice(e.tokenOrder.indexOf(t), 1), 
                        e.tokenOrder.sort(this.sortOrder));
                    },
                    removeAll: function() {
                        var e = r.find.jModTokens;
                        e.tokens[token] = {}, e.tokenOrder = [], e._regex = null, e._regexTest = null;
                    }
                }, Object.defineProperty(r.find.jModTokens, "regex", {
                    get: function() {
                        if (r.find.jModTokens._regex) return r.find.jModTokens._regex;
                        var e = a(r.find.jModTokens.tokenOrder);
                        return r.find.jModTokens._regex = RegExp("(" + e + ")"), r.find.jModTokens._regex;
                    }
                }), Object.defineProperty(r.find.jModTokens, "regexTest", {
                    get: function() {
                        if (r.find.jModTokens._regexTest) return r.find.jModTokens._regexTest;
                        var e = a(r.find.jModTokens.tokenOrder);
                        return r.find.jModTokens._regexTest = RegExp("(?:^|[^\\.])(" + e + ")(?:[\\s\\.\\#\\w\\*\\:]|$)"), 
                        r.find.jModTokens._regexTest;
                    }
                }), r.extend({
                    jModTokenizer: !0
                }), r;
            }
        }, e.jQueryExtensions.addSiblingTokens = function(n) {
            (n || (n = e.jQuery)) && t != typeof n.find.jModTokens && (n.find.jModTokens.add("++", {
                find: function(a, o, e, i) {
                    e = e || [];
                    var t = 0, r = n(o).siblings(a);
                    if (r) for (;t < r.length; t++) -1 == e.indexOf(r[t]) && e.push(r[t]);
                    return e;
                }
            }), n.find.jModTokens.add("+>", {
                find: function(a, o, e, i) {
                    e = e || [];
                    var t = 0, r = n(o).nextAll(a);
                    if (r) for (;t < r.length; t++) -1 == e.indexOf(r[t]) && e.push(r[t]);
                    return e;
                }
            }), n.find.jModTokens.add("+<", {
                find: function(a, o, e, i) {
                    e = e || [];
                    var t = 0, r = n(o).prevAll(a);
                    if (r) for (;t < r.length; t++) -1 == e.indexOf(r[t]) && e.push(r[t]);
                    return e;
                }
            }));
        }, e.jQueryExtensions.removeTokenizer = function(n) {
            return (n || (n = e.jQuery)) && t != typeof n.jModTokenizer ? (delete n.jModTokenizer, 
            n.find = n._oldFindFn, n._oldFindFn = r, delete n._oldFindFn, n) : r;
        };
    }() + function() {
        function l(e) {
            return e + "px";
        }
        function o(e, t) {
            return function(n) {
                e.draggableListeners[t].push(n);
            };
        }
        function M(e) {
            return {
                top: parseInt(e.offsetTop),
                left: parseInt(e.offsetLeft)
            };
        }
        function k(e) {
            e.draggableListeners = {
                start: [],
                drag: [],
                stop: []
            }, e.whenDragStarts = o(e, "start"), e.whenDragging = o(e, "drag"), e.whenDragStops = o(e, "stop");
        }
        function E(e, o) {
            t = o;
            var r = B(t, "enscroll-track");
            r && j(r, "dragging");
            var n = M(t);
            t.style.top = l(n.top), t.lastXPosition = e.clientX, t.lastYPosition = e.clientY;
            var i = a("start", {
                x: n.left,
                y: n.top,
                el: t,
                mouseEvent: e
            });
            i && _();
        }
        function a(a, o) {
            for (var n = !0, r = t.draggableListeners[a], e = r.length - 1; e >= 0; e--) !1 === r[e](o) && (n = !1);
            return n;
        }
        function _() {
            var t = e.Element.document;
            L(t, "selectstart", d), L(t, "mousemove", m), L(t, "mouseup", f);
        }
        function f(o) {
            var n = e.Element.document;
            gt(n, "selectstart", d), gt(n, "mousemove", m), gt(n, "mouseup", f);
            var i = parseInt(t.style.left, 10), s = parseInt(t.style.top, 10), r = B(t, "enscroll-track");
            r && x(r, "dragging"), a("stop", {
                x: i,
                y: s,
                el: t,
                mouseEvent: o
            });
        }
        function d(e) {
            return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), 
            e.returnValue = !1, z(e), !1;
        }
        function m(e) {
            e.preventDefault && e.preventDefault(), e.returnValue = !1;
            var o = t.style, m = parseInt(o.left, 10), g = parseInt(o.top, 10), p = m + (e.clientX - t.lastXPosition), n = g + (e.clientY - t.lastYPosition), u = B(t, "jModScrollBar");
            if (u) {
                var f = u.parentElement, i = s.getComputedStyle(f), r = parseFloat(i.height), h = parseFloat(i.width), d = s.getComputedStyle(t), c = parseFloat(d.height), y = parseFloat(d.width), b = parseFloat(f.scrollHeight) - r;
                parseInt(n) + c > r ? n = r - c : parseInt(n) < 0 && (n = 0);
            }
            o.top = l(n), t.lastXPosition = e.clientX, t.lastYPosition = e.clientY;
            try {
                document.selection.empty();
            } catch (v) {}
            try {
                s.getSelection().removeAllRanges();
            } catch (v) {}
            a("drag", {
                x: p,
                y: n,
                el: t,
                mouseEvent: e
            });
        }
        function y(e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
        }
        function r(e) {
            var t = e.dataset, i = t._duration || parseInt(300 / 16.66666, 10);
            if (!0 === e.dataset._scrollingY || "true" === e.dataset._scrollingY) {
                var a = parseInt(t._endY) - parseInt(t._startY);
                if (0 === a) e.dataset._scrollingY = !1; else {
                    var o = e.scrollTop, l = v(parseInt(t._startY), a, i, o);
                    a > 0 ? o >= parseInt(t._endY) || o < parseInt(t._startY) ? e.dataset._scrollingY = !1 : (h(e, Math.max(1, u(a, i, l))), 
                    "function" == typeof n ? n(function() {
                        r(e);
                    }) : s[n](function() {
                        r(e);
                    })) : o <= parseInt(t._endY) || o > parseInt(t._startY) ? e.dataset._scrollingY = !1 : (h(e, Math.min(-1, u(a, i, l))), 
                    "function" == typeof n ? n(function() {
                        r(e);
                    }) : s[n](function() {
                        r(e);
                    }));
                }
            }
        }
        function b(e, t) {
            var a = parseInt(e.scrollTop), i = s.getComputedStyle(e), c = parseFloat(i.height), u = parseFloat(i.width), l = parseFloat(e.scrollHeight) - c;
            e.dataset._scrollingY && "false" != e.dataset._scrollingY || (e.dataset._scrollingY = !0, 
            e.dataset._startY = a, e.dataset._endY = e.dataset._startY, "function" == typeof n ? n(function() {
                r(e);
            }) : s[n](function() {
                r(e);
            }));
            var o = parseInt(e.dataset._endY) - parseInt(e.dataset._startY);
            return o > 0 && 0 > t || 0 > o && t > 0 ? (e.dataset._startY = a, e.dataset._endY = e.dataset._startY) : e.dataset._endY = t > 0 ? Math.min(a + t + parseInt(2 * o / 3), l) : Math.max(0, a + t + parseInt(2 * o / 3)), 
            0 > t && a > 0 || t > 0 && l > a;
        }
        function I(t) {
            if (1 === event.which) {
                var n = this, e = B(this, "enscroll-track");
                e && j(e, "dragging");
            }
        }
        e.Scrollbar = function(t, n) {
            e.Scrollbar.addScrollBar(t, n);
        }, e.Scrollbar.addScrollBar = function(t, u) {
            if (p(t)) {
                var o = {
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
                }, r = g(o);
                e.Element.addResizeListener(t, function() {
                    c.log("Element Resized"), e.Scrollbar.resizeScrollBar(this);
                }), A(t, r), e.Scrollbar.resizeScrollBar(t);
                var a = function(t) {
                    e.Scrollbar.handlers.target_onScroll.call(this, t);
                };
                "onwheel" in t || "WheelEvent" in s && navigator.userAgent.toLowerCase().indexOf("msie") >= 0 ? L(t, "wheel", a, !1) : L(t, "mousewheel", a, !1);
                var i = e.$(".enscroll-track", r), n = e.$(".handle3", r), l = function(e) {
                    c.log("mousedown", this, e), E(e, this);
                };
                k(n), n.whenDragging(function(e) {
                    c.log("whenDragging args", e, this);
                    var t = B(e.el, "jModScrollBar"), n = t.parentElement;
                }), L(n, "mousedown", l, !1), L(n, "touchstart", function(e) {
                    c.log("touchstart", e);
                }, !1), t.onscroll = function(t) {
                    C(i, "dragging") || e.Scrollbar.resizeScrollBar(this);
                };
            }
        };
        var t, N = "10";
        e.Scrollbar.resizeScrollBar = function(t) {
            var a = e.$(".jModScrollBar");
            if (a) {
                var d = e.$(".enscroll-track", a), c = e.$(".handle3", a), l = (s || i).getComputedStyle(t, null), r = parseFloat(l.height), p = parseFloat(l.width), o = parseFloat(t.scrollHeight), m = parseFloat(t.scrollWidth), f = parseFloat(t.scrollTop), g = parseFloat(t.scrollLeft), u = 0, n = 0;
                a.style.left = parseInt(p - 10) + "px", d.style.height = parseInt(r) + "px", u = r / o * r, 
                n = r / o * f, 0 > n && (n = 0), n += f, c.style.height = u + "px", c.style.top = n + "px";
            }
        };
        var n = s.requestAnimationFrame ? "requestAnimationFrame" : s.mozRequestAnimationFrame ? "mozRequestAnimationFrame" : s.webkitRequestAnimationFrame ? "webkitRequestAnimationFrame" : s.oRequestAnimationFrame ? "oRequestAnimationFrame" : s.msRequestAnimationFrame ? "msRequestAnimationFrame" : function(e) {
            setTimeout(e, 17);
        }, S = .5 * Math.PI, T = 10 * Math.log(2), u = function(t, n, r) {
            var e = S / n, a = t * e;
            return Math.round(a * Math.cos(e * r));
        }, w = function(t, e, n) {
            return Math.round(t * T * Math.pow(2, -10 * n / e + 1) / e);
        }, v = function(e, t, n, r) {
            return 2 * n / Math.PI * Math.asin((r - e) / t);
        }, h = function(e, t) {
            e.scrollTop = parseInt(e.scrollTop) + parseInt(t);
        };
        e.Scrollbar.handlers = {
            target_onScroll: function(e) {
                var o = this, t = 10, r = "deltaX" in e ? -e.deltaX : "wheelDeltaX" in e ? e.wheelDeltaX : 0, a = "deltaY" in e ? -e.deltaY : "wheelDeltaY" in e ? e.wheelDeltaY : "wheelDelta" in e ? e.wheelDelta : 0, n;
                Math.abs(r) > Math.abs(a) ? n = (r > 0 ? -t : t) << 2 : (n = (a > 0 ? -1 * t : t) << 2, 
                b(this, n) && y(e));
            },
            target_onResize: function() {},
            track_onMouseDown: function() {},
            track_onMouseUp: function() {},
            track_handle_onMouseDown: function(t) {
                var n = this, e = B(this, "enscroll-track");
                e && j(e, "dragging");
            },
            track_handle_onMouseUp: function(t) {
                var n = this, e = B(this, "enscroll-track");
                e && x(e, "dragging");
            }
        };
    }(), e.CSS = ".jmod-na .track3{width:10px;background:rgba(0,0,0,0);margin-right:0px;-webkit-transition:background 250ms linear;transition:background 250ms linear;}.jmod-na .track3:hover,.jmod-na .track3.dragging{background:#d9d9d9;background:rgba(0,0,0,0.15);}.jmod-na .handle3{width:7px;right:0;background:#999;background:rgba(0,0,0,0.4);-webkit-transition:width 250ms;transition:width 250ms;cursor:pointer;}.jmod-na .track3:hover .handle3,.jmod-na .track3.dragging .handle3{width:10px;}", 
    e.Config.Tooltip = e.extend({
        enabled: !1,
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
    }, e.Config.Tooltip || {});
    var bt = "Tooltip.containerId", Y = "Tooltip.attributeNames.id", V = "Tooltip.attributeNames.tooltip", at = "Tooltip.attributeNames.placement", sn = "Tooltip.attributeNames.margin", F = "Tooltip.classNames.tooltipTarget", st = "Tooltip.classNames.tooltip", f = e.Tooltip = function(t, n) {
        p(t) && e.Tooltip.AddTooltipsToElement.apply(e.Tooltip, arguments);
    }, tt;
    Object.defineProperties(f, {
        Initialized: {
            value: !1,
            writable: !0
        },
        Count: {
            value: 0,
            writable: !0
        },
        TooltipContainer: {
            get: function() {
                return f.Initialized || f.init(), tt || (tt = document.getElementById(n(bt))), tt;
            },
            set: function(e) {
                tt = e;
            }
        },
        get: {
            value: function(e) {
                var r, a, o, t = n(Y);
                if (p(e)) return C(e, n(st)) ? document.querySelector("." + n(F) + " [" + t + '="' + e.id + '"]') : (C(e, n(F)) && e.hasAttribute(t) ? r = e.getAttribute(t) : this.TooltipContainer && null !== (o = this.TooltipContainer.querySelector("." + n(F) + " [" + t + "]")) && (r = o.getAttribute(t)), 
                document.getElementById(r));
                if ("string" == typeof e) {
                    if (null !== (a = document.getElementById(e))) return a;
                } else if ("number" == typeof e && this.TooltipContainer && this.TooltipContainer.childElementCount > e) return tooltipContainer.children[e];
                return null;
            }.bind(f)
        }
    });
    var Z = 200;
    f.MoveTooltip = function(e, t, r) {
        "top" in r ? t.style.top = r.top : "bottom" in r && (t.style.bottom = r.bottom), 
        "left" in r ? t.style.left = r.left : "right" in r && (t.style.right = r.right);
        var a = n("Tooltip.attributeNames.margin");
        e.hasAttribute(a + "-top") && (t.style.marginTop = e.getAttribute(a + "-top")), 
        e.hasAttribute(a + "-left") && (t.style.marginLeft = e.getAttribute(a + "-left")), 
        e.hasAttribute(a + "-bottom") && (t.style.marginBottom = e.getAttribute(a + "-bottom")), 
        e.hasAttribute(a + "-right") && (t.style.marginRight = e.getAttribute(a + "-right"));
    }, f.MoveTooltipToTarget = function(i, o, l) {
        var t, r, a, c, u;
        if (C(i, n(st))) t = i; else {
            if (!i.hasAttribute(n(Y))) return;
            t = document.getElementById(i.getAttribute(n(Y)));
        }
        var s = o.getAttribute(n(at)) || "top", e = en(o);
        switch (s) {
          case "left-top":
            r = parseInt(e.top), a = e.left - parseInt(t.offsetWidth), f.MoveTooltip(o, t, {
                top: r + "px",
                left: a + "px"
            });
            break;

          case "left-bottom":
            r = e.top + e.height - parseInt(t.offsetHeight), a = e.left - parseInt(t.offsetWidth), 
            f.MoveTooltip(o, t, {
                top: r + "px",
                left: a + "px"
            });
            break;

          case "left":
            r = e.top + parseInt(e.height / 2) - parseInt(parseInt(t.offsetHeight) / 2), a = e.left - parseInt(t.offsetWidth), 
            f.MoveTooltip(o, t, {
                top: r + "px",
                left: a + "px"
            });
            break;

          case "right-top":
            r = parseInt(e.top), a = e.left + e.width, f.MoveTooltip(o, t, {
                top: r + "px",
                left: a + "px"
            });
            break;

          case "right-bottom":
            r = e.top + e.height - parseInt(t.offsetHeight), a = e.left + e.width, f.MoveTooltip(o, t, {
                top: r + "px",
                left: a + "px"
            });
            break;

          case "right":
            r = e.top + parseInt(e.height / 2) - parseInt(t.offsetHeight / 2), a = e.left + e.width, 
            f.MoveTooltip(o, t, {
                top: r + "px",
                left: a + "px"
            });
            break;

          case "bottom-left":
            r = e.top + e.height, a = e.left, f.MoveTooltip(o, t, {
                top: r + "px",
                left: a + "px"
            });
            break;

          case "bottom-right":
            r = e.top + e.height, a = e.left + e.width - parseInt(t.offsetWidth), f.MoveTooltip(o, t, {
                top: r + "px",
                left: a + "px"
            });
            break;

          case "bottom":
            r = e.top + e.height, a = e.left + parseInt(e.width / 2) - parseInt(parseInt(t.offsetWidth) / 2), 
            f.MoveTooltip(o, t, {
                top: r + "px",
                left: a + "px"
            });
            break;

          case "top-left":
            r = e.top - parseInt(t.offsetHeight), a = e.left, f.MoveTooltip(o, t, {
                top: r + "px",
                left: a + "px"
            });
            break;

          case "top-right":
            r = e.top - parseInt(t.offsetHeight), a = e.left + e.width - parseInt(t.offsetWidth), 
            f.MoveTooltip(o, t, {
                top: r + "px",
                left: a + "px"
            });
            break;

          case "top":
          default:
            r = e.top - parseInt(t.offsetHeight), a = e.left + parseInt(e.width / 2) - parseInt(parseInt(t.offsetWidth) / 2), 
            f.MoveTooltip(o, t, {
                top: r + "px",
                left: a + "px"
            });
        }
    }, f.HideAllExcept = function(i) {
        for (var a = [], t, o = e.$$(".jmod-na ." + n(st) + ".in"), r = 0; r < o.length; r++) t = o[r], 
        "block" == t.style.display && t !== i && (x(t, "in"), a.push(t));
        setTimeout(function(t) {
            for (var e = 0; e < t.length; e++) C(t[e], "in") || (t[e].style.display = "none");
        }, Z, a);
    }, f.handler = {
        mouseenter: function(i) {
            var r = this.getAttribute(n(Y)), a = this.getAttribute(n(V)), e = this.getAttribute(n(at)) || "top", o = f.TooltipContainer;
            switch (e) {
              case "top-left":
              case "top-right":
                e = "top " + e;
                break;

              case "bottom-left":
              case "bottom-right":
                e = "bottom " + e;
                break;

              case "left-top":
              case "left-bottom":
                e = "left " + e;
                break;

              case "right-top":
              case "right-bottom":
                e = "right " + e;
            }
            var t = document.getElementById(r);
            t || (t = g({
                type: "div",
                id: r,
                className: n(st) + " " + e + " fade slow",
                style: {
                    display: "none"
                },
                innerHTML: [ '<div class="tooltip-arrow"></div>', '<div class="tooltip-inner">' + a + "</div>" ]
            }), t.addEventListener("mouseenter", function(t) {
                var e = s.getComputedStyle(this, null).getPropertyValue("opacity");
                e > .2 && (j(this, "in"), f.HideAllExcept(this));
            }), t.addEventListener("mouseleave", function(e) {
                var t = s.getComputedStyle(this, null).getPropertyValue("opacity");
                x(this, "in"), setTimeout(function(e) {
                    C(e, "in") || (e.style.display = "none");
                }, Z, this);
            }), t.addEventListener("click", function(e) {
                x(this, "in"), setTimeout(function(e) {
                    C(e, "in") || (e.style.display = "none");
                }, Z, this);
            }), o.appendChild(t)), f.HideAllExcept(t), t.style.display = "block", setTimeout(function(t, e) {
                j(e, "in"), f.MoveTooltipToTarget(e, t);
            }, 1, this, t);
        },
        mouseleave: function(t) {
            var e = f.get(this);
            e && (x(e, "in"), setTimeout(function(e) {
                C(e, "in") || (e.style.display = "none");
            }, Z, e));
        },
        scroll: function(i) {
            var t, o, r;
            t = tn(this, "jmod-na") ? e.$$("." + n(F) + "[" + n(V) + "]", this) : e.$$(".jmod-na ." + n(F) + "[" + n(V) + "]", this);
            for (var a = 0; a < t.length; a++) o = t[a].getAttribute(n(Y)), r = document.getElementById(o), 
            r && "block" == r.style.display && f.MoveTooltipToTarget(r, t[a]);
        }
    }, f.getTooltipsFromElement = function(o) {
        for (var i, a = [], r = e.$$("." + n(F) + "[" + n(V) + "]", o), t = 0; t < r.length; t++) r[t].getAttribute(n(V)) && a.push(r[t]);
        return a;
    }, f.AddTooltipsToElement = function(a) {
        for (var r = f.getTooltipsFromElement(a), e = 0; e < r.length; e++) {
            r[e].setAttribute(n(Y), "jmod-tooltip-" + f.Count++), r[e].addEventListener("mouseenter", f.handler.mouseenter), 
            r[e].addEventListener("mouseleave", f.handler.mouseleave);
            for (var t = r[e]; t.parentElement; ) t = t.parentElement, t.hasAttribute("data-jmod-scroll-event") || (t.setAttribute("data-jmod-scroll-event", !0), 
            t.addEventListener("scroll", f.handler.scroll));
        }
        a.addEventListener("scroll", f.handler.scroll);
    }, f.init = function() {
        f.Initialized = !0;
        var e = document.getElementById(n(bt));
        null == e && (e = document.createElement("div"), e.id = n(bt), e.className = "jModTooltipContainer jmod-na jmod-fa", 
        document.body.appendChild(e), tt = e);
    }, e.CSS = ".jmod-na .fade.slow {transition: opacity " + (Z / 1e3).toFixed(2) + "s linear 0s;}", 
    e.Config.Notifications = {
        enabled: !0
    };
    var S = e.Notification = function(t, r) {
        if (!n("Notifications.enabled")) return !1;
        if (e.Notification.Initialized || e.Notification.init(), "string" == typeof t) switch (t.toLowerCase()) {
          case "get":
          case "getelement":
            return e.Notification.getElement.apply(e.Notification, d.call(arguments, 1));
            break;

          case "getid":
          case "getelementid":
            return e.Notification.getElementId.apply(e.Notification, d.call(arguments, 1));
            break;

          case "updatenotification":
            return e.Notification.UpdateNotification.apply(e.Notification, d.call(arguments, 1));
        } else "object" == typeof t && t.type && S.Types.create(t.type.toLowerCase(), t);
    };
    S.Types = {
        types: {},
        add: function(e) {
            this.types[e.name] = e;
        },
        callMethod: function(e, n) {
            return t !== typeof this.types[e] && "function" == typeof this.types[e][n] ? this.types[e][n].apply(this.types[e], d.call(arguments, 2)) : r;
        },
        create: function(e, t) {
            this.callMethod(e, "create", t);
        },
        init: function() {
            for (var e in this.types) this.callMethod(e, "init");
        }
    }, +function(n) {
        var r = "jModSmallNotificationsWrapper";
        n.LargeCount = 0, Object.defineProperty(n, "CurrentLargeCount", {
            get: function() {
                var t = document.getElementById(r);
                return e.$$("div[data-jmod-large-notification]", t).length;
            }
        }), e.Notification.Types.add({
            name: "large",
            getWrapper: function() {
                return document.getElementById(r);
            },
            generateElement: function(e) {
                var o = {
                    type: "div",
                    className: "jModLargeNotification animated fadeIn fast",
                    style: {},
                    attributes: {
                        "data-jmod-notification": n.count,
                        "data-jmod-notification-type": "large",
                        "data-jmod-large-notification": n.LargeCount
                    }
                };
                if (e.background) {
                    var r;
                    "string" == typeof e.background ? (r = U(e.background)) && t != typeof e["background-opacity"] && (r.a = parseFloat(e["background-opacity"])) : "object" == typeof e.background && t != typeof e.background.color && (r = U(e.background.color)) && t != typeof e.background.opacity && (r.a = parseFloat(e.background.opacity)), 
                    r && (o.style.backgroundColor = "rgba(" + r.r + ", " + r.g + ", " + r.b + ", " + (isNaN(parseFloat(r.a)) ? "0.8" : parseFloat(r.a)) + ")");
                }
                var a = {
                    type: "div",
                    className: "",
                    innerHTML: [ {
                        type: "i",
                        id: "jModbtnClose" + n.LargeCount,
                        className: "btnClose fa fa-times",
                        EventListeners: {
                            click: function(e) {
                                if (!C(this, "fadeOut")) {
                                    n.close(e.target);
                                    try {
                                        this.removeEventListener("click", arguments.callee);
                                    } catch (e) {}
                                }
                            }
                        }
                    } ],
                    style: {}
                };
                return typeof e.title !== t && a.innerHTML.push({
                    type: "span",
                    innerHTML: e.title
                }), a.innerHTML.push({
                    type: "div",
                    innerHTML: e.body
                }), typeof e.icon !== t && a.innerHTML.push({
                    type: "div",
                    className: "jmod-na largeIcon",
                    style: {
                        backgroundColor: "transparent"
                    },
                    innerHTML: {
                        type: "i",
                        className: "fa " + e.icon + " " + (e.iconAnimation || "swing") + " animated",
                        style: {
                            color: "#fff"
                        }
                    }
                }), o.innerHTML = a, g(o);
            },
            create: function(t) {
                var n = this.getWrapper(), r = this.generateElement(t);
                n.appendChild(r), e.Notification.Events.addAll(t, e.Notification.count), e.Notification.count++, 
                e.Notification.LargeCount++;
            },
            close: function(e, t) {
                n.Events.fire("onBeforeClose", t, null, e), x(e, "fadeIn"), j(e, "fadeOut"), setTimeout(function(e, t) {
                    e.style.display = "none", n.Events.fire("onAfterClose", t, null, e), e.parentElement.removeChild(e);
                }, 1e3, e, t);
            },
            init: function() {
                var t = n("getElement", "notificationsWrapper"), e = this.getWrapper();
                null == e && (e = document.createElement("div"), e.id = r, e.className = "jModNotifications", 
                t.appendChild(e));
            }
        });
    }(e.Notification), +function(n) {
        var r = "jModSmallNotificationsWrapper";
        n.SmallCount = 0, Object.defineProperty(n, "CurrentSmallCount", {
            get: function() {
                var t = document.getElementById(r);
                return e.$$("div[data-jmod-small-notification]", t).length;
            }
        }), e.Notification.Types.add({
            name: "small",
            getWrapper: function() {
                return document.getElementById(r);
            },
            generateElement: function(r) {
                var u = 25, m = n.CurrentSmallCount;
                if (m > 0) {
                    for (var d = 25 * m, h = n("getElement", "notificationsSmallWrapper"), f = h.querySelectorAll("div[data-jmod-small-notification]"), c = 0; c < f.length; c++) d += parseInt(f[c].offsetHeight);
                    u += d;
                }
                var l = {
                    type: "div",
                    className: "jModSmallNotification animated fadeIn",
                    style: {
                        top: u + "px"
                    },
                    innerHTML: [],
                    attributes: {
                        "data-jmod-notification": n.count,
                        "data-jmod-notification-type": "small",
                        "data-jmod-small-notification": n.SmallCount
                    },
                    EventListeners: {
                        click: function(r) {
                            for (var n = 0, t = r.target; !t.hasAttribute("data-jmod-small-notification") && null != t && 20 > n; ) t = t.parentElement, 
                            n++;
                            if (null != t && !C(t, "fadeOut")) {
                                var a = parseInt(t.getAttribute("data-jmod-notification")), o = parseInt(t.getAttribute("data-jmod-small-notification"));
                                e.Notification.close(t);
                                try {
                                    this.removeEventListener("click", arguments.callee);
                                } catch (r) {}
                            }
                        }
                    }
                }, a = U("rgba(50, 118, 177, 0.8)"), o;
                r.background && ("object" == typeof r.background ? (t != typeof r.background.color && (o = U(r.background.color)) && (null == o.a && (o.a = a.a), 
                a = o), t != typeof r.background.opacity && (a.a = r.background.opacity)) : (o = U(r.background)) && (null == o.a && (o.a = a.a), 
                a = o)), a && (l.style.backgroundColor = "rgba(" + a.r + ", " + a.g + ", " + a.b + ", " + a.a + ")");
                var i = {
                    type: "div",
                    className: "NotificationContent",
                    innerHTML: [],
                    style: {}
                };
                if (typeof r.footer != t) {
                    var s = document.createElement("div");
                    s.className = "largeIcon", p(r.icon) ? s.appendChild(r.icon) : s.innerHTML = '<i class="fa ' + r.icon + " " + (r.iconAnimation || "bounce") + ' animated"> </i>', 
                    l.innerHTML.push(s);
                }
                return r.title && i.innerHTML.push({
                    type: "span",
                    innerHTML: r.title
                }), r.body && i.innerHTML.push({
                    type: "p",
                    innerHTML: r.body
                }), r.footer && i.innerHTML.push({
                    type: "p",
                    style: {
                        textAlign: "right"
                    },
                    innerHTML: r.footer
                }), r.icon && !r.footer && i.innerHTML.push({
                    type: "div",
                    className: "smallIcon",
                    style: {
                        backgroundColor: "transparent"
                    },
                    innerHTML: {
                        type: "i",
                        className: "fa " + r.icon + " " + (r.iconAnimation || "swing") + " animated",
                        style: {
                            color: "#fff"
                        }
                    }
                }), l.innerHTML.push(i), g(l);
            },
            create: function(t) {
                var n = this.getWrapper(), r = this.generateElement(t);
                n.appendChild(r), e.Notification.Events.addAll(t, e.Notification.count), e.Notification.count++, 
                e.Notification.SmallCount++;
            },
            close: function(e, a) {
                n.Events.fire("onBeforeClose", a, null, e);
                var r = parseInt(e.style.top), t = e;
                for (x(e, "fadeIn"), j(e, "fast"), j(e, "fadeOut"), e.style.zIndex = "9998"; null != t.nextElementSibling && t.nextElementSibling.hasAttribute("data-jmod-small-notification"); ) t = t.nextElementSibling, 
                j(t, "transitionUp"), setTimeout(function(e, t) {
                    e.style.top = t + "px";
                }, 0, t, r), r = r + parseInt(t.offsetHeight) + 25;
                setTimeout(function(e, t) {
                    e.style.display = "none", n.Events.fire("onAfterClose", t, null, e), e.parentElement.removeChild(e);
                }, 1e3, e, a);
            },
            init: function() {
                var t = n("getElement", "notificationsWrapper"), e = this.getWrapper();
                null == e && (e = document.createElement("div"), e.id = r, e.className = "jModSmallNotifications", 
                t.appendChild(e));
            }
        });
    }(e.Notification), +function(n) {
        var r = "jModFillNotificationsWrapper";
        n.FillCount = 0, Object.defineProperty(n, "CurrentFillCount", {
            get: function() {
                var t = document.getElementById(r);
                return e.$$("div[data-jmod-fill-notification]", t).length;
            }
        }), e.Notification.Types.add({
            name: "fill",
            getWrapper: function() {
                return document.getElementById(r);
            },
            generateElement: function(r) {
                var o = {
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
                            innerHTML: r.title
                        }, {
                            type: "p",
                            className: "NotificationText",
                            innerHTML: r.body
                        } ]
                    } ]
                };
                if (r.background) {
                    var a;
                    "string" == typeof r.background ? (a = U(r.background)) && t != typeof r["background-opacity"] && (a.a = parseFloat(r["background-opacity"])) : "object" == typeof r.background && t != typeof r.background.color && (a = U(r.background.color)) && t != typeof r.background.opacity && (a.a = parseFloat(r.background.opacity)), 
                    a && (o.style.backgroundColor = "rgba(" + a.r + ", " + a.g + ", " + a.b + ", " + (a.a || 0 === parseFloat(a.a) ? parseFloat(a.a) : "0.8") + ")");
                }
                var i = {
                    type: "div",
                    className: "NotificationFooter",
                    style: {},
                    innerHTML: [ {
                        type: "button",
                        className: "btn btn-default btn-sm",
                        innerHTML: "Close",
                        EventListeners: {
                            click: function(t) {
                                if (this === t.target) {
                                    e.Notification.close(t.target);
                                    try {
                                        this.removeEventListener("click", arguments.callee);
                                    } catch (t) {}
                                }
                            }
                        }
                    } ]
                };
                o.innerHTML[0].innerHTML.push(i);
                var s = {
                    type: "div",
                    className: "jModFillNotificationContainer animated fadeIn fast",
                    innerHTML: [ o ],
                    attributes: {
                        "data-jmod-notification": n.count,
                        "data-jmod-notification-type": "fill",
                        "data-jmod-fill-notification": n.FillCount
                    },
                    EventListeners: {
                        click: function(t) {
                            if (this === t.target && !C(this, "fadeOut")) {
                                e.Notification.close(this), z(t);
                                try {
                                    this.removeEventListener("click", arguments.callee);
                                } catch (t) {}
                                return !1;
                            }
                        }
                    }
                };
                return g(s);
            },
            create: function(t) {
                var n = this.getWrapper(), r = this.generateElement(t);
                n.appendChild(r), e.Notification.Events.addAll(t, e.Notification.count), e.Notification.count++, 
                e.Notification.FillCount++;
            },
            close: function(e, t) {
                n.Events.fire("onBeforeClose", t, null, e), x(e, "fadeIn"), j(e, "fadeOut"), setTimeout(function(e, t) {
                    e.style.display = "none", n.Events.fire("onAfterClose", t, null, e), e.parentElement.removeChild(e);
                }, 800, e, t);
            },
            init: function() {
                var t = n("getElement", "notificationsWrapper"), e = this.getWrapper();
                null == e && (e = document.createElement("div"), e.id = r, e.className = "jModFillNotifications", 
                e.style.position = "absolute", t.appendChild(e));
            }
        });
    }(e.Notification), S.UpdateNotification = function(s) {
        var r = e.extend(!0, {
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
        }, s);
        null == r.script_name && (r.script_name = n("script.script_name"));
        var l = r.title.replace("%SCRIPTNAME%", r.script_name).replace("%VERSION%", r.version).replace("%TIME%", r.time), c = r.body.replace("%SCRIPTNAME%", r.script_name).replace("%VERSION%", r.version).replace("%TIME%", r.time);
        r.install.href && null != r.install.href && "" != r.install.href || (r.install.href = n([ "script.script_info.jModdownloadURL", "script.script_info.downloadURL" ]), 
        typeof r.install.href === t && (r.install.href = "javascript:void(0);"));
        var a = document.createElement("a");
        a.setAttribute("href", r.install.href), null != r.install.target && a.setAttribute("target", r.install.target), 
        a.className = "btn btn-success btn-sm", a.innerHTML = r.install.text, "function" == typeof r.install.onClick && a.addEventListener("click", r.install.onClick), 
        r.visit.href && null != r.visit.href && "" != r.visit.href || (r.visit.href = typeof n("script.script_info.homepage") !== t ? n("script.script_info.homepage") : "http://myuserjs.org/script/" + n("script.username") + "/" + n("script.script_name"));
        var o = document.createElement("a");
        o.setAttribute("href", r.visit.href), null != r.visit.target && o.setAttribute("target", r.visit.target), 
        o.className = "btn btn-warning btn-sm", o.innerHTML = r.visit.text, "function" == typeof r.visit.onClick && o.addEventListener("click", r.visit.onClick);
        var i = document.createElement("a");
        i.setAttribute("href", "javascript:void(0);"), i.className = "btn btn-danger btn-sm", 
        i.innerHTML = "Close";
        var u = [ a, o, i ];
        S({
            title: l,
            body: c,
            footer: u,
            icon: r.icon,
            iconAnimation: r.iconAnimation,
            type: "small"
        });
    }, S.getElementId = function(e) {
        switch (e.toLowerCase()) {
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
    }, S.getElement = function(e) {
        var t = S.getElementId(e);
        return document.getElementById(null != t ? t : e);
    }, S.remove = function(t, r) {
        if (null != t) {
            if (t.hasAttribute("data-jmod-small-notification")) {
                var e = t, n = parseInt(t.style.top || 0);
                for (0 >= n && (n = 20); null != e.nextElementSibling && e.nextElementSibling.hasAttribute("data-jmod-small-notification"); ) e = e.nextElementSibling, 
                e.className = "jModSmallNotification SmallBox transitionUp", e.style.top = n + "px", 
                n = n + parseInt(e.offsetHeight) + 25;
            }
            t.parentElement.removeChild(t);
        }
    }, S.Events = new yt([ "onBeforeClose", "onAfterClose" ]), S.close = function(t) {
        var i = S("getElement", "notificationsWrapper"), n, a, o, r = "data-jmod-notification";
        if ("number" == typeof t) a = t, n = e.$("div[" + r + '="' + t + '"]', i); else {
            if (!p(t)) return;
            if (t.hasAttribute(r)) n = t; else if (!(n = e.$("div[" + r + "]", t)) && !(n = e.Element.findParentWithAttribute(t, r))) return;
            a = parseInt(n.getAttribute(r));
        }
        (o = n.getAttribute("data-jmod-notification-type")) && S.Types.callMethod(o, "close", n, a);
    }, S.count = 0, S.Initialized = !1, S.init = function() {
        if (!n("Notifications.enabled")) return !1;
        S.Initialized = !0;
        var t = document.getElementsByTagName("head")[0], r = document.getElementsByTagName("body")[0], e = S("getElement", "notificationsWrapper");
        null == e && (e = document.createElement("div"), e.id = S("getElementId", "notificationsWrapper"), 
        e.className = "jModNotificationsFullWrapper jmod-na jmod-fa", document.body.appendChild(e)), 
        S.Types.init();
    }, e.CSS = "", e.Config.Tabs = e.extend({
        enabled: !0,
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
    }, e.Config.Tabs || {});
    var y = e.Tabs = function(e) {};
    y.Initialized = !1, y.GroupCount = 0;
    var O = y.att = {}, Et = y.cn = {};
    Object.defineProperties(y.att, {
        li: {
            get: function() {
                return n("Tabs.att.li");
            }
        },
        ul: {
            get: function() {
                return n("Tabs.att.ul");
            }
        },
        ct: {
            get: function() {
                return n("Tabs.att.ct");
            }
        },
        pane: {
            get: function() {
                return n("Tabs.att.pane");
            }
        }
    }), Object.defineProperties(y.cn, {
        nav: {
            get: function() {
                return n("Tabs.cn.nav");
            }
        },
        ct: {
            get: function() {
                return n("Tabs.cn.ct");
            }
        }
    }), y.Events = new yt([ "onBeforeShow", "onAfterShow" ]), y.handler = {
        click: function(n) {
            var e = n.target, l = e.parentElement;
            if (this.contains(e) && "A" == e.nodeName) {
                var r = this.parentElement.querySelector("." + Et.ct), a = w(e, "href");
                if (a) {
                    var o = r.querySelector(".tab-pane.active"), i = this.querySelector("li.active"), t = r.querySelector(a);
                    if (t) {
                        var s = w(this, O.ul);
                        !1 !== y.Events.fire("onBeforeShow", parseInt(s), this, [ e, t ]) && (i && x(i, "active"), 
                        o && x(o, "active"), j(l, "active"), j(t, "active"), y.Events.fire("onAfterShow", parseInt(s), this, [ e, t ]));
                    }
                }
                z(n);
            }
        }
    }, y.load = function(t) {
        var r, n, s;
        if (p(t)) n = t; else {
            if ("object" != typeof t || !t.target) return;
            n = t.target, n.onAfterResize = function(t) {
                return function() {
                    var n = this;
                    C(n, "nav-tabs") || (n = e.$(".nav-tabs", n), n || (n = e.$(".nav-tabs", t))), n && ht(n, Ct);
                };
            }(n), s = t.EventListeners;
        }
        if (r = C(n, "tabbable") ? [ n ] : e.$$("div.tabbable", n)) for (var a = 0; a < r.length; a++) {
            var o = r[a].querySelector(".nav." + Et.nav), i = r[a].querySelector("." + Et.ct);
            o && i && (o.setAttribute(O.ul, y.GroupCount), i.setAttribute(O.ct, y.GroupCount), 
            "object" == typeof t && y.Events.addAll(t, y.GroupCount), o.addEventListener("click", y.handler.click), 
            y.GroupCount++);
        }
    }, y.makeNavElement = function(e) {
        var t = {
            type: "li",
            id: e.id,
            className: (e.isActive || e.active ? "active " : "") + (e.className || e["class"] || ""),
            innerHTML: {
                type: "a",
                innerHTML: e.name || e.innerHTML || e.text,
                attributes: {
                    href: "#" + (e.contentId || e.targetId),
                    "data-toggle": "tab"
                }
            },
            attributes: e.attributes || {}
        };
        return t.attributes[O.li] = e.index || -1, t;
    }, y.makeContentElement = function(e) {
        var t = {
            type: "div",
            id: e.id,
            className: "container tab-pane " + (e.isActive || e.active ? "active " : "") + (e.className || e["class"] || ""),
            innerHTML: e.innerHTML || e.text || "",
            attributes: e.attributes || {}
        };
        return t.attributes[O.pane] = e.index || -1, t;
    }, y.show = function(t, n) {
        var a, o, r;
        if ("number" == typeof t && (t = document.querySelector("ul[" + O.ul + '="' + t + '"]')), 
        p(t)) {
            if (jt(t, O.li)) r = t; else if ("number" == typeof n) r = e.$$("li[" + O.li + "]", t)[n]; else if ("string" == typeof n) {
                for (o = e.$$("li[" + O.li + "]", t), a = 0; a < o.length; a++) if (o[a].innerHTML == n) {
                    r = o[a];
                    break;
                }
            } else p(n) && jt(n, O.li) && (r = n);
            if (r && p(r)) return pt(r.querySelector('a[data-toggle="tab"]'));
        }
    }, y.resize = function(t) {
        e.Element.requestAnimationFrame(function() {
            ht(t, Ct);
        });
    }, e.Config.Modal = e.extend({
        enabled: !0,
        cn: {
            container: "jModModalContainer"
        },
        id: {
            container: "jModModalContainer"
        }
    }, e.Config.Modal || {});
    var rn = "Modal.cn.container", Ot = "Modal.id.container", u = e.Modal = function(a, l) {
        if (!n("Modal.enabled")) return !1;
        e.Modal.Initialized || e.Modal.init();
        try {
            if ("string" == typeof a) switch (a.toLowerCase()) {
              case "show":
              case "showmodal":
                return e.Modal.show.apply(e.Modal, d.call(arguments, 1));
                break;

              case "hide":
              case "hidemodal":
                return e.Modal.hide.apply(e.Modal, d.call(arguments, 1));
            } else if ("object" == typeof a) {
                var o = e.Modal.createModal(a), i = parseInt(w(o, "data-jmod-modal")), c = g({
                    type: "div",
                    id: "jModModal-" + i + "-backdrop",
                    className: "modal-backdrop fade",
                    style: "display: none;",
                    attributes: {
                        role: "dialog",
                        tabindex: "-1",
                        "data-jmod-modal-backdrop": i
                    },
                    EventListeners: {
                        click: {
                            capture: !1,
                            callback: function(e) {
                                return e.target === this ? (this.style.display = "none", x(document.body, "jmod-modal-open"), 
                                z(e), !1) : r;
                            }
                        }
                    }
                }), s = u.Container;
                return s && (s.appendChild(c), s.appendChild(o)), e.Modal.Modals[i] = {
                    index: i,
                    element: o,
                    lockScreen: a.lockScreen || !0,
                    data: a
                }, typeof a.features !== t && e.Modal.addJSFeatures(o, a.features), !0 === l && e.Modal.show(o), 
                o;
            }
        } catch (f) {
            _(f, "jMod.Modal");
        }
    }, ut;
    Object.defineProperties(u, {
        fn: {
            value: u.__proto__
        },
        ModalCount: {
            value: 0,
            writable: !0
        },
        CurrentModal: {
            value: -1,
            writable: !0
        },
        Modals: {
            value: {},
            writable: !0
        },
        Initialized: {
            value: !1,
            writable: !0
        },
        TooltipCount: {
            value: 0,
            writable: !0
        },
        Container: {
            get: function() {
                return ut ? ut : ut = document.getElementById(n(Ot));
            },
            set: function(e) {
                ut = e;
            }
        }
    });
    const St = 150;
    u.getModal = function(e) {
        var n = document.querySelector('div[data-jmod-modal="' + e + '"]');
        return n ? n : typeof u.Modals[e] !== t ? u.Modals[e].element : null;
    }, u.addJSFeatures = function(t, n) {
        n.enableTabs && e.Tabs.load({
            target: t,
            onBeforeShow: function() {
                c.log("Tabs onBeforeShow: ", arguments);
            }
        }), n.enableTooltips && f(t);
    }, u.getVisibleModals = function() {
        for (var t = 0, r = [], n = e.$$("div.modal.in[data-jmod-modal]", u.Container); t < n.length; t++) r.push([ n[t], n[t].getAttribute("data-jmod-modal") ]);
        return r;
    }, u.getModal2 = function() {
        var a = 0, i = arguments.length, r, o, n;
        if (i > 0) {
            for (;i > a; a++) {
                if (r = arguments[a], p(r)) return r;
                ("string" == typeof r || "number" == typeof r) && (n = parseInt(n));
            }
            if (null != n) {
                if ((o = e.$('div[data-jmod-modal="' + n + '"]', u.Container)) && p(o)) return o;
                if (typeof u.Modals[n] != t) return u.Modals[n].element;
            }
        }
        return null;
    };
    var et = "data-jmod-modal-resizing";
    u.resize = function() {
        var s, d, a, i, c, l, v, o, g, m, n, f, y = arguments.length;
        for (a = 0; y > a; a++) i = arguments[a], "number" == typeof i || "string" == typeof i ? s = parseInt(i) : p(i) ? n = i : nn(i) && (d = i);
        if (t != typeof n || t != typeof s) {
            if (n || (n = u.getModal2(n, s)), n && p(n)) {
                if (w(n, et, "boolean")) {
                    if (null == n.__resizeLast__) return;
                    e.Element.cancelAnimationFrame(n.__resizeLast__), n.__resizeLast__ = null;
                }
                n.setAttribute(et, "true"), c = parseInt(e.Element.viewportSize.getHeight()), l = e.$(".modal-dialog", n), 
                f = e.Element.getClientRect(l), parseInt(f.bottom) <= c && !n.hasVerticalScrollBar() && j(n, "no-vertical-scroll");
                try {
                    if (!1 === u.Events.fire("onBeforeResize", s, n, d)) return n.setAttribute(et, "false"), 
                    r;
                } catch (b) {
                    return _(b, "jMod.Modal.resize", 'Error firing event "onBeforeResize"'), r;
                }
                null == s && (s = w(n, "data-jmod-modal", "integer")), n.__resizeLast__ = e.Element.requestAnimationFrame(function() {
                    if (n.__resizeLast__ = null, n.__resizeLastStartY__ = 0, n.__resizeLastEndY__ = 0, 
                    n.__resizeLastCurrentY__ = null, n.__resizeLastCount__ = 0, "none" != n.style.display) {
                        null != n.__restoreVerticalScroll__ && (clearTimeout(n.__restoreVerticalScroll__), 
                        n.__restoreVerticalScroll__ = null), c = parseInt(e.Element.viewportSize.getHeight()), 
                        o = e.$(".modal-body", l), g = e.$(".modal-footer", l), m = e.$(".modal-header", l);
                        var t;
                        _bodyCurrentHeight = parseInt(e.Element.getCompStyle(o, "height")), _bodyCurrentMaxHeight = parseInt(e.Element.getCompStyle(o, "maxHeight")), 
                        _bodyMinHeight = parseInt(e.Element.getCompStyle(o, "minHeight")), computedDialog = e.Element.getCompStyleObj(l), 
                        marginTop = parseInt(computedDialog.getPropertyValue("margin-top")), marginBottom = parseInt(computedDialog.getPropertyValue("margin-bottom")), 
                        maxHeight = c - parseInt(m.offsetHeight) - parseInt(g.offsetHeight) - marginTop - marginBottom - 15, 
                        _bodyMinHeight > maxHeight && (maxHeight = _bodyMinHeight), _bodyCurrentMaxHeight != maxHeight && (n.__resizeLastCurrentY__ = _bodyCurrentMaxHeight, 
                        n.__resizeLastStartY__ = _bodyCurrentMaxHeight, n.__resizeLastEndY__ = parseInt(maxHeight), 
                        t = function() {
                            var u = n.__resizeLast__;
                            if (n.__resizeLastCount__++, n.__resizeLastCount__ > 50) return o.style.maxHeight = n.__resizeLastEndY__ + "px", 
                            r;
                            var l = null == n.__resizeLastCurrentY__ || isNaN(parseInt(n.__resizeLastCurrentY__)) ? parseInt(e.Element.getCompStyle(o, "maxHeight")) : n.__resizeLastCurrentY__, c = parseInt(300 / 16.66666, 10) / 4, i = n.__resizeLastEndY__ - l, a = $t(parseInt(n.__resizeLastStartY__), i, c, l);
                            if (isNaN(a) ? a = 0 : 0 > a && (a *= -1), 0 != i) {
                                var s;
                                if (s = i > 0 ? Math.max(1, Tt(i, c, a)) : Math.min(-1, Tt(i, c, a)), 0 == s || isNaN(s)) return o.style.maxHeight = n.__resizeLastEndY__ + "px", 
                                r;
                                if (n.__resizeLastCurrentY__ = l + s, o.style.maxHeight = n.__resizeLastCurrentY__ + "px", 
                                null == n.__resizeLast__ || n.__resizeLast__ == u) return n.__resizeLast__ = n.__resizeLastCurrentY__ != n.__resizeLastEndY__ && null != n.__resizeLastCurrentY__ ? e.Element.requestAnimationFrame(t) : null, 
                                r;
                            }
                        }, n.__resizeLast__ = e.Element.requestAnimationFrame(t)), f = e.Element.getClientRect(l), 
                        parseInt(f.bottom) > c && parseInt(f.height) < _bodyMinHeight + parseInt(m.offsetHeight) + parseInt(g.offsetHeight) + 15 ? x(n, "no-vertical-scroll") : n.__restoreVerticalScroll__ = setTimeout(function(e, t) {
                            e.__restoreVerticalScroll__ = null, w(e, t, "boolean") || x(e, "no-vertical-scroll");
                        }, 100, n, et);
                    }
                    try {
                        u.Events.fire("onAfterResize", s, n, d);
                    } catch (a) {
                        _(a, "jMod.Modal.resize", 'Error firing event "onAfterResize"');
                    }
                    n.setAttribute(et, "false");
                });
            }
        } else {
            var h = u.getVisibleModals();
            for (a = 0; a < h.length; a++) u.resize(h[a][0], h[a][1], d);
        }
    }, u.show = function(n, r, a) {
        try {
            if ("number" == typeof n && "number" != typeof r && (typeof a === t && typeof r !== t && (a = r), 
            r = n), (typeof n === t || null == n) && typeof r === t) return;
            if (typeof n !== t && null != n && "number" != typeof n || "number" != typeof r ? typeof n !== t && null != n && typeof r === t && (r = w(n, "data-jmod-modal")) : n = e.$('div[data-jmod-modal="' + r + '"]'), 
            -1 != u.CurrentModal && u.CurrentModal != r && u.hide(), n) {
                var o = e.$('div[data-jmod-modal-backdrop="' + r + '"]'), i = u.Events.fire("onBeforeShow", r, n, [ a || null ]);
                u.CurrentModal = r, j(e.Element.document.body, "jmod-modal-open"), o.style.display = "block", 
                n.style.display = "block", setTimeout(function(t, n) {
                    j(n, "in"), j(t, "in"), e.Element.requestAnimationFrame(function() {
                        u.resize(t);
                    });
                }, 1, n, o), setTimeout(function(e, t, n) {
                    u.Events.fire("onAfterShow", t, e, [ n || null ]);
                }, St, n, r, a || null);
            }
        } catch (a) {
            _(a, "jMod.Modal.show");
        }
    }, u.hide = function(r, n, a) {
        try {
            if (typeof r === t && typeof n === t && -1 != u.CurrentModal && (n = u.CurrentModal, 
            r = u.getModal(u.CurrentModal)), "number" == typeof r && "number" != typeof n && (typeof a === t && typeof n !== t && (a = n), 
            n = r), typeof r === t && typeof n === t) return;
            if (p(r) || "number" != typeof n ? typeof r !== t && typeof n === t && (n = w(r, "data-jmod-modal")) : r = u.getModal(n), 
            r) {
                var o = e.$('div[data-jmod-modal-backdrop="' + n + '"]'), i = u.Events.fire("onBeforeHide", n, r, [ a || null ]);
                u.CurrentModal = -1, x(e.Element.document.body, "jmod-modal-open"), Bt(r, [ "in", "no-vertical-scroll" ]), 
                x(o, "in"), setTimeout(function(e, t, n, r) {
                    e.style.display = "none", r.style.display = "none", u.Events.fire("onAfterHide", t, e, [ n || null ]);
                }, St, r, n, a || null, o);
            }
        } catch (a) {
            _(a, "jMod.Modal.hide");
        }
    };
    var rt = [ "onBeforeShow", "onAfterShow", "onBeforeHide", "onAfterHide", "onBeforeResize", "onAfterResize" ];
    u.Events = new yt(rt), u.createModal = function(n) {
        var i = u.ModalCount++;
        u.Events.addAll(n, i);
        for (var r = g({
            type: "div",
            id: n.id || "jModModal-" + i,
            className: "modal fade " + (n.className || n["class"] || ""),
            style: "display: none;",
            attributes: {
                role: "dialog",
                tabindex: "-1",
                "data-jmod-modal": i
            },
            EventListeners: {
                click: {
                    capture: !1,
                    callback: function(e) {
                        if (e.target === this) {
                            var t = e.target, n = parseInt(w(t, "data-jmod-modal"));
                            return u.hide(t, n, e), z(e), !1;
                        }
                    }
                }
            }
        }), a = 0; a < rt.length; a++) Object.defineProperty(r, rt[a], {
            get: function(e, t, n) {
                return function() {
                    u.Events.getAll(n, e);
                }.bind(t);
            }.call(r, rt[a], r, i),
            set: function(e, t, n) {
                return function(t) {
                    u.Events.add(n, e, t);
                }.bind(t);
            }.call(r, rt[a], r, i),
            enumerable: !0,
            configurable: !1
        });
        r.hasVerticalScrollBar = function() {
            var t = e.Element.getCompStyle(this, "overflowY");
            return null === this.offsetParent || "hidden" == t || "visible" == t ? !1 : "scroll" == t || this.scrollHeight > e.Element.viewportSize.getHeight();
        }.bind(r);
        var f = g({
            type: "div",
            className: "modal-dialog"
        });
        if (typeof n.style !== t) for (var p in n.style) f.style[p] = n.style[p];
        r.appendChild(f);
        var s = g({
            type: "div",
            className: "modal-content"
        });
        f.appendChild(s);
        var c = g({
            type: "div",
            className: "modal-header"
        });
        s.appendChild(c);
        var d = g({
            type: "div",
            className: "modal-body"
        });
        s.appendChild(d);
        var l = g({
            type: "div",
            className: "modal-footer"
        });
        s.appendChild(l), A(c, n.title);
        var m = g({
            type: "div",
            className: "yt-close-btn-wrapper",
            innerHTML: '<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-close-btn">',
            EventListeners: {
                click: {
                    capture: !1,
                    callback: function(e) {
                        var t = e.target.parentElement.parentElement.parentElement.parentElement.parentElement, n = parseInt(w(t, "data-jmod-modal"));
                        return u.hide(t, n, e);
                    }
                }
            }
        });
        if (c.appendChild(m), A(d, n.body), A(l, n.footer), typeof n.buttons !== t) for (var a in n.buttons) try {
            var h = e.extend(!0, {
                type: "button",
                text: "button"
            }, n.buttons[a]), o = g(h);
            o && (C(o, "btn") || j(o, "brn"), /btn\-(default|primary|success|info|warning|danger)/i.test(o.className) || j(o, "btn-default"), 
            l.appendChild(o));
        } catch (y) {
            _(y, "jMod.Modal.createModal", "footer buttons");
        }
        var b = g({
            type: "button",
            className: "btn btn-default",
            innerHTML: "Close",
            attributes: {
                type: "button"
            },
            EventListeners: {
                click: {
                    capture: !1,
                    callback: function(e) {
                        if (e.target === this) {
                            var t = e.target.parentElement.parentElement.parentElement.parentElement, n = parseInt(w(t, "data-jmod-modal"));
                            return u.hide(t, n, e), z(e), !1;
                        }
                    }
                }
            }
        });
        return l.appendChild(b), r;
    }, u.init = function() {
        u.Initialized = !0;
        var t = u.Container;
        null == t && (t = e.Element.document.createElement("div"), t.id = n(Ot), t.className = "jmod-na jmod-fa jmod-gi " + n(rn), 
        e.Element.document.body.appendChild(t)), (s || i).addEventListener("resize", function(t) {
            e.Modal.resize(t);
        });
    }, e.CSS = ".jmod-na .nav.nav-tabs{border-width:0px;border-right-width:1px !important;border-style:solid !important;-webkit-border-image:-webkit-gradient(linear,0 0,0 100%,from(rgba(221,221,221,1)),color-stop(65%,rgba(221,221,221,1)),to(rgba(0,0,0,0))) 1 100%;-webkit-border-image:-webkit-linear-gradient(rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;-moz-border-image:-moz-linear-gradient(rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;-o-border-image:-o-linear-gradient(rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;border-image:linear-gradient(to bottom,rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;}.jmod-na .no-vertical-scroll[data-jmod-modal]{overflow-y:hidden;}", 
    e.Config.Settings = e.extend({
        enabled: !0,
        cn: {
            modal: "jModSettingsModal"
        },
        id: {
            modal: "jModSettingsModal"
        }
    }, e.Config.Settings || {});
    var fn = "Settings.id.modal", Dt = "Settings.cn.modal", o = e.Settings = function(t, a) {
        if (!n("Settings.enabled")) return !1;
        if (e.Settings.Initialized || e.Settings.init(), "string" == typeof t) switch (t.toLowerCase()) {
          case "":        } else "object" == typeof t && (o._data = t, e.Settings.__storedData = r, 
        e.Settings.settingsModalElement = e.Settings.MakeSettingsModal(t), o.PrefTypes.onChange(), 
        e.Settings.onResize());
    };
    o.Initialized = !1, o.getDefault = function(n) {
        var t = 0, e = o._data;
        if (e && (e = e.settings)) for (t; t < e.length; t++) if (e[t].name == n) return e[t]["default"];
    }, o.get = function(e, a) {
        var n = o._storedData;
        return t === typeof e ? n : n && n[e] !== r ? n[e] : a ? r : o.getDefault(e);
    }, o.set = function(t, n) {
        var e = o._storedData || {};
        e[t] = n, o._storedData = e;
    }, o.clear = function() {
        o._storedData = {};
    }, Object.defineProperties(o, {
        _data: {
            value: {},
            writable: !0,
            enumerable: !1
        },
        __storedData: {
            value: r,
            enumerable: !1,
            writable: !0,
            configurable: !0
        },
        _storedData: {
            get: function() {
                if (typeof o.__storedData !== t) return o.__storedData;
                try {
                    var r = e.getValue("Settings_" + n("script.script_name"));
                    if (r) return JSON.parse(r);
                } catch (a) {}
            },
            set: function(t) {
                o.__storedData = t;
                try {
                    e.setValue("Settings_" + n("script.script_name"), JSON.stringify(t));
                } catch (r) {}
            },
            enumerable: !1
        },
        _settingsModalElement: {
            value: null,
            writable: !0,
            enumerable: !1,
            configurable: !0
        },
        settingsModalElement: {
            get: function() {
                return t !== typeof o._settingsModalElement && null != o._settingsModalElement ? o._settingsModalElement : o._settingsModalElement = e.$(".jModSettings");
            },
            set: function(e) {
                o._settingsModalElement = e;
            },
            enumerable: !0
        }
    }), o.PrefTypes = {
        _types: {},
        _call: function(n, e, a) {
            return typeof this._types[e] !== t && "function" == typeof this._types[e][n] ? this._types[e][n].apply(this._types[e], d.call(arguments, 2)) : r;
        },
        add: function(e, t) {
            this._types[e] = t;
        },
        make: function(e, t) {
            return this._call("make", e, t);
        },
        getValue: function(t) {
            var n = e.$('#jModSettingsModal [name="' + t.name + '"]');
            return n ? this._call("getValue", t.type, n, t) : r;
        },
        getValueByName: function(n) {
            var t, e = 0;
            try {
                t = o._data.settings;
            } catch (r) {
                return;
            }
            for (e; e < t.length; e++) if (t[e].name == n) return this.getValue(t[e]);
        },
        getDataByName: function(n) {
            var t, e = 0;
            try {
                t = o._data.settings;
            } catch (r) {
                return;
            }
            for (e; e < t.length; e++) if (t[e].name == n) return t[e];
        },
        setValue: function(t, a) {
            var n = e.$('#jModSettingsModal [name="' + t.name + '"]');
            return n ? this._call("setValue", t.type, n, t, a) : r;
        },
        enable: function(a) {
            var t, i, s, n = 0;
            if ("object" == typeof a) t = a; else if ("string" == typeof a) {
                try {
                    i = o._data.settings;
                } catch (l) {
                    return;
                }
                for (n; n < i.length; n++) if (i[n].name == a) {
                    t = i[n];
                    break;
                }
            }
            return t ? (s = e.$('#jModSettingsModal [name="' + t.name + '"]'), s ? this._call("enable", t.type, s, t) : r) : r;
        },
        disable: function(a) {
            var t, i, s, n = 0;
            if ("object" == typeof a) t = a; else if ("string" == typeof a) {
                try {
                    i = o._data.settings;
                } catch (l) {
                    return;
                }
                for (n; n < i.length; n++) if (i[n].name == a) {
                    t = i[n];
                    break;
                }
            }
            return t ? (s = e.$('#jModSettingsModal [name="' + t.name + '"]'), s ? this._call("disable", t.type, s, t) : r) : r;
        },
        onChange: function(f, m) {
            var r, a, c, s, l, i = !0, p, d, u = !1, n = 0;
            try {
                r = o._data.settings;
            } catch (h) {
                return;
            }
            for (n; n < r.length; n++) if (i = !0, r[n].depend && ("function" == typeof r[n].depend || t == typeof f || t !== typeof r[n].depend[f])) {
                if ("function" == typeof r[n].depend) d = e.$('#jModSettingsModal [name="' + r[n].name + '"]'), 
                i = r[n].depend(d, r[n]); else for (c in r[n].depend) {
                    a = r[n].depend[c], p = typeof a;
                    var g = o.PrefTypes.getDataByName(c);
                    try {
                        u = 1 == o.PrefTypes._types[g.type].multiValue;
                    } catch (h) {
                        u = !1;
                    }
                    switch (f == c ? s = m : t == typeof (s = this.getValueByName(c)) && (s = o.get(c)), 
                    u && (s = s.split(",")), p) {
                      case "function":
                        i = a(e.$('#jModSettingsModal [name="' + r[n].name + '"]'), r[n], s, g);
                        break;

                      case "object":
                        if ("array" == N(a)) if (u) {
                            for (l = 0; l < a.length; l++) if (-1 == s.indexOf(a[l])) {
                                i = !1;
                                break;
                            }
                        } else for (i = !1, l = 0; l < a.length; l++) if (a[l] == s) {
                            i = !0;
                            break;
                        }
                        break;

                      case "string":
                        if (u) {
                            for (a = a.split(","), l = 0; l < a.length; l++) if (-1 == s.indexOf(a[l])) {
                                i = !1;
                                break;
                            }
                        } else s != a && (i = !1);
                        break;

                      case "number":
                        u ? s.length < a && (i = !1) : parseInt(s) != parseInt(a) && (i = !1);
                    }
                    if (!i) break;
                }
                i ? o.PrefTypes.enable(r[n]) : o.PrefTypes.disable(r[n]);
            }
        }
    }, o.getElementId = function(e) {
        switch (e.toLowerCase()) {
          case "settings":
          case "settingselement":
          case "settingmodalselement":
            return "jModSettingsModal";
        }
        return null;
    }, o.getElement = function(e) {
        var t = o.getElementId(e);
        return document.getElementById(null != t ? t : e);
    }, o.PrefTypes.add("select", {
        make: function(e) {
            var c = e.description || e.name, s = e["default"] || null, l = o.get(e.name), a = l || s, i = [];
            for (var n in e.options) i.push({
                type: "option",
                innerHTML: e.options[n],
                attributes: {
                    value: n,
                    selected: a && a == n ? !0 : null
                }
            });
            var r = {
                type: "div",
                className: "pref-container",
                innerHTML: {
                    type: "select",
                    className: "form-control pref",
                    innerHTML: i,
                    style: e.style,
                    attributes: {
                        name: e.name,
                        "data-jmod-settings-pref": e.name,
                        "data-jmod-settings-pref-default": e["default"] || null,
                        "data-jmod-settings-pref-type": "select"
                    },
                    EventListeners: {
                        change: function(e) {
                            o.PrefTypes.onChange(e.target.getAttribute("name"), e.target.value);
                        }
                    }
                }
            };
            return t == typeof e.tooltip || t == typeof e.tooltip.innerHTML && t == typeof e.tooltip.text || (r.innerHTML = I(r.innerHTML, e.tooltip)), 
            r;
        },
        getValue: function(e, t) {
            return e.options[e.selectedIndex].value;
        },
        setValue: function(t, r, n) {
            for (var e = 0; e < t.options.length; e++) if (t.options[e].value == n) return t.selectedIndex = e, 
            !0;
            return !1;
        },
        enable: function(e, t) {
            e.hasAttribute("disabled") && e.removeAttribute("disabled");
        },
        disable: function(e, t) {
            e.setAttribute("disabled", "disabled");
        }
    }), o.PrefTypes.add("checkbox", {
        multiValue: !0,
        make: function(e) {
            var u = e.description || e.name, l = e["default"] || "", a = o.get(e.name), r = a || "" === a ? a : l;
            "object" != typeof r && (r = r.split(","));
            var s = [];
            for (var n in e.options) {
                var i = {
                    type: "label",
                    className: "checkbox-inline",
                    innerHTML: [ {
                        type: "input",
                        className: "checkbox",
                        attributes: {
                            name: e.name + "-o",
                            type: "checkbox",
                            value: n
                        },
                        checked: -1 != r.indexOf(n) ? !0 : !1,
                        EventListeners: {
                            CheckboxStateChange: function(t) {
                                var e = t.target.parentElement.parentElement.getAttribute("name"), n = o.PrefTypes.getValueByName(e);
                                o.PrefTypes.onChange(e, n);
                            }
                        }
                    }, {
                        type: "span",
                        innerHTML: e.options[n].label,
                        attributes: {}
                    } ],
                    attributes: {}
                };
                t == typeof e.options[n].tooltip || t == typeof e.options[n].tooltip.innerHTML && t == typeof e.options[n].tooltip.text || (i.innerHTML[1] = I(i.innerHTML[1], e.options[n].tooltip)), 
                s.push(i);
            }
            var c = {
                type: "div",
                className: "form-group pref-container",
                innerHTML: s,
                attributes: {
                    name: e.name
                }
            };
            return c;
        },
        getValue: function(a, o) {
            for (var n = [], r = e.$$("input:checked", a), t = 0; t < r.length; t++) n.push(r[t].value);
            return n.join(",");
        },
        setValue: function(t, a, n) {
            for (var r = n.split(","), e = 0; e < t.options.length; e++) t.options[e].checked = -1 != r.indexOf(w(t.options[e], "name")) ? !0 : !1;
            return !0;
        },
        enable: function(r, a) {
            for (var n = e.$$("input", r), t = 0; t < n.length; t++) n[t].hasAttribute("disabled") && n[t].removeAttribute("disabled");
        },
        disable: function(r, a) {
            for (var n = e.$$("input", r), t = 0; t < n.length; t++) n[t].setAttribute("disabled", "disabled");
        }
    }), o.PrefTypes.add("radio", {
        make: function(e) {
            var u = e.description || e.name, i = e["default"] || "", s = o.get(e.name), l = s || i, a = [];
            for (var n in e.options) {
                var r = {
                    type: "label",
                    className: "radio radio-inline",
                    innerHTML: [ {
                        type: "input",
                        className: "radiobox",
                        attributes: {
                            type: "radio",
                            value: n,
                            name: e.name + "-o"
                        },
                        checked: -1 != l.indexOf(n) ? !0 : !1,
                        EventListeners: {
                            RadioStateChange: function(t) {
                                var e = t.target.parentElement.parentElement.getAttribute("name"), n = o.PrefTypes.getValueByName(e);
                                o.PrefTypes.onChange(e, n);
                            }
                        }
                    }, {
                        type: "span",
                        innerHTML: e.options[n].label,
                        attributes: {}
                    } ],
                    attributes: {}
                };
                t == typeof e.options[n].tooltip || t == typeof e.options[n].tooltip.innerHTML && t == typeof e.options[n].tooltip.text || (r.innerHTML[1] = I(r.innerHTML[1], e.options[n].tooltip)), 
                a.push(r);
            }
            var c = {
                type: "div",
                className: "form-group pref-container",
                innerHTML: a,
                attributes: {
                    name: e.name
                }
            };
            return c;
        },
        getValue: function(t, n) {
            return e.$("input:checked", t).value;
        },
        setValue: function(t, r, n) {
            for (var e = 0; e < t.options.length; e++) t.options[e].checked = w(t.options[e], "name") == n ? !0 : !1;
            return !0;
        },
        enable: function(r, a) {
            for (var n = e.$$("input", r), t = 0; t < n.length; t++) n[t].hasAttribute("disabled") && n[t].removeAttribute("disabled");
        },
        disable: function(r, a) {
            for (var n = e.$$("input", r), t = 0; t < n.length; t++) n[t].setAttribute("disabled", "disabled");
        }
    }), o.PrefTypes.add("toggle", {
        multiValue: !0,
        make: function(e) {
            var u = e.description || e.name, s = e["default"] || "", r = o.get(e.name), l = r || "" === r.trim() ? r : s, i = [];
            for (var n in e.options) {
                var a = {
                    type: "label",
                    className: "toggle " + (e.options[n].className || ""),
                    innerHTML: [ {
                        type: "input",
                        className: "radiobox",
                        attributes: {
                            type: "checkbox",
                            value: n,
                            name: e.name + "-o"
                        },
                        checked: -1 != l.indexOf(n) ? !0 : !1,
                        EventListeners: {
                            RadioStateChange: function(t) {
                                var e = t.target.parentElement.parentElement.getAttribute("name"), n = o.PrefTypes.getValueByName(e);
                                o.PrefTypes.onChange(e, n);
                            }
                        }
                    }, {
                        type: "i",
                        className: "",
                        attributes: {
                            "data-jmod-swchon-text": e.options[n].on || "ON",
                            "data-jmod-swchoff-text": e.options[n].off || "OFF"
                        }
                    }, e.options[n].label ],
                    attributes: {}
                };
                t == typeof e.options[n].tooltip || t == typeof e.options[n].tooltip.innerHTML && t == typeof e.options[n].tooltip.text || (a.innerHTML[1] = I(a.innerHTML[1], e.options[n].tooltip)), 
                i.push(a);
            }
            var c = {
                type: "div",
                className: "form-group pref-container",
                innerHTML: i,
                attributes: {
                    name: e.name
                }
            };
            return c;
        },
        getValue: function(a, o) {
            for (var n = [], r = e.$$("input:checked", a), t = 0; t < r.length; t++) n.push(r[t].value);
            return n.join(",");
        },
        setValue: function(t, a, n) {
            for (var r = n.split(","), e = 0; e < t.options.length; e++) t.options[e].checked = -1 != r.indexOf(w(t.options[e], "name")) ? !0 : !1;
            return !0;
        },
        enable: function(r, a) {
            for (var n = e.$$("input", r), t = 0; t < n.length; t++) n[t].hasAttribute("disabled") && n[t].removeAttribute("disabled");
        },
        disable: function(r, a) {
            for (var n = e.$$("input", r), t = 0; t < n.length; t++) n[t].setAttribute("disabled", "disabled");
        }
    }), o.PrefTypes.add("input", {
        make: function(e) {
            var s = e.description || e.name, a = e["default"] || "", r = o.get(e.name), n = {
                type: "div",
                className: "pref-container",
                innerHTML: [ {
                    type: "input",
                    className: "form-control pref",
                    innerHTML: "",
                    style: e.style,
                    attributes: {
                        value: r || "" === r ? r : a,
                        name: e.name,
                        type: "text",
                        "data-jmod-settings-pref": e.name,
                        "data-jmod-settings-pref-default": e["default"] || null
                    },
                    EventListeners: {
                        input: function(e) {
                            o.PrefTypes.onChange(e.target.getAttribute("name"), e.target.value);
                        }
                    }
                } ]
            };
            if (t == typeof e.tooltip || t == typeof e.tooltip.innerHTML && t == typeof e.tooltip.text || (n.innerHTML[0] = I(n.innerHTML[0], e.tooltip)), 
            t != typeof e.icon) {
                n.className += " input-icon-right";
                var i = kt(e.icon);
                n.innerHTML.unshift(i);
            }
            return n;
        },
        getValue: function(e, t) {
            return e.value;
        },
        setValue: function(e, n, t) {
            return e.value = t, !0;
        },
        enable: function(e, t) {
            e.hasAttribute("disabled") && e.removeAttribute("disabled");
        },
        disable: function(e, t) {
            e.setAttribute("disabled", "disabled");
        }
    }), o.PrefTypes.add("textarea", {
        make: function(e) {
            var s = e.description || e.name, i = e["default"] || "", r = o.get(e.name), n = {
                type: "div",
                className: "pref-container",
                innerHTML: [ {
                    type: "textarea",
                    className: "form-control pref",
                    innerHTML: r || "" === r ? r : i,
                    style: e.style,
                    attributes: {
                        name: e.name,
                        type: "text",
                        "data-jmod-settings-pref": e.name,
                        "data-jmod-settings-pref-default": e["default"] || null
                    },
                    EventListeners: {
                        input: function(e) {
                            o.PrefTypes.onChange(e.target.getAttribute("name"), e.target.value);
                        }
                    }
                } ]
            };
            if (t == typeof e.tooltip || t == typeof e.tooltip.innerHTML && t == typeof e.tooltip.text || (n.innerHTML[0] = I(n.innerHTML[0], e.tooltip)), 
            t != typeof e.icon) {
                var a = kt(e.icon);
                a.className += " icon-append", n.innerHTML.unshift(a);
            }
            return n;
        },
        getValue: function(e, t) {
            return e.value;
        },
        setValue: function(e, n, t) {
            return e.value = t, !0;
        },
        enable: function(e, t) {
            e.hasAttribute("disabled") && e.removeAttribute("disabled");
        },
        disable: function(e, t) {
            e.setAttribute("disabled", "disabled");
        }
    }), o.PrefTypes.add("range", {
        make: function(e) {
            var i = e.description || e.name, r = e["default"] || "", a = o.get(e.name), n = {
                type: "div",
                className: "pref-container",
                innerHTML: [ {
                    type: "input",
                    className: "form-control pref",
                    innerHTML: "",
                    style: e.style,
                    min: parseInt(e.min || "0"),
                    max: parseInt(e.max || "100"),
                    step: parseInt(e.step || "1"),
                    value: parseInt(a || r),
                    attributes: {
                        name: e.name,
                        type: "range",
                        "data-jmod-settings-pref": e.name,
                        "data-jmod-settings-pref-default": e["default"] || null
                    },
                    EventListeners: {
                        change: function(e) {
                            var t = e.target.nextSibling;
                            t.value = this.value;
                        },
                        input: function(e) {
                            var t = e.target.nextSibling;
                            t.value = this.value;
                        }
                    }
                }, {
                    type: "input",
                    className: "form-control pref disabled range-value",
                    innerHTMLL: "",
                    attributes: {
                        value: a || r,
                        disabled: "disabled"
                    },
                    EventListeners: {
                        keypress: function(e) {
                            c.log("keypress", e);
                        }
                    }
                } ]
            };
            return t == typeof e.tooltip || t == typeof e.tooltip.innerHTML && t == typeof e.tooltip.text || (n.innerHTML[0] = I(n.innerHTML[0], e.tooltip)), 
            n;
        },
        getValue: function(e, t) {
            return e.value;
        },
        setValue: function(e, n, t) {
            return e.value = t, !0;
        },
        enable: function(e, t) {
            e.hasAttribute("disabled") && e.removeAttribute("disabled");
        },
        disable: function(e, t) {
            e.setAttribute("disabled", "disabled");
        }
    });
    var K = function(t, n, r) {
        t.innerHTML = r || "", t.style.backgroundImage = "url(" + n + ")", t.setAttribute("data-src", n);
        var e = new Image();
        e.onload = function() {
            var n = parseInt(e.naturalHeight) + "px", r = parseInt(e.naturalWidth) + "px";
            isNaN(e.naturalHeight) || isNaN(e.naturalWidth) || (parseInt(n) > 300 ? (n = "300px", 
            r = "100%", t.style.backgroundSize = "contain") : t.style.backgroundSize = "100% 100%", 
            t.style.height = n, t.style.width = r), e.parentElement.removeChild(e);
        }, e.style.position = "absolute", e.style.opacity = "0", (s || i).document.body.appendChild(e), 
        e.src = n;
    };
    o.PrefTypes.add("imagefile", {
        make: function(n) {
            var l = n["default"] || "", c = o.get(n.name), s = c || l, r = "string" == typeof s && "" != s ? !0 : !1, a = new e.FileSelector({
                multiple: !1,
                accept: "image/*",
                button: {
                    style: n.style,
                    className: "btn btn-success",
                    innerHTML: [ '<i class="fa ' + (n.buttonIcon || "fa-file-image-o") + '" style="margin-right:10px;"></i>', n.buttonText || "Select an Image" ],
                    attributes: {
                        type: "button"
                    }
                },
                form: {
                    className: "imagefile-form pref",
                    attributes: {
                        name: n.name,
                        "data-jmod-settings-pref": n.name,
                        "data-jmod-settings-pref-default": n["default"] || null
                    }
                },
                onChange: function(n, t, r) {
                    e.FileSelector.ReadFileAsURL(t[0], function(n, e, r) {
                        var t = a.formElement.parentElement.lastChild;
                        K(t, e, ""), o.PrefTypes.onChange(a.formElement.getAttribute("name"), e);
                    }, function(t, n, r) {
                        var e = a.formElement.parentElement.lastChild;
                        K(e, "", "No Preview"), o.PrefTypes.onChange(a.formElement.getAttribute("name"), "");
                    });
                }
            }), i = {
                type: "div",
                className: "pref-container",
                innerHTML: [ a.formElement, g({
                    type: "div",
                    className: "image-preview-container",
                    style: {},
                    attributes: {},
                    innerHTML: r ? "" : "No Preview"
                }) ]
            };
            return b.DOMLoaded ? K(i.innerHTML[1], r ? s : "", r ? "" : "No Preview") : setTimeout(K, 150, i.innerHTML[1], r ? s : "", r ? "" : "No Preview"), 
            t == typeof n.tooltip || t == typeof n.tooltip.innerHTML && t == typeof n.tooltip.text || (i.innerHTML[0] = I(i.innerHTML[0], n.tooltip)), 
            i;
        },
        getValue: function(e, n) {
            try {
                var t = e.parentElement.lastChild;
                return t.getAttribute("data-src");
            } catch (r) {
                return "";
            }
        },
        setValue: function(t, r, e) {
            var n = t.parentElement.lastChild;
            return K(n, e, e && "" != e ? "" : "No Preview"), !0;
        },
        enable: function(e, t) {
            e.hasAttribute("disabled") && e.removeAttribute("disabled");
        },
        disable: function(e, t) {
            e.setAttribute("disabled", "disabled");
        }
    }), o.MakePref = function(e) {
        var n;
        if (p(e) || "element" == e.type) return n = {
            type: "div",
            className: "row form-group section-row",
            innerHTML: {
                type: "div",
                className: "col-md-12",
                innerHTML: p(e) ? e : e.innerHTML || e.options || e["default"]
            }
        }, g(n);
        var a = o.PrefTypes.make(e.type, e);
        if (a) {
            var i = Ft(e);
            switch (e.type) {
              case "radio":
              case "checkbox":
              case "toggle":
                t == typeof e.tooltip || t == typeof e.tooltip.innerHTML && t == typeof e.tooltip.text || (n = I(i.innerHTML, e.tooltip));
            }
            return n = {
                type: "div",
                className: "row form-group section-row",
                innerHTML: [ i, {
                    type: "div",
                    className: "col-md-8",
                    innerHTML: a
                } ]
            }, g(n);
        }
        return r;
    }, o.MakeSettingsModal = function(i) {
        var l = {}, a, M, v, m = !1, _ = g({
            type: "div",
            className: "jMod-settings tabbable tabs-left"
        }), T = g({
            type: "ul",
            className: "nav nav-tabs"
        }), j = g({
            type: "div",
            className: "tab-content"
        });
        for (var s in i.settings) {
            var a = i.settings[s].tab || "Other", d = i.settings[s].section || "General";
            typeof l[a] === t && (l[a] = {
                name: a,
                color: null,
                sections: {}
            }), typeof l[a].sections[d] === t && (l[a].sections[d] = []), l[a].sections[d].push(i.settings[s]);
        }
        if (i.tabs) for (var s in i.tabs) a = i.tabs[s].name, a && typeof l[a] !== t && (i.tabs[s].displayName && (l[a].displayName = i.tabs[s].displayName), 
        i.tabs[s].content && (i.tabs[s].content.header && (l[a].contentHeader = i.tabs[s].content.header), 
        i.tabs[s].content.footer && (l[a].contentFooter = i.tabs[s].content.footer)));
        var f = i.tabOrder || [], b = {}, u = 0;
        for (a in l) {
            m = i.activeTab !== r && a === i.activeTab || i.activeTab === r && 0 == u ? !0 : !1, 
            M = y.makeNavElement({
                innerHTML: l[a].displayName || a,
                id: "jMod-settings-tab-" + u,
                isActive: m,
                contentId: "jMod-settings-tab-" + u + "-content",
                index: u
            });
            var h = [];
            l[a].contentHeader && h.push(l[a].contentHeader);
            for (var d in l[a].sections) {
                h.push('<div class="row section-title-row"><div class="col-md-12"><h3 class="section-title">' + d + "</h3></div></div>");
                for (var C in l[a].sections[d]) h.push(o.MakePref(l[a].sections[d][C]));
            }
            l[a].contentFooter && h.push(l[a].contentFooter), v = y.makeContentElement({
                name: a,
                id: "jMod-settings-tab-" + u + "-content",
                isActive: m,
                innerHTML: h,
                index: u
            }), b[a] = [ M, v ], -1 == f.indexOf(a) && f.push(a), u++;
        }
        if (i.tabs) for (var s in i.tabs) a = i.tabs[s].name, a && l[a] === r && (m = i.activeTab !== r && a === i.activeTab || i.activeTab === r && 0 == u ? !0 : !1, 
        M = y.makeNavElement({
            innerHTML: a,
            id: "jMod-settings-tab-" + u,
            isActive: m,
            contentId: "jMod-settings-tab-" + u + "-content",
            index: u
        }), v = y.makeContentElement({
            name: a,
            id: "jMod-settings-tab-" + u + "-content",
            isActive: m,
            innerHTML: i.tabs[s].innerHTML || i.tabs[s].text,
            index: u
        }), b[a] = [ M, v ], -1 == f.indexOf(a) && f.push(a), u++);
        for (var s = 0; s < f.length; s++) b[f[s]] !== r && (A(T, b[f[s]][0]), A(j, b[f[s]][1]));
        A(_, T), A(_, j);
        var E = i.title || "Settings";
        p(E) || (E = '<h2 class="title">' + E + "</h2>");
        var S = {
            title: E,
            id: o.getElementId("settingModalsElement"),
            className: n(Dt),
            body: _,
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
                        capture: !1,
                        callback: function(e) {
                            var t = confirm("Are you sure?");
                            return t && o.clear(), z(e), !1;
                        }
                    }
                }
            } ],
            buttons: [ {
                text: "Save",
                className: "btn btn-success",
                EventListeners: {
                    click: function() {
                        c.log("save button click"), o.save();
                    }
                }
            } ],
            onAfterShow: function() {
                o.onResize();
            },
            style: {
                width: "1000px"
            },
            features: {
                enableTabs: !0,
                enableTooltips: !0
            }
        };
        return typeof i.onBeforeHide !== t && (S.onBeforeHide = i.onBeforeHide), typeof i.onAfterHide !== t && (S.onAfterHide = i.onAfterHide), 
        e.Modal(S);
    }, o.onResize = function() {
        var t = e.Settings.settingsModalElement, l = e.$(".modal-dialog", t), n = e.$(".modal-body", t), a = e.$(".modal-footer", t), o = e.$(".modal-header", t), p = e.Element.viewportSize.getHeight(), r = (s || i).getComputedStyle(l, null), u = parseInt(r.getPropertyValue("margin-top")), f = parseInt(r.getPropertyValue("margin-bottom")), d = parseInt(p) - parseInt(o.offsetHeight) - parseInt(a.offsetHeight) - u - f - 15;
        n.style.maxHeight = d + "px";
        var c = e.$(".nav-tabs", n);
        e.Tabs.resize(c);
    }, o.show = function() {
        e.Modal.show(o.settingsModalElement || 0), setTimeout(function() {
            o.onResize();
        }, 1);
    }, o.hide = function() {
        e.Modal.hide(o.settingsModalElement);
    }, o.save = function() {
        c.log("Saving");
        for (var e = o._data, r = {}, t = 0; t < e.settings.length; t++) {
            var n = e.settings[t];
            if (!p(e) && "element" != n.type) {
                var a = o.PrefTypes.getValue(n);
                r[n.name] = a;
            }
        }
        o._storedData = r;
    }, o.init = function() {
        o.Initialized = !0;
    }, e.CSS = ".jmod-na .modal-body{min-height:200px;max-height:500px;overflow-y:auto;}", 
    e.getDOMTiming = function() {
        var r, t = {};
        try {
            if (k.available) {
                var c = [ "unloadEventStart", "unloadEventEnd", "navigationStart" ];
                r = k.getAllTiming();
                var s = k.get("timing.navigationStart");
                for (var n in r) t[n] = r[n] - s, (t[n] <= 0 || isNaN(t[n])) && delete t[n];
                var a = (k.get("timing.loadEventEnd") || k.get("timing.loadEventStart")) - k.get("timing.navigationStart");
                a > 0 && (t.pageLoadTime = a);
                var o = k.get("timing.responseEnd") - k.get("timing.fetchStart");
                o >= 0 && (t.NetworkLatency = o);
                var i = k.now;
                i > 0 && (t.statReportTime = i), e.InitializeEndTime > 0 && (t.jModInitializeEnd = e.InitializeEndTime), 
                e.InitializeStartTime >= 0 && (t.jModInitializeStart = e.InitializeStartTime, e.InitializeEndTime > 0 && e.InitializeEndTime - e.InitializeStartTime > 0 && (t.jModInitializeTime = e.InitializeEndTime - e.InitializeStartTime), 
                ot > 0 && ot - e.InitializeStartTime > 0 && (t.jModReadyTime = ot - e.InitializeStartTime));
            }
        } catch (l) {
            return _(l, "jMod.getDOMTiming"), {};
        }
        return t;
    };
    var v = e.SendMessage = function(n) {
        switch (e.jQueryAvailable || "jquery" != n.method.toLowerCase() ? typeof GM_xmlhttpRequest === t && "xmlhttprequest" == n.method.toLowerCase() && (n.method = e.jQueryAvailable ? "jQuery" : "JSONP") : n.method = typeof GM_xmlhttpRequest !== t ? "XMLHTTPRequest" : "JSONP", 
        n.url = e.SendMessage.processURL(n), (n.method || "XMLHTTPRequest").toLowerCase()) {
          case "jquery":
            return e.debug && c.log("jMod.SendMessage - jquery", n), e.SendMessage.jQuery(n);
            break;

          case "xmlhttprequest":
            return e.debug && c.log("jMod.SendMessage - xmlhttprequest", n), e.SendMessage.XMLHTTPRequest(n);
            break;

          case "jsonp":
          default:
            e.debug && c.log("jMod.SendMessage - JSONP", n), e.SendMessage.JSONP(n);
        }
    }, Mt = "jModSendMessageResponseFn";
    v.processURL = function(e) {
        var t = "string" == typeof e.callback ? e.callback : Mt;
        switch ("object" != typeof e.url && -1 == e.url.indexOf("?") && (e.url += "?"), 
        e.method.toLowerCase()) {
          case "jsonp":
            e.url instanceof ct ? (e.url.addArg("callback", t), e.url.addArg("jsonp", t)) : e.url += "&callback=" + t + "&jsonp=" + t;
            break;

          case "xmlhttprequest":
            e.url instanceof ct ? e.url.addArg("json", "1") : e.url += "&json=1";
            break;

          case "jquery":
            e.responseType && "json" == e.responseType && (e.url instanceof ct ? e.url.addArg("json", "1") : e.url += "&json=1");
        }
        return e.url;
    }, v.jQuery = function(e) {
        var n = "string" == typeof e.callback ? e.callback : Mt, t = v.addCallbacks(e);
        try {
            $.getJSON("" + e.url, {
                async: !0,
                format: "json"
            }).done(function(e, n, r) {
                v.execCallback(t, null, e, n, r);
            }).fail(function(e, n, r) {
                v.execErrorCallback(t, null, e, n, r);
            });
        } catch (r) {
            return !1;
        }
        return !0;
    }, v.XMLHTTPRequest = function(e) {
        try {
            if (typeof GM_xmlhttpRequest !== t) {
                var n = v.addCallbacks(e);
                return GM_xmlhttpRequest({
                    method: "GET",
                    url: "" + e.url,
                    headers: {
                        Accept: "application/javascript"
                    },
                    onload: function(e, t) {
                        return function(n) {
                            if ("json" != t.toLowerCase()) return v.execCallback(e, null, n.responseText, n);
                            var r;
                            try {
                                r = JSON.parse(n.responseText);
                            } catch (a) {} finally {
                                return v.execCallback(e, null, r, n);
                            }
                        };
                    }(n, e.responseType || "json"),
                    onerror: function(e) {
                        return function(t) {
                            return c.log("Error! XMLHttpRequest", t), v.execErrorCallback(e, null, t.responseText, t);
                        };
                    }(n)
                }), !0;
            }
        } catch (r) {
            c.log("Error! getXMLHttpRequest", r);
        } finally {
            return !1;
        }
    }, v.JSONP = function(e) {
        var t = v.addCallbacks(e), n = g({
            type: "script",
            async: !0,
            defer: !0,
            attributes: {
                "data-callback-index": t
            }
        });
        try {
            var r = document.head || document.getElementsByTagName("head")[0];
            r.appendChild(n), n.src = "" + e.url;
        } catch (a) {
            return v.execErrorCallback(t, null, a);
            return !1;
        }
        return !0;
    }, v._callbacks = [], v.addCallbacks = function(e) {
        return v._callbacks.push({
            complete: e.callback,
            error: e.onerror
        }) - 1;
    }, v.execCallback = function(r, n) {
        try {
            var e = v._callbacks[r].complete;
            if (typeof e === t) return !1;
            if ("function" == typeof e) return e.apply(n || null, d.call(arguments, 2));
            if ("string" == typeof e && "function" == typeof i[e]) return i[e].apply(n || null, d.call(arguments, 2));
        } catch (a) {
            return c.log("Error SendMessage.execCallback!", a), !1;
        }
    }, v.execErrorCallback = function(r, n) {
        try {
            var e = v._callbacks[r].onerror;
            if (typeof e === t) return !1;
            if ("function" == typeof e) return e.apply(n || null, d.call(arguments, 2));
            if ("string" == typeof e && "function" == typeof i[e]) return i[e].apply(n || null, d.call(arguments, 2));
        } catch (a) {
            return c.log("Error SendMessage.execErrorCallback!", a), !1;
        }
    }, v._globalResponseCallback = lt(Vt, i, {
        defineAs: Mt,
        allowCallbacks: !0,
        allowCrossOriginArguments: !0
    }), e.Update = new function() {
        var a = function() {
            var t = [ !0 ].concat(d.call(arguments), {
                script_info: n("script.script_info"),
                script_file_info: n("script.script_file_info") || r
            });
            return e.extend.apply(e, t);
        };
        this.getURL = function(d) {
            opts = a({}, e.Config.Update, d);
            var r = new ct(n("host") || "http://myuserjs.org"), s = (opts.username || n("script.username")).trim();
            if (typeof s === t || "" == s) throw "No Username Provided";
            var l = (opts.script_name || n("script.script_name")).trim();
            if (typeof l === t || "" == l) throw "No Script Name Provided";
            var o = opts.getType || n("Update.getType");
            "meta" != o && "metajs" != o && "data" != o && "none" != o && (o = "data");
            var c = opts.args;
            if (opts.DOMTiming) {
                var u = e.getDOMTiming();
                for (var i in u) u.hasOwnProperty(i) && (c[i] = u[i]);
            }
            var f = [];
            for (var i in c) f.push(i + "=" + c[i]);
            r.addArg("args", escape(f.join(","))), r.addArg("api_version", e.version), r.addArg("updateVeriableName", opts.updateVeriableName), 
            typeof opts.noDownload !== t && 1 == opts.noDownload ? r.addArg("nodownload", "1") : n("Update.sampleRate") < 100 && Math.floor(100 * Math.random() + 1) > n("Update.sampleRate") && r.addArg("nodownload", "1"), 
            n("Update.getStats") && r.addArg("getstats", "1"), typeof opts.script_info !== t && (typeof opts.script_info.version !== t && r.addArg("scriptversion", escape(opts.script_info.version)), 
            typeof opts.script_info.script_handler !== t && (r.addArg("scripthandler", escape(opts.script_info.script_handler)), 
            typeof opts.script_info.script_handler_version !== t && r.addArg("scripthandlerversion", escape(opts.script_info.script_handler_version)))), 
            r.addArg("cachebuster", Math.round(new Date().getTime() / 1e3));
            var p = n("host") || "myuserjs.org";
            return r.setPath("/script/" + s + "/" + l + "." + o + ".js"), r;
        }, this.sendRequest = function(f) {
            try {
                var o = a({}, e.Config.Update, f);
                typeof i[o.updateVeriableName] !== t && (i[o.updateVeriableName] = r, delete i[o.updateVeriableName]);
                var u = e.Update.getURL(o);
                n("debug") && e.Log("URL: ", "" + u);
                var l = "JSONP";
                return o.jQuery ? l = "jQuery" : o.XMLHttpRequest && (l = "XMLHTTPRequest"), e.SendMessage({
                    url: "" + u,
                    method: l,
                    responseType: "json",
                    callback: function(e, t) {
                        return function(n) {
                            return i[t] = n, e.apply(this, arguments);
                        };
                    }(o.callback, o.updateVeriableName),
                    onerror: o.onerror
                });
            } catch (s) {
                return c.log("Error! getUpdateData: ", s.name, s.fileName, s.lineNumber + ":" + s.columnNumber), 
                c.error(s), o.callback && o.onerror(s), r;
            }
        }, this.getUpdateData = function(e) {
            return this.sendRequest(e);
        };
    }(), Object.defineProperty(e.Update, "MetaData", {
        get: function(e) {
            return typeof i[e || n("Update.updateVeriableName")] !== t ? i[e || n("Update.updateVeriableName")] : typeof s[e || n("Update.updateVeriableName")] !== t ? s[e || n("Update.updateVeriableName")] : r;
        }
    }), +function() {
        function n() {
            var n, e = {}, a = t != typeof arguments[0] ? arguments[0] : r, o = arguments.length;
            if (o > 0 && ("string" == typeof a ? (e.message = a, o > 1 && (e.fileName = arguments[1]), 
            o > 2 && (e.lineNumber = arguments[2]), o > 3 && (e.columnNumber = arguments[3]), 
            o > 4 && arguments[4] instanceof Error && (e.e = arguments[4])) : a instanceof Error ? e.e = a : e = a, 
            e.e)) try {
                n = e.e, this.stack = n.stack;
            } catch (i) {}
            n || (n = Error(), n.stack && (this.stack = "undefined" != typeof Components ? n.stack.substring(n.stack.indexOf("\n") + 1) : "undefined" != typeof chrome || "undefined" != typeof process ? n.stack.replace(/\n[^\n]*/, "") : n.stack)), 
            this.message = t !== typeof e.message ? e.message : n.message, this.fileName = t !== typeof e.fileName ? e.fileName : n.fileName, 
            this.lineNumber = t !== typeof e.lineNumber ? e.lineNumber : n.lineNumber, this.columnNumber = t !== typeof e.columnNumber ? e.columnNumber : n.columnNumber, 
            this.toString = function() {
                return this.name + ": " + this.message;
            };
        }
        n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, e.UserError = n;
    }(), e.ERROR = new function() {
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
        }, Object.defineProperties(this.ERROR_CODES, wt), Object.defineProperty(this.ERROR_CODES, "get", {
            value: function(t, n) {
                return r === n ? e.ERROR.ERROR_CODES.SearchForKey(t) : e.ERROR.ERROR_CODES.setKeyValue(t, n);
            },
            enumerable: !1
        }), this.getCode = function(t) {
            var e = this.ERROR_CODES.get(t);
            return r !== e ? +e.toString(2) : r;
        };
        var t = function(r, a, o, i, e, t) {
            try {
                if (n("script.script_info.userscript_full_file_name") == t[0].fileName) {
                    switch (c.log("Error is from userscript!"), e.name) {
                      case "EvalError":
                      case "InternalError":
                      case "RangeError":
                      case "ReferenceError":
                      case "SyntaxError":
                      case "TypeError":
                      case "URIError":                    }
                    return !0;
                }
            } catch (s) {} finally {
                return !1;
            }
        };
        this.send = function(n) {
            try {
                var t = e.extend(!0, {}, e.Config.Update, n);
                return r === t.args && (t.args = {}), r === t.args.scriptError && (t.args.scriptError = "1"), 
                r === t.args.scriptErrorCode && (t.args.scriptErrorCode = "-1"), t.getType = "none", 
                t.noDownload = !0, e.UPDATE.sendRequest(t);
            } catch (a) {
                return c.log("Error! Error.send: ", a), r;
            }
        }, this.catchError = function(u, f, o, i, a, s) {
            try {
                if (c.log("stackInfo", s), r !== a && r !== a.stack) {
                    var l = d.call(arguments, 0);
                    if (n("Error.autoReportErrors")) {
                        var t = n("Error.errorFilter").apply(this, l);
                        if (t) {
                            var e = {
                                getType: "none",
                                args: {}
                            };
                            switch (e.args.scriptErrorLineNumber = o, e.args.scriptErrorColNumber = i, typeof t) {
                              case "object":
                                e.args = merge(e.args, t);
                                break;

                              case "number":
                              case "string":
                                e.args.scriptError = t;
                                break;

                              case "boolean":
                                e.args.scriptError = "1";
                            }
                        }
                    }
                }
            } catch (p) {}
            return !1;
        }, this.processError = function(t) {
            var n = "";
            try {
                n = "" + t.stack;
            } catch (t) {}
            var r = {
                message: t.message,
                name: t.name,
                fileName: t.fileName,
                lineNumber: t.lineNumber,
                columnNumber: t.columnNumber,
                stack: n
            };
            return e.ERROR.catchError(t.message, t.fileName, t.lineNumber, t.columnNumber, r, e.parseStack(n));
        };
    }(), lt(Gt, i, {
        defineAs: "jModListenError",
        allowCallbacks: !0,
        allowCrossOriginArguments: !0
    });
    var qt = function() {
        function t(l, a, o, c, t) {
            var e = "undefined" != typeof document ? document.defaultView : null != this.top ? this : null, n = null != this.console ? this.console : e.console;
            n.log("tErrHandle", l, a, o, t);
            try {
                var i = {}, s = "";
                if (t) {
                    try {
                        s = t.stack + "";
                    } catch (u) {
                        n.log("Error eObj.stack.toString", u);
                    }
                    i = {
                        message: t.message,
                        name: t.name,
                        fileName: t.fileName,
                        lineNumber: t.lineNumber,
                        columnNumber: t.columnNumber,
                        stack: s,
                        url: a
                    };
                } else i = {
                    message: l,
                    name: null,
                    fileName: null,
                    lineNumber: o,
                    columnNumber: c,
                    stack: s,
                    url: a
                };
                var f;
                f = "undefined" != typeof jModListenError ? jModListenError : e.jModListenError ? e.jModListenError : document.defaultView.jModListenError, 
                f(l, a, o, c, i);
            } catch (u) {
                n.log("error calling jModListenError", u, e);
            }
            for (var r = e._jModErrorHandlerStack.length - 1; r >= 0; r--) try {
                if (!0 === e._jModErrorHandlerStack[r].apply(this, arguments)) return !0;
            } catch (u) {
                n.log("Error processing error handler", e._jModErrorHandlerStack[r]);
            }
            try {
                if (e._origErrorHandler) return e._origErrorHandler.apply(this, arguments);
            } catch (u) {}
            return !1;
        }
        var e = r !== this.document ? this.document.defaultView : "undefined" != typeof document ? document.defaultView : null != this.top ? this : null, n = null != e.console ? e.console : this.console;
        if (!e._jModErrorHandlerStack) {
            e._origErrorHandler = e.onerror, e._jModErrorHandlerStack = [], e.onerror = t;
            try {
                e.__defineSetter__("onerror", function(t) {
                    e._jModErrorHandlerStack.push(t);
                });
            } catch (a) {}
        }
    };
    t == typeof e.Config.script.script_info && t != typeof GM_info && E.set(), +function() {
        function o(o) {
            return b.headAvailable || e.Element.head && n.headAvailable(), b.DOMLoaded || -1 != [ "interactive", "complete" ].indexOf(a.readyState.toLowerCase()) && n.DOMLoaded(), 
            b.DOMLoaded && (b.documentComplete || "complete" != a.readyState || n.documentComplete(), 
            b.performanceReady || (l = k.pageLoadTime(), (!isNaN(l) && l > 0 || !k.available) && n.performanceReady()), 
            b.performanceReady && b.documentComplete) ? (b.Complete = !0, clearInterval(i), 
            e.debug && D("jMod Finish Init" + (t != typeof s.mozPaintCount ? " (Mozilla Paint Count: " + s.mozPaintCount + ")" : "")), 
            r) : g++ > p ? (b.Complete = !0, clearInterval(i), b.DOMLoaded || n.DOMLoaded(), 
            b.documentComplete || n.documentComplete(), b.performanceReady || n.performanceReady(), 
            e.debug && D("jMod Finish Init (timeout)" + (t != typeof s.mozPaintCount ? " (Mozilla Paint Count: " + s.mozPaintCount + ")" : "")), 
            r) : (e.debug && e.log.count("Try Init"), r);
        }
        function i() {
            b.Complete ? clearInterval(i) : o("checkTimer");
        }
        function f(t) {
            b.Complete || o("DOMContentLoaded"), a.removeEventListener("DOMContentLoaded", f, !1), 
            e.Events.fire.apply(e.Events, [ "DOMContentLoaded", {
                _this: this,
                args: arguments
            } ]), e.debug && e.Debug("DOMContentLoaded", t);
        }
        function u(t) {
            s.removeEventListener("load", u, !1), e.Events.fire.apply(e.Events, [ "load", {
                _this: this,
                args: arguments
            } ]), e.debug && e.Debug("onLoadEvent", t);
        }
        function d(t) {
            e.Events.fire.apply(e.Events, [ "beforescriptexecute", {
                _this: this,
                args: arguments
            } ]);
        }
        function m(t) {
            e.Events.fire.apply(e.Events, [ "afterscriptexecute", {
                _this: this,
                args: arguments
            } ]);
        }
        const p = 200;
        var l, g = 0, a = e.Element.document, n = {
            addCSS: function() {
                b.CSSAdded || (b.CSSAdded = !0, e.AddCSS());
            },
            headAvailable: function() {
                b.headAvailable = !0, n.addCSS(), e.debug && e.API.contentEval(qt);
            },
            DOMLoaded: function() {
                b.DOMLoaded = !0, e.debug && D("DOM Loaded", null, " - Begin Init"), b.headAvailable || n.headAvailable(), 
                e.Events.fire("onDOMReady"), e.Notification.init(), e.Modal.init(), e.Settings.init(), 
                b.jModReady = !0, e.debug && D("jModReady" + (t != typeof s.mozPaintCount ? " (Mozilla Paint Count: " + s.mozPaintCount + ")" : "")), 
                e.Events.fire("onReady"), k.available && (ot = k.now);
            },
            documentComplete: function() {
                b.documentComplete = !0, e.debug && (D("onPageReady" + (t != typeof s.mozPaintCount ? " (Mozilla Paint Count: " + s.mozPaintCount + ")" : "")), 
                c.groupEnd("jMod Start")), e.Events.fire("onPageReady");
            },
            performanceReady: function() {
                b.performanceReady = !0, e.debug && D("onPerformanceReady"), e.Events.fire("onPerformanceReady");
            }
        };
        a.addEventListener("DOMContentLoaded", f, !1), a.onreadystatechange = function(t) {
            b.Complete || o("onreadystatechange"), e.Events.fire.apply(e.Events, [ "onreadystatechange", {
                _this: this,
                args: arguments
            } ]), e.debug && e.Debug("onreadystatechange %c%s%c %o", e.log.fmt.stchange, a.readyState, " ", t);
        }, s.addEventListener("load", u, !1), s.addEventListener("beforescriptexecute", d, !1), 
        s.addEventListener("afterscriptexecute", m, !1), o(), setInterval(i, 25);
    }(), k.available && setTimeout(function() {
        e.InitializeEndTime = k.now;
    }, 0), e.debug && D("jMod Initialize Time Elapsed"), c.log("unsafeWindow", i), c.log("window", s), 
    c.log("global", this);
    try {
        var bn = fofofo(a);
    } catch (mt) {
        var on = new Xt(mt);
        on.log("Error Title", "Error body");
    }
    return e;
});