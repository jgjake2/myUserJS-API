// +@display_name  TypeOf

/**
 * Determine the real type of an object.
 * <br>Designed to handle scope and permission issues by cloning the object into the correct scope when an error occurs.
 * @function RealTypeOf
 * @memberof jMod
 * @param {object} _obj
 * @returns {string} undefined, object, map, number, nan, null, date, invaliddate, array, regex
 */
var RealTypeOf = jMod.RealTypeOf = function(_obj){
	var obj;
	// Check if scope is locked
	try{
		if (_obj.constructor === ({}).constructor || _obj)
			obj = _obj;
	}catch(e){
		// Clone if scope is locked
		obj = mCloneInto(_obj, unsafeWindow, {
			cloneFunctions: true,
			wrapReflectors: true
		});
	}
	try{
		if(typeof(obj) === _undefined) return _undefined;
		if(typeof obj === "number" && isNaN(obj) == true) return "nan";
		if (typeof(obj) === "object") {
			if (obj === null) return "null";
			if (obj.constructor === ({}).constructor) return "map";
			if (obj.constructor === (new Array).constructor) return "array";
			if (obj.constructor === (new Date).constructor){
				if(isNaN(obj.getTime()))
					return "invaliddate";
				return "date";
			}
			if (obj.constructor === (new RegExp).constructor) return "regex";
			return Object.prototype.toString.call(obj).replace(/^\[object |\]$/g,'').toLowerCase();
		}
	}catch(e){}
	try{
		if(typeof(obj) === "function"){
			if(obj.typeOfName && typeof obj.typeOfName === "string") return obj.typeOfName;
			if(obj.displayName && typeof obj.displayName === "string") return obj.displayName;
		}
	}catch(e){}
	return typeof(obj);
}

var isPlainObject = function( obj ) {
	try{
		if ( typeof obj !== "object" || obj.nodeType || obj === obj.window ) {
			return false;
		}
		if ( obj.constructor && !obj.hasOwnProperty.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}
	}catch(e){
		var obj2 = mCloneInto(obj, unsafeWindow, {
			cloneFunctions: true,
			wrapReflectors: true
		});
		if ( typeof obj2 !== "object" || obj2.nodeType || obj2 === obj2.window ) {
			return false;
		}

		if ( obj2.constructor && !obj2.hasOwnProperty.call( obj2.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}
	}
	return true;
}

var isArray = function(obj){
	try{
		if (obj.constructor === (new Array).constructor) return true;
	}catch(e){
		var obj2 = mCloneInto(obj, unsafeWindow, {
			cloneFunctions: true,
			wrapReflectors: true
		});
		if (obj2.constructor === (new Array).constructor) return true;
	}
	return false;
}

var isFunction = function( obj ) {
	return typeof obj === "function";
}
	