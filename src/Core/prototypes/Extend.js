// +@display_name  Extend

RequireScript('prototypes.TypeOf');

// Based on jQuery extend
/**
 * Copy all the properties of one object onto another. If only a single object is given, the properties are copied onto the jMod object.
 * <br>This version of extend is designed to handle scope and permission issues by cloning the object into the correct scope when an error occurs.
 * <br>Based on jQuery.extend
 * @author jQuery
 * @function extend
 * @memberOf jMod
 * @param {(boolean|object)} arg1 - (boolean) make deep copy, (object) target object if multiple object arguments exist, (object) object to copy onto jMod object if it is the only input
 * @param {object} [arg2] - Object to copy to target (if arg1 is object) or target object (if arg1 is boolean and arg3 exists) or object to copy onto jMod object
 * @param {...object} [arg3] - Object to copy onto target object
 */
jMod.extend = function() {
	//console.log('merge', arguments);
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;
	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}
	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && typeof target !== "function" ) {
		target = {};
	}
	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}
	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				//copy = options[ name ];
				try {
					if (
						(options[ name ].constructor === ({}).constructor || options[ name ]) // will cause scoped objects to throw error
						|| target // always true
						)
					copy = options[ name ];
				} catch(e) {
					copy = mCloneInto(options[ name ], target, {
							cloneFunctions: true,
							wrapReflectors: true
						});
				}
				// Prevent never-ending loop
				if ( target === options[ name ] || target === copy ) {
					continue;
				}
				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( isPlainObject(copy) ||
						(copyIsArray = isArray(copy)) ) ) {
						
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && isArray(src) ? src : [];
					} else {
						clone = src && isPlainObject(src) ? src : {};
					}
					target[ name ] = jMod.extend( deep, clone, copy );
					// Never move original objects, clone them
				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					try {
						target[ name ] = copy;
					} catch(e) {
						target[ name ] = mCloneInto(copy, target, {
								cloneFunctions: true,
								wrapReflectors: true
							});
					}
				}
			}
		}
	}
	// Return the modified object
	return target;
};

// Extend Preserve
/**
 * Same as [jMod.extend]{@link jMod.extend} except arrays are preserved. So if both target[x] and input[x] are arrays, instead of being overwritten, all the elements of input[x] are appended to target[x].
 * <br>Based on jQuery.extend
 * @author jQuery
 * @function extendp
 * @memberOf jMod
 * @param {(boolean|object)} arg1 - (boolean) make deep copy, (object) target object if multiple object arguments exist, (object) object to copy onto jMod object if it is the only input
 * @param {object} [arg2] - Object to copy to target (if arg1 is object) or target object (if arg1 is boolean and arg3 exists) or object to copy onto jMod object
 * @param {...object} [arg3] - Object to copy onto target object
 * @see jMod.extend
 */
jMod.extendp = function() {
	var options, name, src, copy, copyIsArray, clone, j,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;
	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}
	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && typeof target !== "function" ) {
		target = {};
	}
	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}
	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				//copy = options[ name ];
				try {
					if (
						(options[ name ].constructor === ({}).constructor || options[ name ]) // will cause scoped objects to throw error
						|| target // always true
						)
					copy = options[ name ];
				} catch(e) {
					copy = mCloneInto(options[ name ], target, {
							cloneFunctions: true,
							wrapReflectors: true
						});
				}
				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}
				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( isPlainObject(copy) ||
						(copyIsArray = isArray(copy)) ) ) {
						
					if ( copyIsArray ) {
						if(isArray(src) && Array.prototype.push.apply(target[name], copy))
							continue;
						/*
						if(isArray(src)){
							for(j = 0; j < copy.length; j++){
								if(src.indexOf(copy[j]) == -1)
									target[name].push(copy[j]);
							}
							continue;
						}
						*/
						clone = src && isArray(src) ? src : [];
					} else {
						clone = src && isPlainObject(src) ? src : {};
					}
					target[ name ] = jQuery.extendp( deep, clone, copy );
					// Never move original objects, clone them
				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					try{
						target[ name ] = copy;
					} catch(e) {
						target[ name ] = mCloneInto(copy, target, {
								cloneFunctions: true,
								wrapReflectors: true
							});
					}
				}
			}
		}
	}
	// Return the modified object
	return target;
};

