// ==UserScript==
// @name             jMod
// @namespace        http://myuserjs.org/
// @author           jgjake2
// @homepage         http://myuserjs.org/
// @include          *
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
+function(unsafeWindow, jMod){
	unsafeWindow.jMod = this.jMod = jMod;
	
	if(jMod.debug){
		jMod.log.groupEnd('jMod Initialize');
	}
	window.focus();
}.call(
	this,
	"undefined"!==typeof unsafeWindow?unsafeWindow:("undefined"!==typeof window?window:this),
function(initStart, $, console, window, unsafeWindow, _undefined, undefined){
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
	
	/**
	 * API Namespace
	 * @memberOf! jMod
	 * @namespace jMod.API
	 */
	var API = jMod.API = {},
		Slice = Array.prototype.slice,
		_jQueryAvailable = EXISTS($)?true:false,
		jModReady = -1,
		//({{{DEBUG}}} ? "@import url(//test2.myuserjs.org/css/smartadmin-production-all-namespaced.css);\n" : "@import url(//myuserjs.org/css/smartadmin-production-all-namespaced.css);\n")
		_css = "@import url(//fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700);\n"
		+"@font-face {font-family: 'Sansation';font-style: normal;font-weight: 400;src: local('Sansation Regular'), local('Sansation-Regular'), url(http://myuserjs.org/fonts/Sansation-Regular.ttf) format('ttf');}\n"
		+"@font-face {font-family: 'Sansation';font-style: normal;font-weight: 300;src: local('Sansation Light'), local('Sansation-Light'), url(http://myuserjs.org/fonts/Sansation-Light.ttf) format('ttf');}\n"
		+"@font-face {font-family: 'Sansation';font-style: italic;font-weight: 300;src: local('Sansation Light Italic'), local('Sansation-LightItalic'), url(http://myuserjs.org/fonts/Sansation-LightItalic.ttf) format('ttf');}\n"
		+"@font-face {font-family: 'Sansation';font-style: normal;font-weight: 700;src: local('Sansation Bold'), local('Sansation-Bold'), url(http://myuserjs.org/fonts/Sansation-Bold.ttf) format('ttf');}\n"
		+"@font-face {font-family: 'Sansation';font-style: italic;font-weight: 400;src: local('Sansation Italic'), local('Sansation-Italic'), url(http://myuserjs.org/fonts/Sansation-Italic.ttf) format('ttf');}\n"
		+"@font-face {font-family: 'Sansation';font-style: italic;font-weight: 700;src: local('Sansation Bold Italic'), local('Sansation-BoldItalic'), url(http://myuserjs.org/fonts/Sansation-BoldItalic.ttf) format('ttf');}\n",
		defaultjModCSSURL = "@import url(//myuserjs.org/css/smartadmin-production-all-namespaced.css);\n",
		CurrentRunningScript = {
			id: 'jMod',
			config: {},
			el: unsafeWindow.document&&unsafeWindow.document.currentScript?unsafeWindow.document.currentScript:undefined
		}
		
	var DefineLockedProp = function(name, value, target, en){
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
	}
	

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
	if(jMod.debug) jModLogTime('jMod Initialize Time Elapsed');
	return jMod;
}(
	("undefined"!==typeof window.performance?window.performance.now():0.0),
	"undefined"!==typeof jQuery?jQuery:undefined,
	console,
	window,
	"undefined"!==typeof unsafeWindow?unsafeWindow:("undefined"!==typeof window?window:this),
	"undefined"
));

