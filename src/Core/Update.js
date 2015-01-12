// +@display_name  Update
// +@history (0.0.14) History begins.
// +@history (0.0.14) Changed jMod.UPDATE to jMod.Update.
// +@history (0.0.14) Fixed bug that caused callbacks to fire twice.
// +@history (0.0.15) Removed ref to jMod.fn (__proto__ is depreciated).
// +@history (0.0.15) Updated to use jMod.SendMessage


	/**
	 * @namespace jMod.Update
	 * @memberOf jMod
	 * @since 0.0.14
	 * @example
	 * var opts = {
	 *     callback: updateCallback,
	 *     onerror: updateErrorCallback,
	 *     getType: 'data',
	 *     XMLHTTPRequest: true,
	 *     args: {
	 *         scriptLoadTime: 1234
	 *     }
	 * };
	 * 
	 * jMod.Update.getUpdateData(opts);
	 */
	jMod['Update'] = new function(){
		/**
		 * @callback UpdateCallback
		 * @memberof jMod.Update
		 * @param {(object|string)} response The string or JSON object returned from the server
		 */
		/**
		 * Data used to send requests to the server.<br><i>Overrides settings stored in jMod.Config.</i>
		 * @typedef {Object} UpdateData
		 * @type {object}
		 * @memberof jMod.Update
		 * @see jMod.Config
		 * @property {string} [script_name] - Name of script on myUserJS (Not needed if meta block contains a valid updateURL or jModupdateURL)
		 * @property {string} [username] - Script owner's username on myUserJS
		 * @property {UpdateCallback} [callback] - Function to be called with the server's response
		 * @property {UpdateCallback} [onerror] - Function to be called when an error occurs
		 * @property {string} [getType="data"] - Type of information you want returned from the server, and which partition to store the download/arguments under.
		 * @property {object} [args] - Arguments to be sent to myUserJS's statistical engine
		 * @property {boolean} [DOMTiming=false] - Generate and send page/script timing information to the server
		 * @property {boolean} [noDownload=false] - Do not record download when processing response (only used when reporting errors)
		 * @property {boolean} [XMLHttpRequest=false] - <font color="red">(Experimental)</font> Use XMLHttpRequest when sending request (only available to userscripts that load jMod via require)
		 * @property {boolean} [jQuery=false] - <font color="red">(broken)</font>
		 * @example
		 * var opts = {
		 *     callback: myCBFunction,
		 *     getType: 'data',
		 *     args: {
		 *         scriptLoadTime: 1234
		 *     }
		 * }
		 * console.log(jMod.Update.getURL(opts));
		 */
	
		var combineOptions = function(){
			var args = [true].concat(Slice.call(arguments), {
				script_info: jConfig('script.script_info'),
				script_file_info: jConfig('script.script_file_info') || undefined
			});
			return jMod.extend.apply(jMod, args);
			//console.log('output', output);
			//output.script_info = jConfig('script.script_info');
			
			//if(typeof jConfig('script.script_file_info') !== _undefined)
				//output.script_file_info = jConfig('script.script_file_info');
			//return output;
		}
		
		/**
		 * Generate the update URL
		 * @function getURL
		 * @memberof jMod.Update
		 * @param {UpdateData} data Information used to generate the URL
		 */
		this.getURL = function(data){
			//try{
				//opts = merge({}, jMod.Config.Update, data);
				opts = combineOptions({}, jMod.Config.Update, data);
				//if(opts.callback && typeof opts.callback === "string"){
					//opts.callback_function = opts.callback;
				//}
				
				var builder = new URLBuilder(jConfig('host') || 'http://myuserjs.org');
				
				
				// Get Username
				var un = (opts.username || jConfig('script.username')).trim();
				if(typeof un === _undefined || un == '') throw "No Username Provided";
				
				// Get Script Name
				var sn = (opts.script_name || jConfig('script.script_name')).trim();
				if(typeof sn === _undefined || sn == '') throw "No Script Name Provided";
				
				// Get getType
				var gt = (opts.getType || jConfig('Update.getType'));
				if(gt != 'meta' && gt != 'metajs' && gt != 'data' && gt != "none")
					gt = 'data';
					
				// Get Default Args
				var args = opts.args;
				
				// DOM Timing
				if(opts.DOMTiming){
					var domTiming = jMod.getDOMTiming();
					//console.log('domTiming', domTiming);
					//if(jConfig('debug')) console.log('domTiming', domTiming);
					//if(jConfig('debug')) jMod.Log('domTiming', domTiming);
					for(var key in domTiming){
						if(domTiming.hasOwnProperty(key)) {
							//console.log('key:', key , 'value:', domTiming[key]);
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
				builder.addArg('api_version', jMod.version);
				
				builder.addArg('updateVeriableName', opts.updateVeriableName);
					
				//if(typeof opts.callback_function !== _undefined)
					//builder.addArg('jsonp', opts.callback_function);
				
				if(typeof opts.noDownload !== _undefined && opts.noDownload == true){
					builder.addArg('nodownload', '1');
				} else {
					if(jConfig('Update.sampleRate') < 100){
						if(Math.floor((Math.random() * 100) + 1) > jConfig('Update.sampleRate')){
							builder.addArg('nodownload', '1');
						}
					}
				}
				
				if(jConfig('Update.getStats'))
					builder.addArg('getstats', '1');
				
				if(typeof opts.script_info !== _undefined){
					if(typeof opts.script_info.version !== _undefined)
						builder.addArg('scriptversion', escape(opts.script_info.version));
					
					if(typeof opts.script_info.script_handler !== _undefined){
						builder.addArg('scripthandler', escape(opts.script_info.script_handler));
						if(typeof opts.script_info.script_handler_version !== _undefined)
							builder.addArg('scripthandlerversion', escape(opts.script_info.script_handler_version));
					}
					/*
					opts.script_info.matched_rules = {
						count: 0,
						include: [],
						exclude: [],
						match: []
					};
					
					if(typeof opts.script_info.includes !== _undefined && opts.script_info.includes.length > 0){
						for(var i = 0; i < opts.script_info.includes.length; i++){
							var rRegEx = new RegExp(opts.script_info.includes[i],'i');
							if(rRegEx.test(window.location.href)){
								opts.script_info.matched_rules.include.push(opts.script_info.includes[i]);
								opts.script_info.matched_rules.count++;
							}
						}
					}
					
					if(typeof opts.script_info.excludes !== _undefined && opts.script_info.excludes.length > 0){
						for(var i = 0; i < opts.script_info.excludes.length; i++){
							var rRegEx = new RegExp(opts.script_info.excludes[i],'i');
							if(rRegEx.test(window.location.href)){
								opts.script_info.matched_rules.exclude.push(opts.script_info.excludes[i]);
								opts.script_info.matched_rules.count++;
							}
						}
					}
					
					if(typeof opts.script_info.matches !== _undefined && opts.script_info.matches.length > 0){
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
				if(jConfig('debug')){
					URLArgs.push('firephp=1');
				}
				*/
				
				
				builder.addArg('cachebuster', Math.round(new Date().getTime() / 1000));
				var host = (jConfig('host') || 'myuserjs.org');
				builder.setPath('/script/' + un + '/' + sn + '.' + gt + '.js');
				
				return builder;
				
			//}catch(e){
				//jMod.Log('Error!', e);
			//}
		}
		
		/**
		 * Send information to the server with the given data.<br>If a callback is provided, and <i>data</i>.<b>getType</b> != '<b>none</b>', it will be called with the server's response. See [UpdateCallback]{@link jMod.Update.UpdateCallback}
		 * @function sendRequest
		 * @memberof jMod.Update
		 * @param {UpdateData} data Information and arguments used to send request to the server
		 */
		 
		this.sendRequest = function(data){
			try {
				//var mData = merge({}, jMod.Config.Update, data);
				var mData = combineOptions({}, jMod.Config.Update, data);
				
				if(typeof unsafeWindow[mData.updateVeriableName] !== _undefined){
					unsafeWindow[mData.updateVeriableName] = undefined;
					delete unsafeWindow[mData.updateVeriableName];
				}
				
				var url = jMod.Update.getURL(mData);
				
				if(jConfig('debug'))
					jMod.Log('URL: ', url.toString());
				
				var method = 'JSONP';
				
				if(mData.jQuery)
					method = 'jQuery';
				else if(mData.XMLHttpRequest)
					method = 'XMLHTTPRequest';
				
				return jMod.SendMessage({
					url: url.toString(),
					method: method,
					responseType: 'json',
					callback: (function(_callback, _updateVeriableName){
						return function(response){
							unsafeWindow[_updateVeriableName] = response;
							return _callback.apply(this, arguments);
						}
					})(mData.callback, mData.updateVeriableName),
					onerror: mData.onerror
				});
				
			}catch(e){
				console.log('Error! getUpdateData: ', e.name, e.fileName, e.lineNumber + ':' + e.columnNumber);
				console.error(e);
				if(mData.callback)
					mData.onerror(e);
				return undefined;
			}
		}
		
		this.getUpdateData = function(data){
			return this.sendRequest(data);
		}
	};
	
	Object.defineProperty(jMod.Update, 'MetaData', {
		get: function(varName){
			if(typeof unsafeWindow[varName || jConfig('Update.updateVeriableName')] !== _undefined){
				return unsafeWindow[varName || jConfig('Update.updateVeriableName')];
			} else if(typeof window[varName || jConfig('Update.updateVeriableName')] !== _undefined){
				return window[varName || jConfig('Update.updateVeriableName')];
			}
			return undefined;
		}
	});