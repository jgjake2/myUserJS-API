// ==UserScript==
// @name             jMod
// @namespace        http://myuserjs.org/
// @author           jgjake2
// @homepage         http://myuserjs.org/
// @include          *
// @version          0.0.17
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
    t.jMod = this.jMod = e, e.debug && e.log.groupEnd("jMod Initialize");
}.call(this, "undefined" != typeof unsafeWindow ? unsafeWindow : "undefined" != typeof window ? window : this, function(Nt, $, f, i, t, a) {
    function tt(o, i, s) {
        var r = "function" == typeof s ? !0 : !1, e = i;
        "object" != typeof i && (e = u.call(arguments, 1), r = !1);
        for (var n = 0; n < e.length; n++) if (typeof o[e[n]] !== t && (!r || r && s(e[n], o[e[n]]))) return e[n];
        return a;
    }
    function _(n, r, o) {
        var e = tt.apply(this, arguments);
        return typeof e !== t ? n[e] : a;
    }
    function B(e) {
        if (!e) {
            if (!window.event) return;
            e = window.event;
        }
        null != e.cancelBubble && (e.cancelBubble = !0), e.stopPropagation && e.stopPropagation(), 
        e.preventDefault && e.preventDefault(), window.event && (e.returnValue = !1), null != e.cancel && (e.cancel = !0);
    }
    function rt(e, r, n) {
        if (typeof exportFunction !== t) exportFunction(e, r, n); else {
            var a;
            typeof n === t && (n = {}), typeof n.defineAs !== t ? a = n.defineAs : "function" == typeof e && "" != e.name && (a = e.name), 
            r[a || ""] = e;
        }
    }
    function P(n, a, r) {
        if (typeof cloneInto !== t) {
            try {
                return cloneInto(n, a, r);
            } catch (s) {}
            var o = {};
            for (var e in n) if (Object.prototype.hasOwnProperty.call(n, e)) if ([ "string", "number" ].indexOf(typeof n[e])) try {
                o[e] = cloneInto(n[e], a, r);
            } catch (s) {} else if ("object" == typeof n[e]) {
                o[e] = {};
                for (var i in n[e]) try {
                    Object.prototype.hasOwnProperty.call(n[e], i) && (o[e][i] = cloneInto(n[e][i], a, r));
                } catch (s) {}
            }
            return cloneInto(o, a, r);
        }
    }
    function pt(o) {
        var e = 0, n = this, r = o.split(".");
        for (e; e < r.length; e++) {
            if (typeof n[r[e]] === t) return a;
            n = n[r[e]];
        }
        return n;
    }
    function ft(o) {
        var r, t = 0, e = this, n = o.split(".");
        if (0 == n.length) return a;
        for (t; t < n.length; t++) {
            if (-1 == (r = Object.keys(e).join("|").toLowerCase().split("|").indexOf(n[t].toLowerCase()))) return a;
            e = e[Object.keys(e)[r]];
        }
        return e;
    }
    function Et(i, s) {
        var o, r, n = 0, e = i.split("."), t = this;
        if (0 == e.length) return a;
        for (n; n < e.length; n++) {
            if (-1 == (r = Object.keys(t).join("|").toLowerCase().split("|").indexOf(e[n].toLowerCase()))) return a;
            o = t, e[n] = Object.keys(t)[r], t = t[Object.keys(t)[r]];
        }
        return o[e[e.length - 1]] = s, e;
    }
    function bt(t) {
        var n, e = 0, r = "string" == typeof t ? u.call(arguments) : t;
        for (e; e < r.length; e++) if ((n = pt.apply(this, [ r[e] ])) !== a) return n;
        return a;
    }
    function ht(r, o, i) {
        var e = 0, n = r.split("."), a = this;
        for (e; e < n.length - 1; e++) {
            if (typeof a[n[e]] === t) {
                if (!i) return;
                a[n[e]] = {};
            }
            a = a[n[e]];
        }
        a[n[n.length - 1]] = o;
    }
    function yt(e, n, a) {
        if (document.createEvent) {
            var t = document.createEvent("MouseEvents");
            t.initEvent("click", n || !0, a || !0), e.dispatchEvent(t);
        } else document.createEventObject ? e.fireEvent("onclick") : "function" == typeof e.onclick && e.onclick();
    }
    function mt(e) {
        var n = {
            type: "div",
            className: "jModLargeNotification bigBox animated fadeIn",
            style: {},
            attributes: {
                "data-jmod-notification": s.count,
                "data-jmod-large-notification": s.LargeCount
            }
        };
        typeof e.background !== t && (n.style.background = e.background), n.style.backgroundColor = typeof e["background-color"] !== t ? e["background-color"] : "rgb(50, 118, 177)";
        var a = {
            type: "div",
            className: "",
            innerHTML: [ {
                type: "i",
                id: "jModbtnClose" + s.LargeCount,
                className: "botClose fa fa-times",
                EventListeners: {
                    click: function(t) {
                        var e = t.target.parentElement.parentElement, n = parseInt(e.getAttribute("data-jmod-notification")), a = parseInt(e.getAttribute("data-jmod-large-notification"));
                        s.close(e, "large", n, a, t);
                    }
                }
            } ],
            style: {},
            attributes: {
                "data-jmod-notification": s.count,
                "data-jmod-large-notification": s.LargeCount
            }
        };
        return typeof e.title !== t && a.innerHTML.push({
            type: "span",
            innerHTML: e.title
        }), a.innerHTML.push({
            type: "div",
            innerHTML: e.body
        }), typeof e.icon !== t && a.innerHTML.push({
            type: "div",
            className: "jmod-na bigboxicon",
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
        }), n.innerHTML = a, g(n);
    }
    function Ct(n) {
        var a = document.createElement("div");
        a.setAttribute("data-jmod-notification", s.count), a.setAttribute("data-jmod-small-notification", s.SmallCount), 
        a.className = "jModSmallNotification SmallBox animated fadeIn", typeof n.background !== t && (a.style.background = n.background), 
        a.style.backgroundColor = typeof n["background-color"] !== t ? n["background-color"] : "rgb(41, 97, 145)";
        var g = s.CurrentSmallCount;
        if (g > 0) {
            for (var m = 25 * g, y = s("getElement", "notificationsSmallWrapper"), d = e.$$("div[data-jmod-small-notification]", y), f = 0; f < d.length; f++) m += parseInt(d[f].offsetHeight);
            a.style.top = m + 20 + "px";
        }
        a.addEventListener("click", function(t) {
            for (var n = 0, e = t.target; !e.hasAttribute("data-jmod-small-notification") && null != e && 10 > n; ) e = e.parentElement, 
            n++;
            if (null != e) {
                var a = parseInt(e.getAttribute("data-jmod-notification")), r = parseInt(e.getAttribute("data-jmod-small-notification"));
                s.close(e, "small", a, r, t);
            }
        }, !1);
        var r = document.createElement("div");
        if (typeof n.footer === t) r.className = "textoFull"; else {
            r.className = "textoFoto";
            var l = document.createElement("div");
            l.className = "foto", p(n.icon) ? l.appendChild(n.icon) : l.innerHTML = '<i class="fa ' + n.icon + " " + (n.iconAnimation || "bounce") + ' animated"> </i>', 
            a.appendChild(l);
        }
        var i = document.createElement("span");
        i.className = "", typeof n.title !== t && (p(n.title) ? i.appendChild(n.title) : i.innerHTML = n.title), 
        r.appendChild(i);
        var o = document.createElement("p");
        if (o.className = "", typeof n.body !== t && (p(n.body) ? o.appendChild(n.body) : o.innerHTML = n.body), 
        r.appendChild(o), typeof n.footer !== t) {
            var u = document.createElement("p");
            u.className = "text-align-right", p(n.footer) ? u = n.footer : u.innerHTML = n.footer, 
            r.appendChild(u);
        }
        if (a.appendChild(r), typeof n.footer === t && typeof n.icon !== t) {
            var c = document.createElement("div");
            c.setAttribute("class", "miniIcono"), p(n.icon) ? c.appendChild(n.icon) : c.innerHTML = '<i class="miniPic fa ' + n.icon + ' bounce animated"> </i>', 
            a.appendChild(c);
        }
        return a;
    }
    function lt(t) {
        var e = t.name, a = e.split(" ");
        -1 == a.indexOf("fa") && -1 == a.indexOf("glyphicon") && (-1 != e.indexOf("fa-") ? e = "fa " + e : -1 != e.indexOf("glyphicon-") && (e = "glyphicon " + e));
        var n = {
            type: "i",
            className: e,
            attributes: {}
        };
        return t.tooltip && (n = I(n, t.tooltip)), n;
    }
    function I(a, e) {
        if (p(a)) {
            if (T(a, n(x)), a.setAttribute(n(k), e.innerHTML || e.text || null), a.setAttribute(n(K), e.placement || "top"), 
            t != typeof e.margin) {
                var r = n("Tooltip.attributeNames.margin");
                t != typeof e.margin.left && a.setAttribute(r + "-left", e.margin.left), t != typeof e.margin.right && a.setAttribute(r + "-right", e.margin.right), 
                t != typeof e.margin.top && a.setAttribute(r + "-top", e.margin.top), t != typeof e.margin.bottom && a.setAttribute(r + "-bottom", e.margin.bottom);
            }
        } else if (a.className = (a.className || "") + " " + n(x), typeof a.attributes === t && (a.attributes = {}), 
        a.attributes[n(k)] = e.innerHTML || e.text || null, a.attributes[n(K)] = e.placement || "top", 
        t != typeof e.margin) {
            var r = n("Tooltip.attributeNames.margin");
            t != typeof e.margin.left && (a.attributes[r + "-left"] = e.margin.left), t != typeof e.margin.right && (a.attributes[r + "-right"] = e.margin.right), 
            t != typeof e.margin.top && (a.attributes[r + "-top"] = e.margin.top), t != typeof e.margin.bottom && (a.attributes[r + "-bottom"] = e.margin.bottom);
        }
        return a;
    }
    function wt(t) {
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
    function jt(e) {
        m.execCallback(document.currentScript.getAttribute("data-callback-index"), document.currentScript, e, document.currentScript);
    }
    function st(t, n, r, o, i) {
        f.log("jModListenError", t, n, r, o);
        var s = e.parseStack(i.stack);
        return s.length > 0 ? e.ERROR.catchError(t, n, r, o, i, s) : a;
    }
    var e = function(t) {
        return e._call.apply(e, arguments);
    };
    e.InitializeStartTime = Nt, e.InitializeEndTime = -1;
    var M = e.API = {}, F = -1, u = Array.prototype.slice, O = t != typeof $ ? !0 : !1, W = "@import url(//fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700);\n@import url(//myuserjs.org/css/smartadmin-production-all-namespaced.css);\n@font-face {font-family: 'Sansation';font-style: normal;font-weight: 400;src: local('Sansation Regular'), local('Sansation-Regular'), url(http://myuserjs.org/fonts/Sansation-Regular.ttf) format('ttf');}\n@font-face {font-family: 'Sansation';font-style: normal;font-weight: 300;src: local('Sansation Light'), local('Sansation-Light'), url(http://myuserjs.org/fonts/Sansation-Light.ttf) format('ttf');}\n@font-face {font-family: 'Sansation';font-style: italic;font-weight: 300;src: local('Sansation Light Italic'), local('Sansation-LightItalic'), url(http://myuserjs.org/fonts/Sansation-LightItalic.ttf) format('ttf');}\n@font-face {font-family: 'Sansation';font-style: normal;font-weight: 700;src: local('Sansation Bold'), local('Sansation-Bold'), url(http://myuserjs.org/fonts/Sansation-Bold.ttf) format('ttf');}\n@font-face {font-family: 'Sansation';font-style: italic;font-weight: 400;src: local('Sansation Italic'), local('Sansation-Italic'), url(http://myuserjs.org/fonts/Sansation-Italic.ttf) format('ttf');}\n@font-face {font-family: 'Sansation';font-style: italic;font-weight: 700;src: local('Sansation Bold Italic'), local('Sansation-BoldItalic'), url(http://myuserjs.org/fonts/Sansation-BoldItalic.ttf) format('ttf');}\n", H = function(o, a, i, r) {
        var n = {
            configurable: !1,
            enumerable: t != typeof r ? r : !0
        };
        "function" == typeof a ? n.get = a : (n.value = a, n.writable = !1), Object.defineProperty(i || e, o, n);
    }, b = {
        id: "jMod",
        config: {},
        el: i.document && i.document.currentScript ? i.document.currentScript : a
    };
    H("ScriptElement", function() {
        return b.el ? b : a;
    }), H("version", "0.0.17"), H("build_time", "1421098235000"), H("build_type", "beta"), 
    H("_debug", !1), Object.defineProperty(e, "debug", {
        get: function() {
            try {
                return t !== typeof e.Config.debug ? e.Config.debug : e._debug;
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
            return O ? O : t != typeof $ ? O = !0 : t != typeof jQuery ? ($ = jQuery, O = !0) : t != typeof i.jQuery ? ($ = i.jQuery, 
            O = !0) : !1;
        },
        set: function(e) {
            O = e ? !0 : !1;
            try {
                "jQuery" == L(e) && ($ = e);
            } catch (t) {}
        },
        enumerable: !1
    }), H("jQuery", function() {
        return e.jQueryAvailable ? $ : a;
    });
    var v = new function() {
        var n, r = function() {
            return n === a && (n = typeof i.performance !== t && typeof i.performance.timing !== t ? i.performance : a), 
            n;
        };
        this.__defineGetter__("performanceObject", function() {
            return r();
        }), this.__defineGetter__("available", function() {
            return this.performanceObject === a ? !1 : !0;
        }), this.__defineGetter__("now", function() {
            try {
                return this.performanceObject.now();
            } catch (t) {
                e.Warning("Performance not available!");
            }
        }), this.get = function(o) {
            var e = 0, r = o.split("."), n = this.performanceObject;
            if (n !== a) {
                for (e; e < r.length; e++) {
                    if (typeof n[r[e]] === t) return;
                    n = n[r[e]];
                }
                return n;
            }
        }, this.getAllTiming = function(t) {
            t === a && (t = []);
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
    Object.defineProperty(e, "timeElapsed", {
        get: function() {
            return v.now - e.InitializeStartTime;
        }
    });
    var y = e.Loading = {
        DOMLoaded: !1,
        CSSAdded: !1,
        performanceReady: !1,
        documentComplete: !1,
        jModReady: !1,
        Complete: !1
    };
    Object.defineProperty(e, "CSS", {
        get: function() {
            return W;
        },
        set: function(t) {
            W += t, y.CSSAdded && e.AddCSS();
        },
        enumerable: !1
    }), e.AddCSS = function(e) {
        Tt(W + (e || "")), W = "";
    }, e.parseStack = function(n) {
        for (var t = [], a = /([^\s]*)\@file\:\/\/\/([^\s]+?(?:\/([^\/]+?\.(user\.js|js|json|php)))?):(\d+)(?:\:(\d+))?/gi, e; null != (e = a.exec(n)); ) {
            var r = {
                functionName: e[1],
                fullFileName: e[2],
                fileName: e[3],
                fileExt: e[4],
                lineNumber: e[5],
                columnNumber: e[6]
            };
            t.push(r);
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
            var r = /^\s*(.*?)\s*((?:[\d]+\.)*[\d]+)\s*(.*?)\s*$/i, i = /([\d]+)\.?/gi, e, t = {
                fullVersion: n.trim(),
                versionStr: null,
                prefixStr: null,
                suffixStr: null,
                version: []
            };
            if (e = r.exec(n.trim())) {
                t.prefixStr = e[1], t.versionStr = e[2], t.suffixStr = e[3];
                var a = e[2].split(".");
                for (var o in a) t.version.push(parseInt(a[o]));
            }
            return t;
        },
        compare: function(n, a) {
            var r = n, o = a;
            "string" == typeof n && (r = this.parseVersion(n)), "string" == typeof a && (o = this.parseVersion(a));
            for (var i = [].concat(r.version), s = [].concat(o.version); ;) {
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
    var Q = e.URLBuilder = function(e) {
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
            for (var e = 0; e < t.length; e++) switch (L(t[e])) {
              case "array":
                this.addArg(t[e][0], t[e][1]);
                break;

              case "map":
              case "object":
                var n = _(t[e], [ "name", "key" ]), a = _(t[e], [ "value" ]);
                n && a && this.addArg(n, a);
            }
            return this;
        }, this.buildArgs = function() {
            for (var n = "", t = [], e = 0; e < this.args.length; e++) t.push(this.args[e].name + "=" + this.args[e].value);
            return t.join("&");
        }, this.toString = function() {
            return this.protocol + "//" + this.hostname + this.pathname + "?" + this.buildArgs();
        }, this.setHostname(e);
    }, it = {
        SearchForKey: {
            value: pt,
            enumerable: !1
        },
        SearchForKeys: {
            value: bt,
            enumerable: !1
        },
        setKeyValue: {
            value: ht,
            enumerable: !1
        },
        SearchForKeyI: {
            value: ft,
            enumerable: !1
        },
        setKeyValueI: {
            value: Et,
            enumerable: !1
        }
    }, L = e.RealTypeOf = function(n) {
        var e;
        try {
            (n.constructor === {}.constructor || n) && (e = n);
        } catch (a) {
            e = P(n, i, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
        }
        try {
            if (typeof e === t) return t;
            if ("number" == typeof e && 1 == isNaN(e)) return "nan";
            if ("object" == typeof e) return null === e ? "null" : e.constructor === {}.constructor ? "map" : e.constructor === [].constructor ? "array" : e.constructor === new Date().constructor ? isNaN(e.getTime()) ? "invaliddate" : "date" : e.constructor === RegExp().constructor ? "regex" : Object.prototype.toString.call(e).replace(/^\[object |\]$/g, "").toLowerCase();
        } catch (a) {}
        return typeof e;
    }, q = function(e) {
        try {
            if ("object" != typeof e || e.nodeType || e === e.window) return !1;
            if (e.constructor && !e.hasOwnProperty.call(e.constructor.prototype, "isPrototypeOf")) return !1;
        } catch (n) {
            var t = P(e, i, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
            if ("object" != typeof t || t.nodeType || t === t.window) return !1;
            if (t.constructor && !t.hasOwnProperty.call(t.constructor.prototype, "isPrototypeOf")) return !1;
        }
        return !0;
    }, V = function(e) {
        try {
            if (e.constructor === [].constructor) return !0;
        } catch (n) {
            var t = P(e, i, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
            if (t.constructor === [].constructor) return !0;
        }
        return !1;
    }, At = function(e) {
        return "function" == typeof e;
    };
    e.extend = function() {
        var c, i, r, n, l, s, t = arguments[0] || {}, o = 1, f = arguments.length, u = !1;
        for ("boolean" == typeof t && (u = t, t = arguments[o] || {}, o++), "object" != typeof t && "function" != typeof t && (t = {}), 
        o === f && (t = this, o--); f > o; o++) if (null != (c = arguments[o])) for (i in c) if (r = t[i], 
        n = c[i], t !== n) if (u && n && (q(n) || (l = V(n)))) l ? (l = !1, s = r && V(r) ? r : []) : s = r && q(r) ? r : {}, 
        t[i] = e.extend(u, s, n); else if (n !== a) try {
            t[i] = n;
        } catch (d) {
            t[i] = P(n, t, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
        }
        return t;
    }, e.extendp = function() {
        var i, r, n, t, c, s, d, e = arguments[0] || {}, o = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof e && (l = e, e = arguments[o] || {}, o++), "object" != typeof e && "function" != typeof e && (e = {}), 
        o === u && (e = this, o--); u > o; o++) if (null != (i = arguments[o])) for (r in i) if (n = e[r], 
        t = i[r], e !== t) if (l && t && (q(t) || (c = V(t)))) {
            if (c) {
                if (V(n) && Array.prototype.push.apply(e[r], t)) continue;
                s = n && V(n) ? n : [];
            } else s = n && q(n) ? n : {};
            e[r] = jQuery.extendp(l, s, t);
        } else if (t !== a) try {
            e[r] = t;
        } catch (f) {
            e[r] = P(t, e, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
        }
        return e;
    }, function() {
        var i = "", u = "?", l = "function", f = "undefined", o = "object", t = "major", s = "model", n = "name", c = "type", r = "vendor", a = "version", d = "architecture", p = "console", m = "mobile", g = "tablet", y = "smarttv", h = "wearable", b = "embedded";
        e.Browser = {
            getAgent: function() {
                return navigator.userAgent;
            },
            get: function() {},
            getRegexMatches: function(s, t) {
                for (var r, o = [], e = 0; e < t.length; e += 2) {
                    for (var i = t[e], n = [], a = 0; a < i.length; a++) (r = i[a].exec(s)) && n.push(r);
                    n.length > 0 && o.push({
                        matches: n,
                        map: t[e + 1]
                    });
                }
                return o;
            },
            getRegexFirstMatch: function(o, t) {
                for (var a, e = 0; e < t.length; e += 2) for (var r = t[e], i = [], n = 0; n < r.length; n++) if (a = r[n].exec(o)) return [ a, t[e + 1] ];
                return [];
            },
            getBrowser: function() {
                var n = {};
                try {
                    var a = this.getAgent(), e = this.getRegexFirstMatch(a, this.regexes.browser);
                    if (e.length > 1) for (var t = 0; t < e[1].length; t++) n[e[1][t]] = e[0][t + 1];
                } catch (r) {}
                return n;
            },
            regexes: {
                browser: [ [ /(opera\smini)\/((\d+)?[\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i, /(opera).+version\/((\d+)?[\w\.]+)/i, /(opera)[\/\s]+((\d+)?[\w\.]+)/i ], [ n, a, t ], [ /\s(opr)\/((\d+)?[\w\.]+)/i ], [ [ n, "Opera" ], a, t ], [ /(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i ], [ [ n, "IE" ], a, t ], [ /(yabrowser)\/((\d+)?[\w\.]+)/i ], [ [ n, "Yandex" ], a, t ], [ /(comodo_dragon)\/((\d+)?[\w\.]+)/i ], [ [ n, /_/g, " " ], a, t ], [ /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i, /(uc\s?browser|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i ], [ n, a, t ], [ /((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i ], [ [ n, "Chrome" ], a, t ], [ /version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i ], [ a, t, [ n, "Mobile Safari" ] ], [ /version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i ], [ a, t, n ], [ /(konqueror)\/((\d+)?[\w\.]+)/i, /(webkit|khtml)\/((\d+)?[\w\.]+)/i ], [ n, a, t ], [ /(navigator|netscape)\/((\d+)?[\w\.-]+)/i ], [ [ n, "Netscape" ], a, t ], [ /(swiftfox)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i, /(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i ], [ n, a, t ] ]
            }
        };
    }(), i.viewportSize = {}, i.viewportSize.getHeight = function() {
        return ot("Height");
    }, i.viewportSize.getWidth = function() {
        return ot("Width");
    };
    var ot = function(e) {
        var o, l = e.toLowerCase(), s = i.document, t = s.documentElement;
        if (i["inner" + e] === a) o = t["client" + e]; else if (i["inner" + e] != t["client" + e]) {
            var n = s.createElement("body");
            n.id = "vpw-test-b", n.style.cssText = "overflow:scroll";
            var r = s.createElement("div");
            r.id = "vpw-test-d", r.style.cssText = "position:absolute;top:-1000px", r.innerHTML = "<style>@media(" + l + ":" + t["client" + e] + "px){body#vpw-test-b div#vpw-test-d{" + l + ":7px!important}}</style>", 
            n.appendChild(r), t.insertBefore(n, s.head), o = 7 == r["offset" + e] ? t["client" + e] : i["inner" + e], 
            t.removeChild(n);
        } else o = i["inner" + e];
        return o;
    }, n = e.Config = function(n, a) {
        return typeof a === t ? "string" == typeof n ? e.Config.SearchForKey(n) : e.Config.SearchForKeys(n) : e.Config.setKeyValue(n, a);
    };
    e.extend(e.Config, {
        host: "http://myuserjs.org",
        scopeLock: !1,
        secure: !1,
        browser: e.Browser.getBrowser(),
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
        debug: !1
    }), "object" == typeof i.jMOD_CONFIGURATION && (e.Config = e.extend(!0, e.Config, i.jMOD_CONFIGURATION)), 
    Object.defineProperties(e.Config, it);
    var U = function(n, a) {
        return typeof a === t ? e.Config.SearchForKeyI(n) : e.Config.setKeyValueI(n, a);
    };
    if (n.scanElement = function(r) {
        if (r && p(r)) {
            var i = {}, a = 0, n, t, s, c = /^(?:data-)?(.*?)$/i, o = r.attributes;
            for (a; a < o.length; a++) if (n = o[a].nodeName, n = c.exec(n)[1], t = o[a].value) {
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
                        f.error('Error parsing "' + o[a].nodeName + '"', r, l);
                        continue;
                    }
                    break;

                  default:
                    switch (n = n.split("-").join("."), s = U(n), typeof s) {
                      case "number":
                        U(n, parseInt(t));
                        break;

                      case "boolean":
                        U(n, "true" == t.trim().toLowerCase() ? !0 : !1);
                        break;

                      case "string":
                        U(n, t);

                      case "object":
                        try {
                            t = JSON.parse(t), t && U(n, t);
                        } catch (l) {
                            f.error('Error parsing "' + o[a].nodeName + '"', r, l);
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
    }, b.el) if (b.config = n.scanElement(b.el), b.el.id && "" != b.el.id.trim()) b.id = b.el.id; else {
        if (i.document.getElementById(b.id)) {
            for (var R = 0; i.document.getElementById(b.id + "-" + R); ) R++;
            b.id = b.id + "-" + R;
        }
        b.el.id = b.id;
    }
    e.API.ParseMetaData_Types = [], e.API.ParseMetaData_Types.push(function(l, e) {
        if ("history" == l.toLowerCase() && "object" == typeof e) {
            for (var i = /\(([0-9\.]+)\)\s+(.*?)$/i, n = {}, r = 0; r < e.length; r++) if (i.test(e[r])) {
                var s = i.exec(e[r]), o = s[1], c = s[2];
                typeof n[o] === t && (n[o] = []), n[o].push(c);
            }
            return n;
        }
        return a;
    }), e.API.ParseMetaData = function(o) {
        var i, s, r, n, a = {}, l = /@([\S]+)\s+(.*?)$/i;
        for ("string" == typeof o && (o = o.split(/\r?\n/i)), r = 0; r < o.length; r++) l.test(o[r]) && (n = l.exec(o[r]), 
        typeof a[n[1]] === t ? a[n[1]] = n[2] : "string" != typeof a[n[1]] ? a[n[1]].push(n[2]) : (i = a[n[1]], 
        a[n[1]] = [], a[n[1]].push(i), a[n[1]].push(n[2])));
        for (s in a) for (r = 0; r < e.API.ParseMetaData_Types.length; r++) if (typeof (i = e.API.ParseMetaData_Types[r](s, a[s])) !== t) {
            a[s] = i;
            break;
        }
        return a;
    };
    var h = e.ScriptInfo = function() {
        if (0 == arguments.length) return e.ScriptInfo.get();
        var t = typeof arguments[0];
        return 1 != arguments.length || "object" !== t && "string" != t ? a : e.ScriptInfo.GM_info(arguments[0]);
    };
    h.getURLInfo = function(t) {
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
    }, h.gotFileInfo = !1, h.getScriptFileInfo = function() {
        var i, o = {};
        if (h.gotFileInfo) return n("script.script_file_info");
        var s = Error();
        if (-1 == s.stack.indexOf(".user.js")) return a;
        var t = e.parseStack("" + s.stack);
        if (t.length > 0) for (var r = t.length - 1; r >= 0; r--) if ("" != t[r].fileName && "user.js" == t[r].fileExt.toLowerCase()) return i = t[r], 
        o.userscript_file_name = i.fileName, o.userscript_file_path = i.fullFileName, h.gotFileInfo = !0, 
        n("script.script_file_info", o), o;
        return a;
    }, Object.defineProperty(h, "InfoSet", {
        get: function() {
            return typeof n("script.script_info") !== t;
        }
    }), h.set = function(o) {
        var r = {};
        try {
            var d = h.getScriptFileInfo();
            typeof d !== t && (r = e.extend(r, d));
        } catch (f) {}
        try {
            var a, u, i;
            if (typeof o === t && typeof GM_info !== t && (o = {
                gm_info: GM_info,
                has_GM_info: !0,
                has_GM_getMetadata: typeof GM_getMetadata === t ? !1 : !0
            }), "object" == typeof o ? (a = _(o, [ "GM_info", "gm_info", "ginfo" ]), typeof a === t && typeof o.scriptSource !== t && (a = o), 
            typeof a !== t && typeof a.scriptMetaStr !== t && (u = a.scriptMetaStr)) : "string" == typeof o && (u = o), 
            typeof u !== t) {
                i = e.API.ParseMetaData(u);
                for (var s in i) typeof r[s] === t && (r[s] = i[s]);
            }
            if (typeof a !== t) {
                if (typeof a.script !== t) for (var s in a.script) typeof r[s] === t && (r[s] = a.script[s]);
                typeof a.uuid !== t ? r.gmUUID = a.uuid : typeof a.script.uuid !== t && (r.gmUUID = a.script.uuid), 
                typeof a.scriptHandler !== t ? "tampermonkey" == a.scriptHandler.toLowerCase() ? (r.script_handler = "Tampermonkey", 
                r.script_handler_version = a.version) : "greasemonkey" == a.scriptHandler.toLowerCase() && (r.script_handler = "Greasemonkey", 
                r.script_handler_version = a.version) : o.has_GM_info ? (r.script_handler = "Greasemonkey", 
                r.script_handler_version = a.version) : o.has_GM_getMetadata && (r.script_handler = "Scriptish");
            }
            if (typeof i !== t) {
                var l, s = tt(i, [ "downloadURL", "updateURL", "jModupdateURL", "jModUpdateURL", "jModdownloadURL", "jModDownloadURL" ], function(n, t) {
                    return e.ScriptInfo.getURLInfo(t);
                });
                if (typeof s !== t && (l = h.getURLInfo(i[s]))) n("script.username", l.username), 
                n("script.script_name", l.script_name), -1 != [ "meta", "metajs", "data" ].indexOf(l.get_type.toLowerCase()) && n("script.get_type", l.get_type.toLowerCase()); else {
                    var c;
                    (c = _(i, [ "jModusername", "jMod_username" ])) && n("script.username", c), (c = _(i, [ "jModscriptname", "jMod_script_name" ])) && n("script.script_name", c);
                }
                if (typeof i.jMod != t) try {
                    var p = JSON.parse(i.jMod);
                    p && e.extend(!0, e.Config, p);
                } catch (f) {
                    C(f, "ScriptInfo.set", "Error parsing options in MetaBlock");
                }
            }
        } catch (f) {
            C(f, "ScriptInfo.set");
        }
        return Object.defineProperty(e.Config.script, "script_info", {
            value: Object.freeze(r),
            writable: !1,
            enumerable: !0,
            configurable: !1
        }), Object.freeze(r);
    }, h.get = function() {
        var n = e.Config.script.script_info;
        return typeof n != t ? n : h.set.apply(this, arguments);
    }, t == typeof e.Config.script.script_info && t != typeof GM_info && h.set(), e._call = function() {
        var i, r, a, o, s = arguments.length;
        try {
            h.gotFileInfo || h.getScriptFileInfo();
        } catch (l) {}
        try {
            t === typeof e.Config.script.script_info && h.get();
        } catch (l) {}
        try {
            if (s > 0) {
                if (a = arguments[0], i = typeof a, "string" == i) {
                    if (1 == s) {
                        if (t !== typeof (r = n(a))) return r;
                    } else {
                        switch (o = arguments[1], a) {
                          case "get":
                            return n(o);

                          case "set":
                            return n(o, arguments[2]);
                        }
                        if ("function" == typeof o && typeof e.Events.e[a] !== t) return e.Events.addListener.apply(e.Events, u.call(arguments));
                        if (2 == s && t !== typeof (r = n(a)) && typeof r == typeof o) return n(a, o);
                    }
                    if (-1 != e.log.fnList.join("|").toLowerCase().split("|").indexOf(a.toLowerCase()) && "function" == typeof (r = ft.call(e.log, a))) return r.apply(e.log, u.call(arguments, 1));
                } else if ("object" == i) {
                    if (!p(a)) {
                        if (typeof tt(a, [ "GM_info", "gm_info", "ginfo" ]) !== t) return h.set.apply(h, u.call(arguments));
                        if (typeof a.scriptSource !== t && typeof a.scriptMetaStr !== t) return h.set.apply(h, u.call(arguments));
                    }
                } else if ("function" == i && 1 == s) return e.onReady = a, a;
                n("debug") && e.Warning("Unable to process jMod() call:", u.call(arguments));
            }
        } catch (l) {}
    }, e.$ = function(a, n, r) {
        t === typeof n && (n = i.document);
        try {
            if (e.jQueryAvailable && !0 !== r) try {
                return $(a, n).first()[0];
            } catch (o) {
                return;
            }
            if ("string" != typeof a) return;
            return n.querySelector(a);
        } catch (o) {
            e.Exception("jMod.Query", "Error!", o);
        }
    }, e.$$ = function(a, n, o) {
        n || (n = t !== typeof document ? document : i.document);
        try {
            if (e.jQueryAvailable && !0 !== o) try {
                return $(a, n).toArray();
            } catch (s) {
                return;
            }
            if ("string" != typeof a) return;
            var r = n.querySelectorAll(a);
            return r ? [].map.call(r, function(e) {
                return e;
            }) : [];
        } catch (s) {
            e.Exception("jMod.Query", "Error!", s);
        }
    }, e.Element = function(t, r) {
        try {
            var n = u.call(arguments);
            switch (L(t)) {
              case "string":
                if ("function" == typeof e.Element[command]) return e.Element._call.apply(e.Element, arguments);
                break;

              case "map":
              case "object":
                return 1 == n.length ? g.apply(e.Element, arguments) : g(n);

              default:
                e.Element.isElement(t);
            }
        } catch (a) {
            C(a, "jMod.Element");
        }
    }, e.Element._call = function(t) {
        return "function" == typeof e.Element[t] ? e.Element[t].apply(e.Element, u.call(arguments, 1)) : a;
    }, e.Element.isElement = p;
    var j = e.Element.hasClass = function(e, t) {
        var n = e.className.split(" ");
        return -1 == n.indexOf(t) ? !1 : !0;
    }, Vt = e.Element.hasClasses = function(r, e) {
        var n = [], o = r.className.split(" "), t = "string" == typeof e ? e.split(" ") : e;
        for (var a in t) -1 != o.indexOf(t[a]) && n.push(t[a]);
        return n;
    }, Dt = e.Element.missingClasses = function(r, e) {
        var n = [], o = r.className.split(" "), t = "string" == typeof e ? e.split(" ") : e;
        for (var a in t) -1 == o.indexOf(t[a]) && n.push(t[a]);
        return n;
    }, T = e.Element.addClass = function(e, t) {
        return j(e, t) || (e.className = (e.className + " " + t).trim()), e;
    }, _t = e.Element.addClasses = function(t, n) {
        for (var a = "string" == typeof n ? n.split(" ") : n, r = t.className.split(" "), e = 0; e < a.length; e++) -1 == r.indexOf(a[e]) && r.push(a[e]);
        return t.className = r.join(" "), t;
    }, S = e.Element.removeClass = function(e, a) {
        var r = e.className, t = r.split(" "), n = t.indexOf(a);
        return -1 == n ? e : (t.splice(n, 1), e.className = t.join(" "), e);
    }, Pt = e.Element.removeClasses = function(e, a) {
        var t;
        t = "string" == typeof a ? u.call(arguments, 1) : a;
        var o = e.className, n = o.split(" ");
        for (var i in t) {
            var r = n.indexOf(t[i]);
            -1 != r && n.splice(r, 1);
        }
        return e.className = n.join(" "), e;
    }, Ht = function(e, t) {
        for (var n in t) e.setAttribute(n, t[n]);
        return e;
    }, ct = function(e, t) {
        return e.hasAttribute(t);
    }, xt = function(n, e) {
        r = [], "string" == typeof e && (e = e.split(" "));
        for (var t = 0; t < e.length; t++) n.hasAttribute(e[t]) && r.push(e[t]);
        return r;
    }, E = function(e, t) {
        return e.getAttribute(t);
    }, N = e.Element.appendChild = function(e, n) {
        try {
            if (p(e) || "object" != typeof e || e.type === a) {
                if (typeof n === t || null === n) return e;
                if (p(n)) e.appendChild(n); else switch (L(n)) {
                  case t:
                  case "null":
                    break;

                  case "array":
                    for (var o = 0; o < n.length; o++) e = N(e, n[o]);
                    break;

                  case "object":
                  case "map":
                    var i = g(n);
                    i && e.appendChild(i);
                    break;

                  case "string":
                  case "number":
                  case "symbol":
                  case "boolean":
                  default:
                    var s = document.createElement("div");
                    s.innerHTML = n;
                    for (var l = s.childNodes, o = 0; o < l.length; o++) e.appendChild(l[o]);
                }
            } else {
                var r;
                e.innerHTML !== a && (r = "innerHTML"), e.text !== a && (r = "text"), r ? "array" == L(e[r]) ? e[r].push(n) : e[r] = [ e[r], n ] : e.innerHTML = [ n ];
            }
        } catch (c) {
            C(c, "jMod.Element.appendChild");
        } finally {
            return e;
        }
    };
    const J = [ "checked", "title", "async", "defer", "src", "onerror", "onload", "responseCallback", "value", "max", "min" ];
    var g = e.Element.createNewElement = function(e) {
        var n, i = e.EventListeners || e.eventListeners, r = document.createElement(e.type || "div");
        if (e.id !== a && (r.id = e.id), e.className !== a ? r.className = e.className : e["class"] !== a && (r.className = e["class"]), 
        "string" == typeof e.style) r.style = e.style; else if ("object" == typeof e.style) for (n in e.style) r.style[n] = e.style[n];
        for (n = 0; n < J.length; n++) e[J[n]] !== a && (r[J[n]] = e[J[n]]);
        if (e.attributes !== a) for (n in e.attributes) typeof e.attributes[n] !== t && null !== e.attributes[n] && r.setAttribute(n, e.attributes[n]);
        if (i) for (var o in i) if ("function" == typeof i[o]) r.addEventListener(o, i[o]); else if ("object" == typeof i[o]) {
            var l = i[o].useCapture || i[o].Capture || i[o].capture || !1, s = i[o].callback || i[o]["function"];
            if (s) if ("array" == L(s)) for (n in s) r.addEventListener(o, s[n], l); else r.addEventListener(o, s, l);
        }
        return N(r, _(e, [ "innerHTML", "text" ])), r;
    }, gt = e.Element.getOffset = function(t) {
        var n = t.getBoundingClientRect(), e = t.ownerDocument, a = e.documentElement, r = null != e && e === e.window ? e : 9 === e.nodeType && e.defaultView;
        return {
            top: parseInt(n.top + r.pageYOffset - a.clientTop),
            left: parseInt(n.left + r.pageXOffset - a.clientLeft),
            bottom: n.bottom,
            height: parseInt(n.height || parseInt(t.offsetHeight) - parseInt(t.clientHeight) + parseInt(t.scrollHeight)),
            width: parseInt(t.offsetWidth)
        };
    }, Mt = e.Element.isNamespaced = function(n, a) {
        for (var t = n; t.parentElement; ) if (t = t.parentElement, e.Element.hasClass(t, a)) return !0;
        return !1;
    }, It = e.Element.findParentWithClass = function(n, a) {
        for (var t = n; t.parentElement; ) if (t = t.parentElement, e.Element.hasClass(t, a)) return t;
    };
    +function() {
        function o(e) {
            return t !== typeof e && t !== typeof e.timeStamp ? !0 : !1;
        }
        function c(e) {
            return "console" == L(e) ? !0 : t === typeof e || o(e) || t !== typeof e.dirxml || t === typeof e.trace ? !1 : !0;
        }
        function g(e) {
            return t === typeof e || o(e) || c(e) || t !== typeof e.dirxml || t !== typeof e.exception ? !1 : !0;
        }
        function d(e) {
            return e(f) ? f : e(this.console) ? this.console : e(window.console) ? window.console : e(i.console) ? i.console : e(i.window.console) ? i.window.console : a;
        }
        function y() {
            return d(o);
        }
        function h() {
            return d(g);
        }
        function v() {
            return d(c);
        }
        function b(e) {
            return -1 == n("API.log.disabled").indexOf(e) && n("API.log.verbosity_level") > 1;
        }
        var r, m = {
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
        }, p = [ [ "Error", "ERROR" ], [ "logError", "ERROR" ], [ "Exception", "EXCEPTION" ], [ "Warning", "WARNING" ], [ "Info", "INFO" ], [ "Log", "LOG" ], [ "Debug", "DEBUG" ] ], s = [ "assert", "clear", "count", "dir", "dirxml", "group", "groupCollapsed", "groupEnd", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace" ], l = [ "Debug", "Log", "Info", "Warning", "logError", "Exception" ];
        for (e.log = e.API.log = {
            OUTPUT_TYPES: m,
            fb: a,
            c2: a,
            wc: a,
            fnList: [].concat(l, s),
            updateFB: function(e) {
                o(e) && (n("API.log.debug") && f.info("jMod.API.log - Firebug Object: ", e), this.fb = e);
            },
            updateC2: function(e) {
                g(e) && (n("API.log.debug") && f.info("jMod.API.log - Console2 Object: ", e), this.c2 = e);
            },
            updateWC: function(e) {
                c(e) && (n("API.log.debug") && f.info("jMod.API.log - Web Console Object: ", e), 
                this.wc = e);
            },
            UpdateAll: function() {
                this.updateFB(y()), this.updateC2(h()), this.updateWC(v());
            },
            ScopedConsoleCommand: function(n, a) {
                var r = -1 != [ "debug", "log", "info", "warn", "error", "exception" ].indexOf(n) && "string" == typeof a && /(?:\%s|\%c|\%o|\%d|\%f|\%\.\df|\%i)/.test(a), e = r || t != this.fb && t != this.fb[n] ? this.fb : this.wc;
                try {
                    switch (arguments.length) {
                      case 1:
                        e[n].call(e);
                        break;

                      case 2:
                        e[n].call(e, arguments[1]);
                        break;

                      case 3:
                        e[n].call(e, arguments[1], arguments[2]);
                        break;

                      case 4:
                        e[n].call(e, arguments[1], arguments[2], arguments[3]);
                        break;

                      case 5:
                        e[n].call(e, arguments[1], arguments[2], arguments[3], arguments[4]);
                        break;

                      case 6:
                        e[n].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                        break;

                      case 7:
                        e[n].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                        break;

                      case 8:
                        e[n].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
                        break;

                      case 9:
                        e[n].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]);
                        break;

                      case 10:
                        e[n].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);
                        break;

                      case 11:
                        e[n].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10]);
                        break;

                      case 12:
                        e[n].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11]);
                        break;

                      case 13:
                        e[n].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12]);
                        break;

                      case 14:
                        e[n].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13]);
                        break;

                      case 15:
                        e[n].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14]);
                        break;

                      case 16:
                        e[n].call(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14], arguments[15]);
                    }
                } catch (o) {}
            },
            ConsoleCommand: function(e, r) {
                try {
                    var a = u.call(arguments, 1), o = P(a, i, {
                        cloneFunctions: !0,
                        wrapReflectors: !0
                    }), s = -1 != [ "debug", "log", "info", "warn", "error", "exception" ].indexOf(e) && "string" == typeof r && /(?:\%s|\%c|\%o|\%d|\%f|\%\.\df|\%i)/.test(r);
                    try {
                        typeof this.fb !== t && typeof this.fb[e] !== t && n("API.log.Firebug") ? this.fb[e].apply(this.fb, a) : !s && typeof this.wc !== t && typeof this.wc[e] !== t && n("API.log.WebConsole") && this.wc[e].apply(this.wc, a);
                    } catch (l) {
                        typeof this.fb !== t && typeof this.fb[e] !== t && n("API.log.Firebug") ? this.fb[e].apply(this.fb, o) : !s && typeof this.wc !== t && typeof this.wc[e] !== t && n("API.log.WebConsole") && this.wc[e].apply(this.wc, o);
                    }
                } catch (l) {
                    f.error(l);
                }
            },
            outputMessage: function(e, t) {
                e.level <= n("API.log.verbosity_level") && this.ConsoleCommand.apply(this, [ e.value ].concat(u.call(arguments, 1)));
            },
            fmt: {
                timePatt: "%.3fms",
                time: "font-weight:bold;font-size:120%;color:red;",
                stchange: "font-weight:bold;font-size:130%;color:blue;"
            }
        }, r = 0; r < p.length; r++) e.API.log[p[r][0]] = function(t) {
            return function() {
                return this.outputMessage.apply(this, [ m[t] ].concat(u.call(arguments)));
            }.bind(e.API.log);
        }(p[r][1]);
        for (r = 0; r < s.length; r++) e.API.log[s[r]] = function(t) {
            return function() {
                return b(t) ? this.ConsoleCommand.apply(this, [ t ].concat(u.call(arguments))) : a;
            }.bind(e.API.log);
        }(s[r]);
        for (r = 0; r < l.length; r++) e[l[r]] = e.log[l[r]].bind(e.API.log);
        e.API.logFormatBuilder = function() {
            this.args = [], this.add = function(e, r, i) {
                var o = t === typeof e;
                typeof r === t && (r = typeof e);
                var n;
                switch (r) {
                  case "s":
                  case "%s":
                    "\n" == e || " \n" == e ? (n = " \n", e = a, i = a, o = !1) : n = "%s";
                    break;

                  case "string":
                    n = e, e = a, o = !1;
                    break;

                  case "o":
                  case "%o":
                  case "object":
                  default:
                    n = "%o";
                }
                this.args.push({
                    valueIsUndefined: o,
                    value: e,
                    fmtString: n,
                    style: i
                });
            }, this.build = function() {
                for (var n = "", t = [], e = 0; e < this.args.length; e++) n += (a !== this.args[e].style ? "%c" : "") + this.args[e].fmtString, 
                a !== this.args[e].style && t.push("" != this.args[e].style ? this.args[e].style : " "), 
                (a !== this.args[e].value || this.args[e].valueIsUndefined) && t.push(this.args[e].value);
                return [ n ].concat(t);
            };
        }, e.log.UpdateAll();
    }();
    var C = function(a, r, o) {
        var n = "", f = "http://myuserjs.org/img/favicon/favicon.png", i = 'font-size:175%;background-image:url("' + f + '");background-size:auto 75%;background-repeat: no-repeat;background-position:left center;', s = 'font-size:175%;font-weight:300;font-family:"Sansation","Open Sans",Arial;', l = "color:#000;font-size:125%;", c = "color:blue;";
        typeof a !== t && null !== a ? arguments.length <= 3 ? e.log.ScopedConsoleCommand.call(e.log, "error", "%c%s%cjMod Error%c - %c%s \n%s \n%c%s - %c(line %d)", n + i, "  ", n + s, " ", n + l, r || " ", o || " ", n + " ", a.message, n + c, a.lineNumber, a) : e.log.ScopedConsoleCommand.call(e.log, "error", "%c%s%cjMod Error%c - %c%s \n%s \n%c%s - %c(line %d)", n + i, "  ", n + s, " ", n + l, r || " ", o || " ", n + " ", a.message, n + c, a.lineNumber, a, arguments[3]) : e.log.ScopedConsoleCommand.apply(e.log, [ "error", "%c%s%cjMod Error%c - %c%s \n%s", n + i, "  ", n + s, " ", n + l, r || " ", o || " " ].concat(u.call(arguments, 3)));
    }, kt = function(i) {
        var r = "", s = "http://myuserjs.org/img/favicon/favicon.png", l = 'font-size:175%;background-image:url("' + s + '");background-size:auto 75%;background-repeat: no-repeat;background-position:left center;', c = 'font-size:175%;font-weight:300;font-family:"Sansation","Open Sans",Arial;', f = "color:#000;font-size:125%;", t = u.call(arguments, 1), a = "%c%s%cjMod%c - %c%s", o = [];
        t.length > 0 && (a += " \n%c");
        for (var n = 0; n < t.length; n++) "number" == typeof t[n] ? (a += parseInt(t[n]) === t[n] && t[n] === +t[n] && t[n] !== (0 | t[n]) ? "%.2f \n" : "%d \n", 
        o.push(t[n])) : "string" == typeof t[n] ? (a += "%s \n", o.push(t[n])) : (a += "%o\n", 
        o.push(t[n]));
        e.Info.apply(e.log, [ a, r + l, "  ", r + c, " ", r + f, i || " ", r + " " ].concat(o));
    }, A = function(a, r, o) {
        var i = (r || "") + e.timeElapsed.toFixed(2) + "ms" + (o || ""), n = " ", s = "http://myuserjs.org/img/favicon/favicon.png", l = 'font-size:175%;background-image:url("' + s + '");background-size:auto 75%;background-repeat: no-repeat;background-position:left center;', c = 'font-size:175%;font-weight:300;font-family:"Sansation","Open Sans",Arial;', u = "color:#000;font-size:125%;", t = new e.API.logFormatBuilder();
        t.add("  ", "%s", n + l), t.add("jMod", "string", n + c), t.add(" - ", "string", n), 
        t.add(a || " ", "%s", n + u), t.add(" ", "string"), t.add(i, "%s", n + e.log.fmt.time), 
        e.Info.apply(e.log, t.build());
    };
    e.log.Info("Loading jMod API v" + e.version + " " + e.build_type + (e.debug ? " (debug enabled)" : "") + " - " + new Date(parseInt(e.build_time))), 
    e.debug && (A("jMod Init Start Time"), e.log.group("jMod Start"), e.log.group("jMod Initialize"), 
    b.el && e.Info("CurrentRunningScript", b)), e.Events = {
        e: {},
        fired: {},
        addEvent: function(n, a) {
            this.e[n] = {
                recordEvent: typeof a !== t ? a : !0,
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
        addListener: function(e, a, n) {
            this.e[e].listeners.push(a), n = typeof n !== t ? n : !0, n && typeof this.fired[e] !== t && typeof this.fired[e].args !== t && a.apply(this.fired[e]._this, this.fired[e].args);
        },
        fire: function(e, n) {
            if (typeof this.e[e] !== t) {
                typeof this.fired[e] === t && (this.fired[e] = {
                    count: 0,
                    args: a,
                    _this: null
                });
                var r, o = null;
                "object" == typeof n && typeof n._this !== t && typeof n.args !== t ? (o = n._this, 
                r = n.args) : r = u.call(arguments, 1), this.e[e].recordEvent && (this.fired[e].args = r, 
                this.fired[e]._this = o);
                for (var i = []; R = this.e[e].listeners.pop(); ) R.apply(o, r) || i.push(R);
                this.e[e].listeners = i, this.fired[e].count++;
            }
        }
    }, e.Events.addEvent("onDOMReady"), e.Events.addEvent("onReady"), e.Events.addEvent("onPageReady"), 
    e.Events.addEvent("onPerformanceReady"), e.Events.addEvent("load"), e.Events.addEvent("DOMContentLoaded"), 
    e.Events.addEvent("onreadystatechange"), e.Events.addEvent("afterscriptexecute", !1), 
    e.Events.addEvent("beforescriptexecute", !1);
    var at = function(n) {
        var e = {};
        this.events = n || [], this.add = function(n, a, r) {
            -1 == this.events.indexOf(a) && this.events.push(a), typeof e[n] === t && (e[n] = {}), 
            typeof e[n][a] === t && (e[n][a] = []), e[n][a].push(r);
        }, this.addAll = function(t, n) {
            for (var e in this.events) "function" == typeof t[this.events[e]] && this.add(n, this.events[e], t[this.events[e]]);
        }, this.fire = function(o, n, i, s) {
            var r, a, n = e[n || "0"];
            try {
                if (typeof n !== t && typeof (a = n[o]) !== t) for (r in a) if (!1 === a[r].apply(i || null, s || [])) return f.log("fire canceled"), 
                !1;
            } catch (l) {
                C(l, "jMod.EventsClass.fire");
            }
        };
    }, Tt = e.API.addStyle = function(e) {
        if (typeof e != t && "" != e) if (typeof GM_addStyle !== t) GM_addStyle(e); else if (heads = document.getElementsByTagName("head")) {
            var n = document.createElement("style");
            try {
                n.innerHTML = e;
            } catch (a) {
                n.innerText = e;
            }
            return n.type = "text/css", heads[0].appendChild(n);
        }
        return null;
    };
    e.API.addScript = function(a, o, i, s, l, c) {
        var n, r, e;
        if (e = "object" == typeof a ? a : {
            js: a,
            src: o,
            id: i,
            type: s,
            async: l,
            defer: c
        }, r = document.getElementsByTagName("head")) {
            if (n = document.createElement("script"), typeof e.id !== t) try {
                n.id = e.id;
            } catch (u) {}
            if (typeof e.async !== t && (n.async = e.async), typeof e.defer !== t && (n.defer = e.defer), 
            typeof e.onload !== t && (n.onload = e.onload), typeof e.onerror !== t && (n.onerror = e.onerror), 
            n.type = e.type || "text/javascript", typeof e.js != t && null != e.js && "" != e.js) try {
                n.innerHTML = e.js;
            } catch (u) {
                n.innerText = e.js;
            }
            if (typeof e.src != t && null != e.src && "" != e.src) try {
                n.src = e.src;
            } catch (u) {}
            try {
                return r[0].appendChild(n);
            } catch (u) {}
        }
        return null;
    }, e.API.contentEval = function(e) {
        "function" == typeof e && (e = "(" + e + ")();");
        var t = document.createElement("script");
        t.setAttribute("type", "application/javascript"), t.textContent = e, i.document.body.appendChild(t), 
        i.document.body.removeChild(t);
    }, e.API.GM_Storage = {
        getValue: function(e, r) {
            return typeof GM_getValue !== t ? GM_getValue(n("API.Storage.prefix") + e, r) : a;
        },
        setValue: function(e, r) {
            return typeof GM_setValue !== t ? GM_setValue(n("API.Storage.prefix") + e, r) : a;
        },
        deleteValue: function(e) {
            return typeof GM_deleteValue !== t ? GM_deleteValue(n("API.Storage.prefix") + e) : a;
        }
    }, e.API.localStorage = {
        getValue: function(t, a) {
            var e = this.stor.getItem(n("API.Storage.prefix") + t);
            return null !== e ? e : a;
        },
        setValue: function(e, t) {
            return this.stor.setItem(n("API.Storage.prefix") + e, t);
        },
        deleteValue: function(e) {
            return this.stor.removeItem(n("API.Storage.prefix") + e);
        }
    }, Object.defineProperty(e.API.localStorage, "stor", {
        get: function() {
            return localStorage ? localStorage : i.localStorage ? i.localStorage : window.localStorage;
        },
        enumerable: !1
    }), e.getValue = function(e, a) {
        return "GM_Storage" == n("API.Storage.engine") && t != typeof GM_getValue ? M.GM_Storage.getValue.apply(M.GM_Storage, arguments) : M.localStorage.getValue.apply(M.localStorage, arguments);
    }, e.setValue = function(e, a) {
        return "GM_Storage" == n("API.Storage.engine") && t != typeof GM_setValue ? M.GM_Storage.setValue.apply(M.GM_Storage, arguments) : M.localStorage.setValue.apply(M.localStorage, arguments);
    }, e.deleteValue = function(e) {
        return "GM_Storage" == n("API.Storage.engine") && t != typeof GM_deleteValue ? M.GM_Storage.deleteValue.apply(M.GM_Storage, arguments) : M.localStorage.deleteValue.apply(M.localStorage, arguments);
    }, e.API.Date = function(t, n) {
        switch (t) {
          case "parseUTC":
          case "parseUTCDate":
            return e.API.Date.parseUTCDate.apply(e.API.Date, u.call(arguments, 1));
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
        } else if ("date" == L(t)) return new Date(t);
        return null;
    }, e.API.Date.getScriptTimeDiff = function(n) {
        var a;
        if ("string" == typeof n ? a = e.API.Date.parseUTCDate(n) : "object" == typeof n && typeof n.scriptUploadTimestamp !== t && (a = e.API.Date.parseUTCDate(n.scriptUploadTimestamp)), 
        !a) return null;
        var r = Date.now(), o = Math.abs(r - a), i = o / 1e3 / 60, s = i / 60, l = s / 24;
        return {
            date: a,
            now: r,
            milliseconds: o,
            minutes: i,
            hours: s,
            days: l
        };
    }, e.Config.Tooltip = e.extend({
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
    var et = "Tooltip.containerId", D = "Tooltip.attributeNames.id", k = "Tooltip.attributeNames.tooltip", K = "Tooltip.attributeNames.placement", Lt = "Tooltip.attributeNames.margin", x = "Tooltip.classNames.tooltipTarget", Y = "Tooltip.classNames.tooltip", l = e.Tooltip = function(t, n) {
        p(t) && e.Tooltip.AddTooltipsToElement.apply(e.Tooltip, arguments);
    }, z;
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
                return l.Initialized || l.init(), z || (z = document.getElementById(n(et))), z;
            },
            set: function(e) {
                z = e;
            }
        },
        get: {
            value: function(e) {
                var a, r, o, t = n(D);
                if (p(e)) return j(e, n(Y)) ? document.querySelector("." + n(x) + " [" + t + '="' + e.id + '"]') : (j(e, n(x)) && e.hasAttribute(t) ? a = e.getAttribute(t) : this.TooltipContainer && null !== (o = this.TooltipContainer.querySelector("." + n(x) + " [" + t + "]")) && (a = o.getAttribute(t)), 
                document.getElementById(a));
                if ("string" == typeof e) {
                    if (null !== (r = document.getElementById(e))) return r;
                } else if ("number" == typeof e && this.TooltipContainer && this.TooltipContainer.childElementCount > e) return tooltipContainer.children[e];
                return null;
            }.bind(l)
        }
    });
    var G = 200;
    l.MoveTooltip = function(e, t, a) {
        "top" in a ? t.style.top = a.top : "bottom" in a && (t.style.bottom = a.bottom), 
        "left" in a ? t.style.left = a.left : "right" in a && (t.style.right = a.right);
        var r = n("Tooltip.attributeNames.margin");
        e.hasAttribute(r + "-top") && (t.style.marginTop = e.getAttribute(r + "-top")), 
        e.hasAttribute(r + "-left") && (t.style.marginLeft = e.getAttribute(r + "-left")), 
        e.hasAttribute(r + "-bottom") && (t.style.marginBottom = e.getAttribute(r + "-bottom")), 
        e.hasAttribute(r + "-right") && (t.style.marginRight = e.getAttribute(r + "-right"));
    }, l.MoveTooltipToTarget = function(i, o, c) {
        var t, a, r, u, f;
        if (j(i, n(Y))) t = i; else {
            if (!i.hasAttribute(n(D))) return;
            t = document.getElementById(i.getAttribute(n(D)));
        }
        var s = o.getAttribute(n(K)) || "top", e = gt(o);
        switch (s) {
          case "left-top":
            a = parseInt(e.top), r = e.left - parseInt(t.offsetWidth), l.MoveTooltip(o, t, {
                top: a + "px",
                left: r + "px"
            });
            break;

          case "left-bottom":
            a = e.top + e.height - parseInt(t.offsetHeight), r = e.left - parseInt(t.offsetWidth), 
            l.MoveTooltip(o, t, {
                top: a + "px",
                left: r + "px"
            });
            break;

          case "left":
            a = e.top + parseInt(e.height / 2) - parseInt(parseInt(t.offsetHeight) / 2), r = e.left - parseInt(t.offsetWidth), 
            l.MoveTooltip(o, t, {
                top: a + "px",
                left: r + "px"
            });
            break;

          case "right-top":
            a = parseInt(e.top), r = e.left + e.width, l.MoveTooltip(o, t, {
                top: a + "px",
                left: r + "px"
            });
            break;

          case "right-bottom":
            a = e.top + e.height - parseInt(t.offsetHeight), r = e.left + e.width, l.MoveTooltip(o, t, {
                top: a + "px",
                left: r + "px"
            });
            break;

          case "right":
            a = e.top + parseInt(e.height / 2) - parseInt(t.offsetHeight / 2), r = e.left + e.width, 
            l.MoveTooltip(o, t, {
                top: a + "px",
                left: r + "px"
            });
            break;

          case "bottom-left":
            a = e.top + e.height, r = e.left, l.MoveTooltip(o, t, {
                top: a + "px",
                left: r + "px"
            });
            break;

          case "bottom-right":
            a = e.top + e.height, r = e.left + e.width - parseInt(t.offsetWidth), l.MoveTooltip(o, t, {
                top: a + "px",
                left: r + "px"
            });
            break;

          case "bottom":
            a = e.top + e.height, r = e.left + parseInt(e.width / 2) - parseInt(parseInt(t.offsetWidth) / 2), 
            l.MoveTooltip(o, t, {
                top: a + "px",
                left: r + "px"
            });
            break;

          case "top-left":
            a = e.top - parseInt(t.offsetHeight), r = e.left, l.MoveTooltip(o, t, {
                top: a + "px",
                left: r + "px"
            });
            break;

          case "top-right":
            a = e.top - parseInt(t.offsetHeight), r = e.left + e.width - parseInt(t.offsetWidth), 
            l.MoveTooltip(o, t, {
                top: a + "px",
                left: r + "px"
            });
            break;

          case "top":
          default:
            a = e.top - parseInt(t.offsetHeight), r = e.left + parseInt(e.width / 2) - parseInt(parseInt(t.offsetWidth) / 2), 
            l.MoveTooltip(o, t, {
                top: a + "px",
                left: r + "px"
            });
        }
    }, l.HideAllExcept = function(i) {
        for (var r = [], t, o = e.$$(".jmod-na ." + n(Y) + ".in"), a = 0; a < o.length; a++) t = o[a], 
        "block" == t.style.display && t !== i && (S(t, "in"), r.push(t));
        setTimeout(function(t) {
            for (var e = 0; e < t.length; e++) j(t[e], "in") || (t[e].style.display = "none");
        }, G, r);
    }, l.handler = {
        mouseenter: function(i) {
            var a = this.getAttribute(n(D)), r = this.getAttribute(n(k)), e = this.getAttribute(n(K)) || "top", o = l.TooltipContainer;
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
            var t = document.getElementById(a);
            t || (t = g({
                type: "div",
                id: a,
                className: n(Y) + " " + e + " fade slow",
                style: {
                    display: "none"
                },
                innerHTML: [ '<div class="tooltip-arrow"></div>', '<div class="tooltip-inner">' + r + "</div>" ]
            }), t.addEventListener("mouseenter", function(t) {
                var e = window.getComputedStyle(this, null).getPropertyValue("opacity");
                e > .2 && (T(this, "in"), l.HideAllExcept(this));
            }), t.addEventListener("mouseleave", function(e) {
                var t = window.getComputedStyle(this, null).getPropertyValue("opacity");
                S(this, "in"), setTimeout(function(e) {
                    j(e, "in") || (e.style.display = "none");
                }, G, this);
            }), t.addEventListener("click", function(e) {
                S(this, "in"), setTimeout(function(e) {
                    j(e, "in") || (e.style.display = "none");
                }, G, this);
            }), o.appendChild(t)), l.HideAllExcept(t), t.style.display = "block", setTimeout(function(t, e) {
                T(e, "in"), l.MoveTooltipToTarget(e, t);
            }, 1, this, t);
        },
        mouseleave: function(t) {
            var e = l.get(this);
            e && (S(e, "in"), setTimeout(function(e) {
                j(e, "in") || (e.style.display = "none");
            }, G, e));
        },
        scroll: function(i) {
            var t, o, a;
            t = Mt(this, "jmod-na") ? e.$$("." + n(x) + "[" + n(k) + "]", this) : e.$$(".jmod-na ." + n(x) + "[" + n(k) + "]", this);
            for (var r = 0; r < t.length; r++) o = t[r].getAttribute(n(D)), a = document.getElementById(o), 
            a && "block" == a.style.display && l.MoveTooltipToTarget(a, t[r]);
        }
    }, l.getTooltipsFromElement = function(o) {
        for (var i, r = [], a = e.$$("." + n(x) + "[" + n(k) + "]", o), t = 0; t < a.length; t++) a[t].getAttribute(n(k)) && r.push(a[t]);
        return r;
    }, l.AddTooltipsToElement = function(r) {
        for (var a = l.getTooltipsFromElement(r), e = 0; e < a.length; e++) {
            a[e].setAttribute(n(D), "jmod-tooltip-" + l.Count++), a[e].addEventListener("mouseenter", l.handler.mouseenter), 
            a[e].addEventListener("mouseleave", l.handler.mouseleave);
            for (var t = a[e]; t.parentElement; ) t = t.parentElement, t.hasAttribute("data-jmod-scroll-event") || (t.setAttribute("data-jmod-scroll-event", !0), 
            t.addEventListener("scroll", l.handler.scroll));
        }
        r.addEventListener("scroll", l.handler.scroll);
    }, l.init = function() {
        l.Initialized = !0;
        var e = document.getElementById(n(et));
        null == e && (e = document.createElement("div"), e.id = n(et), e.className = "jModTooltipContainer jmod-na jmod-fa", 
        document.body.appendChild(e), z = e);
    }, e.CSS = ".jmod-na .fade.slow {transition: opacity " + (G / 1e3).toFixed(2) + "s linear 0s;}", 
    e.Config.Notifications = {
        enabled: !0
    };
    var s = e.Notification = function(t, i) {
        if (!n("Notifications.enabled")) return !1;
        if (e.Notification.Initialized || e.Notification.init(), "string" == typeof t) switch (t.toLowerCase()) {
          case "get":
          case "getelement":
            return e.Notification.getElement.apply(e.Notification, u.call(arguments, 1));

          case "getid":
          case "getelementid":
            return e.Notification.getElementId.apply(e.Notification, u.call(arguments, 1));

          case "updatenotification":
            return e.Notification.UpdateNotification.apply(e.Notification, u.call(arguments, 1));
        } else if ("object" == typeof t) switch ((t.type || "").toLowerCase()) {
          case "small":
            var r = e.Notification("getElement", "notificationsSmallWrapper"), a = Ct(t);
            r.appendChild(a), e.Notification.Events.addAll(t, e.Notification.count), e.Notification.count++, 
            e.Notification.SmallCount++;
            break;

          case "large":
          default:
            var o = e.Notification("getElement", "notificationsLargeWrapper"), a = mt(t);
            o.appendChild(a), e.Notification.Events.addAll(t, e.Notification.count), e.Notification.count++, 
            e.Notification.LargeCount++;
        }
    };
    s.UpdateNotification = function(l) {
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
        }, l);
        null == e.script_name && (e.script_name = n("script.script_name"));
        var c = e.title.replace("%SCRIPTNAME%", e.script_name).replace("%VERSION%", e.version).replace("%TIME%", e.time), u = e.body.replace("%SCRIPTNAME%", e.script_name).replace("%VERSION%", e.version).replace("%TIME%", e.time);
        e.install.href && null != e.install.href && "" != e.install.href || (e.install.href = n([ "script.script_info.jModdownloadURL", "script.script_info.downloadURL" ]), 
        typeof e.install.href === t && (e.install.href = "javascript:void(0);"));
        var a = document.createElement("a");
        a.setAttribute("href", e.install.href), null != e.install.target && a.setAttribute("target", e.install.target), 
        a.className = "btn btn-success btn-sm", a.innerHTML = e.install.text, "function" == typeof e.install.onClick && a.addEventListener("click", e.install.onClick), 
        e.visit.href && null != e.visit.href && "" != e.visit.href || (e.visit.href = typeof n("script.script_info.homepage") !== t ? n("script.script_info.homepage") : "http://myuserjs.org/script/" + n("script.username") + "/" + n("script.script_name"));
        var r = document.createElement("a");
        r.setAttribute("href", e.visit.href), null != e.visit.target && r.setAttribute("target", e.visit.target), 
        r.className = "btn btn-warning btn-sm", r.innerHTML = e.visit.text, "function" == typeof e.visit.onClick && r.addEventListener("click", e.visit.onClick);
        var i = document.createElement("a");
        i.setAttribute("href", "javascript:void(0);"), i.className = "btn btn-danger btn-sm", 
        i.innerHTML = "Close";
        var o = document.createElement("p");
        o.className = "text-align-right", o.appendChild(a), o.appendChild(r), o.appendChild(i), 
        s({
            title: c,
            body: u,
            footer: o,
            icon: e.icon,
            iconAnimation: e.iconAnimation,
            type: "small"
        });
    }, s.getElementId = function(e) {
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

          default:
            return null;
        }
    }, s.getElement = function(e) {
        var t = s.getElementId(e);
        return document.getElementById(null != t ? t : e);
    }, s.remove = function(t, a) {
        if (null != t) {
            if (t.hasAttribute("data-jmod-small-notification")) {
                var e = t, n = parseInt(t.style.top || 0);
                for (0 >= n && (n = 20); null != e.nextElementSibling && e.nextElementSibling.hasAttribute("data-jmod-small-notification"); ) e = e.nextElementSibling, 
                e.className = "jModSmallNotification SmallBox transitionUp", e.style.top = n + "px", 
                n = n + parseInt(e.offsetHeight) + 25;
            }
            t.parentElement.removeChild(t);
        }
    }, s.close = function(e, a, t, r, n) {
        if (null != e) switch (s.Events.fire(t, "onBeforeClose", e, n), a.toLowerCase()) {
          case "large":
            e.setAttribute("class", "jModLargeNotification bigBox animated fadeOut fast"), setTimeout(function(e, t, n) {
                s.remove(e, t), s.Events.fire(t, "onAfterClose", e, n);
            }, 400, e, t, n);
            break;

          case "small":
            e.setAttribute("class", "jModSmallNotification SmallBox animated fadeOut fast"), 
            setTimeout(function(e, t, n) {
                s.remove(e, t), s.Events.fire(t, "onAfterClose", e, n);
            }, 400, e, t, n);
        }
    }, s.Events = {
        eventListeners: {},
        events: [ "onBeforeClose", "onAfterClose" ],
        add: function(e, n, a) {
            typeof this.eventListeners[e] === t && (this.eventListeners[e] = {}), typeof this.eventListeners[e][n] === t && (this.eventListeners[e][n] = []), 
            this.eventListeners[e][n].push(a);
        },
        addAll: function(t, n) {
            for (var e in this.events) "function" == typeof t[this.events[e]] && this.add(n, this.events[e], t[this.events[e]]);
        },
        fire: function(n, r, o) {
            var a, e, s;
            if (typeof this.eventListeners[n] !== t && typeof this.eventListeners[n][r] !== t) for (typeof o !== t && p(o) ? (e = o, 
            a = u.call(arguments, 3)) : (e = document.querySelector('div[data-jmod-notification="' + n + '"]'), 
            null == e && (e = i), a = u.call(arguments, 2)), a.unshift(r); typeof (s = this.eventListeners[n][r].shift()) !== t; ) s.apply(e, a);
        }
    }, s.count = 0, s.LargeCount = 0, s.SmallCount = 0, Object.defineProperties(s, {
        CurrentLargeCount: {
            get: function() {
                var t = s("getElement", "notificationsLargeWrapper");
                return e.$$("div[data-jmod-large-notification]", t).length;
            }
        },
        CurrentSmallCount: {
            get: function() {
                var t = s("getElement", "notificationsSmallWrapper");
                return e.$$("div[data-jmod-small-notification]", t).length;
            }
        }
    }), s.Initialized = !1, s.init = function() {
        if (!n("Notifications.enabled")) return !1;
        s.Initialized = !0;
        var r = document.getElementsByTagName("head")[0], o = document.getElementsByTagName("body")[0], e = s("getElement", "notificationsWrapper");
        null == e && (e = document.createElement("div"), e.id = s("getElementId", "notificationsWrapper"), 
        e.className = "jModNotificationsFullWrapper jmod-na jmod-fa", document.body.appendChild(e));
        var t = s("getElement", "notificationsSmallWrapper");
        null == t && (t = document.createElement("div"), t.id = s("getElementId", "notificationsSmallWrapper"), 
        t.className = "jModSmallNotifications", e.appendChild(t));
        var a = s("getElement", "notificationsLargeWrapper");
        null == a && (a = document.createElement("div"), a.id = s("getElementId", "notificationsLargeWrapper"), 
        a.className = "jModNotifications", e.appendChild(a));
    }, e.CSS = '#jModSmallNotificationsWrapper,#jModNotificationsWrapper,.jmod-na .SmallBox span,.jmod-na .bigBox span{font-family:"Open Sans",Arial,Helvetica,sans-serif;}', 
    e.Config.Tabs = e.extend({
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
    var d = e.Tabs = function(e) {};
    d.Initialized = !1, d.GroupCount = 0;
    var w = d.att = {}, Z = d.cn = {};
    Object.defineProperties(d.att, {
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
    }), Object.defineProperties(d.cn, {
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
    }), d.Events = new at([ "onBeforeShow", "onAfterShow" ]), d.handler = {
        click: function(n) {
            var e = n.target, l = e.parentElement;
            if (this.contains(e) && "A" == e.nodeName) {
                var a = this.parentElement.querySelector("." + Z.ct), r = E(e, "href");
                if (r) {
                    var o = a.querySelector(".tab-pane.active"), i = this.querySelector("li.active"), t = a.querySelector(r);
                    if (t) {
                        var s = E(this, w.ul);
                        !1 !== d.Events.fire("onBeforeShow", parseInt(s), this, [ e, t ]) && (i && S(i, "active"), 
                        o && S(o, "active"), T(l, "active"), T(t, "active"), d.Events.fire("onAfterShow", parseInt(s), this, [ e, t ]));
                    }
                }
                B(n);
            }
        }
    }, d.load = function(t) {
        var a, n, s;
        if (p(t)) n = t; else {
            if ("object" != typeof t || !t.target) return;
            n = t.target, s = t.EventListeners;
        }
        if (a = j(n, "tabbable") ? [ n ] : e.$$("div.tabbable", n)) for (var r = 0; r < a.length; r++) {
            var o = a[r].querySelector(".nav." + Z.nav), i = a[r].querySelector("." + Z.ct);
            o && i && (o.setAttribute(w.ul, d.GroupCount), i.setAttribute(w.ct, d.GroupCount), 
            "object" == typeof t && d.Events.addAll(t, d.GroupCount), o.addEventListener("click", d.handler.click), 
            d.GroupCount++);
        }
    }, d.makeNavElement = function(e) {
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
    }, d.makeContentElement = function(e) {
        var t = {
            type: "div",
            id: e.id,
            className: "container tab-pane " + (e.isActive || e.active ? "active " : "") + (e.className || e["class"] || ""),
            innerHTML: e.innerHTML || e.text || "",
            attributes: e.attributes || {}
        };
        return t.attributes[w.pane] = e.index || -1, t;
    }, d.show = function(t, n) {
        var r, o, a;
        if ("number" == typeof t && (t = document.querySelector("ul[" + w.ul + '="' + t + '"]')), 
        p(t)) {
            if (ct(t, w.li)) a = t; else if ("number" == typeof n) a = e.$$("li[" + w.li + "]", t)[n]; else if ("string" == typeof n) {
                for (o = e.$$("li[" + w.li + "]", t), r = 0; r < o.length; r++) if (o[r].innerHTML == n) {
                    a = o[r];
                    break;
                }
            } else p(n) && ct(n, w.li) && (a = n);
            if (a && p(a)) return yt(a.querySelector('a[data-toggle="tab"]'));
        }
    }, d.resize = function(e) {
        var t = e.parentElement.querySelector(".tab-content"), n = window.getComputedStyle(e, null), a = parseInt(n.getPropertyValue("width"));
        t.style.marginLeft = a + 11 + "px";
    }, e.Config.Modal = e.extend({
        enabled: !0,
        cn: {
            container: "jModModalContainer"
        },
        id: {
            container: "jModModalContainer"
        }
    }, e.Config.Modal || {});
    var vt = "Modal.cn.container", ut = "Modal.id.container", c = e.Modal = function(r, l) {
        if (!n("Modal.enabled")) return !1;
        e.Modal.Initialized || e.Modal.init();
        try {
            if ("string" == typeof r) switch (r.toLowerCase()) {
              case "show":
              case "showmodal":
                return e.Modal.show.apply(e.Modal, u.call(arguments, 1));

              case "hide":
              case "hidemodal":
                return e.Modal.hide.apply(e.Modal, u.call(arguments, 1));
            } else if ("object" == typeof r) {
                var o = e.Modal.createModal(r), i = parseInt(E(o, "data-jmod-modal")), f = g({
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
                                return e.target === this ? (this.style.display = "none", S(document.body, "jmod-modal-open"), 
                                B(e), !1) : a;
                            }
                        }
                    }
                }), s = c.Container;
                return s && (s.appendChild(f), s.appendChild(o)), e.Modal.Modals[i] = {
                    index: i,
                    element: o,
                    lockScreen: r.lockScreen || !0,
                    data: r
                }, typeof r.features !== t && e.Modal.addJSFeatures(o, r.features), !0 === l && e.Modal.show(o), 
                o;
            }
        } catch (d) {
            C(d, "jMod.Modal");
        }
    }, X;
    Object.defineProperties(c, {
        fn: {
            value: c.__proto__
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
                return X ? X : X = document.getElementById(n(ut));
            },
            set: function(e) {
                X = e;
            }
        }
    });
    const dt = 150;
    c.getModal = function(e) {
        var n = document.querySelector('div[data-jmod-modal="' + e + '"]');
        return n ? n : typeof c.Modals[e] !== t ? c.Modals[e].element : null;
    }, c.addJSFeatures = function(t, n) {
        n.enableTabs && e.Tabs.load({
            target: t,
            onBeforeShow: function() {
                f.log("Tabs onBeforeShow: ", arguments);
            }
        }), n.enableTooltips && l(t);
    }, c.show = function(e, n, a) {
        try {
            if ("number" == typeof e && "number" != typeof n && (typeof a === t && typeof n !== t && (a = n), 
            n = e), (typeof e === t || null == e) && typeof n === t) return;
            if (typeof e !== t && null != e && "number" != typeof e || "number" != typeof n ? typeof e !== t && null != e && typeof n === t && (n = E(e, "data-jmod-modal")) : e = document.querySelector('div[data-jmod-modal="' + n + '"]'), 
            -1 != c.CurrentModal && c.CurrentModal != n && c.hide(), e) {
                var r = document.querySelector('div[data-jmod-modal-backdrop="' + n + '"]'), o = c.Events.fire("onBeforeShow", n, e, [ a || null ]);
                c.CurrentModal = n, T(document.body, "jmod-modal-open"), r.style.display = "block", 
                e.style.display = "block", setTimeout(function(e, t) {
                    T(t, "in"), T(e, "in");
                }, 1, e, r), setTimeout(function(e, t, n) {
                    c.Events.fire("onAfterShow", t, e, [ n || null ]);
                }, dt, e, n, a || null);
            }
        } catch (a) {
            C(a, "jMod.Modal.show");
        }
    }, c.hide = function(n, e, a) {
        try {
            if (typeof n === t && typeof e === t && -1 != c.CurrentModal && (e = c.CurrentModal, 
            n = c.getModal(c.CurrentModal)), "number" == typeof n && "number" != typeof e && (typeof a === t && typeof e !== t && (a = e), 
            e = n), typeof n === t && typeof e === t) return;
            if (p(n) || "number" != typeof e ? typeof n !== t && typeof e === t && (e = E(n, "data-jmod-modal")) : n = c.getModal(e), 
            n) {
                var r = document.querySelector('div[data-jmod-modal-backdrop="' + e + '"]'), o = c.Events.fire("onBeforeHide", e, n, [ a || null ]);
                c.CurrentModal = -1, S(document.body, "jmod-modal-open"), S(n, "in"), S(r, "in"), 
                setTimeout(function(e, t, n, a) {
                    e.style.display = "none", a.style.display = "none", c.Events.fire("onAfterHide", t, e, [ n || null ]);
                }, dt, n, e, a || null, r);
            }
        } catch (a) {
            C(a, "jMod.Modal.hide");
        }
    }, c.Events = new at([ "onBeforeShow", "onAfterShow", "onBeforeHide", "onAfterHide" ]), 
    c.createModal = function(n) {
        var l = c.ModalCount++;
        c.Events.addAll(n, l);
        var f = g({
            type: "div",
            id: n.id || "jModModal-" + l,
            className: "modal fade " + (n.className || n["class"] || ""),
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
                            var t = e.target, n = parseInt(E(t, "data-jmod-modal"));
                            return c.hide(t, n, e), B(e), !1;
                        }
                    }
                }
            }
        }), i = g({
            type: "div",
            className: "modal-dialog"
        });
        if (typeof n.style !== t) for (var u in n.style) i.style[u] = n.style[u];
        f.appendChild(i);
        var r = g({
            type: "div",
            className: "modal-content"
        });
        i.appendChild(r);
        var s = g({
            type: "div",
            className: "modal-header"
        });
        r.appendChild(s);
        var d = g({
            type: "div",
            className: "modal-body"
        });
        r.appendChild(d);
        var o = g({
            type: "div",
            className: "modal-footer"
        });
        r.appendChild(o), N(s, n.title);
        var y = g({
            type: "div",
            className: "yt-close-btn-wrapper",
            innerHTML: '<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-close-btn">',
            EventListeners: {
                click: {
                    capture: !1,
                    callback: function(e) {
                        var t = e.target.parentElement.parentElement.parentElement.parentElement.parentElement, n = parseInt(E(t, "data-jmod-modal"));
                        return c.hide(t, n, e);
                    }
                }
            }
        });
        if (s.appendChild(y), N(d, n.body), N(o, n.footer), typeof n.buttons !== t) for (var p in n.buttons) try {
            var m = e.extend(!0, {
                type: "button",
                text: "button"
            }, n.buttons[p]), a = g(m);
            a && (j(a, "btn") || T(a, "brn"), /btn\-(default|primary|success|info|warning|danger)/i.test(a.className) || T(a, "btn-default"), 
            o.appendChild(a));
        } catch (h) {
            C(h, "jMod.Modal.createModal", "footer buttons");
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
                            var t = e.target.parentElement.parentElement.parentElement.parentElement, n = parseInt(E(t, "data-jmod-modal"));
                            return c.hide(t, n, e), B(e), !1;
                        }
                    }
                }
            }
        });
        return o.appendChild(b), f;
    }, c.init = function() {
        c.Initialized = !0;
        var e = c.Container;
        null == e && (e = document.createElement("div"), e.id = n(ut), e.className = "jmod-na jmod-fa " + n(vt), 
        document.body.appendChild(e));
    }, e.CSS = ".jmod-na .tabbable > .nav.nav-tabs > li > a,.jmod-na .tabbable > .nav.nav-tabs > li > a:hover,.jmod-na .tabbable > .nav.nav-tabs > li > a:active{text-decoration:none;}", 
    e.Config.Settings = e.extend({
        enabled: !0,
        cn: {
            modal: "jModSettings"
        },
        id: {
            modal: "jModSettingsModal"
        }
    }, e.Config.Settings || {});
    var Ot = "Settings.id.modal", St = "Settings.cn.modal", o = e.Settings = function(t, r) {
        if (!n("Settings.enabled")) return !1;
        if (e.Settings.Initialized || e.Settings.init(), "string" == typeof t) switch (t.toLowerCase()) {
          case "":        } else "object" == typeof t && (o._data = t, e.Settings.__storedData = a, 
        e.Settings.settingsModalElement = e.Settings.MakeSettingsModal(t), o.PrefTypes.onChange(), 
        i.addEventListener("resize", e.Settings.onResize, !1), e.Settings.onResize());
    };
    o.Initialized = !1, o.getDefault = function(n) {
        var t = 0, e = o._data;
        if (e && (e = e.settings)) for (t; t < e.length; t++) if (e[t].name == n) return e[t]["default"];
    }, o.get = function(e, n) {
        var t = o._storedData;
        return t && t[e] !== a ? t[e] : 1 == n ? a : o.getDefault(e);
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
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
        },
        _storedData: {
            get: function() {
                if (typeof o.__storedData !== t) return o.__storedData;
                var r = e.getValue("Settings_" + n("script.script_name"));
                return r ? JSON.parse(r) : a;
            },
            set: function(t) {
                o.__storedData = t, e.setValue("Settings_" + n("script.script_name"), JSON.stringify(t));
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
        _call: function(n, e, r) {
            return typeof this._types[e] !== t && "function" == typeof this._types[e][n] ? this._types[e][n].apply(this._types[e], u.call(arguments, 2)) : a;
        },
        add: function(e, t) {
            this._types[e] = t;
        },
        make: function(e, t) {
            return this._call("make", e, t);
        },
        getValue: function(t) {
            var n = e.$('#jModSettingsModal [name="' + t.name + '"]');
            return n ? this._call("getValue", t.type, n, t) : a;
        },
        getValueByName: function(n) {
            var t, e = 0;
            try {
                t = o._data.settings;
            } catch (a) {
                return;
            }
            for (e; e < t.length; e++) if (t[e].name == n) return this.getValue(t[e]);
        },
        getDataByName: function(n) {
            var t, e = 0;
            try {
                t = o._data.settings;
            } catch (a) {
                return;
            }
            for (e; e < t.length; e++) if (t[e].name == n) return t[e];
        },
        setValue: function(t, r) {
            var n = e.$('#jModSettingsModal [name="' + t.name + '"]');
            return n ? this._call("setValue", t.type, n, t, r) : a;
        },
        enable: function(r) {
            var t, i, s, n = 0;
            if ("object" == typeof r) t = r; else if ("string" == typeof r) {
                try {
                    i = o._data.settings;
                } catch (l) {
                    return;
                }
                for (n; n < i.length; n++) if (i[n].name == r) {
                    t = i[n];
                    break;
                }
            }
            return t ? (s = e.$('#jModSettingsModal [name="' + t.name + '"]'), s ? this._call("enable", t.type, s, t) : a) : a;
        },
        disable: function(r) {
            var t, i, s, n = 0;
            if ("object" == typeof r) t = r; else if ("string" == typeof r) {
                try {
                    i = o._data.settings;
                } catch (l) {
                    return;
                }
                for (n; n < i.length; n++) if (i[n].name == r) {
                    t = i[n];
                    break;
                }
            }
            return t ? (s = e.$('#jModSettingsModal [name="' + t.name + '"]'), s ? this._call("disable", t.type, s, t) : a) : a;
        },
        onChange: function(f, g) {
            var a, r, c, s, l, i = !0, p, d, u = !1, n = 0;
            try {
                a = o._data.settings;
            } catch (y) {
                return;
            }
            for (n; n < a.length; n++) if (i = !0, a[n].depend && ("function" == typeof a[n].depend || t == typeof f || t !== typeof a[n].depend[f])) {
                if ("function" == typeof a[n].depend) d = e.$('#jModSettingsModal [name="' + a[n].name + '"]'), 
                i = a[n].depend(d, a[n]); else for (c in a[n].depend) {
                    r = a[n].depend[c], p = typeof r;
                    var m = o.PrefTypes.getDataByName(c);
                    try {
                        u = 1 == o.PrefTypes._types[m.type].multiValue;
                    } catch (y) {
                        u = !1;
                    }
                    switch (f == c ? s = g : t == typeof (s = this.getValueByName(c)) && (s = o.get(c)), 
                    u && (s = s.split(",")), p) {
                      case "function":
                        i = r(e.$('#jModSettingsModal [name="' + a[n].name + '"]'), a[n], s, m);
                        break;

                      case "object":
                        if ("array" == L(r)) if (u) {
                            for (l = 0; l < r.length; l++) if (-1 == s.indexOf(r[l])) {
                                i = !1;
                                break;
                            }
                        } else for (i = !1, l = 0; l < r.length; l++) if (r[l] == s) {
                            i = !0;
                            break;
                        }
                        break;

                      case "string":
                        if (u) {
                            for (r = r.split(","), l = 0; l < r.length; l++) if (-1 == s.indexOf(r[l])) {
                                i = !1;
                                break;
                            }
                        } else s != r && (i = !1);
                        break;

                      case "number":
                        u ? s.length < r && (i = !1) : parseInt(s) != parseInt(r) && (i = !1);
                    }
                    if (!i) break;
                }
                i ? o.PrefTypes.enable(a[n]) : o.PrefTypes.disable(a[n]);
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
            var c = e.description || e.name, s = e["default"] || null, l = o.get(e.name), r = l || s, i = [];
            for (var n in e.options) i.push({
                type: "option",
                innerHTML: e.options[n],
                attributes: {
                    value: n,
                    selected: r && r == n ? !0 : null
                }
            });
            var a = {
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
            return t == typeof e.tooltip || t == typeof e.tooltip.innerHTML && t == typeof e.tooltip.text || (a.innerHTML = I(a.innerHTML, e.tooltip)), 
            a;
        },
        getValue: function(e, t) {
            return e.options[e.selectedIndex].value;
        },
        setValue: function(t, a, n) {
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
            var u = e.description || e.name, s = e["default"] || "", l = o.get(e.name), a = l || s;
            "object" != typeof a && (a = a.split(","));
            var i = [];
            for (var n in e.options) {
                var r = {
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
                        checked: -1 != a.indexOf(n) ? !0 : !1,
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
                t == typeof e.options[n].tooltip || t == typeof e.options[n].tooltip.innerHTML && t == typeof e.options[n].tooltip.text || (r.innerHTML[1] = I(r.innerHTML[1], e.options[n].tooltip)), 
                i.push(r);
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
        getValue: function(r, o) {
            for (var n = [], a = e.$$("input:checked", r), t = 0; t < a.length; t++) n.push(a[t].value);
            return n.join(",");
        },
        setValue: function(t, r, n) {
            for (var a = n.split(","), e = 0; e < t.options.length; e++) t.options[e].checked = -1 != a.indexOf(E(t.options[e], "name")) ? !0 : !1;
            return !0;
        },
        enable: function(a, r) {
            for (var n = e.$$("input", a), t = 0; t < n.length; t++) n[t].hasAttribute("disabled") && n[t].removeAttribute("disabled");
        },
        disable: function(a, r) {
            for (var n = e.$$("input", a), t = 0; t < n.length; t++) n[t].setAttribute("disabled", "disabled");
        }
    }), o.PrefTypes.add("radio", {
        make: function(e) {
            var u = e.description || e.name, i = e["default"] || "", s = o.get(e.name), l = s || i, r = [];
            for (var n in e.options) {
                var a = {
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
                t == typeof e.options[n].tooltip || t == typeof e.options[n].tooltip.innerHTML && t == typeof e.options[n].tooltip.text || (a.innerHTML[1] = I(a.innerHTML[1], e.options[n].tooltip)), 
                r.push(a);
            }
            var c = {
                type: "div",
                className: "form-group pref-container",
                innerHTML: r,
                attributes: {
                    name: e.name
                }
            };
            return c;
        },
        getValue: function(e, t) {
            return e.querySelector("input:checked").value;
        },
        setValue: function(t, a, n) {
            for (var e = 0; e < t.options.length; e++) t.options[e].checked = E(t.options[e], "name") == n ? !0 : !1;
            return !0;
        },
        enable: function(a, r) {
            for (var n = e.$$("input", a), t = 0; t < n.length; t++) n[t].hasAttribute("disabled") && n[t].removeAttribute("disabled");
        },
        disable: function(a, r) {
            for (var n = e.$$("input", a), t = 0; t < n.length; t++) n[t].setAttribute("disabled", "disabled");
        }
    }), o.PrefTypes.add("toggle", {
        multiValue: !0,
        make: function(e) {
            var u = e.description || e.name, i = e["default"] || "", s = o.get(e.name), l = s || i, r = [];
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
                r.push(a);
            }
            var c = {
                type: "div",
                className: "form-group pref-container",
                innerHTML: r,
                attributes: {
                    name: e.name
                }
            };
            return c;
        },
        getValue: function(r, o) {
            for (var n = [], a = e.$$("input:checked", r), t = 0; t < a.length; t++) n.push(a[t].value);
            return n.join(",");
        },
        setValue: function(t, r, n) {
            for (var a = n.split(","), e = 0; e < t.options.length; e++) t.options[e].checked = -1 != a.indexOf(E(t.options[e], "name")) ? !0 : !1;
            return !0;
        },
        enable: function(a, r) {
            for (var n = e.$$("input", a), t = 0; t < n.length; t++) n[t].hasAttribute("disabled") && n[t].removeAttribute("disabled");
        },
        disable: function(a, r) {
            for (var n = e.$$("input", a), t = 0; t < n.length; t++) n[t].setAttribute("disabled", "disabled");
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
                        value: r || a,
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
                var i = lt(e.icon);
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
            var s = e.description || e.name, r = e["default"] || "", i = o.get(e.name), n = {
                type: "div",
                className: "pref-container",
                innerHTML: [ {
                    type: "textarea",
                    className: "form-control pref",
                    innerHTML: i || r,
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
                var a = lt(e.icon);
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
            var i = e.description || e.name, a = e["default"] || "", r = o.get(e.name), n = {
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
                    value: parseInt(r || a),
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
                        value: r || a,
                        disabled: "disabled"
                    },
                    EventListeners: {
                        keypress: function(e) {
                            f.log("keypress", e);
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
        var r = o.PrefTypes.make(e.type, e);
        if (r) {
            var i = wt(e);
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
                    innerHTML: r
                } ]
            }, g(n);
        }
        return a;
    }, o.MakeSettingsModal = function(i) {
        var l = {}, r, E, v, y = !1, j = g({
            type: "div",
            className: "jMod-settings tabbable tabs-left"
        }), T = g({
            type: "ul",
            className: "nav nav-tabs"
        }), S = g({
            type: "div",
            className: "tab-content"
        });
        for (var s in i.settings) {
            var r = i.settings[s].tab || "Other", m = i.settings[s].section || "General";
            typeof l[r] === t && (l[r] = {
                name: r,
                color: null,
                sections: {}
            }), typeof l[r].sections[m] === t && (l[r].sections[m] = []), l[r].sections[m].push(i.settings[s]);
        }
        if (i.tabs) for (var s in i.tabs) r = i.tabs[s].name, r && typeof l[r] !== t && (i.tabs[s].displayName && (l[r].displayName = i.tabs[s].displayName), 
        i.tabs[s].content && (i.tabs[s].content.header && (l[r].contentHeader = i.tabs[s].content.header), 
        i.tabs[s].content.footer && (l[r].contentFooter = i.tabs[s].content.footer)));
        var u = i.tabOrder || [], b = {}, c = 0;
        for (r in l) {
            y = i.activeTab !== a && r === i.activeTab || i.activeTab === a && 0 == c ? !0 : !1, 
            E = d.makeNavElement({
                innerHTML: l[r].displayName || r,
                id: "jMod-settings-tab-" + c,
                isActive: y,
                contentId: "jMod-settings-tab-" + c + "-content",
                index: c
            });
            var h = [];
            l[r].contentHeader && h.push(l[r].contentHeader);
            for (var m in l[r].sections) {
                h.push('<div class="row section-title-row"><div class="col-md-12"><h3 class="section-title">' + m + "</h3></div></div>");
                for (var C in l[r].sections[m]) h.push(o.MakePref(l[r].sections[m][C]));
            }
            l[r].contentFooter && h.push(l[r].contentFooter), v = d.makeContentElement({
                name: r,
                id: "jMod-settings-tab-" + c + "-content",
                isActive: y,
                innerHTML: h,
                index: c
            }), b[r] = [ E, v ], -1 == u.indexOf(r) && u.push(r), c++;
        }
        if (i.tabs) for (var s in i.tabs) r = i.tabs[s].name, r && l[r] === a && (y = i.activeTab !== a && r === i.activeTab || i.activeTab === a && 0 == c ? !0 : !1, 
        E = d.makeNavElement({
            innerHTML: r,
            id: "jMod-settings-tab-" + c,
            isActive: y,
            contentId: "jMod-settings-tab-" + c + "-content",
            index: c
        }), v = d.makeContentElement({
            name: r,
            id: "jMod-settings-tab-" + c + "-content",
            isActive: y,
            innerHTML: i.tabs[s].innerHTML || i.tabs[s].text,
            index: c
        }), b[r] = [ E, v ], -1 == u.indexOf(r) && u.push(r), c++);
        for (var s = 0; s < u.length; s++) b[u[s]] !== a && (N(T, b[u[s]][0]), N(S, b[u[s]][1]));
        N(j, T), N(j, S);
        var M = i.title || "Settings";
        p(M) || (M = '<h2 class="title">' + M + "</h2>");
        var w = {
            title: M,
            id: o.getElementId("settingModalsElement"),
            className: n(St),
            body: j,
            footer: [ {
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
                            return t && o.clear(), B(e), !1;
                        }
                    }
                }
            }, {
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
            } ],
            buttons: [ {
                text: "Save",
                className: "btn btn-success",
                EventListeners: {
                    click: function() {
                        f.log("save button click"), o.save();
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
        return typeof i.onBeforeHide !== t && (w.onBeforeHide = i.onBeforeHide), typeof i.onAfterHide !== t && (w.onAfterHide = i.onAfterHide), 
        e.Modal(w);
    }, o.onResize = function() {
        var t = e.Settings.settingsModalElement, s = e.$(".modal-dialog", t), n = e.$(".modal-body", t), r = e.$(".modal-footer", t), o = e.$(".modal-header", t), d = i.viewportSize.getHeight(), a = i.getComputedStyle(s, null), c = parseInt(a.getPropertyValue("margin-top")), u = parseInt(a.getPropertyValue("margin-bottom")), f = d - parseInt(o.offsetHeight) - parseInt(r.offsetHeight) - c - u;
        n.style.maxHeight = f + "px";
        var l = e.$(".nav.nav-tabs", n);
        e.Tabs.resize(l);
    }, o.show = function() {
        e.Modal.show(o.settingsModalElement || 0);
    }, o.hide = function() {
        e.Modal.hide(o.settingsModalElement);
    }, o.save = function() {
        f.log("Saving");
        for (var e = o._data, a = {}, t = 0; t < e.settings.length; t++) {
            var n = e.settings[t];
            if (!p(e) && "element" != n.type) {
                var r = o.PrefTypes.getValue(n);
                a[n.name] = r;
            }
        }
        o._storedData = a;
    }, o.init = function() {
        o.Initialized = !0;
    }, e.CSS = '.jmod-na .modal-body{min-height:200px;max-height:500px;overflow-y:auto;}.jmod-na .powered-by{font-family:"Sansation",Lato;font-weight:300;font-size:16px;position:absolute;left:0;text-align:center;width:100%;bottom:0;padding-bottom:5px;}.jmod-na .powered-by > a:link,.jmod-na .powered-by > a:visited,.jmod-na .powered-by > a:hover,.jmod-na .powered-by > a:active{text-decoration:none;color:#000;}.jmod-na .powered-by img{margin-right:3px;}.jmod-na .noselect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.jmod-na .noselect::selection{background:transparent;}.jmod-na .noselect::-moz-selection{background:transparent;}', 
    e.getDOMTiming = function() {
        var a, t = {};
        try {
            if (v.available) {
                var c = [ "unloadEventStart", "unloadEventEnd", "navigationStart" ];
                a = v.getAllTiming();
                var s = v.get("timing.navigationStart");
                for (var n in a) t[n] = a[n] - s, (t[n] <= 0 || isNaN(t[n])) && delete t[n];
                var r = (v.get("timing.loadEventEnd") || v.get("timing.loadEventStart")) - v.get("timing.navigationStart");
                r > 0 && (t.pageLoadTime = r);
                var o = v.get("timing.responseEnd") - v.get("timing.fetchStart");
                o >= 0 && (t.NetworkLatency = o);
                var i = v.now;
                i > 0 && (t.statReportTime = i), e.InitializeEndTime > 0 && (t.jModInitializeEnd = e.InitializeEndTime), 
                e.InitializeStartTime >= 0 && (t.jModInitializeStart = e.InitializeStartTime, e.InitializeEndTime > 0 && e.InitializeEndTime - e.InitializeStartTime > 0 && (t.jModInitializeTime = e.InitializeEndTime - e.InitializeStartTime), 
                F > 0 && F - e.InitializeStartTime > 0 && (t.jModReadyTime = F - e.InitializeStartTime));
            }
        } catch (l) {
            return C(l, "jMod.getDOMTiming"), {};
        }
        return t;
    };
    var m = e.SendMessage = function(n) {
        switch (e.jQueryAvailable || "jquery" != n.method.toLowerCase() ? typeof GM_xmlhttpRequest === t && "xmlhttprequest" == n.method.toLowerCase() && (n.method = e.jQueryAvailable ? "jQuery" : "JSONP") : n.method = typeof GM_xmlhttpRequest !== t ? "XMLHTTPRequest" : "JSONP", 
        n.url = e.SendMessage.processURL(n), (n.method || "XMLHTTPRequest").toLowerCase()) {
          case "jquery":
            return e.debug && f.log("jMod.SendMessage - jquery", n), e.SendMessage.jQuery(n);

          case "xmlhttprequest":
            return e.debug && f.log("jMod.SendMessage - xmlhttprequest", n), e.SendMessage.XMLHTTPRequest(n);

          case "jsonp":
          default:
            e.debug && f.log("jMod.SendMessage - JSONP", n), e.SendMessage.JSONP(n);
        }
    }, nt = "jModSendMessageResponseFn";
    m.processURL = function(e) {
        var t = "string" == typeof e.callback ? e.callback : nt;
        switch ("object" != typeof e.url && -1 == e.url.indexOf("?") && (e.url += "?"), 
        e.method.toLowerCase()) {
          case "jsonp":
            e.url instanceof Q ? (e.url.addArg("callback", t), e.url.addArg("jsonp", t)) : e.url += "&callback=" + t + "&jsonp=" + t;
            break;

          case "xmlhttprequest":
            e.url instanceof Q ? e.url.addArg("json", "1") : e.url += "&json=1";
            break;

          case "jquery":
            e.responseType && "json" == e.responseType && (e.url instanceof Q ? e.url.addArg("json", "1") : e.url += "&json=1");
        }
        return e.url;
    }, m.jQuery = function(e) {
        var n = "string" == typeof e.callback ? e.callback : nt, t = m.addCallbacks(e);
        try {
            $.getJSON("" + e.url, {
                async: !0,
                format: "json"
            }).done(function(e, n, a) {
                m.execCallback(t, null, e, n, a);
            }).fail(function(e, n, a) {
                m.execErrorCallback(t, null, e, n, a);
            });
        } catch (a) {
            return !1;
        }
        return !0;
    }, m.XMLHTTPRequest = function(e) {
        try {
            if (typeof GM_xmlhttpRequest !== t) {
                var n = m.addCallbacks(e);
                return GM_xmlhttpRequest({
                    method: "GET",
                    url: "" + e.url,
                    headers: {
                        Accept: "application/javascript"
                    },
                    onload: function(e, t) {
                        return function(n) {
                            if ("json" != t.toLowerCase()) return m.execCallback(e, null, n.responseText, n);
                            var a;
                            try {
                                a = JSON.parse(n.responseText);
                            } catch (r) {} finally {
                                return m.execCallback(e, null, a, n);
                            }
                        };
                    }(n, e.responseType || "json"),
                    onerror: function(e) {
                        return function(t) {
                            return f.log("Error! XMLHttpRequest", t), m.execErrorCallback(e, null, t.responseText, t);
                        };
                    }(n)
                }), !0;
            }
        } catch (a) {
            f.log("Error! getXMLHttpRequest", a);
        } finally {
            return !1;
        }
    }, m.JSONP = function(e) {
        var t = m.addCallbacks(e), n = g({
            type: "script",
            async: !0,
            defer: !0,
            attributes: {
                "data-callback-index": t
            }
        });
        try {
            var a = document.head || document.getElementsByTagName("head")[0];
            a.appendChild(n), n.src = "" + e.url;
        } catch (r) {
            return m.execErrorCallback(t, null, r);
        }
        return !0;
    }, m._callbacks = [], m.addCallbacks = function(e) {
        return m._callbacks.push({
            complete: e.callback,
            error: e.onerror
        }) - 1;
    }, m.execCallback = function(a, n) {
        try {
            var e = m._callbacks[a].complete;
            if (typeof e === t) return !1;
            if ("function" == typeof e) return e.apply(n || null, u.call(arguments, 2));
            if ("string" == typeof e && "function" == typeof i[e]) return i[e].apply(n || null, u.call(arguments, 2));
        } catch (r) {
            return f.log("Error SendMessage.execCallback!", r), !1;
        }
    }, m.execErrorCallback = function(a, n) {
        try {
            var e = m._callbacks[a].onerror;
            if (typeof e === t) return !1;
            if ("function" == typeof e) return e.apply(n || null, u.call(arguments, 2));
            if ("string" == typeof e && "function" == typeof i[e]) return i[e].apply(n || null, u.call(arguments, 2));
        } catch (r) {
            return f.log("Error SendMessage.execErrorCallback!", r), !1;
        }
    }, m._globalResponseCallback = rt(jt, i, {
        defineAs: nt,
        allowCallbacks: !0,
        allowCrossOriginArguments: !0
    }), e.Update = new function() {
        var r = function() {
            var t = [ !0 ].concat(u.call(arguments), {
                script_info: n("script.script_info"),
                script_file_info: n("script.script_file_info") || a
            });
            return e.extend.apply(e, t);
        };
        this.getURL = function(d) {
            opts = r({}, e.Config.Update, d);
            var a = new Q(n("host") || "http://myuserjs.org"), s = (opts.username || n("script.username")).trim();
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
            a.addArg("args", escape(f.join(","))), a.addArg("api_version", e.version), a.addArg("updateVeriableName", opts.updateVeriableName), 
            typeof opts.noDownload !== t && 1 == opts.noDownload ? a.addArg("nodownload", "1") : n("Update.sampleRate") < 100 && Math.floor(100 * Math.random() + 1) > n("Update.sampleRate") && a.addArg("nodownload", "1"), 
            n("Update.getStats") && a.addArg("getstats", "1"), typeof opts.script_info !== t && (typeof opts.script_info.version !== t && a.addArg("scriptversion", escape(opts.script_info.version)), 
            typeof opts.script_info.script_handler !== t && (a.addArg("scripthandler", escape(opts.script_info.script_handler)), 
            typeof opts.script_info.script_handler_version !== t && a.addArg("scripthandlerversion", escape(opts.script_info.script_handler_version)))), 
            a.addArg("cachebuster", Math.round(new Date().getTime() / 1e3));
            var p = n("host") || "myuserjs.org";
            return a.setPath("/script/" + s + "/" + l + "." + o + ".js"), a;
        }, this.sendRequest = function(u) {
            try {
                var o = r({}, e.Config.Update, u);
                typeof i[o.updateVeriableName] !== t && (i[o.updateVeriableName] = a, delete i[o.updateVeriableName]);
                var c = e.Update.getURL(o);
                n("debug") && e.Log("URL: ", "" + c);
                var l = "JSONP";
                return o.jQuery ? l = "jQuery" : o.XMLHttpRequest && (l = "XMLHTTPRequest"), e.SendMessage({
                    url: "" + c,
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
                return f.log("Error! getUpdateData: ", s.name, s.fileName, s.lineNumber + ":" + s.columnNumber), 
                f.error(s), o.callback && o.onerror(s), a;
            }
        }, this.getUpdateData = function(e) {
            return this.sendRequest(e);
        };
    }(), Object.defineProperty(e.Update, "MetaData", {
        get: function(e) {
            return typeof i[e || n("Update.updateVeriableName")] !== t ? i[e || n("Update.updateVeriableName")] : typeof window[e || n("Update.updateVeriableName")] !== t ? window[e || n("Update.updateVeriableName")] : a;
        }
    }), e.ERROR = new function() {
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
        }, Object.defineProperties(this.ERROR_CODES, it), Object.defineProperty(this.ERROR_CODES, "get", {
            value: function(t, n) {
                return a === n ? e.ERROR.ERROR_CODES.SearchForKey(t) : e.ERROR.ERROR_CODES.setKeyValue(t, n);
            },
            enumerable: !1
        }), this.getCode = function(t) {
            var e = this.ERROR_CODES.get(t);
            return a !== e ? +e.toString(2) : a;
        };
        var t = function(a, r, o, i, e, t) {
            try {
                if (n("script.script_info.userscript_file_name") == t[0].fileName) {
                    switch (f.log("Error is from userscript!"), e.name) {
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
                return a === t.args && (t.args = {}), a === t.args.scriptError && (t.args.scriptError = "1"), 
                a === t.args.scriptErrorCode && (t.args.scriptErrorCode = "-1"), t.getType = "none", 
                t.noDownload = !0, e.UPDATE.sendRequest(t);
            } catch (r) {
                return f.log("Error! Error.send: ", r), a;
            }
        }, this.catchError = function(c, d, o, i, r, s) {
            try {
                if (f.log("stackInfo", s), a !== r && a !== r.stack) {
                    var l = u.call(arguments, 0);
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
            var a = {
                message: t.message,
                name: t.name,
                fileName: t.fileName,
                lineNumber: t.lineNumber,
                columnNumber: t.columnNumber,
                stack: n
            };
            return e.ERROR.catchError(t.message, t.fileName, t.lineNumber, t.columnNumber, a, e.parseStack(n));
        };
    }(), rt(st, i, {
        defineAs: "jModListenError",
        allowCallbacks: !0,
        allowCrossOriginArguments: !0
    });
    var Rt = function() {
        window.oldHandle = window.onerror, window.onerror = function(n, a, r, o, e) {
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
                st(n, a, r, o, i);
            } catch (s) {}
            return window.oldHandle ? window.oldHandle.apply(this, arguments) : !1;
        };
    };
    return +function() {
        function r(t) {
            return y.DOMLoaded || -1 != [ "interactive", "complete" ].indexOf(document.readyState.toLowerCase()) && n.DOMLoaded(), 
            y.DOMLoaded && (y.documentComplete || "complete" != document.readyState || n.documentComplete(), 
            y.performanceReady || (i = v.pageLoadTime(), (!isNaN(i) && i > 0 || !v.available) && n.performanceReady()), 
            y.performanceReady && y.documentComplete) ? (y.Complete = !0, clearInterval(o), 
            e.debug && A("jMod Finish Init"), a) : s > d ? (y.Complete = !0, clearInterval(o), 
            y.DOMLoaded || n.DOMLoaded(), y.documentComplete || n.documentComplete(), y.performanceReady || n.performanceReady(), 
            a) : (s++, e.debug && e.log.count("Try Init"), a);
        }
        function o() {
            y.Complete ? clearInterval(o) : r("checkTimer");
        }
        function l(t) {
            e.Events.fire.apply(e.Events, [ "load", {
                _this: this,
                args: arguments
            } ]), e.debug && e.Debug("onLoadEvent", t);
        }
        function c(t) {
            e.Events.fire.apply(e.Events, [ "beforescriptexecute", {
                _this: this,
                args: arguments
            } ]);
        }
        function u(t) {
            e.Events.fire.apply(e.Events, [ "afterscriptexecute", {
                _this: this,
                args: arguments
            } ]);
        }
        typeof GM_info === t || h.InfoSet || (e.log.Debug("GM_info", GM_info), e({
            GM_info: GM_info,
            has_GM_info: typeof GM_info !== t ? !0 : !1,
            has_GM_getMetadata: typeof GM_getMetadata !== t ? !0 : !1
        }));
        var i, s = 0;
        const d = 200;
        var n = {
            DOMLoaded: function() {
                y.DOMLoaded = !0, e.debug && A("DOM Loaded", null, " - Begin Init"), e.Events.fire("onDOMReady"), 
                y.CSSAdded = !0, e.AddCSS(), e.Notification.init(), e.Modal.init(), e.Settings.init(), 
                y.jModReady = !0, setTimeout(function() {
                    e.debug && A("jModReady"), e.Events.fire("onReady");
                }, 0), v.available && (F = v.now);
            },
            documentComplete: function() {
                y.documentComplete = !0, e.debug && (A("onPageReady"), f.groupEnd("jMod Start")), 
                e.Events.fire("onPageReady");
            },
            performanceReady: function() {
                y.performanceReady = !0, e.debug && A("onPerformanceReady"), e.Events.fire("onPerformanceReady");
            }
        };
        setInterval(o, 40), window.addEventListener("DOMContentLoaded", function(t) {
            y.Complete || r("DOMContentLoaded"), e.Events.fire.apply(e.Events, [ "DOMContentLoaded", {
                _this: this,
                args: arguments
            } ]), e.debug && e.Debug("DOMContentLoaded", t);
        }, !1), document.onreadystatechange = function(t) {
            y.Complete || r("onreadystatechange"), e.Events.fire.apply(e.Events, [ "onreadystatechange", {
                _this: this,
                args: arguments
            } ]), e.debug && e.Debug("onreadystatechange %c%s%c %o", e.log.fmt.stchange, document.readyState, " ", t);
        }, window.addEventListener("load", l, !1), window.addEventListener("beforescriptexecute", c, !1), 
        window.addEventListener("afterscriptexecute", u, !1), r();
    }(), v.available && setTimeout(function() {
        e.InitializeEndTime = v.now;
    }, 0), A("jMod Initialize Time Elapsed"), e;
}(void 0 !== window.performance ? window.performance.now() : 0, "undefined" != typeof jQuery ? jQuery : void 0, console, "undefined" != typeof unsafeWindow ? unsafeWindow : "undefined" != typeof window ? window : this, "undefined"));