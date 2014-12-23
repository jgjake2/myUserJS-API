// +@display_name  Config
// +@replace  MUJS.CONFIG
// +@history (0.0.9) History begins.
// +@history (0.0.11) Added XMLHttpRequest.

	// Default Values
	/**
	 * @alias MUJS.Config
	 * @namespace MUJS.Config
	 * @property {object} host
	 * @property {boolean} scopeLock
	 * @property {boolean} secure
	 * @property {object} browser
	 * @property {object} script
	 * @property {string} script.username       - Owner's username hosted on myUserJS
	 * @property {string} script.script_name    - Script's short-name (can be fount in script's hosted URL on myUserJS)
	 * @property {object} Update
	 * @property {boolean} Update.DOMTiming - Generate and send page/script timing information to the server.
	 * @property {object} Update.args - Default arguments to be sent to myUserJS's statistical engine.
	 * @property {string} Update.updateVeriableName - The global variable that will store the server response.
	 * @property {string} Update.getType - Type of information you want returned from the server, and which partition to store the download/arguments under.
	 * @property {boolean} Update.XMLHttpRequest - <font color="red">(Experimental)</font> Use XMLHttpRequest when sending request (only available to userscripts that load MUJS via require)
	 * @property {boolean} Update.jQuery - <font color="red">(broken)</font>
	 * @property {boolean} Update.getStats - Get script stats from the server (only available when getType="data")
	 * @property {object} Error
	 * @property {object} API
	 * @property {boolean} debug
	 * @example
	 * // Get the current value of script.username
	 * MUJS('get', 'script.username')
	 * // or
	 * MUJS.config('script.username');
	 * // or
	 * MUJS.Config.script.username;
	 */
	MUJS.Config = /** @dict */ {
		'host': 'http://myuserjs.org',
		//'scopeLock': (typeof exportFunction === "undefined" ? false : true),
		'scopeLock': false,
		'secure': false,
		'browser': MUJS.Browser.getBrowser(),
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
				'disabled_functions': [], // API.log.disabled_functions
				'hidden_classes': [], // API.log.hidden_classes
				'verbosity_level': (MUJS.debug ? 5 : 2), // API.log.verbosity_level
				'GM_log': true
			},
			'localStorage': {
				'storage_prefix': 'MUJS_' // API.localStorage.storage_prefix
			}
		},
		'debug': false
	};
	
	try{
		if(['firefox', 'waterfox'].indexOf(MUJS.Config.browser.name.toLowerCase()) == -1){
			MUJS.Config.API.log.GM_log = false;
		}
	}catch(e){}
	
	Object.defineProperties(MUJS.Config, props);
	
	
	if(typeof unsafeWindow['MUJS_CONFIGURATION'] !== "undefined"){
		MUJS.Config = merge(MUJS.Config, unsafeWindow['MUJS_CONFIGURATION']);
	}
	
	if(typeof unsafeWindow['MUJS_UPDATE_CONFIGURATION'] !== "undefined"){
		MUJS.Config.Update = merge(MUJS.Config.Update, unsafeWindow['MUJS_UPDATE_CONFIGURATION']);
	}
	
	Object.defineProperties(MUJS.Config, props);
	/**
	 * Get or set a Config value
	 * @function MUJS.config
	 * @memberOf! MUJS
	 * @param {string} key key name to find
	 * @param {*} [value] Value to be set
	 * @example
	 * // Get
	 * MUJS.config('script.username');
	 * // Set
	 * MUJS.config('script.username', 'foo');
	 * @see {@link MUJS.Config}
	 */
	Object.defineProperty(MUJS, "config", {
		value: function(key, value){
			if(typeof value === "undefined"){
				return MUJS.Config.SearchForKeys(key);
			} else {
				return MUJS.Config.setKeyValue(key, value);
			}
		},
		enumerable: false
	});
