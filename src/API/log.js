// +@display_name  Log
// +@history (0.0.9) History begins.
// +@history (0.0.13) Fixed output to the Web Console using GM_log.
// +@history (0.0.14) Removed "Debug" from list of functions mapped to jMod.
// +@history (0.0.14) Minor fixes / improvements.
// +@history (0.0.15) Removed ref to jMod.fn (__proto__ is depreciated).
// +@history (0.0.16) Consolidated similar functions.
// +@history (0.0.16) Added dir and dirxml functions.
// +@history (0.0.17) Updated format builder to include integer types.
// +@history (0.0.17) Updated format builder to handle arguments without a type as an object without including it in the format string.
// +@history (0.0.17) Added a jMod specific Warning and Info logger.

/**
 * A logging interface that allows safe console interactions. It can handle permission/scope problems and multiple console instances.<br /><br />
 * <b>Multiple consoles</b> - Userscripts executing before the DOM exists (@run-at document-start) can cause some problems with the console.
 * Sometimes firebug is unavailable at document-start and console commands are only run by the Web Console. But once firebug initiates,
 * it can be greedy and the Web Console no longer runs your console commands. So you wind up with two windows, each with half the information.<br /><br />
 * This logging interface fixes these issue by isolating the individual console instances, and making sure the maximum amount of information
 * is sent to each of them<br /><br />
 * It also features varying <b>Verbosity Levels</b> and specific functions can be enabled / disabled.
 * @namespace log
 * @memberof jMod.API
 */

