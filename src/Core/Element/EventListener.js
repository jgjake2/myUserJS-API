// +@display_name  Event Listener

var addEventListener = jMod.Element.addEventListener = function(el, eventName, handler, useCapture) {
	if (el.addEventListener) {
		el.addEventListener(eventName, handler, useCapture ? true : false);
	} else if (el.attachEvent) {
		el.attachEvent('on' + eventName, handler);
	} else {
		el['on' + eventName] = handler;
	}
}

var removeEventListener = jMod.Element.removeEventListener = function(el, eventName, handler, useCapture) {
	if (el.removeEventListener) {
		el.removeEventListener(eventName, handler, useCapture ? true : false);
	} else if (el.detachEvent) {
		el.detachEvent('on' + eventName, handler);
	} else {
		el['on' + eventName] = null;
	}
}