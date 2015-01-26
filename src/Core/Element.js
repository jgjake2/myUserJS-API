// +@display_name  Element
// +@history (0.0.14) History begins.
// +@history (0.0.15) Added documentation.
// +@history (0.0.15) Created jMod.Element namespace and function.
// +@history (0.0.18) Various efficiency updates.

// isElement
RequireScript('Core.Element.isElement');

// Query
RequireScript('Core.Element.Query');

/**
 * @namespace jMod.Element
 * @memberOf jMod
 * @since 0.0.15
 */
 
/**
 * @function Element
 * @memberof jMod
 * @variation 2
 * @param {(string|object)} data - (string) Command to execute | (object) options for new element
 * @param {*} [data2] - Arguments for command
 */
jMod.Element = function(data, data2){
	try{
		var args = Slice.call(arguments);
		switch(RealTypeOf(data)){
			case "string":
				// If data is a command in jMod.Element
				if(typeof jMod.Element[command] === "function"){
					return jMod.Element._call.apply(jMod.Element, arguments);
				} else {
					
				}

				break;
			case "map":
			case "object":
				if(args.length == 1){
					return createNewElement.apply(jMod.Element, arguments);
				} else {
					return createNewElement(args);
				}
				break;
			default:
				// If data is element
				if(jMod.Element.isElement(data)){
					
				} else {
				
				}
				break;
		}
	}catch(e){
		//console.log('error, jMod.Element', e);
		jModError(e, 'jMod.Element');
	}
};

jMod.Element._call = function(command){
	if(typeof jMod.Element[command] === "function")
		return jMod.Element[command].apply(jMod.Element, Slice.call(arguments, 1));
}


jMod.Element.isElement = isElement;

/**
 * Check if a DOM element has a particular class
 * @function hasClass
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {string} className - Class to check for
 * @returns {boolean}
 */
var hasClass = jMod.Element.hasClass = function(el, className) {
	return (" "+el.className+" ").indexOf(" "+className+" ") != -1;
	//return (el.className.split(' ').indexOf(className) == -1 ? false : true)
}

/**
 * Check if a DOM element has one or more of the class names given as the second parameter
 * @function hasClasses
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {(string[]|string)} classNames - Class names to check for
 * @returns {string[]} Array of strings containing the matching classes
 */
var hasClasses = jMod.Element.hasClasses = function(el, classNames) {
	var classNamesPad = " "+el.className+" ",
		classNamesArr = (ISSTRING(classNames) ? classNames.split(' ') : classNames);
	return classNamesArr.filter(function(name){return classNamesPad.indexOf(" "+name+" ") != -1});
	/*
	var i,
		r = [],
		classArr = el.className.split(' '),
		classNamesArr = (ISSTRING(classNames) ? classNames.split(' ') : classNames);
	for(i in classNamesArr)
		if(classArr.indexOf(classNamesArr[i]) != -1)
			r.push(classNamesArr[i]);
	return r;
	*/
}

/**
 * Check if a DOM element is missing one or more of the class names given as the second parameter
 * @function missingClasses
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {(string[]|string)} classNames - Class names to check for
 * @returns {string[]} Array of strings containing the missing class names
 */
var missingClasses = jMod.Element.missingClasses = function(el, classNames) {
	var classNamesPad = " "+el.className+" ",
		classNamesArr = (ISSTRING(classNames) ? classNames.split(' ') : classNames);
	return classNamesArr.filter(function(name){return classNamesPad.indexOf(" "+name+" ") == -1});
	/*
	var i,
		r = [],
		classArr = el.className.split(' '),
		classNamesArr = (ISSTRING(classNames) ? classNames.split(' ') : classNames);
	for(i in classNamesArr)
		if(classArr.indexOf(classNamesArr[i]) == -1)
			r.push(classNamesArr[i]);
	return r;
	*/
}

/**
 * Add a class to a DOM Element
 * @function addClass
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {string} className - Class name to add
 * @returns {Element} The input element
 */
var addClass = jMod.Element.addClass = function(el, className) {
	if(!hasClass(el, className))
		el.className = (el.className + ' ' + className).trim();
	return el;
}

/**
 * Add multiple classes to a DOM Element
 * @function addClasses
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {(string[]|string)} classNames - Class names to add
 * @returns {Element} The input element
 */
var addClasses = jMod.Element.addClasses = function(el, classNames) {
	//var classNamesArr = (typeof classNames === "string" ? classNames.split(' ') : classNames);
	return el.className = (el.className + ' ' + missingClasses(el, classNames).join(" ")).trim(), el;
	//return el;
	/*
	var has = el.className.split(' ');
	for(var i = 0; i < classNamesArr.length; i++){
		if(has.indexOf(classNamesArr[i]) == -1)
			has.push(classNamesArr[i]);
	}
	el.className = has.join(' ');
	return el;
	*/
}