+function(){
	var i;
	var OUTPUT_TYPES = {
		'ERROR':     {level: 1,	value: 'error'     },
		'EXCEPTION': {level: 1,	value: 'exception' },
		'WARNING':   {level: 2,	value: 'warn'      },
		'INFO':      {level: 3,	value: 'info'      },
		'LOG':       {level: 4,	value: 'log'       },
		'DEBUG':     {level: 5,	value: 'debug'     }
	}
	
	var msgList = [
		['Error', 'ERROR'],
		['logError', 'ERROR'],
		['Exception', 'EXCEPTION'],
		['Warning', 'WARNING'],
		['Info', 'INFO'],
		['Log', 'LOG'],
		['Debug', 'DEBUG'],
	];
	
	var fnList = [
		'assert',
		'clear',
		'count',
		'dir',
		'dirxml',
		'group',
		'groupCollapsed',
		'groupEnd',
		'profile',
		'profileEnd',
		'table',
		'time',
		'timeEnd',
		'timeStamp',
		'trace',
	];
	
	var exportFunctions = [
		'Debug',
		'Log',
		'Info',
		'Warning',
		'logError',
		'Exception'
	];

	function isFirebug(ptr){
		if(_undefined!==typeof ptr && _undefined!== typeof ptr.timeStamp) return true;
		return false;
	}

	function isWebConsole(ptr){
		if(RealTypeOf(ptr) == "console") return true;
		if(_undefined!==typeof ptr&&!isFirebug(ptr)&&_undefined===typeof ptr.dirxml&&_undefined!==typeof ptr.trace) return true;
		return false;
	}

	function isConsole2(ptr){
		if(_undefined!==typeof ptr&&!isFirebug(ptr)&&!isWebConsole(ptr)&&_undefined===typeof ptr.dirxml&&_undefined===typeof ptr.exception) return true;
		return false;
	}
	
	function checkConsole(fn){
		if(fn(console)) return console;
		if(fn(this.console)) return this.console;
		if(fn(window.console)) return window.console;
		if(fn(unsafeWindow.console)) return unsafeWindow.console;
		if(fn(unsafeWindow.window.console)) return unsafeWindow.window.console;
		
		return undefined;
	}

	function getFB(){
		return checkConsole(isFirebug);
	}

	function getC2(){
		return checkConsole(isConsole2);
	}

	function getWC(){
		return checkConsole(isWebConsole);
	}
	
	function functionEnabled(name){
		return ((jConfig('API.log.disabled').indexOf(name) == -1) && jConfig('API.log.verbosity_level') > 1);
	}
	
	jMod.log = jMod.API.log = {
		'OUTPUT_TYPES': OUTPUT_TYPES,
		fb: undefined,
		c2: undefined,
		wc: undefined,
		
		fnList: ([].concat(exportFunctions, fnList)),

		updateFB: function(new_ptr){
			if(isFirebug(new_ptr)) {
				if(jConfig('API.log.debug'))
					console.info('jMod.API.log - Firebug Object: ', new_ptr);
				this.fb = new_ptr;
			}
		},
		
		updateC2: function(new_ptr){
			if(isConsole2(new_ptr)) {
				if(jConfig('API.log.debug'))
					console.info('jMod.API.log - Console2 Object: ', new_ptr);
				this.c2 = new_ptr;
			}
		},
		
		updateWC: function(new_ptr){
			if(isWebConsole(new_ptr)) {
				if(jConfig('API.log.debug'))
					console.info('jMod.API.log - Web Console Object: ', new_ptr);
				this.wc = new_ptr;
			}
		},
		
		UpdateAll: function(){
			this.updateFB(getFB());
			this.updateC2(getC2());
			this.updateWC(getWC());
		},
		
		// For commands you can't call .apply on (like when an error object is involved)
		ScopedConsoleCommand: function(command, value){
			var isFormatted = (['debug','log','info','warn','error','exception'].indexOf(command)!=-1&&"string"==typeof value&&/(?:\%s|\%c|\%o|\%d|\%f|\%\.\df|\%i)/.test(value)); // Don't use GM_log on formatted logs
			var ptr = (isFormatted || (_undefined!=this.fb && _undefined!=typeof this.fb[command])? this.fb : this.wc);
			if(_undefined==typeof ptr[command])
				return false;
			try{
			switch(arguments.length){
				case 1:
					ptr[command].call(ptr);
					break;
				case 2:
					ptr[command].call(ptr, arguments[1]);
					break;
				case 3:
					ptr[command].call(ptr, arguments[1], arguments[2]);
					break;
				case 4:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3]);
					break;
				case 5:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4]);
					break;
				case 6:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
					break;
				case 7:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
					break;
				case 8:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
					break;
				case 9:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]);
					break;
				case 10:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);
					break;
				case 11:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10]);
					break;
				case 12:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11]);
					break;
				case 13:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12]);
					break;
				case 14:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13]);
					break;
				case 15:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14]);
					break;
				case 16:
					ptr[command].call(ptr, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14], arguments[15]);
					break;
				default:
					return false;
					break;
			}
			}catch(e){
				return false;
			}
			return true;
		},
		
		ConsoleCommand: function(command, value){
			try{
				var args = Slice.call(arguments, 1);
				var safeArgs = mCloneInto(args, unsafeWindow, {
					cloneFunctions: true,
					wrapReflectors: true
				});
				
				var isFormatted = (['debug','log','info','warn','error','exception'].indexOf(command)!=-1&&"string"==typeof value&&/(?:\%s|\%c|\%o|\%d|\%f|\%\.\df|\%i)/.test(value)); // Don't use GM_log on formatted logs
				
				try{
					if(typeof this.fb !== _undefined && typeof this.fb[command] !== _undefined && jConfig('API.log.Firebug')){
						this.fb[command].apply(this.fb, args);
					} else {
						if(!isFormatted&&typeof this.wc !== _undefined && typeof this.wc[command] !== _undefined && jConfig('API.log.WebConsole'))
							this.wc[command].apply(this.wc, args);
					}
				}catch(e){
					if(typeof this.fb !== _undefined && typeof this.fb[command] !== _undefined && jConfig('API.log.Firebug')){
						this.fb[command].apply(this.fb, safeArgs);
					} else {
						if(!isFormatted&&typeof this.wc !== _undefined && typeof this.wc[command] !== _undefined && jConfig('API.log.WebConsole'))
							this.wc[command].apply(this.wc, safeArgs);
					}
				}
				
				// disabled for now
				/*
					if(typeof this.c2 !== _undefined && typeof this.c2[command] !== _undefined)
						this.c2[command].apply(this.c2, safeArgs);
						//this.WebConsole_ptr[command].apply(this.WebConsole_ptr, safeArgs);
					if(typeof GM_log !== _undefined && jConfig('API.log.GM_log') && ['debug', 'log', 'info', 'warning', 'error', 'exception'].indexOf(command.toLowerCase()) != -1){
						// Cannot use function.apply on GM_log
						// Greasemonkey can only handle one argument
						if(args.length == 0) GM_log('');
						else if(args.length == 1) GM_log(args[0]);
						else GM_log(JSON.stringify(args));
					}
					
				}
				*/
			}catch(e){
				//console.log('ConsoleCommand Error! getUpdateData: ', e.name, e.fileName, e.lineNumber + ':' + e.columnNumber, e);
				console.error(e);
			}
		},
		
		outputMessage: function(output_type, str){
			if(output_type.level <= jConfig('API.log.verbosity_level'))
				this.ConsoleCommand.apply(this, [output_type.value].concat(Slice.call(arguments, 1)));
		},
		
		fmt: {
			//timePatt: '%.3fms',
			time: 'font-weight:bold;font-size:120%;color:red;',
			
			stchange: 'font-weight:bold;font-size:130%;color:blue;',
			
			iconStyle: 'font-size:175%;background-image:url("http://myuserjs.org/img/favicon/favicon.png");background-size:auto 75%;background-repeat: no-repeat;background-position:left center;',
			
			infoDefaultStyle: ' ',
			infoHeaderStyle: 'font-size:175%;font-weight:300;font-family:"Sansation","Open Sans",Arial;',
			infoTitleStyle: 'color:#000;font-size:125%;',
			infoTextStyle: 'font-weight:bold;font-size:120%;color:blue;',
			
			warningDefaultStyle: ' ',
			warningHeaderStyle: 'font-size:175%;font-weight:300;font-family:"Sansation","Open Sans",Arial;',
			warningTitleStyle: 'color:#000;font-size:125%;',
			warningTextStyle: 'font-weight:bold;font-size:120%;color:red;'
		}
	};
	
	for(i = 0; i < msgList.length; i++){
		jMod.API.log[msgList[i][0]] = (function(oType){
			return (function(){return this.outputMessage.apply(this, [OUTPUT_TYPES[oType]].concat(Slice.call(arguments)));}).bind(jMod.API.log);
		})(msgList[i][1]);
	}
	
	for(i = 0; i < fnList.length; i++){
		jMod.API.log[fnList[i]] = (function(fName){
			return (function(){if(functionEnabled(fName))return this.ConsoleCommand.apply(this, [fName].concat(Slice.call(arguments)));}).bind(jMod.API.log);
		})(fnList[i]);
	}
	
	for(i = 0; i < exportFunctions.length; i++)
		jMod[exportFunctions[i]] = (jMod.log[exportFunctions[i]]).bind(jMod.API.log);
	
	
	jMod.API.logFormatBuilder = function(){
		this.args = [];
		
		this.add = function(value, type, style){
			var isUndef = _undefined===typeof value,
				origType = typeof type;
			if(typeof type === _undefined) type = typeof value;
			var fmtType;
			switch(type){
				case "d":
				case "%d":
					fmtType = "%d";
					break;
				case "i":
				case "%i":
					fmtType = "%i";
					break;
				case "f":
				case "%f":
					fmtType = "%.2f";
					break;
				case "number":
					if(parseInt(value) === value && value === +value){
						fmtType = "%d";
						value = parseInt(value);
					} else {
						fmtType = "%.2f";
						value = parseFloat(value);
					}
					break;
				case "s":
				case "%s":
					if(value == "\n" || value == " \n"){
						fmtType = " \n";
						value = undefined;
						style = undefined;
						isUndef = false;
					} else
						fmtType = "%s";
					break;
				case "string":
					fmtType = value;
					value = undefined;
					isUndef = false;
					break;
				case "o":
				case "%o":
					fmtType = "%o";
					break;
				case "object":
				default:
					if(origType==_undefined && _undefined==typeof style)
						fmtType = "";
					else
						fmtType = "%o";
					break;
			}
			
			this.args.push({
				valueIsUndefined: isUndef,
				value: value,
				fmtString: fmtType,
				style: style
			});
		}
		
		this.build = function(){
			var fmtString = '';
			
			var arr = [];
			
			for(var i = 0; i < this.args.length; i++){
				fmtString += (typeof this.args[i].style !== "undefined" ? '%c' : '') + this.args[i].fmtString;
				if(typeof this.args[i].style !== "undefined")
					arr.push(this.args[i].style != "" ? this.args[i].style : " ");
					
				if(typeof this.args[i].value !== "undefined" || this.args[i].valueIsUndefined)
					arr.push(this.args[i].value);
			}
			
			return [fmtString].concat(arr);
		}
	};
		
	jMod.log.UpdateAll();
		
}();

