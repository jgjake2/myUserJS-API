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
/*
 * @overview [API for interacting with myUserJS.org]{@link jMod}
 * @author jgjake2
 * @version 0.0.17
 * @see {@link jMod}
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
 * @global
 * @namespace jMod
 * @author jgjake2
 * @version 0.0.17
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
		_jQueryAvailable = _undefined!=typeof $?true:false,
		_css = "@import url(//fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700);\n"
		+ (false ? "@import url(//test2.myuserjs.org/css/smartadmin-production-all-namespaced.css);\n" : "@import url(//myuserjs.org/css/smartadmin-production-all-namespaced.css);\n")
		+"@font-face {font-family: 'Sansation';font-style: normal;font-weight: 400;src: local('Sansation Regular'), local('Sansation-Regular'), url(http://myuserjs.org/fonts/Sansation-Regular.ttf) format('ttf');}\n"
		+"@font-face {font-family: 'Sansation';font-style: normal;font-weight: 300;src: local('Sansation Light'), local('Sansation-Light'), url(http://myuserjs.org/fonts/Sansation-Light.ttf) format('ttf');}\n"
		+"@font-face {font-family: 'Sansation';font-style: italic;font-weight: 300;src: local('Sansation Light Italic'), local('Sansation-LightItalic'), url(http://myuserjs.org/fonts/Sansation-LightItalic.ttf) format('ttf');}\n"
		+"@font-face {font-family: 'Sansation';font-style: normal;font-weight: 700;src: local('Sansation Bold'), local('Sansation-Bold'), url(http://myuserjs.org/fonts/Sansation-Bold.ttf) format('ttf');}\n"
		+"@font-face {font-family: 'Sansation';font-style: italic;font-weight: 400;src: local('Sansation Italic'), local('Sansation-Italic'), url(http://myuserjs.org/fonts/Sansation-Italic.ttf) format('ttf');}\n"
		+"@font-face {font-family: 'Sansation';font-style: italic;font-weight: 700;src: local('Sansation Bold Italic'), local('Sansation-BoldItalic'), url(http://myuserjs.org/fonts/Sansation-BoldItalic.ttf) format('ttf');}\n";
	var DefineLockedProp = function(name, value, target, en){
		var opts = {
			configurable: false,
			enumerable: (_undefined!=typeof en?en:true)
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
	DefineLockedProp('version', '0.0.17');
	
	/**
	 * Date of build
	 * @name jMod.build_time
	 * @memberOf! jMod
	 * @type {string}
	 */
	DefineLockedProp('build_time', '1421098235000');
	
	/**
	 * Current build type (beta|release)
	 * @name jMod.build_type
	 * @memberOf! jMod
	 * @type {string}
	 */
	DefineLockedProp('build_type', 'beta');
	
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
			if(_undefined!=typeof $){
				return (_jQueryAvailable = true);
			}
			if(_undefined!=typeof jQuery){
				$ = jQuery;
				return (_jQueryAvailable = true);
			}
			if(_undefined!=typeof unsafeWindow.jQuery){
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
jMod.parseStack = function(stackText){
	var o = [];
	//var anonFunctionPatt = /\@((?:https?\:\/\/)?[^\s\:]+).*?([^\:\s]*)?\:(\d+)(?:\:(\d+))?\s*$/gi;
	var stackPatt = /([^\s]*)\@file\:\/\/\/([^\s]+?(?:\/([^\/]+?\.(user\.js|js|json|php)))?):(\d+)(?:\:(\d+))?/gi;
	var match;
	while ((match = stackPatt.exec(stackText)) != null) {
		var tmp = {
			functionName: match[1],
			fullFileName: match[2],
			fileName: match[3],
			fileExt: match[4],
			lineNumber: match[5],
			columnNumber: match[6]
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

	// URL Builder Class

	
	// Versions Class

	
	// isElement

	
	// Parse Stack

	
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
	
	function eventCancel(e){
		if(!e)
		if(window.event)
			e = window.event;
		else
			return;
		if(e.cancelBubble != null) e.cancelBubble = true;
		if(e.stopPropagation) e.stopPropagation();
		if(e.preventDefault) e.preventDefault();
		if(window.event) e.returnValue = false;
		if(e.cancel != null) e.cancel = true;
	}

	function mExportFunction(func, scope, args){
		if(typeof exportFunction !== _undefined){
			exportFunction(func, scope, args);
		} else {
			var name;
			if(typeof args === _undefined) args = {};
			if(typeof args.defineAs !== _undefined) {
				name = args.defineAs;
			} else if(typeof func === "function" && func.name != ''){
				name = func.name
			}
			scope[name || ''] = func;
		}
	}
	/*
	function mCloneInto(obj, scope, args){
		if(typeof cloneInto !== _undefined){
			return cloneInto(obj, scope, args);
		} else {
			// Todo
			return obj;
		}
	}
	*/
	
	function mCloneInto(obj, scope, args){
		if(typeof cloneInto !== _undefined){
			try{
				return cloneInto(obj, scope, args);
			}catch(e){}
			
			var tmp = {};
			//tmp = jMod.extend(tmp, obj);
			for(var i in obj){
				if(Object.prototype.hasOwnProperty.call(obj, i)){
					if(["string", "number"].indexOf(typeof obj[i])){
						try{
							tmp[i] = cloneInto(obj[i], scope, args);
						}catch(e){}
					} else if(typeof obj[i] == "object"){
						tmp[i] = {};
						for(var x in obj[i]){
							try{
								if(Object.prototype.hasOwnProperty.call(obj[i], x)){
									tmp[i][x] = cloneInto(obj[i][x], scope, args);
								}
							}catch(e){}
						}
					}
				}
			}
			//return tmp;
			return cloneInto(tmp, scope, args);
		}
		
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
				copy = options[ name ];
				// Prevent never-ending loop
				if ( target === copy ) {
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
				copy = options[ name ];
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


	
	
	/*! https://github.com/tysonmatanich/viewportSize */
	/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
	unsafeWindow.viewportSize = {};

	unsafeWindow.viewportSize.getHeight = function () {
		return getSize("Height");
	};

	unsafeWindow.viewportSize.getWidth = function () {
		return getSize("Width");
	};

	var getSize = function (Name) {
		var size;
		var name = Name.toLowerCase();
		var document = unsafeWindow.document;
		var documentElement = document.documentElement;
		if (unsafeWindow["inner" + Name] === undefined) {
			// IE6 & IE7 don't have window.innerWidth or innerHeight
			size = documentElement["client" + Name];
		}
		else if (unsafeWindow["inner" + Name] != documentElement["client" + Name]) {
			// WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy

			// Insert markup to test if a media query will match document.doumentElement["client" + Name]
			var bodyElement = document.createElement("body");
			bodyElement.id = "vpw-test-b";
			bodyElement.style.cssText = "overflow:scroll";
			var divElement = document.createElement("div");
			divElement.id = "vpw-test-d";
			divElement.style.cssText = "position:absolute;top:-1000px";
			// Getting specific on the CSS selector so it won't get overridden easily
			divElement.innerHTML = "<style>@media(" + name + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + name + ":7px!important}}</style>";
			bodyElement.appendChild(divElement);
			documentElement.insertBefore(bodyElement, document.head);

			if (divElement["offset" + Name] == 7) {
				// Media query matches document.documentElement["client" + Name]
				size = documentElement["client" + Name];
			}
			else {
				// Media query didn't match, use window["inner" + Name]
				size = unsafeWindow["inner" + Name];
			}
			// Cleanup
			documentElement.removeChild(bodyElement);
		}
		else {
			// Default to use window["inner" + Name]
			size = unsafeWindow["inner" + Name];
		}
		return size;
	};

	

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
	 * @property {boolean} debug
	 * @example
	 * // Get the current value of script.username
	 * jMod('get', 'script.username')
	 * // or
	 * jMod.Config('script.username');
	 * // or
	 * jMod.Config.script.username;
	 *
	 * // Set the current value of script.username
	 * jMod('set', 'script.username', 'foo')
	 * // or
	 * jMod.Config('script.username', 'foo');
	 * // or
	 * jMod.Config.script.username = 'foo';
	 */
	 
	var jConfig = jMod.Config = function(key, value){
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
			if(unsafeWindow.document.getElementById(CurrentRunningScript.id)){
				var i = 0;
				while(unsafeWindow.document.getElementById(CurrentRunningScript.id + '-' + i))
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
	return undefined;
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
		var callerScriptInfo;
		var output = {};
		
		if(ScriptInfo.gotFileInfo)
			return jConfig('script.script_file_info');
		var e = new Error();
		//console.log(e.stack);
		if(e.stack.indexOf('.user.js') == -1)
			return undefined;
		var tStack = jMod.parseStack(e.stack.toString());
		if(tStack.length > 0){
			//console.log('tStack', tStack);
			for(var i = tStack.length - 1; i >= 0; i--){
				if(tStack[i].fileName != '' && tStack[i].fileExt.toLowerCase() == 'user.js'){
					callerScriptInfo = tStack[i];
					output.userscript_file_name = callerScriptInfo.fileName;
					output.userscript_file_path = callerScriptInfo.fullFileName;
					ScriptInfo.gotFileInfo = true;
					jConfig('script.script_file_info', output);
					//jMod.log.Info('Userscript File Name: ' + callerScriptInfo.fullFileName);
					return output;
					break;
				}
			}
		}
		return undefined;
	}
	
	Object.defineProperty(ScriptInfo, 'InfoSet', {
		get: function(){
			return (typeof jConfig('script.script_info') !== _undefined);
		}
	});
	
	ScriptInfo.set = function(data){
		var output = {};
		try{
			var callerScriptInfo = ScriptInfo.getScriptFileInfo();
			if(typeof callerScriptInfo !== _undefined)
				output = jMod.extend(output, callerScriptInfo);
		} catch(e) {}
		
		try{
			var gm_info;
			var scriptMetaStr;
			var pMetaData;
			
			if(typeof data === _undefined && typeof GM_info !== _undefined){
				data = {
					'gm_info': GM_info,
					'has_GM_info': true,
					'has_GM_getMetadata': (typeof GM_getMetadata === _undefined ? false : true)
				}
			}
			
			if(typeof data === "object"){
				gm_info = getFirstValidKeyValue(data, ['GM_info', 'gm_info', 'ginfo']);
				if(typeof gm_info === _undefined && typeof data.scriptSource !== _undefined)
					gm_info = data;
				if(typeof gm_info !== _undefined && typeof gm_info.scriptMetaStr !== _undefined){
					scriptMetaStr = gm_info.scriptMetaStr;
				}
			} else if(typeof data === "string"){
				scriptMetaStr = data;
			}
			
			if(typeof scriptMetaStr !== _undefined){
				pMetaData = jMod.API.ParseMetaData(scriptMetaStr);
				
				for(var key in pMetaData){
					if(typeof output[key] === _undefined) output[key] = pMetaData[key];
				}
			}
			
			if(typeof gm_info !== _undefined){
				//console.log(gm_info);
				
				if(typeof gm_info.script !== _undefined){
					for(var key in gm_info.script){
						if(typeof output[key] === _undefined) output[key] = gm_info.script[key];
					}
				}
				
				if(typeof gm_info.uuid !== _undefined){
					output['gmUUID'] = gm_info.uuid;
				} else if(typeof gm_info.script.uuid !== _undefined){
					output['gmUUID'] = gm_info.script.uuid;
				}
				
				if(typeof gm_info.scriptHandler !== _undefined){
					if(gm_info.scriptHandler.toLowerCase() == 'tampermonkey'){
						output.script_handler = 'Tampermonkey';
						output.script_handler_version = gm_info.version;
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
			
			if(typeof pMetaData !== _undefined){	
				//console.log('pMetaData', pMetaData);
				
				var urlInfo;
				var key = getFirstValidKey(pMetaData, ['downloadURL', 'updateURL', 'jModupdateURL', 'jModUpdateURL', 'jModdownloadURL', 'jModDownloadURL'], function(k, val){return jMod.ScriptInfo.getURLInfo(val);});
				if(typeof key !== _undefined && (urlInfo = ScriptInfo.getURLInfo(pMetaData[key]))){
					//console.log('urlInfo', urlInfo);
					jConfig('script.username', urlInfo.username);
					jConfig('script.script_name', urlInfo.script_name);
					if(['meta', 'metajs', 'data'].indexOf(urlInfo.get_type.toLowerCase()) != -1){
						jConfig('script.get_type', urlInfo.get_type.toLowerCase());
					}
				} else {
					var tmp;
					if((tmp = getFirstValidKeyValue(pMetaData, ['jModusername', 'jMod_username'])))
						jConfig('script.username', tmp);
						
					if((tmp = getFirstValidKeyValue(pMetaData, ['jModscriptname', 'jMod_script_name'])))
						jConfig('script.script_name', tmp);
				}
				
				if(typeof pMetaData['jMod'] != _undefined){
					try{
						var tmpConfig = JSON.parse(pMetaData['jMod']);
						if(tmpConfig)
							jMod.extend(true, jMod.Config, tmpConfig);
					} catch(e) {
						//console.error('Error parsing options in MetaBlock', e);
						jModError(e, 'ScriptInfo.set', 'Error parsing options in MetaBlock');
					}
				}
				
				
			}
			
		} catch(e) {
			//console.error('Error ScriptInfo.set', e);
			jModError(e, 'ScriptInfo.set');
		}
		
		Object.defineProperty(jMod.Config.script, 'script_info', {
			value: Object.freeze(output),
			writable: false,
			enumerable: true,
			configurable: false
		});
		
		
		return Object.freeze(output);
	}
	
	ScriptInfo.get = function(){
		//var r = jConfig('script.script_info');
		var r = jMod.Config.script.script_info;
		return (typeof r != _undefined ? r : ScriptInfo.set.apply(this, arguments));
	}
	
	
	if(_undefined==typeof jMod.Config.script.script_info && _undefined!=typeof GM_info){
		ScriptInfo.set();
	}
	
	/***********************************
	 ** _call
	 **********************************/
jMod._call = function(){
	var type, tmp, arg0, arg1, length = arguments.length;
	// Try to get the Userscript's file info if jMod() is being called from the script
	try{if(!ScriptInfo.gotFileInfo)ScriptInfo.getScriptFileInfo();}catch(e){}
	try{if(_undefined===typeof jMod.Config.script.script_info)ScriptInfo.get();}catch(e){}
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
	if(_undefined===typeof target)
		target = unsafeWindow.document;

	try{
		if(jMod.jQueryAvailable && nojQuery !== true){
			try{
				return $(selector, target).first()[0];
			}catch(e){return;}
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
	if(!target)
		target = (_undefined!==typeof document?document:unsafeWindow.document);
	try{
		if(jMod.jQueryAvailable && nojQuery !== true){
			try{
				return $(selector, target).toArray();
			}catch(e){return;}
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
		jModError(e, 'jMod.Element');
	}
};

jMod.Element._call = function(command){
	if(typeof jMod.Element[command] === "function")
		return jMod.Element[command].apply(jMod.Element, Slice.call(arguments, 1));
}


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
	var classArr = el.className.split(' ');
	if(classArr.indexOf(className) == -1)
		return false;
	return true;
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
	var r = [];
	var classArr = el.className.split(' ');
	var classNamesArr = (typeof classNames === "string" ? classNames.split(' ') : classNames);
	for(var i in classNamesArr)
		if(classArr.indexOf(classNamesArr[i]) != -1)
			r.push(classNamesArr[i]);
	return r;
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
	var r = [];
	var classArr = el.className.split(' ');
	var classNamesArr = (typeof classNames === "string" ? classNames.split(' ') : classNames);
	for(var i in classNamesArr)
		if(classArr.indexOf(classNamesArr[i]) == -1)
			r.push(classNamesArr[i]);
	return r;
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
	var classNamesArr = (typeof classNames === "string" ? classNames.split(' ') : classNames);
	var has = el.className.split(' ');
	for(var i = 0; i < classNamesArr.length; i++){
		if(has.indexOf(classNamesArr[i]) == -1)
			has.push(classNamesArr[i]);
	}
	el.className = has.join(' ');
	return el;
}

/**
 * Remove a class from a DOM Element
 * @function removeClass
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {string} className - Class name to remove
 * @returns {Element} The input element
 */
var removeClass = jMod.Element.removeClass = function(el, className) {
	var classStr = el.className;
	var classArr = classStr.split(' ');
	var index = classArr.indexOf(className);
	if(index == -1)
		return el;
	classArr.splice(index, 1);
	el.className = classArr.join(' ');
	return el;
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
	var namesArr;
	if(typeof classNames === "string")
		namesArr = Slice.call(arguments, 1);
	else
		namesArr = classNames;
	var classStr = el.className;
	var classArr = classStr.split(' ');
	for(var i in namesArr){
		var index = classArr.indexOf(namesArr[i]);
		if(index != -1)
			classArr.splice(index, 1);
	}
	el.className = classArr.join(' ');
	return el;
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
	r = [];
	if(typeof attrs === "string")
		attrs = attrs.split(' ');
	for(var i = 0; i < attrs.length; i++)
		if(el.hasAttribute(attrs[i]))
			r.push(attrs[i]);
	return r;
}

var getAttribute = function(el, attr) {
	return el.getAttribute(attr);
}

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
	try{
		if(!isElement(el) && typeof el === "object" && el.type !== undefined){
			var targetKey;
			if(el.innerHTML !== undefined)
				targetKey = 'innerHTML';
			if(el.text !== undefined)
				targetKey = 'text';
			if(!targetKey){
				el.innerHTML = [data];
			} else {
				if(RealTypeOf(el[targetKey]) == 'array'){
					el[targetKey].push(data);
				} else {
					el[targetKey] = [el[targetKey], data];
				}
			}
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
						for(var i = 0; i < data.length; i++)
							el = appendChild(el, data[i]);
						break;
					case "object":
					case "map":
						var tmpEl = createNewElement(data);
						if(tmpEl)
							el.appendChild(tmpEl);
						break;
					case "string":
					case "number":
					case "symbol":
					case "boolean":
					default:
						var dummy = document.createElement('div');
						dummy.innerHTML = data;
						var nodes = dummy.childNodes;
						for(var i = 0; i < nodes.length; i++)
							el.appendChild(nodes[i]);
						break;
				}
			}
		}
	} catch(e) {
		//console.error('Error! appendChild', e);
		jModError(e, 'jMod.Element.appendChild');
	} finally {
		return el;
	}
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
const validElementProps = ['checked', 'title', 'async', 'defer', 'src', 'onerror', 'onload', 'responseCallback', 'value', 'max', 'min'];
 
/**
 * Create a new DOM element
 * @function createNewElement
 * @memberof jMod.Element
 * @param {jMod.Element.NewElementData} data - Element information
 * @returns {Element} The newly created element
 */
var createNewElement = jMod.Element.createNewElement = function(data) {
	var i,
		eventListeners = data.EventListeners || data.eventListeners,
		newElement = document.createElement(data.type || 'div');
	
	if(data.id !== undefined)
		newElement.id = data.id;
		
	if(data.className !== undefined)
		newElement.className = data.className;
	else if(data['class'] !== undefined)
		newElement.className = data['class'];
	
	if(typeof data.style === "string")
		newElement.style = data.style;
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
			if(typeof data.attributes[i] !== _undefined && data.attributes[i] !== null)
				newElement.setAttribute(i, data.attributes[i]);
		}
	}
	
	if(eventListeners){
		for(var eventName in eventListeners){
			if(typeof eventListeners[eventName] === "function"){
				newElement.addEventListener(eventName, eventListeners[eventName]);
			} else if(typeof eventListeners[eventName] === "object"){
				var capture = eventListeners[eventName].useCapture || eventListeners[eventName].Capture || eventListeners[eventName].capture || false;
				var callback = eventListeners[eventName].callback || eventListeners[eventName]['function'];
				if(callback){
					if(RealTypeOf(callback) == "array")
						for(i in callback)
							newElement.addEventListener(eventName, callback[i], capture);
					else
						newElement.addEventListener(eventName, callback, capture);
				}
				
			}
		}
	}
	
	appendChild(newElement, getFirstValidKeyValue(data, ['innerHTML', 'text']));
	
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
		if(jMod.Element.hasClass(parent, className))
			return true;
	}
	return false;
}

var findParentWithClass = jMod.Element.findParentWithClass = function(el, className) {
	var parent = el;
	while(parent.parentElement){
		parent = parent.parentElement;
		if(jMod.Element.hasClass(parent, className))
			return parent;
	}
	return;
}

function fireClick(el, bubbles, cancelable){
	if(document.createEvent) {
		var evt = document.createEvent('MouseEvents');
		evt.initEvent('click', bubbles || true, cancelable || true);
		el.dispatchEvent(evt);	
	} else if(document.createEventObject) {
		el.fireEvent('onclick');	
	} else if(typeof el.onclick == "function") {
		el.onclick();	
	}
}


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
		if(fn(console)) return console;
		if(fn(this.console)) return this.console;
		if(fn(window.console)) return window.console;
		if(fn(unsafeWindow.console)) return unsafeWindow.console;
		if(fn(unsafeWindow.window.console)) return unsafeWindow.window.console;
		
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
	
	jMod.log = jMod.API.log = {
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
		
		// For commands you can't call .apply on (like when an error object is involved)
		ScopedConsoleCommand: function(command, value){
			var isFormatted = (['debug','log','info','warn','error','exception'].indexOf(command)!=-1&&"string"==typeof value&&/(?:\%s|\%c|\%o|\%d|\%f|\%\.\df|\%i)/.test(value)); // Don't use GM_log on formatted logs
			//var ptr = (!isFormatted && _undefined!=this.wc && _undefined!=this.wc[command] ? this.wc : this.fb);
			var ptr = (isFormatted || (_undefined!=this.fb && _undefined!=this.fb[command])? this.fb : this.wc);
			try{
			switch(arguments.length){
				case 1:
					ptr[command].call(ptr);
					break;
				case 2:
					ptr[command].call(ptr, arguments[1]);
					break;
				case 3:
					ptr[command].call(ptr, arguments[1], arguments[2]);
					break;
				case 4:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3]);
					break;
				case 5:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4]);
					break;
				case 6:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
					break;
				case 7:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
					break;
				case 8:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
					break;
				case 9:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]);
					break;
				case 10:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);
					break;
				case 11:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10]);
					break;
				case 12:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11]);
					break;
				case 13:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12]);
					break;
				case 14:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13]);
					break;
				case 15:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14]);
					break;
				case 16:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14], arguments[15]);
					break;
			}
			}catch(e){}
		},
		
		ConsoleCommand: function(command, value){
			try{
				var args = Slice.call(arguments, 1);
				var safeArgs = mCloneInto(args, unsafeWindow, {
					cloneFunctions: true,
					wrapReflectors: true
				});
				
				var isFormatted = (['debug','log','info','warn','error','exception'].indexOf(command)!=-1&&"string"==typeof value&&/(?:\%s|\%c|\%o|\%d|\%f|\%\.\df|\%i)/.test(value)); // Don't use GM_log on formatted logs
				
				try{
					if(typeof this.fb !== _undefined && typeof this.fb[command] !== _undefined && jConfig('API.log.Firebug')){
						this.fb[command].apply(this.fb, args);
					} else {
						if(!isFormatted&&typeof this.wc !== _undefined && typeof this.wc[command] !== _undefined && jConfig('API.log.WebConsole'))
							this.wc[command].apply(this.wc, args);
					}
				}catch(e){
					if(typeof this.fb !== _undefined && typeof this.fb[command] !== _undefined && jConfig('API.log.Firebug')){
						this.fb[command].apply(this.fb, safeArgs);
					} else {
						if(!isFormatted&&typeof this.wc !== _undefined && typeof this.wc[command] !== _undefined && jConfig('API.log.WebConsole'))
							this.wc[command].apply(this.wc, safeArgs);
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
		},
		
		outputMessage: function(output_type, str){
			if(output_type.level <= jConfig('API.log.verbosity_level'))
				this.ConsoleCommand.apply(this, [output_type.value].concat(Slice.call(arguments, 1)));
		},
		
		fmt: {
			timePatt: '%.3fms',
			time: 'font-weight:bold;font-size:120%;color:red;',
			
			stchange: 'font-weight:bold;font-size:130%;color:blue;'
		}
	};
	
	for(i = 0; i < msgList.length; i++){
		jMod.API.log[msgList[i][0]] = (function(oType){
			return (function(){return this.outputMessage.apply(this, [OUTPUT_TYPES[oType]].concat(Slice.call(arguments)));}).bind(jMod.API.log);
		})(msgList[i][1]);
	}
	
	for(i = 0; i < fnList.length; i++){
		jMod.API.log[fnList[i]] = (function(fName){
			return (function(){if(functionEnabled(fName))return this.ConsoleCommand.apply(this, [fName].concat(Slice.call(arguments)));}).bind(jMod.API.log);
		})(fnList[i]);
	}
	
	for(i = 0; i < exportFunctions.length; i++)
		jMod[exportFunctions[i]] = (jMod.log[exportFunctions[i]]).bind(jMod.API.log);
	
	
	jMod.API.logFormatBuilder = function(){
		this.args = [];
		
		this.add = function(value, type, style){
			var isUndef = _undefined===typeof value;
			if(typeof type === _undefined) type = typeof value;
			var fmtType;
			switch(type){
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
				case "object":
				default:
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
	};
	
	/*
	var fmtBuild = new jMod.API.logFormatBuilder();
	var tmpObj = {taco: "bell"};
	fmtBuild.add("foo bar");
	fmtBuild.add(" \n");
	fmtBuild.add("mystring text", "string", "color:red;");
	fmtBuild.add(tmpObj);
	console.log(fmtBuild.build());
	*/
	
	
		
	jMod.log.UpdateAll();
		
}();

var jModError = function(e, title, message){
	var errorDefaultStyle = '';
	//var ErrorIconURL = 'http://www.shedworx.com/files/images/error.png';
	var ErrorIconURL = 'http://myuserjs.org/img/favicon/favicon.png';
	var errorIconStyle = 'font-size:175%;background-image:url("'+ErrorIconURL+'");background-size:auto 75%;background-repeat: no-repeat;background-position:left center;';
	
	var errorHeaderStyle = 'font-size:175%;font-weight:300;font-family:"Sansation","Open Sans",Arial;';
	
	var errorTitleStyle = 'color:#000;font-size:125%;';
	
	var errorLineStyle = 'color:blue;';
	
	// Have to get around scope/permission problems when dealing with "e"
	// Cannot use .apply when using greasemonkey!!
	if(typeof e !== _undefined && e !== null){
		if(arguments.length <= 3){
			jMod.log.ScopedConsoleCommand.call(jMod.log,
				'error',
				'%c%s%cjMod Error%c - %c%s \n%s \n%c%s - %c(line %d)',
				errorDefaultStyle + errorIconStyle, // Icon Style
				'  ', // Icon
				errorDefaultStyle + errorHeaderStyle, // Header Style
				' ', // Header
				errorDefaultStyle + errorTitleStyle, // Title Style
				(title || ' '), // Title
				(message || ' '), // Message
				errorDefaultStyle + ' ', // e.Message Style
				e.message, // e.Message
				errorDefaultStyle + errorLineStyle, // Line Number Style
				e.lineNumber, // Line Number
				e
			);
		} else {
			jMod.log.ScopedConsoleCommand.call(jMod.log,
				'error',
				'%c%s%cjMod Error%c - %c%s \n%s \n%c%s - %c(line %d)',
				errorDefaultStyle + errorIconStyle, // Icon Style
				'  ', // Icon
				errorDefaultStyle + errorHeaderStyle, // Header Style
				' ', // Header
				errorDefaultStyle + errorTitleStyle, // Title Style
				(title || ' '), // Title
				(message || ' '), // Message
				errorDefaultStyle + ' ', // e.Message Style
				e.message, // e.Message
				errorDefaultStyle + errorLineStyle, // Line Number Style
				e.lineNumber, // Line Number
				e,
				arguments[3]
			);
		}
	} else {
		jMod.log.ScopedConsoleCommand.apply(jMod.log,[
				'error',
				'%c%s%cjMod Error%c - %c%s \n%s',
				errorDefaultStyle + errorIconStyle, // Icon Style
				'  ', // Icon
				errorDefaultStyle + errorHeaderStyle, // Header Style
				' ', // Header
				errorDefaultStyle + errorTitleStyle, // Title Style
				(title || ' '), // Title
				(message || ' ') // Message
			].concat(Slice.call(arguments,3))
		);

	}
};

var jModInfo = function(title){
	var infoDefaultStyle = '';
	//var ErrorIconURL = 'http://www.shedworx.com/files/images/error.png';
	var infoIconURL = 'http://myuserjs.org/img/favicon/favicon.png';
	var infoIconStyle = 'font-size:175%;background-image:url("'+infoIconURL+'");background-size:auto 75%;background-repeat: no-repeat;background-position:left center;';
	
	var infoHeaderStyle = 'font-size:175%;font-weight:300;font-family:"Sansation","Open Sans",Arial;';
	
	var infoTitleStyle = 'color:#000;font-size:125%;';
	
	var exArgs = Slice.call(arguments,1);
	var fmtString = '%c%s%cjMod%c - %c%s';
	var args = [];
	if(exArgs.length > 0)
		fmtString += ' \n%c';
	for(var i = 0; i < exArgs.length; i++){
		if(typeof exArgs[i] === "number"){
			if(parseInt(exArgs[i]) === exArgs[i] && exArgs[i] === +exArgs[i] && exArgs[i] !== (exArgs[i]|0)){
				fmtString += '%.2f \n';
			} else {
				fmtString += '%d \n';
			}
			args.push(exArgs[i]);
		} else if(typeof exArgs[i] === "string"){
			fmtString += '%s \n';
			args.push(exArgs[i]);
		} else {
			fmtString += '%o\n';
			args.push(exArgs[i]);
		}
	}
	
	// Have to get around scope/permission problems when dealing with "e"
	jMod.Info.apply(jMod.log,[
	//jMod.log.ScopedConsoleCommand.apply(jMod.log,[
		//'info',
		fmtString,
		infoDefaultStyle + infoIconStyle, // Icon Style
		'  ', // Icon
		infoDefaultStyle + infoHeaderStyle, // Header Style
		' ', // Header
		infoDefaultStyle + infoTitleStyle, // Title Style
		(title || ' '), // Title
		infoDefaultStyle + ' ' // arguments style
		].concat(args)
	);
}

var jModLogTime = function(title, prefix, suffix){
	var text = (prefix || '') +  jMod.timeElapsed.toFixed(2) + 'ms' + (suffix || '');
	
	var infoDefaultStyle = ' ';
	var infoIconURL = 'http://myuserjs.org/img/favicon/favicon.png';
	var infoIconStyle = 'font-size:175%;background-image:url("'+infoIconURL+'");background-size:auto 75%;background-repeat: no-repeat;background-position:left center;';
	
	var infoHeaderStyle = 'font-size:175%;font-weight:300;font-family:"Sansation","Open Sans",Arial;';
	
	var infoTitleStyle = 'color:#000;font-size:125%;';
	
	var fmtBuild = new jMod.API.logFormatBuilder();
	fmtBuild.add('  ', "%s", infoDefaultStyle + infoIconStyle);
	fmtBuild.add('jMod', "string", infoDefaultStyle + infoHeaderStyle);
	fmtBuild.add(' - ', "string", infoDefaultStyle);
	fmtBuild.add(title || ' ', "%s", infoDefaultStyle + infoTitleStyle);
	fmtBuild.add(' ', "string");
	fmtBuild.add(text, "%s", infoDefaultStyle + jMod.log.fmt.time);
	
	jMod.Info.apply(jMod.log,fmtBuild.build());
}
	
	
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
	
	this.fire = function(eventName, group, _this, args){
		var i, evt, group = listeners[group || '0'];
		try{
			if(typeof group !== _undefined && typeof (evt = group[eventName]) !== _undefined){
				for(i in evt){
					if((evt[i].apply(_this || null, args || [])) === false){
						console.log('fire canceled');
						return false;
					}	
				}
			}
		} catch(e){
			//console.error('Error EventsClass.fire', e);
			jModError(e, 'jMod.EventsClass.fire');
		}
	}
};

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
	if (typeof css != _undefined && css != '') {
		if(typeof GM_addStyle !== _undefined){
			GM_addStyle(css);
		} else if(heads = document.getElementsByTagName('head')) {
			var style = document.createElement('style');
			try {
				style.innerHTML = css;
			} catch (x) {
				style.innerText = css;
			}
			style.type = 'text/css';
			return heads[0].appendChild(style);
		}
	}
	return null;
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
	var newScript, heads, data;
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
	if(heads = document.getElementsByTagName('head')) {
		newScript = document.createElement('script');

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
		
		try{return heads[0].appendChild(newScript);}catch(x){}
	}
	return null;
}

	/***********************************
	 ** Content Eval
	 **********************************/
jMod.API.contentEval = function(source) {
	// Check for function input.
	if ('function' == typeof source) {
		// Execute this function with no arguments, by adding parentheses.
		// One set around the function, required for valid syntax, and a
		// second empty set calls the surrounded function.
		source = '(' + source + ')();'
	}

	// Create a script node holding this  source code.
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;

	// Insert the script node into the page, so it will run, and immediately
	// remove it to clean up.
	unsafeWindow.document.body.appendChild(script);
	unsafeWindow.document.body.removeChild(script);
}

	 
	/***********************************
	 ** GM_Storage
	 **********************************/
/**
 * Shim for interacting with the GM storage functions
 * @namespace jMod.API.GM_Storage
 */

jMod.API.GM_Storage = {
	/**
	 * @function getValue
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name
	 * @param {string|boolean|number} [def] - default value to return if key does not exist
	 */
	getValue: function(key, def){
		if(typeof GM_getValue !== _undefined)
			return GM_getValue(jConfig('API.Storage.prefix') + key, def);
	},
	/**
	 * @function setValue
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name
	 * @param {string|boolean|number} [value] - value to be set
	 */
	setValue: function(key, value){
		if(typeof GM_setValue !== _undefined)
			return GM_setValue(jConfig('API.Storage.prefix') + key, value);
	},
	/**
	 * @function deleteValue
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name to be deleted
	 */
	deleteValue: function(key){
		if(typeof GM_deleteValue !== _undefined)
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
	 * @function getValue
	 * @memberof jMod.API.localStorage
	 * @param {string} key - name
	 * @param {string|boolean|number} [def] - default value to return if key does not exist
	 */
	getValue: function(key, def){
		var r = this.stor.getItem(jConfig('API.Storage.prefix') + key);
		return (r !== null ? r: def);
	},
	/**
	 * @function setValue
	 * @memberof jMod.API.localStorage
	 * @param {string} key - name
	 * @param {string|boolean|number} [value] - value to be set
	 */
	setValue: function(key, value){
		return this.stor.setItem(jConfig('API.Storage.prefix') + key, value);
	},
	/**
	 * @function deleteValue
	 * @memberof jMod.API.localStorage
	 * @param {string} key - name to be deleted
	 */
	deleteValue: function(key){
		return this.stor.removeItem(jConfig('API.Storage.prefix') + key);
	}
}

/**
 * Getter function that retrieves the localStorage object
 * @name stor
 * @memberof jMod.API.localStorage
 * @type {object}
 */
Object.defineProperty(jMod.API.localStorage, "stor", {
	get: function(){return (localStorage?localStorage:(unsafeWindow.localStorage?unsafeWindow.localStorage:window.localStorage));},
	enumerable: false
});



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
	if(jConfig('API.Storage.engine') == 'GM_Storage' && _undefined!=typeof GM_getValue)
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
	if(jConfig('API.Storage.engine') == 'GM_Storage' && _undefined!=typeof GM_setValue)
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
	if(jConfig('API.Storage.engine') == 'GM_Storage' && _undefined!=typeof GM_deleteValue)
		return API.GM_Storage.deleteValue.apply(API.GM_Storage, arguments);
	return API.localStorage.deleteValue.apply(API.localStorage, arguments);
}

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

function generateLargeNotificationElement(data){
	var newNotification = {
		type: 'div',
		className: 'jModLargeNotification bigBox animated fadeIn',
		style: {},
		attributes: {
			'data-jmod-notification': Notification.count,
			'data-jmod-large-notification': Notification.LargeCount
		}
	}
	
	// Background
	if(typeof data.background !== _undefined)
		newNotification.style.background = data['background'];
	if(typeof data['background-color'] !== _undefined)
		newNotification.style.backgroundColor = data['background-color'];
	else
		newNotification.style.backgroundColor ='rgb(50, 118, 177)';
		
	var newNotificationContent = {
		type: 'div',
		className: '',
		innerHTML: [
			{
				type: 'i',
				id: 'jModbtnClose'+Notification.LargeCount,
				className: 'botClose fa fa-times',
				EventListeners: {
					'click':function(e){
						var notification = e.target.parentElement.parentElement;
						var notificationNum = parseInt(notification.getAttribute('data-jmod-notification'));
						var largeNotificationNum = parseInt(notification.getAttribute('data-jmod-large-notification'));
						Notification.close(notification, 'large', notificationNum, largeNotificationNum, e);
					}
				}
			}
		],
		style: {},
		attributes: {
			'data-jmod-notification': Notification.count,
			'data-jmod-large-notification': Notification.LargeCount
		}
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
			className: 'jmod-na bigboxicon',
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
}

/*
function generateLargeNotificationElement(data){
	
	// New Notification
	var newNotification = document.createElement("div");
	newNotification.setAttribute('data-jmod-notification', Notification.count);
	newNotification.setAttribute('data-jmod-large-notification', Notification.LargeCount);
	newNotification.className = 'jModLargeNotification bigBox animated fadeIn';
	// Background
	if(typeof data.background !== _undefined)
		newNotification.style.background = data['background'];
	if(typeof data['background-color'] !== _undefined)
		newNotification.style.backgroundColor = data['background-color'];
	else
		newNotification.style.backgroundColor ='rgb(50, 118, 177)';
	
	var newNotificationContent = document.createElement("div");
	newNotificationContent.className = '';
	
	// Close Button
	var btnClose = document.createElement("i");
	btnClose.setAttribute('class', 'botClose fa fa-times');
	btnClose.setAttribute('id', 'jModbtnClose'+Notification.LargeCount);
	btnClose.addEventListener("click", function(e){
		var notification = e.target.parentElement.parentElement;
		var notificationNum = parseInt(notification.getAttribute('data-jmod-notification'));
		var largeNotificationNum = parseInt(notification.getAttribute('data-jmod-large-notification'));
		Notification.close(notification, 'large', notificationNum, largeNotificationNum, e);
	});
	newNotificationContent.appendChild(btnClose);
	
	// Title
	var title = document.createElement('span');
	title.className = '';
	if(typeof data.title !== _undefined){
		if(isElement(data.title)){
			title.appendChild(data.title);
		} else {
			title.innerHTML = data.title;
		}
	}
	newNotificationContent.appendChild(title);
	
	// Body
	var bdy = document.createElement('p');
	bdy.className = '';
	if(typeof data.body !== _undefined){
		if(isElement(data.body)){
			bdy.appendChild(data.body);
		} else {
			bdy.innerHTML = data.body;
		}
	}
	newNotificationContent.appendChild(bdy);
	
	// Icon
	if(typeof data.icon !== _undefined){
		var icon = document.createElement('div');
		icon.setAttribute('class', 'jmod-na bigboxicon');
		if(isElement(data.icon)){
			icon.appendChild(data.icon);
		} else {
			icon.innerHTML = '<i class="fa ' + data.icon + ' '+(data.iconAnimation || 'swing')+' animated"> </i>';
		}
		
		newNotificationContent.appendChild(icon);
	}
	
	newNotification.appendChild(newNotificationContent);
	
	return newNotification;
}
*/



/*
function generateSmallNotificationElement(data){
	var tmpTop = 0;
	var totalCount = Notification.CurrentSmallCount;
	if(totalCount > 0){
		var tHeight = totalCount * 25;
		var smallNotificationsContainer = Notification('getElement', 'notificationsSmallWrapper');
		var smNotes = smallNotificationsContainer.querySelectorAll('div[data-jmod-small-notification]');
		for(var i = 0; i < smNotes.length; i++){
			tHeight += parseInt(smNotes[i].offsetHeight);
		}
		//newNotification.style.top = ((80 * totalCount) + 20) + 'px';
		tmpTop = (tHeight + 20);
	}

	var newNotification = {
		type: 'div',
		className: 'jModSmallNotification SmallBox animated fadeIn',
		style: {
			top: tmpTop + 'px'
		},
		attributes: {
			'data-jmod-notification': Notification.count,
			'data-jmod-small-notification': Notification.SmallCount
		},
		EventListeners: {
			click: function(e){
				//if(e.target.tagName.toLowerCase() != 'a' && e.target.tagName.toLowerCase() != 'button'){
					var tCount = 0;
					var tParent = e.target;
					while(!tParent.hasAttribute('data-jmod-small-notification') && tParent != null && tCount < 10){
						tParent = tParent.parentElement;
						tCount++;
					}
					if(tParent != null){
						var notificationNum = parseInt(tParent.getAttribute('data-jmod-notification'));
						var smallNotificationNum = parseInt(tParent.getAttribute('data-jmod-small-notification'));
						Notification.close(tParent, 'small', notificationNum, smallNotificationNum, e);
					}
				//}
			}
		}
	}
	
	// Background
	if(typeof data.background !== _undefined)
		newNotification.style.background = data['background'];
	if(typeof data['background-color'] !== _undefined)
		newNotification.style.backgroundColor = data['background-color'];
	else
		newNotification.style.backgroundColor ='rgb(50, 118, 177)';
		
	var newNotificationContent = {
		type: 'div',
		className: '',
		innerHTML: [],
		style: {},
		attributes: {
			'data-jmod-notification': Notification.count,
			'data-jmod-large-notification': Notification.LargeCount
		}
	}
	
	if(typeof data.footer === _undefined)
		newNotificationContent.className += ' textoFull';
	else{
		newNotificationContent.className += ' textoFoto';
		
		var foto = document.createElement("div");
		foto.className = 'foto';
		if(isElement(data.icon)){
			foto.appendChild(data.icon);
		} else {
			foto.innerHTML = '<i class="fa ' + data.icon + ' '+(data.iconAnimation || 'bounce')+' animated"> </i>';
		}
		
		newNotification.appendChild(foto);
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
			className: 'jmod-na bigboxicon',
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
}
*/


function generateSmallNotificationElement(data){
	
	// New Notification
	var newNotification = document.createElement("div");
	newNotification.setAttribute('data-jmod-notification', Notification.count);
	newNotification.setAttribute('data-jmod-small-notification', Notification.SmallCount);
	newNotification.className = 'jModSmallNotification SmallBox animated fadeIn';
	// Background
	if(typeof data.background !== _undefined)
		newNotification.style.background = data['background'];
	if(typeof data['background-color'] !== _undefined)
		newNotification.style.backgroundColor = data['background-color'];
	else
		newNotification.style.backgroundColor ='rgb(41, 97, 145)';
	
	var totalCount = Notification.CurrentSmallCount;
	if(totalCount > 0){
		var tHeight = totalCount * 25;
		var smallNotificationsContainer = Notification('getElement', 'notificationsSmallWrapper');
		var smNotes = jMod.$$('div[data-jmod-small-notification]', smallNotificationsContainer);
		for(var i = 0; i < smNotes.length; i++){
			tHeight += parseInt(smNotes[i].offsetHeight);
		}
		//newNotification.style.top = ((80 * totalCount) + 20) + 'px';
		newNotification.style.top = (tHeight + 20) + 'px';
	}
	
	newNotification.addEventListener("click", function(e){
		//if(e.target.tagName.toLowerCase() != 'a' && e.target.tagName.toLowerCase() != 'button'){
			var tCount = 0;
			var tParent = e.target;
			while(!tParent.hasAttribute('data-jmod-small-notification') && tParent != null && tCount < 10){
				tParent = tParent.parentElement;
				tCount++;
			}
			if(tParent != null){
				var notificationNum = parseInt(tParent.getAttribute('data-jmod-notification'));
				var smallNotificationNum = parseInt(tParent.getAttribute('data-jmod-small-notification'));
				Notification.close(tParent, 'small', notificationNum, smallNotificationNum, e);
			}
		//}
	}, false);
	//newNotificationContent.appendChild(newNotification);
	
	var newNotificationContent = document.createElement("div");
	if(typeof data.footer === _undefined)
		newNotificationContent.className = 'textoFull';
	else{
		newNotificationContent.className = 'textoFoto';
		
		var foto = document.createElement("div");
		foto.className = 'foto';
		if(isElement(data.icon)){
			foto.appendChild(data.icon);
		} else {
			foto.innerHTML = '<i class="fa ' + data.icon + ' '+(data.iconAnimation || 'bounce')+' animated"> </i>';
		}
		
		newNotification.appendChild(foto);
	}

	

	
	// Title
	var title = document.createElement('span');
	title.className = '';
	if(typeof data.title !== _undefined){
		if(isElement(data.title)){
			title.appendChild(data.title);
		} else {
			title.innerHTML = data.title;
		}
	}
	newNotificationContent.appendChild(title);
	
	// Body
	var bdy = document.createElement('p');
	bdy.className = '';
	if(typeof data.body !== _undefined){
		if(isElement(data.body)){
			bdy.appendChild(data.body);
		} else {
			bdy.innerHTML = data.body;
		}
	}
	newNotificationContent.appendChild(bdy);
	
	// Footer
	if(typeof data.footer !== _undefined){
		var footer = document.createElement('p');
		footer.className = 'text-align-right';
		if(isElement(data.footer)){
			//footer.appendChild(data.footer);
			footer = data.footer;
		} else {
			footer.innerHTML = data.footer;
		}
		newNotificationContent.appendChild(footer);
	}
	
	newNotification.appendChild(newNotificationContent);
	
	// Icon
	if(typeof data.footer === _undefined && typeof data.icon !== _undefined){
		var icon = document.createElement('div');
		icon.setAttribute('class', 'miniIcono');
		if(isElement(data.icon)){
			icon.appendChild(data.icon);
		} else {
			icon.innerHTML = '<i class="miniPic fa ' + data.icon + ' bounce animated"> </i>';
		}
		
		newNotification.appendChild(icon);
	}
	
	
	
	return newNotification;
}


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
		switch((data.type || '').toLowerCase()){
			case 'small':
				var smallNotificationsContainer = jMod.Notification('getElement', 'notificationsSmallWrapper');
				var newNotification = generateSmallNotificationElement(data);
				smallNotificationsContainer.appendChild(newNotification);
				jMod.Notification.Events.addAll(data, jMod.Notification.count);
				jMod.Notification.count++;
				jMod.Notification.SmallCount++;
				break;
			case 'large':
			default:
				var largeNotificationsContainer = jMod.Notification('getElement', 'notificationsLargeWrapper');
				var newNotification = generateLargeNotificationElement(data);
				largeNotificationsContainer.appendChild(newNotification);
				jMod.Notification.Events.addAll(data, jMod.Notification.count);
				jMod.Notification.count++;
				jMod.Notification.LargeCount++;
				break;
		}
	}
}

