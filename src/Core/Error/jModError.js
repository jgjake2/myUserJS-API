// +@display_name  jModError

var jModError = (function(){

	function jModError(arg0){
		var err,
			i = 0,
			data = {},
			//arg0 = _undefined!=typeof arguments[0] ? arguments[0] : undefined,
			length = arguments.length;
		
		//this.constructor.prototype.__proto__ = Error.prototype;
		//this.__proto__ = Error.prototype;
		//Object.setPrototypeOf(this, Error.prototype);
		
		if(length > 0){
			if(typeof arg0 !== "string"){
				if(arg0 instanceof Error){
					data.e = arg0;
				} else {
					data = arg0;
				}
				arg0 = length > 1 ? arguments[1] : undefined;
				i++;
			}
			if(typeof arg0 === "string"){
				data.message = arg0;
				if(length > (i + 1))
					data.fileName = arguments[i + 1];
					
				if(length > (i + 2))
					data.lineNumber = arguments[i + 2];
					
				if(length > (i + 3))
					data.columnNumber = arguments[i + 3];
					
				if(length > (i + 4)){
					if(arguments[i + 4] instanceof Error)
						data.e = arguments[i + 4];
				}
			}
			
			if(data.e){
				try {
					err = data.e;
					
					this.stack = err.stack;
				} catch(e){}
			}
		
		}
		
		if(!err){
			err = new Error(data.message || null, data.fileName || null, data.lineNumber || null);
			err.constructor = jModError;
			err.__proto__ = Object.create(err.__proto__, {
				name: { value: 'jModError', enumerable: false },
				toString: {
					value: function () { return this.name + ': ' + this.message }
				}
			});
			//err.name = "jModError";
			delete err.toString;
			err.toString = function () { return this.name + ': ' + this.message }.bind(err);
			if (err.stack) {
				// remove one stack level:
				if (typeof(Components) != 'undefined') {
					// Firefox:
					err.stack = this.stack = err.stack.substring(err.stack.indexOf('\n')+1);
				} else if (typeof(chrome) != 'undefined' || typeof(process) != 'undefined') {
					// Google Chrome/Node.js:
					err.stack = this.stack = err.stack.replace(/\n[^\n]*/,'');
					Object.defineProperty(err, 'stack', {
						value: this.stack,
					});
				} else {
					this.stack = err.stack;
				}
			}
		}
		
		if(this.stack && !data.fileName){
			var tmp = jMod.parseStack(this.stack);
			if(tmp && tmp.length > 0){
				this.pStack = tmp;
				data.lineNumber = parseInt(tmp[0].lineNumber);
				data.columnNumber = parseInt(tmp[0].columnNumber || 0);
				data.fileName = tmp[0].fileName;
				if(!err.fileName || err.fileName == "null"){
					try{
						err.lineNumber = data.lineNumber;
						err.columnNumber = data.columnNumber;
						err.fileName = data.fileName;
						err.stack = this.stack;
					}catch(e){
						try{
							//err = new Error(data.message || null, data.fileName || null, data.lineNumber || null);
							//err.stack = this.stack;
						}catch(e){}
					}
				}
			}
		}
		
		//this.constructor.prototype.__proto__ = Error.prototype;
		//err.constructor = jModError;
		//err.displayName = err.name
		this.displayName = this.name = "jModError";
		
		this.err = err;
		this.message = data.message || err.message;
		this.fileName = data.fileName || err.fileName;
		this.lineNumber = data.lineNumber != null ? data.lineNumber : err.lineNumber;
		this.columnNumber = data.columnNumber != null ? data.columnNumber : err.columnNumber;
		this.toString = function () { return this.name + ': ' + this.message };
		this.constructor = Error;
	};
	
	jModError.prototype = Object.create(Error.prototype, { name: { value: 'jModError', enumerable: true } });
	
	jModError.prototype.constructor = jModError;
	jModError.prototype.constructor.constructor = Error;
	jModError.prototype.log = function(title, message){
		/*
		console.log(this);
		console.log("%o", {
			_this: this,
			err: this.err,
			err_toStr: this.err.toString(),
			instanceOfjModError: (this instanceof jModError),
			instanceOfError: (this instanceof Error),
			instanceOfIntermediateInheritor: (this instanceof IntermediateInheritor),
			isPrototypeOfError: (Error.isPrototypeOf(this)),
			isPrototypeOfIntermediateInheritor: (IntermediateInheritor.isPrototypeOf(this))
		});
		*/
		var title = title || "jMod Error",
			message = message || this.message;
		jModLogError(this, title, message);
	}
	return jModError;
})();

/*
try{
	var x = fofofo(a);
	//throw new jModError('Error test');
}catch(e){
	//e.log('Error Title', 'Error body');
	var foo = new jModError(e);
	foo.log('Error Title', 'Error body');
}
*/