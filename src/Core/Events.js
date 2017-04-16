// +@display_name  Events
// +@history (0.0.9) History begins.
// +@history (0.0.14) Changed to jMod.Events.
// +@history (0.0.14) Added more DOM events.
// +@history (0.0.15) Fixed addListener bug, preventing 
// +@history (0.0.15) Removed ref to jMod.fn (__proto__ is depreciated).

/**
 * @namespace jMod.Events
 * @memberOf jMod
 * @since 0.0.9
 */
jMod.Events = {
	'e': {},
	'fired': {},
	
	/**
	 * Add a new event to the event list. Listeners can be added via "jMod.EVENTNAME = function(e, args, ...){...}" OR "jMod.Events.addListener(EVENTNAME, function(e, args, ...){...}, true)"
	 * @function addEvent
	 * @memberOf jMod.Events
	 * @param {string} name - Name of the event
	 * @param {boolean} [recordEvent=true] - (if true) When fired, the firing arguments are recorded. If a listener is later added to the event, it is immediately called with the previous firing arguments.
	 */
	'addEvent': function(name, recordEvent){
		this.e[name] = {
			recordEvent: typeof recordEvent !== _undefined ? recordEvent : true,
			listeners: []
		};
		Object.defineProperty(jMod, name, new (function(propName){return {
			set: function(callback){jMod['Events']['addListener'](propName, callback);},
			get: function(){return (typeof jMod.Events.fired[propName] !== _undefined);},
			enumerable: false};})(name));
	},
	
	/**
	 * Add a listener for a specified event
	 * @function addListener
	 * @memberOf jMod.Events
	 * @param {string} name - Name of the event to listen for
	 * @param {function} callback - Callback function.
	 * @param {boolean} [fireRecorded=true] - If the event is a recording event, immediately trigger the callback with the arguments from the previous firing event.
	 */
	'addListener': function(name, callback, fireRecorded){
		this.e[name].listeners.push(callback);
		fireRecorded = (typeof fireRecorded !== _undefined ? fireRecorded : true);
		if(fireRecorded && typeof this.fired[name] !== _undefined && typeof this.fired[name].args !== _undefined)
			callback.apply(this.fired[name]._this, this.fired[name].args);
	},
	
	/**
	 * Fire an event by name
	 * @function addEvent
	 * @memberOf jMod.Events
	 * @param {string} name - Name of the event to be fired
	 * @param {...*} [arguments] - Arguments used when triggering the callback functions.
	 */
	'fire': function(name, data){
		if(typeof this.e[name] !== _undefined){
			if(typeof this.fired[name] === _undefined)
				this.fired[name] = {
					count: 0,
					args: undefined,
					_this: null
				};
			var args;
			var _this = null;
			
			if(typeof data == "object" && typeof data._this !== _undefined && typeof data.args !== _undefined){
				_this = data._this;
				args = data.args;
			} else
				args = Slice.call(arguments, 1);

			if(this.e[name].recordEvent){
				this.fired[name].args = args;
				this.fired[name]._this = _this;
			}
			var putBack = [];
			while( i = this.e[name].listeners.pop() ) {
				if(!i.apply(_this, args))
					putBack.push(i);
			}
			this.e[name].listeners = putBack;
			this.fired[name].count++;
		}
	},
	/*
	handleMessage: function(e){
		if(jMod.debug) jMod.Debug(e.data + ': %c%.2fms', jMod.log.fmt.time, jMod.timeElapsed);
		if(typeof jMod.Events.e[e.data] !== "undefined"){
			jMod.Events.fire(e.data);
		}
	}
	*/
};

//unsafeWindow.addEventListener("message", jMod.Events.handleMessage, true);
/*
mExportFunction(jMod.Events.handleMessage, unsafeWindow, {
	defineAs: "jModHandleMessage",
	allowCallbacks: true,
	allowCrossOriginArguments: true
});

unsafeWindow.addEventListener("message", unsafeWindow.jModHandleMessage, true);
*/

// jMod Events
jMod['Events']['addEvent']('onDOMReady');
jMod['Events']['addEvent']('onReady');
jMod['Events']['addEvent']('onPageReady');
jMod['Events']['addEvent']('onPerformanceReady');

// DOM Events
jMod['Events']['addEvent']('load');
jMod['Events']['addEvent']('DOMContentLoaded');
jMod['Events']['addEvent']('onreadystatechange');
jMod['Events']['addEvent']('afterscriptexecute', false);
jMod['Events']['addEvent']('beforescriptexecute', false);


var EventsClass = function(_events){
	var listeners = {};
	this.events = _events || [];
	
	this.add = function(group, eventName, callback){
		if(this.events.indexOf(eventName) == -1)
			this.events.push(eventName);
	
		if(typeof listeners[group] === _undefined)
			listeners[group] = {};
			
		if(typeof listeners[group][eventName] === _undefined)
			listeners[group][eventName] = [];
		
		listeners[group][eventName].push(callback);
	};
	
	this.addAll = function(data, group){
		for(var evt in this.events)
			if(typeof data[this.events[evt]] === "function")
				this.add(group, this.events[evt], data[this.events[evt]])
	};
	
	this.getAll = function(group, eventName){
		if(eventName){
			if(listeners[group] && listeners[group][eventName]){
				return listeners[group][eventName];
			}
		} else {
			//if(listeners[group])
			return listeners[group]
		}
	};
	
	this.fire = function(eventName, group, _this, args){
		var _args, i, evt, group = listeners[group || '0'];
		_args = RealTypeOf(args) == "array" ? args : [args];
		if(arguments.length > 4)
			_args = _args.concat(Slice.call(arguments, 4));
		try{
			if(typeof group !== _undefined && typeof (evt = group[eventName]) !== _undefined){
				for(i in evt){
					if((evt[i].apply(_this || null, _args || [])) === false){
						console.log('fire canceled');
						return false;
					}
				}
			}
		} catch(e){
			//console.error('Error EventsClass.fire', e);
			jModLogError(e, 'jMod.EventsClass.fire');
		}
	}
};