var removeClassRegex = new RegExp('\\w+');
/**
 * Remove a class from a DOM Element
 * @function removeClass
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {string} className - Class name to remove
 * @returns {Element} The input element
 */
var removeClass = jMod.Element.removeClass = function(el, className) {
	return el.className = ((" "+el.className+" ").replace(new RegExp(" "+className+" ", 'g'), " ")).trim(), el;
	//return el;
	/*
	var classStr = el.className;
	var classArr = classStr.split(' ');
	var index = classArr.indexOf(className);
	if(index == -1)
		return el;
	classArr.splice(index, 1);
	el.className = classArr.join(' ');
	return el;
	*/
}

/**
 * Remove multiple classes from a DOM Element
 * @function removeClasses
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {(string[]|string)} classNames - Class names to remove
 * @returns {Element} The input element
 */
var removeClasses = jMod.Element.removeClasses = function(el, classNames) {
	return el.className = ((" "+el.className+" ").replace(new RegExp(" (?:"+((ISSTRING(classNames) ? classNames.split(' ') : classNames).join("|"))+") ", 'g'), " ")).trim(), el;
	//return el;
	/*
	var namesArr;
	if(typeof classNames === "string")
		namesArr = Slice.call(arguments, 1);
	else
		namesArr = classNames;
	var classStr = el.className;
	var classArr = classStr.split(' ');
	for(var i in namesArr){
		var index = classArr.indexOf(namesArr[i]);
		if(index != -1)
			classArr.splice(index, 1);
	}
	el.className = classArr.join(' ');
	return el;
	*/
}

var setAttributes = function(el, attrs) {
	for(var attr in attrs)
		el.setAttribute(attr, attrs[attr]);
	return el;
}

var hasAttribute = function(el, attr) {
	return el.hasAttribute(attr);
}

var hasAttributes = function(el, attrs) {
	r = [];
	if(typeof attrs === "string")
		attrs = attrs.split(' ');
	for(var i = 0; i < attrs.length; i++)
		if(el.hasAttribute(attrs[i]))
			r.push(attrs[i]);
	return r;
}

var getAttribute = function(el, attr) {
	return el.getAttribute(attr);
}

/**
 * Append a child to a DOM Element. The input can be an a simple element or string. It can be an object containing Element information {@link createNewElement}. Additionally, it can be an array of any of the preciously mentioned types.
 * @function appendChild
 * @memberof jMod.Element
 * @param {Element} el - DOM Element
 * @param {(Element|object|string|*)} data - Child
 * @returns {Element} The input element
 * @see createNewElement
 */
var appendChild = jMod.Element.appendChild = function(el, data) {
	var nodes, dummy, i;
	try{
		if(!isElement(el) && typeof el === "object" && el.type !== undefined){
			i = (el.innerHTML === undefined && el.text !== undefined ? 'text' : 'innerHTML');
			if(RealTypeOf(el[i]) == "array")
				el[i].push(data);
			else
				el[i] = [el[i], data];
		} else {
			if(typeof data === _undefined || data === null)
				return el;
			else if(isElement(data))
				el.appendChild(data);
			else {
				switch(RealTypeOf(data)){
					case _undefined:
					case "null":
						break;
					case "array":
						for(i = 0; i < data.length; i++)
							el = appendChild(el, data[i]);
						break;
					case "object":
					case "map":
						if(dummy = createNewElement(data))
							el.appendChild(dummy);
						break;
					//case "string":
					//case "number":
					//case "symbol":
					//case "boolean":
					default:
						nodes, dummy = document.createElement('div');
						dummy.innerHTML = data;
						nodes = dummy.childNodes;
						for(i = 0; i < nodes.length; i++)
							el.appendChild(nodes[i]);
						break;
				}
			}
		}
	} catch(e) {
		jModError(e, 'jMod.Element.appendChild');
	} finally {
		return el;
	}
}

/**
 * Data for event listeners when creating new elements
 * @typedef {Object} NewElementCallbackData
 * @memberof jMod.Element
 * @property {Function} callback - Callback function
 * @property {boolean} [capture=false] - Use capture
 * @see createNewElement
 */