var jModError = function(e, title, message){
	var errorDefaultStyle = '';
	//var ErrorIconURL = 'http://www.shedworx.com/files/images/error.png';
	//var ErrorIconURL = 'http://myuserjs.org/img/favicon/favicon.png';
	//var errorIconStyle = 'font-size:175%;background-image:url("'+ErrorIconURL+'");background-size:auto 75%;background-repeat: no-repeat;background-position:left center;';
	
	var errorHeaderStyle = 'font-size:175%;font-weight:300;font-family:"Sansation","Open Sans",Arial;';
	
	var errorTitleStyle = 'color:#000;font-size:125%;';
	
	var errorLineStyle = 'color:blue;';
	
	// Have to get around scope/permission problems when dealing with "e"
	// Cannot use .apply when using greasemonkey!!
	if(typeof e !== _undefined && e !== null){
		if(arguments.length <= 3){
			jMod.log.ScopedConsoleCommand.call(jMod.log,
				'error',
				'%c%s%cjMod Error%c - %c%s \n%s \n%c%s - %c(line %d)',
				errorDefaultStyle + jMod.log.fmt.iconStyle, // Icon Style
				'  ', // Icon
				errorDefaultStyle + errorHeaderStyle, // Header Style
				' ', // Header
				errorDefaultStyle + errorTitleStyle, // Title Style
				(title || ' '), // Title
				(message || ' '), // Message
				errorDefaultStyle + ' ', // e.Message Style
				e.message, // e.Message
				errorDefaultStyle + errorLineStyle, // Line Number Style
				e.lineNumber, // Line Number
				e
			);
		} else {
			jMod.log.ScopedConsoleCommand.call(jMod.log,
				'error',
				'%c%s%cjMod Error%c - %c%s \n%s \n%c%s - %c(line %d)',
				errorDefaultStyle + jMod.log.fmt.iconStyle, // Icon Style
				'  ', // Icon
				errorDefaultStyle + errorHeaderStyle, // Header Style
				' ', // Header
				errorDefaultStyle + errorTitleStyle, // Title Style
				(title || ' '), // Title
				(message || ' '), // Message
				errorDefaultStyle + ' ', // e.Message Style
				e.message, // e.Message
				errorDefaultStyle + errorLineStyle, // Line Number Style
				e.lineNumber, // Line Number
				e,
				arguments[3]
			);
		}
	} else {
		jMod.log.ScopedConsoleCommand.apply(jMod.log,[
				'error',
				'%c%s%cjMod Error%c - %c%s \n%s',
				errorDefaultStyle + jMod.log.fmt.iconStyle, // Icon Style
				'  ', // Icon
				errorDefaultStyle + errorHeaderStyle, // Header Style
				' ', // Header
				errorDefaultStyle + errorTitleStyle, // Title Style
				(title || ' '), // Title
				(message || ' ') // Message
			].concat(Slice.call(arguments,3))
		);

	}
};

