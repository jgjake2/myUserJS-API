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
}.call(
	this,
	"undefined"!==typeof unsafeWindow?unsafeWindow:("undefined"!==typeof window?window:this),
function(initStart, $, console, unsafeWindow, _undefined, undefined){
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
	var jMod = function(args){return jMod._call.apply(jMod, arguments);};
	jMod.InitializeStartTime = initStart;
	jMod.InitializeEndTime = -1;
	
	
	/**
	 * API Namespace
	 * @memberOf! jMod
	 * @namespace jMod.API
	 */
	var API = jMod.API = {};
	var jModReady = -1,
		Slice = Array.prototype.slice,
		_jQueryAvailable = EXISTS($)?true:false,
		_css = "@import url(//fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700);\n"
		+ ({{{DEBUG}}} ? "@import url(//test2.myuserjs.org/css/smartadmin-production-all-namespaced.css);\n" : "@import url(//myuserjs.org/css/smartadmin-production-all-namespaced.css);\n")
		+"@font-face {font-family: 'Sansation';font-style: normal;font-weight: 400;src: local('Sansation Regular'), local('Sansation-Regular'), url(http://myuserjs.org/fonts/Sansation-Regular.ttf) format('ttf');}\n"
		+"@font-face {font-family: 'Sansation';font-style: normal;font-weight: 300;src: local('Sansation Light'), local('Sansation-Light'), url(http://myuserjs.org/fonts/Sansation-Light.ttf) format('ttf');}\n"
		+"@font-face {font-family: 'Sansation';font-style: italic;font-weight: 300;src: local('Sansation Light Italic'), local('Sansation-LightItalic'), url(http://myuserjs.org/fonts/Sansation-LightItalic.ttf) format('ttf');}\n"
		+"@font-face {font-family: 'Sansation';font-style: normal;font-weight: 700;src: local('Sansation Bold'), local('Sansation-Bold'), url(http://myuserjs.org/fonts/Sansation-Bold.ttf) format('ttf');}\n"
		+"@font-face {font-family: 'Sansation';font-style: italic;font-weight: 400;src: local('Sansation Italic'), local('Sansation-Italic'), url(http://myuserjs.org/fonts/Sansation-Italic.ttf) format('ttf');}\n"
		+"@font-face {font-family: 'Sansation';font-style: italic;font-weight: 700;src: local('Sansation Bold Italic'), local('Sansation-BoldItalic'), url(http://myuserjs.org/fonts/Sansation-BoldItalic.ttf) format('ttf');}\n";
	var DefineLockedProp = function(name, value, target, en){
		var opts = {
			configurable: false,
			enumerable: (EXISTS(en)?en:true)
		}
		if(typeof value === "function")
			opts.get = value;
		else {
			opts.value = value;
			opts.writable = false;
		}
		Object.defineProperty(target || jMod, name, opts);
	}
	var CurrentRunningScript = {
		id: 'jMod',
		config: {},
		el: unsafeWindow.document&&unsafeWindow.document.currentScript?unsafeWindow.document.currentScript:undefined
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
				//return jMod.Config.debug || jMod._debug;
				return _undefined!==typeof jMod.Config.debug?jMod.Config.debug:jMod._debug;
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
			if(_jQueryAvailable)
				return _jQueryAvailable;
			if(EXISTS($)){
				return (_jQueryAvailable = true);
			}
			if(EXISTS(jQuery)){
				$ = jQuery;
				return (_jQueryAvailable = true);
			}
			if(EXISTS(unsafeWindow.jQuery)){
				$ = unsafeWindow.jQuery;
				return (_jQueryAvailable = true);
			}
			return false;
		},
		set: function(val){
			_jQueryAvailable = (val?true:false);
			try{
				if(RealTypeOf(val) == "jQuery"){
					$ = val;
				}
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
	
	if(NOTEXISTS(jMod.Config.script.script_info) && EXISTS(GM_info)){
		ScriptInfo.set();
	}
	
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
		jMod.log.group('jMod Initialize');
		
		if(CurrentRunningScript.el)
			jMod.Info('CurrentRunningScript', CurrentRunningScript);
	}
	
	/***********************************
	 ** Events
	 **********************************/
	ImportScript('Core.Events');

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
	 ** GM_Storage
	 **********************************/
	ImportScript('API.GM_Storage');
	 
	/***********************************
	 ** LocalStorage
	 **********************************/
	ImportScript('API.localStorage');

/**
 * Get a value from the default storage engine (see [Storage configuration]{@link jMod.Config})
 * @function getValue
 * @memberof jMod
 * @param {string} key - name
 * @param {string|boolean|number} [def] - default value to return if key does not exist
 * @see jMod.API.localStorage
 * @see jMod.API.GM_Storage
 */
jMod.getValue = function(key, def){
	if(jConfig('API.Storage.engine') == 'GM_Storage' && EXISTS(GM_getValue))
		return API.GM_Storage.getValue.apply(API.GM_Storage, arguments);
	return API.localStorage.getValue.apply(API.localStorage, arguments);
}

/**
 * Set a value in the default storage engine (see [Storage configuration]{@link jMod.Config})
 * @function setValue
 * @memberof jMod
 * @param {string} key - name
 * @param {string|boolean|number} [value] - value to be set
 * @see jMod.API.localStorage
 * @see jMod.API.GM_Storage
 */
jMod.setValue = function(key, def){
	if(jConfig('API.Storage.engine') == 'GM_Storage' && EXISTS(GM_setValue))
		return API.GM_Storage.setValue.apply(API.GM_Storage, arguments);
	return API.localStorage.setValue.apply(API.localStorage, arguments);
}
/**
 * Delete a value from the default storage engine (see [Storage configuration]{@link jMod.Config})
 * @function deleteValue
 * @memberof jMod
 * @param {string} key - name to be deleted
 * @see jMod.API.localStorage
 * @see jMod.API.GM_Storage
 */
jMod.deleteValue = function(key){
	if(jConfig('API.Storage.engine') == 'GM_Storage' && EXISTS(GM_deleteValue))
		return API.GM_Storage.deleteValue.apply(API.GM_Storage, arguments);
	return API.localStorage.deleteValue.apply(API.localStorage, arguments);
}

	/***********************************
	 ** Date
	 **********************************/
	ImportScript('API.Date');

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

	/***********************************
	 ** Init
	 **********************************/
	ImportScript('Core.init');
	
	if(performance.available){
		setTimeout(function(){
			jMod.InitializeEndTime = performance.now;
		}, 0);
	}
	jModLogTime('jMod Initialize Time Elapsed');
	return jMod;
}(
	("undefined"!=typeof window.performance?window.performance.now():0.0),
	"undefined"!=typeof jQuery?jQuery:undefined,
	console,
	"undefined"!=typeof unsafeWindow?unsafeWindow:("undefined"!==typeof window?window:this),
	"undefined"
));

