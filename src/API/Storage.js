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
	if(jConfig('API.Storage.engine') == 'GM_Storage' && EXISTS(GM_getValue))
		return API.GM_Storage.getValue.apply(API.GM_Storage, arguments);
	else if(jConfig('API.Storage.engine') == "sessionStorage")
		return API.sessionStorage.getValue.apply(API.sessionStorage, arguments);
	return API.localStorage.getValue.apply(API.localStorage, arguments);
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
jMod.setValue = function(key, def){
	if(jConfig('API.Storage.engine') == 'GM_Storage' && EXISTS(GM_setValue))
		return API.GM_Storage.setValue.apply(API.GM_Storage, arguments);
	else if(jConfig('API.Storage.engine') == "sessionStorage")
		return API.sessionStorage.setValue.apply(API.sessionStorage, arguments);
	return API.localStorage.setValue.apply(API.localStorage, arguments);
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
	if(jConfig('API.Storage.engine') == 'GM_Storage' && EXISTS(GM_getValue))
		return API.GM_Storage.getJSON.apply(API.GM_Storage, arguments);
	else if(jConfig('API.Storage.engine') == "sessionStorage")
		return API.sessionStorage.getJSON.apply(API.sessionStorage, arguments);
	return API.localStorage.getJSON.apply(API.localStorage, arguments);
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
jMod.setJSON = function(key, def){
	if(jConfig('API.Storage.engine') == 'GM_Storage' && EXISTS(GM_setValue))
		return API.GM_Storage.setJSON.apply(API.GM_Storage, arguments);
	else if(jConfig('API.Storage.engine') == "sessionStorage")
		return API.sessionStorage.setJSON.apply(API.sessionStorage, arguments);
	return API.localStorage.setJSON.apply(API.localStorage, arguments);
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
	if(jConfig('API.Storage.engine') == 'GM_Storage' && EXISTS(GM_deleteValue))
		return API.GM_Storage.deleteValue.apply(API.GM_Storage, arguments);
	else if(jConfig('API.Storage.engine') == "sessionStorage")
		return API.sessionStorage.deleteValue.apply(API.sessionStorage, arguments);
	return API.localStorage.deleteValue.apply(API.localStorage, arguments);
}
