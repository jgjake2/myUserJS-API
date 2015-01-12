// +@display_name  isElement

/**
 * Check if input is a DOM element
 * @function isElement
 * @memberof jMod.Element
 * @param {*} obj - Input to be checked
 * @returns {boolean}
 */
var isElement = function(obj) {
	try {
		return obj instanceof HTMLElement;
	} catch(e) {
		return (typeof obj==="object") &&
		(obj.nodeType===1) && (typeof obj.style === "object") &&
		(typeof obj.ownerDocument ==="object");
	}
}
