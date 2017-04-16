// ==UserScript==
// @name             jMod
// @namespace        http://myuserjs.org/
// @author           jgjake2
// @homepage         http://myuserjs.org/
// @license          GNU GPL version 3; http://www.gnu.org/licenses/gpl-3.0.txt
// @exclude          *
// @version          {{{API_VERSION}}}
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
// +@history         (0.0.20) Improved logging system.
// +@history         (0.0.20) Major mCloneInto improvements.
// +@history         (0.0.19) Possible fix for Add-on incompatibility
// +@history         (0.0.18) Added new jQuery Selector and Tokenizer Extensions.
// +@history         (0.0.18) Looks for resource to load css from when available.
// +@history         (0.0.18) Started cleaning up Notifications.
// +@history         (0.0.18) Added sessionStorage.
// +@history         (0.0.18) Added jQueryExtensions.
// +@history         (0.0.17) Added Observer class.
// +@history         (0.0.17) Added Language framework.
// +@history         (0.0.16) Major renaming to reduce min size.
// +@history         (0.0.16) Renamed jMod and changed css namespce to .jmod-na.
// +@history         (0.0.15) Added GM_Storage for cross-domain storage.
// +@history         (0.0.15) Created preprocessor macros.
// +@history         (0.0.15) Added more debugging information.
// +@history         (0.0.15) Updated requirements to be more flexible.
// +@history         (0.0.15) Removed ref to jMod.fn (__proto__ is depreciated).
// +@history         (0.0.14) Started documentation overhaul
// +@history         (0.0.14) Automated initialization for things like script_name and username by parsing the given metablock
// +@history         (0.0.11) Added XMLHttpRequest for update checks / stat collecting
// +@history         (0.0.11) Enabled function calls through jMod() function
// +@history         (0.0.10) Speed / safety improvements
// +@history         (0.0.9) History begins.
// +@macro           PROPDEFINED(a,b) _undefined!=typeof a[b]
// +@macro           PROPDEFINED(a,b,c) _undefined!=typeof a[b]&&_undefined!=typeof a[c]
// +@macro           PROPDEFINED(a,b,c,d) _undefined!=typeof a[b]&&_undefined!=typeof a[c]&&_undefined!=typeof a[d]
// +@macro           PROPDEFINED(a,b,c,d,e) _undefined!=typeof a[b]&&_undefined!=typeof a[c]&&_undefined!=typeof a[d]&&_undefined!=typeof a[e]
// +@macro           PROPTREEDEFINED(a,b,c) _undefined!=typeof a[b]&&_undefined!=typeof a[b][c]
// +@macro           PROPTREEDEFINED(a,b,c,d) _undefined!=typeof a[b]&&_undefined!=typeof a[b][c]&&_undefined!=typeof a[b][c][d]
// +@macro           PROPTREEDEFINED(a,b,c,d,e) _undefined!=typeof a[b]&&_undefined!=typeof a[b][c]&&_undefined!=typeof a[b][c][d]&&_undefined!=typeof a[b][c][d][e]
// +@macro           HASPROP(a,b) b in a
// +@macro           HASPROP(a,b,c) b in a&&c in a
// +@macro           HASPROP(a,b,c,d) b in a&&c in a&&d in a
// +@macro           HASPROP(a,b,c,d,e) b in a&&c in a&&d in a&&e in a
// +@macro           HASPROPTREE(a,b,c) b in a&&c in a[b]
// +@macro           HASPROPTREE(a,b,c,d) b in a&&c in a[b]&&d in a[b][c]
// +@macro           HASPROPTREE(a,b,c,d,e) b in a&&c in a[b]&&d in a[b][c]&&e in a[b][c][d]
// +@macro           IFHASPROP(a,b,c,d) b in a?c:d
// +@macro           IFHASPROP(a,b,c,d,e) b in a&&c in a?d:e
// +@macro           IFHASPROP(a,b,c,d,f,g) b in a&&c in a&&d in a?f:g
// +@macro           IFHASPROP(a,b,c,d,e,h,i) b in a&&c in a&&d in a&&e in a?h:i
// +@macro           EXISTS(a) _undefined!=typeof a
// +@macro           IFEXISTS(a,b,c) _undefined!=typeof a?b:c
// +@macro           NOTEXISTS(a) _undefined==typeof a
// +@macro           ARGUMENTS(a) Slice.call(arguments,a)
// +@macro           ARGUMENTS(a,b) Slice.call(arguments,a,b)
// +@macro           ISFUNCTION(a) "function"==typeof a
// +@macro           ISOBJECT(a) "object"==typeof a
// +@macro           ISBOOLEAN(a) "boolean"==typeof a
// +@macro           ISSTRING(a) "string"==typeof a
// ==/UserScript==
/*
 * @overview [API for interacting with myUserJS.org]{@link jMod}
 * @author jgjake2
 * @version {{{API_VERSION}}}
 * @see {@link jMod}
 * @todo Add cookie storage
 * @todo Finish documentation
 */

/***********************************
 ** MacroDoc
 **********************************/
ImportScript('Core.MacroDoc');

