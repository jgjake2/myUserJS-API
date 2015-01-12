// +@display_name  Add Style
// +@history (0.0.9) History begins.
// +@history (0.0.13) Added GM_addStyle if it exists.

/**
 * Adds given css to the the page.
 * @function addStyle
 * @memberof jMod.API
 * @param {string} css The CSS to be added to the document.
 * @returns {Object} node The newly created style node
 */
var addStyle = jMod.API.addStyle = function(css){
	if (typeof css != _undefined && css != '') {
		if(typeof GM_addStyle !== _undefined){
			GM_addStyle(css);
		} else if(heads = document.getElementsByTagName('head')) {
			var style = document.createElement('style');
			try {
				style.innerHTML = css;
			} catch (x) {
				style.innerText = css;
			}
			style.type = 'text/css';
			return heads[0].appendChild(style);
		}
	}
	return null;
}
