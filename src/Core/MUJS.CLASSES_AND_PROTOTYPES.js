// +@display_name  Proto
// +@replace  MUJS.CLASSES_AND_PROTOTYPES
// +@history (0.0.9) History begins.
// +@history (0.0.13) Fixed mCloneInto return value.
// +@history (0.0.14) Added URLBuilder Class.
	
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
	