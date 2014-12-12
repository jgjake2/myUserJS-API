// +@display_name  Error
// +@replace  MUJS.ERROR
// +@history (0.0.9) History begins.

	//MUJS['ERROR'] = {
	MUJS.fn['ERROR'] = new function(){
	
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
					return MUJS.ERROR.ERROR_CODES.SearchForKey(key);
				} else {
					return MUJS.ERROR.ERROR_CODES.setKeyValue(key, value);
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
				if(MUJS.config('Update.script_info.userscript_file_name') == stackInfo[0].fileName){
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
				var mData = merge({}, MUJS.Config.Update, data);
				
				if(typeof mData.args === "undefined")
					mData.args = {};
				
				if(typeof mData.args['scriptError'] === "undefined")
					mData.args['scriptError'] = '1';
				
				if(typeof mData.args['scriptErrorCode'] === "undefined")
					mData.args['scriptErrorCode'] = '-1';
				
				mData.getType = 'none';
				mData.noDownload = true;
				
				return MUJS['UPDATE']['sendRequest'](mData);
			} catch(e) {
				console.log('Error! Error.send: ', e);
				return undefined;
			}
		}
		
		this.catchError = function(message, url, linenumber, colNumber, eObj, stackInfo){
			try{
				//console.log('catchError', message, url, linenumber, colNumber, eObj.fileName);
				if(typeof eObj !== "undefined" && typeof eObj.stack !== "undefined"){
					//var stackInfo = MUJS['ERROR'].parseStack(eObj.stack);
					
					//console.log('catchError', message, url, linenumber, colNumber, stackInfo);
					//console.log('message', message);
					//console.log('eObj', eObj);
					//console.trace(eObj);
					var args = Array.prototype.slice.call(arguments, 0);
					if(MUJS.config('Error.autoReportErrors')){
						var filter = (MUJS.config('Error.errorFilter')).apply(this, args)
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
							
							//MUJS['ERROR']['send'](opts);
						}
					}
				}
			}catch(e){}
			
			//if(MUJS['ERROR']['origErrorHandler'])
				//return MUJS['ERROR']['origErrorHandler'].apply(this, args);
			return false;
		}
		
		this.processError = function(e){
			//console.log('e.stack', e.stack);
			//console.log('e.stack', MUJS['ERROR'].parseStack(e.stack));
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
			
			return MUJS['ERROR']['catchError'](e.message, e.fileName, e.lineNumber, e.columnNumber, data, MUJS['ERROR'].parseStack(tStack));
		}
		
		this.parseStack = function(stackText){
			var o = [];
			var anonFunctionPatt = /\@((?:https?\:\/\/)?[^\s\:]+).*?([^\:\s]*)?\:(\d+)(?:\:(\d+))?\s*$/gi;
			var stackPatt = /([^\s]*)\@file\:\/\/\/([^\s]+?(?:\/([^\/]+?\.(user\.js|js|json|php)))?):(\d+)(?:\:(\d+))?/gi;
			var match;
			while ((match = stackPatt.exec(stackText)) != null) {
				var tmp = {
					functionName: match[1],
					fullFileName: match[2],
					fileName: match[3],
					fileExt: match[4],
					lineNumber: match[5],
					columnNumber: match[6]
				};
				o.push(tmp);
			}
			return o;
			
		}
	}
	
	//console.log('EVALERROR', MUJS['ERROR'].getCode('ERROR_NAME.EVALERROR'));
	//console.log('REFERENCEERROR', MUJS['ERROR'].getCode('ERROR_NAME.REFERENCEERROR'));
	//console.log('URIERROR', MUJS['ERROR'].getCode('ERROR_NAME.URIERROR'));
	
	function MUJSListenError(message, url, linenumber, colNumber, data) {
		console.log('MUJSListenError', message, url, linenumber, colNumber);
		//console.log('MUJSListenError data', data);
		//setTimeout(function(message, url, linenumber, colNumber, data){
			var tData = MUJS['ERROR']['parseStack'](data.stack);
			if(tData.length > 0)
				return MUJS['ERROR']['catchError'](message, url, linenumber, colNumber, data, tData);
		//}, 1, message, url, linenumber, colNumber, data);
	}
	
	mExportFunction(MUJSListenError, unsafeWindow, {
		defineAs: "MUJSListenError",
		allowCallbacks: true,
		allowCrossOriginArguments: true
	});
	
	var onErrorFunction = function(){
		window.oldHandle = window.onerror;
		window.onerror = function(message, url, linenumber, colNumber, eObj){
			//console.log('tErrHandle', message, url, linenumber);
			try{
				var args = Array.prototype.slice.call(arguments, 0);
				var tStack = '';
				try{
					tStack = eObj.stack.toString();
				}catch(e){};
				var data = {
					message: eObj.message,
					name: eObj.name,
					fileName: eObj.fileName,
					lineNumber: eObj.lineNumber,
					columnNumber: eObj.columnNumber,
					stack: tStack
				};
				//console.log('eobj.stack', eObj.stack);
				if(MUJSListenError(message, url, linenumber, colNumber, data))
					return true;
			}catch(e){}
			finally {
				if(window.oldHandle)
					return window.oldHandle.apply(this, args);
				return false;
			}
		}
		/*
		setTimeout(function(){
			eval("eval('FAIL')");
			var fofo = baba(tko);
		}, 500);
		*/
	};
	/*
	setTimeout(function(){
	MUJS.API.contentEval(onErrorFunction);
	}, 1000);
	*/
	//setTimeout(MUJS.API.contentEval, 1000, onErrorFunction);