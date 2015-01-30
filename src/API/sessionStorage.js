// +@display_name  SessionStorage
// +@history (0.0.17) History begins.

/**
 * Shim for interacting with sessionStorage
 * @namespace jMod.API.sessionStorage
 */

jMod.API.sessionStorage = {
	/**
	 * @function getValue
	 * @memberof jMod.API.sessionStorage
	 * @param {string} key - name
	 * @param {string|boolean|number} [def] - default value to return if key does not exist
	 */
	getValue: function(key, def){
		var r = this.stor.getItem(jConfig('API.Storage.prefix') + key);
		return (r !== null ? r: def);
	},
	/**
	 * @function setValue
	 * @memberof jMod.API.sessionStorage
	 * @param {string} key - name
	 * @param {string|boolean|number} [value] - value to be set
	 */
	setValue: function(key, value){
		return this.stor.setItem(jConfig('API.Storage.prefix') + key, value);
	},
	/**
	 * @function setJSON
	 * @memberof jMod.API.sessionStorage
	 * @param {string} key - name
	 * @param {object} [value] - value to be set
	 */
	setJSON: function(key, value){
		var tmp;
		try{
			tmp = JSON.stringify(value);
		}catch(e){
			jModError(e, 'sessionStorage.setJSON', 'Cannot stringify value!');
		}
		try{
			return this.setValue(key, tmp || value);
		}catch(e){}
	},
	/**
	 * @function getJSON
	 * @memberof jMod.API.sessionStorage
	 * @param {string} key - name
	 * @param {object} [def] - default value to return if key does not exist
	 */
	getJSON: function(key, def){
		var tmp = this.getValue(key, def);
		try{
			if(typeof tmp === "string")
				return JSON.parse(tmp);
		}catch(e){
			jModError(e, 'sessionStorage.setJSON', 'Error parsing value!');
		}
		return tmp;
	},
	/**
	 * @function deleteValue
	 * @memberof jMod.API.sessionStorage
	 * @param {string} key - name to be deleted
	 */
	deleteValue: function(key){
		return this.stor.removeItem(jConfig('API.Storage.prefix') + key);
	}
}

/**
 * Getter function that retrieves the sessionStorage object
 * @name stor
 * @memberof jMod.API.sessionStorage
 * @type {object}
 */
Object.defineProperty(jMod.API.sessionStorage, "stor", {
	get: function(){return (sessionStorage?sessionStorage:(window.sessionStorage?window.sessionStorage:unsafeWindow.sessionStorage));},
	enumerable: false
});

