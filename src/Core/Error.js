// +@display_name  Error
// +@history (0.0.9) History begins.
	
	RequireScript('Core.Error.UserError');
	
	RequireScript('Core.Error.jModError');
	
	jMod['ERROR'] = new (function(){
	
		this.ERROR_CODES = {
			ERROR_RESULT: {
				FATAL:          0x100000
			},
			ERROR_NAME: {
				EVALERROR:      0x010000,
				INTERNALERROR:  0x020000,
				RANGEERROR:     0x030000,
				REFERENCEERROR: 0x040000,
				SYNTAXERROR:    0x050000,
				TYPEERROR:      0x060000,
				URIERROR:       0x070000
			}
		}
		
		Object.defineProperties(this.ERROR_CODES, props);
		
		Object.defineProperty(this.ERROR_CODES, "get", {
			value: function(key, value){
				if(typeof value === "undefined"){
					return jMod.ERROR.ERROR_CODES.SearchForKey(key);
				} else {
					return jMod.ERROR.ERROR_CODES.setKeyValue(key, value);
				}
			},
			enumerable: false
		});
		
		
		this.getCode = function(key){
			var val = this.ERROR_CODES.get(key);
			if(typeof val !== "undefined"){
				return Number(val.toString(2));
			}
			return undefined;
		};
		

	
		var defaultFilter = function(message, url, linenumber, colNumber, eObj, stackInfo){
			try{
				if(jConfig('script.script_info.userscript_full_file_name') == stackInfo[0].fileName){
					console.log('Error is from userscript!');
					
					switch(eObj.name){
						case 'EvalError':
						case 'InternalError':
						case 'RangeError':
						case 'ReferenceError':
						case 'SyntaxError':
						case 'TypeError':
						case 'URIError':
						default:
							//return true;
							break;
					}
					
					return true;
				}
			}catch(e){}
			finally{
				return false;
			}
		}
	
		this.send = function(data){
			try {
				var mData = jMod.extend(true, {}, jMod.Config.Update, data);
				
				if(typeof mData.args === "undefined")
					mData.args = {};
				
				if(typeof mData.args['scriptError'] === "undefined")
					mData.args['scriptError'] = '1';
				
				if(typeof mData.args['scriptErrorCode'] === "undefined")
					mData.args['scriptErrorCode'] = '-1';
				
				mData.getType = 'none';
				mData.noDownload = true;
				
				return jMod['UPDATE']['sendRequest'](mData);
			} catch(e) {
				console.log('Error! Error.send: ', e);
				return undefined;
			}
		}
		
		this.catchError = function(message, url, linenumber, colNumber, eObj, stackInfo){
			try{
				//console.log('catchError', message, url, linenumber, colNumber, eObj.fileName);
				console.log('stackInfo', stackInfo)
				if(typeof eObj !== "undefined" && typeof eObj.stack !== "undefined"){
					//var stackInfo = jMod['ERROR'].parseStack(eObj.stack);
					
					//console.log('catchError', message, url, linenumber, colNumber, stackInfo);
					//console.log('message', message);
					//console.log('eObj', eObj);
					//console.trace(eObj);
					var args = Slice.call(arguments, 0);
					if(jConfig('Error.autoReportErrors')){
						var filter = (jConfig('Error.errorFilter')).apply(this, args)
						if(filter){
							//return false;
							var opts = {
								getType: 'none',
								args: {
									
								}
							};
							
							opts.args.scriptErrorLineNumber = linenumber;
							opts.args.scriptErrorColNumber = colNumber;
							
							switch(typeof filter){
								case "object":
									opts.args = merge(opts.args, filter);
									break;
								case "number":
								case "string":
									opts.args.scriptError = filter;
									break;
								case "boolean":
									opts.args.scriptError = "1";
									break;
							}
							
							//jMod['ERROR']['send'](opts);
						}
					}
				}
			}catch(e){}
			
			//if(jMod['ERROR']['origErrorHandler'])
				//return jMod['ERROR']['origErrorHandler'].apply(this, args);
			return false;
		}
		
		this.processError = function(e){
			//console.log('e.stack', e.stack);
			//console.log('e.stack', jMod['ERROR'].parseStack(e.stack));
			var tStack = '';
			try{
				tStack = e.stack.toString();
			}catch(e){}
				
			var data = {
				message: e.message,
				name: e.name,
				fileName: e.fileName,
				lineNumber: e.lineNumber,
				columnNumber: e.columnNumber,
				stack: tStack
			};
			
			return jMod['ERROR']['catchError'](e.message, e.fileName, e.lineNumber, e.columnNumber, data, jMod.parseStack(tStack));
		}
		

	})();
	
	//console.log('EVALERROR', jMod['ERROR'].getCode('ERROR_NAME.EVALERROR'));
	//console.log('REFERENCEERROR', jMod['ERROR'].getCode('ERROR_NAME.REFERENCEERROR'));
	//console.log('URIERROR', jMod['ERROR'].getCode('ERROR_NAME.URIERROR'));
	
	function _jModListenError(message, url, linenumber, colNumber, data) {
		console.log('jModListenError', message, url, linenumber, colNumber);
		var tData = jMod.parseStack(data.stack);
		if(tData.length > 0)
			return jMod['ERROR']['catchError'](message, url, linenumber, colNumber, data, tData);
	}
	
	mExportFunction(_jModListenError, unsafeWindow, {
		defineAs: "jModListenError",
		allowCallbacks: true,
		allowCrossOriginArguments: true
	});
	
	var onErrorFunction = function(){
		// Handle min renaming
		//var win = typeof document !== "undefined" ? document.defaultView : typeof window !== "undefined" ? window : unsafeWindow;
		var win = 
				typeof this.document !== "undefined" ? this.document.defaultView :
				typeof document !== "undefined" ? document.defaultView :
				this.top != null ? this :
				null;
		//var console = this.console != null ? this.console : win.console;
		var console = win.console != null ? win.console : this.console;
		if(win._jModErrorHandlerStack)
			return;
		
		win._origErrorHandler = win.onerror;
		win._jModErrorHandlerStack = [];
		
		function jModGlobalErrorHandler(message, url, linenumber, colNumber, eObj){
			var win = typeof document !== "undefined" ? document.defaultView : (this.top != null ? this : null);
			var console = this.console != null ? this.console : win.console;
			console.log("tErrHandle", message, url, linenumber, eObj);
			try {
				var data = {}, tStack = "";
				if(eObj){
					try{
						//tStack = eObj.stack.toString();
						tStack = String(eObj.stack);
					}catch(e){
						console.log('Error eObj.stack.toString', e);
					};
					data = {
						message: eObj.message,
						name: eObj.name,
						fileName: eObj.fileName,
						lineNumber: eObj.lineNumber,
						columnNumber: eObj.columnNumber,
						stack: tStack,
						url: url
					};
				} else {
					data = {
						message: message,
						name: null,
						fileName: null,
						lineNumber: linenumber,
						columnNumber: colNumber,
						stack: tStack,
						url: url
					};
				}
				var fn;
				if(typeof jModListenError !== "undefined")
					fn = jModListenError;
				else if(win.jModListenError)
					fn = win.jModListenError;
				else
					fn = document.defaultView.jModListenError;
				fn(message, url, linenumber, colNumber, data);
			} catch(e) {
				console.log('error calling jModListenError', e, win);
			}
			
			for(var i = win._jModErrorHandlerStack.length - 1; i >= 0; i--){
				try{
					if(win._jModErrorHandlerStack[i].apply(this, arguments) === true)
						return true;
				}catch(e){
					console.log("Error processing error handler", win._jModErrorHandlerStack[i]);
				}
			}
			try{
				if(win._origErrorHandler)
					return win._origErrorHandler.apply(this, arguments);
			}catch(e){}
			
			return false;
		}
		
		// Overwrite any existing error handler
		win.onerror = jModGlobalErrorHandler;
		
		try{
			// Prevent new handler from being overwritten
			// Cannot use defineProperty
			// ONLY OVERWRITE SETTER!
			//if(win.__lookupSetter__('onerror').name == "onerror"){
				win.__defineSetter__("onerror", function(fn){
					// Add to handler stack
					win._jModErrorHandlerStack.push(fn);
				});
			//}
		}catch(e){};
		
	}
	//onErrorFunction(window, console);
	//onErrorFunction(window || unsafeWindow, console);
	//jMod.API.contentEval(onErrorFunction);