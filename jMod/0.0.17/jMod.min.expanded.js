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
    t.jMod = this.jMod = e, e.debug && e.log.groupEnd("jMod Initialize"), window.focus();
}.call(this, "undefined" != typeof unsafeWindow ? unsafeWindow : "undefined" != typeof window ? window : this, function(Ct, $, u, p, s, n, o) {
    function it(a, i, s) {
        var r = "function" == typeof s ? !0 : !1, e = i;
        "object" != typeof i && (e = d.call(arguments, 1), r = !1);
        for (var t = 0; t < e.length; t++) if (typeof a[e[t]] !== n && (!r || r && s(e[t], a[e[t]]))) return e[t];
        return o;
    }
    function D(t, r, a) {
        var e = it.apply(this, arguments);
        return typeof e !== n ? t[e] : o;
    }
    function K(a) {
        var e = 0, t = this, r = a.split(".");
        for (e; e < r.length; e++) {
            if (typeof t[r[e]] === n) return o;
            t = t[r[e]];
        }
        return t;
    }
    function bt(a) {
        var r, t = 0, e = this, n = a.split(".");
        if (0 == n.length) return o;
        for (t; t < n.length; t++) {
            if (-1 == (r = Object.keys(e).join("|").toLowerCase().split("|").indexOf(n[t].toLowerCase()))) return o;
            e = e[Object.keys(e)[r]];
        }
        return e;
    }
    function wt(i, s) {
        var a, r, n = 0, e = i.split("."), t = this;
        if (0 == e.length) return o;
        for (n; n < e.length; n++) {
            if (-1 == (r = Object.keys(t).join("|").toLowerCase().split("|").indexOf(e[n].toLowerCase()))) return o;
            a = t, e[n] = Object.keys(t)[r], t = t[Object.keys(t)[r]];
        }
        return a[e[e.length - 1]] = s, e;
    }
    function It(t) {
        var n, e = 0, r = "string" == typeof t ? d.call(arguments) : t;
        for (e; e < r.length; e++) if ((n = K.apply(this, [ r[e] ])) !== o) return n;
        return o;
    }
    function _t(a, o, i) {
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
    function H(t, i, s) {
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
            } catch (c) {}
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
    function G(e) {
        if (!e) {
            if (!p.event) return;
            e = p.event;
        }
        null != e.cancelBubble && (e.cancelBubble = !0), e.stopPropagation && e.stopPropagation(), 
        e.preventDefault && e.preventDefault(), p.event && (e.returnValue = !1), null != e.cancel && (e.cancel = !0);
    }
    function lt(e, r, a) {
        if (t.jQueryAvailable) $(e).click(); else if (document.createEvent) {
            var n = document.createEvent("MouseEvents");
            n.initEvent("click", r || !0, a || !0), e.dispatchEvent(n);
        } else document.createEventObject ? e.fireEvent("onclick") : "function" == typeof e.onclick && e.onclick();
    }
    function Ot(l) {
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
    function Tt(e) {
        var t = {
            type: "div",
            className: "jModLargeNotification bigBox animated fadeIn",
            style: {},
            attributes: {
                "data-jmod-notification": l.count,
                "data-jmod-large-notification": l.LargeCount
            }
        };
        typeof e.background !== n && (t.style.background = e.background), t.style.backgroundColor = typeof e["background-color"] !== n ? e["background-color"] : "rgb(50, 118, 177)";
        var r = {
            type: "div",
            className: "",
            innerHTML: [ {
                type: "i",
                id: "jModbtnClose" + l.LargeCount,
                className: "botClose fa fa-times",
                EventListeners: {
                    click: function(t) {
                        var e = t.target.parentElement.parentElement, n = parseInt(e.getAttribute("data-jmod-notification")), r = parseInt(e.getAttribute("data-jmod-large-notification"));
                        l.close(e, "large", n, r, t);
                    }
                }
            } ],
            style: {},
            attributes: {
                "data-jmod-notification": l.count,
                "data-jmod-large-notification": l.LargeCount
            }
        };
        return typeof e.title !== n && r.innerHTML.push({
            type: "span",
            innerHTML: e.title
        }), r.innerHTML.push({
            type: "div",
            innerHTML: e.body
        }), typeof e.icon !== n && r.innerHTML.push({
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
        }), t.innerHTML = r, g(t);
    }
    function jt(e) {
        var r = document.createElement("div");
        r.setAttribute("data-jmod-notification", l.count), r.setAttribute("data-jmod-small-notification", l.SmallCount), 
        r.className = "jModSmallNotification SmallBox animated fadeIn", typeof e.background !== n && (r.style.background = e.background), 
        r.style.backgroundColor = typeof e["background-color"] !== n ? e["background-color"] : "rgb(41, 97, 145)";
        var m = l.CurrentSmallCount;
        if (m > 0) {
            for (var p = 25 * m, g = l("getElement", "notificationsSmallWrapper"), d = t.$$("div[data-jmod-small-notification]", g), f = 0; f < d.length; f++) p += parseInt(d[f].offsetHeight);
            r.style.top = p + 20 + "px";
        }
        r.addEventListener("click", function(t) {
            for (var n = 0, e = t.target; !e.hasAttribute("data-jmod-small-notification") && null != e && 10 > n; ) e = e.parentElement, 
            n++;
            if (null != e) {
                var r = parseInt(e.getAttribute("data-jmod-notification")), a = parseInt(e.getAttribute("data-jmod-small-notification"));
                l.close(e, "small", r, a, t);
            }
        }, !1);
        var a = document.createElement("div");
        if (typeof e.footer === n) a.className = "textoFull"; else {
            a.className = "textoFoto";
            var s = document.createElement("div");
            s.className = "foto", y(e.icon) ? s.appendChild(e.icon) : s.innerHTML = '<i class="fa ' + e.icon + " " + (e.iconAnimation || "bounce") + ' animated"> </i>', 
            r.appendChild(s);
        }
        var i = document.createElement("span");
        i.className = "", typeof e.title !== n && (y(e.title) ? i.appendChild(e.title) : i.innerHTML = e.title), 
        a.appendChild(i);
        var o = document.createElement("p");
        if (o.className = "", typeof e.body !== n && (y(e.body) ? o.appendChild(e.body) : o.innerHTML = e.body), 
        a.appendChild(o), typeof e.footer !== n) {
            var u = document.createElement("p");
            u.className = "text-align-right", y(e.footer) ? u = e.footer : u.innerHTML = e.footer, 
            a.appendChild(u);
        }
        if (r.appendChild(a), typeof e.footer === n && typeof e.icon !== n) {
            var c = document.createElement("div");
            c.setAttribute("class", "miniIcono"), y(e.icon) ? c.appendChild(e.icon) : c.innerHTML = '<i class="miniPic fa ' + e.icon + ' bounce animated"> </i>', 
            r.appendChild(c);
        }
        return r;
    }
    function gt(e, t, n) {
        var r = (p || s).getComputedStyle(e, null);
        20 > (n || 0) && isNaN(parseInt(r.width)) ? setTimeout(function(e, t, n) {
            gt(e, t, n + 1);
        }, 20, e, t, n || 0) : t(e, r);
    }
    function xt(t, r) {
        var n = t.parentElement.querySelector(".tab-content");
        if (null !== n.offsetParent) {
            var e = parseInt(r.width);
            isNaN(e) ? tt("Tabs.resize", "Tab width is NaN!", t, n, r) : e > 200 ? tt("Tabs.resize", "Tab width too wide!", e, t) : e > 50 && (n.style.marginLeft = e + 11 + "px");
        }
    }
    function pt(t) {
        var e = t.name, r = e.split(" ");
        -1 == r.indexOf("fa") && -1 == r.indexOf("glyphicon") && (-1 != e.indexOf("fa-") ? e = "fa " + e : -1 != e.indexOf("glyphicon-") && (e = "glyphicon " + e));
        var n = {
            type: "i",
            className: e,
            attributes: {}
        };
        return t.tooltip && (n = I(n, t.tooltip)), n;
    }
    function I(t, e) {
        if (y(t)) {
            if (w(t, a(_)), t.setAttribute(a(P), e.innerHTML || e.text || null), t.setAttribute(a(at), e.placement || "top"), 
            n != typeof e.margin) {
                var r = a("Tooltip.attributeNames.margin");
                n != typeof e.margin.left && t.setAttribute(r + "-left", e.margin.left), n != typeof e.margin.right && t.setAttribute(r + "-right", e.margin.right), 
                n != typeof e.margin.top && t.setAttribute(r + "-top", e.margin.top), n != typeof e.margin.bottom && t.setAttribute(r + "-bottom", e.margin.bottom);
            }
        } else if (t.className = (t.className || "") + " " + a(_), typeof t.attributes === n && (t.attributes = {}), 
        t.attributes[a(P)] = e.innerHTML || e.text || null, t.attributes[a(at)] = e.placement || "top", 
        n != typeof e.margin) {
            var r = a("Tooltip.attributeNames.margin");
            n != typeof e.margin.left && (t.attributes[r + "-left"] = e.margin.left), n != typeof e.margin.right && (t.attributes[r + "-right"] = e.margin.right), 
            n != typeof e.margin.top && (t.attributes[r + "-top"] = e.margin.top), n != typeof e.margin.bottom && (t.attributes[r + "-bottom"] = e.margin.bottom);
        }
        return t;
    }
    function At(t) {
        var e = t.description || t.name;
        y(e) || "object" == typeof e || (e = {
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
    function kt(e) {
        h.execCallback(document.currentScript.getAttribute("data-callback-index"), document.currentScript, e, document.currentScript);
    }
    function ft(e, n, r, a, i) {
        u.log("jModListenError", e, n, r, a);
        var s = t.parseStack(i.stack);
        return s.length > 0 ? t.ERROR.catchError(e, n, r, a, i, s) : o;
    }
    var t = function() {
        return t._call.apply(t, arguments);
    };
    t.InitializeStartTime = Ct, t.InitializeEndTime = -1;
    var T = t.API = {}, d = Array.prototype.slice, F = n != typeof $ ? !0 : !1, X = -1, nt = "@import url(//myuserjs.org/css/smartadmin-production-all-namespaced.css);\n@import url(//fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700);\n@font-face {font-family: 'Sansation';font-style: normal;font-weight: 400;src: local('Sansation Regular'), local('Sansation-Regular'), url(http://myuserjs.org/fonts/Sansation-Regular.ttf) format('ttf');}\n@font-face {font-family: 'Sansation';font-style: normal;font-weight: 300;src: local('Sansation Light'), local('Sansation-Light'), url(http://myuserjs.org/fonts/Sansation-Light.ttf) format('ttf');}\n@font-face {font-family: 'Sansation';font-style: italic;font-weight: 300;src: local('Sansation Light Italic'), local('Sansation-LightItalic'), url(http://myuserjs.org/fonts/Sansation-LightItalic.ttf) format('ttf');}\n@font-face {font-family: 'Sansation';font-style: normal;font-weight: 700;src: local('Sansation Bold'), local('Sansation-Bold'), url(http://myuserjs.org/fonts/Sansation-Bold.ttf) format('ttf');}\n@font-face {font-family: 'Sansation';font-style: italic;font-weight: 400;src: local('Sansation Italic'), local('Sansation-Italic'), url(http://myuserjs.org/fonts/Sansation-Italic.ttf) format('ttf');}\n@font-face {font-family: 'Sansation';font-style: italic;font-weight: 700;src: local('Sansation Bold Italic'), local('Sansation-BoldItalic'), url(http://myuserjs.org/fonts/Sansation-BoldItalic.ttf) format('ttf');}\n", M = {
        id: "jMod",
        config: {},
        el: s.document && s.document.currentScript ? s.document.currentScript : o
    }, V = function(a, n, o, r) {
        var e = {
            configurable: !1,
            enumerable: !1 === r ? r : !0
        };
        "function" == typeof n ? e.get = n : (e.value = n, e.writable = !1), Object.defineProperty(o || t, a, e);
    };
    V("ScriptElement", function() {
        return M.el ? M : o;
    }), V("version", "0.0.17"), V("build_time", "1421823017000"), V("build_type", "release"), 
    V("_debug", !1), Object.defineProperty(t, "debug", {
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
            return F ? F : n != typeof $ ? F = !0 : n != typeof jQuery ? ($ = jQuery, F = !0) : n != typeof s.jQuery ? ($ = s.jQuery, 
            F = !0) : !1;
        },
        set: function(e) {
            F = e ? !0 : !1;
            try {
                "jQuery" == A(e) && ($ = e);
            } catch (t) {}
        },
        enumerable: !1
    }), V("jQuery", function() {
        return t.jQueryAvailable ? $ : o;
    });
    var S = new function() {
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
            return S.now - t.InitializeStartTime;
        }
    });
    var v = t.Loading = {
        DOMLoaded: !1,
        CSSAdded: !1,
        performanceReady: !1,
        documentComplete: !1,
        jModReady: !1,
        Complete: !1
    };
    Object.defineProperty(t, "CSS", {
        get: function() {
            return nt;
        },
        set: function(e) {
            nt += e, v.CSSAdded && t.AddCSS();
        },
        enumerable: !1
    }), t.AddCSS = function(e) {
        St(nt + (e || "")), nt = "";
    };
    var ut = {
        SearchForKey: {
            value: K,
            enumerable: !1
        },
        SearchForKeys: {
            value: It,
            enumerable: !1
        },
        setKeyValue: {
            value: _t,
            enumerable: !1
        },
        SearchForKeyI: {
            value: bt,
            enumerable: !1
        },
        setKeyValueI: {
            value: wt,
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
    var y = function(e) {
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
    var J = t.URLBuilder = function(e) {
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
                var n = D(t[e], [ "name", "key" ]), r = D(t[e], [ "value" ]);
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
            e = H(t, s, {
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
    }, Z = function(e) {
        try {
            if ("object" != typeof e || e.nodeType || e === e.window) return !1;
            if (e.constructor && !e.hasOwnProperty.call(e.constructor.prototype, "isPrototypeOf")) return !1;
        } catch (n) {
            var t = H(e, s, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
            if ("object" != typeof t || t.nodeType || t === t.window) return !1;
            if (t.constructor && !t.hasOwnProperty.call(t.constructor.prototype, "isPrototypeOf")) return !1;
        }
        return !0;
    }, Q = function(e) {
        try {
            if (e.constructor === [].constructor) return !0;
        } catch (n) {
            var t = H(e, s, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
            if (t.constructor === [].constructor) return !0;
        }
        return !1;
    }, Wt = function(e) {
        return "function" == typeof e;
    };
    t.extend = function() {
        var c, i, r, n, l, s, e = arguments[0] || {}, a = 1, f = arguments.length, u = !1;
        for ("boolean" == typeof e && (u = e, e = arguments[a] || {}, a++), "object" != typeof e && "function" != typeof e && (e = {}), 
        a === f && (e = this, a--); f > a; a++) if (null != (c = arguments[a])) for (i in c) if (r = e[i], 
        n = c[i], e !== n) if (u && n && (Z(n) || (l = Q(n)))) l ? (l = !1, s = r && Q(r) ? r : []) : s = r && Z(r) ? r : {}, 
        e[i] = t.extend(u, s, n); else if (n !== o) try {
            e[i] = n;
        } catch (d) {
            e[i] = H(n, e, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
        }
        return e;
    }, t.extendp = function() {
        var i, r, n, t, c, s, d, e = arguments[0] || {}, a = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof e && (l = e, e = arguments[a] || {}, a++), "object" != typeof e && "function" != typeof e && (e = {}), 
        a === u && (e = this, a--); u > a; a++) if (null != (i = arguments[a])) for (r in i) if (n = e[r], 
        t = i[r], e !== t) if (l && t && (Z(t) || (c = Q(t)))) {
            if (c) {
                if (Q(n) && Array.prototype.push.apply(e[r], t)) continue;
                s = n && Q(n) ? n : [];
            } else s = n && Z(n) ? n : {};
            e[r] = jQuery.extendp(l, s, t);
        } else if (t !== o) try {
            e[r] = t;
        } catch (f) {
            e[r] = H(t, e, {
                cloneFunctions: !0,
                wrapReflectors: !0
            });
        }
        return e;
    }, function() {
        var i = "", u = "?", l = "function", f = "undefined", o = "object", e = "major", s = "model", n = "name", c = "type", a = "vendor", r = "version", d = "architecture", p = "console", m = "mobile", g = "tablet", y = "smarttv", h = "wearable", b = "embedded";
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
        return vt("Height");
    }, s.viewportSize.getWidth = function() {
        return vt("Width");
    };
    var vt = function(e) {
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
        debug: !1
    }), "object" == typeof s.jMOD_CONFIGURATION && (t.Config = t.extend(!0, t.Config, s.jMOD_CONFIGURATION)), 
    Object.defineProperties(t.Config, ut);
    var B = function(e, r) {
        return typeof r === n ? t.Config.SearchForKeyI(e) : t.Config.setKeyValueI(e, r);
    };
    if (a.scanElement = function(a) {
        if (a && y(a)) {
            var i = {}, r = 0, n, e, s, c = /^(?:data-)?(.*?)$/i, o = a.attributes;
            for (r; r < o.length; r++) if (n = o[r].nodeName, n = c.exec(n)[1], e = o[r].value) {
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
                        u.error('Error parsing "' + o[r].nodeName + '"', a, l);
                        continue;
                    }
                    break;

                  default:
                    switch (n = n.split("-").join("."), s = B(n), typeof s) {
                      case "number":
                        B(n, parseInt(e));
                        break;

                      case "boolean":
                        B(n, "true" == e.trim().toLowerCase() ? !0 : !1);
                        break;

                      case "string":
                        B(n, e);

                      case "object":
                        try {
                            e = JSON.parse(e), e && B(n, e);
                        } catch (l) {
                            u.error('Error parsing "' + o[r].nodeName + '"', a, l);
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
    }, M.el) if (M.config = a.scanElement(M.el), M.el.id && "" != M.el.id.trim()) M.id = M.el.id; else {
        if (s.document.getElementById(M.id)) {
            for (var O = 0; s.document.getElementById(M.id + "-" + O); ) O++;
            M.id = M.id + "-" + O;
        }
        M.el.id = M.id;
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
            }, t.debug && Rt("ScriptInfo", "Get Script File Info Successful!!", i, e), i;
        }
    }, Object.defineProperty(b, "InfoSet", {
        get: function() {
            return typeof a("script.script_info") !== n;
        }
    }), b.set = function(o) {
        var r = {};
        try {
            var d = b.getScriptFileInfo();
            typeof d !== n && (r = t.extend(r, d));
        } catch (f) {}
        try {
            var e, u, i;
            if (typeof o === n && typeof GM_info !== n && (o = {
                gm_info: GM_info,
                has_GM_info: !0,
                has_GM_getMetadata: typeof GM_getMetadata === n ? !1 : !0
            }), "object" == typeof o ? (e = D(o, [ "GM_info", "gm_info", "ginfo" ]), typeof e === n && typeof o.scriptSource !== n && (e = o), 
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
                var l, s = it(i, [ "downloadURL", "updateURL", "jModupdateURL", "jModUpdateURL", "jModdownloadURL", "jModDownloadURL" ], function(n, e) {
                    return t.ScriptInfo.getURLInfo(e);
                });
                if (typeof s !== n && (l = b.getURLInfo(i[s]))) a("script.username", l.username), 
                a("script.script_name", l.script_name), -1 != [ "meta", "metajs", "data" ].indexOf(l.get_type.toLowerCase()) && a("script.get_type", l.get_type.toLowerCase()); else {
                    var c;
                    (c = D(i, [ "jModusername", "jMod_username" ])) && a("script.username", c), (c = D(i, [ "jModscriptname", "jMod_script_name" ])) && a("script.script_name", c);
                }
                if (typeof i.jMod != n) try {
                    var p = JSON.parse(i.jMod);
                    p && t.extend(!0, t.Config, p);
                } catch (f) {
                    x(f, "ScriptInfo.set", "Error parsing options in MetaBlock");
                }
            }
        } catch (f) {
            x(f, "ScriptInfo.set");
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
    var Mt = function(n, e) {
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
            for (var d = parseInt(i), c = i && "0" == i[0] ? "0" : " "; n.length < d; ) n = u !== o ? n + c : c + n;
            return n;
        }
        var t = -1, a = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd])/g;
        return n.replace(a, r);
    }, E = t.Language = function(a) {
        var t, e, r = E.getLanguage(E.Current, !0);
        if (r) {
            if (e = K.call(r, a), t = typeof e, n == t) {
                if (E.Current === E.Default) return;
                if (r = E.getLanguage(E.Default), e = K.call(r, a), t = typeof e, n == t) return;
            }
            return 1 == arguments.length || "string" !== t ? e : Mt.call(Mt, e, d.call(arguments, 1));
        }
    };
    E.Default = "en", Object.defineProperty(E, "Current", {
        get: function() {
            try {
                return a.Language.Current;
            } catch (e) {
                return E.Default;
            }
        },
        set: function(e) {
            try {
                n !== typeof E.Names[e] && (a.Language.Current = e);
            } catch (t) {}
        }
    }), E.Names = {}, E.getLanguage = function(e, t) {
        return E.Names[e] !== o ? E[e] : t ? E[E.Default] : o;
    }, E.Names.en = "English", E.en = {}, E.Names.es = "Espanol", E.es = {}, t._call = function() {
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
                        if ("function" == typeof o && typeof t.Events.e[e] !== n) return t.Events.addListener.apply(t.Events, d.call(arguments));
                        if (2 == s && n !== typeof (r = a(e)) && typeof r == typeof o) return a(e, o);
                    }
                    if (-1 != t.log.fnList.join("|").toLowerCase().split("|").indexOf(e.toLowerCase()) && "function" == typeof (r = bt.call(t.log, e))) return r.apply(t.log, d.call(arguments, 1));
                } else if ("object" == i) {
                    if (!y(e)) {
                        if (typeof it(e, [ "GM_info", "gm_info", "ginfo" ]) !== n) return b.set.apply(b, d.call(arguments));
                        if (typeof e.scriptSource !== n && typeof e.scriptMetaStr !== n) return b.set.apply(b, d.call(arguments));
                    }
                } else if ("function" == i && 1 == s) return t.onReady = e, e;
                a("debug") && t.Warning("Unable to process jMod() call:", d.call(arguments));
            }
        } catch (l) {}
    }, t.$ = function(r, e, a) {
        n === typeof e && (e = s.document);
        try {
            if (t.jQueryAvailable && !0 !== a) try {
                return $(r, e).first()[0];
            } catch (o) {
                return;
            }
            if ("string" != typeof r) return;
            return e.querySelector(r);
        } catch (o) {
            t.Exception("jMod.Query", "Error!", o);
        }
    }, t.$$ = function(r, e, o) {
        e || (e = n !== typeof document ? document : s.document);
        try {
            if (t.jQueryAvailable && !0 !== o) try {
                return $(r, e).toArray();
            } catch (i) {
                return;
            }
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
            var n = d.call(arguments);
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
            x(r, "jMod.Element");
        }
    }, t.Element._call = function(e) {
        return "function" == typeof t.Element[e] ? t.Element[e].apply(t.Element, d.call(arguments, 1)) : o;
    }, t.Element.isElement = y;
    var C = t.Element.hasClass = function(e, t) {
        var n = e.className.split(" ");
        return -1 == n.indexOf(t) ? !1 : !0;
    }, qt = t.Element.hasClasses = function(a, e) {
        var n = [], o = a.className.split(" "), t = "string" == typeof e ? e.split(" ") : e;
        for (var r in t) -1 != o.indexOf(t[r]) && n.push(t[r]);
        return n;
    }, $t = t.Element.missingClasses = function(a, e) {
        var n = [], o = a.className.split(" "), t = "string" == typeof e ? e.split(" ") : e;
        for (var r in t) -1 == o.indexOf(t[r]) && n.push(t[r]);
        return n;
    }, w = t.Element.addClass = function(e, t) {
        return C(e, t) || (e.className = (e.className + " " + t).trim()), e;
    }, zt = t.Element.addClasses = function(t, n) {
        for (var r = "string" == typeof n ? n.split(" ") : n, a = t.className.split(" "), e = 0; e < r.length; e++) -1 == a.indexOf(r[e]) && a.push(r[e]);
        return t.className = a.join(" "), t;
    }, L = t.Element.removeClass = function(e, r) {
        var a = e.className, t = a.split(" "), n = t.indexOf(r);
        return -1 == n ? e : (t.splice(n, 1), e.className = t.join(" "), e);
    }, Ft = t.Element.removeClasses = function(e, r) {
        var t;
        t = "string" == typeof r ? d.call(arguments, 1) : r;
        var o = e.className, n = o.split(" ");
        for (var i in t) {
            var a = n.indexOf(t[i]);
            -1 != a && n.splice(a, 1);
        }
        return e.className = n.join(" "), e;
    }, Ut = function(e, t) {
        for (var n in t) e.setAttribute(n, t[n]);
        return e;
    }, Et = function(e, t) {
        return e.hasAttribute(t);
    }, Vt = function(n, e) {
        r = [], "string" == typeof e && (e = e.split(" "));
        for (var t = 0; t < e.length; t++) n.hasAttribute(e[t]) && r.push(e[t]);
        return r;
    }, j = function(e, t) {
        return e.getAttribute(t);
    }, k = t.Element.appendChild = function(e, t) {
        try {
            if (y(e) || "object" != typeof e || e.type === o) {
                if (typeof t === n || null === t) return e;
                if (y(t)) e.appendChild(t); else switch (A(t)) {
                  case n:
                  case "null":
                    break;

                  case "array":
                    for (var a = 0; a < t.length; a++) e = k(e, t[a]);
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
            x(c, "jMod.Element.appendChild");
        } finally {
            return e;
        }
    };
    const Y = [ "checked", "defaultValue", "title", "async", "defer", "src", "onerror", "onload", "responseCallback", "value", "max", "min" ];
    var g = t.Element.createNewElement = function(e) {
        var t, i = e.EventListeners || e.eventListeners, r = document.createElement(e.type || "div");
        if (e.id !== o && (r.id = e.id), e.className !== o ? r.className = e.className : e["class"] !== o && (r.className = e["class"]), 
        "string" == typeof e.style) r.style = e.style; else if ("object" == typeof e.style) for (t in e.style) r.style[t] = e.style[t];
        for (t = 0; t < Y.length; t++) e[Y[t]] !== o && (r[Y[t]] = e[Y[t]]);
        if (e.attributes !== o) for (t in e.attributes) typeof e.attributes[t] !== n && null !== e.attributes[t] && r.setAttribute(t, e.attributes[t]);
        if (i) for (var a in i) if ("function" == typeof i[a]) r.addEventListener(a, i[a]); else if ("object" == typeof i[a]) {
            var l = i[a].useCapture || i[a].Capture || i[a].capture || !1, s = i[a].callback || i[a]["function"];
            if (s) if ("array" == A(s)) for (t in s) r.addEventListener(a, s[t], l); else r.addEventListener(a, s, l);
        }
        return k(r, D(e, [ "innerHTML", "text" ])), r;
    }, Nt = t.Element.getOffset = function(t) {
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
    }, Bt = t.Element.findParentWithClass = function(n, r) {
        for (var e = n; e.parentElement; ) if (e = e.parentElement, t.Element.hasClass(e, r)) return e;
    };
    +function() {
        function r(e) {
            return n !== typeof e && n !== typeof e.timeStamp ? !0 : !1;
        }
        function c(e) {
            return "console" == A(e) ? !0 : n === typeof e || r(e) || n !== typeof e.dirxml || n === typeof e.trace ? !1 : !0;
        }
        function y(e) {
            return n === typeof e || r(e) || c(e) || n !== typeof e.dirxml || n !== typeof e.exception ? !1 : !0;
        }
        function f(e) {
            return e(u) ? u : e(this.console) ? this.console : e(p.console) ? p.console : e(s.console) ? s.console : e(s.window.console) ? s.window.console : o;
        }
        function h() {
            return f(r);
        }
        function b() {
            return f(y);
        }
        function E() {
            return f(c);
        }
        function v(e) {
            return -1 == a("API.log.disabled").indexOf(e) && a("API.log.verbosity_level") > 1;
        }
        var e, g = {
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
        }, m = [ [ "Error", "ERROR" ], [ "logError", "ERROR" ], [ "Exception", "EXCEPTION" ], [ "Warning", "WARNING" ], [ "Info", "INFO" ], [ "Log", "LOG" ], [ "Debug", "DEBUG" ] ], i = [ "assert", "clear", "count", "dir", "dirxml", "group", "groupCollapsed", "groupEnd", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace" ], l = [ "Debug", "Log", "Info", "Warning", "logError", "Exception" ];
        for (t.log = t.API.log = {
            OUTPUT_TYPES: g,
            fb: o,
            c2: o,
            wc: o,
            fnList: [].concat(l, i),
            updateFB: function(e) {
                r(e) && (a("API.log.debug") && u.info("jMod.API.log - Firebug Object: ", e), this.fb = e);
            },
            updateC2: function(e) {
                y(e) && (a("API.log.debug") && u.info("jMod.API.log - Console2 Object: ", e), this.c2 = e);
            },
            updateWC: function(e) {
                c(e) && (a("API.log.debug") && u.info("jMod.API.log - Web Console Object: ", e), 
                this.wc = e);
            },
            UpdateAll: function() {
                this.updateFB(h()), this.updateC2(b()), this.updateWC(E());
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
                    var t = d.call(arguments, 1), o = H(t, s, {
                        cloneFunctions: !0,
                        wrapReflectors: !0
                    }), i = -1 != [ "debug", "log", "info", "warn", "error", "exception" ].indexOf(e) && "string" == typeof r && /(?:\%s|\%c|\%o|\%d|\%f|\%\.\df|\%i)/.test(r);
                    try {
                        typeof this.fb !== n && typeof this.fb[e] !== n && a("API.log.Firebug") ? this.fb[e].apply(this.fb, t) : !i && typeof this.wc !== n && typeof this.wc[e] !== n && a("API.log.WebConsole") && this.wc[e].apply(this.wc, t);
                    } catch (l) {
                        typeof this.fb !== n && typeof this.fb[e] !== n && a("API.log.Firebug") ? this.fb[e].apply(this.fb, o) : !i && typeof this.wc !== n && typeof this.wc[e] !== n && a("API.log.WebConsole") && this.wc[e].apply(this.wc, o);
                    }
                } catch (l) {
                    u.error(l);
                }
            },
            outputMessage: function(e, t) {
                e.level <= a("API.log.verbosity_level") && this.ConsoleCommand.apply(this, [ e.value ].concat(d.call(arguments, 1)));
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
        }, e = 0; e < m.length; e++) t.API.log[m[e][0]] = function(e) {
            return function() {
                return this.outputMessage.apply(this, [ g[e] ].concat(d.call(arguments)));
            }.bind(t.API.log);
        }(m[e][1]);
        for (e = 0; e < i.length; e++) t.API.log[i[e]] = function(e) {
            return function() {
                return v(e) ? this.ConsoleCommand.apply(this, [ e ].concat(d.call(arguments))) : o;
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
    var x = function(r, a, o) {
        var e = "", i = 'font-size:175%;font-weight:300;font-family:"Sansation","Open Sans",Arial;', s = "color:#000;font-size:125%;", l = "color:blue;";
        typeof r !== n && null !== r ? arguments.length <= 3 ? t.log.ScopedConsoleCommand.call(t.log, "error", "%c%s%cjMod Error%c - %c%s \n%s \n%c%s - %c(line %d)", e + t.log.fmt.iconStyle, "  ", e + i, " ", e + s, a || " ", o || " ", e + " ", r.message, e + l, r.lineNumber, r) : t.log.ScopedConsoleCommand.call(t.log, "error", "%c%s%cjMod Error%c - %c%s \n%s \n%c%s - %c(line %d)", e + t.log.fmt.iconStyle, "  ", e + i, " ", e + s, a || " ", o || " ", e + " ", r.message, e + l, r.lineNumber, r, arguments[3]) : t.log.ScopedConsoleCommand.apply(t.log, [ "error", "%c%s%cjMod Error%c - %c%s \n%s", e + t.log.fmt.iconStyle, "  ", e + i, " ", e + s, a || " ", o || " " ].concat(d.call(arguments, 3)));
    }, tt = function(i, s) {
        if (!(t.log.OUTPUT_TYPES.WARNING.level > a("API.log.verbosity_level"))) {
            var o = 2, r = t.log.fmt.warningDefaultStyle, e = new t.API.logFormatBuilder();
            for (e.add("  ", "%s", r + t.log.fmt.iconStyle), e.add("jMod Warning", "string", r + t.log.fmt.warningHeaderStyle), 
            n !== typeof s ? (e.add(" - ", "string", r), e.add(i || " ", "%s", r + t.log.fmt.warningTitleStyle), 
            e.add(" \n", "string"), e.add(s || "", "%s", r + t.log.fmt.warningTextStyle)) : (e.add(" \n", "string"), 
            e.add(i || "", "%s", r + t.log.fmt.warningTextStyle)), arguments.length > 2 && e.add(" \n", "string"), 
            o; o < arguments.length; o++) e.add(arguments[o]);
            t.Warning.apply(t.log, e.build());
        }
    }, Rt = function(i, s) {
        if (!(t.log.OUTPUT_TYPES.INFO.level > a("API.log.verbosity_level"))) {
            var o = 2, r = t.log.fmt.infoDefaultStyle, e = new t.API.logFormatBuilder();
            for (e.add("  ", "%s", r + t.log.fmt.iconStyle), e.add("jMod", "string", r + t.log.fmt.infoHeaderStyle), 
            n !== typeof s ? (e.add(" - ", "string", r), e.add(i || " ", "%s", r + t.log.fmt.infoTitleStyle), 
            e.add(" \n", "string"), e.add(s || "", "%s", r + t.log.fmt.infoTextStyle)) : (e.add(" \n", "string"), 
            e.add(i || "", "%s", r + t.log.fmt.infoTextStyle)), arguments.length > 2 && e.add(" \n", "string"), 
            o; o < arguments.length; o++) e.add(arguments[o]);
            t.Info.apply(t.log, e.build());
        }
    }, R = function(r, o, i) {
        if (!(t.log.OUTPUT_TYPES.INFO.level > a("API.log.verbosity_level"))) {
            var s = (o || "") + t.timeElapsed.toFixed(2) + "ms" + (i || ""), n = t.log.fmt.infoDefaultStyle, e = new t.API.logFormatBuilder();
            e.add("  ", "%s", n + t.log.fmt.iconStyle), e.add("jMod", "string", n + t.log.fmt.infoHeaderStyle), 
            e.add(" - ", "string", n), e.add(r || " ", "%s", n + t.log.fmt.infoTitleStyle), 
            e.add(" ", "string"), e.add(s, "%s", n + t.log.fmt.time), t.Info.apply(t.log, e.build());
        }
    };
    t.log.Info("Loading jMod API v" + t.version + " " + t.build_type + (t.debug ? " (debug enabled)" : "") + " - " + new Date(parseInt(t.build_time))), 
    t.debug && (R("jMod Init Start Time"), t.log.group("jMod Start"), t.log.group("jMod Initialize"), 
    M.el && t.Info("CurrentRunningScript", M)), t.Events = {
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
                r = t.args) : r = d.call(arguments, 1), this.e[e].recordEvent && (this.fired[e].args = r, 
                this.fired[e]._this = a);
                for (var i = []; O = this.e[e].listeners.pop(); ) O.apply(a, r) || i.push(O);
                this.e[e].listeners = i, this.fired[e].count++;
            }
        }
    }, t.Events.addEvent("onDOMReady"), t.Events.addEvent("onReady"), t.Events.addEvent("onPageReady"), 
    t.Events.addEvent("onPerformanceReady"), t.Events.addEvent("load"), t.Events.addEvent("DOMContentLoaded"), 
    t.Events.addEvent("onreadystatechange"), t.Events.addEvent("afterscriptexecute", !1), 
    t.Events.addEvent("beforescriptexecute", !1);
    var mt = function(t) {
        var e = {};
        this.events = t || [], this.add = function(t, r, a) {
            -1 == this.events.indexOf(r) && this.events.push(r), typeof e[t] === n && (e[t] = {}), 
            typeof e[t][r] === n && (e[t][r] = []), e[t][r].push(a);
        }, this.addAll = function(t, n) {
            for (var e in this.events) "function" == typeof t[this.events[e]] && this.add(n, this.events[e], t[this.events[e]]);
        }, this.fire = function(o, t, i, s) {
            var a, r, t = e[t || "0"];
            try {
                if (typeof t !== n && typeof (r = t[o]) !== n) for (a in r) if (!1 === r[a].apply(i || null, s || [])) return u.log("fire canceled"), 
                !1;
            } catch (l) {
                x(l, "jMod.EventsClass.fire");
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
                        n = 0; n < e.target.hasClass.length; n++) if (!C(o.target, e.target.hasClass[n])) {
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
            return lt(e.buttonTriggerElement, n !== typeof t ? t : !0, n !== typeof r ? r : !0);
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
                    u.log("Button click triggered");
                    var e = this.previousSibling;
                    return e.focus(), lt(e), G(t), !1;
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
        if (!t.FileSelector.FileReadSupport) return t.debug && u.log("Error! No Support For File Reading!"), 
        !1;
        var a = new FileReader();
        return n ? (a.onload = function(e) {
            return r.call(this || t, e, e.target.result, n);
        }, a.onerror = function(e) {
            return t.debug && u.log("Error reading file", n), (i || r)(e, o, n);
        }, a.readAsText(n), !0) : (t.debug && u.log("Error reading file", n), (i || r)(e, o, n), 
        !1);
    }, t.FileSelector.ReadFileAsURL = function(n, r, i) {
        if (!t.FileSelector.FileReadSupport) return t.debug && u.log("Error! No Support For File Reading!"), 
        !1;
        var a = new FileReader();
        return n ? (a.onload = function(e) {
            return r.call(this || t, e, e.target.result, n);
        }, a.onerror = function(e) {
            return t.debug && u.log("Error reading file", n), (i || r)(e, o, n);
        }, a.readAsDataURL(n), !0) : (t.debug && u.log("Error reading file", n), (i || r)(e, o, n), 
        !1);
    }, t.FileSelector.ReadFileAsJSON = function(r, e, n) {
        return t.FileSelector.ReadFileAsText(r, function(a, i, r) {
            if (!i || "" == i) return t.debug && u.log("Error! JSON file is empty!", r), (n || e)(a, o, r);
            try {
                return e(a, JSON.parse(i), r);
            } catch (s) {
                return t.debug && u.log("Error! Cannot parse json file!", s, r), (n || e)(a, o, r);
            }
        });
    };
    var St = t.API.addStyle = function(e) {
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
            t.debug && tt("jMod.API.addStyle", "Could not add css", e);
        }
    };
    t.API.addStylesheet = function(n) {
        var e, r = p || s, a = r.document.getElementsByTagName("head");
        return a ? (e = r.document.createElement("link"), e.setAttribute("rel", "stylesheet"), 
        e.href = n, a[0].appendChild(e)) : (t.debug && tt("jMod.API.addStylesheet", "Could not add stylesheet", n), 
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
        deleteValue: function(e) {
            return this.stor.removeItem(a("API.Storage.prefix") + e);
        }
    }, Object.defineProperty(t.API.localStorage, "stor", {
        get: function() {
            return localStorage ? localStorage : s.localStorage ? s.localStorage : p.localStorage;
        },
        enumerable: !1
    }), t.getValue = function(e, t) {
        return "GM_Storage" == a("API.Storage.engine") && n != typeof GM_getValue ? T.GM_Storage.getValue.apply(T.GM_Storage, arguments) : T.localStorage.getValue.apply(T.localStorage, arguments);
    }, t.setValue = function(e, t) {
        return "GM_Storage" == a("API.Storage.engine") && n != typeof GM_setValue ? T.GM_Storage.setValue.apply(T.GM_Storage, arguments) : T.localStorage.setValue.apply(T.localStorage, arguments);
    }, t.deleteValue = function(e) {
        return "GM_Storage" == a("API.Storage.engine") && n != typeof GM_deleteValue ? T.GM_Storage.deleteValue.apply(T.GM_Storage, arguments) : T.localStorage.deleteValue.apply(T.localStorage, arguments);
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
                    t("data:" + (e && "" != e ? e : "image/png") + ";base64," + Ot(o.responseText));
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
            return t.API.Date.parseUTCDate.apply(t.API.Date, d.call(arguments, 1));
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
    }, t.jQueryExtensions = {}, t.jQueryExtensions.addCrossDomainSupport = function(e) {
        n != typeof GM_xmlhttpRequest && (e || (e = t.jQuery), e.ajaxTransport("* text html xml json", function(e, r, i) {
            if (n !== typeof GM_xmlhttpRequest) {
                var a = t.extend(!0, {}, e, r), o = {
                    context: "context",
                    overrideMimeType: "overrideMimeType",
                    timeout: "timeout",
                    username: "user",
                    password: "password"
                };
                return {
                    send: function(u, f) {
                        function l(e, t, n) {
                            var r = 200 === e ? "success" : "error";
                            f(e, r, t, n);
                        }
                        var i = (r.dataType || "").toLowerCase(), c = {
                            method: e.type || "GET",
                            url: e.url,
                            data: t.extend({}, e.data || {}, r.data || {}),
                            headers: u,
                            onload: function(e) {
                                var t = {
                                    text: e.responseText
                                }, n = "", r = /Content-Type:\s*([^\s]+)/i;
                                try {
                                    n = r.exec(e.responseHeaders)[1];
                                } catch (a) {}
                                if ("html" === i || /text\/html/i.test(n)) t.html = e.responseText; else if ("json" === i || "text" !== i && /\/json/i.test(n)) try {
                                    t.json = $.parseJSON(e.responseText);
                                } catch (a) {} else if ("xml" == i || "text" !== i && /\/xml/i.test(n)) try {
                                    t.xml = new DOMParser().parseFromString(e.responseText, "text/xml");
                                } catch (a) {}
                                l(200, t, e.responseHeaders);
                            },
                            onerror: function(e) {
                                l(404, {
                                    text: e.responseText
                                }, e.responseHeaders);
                            }
                        };
                        for (var s in o) n !== typeof a[s] && (c[o[s]] = a[s]);
                        GM_xmlhttpRequest(c);
                    },
                    abort: function() {}
                };
            }
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
    var ot = "Tooltip.containerId", U = "Tooltip.attributeNames.id", P = "Tooltip.attributeNames.tooltip", at = "Tooltip.attributeNames.placement", Dt = "Tooltip.attributeNames.margin", _ = "Tooltip.classNames.tooltipTarget", rt = "Tooltip.classNames.tooltip", c = t.Tooltip = function(e, n) {
        y(e) && t.Tooltip.AddTooltipsToElement.apply(t.Tooltip, arguments);
    }, z;
    Object.defineProperties(c, {
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
                return c.Initialized || c.init(), z || (z = document.getElementById(a(ot))), z;
            },
            set: function(e) {
                z = e;
            }
        },
        get: {
            value: function(e) {
                var n, r, o, t = a(U);
                if (y(e)) return C(e, a(rt)) ? document.querySelector("." + a(_) + " [" + t + '="' + e.id + '"]') : (C(e, a(_)) && e.hasAttribute(t) ? n = e.getAttribute(t) : this.TooltipContainer && null !== (o = this.TooltipContainer.querySelector("." + a(_) + " [" + t + "]")) && (n = o.getAttribute(t)), 
                document.getElementById(n));
                if ("string" == typeof e) {
                    if (null !== (r = document.getElementById(e))) return r;
                } else if ("number" == typeof e && this.TooltipContainer && this.TooltipContainer.childElementCount > e) return tooltipContainer.children[e];
                return null;
            }.bind(c)
        }
    });
    var W = 200;
    c.MoveTooltip = function(e, t, n) {
        "top" in n ? t.style.top = n.top : "bottom" in n && (t.style.bottom = n.bottom), 
        "left" in n ? t.style.left = n.left : "right" in n && (t.style.right = n.right);
        var r = a("Tooltip.attributeNames.margin");
        e.hasAttribute(r + "-top") && (t.style.marginTop = e.getAttribute(r + "-top")), 
        e.hasAttribute(r + "-left") && (t.style.marginLeft = e.getAttribute(r + "-left")), 
        e.hasAttribute(r + "-bottom") && (t.style.marginBottom = e.getAttribute(r + "-bottom")), 
        e.hasAttribute(r + "-right") && (t.style.marginRight = e.getAttribute(r + "-right"));
    }, c.MoveTooltipToTarget = function(i, o, l) {
        var t, n, r, u, f;
        if (C(i, a(rt))) t = i; else {
            if (!i.hasAttribute(a(U))) return;
            t = document.getElementById(i.getAttribute(a(U)));
        }
        var s = o.getAttribute(a(at)) || "top", e = Nt(o);
        switch (s) {
          case "left-top":
            n = parseInt(e.top), r = e.left - parseInt(t.offsetWidth), c.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "left-bottom":
            n = e.top + e.height - parseInt(t.offsetHeight), r = e.left - parseInt(t.offsetWidth), 
            c.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "left":
            n = e.top + parseInt(e.height / 2) - parseInt(parseInt(t.offsetHeight) / 2), r = e.left - parseInt(t.offsetWidth), 
            c.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "right-top":
            n = parseInt(e.top), r = e.left + e.width, c.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "right-bottom":
            n = e.top + e.height - parseInt(t.offsetHeight), r = e.left + e.width, c.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "right":
            n = e.top + parseInt(e.height / 2) - parseInt(t.offsetHeight / 2), r = e.left + e.width, 
            c.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "bottom-left":
            n = e.top + e.height, r = e.left, c.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "bottom-right":
            n = e.top + e.height, r = e.left + e.width - parseInt(t.offsetWidth), c.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "bottom":
            n = e.top + e.height, r = e.left + parseInt(e.width / 2) - parseInt(parseInt(t.offsetWidth) / 2), 
            c.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "top-left":
            n = e.top - parseInt(t.offsetHeight), r = e.left, c.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "top-right":
            n = e.top - parseInt(t.offsetHeight), r = e.left + e.width - parseInt(t.offsetWidth), 
            c.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
            break;

          case "top":
          default:
            n = e.top - parseInt(t.offsetHeight), r = e.left + parseInt(e.width / 2) - parseInt(parseInt(t.offsetWidth) / 2), 
            c.MoveTooltip(o, t, {
                top: n + "px",
                left: r + "px"
            });
        }
    }, c.HideAllExcept = function(i) {
        for (var r = [], e, o = t.$$(".jmod-na ." + a(rt) + ".in"), n = 0; n < o.length; n++) e = o[n], 
        "block" == e.style.display && e !== i && (L(e, "in"), r.push(e));
        setTimeout(function(t) {
            for (var e = 0; e < t.length; e++) C(t[e], "in") || (t[e].style.display = "none");
        }, W, r);
    }, c.handler = {
        mouseenter: function(i) {
            var n = this.getAttribute(a(U)), r = this.getAttribute(a(P)), e = this.getAttribute(a(at)) || "top", o = c.TooltipContainer;
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
                className: a(rt) + " " + e + " fade slow",
                style: {
                    display: "none"
                },
                innerHTML: [ '<div class="tooltip-arrow"></div>', '<div class="tooltip-inner">' + r + "</div>" ]
            }), t.addEventListener("mouseenter", function(t) {
                var e = p.getComputedStyle(this, null).getPropertyValue("opacity");
                e > .2 && (w(this, "in"), c.HideAllExcept(this));
            }), t.addEventListener("mouseleave", function(e) {
                var t = p.getComputedStyle(this, null).getPropertyValue("opacity");
                L(this, "in"), setTimeout(function(e) {
                    C(e, "in") || (e.style.display = "none");
                }, W, this);
            }), t.addEventListener("click", function(e) {
                L(this, "in"), setTimeout(function(e) {
                    C(e, "in") || (e.style.display = "none");
                }, W, this);
            }), o.appendChild(t)), c.HideAllExcept(t), t.style.display = "block", setTimeout(function(t, e) {
                w(e, "in"), c.MoveTooltipToTarget(e, t);
            }, 1, this, t);
        },
        mouseleave: function(t) {
            var e = c.get(this);
            e && (L(e, "in"), setTimeout(function(e) {
                C(e, "in") || (e.style.display = "none");
            }, W, e));
        },
        scroll: function(i) {
            var e, o, n;
            e = Lt(this, "jmod-na") ? t.$$("." + a(_) + "[" + a(P) + "]", this) : t.$$(".jmod-na ." + a(_) + "[" + a(P) + "]", this);
            for (var r = 0; r < e.length; r++) o = e[r].getAttribute(a(U)), n = document.getElementById(o), 
            n && "block" == n.style.display && c.MoveTooltipToTarget(n, e[r]);
        }
    }, c.getTooltipsFromElement = function(o) {
        for (var i, r = [], n = t.$$("." + a(_) + "[" + a(P) + "]", o), e = 0; e < n.length; e++) n[e].getAttribute(a(P)) && r.push(n[e]);
        return r;
    }, c.AddTooltipsToElement = function(r) {
        for (var n = c.getTooltipsFromElement(r), e = 0; e < n.length; e++) {
            n[e].setAttribute(a(U), "jmod-tooltip-" + c.Count++), n[e].addEventListener("mouseenter", c.handler.mouseenter), 
            n[e].addEventListener("mouseleave", c.handler.mouseleave);
            for (var t = n[e]; t.parentElement; ) t = t.parentElement, t.hasAttribute("data-jmod-scroll-event") || (t.setAttribute("data-jmod-scroll-event", !0), 
            t.addEventListener("scroll", c.handler.scroll));
        }
        r.addEventListener("scroll", c.handler.scroll);
    }, c.init = function() {
        c.Initialized = !0;
        var e = document.getElementById(a(ot));
        null == e && (e = document.createElement("div"), e.id = a(ot), e.className = "jModTooltipContainer jmod-na jmod-fa", 
        document.body.appendChild(e), z = e);
    }, t.CSS = ".jmod-na .fade.slow {transition: opacity " + (W / 1e3).toFixed(2) + "s linear 0s;}", 
    t.Config.Notifications = {
        enabled: !0
    };
    var l = t.Notification = function(e, i) {
        if (!a("Notifications.enabled")) return !1;
        if (t.Notification.Initialized || t.Notification.init(), "string" == typeof e) switch (e.toLowerCase()) {
          case "get":
          case "getelement":
            return t.Notification.getElement.apply(t.Notification, d.call(arguments, 1));
            break;

          case "getid":
          case "getelementid":
            return t.Notification.getElementId.apply(t.Notification, d.call(arguments, 1));
            break;

          case "updatenotification":
            return t.Notification.UpdateNotification.apply(t.Notification, d.call(arguments, 1));
        } else if ("object" == typeof e) switch ((e.type || "").toLowerCase()) {
          case "small":
            var r = t.Notification("getElement", "notificationsSmallWrapper"), n = jt(e);
            r.appendChild(n), t.Notification.Events.addAll(e, t.Notification.count), t.Notification.count++, 
            t.Notification.SmallCount++;
            break;

          case "large":
          default:
            var o = t.Notification("getElement", "notificationsLargeWrapper"), n = Tt(e);
            o.appendChild(n), t.Notification.Events.addAll(e, t.Notification.count), t.Notification.count++, 
            t.Notification.LargeCount++;
        }
    };
    l.UpdateNotification = function(s) {
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
        var c = e.title.replace("%SCRIPTNAME%", e.script_name).replace("%VERSION%", e.version).replace("%TIME%", e.time), u = e.body.replace("%SCRIPTNAME%", e.script_name).replace("%VERSION%", e.version).replace("%TIME%", e.time);
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
        l({
            title: c,
            body: u,
            footer: o,
            icon: e.icon,
            iconAnimation: e.iconAnimation,
            type: "small"
        });
    }, l.getElementId = function(e) {
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

          default:
            return null;
        }
    }, l.getElement = function(e) {
        var t = l.getElementId(e);
        return document.getElementById(null != t ? t : e);
    }, l.remove = function(t, r) {
        if (null != t) {
            if (t.hasAttribute("data-jmod-small-notification")) {
                var e = t, n = parseInt(t.style.top || 0);
                for (0 >= n && (n = 20); null != e.nextElementSibling && e.nextElementSibling.hasAttribute("data-jmod-small-notification"); ) e = e.nextElementSibling, 
                e.className = "jModSmallNotification SmallBox transitionUp", e.style.top = n + "px", 
                n = n + parseInt(e.offsetHeight) + 25;
            }
            t.parentElement.removeChild(t);
        }
    }, l.close = function(e, r, t, a, n) {
        if (null != e) switch (l.Events.fire(t, "onBeforeClose", e, n), r.toLowerCase()) {
          case "large":
            e.setAttribute("class", "jModLargeNotification bigBox animated fadeOut fast"), setTimeout(function(e, t, n) {
                l.remove(e, t), l.Events.fire(t, "onAfterClose", e, n);
            }, 400, e, t, n);
            break;

          case "small":
            e.setAttribute("class", "jModSmallNotification SmallBox animated fadeOut fast"), 
            setTimeout(function(e, t, n) {
                l.remove(e, t), l.Events.fire(t, "onAfterClose", e, n);
            }, 400, e, t, n);
        }
    }, l.Events = {
        eventListeners: {},
        events: [ "onBeforeClose", "onAfterClose" ],
        add: function(e, t, r) {
            typeof this.eventListeners[e] === n && (this.eventListeners[e] = {}), typeof this.eventListeners[e][t] === n && (this.eventListeners[e][t] = []), 
            this.eventListeners[e][t].push(r);
        },
        addAll: function(t, n) {
            for (var e in this.events) "function" == typeof t[this.events[e]] && this.add(n, this.events[e], t[this.events[e]]);
        },
        fire: function(t, a, o) {
            var r, e, i;
            if (typeof this.eventListeners[t] !== n && typeof this.eventListeners[t][a] !== n) for (typeof o !== n && y(o) ? (e = o, 
            r = d.call(arguments, 3)) : (e = document.querySelector('div[data-jmod-notification="' + t + '"]'), 
            null == e && (e = s), r = d.call(arguments, 2)), r.unshift(a); typeof (i = this.eventListeners[t][a].shift()) !== n; ) i.apply(e, r);
        }
    }, l.count = 0, l.LargeCount = 0, l.SmallCount = 0, Object.defineProperties(l, {
        CurrentLargeCount: {
            get: function() {
                var e = l("getElement", "notificationsLargeWrapper");
                return t.$$("div[data-jmod-large-notification]", e).length;
            }
        },
        CurrentSmallCount: {
            get: function() {
                var e = l("getElement", "notificationsSmallWrapper");
                return t.$$("div[data-jmod-small-notification]", e).length;
            }
        }
    }), l.Initialized = !1, l.init = function() {
        if (!a("Notifications.enabled")) return !1;
        l.Initialized = !0;
        var r = document.getElementsByTagName("head")[0], o = document.getElementsByTagName("body")[0], e = l("getElement", "notificationsWrapper");
        null == e && (e = document.createElement("div"), e.id = l("getElementId", "notificationsWrapper"), 
        e.className = "jModNotificationsFullWrapper jmod-na jmod-fa", document.body.appendChild(e));
        var t = l("getElement", "notificationsSmallWrapper");
        null == t && (t = document.createElement("div"), t.id = l("getElementId", "notificationsSmallWrapper"), 
        t.className = "jModSmallNotifications", e.appendChild(t));
        var n = l("getElement", "notificationsLargeWrapper");
        null == n && (n = document.createElement("div"), n.id = l("getElementId", "notificationsLargeWrapper"), 
        n.className = "jModNotifications", e.appendChild(n));
    }, t.CSS = '#jModSmallNotificationsWrapper,#jModNotificationsWrapper,.jmod-na .SmallBox span,.jmod-na .bigBox span{font-family:"Open Sans",Arial,Helvetica,sans-serif;}', 
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
    var N = m.att = {}, ct = m.cn = {};
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
    }), m.Events = new mt([ "onBeforeShow", "onAfterShow" ]), m.handler = {
        click: function(n) {
            var e = n.target, l = e.parentElement;
            if (this.contains(e) && "A" == e.nodeName) {
                var r = this.parentElement.querySelector("." + ct.ct), a = j(e, "href");
                if (a) {
                    var o = r.querySelector(".tab-pane.active"), i = this.querySelector("li.active"), t = r.querySelector(a);
                    if (t) {
                        var s = j(this, N.ul);
                        !1 !== m.Events.fire("onBeforeShow", parseInt(s), this, [ e, t ]) && (i && L(i, "active"), 
                        o && L(o, "active"), w(l, "active"), w(t, "active"), m.Events.fire("onAfterShow", parseInt(s), this, [ e, t ]));
                    }
                }
                G(n);
            }
        }
    }, m.load = function(e) {
        var r, n, s;
        if (y(e)) n = e; else {
            if ("object" != typeof e || !e.target) return;
            n = e.target, s = e.EventListeners;
        }
        if (r = C(n, "tabbable") ? [ n ] : t.$$("div.tabbable", n)) for (var a = 0; a < r.length; a++) {
            var o = r[a].querySelector(".nav." + ct.nav), i = r[a].querySelector("." + ct.ct);
            o && i && (o.setAttribute(N.ul, m.GroupCount), i.setAttribute(N.ct, m.GroupCount), 
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
        return t.attributes[N.li] = e.index || -1, t;
    }, m.makeContentElement = function(e) {
        var t = {
            type: "div",
            id: e.id,
            className: "container tab-pane " + (e.isActive || e.active ? "active " : "") + (e.className || e["class"] || ""),
            innerHTML: e.innerHTML || e.text || "",
            attributes: e.attributes || {}
        };
        return t.attributes[N.pane] = e.index || -1, t;
    }, m.show = function(e, n) {
        var a, o, r;
        if ("number" == typeof e && (e = document.querySelector("ul[" + N.ul + '="' + e + '"]')), 
        y(e)) {
            if (Et(e, N.li)) r = e; else if ("number" == typeof n) r = t.$$("li[" + N.li + "]", e)[n]; else if ("string" == typeof n) {
                for (o = t.$$("li[" + N.li + "]", e), a = 0; a < o.length; a++) if (o[a].innerHTML == n) {
                    r = o[a];
                    break;
                }
            } else y(n) && Et(n, N.li) && (r = n);
            if (r && y(r)) return lt(r.querySelector('a[data-toggle="tab"]'));
        }
    }, m.resize = function(e) {
        gt(e, xt);
    }, t.Config.Modal = t.extend({
        enabled: !0,
        cn: {
            container: "jModModalContainer"
        },
        id: {
            container: "jModModalContainer"
        }
    }, t.Config.Modal || {});
    var Ht = "Modal.cn.container", dt = "Modal.id.container", f = t.Modal = function(e, l) {
        if (!a("Modal.enabled")) return !1;
        t.Modal.Initialized || t.Modal.init();
        try {
            if ("string" == typeof e) switch (e.toLowerCase()) {
              case "show":
              case "showmodal":
                return t.Modal.show.apply(t.Modal, d.call(arguments, 1));
                break;

              case "hide":
              case "hidemodal":
                return t.Modal.hide.apply(t.Modal, d.call(arguments, 1));
            } else if ("object" == typeof e) {
                var r = t.Modal.createModal(e), i = parseInt(j(r, "data-jmod-modal")), c = g({
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
                                return e.target === this ? (this.style.display = "none", L(document.body, "jmod-modal-open"), 
                                G(e), !1) : o;
                            }
                        }
                    }
                }), s = f.Container;
                return s && (s.appendChild(c), s.appendChild(r)), t.Modal.Modals[i] = {
                    index: i,
                    element: r,
                    lockScreen: e.lockScreen || !0,
                    data: e
                }, typeof e.features !== n && t.Modal.addJSFeatures(r, e.features), !0 === l && t.Modal.show(r), 
                r;
            }
        } catch (u) {
            x(u, "jMod.Modal");
        }
    }, et;
    Object.defineProperties(f, {
        fn: {
            value: f.__proto__
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
                return et ? et : et = document.getElementById(a(dt));
            },
            set: function(e) {
                et = e;
            }
        }
    });
    const yt = 150;
    f.getModal = function(e) {
        var t = document.querySelector('div[data-jmod-modal="' + e + '"]');
        return t ? t : typeof f.Modals[e] !== n ? f.Modals[e].element : null;
    }, f.addJSFeatures = function(e, n) {
        n.enableTabs && t.Tabs.load({
            target: e,
            onBeforeShow: function() {
                u.log("Tabs onBeforeShow: ", arguments);
            }
        }), n.enableTooltips && c(e);
    }, f.show = function(e, t, r) {
        try {
            if ("number" == typeof e && "number" != typeof t && (typeof r === n && typeof t !== n && (r = t), 
            t = e), (typeof e === n || null == e) && typeof t === n) return;
            if (typeof e !== n && null != e && "number" != typeof e || "number" != typeof t ? typeof e !== n && null != e && typeof t === n && (t = j(e, "data-jmod-modal")) : e = document.querySelector('div[data-jmod-modal="' + t + '"]'), 
            -1 != f.CurrentModal && f.CurrentModal != t && f.hide(), e) {
                var a = document.querySelector('div[data-jmod-modal-backdrop="' + t + '"]'), o = f.Events.fire("onBeforeShow", t, e, [ r || null ]);
                f.CurrentModal = t, w(document.body, "jmod-modal-open"), a.style.display = "block", 
                e.style.display = "block", setTimeout(function(e, t) {
                    w(t, "in"), w(e, "in");
                }, 1, e, a), setTimeout(function(e, t, n) {
                    f.Events.fire("onAfterShow", t, e, [ n || null ]);
                }, yt, e, t, r || null);
            }
        } catch (r) {
            x(r, "jMod.Modal.show");
        }
    }, f.hide = function(t, e, r) {
        try {
            if (typeof t === n && typeof e === n && -1 != f.CurrentModal && (e = f.CurrentModal, 
            t = f.getModal(f.CurrentModal)), "number" == typeof t && "number" != typeof e && (typeof r === n && typeof e !== n && (r = e), 
            e = t), typeof t === n && typeof e === n) return;
            if (y(t) || "number" != typeof e ? typeof t !== n && typeof e === n && (e = j(t, "data-jmod-modal")) : t = f.getModal(e), 
            t) {
                var a = document.querySelector('div[data-jmod-modal-backdrop="' + e + '"]'), o = f.Events.fire("onBeforeHide", e, t, [ r || null ]);
                f.CurrentModal = -1, L(document.body, "jmod-modal-open"), L(t, "in"), L(a, "in"), 
                setTimeout(function(e, t, n, r) {
                    e.style.display = "none", r.style.display = "none", f.Events.fire("onAfterHide", t, e, [ n || null ]);
                }, yt, t, e, r || null, a);
            }
        } catch (r) {
            x(r, "jMod.Modal.hide");
        }
    }, f.Events = new mt([ "onBeforeShow", "onAfterShow", "onBeforeHide", "onAfterHide" ]), 
    f.createModal = function(e) {
        var l = f.ModalCount++;
        f.Events.addAll(e, l);
        var u = g({
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
                            var t = e.target, n = parseInt(j(t, "data-jmod-modal"));
                            return f.hide(t, n, e), G(e), !1;
                        }
                    }
                }
            }
        }), i = g({
            type: "div",
            className: "modal-dialog"
        });
        if (typeof e.style !== n) for (var c in e.style) i.style[c] = e.style[c];
        u.appendChild(i);
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
        var d = g({
            type: "div",
            className: "modal-body"
        });
        a.appendChild(d);
        var o = g({
            type: "div",
            className: "modal-footer"
        });
        a.appendChild(o), k(s, e.title);
        var y = g({
            type: "div",
            className: "yt-close-btn-wrapper",
            innerHTML: '<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-close-btn">',
            EventListeners: {
                click: {
                    capture: !1,
                    callback: function(e) {
                        var t = e.target.parentElement.parentElement.parentElement.parentElement.parentElement, n = parseInt(j(t, "data-jmod-modal"));
                        return f.hide(t, n, e);
                    }
                }
            }
        });
        if (s.appendChild(y), k(d, e.body), k(o, e.footer), typeof e.buttons !== n) for (var p in e.buttons) try {
            var m = t.extend(!0, {
                type: "button",
                text: "button"
            }, e.buttons[p]), r = g(m);
            r && (C(r, "btn") || w(r, "brn"), /btn\-(default|primary|success|info|warning|danger)/i.test(r.className) || w(r, "btn-default"), 
            o.appendChild(r));
        } catch (h) {
            x(h, "jMod.Modal.createModal", "footer buttons");
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
                            var t = e.target.parentElement.parentElement.parentElement.parentElement, n = parseInt(j(t, "data-jmod-modal"));
                            return f.hide(t, n, e), G(e), !1;
                        }
                    }
                }
            }
        });
        return o.appendChild(b), u;
    }, f.init = function() {
        f.Initialized = !0;
        var e = f.Container;
        null == e && (e = document.createElement("div"), e.id = a(dt), e.className = "jmod-na jmod-fa " + a(Ht), 
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
    var Gt = "Settings.id.modal", Pt = "Settings.cn.modal", i = t.Settings = function(e, n) {
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
            return typeof this._types[e] !== n && "function" == typeof this._types[e][t] ? this._types[e][t].apply(this._types[e], d.call(arguments, 2)) : o;
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
        onChange: function(f, g) {
            var r, a, c, s, l, o = !0, p, d, u = !1, e = 0;
            try {
                r = i._data.settings;
            } catch (y) {
                return;
            }
            for (e; e < r.length; e++) if (o = !0, r[e].depend && ("function" == typeof r[e].depend || n == typeof f || n !== typeof r[e].depend[f])) {
                if ("function" == typeof r[e].depend) d = t.$('#jModSettingsModal [name="' + r[e].name + '"]'), 
                o = r[e].depend(d, r[e]); else for (c in r[e].depend) {
                    a = r[e].depend[c], p = typeof a;
                    var m = i.PrefTypes.getDataByName(c);
                    try {
                        u = 1 == i.PrefTypes._types[m.type].multiValue;
                    } catch (y) {
                        u = !1;
                    }
                    switch (f == c ? s = g : n == typeof (s = this.getValueByName(c)) && (s = i.get(c)), 
                    u && (s = s.split(",")), p) {
                      case "function":
                        o = a(t.$('#jModSettingsModal [name="' + r[e].name + '"]'), r[e], s, m);
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
            return n == typeof e.tooltip || n == typeof e.tooltip.innerHTML && n == typeof e.tooltip.text || (r.innerHTML = I(r.innerHTML, e.tooltip)), 
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
                n == typeof e.options[t].tooltip || n == typeof e.options[t].tooltip.innerHTML && n == typeof e.options[t].tooltip.text || (a.innerHTML[1] = I(a.innerHTML[1], e.options[t].tooltip)), 
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
            for (var r = n.split(","), e = 0; e < t.options.length; e++) t.options[e].checked = -1 != r.indexOf(j(t.options[e], "name")) ? !0 : !1;
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
                n == typeof e.options[t].tooltip || n == typeof e.options[t].tooltip.innerHTML && n == typeof e.options[t].tooltip.text || (r.innerHTML[1] = I(r.innerHTML[1], e.options[t].tooltip)), 
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
            for (var e = 0; e < t.options.length; e++) t.options[e].checked = j(t.options[e], "name") == n ? !0 : !1;
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
                n == typeof e.options[t].tooltip || n == typeof e.options[t].tooltip.innerHTML && n == typeof e.options[t].tooltip.text || (r.innerHTML[1] = I(r.innerHTML[1], e.options[t].tooltip)), 
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
            for (var r = n.split(","), e = 0; e < t.options.length; e++) t.options[e].checked = -1 != r.indexOf(j(t.options[e], "name")) ? !0 : !1;
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
            if (n == typeof e.tooltip || n == typeof e.tooltip.innerHTML && n == typeof e.tooltip.text || (t.innerHTML[0] = I(t.innerHTML[0], e.tooltip)), 
            n != typeof e.icon) {
                t.className += " input-icon-right";
                var o = pt(e.icon);
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
            if (n == typeof e.tooltip || n == typeof e.tooltip.innerHTML && n == typeof e.tooltip.text || (t.innerHTML[0] = I(t.innerHTML[0], e.tooltip)), 
            n != typeof e.icon) {
                var r = pt(e.icon);
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
                            u.log("keypress", e);
                        }
                    }
                } ]
            };
            return n == typeof e.tooltip || n == typeof e.tooltip.innerHTML && n == typeof e.tooltip.text || (t.innerHTML[0] = I(t.innerHTML[0], e.tooltip)), 
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
            return v.DOMLoaded ? q(o.innerHTML[1], r ? s : "", r ? "" : "No Preview") : setTimeout(q, 150, o.innerHTML[1], r ? s : "", r ? "" : "No Preview"), 
            n == typeof e.tooltip || n == typeof e.tooltip.innerHTML && n == typeof e.tooltip.text || (o.innerHTML[0] = I(o.innerHTML[0], e.tooltip)), 
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
        if (y(e) || "element" == e.type) return t = {
            type: "div",
            className: "row form-group section-row",
            innerHTML: {
                type: "div",
                className: "col-md-12",
                innerHTML: y(e) ? e : e.innerHTML || e.options || e["default"]
            }
        }, g(t);
        var r = i.PrefTypes.make(e.type, e);
        if (r) {
            var a = At(e);
            switch (e.type) {
              case "radio":
              case "checkbox":
              case "toggle":
                n == typeof e.tooltip || n == typeof e.tooltip.innerHTML && n == typeof e.tooltip.text || (t = I(a.innerHTML, e.tooltip));
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
        var l = {}, e, M, v, p = !1, S = g({
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
            var e = r.settings[s].tab || "Other", d = r.settings[s].section || "General";
            typeof l[e] === n && (l[e] = {
                name: e,
                color: null,
                sections: {}
            }), typeof l[e].sections[d] === n && (l[e].sections[d] = []), l[e].sections[d].push(r.settings[s]);
        }
        if (r.tabs) for (var s in r.tabs) e = r.tabs[s].name, e && typeof l[e] !== n && (r.tabs[s].displayName && (l[e].displayName = r.tabs[s].displayName), 
        r.tabs[s].content && (r.tabs[s].content.header && (l[e].contentHeader = r.tabs[s].content.header), 
        r.tabs[s].content.footer && (l[e].contentFooter = r.tabs[s].content.footer)));
        var f = r.tabOrder || [], b = {}, c = 0;
        for (e in l) {
            p = r.activeTab !== o && e === r.activeTab || r.activeTab === o && 0 == c ? !0 : !1, 
            M = m.makeNavElement({
                innerHTML: l[e].displayName || e,
                id: "jMod-settings-tab-" + c,
                isActive: p,
                contentId: "jMod-settings-tab-" + c + "-content",
                index: c
            });
            var h = [];
            l[e].contentHeader && h.push(l[e].contentHeader);
            for (var d in l[e].sections) {
                h.push('<div class="row section-title-row"><div class="col-md-12"><h3 class="section-title">' + d + "</h3></div></div>");
                for (var x in l[e].sections[d]) h.push(i.MakePref(l[e].sections[d][x]));
            }
            l[e].contentFooter && h.push(l[e].contentFooter), v = m.makeContentElement({
                name: e,
                id: "jMod-settings-tab-" + c + "-content",
                isActive: p,
                innerHTML: h,
                index: c
            }), b[e] = [ M, v ], -1 == f.indexOf(e) && f.push(e), c++;
        }
        if (r.tabs) for (var s in r.tabs) e = r.tabs[s].name, e && l[e] === o && (p = r.activeTab !== o && e === r.activeTab || r.activeTab === o && 0 == c ? !0 : !1, 
        M = m.makeNavElement({
            innerHTML: e,
            id: "jMod-settings-tab-" + c,
            isActive: p,
            contentId: "jMod-settings-tab-" + c + "-content",
            index: c
        }), v = m.makeContentElement({
            name: e,
            id: "jMod-settings-tab-" + c + "-content",
            isActive: p,
            innerHTML: r.tabs[s].innerHTML || r.tabs[s].text,
            index: c
        }), b[e] = [ M, v ], -1 == f.indexOf(e) && f.push(e), c++);
        for (var s = 0; s < f.length; s++) b[f[s]] !== o && (k(C, b[f[s]][0]), k(j, b[f[s]][1]));
        k(S, C), k(S, j);
        var E = r.title || "Settings";
        y(E) || (E = '<h2 class="title">' + E + "</h2>");
        var T = {
            title: E,
            id: i.getElementId("settingModalsElement"),
            className: a(Pt),
            body: S,
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
                            return t && i.clear(), G(e), !1;
                        }
                    }
                }
            } ],
            buttons: [ {
                text: "Save",
                className: "btn btn-success",
                EventListeners: {
                    click: function() {
                        u.log("save button click"), i.save();
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
        var e = t.Settings.settingsModalElement, i = t.$(".modal-dialog", e), n = t.$(".modal-body", e), a = t.$(".modal-footer", e), o = t.$(".modal-header", e), d = s.viewportSize.getHeight(), r = s.getComputedStyle(i, null), c = parseInt(r.getPropertyValue("margin-top")), u = parseInt(r.getPropertyValue("margin-bottom")), f = parseInt(d) - parseInt(o.offsetHeight) - parseInt(a.offsetHeight) - c - u - 1;
        n.style.maxHeight = f + "px";
        var l = t.$(".nav-tabs", n);
        t.Tabs.resize(l);
    }, i.show = function() {
        t.Modal.show(i.settingsModalElement || 0);
    }, i.hide = function() {
        t.Modal.hide(i.settingsModalElement);
    }, i.save = function() {
        u.log("Saving");
        for (var e = i._data, r = {}, t = 0; t < e.settings.length; t++) {
            var n = e.settings[t];
            if (!y(e) && "element" != n.type) {
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
            if (S.available) {
                var c = [ "unloadEventStart", "unloadEventEnd", "navigationStart" ];
                r = S.getAllTiming();
                var s = S.get("timing.navigationStart");
                for (var n in r) e[n] = r[n] - s, (e[n] <= 0 || isNaN(e[n])) && delete e[n];
                var a = (S.get("timing.loadEventEnd") || S.get("timing.loadEventStart")) - S.get("timing.navigationStart");
                a > 0 && (e.pageLoadTime = a);
                var o = S.get("timing.responseEnd") - S.get("timing.fetchStart");
                o >= 0 && (e.NetworkLatency = o);
                var i = S.now;
                i > 0 && (e.statReportTime = i), t.InitializeEndTime > 0 && (e.jModInitializeEnd = t.InitializeEndTime), 
                t.InitializeStartTime >= 0 && (e.jModInitializeStart = t.InitializeStartTime, t.InitializeEndTime > 0 && t.InitializeEndTime - t.InitializeStartTime > 0 && (e.jModInitializeTime = t.InitializeEndTime - t.InitializeStartTime), 
                X > 0 && X - t.InitializeStartTime > 0 && (e.jModReadyTime = X - t.InitializeStartTime));
            }
        } catch (l) {
            return x(l, "jMod.getDOMTiming"), {};
        }
        return e;
    };
    var h = t.SendMessage = function(e) {
        switch (t.jQueryAvailable || "jquery" != e.method.toLowerCase() ? typeof GM_xmlhttpRequest === n && "xmlhttprequest" == e.method.toLowerCase() && (e.method = t.jQueryAvailable ? "jQuery" : "JSONP") : e.method = typeof GM_xmlhttpRequest !== n ? "XMLHTTPRequest" : "JSONP", 
        e.url = t.SendMessage.processURL(e), (e.method || "XMLHTTPRequest").toLowerCase()) {
          case "jquery":
            return t.debug && u.log("jMod.SendMessage - jquery", e), t.SendMessage.jQuery(e);
            break;

          case "xmlhttprequest":
            return t.debug && u.log("jMod.SendMessage - xmlhttprequest", e), t.SendMessage.XMLHTTPRequest(e);
            break;

          case "jsonp":
          default:
            t.debug && u.log("jMod.SendMessage - JSONP", e), t.SendMessage.JSONP(e);
        }
    }, st = "jModSendMessageResponseFn";
    h.processURL = function(e) {
        var t = "string" == typeof e.callback ? e.callback : st;
        switch ("object" != typeof e.url && -1 == e.url.indexOf("?") && (e.url += "?"), 
        e.method.toLowerCase()) {
          case "jsonp":
            e.url instanceof J ? (e.url.addArg("callback", t), e.url.addArg("jsonp", t)) : e.url += "&callback=" + t + "&jsonp=" + t;
            break;

          case "xmlhttprequest":
            e.url instanceof J ? e.url.addArg("json", "1") : e.url += "&json=1";
            break;

          case "jquery":
            e.responseType && "json" == e.responseType && (e.url instanceof J ? e.url.addArg("json", "1") : e.url += "&json=1");
        }
        return e.url;
    }, h.jQuery = function(e) {
        var n = "string" == typeof e.callback ? e.callback : st, t = h.addCallbacks(e);
        try {
            $.getJSON("" + e.url, {
                async: !0,
                format: "json"
            }).done(function(e, n, r) {
                h.execCallback(t, null, e, n, r);
            }).fail(function(e, n, r) {
                h.execErrorCallback(t, null, e, n, r);
            });
        } catch (r) {
            return !1;
        }
        return !0;
    }, h.XMLHTTPRequest = function(e) {
        try {
            if (typeof GM_xmlhttpRequest !== n) {
                var t = h.addCallbacks(e);
                return GM_xmlhttpRequest({
                    method: "GET",
                    url: "" + e.url,
                    headers: {
                        Accept: "application/javascript"
                    },
                    onload: function(e, t) {
                        return function(n) {
                            if ("json" != t.toLowerCase()) return h.execCallback(e, null, n.responseText, n);
                            var r;
                            try {
                                r = JSON.parse(n.responseText);
                            } catch (a) {} finally {
                                return h.execCallback(e, null, r, n);
                            }
                        };
                    }(t, e.responseType || "json"),
                    onerror: function(e) {
                        return function(t) {
                            return u.log("Error! XMLHttpRequest", t), h.execErrorCallback(e, null, t.responseText, t);
                        };
                    }(t)
                }), !0;
            }
        } catch (r) {
            u.log("Error! getXMLHttpRequest", r);
        } finally {
            return !1;
        }
    }, h.JSONP = function(e) {
        var t = h.addCallbacks(e), n = g({
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
            return h.execErrorCallback(t, null, a);
            return !1;
        }
        return !0;
    }, h._callbacks = [], h.addCallbacks = function(e) {
        return h._callbacks.push({
            complete: e.callback,
            error: e.onerror
        }) - 1;
    }, h.execCallback = function(r, t) {
        try {
            var e = h._callbacks[r].complete;
            if (typeof e === n) return !1;
            if ("function" == typeof e) return e.apply(t || null, d.call(arguments, 2));
            if ("string" == typeof e && "function" == typeof s[e]) return s[e].apply(t || null, d.call(arguments, 2));
        } catch (a) {
            return u.log("Error SendMessage.execCallback!", a), !1;
        }
    }, h.execErrorCallback = function(r, t) {
        try {
            var e = h._callbacks[r].onerror;
            if (typeof e === n) return !1;
            if ("function" == typeof e) return e.apply(t || null, d.call(arguments, 2));
            if ("string" == typeof e && "function" == typeof s[e]) return s[e].apply(t || null, d.call(arguments, 2));
        } catch (a) {
            return u.log("Error SendMessage.execErrorCallback!", a), !1;
        }
    }, h._globalResponseCallback = ht(kt, s, {
        defineAs: st,
        allowCallbacks: !0,
        allowCrossOriginArguments: !0
    }), t.Update = new function() {
        var e = function() {
            var e = [ !0 ].concat(d.call(arguments), {
                script_info: a("script.script_info"),
                script_file_info: a("script.script_file_info") || o
            });
            return t.extend.apply(t, e);
        };
        this.getURL = function(d) {
            opts = e({}, t.Config.Update, d);
            var r = new J(a("host") || "http://myuserjs.org"), s = (opts.username || a("script.username")).trim();
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
            var p = a("host") || "myuserjs.org";
            return r.setPath("/script/" + s + "/" + l + "." + o + ".js"), r;
        }, this.sendRequest = function(f) {
            try {
                var r = e({}, t.Config.Update, f);
                typeof s[r.updateVeriableName] !== n && (s[r.updateVeriableName] = o, delete s[r.updateVeriableName]);
                var c = t.Update.getURL(r);
                a("debug") && t.Log("URL: ", "" + c);
                var l = "JSONP";
                return r.jQuery ? l = "jQuery" : r.XMLHttpRequest && (l = "XMLHTTPRequest"), t.SendMessage({
                    url: "" + c,
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
                return u.log("Error! getUpdateData: ", i.name, i.fileName, i.lineNumber + ":" + i.columnNumber), 
                u.error(i), r.callback && r.onerror(i), o;
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
        }, Object.defineProperties(this.ERROR_CODES, ut), Object.defineProperty(this.ERROR_CODES, "get", {
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
                    switch (u.log("Error is from userscript!"), e.name) {
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
                return u.log("Error! Error.send: ", r), o;
            }
        }, this.catchError = function(c, f, r, i, n, s) {
            try {
                if (u.log("stackInfo", s), o !== n && o !== n.stack) {
                    var l = d.call(arguments, 0);
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
            } catch (p) {}
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
    }(), ht(ft, s, {
        defineAs: "jModListenError",
        allowCallbacks: !0,
        allowCrossOriginArguments: !0
    });
    var Qt = function() {
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
                ft(n, r, a, o, i);
            } catch (s) {}
            return p.oldHandle ? p.oldHandle.apply(this, arguments) : !1;
        };
    };
    return n == typeof t.Config.script.script_info && n != typeof GM_info && b.set(), 
    +function() {
        function n(n) {
            return v.DOMLoaded || -1 != [ "interactive", "complete" ].indexOf(document.readyState.toLowerCase()) && e.DOMLoaded(), 
            v.DOMLoaded && (v.documentComplete || "complete" != document.readyState || e.documentComplete(), 
            v.performanceReady || (a = S.pageLoadTime(), (!isNaN(a) && a > 0 || !S.available) && e.performanceReady()), 
            v.performanceReady && v.documentComplete) ? (v.Complete = !0, clearInterval(r), 
            t.debug && R("jMod Finish Init"), o) : i > f ? (v.Complete = !0, clearInterval(r), 
            v.DOMLoaded || e.DOMLoaded(), v.documentComplete || e.documentComplete(), v.performanceReady || e.performanceReady(), 
            t.debug && R("jMod Finish Init"), o) : (i++, t.debug && t.log.count("Try Init"), 
            o);
        }
        function r() {
            v.Complete ? clearInterval(r) : n("checkTimer");
        }
        function s(e) {
            t.Events.fire.apply(t.Events, [ "load", {
                _this: this,
                args: arguments
            } ]), t.debug && t.Debug("onLoadEvent", e);
        }
        function l(e) {
            t.Events.fire.apply(t.Events, [ "beforescriptexecute", {
                _this: this,
                args: arguments
            } ]);
        }
        function c(e) {
            t.Events.fire.apply(t.Events, [ "afterscriptexecute", {
                _this: this,
                args: arguments
            } ]);
        }
        var a, i = 0;
        const f = 200;
        var e = {
            DOMLoaded: function() {
                v.DOMLoaded = !0, t.debug && R("DOM Loaded", null, " - Begin Init"), t.Events.fire("onDOMReady"), 
                v.CSSAdded = !0, t.AddCSS(), t.Notification.init(), t.Modal.init(), t.Settings.init(), 
                v.jModReady = !0, setTimeout(function() {
                    t.debug && R("jModReady"), t.Events.fire("onReady");
                }, 0), S.available && (X = S.now);
            },
            documentComplete: function() {
                v.documentComplete = !0, t.debug && (R("onPageReady"), u.groupEnd("jMod Start")), 
                t.Events.fire("onPageReady");
            },
            performanceReady: function() {
                v.performanceReady = !0, t.debug && R("onPerformanceReady"), t.Events.fire("onPerformanceReady");
            }
        };
        p.addEventListener("DOMContentLoaded", function(e) {
            v.Complete || n("DOMContentLoaded"), t.Events.fire.apply(t.Events, [ "DOMContentLoaded", {
                _this: this,
                args: arguments
            } ]), t.debug && t.Debug("DOMContentLoaded", e);
        }, !1), document.onreadystatechange = function(e) {
            v.Complete || n("onreadystatechange"), t.Events.fire.apply(t.Events, [ "onreadystatechange", {
                _this: this,
                args: arguments
            } ]), t.debug && t.Debug("onreadystatechange %c%s%c %o", t.log.fmt.stchange, document.readyState, " ", e);
        }, p.addEventListener("load", s, !1), p.addEventListener("beforescriptexecute", l, !1), 
        p.addEventListener("afterscriptexecute", c, !1), n(), setInterval(r, 25);
    }(), S.available && setTimeout(function() {
        t.InitializeEndTime = S.now;
    }, 0), t.debug && R("jMod Initialize Time Elapsed"), t;
}(void 0 !== window.performance ? window.performance.now() : 0, "undefined" != typeof jQuery ? jQuery : void 0, console, window, "undefined" != typeof unsafeWindow ? unsafeWindow : "undefined" != typeof window ? window : this, "undefined"));