Notification.UpdateNotification = function(data){
	var options = merge({
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
	
	var footer = document.createElement("p");
	footer.className = 'text-align-right';
	footer.appendChild(btnInstall);
	footer.appendChild(btnVisit);
	footer.appendChild(btnClose);
	
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

Notification.close = function(notification, type, notificationNumber, typeNotificationNumber, event){
	if(notification != null){
		Notification.Events.fire(notificationNumber, 'onBeforeClose', notification, event);
		switch(type.toLowerCase()){
			case 'large':
				notification.setAttribute('class', 'jModLargeNotification bigBox animated fadeOut fast');
				setTimeout(function(target, targetNum, e){
					Notification.remove(target, targetNum);
					Notification.Events.fire(targetNum, 'onAfterClose', target, e);
				}, 400, notification, notificationNumber, event);
				break;
			case 'small':
				notification.setAttribute('class', 'jModSmallNotification SmallBox animated fadeOut fast');
				setTimeout(function(target, targetNum, e){
					Notification.remove(target, targetNum);
					Notification.Events.fire(targetNum, 'onAfterClose', target, e);
				}, 400, notification, notificationNumber, event);
				break;
		}
	}
}

Notification.Events = {
	'eventListeners': {},
	'events': ['onBeforeClose', 'onAfterClose'],
	add: function(notificationNum, eventName, callback){
		if(typeof this.eventListeners[notificationNum] === _undefined)
			this.eventListeners[notificationNum] = {};
			
		if(typeof this.eventListeners[notificationNum][eventName] === _undefined)
			this.eventListeners[notificationNum][eventName] = [];
		
		this.eventListeners[notificationNum][eventName].push(callback);
	},
	
	addAll: function(data, notificationNum){
		for(var evt in this.events)
			if(typeof data[this.events[evt]] === "function")
				this.add(notificationNum, this.events[evt], data[this.events[evt]])
	},
	
	fire: function(notificationNum, eventName, notification){
		var args, thisNotification, tCB;
		if(typeof this.eventListeners[notificationNum] !== _undefined && typeof this.eventListeners[notificationNum][eventName] !== _undefined){
			if(typeof notification !== _undefined && isElement(notification)){
				thisNotification = notification;
				args = Slice.call(arguments, 3);
			} else {
				thisNotification = document.querySelector('div[data-jmod-notification="'+notificationNum+'"]');
				if(thisNotification == null)
					thisNotification = unsafeWindow;
				args = Slice.call(arguments, 2);
			}
			args.unshift(eventName);
			while(typeof (tCB = this.eventListeners[notificationNum][eventName].shift()) !== _undefined){
				tCB.apply(thisNotification, args);
			}
		}
	}
};

Notification.count = 0;
Notification.LargeCount = 0;
Notification.SmallCount = 0;

Object.defineProperties(Notification, {
	"CurrentLargeCount": {
		get: function(){
			var largeNotificationsContainer = Notification('getElement', 'notificationsLargeWrapper');
			return (jMod.$$('div[data-jmod-large-notification]', largeNotificationsContainer)).length;
		},
		//writable: false
	},
	"CurrentSmallCount": {
		get: function(){
			var smallNotificationsContainer = Notification('getElement', 'notificationsSmallWrapper');
			return (jMod.$$('div[data-jmod-small-notification]', smallNotificationsContainer)).length;
		},
		//writable: false
	}
});

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
	
	// Add Small Notification Wrapper
	var smallNotificationsContainer = Notification('getElement', 'notificationsSmallWrapper');
	if(smallNotificationsContainer == null){
		smallNotificationsContainer = document.createElement("div");
		smallNotificationsContainer.id = Notification('getElementId', 'notificationsSmallWrapper');
		smallNotificationsContainer.className = 'jModSmallNotifications';
		notificationsFullWrapper.appendChild(smallNotificationsContainer);
	}
	
	// Add Large Notification Wrapper
	var largeNotificationsContainer = Notification('getElement', 'notificationsLargeWrapper');
	if(largeNotificationsContainer == null){
		largeNotificationsContainer = document.createElement("div");
		largeNotificationsContainer.id = Notification('getElementId', 'notificationsLargeWrapper');
		largeNotificationsContainer.className = 'jModNotifications';
		notificationsFullWrapper.appendChild(largeNotificationsContainer);
	}
}

jMod.CSS = '#jModSmallNotificationsWrapper,#jModNotificationsWrapper,.jmod-na .SmallBox span,.jmod-na .bigBox span{font-family:"Open Sans",Arial,Helvetica,sans-serif;}';

	
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

Tabs.resize = function(tabsNav){
	var tabsContent = tabsNav.parentElement.querySelector('.tab-content');
	var computedNav = window.getComputedStyle(tabsNav, null);
	var width = parseInt(computedNav.getPropertyValue('width'));
	tabsContent.style.marginLeft = (width + 11) + 'px';
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
		jModError(e, 'jMod.Modal');
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
	var modal = document.querySelector('div[data-jmod-modal="'+number+'"]');
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

Modal.show = function(modal, modalNum, e){
	try{
		//console.log('jMod.Modal.CurrentModal', jMod.Modal.CurrentModal);

		if(typeof modal === "number" && typeof modalNum !== "number"){
			if(typeof e === _undefined && typeof modalNum !== _undefined)
				e = modalNum;
			modalNum = modal;
		}
		if((typeof modal === _undefined || modal == null) && typeof modalNum === _undefined)
			return;
		if((typeof modal === _undefined || modal == null || typeof modal === "number") && typeof modalNum === "number"){
			modal = document.querySelector('div[data-jmod-modal="'+modalNum+'"]');
		} else if(typeof modal !== _undefined && modal != null && typeof modalNum === _undefined){
			modalNum = getAttribute(modal, 'data-jmod-modal');
		}
		
		if(Modal.CurrentModal != -1 && Modal.CurrentModal != modalNum){
			Modal.hide();
		}
		
		if(modal){
			var modalBackdrop = document.querySelector('div[data-jmod-modal-backdrop="'+modalNum+'"]');
			//console.log('jMod.Modal.show', modal, modalNum, e || null);
			var r = Modal.Events.fire('onBeforeShow', modalNum, modal, [e || null]);
			Modal.CurrentModal = modalNum;
			addClass(document.body, 'jmod-modal-open');
			modalBackdrop.style.display = 'block';
			modal.style.display = 'block';
			setTimeout(function(modal, modalBackdrop){
				addClass(modalBackdrop, 'in');
				addClass(modal, 'in');
			}, 1, modal, modalBackdrop);
			setTimeout(function(modal, modalNum, e){
				Modal.Events.fire('onAfterShow', modalNum, modal, [e || null]);
			}, fadeAnimationLength, modal, modalNum, e || null);
		}
	}catch(e){
		//console.log('Error jMod.Modal.show', e);
		jModError(e, 'jMod.Modal.show');
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
			var modalBackdrop = document.querySelector('div[data-jmod-modal-backdrop="'+modalNum+'"]');
			var r = Modal.Events.fire('onBeforeHide', modalNum, modal, [e || null]);
			Modal.CurrentModal = -1;
			removeClass(document.body, 'jmod-modal-open');
			removeClass(modal, 'in');
			removeClass(modalBackdrop, 'in');
			setTimeout(function(modal, modalNum, e, modalBackdrop){
				modal.style.display = 'none';
				modalBackdrop.style.display = 'none';
				Modal.Events.fire('onAfterHide', modalNum, modal, [e || null]);
			}, fadeAnimationLength, modal, modalNum, e || null, modalBackdrop);
		}
	}catch(e){
		//console.log('Error jMod.Modal.hide', e);
		jModError(e, 'jMod.Modal.hide');
	}
}

Modal.Events = new EventsClass(['onBeforeShow', 'onAfterShow', 'onBeforeHide', 'onAfterHide']);

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
		className: 'modal-body',
	});
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
				jModError(e, 'jMod.Modal.createModal', 'footer buttons');
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
		modalContainer = document.createElement("div");
		modalContainer.id = jConfig(Modal_ContainerElementId_Key);
		modalContainer.className = 'jmod-na jmod-fa ' + jConfig(Modal_ContainerElementClass_Key);
		document.body.appendChild(modalContainer);
	}

}