var jModLogWarning = function(title, text){
	if(jMod.log.OUTPUT_TYPES.WARNING.level > jConfig('API.log.verbosity_level'))
		return;
		
	var i = 2,
		warningDefaultStyle = jMod.log.fmt.warningDefaultStyle,
		fmtBuild = new jMod.API.logFormatBuilder();
		
	fmtBuild.add('  ', "%s", warningDefaultStyle + jMod.log.fmt.iconStyle);
	fmtBuild.add('jMod Warning', "string", warningDefaultStyle + jMod.log.fmt.warningHeaderStyle);
	if(_undefined!==typeof text){
		fmtBuild.add(' - ', "string", warningDefaultStyle);
		fmtBuild.add(title || ' ', "%s", warningDefaultStyle + jMod.log.fmt.warningTitleStyle);
		fmtBuild.add(" \n", "string");
		fmtBuild.add(text || '', "%s", warningDefaultStyle + jMod.log.fmt.warningTextStyle);
	} else {
		fmtBuild.add(" \n", "string");
		fmtBuild.add(title || '', "%s", warningDefaultStyle + jMod.log.fmt.warningTextStyle);
	}
	
	if(arguments.length > 2)
		fmtBuild.add(" \n", "string");
		
	for(i; i < arguments.length; i++){
		fmtBuild.add(arguments[i]);
	}
	
	jMod.Warning.apply(jMod.log,fmtBuild.build());
}

