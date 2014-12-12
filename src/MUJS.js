// ==UserScript==
// @name             MUJS
// @namespace        http://myuserjs.org/
// @author           jgjake2
// @homepage         http://myuserjs.org/
// @include          *
// @version          {{{API_VERSION}}}
// @grant            unsafeWindow
// @grant            GM_info
// @grant            GM_log
// @grant            GM_getMetadata
// @grant            GM_xmlhttpRequest
// @grant            GM_registerMenuCommand
// @unwrap
// @run-at document-start
// @history         (0.0.11) Added XMLHttpRequest for update checks / stat collecting
// @history         (0.0.11) Enabled function calls through MUJS() function
// @history         (0.0.10) Speed / safety improvements
// @history         (0.0.9) History begins.
// ==/UserScript==

if(typeof unsafeWindow === "undefined") unsafeWindow = window;
MUJS = function(arg1, arg2){return MUJS.init.apply(MUJS, Array.prototype.slice.call(arguments, 0));};

(function(MUJS, $){
	var mujsAPILoadStart = -1;
	var mujsAPILoadEnd = -1;
	if(typeof unsafeWindow.performance !== "undefined" && typeof unsafeWindow.performance.timing !== "undefined")
		mujsAPILoadStart = unsafeWindow.performance.now();
		
	MUJS.__defineGetter__("version", function() { return '{{{API_VERSION}}}'; });
	MUJS.__defineGetter__("build_time", function() { return '{{{BUILD_TIME}}}'; });
	MUJS['fn']=MUJS.__proto__;
	MUJS.API=new function(){this['fn']=this.__proto__;};
	
	MUJS.fn.init = function(){
		var args = Array.prototype.slice.call(arguments, 0);
		try{
			if(args.length > 0){
				
				// Commands
				if(typeof args[0] === "string"){
					if(args[0] == 'get')
						return MUJS.config(args[1]);
						
					if(args[0] == 'set')
						return MUJS.config(args[1], args[2]);
					
				} else if(typeof args[0] === "object") {
					// GM_info object
					if(typeof args[0]['ginfo'] !== "undefined"){
						return MUJS.setScriptInfo.apply(MUJS, args);
					}
				
				}

				
			}
		}catch(e){}
	}
		
	if(console) console.log('Loading MUJS API v' + MUJS.version + ' - ' + (new Date(parseInt(MUJS.build_time))).toString());
	
	
	var URLBuilder = function(input){
		
		var r = {
			protocol: 'http:',
			hostname: '',
			pathname: '',
			
			args: [],
			
			setHostname: function(str){
				var parser = document.createElement('a');
				if(!/https?\:\/\//i.test(str))
					str = 'http://' + str;
				parser.href = str;
				
				this.hostname = parser.hostname;
				this.protocol = parser.protocol;
			},
			
			setPath: function(str){
				if(str[0] != '/') str = '/' + str;
				this.pathname = str;
			},
			
			addArg: function(key, value){
				this.args.push([key, value]);
			},
			
			addArgs: function(args){
				for(var i = 0; i < args.length; i++){
					this.addArg(args[i]);
				}
			},
			
			buildArgs: function(){
				var argStr = '';
				var argsArr = [];
				for(var i = 0; i < this.args.length; i++){
					argsArr.push(this.args[i].join('='));
				}
				return argsArr.join('&');
			},
			
			toString: function(){
				return this.protocol + '//' + this.hostname + this.pathname + '?' + this.buildArgs();
			}
		};
		
		if(typeof input !== "undefined")
			r.setHostname(input);
		
		return r;
	};

	/***********************************
	 ** Functions/Classes/Prototypes
	 **********************************/
	
{{{MUJS.CLASSES_AND_PROTOTYPES}}}

	/***********************************
	 ** Default Config Values
	 **********************************/
{{{MUJS.CONFIG}}}
	
	/***********************************
	 ** Events
	 **********************************/
	
{{{MUJS.EVENTS}}}

	/***********************************
	 ** Get Script Info
	 **********************************/
{{{MUJS.SCRIPTINFO}}}

	/***********************************
	 ** Log
	 **********************************/
{{{MUJS.API.LOG}}}
	//if(MUJS.config('debug')) MUJS.Log('MUJS.Config', MUJS.Config);

	/***********************************
	 ** Add Style
	 **********************************/
{{{MUJS.API.ADDSTYLE}}}
	 
	/***********************************
	 ** Add Script
	 **********************************/
{{{MUJS.API.ADDSCRIPT}}}
	 
	/***********************************
	 ** Content Eval
	 **********************************/
	MUJS.API.contentEval = function(source) {
		// Check for function input.
		if ('function' == typeof source) {
			// Execute this function with no arguments, by adding parentheses.
			// One set around the function, required for valid syntax, and a
			// second empty set calls the surrounded function.
			source = '(' + source + ')();'
		}

		// Create a script node holding this  source code.
		var script = document.createElement('script');
		script.setAttribute("type", "application/javascript");
		script.textContent = source;

		// Insert the script node into the page, so it will run, and immediately
		// remove it to clean up.
		unsafeWindow.document.body.appendChild(script);
		unsafeWindow.document.body.removeChild(script);
	}
	 
	/***********************************
	 ** LocalStorage
	 **********************************/
	 
{{{MUJS.API.LOCALSTORAGE}}}
	 
	/***********************************
	 ** Parse Meta Data
	 **********************************/
{{{MUJS.API.PARSEMETADATA}}}

	 
	/***********************************
	 ** Get DOM Timing
	 **********************************/
{{{MUJS.GETDOMTIMING}}}

	/*
	var compareVersions = function(v1, v2){
		if(versionString.indexOf('.') == -1){
			return parseInt(versionString);
		} else {
			var versionParts = versionString.split('.');
			while(versionParts.length < 4)
				versionParts.push('0')
			var vStr = '';
			//for(var part in versionParts){
			for(var part = 0; part < versionParts.length; part++){
				console.log('part', versionParts[part]);
				if(versionParts[part].length > 4)
					versionParts[part] = versionParts[part].substr(0,4)
				vStr += versionParts[part].lpad('0', 4);
			}
			console.log('vStr', vStr);
			return parseInt(vStr);
		}
	}
	*/
	/***********************************
	 ** Update
	 **********************************/
	//MUJS['UPDATE'] = new function(){
	MUJS.fn['UPDATE'] = new function(){
		
		var combineOptions = function(){
			var args = Array.prototype.slice.call(arguments, 0);
			
			//opts = merge({}, MUJS.Config.Update, data);
			var output = merge.apply(merge, args);
			if(typeof output.Update !== "undefined" && typeof output.Update.script_info !== "undefined")
				output.Update.script_info = MUJS.config('Update.script_info');
			return output;
		}
		
		this.getJSON = function(url, data){
			$.ajax({
				dataType: "jsonp",
				url: url + '&json=1',
				async: true
				/*
				success: function(result, e){
					unsafeWindow[MUJS.Config.Update.updateVeriableName] = result;
					MUJS.UPDATE.execCallback(data, result);
				}
				*/
			})
			.done(function(result) {
				unsafeWindow[MUJS.Config.Update.updateVeriableName] = result;
				MUJS.UPDATE.execCallback(data, result);
			})
			.fail(function(e) {
				MUJS.UPDATE.execCallback(data, undefined, "error", e);
			});
		}
		
		this.getXMLHttpRequest = function(url, data){
			try{
				if(GM_xmlhttpRequest){
					GM_xmlhttpRequest({
						method: "GET", url: url,
						headers: {"Accept": "application/javascript"},
						onload: function(response){
							var responseJSON = JSON.parse(response.responseText);
							MUJS.UPDATE.execCallback(data, responseJSON);
						},
						onerror: function(){
							console.log('Error! getXMLHttpRequest', response);
						}
					});
					return true;
				}
			} catch(e){
				console.log('Error! getXMLHttpRequest', e);
			}
			return false;
			
		}
		
		this.getCallbackFunction = function(data){
			//if(MUJS.config('scopeLock')){
				
			//} else {
				if(typeof data.callback === "string"){
					if(typeof unsafeWindow[data.callback] !== "undefined")
						return unsafeWindow[data.callback];
				} else if(typeof data.callback !== "undefined"){
					return data.callback;
				} else if(typeof MUJS.config('currentCallback') !== "undefined"){
					if(typeof MUJS.config('currentCallback') === "string"){
						return unsafeWindow[MUJS.config('currentCallback')];
					} else {
						return MUJS.config('currentCallback');
					}
				}
			//}
			return undefined;
		}
		
		this.execCallback = function(data, result){
			var args = Array.prototype.slice.call(arguments, 1);
			var cb = this.getCallbackFunction(data);
			if(cb !== undefined) cb.apply(cb.callback, args);
		}
		
		this.getURL = function(data){
			//try{
				//opts = merge({}, MUJS.Config.Update, data);
				opts = combineOptions({}, MUJS.Config.Update, data);
				if(opts.callback && typeof opts.callback === "string"){
					opts.callback_function = opts.callback;
				}
				
				var builder = URLBuilder(MUJS.config('host') || 'http://myuserjs.org');
				
				
				// Get Username
				var un = (opts.username || MUJS.config('script.username')).trim();
				if(typeof un === "undefined" || un == '') throw "No Username Provided";
				
				// Get Script Name
				var sn = (opts.script_name || MUJS.config('script.script_name')).trim();
				if(typeof sn === "undefined" || sn == '') throw "No Script Name Provided";
				
				// Get getType
				var gt = (opts.getType || MUJS.config('Update.getType'));
				if(gt != 'meta' && gt != 'metajs' && gt != 'data' && gt != "none")
					gt = 'data';
					
				// Get Default Args
				var args = opts.args;
				
				// DOM Timing
				if(opts.DOMTiming){
					var domTiming = MUJS.getDOMTiming();
					//if(MUJS.config('debug')) console.log('domTiming', domTiming);
					if(MUJS.config('debug')) MUJS.Log('domTiming', domTiming);
					for(var key in domTiming){
						if(domTiming.hasOwnProperty(key)) {
							args[key] = domTiming[key];
						}
					}
				}
				
				// Make Args Array
				var args_arr = [];
				for(var key in args){
					args_arr.push(key + '=' + args[key]);
				}
				
				
				builder.addArg('args', escape(args_arr.join(',')));
				builder.addArg('api_version', MUJS.version);
				
				builder.addArg('updateVeriableName', opts.updateVeriableName);
					
				if(typeof opts.callback_function !== "undefined")
					builder.addArg('jsonp', opts.callback_function);
				
				if(typeof opts.noDownload !== "undefined" && opts.noDownload == true){
					builder.addArg('nodownload', '1');
				} else {
					if(MUJS.config('Update.sampleRate') < 100){
						if(Math.floor((Math.random() * 100) + 1) > MUJS.config('Update.sampleRate')){
							builder.addArg('nodownload', '1');
						}
					}
				}
				
				if(MUJS.config('Update.getStats'))
					builder.addArg('getstats', '1');
				
				if(typeof opts.script_info !== "undefined"){
					if(typeof opts.script_info.version !== "undefined")
						builder.addArg('scriptversion', escape(opts.script_info.version));
					
					if(typeof opts.script_info.script_handler !== "undefined"){
						builder.addArg('scripthandler', escape(opts.script_info.script_handler));
						if(typeof opts.script_info.script_handler_version !== "undefined")
							builder.addArg('scripthandlerversion', escape(opts.script_info.script_handler_version));
					}
					/*
					opts.script_info.matched_rules = {
						count: 0,
						include: [],
						exclude: [],
						match: []
					};
					
					if(typeof opts.script_info.includes !== "undefined" && opts.script_info.includes.length > 0){
						for(var i = 0; i < opts.script_info.includes.length; i++){
							var rRegEx = new RegExp(opts.script_info.includes[i],'i');
							if(rRegEx.test(window.location.href)){
								opts.script_info.matched_rules.include.push(opts.script_info.includes[i]);
								opts.script_info.matched_rules.count++;
							}
						}
					}
					
					if(typeof opts.script_info.excludes !== "undefined" && opts.script_info.excludes.length > 0){
						for(var i = 0; i < opts.script_info.excludes.length; i++){
							var rRegEx = new RegExp(opts.script_info.excludes[i],'i');
							if(rRegEx.test(window.location.href)){
								opts.script_info.matched_rules.exclude.push(opts.script_info.excludes[i]);
								opts.script_info.matched_rules.count++;
							}
						}
					}
					
					if(typeof opts.script_info.matches !== "undefined" && opts.script_info.matches.length > 0){
						for(var i = 0; i < opts.script_info.matches.length; i++){
							var rRegEx = new RegExp(opts.script_info.matches[i],'i');
							if(rRegEx.test(window.location.href)){
								opts.script_info.matched_rules.match.push(opts.script_info.matches[i]);
								opts.script_info.matched_rules.count++;
							}
						}
					}
					
					if(opts.script_info.matched_rules.count > 0){
						var matchedRulesJSON = JSON.stringify(opts.script_info.matched_rules);
						URLArgs.push('matchedRules=' + escape(matchedRulesJSON));
					}
					*/
				}
				/*
				if(MUJS.config('debug')){
					URLArgs.push('firephp=1');
				}
				*/
				
				
				builder.addArg('cachebuster', Math.round(new Date().getTime() / 1000));
				//var protocol = (MUJS.configOption('secure') ? 'https://' : 'http://');
				var host = (MUJS.config('host') || 'myuserjs.org');
				builder.setPath('/script/' + un + '/' + sn + '.' + gt + '.js');
				
				//console.log('builder', builder.toString());
				return builder.toString();
				
			//}catch(e){
				//MUJS.Log('Error!', e);
				//return this.execCallback(data, undefined, e);
			//}
		}
		
		this.sendRequest = function(data){
			try {
				//var mData = merge({}, MUJS.Config.Update, data);
				var mData = combineOptions({}, MUJS.Config.Update, data);
				
				if(typeof unsafeWindow[mData.updateVeriableName] !== "undefined"){
					unsafeWindow[mData.updateVeriableName] = undefined;
					delete unsafeWindow[mData.updateVeriableName];
				}
				
				if(MUJS.config('scopeLock') && mData.callback && mData['getType'] != 'none'){
					MUJS.config('currentCallback', mData.callback);
					mData.callback = "MUJSExtResponseCallback";
				} else {
					MUJS.config('currentCallback', null);
				}
				
				var url = MUJS.UPDATE.getURL(mData);
				
				if(MUJS.config('debug')) MUJS.Log(url);
				
				var r;
				//if(MUJS.config('Update.jQuery')){
				

				if(mData.XMLHttpRequest){
					r = this.getXMLHttpRequest(url, mData);
				}
				
				if(!r && mData.jQuery){
					r = this.getJSON(url, mData);
				} else {
					r = MUJS.API.addScript(undefined, url, undefined, true);
				}
				

				
				if(mData.callback && mData['getType'] != 'none'){
					if(typeof mData.callback === "string" && this.getCallbackFunction(mData) !== undefined){
						// Do Nothing
					} else {
						MUJS.UPDATE.waitForResponse(mData);
					}
				}
				return r;
			}catch(e){
				console.log('Error! getUpdateData: ', e.name, e.fileName, e.lineNumber + ':' + e.columnNumber);
				console.log(e);
				//console.trace(e);
				return undefined;
			}
		}
		
		this.getUpdateData = function(data){
			return this.sendRequest(data);
		}
		
		this.waitForResponse = function(data, count){
			if(typeof count === "undefined") count = 0;
			
			if(typeof unsafeWindow[data.updateVeriableName] !== "undefined"){
				console.log('updateVeriable ready');
				return MUJS.UPDATE.execCallback(data, unsafeWindow[data.updateVeriableName], 'Success!');
			} else {
				if(count > 100) return MUJS.UPDATE.execCallback(data, undefined, 'Error! TimedOut');
				return setTimeout(MUJS.UPDATE.waitForResponse, 100, data, count + 1);
			}
		}
		
		this.extResponse = function(response){
			//console.log('extResponse', response);
			var args = Array.prototype.slice.call(arguments, 0);
			var cb = MUJS.UPDATE.getCallbackFunction({callback: MUJS.config('currentCallback')});
			if(typeof cb !== "undefined"){
				cb.apply(cb, args);
			} else {
				console.log('extResponse error! cant find cb');
			}
			//(MUJS.config('currentCallback')).apply(MUJS.config('currentCallback'), args);
		}
	}
	
	mExportFunction(MUJS.UPDATE.extResponse, unsafeWindow, {
		defineAs: "MUJSExtResponseCallback",
		allowCallbacks: true,
		allowCrossOriginArguments: true
	});
	
	Object.defineProperty(MUJS.UPDATE, 'MetaData', {
		get: function(varName){
			if(typeof unsafeWindow[varName || MUJS.Config.Update.updateVeriableName] !== "undefined"){
				return unsafeWindow[varName || MUJS.Config.Update.updateVeriableName];
			} else if(typeof window[varName || MUJS.Config.Update.updateVeriableName] !== "undefined"){
				return window[varName || MUJS.Config.Update.updateVeriableName];
			}
			return undefined;
		}
	});


	
	/***********************************
	 ** Error
	 **********************************/
{{{MUJS.ERROR}}}

	var MUJSRequire = {
		DOMLoaded: false,
		documentComplete: false,
		onErrorFunctionAdded: false,
		Complete: false,
		scriptExecCount: 0,
		manualCallCount: 0
	};
	function RemoveEventListener_BeforeScriptExec(){window.removeEventListener('beforescriptexecute', BeforeScriptExec, true);};
	function BeforeScriptExec(e){
		//try{
			if(!MUJSRequire.DOMLoaded){
				if(document.readyState != "uninitialized" && document.readyState != "loading")
					MUJSRequire.DOMLoaded = true;
			} else if(!MUJSRequire.onErrorFunctionAdded){
				MUJSRequire.onErrorFunctionAdded = true;
				setTimeout(function(){
					MUJS.API.contentEval(onErrorFunction);
					MUJS['events']['fire']('onReady');
				},1);
			} else if(!MUJSRequire.documentComplete){
				if(document.readyState === "complete" && typeof unsafeWindow.performance !== "undefined" && typeof unsafeWindow.performance.timing !== "undefined"){
					var pageLoadTime = (unsafeWindow.performance.timing.loadEventEnd || unsafeWindow.performance.timing.loadEventStart) - unsafeWindow.performance.timing.navigationStart;
					if(pageLoadTime > 0 || MUJSRequire.scriptExecCount + MUJSRequire.manualCallCount >= 50){
						MUJSRequire.documentComplete = true;
						MUJS['events']['fire']('onPageReady');
					}
				} else if(MUJSRequire.scriptExecCount + MUJSRequire.manualCallCount >= 50){
					MUJSRequire.documentComplete = true;
					MUJS['events']['fire']('onPageReady');
				}
			} else {
				MUJSRequire.Complete = true;
				clearCheckTimer();
				RemoveEventListener_BeforeScriptExec();
			}
			if(typeof e !== "undefined")
				MUJSRequire.scriptExecCount++;
			else
				MUJSRequire.manualCallCount++;
		//}catch(e){
			//console.log('MUJS ERROR! BeforeScriptExec ', e);
		//}
	}
	window.addEventListener('beforescriptexecute', BeforeScriptExec, true);
	
	function checkTimer(){
		var currentTime = performance.now;
		if(!MUJSRequire.Complete){
			BeforeScriptExec();
		} else {
			RemoveEventListener_BeforeScriptExec();
			clearCheckTimer();
		}
		
	}
	
	function clearCheckTimer(){
		clearInterval(checkTimer);
	}
	
	setInterval(checkTimer, 100);
	
	//if(typeof unsafeWindow.performance !== "undefined" && typeof unsafeWindow.performance.timing !== "undefined")
		//mujsAPILoadEnd = unsafeWindow.performance.now();
	if(performance.available)
		mujsAPILoadEnd = performance.now;
		
	//console.log('mujsAPILoadStart: ', mujsAPILoadStart, ' -- mujsAPILoadEnd: ', mujsAPILoadEnd);
})(MUJS, (typeof jQuery !== "undefined" ? jQuery : undefined));
unsafeWindow['MUJS'] = MUJS;
