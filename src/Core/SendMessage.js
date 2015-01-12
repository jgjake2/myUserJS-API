// +@display_name  SendMessage
// +@history (0.0.15) History begins.

/**
 * This callback is displayed as part of the Requester class.
 * @callback SendMessageResponseCallback
 * @param {*} responseObject - The object returned from the server
 * @param {...*} responseData - Other response data depending on the method used<br><ul><li>XMLHTTPRequest - <b>responseObj</b> The original XMLHTTPRequest response object</li><li>jQuery - <b>textStatus</b>, <b>jqXHR</b></li><li>JSONP - <b>currentScript</b> The value of document.currentScript (also the <b><i>this</i></b> value for callback)</li></ul>
 */

/**
 * @typedef {Object} SendMessageData
 * @property {(string|URLBuilder)} url - URL to send the request to
 * @property {string} [method=XMLHTTPRequest] - Method to use (jQuery|XMLHTTPRequest|JSONP)
 * @property {string} [responseType=json] - Data type being returned
 * @property {SendMessageResponseCallback} callback - Callback function or function name
 * @property {function} onerror - Callback function or function name to handle errors
 */


 
/**
 * Function for sending and receiving data from a remote host
 * function SendMessage
 * @memberof jMod
 * @param {SendMessageData} data - data used to send request
 */
var SendMessage = jMod.SendMessage = function(data){
	if(!jMod.jQueryAvailable && data.method.toLowerCase() == 'jquery'){
		if(typeof GM_xmlhttpRequest !== _undefined)
			data.method = 'XMLHTTPRequest';
		else
			data.method = 'JSONP';
	} else if(typeof GM_xmlhttpRequest === _undefined && data.method.toLowerCase() == 'xmlhttprequest') {
		if(jMod.jQueryAvailable)
			data.method = 'jQuery';
		else
			data.method = 'JSONP';
	}
	
	data.url = jMod.SendMessage.processURL(data);
	switch((data.method || 'XMLHTTPRequest').toLowerCase()){
		case 'jquery':
			if(jMod.debug) console.log('jMod.SendMessage - jquery', data);
			return jMod.SendMessage.jQuery(data);
			break;
		case 'xmlhttprequest':
			if(jMod.debug) console.log('jMod.SendMessage - xmlhttprequest', data);
			return jMod.SendMessage.XMLHTTPRequest(data);
			break;
		case 'jsonp':
		default:
			if(jMod.debug) console.log('jMod.SendMessage - JSONP', data);
			jMod.SendMessage.JSONP(data);
			break;
	}
};

var SendMessageResponseFunctionName = 'jModSendMessageResponseFn';
SendMessage.processURL = function(data){
	var callback_str = (typeof data.callback === "string" ? data.callback : SendMessageResponseFunctionName);
	
	if(typeof data.url !== "object" && data.url.indexOf('?') == -1)
		data.url += '?';

	
	switch(data.method.toLowerCase()){
		case 'jsonp':
			if(data.url instanceof URLBuilder){
				data.url.addArg('callback', callback_str);
				data.url.addArg('jsonp', callback_str);
			} else {
				data.url += '&callback=' + callback_str + '&jsonp=' + callback_str;
			}
			break;
		case 'xmlhttprequest':
			if(data.url instanceof URLBuilder){
				data.url.addArg('json', '1');
			} else {
				data.url += '&json=1';
			}
			break;
		case 'jquery':
			if(data.responseType && data.responseType == 'json'){
				if(data.url instanceof URLBuilder){
					data.url.addArg('json', '1');
				} else {
					data.url += '&json=1';
				}
			}
			break;
	}
	/*
	if(data.method.toLowerCase() == 'jsonp'){
		data.url += '&callback=' + callback_str + '&jsonp=' + callback_str;
	} else if(data.method.toLowerCase() == 'xmlhttprequest') {
		data.url += '&json=1';
	} else if(data.method.toLowerCase() == 'jquery') {
		if(data.responseType && data.responseType == 'json')
			data.url += '&json=1';
	}
	*/
	return data.url;
}

