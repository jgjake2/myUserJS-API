// +@display_name  Config
// +@history (0.0.9) History begins.
// +@history (0.0.11) Added XMLHttpRequest.
// +@history (0.0.15) Fixed jMod.Config properties being added twice.
// +@history (0.0.16) Users can now set configuration from meta block, or from script tag.
// +@history (0.0.17) Config function now attempts to get userscript information when called (if enabled).

	RequireScript('Core.prototypes');
	
	// isElement
	RequireScript('Core.Element.isElement');
	
	// Default Values
	/**
	 * Get or set a Config value
	 * @alias jMod.Config
	 * @namespace jMod.Config
	 * @property {object} host
	 * @property {boolean} scopeLock
	 * @property {boolean} secure
	 * @property {object} browser
	 * @property {boolean} getScriptFileInfo - Enable / Disable getting information about the userscript file
	 * @property {object} script
	 * @property {string} script.username       - Owner's username hosted on myUserJS
	 * @property {string} script.script_name    - Script's short-name (can be fount in script's hosted URL on myUserJS)
	 * @property {object} Update
	 * @property {boolean} Update.DOMTiming - Generate and send page/script timing information to the server.
	 * @property {object} Update.args - Default arguments to be sent to myUserJS's statistical engine.
	 * @property {string} Update.updateVeriableName - The global variable that will store the server response.
	 * @property {string} Update.getType - Type of information you want returned from the server, and which partition to store the download/arguments under.
	 * @property {boolean} Update.XMLHttpRequest - <font color="red">(Experimental)</font> Use XMLHttpRequest when sending request (only available to userscripts that load jMod via require)
	 * @property {boolean} Update.jQuery - <font color="red">(broken)</font>
	 * @property {boolean} Update.getStats - Get script stats from the server (only available when getType="data")
	 * @property {object} Error
	 * @property {object} API
	 * @property {object} API.log
	 * @property {array} API.log.disabled - List of console functions to disable
	 * @property {number} API.log.verbosity_level - Verbosity level
	 * @property {boolean} API.log.GM_log - Enable/Disable use of GM_log
	 * @property {boolean} API.log.Firebug - Enable/Disable use of Firebug
	 * @property {boolean} API.log.WebConsole - Enable/Disable use of WebConsole
	 * @property {boolean} API.log.debug - Enable/Disable debugging of logging functions
	 * @property {object} API.Storage
	 * @property {string} API.Storage.prefix - Prefix for all stored values
	 * @property {string} API.Storage.engine - Default storage engine [GM_Storage or localStorage] (Will default to localStorage when GM_Storage is not available)
	 * @property {object} Language
	 * @property {string} Language.Current - Current language
	 * @property {object} jQueryExtensions
	 * @property {object} jQueryExtensions.CrossOrigin - Enable/Disable use of GM_xmlhttpRequest in your jQuery instance after using <b>addCrossOriginSupport</b> on it.
	 * @property {boolean} debug
	 * @example
	 * // Get the current value of script.username
	 * jMod('get', 'script.username')
	 * // or
	 * jMod('script.username')
	 * // or
	 * jMod.Config('script.username');
	 * // or
	 * jMod.Config.script.username;
	 *
	 * // Set the current value of script.username
	 * jMod('set', 'script.username', 'foo')
	 * // or
	 * jMod('script.username', 'foo')
	 * // or
	 * jMod.Config('script.username', 'foo');
	 * // or
	 * jMod.Config.script.username = 'foo';
	 */
	 
	var jConfig = jMod.Config = function(key, value){
		try{if(jConfig.getScriptFileInfo&&!ScriptInfo.gotFileInfo)ScriptInfo.getScriptFileInfo();}catch(e){} // Try to get information about the userscript if possible
		if(typeof value === _undefined){
			return (typeof key == "string" ? jMod.Config.SearchForKey(key) : jMod.Config.SearchForKeys(key));
		} else {
			return jMod.Config.setKeyValue(key, value);
		}
	}
	 
	jMod.extend(jMod.Config, {
		'host': 'http://myuserjs.org',
		//'scopeLock': (typeof exportFunction === _undefined ? false : true),
		'scopeLock': false,
		'secure': false,
		'browser': jMod.Browser.getBrowser(),
		'getScriptFileInfo': true,
		'addToGlobalScope': true,
		'script': {
			username: undefined,
			script_name: undefined
		},
		'Update': {
			'DOMTiming': false,
			'args': {},
			'updateVeriableName': 'USMetaData',
			'getType': 'data',
			'jQuery': false,
			'XMLHttpRequest': false,
			'getStats': false,
			'sampleRate': 100
			/*
			 * getType:
			 *     meta
			 *     metajs
			 *     data
			 */
		},
		'Error': {
			'autoReportErrors': false,
			'errorFilter': function(message, url, linenumber){return true;}
		},
		'API': {
			'log': {
				'disabled': [], // Disabled Functions
				'verbosity_level': (jMod._debug ? 5 : 3), // API.log.verbosity_level
				'GM_log': true,
				'Firebug': true,
				'WebConsole': true,
				'debug': false
			},
			'Storage': {
				'prefix': 'jMod_', // API.localStorage.storage_prefix
				'engine': 'GM_Storage' // Default storage engine [GM_Storage or localStorage] (Will default to localStorage when GM_Storage is not available)
			}
		},
		'Language': {
			'Current': 'en'
		},
		'jQueryExtensions': {
			'CrossOrigin': true
		},
		'debug': {{{DEBUG}}}
	});
	/*
	if({{{DEBUG}}}){
		try{
			if(['firefox', 'waterfox'].indexOf(jMod.Config.browser.name.toLowerCase()) == -1){
				jMod.Config.API.log.GM_log = false;
			}
		}catch(e){}
	}
	*/
	
	if(typeof unsafeWindow['jMOD_CONFIGURATION'] === "object"){
		jMod.Config = jMod.extend(true, jMod.Config, unsafeWindow['jMOD_CONFIGURATION']);
	}
	
	Object.defineProperties(jMod.Config, props);
	
	var jConfigCaseInsensitive = function(key, value){
		if(typeof value === _undefined){
			return jMod.Config.SearchForKeyI(key);
		} else {
			return jMod.Config.setKeyValueI(key, value);
		}
	}
	/**
	 * Scan an element&#39;s attributes for jMod configuration options
	 * @function jMod.Config.scanElement
	 * @memberof jMod.Config
	 * @param {element} el - Element to scan
	 * @see {@link jMod.Config}
	 */
	jConfig.scanElement = function(el){
		if(el && isElement(el)){
			var r = {}, i = 0, attrName, attrValue, origVal, nodeNamePatt = /^(?:data-)?(.*?)$/i, attrs = el.attributes;
			for(i; i < attrs.length; i++){
				attrName = attrs[i].nodeName;
				attrName = nodeNamePatt.exec(attrName)[1];
				attrValue = attrs[i].value;
				if(attrValue){
					switch(attrName.toLowerCase()){
						case 'src':
						case 'type':
						case 'async':
						case 'defer':
						case 'onload':
						case 'onerror':
						case 'charset':
						case 'crossorigin':
							continue;
							break;
						case 'username':
							jMod.Config.script.username = attrValue;
							break;
						case 'scriptname':
						case 'script_name':
						case 'script-name':
							jMod.Config.script.script_name = attrValue;
							break;
						//case 'config':
						case 'jmod-config':
							try{
								attrValue = JSON.parse(attrValue);
								//jConfigCaseInsensitive(attrName, attrValue);
								if(attrValue)
									jMod.extend(true, jMod.Config, attrValue);
							}catch(e){
								console.error('Error parsing "' + attrs[i].nodeName + '"', el, e);
								continue;
							}
							break;
						default:
							attrName = attrName.split('-').join('.');
							origVal = jConfigCaseInsensitive(attrName);
							switch(typeof origVal){
								case 'number':
									jConfigCaseInsensitive(attrName, parseInt(attrValue));
									break;
								case 'boolean':
									jConfigCaseInsensitive(attrName, attrValue.trim().toLowerCase() == 'true' ? true : false);
									break;
								case 'string':
									jConfigCaseInsensitive(attrName, attrValue);
								case 'object':
									try{
										attrValue = JSON.parse(attrValue);
										if(attrValue)
											jConfigCaseInsensitive(attrName, attrValue);
									}catch(e){
										console.error('Error parsing "' + attrs[i].nodeName + '"', el, e);
										continue;
									}
									break;
								default:
									continue;
									break;
							}
							break;
					}
					r[attrName] = attrValue;
				}
			}
			
			return r;
		}
	}
	
	/*
	 * If jMod is running as a script, search script's attributes for configuration options
	 */
	if(CurrentRunningScript.el){
		CurrentRunningScript.config = jConfig.scanElement(CurrentRunningScript.el);
		if(CurrentRunningScript.el.id && CurrentRunningScript.el.id.trim() != ''){
			CurrentRunningScript.id = CurrentRunningScript.el.id;
		} else {
			if((window || unsafeWindow).document.getElementById(CurrentRunningScript.id)){
				var i = 0;
				while((window || unsafeWindow).document.getElementById(CurrentRunningScript.id + '-' + i))
					i++;
				CurrentRunningScript.id = CurrentRunningScript.id + '-' + i;
			}
			CurrentRunningScript.el.id = CurrentRunningScript.id;
		}
	}
