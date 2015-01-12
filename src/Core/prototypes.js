// +@display_name  Proto
// +@history (0.0.9) History begins.
// +@history (0.0.13) Fixed mCloneInto return value.
// +@history (0.0.14) Added URLBuilder Class.
// +@history (0.0.14) Updated URLBuilder so instanceof can be used.
// +@history (0.0.15) Added jMod.Extend.
	
	// URL Builder Class
	RequireScript('Core.URLBuilder');
	
	// Versions Class
	RequireScript('Core.Versions');
	
	// isElement
	RequireScript('Core.Element.isElement');
	
	// Parse Stack
	RequireScript('Core.ParseStack');
	
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
	ImportScript('Core.TypeOf');
	
	/***********************************
	 ** Extend
	 **********************************/
	ImportScript('Core.Extend');
	
	/***********************************
	 ** Browser
	 **********************************/
	ImportScript('Core.Browser');
	
	
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

	