SendMessage.jQuery = function(data){
	var callback_str = (typeof data.callback === "string" ? data.callback : SendMessageResponseFunctionName);
	var callbackIndex = SendMessage.addCallbacks(data);
	
	try {
		$.getJSON(data.url.toString(), {
			async: true,
			format: "json"
		})
		.done(function(result, textStatus, jqXHR) {
			SendMessage.execCallback(callbackIndex, null, result, textStatus, jqXHR);
		})
		.fail(function(jqxhr, textStatus, error) {
			SendMessage.execErrorCallback(callbackIndex, null, jqxhr, textStatus, error);
		});
	} catch(e) {
		return false;
	}
	return true;
}

SendMessage.XMLHTTPRequest = function(data){
	try{
		if(typeof GM_xmlhttpRequest !== _undefined){
			var callbackIndex = SendMessage.addCallbacks(data);
			GM_xmlhttpRequest({
				method: "GET", url: data.url.toString(),
				headers: {"Accept": "application/javascript"},
				onload: (function(callbackIndex, responseType){
					return function(response){
						if(responseType.toLowerCase() == 'json'){
							var responseJSON;
							try {
								responseJSON = JSON.parse(response.responseText);
							} catch(e) {
							} finally {
								return SendMessage.execCallback(callbackIndex, null, responseJSON, response);
							}
						} else {
							return SendMessage.execCallback(callbackIndex, null, response.responseText, response);
						}
					}
				})(callbackIndex, data.responseType || 'json'),
				onerror: (function(callbackIndex){
					return function(response){
						console.log('Error! XMLHttpRequest', response);
						return SendMessage.execErrorCallback(callbackIndex, null, response.responseText, response);
					}
				})(callbackIndex),
			});
			return true;
		}
	} catch(e){
		console.log('Error! getXMLHttpRequest', e);
	} finally {
		return false;
	}
}

SendMessage.JSONP = function(data){
	var callbackIndex = SendMessage.addCallbacks(data);
	
	var newScriptEl = createNewElement({
		type: 'script',
		async: true,
		defer: true,
		/*
		onload: (function(callback){
			var _callback = callback;
			return function(response){
				console.log('onload', response);
				_callback(response);
				eventCancel(response);
				return false;
			}
		})(data.callback),
		*/
		attributes: {
			'data-callback-index': callbackIndex
		}
	});
	try{
		var head = document.head || document.getElementsByTagName("head")[0];
		head.appendChild(newScriptEl);
		newScriptEl.src = data.url.toString();
	}catch(e){
		return SendMessage.execErrorCallback(callbackIndex, null, e);
		return false;
	}
	return true;
}

SendMessage._callbacks = [];

SendMessage.addCallbacks = function(data){
	return (SendMessage._callbacks.push({
			complete: data.callback,
			error: data.onerror
		})) - 1;
}

SendMessage.execCallback = function(index, thisVal){
	try{
		var cb = SendMessage._callbacks[index].complete;
		if(typeof cb === _undefined)
			return false;
		else if(typeof cb === "function"){
			return cb.apply(thisVal || null, Slice.call(arguments, 2));
		} else if(typeof cb === "string"){
			if(typeof unsafeWindow[cb] === "function")
				return unsafeWindow[cb].apply(thisVal || null, Slice.call(arguments, 2));
		}
	} catch(e) {
		console.log('Error SendMessage.execCallback!', e);
		return false;
	}
}

SendMessage.execErrorCallback = function(index, thisVal){
	try{
		var cb = SendMessage._callbacks[index].onerror;
		if(typeof cb === _undefined)
			return false;
		else if(typeof cb === "function"){
			return cb.apply(thisVal || null, Slice.call(arguments, 2));
		} else if(typeof cb === "string"){
			if(typeof unsafeWindow[cb] === "function")
				return unsafeWindow[cb].apply(thisVal || null, Slice.call(arguments, 2));
		}
	} catch(e) {
		console.log('Error SendMessage.execErrorCallback!', e);
		return false;
	}
}

function SendMessage_responseCallback(response){
	SendMessage.execCallback(document.currentScript.getAttribute('data-callback-index'), document.currentScript, response, document.currentScript);
}

SendMessage._globalResponseCallback = mExportFunction(SendMessage_responseCallback, unsafeWindow, {
	defineAs: SendMessageResponseFunctionName,
	allowCallbacks: true,
	allowCrossOriginArguments: true
});