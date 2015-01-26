// +@display_name  jQuery Ajax Extensions
// +@history (0.0.18) Added "exportCrossOriginSupport" so jQuery instances in the unsafeWindow can be extended.

RequireScript('jQuery.jQueryExtensions');

+(function(){

jMod.jQueryExtensions.CrossOriginSupportTransportFn = function(_jQueryObj, dataType){
	return (function(options, originalOptions, jqXHR){
		var CrossOriginEnabled = true;
		try{
			// jMod may no longer be in scope
			CrossOriginEnabled = jMod.Config('jQueryExtensions.CrossOrigin');
		}catch(e){}
		
		if(EXISTS(GM_xmlhttpRequest)&&CrossOriginEnabled){
			var extend = (_jQueryObj || $ || jMod).extend,
				mergedOptions = extend(true, {}, options, originalOptions),
				// Translate jQuery jqXHR options to GM options (there are some subtle differences)
				optionMap = {
					context: 'context',
					overrideMimeType: 'overrideMimeType',
					timeout: 'timeout',
					username: 'user', // "username" is "user " when using GM_xmlhttpRequest
					password: 'password',
					onreadystatechange: 'onreadystatechange', // GM Specific option
					ontimeout: 'ontimeout', // GM Specific option
					onprogress: 'onprogress', // GM Specific option
					binary: 'binary' // GM Specific option
				};
			return {
				send: function(headers, callback){
						// 
					var origType = (originalOptions.dataType || '').toLowerCase(),
						gm_request_options = {
							method: options.type || "GET",
							url: options.url,
							// Shallow clone of data from both options
							data: extend({}, options.data || {}, originalOptions.data || {}),
							headers: headers,
							onload: function(response){
								// Done response
								var dResponse = {text: response.responseText},
									rContentType = '',
									key;
									
								try{
									// Try to extract the content type from the response headers
									rContentType = (/Content-Type:\s*([^\s]+)/i.exec(response.responseHeaders))[1];
								}catch(e){}
								
								// HTML
								if(origType === 'html' || /text\/html/i.test(rContentType)) {
									dResponse.html = response.responseText;
									
								// JSON
								} else if(origType === 'json' || (origType !== 'text' && /\/json/i.test(rContentType))){
									try{
										dResponse.json = $.parseJSON(response.responseText);
									}catch(e){}
									
								// XML
								} else if(origType == 'xml' || (origType !== 'text' && /\/xml/i.test(rContentType))){
									if(response.responseXML){
										// Use XML response if it exists
										dResponse.xml = response.responseXML;
									} else {
										// Use DOM parser if it doesn't exist
										try{dResponse.xml = new DOMParser().parseFromString(response.responseText, "text/xml");}catch(e){}
									}
								}
								
								callback(200, "success", dResponse, response.responseHeaders);
							},
							onerror: function(response){
								callback(404, "error", {text: response.responseText}, response.responseHeaders);
							}
						};
					// Map options
					for(key in optionMap){
						if(PROPDEFINED(mergedOptions,key)){
							gm_request_options[optionMap[key]] = mergedOptions[key];
						}
					}
					// If async option if false, enable synchronous option
					if(mergedOptions.async === false)
						gm_request_options.synchronous = true;
					// Send request
					GM_xmlhttpRequest(gm_request_options);
				},
				abort: function() {
					// No abort support
				}
			};
		}
	});
}

function exportjQueryTransportFn(_jQueryObj, dataType){
	return ((unsafeWindow.globaljQueryCrossOriginSupportFn) || (jMod.jQueryExtensions._globaljQueryCrossOriginSupportFn = mExportFunction(jMod.jQueryExtensions.CrossOriginSupportTransportFn(_jQueryObj, dataType), unsafeWindow, {
		defineAs: 'globaljQueryCrossOriginSupportFn',
		allowCallbacks: true,
		allowCrossOriginArguments: true
	})));
}

/**
 * Adds Cross Origin support to a jQuery instance by allowing it to use GM_xmlhttpRequest.
 * @function addCrossOriginSupport
 * @memberof jMod.jQueryExtensions
 * @param {object} [_jQueryObj] - jQuery object - Defaults to first jQuery instance accessible by jMod
 * @param {string} [dataType="* text html xml json"] - A string identifying the data types GM_xmlhttpRequest should handle
 * @example
 *if($){
 *	$(document).ready(function() {
 *		function test_jQueryFunctions(){
 *			jMod.jQueryExtensions.addCrossOriginSupport($);
 *			
 *			// Test $.ajax()
 *			console.log('Test $.ajax("http://google.com")');
 *			$.ajax({
 *					url: 'http://google.com',
 *					contentType: 'text/html',
 *					type: 'GET',
 *					dataType: 'html',
 *					onprogress: function(response){
 *						console.log('onprogress response', response);
 *					},
 *					onreadystatechange: function(response){
 *						console.log('onreadystatechange response', response);
 *					}
 *				})
 *				.done(function(data, textStatus, jqXHR) {
 *					console.log("$.ajax() success: ", jqXHR);
 *				})
 *				.fail(function() {
 *					console.log("$.ajax() error");
 *				});
 *			
 *			// Test $(element).load()
 *			console.log('Test $(element).load("http://google.com #hplogo")');
 *			var tmpDiv = document.createElement('div');
 *			tmpDiv.id = 'tmpDiv';
 *			document.body.appendChild(tmpDiv);
 *			
 *			$('#tmpDiv').load('http://google.com #hplogo', function(responseText, textStatus, jqXHR){
 *				console.log('$(element).load() ' + textStatus, jqXHR);
 *			});
 *		}
 *
 *		test_jQueryFunctions();
 *	});
 *} else {
 *	console.log('Test Failed! No jQuery');
 *}
 */
jMod.jQueryExtensions.addCrossOriginSupport = function(_jQueryObj, dataType){
	// Make sure GM function exists
	if(NOTEXISTS(GM_xmlhttpRequest))
		return;
	
	// If _jQueryObj isn't defined, default to global jQuery object
	if(!_jQueryObj && !(_jQueryObj = jMod.jQuery))
		// Return if there is no global jQuery object
		return;
	
	// Return if already extended
	if(_jQueryObj.jModCrossOriginSupport === true)
		return;
	
	_jQueryObj.ajaxTransport(dataType || "* text html xml json", jMod.jQueryExtensions.CrossOriginSupportTransportFn(_jQueryObj, dataType));
	
	_jQueryObj.extend({jModCrossOriginSupport: true});
}

/**
 * Similar to addCrossOriginSupport, but exports the transport function to the unsafeWindow before extending jQuery. Thus, it can be used on a jQuery instance that exists in the unsafeWindow. This is less safe than using "addCrossOriginSupport" and should only be used if there is no alternative.
 * @function exportCrossOriginSupport
 * @memberof jMod.jQueryExtensions
 * @param {object} [_jQueryObj] - jQuery object - Defaults to first jQuery instance accessible by jMod
 * @param {string} [dataType="* text html xml json"] - A string identifying the data types GM_xmlhttpRequest should handle
 */
jMod.jQueryExtensions.exportCrossOriginSupport = function(_jQueryObj, dataType){
	// Make sure GM function exists
	if(NOTEXISTS(GM_xmlhttpRequest))
		return;
	
	// If _jQueryObj isn't defined, exit
	if(!_jQueryObj)
		return;
	
	// Return if already extended
	if(_jQueryObj.jModCrossOriginSupport === true)
		return;
	
	_jQueryObj.ajaxTransport(dataType || "* text html xml json", exportjQueryTransportFn(_jQueryObj, dataType));
	
	_jQueryObj.extend({jModCrossOriginSupport: true});
}
})()
