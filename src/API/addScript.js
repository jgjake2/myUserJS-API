// +@display_name  Add Script
// +@history (0.0.9) History begins.
// +@history (0.0.16) Minor improvements.

/**
 * Adds given js to the the page.
 * @function addScript
 * @memberof jMod.API
 * @param {string} [js] The js to be added to the document.
 * @param {string} [src] The src for the script tag.
 * @param {string} [id] The id for the script tag.
 * @param {string} [type] The type for the new script tag.
 * @param {boolean} [async] Value of the async attribute.
 * @param {boolean} [defer] Value of the defer attribute.
 * @returns {Object} node The newly created script node
 */
jMod.API.addScript = function(js, src, id, type, async, defer){
	var newScript,
		head = jMod.Element.head,
		data;
	if(typeof js === "object")
		data = js;
	else
		data = {
			js: js,
			src: src,
			id: id,
			type: type,
			async: async,
			defer: defer
		};
	if(head) {
		newScript = jMod.Element.document.createElement('script');

		if(typeof data.id !== _undefined){
			try{newScript.id = data.id;}catch(x){}
		}
		
		if(typeof data.async !== _undefined){
			newScript.async = data.async;
		}
		
		if(typeof data.defer !== _undefined){
			newScript.defer = data.defer;
		}
		
		if(typeof data.onload !== _undefined){
			newScript.onload = data.onload;
		}
		
		if(typeof data.onerror !== _undefined){
			newScript.onerror = data.onerror;
		}
		
		newScript.type = data.type || 'text/javascript';
		
		if(typeof data.js != _undefined && data.js != null && data.js != ''){
			try {
				newScript.innerHTML = data.js;
			} catch (x) {
				newScript.innerText = data.js;
			}
		}
		
		if(typeof data.src != _undefined && data.src != null && data.src != ''){
			try{newScript.src = data.src;}catch(x){}
		}
		
		try{return head.appendChild(newScript);}catch(x){}
	}
	return null;
};