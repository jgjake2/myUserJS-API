
/**
 * UPDATE
 */
MUJS['UPDATE'] = {};

MUJS['UPDATE']['getDOMTiming'] = function(){
	var r = {};
	if(typeof window.performance !== "undefined" && typeof window.performance.timing !== "undefined"){
		var perfData = window.performance.timing; 
		var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
		if(pageLoadTime > 0) r['pageLoadTime'] = pageLoadTime;
		
		
		var DOMLoadTime = perfData.domComplete - perfData.navigationStart;
		if(DOMLoadTime > 0) r['DOMLoadTime'] = DOMLoadTime
		
		//var pageLoadTime2 = perfData.loadEventEnd - perfData.loadEventStart;
		//if(pageLoadTime2 > -1) r['pageLoadTime2'] = pageLoadTime2;
		
		
	}
	return r;
}

MUJS['UPDATE']['addScriptTag'] = function(data){
	if(heads = document.getElementsByTagName('head')) {
		var newScript = document.createElement('script');
		if(typeof data.js != "undefined" && data.js != ''){
			try {
				newScript.innerHTML = data.js;
			} catch (x) {
				newScript.innerText = data.js;
			}
		}
		
		if(typeof data.src != "undefined" && data.src != ''){
			try{newScript.src = data.src;}catch(x){}
		}
		
		if(typeof data.id !== "undefined"){
			try{newScript.id = data.id;}catch(x){}
		}
		
		if(typeof data.async !== "undefined"){
			newScript.async = true;
		}
		
		newScript.type = 'text/javascript';
		try{heads[0].appendChild(newScript);}catch(x){};
		return newScript;
	}
	return null;
}

MUJS['UPDATE']['get'] = MUJS.getOption;
MUJS['UPDATE']['set'] = MUJS.setOption;


if(typeof unsafeWindow['MUJS_UPDATE_CONFIGURATION'] !== "undefined"){
	for(var key in unsafeWindow.MUJS_UPDATE_CONFIGURATION){
		MUJS.UPDATE.set(key, unsafeWindow.MUJS_UPDATE_CONFIGURATION[key], true);
	}
}

MUJS['UPDATE']['getUpdateURL'] = function(opts){
	if(typeof unsafeWindow.UpdateData !== "undefined"){
		unsafeWindow.UpdateData = undefined;
		delete unsafeWindow.UpdateData;
	}
	// Get Username
	var un = MUJS.getOption('script.username');
	if(typeof opts.username !== "undefined") un = opts.username;
	if(typeof un === "undefined") return opts.callback(undefined, 'Error! No Username Provided');
	
	// Get Script Name
	var sn = MUJS.getOption('script.script_name');
	if(typeof opts.script_name !== "undefined") sn = opts.script_name;
	if(typeof sn === "undefined") return opts.callback(undefined, 'Error! No Username Provided');
	
	// Get Get_Type
	var gt = MUJS.getOption('get_type');
	if(typeof opts.get_type !== "undefined") gt = opts.get_type;
	
	// Get Default Args
	var args = MUJS.getOption('args');
	
	// Get Additional Args
	if(typeof opts.args !== "undefined")
		for(var key in opts.args)
			args[key] = opts.args[key];
			
	if(typeof opts.noDOM === "undefined" && MUJS.getOption('DOMTiming')){
		var domTiming = MUJS.UPDATE.getDOMTiming();
		for(var key in domTiming)
			args[key] = domTiming[key];
	}

	
	// Make Args Into String
	var args_str = '';
	for(var key in args){
		args_str += (args_str.length > 0 ? '&' : '') + key + '=' + args[key];
	}
	
	var host = 'http://myuserjs.org';
	if(MUJS.getOption('host') !== "undefined")
		host = MUJS.getOption('host');
	
	var url = host + '/script/' + un + '/' + sn + '.' + gt + '?' + args_str;
	return url;
}

MUJS['UPDATE']['getUpdateData'] = function(opts){
	var url = MUJS.UPDATE.getUpdateURL(opts);
	
	var tmp = MUJS.UPDATE.addScriptTag({
		'src': url
	});
	MUJS.UPDATE.waitForUpdateData(opts.callback);
	return tmp;
}

MUJS['UPDATE']['waitForUpdateData'] = function(callback, count){
	if(typeof count === "undefined") count = 0;
	if(count > 100) return callback(undefined, 'Error! TimedOut');
	if(typeof unsafeWindow.UpdateData !== "undefined"){
		return callback(unsafeWindow.UpdateData, 'Success!');
	} else {
		return setTimeout(MUJS.UPDATE.waitForUpdateData, 50, callback, count + 1);
	}
}
/**
 * END UPDATE
 */

