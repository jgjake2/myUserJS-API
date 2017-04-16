// +@display_name  Storage

/***********************************
 ** GM_Storage
 **********************************/
ImportScript('API.GM_Storage');
 
/***********************************
 ** LocalStorage
 **********************************/
ImportScript('API.localStorage');

/***********************************
 ** LocalStorage
 **********************************/
ImportScript('API.sessionStorage');

+(function(){

var storageEngineOrder = function(){
	var order = [],
		engine = jConfig('API.Storage.engine'),
		gm = 'GM_Storage',
		ls = 'localStorage',
		ss = 'sessionStorage';
	
	try{
		
		try{
			if(API[engine] && API[engine].available())
				order = [engine];
		}catch(e){}
		
		if(order.indexOf(gm) == -1 && API[gm].available())
			order.push(gm);
			
		if(order.indexOf(ls) == -1 && API[ls].available())
			order.push(ls);
		
		if(order.indexOf(ss) == -1 && API[ss].available())
			order.push(ss);
		
	}catch(e){}
	
	return order;
}

/**
 * Get a value from the default storage engine (see [Storage configuration]{@link jMod.Config})
 * @function getValue
 * @memberof jMod
 * @param {string} key - name
 * @param {string|boolean|number} [def] - default value to return if key does not exist
 * @see jMod.API.localStorage
 * @see jMod.API.sessionStorage
 * @see jMod.API.GM_Storage
 */
jMod.getValue = function(key, def){
	var i = 0, storageEngines = storageEngineOrder();
	for(; i < storageEngines.length; i++){
		try{
			return API[storageEngines[i]].getValue.apply(API[storageEngines[i]], arguments);
		} catch(e){}
	}
	return def;
}

/**
 * Set a value in the default storage engine (see [Storage configuration]{@link jMod.Config})
 * @function setValue
 * @memberof jMod
 * @param {string} key - name
 * @param {string|boolean|number} [value] - value to be set
 * @see jMod.API.localStorage
 * @see jMod.API.sessionStorage
 * @see jMod.API.GM_Storage
 */
jMod.setValue = function(key){
	var i = 0, storageEngines = storageEngineOrder();
	for(; i < storageEngines.length; i++){
		try{
			return API[storageEngines[i]].setValue.apply(API[storageEngines[i]], arguments);
		} catch(e){}
	}
}

/**
 * Get a JSON object from the default storage engine (see [Storage configuration]{@link jMod.Config})
 * @function getJSON
 * @memberof jMod
 * @param {string} key - name
 * @param {object} [def] - default value to return if key does not exist
 * @see jMod.API.localStorage
 * @see jMod.API.sessionStorage
 * @see jMod.API.GM_Storage
 */
jMod.getJSON = function(key, def){
	var i = 0, storageEngines = storageEngineOrder();
	for(; i < storageEngines.length; i++){
		try{
			return API[storageEngines[i]].getJSON.apply(API[storageEngines[i]], arguments);
		} catch(e){}
	}
	return def;
}

/**
 * Set an object in the default storage engine (see [Storage configuration]{@link jMod.Config})
 * @function setJSON
 * @memberof jMod
 * @param {string} key - name
 * @param {string|boolean|number} [value] - value to be set
 * @see jMod.API.localStorage
 * @see jMod.API.sessionStorage
 * @see jMod.API.GM_Storage
 */
jMod.setJSON = function(key){
	var i = 0, storageEngines = storageEngineOrder();
	for(; i < storageEngines.length; i++){
		try{
			return API[storageEngines[i]].setJSON.apply(API[storageEngines[i]], arguments);
		} catch(e){}
	}
}

/**
 * Delete a value from the default storage engine (see [Storage configuration]{@link jMod.Config})
 * @function deleteValue
 * @memberof jMod
 * @param {string} key - name to be deleted
 * @see jMod.API.localStorage
 * @see jMod.API.sessionStorage
 * @see jMod.API.GM_Storage
 */
jMod.deleteValue = function(key){
	var i = 0; storageEngines = storageEngineOrder();
	for(; i < storageEngines.length; i++){
		try{
			return API[storageEngines[i]].deleteValue.apply(API[storageEngines[i]], arguments);
		} catch(e){}
	}
}

})();
