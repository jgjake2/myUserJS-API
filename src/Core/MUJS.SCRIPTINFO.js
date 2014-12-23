// +@display_name  Script Info
// +@replace  MUJS.SCRIPTINFO
// +@history (0.0.9) History begins.
// +@history (0.0.14) Fixed GM_info cloning process.

	MUJS.fn.getScriptURLInfo = function(str){
		var patt = /myuserjs\.org\/script\/([^\/]+)\/([^\s]+)(?:\.(user|meta|metajs|data)\.js){1}?/i;
		
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
	
	MUJS.gotScriptFileInfo = false;
	
	MUJS.fn.getScriptFileInfo = function(){
		var callerScriptInfo;
		var output = {};
		
		if(MUJS.gotScriptFileInfo)
			return MUJS('script.script_file_info');
		var e = new Error();
		//console.log(e.stack);
		if(e.stack.indexOf('.user.js') == -1)
			return undefined;
		var tStack = MUJS.parseStack(e.stack.toString());
		if(tStack.length > 0){
			for(var i = tStack.length - 1; i >= 0; i--){
				if(tStack[i].fileName != '' && tStack[i].fileExt.toLowerCase() == 'user.js'){
					callerScriptInfo = tStack[i];
					output.userscript_file_name = callerScriptInfo.fileName;
					output.userscript_file_path = callerScriptInfo.fullFileName;
					MUJS.gotScriptFileInfo = true;
					MUJS('set', 'script.script_file_info', output);
					MUJS.API('info', 'Userscript File Name: ' + callerScriptInfo.fullFileName);
					return output;
					break;
				}
			}
		}
		return undefined;
	}

	MUJS.fn.setScriptInfo = function(data){
		var callerScriptInfo = MUJS.getScriptFileInfo();
		var output = {};
		if(typeof callerScriptInfo !== "undefined")
			output = merge(output, callerScriptInfo);
		
		
		
		try{
			var tGM_info;
			var tScriptMetaStr;
			var pMetaData;
			
			
			
			if(typeof data === "object"){
				tGM_info = getFirstValidKeyValue(data, ['GM_info', 'gm_info', 'ginfo']);
				if(typeof tGM_info !== "undefined"){
					tScriptMetaStr = tGM_info.scriptMetaStr;
				}
			} else if(typeof data === "string"){
				tScriptMetaStr = data;
			}
			if(typeof tScriptMetaStr !== "undefined"){
				pMetaData = MUJS.API.ParseMetaData(tGM_info.scriptMetaStr);
				
				for(var key in pMetaData){
					if(typeof output[key] === "undefined") output[key] = pMetaData[key];
				}
			}
			
			if(typeof tGM_info !== "undefined"){
				//console.log(tGM_info);
				
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
				
			}
			
			if(typeof pMetaData !== "undefined"){	
				//console.log('pMetaData', pMetaData);
				
				var urlInfo;
				var key = getFirstValidKey(pMetaData, ['downloadURL', 'updateURL', 'MUJSdownloadURL', 'MUJSupdateURL'], function(k, val){return MUJS.getScriptURLInfo(val);});
				if(typeof key !== "undefined" && (urlInfo = MUJS.getScriptURLInfo(pMetaData[key]))){
					console.log('urlInfo', urlInfo);
					MUJS('set', 'script.username', urlInfo.username);
					MUJS('set', 'script.script_name', urlInfo.script_name);
					if(['meta', 'metajs', 'data'].indexOf(urlInfo.get_type.toLowerCase()) != -1){
						MUJS('set', 'script.get_type', urlInfo.get_type.toLowerCase());
					}
				} else {
					var tmp;
					if((tmp = getFirstValidKeyValue(pMetaData, ['MUJSusername', 'MUJS_username'])))
						MUJS('set', 'script.username', tmp);
						
					if((tmp = getFirstValidKeyValue(pMetaData, ['MUJSscriptname', 'MUJS_script_name'])))
						MUJS('set', 'script.script_name', tmp);
				}
				
				
				
			}
			
			
		}catch(e){}
		
		Object.defineProperty(MUJS.Config.script, 'script_info', {
			value: Object.freeze(output),
			writable: false,
			enumerable: true,
			configurable: false
		});
		
		return Object.freeze(output);
	};
	
	MUJS.fn.getScriptInfo = function(data){
		if(typeof MUJS.config('script.script_info') === "undefined"){
			return MUJS.setScriptInfo(data);
		}
		return MUJS.config('script.script_info');
	}
	