// ==UserScript==
// @name             jMod
// @namespace        http://myuserjs.org/
// @author           jgjake2
// @homepage         http://myuserjs.org/
// @include          *
// @version          0.0.18
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
+function(t, e) {
    t.jMod = this.jMod = e, e.debug && e.log.groupEnd("jMod Initialize"), window.focus();
}.call(this, "undefined" != typeof unsafeWindow ? unsafeWindow : "undefined" != typeof window ? window : this, function(It, $, c, p, s, n, o) {
    function ft(a, i, s) {
        var r = "function" == typeof s ? !0 : !1, e = i;
        "object" != typeof i && (e = f.call(arguments, 1), r = !1);
        for (var t = 0; t < e.length; t++) if (typeof a[e[t]] !== n && (!r || r && s(e[t], a[e[t]]))) return e[t];
        return o;
    }
    function G(t, r, a) {
        var e = ft.apply(this, arguments);
        return typeof e !== n ? t[e] : o;
    }
    function Y(a) {
        var e = 0, t = this, r = a.split(".");
        for (e; e < r.length; e++) {
            if (typeof t[r[e]] === n) return o;
            t = t[r[e]];
        }
        return t;
    }
    function vt(a) {
        var r, t = 0, e = this, n = a.split(".");
        if (0 == n.length) return o;
        for (t; t < n.length; t++) {
            if (-1 == (r = Object.keys(e).join("|").toLowerCase().split("|").indexOf(n[t].toLowerCase()))) return o;
            e = e[Object.keys(e)[r]];
        }
        return e;
    }
    function Ot(i, s) {
        var a, r, n = 0, e = i.split("."), t = this;
        if (0 == e.length) return o;
        for (n; n < e.length; n++) {
            if (-1 == (r = Object.keys(t).join("|").toLowerCase().split("|").indexOf(e[n].toLowerCase()))) return o;
            a = t, e[n] = Object.keys(t)[r], t = t[Object.keys(t)[r]];
        }
        return a[e[e.length - 1]] = s, e;
    }
    function Rt(t) {
        var n, e = 0, r = "string" == typeof t ? f.call(arguments) : t;
        for (e; e < r.length; e++) if ((n = Y.apply(this, [ r[e] ])) !== o) return n;
        return o;
    }
    function Ct(a, o, i) {
        var e = 0, t = a.split("."), r = this;
        for (e; e < t.length - 1; e++) {
            if (typeof r[t[e]] === n) {
                if (!i) return;
                r[t[e]] = {};
            }
            r = r[t[e]];
        }
        r[t[t.length - 1]] = o;
    }
    function O(t, i, s) {
        if (typeof cloneInto !== n) {
            try {
                return cloneInto(t, i, s);
            } catch (c) {}
            var e, l, r = {};
            for (e in t) if (Object.prototype.hasOwnProperty.call(t, e)) if (l = typeof t[e], 
            [ "string", "number", "boolean" ].indexOf(l)) try {
                r[e] = cloneInto(t[e], i, s);
            } catch (c) {} else if ("object" == l) if ("number" != typeof t[e].length) {
                r[e] = {};
                for (var a in t[e]) try {
                    Object.prototype.hasOwnProperty.call(t[e], a) && (r[e][a] = cloneInto(t[e][a], i, s));
                } catch (c) {}
            } else {
                r[e] = [];
                for (var a = 0; a < t[e].length; a++) try {
                    r[e].push(cloneInto(t[e][a], i, s));
                } catch (c) {
                    r[e].push(o);
                }
            }
            try {
                return cloneInto(r, i, s);
            } catch (c) {
                return t;
            }
        }
        return t;
    }
    function ht(e, a, t) {
        if (typeof exportFunction !== n) try {
            return exportFunction(e, a, t);
        } catch (o) {}
        var r = "";
        if (typeof t === n && (t = {}), typeof t.defineAs !== n ? r = t.defineAs : "function" == typeof e && "" != e.name && (r = e.name), 
        "" != r) try {
            return a[r] = e, a[r];
        } catch (o) {}
    }
    function P(e) {
        if (!e) {
            if (!p.event) return;
            e = p.event;
        }
        null != e.cancelBubble && (e.cancelBubble = !0), e.stopPropagation && e.stopPropagation(), 
        e.preventDefault && e.preventDefault(), p.event && (e.returnValue = !1), null != e.cancel && (e.cancel = !0);
    }
    function ut(e, r, a) {
        if (t.jQueryAvailable) $(e).click(); else if (document.createEvent) {
            var n = document.createEvent("MouseEvents");
            n.initEvent("click", r || !0, a || !0), e.dispatchEvent(n);
        } else document.createEventObject ? e.fireEvent("onclick") : "function" == typeof e.onclick && e.onclick();
    }
    function Nt(l) {
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
    function yt(e, n, t) {
        var r = (p || s).getComputedStyle(e, null);
        (t = t || 0) < 50 && isNaN(parseInt(r.width)) ? setTimeout(function(e, t, n) {
            yt(e, t, n + 1);
        }, 100, e, n, t) : n(e, r);
    }
    function _t(n, a) {
        var r = n.parentElement.querySelector(".tab-content");
        if (null !== r.offsetParent) {
            var e = parseInt(a.width);
            isNaN(e) && (t.debug ? nt("Tabs.resize", "Tab width is NaN!", n, r, a) : e > 300 && (t.debug ? nt("Tabs.resize", "Tab width too wide!", e, n) : e > 50 && (r.style.marginLeft = e + 11 + "px")));
        }
    }
    function gt(t) {
        var e = t.name, r = e.split(" ");
        -1 == r.indexOf("fa") && -1 == r.indexOf("glyphicon") && (-1 != e.indexOf("fa-") ? e = "fa " + e : -1 != e.indexOf("glyphicon-") && (e = "glyphicon " + e));
        var n = {
            type: "i",
            className: e,
            attributes: {}
        };
        return t.tooltip && (n = k(n, t.tooltip)), n;
    }
    function k(t, e) {
        if (M(t)) {
            if (C(t, a(R)), t.setAttribute(a(H), e.innerHTML || e.text || null), t.setAttribute(a(at), e.placement || "top"), 
            n != typeof e.margin) {
                var r = a("Tooltip.attributeNames.margin");
                n != typeof e.margin.left && t.setAttribute(r + "-left", e.margin.left), n != typeof e.margin.right && t.setAttribute(r + "-right", e.margin.right), 
                n != typeof e.margin.top && t.setAttribute(r + "-top", e.margin.top), n != typeof e.margin.bottom && t.setAttribute(r + "-bottom", e.margin.bottom);
            }
        } else if (t.className = (t.className || "") + " " + a(R), typeof t.attributes === n && (t.attributes = {}), 
        t.attributes[a(H)] = e.innerHTML || e.text || null, t.attributes[a(at)] = e.placement || "top", 
        n != typeof e.margin) {
            var r = a("Tooltip.attributeNames.margin");
            n != typeof e.margin.left && (t.attributes[r + "-left"] = e.margin.left), n != typeof e.margin.right && (t.attributes[r + "-right"] = e.margin.right), 
            n != typeof e.margin.top && (t.attributes[r + "-top"] = e.margin.top), n != typeof e.margin.bottom && (t.attributes[r + "-bottom"] = e.margin.bottom);
        }
        return t;
    }
    function Ft(t) {
        var e = t.description || t.name;
        M(e) || "object" == typeof e || (e = {
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
    function Tt(e) {
        y.execCallback(document.currentScript.getAttribute("data-callback-index"), document.currentScript, e, document.currentScript);
    }
    function dt(e, n, r, a, i) {
        c.log("jModListenError", e, n, r, a);
        var s = t.parseStack(i.stack);
        return s.length > 0 ? t.ERROR.catchError(e, n, r, a, i, s) : o;
    }
    var t = function() {
        return t._call.apply(t, arguments);
    };
    t.InitializeStartTime = It, t.InitializeEndTime = -1;
    var d = t.API = {}, f = Array.prototype.slice, V = n != typeof $ ? !0 : !1, ot = -1, rt = "@import url(//myuserjs.org/css/smartadmin-production-all-namespaced.css);\n@import url(//fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700);\n@font-face {font-family: 'Sansation';font-style: normal;font-weight: 400;src: local('Sansation Regular'), local('Sansation-Regular'), url(http://myuserjs.org/fonts/Sansation-Regular.ttf) format('ttf');}\n@font-face {font-family: 'Sansation';font-style: normal;font-weight: 300;src: local('Sansation Light'), local('Sansation-Light'), url(http://myuserjs.org/fonts/Sansation-Light.ttf) format('ttf');}\n@font-face {font-family: 'Sansation';font-style: italic;font-weight: 300;src: local('Sansation Light Italic'), local('Sansation-LightItalic'), url(http://myuserjs.org/fonts/Sansation-LightItalic.ttf) format('ttf');}\n@font-face {font-family: 'Sansation';font-style: normal;font-weight: 700;src: local('Sansation Bold'), local('Sansation-Bold'), url(http://myuserjs.org/fonts/Sansation-Bold.ttf) format('ttf');}\n@font-face {font-family: 'Sansation';font-style: italic;font-weight: 400;src: local('Sansation Italic'), local('Sansation-Italic'), url(http://myuserjs.org/fonts/Sansation-Italic.ttf) format('ttf');}\n@font-face {font-family: 'Sansation';font-style: italic;font-weight: 700;src: local('Sansation Bold Italic'), local('Sansation-BoldItalic'), url(http://myuserjs.org/fonts/Sansation-BoldItalic.ttf) format('ttf');}\n", E = {
        id: "jMod",
        config: {},
        el: s.document && s.document.currentScript ? s.document.currentScript : o
    }, D = function(a, n, o, r) {
        var e = {
            configurable: !1,
            enumerable: !1 === r ? r : !0
        };
        "function" == typeof n ? e.get = n : (e.value = n, e.writable = !1), Object.defineProperty(o || t, a, e);
    };
    D("ScriptElement", function() {
        return E.el ? E : o;
    }), D("version", "0.0.18"), D("build_time", "1422032400000"), D("build_type", "release"), 
    D("_debug", !1), Object.defineProperty(t, "debug", {
        get: function() {
            try {
                return n !== typeof t.Config.debug ? t.Config.debug : t._debug;
            } catch (e) {
                return t._debug;
            }
        },
        set: function(e) {
            t.Config.debug = !0 === e ? !0 : !1;
        },
        enumerable: !1
    }), Object.defineProperty(t, "jQueryAvailable", {
        get: function() {
            return V ? V : n != typeof $ ? V = !0 : n != typeof jQuery ? ($ = jQuery, V = !0) : n != typeof s.jQuery ? ($ = s.jQuery, 
            V = !0) : !1;
        },
        set: function(e) {
            V = e ? !0 : !1;
            try {
                "jQuery" == A(e) && ($ = e);
            } catch (t) {}
        },
        enumerable: !1
    }), D("jQuery", function() {
        return t.jQueryAvailable ? $ : o;
    });
    var T = new function() {
        var e, r = function() {
            return e === o && (e = typeof s.performance !== n && typeof s.performance.timing !== n ? s.performance : o), 
            e;
        };
        this.__defineGetter__("performanceObject", function() {
            return r();
        }), this.__defineGetter__("available", function() {
            return this.performanceObject === o ? !1 : !0;
        }), this.__defineGetter__("now", function() {
            try {
                return this.performanceObject.now();
            } catch (e) {
                t.Warning("Performance not available!");
            }
        }), this.get = function(a) {
            var e = 0, r = a.split("."), t = this.performanceObject;
            if (t !== o) {
                for (e; e < r.length; e++) {
                    if (typeof t[r[e]] === n) return;
                    t = t[r[e]];
                }
                return t;
            }
        }, this.getAllTiming = function(t) {
            t === o && (t = []);
            var r = [], n = this.performanceObject;
            for (var e in n.timing) isNaN(n.timing[e]) || -1 != t.indexOf(e) || (r[e] = n.timing[e]);
            return r;
        }, this.pageLoadTime = function() {
            try {
                var e = this.performanceObject.timing;
                if (isNaN(e.loadEventEnd)) return;
                return e.loadEventEnd - e.navigationStart;
            } catch (t) {}
        };
    }();
    Object.defineProperty(t, "timeElapsed", {
        get: function() {
            return T.now - t.InitializeStartTime;
        }
    });
    var h = t.Loading = {
        DOMLoaded: !1,
        CSSAdded: !1,
        performanceReady: !1,
        documentComplete: !1,
        jModReady: !1,
        Complete: !1
    };
    Object.defineProperty(t, "CSS", {
        get: function() {
            return rt;
        },
        set: function(e) {
            rt += e, h.CSSAdded && t.AddCSS();
        },
        enumerable: !1
    }), t.AddCSS = function(e) {
        jt(rt + (e || "")), rt = "";
    };
    var mt = {
        SearchForKey: {
            value: Y,
            enumerable: !1
        },
        SearchForKeys: {
            value: Rt,
            enumerable: !1
        },
        setKeyValue: {
            value: Ct,
            enumerable: !1
        },
        SearchForKeyI: {
            value: vt,
            enumerable: !1
        },
        setKeyValueI: {
            value: Ot,
            enumerable: !1
        }
    };
    t.parseStack = function(n) {
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
    var M = function(e) {
        try {
            return e instanceof HTMLElement;
        } catch (t) {
            return "object" == typeof e && 1 === e.nodeType && "object" == typeof e.style && "object" == typeof e.ownerDocument;
        }
    };
    t.Versions = {
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
    var et = t.URLBuilder = function(e) {
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
            for (var e = 0; e < t.length; e++) switch (A(t[e])) {
              case "array":
                this.addArg(t[e][0], t[e][1]);
                break;

              case "map":
              case "object":
                var n = G(t[e], [ "name", "key" ]), r = G(t[e], [ "value" ]);
                n && r && this.addArg(n, r);
            }
            return this;
        }, this.buildArgs = function() {
            for (var n = "", t = [], e = 0; e < this.args.length; e++) t.push(this.args[e].name + "=" + this.args[e].value);
            return t.join("&");
        }, this.toString = function() {
            return this.protocol + "//" + this.hostname + this.pathname + "?" + this.buildArgs();
        }, this.setHostname(e);
    }, A = t.RealTypeOf = function(t) {
        var e;
        try {
            (t.constructor === {}.constructor || t) && (e = t);
        } catch (r) {
            e = O(t, s, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
        }
        try {
            if (typeof e === n) return n;
            if ("number" == typeof e && 1 == isNaN(e)) return "nan";
            if ("object" == typeof e) return null === e ? "null" : e.constructor === {}.constructor ? "map" : e.constructor === [].constructor ? "array" : e.constructor === new Date().constructor ? isNaN(e.getTime()) ? "invaliddate" : "date" : e.constructor === RegExp().constructor ? "regex" : Object.prototype.toString.call(e).replace(/^\[object |\]$/g, "").toLowerCase();
        } catch (r) {}
        return typeof e;
    }, X = function(e) {
        try {
            if ("object" != typeof e || e.nodeType || e === e.window) return !1;
            if (e.constructor && !e.hasOwnProperty.call(e.constructor.prototype, "isPrototypeOf")) return !1;
        } catch (n) {
            var t = O(e, s, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
            if ("object" != typeof t || t.nodeType || t === t.window) return !1;
            if (t.constructor && !t.hasOwnProperty.call(t.constructor.prototype, "isPrototypeOf")) return !1;
        }
        return !0;
    }, z = function(e) {
        try {
            if (e.constructor === [].constructor) return !0;
        } catch (n) {
            var t = O(e, s, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
            if (t.constructor === [].constructor) return !0;
        }
        return !1;
    }, Qt = function(e) {
        return "function" == typeof e;
    };
    t.extend = function() {
        var a, r, i, n, l, c, e = arguments[0] || {}, s = 1, f = arguments.length, u = !1;
        for ("boolean" == typeof e && (u = e, e = arguments[s] || {}, s++), "object" != typeof e && "function" != typeof e && (e = {}), 
        s === f && (e = this, s--); f > s; s++) if (null != (a = arguments[s])) for (r in a) {
            i = e[r];
            try {
                (a[r].constructor === {}.constructor || a[r] || e) && (n = a[r]);
            } catch (p) {
                n = O(a[r], e, {
                    cloneFunctions: !0,
                    wrapReflectors: !0
                });
            }
            if (e !== a[r] && e !== n) if (u && n && (X(n) || (l = z(n)))) l ? (l = !1, c = i && z(i) ? i : []) : c = i && X(i) ? i : {}, 
            e[r] = t.extend(u, c, n); else if (n !== o) try {
                e[r] = n;
            } catch (p) {
                e[r] = O(n, e, {
                    cloneFunctions: !0,
                    wrapReflectors: !0
                });
            }
        }
        return e;
    }, t.extendp = function() {
        var i, n, r, t, c, s, p, e = arguments[0] || {}, a = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof e && (l = e, e = arguments[a] || {}, a++), "object" != typeof e && "function" != typeof e && (e = {}), 
        a === u && (e = this, a--); u > a; a++) if (null != (i = arguments[a])) for (n in i) {
            r = e[n];
            try {
                (i[n].constructor === {}.constructor || i[n] || e) && (t = i[n]);
            } catch (f) {
                t = O(i[n], e, {
                    cloneFunctions: !0,
                    wrapReflectors: !0
                });
            }
            if (e !== t) if (l && t && (X(t) || (c = z(t)))) {
                if (c) {
                    if (z(r) && Array.prototype.push.apply(e[n], t)) continue;
                    s = r && z(r) ? r : [];
                } else s = r && X(r) ? r : {};
                e[n] = jQuery.extendp(l, s, t);
            } else if (t !== o) try {
                e[n] = t;
            } catch (f) {
                e[n] = O(t, e, {
                    cloneFunctions: !0,
                    wrapReflectors: !0
                });
            }
        }
        return e;
    }, t.CloneProperties = function() {
        var r, l, p, u, a, e, i, d = arguments.length, s = arguments[0], f = !1, c = 1;
        if ("boolean" == typeof s && d > 2 && (f = s, s = arguments[c++]), s === o || null === s) return s;
        for (i = Object(s), c; d > c; c++) if (r = arguments[c], r !== o && null !== r) for (p = f ? Object.getOwnPropertyNames(Object(r)) : Object.keys(Object(r)), 
        u = 0; u < p.length; u++) a = p[u], e = Object.getOwnPropertyDescriptor(r, a), e !== o && ("function" == typeof r[a] ? i[a] = r[a].bind(i) : "object" == typeof r[a] && X(r[a]) ? Object.defineProperty(i, a, {
            enumerable: e.enumerable,
            configurable: e.configurable,
            writable: e.writable,
            value: f ? t.CloneProperties(f, i[a] || {}, r[a]) : r[a]
        }) : (l = {
            enumerable: e.enumerable,
            configurable: e.configurable
        }, n != typeof e.get && (l.get = e.get.bind(i)), n != typeof e.set && (l.set = e.set.bind(i)), 
        n != typeof e.value && (l.writable = e.writable, l.value = "function" == typeof e.value ? e.value.bind(i) : e.value), 
        Object.defineProperty(i, a, l)));
        return i;
    }, function() {
        var i = "", u = "?", l = "function", f = "undefined", o = "object", e = "major", s = "model", n = "name", c = "type", a = "vendor", r = "version", p = "architecture", d = "console", g = "mobile", m = "tablet", y = "smarttv", b = "wearable", h = "embedded";
        t.Browser = {
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
                browser: [ [ /(opera\smini)\/((\d+)?[\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i, /(opera).+version\/((\d+)?[\w\.]+)/i, /(opera)[\/\s]+((\d+)?[\w\.]+)/i ], [ n, r, e ], [ /\s(opr)\/((\d+)?[\w\.]+)/i ], [ [ n, "Opera" ], r, e ], [ /(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i ], [ [ n, "IE" ], r, e ], [ /(yabrowser)\/((\d+)?[\w\.]+)/i ], [ [ n, "Yandex" ], r, e ], [ /(comodo_dragon)\/((\d+)?[\w\.]+)/i ], [ [ n, /_/g, " " ], r, e ], [ /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i, /(uc\s?browser|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i ], [ n, r, e ], [ /((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i ], [ [ n, "Chrome" ], r, e ], [ /version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i ], [ r, e, [ n, "Mobile Safari" ] ], [ /version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i ], [ r, e, n ], [ /(konqueror)\/((\d+)?[\w\.]+)/i, /(webkit|khtml)\/((\d+)?[\w\.]+)/i ], [ n, r, e ], [ /(navigator|netscape)\/((\d+)?[\w\.-]+)/i ], [ [ n, "Netscape" ], r, e ], [ /(swiftfox)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i, /(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i ], [ n, r, e ] ]
            }
        };
    }(), s.viewportSize = {}, s.viewportSize.getHeight = function() {
        return Mt("Height");
    }, s.viewportSize.getWidth = function() {
        return Mt("Width");
    };
    var Mt = function(e) {
        var a, l = e.toLowerCase(), i = s.document, t = i.documentElement;
        if (s["inner" + e] === o) a = t["client" + e]; else if (s["inner" + e] != t["client" + e]) {
            var n = i.createElement("body");
            n.id = "vpw-test-b", n.style.cssText = "overflow:scroll";
            var r = i.createElement("div");
            r.id = "vpw-test-d", r.style.cssText = "position:absolute;top:-1000px", r.innerHTML = "<style>@media(" + l + ":" + t["client" + e] + "px){body#vpw-test-b div#vpw-test-d{" + l + ":7px!important}}</style>", 
            n.appendChild(r), t.insertBefore(n, i.head), a = 7 == r["offset" + e] ? t["client" + e] : s["inner" + e], 
            t.removeChild(n);
        } else a = s["inner" + e];
        return a;
    }, xt = function(t) {
        var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return e ? {
            r: parseInt(e[1], 16),
            g: parseInt(e[2], 16),
            b: parseInt(e[3], 16),
            a: null
        } : null;
    }, kt = function(t) {
        var e = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))?\s*\)/im.exec(t);
        return e ? {
            r: parseInt(e[1]),
            g: parseInt(e[2]),
            b: parseInt(e[3]),
            a: e[4] && "" != e[4] ? parseFloat(e[4]) : null
        } : null;
    }, F = function(e) {
        var t = kt(e);
        return t ? t : xt(e);
    }, a = t.Config = function(e, r) {
        try {
            a.getScriptFileInfo && !b.gotFileInfo && b.getScriptFileInfo();
        } catch (o) {}
        return typeof r === n ? "string" == typeof e ? t.Config.SearchForKey(e) : t.Config.SearchForKeys(e) : t.Config.setKeyValue(e, r);
    };
    t.extend(t.Config, {
        host: "http://myuserjs.org",
        scopeLock: !1,
        secure: !1,
        browser: t.Browser.getBrowser(),
        getScriptFileInfo: !0,
        script: {
            username: o,
            script_name: o
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
                verbosity_level: t._debug ? 5 : 3,
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
    }), "object" == typeof s.jMOD_CONFIGURATION && (t.Config = t.extend(!0, t.Config, s.jMOD_CONFIGURATION)), 
    Object.defineProperties(t.Config, mt);
    var J = function(e, r) {
        return typeof r === n ? t.Config.SearchForKeyI(e) : t.Config.setKeyValueI(e, r);
    };
    if (a.scanElement = function(a) {
        if (a && M(a)) {
            var i = {}, r = 0, n, e, s, u = /^(?:data-)?(.*?)$/i, o = a.attributes;
            for (r; r < o.length; r++) if (n = o[r].nodeName, n = u.exec(n)[1], e = o[r].value) {
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
                    t.Config.script.username = e;
                    break;

                  case "scriptname":
                  case "script_name":
                  case "script-name":
                    t.Config.script.script_name = e;
                    break;

                  case "jmod-config":
                    try {
                        e = JSON.parse(e), e && t.extend(!0, t.Config, e);
                    } catch (l) {
                        c.error('Error parsing "' + o[r].nodeName + '"', a, l);
                        continue;
                    }
                    break;

                  default:
                    switch (n = n.split("-").join("."), s = J(n), typeof s) {
                      case "number":
                        J(n, parseInt(e));
                        break;

                      case "boolean":
                        J(n, "true" == e.trim().toLowerCase() ? !0 : !1);
                        break;

                      case "string":
                        J(n, e);

                      case "object":
                        try {
                            e = JSON.parse(e), e && J(n, e);
                        } catch (l) {
                            c.error('Error parsing "' + o[r].nodeName + '"', a, l);
                            continue;
                        }
                        break;

                      default:
                        continue;
                    }
                }
                i[n] = e;
            }
            return i;
        }
    }, E.el) if (E.config = a.scanElement(E.el), E.el.id && "" != E.el.id.trim()) E.id = E.el.id; else {
        if (s.document.getElementById(E.id)) {
            for (var B = 0; s.document.getElementById(E.id + "-" + B); ) B++;
            E.id = E.id + "-" + B;
        }
        E.el.id = E.id;
    }
    t.API.ParseMetaData_Types = [], t.API.ParseMetaData_Types.push(function(s, e) {
        if ("history" == s.toLowerCase() && "object" == typeof e) {
            for (var o = /\(([0-9\.]+)\)\s+(.*?)$/i, t = {}, r = 0; r < e.length; r++) if (o.test(e[r])) {
                var i = o.exec(e[r]), a = i[1], l = i[2];
                typeof t[a] === n && (t[a] = []), t[a].push(l);
            }
            return t;
        }
    }), t.API.ParseMetaData_Types.push(function(o, e) {
        if ("resource" == o.toLowerCase()) {
            "object" != typeof e && (e = [ e ]);
            var n, t = 0, r = {}, a = /^\s*([\w]+)\s+(.*?)\s*$/;
            for (t; t < e.length; t++) a.test(e[t]) && (n = a.exec(e[t]), r[n[1]] = n[2]);
            return r;
        }
    }), t.API.ParseMetaData = function(o) {
        var i, s, a, e, r = {}, l = /@([\S]+)\s+(.*?)$/i;
        for ("string" == typeof o && (o = o.split(/\r?\n/i)), a = 0; a < o.length; a++) l.test(o[a]) && (e = l.exec(o[a]), 
        typeof r[e[1]] === n ? r[e[1]] = e[2] : "string" != typeof r[e[1]] ? r[e[1]].push(e[2]) : (i = r[e[1]], 
        r[e[1]] = [], r[e[1]].push(i), r[e[1]].push(e[2])));
        for (s in r) for (a = 0; a < t.API.ParseMetaData_Types.length; a++) if (typeof (i = t.API.ParseMetaData_Types[a](s, r[s])) !== n) {
            r[s] = i;
            break;
        }
        return r;
    };
    var b = t.ScriptInfo = function() {
        if (0 == arguments.length) return t.ScriptInfo.get();
        var e = typeof arguments[0];
        return 1 != arguments.length || "object" !== e && "string" != e ? o : t.ScriptInfo.GM_info(arguments[0]);
    };
    b.getURLInfo = function(t) {
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
    }, b.gotFileInfo = !1, b.getScriptFileInfo = function() {
        if (a.getScriptFileInfo) {
            if (b.gotFileInfo) return a.script.script_file_info;
            var r, o, e, i = {}, l = Error(), s = "" + l.stack;
            if (-1 != s.indexOf("user.js") && (o = t.parseStack(s), o.length > 0)) for (r = 0; r < o.length; r++) if (e = o[r], 
            n === typeof a.jMod_File_Path && -1 != [ "jmod.js", "jmod.min.js", "jmod.full.js", "jmod.min.expanded.js", "mujs.js", "mujs.min.js" ].indexOf(e.fileName.toLowerCase()) && (a.jMod_Full_File_Name = e.fileName, 
            a.jMod_File_Name = e.fileName.substr(0, e.fileName.length - 3), a.jMod_File_Path = e.fullFileName), 
            "" != e.fileName && "user.js" == e.fileExt.toLowerCase()) return b.gotFileInfo = !0, 
            i = a.script.script_file_info = {
                userscript_full_file_name: e.fileName,
                userscript_file_name: e.fileName.substr(0, e.fileName.length - 8),
                userscript_file_path: e.fullFileName,
                caller_lineNumber: e.lineNumber,
                caller_functionName: e.functionName
            }, t.debug && Ht("ScriptInfo", "Get Script File Info Successful!!", i, e), i;
        }
    }, Object.defineProperty(b, "InfoSet", {
        get: function() {
            return typeof a("script.script_info") !== n;
        }
    }), b.set = function(o) {
        var r = {};
        try {
            var p = b.getScriptFileInfo();
            typeof p !== n && (r = t.extend(r, p));
        } catch (f) {}
        try {
            var e, u, i;
            if (typeof o === n && typeof GM_info !== n && (o = {
                gm_info: GM_info,
                has_GM_info: !0,
                has_GM_getMetadata: typeof GM_getMetadata === n ? !1 : !0
            }), "object" == typeof o ? (e = G(o, [ "GM_info", "gm_info", "ginfo" ]), typeof e === n && typeof o.scriptSource !== n && (e = o), 
            typeof e !== n && typeof e.scriptMetaStr !== n && (u = e.scriptMetaStr)) : "string" == typeof o && (u = o), 
            typeof u !== n) {
                i = t.API.ParseMetaData(u);
                for (var s in i) typeof r[s] === n && (r[s] = i[s]);
            }
            if (typeof e !== n) {
                if (typeof e.script !== n) for (var s in e.script) typeof r[s] === n && (r[s] = e.script[s]);
                typeof e.uuid !== n ? r.gmUUID = e.uuid : typeof e.script.uuid !== n && (r.gmUUID = e.script.uuid), 
                typeof e.scriptHandler !== n ? "tampermonkey" == e.scriptHandler.toLowerCase() ? (r.script_handler = "Tampermonkey", 
                r.script_handler_version = e.version) : "greasemonkey" == e.scriptHandler.toLowerCase() && (r.script_handler = "Greasemonkey", 
                r.script_handler_version = e.version) : o.has_GM_info ? (r.script_handler = "Greasemonkey", 
                r.script_handler_version = e.version) : o.has_GM_getMetadata && (r.script_handler = "Scriptish");
            }
            if (typeof i !== n) {
                var l, s = ft(i, [ "downloadURL", "updateURL", "jModupdateURL", "jModUpdateURL", "jModdownloadURL", "jModDownloadURL" ], function(n, e) {
                    return t.ScriptInfo.getURLInfo(e);
                });
                if (typeof s !== n && (l = b.getURLInfo(i[s]))) a("script.username", l.username), 
                a("script.script_name", l.script_name), -1 != [ "meta", "metajs", "data" ].indexOf(l.get_type.toLowerCase()) && a("script.get_type", l.get_type.toLowerCase()); else {
                    var c;
                    (c = G(i, [ "jModusername", "jMod_username" ])) && a("script.username", c), (c = G(i, [ "jModscriptname", "jMod_script_name" ])) && a("script.script_name", c);
                }
                if (typeof i.jMod != n) try {
                    var d = JSON.parse(i.jMod);
                    d && t.extend(!0, t.Config, d);
                } catch (f) {
                    j(f, "ScriptInfo.set", "Error parsing options in MetaBlock");
                }
            }
        } catch (f) {
            j(f, "ScriptInfo.set");
        }
        return Object.defineProperty(t.Config.script, "script_info", {
            value: Object.freeze(r),
            writable: !1,
            enumerable: !0,
            configurable: !1
        }), Object.freeze(r);
    }, b.get = function() {
        var e = t.Config.script.script_info;
        return typeof e != n ? e : b.set.apply(this, arguments);
    }, n == typeof t.Config.script.script_info && n != typeof GM_info && b.set();
    var St = function(n, e) {
        function r(r, u, i, s, l, f) {
            if ("%%" == r) return "%";
            if (e[++t] === o) return o;
            var r = s ? parseInt(s.substr(1)) : o, a = l ? parseInt(l.substr(1)) : o, n;
            switch (f) {
              case "s":
                n = e[t];
                break;

              case "c":
                n = e[t][0];
                break;

              case "f":
                n = parseFloat(e[t]).toFixed(r);
                break;

              case "p":
                n = parseFloat(e[t]).toPrecision(r);
                break;

              case "e":
                n = parseFloat(e[t]).toExponential(r);
                break;

              case "x":
                n = parseInt(e[t]).toString(a ? a : 16);
                break;

              case "d":
                n = parseFloat(parseInt(e[t], a ? a : 10).toPrecision(r)).toFixed(0);
            }
            n = "object" == typeof n ? JSON.stringify(n) : n.toString(a);
            for (var p = parseInt(i), c = i && "0" == i[0] ? "0" : " "; n.length < p; ) n = u !== o ? n + c : c + n;
            return n;
        }
        var t = -1, a = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd])/g;
        return n.replace(a, r);
    }, v = t.Language = function(a) {
        var t, e, r = v.getLanguage(v.Current, !0);
        if (r) {
            if (e = Y.call(r, a), t = typeof e, n == t) {
                if (v.Current === v.Default) return;
                if (r = v.getLanguage(v.Default), e = Y.call(r, a), t = typeof e, n == t) return;
            }
            return 1 == arguments.length || "string" !== t ? e : St.call(St, e, f.call(arguments, 1));
        }
    };
    v.Default = "en", Object.defineProperty(v, "Current", {
        get: function() {
            try {
                return a.Language.Current;
            } catch (e) {
                return v.Default;
            }
        },
        set: function(e) {
            try {
                n !== typeof v.Names[e] && (a.Language.Current = e);
            } catch (t) {}
        }
    }), v.Names = {}, v.getLanguage = function(e, t) {
        return v.Names[e] !== o ? v[e] : t ? v[v.Default] : o;
    }, v.Names.en = "English", v.en = {}, v.Names.es = "Espanol", v.es = {}, t._call = function() {
        var i, r, e, o, s = arguments.length;
        try {
            a.getScriptFileInfo && !b.gotFileInfo && b.getScriptFileInfo();
        } catch (l) {}
        try {
            if (s > 0) {
                if (e = arguments[0], i = typeof e, "string" == i) {
                    if (1 == s) {
                        if (n !== typeof (r = a(e))) return r;
                    } else {
                        switch (o = arguments[1], e) {
                          case "get":
                            return a(o);
                            break;

                          case "set":
                            return a(o, arguments[2]);
                        }
                        if ("function" == typeof o && typeof t.Events.e[e] !== n) return t.Events.addListener.apply(t.Events, f.call(arguments));
                        if (2 == s && n !== typeof (r = a(e)) && typeof r == typeof o) return a(e, o);
                    }
                    if (-1 != t.log.fnList.join("|").toLowerCase().split("|").indexOf(e.toLowerCase()) && "function" == typeof (r = vt.call(t.log, e))) return r.apply(t.log, f.call(arguments, 1));
                } else if ("object" == i) {
                    if (!M(e)) {
                        if (typeof ft(e, [ "GM_info", "gm_info", "ginfo" ]) !== n) return b.set.apply(b, f.call(arguments));
                        if (typeof e.scriptSource !== n && typeof e.scriptMetaStr !== n) return b.set.apply(b, f.call(arguments));
                    }
                } else if ("function" == i && 1 == s) return t.onReady = e, e;
                a("debug") && t.Warning("Unable to process jMod() call:", f.call(arguments));
            }
        } catch (l) {}
    }, t.$ = function(r, e, a) {
        e || (e = n !== typeof document ? document : s.document);
        try {
            if (!0 !== a && t.jQueryAvailable) try {
                return $(r, e).first()[0];
            } catch (o) {}
            if ("string" != typeof r) return;
            return e.querySelector(r);
        } catch (o) {
            t.Exception("jMod.Query", "Error!", o);
        }
    }, t.$$ = function(r, e, o) {
        e || (e = n !== typeof document ? document : s.document);
        try {
            if (!0 !== o && t.jQueryAvailable) try {
                return $(r, e).toArray();
            } catch (i) {}
            if ("string" != typeof r) return;
            var a = e.querySelectorAll(r);
            return a ? [].map.call(a, function(e) {
                return e;
            }) : [];
        } catch (i) {
            t.Exception("jMod.Query", "Error!", i);
        }
    }, t.Element = function(e, a) {
        try {
            var n = f.call(arguments);
            switch (A(e)) {
              case "string":
                if ("function" == typeof t.Element[command]) return t.Element._call.apply(t.Element, arguments);
                break;

              case "map":
              case "object":
                return 1 == n.length ? g.apply(t.Element, arguments) : g(n);
                break;

              default:
                t.Element.isElement(e);
            }
        } catch (r) {
            j(r, "jMod.Element");
        }
    }, t.Element._call = function(e) {
        return "function" == typeof t.Element[e] ? t.Element[e].apply(t.Element, f.call(arguments, 1)) : o;
    }, t.Element.isElement = M;
    var I = t.Element.hasClass = function(e, t) {
        var n = e.className.split(" ");
        return -1 == n.indexOf(t) ? !1 : !0;
    }, Jt = t.Element.hasClasses = function(a, e) {
        var n = [], o = a.className.split(" "), t = "string" == typeof e ? e.split(" ") : e;
        for (var r in t) -1 != o.indexOf(t[r]) && n.push(t[r]);
        return n;
    }, qt = t.Element.missingClasses = function(a, e) {
        var n = [], o = a.className.split(" "), t = "string" == typeof e ? e.split(" ") : e;
        for (var r in t) -1 == o.indexOf(t[r]) && n.push(t[r]);
        return n;
    }, C = t.Element.addClass = function(e, t) {
        return I(e, t) || (e.className = (e.className + " " + t).trim()), e;
    }, $t = t.Element.addClasses = function(t, n) {
        for (var r = "string" == typeof n ? n.split(" ") : n, a = t.className.split(" "), e = 0; e < r.length; e++) -1 == a.indexOf(r[e]) && a.push(r[e]);
        return t.className = a.join(" "), t;
    }, N = t.Element.removeClass = function(e, r) {
        var a = e.className, t = a.split(" "), n = t.indexOf(r);
        return -1 == n ? e : (t.splice(n, 1), e.className = t.join(" "), e);
    }, Dt = t.Element.removeClasses = function(e, r) {
        var t;
        t = "string" == typeof r ? f.call(arguments, 1) : r;
        var o = e.className, n = o.split(" ");
        for (var i in t) {
            var a = n.indexOf(t[i]);
            -1 != a && n.splice(a, 1);
        }
        return e.className = n.join(" "), e;
    }, Bt = function(e, t) {
        for (var n in t) e.setAttribute(n, t[n]);
        return e;
    }, bt = function(e, t) {
        return e.hasAttribute(t);
    }, Ut = function(n, e) {
        r = [], "string" == typeof e && (e = e.split(" "));
        for (var t = 0; t < e.length; t++) n.hasAttribute(e[t]) && r.push(e[t]);
        return r;
    }, x = function(e, t) {
        return e.getAttribute(t);
    }, L = t.Element.appendChild = function(e, t) {
        try {
            if (M(e) || "object" != typeof e || e.type === o) {
                if (typeof t === n || null === t) return e;
                if (M(t)) e.appendChild(t); else switch (A(t)) {
                  case n:
                  case "null":
                    break;

                  case "array":
                    for (var a = 0; a < t.length; a++) e = L(e, t[a]);
                    break;

                  case "object":
                  case "map":
                    var i = g(t);
                    i && e.appendChild(i);
                    break;

                  case "string":
                  case "number":
                  case "symbol":
                  case "boolean":
                  default:
                    var s = document.createElement("div");
                    s.innerHTML = t;
                    for (var l = s.childNodes, a = 0; a < l.length; a++) e.appendChild(l[a]);
                }
            } else {
                var r;
                e.innerHTML !== o && (r = "innerHTML"), e.text !== o && (r = "text"), r ? "array" == A(e[r]) ? e[r].push(t) : e[r] = [ e[r], t ] : e.innerHTML = [ t ];
            }
        } catch (c) {
            j(c, "jMod.Element.appendChild");
        } finally {
            return e;
        }
    };
    const Z = [ "checked", "defaultValue", "title", "async", "defer", "src", "onerror", "onload", "responseCallback", "value", "max", "min" ];
    var g = t.Element.createNewElement = function(e) {
        var t, i = e.EventListeners || e.eventListeners, r = document.createElement(e.type || "div");
        if (e.id !== o && (r.id = e.id), e.className !== o ? r.className = e.className : e["class"] !== o && (r.className = e["class"]), 
        "string" == typeof e.style) r.style = e.style; else if ("object" == typeof e.style) for (t in e.style) r.style[t] = e.style[t];
        for (t = 0; t < Z.length; t++) e[Z[t]] !== o && (r[Z[t]] = e[Z[t]]);
        if (e.attributes !== o) for (t in e.attributes) typeof e.attributes[t] !== n && null !== e.attributes[t] && r.setAttribute(t, e.attributes[t]);
        if (i) for (var a in i) if ("function" == typeof i[a]) r.addEventListener(a, i[a]); else if ("object" == typeof i[a]) {
            var l = i[a].useCapture || i[a].Capture || i[a].capture || !1, s = i[a].callback || i[a]["function"];
            if (s) if ("array" == A(s)) for (t in s) r.addEventListener(a, s[t], l); else r.addEventListener(a, s, l);
        }
        return L(r, G(e, [ "innerHTML", "text" ])), r;
    }, At = t.Element.getOffset = function(t) {
        var n = t.getBoundingClientRect(), e = t.ownerDocument, r = e.documentElement, a = null != e && e === e.window ? e : 9 === e.nodeType && e.defaultView;
        return {
            top: parseInt(n.top + a.pageYOffset - r.clientTop),
            left: parseInt(n.left + a.pageXOffset - r.clientLeft),
            bottom: n.bottom,
            height: parseInt(n.height || parseInt(t.offsetHeight) - parseInt(t.clientHeight) + parseInt(t.scrollHeight)),
            width: parseInt(t.offsetWidth)
        };
    }, Lt = t.Element.isNamespaced = function(n, r) {
        for (var e = n; e.parentElement; ) if (e = e.parentElement, t.Element.hasClass(e, r)) return !0;
        return !1;
    }, Gt = t.Element.findParentWithClass = function(n, r) {
        for (var e = n; e.parentElement; ) if (e = e.parentElement, t.Element.hasClass(e, r)) return e;
    }, Wt = t.Element.findParentWithAttribute = function(a, t, r) {
        for (var e = a; e.parentElement; ) if (e = e.parentElement, e.hasAttribute(t) && (n === typeof r || e.getAttribute(t) == r)) return e;
    };
    +function() {
        function r(e) {
            return n !== typeof e && n !== typeof e.timeStamp ? !0 : !1;
        }
        function u(e) {
            return "console" == A(e) ? !0 : n === typeof e || r(e) || n !== typeof e.dirxml || n === typeof e.trace ? !1 : !0;
        }
        function y(e) {
            return n === typeof e || r(e) || u(e) || n !== typeof e.dirxml || n !== typeof e.exception ? !1 : !0;
        }
        function d(e) {
            return e(c) ? c : e(this.console) ? this.console : e(p.console) ? p.console : e(s.console) ? s.console : e(s.window.console) ? s.window.console : o;
        }
        function b() {
            return d(r);
        }
        function h() {
            return d(y);
        }
        function M() {
            return d(u);
        }
        function v(e) {
            return -1 == a("API.log.disabled").indexOf(e) && a("API.log.verbosity_level") > 1;
        }
        var e, m = {
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
        }, g = [ [ "Error", "ERROR" ], [ "logError", "ERROR" ], [ "Exception", "EXCEPTION" ], [ "Warning", "WARNING" ], [ "Info", "INFO" ], [ "Log", "LOG" ], [ "Debug", "DEBUG" ] ], i = [ "assert", "clear", "count", "dir", "dirxml", "group", "groupCollapsed", "groupEnd", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace" ], l = [ "Debug", "Log", "Info", "Warning", "logError", "Exception" ];
        for (t.log = t.API.log = {
            OUTPUT_TYPES: m,
            fb: o,
            c2: o,
            wc: o,
            fnList: [].concat(l, i),
            updateFB: function(e) {
                r(e) && (a("API.log.debug") && c.info("jMod.API.log - Firebug Object: ", e), this.fb = e);
            },
            updateC2: function(e) {
                y(e) && (a("API.log.debug") && c.info("jMod.API.log - Console2 Object: ", e), this.c2 = e);
            },
            updateWC: function(e) {
                u(e) && (a("API.log.debug") && c.info("jMod.API.log - Web Console Object: ", e), 
                this.wc = e);
            },
            UpdateAll: function() {
                this.updateFB(b()), this.updateC2(h()), this.updateWC(M());
            },
            ScopedConsoleCommand: function(t, r) {
                var a = -1 != [ "debug", "log", "info", "warn", "error", "exception" ].indexOf(t) && "string" == typeof r && /(?:\%s|\%c|\%o|\%d|\%f|\%\.\df|\%i)/.test(r), e = a || n != this.fb && n != typeof this.fb[t] ? this.fb : this.wc;
                if (n == typeof e[t]) return !1;
                try {
                    switch (arguments.length) {
                      case 1:
                        e[t].call(e);
                        break;

                      case 2:
                        e[t].call(e, arguments[1]);
                        break;

                      case 3:
                        e[t].call(e, arguments[1], arguments[2]);
                        break;

                      case 4:
                        e[t].call(e, arguments[1], arguments[2], arguments[3]);
                        break;

                      case 5:
                        e[t].call(e, arguments[1], arguments[2], arguments[3], arguments[4]);
                        break;

                      case 6:
                        e[t].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                        break;

                      case 7:
                        e[t].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                        break;

                      case 8:
                        e[t].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
                        break;

                      case 9:
                        e[t].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]);
                        break;

                      case 10:
                        e[t].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);
                        break;

                      case 11:
                        e[t].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10]);
                        break;

                      case 12:
                        e[t].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11]);
                        break;

                      case 13:
                        e[t].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12]);
                        break;

                      case 14:
                        e[t].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13]);
                        break;

                      case 15:
                        e[t].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14]);
                        break;

                      case 16:
                        e[t].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14], arguments[15]);
                        break;

                      default:
                        return !1;
                    }
                } catch (o) {
                    return !1;
                }
                return !0;
            },
            ConsoleCommand: function(e, r) {
                try {
                    var t = f.call(arguments, 1), o = O(t, s, {
                        cloneFunctions: !0,
                        wrapReflectors: !0
                    }), i = -1 != [ "debug", "log", "info", "warn", "error", "exception" ].indexOf(e) && "string" == typeof r && /(?:\%s|\%c|\%o|\%d|\%f|\%\.\df|\%i)/.test(r);
                    try {
                        typeof this.fb !== n && typeof this.fb[e] !== n && a("API.log.Firebug") ? this.fb[e].apply(this.fb, t) : !i && typeof this.wc !== n && typeof this.wc[e] !== n && a("API.log.WebConsole") && this.wc[e].apply(this.wc, t);
                    } catch (l) {
                        typeof this.fb !== n && typeof this.fb[e] !== n && a("API.log.Firebug") ? this.fb[e].apply(this.fb, o) : !i && typeof this.wc !== n && typeof this.wc[e] !== n && a("API.log.WebConsole") && this.wc[e].apply(this.wc, o);
                    }
                } catch (l) {
                    c.error(l);
                }
            },
            outputMessage: function(e, t) {
                e.level <= a("API.log.verbosity_level") && this.ConsoleCommand.apply(this, [ e.value ].concat(f.call(arguments, 1)));
            },
            fmt: {
                time: "font-weight:bold;font-size:120%;color:red;",
                stchange: "font-weight:bold;font-size:130%;color:blue;",
                iconStyle: 'font-size:175%;background-image:url("http://myuserjs.org/img/favicon/favicon.png");background-size:auto 75%;background-repeat: no-repeat;background-position:left center;',
                infoDefaultStyle: " ",
                infoHeaderStyle: 'font-size:175%;font-weight:300;font-family:"Sansation","Open Sans",Arial;',
                infoTitleStyle: "color:#000;font-size:125%;",
                infoTextStyle: "font-weight:bold;font-size:120%;color:blue;",
                warningDefaultStyle: " ",
                warningHeaderStyle: 'font-size:175%;font-weight:300;font-family:"Sansation","Open Sans",Arial;',
                warningTitleStyle: "color:#000;font-size:125%;",
                warningTextStyle: "font-weight:bold;font-size:120%;color:red;"
            }
        }, e = 0; e < g.length; e++) t.API.log[g[e][0]] = function(e) {
            return function() {
                return this.outputMessage.apply(this, [ m[e] ].concat(f.call(arguments)));
            }.bind(t.API.log);
        }(g[e][1]);
        for (e = 0; e < i.length; e++) t.API.log[i[e]] = function(e) {
            return function() {
                return v(e) ? this.ConsoleCommand.apply(this, [ e ].concat(f.call(arguments))) : o;
            }.bind(t.API.log);
        }(i[e]);
        for (e = 0; e < l.length; e++) t[l[e]] = t.log[l[e]].bind(t.API.log);
        t.API.logFormatBuilder = function() {
            this.args = [], this.add = function(e, r, a) {
                var i = n === typeof e, s = typeof r;
                typeof r === n && (r = typeof e);
                var t;
                switch (r) {
                  case "d":
                  case "%d":
                    t = "%d";
                    break;

                  case "i":
                  case "%i":
                    t = "%i";
                    break;

                  case "f":
                  case "%f":
                    t = "%.2f";
                    break;

                  case "number":
                    parseInt(e) === e && e === +e ? (t = "%d", e = parseInt(e)) : (t = "%.2f", e = parseFloat(e));
                    break;

                  case "s":
                  case "%s":
                    "\n" == e || " \n" == e ? (t = " \n", e = o, a = o, i = !1) : t = "%s";
                    break;

                  case "string":
                    t = e, e = o, i = !1;
                    break;

                  case "o":
                  case "%o":
                    t = "%o";
                    break;

                  case "object":
                  default:
                    t = s == n && n == typeof a ? "" : "%o";
                }
                this.args.push({
                    valueIsUndefined: i,
                    value: e,
                    fmtString: t,
                    style: a
                });
            }, this.build = function() {
                for (var n = "", t = [], e = 0; e < this.args.length; e++) n += (o !== this.args[e].style ? "%c" : "") + this.args[e].fmtString, 
                o !== this.args[e].style && t.push("" != this.args[e].style ? this.args[e].style : " "), 
                (o !== this.args[e].value || this.args[e].valueIsUndefined) && t.push(this.args[e].value);
                return [ n ].concat(t);
            };
        }, t.log.UpdateAll();
    }();
    var j = function(r, a, o) {
        var e = "", i = 'font-size:175%;font-weight:300;font-family:"Sansation","Open Sans",Arial;', s = "color:#000;font-size:125%;", l = "color:blue;";
        typeof r !== n && null !== r ? arguments.length <= 3 ? t.log.ScopedConsoleCommand.call(t.log, "error", "%c%s%cjMod Error%c - %c%s \n%s \n%c%s - %c(line %d)", e + t.log.fmt.iconStyle, "  ", e + i, " ", e + s, a || " ", o || " ", e + " ", r.message, e + l, r.lineNumber, r) : t.log.ScopedConsoleCommand.call(t.log, "error", "%c%s%cjMod Error%c - %c%s \n%s \n%c%s - %c(line %d)", e + t.log.fmt.iconStyle, "  ", e + i, " ", e + s, a || " ", o || " ", e + " ", r.message, e + l, r.lineNumber, r, arguments[3]) : t.log.ScopedConsoleCommand.apply(t.log, [ "error", "%c%s%cjMod Error%c - %c%s \n%s", e + t.log.fmt.iconStyle, "  ", e + i, " ", e + s, a || " ", o || " " ].concat(f.call(arguments, 3)));
    }, nt = function(i, s) {
        if (!(t.log.OUTPUT_TYPES.WARNING.level > a("API.log.verbosity_level"))) {
            var o = 2, r = t.log.fmt.warningDefaultStyle, e = new t.API.logFormatBuilder();
            for (e.add("  ", "%s", r + t.log.fmt.iconStyle), e.add("jMod Warning", "string", r + t.log.fmt.warningHeaderStyle), 
            n !== typeof s ? (e.add(" - ", "string", r), e.add(i || " ", "%s", r + t.log.fmt.warningTitleStyle), 
            e.add(" \n", "string"), e.add(s || "", "%s", r + t.log.fmt.warningTextStyle)) : (e.add(" \n", "string"), 
            e.add(i || "", "%s", r + t.log.fmt.warningTextStyle)), arguments.length > 2 && e.add(" \n", "string"), 
            o; o < arguments.length; o++) e.add(arguments[o]);
            t.Warning.apply(t.log, e.build());
        }
    }, Ht = function(i, s) {
        if (!(t.log.OUTPUT_TYPES.INFO.level > a("API.log.verbosity_level"))) {
            var o = 2, r = t.log.fmt.infoDefaultStyle, e = new t.API.logFormatBuilder();
            for (e.add("  ", "%s", r + t.log.fmt.iconStyle), e.add("jMod", "string", r + t.log.fmt.infoHeaderStyle), 
            n !== typeof s ? (e.add(" - ", "string", r), e.add(i || " ", "%s", r + t.log.fmt.infoTitleStyle), 
            e.add(" \n", "string"), e.add(s || "", "%s", r + t.log.fmt.infoTextStyle)) : (e.add(" \n", "string"), 
            e.add(i || "", "%s", r + t.log.fmt.infoTextStyle)), arguments.length > 2 && e.add(" \n", "string"), 
            o; o < arguments.length; o++) e.add(arguments[o]);
            t.Info.apply(t.log, e.build());
        }
    }, _ = function(r, o, i) {
        if (!(t.log.OUTPUT_TYPES.INFO.level > a("API.log.verbosity_level"))) {
            var s = (o || "") + t.timeElapsed.toFixed(2) + "ms" + (i || ""), n = t.log.fmt.infoDefaultStyle, e = new t.API.logFormatBuilder();
            e.add("  ", "%s", n + t.log.fmt.iconStyle), e.add("jMod", "string", n + t.log.fmt.infoHeaderStyle), 
            e.add(" - ", "string", n), e.add(r || " ", "%s", n + t.log.fmt.infoTitleStyle), 
            e.add(" ", "string"), e.add(s, "%s", n + t.log.fmt.time), t.Info.apply(t.log, e.build());
        }
    };
    t.log.Info("Loading jMod API v" + t.version + " " + t.build_type + (t.debug ? " (debug enabled)" : "") + " - " + new Date(parseInt(t.build_time))), 
    t.debug && (_("jMod Init Start Time"), t.log.group("jMod Start"), t.log.group("jMod Initialize"), 
    E.el && t.Info("CurrentRunningScript", E)), t.Events = {
        e: {},
        fired: {},
        addEvent: function(e, r) {
            this.e[e] = {
                recordEvent: typeof r !== n ? r : !0,
                listeners: []
            }, Object.defineProperty(t, e, new function(e) {
                return {
                    set: function(n) {
                        t.Events.addListener(e, n);
                    },
                    get: function() {
                        return typeof t.Events.fired[e] !== n;
                    },
                    enumerable: !1
                };
            }(e));
        },
        addListener: function(e, r, t) {
            this.e[e].listeners.push(r), t = typeof t !== n ? t : !0, t && typeof this.fired[e] !== n && typeof this.fired[e].args !== n && r.apply(this.fired[e]._this, this.fired[e].args);
        },
        fire: function(e, t) {
            if (typeof this.e[e] !== n) {
                typeof this.fired[e] === n && (this.fired[e] = {
                    count: 0,
                    args: o,
                    _this: null
                });
                var r, a = null;
                "object" == typeof t && typeof t._this !== n && typeof t.args !== n ? (a = t._this, 
                r = t.args) : r = f.call(arguments, 1), this.e[e].recordEvent && (this.fired[e].args = r, 
                this.fired[e]._this = a);
                for (var i = []; B = this.e[e].listeners.pop(); ) B.apply(a, r) || i.push(B);
                this.e[e].listeners = i, this.fired[e].count++;
            }
        }
    }, t.Events.addEvent("onDOMReady"), t.Events.addEvent("onReady"), t.Events.addEvent("onPageReady"), 
    t.Events.addEvent("onPerformanceReady"), t.Events.addEvent("load"), t.Events.addEvent("DOMContentLoaded"), 
    t.Events.addEvent("onreadystatechange"), t.Events.addEvent("afterscriptexecute", !1), 
    t.Events.addEvent("beforescriptexecute", !1);
    var ct = function(t) {
        var e = {};
        this.events = t || [], this.add = function(t, r, a) {
            -1 == this.events.indexOf(r) && this.events.push(r), typeof e[t] === n && (e[t] = {}), 
            typeof e[t][r] === n && (e[t][r] = []), e[t][r].push(a);
        }, this.addAll = function(t, n) {
            for (var e in this.events) "function" == typeof t[this.events[e]] && this.add(n, this.events[e], t[this.events[e]]);
        }, this.fire = function(s, r, l, a) {
            var t, i, o, r = e[r || "0"];
            t = "array" == A(a) ? a : [ a ], arguments.length > 4 && (t = t.concat(f.call(arguments, 4)));
            try {
                if (typeof r !== n && typeof (o = r[s]) !== n) for (i in o) if (!1 === o[i].apply(l || null, t || [])) return c.log("fire canceled"), 
                !1;
            } catch (u) {
                j(u, "jMod.EventsClass.fire");
            }
        };
    };
    t.Observer = function() {
        this.filters = [], this.addFilter = function(e, t, n) {
            this.filters.push({
                callback: e,
                data: t,
                fireOnce: !0 === n ? !0 : !1
            });
        }, this.filterMutation = function(o) {
            var e, a, i, n, r = 0;
            for (r; r < this.filters.length; r++) if (e = this.filters[r].data, a = !1, !e.type || ("string" == typeof e.type && (e.type = [ e.type ]), 
            -1 != e.type.indexOf(o.type))) {
                if ("object" == typeof e.target) {
                    if (e.target.hasClass) {
                        for ("string" == typeof e.target.hasClass && (e.target.hasClass = [ e.target.hasClass ]), 
                        n = 0; n < e.target.hasClass.length; n++) if (!I(o.target, e.target.hasClass[n])) {
                            a = !0;
                            break;
                        }
                        if (a) continue;
                    }
                    if (e.target.hasChildren) {
                        for ("string" == typeof e.target.hasChildren && (e.target.hasChildren = [ e.target.hasChildren ]), 
                        n = 0; n < e.target.hasChildren.length; n++) if (i = t.$$(e.target.hasChildren[n], o.target), 
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
    }, t.FileSelector = function(r) {
        var e = this;
        e.events = {
            change: []
        }, r.onChange && e.events.change.push(r.onChange), e.onChange = function(r) {
            for (var n = 0; n < e.events.change.length; n++) e.events.change[n].call(this || e || t, r, e.files(), e.value());
        }, e.click = function(t, r) {
            return ut(e.buttonTriggerElement, n !== typeof t ? t : !0, n !== typeof r ? r : !0);
        }, e.files = function() {
            return e.inputElement.files;
        }, e.value = function() {
            return e.inputElement.value;
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
                change: e.onChange
            }
        };
        r.defaultValue && (a.defaultValue = r.defaultValue), r.accept && (a.attributes.accept = r.accept), 
        e.inputElement = g(a);
        var o = {
            type: "button",
            EventListeners: {
                click: function(t) {
                    c.log("Button click triggered");
                    var e = this.previousSibling;
                    return e.focus(), ut(e), P(t), !1;
                }
            }
        };
        "object" == typeof r.button && (r.button.type && delete r.button.type, r.button.EventListeners && r.button.EventListeners.click && delete r.button.EventListeners.click, 
        o = t.extend(!0, o, r.button)), e.buttonTriggerElement = g(o);
        var i = t.extend(!0, r.form || {}, {
            type: "form",
            innerHTML: [ e.inputElement, e.buttonTriggerElement ]
        });
        e.formElement = g(i), t.FileSelector.FileSelectorForms.push(e.formElement);
    }, t.FileSelector.FileSelectorForms = [], t.FileSelector.FileReadSupport = function() {
        return p.File && p.FileReader;
    }, t.FileSelector.BlobSupport = function() {
        return p.File && p.Blob;
    }, t.FileSelector.ReadFileAsText = function(n, r, i) {
        if (!t.FileSelector.FileReadSupport) return t.debug && c.log("Error! No Support For File Reading!"), 
        !1;
        var a = new FileReader();
        return n ? (a.onload = function(e) {
            return r.call(this || t, e, e.target.result, n);
        }, a.onerror = function(e) {
            return t.debug && c.log("Error reading file", n), (i || r)(e, o, n);
        }, a.readAsText(n), !0) : (t.debug && c.log("Error reading file", n), (i || r)(e, o, n), 
        !1);
    }, t.FileSelector.ReadFileAsURL = function(n, r, i) {
        if (!t.FileSelector.FileReadSupport) return t.debug && c.log("Error! No Support For File Reading!"), 
        !1;
        var a = new FileReader();
        return n ? (a.onload = function(e) {
            return r.call(this || t, e, e.target.result, n);
        }, a.onerror = function(e) {
            return t.debug && c.log("Error reading file", n), (i || r)(e, o, n);
        }, a.readAsDataURL(n), !0) : (t.debug && c.log("Error reading file", n), (i || r)(e, o, n), 
        !1);
    }, t.FileSelector.ReadFileAsJSON = function(r, e, n) {
        return t.FileSelector.ReadFileAsText(r, function(a, i, r) {
            if (!i || "" == i) return t.debug && c.log("Error! JSON file is empty!", r), (n || e)(a, o, r);
            try {
                return e(a, JSON.parse(i), r);
            } catch (s) {
                return t.debug && c.log("Error! Cannot parse json file!", s, r), (n || e)(a, o, r);
            }
        });
    };
    var jt = t.API.addStyle = function(e) {
        if (e && "" != e) {
            if (typeof GM_addStyle !== n) return GM_addStyle(e) || !0;
            var r, a = p || s, o = a.document.getElementsByTagName("head");
            if (o) {
                r = a.document.createElement("style");
                try {
                    r.innerHTML = e;
                } catch (i) {
                    r.innerText = e;
                }
                return r.type = "text/css", o[0].appendChild(r);
            }
            t.debug && nt("jMod.API.addStyle", "Could not add css", e);
        }
    };
    t.API.addStylesheet = function(n) {
        var e, r = p || s, a = r.document.getElementsByTagName("head");
        return a ? (e = r.document.createElement("link"), e.setAttribute("rel", "stylesheet"), 
        e.href = n, a[0].appendChild(e)) : (t.debug && nt("jMod.API.addStylesheet", "Could not add stylesheet", n), 
        o);
    }, t.API.importStylesheet = function(e) {
        t.CSS = "@import url(" + e + ");\n";
    }, t.API.addScript = function(r, o, i, s, l, c) {
        var t, a, e;
        if (e = "object" == typeof r ? r : {
            js: r,
            src: o,
            id: i,
            type: s,
            async: l,
            defer: c
        }, a = document.getElementsByTagName("head")) {
            if (t = document.createElement("script"), typeof e.id !== n) try {
                t.id = e.id;
            } catch (u) {}
            if (typeof e.async !== n && (t.async = e.async), typeof e.defer !== n && (t.defer = e.defer), 
            typeof e.onload !== n && (t.onload = e.onload), typeof e.onerror !== n && (t.onerror = e.onerror), 
            t.type = e.type || "text/javascript", typeof e.js != n && null != e.js && "" != e.js) try {
                t.innerHTML = e.js;
            } catch (u) {
                t.innerText = e.js;
            }
            if (typeof e.src != n && null != e.src && "" != e.src) try {
                t.src = e.src;
            } catch (u) {}
            try {
                return a[0].appendChild(t);
            } catch (u) {}
        }
        return null;
    }, t.API.contentEval = function(e) {
        "function" == typeof e && (e = "(" + e + ")();");
        var t = document.createElement("script");
        t.setAttribute("type", "application/javascript"), t.textContent = e, s.document.body.appendChild(t), 
        s.document.body.removeChild(t);
    }, t.API.GM_Storage = {
        getValue: function(e, t) {
            return typeof GM_getValue !== n ? GM_getValue(a("API.Storage.prefix") + e, t) : o;
        },
        setValue: function(e, t) {
            return typeof GM_setValue !== n ? GM_setValue(a("API.Storage.prefix") + e, t) : o;
        },
        setJSON: function(n, e) {
            var t;
            try {
                t = JSON.stringify(e);
            } catch (r) {
                j(r, "GM_Storage.setJSON", "Cannot stringify value!");
            }
            try {
                return this.setValue(n, t || e);
            } catch (r) {}
        },
        getJSON: function(t, n) {
            var e = this.getValue(t, n);
            try {
                if ("string" == typeof e) return JSON.parse(e);
            } catch (r) {
                j(r, "GM_Storage.setJSON", "Error parsing value!");
            }
            return e;
        },
        deleteValue: function(e) {
            return typeof GM_deleteValue !== n ? GM_deleteValue(a("API.Storage.prefix") + e) : o;
        }
    }, t.API.localStorage = {
        getValue: function(t, n) {
            var e = this.stor.getItem(a("API.Storage.prefix") + t);
            return null !== e ? e : n;
        },
        setValue: function(e, t) {
            return this.stor.setItem(a("API.Storage.prefix") + e, t);
        },
        setJSON: function(n, e) {
            var t;
            try {
                t = JSON.stringify(e);
            } catch (r) {
                j(r, "localStorage.setJSON", "Cannot stringify value!");
            }
            try {
                return this.setValue(n, t || e);
            } catch (r) {}
        },
        getJSON: function(t, n) {
            var e = this.getValue(t, n);
            try {
                if ("string" == typeof e) return JSON.parse(e);
            } catch (r) {
                j(r, "localStorage.setJSON", "Error parsing value!");
            }
            return e;
        },
        deleteValue: function(e) {
            return this.stor.removeItem(a("API.Storage.prefix") + e);
        }
    }, Object.defineProperty(t.API.localStorage, "stor", {
        get: function() {
            return localStorage ? localStorage : s.localStorage ? s.localStorage : p.localStorage;
        },
        enumerable: !1
    }), t.API.sessionStorage = {
        getValue: function(t, n) {
            var e = this.stor.getItem(a("API.Storage.prefix") + t);
            return null !== e ? e : n;
        },
        setValue: function(e, t) {
            return this.stor.setItem(a("API.Storage.prefix") + e, t);
        },
        setJSON: function(n, e) {
            var t;
            try {
                t = JSON.stringify(e);
            } catch (r) {
                j(r, "sessionStorage.setJSON", "Cannot stringify value!");
            }
            try {
                return this.setValue(n, t || e);
            } catch (r) {}
        },
        getJSON: function(t, n) {
            var e = this.getValue(t, n);
            try {
                if ("string" == typeof e) return JSON.parse(e);
            } catch (r) {
                j(r, "sessionStorage.setJSON", "Error parsing value!");
            }
            return e;
        },
        deleteValue: function(e) {
            return this.stor.removeItem(a("API.Storage.prefix") + e);
        }
    }, Object.defineProperty(t.API.sessionStorage, "stor", {
        get: function() {
            return sessionStorage ? sessionStorage : s.sessionStorage ? s.sessionStorage : p.sessionStorage;
        },
        enumerable: !1
    }), t.getValue = function(e, t) {
        return "GM_Storage" == a("API.Storage.engine") && n != typeof GM_getValue ? d.GM_Storage.getValue.apply(d.GM_Storage, arguments) : "sessionStorage" == a("API.Storage.engine") ? d.sessionStorage.getValue.apply(d.sessionStorage, arguments) : d.localStorage.getValue.apply(d.localStorage, arguments);
    }, t.setValue = function(e, t) {
        return "GM_Storage" == a("API.Storage.engine") && n != typeof GM_setValue ? d.GM_Storage.setValue.apply(d.GM_Storage, arguments) : "sessionStorage" == a("API.Storage.engine") ? d.sessionStorage.setValue.apply(d.sessionStorage, arguments) : d.localStorage.setValue.apply(d.localStorage, arguments);
    }, t.getJSON = function(e, t) {
        return "GM_Storage" == a("API.Storage.engine") && n != typeof GM_getValue ? d.GM_Storage.getJSON.apply(d.GM_Storage, arguments) : "sessionStorage" == a("API.Storage.engine") ? d.sessionStorage.getJSON.apply(d.sessionStorage, arguments) : d.localStorage.getJSON.apply(d.localStorage, arguments);
    }, t.setJSON = function(e, t) {
        return "GM_Storage" == a("API.Storage.engine") && n != typeof GM_setValue ? d.GM_Storage.setJSON.apply(d.GM_Storage, arguments) : "sessionStorage" == a("API.Storage.engine") ? d.sessionStorage.setJSON.apply(d.sessionStorage, arguments) : d.localStorage.setJSON.apply(d.localStorage, arguments);
    }, t.deleteValue = function(e) {
        return "GM_Storage" == a("API.Storage.engine") && n != typeof GM_deleteValue ? d.GM_Storage.deleteValue.apply(d.GM_Storage, arguments) : "sessionStorage" == a("API.Storage.engine") ? d.sessionStorage.deleteValue.apply(d.sessionStorage, arguments) : d.localStorage.deleteValue.apply(d.localStorage, arguments);
    }, t.API.getRemoteImageAsURL = function(r, e, t) {
        if (n != typeof GM_xmlhttpRequest) {
            var a = /Content-Type:\s*([^\s]+)/i;
            return "function" == typeof e && n === typeof t && (t = e, e = o), GM_xmlhttpRequest({
                method: "GET",
                url: r,
                overrideMimeType: "text/plain; charset=x-user-defined",
                onload: function(o) {
                    if (n == typeof e || null == e || "" == e) try {
                        var r = a.exec(o.responseHeaders);
                        r && r.length > 1 && (e = r[1].trim());
                    } catch (i) {}
                    t("data:" + (e && "" != e ? e : "image/png") + ";base64," + Nt(o.responseText));
                }
            });
        }
    }, t.API.getResourceText = function(r, e, i) {
        if (n !== typeof GM_getResourceText) try {
            var a = GM_getResourceText(r);
            return e && e(a), a;
        } catch (s) {}
        return i ? t.API.getResourceTextLive(r, e) : o;
    }, t.API.getResourceURL = function(r, e, i) {
        if (n !== typeof GM_getResourceURL) try {
            var a = GM_getResourceURL(r);
            return e && e(a), a;
        } catch (s) {}
        return i ? t.API.getResourceURLLive(r, e) : o;
    }, t.API.getResourceTextLive = function(t, r) {
        if (n != typeof GM_xmlhttpRequest) {
            var e = a("script.script_info.resource");
            return e && n !== typeof e[t] ? GM_xmlhttpRequest({
                method: "GET",
                url: e[t],
                onload: function(e) {
                    r(e.responseText);
                }
            }) : o;
        }
    }, t.API.getResourceURLLive = function(r, i) {
        var e = a("script.script_info.resource");
        return e && n !== typeof e[r] ? t.API.getRemoteImageAsURL(e[r], i) : o;
    }, t.API.addResourceCSS = function(e) {
        if (!t.API.getResourceText(e, function(e) {
            "string" == typeof e && "" != e && (t.CSS = e);
        }, !1)) {
            var r = a("script.script_info.resource");
            r && n !== typeof r[e] && t.API.addStylesheet(r[e]);
        }
    }, t.API.addResourceScript = function(e) {
        if (!t.API.getResourceText(e, function(e) {
            "string" == typeof e && "" != e && t.API.addScript({
                js: e
            });
        }, !1)) {
            var r = a("script.script_info.resource");
            r && n !== typeof r[e] && t.API.addScript({
                src: r[e],
                async: !0,
                defer: !0
            });
        }
    }, t.API.Date = function(e, n) {
        switch (e) {
          case "parseUTC":
          case "parseUTCDate":
            return t.API.Date.parseUTCDate.apply(t.API.Date, f.call(arguments, 1));
        }
    }, Object.defineProperties(t.API.Date, {
        now: {
            get: function() {
                return Date.now();
            }
        }
    }), t.API.Date.parseUTCDate = function(t) {
        if ("string" == typeof t) {
            var e = /^(\d{4})[\-\/](\d{2})[\-\/](\d{2})(?:T|\s)(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z?$/i.exec(t);
            if (e) return new Date(Date.UTC(+e[1], +e[2] - 1, +e[3], +e[4], +e[5], +e[6]));
        } else if ("date" == A(t)) return new Date(t);
        return null;
    }, t.API.Date.getScriptTimeDiff = function(e) {
        var r;
        if ("string" == typeof e ? r = t.API.Date.parseUTCDate(e) : "object" == typeof e && typeof e.scriptUploadTimestamp !== n && (r = t.API.Date.parseUTCDate(e.scriptUploadTimestamp)), 
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
    }, t.jQueryExtensions = {}, t.jQueryExtensions.addCrossOriginSupport = function(e, r) {
        n != typeof GM_xmlhttpRequest && (e || (e = t.jQuery)) && !0 !== e.jModCrossOriginSupport && (e.ajaxTransport(r || "* text html xml json", function(r, a, c) {
            var i = !0;
            try {
                i = t.Config("jQueryExtensions.CrossOrigin");
            } catch (u) {}
            if (n != typeof GM_xmlhttpRequest && i) {
                var s = (e || $ || t).extend, o = s(!0, {}, r, a), l = {
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
                        var e = (a.dataType || "").toLowerCase(), t = {
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
                        for (key in l) n != typeof o[key] && (t[l[key]] = o[key]);
                        !1 === o.async && (t.synchronous = !0), GM_xmlhttpRequest(t);
                    },
                    abort: function() {}
                };
            }
        }), e.extend({
            jModCrossOriginSupport: !0
        }));
    }, t.Config.Tooltip = t.extend({
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
    }, t.Config.Tooltip || {});
    var it = "Tooltip.containerId", U = "Tooltip.attributeNames.id", H = "Tooltip.attributeNames.tooltip", at = "Tooltip.attributeNames.placement", Vt = "Tooltip.attributeNames.margin", R = "Tooltip.classNames.tooltipTarget", tt = "Tooltip.classNames.tooltip", l = t.Tooltip = function(e, n) {
        M(e) && t.Tooltip.AddTooltipsToElement.apply(t.Tooltip, arguments);
    }, Q;
    Object.defineProperties(l, {
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
                return l.Initialized || l.init(), Q || (Q = document.getElementById(a(it))), Q;
            },
            set: function(e) {
                Q = e;
            }
        },
        get: {
            value: function(e) {
                var n, r, o, t = a(U);
                if (M(e)) return I(e, a(tt)) ? document.querySelector("." + a(R) + " [" + t + '="' + e.id + '"]') : (I(e, a(R)) && e.hasAttribute(t) ? n = e.getAttribute(t) : this.TooltipContainer && null !== (o = this.TooltipContainer.querySelector("." + a(R) + " [" + t + "]")) && (n = o.getAttribute(t)), 
                document.getElementById(n));
                if ("string" == typeof e) {
                    if (null !== (r = document.getElementById(e))) return r;
                } else if ("number" == typeof e && this.TooltipContainer && this.TooltipContainer.childElementCount > e) return tooltipContainer.children[e];
                return null;
            }.bind(l)
        }
    });
    var W = 200;
    l.MoveTooltip = function(e, t, n) {
        "top" in n ? t.style.top = n.top : "bottom" in n && (t.style.bottom = n.bottom), 
        "left" in n ? t.style.left = n.left : "right" in n && (t.style.right = n.right);
        var r = a("Tooltip.attributeNames.margin");
        e.hasAttribute(r + "-top") && (t.style.marginTop = e.getAttribute(r + "-top")), 
        e.hasAttribute(r + "-left") && (t.style.marginLeft = e.getAttribute(r + "-left")), 
        e.hasAttribute(r + "-bottom") && (t.style.marginBottom = e.getAttribute(r + "-bottom")), 
        e.hasAttribute(r + "-right") && (t.style.marginRight = e.getAttribute(r + "-right"));
    }, l.MoveTooltipToTarget = function(i, o, c) {
        var t, n, r, u, f;
        if (I(i, a(tt))) t = i; else {
            if (!i.hasAttribute(a(U))) return;
            t = document.getElementById(i.getAttribute(a(U)));
        }
        var s = o.getAttribute(a(at)) || "top", e = At(o);
        switch (s) {
          case "left-top":
            n = parseInt(e.top), r = e.left - parseInt(t.offsetWidth), l.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "left-bottom":
            n = e.top + e.height - parseInt(t.offsetHeight), r = e.left - parseInt(t.offsetWidth), 
            l.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "left":
            n = e.top + parseInt(e.height / 2) - parseInt(parseInt(t.offsetHeight) / 2), r = e.left - parseInt(t.offsetWidth), 
            l.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "right-top":
            n = parseInt(e.top), r = e.left + e.width, l.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "right-bottom":
            n = e.top + e.height - parseInt(t.offsetHeight), r = e.left + e.width, l.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "right":
            n = e.top + parseInt(e.height / 2) - parseInt(t.offsetHeight / 2), r = e.left + e.width, 
            l.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "bottom-left":
            n = e.top + e.height, r = e.left, l.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "bottom-right":
            n = e.top + e.height, r = e.left + e.width - parseInt(t.offsetWidth), l.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "bottom":
            n = e.top + e.height, r = e.left + parseInt(e.width / 2) - parseInt(parseInt(t.offsetWidth) / 2), 
            l.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "top-left":
            n = e.top - parseInt(t.offsetHeight), r = e.left, l.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "top-right":
            n = e.top - parseInt(t.offsetHeight), r = e.left + e.width - parseInt(t.offsetWidth), 
            l.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "top":
          default:
            n = e.top - parseInt(t.offsetHeight), r = e.left + parseInt(e.width / 2) - parseInt(parseInt(t.offsetWidth) / 2), 
            l.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
        }
    }, l.HideAllExcept = function(i) {
        for (var r = [], e, o = t.$$(".jmod-na ." + a(tt) + ".in"), n = 0; n < o.length; n++) e = o[n], 
        "block" == e.style.display && e !== i && (N(e, "in"), r.push(e));
        setTimeout(function(t) {
            for (var e = 0; e < t.length; e++) I(t[e], "in") || (t[e].style.display = "none");
        }, W, r);
    }, l.handler = {
        mouseenter: function(i) {
            var n = this.getAttribute(a(U)), r = this.getAttribute(a(H)), e = this.getAttribute(a(at)) || "top", o = l.TooltipContainer;
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
            var t = document.getElementById(n);
            t || (t = g({
                type: "div",
                id: n,
                className: a(tt) + " " + e + " fade slow",
                style: {
                    display: "none"
                },
                innerHTML: [ '<div class="tooltip-arrow"></div>', '<div class="tooltip-inner">' + r + "</div>" ]
            }), t.addEventListener("mouseenter", function(t) {
                var e = p.getComputedStyle(this, null).getPropertyValue("opacity");
                e > .2 && (C(this, "in"), l.HideAllExcept(this));
            }), t.addEventListener("mouseleave", function(e) {
                var t = p.getComputedStyle(this, null).getPropertyValue("opacity");
                N(this, "in"), setTimeout(function(e) {
                    I(e, "in") || (e.style.display = "none");
                }, W, this);
            }), t.addEventListener("click", function(e) {
                N(this, "in"), setTimeout(function(e) {
                    I(e, "in") || (e.style.display = "none");
                }, W, this);
            }), o.appendChild(t)), l.HideAllExcept(t), t.style.display = "block", setTimeout(function(t, e) {
                C(e, "in"), l.MoveTooltipToTarget(e, t);
            }, 1, this, t);
        },
        mouseleave: function(t) {
            var e = l.get(this);
            e && (N(e, "in"), setTimeout(function(e) {
                I(e, "in") || (e.style.display = "none");
            }, W, e));
        },
        scroll: function(i) {
            var e, o, n;
            e = Lt(this, "jmod-na") ? t.$$("." + a(R) + "[" + a(H) + "]", this) : t.$$(".jmod-na ." + a(R) + "[" + a(H) + "]", this);
            for (var r = 0; r < e.length; r++) o = e[r].getAttribute(a(U)), n = document.getElementById(o), 
            n && "block" == n.style.display && l.MoveTooltipToTarget(n, e[r]);
        }
    }, l.getTooltipsFromElement = function(o) {
        for (var i, r = [], n = t.$$("." + a(R) + "[" + a(H) + "]", o), e = 0; e < n.length; e++) n[e].getAttribute(a(H)) && r.push(n[e]);
        return r;
    }, l.AddTooltipsToElement = function(r) {
        for (var n = l.getTooltipsFromElement(r), e = 0; e < n.length; e++) {
            n[e].setAttribute(a(U), "jmod-tooltip-" + l.Count++), n[e].addEventListener("mouseenter", l.handler.mouseenter), 
            n[e].addEventListener("mouseleave", l.handler.mouseleave);
            for (var t = n[e]; t.parentElement; ) t = t.parentElement, t.hasAttribute("data-jmod-scroll-event") || (t.setAttribute("data-jmod-scroll-event", !0), 
            t.addEventListener("scroll", l.handler.scroll));
        }
        r.addEventListener("scroll", l.handler.scroll);
    }, l.init = function() {
        l.Initialized = !0;
        var e = document.getElementById(a(it));
        null == e && (e = document.createElement("div"), e.id = a(it), e.className = "jModTooltipContainer jmod-na jmod-fa", 
        document.body.appendChild(e), Q = e);
    }, t.CSS = ".jmod-na .fade.slow {transition: opacity " + (W / 1e3).toFixed(2) + "s linear 0s;}", 
    t.Config.Notifications = {
        enabled: !0
    };
    var S = t.Notification = function(e, n) {
        if (!a("Notifications.enabled")) return !1;
        if (t.Notification.Initialized || t.Notification.init(), "string" == typeof e) switch (e.toLowerCase()) {
          case "get":
          case "getelement":
            return t.Notification.getElement.apply(t.Notification, f.call(arguments, 1));
            break;

          case "getid":
          case "getelementid":
            return t.Notification.getElementId.apply(t.Notification, f.call(arguments, 1));
            break;

          case "updatenotification":
            return t.Notification.UpdateNotification.apply(t.Notification, f.call(arguments, 1));
        } else "object" == typeof e && e.type && S.Types.create(e.type.toLowerCase(), e);
    };
    S.Types = {
        types: {},
        add: function(e) {
            this.types[e.name] = e;
        },
        callMethod: function(e, t) {
            return n !== typeof this.types[e] && "function" == typeof this.types[e][t] ? this.types[e][t].apply(this.types[e], f.call(arguments, 2)) : o;
        },
        create: function(e, t) {
            this.callMethod(e, "create", t);
        },
        init: function() {
            for (var e in this.types) this.callMethod(e, "init");
        }
    }, +function(e) {
        var r = "jModSmallNotificationsWrapper";
        e.LargeCount = 0, Object.defineProperty(e, "CurrentLargeCount", {
            get: function() {
                var e = document.getElementById(r);
                return t.$$("div[data-jmod-large-notification]", e).length;
            }
        }), t.Notification.Types.add({
            name: "large",
            getWrapper: function() {
                return document.getElementById(r);
            },
            generateElement: function(t) {
                var o = {
                    type: "div",
                    className: "jModLargeNotification bigBox animated fadeIn fast",
                    style: {},
                    attributes: {
                        "data-jmod-notification": e.count,
                        "data-jmod-notification-type": "large",
                        "data-jmod-large-notification": e.LargeCount
                    }
                };
                if (t.background) {
                    var r;
                    "string" == typeof t.background ? (r = F(t.background)) && n != typeof t["background-opacity"] && (r.a = parseFloat(t["background-opacity"])) : "object" == typeof t.background && n != typeof t.background.color && (r = F(t.background.color)) && n != typeof t.background.opacity && (r.a = parseFloat(t.background.opacity)), 
                    r && (o.style.backgroundColor = "rgba(" + r.r + ", " + r.g + ", " + r.b + ", " + (isNaN(parseFloat(r.a)) ? "0.8" : parseFloat(r.a)) + ")");
                }
                var a = {
                    type: "div",
                    className: "",
                    innerHTML: [ {
                        type: "i",
                        id: "jModbtnClose" + e.LargeCount,
                        className: "botClose fa fa-times",
                        EventListeners: {
                            click: function(t) {
                                e.close(t.target);
                            }
                        }
                    } ],
                    style: {}
                };
                return typeof t.title !== n && a.innerHTML.push({
                    type: "span",
                    innerHTML: t.title
                }), a.innerHTML.push({
                    type: "div",
                    innerHTML: t.body
                }), typeof t.icon !== n && a.innerHTML.push({
                    type: "div",
                    className: "jmod-na bigboxicon",
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
                }), o.innerHTML = a, g(o);
            },
            create: function(e) {
                var n = this.getWrapper(), r = this.generateElement(e);
                n.appendChild(r), t.Notification.Events.addAll(e, t.Notification.count), t.Notification.count++, 
                t.Notification.LargeCount++;
            },
            close: function(t, n) {
                e.Events.fire("onBeforeClose", n, null, t), N(t, "fadeIn"), C(t, "fadeOut"), setTimeout(function(t, n) {
                    t.style.display = "none", e.Events.fire("onAfterClose", n, null, t), t.parentElement.removeChild(t);
                }, 1e3, t, n);
            },
            init: function() {
                var n = e("getElement", "notificationsWrapper"), t = this.getWrapper();
                null == t && (t = document.createElement("div"), t.id = r, t.className = "jModNotifications", 
                n.appendChild(t));
            }
        });
    }(t.Notification), +function(e) {
        var r = "jModSmallNotificationsWrapper";
        e.SmallCount = 0, Object.defineProperty(e, "CurrentSmallCount", {
            get: function() {
                var e = document.getElementById(r);
                return t.$$("div[data-jmod-small-notification]", e).length;
            }
        }), t.Notification.Types.add({
            name: "small",
            getWrapper: function() {
                return document.getElementById(r);
            },
            generateElement: function(r) {
                var u = 25, d = e.CurrentSmallCount;
                if (d > 0) {
                    for (var p = 25 * d, m = e("getElement", "notificationsSmallWrapper"), f = m.querySelectorAll("div[data-jmod-small-notification]"), c = 0; c < f.length; c++) p += parseInt(f[c].offsetHeight);
                    u += p;
                }
                var l = {
                    type: "div",
                    className: "jModSmallNotification SmallBox animated fadeIn",
                    style: {
                        top: u + "px"
                    },
                    innerHTML: [],
                    attributes: {
                        "data-jmod-notification": e.count,
                        "data-jmod-notification-type": "small",
                        "data-jmod-small-notification": e.SmallCount
                    },
                    EventListeners: {
                        click: function(r) {
                            for (var n = 0, e = r.target; !e.hasAttribute("data-jmod-small-notification") && null != e && 20 > n; ) e = e.parentElement, 
                            n++;
                            if (null != e) {
                                var a = parseInt(e.getAttribute("data-jmod-notification")), o = parseInt(e.getAttribute("data-jmod-small-notification"));
                                t.Notification.close(e);
                            }
                        }
                    }
                }, a = F("rgba(50, 118, 177, 0.8)"), o;
                r.background && ("object" == typeof r.background ? (n != typeof r.background.color && (o = F(r.background.color)) && (null == o.a && (o.a = a.a), 
                a = o), n != typeof r.background.opacity && (a.a = r.background.opacity)) : (o = F(r.background)) && (null == o.a && (o.a = a.a), 
                a = o)), a && (l.style.backgroundColor = "rgba(" + a.r + ", " + a.g + ", " + a.b + ", " + a.a + ")");
                var i = {
                    type: "div",
                    className: "",
                    innerHTML: [],
                    style: {}
                };
                if (typeof r.footer === n) i.className += " textoFull"; else {
                    i.className += " textoFoto";
                    var s = document.createElement("div");
                    s.className = "foto", M(r.icon) ? s.appendChild(r.icon) : s.innerHTML = '<i class="fa ' + r.icon + " " + (r.iconAnimation || "bounce") + ' animated"> </i>', 
                    l.innerHTML.push(s);
                }
                return typeof r.title !== n && i.innerHTML.push({
                    type: "span",
                    innerHTML: r.title
                }), i.innerHTML.push({
                    type: "p",
                    innerHTML: r.body
                }), typeof r.icon !== n && i.innerHTML.push({
                    type: "div",
                    className: "miniIcono",
                    style: {
                        backgroundColor: "transparent"
                    },
                    innerHTML: {
                        type: "i",
                        className: "miniPic fa " + r.icon + " " + (r.iconAnimation || "swing") + " animated",
                        style: {
                            color: "#fff"
                        }
                    }
                }), l.innerHTML.push(i), g(l);
            },
            create: function(e) {
                var n = this.getWrapper(), r = this.generateElement(e);
                n.appendChild(r), t.Notification.Events.addAll(e, t.Notification.count), t.Notification.count++, 
                t.Notification.SmallCount++;
            },
            close: function(t, a) {
                e.Events.fire("onBeforeClose", a, null, t);
                var r = parseInt(t.style.top), n = t;
                for (N(t, "fadeIn"), C(t, "fast"), C(t, "fadeOut"); null != n.nextElementSibling && n.nextElementSibling.hasAttribute("data-jmod-small-notification"); ) n = n.nextElementSibling, 
                C(n, "transitionUp"), setTimeout(function(e, t) {
                    e.style.top = t + "px";
                }, 0, n, r), r = r + parseInt(n.offsetHeight) + 25;
                setTimeout(function(t, n) {
                    t.style.display = "none", e.Events.fire("onAfterClose", n, null, t), t.parentElement.removeChild(t);
                }, 1e3, t, a);
            },
            init: function() {
                var n = e("getElement", "notificationsWrapper"), t = this.getWrapper();
                null == t && (t = document.createElement("div"), t.id = r, t.className = "jModSmallNotifications", 
                n.appendChild(t));
            }
        });
    }(t.Notification), +function(e) {
        var r = "jModFillNotificationsWrapper";
        e.FillCount = 0, Object.defineProperty(e, "CurrentFillCount", {
            get: function() {
                var e = document.getElementById(r);
                return t.$$("div[data-jmod-fill-notification]", e).length;
            }
        }), t.Notification.Types.add({
            name: "fill",
            getWrapper: function() {
                return document.getElementById(r);
            },
            generateElement: function(r) {
                var i = {
                    type: "div",
                    className: "jModFillNotification",
                    style: {
                        backgroundColor: "rgba(0, 0, 0, 0.8);"
                    },
                    innerHTML: [ {
                        type: "div",
                        className: "MessageBoxMiddle",
                        style: {},
                        innerHTML: [ {
                            type: "span",
                            className: "MsgTitle",
                            innerHTML: r.title
                        }, {
                            type: "p",
                            className: "pText",
                            innerHTML: r.body
                        } ]
                    } ]
                };
                if (r.background) {
                    var a;
                    "string" == typeof r.background ? (a = F(r.background)) && n != typeof r["background-opacity"] && (a.a = parseFloat(r["background-opacity"])) : "object" == typeof r.background && n != typeof r.background.color && (a = F(r.background.color)) && n != typeof r.background.opacity && (a.a = parseFloat(r.background.opacity)), 
                    a && (i.style.backgroundColor = "rgba(" + a.r + ", " + a.g + ", " + a.b + ", " + (a.a || 0 === parseFloat(a.a) ? parseFloat(a.a) : "0.8") + ")");
                }
                var s = {
                    type: "div",
                    className: "MessageBoxButtonSection",
                    style: {},
                    innerHTML: [ {
                        type: "button",
                        className: "btn btn-default btn-sm botTempo",
                        innerHTML: "Close",
                        EventListeners: {
                            click: function(e) {
                                this === e.target && t.Notification.close(e.target);
                            }
                        }
                    } ]
                };
                i.innerHTML[0].innerHTML.push(s);
                var l = {
                    type: "div",
                    className: "jModFillNotificationContainer animated fadeIn fast",
                    innerHTML: [ i ],
                    attributes: {
                        "data-jmod-notification": e.count,
                        "data-jmod-notification-type": "fill",
                        "data-jmod-fill-notification": e.FillCount
                    },
                    EventListeners: {
                        click: function(e) {
                            return this === e.target ? (t.Notification.close(this), P(e), !1) : o;
                        }
                    }
                };
                return g(l);
            },
            create: function(e) {
                var n = this.getWrapper(), r = this.generateElement(e);
                n.appendChild(r), t.Notification.Events.addAll(e, t.Notification.count), t.Notification.count++, 
                t.Notification.FillCount++;
            },
            close: function(t, n) {
                e.Events.fire("onBeforeClose", n, null, t), N(t, "fadeIn"), C(t, "fadeOut"), setTimeout(function(t, n) {
                    t.style.display = "none", e.Events.fire("onAfterClose", n, null, t), t.parentElement.removeChild(t);
                }, 1e3, t, n);
            },
            init: function() {
                var n = e("getElement", "notificationsWrapper"), t = this.getWrapper();
                null == t && (t = document.createElement("div"), t.id = r, t.className = "jModFillNotifications", 
                t.style.position = "absolute", n.appendChild(t));
            }
        });
    }(t.Notification), S.UpdateNotification = function(s) {
        var e = merge({
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
        null == e.script_name && (e.script_name = a("script.script_name"));
        var l = e.title.replace("%SCRIPTNAME%", e.script_name).replace("%VERSION%", e.version).replace("%TIME%", e.time), c = e.body.replace("%SCRIPTNAME%", e.script_name).replace("%VERSION%", e.version).replace("%TIME%", e.time);
        e.install.href && null != e.install.href && "" != e.install.href || (e.install.href = a([ "script.script_info.jModdownloadURL", "script.script_info.downloadURL" ]), 
        typeof e.install.href === n && (e.install.href = "javascript:void(0);"));
        var t = document.createElement("a");
        t.setAttribute("href", e.install.href), null != e.install.target && t.setAttribute("target", e.install.target), 
        t.className = "btn btn-success btn-sm", t.innerHTML = e.install.text, "function" == typeof e.install.onClick && t.addEventListener("click", e.install.onClick), 
        e.visit.href && null != e.visit.href && "" != e.visit.href || (e.visit.href = typeof a("script.script_info.homepage") !== n ? a("script.script_info.homepage") : "http://myuserjs.org/script/" + a("script.username") + "/" + a("script.script_name"));
        var r = document.createElement("a");
        r.setAttribute("href", e.visit.href), null != e.visit.target && r.setAttribute("target", e.visit.target), 
        r.className = "btn btn-warning btn-sm", r.innerHTML = e.visit.text, "function" == typeof e.visit.onClick && r.addEventListener("click", e.visit.onClick);
        var i = document.createElement("a");
        i.setAttribute("href", "javascript:void(0);"), i.className = "btn btn-danger btn-sm", 
        i.innerHTML = "Close";
        var o = document.createElement("p");
        o.className = "text-align-right", o.appendChild(t), o.appendChild(r), o.appendChild(i), 
        S({
            title: l,
            body: c,
            footer: o,
            icon: e.icon,
            iconAnimation: e.iconAnimation,
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
    }, S.Events = new ct([ "onBeforeClose", "onAfterClose" ]), S.close = function(e) {
        var i = S("getElement", "notificationsWrapper"), n, a, o, r = "data-jmod-notification";
        if ("number" == typeof e) a = e, n = t.$("div[" + r + '="' + e + '"]', i); else {
            if (!M(e)) return;
            if (e.hasAttribute(r)) n = e; else if (!(n = t.$("div[" + r + "]", e)) && !(n = t.Element.findParentWithAttribute(e, r))) return;
            a = parseInt(n.getAttribute(r));
        }
        (o = n.getAttribute("data-jmod-notification-type")) && S.Types.callMethod(o, "close", n, a);
    }, S.count = 0, S.Initialized = !1, S.init = function() {
        if (!a("Notifications.enabled")) return !1;
        S.Initialized = !0;
        var t = document.getElementsByTagName("head")[0], n = document.getElementsByTagName("body")[0], e = S("getElement", "notificationsWrapper");
        null == e && (e = document.createElement("div"), e.id = S("getElementId", "notificationsWrapper"), 
        e.className = "jModNotificationsFullWrapper jmod-na jmod-fa", document.body.appendChild(e)), 
        S.Types.init();
    }, t.CSS = '#jModSmallNotificationsWrapper,#jModNotificationsWrapper,.jmod-na .SmallBox span,.jmod-na .bigBox span{font-family:"Open Sans",Arial,Helvetica,sans-serif;}.jmod-na .jModFillNotification{top:35%;color:#FFF;position:relative;width:100%;background-color:rgba(0,0,0,0.8);padding:20px;z-index:100001;}.jmod-na .jModFillNotificationContainer{width:100%;height:100%;position:fixed;top:0px;left:0px;background:none repeat scroll 0% 0% rgba(0,0,0,0.6);z-index:100000;}', 
    t.Config.Tabs = t.extend({
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
    }, t.Config.Tabs || {});
    var m = t.Tabs = function(e) {};
    m.Initialized = !1, m.GroupCount = 0;
    var w = m.att = {}, lt = m.cn = {};
    Object.defineProperties(m.att, {
        li: {
            get: function() {
                return a("Tabs.att.li");
            }
        },
        ul: {
            get: function() {
                return a("Tabs.att.ul");
            }
        },
        ct: {
            get: function() {
                return a("Tabs.att.ct");
            }
        },
        pane: {
            get: function() {
                return a("Tabs.att.pane");
            }
        }
    }), Object.defineProperties(m.cn, {
        nav: {
            get: function() {
                return a("Tabs.cn.nav");
            }
        },
        ct: {
            get: function() {
                return a("Tabs.cn.ct");
            }
        }
    }), m.Events = new ct([ "onBeforeShow", "onAfterShow" ]), m.handler = {
        click: function(n) {
            var e = n.target, l = e.parentElement;
            if (this.contains(e) && "A" == e.nodeName) {
                var r = this.parentElement.querySelector("." + lt.ct), a = x(e, "href");
                if (a) {
                    var o = r.querySelector(".tab-pane.active"), i = this.querySelector("li.active"), t = r.querySelector(a);
                    if (t) {
                        var s = x(this, w.ul);
                        !1 !== m.Events.fire("onBeforeShow", parseInt(s), this, [ e, t ]) && (i && N(i, "active"), 
                        o && N(o, "active"), C(l, "active"), C(t, "active"), m.Events.fire("onAfterShow", parseInt(s), this, [ e, t ]));
                    }
                }
                P(n);
            }
        }
    }, m.load = function(e) {
        var r, n, s;
        if (M(e)) n = e; else {
            if ("object" != typeof e || !e.target) return;
            n = e.target, s = e.EventListeners;
        }
        if (r = I(n, "tabbable") ? [ n ] : t.$$("div.tabbable", n)) for (var a = 0; a < r.length; a++) {
            var o = r[a].querySelector(".nav." + lt.nav), i = r[a].querySelector("." + lt.ct);
            o && i && (o.setAttribute(w.ul, m.GroupCount), i.setAttribute(w.ct, m.GroupCount), 
            "object" == typeof e && m.Events.addAll(e, m.GroupCount), o.addEventListener("click", m.handler.click), 
            m.GroupCount++);
        }
    }, m.makeNavElement = function(e) {
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
        return t.attributes[w.li] = e.index || -1, t;
    }, m.makeContentElement = function(e) {
        var t = {
            type: "div",
            id: e.id,
            className: "container tab-pane " + (e.isActive || e.active ? "active " : "") + (e.className || e["class"] || ""),
            innerHTML: e.innerHTML || e.text || "",
            attributes: e.attributes || {}
        };
        return t.attributes[w.pane] = e.index || -1, t;
    }, m.show = function(e, n) {
        var a, o, r;
        if ("number" == typeof e && (e = document.querySelector("ul[" + w.ul + '="' + e + '"]')), 
        M(e)) {
            if (bt(e, w.li)) r = e; else if ("number" == typeof n) r = t.$$("li[" + w.li + "]", e)[n]; else if ("string" == typeof n) {
                for (o = t.$$("li[" + w.li + "]", e), a = 0; a < o.length; a++) if (o[a].innerHTML == n) {
                    r = o[a];
                    break;
                }
            } else M(n) && bt(n, w.li) && (r = n);
            if (r && M(r)) return ut(r.querySelector('a[data-toggle="tab"]'));
        }
    }, m.resize = function(e) {
        yt(e, _t);
    }, t.Config.Modal = t.extend({
        enabled: !0,
        cn: {
            container: "jModModalContainer"
        },
        id: {
            container: "jModModalContainer"
        }
    }, t.Config.Modal || {});
    var wt = "Modal.cn.container", pt = "Modal.id.container", u = t.Modal = function(e, l) {
        if (!a("Modal.enabled")) return !1;
        t.Modal.Initialized || t.Modal.init();
        try {
            if ("string" == typeof e) switch (e.toLowerCase()) {
              case "show":
              case "showmodal":
                return t.Modal.show.apply(t.Modal, f.call(arguments, 1));
                break;

              case "hide":
              case "hidemodal":
                return t.Modal.hide.apply(t.Modal, f.call(arguments, 1));
            } else if ("object" == typeof e) {
                var r = t.Modal.createModal(e), i = parseInt(x(r, "data-jmod-modal")), c = g({
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
                                return e.target === this ? (this.style.display = "none", N(document.body, "jmod-modal-open"), 
                                P(e), !1) : o;
                            }
                        }
                    }
                }), s = u.Container;
                return s && (s.appendChild(c), s.appendChild(r)), t.Modal.Modals[i] = {
                    index: i,
                    element: r,
                    lockScreen: e.lockScreen || !0,
                    data: e
                }, typeof e.features !== n && t.Modal.addJSFeatures(r, e.features), !0 === l && t.Modal.show(r), 
                r;
            }
        } catch (p) {
            j(p, "jMod.Modal");
        }
    }, K;
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
                return K ? K : K = document.getElementById(a(pt));
            },
            set: function(e) {
                K = e;
            }
        }
    });
    const Et = 150;
    u.getModal = function(e) {
        var t = document.querySelector('div[data-jmod-modal="' + e + '"]');
        return t ? t : typeof u.Modals[e] !== n ? u.Modals[e].element : null;
    }, u.addJSFeatures = function(e, n) {
        n.enableTabs && t.Tabs.load({
            target: e,
            onBeforeShow: function() {
                c.log("Tabs onBeforeShow: ", arguments);
            }
        }), n.enableTooltips && l(e);
    }, u.show = function(e, t, r) {
        try {
            if ("number" == typeof e && "number" != typeof t && (typeof r === n && typeof t !== n && (r = t), 
            t = e), (typeof e === n || null == e) && typeof t === n) return;
            if (typeof e !== n && null != e && "number" != typeof e || "number" != typeof t ? typeof e !== n && null != e && typeof t === n && (t = x(e, "data-jmod-modal")) : e = document.querySelector('div[data-jmod-modal="' + t + '"]'), 
            -1 != u.CurrentModal && u.CurrentModal != t && u.hide(), e) {
                var a = document.querySelector('div[data-jmod-modal-backdrop="' + t + '"]'), o = u.Events.fire("onBeforeShow", t, e, [ r || null ]);
                u.CurrentModal = t, C(document.body, "jmod-modal-open"), a.style.display = "block", 
                e.style.display = "block", setTimeout(function(e, t) {
                    C(t, "in"), C(e, "in");
                }, 1, e, a), setTimeout(function(e, t, n) {
                    u.Events.fire("onAfterShow", t, e, [ n || null ]);
                }, Et, e, t, r || null);
            }
        } catch (r) {
            j(r, "jMod.Modal.show");
        }
    }, u.hide = function(t, e, r) {
        try {
            if (typeof t === n && typeof e === n && -1 != u.CurrentModal && (e = u.CurrentModal, 
            t = u.getModal(u.CurrentModal)), "number" == typeof t && "number" != typeof e && (typeof r === n && typeof e !== n && (r = e), 
            e = t), typeof t === n && typeof e === n) return;
            if (M(t) || "number" != typeof e ? typeof t !== n && typeof e === n && (e = x(t, "data-jmod-modal")) : t = u.getModal(e), 
            t) {
                var a = document.querySelector('div[data-jmod-modal-backdrop="' + e + '"]'), o = u.Events.fire("onBeforeHide", e, t, [ r || null ]);
                u.CurrentModal = -1, N(document.body, "jmod-modal-open"), N(t, "in"), N(a, "in"), 
                setTimeout(function(e, t, n, r) {
                    e.style.display = "none", r.style.display = "none", u.Events.fire("onAfterHide", t, e, [ n || null ]);
                }, Et, t, e, r || null, a);
            }
        } catch (r) {
            j(r, "jMod.Modal.hide");
        }
    }, u.Events = new ct([ "onBeforeShow", "onAfterShow", "onBeforeHide", "onAfterHide" ]), 
    u.createModal = function(e) {
        var l = u.ModalCount++;
        u.Events.addAll(e, l);
        var f = g({
            type: "div",
            id: e.id || "jModModal-" + l,
            className: "modal fade " + (e.className || e["class"] || ""),
            style: "display: none;",
            attributes: {
                role: "dialog",
                tabindex: "-1",
                "data-jmod-modal": l
            },
            EventListeners: {
                click: {
                    capture: !1,
                    callback: function(e) {
                        if (e.target === this) {
                            var t = e.target, n = parseInt(x(t, "data-jmod-modal"));
                            return u.hide(t, n, e), P(e), !1;
                        }
                    }
                }
            }
        }), i = g({
            type: "div",
            className: "modal-dialog"
        });
        if (typeof e.style !== n) for (var c in e.style) i.style[c] = e.style[c];
        f.appendChild(i);
        var a = g({
            type: "div",
            className: "modal-content"
        });
        i.appendChild(a);
        var s = g({
            type: "div",
            className: "modal-header"
        });
        a.appendChild(s);
        var p = g({
            type: "div",
            className: "modal-body"
        });
        a.appendChild(p);
        var o = g({
            type: "div",
            className: "modal-footer"
        });
        a.appendChild(o), L(s, e.title);
        var y = g({
            type: "div",
            className: "yt-close-btn-wrapper",
            innerHTML: '<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-close-btn">',
            EventListeners: {
                click: {
                    capture: !1,
                    callback: function(e) {
                        var t = e.target.parentElement.parentElement.parentElement.parentElement.parentElement, n = parseInt(x(t, "data-jmod-modal"));
                        return u.hide(t, n, e);
                    }
                }
            }
        });
        if (s.appendChild(y), L(p, e.body), L(o, e.footer), typeof e.buttons !== n) for (var d in e.buttons) try {
            var m = t.extend(!0, {
                type: "button",
                text: "button"
            }, e.buttons[d]), r = g(m);
            r && (I(r, "btn") || C(r, "brn"), /btn\-(default|primary|success|info|warning|danger)/i.test(r.className) || C(r, "btn-default"), 
            o.appendChild(r));
        } catch (b) {
            j(b, "jMod.Modal.createModal", "footer buttons");
        }
        var h = g({
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
                            var t = e.target.parentElement.parentElement.parentElement.parentElement, n = parseInt(x(t, "data-jmod-modal"));
                            return u.hide(t, n, e), P(e), !1;
                        }
                    }
                }
            }
        });
        return o.appendChild(h), f;
    }, u.init = function() {
        u.Initialized = !0;
        var e = u.Container;
        null == e && (e = document.createElement("div"), e.id = a(pt), e.className = "jmod-na jmod-fa " + a(wt), 
        document.body.appendChild(e));
    }, t.CSS = ".jmod-na .tabbable > .nav.nav-tabs > li > a,.jmod-na .tabbable > .nav.nav-tabs > li > a:hover,.jmod-na .tabbable > .nav.nav-tabs > li > a:active{text-decoration:none;}", 
    t.Config.Settings = t.extend({
        enabled: !0,
        cn: {
            modal: "jModSettings"
        },
        id: {
            modal: "jModSettingsModal"
        }
    }, t.Config.Settings || {});
    var zt = "Settings.id.modal", Pt = "Settings.cn.modal", i = t.Settings = function(e, n) {
        if (!a("Settings.enabled")) return !1;
        if (t.Settings.Initialized || t.Settings.init(), "string" == typeof e) switch (e.toLowerCase()) {
          case "":        } else "object" == typeof e && (i._data = e, t.Settings.__storedData = o, 
        t.Settings.settingsModalElement = t.Settings.MakeSettingsModal(e), i.PrefTypes.onChange(), 
        (p || s).addEventListener("resize", t.Settings.onResize, !1), t.Settings.onResize());
    };
    i.Initialized = !1, i.getDefault = function(n) {
        var t = 0, e = i._data;
        if (e && (e = e.settings)) for (t; t < e.length; t++) if (e[t].name == n) return e[t]["default"];
    }, i.get = function(e, r) {
        var t = i._storedData;
        return n === typeof e ? t : t && t[e] !== o ? t[e] : 1 == r ? o : i.getDefault(e);
    }, i.set = function(t, n) {
        var e = i._storedData || {};
        e[t] = n, i._storedData = e;
    }, i.clear = function() {
        i._storedData = {};
    }, Object.defineProperties(i, {
        _data: {
            value: {},
            writable: !0,
            enumerable: !1
        },
        __storedData: {
            value: o,
            enumerable: !1,
            writable: !0,
            configurable: !0
        },
        _storedData: {
            get: function() {
                if (typeof i.__storedData !== n) return i.__storedData;
                var e = t.getValue("Settings_" + a("script.script_name"));
                return e ? JSON.parse(e) : o;
            },
            set: function(e) {
                i.__storedData = e, t.setValue("Settings_" + a("script.script_name"), JSON.stringify(e));
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
                return n !== typeof i._settingsModalElement && null != i._settingsModalElement ? i._settingsModalElement : i._settingsModalElement = t.$(".jModSettings");
            },
            set: function(e) {
                i._settingsModalElement = e;
            },
            enumerable: !0
        }
    }), i.PrefTypes = {
        _types: {},
        _call: function(t, e, r) {
            return typeof this._types[e] !== n && "function" == typeof this._types[e][t] ? this._types[e][t].apply(this._types[e], f.call(arguments, 2)) : o;
        },
        add: function(e, t) {
            this._types[e] = t;
        },
        make: function(e, t) {
            return this._call("make", e, t);
        },
        getValue: function(e) {
            var n = t.$('#jModSettingsModal [name="' + e.name + '"]');
            return n ? this._call("getValue", e.type, n, e) : o;
        },
        getValueByName: function(n) {
            var t, e = 0;
            try {
                t = i._data.settings;
            } catch (r) {
                return;
            }
            for (e; e < t.length; e++) if (t[e].name == n) return this.getValue(t[e]);
        },
        getDataByName: function(n) {
            var t, e = 0;
            try {
                t = i._data.settings;
            } catch (r) {
                return;
            }
            for (e; e < t.length; e++) if (t[e].name == n) return t[e];
        },
        setValue: function(e, r) {
            var n = t.$('#jModSettingsModal [name="' + e.name + '"]');
            return n ? this._call("setValue", e.type, n, e, r) : o;
        },
        enable: function(r) {
            var e, a, s, n = 0;
            if ("object" == typeof r) e = r; else if ("string" == typeof r) {
                try {
                    a = i._data.settings;
                } catch (l) {
                    return;
                }
                for (n; n < a.length; n++) if (a[n].name == r) {
                    e = a[n];
                    break;
                }
            }
            return e ? (s = t.$('#jModSettingsModal [name="' + e.name + '"]'), s ? this._call("enable", e.type, s, e) : o) : o;
        },
        disable: function(r) {
            var e, a, s, n = 0;
            if ("object" == typeof r) e = r; else if ("string" == typeof r) {
                try {
                    a = i._data.settings;
                } catch (l) {
                    return;
                }
                for (n; n < a.length; n++) if (a[n].name == r) {
                    e = a[n];
                    break;
                }
            }
            return e ? (s = t.$('#jModSettingsModal [name="' + e.name + '"]'), s ? this._call("disable", e.type, s, e) : o) : o;
        },
        onChange: function(f, m) {
            var r, a, c, s, l, o = !0, d, p, u = !1, e = 0;
            try {
                r = i._data.settings;
            } catch (y) {
                return;
            }
            for (e; e < r.length; e++) if (o = !0, r[e].depend && ("function" == typeof r[e].depend || n == typeof f || n !== typeof r[e].depend[f])) {
                if ("function" == typeof r[e].depend) p = t.$('#jModSettingsModal [name="' + r[e].name + '"]'), 
                o = r[e].depend(p, r[e]); else for (c in r[e].depend) {
                    a = r[e].depend[c], d = typeof a;
                    var g = i.PrefTypes.getDataByName(c);
                    try {
                        u = 1 == i.PrefTypes._types[g.type].multiValue;
                    } catch (y) {
                        u = !1;
                    }
                    switch (f == c ? s = m : n == typeof (s = this.getValueByName(c)) && (s = i.get(c)), 
                    u && (s = s.split(",")), d) {
                      case "function":
                        o = a(t.$('#jModSettingsModal [name="' + r[e].name + '"]'), r[e], s, g);
                        break;

                      case "object":
                        if ("array" == A(a)) if (u) {
                            for (l = 0; l < a.length; l++) if (-1 == s.indexOf(a[l])) {
                                o = !1;
                                break;
                            }
                        } else for (o = !1, l = 0; l < a.length; l++) if (a[l] == s) {
                            o = !0;
                            break;
                        }
                        break;

                      case "string":
                        if (u) {
                            for (a = a.split(","), l = 0; l < a.length; l++) if (-1 == s.indexOf(a[l])) {
                                o = !1;
                                break;
                            }
                        } else s != a && (o = !1);
                        break;

                      case "number":
                        u ? s.length < a && (o = !1) : parseInt(s) != parseInt(a) && (o = !1);
                    }
                    if (!o) break;
                }
                o ? i.PrefTypes.enable(r[e]) : i.PrefTypes.disable(r[e]);
            }
        }
    }, i.getElementId = function(e) {
        switch (e.toLowerCase()) {
          case "settings":
          case "settingselement":
          case "settingmodalselement":
            return "jModSettingsModal";
        }
        return null;
    }, i.getElement = function(e) {
        var t = i.getElementId(e);
        return document.getElementById(null != t ? t : e);
    }, i.PrefTypes.add("select", {
        make: function(e) {
            var c = e.description || e.name, s = e["default"] || null, l = i.get(e.name), a = l || s, o = [];
            for (var t in e.options) o.push({
                type: "option",
                innerHTML: e.options[t],
                attributes: {
                    value: t,
                    selected: a && a == t ? !0 : null
                }
            });
            var r = {
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
                        "data-jmod-settings-pref-default": e["default"] || null,
                        "data-jmod-settings-pref-type": "select"
                    },
                    EventListeners: {
                        change: function(e) {
                            i.PrefTypes.onChange(e.target.getAttribute("name"), e.target.value);
                        }
                    }
                }
            };
            return n == typeof e.tooltip || n == typeof e.tooltip.innerHTML && n == typeof e.tooltip.text || (r.innerHTML = k(r.innerHTML, e.tooltip)), 
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
    }), i.PrefTypes.add("checkbox", {
        multiValue: !0,
        make: function(e) {
            var u = e.description || e.name, s = e["default"] || "", l = i.get(e.name), r = l || s;
            "object" != typeof r && (r = r.split(","));
            var o = [];
            for (var t in e.options) {
                var a = {
                    type: "label",
                    className: "checkbox-inline",
                    innerHTML: [ {
                        type: "input",
                        className: "checkbox",
                        attributes: {
                            name: e.name + "-o",
                            type: "checkbox",
                            value: t
                        },
                        checked: -1 != r.indexOf(t) ? !0 : !1,
                        EventListeners: {
                            CheckboxStateChange: function(t) {
                                var e = t.target.parentElement.parentElement.getAttribute("name"), n = i.PrefTypes.getValueByName(e);
                                i.PrefTypes.onChange(e, n);
                            }
                        }
                    }, {
                        type: "span",
                        innerHTML: e.options[t].label,
                        attributes: {}
                    } ],
                    attributes: {}
                };
                n == typeof e.options[t].tooltip || n == typeof e.options[t].tooltip.innerHTML && n == typeof e.options[t].tooltip.text || (a.innerHTML[1] = k(a.innerHTML[1], e.options[t].tooltip)), 
                o.push(a);
            }
            var c = {
                type: "div",
                className: "form-group pref-container",
                innerHTML: o,
                attributes: {
                    name: e.name
                }
            };
            return c;
        },
        getValue: function(a, o) {
            for (var n = [], r = t.$$("input:checked", a), e = 0; e < r.length; e++) n.push(r[e].value);
            return n.join(",");
        },
        setValue: function(t, a, n) {
            for (var r = n.split(","), e = 0; e < t.options.length; e++) t.options[e].checked = -1 != r.indexOf(x(t.options[e], "name")) ? !0 : !1;
            return !0;
        },
        enable: function(r, a) {
            for (var n = t.$$("input", r), e = 0; e < n.length; e++) n[e].hasAttribute("disabled") && n[e].removeAttribute("disabled");
        },
        disable: function(r, a) {
            for (var n = t.$$("input", r), e = 0; e < n.length; e++) n[e].setAttribute("disabled", "disabled");
        }
    }), i.PrefTypes.add("radio", {
        make: function(e) {
            var u = e.description || e.name, o = e["default"] || "", s = i.get(e.name), l = s || o, a = [];
            for (var t in e.options) {
                var r = {
                    type: "label",
                    className: "radio radio-inline",
                    innerHTML: [ {
                        type: "input",
                        className: "radiobox",
                        attributes: {
                            type: "radio",
                            value: t,
                            name: e.name + "-o"
                        },
                        checked: -1 != l.indexOf(t) ? !0 : !1,
                        EventListeners: {
                            RadioStateChange: function(t) {
                                var e = t.target.parentElement.parentElement.getAttribute("name"), n = i.PrefTypes.getValueByName(e);
                                i.PrefTypes.onChange(e, n);
                            }
                        }
                    }, {
                        type: "span",
                        innerHTML: e.options[t].label,
                        attributes: {}
                    } ],
                    attributes: {}
                };
                n == typeof e.options[t].tooltip || n == typeof e.options[t].tooltip.innerHTML && n == typeof e.options[t].tooltip.text || (r.innerHTML[1] = k(r.innerHTML[1], e.options[t].tooltip)), 
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
        getValue: function(e, t) {
            return e.querySelector("input:checked").value;
        },
        setValue: function(t, r, n) {
            for (var e = 0; e < t.options.length; e++) t.options[e].checked = x(t.options[e], "name") == n ? !0 : !1;
            return !0;
        },
        enable: function(r, a) {
            for (var n = t.$$("input", r), e = 0; e < n.length; e++) n[e].hasAttribute("disabled") && n[e].removeAttribute("disabled");
        },
        disable: function(r, a) {
            for (var n = t.$$("input", r), e = 0; e < n.length; e++) n[e].setAttribute("disabled", "disabled");
        }
    }), i.PrefTypes.add("toggle", {
        multiValue: !0,
        make: function(e) {
            var u = e.description || e.name, o = e["default"] || "", s = i.get(e.name), l = s || o, a = [];
            for (var t in e.options) {
                var r = {
                    type: "label",
                    className: "toggle " + (e.options[t].className || ""),
                    innerHTML: [ {
                        type: "input",
                        className: "radiobox",
                        attributes: {
                            type: "checkbox",
                            value: t,
                            name: e.name + "-o"
                        },
                        checked: -1 != l.indexOf(t) ? !0 : !1,
                        EventListeners: {
                            RadioStateChange: function(t) {
                                var e = t.target.parentElement.parentElement.getAttribute("name"), n = i.PrefTypes.getValueByName(e);
                                i.PrefTypes.onChange(e, n);
                            }
                        }
                    }, {
                        type: "i",
                        className: "",
                        attributes: {
                            "data-jmod-swchon-text": e.options[t].on || "ON",
                            "data-jmod-swchoff-text": e.options[t].off || "OFF"
                        }
                    }, e.options[t].label ],
                    attributes: {}
                };
                n == typeof e.options[t].tooltip || n == typeof e.options[t].tooltip.innerHTML && n == typeof e.options[t].tooltip.text || (r.innerHTML[1] = k(r.innerHTML[1], e.options[t].tooltip)), 
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
        getValue: function(a, o) {
            for (var n = [], r = t.$$("input:checked", a), e = 0; e < r.length; e++) n.push(r[e].value);
            return n.join(",");
        },
        setValue: function(t, a, n) {
            for (var r = n.split(","), e = 0; e < t.options.length; e++) t.options[e].checked = -1 != r.indexOf(x(t.options[e], "name")) ? !0 : !1;
            return !0;
        },
        enable: function(r, a) {
            for (var n = t.$$("input", r), e = 0; e < n.length; e++) n[e].hasAttribute("disabled") && n[e].removeAttribute("disabled");
        },
        disable: function(r, a) {
            for (var n = t.$$("input", r), e = 0; e < n.length; e++) n[e].setAttribute("disabled", "disabled");
        }
    }), i.PrefTypes.add("input", {
        make: function(e) {
            var s = e.description || e.name, r = e["default"] || "", a = i.get(e.name), t = {
                type: "div",
                className: "pref-container",
                innerHTML: [ {
                    type: "input",
                    className: "form-control pref",
                    innerHTML: "",
                    style: e.style,
                    attributes: {
                        value: a || r,
                        name: e.name,
                        type: "text",
                        "data-jmod-settings-pref": e.name,
                        "data-jmod-settings-pref-default": e["default"] || null
                    },
                    EventListeners: {
                        input: function(e) {
                            i.PrefTypes.onChange(e.target.getAttribute("name"), e.target.value);
                        }
                    }
                } ]
            };
            if (n == typeof e.tooltip || n == typeof e.tooltip.innerHTML && n == typeof e.tooltip.text || (t.innerHTML[0] = k(t.innerHTML[0], e.tooltip)), 
            n != typeof e.icon) {
                t.className += " input-icon-right";
                var o = gt(e.icon);
                t.innerHTML.unshift(o);
            }
            return t;
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
    }), i.PrefTypes.add("textarea", {
        make: function(e) {
            var s = e.description || e.name, a = e["default"] || "", o = i.get(e.name), t = {
                type: "div",
                className: "pref-container",
                innerHTML: [ {
                    type: "textarea",
                    className: "form-control pref",
                    innerHTML: o || a,
                    style: e.style,
                    attributes: {
                        name: e.name,
                        type: "text",
                        "data-jmod-settings-pref": e.name,
                        "data-jmod-settings-pref-default": e["default"] || null
                    },
                    EventListeners: {
                        input: function(e) {
                            i.PrefTypes.onChange(e.target.getAttribute("name"), e.target.value);
                        }
                    }
                } ]
            };
            if (n == typeof e.tooltip || n == typeof e.tooltip.innerHTML && n == typeof e.tooltip.text || (t.innerHTML[0] = k(t.innerHTML[0], e.tooltip)), 
            n != typeof e.icon) {
                var r = gt(e.icon);
                r.className += " icon-append", t.innerHTML.unshift(r);
            }
            return t;
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
    }), i.PrefTypes.add("range", {
        make: function(e) {
            var o = e.description || e.name, r = e["default"] || "", a = i.get(e.name), t = {
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
            return n == typeof e.tooltip || n == typeof e.tooltip.innerHTML && n == typeof e.tooltip.text || (t.innerHTML[0] = k(t.innerHTML[0], e.tooltip)), 
            t;
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
    var q = function(t, n, r) {
        t.innerHTML = r || "", t.style.backgroundImage = "url(" + n + ")", t.setAttribute("data-src", n);
        var e = new Image();
        e.onload = function() {
            var n = parseInt(e.naturalHeight) + "px", r = parseInt(e.naturalWidth) + "px";
            isNaN(e.naturalHeight) || isNaN(e.naturalWidth) || (parseInt(n) > 300 ? (n = "300px", 
            r = "100%", t.style.backgroundSize = "contain") : t.style.backgroundSize = "100% 100%", 
            t.style.height = n, t.style.width = r), e.parentElement.removeChild(e);
        }, e.style.position = "absolute", e.style.opacity = "0", (p || s).document.body.appendChild(e), 
        e.src = n;
    };
    i.PrefTypes.add("imagefile", {
        make: function(e) {
            var l = e["default"] || "", c = i.get(e.name), s = c || l, r = "string" == typeof s && "" != s ? !0 : !1, a = new t.FileSelector({
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
                        "data-jmod-settings-pref-default": e["default"] || null
                    }
                },
                onChange: function(n, e, r) {
                    t.FileSelector.ReadFileAsURL(e[0], function(n, e, r) {
                        var t = a.formElement.parentElement.lastChild;
                        q(t, e, ""), i.PrefTypes.onChange(a.formElement.getAttribute("name"), e);
                    }, function(t, n, r) {
                        var e = a.formElement.parentElement.lastChild;
                        q(e, "", "No Preview"), i.PrefTypes.onChange(a.formElement.getAttribute("name"), "");
                    });
                }
            }), o = {
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
            return h.DOMLoaded ? q(o.innerHTML[1], r ? s : "", r ? "" : "No Preview") : setTimeout(q, 150, o.innerHTML[1], r ? s : "", r ? "" : "No Preview"), 
            n == typeof e.tooltip || n == typeof e.tooltip.innerHTML && n == typeof e.tooltip.text || (o.innerHTML[0] = k(o.innerHTML[0], e.tooltip)), 
            o;
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
            return q(n, e, e && "" != e ? "" : "No Preview"), !0;
        },
        enable: function(e, t) {
            e.hasAttribute("disabled") && e.removeAttribute("disabled");
        },
        disable: function(e, t) {
            e.setAttribute("disabled", "disabled");
        }
    }), i.MakePref = function(e) {
        var t;
        if (M(e) || "element" == e.type) return t = {
            type: "div",
            className: "row form-group section-row",
            innerHTML: {
                type: "div",
                className: "col-md-12",
                innerHTML: M(e) ? e : e.innerHTML || e.options || e["default"]
            }
        }, g(t);
        var r = i.PrefTypes.make(e.type, e);
        if (r) {
            var a = Ft(e);
            switch (e.type) {
              case "radio":
              case "checkbox":
              case "toggle":
                n == typeof e.tooltip || n == typeof e.tooltip.innerHTML && n == typeof e.tooltip.text || (t = k(a.innerHTML, e.tooltip));
            }
            return t = {
                type: "div",
                className: "row form-group section-row",
                innerHTML: [ a, {
                    type: "div",
                    className: "col-md-8",
                    innerHTML: r
                } ]
            }, g(t);
        }
        return o;
    }, i.MakeSettingsModal = function(r) {
        var l = {}, e, S, h, d = !1, E = g({
            type: "div",
            className: "jMod-settings tabbable tabs-left"
        }), C = g({
            type: "ul",
            className: "nav nav-tabs"
        }), j = g({
            type: "div",
            className: "tab-content"
        });
        for (var s in r.settings) {
            var e = r.settings[s].tab || "Other", p = r.settings[s].section || "General";
            typeof l[e] === n && (l[e] = {
                name: e,
                color: null,
                sections: {}
            }), typeof l[e].sections[p] === n && (l[e].sections[p] = []), l[e].sections[p].push(r.settings[s]);
        }
        if (r.tabs) for (var s in r.tabs) e = r.tabs[s].name, e && typeof l[e] !== n && (r.tabs[s].displayName && (l[e].displayName = r.tabs[s].displayName), 
        r.tabs[s].content && (r.tabs[s].content.header && (l[e].contentHeader = r.tabs[s].content.header), 
        r.tabs[s].content.footer && (l[e].contentFooter = r.tabs[s].content.footer)));
        var f = r.tabOrder || [], b = {}, u = 0;
        for (e in l) {
            d = r.activeTab !== o && e === r.activeTab || r.activeTab === o && 0 == u ? !0 : !1, 
            S = m.makeNavElement({
                innerHTML: l[e].displayName || e,
                id: "jMod-settings-tab-" + u,
                isActive: d,
                contentId: "jMod-settings-tab-" + u + "-content",
                index: u
            });
            var y = [];
            l[e].contentHeader && y.push(l[e].contentHeader);
            for (var p in l[e].sections) {
                y.push('<div class="row section-title-row"><div class="col-md-12"><h3 class="section-title">' + p + "</h3></div></div>");
                for (var N in l[e].sections[p]) y.push(i.MakePref(l[e].sections[p][N]));
            }
            l[e].contentFooter && y.push(l[e].contentFooter), h = m.makeContentElement({
                name: e,
                id: "jMod-settings-tab-" + u + "-content",
                isActive: d,
                innerHTML: y,
                index: u
            }), b[e] = [ S, h ], -1 == f.indexOf(e) && f.push(e), u++;
        }
        if (r.tabs) for (var s in r.tabs) e = r.tabs[s].name, e && l[e] === o && (d = r.activeTab !== o && e === r.activeTab || r.activeTab === o && 0 == u ? !0 : !1, 
        S = m.makeNavElement({
            innerHTML: e,
            id: "jMod-settings-tab-" + u,
            isActive: d,
            contentId: "jMod-settings-tab-" + u + "-content",
            index: u
        }), h = m.makeContentElement({
            name: e,
            id: "jMod-settings-tab-" + u + "-content",
            isActive: d,
            innerHTML: r.tabs[s].innerHTML || r.tabs[s].text,
            index: u
        }), b[e] = [ S, h ], -1 == f.indexOf(e) && f.push(e), u++);
        for (var s = 0; s < f.length; s++) b[f[s]] !== o && (L(C, b[f[s]][0]), L(j, b[f[s]][1]));
        L(E, C), L(E, j);
        var v = r.title || "Settings";
        M(v) || (v = '<h2 class="title">' + v + "</h2>");
        var T = {
            title: v,
            id: i.getElementId("settingModalsElement"),
            className: a(Pt),
            body: E,
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
                            return t && i.clear(), P(e), !1;
                        }
                    }
                }
            } ],
            buttons: [ {
                text: "Save",
                className: "btn btn-success",
                EventListeners: {
                    click: function() {
                        c.log("save button click"), i.save();
                    }
                }
            } ],
            onAfterShow: function() {
                i.onResize();
            },
            style: {
                width: "1000px"
            },
            features: {
                enableTabs: !0,
                enableTooltips: !0
            }
        };
        return typeof r.onBeforeHide !== n && (T.onBeforeHide = r.onBeforeHide), typeof r.onAfterHide !== n && (T.onAfterHide = r.onAfterHide), 
        t.Modal(T);
    }, i.onResize = function() {
        var e = t.Settings.settingsModalElement, i = t.$(".modal-dialog", e), n = t.$(".modal-body", e), a = t.$(".modal-footer", e), o = t.$(".modal-header", e), p = s.viewportSize.getHeight(), r = s.getComputedStyle(i, null), c = parseInt(r.getPropertyValue("margin-top")), u = parseInt(r.getPropertyValue("margin-bottom")), f = parseInt(p) - parseInt(o.offsetHeight) - parseInt(a.offsetHeight) - c - u - 1;
        n.style.maxHeight = f + "px";
        var l = t.$(".nav-tabs", n);
        t.Tabs.resize(l);
    }, i.show = function() {
        t.Modal.show(i.settingsModalElement || 0);
    }, i.hide = function() {
        t.Modal.hide(i.settingsModalElement);
    }, i.save = function() {
        c.log("Saving");
        for (var e = i._data, r = {}, t = 0; t < e.settings.length; t++) {
            var n = e.settings[t];
            if (!M(e) && "element" != n.type) {
                var a = i.PrefTypes.getValue(n);
                r[n.name] = a;
            }
        }
        i._storedData = r;
    }, i.init = function() {
        i.Initialized = !0;
    }, t.CSS = '.jmod-na .modal-body{min-height:200px;max-height:500px;overflow-y:auto;}.jmod-na .powered-by{font-family:"Sansation",Lato;font-weight:300;font-size:16px;position:absolute;left:0;text-align:center;width:100%;bottom:0;padding-bottom:5px;}.jmod-na .powered-by > a:link,.jmod-na .powered-by > a:visited,.jmod-na .powered-by > a:hover,.jmod-na .powered-by > a:active{text-decoration:none;color:#000;}.jmod-na .powered-by img{margin-right:3px;}.jmod-na .noselect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.jmod-na .noselect::selection{background:transparent;}.jmod-na .noselect::-moz-selection{background:transparent;}.jmod-na .imagefile-form{display:inline-block;vertical-align:top;}.jmod-na .imagefile-form > button{margin-right:10px;}.jmod-na .image-preview-container{display:inline-flex;color:rgba(0,0,0,0.7);background-repeat:no-repeat;background-position:center center;background-size:100% 100%;max-width:100%;min-width:35px;min-height:35px;max-height:300px;border:solid 1px #000000;padding:5px;text-align:center;vertical-align:center center;align-items:center;justify-content:center;}', 
    t.getDOMTiming = function() {
        var r, e = {};
        try {
            if (T.available) {
                var c = [ "unloadEventStart", "unloadEventEnd", "navigationStart" ];
                r = T.getAllTiming();
                var s = T.get("timing.navigationStart");
                for (var n in r) e[n] = r[n] - s, (e[n] <= 0 || isNaN(e[n])) && delete e[n];
                var a = (T.get("timing.loadEventEnd") || T.get("timing.loadEventStart")) - T.get("timing.navigationStart");
                a > 0 && (e.pageLoadTime = a);
                var o = T.get("timing.responseEnd") - T.get("timing.fetchStart");
                o >= 0 && (e.NetworkLatency = o);
                var i = T.now;
                i > 0 && (e.statReportTime = i), t.InitializeEndTime > 0 && (e.jModInitializeEnd = t.InitializeEndTime), 
                t.InitializeStartTime >= 0 && (e.jModInitializeStart = t.InitializeStartTime, t.InitializeEndTime > 0 && t.InitializeEndTime - t.InitializeStartTime > 0 && (e.jModInitializeTime = t.InitializeEndTime - t.InitializeStartTime), 
                ot > 0 && ot - t.InitializeStartTime > 0 && (e.jModReadyTime = ot - t.InitializeStartTime));
            }
        } catch (l) {
            return j(l, "jMod.getDOMTiming"), {};
        }
        return e;
    };
    var y = t.SendMessage = function(e) {
        switch (t.jQueryAvailable || "jquery" != e.method.toLowerCase() ? typeof GM_xmlhttpRequest === n && "xmlhttprequest" == e.method.toLowerCase() && (e.method = t.jQueryAvailable ? "jQuery" : "JSONP") : e.method = typeof GM_xmlhttpRequest !== n ? "XMLHTTPRequest" : "JSONP", 
        e.url = t.SendMessage.processURL(e), (e.method || "XMLHTTPRequest").toLowerCase()) {
          case "jquery":
            return t.debug && c.log("jMod.SendMessage - jquery", e), t.SendMessage.jQuery(e);
            break;

          case "xmlhttprequest":
            return t.debug && c.log("jMod.SendMessage - xmlhttprequest", e), t.SendMessage.XMLHTTPRequest(e);
            break;

          case "jsonp":
          default:
            t.debug && c.log("jMod.SendMessage - JSONP", e), t.SendMessage.JSONP(e);
        }
    }, st = "jModSendMessageResponseFn";
    y.processURL = function(e) {
        var t = "string" == typeof e.callback ? e.callback : st;
        switch ("object" != typeof e.url && -1 == e.url.indexOf("?") && (e.url += "?"), 
        e.method.toLowerCase()) {
          case "jsonp":
            e.url instanceof et ? (e.url.addArg("callback", t), e.url.addArg("jsonp", t)) : e.url += "&callback=" + t + "&jsonp=" + t;
            break;

          case "xmlhttprequest":
            e.url instanceof et ? e.url.addArg("json", "1") : e.url += "&json=1";
            break;

          case "jquery":
            e.responseType && "json" == e.responseType && (e.url instanceof et ? e.url.addArg("json", "1") : e.url += "&json=1");
        }
        return e.url;
    }, y.jQuery = function(e) {
        var n = "string" == typeof e.callback ? e.callback : st, t = y.addCallbacks(e);
        try {
            $.getJSON("" + e.url, {
                async: !0,
                format: "json"
            }).done(function(e, n, r) {
                y.execCallback(t, null, e, n, r);
            }).fail(function(e, n, r) {
                y.execErrorCallback(t, null, e, n, r);
            });
        } catch (r) {
            return !1;
        }
        return !0;
    }, y.XMLHTTPRequest = function(e) {
        try {
            if (typeof GM_xmlhttpRequest !== n) {
                var t = y.addCallbacks(e);
                return GM_xmlhttpRequest({
                    method: "GET",
                    url: "" + e.url,
                    headers: {
                        Accept: "application/javascript"
                    },
                    onload: function(e, t) {
                        return function(n) {
                            if ("json" != t.toLowerCase()) return y.execCallback(e, null, n.responseText, n);
                            var r;
                            try {
                                r = JSON.parse(n.responseText);
                            } catch (a) {} finally {
                                return y.execCallback(e, null, r, n);
                            }
                        };
                    }(t, e.responseType || "json"),
                    onerror: function(e) {
                        return function(t) {
                            return c.log("Error! XMLHttpRequest", t), y.execErrorCallback(e, null, t.responseText, t);
                        };
                    }(t)
                }), !0;
            }
        } catch (r) {
            c.log("Error! getXMLHttpRequest", r);
        } finally {
            return !1;
        }
    }, y.JSONP = function(e) {
        var t = y.addCallbacks(e), n = g({
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
            return y.execErrorCallback(t, null, a);
            return !1;
        }
        return !0;
    }, y._callbacks = [], y.addCallbacks = function(e) {
        return y._callbacks.push({
            complete: e.callback,
            error: e.onerror
        }) - 1;
    }, y.execCallback = function(r, t) {
        try {
            var e = y._callbacks[r].complete;
            if (typeof e === n) return !1;
            if ("function" == typeof e) return e.apply(t || null, f.call(arguments, 2));
            if ("string" == typeof e && "function" == typeof s[e]) return s[e].apply(t || null, f.call(arguments, 2));
        } catch (a) {
            return c.log("Error SendMessage.execCallback!", a), !1;
        }
    }, y.execErrorCallback = function(r, t) {
        try {
            var e = y._callbacks[r].onerror;
            if (typeof e === n) return !1;
            if ("function" == typeof e) return e.apply(t || null, f.call(arguments, 2));
            if ("string" == typeof e && "function" == typeof s[e]) return s[e].apply(t || null, f.call(arguments, 2));
        } catch (a) {
            return c.log("Error SendMessage.execErrorCallback!", a), !1;
        }
    }, y._globalResponseCallback = ht(Tt, s, {
        defineAs: st,
        allowCallbacks: !0,
        allowCrossOriginArguments: !0
    }), t.Update = new function() {
        var e = function() {
            var e = [ !0 ].concat(f.call(arguments), {
                script_info: a("script.script_info"),
                script_file_info: a("script.script_file_info") || o
            });
            return t.extend.apply(t, e);
        };
        this.getURL = function(p) {
            opts = e({}, t.Config.Update, p);
            var r = new et(a("host") || "http://myuserjs.org"), s = (opts.username || a("script.username")).trim();
            if (typeof s === n || "" == s) throw "No Username Provided";
            var l = (opts.script_name || a("script.script_name")).trim();
            if (typeof l === n || "" == l) throw "No Script Name Provided";
            var o = opts.getType || a("Update.getType");
            "meta" != o && "metajs" != o && "data" != o && "none" != o && (o = "data");
            var c = opts.args;
            if (opts.DOMTiming) {
                var u = t.getDOMTiming();
                for (var i in u) u.hasOwnProperty(i) && (c[i] = u[i]);
            }
            var f = [];
            for (var i in c) f.push(i + "=" + c[i]);
            r.addArg("args", escape(f.join(","))), r.addArg("api_version", t.version), r.addArg("updateVeriableName", opts.updateVeriableName), 
            typeof opts.noDownload !== n && 1 == opts.noDownload ? r.addArg("nodownload", "1") : a("Update.sampleRate") < 100 && Math.floor(100 * Math.random() + 1) > a("Update.sampleRate") && r.addArg("nodownload", "1"), 
            a("Update.getStats") && r.addArg("getstats", "1"), typeof opts.script_info !== n && (typeof opts.script_info.version !== n && r.addArg("scriptversion", escape(opts.script_info.version)), 
            typeof opts.script_info.script_handler !== n && (r.addArg("scripthandler", escape(opts.script_info.script_handler)), 
            typeof opts.script_info.script_handler_version !== n && r.addArg("scripthandlerversion", escape(opts.script_info.script_handler_version)))), 
            r.addArg("cachebuster", Math.round(new Date().getTime() / 1e3));
            var d = a("host") || "myuserjs.org";
            return r.setPath("/script/" + s + "/" + l + "." + o + ".js"), r;
        }, this.sendRequest = function(f) {
            try {
                var r = e({}, t.Config.Update, f);
                typeof s[r.updateVeriableName] !== n && (s[r.updateVeriableName] = o, delete s[r.updateVeriableName]);
                var u = t.Update.getURL(r);
                a("debug") && t.Log("URL: ", "" + u);
                var l = "JSONP";
                return r.jQuery ? l = "jQuery" : r.XMLHttpRequest && (l = "XMLHTTPRequest"), t.SendMessage({
                    url: "" + u,
                    method: l,
                    responseType: "json",
                    callback: function(e, t) {
                        return function(n) {
                            return s[t] = n, e.apply(this, arguments);
                        };
                    }(r.callback, r.updateVeriableName),
                    onerror: r.onerror
                });
            } catch (i) {
                return c.log("Error! getUpdateData: ", i.name, i.fileName, i.lineNumber + ":" + i.columnNumber), 
                c.error(i), r.callback && r.onerror(i), o;
            }
        }, this.getUpdateData = function(e) {
            return this.sendRequest(e);
        };
    }(), Object.defineProperty(t.Update, "MetaData", {
        get: function(e) {
            return typeof s[e || a("Update.updateVeriableName")] !== n ? s[e || a("Update.updateVeriableName")] : typeof p[e || a("Update.updateVeriableName")] !== n ? p[e || a("Update.updateVeriableName")] : o;
        }
    }), t.ERROR = new function() {
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
        }, Object.defineProperties(this.ERROR_CODES, mt), Object.defineProperty(this.ERROR_CODES, "get", {
            value: function(e, n) {
                return o === n ? t.ERROR.ERROR_CODES.SearchForKey(e) : t.ERROR.ERROR_CODES.setKeyValue(e, n);
            },
            enumerable: !1
        }), this.getCode = function(t) {
            var e = this.ERROR_CODES.get(t);
            return o !== e ? +e.toString(2) : o;
        };
        var e = function(n, r, o, i, e, t) {
            try {
                if (a("script.script_info.userscript_full_file_name") == t[0].fileName) {
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
                var e = t.extend(!0, {}, t.Config.Update, n);
                return o === e.args && (e.args = {}), o === e.args.scriptError && (e.args.scriptError = "1"), 
                o === e.args.scriptErrorCode && (e.args.scriptErrorCode = "-1"), e.getType = "none", 
                e.noDownload = !0, t.UPDATE.sendRequest(e);
            } catch (r) {
                return c.log("Error! Error.send: ", r), o;
            }
        }, this.catchError = function(u, p, r, i, n, s) {
            try {
                if (c.log("stackInfo", s), o !== n && o !== n.stack) {
                    var l = f.call(arguments, 0);
                    if (a("Error.autoReportErrors")) {
                        var t = a("Error.errorFilter").apply(this, l);
                        if (t) {
                            var e = {
                                getType: "none",
                                args: {}
                            };
                            switch (e.args.scriptErrorLineNumber = r, e.args.scriptErrorColNumber = i, typeof t) {
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
            } catch (d) {}
            return !1;
        }, this.processError = function(e) {
            var n = "";
            try {
                n = "" + e.stack;
            } catch (e) {}
            var r = {
                message: e.message,
                name: e.name,
                fileName: e.fileName,
                lineNumber: e.lineNumber,
                columnNumber: e.columnNumber,
                stack: n
            };
            return t.ERROR.catchError(e.message, e.fileName, e.lineNumber, e.columnNumber, r, t.parseStack(n));
        };
    }(), ht(dt, s, {
        defineAs: "jModListenError",
        allowCallbacks: !0,
        allowCrossOriginArguments: !0
    });
    var Xt = function() {
        p.oldHandle = p.onerror, p.onerror = function(n, r, a, o, e) {
            try {
                var t = "";
                try {
                    t = "" + e.stack;
                } catch (s) {}
                var i = {
                    message: e.message,
                    name: e.name,
                    fileName: e.fileName,
                    lineNumber: e.lineNumber,
                    columnNumber: e.columnNumber,
                    stack: t
                };
                dt(n, r, a, o, i);
            } catch (s) {}
            return p.oldHandle ? p.oldHandle.apply(this, arguments) : !1;
        };
    };
    return n == typeof t.Config.script.script_info && n != typeof GM_info && b.set(), 
    +function() {
        function r(r) {
            return h.DOMLoaded || -1 != [ "interactive", "complete" ].indexOf(n.readyState.toLowerCase()) && e.DOMLoaded(), 
            h.DOMLoaded && (h.documentComplete || "complete" != n.readyState || e.documentComplete(), 
            h.performanceReady || (i = T.pageLoadTime(), (!isNaN(i) && i > 0 || !T.available) && e.performanceReady()), 
            h.performanceReady && h.documentComplete) ? (h.Complete = !0, clearInterval(a), 
            t.debug && _("jMod Finish Init"), o) : u > g ? (h.Complete = !0, clearInterval(a), 
            h.DOMLoaded || e.DOMLoaded(), h.documentComplete || e.documentComplete(), h.performanceReady || e.performanceReady(), 
            t.debug && _("jMod Finish Init"), o) : (u++, t.debug && t.log.count("Try Init"), 
            o);
        }
        function a() {
            h.Complete ? clearInterval(a) : r("checkTimer");
        }
        function f(e) {
            h.Complete || r("DOMContentLoaded"), n.removeEventListener("DOMContentLoaded", f, !1), 
            t.Events.fire.apply(t.Events, [ "DOMContentLoaded", {
                _this: this,
                args: arguments
            } ]), t.debug && t.Debug("DOMContentLoaded", e);
        }
        function l(e) {
            p.removeEventListener("load", l, !1), t.Events.fire.apply(t.Events, [ "load", {
                _this: this,
                args: arguments
            } ]), t.debug && t.Debug("onLoadEvent", e);
        }
        function d(e) {
            t.Events.fire.apply(t.Events, [ "beforescriptexecute", {
                _this: this,
                args: arguments
            } ]);
        }
        function m(e) {
            t.Events.fire.apply(t.Events, [ "afterscriptexecute", {
                _this: this,
                args: arguments
            } ]);
        }
        const g = 200;
        var i, u = 0, n = document || p.document || s.document || p, e = {
            DOMLoaded: function() {
                h.DOMLoaded = !0, t.debug && _("DOM Loaded", null, " - Begin Init"), t.Events.fire("onDOMReady"), 
                h.CSSAdded = !0, t.AddCSS(), t.Notification.init(), t.Modal.init(), t.Settings.init(), 
                h.jModReady = !0, setTimeout(function() {
                    t.debug && _("jModReady"), t.Events.fire("onReady");
                }, 0), T.available && (ot = T.now);
            },
            documentComplete: function() {
                h.documentComplete = !0, t.debug && (_("onPageReady"), c.groupEnd("jMod Start")), 
                t.Events.fire("onPageReady");
            },
            performanceReady: function() {
                h.performanceReady = !0, t.debug && _("onPerformanceReady"), t.Events.fire("onPerformanceReady");
            }
        };
        n.addEventListener("DOMContentLoaded", f, !1), n.onreadystatechange = function(e) {
            h.Complete || r("onreadystatechange"), t.Events.fire.apply(t.Events, [ "onreadystatechange", {
                _this: this,
                args: arguments
            } ]), t.debug && t.Debug("onreadystatechange %c%s%c %o", t.log.fmt.stchange, n.readyState, " ", e);
        }, p.addEventListener("load", l, !1), p.addEventListener("beforescriptexecute", d, !1), 
        p.addEventListener("afterscriptexecute", m, !1), r(), setInterval(a, 25);
    }(), T.available && setTimeout(function() {
        t.InitializeEndTime = T.now;
    }, 0), t.debug && _("jMod Initialize Time Elapsed"), t;
}(void 0 !== window.performance ? window.performance.now() : 0, "undefined" != typeof jQuery ? jQuery : void 0, console, window, "undefined" != typeof unsafeWindow ? unsafeWindow : "undefined" != typeof window ? window : this, "undefined"));