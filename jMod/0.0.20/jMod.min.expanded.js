// ==UserScript==
// @name             jMod
// @namespace        http://myuserjs.org/
// @author           jgjake2
// @homepage         http://myuserjs.org/
// @license          GNU GPL version 3; http://www.gnu.org/licenses/gpl-3.0.txt
// @exclude          *
// @version          0.0.20
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
+function($, e, t, n) {
    function r(e, t, n) {
        var r = arguments.length, o = {
            allowCallbacks: !(r > 1) || 1 == t,
            allowCrossOriginArguments: !(r > 2) || 1 == n
        };
        return r > 0 && e && (o.defineAs = e), o;
    }
    function o(t, n) {
        n = n || {};
        var s = cloneInto({}, e, {
            cloneFunctions: !0,
            wrapReflectors: !0
        });
        exportFunction(n.get || function(n, r) {
            if ("undefined" != typeof t[r] || r in t) {
                try {
                    if (t === a && i.indexOf(r) > -1) return o(t[r]);
                } catch (e) {}
                if ("object" == typeof t[r] || "function" == typeof t[r]) try {
                    return cloneInto(t[r], e, {
                        cloneFunctions: !0,
                        wrapReflectors: !0
                    });
                } catch (e) {}
                return t[r];
            }
        }, s, r("get")), exportFunction(n.set || function(e, n, r) {
            try {
                t[n] = r;
            } catch (e) {
                return !1;
            }
            return !0;
        }, s, r("set")), exportFunction(n.has || function(e, n) {
            return n in t;
        }, s, r("has")), exportFunction(n.enumerate || function(e, n) {
            try {
                return t.keys()[Symbol.iterator]();
            } catch (e) {}
            try {
                return t.keys();
            } catch (e) {}
        }, s, r("enumerate")), exportFunction(n.ownKeys || function(e, n) {
            return Object.getOwnPropertyNames(t);
        }, s, r("ownKeys")), exportFunction(n.defineProperty || function(e, n, r) {
            return !r || n in t || Object.defineProperty(t, n, r), t;
        }, s, r("defineProperty")), exportFunction(function(e, n) {
            return Object.getOwnPropertyDescriptor(t, n);
        }, s, r("getOwnPropertyDescriptor")), exportFunction(n.construct || function(e, n) {
            return t.apply(t, n);
        }, s, r("construct")), exportFunction(function(e, n) {
            return t.prototype;
        }, s, r("getPrototypeOf")), exportFunction(function(e, n, r) {
            return t.apply(t, r);
        }, s, r("apply"));
        try {
            return new e.Proxy(exportFunction(function() {
                return t.apply(t, arguments);
            }, e, r()), s);
        } catch (e) {
            return void console.log("export error", e);
        }
    }
    var i = [ "Element" ], a = n.call(this, t && "undefined" != typeof t.performance ? t.performance.now() : 0, $, console, t, e, "undefined", void 0), s = a.Config.addToGlobalScope;
    if (this.jMod && (this._jMod = this.jMod, s && e && e.jMod && e !== this && (e._jMod = e.jMod)), 
    this.jMod = a, s) try {
        a.isFirefox && a.isSandbox && "undefined" != typeof e.Proxy && "undefined" != typeof cloneInto && "undefined" != typeof exportFunction ? (console.log("Export jMod"), 
        e.jMod = o(a), t !== e && (t.jMod = a)) : e !== this && (e.jMod = a);
    } catch (e) {
        try {
            t !== this && (t.jMod = a);
        } catch (e) {
            console.log("cannot add jMod to global scope", e);
        }
    }
    a.debug && a.log.groupEnd("jMod Initialize");
}.call(this, "undefined" != typeof jQuery ? jQuery : void 0, "undefined" != typeof unsafeWindow && "window" === Object.prototype.toString.call(unsafeWindow).replace(/^\[object |\]$/g, "").toLowerCase() ? unsafeWindow : "undefined" != typeof this.unsafeWindow && "window" === Object.prototype.toString.call(this.unsafeWindow).replace(/^\[object |\]$/g, "").toLowerCase() ? this.unsafeWindow : "undefined" != typeof window && window.top && "window" === Object.prototype.toString.call(window).replace(/^\[object |\]$/g, "").toLowerCase() ? window : this, this.window || window, function(t, $, n, r, o, i, a) {
    function s(e, t, n, r) {
        var o = {
            configurable: !1,
            enumerable: !1 !== r || r
        };
        "function" == typeof t ? o.get = t : (o.value = t, o.writable = !1), Object.defineProperty(n || I, e, o);
    }
    function c(e, t, n) {
        var r = "function" == typeof n, o = t;
        "object" != typeof t && (o = L.call(arguments, 1), r = !1);
        for (var s = 0; s < o.length; s++) if (typeof e[o[s]] !== i && (!r || r && n(o[s], e[o[s]]))) return o[s];
        return a;
    }
    function u(e, t, n) {
        var r = c.apply(this, arguments);
        return typeof r !== i ? e[r] : a;
    }
    function f(e) {
        var t = 0, n = this, r = e.split(".");
        for (t; t < r.length; t++) {
            if (typeof n[r[t]] === i) return a;
            n = n[r[t]];
        }
        return n;
    }
    function d(e) {
        var t, n = 0, r = this, o = e.split(".");
        if (0 == o.length) return a;
        for (n; n < o.length; n++) {
            if ((t = Object.keys(r).join("|").toLowerCase().split("|").indexOf(o[n].toLowerCase())) == -1) return a;
            r = r[Object.keys(r)[t]];
        }
        return r;
    }
    function p(e, t) {
        var n, r, o = 0, i = e.split("."), s = this;
        if (0 == i.length) return a;
        for (o; o < i.length; o++) {
            if ((r = Object.keys(s).join("|").toLowerCase().split("|").indexOf(i[o].toLowerCase())) == -1) return a;
            n = s, i[o] = Object.keys(s)[r], s = s[Object.keys(s)[r]];
        }
        return n[i[i.length - 1]] = t, i;
    }
    function g(e) {
        var t, n = 0, r = "string" == typeof e ? L.call(arguments) : e;
        for (n; n < r.length; n++) if ((t = f.apply(this, [ r[n] ])) !== a) return t;
        return a;
    }
    function m(e, t, n) {
        var r = 0, o = e.split("."), a = this;
        for (r; r < o.length - 1; r++) {
            if (typeof a[o[r]] === i) {
                if (!n) return;
                a[o[r]] = {};
            }
            a = a[o[r]];
        }
        a[o[o.length - 1]] = t;
    }
    function h(e, t) {
        t = t || o;
        var n, r = "Error", a = t.Error && "function" == typeof t.Error ? t : o;
        if (a) return e.name && "Error" != e.name && "function" == typeof a[e.name] && (r = e.name), 
        n = new a[r](e.message || null, e.fileName || null, e.lineNumber || null), n.name = e.name + "", 
        n.stack = (e.stack || "") + "", n.message = e.message + "", n.fileName = typeof e.fileName != i ? e.fileName + "" : null, 
        n.lineNumber = typeof e.lineNumber != i ? parseInt(e.lineNumber) : null, n.columnNumber = typeof e.columnNumber != i ? parseInt(e.columnNumber) : null, 
        delete n.toString, n.toString = function() {
            return this.name + ": " + this.message;
        }.bind(n), n;
    }
    function y(e, t, r, o, s) {
        if (typeof cloneInto !== i) {
            s = s || 0;
            try {
                return cloneInto(e, t, r);
            } catch (e) {
                o && n.log("mCloneInto error", e);
            }
            var l, c, u = typeof e;
            try {
                "object" == u && (e instanceof Error ? u = "error" : e.constructor === new Array().constructor ? u = "array" : null === e && (u = "null"));
            } catch (e) {}
            var f = function(e) {
                var n = typeof e;
                if ("string" == n || "number" == n || "boolean" == n || n == i || null === e) return e;
                if (e instanceof Error) return h(e, t);
                if ("object" == n) {
                    if (s < 3) try {
                        return y(e, t, r, o, s + 1);
                    } catch (e) {}
                    try {
                        return cloneInto(e, t, r);
                    } catch (e) {}
                } else if ("function" == n && r.cloneFunctions) try {
                    return cloneInto(e, t, r);
                } catch (e) {}
            };
            if ("undefined" == u || "null" == u) return e;
            if ("error" == u) try {
                c = h(e, t);
            } catch (e) {} else if ("array" == u) for (c = cloneInto([], t, r), l = 0; l < e.length; l++) {
                var d;
                try {
                    d = f(e[l]);
                } catch (e) {}
                try {
                    c.push(d);
                } catch (e) {
                    c.push(a);
                }
            } else {
                c = cloneInto({}, t, r);
                for (l in e) if ("constructor" != l && Object.prototype.hasOwnProperty.call(e, l)) {
                    var d;
                    try {
                        d = f(e[l]);
                    } catch (e) {}
                    c[l] = d;
                }
            }
            return c;
        }
        return e;
    }
    function b(e, t, n) {
        if (i != typeof exportFunction) try {
            return exportFunction(e, t, n);
        } catch (e) {}
        var r = "";
        if (n && n.defineAs ? r = n.defineAs : "function" == typeof e && "" != e.name && (r = e.name), 
        "" != r) try {
            return t[r] = e;
        } catch (e) {}
    }
    function v(e) {
        var t = r || o;
        if (!e) {
            if (!t.event) return;
            e = t.event;
        }
        null != e.cancelBubble && (e.cancelBubble = !0), e.stopPropagation && e.stopPropagation(), 
        e.preventDefault && e.preventDefault(), t.event && (e.returnValue = !1), null != e.cancel && (e.cancel = !0);
    }
    function E(e) {
        var t = /^\[object |\]$/g;
        try {
            if ("event" == Object.prototype.toString.call(e).replace(t, "").toLowerCase()) return !0;
        } catch (e) {}
        try {
            if ("event" == e.constructor.toString().replace(t, "").toLowerCase()) return !0;
        } catch (e) {}
        return !1;
    }
    function M(e) {
        this.data = e || {};
    }
    function _(e, t, n) {
        var r = I.Element.document;
        if (I.jQueryAvailable) $(e).click(); else if (r.createEvent) {
            var o = r.createEvent("MouseEvents");
            o.initEvent("click", t || !0, n || !0), e.dispatchEvent(o);
        } else r.createEventObject ? e.fireEvent("onclick") : "function" == typeof e.onclick && e.onclick();
    }
    function S(e) {
        for (var t, n = 3, r = 4, o = e.length, i = 0, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", s = "", l = 0, c = new Array(n), u = new Array(r); i < o; ) {
            for (t = 0; t < n; ++t) i < o ? c[t] = 255 & e.charCodeAt(i++) : c[t] = 0;
            switch (u[0] = c[0] >> 2, u[1] = (3 & c[0]) << 4 | c[1] >> 4, u[2] = (15 & c[1]) << 2 | c[2] >> 6, 
            u[3] = 63 & c[2], l = i - (o - 1)) {
              case 1:
                u[3] = 64;
                break;

              case 2:
                u[3] = 64, u[2] = 64;
            }
            for (t = 0; t < r; ++t) s += a.charAt(u[t]);
        }
        return s;
    }
    function j(e, t, n) {
        var i = (r || o).getComputedStyle(e, null), a = parseInt(i.width);
        n = n || 0, n < 25 && (isNaN(a) || a > 300) ? I.Element.requestAnimationFrame(function() {
            j(e, t, n + 1);
        }) : t(e);
    }
    function C(e) {
        var t, n, i = I.$(".tab-content", e.parentElement);
        e && i && null !== i.offsetParent && (n = (r || o).getComputedStyle(e, null), t = parseInt(n.width), 
        isNaN(t) ? I.debug && xe("Tabs.resize", "Tab width is NaN!", e, i, n) : t > 300 ? I.debug && xe("Tabs.resize", "Tab width too wide!", t, e) : t > 50 && (i.style.marginLeft = t + 11 + "px"));
    }
    function T(e) {
        var t = e.name, n = t.split(" ");
        n.indexOf("fa") == -1 && n.indexOf("glyphicon") == -1 && (t.indexOf("fa-") != -1 ? t = "fa " + t : t.indexOf("glyphicon-") != -1 && (t = "glyphicon " + t));
        var r = {
            type: "i",
            className: t,
            attributes: {}
        };
        return e.tooltip && (r = w(r, e.tooltip)), r;
    }
    function w(e, t) {
        if (U(e)) {
            if (de(e, te(He)), e.setAttribute(te(Pe), t.innerHTML || t.text || null), e.setAttribute(te(Fe), t.placement || "top"), 
            i != typeof t.margin) {
                var n = te("Tooltip.attributeNames.margin");
                i != typeof t.margin.left && e.setAttribute(n + "-left", t.margin.left), i != typeof t.margin.right && e.setAttribute(n + "-right", t.margin.right), 
                i != typeof t.margin.top && e.setAttribute(n + "-top", t.margin.top), i != typeof t.margin.bottom && e.setAttribute(n + "-bottom", t.margin.bottom);
            }
        } else if (e.className = (e.className || "") + " " + te(He), typeof e.attributes === i && (e.attributes = {}), 
        e.attributes[te(Pe)] = t.innerHTML || t.text || null, e.attributes[te(Fe)] = t.placement || "top", 
        i != typeof t.margin) {
            var n = te("Tooltip.attributeNames.margin");
            i != typeof t.margin.left && (e.attributes[n + "-left"] = t.margin.left), i != typeof t.margin.right && (e.attributes[n + "-right"] = t.margin.right), 
            i != typeof t.margin.top && (e.attributes[n + "-top"] = t.margin.top), i != typeof t.margin.bottom && (e.attributes[n + "-bottom"] = t.margin.bottom);
        }
        return e;
    }
    function x(e) {
        var t = e.description || e.name;
        U(t) || "object" == typeof t || (t = {
            type: "span",
            className: "noselect",
            innerHTML: t,
            attributes: {}
        });
        var n = {
            type: "label",
            className: "col-md-4 control-label noselect",
            innerHTML: t,
            attributes: {}
        };
        return n;
    }
    function N(e) {
        nt.execCallback(document.currentScript.getAttribute("data-callback-index"), document.currentScript, e, document.currentScript);
    }
    function k(e, t, r, o, i) {
        n.log("jModListenError", e, t, r, o);
        var a = I.parseStack(i.stack);
        if (a.length > 0) return I.ERROR.catchError(e, t, r, o, i, a);
    }
    var I = function() {
        return I._call.apply(I, arguments);
    };
    I.InitializeStartTime = t, I.InitializeEndTime = -1;
    var L = Array.prototype.slice, A = i != typeof $, O = -1, R = "@import url(//fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700);\n@import url(http://code.jmod.info/fonts/sansation.css);\n", P = "@import url(http://code.jmod.info/0.0.20/jMod.css);\n", F = {
        id: "jMod",
        config: {},
        el: a
    }, H = I.API = {
        addGlyphicons: function() {
            R = "@import url(http://code.jmod.info/css/glyphicons.css);\n" + R, I.CSS = "";
        }
    };
    try {
        F.el = o.document && o.document.currentScript ? o.document.currentScript : a;
    } catch (e) {}
    s("displayName", "jMod", null, !1), s("typeOfName", "jMod", null, !1), s("ScriptElement", function() {
        return F.el ? F : a;
    }), s("version", "0.0.20"), s("build_time", "1494089011000"), s("build_type", "release"), 
    s("_debug", !1), Object.defineProperty(I, "debug", {
        get: function() {
            try {
                return i != typeof I.Config.debug ? I.Config.debug : I._debug;
            } catch (e) {
                return I._debug;
            }
        },
        set: function(e) {
            I.Config.debug = !0 === e;
        },
        enumerable: !1
    }), Object.defineProperty(I, "jQueryAvailable", {
        get: function() {
            return A || i != typeof $ ? A = !0 : i != typeof jQuery ? ($ = jQuery, A = !0) : i != typeof o.jQuery && ($ = o.jQuery, 
            A = !0);
        },
        set: function(e) {
            A = !!e;
            try {
                "jQuery" == W(e) && ($ = e);
            } catch (e) {}
        },
        enumerable: !1
    }), s("jQuery", function() {
        return I.jQueryAvailable ? $ : a;
    }), Object.defineProperties(I, {
        isSandbox: {
            value: function() {
                return "sandbox" === Object.prototype.toString.call(this).replace(/^\[object |\]$/g, "").toLowerCase();
            }(),
            enumerable: !0,
            writable: !1,
            configurable: !1
        },
        isFirefox: {
            get: function() {
                return (typeof navigator != i ? navigator : r.navigator || o.navigator).userAgent.toLowerCase().indexOf("firefox") > -1;
            },
            enumerable: !1
        },
        isChrome: {
            get: function() {
                return (typeof navigator != i ? navigator : r.navigator || o.navigator).userAgent.toLowerCase().indexOf("chrome") > -1;
            },
            enumerable: !1
        }
    });
    var z = new function() {
        var e, t = function() {
            return e === a && (e = typeof o.performance !== i && typeof o.performance.timing !== i ? o.performance : a), 
            e;
        };
        this.__defineGetter__("performanceObject", function() {
            return t();
        }), this.__defineGetter__("available", function() {
            return this.performanceObject !== a;
        }), this.__defineGetter__("now", function() {
            try {
                return this.performanceObject.now();
            } catch (e) {
                I.Warning("Performance not available!");
            }
        }), this.get = function(e) {
            var t = 0, n = e.split("."), r = this.performanceObject;
            if (r !== a) {
                for (t; t < n.length; t++) {
                    if (typeof r[n[t]] === i) return;
                    r = r[n[t]];
                }
                return r;
            }
        }, this.getAllTiming = function(e) {
            e === a && (e = []);
            var t = [], n = this.performanceObject;
            for (var r in n.timing) isNaN(n.timing[r]) || e.indexOf(r) != -1 || (t[r] = n.timing[r]);
            return t;
        }, this.pageLoadTime = function() {
            try {
                var e = this.performanceObject.timing;
                if (isNaN(e.loadEventEnd)) return;
                return e.loadEventEnd - e.navigationStart;
            } catch (e) {}
        };
    }();
    Object.defineProperty(I, "timeElapsed", {
        get: function() {
            return z.now - I.InitializeStartTime;
        }
    });
    var D = I.Loading = {
        headAvailable: !1,
        DOMLoaded: !1,
        CSSAdded: !1,
        performanceReady: !1,
        documentComplete: !1,
        jModReady: !1,
        Complete: !1
    };
    Object.defineProperty(I, "CSS", {
        get: function() {
            return R;
        },
        set: function(e) {
            R += e, D.CSSAdded && I.AddCSS();
        },
        enumerable: !1
    }), I.AddCSS = function(e) {
        Le(R + (e || "")), R = "";
    }, +function() {
        function Watcher(e, t, n) {
            if (!Watcher.browserSupportsWatch || "function" != typeof e.watch || !Watcher.browserSupportsObserve) throw new G("Browser does not support watch or observe");
            if (e.__watcher) return e.__watcher.add(t, n), e.__watcher;
            var r = this;
            return r.target = e, r.properties = {}, t && n && (r.defaultHandler = n, r.properties[t] = n), 
            r.enabled = !0, e.__watcher = this, Watcher.browserSupportsWatch && "function" == typeof e.watch ? t && n && e.watch(t, n) : Watcher.browserSupportsObserve && Object.observe(e, function(e) {
                for (var t = 0, n = []; t < e.length; t++) {
                    var o = e[t], i = o.object, a = o.name, s = o.oldValue, l = (o.type, o.__watcher || r || this);
                    if (!l || !l.enabled || "__watcher" === a || !l.properties[a]) return;
                    try {
                        (l.properties[a] || l.defaultHandler).call(i, a, s, i[a]);
                    } catch (e) {
                        switch (l.enabled = !1, type) {
                          case "update":
                            i[a] = s;
                            break;

                          case "add":
                            delete i[a];
                            break;

                          case "delete":
                            i[a] = s;
                        }
                        l.enabled = !0, n.push(e);
                    }
                }
                if (n.length > 0) throw n;
            }), r;
        }
        Watcher.displayName = "Watcher", Watcher.browserSupportsWatch = !!Object.prototype.watch, 
        Watcher.browserSupportsObserve = !!Object.observe, Watcher.prototype = {
            add: function(e, t) {
                return e && (t || this.defaultHandler) && (!this.defaultHandler && t && (this.defaultHandler = t), 
                this.properties[e] = t || null, Watcher.browserSupportsWatch && "function" == typeof obj.watch && obj.watch(e, t || this.defaultHandler)), 
                this;
            },
            unwatch: function(e) {
                if (this.enabled = !1, e) this.properties[e] && delete this.properties[e], Watcher.browserSupportsWatch && this.target.unwatch(e); else for (var t in this.properties) t && this.unwatch(t);
                return this.enabled = !0, this;
            }
        }, I.Watcher = Watcher;
    }();
    var V = {
        SearchForKey: {
            value: f,
            enumerable: !1
        },
        SearchForKeys: {
            value: g,
            enumerable: !1
        },
        setKeyValue: {
            value: m,
            enumerable: !1
        },
        SearchForKeyI: {
            value: d,
            enumerable: !1
        },
        setKeyValueI: {
            value: p,
            enumerable: !1
        }
    };
    I.parseStack = function(e) {
        for (var t, n = [], r = /(([^\s]*)\@file\:\/\/\/([^\s]+?(?:\/([^\/]+?\.(user\.js|js|json|php|htm|html|asp)))?):(\d+)(?:\:(\d+))?)/gi; null != (t = r.exec(e)); ) {
            var o = {
                line: t[1],
                functionName: t[2],
                fullFileName: t[3],
                fileName: t[4],
                fileExt: t[5],
                lineNumber: t[6],
                columnNumber: t[7]
            };
            n.push(o);
        }
        return n;
    };
    var U = function(e) {
        try {
            return e instanceof HTMLElement;
        } catch (t) {
            return "object" == typeof e && 1 === e.nodeType && "object" == typeof e.style && "object" == typeof e.ownerDocument;
        }
    };
    I.Versions = {
        parseVersion: function(e) {
            var t, n = /^\s*(.*?)\s*((?:[\d]+\.)*[\d]+)\s*(.*?)\s*$/i, r = {
                fullVersion: e.trim(),
                versionStr: null,
                prefixStr: null,
                suffixStr: null,
                version: []
            };
            if (t = n.exec(e.trim())) {
                r.prefixStr = t[1], r.versionStr = t[2], r.suffixStr = t[3];
                var o = t[2].split(".");
                for (var i in o) r.version.push(parseInt(o[i]));
            }
            return r;
        },
        compare: function(e, t) {
            var n = e, r = t;
            "string" == typeof e && (n = this.parseVersion(e)), "string" == typeof t && (r = this.parseVersion(t));
            for (var o = [].concat(n.version), i = [].concat(r.version); ;) {
                var a = o.shift(), s = i.shift();
                if (null == a || null == s) {
                    if (null != a && null == s) return 1;
                    if (null == a && null != s) return -1;
                    break;
                }
                if (parseInt(a) > parseInt(s)) return 1;
                if (parseInt(a) < parseInt(s)) return -1;
            }
            return 0;
        }
    };
    var B = I.URLBuilder = function(e) {
        this.protocol = "http:", this.hostname = "", this.pathname = "", this.args = [], 
        this.setHostname = function(e) {
            try {
                if ("string" == typeof e) {
                    var t = document.createElement("a");
                    /^\s*(?:https?\:)?\/\//i.test(e) || (e = "http://" + e), t.href = e, this.hostname = t.hostname, 
                    this.protocol = t.protocol;
                }
            } catch (e) {} finally {
                return this;
            }
        }, this.setPath = function(e) {
            return "/" != e[0] && (e = "/" + e), this.pathname = e, this;
        }, this.addArg = function(e, t) {
            return this.args.push({
                name: e,
                value: t
            }), this;
        }, this.addArgs = function(e) {
            for (var t = 0; t < e.length; t++) switch (W(e[t])) {
              case "array":
                this.addArg(e[t][0], e[t][1]);
                break;

              case "map":
              case "object":
                var n = u(e[t], [ "name", "key" ]), r = u(e[t], [ "value" ]);
                n && r && this.addArg(n, r);
            }
            return this;
        }, this.buildArgs = function() {
            for (var e = [], t = 0; t < this.args.length; t++) e.push(this.args[t].name + "=" + this.args[t].value);
            return e.join("&");
        }, this.toString = function() {
            return this.protocol + "//" + this.hostname + this.pathname + "?" + this.buildArgs();
        }, this.setHostname(e);
    }, G = function() {
        function e(t) {
            var n, r = 0, o = {}, i = arguments.length;
            if (i > 0 && ("string" != typeof t && (t instanceof Error ? o.e = t : o = t, t = i > 1 ? arguments[1] : a, 
            r++), "string" == typeof t && (o.message = t, i > r + 1 && (o.fileName = arguments[r + 1]), 
            i > r + 2 && (o.lineNumber = arguments[r + 2]), i > r + 3 && (o.columnNumber = arguments[r + 3]), 
            i > r + 4 && arguments[r + 4] instanceof Error && (o.e = arguments[r + 4])), o.e)) try {
                n = o.e, this.stack = n.stack;
            } catch (e) {}
            if (n || (n = new Error(o.message || null, o.fileName || null, o.lineNumber || null), 
            n.constructor = e, n.__proto__ = Object.create(n.__proto__, {
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
            })) : this.stack = n.stack)), this.stack && !o.fileName) {
                var s = I.parseStack(this.stack);
                if (s && s.length > 0 && (this.pStack = s, o.lineNumber = parseInt(s[0].lineNumber), 
                o.columnNumber = parseInt(s[0].columnNumber || 0), o.fileName = s[0].fileName, !n.fileName || "null" == n.fileName)) try {
                    n.lineNumber = o.lineNumber, n.columnNumber = o.columnNumber, n.fileName = o.fileName, 
                    n.stack = this.stack;
                } catch (e) {
                    try {} catch (e) {}
                }
            }
            this.displayName = this.name = "jModError", this.err = n, this.message = o.message || n.message, 
            this.fileName = o.fileName || n.fileName, this.lineNumber = null != o.lineNumber ? o.lineNumber : n.lineNumber, 
            this.columnNumber = null != o.columnNumber ? o.columnNumber : n.columnNumber, this.toString = function() {
                return this.name + ": " + this.message;
            }, this.constructor = Error;
        }
        return e.prototype = Object.create(Error.prototype, {
            name: {
                value: "jModError",
                enumerable: !0
            }
        }), e.prototype.constructor = e, e.prototype.constructor.constructor = Error, e.prototype.log = function(e, t) {
            var e = e || "jMod Error", t = t || this.message;
            we(this, e, t);
        }, e;
    }();
    String.prototype.trim || function() {
        Object.defineProperty(String.prototype, "trim", {
            value: function() {
                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
            },
            enumerable: !1
        });
    }();
    var W = I.RealTypeOf = function(e) {
        var t;
        try {
            (e.constructor === {}.constructor || e) && (t = e);
        } catch (n) {
            t = y(e, o, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
        }
        try {
            if (typeof t === i) return i;
            if ("number" == typeof t && 1 == isNaN(t)) return "nan";
            if ("object" == typeof t) return null === t ? "null" : t.constructor === {}.constructor ? "map" : t.constructor === new Array().constructor ? "array" : t.constructor === new Date().constructor ? isNaN(t.getTime()) ? "invaliddate" : "date" : t.constructor === new RegExp().constructor ? "regex" : Object.prototype.toString.call(t).replace(/^\[object |\]$/g, "").toLowerCase();
        } catch (e) {}
        try {
            if ("function" == typeof t) {
                if (t.typeOfName && "string" == typeof t.typeOfName) return t.typeOfName;
                if (t.displayName && "string" == typeof t.displayName) return t.displayName;
            }
        } catch (e) {}
        return typeof t;
    }, q = function(e) {
        try {
            if ("object" != typeof e || e.nodeType || e === e.window) return !1;
            if (e.constructor && !e.hasOwnProperty.call(e.constructor.prototype, "isPrototypeOf")) return !1;
        } catch (n) {
            var t = y(e, o, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
            if ("object" != typeof t || t.nodeType || t === t.window) return !1;
            if (t.constructor && !t.hasOwnProperty.call(t.constructor.prototype, "isPrototypeOf")) return !1;
        }
        return !0;
    }, Y = function(e) {
        try {
            if (e.constructor === new Array().constructor) return !0;
        } catch (n) {
            var t = y(e, o, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
            if (t.constructor === new Array().constructor) return !0;
        }
        return !1;
    };
    I.extend = function() {
        var e, t, n, r, o, i, s = arguments[0] || {}, l = 1, c = arguments.length, u = !1;
        for ("boolean" == typeof s && (u = s, s = arguments[l] || {}, l++), "object" != typeof s && "function" != typeof s && (s = {}), 
        l === c && (s = this, l--); l < c; l++) if (null != (e = arguments[l])) for (t in e) {
            n = s[t];
            try {
                (("object" == typeof e[t] || "function" == typeof e[t]) && e[t].constructor === {}.constructor || e[t] || s) && (r = e[t]);
            } catch (n) {
                r = y(e[t], s, {
                    cloneFunctions: !0,
                    wrapReflectors: !0
                });
            }
            if (s !== e[t] && s !== r) if (u && r && (q(r) || (o = Y(r)))) o ? (o = !1, i = n && Y(n) ? n : []) : i = n && q(n) ? n : {}, 
            s[t] = I.extend(u, i, r); else if (r !== a) try {
                s[t] = r;
            } catch (e) {
                s[t] = y(r, s, {
                    cloneFunctions: !0,
                    wrapReflectors: !0
                });
            }
        }
        return s;
    }, I.extendp = function() {
        var e, t, n, r, o, i, s = arguments[0] || {}, l = 1, c = arguments.length, u = !1;
        for ("boolean" == typeof s && (u = s, s = arguments[l] || {}, l++), "object" != typeof s && "function" != typeof s && (s = {}), 
        l === c && (s = this, l--); l < c; l++) if (null != (e = arguments[l])) for (t in e) {
            n = s[t];
            try {
                (("object" == typeof e[t] || "function" == typeof e[t]) && e[t].constructor === {}.constructor || e[t] || s) && (r = e[t]);
            } catch (n) {
                r = y(e[t], s, {
                    cloneFunctions: !0,
                    wrapReflectors: !0
                });
            }
            if (s !== r) if (u && r && (q(r) || (o = Y(r)))) {
                if (o) {
                    if (Y(n) && Array.prototype.push.apply(s[t], r)) continue;
                    i = n && Y(n) ? n : [];
                } else i = n && q(n) ? n : {};
                s[t] = jQuery.extendp(u, i, r);
            } else if (r !== a) try {
                s[t] = r;
            } catch (e) {
                s[t] = y(r, s, {
                    cloneFunctions: !0,
                    wrapReflectors: !0
                });
            }
        }
        return s;
    }, I.CloneProperties = function() {
        var e, t, n, r, o, s, l, c = arguments.length, u = arguments[0], f = !1, d = 1;
        if ("boolean" == typeof u && c > 2 && (f = u, u = arguments[d++]), u === a || null === u) return u;
        for (l = Object(u), d; d < c; d++) if (e = arguments[d], e !== a && null !== e) for (n = f ? Object.getOwnPropertyNames(Object(e)) : Object.keys(Object(e)), 
        r = 0; r < n.length; r++) o = n[r], s = Object.getOwnPropertyDescriptor(e, o), s !== a && ("function" == typeof e[o] ? l[o] = e[o].bind(l) : "object" == typeof e[o] && q(e[o]) ? Object.defineProperty(l, o, {
            enumerable: s.enumerable,
            configurable: s.configurable,
            writable: s.writable,
            value: f ? I.CloneProperties(f, l[o] || {}, e[o]) : e[o]
        }) : (t = {
            enumerable: s.enumerable,
            configurable: s.configurable
        }, i != typeof s.get && (t.get = s.get.bind(l)), i != typeof s.set && (t.set = s.set.bind(l)), 
        i != typeof s.value && (t.writable = s.writable, "function" == typeof s.value ? t.value = s.value.bind(l) : t.value = s.value), 
        Object.defineProperty(l, o, t)));
        return l;
    }, function() {
        var e = "major", t = "name", n = "version";
        I.Browser = {
            getAgent: function() {
                return navigator.userAgent;
            },
            get: function() {},
            getRegexMatches: function(e, t) {
                for (var n, r = [], o = 0; o < t.length; o += 2) {
                    for (var i = t[o], a = [], s = 0; s < i.length; s++) (n = i[s].exec(e)) && a.push(n);
                    a.length > 0 && r.push({
                        matches: a,
                        map: t[o + 1]
                    });
                }
                return r;
            },
            getRegexFirstMatch: function(e, t) {
                for (var n, r = 0; r < t.length; r += 2) for (var o = t[r], i = 0; i < o.length; i++) if (n = o[i].exec(e)) return [ n, t[r + 1] ];
                return [];
            },
            getBrowser: function() {
                var e = {};
                try {
                    var t = this.getAgent(), n = this.getRegexFirstMatch(t, this.regexes.browser);
                    if (n.length > 1) for (var r = 0; r < n[1].length; r++) e[n[1][r]] = n[0][r + 1];
                } catch (e) {}
                return e;
            },
            regexes: {
                browser: [ [ /(opera\smini)\/((\d+)?[\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i, /(opera).+version\/((\d+)?[\w\.]+)/i, /(opera)[\/\s]+((\d+)?[\w\.]+)/i ], [ t, n, e ], [ /\s(opr)\/((\d+)?[\w\.]+)/i ], [ [ t, "Opera" ], n, e ], [ /(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i ], [ [ t, "IE" ], n, e ], [ /(yabrowser)\/((\d+)?[\w\.]+)/i ], [ [ t, "Yandex" ], n, e ], [ /(comodo_dragon)\/((\d+)?[\w\.]+)/i ], [ [ t, /_/g, " " ], n, e ], [ /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i, /(uc\s?browser|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i ], [ t, n, e ], [ /((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i ], [ [ t, "Chrome" ], n, e ], [ /version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i ], [ n, e, [ t, "Mobile Safari" ] ], [ /version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i ], [ n, e, t ], [ /(konqueror)\/((\d+)?[\w\.]+)/i, /(webkit|khtml)\/((\d+)?[\w\.]+)/i ], [ t, n, e ], [ /(navigator|netscape)\/((\d+)?[\w\.-]+)/i ], [ [ t, "Netscape" ], n, e ], [ /(swiftfox)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i, /(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i ], [ t, n, e ] ]
            }
        };
    }();
    var J = function(e) {
        var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return t ? {
            r: parseInt(t[1], 16),
            g: parseInt(t[2], 16),
            b: parseInt(t[3], 16),
            a: null
        } : null;
    }, Q = function(e) {
        var t = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))?\s*\)/im.exec(e);
        return t ? {
            r: parseInt(t[1]),
            g: parseInt(t[2]),
            b: parseInt(t[3]),
            a: t[4] && "" != t[4] ? parseFloat(t[4]) : null
        } : null;
    }, X = function(e) {
        var t = Q(e);
        return t ? t : J(e);
    }, K = .5 * Math.PI, Z = (10 * Math.log(2), function(e, t, n, r) {
        return 2 * n / Math.PI * Math.asin((r - e) / t);
    }), ee = function(e, t, n) {
        var r = K / t, o = e * r;
        return Math.round(o * Math.cos(r * n));
    }, te = I.Config = function(e, t) {
        try {
            te.getScriptFileInfo && !oe.gotFileInfo && oe.getScriptFileInfo();
        } catch (e) {}
        return typeof t === i ? "string" == typeof e ? I.Config.SearchForKey(e) : I.Config.SearchForKeys(e) : I.Config.setKeyValue(e, t);
    };
    I.extend(I.Config, {
        host: "http://myuserjs.org",
        scopeLock: !1,
        secure: !1,
        browser: I.Browser.getBrowser(),
        getScriptFileInfo: !0,
        addToGlobalScope: !0,
        script: {
            username: a,
            script_name: a
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
                verbosity_level: I._debug ? 5 : 3,
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
    }), "object" == typeof o.jMOD_CONFIGURATION && (I.Config = I.extend(!0, I.Config, o.jMOD_CONFIGURATION)), 
    Object.defineProperties(I.Config, V);
    var ne = function(e, t) {
        return typeof t === i ? I.Config.SearchForKeyI(e) : I.Config.setKeyValueI(e, t);
    };
    if (te.scanElement = function(e) {
        if (e && U(e)) {
            var t, r, o, i = {}, a = 0, s = /^(?:data-)?(.*?)$/i, l = e.attributes;
            for (a; a < l.length; a++) if (t = l[a].nodeName, t = s.exec(t)[1], r = l[a].value) {
                switch (t.toLowerCase()) {
                  case "src":
                  case "type":
                  case "async":
                  case "defer":
                  case "onload":
                  case "onerror":
                  case "charset":
                  case "crossorigin":
                    continue;

                  case "username":
                    I.Config.script.username = r;
                    break;

                  case "scriptname":
                  case "script_name":
                  case "script-name":
                    I.Config.script.script_name = r;
                    break;

                  case "jmod-config":
                    try {
                        r = JSON.parse(r), r && I.extend(!0, I.Config, r);
                    } catch (t) {
                        n.error('Error parsing "' + l[a].nodeName + '"', e, t);
                        continue;
                    }
                    break;

                  default:
                    switch (t = t.split("-").join("."), o = ne(t), typeof o) {
                      case "number":
                        ne(t, parseInt(r));
                        break;

                      case "boolean":
                        ne(t, "true" == r.trim().toLowerCase());
                        break;

                      case "string":
                        ne(t, r);

                      case "object":
                        try {
                            r = JSON.parse(r), r && ne(t, r);
                        } catch (t) {
                            n.error('Error parsing "' + l[a].nodeName + '"', e, t);
                            continue;
                        }
                        break;

                      default:
                        continue;
                    }
                }
                i[t] = r;
            }
            return i;
        }
    }, F.el) if (F.config = te.scanElement(F.el), F.el.id && "" != F.el.id.trim()) F.id = F.el.id; else {
        if ((r || o).document.getElementById(F.id)) {
            for (var re = 0; (r || o).document.getElementById(F.id + "-" + re); ) re++;
            F.id = F.id + "-" + re;
        }
        F.el.id = F.id;
    }
    I.API.ParseMetaData_Types = [], I.API.ParseMetaData_Types.push(function(e, t) {
        if ("history" == e.toLowerCase() && "object" == typeof t) {
            for (var n = /\(([0-9\.]+)\)\s+(.*?)$/i, r = {}, o = 0; o < t.length; o++) if (n.test(t[o])) {
                var a = n.exec(t[o]), s = a[1], l = a[2];
                typeof r[s] === i && (r[s] = []), r[s].push(l);
            }
            return r;
        }
    }), I.API.ParseMetaData_Types.push(function(e, t) {
        if ("resource" == e.toLowerCase()) {
            "object" != typeof t && (t = [ t ]);
            var n, r = 0, o = {}, i = /^\s*([\w]+)\s+(.*?)\s*$/;
            for (r; r < t.length; r++) i.test(t[r]) && (n = i.exec(t[r]), o[n[1]] = n[2]);
            return o;
        }
    }), I.API.ParseMetaData = function(e) {
        var t, n, r, o, a = {}, s = /@([\S]+)\s+(.*?)$/i;
        for ("string" == typeof e && (e = e.split(/\r?\n/i)), r = 0; r < e.length; r++) s.test(e[r]) && (o = s.exec(e[r]), 
        typeof a[o[1]] === i ? a[o[1]] = o[2] : "string" != typeof a[o[1]] ? a[o[1]].push(o[2]) : (t = a[o[1]], 
        a[o[1]] = [], a[o[1]].push(t), a[o[1]].push(o[2])));
        for (n in a) for (r = 0; r < I.API.ParseMetaData_Types.length; r++) if (typeof (t = I.API.ParseMetaData_Types[r](n, a[n])) !== i) {
            a[n] = t;
            break;
        }
        return a;
    };
    var oe = I.ScriptInfo = function() {
        if (0 == arguments.length) return I.ScriptInfo.get();
        var e = typeof arguments[0];
        return 1 != arguments.length || "object" !== e && "string" != e ? void 0 : I.ScriptInfo.GM_info(arguments[0]);
    };
    oe.getURLInfo = function(e) {
        var t = /myuserjs\.org\/script\/([^\/]+)\/([^\s]+)(?:\.(user|meta|metajs|data)\.js){1}?/i;
        if (t.test(e)) {
            var n = t.exec(e);
            return {
                username: n[1],
                script_name: n[2],
                get_type: n[3]
            };
        }
        return !1;
    }, oe.gotFileInfo = !1, oe.getScriptFileInfo = function() {
        if (oe.gotFileInfo || !te.getScriptFileInfo) return te.script.script_file_info;
        var e, t, n = 0, r = {}, o = new Error(), a = o.stack.toString();
        if (a.indexOf("user.js") != -1 && (e = I.parseStack(a), e.length > 0)) for (n; n < e.length; n++) if (t = e[n], 
        i == typeof te.jMod_File_Path && [ "jmod.js", "jmod.min.js", "jmod.full.js", "jmod.min.expanded.js", "mujs.js", "mujs.min.js" ].indexOf(t.fileName.toLowerCase()) != -1 && (te.jMod_Full_File_Name = t.fileName, 
        te.jMod_File_Name = t.fileName.substr(0, t.fileName.length - 3), te.jMod_File_Path = t.fullFileName), 
        "" != t.fileName && "user.js" == t.fileExt.toLowerCase()) return oe.gotFileInfo = !0, 
        r = te.script.script_file_info = {
            userscript_full_file_name: t.fileName,
            userscript_file_name: t.fileName.substr(0, t.fileName.length - 8),
            userscript_file_path: t.fullFileName,
            caller_lineNumber: t.lineNumber,
            caller_functionName: t.functionName
        }, I.debug && Ne("ScriptInfo.getScriptFileInfo", "Get Script File Info Successful!!", r, t), 
        r;
    }, Object.defineProperty(oe, "InfoSet", {
        get: function() {
            return i != typeof te.script.script_info;
        }
    }), oe.set = function(e) {
        var t, r, o, a, s, l, f, d = {};
        try {
            t = oe.getScriptFileInfo(), i != typeof t && (d = I.extend(d, t));
        } catch (e) {}
        try {
            if (typeof e === i && (i != typeof GM_info || i != typeof GM_getMetadata)) try {
                e = {
                    gm_info: i != typeof GM_info ? GM_info : GM_getMetadata(),
                    has_GM_info: i != typeof GM_info,
                    has_GM_getMetadata: i != typeof GM_getMetadata
                };
            } catch (e) {}
            if ("object" == typeof e ? (r = e.GM_info || e.gm_info || e.ginfo, i == typeof r && i != typeof e.scriptSource && (r = e), 
            i != typeof r && i != typeof r.scriptMetaStr && (o = r.scriptMetaStr)) : "string" == typeof e && (o = e), 
            i != typeof o) {
                a = I.API.ParseMetaData(o);
                for (s in a) i == typeof d[s] && (d[s] = a[s]);
            }
            if (i != typeof r) {
                if (i != typeof r.script) for (s in r.script) typeof d[s] === i && (d[s] = r.script[s]); else n.warn("ScriptInfo", "GM_info.script does not exist", r, e);
                i != typeof r.uuid ? d.gmUUID = r.uuid : i != typeof r.script.uuid && (d.gmUUID = r.script.uuid), 
                i != typeof r.scriptHandler ? "tampermonkey" == r.scriptHandler.toLowerCase() ? (d.script_handler = "Tampermonkey", 
                d.script_handler_version = r.version, te.getScriptFileInfo = !1) : "greasemonkey" == r.scriptHandler.toLowerCase() && (d.script_handler = "Greasemonkey", 
                d.script_handler_version = r.version) : e.has_GM_info ? (d.script_handler = "Greasemonkey", 
                d.script_handler_version = r.version) : e.has_GM_getMetadata && (d.script_handler = "Scriptish");
            }
            if (i != typeof a && (s = c(a, [ "downloadURL", "updateURL", "jModupdateURL", "jModUpdateURL", "jModdownloadURL", "jModDownloadURL" ], function(e, t) {
                return I.ScriptInfo.getURLInfo(t);
            }), i != typeof s && (f = oe.getURLInfo(a[s])) ? (te.script.username = f.username, 
            te.script.script_name = f.script_name, [ "meta", "metajs", "data" ].indexOf(f.get_type.toLowerCase()) != -1 && (te.script.get_type = f.get_type.toLowerCase())) : ((l = u(a, [ "jModusername", "jMod_username" ])) && (te.script.username = l), 
            (l = u(a, [ "jModscriptname", "jMod_script_name" ])) && (te.script.script_name = l)), 
            i != typeof a.jMod)) try {
                (l = JSON.parse(a.jMod)) && I.extend(!0, I.Config, l);
            } catch (e) {
                we(e, "ScriptInfo.set", "Error parsing options in MetaBlock");
            }
        } catch (e) {
            n.error("Error ScriptInfo.set", e);
        }
        return Object.defineProperty(I.Config.script, "script_info", {
            value: Object.freeze(d),
            writable: !1,
            enumerable: !0,
            configurable: !1
        }), Object.freeze(d);
    }, oe.get = function() {
        var e = I.Config.script.script_info;
        return i != typeof e ? e : oe.set.apply(this, arguments);
    };
    var ie = !1;
    if (i != typeof GM_info || i != typeof GM_getMetadata) {
        try {
            oe.set();
        } catch (e) {}
        var ae = te("script.script_info.resource");
        if (ae && ae.jModCSS && i != typeof GM_getResourceText) try {
            var se = GM_getResourceText("jModCSS");
            se && "" != se && (R += se, ie = !0);
        } catch (e) {}
    }
    ie || (R = P + R);
    var le = function(e, t) {
        function n(e, n, o, i, s, l) {
            if ("%%" == e) return "%";
            if (t[++r] === a) return a;
            var c, e = i ? parseInt(i.substr(1)) : a, u = s ? parseInt(s.substr(1)) : a;
            switch (l) {
              case "s":
                c = t[r];
                break;

              case "c":
                c = t[r][0];
                break;

              case "f":
                c = parseFloat(t[r]).toFixed(e);
                break;

              case "p":
                c = parseFloat(t[r]).toPrecision(e);
                break;

              case "e":
                c = parseFloat(t[r]).toExponential(e);
                break;

              case "x":
                c = parseInt(t[r]).toString(u ? u : 16);
                break;

              case "d":
                c = parseFloat(parseInt(t[r], u ? u : 10).toPrecision(e)).toFixed(0);
            }
            c = "object" == typeof c ? JSON.stringify(c) : c.toString(u);
            for (var f = parseInt(o), d = o && "0" == o[0] ? "0" : " "; c.length < f; ) c = n !== a ? c + d : d + c;
            return c;
        }
        var r = -1, o = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd])/g;
        return e.replace(o, n);
    }, ce = I.Language = function(e) {
        var t, n, r = ce.getLanguage(ce.Current, !0);
        if (r) {
            if (n = f.call(r, e), t = typeof n, i == t) {
                if (ce.Current === ce.Default) return;
                if (r = ce.getLanguage(ce.Default), n = f.call(r, e), t = typeof n, i == t) return;
            }
            return 1 == arguments.length || "string" !== t ? n : le.call(le, n, L.call(arguments, 1));
        }
    };
    ce.Default = "en", Object.defineProperty(ce, "Current", {
        get: function() {
            try {
                return te.Language.Current;
            } catch (e) {
                return ce.Default;
            }
        },
        set: function(e) {
            try {
                i !== typeof ce.Names[e] && (te.Language.Current = e);
            } catch (e) {}
        }
    }), ce.Names = {}, ce.getLanguage = function(e, t) {
        return ce.Names[e] !== a ? ce[e] : t ? ce[ce.Default] : void 0;
    }, ce.Names.en = "English", ce.en = {}, ce.Names.es = "Espanol", ce.es = {}, I._call = function() {
        var e, t, n, r, o = arguments.length;
        try {
            te.getScriptFileInfo && !oe.gotFileInfo && oe.getScriptFileInfo();
        } catch (e) {}
        try {
            if (o > 0) {
                if (n = arguments[0], e = typeof n, "string" == e) {
                    if (1 == o) {
                        if (i !== typeof (t = te(n))) return t;
                    } else {
                        switch (r = arguments[1], n) {
                          case "get":
                            return te(r);

                          case "set":
                            return te(r, arguments[2]);
                        }
                        if ("function" == typeof r && typeof I.Events.e[n] !== i) return I.Events.addListener.apply(I.Events, L.call(arguments));
                        if (2 == o && i !== typeof (t = te(n)) && typeof t == typeof r) return te(n, r);
                    }
                    if (I.log.fnList.join("|").toLowerCase().split("|").indexOf(n.toLowerCase()) != -1 && "function" == typeof (t = d.call(I.log, n))) return t.apply(I.log, L.call(arguments, 1));
                } else if ("object" == e) {
                    if (!U(n)) {
                        if (typeof c(n, [ "GM_info", "gm_info", "ginfo" ]) !== i) return oe.set.apply(oe, L.call(arguments));
                        if (typeof n.scriptSource !== i && typeof n.scriptMetaStr !== i) return oe.set.apply(oe, L.call(arguments));
                    }
                } else if ("function" == e && 1 == o) return I.onReady = n, n;
                te("debug") && I.Warning("Unable to process jMod() call:", L.call(arguments));
            }
        } catch (e) {}
    }, I.$ = function(e, t, n) {
        t = t || I.Element.document;
        try {
            if (!0 !== n && I.jQueryAvailable) try {
                return $(e, t).first()[0];
            } catch (e) {}
            if ("string" != typeof e) return;
            return t.querySelector(e);
        } catch (e) {
            I.Exception("jMod.Query", "Error!", e);
        }
    }, I.$$ = function(e, t, n) {
        t = t || I.Element.document;
        try {
            if (!0 !== n && I.jQueryAvailable) try {
                return $(e, t).toArray();
            } catch (e) {}
            if ("string" != typeof e) return;
            var r = t.querySelectorAll(e);
            return r ? [].map.call(r, function(e) {
                return e;
            }) : [];
        } catch (e) {
            I.Exception("jMod.Query", "Error!", e);
        }
    }, I.Element = function(e, t) {
        try {
            var n = L.call(arguments);
            switch (W(e)) {
              case "string":
                if ("function" == typeof I.Element[command]) return I.Element._call.apply(I.Element, arguments);
                break;

              case "map":
              case "object":
                return 1 == n.length ? _e.apply(I.Element, arguments) : _e(n);

              default:
                I.Element.isElement(e);
            }
        } catch (e) {
            we(e, "jMod.Element");
        }
    }, I.Element._call = function(e) {
        if ("function" == typeof I.Element[e]) return I.Element[e].apply(I.Element, L.call(arguments, 1));
    }, Object.defineProperty(I.Element, "document", {
        get: function() {
            try {
                return i != typeof document ? document : r.document || o.document;
            } catch (e) {}
            return null;
        }
    }), Object.defineProperty(I.Element, "head", {
        get: function() {
            try {
                var e = I.Element.document;
                return e.head || e.getElementsByTagName("head")[0];
            } catch (e) {}
            return null;
        }
    }), I.Element.isElement = U;
    var ue = I.Element.hasClass = function(e, t) {
        return (" " + e.className + " ").indexOf(" " + t + " ") != -1;
    }, fe = (I.Element.hasClasses = function(e, t) {
        var n = " " + e.className + " ", r = "string" == typeof t ? t.split(" ") : t;
        return r.filter(function(e) {
            return n.indexOf(" " + e + " ") != -1;
        });
    }, I.Element.missingClasses = function(e, t) {
        var n = " " + e.className + " ", r = "string" == typeof t ? t.split(" ") : t;
        return r.filter(function(e) {
            return n.indexOf(" " + e + " ") == -1;
        });
    }), de = I.Element.addClass = function(e, t) {
        return ue(e, t) || (e.className = (e.className + " " + t).trim()), e;
    }, pe = (I.Element.addClasses = function(e, t) {
        return e.className = (e.className + " " + fe(e, t).join(" ")).trim(), e;
    }, new RegExp("\\w+"), I.Element.removeClass = function(e, t) {
        return e.className = (" " + e.className + " ").replace(new RegExp(" " + t + " ", "g"), " ").trim(), 
        e;
    }), ge = I.Element.removeClasses = function(e, t) {
        return e.className = (" " + e.className + " ").replace(new RegExp(" (?:" + ("string" == typeof t ? t.split(" ") : t).join("|") + ") ", "g"), " ").trim(), 
        e;
    }, me = function(e, t) {
        return e.hasAttribute(t);
    }, he = function(e, t, n) {
        var r, o = e.getAttribute(t);
        if (!n) return o;
        switch (n) {
          case "int":
          case "integer":
            return parseInt(o);

          case "bool":
          case "boolean":
            return r = null != o && "" != o ? o.trim().toLowerCase() : "false", r.indexOf("true") !== -1 || "t" == r;
        }
        return o;
    }, ye = function(e, t, n) {
        for (var r = 0, o = e.ownerDocument || I.Element.document, i = o.createElement(t), a = e.attributes, s = e.childNodes, l = [ "scrollLeft", "scrollTop" ]; r < a.length; r++) i.setAttributeNode(a[r]);
        for (r = 0; r < s.length; r++) n ? i.appendChild(i.removeChild(s[r])) : i.appendChild(s[r]);
        for (r = 0; r < l.length; r++) i[l[r]] = e[l[r]];
        return i;
    }, be = I.Element.addEventListener = function(e, t, n, r) {
        e.addEventListener ? e.addEventListener(t, n, !!r) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n;
    }, ve = I.Element.removeEventListener = function(e, t, n, r) {
        e.removeEventListener ? e.removeEventListener(t, n, !!r) : e.detachEvent ? e.detachEvent("on" + t, n) : e["on" + t] = null;
    };
    I.Element.viewportSize = {
        getHeight: function() {
            return this.getSize("Height");
        },
        getWidth: function() {
            return this.getSize("Width");
        },
        getSize: function(e) {
            var t, n = e.toLowerCase(), i = r || o, s = I.Element.document, l = I.Element.head, c = s.documentElement;
            if (i["inner" + e] === a) t = c["client" + e]; else if (i["inner" + e] != c["client" + e]) {
                var u = s.createElement("body");
                u.id = "vpw-test-b", u.style.cssText = "overflow:scroll";
                var f = s.createElement("div");
                f.id = "vpw-test-d", f.style.cssText = "position:absolute;top:-1000px", f.innerHTML = "<style>@media(" + n + ":" + c["client" + e] + "px){body#vpw-test-b div#vpw-test-d{" + n + ":7px!important}}</style>", 
                u.appendChild(f), c.insertBefore(u, l), t = 7 == f["offset" + e] ? c["client" + e] : i["inner" + e], 
                c.removeChild(u);
            } else t = i["inner" + e];
            return t;
        }
    }, M.prototype = {
        appendChild: function(e) {
            var t, n = this.data, r = W(n), o = W(e);
            if ("array" == o) {
                for (t = 0; t < e.length; t++) this.appendChild(e[t]);
                return this;
            }
            if (U(n)) {
                if (U(e)) return n.appendChild(e), this;
                if ("ElementBuilderClass" == o) return n.appendChild(e.toElement()), this;
            }
            return "ElementBuilderClass" == r ? (n.appendChild(e), this) : "object" == typeof n ? (t = n.innerHTML === a && n.text !== a ? "text" : "innerHTML", 
            "array" == W(n[t]) ? n[t].push(e) : typeof n[t] == i || null == n[t] ? n[t] = [ e ] : n[t] = [ n[t], e ], 
            this) : this;
        },
        toElement: function() {
            return U(this.data) ? this.data : this.data = _e(this.data);
        }
    }, Object.defineProperties(M.prototype, {
        type: {
            get: function() {
                return U(this.data) ? this.data.nodeName.toLowerCase() : this.data.type.toLowerCase();
            },
            set: function(e) {
                if (U(this.data)) {
                    var t = this.data.parentElement;
                    se = ye(this.data, e, !0), t.replaceChild(se, this.data), this.data = se;
                } else this.data.type = e;
            },
            configurable: !1,
            enumerable: !0
        },
        children: {
            get: function() {
                if (U(this.data)) return this.data.children;
                var e = this.data.innerHTML === a && this.data.text !== a ? "text" : "innerHTML";
                return this.data[e] || null;
            },
            configurable: !1,
            enumerable: !0
        }
    });
    var Ee = I.Element.appendChild = function(e, t) {
        var n, r, o;
        try {
            if (U(e) || "object" != typeof e || null == e.type) {
                if (typeof t === i || null === t) return e;
                if (U(t)) e.appendChild(t); else switch (W(t)) {
                  case i:
                  case "null":
                    break;

                  case "array":
                    for (o = 0; o < t.length; o++) e = Ee(e, t[o]);
                    break;

                  case "object":
                  case "map":
                    (r = _e(t)) && e.appendChild(r);
                    break;

                  default:
                    for (r = (e.ownerDocument || I.Element.document).createElement("div"), r.innerHTML = t, 
                    n = r.childNodes, o = 0; o < n.length; o++) e.appendChild(n[o]);
                }
            } else o = e.innerHTML === a && e.text !== a ? "text" : "innerHTML", "array" == W(e[o]) ? e[o].push(t) : e[o] = [ e[o], t ];
        } catch (e) {
            we(e, "jMod.Element.appendChild");
        } finally {
            return e;
        }
        return e;
    }, Me = [ "id", "className", "checked", "defaultValue", "title", "async", "defer", "src", "onerror", "onload", "responseCallback", "value", "max", "min" ], _e = I.Element.createNewElement = function(e) {
        var t, n, r, o, i, s, l = e.EventListeners || e.eventListeners, c = I.Element.document, u = c.createElement(e.type || "div"), f = function(e, n) {
            if ("function" == typeof n) return be(u, e, n);
            if (o = n.useCapture || n.Capture || n.capture || !1, i = n.callback || n.function) if ("array" == W(i)) for (t in i) "function" != typeof i[t] && (o = i[t].useCapture || i[t].Capture || i[t].capture || o), 
            be(u, e, i[t], o); else be(u, e, i, o);
        };
        if ("string" == typeof e.style) u.setAttribute("style", e.style); else if ("object" == typeof e.style) for (t in e.style) u.style[t] = e.style[t];
        for (t = 0; t < Me.length; t++) e[Me[t]] !== a && (u[Me[t]] = e[Me[t]]);
        if (e.attributes !== a) for (t in e.attributes) null != e.attributes[t] && u.setAttribute(t, e.attributes[t]);
        if (l) for (r in l) if (s = l[r], "array" == W(s)) for (n = 0; n < s.length; n++) f(r, s[n]); else f(r, s);
        return Ee(u, e.innerHTML || e.text || null), u;
    }, Se = I.Element.getOffset = function(e) {
        var t = e.getBoundingClientRect(), n = e.ownerDocument, r = n.documentElement, o = null != n && n === n.window ? n : 9 === n.nodeType && n.defaultView;
        return {
            top: parseInt(t.top + o.pageYOffset - r.clientTop),
            left: parseInt(t.left + o.pageXOffset - r.clientLeft),
            bottom: t.bottom,
            height: parseInt(t.height || parseInt(e.offsetHeight) - parseInt(e.clientHeight) + parseInt(e.scrollHeight)),
            width: parseInt(e.offsetWidth)
        };
    }, je = I.Element.isNamespaced = function(e, t) {
        for (var n = e; n.parentElement; ) if (n = n.parentElement, ue(n, t)) return !0;
        return !1;
    }, Ce = I.Element.findParentWithClass = function(e, t) {
        for (var n = e; n.parentElement; ) if (n = n.parentElement, ue(n, t)) return n;
    };
    I.Element.findParentWithAttribute = function(e, t, n) {
        for (var r = e; r.parentElement; ) if (r = r.parentElement, r.hasAttribute(t) && (i == typeof n || r.getAttribute(t) == n)) return r;
    };
    I.Element.getCompStyleObj = function(e, t) {
        var n = e.ownerDocument || I.Element.document;
        return e.currentStyle ? e.currentStyle : n.defaultView && n.defaultView.getComputedStyle ? n.defaultView.getComputedStyle(e, t || null) : void 0;
    }, I.Element.getCompStyle = function() {
        for (var e, t, n, r, o, i, a = 0; a < arguments.length; a++) e = arguments[a], U(e) ? t = e : "string" == typeof e ? n ? r = e : n = e : o = e;
        if (o) {
            if (o[n]) return o[n];
        } else {
            if (t.currentStyle) return t.currentStyle[n];
            if (i = t.ownerDocument || I.Element.document, i.defaultView && i.defaultView.getComputedStyle && (o = i.defaultView.getComputedStyle(t, r || null))) return o[n] ? o[n] : o.getPropertyValue(n);
        }
        return t ? t.style[n] : null;
    }, I.Element.getClientRect = function(e) {
        try {
            var t, n = I.extend({}, e.getBoundingClientRect());
            return null != n.height && null != n.width || (t = I.Element.getCompStyleObj(e), 
            n.height = parseFloat(I.Element.getCompStyle(e, "height", t)), n.width = parseFloat(I.Element.getCompStyle(e, "width", t))), 
            n;
        } catch (e) {}
    }, +function() {
        var e = r || o, t = e.requestAnimationFrame ? "requestAnimationFrame" : e.mozRequestAnimationFrame ? "mozRequestAnimationFrame" : e.webkitRequestAnimationFrame ? "webkitRequestAnimationFrame" : e.oRequestAnimationFrame ? "oRequestAnimationFrame" : e.msRequestAnimationFrame ? "msRequestAnimationFrame" : null, n = e.cancelAnimationFrame ? "cancelAnimationFrame" : e.mozCancelAnimationFrame ? "mozCancelAnimationFrame" : e.webkitCancelAnimationFrame ? "webkitCancelAnimationFrame" : e.oCancelAnimationFrame ? "oCancelAnimationFrame" : e.msCancelAnimationFrame ? "msCancelAnimationFrame" : e.clearTimeout ? "clearTimeout" : null;
        I.Element.requestAnimationFrame = function(n) {
            if (t) try {
                return e[t](n);
            } catch (e) {}
            return e.setTimeout(n, 17);
        }, I.Element.cancelAnimationFrame = function(t) {
            if (n) return e[n](t);
        };
    }(), +function() {
        function e(e) {
            var t = e.__resizeTriggers__, n = t.firstElementChild, r = t.lastElementChild, o = n.firstElementChild;
            r.scrollLeft = r.scrollWidth, r.scrollTop = r.scrollHeight, o.style.width = n.offsetWidth + 1 + "px", 
            o.style.height = n.offsetHeight + 1 + "px", n.scrollLeft = n.scrollWidth, n.scrollTop = n.scrollHeight;
        }
        function t(e) {
            return e.offsetWidth != e.__resizeLast__.width || e.offsetHeight != e.__resizeLast__.height;
        }
        function n(n) {
            var r = this;
            e(this), this.__resizeRAF__ && I.Element.cancelAnimationFrame(this.__resizeRAF__), 
            this.__resizeRAF__ = I.Element.requestAnimationFrame(function() {
                t(r) && (r.__resizeLast__.width = r.offsetWidth, r.__resizeLast__.height = r.offsetHeight, 
                r.__resizeListeners__.forEach(function(e) {
                    e.call(r, n);
                }));
            });
        }
        I.Element.addResizeListener = function(t, i) {
            t.attachEvent ? t.attachEvent("onresize", i) : (t.__resizeTriggers__ || ("static" == (r || o).getComputedStyle(t, null).position && (t.style.position = "relative"), 
            t.__resizeLast__ = {}, t.__resizeListeners__ = [], (t.__resizeTriggers__ = I.Element.document.createElement("div")).className = "resize-triggers", 
            t.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>', 
            t.appendChild(t.__resizeTriggers__), e(t), t.addEventListener("scroll", n, !0), 
            t.__resizeTriggers__.addEventListener("animationstart", function(n) {
                "resizeanim" == n.animationName && e(t);
            })), t.__resizeListeners__.push(i));
        };
    }(), I.CSS = '@-webkit-keyframes resizeanim{0%{opacity:0;}100%{opacity:0;}}@keyframes resizeanim{0%{opacity:0;}100%{opacity:0;}}.jmod-na .resize-triggers{-webkit-animation:1ms resizeanim;animation:1ms resizeanim;visibility:hidden;opacity:0;}.jmod-na .resize-triggers,.jmod-na .resize-triggers > div,.jmod-na .contract-trigger:before{content:" ";display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;}.jmod-na .resize-triggers > div{background:#eee;overflow:auto;}.jmod-na .contract-trigger:before{width:200%;height:200%;}';
    var Te = new function() {
        var e = this, t = 'font-family:"Sansation","Open Sans",Arial;', n = "font-size:175%;font-weight:300;" + t;
        e.time = "font-weight:bold;font-size:120%;color:red;", e.stchange = "font-weight:bold;font-size:130%;color:blue;", 
        e.iconStyle = 'font-size:1.75em;background-color: transparent;background-image:url("http://myuserjs.org/img/favicon/favicon.png");background-clip: border-box;background-position:left center;background-size:auto 75%;background-repeat: no-repeat;letter-spacing: 20px;white-space: pre;display: run-in;', 
        e.logDefaultStyle = "display: run-in;", e.logHeaderStyle = n, e.logTitleStyle = "color:#000;font-size:125%;", 
        e.logTextStyle = "font-weight:bold;font-size:120%;color:#000;", e.infoDefaultStyle = "display: run-in;", 
        e.infoHeaderStyle = n, e.infoTitleStyle = "color:#000;font-size:125%;", e.infoTextStyle = "font-weight:bold;font-size:120%;color:blue;", 
        e.warningDefaultStyle = "display: run-in;", e.warningHeaderStyle = n, e.warningTitleStyle = "color:#000;font-size:125%;", 
        e.warningTextStyle = "font-weight:bold;font-size:120%;color:red;", e.errorDefaultStyle = "display: run-in;", 
        e.errorHeaderStyle = n + "color:red;", e.errorTitleStyle = "color:#000;font-size:125%;", 
        e.errorLineStyle = "color:blue;";
    }();
    +function() {
        function e(e) {
            return i !== typeof e && i !== typeof e.timeStamp;
        }
        function t(t) {
            return "console" == W(t) || i !== typeof t && !e(t) && i === typeof t.dirxml && i !== typeof t.trace;
        }
        function s(n) {
            return i !== typeof n && !e(n) && !t(n) && i === typeof n.dirxml && i === typeof n.exception;
        }
        function l(e) {
            return e(r.console) ? r.console : e(n) ? n : e(this.console) ? this.console : e(o.console) ? o.console : e(o.window.console) ? o.window.console : i != typeof Console && e(Console) ? Console : e(this.Console) ? this.Console : e(r.Console) ? r.Console : e(o.Console) ? o.Console : e(o.window.Console) ? o.window.Console : a;
        }
        function c() {
            return l(e);
        }
        function u() {
            return l(s);
        }
        function f() {
            return l(t);
        }
        function d(e) {
            return te("API.log.disabled").indexOf(e) == -1 && te("API.log.verbosity_level") > 1;
        }
        var p, g = {
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
        }, m = [ [ "Error", "ERROR" ], [ "logError", "ERROR" ], [ "Exception", "EXCEPTION" ], [ "Warning", "WARNING" ], [ "Info", "INFO" ], [ "Log", "LOG" ], [ "Debug", "DEBUG" ] ], h = [ "assert", "clear", "count", "dir", "dirxml", "group", "groupCollapsed", "groupEnd", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace" ], b = [ "Debug", "Log", "Info", "Warning", "logError", "Exception" ];
        for (I.isFormatted = function(e, t) {
            return [ "debug", "log", "info", "warn", "error", "exception" ].indexOf(e) != -1 && "string" == typeof t && /(?:\%s|\%c|\%o|\%d|\%f|\%\.\df|\%i)/.test(t);
        }, I.log = H.log = {
            OUTPUT_TYPES: g,
            fb: a,
            c2: a,
            wc: a,
            fnList: [].concat(b, h),
            updateFB: function(t) {
                e(t) && (te("API.log.debug") && n.info("jMod.API.log - Firebug Object: ", t), this.fb = t);
            },
            updateC2: function(e) {
                s(e) && (te("API.log.debug") && n.info("jMod.API.log - Console2 Object: ", e), this.c2 = e);
            },
            updateWC: function(e) {
                t(e) && (te("API.log.debug") && n.info("jMod.API.log - Web Console Object: ", e), 
                this.wc = e);
            },
            UpdateAll: function() {
                this.updateFB(c()), this.updateC2(u()), this.updateWC(f());
            },
            ConsoleCommand: function(e, t) {
                try {
                    var r, a = 0, s = [ "WebConsole", "Firebug" ], l = L.call(arguments, 1), c = {
                        Firebug: this.fb,
                        WebConsole: this.wc
                    }, u = y(l, o, {
                        cloneFunctions: !0,
                        wrapReflectors: !0
                    });
                    for ([ "profile", "profileEnd", "error" ].indexOf(e) == -1 && te.API.log.WebConsole || (s = [ "Firebug", "WebConsole" ]); a < s.length; a++) if (r = s[a], 
                    null != c[r] && typeof c[r][e] !== i && te.API.log[r]) {
                        try {
                            return c[r][e].apply(c[r], l);
                        } catch (e) {}
                        try {
                            return c[r][e].apply(c[r], u);
                        } catch (e) {}
                    }
                } catch (e) {
                    n.error(e);
                }
                return !1;
            },
            outputMessage: function(e, t) {
                e.level <= te("API.log.verbosity_level") && this.ConsoleCommand.apply(this, [ e.value ].concat(L.call(arguments, 1)));
            },
            fmt: Te
        }, p = 0; p < m.length; p++) H.log[m[p][0]] = function(e) {
            return function() {
                return this.outputMessage.apply(this, [ g[e] ].concat(L.call(arguments)));
            }.bind(H.log);
        }(m[p][1]);
        for (p = 0; p < h.length; p++) H.log[h[p]] = function(e) {
            return function() {
                if (d(e)) return this.ConsoleCommand.apply(this, [ e ].concat(L.call(arguments)));
            }.bind(H.log);
        }(h[p]);
        for (p = 0; p < b.length; p++) I[b[p]] = I.log[b[p]].bind(H.log);
        H.logFormatBuilder = function() {
            this.args = [];
            var e = function(e, t, n) {
                var r = i === typeof e, o = typeof t;
                typeof t === i && (t = typeof e);
                var s;
                switch (t) {
                  case "d":
                  case "%d":
                    s = "%d";
                    break;

                  case "i":
                  case "%i":
                    s = "%i";
                    break;

                  case "f":
                  case "%f":
                    s = "%.2f";
                    break;

                  case "number":
                    parseInt(e) === e && e === +e ? (s = "%d", e = parseInt(e)) : (s = "%.2f", e = parseFloat(e));
                    break;

                  case "s":
                  case "%s":
                    "\n" == e || " \n" == e ? (s = " \n", e = a, n = a, r = !1) : s = "%s";
                    break;

                  case "string":
                    s = e, e = a, r = !1;
                    break;

                  case "o":
                  case "%o":
                    s = "%o";
                    break;

                  case "object":
                  default:
                    s = o == i && i == typeof n ? "" : "%o";
                }
                this.args.push({
                    valueIsUndefined: r,
                    value: e,
                    fmtString: s,
                    style: n
                });
            };
            this.add = function() {
                var t = 0, n = arguments[0];
                if (1 == arguments.length && "array" == W(n)) for (;t < n.length; t++) e.apply(this, n[t]); else e.apply(this, L.call(arguments));
            }, this.build = function() {
                for (var e = "", t = [], n = 0; n < this.args.length; n++) e += ("undefined" != typeof this.args[n].style ? "%c" : "") + this.args[n].fmtString, 
                "undefined" != typeof this.args[n].style && t.push("" != this.args[n].style ? this.args[n].style : " "), 
                ("undefined" != typeof this.args[n].value || this.args[n].valueIsUndefined) && t.push(this.args[n].value);
                return [ e ].concat(t);
            }, arguments.length > 0 && this.add.apply(this, arguments);
        }, I.log.UpdateAll();
    }();
    var we = function() {
        var e, t = 3, n = arguments[0], r = arguments[1];
        try {
            e = arguments[2];
        } catch (e) {}
        n && n instanceof Error || (e = r, r = n, n = a, t = 2);
        for (var o = Te.errorDefaultStyle, s = new H.logFormatBuilder([ [ "  ", "%s", o + Te.iconStyle ], [ "jMod", "string", o + Te.errorHeaderStyle ], [ " - ", "string", o ], [ r || " ", "%s", o + Te.errorTitleStyle ], [ " \n", "string" ], [ e || "", "%s", o + "color:red;" ] ]); t < arguments.length; t++) s.add([ [ " \n", "string" ], [ arguments[t], "string" == typeof arguments[t] ? "string" : "object", "color:red;" ] ]);
        typeof n != i && null != n && s.add([ [ " \n", "string" ], [ n.message + " ", "%s", o + "color:red;" ], [ n.lineNumber, "%s", o + Te.errorLineStyle + "color:red;" ], [ " \n", "string", " " ], [ n && n.err ? n.err : n, "%0", "color:red;" ] ]);
        try {
            I.logError.apply(I.log, s.build());
        } catch (e) {}
    }, xe = function(e, t) {
        if (!(I.log.OUTPUT_TYPES.WARNING.level > te("API.log.verbosity_level"))) {
            var n = 2, r = Te.warningDefaultStyle, o = new H.logFormatBuilder([ [ "  ", "%s", r + Te.iconStyle ], [ "jMod Warning", "string", r + Te.warningHeaderStyle ] ]);
            for (i !== typeof t ? o.add([ [ " - ", "string", r ], [ e || " ", "%s", r + Te.warningTitleStyle ], [ " \n", "string" ], [ t || "", "%s", r + Te.warningTextStyle ] ]) : o.add([ [ " \n", "string" ], [ e || "", "%s", r + Te.warningTextStyle ] ]), 
            arguments.length > 2 && o.add(" \n", "string"), n; n < arguments.length; n++) o.add(arguments[n]);
            I.Warning.apply(I.log, o.build());
        }
    }, Ne = function(e, t) {
        if (!(I.log.OUTPUT_TYPES.INFO.level > te("API.log.verbosity_level"))) {
            var n = 2, r = Te.infoDefaultStyle, o = new H.logFormatBuilder([ [ "  ", "%s", r + Te.iconStyle ], [ "jMod", "string", r + Te.infoHeaderStyle ] ]);
            for (i !== typeof t ? o.add([ [ " - ", "string", r ], [ e || " ", "%s", r + Te.infoTitleStyle ], [ " \n", "string" ], [ t || "", "%s", r + Te.infoTextStyle ] ]) : o.add([ [ " \n", "string" ], [ e || "", "%s", r + Te.infoTextStyle ] ]), 
            arguments.length > 2 && o.add(" \n", "string"), n; n < arguments.length; n++) o.add(arguments[n]);
            I.Info.apply(I.log, o.build());
        }
    }, ke = function(e, t, n) {
        if (!(I.log.OUTPUT_TYPES.INFO.level > te("API.log.verbosity_level"))) {
            var r = (t || "") + I.timeElapsed.toFixed(2) + "ms" + (n || ""), o = Te.infoDefaultStyle, i = new H.logFormatBuilder([ [ "  ", "%s", o + Te.iconStyle ], [ "jMod", "string", o + Te.infoHeaderStyle ], [ " - ", "string", o ], [ e || " ", "%s", o + Te.infoTitleStyle ], [ " ", "string" ], [ r, "%s", o + Te.time ] ]);
            I.Info.apply(I.log, i.build());
        }
    };
    I.log.Info("Loading jMod API v" + I.version + " " + I.build_type + (I.debug ? " (debug enabled)" : "") + " - " + new Date(parseInt(I.build_time)).toString()), 
    I.debug && (ke("jMod Init Start Time"), I.log.group("jMod Start"), te.script.script_info && Ne("ScriptInfo.set", "Get Script_Info Successful!!", te.script.script_info), 
    I.log.group("jMod Initialize"), F.el && I.Info("CurrentRunningScript", F)), I.Events = {
        e: {},
        fired: {},
        addEvent: function(e, t) {
            this.e[e] = {
                recordEvent: typeof t === i || t,
                listeners: []
            }, Object.defineProperty(I, e, new function(e) {
                return {
                    set: function(t) {
                        I.Events.addListener(e, t);
                    },
                    get: function() {
                        return typeof I.Events.fired[e] !== i;
                    },
                    enumerable: !1
                };
            }(e));
        },
        addListener: function(e, t, n) {
            this.e[e].listeners.push(t), n = typeof n === i || n, n && typeof this.fired[e] !== i && typeof this.fired[e].args !== i && t.apply(this.fired[e]._this, this.fired[e].args);
        },
        fire: function(e, t) {
            if (typeof this.e[e] !== i) {
                typeof this.fired[e] === i && (this.fired[e] = {
                    count: 0,
                    args: a,
                    _this: null
                });
                var n, r = null;
                "object" == typeof t && typeof t._this !== i && typeof t.args !== i ? (r = t._this, 
                n = t.args) : n = L.call(arguments, 1), this.e[e].recordEvent && (this.fired[e].args = n, 
                this.fired[e]._this = r);
                for (var o = []; re = this.e[e].listeners.pop(); ) re.apply(r, n) || o.push(re);
                this.e[e].listeners = o, this.fired[e].count++;
            }
        }
    }, I.Events.addEvent("onDOMReady"), I.Events.addEvent("onReady"), I.Events.addEvent("onPageReady"), 
    I.Events.addEvent("onPerformanceReady"), I.Events.addEvent("load"), I.Events.addEvent("DOMContentLoaded"), 
    I.Events.addEvent("onreadystatechange"), I.Events.addEvent("afterscriptexecute", !1), 
    I.Events.addEvent("beforescriptexecute", !1);
    var Ie = function(e) {
        var t = {};
        this.events = e || [], this.add = function(e, n, r) {
            this.events.indexOf(n) == -1 && this.events.push(n), typeof t[e] === i && (t[e] = {}), 
            typeof t[e][n] === i && (t[e][n] = []), t[e][n].push(r);
        }, this.addAll = function(e, t) {
            for (var n in this.events) "function" == typeof e[this.events[n]] && this.add(t, this.events[n], e[this.events[n]]);
        }, this.getAll = function(e, n) {
            return n ? t[e] && t[e][n] ? t[e][n] : void 0 : t[e];
        }, this.fire = function(e, r, o, a) {
            var s, l, c, r = t[r || "0"];
            s = "array" == W(a) ? a : [ a ], arguments.length > 4 && (s = s.concat(L.call(arguments, 4)));
            try {
                if (typeof r !== i && typeof (c = r[e]) !== i) for (l in c) if (!1 === c[l].apply(o || null, s || [])) return n.log("fire canceled"), 
                !1;
            } catch (e) {
                we(e, "jMod.EventsClass.fire");
            }
        };
    };
    I.Observer = function() {
        this.filters = [], this.addFilter = function(e, t, n) {
            this.filters.push({
                callback: e,
                data: t,
                fireOnce: !0 === n
            });
        }, this.filterMutation = function(e) {
            var t, n, r, o, i = 0;
            for (i; i < this.filters.length; i++) if (t = this.filters[i].data, n = !1, !t.type || ("string" == typeof t.type && (t.type = [ t.type ]), 
            t.type.indexOf(e.type) != -1)) {
                if ("object" == typeof t.target) {
                    if (t.target.hasClass) {
                        for ("string" == typeof t.target.hasClass && (t.target.hasClass = [ t.target.hasClass ]), 
                        o = 0; o < t.target.hasClass.length; o++) if (!ue(e.target, t.target.hasClass[o])) {
                            n = !0;
                            break;
                        }
                        if (n) continue;
                    }
                    if (t.target.hasChildren) {
                        for ("string" == typeof t.target.hasChildren && (t.target.hasChildren = [ t.target.hasChildren ]), 
                        o = 0; o < t.target.hasChildren.length; o++) if (r = I.$$(t.target.hasChildren[o], e.target), 
                        !r || 0 == r.length) {
                            n = !0;
                            break;
                        }
                        if (n) continue;
                    }
                }
                if (this.filters[i].callback(e, this), this.filters[i].fireOnce) return;
            }
        }, this.MutationObserver = new MutationObserver(function(e) {
            for (var t = 0; t < e.length; t++) this.filterMutation(e[t]);
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
    }, I.FileSelector = function(e) {
        var t = this;
        t.events = {
            change: []
        }, e.onChange && t.events.change.push(e.onChange), t.onChange = function(e) {
            for (var n = 0; n < t.events.change.length; n++) t.events.change[n].call(this || t || I, e, t.files(), t.value());
        }, t.click = function(e, n) {
            return _(t.buttonTriggerElement, i === typeof e || e, i === typeof n || n);
        }, t.files = function() {
            return t.inputElement.files;
        }, t.value = function() {
            return t.inputElement.value;
        };
        var r = {
            type: "input",
            attributes: {
                type: "file",
                multiple: !!e.multiple
            },
            style: {
                position: "absolute",
                opacity: "0",
                "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)",
                filter: "alpha(opacity=0)",
                width: "0"
            },
            EventListeners: {
                change: t.onChange
            }
        };
        e.defaultValue && (r.defaultValue = e.defaultValue), e.accept && (r.attributes.accept = e.accept), 
        t.inputElement = _e(r);
        var o = {
            type: "button",
            EventListeners: {
                click: function(e) {
                    n.log("Button click triggered");
                    var t = this.previousSibling;
                    return t.focus(), _(t), v(e), !1;
                }
            }
        };
        "object" == typeof e.button && (e.button.type && delete e.button.type, e.button.EventListeners && e.button.EventListeners.click && delete e.button.EventListeners.click, 
        o = I.extend(!0, o, e.button)), t.buttonTriggerElement = _e(o);
        var a = I.extend(!0, e.form || {}, {
            type: "form",
            innerHTML: [ t.inputElement, t.buttonTriggerElement ]
        });
        t.formElement = _e(a), I.FileSelector.FileSelectorForms.push(t.formElement);
    }, I.FileSelector.FileSelectorForms = [], I.FileSelector.FileReadSupport = function() {
        return r.File && r.FileReader;
    }, I.FileSelector.BlobSupport = function() {
        return r.File && r.Blob;
    }, I.FileSelector.ReadFileAsText = function(t, r, o) {
        if (!I.FileSelector.FileReadSupport) return I.debug && n.log("Error! No Support For File Reading!"), 
        !1;
        var i = new FileReader();
        return t ? (i.onload = function(e) {
            return r.call(this || I, e, e.target.result, t);
        }, i.onerror = function(e) {
            return I.debug && n.log("Error reading file", t), (o || r)(e, a, t);
        }, i.readAsText(t), !0) : (I.debug && n.log("Error reading file", t), (o || r)(e, a, t), 
        !1);
    }, I.FileSelector.ReadFileAsURL = function(t, r, o) {
        if (!I.FileSelector.FileReadSupport) return I.debug && n.log("Error! No Support For File Reading!"), 
        !1;
        var i = new FileReader();
        return t ? (i.onload = function(e) {
            return r.call(this || I, e, e.target.result, t);
        }, i.onerror = function(e) {
            return I.debug && n.log("Error reading file", t), (o || r)(e, a, t);
        }, i.readAsDataURL(t), !0) : (I.debug && n.log("Error reading file", t), (o || r)(e, a, t), 
        !1);
    }, I.FileSelector.ReadFileAsJSON = function(e, t, r) {
        return I.FileSelector.ReadFileAsText(e, function(e, o, i) {
            if (!o || "" == o) return I.debug && n.log("Error! JSON file is empty!", i), (r || t)(e, a, i);
            try {
                return t(e, JSON.parse(o), i);
            } catch (o) {
                return I.debug && n.log("Error! Cannot parse json file!", o, i), (r || t)(e, a, i);
            }
        });
    };
    var Le = I.API.addStyle = function(e) {
        if (e && "" != e) {
            if (typeof GM_addStyle !== i) return GM_addStyle(e) || !0;
            var t, n = I.Element.head;
            if (n) {
                t = I.Element.document.createElement("style");
                try {
                    t.innerHTML = e;
                } catch (n) {
                    t.innerText = e;
                }
                return t.type = "text/css", n.appendChild(t);
            }
            I.debug && xe("jMod.API.addStyle", "Could not add css", e);
        }
    };
    I.API.addStylesheet = function(e) {
        var t, n = I.Element.head;
        return n ? (t = I.Element.document.createElement("link"), t.setAttribute("rel", "stylesheet"), 
        t.href = e, n.appendChild(t)) : void (I.debug && xe("jMod.API.addStylesheet", "Could not add stylesheet", e));
    }, I.API.importStylesheet = function(e) {
        I.CSS = "@import url(" + e + ");\n";
    }, I.API.addScript = function(e, t, n, r, o, a) {
        var s, l, c = I.Element.head;
        if (l = "object" == typeof e ? e : {
            js: e,
            src: t,
            id: n,
            type: r,
            async: o,
            defer: a
        }, c) {
            if (s = I.Element.document.createElement("script"), typeof l.id !== i) try {
                s.id = l.id;
            } catch (e) {}
            if (typeof l.async !== i && (s.async = l.async), typeof l.defer !== i && (s.defer = l.defer), 
            typeof l.onload !== i && (s.onload = l.onload), typeof l.onerror !== i && (s.onerror = l.onerror), 
            s.type = l.type || "text/javascript", typeof l.js != i && null != l.js && "" != l.js) try {
                s.innerHTML = l.js;
            } catch (e) {
                s.innerText = l.js;
            }
            if (typeof l.src != i && null != l.src && "" != l.src) try {
                s.src = l.src;
            } catch (e) {}
            try {
                return c.appendChild(s);
            } catch (e) {}
        }
        return null;
    }, I.API.contentEval = function(e) {
        "function" == typeof e && (e = "(" + e + ")();");
        var t = I.Element.document, n = I.Element.head, r = t.createElement("script");
        r.setAttribute("type", "application/javascript"), r.textContent = e, n.appendChild(r), 
        n.removeChild(r);
    }, +function() {
        function t(e) {
            0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return e = decodeURIComponent(e.replace(/\+/g, " ")), I.API.Cookie.defaults.JSON ? JSON.parse(e) : e;
            } catch (e) {}
        }
        function n(e, n) {
            var r = t(e);
            return "function" == typeof n ? n(r) : r;
        }
        I.API.Cookie = function(t, r, o) {
            var s, c, u, f, d, p, g = I.Element.document, m = t ? a : {}, h = I.API.Cookie.defaults;
            if (!g) return void xe("jMod.API.Cookie", "No document available");
            if (arguments.length > 1 && "function" != typeof r) {
                switch (o = I.extend({}, h, o), I.RealTypeOf(o.expires)) {
                  case "number":
                    p = o.expires, s = o.expires = new Date(), s.setTime(+s + 864e5 * p);
                    break;

                  case "string":
                    try {
                        o.expires = Date.parse(o.expires);
                    } catch (e) {
                        return void we(e, "jMod.API.Cookie", "Invalid Exp Date");
                    }
                    break;

                  case "invaliddate":
                    return void we(e, "jMod.API.Cookie", "Invalid Exp Date");

                  case "date":
                    break;

                  default:
                    o.expires = h.expires;
                }
                if (h.JSON) try {
                    f = encodeURIComponent(JSON.stringify(r));
                } catch (e) {
                    f = a;
                }
                return i == typeof f && (f = encodeURIComponent(String(r))), g.cookie = [ encodeURIComponent(t), "=", f, o.expires ? "; expires=" + o.expires.toUTCString() : "", o.path ? "; path=" + o.path : "", o.domain ? "; domain=" + o.domain : "", o.secure ? "; secure" : "" ].join("");
            }
            for (d = g.cookie ? g.cookie.split("; ") : [], s = 0, l = d.length; s < l; s++) {
                if (c = d[s].split("="), u = decodeURIComponent(c.shift()), f = c.join("="), t && t === u) {
                    m = n(f, r);
                    break;
                }
                if (!t) {
                    var p = n(f) || f;
                    p && (m[u] = p);
                }
            }
            return m;
        }, I.API.Cookie.defaults = {
            expires: Date.parse("Jan 1, 2020"),
            JSON: !0
        }, I.API.Cookie.remove = function(e, t) {
            return I.API.Cookie !== a && (I.API.Cookie(e, "", I.extend({}, t || {}, {
                expires: -1
            })), !I.API.Cookie(e));
        };
    }(), I.API.GM_Storage = {
        available: function() {
            return typeof GM_getValue !== i && typeof GM_setValue !== i && typeof GM_deleteValue !== i;
        },
        getValue: function(e, t) {
            return this.available() ? GM_getValue(te("API.Storage.prefix") + e, t) : t;
        },
        setValue: function(e, t) {
            if (this.available()) return GM_setValue(te("API.Storage.prefix") + e, t);
        },
        setJSON: function(e, t) {
            var n;
            try {
                n = JSON.stringify(t);
            } catch (e) {
                we(e, "GM_Storage.setJSON", "Cannot stringify value!");
            }
            try {
                return this.setValue(e, n || t);
            } catch (e) {}
        },
        getJSON: function(e, t) {
            var n = this.getValue(e, t);
            try {
                if ("string" == typeof n) return JSON.parse(n);
            } catch (e) {
                we(e, "GM_Storage.setJSON", "Error parsing value!");
            }
            return n || t;
        },
        deleteValue: function(e) {
            if (this.available()) return GM_deleteValue(te("API.Storage.prefix") + e);
        }
    }, I.API.localStorage = {
        available: function() {
            try {
                var e = this.stor;
                if (i !== typeof e && null != e && e.getItem && e.setItem) return !0;
            } catch (e) {}
            return !1;
        },
        getValue: function(e, t) {
            if (!this.available()) return t;
            try {
                var n = this.stor.getItem(te("API.Storage.prefix") + e);
                return null !== n ? n : t;
            } catch (e) {}
            return t;
        },
        setValue: function(e, t) {
            if (this.available()) try {
                return this.stor.setItem(te("API.Storage.prefix") + e, t);
            } catch (e) {}
        },
        setJSON: function(e, t) {
            if (this.available()) {
                var n;
                try {
                    n = JSON.stringify(t);
                } catch (e) {
                    we(e, "localStorage.setJSON", "Cannot stringify value!");
                }
                try {
                    return this.setValue(e, n || t);
                } catch (e) {}
            }
        },
        getJSON: function(e, t) {
            if (!this.available()) return t;
            var n;
            try {
                n = this.getValue(e, t);
            } catch (e) {}
            try {
                if ("string" == typeof n) return JSON.parse(n);
            } catch (e) {
                we(e, "localStorage.setJSON", "Error parsing value!");
            }
            return n || t;
        },
        deleteValue: function(e) {
            if (this.available()) try {
                return this.stor.removeItem(te("API.Storage.prefix") + e);
            } catch (e) {}
        }
    }, Object.defineProperty(I.API.localStorage, "stor", {
        get: function() {
            try {
                return r.localStorage && null != r.localStorage ? r.localStorage : i !== typeof localStorage && null != localStorage ? localStorage : o.localStorage && null != o.localStorage ? o.localStorage : a;
            } catch (e) {
                xe("jMod.API.localStorage", "localStorage unavailable!", e.message);
            }
        },
        enumerable: !1
    }), I.API.sessionStorage = {
        available: function() {
            try {
                var e = this.stor;
                if (i !== typeof e && null != e && e.getItem && e.setItem) return !0;
            } catch (e) {}
            return !1;
        },
        getValue: function(e, t) {
            if (!this.available()) return t;
            try {
                var n = this.stor.getItem(te("API.Storage.prefix") + e);
                return null !== n ? n : t;
            } catch (e) {}
            return t;
        },
        setValue: function(e, t) {
            if (this.available()) try {
                return this.stor.setItem(te("API.Storage.prefix") + e, t);
            } catch (e) {}
        },
        setJSON: function(e, t) {
            if (this.available()) {
                var n;
                try {
                    n = JSON.stringify(t);
                } catch (e) {
                    we(e, "sessionStorage.setJSON", "Cannot stringify value!");
                }
                try {
                    return this.setValue(e, n || t);
                } catch (e) {}
            }
        },
        getJSON: function(e, t) {
            if (!this.available()) return t;
            var n;
            try {
                n = this.getValue(e, t);
            } catch (e) {}
            try {
                if ("string" == typeof n) return JSON.parse(n);
            } catch (e) {
                we(e, "sessionStorage.setJSON", "Error parsing value!");
            }
            return n || t;
        },
        deleteValue: function(e) {
            if (this.available()) try {
                return this.stor.removeItem(te("API.Storage.prefix") + e);
            } catch (e) {}
        }
    }, Object.defineProperty(I.API.sessionStorage, "stor", {
        get: function() {
            try {
                return r.localStorage && null != r.localStorage ? r.localStorage : i !== typeof localStorage && null != localStorage ? localStorage : o.localStorage && null != o.localStorage ? o.localStorage : a;
            } catch (e) {
                xe("jMod.API.sessionStorage", "sessionStorage unavailable!", e.message);
            }
        },
        enumerable: !1
    }), +function() {
        var e = function() {
            var e = [], t = te("API.Storage.engine"), n = "GM_Storage", r = "localStorage", o = "sessionStorage";
            try {
                try {
                    H[t] && H[t].available() && (e = [ t ]);
                } catch (e) {}
                e.indexOf(n) == -1 && H[n].available() && e.push(n), e.indexOf(r) == -1 && H[r].available() && e.push(r), 
                e.indexOf(o) == -1 && H[o].available() && e.push(o);
            } catch (e) {}
            return e;
        };
        I.getValue = function(t, n) {
            for (var r = 0, o = e(); r < o.length; r++) try {
                return H[o[r]].getValue.apply(H[o[r]], arguments);
            } catch (e) {}
            return n;
        }, I.setValue = function(t) {
            for (var n = 0, r = e(); n < r.length; n++) try {
                return H[r[n]].setValue.apply(H[r[n]], arguments);
            } catch (e) {}
        }, I.getJSON = function(t, n) {
            for (var r = 0, o = e(); r < o.length; r++) try {
                return H[o[r]].getJSON.apply(H[o[r]], arguments);
            } catch (e) {}
            return n;
        }, I.setJSON = function(t) {
            for (var n = 0, r = e(); n < r.length; n++) try {
                return H[r[n]].setJSON.apply(H[r[n]], arguments);
            } catch (e) {}
        }, I.deleteValue = function(t) {
            var n = 0;
            for (storageEngines = e(); n < storageEngines.length; n++) try {
                return H[storageEngines[n]].deleteValue.apply(H[storageEngines[n]], arguments);
            } catch (e) {}
        };
    }(), I.API.getRemoteImageAsURL = function(e, t, n) {
        if (i != typeof GM_xmlhttpRequest) {
            var r = /Content-Type:\s*([^\s]+)/i;
            return "function" == typeof t && i === typeof n && (n = t, t = a), GM_xmlhttpRequest({
                method: "GET",
                url: e,
                overrideMimeType: "text/plain; charset=x-user-defined",
                onload: function(e) {
                    if (i == typeof t || null == t || "" == t) try {
                        var o = r.exec(e.responseHeaders);
                        o && o.length > 1 && (t = o[1].trim());
                    } catch (e) {}
                    n("data:" + (t && "" != t ? t : "image/png") + ";base64," + S(e.responseText));
                }
            });
        }
    }, I.API.getResourceText = function(e, t, n) {
        if (i !== typeof GM_getResourceText) try {
            var r = GM_getResourceText(e);
            return t && t(r), r;
        } catch (e) {}
        if (n) return I.API.getResourceTextLive(e, t);
    }, I.API.getResourceURL = function(e, t, n) {
        if (i !== typeof GM_getResourceURL) try {
            var r = GM_getResourceURL(e);
            return t && t(r), r;
        } catch (e) {}
        if (n) return I.API.getResourceURLLive(e, t);
    }, I.API.getResourceTextLive = function(e, t) {
        if (i != typeof GM_xmlhttpRequest) {
            var n = te("script.script_info.resource");
            return n && i !== typeof n[e] ? GM_xmlhttpRequest({
                method: "GET",
                url: n[e],
                onload: function(e) {
                    t(e.responseText);
                }
            }) : void 0;
        }
    }, I.API.getResourceURLLive = function(e, t) {
        var n = te("script.script_info.resource");
        if (n && i !== typeof n[e]) return I.API.getRemoteImageAsURL(n[e], t);
    }, I.API.addResourceCSS = function(e) {
        if (!I.API.getResourceText(e, function(e) {
            "string" == typeof e && "" != e && (I.CSS = e);
        }, !1)) {
            var t = te("script.script_info.resource");
            t && i !== typeof t[e] && I.API.addStylesheet(t[e]);
        }
    }, I.API.addResourceScript = function(e) {
        if (!I.API.getResourceText(e, function(e) {
            "string" == typeof e && "" != e && I.API.addScript({
                js: e
            });
        }, !1)) {
            var t = te("script.script_info.resource");
            t && i !== typeof t[e] && I.API.addScript({
                src: t[e],
                async: !0,
                defer: !0
            });
        }
    }, I.API.Date = function(e, t) {
        switch (e) {
          case "parseUTC":
          case "parseUTCDate":
            return I.API.Date.parseUTCDate.apply(I.API.Date, L.call(arguments, 1));
        }
    }, Object.defineProperties(I.API.Date, {
        now: {
            get: function() {
                return Date.now();
            }
        }
    }), I.API.Date.parseUTCDate = function(e) {
        if ("string" == typeof e) {
            var t = /^(\d{4})[\-\/](\d{2})[\-\/](\d{2})(?:T|\s)(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z?$/i.exec(e);
            if (t) return new Date(Date.UTC(+t[1], +t[2] - 1, +t[3], +t[4], +t[5], +t[6]));
        } else if ("date" == W(e)) return new Date(e);
        return null;
    }, I.API.Date.getScriptTimeDiff = function(e) {
        var t;
        if ("string" == typeof e ? t = I.API.Date.parseUTCDate(e) : "object" == typeof e && typeof e.scriptUploadTimestamp !== i && (t = I.API.Date.parseUTCDate(e.scriptUploadTimestamp)), 
        !t) return null;
        var n = Date.now(), r = Math.abs(n - t), o = r / 1e3 / 60, a = o / 60, s = a / 24;
        return {
            date: t,
            now: n,
            milliseconds: r,
            minutes: o,
            hours: a,
            days: s
        };
    }, I.jQueryExtensions = {}, +function() {
        function e(e, t) {
            return o.globaljQueryCrossOriginSupportFn || (I.jQueryExtensions._globaljQueryCrossOriginSupportFn = b(I.jQueryExtensions.CrossOriginSupportTransportFn(e, t), o, {
                defineAs: "globaljQueryCrossOriginSupportFn",
                allowCallbacks: !0,
                allowCrossOriginArguments: !0
            }));
        }
        I.jQueryExtensions.CrossOriginSupportTransportFn = function(e, t) {
            return function(t, n, r) {
                var o = !0;
                try {
                    o = I.Config("jQueryExtensions.CrossOrigin");
                } catch (e) {}
                if (i != typeof GM_xmlhttpRequest && o) {
                    var a = (e || $ || I).extend, s = a(!0, {}, t, n), l = {
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
                        send: function(e, r) {
                            var o = (n.dataType || "").toLowerCase(), c = {
                                method: t.type || "GET",
                                url: t.url,
                                data: a({}, t.data || {}, n.data || {}),
                                headers: e,
                                onload: function(e) {
                                    var t = {
                                        text: e.responseText
                                    }, n = "";
                                    try {
                                        n = /Content-Type:\s*([^\s]+)/i.exec(e.responseHeaders)[1];
                                    } catch (e) {}
                                    if ("html" === o || /text\/html/i.test(n)) t.html = e.responseText; else if ("json" === o || "text" !== o && /\/json/i.test(n)) try {
                                        t.json = $.parseJSON(e.responseText);
                                    } catch (e) {} else if ("xml" == o || "text" !== o && /\/xml/i.test(n)) if (e.responseXML) t.xml = e.responseXML; else try {
                                        t.xml = new DOMParser().parseFromString(e.responseText, "text/xml");
                                    } catch (e) {}
                                    r(200, "success", t, e.responseHeaders);
                                },
                                onerror: function(e) {
                                    r(404, "error", {
                                        text: e.responseText
                                    }, e.responseHeaders);
                                }
                            };
                            for (key in l) i != typeof s[key] && (c[l[key]] = s[key]);
                            !1 === s.async && (c.synchronous = !0), GM_xmlhttpRequest(c);
                        },
                        abort: function() {}
                    };
                }
            };
        }, I.jQueryExtensions.addCrossOriginSupport = function(e, t) {
            i != typeof GM_xmlhttpRequest && (e || (e = I.jQuery)) && !0 !== e.jModCrossOriginSupport && (e.ajaxTransport(t || "* text html xml json", I.jQueryExtensions.CrossOriginSupportTransportFn(e, t)), 
            e.extend({
                jModCrossOriginSupport: !0
            }));
        }, I.jQueryExtensions.exportCrossOriginSupport = function(t, n) {
            i != typeof GM_xmlhttpRequest && t && !0 !== t.jModCrossOriginSupport && (t.ajaxTransport(n || "* text html xml json", e(t, n)), 
            t.extend({
                jModCrossOriginSupport: !0
            }));
        };
    }() + function() {
        var e = I.jQueryExtensions.Selectors = function(t, n) {
            if (t) {
                var r;
                if (1 != arguments.length) for (r = 1; r < arguments.length; r++) i != typeof e.ext[arguments[r]] && e.ext[arguments[r]](t); else for (r in e.ext) e[r](t);
            }
        };
        e.ext = {}, e.ext.inView = function(e) {
            e && !e.expr[":"].inView && e.extend(e.expr[":"], {
                inView: function(t) {
                    win = r || o, doc = document || win.document;
                    var n = doc.documentElement.scrollTop || doc.body.scrollTop, i = e(t).offset().top, a = win.innerHeight && win.innerHeight < e(win).height() ? win.innerHeight : e(win).height();
                    return i > n && e(t).height() + i < n + a;
                }
            });
        };
    }() + function() {
        function e(e) {
            if (!e || e.length < 3) return [ e || "" ];
            var n = t.exec(e);
            return n ? [ n[1].trim(), n[2].trim() ] : [ e ];
        }
        var t = /^\s*((?:(?:\:\w+\([^\)]+\))|[^\s\<\>\~\+\|]|[\<\>\~\+\|\^\$\*](?=\=.+\]))+)\s*(.*?)$/;
        I.jQueryExtensions.extendTokenizer = function(t) {
            function n(e) {
                return e.join("|").replace(/\./g, "\\.").replace(/\+/g, "\\+").replace(/\</g, "\\<").replace(/\>/g, "\\>").replace(/\)/g, "\\)").replace(/\(/g, "\\(");
            }
            if ((t || (t = I.jQuery)) && i == typeof t.jModTokenizer) {
                t._oldFindFn = t.find, t.find = function(n, r, i, a) {
                    if (r = r || document || o.document, i = i || [], t.jModTokenizer && t.find.jModTokens.regexTest.test(n)) {
                        var s, l, c, u, f, d, p, g, m, h;
                        for (d = n.split(","), c = 0; c < d.length; c++) if (t.find.jModTokens.regexTest.test(d[c]) && (f = t.find.jModTokens.regex.exec(d[c])[1]) && (u = t.find.jModTokens.tokens[f])) {
                            if (g = d[c].split(f, 2), p = t._oldFindFn(g[0], r), p && p.length > 0) for (s = 0; s < p.length; s++) if (u.find) if (m = e(g[1]), 
                            1 == m.length || "" == m[1]) u.find(g[1], p[s], i, a); else for (h = u.find(m[0], p[s]), 
                            l = 0; l < h.length; l++) t.find(m[1], h[l], i, a); else t.find(g[1], p[s], i, a);
                        } else t._oldFindFn(d[c], r, i, a);
                        return i;
                    }
                    return t._oldFindFn(n, r, i, a);
                };
                for (re in t._oldFindFn) t.find[re] = t._oldFindFn[re];
                var r = ",.";
                return t.find.jModTokens = {
                    tokens: {},
                    tokenOrder: [],
                    sortOrder: function(e, t) {
                        return e.length > t.length ? -1 : e.length < t.length ? 1 : 0;
                    },
                    _regex: null,
                    _regexTest: null,
                    add: function(e, n) {
                        if (r.indexOf(e) == -1) {
                            var o = t.find.jModTokens;
                            o._regex = null, o._regexTest = null, o.tokens[e] = n, o.tokenOrder.push(e), o.tokenOrder.sort(this.sortOrder);
                        }
                    },
                    remove: function(e) {
                        var n = t.find.jModTokens;
                        n.tokens[e] && (delete n.tokens[e], n._regex = null, n._regexTest = null, n.tokenOrder.splice(n.tokenOrder.indexOf(e), 1), 
                        n.tokenOrder.sort(this.sortOrder));
                    },
                    removeAll: function() {
                        var e = t.find.jModTokens;
                        e.tokens[token] = {}, e.tokenOrder = [], e._regex = null, e._regexTest = null;
                    }
                }, Object.defineProperty(t.find.jModTokens, "regex", {
                    get: function() {
                        if (t.find.jModTokens._regex) return t.find.jModTokens._regex;
                        var e = n(t.find.jModTokens.tokenOrder);
                        return t.find.jModTokens._regex = new RegExp("(" + e + ")"), t.find.jModTokens._regex;
                    }
                }), Object.defineProperty(t.find.jModTokens, "regexTest", {
                    get: function() {
                        if (t.find.jModTokens._regexTest) return t.find.jModTokens._regexTest;
                        var e = n(t.find.jModTokens.tokenOrder);
                        return t.find.jModTokens._regexTest = new RegExp("(?:^|[^\\.])(" + e + ")(?:[\\s\\.\\#\\w\\*\\:]|$)"), 
                        t.find.jModTokens._regexTest;
                    }
                }), t.extend({
                    jModTokenizer: !0
                }), t;
            }
        }, I.jQueryExtensions.addSiblingTokens = function(e) {
            (e || (e = I.jQuery)) && i != typeof e.find.jModTokens && (e.find.jModTokens.add("++", {
                find: function(t, n, r, o) {
                    r = r || [];
                    var i = 0, a = e(n).siblings(t);
                    if (a) for (;i < a.length; i++) r.indexOf(a[i]) == -1 && r.push(a[i]);
                    return r;
                }
            }), e.find.jModTokens.add("+>", {
                find: function(t, n, r, o) {
                    r = r || [];
                    var i = 0, a = e(n).nextAll(t);
                    if (a) for (;i < a.length; i++) r.indexOf(a[i]) == -1 && r.push(a[i]);
                    return r;
                }
            }), e.find.jModTokens.add("+<", {
                find: function(t, n, r, o) {
                    r = r || [];
                    var i = 0, a = e(n).prevAll(t);
                    if (a) for (;i < a.length; i++) r.indexOf(a[i]) == -1 && r.push(a[i]);
                    return r;
                }
            }));
        }, I.jQueryExtensions.removeTokenizer = function(e) {
            if ((e || (e = I.jQuery)) && i != typeof e.jModTokenizer) return delete e.jModTokenizer, 
            e.find = e._oldFindFn, e._oldFindFn = a, delete e._oldFindFn, e;
        };
    }() + function() {
        function e(e) {
            return e + "px";
        }
        function t(e, t) {
            return function(n) {
                e.draggableListeners[t].push(n);
            };
        }
        function i(e) {
            return {
                top: parseInt(e.offsetTop),
                left: parseInt(e.offsetLeft)
            };
        }
        function a(e) {
            e.draggableListeners = {
                start: [],
                drag: [],
                stop: []
            }, e.whenDragStarts = t(e, "start"), e.whenDragging = t(e, "drag"), e.whenDragStops = t(e, "stop");
        }
        function s(t, n) {
            h = n;
            var r = Ce(h, "enscroll-track");
            r && de(r, "dragging");
            var o = i(h);
            h.style.top = e(o.top), h.lastXPosition = t.clientX, h.lastYPosition = t.clientY;
            var a = l("start", {
                x: o.left,
                y: o.top,
                el: h,
                mouseEvent: t
            });
            a && c();
        }
        function l(e, t) {
            for (var n = !0, r = h.draggableListeners[e], o = r.length - 1; o >= 0; o--) !1 === r[o](t) && (n = !1);
            return n;
        }
        function c() {
            var e = I.Element.document;
            be(e, "selectstart", f), be(e, "mousemove", d), be(e, "mouseup", u);
        }
        function u(e) {
            var t = I.Element.document;
            ve(t, "selectstart", f), ve(t, "mousemove", d), ve(t, "mouseup", u);
            var n = parseInt(h.style.left, 10), r = parseInt(h.style.top, 10), o = Ce(h, "enscroll-track");
            o && pe(o, "dragging"), l("stop", {
                x: n,
                y: r,
                el: h,
                mouseEvent: e
            });
        }
        function f(e) {
            return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), 
            e.returnValue = !1, v(e), !1;
        }
        function d(t) {
            t.preventDefault && t.preventDefault(), t.returnValue = !1;
            var n = h.style, o = parseInt(n.left, 10), i = parseInt(n.top, 10), a = o + (t.clientX - h.lastXPosition), s = i + (t.clientY - h.lastYPosition), c = Ce(h, "jModScrollBar");
            if (c) {
                var u = c.parentElement, f = r.getComputedStyle(u), d = parseFloat(f.height), p = (parseFloat(f.width), 
                r.getComputedStyle(h)), g = parseFloat(p.height);
                parseFloat(p.width), parseFloat(u.scrollHeight) - d;
                parseInt(s) + g > d ? s = d - g : parseInt(s) < 0 && (s = 0);
            }
            n.top = e(s), h.lastXPosition = t.clientX, h.lastYPosition = t.clientY;
            try {
                document.selection.empty();
            } catch (e) {}
            try {
                r.getSelection().removeAllRanges();
            } catch (e) {}
            l("drag", {
                x: a,
                y: s,
                el: h,
                mouseEvent: t
            });
        }
        function p(e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
        }
        function g(e) {
            var t = e.dataset, n = t._duration || parseInt(300 / 16.66666, 10);
            if (!0 === e.dataset._scrollingY || "true" === e.dataset._scrollingY) {
                var o = parseInt(t._endY) - parseInt(t._startY);
                if (0 === o) e.dataset._scrollingY = !1; else {
                    var i = e.scrollTop, a = M(parseInt(t._startY), o, n, i);
                    o > 0 ? i >= parseInt(t._endY) || i < parseInt(t._startY) ? e.dataset._scrollingY = !1 : (_(e, Math.max(1, E(o, n, a))), 
                    "function" == typeof y ? y(function() {
                        g(e);
                    }) : r[y](function() {
                        g(e);
                    })) : i <= parseInt(t._endY) || i > parseInt(t._startY) ? e.dataset._scrollingY = !1 : (_(e, Math.min(-1, E(o, n, a))), 
                    "function" == typeof y ? y(function() {
                        g(e);
                    }) : r[y](function() {
                        g(e);
                    }));
                }
            }
        }
        function m(e, t) {
            var n = parseInt(e.scrollTop), o = r.getComputedStyle(e), i = parseFloat(o.height), a = (parseFloat(o.width), 
            parseFloat(e.scrollHeight) - i);
            e.dataset._scrollingY && "false" != e.dataset._scrollingY || (e.dataset._scrollingY = !0, 
            e.dataset._startY = n, e.dataset._endY = e.dataset._startY, "function" == typeof y ? y(function() {
                g(e);
            }) : r[y](function() {
                g(e);
            }));
            var s = parseInt(e.dataset._endY) - parseInt(e.dataset._startY);
            return s > 0 && t < 0 || s < 0 && t > 0 ? (e.dataset._startY = n, e.dataset._endY = e.dataset._startY) : e.dataset._endY = t > 0 ? Math.min(n + t + parseInt(2 * s / 3), a) : Math.max(0, n + t + parseInt(2 * s / 3)), 
            t < 0 && n > 0 || t > 0 && n < a;
        }
        I.Scrollbar = function(e, t) {
            I.Scrollbar.addScrollBar(e, t);
        }, I.Scrollbar.addScrollBar = function(e, t) {
            if (U(e)) {
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
                }, i = _e(o);
                I.Element.addResizeListener(e, function() {
                    n.log("Element Resized"), I.Scrollbar.resizeScrollBar(this);
                }), Ee(e, i), I.Scrollbar.resizeScrollBar(e);
                var l = function(e) {
                    I.Scrollbar.handlers.target_onScroll.call(this, e);
                };
                "onwheel" in e || "WheelEvent" in r && navigator.userAgent.toLowerCase().indexOf("msie") >= 0 ? be(e, "wheel", l, !1) : be(e, "mousewheel", l, !1);
                var c = I.$(".enscroll-track", i), u = I.$(".handle3", i), f = function(e) {
                    n.log("mousedown", this, e), s(e, this);
                };
                a(u), u.whenDragging(function(e) {
                    n.log("whenDragging args", e, this);
                    var t = Ce(e.el, "jModScrollBar");
                    t.parentElement;
                }), be(u, "mousedown", f, !1), be(u, "touchstart", function(e) {
                    n.log("touchstart", e);
                }, !1), e.onscroll = function(e) {
                    ue(c, "dragging") || I.Scrollbar.resizeScrollBar(this);
                };
            }
        };
        var h;
        I.Scrollbar.resizeScrollBar = function(e) {
            var t = I.$(".jModScrollBar");
            if (t) {
                var n = I.$(".enscroll-track", t), i = I.$(".handle3", t), a = (r || o).getComputedStyle(e, null), s = parseFloat(a.height), l = parseFloat(a.width), c = parseFloat(e.scrollHeight), u = (parseFloat(e.scrollWidth), 
                parseFloat(e.scrollTop)), f = (parseFloat(e.scrollLeft), 0), d = 0;
                t.style.left = parseInt(l - 10) + "px", n.style.height = parseInt(s) + "px", f = s / c * s, 
                d = s / c * u, d < 0 && (d = 0), d += u, i.style.height = f + "px", i.style.top = d + "px";
            }
        };
        var y = r.requestAnimationFrame ? "requestAnimationFrame" : r.mozRequestAnimationFrame ? "mozRequestAnimationFrame" : r.webkitRequestAnimationFrame ? "webkitRequestAnimationFrame" : r.oRequestAnimationFrame ? "oRequestAnimationFrame" : r.msRequestAnimationFrame ? "msRequestAnimationFrame" : function(e) {
            setTimeout(e, 17);
        }, b = .5 * Math.PI, E = (10 * Math.log(2), function(e, t, n) {
            var r = b / t, o = e * r;
            return Math.round(o * Math.cos(r * n));
        }), M = function(e, t, n, r) {
            return 2 * n / Math.PI * Math.asin((r - e) / t);
        }, _ = function(e, t) {
            e.scrollTop = parseInt(e.scrollTop) + parseInt(t);
        };
        I.Scrollbar.handlers = {
            target_onScroll: function(e) {
                var t, n = 10, r = "deltaX" in e ? -e.deltaX : "wheelDeltaX" in e ? e.wheelDeltaX : 0, o = "deltaY" in e ? -e.deltaY : "wheelDeltaY" in e ? e.wheelDeltaY : "wheelDelta" in e ? e.wheelDelta : 0;
                Math.abs(r) > Math.abs(o) ? t = (r > 0 ? -n : n) << 2 : (t = (o > 0 ? -1 * n : n) << 2, 
                m(this, t) && p(e));
            },
            target_onResize: function() {},
            track_onMouseDown: function() {},
            track_onMouseUp: function() {},
            track_handle_onMouseDown: function(e) {
                var t = Ce(this, "enscroll-track");
                t && de(t, "dragging");
            },
            track_handle_onMouseUp: function(e) {
                var t = Ce(this, "enscroll-track");
                t && pe(t, "dragging");
            }
        };
    }(), I.CSS = ".jmod-na .track3{width:10px;background:rgba(0,0,0,0);margin-right:0px;-webkit-transition:background 250ms linear;transition:background 250ms linear;}.jmod-na .track3:hover,.jmod-na .track3.dragging{background:#d9d9d9;background:rgba(0,0,0,0.15);}.jmod-na .handle3{width:7px;right:0;background:#999;background:rgba(0,0,0,0.4);-webkit-transition:width 250ms;transition:width 250ms;cursor:pointer;}.jmod-na .track3:hover .handle3,.jmod-na .track3.dragging .handle3{width:10px;}", 
    I.Config.Tooltip = I.extend({
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
    }, I.Config.Tooltip || {});
    var Ae, Oe = "Tooltip.containerId", Re = "Tooltip.attributeNames.id", Pe = "Tooltip.attributeNames.tooltip", Fe = "Tooltip.attributeNames.placement", He = "Tooltip.classNames.tooltipTarget", ze = "Tooltip.classNames.tooltip", De = I.Tooltip = function(e, t) {
        U(e) && I.Tooltip.AddTooltipsToElement.apply(I.Tooltip, arguments);
    };
    Object.defineProperties(De, {
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
                return De.Initialized || De.init(), Ae || (Ae = document.getElementById(te(Oe))), 
                Ae;
            },
            set: function(e) {
                Ae = e;
            }
        },
        get: {
            value: function(e) {
                var t, n, r, o = te(Re);
                if (U(e)) return ue(e, te(ze)) ? document.querySelector("." + te(He) + " [" + o + '="' + e.id + '"]') : (ue(e, te(He)) && e.hasAttribute(o) ? t = e.getAttribute(o) : this.TooltipContainer && null !== (r = this.TooltipContainer.querySelector("." + te(He) + " [" + o + "]")) && (t = r.getAttribute(o)), 
                document.getElementById(t));
                if ("string" == typeof e) {
                    if (null !== (n = document.getElementById(e))) return n;
                } else if ("number" == typeof e && this.TooltipContainer && this.TooltipContainer.childElementCount > e) return tooltipContainer.children[e];
                return null;
            }.bind(De)
        }
    });
    var Ve = 200;
    De.MoveTooltip = function(e, t, n) {
        "top" in n ? t.style.top = n.top : "bottom" in n && (t.style.bottom = n.bottom), 
        "left" in n ? t.style.left = n.left : "right" in n && (t.style.right = n.right);
        var r = te("Tooltip.attributeNames.margin");
        e.hasAttribute(r + "-top") && (t.style.marginTop = e.getAttribute(r + "-top")), 
        e.hasAttribute(r + "-left") && (t.style.marginLeft = e.getAttribute(r + "-left")), 
        e.hasAttribute(r + "-bottom") && (t.style.marginBottom = e.getAttribute(r + "-bottom")), 
        e.hasAttribute(r + "-right") && (t.style.marginRight = e.getAttribute(r + "-right"));
    }, De.MoveTooltipToTarget = function(e, t, n) {
        var r, o, i;
        if (ue(e, te(ze))) r = e; else {
            if (!e.hasAttribute(te(Re))) return;
            r = document.getElementById(e.getAttribute(te(Re)));
        }
        var a = t.getAttribute(te(Fe)) || "top", s = Se(t);
        switch (a) {
          case "left-top":
            o = parseInt(s.top), i = s.left - parseInt(r.offsetWidth), De.MoveTooltip(t, r, {
                top: o + "px",
                left: i + "px"
            });
            break;

          case "left-bottom":
            o = s.top + s.height - parseInt(r.offsetHeight), i = s.left - parseInt(r.offsetWidth), 
            De.MoveTooltip(t, r, {
                top: o + "px",
                left: i + "px"
            });
            break;

          case "left":
            o = s.top + parseInt(s.height / 2) - parseInt(parseInt(r.offsetHeight) / 2), i = s.left - parseInt(r.offsetWidth), 
            De.MoveTooltip(t, r, {
                top: o + "px",
                left: i + "px"
            });
            break;

          case "right-top":
            o = parseInt(s.top), i = s.left + s.width, De.MoveTooltip(t, r, {
                top: o + "px",
                left: i + "px"
            });
            break;

          case "right-bottom":
            o = s.top + s.height - parseInt(r.offsetHeight), i = s.left + s.width, De.MoveTooltip(t, r, {
                top: o + "px",
                left: i + "px"
            });
            break;

          case "right":
            o = s.top + parseInt(s.height / 2) - parseInt(r.offsetHeight / 2), i = s.left + s.width, 
            De.MoveTooltip(t, r, {
                top: o + "px",
                left: i + "px"
            });
            break;

          case "bottom-left":
            o = s.top + s.height, i = s.left, De.MoveTooltip(t, r, {
                top: o + "px",
                left: i + "px"
            });
            break;

          case "bottom-right":
            o = s.top + s.height, i = s.left + s.width - parseInt(r.offsetWidth), De.MoveTooltip(t, r, {
                top: o + "px",
                left: i + "px"
            });
            break;

          case "bottom":
            o = s.top + s.height, i = s.left + parseInt(s.width / 2) - parseInt(parseInt(r.offsetWidth) / 2), 
            De.MoveTooltip(t, r, {
                top: o + "px",
                left: i + "px"
            });
            break;

          case "top-left":
            o = s.top - parseInt(r.offsetHeight), i = s.left, De.MoveTooltip(t, r, {
                top: o + "px",
                left: i + "px"
            });
            break;

          case "top-right":
            o = s.top - parseInt(r.offsetHeight), i = s.left + s.width - parseInt(r.offsetWidth), 
            De.MoveTooltip(t, r, {
                top: o + "px",
                left: i + "px"
            });
            break;

          case "top":
          default:
            o = s.top - parseInt(r.offsetHeight), i = s.left + parseInt(s.width / 2) - parseInt(parseInt(r.offsetWidth) / 2), 
            De.MoveTooltip(t, r, {
                top: o + "px",
                left: i + "px"
            });
        }
    }, De.HideAllExcept = function(e) {
        for (var t, n = [], r = I.$$(".jmod-na ." + te(ze) + ".in"), o = 0; o < r.length; o++) t = r[o], 
        "block" == t.style.display && t !== e && (pe(t, "in"), n.push(t));
        setTimeout(function(e) {
            for (var t = 0; t < e.length; t++) ue(e[t], "in") || (e[t].style.display = "none");
        }, Ve, n);
    }, De.handler = {
        mouseenter: function(e) {
            var t = this.getAttribute(te(Re)), n = this.getAttribute(te(Pe)), o = this.getAttribute(te(Fe)) || "top", i = De.TooltipContainer;
            switch (o) {
              case "top-left":
              case "top-right":
                o = "top " + o;
                break;

              case "bottom-left":
              case "bottom-right":
                o = "bottom " + o;
                break;

              case "left-top":
              case "left-bottom":
                o = "left " + o;
                break;

              case "right-top":
              case "right-bottom":
                o = "right " + o;
            }
            var a = document.getElementById(t);
            a || (a = _e({
                type: "div",
                id: t,
                className: te(ze) + " " + o + " fade slow",
                style: {
                    display: "none"
                },
                innerHTML: [ '<div class="tooltip-arrow"></div>', '<div class="tooltip-inner">' + n + "</div>" ]
            }), a.addEventListener("mouseenter", function(e) {
                var t = r.getComputedStyle(this, null).getPropertyValue("opacity");
                t > .2 && (de(this, "in"), De.HideAllExcept(this));
            }), a.addEventListener("mouseleave", function(e) {
                r.getComputedStyle(this, null).getPropertyValue("opacity");
                pe(this, "in"), setTimeout(function(e) {
                    ue(e, "in") || (e.style.display = "none");
                }, Ve, this);
            }), a.addEventListener("click", function(e) {
                pe(this, "in"), setTimeout(function(e) {
                    ue(e, "in") || (e.style.display = "none");
                }, Ve, this);
            }), i.appendChild(a)), De.HideAllExcept(a), a.style.display = "block", setTimeout(function(e, t) {
                de(t, "in"), De.MoveTooltipToTarget(t, e);
            }, 1, this, a);
        },
        mouseleave: function(e) {
            var t = De.get(this);
            t && (pe(t, "in"), setTimeout(function(e) {
                ue(e, "in") || (e.style.display = "none");
            }, Ve, t));
        },
        scroll: function(e) {
            var t, n, r;
            t = je(this, "jmod-na") ? I.$$("." + te(He) + "[" + te(Pe) + "]", this) : I.$$(".jmod-na ." + te(He) + "[" + te(Pe) + "]", this);
            for (var o = 0; o < t.length; o++) n = t[o].getAttribute(te(Re)), r = document.getElementById(n), 
            r && "block" == r.style.display && De.MoveTooltipToTarget(r, t[o]);
        }
    }, De.getTooltipsFromElement = function(e) {
        for (var t = [], n = I.$$("." + te(He) + "[" + te(Pe) + "]", e), r = 0; r < n.length; r++) n[r].getAttribute(te(Pe)) && t.push(n[r]);
        return t;
    }, De.AddTooltipsToElement = function(e) {
        for (var t = De.getTooltipsFromElement(e), n = 0; n < t.length; n++) {
            t[n].setAttribute(te(Re), "jmod-tooltip-" + De.Count++), t[n].addEventListener("mouseenter", De.handler.mouseenter), 
            t[n].addEventListener("mouseleave", De.handler.mouseleave);
            for (var r = t[n]; r.parentElement; ) r = r.parentElement, r.hasAttribute("data-jmod-scroll-event") || (r.setAttribute("data-jmod-scroll-event", !0), 
            r.addEventListener("scroll", De.handler.scroll));
        }
        e.addEventListener("scroll", De.handler.scroll);
    }, De.init = function() {
        De.Initialized = !0;
        var e = document.getElementById(te(Oe));
        null == e && (e = document.createElement("div"), e.id = te(Oe), e.className = "jModTooltipContainer jmod-na jmod-fa", 
        document.body.appendChild(e), Ae = e);
    }, I.CSS = ".jmod-na .fade.slow {transition: opacity " + (Ve / 1e3).toFixed(2).toString() + "s linear 0s;}", 
    I.Config.Notifications = {
        enabled: !0
    };
    var Ue = I.Notification = function(e, t) {
        if (!te("Notifications.enabled")) return !1;
        if (I.Notification.Initialized || I.Notification.init(), "string" == typeof e) switch (e.toLowerCase()) {
          case "get":
          case "getelement":
            return I.Notification.getElement.apply(I.Notification, L.call(arguments, 1));

          case "getid":
          case "getelementid":
            return I.Notification.getElementId.apply(I.Notification, L.call(arguments, 1));

          case "updatenotification":
            return I.Notification.UpdateNotification.apply(I.Notification, L.call(arguments, 1));
        } else "object" == typeof e && e.type && Ue.Types.create(e.type.toLowerCase(), e);
    };
    Ue.Types = {
        types: {},
        add: function(e) {
            this.types[e.name] = e;
        },
        callMethod: function(e, t) {
            if (i !== typeof this.types[e] && "function" == typeof this.types[e][t]) return this.types[e][t].apply(this.types[e], L.call(arguments, 2));
        },
        create: function(e, t) {
            this.callMethod(e, "create", t);
        },
        init: function() {
            for (var e in this.types) this.callMethod(e, "init");
        }
    }, +function(e) {
        var t = "jModSmallNotificationsWrapper";
        e.LargeCount = 0, Object.defineProperty(e, "CurrentLargeCount", {
            get: function() {
                var e = document.getElementById(t);
                return I.$$("div[data-jmod-large-notification]", e).length;
            }
        }), I.Notification.Types.add({
            name: "large",
            getWrapper: function() {
                return document.getElementById(t);
            },
            generateElement: function(t) {
                var n = {
                    type: "div",
                    className: "jModLargeNotification animated fadeIn fast",
                    style: {},
                    attributes: {
                        "data-jmod-notification": e.count,
                        "data-jmod-notification-type": "large",
                        "data-jmod-large-notification": e.LargeCount
                    }
                };
                if (t.background) {
                    var r;
                    "string" == typeof t.background ? (r = X(t.background)) && i != typeof t["background-opacity"] && (r.a = parseFloat(t["background-opacity"])) : "object" == typeof t.background && i != typeof t.background.color && (r = X(t.background.color)) && i != typeof t.background.opacity && (r.a = parseFloat(t.background.opacity)), 
                    r && (n.style.backgroundColor = "rgba(" + r.r + ", " + r.g + ", " + r.b + ", " + (isNaN(parseFloat(r.a)) ? "0.8" : parseFloat(r.a)) + ")");
                }
                var o = {
                    type: "div",
                    className: "",
                    innerHTML: [ {
                        type: "i",
                        id: "jModbtnClose" + e.LargeCount,
                        className: "btnClose fa fa-times",
                        EventListeners: {
                            click: function(t) {
                                if (!ue(this, "fadeOut")) {
                                    e.close(t.target);
                                    try {
                                        this.removeEventListener("click", arguments.callee);
                                    } catch (e) {}
                                }
                            }
                        }
                    } ],
                    style: {}
                };
                return typeof t.title !== i && o.innerHTML.push({
                    type: "span",
                    innerHTML: t.title
                }), o.innerHTML.push({
                    type: "div",
                    innerHTML: t.body
                }), typeof t.icon !== i && o.innerHTML.push({
                    type: "div",
                    className: "jmod-na largeIcon",
                    style: {
                        backgroundColor: "transparent"
                    },
                    innerHTML: {
                        type: "i",
                        className: "fa " + t.icon + " " + (t.iconAnimation || "swing") + " animated",
                        style: {
                            color: "#fff"
                        }
                    }
                }), n.innerHTML = o, _e(n);
            },
            create: function(e) {
                var t = this.getWrapper(), n = this.generateElement(e);
                t.appendChild(n), I.Notification.Events.addAll(e, I.Notification.count), I.Notification.count++, 
                I.Notification.LargeCount++;
            },
            close: function(t, n) {
                e.Events.fire("onBeforeClose", n, null, t), pe(t, "fadeIn"), de(t, "fadeOut"), setTimeout(function(t, n) {
                    t.style.display = "none", e.Events.fire("onAfterClose", n, null, t), t.parentElement.removeChild(t);
                }, 1e3, t, n);
            },
            init: function() {
                var n = e("getElement", "notificationsWrapper"), r = this.getWrapper();
                null == r && (r = document.createElement("div"), r.id = t, r.className = "jModNotifications", 
                n.appendChild(r));
            }
        });
    }(I.Notification), +function(e) {
        var t = "jModSmallNotificationsWrapper";
        e.SmallCount = 0, Object.defineProperty(e, "CurrentSmallCount", {
            get: function() {
                var e = document.getElementById(t);
                return I.$$("div[data-jmod-small-notification]", e).length;
            }
        }), I.Notification.Types.add({
            name: "small",
            getWrapper: function() {
                return document.getElementById(t);
            },
            generateElement: function(t) {
                var n = 25, r = e.CurrentSmallCount;
                if (r > 0) {
                    for (var o = 25 * r, a = e("getElement", "notificationsSmallWrapper"), s = I.$$("div[data-jmod-small-notification]", a), l = 0; l < s.length; l++) o += parseInt(s[l].offsetHeight);
                    n += o;
                }
                var c, u = {
                    type: "div",
                    className: "jModSmallNotification animated fadeIn",
                    style: {
                        top: n + "px"
                    },
                    innerHTML: [],
                    attributes: {
                        "data-jmod-notification": e.count,
                        "data-jmod-notification-type": "small",
                        "data-jmod-small-notification": e.SmallCount
                    },
                    EventListeners: {
                        click: function(e) {
                            for (var t = 0, n = e.target; !n.hasAttribute("data-jmod-small-notification") && null != n && t < 20; ) n = n.parentElement, 
                            t++;
                            if (null != n && !ue(n, "fadeOut")) {
                                parseInt(n.getAttribute("data-jmod-notification")), parseInt(n.getAttribute("data-jmod-small-notification"));
                                I.Notification.close(n);
                                try {
                                    this.removeEventListener("click", arguments.callee);
                                } catch (e) {}
                            }
                        }
                    }
                }, f = X("rgba(50, 118, 177, 0.8)");
                t.background && ("object" == typeof t.background ? (i != typeof t.background.color && (c = X(t.background.color)) && (null == c.a && (c.a = f.a), 
                f = c), i != typeof t.background.opacity && (f.a = t.background.opacity)) : (c = X(t.background)) && (null == c.a && (c.a = f.a), 
                f = c)), f && (u.style.backgroundColor = "rgba(" + f.r + ", " + f.g + ", " + f.b + ", " + f.a + ")");
                var d = {
                    type: "div",
                    className: "NotificationContent",
                    innerHTML: [],
                    style: {}
                };
                if (typeof t.footer != i) {
                    var p = document.createElement("div");
                    p.className = "largeIcon", U(t.icon) ? p.appendChild(t.icon) : p.innerHTML = '<i class="fa ' + t.icon + " " + (t.iconAnimation || "bounce") + ' animated"> </i>', 
                    u.innerHTML.push(p);
                }
                return t.title && d.innerHTML.push({
                    type: "span",
                    innerHTML: t.title
                }), t.body && d.innerHTML.push({
                    type: "p",
                    innerHTML: t.body
                }), t.footer && d.innerHTML.push({
                    type: "p",
                    style: {
                        textAlign: "right"
                    },
                    innerHTML: t.footer
                }), t.icon && !t.footer && d.innerHTML.push({
                    type: "div",
                    className: "smallIcon",
                    style: {
                        backgroundColor: "transparent"
                    },
                    innerHTML: {
                        type: "i",
                        className: "fa " + t.icon + " " + (t.iconAnimation || "swing") + " animated",
                        style: {
                            color: "#fff"
                        }
                    }
                }), u.innerHTML.push(d), _e(u);
            },
            create: function(e) {
                var t = this.getWrapper(), n = this.generateElement(e);
                t.appendChild(n), I.Notification.Events.addAll(e, I.Notification.count), I.Notification.count++, 
                I.Notification.SmallCount++;
            },
            close: function(t, n) {
                e.Events.fire("onBeforeClose", n, null, t);
                var r = parseInt(t.style.top), o = t;
                for (pe(t, "fadeIn"), de(t, "fast"), de(t, "fadeOut"), t.style.zIndex = "9998"; null != o.nextElementSibling && o.nextElementSibling.hasAttribute("data-jmod-small-notification"); ) o = o.nextElementSibling, 
                de(o, "transitionUp"), setTimeout(function(e, t) {
                    e.style.top = t + "px";
                }, 0, o, r), r = r + parseInt(o.offsetHeight) + 25;
                setTimeout(function(t, n) {
                    t.style.display = "none", e.Events.fire("onAfterClose", n, null, t), t.parentElement.removeChild(t);
                }, 1e3, t, n);
            },
            init: function() {
                var n = e("getElement", "notificationsWrapper"), r = this.getWrapper();
                null == r && (r = document.createElement("div"), r.id = t, r.className = "jModSmallNotifications", 
                n.appendChild(r));
            }
        });
    }(I.Notification), +function(e) {
        var t = "jModFillNotificationsWrapper";
        e.FillCount = 0, Object.defineProperty(e, "CurrentFillCount", {
            get: function() {
                var e = document.getElementById(t);
                return I.$$("div[data-jmod-fill-notification]", e).length;
            }
        }), I.Notification.Types.add({
            name: "fill",
            getWrapper: function() {
                return document.getElementById(t);
            },
            generateElement: function(t) {
                var n = {
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
                            innerHTML: t.title
                        }, {
                            type: "p",
                            className: "NotificationText",
                            innerHTML: t.body
                        } ]
                    } ]
                };
                if (t.background) {
                    var r;
                    "string" == typeof t.background ? (r = X(t.background)) && i != typeof t["background-opacity"] && (r.a = parseFloat(t["background-opacity"])) : "object" == typeof t.background && i != typeof t.background.color && (r = X(t.background.color)) && i != typeof t.background.opacity && (r.a = parseFloat(t.background.opacity)), 
                    r && (n.style.backgroundColor = "rgba(" + r.r + ", " + r.g + ", " + r.b + ", " + (r.a || 0 === parseFloat(r.a) ? parseFloat(r.a) : "0.8") + ")");
                }
                var o = {
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
                                    I.Notification.close(e.target);
                                    try {
                                        this.removeEventListener("click", arguments.callee);
                                    } catch (e) {}
                                }
                            }
                        }
                    } ]
                };
                n.innerHTML[0].innerHTML.push(o);
                var a = {
                    type: "div",
                    className: "jModFillNotificationContainer animated fadeIn fast",
                    innerHTML: [ n ],
                    attributes: {
                        "data-jmod-notification": e.count,
                        "data-jmod-notification-type": "fill",
                        "data-jmod-fill-notification": e.FillCount
                    },
                    EventListeners: {
                        click: function(e) {
                            if (this === e.target && !ue(this, "fadeOut")) {
                                I.Notification.close(this), v(e);
                                try {
                                    this.removeEventListener("click", arguments.callee);
                                } catch (e) {}
                                return !1;
                            }
                        }
                    }
                };
                return _e(a);
            },
            create: function(e) {
                var t = this.getWrapper(), n = this.generateElement(e);
                t.appendChild(n), I.Notification.Events.addAll(e, I.Notification.count), I.Notification.count++, 
                I.Notification.FillCount++;
            },
            close: function(t, n) {
                e.Events.fire("onBeforeClose", n, null, t), pe(t, "fadeIn"), de(t, "fadeOut"), setTimeout(function(t, n) {
                    t.style.display = "none", e.Events.fire("onAfterClose", n, null, t), t.parentElement.removeChild(t);
                }, 800, t, n);
            },
            init: function() {
                var n = e("getElement", "notificationsWrapper"), r = this.getWrapper();
                null == r && (r = document.createElement("div"), r.id = t, r.className = "jModFillNotifications", 
                r.style.position = "absolute", n.appendChild(r));
            }
        });
    }(I.Notification), Ue.UpdateNotification = function(e) {
        var t = I.extend(!0, {
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
        }, e);
        null == t.script_name && (t.script_name = te("script.script_name"));
        var n = t.title.replace("%SCRIPTNAME%", t.script_name).replace("%VERSION%", t.version).replace("%TIME%", t.time), r = t.body.replace("%SCRIPTNAME%", t.script_name).replace("%VERSION%", t.version).replace("%TIME%", t.time);
        t.install.href && null != t.install.href && "" != t.install.href || (t.install.href = te([ "script.script_info.jModdownloadURL", "script.script_info.downloadURL" ]), 
        typeof t.install.href === i && (t.install.href = "javascript:void(0);"));
        var o = document.createElement("a");
        o.setAttribute("href", t.install.href), null != t.install.target && o.setAttribute("target", t.install.target), 
        o.className = "btn btn-success btn-sm", o.innerHTML = t.install.text, "function" == typeof t.install.onClick && o.addEventListener("click", t.install.onClick), 
        t.visit.href && null != t.visit.href && "" != t.visit.href || (typeof te("script.script_info.homepage") !== i ? t.visit.href = te("script.script_info.homepage") : t.visit.href = "http://myuserjs.org/script/" + te("script.username") + "/" + te("script.script_name"));
        var a = document.createElement("a");
        a.setAttribute("href", t.visit.href), null != t.visit.target && a.setAttribute("target", t.visit.target), 
        a.className = "btn btn-warning btn-sm", a.innerHTML = t.visit.text, "function" == typeof t.visit.onClick && a.addEventListener("click", t.visit.onClick);
        var s = document.createElement("a");
        s.setAttribute("href", "javascript:void(0);"), s.className = "btn btn-danger btn-sm", 
        s.innerHTML = "Close";
        var l = [ o, a, s ];
        Ue({
            title: n,
            body: r,
            footer: l,
            icon: t.icon,
            iconAnimation: t.iconAnimation,
            type: "small"
        });
    }, Ue.getElementId = function(e) {
        switch (e.toLowerCase()) {
          case "wrapper":
          case "notificationswrapper":
            return "jModNotificationsWrapper";

          case "smallwrapper":
          case "notificationssmallwrapper":
            return "jModSmallNotificationsWrapper";

          case "largewrapper":
          case "notificationslargewrapper":
            return "jModLargeNotificationsWrapper";

          case "fillwrapper":
          case "notificationsfillwrapper":
            return "jModFillNotificationsWrapper";

          default:
            return null;
        }
    }, Ue.getElement = function(e) {
        var t = Ue.getElementId(e);
        return null != t ? document.getElementById(t) : document.getElementById(e);
    }, Ue.remove = function(e, t) {
        if (null != e) {
            if (e.hasAttribute("data-jmod-small-notification")) {
                var n = e, r = parseInt(e.style.top || 0);
                for (r <= 0 && (r = 20); null != n.nextElementSibling && n.nextElementSibling.hasAttribute("data-jmod-small-notification"); ) n = n.nextElementSibling, 
                n.className = "jModSmallNotification SmallBox transitionUp", n.style.top = r + "px", 
                r = r + parseInt(n.offsetHeight) + 25;
            }
            e.parentElement.removeChild(e);
        }
    }, Ue.Events = new Ie([ "onBeforeClose", "onAfterClose" ]), Ue.close = function(e) {
        var t, n, r, o = Ue("getElement", "notificationsWrapper"), i = "data-jmod-notification";
        if ("number" == typeof e) n = e, t = I.$("div[" + i + '="' + e + '"]', o); else {
            if (!U(e)) return;
            if (e.hasAttribute(i)) t = e; else if (!(t = I.$("div[" + i + "]", e)) && !(t = I.Element.findParentWithAttribute(e, i))) return;
            n = parseInt(t.getAttribute(i));
        }
        (r = t.getAttribute("data-jmod-notification-type")) && Ue.Types.callMethod(r, "close", t, n);
    }, Ue.count = 0, Ue.Initialized = !1, Ue.init = function() {
        if (!te("Notifications.enabled")) return !1;
        Ue.Initialized = !0;
        var e = (document.getElementsByTagName("head")[0], document.getElementsByTagName("body")[0], 
        Ue("getElement", "notificationsWrapper"));
        null == e && (e = document.createElement("div"), e.id = Ue("getElementId", "notificationsWrapper"), 
        e.className = "jModNotificationsFullWrapper jmod-na jmod-fa", document.body.appendChild(e)), 
        Ue.Types.init();
    }, I.CSS = "", I.Config.Tabs = I.extend({
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
    }, I.Config.Tabs || {});
    var $e = I.Tabs = function(e) {};
    $e.Initialized = !1, $e.GroupCount = 0;
    var Be = $e.att = {}, Ge = $e.cn = {};
    Object.defineProperties($e.att, {
        li: {
            get: function() {
                return te("Tabs.att.li");
            }
        },
        ul: {
            get: function() {
                return te("Tabs.att.ul");
            }
        },
        ct: {
            get: function() {
                return te("Tabs.att.ct");
            }
        },
        pane: {
            get: function() {
                return te("Tabs.att.pane");
            }
        }
    }), Object.defineProperties($e.cn, {
        nav: {
            get: function() {
                return te("Tabs.cn.nav");
            }
        },
        ct: {
            get: function() {
                return te("Tabs.cn.ct");
            }
        }
    }), $e.Events = new Ie([ "onBeforeShow", "onAfterShow" ]), $e.handler = {
        click: function(e) {
            var t = e.target, n = t.parentElement;
            if (this.contains(t) && "A" == t.nodeName) {
                var r = this.parentElement.querySelector("." + Ge.ct), o = he(t, "href");
                if (o) {
                    var i = r.querySelector(".tab-pane.active"), a = this.querySelector("li.active"), s = r.querySelector(o);
                    if (s) {
                        var l = he(this, Be.ul);
                        !1 !== $e.Events.fire("onBeforeShow", parseInt(l), this, [ t, s ]) && (a && pe(a, "active"), 
                        i && pe(i, "active"), de(n, "active"), de(s, "active"), $e.Events.fire("onAfterShow", parseInt(l), this, [ t, s ]));
                    }
                }
                v(e);
            }
        }
    }, $e.load = function(e) {
        var t, n, r;
        if (U(e)) n = e; else {
            if ("object" != typeof e || !e.target) return;
            n = e.target, n.onAfterResize = function(e) {
                return function() {
                    var t = this;
                    ue(t, "nav-tabs") || (t = I.$(".nav-tabs", t), t || (t = I.$(".nav-tabs", e))), 
                    t && j(t, C);
                };
            }(n), r = e.EventListeners;
        }
        if (t = ue(n, "tabbable") ? [ n ] : I.$$("div.tabbable", n)) for (var o = 0; o < t.length; o++) {
            var i = t[o].querySelector(".nav." + Ge.nav), a = t[o].querySelector("." + Ge.ct);
            i && a && (i.setAttribute(Be.ul, $e.GroupCount), a.setAttribute(Be.ct, $e.GroupCount), 
            "object" == typeof e && $e.Events.addAll(e, $e.GroupCount), i.addEventListener("click", $e.handler.click), 
            $e.GroupCount++);
        }
    }, $e.makeNavElement = function(e) {
        var t = {
            type: "li",
            id: e.id,
            className: (e.isActive || e.active ? "active " : "") + (e.className || e.class || ""),
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
        return t.attributes[Be.li] = e.index || -1, t;
    }, $e.makeContentElement = function(e) {
        var t = {
            type: "div",
            id: e.id,
            className: "container tab-pane " + (e.isActive || e.active ? "active " : "") + (e.className || e.class || ""),
            innerHTML: e.innerHTML || e.text || "",
            attributes: e.attributes || {}
        };
        return t.attributes[Be.pane] = e.index || -1, t;
    }, $e.show = function(e, t) {
        var n, r, o;
        if ("number" == typeof e && (e = document.querySelector("ul[" + Be.ul + '="' + e + '"]')), 
        U(e)) {
            if (me(e, Be.li)) o = e; else if ("number" == typeof t) o = I.$$("li[" + Be.li + "]", e)[t]; else if ("string" == typeof t) {
                for (r = I.$$("li[" + Be.li + "]", e), n = 0; n < r.length; n++) if (r[n].innerHTML == t) {
                    o = r[n];
                    break;
                }
            } else U(t) && me(t, Be.li) && (o = t);
            if (o && U(o)) return _(o.querySelector('a[data-toggle="tab"]'));
        }
    }, $e.resize = function(e) {
        I.Element.requestAnimationFrame(function() {
            j(e, C);
        });
    }, I.Config.Modal = I.extend({
        enabled: !0,
        cn: {
            container: "jModModalContainer"
        },
        id: {
            container: "jModModalContainer"
        }
    }, I.Config.Modal || {});
    var We, qe = "Modal.cn.container", Ye = "Modal.id.container", Je = I.Modal = function(e, t) {
        if (!te("Modal.enabled")) return !1;
        I.Modal.Initialized || I.Modal.init();
        try {
            if ("string" == typeof e) switch (e.toLowerCase()) {
              case "show":
              case "showmodal":
                return I.Modal.show.apply(I.Modal, L.call(arguments, 1));

              case "hide":
              case "hidemodal":
                return I.Modal.hide.apply(I.Modal, L.call(arguments, 1));
            } else if ("object" == typeof e) {
                var n = I.Modal.createModal(e), r = parseInt(he(n, "data-jmod-modal")), o = _e({
                    type: "div",
                    id: "jModModal-" + r + "-backdrop",
                    className: "modal-backdrop fade",
                    style: "display: none;",
                    attributes: {
                        role: "dialog",
                        tabindex: "-1",
                        "data-jmod-modal-backdrop": r
                    },
                    EventListeners: {
                        click: {
                            capture: !1,
                            callback: function(e) {
                                if (e.target === this) return this.style.display = "none", pe(document.body, "jmod-modal-open"), 
                                v(e), !1;
                            }
                        }
                    }
                }), a = Je.Container;
                return a && (a.appendChild(o), a.appendChild(n)), I.Modal.Modals[r] = {
                    index: r,
                    element: n,
                    lockScreen: e.lockScreen || !0,
                    data: e
                }, typeof e.features !== i && I.Modal.addJSFeatures(n, e.features), !0 === t && I.Modal.show(n), 
                n;
            }
        } catch (e) {
            we(e, "jMod.Modal");
        }
    };
    Object.defineProperties(Je, {
        fn: {
            value: Je.__proto__
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
                return We ? We : We = document.getElementById(te(Ye));
            },
            set: function(e) {
                We = e;
            }
        }
    });
    const Qe = 150;
    Je.getModal = function(e) {
        var t = I.$('div[data-jmod-modal="' + e + '"]');
        return t ? t : typeof Je.Modals[e] !== i ? Je.Modals[e].element : null;
    }, Je.addJSFeatures = function(e, t) {
        t.enableTabs && I.Tabs.load({
            target: e,
            onBeforeShow: function() {
                n.log("Tabs onBeforeShow: ", arguments);
            }
        }), t.enableTooltips && De(e);
    }, Je.getVisibleModals = function() {
        for (var e = 0, t = [], n = I.$$("div.modal.in[data-jmod-modal]", Je.Container); e < n.length; e++) t.push([ n[e], n[e].getAttribute("data-jmod-modal") ]);
        return t;
    }, Je.getModal2 = function() {
        var e, t, n, r = 0, o = arguments.length;
        if (o > 0) {
            for (;r < o; r++) {
                if (e = arguments[r], U(e)) return e;
                "string" != typeof e && "number" != typeof e || (n = parseInt(n));
            }
            if (null != n) {
                if ((t = I.$('div[data-jmod-modal="' + n + '"]', Je.Container)) && U(t)) return t;
                if (typeof Je.Modals[n] != i) return Je.Modals[n].element;
            }
        }
        return null;
    };
    var Xe = "data-jmod-modal-resizing";
    Je.resize = function() {
        var e, t, n, r, o, a, s, l, c, u, f, d = arguments.length;
        for (n = 0; n < d; n++) r = arguments[n], "number" == typeof r || "string" == typeof r ? e = parseInt(r) : U(r) ? u = r : E(r) && (t = r);
        if (i != typeof u || i != typeof e) {
            if (u || (u = Je.getModal2(u, e)), u && U(u)) {
                if (he(u, Xe, "boolean")) {
                    if (null == u.__resizeLast__) return;
                    I.Element.cancelAnimationFrame(u.__resizeLast__), u.__resizeLast__ = null;
                }
                u.setAttribute(Xe, "true"), o = parseInt(I.Element.viewportSize.getHeight()), a = I.$(".modal-dialog", u), 
                f = I.Element.getClientRect(a), parseInt(f.bottom) <= o && !u.hasVerticalScrollBar() && de(u, "no-vertical-scroll");
                try {
                    if (!1 === Je.Events.fire("onBeforeResize", e, u, t)) return void u.setAttribute(Xe, "false");
                } catch (e) {
                    return void we(e, "jMod.Modal.resize", 'Error firing event "onBeforeResize"');
                }
                null == e && (e = he(u, "data-jmod-modal", "integer")), u.__resizeLast__ = I.Element.requestAnimationFrame(function() {
                    if (u.__resizeLast__ = null, u.__resizeLastStartY__ = 0, u.__resizeLastEndY__ = 0, 
                    u.__resizeLastCurrentY__ = null, u.__resizeLastCount__ = 0, "none" != u.style.display) {
                        null != u.__restoreVerticalScroll__ && (clearTimeout(u.__restoreVerticalScroll__), 
                        u.__restoreVerticalScroll__ = null), o = parseInt(I.Element.viewportSize.getHeight()), 
                        s = I.$(".modal-body", a), l = I.$(".modal-footer", a), c = I.$(".modal-header", a);
                        var n;
                        _bodyCurrentHeight = parseInt(I.Element.getCompStyle(s, "height")), _bodyCurrentMaxHeight = parseInt(I.Element.getCompStyle(s, "maxHeight")), 
                        _bodyMinHeight = parseInt(I.Element.getCompStyle(s, "minHeight")), computedDialog = I.Element.getCompStyleObj(a), 
                        marginTop = parseInt(computedDialog.getPropertyValue("margin-top")), marginBottom = parseInt(computedDialog.getPropertyValue("margin-bottom")), 
                        maxHeight = o - parseInt(c.offsetHeight) - parseInt(l.offsetHeight) - marginTop - marginBottom - 15, 
                        _bodyMinHeight > maxHeight && (maxHeight = _bodyMinHeight), _bodyCurrentMaxHeight != maxHeight && (u.__resizeLastCurrentY__ = _bodyCurrentMaxHeight, 
                        u.__resizeLastStartY__ = _bodyCurrentMaxHeight, u.__resizeLastEndY__ = parseInt(maxHeight), 
                        n = function() {
                            var e = u.__resizeLast__;
                            if (u.__resizeLastCount__++, u.__resizeLastCount__ > 50) return void (s.style.maxHeight = u.__resizeLastEndY__ + "px");
                            var t = null == u.__resizeLastCurrentY__ || isNaN(parseInt(u.__resizeLastCurrentY__)) ? parseInt(I.Element.getCompStyle(s, "maxHeight")) : u.__resizeLastCurrentY__, r = parseInt(300 / 16.66666, 10) / 4, o = u.__resizeLastEndY__ - t, i = Z(parseInt(u.__resizeLastStartY__), o, r, t);
                            if (isNaN(i) ? i = 0 : i < 0 && (i *= -1), 0 != o) {
                                var a;
                                if (a = o > 0 ? Math.max(1, ee(o, r, i)) : Math.min(-1, ee(o, r, i)), 0 == a || isNaN(a)) return void (s.style.maxHeight = u.__resizeLastEndY__ + "px");
                                if (u.__resizeLastCurrentY__ = t + a, s.style.maxHeight = u.__resizeLastCurrentY__ + "px", 
                                null == u.__resizeLast__ || u.__resizeLast__ == e) return void (u.__resizeLastCurrentY__ != u.__resizeLastEndY__ && null != u.__resizeLastCurrentY__ ? u.__resizeLast__ = I.Element.requestAnimationFrame(n) : u.__resizeLast__ = null);
                            }
                        }, u.__resizeLast__ = I.Element.requestAnimationFrame(n)), f = I.Element.getClientRect(a), 
                        parseInt(f.bottom) > o && parseInt(f.height) < _bodyMinHeight + parseInt(c.offsetHeight) + parseInt(l.offsetHeight) + 15 ? pe(u, "no-vertical-scroll") : u.__restoreVerticalScroll__ = setTimeout(function(e, t) {
                            e.__restoreVerticalScroll__ = null, he(e, t, "boolean") || pe(e, "no-vertical-scroll");
                        }, 100, u, Xe);
                    }
                    try {
                        Je.Events.fire("onAfterResize", e, u, t);
                    } catch (e) {
                        we(e, "jMod.Modal.resize", 'Error firing event "onAfterResize"');
                    }
                    u.setAttribute(Xe, "false");
                });
            }
        } else {
            var p = Je.getVisibleModals();
            for (n = 0; n < p.length; n++) Je.resize(p[n][0], p[n][1], t);
        }
    }, Je.show = function(e, t, n) {
        try {
            if ("number" == typeof e && "number" != typeof t && (typeof n === i && typeof t !== i && (n = t), 
            t = e), (typeof e === i || null == e) && typeof t === i) return;
            if (typeof e !== i && null != e && "number" != typeof e || "number" != typeof t ? typeof e !== i && null != e && typeof t === i && (t = he(e, "data-jmod-modal")) : e = I.$('div[data-jmod-modal="' + t + '"]'), 
            Je.CurrentModal != -1 && Je.CurrentModal != t && Je.hide(), e) {
                var r = I.$('div[data-jmod-modal-backdrop="' + t + '"]');
                Je.Events.fire("onBeforeShow", t, e, [ n || null ]);
                Je.CurrentModal = t, de(I.Element.document.body, "jmod-modal-open"), r.style.display = "block", 
                e.style.display = "block", setTimeout(function(e, t) {
                    de(t, "in"), de(e, "in"), I.Element.requestAnimationFrame(function() {
                        Je.resize(e);
                    });
                }, 1, e, r), setTimeout(function(e, t, n) {
                    Je.Events.fire("onAfterShow", t, e, [ n || null ]);
                }, Qe, e, t, n || null);
            }
        } catch (e) {
            we(e, "jMod.Modal.show");
        }
    }, Je.hide = function(e, t, n) {
        try {
            if (typeof e === i && typeof t === i && Je.CurrentModal != -1 && (t = Je.CurrentModal, 
            e = Je.getModal(Je.CurrentModal)), "number" == typeof e && "number" != typeof t && (typeof n === i && typeof t !== i && (n = t), 
            t = e), typeof e === i && typeof t === i) return;
            if (U(e) || "number" != typeof t ? typeof e !== i && typeof t === i && (t = he(e, "data-jmod-modal")) : e = Je.getModal(t), 
            e) {
                var r = I.$('div[data-jmod-modal-backdrop="' + t + '"]');
                Je.Events.fire("onBeforeHide", t, e, [ n || null ]);
                Je.CurrentModal = -1, pe(I.Element.document.body, "jmod-modal-open"), ge(e, [ "in", "no-vertical-scroll" ]), 
                pe(r, "in"), setTimeout(function(e, t, n, r) {
                    e.style.display = "none", r.style.display = "none", Je.Events.fire("onAfterHide", t, e, [ n || null ]);
                }, Qe, e, t, n || null, r);
            }
        } catch (e) {
            we(e, "jMod.Modal.hide");
        }
    };
    var Ke = [ "onBeforeShow", "onAfterShow", "onBeforeHide", "onAfterHide", "onBeforeResize", "onAfterResize" ];
    Je.Events = new Ie(Ke), Je.createModal = function(e) {
        var t = Je.ModalCount++;
        Je.Events.addAll(e, t);
        for (var n = _e({
            type: "div",
            id: e.id || "jModModal-" + t,
            className: "modal fade " + (e.className || e.class || ""),
            style: "display: none;",
            attributes: {
                role: "dialog",
                tabindex: "-1",
                "data-jmod-modal": t
            },
            EventListeners: {
                click: {
                    capture: !1,
                    callback: function(e) {
                        if (e.target === this) {
                            var t = e.target, n = parseInt(he(t, "data-jmod-modal"));
                            return Je.hide(t, n, e), v(e), !1;
                        }
                    }
                }
            }
        }), r = 0; r < Ke.length; r++) Object.defineProperty(n, Ke[r], {
            get: function(e, t, n) {
                return function() {
                    Je.Events.getAll(n, e);
                }.bind(t);
            }.call(n, Ke[r], n, t),
            set: function(e, t, n) {
                return function(t) {
                    Je.Events.add(n, e, t);
                }.bind(t);
            }.call(n, Ke[r], n, t),
            enumerable: !0,
            configurable: !1
        });
        n.hasVerticalScrollBar = function() {
            var e = I.Element.getCompStyle(this, "overflowY");
            return null !== this.offsetParent && "hidden" != e && "visible" != e && ("scroll" == e || this.scrollHeight > I.Element.viewportSize.getHeight());
        }.bind(n);
        var o = _e({
            type: "div",
            className: "modal-dialog"
        });
        if (typeof e.style !== i) for (var a in e.style) o.style[a] = e.style[a];
        n.appendChild(o);
        var s = _e({
            type: "div",
            className: "modal-content"
        });
        o.appendChild(s);
        var l = _e({
            type: "div",
            className: "modal-header"
        });
        s.appendChild(l);
        var c = _e({
            type: "div",
            className: "modal-body"
        });
        s.appendChild(c);
        var u = _e({
            type: "div",
            className: "modal-footer"
        });
        s.appendChild(u), Ee(l, e.title);
        var f = _e({
            type: "div",
            className: "yt-close-btn-wrapper",
            innerHTML: '<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-close-btn">',
            EventListeners: {
                click: {
                    capture: !1,
                    callback: function(e) {
                        var t = e.target.parentElement.parentElement.parentElement.parentElement.parentElement, n = parseInt(he(t, "data-jmod-modal"));
                        return Je.hide(t, n, e);
                    }
                }
            }
        });
        if (l.appendChild(f), Ee(c, e.body), Ee(u, e.footer), typeof e.buttons !== i) for (var r in e.buttons) try {
            var d = I.extend(!0, {
                type: "button",
                text: "button"
            }, e.buttons[r]), p = _e(d);
            p && (ue(p, "btn") || de(p, "brn"), /btn\-(default|primary|success|info|warning|danger)/i.test(p.className) || de(p, "btn-default"), 
            u.appendChild(p));
        } catch (e) {
            we(e, "jMod.Modal.createModal", "footer buttons");
        }
        var g = _e({
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
                            var t = e.target.parentElement.parentElement.parentElement.parentElement, n = parseInt(he(t, "data-jmod-modal"));
                            return Je.hide(t, n, e), v(e), !1;
                        }
                    }
                }
            }
        });
        return u.appendChild(g), n;
    }, Je.init = function() {
        Je.Initialized = !0;
        var e = Je.Container;
        null == e && (e = I.Element.document.createElement("div"), e.id = te(Ye), e.className = "jmod-na jmod-fa jmod-gi " + te(qe), 
        I.Element.document.body.appendChild(e)), (r || o).addEventListener("resize", function(e) {
            I.Modal.resize(e);
        });
    }, I.CSS = ".jmod-na .nav.nav-tabs{border-width:0px;border-right-width:1px !important;border-style:solid !important;-webkit-border-image:-webkit-gradient(linear,0 0,0 100%,from(rgba(221,221,221,1)),color-stop(65%,rgba(221,221,221,1)),to(rgba(0,0,0,0))) 1 100%;-webkit-border-image:-webkit-linear-gradient(rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;-moz-border-image:-moz-linear-gradient(rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;-o-border-image:-o-linear-gradient(rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;border-image:linear-gradient(to bottom,rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;}.jmod-na .no-vertical-scroll[data-jmod-modal]{overflow-y:hidden;}", 
    I.Config.Settings = I.extend({
        enabled: !0,
        cn: {
            modal: "jModSettingsModal"
        },
        id: {
            modal: "jModSettingsModal"
        }
    }, I.Config.Settings || {});
    var Ze = "Settings.cn.modal", et = I.Settings = function(e, t) {
        if (!te("Settings.enabled")) return !1;
        if (I.Settings.Initialized || I.Settings.init(), "string" == typeof e) switch (e.toLowerCase()) {
          case "":        } else "object" == typeof e && (et._data = e, I.Settings.__storedData = a, 
        I.Settings.settingsModalElement = I.Settings.MakeSettingsModal(e), et.PrefTypes.onChange(), 
        I.Settings.onResize());
    };
    et.Initialized = !1, et.getDefault = function(e) {
        var t = 0, n = et._data;
        if (n && (n = n.settings)) for (t; t < n.length; t++) if (n[t].name == e) return n[t].default;
    }, et.get = function(e, t) {
        var n = et._storedData;
        return i === typeof e ? n : n && n[e] !== a ? n[e] : t ? a : et.getDefault(e);
    }, et.set = function(e, t) {
        var n = et._storedData || {};
        n[e] = t, et._storedData = n;
    }, et.clear = function() {
        et._storedData = {};
    }, Object.defineProperties(et, {
        _data: {
            value: {},
            writable: !0,
            enumerable: !1
        },
        __storedData: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
        },
        _storedData: {
            get: function() {
                if (typeof et.__storedData !== i) return et.__storedData;
                try {
                    var e = I.getValue("Settings_" + te("script.script_name"));
                    if (e) return JSON.parse(e);
                } catch (e) {}
            },
            set: function(e) {
                et.__storedData = e;
                try {
                    I.setValue("Settings_" + te("script.script_name"), JSON.stringify(e));
                } catch (e) {}
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
                return i !== typeof et._settingsModalElement && null != et._settingsModalElement ? et._settingsModalElement : et._settingsModalElement = I.$(".jModSettings");
            },
            set: function(e) {
                et._settingsModalElement = e;
            },
            enumerable: !0
        }
    }), et.PrefTypes = {
        _types: {},
        _call: function(e, t, n) {
            return typeof this._types[t] !== i && "function" == typeof this._types[t][e] ? this._types[t][e].apply(this._types[t], L.call(arguments, 2)) : a;
        },
        add: function(e, t) {
            this._types[e] = t;
        },
        make: function(e, t) {
            return this._call("make", e, t);
        },
        getValue: function(e) {
            var t = I.$('#jModSettingsModal [name="' + e.name + '"]');
            return t ? this._call("getValue", e.type, t, e) : a;
        },
        getValueByName: function(e) {
            var t, n = 0;
            try {
                t = et._data.settings;
            } catch (e) {
                return;
            }
            for (n; n < t.length; n++) if (t[n].name == e) return this.getValue(t[n]);
        },
        getDataByName: function(e) {
            var t, n = 0;
            try {
                t = et._data.settings;
            } catch (e) {
                return;
            }
            for (n; n < t.length; n++) if (t[n].name == e) return t[n];
        },
        setValue: function(e, t) {
            var n = I.$('#jModSettingsModal [name="' + e.name + '"]');
            return n ? this._call("setValue", e.type, n, e, t) : a;
        },
        enable: function(e) {
            var t, n, r, o = 0;
            if ("object" == typeof e) t = e; else if ("string" == typeof e) {
                try {
                    n = et._data.settings;
                } catch (e) {
                    return;
                }
                for (o; o < n.length; o++) if (n[o].name == e) {
                    t = n[o];
                    break;
                }
            }
            if (t) return r = I.$('#jModSettingsModal [name="' + t.name + '"]'), r ? this._call("enable", t.type, r, t) : a;
        },
        disable: function(e) {
            var t, n, r, o = 0;
            if ("object" == typeof e) t = e; else if ("string" == typeof e) {
                try {
                    n = et._data.settings;
                } catch (e) {
                    return;
                }
                for (o; o < n.length; o++) if (n[o].name == e) {
                    t = n[o];
                    break;
                }
            }
            if (t) return r = I.$('#jModSettingsModal [name="' + t.name + '"]'), r ? this._call("disable", t.type, r, t) : a;
        },
        onChange: function(e, t) {
            var n, r, o, a, s, l, c, u = !0, f = !1, d = 0;
            try {
                n = et._data.settings;
            } catch (e) {
                return;
            }
            for (d; d < n.length; d++) if (u = !0, n[d].depend && ("function" == typeof n[d].depend || i == typeof e || i !== typeof n[d].depend[e])) {
                if ("function" == typeof n[d].depend) c = I.$('#jModSettingsModal [name="' + n[d].name + '"]'), 
                u = n[d].depend(c, n[d]); else for (o in n[d].depend) {
                    r = n[d].depend[o], l = typeof r;
                    var p = et.PrefTypes.getDataByName(o);
                    try {
                        f = 1 == et.PrefTypes._types[p.type].multiValue;
                    } catch (e) {
                        f = !1;
                    }
                    switch (e == o ? a = t : i == typeof (a = this.getValueByName(o)) && (a = et.get(o)), 
                    f && (a = a.split(",")), l) {
                      case "function":
                        u = r(I.$('#jModSettingsModal [name="' + n[d].name + '"]'), n[d], a, p);
                        break;

                      case "object":
                        if ("array" == W(r)) if (f) {
                            for (s = 0; s < r.length; s++) if (a.indexOf(r[s]) == -1) {
                                u = !1;
                                break;
                            }
                        } else for (u = !1, s = 0; s < r.length; s++) if (r[s] == a) {
                            u = !0;
                            break;
                        }
                        break;

                      case "string":
                        if (f) {
                            for (r = r.split(","), s = 0; s < r.length; s++) if (a.indexOf(r[s]) == -1) {
                                u = !1;
                                break;
                            }
                        } else a != r && (u = !1);
                        break;

                      case "number":
                        f ? a.length < r && (u = !1) : parseInt(a) != parseInt(r) && (u = !1);
                    }
                    if (!u) break;
                }
                u ? et.PrefTypes.enable(n[d]) : et.PrefTypes.disable(n[d]);
            }
        }
    }, et.getElementId = function(e) {
        switch (e.toLowerCase()) {
          case "settings":
          case "settingselement":
          case "settingmodalselement":
            return "jModSettingsModal";
        }
        return null;
    }, et.getElement = function(e) {
        var t = et.getElementId(e);
        return null != t ? document.getElementById(t) : document.getElementById(e);
    }, et.PrefTypes.add("select", {
        make: function(e) {
            var t = (e.description || e.name, e.default || null), n = et.get(e.name), r = n || t, o = [];
            for (var a in e.options) o.push({
                type: "option",
                innerHTML: e.options[a],
                attributes: {
                    value: a,
                    selected: !(!r || r != a) || null
                }
            });
            var s = {
                type: "div",
                className: "pref-container",
                innerHTML: {
                    type: "select",
                    className: "form-control pref",
                    innerHTML: o,
                    style: e.style,
                    attributes: {
                        name: e.name,
                        "data-jmod-settings-pref": e.name,
                        "data-jmod-settings-pref-default": e.default || null,
                        "data-jmod-settings-pref-type": "select"
                    },
                    EventListeners: {
                        change: function(e) {
                            et.PrefTypes.onChange(e.target.getAttribute("name"), e.target.value);
                        }
                    }
                }
            };
            return i == typeof e.tooltip || i == typeof e.tooltip.innerHTML && i == typeof e.tooltip.text || (s.innerHTML = w(s.innerHTML, e.tooltip)), 
            s;
        },
        getValue: function(e, t) {
            return e.options[e.selectedIndex].value;
        },
        setValue: function(e, t, n) {
            for (var r = 0; r < e.options.length; r++) if (e.options[r].value == n) return e.selectedIndex = r, 
            !0;
            return !1;
        },
        enable: function(e, t) {
            e.hasAttribute("disabled") && e.removeAttribute("disabled");
        },
        disable: function(e, t) {
            e.setAttribute("disabled", "disabled");
        }
    }), et.PrefTypes.add("checkbox", {
        multiValue: !0,
        make: function(e) {
            var t = (e.description || e.name, e.default || ""), n = et.get(e.name), r = n || "" === n ? n : t;
            "object" != typeof r && (r = r.split(","));
            var o = [];
            for (var a in e.options) {
                var s = {
                    type: "label",
                    className: "checkbox-inline",
                    innerHTML: [ {
                        type: "input",
                        className: "checkbox",
                        attributes: {
                            name: e.name + "-o",
                            type: "checkbox",
                            value: a
                        },
                        checked: r.indexOf(a) != -1,
                        EventListeners: {
                            CheckboxStateChange: function(e) {
                                var t = e.target.parentElement.parentElement.getAttribute("name"), n = et.PrefTypes.getValueByName(t);
                                et.PrefTypes.onChange(t, n);
                            }
                        }
                    }, {
                        type: "span",
                        innerHTML: e.options[a].label,
                        attributes: {}
                    } ],
                    attributes: {}
                };
                i == typeof e.options[a].tooltip || i == typeof e.options[a].tooltip.innerHTML && i == typeof e.options[a].tooltip.text || (s.innerHTML[1] = w(s.innerHTML[1], e.options[a].tooltip)), 
                o.push(s);
            }
            var l = {
                type: "div",
                className: "form-group pref-container",
                innerHTML: o,
                attributes: {
                    name: e.name
                }
            };
            return l;
        },
        getValue: function(e, t) {
            for (var n = [], r = I.$$("input:checked", e), o = 0; o < r.length; o++) n.push(r[o].value);
            return n.join(",");
        },
        setValue: function(e, t, n) {
            for (var r = n.split(","), o = 0; o < e.options.length; o++) r.indexOf(he(e.options[o], "name")) != -1 ? e.options[o].checked = !0 : e.options[o].checked = !1;
            return !0;
        },
        enable: function(e, t) {
            for (var n = I.$$("input", e), r = 0; r < n.length; r++) n[r].hasAttribute("disabled") && n[r].removeAttribute("disabled");
        },
        disable: function(e, t) {
            for (var n = I.$$("input", e), r = 0; r < n.length; r++) n[r].setAttribute("disabled", "disabled");
        }
    }), et.PrefTypes.add("radio", {
        make: function(e) {
            var t = (e.description || e.name, e.default || ""), n = et.get(e.name), r = n || t, o = [];
            for (var a in e.options) {
                var s = {
                    type: "label",
                    className: "radio radio-inline",
                    innerHTML: [ {
                        type: "input",
                        className: "radiobox",
                        attributes: {
                            type: "radio",
                            value: a,
                            name: e.name + "-o"
                        },
                        checked: r.indexOf(a) != -1,
                        EventListeners: {
                            RadioStateChange: function(e) {
                                var t = e.target.parentElement.parentElement.getAttribute("name"), n = et.PrefTypes.getValueByName(t);
                                et.PrefTypes.onChange(t, n);
                            }
                        }
                    }, {
                        type: "span",
                        innerHTML: e.options[a].label,
                        attributes: {}
                    } ],
                    attributes: {}
                };
                i == typeof e.options[a].tooltip || i == typeof e.options[a].tooltip.innerHTML && i == typeof e.options[a].tooltip.text || (s.innerHTML[1] = w(s.innerHTML[1], e.options[a].tooltip)), 
                o.push(s);
            }
            var l = {
                type: "div",
                className: "form-group pref-container",
                innerHTML: o,
                attributes: {
                    name: e.name
                }
            };
            return l;
        },
        getValue: function(e, t) {
            return I.$("input:checked", e).value;
        },
        setValue: function(e, t, n) {
            for (var r = 0; r < e.options.length; r++) he(e.options[r], "name") == n ? e.options[r].checked = !0 : e.options[r].checked = !1;
            return !0;
        },
        enable: function(e, t) {
            for (var n = I.$$("input", e), r = 0; r < n.length; r++) n[r].hasAttribute("disabled") && n[r].removeAttribute("disabled");
        },
        disable: function(e, t) {
            for (var n = I.$$("input", e), r = 0; r < n.length; r++) n[r].setAttribute("disabled", "disabled");
        }
    }), et.PrefTypes.add("toggle", {
        multiValue: !0,
        make: function(e) {
            var t = (e.description || e.name, e.default || ""), n = et.get(e.name), r = n || "" === n.trim() ? n : t, o = [];
            for (var a in e.options) {
                var s = {
                    type: "label",
                    className: "toggle " + (e.options[a].className || ""),
                    innerHTML: [ {
                        type: "input",
                        className: "radiobox",
                        attributes: {
                            type: "checkbox",
                            value: a,
                            name: e.name + "-o"
                        },
                        checked: r.indexOf(a) != -1,
                        EventListeners: {
                            RadioStateChange: function(e) {
                                var t = e.target.parentElement.parentElement.getAttribute("name"), n = et.PrefTypes.getValueByName(t);
                                et.PrefTypes.onChange(t, n);
                            }
                        }
                    }, {
                        type: "i",
                        className: "",
                        attributes: {
                            "data-jmod-swchon-text": e.options[a].on || "ON",
                            "data-jmod-swchoff-text": e.options[a].off || "OFF"
                        }
                    }, e.options[a].label ],
                    attributes: {}
                };
                i == typeof e.options[a].tooltip || i == typeof e.options[a].tooltip.innerHTML && i == typeof e.options[a].tooltip.text || (s.innerHTML[1] = w(s.innerHTML[1], e.options[a].tooltip)), 
                o.push(s);
            }
            var l = {
                type: "div",
                className: "form-group pref-container",
                innerHTML: o,
                attributes: {
                    name: e.name
                }
            };
            return l;
        },
        getValue: function(e, t) {
            for (var n = [], r = I.$$("input:checked", e), o = 0; o < r.length; o++) n.push(r[o].value);
            return n.join(",");
        },
        setValue: function(e, t, n) {
            for (var r = n.split(","), o = 0; o < e.options.length; o++) r.indexOf(he(e.options[o], "name")) != -1 ? e.options[o].checked = !0 : e.options[o].checked = !1;
            return !0;
        },
        enable: function(e, t) {
            for (var n = I.$$("input", e), r = 0; r < n.length; r++) n[r].hasAttribute("disabled") && n[r].removeAttribute("disabled");
        },
        disable: function(e, t) {
            for (var n = I.$$("input", e), r = 0; r < n.length; r++) n[r].setAttribute("disabled", "disabled");
        }
    }), et.PrefTypes.add("input", {
        make: function(e) {
            var t = (e.description || e.name, e.default || ""), n = et.get(e.name), r = {
                type: "div",
                className: "pref-container",
                innerHTML: [ {
                    type: "input",
                    className: "form-control pref",
                    innerHTML: "",
                    style: e.style,
                    attributes: {
                        value: n || "" === n ? n : t,
                        name: e.name,
                        type: "text",
                        "data-jmod-settings-pref": e.name,
                        "data-jmod-settings-pref-default": e.default || null
                    },
                    EventListeners: {
                        input: function(e) {
                            et.PrefTypes.onChange(e.target.getAttribute("name"), e.target.value);
                        }
                    }
                } ]
            };
            if (i == typeof e.tooltip || i == typeof e.tooltip.innerHTML && i == typeof e.tooltip.text || (r.innerHTML[0] = w(r.innerHTML[0], e.tooltip)), 
            i != typeof e.icon) {
                r.className += " input-icon-right";
                var o = T(e.icon);
                r.innerHTML.unshift(o);
            }
            return r;
        },
        getValue: function(e, t) {
            return e.value;
        },
        setValue: function(e, t, n) {
            return e.value = n, !0;
        },
        enable: function(e, t) {
            e.hasAttribute("disabled") && e.removeAttribute("disabled");
        },
        disable: function(e, t) {
            e.setAttribute("disabled", "disabled");
        }
    }), et.PrefTypes.add("textarea", {
        make: function(e) {
            var t = (e.description || e.name, e.default || ""), n = et.get(e.name), r = {
                type: "div",
                className: "pref-container",
                innerHTML: [ {
                    type: "textarea",
                    className: "form-control pref",
                    innerHTML: n || "" === n ? n : t,
                    style: e.style,
                    attributes: {
                        name: e.name,
                        type: "text",
                        "data-jmod-settings-pref": e.name,
                        "data-jmod-settings-pref-default": e.default || null
                    },
                    EventListeners: {
                        input: function(e) {
                            et.PrefTypes.onChange(e.target.getAttribute("name"), e.target.value);
                        }
                    }
                } ]
            };
            if (i == typeof e.tooltip || i == typeof e.tooltip.innerHTML && i == typeof e.tooltip.text || (r.innerHTML[0] = w(r.innerHTML[0], e.tooltip)), 
            i != typeof e.icon) {
                var o = T(e.icon);
                o.className += " icon-append", r.innerHTML.unshift(o);
            }
            return r;
        },
        getValue: function(e, t) {
            return e.value;
        },
        setValue: function(e, t, n) {
            return e.value = n, !0;
        },
        enable: function(e, t) {
            e.hasAttribute("disabled") && e.removeAttribute("disabled");
        },
        disable: function(e, t) {
            e.setAttribute("disabled", "disabled");
        }
    }), et.PrefTypes.add("range", {
        make: function(e) {
            var t = (e.description || e.name, e.default || ""), r = et.get(e.name), o = {
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
                    value: parseInt(r || t),
                    attributes: {
                        name: e.name,
                        type: "range",
                        "data-jmod-settings-pref": e.name,
                        "data-jmod-settings-pref-default": e.default || null
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
                        value: r || t,
                        disabled: "disabled"
                    },
                    EventListeners: {
                        keypress: function(e) {
                            n.log("keypress", e);
                        }
                    }
                } ]
            };
            return i == typeof e.tooltip || i == typeof e.tooltip.innerHTML && i == typeof e.tooltip.text || (o.innerHTML[0] = w(o.innerHTML[0], e.tooltip)), 
            o;
        },
        getValue: function(e, t) {
            return e.value;
        },
        setValue: function(e, t, n) {
            return e.value = n, !0;
        },
        enable: function(e, t) {
            e.hasAttribute("disabled") && e.removeAttribute("disabled");
        },
        disable: function(e, t) {
            e.setAttribute("disabled", "disabled");
        }
    });
    var tt = function(e, t, n) {
        e.innerHTML = n || "", e.style.backgroundImage = "url(" + t + ")", e.setAttribute("data-src", t);
        var i = new Image();
        i.onload = function() {
            var t = parseInt(i.naturalHeight) + "px", n = parseInt(i.naturalWidth) + "px";
            isNaN(i.naturalHeight) || isNaN(i.naturalWidth) || (parseInt(t) > 300 ? (t = "300px", 
            n = "100%", e.style.backgroundSize = "contain") : e.style.backgroundSize = "100% 100%", 
            e.style.height = t, e.style.width = n), i.parentElement.removeChild(i);
        }, i.style.position = "absolute", i.style.opacity = "0", (r || o).document.body.appendChild(i), 
        i.src = t;
    };
    et.PrefTypes.add("imagefile", {
        make: function(e) {
            var t = e.default || "", n = et.get(e.name), r = n || t, o = "string" == typeof r && "" != r, a = new I.FileSelector({
                multiple: !1,
                accept: "image/*",
                button: {
                    style: e.style,
                    className: "btn btn-success",
                    innerHTML: [ '<i class="fa ' + (e.buttonIcon || "fa-file-image-o") + '" style="margin-right:10px;"></i>', e.buttonText || "Select an Image" ],
                    attributes: {
                        type: "button"
                    }
                },
                form: {
                    className: "imagefile-form pref",
                    attributes: {
                        name: e.name,
                        "data-jmod-settings-pref": e.name,
                        "data-jmod-settings-pref-default": e.default || null
                    }
                },
                onChange: function(e, t, n) {
                    I.FileSelector.ReadFileAsURL(t[0], function(e, t, n) {
                        var r = a.formElement.parentElement.lastChild;
                        tt(r, t, ""), et.PrefTypes.onChange(a.formElement.getAttribute("name"), t);
                    }, function(e, t, n) {
                        var r = a.formElement.parentElement.lastChild;
                        tt(r, "", "No Preview"), et.PrefTypes.onChange(a.formElement.getAttribute("name"), "");
                    });
                }
            }), s = {
                type: "div",
                className: "pref-container",
                innerHTML: [ a.formElement, _e({
                    type: "div",
                    className: "image-preview-container",
                    style: {},
                    attributes: {},
                    innerHTML: o ? "" : "No Preview"
                }) ]
            };
            return D.DOMLoaded ? tt(s.innerHTML[1], o ? r : "", o ? "" : "No Preview") : setTimeout(tt, 150, s.innerHTML[1], o ? r : "", o ? "" : "No Preview"), 
            i == typeof e.tooltip || i == typeof e.tooltip.innerHTML && i == typeof e.tooltip.text || (s.innerHTML[0] = w(s.innerHTML[0], e.tooltip)), 
            s;
        },
        getValue: function(e, t) {
            try {
                var n = e.parentElement.lastChild;
                return n.getAttribute("data-src");
            } catch (e) {
                return "";
            }
        },
        setValue: function(e, t, n) {
            var r = e.parentElement.lastChild;
            return tt(r, n, n && "" != n ? "" : "No Preview"), !0;
        },
        enable: function(e, t) {
            e.hasAttribute("disabled") && e.removeAttribute("disabled");
        },
        disable: function(e, t) {
            e.setAttribute("disabled", "disabled");
        }
    }), et.MakePref = function(e) {
        var t;
        if (U(e) || "element" == e.type) return t = {
            type: "div",
            className: "row form-group section-row",
            innerHTML: {
                type: "div",
                className: "col-md-12",
                innerHTML: U(e) ? e : e.innerHTML || e.options || e.default
            }
        }, _e(t);
        var n = et.PrefTypes.make(e.type, e);
        if (n) {
            var r = x(e);
            switch (e.type) {
              case "radio":
              case "checkbox":
              case "toggle":
                i == typeof e.tooltip || i == typeof e.tooltip.innerHTML && i == typeof e.tooltip.text || (t = w(r.innerHTML, e.tooltip));
            }
            return t = {
                type: "div",
                className: "row form-group section-row",
                innerHTML: [ r, {
                    type: "div",
                    className: "col-md-8",
                    innerHTML: n
                } ]
            }, _e(t);
        }
        return a;
    }, et.MakeSettingsModal = function(e) {
        var t, r, o, s = {}, l = !1, c = _e({
            type: "div",
            className: "jMod-settings tabbable tabs-left"
        }), u = _e({
            type: "ul",
            className: "nav nav-tabs"
        }), f = _e({
            type: "div",
            className: "tab-content"
        });
        for (var d in e.settings) {
            var t = e.settings[d].tab || "Other", p = e.settings[d].section || "General";
            typeof s[t] === i && (s[t] = {
                name: t,
                color: null,
                sections: {}
            }), typeof s[t].sections[p] === i && (s[t].sections[p] = []), s[t].sections[p].push(e.settings[d]);
        }
        if (e.tabs) for (var d in e.tabs) t = e.tabs[d].name, t && typeof s[t] !== i && (e.tabs[d].displayName && (s[t].displayName = e.tabs[d].displayName), 
        e.tabs[d].content && (e.tabs[d].content.header && (s[t].contentHeader = e.tabs[d].content.header), 
        e.tabs[d].content.footer && (s[t].contentFooter = e.tabs[d].content.footer)));
        var g = e.tabOrder || [], m = {}, h = 0;
        for (t in s) {
            l = e.activeTab !== a && t === e.activeTab || e.activeTab === a && 0 == h, r = $e.makeNavElement({
                innerHTML: s[t].displayName || t,
                id: "jMod-settings-tab-" + h,
                isActive: l,
                contentId: "jMod-settings-tab-" + h + "-content",
                index: h
            });
            var y = [];
            s[t].contentHeader && y.push(s[t].contentHeader);
            for (var p in s[t].sections) {
                y.push('<div class="row section-title-row"><div class="col-md-12"><h3 class="section-title">' + p + "</h3></div></div>");
                for (var b in s[t].sections[p]) y.push(et.MakePref(s[t].sections[p][b]));
            }
            s[t].contentFooter && y.push(s[t].contentFooter), o = $e.makeContentElement({
                name: t,
                id: "jMod-settings-tab-" + h + "-content",
                isActive: l,
                innerHTML: y,
                index: h
            }), m[t] = [ r, o ], g.indexOf(t) == -1 && g.push(t), h++;
        }
        if (e.tabs) for (var d in e.tabs) t = e.tabs[d].name, t && s[t] === a && (l = e.activeTab !== a && t === e.activeTab || e.activeTab === a && 0 == h, 
        r = $e.makeNavElement({
            innerHTML: t,
            id: "jMod-settings-tab-" + h,
            isActive: l,
            contentId: "jMod-settings-tab-" + h + "-content",
            index: h
        }), o = $e.makeContentElement({
            name: t,
            id: "jMod-settings-tab-" + h + "-content",
            isActive: l,
            innerHTML: e.tabs[d].innerHTML || e.tabs[d].text,
            index: h
        }), m[t] = [ r, o ], g.indexOf(t) == -1 && g.push(t), h++);
        for (var d = 0; d < g.length; d++) m[g[d]] !== a && (Ee(u, m[g[d]][0]), Ee(f, m[g[d]][1]));
        Ee(c, u), Ee(c, f);
        var E = e.title || "Settings";
        U(E) || (E = '<h2 class="title">' + E + "</h2>");
        var M = {
            title: E,
            id: et.getElementId("settingModalsElement"),
            className: te(Ze),
            body: c,
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
                            return t && et.clear(), v(e), !1;
                        }
                    }
                }
            } ],
            buttons: [ {
                text: "Save",
                className: "btn btn-success",
                EventListeners: {
                    click: function() {
                        n.log("save button click"), et.save();
                    }
                }
            } ],
            onAfterShow: function() {
                et.onResize();
            },
            style: {
                width: "1000px"
            },
            features: {
                enableTabs: !0,
                enableTooltips: !0
            }
        };
        return typeof e.onBeforeHide !== i && (M.onBeforeHide = e.onBeforeHide), typeof e.onAfterHide !== i && (M.onAfterHide = e.onAfterHide), 
        I.Modal(M);
    }, et.onResize = function() {
        var e = I.Settings.settingsModalElement, t = I.$(".modal-dialog", e), n = I.$(".modal-body", e), i = I.$(".modal-footer", e), a = I.$(".modal-header", e), s = I.Element.viewportSize.getHeight(), l = (r || o).getComputedStyle(t, null), c = parseInt(l.getPropertyValue("margin-top")), u = parseInt(l.getPropertyValue("margin-bottom")), f = parseInt(s) - parseInt(a.offsetHeight) - parseInt(i.offsetHeight) - c - u - 15;
        n.style.maxHeight = f + "px";
        var d = I.$(".nav-tabs", n);
        I.Tabs.resize(d);
    }, et.show = function() {
        I.Modal.show(et.settingsModalElement || 0), setTimeout(function() {
            et.onResize();
        }, 1);
    }, et.hide = function() {
        I.Modal.hide(et.settingsModalElement);
    }, et.save = function() {
        n.log("Saving");
        for (var e = et._data, t = {}, r = 0; r < e.settings.length; r++) {
            var o = e.settings[r];
            if (!U(e) && "element" != o.type) {
                var i = et.PrefTypes.getValue(o);
                t[o.name] = i;
            }
        }
        et._storedData = t;
    }, et.init = function() {
        et.Initialized = !0;
    }, I.CSS = ".jmod-na .modal-body{min-height:200px;max-height:500px;overflow-y:auto;}", 
    I.getDOMTiming = function() {
        var e, t = {};
        try {
            if (z.available) {
                e = z.getAllTiming();
                var n = z.get("timing.navigationStart");
                for (var r in e) t[r] = e[r] - n, (t[r] <= 0 || isNaN(t[r])) && delete t[r];
                var o = (z.get("timing.loadEventEnd") || z.get("timing.loadEventStart")) - z.get("timing.navigationStart");
                o > 0 && (t.pageLoadTime = o);
                var i = z.get("timing.responseEnd") - z.get("timing.fetchStart");
                i >= 0 && (t.NetworkLatency = i);
                var a = z.now;
                a > 0 && (t.statReportTime = a), I.InitializeEndTime > 0 && (t.jModInitializeEnd = I.InitializeEndTime), 
                I.InitializeStartTime >= 0 && (t.jModInitializeStart = I.InitializeStartTime, I.InitializeEndTime > 0 && I.InitializeEndTime - I.InitializeStartTime > 0 && (t.jModInitializeTime = I.InitializeEndTime - I.InitializeStartTime), 
                O > 0 && O - I.InitializeStartTime > 0 && (t.jModReadyTime = O - I.InitializeStartTime));
            }
        } catch (e) {
            return we(e, "jMod.getDOMTiming"), {};
        }
        return t;
    };
    var nt = I.SendMessage = function(e) {
        switch (I.jQueryAvailable || "jquery" != e.method.toLowerCase() ? typeof GM_xmlhttpRequest === i && "xmlhttprequest" == e.method.toLowerCase() && (I.jQueryAvailable ? e.method = "jQuery" : e.method = "JSONP") : typeof GM_xmlhttpRequest !== i ? e.method = "XMLHTTPRequest" : e.method = "JSONP", 
        e.url = I.SendMessage.processURL(e), (e.method || "XMLHTTPRequest").toLowerCase()) {
          case "jquery":
            return I.debug && n.log("jMod.SendMessage - jquery", e), I.SendMessage.jQuery(e);

          case "xmlhttprequest":
            return I.debug && n.log("jMod.SendMessage - xmlhttprequest", e), I.SendMessage.XMLHTTPRequest(e);

          case "jsonp":
          default:
            I.debug && n.log("jMod.SendMessage - JSONP", e), I.SendMessage.JSONP(e);
        }
    }, rt = "jModSendMessageResponseFn";
    nt.processURL = function(e) {
        var t = "string" == typeof e.callback ? e.callback : rt;
        switch ("object" != typeof e.url && e.url.indexOf("?") == -1 && (e.url += "?"), 
        e.method.toLowerCase()) {
          case "jsonp":
            e.url instanceof B ? (e.url.addArg("callback", t), e.url.addArg("jsonp", t)) : e.url += "&callback=" + t + "&jsonp=" + t;
            break;

          case "xmlhttprequest":
            e.url instanceof B ? e.url.addArg("json", "1") : e.url += "&json=1";
            break;

          case "jquery":
            e.responseType && "json" == e.responseType && (e.url instanceof B ? e.url.addArg("json", "1") : e.url += "&json=1");
        }
        return e.url;
    }, nt.jQuery = function(e) {
        var t = ("string" == typeof e.callback ? e.callback : rt, nt.addCallbacks(e));
        try {
            $.getJSON(e.url.toString(), {
                async: !0,
                format: "json"
            }).done(function(e, n, r) {
                nt.execCallback(t, null, e, n, r);
            }).fail(function(e, n, r) {
                nt.execErrorCallback(t, null, e, n, r);
            });
        } catch (e) {
            return !1;
        }
        return !0;
    }, nt.XMLHTTPRequest = function(e) {
        try {
            if (typeof GM_xmlhttpRequest !== i) {
                var t = nt.addCallbacks(e);
                return GM_xmlhttpRequest({
                    method: "GET",
                    url: e.url.toString(),
                    headers: {
                        Accept: "application/javascript"
                    },
                    onload: function(e, t) {
                        return function(n) {
                            if ("json" != t.toLowerCase()) return nt.execCallback(e, null, n.responseText, n);
                            var r;
                            try {
                                r = JSON.parse(n.responseText);
                            } catch (e) {} finally {
                                return nt.execCallback(e, null, r, n);
                            }
                        };
                    }(t, e.responseType || "json"),
                    onerror: function(e) {
                        return function(t) {
                            return n.log("Error! XMLHttpRequest", t), nt.execErrorCallback(e, null, t.responseText, t);
                        };
                    }(t)
                }), !0;
            }
        } catch (e) {
            n.log("Error! getXMLHttpRequest", e);
        } finally {
            return !1;
        }
    }, nt.JSONP = function(e) {
        var t = nt.addCallbacks(e), n = _e({
            type: "script",
            async: !0,
            defer: !0,
            attributes: {
                "data-callback-index": t
            }
        });
        try {
            var r = document.head || document.getElementsByTagName("head")[0];
            r.appendChild(n), n.src = e.url.toString();
        } catch (e) {
            return nt.execErrorCallback(t, null, e);
        }
        return !0;
    }, nt._callbacks = [], nt.addCallbacks = function(e) {
        return nt._callbacks.push({
            complete: e.callback,
            error: e.onerror
        }) - 1;
    }, nt.execCallback = function(e, t) {
        try {
            var r = nt._callbacks[e].complete;
            if (typeof r === i) return !1;
            if ("function" == typeof r) return r.apply(t || null, L.call(arguments, 2));
            if ("string" == typeof r && "function" == typeof o[r]) return o[r].apply(t || null, L.call(arguments, 2));
        } catch (e) {
            return n.log("Error SendMessage.execCallback!", e), !1;
        }
    }, nt.execErrorCallback = function(e, t) {
        try {
            var r = nt._callbacks[e].onerror;
            if (typeof r === i) return !1;
            if ("function" == typeof r) return r.apply(t || null, L.call(arguments, 2));
            if ("string" == typeof r && "function" == typeof o[r]) return o[r].apply(t || null, L.call(arguments, 2));
        } catch (e) {
            return n.log("Error SendMessage.execErrorCallback!", e), !1;
        }
    }, nt._globalResponseCallback = b(N, o, {
        defineAs: rt,
        allowCallbacks: !0,
        allowCrossOriginArguments: !0
    }), I.Update = new function() {
        var e = function() {
            var e = [ !0 ].concat(L.call(arguments), {
                script_info: te("script.script_info"),
                script_file_info: te("script.script_file_info") || a
            });
            return I.extend.apply(I, e);
        };
        this.getURL = function(t) {
            opts = e({}, I.Config.Update, t);
            var n = new B(te("host") || "http://myuserjs.org"), r = (opts.username || te("script.username")).trim();
            if (typeof r === i || "" == r) throw "No Username Provided";
            var o = (opts.script_name || te("script.script_name")).trim();
            if (typeof o === i || "" == o) throw "No Script Name Provided";
            var a = opts.getType || te("Update.getType");
            "meta" != a && "metajs" != a && "data" != a && "none" != a && (a = "data");
            var s = opts.args;
            if (opts.DOMTiming) {
                var l = I.getDOMTiming();
                for (var c in l) l.hasOwnProperty(c) && (s[c] = l[c]);
            }
            var u = [];
            for (var c in s) u.push(c + "=" + s[c]);
            n.addArg("args", escape(u.join(","))), n.addArg("api_version", I.version), n.addArg("updateVeriableName", opts.updateVeriableName), 
            typeof opts.noDownload !== i && 1 == opts.noDownload ? n.addArg("nodownload", "1") : te("Update.sampleRate") < 100 && Math.floor(100 * Math.random() + 1) > te("Update.sampleRate") && n.addArg("nodownload", "1"), 
            te("Update.getStats") && n.addArg("getstats", "1"), typeof opts.script_info !== i && (typeof opts.script_info.version !== i && n.addArg("scriptversion", escape(opts.script_info.version)), 
            typeof opts.script_info.script_handler !== i && (n.addArg("scripthandler", escape(opts.script_info.script_handler)), 
            typeof opts.script_info.script_handler_version !== i && n.addArg("scripthandlerversion", escape(opts.script_info.script_handler_version)))), 
            n.addArg("cachebuster", Math.round(new Date().getTime() / 1e3));
            te("host") || "myuserjs.org";
            return n.setPath("/script/" + r + "/" + o + "." + a + ".js"), n;
        }, this.sendRequest = function(t) {
            try {
                var r = e({}, I.Config.Update, t);
                typeof o[r.updateVeriableName] !== i && (o[r.updateVeriableName] = a, delete o[r.updateVeriableName]);
                var s = I.Update.getURL(r);
                te("debug") && I.Log("URL: ", s.toString());
                var l = "JSONP";
                return r.jQuery ? l = "jQuery" : r.XMLHttpRequest && (l = "XMLHTTPRequest"), I.SendMessage({
                    url: s.toString(),
                    method: l,
                    responseType: "json",
                    callback: function(e, t) {
                        return function(n) {
                            return o[t] = n, e.apply(this, arguments);
                        };
                    }(r.callback, r.updateVeriableName),
                    onerror: r.onerror
                });
            } catch (e) {
                return n.log("Error! getUpdateData: ", e.name, e.fileName, e.lineNumber + ":" + e.columnNumber), 
                n.error(e), r.callback && r.onerror(e), a;
            }
        }, this.getUpdateData = function(e) {
            return this.sendRequest(e);
        };
    }(), Object.defineProperty(I.Update, "MetaData", {
        get: function(e) {
            return typeof o[e || te("Update.updateVeriableName")] !== i ? o[e || te("Update.updateVeriableName")] : typeof r[e || te("Update.updateVeriableName")] !== i ? r[e || te("Update.updateVeriableName")] : a;
        }
    }), +function() {
        function e() {
            var e, t = {}, n = i != typeof arguments[0] ? arguments[0] : a, r = arguments.length;
            if (r > 0 && ("string" == typeof n ? (t.message = n, r > 1 && (t.fileName = arguments[1]), 
            r > 2 && (t.lineNumber = arguments[2]), r > 3 && (t.columnNumber = arguments[3]), 
            r > 4 && arguments[4] instanceof Error && (t.e = arguments[4])) : n instanceof Error ? t.e = n : t = n, 
            t.e)) try {
                e = t.e, this.stack = e.stack;
            } catch (e) {}
            e || (e = new Error(), e.stack && ("undefined" != typeof Components ? this.stack = e.stack.substring(e.stack.indexOf("\n") + 1) : "undefined" != typeof chrome || "undefined" != typeof process ? this.stack = e.stack.replace(/\n[^\n]*/, "") : this.stack = e.stack)), 
            this.message = i !== typeof t.message ? t.message : e.message, this.fileName = i !== typeof t.fileName ? t.fileName : e.fileName, 
            this.lineNumber = i !== typeof t.lineNumber ? t.lineNumber : e.lineNumber, this.columnNumber = i !== typeof t.columnNumber ? t.columnNumber : e.columnNumber, 
            this.toString = function() {
                return this.name + ": " + this.message;
            };
        }
        e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, I.UserError = e;
    }(), I.ERROR = new function() {
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
        }, Object.defineProperties(this.ERROR_CODES, V), Object.defineProperty(this.ERROR_CODES, "get", {
            value: function(e, t) {
                return "undefined" == typeof t ? I.ERROR.ERROR_CODES.SearchForKey(e) : I.ERROR.ERROR_CODES.setKeyValue(e, t);
            },
            enumerable: !1
        }), this.getCode = function(e) {
            var t = this.ERROR_CODES.get(e);
            return "undefined" != typeof t ? Number(t.toString(2)) : a;
        };
        this.send = function(e) {
            try {
                var t = I.extend(!0, {}, I.Config.Update, e);
                return "undefined" == typeof t.args && (t.args = {}), "undefined" == typeof t.args.scriptError && (t.args.scriptError = "1"), 
                "undefined" == typeof t.args.scriptErrorCode && (t.args.scriptErrorCode = "-1"), 
                t.getType = "none", t.noDownload = !0, I.UPDATE.sendRequest(t);
            } catch (e) {
                return n.log("Error! Error.send: ", e), a;
            }
        }, this.catchError = function(e, t, r, o, i, a) {
            try {
                if (n.log("stackInfo", a), "undefined" != typeof i && "undefined" != typeof i.stack) {
                    var s = L.call(arguments, 0);
                    if (te("Error.autoReportErrors")) {
                        var l = te("Error.errorFilter").apply(this, s);
                        if (l) {
                            var c = {
                                getType: "none",
                                args: {}
                            };
                            switch (c.args.scriptErrorLineNumber = r, c.args.scriptErrorColNumber = o, typeof l) {
                              case "object":
                                c.args = merge(c.args, l);
                                break;

                              case "number":
                              case "string":
                                c.args.scriptError = l;
                                break;

                              case "boolean":
                                c.args.scriptError = "1";
                            }
                        }
                    }
                }
            } catch (e) {}
            return !1;
        }, this.processError = function(e) {
            var t = "";
            try {
                t = e.stack.toString();
            } catch (e) {}
            var n = {
                message: e.message,
                name: e.name,
                fileName: e.fileName,
                lineNumber: e.lineNumber,
                columnNumber: e.columnNumber,
                stack: t
            };
            return I.ERROR.catchError(e.message, e.fileName, e.lineNumber, e.columnNumber, n, I.parseStack(t));
        };
    }(), b(k, o, {
        defineAs: "jModListenError",
        allowCallbacks: !0,
        allowCrossOriginArguments: !0
    });
    var ot = function() {
        function e(e, t, n, r, o) {
            var i = "undefined" != typeof document ? document.defaultView : null != this.top ? this : null, a = null != this.console ? this.console : i.console;
            a.log("tErrHandle", e, t, n, o);
            try {
                var s = {}, l = "";
                if (o) {
                    try {
                        l = String(o.stack);
                    } catch (e) {
                        a.log("Error eObj.stack.toString", e);
                    }
                    s = {
                        message: o.message,
                        name: o.name,
                        fileName: o.fileName,
                        lineNumber: o.lineNumber,
                        columnNumber: o.columnNumber,
                        stack: l,
                        url: t
                    };
                } else s = {
                    message: e,
                    name: null,
                    fileName: null,
                    lineNumber: n,
                    columnNumber: r,
                    stack: l,
                    url: t
                };
                var c;
                c = "undefined" != typeof jModListenError ? jModListenError : i.jModListenError ? i.jModListenError : document.defaultView.jModListenError, 
                c(e, t, n, r, s);
            } catch (e) {
                a.log("error calling jModListenError", e, i);
            }
            for (var u = i._jModErrorHandlerStack.length - 1; u >= 0; u--) try {
                if (!0 === i._jModErrorHandlerStack[u].apply(this, arguments)) return !0;
            } catch (e) {
                a.log("Error processing error handler", i._jModErrorHandlerStack[u]);
            }
            try {
                if (i._origErrorHandler) return i._origErrorHandler.apply(this, arguments);
            } catch (e) {}
            return !1;
        }
        var t = "undefined" != typeof this.document ? this.document.defaultView : "undefined" != typeof document ? document.defaultView : null != this.top ? this : null;
        null != t.console ? t.console : this.console;
        if (!t._jModErrorHandlerStack) {
            t._origErrorHandler = t.onerror, t._jModErrorHandlerStack = [], t.onerror = e;
            try {
                t.__defineSetter__("onerror", function(e) {
                    t._jModErrorHandlerStack.push(e);
                });
            } catch (e) {}
        }
    };
    return i == typeof I.Config.script.script_info && i != typeof GM_info && oe.set(), 
    +function() {
        function e(e) {
            return D.headAvailable || I.Element.head && p.headAvailable(), D.DOMLoaded || [ "interactive", "complete" ].indexOf(d.readyState.toLowerCase()) != -1 && p.DOMLoaded(), 
            D.DOMLoaded && (D.documentComplete || "complete" != d.readyState || p.documentComplete(), 
            D.performanceReady || (u = z.pageLoadTime(), (!isNaN(u) && u > 0 || !z.available) && p.performanceReady()), 
            D.performanceReady && D.documentComplete) ? (D.Complete = !0, clearInterval(t), 
            void (I.debug && ke("jMod Finish Init" + (i != typeof r.mozPaintCount ? " (Mozilla Paint Count: " + r.mozPaintCount + ")" : "")))) : f++ > c ? (D.Complete = !0, 
            clearInterval(t), D.DOMLoaded || p.DOMLoaded(), D.documentComplete || p.documentComplete(), 
            D.performanceReady || p.performanceReady(), void (I.debug && ke("jMod Finish Init (timeout)" + (i != typeof r.mozPaintCount ? " (Mozilla Paint Count: " + r.mozPaintCount + ")" : "")))) : void (I.debug && I.log.count("Try Init"));
        }
        function t() {
            D.Complete ? clearInterval(t) : e("checkTimer");
        }
        function o(t) {
            D.Complete || e("DOMContentLoaded"), d.removeEventListener("DOMContentLoaded", o, !1), 
            I.Events.fire.apply(I.Events, [ "DOMContentLoaded", {
                _this: this,
                args: arguments
            } ]), I.debug && I.Debug("DOMContentLoaded", t);
        }
        function a(e) {
            r.removeEventListener("load", a, !1), I.Events.fire.apply(I.Events, [ "load", {
                _this: this,
                args: arguments
            } ]), I.debug && I.Debug("onLoadEvent", e);
        }
        function s(e) {
            I.Events.fire.apply(I.Events, [ "beforescriptexecute", {
                _this: this,
                args: arguments
            } ]);
        }
        function l(e) {
            I.Events.fire.apply(I.Events, [ "afterscriptexecute", {
                _this: this,
                args: arguments
            } ]);
        }
        const c = 200;
        var u, f = 0, d = I.Element.document, p = {
            addCSS: function() {
                D.CSSAdded || (D.CSSAdded = !0, I.AddCSS());
            },
            headAvailable: function() {
                D.headAvailable = !0, p.addCSS(), I.debug && I.API.contentEval(ot);
            },
            DOMLoaded: function() {
                D.DOMLoaded = !0, I.debug && ke("DOM Loaded", null, " - Begin Init"), D.headAvailable || p.headAvailable(), 
                I.Events.fire("onDOMReady"), I.Notification.init(), I.Modal.init(), I.Settings.init(), 
                D.jModReady = !0, I.debug && ke("jModReady" + (i != typeof r.mozPaintCount ? " (Mozilla Paint Count: " + r.mozPaintCount + ")" : "")), 
                I.Events.fire("onReady"), z.available && (O = z.now);
            },
            documentComplete: function() {
                D.documentComplete = !0, I.debug && (ke("onPageReady" + (i != typeof r.mozPaintCount ? " (Mozilla Paint Count: " + r.mozPaintCount + ")" : "")), 
                n.groupEnd("jMod Start")), I.Events.fire("onPageReady");
            },
            performanceReady: function() {
                D.performanceReady = !0, I.debug && ke("onPerformanceReady"), I.Events.fire("onPerformanceReady");
            }
        };
        d.addEventListener("DOMContentLoaded", o, !1), d.onreadystatechange = function(t) {
            D.Complete || e("onreadystatechange"), I.Events.fire.apply(I.Events, [ "onreadystatechange", {
                _this: this,
                args: arguments
            } ]), I.debug && I.Debug("onreadystatechange %c%s%c %o", I.log.fmt.stchange, d.readyState, " ", t);
        }, r.addEventListener("load", a, !1), r.addEventListener("beforescriptexecute", s, !1), 
        r.addEventListener("afterscriptexecute", l, !1), e(), setInterval(t, 25);
    }(), z.available && setTimeout(function() {
        I.InitializeEndTime = z.now;
    }, 0), I.debug && (ke("jMod Initialize Time Elapsed"), n.log("unsafeWindow", o), 
    n.log("window", r), n.log("global", Object.prototype.toString.call(this).replace(/^\[object |\]$/g, "").toLowerCase(), this)), 
    I;
});
