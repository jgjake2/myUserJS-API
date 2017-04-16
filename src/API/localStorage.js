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
	 * @function available
	 * @memberof jMod.API.localStorage
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
	 * @memberof jMod.API.localStorage
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
	 * @memberof jMod.API.localStorage
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
	 * @memberof jMod.API.localStorage
	 * @param {string} key - name
	 * @param {object} [value] - value to be set
	 */
	setJSON: function(key, value){
		if(!this.available()) return;
		var tmp;
		try{
			tmp = JSON.stringify(value);
		}catch(e){
			jModLogError(e, 'localStorage.setJSON', 'Cannot stringify value!');
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
		if(!this.available()) return def;
		var tmp;
		try{
			tmp = this.getValue(key, def);
		}catch(e){}
		try{
			if(typeof tmp === "string")
				return JSON.parse(tmp);
		}catch(e){
			jModLogError(e, 'localStorage.setJSON', 'Error parsing value!');
		}
		return tmp || def;
	},
	/**
	 * @function deleteValue
	 * @memberof jMod.API.localStorage
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
 * Getter function that retrieves the localStorage object
 * @name stor
 * @memberof jMod.API.localStorage
 * @type {object}
 */
Object.defineProperty(jMod.API.localStorage, "stor", {
	get: function(){
		try{
			/*
			return (
					_undefined!==typeof localStorage && localStorage!=null?localStorage:
						(window.localStorage&&window.localStorage!=null?window.localStorage:
							(unsafeWindow.localStorage&&unsafeWindow.localStorage!=null?unsafeWindow.localStorage:undefined)
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
			jModLogWarning("jMod.API.localStorage", "localStorage unavailable!", e.message);
		}
	},
	enumerable: false
});

