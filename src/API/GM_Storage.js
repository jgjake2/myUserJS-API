// +@display_name  GM_Storage
// +@history (0.0.15) History begins.

/**
 * Shim for interacting with the GM storage functions
 * @namespace jMod.API.GM_Storage
 */

jMod.API.GM_Storage = {
	/**
	 * @function available
	 * @memberof jMod.API.GM_Storage
	 */
	available: function(){
		return (typeof GM_getValue !== _undefined && typeof GM_setValue !== _undefined && typeof GM_deleteValue !== _undefined);
	},
	/**
	 * @function getValue
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name
	 * @param {string|boolean|number} [def] - default value to return if key does not exist
	 */
	getValue: function(key, def){
		return this.available() ? GM_getValue(jConfig('API.Storage.prefix') + key, def) : def;
		
	},
	/**
	 * @function setValue
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name
	 * @param {string|boolean|number} [value] - value to be set
	 */
	setValue: function(key, value){
		if(this.available())
			return GM_setValue(jConfig('API.Storage.prefix') + key, value);
	},
	/**
	 * @function setJSON
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name
	 * @param {object} [value] - value to be set
	 */
	setJSON: function(key, value){
		var tmp;
		try{
			tmp = JSON.stringify(value);
		}catch(e){
			jModLogError(e, 'GM_Storage.setJSON', 'Cannot stringify value!');
		}
		try{
			return this.setValue(key, tmp || value);
		}catch(e){}
	},
	/**
	 * @function getJSON
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name
	 * @param {object} [def] - default value to return if key does not exist
	 */
	getJSON: function(key, def){
		var tmp = this.getValue(key, def);
		try{
			if(typeof tmp === "string")
				return JSON.parse(tmp);
		}catch(e){
			jModLogError(e, 'GM_Storage.setJSON', 'Error parsing value!');
		}
		return tmp || def;
	},
	/**
	 * @function deleteValue
	 * @memberof jMod.API.GM_Storage
	 * @param {string} key - name to be deleted
	 */
	deleteValue: function(key){
		if(this.available())
			return GM_deleteValue(jConfig('API.Storage.prefix') + key);
	}
}