/*
jMod.Requirements.add({
	type: 'imagepreload',
	'value': '//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif'
});
*/

jMod.CSS = '.jmod-na .tabbable > .nav.nav-tabs > li > a,.jmod-na .tabbable > .nav.nav-tabs > li > a:hover,.jmod-na .tabbable > .nav.nav-tabs > li > a:active{text-decoration:none;}';




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
			modal: 'jModSettings'
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
			
			unsafeWindow.addEventListener('resize', jMod.Settings.onResize, false );
			
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
	return (storedData && storedData[prefName] !== undefined ? storedData[prefName] : (noDefault == true ? undefined : Settings.getDefault(prefName)));
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
			var str = jMod.getValue('Settings_' + jConfig('script.script_name'));
			if(str)
				return JSON.parse(str);
			return undefined;
		},
		set: function(obj){
			Settings.__storedData = obj;
			jMod.setValue('Settings_' + jConfig('script.script_name'), JSON.stringify(obj));
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
		var currentValue = storedValue || defaultValue;
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
		return prefEl.querySelector('input:checked').value;
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
		var currentValue = storedValue || defaultValue;
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
						value: storedValue || defaultValue,
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
					innerHTML: storedValue || defaultValue,
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
			},
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
	
	var viewportHeight = unsafeWindow.viewportSize.getHeight();
	
	var computedDialog = unsafeWindow.getComputedStyle(settingsDialog, null);
	var marginTop = parseInt(computedDialog.getPropertyValue('margin-top'));
	var marginBottom = parseInt(computedDialog.getPropertyValue('margin-bottom'));
	var maxHeight = (viewportHeight - parseInt(settingsHeader.offsetHeight) - parseInt(settingsFooter.offsetHeight) - marginTop - marginBottom);
	settingsBody.style.maxHeight = maxHeight + 'px';
	
	var settingsTabs = jMod.$('.nav.nav-tabs', settingsBody);
	jMod.Tabs.resize(settingsTabs);
}

