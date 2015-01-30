// +@display_name  LocalStorage
// +@history (0.0.9) History begins.
// +@history (0.0.15) Removed ref to jMod.fn (__proto__ is depreciated).

/**
 * Shim for interacting with localStorage
 * @namespace jMod.API.localStorage
 */
/*
Object.defineProperty(jMod, "stor", {
	value: (function(){return (localStorage?localStorage:(unsafeWindow.localStorage?unsafeWindow.localStorage:window.localStorage));})(),
	enumerable: false
});
*/

jMod.API.localStorage = {
	/**
	 * @function getValue
	 * @memberof jMod.API.localStorage
	 * @param {string} key - name
	 * @param {string|boolean|number} [def] - default value to return if key does not exist
	 */
	getValue: function(key, def){
		var r = this.stor.getItem(jConfig('API.Storage.prefix') + key);
		return (r !== null ? r: def);
	},
	/**
	 * @function setValue
	 * @memberof jMod.API.localStorage
	 * @param {string} key - name
	 * @param {string|boolean|number} [value] - value to be set
	 */
	setValue: function(key, value){
		return this.stor.setItem(jConfig('API.Storage.prefix') + key, value);
	},
	/**
	 * @function setJSON
	 * @memberof jMod.API.localStorage
	 * @param {string} key - name
	 * @param {object} [value] - value to be set
	 */
	setJSON: function(key, value){
		var tmp;
		try{
			tmp = JSON.stringify(value);
		}catch(e){
			jModError(e, 'localStorage.setJSON', 'Cannot stringify value!');
		}
		try{
			return this.setValue(key, tmp || value);
		}catch(e){}
	},
	/**
	 * @function getJSON
	 * @memberof jMod.API.localStorage
	 * @param {string} key - name
	 * @param {object} [def] - default value to return if key does not exist
	 */
	getJSON: function(key, def){
		var tmp = this.getValue(key, def);
		try{
			if(typeof tmp === "string")
				return JSON.parse(tmp);
		}catch(e){
			jModError(e, 'localStorage.setJSON', 'Error parsing value!');
		}
		return tmp;
	},
	/**
	 * @function deleteValue
	 * @memberof jMod.API.localStorage
	 * @param {string} key - name to be deleted
	 */
	deleteValue: function(key){
		return this.stor.removeItem(jConfig('API.Storage.prefix') + key);
	}
}

/**
 * Getter function that retrieves the localStorage object
 * @name stor
 * @memberof jMod.API.localStorage
 * @type {object}
 */
Object.defineProperty(jMod.API.localStorage, "stor", {
	get: function(){return (localStorage?localStorage:(window.localStorage?window.localStorage:unsafeWindow.localStorage));},
	enumerable: false
});

