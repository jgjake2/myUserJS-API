// +@display_name  Get Resource
// +@history (0.0.17) History begins.

jMod.API.getResourceText = function(name, callback, useLiveOnFail){
	if(_undefined!==typeof GM_getResourceText){
		try {
			var tmp = GM_getResourceText(name);
			if(callback) callback(tmp);
			return tmp;
		} catch(e) {}
	}
	if(useLiveOnFail)
		return jMod.API.getResourceTextLive(name, callback);
}

jMod.API.getResourceURL = function(name, callback, useLiveOnFail){
	if(_undefined!==typeof GM_getResourceURL){
		try {
			var tmp = GM_getResourceURL(name);
			if(callback) callback(tmp);
			return tmp;
		} catch(e) {}
	}
	if(useLiveOnFail)
		return jMod.API.getResourceURLLive(name, callback);
}

jMod.API.getResourceTextLive = function(name, callback){
	if(_undefined==typeof GM_xmlhttpRequest)
		return;
	var resourceObj = jConfig('script.script_info.resource');
	if(resourceObj && _undefined!==typeof resourceObj[name]){
		return GM_xmlhttpRequest({
			method: "GET",
			url: resourceObj[name],
			onload: function(response){
				callback(response.responseText);
			}
		});
	}
}

RequireScript('API.getRemoteImage');

jMod.API.getResourceURLLive = function(name, callback){
	var resourceObj = jConfig('script.script_info.resource');
	if(resourceObj && _undefined!==typeof resourceObj[name]){
		return jMod.API.getRemoteImageAsURL(resourceObj[name], callback);
	}
}

jMod.API.addResourceCSS = function(name){
	if(!jMod.API.getResourceText(name, function(result){if(typeof result === "string" && result != '') jMod.CSS = result;}, false)){
		var resourceObj = jConfig('script.script_info.resource');
		if(resourceObj && _undefined!==typeof resourceObj[name]){
			jMod.API.addStylesheet(resourceObj[name]);
		}
	}
}

jMod.API.addResourceScript = function(name){
	if(!jMod.API.getResourceText(name, function(result){if(typeof result === "string" && result != ''){jMod.API.addScript({js: result});}}, false)){
		var resourceObj = jConfig('script.script_info.resource');
		if(resourceObj && _undefined!==typeof resourceObj[name]){
			jMod.API.addScript({src: resourceObj[name], async: true, defer: true});
		}
	}
}
/*
function getResourceTest(){
	console.log('getResourceText', jMod.API.getResourceText('jmodicon'));
	
	console.log('getResourceURL', jMod.API.getResourceURL('jmodicon'));
	
	//jMod.API.getResourceTextLive('jmodicon', function(response){
		//console.log('getResourceTextLive', response);
	//});
	
	jMod.API.getResourceURLLive('jmodicon', function(response){
		console.log('getResourceURLLive', response);
		var img = new Image();
		document.body.appendChild(img);
		img.src = response;
	});
}

setTimeout(getResourceTest, 500);
*/
