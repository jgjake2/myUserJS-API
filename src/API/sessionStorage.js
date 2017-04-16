// +@display_name  SessionStorage
// +@history (0.0.17) History begins.

/**
 * Shim for interacting with sessionStorage
 * @namespace jMod.API.sessionStorage
 */

jMod.API.sessionStorage = {
	/**
	 * @function available
	 * @memberof jMod.API.sessionStorage
	 */
	available: function(){
		try {
			var s = this.stor;
			if(_undefined!==typeof s && s != null && s.getItem && s.setItem)
				return true;
		} catch(e){}
		
		return false;
	},
	/**
	 * @function getValue
	 * @memberof jMod.API.sessionStorage
	 * @param {string} key - name
	 * @param {string|boolean|number} [def] - default value to return if key does not exist
	 */
	getValue: function(key, def){
		if(!this.available()) return def;
		try{
			var r = this.stor.getItem(jConfig('API.Storage.prefix') + key);
			return (r !== null ? r: def);
		}catch(e){}
		return def;
	},
	/**
	 * @function setValue
	 * @memberof jMod.API.sessionStorage
	 * @param {string} key - name
	 * @param {string|boolean|number} [value] - value to be set
	 */
	setValue: function(key, value){
		if(!this.available()) return;
		try{
			return this.stor.setItem(jConfig('API.Storage.prefix') + key, value);
		}catch(e){}
	},
	/**
	 * @function setJSON
	 * @memberof jMod.API.sessionStorage
	 * @param {string} key - name
	 * @param {object} [value] - value to be set
	 */
	setJSON: function(key, value){
		if(!this.available()) return;
		var tmp;
		try{
			tmp = JSON.stringify(value);
		}catch(e){
			jModLogError(e, 'sessionStorage.setJSON', 'Cannot stringify value!');
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
		if(!this.available()) return def;
		var tmp;
		try{
			tmp = this.getValue(key, def);
		}catch(e){}
		try{
			if(typeof tmp === "string")
				return JSON.parse(tmp);
		}catch(e){
			jModLogError(e, 'sessionStorage.setJSON', 'Error parsing value!');
		}
		return tmp || def;
	},
	/**
	 * @function deleteValue
	 * @memberof jMod.API.sessionStorage
	 * @param {string} key - name to be deleted
	 */
	deleteValue: function(key){
		if(!this.available()) return;
		try{
			return this.stor.removeItem(jConfig('API.Storage.prefix') + key);
		}catch(e){}
	}
}

/**
 * Getter function that retrieves the sessionStorage object
 * @name stor
 * @memberof jMod.API.sessionStorage
 * @type {object}
 */
Object.defineProperty(jMod.API.sessionStorage, "stor", {
	get: function(){
		try{
			/*
			return (
					_undefined!==typeof sessionStorage && sessionStorage!=null?sessionStorage:
						(window.sessionStorage&&window.sessionStorage!=null?window.sessionStorage:
							(unsafeWindow.sessionStorage&&unsafeWindow.sessionStorage!=null?unsafeWindow.sessionStorage:undefined)
						)
					);
			*/
			return (
				window.localStorage&&window.localStorage!=null?window.localStorage:
					(_undefined!==typeof localStorage && localStorage!=null?localStorage:
						(unsafeWindow.localStorage&&unsafeWindow.localStorage!=null?unsafeWindow.localStorage:undefined)
					)
				);
		}catch(e){
			jModLogWarning("jMod.API.sessionStorage", "sessionStorage unavailable!", e.message);
		}
	},
	enumerable: false
});

