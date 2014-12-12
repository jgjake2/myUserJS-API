// ==UserScript==
// @name             MUJS
// @namespace        http://myuserjs.org/
// @author           jgjake2
// @homepage         http://myuserjs.org/
// @include          *
// @version          0.0.13
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
// @run-at document-start
// ==/UserScript==

if(typeof unsafeWindow === "undefined") unsafeWindow = window;
MUJS = function(arg1, arg2){return MUJS.init.apply(MUJS, Array.prototype.slice.call(arguments, 0));};
Object.defineProperties(MUJS, {
	"version": {configurable:false,get:function() { return '0.0.13'; }},
	"build_time": {configurable:false,get:function() { return '1418442129000'; }},
	"fn": {value: MUJS.__proto__},
	"API": {value: function(){
		return MUJS.API.EvalCommand.apply(MUJS.API, Array.prototype.slice.call(arguments, 0));
	}}
});
/*
MUJS.__defineGetter__("version", function() { return '0.0.13'; });
MUJS.__defineGetter__("build_time", function() { return '1418442129000'; });*/
//MUJS['fn']=MUJS.__proto__;
//MUJS['API']=new function(){this['fn']=this.__proto__;};
MUJS['API']['fn']=MUJS['API'].__proto__;

(function(MUJS, $){
	var mujsAPILoadStart = -1;
	var mujsAPILoadEnd = -1;
	if(typeof unsafeWindow.performance !== "undefined" && typeof unsafeWindow.performance.timing !== "undefined")
		mujsAPILoadStart = unsafeWindow.performance.now();
		

	
	MUJS.fn.init = function(){
		var args = Array.prototype.slice.call(arguments, 0);
		try{
			if(args.length > 0){
				
				// Commands
				if(typeof args[0] === "string"){
					if(args[0] == 'get')
						return MUJS.config(args[1]);
						
					if(args[0] == 'set')
						return MUJS.config(args[1], args[2]);
					
				} else if(typeof args[0] === "object") {
					// GM_info object
					if(typeof args[0]['GM_info'] !== "undefined" || typeof args[0]['ginfo'] !== "undefined"){
						return MUJS.setScriptInfo.apply(MUJS, args);
					}
				
				}

				
			}
		}catch(e){}
	}
		
	if(console) console.log('Loading MUJS API v' + MUJS.version + ' - ' + (new Date(parseInt(MUJS.build_time))).toString());
	//if(console) console.log('GM_info', GM_info);
	
	
	var URLBuilder = function(input){
		
		var r = {
			protocol: 'http:',
			hostname: '',
			pathname: '',
			
			args: [],
			
			setHostname: function(str){
				var parser = document.createElement('a');
				if(!/https?\:\/\//i.test(str))
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

	/***********************************
	 ** Functions/Classes/Prototypes
	 **********************************/
	
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
	
	function RealTypeOf(obj){
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
			if(obj.hasOwnProperty(key)) {
				temp[key] = clone(obj[key]);
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
				if(typeof objOut[key] === "undefined" || obj2[key] == null || typeof(obj2[key]) != 'object'){
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
	

	/***********************************
	 ** Default Config Values
	 **********************************/
	// Default Values
	MUJS['Config'] = /** @dict */ {
		'host': 'http://myuserjs.org',
		'scopeLock': (typeof exportFunction === "undefined" ? false : true),
		'secure': false,
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
				'verbosity_level': 5 // API.log.verbosity_level
			},
			'localStorage': {
				'storage_prefix': 'MUJS_' // API.localStorage.storage_prefix
			}
		},
		'debug': false
	};
	
	Object.defineProperties(MUJS.Config, props);
	
	
	if(typeof unsafeWindow['MUJS_CONFIGURATION'] !== "undefined"){
		MUJS.Config = merge(MUJS.Config, unsafeWindow['MUJS_CONFIGURATION']);
	}
	
	if(typeof unsafeWindow['MUJS_UPDATE_CONFIGURATION'] !== "undefined"){
		MUJS.Config.Update = merge(MUJS.Config.Update, unsafeWindow['MUJS_UPDATE_CONFIGURATION']);
	}
	
	Object.defineProperties(MUJS.Config, props);
	
	Object.defineProperty(MUJS, "config", {
		value: function(key, value){
			if(typeof value === "undefined"){
				return MUJS.Config.SearchForKey(key);
			} else {
				return MUJS.Config.setKeyValue(key, value);
			}
		},
		enumerable: false
	});

	
	/***********************************
	 ** Events
	 **********************************/
	
	MUJS['events'] = {
		'e': {},
		'fired': {},
		'addEvent': function(name){
			this.e[name] = [];
			Object.defineProperty(MUJS, name, new (function(propName){return {set: function(callback){MUJS['events']['addListener'](propName, callback);},enumerable: false};})(name));
		},
		'addListener': function(name, callback){
			if(typeof this.fired[name] === "undefined"){
				this.e[name].push(callback);
			} else {
				callback.apply(MUJS, this.fired[name]);
			}
		},
		'fire': function(name){
			var args = Array.prototype.slice.call(arguments, 1);
			this.fired[name] = args;
			if(typeof this.e[name] !== "undefined"){
				var putBack = [];
				while( i = this.e[name].pop() ) {
					if(!i.apply(null, args))
						putBack.push(i);
				}
				this.e[name] = putBack;
			}
		}
	};
	
	MUJS['events']['addEvent']('onReady');
	MUJS['events']['addEvent']('onPageReady');

	/***********************************
	 ** Get Script Info
	 **********************************/
	MUJS.fn.getScriptURLInfo = function(str){
		var patt = /myuserjs\.org\/script\/([^\/]+)\/([^\s]+)\.(user|meta|metajs|data)\.js/i;
		
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

	MUJS.fn.setScriptInfo = function(data){
		var callerScriptInfo;
		var output = {};
		try{var genErrorVariable = genErrorFunction(genErrorArg);} catch(e){
			//console.log(e.stack);
			var tStack = MUJS.ERROR.parseStack(e.stack.toString());
			//console.log('tStack', tStack);
			if(tStack.length > 0){
				for(var i = tStack.length - 1; i >= 0; i--){
					if(tStack[i].fileName != '' && tStack[i].fileExt.toLowerCase() == 'user.js'){
						callerScriptInfo = tStack[i];
						output.userscript_file_name = callerScriptInfo.fileName;
						output.userscript_file_path = callerScriptInfo.fullFileName;
						break;
					}
				}
			}
		};
		
		try{
			var tGM_info;
			
			if(typeof data.GM_info !== "undefined")
				tGM_info = data.GM_info;
			else if(typeof data.ginfo !== "undefined")
				tGM_info = data.ginfo;
			
			if(typeof tGM_info !== "undefined"){
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
				
				var pMetaData = MUJS.API.ParseMetaData(tGM_info.scriptMetaStr);
				
				//console.log('pMetaData', pMetaData);
				
				var urlInfo;
				if(
					(typeof pMetaData['downloadURL'] !== "undefined" && (urlInfo = MUJS.getScriptURLInfo(pMetaData['downloadURL'])))
					|| (typeof pMetaData['updateURL'] !== "undefined" && (urlInfo = MUJS.getScriptURLInfo(pMetaData['updateURL'])))
					|| (typeof pMetaData['MUJSdownloadURL'] !== "undefined" && (urlInfo = MUJS.getScriptURLInfo(pMetaData['MUJSdownloadURL'])))
					|| (typeof pMetaData['MUJSupdateURL'] !== "undefined" && (urlInfo = MUJS.getScriptURLInfo(pMetaData['MUJSupdateURL'])))
				){
					//console.log('urlInfo', urlInfo);
					MUJS('set', 'script.username', urlInfo.username);
					MUJS('set', 'script.script_name', urlInfo.script_name);
					if(['meta', 'metajs', 'data'].indexOf(urlInfo.get_type.toLowerCase()) != -1){
						MUJS('set', 'script.script_name', urlInfo.script_name);
					}
				} else {
					if(typeof pMetaData['MUJSusername'] !== "undefined")
						MUJS('set', 'script.username', pMetaData['MUJSusername']);
					else if(typeof pMetaData['MUJS_username'] !== "undefined")
						MUJS('set', 'script.username', pMetaData['MUJS_username']);
						
					if(typeof pMetaData['MUJSscriptname'] !== "undefined")
						MUJS('set', 'script.username', pMetaData['MUJSscriptname']);
					else if(typeof pMetaData['MUJS_script_name'] !== "undefined")
						MUJS('set', 'script.username', pMetaData['MUJS_script_name']);
				}
				
				
				
			}
			
			
		}catch(e){}
		
		Object.defineProperty(MUJS.Config.Update, 'script_info', {
			value: Object.freeze(output),
			writable: false,
			enumerable: true,
			configurable: false
		});
		
		//console.log('stored script_info', MUJS.Config.Update.script_info);
		//console.log('stored script_info2', MUJS.config('Update.script_info'));
		
		return Object.freeze(output);
	};
	
	MUJS.fn.getScriptInfo = function(data){
		if(typeof MUJS.config('Update.script_info') === "undefined"){
			MUJS.setScriptInfo(data);
		}
		return MUJS.config('Update.script_info');
	}
	

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
	 ** Log
	 **********************************/
	var OUTPUT_TYPES = {
		'ERROR':	{level: 1,	value: 'error'	},
		'WARNING':	{level: 2,	value: 'warn'	},
		'INFO':		{level: 3,	value: 'info'	},
		'LOG':		{level: 4,	value: 'log'	},
		'DEBUG':	{level: 5,	value: 'debug'	}
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
		if(isFirebug(this.console)) return this.console;
		if(isFirebug(console)) return console;
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
				else if(typeof GM_log !== "undefined" && isWebConsole(GM_log) && ['debug', 'log', 'info', 'warning', 'error'].indexOf(command.toLowerCase()) != -1){
					// Cannot use function.apply on GM_log
					if(args.length == 1) GM_log(args[0]);
					else if(args.length == 2) GM_log(args[0], args[1]);
					else if(args.length == 3) GM_log(args[0], args[1], args[2]);
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
				this['outputMessage'].apply(this, [OUTPUT_TYPES['ERROR'], "C.CE Error (" + category + ") - " +  x.name + ' - ' + x.message + ' in file <' + x.fileName + '> on line ' + x.lineNumber]);
			},
			
			'logError': this['Error'],
			
			'Warning': function(str){this['outputMessage'].apply(this, [OUTPUT_TYPES['WARNING']].concat(Array.prototype.slice.call(arguments, 0)));},
			
			'Info': function(str){this['outputMessage'].apply(this, [OUTPUT_TYPES['INFO']].concat(Array.prototype.slice.call(arguments, 0)));},
			
			'Log': function(str){this['outputMessage'].apply(this, [OUTPUT_TYPES['LOG']].concat(Array.prototype.slice.call(arguments, 0)));},
			
			'Debug': function(str){this['outputMessage'](OUTPUT_TYPES['DEBUG'], str);},
			
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
				var args = Array.prototype.slice.call(arguments, 0);
				args.unshift('assert');
				if(MUJS.config('API.log.disabled_functions').indexOf('assert') == -1)
					this.ConsoleCommand.apply(this, args);
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
				var args = Array.prototype.slice.call(arguments, 0);
				args.unshift('profile');
				if(MUJS.config('API.log.disabled_functions').indexOf('profile') == -1 && MUJS.config('API.log.disabled_functions').indexOf('profileEnd') == -1)
					this.ConsoleCommand.apply(this, args);
			},
			
			'profileEnd': function(){
				var args = Array.prototype.slice.call(arguments, 0);
				args.unshift('profileEnd');
				if(MUJS.config('API.log.disabled_functions').indexOf('profile') == -1 && MUJS.config('API.log.disabled_functions').indexOf('profileEnd') == -1)
					this.ConsoleCommand.apply(this, args);
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
		if(GM_addStyle){
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

	/*
	var compareVersions = function(v1, v2){
		if(versionString.indexOf('.') == -1){
			return parseInt(versionString);
		} else {
			var versionParts = versionString.split('.');
			while(versionParts.length < 4)
				versionParts.push('0')
			var vStr = '';
			//for(var part in versionParts){
			for(var part = 0; part < versionParts.length; part++){
				console.log('part', versionParts[part]);
				if(versionParts[part].length > 4)
					versionParts[part] = versionParts[part].substr(0,4)
				vStr += versionParts[part].lpad('0', 4);
			}
			console.log('vStr', vStr);
			return parseInt(vStr);
		}
	}
	*/
	/***********************************
	 ** Update
	 **********************************/
	//MUJS['UPDATE'] = new function(){
	MUJS.fn['UPDATE'] = new function(){
		
		var combineOptions = function(){
			var args = Array.prototype.slice.call(arguments, 0);
			
			//opts = merge({}, MUJS.Config.Update, data);
			var output = merge.apply(merge, args);
			if(typeof output.Update !== "undefined" && typeof output.Update.script_info !== "undefined")
				output.Update.script_info = MUJS.config('Update.script_info');
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
			var cb = this.getCallbackFunction(data);
			if(cb !== undefined) cb.apply(cb.callback, args);
		}
		
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
		
		this.sendRequest = function(data){
			try {
				//var mData = merge({}, MUJS.Config.Update, data);
				var mData = combineOptions({}, MUJS.Config.Update, data);
				
				if(typeof unsafeWindow[mData.updateVeriableName] !== "undefined"){
					unsafeWindow[mData.updateVeriableName] = undefined;
					delete unsafeWindow[mData.updateVeriableName];
				}
				
				if(MUJS.config('scopeLock') && mData.callback && mData['getType'] != 'none'){
					MUJS.config('currentCallback', mData.callback);
					mData.callback = "MUJSExtResponseCallback";
				} else {
					MUJS.config('currentCallback', null);
				}
				
				var url = MUJS.UPDATE.getURL(mData);
				
				if(MUJS.config('debug')) MUJS.Log(url);
				
				var r;
				//if(MUJS.config('Update.jQuery')){
				

				if(mData.XMLHttpRequest){
					r = this.getXMLHttpRequest(url, mData);
				}
				
				if(!r && mData.jQuery){
					r = this.getJSON(url, mData);
				} else {
					r = MUJS.API.addScript(undefined, url, undefined, true);
				}
				

				
				if(mData.callback && mData['getType'] != 'none'){
					if(typeof mData.callback === "string" && this.getCallbackFunction(mData) !== undefined){
						// Do Nothing
					} else {
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
				console.log('updateVeriable ready');
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
				if(MUJS.config('Update.script_info.userscript_file_name') == stackInfo[0].fileName){
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
			
			return MUJS['ERROR']['catchError'](e.message, e.fileName, e.lineNumber, e.columnNumber, data, MUJS['ERROR'].parseStack(tStack));
		}
		
		this.parseStack = function(stackText){
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
	}
	
	//console.log('EVALERROR', MUJS['ERROR'].getCode('ERROR_NAME.EVALERROR'));
	//console.log('REFERENCEERROR', MUJS['ERROR'].getCode('ERROR_NAME.REFERENCEERROR'));
	//console.log('URIERROR', MUJS['ERROR'].getCode('ERROR_NAME.URIERROR'));
	
	function MUJSListenError(message, url, linenumber, colNumber, data) {
		console.log('MUJSListenError', message, url, linenumber, colNumber);
		//console.log('MUJSListenError data', data);
		//setTimeout(function(message, url, linenumber, colNumber, data){
			var tData = MUJS['ERROR']['parseStack'](data.stack);
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

	var MUJSRequire = {
		DOMLoaded: false,
		documentComplete: false,
		onErrorFunctionAdded: false,
		Complete: false,
		scriptExecCount: 0,
		manualCallCount: 0
	};
	function RemoveEventListener_BeforeScriptExec(){window.removeEventListener('beforescriptexecute', BeforeScriptExec, true);};
	function BeforeScriptExec(e){
		//try{
			if(!MUJSRequire.DOMLoaded){
				if(document.readyState != "uninitialized" && document.readyState != "loading")
					MUJSRequire.DOMLoaded = true;
			} else if(!MUJSRequire.onErrorFunctionAdded){
				MUJSRequire.onErrorFunctionAdded = true;
				setTimeout(function(){
					MUJS.API.contentEval(onErrorFunction);
					MUJS['events']['fire']('onReady');
				},1);
			} else if(!MUJSRequire.documentComplete){
				if(document.readyState === "complete" && typeof unsafeWindow.performance !== "undefined" && typeof unsafeWindow.performance.timing !== "undefined"){
					var pageLoadTime = (unsafeWindow.performance.timing.loadEventEnd || unsafeWindow.performance.timing.loadEventStart) - unsafeWindow.performance.timing.navigationStart;
					if(pageLoadTime > 0 || MUJSRequire.scriptExecCount + MUJSRequire.manualCallCount >= 50){
						MUJSRequire.documentComplete = true;
						MUJS['events']['fire']('onPageReady');
					}
				} else if(MUJSRequire.scriptExecCount + MUJSRequire.manualCallCount >= 50){
					MUJSRequire.documentComplete = true;
					MUJS['events']['fire']('onPageReady');
				}
			} else {
				MUJSRequire.Complete = true;
				clearCheckTimer();
				RemoveEventListener_BeforeScriptExec();
			}
			if(typeof e !== "undefined")
				MUJSRequire.scriptExecCount++;
			else
				MUJSRequire.manualCallCount++;
		//}catch(e){
			//console.log('MUJS ERROR! BeforeScriptExec ', e);
		//}
	}
	window.addEventListener('beforescriptexecute', BeforeScriptExec, true);
	
	function checkTimer(){
		var currentTime = performance.now;
		if(!MUJSRequire.Complete){
			BeforeScriptExec();
		} else {
			RemoveEventListener_BeforeScriptExec();
			clearCheckTimer();
		}
		
	}
	
	function clearCheckTimer(){
		clearInterval(checkTimer);
	}
	
	setInterval(checkTimer, 100);
	
	if(typeof GM_info !== "undefined"){
		MUJS({
			'ginfo': GM_info,
			'has_GM_info': (typeof GM_info !== "undefined" ? true : false),
			'has_GM_getMetadata': (typeof GM_getMetadata !== "undefined" ? true : false)
		});
	}
	
	if(performance.available)
		mujsAPILoadEnd = performance.now;
		
	//console.log('mujsAPILoadStart: ', mujsAPILoadStart, ' -- mujsAPILoadEnd: ', mujsAPILoadEnd);
})(MUJS, (typeof jQuery !== "undefined" ? jQuery : undefined));
unsafeWindow['MUJS'] = MUJS;
