// +@display_name  Clone

RequireScript('prototypes.TypeOf');

// Based on assign
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
// Similar to extend, but not scope-friendly and attempts to copy getter/setter functions and rebind them to the new object
jMod.CloneProperties = function() {
	var nextSource, descriptor, keysArray, nextIndex, nextKey, desc, to,
		length = arguments.length,
		target = arguments[0],
		deep = false,
		i = 1;
	
	if(ISBOOLEAN(target) && length > 2){
		deep = target;
		target = arguments[i++];
	}
		
	if (target === undefined || target === null)
		return target;
		//throw new TypeError("Cannot convert target argument to object");
		
	to = Object(target);
	
	for (i; i < length; i++) {
		nextSource = arguments[i];
		if (nextSource === undefined || nextSource === null) continue;
		
		keysArray = deep ? Object.getOwnPropertyNames(Object(nextSource)) : Object.keys(Object(nextSource));
		
		for (nextIndex = 0; nextIndex < keysArray.length; nextIndex++) {
			nextKey = keysArray[nextIndex];
			desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
			if(desc !== undefined){
				if(ISFUNCTION(nextSource[nextKey])) {
					to[nextKey] = nextSource[nextKey].bind(to);
				} else if(ISOBJECT(nextSource[nextKey]) && isPlainObject(nextSource[nextKey])){
					Object.defineProperty(to, nextKey, {
						enumerable: desc.enumerable,
						configurable: desc.configurable,
						writable: desc.writable,
						value: deep ? jMod.CloneProperties(deep, to[nextKey] || {}, nextSource[nextKey]) : nextSource[nextKey]
					});
				} else {
					descriptor = {enumerable: desc.enumerable, configurable: desc.configurable};
					
					if(EXISTS(desc.get))
						descriptor.get = desc.get.bind(to);
					
					if(EXISTS(desc.set))
						descriptor.set = desc.set.bind(to);
					
					if(EXISTS(desc.value)){
						descriptor.writable = desc.writable;
						if(ISFUNCTION(desc.value))
							descriptor.value = desc.value.bind(to);
						else
							descriptor.value = desc.value;
					}
					
					Object.defineProperty(to, nextKey, descriptor);
				}
			}
		}
	}
	return to;
};
/*
function test_assign(){
	console.log('Test CloneProperties');
	
	var orig = {
		key1: 'val1',
		key2: {
			subkey1: 'subval1'
		},
		key3: function(){
			console.log('key3 val3 - this:', this);
		}
	}
	Object.defineProperty(orig, 'key4', {
		get: function(){
			return this.key1;
		},
		set: function(value){
			this.key1 = value;
		}
	});
	
	console.log('orig', orig);
	var resultObj = {};
	resultObj = jMod.CloneProperties(true, resultObj, orig);
	
	console.log('resultObj', resultObj);
	
	resultObj.key1 = 'foo';
	console.log('resultObj', resultObj);
	console.log('resultObj key1', resultObj.key1);
	console.log('resultObj key4', resultObj.key4);
	
	console.log('orig key1', orig.key1);
	console.log('orig key4', orig.key4);
}

test_assign();
*/
