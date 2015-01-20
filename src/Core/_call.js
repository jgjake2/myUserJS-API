// +@display_name  _call
// +@history (0.0.16) History begins.

jMod._call = function(){
	var type, tmp, arg0, arg1, length = arguments.length;
	// Try to get the Userscript's file info if jMod() is being called from the script
	try{if(jConfig.getScriptFileInfo&&!ScriptInfo.gotFileInfo)ScriptInfo.getScriptFileInfo();}catch(e){} // Try to get information about the userscript if possible
	//try{if(_undefined===typeof jMod.Config.script.script_info)ScriptInfo.get();}catch(e){}
	try{
		if(length > 0){
			arg0 = arguments[0];
			type = typeof arg0;
			if(type == "string"){
				if(length == 1){
					// If is valid Config key, return value
					if(_undefined!==typeof (tmp = jConfig(arg0)))
						return tmp;
				} else {
					arg1 = arguments[1];
					// Commands
					switch(arg0){
						case 'get': // Get Config value
							//return jConfig.apply(jMod, Slice.call(arguments, 1));
							return jConfig(arg1);
							break;
						case 'set': // Set Config value
							return jConfig(arg1, arguments[2]);
							break;
					}
					
					// Events
					if(typeof arg1 === "function" && typeof jMod.Events.e[arg0] !== _undefined)
						return jMod.Events.addListener.apply(jMod.Events, Slice.call(arguments));
					
					
					if(length == 2){
						// If is valid Config key, set value
						if(_undefined!==typeof (tmp = jConfig(arg0))){
							// Types must match!
							if(typeof tmp === typeof arg1)
								return jConfig(arg0, arg1);
						}
					}
				}
				
				// If is Log Function
				if(jMod.log.fnList.join('|').toLowerCase().split('|').indexOf(arg0.toLowerCase()) != -1){
					if(typeof (tmp = Object_SearchForKeyCaseInsensitive.call(jMod.log, arg0)) === "function"){
						return tmp.apply(jMod.log, Slice.call(arguments, 1));
					}
				}
			} else if(type == "object") {
				if(!isElement(arg0)) {
					// If object with GM_info object
					if(typeof getFirstValidKey(arg0, ['GM_info', 'gm_info', 'ginfo']) !== _undefined) {
						return ScriptInfo.set.apply(ScriptInfo, Slice.call(arguments));
					}
					
					// If GM_info object
					if(typeof arg0.scriptSource !== _undefined && typeof arg0.scriptMetaStr !== _undefined){
						return ScriptInfo.set.apply(ScriptInfo, Slice.call(arguments));
					}
				}
			} else if(type == "function"){
				if(length == 1){
					// On Ready function
					jMod.onReady = arg0;
					return arg0;
				}
			}
			
			if(jConfig('debug')){
				jMod.Warning('Unable to process jMod() call:', Slice.call(arguments));
				//console.warn('Unable to process jMod() call:', Slice.call(arguments));
			}
		}
	}catch(e){}
};
