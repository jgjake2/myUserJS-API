// +@display_name  Script Info
// +@history (0.0.9) History begins.
// +@history (0.0.14) Fixed GM_info cloning process.
// +@history (0.0.15) Removed ref to jMod.fn (__proto__ is depreciated).
// +@history (0.0.16) Moved into a "jMod.ScriptInfo" function.
// +@history (0.0.17) Added enable/disable configuration and logging for "getScriptFileInfo".
// +@history (0.0.18) Minification improvements.

	// Parse Stack
	RequireScript('Core.ParseStack');
	
	var ScriptInfo = jMod.ScriptInfo = function(){
		if(arguments.length == 0){
			return jMod.ScriptInfo.get();
		} else {
			var type = typeof arguments[0];
			
			if(arguments.length == 1 && (type === "object" || type == "string")) {
				return jMod.ScriptInfo.GM_info(arguments[0]);
			}
		}
	}
	
	ScriptInfo.getURLInfo = function(str){
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
	
	ScriptInfo.gotFileInfo = false;
	
	ScriptInfo.getScriptFileInfo = function(){
		if(ScriptInfo.gotFileInfo || !jConfig.getScriptFileInfo)
			return jConfig.script.script_file_info;

		var i = 0,
			tStack,
			callerScriptInfo,
			output = {},
			e = new Error(), // Create new error to get its stack
			tStackStr = e.stack.toString();
		// Check if a userscript is anywhere in the stack
		if(tStackStr.indexOf('user.js') == -1)
			return;
		// Parse the stack
		tStack = jMod.parseStack(tStackStr);
		if(tStack.length > 0){
			//for(i = tStack.length - 1; i >= 0; i--){
			for(i; i < tStack.length; i++){
				callerScriptInfo = tStack[i];
				// Find jMod in the stack
				if(NOTEXISTS(jConfig.jMod_File_Path) && ['jmod.js', 'jmod.min.js', 'jmod.full.js', 'jmod.min.expanded.js', 'mujs.js', 'mujs.min.js'].indexOf(callerScriptInfo.fileName.toLowerCase()) != -1){
					jConfig.jMod_Full_File_Name = callerScriptInfo.fileName;
					jConfig.jMod_File_Name = callerScriptInfo.fileName.substr(0, callerScriptInfo.fileName.length - 3);
					jConfig.jMod_File_Path = callerScriptInfo.fullFileName;
				}
				
				// Find the userscript in the stack
				if(callerScriptInfo.fileName != '' && callerScriptInfo.fileExt.toLowerCase() == 'user.js'){
					ScriptInfo.gotFileInfo = true;
					output = jConfig.script.script_file_info = {
						userscript_full_file_name: callerScriptInfo.fileName,
						userscript_file_name: callerScriptInfo.fileName.substr(0, callerScriptInfo.fileName.length - 8),
						userscript_file_path: callerScriptInfo.fullFileName,
						caller_lineNumber: callerScriptInfo.lineNumber,
						caller_functionName: callerScriptInfo.functionName
					};
					if(jMod.debug)
						jModLogInfo('ScriptInfo.getScriptFileInfo', 'Get Script File Info Successful!!', output, callerScriptInfo);
					return output;
				}
			}
		}
		return;
	}
	
	Object.defineProperty(ScriptInfo, 'InfoSet', {
		get: function(){
			return (EXISTS(jConfig.script.script_info));
		}
	});
	
	ScriptInfo.set = function(data){
		var callerScriptInfo, gm_info, scriptMetaStr, pMetaData, key, tmp, urlInfo,
			output = {};
		try{
			callerScriptInfo = ScriptInfo.getScriptFileInfo();
			if(EXISTS(callerScriptInfo))
				output = jMod.extend(output, callerScriptInfo);
		} catch(e) {}
		
		try{
			
			if(typeof data === _undefined && (EXISTS(GM_info) || EXISTS(GM_getMetadata))){
				try{
					data = {
						'gm_info': EXISTS(GM_info) ? GM_info : GM_getMetadata(),
						'has_GM_info': EXISTS(GM_info),
						'has_GM_getMetadata': EXISTS(GM_getMetadata)
					}
				}catch(e){}
			}
			
			if(typeof data === "object"){
				//gm_info = getFirstValidKeyValue(data, ['GM_info', 'gm_info', 'ginfo']);
				gm_info = data.GM_info || data.gm_info || data.ginfo;
				if(NOTEXISTS(gm_info) && EXISTS(data.scriptSource))
					gm_info = data;
				if(EXISTS(gm_info) && EXISTS(gm_info.scriptMetaStr)){
					scriptMetaStr = gm_info.scriptMetaStr;
				}
			} else if(typeof data === "string"){
				scriptMetaStr = data;
			}
			
			if(EXISTS(scriptMetaStr)){
				pMetaData = jMod.API.ParseMetaData(scriptMetaStr);
				
				for(key in pMetaData){
					if(NOTEXISTS(output[key]))
						output[key] = pMetaData[key];
				}
			}
			
			if(EXISTS(gm_info)){
				if(EXISTS(gm_info.script)){
					for(key in gm_info.script){
						if(typeof output[key] === _undefined) output[key] = gm_info.script[key];
					}
				} else {
					//jModLogWarning('ScriptInfo', 'GM_info.script does not exist', gm_info, data);
					console.warn('ScriptInfo', 'GM_info.script does not exist', gm_info, data);
				}
				
				if(EXISTS(gm_info.uuid)){
					output['gmUUID'] = gm_info.uuid;
				} else if(EXISTS(gm_info.script.uuid)){
					output['gmUUID'] = gm_info.script.uuid;
				}
				
				if(EXISTS(gm_info.scriptHandler)){
					if(gm_info.scriptHandler.toLowerCase() == 'tampermonkey'){
						output.script_handler = 'Tampermonkey';
						output.script_handler_version = gm_info.version;
						jConfig.getScriptFileInfo = false; // Tampermonkey is too secure for this
					} else if(gm_info.scriptHandler.toLowerCase() == 'greasemonkey'){
						output.script_handler = 'Greasemonkey';
						output.script_handler_version = gm_info.version;
					}
				} else if(data.has_GM_info){
					output.script_handler = 'Greasemonkey';
					output.script_handler_version = gm_info.version;
				} else if(data.has_GM_getMetadata){
					output.script_handler = 'Scriptish';
				}
				
			}
			
			if(EXISTS(pMetaData)){	
				key = getFirstValidKey(pMetaData, ['downloadURL', 'updateURL', 'jModupdateURL', 'jModUpdateURL', 'jModdownloadURL', 'jModDownloadURL'], function(k, val){return jMod.ScriptInfo.getURLInfo(val);});
				if(EXISTS(key) && (urlInfo = ScriptInfo.getURLInfo(pMetaData[key]))){
					jConfig.script.username = urlInfo.username;
					jConfig.script.script_name = urlInfo.script_name;
					if(['meta', 'metajs', 'data'].indexOf(urlInfo.get_type.toLowerCase()) != -1){
						jConfig.script.get_type = urlInfo.get_type.toLowerCase();
					}
				} else {
					if((tmp = getFirstValidKeyValue(pMetaData, ['jModusername', 'jMod_username'])))
						jConfig.script.username = tmp;
						
					if((tmp = getFirstValidKeyValue(pMetaData, ['jModscriptname', 'jMod_script_name'])))
						jConfig.script.script_name = tmp;
				}
				
				if(EXISTS(pMetaData.jMod)){
					try{
						if(tmp = JSON.parse(pMetaData['jMod']))
							jMod.extend(true, jMod.Config, tmp);
					} catch(e) {
						//console.error('Error parsing options in MetaBlock', e);
						jModError(e, 'ScriptInfo.set', 'Error parsing options in MetaBlock');
					}
				}
				
				
			}
			
		} catch(e) {
			console.error('Error ScriptInfo.set', e);
			//jModError(e, 'ScriptInfo.set');
		}
		
		Object.defineProperty(jMod.Config.script, 'script_info', {
			value: Object.freeze(output),
			writable: false,
			enumerable: true,
			configurable: false
		});
		
		//if(output && output.name && jMod.debug)
			//console.info('ScriptInfo.set - Get Script_Info Successful!!', output);
		
		
		return Object.freeze(output);
	}
	
	ScriptInfo.get = function(){
		var r = jMod.Config.script.script_info;
		return (EXISTS(r) ? r : ScriptInfo.set.apply(this, arguments));
	}
	