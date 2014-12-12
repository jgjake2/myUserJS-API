// +@display_name  Add Script
// +@replace  MUJS.API.ADDSCRIPT
// +@history (0.0.9) History begins.

/**
 * Adds given js to the the page.
 * @param {string} js The js to be added to the document.
 * @param {string} src The src for the script tag.
 * @param {string} id The id for the script tag.
 * @returns {Object} node The newly created script node
 */
MUJS.API.addScript = function(js, src, id, async){
	if(heads = document.getElementsByTagName('head')) {
		var newScript = document.createElement('script');
		if(typeof js != "undefined" && js != ''){
			try {
				newScript.innerHTML = js;
			} catch (x) {
				newScript.innerText = js;
			}
		}
		
		if(typeof src != "undefined" && src != ''){
			try{newScript.src = src;}catch(x){}
		}
		
		if(typeof id !== "undefined"){
			try{newScript.id = id;}catch(x){}
		}
		
		if(typeof async !== "undefined"){
			newScript.async = true;
		}
		
		newScript.type = 'text/javascript';
		try{return heads[0].appendChild(newScript);}catch(x){}
	}
	return null;
}