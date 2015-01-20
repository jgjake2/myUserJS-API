// +@display_name  Object Prototypes

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