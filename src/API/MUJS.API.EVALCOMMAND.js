// +@display_name  Eval Command
// +@replace  MUJS.API.EVALCOMMAND
// +@history (0.0.13) History begins.

MUJS.API.EvalCommand = function(command, arg1, arg2){
	var args = Array.prototype.slice.call(arguments, 1);
	switch(command.toLowerCase()){
		// Log
		case 'log':
		case 'gm_log':
			return MUJS.API.MUJS_Log.Log.apply(MUJS.API.MUJS_Log, args);
			break;
		case 'debug':
			return MUJS.API.MUJS_Log.Debug.apply(MUJS.API.MUJS_Log, args);
			break;
		case 'info':
			return MUJS.API.MUJS_Log.Info.apply(MUJS.API.MUJS_Log, args);
			break;
		case 'warning':
			return MUJS.API.MUJS_Log.Warning.apply(MUJS.API.MUJS_Log, args);
			break;
		case 'startgroup':
		case 'endgroup':
		case 'groupcollapsed':
		case 'time':
		case 'timeend':
		case 'timestamp':
		case 'assert':
		case 'trace':
		case 'clear':
		case 'count':
		case 'table':
			return MUJS.API.MUJS_Log[command].apply(MUJS.API.MUJS_Log, args);
			break;
		
		// Add Style
		case 'style':
		case 'addstyle':
		case 'gm_addstyle':
			return MUJS.API.addStyle.apply(MUJS.API, args);
			break;
		
		// Add Script
		case 'script':
		case 'addscript':
		case 'gm_addscript':
			return MUJS.API.addScript.apply(MUJS.API, args);
			break;
		
		// Content Eval
		case 'contenteval':
			return MUJS.API.contentEval.apply(MUJS.API, args);
			break;
			
		// LocalStorage
		case 'getvalue':
			return MUJS.API.localStorage.getValue.apply(MUJS.API, args);
			break;
		case 'setvalue':
			return MUJS.API.localStorage.setValue.apply(MUJS.API, args);
			break;
		case 'deletevalue':
			return MUJS.API.localStorage.deleteValue.apply(MUJS.API, args);
			break;
		
		default:
			if(typeof MUJS.API[command] === "function")
				return MUJS.API[command].apply(MUJS.API, args);
			else if(typeof MUJS.API[command] !== "undefined")
				return MUJS.API[command];
			break;
	}
	return undefined;
}