// ==UserScript==
// @name             MUJS
// @namespace        http://myuserjs.org/
// @author           jgjake2
// @homepage         http://myuserjs.org/
// @include          *
// @version          0.0.14
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
// @unwrap
// @run-at           document-start
// ==/UserScript==
/**
 * @overview [API for interacting with myUserJS.org]{@link MUJS}
 * @author jgjake2
 * @version 0.0.14
 * @see {@link MUJS}
 */

if(typeof unsafeWindow === "undefined") unsafeWindow = window;
 
/**
 * @global
 * @namespace MUJS
 * @author jgjake2
 * @version 0.0.14
 * @tutorial MUJS-tutorial
 */
/**
 * Calls MUJS._call with the given arguments
 * @global
 * @function MUJS
 * @variation 2
 * @param {...object} args Input Arguments
 * @tutorial MUJS-tutorial
 * @example
 * // Get the current value of script.username
 * MUJS('get', 'script.username')
 */
MUJS = function(args){return MUJS._call.apply(MUJS, arguments);};
/**
 * API Namespace
 * @memberOf! MUJS
 * @namespace MUJS.API
 */

Object.defineProperties(MUJS, {
	/**
	 * Current API version
	 * @name MUJS.version
	 * @memberOf! MUJS
	 * @const {string}
	 */
	version: {configurable:false,get:function() { return '0.0.14'; }},
	/**
	 * Date of build
	 * @name MUJS.build_time
	 * @memberOf! MUJS
	 * @const {string}
	 */
	build_time: {configurable:false,get:function() { return '1419362388000'; }},
	/**
	 * Current build type (beta|release)
	 * @name MUJS.build_type
	 * @memberOf! MUJS
	 * @const {string}
	 */
	build_type: {configurable:false,get:function() { return 'beta'; }},
	/**
	 * Is debug mode enabled
	 * @name MUJS.debug
	 * @memberOf! MUJS
	 * @const {boolean}
	 */
	debug: {configurable:false,get:function() { return true; }},
	/**
	 * Calls MUJS.API.EvalCommand with given arguments
	 * @function MUJS.API
	 * @memberOf! MUJS
	 * @variation 2
	 * @param {...object} args Arguments to be passed to MUJS.API.EvalCommand
	 */
	API: {value: function(args){
		return MUJS.API.EvalCommand.apply(MUJS.API, Array.prototype.slice.call(arguments, 0));
	}},
	fn: {value: MUJS.__proto__}
});
MUJS['API']['fn']=MUJS['API'].__proto__;
if(true && typeof console !== "undefined" && typeof console.time !== "undefined"){
	console.time('MUJS API Loading');
	console.time('MUJS API Finish Init');
}
(function(MUJS, $){
	var mujsAPILoadStart = -1;
	var mujsAPILoadEnd = -1;
	if(typeof unsafeWindow.performance !== "undefined" && typeof unsafeWindow.performance.timing !== "undefined")
		mujsAPILoadStart = unsafeWindow.performance.now();
		
	MUJS.fn.parseStack = function(stackText){
		var o = [];
		var anonFunctionPatt = /\@((?:https?\:\/\/)?[^\s\:]+).*?([^\:\s]*)?\:(\d+)(?:\:(\d+))?\s*$/gi;
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
		
	}
	
	var MUJSRequire = {
		DOMLoaded: false,
		RequirementsAdded: false,
		CSSAdded: false,
		documentComplete: false,
		onErrorFunctionAdded: false,
		notificationsInitialized: false,
		modalInitialized: false,
		Complete: false,
		scriptExecCount: 0,
		manualCallCount: 0
	};

	
	MUJS.fn._call = function(){
		var args = Array.prototype.slice.call(arguments, 0);
		try{
			if(!MUJS.gotScriptFileInfo)
				MUJS.getScriptFileInfo();
				
			if(args.length > 0){
				
				// Commands
				if(typeof args[0] === "string"){
					switch(args[0]){
						case 'get':
							return MUJS.config.apply(MUJS, Array.prototype.slice.call(arguments, 1));
							break;
						case 'set':
							return MUJS.config(args[1], args[2]);
							break;
					}
				} else if(typeof args[0] === "object") {
					// GM_info object
					//if(typeof args[0]['GM_info'] !== "undefined" || typeof args[0]['ginfo'] !== "undefined"){
					if(typeof getFirstValidKey(args[0], ['GM_info', 'gm_info', 'ginfo']) !== "undefined"){
						return MUJS.setScriptInfo.apply(MUJS, args);
					}
				
				}
				
			} else {
			
			}
				
			
		}catch(e){}
	}
	
	var _css = '';
	
	Object.defineProperty(MUJS, "CSS", {
		get: function(){
			return _css;
		},
		set: function(str){
			if(MUJSRequire.CSSAdded)
				MUJS.API.addStyle(str);
			else
				_css += str;
		},
		enumerable: false
	});
	
	
	MUJS.fn.Requirements = {
		'_requirements': {'head': [], 'body': [], 'GM_style': []},
		'add': function(data){
			switch(data.type){
				case 'style':
				case 'css':
					return this.addGM(data);
					break;
				default:
					return this.addElement(data);
					break;
			}
		},
		'addElement': function(data){
			var target = (data.target || 'head');
			var newElement = document.createElement(data.type);
			if(typeof data.attributes !== "undefined"){
				for(var i in data.attributes){
					newElement.setAttribute(i, data.attributes[i]);
				}
			}
			if(MUJSRequire.RequirementsAdded){
				this.insertElement(newElement, target);
			} else {
				switch(target){
					case 'head':
						if(MUJSRequire.RequirementsAdded)
							return this.insertElement(newElement, 'head');
						else
							return this._requirements.head.push(newElement);
						break;
					case 'body':
						if(MUJSRequire.RequirementsAdded)
							return this.insertElement(newElement, 'body');
						else
							return this._requirements.body.push(newElement);
						break;
				}
			}
		},
		'addGM': function(data){
			switch(data.type){
				case 'style':
				case 'css':
					if(MUJSRequire.RequirementsAdded)
						return this.insertGM(data.value, 'style');
					else
						return this._requirements.GM_style.push(data.value);
					break;
			}
		},
		'insertElement': function(el, target){
			var _target = target || 'head';
			switch(_target){
				case 'body':
					return (document.getElementsByTagName('body')[0]).appendChild(el);
					break;
				case 'head':
				default:
					return (document.getElementsByTagName('head')[0]).appendChild(el);
					break;
			}
		},
		'insertGM': function(value, type){
			switch(type){
				case 'style':
				case 'css':
					MUJS.API.addStyle(value);
					break;
			}
		},
		'insertAll': function(){
			var head = document.getElementsByTagName('head')[0];
			var body = document.getElementsByTagName('body')[0];
			
			var tEl = null;
			while((tEl = this._requirements.head.shift()) != null){
				head.appendChild(tEl);
			}
			while((tEl = this._requirements.body.shift()) != null){
				body.appendChild(tEl);
			}
			while((tEl = this._requirements.GM_style.shift()) != null){
				MUJS.API.addStyle(tEl);
			}
		}
	};
	



	/***********************************
	 ** Functions/Classes/Prototypes
	 **********************************/
	/**
	 * URL building class for adding a variable number or arguments to a given host and path
	 * @constructor
	 */
	var URLBuilder = function(input){
		
		var r = {
			protocol: 'http:',
			hostname: '',
			pathname: '',
			
			args: [],
			
			setHostname: function(str){
				var parser = document.createElement('a');
				if(!(/^\s*(?:https?\:)?\/\//i.test(str)))
					str = 'http://' + str;
				parser.href = str;
				
				this.hostname = parser.hostname;
				this.protocol = parser.protocol;
			},
			
			setPath: function(str){
				if(str[0] != '/') str = '/' + str;
				this.pathname = str;
			},
			
			addArg: function(key, value){
				this.args.push([key, value]);
			},
			
			addArgs: function(args){
				for(var i = 0; i < args.length; i++){
					this.addArg(args[i]);
				}
			},
			
			buildArgs: function(){
				var argStr = '';
				var argsArr = [];
				for(var i = 0; i < this.args.length; i++){
					argsArr.push(this.args[i].join('='));
				}
				return argsArr.join('&');
			},
			
			toString: function(){
				return this.protocol + '//' + this.hostname + this.pathname + '?' + this.buildArgs();
			}
		};
		
		if(typeof input !== "undefined")
			r.setHostname(input);
		
		return r;
	};
	
	MUJS.fn.Versions = {
	
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
	
	
	//var tVersion1 = MUJS.Versions.parseVersion('v0.2.14beta');
	//var tVersion2 = MUJS.Versions.parseVersion('v0.1.14beta');
	
	//console.log(tVersion1, tVersion2);
	//console.log('compare', MUJS.Versions.compare('v0.2.14beta', 'v0.1.14beta'));
	//console.log('compare', MUJS.Versions.compare('v0.1.14beta', 'v0.1.14beta'));
	//console.log('compare', MUJS.Versions.compare('v0.0.14beta', 'v0.1.14beta'));
	
	function getFirstValidKey(obj, arr, filter){
		var hasFilter = (typeof filter === "function" ? true : false);
		var args = arr;
		if(typeof arr !== "object"){
			args = Array.prototype.slice.call(arguments, 1);
			hasFilter = false;
		}
		for(var i = 0; i < args.length; i++){
			if(typeof obj[args[i]] !== "undefined"){
				if(!hasFilter || (hasFilter && filter(args[i], obj[args[i]])))
					return args[i];
			}
		}
		return undefined;
	}
	
	function getFirstValidKeyValue(obj, arr, filter){
		var key = getFirstValidKey.apply(this, arguments);
		if(typeof key !== "undefined")
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
		if(typeof exportFunction !== "undefined"){
			exportFunction(func, scope, args);
		} else {
			var name;
			if(typeof args === "undefined") args = {};
			if(typeof args.defineAs !== "undefined") {
				name = args.defineAs;
			} else if(typeof func === "function" && func.name != ''){
				name = func.name
			}
			scope[name || ''] = func;
		}
	}

	var mCloneInto = this.mCloneInto = function(obj, scope, args){
		if(typeof cloneInto !== "undefined"){
			return cloneInto(obj, scope, args);
		} else {
			/*
			var tName = 'tClonedObject';
			var count = 0;
			while(typeof scope[tName + count] !== "undefined"){
				count++;
			}
			tName = tName + count;
			scope[tName] = {};
			
			if (typeof obj === 'object') {
				if (obj === null)
					return null;
				//if ((scope[tName] === null) || (typeof scope[tName] !== 'object'))
					//scope[tName] = {};
				for (var key in obj) {
					scope[tName][key] = cloneInto(obj[key], scope[tName][key]);
				}
				
				return scope[tName];
			} else {
				return obj;
			}
			*/
			return obj;
		}
	}
	
	function Object_SearchForKey(str){
		var names = str.split('.');
		var tmp = this;
		for(var i = 0; i < names.length; i++){
			if(typeof tmp[names[i]] === "undefined") return undefined;
			tmp = tmp[names[i]];
		}
		return tmp;
	}
	
	function Object_SearchForKeys(arr){
		var args = arr;
		var args = (typeof arr === "string" ? Array.prototype.slice.call(arguments) : args);
		for(var i = 0; i < args.length; i++){
			var tmp = Object_SearchForKey.apply(this, [args[i]]);
			if(typeof tmp !== "undefined")
				return tmp;
		}
		return undefined;
	}

	//defineGlobalProperty("Object", "SearchForKey", {value: Object_SearchForKey, enumerable: false});
	
	function Object_setKeyValue(str, val, force){
		var names = str.split('.');
		var tmp = this;
		for(var index = 0; index < names.length -1; index++){
			if(typeof tmp[names[index]] === "undefined") {
				if(force){
					tmp[names[index]] = new Object();
				} else {
					return;
				}
			}
			tmp = tmp[names[index]];
		}
		tmp[names[names.length - 1]] = val;
		//return this;
	}

	//defineGlobalProperty("Object", "setKeyValue", {value: Object_setKeyValue, enumerable: false});
	
	var RealTypeOf = this.RealTypeOf = MUJS.fn.RealTypeOf = function(origObj){
		var obj;
		try{
			if (obj.constructor === ({}).constructor){}
			obj = origObj;
		}catch(e){
			obj = mCloneInto(origObj, unsafeWindow, {
				cloneFunctions: true,
				wrapReflectors: true
			});
		}
		try{
			if(typeof(obj) === "undefined") return "undefined";
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
				//return "object";
			}
			return typeof(obj);
		}catch(e){
			return typeof(obj);
		}
	}
	
	function clone(obj) {
		if(obj == null || typeof(obj) != 'object')
			return obj;
		var temp;
		try{
			temp = obj.constructor(); // changed
		}catch(e){
			switch(RealTypeOf(obj)){
				case "number":
					temp = (new Number).constructor();
					break;
				case "array":
					temp = (new Array).constructor();
					break;
				case "map":
					temp = ({}).constructor();
					break;
				default:
					temp = obj;
					break;
			}
		}
		for(var key in obj) {
			if(obj.hasOwnProperty(key)){
			//try{
				temp[key] = clone(obj[key]);
			//}catch(e){}
			}
		}
		return temp;
	}
	
	function mergeObjects(obj1, obj2){
		if(obj2 == null || ["string", "number", "date", "regex", "undefined"].indexOf(RealTypeOf(obj2)) != -1)
			return clone(obj2);
		var objOut = clone(obj1);
		for(var key in obj2){
			//if(obj2.hasOwnProperty(key)) {
				if(typeof objOut[key] === "undefined" || typeof objOut[key] === "function" || obj2[key] == null || typeof(obj2[key]) != 'object'){
					objOut[key] = clone(obj2[key]);
				} else if(objOut[key] == null || RealTypeOf(objOut[key]) == "array" || typeof(objOut[key]) != 'object'){
					objOut[key] = clone(obj2[key]);
				} else {
					objOut[key] = mergeObjects(objOut[key], obj2[key]);
				}
			//}
		}
		return objOut;
	}
	
	function merge(){
		var args = Array.prototype.slice.call(arguments);
		if(args.length == 0) return undefined;
		if(args.length == 1) return args[0];
		var tmp = args[0];
		for(var i = 1; i < args.length; i++){
			tmp = mergeObjects(tmp, args[i]);
		}
		return tmp;
	}
	
	var props = {
		SearchForKey: {value: Object_SearchForKey, enumerable: false},
		SearchForKeys: {value: Object_SearchForKeys, enumerable: false},
		setKeyValue: {value: Object_setKeyValue, enumerable: false}
	};
	
	var performance = new function(){
		var getPerformancePtr = function(){
			return ((typeof unsafeWindow.performance !== "undefined" && typeof unsafeWindow.performance.timing !== "undefined") ? unsafeWindow.performance : undefined);
		}
	
		var _performancePtr = undefined;
		
		this.__defineGetter__("available", function(){return (typeof this.performancePtr === "undefined" ? false : true);});
		
		this.__defineGetter__("now", function(){return this.performancePtr.now();});
		
		this.__defineGetter__("performancePtr", function(){
			if(typeof _performancePtr === "undefined") _performancePtr = getPerformancePtr();
			return _performancePtr;
		});
		
		this.get = function(str){
			if(typeof this.performancePtr === "undefined") return undefined;
			var names = str.split('.');
			var tmp = this.performancePtr;
			for(var i = 0; i < names.length; i++){
				if(typeof tmp[names[i]] === "undefined") return undefined;
				tmp = tmp[names[i]];
			}
			return tmp;
		};
		
		this.getAllTiming = function(ignore){
			if(typeof ignore === "undefined") ignore = [];
			var timingData = [];
			var ptr = this.performancePtr;
			for(var key in ptr.timing){
				if(!isNaN(ptr.timing[key]) && ignore.indexOf(key) == -1){
					timingData[key] = parseInt(ptr.timing[key]);
				}
			}
			return timingData;
		};
	}
	
	var LIBVERSION  = '0.7.3',
		EMPTY       = '',
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
	MUJS.fn.Browser = {
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

					// Mixed
					/(kindle)\/((\d+)?[\w\.]+)/i, // Kindle
					/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)*/i,
					// Lunascape/Maxthon/Netfront/Jasmine/Blazer

					// Trident based
					/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?((\d+)?[\w\.]*)/i,
					// Avant/IEMobile/SlimBrowser/Baidu
					/(?:ms|\()(ie)\s((\d+)?[\w\.]+)/i, // Internet Explorer

					// Webkit/KHTML based
					/(rekonq)((?:\/)[\w\.]+)*/i, // Rekonq
					/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron)\/((\d+)?[\w\.-]+)/i
					// Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron
				],
				[NAME, VERSION, MAJOR],
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

					/(dolfin)\/((\d+)?[\w\.]+)/i // Dolphin
				],
				[
					[NAME, 'Dolphin'], VERSION, MAJOR
				],
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
				/*
				[

					/webkit.+?(mobile\s?safari|safari)((\/[\w\.]+))/i // Safari < 3.0
				],
				[NAME, [MAJOR, mapper.str, maps.browser.oldsafari.major],
					[VERSION, mapper.str, maps.browser.oldsafari.version]
				],
				*/
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
					/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?((\d+)?[\w\.\+]+)/i,
					// IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
					/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i,
					// Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
					/(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i, // Mozilla

					// Other
					/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?((\d+)?[\w\.]+)/i,
					// Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf
					/(links)\s\(((\d+)?[\w\.]+)/i, // Links
					/(gobrowser)\/?((\d+)?[\w\.]+)*/i, // GoBrowser
					/(ice\s?browser)\/v?((\d+)?[\w\._]+)/i, // ICE Browser
					/(mosaic)[\/\s]((\d+)?[\w\.]+)/i // Mosaic
				],
				[NAME, VERSION, MAJOR]


			],

			engine: [
				[

					/(presto)\/([\w\.]+)/i, // Presto
					/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
					/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, // KHTML/Tasman/Links
					/(icab)[\/\s]([23]\.[\d\.]+)/i // iCab
				],
				[NAME, VERSION],
				[

					/rv\:([\w\.]+).*(gecko)/i // Gecko
				],
				[VERSION, NAME]
			]
		}
	}
	
	//MUJS.Browser.getBrowser();
	

	/***********************************
	 ** Element Manipulation Functions
	 **********************************/
	function isElement(obj) {
		try {
			return obj instanceof HTMLElement;
		} catch(e) {
			return (typeof obj==="object") &&
			(obj.nodeType===1) && (typeof obj.style === "object") &&
			(typeof obj.ownerDocument ==="object");
		}
	}
	
	function hasClass(el, className){
		var classArr = el.className.split(' ');
		if(classArr.indexOf(className) == -1)
			return false;
		return true;
	}
	
	function hasClasses(el, classNames){
		var r = [];
		var classArr = el.className.split(' ');
		var classNamesArr = (typeof classNames === "string" ? classNames.split(' ') : classNames);
		for(var i in classNamesArr)
			if(classArr.indexOf(classNamesArr[i]) != -1)
				r.push(classNamesArr[i]);
		return r;
	}
	
	function missingClasses(el, classNames){
		var r = [];
		var classArr = el.className.split(' ');
		var classNamesArr = (typeof classNames === "string" ? classNames.split(' ') : classNames);
		for(var i in classNamesArr)
			if(classArr.indexOf(classNamesArr[i]) == -1)
				r.push(classNamesArr[i]);
		return r;
	}
	
	function addClass(el, className){
		if(!hasClass(el, className))
			el.className += (el.className + ' ' + className).trim();
		return el;
	}
	
	function addClasses(el, classNames){
		var classNamesArr = (typeof classNames === "string" ? classNames.split(' ') : classNames);
		var has = el.className.split(' ');
		for(var i = 0; i < classNamesArr.length; i++){
			if(has.indexOf(classNamesArr[i]) == -1)
				has.push(classNamesArr[i]);
		}
		el.className = has.join(' ');
		return el;
	}
	
	function removeClass(el, className){
		var classStr = el.className;
		var classArr = classStr.split(' ');
		var index = classArr.indexOf(className);
		if(index == -1)
			return el;
		classArr.splice(index, 1);
		el.className = classArr.join(' ');
		return el;
	}
	
	function removeClasses(el, classNames){
		var namesArr;
		if(typeof classNames === "string")
			namesArr = Array.prototype.slice.call(arguments, 1);
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
	
	function appendChild(el, data){
		try{
			if(typeof data === "undefined")
				return el;
			else if(isElement(data))
				el.appendChild(data);
			else {
				switch(RealTypeOf(data)){
					case "undefined":
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
		} catch(e) {
			console.log('Error! appendChild', e);
		} finally {
			return el;
		}
	}
	
	function createNewElement(data){
		var newElement = document.createElement(data.type);
		
		if(typeof data.id !== "undefined")
			newElement.id = data.id;
			
		if(typeof data.className !== "undefined")
			newElement.className = data.className;
		else if(typeof data['class'] !== "undefined")
			newElement.className = data['class'];
		
		if(typeof data.style !== "undefined")
			newElement.style = data.style;
		
		if(typeof data.title !== "undefined")
			newElement.title = data.title;
		
		appendChild(newElement, getFirstValidKeyValue(data, ['innerHTML', 'text']));
		
		if(typeof data.attributes !== "undefined"){
			for(var i in data.attributes){
				newElement.setAttribute(i, data.attributes[i]);
			}
		}
		
		var eventListeners = getFirstValidKeyValue(data, ['EventListeners', 'eventListeners', 'Events', 'events', 'Listeners', 'listeners']);
		if(typeof eventListeners !== "undefined"){
			for(var eventName in eventListeners){
				if(typeof eventListeners[eventName] === "function"){
					newElement.addEventListener(eventName, eventListeners[eventName]);
				} else if(typeof eventListeners[eventName] === "object"){
					var capture = getFirstValidKeyValue(eventListeners[eventName], ['useCapture', 'Capture', 'capture']) || false;
					var callback = getFirstValidKeyValue(eventListeners[eventName], ['callback', 'function']);
					if(callback){
						if(RealTypeOf(callback) == "array"){
							for(var i in callback)
								newElement.addEventListener(eventName, callback[i], capture);
						} else {
							newElement.addEventListener(eventName, callback, capture);
						}
					}
					
				}
			}
		}
		
		return newElement;
	}


	/***********************************
	 ** Default Config Values
	 **********************************/
	// Default Values
	/**
	 * @alias MUJS.Config
	 * @namespace MUJS.Config
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
	 * @property {boolean} Update.XMLHttpRequest - <font color="red">(Experimental)</font> Use XMLHttpRequest when sending request (only available to userscripts that load MUJS via require)
	 * @property {boolean} Update.jQuery - <font color="red">(broken)</font>
	 * @property {boolean} Update.getStats - Get script stats from the server (only available when getType="data")
	 * @property {object} Error
	 * @property {object} API
	 * @property {boolean} debug
	 * @example
	 * // Get the current value of script.username
	 * MUJS('get', 'script.username')
	 * // or
	 * MUJS.config('script.username');
	 * // or
	 * MUJS.Config.script.username;
	 */
	MUJS.Config = /** @dict */ {
		'host': 'http://myuserjs.org',
		//'scopeLock': (typeof exportFunction === "undefined" ? false : true),
		'scopeLock': false,
		'secure': false,
		'browser': MUJS.Browser.getBrowser(),
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
				'disabled_functions': [], // API.log.disabled_functions
				'hidden_classes': [], // API.log.hidden_classes
				'verbosity_level': (MUJS.debug ? 5 : 2), // API.log.verbosity_level
				'GM_log': true
			},
			'localStorage': {
				'storage_prefix': 'MUJS_' // API.localStorage.storage_prefix
			}
		},
		'debug': false
	};
	
	try{
		if(['firefox', 'waterfox'].indexOf(MUJS.Config.browser.name.toLowerCase()) == -1){
			MUJS.Config.API.log.GM_log = false;
		}
	}catch(e){}
	
	Object.defineProperties(MUJS.Config, props);
	
	
	if(typeof unsafeWindow['MUJS_CONFIGURATION'] !== "undefined"){
		MUJS.Config = merge(MUJS.Config, unsafeWindow['MUJS_CONFIGURATION']);
	}
	
	if(typeof unsafeWindow['MUJS_UPDATE_CONFIGURATION'] !== "undefined"){
		MUJS.Config.Update = merge(MUJS.Config.Update, unsafeWindow['MUJS_UPDATE_CONFIGURATION']);
	}
	
	Object.defineProperties(MUJS.Config, props);
	/**
	 * Get or set a Config value
	 * @function MUJS.config
	 * @memberOf! MUJS
	 * @param {string} key key name to find
	 * @param {*} [value] Value to be set
	 * @example
	 * // Get
	 * MUJS.config('script.username');
	 * // Set
	 * MUJS.config('script.username', 'foo');
	 * @see {@link MUJS.Config}
	 */
	Object.defineProperty(MUJS, "config", {
		value: function(key, value){
			if(typeof value === "undefined"){
				return MUJS.Config.SearchForKeys(key);
			} else {
				return MUJS.Config.setKeyValue(key, value);
			}
		},
		enumerable: false
	});


	/***********************************
	 ** Log
	 **********************************/
	/*
	var oldConsole = console;
	var oldConsoleFunctions = {};
	var maskConsoleFunctions = ['debug', 'log', 'info', 'warning', 'error'];
	
	var beforeLogFunction = function(fName, args, data){
		var e = new Error();
		//oldConsoleFunctions.log.apply(oldConsole, [fName, args]);
		var tStack = MUJS.parseStack(e.stack);
		var lastFunctionCall;
		var excludePatt = /(beforeLogFunction|oldConsole)/i;
		for(var i = 0; i < tStack.length; i++){
			if(!excludePatt.test(tStack[i].functionName)){
				lastFunctionCall = tStack[i];
				break;
			}
		}
		
		if(typeof lastFunctionCall !== "undefined" && (/MUJS(?:\-\d+)\.js/i).test(lastFunctionCall.fileName)){
			//oldConsoleFunctions.log.apply(oldConsole, ['pass', lastFunctionCall]);
		} else {
			MUJS.log.endGroup('MUJS API');
		}
	}
	
	for(var i = 0; i < maskConsoleFunctions.length; i++){
		oldConsoleFunctions[maskConsoleFunctions[i]] = oldConsole[maskConsoleFunctions[i]];
		oldConsole[maskConsoleFunctions[i]] = new (function(fName){
			var funName = fName + '';
			var f = function(){
				//GM_log('foo bar' + funName);
				beforeLogFunction(funName, Array.prototype.slice.call(arguments, 0), {});
				oldConsoleFunctions[funName].apply(oldConsole, arguments);
			}
			return f;
		})(maskConsoleFunctions[i])
	}
	*/

	var OUTPUT_TYPES = {
		'ERROR':     {level: 1,	value: 'error'     },
		'EXCEPTION': {level: 1,	value: 'exception' },
		'WARNING':   {level: 2,	value: 'warn'      },
		'INFO':      {level: 3,	value: 'info'      },
		'LOG':       {level: 4,	value: 'log'       },
		'DEBUG':     {level: 5,	value: 'debug'     }
	}

	function isFirebug(ptr){
		if(typeof ptr === "undefined") return false;
		if(typeof ptr['timeStamp'] !== "undefined") return true;
		return false;
	}

	function isConsole2(ptr){
		if(typeof ptr === "undefined") return false;
		if(!isFirebug(ptr)) {
			if(typeof ptr['dirxml'] !== "undefined") return true;
		}
		return false;
	}

	function isWebConsole(ptr){
		if(typeof ptr !== "undefined" && typeof ptr['dirxml'] === "undefined") return true;
		return false;
	}

	function getFB(){
		if(isFirebug(console)) return console;
		if(isFirebug(this.console)) return this.console;
		if(isFirebug(window.console)) return window.console;
		if(isFirebug(unsafeWindow.console)) return unsafeWindow.console;
		if(isFirebug(unsafeWindow.window.console)) return unsafeWindow.window.console;
		if(isFirebug(window.console)) return window.console;
		
		return undefined;
	}

	function getC2(){
		if(isConsole2(console)) return console;
		if(isConsole2(this.console)) return this.console;
		if(isConsole2(unsafeWindow.console)) return unsafeWindow.console;
		if(isConsole2(unsafeWindow.window.console)) return unsafeWindow.window.console;
		if(isConsole2(window.console)) return window.console;
		
		return undefined;
	}

	function getWC(){
		/*
		if(GM_log){
			if(isWebConsole(GM_log)) return GM_log;
		}
		*/
		if(isWebConsole(unsafeWindow.window.console)) return unsafeWindow.window.console;
		if(isWebConsole(window.console)) return window.console;
		
		return undefined;
	}

	function MUJS_Log(fb_ptr, c2_ptr, wc_ptr){
		var tmp_fb_ptr = (isFirebug(fb_ptr) ? fb_ptr : undefined);
		var tmp_c2_ptr = (isFirebug(c2_ptr) ? c2_ptr : undefined);
		var tmp_wc_ptr = (isFirebug(wc_ptr) ? wc_ptr : undefined);
		return {
			
			'Firebug_ptr':	tmp_fb_ptr,
			'Console2_ptr':	tmp_c2_ptr,
			'WebConsole_ptr':	tmp_wc_ptr,
			
			'OUTPUT_TYPES': OUTPUT_TYPES,
			
			'updateFirebugPtr': function(new_ptr){
				if(typeof this['Firebug_ptr'] === "undefined" && isFirebug(new_ptr)) {
					this.Firebug_ptr = new_ptr;
				}
			},
			
			'updateConsole2Ptr': function(new_ptr){
				if(typeof this['Console2_ptr'] === "undefined" && isConsole2(new_ptr)) {
					this.Console2_ptr = new_ptr;
				}
			},
			
			'updateWebConsolePtr': function(new_ptr){
				if(typeof this['WebConsole_ptr'] === "undefined" && isWebConsole(new_ptr)) {
					this.WebConsole_ptr = new_ptr;
				}
			},
			
			'ConsoleCommand': function(command, value){
				try{
				var args = Array.prototype.slice.call(arguments, 1);
				var safeArgs = mCloneInto(args, unsafeWindow, {
					cloneFunctions: true,
					wrapReflectors: true
				});
				
				if(typeof this.Firebug_ptr !== "undefined" && typeof this.Firebug_ptr[command] !== "undefined")
					this.Firebug_ptr[command].apply(this.Firebug_ptr, safeArgs);
				
				if(typeof this.Console2_ptr !== "undefined" && typeof this.Console2_ptr[command] !== "undefined")
					this.Console2_ptr[command].apply(this.Console2_ptr, safeArgs);
				
				if(typeof this.WebConsole_ptr !== "undefined" && typeof this.WebConsole_ptr[command] !== "undefined")
					this.WebConsole_ptr[command].apply(this.WebConsole_ptr, safeArgs);
				else if(typeof GM_log !== "undefined" && MUJS('get', 'API.log.GM_log') && ['debug', 'log', 'info', 'warning', 'error', 'exception'].indexOf(command.toLowerCase()) != -1){
					// Cannot use function.apply on GM_log
					// Greasemonkey can only handle one argument
					if(args.length == 0) GM_log('');
					else if(args.length == 1) GM_log(args[0]);
					else GM_log(args.join(','));
				}
				}catch(e){
					console.log('ConsoleCommand Error! getUpdateData: ', e.name, e.fileName, e.lineNumber + ':' + e.columnNumber);
					console.log(e);
					console.trace(e);
				}
			},
			
			'outputMessage': function(output_type, str){
				if(output_type.level <= MUJS.config('API.log.verbosity_level'))
					this.ConsoleCommand.apply(this, [output_type.value].concat(Array.prototype.slice.call(arguments, 1)));
			},
			
			'Error': function(category, x){
				this['outputMessage'].apply(this, [OUTPUT_TYPES['ERROR'], "C.CE Error (" + category + ") - " +  x.name + ' - ' + x.message + ' in file <' + x.fileName + '> on line ' + x.lineNumber, x]);
			},
			
			'Exception': function(e){this['outputMessage'].apply(this, [OUTPUT_TYPES['EXCEPTION']].concat(Array.prototype.slice.call(arguments, 0)));},
			
			'logError': this['Error'],
			
			'Warning': function(str){this['outputMessage'].apply(this, [OUTPUT_TYPES['WARNING']].concat(Array.prototype.slice.call(arguments, 0)));},
			
			'Info': function(str){this['outputMessage'].apply(this, [OUTPUT_TYPES['INFO']].concat(Array.prototype.slice.call(arguments, 0)));},
			
			'Log': function(str){this['outputMessage'].apply(this, [OUTPUT_TYPES['LOG']].concat(Array.prototype.slice.call(arguments, 0)));},
			
			'Debug': function(str){this['outputMessage'].apply(this, [OUTPUT_TYPES['DEBUG']].concat(Array.prototype.slice.call(arguments, 0)));},
			
			//'Debug': function(str){this['outputMessage'](OUTPUT_TYPES['DEBUG'], str);},
			
			'table': function(data){this.ConsoleCommand('table', Array.prototype.slice.call(arguments, 0));},
			
			'count': function(title){
				if(MUJS.config('API.log.disabled_functions').indexOf('count') == -1)
					this.ConsoleCommand('count', title);
			},
			
			'startGroup': function(title){
				if(MUJS.config('API.log.disabled_functions').indexOf('startGroup') == -1 && MUJS.config('API.log.disabled_functions').indexOf('groupEnd') == -1 && MUJS.config('API.log.disabled_functions').indexOf('groupCollapsed') == -1)
					this.ConsoleCommand('group', title);
			},
			
			'endGroup': function(){
				if(MUJS.config('API.log.disabled_functions').indexOf('startGroup') == -1 && MUJS.config('API.log.disabled_functions').indexOf('groupEnd') == -1 && MUJS.config('API.log.disabled_functions').indexOf('groupCollapsed') == -1)
					this.ConsoleCommand('groupEnd');
			},
			
			'groupCollapsed': function(title){
				if(MUJS.config('API.log.disabled_functions').indexOf('startGroup') == -1 && MUJS.config('API.log.disabled_functions').indexOf('groupEnd') == -1 && MUJS.config('API.log.disabled_functions').indexOf('groupCollapsed') == -1)
					this.ConsoleCommand('groupCollapsed', title);
			},
			
			'time': function(name){
				if(MUJS.config('API.log.disabled_functions').indexOf('time') == -1 && MUJS.config('API.log.disabled_functions').indexOf('timeEnd') == -1)
					this.ConsoleCommand('time', name);
			},
			
			'timeEnd': function(name){
				if(MUJS.config('API.log.disabled_functions').indexOf('time') == -1 && MUJS.config('API.log.disabled_functions').indexOf('timeEnd') == -1)
					this.ConsoleCommand('timeEnd', name);
			},
			
			'timeStamp': function(name){
				if(MUJS.config('API.log.disabled_functions').indexOf('timeStamp') == -1)
					this.ConsoleCommand('timeStamp', name);
			},
			
			'assert': function(expression, obj){
				if(MUJS.config('API.log.disabled_functions').indexOf('assert') == -1)
					this.ConsoleCommand.apply(this, ['assert'].concat(Array.prototype.slice.call(arguments, 0)));
			},
			
			'trace': function(){
				if(MUJS.config('API.log.disabled_functions').indexOf('trace') == -1)
					this.ConsoleCommand('trace');
			},
			
			'clear': function(){
				if(MUJS.config('API.log.disabled_functions').indexOf('clear') == -1)
					this.ConsoleCommand('clear');
			},
			
			'profile': function(name){
				if(MUJS.config('API.log.disabled_functions').indexOf('profile') == -1 && MUJS.config('API.log.disabled_functions').indexOf('profileEnd') == -1)
					this.ConsoleCommand.apply(this, ['profile'].concat(Array.prototype.slice.call(arguments, 0)));
			},
			
			'profileEnd': function(){
				if(MUJS.config('API.log.disabled_functions').indexOf('profile') == -1 && MUJS.config('API.log.disabled_functions').indexOf('profileEnd') == -1)
					this.ConsoleCommand.apply(this, ['profileEnd'].concat(Array.prototype.slice.call(arguments, 0)));
			}
			
		}
	}
	
	function UpdateAllPtrs(){
		MUJS.API.MUJS_Log.updateFirebugPtr(getFB());
		MUJS.API.MUJS_Log.updateConsole2Ptr(getC2());
		MUJS.API.MUJS_Log.updateWebConsolePtr(getWC());
	}
	
	var MUJS_Log_Functions = [
		'Debug',
		'Log',
		'Info',
		'Warning',
		//'Error'
	];

	MUJS.API.fn.MUJS_Log = new MUJS_Log(getFB(), getC2(), getWC());
	//MUJS['API']['MUJS_Log'].Log
	MUJS.fn.log = MUJS.API.MUJS_Log;
	MUJS.fn.log.UpdateAllPtrs = UpdateAllPtrs;
	
	for(var i = 0; i < MUJS_Log_Functions.length; i++){
		MUJS.fn[MUJS_Log_Functions[i]] = (MUJS.API.MUJS_Log[MUJS_Log_Functions[i]]).bind(MUJS.API.MUJS_Log);
	}
if(true)
	MUJS.log.startGroup('MUJS API Initialize');

MUJS.log.Info('Loading MUJS API v' + MUJS.version + ' ' + MUJS.build_type + (MUJS.debug ? ' (debug enabled)' : '') + ' - ' + (new Date(parseInt(MUJS.build_time))).toString());

	/***********************************
	 ** API Eval Command
	 **********************************/
MUJS.API.EvalCommand = function(command, arg1, arg2){
	var args = Array.prototype.slice.call(arguments, 1);
	switch(command.toLowerCase()){
		// Log
		case 'log':
		case 'gm_log':
			return MUJS.API.MUJS_Log.Log.apply(MUJS.API.MUJS_Log, args);
			break;
		case 'debug':
			return MUJS.API.MUJS_Log.Debug.apply(MUJS.API.MUJS_Log, args);
			break;
		case 'info':
			return MUJS.API.MUJS_Log.Info.apply(MUJS.API.MUJS_Log, args);
			break;
		case 'warning':
			return MUJS.API.MUJS_Log.Warning.apply(MUJS.API.MUJS_Log, args);
			break;
		case 'startgroup':
		case 'endgroup':
		case 'groupcollapsed':
		case 'time':
		case 'timeend':
		case 'timestamp':
		case 'assert':
		case 'trace':
		case 'clear':
		case 'count':
		case 'table':
			return MUJS.API.MUJS_Log[command].apply(MUJS.API.MUJS_Log, args);
			break;
		
		// Add Style
		case 'style':
		case 'addstyle':
		case 'gm_addstyle':
			return MUJS.API.addStyle.apply(MUJS.API, args);
			break;
		
		// Add Script
		case 'script':
		case 'addscript':
		case 'gm_addscript':
			return MUJS.API.addScript.apply(MUJS.API, args);
			break;
		
		// Content Eval
		case 'contenteval':
			return MUJS.API.contentEval.apply(MUJS.API, args);
			break;
			
		// LocalStorage
		case 'getvalue':
			return MUJS.API.localStorage.getValue.apply(MUJS.API, args);
			break;
		case 'setvalue':
			return MUJS.API.localStorage.setValue.apply(MUJS.API, args);
			break;
		case 'deletevalue':
			return MUJS.API.localStorage.deleteValue.apply(MUJS.API, args);
			break;
		
		default:
			if(typeof MUJS.API[command] === "function")
				return MUJS.API[command].apply(MUJS.API, args);
			else if(typeof MUJS.API[command] !== "undefined")
				return MUJS.API[command];
			break;
	}
	return undefined;
}
	
	/***********************************
	 ** Events
	 **********************************/
	
MUJS.fn['Events'] = {
	'e': {},
	'fired': {},
	'addEvent': function(name, recordEvent){
		this.e[name] = {
			recordEvent: typeof recordEvent !== "undefined" ? recordEvent : true,
			listeners: []
		};
		Object.defineProperty(MUJS, name, new (function(propName){return {set: function(callback){MUJS['Events']['addListener'](propName, callback);},enumerable: false};})(name));
	},
	'addListener': function(name, callback){
		if(typeof this.fired[name] === "undefined"){
			this.e[name].listeners.push(callback);
		} else {
			callback.apply(MUJS, this.fired[name]);
		}
	},
	'fire': function(name){
		if(typeof this.e[name] !== "undefined"){
			var args = Array.prototype.slice.call(arguments, 1);
			if(this.e[name].recordEvent)
				this.fired[name] = args;
			var putBack = [];
			while( i = this.e[name].listeners.pop() ) {
				if(!i.apply(null, args))
					putBack.push(i);
			}
			this.e[name].listeners = putBack;
		}
	}
};

// MUJS.events is depreciated in favor of MUJS.Events
//MUJS.fn['events'] = MUJS['Events'];

// MUJS Events
MUJS['Events']['addEvent']('onReady');
MUJS['Events']['addEvent']('onPageReady');

// DOM Events
MUJS['Events']['addEvent']('load');
MUJS['Events']['addEvent']('DOMContentLoaded');
MUJS['Events']['addEvent']('onreadystatechange');
MUJS['Events']['addEvent']('afterscriptexecute', false);
MUJS['Events']['addEvent']('beforescriptexecute', false);


	/***********************************
	 ** Get Script Info
	 **********************************/
	MUJS.fn.getScriptURLInfo = function(str){
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
	
	MUJS.gotScriptFileInfo = false;
	
	MUJS.fn.getScriptFileInfo = function(){
		var callerScriptInfo;
		var output = {};
		
		if(MUJS.gotScriptFileInfo)
			return MUJS('script.script_file_info');
		var e = new Error();
		//console.log(e.stack);
		if(e.stack.indexOf('.user.js') == -1)
			return undefined;
		var tStack = MUJS.parseStack(e.stack.toString());
		if(tStack.length > 0){
			for(var i = tStack.length - 1; i >= 0; i--){
				if(tStack[i].fileName != '' && tStack[i].fileExt.toLowerCase() == 'user.js'){
					callerScriptInfo = tStack[i];
					output.userscript_file_name = callerScriptInfo.fileName;
					output.userscript_file_path = callerScriptInfo.fullFileName;
					MUJS.gotScriptFileInfo = true;
					MUJS('set', 'script.script_file_info', output);
					MUJS.API('info', 'Userscript File Name: ' + callerScriptInfo.fullFileName);
					return output;
					break;
				}
			}
		}
		return undefined;
	}

	MUJS.fn.setScriptInfo = function(data){
		var callerScriptInfo = MUJS.getScriptFileInfo();
		var output = {};
		if(typeof callerScriptInfo !== "undefined")
			output = merge(output, callerScriptInfo);
		
		
		
		try{
			var tGM_info;
			var tScriptMetaStr;
			var pMetaData;
			
			
			
			if(typeof data === "object"){
				tGM_info = getFirstValidKeyValue(data, ['GM_info', 'gm_info', 'ginfo']);
				if(typeof tGM_info !== "undefined"){
					tScriptMetaStr = tGM_info.scriptMetaStr;
				}
			} else if(typeof data === "string"){
				tScriptMetaStr = data;
			}
			if(typeof tScriptMetaStr !== "undefined"){
				pMetaData = MUJS.API.ParseMetaData(tGM_info.scriptMetaStr);
				
				for(var key in pMetaData){
					if(typeof output[key] === "undefined") output[key] = pMetaData[key];
				}
			}
			
			if(typeof tGM_info !== "undefined"){
				//console.log(tGM_info);
				
				if(typeof tGM_info.script !== "undefined"){
					for(var key in tGM_info.script){
						if(typeof output[key] === "undefined") output[key] = tGM_info.script[key];
					}
				}
				
				if(typeof tGM_info.uuid !== "undefined"){
					output['gmUUID'] = tGM_info.uuid;
				} else if(typeof tGM_info.script.uuid !== "undefined"){
					output['gmUUID'] = tGM_info.script.uuid;
				}
				
				if(typeof tGM_info.scriptHandler !== "undefined"){
					if(tGM_info.scriptHandler.toLowerCase() == 'tampermonkey'){
						output.script_handler = 'Tampermonkey';
						output.script_handler_version = tGM_info.version;
					} else if(tGM_info.scriptHandler.toLowerCase() == 'greasemonkey'){
						output.script_handler = 'Greasemonkey';
						output.script_handler_version = tGM_info.version;
					}
				} else if(data.has_GM_info){
					output.script_handler = 'Greasemonkey';
					output.script_handler_version = tGM_info.version;
				} else if(data.has_GM_getMetadata){
					output.script_handler = 'Scriptish';
				}
				
			}
			
			if(typeof pMetaData !== "undefined"){	
				//console.log('pMetaData', pMetaData);
				
				var urlInfo;
				var key = getFirstValidKey(pMetaData, ['downloadURL', 'updateURL', 'MUJSdownloadURL', 'MUJSupdateURL'], function(k, val){return MUJS.getScriptURLInfo(val);});
				if(typeof key !== "undefined" && (urlInfo = MUJS.getScriptURLInfo(pMetaData[key]))){
					console.log('urlInfo', urlInfo);
					MUJS('set', 'script.username', urlInfo.username);
					MUJS('set', 'script.script_name', urlInfo.script_name);
					if(['meta', 'metajs', 'data'].indexOf(urlInfo.get_type.toLowerCase()) != -1){
						MUJS('set', 'script.get_type', urlInfo.get_type.toLowerCase());
					}
				} else {
					var tmp;
					if((tmp = getFirstValidKeyValue(pMetaData, ['MUJSusername', 'MUJS_username'])))
						MUJS('set', 'script.username', tmp);
						
					if((tmp = getFirstValidKeyValue(pMetaData, ['MUJSscriptname', 'MUJS_script_name'])))
						MUJS('set', 'script.script_name', tmp);
				}
				
				
				
			}
			
			
		}catch(e){}
		
		Object.defineProperty(MUJS.Config.script, 'script_info', {
			value: Object.freeze(output),
			writable: false,
			enumerable: true,
			configurable: false
		});
		
		return Object.freeze(output);
	};
	
	MUJS.fn.getScriptInfo = function(data){
		if(typeof MUJS.config('script.script_info') === "undefined"){
			return MUJS.setScriptInfo(data);
		}
		return MUJS.config('script.script_info');
	}
	

	//if(MUJS.config('debug')) MUJS.Log('MUJS.Config', MUJS.Config);

	/***********************************
	 ** Add Style
	 **********************************/
/**
 * Adds given css to the the page.
 * @param {string} css The CSS to be added to the document.
 * @returns {Object} node The newly created style node
 */
MUJS.API.addStyle = function(css){
	if (typeof css != "undefined" && css != '') {
		if(typeof GM_addStyle !== "undefined"){
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
 * @param {string} js The js to be added to the document.
 * @param {string} src The src for the script tag.
 * @param {string} id The id for the script tag.
 * @returns {Object} node The newly created script node
 */
MUJS.API.addScript = function(js, src, id, async){
	if(heads = document.getElementsByTagName('head')) {
		var newScript = document.createElement('script');
		if(typeof js != "undefined" && js != ''){
			try {
				newScript.innerHTML = js;
			} catch (x) {
				newScript.innerText = js;
			}
		}
		
		if(typeof src != "undefined" && src != ''){
			try{newScript.src = src;}catch(x){}
		}
		
		if(typeof id !== "undefined"){
			try{newScript.id = id;}catch(x){}
		}
		
		if(typeof async !== "undefined"){
			newScript.async = true;
		}
		
		newScript.type = 'text/javascript';
		try{return heads[0].appendChild(newScript);}catch(x){}
	}
	return null;
}

	/***********************************
	 ** Content Eval
	 **********************************/
MUJS.API.contentEval = function(source) {
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
	 ** LocalStorage
	 **********************************/
	 
Object.defineProperty(MUJS, "stor", {
	value: (function(){return (localStorage?localStorage:(unsafeWindow.localStorage?unsafeWindow.localStorage:window.localStorage));})(),
	enumerable: false
});

MUJS.API.localStorage = {};

MUJS.API.localStorage.getValue = function(key, def){
	var name = MUJS.config('API.localStorage.storage_prefix') + key;
	if (MUJS.stor[name]) {
		var value = MUJS.stor.getItem(name);
		return value;
	}
	return def;
}

MUJS.API.localStorage.setValue = function(key, value){
	var name = MUJS.config('API.localStorage.storage_prefix') + key;
	return MUJS.stor.setItem(name, value);
}

MUJS.API.localStorage.deleteValue = function(key, value){
	var name = MUJS.config('API.localStorage.storage_prefix') + key;
	return MUJS.stor.removeItem(name);
}

MUJS.fn.getValue = MUJS.API.localStorage.getValue;
MUJS.fn.setValue = MUJS.API.localStorage.setValue;
MUJS.fn.deleteValue = MUJS.API.localStorage.deleteValue;
	 
	/***********************************
	 ** Parse Meta Data
	 **********************************/
		MUJS.API.ParseMetaData_Types = [];
		
		MUJS.API.ParseMetaData_Types.push(function(name, obj){
			if(typeof obj === "object"){
				var history_patt = /\(([0-9\.]+)\)\s+(.*?)$/i;
				var o = {};
				for(var i = 0; i < obj.length; i++){
					if(history_patt.test(obj[i])){
						var r = history_patt.exec(obj[i]);
						var vers = r[1];
						var des = r[2];
						if(typeof o[vers] === "undefined") o[vers] = [];
						o[vers].push(des);
					}
				}
				return o;
			}
			return undefined;
		});
		
		//MUJS.API.ParseMetaData_Types.push(function(name, obj){
		//});
		
		MUJS.API.ParseMetaData = function(headerBlock){
			if(typeof headerBlock === "string"){
				headerBlock = headerBlock.split(/\r?\n/i);
			}
			// Parse Meta Array
			var o = {};
			var patt = /@([\S]+)\s+(.*?)$/i;
			for(var i = 0; i < headerBlock.length; i++){
				if(patt.test(headerBlock[i])){
					var r = patt.exec(headerBlock[i]);
					if(typeof o[r[1]] === "undefined"){
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
			
			for(var key in o){
				for(var i = 0; i < MUJS.API.ParseMetaData_Types.length; i++){
					var tmp = MUJS.API.ParseMetaData_Types[i](key, o[key]);
					if(typeof tmp !== "undefined"){
						o[key] = tmp;
						break;
					}
				}
			}
			
			return o;
		}


	/***********************************
	 ** Date
	 **********************************/
/**
 * @name MUJS.API.Date
 * @memberOf! MUJS.API
 * @namespace MUJS.API.Date
 * @since 0.0.14
 */
/**
 * (MUJS.API.Date) Date API function for calling other date related functions
 * @function MUJS.API.Date
 * @memberOf! MUJS.API
 * @variation 2
 * @param {string} command Function name to be called
 * @param {...object} args Arguments to be passed to the function
 */
MUJS.API.fn.Date = function(command, args){
	switch(command){
		case 'parseUTC':
		case 'parseUTCDate':
			return MUJS.API.Date.parseUTCDate.apply(MUJS.API.Date, Array.prototype.slice.call(arguments, 1));
	}
}

Object.defineProperties(MUJS.API.Date, {
	/**
	 * Returns the current time
	 * @memberOf! MUJS.API.Date
	 * @member {object} MUJS.API.Date.now date object in the local time-zone
	 */
	"now": {get: function(){return Date.now();}},
	"fn": {value: MUJS.API.Date.__proto__}
});

/**
 * Parses the UTC date returned when doing an update check (meta key: scriptUploadTimestamp)
 * @function MUJS.API.Date.parseUTCDate
 * @memberOf! MUJS.API.Date
 * @param {string|date} value date to parse
 * @return {object} date object in the local time-zone
 */
MUJS.API.Date.fn.parseUTCDate = function(value){
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
 * @function MUJS.API.Date.getScriptTimeDiff
 * @memberOf! MUJS.API.Date
 * @param {(string|object)} dateObj date string or object returned by update request
 * @return {TimeDiff}
 */
MUJS.API.Date.fn.getScriptTimeDiff = function(dateObj){
	var tDate;
	if(typeof dateObj === "string")
		tDate = MUJS.API.Date.parseUTCDate(dateObj);
	else if(typeof dateObj === "object" && typeof dateObj.scriptUploadTimestamp !== "undefined")
		tDate = MUJS.API.Date.parseUTCDate(dateObj.scriptUploadTimestamp);
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
	 ** Notifications
	 **********************************/
/**
 * Notification Configuration Options
 * @name Notifications
 * @alias Notifications
 * @memberof MUJS.Config
 * @property {boolean} enabled is enabled
 * @example
 * // Get the current value of Notifications.enabled
 * MUJS('get', 'Notifications.enabled')
 * // or
 * MUJS.config('Notifications.enabled');
 * // or
 * MUJS.Config.Notifications.enabled;
 */
MUJS.Config.Notifications = {
	enabled: true
}

/**
 * @namespace MUJS.Notification
 * @memberOf MUJS
 * @since 0.0.14
 * @todo Clean up Notification loading process
 * @example
 * // Show an update notification
 * MUJS.Notification('UpdateNotification', {
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
 * MUJS.Notification({
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
	
	// New Notification
	var newNotification = document.createElement("div");
	newNotification.setAttribute('data-mujs-notification', MUJS.Notification.count);
	newNotification.setAttribute('data-mujs-large-notification', MUJS.Notification.LargeCount);
	newNotification.className = 'MUJSLargeNotification bigBox animated fadeIn';
	// Background
	if(typeof data.background !== "undefined")
		newNotification.style.background = data['background'];
	if(typeof data['background-color'] !== "undefined")
		newNotification.style.backgroundColor = data['background-color'];
	else
		newNotification.style.backgroundColor ='rgb(50, 118, 177)';
	
	var newNotificationContent = document.createElement("div");
	newNotificationContent.className = '';
	
	// Close Button
	var btnClose = document.createElement("i");
	btnClose.setAttribute('class', 'botClose fa fa-times');
	btnClose.setAttribute('id', 'MUJSbtnClose'+MUJS.Notification.LargeCount);
	btnClose.addEventListener("click", function(e){
		var notification = e.target.parentElement.parentElement;
		var notificationNum = parseInt(notification.getAttribute('data-mujs-notification'));
		var largeNotificationNum = parseInt(notification.getAttribute('data-mujs-large-notification'));
		MUJS.Notification.close(notification, 'large', notificationNum, largeNotificationNum, e);
	});
	newNotificationContent.appendChild(btnClose);
	
	// Title
	var title = document.createElement('span');
	title.className = '';
	if(typeof data.title !== "undefined"){
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
	if(typeof data.body !== "undefined"){
		if(isElement(data.body)){
			bdy.appendChild(data.body);
		} else {
			bdy.innerHTML = data.body;
		}
	}
	newNotificationContent.appendChild(bdy);
	
	// Icon
	if(typeof data.icon !== "undefined"){
		var icon = document.createElement('div');
		icon.setAttribute('class', 'mujs-na bigboxicon');
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


function generateSmallNotificationElement(data){
	
	// New Notification
	var newNotification = document.createElement("div");
	newNotification.setAttribute('data-mujs-notification', MUJS.Notification.count);
	newNotification.setAttribute('data-mujs-small-notification', MUJS.Notification.SmallCount);
	newNotification.className = 'MUJSSmallNotification SmallBox animated fadeIn';
	// Background
	if(typeof data.background !== "undefined")
		newNotification.style.background = data['background'];
	if(typeof data['background-color'] !== "undefined")
		newNotification.style.backgroundColor = data['background-color'];
	else
		newNotification.style.backgroundColor ='rgb(41, 97, 145)';
	
	var totalCount = MUJS.Notification.CurrentSmallCount;
	if(totalCount > 0){
		var tHeight = totalCount * 25;
		var smallNotificationsContainer = MUJS.Notification('getElement', 'notificationsSmallWrapper');
		var smNotes = smallNotificationsContainer.querySelectorAll('div[data-mujs-small-notification]');
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
			while(!tParent.hasAttribute('data-mujs-small-notification') && tParent != null && tCount < 10){
				tParent = tParent.parentElement;
				tCount++;
			}
			if(tParent != null){
				var notificationNum = parseInt(tParent.getAttribute('data-mujs-notification'));
				var smallNotificationNum = parseInt(tParent.getAttribute('data-mujs-small-notification'));
				MUJS.Notification.close(tParent, 'small', notificationNum, smallNotificationNum, e);
			}
		//}
	}, false);
	//newNotificationContent.appendChild(newNotification);
	
	var newNotificationContent = document.createElement("div");
	if(typeof data.footer === "undefined")
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
	if(typeof data.title !== "undefined"){
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
	if(typeof data.body !== "undefined"){
		if(isElement(data.body)){
			bdy.appendChild(data.body);
		} else {
			bdy.innerHTML = data.body;
		}
	}
	newNotificationContent.appendChild(bdy);
	
	// Footer
	if(typeof data.footer !== "undefined"){
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
	if(typeof data.footer === "undefined" && typeof data.icon !== "undefined"){
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
 * @memberOf MUJS
 * @variation 2
 * @param {string|object} data Command to execute or notification data
 * @param {...*} [data2]
 * @see MUJS.Notification
 */
MUJS.fn.Notification = function(data, data2){
	if(!MUJS('get', 'Notifications.enabled'))
		return false;
	if(!MUJS.Notification.Initialized){
		MUJS.Notification.init();
	}
	
	if(typeof data === "string"){
		switch(data.toLowerCase()){
			case 'get':
			case 'getelement':
				return MUJS.Notification.getElement.apply(MUJS.Notification, Array.prototype.slice.call(arguments, 1));
				break;
			case 'getid':
			case 'getelementid':
				return MUJS.Notification.getElementId.apply(MUJS.Notification, Array.prototype.slice.call(arguments, 1));
				break;
			case 'updatenotification':
				return MUJS.Notification.UpdateNotification.apply(MUJS.Notification, Array.prototype.slice.call(arguments, 1));
				break;
		}
	} else if(typeof data === "object") {
		switch((data.type || '').toLowerCase()){
			case 'small':
				var smallNotificationsContainer = MUJS.Notification('getElement', 'notificationsSmallWrapper');
				var newNotification = generateSmallNotificationElement(data);
				smallNotificationsContainer.appendChild(newNotification);
				MUJS.Notification.Events.addAll(data, MUJS.Notification.count);
				MUJS.Notification.count++;
				MUJS.Notification.SmallCount++;
				break;
			case 'large':
			default:
				var largeNotificationsContainer = MUJS.Notification('getElement', 'notificationsLargeWrapper');
				var newNotification = generateLargeNotificationElement(data);
				largeNotificationsContainer.appendChild(newNotification);
				MUJS.Notification.Events.addAll(data, MUJS.Notification.count);
				MUJS.Notification.count++;
				MUJS.Notification.LargeCount++;
				break;
		}
	}
}

MUJS.Notification.UpdateNotification = function(data){
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
		options.script_name = MUJS('get', 'script.script_name');
	
	var title = options.title.replace('%SCRIPTNAME%', options.script_name).replace('%VERSION%', options.version).replace('%TIME%', options.time);
	var body = options.body.replace('%SCRIPTNAME%', options.script_name).replace('%VERSION%', options.version).replace('%TIME%', options.time);
	
	if(!options.install.href || options.install.href == null || options.install.href == ''){
		options.install.href = MUJS('get', ['script.script_info.MUJSdownloadURL', 'script.script_info.downloadURL']);
		if(typeof options.install.href === "undefined")
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
		if(typeof MUJS('get', 'script.script_info.homepage') !== "undefined")
			options.visit.href = MUJS('get', 'script.script_info.homepage');
		else
			options.visit.href = 'http://myuserjs.org/script/' + MUJS('get', 'script.username') + '/' + MUJS('get', 'script.script_name');
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
	
	MUJS.Notification({
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

MUJS.Notification.getElementId = function(name){
	switch(name.toLowerCase()){
		case 'wrapper':
		case 'notificationswrapper':
			return "MUJSNotificationsWrapper";
			break;
			
		case 'smallwrapper':
		case 'notificationssmallwrapper':
			return "MUJSSmallNotificationsWrapper";
			break;
			
		case 'largewrapper':
		case 'notificationslargewrapper':
			return "MUJSLargeNotificationsWrapper";
			break;
		
		default:
			return null;
			break;
	}
}

MUJS.Notification.getElement = function(name){
	var tId = MUJS.Notification.getElementId(name);
	if(tId != null)
		return document.getElementById(tId);
	return document.getElementById(name);
}

MUJS.Notification.remove = function(notification, notificationNumber){
	if(notification != null){
		if(notification.hasAttribute('data-mujs-small-notification')){
			var tSib = notification;
			var oldTop = parseInt(notification.style.top || 0);
			if(oldTop <= 0) oldTop = 20;
			while(tSib.nextElementSibling != null && tSib.nextElementSibling.hasAttribute('data-mujs-small-notification')){
				tSib = tSib.nextElementSibling;
				tSib.className = 'MUJSSmallNotification SmallBox transitionUp';
				tSib.style.top = oldTop + 'px';
				oldTop = oldTop + parseInt(tSib.offsetHeight) + 25;
			}
		}
		notification.parentElement.removeChild(notification);
	}
}

MUJS.Notification.close = function(notification, type, notificationNumber, typeNotificationNumber, event){
	if(notification != null){
		MUJS.Notification.Events.fire(notificationNumber, 'onBeforeClose', notification, event);
		switch(type.toLowerCase()){
			case 'large':
				notification.setAttribute('class', 'MUJSLargeNotification bigBox animated fadeOut fast');
				setTimeout(function(target, targetNum, e){
					MUJS.Notification.remove(target, targetNum);
					MUJS.Notification.Events.fire(targetNum, 'onAfterClose', target, e);
				}, 400, notification, notificationNumber, event);
				break;
			case 'small':
				notification.setAttribute('class', 'MUJSSmallNotification SmallBox animated fadeOut fast');
				setTimeout(function(target, targetNum, e){
					MUJS.Notification.remove(target, targetNum);
					MUJS.Notification.Events.fire(targetNum, 'onAfterClose', target, e);
				}, 400, notification, notificationNumber, event);
				break;
		}
	}
}

MUJS.Notification.Events = {
	'eventListeners': {},
	'events': ['onBeforeClose', 'onAfterClose'],
	add: function(notificationNum, eventName, callback){
		if(typeof this.eventListeners[notificationNum] === "undefined")
			this.eventListeners[notificationNum] = {};
			
		if(typeof this.eventListeners[notificationNum][eventName] === "undefined")
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
		if(typeof this.eventListeners[notificationNum] !== "undefined" && typeof this.eventListeners[notificationNum][eventName] !== "undefined"){
			if(typeof notification !== "undefined" && isElement(notification)){
				thisNotification = notification;
				args = Array.prototype.slice.call(arguments, 3);
			} else {
				thisNotification = document.querySelector('div[data-mujs-notification="'+notificationNum+'"]');
				if(thisNotification == null)
					thisNotification = unsafeWindow;
				args = Array.prototype.slice.call(arguments, 2);
			}
			args.unshift(eventName);
			while(typeof (tCB = this.eventListeners[notificationNum][eventName].shift()) !== "undefined"){
				tCB.apply(thisNotification, args);
			}
		}
	}
};

MUJS.Notification.count = 0;
MUJS.Notification.LargeCount = 0;
MUJS.Notification.SmallCount = 0;

Object.defineProperties(MUJS.Notification, {
	"CurrentLargeCount": {
		get: function(){
			var largeNotificationsContainer = MUJS.Notification('getElement', 'notificationsLargeWrapper');
			return (largeNotificationsContainer.querySelectorAll('div[data-mujs-large-notification]')).length;
		},
		//writable: false
	},
	"CurrentSmallCount": {
		get: function(){
			var smallNotificationsContainer = MUJS.Notification('getElement', 'notificationsSmallWrapper');
			return (smallNotificationsContainer.querySelectorAll('div[data-mujs-small-notification]')).length;
		},
		//writable: false
	}
});


MUJS.Notification.FontAwesomeAdded = false;
MUJS.Notification.OpenSansAdded = false;
MUJS.Notification.CSSAdded = false;
MUJS.Notification.WrapperAdded = false;
MUJS.Notification.SmallWrapperAdded = false;
MUJS.Notification.LargeWrapperAdded = false;
MUJS.Notification.Initialized = false;
//MUJS.Notification.CustomCSSAdded = false;



MUJS.Notification.init = function(){
	MUJS.Notification.Initialized = true;
	
	if(!MUJS('get', 'Notifications.enabled'))
		return false;
		
	var head = document.getElementsByTagName('head')[0];
	var body = document.getElementsByTagName('body')[0];

	// Add Notification Wrapper
	var notificationsFullWrapper = MUJS.Notification('getElement', 'notificationsWrapper');
	if(notificationsFullWrapper == null){
		notificationsFullWrapper = document.createElement("div");
		notificationsFullWrapper.id = MUJS.Notification('getElementId', 'notificationsWrapper');
		notificationsFullWrapper.className = 'MUJSNotificationsFullWrapper mujs-na mujs-fa';
		document.body.appendChild(notificationsFullWrapper);
	}
	MUJS.Notification.WrapperAdded = true;
	
	// Add Small Notification Wrapper
	var smallNotificationsContainer = MUJS.Notification('getElement', 'notificationsSmallWrapper');
	if(smallNotificationsContainer == null){
		smallNotificationsContainer = document.createElement("div");
		smallNotificationsContainer.id = MUJS.Notification('getElementId', 'notificationsSmallWrapper');
		smallNotificationsContainer.className = 'MUJSSmallNotifications';
		notificationsFullWrapper.appendChild(smallNotificationsContainer);
	}
	MUJS.Notification.SmallWrapperAdded = true;
	
	// Add Large Notification Wrapper
	var largeNotificationsContainer = MUJS.Notification('getElement', 'notificationsLargeWrapper');
	if(largeNotificationsContainer == null){
		largeNotificationsContainer = document.createElement("div");
		largeNotificationsContainer.id = MUJS.Notification('getElementId', 'notificationsLargeWrapper');
		largeNotificationsContainer.className = 'MUJSNotifications';
		notificationsFullWrapper.appendChild(largeNotificationsContainer);
	}
	MUJS.Notification.LargeWrapperAdded = true;
}

MUJS.Requirements.addElement({
	'type': 'link',
	'target': 'head',
	'attributes': {
		'href': '//myuserjs.org/css/smartadmin-production-all-namespaced.css',
		'rel': 'stylesheet'
	}
});

MUJS.Requirements.addGM({
	'type': 'style',
	'value': '@import url(//fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700);'
});

MUJS.CSS = '#MUJSSmallNotificationsWrapper,#MUJSNotificationsWrapper,.mujs-na .SmallBox span,.mujs-na .bigBox span{font-family:"Open Sans",Arial,Helvetica,sans-serif;}.mujs-na *,.mujs-na *:after,.mujs-na *:before{box-sizing:border-box;}.mujs-na .SmallBox p{margin-bottom:9px;}.mujs-na .textoFoto > p:last-child > .btn:not(:last-child){margin-right:3px;}.mujs-na .foto{line-height:1.42857;}.transitionUp{-webkit-transition-property:top;-moz-transition-property:top;-o-transition-property:top;transition-property:top;-webkit-transition-duration:0.3s;-moz-transition-duration:0.3s;-o-transition-duration:0.3s;transition-duration:0.3s;}.mujs-na a.btn{text-decoration:none;}';


	/***********************************
	 ** Notifications
	 **********************************/
/**
 * Modal Configuration Options
 * @name Modal
 * @alias Modal
 * @memberof MUJS.Config
 * @property {boolean} enabled is enabled
 * @example
 * // Get the current value of Modal.enabled
 * MUJS('get', 'Modal.enabled')
 * // or
 * MUJS.config('Modal.enabled');
 * // or
 * MUJS.Config.Modal.enabled;
 */
MUJS.Config.Modal = {
	enabled: true
}

/**
 * @namespace MUJS.Modal
 * @memberOf MUJS
 * @since 0.0.14
 */
 
/**
 * @function Modal
 * @memberof MUJS
 * @variation 2
 * @param {(string|object)} data - (string) Command to execute | (object) options for new modal to display
 * @param {(object|boolean)} [data2] - (object) Arguments for command | (boolean) show new modal immediately
 */
MUJS.fn.Modal = function(data, data2){
	if(!MUJS('get', 'Modal.enabled'))
		return false;
	if(!MUJS.Modal.Initialized){
		MUJS.Modal.init();
	}
	try{
		if(typeof data === "string"){
			switch(data.toLowerCase()){
				case 'show':
				case 'showmodal':
					return MUJS.Modal.show.apply(MUJS.Modal, Array.prototype.slice.call(arguments, 1));
					break;
				case 'hide':
				case 'hidemodal':
					return MUJS.Modal.hide.apply(MUJS.Modal, Array.prototype.slice.call(arguments, 1));
					break;
				case 'get':
				case 'getelement':
					return MUJS.Modal.getElement.apply(MUJS.Modal, Array.prototype.slice.call(arguments, 1));
					break;
				case 'getid':
				case 'getelementid':
					return MUJS.Modal.getElementId.apply(MUJS.Modal, Array.prototype.slice.call(arguments, 1));
					break;
			}
		} else if(typeof data === "object") {
			var newModal = MUJS.Modal.fn.createModal(data);
			var modalContainer = MUJS.Modal('getElement', 'modalContainer');
			if(modalContainer)
				modalContainer.appendChild(newModal);
			var modalNum = parseInt(newModal.getAttribute('data-mujs-modal'));
			MUJS.Modal.Modals[modalNum] = {
				index: modalNum,
				element: newModal,
				lockScreen: data.lockScreen || true,
				data: data
			};
			if(data2 === true){
				// show right away
				MUJS.Modal.show(newModal);
			}

			return newModal;
		}
	}catch(e){
		console.log('error, MUJS.fn.Modal', e);
	}
}
Object.defineProperties(MUJS.Modal, {
	fn: {value: MUJS.Modal.__proto__},
	ModalCount: {
		value: 0,
		writable: true
	},
	CurrentModal: {
		value: -1,
		writable: true
	},
	FreezeBackdrop: {
		value: false,
		writable: true
	},
	Modals: {
		value: {},
		writable: true
	},
	Initialized: {
		value: false,
		writable: true
	}
});

var fadeAnimationLength = 150;

/**
 * Get a modal by its index
 * @function getModal
 * @memberof MUJS.Modal
 * @param {number} number Index to search for
 * @returns {Element} DOM Element
 */
MUJS.Modal.fn.getModal = function(number){
	var modal = document.querySelector('div[data-mujs-modal="'+number+'"]');
	if(modal)
		return modal;
	if(typeof MUJS.Modal.Modals[number] !== "undefined")
		return MUJS.Modal.Modals[number].element;
	return null;
}

MUJS.Modal.getElementId = function(name){
	switch(name.toLowerCase()){
		case 'container':
		case 'modalcontainer':
			return "MUJSModalContainer";
			break;
		case 'backdrop':
		case 'modalbackdrop':
			return "MUJSModalBackdrop";
			break;
	}
	return null;
}

MUJS.Modal.getElement = function(name){
	var tId = MUJS.Modal.getElementId(name);
	if(tId != null)
		return document.getElementById(tId);
	return document.getElementById(name);
}

MUJS.Modal.show = function(modal, modalNum, e){
	try{
		console.log('MUJS.Modal.CurrentModal', MUJS.Modal.CurrentModal);
		if(MUJS.Modal.CurrentModal != -1){
			MUJS.Modal.FreezeBackdrop = true;
			MUJS.Modal.hide();
			setTimeout(function(){MUJS.Modal.FreezeBackdrop = false;}, fadeAnimationLength + 50);
		}
		if(typeof modal === "number" && typeof modalNum !== "number"){
			if(typeof e === "undefined" && typeof modalNum !== "undefined")
				e = modalNum;
			modalNum = modal;
		}
		if(typeof modal === "undefined" && typeof modalNum === "undefined")
			return;
		if((typeof modal === "undefined" || typeof modal === "number") && typeof modalNum === "number"){
			modal = document.querySelector('div[data-mujs-modal="'+modalNum+'"]');
		} else if(typeof modal !== "undefined" && typeof modalNum === "undefined"){
			modalNum = modal.getAttribute('data-mujs-modal');
		}
		
		if(modal){
			var modalBackdrop = MUJS.Modal('getElement', 'modalBackdrop');
			//console.log('MUJS.Modal.show', modal, modalNum, e || null);
			var r = MUJS.Modal.Events.fire('onBeforeShow', modal, modalNum, e || null);
			MUJS.Modal.CurrentModal = modalNum;
			addClass(document.body, 'mujs-modal-open');
			if(!MUJS.Modal.FreezeBackdrop)
				modalBackdrop.style = 'display: block;';
			modal.style = 'display: block;';
			setTimeout(function(modal, modalBackdrop){
				if(!MUJS.Modal.FreezeBackdrop)
					modalBackdrop.className = 'modal-backdrop fade in';
				modal.className = 'modal fade in';
			}, 1, modal, modalBackdrop);
			setTimeout(function(modal, modalNum, e){
				MUJS.Modal.Events.fire('onAfterShow', modal, modalNum, e || null);
			}, fadeAnimationLength, modal, modalNum, e || null);
		}
	}catch(e){
		console.log('Error MUJS.Modal.show', e);
	}
}

MUJS.Modal.hide = function(modal, modalNum, e){
	try{
		if(typeof modal === "undefined" && typeof modalNum === "undefined" && MUJS.Modal.CurrentModal != -1){
			modalNum = MUJS.Modal.CurrentModal;
			modal = MUJS.Modal.getModal(MUJS.Modal.CurrentModal);
		}
		
		if(typeof modal === "number" && typeof modalNum !== "number"){
			if(typeof e === "undefined" && typeof modalNum !== "undefined")
				e = modalNum;
			modalNum = modal;
		}
		if(typeof modal === "undefined" && typeof modalNum === "undefined"){
			return;
		}
		//if((typeof modal === "undefined" || typeof modal === "number") && typeof modalNum === "number"){
		if(!isElement(modal) && typeof modalNum === "number"){
			modal = MUJS.Modal.getModal(modalNum);
		} else if(typeof modal !== "undefined" && typeof modalNum === "undefined"){
			modalNum = modal.getAttribute('data-mujs-modal');
		}
		
		
		if(modal){
			var modalBackdrop = MUJS.Modal('getElement', 'modalBackdrop');
			//console.log('MUJS.Modal.hide', modal, modalNum, e || null);
			var r = MUJS.Modal.Events.fire('onBeforeHide', modal, modalNum, e || null);
			MUJS.Modal.CurrentModal = -1;
			removeClass(document.body, 'mujs-modal-open');
			modal.className = 'modal fade';
			if(!MUJS.Modal.FreezeBackdrop)
				modalBackdrop.className = 'modal-backdrop fade';
			
			setTimeout(function(modal, modalNum, e, modalBackdrop){
				modal.style = 'display: none;';
				if(!MUJS.Modal.FreezeBackdrop)
					modalBackdrop.style = 'display: none;';
				MUJS.Modal.Events.fire('onAfterHide', modal, modalNum, e || null);
			}, fadeAnimationLength, modal, modalNum, e || null, modalBackdrop);
		}
	}catch(e){
		console.log('Error MUJS.Modal.hide', e);
	}
}

MUJS.Modal.Events = {
	'eventListeners': {},
	'events': ['onBeforeShow', 'onAfterShow', 'onBeforeHide', 'onAfterHide'],
	add: function(modalNum, eventName, callback){
		if(typeof this.eventListeners[modalNum] === "undefined")
			this.eventListeners[modalNum] = {};
			
		if(typeof this.eventListeners[modalNum][eventName] === "undefined")
			this.eventListeners[modalNum][eventName] = [];
		
		this.eventListeners[modalNum][eventName].push(callback);
	},
	
	addAll: function(data, modalNum){
		for(var evt in this.events)
			if(typeof data[this.events[evt]] === "function")
				this.add(modalNum, this.events[evt], data[this.events[evt]])
	},
	
	fire: function(eventName, modal, modalNum, triggerEvent){
		try{
			if(typeof this.eventListeners[modalNum] !== "undefined" && typeof this.eventListeners[modalNum][eventName] !== "undefined"){
				var args = Array.prototype.slice.call(arguments, 1);
				if(typeof modal === "undefined"){
					modal = document.querySelector('div[data-mujs-modal="'+modalNum+'"]');
				}
				for(var i in this.eventListeners[modalNum][eventName]){
					this.eventListeners[modalNum][eventName][i].apply(modal || unsafeWindow, args);
				}
			}
		} catch(e){
			console.log('Error MUJS.Modal.Events.fire', e);
		}
	}
};


MUJS.Modal.fn.createModal = function(data){
	var newModalNum = MUJS.Modal.ModalCount++;
	
	MUJS.Modal.Events.addAll(data, newModalNum);
	
	var newModal = createNewElement({
		type: 'div',
		id: 'myModal',
		className: 'modal fade',
		style: 'display: none;',
		attributes: {
			role: 'dialog',
			tabindex: '-1',
			'data-mujs-modal': newModalNum
		},
		EventListeners: {
			click: {
				capture: false,
				callback: function(e){
					if(e.target !== this)
						return;
					var modal = e.target;
					var modalNum = parseInt(modal.getAttribute('data-mujs-modal'));
					MUJS.Modal.hide(modal, modalNum, e);
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
					var modalNum = parseInt(modal.getAttribute('data-mujs-modal'));
					return MUJS.Modal.hide(modal, modalNum, e);
				}
			}
		}
	});
	
	newModalHeader.appendChild(newModalTitleCloseButton);
	
	// Body Content
	appendChild(newModalBody, data.body);
	
	// Footer Buttons
	if(typeof data.buttons !== "undefined"){
		for(var i in data.buttons){
			try{
				var newButtonArgs = merge({
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
				console.log('error! footer buttons: ', e);
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
					var modalNum = parseInt(modal.getAttribute('data-mujs-modal'));
					MUJS.Modal.hide(modal, modalNum, e);
					eventCancel(e);
					return false;
				}
			}
		}
	});
	newModalFooter.appendChild(newModalFooterCloseButton);
	
	return newModal;
}

MUJS.Modal.fn.init = function(){
	MUJS.Modal.Initialized = true;
	
	var modalContainer = MUJS.Modal('getElement', 'modalContainer');
	if(modalContainer == null){
		modalContainer = document.createElement("div");
		modalContainer.id = MUJS.Modal('getElementId', 'modalContainer');
		modalContainer.className = 'MUJSModalContainer mujs-na mujs-fa';
		document.body.appendChild(modalContainer);
	}
	
	var modalBackdrop = MUJS.Modal('getElement', 'modalBackdrop');
	if(modalBackdrop == null){
		modalBackdrop = createNewElement({
			type: 'div',
			id: MUJS.Modal('getElementId', 'modalBackdrop'),
			className: 'modal-backdrop fade in',
			style: 'display:none;',
			EventListeners: {
				// if backdrop isn't removed, allow user to click it away
				click: {
					capture: false,
					callback: function(e){
						if(e.target !== this)
							return;
						var backdrop = MUJS.Modal('getElement', 'modalBackdrop');
						backdrop.style = 'display:none;';
						removeClass(document.body, 'mujs-modal-open');
						eventCancel(e);
						return false;
					}
				}
			}
		});
		modalContainer.appendChild(modalBackdrop);
	}
}



MUJS.CSS = 'body.mujs-modal-open{overflow:hidden !important;}.mujs-modal-open{overflow:hidden;}.mujs-modal-open .mujs-na .modal{overflow-x:hidden;overflow-y:auto;}.mujs.na .fade{opacity:0;-webkit-transition:opacity 0.15s linear;-o-transition:opacity 0.15s linear;transition:opacity 0.15s linear;}.mujs-na .fade.in{opacity:1;}.mujs-na .modal-dialog{margin:30px auto;width:600px;left:auto;}.mujs-na .close{float:right;font-size:21px;font-weight:bold;line-height:1;color:#000000;text-shadow:0 1px 0 #ffffff;opacity:0.2;filter:alpha(opacity=20);}.mujs-na .close:hover,.mujs-na .close:focus{color:#000000;text-decoration:none;cursor:pointer;opacity:0.5;filter:alpha(opacity=50);}.mujs-na button.close{padding:0;cursor:pointer;background:transparent;border:0;-webkit-appearance:none;}.mujs-na .modal *{font-family:inherit;}.mujs-na .modal,.mujs-na .modal-dialog,.mujs-na .modal-content,.mujs-na .modal-header,.mujs-na .modal-body,.mujs-na .modal-footer{font-family:"Open Sans",Arial,Helvetica,sans-serif;}.mujs-na .modal,.mujs-na .modal-dialog,.mujs-na .modal-content,.mujs-na .modal-header,.mujs-na .modal-body,.mujs-na .modal-footer{color:#000;font-size:13px;font-weight:400;}.mujs-na .modal button,.mujs-na .modal input{text-transform:none;}.mujs-na .modal{bottom:0;left:0;outline:0 none;position:fixed;right:0;top:0;z-index:1050;}.mujs-na .modal-backdrop{background-color:#000;bottom:0;left:0;position:fixed;right:0;top:0;z-index:1040;}.mujs-na .modal-backdrop.in{opacity:0.5;}';




	 
	/***********************************
	 ** Get DOM Timing
	 **********************************/
MUJS.fn.getDOMTiming = function(){
	var timingData = {};
	try {
		if(performance.available){
			var ignore = ['unloadEventStart', 'unloadEventEnd', 'navigationStart'];
			
			timingData = performance.getAllTiming();
			
			for(var key in timingData){
				timingData[key] = timingData[key] - performance.get('timing.navigationStart');
				if(timingData[key] <= 0)
					delete timingData[key];
			}
			
			var pageLoadTime = (performance.get('timing.loadEventEnd') || performance.get('timing.loadEventStart')) - performance.get('timing.navigationStart');
			if(pageLoadTime > 0) timingData['pageLoadTime'] = pageLoadTime;
			
			var NetworkLatency = performance.get('timing.responseEnd') - performance.get('timing.fetchStart');
			if(NetworkLatency >= 0) timingData['NetworkLatency'] = NetworkLatency;

			var statReportTime = performance.now;
			if(statReportTime > 0) timingData['statReportTime'] = statReportTime;

			if(mujsAPILoadStart > 0) timingData['mujsAPILoadStart'] = mujsAPILoadStart;
			if(mujsAPILoadEnd > 0) timingData['mujsAPILoadEnd'] = mujsAPILoadEnd;
			if(mujsAPILoadStart > 0 && mujsAPILoadEnd > 0 && (mujsAPILoadEnd - mujsAPILoadStart) > 0) timingData['mujsAPILoadTime'] = (mujsAPILoadEnd - mujsAPILoadStart);
		}
	} catch(e) {
		console.log('Error! getDOMTiming: ', e);
		return {};
	}
	return timingData;
};
	
	/***********************************
	 ** Update
	 **********************************/
	/**
	 * @namespace MUJS.Update
	 * @memberOf MUJS
	 * @since 0.0.14
	 * @example
	 * // foo
	 */
	MUJS.fn['Update'] = new function(){
		/**
		 * @callback UpdateCallback
		 * @memberof MUJS.Update
		 * @param {(object|string)} response The string or JSON object returned from the server
		 */
		/**
		 * Data used to send requests to the server.<br><i>Overrides settings stored in MUJS.Config.</i>
		 * @typedef {Object} UpdateData
		 * @type {object}
		 * @memberof MUJS.Update
		 * @see MUJS.Config
		 * @property {string} [script_name] - Name of script on myUserJS (Not needed if meta block contains a valid updateURL or MUJSupdateURL)
		 * @property {string} [username] - Script owner's username on myUserJS
		 * @property {UpdateCallback} [callback] - Function to be called with the server's response
		 * @property {string} [getType="data"] - Type of information you want returned from the server, and which partition to store the download/arguments under.
		 * @property {object} [args] - Arguments to be sent to myUserJS's statistical engine
		 * @property {boolean} [DOMTiming=false] - Generate and send page/script timing information to the server
		 * @property {boolean} [noDownload=false] - Do not record download when processing response (only used when reporting errors)
		 * @property {boolean} [XMLHttpRequest=false] - <font color="red">(Experimental)</font> Use XMLHttpRequest when sending request (only available to userscripts that load MUJS via require)
		 * @property {boolean} [jQuery=false] - <font color="red">(broken)</font>
		 * @example
		 * var opts = {
		 *     callback: myCBFunction,
		 *     getType: 'data',
		 *     args: {
		 *         scriptLoadTime: 1234
		 *     }
		 * }
		 * console.log(MUJS.Update.getURL(opts));
		 */
	
		var combineOptions = function(){
			var args = Array.prototype.slice.call(arguments, 0);
			var output = merge.apply(merge, args);
			output.script_info = MUJS.config('script.script_info');
			
			if(typeof MUJS.config('script.script_file_info') !== "undefined")
				output.script_file_info = MUJS.config('script.script_file_info');
			return output;
		}
		
		this.getJSON = function(url, data){
			$.ajax({
				dataType: "jsonp",
				url: url + '&json=1',
				async: true
				/*
				success: function(result, e){
					unsafeWindow[MUJS.Config.Update.updateVeriableName] = result;
					MUJS.UPDATE.execCallback(data, result);
				}
				*/
			})
			.done(function(result) {
				unsafeWindow[MUJS.Config.Update.updateVeriableName] = result;
				MUJS.UPDATE.execCallback(data, result);
			})
			.fail(function(e) {
				MUJS.UPDATE.execCallback(data, undefined, "error", e);
			});
		}
		
		this.getXMLHttpRequest = function(url, data){
			try{
				if(GM_xmlhttpRequest){
					GM_xmlhttpRequest({
						method: "GET", url: url,
						headers: {"Accept": "application/javascript"},
						onload: function(response){
							var responseJSON = JSON.parse(response.responseText);
							MUJS.UPDATE.execCallback(data, responseJSON);
						},
						onerror: function(){
							console.log('Error! getXMLHttpRequest', response);
						}
					});
					return true;
				}
			} catch(e){
				console.log('Error! getXMLHttpRequest', e);
			}
			return false;
			
		}
		
		this.getCallbackFunction = function(data){
			//if(MUJS.config('scopeLock')){
				
			//} else {
				if(typeof data.callback === "string"){
					if(typeof unsafeWindow[data.callback] !== "undefined")
						return unsafeWindow[data.callback];
				} else if(typeof data.callback !== "undefined"){
					return data.callback;
				} else if(typeof MUJS.config('currentCallback') !== "undefined"){
					if(typeof MUJS.config('currentCallback') === "string"){
						return unsafeWindow[MUJS.config('currentCallback')];
					} else {
						return MUJS.config('currentCallback');
					}
				}
			//}
			return undefined;
		}
		
		this.execCallback = function(data, result){
			var args = Array.prototype.slice.call(arguments, 1);
			var safeArgs = mCloneInto(args, unsafeWindow, {
				cloneFunctions: true,
				wrapReflectors: true
			});
			var cb = this.getCallbackFunction(data);
			if(cb !== undefined) cb.apply(cb, safeArgs);
		}
		
		/**
		 * Generate the update URL
		 * @function getURL
		 * @memberof MUJS.Update
		 * @param {UpdateData} data Information used to generate the URL
		 */
		this.getURL = function(data){
			//try{
				//opts = merge({}, MUJS.Config.Update, data);
				opts = combineOptions({}, MUJS.Config.Update, data);
				if(opts.callback && typeof opts.callback === "string"){
					opts.callback_function = opts.callback;
				}
				
				var builder = URLBuilder(MUJS.config('host') || 'http://myuserjs.org');
				
				
				// Get Username
				var un = (opts.username || MUJS.config('script.username')).trim();
				if(typeof un === "undefined" || un == '') throw "No Username Provided";
				
				// Get Script Name
				var sn = (opts.script_name || MUJS.config('script.script_name')).trim();
				if(typeof sn === "undefined" || sn == '') throw "No Script Name Provided";
				
				// Get getType
				var gt = (opts.getType || MUJS.config('Update.getType'));
				if(gt != 'meta' && gt != 'metajs' && gt != 'data' && gt != "none")
					gt = 'data';
					
				// Get Default Args
				var args = opts.args;
				
				// DOM Timing
				if(opts.DOMTiming){
					var domTiming = MUJS.getDOMTiming();
					//if(MUJS.config('debug')) console.log('domTiming', domTiming);
					if(MUJS.config('debug')) MUJS.Log('domTiming', domTiming);
					for(var key in domTiming){
						if(domTiming.hasOwnProperty(key)) {
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
				builder.addArg('api_version', MUJS.version);
				
				builder.addArg('updateVeriableName', opts.updateVeriableName);
					
				if(typeof opts.callback_function !== "undefined")
					builder.addArg('jsonp', opts.callback_function);
				
				if(typeof opts.noDownload !== "undefined" && opts.noDownload == true){
					builder.addArg('nodownload', '1');
				} else {
					if(MUJS.config('Update.sampleRate') < 100){
						if(Math.floor((Math.random() * 100) + 1) > MUJS.config('Update.sampleRate')){
							builder.addArg('nodownload', '1');
						}
					}
				}
				
				if(MUJS.config('Update.getStats'))
					builder.addArg('getstats', '1');
				
				if(typeof opts.script_info !== "undefined"){
					if(typeof opts.script_info.version !== "undefined")
						builder.addArg('scriptversion', escape(opts.script_info.version));
					
					if(typeof opts.script_info.script_handler !== "undefined"){
						builder.addArg('scripthandler', escape(opts.script_info.script_handler));
						if(typeof opts.script_info.script_handler_version !== "undefined")
							builder.addArg('scripthandlerversion', escape(opts.script_info.script_handler_version));
					}
					/*
					opts.script_info.matched_rules = {
						count: 0,
						include: [],
						exclude: [],
						match: []
					};
					
					if(typeof opts.script_info.includes !== "undefined" && opts.script_info.includes.length > 0){
						for(var i = 0; i < opts.script_info.includes.length; i++){
							var rRegEx = new RegExp(opts.script_info.includes[i],'i');
							if(rRegEx.test(window.location.href)){
								opts.script_info.matched_rules.include.push(opts.script_info.includes[i]);
								opts.script_info.matched_rules.count++;
							}
						}
					}
					
					if(typeof opts.script_info.excludes !== "undefined" && opts.script_info.excludes.length > 0){
						for(var i = 0; i < opts.script_info.excludes.length; i++){
							var rRegEx = new RegExp(opts.script_info.excludes[i],'i');
							if(rRegEx.test(window.location.href)){
								opts.script_info.matched_rules.exclude.push(opts.script_info.excludes[i]);
								opts.script_info.matched_rules.count++;
							}
						}
					}
					
					if(typeof opts.script_info.matches !== "undefined" && opts.script_info.matches.length > 0){
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
				if(MUJS.config('debug')){
					URLArgs.push('firephp=1');
				}
				*/
				
				
				builder.addArg('cachebuster', Math.round(new Date().getTime() / 1000));
				//var protocol = (MUJS.configOption('secure') ? 'https://' : 'http://');
				var host = (MUJS.config('host') || 'myuserjs.org');
				builder.setPath('/script/' + un + '/' + sn + '.' + gt + '.js');
				
				//console.log('builder', builder.toString());
				return builder.toString();
				
			//}catch(e){
				//MUJS.Log('Error!', e);
				//return this.execCallback(data, undefined, e);
			//}
		}
		
		/**
		 * Send information to the server with the given data.<br>If a callback is provided, and <i>data</i>.<b>getType</b> != '<b>none</b>', it will be called with the server's response. See [UpdateCallback]{@link MUJS.Update.UpdateCallback}
		 * @function sendRequest
		 * @memberof MUJS.Update
		 * @param {UpdateData} data Information and arguments used to send request to the server
		 */
		this.sendRequest = function(data){
			try {
				//var mData = merge({}, MUJS.Config.Update, data);
				var mData = combineOptions({}, MUJS.Config.Update, data);
				
				if(typeof unsafeWindow[mData.updateVeriableName] !== "undefined"){
					unsafeWindow[mData.updateVeriableName] = undefined;
					delete unsafeWindow[mData.updateVeriableName];
				}
				
				if(MUJS('get', 'scopeLock') === true && typeof mData.callback !== "undefined" && mData['getType'] != 'none'){
					console.log('Add MUJSExtResponseCallback');
					MUJS.config('currentCallback', mData.callback);
					mData.callback = "MUJSExtResponseCallback";
				} else {
					MUJS.config('currentCallback', null);
				}
				
				
				var url = MUJS.UPDATE.getURL(mData);
				
				if(MUJS.config('debug')) MUJS.Log(url);
				
				var r;
				
				if(mData.XMLHttpRequest && (r = this.getXMLHttpRequest(url + '&json=1', mData))){
					
				} else {
					if(mData.jQuery){
						r = this.getJSON(url, mData);
					} else {
						r = MUJS.API.addScript(undefined, url, undefined, true);
					}
				}
				
				if(mData.callback && mData['getType'] != 'none'){
					//if(typeof mData.callback !== "string" && this.getCallbackFunction(mData) !== undefined){
					if(typeof mData.callback === "string" || this.getCallbackFunction(mData) !== undefined){
						// Do Nothing
					} else {
						if(true) MUJS.Debug('waitForResponse');
						MUJS.UPDATE.waitForResponse(mData);
					}
				}
				return r;
			}catch(e){
				console.log('Error! getUpdateData: ', e.name, e.fileName, e.lineNumber + ':' + e.columnNumber);
				console.log(e);
				//console.trace(e);
				return undefined;
			}
		}
		
		this.getUpdateData = function(data){
			return this.sendRequest(data);
		}
		
		this.waitForResponse = function(data, count){
			if(typeof count === "undefined") count = 0;
			
			if(typeof unsafeWindow[data.updateVeriableName] !== "undefined"){
				if(true) console.log('updateVeriable ready');
				return MUJS.UPDATE.execCallback(data, unsafeWindow[data.updateVeriableName], 'Success!');
			} else {
				if(count > 100) return MUJS.UPDATE.execCallback(data, undefined, 'Error! TimedOut');
				return setTimeout(MUJS.UPDATE.waitForResponse, 100, data, count + 1);
			}
		}
		
		this.extResponse = function(response){
			//console.log('extResponse', response);
			var args = Array.prototype.slice.call(arguments, 0);
			var cb = MUJS.UPDATE.getCallbackFunction({callback: MUJS.config('currentCallback')});
			if(typeof cb !== "undefined"){
				cb.apply(cb, args);
			} else {
				console.log('extResponse error! cant find cb');
			}
			//(MUJS.config('currentCallback')).apply(MUJS.config('currentCallback'), args);
		}
	}
	
	MUJS.fn['UPDATE'] = MUJS['Update'];
	
	mExportFunction(MUJS.UPDATE.extResponse, unsafeWindow, {
		defineAs: "MUJSExtResponseCallback",
		allowCallbacks: true,
		allowCrossOriginArguments: true
	});
	
	Object.defineProperty(MUJS.UPDATE, 'MetaData', {
		get: function(varName){
			if(typeof unsafeWindow[varName || MUJS.Config.Update.updateVeriableName] !== "undefined"){
				return unsafeWindow[varName || MUJS.Config.Update.updateVeriableName];
			} else if(typeof window[varName || MUJS.Config.Update.updateVeriableName] !== "undefined"){
				return window[varName || MUJS.Config.Update.updateVeriableName];
			}
			return undefined;
		}
	});
	
	/***********************************
	 ** Error
	 **********************************/
	//MUJS['ERROR'] = {
	MUJS.fn['ERROR'] = new function(){
	
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
					return MUJS.ERROR.ERROR_CODES.SearchForKey(key);
				} else {
					return MUJS.ERROR.ERROR_CODES.setKeyValue(key, value);
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
				if(MUJS.config('script.script_info.userscript_file_name') == stackInfo[0].fileName){
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
				var mData = merge({}, MUJS.Config.Update, data);
				
				if(typeof mData.args === "undefined")
					mData.args = {};
				
				if(typeof mData.args['scriptError'] === "undefined")
					mData.args['scriptError'] = '1';
				
				if(typeof mData.args['scriptErrorCode'] === "undefined")
					mData.args['scriptErrorCode'] = '-1';
				
				mData.getType = 'none';
				mData.noDownload = true;
				
				return MUJS['UPDATE']['sendRequest'](mData);
			} catch(e) {
				console.log('Error! Error.send: ', e);
				return undefined;
			}
		}
		
		this.catchError = function(message, url, linenumber, colNumber, eObj, stackInfo){
			try{
				//console.log('catchError', message, url, linenumber, colNumber, eObj.fileName);
				if(typeof eObj !== "undefined" && typeof eObj.stack !== "undefined"){
					//var stackInfo = MUJS['ERROR'].parseStack(eObj.stack);
					
					//console.log('catchError', message, url, linenumber, colNumber, stackInfo);
					//console.log('message', message);
					//console.log('eObj', eObj);
					//console.trace(eObj);
					var args = Array.prototype.slice.call(arguments, 0);
					if(MUJS.config('Error.autoReportErrors')){
						var filter = (MUJS.config('Error.errorFilter')).apply(this, args)
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
							
							//MUJS['ERROR']['send'](opts);
						}
					}
				}
			}catch(e){}
			
			//if(MUJS['ERROR']['origErrorHandler'])
				//return MUJS['ERROR']['origErrorHandler'].apply(this, args);
			return false;
		}
		
		this.processError = function(e){
			//console.log('e.stack', e.stack);
			//console.log('e.stack', MUJS['ERROR'].parseStack(e.stack));
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
			
			return MUJS['ERROR']['catchError'](e.message, e.fileName, e.lineNumber, e.columnNumber, data, MUJS.parseStack(tStack));
		}
		

	}
	
	//console.log('EVALERROR', MUJS['ERROR'].getCode('ERROR_NAME.EVALERROR'));
	//console.log('REFERENCEERROR', MUJS['ERROR'].getCode('ERROR_NAME.REFERENCEERROR'));
	//console.log('URIERROR', MUJS['ERROR'].getCode('ERROR_NAME.URIERROR'));
	
	function MUJSListenError(message, url, linenumber, colNumber, data) {
		console.log('MUJSListenError', message, url, linenumber, colNumber);
		//console.log('MUJSListenError data', data);
		//setTimeout(function(message, url, linenumber, colNumber, data){
			var tData = MUJS.parseStack(data.stack);
			if(tData.length > 0)
				return MUJS['ERROR']['catchError'](message, url, linenumber, colNumber, data, tData);
		//}, 1, message, url, linenumber, colNumber, data);
	}
	
	mExportFunction(MUJSListenError, unsafeWindow, {
		defineAs: "MUJSListenError",
		allowCallbacks: true,
		allowCrossOriginArguments: true
	});
	
	var onErrorFunction = function(){
		window.oldHandle = window.onerror;
		window.onerror = function(message, url, linenumber, colNumber, eObj){
			//console.log('tErrHandle', message, url, linenumber);
			try{
				var args = Array.prototype.slice.call(arguments, 0);
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
				if(MUJSListenError(message, url, linenumber, colNumber, data))
					return true;
			}catch(e){}
			finally {
				if(window.oldHandle)
					return window.oldHandle.apply(this, args);
				return false;
			}
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
	MUJS.API.contentEval(onErrorFunction);
	}, 1000);
	*/
	//setTimeout(MUJS.API.contentEval, 1000, onErrorFunction);

	/***********************************
	 ** Init
	 **********************************/
if(typeof GM_info !== "undefined"){
	MUJS.log.Debug('GM_info', GM_info);
	MUJS({
		'ginfo': GM_info,
		'has_GM_info': (typeof GM_info !== "undefined" ? true : false),
		'has_GM_getMetadata': (typeof GM_getMetadata !== "undefined" ? true : false)
	});
}

var totalCallCount = 0;

function tryInit(e){
	if(true) MUJS.log.count('Try Init');
	if(!MUJSRequire.DOMLoaded){
		if(['interactive', 'complete'].indexOf(document.readyState.toLowerCase()) != -1){
			MUJSRequire.DOMLoaded = true;
			if(true) MUJS.Debug('DOM Loaded - Begin Init');
		}
	}
	
	if(MUJSRequire.DOMLoaded){
		
		if(!MUJSRequire.onErrorFunctionAdded){
			MUJSRequire.onErrorFunctionAdded = true;
			MUJS.API.contentEval(onErrorFunction);
			setTimeout(function(){MUJS.Events.fire('onReady');},1);
		}
		
		if(!MUJSRequire.RequirementsAdded){
			MUJSRequire.RequirementsAdded = true;
			MUJS.Requirements.insertAll();
		}
		
		if(!MUJSRequire.CSSAdded){
			MUJSRequire.CSSAdded = true;
			MUJS.API.addStyle(_css);
			_css = '';
		}
		if(!MUJSRequire.notificationsInitialized){
			MUJSRequire.notificationsInitialized = true;
			//setTimeout(function(){
				MUJS.Notification.init();
			//},1);
		}
		if(!MUJSRequire.modalInitialized){
			MUJSRequire.modalInitialized = true;
			//setTimeout(function(){
				MUJS.Modal.init();
			//},1);
		}
		if(!MUJSRequire.documentComplete){
			if(document.readyState === "complete"){
				var pageLoadTime = 0;
				if(performance.available)
					pageLoadTime = (performance.get('timing.loadEventEnd') || performance.get('timing.loadEventStart')) - performance.get('timing.navigationStart');
				if(pageLoadTime > 0 || totalCallCount >= 250){
					MUJSRequire.documentComplete = true;
					MUJS['Events']['fire']('onPageReady');
				}
			} else if(totalCallCount >= 250){
				MUJSRequire.documentComplete = true;
				MUJS['Events']['fire']('onPageReady');
			}
		}
		if(MUJSRequire.documentComplete &&
			MUJSRequire.onErrorFunctionAdded &&
			MUJSRequire.notificationsInitialized &&
			MUJSRequire.modalInitialized
		){
			MUJSRequire.Complete = true;
			clearCheckTimer();
			if(true) MUJS.Debug('Init Complete - ' + totalCallCount + ' trys');
			console.timeEnd('MUJS API Finish Init');
		}

	}
	totalCallCount++;
}

// Before Script Exec Event
function BeforeScriptExec(e){
	MUJS.Events.fire.apply(MUJS.Events, ['beforescriptexecute'].concat(Array.prototype.slice.call(arguments)));
}
window.addEventListener('beforescriptexecute', BeforeScriptExec, false);

// After Script Exec Event
function AfterScriptExec(e){
	MUJS.Events.fire.apply(MUJS.Events, ['afterscriptexecute'].concat(Array.prototype.slice.call(arguments)));
}
window.addEventListener('afterscriptexecute', AfterScriptExec, false);

// Load Event
function onLoadEvent(e){
	if(true) MUJS.Debug('onLoadEvent', e);
	MUJS.Events.fire.apply(MUJS.Events, ['load'].concat(Array.prototype.slice.call(arguments)));
}
window.addEventListener('load', onLoadEvent, false);

// On ReadyState Change Event
document.onreadystatechange = function (e) {
	if(true) MUJS.Debug('onreadystatechange', document.readyState, e);
	if(!MUJSRequire.Complete)
		tryInit();
	MUJS.Events.fire.apply(MUJS.Events, ['onreadystatechange'].concat(Array.prototype.slice.call(arguments)));
}

// DOM Content Loaded Event
window.addEventListener('DOMContentLoaded', function(e){
	if(true) MUJS.Debug('DOMContentLoaded', e);
	if(!MUJSRequire.Complete)
		tryInit();
	MUJS.Events.fire.apply(MUJS.Events, ['DOMContentLoaded'].concat(Array.prototype.slice.call(arguments)));
}, false);

function checkTimer(){
	if(!MUJSRequire.Complete)
		tryInit();
	else
		clearCheckTimer();
}

function clearCheckTimer(){
	clearInterval(checkTimer);
}

setInterval(checkTimer, 50);

	
	var tOnBeforeCloseCB = function(a, b){
		console.log('tOnBeforeCloseCB', a, b);
	}
	
	var tOnAfterCloseCB = function(a, b){
		console.log('tOnAfterCloseCB', a, b);
	}
	
	setTimeout(function(){
		//console.log('MUJS.Notification Test');
		/*
		MUJS.Notification({
			'title': 'Anti-Pagination v0.0.14 Available!',
			'body': '<i class="fa fa-clock-o"></i> <i>2 hours ago...</i>',
			'footer': '<a class="btn btn-success btn-sm" href="javascript:void(0);" onClick="console.log(\'a btn click\');(arguments[0] || window.event).stopPropagation();return false;">Install</a>'+
						'<a class="btn btn-primary btn-sm" href="javascript:void(0);" target="_blank">Visit Page</a>'+
						'<a class="btn btn-danger btn-sm" href="javascript:void(0);">Close</a>',
			'icon': 'fa-download',
			'type': 'small',
			'onBeforeClose': tOnBeforeCloseCB,
			'onAfterClose': tOnAfterCloseCB
		});
		*/
		/*
		MUJS.Notification('UpdateNotification', {
			'version': '1.2.3',
			//'script_name': 'foo bar',
			'time': '123',
			'visit': {
				'onClick': function(e){
					console.log('Visit Clicked!!', e);
					//e.stopPropagation();
					//return false;
					eventCancel(e);
				}
			}
		});
		*/
		/*
		MUJS.Notification({
			'title': 'James Simmons liked your comment 2',
			'body': '<i class="fa fa-clock-o"></i> <i>66 seconds ago...</i>',
			'icon': 'fa-thumbs-up',
			'type': 'small',
			'background-color': 'rgb(199, 145, 33)'
		});
		
		MUJS.Notification({
			'title': 'James Simmons liked your comment 3',
			'body': '<i class="fa fa-clock-o"></i> <i>66 seconds ago...</i>',
			'icon': 'fa-thumbs-up',
			'type': 'small',
			'background-color': 'rgb(199, 145, 33)'
		});
		
		
		
		MUJS.Notification({
			'title': 'James Simmons liked your comment 3',
			'body': '<i class="fa fa-clock-o"></i> <i>99 seconds ago...</i>',
			'icon': 'fa-thumbs-up',
			'type': 'small',
			'background-color': 'rgb(199, 145, 33)'
		});
		*/
		/*
		console.log('MUJS.Modal Test');
		var testModal1 = MUJS.Modal({
			title: 'foo',
			body: 'Body text',
			buttons: [
				{
					text: 'custom button',
					className: 'btn btn-warning',
					EventListeners: {
						click: function(){
							console.log('custom button click');
						}
					}
				}
			],
			onBeforeHide: function(modal, modalNum, triggerEvent){
				console.log('onBeforeHide CB:', modal, modalNum, triggerEvent);
				setTimeout(function(modalNum){
					MUJS.Modal.show(modalNum);
				}, 2500, modalNum);
			}
		});
		
		var testModal2 = MUJS.Modal({
			title: 'bar',
			buttons: [
				{
					text: 'custom button2',
					className: 'btn btn-warning',
					EventListeners: {
						click: function(){
							console.log('custom button2 click');
						}
					}
				}
			],
			onBeforeHide: function(modal, modalNum, triggerEvent){
				console.log('onBeforeHide CB2:', modal, modalNum, triggerEvent);
			}
		}, false);
		*/
		/*
		setTimeout(function(testModal2){
			MUJS.Modal('show', testModal2);
		}, 2500, testModal2);
		
		setTimeout(function(testModal1){
			MUJS.Modal('show', testModal1);
		}, 5000, testModal1);
		*/
	},1000);
	
	if(performance.available)
		mujsAPILoadEnd = performance.now;
	
	if(true)
		setTimeout(function(){MUJS.log.endGroup('MUJS API Initialize');}, 50);
})(MUJS, (typeof jQuery !== "undefined" ? jQuery : undefined)); unsafeWindow['MUJS'] = MUJS;
if(true && typeof console !== "undefined" && typeof console.timeEnd !== "undefined") console.timeEnd('MUJS API Loading');
