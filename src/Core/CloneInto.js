// +@display_name  ExportFunction
// +@history (0.0.17) Added condition for arrays when normal copying fails.
// +@history (0.0.17) Added some documentation.
// +@history (0.0.20) Can now clone error objects cleanly.

function cloneErrorObject(eObj, scope){
	scope = scope || unsafeWindow;
	var r,
		errRef = "Error", // Default error type is a generic "Error" object
		scopeRef = scope.Error && typeof scope.Error === "function" ? scope : unsafeWindow; // Check input scope for "Error" class. Otherwise, use unsafeWindow.
	if(!scopeRef) return;
	
	// Check if the input error has a name and if that name has a constructor in scopeRef.
	if(eObj.name && eObj.name != "Error" && typeof scopeRef[eObj.name] == "function"){
		errRef = eObj.name;
	}
	
	// Create the object and copy its properties.
	r = new scopeRef[errRef](eObj.message || null, eObj.fileName || null, eObj.lineNumber || null);
	r.name = eObj.name + "";
	r.stack = (eObj.stack || "") + "";
	r.message = eObj.message + "";
	r.fileName = typeof eObj.fileName != _undefined ? (eObj.fileName + "") : null;
	r.lineNumber = typeof eObj.lineNumber != _undefined ? parseInt(eObj.lineNumber) : null;
	r.columnNumber = typeof eObj.columnNumber != _undefined ? parseInt(eObj.columnNumber) : null;
	
	// Completely overwrite the toString function.
	delete r.toString;
	r.toString = function(){ return this.name + ': ' + this.message }.bind(r);
	return r;
};

function mCloneInto(obj, scope, args, debug, depth){
	if(typeof cloneInto !== _undefined){
		depth = depth || 0;
		try{
			// Should work 99% of the time, unless there is a scope-locked property like an error event object from a privileged userscript
			return cloneInto(obj, scope, args);
		}catch(e){
			if(debug){
				console.log('mCloneInto error', e);
			}
		}
		//
		// If it fails, copy it piece-by-piece excluding any properties that fail to copy cleanly.
		//
		
		
		var x, output,
			objType = typeof obj;
		try{
			// Some objects must be cloned specially
			if(objType == "object"){
				if(obj instanceof Error){
					objType = "error";
				} else if(obj.constructor === (new Array).constructor){
					objType = "array";
				} else if(obj === null){
					objType = "null";
				}
			}
		}catch(e){}
		
		var objFn = function(o) {
			var type = typeof o;
			
			// Copy strings, numbers, booleans, nulls and undefined objects normally
			if(type == "string" || type == "number" || type == "boolean" || type == _undefined || o === null){
				return o;
			} else if(o instanceof Error) {
				return cloneErrorObject(o, scope);
			} else if(type == "object") {
				if(depth < 3) {
					try{
						return mCloneInto(o, scope, args, debug, depth + 1);
					}catch(e){}
				}
				try {
					return cloneInto(o, scope, args);
				} catch(e) {}
				
			} else if(type == "function" && args.cloneFunctions) {

				try {
					return cloneInto(o, scope, args);
				} catch(e) {}
			}
		};
		
		
		if(objType == "undefined" || objType == "null"){
			return obj;
		} else if(objType == "error") {
			try{
				output = cloneErrorObject(obj, scope);
			}catch(e){}
		} else if(objType == "array") {
			output = cloneInto([], scope, args);
			for(x = 0; x < obj.length; x++){
				var tmpValue;
				try{
					tmpValue = objFn(obj[x]);
				}catch(e){}
				try{
					output.push(tmpValue);
				}catch(e){
					output.push(undefined);
				}
			}
		//} else if(objType == "function") {
			// to Do:
			// Create a new function (call it newFn) using the "Function"
			// constructor in the desired scope or the unsafeWindow.
			// Then export original function (obj) as newFn's constructor.
			// Copy all other properties normally the same as a normal object
			//
			// However, this mExportFunction should still be used instead of
			// directly cloning it.
			//
			// Does not depend on "args.cloneFunctions"
			// Only properties of 
		} else {
			output = cloneInto({}, scope, args);
			for(x in obj){
				if(x != "constructor" && Object.prototype.hasOwnProperty.call(obj, x)) {
					var tmpValue;
					try{
						tmpValue = objFn(obj[x]);
					}catch(e){}
					output[x] = tmpValue;
				}
			}
		}
		return output;
	} else {
		// Manually clone object
		// ToDo
	}
	// If everything fails, return the original object
	return obj;
}