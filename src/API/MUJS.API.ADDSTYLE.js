// +@display_name  Add Style
// +@replace  MUJS.API.ADDSTYLE
// +@history (0.0.9) History begins.

/**
 * Adds given css to the the page.
 * @param {string} css The CSS to be added to the document.
 * @returns {Object} node The newly created style node
 */
MUJS.API.addStyle = function(css){
	if (typeof css != "undefined" && css != '') {
		if(heads = document.getElementsByTagName('head')) {
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
