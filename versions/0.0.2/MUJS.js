if(typeof unsafeWindow === "undefined") unsafeWindow = window;
if(typeof unsafeWindow['MUJS'] === "undefined") unsafeWindow['MUJS'] = new function(){ this['fn'] = this.__proto__; };

(function(MUJS, $){
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
		
	if (!Array.prototype.pushArray){
		Object.defineProperty(Array.prototype, 'pushArray', {
			value: function(arr){
				if(typeof arr !== "undefined"){
					for (var i = 0; i < arr.length; i++)
						this.push(arr[i]);
				}
				return this;
			},
			enumerable: false
		});
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
		if(isFirebug(console)) return console;
		if(isFirebug(this.console)) return this.console;
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
				var args = Array.prototype.slice.call(arguments, 1);
				if(typeof this.Firebug_ptr !== "undefined" && typeof this.Firebug_ptr[command] !== "undefined")
					this.Firebug_ptr[command].apply(this.Firebug_ptr, args);
				
				if(typeof this.Console2_ptr !== "undefined" && typeof this.Console2_ptr[command] !== "undefined")
					this.Console2_ptr[command].apply(this.Console2_ptr, args);
				
				if(typeof this.WebConsole_ptr !== "undefined" && typeof this.WebConsole_ptr[command] !== "undefined")
					this.WebConsole_ptr[command].apply(this.WebConsole_ptr, args);
			},
			
			'outputMessage': function(output_type, str){
				if(output_type.level <= MUJS.config('API.log.verbosity_level'))
					this.ConsoleCommand.apply(this, [output_type.value].pushArray(Array.prototype.slice.call(arguments, 1)));
			},
			
			'Error': function(category, x){
				this['outputMessage'].apply(this, [OUTPUT_TYPES['ERROR'], "C.CE Error (" + category + ") - " +  x.name + ' - ' + x.message + ' in file <' + x.fileName + '> on line ' + x.lineNumber]);
			},
			
			'logError': this['Error'],
			
			'Warning': function(str){this['outputMessage'].apply(this, [OUTPUT_TYPES['WARNING']].pushArray(Array.prototype.slice.call(arguments, 0)));},
			
			'Info': function(str){this['outputMessage'].apply(this, [OUTPUT_TYPES['INFO']].pushArray(Array.prototype.slice.call(arguments, 0)));},
			
			'Log': function(str){this['outputMessage'].apply(this, [OUTPUT_TYPES['LOG']].pushArray(Array.prototype.slice.call(arguments, 0)));},
			
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
		'Error'
	];
	
	// Default Values
	MUJS['Config'] = /** @dict */ {
		'host': 'http://myuserjs.org',
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
			'getStats': false
			/*
			 * getType:
			 *     meta
			 *     metajs
			 *     data
			 */
		},
		'API': {
			'log': {
				'disabled_functions': [], // API.log.disabled_functions
				'hidden_classes': [], // API.log.hidden_classes
				'verbosity_level': 5 // API.log.verbosity_level
			},
			'localStorage': {
				'storage_prefix': 'MUJS_', // API.localStorage.storage_prefix
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
	
	
	MUJS['API'] = {
		MUJS_Log: new MUJS_Log(getFB(), getC2(), getWC())
	};
	
	MUJS.log = MUJS.API.MUJS_Log;
	MUJS.log.UpdateAllPtrs = UpdateAllPtrs;
	
	for(var i = 0; i < MUJS_Log_Functions.length; i++){
		MUJS[MUJS_Log_Functions[i]] = (MUJS.API.MUJS_Log[MUJS_Log_Functions[i]]).bind(MUJS.API.MUJS_Log);
	}
	
	if(MUJS.config('debug')) MUJS.Log('MUJS.Config', MUJS.Config);
	
	//MUJS.Log('foo', MUJS.Config);
	/***********************************
	 ** End Log
	 **********************************/
	

	

	 
	/***********************************
	 ** Add Style
	 **********************************/
		 
		/**
		 * Adds given css to the the page.
		 * @param {string} css The CSS to be added to the document.
		 */
		MUJS.API.addStyle = function(css){
			if (typeof css != "undefined" && css != '') {
				if(heads = document.getElementsByTagName('head')) {
					var style = document.createElement('style');
					try {
						style.innerHTML = css;
					} catch (x) {
						style.innerText = css;
					}
					style.type = 'text/css';
					heads[0].appendChild(style);
				}
			}
			return null;
		}
	/***********************************
	 ** End Add Style
	 **********************************/
	 
	 
	 
	/***********************************
	 ** Add Script
	 **********************************/
		 
		/**
		 * Adds given js to the the page.
		 * @param {string} js The js to be added to the document.
		 * @param {string} src The src for the script tag.
		 * @param {string} id The id for the script tag.
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
				try{heads[0].appendChild(newScript);}catch(x){}
			}
			return null;
		}

	/***********************************
	 ** End Add Script
	 **********************************/
	 
	 
	 
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
	 ** End LocalStorage
	 **********************************/
	 
	 
	 
	 
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
	 ** End Parse Meta Data
	 **********************************/

	 
	
	MUJS.fn.getDOMTiming = function(){
		var timingData = {};
		try {
			if(typeof window.performance !== "undefined" && typeof window.performance.timing !== "undefined"){
				var ignore = ['unloadEventStart', 'unloadEventEnd', 'navigationStart'];
				
				for(var key in window.performance.timing){
					if(!isNaN(window.performance.timing[key]) && ignore.indexOf(key) == -1){
						timingData[key] = parseInt(window.performance.timing[key]);
					}
				}
				
				for(var key in timingData){
					timingData[key] = timingData[key] - window.performance.timing.navigationStart;
					if(timingData[key] <= 0)
						delete timingData[key];
				}
				
				var pageLoadTime = (window.performance.timing.loadEventEnd || window.performance.timing.loadEventStart) - window.performance.timing.navigationStart;
				//if(pageLoadTime > 0) r['pageLoadTime'] = pageLoadTime;
				if(pageLoadTime > 0) timingData['pageLoadTime'] = pageLoadTime;
				
				var NetworkLatency = window.performance.timing.responseEnd - window.performance.timing.fetchStart;
				//if(NetworkLatency >= 0) r['NetworkLatency'] = NetworkLatency;
				if(NetworkLatency >= 0) timingData['NetworkLatency'] = NetworkLatency;

				var statReportTime = window.performance.now();
				if(statReportTime > 0) timingData['statReportTime'] = statReportTime;
				
				//console.log('timingData', timingData);
			}
		} catch(e) {
			console.log('Error! getDOMTiming: ', e);
			return {};
		}
		//return r;
		return timingData;
	};
	
	/***********************************
	 ** Update
	 **********************************/
	MUJS['UPDATE'] = {
		
		'getJSON': function(url, data){
			$.ajax({
				dataType: "json",
				url: url + '&json=1',
				async: true,
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
		},
		
		'getCallbackFunction': function(data){
			if(typeof data.callback === "string"){
				if(typeof unsafeWindow[data.callback] !== "undefined")
					return unsafeWindow[data.callback];
			} else {
				return data.callback;
			}
			return undefined;
		},
		
		'execCallback': function(data){
			var args = Array.prototype.slice.call(arguments, 1);
			var cb = this.getCallbackFunction(data);
			if(cb !== undefined) cb.apply(cb.callback, args);
		},
		
		'getUpdateURL': function(data){
			if(data.callback && typeof data.callback === "string"){
				data.callback_function = data.callback;
			}
			
			opts = merge({}, MUJS.Config.Update, data);
			
			// Get Username
			var un = (opts.username || MUJS.config('script.username'));
			if(typeof un === "undefined" || un == '') return this.execCallback(data, undefined, 'Error! No Username Provided');
			
			// Get Script Name
			var sn = (opts.script_name || MUJS.config('script.script_name'));
			if(typeof sn === "undefined" || sn == '') return this.execCallback(data, undefined, 'Error! No Username Provided');
			
			// Get getType
			var gt = (opts.getType || MUJS.config('Update.getType'));
			if(gt != 'meta' && gt != 'metajs' && gt != 'data' && gt != "none")
				gt = 'data';
			
			// Get Default Args
			var args = opts.args;
			
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
			
			var args_arr = [];
			for(var key in args){
				args_arr.push(key + '=' + args[key]);
			}
			
			var args_str = 'args=' + escape(args_arr.join(',')) + '&updateVeriableName=' + opts.updateVeriableName;
			if(typeof opts.callback_function !== "undefined"){
				args_str += '&jsonp=' + opts.callback_function;
			}
			
			if(typeof opts.noDownload !== "undefined" && opts.noDownload == true){
				args_str += '&nodownload=1';
			}
			
			if(MUJS.config('Update.getStats')){
				args_str += '&getstats=1'
			}
			
			
			
			if(MUJS.config('debug')){
				args_str += '&firephp=1'
			}
			
			
			
			args_str += '&cachebuster=' + Math.round(new Date().getTime() / 1000);
			//var protocol = (MUJS.configOption('secure') ? 'https://' : 'http://');
			var host = (MUJS.config('host') || 'myuserjs.org');
			return host + '/script/' + un + '/' + sn + '.' + gt + '.js' + '?' + args_str;
		},
		
		'getUpdateData': function(data){
			try {
				var mData = merge({}, MUJS.Config.Update, data);
				
				if(typeof unsafeWindow[mData.updateVeriableName] !== "undefined"){
					unsafeWindow[mData.updateVeriableName] = undefined;
					delete unsafeWindow[mData.updateVeriableName];
				}
				
				
				
				var url = MUJS.UPDATE.getUpdateURL(mData);
				//if(MUJS.config('debug')) console.log(url);
				if(MUJS.config('debug')) MUJS.Log(url);
				var tmp;
				if(MUJS.config('Update.jQuery')){
					tmp = this.getJSON(url, mData);
				} else {
					/*
					tmp = MUJS.addScriptTag({
						'src': url
					}, mData);
					*/
					MUJS.API.addScript(undefined, url, undefined, true);
				}
				//if(data.callback && typeof data.callback !== "string"){
				if(mData.callback){
					if(typeof mData.callback === "string" && this.getCallbackFunction(mData) !== undefined){
						// Do Nothing
					} else {
						MUJS.UPDATE.waitForUpdateData(mData);
					}
				}
				return tmp;
			} catch(e) {
				console.log('Error! getUpdateData: ', e);
				return undefined;
			}
		},
		
		'waitForUpdateData': function(data, count){
			if(typeof count === "undefined") count = 0;
			
			if(typeof unsafeWindow[data.updateVeriableName] !== "undefined"){
				return MUJS.UPDATE.execCallback(data, unsafeWindow[data.updateVeriableName], 'Success!');
			} else {
				if(count > 100) return MUJS.UPDATE.execCallback(data, undefined, 'Error! TimedOut');
				return setTimeout(MUJS.UPDATE.waitForUpdateData, 50, data, count + 1);
			}
		}
	};
	
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
	 ** End update
	 **********************************/


	
	/***********************************
	 ** Error
	 **********************************/
	MUJS['ERROR'] = {
		'send': function(data){
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
				
				return MUJS['UPDATE']['getUpdateData'](mData);
			} catch(e) {
				console.log('Error! Error.send: ', e);
				return undefined;
			}
		}
	}
	/***********************************
	 ** End Error
	 **********************************/

	
	
	

})(unsafeWindow['MUJS'], (typeof jQuery !== "undefined" ? jQuery : undefined));
MUJS = unsafeWindow['MUJS'];