/**
 * Data for creating a new element
 * @typedef {Object} NewElementData
 * @memberof jMod.Element
 * @property {!string} type - The element type to be created (ex. div, h1, etc...)
 * @property {string} [id] - Element id
 * @property {string} [className] - Class name(s)
 * @property {string} [class] - Synonym for className
 * @property {string} [style] - Style to be applied to the new element
 * @property {(Element|Element[]|string|string[]|object|object[])} [innerHTML] - Child element(s) to append to the new element
 * @property {(Element|Element[]|string|string[]|object|object[])} [text] - Synonym for innerHTML
 * @property {object} [attributes] - Key-value list of attributes to be added to the new element
 * @property {object.<string, jMod.Element.NewElementCallbackData>} [EventListeners] - Key-value list of Events Names and Callback information to be added to the new element
 * @property {object} [eventListeners] - Synonym for EventListeners
 * @property {object} [Events] - Synonym for EventListeners
 * @property {object} [events] - Synonym for EventListeners
 * @property {object} [Listeners] - Synonym for EventListeners
 * @property {object} [listeners] - Synonym for EventListeners
 * @see createNewElement
 */

/** @const */
var validElementProps = ['id', 'className', 'checked', 'defaultValue', 'title', 'async', 'defer', 'src', 'onerror', 'onload', 'responseCallback', 'value', 'max', 'min'];
 
/**
 * Create a new DOM element
 * @function createNewElement
 * @memberof jMod.Element
 * @param {jMod.Element.NewElementData} data - Element information
 * @returns {Element} The newly created element
 */
var createNewElement = jMod.Element.createNewElement = function(data) {
	var i, eventName, capture, callback,
		eventListeners = data.EventListeners || data.eventListeners,
		newElement = document.createElement(data.type || 'div');
	
	if(typeof data.style === "string")
		newElement.style = data.style;
	else if(typeof data.style === "object"){
		for(i in data.style)
			newElement.style[i] = data.style[i];
	}
	
	for(i = 0; i < validElementProps.length; i++){
		if(data[validElementProps[i]] !== undefined)
			newElement[validElementProps[i]] = data[validElementProps[i]];
	}
	
	if(data.attributes !== undefined){
		for(i in data.attributes){
			//if(typeof data.attributes[i] !== _undefined && data.attributes[i] !== null)
			if(data.attributes[i] != null)
				newElement.setAttribute(i, data.attributes[i]);
		}
	}
	
	if(eventListeners){
		for(eventName in eventListeners){
			if(typeof eventListeners[eventName] === "function"){
				newElement.addEventListener(eventName, eventListeners[eventName]);
			} else if(typeof eventListeners[eventName] === "object"){
				capture = eventListeners[eventName].useCapture || eventListeners[eventName].Capture || eventListeners[eventName].capture || false;
				callback = eventListeners[eventName].callback || eventListeners[eventName]['function'];
				if(callback){
					if(RealTypeOf(callback) == "array")
						for(i in callback)
							newElement.addEventListener(eventName, callback[i], capture);
					else
						newElement.addEventListener(eventName, callback, capture);
				}
				
			}
		}
	}
	
	appendChild(newElement, data.innerHTML || data.text);
	
	return newElement;
}

var getOffset = jMod.Element.getOffset = function(el) {
	var box = el.getBoundingClientRect();
	var doc = el.ownerDocument;
	var docElem = doc.documentElement;
	var win = ((doc != null && doc === doc.window) ? doc : doc.nodeType === 9 && doc.defaultView);
	
	return {
		top: parseInt(box.top + win.pageYOffset - docElem.clientTop),
		left: parseInt(box.left + win.pageXOffset - docElem.clientLeft),
		bottom: box.bottom,
		height: parseInt(box.height || ((parseInt(el.offsetHeight) - parseInt(el.clientHeight)) + parseInt(el.scrollHeight))),
		width: parseInt(el.offsetWidth)
	};
}


var isNamespaced = jMod.Element.isNamespaced = function(el, className) {
	var parent = el;
	while(parent.parentElement){
		parent = parent.parentElement;
		if(jMod.Element.hasClass(parent, className))
			return true;
	}
	return false;
}

var findParentWithClass = jMod.Element.findParentWithClass = function(el, className) {
	var parent = el;
	while(parent.parentElement){
		parent = parent.parentElement;
		if(jMod.Element.hasClass(parent, className))
			return parent;
	}
	return;
}

var findParentWithAttribute = jMod.Element.findParentWithAttribute = function(el, attributeName, attributeValue) {
	var parent = el;
	while(parent.parentElement){
		parent = parent.parentElement;
		if(parent.hasAttribute(attributeName)){
			if(_undefined===typeof attributeValue || parent.getAttribute(attributeName) == attributeValue)
				return parent;
		}
	}
}

function fireClick(el, bubbles, cancelable){
	if(jMod.jQueryAvailable){
		$(el).click();
	} else if(document.createEvent) {
		var evt = document.createEvent('MouseEvents');
		evt.initEvent('click', bubbles || true, cancelable || true);
		el.dispatchEvent(evt);	
	} else if(document.createEventObject) {
		el.fireEvent('onclick');	
	} else if(typeof el.onclick == "function") {
		el.onclick();	
	}
}
