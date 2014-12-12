// +@display_name  Events
// +@replace  MUJS.EVENTS
// +@history (0.0.9) History begins.

	MUJS['events'] = {
		'e': {},
		'fired': {},
		'addEvent': function(name){
			this.e[name] = [];
			Object.defineProperty(MUJS, name, new (function(propName){return {set: function(callback){MUJS['events']['addListener'](propName, callback);},enumerable: false};})(name));
		},
		'addListener': function(name, callback){
			if(typeof this.fired[name] === "undefined"){
				this.e[name].push(callback);
			} else {
				callback.apply(MUJS, this.fired[name]);
			}
		},
		'fire': function(name){
			var args = Array.prototype.slice.call(arguments, 1);
			this.fired[name] = args;
			if(typeof this.e[name] !== "undefined"){
				var putBack = [];
				while( i = this.e[name].pop() ) {
					if(!i.apply(null, args))
						putBack.push(i);
				}
				this.e[name] = putBack;
			}
		}
	};
	
	MUJS['events']['addEvent']('onReady');
	MUJS['events']['addEvent']('onPageReady');