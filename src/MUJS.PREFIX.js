if(typeof unsafeWindow === "undefined") unsafeWindow = window;
if(typeof unsafeWindow['MUJS'] === "undefined") unsafeWindow['MUJS'] = {};
(function(MUJS){
	function defineGlobalProperty(proto_name, name, data){
		if (!this[proto_name].prototype[name])
			Object.defineProperty(this[proto_name].prototype, name, data);
		if (!unsafeWindow[proto_name].prototype[name])
			Object.defineProperty(unsafeWindow[proto_name].prototype, name, data);
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

	defineGlobalProperty("Object", "SearchForKey", {value: Object_SearchForKey, enumerable: false});
	
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

	defineGlobalProperty("Object", "setKeyValue", {value: Object_setKeyValue, enumerable: false});