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
/*
 * @overview [API for interacting with myUserJS.org]{@link jMod}
 * @author jgjake2
 * @version 0.0.20
 * @see {@link jMod}
 * @todo Add cookie storage
 * @todo Finish documentation
 */

/***********************************
 ** MacroDoc
 **********************************/

/**
 * @global
 * @namespace Macros
 * @author jgjake2
 */

/**
 * <span class="macro-overload-count">3 Overload</span> Check if object <b>a</b> has all the given properties using the <b>typeof</b> operator
 * @name PROPDEFINED
 * @memberof Macros
 * @property {boolean} PROPDEFINED - <span class="macro-argument-count">1 Argument</span> _undefined!=typeof a[b]
 * @property {boolean} PROPDEFINED - <span class="macro-argument-count">2 Arguments</span> _undefined!=typeof a[b]&&_undefined!=typeof a[c]
 * @property {boolean} PROPDEFINED - <span class="macro-argument-count">3 Arguments</span> _undefined!=typeof a[b]&&_undefined!=typeof a[c]&&_undefined!=typeof a[d]
 * @property {boolean} PROPDEFINED - <span class="macro-argument-count">4 Arguments</span> _undefined!=typeof a[b]&&_undefined!=typeof a[c]&&_undefined!=typeof a[d]&&_undefined!=typeof a[e]
 * @example
 * PROPDEFINED&#40;obj,"foo"&#41; //result: _undefined!=typeof obj["foo"]
 * PROPDEFINED&#40;obj,"foo","bar"&#41; //result: _undefined!=typeof obj["foo"]&&_undefined!=typeof obj["bar"]
 * PROPDEFINED&#40;obj,"foo","bar","taco"&#41; //result: _undefined!=typeof obj["foo"]&&_undefined!=typeof obj["bar"]&&_undefined!=typeof obj["taco"]
 * PROPDEFINED&#40;obj,"foo","bar","taco","bell"&#41; //result: _undefined!=typeof obj["foo"]&&_undefined!=typeof obj["bar"]&&_undefined!=typeof obj["taco"]&&_undefined!=typeof obj["bell"]
 */

/**
 * <span class="macro-overload-count">2 Overload</span> Check if object <b>a</b> has property <b>b</b>, and <b>a[b]</b> has property <b>c</b>, etc... using <b>typeof</b>
 * @name PROPTREEDEFINED
 * @memberof Macros
 * @property {boolean} PROPTREEDEFINED - <span class="macro-argument-count">2 Arguments</span> _undefined!=typeof a[b]&&_undefined!=typeof a[b][c]
 * @property {boolean} PROPTREEDEFINED - <span class="macro-argument-count">3 Arguments</span> _undefined!=typeof a[b]&&_undefined!=typeof a[b][c]&&_undefined!=typeof a[b][c][d]
 * @property {boolean} PROPTREEDEFINED - <span class="macro-argument-count">4 Arguments</span> _undefined!=typeof a[b]&&_undefined!=typeof a[b][c]&&_undefined!=typeof a[b][c][d]&&_undefined!=typeof a[b][c][d][e]
 * @example
 * PROPTREEDEFINED&#40;obj,"foo","bar"&#41; //result: _undefined!=typeof obj["foo"]&&_undefined!=typeof obj["foo"]["bar"]
 * PROPTREEDEFINED&#40;obj,"foo","bar","taco"&#41; //result: _undefined!=typeof obj["foo"]&&_undefined!=typeof obj["foo"]["bar"]&&_undefined!=typeof obj["foo"]["bar"]["taco"]
 * PROPTREEDEFINED&#40;obj,"foo","bar","taco","bell"&#41; //result: _undefined!=typeof obj["foo"]&&_undefined!=typeof obj["foo"]["bar"]&&_undefined!=typeof obj["foo"]["bar"]["taco"]&&_undefined!=typeof obj["foo"]["bar"]["taco"]["bell"]
 */

/**
 * <span class="macro-overload-count">3 Overload</span> Check if object <b>a</b> has all the given properties using the <b>in</b> operator
 * @name HASPROP
 * @memberof Macros
 * @property {boolean} HASPROP - <span class="macro-argument-count">1 Argument</span> b in a
 * @property {boolean} HASPROP - <span class="macro-argument-count">2 Arguments</span> b in a&&c in a
 * @property {boolean} HASPROP - <span class="macro-argument-count">3 Arguments</span> b in a&&c in a&&d in a
 * @property {boolean} HASPROP - <span class="macro-argument-count">4 Arguments</span> b in a&&c in a&&d in a&&e in a
 * @example
 * HASPROP&#40;obj,"foo"&#41; //result: "foo" in obj
 * HASPROP&#40;obj,"foo","bar"&#41; //result: "foo" in obj&&"bar" in obj
 * HASPROP&#40;obj,"foo","bar","taco"&#41; //result: "foo" in obj&&"bar" in obj&&"taco" in obj
 * HASPROP&#40;obj,"foo","bar","taco","bell"&#41; //result: "foo" in obj&&"bar" in obj&&"taco" in obj&&"bell" in obj
 */

/**
 * <span class="macro-overload-count">3 Overload</span> If object <b>a</b> has all the given properties using the <b>in</b> operator, then...
 * @name IFHASPROP
 * @memberof Macros
 * @property {boolean} IFHASPROP - <span class="macro-argument-count">1 Argument</span> b in a?c:d
 * @property {boolean} IFHASPROP - <span class="macro-argument-count">2 Arguments</span> b in a&&c in a?d:e
 * @property {boolean} IFHASPROP - <span class="macro-argument-count">3 Arguments</span> b in a&&c in a&&d in a?e:f
 * @property {boolean} IFHASPROP - <span class="macro-argument-count">4 Arguments</span> b in a&&c in a&&d in a&&e in a?f:g
 * @example
 * IFHASPROP&#40;obj,"foo",true,false&#41; //result: "foo" in obj?true:false
 * IFHASPROP&#40;obj,"foo","bar",true,false&#41; //result: "foo" in obj&&"bar" in obj?true:false
 * IFHASPROP&#40;obj,"foo","bar","taco",true,false&#41; //result: "foo" in obj&&"bar" in obj&&"taco" in obj?true:false
 * IFHASPROP&#40;obj,"foo","bar","taco","bell",true,false&#41; //result: "foo" in obj&&"bar" in obj&&"taco" in obj&&"bell" in obj?true:false
 */

/**
 * <span class="macro-overload-count">2 Overload</span> Check if object <b>a</b> has property <b>b</b>, and <b>a[b]</b> has property <b>c</b>, etc... using <b>in</b>
 * @name HASPROPTREE
 * @memberof Macros
 * @property {boolean} HASPROPTREE - <span class="macro-argument-count">2 Arguments</span> b in a&&c in a[b]
 * @property {boolean} HASPROPTREE - <span class="macro-argument-count">3 Arguments</span> b in a&&c in a[b]&&d in a[b][c]
 * @property {boolean} HASPROPTREE - <span class="macro-argument-count">4 Arguments</span> b in a&&c in a[b]&&d in a[b][c]&&e in a[b][c][d]
 * @example
 * HASPROPTREE&#40;obj,"foo","bar"&#41; //result: "foo" in obj&&"bar" in obj["foo"]
 * HASPROPTREE&#40;obj,"foo","bar","taco"&#41; //result: "foo" in obj&&"bar" in obj["foo"]&&"taco" in obj["foo"]["bar"]
 * HASPROPTREE&#40;obj,"foo","bar","taco","bell"&#41; //result: "foo" in obj&&"bar" in obj["foo"]&&"taco" in obj["foo"]["bar"]&&"bell" in obj["foo"]["bar"]["taco"]
 */

/**
 * <span class="macro-overload-count">0 Overloads</span> Check if variable exists in the current scope
 * @name EXISTS
 * @memberof Macros
 * @property {boolean} EXISTS - <span class="macro-argument-count">1 Argument(s)</span> _undefined!=typeof a
 * @example
 * EXISTS&#40;obj&#41; //result: _undefined!=typeof obj
 */
 
/**
 * <span class="macro-overload-count">0 Overloads</span> If variable exists, produce b, otherwise produce c
 * @name IFEXISTS
 * @memberof Macros
 * @property {boolean} IFEXISTS - <span class="macro-argument-count">1 Argument(s)</span> _undefined!=typeof a?b:c
 * @example
 * IFEXISTS&#40;obj,true,false&#41; //result: _undefined!=typeof obj?true:false
 */
 
/**
 * <span class="macro-overload-count">0 Overloads</span> Check if variable does not exist in the current scope
 * @name NOTEXISTS
 * @memberof Macros
 * @property {boolean} NOTEXISTS - <span class="macro-argument-count">1 Argument(s)</span> _undefined==typeof a
 * @example
 * NOTEXISTS&#40;obj&#41; //result: _undefined==typeof obj
 */
 
 
/**
 * <span class="macro-overload-count">1 Overload</span> Get the arguments of a function, slicing with the given number "a" to optional argument "b"
 * @name ARGUMENTS
 * @memberof Macros
 * @property {boolean} ARGUMENTS - <span class="macro-argument-count">1 Argument(s)</span> Slice.call(arguments,a)
 * @property {boolean} ARGUMENTS - <span class="macro-argument-count">2 Argument(s)</span> Slice.call(arguments,a,b)
 * @example
 * ARGUMENTS&#40;1&#41; //result: Slice.call(arguments,1)
 * ARGUMENTS&#40;1,3&#41; //result: Slice.call(arguments,1,3)
 */

 
/**
 * <span class="macro-overload-count">0 Overloads</span> Check if "a" is a function
 * @name ISFUNCTION
 * @memberof Macros
 * @property {boolean} ISFUNCTION - <span class="macro-argument-count">1 Argument(s)</span> "function"==typeof a
 * @example
 * ISFUNCTION&#40;foo&#41; //result: "function"==typeof foo
 */
 
 
/**
 * <span class="macro-overload-count">0 Overloads</span> Check if "a" is an object
 * @name ISOBJECT
 * @memberof Macros
 * @property {boolean} ISOBJECT - <span class="macro-argument-count">1 Argument(s)</span> "object"==typeof a
 * @example
 * ISOBJECT&#40;foo&#41; //result: "object"==typeof foo
 */
 
/**
 * <span class="macro-overload-count">0 Overloads</span> Check if "a" is a boolean
 * @name ISBOOLEAN
 * @memberof Macros
 * @property {boolean} ISBOOLEAN - <span class="macro-argument-count">1 Argument(s)</span> "boolean"==typeof a
 * @example
 * ISBOOLEAN&#40;foo&#41; //result: "boolean"==typeof foo
 */
 
/**
 * <span class="macro-overload-count">0 Overloads</span> Check if "a" is a string
 * @name ISSTRING
 * @memberof Macros
 * @property {boolean} ISSTRING - <span class="macro-argument-count">1 Argument(s)</span> "string"==typeof a
 * @example
 * ISSTRING&#40;foo&#41; //result: "string"==typeof foo
 */

/**
 * @global
 * @namespace jMod
 * @author jgjake2
 * @version 0.0.20
 * @tutorial jMod-tutorial
 */
+function($, unsafeWindow, window, factory){
	function exportArgs(name, cb, coa){
		var length = arguments.length;
		var t = {
			"allowCallbacks": (length > 1 ? (cb == true) : true),
			"allowCrossOriginArguments": (length > 2 ? (coa == true) : true)
			};
		if(length > 0 && name)
			t.defineAs = name;
		return t;
	};
	var validDeepExports = ["Element"];
	
	
	function exportProxy(obj, args){
		args = args || {};
		var exportHandlers = cloneInto({}, unsafeWindow, {cloneFunctions: true, wrapReflectors: true});
		exportFunction(args["get"] || function(oTarget, sKey){
			if(typeof obj[sKey] !== "undefined" || sKey in obj){
				try{
					if(obj === jMod && validDeepExports.indexOf(sKey) > -1){
						return exportProxy(obj[sKey]);
					}
				}catch(e){}
				if(typeof obj[sKey] === "object" || typeof obj[sKey] === "function"){
					try{
						return cloneInto(obj[sKey], unsafeWindow, {cloneFunctions: true, wrapReflectors: true});
					}catch(e){}
				}
				return obj[sKey];
			} else {
				return undefined;
			}
		}, exportHandlers, exportArgs("get"));
		
		exportFunction(args["set"] || function(oTarget, sKey, vValue){
			try{
				obj[sKey] = vValue;
			}catch(e){return false;}
			return true;
		}, exportHandlers, exportArgs("set"));
		
		exportFunction(args["has"] || function(oTarget, sKey){
			return (sKey in obj);
		}, exportHandlers, exportArgs("has"));
		
		exportFunction(args["enumerate"] || function(oTarget, sKey){
			try{
				return (obj.keys())[Symbol.iterator]();
			}catch(e){}
			try{
				// To Do:
				// Check for .keys existence before use (ES5 support)
				return obj.keys();
			}catch(e){}
		}, exportHandlers, exportArgs("enumerate"));
		
		exportFunction(args["ownKeys"] || function(oTarget, sKey){
			return Object.getOwnPropertyNames(obj);
		}, exportHandlers, exportArgs("ownKeys"));
		
		exportFunction(args["defineProperty"] || function(oTarget, sKey, oDesc){
			if (oDesc && !(sKey in obj)){
				Object.defineProperty(obj, sKey, oDesc);
			}
			return obj;
		}, exportHandlers, exportArgs("defineProperty"));
		
		exportFunction(function(oTarget, sKey){
			return Object.getOwnPropertyDescriptor(obj, sKey);
		}, exportHandlers, exportArgs("getOwnPropertyDescriptor"));
		
		exportFunction(args["construct"] || function(oTarget, argumentsList){
			return obj.apply(obj, argumentsList);
		}, exportHandlers, exportArgs("construct"));
		
		exportFunction(function(oTarget, sKey){
			return obj.prototype;
		}, exportHandlers, exportArgs("getPrototypeOf"));
		
		exportFunction(function(oTarget, thisArg, argumentsList){
			return obj.apply(obj, argumentsList);
		}, exportHandlers, exportArgs("apply"));
		
		try{
			//unsafeWindow.jMod = new unsafeWindow.Proxy(unsafeWindow.__jMod, unsafeWindow.__jModExport);
			
			return new unsafeWindow.Proxy(exportFunction(function(){return obj.apply(obj, arguments);}, unsafeWindow, exportArgs()), exportHandlers);
			
			//unsafeWindow.jMod = new unsafeWindow.Proxy(exportFunction(jMod, unsafeWindow, exportArgs()), unsafeWindow.__jModExport);
			//unsafeWindow.jMod = new unsafeWindow.Proxy(jMod, unsafeWindow.__jModExport);
			//unsafeWindow.jMod = new unsafeWindow.Proxy(cloneInto({}, unsafeWindow, {cloneFunctions: false, wrapReflectors: false}), unsafeWindow.__jModExport);
		}catch(e){
			console.log('export error', e);
			return undefined;
		}
	};
	var jMod = factory.call(
			this,
			(window&&"undefined"!==typeof window.performance?window.performance.now():0.0),
			$,
			console,
			window,
			unsafeWindow,
			"undefined",
			undefined
		);
	var addToGlobalScope = jMod.Config.addToGlobalScope;
	if(this.jMod) {
		this._jMod = this.jMod;
		if(addToGlobalScope && unsafeWindow && unsafeWindow.jMod && unsafeWindow !== this) {
			unsafeWindow._jMod = unsafeWindow.jMod;
		}
	}
	this.jMod = jMod;
	if(addToGlobalScope) {
		try{
			if(jMod.isFirefox && jMod.isSandbox && typeof unsafeWindow.Proxy !== "undefined" && typeof cloneInto !== "undefined" && typeof exportFunction !== "undefined") {
				console.log('Export jMod');
				unsafeWindow.jMod = exportProxy(jMod);
				if(window !== unsafeWindow) {
					window.jMod = jMod;
				}
			} else {
				if(unsafeWindow !== this){
					unsafeWindow.jMod = jMod;
				}
			}
		} catch(e) {
			try{
				if(window !== this) {
					window.jMod = jMod;
				}
			}catch(x){
				console.log('cannot add jMod to global scope', x);
			}
		}
	}
	if(jMod.debug){
		jMod.log.groupEnd('jMod Initialize');
	}
}.call(
 this,
 "undefined"!==typeof jQuery?jQuery:undefined,
 (
	"undefined"!==typeof unsafeWindow && Object.prototype.toString.call(unsafeWindow).replace(/^\[object |\]$/g,'').toLowerCase() === "window" ? unsafeWindow :
	"undefined"!==typeof this.unsafeWindow && Object.prototype.toString.call(this.unsafeWindow).replace(/^\[object |\]$/g,'').toLowerCase() === "window" ? this.unsafeWindow :
	"undefined"!==typeof window && window.top && Object.prototype.toString.call(window).replace(/^\[object |\]$/g,'').toLowerCase() === "window" ? window : this
 ),
 this.window || window,
 function(initStart, $, console, window, unsafeWindow, _undefined, undefined){
	var _global = this;
	/**
	 * Calls jMod._call with the given arguments
	 * @global
	 * @function jMod
	 * @variation 2
	 * @param {...object} args Input Arguments
	 * @tutorial jMod-tutorial
	 * @example
	 * // Get the current value of script.username
	 * jMod('get', 'script.username')
	 */
	var jMod = function(){return jMod._call.apply(jMod, arguments);};
	
	jMod.InitializeStartTime = initStart;
	jMod.InitializeEndTime = -1;
	
	// Const Values
	const fontBaseURL = 'http://code.jmod.info/fonts';
	
	
	var Slice = Array.prototype.slice,
		_jQueryAvailable = _undefined!=typeof $?true:false,
		jModReady = -1,
		_css = "@import url(//fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700);\n"
		+"@import url(http://code.jmod.info/fonts/sansation.css);\n",
		defaultjModCSSURL = false ? "@import url(//test2.myuserjs.org/API/0.0.20/jMod.css);\n" : "@import url(http://code.jmod.info/0.0.20/jMod.css);\n",
		CurrentRunningScript = {
			id: 'jMod',
			config: {},
			el: undefined
		},
		/**
		 * API Namespace
		 * @namespace jMod.API
		 */
		API = jMod.API = {
			addGlyphicons: function(){
				// Import must happen at beginning of css files
				_css = "@import url(http://code.jmod.info/css/glyphicons.css);\n" + _css;
				// Use jMod.CSS to add css if DOM is available
				jMod.CSS = "";
				// Namespace: .jmod-gi
			}
		};
		try{CurrentRunningScript.el = unsafeWindow.document&&unsafeWindow.document.currentScript?unsafeWindow.document.currentScript:undefined;}catch(e){}
		
	function DefineLockedProp(name, value, target, en){
		var opts = {
			configurable: false,
			enumerable: en===false?en:true
		}
		if(typeof value === "function")
			opts.get = value;
		else {
			opts.value = value;
			opts.writable = false;
		}
		Object.defineProperty(target || jMod, name, opts);
	}
	
	DefineLockedProp('displayName', 'jMod', null, false); // Fix minify rename'
	DefineLockedProp('typeOfName', 'jMod', null, false); // Fix minify rename'
	
	DefineLockedProp('ScriptElement', function(){return (CurrentRunningScript.el ? CurrentRunningScript : undefined);});
	
	/**
	 * Current API version
	 * @name jMod.version
	 * @memberOf! jMod
	 * @type {string}
	 */
	DefineLockedProp('version', '0.0.20');
	
	/**
	 * Date of build
	 * @name jMod.build_time
	 * @memberOf! jMod
	 * @type {string}
	 */
	DefineLockedProp('build_time', '1494089011000');
	
	/**
	 * Current build type (beta|release)
	 * @name jMod.build_type
	 * @memberOf! jMod
	 * @type {string}
	 */
	DefineLockedProp('build_type', 'release');
	
	/**
	 * Is debug mode enabled
	 * @name jMod.debug
	 * @memberOf! jMod
	 * @type {boolean}
	 */
	DefineLockedProp('_debug', false);
	
	Object.defineProperty(jMod, 'debug', {
		get: function(){
			try{
				return _undefined!=typeof jMod.Config.debug?jMod.Config.debug:jMod._debug;
			}catch(e){
				return jMod._debug;
			}
		},
		set: function(val){
			jMod.Config.debug = val===true?true:false;
		},
		enumerable: false
	});
	
	Object.defineProperty(jMod, 'jQueryAvailable', {
		get: function(){
			if(_jQueryAvailable || _undefined!=typeof $)
				return (_jQueryAvailable = true);
			
			if(_undefined!=typeof jQuery)
				return ($ = jQuery, _jQueryAvailable = true);
			
			if(_undefined!=typeof unsafeWindow.jQuery)
				return ($ = unsafeWindow.jQuery, _jQueryAvailable = true);
			
			return false;
		},
		set: function(val){
			_jQueryAvailable = (val?true:false);
			try{
				if(RealTypeOf(val) == "jQuery")
					$ = val;
			}catch(e){}
		},
		enumerable: false
	});
	
	DefineLockedProp('jQuery', function(){return (jMod.jQueryAvailable ? $ : undefined);});
	
	Object.defineProperties(jMod, {
		'isSandbox': {
			value: (function(){return Object.prototype.toString.call(this).replace(/^\[object |\]$/g,'').toLowerCase() === "sandbox";})(),
			enumerable: true,
			writable: false,
			configurable: false
		},
		'isFirefox': {
			get: function(){
				return (typeof navigator != _undefined ? navigator : (window.navigator || unsafeWindow.navigator)).userAgent.toLowerCase().indexOf('firefox') > -1;
			},
			enumerable: false
		},
		'isChrome': {
			get: function(){
				return (typeof navigator != _undefined ? navigator : (window.navigator || unsafeWindow.navigator)).userAgent.toLowerCase().indexOf('chrome') > -1;
			},
			enumerable: false
		}
	});
	
	/***********************************
	 ** Performance
	 **********************************/
var performance = new function(){
	var _performance;
	var getPerformance = function(){
		if(_performance === undefined)
			_performance = (typeof unsafeWindow.performance !== _undefined && typeof unsafeWindow.performance.timing !== _undefined) ? unsafeWindow.performance : undefined;
		return _performance;
	};
	
	this.__defineGetter__("performanceObject", function(){return getPerformance();});
	
	this.__defineGetter__("available", function(){return (this.performanceObject === undefined ? false : true);});
	
	this.__defineGetter__("now", function(){try{return (this.performanceObject).now();}catch(e){jMod.Warning('Performance not available!');}});
	
	this.get = function(str){
		var i = 0, names = str.split('.'), p = this.performanceObject;
		if(p === undefined) return;
		for(i; i < names.length; i++){
			if(typeof p[names[i]] === _undefined) return;
			p = p[names[i]];
		}
		return p;
	};
	
	this.getAllTiming = function(ignore){
		if(ignore === undefined) ignore = [];
		var timingData = [];
		var p = this.performanceObject;
		for(var key in p.timing){
			if(!isNaN(p.timing[key]) && ignore.indexOf(key) == -1){
				timingData[key] = p.timing[key];
			}
		}
		return timingData;
	};
	
	this.pageLoadTime = function(){
		try{
			var t = this.performanceObject.timing;
			//return (!isNaN(t.loadEventEnd) && t.loadEventEnd > 0 ? t.loadEventEnd : t.loadEventStart) - t.navigationStart;
			if(isNaN(t.loadEventEnd)) return;
			return (t.loadEventEnd - t.navigationStart);
		} catch(e) {}
	}
	
};

	
	Object.defineProperty(jMod, 'timeElapsed', {
		get: function(){
			return (performance.now - jMod.InitializeStartTime);
		}
	});
	
	/**
	 * List of loading states for jMod
	 * @name jMod.Loading
	 * @memberOf! jMod
	 * @type {object}
	 * @property {boolean} DOMLoaded
	 * @property {boolean} CSSAdded
	 * @property {boolean} documentComplete
	 * @property {boolean} jModReady
	 * @property {boolean} Complete
	 */
	var Loading = jMod.Loading = {
		headAvailable: false,
		DOMLoaded: false,
		CSSAdded: false,
		performanceReady: false,
		documentComplete: false,
		jModReady: false,
		Complete: false
	};
	
	Object.defineProperty(jMod, 'CSS', {
		get: function(){
			return _css;
		},
		set: function(str){
			_css += str;
			if(Loading.CSSAdded)
				jMod.AddCSS();
		},
		enumerable: false
	});
	
	jMod.AddCSS = function(input){
		addStyle(_css + (input || ''));
		_css = '';
	};
	

	/***********************************
	 ** Functions/Classes/Prototypes
	 **********************************/
+(function(){
	function Watcher(obj, property, handler){
		if(!(Watcher.browserSupportsWatch && typeof obj.watch === "function") || !Watcher.browserSupportsObserve){
			throw new jModError('Browser does not support watch or observe');
		}
		
		if(obj.__watcher){
			obj.__watcher.add(property, handler);
			return obj.__watcher;
		}
		
		var _this = this;
		_this.target = obj;
		_this.properties = {};
		if(property && handler) {
			_this.defaultHandler = handler;
			_this.properties[property] = handler;
		}
		_this.enabled = true;
		obj.__watcher = this;
		
		if(Watcher.browserSupportsWatch && typeof obj.watch === "function") {
			if(property && handler) obj.watch(property, handler);
		} else if(Watcher.browserSupportsObserve) {
			
			Object.observe(obj, function(changes) {
				var i = 0, errs = [];
				
				for( ; i < changes.length; i++){
					var change = changes[i],
						changeObj = change.object,
						changeName = change.name,
						changeOldValue = change.oldValue,
						changeType = change.type,
						changeWatcher = change.__watcher || _this || this;
					if (
						!changeWatcher
						|| !changeWatcher.enabled
						|| changeName === "__watcher"
						//|| ["__watcher"].indexOf(changeName) !== -1
						|| !changeWatcher.properties[changeName]
					) return;
					try {
						(changeWatcher.properties[changeName] || changeWatcher.defaultHandler).call(changeObj, changeName, changeOldValue, changeObj[changeName]);
					} catch(e) {
						changeWatcher.enabled = false;
						switch(type){
							case "update":
								changeObj[changeName] = changeOldValue;
								break;
							case "add":
								delete changeObj[changeName];
								break;
							case "delete":
								changeObj[changeName] = changeOldValue;
								break;
						}
						changeWatcher.enabled = true;
						errs.push(e);
					}
				}
				if(errs.length > 0) {
					throw errs;
				}
			});
			
		}
		
		return _this;
	}
	
	Watcher.displayName = "Watcher";
	Watcher.browserSupportsWatch = Object.prototype.watch ? true : false;
	Watcher.browserSupportsObserve = Object.observe ? true : false;
	
	Watcher.prototype = {
		add: function(property, handler){
			if(property && (handler || this.defaultHandler)){
				if(!this.defaultHandler && handler)
					this.defaultHandler = handler;
				this.properties[property] = handler || null;
				if(Watcher.browserSupportsWatch && typeof obj.watch === "function") {
					obj.watch(property, handler || this.defaultHandler);
				}
			}
			return this;
		},
		unwatch: function(property){
			this.enabled = false;
			
			if(property){
				if(this.properties[property])
					delete this.properties[property];
				
				if(Watcher.browserSupportsWatch) {
					this.target.unwatch(property);
				}// else if(Watcher.browserSupportsObserve) {
					//if(this.properties && this.properties[property]){
						//delete this.properties[property];
					//}
				//}
			} else {
				for(var prop in this.properties){
					if(prop){
						this.unwatch(prop);
					}
				}
			}
			this.enabled = true;
			return this;
		}
	};
	
	jMod.Watcher = Watcher;
})();

/*
+(function(){
	var browserSupportsWatch = Object.prototype.watch ? true : false;
	var browserSupportsObserve = Object.observe ? true : false;
	jMod.watcher = function(obj, property, handler){
		if(browserSupportsWatch && typeof obj.watch === "function") {
			if(!obj.__watchPropertiesHandler) {
				if(!handler) {
					throw new jModError('No handler provided');
				}
				Object.defineProperty(obj, '__watchPropertiesHandler', {
					value: handler,
					enumerable: false,
					configurable: false,
					writable: true
				});
			}
			obj.watch(property, handler || obj.__watchPropertiesHandler);
		} else if(browserSupportsObserve) {
			if(obj.__watchProperties) {
				if(obj.__watchProperties[property]) {
					if(handler) {
						obj.__watchProperties[property] = handler;
					}
				} else {
					obj.__watchProperties[property] = handler || null;
				}
			} else {
				if(!handler) {
					throw new jModError('No handler provided');
				}
				Object.defineProperties(obj, {
					'__watchProperties': {
						value: {},
						enumerable: false,
						configurable: false,
						writable: true
					},
					
					'__watchPropertiesEnabled': {
							value: true,
							enumerable: false,
							configurable: false,
							writable: true
					},
					
					'__watchPropertiesHandler': {
						value: handler,
						enumerable: false,
						configurable: false,
						writable: true
					}
				});
				
				obj.__watchProperties[property] = handler;
			
				Object.observe(obj, function(changes) {
					var i = 0, errs = [];
					
					for( ; i < changes.length; i++){
						var change = changes[i],
							changeObj = change.object,
							changeName = change.name,
							changeOldValue = change.oldValue,
							changeType change.type;
						if (
							!changeObj.__watchPropertiesEnabled
							|| ["__watchProperties", "__watchPropertiesEnabled", "__watchPropertiesHandler"].indexOf(changeName) !== -1
							|| !changeObj.__watchProperties[changeName]
						) return;
						try {
							(changeObj.__watchProperties[changeName] || changeObj.__watchPropertiesHandler).call(changeObj, changeName, changeOldValue, changeObj[changeName]);
						} catch(e) {
							changeObj.__watchPropertiesEnabled = false;
							switch(type){
								case "update":
									changeObj[changeName] = changeOldValue;
									break;
								case "add":
									delete changeObj[changeName];
									break;
								case "delete":
									changeObj[changeName] = changeOldValue;
									break;
							}
							changeObj.__watchPropertiesEnabled = true;
							errs.push(e);
						}
					}
					if(errs.length > 0) {
						throw errs;
					}
				});
			}

		} else {
			throw new jModError('Browser does not support watch or observe');
		}
	};
	
	jMod.unwatch = function(obj, property){
		if(browserSupportsWatch) {
			obj.unwatch(property);
		} else if(browserSupportsObserve) {
			if(obj.__watchProperties && obj.__watchProperties[property]){
				
				obj.__watchPropertiesEnabled = false;

				delete obj.__watchProperties[property];
				
				obj.__watchPropertiesEnabled = true;
			}
		} else {
			throw new jModError('Browser does not support watch or observe');
		}
	};
})();
*/
/*
if (!Object.prototype.watch) {
	Object.defineProperty(Object.prototype, "watch", {
		enumerable: false,
		configurable: true,
		writable: false,
		value: function (prop, handler) {
			var oldval = this[prop],
				newval = oldval,
				getter = function() {
					return newval;
				},
				setter = function(val) {
					oldval = newval;
					return newval = handler.call(this, prop, oldval, val);
				};
			
			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					get: getter,
					set: setter,
					enumerable: true,
					configurable: true
				});
			}
		}
	});
}

if (!Object.prototype.unwatch) {
	Object.defineProperty(Object.prototype, "unwatch", {
		enumerable: false,
		configurable: true,
		writable: false,
		value: function (prop) {
			var val = this[prop];
			delete this[prop]; // remove accessors
			this[prop] = val;
		}
	});
}
*/

function getFirstValidKey(obj, arr, filter){
	var hasFilter = (typeof filter === "function" ? true : false);
	var args = arr;
	if(typeof arr !== "object"){
		args = Slice.call(arguments, 1);
		hasFilter = false;
	}
	for(var i = 0; i < args.length; i++){
		if(typeof obj[args[i]] !== _undefined){
			if(!hasFilter || (hasFilter && filter(args[i], obj[args[i]])))
				return args[i];
		}
	}
	return undefined;
}

function getFirstValidKeyValue(obj, arr, filter){
	var key = getFirstValidKey.apply(this, arguments);
	if(typeof key !== _undefined)
		return obj[key];
	return undefined;
}

function Object_SearchForKey(str){
	var i = 0, tmp = this, names = str.split('.');
	for(i; i < names.length; i++){
		if(typeof tmp[names[i]] === _undefined) return undefined;
		tmp = tmp[names[i]];
	}
	return tmp;
}

function Object_SearchForKeyCaseInsensitive(str){
	var x, i = 0, tmp = this, names = str.split('.');
	if(names.length == 0) return undefined;
	for(i; i < names.length; i++){
		
		if( (x = (Object.keys(tmp).join('|').toLowerCase().split('|')).indexOf(names[i].toLowerCase())) != -1 )
			tmp = tmp[Object.keys(tmp)[x]];
		else
			return undefined;
	}
	return tmp;
}

function Object_setKeyValueCaseInsensitive(str, val){
	var parent, x, i = 0, names = str.split('.'), tmp = this;
	if(names.length == 0) return undefined;
	for(i; i < names.length; i++){
		if( (x = (Object.keys(tmp).join('|').toLowerCase().split('|')).indexOf(names[i].toLowerCase())) != -1 ){
			parent = tmp;
			names[i] = Object.keys(tmp)[x];
			tmp = tmp[Object.keys(tmp)[x]];
		} else
			return undefined;
	}
	parent[names[names.length - 1]] = val;
	return names;
}

function Object_SearchForKeys(arr){
	var tmp, i = 0, args = ("string"===typeof arr?Slice.call(arguments):arr);
	for(i; i < args.length; i++){
		if((tmp = Object_SearchForKey.apply(this, [args[i]])) !== undefined)
			return tmp;
	}
	return undefined;
}

function Object_setKeyValue(str, val, force){
	var index = 0, names = str.split('.'), tmp = this;
	for(index; index < names.length -1; index++){
		if(typeof tmp[names[index]] === _undefined) {
			if(force)
				tmp[names[index]] = {};
			else
				return;
		}
		tmp = tmp[names[index]];
	}
	tmp[names[names.length - 1]] = val;
	//return this;
}

var props = {
	SearchForKey: {value: Object_SearchForKey, enumerable: false},
	SearchForKeys: {value: Object_SearchForKeys, enumerable: false},
	setKeyValue: {value: Object_setKeyValue, enumerable: false},
	
	SearchForKeyI: {value: Object_SearchForKeyCaseInsensitive, enumerable: false},
	setKeyValueI: {value: Object_setKeyValueCaseInsensitive, enumerable: false}
};
function cloneErrorObject(eObj, scope){
	scope = scope || unsafeWindow;
	var r,
		errRef = "Error", // Default error type is a generic "Error" object
		scopeRef = scope.Error && typeof scope.Error === "function" ? scope : unsafeWindow; // Check input scope for "Error" class. Otherwise, use unsafeWindow.
	if(!scopeRef) return;
	
	// Check if the input error has a name and if that name has a constructor in scopeRef.
	if(eObj.name && eObj.name != "Error" && typeof scopeRef[eObj.name] == "function"){
		errRef = eObj.name;
	}
	
	// Create the object and copy its properties.
	r = new scopeRef[errRef](eObj.message || null, eObj.fileName || null, eObj.lineNumber || null);
	r.name = eObj.name + "";
	r.stack = (eObj.stack || "") + "";
	r.message = eObj.message + "";
	r.fileName = typeof eObj.fileName != _undefined ? (eObj.fileName + "") : null;
	r.lineNumber = typeof eObj.lineNumber != _undefined ? parseInt(eObj.lineNumber) : null;
	r.columnNumber = typeof eObj.columnNumber != _undefined ? parseInt(eObj.columnNumber) : null;
	
	// Completely overwrite the toString function.
	delete r.toString;
	r.toString = function(){ return this.name + ': ' + this.message }.bind(r);
	return r;
};

function mCloneInto(obj, scope, args, debug, depth){
	if(typeof cloneInto !== _undefined){
		depth = depth || 0;
		try{
			// Should work 99% of the time, unless there is a scope-locked property like an error event object from a privileged userscript
			return cloneInto(obj, scope, args);
		}catch(e){
			if(debug){
				console.log('mCloneInto error', e);
			}
		}
		//
		// If it fails, copy it piece-by-piece excluding any properties that fail to copy cleanly.
		//
		
		
		var x, output,
			objType = typeof obj;
		try{
			// Some objects must be cloned specially
			if(objType == "object"){
				if(obj instanceof Error){
					objType = "error";
				} else if(obj.constructor === (new Array).constructor){
					objType = "array";
				} else if(obj === null){
					objType = "null";
				}
			}
		}catch(e){}
		
		var objFn = function(o) {
			var type = typeof o;
			
			// Copy strings, numbers, booleans, nulls and undefined objects normally
			if(type == "string" || type == "number" || type == "boolean" || type == _undefined || o === null){
				return o;
			} else if(o instanceof Error) {
				return cloneErrorObject(o, scope);
			} else if(type == "object") {
				if(depth < 3) {
					try{
						return mCloneInto(o, scope, args, debug, depth + 1);
					}catch(e){}
				}
				try {
					return cloneInto(o, scope, args);
				} catch(e) {}
				
			} else if(type == "function" && args.cloneFunctions) {

				try {
					return cloneInto(o, scope, args);
				} catch(e) {}
			}
		};
		
		
		if(objType == "undefined" || objType == "null"){
			return obj;
		} else if(objType == "error") {
			try{
				output = cloneErrorObject(obj, scope);
			}catch(e){}
		} else if(objType == "array") {
			output = cloneInto([], scope, args);
			for(x = 0; x < obj.length; x++){
				var tmpValue;
				try{
					tmpValue = objFn(obj[x]);
				}catch(e){}
				try{
					output.push(tmpValue);
				}catch(e){
					output.push(undefined);
				}
			}
		//} else if(objType == "function") {
			// to Do:
			// Create a new function (call it newFn) using the "Function"
			// constructor in the desired scope or the unsafeWindow.
			// Then export original function (obj) as newFn's constructor.
			// Copy all other properties normally the same as a normal object
			//
			// However, this mExportFunction should still be used instead of
			// directly cloning it.
			//
			// Does not depend on "args.cloneFunctions"
			// Only properties of 
		} else {
			output = cloneInto({}, scope, args);
			for(x in obj){
				if(x != "constructor" && Object.prototype.hasOwnProperty.call(obj, x)) {
					var tmpValue;
					try{
						tmpValue = objFn(obj[x]);
					}catch(e){}
					output[x] = tmpValue;
				}
			}
		}
		return output;
	} else {
		// Manually clone object
		// ToDo
	}
	// If everything fails, return the original object
	return obj;
}
function mExportFunction(func, scope, args){
	if(_undefined!=typeof exportFunction){
		try{
			return exportFunction(func, scope, args);
		}catch(e){}
	}
	var name = '';
	if(args && args.defineAs)
		name = args.defineAs;
	else if(typeof func === "function" && func.name != '')
		name = func.name
	if(name != '')
		try{return (scope[name] = func);}catch(e){}
}
jMod.parseStack = function(stackText){
	var o = [];
	//var anonFunctionPatt = /\@((?:https?\:\/\/)?[^\s\:]+).*?([^\:\s]*)?\:(\d+)(?:\:(\d+))?\s*$/gi;
	var stackPatt = /(([^\s]*)\@file\:\/\/\/([^\s]+?(?:\/([^\/]+?\.(user\.js|js|json|php|htm|html|asp)))?):(\d+)(?:\:(\d+))?)/gi;
	var match;
	while ((match = stackPatt.exec(stackText)) != null) {
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
/**
 * Check if input is a DOM element
 * @function isElement
 * @memberof jMod.Element
 * @param {*} obj - Input to be checked
 * @returns {boolean}
 */
var isElement = function(obj) {
	try {
		return obj instanceof HTMLElement;
	} catch(e) {
		return (typeof obj==="object") &&
		(obj.nodeType===1) && (typeof obj.style === "object") &&
		(typeof obj.ownerDocument ==="object");
	}
}

jMod.Versions = {

	parseVersion: function(str){
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
		if(matches = fullVersionPatt.exec(str.trim())){
			output.prefixStr = matches[1];
			output.versionStr = matches[2];
			output.suffixStr = matches[3];
			var tmp = matches[2].split('.');
			for(var index in tmp)
				output.version.push(parseInt(tmp[index]));
		}
		return output;
	},
	
	compare: function(v1, v2){
		var versionObj1 = v1;
		var versionObj2 = v2;
		if(typeof v1 === "string")
			versionObj1 = this.parseVersion(v1);
			
		if(typeof v2 === "string")
			versionObj2 = this.parseVersion(v2);
			
		// clone to avoid changing original values
		var versionArray1 = [].concat(versionObj1.version);
		var versionArray2 = [].concat(versionObj2.version);
		while(true){
			var val1 = versionArray1.shift();
			var val2 = versionArray2.shift();
			if(val1 != null && val2 != null){
				if(parseInt(val1) > parseInt(val2))
					return 1;
				if(parseInt(val1) < parseInt(val2))
					return -1;
			} else if(val1 != null && val2 == null){
				return 1;
			} else if(val1 == null && val2 != null){
				return -1;
			} else {
				break;
			}
		}
		// ToDo: compare prefix / suffix
		return 0;
	}
}

//var tVersion1 = jMod.Versions.parseVersion('v0.2.14beta');
//var tVersion2 = jMod.Versions.parseVersion('v0.1.14beta');

//console.log(tVersion1, tVersion2);
//console.log('compare', jMod.Versions.compare('v0.2.14beta', 'v0.1.14beta'));
//console.log('compare', jMod.Versions.compare('v0.1.14beta', 'v0.1.14beta'));
//console.log('compare', jMod.Versions.compare('v0.0.14beta', 'v0.1.14beta'));
	
	
/**
 * URL building class for adding a variable number or arguments to a given host and path
 * @class URLBuilder
 * @param {string} [input] - String to extract hostname from
 */
var URLBuilder = jMod.URLBuilder = function(input){
	/**
	 * Protocol value
	 * @member {string} protocol
	 * @memberof URLBuilder#
	 */
	this.protocol = 'http:';
	/**
	 * URL Hostname
	 * @member {string} hostname
	 * @memberof URLBuilder#
	 */
	this.hostname = '';
	/**
	 * URL Path
	 * @member {string} pathname
	 * @memberof URLBuilder#
	 */
	this.pathname = '';
	
	/**
	 * Arguments List - [{name: ArgumentName, value: ArgumentValue}]
	 * @member {Array.<Object.<string, string>>} args
	 * @memberof URLBuilder#
	 */
	this.args = [];
	
	/**
	 * Parse a given URL for a hostname and/or protocol
	 * @function setHostname
	 * @memberof URLBuilder#
	 * @param {string} str - Input to parse
	 * @returns {URLBuilder} this
	 */
	this.setHostname = function(str){
		try{
			if(typeof str === "string"){
				var parser = document.createElement('a');
				if(!(/^\s*(?:https?\:)?\/\//i.test(str)))
					str = 'http://' + str;
				parser.href = str;
				
				this.hostname = parser.hostname;
				this.protocol = parser.protocol;
			}
		}catch(e){
		}finally{
			return this;
		}
	}
	
	/**
	 * @memberof URLBuilder#
	 * @function setPath
	 * @param {string} str - fooooo
	 * @returns {URLBuilder} this
	 */
	this.setPath = function(str){
		if(str[0] != '/') str = '/' + str;
		this.pathname = str;
		return this;
	}
	
	/**
	 * Add an argument to the URL
	 * @function addArg
	 * @memberof URLBuilder#
	 * @param {string} key - Argument name
	 * @param {string} value - Argument value
	 * @returns {URLBuilder} this
	 */
	this.addArg = function(key, value){
		//this.args.push([key, value]);
		this.args.push({name: key, value: value});
		return this;
	}
	
	/**
	 * Add an array of arguments
	 * @function addArgs
	 * @memberof URLBuilder#
	 * @param {Array.<string, string>} args - Arguments array
	 * @returns {URLBuilder} this
	 */
	this.addArgs = function(args){
		for(var i = 0; i < args.length; i++){
			switch(RealTypeOf(args[i])){
				case "array":
					this.addArg(args[i][0], args[i][1]);
					break;
				case "map":
				case "object":
					var tmpName = getFirstValidKeyValue(args[i], ['name', 'key']);
					var tmpValue = getFirstValidKeyValue(args[i], ['value']);
					if(tmpName && tmpValue)
						this.addArg(tmpName, tmpValue);
					break;
			}
		}
		return this;
	}
	
	/**
	 * Build the full arguments for the URL
	 * @function buildArgs
	 * @memberof URLBuilder#
	 * @returns {string} Arguments string
	 */
	this.buildArgs = function(){
		var argStr = '';
		var argsArr = [];
		for(var i = 0; i < this.args.length; i++){
			//argsArr.push(this.args[i].join('='));
			argsArr.push(this.args[i].name + '=' + this.args[i].value);
		}
		return argsArr.join('&');
	}
	
	/**
	 * Build the full URL string
	 * @function toString
	 * @memberof URLBuilder#
	 * @returns {string} URL String
	 */
	this.toString = function(){
		return this.protocol + '//' + this.hostname + this.pathname + '?' + this.buildArgs();
	}
	
	this.setHostname(input);
	
}

var jModError = (function(){

	function jModError(arg0){
		var err,
			i = 0,
			data = {},
			//arg0 = _undefined!=typeof arguments[0] ? arguments[0] : undefined,
			length = arguments.length;
		
		//this.constructor.prototype.__proto__ = Error.prototype;
		//this.__proto__ = Error.prototype;
		//Object.setPrototypeOf(this, Error.prototype);
		
		if(length > 0){
			if(typeof arg0 !== "string"){
				if(arg0 instanceof Error){
					data.e = arg0;
				} else {
					data = arg0;
				}
				arg0 = length > 1 ? arguments[1] : undefined;
				i++;
			}
			if(typeof arg0 === "string"){
				data.message = arg0;
				if(length > (i + 1))
					data.fileName = arguments[i + 1];
					
				if(length > (i + 2))
					data.lineNumber = arguments[i + 2];
					
				if(length > (i + 3))
					data.columnNumber = arguments[i + 3];
					
				if(length > (i + 4)){
					if(arguments[i + 4] instanceof Error)
						data.e = arguments[i + 4];
				}
			}
			
			if(data.e){
				try {
					err = data.e;
					
					this.stack = err.stack;
				} catch(e){}
			}
		
		}
		
		if(!err){
			err = new Error(data.message || null, data.fileName || null, data.lineNumber || null);
			err.constructor = jModError;
			err.__proto__ = Object.create(err.__proto__, {
				name: { value: 'jModError', enumerable: false },
				toString: {
					value: function () { return this.name + ': ' + this.message }
				}
			});
			//err.name = "jModError";
			delete err.toString;
			err.toString = function () { return this.name + ': ' + this.message }.bind(err);
			if (err.stack) {
				// remove one stack level:
				if (typeof(Components) != 'undefined') {
					// Firefox:
					err.stack = this.stack = err.stack.substring(err.stack.indexOf('\n')+1);
				} else if (typeof(chrome) != 'undefined' || typeof(process) != 'undefined') {
					// Google Chrome/Node.js:
					err.stack = this.stack = err.stack.replace(/\n[^\n]*/,'');
					Object.defineProperty(err, 'stack', {
						value: this.stack,
					});
				} else {
					this.stack = err.stack;
				}
			}
		}
		
		if(this.stack && !data.fileName){
			var tmp = jMod.parseStack(this.stack);
			if(tmp && tmp.length > 0){
				this.pStack = tmp;
				data.lineNumber = parseInt(tmp[0].lineNumber);
				data.columnNumber = parseInt(tmp[0].columnNumber || 0);
				data.fileName = tmp[0].fileName;
				if(!err.fileName || err.fileName == "null"){
					try{
						err.lineNumber = data.lineNumber;
						err.columnNumber = data.columnNumber;
						err.fileName = data.fileName;
						err.stack = this.stack;
					}catch(e){
						try{
							//err = new Error(data.message || null, data.fileName || null, data.lineNumber || null);
							//err.stack = this.stack;
						}catch(e){}
					}
				}
			}
		}
		
		//this.constructor.prototype.__proto__ = Error.prototype;
		//err.constructor = jModError;
		//err.displayName = err.name
		this.displayName = this.name = "jModError";
		
		this.err = err;
		this.message = data.message || err.message;
		this.fileName = data.fileName || err.fileName;
		this.lineNumber = data.lineNumber != null ? data.lineNumber : err.lineNumber;
		this.columnNumber = data.columnNumber != null ? data.columnNumber : err.columnNumber;
		this.toString = function () { return this.name + ': ' + this.message };
		this.constructor = Error;
	};
	
	jModError.prototype = Object.create(Error.prototype, { name: { value: 'jModError', enumerable: true } });
	
	jModError.prototype.constructor = jModError;
	jModError.prototype.constructor.constructor = Error;
	jModError.prototype.log = function(title, message){
		/*
		console.log(this);
		console.log("%o", {
			_this: this,
			err: this.err,
			err_toStr: this.err.toString(),
			instanceOfjModError: (this instanceof jModError),
			instanceOfError: (this instanceof Error),
			instanceOfIntermediateInheritor: (this instanceof IntermediateInheritor),
			isPrototypeOfError: (Error.isPrototypeOf(this)),
			isPrototypeOfIntermediateInheritor: (IntermediateInheritor.isPrototypeOf(this))
		});
		*/
		var title = title || "jMod Error",
			message = message || this.message;
		jModLogError(this, title, message);
	}
	return jModError;
})();

/*
try{
	var x = fofofo(a);
	//throw new jModError('Error test');
}catch(e){
	//e.log('Error Title', 'Error body');
	var foo = new jModError(e);
	foo.log('Error Title', 'Error body');
}
*/
	// jMod Error Class

	
	// URL Builder Class

	
	// Versions Class

	
	// isElement

	
	// Parse Stack

	
	// ExportFunction

	
	// CloneInto

	
	// Object Prototypes

	
	// Object Prototypes

	
	if (!String.prototype.trim) {
		(function() {
			Object.defineProperty(String.prototype, 'trim', {
				value: function() {return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');},
				enumerable: false
			});
		})();
	}
	
	function eventCancel(e){
		var win = window || unsafeWindow;
		if(!e){
			if(win.event)
				e = win.event;
			else
				return;
		}
		if(e.cancelBubble != null) e.cancelBubble = true;
		if(e.stopPropagation) e.stopPropagation();
		if(e.preventDefault) e.preventDefault();
		if(win.event) e.returnValue = false;
		if(e.cancel != null) e.cancel = true;
	}
	
	function isEvent(a){
		var patt = /^\[object |\]$/g;
		try{
			if(Object.prototype.toString.call(a).replace(patt,'').toLowerCase() == "event") return true;
		}catch(e){}
		
		try{
			if(a.constructor.toString().replace(patt,'').toLowerCase() == "event") return true;
		}catch(e){}
		
		return false;
	}
	
	/***********************************
	 ** Types/TypeOf
	 **********************************/
/**
 * Determine the real type of an object.
 * <br>Designed to handle scope and permission issues by cloning the object into the correct scope when an error occurs.
 * @function RealTypeOf
 * @memberof jMod
 * @param {object} _obj
 * @returns {string} undefined, object, map, number, nan, null, date, invaliddate, array, regex
 */
var RealTypeOf = jMod.RealTypeOf = function(_obj){
	var obj;
	// Check if scope is locked
	try{
		if (_obj.constructor === ({}).constructor || _obj)
			obj = _obj;
	}catch(e){
		// Clone if scope is locked
		obj = mCloneInto(_obj, unsafeWindow, {
			cloneFunctions: true,
			wrapReflectors: true
		});
	}
	try{
		if(typeof(obj) === _undefined) return _undefined;
		if(typeof obj === "number" && isNaN(obj) == true) return "nan";
		if (typeof(obj) === "object") {
			if (obj === null) return "null";
			if (obj.constructor === ({}).constructor) return "map";
			if (obj.constructor === (new Array).constructor) return "array";
			if (obj.constructor === (new Date).constructor){
				if(isNaN(obj.getTime()))
					return "invaliddate";
				return "date";
			}
			if (obj.constructor === (new RegExp).constructor) return "regex";
			return Object.prototype.toString.call(obj).replace(/^\[object |\]$/g,'').toLowerCase();
		}
	}catch(e){}
	try{
		if(typeof(obj) === "function"){
			if(obj.typeOfName && typeof obj.typeOfName === "string") return obj.typeOfName;
			if(obj.displayName && typeof obj.displayName === "string") return obj.displayName;
		}
	}catch(e){}
	return typeof(obj);
}

var isPlainObject = function( obj ) {
	try{
		if ( typeof obj !== "object" || obj.nodeType || obj === obj.window ) {
			return false;
		}
		if ( obj.constructor && !obj.hasOwnProperty.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}
	}catch(e){
		var obj2 = mCloneInto(obj, unsafeWindow, {
			cloneFunctions: true,
			wrapReflectors: true
		});
		if ( typeof obj2 !== "object" || obj2.nodeType || obj2 === obj2.window ) {
			return false;
		}

		if ( obj2.constructor && !obj2.hasOwnProperty.call( obj2.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}
	}
	return true;
}

var isArray = function(obj){
	try{
		if (obj.constructor === (new Array).constructor) return true;
	}catch(e){
		var obj2 = mCloneInto(obj, unsafeWindow, {
			cloneFunctions: true,
			wrapReflectors: true
		});
		if (obj2.constructor === (new Array).constructor) return true;
	}
	return false;
}

var isFunction = function( obj ) {
	return typeof obj === "function";
}
	

	
	/***********************************
	 ** Extend
	 **********************************/


// Based on jQuery extend
/**
 * Copy all the properties of one object onto another. If only a single object is given, the properties are copied onto the jMod object.
 * <br>This version of extend is designed to handle scope and permission issues by cloning the object into the correct scope when an error occurs.
 * <br>Based on jQuery.extend
 * @author jQuery
 * @function extend
 * @memberOf jMod
 * @param {(boolean|object)} arg1 - (boolean) make deep copy, (object) target object if multiple object arguments exist, (object) object to copy onto jMod object if it is the only input
 * @param {object} [arg2] - Object to copy to target (if arg1 is object) or target object (if arg1 is boolean and arg3 exists) or object to copy onto jMod object
 * @param {...object} [arg3] - Object to copy onto target object
 */
jMod.extend = function() {
	//console.log('merge', arguments);
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;
	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}
	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && typeof target !== "function" ) {
		target = {};
	}
	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}
	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				//copy = options[ name ];
				try {
					if (
						(((typeof options[ name ] === "object" || typeof options[ name ] === "function") && options[ name ].constructor === ({}).constructor) || options[ name ]) // will cause scoped objects to throw error
						|| target // always true
						)
					copy = options[ name ];
				} catch(e) {
					copy = mCloneInto(options[ name ], target, {
							cloneFunctions: true,
							wrapReflectors: true
						});
				}
				// Prevent never-ending loop
				if ( target === options[ name ] || target === copy ) {
					continue;
				}
				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( isPlainObject(copy) ||
						(copyIsArray = isArray(copy)) ) ) {
						
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && isArray(src) ? src : [];
					} else {
						clone = src && isPlainObject(src) ? src : {};
					}
					target[ name ] = jMod.extend( deep, clone, copy );
					// Never move original objects, clone them
				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					try {
						target[ name ] = copy;
					} catch(e) {
						target[ name ] = mCloneInto(copy, target, {
								cloneFunctions: true,
								wrapReflectors: true
							});
					}
				}
			}
		}
	}
	// Return the modified object
	return target;
};

// Extend Preserve
/**
 * Same as [jMod.extend]{@link jMod.extend} except arrays are preserved. So if both target[x] and input[x] are arrays, instead of being overwritten, all the elements of input[x] are appended to target[x].
 * <br>Based on jQuery.extend
 * @author jQuery
 * @function extendp
 * @memberOf jMod
 * @param {(boolean|object)} arg1 - (boolean) make deep copy, (object) target object if multiple object arguments exist, (object) object to copy onto jMod object if it is the only input
 * @param {object} [arg2] - Object to copy to target (if arg1 is object) or target object (if arg1 is boolean and arg3 exists) or object to copy onto jMod object
 * @param {...object} [arg3] - Object to copy onto target object
 * @see jMod.extend
 */
jMod.extendp = function() {
	var options, name, src, copy, copyIsArray, clone, j,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;
	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}
	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && typeof target !== "function" ) {
		target = {};
	}
	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}
	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				//copy = options[ name ];
				try {
					if (
						(((typeof options[ name ] === "object" || typeof options[ name ] === "function") && options[ name ].constructor === ({}).constructor) || options[ name ]) // will cause scoped objects to throw error
						|| target // always true
						)
					copy = options[ name ];
				} catch(e) {
					copy = mCloneInto(options[ name ], target, {
							cloneFunctions: true,
							wrapReflectors: true
						});
				}
				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}
				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( isPlainObject(copy) ||
						(copyIsArray = isArray(copy)) ) ) {
						
					if ( copyIsArray ) {
						if(isArray(src) && Array.prototype.push.apply(target[name], copy))
							continue;
						/*
						if(isArray(src)){
							for(j = 0; j < copy.length; j++){
								if(src.indexOf(copy[j]) == -1)
									target[name].push(copy[j]);
							}
							continue;
						}
						*/
						clone = src && isArray(src) ? src : [];
					} else {
						clone = src && isPlainObject(src) ? src : {};
					}
					target[ name ] = jQuery.extendp( deep, clone, copy );
					// Never move original objects, clone them
				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					try{
						target[ name ] = copy;
					} catch(e) {
						target[ name ] = mCloneInto(copy, target, {
								cloneFunctions: true,
								wrapReflectors: true
							});
					}
				}
			}
		}
	}
	// Return the modified object
	return target;
};



	
	/***********************************
	 ** Extend
	 **********************************/


// Based on assign
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
// Similar to extend, but not scope-friendly and attempts to copy getter/setter functions and rebind them to the new object
jMod.CloneProperties = function() {
	var nextSource, descriptor, keysArray, nextIndex, nextKey, desc, to,
		length = arguments.length,
		target = arguments[0],
		deep = false,
		i = 1;
	
	if("boolean"==typeof target && length > 2){
		deep = target;
		target = arguments[i++];
	}
		
	if (target === undefined || target === null)
		return target;
		//throw new TypeError("Cannot convert target argument to object");
		
	to = Object(target);
	
	for (i; i < length; i++) {
		nextSource = arguments[i];
		if (nextSource === undefined || nextSource === null) continue;
		
		keysArray = deep ? Object.getOwnPropertyNames(Object(nextSource)) : Object.keys(Object(nextSource));
		
		for (nextIndex = 0; nextIndex < keysArray.length; nextIndex++) {
			nextKey = keysArray[nextIndex];
			desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
			if(desc !== undefined){
				if("function"==typeof nextSource[nextKey]) {
					to[nextKey] = nextSource[nextKey].bind(to);
				} else if("object"==typeof nextSource[nextKey] && isPlainObject(nextSource[nextKey])){
					Object.defineProperty(to, nextKey, {
						enumerable: desc.enumerable,
						configurable: desc.configurable,
						writable: desc.writable,
						value: deep ? jMod.CloneProperties(deep, to[nextKey] || {}, nextSource[nextKey]) : nextSource[nextKey]
					});
				} else {
					descriptor = {enumerable: desc.enumerable, configurable: desc.configurable};
					
					if(_undefined!=typeof desc.get)
						descriptor.get = desc.get.bind(to);
					
					if(_undefined!=typeof desc.set)
						descriptor.set = desc.set.bind(to);
					
					if(_undefined!=typeof desc.value){
						descriptor.writable = desc.writable;
						if("function"==typeof desc.value)
							descriptor.value = desc.value.bind(to);
						else
							descriptor.value = desc.value;
					}
					
					Object.defineProperty(to, nextKey, descriptor);
				}
			}
		}
	}
	return to;
};
/*
function test_assign(){
	console.log('Test CloneProperties');
	
	var orig = {
		key1: 'val1',
		key2: {
			subkey1: 'subval1'
		},
		key3: function(){
			console.log('key3 val3 - this:', this);
		}
	}
	Object.defineProperty(orig, 'key4', {
		get: function(){
			return this.key1;
		},
		set: function(value){
			this.key1 = value;
		}
	});
	
	console.log('orig', orig);
	var resultObj = {};
	resultObj = jMod.CloneProperties(true, resultObj, orig);
	
	console.log('resultObj', resultObj);
	
	resultObj.key1 = 'foo';
	console.log('resultObj', resultObj);
	console.log('resultObj key1', resultObj.key1);
	console.log('resultObj key4', resultObj.key4);
	
	console.log('orig key1', orig.key1);
	console.log('orig key4', orig.key4);
}

test_assign();
*/


	
	/***********************************
	 ** Browser
	 **********************************/
(function(){
	var EMPTY       = '',
		UNKNOWN     = '?',
		FUNC_TYPE   = 'function',
		UNDEF_TYPE  = 'undefined',
		OBJ_TYPE    = 'object',
		MAJOR       = 'major',
		MODEL       = 'model',
		NAME        = 'name',
		TYPE        = 'type',
		VENDOR      = 'vendor',
		VERSION     = 'version',
		ARCHITECTURE= 'architecture',
		CONSOLE     = 'console',
		MOBILE      = 'mobile',
		TABLET      = 'tablet',
		SMARTTV     = 'smarttv',
		WEARABLE    = 'wearable',
		EMBEDDED    = 'embedded';
	jMod.Browser = {
		'getAgent': function(){
			return navigator.userAgent;
		},
		'get': function(){
		
		},
		
		getRegexMatches: function(str, regexList){
			var matches;
			var results = [];
			for(var i = 0; i < regexList.length; i += 2){
				var tGroup = regexList[i];
				var tGroupMatches = [];
				for(var x = 0; x < tGroup.length; x++){
					if(matches = tGroup[x].exec(str)){
						tGroupMatches.push(matches);
						//console.log(i, x, matches);
					}
				}
				if(tGroupMatches.length > 0){
					results.push({
						matches: tGroupMatches,
						map: regexList[i + 1]
					});
				}
			}
			return results;
		},
		
		getRegexFirstMatch: function(str, regexList){
			var matches;
			for(var i = 0; i < regexList.length; i += 2){
				var tGroup = regexList[i];
				var tGroupMatches = [];
				for(var x = 0; x < tGroup.length; x++){
					if(matches = tGroup[x].exec(str)){
						return [matches, regexList[i + 1]];
					}
				}
			}
			return [];
		},
		
		getBrowser: function(){
			var result = {};
			try{
			var agent = this.getAgent();
			var matchesList = this.getRegexFirstMatch(agent, this.regexes.browser);
			
			if(matchesList.length > 1){
				for(var i = 0; i < matchesList[1].length; i++){
					result[matchesList[1][i]] = matchesList[0][i + 1];
				}
			}
			}catch(e){}
			return result;
		},
		
		// Based on https://github.com/faisalman/ua-parser-js
		'regexes': {
			browser: [
				[

					// Presto based
					/(opera\smini)\/((\d+)?[\w\.-]+)/i, // Opera Mini
					/(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i, // Opera Mobi/Tablet
					/(opera).+version\/((\d+)?[\w\.]+)/i, // Opera > 9.80
					/(opera)[\/\s]+((\d+)?[\w\.]+)/i // Opera < 9.80

				],
				[NAME, VERSION, MAJOR],
				[

					/\s(opr)\/((\d+)?[\w\.]+)/i // Opera Webkit
				],
				[
					[NAME, 'Opera'], VERSION, MAJOR
				],
				[

					/(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i // IE11
				],
				[
					[NAME, 'IE'], VERSION, MAJOR
				],
				[

					/(yabrowser)\/((\d+)?[\w\.]+)/i // Yandex
				],
				[
					[NAME, 'Yandex'], VERSION, MAJOR
				],
				[

					/(comodo_dragon)\/((\d+)?[\w\.]+)/i // Comodo Dragon
				],
				[
					[NAME, /_/g, ' '], VERSION, MAJOR
				],
				[

					/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i,
					// Chrome/OmniWeb/Arora/Tizen/Nokia
					/(uc\s?browser|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i
					//UCBrowser/QQBrowser
				],
				[NAME, VERSION, MAJOR],
				[

					/((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i // Chrome for Android/iOS
				],
				[
					[NAME, 'Chrome'], VERSION, MAJOR
				],
				[

					/version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i // Mobile Safari
				],
				[VERSION, MAJOR, [NAME, 'Mobile Safari']],
				[

					/version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i // Safari & Safari Mobile
				],
				[VERSION, MAJOR, NAME],
				[

					/(konqueror)\/((\d+)?[\w\.]+)/i, // Konqueror
					/(webkit|khtml)\/((\d+)?[\w\.]+)/i
				],
				[NAME, VERSION, MAJOR],
				[

					// Gecko based
					/(navigator|netscape)\/((\d+)?[\w\.-]+)/i // Netscape
				],
				[
					[NAME, 'Netscape'], VERSION, MAJOR
				],
				[
					/(swiftfox)/i, // Swiftfox
					// IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
					/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i,
					// Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
					/(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i, // Mozilla
				],
				[NAME, VERSION, MAJOR]
			]
		}
	}
})();
//jMod.Browser.getBrowser();


	
	/***********************************
	 ** Hex To RGB
	 **********************************/
	var hexToRgb = function(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
			a: null
		} : null;
	};
	/***********************************
	 ** Parse RGB
	 **********************************/
	var parseRGB = function(str){
		var r = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))?\s*\)/mi.exec(str);
		return r ? {
			r: parseInt(r[1]),
			g: parseInt(r[2]),
			b: parseInt(r[3]),
			a: r[4] && r[4] != '' ? parseFloat(r[4]) : null
		} : null;
	}
	/***********************************
	 ** Parse Color String
	 **********************************/
	var parseColorString = function(str){
		var r = parseRGB(str);
		return r ? r : hexToRgb(str);
	}
	
	var PI_OVER_2 = 0.5 * Math.PI,
		TEN_LOG2 = 10 * Math.log( 2 );
		
	var timeFromPosition = function( b, c, d, x ) {
		return 2 * d / Math.PI * Math.asin(( x - b ) / c );
	}
	
	var easeOutSin = function( c, d, t ) {
		var b = PI_OVER_2 / d,
			a = c * b;
		return Math.round( a * Math.cos( b * t ));
	}

	/***********************************
	 ** DOMParser
	 **********************************/

	

	/***********************************
	 ** Default Config Values
	 **********************************/
	// isElement

	
	// Default Values
	/**
	 * Get or set a Config value
	 * @alias jMod.Config
	 * @namespace jMod.Config
	 * @property {object} host
	 * @property {boolean} scopeLock
	 * @property {boolean} secure
	 * @property {object} browser
	 * @property {boolean} getScriptFileInfo - Enable / Disable getting information about the userscript file
	 * @property {object} script
	 * @property {string} script.username       - Owner's username hosted on myUserJS
	 * @property {string} script.script_name    - Script's short-name (can be fount in script's hosted URL on myUserJS)
	 * @property {object} Update
	 * @property {boolean} Update.DOMTiming - Generate and send page/script timing information to the server.
	 * @property {object} Update.args - Default arguments to be sent to myUserJS's statistical engine.
	 * @property {string} Update.updateVeriableName - The global variable that will store the server response.
	 * @property {string} Update.getType - Type of information you want returned from the server, and which partition to store the download/arguments under.
	 * @property {boolean} Update.XMLHttpRequest - <font color="red">(Experimental)</font> Use XMLHttpRequest when sending request (only available to userscripts that load jMod via require)
	 * @property {boolean} Update.jQuery - <font color="red">(broken)</font>
	 * @property {boolean} Update.getStats - Get script stats from the server (only available when getType="data")
	 * @property {object} Error
	 * @property {object} API
	 * @property {object} API.log
	 * @property {array} API.log.disabled - List of console functions to disable
	 * @property {number} API.log.verbosity_level - Verbosity level
	 * @property {boolean} API.log.GM_log - Enable/Disable use of GM_log
	 * @property {boolean} API.log.Firebug - Enable/Disable use of Firebug
	 * @property {boolean} API.log.WebConsole - Enable/Disable use of WebConsole
	 * @property {boolean} API.log.debug - Enable/Disable debugging of logging functions
	 * @property {object} API.Storage
	 * @property {string} API.Storage.prefix - Prefix for all stored values
	 * @property {string} API.Storage.engine - Default storage engine [GM_Storage or localStorage] (Will default to localStorage when GM_Storage is not available)
	 * @property {object} Language
	 * @property {string} Language.Current - Current language
	 * @property {object} jQueryExtensions
	 * @property {object} jQueryExtensions.CrossOrigin - Enable/Disable use of GM_xmlhttpRequest in your jQuery instance after using <b>addCrossOriginSupport</b> on it.
	 * @property {boolean} debug
	 * @example
	 * // Get the current value of script.username
	 * jMod('get', 'script.username')
	 * // or
	 * jMod('script.username')
	 * // or
	 * jMod.Config('script.username');
	 * // or
	 * jMod.Config.script.username;
	 *
	 * // Set the current value of script.username
	 * jMod('set', 'script.username', 'foo')
	 * // or
	 * jMod('script.username', 'foo')
	 * // or
	 * jMod.Config('script.username', 'foo');
	 * // or
	 * jMod.Config.script.username = 'foo';
	 */
	 
	var jConfig = jMod.Config = function(key, value){
		try{if(jConfig.getScriptFileInfo&&!ScriptInfo.gotFileInfo)ScriptInfo.getScriptFileInfo();}catch(e){} // Try to get information about the userscript if possible
		if(typeof value === _undefined){
			return (typeof key == "string" ? jMod.Config.SearchForKey(key) : jMod.Config.SearchForKeys(key));
		} else {
			return jMod.Config.setKeyValue(key, value);
		}
	}
	 
	jMod.extend(jMod.Config, {
		'host': 'http://myuserjs.org',
		//'scopeLock': (typeof exportFunction === _undefined ? false : true),
		'scopeLock': false,
		'secure': false,
		'browser': jMod.Browser.getBrowser(),
		'getScriptFileInfo': true,
		'addToGlobalScope': true,
		'script': {
			username: undefined,
			script_name: undefined
		},
		'Update': {
			'DOMTiming': false,
			'args': {},
			'updateVeriableName': 'USMetaData',
			'getType': 'data',
			'jQuery': false,
			'XMLHttpRequest': false,
			'getStats': false,
			'sampleRate': 100
			/*
			 * getType:
			 *     meta
			 *     metajs
			 *     data
			 */
		},
		'Error': {
			'autoReportErrors': false,
			'errorFilter': function(message, url, linenumber){return true;}
		},
		'API': {
			'log': {
				'disabled': [], // Disabled Functions
				'verbosity_level': (jMod._debug ? 5 : 3), // API.log.verbosity_level
				'GM_log': true,
				'Firebug': true,
				'WebConsole': true,
				'debug': false
			},
			'Storage': {
				'prefix': 'jMod_', // API.localStorage.storage_prefix
				'engine': 'GM_Storage' // Default storage engine [GM_Storage or localStorage] (Will default to localStorage when GM_Storage is not available)
			}
		},
		'Language': {
			'Current': 'en'
		},
		'jQueryExtensions': {
			'CrossOrigin': true
		},
		'debug': false
	});
	/*
	if(false){
		try{
			if(['firefox', 'waterfox'].indexOf(jMod.Config.browser.name.toLowerCase()) == -1){
				jMod.Config.API.log.GM_log = false;
			}
		}catch(e){}
	}
	*/
	
	if(typeof unsafeWindow['jMOD_CONFIGURATION'] === "object"){
		jMod.Config = jMod.extend(true, jMod.Config, unsafeWindow['jMOD_CONFIGURATION']);
	}
	
	Object.defineProperties(jMod.Config, props);
	
	var jConfigCaseInsensitive = function(key, value){
		if(typeof value === _undefined){
			return jMod.Config.SearchForKeyI(key);
		} else {
			return jMod.Config.setKeyValueI(key, value);
		}
	}
	/**
	 * Scan an element&#39;s attributes for jMod configuration options
	 * @function jMod.Config.scanElement
	 * @memberof jMod.Config
	 * @param {element} el - Element to scan
	 * @see {@link jMod.Config}
	 */
	jConfig.scanElement = function(el){
		if(el && isElement(el)){
			var r = {}, i = 0, attrName, attrValue, origVal, nodeNamePatt = /^(?:data-)?(.*?)$/i, attrs = el.attributes;
			for(i; i < attrs.length; i++){
				attrName = attrs[i].nodeName;
				attrName = nodeNamePatt.exec(attrName)[1];
				attrValue = attrs[i].value;
				if(attrValue){
					switch(attrName.toLowerCase()){
						case 'src':
						case 'type':
						case 'async':
						case 'defer':
						case 'onload':
						case 'onerror':
						case 'charset':
						case 'crossorigin':
							continue;
							break;
						case 'username':
							jMod.Config.script.username = attrValue;
							break;
						case 'scriptname':
						case 'script_name':
						case 'script-name':
							jMod.Config.script.script_name = attrValue;
							break;
						//case 'config':
						case 'jmod-config':
							try{
								attrValue = JSON.parse(attrValue);
								//jConfigCaseInsensitive(attrName, attrValue);
								if(attrValue)
									jMod.extend(true, jMod.Config, attrValue);
							}catch(e){
								console.error('Error parsing "' + attrs[i].nodeName + '"', el, e);
								continue;
							}
							break;
						default:
							attrName = attrName.split('-').join('.');
							origVal = jConfigCaseInsensitive(attrName);
							switch(typeof origVal){
								case 'number':
									jConfigCaseInsensitive(attrName, parseInt(attrValue));
									break;
								case 'boolean':
									jConfigCaseInsensitive(attrName, attrValue.trim().toLowerCase() == 'true' ? true : false);
									break;
								case 'string':
									jConfigCaseInsensitive(attrName, attrValue);
								case 'object':
									try{
										attrValue = JSON.parse(attrValue);
										if(attrValue)
											jConfigCaseInsensitive(attrName, attrValue);
									}catch(e){
										console.error('Error parsing "' + attrs[i].nodeName + '"', el, e);
										continue;
									}
									break;
								default:
									continue;
									break;
							}
							break;
					}
					r[attrName] = attrValue;
				}
			}
			
			return r;
		}
	}
	
	/*
	 * If jMod is running as a script, search script's attributes for configuration options
	 */
	if(CurrentRunningScript.el){
		CurrentRunningScript.config = jConfig.scanElement(CurrentRunningScript.el);
		if(CurrentRunningScript.el.id && CurrentRunningScript.el.id.trim() != ''){
			CurrentRunningScript.id = CurrentRunningScript.el.id;
		} else {
			if((window || unsafeWindow).document.getElementById(CurrentRunningScript.id)){
				var i = 0;
				while((window || unsafeWindow).document.getElementById(CurrentRunningScript.id + '-' + i))
					i++;
				CurrentRunningScript.id = CurrentRunningScript.id + '-' + i;
			}
			CurrentRunningScript.el.id = CurrentRunningScript.id;
		}
	}

	
	/***********************************
	 ** Parse Meta Data
	 **********************************/
jMod.API.ParseMetaData_Types = [];

jMod.API.ParseMetaData_Types.push(function(name, obj){
	if(name.toLowerCase() == "history" && typeof obj === "object"){
		var history_patt = /\(([0-9\.]+)\)\s+(.*?)$/i;
		var o = {};
		for(var i = 0; i < obj.length; i++){
			if(history_patt.test(obj[i])){
				var r = history_patt.exec(obj[i]);
				var vers = r[1];
				var des = r[2];
				if(typeof o[vers] === _undefined) o[vers] = [];
				o[vers].push(des);
			}
		}
		return o;
	}
});

jMod.API.ParseMetaData_Types.push(function(name, obj){
	if(name.toLowerCase() == "resource"){
		if(typeof obj !== "object")
			obj = [obj];
			
		var r,
			i = 0,
			o = {},
			resource_patt = /^\s*([\w]+)\s+(.*?)\s*$/;
			
		for(i; i < obj.length; i++){
			if(resource_patt.test(obj[i])){
				r = resource_patt.exec(obj[i]);
				o[r[1]] = r[2];
			}
		}
		return o;
	}
});

jMod.API.ParseMetaData = function(headerBlock){
	var tmp, key, i, r, o = {}, patt = /@([\S]+)\s+(.*?)$/i;
	if(typeof headerBlock === "string"){
		headerBlock = headerBlock.split(/\r?\n/i);
	}
	// Parse Meta Array
	for(i = 0; i < headerBlock.length; i++){
		if(patt.test(headerBlock[i])){
			r = patt.exec(headerBlock[i]);
			if(typeof o[r[1]] === _undefined){
				o[r[1]] = r[2];
			} else {
				if(typeof o[r[1]] !== "string"){
					o[r[1]].push(r[2]);
				} else {
					tmp = o[r[1]];
					o[r[1]] = [];
					o[r[1]].push(tmp);
					o[r[1]].push(r[2]);
				}
			}
		}
	}
	
	for(key in o){
		for(i = 0; i < jMod.API.ParseMetaData_Types.length; i++){
			if(typeof (tmp = jMod.API.ParseMetaData_Types[i](key, o[key])) !== _undefined){
				o[key] = tmp;
				break;
			}
		}
	}
	
	return o;
}

	
	/***********************************
	 ** Get Script Info
	 **********************************/
	// Parse Stack

	
	var ScriptInfo = jMod.ScriptInfo = function(){
		if(arguments.length == 0){
			return jMod.ScriptInfo.get();
		} else {
			var type = typeof arguments[0];
			
			if(arguments.length == 1 && (type === "object" || type == "string")) {
				return jMod.ScriptInfo.GM_info(arguments[0]);
			}
		}
	}
	
	ScriptInfo.getURLInfo = function(str){
		var patt = /myuserjs\.org\/script\/([^\/]+)\/([^\s]+)(?:\.(user|meta|metajs|data)\.js){1}?/i;
		
		if(patt.test(str)){
			var matches = patt.exec(str);
			return {
				username: matches[1],
				script_name: matches[2],
				get_type: matches[3]
			};
		}
		return false;
	}
	
	ScriptInfo.gotFileInfo = false;
	
	ScriptInfo.getScriptFileInfo = function(){
		if(ScriptInfo.gotFileInfo || !jConfig.getScriptFileInfo)
			return jConfig.script.script_file_info;

		var i = 0,
			tStack,
			callerScriptInfo,
			output = {},
			e = new Error(), // Create new error to get its stack
			tStackStr = e.stack.toString();
		// Check if a userscript is anywhere in the stack
		if(tStackStr.indexOf('user.js') == -1)
			return;
		// Parse the stack
		tStack = jMod.parseStack(tStackStr);
		if(tStack.length > 0){
			//for(i = tStack.length - 1; i >= 0; i--){
			for(i; i < tStack.length; i++){
				callerScriptInfo = tStack[i];
				// Find jMod in the stack
				if(_undefined==typeof jConfig.jMod_File_Path && ['jmod.js', 'jmod.min.js', 'jmod.full.js', 'jmod.min.expanded.js', 'mujs.js', 'mujs.min.js'].indexOf(callerScriptInfo.fileName.toLowerCase()) != -1){
					jConfig.jMod_Full_File_Name = callerScriptInfo.fileName;
					jConfig.jMod_File_Name = callerScriptInfo.fileName.substr(0, callerScriptInfo.fileName.length - 3);
					jConfig.jMod_File_Path = callerScriptInfo.fullFileName;
				}
				
				// Find the userscript in the stack
				if(callerScriptInfo.fileName != '' && callerScriptInfo.fileExt.toLowerCase() == 'user.js'){
					ScriptInfo.gotFileInfo = true;
					output = jConfig.script.script_file_info = {
						userscript_full_file_name: callerScriptInfo.fileName,
						userscript_file_name: callerScriptInfo.fileName.substr(0, callerScriptInfo.fileName.length - 8),
						userscript_file_path: callerScriptInfo.fullFileName,
						caller_lineNumber: callerScriptInfo.lineNumber,
						caller_functionName: callerScriptInfo.functionName
					};
					if(jMod.debug)
						jModLogInfo('ScriptInfo.getScriptFileInfo', 'Get Script File Info Successful!!', output, callerScriptInfo);
					return output;
				}
			}
		}
		return;
	}
	
	Object.defineProperty(ScriptInfo, 'InfoSet', {
		get: function(){
			return (_undefined!=typeof jConfig.script.script_info);
		}
	});
	
	ScriptInfo.set = function(data){
		var callerScriptInfo, gm_info, scriptMetaStr, pMetaData, key, tmp, urlInfo,
			output = {};
		try{
			callerScriptInfo = ScriptInfo.getScriptFileInfo();
			if(_undefined!=typeof callerScriptInfo)
				output = jMod.extend(output, callerScriptInfo);
		} catch(e) {}
		
		try{
			
			if(typeof data === _undefined && (_undefined!=typeof GM_info || _undefined!=typeof GM_getMetadata)){
				try{
					data = {
						'gm_info': _undefined!=typeof GM_info ? GM_info : GM_getMetadata(),
						'has_GM_info': _undefined!=typeof GM_info,
						'has_GM_getMetadata': _undefined!=typeof GM_getMetadata
					}
				}catch(e){}
			}
			
			if(typeof data === "object"){
				//gm_info = getFirstValidKeyValue(data, ['GM_info', 'gm_info', 'ginfo']);
				gm_info = data.GM_info || data.gm_info || data.ginfo;
				if(_undefined==typeof gm_info && _undefined!=typeof data.scriptSource)
					gm_info = data;
				if(_undefined!=typeof gm_info && _undefined!=typeof gm_info.scriptMetaStr){
					scriptMetaStr = gm_info.scriptMetaStr;
				}
			} else if(typeof data === "string"){
				scriptMetaStr = data;
			}
			
			if(_undefined!=typeof scriptMetaStr){
				pMetaData = jMod.API.ParseMetaData(scriptMetaStr);
				
				for(key in pMetaData){
					if(_undefined==typeof output[key])
						output[key] = pMetaData[key];
				}
			}
			
			if(_undefined!=typeof gm_info){
				if(_undefined!=typeof gm_info.script){
					for(key in gm_info.script){
						if(typeof output[key] === _undefined) output[key] = gm_info.script[key];
					}
				} else {
					//jModLogWarning('ScriptInfo', 'GM_info.script does not exist', gm_info, data);
					console.warn('ScriptInfo', 'GM_info.script does not exist', gm_info, data);
				}
				
				if(_undefined!=typeof gm_info.uuid){
					output['gmUUID'] = gm_info.uuid;
				} else if(_undefined!=typeof gm_info.script.uuid){
					output['gmUUID'] = gm_info.script.uuid;
				}
				
				if(_undefined!=typeof gm_info.scriptHandler){
					if(gm_info.scriptHandler.toLowerCase() == 'tampermonkey'){
						output.script_handler = 'Tampermonkey';
						output.script_handler_version = gm_info.version;
						jConfig.getScriptFileInfo = false; // Tampermonkey is too secure for this
					} else if(gm_info.scriptHandler.toLowerCase() == 'greasemonkey'){
						output.script_handler = 'Greasemonkey';
						output.script_handler_version = gm_info.version;
					}
				} else if(data.has_GM_info){
					output.script_handler = 'Greasemonkey';
					output.script_handler_version = gm_info.version;
				} else if(data.has_GM_getMetadata){
					output.script_handler = 'Scriptish';
				}
				
			}
			
			if(_undefined!=typeof pMetaData){	
				key = getFirstValidKey(pMetaData, ['downloadURL', 'updateURL', 'jModupdateURL', 'jModUpdateURL', 'jModdownloadURL', 'jModDownloadURL'], function(k, val){return jMod.ScriptInfo.getURLInfo(val);});
				if(_undefined!=typeof key && (urlInfo = ScriptInfo.getURLInfo(pMetaData[key]))){
					jConfig.script.username = urlInfo.username;
					jConfig.script.script_name = urlInfo.script_name;
					if(['meta', 'metajs', 'data'].indexOf(urlInfo.get_type.toLowerCase()) != -1){
						jConfig.script.get_type = urlInfo.get_type.toLowerCase();
					}
				} else {
					if((tmp = getFirstValidKeyValue(pMetaData, ['jModusername', 'jMod_username'])))
						jConfig.script.username = tmp;
						
					if((tmp = getFirstValidKeyValue(pMetaData, ['jModscriptname', 'jMod_script_name'])))
						jConfig.script.script_name = tmp;
				}
				
				if(_undefined!=typeof pMetaData.jMod){
					try{
						if(tmp = JSON.parse(pMetaData['jMod']))
							jMod.extend(true, jMod.Config, tmp);
					} catch(e) {
						//console.error('Error parsing options in MetaBlock', e);
						jModLogError(e, 'ScriptInfo.set', 'Error parsing options in MetaBlock');
					}
				}
				
				
			}
			
		} catch(e) {
			console.error('Error ScriptInfo.set', e);
			//jModLogError(e, 'ScriptInfo.set');
		}
		
		Object.defineProperty(jMod.Config.script, 'script_info', {
			value: Object.freeze(output),
			writable: false,
			enumerable: true,
			configurable: false
		});
		
		//if(output && output.name && jMod.debug)
			//console.info('ScriptInfo.set - Get Script_Info Successful!!', output);
		
		
		return Object.freeze(output);
	}
	
	ScriptInfo.get = function(){
		var r = jMod.Config.script.script_info;
		return (_undefined!=typeof r ? r : ScriptInfo.set.apply(this, arguments));
	}
	
	var cssResourceAdded = false;
	if(_undefined!=typeof GM_info || _undefined!=typeof GM_getMetadata){
		try{
			ScriptInfo.set();
		}catch(e){}
		// If script has a resource named "jModCSS", load it instead of importing the remote url
		
		var resources = jConfig('script.script_info.resource');
		if(resources && resources.jModCSS && _undefined!=typeof GM_getResourceText){
			try{
				var tmp = GM_getResourceText('jModCSS');
				if(tmp && tmp != ''){
					_css += tmp;
					cssResourceAdded = true;
				}
			}catch(e){}
		}
	}
	if(!cssResourceAdded)
		_css = defaultjModCSSURL + _css;
	
	/***********************************
	 ** Language
	 **********************************/
var StringFormat = function(str, arr){
    var i = -1;
    function callback(exp, p0, p1, p2, p3, p4){
        if (exp=='%%') return '%';
        if (arr[++i] === undefined) return undefined;
        var exp  = p2 ? parseInt(p2.substr(1)) : undefined;
        var base = p3 ? parseInt(p3.substr(1)) : undefined;
        var val;
        switch (p4) {
            case 's': val = arr[i]; break;
            case 'c': val = arr[i][0]; break;
            case 'f': val = parseFloat(arr[i]).toFixed(exp); break;
            case 'p': val = parseFloat(arr[i]).toPrecision(exp); break;
            case 'e': val = parseFloat(arr[i]).toExponential(exp); break;
            case 'x': val = parseInt(arr[i]).toString(base?base:16); break;
            case 'd': val = parseFloat(parseInt(arr[i], base?base:10).toPrecision(exp)).toFixed(0); break;
        }
        val = typeof(val)=='object' ? JSON.stringify(val) : val.toString(base);
        var sz = parseInt(p1); /* padding size */
        var ch = p1 && p1[0]=='0' ? '0' : ' '; /* isnull? */
        while (val.length<sz) val = p0 !== undefined ? val+ch : ch+val; /* isminus? */
       return val;
    }
    var regex = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd])/g;
    return str.replace(regex, callback);
}

var Lang = jMod.Language = function(keys){
	var type, value, tmpLanguageObj = Lang.getLanguage(Lang.Current, true);
	if(!tmpLanguageObj)
		return;
	value = Object_SearchForKey.call(tmpLanguageObj, keys);
	type = typeof value;
	if(_undefined==type){
		if(Lang.Current === Lang.Default)
			return;
		tmpLanguageObj = Lang.getLanguage(Lang.Default);
		value = Object_SearchForKey.call(tmpLanguageObj, keys);
		type = typeof value;
		if(_undefined==type)
			return;
	}
	if(arguments.length == 1 || type !== "string")
		return value;
	return StringFormat.call(StringFormat, value, Slice.call(arguments, 1));
}
Lang.Default = 'en';
Object.defineProperty(Lang, 'Current', {
	get: function(){
		try {
			return jConfig.Language.Current;
		} catch(e){
			return Lang.Default;
		}
	},
	set: function(value){
		try {
			if(_undefined!==typeof Lang.Names[value])
				jConfig.Language.Current = value;
		} catch(e){}
	}
});
Lang.Names = {};

Lang.getLanguage = function(name, revertToDefault){
	if(Lang.Names[name] !== undefined)
		return Lang[name];
	if(revertToDefault)
		return Lang[Lang.Default];
}

// English
Lang.Names.en = 'English';

Lang.en = {
	//'test': 'test string',
	//'test2': 'test %s %d',
	//'test3': 'English only'
};


// Spanish
Lang.Names.es = 'Espanol';

Lang.es = {
	//'test': 'cadena de prueba',
	//'test2': 'prueba %s %d'
};


/*
Lang.Current = 'es';
console.log('Language Test');
console.log(Lang('test'));
console.log(Lang('test2', 'tacos', 123));
console.log(Lang('test3'));
*/
	
	/***********************************
	 ** _call
	 **********************************/
jMod._call = function(){
	var type, tmp, arg0, arg1, length = arguments.length;
	// Try to get the Userscript's file info if jMod() is being called from the script
	try{if(jConfig.getScriptFileInfo&&!ScriptInfo.gotFileInfo)ScriptInfo.getScriptFileInfo();}catch(e){} // Try to get information about the userscript if possible
	//try{if(_undefined===typeof jMod.Config.script.script_info)ScriptInfo.get();}catch(e){}
	try{
		if(length > 0){
			arg0 = arguments[0];
			type = typeof arg0;
			if(type == "string"){
				if(length == 1){
					// If is valid Config key, return value
					if(_undefined!==typeof (tmp = jConfig(arg0)))
						return tmp;
				} else {
					arg1 = arguments[1];
					// Commands
					switch(arg0){
						case 'get': // Get Config value
							//return jConfig.apply(jMod, Slice.call(arguments, 1));
							return jConfig(arg1);
							break;
						case 'set': // Set Config value
							return jConfig(arg1, arguments[2]);
							break;
					}
					
					// Events
					if(typeof arg1 === "function" && typeof jMod.Events.e[arg0] !== _undefined)
						return jMod.Events.addListener.apply(jMod.Events, Slice.call(arguments));
					
					
					if(length == 2){
						// If is valid Config key, set value
						if(_undefined!==typeof (tmp = jConfig(arg0))){
							// Types must match!
							if(typeof tmp === typeof arg1)
								return jConfig(arg0, arg1);
						}
					}
				}
				
				// If is Log Function
				if(jMod.log.fnList.join('|').toLowerCase().split('|').indexOf(arg0.toLowerCase()) != -1){
					if(typeof (tmp = Object_SearchForKeyCaseInsensitive.call(jMod.log, arg0)) === "function"){
						return tmp.apply(jMod.log, Slice.call(arguments, 1));
					}
				}
			} else if(type == "object") {
				if(!isElement(arg0)) {
					// If object with GM_info object
					if(typeof getFirstValidKey(arg0, ['GM_info', 'gm_info', 'ginfo']) !== _undefined) {
						return ScriptInfo.set.apply(ScriptInfo, Slice.call(arguments));
					}
					
					// If GM_info object
					if(typeof arg0.scriptSource !== _undefined && typeof arg0.scriptMetaStr !== _undefined){
						return ScriptInfo.set.apply(ScriptInfo, Slice.call(arguments));
					}
				}
			} else if(type == "function"){
				if(length == 1){
					// On Ready function
					jMod.onReady = arg0;
					return arg0;
				}
			}
			
			if(jConfig('debug')){
				jMod.Warning('Unable to process jMod() call:', Slice.call(arguments));
				//console.warn('Unable to process jMod() call:', Slice.call(arguments));
			}
		}
	}catch(e){}
};

	
	/***********************************
	 ** Element Manipulation Functions
	 **********************************/
jMod.$ = function(selector, target, nojQuery){
	target = target || jMod.Element.document;

	try{
		if(nojQuery !== true && jMod.jQueryAvailable){
			try{
				return $(selector, target).first()[0];
			}catch(e){}
		}
		
		if(typeof selector !== "string"){
			return;
		}
		
		return target.querySelector(selector);
	
	}catch(e){
		jMod.Exception('jMod.Query', 'Error!', e);
	}
}

jMod.$$ = function(selector, target, nojQuery){
	target = target || jMod.Element.document;
	try{
		if(nojQuery !== true && jMod.jQueryAvailable){
			try{
				return $(selector, target).toArray();
			}catch(e){}
		}
		
		if(typeof selector !== "string"){
			return;
		}
		
		var tmp = target.querySelectorAll(selector);
		return (tmp?[].map.call(tmp, function(element) {return element;}):[]);
	}catch(e){
		jMod.Exception('jMod.Query', 'Error!', e);
	}
}

// isElement


// Query


/**
 * @namespace jMod.Element
 * @memberOf jMod
 * @since 0.0.15
 */
 
/**
 * @function Element
 * @memberof jMod
 * @variation 2
 * @param {(string|object)} data - (string) Command to execute | (object) options for new element
 * @param {*} [data2] - Arguments for command
 */
jMod.Element = function(data, data2){
	try{
		var args = Slice.call(arguments);
		switch(RealTypeOf(data)){
			case "string":
				// If data is a command in jMod.Element
				if(typeof jMod.Element[command] === "function"){
					return jMod.Element._call.apply(jMod.Element, arguments);
				} else {
					
				}

				break;
			case "map":
			case "object":
				if(args.length == 1){
					return createNewElement.apply(jMod.Element, arguments);
				} else {
					return createNewElement(args);
				}
				break;
			default:
				// If data is element
				if(jMod.Element.isElement(data)){
					
				} else {
				
				}
				break;
		}
	}catch(e){
		//console.log('error, jMod.Element', e);
		jModLogError(e, 'jMod.Element');
	}
};

jMod.Element._call = function(command){
	if(typeof jMod.Element[command] === "function")
		return jMod.Element[command].apply(jMod.Element, Slice.call(arguments, 1));
}

Object.defineProperty(jMod.Element, 'document', {
	get: function(){
		try {
			return (_undefined!=typeof document ? document : (window.document || unsafeWindow.document));
		} catch(e) {}
		return null;
	}
});

Object.defineProperty(jMod.Element, 'head', {
	get: function(){
		try {
			var doc = jMod.Element.document;
			return doc.head || doc.getElementsByTagName('head')[0];
		} catch(e) {}
		return null;
	}
});



jMod.Element.isElement = isElement;

/**
 * Check if a DOM element has a particular class
 * @function hasClass
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {string} className - Class to check for
 * @returns {boolean}
 */
var hasClass = jMod.Element.hasClass = function(el, className) {
	return (" "+el.className+" ").indexOf(" "+className+" ") != -1;
}

/**
 * Check if a DOM element has one or more of the class names given as the second parameter
 * @function hasClasses
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {(string[]|string)} classNames - Class names to check for
 * @returns {string[]} Array of strings containing the matching classes
 */
var hasClasses = jMod.Element.hasClasses = function(el, classNames) {
	var classNamesPad = " "+el.className+" ",
		classNamesArr = ("string"==typeof classNames ? classNames.split(' ') : classNames);
	return classNamesArr.filter(function(name){return classNamesPad.indexOf(" "+name+" ") != -1});
}

/**
 * Check if a DOM element is missing one or more of the class names given as the second parameter
 * @function missingClasses
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {(string[]|string)} classNames - Class names to check for
 * @returns {string[]} Array of strings containing the missing class names
 */
var missingClasses = jMod.Element.missingClasses = function(el, classNames) {
	var classNamesPad = " "+el.className+" ",
		classNamesArr = ("string"==typeof classNames ? classNames.split(' ') : classNames);
	return classNamesArr.filter(function(name){return classNamesPad.indexOf(" "+name+" ") == -1});
}

/**
 * Add a class to a DOM Element
 * @function addClass
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {string} className - Class name to add
 * @returns {Element} The input element
 */
var addClass = jMod.Element.addClass = function(el, className) {
	if(!hasClass(el, className))
		el.className = (el.className + ' ' + className).trim();
	return el;
}

/**
 * Add multiple classes to a DOM Element
 * @function addClasses
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {(string[]|string)} classNames - Class names to add
 * @returns {Element} The input element
 */
var addClasses = jMod.Element.addClasses = function(el, classNames) {
	return el.className = (el.className + ' ' + missingClasses(el, classNames).join(" ")).trim(), el;
}

var removeClassRegex = new RegExp('\\w+');
/**
 * Remove a class from a DOM Element
 * @function removeClass
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {string} className - Class name to remove
 * @returns {Element} The input element
 */
var removeClass = jMod.Element.removeClass = function(el, className) {
	return el.className = ((" "+el.className+" ").replace(new RegExp(" "+className+" ", 'g'), " ")).trim(), el;
}

/**
 * Remove multiple classes from a DOM Element
 * @function removeClasses
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {(string[]|string)} classNames - Class names to remove
 * @returns {Element} The input element
 */
var removeClasses = jMod.Element.removeClasses = function(el, classNames) {
	return el.className = ((" "+el.className+" ").replace(new RegExp(" (?:"+(("string"==typeof classNames ? classNames.split(' ') : classNames).join("|"))+") ", 'g'), " ")).trim(), el;
}

var setAttributes = function(el, attrs) {
	for(var attr in attrs)
		el.setAttribute(attr, attrs[attr]);
	return el;
}

var hasAttribute = function(el, attr) {
	return el.hasAttribute(attr);
}

var hasAttributes = function(el, attrs) {
	var i = 0, r = [];
	if(typeof attrs === "string")
		attrs = attrs.split(' ');
	for( ; i < attrs.length; i++)
		if(el.hasAttribute(attrs[i]))
			r.push(attrs[i]);
	return r;
}

var getAttribute = function(el, attr, type) {
	var t, r = el.getAttribute(attr);
	if(!type)
		return r;
	
	switch(type){
		case "int":
		case "integer":
			return parseInt(r);
			break;
		case "bool":
		case "boolean":
			t = r != null && r != "" ? r.trim().toLowerCase() : 'false';
			return (t.indexOf("true") !== -1 || t == "t" ? true : false);
			break;
	}
	return r;
}



var changeElementType = function(el, type, removeChildren){
	var i = 0,
		doc = el.ownerDocument || jMod.Element.document,
		newElement = doc.createElement(type),
		attrs = el.attributes,
		nodes = el.childNodes,
		ElementPropertiesToCopy = ["scrollLeft", "scrollTop"];
	//getEventListeners
	for( ; i < attrs.length; i++){
		//newElement.setAttribute(attrs[i].nodeName, attrs[i].nodeValue);
		newElement.setAttributeNode(attrs[i]);
	}
	for(i = 0; i < nodes.length; i++){
		if(removeChildren)
			newElement.appendChild(newElement.removeChild(nodes[i]));
		else
			newElement.appendChild(nodes[i]);
	}
	
	for(i = 0; i < ElementPropertiesToCopy.length; i++){
		newElement[ElementPropertiesToCopy[i]] = el[ElementPropertiesToCopy[i]];
	}
	
	return newElement;
}

// Add/Remove Event Listeners
var addEventListener = jMod.Element.addEventListener = function(el, eventName, handler, useCapture) {
	if (el.addEventListener) {
		el.addEventListener(eventName, handler, useCapture ? true : false);
	} else if (el.attachEvent) {
		el.attachEvent('on' + eventName, handler);
	} else {
		el['on' + eventName] = handler;
	}
}

var removeEventListener = jMod.Element.removeEventListener = function(el, eventName, handler, useCapture) {
	if (el.removeEventListener) {
		el.removeEventListener(eventName, handler, useCapture ? true : false);
	} else if (el.detachEvent) {
		el.detachEvent('on' + eventName, handler);
	} else {
		el['on' + eventName] = null;
	}
}


// ViewportSize
/*! https://github.com/tysonmatanich/viewportSize */
/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
jMod.Element.viewportSize = {
	getHeight: function () {
		return this.getSize("Height");
	},

	getWidth: function () {
		return this.getSize("Width");
	},

	getSize: function (Name) {
		var size;
		var name = Name.toLowerCase();
		var win = (window || unsafeWindow);
		var doc = jMod.Element.document;
		var head = jMod.Element.head;
		var documentElement = doc.documentElement;
		if (win["inner" + Name] === undefined) {
			// IE6 & IE7 don't have window.innerWidth or innerHeight
			size = documentElement["client" + Name];
		}
		else if (win["inner" + Name] != documentElement["client" + Name]) {
			// WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy

			// Insert markup to test if a media query will match document.doumentElement["client" + Name]
			var bodyElement = doc.createElement("body");
			bodyElement.id = "vpw-test-b";
			bodyElement.style.cssText = "overflow:scroll";
			var divElement = doc.createElement("div");
			divElement.id = "vpw-test-d";
			divElement.style.cssText = "position:absolute;top:-1000px";
			// Getting specific on the CSS selector so it won't get overridden easily
			divElement.innerHTML = "<style>@media(" + name + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + name + ":7px!important}}</style>";
			bodyElement.appendChild(divElement);
			documentElement.insertBefore(bodyElement, head);

			if (divElement["offset" + Name] == 7) {
				// Media query matches document.documentElement["client" + Name]
				size = documentElement["client" + Name];
			}
			else {
				// Media query didn't match, use window["inner" + Name]
				size = win["inner" + Name];
			}
			// Cleanup
			documentElement.removeChild(bodyElement);
		}
		else {
			// Default to use window["inner" + Name]
			size = win["inner" + Name];
		}
		return size;
	}
};


function ElementBuilderClass(data){
	this.data = data || {};
}

ElementBuilderClass.prototype = {
	appendChild: function(data){
		var i,
			thisData = this.data,
			thisType = RealTypeOf(thisData),
			dataType = RealTypeOf(data);
		
		if(dataType == "array"){
			for(i = 0; i < data.length; i++)
				this.appendChild(data[i]);
			return this;
		}
		
		if(isElement(thisData)){
			if(isElement(data)){
				return thisData.appendChild(data), this;
			}
			if(dataType == "ElementBuilderClass"){
				return thisData.appendChild(data.toElement()), this;
			}
		}
		
		if(thisType == "ElementBuilderClass"){
			return thisData.appendChild(data), this;
		}
		
		if(typeof thisData == "object"){
			i = (thisData.innerHTML === undefined && thisData.text !== undefined ? 'text' : 'innerHTML');
			if(RealTypeOf(thisData[i]) == "array")
				thisData[i].push(data);
			else if(typeof thisData[i] == _undefined || thisData[i] == null)
				thisData[i] = [data];
			else
				thisData[i] = [thisData[i], data];
			return this;
		}
		
		return this;
	},
	toElement: function(){
		if(isElement(this.data))
			return this.data;
		return (this.data = createNewElement(this.data));
	}
};

Object.defineProperties(ElementBuilderClass.prototype, {
	type: {
		get: function(){
			if(isElement(this.data)){
				return this.data.nodeName.toLowerCase();
			} else {
				return this.data.type.toLowerCase();
			}
		},
		set: function(newType){
			if(isElement(this.data)){
				//this.data.nodeName;
				var parentElement = this.data.parentElement;
					tmp = changeElementType(this.data, newType, true);
				parentElement.replaceChild(tmp, this.data);
				this.data = tmp;
			} else {
				this.data.type = newType;
			}
		},
		configurable: false,
		enumerable: true
	},
	children: {
		get: function(){
			if(isElement(this.data)){
				return this.data.children;
			} else {
				var i = (this.data.innerHTML === undefined && this.data.text !== undefined ? 'text' : 'innerHTML');
				return (this.data[i] || null);
			}
		},
		configurable: false,
		enumerable: true
	}
});
/**
 * Append a child to a DOM Element. The input can be an a simple element or string. It can be an object containing Element information {@link createNewElement}. Additionally, it can be an array of any of the preciously mentioned types.
 * @function appendChild
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {(Element|object|string|*)} data - Child
 * @returns {Element} The input element
 * @see createNewElement
 */
var appendChild = jMod.Element.appendChild = function(el, data) {
	var nodes, dummy, i;
	try{
		// If appending object instead of Element
		if(!isElement(el) && typeof el === "object" && el.type != null){
			i = (el.innerHTML === undefined && el.text !== undefined ? 'text' : 'innerHTML');
			if(RealTypeOf(el[i]) == "array")
				el[i].push(data);
			else
				el[i] = [el[i], data];
		} else {
			if(typeof data === _undefined || data === null)
				return el;
			else if(isElement(data))
				el.appendChild(data);
			else {
				switch(RealTypeOf(data)){
					case _undefined:
					case "null":
						break;
					case "array":
						for(i = 0; i < data.length; i++)
							el = appendChild(el, data[i]);
						break;
					case "object":
					case "map":
						if(dummy = createNewElement(data))
							el.appendChild(dummy);
						break;
					//case "string":
					//case "number":
					//case "symbol":
					//case "boolean":
					default:
						nodes, dummy = (el.ownerDocument || jMod.Element.document).createElement('div');
						dummy.innerHTML = data;
						nodes = dummy.childNodes;
						for(i = 0; i < nodes.length; i++)
							el.appendChild(nodes[i]);
						break;
				}
			}
		}
	} catch(e) {
		jModLogError(e, 'jMod.Element.appendChild');
	} finally {
		return el;
	}
	return el; // just in case...
}

/**
 * Data for event listeners when creating new elements
 * @typedef {Object} NewElementCallbackData
 * @memberof jMod.Element
 * @property {Function} callback - Callback function
 * @property {boolean} [capture=false] - Use capture
 * @see createNewElement
 */

/**
 * Data for creating a new element
 * @typedef {Object} NewElementData
 * @memberof jMod.Element
 * @property {!string} type - The element type to be created (ex. div, h1, etc...)
 * @property {string} [id] - Element id
 * @property {string} [className] - Class name(s)
 * @property {string} [class] - Synonym for className
 * @property {string} [style] - Style to be applied to the new element
 * @property {(Element|Element[]|string|string[]|object|object[])} [innerHTML] - Child element(s) to append to the new element
 * @property {(Element|Element[]|string|string[]|object|object[])} [text] - Synonym for innerHTML
 * @property {object} [attributes] - Key-value list of attributes to be added to the new element
 * @property {object.<string, jMod.Element.NewElementCallbackData>} [EventListeners] - Key-value list of Events Names and Callback information to be added to the new element
 * @property {object} [eventListeners] - Synonym for EventListeners
 * @property {object} [Events] - Synonym for EventListeners
 * @property {object} [events] - Synonym for EventListeners
 * @property {object} [Listeners] - Synonym for EventListeners
 * @property {object} [listeners] - Synonym for EventListeners
 * @see createNewElement
 */

/** @const */
var validElementProps = ['id', 'className', 'checked', 'defaultValue', 'title', 'async', 'defer', 'src', 'onerror', 'onload', 'responseCallback', 'value', 'max', 'min'];
 
/**
 * Create a new DOM element
 * @function createNewElement
 * @memberof jMod.Element
 * @param {jMod.Element.NewElementData} data - Element information
 * @returns {Element} The newly created element
 */
var createNewElement = jMod.Element.createNewElement = function(data) {
	var i, x, eventName, capture, callback, event,
		eventListeners = data.EventListeners || data.eventListeners,
		// Get Document
		doc = jMod.Element.document,
		// Create Element
		newElement = doc.createElement(data.type || "div"),
		addListener = function(eventName, obj){
			if(typeof obj === "function")
				return addEventListener(newElement, eventName, obj);
			capture = obj.useCapture || obj.Capture || obj.capture || false;
			callback = obj.callback || obj['function'];
			if(callback){
				if(RealTypeOf(callback) == "array")
					for(i in callback){
						if(typeof callback[i] !== "function")
							capture = callback[i].useCapture || callback[i].Capture || callback[i].capture || capture;
						addEventListener(newElement, eventName, callback[i], capture);
					}
				else
					addEventListener(newElement, eventName, callback, capture);
			}
		}
	
	if(typeof data.style === "string")
		newElement.setAttribute("style", data.style);
	else if(typeof data.style === "object"){
		for(i in data.style)
			newElement.style[i] = data.style[i];
	}
	
	for(i = 0; i < validElementProps.length; i++){
		if(data[validElementProps[i]] !== undefined)
			newElement[validElementProps[i]] = data[validElementProps[i]];
	}
	
	if(data.attributes !== undefined){
		for(i in data.attributes){
			if(data.attributes[i] != null)
				newElement.setAttribute(i, data.attributes[i]);
		}
	}
	
	if(eventListeners){
		for(eventName in eventListeners){
			event = eventListeners[eventName];
			if(RealTypeOf(event) == "array"){
				for(x = 0; x < event.length; x++)
					addListener(eventName, event[x]);
			} else
				addListener(eventName, event);
		}
	}
	
	appendChild(newElement, data.innerHTML || data.text || null);
	
	return newElement;
}

var getOffset = jMod.Element.getOffset = function(el) {
	var box = el.getBoundingClientRect();
	var doc = el.ownerDocument;
	var docElem = doc.documentElement;
	var win = ((doc != null && doc === doc.window) ? doc : doc.nodeType === 9 && doc.defaultView);
	
	return {
		top: parseInt(box.top + win.pageYOffset - docElem.clientTop),
		left: parseInt(box.left + win.pageXOffset - docElem.clientLeft),
		bottom: box.bottom,
		height: parseInt(box.height || ((parseInt(el.offsetHeight) - parseInt(el.clientHeight)) + parseInt(el.scrollHeight))),
		width: parseInt(el.offsetWidth)
	};
}


var isNamespaced = jMod.Element.isNamespaced = function(el, className) {
	var parent = el;
	while(parent.parentElement){
		parent = parent.parentElement;
		if(hasClass(parent, className))
			return true;
	}
	return false;
}

var findParentWithClass = jMod.Element.findParentWithClass = function(el, className) {
	var parent = el;
	while(parent.parentElement){
		parent = parent.parentElement;
		if(hasClass(parent, className))
			return parent;
	}
}

var findParentWithAttribute = jMod.Element.findParentWithAttribute = function(el, attributeName, attributeValue) {
	var parent = el;
	while(parent.parentElement){
		parent = parent.parentElement;
		if(parent.hasAttribute(attributeName) && (_undefined==typeof attributeValue || parent.getAttribute(attributeName) == attributeValue))
			return parent;
	}
};

function fireClick(el, bubbles, cancelable){
	var doc = jMod.Element.document;
	if(jMod.jQueryAvailable){
		$(el).click();
	} else if(doc.createEvent) {
		var evt = doc.createEvent('MouseEvents');
		evt.initEvent('click', bubbles || true, cancelable || true);
		el.dispatchEvent(evt);	
	} else if(doc.createEventObject) {
		el.fireEvent('onclick');	
	} else if(typeof el.onclick == "function") {
		el.onclick();	
	}
};

jMod.Element.getCompStyleObj = function(el, pseudoEl){
	var doc = el.ownerDocument || jMod.Element.document;
	if (el.currentStyle) //IE
		return el.currentStyle;
	else if (doc.defaultView && doc.defaultView.getComputedStyle) //Firefox
		return doc.defaultView.getComputedStyle(el, pseudoEl || null);
};


//jMod.Element.getCompStyle = function(el, cssprop, pseudoEl, comp){
jMod.Element.getCompStyle = function(){
	var i = 0, arg, el, cssprop, pseudoEl, comp, doc;
	for( ; i < arguments.length; i++){
		arg = arguments[i];
		if(isElement(arg)){
			el = arg;
		} else if(typeof arg == "string"){
			if(!cssprop)
				cssprop = arg;
			else
				pseudoEl = arg;
		} else {
			comp = arg;
		}
	}
	
	if (comp) {
		if (comp[cssprop])
			return comp[cssprop];
	} else {
		if (el.currentStyle) {
			return el.currentStyle[cssprop];
		}
		doc = el.ownerDocument || jMod.Element.document;
		if (doc.defaultView && doc.defaultView.getComputedStyle){
			comp = doc.defaultView.getComputedStyle(el, pseudoEl || null);//[cssprop];
			if(comp){
				return comp[cssprop] ? comp[cssprop] : comp.getPropertyValue(cssprop);
			}
		}
	}
	
	return el ? el.style[cssprop] : null;
};

jMod.Element.getClientRect = function(el){
	try{
		var comp, r = jMod.extend({}, el.getBoundingClientRect());
		
		if (r.height == null || r.width == null) {
			comp = jMod.Element.getCompStyleObj(el);
			//r.height = parseFloat(jMod.Element.getCompStyle(el, 'height'));
			/*
			r.height = parseFloat(comp['height']);
			r.width = parseFloat(comp['width']);
			*/
			
			r.height = parseFloat(jMod.Element.getCompStyle(el, 'height', comp));
			r.width = parseFloat(jMod.Element.getCompStyle(el, 'width', comp));
		}
		
		return r;
	}catch(e){}
};

// Animation Frame
+(function(){

	var win = window || unsafeWindow;
	
	
	var _requestAnimationFrameKey =
			win.requestAnimationFrame ? 'requestAnimationFrame' :
			win.mozRequestAnimationFrame ? 'mozRequestAnimationFrame' :
			win.webkitRequestAnimationFrame ? 'webkitRequestAnimationFrame' :
			win.oRequestAnimationFrame ? 'oRequestAnimationFrame' :
			win.msRequestAnimationFrame ? 'msRequestAnimationFrame' :
			null;
	
	var _cancelAnimationFrameKey =
			win.cancelAnimationFrame ? 'cancelAnimationFrame' :
			win.mozCancelAnimationFrame ? 'mozCancelAnimationFrame' :
			win.webkitCancelAnimationFrame ? 'webkitCancelAnimationFrame' :
			win.oCancelAnimationFrame ? 'oCancelAnimationFrame' :
			win.msCancelAnimationFrame ? 'msCancelAnimationFrame' :
			win.clearTimeout ? 'clearTimeout' :
			null;
	
	jMod.Element.requestAnimationFrame = function(fn){
		if(_requestAnimationFrameKey){
			try{
				return win[_requestAnimationFrameKey](fn);
			}catch(e){}
		}
		return win.setTimeout(fn, 17);
	}
	
	jMod.Element.cancelAnimationFrame = function(id){
		if(_cancelAnimationFrameKey){
			return win[_cancelAnimationFrameKey](id);
		}
	}
	
})();


// Resize Listener
+(function(){

	function resetTriggers(element){
		var triggers = element.__resizeTriggers__,
			expand = triggers.firstElementChild,
			contract = triggers.lastElementChild,
			expandChild = expand.firstElementChild;
			contract.scrollLeft = contract.scrollWidth;
			contract.scrollTop = contract.scrollHeight;
			expandChild.style.width = expand.offsetWidth + 1 + 'px';
			expandChild.style.height = expand.offsetHeight + 1 + 'px';
			expand.scrollLeft = expand.scrollWidth;
			expand.scrollTop = expand.scrollHeight;
	};
	

	function checkTriggers(element){
		return element.offsetWidth != element.__resizeLast__.width ||
		element.offsetHeight != element.__resizeLast__.height;
	}

	function scrollListener(e){
		var element = this;
		resetTriggers(this);
		//if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
		if (this.__resizeRAF__) jMod.Element.cancelAnimationFrame(this.__resizeRAF__);
		//this.__resizeRAF__ = requestFrame(function(){
		this.__resizeRAF__ = jMod.Element.requestAnimationFrame(function(){
			if (checkTriggers(element)) {
				element.__resizeLast__.width = element.offsetWidth;
				element.__resizeLast__.height = element.offsetHeight;
				element.__resizeListeners__.forEach(function(fn){
					fn.call(element, e);
				});
			}
		});
	};
	
	jMod.Element.addResizeListener = function(el, fn){
		if (el.attachEvent) el.attachEvent('onresize', fn);
		else {
			if (!el.__resizeTriggers__) {
				if((window || unsafeWindow).getComputedStyle(el, null).position == 'static') el.style.position = 'relative';
				//createStyles();
				el.__resizeLast__ = {};
				el.__resizeListeners__ = [];
				(el.__resizeTriggers__ = (jMod.Element.document).createElement('div')).className = 'resize-triggers';
				el.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' +
					'<div class="contract-trigger"></div>';
				el.appendChild(el.__resizeTriggers__);
				resetTriggers(el);
				el.addEventListener('scroll', scrollListener, true);
				
				/* Listen for a css animation to detect element display/re-attach */
				el.__resizeTriggers__.addEventListener('animationstart', function(e) {
					if(e.animationName == 'resizeanim')
						resetTriggers(el);
				});
			}
			el.__resizeListeners__.push(fn);
		}
	}
	
	

})();

jMod.CSS = '@-webkit-keyframes resizeanim{0%{opacity:0;}100%{opacity:0;}}@keyframes resizeanim{0%{opacity:0;}100%{opacity:0;}}.jmod-na .resize-triggers{-webkit-animation:1ms resizeanim;animation:1ms resizeanim;visibility:hidden;opacity:0;}.jmod-na .resize-triggers,.jmod-na .resize-triggers > div,.jmod-na .contract-trigger:before{content:" ";display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;}.jmod-na .resize-triggers > div{background:#eee;overflow:auto;}.jmod-na .contract-trigger:before{width:200%;height:200%;}';



	/***********************************
	 ** Log
	 **********************************/
/**
 * A logging interface that allows safe console interactions. It can handle permission/scope problems and multiple console instances.<br /><br />
 * <b>Multiple consoles</b> - Userscripts executing before the DOM exists (@run-at document-start) can cause some problems with the console.
 * Sometimes firebug is unavailable at document-start and console commands are only run by the Web Console. But once firebug initiates,
 * it can be greedy and the Web Console no longer runs your console commands. So you wind up with two windows, each with half the information.<br /><br />
 * This logging interface fixes these issue by isolating the individual console instances, and making sure the maximum amount of information
 * is sent to each of them<br /><br />
 * It also features varying <b>Verbosity Levels</b> and specific functions can be enabled / disabled.
 * @namespace log
 * @memberof jMod.API
 */

var LogFormatCSS = new (function(){
	var _this = this,
		SansationFontFamily = 'font-family:"Sansation","Open Sans",Arial;',
		jModHeaderFontStyle = 'font-size:175%;font-weight:300;' + SansationFontFamily,
		stripedBackground = 'repeating-linear-gradient(-45deg, red, red 5px, transparent 5px, transparent 10px);background-size:auto 75% 100%, 0px 0px;'
	
	_this.time = 'font-weight:bold;font-size:120%;color:red;';
	
	_this.stchange = 'font-weight:bold;font-size:130%;color:blue;';
	
	//_this.iconStyle = 'font-size:175%;background-image:url("http://myuserjs.org/img/favicon/favicon.png");background-size:auto 75%;background-repeat: no-repeat;background-position:left center;';
	_this.iconStyle = ''
		//+'font-size:175%;'
		+'font-size:1.75em;'
		+'background-color: transparent;'
		+'background-image:url("http://myuserjs.org/img/favicon/favicon.png");'
		//+'background-origin: border-box;'
		+'background-clip: border-box;'
		+'background-position:left center;'
		+'background-size:auto 75%;'
		//+'background-size:auto 0.75em;'
		+'background-repeat: no-repeat;'
		+'letter-spacing: 20px;'
		+'white-space: pre;'
		//+'background-size: contain;'
		+'display: run-in;';
		
	
	_this.logDefaultStyle = 'display: run-in;';
	_this.logHeaderStyle = jModHeaderFontStyle;
	_this.logTitleStyle = 'color:#000;font-size:125%;';
	_this.logTextStyle = 'font-weight:bold;font-size:120%;color:#000;';
	
	_this.infoDefaultStyle = 'display: run-in;';
	_this.infoHeaderStyle = jModHeaderFontStyle;
	_this.infoTitleStyle = 'color:#000;font-size:125%;';
	_this.infoTextStyle = 'font-weight:bold;font-size:120%;color:blue;';
	
	_this.warningDefaultStyle = 'display: run-in;';
	_this.warningHeaderStyle = jModHeaderFontStyle;
	_this.warningTitleStyle = 'color:#000;font-size:125%;';
	_this.warningTextStyle = 'font-weight:bold;font-size:120%;color:red;';
	
	_this.errorDefaultStyle = 'display: run-in;';
	_this.errorHeaderStyle = jModHeaderFontStyle + 'color:red;';
	_this.errorTitleStyle = 'color:#000;font-size:125%;';
	_this.errorLineStyle = 'color:blue;';
})();
 
+function(){
	var i;
	var OUTPUT_TYPES = {
		'ERROR':     {level: 1,	value: 'error'     },
		'EXCEPTION': {level: 1,	value: 'exception' },
		'WARNING':   {level: 2,	value: 'warn'      },
		'INFO':      {level: 3,	value: 'info'      },
		'LOG':       {level: 4,	value: 'log'       },
		'DEBUG':     {level: 5,	value: 'debug'     }
	}
	
	var msgList = [
		['Error', 'ERROR'],
		['logError', 'ERROR'],
		['Exception', 'EXCEPTION'],
		['Warning', 'WARNING'],
		['Info', 'INFO'],
		['Log', 'LOG'],
		['Debug', 'DEBUG'],
	];
	
	var fnList = [
		'assert',
		'clear',
		'count',
		'dir',
		'dirxml',
		'group',
		'groupCollapsed',
		'groupEnd',
		'profile',
		'profileEnd',
		'table',
		'time',
		'timeEnd',
		'timeStamp',
		'trace',
	];
	
	var exportFunctions = [
		'Debug',
		'Log',
		'Info',
		'Warning',
		'logError',
		'Exception'
	];

	function isFirebug(ptr){
		if(_undefined!==typeof ptr && _undefined!== typeof ptr.timeStamp) return true;
		return false;
	}

	function isWebConsole(ptr){
		if(RealTypeOf(ptr) == "console") return true;
		if(_undefined!==typeof ptr&&!isFirebug(ptr)&&_undefined===typeof ptr.dirxml&&_undefined!==typeof ptr.trace) return true;
		return false;
	}

	function isConsole2(ptr){
		if(_undefined!==typeof ptr&&!isFirebug(ptr)&&!isWebConsole(ptr)&&_undefined===typeof ptr.dirxml&&_undefined===typeof ptr.exception) return true;
		return false;
	}
	
	function checkConsole(fn){
		if(fn(window.console)) return window.console;
		if(fn(console)) return console;
		if(fn(this.console)) return this.console;
		if(fn(unsafeWindow.console)) return unsafeWindow.console;
		if(fn(unsafeWindow.window.console)) return unsafeWindow.window.console;
		
		if(_undefined!=typeof Console && fn(Console)) return Console;
		if(fn(this.Console)) return this.Console;
		if(fn(window.Console)) return window.Console;
		if(fn(unsafeWindow.Console)) return unsafeWindow.Console;
		if(fn(unsafeWindow.window.Console)) return unsafeWindow.window.Console;
		
		return undefined;
	}

	function getFB(){
		return checkConsole(isFirebug);
	}

	function getC2(){
		return checkConsole(isConsole2);
	}

	function getWC(){
		return checkConsole(isWebConsole);
	}
	
	function functionEnabled(name){
		return ((jConfig('API.log.disabled').indexOf(name) == -1) && jConfig('API.log.verbosity_level') > 1);
	}
	
	jMod.isFormatted = function(command, value){
		return (['debug','log','info','warn','error','exception'].indexOf(command)!=-1&&"string"==typeof value&&/(?:\%s|\%c|\%o|\%d|\%f|\%\.\df|\%i)/.test(value)); // Don't use GM_log on formatted logs
	}
	
	jMod.log = API.log = {
		'OUTPUT_TYPES': OUTPUT_TYPES,
		fb: undefined,
		c2: undefined,
		wc: undefined,
		
		fnList: ([].concat(exportFunctions, fnList)),

		updateFB: function(new_ptr){
			if(isFirebug(new_ptr)) {
				if(jConfig('API.log.debug'))
					console.info('jMod.API.log - Firebug Object: ', new_ptr);
				this.fb = new_ptr;
			}
		},
		
		updateC2: function(new_ptr){
			if(isConsole2(new_ptr)) {
				if(jConfig('API.log.debug'))
					console.info('jMod.API.log - Console2 Object: ', new_ptr);
				this.c2 = new_ptr;
			}
		},
		
		updateWC: function(new_ptr){
			if(isWebConsole(new_ptr)) {
				if(jConfig('API.log.debug'))
					console.info('jMod.API.log - Web Console Object: ', new_ptr);
				this.wc = new_ptr;
			}
		},
		
		UpdateAll: function(){
			this.updateFB(getFB());
			this.updateC2(getC2());
			this.updateWC(getWC());
		},
		
		/*
		// For commands you can't call .apply on (like when an error object is involved)
		ScopedConsoleCommand: function(command, value){
			var i = 0, ptr, cmd, args = arguments,
				order = ['WebConsole', 'Firebug'],
				objs = {Firebug: this.fb, WebConsole: this.wc};
			//isFormatted = jMod.isFormatted(command, value); // Don't use GM_log on formatted logs
			if(['profile', 'profileEnd', 'error'].indexOf(command) != -1 || !jConfig.API.log.WebConsole)
				order = ['Firebug', 'WebConsole'];
			
			for( ; i < order.length; i++){
				ptr = objs[order[i]];
				cmd = ptr[command];
				if(_undefined==typeof ptr||_undefined==typeof cmd)
					continue;
				try{
				if(ptr === this.fb){
					console.log('is fb');
					if(!ptr._apply){
						var _apply = function(command, arg){
							if(this && this.log && this[command]){
								try{
									this[command].apply(this, arg);
								}catch(ex){
									console.log('fb _apply err', ex);
								}
							} else {
								console.log("no this", this, command);
							}
						};
						if(unsafeWindow !== window){
							this.fb._apply = mExportFunction(_apply.bind(this.fb), unsafeWindow, {
								//defineAs: "_apply",
								allowCallbacks: true,
								allowCrossOriginArguments: true
							});
						} else {
							this.fb._apply = _apply.bind(this.fb);
						}
					}
					var tmp, tmp2;
					try{
						tmp = Slice.call(arguments, 1);
					}catch(te){
						console.log('tmp error', te);
						tmp = arguments;
					}
					try{
						tmp2 = mCloneInto(tmp, unsafeWindow, {cloneFunctions: true, wrapReflectors: true}, true);
					}catch(te){
						console.log('tmp2 error', te);
						tmp2 = tmp;
					}
					
					try{
						//return this.fb._apply.call(this.fb, command, mCloneInto(tmp, unsafeWindow, {cloneFunctions: true, wrapReflectors: true}));
						console.log("_apply input", RealTypeOf(tmp2), tmp2);
						return this.fb._apply.call(this.fb, command, tmp2);
					}catch(te){
						console.log('_apply error', te);
					}
				}
				
				
					//cmd.apply(ptr, arguments);
					switch(args.length){
						case 1:  return cmd.call(ptr);
						case 2:  return cmd.call(ptr, args[1]);
						case 3:  return cmd.call(ptr, args[1], args[2]);
						case 4:  return cmd.call(ptr, args[1], args[2], args[3]);
						case 5:  return cmd.call(ptr, args[1], args[2], args[3], args[4]);
						case 6:  return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5]);
						case 7:  return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6]);
						case 8:  return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
						case 9:  return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
						case 10: return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
						case 11: return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10]);
						case 12: return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11]);
						case 13: return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12]);
						case 14: return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13]);
						case 15: return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14]);
						case 16: return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15]);
						case 17: return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15], args[16]);
						case 18: return cmd.call(ptr, args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15], args[16], args[17]);
						default: return false;
					}
					return true;
				}catch(e){
					console.log('log error', e);
				}
			}
			return false;
		},
		*/
		ConsoleCommand: function(command, value){
			try{
				var i = 0, key, order = ['WebConsole', 'Firebug'],
					args = Slice.call(arguments, 1),
					objs = {Firebug: this.fb, WebConsole: this.wc};
					//isFormatted = jMod.isFormatted(command, value); // Don't use GM_log on formatted logs
					
				var safeArgs = mCloneInto(args, unsafeWindow, {
					cloneFunctions: true,
					wrapReflectors: true
				});
				//if(isFormatted || ['profile', 'profileEnd'].indexOf(command) != -1 || !jConfig.API.log.WebConsole)
				if(['profile', 'profileEnd', 'error'].indexOf(command) != -1 || !jConfig.API.log.WebConsole)
					order = ['Firebug', 'WebConsole'];
				
				for( ; i < order.length; i++){
					key = order[i];
					if(objs[key] != null && typeof objs[key][command] !== _undefined && jConfig.API.log[key]){
						try {
							return objs[key][command].apply(objs[key], args);
						} catch(e){}
						try {
							return objs[key][command].apply(objs[key], safeArgs);
						} catch(e){}
					}
				}
				// disabled for now
				/*
					if(typeof this.c2 !== _undefined && typeof this.c2[command] !== _undefined)
						this.c2[command].apply(this.c2, safeArgs);
						//this.WebConsole_ptr[command].apply(this.WebConsole_ptr, safeArgs);
					if(typeof GM_log !== _undefined && jConfig('API.log.GM_log') && ['debug', 'log', 'info', 'warning', 'error', 'exception'].indexOf(command.toLowerCase()) != -1){
						// Cannot use function.apply on GM_log
						// Greasemonkey can only handle one argument
						if(args.length == 0) GM_log('');
						else if(args.length == 1) GM_log(args[0]);
						else GM_log(JSON.stringify(args));
					}
					
				}
				*/
			}catch(e){
				//console.log('ConsoleCommand Error! getUpdateData: ', e.name, e.fileName, e.lineNumber + ':' + e.columnNumber, e);
				console.error(e);
			}
			return false;
		},
		
		outputMessage: function(output_type, str){
			if(output_type.level <= jConfig('API.log.verbosity_level'))
				this.ConsoleCommand.apply(this, [output_type.value].concat(Slice.call(arguments, 1)));
		},
		
		fmt: LogFormatCSS
	};
	
	for(i = 0; i < msgList.length; i++){
		API.log[msgList[i][0]] = (function(oType){
			return (function(){return this.outputMessage.apply(this, [OUTPUT_TYPES[oType]].concat(Slice.call(arguments)));}).bind(API.log);
		})(msgList[i][1]);
	}
	
	for(i = 0; i < fnList.length; i++){
		API.log[fnList[i]] = (function(fName){
			return (function(){if(functionEnabled(fName))return this.ConsoleCommand.apply(this, [fName].concat(Slice.call(arguments)));}).bind(API.log);
		})(fnList[i]);
	}
	
	for(i = 0; i < exportFunctions.length; i++)
		jMod[exportFunctions[i]] = (jMod.log[exportFunctions[i]]).bind(API.log);
	
	
	API.logFormatBuilder = function(){
		this.args = [];
		
		var addLine = function(value, type, style){
			var isUndef = _undefined===typeof value,
				origType = typeof type;
			if(typeof type === _undefined) type = typeof value;
			var fmtType;
			switch(type){
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
					if(parseInt(value) === value && value === +value){
						fmtType = "%d";
						value = parseInt(value);
					} else {
						fmtType = "%.2f";
						value = parseFloat(value);
					}
					break;
				case "s":
				case "%s":
					if(value == "\n" || value == " \n"){
						fmtType = " \n";
						value = undefined;
						style = undefined;
						isUndef = false;
					} else
						fmtType = "%s";
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
					if(origType==_undefined && _undefined==typeof style)
						fmtType = "";
					else
						fmtType = "%o";
					break;
			}
			
			this.args.push({
				valueIsUndefined: isUndef,
				value: value,
				fmtString: fmtType,
				style: style
			});
		}
		
		this.add = function(){
			var i = 0, var0 = arguments[0];
			if(arguments.length == 1 && RealTypeOf(var0) == "array"){
				for( ; i < var0.length; i++){
					addLine.apply(this, var0[i]);
				}
			} else {
				addLine.apply(this, Slice.call(arguments));
			}
		}
		
		this.build = function(){
			var fmtString = '';
			
			var arr = [];
			
			for(var i = 0; i < this.args.length; i++){
				fmtString += (typeof this.args[i].style !== "undefined" ? '%c' : '') + this.args[i].fmtString;
				if(typeof this.args[i].style !== "undefined")
					arr.push(this.args[i].style != "" ? this.args[i].style : " ");
					
				if(typeof this.args[i].value !== "undefined" || this.args[i].valueIsUndefined)
					arr.push(this.args[i].value);
			}
			
			return [fmtString].concat(arr);
		}
		
		if(arguments.length > 0)
			this.add.apply(this, arguments);
	};
		
	jMod.log.UpdateAll();
		
}();



var jModLogError = function(){
	var i = 3,
		e = arguments[0],
		title = arguments[1],
		message;
	try{
		message = arguments[2]
	}catch(x){};
	
	//if(!(e && (e.message && e.lineNumber))){
	if(!(e && e instanceof Error)){
		message = title;
		title = e;
		e = undefined;
		i = 2;
	}
	
	var errorDefaultStyle = LogFormatCSS.errorDefaultStyle;
	
	var fmtBuild = new API.logFormatBuilder([
		['  ', "%s", errorDefaultStyle + LogFormatCSS.iconStyle],
		['jMod', "string", errorDefaultStyle + LogFormatCSS.errorHeaderStyle],
		
		[' - ', "string", errorDefaultStyle],
		[title || ' ', "%s", errorDefaultStyle + LogFormatCSS.errorTitleStyle],
		[" \n", "string"],
		[message || '', "%s", errorDefaultStyle + 'color:red;']
	]);
	
	for(; i < arguments.length; i++){
		fmtBuild.add([
			[" \n", "string"],
			[arguments[i], typeof arguments[i] == "string" ? "string" : "object", "color:red;"]
		]);
	}
	
	if(typeof e != _undefined && e != null){
		fmtBuild.add([
			[" \n", "string"],
			[e.message + " ", "%s", errorDefaultStyle + "color:red;"],
			[e.lineNumber, "%s", errorDefaultStyle + LogFormatCSS.errorLineStyle + "color:red;"],
			[" \n", "string", " "],
			[e && e.err ? e.err : e, "%0", "color:red;"]
		]);
	}
	
	//var arr = fmtBuild.build();
	//arr.unshift('error');
	try{
		//jMod.log.ScopedConsoleCommand.apply(jMod.log, arr); // This works
		//jMod.log.ConsoleCommand.apply(jMod.log, arr); // This will not work!
		jMod.logError.apply(jMod.log, fmtBuild.build());
	} catch(e){}
}

var jModLogWarning = function(title, text){
	if(jMod.log.OUTPUT_TYPES.WARNING.level > jConfig('API.log.verbosity_level'))
		return;
		
	var i = 2,
		warningDefaultStyle = LogFormatCSS.warningDefaultStyle,
		fmtBuild = new API.logFormatBuilder([
			['  ', "%s", warningDefaultStyle + LogFormatCSS.iconStyle],
			['jMod Warning', "string", warningDefaultStyle + LogFormatCSS.warningHeaderStyle]
		]);
		
	if(_undefined!==typeof text){
		fmtBuild.add([
			[' - ', "string", warningDefaultStyle],
			[title || ' ', "%s", warningDefaultStyle + LogFormatCSS.warningTitleStyle],
			[" \n", "string"],
			[text || '', "%s", warningDefaultStyle + LogFormatCSS.warningTextStyle]
		]);
	} else {
		fmtBuild.add([
			[" \n", "string"],
			[title || '', "%s", warningDefaultStyle + LogFormatCSS.warningTextStyle]
		]);
	}
	
	if(arguments.length > 2)
		fmtBuild.add(" \n", "string");
		
	for(i; i < arguments.length; i++){
		fmtBuild.add(arguments[i]);
	}
	
	jMod.Warning.apply(jMod.log,fmtBuild.build());
}

var jModLogInfo = function(title, text){
	if(jMod.log.OUTPUT_TYPES.INFO.level > jConfig('API.log.verbosity_level'))
		return;
		
	var i = 2,
		infoDefaultStyle = LogFormatCSS.infoDefaultStyle,
		fmtBuild = new API.logFormatBuilder([
			['  ', "%s", infoDefaultStyle + LogFormatCSS.iconStyle],
			['jMod', "string", infoDefaultStyle + LogFormatCSS.infoHeaderStyle]
		]);
		
	if(_undefined!==typeof text){
		fmtBuild.add([
			[' - ', "string", infoDefaultStyle],
			[title || ' ', "%s", infoDefaultStyle + LogFormatCSS.infoTitleStyle],
			[" \n", "string"],
			[text || '', "%s", infoDefaultStyle + LogFormatCSS.infoTextStyle]
		]);
	} else {
		fmtBuild.add([
			[" \n", "string"],
			[title || '', "%s", infoDefaultStyle + LogFormatCSS.infoTextStyle]
		]);
	}
	
	if(arguments.length > 2)
		fmtBuild.add(" \n", "string");
		
	for(i; i < arguments.length; i++){
		fmtBuild.add(arguments[i]);
	}
	
	jMod.Info.apply(jMod.log,fmtBuild.build());
}

var jModLog = function(title, text){
	if(jMod.log.OUTPUT_TYPES.LOG.level > jConfig('API.log.verbosity_level'))
		return;
		
	var i = 2,
		logDefaultStyle = LogFormatCSS.infoDefaultStyle,
		fmtBuild = new API.logFormatBuilder([
			['  ', "%s", logDefaultStyle + LogFormatCSS.iconStyle],
			['jMod', "string", logDefaultStyle + LogFormatCSS.logHeaderStyle]
		]);
		
	if(_undefined!==typeof text){
		fmtBuild.add([
			[' - ', "string", logDefaultStyle],
			[title || ' ', "%s", logDefaultStyle + LogFormatCSS.logTitleStyle],
			[" \n", "string"],
			[text || '', "%s", logDefaultStyle + LogFormatCSS.logTextStyle]
		]);
	} else {
		fmtBuild.add([
			[" \n", "string"],
			[title || '', "%s", logDefaultStyle + LogFormatCSS.logTextStyle]
		]);
	}
	
	if(arguments.length > 2)
		fmtBuild.add(" \n", "string");
		
	for(i; i < arguments.length; i++){
		fmtBuild.add(arguments[i]);
	}
	
	jMod.Log.apply(jMod.log,fmtBuild.build());
}

var jModLogTime = function(title, prefix, suffix){
	if(jMod.log.OUTPUT_TYPES.INFO.level > jConfig('API.log.verbosity_level'))
		return;
	var text = (prefix || '') +  jMod.timeElapsed.toFixed(2) + 'ms' + (suffix || '');
	
	var infoDefaultStyle = LogFormatCSS.infoDefaultStyle;
	
	var fmtBuild = new API.logFormatBuilder([
		['  ', "%s", infoDefaultStyle + LogFormatCSS.iconStyle],
		['jMod', "string", infoDefaultStyle + LogFormatCSS.infoHeaderStyle],
		[' - ', "string", infoDefaultStyle],
		[title || ' ', "%s", infoDefaultStyle + LogFormatCSS.infoTitleStyle],
		[' ', "string"],
		[text, "%s", infoDefaultStyle + LogFormatCSS.time]
	]);
	
	jMod.Info.apply(jMod.log,fmtBuild.build());
}

	
	jMod.log.Info('Loading jMod API v' + jMod.version + ' ' + jMod.build_type + (jMod.debug ? ' (debug enabled)' : '') + ' - ' + (new Date(parseInt(jMod.build_time))).toString());
	
	if(jMod.debug){
		jModLogTime('jMod Init Start Time');
		
		jMod.log.group('jMod Start');
		
		if(jConfig.script.script_info)
			jModLogInfo('ScriptInfo.set', 'Get Script_Info Successful!!', jConfig.script.script_info);
		
		jMod.log.group('jMod Initialize');
		
		if(CurrentRunningScript.el){
			//jConfig.getScriptFileInfo = false;
			jMod.Info('CurrentRunningScript', CurrentRunningScript);
		}
	}
	
	/***********************************
	 ** Events
	 **********************************/
/**
 * @namespace jMod.Events
 * @memberOf jMod
 * @since 0.0.9
 */
jMod.Events = {
	'e': {},
	'fired': {},
	
	/**
	 * Add a new event to the event list. Listeners can be added via "jMod.EVENTNAME = function(e, args, ...){...}" OR "jMod.Events.addListener(EVENTNAME, function(e, args, ...){...}, true)"
	 * @function addEvent
	 * @memberOf jMod.Events
	 * @param {string} name - Name of the event
	 * @param {boolean} [recordEvent=true] - (if true) When fired, the firing arguments are recorded. If a listener is later added to the event, it is immediately called with the previous firing arguments.
	 */
	'addEvent': function(name, recordEvent){
		this.e[name] = {
			recordEvent: typeof recordEvent !== _undefined ? recordEvent : true,
			listeners: []
		};
		Object.defineProperty(jMod, name, new (function(propName){return {
			set: function(callback){jMod['Events']['addListener'](propName, callback);},
			get: function(){return (typeof jMod.Events.fired[propName] !== _undefined);},
			enumerable: false};})(name));
	},
	
	/**
	 * Add a listener for a specified event
	 * @function addListener
	 * @memberOf jMod.Events
	 * @param {string} name - Name of the event to listen for
	 * @param {function} callback - Callback function.
	 * @param {boolean} [fireRecorded=true] - If the event is a recording event, immediately trigger the callback with the arguments from the previous firing event.
	 */
	'addListener': function(name, callback, fireRecorded){
		this.e[name].listeners.push(callback);
		fireRecorded = (typeof fireRecorded !== _undefined ? fireRecorded : true);
		if(fireRecorded && typeof this.fired[name] !== _undefined && typeof this.fired[name].args !== _undefined)
			callback.apply(this.fired[name]._this, this.fired[name].args);
	},
	
	/**
	 * Fire an event by name
	 * @function addEvent
	 * @memberOf jMod.Events
	 * @param {string} name - Name of the event to be fired
	 * @param {...*} [arguments] - Arguments used when triggering the callback functions.
	 */
	'fire': function(name, data){
		if(typeof this.e[name] !== _undefined){
			if(typeof this.fired[name] === _undefined)
				this.fired[name] = {
					count: 0,
					args: undefined,
					_this: null
				};
			var args;
			var _this = null;
			
			if(typeof data == "object" && typeof data._this !== _undefined && typeof data.args !== _undefined){
				_this = data._this;
				args = data.args;
			} else
				args = Slice.call(arguments, 1);

			if(this.e[name].recordEvent){
				this.fired[name].args = args;
				this.fired[name]._this = _this;
			}
			var putBack = [];
			while( i = this.e[name].listeners.pop() ) {
				if(!i.apply(_this, args))
					putBack.push(i);
			}
			this.e[name].listeners = putBack;
			this.fired[name].count++;
		}
	},
	/*
	handleMessage: function(e){
		if(jMod.debug) jMod.Debug(e.data + ': %c%.2fms', jMod.log.fmt.time, jMod.timeElapsed);
		if(typeof jMod.Events.e[e.data] !== "undefined"){
			jMod.Events.fire(e.data);
		}
	}
	*/
};

//unsafeWindow.addEventListener("message", jMod.Events.handleMessage, true);
/*
mExportFunction(jMod.Events.handleMessage, unsafeWindow, {
	defineAs: "jModHandleMessage",
	allowCallbacks: true,
	allowCrossOriginArguments: true
});

unsafeWindow.addEventListener("message", unsafeWindow.jModHandleMessage, true);
*/

// jMod Events
jMod['Events']['addEvent']('onDOMReady');
jMod['Events']['addEvent']('onReady');
jMod['Events']['addEvent']('onPageReady');
jMod['Events']['addEvent']('onPerformanceReady');

// DOM Events
jMod['Events']['addEvent']('load');
jMod['Events']['addEvent']('DOMContentLoaded');
jMod['Events']['addEvent']('onreadystatechange');
jMod['Events']['addEvent']('afterscriptexecute', false);
jMod['Events']['addEvent']('beforescriptexecute', false);


var EventsClass = function(_events){
	var listeners = {};
	this.events = _events || [];
	
	this.add = function(group, eventName, callback){
		if(this.events.indexOf(eventName) == -1)
			this.events.push(eventName);
	
		if(typeof listeners[group] === _undefined)
			listeners[group] = {};
			
		if(typeof listeners[group][eventName] === _undefined)
			listeners[group][eventName] = [];
		
		listeners[group][eventName].push(callback);
	};
	
	this.addAll = function(data, group){
		for(var evt in this.events)
			if(typeof data[this.events[evt]] === "function")
				this.add(group, this.events[evt], data[this.events[evt]])
	};
	
	this.getAll = function(group, eventName){
		if(eventName){
			if(listeners[group] && listeners[group][eventName]){
				return listeners[group][eventName];
			}
		} else {
			//if(listeners[group])
			return listeners[group]
		}
	};
	
	this.fire = function(eventName, group, _this, args){
		var _args, i, evt, group = listeners[group || '0'];
		_args = RealTypeOf(args) == "array" ? args : [args];
		if(arguments.length > 4)
			_args = _args.concat(Slice.call(arguments, 4));
		try{
			if(typeof group !== _undefined && typeof (evt = group[eventName]) !== _undefined){
				for(i in evt){
					if((evt[i].apply(_this || null, _args || [])) === false){
						console.log('fire canceled');
						return false;
					}
				}
			}
		} catch(e){
			//console.error('Error EventsClass.fire', e);
			jModLogError(e, 'jMod.EventsClass.fire');
		}
	}
};
	
	/***********************************
	 ** Observer
	 **********************************/
jMod.Observer = function(){
	
	this.filters = [];
	
	this.addFilter = function(callback, data, fireOnce){
		this.filters.push({
			callback: callback,
			data: data,
			fireOnce: fireOnce === true ? true : false
		});
	}
	
	this.filterMutation = function(mutation){
		var filterData,
			_continue,
			tmp,
			x,
			i = 0;
			
		for(i; i < this.filters.length; i++){
			filterData = this.filters[i].data;
			_continue = false;
			
			if(filterData.type){
				if(typeof filterData.type === "string")
					filterData.type = [filterData.type];
				if(filterData.type.indexOf(mutation.type) == -1)
					continue;
			}
			
			if(typeof filterData.target === "object"){
				// Has Class
				if(filterData.target.hasClass){
					if(typeof filterData.target.hasClass === "string")
						filterData.target.hasClass = [filterData.target.hasClass];
					for(x = 0; x < filterData.target.hasClass.length; x++){
						if(!hasClass(mutation.target, filterData.target.hasClass[x])){
							_continue = true;
							break;
						}
					}
					if(_continue)
						continue;
				}
				
				// Has Children
				if(filterData.target.hasChildren){
					if(typeof filterData.target.hasChildren === "string")
						filterData.target.hasChildren = [filterData.target.hasChildren];
					for(x = 0; x < filterData.target.hasChildren.length; x++){
						tmp = jMod.$$(filterData.target.hasChildren[x], mutation.target);
						if(!tmp || tmp.length == 0){
							_continue = true;
							break;
						}
					}
					if(_continue)
						continue;
				}
				
				
			}
			
			// Fire Callback
			this.filters[i].callback(mutation, this);
			if(this.filters[i].fireOnce)
				return;
		}
	}
	
	this.MutationObserver = new MutationObserver(function(mutations) {
		for(var i = 0; i < mutations.length; i++){
			this.filterMutation(mutations[i]);
		}
	});
	
	this.observe = function(target, config){
		this.MutationObserver.observe(target, config || {
			childList: true,
			attributes: true,
			characterData: true,
			subtree: true,
			//attributeOldValue: true,
			//characterDataOldValue: true,
			//attributeFilter: true
		});
	}
	
	this.disconnect = function(){
		this.MutationObserver.disconnect();
	}
}


	
	/***********************************
	 ** File Selector
	 **********************************/
/**
 * Arguments for creating a new FileSelector Instance
 * @typedef {Object} jMod.FileSelector.FileSelectorArgs
 * @property {boolean} [multiple] - Allow multiple file selections
 * @property {boolean} [accept] - Sets the "accept" attribute for the input element
 * @property {boolean} [defaultValue] - Sets the "defaultValue" attribute for the input element
 * @property {jMod.Element.NewElementData} [button] - Options for button element. Cannot contain <i>object</i>.<b>type</b> or <i>object</i>.<b>EventListeners.click</b> - These options will be ignored
 * @property {function} [onChange] - Callback function to be fired when file selection changes
 */
 
/**
 * Creates a file selector button for reading/uploading local user files.<br>
 * This can be used for reading in a configuration file, or allowing users to
 * customize their experience with a local image which can be read as a URL,
 * and saved using GM_storage or localStorage
 * @class
 * @name FileSelector
 * @memberof jMod
 * @param {jMod.FileSelector.FileSelectorArgs} data - data
 */
jMod.FileSelector = function(data){
	var _this = this;
	_this.events = {
		change: []
	};
	
	// Add Events
	if(data.onChange)
		_this.events.change.push(data.onChange);
	
	// On Change handler
	_this.onChange = function(e){
		for(var i = 0; i < _this.events.change.length; i++)
			_this.events.change[i].call(this || _this || jMod, e, _this.files(), _this.value());
	};
	
	/**
	 * Trigger a click event
	 * @function click
	 * @memberof jMod.FileSelector#
	 * @param {boolean} [bubbles]
	 * @param {boolean} [cancelable]
	 */
	_this.click = function(bubbles, cancelable){
		return fireClick(_this.buttonTriggerElement, _undefined!==typeof bubbles ? bubbles : true, _undefined!==typeof cancelable ? cancelable : true);
	};
	
	/**
	 * Get the selected files
	 * @function files
	 * @memberof jMod.FileSelector#
	 */
	_this.files = function(){
		return _this.inputElement.files;
	};
	
	/**
	 * Get the current value of the input element
	 * @function value
	 * @memberof jMod.FileSelector#
	 */
	_this.value = function(){
		return _this.inputElement.value;
	};
	
	// Input Element
	var inputElementOpts = {
		type: 'input',
		attributes: {
			type: 'file',
			multiple: data.multiple ? true : false
		},
		style: {
			position: 'absolute',
			opacity: '0',
			'-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)',
			filter: 'alpha(opacity=0)',
			width: '0'
		},
		EventListeners: {
			change: _this.onChange
		}
	};
	
	if(data.defaultValue)
		inputElementOpts.defaultValue = data.defaultValue;
		
	if(data.accept)
		inputElementOpts.attributes.accept = data.accept;
	
	/**
	 * The input element (styled to be hidden)
	 * @name inputElement
	 * @type {element}
	 * @memberof jMod.FileSelector#
	 */
	_this.inputElement = createNewElement(inputElementOpts);
	
	
	// Trigger Button
	var buttonTriggerElementOpts = {
		type: 'button',
		EventListeners: {
			'click': function(e){
				console.log('Button click triggered');
				var fileInput = this.previousSibling;
				fileInput.focus();
				fireClick(fileInput);
				eventCancel(e);
				return false;
			}
		}
	};
	
	if(typeof data.button == "object"){
		/*
		if(data.button.style)
			buttonTriggerElementOpts.style = data.button.style;
			
		if(data.button.innerHTML || data.button.text)
			buttonTriggerElementOpts.innerHTML = (data.button.innerHTML || data.button.text);
		*/
		if(data.button.type)
			delete data.button.type;
		if(data.button.EventListeners && data.button.EventListeners.click)
			delete data.button.EventListeners.click;
			
		buttonTriggerElementOpts = jMod.extend(true, buttonTriggerElementOpts, data.button);
	}
	
	/**
	 * The button element used to trigger the input dialog
	 * @name buttonTriggerElement
	 * @type {element}
	 * @memberof jMod.FileSelector#
	 */
	_this.buttonTriggerElement = createNewElement(buttonTriggerElementOpts);

	var formElementOpts = jMod.extend(true, data.form || {}, {
		type: 'form',
		innerHTML: [
			_this.inputElement,
			_this.buttonTriggerElement
		]
	});
	/*
	if(data.form){
		if(data.form.id)
			formElementOpts.id = data.form.id;
			
		if(data.form.name)
			formElementOpts.attributes.name = data.form.name;
	}
	*/
	
	/**
	 * Form element that acts as a wrapper
	 * @name formElement
	 * @type {element}
	 * @memberof jMod.FileSelector#
	 */
	_this.formElement = createNewElement(formElementOpts);
	
	jMod.FileSelector.FileSelectorForms.push(_this.formElement);
}
jMod.FileSelector.FileSelectorForms = [];

/**
 * Check for local file read support
 * @function FileReadSupport
 * @memberof jMod.FileSelector
 */
jMod.FileSelector.FileReadSupport = function(){
	return (window.File && window.FileReader);
}

/**
 * Check for local blob support
 * @function BlobSupport
 * @memberof jMod.FileSelector
 */
jMod.FileSelector.BlobSupport = function(){
	return (window.File && window.Blob);
}

/**
 * Reads the given file as text
 * @function ReadFileAsText
 * @memberof jMod.FileSelector
 * @param {file} file - File to read
 * @param {function} callback - Function to call when file read is complete
 * @param {function} [error_callback] - Function to call if there is an error reading the file
 * @returns {boolean} - Returns true if there is file read support and the file exists. Otherwise it returns false.
 */
jMod.FileSelector.ReadFileAsText = function(file, callback, error_callback){
	if(!jMod.FileSelector.FileReadSupport){
		if(jMod.debug) console.log('Error! No Support For File Reading!');
		return false;
	}
	var r = new FileReader();
	if(file){
		r.onload = function(e) {
			return callback.call(this || jMod, e, e.target.result, file);
		}
		
		r.onerror = function(e){
			if(jMod.debug) console.log('Error reading file', file);
			return (error_callback || callback)(e, undefined, file);
		}
		r.readAsText(file);
		return true;
	} else {
		if(jMod.debug) console.log('Error reading file', file);
		(error_callback || callback)(e, undefined, file);
	}
	return false;
}

// For Images / Image Preview
/**
 * Reads the given file and encodes the result as a base64 string
 * @function ReadFileAsURL
 * @memberof jMod.FileSelector
 * @param {file} file - File to read
 * @param {function} callback - Function call when file read is complete
 * @param {function} [error_callback] - Function to call if there is an error reading the file
 * @returns {boolean} - Returns true if there is file read support and the file exists. Otherwise it returns false.
 */
jMod.FileSelector.ReadFileAsURL = function(file, callback, error_callback){
	if(!jMod.FileSelector.FileReadSupport){
		if(jMod.debug) console.log('Error! No Support For File Reading!');
		return false;
	}
	var r = new FileReader();
	if(file){
		r.onload = function(e) {
			return callback.call(this || jMod, e, e.target.result, file);
		}
		r.onerror = function(e){
			if(jMod.debug) console.log('Error reading file', file);
			return (error_callback || callback)(e, undefined, file);
		}
		r.readAsDataURL(file);
		return true;
	} else {
		if(jMod.debug) console.log('Error reading file', file);
		(error_callback || callback)(e, undefined, file);
	}
	return false;
}

/**
 * Reads the given file and attempts to parse it as a JSON string
 * @function ReadFileAsJSON
 * @memberof jMod.FileSelector
 * @param {file} file - File to parse
 * @param {function} callback - Function call when file read is complete
 * @param {function} [error_callback] - Function to call if there is an error reading the file
 * @returns {boolean} - Returns true if there is file read support and the file exists. Otherwise it returns false.
 */
jMod.FileSelector.ReadFileAsJSON = function(file, callback, error_callback){
	return jMod.FileSelector.ReadFileAsText(file, function(e, content, _file){
		if(content && content != ''){
			try{
				return callback(e, JSON.parse(content), _file);
			}catch(err){
				if(jMod.debug) console.log('Error! Cannot parse json file!', err, _file);
				return (error_callback || callback)(e, undefined, _file);
			}
		} else {
			if(jMod.debug) console.log('Error! JSON file is empty!', _file);
			return (error_callback || callback)(e, undefined, _file);
		}
	});
}



	//if(jConfig('debug')) jMod.Log('jMod.Config', jMod.Config);

	/***********************************
	 ** Add Style
	 **********************************/
/**
 * Adds given css to the the page.
 * @function addStyle
 * @memberof jMod.API
 * @param {string} css The CSS to be added to the document.
 * @returns {Object} node The newly created style node
 */
var addStyle = jMod.API.addStyle = function(css){
	if(css && css != ''){
		if(typeof GM_addStyle !== _undefined)
			return GM_addStyle(css) || true;
			
		var style,
			head = jMod.Element.head;
			
		if(head) {
			style = jMod.Element.document.createElement('style');
			try {
				style.innerHTML = css;
			} catch (x) {
				style.innerText = css;
			}
			style.type = 'text/css';
			return head.appendChild(style);
		} else {
			if(jMod.debug)
				jModLogWarning('jMod.API.addStyle', 'Could not add css', css);
		}
	}
}

jMod.API.addStylesheet = function(url){
	var style,
		head = jMod.Element.head;
		//win = (window || unsafeWindow);
	
	if(head){
		style = jMod.Element.document.createElement('link');
		style.setAttribute('rel', 'stylesheet');
		style.href = url;
		return head.appendChild(style);
	} else {
		if(jMod.debug)
			jModLogWarning('jMod.API.addStylesheet', 'Could not add stylesheet', url);
	}
}

jMod.API.importStylesheet = function(url){
	jMod.CSS = "@import url("+url+");\n";
}

	 
	/***********************************
	 ** Add Script
	 **********************************/
/**
 * Adds given js to the the page.
 * @function addScript
 * @memberof jMod.API
 * @param {string} [js] The js to be added to the document.
 * @param {string} [src] The src for the script tag.
 * @param {string} [id] The id for the script tag.
 * @param {string} [type] The type for the new script tag.
 * @param {boolean} [async] Value of the async attribute.
 * @param {boolean} [defer] Value of the defer attribute.
 * @returns {Object} node The newly created script node
 */
jMod.API.addScript = function(js, src, id, type, async, defer){
	var newScript,
		head = jMod.Element.head,
		data;
	if(typeof js === "object")
		data = js;
	else
		data = {
			js: js,
			src: src,
			id: id,
			type: type,
			async: async,
			defer: defer
		};
	if(head) {
		newScript = jMod.Element.document.createElement('script');

		if(typeof data.id !== _undefined){
			try{newScript.id = data.id;}catch(x){}
		}
		
		if(typeof data.async !== _undefined){
			newScript.async = data.async;
		}
		
		if(typeof data.defer !== _undefined){
			newScript.defer = data.defer;
		}
		
		if(typeof data.onload !== _undefined){
			newScript.onload = data.onload;
		}
		
		if(typeof data.onerror !== _undefined){
			newScript.onerror = data.onerror;
		}
		
		newScript.type = data.type || 'text/javascript';
		
		if(typeof data.js != _undefined && data.js != null && data.js != ''){
			try {
				newScript.innerHTML = data.js;
			} catch (x) {
				newScript.innerText = data.js;
			}
		}
		
		if(typeof data.src != _undefined && data.src != null && data.src != ''){
			try{newScript.src = data.src;}catch(x){}
		}
		
		try{return head.appendChild(newScript);}catch(x){}
	}
	return null;
};

	/***********************************
	 ** Content Eval
	 **********************************/
//+(function(){

jMod.API.contentEval = function(source) {
	// Check for function input.
	if ('function' == typeof source) {
		// Execute this function with no arguments, by adding parentheses.
		// One set around the function, required for valid syntax, and a
		// second empty set calls the surrounded function.
		source = '(' + source + ')();'
	}
	var doc = jMod.Element.document,
		head = jMod.Element.head,
		// Create a script node holding this source code.
		script = doc.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;

	// Insert the script node into the page, so it will run, and immediately
	// remove it to clean up.
	head.appendChild(script);
	head.removeChild(script);
};

//})();
	
	/***********************************
	 ** Cookie
	 **********************************/
// Based on:
// https://github.com/carhartl/jquery-cookie
+(function(){

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(/\+/g, ' '));
			
			return jMod.API.Cookie.defaults.JSON ? JSON.parse(s) : s;
		} catch(e) {}
	}
	
	function read(s, converter) {
		var value = parseCookieValue(s);
		return "function"==typeof converter ? converter(value) : value;
	}

	var isDate = function(date) {
		return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ));
	}
	
	jMod.API.Cookie = function(key, value, options){
		var i, parts, name, cookie, cookies, tmp,
			doc = jMod.Element.document,
			result = key ? undefined : {},
			defaults = jMod.API.Cookie.defaults;
		
		if(!doc){
			jModLogWarning('jMod.API.Cookie', 'No document available');
			return;
		}
		
		if (arguments.length > 1 && "function"!=typeof value) {
			options = jMod.extend({}, defaults, options);
			//switch(typeof options.expires){
			switch(jMod.RealTypeOf(options.expires)){
				case "number":
					tmp = options.expires;
					i = options.expires = new Date();
					i.setTime(+i + tmp * 864e+5);
					break;
				case "string":
					//if(isDate(options.expires)){
						try{
							options.expires = Date.parse(options.expires);
						} catch(e) {
							jModLogError(e, 'jMod.API.Cookie', 'Invalid Exp Date');
							return;
						}
					//} else {
						//options.expires = defaults.expires;
					//}
					
					break;
				case "invaliddate":
					jModLogError(e, 'jMod.API.Cookie', 'Invalid Exp Date');
					return;
				case "date":
					// Do Nothing
					break;
				default:
					options.expires = defaults.expires;
					break;
			}
			
			if(defaults.JSON){
				try{
					cookie = encodeURIComponent(JSON.stringify(value));
				}catch(e){
					cookie = undefined;
				}
			}
			
			if(_undefined==typeof cookie)
				cookie = encodeURIComponent(String(value));
			
			return (doc.cookie = [
				encodeURIComponent(key), '=', cookie,
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
		}
		
		cookies = doc.cookie ? doc.cookie.split('; ') : [];
		
		for(i = 0, l = cookies.length; i < l; i++) {
			parts = cookies[i].split('=');
			name = decodeURIComponent(parts.shift());
			cookie = parts.join('=');
			if(key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}
			// Prevent storing a cookie that we couldn't decode.
			//if(!key && (cookie = read(cookie)) !== undefined) {
			if(!key){
				var tmp = read(cookie) || cookie;
				if(tmp)
					result[name] = tmp;
			}
		}
		return result;
	};
	
	
	// move defaults to jMod's config file
	jMod.API.Cookie.defaults = {
		expires: Date.parse('Jan 1, 2020'),
		JSON: true
	};
	
	jMod.API.Cookie.remove = function (key, options) {
		if (jMod.API.Cookie === undefined) {
			return false;
		}
		// Must not alter options, thus extending a fresh object...
		jMod.API.Cookie(key, '', jMod.extend({}, options || {}, { expires: -1 }));
		return !jMod.API.Cookie(key);
	};

})();
/*
setTimeout(function(){
	console.log('Cookie test');
	var tmpCookies = jMod.API.Cookie();
	console.log('Start Cookies', tmpCookies);
	
	jMod.API.Cookie('TestCookie1', 'Cookie Value 1');
	
	jMod.API.Cookie('TestCookie2', 'Cookie Value 2');
	
	jMod.API.Cookie('TestCookie3', {foo : 'bar', taco: 'bell'});
	
	tmpCookies = jMod.API.Cookie();
	console.log('End Cookies', tmpCookies);
	console.log('End Cookie test');
}, 2000);
*/
	
	/***********************************
	 ** Storage
	 **********************************/
/***********************************
 ** GM_Storage
 **********************************/
/**
 * Shim for interacting with the GM storage functions
 * @namespace jMod.API.GM_Storage
 */

jMod.API.GM_Storage = {
	/**
	 * @function available
	 * @memberof jMod.API.GM_Storage
	 */
	available: function(){
		return (typeof GM_getValue !== _undefined && typeof GM_setValue !== _undefined && typeof GM_deleteValue !== _undefined);
	},
	/**
	 * @function getValue
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name
	 * @param {string|boolean|number} [def] - default value to return if key does not exist
	 */
	getValue: function(key, def){
		return this.available() ? GM_getValue(jConfig('API.Storage.prefix') + key, def) : def;
		
	},
	/**
	 * @function setValue
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name
	 * @param {string|boolean|number} [value] - value to be set
	 */
	setValue: function(key, value){
		if(this.available())
			return GM_setValue(jConfig('API.Storage.prefix') + key, value);
	},
	/**
	 * @function setJSON
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name
	 * @param {object} [value] - value to be set
	 */
	setJSON: function(key, value){
		var tmp;
		try{
			tmp = JSON.stringify(value);
		}catch(e){
			jModLogError(e, 'GM_Storage.setJSON', 'Cannot stringify value!');
		}
		try{
			return this.setValue(key, tmp || value);
		}catch(e){}
	},
	/**
	 * @function getJSON
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name
	 * @param {object} [def] - default value to return if key does not exist
	 */
	getJSON: function(key, def){
		var tmp = this.getValue(key, def);
		try{
			if(typeof tmp === "string")
				return JSON.parse(tmp);
		}catch(e){
			jModLogError(e, 'GM_Storage.setJSON', 'Error parsing value!');
		}
		return tmp || def;
	},
	/**
	 * @function deleteValue
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name to be deleted
	 */
	deleteValue: function(key){
		if(this.available())
			return GM_deleteValue(jConfig('API.Storage.prefix') + key);
	}
}




 
/***********************************
 ** LocalStorage
 **********************************/
/**
 * Shim for interacting with localStorage
 * @namespace jMod.API.localStorage
 */
/*
Object.defineProperty(jMod, "stor", {
	value: (function(){return (localStorage?localStorage:(unsafeWindow.localStorage?unsafeWindow.localStorage:window.localStorage));})(),
	enumerable: false
});
*/

jMod.API.localStorage = {
	/**
	 * @function available
	 * @memberof jMod.API.localStorage
	 */
	available: function(){
		try {
			var s = this.stor;
			if(_undefined!==typeof s && s != null && s.getItem && s.setItem)
				return true;
		} catch(e){}
		
		return false;
	},
	/**
	 * @function getValue
	 * @memberof jMod.API.localStorage
	 * @param {string} key - name
	 * @param {string|boolean|number} [def] - default value to return if key does not exist
	 */
	getValue: function(key, def){
		if(!this.available()) return def;
		try{
			var r = this.stor.getItem(jConfig('API.Storage.prefix') + key);
			return (r !== null ? r: def);
		}catch(e){}
		return def;
	},
	/**
	 * @function setValue
	 * @memberof jMod.API.localStorage
	 * @param {string} key - name
	 * @param {string|boolean|number} [value] - value to be set
	 */
	setValue: function(key, value){
		if(!this.available()) return;
		try{
			return this.stor.setItem(jConfig('API.Storage.prefix') + key, value);
		}catch(e){}
	},
	/**
	 * @function setJSON
	 * @memberof jMod.API.localStorage
	 * @param {string} key - name
	 * @param {object} [value] - value to be set
	 */
	setJSON: function(key, value){
		if(!this.available()) return;
		var tmp;
		try{
			tmp = JSON.stringify(value);
		}catch(e){
			jModLogError(e, 'localStorage.setJSON', 'Cannot stringify value!');
		}
		try{
			return this.setValue(key, tmp || value);
		}catch(e){}
	},
	/**
	 * @function getJSON
	 * @memberof jMod.API.localStorage
	 * @param {string} key - name
	 * @param {object} [def] - default value to return if key does not exist
	 */
	getJSON: function(key, def){
		if(!this.available()) return def;
		var tmp;
		try{
			tmp = this.getValue(key, def);
		}catch(e){}
		try{
			if(typeof tmp === "string")
				return JSON.parse(tmp);
		}catch(e){
			jModLogError(e, 'localStorage.setJSON', 'Error parsing value!');
		}
		return tmp || def;
	},
	/**
	 * @function deleteValue
	 * @memberof jMod.API.localStorage
	 * @param {string} key - name to be deleted
	 */
	deleteValue: function(key){
		if(!this.available()) return;
		try{
			return this.stor.removeItem(jConfig('API.Storage.prefix') + key);
		}catch(e){}
	}
}

/**
 * Getter function that retrieves the localStorage object
 * @name stor
 * @memberof jMod.API.localStorage
 * @type {object}
 */
Object.defineProperty(jMod.API.localStorage, "stor", {
	get: function(){
		try{
			/*
			return (
					_undefined!==typeof localStorage && localStorage!=null?localStorage:
						(window.localStorage&&window.localStorage!=null?window.localStorage:
							(unsafeWindow.localStorage&&unsafeWindow.localStorage!=null?unsafeWindow.localStorage:undefined)
						)
					);
			*/
			return (
				window.localStorage&&window.localStorage!=null?window.localStorage:
					(_undefined!==typeof localStorage && localStorage!=null?localStorage:
						(unsafeWindow.localStorage&&unsafeWindow.localStorage!=null?unsafeWindow.localStorage:undefined)
					)
				);
		}catch(e){
			jModLogWarning("jMod.API.localStorage", "localStorage unavailable!", e.message);
		}
	},
	enumerable: false
});




/***********************************
 ** LocalStorage
 **********************************/
/**
 * Shim for interacting with sessionStorage
 * @namespace jMod.API.sessionStorage
 */

jMod.API.sessionStorage = {
	/**
	 * @function available
	 * @memberof jMod.API.sessionStorage
	 */
	available: function(){
		try {
			var s = this.stor;
			if(_undefined!==typeof s && s != null && s.getItem && s.setItem)
				return true;
		} catch(e){}
		
		return false;
	},
	/**
	 * @function getValue
	 * @memberof jMod.API.sessionStorage
	 * @param {string} key - name
	 * @param {string|boolean|number} [def] - default value to return if key does not exist
	 */
	getValue: function(key, def){
		if(!this.available()) return def;
		try{
			var r = this.stor.getItem(jConfig('API.Storage.prefix') + key);
			return (r !== null ? r: def);
		}catch(e){}
		return def;
	},
	/**
	 * @function setValue
	 * @memberof jMod.API.sessionStorage
	 * @param {string} key - name
	 * @param {string|boolean|number} [value] - value to be set
	 */
	setValue: function(key, value){
		if(!this.available()) return;
		try{
			return this.stor.setItem(jConfig('API.Storage.prefix') + key, value);
		}catch(e){}
	},
	/**
	 * @function setJSON
	 * @memberof jMod.API.sessionStorage
	 * @param {string} key - name
	 * @param {object} [value] - value to be set
	 */
	setJSON: function(key, value){
		if(!this.available()) return;
		var tmp;
		try{
			tmp = JSON.stringify(value);
		}catch(e){
			jModLogError(e, 'sessionStorage.setJSON', 'Cannot stringify value!');
		}
		try{
			return this.setValue(key, tmp || value);
		}catch(e){}
	},
	/**
	 * @function getJSON
	 * @memberof jMod.API.sessionStorage
	 * @param {string} key - name
	 * @param {object} [def] - default value to return if key does not exist
	 */
	getJSON: function(key, def){
		if(!this.available()) return def;
		var tmp;
		try{
			tmp = this.getValue(key, def);
		}catch(e){}
		try{
			if(typeof tmp === "string")
				return JSON.parse(tmp);
		}catch(e){
			jModLogError(e, 'sessionStorage.setJSON', 'Error parsing value!');
		}
		return tmp || def;
	},
	/**
	 * @function deleteValue
	 * @memberof jMod.API.sessionStorage
	 * @param {string} key - name to be deleted
	 */
	deleteValue: function(key){
		if(!this.available()) return;
		try{
			return this.stor.removeItem(jConfig('API.Storage.prefix') + key);
		}catch(e){}
	}
}

/**
 * Getter function that retrieves the sessionStorage object
 * @name stor
 * @memberof jMod.API.sessionStorage
 * @type {object}
 */
Object.defineProperty(jMod.API.sessionStorage, "stor", {
	get: function(){
		try{
			/*
			return (
					_undefined!==typeof sessionStorage && sessionStorage!=null?sessionStorage:
						(window.sessionStorage&&window.sessionStorage!=null?window.sessionStorage:
							(unsafeWindow.sessionStorage&&unsafeWindow.sessionStorage!=null?unsafeWindow.sessionStorage:undefined)
						)
					);
			*/
			return (
				window.localStorage&&window.localStorage!=null?window.localStorage:
					(_undefined!==typeof localStorage && localStorage!=null?localStorage:
						(unsafeWindow.localStorage&&unsafeWindow.localStorage!=null?unsafeWindow.localStorage:undefined)
					)
				);
		}catch(e){
			jModLogWarning("jMod.API.sessionStorage", "sessionStorage unavailable!", e.message);
		}
	},
	enumerable: false
});




+(function(){

var storageEngineOrder = function(){
	var order = [],
		engine = jConfig('API.Storage.engine'),
		gm = 'GM_Storage',
		ls = 'localStorage',
		ss = 'sessionStorage';
	
	try{
		
		try{
			if(API[engine] && API[engine].available())
				order = [engine];
		}catch(e){}
		
		if(order.indexOf(gm) == -1 && API[gm].available())
			order.push(gm);
			
		if(order.indexOf(ls) == -1 && API[ls].available())
			order.push(ls);
		
		if(order.indexOf(ss) == -1 && API[ss].available())
			order.push(ss);
		
	}catch(e){}
	
	return order;
}

/**
 * Get a value from the default storage engine (see [Storage configuration]{@link jMod.Config})
 * @function getValue
 * @memberof jMod
 * @param {string} key - name
 * @param {string|boolean|number} [def] - default value to return if key does not exist
 * @see jMod.API.localStorage
 * @see jMod.API.sessionStorage
 * @see jMod.API.GM_Storage
 */
jMod.getValue = function(key, def){
	var i = 0, storageEngines = storageEngineOrder();
	for(; i < storageEngines.length; i++){
		try{
			return API[storageEngines[i]].getValue.apply(API[storageEngines[i]], arguments);
		} catch(e){}
	}
	return def;
}

/**
 * Set a value in the default storage engine (see [Storage configuration]{@link jMod.Config})
 * @function setValue
 * @memberof jMod
 * @param {string} key - name
 * @param {string|boolean|number} [value] - value to be set
 * @see jMod.API.localStorage
 * @see jMod.API.sessionStorage
 * @see jMod.API.GM_Storage
 */
jMod.setValue = function(key){
	var i = 0, storageEngines = storageEngineOrder();
	for(; i < storageEngines.length; i++){
		try{
			return API[storageEngines[i]].setValue.apply(API[storageEngines[i]], arguments);
		} catch(e){}
	}
}

/**
 * Get a JSON object from the default storage engine (see [Storage configuration]{@link jMod.Config})
 * @function getJSON
 * @memberof jMod
 * @param {string} key - name
 * @param {object} [def] - default value to return if key does not exist
 * @see jMod.API.localStorage
 * @see jMod.API.sessionStorage
 * @see jMod.API.GM_Storage
 */
jMod.getJSON = function(key, def){
	var i = 0, storageEngines = storageEngineOrder();
	for(; i < storageEngines.length; i++){
		try{
			return API[storageEngines[i]].getJSON.apply(API[storageEngines[i]], arguments);
		} catch(e){}
	}
	return def;
}

/**
 * Set an object in the default storage engine (see [Storage configuration]{@link jMod.Config})
 * @function setJSON
 * @memberof jMod
 * @param {string} key - name
 * @param {string|boolean|number} [value] - value to be set
 * @see jMod.API.localStorage
 * @see jMod.API.sessionStorage
 * @see jMod.API.GM_Storage
 */
jMod.setJSON = function(key){
	var i = 0, storageEngines = storageEngineOrder();
	for(; i < storageEngines.length; i++){
		try{
			return API[storageEngines[i]].setJSON.apply(API[storageEngines[i]], arguments);
		} catch(e){}
	}
}

/**
 * Delete a value from the default storage engine (see [Storage configuration]{@link jMod.Config})
 * @function deleteValue
 * @memberof jMod
 * @param {string} key - name to be deleted
 * @see jMod.API.localStorage
 * @see jMod.API.sessionStorage
 * @see jMod.API.GM_Storage
 */
jMod.deleteValue = function(key){
	var i = 0; storageEngines = storageEngineOrder();
	for(; i < storageEngines.length; i++){
		try{
			return API[storageEngines[i]].deleteValue.apply(API[storageEngines[i]], arguments);
		} catch(e){}
	}
}

})();

	
	/***********************************
	 ** Get Resource
	 **********************************/
// http://stackoverflow.com/questions/8778863/downloading-an-image-using-xmlhttprequest-in-a-userscript
function customBase64Encode(inputStr) {
	var
		bbLen			   = 3,
		enCharLen		   = 4,
		inpLen			  = inputStr.length,
		inx				 = 0,
		jnx,
		keyStr			  = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
							+ "0123456789+/=",
		output			  = "",
		paddingBytes		= 0;
	var
		bytebuffer		  = new Array (bbLen),
		encodedCharIndexes  = new Array (enCharLen);

	while (inx < inpLen) {
		for (jnx = 0;  jnx < bbLen;  ++jnx) {
			/*--- Throw away high-order byte, as documented at:
			  https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
			*/
			if (inx < inpLen)
				bytebuffer[jnx] = inputStr.charCodeAt (inx++) & 0xff;
			else
				bytebuffer[jnx] = 0;
		}

		/*--- Get each encoded character, 6 bits at a time.
			index 0: first  6 bits
			index 1: second 6 bits
						(2 least significant bits from inputStr byte 1
						 + 4 most significant bits from byte 2)
			index 2: third  6 bits
						(4 least significant bits from inputStr byte 2
						 + 2 most significant bits from byte 3)
			index 3: forth  6 bits (6 least significant bits from inputStr byte 3)
		*/
		encodedCharIndexes[0] = bytebuffer[0] >> 2;
		encodedCharIndexes[1] = ( (bytebuffer[0] & 0x3) << 4)   |  (bytebuffer[1] >> 4);
		encodedCharIndexes[2] = ( (bytebuffer[1] & 0x0f) << 2)  |  (bytebuffer[2] >> 6);
		encodedCharIndexes[3] = bytebuffer[2] & 0x3f;

		//--- Determine whether padding happened, and adjust accordingly.
		paddingBytes		  = inx - (inpLen - 1);
		switch (paddingBytes) {
			case 1:
				// Set last character to padding char
				encodedCharIndexes[3] = 64;
				break;
			case 2:
				// Set last 2 characters to padding char
				encodedCharIndexes[3] = 64;
				encodedCharIndexes[2] = 64;
				break;
			default:
				break; // No padding - proceed
		}

		/*--- Now grab each appropriate character out of our keystring,
			based on our index array and append it to the output string.
		*/
		for (jnx = 0;  jnx < enCharLen;  ++jnx)
			output += keyStr.charAt ( encodedCharIndexes[jnx] );
	}
	return output;
}

jMod.API.getRemoteImageAsURL = function(url, mime, callback){
	if(_undefined==typeof GM_xmlhttpRequest)
		return;
	var mimePatt = /Content-Type:\s*([^\s]+)/i;
	if(typeof mime === "function" && _undefined===typeof callback){
		callback = mime;
		mime = undefined;
	}
	return GM_xmlhttpRequest({
		method: "GET",
		url: url,
		overrideMimeType: 'text/plain; charset=x-user-defined',
		onload: function(response){
			if(_undefined==typeof mime || mime == null || mime == ''){
				try{
					var rMime = mimePatt.exec(response.responseHeaders);
					if(rMime && rMime.length > 1)
						mime = rMime[1].trim();
				}catch(e){}
			}
			callback('data:'+(mime && mime != '' ? mime : 'image/png')+';base64,' + customBase64Encode(response.responseText));
		}
	});
}

jMod.API.getResourceText = function(name, callback, useLiveOnFail){
	if(_undefined!==typeof GM_getResourceText){
		try {
			var tmp = GM_getResourceText(name);
			if(callback) callback(tmp);
			return tmp;
		} catch(e) {}
	}
	if(useLiveOnFail)
		return jMod.API.getResourceTextLive(name, callback);
}

jMod.API.getResourceURL = function(name, callback, useLiveOnFail){
	if(_undefined!==typeof GM_getResourceURL){
		try {
			var tmp = GM_getResourceURL(name);
			if(callback) callback(tmp);
			return tmp;
		} catch(e) {}
	}
	if(useLiveOnFail)
		return jMod.API.getResourceURLLive(name, callback);
}

jMod.API.getResourceTextLive = function(name, callback){
	if(_undefined==typeof GM_xmlhttpRequest)
		return;
	var resourceObj = jConfig('script.script_info.resource');
	if(resourceObj && _undefined!==typeof resourceObj[name]){
		return GM_xmlhttpRequest({
			method: "GET",
			url: resourceObj[name],
			onload: function(response){
				callback(response.responseText);
			}
		});
	}
}



jMod.API.getResourceURLLive = function(name, callback){
	var resourceObj = jConfig('script.script_info.resource');
	if(resourceObj && _undefined!==typeof resourceObj[name]){
		return jMod.API.getRemoteImageAsURL(resourceObj[name], callback);
	}
}

jMod.API.addResourceCSS = function(name){
	if(!jMod.API.getResourceText(name, function(result){if(typeof result === "string" && result != '') jMod.CSS = result;}, false)){
		var resourceObj = jConfig('script.script_info.resource');
		if(resourceObj && _undefined!==typeof resourceObj[name]){
			jMod.API.addStylesheet(resourceObj[name]);
		}
	}
}

jMod.API.addResourceScript = function(name){
	if(!jMod.API.getResourceText(name, function(result){if(typeof result === "string" && result != ''){jMod.API.addScript({js: result});}}, false)){
		var resourceObj = jConfig('script.script_info.resource');
		if(resourceObj && _undefined!==typeof resourceObj[name]){
			jMod.API.addScript({src: resourceObj[name], async: true, defer: true});
		}
	}
}
/*
function getResourceTest(){
	console.log('getResourceText', jMod.API.getResourceText('jmodicon'));
	
	console.log('getResourceURL', jMod.API.getResourceURL('jmodicon'));
	
	//jMod.API.getResourceTextLive('jmodicon', function(response){
		//console.log('getResourceTextLive', response);
	//});
	
	jMod.API.getResourceURLLive('jmodicon', function(response){
		console.log('getResourceURLLive', response);
		var img = new Image();
		document.body.appendChild(img);
		img.src = response;
	});
}

setTimeout(getResourceTest, 500);
*/

	
	/***********************************
	 ** Date
	 **********************************/
/**
 * @name jMod.API.Date
 * @memberOf! jMod.API
 * @namespace jMod.API.Date
 * @since 0.0.14
 */
/**
 * (jMod.API.Date) Date API function for calling other date related functions
 * @function jMod.API.Date
 * @memberOf! jMod.API
 * @variation 2
 * @param {string} command Function name to be called
 * @param {...object} args Arguments to be passed to the function
 */
jMod.API.Date = function(command, args){
	switch(command){
		case 'parseUTC':
		case 'parseUTCDate':
			return jMod.API.Date.parseUTCDate.apply(jMod.API.Date, Slice.call(arguments, 1));
	}
}

Object.defineProperties(jMod.API.Date, {
	/**
	 * Returns the current time
	 * @memberOf! jMod.API.Date
	 * @member {object} jMod.API.Date.now date object in the local time-zone
	 */
	"now": {get: function(){return Date.now();}},
});

/**
 * Parses the UTC date returned when doing an update check (meta key: scriptUploadTimestamp)
 * @function jMod.API.Date.parseUTCDate
 * @memberOf! jMod.API.Date
 * @param {string|date} value date to parse
 * @return {object} date object in the local time-zone
 */
jMod.API.Date.parseUTCDate = function(value){
	if(typeof value === "string"){
		var a = /^(\d{4})[\-\/](\d{2})[\-\/](\d{2})(?:T|\s)(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z?$/i.exec(value);

		if (a) {
			return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
		}
	} else if(RealTypeOf(value) == "date"){
		return new Date(value);
	}

	return null;
}
/**
 * @typedef TimeDiff
 * @type {object}
 * @property {object} date          Date object
 * @property {object} now           Current Date Object
 * @property {number} milliseconds  Milliseconds since date
 * @property {number} minutes       Minutes since date
 * @property {number} hours         Hours since date
 * @property {number} days          Days since date
 */
/**
 * Get the time since the last update (meta key: scriptUploadTimestamp)
 * @function jMod.API.Date.getScriptTimeDiff
 * @memberOf! jMod.API.Date
 * @param {(string|object)} dateObj date string or object returned by update request
 * @return {TimeDiff}
 */
jMod.API.Date.getScriptTimeDiff = function(dateObj){
	var tDate;
	if(typeof dateObj === "string")
		tDate = jMod.API.Date.parseUTCDate(dateObj);
	else if(typeof dateObj === "object" && typeof dateObj.scriptUploadTimestamp !== _undefined)
		tDate = jMod.API.Date.parseUTCDate(dateObj.scriptUploadTimestamp);
	if(!tDate) return null;
	
	var nowDate = Date.now();
	
	var milliseconds = Math.abs(nowDate - tDate);
	var minutes = milliseconds / 1000 / 60;
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
}

	
	/***********************************
	 ** jQuery Ajax Extensions
	 **********************************/
/**
 * @namespace jQueryExtensions
 * @memberof jMod
 */
jMod.jQueryExtensions = {};

+(function(){

jMod.jQueryExtensions.CrossOriginSupportTransportFn = function(_jQueryObj, dataType){
	return (function(options, originalOptions, jqXHR){
		var CrossOriginEnabled = true;
		try{
			// jMod may no longer be in scope
			CrossOriginEnabled = jMod.Config('jQueryExtensions.CrossOrigin');
		}catch(e){}
		
		if(_undefined!=typeof GM_xmlhttpRequest&&CrossOriginEnabled){
			var extend = (_jQueryObj || $ || jMod).extend,
				mergedOptions = extend(true, {}, options, originalOptions),
				// Translate jQuery jqXHR options to GM options (there are some subtle differences)
				optionMap = {
					context: 'context',
					overrideMimeType: 'overrideMimeType',
					timeout: 'timeout',
					username: 'user', // "username" is "user " when using GM_xmlhttpRequest
					password: 'password',
					onreadystatechange: 'onreadystatechange', // GM Specific option
					ontimeout: 'ontimeout', // GM Specific option
					onprogress: 'onprogress', // GM Specific option
					binary: 'binary' // GM Specific option
				};
			return {
				send: function(headers, callback){
						// 
					var origType = (originalOptions.dataType || '').toLowerCase(),
						gm_request_options = {
							method: options.type || "GET",
							url: options.url,
							// Shallow clone of data from both options
							data: extend({}, options.data || {}, originalOptions.data || {}),
							headers: headers,
							onload: function(response){
								// Done response
								var dResponse = {text: response.responseText},
									rContentType = '',
									key;
									
								try{
									// Try to extract the content type from the response headers
									rContentType = (/Content-Type:\s*([^\s]+)/i.exec(response.responseHeaders))[1];
								}catch(e){}
								
								// HTML
								if(origType === 'html' || /text\/html/i.test(rContentType)) {
									dResponse.html = response.responseText;
									
								// JSON
								} else if(origType === 'json' || (origType !== 'text' && /\/json/i.test(rContentType))){
									try{
										dResponse.json = $.parseJSON(response.responseText);
									}catch(e){}
									
								// XML
								} else if(origType == 'xml' || (origType !== 'text' && /\/xml/i.test(rContentType))){
									if(response.responseXML){
										// Use XML response if it exists
										dResponse.xml = response.responseXML;
									} else {
										// Use DOM parser if it doesn't exist
										try{dResponse.xml = new DOMParser().parseFromString(response.responseText, "text/xml");}catch(e){}
									}
								}
								
								callback(200, "success", dResponse, response.responseHeaders);
							},
							onerror: function(response){
								callback(404, "error", {text: response.responseText}, response.responseHeaders);
							}
						};
					// Map options
					for(key in optionMap){
						if(_undefined!=typeof mergedOptions[key]){
							gm_request_options[optionMap[key]] = mergedOptions[key];
						}
					}
					// If async option if false, enable synchronous option
					if(mergedOptions.async === false)
						gm_request_options.synchronous = true;
					// Send request
					GM_xmlhttpRequest(gm_request_options);
				},
				abort: function() {
					// No abort support
				}
			};
		}
	});
}

function exportjQueryTransportFn(_jQueryObj, dataType){
	return ((unsafeWindow.globaljQueryCrossOriginSupportFn) || (jMod.jQueryExtensions._globaljQueryCrossOriginSupportFn = mExportFunction(jMod.jQueryExtensions.CrossOriginSupportTransportFn(_jQueryObj, dataType), unsafeWindow, {
		defineAs: 'globaljQueryCrossOriginSupportFn',
		allowCallbacks: true,
		allowCrossOriginArguments: true
	})));
}

/**
 * Adds Cross Origin support to a jQuery instance by allowing it to use GM_xmlhttpRequest.
 * @function addCrossOriginSupport
 * @memberof jMod.jQueryExtensions
 * @param {object} [_jQueryObj] - jQuery object - Defaults to first jQuery instance accessible by jMod
 * @param {string} [dataType="* text html xml json"] - A string identifying the data types GM_xmlhttpRequest should handle
 * @example
 *if($){
 *	$(document).ready(function() {
 *		function test_jQueryFunctions(){
 *			jMod.jQueryExtensions.addCrossOriginSupport($);
 *			
 *			// Test $.ajax()
 *			console.log('Test $.ajax("http://google.com")');
 *			$.ajax({
 *					url: 'http://google.com',
 *					contentType: 'text/html',
 *					type: 'GET',
 *					dataType: 'html',
 *					onprogress: function(response){
 *						console.log('onprogress response', response);
 *					},
 *					onreadystatechange: function(response){
 *						console.log('onreadystatechange response', response);
 *					}
 *				})
 *				.done(function(data, textStatus, jqXHR) {
 *					console.log("$.ajax() success: ", jqXHR);
 *				})
 *				.fail(function() {
 *					console.log("$.ajax() error");
 *				});
 *			
 *			// Test $(element).load()
 *			console.log('Test $(element).load("http://google.com #hplogo")');
 *			var tmpDiv = document.createElement('div');
 *			tmpDiv.id = 'tmpDiv';
 *			document.body.appendChild(tmpDiv);
 *			
 *			$('#tmpDiv').load('http://google.com #hplogo', function(responseText, textStatus, jqXHR){
 *				console.log('$(element).load() ' + textStatus, jqXHR);
 *			});
 *		}
 *
 *		test_jQueryFunctions();
 *	});
 *} else {
 *	console.log('Test Failed! No jQuery');
 *}
 */
jMod.jQueryExtensions.addCrossOriginSupport = function(_jQueryObj, dataType){
	// Make sure GM function exists
	if(_undefined==typeof GM_xmlhttpRequest)
		return;
	
	// If _jQueryObj isn't defined, default to global jQuery object
	if(!_jQueryObj && !(_jQueryObj = jMod.jQuery))
		// Return if there is no global jQuery object
		return;
	
	// Return if already extended
	if(_jQueryObj.jModCrossOriginSupport === true)
		return;
	
	_jQueryObj.ajaxTransport(dataType || "* text html xml json", jMod.jQueryExtensions.CrossOriginSupportTransportFn(_jQueryObj, dataType));
	
	_jQueryObj.extend({jModCrossOriginSupport: true});
}

/**
 * Similar to addCrossOriginSupport, but exports the transport function to the unsafeWindow before extending jQuery. Thus, it can be used on a jQuery instance that exists in the unsafeWindow. This is less safe than using "addCrossOriginSupport" and should only be used if there is no alternative.
 * @function exportCrossOriginSupport
 * @memberof jMod.jQueryExtensions
 * @param {object} [_jQueryObj] - jQuery object - Defaults to first jQuery instance accessible by jMod
 * @param {string} [dataType="* text html xml json"] - A string identifying the data types GM_xmlhttpRequest should handle
 */
jMod.jQueryExtensions.exportCrossOriginSupport = function(_jQueryObj, dataType){
	// Make sure GM function exists
	if(_undefined==typeof GM_xmlhttpRequest)
		return;
	
	// If _jQueryObj isn't defined, exit
	if(!_jQueryObj)
		return;
	
	// Return if already extended
	if(_jQueryObj.jModCrossOriginSupport === true)
		return;
	
	_jQueryObj.ajaxTransport(dataType || "* text html xml json", exportjQueryTransportFn(_jQueryObj, dataType));
	
	_jQueryObj.extend({jModCrossOriginSupport: true});
}
})()

	
	/***********************************
	 ** jQuery Selector Extensions
	 **********************************/
+(function(){

	var Selectors = jMod.jQueryExtensions.Selectors = function(_jQueryObj, name){
		if(!_jQueryObj)
			return;
		var i;
		if(arguments.length == 1){
			for(i in Selectors.ext)
				Selectors[i](_jQueryObj);
			return;
		}
		
		for(i = 1; i < arguments.length; i++){
			if(_undefined!=typeof Selectors.ext[arguments[i]]){
				Selectors.ext[arguments[i]](_jQueryObj);
			}
		}
	}
	
	Selectors.ext = {};

	// Check if element is visible in the viewport:
	Selectors.ext.inView = function(_jQueryObj){
		if(_jQueryObj && !_jQueryObj.expr[':'].inView){
			_jQueryObj.extend(_jQueryObj.expr[':'],{
				inView: function(a) {
					win = window || unsafeWindow;
					doc = document || win.document;
					var scrollTop = (doc.documentElement.scrollTop || doc.body.scrollTop),
						offsetTop = _jQueryObj(a).offset().top,
						windowHeight = (win.innerHeight && win.innerHeight < _jQueryObj(win).height()) ? win.innerHeight : _jQueryObj(win).height();
					return offsetTop > scrollTop && (_jQueryObj(a).height() + offsetTop) < (scrollTop + windowHeight);
				}
			});
		}
	}
	

})()

	/***********************************
	 ** jQuery Tokenizer Extension
	 **********************************/
+(function(){

	var nextRegex = /^\s*((?:(?:\:\w+\([^\)]+\))|[^\s\<\>\~\+\|]|[\<\>\~\+\|\^\$\*](?=\=.+\]))+)\s*(.*?)$/;

	function getNext(str){
		if(!str || str.length < 3){
			return [str || ''];
		}
		
		var m = nextRegex.exec(str);
		
		return (m ? [m[1].trim(), m[2].trim()] : [str]);
	}
	
	/**
	 * Extend more than just jQuery's (aka sizzle) pseudo-selectors (ex ".class:selector"). With this you can
	 * completely override the main jQuery find function with a custom tokenizer. You can augment, or completely
	 * replace the default selector syntax.<br /><br />
	 * For example, you could add the token "++" to select all of an element's siblings that match a selector: $(".example ++ .sibling-class") or $(".example ++ *")<br />
	 * Or you could add "+>" and "+<" to match siblings that appear before and after the matched elements: $(".example +> .next-sibling") or $(".example +< .prev-sibling")<br />
	 * @function extendTokenizer
	 * @memberof jMod.jQueryExtensions
	 * @param {object} [_jQueryObj=jMod.jQuery] - jQuery object
	 * @example
	 * console.log('Test jQuery Tokenizer');
	 * var newEl = jMod.Element.createNewElement({
	 * 	id: 'testElement',
	 * 	innerHTML: [
	 * 		{
	 * 			className: 'tc1',
	 * 			innerHTML: [
	 * 				{
	 * 					className: 'tc1-1 childElement-1'
	 * 				},
	 * 				{
	 * 					className: 'tc1-2 childElement-1'
	 * 				},
	 * 				{
	 * 					className: 'tc1-3 childElement-1',
	 * 					innerHTML: {
	 * 						className: 'tc1-3-1 childElement-2',
	 * 						innerHTML: {
	 * 							className: 'tc1-3-1-1 childElement-3'
	 * 						}
	 * 					}
	 * 				}
	 * 			]
	 * 		},
	 * 		{
	 * 			className: 'tc2',
	 * 			innerHTML: [
	 * 				{
	 * 					className: 'tc2-1 childElement-1'
	 * 				},
	 * 				{
	 * 					className: 'tc2-3 childElement-1'
	 * 				}
	 * 			]
	 * 		},
	 * 		{
	 * 			className: 'tc3',
	 * 			innerHTML: [
	 * 				{
	 * 					className: 'tc3-1 childElement-1'
	 * 				}
	 * 			]
	 * 		}
	 * 	]
	 * });
	 * 
	 * document.body.appendChild(newEl);
	 * 
	 * console.log('Add Tokenizer');
	 * jMod.jQueryExtensions.extendTokenizer($);
	 * 
	 * console.log('Add Sibling Tokens');
	 * jMod.jQueryExtensions.addSiblingTokens($);
	 * 
	 * console.log("jQuery Find Function:");
	 * console.dir($.find);
	 * 
	 * // Test 1
	 * var test1 = $(".tc1-2 + .tc1-3");
	 * console.log('test: sibling matching ".tc1-3"', test1, test1.length == 1 ? "Pass!" : "Fail!");
	 * 
	 * // Test 2
	 * var test2 = $(".tc1-2 ++ *");
	 * console.log('test: all siblings', test2, test2.length == 2 ? "Pass!" : "Fail!");
	 * 
	 * // Test 3
	 * var test3 = $(".tc1-2 +< *");
	 * console.log('test: all previous siblings', test3, test3.length == 1 ? "Pass!" : "Fail!");
	 * 
	 * // Test 4
	 * var test4 = $(".tc1-2 +> *");
	 * console.log('test: all next siblings', test4, test4.length == 1 ? "Pass!" : "Fail!");
	 * 
	 * // Test 5
	 * var test5 = $(".tc1-2 ++ * .childElement-3");
	 * console.log('test: child of sibling with class name "childElement-3"', test5, test5.length == 1 ? "Pass!" : "Fail!");
	 * 
	 * // Test 6
	 * var test6 = $(".tc3 ++ * .childElement-1");
	 * console.log('test: child of sibling with class name "childElement-1"', test6, test6.length == 5 ? "Pass!" : "Fail!");
	 * 
	 * console.log('End Test jQuery Tokenizer');
	 */
	jMod.jQueryExtensions.extendTokenizer = function(_jQueryObj){
		if (
				(
					!_jQueryObj && // If no jQuery object, try to use global jQuery object
					!(_jQueryObj = jMod.jQuery) // If no global jQuery object, return
				) ||
				_undefined!=typeof _jQueryObj.jModTokenizer // if already extended, return
			) return;
		
		// Copy the old find function
		_jQueryObj._oldFindFn = _jQueryObj.find;
		
		// Replace the jQuery (aka sizzle) find function
		_jQueryObj.find = function(selector, context, results, seed){
			// reset context if undefined
			context = context || document || unsafeWindow.document;
			
			// new results array if results is undefined
			results = results || [];

			// If custom tokenizer is enabled, and if a custom token is detected in the selector
			if(_jQueryObj.jModTokenizer && _jQueryObj.find.jModTokens.regexTest.test(selector)){
				var i, j, x, t,
					firstToken, parts, ctx, tmp,
					next, tokenResults;
				// Split selector into individual pieces, and loop them
				parts = selector.split(',');
				for(x = 0; x < parts.length; x++){
					// Retest the piece for a custom token
					if(
							_jQueryObj.find.jModTokens.regexTest.test(parts[x]) &&
							(
								(firstToken = _jQueryObj.find.jModTokens.regex.exec(parts[x])[1]) && // Extract the token
								(t = _jQueryObj.find.jModTokens.tokens[firstToken]) // Get the token's handler functions
							)
						){
						
						// Split the selector piece into two pieces where the token was found
						tmp = parts[x].split(firstToken, 2);
						// Find the first half of the selector in the old find function to get the new context
						ctx = _jQueryObj._oldFindFn(tmp[0], context);
						if(ctx && ctx.length > 0){
							// Loop through all the returned objects
							for(i = 0; i < ctx.length; i++){
								if(t.find){
									// get the next piece of the selector
									next = getNext(tmp[1]);
									
									// if next if empty or is the final selector in the series,
									// use the token's custom find function as the results
									if(next.length == 1 || next[1] == '')
										t.find(tmp[1], ctx[i], results, seed);
									else {
										tokenResults = t.find(next[0], ctx[i]);
										// Use the token results as the context for the final call to
										// the jQuery find function (this allows additional tokens to
										// be handled)
										for(j = 0; j < tokenResults.length; j++){
											_jQueryObj.find(next[1], tokenResults[j], results, seed);
										}
									}
								} else {
									_jQueryObj.find(tmp[1], ctx[i], results, seed);
								}
							}
						}
						
					} else {
						_jQueryObj._oldFindFn(parts[x], context, results, seed);
					}
				}
				return results;
			}
			// return normal results if no custom tokens are found
			return _jQueryObj._oldFindFn(selector, context, results, seed);
		}
		
		// Copy all properties from the original find function to this one
		for(i in _jQueryObj._oldFindFn){
			_jQueryObj.find[i] = _jQueryObj._oldFindFn[i];
		}
		
		var restrictedTokens = ",.";
		
		_jQueryObj.find.jModTokens = {
			tokens: {},
			
			tokenOrder: [],
			
			sortOrder: function(a, b){
				return (a.length > b.length ? -1 : (a.length < b.length ? 1 : 0));
			},
			
			_regex: null,
			_regexTest: null,
			
			add: function(token, data){
				if(restrictedTokens.indexOf(token) != -1)
					return;
				var jModTokens = _jQueryObj.find.jModTokens;
				jModTokens._regex = null; // Clear regex
				jModTokens._regexTest = null; // Clear regexText
				jModTokens.tokens[token] = data;
				jModTokens.tokenOrder.push(token);
				jModTokens.tokenOrder.sort(this.sortOrder);
			},
			
			remove: function(token){
				var jModTokens = _jQueryObj.find.jModTokens;
				if(jModTokens.tokens[token]){
					delete jModTokens.tokens[token];
					jModTokens._regex = null; // Clear regex
					jModTokens._regexTest = null; // Clear regexText
					jModTokens.tokenOrder.splice(jModTokens.tokenOrder.indexOf(token), 1);
					jModTokens.tokenOrder.sort(this.sortOrder);
				}
			},
			
			removeAll: function(){
				var jModTokens = _jQueryObj.find.jModTokens;
				jModTokens.tokens[token] = {};
				jModTokens.tokenOrder = [];
				jModTokens._regex = null; // Clear regex
				jModTokens._regexTest = null; // Clear regexText
			}
		}
		
		function convertTokensToRegex(tokens){
			return tokens.join("|") // Escape any special characters for regex
					.replace(/\./g, "\\.")
					.replace(/\+/g, "\\+")
					.replace(/\</g, "\\<")
					.replace(/\>/g, "\\>")
					.replace(/\)/g, "\\)")
					.replace(/\(/g, "\\(");
		}
		
		Object.defineProperty(_jQueryObj.find.jModTokens, "regex", {
			get: function(){
				// Return stored regex if it exists
				if(_jQueryObj.find.jModTokens._regex)
					return _jQueryObj.find.jModTokens._regex;
					
				var tokens = convertTokensToRegex(_jQueryObj.find.jModTokens.tokenOrder);
				_jQueryObj.find.jModTokens._regex = new RegExp("(" + tokens + ")");
				
				return _jQueryObj.find.jModTokens._regex;
			}
		});
		
		Object.defineProperty(_jQueryObj.find.jModTokens, "regexTest", {
			get: function(){
				// Return stored regex test if it exists
				if(_jQueryObj.find.jModTokens._regexTest)
					return _jQueryObj.find.jModTokens._regexTest;
					
				var tokens = convertTokensToRegex(_jQueryObj.find.jModTokens.tokenOrder);
				_jQueryObj.find.jModTokens._regexTest = new RegExp("(?:^|[^\\.])(" + tokens + ")(?:[\\s\\.\\#\\w\\*\\:]|$)");
				
				return _jQueryObj.find.jModTokens._regexTest;
			}
		});
		
		_jQueryObj.extend({jModTokenizer: true});
		
		return _jQueryObj;
	}
	
	/**
	 * Adds custom sibling selectors <b>++</b>, <b>+&#62;</b> and <b>+&#60;</b> to the given jQuery instance.
	 * @function addSiblingTokens
	 * @memberof jMod.jQueryExtensions
	 * @param {object} [_jQueryObj=jMod.jQuery] - jQuery object
	 */
	jMod.jQueryExtensions.addSiblingTokens = function(_jQueryObj){
		if (
				(
					!_jQueryObj && // If no jQuery object, try to use global jQuery object
					!(_jQueryObj = jMod.jQuery) // If no global jQuery object, return
				) ||
				_undefined==typeof _jQueryObj.find.jModTokens // if not extended, return
			) return;
		
		// All Siblings
		_jQueryObj.find.jModTokens.add("++", {
			find: function(selector, context, results, seed){
				results = results || [];
				var i = 0, sibs = _jQueryObj(context).siblings(selector);
				if(sibs)
					for( ; i < sibs.length; i++)
						if(results.indexOf(sibs[i]) == -1)
							results.push(sibs[i]);
				return results;
			}
		});
		
		// All Proceeding Siblings
		_jQueryObj.find.jModTokens.add("+>", {
			find: function(selector, context, results, seed){
				results = results || [];
				var i = 0, sibs = _jQueryObj(context).nextAll(selector);
				if(sibs)
					for( ; i < sibs.length; i++)
						if(results.indexOf(sibs[i]) == -1)
							results.push(sibs[i]);
				return results;
			}
		});
		
		// All Previous Siblings
		_jQueryObj.find.jModTokens.add("+<", {
			find: function(selector, context, results, seed){
				results = results || [];
				var i = 0, sibs = _jQueryObj(context).prevAll(selector);
				if(sibs)
					for( ; i < sibs.length; i++)
						if(results.indexOf(sibs[i]) == -1)
							results.push(sibs[i]);
				return results;
			}
		});
		
		
	}
	
	/**
	 * Removes the jMod tokenizer extension from the given jQuery instance.
	 * @function removeTokenizer
	 * @memberof jMod.jQueryExtensions
	 * @param {object} [_jQueryObj=jMod.jQuery] - jQuery object
	 */
	jMod.jQueryExtensions.removeTokenizer = function(_jQueryObj){
		if (
				(
					!_jQueryObj && // If no jQuery object, try to use global jQuery object
					!(_jQueryObj = jMod.jQuery) // If no global jQuery object, return
				) ||
				_undefined==typeof _jQueryObj.jModTokenizer // if not extended, return
			) return;
		
		// Remove enable/disable property
		delete _jQueryObj.jModTokenizer;
		
		// Restore original function
		_jQueryObj.find = _jQueryObj._oldFindFn;
		
		// Remove "_oldFindFn"
		_jQueryObj._oldFindFn = undefined;
		delete _jQueryObj._oldFindFn;
		
		return _jQueryObj;
	}


})()
	
	/***********************************
	 ** Scrollbar
	 **********************************/
// Based on http://enscrollplugin.com/
+(function(){
	
	jMod.Scrollbar = function(el, data){
		jMod.Scrollbar.addScrollBar(el, data);
	}
	
	jMod.Scrollbar.addScrollBar = function(el, data){
		if(!isElement(el))
			return;
			
		var newScrollBar = {
			type: 'div',
			className: 'jModScrollBar',
			style: {
				position: 'absolute',
				//zIndex: '1',
				margin: '0px',
				padding: '0px',
				//opacity: '0',
				display: 'block',
				top: '0px'
			},
			innerHTML: {
				type: 'div',
				className: 'enscroll-track track3',
				style: {
					position: 'relative'
				},
				innerHTML: {
					type: 'div',
					className: 'handle3',
					style: {
						position: 'absolute'
					},
					innerHTML: [
						{
							type: 'div',
							className: 'top',
						},
						{
							type: 'div',
							className: 'bottom',
						}
					],
					attributes: {
						href: ''
					}
				}
			}
		};
		
		var newScrollBarEl = createNewElement(newScrollBar);
		
		//jMod.Scrollbar.addResizeListener(el, function(){
		jMod.Element.addResizeListener(el, function(){
			console.log('Element Resized');
			jMod.Scrollbar.resizeScrollBar(this);
		});
		
		appendChild(el, newScrollBarEl);
		jMod.Scrollbar.resizeScrollBar(el);
		
		var _onWheelFn = function(e){
			//jMod.Scrollbar.handlers.target_onScroll(this);
			//console.log('mousewheel', this, e);
			jMod.Scrollbar.handlers.target_onScroll.call(this, e);
			//jMod.Scrollbar.resizeScrollBar.call(this, this, e);
		}
		
		//if (el.addEventListener) {
			// Firefox
		if ( 'onwheel' in el || 'WheelEvent' in window && navigator.userAgent.toLowerCase().indexOf( 'msie' ) >= 0 ) {
			addEventListener(el, "wheel", _onWheelFn, false);
		} else {
			// IE9, Chrome, Safari, Opera
			addEventListener(el, "mousewheel", _onWheelFn, false);
		}
			
		//}
		// IE 6/7/8
		//else el.attachEvent("onmousewheel", _onWheelFn);
		
		var trackEl = jMod.$('.enscroll-track', newScrollBarEl);
		var handleEl = jMod.$('.handle3', newScrollBarEl);
		
		var _mouseDownFn = function(e){
			console.log('mousedown', this, e);
			//jMod.Scrollbar.handlers.track_handle_onMouseDown.call(this, e);
			//startVerticalDrag.call(this, e);
			startDragging(e, this);
		};
		setDraggableListeners(handleEl);
		handleEl.whenDragging(function(args){
			console.log('whenDragging args', args, this);
			//var trackEl = findParentWithClass(args.el, 'enscroll-track');
			var scrollbarEl = findParentWithClass(args.el, 'jModScrollBar');
			var target = scrollbarEl.parentElement;
			
			
			
		});
		addEventListener(handleEl, "mousedown", _mouseDownFn, false);
		
		addEventListener(handleEl, "touchstart", function(e){
			console.log('touchstart', e);
		}, false);
		
		el.onscroll = function(e){
			if(!hasClass(trackEl, 'dragging'))
				jMod.Scrollbar.resizeScrollBar(this);
		}
	}
	
	var currentElement;
	var fairlyHighZIndex = '10';
	
	function inPixels(value) {
		return value + 'px';
	}
	
	function addListener(element, type) {
		return function(listener) {
			element.draggableListeners[type].push(listener);
		};
	}
	
	function getInitialPosition(element) {
		//var boundingClientRect = element.getBoundingClientRect();
		return {
			//top: boundingClientRect.top,
			//left: boundingClientRect.left
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
		element.whenDragStarts = addListener(element, 'start');
		element.whenDragging = addListener(element, 'drag');
		element.whenDragStops = addListener(element, 'stop');
	}

	function startDragging(event, element) {
		//currentElement && sendToBack(currentElement);
		//currentElement = bringToFront(element);
		currentElement = element;
		
		//addClass(currentElement, 'dragging');
		var trackEl = findParentWithClass(currentElement, 'enscroll-track');
		if(trackEl){
			addClass(trackEl, 'dragging');
		}

		var initialPosition = getInitialPosition(currentElement);
		//currentElement.style.left = inPixels(initialPosition.left);
		currentElement.style.top = inPixels(initialPosition.top);
		currentElement.lastXPosition = event.clientX;
		currentElement.lastYPosition = event.clientY;

		var okToGoOn = triggerEvent('start', { x: initialPosition.left, y: initialPosition.top, el: currentElement, mouseEvent: event });
		if (!okToGoOn) return;

		addDocumentListeners();
	}
	
	function triggerEvent(type, args) {
		var result = true;
		var listeners = currentElement.draggableListeners[type];
		for (var i = listeners.length - 1; i >= 0; i--) {
		  if (listeners[i](args) === false) result = false;
		};
		return result;
	}
	
	function addDocumentListeners() {
		var doc = jMod.Element.document;
		addEventListener(doc,'selectstart', cancelDocumentSelection);
		addEventListener(doc,'mousemove', repositionElement);
		addEventListener(doc,'mouseup', removeDocumentListeners);
	}
	
	function removeDocumentListeners(event) {
		var doc = jMod.Element.document;
		removeEventListener(doc,'selectstart',cancelDocumentSelection);
		removeEventListener(doc,'mousemove',repositionElement);
		removeEventListener(doc,'mouseup',removeDocumentListeners);

		var left = parseInt(currentElement.style.left, 10);
		var top = parseInt(currentElement.style.top, 10);
		var trackEl = findParentWithClass(currentElement, 'enscroll-track');
		if(trackEl){
			removeClass(trackEl, 'dragging');
		}
		triggerEvent('stop', { x: left, y: top, el: currentElement, mouseEvent: event });
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
		
		var scrollBarEl = findParentWithClass(currentElement, 'jModScrollBar');
		
		if(scrollBarEl){
			var parentEl = scrollBarEl.parentElement;
			var computedEl = window.getComputedStyle(parentEl),
				height = parseFloat(computedEl.height),
				width = parseFloat(computedEl.width);
				
			var computedCurrentEl = window.getComputedStyle(currentElement),
				cheight = parseFloat(computedCurrentEl.height),
				cwidth = parseFloat(computedCurrentEl.width);
				
			var scrollMax = parseFloat(parentEl.scrollHeight) - height;
			
			
			if(parseInt(elementNewYPosition) + cheight > height){
				elementNewYPosition = height - cheight;
			} else if(parseInt(elementNewYPosition) < 0){
				elementNewYPosition = 0;
			}
		}

		//style.left = inPixels(elementNewXPosition);
		style.top = inPixels(elementNewYPosition);

		currentElement.lastXPosition = event.clientX;
		currentElement.lastYPosition = event.clientY;
		
		try{
			document.selection.empty();
		}catch(e){}
		
		try{
			window.getSelection().removeAllRanges();
		}catch(e){}
		


		triggerEvent('drag', { x: elementNewXPosition, y: elementNewYPosition, el: currentElement, mouseEvent: event });
	}
	
	jMod.Scrollbar.resizeScrollBar = function(el){
		var scrollBar = jMod.$('.jModScrollBar');
		if(scrollBar){
			var track = jMod.$('.enscroll-track', scrollBar);
			var handle = jMod.$('.handle3', scrollBar);
			
			var computedEl = (window || unsafeWindow).getComputedStyle(el, null),
				height = parseFloat(computedEl.height),
				width = parseFloat(computedEl.width),
				scrollHeight = parseFloat(el.scrollHeight),
				scrollWidth = parseFloat(el.scrollWidth),
				scrollTop = parseFloat(el.scrollTop),
				scrollLeft = parseFloat(el.scrollLeft),
				handleHeight = 0.0, handleTop = 0.0;
				
			scrollBar.style.left = parseInt(width - 10) + 'px';
			track.style.height = parseInt(height) + 'px';
			
			handleHeight = (height / scrollHeight) * height;
			handleTop = ((height / scrollHeight) * scrollTop);// + (handleHeight / 2);
			
			if(handleTop < 0)
				handleTop = 0;
			
			handleTop += scrollTop;
			
			handle.style.height = handleHeight + 'px';
			handle.style.top = handleTop + 'px';
			
			//console.log('resize scrollbar complete');
		}
	}
	
	function preventDefault( event ) {
		if ( event.preventDefault ) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}

		if ( event.stopPropagation ) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
	
	var reqAnimFrame = window.requestAnimationFrame ? 'requestAnimationFrame' :
			window.mozRequestAnimationFrame ? 'mozRequestAnimationFrame' :
			window.webkitRequestAnimationFrame ? 'webkitRequestAnimationFrame' :
			window.oRequestAnimationFrame ? 'oRequestAnimationFrame' : 
			window.msRequestAnimationFrame ? 'msRequestAnimationFrame' :
			function( f ) { setTimeout( f, 17 ); };
			
	var PI_OVER_2 = 0.5 * Math.PI,
		TEN_LOG2 = 10 * Math.log( 2 );
			
	var easeOutSin = function( c, d, t ) {
		var b = PI_OVER_2 / d,
			a = c * b;

		return Math.round( a * Math.cos( b * t ));
	}

	var easeOutExpo = function( c, d, t ) {
		return Math.round( c * TEN_LOG2 * Math.pow( 2, -10 * t / d + 1 ) / d );
	}

	var timeFromPosition = function( b, c, d, x ) {
		return 2 * d / Math.PI * Math.asin(( x - b ) / c );
	}
	
	var scrollVertical = function( el, dy ) {
		//var $pane = $( pane ),
			//data = $pane.dataset( 'enscroll' ),
			//var y0 = el.scrollTop;
			el.scrollTop = parseInt(el.scrollTop) + parseInt(dy);
		//if ( data && data.settings.verticalScrolling ) {
			//$pane.scrollTop( y0 + dy );
			//if ( data.settings.showOnHover ) {
				//showScrollbars.call( pane );
			//}
		//}
	}
	
	function scrollAnimate(el){
		//console.log('scrollAnimate', el);
		var dataset = el.dataset;
		var duration = dataset._duration || parseInt( 300 / 16.66666, 10 );
		if ( el.dataset._scrollingY === true || el.dataset._scrollingY === "true" ) {
			//console.log('scrollAnimate animate Y');
			var remaining = parseInt(dataset._endY) - parseInt(dataset._startY);
			if(remaining === 0){
				el.dataset._scrollingY = false;
			} else {
				var curPos = el.scrollTop;
				var time = timeFromPosition( parseInt(dataset._startY), remaining, duration, curPos );
				
				if ( remaining > 0 ) {
					if ( curPos >= parseInt(dataset._endY) || curPos < parseInt(dataset._startY) ) {
						el.dataset._scrollingY = false;
					} else {
						scrollVertical( el, Math.max( 1, easeOutSin( remaining, duration, time )));
							if(typeof reqAnimFrame === "function"){
								reqAnimFrame(function() {
									scrollAnimate( el );
								});
							} else {
								window[reqAnimFrame](function() {
									scrollAnimate( el );
								});
							}
					}
				} else {
					if ( curPos <= parseInt(dataset._endY) || curPos > parseInt(dataset._startY) ) {
						el.dataset._scrollingY = false;
					} else {
						scrollVertical( el, Math.min( -1, easeOutSin( remaining, duration, time )));
						if(typeof reqAnimFrame === "function"){
							reqAnimFrame(function() {
								scrollAnimate( el );
							});
						} else {
							window[reqAnimFrame](function() {
								scrollAnimate( el );
							});
						}
					}
				}
				
				
			}
		}
	}
	
	function animateVertical(el, delta){
		var curPos = parseInt(el.scrollTop);
		var computedEl = window.getComputedStyle(el),
			height = parseFloat(computedEl.height),
			width = parseFloat(computedEl.width);
		var scrollMax = parseFloat(el.scrollHeight) - height;
		//if(scrollMax < 0)
			//scrollMax = 0;
			
		if(!el.dataset._scrollingY || el.dataset._scrollingY == "false"){
			el.dataset._scrollingY = true;
			el.dataset._startY = curPos;
			el.dataset._endY = el.dataset._startY;
			//if(reqAnimFrame){
				if(typeof reqAnimFrame === "function"){
					reqAnimFrame(function() {
						scrollAnimate( el );
					});
				} else {
					window[reqAnimFrame](function() {
						scrollAnimate( el );
					});
				}
			//}
		}
		
		var remaining = parseInt(el.dataset._endY) - parseInt(el.dataset._startY);
		
		//if((remaining > 0 && delta > 0) || (remaining < 0 && delta < 0)){
			//el.dataset._endY = delta > 0 ? Math.min( curPos + delta, scrollMax ) : Math.max( 0, curPos + delta );
		if((remaining > 0 && delta < 0) || (remaining < 0 && delta > 0)){
			el.dataset._startY = curPos;
			el.dataset._endY = el.dataset._startY;
			//el.dataset._endY = delta > 0 ? Math.min( curPos + delta, scrollMax ) : Math.max( 0, curPos + delta );
		} else {
			el.dataset._endY = delta > 0 ? Math.min( curPos + delta + parseInt(remaining * 2 / 3), scrollMax ) : Math.max( 0, curPos + delta + parseInt(remaining * 2 / 3) );
		}
		//el.dataset._endY = delta > 0 ? Math.min( curPos + delta, scrollMax ) : Math.max( 0, curPos + delta );

		return delta < 0 && curPos > 0 || delta > 0 && curPos < scrollMax;
	}
	
	
	function startVerticalDrag(e){
		if(event.which !== 1){
			return;
		}
		var handleEl = this,
			trackEl = findParentWithClass(this, 'enscroll-track');
		if(trackEl){
			addClass(trackEl, 'dragging');
		}
	}
	
	jMod.Scrollbar.handlers = {
		target_onScroll: function(event){
			//var $pane = $( this ),
			//console.log('ComputedStyle this', this);
			/*
			var computedEl = window.getComputedStyle(this),
				height = parseFloat(computedEl.height),
				width = parseFloat(computedEl.width);
			*/
			var _this = this;
				//data = $pane.data( 'enscroll' ),
				//scrollIncrement = data.settings.scrollIncrement,
				var scrollIncrement = 10;
				
				var deltaX = 'deltaX' in event ? -event.deltaX :
					'wheelDeltaX' in event ? event.wheelDeltaX :
					0,
				deltaY = 'deltaY' in event ? -event.deltaY :
					'wheelDeltaY' in event ? event.wheelDeltaY :
					'wheelDelta' in event ? event.wheelDelta :
					//'detail' in event ? event.detail :
					0,
				delta;


				
			if ( Math.abs( deltaX ) > Math.abs( deltaY )) {
				delta = ( deltaX > 0 ? -scrollIncrement : scrollIncrement ) << 2;
				//if ( scrollAnimateHorizontal( $pane, delta ) || !data.settings.propagateWheelEvent ) {
					//preventDefault( event );
				//}
			} else {
				//delta = ( deltaY > 0 ? -1 * scrollIncrement : scrollIncrement ) << 2;
				delta = ( deltaY > 0 ? -1 * scrollIncrement : scrollIncrement ) << 2;
				/*
				var curPos = parseFloat(_this.scrollTop);
				var scrollMax = parseFloat(_this.scrollHeight) - height;
				if(scrollMax < 0)
					scrollMax = 0;
				*/
				/*
				_this.scrollTop = parseInt(Math.min(curPos + parseFloat(delta), scrollMax));
				console.log('deltaY', deltaY);
				console.log('curPos', curPos);
				console.log('scrollMax', scrollMax);
				console.log('_this.scrollTop', _this.scrollTop);
				*/
				if(animateVertical(this, delta)){
					preventDefault( event );
				}
				//if ( scrollAnimateVertical( $pane, delta ) || !data.settings.propagateWheelEvent ) {
					//preventDefault( event );
				//}
			}
			
			//console.log('delta', delta);
		},
		target_onResize: function(){
		
		},
		
		// Track
		track_onMouseDown: function(){
		
		},
		track_onMouseUp: function(){
		
		},
		
		// Track Handle
		track_handle_onMouseDown: function(e){
			var handleEl = this,
				trackEl = findParentWithClass(this, 'enscroll-track');
			if(trackEl){
				addClass(trackEl, 'dragging');
			}
		},
		track_handle_onMouseUp: function(e){
			var handleEl = this,
				trackEl = findParentWithClass(this, 'enscroll-track');
			if(trackEl){
				removeClass(trackEl, 'dragging');
			}
		},
		/*
		track_handle_onMouseMove: function(e){
			var handleEl = this,
				trackEl = findParentWithClass(this, 'enscroll-track');
			if(trackEl && hasClass(trackEl, 'dragging')){
				console.log('Mouse moved while dragging');
			}
		}
		*/
	};

})();





jMod.CSS = '.jmod-na .track3{width:10px;background:rgba(0,0,0,0);margin-right:0px;-webkit-transition:background 250ms linear;transition:background 250ms linear;}.jmod-na .track3:hover,.jmod-na .track3.dragging{background:#d9d9d9;background:rgba(0,0,0,0.15);}.jmod-na .handle3{width:7px;right:0;background:#999;background:rgba(0,0,0,0.4);-webkit-transition:width 250ms;transition:width 250ms;cursor:pointer;}.jmod-na .track3:hover .handle3,.jmod-na .track3.dragging .handle3{width:10px;}';
	
	/***********************************
	 ** Tooltip
	 **********************************/
/**
 * Tooltip Configuration Options
 * @name Tooltip
 * @alias Tooltip
 * @memberof jMod.Config
 * @example
 * // Get the current value of Ext.enabled
 * jMod('get', 'Tooltip.enabled')
 * // or
 * jMod.Config('Tooltip.enabled');
 * // or
 * jMod.Config.Tooltip.enabled;
 */
/*
jMod.Config.Tooltip = {
	enabled: false,
	containerId: 'jModTooltipContainer',
	attributeNames: {
		id: 'data-tooltip-id',
		tooltip: 'data-tooltip',
		placement: 'data-tooltip-placement',
		margin: 'data-tooltip-margin'
	},
	classNames: {
		tooltipTarget: 'jmod-tooltip-target',
		tooltip: 'tooltip'
	}
}
*/

jMod.Config.Tooltip = jMod.extend({
	enabled: false,
	containerId: 'jModTooltipContainer',
	attributeNames: {
		id: 'data-tooltip-id',
		tooltip: 'data-tooltip',
		placement: 'data-tooltip-placement',
		margin: 'data-tooltip-margin'
	},
	classNames: {
		tooltipTarget: 'jmod-tooltip-target',
		tooltip: 'tooltip'
	}
}, jMod.Config.Tooltip || {});

// Minifies down nicely
var
	Tooltip_ContainerId_Key = 'Tooltip.containerId',
	Tooltip_IdAttribute_Key = 'Tooltip.attributeNames.id',
	Tooltip_TooltipAttribute_Key = 'Tooltip.attributeNames.tooltip',
	Tooltip_PlacementAttribute_Key = 'Tooltip.attributeNames.placement',
	Tooltip_MarginAttribute_Key = 'Tooltip.attributeNames.margin',
	Tooltip_TooltipTargetClass_Key = 'Tooltip.classNames.tooltipTarget',
	Tooltip_TooltipClass_Key = 'Tooltip.classNames.tooltip';

/**
 * @namespace jMod.Tooltip
 * @memberOf jMod
 * @since 0.0.14
 */
var Tooltip = jMod.Tooltip = function(data, data2){
	if(isElement(data)){
		jMod.Tooltip.AddTooltipsToElement.apply(jMod.Tooltip, arguments);
	}
}

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
		get: function(){
			if(!Tooltip.Initialized)
				Tooltip.init();
			if(!_TooltipContainer)
				_TooltipContainer = document.getElementById(jConfig(Tooltip_ContainerId_Key));
			return _TooltipContainer;
		},
		set: function(el){
			_TooltipContainer = el;
		}
	},
	'get': {
		value: (function(obj){
			var tooltipId, tooltipEl, tmpEl, idAttName = jConfig(Tooltip_IdAttribute_Key);
			if(isElement(obj)){
				if(hasClass(obj, jConfig(Tooltip_TooltipClass_Key))){
					return document.querySelector('.' + jConfig(Tooltip_TooltipTargetClass_Key) + ' [' + idAttName + '="'+obj.id+'"]')
				}
				if(hasClass(obj, jConfig(Tooltip_TooltipTargetClass_Key)) && obj.hasAttribute(idAttName)){
					tooltipId = obj.getAttribute(idAttName);
				}else if(this.TooltipContainer && (tmpEl = this.TooltipContainer.querySelector('.' + jConfig(Tooltip_TooltipTargetClass_Key) + ' [' + idAttName + ']')) !== null){
					tooltipId = tmpEl.getAttribute(idAttName);
				}
				return document.getElementById(tooltipId);
			} else if(typeof obj === "string") {
				if((tooltipEl = document.getElementById(obj)) !== null){
					return tooltipEl;
				}
			} else if(typeof obj === "number") {
				if(this.TooltipContainer && this.TooltipContainer.childElementCount > obj)
					return tooltipContainer.children[obj];
			}
			return null;
		}).bind(Tooltip)
	}
});

/** @const */
var fadeTime = 200;

Tooltip.MoveTooltip = function(targetEl, tooltipEl, position){
	if('top' in position)
		tooltipEl.style.top = position.top;
	else if('bottom' in position)
		tooltipEl.style.bottom = position.bottom;
		
	if('left' in position)
		tooltipEl.style.left = position.left;
	else if('right' in position)
		tooltipEl.style.right = position.right;
		
	var marginAttributeName = jConfig('Tooltip.attributeNames.margin');
	if(targetEl.hasAttribute(marginAttributeName + '-top'))
		tooltipEl.style.marginTop = targetEl.getAttribute(marginAttributeName + '-top');
		
	if(targetEl.hasAttribute(marginAttributeName + '-left'))
		tooltipEl.style.marginLeft = targetEl.getAttribute(marginAttributeName + '-left');
		
	if(targetEl.hasAttribute(marginAttributeName + '-bottom'))
		tooltipEl.style.marginBottom = targetEl.getAttribute(marginAttributeName + '-bottom');
		
	if(targetEl.hasAttribute(marginAttributeName + '-right'))
		tooltipEl.style.marginRight = targetEl.getAttribute(marginAttributeName + '-right');
}

Tooltip.MoveTooltipToTarget = function(tooltip, targetEl, callback){
	var tooltipEl, top, left, bottom, right;
	
	if(hasClass(tooltip, jConfig(Tooltip_TooltipClass_Key)))
		tooltipEl = tooltip;
	else if(tooltip.hasAttribute(jConfig(Tooltip_IdAttribute_Key)))
		tooltipEl = document.getElementById(tooltip.getAttribute(jConfig(Tooltip_IdAttribute_Key)));
	else
		return;
	
	var tooltipPlacement = targetEl.getAttribute(jConfig(Tooltip_PlacementAttribute_Key)) || 'top';
	
	var offset = getOffset(targetEl);
	
	switch(tooltipPlacement){
		// Left
		case 'left-top':
			top = parseInt(offset.top);
			left = offset.left - parseInt(tooltipEl.offsetWidth);
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'left-bottom':
			top = (offset.top + offset.height) - parseInt(tooltipEl.offsetHeight);
			left = offset.left - parseInt(tooltipEl.offsetWidth);
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'left':
			top = (offset.top + parseInt(offset.height / 2)) - parseInt(parseInt(tooltipEl.offsetHeight) / 2);
			left = offset.left - parseInt(tooltipEl.offsetWidth);
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
			
		// Right
		case 'right-top':
			top = parseInt(offset.top);
			left = offset.left + offset.width;
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'right-bottom':
			top = (offset.top + offset.height) - parseInt(tooltipEl.offsetHeight);
			left = offset.left + offset.width;
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'right':
			top = (offset.top + parseInt(offset.height / 2)) - parseInt(tooltipEl.offsetHeight / 2);
			left = offset.left + offset.width;
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
			
		// Bottom
		case 'bottom-left':
			top = offset.top + offset.height;
			left = offset.left;
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'bottom-right':
			top = offset.top + offset.height;
			left = (offset.left + offset.width) - parseInt(tooltipEl.offsetWidth);
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'bottom':
			top = offset.top + offset.height;
			left = offset.left + parseInt(offset.width / 2) - parseInt(parseInt(tooltipEl.offsetWidth) / 2);
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
			
		// Top
		case 'top-left':
			//bottom = window.viewportSize.getHeight() - offset.top - offset.height + 10;
			top = offset.top - parseInt(tooltipEl.offsetHeight);
			left = offset.left;
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'top-right':
			//bottom = window.viewportSize.getHeight() - offset.top - offset.height + 10;
			top = offset.top - parseInt(tooltipEl.offsetHeight);
			left = (offset.left + offset.width) - parseInt(tooltipEl.offsetWidth);
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'top':
		default:
			//bottom = window.viewportSize.getHeight() - offset.top - offset.height + 10;
			//bottom = window.viewportSize.getHeight() - offset.top - offset.height + 10;
			top = offset.top - parseInt(tooltipEl.offsetHeight);
			left = offset.left + parseInt(offset.width / 2) - parseInt(parseInt(tooltipEl.offsetWidth) / 2);
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
	}
	
	
}

Tooltip.HideAllExcept = function(except){
	var hide = [],
		tooltipEl,
		tooltips = jMod.$$('.jmod-na .' + jConfig(Tooltip_TooltipClass_Key) + '.in');
	for(var i = 0; i < tooltips.length; i++){
		tooltipEl = tooltips[i];
		if(tooltipEl.style.display == "block" && tooltipEl !== except){
			removeClass(tooltipEl, 'in')
			hide.push(tooltipEl);
		}
	}
	
	setTimeout(function(_hide){
		for(var i = 0; i < _hide.length; i++){
			if(!hasClass(_hide[i], 'in'))
				_hide[i].style.display = 'none';
		}
	}, fadeTime, hide);
}

Tooltip.handler = {
	mouseenter: function(e){
		var tooltipId = this.getAttribute(jConfig(Tooltip_IdAttribute_Key));
		var tooltipValue = this.getAttribute(jConfig(Tooltip_TooltipAttribute_Key));
		var tooltipPlacement = this.getAttribute(jConfig(Tooltip_PlacementAttribute_Key)) || 'top';
		var tooltipContainer = Tooltip.TooltipContainer;
		
		switch(tooltipPlacement){
			case 'top-left':
			case 'top-right':
				tooltipPlacement = 'top ' + tooltipPlacement;
				break;
			case 'bottom-left':
			case 'bottom-right':
				tooltipPlacement = 'bottom ' + tooltipPlacement;
				break;
			case 'left-top':
			case 'left-bottom':
				tooltipPlacement = 'left ' + tooltipPlacement;
				break;
			case 'right-top':
			case 'right-bottom':
				tooltipPlacement = 'right ' + tooltipPlacement;
				break;
		}
		
		var tooltipEl = document.getElementById(tooltipId);
		if(!tooltipEl){
			tooltipEl = createNewElement({
				type: 'div',
				id: tooltipId,
				className: jConfig(Tooltip_TooltipClass_Key) + ' ' + tooltipPlacement + ' fade slow',
				style: {
					'display': 'none',
				},
				innerHTML: ['<div class="tooltip-arrow"></div>','<div class="tooltip-inner">'+tooltipValue+'</div>']
			});
			tooltipEl.addEventListener("mouseenter", function(ev){
				var currentOpacity = window.getComputedStyle(this,null).getPropertyValue("opacity");
				if(currentOpacity > 0.2){
					addClass(this, 'in');
					Tooltip.HideAllExcept(this);
				}
			});
			
			tooltipEl.addEventListener("mouseleave", function(ev){
				var currentOpacity = window.getComputedStyle(this,null).getPropertyValue("opacity");
				removeClass(this, 'in');
				setTimeout(function(el){
					if(!hasClass(el, 'in'))
						el.style.display = 'none';
				}, fadeTime, this);
			});
			
			tooltipEl.addEventListener("click", function(ev){
				removeClass(this, 'in');
				setTimeout(function(el){
					if(!hasClass(el, 'in'))
						el.style.display = 'none';
				}, fadeTime, this);
			});
			
			tooltipContainer.appendChild(tooltipEl);
			
		}
		
		Tooltip.HideAllExcept(tooltipEl);
		
		tooltipEl.style.display = 'block';
		
		setTimeout(function(targetEl, tooltipEl){
			addClass(tooltipEl, 'in');
			Tooltip.MoveTooltipToTarget(tooltipEl, targetEl);
		}, 1, this, tooltipEl);
		
	},
	
	mouseleave: function(e){
		var tooltipEl = Tooltip.get(this);
		if(tooltipEl){
			removeClass(tooltipEl, 'in');
			setTimeout(function(tooltipEl){
				if(!hasClass(tooltipEl, 'in'))
					tooltipEl.style.display = 'none';
			}, fadeTime, tooltipEl);
		}
	},
	
	scroll: function(e){
		var tooltips, tooltipId, tooltipEl;
		if(isNamespaced(this, 'jmod-na'))
			tooltips = jMod.$$('.' + jConfig(Tooltip_TooltipTargetClass_Key) + '[' + jConfig(Tooltip_TooltipAttribute_Key) + ']', this);
		else
			tooltips = jMod.$$('.jmod-na .' + jConfig(Tooltip_TooltipTargetClass_Key) + '[' + jConfig(Tooltip_TooltipAttribute_Key) + ']', this);
		for(var i = 0; i < tooltips.length; i++){
			tooltipId = tooltips[i].getAttribute(jConfig(Tooltip_IdAttribute_Key));
			tooltipEl = document.getElementById(tooltipId);
			if(tooltipEl && tooltipEl.style.display == "block"){
				Tooltip.MoveTooltipToTarget(tooltipEl, tooltips[i]);
			}
		}
	}
}

Tooltip.getTooltipsFromElement = function(el){
	var val, r = [];
	//var tooltips = el.querySelectorAll('.' + jConfig(Tooltip_TooltipTargetClass_Key) + '[' + jConfig(Tooltip_TooltipAttribute_Key) + ']');
	var tooltips = jMod.$$('.' + jConfig(Tooltip_TooltipTargetClass_Key) + '[' + jConfig(Tooltip_TooltipAttribute_Key) + ']', el);
	for(var i = 0; i < tooltips.length; i++)
		if(tooltips[i].getAttribute(jConfig(Tooltip_TooltipAttribute_Key)))
			r.push(tooltips[i]);
	return r;
}

Tooltip.AddTooltipsToElement = function(el){
	var tooltips = Tooltip.getTooltipsFromElement(el);
	for(var i = 0; i < tooltips.length; i++){
		tooltips[i].setAttribute(jConfig(Tooltip_IdAttribute_Key), 'jmod-tooltip-' + Tooltip.Count++);
		tooltips[i].addEventListener("mouseenter", Tooltip.handler.mouseenter);
		tooltips[i].addEventListener("mouseleave", Tooltip.handler.mouseleave);
		
		var parent = tooltips[i];
		while(parent.parentElement){
			parent = parent.parentElement;
			if(!parent.hasAttribute('data-jmod-scroll-event')){
				parent.setAttribute('data-jmod-scroll-event', true);
				parent.addEventListener("scroll", Tooltip.handler.scroll);
			}
		}
	}
	el.addEventListener("scroll", Tooltip.handler.scroll);
}


Tooltip.init = function(){
	Tooltip.Initialized = true;
	
	var tooltipContainer = document.getElementById(jConfig(Tooltip_ContainerId_Key));
	if(tooltipContainer == null){
		tooltipContainer = document.createElement("div");
		tooltipContainer.id = jConfig(Tooltip_ContainerId_Key);
		tooltipContainer.className = 'jModTooltipContainer jmod-na jmod-fa';
		document.body.appendChild(tooltipContainer);
		_TooltipContainer = tooltipContainer;
	}

}

jMod.CSS = '.jmod-na .fade.slow {transition: opacity '+((fadeTime / 1000).toFixed(2)).toString()+'s linear 0s;}' + '';



	/***********************************
	 ** Notifications
	 **********************************/
/**
 * Notification Configuration Options
 * @name Notifications
 * @alias Notifications
 * @memberof jMod.Config
 * @property {boolean} enabled is enabled
 * @example
 * // Get the current value of Notifications.enabled
 * jMod('get', 'Notifications.enabled')
 * // or
 * jMod.Config('Notifications.enabled');
 * // or
 * jMod.Config.Notifications.enabled;
 */
jMod.Config.Notifications = {
	enabled: true
}

/**
 * @namespace jMod.Notification
 * @memberOf jMod
 * @since 0.0.14
 * @todo Clean up Notification loading process
 * @example
 * // Show an update notification
 * jMod.Notification('UpdateNotification', {
 *     'version': '1.2.3', // The new version
 *     'script_name': 'foo bar', // Optional
 *     'time': '123 minutes ago',
 *     'visit': {
 *         'onClick': function(e){
 *             console.log('Visit Clicked!!', e);
 *             e.stopPropagation();
 *             return false;
 *         }
 *     }
 * });
 * @example
 * // Manually show a small notification
 * jMod.Notification({
 *     'title': 'Anti-Pagination v0.0.14 Available!',
 *     'body': '&#060;i class="fa fa-clock-o"&#062;&#060;/i&#062; &#060;i&#062;2 hours ago...&#060;/i&#062;',
 *     'footer': '&#060;a class="btn btn-success btn-sm" href="javascript:void(0);" onClick="console.log(\'a btn click\');(arguments[0] || window.event).stopPropagation();return false;">Install&#060;/a&#062;'+
 *         '&#060;a class="btn btn-primary btn-sm" href="javascript:void(0);" target="_blank"&#062;Visit Page&#060;/a&#062;'+
 *         '&#060;a class="btn btn-danger btn-sm" href="javascript:void(0);"&#062;Close&#060;/a&#062;', // Optional
 *     'icon': 'fa-download',
 *     'type': 'small',
 *     'onBeforeClose': tOnBeforeCloseCB, // Optional
 *     'onAfterClose': tOnAfterCloseCB // Optional
 * });
 */

/**
 * @function Notification
 * @memberOf jMod
 * @variation 2
 * @param {string|object} data Command to execute or notification data
 * @param {...*} [data2]
 * @see jMod.Notification
 */
var Notification = jMod.Notification = function(data, data2){
	if(!jConfig('Notifications.enabled'))
		return false;
	if(!jMod.Notification.Initialized){
		jMod.Notification.init();
	}
	
	if(typeof data === "string"){
		switch(data.toLowerCase()){
			case 'get':
			case 'getelement':
				return jMod.Notification.getElement.apply(jMod.Notification, Slice.call(arguments, 1));
				break;
			case 'getid':
			case 'getelementid':
				return jMod.Notification.getElementId.apply(jMod.Notification, Slice.call(arguments, 1));
				break;
			case 'updatenotification':
				return jMod.Notification.UpdateNotification.apply(jMod.Notification, Slice.call(arguments, 1));
				break;
		}
	} else if(typeof data === "object") {
		if(data.type)
			Notification.Types.create(data.type.toLowerCase(), data);
	}
}

Notification.Types = {
	types: {},
	
	add: function(obj){
		this.types[obj.name] = obj;
	},
	
	callMethod: function(typeName, methodName){
		if(_undefined!==typeof this.types[typeName] && typeof this.types[typeName][methodName]==="function"){
			return this.types[typeName][methodName].apply(this.types[typeName], Slice.call(arguments,2));
		}
	},
	
	create: function(typeName, data){
		this.callMethod(typeName, 'create', data);
	},
	
	init: function(){
		for(var name in this.types){
			this.callMethod(name, 'init');
		}
	}
};

+(function(Notification){
	var LargeWrapperId = 'jModSmallNotificationsWrapper';
	
	Notification.LargeCount = 0;
	Object.defineProperty(Notification, 'CurrentLargeCount', {
		get: function(){
			var largeNotificationsContainer = document.getElementById(LargeWrapperId);
			return (jMod.$$('div[data-jmod-large-notification]', largeNotificationsContainer)).length;
		},
		//writable: false
	});
	
	jMod.Notification.Types.add({
		name: 'large',
		
		getWrapper: function(){
			return document.getElementById(LargeWrapperId);
		},
		
		generateElement: function(data){
			var newNotification = {
				type: 'div',
				className: 'jModLargeNotification animated fadeIn fast',
				style: {},
				attributes: {
					'data-jmod-notification': Notification.count,
					'data-jmod-notification-type': 'large',
					'data-jmod-large-notification': Notification.LargeCount
				}
			}
			
			// Background
			if(data.background){
				var color;
				if(typeof data.background === "string"){
					if((color = parseColorString(data.background)) && _undefined!=typeof data['background-opacity'])
						color.a = parseFloat(data['background-opacity']);
				} else if(typeof data.background === "object" && _undefined!=typeof data.background.color) {
					if((color = parseColorString(data.background.color)) && _undefined!=typeof data.background.opacity)
						color.a = parseFloat(data.background.opacity);
				}
				if(color)
					newNotification.style.backgroundColor = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + (isNaN(parseFloat(color.a)) ? '0.8' : parseFloat(color.a)) + ')';
			}
			
			var newNotificationContent = {
				type: 'div',
				className: '',
				innerHTML: [
					{
						type: 'i',
						id: 'jModbtnClose'+Notification.LargeCount,
						className: 'btnClose fa fa-times',
						EventListeners: {
							'click':function(e){
								if(!hasClass(this, 'fadeOut')){
									Notification.close(e.target);
									try{
										this.removeEventListener('click', arguments.callee);
									}catch(e){}
								}
							}
						}
					}
				],
				style: {}
			}
			
			if(typeof data.title !== _undefined){
				newNotificationContent.innerHTML.push({
					type: 'span',
					innerHTML: data.title
				});
			}
			
			newNotificationContent.innerHTML.push({
				type: 'div',
				innerHTML: data.body
			});
			
			if(typeof data.icon !== _undefined){
				newNotificationContent.innerHTML.push({
					type: 'div',
					className: 'jmod-na largeIcon',
					style: {
						'backgroundColor': 'transparent',
					},
					innerHTML: {
						type: 'i',
						className: 'fa ' + data.icon + ' ' + (data.iconAnimation || 'swing') + ' animated',
						style: {
							color: '#fff'
						}
					}
				});
			}
			
			newNotification.innerHTML = newNotificationContent;
			
			return createNewElement(newNotification);
		},
		
		create: function(data){
			var largeNotificationsContainer = this.getWrapper();
			var newNotification = this.generateElement(data);
			largeNotificationsContainer.appendChild(newNotification);
			jMod.Notification.Events.addAll(data, jMod.Notification.count);
			jMod.Notification.count++;
			jMod.Notification.LargeCount++;
		},
		
		close: function(el, num){
			Notification.Events.fire('onBeforeClose', num, null, el);
			removeClass(el, 'fadeIn');
			addClass(el, 'fadeOut');
			setTimeout(function(el, num){
				el.style.display = 'none';
				Notification.Events.fire('onAfterClose', num, null, el);
				el.parentElement.removeChild(el);
			}, 1000, el, num);
		},
		
		init: function(){
			// Add Large Notification Wrapper
			var notificationsFullWrapper = Notification('getElement', 'notificationsWrapper');
			var largeNotificationsContainer = this.getWrapper();
			if(largeNotificationsContainer == null){
				largeNotificationsContainer = document.createElement("div");
				largeNotificationsContainer.id = LargeWrapperId;
				largeNotificationsContainer.className = 'jModNotifications';
				notificationsFullWrapper.appendChild(largeNotificationsContainer);
			}
		}
	});
	
})(jMod.Notification);


+(function(Notification){
	var SmallWrapperId = 'jModSmallNotificationsWrapper';
	
	Notification.SmallCount = 0;
	Object.defineProperty(Notification, 'CurrentSmallCount', {
		get: function(){
			var smallNotificationsContainer = document.getElementById(SmallWrapperId);
			return (jMod.$$('div[data-jmod-small-notification]', smallNotificationsContainer)).length;
		},
		//writable: false
	});
	
	jMod.Notification.Types.add({
		name: 'small',
		
		getWrapper: function(){
			return document.getElementById(SmallWrapperId);
		},
		
		generateElement: function(data){
			var tmpTop = 25;
			var totalCount = Notification.CurrentSmallCount;
			if(totalCount > 0){
				var tHeight = totalCount * 25;
				var smallNotificationsContainer = Notification('getElement', 'notificationsSmallWrapper');
				var smNotes = jMod.$$('div[data-jmod-small-notification]', smallNotificationsContainer);
				for(var i = 0; i < smNotes.length; i++){
					tHeight += parseInt(smNotes[i].offsetHeight);
				}
				tmpTop += (tHeight);
			}

			var newNotification = {
				type: 'div',
				className: 'jModSmallNotification animated fadeIn',
				style: {
					top: tmpTop + 'px'
				},
				innerHTML: [],
				attributes: {
					'data-jmod-notification': Notification.count,
					'data-jmod-notification-type': 'small',
					'data-jmod-small-notification': Notification.SmallCount
				},
				EventListeners: {
					click: function(e){
						var tCount = 0;
						var tParent = e.target;
						while(!tParent.hasAttribute('data-jmod-small-notification') && tParent != null && tCount < 20){
							tParent = tParent.parentElement;
							tCount++;
						}
						if(tParent != null && !hasClass(tParent, 'fadeOut')){
							var notificationNum = parseInt(tParent.getAttribute('data-jmod-notification'));
							var smallNotificationNum = parseInt(tParent.getAttribute('data-jmod-small-notification'));
							jMod.Notification.close(tParent);
							try{
								this.removeEventListener('click', arguments.callee);
							}catch(e){}
						}
					}
				}
			}
			
			// Background
			var bgColor = parseColorString('rgba(50, 118, 177, 0.8)'),
				tmp;
			if(data.background){
				if(typeof data.background === "object"){
					if(_undefined!=typeof data.background.color){
						if(tmp = parseColorString(data.background.color)){
							if(tmp.a == null)
								tmp.a = bgColor.a;
							bgColor = tmp;
						}
					}
					
					if(_undefined!=typeof data.background.opacity){
						bgColor.a = data.background.opacity;
					}
				} else {
					if(tmp = parseColorString(data.background)){
						if(tmp.a == null)
							tmp.a = bgColor.a;
						bgColor = tmp;
					}
				}
			}
			
			if(bgColor)
				newNotification.style.backgroundColor = 'rgba(' + bgColor.r + ', ' + bgColor.g + ', ' + bgColor.b + ', ' + (bgColor.a) + ')';
			
			var newNotificationContent = {
				type: 'div',
				className: 'NotificationContent',
				innerHTML: [],
				style: {}
			}
			
			if(typeof data.footer != _undefined){
				var largeIcon = document.createElement("div");
				largeIcon.className = 'largeIcon';
				if(isElement(data.icon)){
					largeIcon.appendChild(data.icon);
				} else {
					largeIcon.innerHTML = '<i class="fa ' + data.icon + ' '+(data.iconAnimation || 'bounce')+' animated"> </i>';
				}
				
				newNotification.innerHTML.push(largeIcon);
			}
			
			
			if(data.title){
				newNotificationContent.innerHTML.push({
					type: 'span',
					innerHTML: data.title
				});
			}
			
			if(data.body){
				newNotificationContent.innerHTML.push({
					type: 'p',
					innerHTML: data.body
				});
			}
			
			if(data.footer){
				newNotificationContent.innerHTML.push({
					type: 'p',
					style: {
						textAlign: 'right'
					},
					innerHTML: data.footer
				});
			}
			
			if(data.icon && !data.footer){
				newNotificationContent.innerHTML.push({
					type: 'div',
					className: 'smallIcon',
					style: {
						'backgroundColor': 'transparent'
					},
					innerHTML: {
						type: 'i',
						className: 'fa ' + data.icon + ' ' + (data.iconAnimation || 'swing') + ' animated',
						style: {
							color: '#fff'
						}
					}
				});
			}
			
			newNotification.innerHTML.push(newNotificationContent);
			
			return createNewElement(newNotification);
		},
		
		create: function(data){
			var smallNotificationsContainer = this.getWrapper();
			var newNotification = this.generateElement(data);
			smallNotificationsContainer.appendChild(newNotification);
			jMod.Notification.Events.addAll(data, jMod.Notification.count);
			jMod.Notification.count++;
			jMod.Notification.SmallCount++;
		},
		
		close: function(el, num){
			Notification.Events.fire('onBeforeClose', num, null, el);
			var top = parseInt(el.style.top);
			var tSib = el;
			removeClass(el, 'fadeIn');
			addClass(el, 'fast');
			addClass(el, 'fadeOut');
			el.style.zIndex = "9998";
			
			while(tSib.nextElementSibling != null && tSib.nextElementSibling.hasAttribute('data-jmod-small-notification')){
				tSib = tSib.nextElementSibling;
				addClass(tSib, 'transitionUp');
				setTimeout(function(sib, top){
					sib.style.top = top + 'px';
				},0,tSib,top);
				top = top + parseInt(tSib.offsetHeight) + 25;
			}
			
			setTimeout(function(el, num){
				el.style.display = 'none';
				Notification.Events.fire('onAfterClose', num, null, el);
				el.parentElement.removeChild(el);
			}, 1000, el, num);
			
			
		},
		
		init: function(){
			// Add Small Notification Wrapper
			var notificationsFullWrapper = Notification('getElement', 'notificationsWrapper');
			var smallNotificationsContainer = this.getWrapper();
			if(smallNotificationsContainer == null){
				smallNotificationsContainer = document.createElement("div");
				smallNotificationsContainer.id = SmallWrapperId;
				smallNotificationsContainer.className = 'jModSmallNotifications';
				notificationsFullWrapper.appendChild(smallNotificationsContainer);
			}
		}
	});
	
})(jMod.Notification);


+(function(Notification){
	var FillWrapperId = 'jModFillNotificationsWrapper';
	
	Notification.FillCount = 0;
	Object.defineProperty(Notification, 'CurrentFillCount', {
		get: function(){
			var fillNotificationsContainer = document.getElementById(FillWrapperId);
			return (jMod.$$('div[data-jmod-fill-notification]', fillNotificationsContainer)).length;
		},
		//writable: false
	});
	
	jMod.Notification.Types.add({
		name: 'fill',
		
		getWrapper: function(){
			return document.getElementById(FillWrapperId);
		},
		
		generateElement: function(data){

			var newNotification = {
				type: 'div',
				className: 'jModFillNotification',
				style: {
					backgroundColor: 'rgba(0, 0, 0, 0.8);'
				},
				innerHTML: [
					{
						type: 'div',
						className: 'NotificationContent',
						style: {},
						innerHTML: [
							{
								type: 'span',
								className: 'NotificationTitle',
								innerHTML: data.title
							},
							{
								type: 'p',
								className: 'NotificationText',
								innerHTML: data.body
							}
						]
					}
				]
			};
			
			if(data.background){
				var color;
				if(typeof data.background === "string"){
					if((color = parseColorString(data.background)) && _undefined!=typeof data['background-opacity'])
						color.a = parseFloat(data['background-opacity']);
				} else if(typeof data.background === "object" && _undefined!=typeof data.background.color) {
					if((color = parseColorString(data.background.color)) && _undefined!=typeof data.background.opacity)
						color.a = parseFloat(data.background.opacity);
				}
				if(color)
					newNotification.style.backgroundColor = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + (color.a || parseFloat(color.a) === 0.0 ? parseFloat(color.a) : '0.8') + ')';
			}
			
			var footer = {
				type: 'div',
				className: 'NotificationFooter',
				style: {
					
				},
				innerHTML: [
					{
						type: 'button',
						className: 'btn btn-default btn-sm',
						innerHTML: 'Close',
						EventListeners: {
							click: function(e){
								if(this === e.target){
									jMod.Notification.close(e.target);
									try{
										this.removeEventListener('click', arguments.callee);
									}catch(e){}
								}
							}
						}
					}
				]
			};
			
			newNotification.innerHTML[0].innerHTML.push(footer);
			
			var newNotificationContainer = {
				type: 'div',
				className: 'jModFillNotificationContainer animated fadeIn fast',
				innerHTML: [
					newNotification
				],
				attributes: {
					'data-jmod-notification': Notification.count,
					'data-jmod-notification-type': 'fill',
					'data-jmod-fill-notification': Notification.FillCount
				},
				EventListeners: {
					click: function(e){
						if(this === e.target && !hasClass(this, 'fadeOut')){
							jMod.Notification.close(this);
							eventCancel(e);
							try{
								this.removeEventListener('click', arguments.callee);
							}catch(e){}
							return false;
						}
					}
				}
			};
			
			return createNewElement(newNotificationContainer);
		},
		
		create: function(data){
			var fillNotificationsContainer = this.getWrapper();
			var newNotification = this.generateElement(data);
			fillNotificationsContainer.appendChild(newNotification);
			jMod.Notification.Events.addAll(data, jMod.Notification.count);
			jMod.Notification.count++;
			jMod.Notification.FillCount++;
		},
		
		close: function(el, num){
			Notification.Events.fire('onBeforeClose', num, null, el);
			removeClass(el, 'fadeIn');
			addClass(el, 'fadeOut');
			setTimeout(function(el, num){
				el.style.display = 'none';
				Notification.Events.fire('onAfterClose', num, null, el);
				el.parentElement.removeChild(el);
			}, 800, el, num);
		},
		
		init: function(){
			// Add Fill Notification Wrapper
			var notificationsFullWrapper = Notification('getElement', 'notificationsWrapper');
			var fillNotificationsContainer = this.getWrapper();
			if(fillNotificationsContainer == null){
				fillNotificationsContainer = document.createElement("div");
				fillNotificationsContainer.id = FillWrapperId;
				fillNotificationsContainer.className = 'jModFillNotifications';
				fillNotificationsContainer.style.position = 'absolute';
				notificationsFullWrapper.appendChild(fillNotificationsContainer);
			}
		}
	});

})(jMod.Notification);


Notification.UpdateNotification = function(data){
	var options = jMod.extend(true, {
		'version': 'N/A',
		'script_name': null,
		'time': 'N/A',
		'icon': 'fa-download',
		'iconAnimation': '',
		'title': '%SCRIPTNAME% %VERSION% Available!',
		'body': '<i class="fa fa-clock-o"></i> <i>Updated %TIME%...</i>',
		'install': {
			'href': null,
			'onClick': null,
			'target': null,
			'text': 'Install'
		},
		'visit': {
			'href': null,
			'onClick': null,
			'target': '_blank',
			'text': 'Visit Page'
		}
	}, data);
	
	if(options.script_name == null)
		options.script_name = jConfig('script.script_name');
	
	var title = options.title.replace('%SCRIPTNAME%', options.script_name).replace('%VERSION%', options.version).replace('%TIME%', options.time);
	var body = options.body.replace('%SCRIPTNAME%', options.script_name).replace('%VERSION%', options.version).replace('%TIME%', options.time);
	
	if(!options.install.href || options.install.href == null || options.install.href == ''){
		options.install.href = jConfig(['script.script_info.jModdownloadURL', 'script.script_info.downloadURL']);
		if(typeof options.install.href === _undefined)
			options.install.href = 'javascript:void(0);';
	}
	//<span style="position:absolute;opacity:0.3;bottom:5px;left:10px;">click to close</span>
	
	var btnInstall = document.createElement("a");
	btnInstall.setAttribute('href', options.install.href);
	if(options.install.target != null)
		btnInstall.setAttribute('target', options.install.target);
	btnInstall.className = 'btn btn-success btn-sm';
	btnInstall.innerHTML = options.install.text;
	if(typeof options.install.onClick === "function")
		btnInstall.addEventListener("click", options.install.onClick);
	
	if(!options.visit.href || options.visit.href == null || options.visit.href == ''){
		if(typeof jConfig('script.script_info.homepage') !== _undefined)
			options.visit.href = jConfig('script.script_info.homepage');
		else
			options.visit.href = 'http://myuserjs.org/script/' + jConfig('script.username') + '/' + jConfig('script.script_name');
	}
	
	var btnVisit = document.createElement("a");
	btnVisit.setAttribute('href', options.visit.href);
	if(options.visit.target != null)
		btnVisit.setAttribute('target', options.visit.target);
	btnVisit.className = 'btn btn-warning btn-sm';
	btnVisit.innerHTML = options.visit.text;
	if(typeof options.visit.onClick === "function")
		btnVisit.addEventListener("click", options.visit.onClick);
	
	var btnClose = document.createElement("a");
	btnClose.setAttribute('href', 'javascript:void(0);');
	btnClose.className = 'btn btn-danger btn-sm';
	btnClose.innerHTML = 'Close';
	/*
	var footer = document.createElement("p");
	footer.className = 'text-align-right';
	footer.appendChild(btnInstall);
	footer.appendChild(btnVisit);
	footer.appendChild(btnClose);
	*/
	/*
	var footer = {
		type: 'p',
		style: 'text-align: right;',
		innerHTML: [
			btnInstall,
			btnVisit,
			btnClose
		]
	};
	*/
	var footer =[
		btnInstall,
		btnVisit,
		btnClose
	];
	
	Notification({
		'title': title,
		'body': body,
		'footer': footer,
		'icon': options.icon,
		'iconAnimation': options.iconAnimation,
		'type': 'small',
		//'onBeforeClose': tOnBeforeCloseCB,
		//'onAfterClose': tOnAfterCloseCB
	});
}

Notification.getElementId = function(name){
	switch(name.toLowerCase()){
		case 'wrapper':
		case 'notificationswrapper':
			return "jModNotificationsWrapper";
			break;
			
		case 'smallwrapper':
		case 'notificationssmallwrapper':
			return "jModSmallNotificationsWrapper";
			break;
			
		case 'largewrapper':
		case 'notificationslargewrapper':
			return "jModLargeNotificationsWrapper";
			break;
		
		case 'fillwrapper':
		case 'notificationsfillwrapper':
			return "jModFillNotificationsWrapper";
			break;
		
		default:
			return null;
			break;
	}
}

Notification.getElement = function(name){
	var tId = Notification.getElementId(name);
	if(tId != null)
		return document.getElementById(tId);
	return document.getElementById(name);
}

Notification.remove = function(notification, notificationNumber){
	if(notification != null){
		if(notification.hasAttribute('data-jmod-small-notification')){
			var tSib = notification;
			var oldTop = parseInt(notification.style.top || 0);
			if(oldTop <= 0) oldTop = 20;
			while(tSib.nextElementSibling != null && tSib.nextElementSibling.hasAttribute('data-jmod-small-notification')){
				tSib = tSib.nextElementSibling;
				tSib.className = 'jModSmallNotification SmallBox transitionUp';
				tSib.style.top = oldTop + 'px';
				oldTop = oldTop + parseInt(tSib.offsetHeight) + 25;
			}
		}
		notification.parentElement.removeChild(notification);
	}
}

Notification.Events = new EventsClass(['onBeforeClose', 'onAfterClose']);

Notification.close = function(data){
	var notificationsFullWrapper = Notification('getElement', 'notificationsWrapper');
	var el, num, type, attName = 'data-jmod-notification';
	if(typeof data === "number") {
		num = data;
		el = jMod.$('div['+attName+'="'+data+'"]', notificationsFullWrapper);

	} else if(isElement(data)) {
		if(data.hasAttribute(attName))
			el = data;
		else {
			if(!(el = jMod.$('div['+attName+']', data))){
				if(!(el = jMod.Element.findParentWithAttribute(data, attName)))
					return;
			}
		}
		num = parseInt(el.getAttribute(attName));
	} else {
		return;
	}
	
	if(type = el.getAttribute('data-jmod-notification-type'))
		Notification.Types.callMethod(type, 'close', el, num);
}

Notification.count = 0;
Notification.Initialized = false;

Notification.init = function(){
	if(!jConfig('Notifications.enabled'))
		return false;
	Notification.Initialized = true;
		
	var head = document.getElementsByTagName('head')[0];
	var body = document.getElementsByTagName('body')[0];

	// Add Notification Wrapper
	var notificationsFullWrapper = Notification('getElement', 'notificationsWrapper');
	if(notificationsFullWrapper == null){
		notificationsFullWrapper = document.createElement("div");
		notificationsFullWrapper.id = Notification('getElementId', 'notificationsWrapper');
		notificationsFullWrapper.className = 'jModNotificationsFullWrapper jmod-na jmod-fa';
		document.body.appendChild(notificationsFullWrapper);
	}
	
	Notification.Types.init();
}

jMod.CSS = '';

	
	/***********************************
	 ** Tabs
	 **********************************/
/**
 * Tabs Configuration Options
 * @name Tabs
 * @alias Tabs
 * @memberof jMod.Config
 * @example
 * // Get the current value of Ext.enabled
 * jMod('get', 'Tabs.enabled')
 * // or
 * jMod.Config('Tabs.enabled');
 * // or
 * jMod.Config.Tabs.enabled;
 */
/*jMod.Config.Tabs = {
	enabled: true,
	att: {
		li: 'data-jmod-tab',
		ul: 'data-jmod-tab-nav-g',
		ct: 'data-jmod-tab-cont-g',
		pane: 'data-jmod-tab-content'
	},
	cn: {
		nav: 'nav-tabs',
		ct: 'tab-content'
	}
}*/

jMod.Config.Tabs = jMod.extend({
	enabled: true,
	att: {
		li: 'data-jmod-tab',
		ul: 'data-jmod-tab-nav-g',
		ct: 'data-jmod-tab-cont-g',
		pane: 'data-jmod-tab-content'
	},
	cn: {
		nav: 'nav-tabs',
		ct: 'tab-content'
	}
}, jMod.Config.Tabs || {});

var Tabs = jMod.Tabs = function(data){

}
Tabs.Initialized = false;
Tabs.GroupCount = 0;
var TabAtt = Tabs.att = {};
var TabCn = Tabs.cn = {};

Object.defineProperties(Tabs.att, {
	li: {
		get: function(){
			return jConfig('Tabs.att.li');
		}
	},
	ul: {
		get: function(){
			return jConfig('Tabs.att.ul');
		}
	},
	ct: {
		get: function(){
			return jConfig('Tabs.att.ct');
		}
	},
	pane: {
		get: function(){
			return jConfig('Tabs.att.pane');
		}
	}
});


Object.defineProperties(Tabs.cn, {
	nav: {
		get: function(){
			return jConfig('Tabs.cn.nav');
		}
	},
	ct: {
		get: function(){
			return jConfig('Tabs.cn.ct');
		}
	}
});

Tabs.Events = new EventsClass(['onBeforeShow', 'onAfterShow']);
Tabs.handler = {
	click: function(e){
		var target = e.target;
		var targetLi = target.parentElement;
		if(this.contains(target) && target.nodeName == "A"){
			var content = this.parentElement.querySelector('.'+TabCn.ct);
			var href = getAttribute(target, "href");
			if(href){
				var activeContent = content.querySelector(".tab-pane.active");
				var activeLink = this.querySelector("li.active");
				
				var targetContent = content.querySelector(href);
				
				if(targetContent){
					var tabGroupNum = getAttribute(this, TabAtt.ul);
					if(Tabs.Events.fire('onBeforeShow', parseInt(tabGroupNum), this, [target, targetContent]) !== false){
						if(activeLink){
							removeClass(activeLink, "active");
						}
						
						if(activeContent){
							removeClass(activeContent, "active");
						}
						
						addClass(targetLi, "active");
						addClass(targetContent, "active");
						Tabs.Events.fire('onAfterShow', parseInt(tabGroupNum), this, [target, targetContent]);
					}
				}
			}
			eventCancel(e);
		}
	}
}

Tabs.load = function(data){
	var tabGroups, el, EventListeners;
	if(isElement(data))
		el = data;
	else if(typeof data === "object" && data.target) {
		el = data.target;
		el.onAfterResize = (function(modal){
			return function(){
				//console.log('Resize Tabs');
				//var tabsNav = jMod.$('.nav-tabs', modal);
				var tabsNav = this;
				if(!hasClass(tabsNav, 'nav-tabs')){
					tabsNav = jMod.$('.nav-tabs', tabsNav);
					if(!tabsNav)
						tabsNav = jMod.$('.nav-tabs', modal);
				}
				//console.log('tabsNav', tabsNav);
				//Tabs.resize(tabsNav);
				//console.log('onAfterResize: ', this, tabsNav, Slice.call(arguments));
				if(tabsNav)
					waitForComputeableWidth(tabsNav, resizeTabs);
					//resizeTabs(tabsNav);
			};
		})(el);
		EventListeners = data.EventListeners;
	} else
		return;
	if(hasClass(el, 'tabbable')) {
		tabGroups = [el];
	} else {
		tabGroups = jMod.$$('div.tabbable', el);
	}
	if(tabGroups){
		for(var i = 0; i < tabGroups.length; i++) {
			var tabNav = tabGroups[i].querySelector('.nav.'+TabCn.nav);
			var tabContent = tabGroups[i].querySelector('.'+TabCn.ct);
			if(tabNav && tabContent){
				tabNav.setAttribute(TabAtt.ul, Tabs.GroupCount);
				tabContent.setAttribute(TabAtt.ct, Tabs.GroupCount);
				if(typeof data === "object")
					Tabs.Events.addAll(data, Tabs.GroupCount);
				tabNav.addEventListener("click", Tabs.handler.click);
				Tabs.GroupCount++;
			}
		}
	}
}

Tabs.makeNavElement = function(data){
	var r = {
		type: 'li',
		id: data.id,
		className: (data.isActive || data.active ? 'active ' : '') + (data.className || data['class'] || ''),
		innerHTML: {
			type: 'a',
			innerHTML: data.name || data.innerHTML || data.text,
			attributes: {
				href: '#'+ (data.contentId || data.targetId),
				'data-toggle': 'tab'
			}
		},
		attributes: (data.attributes || {})
	};
	r.attributes[TabAtt.li] = data.index || -1;
	return r;
}

Tabs.makeContentElement = function(data){
	var r = {
		type: 'div',
		id: data.id,
		className: 'container tab-pane ' + (data.isActive || data.active ? 'active ' : '') + (data.className || data['class'] || ''),
		innerHTML: data.innerHTML || data.text || '',
		attributes: (data.attributes || {})
	};
	r.attributes[TabAtt.pane] = data.index || -1;
	return r;
}

Tabs.show = function(tabGroup, tab){
	var i, tmp, tabEl;
	if(typeof tabGroup === "number") {
		tabGroup = document.querySelector('ul['+TabAtt.ul+'="'+tabGroup+'"]');
	}
	if(isElement(tabGroup)){
		if(hasAttribute(tabGroup, TabAtt.li)){
			tabEl = tabGroup;
		} else if(typeof tab === "number"){
			tabEl = jMod.$$('li['+TabAtt.li+']', tabGroup)[tab];
		} else if(typeof tab === "string") {
			tmp = jMod.$$('li['+TabAtt.li+']', tabGroup);
			for(i = 0; i < tmp.length; i++){
				if(tmp[i].innerHTML == tab){
					tabEl = tmp[i];
					break;
				}
			}
		} else if(isElement(tab) && hasAttribute(tab, TabAtt.li)){
			tabEl = tab;
		}
		
		if(tabEl && isElement(tabEl))
			return fireClick(tabEl.querySelector('a[data-toggle="tab"]'));
	}
}

function waitForComputeableWidth(el, callback, count){
	var computedNav = (window || unsafeWindow).getComputedStyle(el, null),
		width = parseInt(computedNav.width);
	count = count || 0;
	if(count < 25 && (isNaN(width) || width > 300)){
		jMod.Element.requestAnimationFrame(function(){
			waitForComputeableWidth(el, callback, count + 1);
		});
	} else {
		callback(el);
	}
}

function resizeTabs(tabsNav){
	var width,
		computedNav,
		tabsContent = jMod.$('.tab-content', tabsNav.parentElement)
		//tabsContent = tabsNav.parentElement.querySelector('.tab-content');
	
	if(!tabsNav || !tabsContent || tabsContent.offsetParent === null)
		return;
	
	computedNav = (window || unsafeWindow).getComputedStyle(tabsNav, null);
	width = parseInt(computedNav.width);
	

	//width = parseInt(computedNav.getPropertyValue('width'));
	
	if(isNaN(width)){
		if(jMod.debug)
			jModLogWarning('Tabs.resize', 'Tab width is NaN!', tabsNav, tabsContent, computedNav);
	}else if(width > 300){
		if(jMod.debug)
			jModLogWarning('Tabs.resize', 'Tab width too wide!', width, tabsNav);
	}else if(width > 50){
		tabsContent.style.marginLeft = (width + 11) + 'px';
	}
}

Tabs.resize = function(tabsNav){
	//waitForComputeableWidth(tabsNav, resizeTabs);
	jMod.Element.requestAnimationFrame(function(){
		waitForComputeableWidth(tabsNav, resizeTabs);
	});
}

	/***********************************
	 ** Notifications
	 **********************************/
/**
 * Modal Configuration Options
 * @name Modal
 * @alias Modal
 * @memberof jMod.Config
 * @property {boolean} enabled is enabled
 * @example
 * // Get the current value of Modal.enabled
 * jMod('get', 'Modal.enabled')
 * // or
 * jMod.Config('Modal.enabled');
 * // or
 * jMod.Config.Modal.enabled;
 */
/*
jMod.Config.Modal = {
	enabled: true
}
*/
jMod.Config.Modal = jMod.extend({
		enabled: true,
		cn: {
			container: 'jModModalContainer'
		},
		id: {
			container: 'jModModalContainer'
		}
	}, jMod.Config.Modal || {});
var Modal_ContainerElementClass_Key = 'Modal.cn.container';
var Modal_ContainerElementId_Key = 'Modal.id.container';
/**
 * @namespace jMod.Modal
 * @memberOf jMod
 * @since 0.0.14
 */
 
/**
 * @function Modal
 * @memberof jMod
 * @variation 2
 * @param {(string|object)} data - (string) Command to execute | (object) options for new modal to display
 * @param {(object|boolean)} [data2] - (object) Arguments for command | (boolean) show new modal immediately
 */
var Modal = jMod.Modal = function(data, data2){
	if(!jConfig('Modal.enabled'))
		return false;
	if(!jMod.Modal.Initialized){
		jMod.Modal.init();
	}
	try{
		if(typeof data === "string"){
			switch(data.toLowerCase()){
				case 'show':
				case 'showmodal':
					return jMod.Modal.show.apply(jMod.Modal, Slice.call(arguments, 1));
					break;
				case 'hide':
				case 'hidemodal':
					return jMod.Modal.hide.apply(jMod.Modal, Slice.call(arguments, 1));
					break;
				/*
				case 'get':
				case 'getelement':
					return jMod.Modal.getElement.apply(jMod.Modal, Slice.call(arguments, 1));
					break;
				case 'getid':
				case 'getelementid':
					return jMod.Modal.getElementId.apply(jMod.Modal, Slice.call(arguments, 1));
					break;
				*/
			}
		} else if(typeof data === "object") {
			var newModal = jMod.Modal.createModal(data);
			
			var modalNum = parseInt(getAttribute(newModal, 'data-jmod-modal'));
			
			var newModalBackdrop = createNewElement({
				type: 'div',
				id: 'jModModal-' + modalNum + '-backdrop',
				className: 'modal-backdrop fade',
				style: 'display: none;',
				attributes: {
					role: 'dialog',
					tabindex: '-1',
					'data-jmod-modal-backdrop': modalNum
				},
				EventListeners: {
					click: {
						capture: false,
						callback: function(e){
							if(e.target !== this)
								return;
							//this.style = 'display:none;';
							this.style.display = 'none';
							removeClass(document.body, 'jmod-modal-open');
							eventCancel(e);
							return false;
						}
					}
				}
			});
			
			var modalContainer = Modal.Container;
			
			if(modalContainer){
				modalContainer.appendChild(newModalBackdrop);
				modalContainer.appendChild(newModal);
			}
			
			jMod.Modal.Modals[modalNum] = {
				index: modalNum,
				element: newModal,
				lockScreen: data.lockScreen || true,
				data: data
			};
			
			if(typeof data.features !== _undefined){
				jMod.Modal.addJSFeatures(newModal, data.features);
			}
			
			if(data2 === true){
				// show right away
				jMod.Modal.show(newModal);
			}

			return newModal;
		}
	}catch(e){
		//console.log('error, jMod.Modal', e);
		jModLogError(e, 'jMod.Modal');
	}
}
var _ModalContainer;
Object.defineProperties(Modal, {
	fn: {value: Modal.__proto__},
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
		get: function(){
			if(_ModalContainer) return _ModalContainer;
			return (_ModalContainer = document.getElementById(jConfig(Modal_ContainerElementId_Key)));
		},
		set: function(value){
			_ModalContainer = value;
		}
	}
	//Modal.Container
});

const fadeAnimationLength = 150;

/**
 * Get a modal by its index
 * @function getModal
 * @memberof jMod.Modal
 * @param {number} number Index to search for
 * @returns {Element} DOM Element
 */
Modal.getModal = function(number){
	var modal = jMod.$('div[data-jmod-modal="'+number+'"]');
	if(modal)
		return modal;
	if(typeof Modal.Modals[number] !== _undefined)
		return Modal.Modals[number].element;
	return null;
}

Modal.addJSFeatures = function(modal, features){
	if(features.enableTabs){
		jMod.Tabs.load({
			target: modal,
			onBeforeShow: function(){
				console.log('Tabs onBeforeShow: ', arguments);
			}
		});
	}
	
	if(features.enableTooltips){
		Tooltip(modal);
	}
}

Modal.getVisibleModals = function(){
	var i = 0, r = [], modals = jMod.$$('div.modal.in[data-jmod-modal]', Modal.Container);
	for( ; i < modals.length; i++){
		r.push([modals[i], modals[i].getAttribute('data-jmod-modal')]);
	}
	return r;
}

Modal.getModal2 = function(){
	var i = 0,
		length = arguments.length,
		arg, modal, modalNum;
	if(length > 0){
		for( ; i < length; i++){
			arg = arguments[i];
			if(isElement(arg)){
				return arg;
			} else if(typeof arg == "string" || typeof arg == "number"){
				modalNum = parseInt(modalNum);
			}
		}
		
		if(modalNum != null){
			if((modal = jMod.$('div[data-jmod-modal="'+modalNum+'"]', Modal.Container)) && isElement(modal)){
				return modal;
			}
			
			if(typeof Modal.Modals[modalNum] != _undefined)
				return Modal.Modals[modalNum].element;
		}
	}
	return null;
}

var modalResizingAttrName = 'data-jmod-modal-resizing';

Modal.resize = function(){
	var	modalNum, evt, i, arg, viewportHeight,
		_dialog, _content, _body, _footer, _header, _modal,
		_dialogRect,
		length = arguments.length;
	
	for(i = 0; i < length; i++){
		arg = arguments[i];
		if(typeof arg == "number" || typeof arg == "string"){
			modalNum = parseInt(arg);
		} else if(isElement(arg)){
			_modal = arg;
		} else if(isEvent(arg)){
			evt = arg;
		}
	}
	
	if(_undefined==typeof _modal && _undefined==typeof modalNum){
		var modals = Modal.getVisibleModals();
		for(i = 0; i < modals.length; i++){
			Modal.resize(modals[i][0], modals[i][1], evt);
		}
		return;
	}
	
	if(!_modal)
		_modal = Modal.getModal2(_modal, modalNum);
	if(_modal && isElement(_modal)){
		if(getAttribute(_modal, modalResizingAttrName, 'boolean')){
			if(_modal.__resizeLast__ == null){
				return;
			}
			jMod.Element.cancelAnimationFrame(_modal.__resizeLast__);
			_modal.__resizeLast__ = null;
		}
		
		// Prevent resizing without canceling timer first
		_modal.setAttribute(modalResizingAttrName, 'true');
		
		viewportHeight = parseInt(jMod.Element.viewportSize.getHeight());
		
		_dialog = jMod.$('.modal-dialog', _modal);
		_dialogRect = jMod.Element.getClientRect(_dialog);
		
		if(parseInt(_dialogRect.bottom) <= viewportHeight && !_modal.hasVerticalScrollBar()){
			addClass(_modal, 'no-vertical-scroll');
		}
		
		try{
			if(Modal.Events.fire('onBeforeResize', modalNum, _modal, evt) === false){
				_modal.setAttribute(modalResizingAttrName, 'false');
				return;
			}
		}catch(e){
			jModLogError(e, 'jMod.Modal.resize', 'Error firing event "onBeforeResize"');
			return;
		}
		
		//if(modalNum == null && hasAttribute(_modal, 'data-jmod-modal')){
		if(modalNum == null){
			modalNum = getAttribute(_modal, 'data-jmod-modal', 'integer');
		}
		
		_modal.__resizeLast__ = jMod.Element.requestAnimationFrame(function(){
			// Prevent cancel attempt while running
			_modal.__resizeLast__ = null;
			_modal.__resizeLastStartY__ = 0;
			_modal.__resizeLastEndY__ = 0;
			_modal.__resizeLastCurrentY__ = null;
			_modal.__resizeLastCount__ = 0;
			
			// Only resize if modal is visible
			if(_modal.style.display != "none"){
				if(_modal.__restoreVerticalScroll__ != null){
					clearTimeout(_modal.__restoreVerticalScroll__);
					_modal.__restoreVerticalScroll__ = null;
				}
				
				viewportHeight = parseInt(jMod.Element.viewportSize.getHeight());
				
				//_dialog = jMod.$('.modal-dialog', _modal);
				_body   = jMod.$('.modal-body',   _dialog);
				_footer = jMod.$('.modal-footer', _dialog);
				_header = jMod.$('.modal-header', _dialog);
				
				
				var resizeAnimFunction
					_bodyCurrentHeight = parseInt(jMod.Element.getCompStyle(_body, 'height')),
					_bodyCurrentMaxHeight = parseInt(jMod.Element.getCompStyle(_body, 'maxHeight')),
					_bodyMinHeight = parseInt(jMod.Element.getCompStyle(_body, 'minHeight')),
					computedDialog = jMod.Element.getCompStyleObj(_dialog),
					marginTop = parseInt(computedDialog.getPropertyValue('margin-top')),
					marginBottom = parseInt(computedDialog.getPropertyValue('margin-bottom')),
					maxHeight = (viewportHeight - parseInt(_header.offsetHeight) - parseInt(_footer.offsetHeight) - marginTop - marginBottom) - 15;
					
				if(_bodyMinHeight > maxHeight){
					maxHeight = _bodyMinHeight;
				}
				
				if(_bodyCurrentMaxHeight != maxHeight){

					
					_modal.__resizeLastCurrentY__ = _bodyCurrentMaxHeight;
					_modal.__resizeLastStartY__ = _bodyCurrentMaxHeight;
					_modal.__resizeLastEndY__ = parseInt(maxHeight);
					
					
					resizeAnimFunction = function(){
						var tmpId = _modal.__resizeLast__;
						_modal.__resizeLastCount__++;
						
						if(_modal.__resizeLastCount__ > 50){
							_body.style.maxHeight = _modal.__resizeLastEndY__ + 'px';
							return;
						}
						
						var current = _modal.__resizeLastCurrentY__ != null && !isNaN(parseInt(_modal.__resizeLastCurrentY__)) ? _modal.__resizeLastCurrentY__ : parseInt(jMod.Element.getCompStyle(_body, 'maxHeight'));
						var duration = parseInt( 300 / 16.66666, 10 ) / 4;
						var remaining = _modal.__resizeLastEndY__ - current;
						
						var time = timeFromPosition( parseInt(_modal.__resizeLastStartY__), remaining, duration, current );
						if(isNaN(time))
							time = 0;
						else if(time < 0)
							time = time * -1;
						if(remaining != 0){
							var delta;
							
							if ( remaining > 0 ) {
								delta = Math.max( 1, easeOutSin( remaining, duration, time ));
							} else {
								delta = Math.min( -1, easeOutSin( remaining, duration, time ));
							}
							
							if(delta == 0 || isNaN(delta)){
								_body.style.maxHeight = _modal.__resizeLastEndY__ + 'px';
								return;
							}
							
							_modal.__resizeLastCurrentY__ = current + delta;
							
							
							_body.style.maxHeight = _modal.__resizeLastCurrentY__ + 'px';
							
							if(_modal.__resizeLast__ == null || _modal.__resizeLast__ == tmpId){
								if(_modal.__resizeLastCurrentY__ != _modal.__resizeLastEndY__ && _modal.__resizeLastCurrentY__ != null){
									_modal.__resizeLast__ = jMod.Element.requestAnimationFrame(resizeAnimFunction);
								} else {
									_modal.__resizeLast__ = null;
								}
								return;
							}
						}
					};
					//resizeAnimFunction();
					_modal.__resizeLast__ = jMod.Element.requestAnimationFrame(resizeAnimFunction);
					
					//_body.style.maxHeight = maxHeight + 'px';
				}
				
				_dialogRect = jMod.Element.getClientRect(_dialog);
				
				if(parseInt(_dialogRect.bottom) > viewportHeight && parseInt(_dialogRect.height) < (_bodyMinHeight + parseInt(_header.offsetHeight) + parseInt(_footer.offsetHeight) + 15)){
					removeClass(_modal, 'no-vertical-scroll');
				} else {
					_modal.__restoreVerticalScroll__ = setTimeout(function(_modal, modalResizingAttrName){
						_modal.__restoreVerticalScroll__ = null;
						//if(!getAttribute(_modal, modalResizingAttrName, 'boolean') || _modal.__resizeLast__ == null){
						if(!getAttribute(_modal, modalResizingAttrName, 'boolean')){
							removeClass(_modal, 'no-vertical-scroll');
						}
					}, 100, _modal, modalResizingAttrName);
				}
			}
			
			try{
				Modal.Events.fire('onAfterResize', modalNum, _modal, evt);
			}catch(e){
				jModLogError(e, 'jMod.Modal.resize', 'Error firing event "onAfterResize"');
			}
			
			// Release lock on resize events
			_modal.setAttribute(modalResizingAttrName, 'false');
		});
	}
}

Modal.show = function(modal, modalNum, e){
	try{
		//console.log('jMod.Modal.CurrentModal', jMod.Modal.CurrentModal);
		//var doc = jMod.Element.document;
		if(typeof modal === "number" && typeof modalNum !== "number"){
			if(typeof e === _undefined && typeof modalNum !== _undefined)
				e = modalNum;
			modalNum = modal;
		}
		if((typeof modal === _undefined || modal == null) && typeof modalNum === _undefined)
			return;
		if((typeof modal === _undefined || modal == null || typeof modal === "number") && typeof modalNum === "number"){
			modal = jMod.$('div[data-jmod-modal="'+modalNum+'"]');
		} else if(typeof modal !== _undefined && modal != null && typeof modalNum === _undefined){
			modalNum = getAttribute(modal, 'data-jmod-modal');
		}
		
		if(Modal.CurrentModal != -1 && Modal.CurrentModal != modalNum){
			Modal.hide();
		}
		
		if(modal){
			//var modalBackdrop = doc.querySelector('div[data-jmod-modal-backdrop="'+modalNum+'"]');
			var modalBackdrop = jMod.$('div[data-jmod-modal-backdrop="'+modalNum+'"]');
			//console.log('jMod.Modal.show', modal, modalNum, e || null);
			var r = Modal.Events.fire('onBeforeShow', modalNum, modal, [e || null]);
			Modal.CurrentModal = modalNum;
			addClass(jMod.Element.document.body, 'jmod-modal-open');
			modalBackdrop.style.display = 'block';
			modal.style.display = 'block';
			setTimeout(function(modal, modalBackdrop){
				addClass(modalBackdrop, 'in');
				addClass(modal, 'in');
				jMod.Element.requestAnimationFrame(function(){
					Modal.resize(modal);
				});
			}, 1, modal, modalBackdrop);
			setTimeout(function(modal, modalNum, e){
				Modal.Events.fire('onAfterShow', modalNum, modal, [e || null]);
			}, fadeAnimationLength, modal, modalNum, e || null);
			

		}
	}catch(e){
		//console.log('Error jMod.Modal.show', e);
		jModLogError(e, 'jMod.Modal.show');
	}
}

Modal.hide = function(modal, modalNum, e){
	try{
		if(typeof modal === _undefined && typeof modalNum === _undefined && Modal.CurrentModal != -1){
			modalNum = Modal.CurrentModal;
			modal = Modal.getModal(Modal.CurrentModal);
		}
		
		if(typeof modal === "number" && typeof modalNum !== "number"){
			if(typeof e === _undefined && typeof modalNum !== _undefined)
				e = modalNum;
			modalNum = modal;
		}
		if(typeof modal === _undefined && typeof modalNum === _undefined){
			return;
		}
		
		if(!isElement(modal) && typeof modalNum === "number"){
			modal = Modal.getModal(modalNum);
		} else if(typeof modal !== _undefined && typeof modalNum === _undefined){
			modalNum = getAttribute(modal, 'data-jmod-modal');
		}
		
		if(modal){
			//var modalBackdrop = jMod.Element.document.querySelector('div[data-jmod-modal-backdrop="'+modalNum+'"]');
			var modalBackdrop = jMod.$('div[data-jmod-modal-backdrop="'+modalNum+'"]');
			var r = Modal.Events.fire('onBeforeHide', modalNum, modal, [e || null]);
			Modal.CurrentModal = -1;
			removeClass(jMod.Element.document.body, 'jmod-modal-open');
			removeClasses(modal, ['in', 'no-vertical-scroll']);
			//no-vertical-scroll
			removeClass(modalBackdrop, 'in');
			setTimeout(function(modal, modalNum, e, modalBackdrop){
				modal.style.display = 'none';
				modalBackdrop.style.display = 'none';
				Modal.Events.fire('onAfterHide', modalNum, modal, [e || null]);
			}, fadeAnimationLength, modal, modalNum, e || null, modalBackdrop);
		}
	}catch(e){
		//console.log('Error jMod.Modal.hide', e);
		jModLogError(e, 'jMod.Modal.hide');
	}
}
var modalEventNames = ['onBeforeShow', 'onAfterShow', 'onBeforeHide', 'onAfterHide', 'onBeforeResize', 'onAfterResize'];
Modal.Events = new EventsClass(modalEventNames);

Modal.createModal = function(data){
	var newModalNum = Modal.ModalCount++;
	
	Modal.Events.addAll(data, newModalNum);
	
	var newModal = createNewElement({
		type: 'div',
		id: data.id || 'jModModal-'+newModalNum,
		className: 'modal fade ' + (data.className || data['class'] || ''),
		style: 'display: none;',
		attributes: {
			role: 'dialog',
			tabindex: '-1',
			'data-jmod-modal': newModalNum
		},
		EventListeners: {
			click: {
				capture: false,
				callback: function(e){
					if(e.target !== this)
						return;
					var modal = e.target;
					var modalNum = parseInt(getAttribute(modal, 'data-jmod-modal'));
					Modal.hide(modal, modalNum, e);
					eventCancel(e);
					return false;
				}
			}
		}
	});
	
	for(var i = 0; i < modalEventNames.length; i++){
		
		Object.defineProperty(newModal, modalEventNames[i], {
			get: (function(evtName, modalEl, modalNum){
					return function(){
						Modal.Events.getAll(modalNum, evtName);
					}.bind(modalEl);
				}).call(newModal, modalEventNames[i], newModal, newModalNum),
			set: (function(evtName, modalEl, modalNum){
					return function(newListener){
						Modal.Events.add(modalNum, evtName, newListener);
					}.bind(modalEl);
				}).call(newModal, modalEventNames[i], newModal, newModalNum),
			enumerable: true,
			configurable: false
		});
	}
	
	newModal.hasVerticalScrollBar = function(){
		var overflowY = jMod.Element.getCompStyle(this, "overflowY");
		if(this.offsetParent === null || overflowY == "hidden" || overflowY == "visible")
			return false;
		
		return (overflowY == "scroll" || this.scrollHeight > jMod.Element.viewportSize.getHeight());
	}.bind(newModal);
	
	// Dialog Container
	var newModalDialog = createNewElement({
		type: 'div',
		className: 'modal-dialog',
	});
	if(typeof data.style !== _undefined){
		for(var styleName in data.style){
			newModalDialog.style[styleName] = data.style[styleName];
		}
	}
	
	newModal.appendChild(newModalDialog);
	
	// Content Container
	var newModalContent = createNewElement({
		type: 'div',
		className: 'modal-content',
	});
	newModalDialog.appendChild(newModalContent);
	
	// Header
	var newModalHeader = createNewElement({
		type: 'div',
		className: 'modal-header',
	});
	newModalContent.appendChild(newModalHeader);
	
	// Body
	var newModalBody = createNewElement({
		type: 'div',
		className: 'modal-body'
	});
	
	/*
	setTimeout(function(newModalBody){
		jMod.Scrollbar(newModalBody);
	}, 1000, newModalBody);
	*/
	
	newModalContent.appendChild(newModalBody);
	
	// Footer
	var newModalFooter = createNewElement({
		type: 'div',
		className: 'modal-footer',
	});
	newModalContent.appendChild(newModalFooter);
	
	// Title
	appendChild(newModalHeader, data.title);
	
	// Title Close Button
	var newModalTitleCloseButton = createNewElement({
		type: 'div',
		className: 'yt-close-btn-wrapper',
		innerHTML: '<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-close-btn">',
		EventListeners: {
			click: {
				capture: false,
				callback: function(e){
					var modal = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
					var modalNum = parseInt(getAttribute(modal, 'data-jmod-modal'));
					return Modal.hide(modal, modalNum, e);
					//eventCancel(e);
					//return false;
				}
			}
		}
	});
	/*
	var newModalTitleCloseButton = createNewElement({
		type: 'button',
		className: 'close',
		innerHTML: 'x',
		attributes: {
			type: 'button',
		},
		EventListeners: {
			click: {
				capture: false,
				callback: function(e){
					var modal = e.target.parentElement.parentElement.parentElement.parentElement;
					var modalNum = parseInt(modal.getAttribute('data-jmod-modal'));
					return jMod.Modal.hide(modal, modalNum, e);
				}
			}
		}
	});
	*/
	
	newModalHeader.appendChild(newModalTitleCloseButton);
	
	// Body Content
	appendChild(newModalBody, data.body);
	
	// Footer Content
	appendChild(newModalFooter, data.footer);
	
	// Footer Buttons
	if(typeof data.buttons !== _undefined){
		for(var i in data.buttons){
			try{
				var newButtonArgs = jMod.extend(true, {
					type: 'button',
					text: 'button'
				}, data.buttons[i]);
				var newButton = createNewElement(newButtonArgs);
				if(newButton){
					if(!hasClass(newButton, 'btn'))
						addClass(newButton, 'brn');
					//if(hasClasses(newButton, ['btn-default']).length <= 0){
					if(!(/btn\-(default|primary|success|info|warning|danger)/i.test(newButton.className)))
						addClass(newButton, 'btn-default');
					newModalFooter.appendChild(newButton);
				}
			} catch(e){
				//console.log('error! footer buttons: ', e);
				jModLogError(e, 'jMod.Modal.createModal', 'footer buttons');
			}
		}
	}
	
	// Footer Close Button
	var newModalFooterCloseButton = createNewElement({
		type: 'button',
		className: 'btn btn-default',
		innerHTML: 'Close',
		attributes: {
			type: 'button',
		},
		EventListeners: {
			click: {
				capture: false,
				callback: function(e){
					if(e.target !== this)
						return;
					var modal = e.target.parentElement.parentElement.parentElement.parentElement;
					var modalNum = parseInt(getAttribute(modal, 'data-jmod-modal'));
					Modal.hide(modal, modalNum, e);
					eventCancel(e);
					return false;
				}
			}
		}
	});
	newModalFooter.appendChild(newModalFooterCloseButton);
	
	return newModal;
}

Modal.init = function(){
	Modal.Initialized = true;
	
	var modalContainer = Modal.Container;
	if(modalContainer == null){
		modalContainer = jMod.Element.document.createElement("div");
		modalContainer.id = jConfig(Modal_ContainerElementId_Key);
		modalContainer.className = 'jmod-na jmod-fa jmod-gi ' + jConfig(Modal_ContainerElementClass_Key);
		jMod.Element.document.body.appendChild(modalContainer);
	}
	
	(window || unsafeWindow).addEventListener('resize', function(e){
		jMod.Modal.resize(e);
	});
	
}

jMod.CSS = '.jmod-na .nav.nav-tabs{border-width:0px;border-right-width:1px !important;border-style:solid !important;-webkit-border-image:-webkit-gradient(linear,0 0,0 100%,from(rgba(221,221,221,1)),color-stop(65%,rgba(221,221,221,1)),to(rgba(0,0,0,0))) 1 100%;-webkit-border-image:-webkit-linear-gradient(rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;-moz-border-image:-moz-linear-gradient(rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;-o-border-image:-o-linear-gradient(rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;border-image:linear-gradient(to bottom,rgba(221,221,221,1) 65%,rgba(221,221,221,1),rgba(0,0,0,0)) 1 100%;}.jmod-na .no-vertical-scroll[data-jmod-modal]{overflow-y:hidden;}';


	/***********************************
	 ** Settings
	 **********************************/
/**
 * Settings Configuration Options
 * @name Settings
 * @alias Settings
 * @memberof jMod.Config
 * @property {boolean} enabled is enabled
 * @example
 * // Get the current value of Settings.enabled
 * jMod('get', 'Settings.enabled')
 * // or
 * jMod.Config('Settings.enabled');
 * // or
 * jMod.Config.Settings.enabled;
 */
/*
jMod.Config.Settings = {
	enabled: true
}
*/
jMod.Config.Settings = jMod.extend({
		enabled: true,
		cn: {
			modal: 'jModSettingsModal'
		},
		id: {
			modal: 'jModSettingsModal'
		}
	}, jMod.Config.Settings || {});
var Settings_ModalElementId_Key = 'Settings.id.modal';
var Settings_ModalElementClass_Key = 'Settings.cn.modal';

/**
 * @namespace jMod.Settings
 * @memberOf jMod
 * @since 0.0.14
 */

/**
 * @function Settings
 * @memberof jMod
 * @variation 2
 * @param {(string|object)} data - (string) Command to execute | (object) options for new settings modal
 * @param {(object|boolean)} [data2] - (object) Arguments for command | (boolean) show new settings modal immediately
 */
var Settings = jMod.Settings = function(data, data2){
	if(!jConfig('Settings.enabled'))
		return false;
	if(!jMod.Settings.Initialized){
		jMod.Settings.init();
	}
	//try{
		if(typeof data === "string"){
			switch(data.toLowerCase()){
				case '':
					
					break;
			}
		} else if(typeof data === "object") {
			Settings._data = data;
			
			jMod.Settings.__storedData = undefined;
			
			//jMod.Settings._settingsModalElement = undefined;
			
			jMod.Settings.settingsModalElement = jMod.Settings.MakeSettingsModal(data);
			
			Settings.PrefTypes.onChange();
			/*
			//var win = (window || unsafeWindow);
			var runningResizeCB = false;
			window.addEventListener('resize', function(e){
				if(!runningResizeCB){
					runningResizeCB = true;
					//var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
					if (window.requestAnimationFrame) {
						window.requestAnimationFrame(function(){
							jMod.Settings.onResize();
							runningResizeCB = false;
						});
					} else {
						setTimeout(function(){
							jMod.Settings.onResize();
							runningResizeCB = false;
						}, 66);
					}
				}
			}, false );
			
			*/
			//window.addEventListener('resize', jMod.Settings.onResize, false);
			
			jMod.Settings.onResize();
		}
	/*
	}catch(e){
		console.log('error, jMod.Settings');
		console.error(e);
	}
	*/
};

Settings.Initialized = false;

Settings.getDefault = function(prefName){
	var i = 0, data = Settings._data;
	if(data && (data = data.settings)){
		for(i; i < data.length;i++){
			if(data[i].name == prefName)
				return data[i]['default'];
		}
	}
}

Settings.get = function(prefName, noDefault){
	var storedData = Settings._storedData;
	if(_undefined===typeof prefName)
		return storedData;
	return (storedData && storedData[prefName] !== undefined ? storedData[prefName] : (noDefault ? undefined : Settings.getDefault(prefName)));
}

Settings.set = function(prefName, value){
	var storedData = Settings._storedData || {};
	storedData[prefName] = value;
	Settings._storedData = storedData;
}

Settings.clear = function(){
	Settings._storedData = {};
}

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
		get: function(){
			if(typeof Settings.__storedData !== _undefined)
				return Settings.__storedData;
			try{
				var str = jMod.getValue('Settings_' + jConfig('script.script_name'));
				if(str)
					return JSON.parse(str);
			}catch(e){}
			//return undefined;
		},
		set: function(obj){
			Settings.__storedData = obj;
			try{
				jMod.setValue('Settings_' + jConfig('script.script_name'), JSON.stringify(obj));
			}catch(e){}
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
		get: function(){
			if(_undefined!==typeof Settings._settingsModalElement && Settings._settingsModalElement != null)
				return Settings._settingsModalElement;
			return (Settings._settingsModalElement = jMod.$('.jModSettings'));
		},
		set: function(value){
			Settings._settingsModalElement = value;
		},
		enumerable: true
	}
});

Settings.PrefTypes = {
	_types: {},
	_call: function(fName, typeName, data){
		if(typeof this._types[typeName] !== _undefined && typeof this._types[typeName][fName] === "function")
			return this._types[typeName][fName].apply(this._types[typeName], Slice.call(arguments, 2));
		return undefined;
	},
	add: function(typeName, data){
		this._types[typeName] = data;
	},
	make: function(typeName, data){
		return this._call('make', typeName, data);
	},
	getValue: function(data){
		var prefEl = jMod.$('#jModSettingsModal [name="'+data.name+'"]');
		return (prefEl ? this._call('getValue', data.type, prefEl, data) : undefined);
	},
	getValueByName: function(name){
		var data, i = 0;
		try{
			data = Settings._data.settings;
		} catch(e) {return;}
		for(i; i < data.length; i++){
			if(data[i].name == name){
				return this.getValue(data[i]);
			}
		}
	},
	getDataByName: function(name){
		var data, i = 0;
		try{
			data = Settings._data.settings;
		} catch(e) {return;}
		for(i; i < data.length; i++){
			if(data[i].name == name){
				return data[i];
			}
		}
	},
	setValue: function(data, value){
		var prefEl = jMod.$('#jModSettingsModal [name="'+data.name+'"]');
		return (prefEl ? this._call('setValue', data.type, prefEl, data, value) : undefined);
	},
	enable: function(_data){
		var data, sData, prefEl, i = 0;
		if(typeof _data == "object"){
			data = _data;
		} else if(typeof _data == "string"){
			try{
				sData = Settings._data.settings;
			} catch(e) {return;}
			for(i; i < sData.length; i++){
				if(sData[i].name == _data){
					data = sData[i];
					break;
				}
			}
		}
		if(data){
			prefEl = jMod.$('#jModSettingsModal [name="'+data.name+'"]');
			return (prefEl ? this._call('enable', data.type, prefEl, data) : undefined);
		}
	},
	disable: function(_data){
		var data, sData, prefEl, i = 0;
		if(typeof _data == "object"){
			data = _data;
		} else if(typeof _data == "string"){
			try{
				sData = Settings._data.settings;
			} catch(e) {return;}
			for(i; i < sData.length; i++){
				if(sData[i].name == _data){
					data = sData[i];
					break;
				}
			}
		}
		if(data){
			prefEl = jMod.$('#jModSettingsModal [name="'+data.name+'"]');
			return (prefEl ? this._call('disable', data.type, prefEl, data) : undefined);
		}
	},
	onChange: function(name, newValue){
		var data, depend, dependName, dependValue, x, enable = true, type, prefEl, multiValue = false, i = 0;
		try{
			data = Settings._data.settings;
		} catch(e) {return;}
		for(i; i < data.length; i++){
			enable = true;

			// Find anything that depends on this value or has a global depend function
			if(data[i].depend && ("function"===typeof data[i].depend||_undefined==typeof name||_undefined!==typeof data[i].depend[name])){
				if(typeof data[i].depend === "function"){
					prefEl = jMod.$('#jModSettingsModal [name="'+data[i].name+'"]');
					enable = data[i].depend(prefEl, data[i]);
				} else {
					for(dependName in data[i].depend){
						depend = data[i].depend[dependName];
						type = typeof depend;
						var dependData = Settings.PrefTypes.getDataByName(dependName);
						try{
							multiValue = Settings.PrefTypes._types[dependData.type].multiValue == true;
						}catch(e){
							multiValue = false;
						}
						
						if(name == dependName){
							dependValue = newValue;
						} else {
							if(_undefined==typeof (dependValue = this.getValueByName(dependName)))
								dependValue = Settings.get(dependName);
						}
						
						if(multiValue){
							dependValue = dependValue.split(',');
						}
						
						switch(type){
							case "function":
								enable = depend(
									jMod.$('#jModSettingsModal [name="'+data[i].name+'"]'),
									data[i],
									dependValue,
									dependData
								);
								break;
							case "object":
								if(RealTypeOf(depend) == "array"){
									if(multiValue){
										for(x = 0; x < depend.length; x++){
											if(dependValue.indexOf(depend[x]) == -1){
												enable = false;
												break;
											}
										}
									} else {
										enable = false;
										for(x = 0; x < depend.length; x++){
											if(depend[x] == dependValue){
												enable = true;
												break;
											}
										}
									}
								}
								break;
							case "string":
								if(multiValue){
									depend = depend.split(',');
									for(x = 0; x < depend.length; x++){
										if(dependValue.indexOf(depend[x]) == -1){
											enable = false;
											break;
										}
									}
								} else {
									if(dependValue != depend)
										enable = false;
								}
								break;
							case "number":
								if(multiValue){
									if(dependValue.length < depend){
										enable = false;
									}
								} else {
									if(parseInt(dependValue) != parseInt(depend))
										enable = false;
								}
								break;
						}
						
						if(!enable)
							break;
					}
				}
				if(enable)
					Settings.PrefTypes.enable(data[i]);
				else
					Settings.PrefTypes.disable(data[i]);
			}
		}
	}
}

Settings.getElementId = function(name){
	switch(name.toLowerCase()){
		case 'settings':
		case 'settingselement':
		case 'settingmodalselement':
			return "jModSettingsModal";
			break;
	}
	return null;
}

Settings.getElement = function(name){
	var tId = Settings.getElementId(name);
	if(tId != null)
		return document.getElementById(tId);
	return document.getElementById(name);
}



function getIcon(data){
	var iconName = data.name;
	var tmp = iconName.split(' ');
	if(tmp.indexOf('fa') == -1 && tmp.indexOf('glyphicon') == -1){
		if(iconName.indexOf('fa-') != -1)
			iconName = 'fa ' + iconName;
		else if(iconName.indexOf('glyphicon-') != -1)
			iconName = 'glyphicon ' + iconName;
	}
	
	var iconOpts = {
		type: 'i',
		className: iconName,
		attributes: {}
	};
	
	if(data.tooltip){
		iconOpts = setTooltipProperties(iconOpts, data.tooltip);
	}
	
	return iconOpts;
}

// Input Types

Settings.PrefTypes.add('select', {
	make: function(data){
		var text = data.description || data.name;
		var defaultValue = data['default'] || null;
		var storedValue = Settings.get(data.name);
		var currentValue = storedValue || defaultValue;
		var options = [];
		
		for(var optionName in data.options){
			options.push({
				type: 'option',
				innerHTML: data.options[optionName],
				attributes: {
					value: optionName,
					selected: (currentValue && currentValue == optionName ? true : null)
				}
			});
		}
		
		var opts = {
			type: 'div',
			className: 'pref-container',
			innerHTML: {
				type: 'select',
				className: 'form-control pref',
				innerHTML: options,
				style: data.style,
				attributes: {
					'name': data.name,
					'data-jmod-settings-pref': data.name,
					'data-jmod-settings-pref-default': data['default'] || null,
					'data-jmod-settings-pref-type': 'select'
				},
				EventListeners: {
					change: function(e){
						Settings.PrefTypes.onChange(e.target.getAttribute('name'), e.target.value);
					}
				}
			}
		};
		
		if(_undefined!=typeof data['tooltip'] && (_undefined!=typeof data.tooltip['innerHTML'] || _undefined!=typeof data.tooltip['text'])){
			opts.innerHTML = setTooltipProperties(opts.innerHTML, data.tooltip);
		}
		
		return opts;
	},
	getValue: function(prefEl, data){
		return prefEl.options[prefEl.selectedIndex].value;
	},
	setValue: function(prefEl, data, value){
		for (var i = 0; i < prefEl.options.length; i++) {
			if(prefEl.options[i].value == value){
				prefEl.selectedIndex = i;
				return true;
			}
		}
		return false;
	},
	enable: function(prefEl, data){
		if(prefEl.hasAttribute('disabled'))
			prefEl.removeAttribute('disabled');
	},
	disable: function(prefEl, data){
		prefEl.setAttribute('disabled', 'disabled');
	}
});



Settings.PrefTypes.add('checkbox', {
	multiValue: true,
	make: function(data){
		var text = data.description || data.name;
		var defaultValue = data['default'] || '';
		var storedValue = Settings.get(data.name);
		var currentValue = storedValue || storedValue === "" ? storedValue : defaultValue;
		if(typeof currentValue !== "object")
			currentValue = currentValue.split(',');
		var options = [];
		
		//for(var i = 0; i < data.options.length; i++){
		for(var optionName in data.options){
			var tmpOption = {
				type: 'label',
				className: 'checkbox-inline',
				innerHTML: [
					{
						type: 'input',
						className: 'checkbox',
						attributes: {
							name: data.name + '-o',
							type: 'checkbox',
							value: optionName
						},
						checked: (currentValue.indexOf(optionName) != -1 ? true : false),
						EventListeners: {
							CheckboxStateChange: function(e){
								var name = e.target.parentElement.parentElement.getAttribute('name');
								var value = Settings.PrefTypes.getValueByName(name);
								Settings.PrefTypes.onChange(name, value);
							}
						}
					},
					{
						type: 'span',
						innerHTML: data.options[optionName].label,
						attributes: {}
					}
				],
				attributes: {
				}
			};
			
			if(_undefined!=typeof data.options[optionName]['tooltip'] && (_undefined!=typeof data.options[optionName].tooltip['innerHTML'] || _undefined!=typeof data.options[optionName].tooltip['text'])){
				tmpOption.innerHTML[1] = setTooltipProperties(tmpOption.innerHTML[1], data.options[optionName].tooltip);
			}
			
			options.push(tmpOption)
			
		}
		
		var opts = {
			type: 'div',
			className: 'form-group pref-container',
			innerHTML: options,
			attributes: {
				name: data.name
			},
		};
		
		/*
		if( _undefined!=typeof data['tooltip']&&_undefined!=typeof data['tooltip']['innerHTML'] || _undefined!=typeof data['tooltip']&&_undefined!=typeof data['tooltip']['text'] ){
			opts.innerHTML = setTooltipProperties(opts.innerHTML, data.tooltip);
		}
		*/
		
		return opts;
	},
	getValue: function(prefEl, data){
		var r = [];
		var prefs = jMod.$$('input:checked', prefEl);
		for(var i = 0; i < prefs.length; i++)
			r.push(prefs[i].value);
		return r.join(',');
	},
	setValue: function(prefEl, data, value){
		var valueArr = value.split(',');
		for(var i = 0; i < prefEl.options.length; i++){
			if(valueArr.indexOf(getAttribute(prefEl.options[i], 'name')) != -1)
				prefEl.options[i].checked = true;
			else
				prefEl.options[i].checked = false;
		}
		return true;
	},
	enable: function(prefEl, data){
		var prefs = jMod.$$('input', prefEl);
		for(var i = 0; i < prefs.length; i++)
			if(prefs[i].hasAttribute('disabled'))
				prefs[i].removeAttribute('disabled');
	},
	disable: function(prefEl, data){
		var prefs = jMod.$$('input', prefEl);
		for(var i = 0; i < prefs.length; i++)
			prefs[i].setAttribute('disabled', 'disabled');
	}
});



Settings.PrefTypes.add('radio', {
	make: function(data){
		var text = data.description || data.name;
		var defaultValue = data['default'] || '';
		var storedValue = Settings.get(data.name);
		var currentValue = storedValue || defaultValue;
		var options = [];
		
		//for(var i = 0; i < data.options.length; i++){
		for(var optionName in data.options){
			var tmpOption = {
				type: 'label',
				className: 'radio radio-inline',
				innerHTML: [
					{
						type: 'input',
						className: 'radiobox',
						attributes: {
							type: 'radio',
							value: optionName,
							name: data.name + '-o'
						},
						checked: (currentValue.indexOf(optionName) != -1 ? true : false),
						EventListeners: {
							RadioStateChange: function(e){
								var name = e.target.parentElement.parentElement.getAttribute('name');
								var value = Settings.PrefTypes.getValueByName(name);
								//console.log('onchange name', name, 'value', value, 'e', e);
								Settings.PrefTypes.onChange(name, value);
							}
						}
					},
					{
						type: 'span',
						innerHTML: data.options[optionName].label,
						attributes: {}
					}
				],
				attributes: {
					//value: optionName,
					//selected: (defaultValue && defaultValue == optionName ? true : null)
				}
			};
			
			if(_undefined!=typeof data.options[optionName]['tooltip'] && (_undefined!=typeof data.options[optionName].tooltip['innerHTML'] || _undefined!=typeof data.options[optionName].tooltip['text'])){
				tmpOption.innerHTML[1] = setTooltipProperties(tmpOption.innerHTML[1], data.options[optionName].tooltip);
			}
			
			options.push(tmpOption)
		}
		
		var opts = {
			type: 'div',
			className: 'form-group pref-container',
			innerHTML: options,
			attributes: {
				name: data.name
			},
		};
		
		
		return opts;
	},
	getValue: function(prefEl, data){
		return jMod.$('input:checked', prefEl).value;
	},
	setValue: function(prefEl, data, value){
		for(var i = 0; i < prefEl.options.length; i++){
			if(getAttribute(prefEl.options[i], 'name') == value)
				prefEl.options[i].checked = true;
			else
				prefEl.options[i].checked = false;
		}
		return true;
	},
	enable: function(prefEl, data){
		var prefs = jMod.$$('input', prefEl);
		for(var i = 0; i < prefs.length; i++)
			if(prefs[i].hasAttribute('disabled'))
				prefs[i].removeAttribute('disabled');
	},
	disable: function(prefEl, data){
		var prefs = jMod.$$('input', prefEl);
		for(var i = 0; i < prefs.length; i++)
			prefs[i].setAttribute('disabled', 'disabled');
	}
});



Settings.PrefTypes.add('toggle', {
	multiValue: true,
	make: function(data){
		var text = data.description || data.name;
		var defaultValue = data['default'] || '';
		var storedValue = Settings.get(data.name);
		var currentValue = storedValue || storedValue.trim() === "" ? storedValue : defaultValue;
		var options = [];
		
		for(var optionName in data.options){
			var tmpOption = {
				type: 'label',
				className: 'toggle ' + (data.options[optionName].className || ''),
				innerHTML: [
					{
						type: 'input',
						className: 'radiobox',
						attributes: {
							type: 'checkbox',
							value: optionName,
							name: data.name + '-o'
						},
						checked: (currentValue.indexOf(optionName) != -1 ? true : false),
						EventListeners: {
							RadioStateChange: function(e){
								var name = e.target.parentElement.parentElement.getAttribute('name');
								var value = Settings.PrefTypes.getValueByName(name);
								Settings.PrefTypes.onChange(name, value);
							}
						}
					},
					{
						type: 'i',
						className: '',
						attributes: {
							'data-jmod-swchon-text': data.options[optionName].on || 'ON',
							'data-jmod-swchoff-text': data.options[optionName].off || 'OFF'
						}
					},
					data.options[optionName].label
				],
				attributes: {}
			};
			if(_undefined!=typeof data.options[optionName]['tooltip'] && (_undefined!=typeof data.options[optionName].tooltip['innerHTML'] || _undefined!=typeof data.options[optionName].tooltip['text'])){
				tmpOption.innerHTML[1] = setTooltipProperties(tmpOption.innerHTML[1], data.options[optionName].tooltip);
			}
			options.push(tmpOption)
		}
		
		var opts = {
			type: 'div',
			className: 'form-group pref-container',
			innerHTML: options,
			attributes: {
				name: data.name
			},
		}

		return opts;
	},
	getValue: function(prefEl, data){
		var r = [];
		var prefs = jMod.$$('input:checked', prefEl);
		for(var i = 0; i < prefs.length; i++)
			r.push(prefs[i].value);
		return r.join(',');
	},
	setValue: function(prefEl, data, value){
		var valueArr = value.split(',');
		for(var i = 0; i < prefEl.options.length; i++){
			if(valueArr.indexOf(getAttribute(prefEl.options[i], 'name')) != -1)
				prefEl.options[i].checked = true;
			else
				prefEl.options[i].checked = false;
		}
		return true;
	},
	enable: function(prefEl, data){
		var prefs = jMod.$$('input', prefEl);
		for(var i = 0; i < prefs.length; i++)
			if(prefs[i].hasAttribute('disabled'))
				prefs[i].removeAttribute('disabled');
	},
	disable: function(prefEl, data){
		var prefs = jMod.$$('input', prefEl);
		for(var i = 0; i < prefs.length; i++)
			prefs[i].setAttribute('disabled', 'disabled');
	}
});



Settings.PrefTypes.add('input', {
	make: function(data){
		var text = data.description || data.name;
		var defaultValue = data['default'] || '';
		var storedValue = Settings.get(data.name);
		var opts = {
			type: 'div',
			className: 'pref-container',
			innerHTML: [
				{
					type: 'input',
					className: 'form-control pref',
					innerHTML: '',
					style: data.style,
					attributes: {
						value: storedValue || storedValue === "" ? storedValue : defaultValue,
						'name': data.name,
						'type': 'text',
						'data-jmod-settings-pref': data.name,
						'data-jmod-settings-pref-default': data['default'] || null,
					},
					EventListeners: {
						input: function(e){
							Settings.PrefTypes.onChange(e.target.getAttribute('name'), e.target.value);
						}
					}
				}
			]
		};
		
		if(_undefined!=typeof data['tooltip'] && (_undefined!=typeof data.tooltip['innerHTML'] || _undefined!=typeof data.tooltip['text'])){
			opts.innerHTML[0] = setTooltipProperties(opts.innerHTML[0], data.tooltip);
		}
		
		if(_undefined!=typeof data[ "icon"]){
			opts.className += ' input-icon-right';
			var iconOpts = getIcon(data.icon);
			
			opts.innerHTML.unshift(iconOpts);
		}
		return opts;
	},
	getValue: function(prefEl, data){
		return prefEl.value;
	},
	setValue: function(prefEl, data, value){
		prefEl.value = value;
		return true;
	},
	enable: function(prefEl, data){
		if(prefEl.hasAttribute('disabled'))
			prefEl.removeAttribute('disabled');
	},
	disable: function(prefEl, data){
		prefEl.setAttribute('disabled', 'disabled');
	}
});


Settings.PrefTypes.add('textarea', {
	make: function(data){
		var text = data.description || data.name;
		var defaultValue = data['default'] || '';
		var storedValue = Settings.get(data.name);
		var opts = {
			type: 'div',
			className: 'pref-container',
			innerHTML: [
				{
					type: 'textarea',
					className: 'form-control pref',
					innerHTML: storedValue || storedValue === "" ? storedValue : defaultValue,
					style: data.style,
					attributes: {
						'name': data.name,
						'type': 'text',
						'data-jmod-settings-pref': data.name,
						'data-jmod-settings-pref-default': data['default'] || null,
					},
					EventListeners: {
						input: function(e){
							Settings.PrefTypes.onChange(e.target.getAttribute('name'), e.target.value);
						}
					}
				}
			]
		};
		
		if(_undefined!=typeof data['tooltip'] && (_undefined!=typeof data.tooltip['innerHTML'] || _undefined!=typeof data.tooltip['text'])){
			opts.innerHTML[0] = setTooltipProperties(opts.innerHTML[0], data.tooltip);
		}
		
		if( _undefined!=typeof data[ "icon"] ){
			//opts[1].className += ' input-icon-right';
			var iconOpts = getIcon(data.icon);
			iconOpts.className += ' icon-append';
			opts.innerHTML.unshift(iconOpts);
		}
		return opts;
	},
	getValue: function(prefEl, data){
		return prefEl.value;
	},
	setValue: function(prefEl, data, value){
		prefEl.value = value;
		return true;
	},
	enable: function(prefEl, data){
		if(prefEl.hasAttribute('disabled'))
			prefEl.removeAttribute('disabled');
	},
	disable: function(prefEl, data){
		prefEl.setAttribute('disabled', 'disabled');
	}
});


Settings.PrefTypes.add('range', {
	make: function(data){
		var text = data.description || data.name;
		var defaultValue = data['default'] || '';
		var storedValue = Settings.get(data.name);
		var opts = {
			type: 'div',
			className: 'pref-container',
			innerHTML: [
				{
					type: 'input',
					className: 'form-control pref',
					innerHTML: '',
					style: data.style,
					min: parseInt(data.min || '0'),
					max: parseInt(data.max || '100'),
					step: parseInt(data.step || '1'),
					value: parseInt(storedValue || defaultValue),
					//style: {},
					attributes: {
						//defaultValue: storedValue || defaultValue,
						'name': data.name,
						'type': 'range',
						'data-jmod-settings-pref': data.name,
						'data-jmod-settings-pref-default': data['default'] || null,
					},
					EventListeners: {
						'change': function(e){
							//var textbox = e.target.previousSibling;
							var textbox = e.target.nextSibling;
							textbox.value = this.value;
						},
						'input': function(e){
							var textbox = e.target.nextSibling;
							textbox.value = this.value;
						}
					}
				},
				{
					type: 'input',
					className: 'form-control pref disabled range-value',
					innerHTMLL: '',
					//style: {},
					attributes: {
						value: storedValue || defaultValue,
						disabled: 'disabled'
					},
					EventListeners: {
						'keypress': function(e){
							console.log('keypress', e);
							//var range = e.target.nextSibling;
							//range.value = parseInt(this.value);
						}
					}
				}
			]
		};
		
		if(_undefined!=typeof data['tooltip'] && (_undefined!=typeof data.tooltip['innerHTML'] || _undefined!=typeof data.tooltip['text'])){
			opts.innerHTML[0] = setTooltipProperties(opts.innerHTML[0], data.tooltip);
		}
		
		return opts;
	},
	getValue: function(prefEl, data){
		return prefEl.value;
	},
	setValue: function(prefEl, data, value){
		prefEl.value = value;
		return true;
	},
	enable: function(prefEl, data){
		if(prefEl.hasAttribute('disabled'))
			prefEl.removeAttribute('disabled');
	},
	disable: function(prefEl, data){
		prefEl.setAttribute('disabled', 'disabled');
	}
});


var setBackgroundURI = function(el, uri, innerHTML){
	el.innerHTML = innerHTML || '';
	el.style.backgroundImage = 'url('+uri+')';
	el.setAttribute('data-src', uri);
	
	var bgimg = new Image();
	bgimg.onload = function() {
		var tmpHeight = parseInt(bgimg.naturalHeight) + 'px';
		var tmpWidth = parseInt(bgimg.naturalWidth) + 'px';
		if(!isNaN(bgimg.naturalHeight) && !isNaN(bgimg.naturalWidth)){
			if(parseInt(tmpHeight) > 300){
				tmpHeight = '300px';
				tmpWidth = '100%';
				el.style.backgroundSize = 'contain';
			} else {
				el.style.backgroundSize = '100% 100%';
			}
			el.style.height = tmpHeight;
			el.style.width = tmpWidth;
		}
		bgimg.parentElement.removeChild(bgimg);
	}
	bgimg.style.position = "absolute";
	bgimg.style.opacity = "0";
	(window || unsafeWindow).document.body.appendChild(bgimg);
	bgimg.src = uri;
}

Settings.PrefTypes.add('imagefile', {
	make: function(data){
		var defaultValue = data['default'] || '';
		var storedValue = Settings.get(data.name);
		var currentValue = (storedValue || defaultValue);
		var hasValidValue = typeof currentValue === "string" && currentValue != '' ? true : false;
		
		var fileSelector = new jMod.FileSelector({
			multiple: false,
			accept: 'image/*',
			button: {
				style: data.style,
				className: 'btn btn-success',
				innerHTML: [
					'<i class="fa ' + (data.buttonIcon || "fa-file-image-o") + '" style="margin-right:10px;"></i>',
					data.buttonText || 'Select an Image'
				],
				attributes: {
					type: 'button'
				}
			},
			form: {
				className: 'imagefile-form pref',
				attributes: {
					name: data.name,
					'data-jmod-settings-pref': data.name,
					'data-jmod-settings-pref-default': data['default'] || null,
				}
			},
			onChange: function(e, files, value){
				jMod.FileSelector.ReadFileAsURL(files[0],
					function(e, content, file){
						var imgContainerEl = fileSelector.formElement.parentElement.lastChild;
						
						setBackgroundURI(imgContainerEl, content, '');
						
						Settings.PrefTypes.onChange(fileSelector.formElement.getAttribute('name'), content);
					},
					function(e, content, file){
						var imgContainerEl = fileSelector.formElement.parentElement.lastChild;
						setBackgroundURI(imgContainerEl, '', 'No Preview');
						Settings.PrefTypes.onChange(fileSelector.formElement.getAttribute('name'), '');
					}
				);
			}
		});
		
		var opts = {
			type: 'div',
			className: 'pref-container',
			innerHTML: [
				fileSelector.formElement,
				createNewElement({
					type: 'div',
					className: 'image-preview-container',
					style: {
						//backgroundImage: hasValidValue ? 'url(' + currentValue + ')' : ''
					},
					attributes: {
						//'data-src': hasValidValue ? currentValue : ''
					},
					innerHTML: hasValidValue ? '' : 'No Preview'
				})
			]
		};
		
		if(Loading.DOMLoaded){
			setBackgroundURI(opts.innerHTML[1], hasValidValue ? currentValue : '', hasValidValue ? '' : 'No Preview');
		} else {
			setTimeout(setBackgroundURI, 150, opts.innerHTML[1], hasValidValue ? currentValue : '', hasValidValue ? '' : 'No Preview');
		}
		
		if(_undefined!=typeof data['tooltip'] && (_undefined!=typeof data.tooltip['innerHTML'] || _undefined!=typeof data.tooltip['text'])){
			opts.innerHTML[0] = setTooltipProperties(opts.innerHTML[0], data.tooltip);
		}
		
		return opts;
	},
	getValue: function(prefEl, data){
		try{
			var imgContainerEl = prefEl.parentElement.lastChild;
			return imgContainerEl.getAttribute('data-src');
		}catch(e){
			return '';
		}
	},
	setValue: function(prefEl, data, value){
		var imgContainerEl = prefEl.parentElement.lastChild;
		setBackgroundURI(imgContainerEl, value, value && value != '' ? '' : 'No Preview');
		return true;
	},
	enable: function(prefEl, data){
		if(prefEl.hasAttribute('disabled'))
			prefEl.removeAttribute('disabled');
	},
	disable: function(prefEl, data){
		prefEl.setAttribute('disabled', 'disabled');
	}
});



function setTooltipProperties(obj, data){
	if(!isElement(obj)){
		obj.className = (obj.className || '') + ' ' + jConfig(Tooltip_TooltipTargetClass_Key);
		//obj.className += ' ' + jMod.Tooltip.TooltipTargetClassName;
		if(typeof obj.attributes === _undefined)
			obj.attributes = {};
		obj.attributes[jConfig(Tooltip_TooltipAttribute_Key)] = data.innerHTML || data.text || null;
		obj.attributes[jConfig(Tooltip_PlacementAttribute_Key)] = data.placement || 'top';
		if(_undefined!=typeof data[ 'margin']){
			var marginAttributeName = jConfig('Tooltip.attributeNames.margin');
			if(_undefined!=typeof data.margin[ 'left'])
				obj.attributes[marginAttributeName + '-left'] = data.margin.left;
			if(_undefined!=typeof data.margin[ 'right'])
				obj.attributes[marginAttributeName + '-right'] = data.margin.right;
			if(_undefined!=typeof data.margin[ 'top'])
				obj.attributes[marginAttributeName + '-top'] = data.margin.top;
			if(_undefined!=typeof data.margin[ 'bottom'])
				obj.attributes[marginAttributeName + '-bottom'] = data.margin.bottom;
		}
	} else {
		addClass(obj, jConfig(Tooltip_TooltipTargetClass_Key));
		obj.setAttribute(jConfig(Tooltip_TooltipAttribute_Key), data.innerHTML || data.text || null);
		obj.setAttribute(jConfig(Tooltip_PlacementAttribute_Key), data.placement || 'top');
		if(_undefined!=typeof data[ 'margin']){
			var marginAttributeName = jConfig('Tooltip.attributeNames.margin');
			if(_undefined!=typeof data.margin[ 'left'])
				obj.setAttribute(marginAttributeName + '-left', data.margin.left);
			if(_undefined!=typeof data.margin[ 'right'])
				obj.setAttribute(marginAttributeName + '-right', data.margin.right);
			if(_undefined!=typeof data.margin[ 'top'])
				obj.setAttribute(marginAttributeName + '-top', data.margin.top);
			if(_undefined!=typeof data.margin[ 'bottom'])
				obj.setAttribute(marginAttributeName + '-bottom', data.margin.bottom);
		}
	}
	return obj;
}

function makeLabel(data){
	var text = data.description || data.name;
	if(!isElement(text) && typeof text !== "object")
		text = {
			type: 'span',
			className: 'noselect',
			innerHTML: text,
			attributes: {}
		};
	var opts = {
		type: 'label',
		className: 'col-md-4 control-label noselect',
		innerHTML: text,
		attributes: {}
	};
	
	return opts
}

Settings.MakePref = function(data){
	var opts;
	if(isElement(data) || data.type == 'element'){
		opts = {
			type: 'div',
			className: 'row form-group section-row',
			innerHTML: {
				type: 'div',
				className: 'col-md-12',
				innerHTML: (isElement(data) ? data : ( data.innerHTML || data.options || data['default']))
			}
		};
		
		return createNewElement(opts);
	} else {
		var pref = Settings.PrefTypes.make(data.type, data);
		if(pref){
			var label = makeLabel(data);
			
			switch(data.type){
				case 'radio':
				case 'checkbox':
				case 'toggle':
					if(_undefined!=typeof data['tooltip'] && (_undefined!=typeof data.tooltip['innerHTML'] || _undefined!=typeof data.tooltip['text'])){
						opts = setTooltipProperties(label.innerHTML, data.tooltip);
					}
					break;
			}
			
			opts = {
				type: 'div',
				className: 'row form-group section-row',
				innerHTML: [label, {
					type: 'div',
					className: 'col-md-8',
					innerHTML: pref
				}]
			};
			

			
			return createNewElement(opts);
		}
	}
	return undefined;
}

Settings.MakeSettingsModal = function(data){
	var tabs = {};
	var tabName, tTabOptions, tTabContentOptions, isActive = false;
	var settingsBody = createNewElement({
		type: 'div',
		className: 'jMod-settings tabbable tabs-left'
	});
	
	var settingsNavTabs = createNewElement({
		type: 'ul',
		className: 'nav nav-tabs'
	});
	
	
	var settingsTabContent = createNewElement({
		type: 'div',
		className: 'tab-content'
	});
	
	
	
	// Get all tab names
	for(var i in data.settings){
		var tabName = data.settings[i].tab || "Other";
		var sectionName = data.settings[i].section || "General";
		//if(typeof data.settings[i].tab === _undefined)
			//data.settings[i].tab = "Other";
			
		//if(typeof data.settings[i].section === _undefined)
			//data.settings[i].section = "General";
			
		if(typeof tabs[tabName] === _undefined)
			tabs[tabName] = {
				name: tabName,
				color: null,
				sections: {}
			};
			
		if(typeof tabs[tabName].sections[sectionName] === _undefined)
			tabs[tabName].sections[sectionName] = [];
			
		tabs[tabName].sections[sectionName].push(data.settings[i]);
		
		
	}
	
	if(data.tabs){
		for(var i in data.tabs){
			tabName = data.tabs[i].name;
			if(tabName && typeof tabs[tabName] !== _undefined){
				if(data.tabs[i].displayName)
					tabs[tabName].displayName = data.tabs[i].displayName;
				if(data.tabs[i].content){
					if(data.tabs[i].content.header){
						tabs[tabName].contentHeader = data.tabs[i].content.header;
					}
					
					if(data.tabs[i].content.footer){
						tabs[tabName].contentFooter = data.tabs[i].content.footer;
					}
				}
			}
		}
	}
	
	var tabOrder = data.tabOrder || [];
	var tabElements = {};
	
	var tabCount = 0;
	for(tabName in tabs){
		isActive = ((data.activeTab !== undefined && tabName === data.activeTab) || (data.activeTab === undefined && tabCount == 0)) ? true : false;
		
		tTabOptions = Tabs.makeNavElement({
			innerHTML: tabs[tabName].displayName || tabName,
			id: 'jMod-settings-tab-' + tabCount,
			isActive: isActive,
			contentId: 'jMod-settings-tab-'+tabCount+'-content',
			index: tabCount
		});
		
		//appendChild(settingsNavTabs, tTabOptions);
		
		var tabContentEl = [];
		
		if(tabs[tabName].contentHeader)
			tabContentEl.push(tabs[tabName].contentHeader)
		
		for(var sectionName in tabs[tabName].sections){
			tabContentEl.push('<div class="row section-title-row"><div class="col-md-12"><h3 class="section-title">'+sectionName+'</h3></div></div>');
			for(var prefName in tabs[tabName].sections[sectionName]){
				tabContentEl.push(Settings.MakePref(tabs[tabName].sections[sectionName][prefName]));
			}
		}
		
		if(tabs[tabName].contentFooter)
			tabContentEl.push(tabs[tabName].contentFooter)
		
		tTabContentOptions = Tabs.makeContentElement({
			name: tabName,
			id: 'jMod-settings-tab-'+tabCount+'-content',
			isActive: isActive,
			innerHTML: tabContentEl,
			index: tabCount
		});
		
		tabElements[tabName] = [tTabOptions, tTabContentOptions];
		if(tabOrder.indexOf(tabName) == -1)
			tabOrder.push(tabName);
		
		//appendChild(settingsTabContent, tTabContentOptions);
		
		tabCount++;
	}
	
	if(data.tabs){
		for(var i in data.tabs){
			tabName = data.tabs[i].name;
			if(tabName && tabs[tabName] === undefined){
				isActive = ((data.activeTab !== undefined && tabName === data.activeTab) || (data.activeTab === undefined && tabCount == 0)) ? true : false;
				tTabOptions = Tabs.makeNavElement({
					innerHTML: tabName,
					id: 'jMod-settings-tab-' + tabCount,
					isActive: isActive,
					contentId: 'jMod-settings-tab-'+tabCount+'-content',
					index: tabCount
				});
				
				//appendChild(settingsNavTabs, tTabOptions);
				
				tTabContentOptions = Tabs.makeContentElement({
					name: tabName,
					id: 'jMod-settings-tab-'+tabCount+'-content',
					isActive: isActive,
					innerHTML: data.tabs[i].innerHTML || data.tabs[i].text,
					index: tabCount
				});
				//appendChild(settingsTabContent, tTabContentOptions);
				tabElements[tabName] = [tTabOptions, tTabContentOptions];
				if(tabOrder.indexOf(tabName) == -1)
					tabOrder.push(tabName);
				
				tabCount++;
			}
		}
	}
	
	//for(tabName in tabOrder){
	for(var i = 0; i < tabOrder.length; i++){
		if(tabElements[tabOrder[i]] !== undefined){
			appendChild(settingsNavTabs, tabElements[tabOrder[i]][0]);
			appendChild(settingsTabContent, tabElements[tabOrder[i]][1]);
		}
	}
	
	
	appendChild(settingsBody, settingsNavTabs);
	appendChild(settingsBody, settingsTabContent);
	

	
	var title = data.title || 'Settings';
	if(!isElement(title)){
		title = '<h2 class="title">' + title + '</h2>';
	}
	//element.addEventListener("transitionend", showMessage, false);
	//console.log('Settings_ModalElementClass_Key: ', jConfig(Settings_ModalElementClass_Key));
	
	var opts = {
		title: title,
		id: Settings.getElementId('settingModalsElement'),
		className: jConfig(Settings_ModalElementClass_Key),
		body: settingsBody,
		footer: [
			{
				type: 'span',
				className: 'powered-by',
				innerHTML: {
					type: 'a',
					innerHTML: [
						{
							type: 'img',
							src: 'http://myuserjs.org/img/favicon/favicon.png',
							attributes: {
								height: '16px'
							}
						},
						'Powered by jMod'
					],
					attributes: {
						href: 'http://doc.myuserjs.org'
					}
				}
			},
			{
				type: 'a',
				innerHTML: 'Clear Settings',
				className: 'btn-clear-settings',
				attributes: {
					href: '#'
				},
				EventListeners: {
					click: {
						capture: false,
						callback: function(e){
							var r = confirm("Are you sure?");
							if(r)
								Settings.clear();
								//console.log('Clear Settings!', e);
							
							eventCancel(e);
							return false;
						}
					}
				}
			}
		],
		buttons: [
			{
				text: 'Save',
				className: 'btn btn-success',
				EventListeners: {
					click: function(){
						console.log('save button click');
						Settings.save();
					}
				}
			}
		],
		onAfterShow: function(){
			Settings.onResize();
		},
		style: {
			width: "1000px",
			//maxHeight: "1000px",
			//overflowY: "auto"
		},
		features: {
			enableTabs: true,
			enableTooltips: true
		}
	};
	
	
	
	if(typeof data.onBeforeHide !== _undefined)
		opts.onBeforeHide = data.onBeforeHide;
		
	if(typeof data.onAfterHide !== _undefined)
		opts.onAfterHide = data.onAfterHide;
	
	return jMod.Modal(opts);
}

Settings.onResize = function(){
	var modal = jMod.Settings.settingsModalElement;
	var settingsDialog = jMod.$('.modal-dialog', modal);
	var settingsBody = jMod.$('.modal-body', modal);
	var settingsFooter = jMod.$('.modal-footer', modal);
	var settingsHeader = jMod.$('.modal-header', modal);
	
	var viewportHeight = jMod.Element.viewportSize.getHeight();
	
	var computedDialog = (window || unsafeWindow).getComputedStyle(settingsDialog, null);
	var marginTop = parseInt(computedDialog.getPropertyValue('margin-top'));
	var marginBottom = parseInt(computedDialog.getPropertyValue('margin-bottom'));
	var maxHeight = (parseInt(viewportHeight) - parseInt(settingsHeader.offsetHeight) - parseInt(settingsFooter.offsetHeight) - marginTop - marginBottom) - 15;
	settingsBody.style.maxHeight = maxHeight + 'px';
	
	var settingsTabs = jMod.$('.nav-tabs', settingsBody);
	jMod.Tabs.resize(settingsTabs);
}

Settings.show = function(){
	jMod.Modal.show(Settings.settingsModalElement || 0);
	
	setTimeout(function(){
		Settings.onResize();
	}, 1);
}

Settings.hide = function(){
	jMod.Modal.hide(Settings.settingsModalElement);
}

Settings.save = function(){
	console.log('Saving');
	var data = Settings._data;
	var r = {};
	for(var i = 0; i < data.settings.length; i++){
		var prefData = data.settings[i];
		if(!isElement(data) && prefData.type != 'element'){
			var value = Settings.PrefTypes.getValue(prefData);
			r[prefData.name] = value;
		}
	}
	Settings._storedData = r;
}

Settings.init = function(){
	Settings.Initialized = true;
}

jMod.CSS = '.jmod-na .modal-body{min-height:200px;max-height:500px;overflow-y:auto;}';



	 
	/***********************************
	 ** Get DOM Timing
	 **********************************/
jMod.getDOMTiming = function(){
	var _timingData, timingData = {};
	try {
		if(performance.available){
			var ignore = ['unloadEventStart', 'unloadEventEnd', 'navigationStart'];
			
			_timingData = performance.getAllTiming();
			
			var navStart = performance.get('timing.navigationStart');
			
			for(var key in _timingData){
				timingData[key] = _timingData[key] - navStart;
				if(timingData[key] <= 0 || isNaN(timingData[key]))
					delete timingData[key];
			}
			
			var pageLoadTime = (performance.get('timing.loadEventEnd') || performance.get('timing.loadEventStart')) - performance.get('timing.navigationStart');
			if(pageLoadTime > 0) timingData['pageLoadTime'] = pageLoadTime;
			
			var NetworkLatency = performance.get('timing.responseEnd') - performance.get('timing.fetchStart');
			if(NetworkLatency >= 0) timingData['NetworkLatency'] = NetworkLatency;

			var statReportTime = performance.now;
			if(statReportTime > 0) timingData['statReportTime'] = statReportTime;
			
			if(jMod.InitializeEndTime > 0) timingData['jModInitializeEnd'] = jMod.InitializeEndTime;
			if(jMod.InitializeStartTime >= 0){
				timingData['jModInitializeStart'] = jMod.InitializeStartTime;
				if(jMod.InitializeEndTime > 0 && (jMod.InitializeEndTime - jMod.InitializeStartTime) > 0) timingData['jModInitializeTime'] = (jMod.InitializeEndTime - jMod.InitializeStartTime);
				if(jModReady > 0 && (jModReady - jMod.InitializeStartTime) > 0) timingData['jModReadyTime'] = (jModReady - jMod.InitializeStartTime);
			}
		}
	} catch(e) {
		//console.error('Error! getDOMTiming: ', e);
		jModLogError(e, 'jMod.getDOMTiming');
		return {};
	}
	return timingData;
};
	
	/***********************************
	 ** Send Message
	 **********************************/
/**
 * This callback is displayed as part of the Requester class.
 * @callback SendMessageResponseCallback
 * @param {*} responseObject - The object returned from the server
 * @param {...*} responseData - Other response data depending on the method used<br><ul><li>XMLHTTPRequest - <b>responseObj</b> The original XMLHTTPRequest response object</li><li>jQuery - <b>textStatus</b>, <b>jqXHR</b></li><li>JSONP - <b>currentScript</b> The value of document.currentScript (also the <b><i>this</i></b> value for callback)</li></ul>
 */

/**
 * @typedef {Object} SendMessageData
 * @property {(string|URLBuilder)} url - URL to send the request to
 * @property {string} [method=XMLHTTPRequest] - Method to use (jQuery|XMLHTTPRequest|JSONP)
 * @property {string} [responseType=json] - Data type being returned
 * @property {SendMessageResponseCallback} callback - Callback function or function name
 * @property {function} onerror - Callback function or function name to handle errors
 */


 
/**
 * Function for sending and receiving data from a remote host
 * function SendMessage
 * @memberof jMod
 * @param {SendMessageData} data - data used to send request
 */
var SendMessage = jMod.SendMessage = function(data){
	if(!jMod.jQueryAvailable && data.method.toLowerCase() == 'jquery'){
		if(typeof GM_xmlhttpRequest !== _undefined)
			data.method = 'XMLHTTPRequest';
		else
			data.method = 'JSONP';
	} else if(typeof GM_xmlhttpRequest === _undefined && data.method.toLowerCase() == 'xmlhttprequest') {
		if(jMod.jQueryAvailable)
			data.method = 'jQuery';
		else
			data.method = 'JSONP';
	}
	
	data.url = jMod.SendMessage.processURL(data);
	switch((data.method || 'XMLHTTPRequest').toLowerCase()){
		case 'jquery':
			if(jMod.debug) console.log('jMod.SendMessage - jquery', data);
			return jMod.SendMessage.jQuery(data);
			break;
		case 'xmlhttprequest':
			if(jMod.debug) console.log('jMod.SendMessage - xmlhttprequest', data);
			return jMod.SendMessage.XMLHTTPRequest(data);
			break;
		case 'jsonp':
		default:
			if(jMod.debug) console.log('jMod.SendMessage - JSONP', data);
			jMod.SendMessage.JSONP(data);
			break;
	}
};

var SendMessageResponseFunctionName = 'jModSendMessageResponseFn';
SendMessage.processURL = function(data){
	var callback_str = (typeof data.callback === "string" ? data.callback : SendMessageResponseFunctionName);
	
	if(typeof data.url !== "object" && data.url.indexOf('?') == -1)
		data.url += '?';

	
	switch(data.method.toLowerCase()){
		case 'jsonp':
			if(data.url instanceof URLBuilder){
				data.url.addArg('callback', callback_str);
				data.url.addArg('jsonp', callback_str);
			} else {
				data.url += '&callback=' + callback_str + '&jsonp=' + callback_str;
			}
			break;
		case 'xmlhttprequest':
			if(data.url instanceof URLBuilder){
				data.url.addArg('json', '1');
			} else {
				data.url += '&json=1';
			}
			break;
		case 'jquery':
			if(data.responseType && data.responseType == 'json'){
				if(data.url instanceof URLBuilder){
					data.url.addArg('json', '1');
				} else {
					data.url += '&json=1';
				}
			}
			break;
	}
	/*
	if(data.method.toLowerCase() == 'jsonp'){
		data.url += '&callback=' + callback_str + '&jsonp=' + callback_str;
	} else if(data.method.toLowerCase() == 'xmlhttprequest') {
		data.url += '&json=1';
	} else if(data.method.toLowerCase() == 'jquery') {
		if(data.responseType && data.responseType == 'json')
			data.url += '&json=1';
	}
	*/
	return data.url;
}

SendMessage.jQuery = function(data){
	var callback_str = (typeof data.callback === "string" ? data.callback : SendMessageResponseFunctionName);
	var callbackIndex = SendMessage.addCallbacks(data);
	
	try {
		$.getJSON(data.url.toString(), {
			async: true,
			format: "json"
		})
		.done(function(result, textStatus, jqXHR) {
			SendMessage.execCallback(callbackIndex, null, result, textStatus, jqXHR);
		})
		.fail(function(jqxhr, textStatus, error) {
			SendMessage.execErrorCallback(callbackIndex, null, jqxhr, textStatus, error);
		});
	} catch(e) {
		return false;
	}
	return true;
}

SendMessage.XMLHTTPRequest = function(data){
	try{
		if(typeof GM_xmlhttpRequest !== _undefined){
			var callbackIndex = SendMessage.addCallbacks(data);
			GM_xmlhttpRequest({
				method: "GET", url: data.url.toString(),
				headers: {"Accept": "application/javascript"},
				onload: (function(callbackIndex, responseType){
					return function(response){
						if(responseType.toLowerCase() == 'json'){
							var responseJSON;
							try {
								responseJSON = JSON.parse(response.responseText);
							} catch(e) {
							} finally {
								return SendMessage.execCallback(callbackIndex, null, responseJSON, response);
							}
						} else {
							return SendMessage.execCallback(callbackIndex, null, response.responseText, response);
						}
					}
				})(callbackIndex, data.responseType || 'json'),
				onerror: (function(callbackIndex){
					return function(response){
						console.log('Error! XMLHttpRequest', response);
						return SendMessage.execErrorCallback(callbackIndex, null, response.responseText, response);
					}
				})(callbackIndex),
			});
			return true;
		}
	} catch(e){
		console.log('Error! getXMLHttpRequest', e);
	} finally {
		return false;
	}
}

SendMessage.JSONP = function(data){
	var callbackIndex = SendMessage.addCallbacks(data);
	
	var newScriptEl = createNewElement({
		type: 'script',
		async: true,
		defer: true,
		/*
		onload: (function(callback){
			var _callback = callback;
			return function(response){
				console.log('onload', response);
				_callback(response);
				eventCancel(response);
				return false;
			}
		})(data.callback),
		*/
		attributes: {
			'data-callback-index': callbackIndex
		}
	});
	try{
		var head = document.head || document.getElementsByTagName("head")[0];
		head.appendChild(newScriptEl);
		newScriptEl.src = data.url.toString();
	}catch(e){
		return SendMessage.execErrorCallback(callbackIndex, null, e);
		return false;
	}
	return true;
}

SendMessage._callbacks = [];

SendMessage.addCallbacks = function(data){
	return (SendMessage._callbacks.push({
			complete: data.callback,
			error: data.onerror
		})) - 1;
}

SendMessage.execCallback = function(index, thisVal){
	try{
		var cb = SendMessage._callbacks[index].complete;
		if(typeof cb === _undefined)
			return false;
		else if(typeof cb === "function"){
			return cb.apply(thisVal || null, Slice.call(arguments, 2));
		} else if(typeof cb === "string"){
			if(typeof unsafeWindow[cb] === "function")
				return unsafeWindow[cb].apply(thisVal || null, Slice.call(arguments, 2));
		}
	} catch(e) {
		console.log('Error SendMessage.execCallback!', e);
		return false;
	}
}

SendMessage.execErrorCallback = function(index, thisVal){
	try{
		var cb = SendMessage._callbacks[index].onerror;
		if(typeof cb === _undefined)
			return false;
		else if(typeof cb === "function"){
			return cb.apply(thisVal || null, Slice.call(arguments, 2));
		} else if(typeof cb === "string"){
			if(typeof unsafeWindow[cb] === "function")
				return unsafeWindow[cb].apply(thisVal || null, Slice.call(arguments, 2));
		}
	} catch(e) {
		console.log('Error SendMessage.execErrorCallback!', e);
		return false;
	}
}

function SendMessage_responseCallback(response){
	SendMessage.execCallback(document.currentScript.getAttribute('data-callback-index'), document.currentScript, response, document.currentScript);
}

SendMessage._globalResponseCallback = mExportFunction(SendMessage_responseCallback, unsafeWindow, {
	defineAs: SendMessageResponseFunctionName,
	allowCallbacks: true,
	allowCrossOriginArguments: true
});

	/***********************************
	 ** Update
	 **********************************/
	/**
	 * @namespace jMod.Update
	 * @memberOf jMod
	 * @since 0.0.14
	 * @example
	 * var opts = {
	 *     callback: updateCallback,
	 *     onerror: updateErrorCallback,
	 *     getType: 'data',
	 *     XMLHTTPRequest: true,
	 *     args: {
	 *         scriptLoadTime: 1234
	 *     }
	 * };
	 * 
	 * jMod.Update.getUpdateData(opts);
	 */
	jMod['Update'] = new function(){
		/**
		 * @callback UpdateCallback
		 * @memberof jMod.Update
		 * @param {(object|string)} response The string or JSON object returned from the server
		 */
		/**
		 * Data used to send requests to the server.<br><i>Overrides settings stored in jMod.Config.</i>
		 * @typedef {Object} UpdateData
		 * @type {object}
		 * @memberof jMod.Update
		 * @see jMod.Config
		 * @property {string} [script_name] - Name of script on myUserJS (Not needed if meta block contains a valid updateURL or jModupdateURL)
		 * @property {string} [username] - Script owner's username on myUserJS
		 * @property {UpdateCallback} [callback] - Function to be called with the server's response
		 * @property {UpdateCallback} [onerror] - Function to be called when an error occurs
		 * @property {string} [getType="data"] - Type of information you want returned from the server, and which partition to store the download/arguments under.
		 * @property {object} [args] - Arguments to be sent to myUserJS's statistical engine
		 * @property {boolean} [DOMTiming=false] - Generate and send page/script timing information to the server
		 * @property {boolean} [noDownload=false] - Do not record download when processing response (only used when reporting errors)
		 * @property {boolean} [XMLHttpRequest=false] - <font color="red">(Experimental)</font> Use XMLHttpRequest when sending request (only available to userscripts that load jMod via require)
		 * @property {boolean} [jQuery=false] - <font color="red">(broken)</font>
		 * @example
		 * var opts = {
		 *     callback: myCBFunction,
		 *     getType: 'data',
		 *     args: {
		 *         scriptLoadTime: 1234
		 *     }
		 * }
		 * console.log(jMod.Update.getURL(opts));
		 */
	
		var combineOptions = function(){
			var args = [true].concat(Slice.call(arguments), {
				script_info: jConfig('script.script_info'),
				script_file_info: jConfig('script.script_file_info') || undefined
			});
			return jMod.extend.apply(jMod, args);
			//console.log('output', output);
			//output.script_info = jConfig('script.script_info');
			
			//if(typeof jConfig('script.script_file_info') !== _undefined)
				//output.script_file_info = jConfig('script.script_file_info');
			//return output;
		}
		
		/**
		 * Generate the update URL
		 * @function getURL
		 * @memberof jMod.Update
		 * @param {UpdateData} data Information used to generate the URL
		 */
		this.getURL = function(data){
			//try{
				//opts = merge({}, jMod.Config.Update, data);
				opts = combineOptions({}, jMod.Config.Update, data);
				//if(opts.callback && typeof opts.callback === "string"){
					//opts.callback_function = opts.callback;
				//}
				
				var builder = new URLBuilder(jConfig('host') || 'http://myuserjs.org');
				
				
				// Get Username
				var un = (opts.username || jConfig('script.username')).trim();
				if(typeof un === _undefined || un == '') throw "No Username Provided";
				
				// Get Script Name
				var sn = (opts.script_name || jConfig('script.script_name')).trim();
				if(typeof sn === _undefined || sn == '') throw "No Script Name Provided";
				
				// Get getType
				var gt = (opts.getType || jConfig('Update.getType'));
				if(gt != 'meta' && gt != 'metajs' && gt != 'data' && gt != "none")
					gt = 'data';
					
				// Get Default Args
				var args = opts.args;
				
				// DOM Timing
				if(opts.DOMTiming){
					var domTiming = jMod.getDOMTiming();
					//console.log('domTiming', domTiming);
					//if(jConfig('debug')) console.log('domTiming', domTiming);
					//if(jConfig('debug')) jMod.Log('domTiming', domTiming);
					for(var key in domTiming){
						if(domTiming.hasOwnProperty(key)) {
							//console.log('key:', key , 'value:', domTiming[key]);
							args[key] = domTiming[key];
						}
					}
				}
				
				// Make Args Array
				var args_arr = [];
				for(var key in args){
					args_arr.push(key + '=' + args[key]);
				}
				
				
				builder.addArg('args', escape(args_arr.join(',')));
				builder.addArg('api_version', jMod.version);
				
				builder.addArg('updateVeriableName', opts.updateVeriableName);
					
				//if(typeof opts.callback_function !== _undefined)
					//builder.addArg('jsonp', opts.callback_function);
				
				if(typeof opts.noDownload !== _undefined && opts.noDownload == true){
					builder.addArg('nodownload', '1');
				} else {
					if(jConfig('Update.sampleRate') < 100){
						if(Math.floor((Math.random() * 100) + 1) > jConfig('Update.sampleRate')){
							builder.addArg('nodownload', '1');
						}
					}
				}
				
				if(jConfig('Update.getStats'))
					builder.addArg('getstats', '1');
				
				if(typeof opts.script_info !== _undefined){
					if(typeof opts.script_info.version !== _undefined)
						builder.addArg('scriptversion', escape(opts.script_info.version));
					
					if(typeof opts.script_info.script_handler !== _undefined){
						builder.addArg('scripthandler', escape(opts.script_info.script_handler));
						if(typeof opts.script_info.script_handler_version !== _undefined)
							builder.addArg('scripthandlerversion', escape(opts.script_info.script_handler_version));
					}
					/*
					opts.script_info.matched_rules = {
						count: 0,
						include: [],
						exclude: [],
						match: []
					};
					
					if(typeof opts.script_info.includes !== _undefined && opts.script_info.includes.length > 0){
						for(var i = 0; i < opts.script_info.includes.length; i++){
							var rRegEx = new RegExp(opts.script_info.includes[i],'i');
							if(rRegEx.test(window.location.href)){
								opts.script_info.matched_rules.include.push(opts.script_info.includes[i]);
								opts.script_info.matched_rules.count++;
							}
						}
					}
					
					if(typeof opts.script_info.excludes !== _undefined && opts.script_info.excludes.length > 0){
						for(var i = 0; i < opts.script_info.excludes.length; i++){
							var rRegEx = new RegExp(opts.script_info.excludes[i],'i');
							if(rRegEx.test(window.location.href)){
								opts.script_info.matched_rules.exclude.push(opts.script_info.excludes[i]);
								opts.script_info.matched_rules.count++;
							}
						}
					}
					
					if(typeof opts.script_info.matches !== _undefined && opts.script_info.matches.length > 0){
						for(var i = 0; i < opts.script_info.matches.length; i++){
							var rRegEx = new RegExp(opts.script_info.matches[i],'i');
							if(rRegEx.test(window.location.href)){
								opts.script_info.matched_rules.match.push(opts.script_info.matches[i]);
								opts.script_info.matched_rules.count++;
							}
						}
					}
					
					if(opts.script_info.matched_rules.count > 0){
						var matchedRulesJSON = JSON.stringify(opts.script_info.matched_rules);
						URLArgs.push('matchedRules=' + escape(matchedRulesJSON));
					}
					*/
				}
				/*
				if(jConfig('debug')){
					URLArgs.push('firephp=1');
				}
				*/
				
				
				builder.addArg('cachebuster', Math.round(new Date().getTime() / 1000));
				var host = (jConfig('host') || 'myuserjs.org');
				builder.setPath('/script/' + un + '/' + sn + '.' + gt + '.js');
				
				return builder;
				
			//}catch(e){
				//jMod.Log('Error!', e);
			//}
		}
		
		/**
		 * Send information to the server with the given data.<br>If a callback is provided, and <i>data</i>.<b>getType</b> != '<b>none</b>', it will be called with the server's response. See [UpdateCallback]{@link jMod.Update.UpdateCallback}
		 * @function sendRequest
		 * @memberof jMod.Update
		 * @param {UpdateData} data Information and arguments used to send request to the server
		 */
		 
		this.sendRequest = function(data){
			try {
				//var mData = merge({}, jMod.Config.Update, data);
				var mData = combineOptions({}, jMod.Config.Update, data);
				
				if(typeof unsafeWindow[mData.updateVeriableName] !== _undefined){
					unsafeWindow[mData.updateVeriableName] = undefined;
					delete unsafeWindow[mData.updateVeriableName];
				}
				
				var url = jMod.Update.getURL(mData);
				
				if(jConfig('debug'))
					jMod.Log('URL: ', url.toString());
				
				var method = 'JSONP';
				
				if(mData.jQuery)
					method = 'jQuery';
				else if(mData.XMLHttpRequest)
					method = 'XMLHTTPRequest';
				
				return jMod.SendMessage({
					url: url.toString(),
					method: method,
					responseType: 'json',
					callback: (function(_callback, _updateVeriableName){
						return function(response){
							unsafeWindow[_updateVeriableName] = response;
							return _callback.apply(this, arguments);
						}
					})(mData.callback, mData.updateVeriableName),
					onerror: mData.onerror
				});
				
			}catch(e){
				console.log('Error! getUpdateData: ', e.name, e.fileName, e.lineNumber + ':' + e.columnNumber);
				console.error(e);
				if(mData.callback)
					mData.onerror(e);
				return undefined;
			}
		}
		
		this.getUpdateData = function(data){
			return this.sendRequest(data);
		}
	};
	
	Object.defineProperty(jMod.Update, 'MetaData', {
		get: function(varName){
			if(typeof unsafeWindow[varName || jConfig('Update.updateVeriableName')] !== _undefined){
				return unsafeWindow[varName || jConfig('Update.updateVeriableName')];
			} else if(typeof window[varName || jConfig('Update.updateVeriableName')] !== _undefined){
				return window[varName || jConfig('Update.updateVeriableName')];
			}
			return undefined;
		}
	});
	
	/***********************************
	 ** Error
	 **********************************/
+(function(){
	function UserError(){
		var err,
			data = {},
			arg0 = _undefined!=typeof arguments[0] ? arguments[0] : undefined,
			length = arguments.length;
		
		if(length > 0){
			if(typeof arg0 === "string"){
				data.message = arg0;
				if(length > 1)
					data.fileName = arguments[1];
					
				if(length > 2)
					data.lineNumber = arguments[2];
					
				if(length > 3)
					data.columnNumber = arguments[3];
					
				if(length > 4){
					if(arguments[4] instanceof Error)
						data.e = arguments[4];
				}
			} else {//if(typeof arg0 === "object")
				if(arg0 instanceof Error){
					data.e = arg0;
				} else {
					data = arg0;
				}
			}
			
			if(data.e){
				try {
					err = data.e;
					
					this.stack = err.stack;
				} catch(e){}
			}
		
		}
		
		if(!err){
			err = new Error();
			
			if (err.stack) {
				// remove one stack level:
				if (typeof(Components) != 'undefined') {
					// Firefox:
					this.stack = err.stack.substring(err.stack.indexOf('\n')+1);
				} else if (typeof(chrome) != 'undefined' || typeof(process) != 'undefined') {
					// Google Chrome/Node.js:
					this.stack = err.stack.replace(/\n[^\n]*/,'');
				} else {
					this.stack = err.stack;
				}
			}

		}
		
		this.message = _undefined!==typeof data.message ? data.message : err.message;
		this.fileName = _undefined!==typeof data.fileName ? data.fileName : err.fileName;
		this.lineNumber = _undefined!==typeof data.lineNumber ? data.lineNumber : err.lineNumber;
		this.columnNumber = _undefined!==typeof data.columnNumber ? data.columnNumber : err.columnNumber;
		this.toString = function () { return this.name + ': ' + this.message }
	}
	
	UserError.prototype = Object.create(Error.prototype);
	UserError.prototype.constructor = UserError;
	
	jMod.UserError = UserError;
})()
	jMod['ERROR'] = new (function(){
	
		this.ERROR_CODES = {
			ERROR_RESULT: {
				FATAL:          0x100000
			},
			ERROR_NAME: {
				EVALERROR:      0x010000,
				INTERNALERROR:  0x020000,
				RANGEERROR:     0x030000,
				REFERENCEERROR: 0x040000,
				SYNTAXERROR:    0x050000,
				TYPEERROR:      0x060000,
				URIERROR:       0x070000
			}
		}
		
		Object.defineProperties(this.ERROR_CODES, props);
		
		Object.defineProperty(this.ERROR_CODES, "get", {
			value: function(key, value){
				if(typeof value === "undefined"){
					return jMod.ERROR.ERROR_CODES.SearchForKey(key);
				} else {
					return jMod.ERROR.ERROR_CODES.setKeyValue(key, value);
				}
			},
			enumerable: false
		});
		
		
		this.getCode = function(key){
			var val = this.ERROR_CODES.get(key);
			if(typeof val !== "undefined"){
				return Number(val.toString(2));
			}
			return undefined;
		};
		

	
		var defaultFilter = function(message, url, linenumber, colNumber, eObj, stackInfo){
			try{
				if(jConfig('script.script_info.userscript_full_file_name') == stackInfo[0].fileName){
					console.log('Error is from userscript!');
					
					switch(eObj.name){
						case 'EvalError':
						case 'InternalError':
						case 'RangeError':
						case 'ReferenceError':
						case 'SyntaxError':
						case 'TypeError':
						case 'URIError':
						default:
							//return true;
							break;
					}
					
					return true;
				}
			}catch(e){}
			finally{
				return false;
			}
		}
	
		this.send = function(data){
			try {
				var mData = jMod.extend(true, {}, jMod.Config.Update, data);
				
				if(typeof mData.args === "undefined")
					mData.args = {};
				
				if(typeof mData.args['scriptError'] === "undefined")
					mData.args['scriptError'] = '1';
				
				if(typeof mData.args['scriptErrorCode'] === "undefined")
					mData.args['scriptErrorCode'] = '-1';
				
				mData.getType = 'none';
				mData.noDownload = true;
				
				return jMod['UPDATE']['sendRequest'](mData);
			} catch(e) {
				console.log('Error! Error.send: ', e);
				return undefined;
			}
		}
		
		this.catchError = function(message, url, linenumber, colNumber, eObj, stackInfo){
			try{
				//console.log('catchError', message, url, linenumber, colNumber, eObj.fileName);
				console.log('stackInfo', stackInfo)
				if(typeof eObj !== "undefined" && typeof eObj.stack !== "undefined"){
					//var stackInfo = jMod['ERROR'].parseStack(eObj.stack);
					
					//console.log('catchError', message, url, linenumber, colNumber, stackInfo);
					//console.log('message', message);
					//console.log('eObj', eObj);
					//console.trace(eObj);
					var args = Slice.call(arguments, 0);
					if(jConfig('Error.autoReportErrors')){
						var filter = (jConfig('Error.errorFilter')).apply(this, args)
						if(filter){
							//return false;
							var opts = {
								getType: 'none',
								args: {
									
								}
							};
							
							opts.args.scriptErrorLineNumber = linenumber;
							opts.args.scriptErrorColNumber = colNumber;
							
							switch(typeof filter){
								case "object":
									opts.args = merge(opts.args, filter);
									break;
								case "number":
								case "string":
									opts.args.scriptError = filter;
									break;
								case "boolean":
									opts.args.scriptError = "1";
									break;
							}
							
							//jMod['ERROR']['send'](opts);
						}
					}
				}
			}catch(e){}
			
			//if(jMod['ERROR']['origErrorHandler'])
				//return jMod['ERROR']['origErrorHandler'].apply(this, args);
			return false;
		}
		
		this.processError = function(e){
			//console.log('e.stack', e.stack);
			//console.log('e.stack', jMod['ERROR'].parseStack(e.stack));
			var tStack = '';
			try{
				tStack = e.stack.toString();
			}catch(e){}
				
			var data = {
				message: e.message,
				name: e.name,
				fileName: e.fileName,
				lineNumber: e.lineNumber,
				columnNumber: e.columnNumber,
				stack: tStack
			};
			
			return jMod['ERROR']['catchError'](e.message, e.fileName, e.lineNumber, e.columnNumber, data, jMod.parseStack(tStack));
		}
		

	})();
	
	//console.log('EVALERROR', jMod['ERROR'].getCode('ERROR_NAME.EVALERROR'));
	//console.log('REFERENCEERROR', jMod['ERROR'].getCode('ERROR_NAME.REFERENCEERROR'));
	//console.log('URIERROR', jMod['ERROR'].getCode('ERROR_NAME.URIERROR'));
	
	function _jModListenError(message, url, linenumber, colNumber, data) {
		console.log('jModListenError', message, url, linenumber, colNumber);
		var tData = jMod.parseStack(data.stack);
		if(tData.length > 0)
			return jMod['ERROR']['catchError'](message, url, linenumber, colNumber, data, tData);
	}
	
	mExportFunction(_jModListenError, unsafeWindow, {
		defineAs: "jModListenError",
		allowCallbacks: true,
		allowCrossOriginArguments: true
	});
	
	var onErrorFunction = function(){
		// Handle min renaming
		//var win = typeof document !== "undefined" ? document.defaultView : typeof window !== "undefined" ? window : unsafeWindow;
		var win = 
				typeof this.document !== "undefined" ? this.document.defaultView :
				typeof document !== "undefined" ? document.defaultView :
				this.top != null ? this :
				null;
		//var console = this.console != null ? this.console : win.console;
		var console = win.console != null ? win.console : this.console;
		if(win._jModErrorHandlerStack)
			return;
		
		win._origErrorHandler = win.onerror;
		win._jModErrorHandlerStack = [];
		
		function jModGlobalErrorHandler(message, url, linenumber, colNumber, eObj){
			var win = typeof document !== "undefined" ? document.defaultView : (this.top != null ? this : null);
			var console = this.console != null ? this.console : win.console;
			console.log("tErrHandle", message, url, linenumber, eObj);
			try {
				var data = {}, tStack = "";
				if(eObj){
					try{
						//tStack = eObj.stack.toString();
						tStack = String(eObj.stack);
					}catch(e){
						console.log('Error eObj.stack.toString', e);
					};
					data = {
						message: eObj.message,
						name: eObj.name,
						fileName: eObj.fileName,
						lineNumber: eObj.lineNumber,
						columnNumber: eObj.columnNumber,
						stack: tStack,
						url: url
					};
				} else {
					data = {
						message: message,
						name: null,
						fileName: null,
						lineNumber: linenumber,
						columnNumber: colNumber,
						stack: tStack,
						url: url
					};
				}
				var fn;
				if(typeof jModListenError !== "undefined")
					fn = jModListenError;
				else if(win.jModListenError)
					fn = win.jModListenError;
				else
					fn = document.defaultView.jModListenError;
				fn(message, url, linenumber, colNumber, data);
			} catch(e) {
				console.log('error calling jModListenError', e, win);
			}
			
			for(var i = win._jModErrorHandlerStack.length - 1; i >= 0; i--){
				try{
					if(win._jModErrorHandlerStack[i].apply(this, arguments) === true)
						return true;
				}catch(e){
					console.log("Error processing error handler", win._jModErrorHandlerStack[i]);
				}
			}
			try{
				if(win._origErrorHandler)
					return win._origErrorHandler.apply(this, arguments);
			}catch(e){}
			
			return false;
		}
		
		// Overwrite any existing error handler
		win.onerror = jModGlobalErrorHandler;
		
		try{
			// Prevent new handler from being overwritten
			// Cannot use defineProperty
			// ONLY OVERWRITE SETTER!
			//if(win.__lookupSetter__('onerror').name == "onerror"){
				win.__defineSetter__("onerror", function(fn){
					// Add to handler stack
					win._jModErrorHandlerStack.push(fn);
				});
			//}
		}catch(e){};
		
	}
	//onErrorFunction(window, console);
	//onErrorFunction(window || unsafeWindow, console);
	//jMod.API.contentEval(onErrorFunction);

	if(_undefined==typeof jMod.Config.script.script_info && _undefined!=typeof GM_info){
		ScriptInfo.set();
	}
	
	/***********************************
	 ** Init
	 **********************************/
+function(){

const maxCallCount = 200;

var pageLoadTime,
	totalCallCount = 0,
	doc = jMod.Element.document,
InitHandlers = {
	addCSS: function(){
		if(!Loading.CSSAdded){
			Loading.CSSAdded = true;
			jMod.AddCSS();
		}
	},
	
	
	headAvailable: function(){
		Loading.headAvailable = true;
		InitHandlers.addCSS();
		if(jMod.debug)
			jMod.API.contentEval(onErrorFunction); // Debug only: Still working on error detection
	},
	
	DOMLoaded: function(){
		Loading.DOMLoaded = true;
		if(jMod.debug) jModLogTime('DOM Loaded', null, ' - Begin Init');
		if(!Loading.headAvailable)
			InitHandlers.headAvailable();
		jMod.Events.fire('onDOMReady');
		jMod.Notification.init();
		jMod.Modal.init();
		jMod.Settings.init();
		Loading.jModReady = true;
		//unsafeWindow.postMessage('onReady', "*");
		//setTimeout(function(){
			if(jMod.debug) jModLogTime('jModReady' + (_undefined!=typeof window.mozPaintCount ? (' (Mozilla Paint Count: '+window.mozPaintCount+')') : ''));
			jMod.Events.fire('onReady');
		//},0);
		if(performance.available)
			jModReady = performance.now;
	},
	
	documentComplete: function(){
		Loading.documentComplete = true;
		if(jMod.debug) {
			jModLogTime('onPageReady' + (_undefined!=typeof window.mozPaintCount ? (' (Mozilla Paint Count: '+window.mozPaintCount+')') : ''));
			console.groupEnd('jMod Start');
		}
		jMod.Events.fire('onPageReady');
	},
	
	performanceReady: function(){
		Loading.performanceReady = true;
		if(jMod.debug) jModLogTime('onPerformanceReady');
		jMod.Events.fire('onPerformanceReady');
	}
};


function tryInit(e){
	// Some versions of FF have a head at "document-start" (before DOM exists) and some do not
	// speed up init for versions that do by adding css as soon as possible
	if(!Loading.headAvailable){
		if(jMod.Element.head){
			InitHandlers.headAvailable();
		}
	}

	if(!Loading.DOMLoaded){
		if(['interactive', 'complete'].indexOf(doc.readyState.toLowerCase()) != -1){
			InitHandlers.DOMLoaded();
		}
	}
	
	if(Loading.DOMLoaded){
		if(!Loading.documentComplete && doc.readyState == "complete"){
			InitHandlers.documentComplete();
		}
		
		if(!Loading.performanceReady){
			pageLoadTime = performance.pageLoadTime();
			if((!isNaN(pageLoadTime) && pageLoadTime > 0) || !performance.available){
				InitHandlers.performanceReady();
			}
		}
		
		if(Loading.performanceReady && Loading.documentComplete){
			Loading.Complete = true;
			clearInterval(checkTimer);
			if(jMod.debug) jModLogTime('jMod Finish Init' + (_undefined!=typeof window.mozPaintCount ? (' (Mozilla Paint Count: '+window.mozPaintCount+')') : ''));
			return;
		}
	}
	
	if(totalCallCount++ > maxCallCount){
		Loading.Complete = true;
		clearInterval(checkTimer);
		
		if(!Loading.DOMLoaded)
			InitHandlers.DOMLoaded();

		if(!Loading.documentComplete)
			InitHandlers.documentComplete();
		
		if(!Loading.performanceReady)
			InitHandlers.performanceReady();
			
		if(jMod.debug){
			jModLogTime('jMod Finish Init (timeout)' + (_undefined!=typeof window.mozPaintCount ? (' (Mozilla Paint Count: '+window.mozPaintCount+')') : ''));
		}
		return;
	}
	if(jMod.debug) jMod.log.count('Try Init');
}

function checkTimer(){
	if(!Loading.Complete)
		tryInit('checkTimer');
	else
		clearInterval(checkTimer);
}

function onDOMContentLoaded(e){
	if(!Loading.Complete)
		tryInit('DOMContentLoaded');
	//if(document.readyState == "complete")
	doc.removeEventListener("DOMContentLoaded", onDOMContentLoaded, false);
	jMod.Events.fire.apply(jMod.Events, ['DOMContentLoaded', {_this: this, args: arguments}]);
	if(jMod.debug) jMod.Debug('DOMContentLoaded', e);
}
// DOM Content Loaded Event
doc.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);

// On ReadyState Change Event
doc.onreadystatechange = function (e) {
	if(!Loading.Complete)
		tryInit('onreadystatechange');
	jMod.Events.fire.apply(jMod.Events, ['onreadystatechange', {_this: this, args: arguments}]);
	if(jMod.debug) jMod.Debug('onreadystatechange %c%s%c %o', jMod.log.fmt.stchange, doc.readyState, ' ', e);
}

// Load Event
function onLoadEvent(e){
	window.removeEventListener("load", onLoadEvent, false);
	jMod.Events.fire.apply(jMod.Events, ['load', {_this: this, args: arguments}]);
	if(jMod.debug) jMod.Debug('onLoadEvent', e);
}
window.addEventListener('load', onLoadEvent, false);

// Before Script Exec Event
function BeforeScriptExec(e){
	jMod.Events.fire.apply(jMod.Events, ['beforescriptexecute', {_this: this, args: arguments}]);
}
window.addEventListener('beforescriptexecute', BeforeScriptExec, false);

// After Script Exec Event
function AfterScriptExec(e){
	jMod.Events.fire.apply(jMod.Events, ['afterscriptexecute', {_this: this, args: arguments}]);
}
window.addEventListener('afterscriptexecute', AfterScriptExec, false);

// Start Init process
tryInit();
setInterval(checkTimer, 25);

}();

	
	if(performance.available){
		setTimeout(function(){
			jMod.InitializeEndTime = performance.now;
		}, 0);
	}
	if(jMod.debug){
		jModLogTime('jMod Initialize Time Elapsed');
		console.log('unsafeWindow', unsafeWindow);
		console.log('window', window);
		console.log('global', Object.prototype.toString.call(this).replace(/^\[object |\]$/g,'').toLowerCase(), this);
	}
/*
try{
	var x = fofofo(a);
	//throw new jModError('Er test');
}catch(e){
	//e.log('Er Title', 'Er body');
	var foo = new jModError(e);
	foo.log('Error Title', 'Error body');
}
*/

	return jMod;
});
