// +@display_name  Proto
// +@replace  MUJS.CLASSES_AND_PROTOTYPES
// +@history (0.0.9) History begins.

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
			cloneInto(obj, scope, args);
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
	