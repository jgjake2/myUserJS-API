// +@display_name  Update
// +@replace  MUJS.UPDATE
// +@history (0.0.14) History begins.
// +@history (0.0.14) Changed MUJS.UPDATE to MUJS.Update.
// +@history (0.0.14) Fixed bug that caused callbacks to fire twice.


	/**
	 * @namespace MUJS.Update
	 * @memberOf MUJS
	 * @since 0.0.14
	 * @example
	 * // foo
	 */
	MUJS.fn['Update'] = new function(){
		/**
		 * @callback UpdateCallback
		 * @memberof MUJS.Update
		 * @param {(object|string)} response The string or JSON object returned from the server
		 */
		/**
		 * Data used to send requests to the server.<br><i>Overrides settings stored in MUJS.Config.</i>
		 * @typedef {Object} UpdateData
		 * @type {object}
		 * @memberof MUJS.Update
		 * @see MUJS.Config
		 * @property {string} [script_name] - Name of script on myUserJS (Not needed if meta block contains a valid updateURL or MUJSupdateURL)
		 * @property {string} [username] - Script owner's username on myUserJS
		 * @property {UpdateCallback} [callback] - Function to be called with the server's response
		 * @property {string} [getType="data"] - Type of information you want returned from the server, and which partition to store the download/arguments under.
		 * @property {object} [args] - Arguments to be sent to myUserJS's statistical engine
		 * @property {boolean} [DOMTiming=false] - Generate and send page/script timing information to the server
		 * @property {boolean} [noDownload=false] - Do not record download when processing response (only used when reporting errors)
		 * @property {boolean} [XMLHttpRequest=false] - <font color="red">(Experimental)</font> Use XMLHttpRequest when sending request (only available to userscripts that load MUJS via require)
		 * @property {boolean} [jQuery=false] - <font color="red">(broken)</font>
		 * @example
		 * var opts = {
		 *     callback: myCBFunction,
		 *     getType: 'data',
		 *     args: {
		 *         scriptLoadTime: 1234
		 *     }
		 * }
		 * console.log(MUJS.Update.getURL(opts));
		 */
	
		var combineOptions = function(){
			var args = Array.prototype.slice.call(arguments, 0);
			var output = merge.apply(merge, args);
			output.script_info = MUJS.config('script.script_info');
			
			if(typeof MUJS.config('script.script_file_info') !== "undefined")
				output.script_file_info = MUJS.config('script.script_file_info');
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
			var safeArgs = mCloneInto(args, unsafeWindow, {
				cloneFunctions: true,
				wrapReflectors: true
			});
			var cb = this.getCallbackFunction(data);
			if(cb !== undefined) cb.apply(cb, safeArgs);
		}
		
		/**
		 * Generate the update URL
		 * @function getURL
		 * @memberof MUJS.Update
		 * @param {UpdateData} data Information used to generate the URL
		 */
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
		
		/**
		 * Send information to the server with the given data.<br>If a callback is provided, and <i>data</i>.<b>getType</b> != '<b>none</b>', it will be called with the server's response. See [UpdateCallback]{@link MUJS.Update.UpdateCallback}
		 * @function sendRequest
		 * @memberof MUJS.Update
		 * @param {UpdateData} data Information and arguments used to send request to the server
		 */
		this.sendRequest = function(data){
			try {
				//var mData = merge({}, MUJS.Config.Update, data);
				var mData = combineOptions({}, MUJS.Config.Update, data);
				
				if(typeof unsafeWindow[mData.updateVeriableName] !== "undefined"){
					unsafeWindow[mData.updateVeriableName] = undefined;
					delete unsafeWindow[mData.updateVeriableName];
				}
				
				if(MUJS('get', 'scopeLock') === true && typeof mData.callback !== "undefined" && mData['getType'] != 'none'){
					console.log('Add MUJSExtResponseCallback');
					MUJS.config('currentCallback', mData.callback);
					mData.callback = "MUJSExtResponseCallback";
				} else {
					MUJS.config('currentCallback', null);
				}
				
				
				var url = MUJS.UPDATE.getURL(mData);
				
				if(MUJS.config('debug')) MUJS.Log(url);
				
				var r;
				
				if(mData.XMLHttpRequest && (r = this.getXMLHttpRequest(url + '&json=1', mData))){
					
				} else {
					if(mData.jQuery){
						r = this.getJSON(url, mData);
					} else {
						r = MUJS.API.addScript(undefined, url, undefined, true);
					}
				}
				
				if(mData.callback && mData['getType'] != 'none'){
					//if(typeof mData.callback !== "string" && this.getCallbackFunction(mData) !== undefined){
					if(typeof mData.callback === "string" || this.getCallbackFunction(mData) !== undefined){
						// Do Nothing
					} else {
						if({{{DEBUG}}}) MUJS.Debug('waitForResponse');
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
				if({{{DEBUG}}}) console.log('updateVeriable ready');
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
	
	MUJS.fn['UPDATE'] = MUJS['Update'];
	
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