// +@display_name  ExportFunction
// +@history (0.0.17) Added condition for arrays when normal copying fails.
// +@history (0.0.17) Added some documentation.

function mCloneInto(obj, scope, args){
	if(typeof cloneInto !== _undefined){
		try{
			// Should work 99% of the time, unless there is a scope-locked property like an error event object from a privileged userscript
			return cloneInto(obj, scope, args);
		}catch(e){}
		
		// Very crude, will clean up later with some recursion
		// If it fails, copy it piece-by-piece excluding any properties that fail to copy cleanly.
		var i, type, tmp = {};
		/*
		var i, type, cloneCount = 0;
		while(typeof (scope || unsafeWindow)["tmpCloneObj" + cloneCount] != _undefined){
			cloneCount++;
		}
		var tmp = (typeof createObjectIn !== "undefined" ? createObjectIn(scope || unsafeWindow, {defineAs: "tmpCloneObj" + cloneCount}) : {});
		*/
		for(i in obj){
			if(Object.prototype.hasOwnProperty.call(obj, i)){
				type = typeof obj[i];
				// Copy strings, numbers, and booleans normally
				if(["string", "number", "boolean"].indexOf(type)){
					try{
						tmp[i] = cloneInto(obj[i], scope, args);
					}catch(e){}
				// Copy objects by doing a "shallow" copy of its properties
				} else if(type == "object"){
					// Check if obj[i] is an array
					// Don't risk checking its constructor, just look for length property
					if(typeof obj[i].length !== "number"){
						tmp[i] = {};
						for(var x in obj[i]){
							try{
								if(Object.prototype.hasOwnProperty.call(obj[i], x)){
									tmp[i][x] = cloneInto(obj[i][x], scope, args);
								}
							}catch(e){}
						}
					} else {
						tmp[i] = [];
						for(var x = 0; x < obj[i].length; x++){
							try{
								tmp[i].push(cloneInto(obj[i][x], scope, args));
							}catch(e){
								tmp[i].push(undefined);
							}
						}
					}
				}
			}
		}
		try{
			return cloneInto(tmp, scope, args);
		}catch(e){
			//return tmp;
		}
	} else {
		// Manually clone object
		// ToDo
	}
	// If everything fails, return the original object
	return obj;
}