/**
 * @global
 * @namespace jMod
 * @author jgjake2
 * @version {{{API_VERSION}}}
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
		_jQueryAvailable = EXISTS($)?true:false,
		jModReady = -1,
		_css = "@import url(//fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700);\n"
		+"@import url(http://code.jmod.info/fonts/sansation.css);\n",
		defaultjModCSSURL = {{{DEBUG}}} ? "@import url(//test2.myuserjs.org/API/{{{API_VERSION}}}/jMod.css);\n" : "@import url(http://code.jmod.info/{{{API_VERSION}}}/jMod.css);\n",
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
	DefineLockedProp('version', '{{{API_VERSION}}}');
	
	/**
	 * Date of build
	 * @name jMod.build_time
	 * @memberOf! jMod
	 * @type {string}
	 */
	DefineLockedProp('build_time', '{{{BUILD_TIME}}}');
	
	/**
	 * Current build type (beta|release)
	 * @name jMod.build_type
	 * @memberOf! jMod
	 * @type {string}
	 */
	DefineLockedProp('build_type', '{{{BUILD_TYPE}}}');
	
	/**
	 * Is debug mode enabled
	 * @name jMod.debug
	 * @memberOf! jMod
	 * @type {boolean}
	 */
	DefineLockedProp('_debug', {{{DEBUG}}});
	
	Object.defineProperty(jMod, 'debug', {
		get: function(){
			try{
				return EXISTS(jMod.Config.debug)?jMod.Config.debug:jMod._debug;
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
			if(_jQueryAvailable || EXISTS($))
				return (_jQueryAvailable = true);
			
			if(EXISTS(jQuery))
				return ($ = jQuery, _jQueryAvailable = true);
			
			if(EXISTS(unsafeWindow.jQuery))
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
	ImportScript('Core.Performance');
	
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
	ImportScript('Core.prototypes');

	/***********************************
	 ** Default Config Values
	 **********************************/
	ImportScript('Core.Config');
	
	/***********************************
	 ** Parse Meta Data
	 **********************************/
	ImportScript('API.parseMetaData');
	
	/***********************************
	 ** Get Script Info
	 **********************************/
	ImportScript('Core.ScriptInfo');
	var cssResourceAdded = false;
	if(EXISTS(GM_info) || EXISTS(GM_getMetadata)){
		try{
			ScriptInfo.set();
		}catch(e){}
		// If script has a resource named "jModCSS", load it instead of importing the remote url
		
		var resources = jConfig('script.script_info.resource');
		if(resources && resources.jModCSS && EXISTS(GM_getResourceText)){
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
	ImportScript('Language.Language');
	
	/***********************************
	 ** _call
	 **********************************/
	ImportScript('Core._call');
	
	/***********************************
	 ** Element Manipulation Functions
	 **********************************/
	ImportScript('Core.Element');

	/***********************************
	 ** Log
	 **********************************/
	ImportScript('API.log');
	
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
	ImportScript('Core.Events');
	
	/***********************************
	 ** Observer
	 **********************************/
	ImportScript('Core.Observer');
	
	/***********************************
	 ** File Selector
	 **********************************/
	ImportScript('Core.FileSelector');

	//if(jConfig('debug')) jMod.Log('jMod.Config', jMod.Config);

	/***********************************
	 ** Add Style
	 **********************************/
	ImportScript('API.addStyle');
	 
	/***********************************
	 ** Add Script
	 **********************************/
	ImportScript('API.addScript');

	/***********************************
	 ** Content Eval
	 **********************************/
	ImportScript('API.contentEval');
	
	/***********************************
	 ** Cookie
	 **********************************/
	ImportScript('API.Cookie');
	
	/***********************************
	 ** Storage
	 **********************************/
	ImportScript('API.Storage');
	
	/***********************************
	 ** Get Resource
	 **********************************/
	ImportScript('API.getResource');
	
	/***********************************
	 ** Date
	 **********************************/
	ImportScript('API.Date');
	
	/***********************************
	 ** jQuery Ajax Extensions
	 **********************************/
	ImportScript('jQuery.Ajax');
	
	/***********************************
	 ** jQuery Selector Extensions
	 **********************************/
	ImportScript('jQuery.Selectors');

	/***********************************
	 ** jQuery Tokenizer Extension
	 **********************************/
	ImportScript('jQuery.Tokenizer');
	
	/***********************************
	 ** Scrollbar
	 **********************************/
	ImportScript('Core.Scrollbar');
	
	/***********************************
	 ** Tooltip
	 **********************************/
	ImportScript('Core.Tooltip');

	/***********************************
	 ** Notifications
	 **********************************/
	ImportScript('Core.Notification');
	
	/***********************************
	 ** Tabs
	 **********************************/
	ImportScript('Core.Tabs');

	/***********************************
	 ** Notifications
	 **********************************/
	ImportScript('Core.Modal');

	/***********************************
	 ** Settings
	 **********************************/
	ImportScript('Core.Settings');
	 
	/***********************************
	 ** Get DOM Timing
	 **********************************/
	ImportScript('Core.getDOMTiming');
	
	/***********************************
	 ** Send Message
	 **********************************/
	ImportScript('Core.SendMessage');

	/***********************************
	 ** Update
	 **********************************/
	ImportScript('Core.Update');
	
	/***********************************
	 ** Error
	 **********************************/
	ImportScript('Core.Error');

	if(NOTEXISTS(jMod.Config.script.script_info) && EXISTS(GM_info)){
		ScriptInfo.set();
	}
	
	/***********************************
	 ** Init
	 **********************************/
	ImportScript('Core.init');
	
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
