// +@display_name  Element
// +@replace  MUJS.ELEMENT
// +@history (0.0.14) History begins.

	function isElement(obj) {
		try {
			return obj instanceof HTMLElement;
		} catch(e) {
			return (typeof obj==="object") &&
			(obj.nodeType===1) && (typeof obj.style === "object") &&
			(typeof obj.ownerDocument ==="object");
		}
	}
	
	function hasClass(el, className){
		var classArr = el.className.split(' ');
		if(classArr.indexOf(className) == -1)
			return false;
		return true;
	}
	
	function hasClasses(el, classNames){
		var r = [];
		var classArr = el.className.split(' ');
		var classNamesArr = (typeof classNames === "string" ? classNames.split(' ') : classNames);
		for(var i in classNamesArr)
			if(classArr.indexOf(classNamesArr[i]) != -1)
				r.push(classNamesArr[i]);
		return r;
	}
	
	function missingClasses(el, classNames){
		var r = [];
		var classArr = el.className.split(' ');
		var classNamesArr = (typeof classNames === "string" ? classNames.split(' ') : classNames);
		for(var i in classNamesArr)
			if(classArr.indexOf(classNamesArr[i]) == -1)
				r.push(classNamesArr[i]);
		return r;
	}
	
	function addClass(el, className){
		if(!hasClass(el, className))
			el.className += (el.className + ' ' + className).trim();
		return el;
	}
	
	function addClasses(el, classNames){
		var classNamesArr = (typeof classNames === "string" ? classNames.split(' ') : classNames);
		var has = el.className.split(' ');
		for(var i = 0; i < classNamesArr.length; i++){
			if(has.indexOf(classNamesArr[i]) == -1)
				has.push(classNamesArr[i]);
		}
		el.className = has.join(' ');
		return el;
	}
	
	function removeClass(el, className){
		var classStr = el.className;
		var classArr = classStr.split(' ');
		var index = classArr.indexOf(className);
		if(index == -1)
			return el;
		classArr.splice(index, 1);
		el.className = classArr.join(' ');
		return el;
	}
	
	function removeClasses(el, classNames){
		var namesArr;
		if(typeof classNames === "string")
			namesArr = Array.prototype.slice.call(arguments, 1);
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
	}
	
	function appendChild(el, data){
		try{
			if(typeof data === "undefined")
				return el;
			else if(isElement(data))
				el.appendChild(data);
			else {
				switch(RealTypeOf(data)){
					case "undefined":
					case "null":
						break;
					case "array":
						for(var i = 0; i < data.length; i++)
							el = appendChild(el, data[i]);
						break;
					case "object":
					case "map":
						var tmpEl = createNewElement(data);
						if(tmpEl)
							el.appendChild(tmpEl);
						break;
					case "string":
					case "number":
					case "symbol":
					case "boolean":
					default:
						var dummy = document.createElement('div');
						dummy.innerHTML = data;
						var nodes = dummy.childNodes;
						for(var i = 0; i < nodes.length; i++)
							el.appendChild(nodes[i]);
						break;
				}
			}
		} catch(e) {
			console.log('Error! appendChild', e);
		} finally {
			return el;
		}
	}
	
	function createNewElement(data){
		var newElement = document.createElement(data.type);
		
		if(typeof data.id !== "undefined")
			newElement.id = data.id;
			
		if(typeof data.className !== "undefined")
			newElement.className = data.className;
		else if(typeof data['class'] !== "undefined")
			newElement.className = data['class'];
		
		if(typeof data.style !== "undefined")
			newElement.style = data.style;
		
		if(typeof data.title !== "undefined")
			newElement.title = data.title;
		
		appendChild(newElement, getFirstValidKeyValue(data, ['innerHTML', 'text']));
		
		if(typeof data.attributes !== "undefined"){
			for(var i in data.attributes){
				newElement.setAttribute(i, data.attributes[i]);
			}
		}
		
		var eventListeners = getFirstValidKeyValue(data, ['EventListeners', 'eventListeners', 'Events', 'events', 'Listeners', 'listeners']);
		if(typeof eventListeners !== "undefined"){
			for(var eventName in eventListeners){
				if(typeof eventListeners[eventName] === "function"){
					newElement.addEventListener(eventName, eventListeners[eventName]);
				} else if(typeof eventListeners[eventName] === "object"){
					var capture = getFirstValidKeyValue(eventListeners[eventName], ['useCapture', 'Capture', 'capture']) || false;
					var callback = getFirstValidKeyValue(eventListeners[eventName], ['callback', 'function']);
					if(callback){
						if(RealTypeOf(callback) == "array"){
							for(var i in callback)
								newElement.addEventListener(eventName, callback[i], capture);
						} else {
							newElement.addEventListener(eventName, callback, capture);
						}
					}
					
				}
			}
		}
		
		return newElement;
	}
