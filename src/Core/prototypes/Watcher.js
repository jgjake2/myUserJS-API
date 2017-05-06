// +@display_name  Watcher

+(function(){
	function Watcher(obj, property, handler){
		if(!(Watcher.browserSupportsWatch && typeof obj.watch === "function") || !Watcher.browserSupportsObserve){
			throw new jModError('Browser does not support watch or observe');
		}
		
		if(obj.__watcher){
			obj.__watcher.add(property, handler);
			return obj.__watcher;
		}
		
		var _this = this;
		_this.target = obj;
		_this.properties = {};
		if(property && handler) {
			_this.defaultHandler = handler;
			_this.properties[property] = handler;
		}
		_this.enabled = true;
		obj.__watcher = this;
		
		if(Watcher.browserSupportsWatch && typeof obj.watch === "function") {
			if(property && handler) obj.watch(property, handler);
		} else if(Watcher.browserSupportsObserve) {
			
			Object.observe(obj, function(changes) {
				var i = 0, errs = [];
				
				for( ; i < changes.length; i++){
					var change = changes[i],
						changeObj = change.object,
						changeName = change.name,
						changeOldValue = change.oldValue,
						changeType = change.type,
						changeWatcher = change.__watcher || _this || this;
					if (
						!changeWatcher
						|| !changeWatcher.enabled
						|| changeName === "__watcher"
						//|| ["__watcher"].indexOf(changeName) !== -1
						|| !changeWatcher.properties[changeName]
					) return;
					try {
						(changeWatcher.properties[changeName] || changeWatcher.defaultHandler).call(changeObj, changeName, changeOldValue, changeObj[changeName]);
					} catch(e) {
						changeWatcher.enabled = false;
						switch(type){
							case "update":
								changeObj[changeName] = changeOldValue;
								break;
							case "add":
								delete changeObj[changeName];
								break;
							case "delete":
								changeObj[changeName] = changeOldValue;
								break;
						}
						changeWatcher.enabled = true;
						errs.push(e);
					}
				}
				if(errs.length > 0) {
					throw errs;
				}
			});
			
		}
		
		return _this;
	}
	
	Watcher.displayName = "Watcher";
	Watcher.browserSupportsWatch = Object.prototype.watch ? true : false;
	Watcher.browserSupportsObserve = Object.observe ? true : false;
	
	Watcher.prototype = {
		add: function(property, handler){
			if(property && (handler || this.defaultHandler)){
				if(!this.defaultHandler && handler)
					this.defaultHandler = handler;
				this.properties[property] = handler || null;
				if(Watcher.browserSupportsWatch && typeof obj.watch === "function") {
					obj.watch(property, handler || this.defaultHandler);
				}
			}
			return this;
		},
		unwatch: function(property){
			this.enabled = false;
			
			if(property){
				if(this.properties[property])
					delete this.properties[property];
				
				if(Watcher.browserSupportsWatch) {
					this.target.unwatch(property);
				}// else if(Watcher.browserSupportsObserve) {
					//if(this.properties && this.properties[property]){
						//delete this.properties[property];
					//}
				//}
			} else {
				for(var prop in this.properties){
					if(prop){
						this.unwatch(prop);
					}
				}
			}
			this.enabled = true;
			return this;
		}
	};
	
	jMod.Watcher = Watcher;
})();

/*
+(function(){
	var browserSupportsWatch = Object.prototype.watch ? true : false;
	var browserSupportsObserve = Object.observe ? true : false;
	jMod.watcher = function(obj, property, handler){
		if(browserSupportsWatch && typeof obj.watch === "function") {
			if(!obj.__watchPropertiesHandler) {
				if(!handler) {
					throw new jModError('No handler provided');
				}
				Object.defineProperty(obj, '__watchPropertiesHandler', {
					value: handler,
					enumerable: false,
					configurable: false,
					writable: true
				});
			}
			obj.watch(property, handler || obj.__watchPropertiesHandler);
		} else if(browserSupportsObserve) {
			if(obj.__watchProperties) {
				if(obj.__watchProperties[property]) {
					if(handler) {
						obj.__watchProperties[property] = handler;
					}
				} else {
					obj.__watchProperties[property] = handler || null;
				}
			} else {
				if(!handler) {
					throw new jModError('No handler provided');
				}
				Object.defineProperties(obj, {
					'__watchProperties': {
						value: {},
						enumerable: false,
						configurable: false,
						writable: true
					},
					
					'__watchPropertiesEnabled': {
							value: true,
							enumerable: false,
							configurable: false,
							writable: true
					},
					
					'__watchPropertiesHandler': {
						value: handler,
						enumerable: false,
						configurable: false,
						writable: true
					}
				});
				
				obj.__watchProperties[property] = handler;
			
				Object.observe(obj, function(changes) {
					var i = 0, errs = [];
					
					for( ; i < changes.length; i++){
						var change = changes[i],
							changeObj = change.object,
							changeName = change.name,
							changeOldValue = change.oldValue,
							changeType change.type;
						if (
							!changeObj.__watchPropertiesEnabled
							|| ["__watchProperties", "__watchPropertiesEnabled", "__watchPropertiesHandler"].indexOf(changeName) !== -1
							|| !changeObj.__watchProperties[changeName]
						) return;
						try {
							(changeObj.__watchProperties[changeName] || changeObj.__watchPropertiesHandler).call(changeObj, changeName, changeOldValue, changeObj[changeName]);
						} catch(e) {
							changeObj.__watchPropertiesEnabled = false;
							switch(type){
								case "update":
									changeObj[changeName] = changeOldValue;
									break;
								case "add":
									delete changeObj[changeName];
									break;
								case "delete":
									changeObj[changeName] = changeOldValue;
									break;
							}
							changeObj.__watchPropertiesEnabled = true;
							errs.push(e);
						}
					}
					if(errs.length > 0) {
						throw errs;
					}
				});
			}

		} else {
			throw new jModError('Browser does not support watch or observe');
		}
	};
	
	jMod.unwatch = function(obj, property){
		if(browserSupportsWatch) {
			obj.unwatch(property);
		} else if(browserSupportsObserve) {
			if(obj.__watchProperties && obj.__watchProperties[property]){
				
				obj.__watchPropertiesEnabled = false;

				delete obj.__watchProperties[property];
				
				obj.__watchPropertiesEnabled = true;
			}
		} else {
			throw new jModError('Browser does not support watch or observe');
		}
	};
})();
*/
/*
if (!Object.prototype.watch) {
	Object.defineProperty(Object.prototype, "watch", {
		enumerable: false,
		configurable: true,
		writable: false,
		value: function (prop, handler) {
			var oldval = this[prop],
				newval = oldval,
				getter = function() {
					return newval;
				},
				setter = function(val) {
					oldval = newval;
					return newval = handler.call(this, prop, oldval, val);
				};
			
			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					get: getter,
					set: setter,
					enumerable: true,
					configurable: true
				});
			}
		}
	});
}

if (!Object.prototype.unwatch) {
	Object.defineProperty(Object.prototype, "unwatch", {
		enumerable: false,
		configurable: true,
		writable: false,
		value: function (prop) {
			var val = this[prop];
			delete this[prop]; // remove accessors
			this[prop] = val;
		}
	});
}
*/
