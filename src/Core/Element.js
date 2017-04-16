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
		jModLogError(e, 'jMod.Element');
	}
};

jMod.Element._call = function(command){
	if(typeof jMod.Element[command] === "function")
		return jMod.Element[command].apply(jMod.Element, Slice.call(arguments, 1));
}

Object.defineProperty(jMod.Element, 'document', {
	get: function(){
		try {
			return (EXISTS(document) ? document : (window.document || unsafeWindow.document));
		} catch(e) {}
		return null;
	}
});

Object.defineProperty(jMod.Element, 'head', {
	get: function(){
		try {
			var doc = jMod.Element.document;
			return doc.head || doc.getElementsByTagName('head')[0];
		} catch(e) {}
		return null;
	}
});



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
	return el.className = (el.className + ' ' + missingClasses(el, classNames).join(" ")).trim(), el;
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
	var i = 0, r = [];
	if(typeof attrs === "string")
		attrs = attrs.split(' ');
	for( ; i < attrs.length; i++)
		if(el.hasAttribute(attrs[i]))
			r.push(attrs[i]);
	return r;
}

var getAttribute = function(el, attr, type) {
	var t, r = el.getAttribute(attr);
	if(!type)
		return r;
	
	switch(type){
		case "int":
		case "integer":
			return parseInt(r);
			break;
		case "bool":
		case "boolean":
			t = r != null && r != "" ? r.trim().toLowerCase() : 'false';
			return (t.indexOf("true") !== -1 || t == "t" ? true : false);
			break;
	}
	return r;
}



var changeElementType = function(el, type, removeChildren){
	var i = 0,
		doc = el.ownerDocument || jMod.Element.document,
		newElement = doc.createElement(type),
		attrs = el.attributes,
		nodes = el.childNodes,
		ElementPropertiesToCopy = ["scrollLeft", "scrollTop"];
	//getEventListeners
	for( ; i < attrs.length; i++){
		//newElement.setAttribute(attrs[i].nodeName, attrs[i].nodeValue);
		newElement.setAttributeNode(attrs[i]);
	}
	for(i = 0; i < nodes.length; i++){
		if(removeChildren)
			newElement.appendChild(newElement.removeChild(nodes[i]));
		else
			newElement.appendChild(nodes[i]);
	}
	
	for(i = 0; i < ElementPropertiesToCopy.length; i++){
		newElement[ElementPropertiesToCopy[i]] = el[ElementPropertiesToCopy[i]];
	}
	
	return newElement;
}

// Add/Remove Event Listeners
ImportScript('Core.Element.EventListener');

// ViewportSize
ImportScript('Core.Element.viewportSize');

function ElementBuilderClass(data){
	this.data = data || {};
}

ElementBuilderClass.prototype = {
	appendChild: function(data){
		var i,
			thisData = this.data,
			thisType = RealTypeOf(thisData),
			dataType = RealTypeOf(data);
		
		if(dataType == "array"){
			for(i = 0; i < data.length; i++)
				this.appendChild(data[i]);
			return this;
		}
		
		if(isElement(thisData)){
			if(isElement(data)){
				return thisData.appendChild(data), this;
			}
			if(dataType == "ElementBuilderClass"){
				return thisData.appendChild(data.toElement()), this;
			}
		}
		
		if(thisType == "ElementBuilderClass"){
			return thisData.appendChild(data), this;
		}
		
		if(typeof thisData == "object"){
			i = (thisData.innerHTML === undefined && thisData.text !== undefined ? 'text' : 'innerHTML');
			if(RealTypeOf(thisData[i]) == "array")
				thisData[i].push(data);
			else if(typeof thisData[i] == _undefined || thisData[i] == null)
				thisData[i] = [data];
			else
				thisData[i] = [thisData[i], data];
			return this;
		}
		
		return this;
	},
	toElement: function(){
		if(isElement(this.data))
			return this.data;
		return (this.data = createNewElement(this.data));
	}
};

