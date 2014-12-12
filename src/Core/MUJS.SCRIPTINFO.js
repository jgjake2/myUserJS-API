// +@display_name  Script Info
// +@replace  MUJS.SCRIPTINFO
// +@history (0.0.9) History begins.

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
			
			if(typeof data.ginfo !== "undefined"){
				if(typeof data.ginfo.script !== "undefined"){
					for(var key in data.ginfo.script){
						if(typeof output[key] === "undefined") output[key] = data.ginfo.script[key];
					}
				}
				
				if(typeof data.ginfo.uuid !== "undefined"){
					output['gmUUID'] = data.ginfo.uuid;
				} else if(typeof data.ginfo.script.uuid !== "undefined"){
					output['gmUUID'] = data.ginfo.script.uuid;
				}
				
				if(typeof GM_info.scriptHandler !== "undefined"){
					if(GM_info.scriptHandler.toLowerCase() == 'tampermonkey'){
						output.script_handler = 'Tampermonkey';
						output.script_handler_version = GM_info.version;
					} else if(GM_info.scriptHandler.toLowerCase() == 'greasemonkey'){
						output.script_handler = 'Greasemonkey';
						output.script_handler_version = GM_info.version;
					}
				} else if(data.has_GM_info){
					output.script_handler = 'Greasemonkey';
					output.script_handler_version = GM_info.version;
				} else if(data.has_GM_getMetadata){
					output.script_handler = 'Scriptish';
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
	