var jModLogInfo = function(title, text){
	if(jMod.log.OUTPUT_TYPES.INFO.level > jConfig('API.log.verbosity_level'))
		return;
		
	var i = 2,
		infoDefaultStyle = jMod.log.fmt.infoDefaultStyle,
		fmtBuild = new jMod.API.logFormatBuilder();
		
	fmtBuild.add('  ', "%s", infoDefaultStyle + jMod.log.fmt.iconStyle);
	fmtBuild.add('jMod', "string", infoDefaultStyle + jMod.log.fmt.infoHeaderStyle);
	if(_undefined!==typeof text){
		fmtBuild.add(' - ', "string", infoDefaultStyle);
		fmtBuild.add(title || ' ', "%s", infoDefaultStyle + jMod.log.fmt.infoTitleStyle);
		fmtBuild.add(" \n", "string");
		fmtBuild.add(text || '', "%s", infoDefaultStyle + jMod.log.fmt.infoTextStyle);
	} else {
		fmtBuild.add(" \n", "string");
		fmtBuild.add(title || '', "%s", infoDefaultStyle + jMod.log.fmt.infoTextStyle);
	}
	
	if(arguments.length > 2)
		fmtBuild.add(" \n", "string");
		
	for(i; i < arguments.length; i++){
		fmtBuild.add(arguments[i]);
	}
	
	jMod.Info.apply(jMod.log,fmtBuild.build());
}

var jModLogTime = function(title, prefix, suffix){
	if(jMod.log.OUTPUT_TYPES.INFO.level > jConfig('API.log.verbosity_level'))
		return;
	var text = (prefix || '') +  jMod.timeElapsed.toFixed(2) + 'ms' + (suffix || '');
	
	var infoDefaultStyle = jMod.log.fmt.infoDefaultStyle;
	
	var fmtBuild = new jMod.API.logFormatBuilder();
	fmtBuild.add('  ', "%s", infoDefaultStyle + jMod.log.fmt.iconStyle);
	fmtBuild.add('jMod', "string", infoDefaultStyle + jMod.log.fmt.infoHeaderStyle);
	fmtBuild.add(' - ', "string", infoDefaultStyle);
	fmtBuild.add(title || ' ', "%s", infoDefaultStyle + jMod.log.fmt.infoTitleStyle);
	fmtBuild.add(' ', "string");
	fmtBuild.add(text, "%s", infoDefaultStyle + jMod.log.fmt.time);
	
	jMod.Info.apply(jMod.log,fmtBuild.build());
}