Object.defineProperties(ElementBuilderClass.prototype, {
	type: {
		get: function(){
			if(isElement(this.data)){
				return this.data.nodeName.toLowerCase();
			} else {
				return this.data.type.toLowerCase();
			}
		},
		set: function(newType){
			if(isElement(this.data)){
				//this.data.nodeName;
				var parentElement = this.data.parentElement;
					tmp = changeElementType(this.data, newType, true);
				parentElement.replaceChild(tmp, this.data);
				this.data = tmp;
			} else {
				this.data.type = newType;
			}
		},
		configurable: false,
		enumerable: true
	},
	children: {
		get: function(){
			if(isElement(this.data)){
				return this.data.children;
			} else {
				var i = (this.data.innerHTML === undefined && this.data.text !== undefined ? 'text' : 'innerHTML');
				return (this.data[i] || null);
			}
		},
		configurable: false,
		enumerable: true
	}
});
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
		// If appending object instead of Element
		if(!isElement(el) && typeof el === "object" && el.type != null){
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
						nodes, dummy = (el.ownerDocument || jMod.Element.document).createElement('div');
						dummy.innerHTML = data;
						nodes = dummy.childNodes;
						for(i = 0; i < nodes.length; i++)
							el.appendChild(nodes[i]);
						break;
				}
			}
		}
	} catch(e) {
		jModLogError(e, 'jMod.Element.appendChild');
	} finally {
		return el;
	}
	return el; // just in case...
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
	var i, x, eventName, capture, callback, event,
		eventListeners = data.EventListeners || data.eventListeners,
		// Get Document
		doc = jMod.Element.document,
		// Create Element
		newElement = doc.createElement(data.type || "div"),
		addListener = function(eventName, obj){
			if(typeof obj === "function")
				return addEventListener(newElement, eventName, obj);
			capture = obj.useCapture || obj.Capture || obj.capture || false;
			callback = obj.callback || obj['function'];
			if(callback){
				if(RealTypeOf(callback) == "array")
					for(i in callback){
						if(typeof callback[i] !== "function")
							capture = callback[i].useCapture || callback[i].Capture || callback[i].capture || capture;
						addEventListener(newElement, eventName, callback[i], capture);
					}
				else
					addEventListener(newElement, eventName, callback, capture);
			}
		}
	
	if(typeof data.style === "string")
		newElement.setAttribute("style", data.style);
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
			if(data.attributes[i] != null)
				newElement.setAttribute(i, data.attributes[i]);
		}
	}
	
	if(eventListeners){
		for(eventName in eventListeners){
			event = eventListeners[eventName];
			if(RealTypeOf(event) == "array"){
				for(x = 0; x < event.length; x++)
					addListener(eventName, event[x]);
			} else
				addListener(eventName, event);
		}
	}
	
	appendChild(newElement, data.innerHTML || data.text || null);
	
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
		if(hasClass(parent, className))
			return true;
	}
	return false;
}

var findParentWithClass = jMod.Element.findParentWithClass = function(el, className) {
	var parent = el;
	while(parent.parentElement){
		parent = parent.parentElement;
		if(hasClass(parent, className))
			return parent;
	}
}

var findParentWithAttribute = jMod.Element.findParentWithAttribute = function(el, attributeName, attributeValue) {
	var parent = el;
	while(parent.parentElement){
		parent = parent.parentElement;
		if(parent.hasAttribute(attributeName) && (NOTEXISTS(attributeValue) || parent.getAttribute(attributeName) == attributeValue))
			return parent;
	}
};

function fireClick(el, bubbles, cancelable){
	var doc = jMod.Element.document;
	if(jMod.jQueryAvailable){
		$(el).click();
	} else if(doc.createEvent) {
		var evt = doc.createEvent('MouseEvents');
		evt.initEvent('click', bubbles || true, cancelable || true);
		el.dispatchEvent(evt);	
	} else if(doc.createEventObject) {
		el.fireEvent('onclick');	
	} else if(typeof el.onclick == "function") {
		el.onclick();	
	}
};

jMod.Element.getCompStyleObj = function(el, pseudoEl){
	var doc = el.ownerDocument || jMod.Element.document;
	if (el.currentStyle) //IE
		return el.currentStyle;
	else if (doc.defaultView && doc.defaultView.getComputedStyle) //Firefox
		return doc.defaultView.getComputedStyle(el, pseudoEl || null);
};


//jMod.Element.getCompStyle = function(el, cssprop, pseudoEl, comp){
jMod.Element.getCompStyle = function(){
	var i = 0, arg, el, cssprop, pseudoEl, comp, doc;
	for( ; i < arguments.length; i++){
		arg = arguments[i];
		if(isElement(arg)){
			el = arg;
		} else if(typeof arg == "string"){
			if(!cssprop)
				cssprop = arg;
			else
				pseudoEl = arg;
		} else {
			comp = arg;
		}
	}
	
	if (comp) {
		if (comp[cssprop])
			return comp[cssprop];
	} else {
		if (el.currentStyle) {
			return el.currentStyle[cssprop];
		}
		doc = el.ownerDocument || jMod.Element.document;
		if (doc.defaultView && doc.defaultView.getComputedStyle){
			comp = doc.defaultView.getComputedStyle(el, pseudoEl || null);//[cssprop];
			if(comp){
				return comp[cssprop] ? comp[cssprop] : comp.getPropertyValue(cssprop);
			}
		}
	}
	
	return el ? el.style[cssprop] : null;
};

jMod.Element.getClientRect = function(el){
	try{
		var comp, r = jMod.extend({}, el.getBoundingClientRect());
		
		if (r.height == null || r.width == null) {
			comp = jMod.Element.getCompStyleObj(el);
			//r.height = parseFloat(jMod.Element.getCompStyle(el, 'height'));
			/*
			r.height = parseFloat(comp['height']);
			r.width = parseFloat(comp['width']);
			*/
			
			r.height = parseFloat(jMod.Element.getCompStyle(el, 'height', comp));
			r.width = parseFloat(jMod.Element.getCompStyle(el, 'width', comp));
		}
		
		return r;
	}catch(e){}
};

// Animation Frame
ImportScript('Core.Element.AnimationFrame');

// Resize Listener
ImportScript('Core.Element.ResizeListener');
