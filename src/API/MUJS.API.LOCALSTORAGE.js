// +@display_name  LocalStorage
// +@replace  MUJS.API.LOCALSTORAGE
// +@history (0.0.9) History begins.

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