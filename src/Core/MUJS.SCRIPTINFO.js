// +@display_name  Script Info
// +@replace  MUJS.SCRIPTINFO
// +@history (0.0.9) History begins.

	MUJS.fn.getScriptURLInfo = function(str){
		var patt = /myuserjs\.org\/script\/([^\/]+)\/([^\s]+)\.(user|meta|metajs|data)\.js/i;
		
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

	MUJS.fn.setScriptInfo = function(data){
		var callerScriptInfo;
		var output = {};
		try{var genErrorVariable = genErrorFunction(genErrorArg);} catch(e){
			//console.log(e.stack);
			var tStack = MUJS.ERROR.parseStack(e.stack.toString());
			//console.log('tStack', tStack);
			if(tStack.length > 0){
				for(var i = tStack.length - 1; i >= 0; i--){
					if(tStack[i].fileName != '' && tStack[i].fileExt.toLowerCase() == 'user.js'){
						callerScriptInfo = tStack[i];
						output.userscript_file_name = callerScriptInfo.fileName;
						output.userscript_file_path = callerScriptInfo.fullFileName;
						break;
					}
				}
			}
		};
		
		try{
			var tGM_info;
			
			if(typeof data.GM_info !== "undefined")
				tGM_info = data.GM_info;
			else if(typeof data.ginfo !== "undefined")
				tGM_info = data.ginfo;
			
			if(typeof tGM_info !== "undefined"){
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
				
				var pMetaData = MUJS.API.ParseMetaData(tGM_info.scriptMetaStr);
				
				//console.log('pMetaData', pMetaData);
				
				var urlInfo;
				if(
					(typeof pMetaData['downloadURL'] !== "undefined" && (urlInfo = MUJS.getScriptURLInfo(pMetaData['downloadURL'])))
					|| (typeof pMetaData['updateURL'] !== "undefined" && (urlInfo = MUJS.getScriptURLInfo(pMetaData['updateURL'])))
					|| (typeof pMetaData['MUJSdownloadURL'] !== "undefined" && (urlInfo = MUJS.getScriptURLInfo(pMetaData['MUJSdownloadURL'])))
					|| (typeof pMetaData['MUJSupdateURL'] !== "undefined" && (urlInfo = MUJS.getScriptURLInfo(pMetaData['MUJSupdateURL'])))
				){
					//console.log('urlInfo', urlInfo);
					MUJS('set', 'script.username', urlInfo.username);
					MUJS('set', 'script.script_name', urlInfo.script_name);
					if(['meta', 'metajs', 'data'].indexOf(urlInfo.get_type.toLowerCase()) != -1){
						MUJS('set', 'script.script_name', urlInfo.script_name);
					}
				} else {
					if(typeof pMetaData['MUJSusername'] !== "undefined")
						MUJS('set', 'script.username', pMetaData['MUJSusername']);
					else if(typeof pMetaData['MUJS_username'] !== "undefined")
						MUJS('set', 'script.username', pMetaData['MUJS_username']);
						
					if(typeof pMetaData['MUJSscriptname'] !== "undefined")
						MUJS('set', 'script.username', pMetaData['MUJSscriptname']);
					else if(typeof pMetaData['MUJS_script_name'] !== "undefined")
						MUJS('set', 'script.username', pMetaData['MUJS_script_name']);
				}
				
				
				
			}
			
			
		}catch(e){}
		
		Object.defineProperty(MUJS.Config.Update, 'script_info', {
			value: Object.freeze(output),
			writable: false,
			enumerable: true,
			configurable: false
		});
		
		//console.log('stored script_info', MUJS.Config.Update.script_info);
		//console.log('stored script_info2', MUJS.config('Update.script_info'));
		
		return Object.freeze(output);
	};
	
	MUJS.fn.getScriptInfo = function(data){
		if(typeof MUJS.config('Update.script_info') === "undefined"){
			MUJS.setScriptInfo(data);
		}
		return MUJS.config('Update.script_info');
	}
	