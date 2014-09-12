	
// Default Values
MUJS['Config'] = /** @dict */ {
	'host': 'http://myuserjs.org',
	'script': {
		username: undefined,
		script_name: undefined
	},
	/*
	 * get_type:
	 *     meta.js
	 *     metajs.js
	 *     data.js
	 */
	'get_type': 'data.js',
	'DOMTiming': false,
	'args': {},
	'error': {}
};

MUJS['getOption'] = function(keyName){return MUJS.Config.SearchForKey(keyName);}
MUJS['get'] = MUJS.getOption;

MUJS['setOption'] = function(keyName, value, force){return MUJS.Config.setKeyValue(keyName, value);}
MUJS['set'] = MUJS.setOption;