Settings.show = function(){
	jMod.Modal.show(Settings.settingsModalElement || 0);
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

jMod.CSS = '.jmod-na .modal-body{min-height:200px;max-height:500px;overflow-y:auto;}.jmod-na .powered-by{font-family:"Sansation",Lato;font-weight:300;font-size:16px;position:absolute;left:0;text-align:center;width:100%;bottom:0;padding-bottom:5px;}.jmod-na .powered-by > a:link,.jmod-na .powered-by > a:visited,.jmod-na .powered-by > a:hover,.jmod-na .powered-by > a:active{text-decoration:none;color:#000;}.jmod-na .powered-by img{margin-right:3px;}.jmod-na .noselect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.jmod-na .noselect::selection{background:transparent;}.jmod-na .noselect::-moz-selection{background:transparent;}';



	 
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
		jModError(e, 'jMod.getDOMTiming');
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
	jMod['ERROR'] = new function(){
	
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
				if(jConfig('script.script_info.userscript_file_name') == stackInfo[0].fileName){
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
		

	}
	
	//console.log('EVALERROR', jMod['ERROR'].getCode('ERROR_NAME.EVALERROR'));
	//console.log('REFERENCEERROR', jMod['ERROR'].getCode('ERROR_NAME.REFERENCEERROR'));
	//console.log('URIERROR', jMod['ERROR'].getCode('ERROR_NAME.URIERROR'));
	
	function jModListenError(message, url, linenumber, colNumber, data) {
		console.log('jModListenError', message, url, linenumber, colNumber);
		//console.log('jModListenError data', data);
		//setTimeout(function(message, url, linenumber, colNumber, data){
			var tData = jMod.parseStack(data.stack);
			if(tData.length > 0)
				return jMod['ERROR']['catchError'](message, url, linenumber, colNumber, data, tData);
		//}, 1, message, url, linenumber, colNumber, data);
	}
	
	mExportFunction(jModListenError, unsafeWindow, {
		defineAs: "jModListenError",
		allowCallbacks: true,
		allowCrossOriginArguments: true
	});
	
	var onErrorFunction = function(){
		window.oldHandle = window.onerror;
		window.onerror = function(message, url, linenumber, colNumber, eObj){
			//console.log('tErrHandle', message, url, linenumber);
			try{
				//var args = Slice.call(arguments, 0);
				var tStack = '';
				try{
					tStack = eObj.stack.toString();
				}catch(e){};
				var data = {
					message: eObj.message,
					name: eObj.name,
					fileName: eObj.fileName,
					lineNumber: eObj.lineNumber,
					columnNumber: eObj.columnNumber,
					stack: tStack
				};
				//console.log('eobj.stack', eObj.stack);
				jModListenError(message, url, linenumber, colNumber, data);
				//if(jModListenError(message, url, linenumber, colNumber, data))
					//return true;
			}catch(e){}
			//finally {
			if(window.oldHandle)
				return window.oldHandle.apply(this, arguments);
			return false;
			//}
		}
		/*
		setTimeout(function(){
			eval("eval('FAIL')");
			var fofo = baba(tko);
		}, 500);
		*/
	};
	/*
	setTimeout(function(){
	jMod.API.contentEval(onErrorFunction);
	}, 1000);
	*/
	//setTimeout(jMod.API.contentEval, 1000, onErrorFunction);

	/***********************************
	 ** Init
	 **********************************/
/*
try{
	foobar();
}catch(e){
	jModError(e, 'jMod.init', 'I have a message');
	//jModError(undefined, 'jMod.init', 'I have a message', jMod);
}

jModInfo('jMod.init', jMod.timeElapsed.toFixed(2) + 'ms');

jModLogTime('jMod.init');
*/





+function(){

if(typeof GM_info !== _undefined && !ScriptInfo.InfoSet){
	jMod.log.Debug('GM_info', GM_info);
	jMod({
		'GM_info': GM_info,
		'has_GM_info': (typeof GM_info !== _undefined ? true : false),
		'has_GM_getMetadata': (typeof GM_getMetadata !== _undefined ? true : false)
	});
}

var pageLoadTime;
var totalCallCount = 0;
const maxCallCount = 200;

var InitHandlers = {
	DOMLoaded: function(){
		Loading.DOMLoaded = true;
		//if(jMod.debug) jMod.Debug('DOM Loaded: %c'+jMod.log.fmt.timePatt+'%c - Begin Init', jMod.log.fmt.time, jMod.timeElapsed, ' ');
		if(jMod.debug) jModLogTime('DOM Loaded', null, ' - Begin Init');
		jMod.Events.fire('onDOMReady');
		//jMod.API.contentEval(onErrorFunction);
		Loading.CSSAdded = true;
		jMod.AddCSS();
		jMod.Notification.init();
		jMod.Modal.init();
		jMod.Settings.init();
		Loading.jModReady = true;
		//unsafeWindow.postMessage('onReady', "*");
		setTimeout(function(){
			if(jMod.debug) jModLogTime('jModReady');
			jMod.Events.fire('onReady');
		},0);
		if(performance.available)
			jModReady = performance.now;
	},
	
	documentComplete: function(){
		Loading.documentComplete = true;
		if(jMod.debug) {
			jModLogTime('onPageReady');
			console.groupEnd('jMod Start');
		}
		jMod.Events.fire('onPageReady');
	},
	
	performanceReady: function(){
		Loading.performanceReady = true;
		if(jMod.debug) jModLogTime('onPerformanceReady');
		jMod.Events.fire('onPerformanceReady');
	}
}


function tryInit(e){
	if(!Loading.DOMLoaded){
		if(['interactive', 'complete'].indexOf(document.readyState.toLowerCase()) != -1){
			InitHandlers.DOMLoaded();
		}
	}
	
	if(Loading.DOMLoaded){
		if(!Loading.documentComplete && document.readyState == "complete"){
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
			if(jMod.debug) jModLogTime('jMod Finish Init');
			return;
		}
	}
	
	if(totalCallCount > maxCallCount){
		Loading.Complete = true;
		clearInterval(checkTimer);
		
		if(!Loading.DOMLoaded)
			InitHandlers.DOMLoaded();

		if(!Loading.documentComplete)
			InitHandlers.documentComplete();
		
		if(!Loading.performanceReady)
			InitHandlers.performanceReady();
		return;
	}
	totalCallCount++;
	if(jMod.debug) jMod.log.count('Try Init');
}

function checkTimer(){
	if(!Loading.Complete)
		tryInit('checkTimer');
	else
		clearInterval(checkTimer);
}

setInterval(checkTimer, 40);

// DOM Content Loaded Event
window.addEventListener('DOMContentLoaded', function(e){
	if(!Loading.Complete)
		tryInit('DOMContentLoaded');
	jMod.Events.fire.apply(jMod.Events, ['DOMContentLoaded', {_this: this, args: arguments}]);
	if(jMod.debug) jMod.Debug('DOMContentLoaded', e);
}, false);

// On ReadyState Change Event
document.onreadystatechange = function (e) {
	if(!Loading.Complete)
		tryInit('onreadystatechange');
	jMod.Events.fire.apply(jMod.Events, ['onreadystatechange', {_this: this, args: arguments}]);
	if(jMod.debug) jMod.Debug('onreadystatechange %c%s%c %o', jMod.log.fmt.stchange, document.readyState, ' ', e);
}

// Load Event
function onLoadEvent(e){
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

tryInit();

}();

	
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

