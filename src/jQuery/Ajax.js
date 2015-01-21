// +@display_name  jQuery Ajax Extensions

RequireScript('jQuery.jQueryExtensions');

jMod.jQueryExtensions.addCrossDomainSupport = function(_jQueryObj){
	if(_undefined==typeof GM_xmlhttpRequest)
		return;
		
	if(!_jQueryObj)
		_jQueryObj = jMod.jQuery;
		
	_jQueryObj.ajaxTransport( "* text html xml json", function( options, originalOptions, jqXHR ){
		if(_undefined!==typeof GM_xmlhttpRequest){
			var mergedOptions = jMod.extend(true, {}, options, originalOptions);
			// Translate jQuery jqXHR options to GM options (there are some subtle differences)
			var optionMap = {
				context: 'context',
				overrideMimeType: 'overrideMimeType',
				timeout: 'timeout',
				username: 'user',
				password: 'password'
			};
			return {
				send: function(headers, callback){
					var origType = (originalOptions.dataType || '').toLowerCase();
					
					function done(status, response, headers){
						var statusText = ( status === 200 ) ? "success" : "error";
						callback(status, statusText, response, headers);
					}
					
					var gm_request_options = {
						method: options.type || "GET",
						url: options.url,
						//data: options.data || originalOptions.data || {},
						data: jMod.extend({}, options.data || {}, originalOptions.data || {}),
						headers: headers,
						onload: function(response){
							var dResponse = {text: response.responseText},
								rContentType = '',
								contentTypePatt = /Content-Type:\s*([^\s]+)/i;
								
							try{rContentType = contentTypePatt.exec(response.responseHeaders)[1];}catch(e){}
							
							// HTML
							if(origType === 'html' || /text\/html/i.test(rContentType)) {
								dResponse.html = response.responseText;
							// JSON
							} else if(origType === 'json' || (origType !== 'text' && /\/json/i.test(rContentType))) {
								try{
									dResponse.json = $.parseJSON(response.responseText);
								}catch(e){}
							// XML
							} else if(origType == 'xml' || (origType !== 'text' && /\/xml/i.test(rContentType))){
								try{dResponse.xml = new DOMParser().parseFromString(response.responseText, "text/xml");}catch(e){}
							}
							
							done(200, dResponse , response.responseHeaders);
						},
						onerror: function(response){
							done(404, {text: response.responseText} , response.responseHeaders);
						}
					};
					
					for(var key in optionMap){
						if(_undefined!==typeof mergedOptions[key]){
							gm_request_options[optionMap[key]] = mergedOptions[key];
						}
					}
					
					/*
					if(options.context)
						gm_request_options.context = options.context;
						
					if(options.overrideMimeType)
						gm_request_options.overrideMimeType = options.overrideMimeType;
						
					if(options.username)
						gm_request_options.user = options.username;
						
					if(options.password)
						gm_request_options.password = options.password;
					*/
					GM_xmlhttpRequest(gm_request_options);
				},
				abort: function() {
					// No abort support
				}
			};
		}
	});
	
}

/*
function test_jQueryFunctions(){
	if(jMod.jQueryAvailable){
		jMod.jQueryExtensions.addCrossDomainSupport(jMod.jQuery);
		
		// Test $.ajax()
		console.log('Test $.ajax("http://google.com")');
		jMod.jQuery.ajax({
				url: 'http://google.com',
				contentType: 'text/plain',
				type: 'GET',
				dataType: 'html'
			})
			.done(function() {
				console.log("$.ajax() success");
			})
			.fail(function() {
				console.log("$.ajax() error");
			});
		
		// Test $(element).load()
		console.log('Test $(element).load("http://google.com #hplogo")');
		var tmpDiv = document.createElement('div');
		tmpDiv.id = 'tmpDiv';
		document.body.appendChild(tmpDiv);
		
		$('#tmpDiv').load('http://google.com #hplogo', function(responseText, textStatus, jqXHR){
			console.log('$(element).load() ' + textStatus);
		});
	}
}

test_jQueryFunctions();
*/