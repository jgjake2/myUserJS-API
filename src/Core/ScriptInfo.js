// +@display_name  Script Info
// +@history (0.0.9) History begins.
// +@history (0.0.14) Fixed GM_info cloning process.
// +@history (0.0.15) Removed ref to jMod.fn (__proto__ is depreciated).
// +@history (0.0.16) Moved into a "jMod.ScriptInfo" function.
// +@history (0.0.17) Added enable/disable configuration and logging for "getScriptFileInfo".

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
		if(!jConfig.getScriptFileInfo)
			return;
			
		if(ScriptInfo.gotFileInfo)
			return jConfig.script.script_file_info;
			
		var i,
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
			for(i = 0; i < tStack.length; i++){
				callerScriptInfo = tStack[i];
				// Find jMod in the stack
				if(_undefined===typeof jConfig.jMod_File_Path && ['jmod.js', 'jmod.min.js', 'jmod.full.js', 'jmod.min.expanded.js', 'mujs.js', 'mujs.min.js'].indexOf(callerScriptInfo.fileName.toLowerCase()) != -1){
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
						jModLogInfo('ScriptInfo', 'Get Script File Info Successful!!', output, callerScriptInfo);
					return output;
				}
			}
		}
		return;
	}
	
	Object.defineProperty(ScriptInfo, 'InfoSet', {
		get: function(){
			return (typeof jConfig('script.script_info') !== _undefined);
		}
	});
	
	ScriptInfo.set = function(data){
		var output = {};
		try{
			var callerScriptInfo = ScriptInfo.getScriptFileInfo();
			if(typeof callerScriptInfo !== _undefined)
				output = jMod.extend(output, callerScriptInfo);
		} catch(e) {}
		
		try{
			var gm_info;
			var scriptMetaStr;
			var pMetaData;
			
			if(typeof data === _undefined && typeof GM_info !== _undefined){
				data = {
					'gm_info': GM_info,
					'has_GM_info': true,
					'has_GM_getMetadata': (typeof GM_getMetadata === _undefined ? false : true)
				}
			}
			
			if(typeof data === "object"){
				gm_info = getFirstValidKeyValue(data, ['GM_info', 'gm_info', 'ginfo']);
				if(typeof gm_info === _undefined && typeof data.scriptSource !== _undefined)
					gm_info = data;
				if(typeof gm_info !== _undefined && typeof gm_info.scriptMetaStr !== _undefined){
					scriptMetaStr = gm_info.scriptMetaStr;
				}
			} else if(typeof data === "string"){
				scriptMetaStr = data;
			}
			
			if(typeof scriptMetaStr !== _undefined){
				pMetaData = jMod.API.ParseMetaData(scriptMetaStr);
				
				for(var key in pMetaData){
					if(typeof output[key] === _undefined) output[key] = pMetaData[key];
				}
			}
			
			if(typeof gm_info !== _undefined){
				//console.log(gm_info);
				
				if(typeof gm_info.script !== _undefined){
					for(var key in gm_info.script){
						if(typeof output[key] === _undefined) output[key] = gm_info.script[key];
					}
				}
				
				if(typeof gm_info.uuid !== _undefined){
					output['gmUUID'] = gm_info.uuid;
				} else if(typeof gm_info.script.uuid !== _undefined){
					output['gmUUID'] = gm_info.script.uuid;
				}
				
				if(typeof gm_info.scriptHandler !== _undefined){
					if(gm_info.scriptHandler.toLowerCase() == 'tampermonkey'){
						output.script_handler = 'Tampermonkey';
						output.script_handler_version = gm_info.version;
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
			
			if(typeof pMetaData !== _undefined){	
				//console.log('pMetaData', pMetaData);
				
				var urlInfo;
				var key = getFirstValidKey(pMetaData, ['downloadURL', 'updateURL', 'jModupdateURL', 'jModUpdateURL', 'jModdownloadURL', 'jModDownloadURL'], function(k, val){return jMod.ScriptInfo.getURLInfo(val);});
				if(typeof key !== _undefined && (urlInfo = ScriptInfo.getURLInfo(pMetaData[key]))){
					//console.log('urlInfo', urlInfo);
					jConfig('script.username', urlInfo.username);
					jConfig('script.script_name', urlInfo.script_name);
					if(['meta', 'metajs', 'data'].indexOf(urlInfo.get_type.toLowerCase()) != -1){
						jConfig('script.get_type', urlInfo.get_type.toLowerCase());
					}
				} else {
					var tmp;
					if((tmp = getFirstValidKeyValue(pMetaData, ['jModusername', 'jMod_username'])))
						jConfig('script.username', tmp);
						
					if((tmp = getFirstValidKeyValue(pMetaData, ['jModscriptname', 'jMod_script_name'])))
						jConfig('script.script_name', tmp);
				}
				
				if(typeof pMetaData['jMod'] != _undefined){
					try{
						var tmpConfig = JSON.parse(pMetaData['jMod']);
						if(tmpConfig)
							jMod.extend(true, jMod.Config, tmpConfig);
					} catch(e) {
						//console.error('Error parsing options in MetaBlock', e);
						jModError(e, 'ScriptInfo.set', 'Error parsing options in MetaBlock');
					}
				}
				
				
			}
			
		} catch(e) {
			//console.error('Error ScriptInfo.set', e);
			jModError(e, 'ScriptInfo.set');
		}
		
		Object.defineProperty(jMod.Config.script, 'script_info', {
			value: Object.freeze(output),
			writable: false,
			enumerable: true,
			configurable: false
		});
		
		
		return Object.freeze(output);
	}
	
	ScriptInfo.get = function(){
		//var r = jConfig('script.script_info');
		var r = jMod.Config.script.script_info;
		return (typeof r != _undefined ? r : ScriptInfo.set.apply(this, arguments));
	}
	