// +@display_name  Log
// +@replace  MUJS.API.LOG
// +@history (0.0.9) History begins.
// +@history (0.0.13) Fixed output to the Web Console using GM_log.
// +@history (0.0.14) Removed "Debug" from list of functions mapped to MUJS.
// +@history (0.0.14) Minor fixes / improvements.

	/*
	var oldConsole = console;
	var oldConsoleFunctions = {};
	var maskConsoleFunctions = ['debug', 'log', 'info', 'warning', 'error'];
	
	var beforeLogFunction = function(fName, args, data){
		var e = new Error();
		//oldConsoleFunctions.log.apply(oldConsole, [fName, args]);
		var tStack = MUJS.parseStack(e.stack);
		var lastFunctionCall;
		var excludePatt = /(beforeLogFunction|oldConsole)/i;
		for(var i = 0; i < tStack.length; i++){
			if(!excludePatt.test(tStack[i].functionName)){
				lastFunctionCall = tStack[i];
				break;
			}
		}
		
		if(typeof lastFunctionCall !== "undefined" && (/MUJS(?:\-\d+)\.js/i).test(lastFunctionCall.fileName)){
			//oldConsoleFunctions.log.apply(oldConsole, ['pass', lastFunctionCall]);
		} else {
			MUJS.log.endGroup('MUJS API');
		}
	}
	
	for(var i = 0; i < maskConsoleFunctions.length; i++){
		oldConsoleFunctions[maskConsoleFunctions[i]] = oldConsole[maskConsoleFunctions[i]];
		oldConsole[maskConsoleFunctions[i]] = new (function(fName){
			var funName = fName + '';
			var f = function(){
				//GM_log('foo bar' + funName);
				beforeLogFunction(funName, Array.prototype.slice.call(arguments, 0), {});
				oldConsoleFunctions[funName].apply(oldConsole, arguments);
			}
			return f;
		})(maskConsoleFunctions[i])
	}
	*/

	var OUTPUT_TYPES = {
		'ERROR':     {level: 1,	value: 'error'     },
		'EXCEPTION': {level: 1,	value: 'exception' },
		'WARNING':   {level: 2,	value: 'warn'      },
		'INFO':      {level: 3,	value: 'info'      },
		'LOG':       {level: 4,	value: 'log'       },
		'DEBUG':     {level: 5,	value: 'debug'     }
	}

	function isFirebug(ptr){
		if(typeof ptr === "undefined") return false;
		if(typeof ptr['timeStamp'] !== "undefined") return true;
		return false;
	}

	function isConsole2(ptr){
		if(typeof ptr === "undefined") return false;
		if(!isFirebug(ptr)) {
			if(typeof ptr['dirxml'] !== "undefined") return true;
		}
		return false;
	}

	function isWebConsole(ptr){
		if(typeof ptr !== "undefined" && typeof ptr['dirxml'] === "undefined") return true;
		return false;
	}

	function getFB(){
		if(isFirebug(console)) return console;
		if(isFirebug(this.console)) return this.console;
		if(isFirebug(window.console)) return window.console;
		if(isFirebug(unsafeWindow.console)) return unsafeWindow.console;
		if(isFirebug(unsafeWindow.window.console)) return unsafeWindow.window.console;
		if(isFirebug(window.console)) return window.console;
		
		return undefined;
	}

	function getC2(){
		if(isConsole2(console)) return console;
		if(isConsole2(this.console)) return this.console;
		if(isConsole2(unsafeWindow.console)) return unsafeWindow.console;
		if(isConsole2(unsafeWindow.window.console)) return unsafeWindow.window.console;
		if(isConsole2(window.console)) return window.console;
		
		return undefined;
	}

	function getWC(){
		/*
		if(GM_log){
			if(isWebConsole(GM_log)) return GM_log;
		}
		*/
		if(isWebConsole(unsafeWindow.window.console)) return unsafeWindow.window.console;
		if(isWebConsole(window.console)) return window.console;
		
		return undefined;
	}

	function MUJS_Log(fb_ptr, c2_ptr, wc_ptr){
		var tmp_fb_ptr = (isFirebug(fb_ptr) ? fb_ptr : undefined);
		var tmp_c2_ptr = (isFirebug(c2_ptr) ? c2_ptr : undefined);
		var tmp_wc_ptr = (isFirebug(wc_ptr) ? wc_ptr : undefined);
		return {
			
			'Firebug_ptr':	tmp_fb_ptr,
			'Console2_ptr':	tmp_c2_ptr,
			'WebConsole_ptr':	tmp_wc_ptr,
			
			'OUTPUT_TYPES': OUTPUT_TYPES,
			
			'updateFirebugPtr': function(new_ptr){
				if(typeof this['Firebug_ptr'] === "undefined" && isFirebug(new_ptr)) {
					this.Firebug_ptr = new_ptr;
				}
			},
			
			'updateConsole2Ptr': function(new_ptr){
				if(typeof this['Console2_ptr'] === "undefined" && isConsole2(new_ptr)) {
					this.Console2_ptr = new_ptr;
				}
			},
			
			'updateWebConsolePtr': function(new_ptr){
				if(typeof this['WebConsole_ptr'] === "undefined" && isWebConsole(new_ptr)) {
					this.WebConsole_ptr = new_ptr;
				}
			},
			
			'ConsoleCommand': function(command, value){
				try{
				var args = Array.prototype.slice.call(arguments, 1);
				var safeArgs = mCloneInto(args, unsafeWindow, {
					cloneFunctions: true,
					wrapReflectors: true
				});
				
				if(typeof this.Firebug_ptr !== "undefined" && typeof this.Firebug_ptr[command] !== "undefined")
					this.Firebug_ptr[command].apply(this.Firebug_ptr, safeArgs);
				
				if(typeof this.Console2_ptr !== "undefined" && typeof this.Console2_ptr[command] !== "undefined")
					this.Console2_ptr[command].apply(this.Console2_ptr, safeArgs);
				
				if(typeof this.WebConsole_ptr !== "undefined" && typeof this.WebConsole_ptr[command] !== "undefined")
					this.WebConsole_ptr[command].apply(this.WebConsole_ptr, safeArgs);
				else if(typeof GM_log !== "undefined" && MUJS('get', 'API.log.GM_log') && ['debug', 'log', 'info', 'warning', 'error', 'exception'].indexOf(command.toLowerCase()) != -1){
					// Cannot use function.apply on GM_log
					// Greasemonkey can only handle one argument
					if(args.length == 0) GM_log('');
					else if(args.length == 1) GM_log(args[0]);
					else GM_log(args.join(','));
				}
				}catch(e){
					console.log('ConsoleCommand Error! getUpdateData: ', e.name, e.fileName, e.lineNumber + ':' + e.columnNumber);
					console.log(e);
					console.trace(e);
				}
			},
			
			'outputMessage': function(output_type, str){
				if(output_type.level <= MUJS.config('API.log.verbosity_level'))
					this.ConsoleCommand.apply(this, [output_type.value].concat(Array.prototype.slice.call(arguments, 1)));
			},
			
			'Error': function(category, x){
				this['outputMessage'].apply(this, [OUTPUT_TYPES['ERROR'], "C.CE Error (" + category + ") - " +  x.name + ' - ' + x.message + ' in file <' + x.fileName + '> on line ' + x.lineNumber, x]);
			},
			
			'Exception': function(e){this['outputMessage'].apply(this, [OUTPUT_TYPES['EXCEPTION']].concat(Array.prototype.slice.call(arguments, 0)));},
			
			'logError': this['Error'],
			
			'Warning': function(str){this['outputMessage'].apply(this, [OUTPUT_TYPES['WARNING']].concat(Array.prototype.slice.call(arguments, 0)));},
			
			'Info': function(str){this['outputMessage'].apply(this, [OUTPUT_TYPES['INFO']].concat(Array.prototype.slice.call(arguments, 0)));},
			
			'Log': function(str){this['outputMessage'].apply(this, [OUTPUT_TYPES['LOG']].concat(Array.prototype.slice.call(arguments, 0)));},
			
			'Debug': function(str){this['outputMessage'].apply(this, [OUTPUT_TYPES['DEBUG']].concat(Array.prototype.slice.call(arguments, 0)));},
			
			//'Debug': function(str){this['outputMessage'](OUTPUT_TYPES['DEBUG'], str);},
			
			'table': function(data){this.ConsoleCommand('table', Array.prototype.slice.call(arguments, 0));},
			
			'count': function(title){
				if(MUJS.config('API.log.disabled_functions').indexOf('count') == -1)
					this.ConsoleCommand('count', title);
			},
			
			'startGroup': function(title){
				if(MUJS.config('API.log.disabled_functions').indexOf('startGroup') == -1 && MUJS.config('API.log.disabled_functions').indexOf('groupEnd') == -1 && MUJS.config('API.log.disabled_functions').indexOf('groupCollapsed') == -1)
					this.ConsoleCommand('group', title);
			},
			
			'endGroup': function(){
				if(MUJS.config('API.log.disabled_functions').indexOf('startGroup') == -1 && MUJS.config('API.log.disabled_functions').indexOf('groupEnd') == -1 && MUJS.config('API.log.disabled_functions').indexOf('groupCollapsed') == -1)
					this.ConsoleCommand('groupEnd');
			},
			
			'groupCollapsed': function(title){
				if(MUJS.config('API.log.disabled_functions').indexOf('startGroup') == -1 && MUJS.config('API.log.disabled_functions').indexOf('groupEnd') == -1 && MUJS.config('API.log.disabled_functions').indexOf('groupCollapsed') == -1)
					this.ConsoleCommand('groupCollapsed', title);
			},
			
			'time': function(name){
				if(MUJS.config('API.log.disabled_functions').indexOf('time') == -1 && MUJS.config('API.log.disabled_functions').indexOf('timeEnd') == -1)
					this.ConsoleCommand('time', name);
			},
			
			'timeEnd': function(name){
				if(MUJS.config('API.log.disabled_functions').indexOf('time') == -1 && MUJS.config('API.log.disabled_functions').indexOf('timeEnd') == -1)
					this.ConsoleCommand('timeEnd', name);
			},
			
			'timeStamp': function(name){
				if(MUJS.config('API.log.disabled_functions').indexOf('timeStamp') == -1)
					this.ConsoleCommand('timeStamp', name);
			},
			
			'assert': function(expression, obj){
				if(MUJS.config('API.log.disabled_functions').indexOf('assert') == -1)
					this.ConsoleCommand.apply(this, ['assert'].concat(Array.prototype.slice.call(arguments, 0)));
			},
			
			'trace': function(){
				if(MUJS.config('API.log.disabled_functions').indexOf('trace') == -1)
					this.ConsoleCommand('trace');
			},
			
			'clear': function(){
				if(MUJS.config('API.log.disabled_functions').indexOf('clear') == -1)
					this.ConsoleCommand('clear');
			},
			
			'profile': function(name){
				if(MUJS.config('API.log.disabled_functions').indexOf('profile') == -1 && MUJS.config('API.log.disabled_functions').indexOf('profileEnd') == -1)
					this.ConsoleCommand.apply(this, ['profile'].concat(Array.prototype.slice.call(arguments, 0)));
			},
			
			'profileEnd': function(){
				if(MUJS.config('API.log.disabled_functions').indexOf('profile') == -1 && MUJS.config('API.log.disabled_functions').indexOf('profileEnd') == -1)
					this.ConsoleCommand.apply(this, ['profileEnd'].concat(Array.prototype.slice.call(arguments, 0)));
			}
			
		}
	}
	
	function UpdateAllPtrs(){
		MUJS.API.MUJS_Log.updateFirebugPtr(getFB());
		MUJS.API.MUJS_Log.updateConsole2Ptr(getC2());
		MUJS.API.MUJS_Log.updateWebConsolePtr(getWC());
	}
	
	var MUJS_Log_Functions = [
		'Debug',
		'Log',
		'Info',
		'Warning',
		//'Error'
	];

	MUJS.API.fn.MUJS_Log = new MUJS_Log(getFB(), getC2(), getWC());
	//MUJS['API']['MUJS_Log'].Log
	MUJS.fn.log = MUJS.API.MUJS_Log;
	MUJS.fn.log.UpdateAllPtrs = UpdateAllPtrs;
	
	for(var i = 0; i < MUJS_Log_Functions.length; i++){
		MUJS.fn[MUJS_Log_Functions[i]] = (MUJS.API.MUJS_Log[MUJS_Log_Functions[i]]).bind(MUJS.API.MUJS_Log);
	}