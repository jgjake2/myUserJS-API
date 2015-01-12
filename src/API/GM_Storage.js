// +@display_name  GM_Storage
// +@history (0.0.15) History begins.

/**
 * Shim for interacting with the GM storage functions
 * @namespace jMod.API.GM_Storage
 */

jMod.API.GM_Storage = {
	/**
	 * @function getValue
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name
	 * @param {string|boolean|number} [def] - default value to return if key does not exist
	 */
	getValue: function(key, def){
		if(typeof GM_getValue !== _undefined)
			return GM_getValue(jConfig('API.Storage.prefix') + key, def);
	},
	/**
	 * @function setValue
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name
	 * @param {string|boolean|number} [value] - value to be set
	 */
	setValue: function(key, value){
		if(typeof GM_setValue !== _undefined)
			return GM_setValue(jConfig('API.Storage.prefix') + key, value);
	},
	/**
	 * @function deleteValue
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name to be deleted
	 */
	deleteValue: function(key){
		if(typeof GM_deleteValue !== _undefined)
			return GM_deleteValue(jConfig('API.Storage.prefix') + key);
	}
}


