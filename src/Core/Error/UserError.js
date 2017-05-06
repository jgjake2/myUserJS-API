// +@display_name  UserError

+(function(){
	function UserError(){
		var err,
			data = {},
			arg0 = _undefined!=typeof arguments[0] ? arguments[0] : undefined,
			length = arguments.length;
		
		if(length > 0){
			if(typeof arg0 === "string"){
				data.message = arg0;
				if(length > 1)
					data.fileName = arguments[1];
					
				if(length > 2)
					data.lineNumber = arguments[2];
					
				if(length > 3)
					data.columnNumber = arguments[3];
					
				if(length > 4){
					if(arguments[4] instanceof Error)
						data.e = arguments[4];
				}
			} else {//if(typeof arg0 === "object")
				if(arg0 instanceof Error){
					data.e = arg0;
				} else {
					data = arg0;
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
			err = new Error();
			
			if (err.stack) {
				// remove one stack level:
				if (typeof(Components) != 'undefined') {
					// Firefox:
					this.stack = err.stack.substring(err.stack.indexOf('\n')+1);
				} else if (typeof(chrome) != 'undefined' || typeof(process) != 'undefined') {
					// Google Chrome/Node.js:
					this.stack = err.stack.replace(/\n[^\n]*/,'');
				} else {
					this.stack = err.stack;
				}
			}

		}
		
		this.message = _undefined!==typeof data.message ? data.message : err.message;
		this.fileName = _undefined!==typeof data.fileName ? data.fileName : err.fileName;
		this.lineNumber = _undefined!==typeof data.lineNumber ? data.lineNumber : err.lineNumber;
		this.columnNumber = _undefined!==typeof data.columnNumber ? data.columnNumber : err.columnNumber;
		this.toString = function () { return this.name + ': ' + this.message }
	}
	
	UserError.prototype = Object.create(Error.prototype);
	UserError.prototype.constructor = UserError;
	
	jMod.UserError = UserError;
})()