// +@display_name  Events
// +@replace  MUJS.EVENTS
// +@history (0.0.9) History begins.
// +@history (0.0.14) Changed to MUJS.Events.
// +@history (0.0.14) Added more DOM events.

MUJS.fn['Events'] = {
	'e': {},
	'fired': {},
	'addEvent': function(name, recordEvent){
		this.e[name] = {
			recordEvent: typeof recordEvent !== "undefined" ? recordEvent : true,
			listeners: []
		};
		Object.defineProperty(MUJS, name, new (function(propName){return {set: function(callback){MUJS['Events']['addListener'](propName, callback);},enumerable: false};})(name));
	},
	'addListener': function(name, callback){
		if(typeof this.fired[name] === "undefined"){
			this.e[name].listeners.push(callback);
		} else {
			callback.apply(MUJS, this.fired[name]);
		}
	},
	'fire': function(name){
		if(typeof this.e[name] !== "undefined"){
			var args = Array.prototype.slice.call(arguments, 1);
			if(this.e[name].recordEvent)
				this.fired[name] = args;
			var putBack = [];
			while( i = this.e[name].listeners.pop() ) {
				if(!i.apply(null, args))
					putBack.push(i);
			}
			this.e[name].listeners = putBack;
		}
	}
};

// MUJS Events
MUJS['Events']['addEvent']('onReady');
MUJS['Events']['addEvent']('onPageReady');

// DOM Events
MUJS['Events']['addEvent']('load');
MUJS['Events']['addEvent']('DOMContentLoaded');
MUJS['Events']['addEvent']('onreadystatechange');
MUJS['Events']['addEvent']('afterscriptexecute', false);
MUJS['Events']['addEvent']('beforescriptexecute', false);
