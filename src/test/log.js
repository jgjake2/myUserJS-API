// +@insert          after:Core.init

+(function(){
jConfig('debug', true);
jConfig('API.log.debug', true);
//jConfig('API.log.WebConsole', false);
jConfig('API.log.verbosity_level', 5);
jConfig('API.log.disabled', []);
	
console.log("Log Test Start");

var testEl = createNewElement({
	type: 'div',
	id: 'test'
});

jMod.$('body').appendChild(testEl);

/*
function getById(id)
{
    return document.getElementById(id);
}
 
function getViaSelector(id)
{
    return document.querySelector(id);
}
setTimeout(function(){
var numberOfCalls = 10000;
jMod.log.profile('getElementById() vs. querySelector()');
//console.profile('getElementById() vs. querySelector()');
for (var i=0; i<numberOfCalls; ++i)
	getById("test");
for (var i=0; i<numberOfCalls; ++i)
	getViaSelector("test");
jMod.log.profileEnd();
//console.profileEnd();
},100);
*/

var jModLogTestObj = {
	foo: "bar",
	taco: {
		bell: true,
		salad: false
	}
};


/***********************************
 ** Test Exported Log Functions
 **********************************/
jMod.log.groupCollapsed('Test Exported Functions');
	jMod.Debug('Debug Test');
	jMod.Log('Log Test');
	jMod.Info('Info Test');
	jMod.Warning('Warning Test');

	function testError(){
		try{
			foo(bar);
		}catch(e){
			jMod.logError(e, "Error Test");
			jMod.Exception("Exception Test", e);
		}
	}
	testError();
jMod.log.groupEnd('Test Exported Functions');


/***********************************
 ** Test Normal Log Functions
 **********************************/
jMod.log.groupCollapsed('Test Normal Functions');
	jMod.log.dir(jModLogTestObj);
	jMod.log.dir(test);
	jMod.log.dirxml(test);

	jMod.log.timeStamp('Test timeStamp');
	jMod.log.time('Test Time');

	
	for(var i = 0; i < 10; i++){
		
		jMod.log.count('Test Count');
		var y = 0;
		for(var z = 0; z < 2000; z++){y++;} // Take up time
	}
	

	jMod.log.timeEnd('Test Time');
	
	jMod.log.trace('Trace Test');
	
	
jMod.log.groupEnd('Test Normal Functions');
/***********************************
 ** Test jMod-Only Log Functions
 **********************************/
jMod.log.group('Test jMod-Only Functions');
	jModLogTime('testLogTime');

	jModLog("Log Test Title", "Log Test Message", jModLogTestObj);
	jModLogInfo("Info Test Title", "Info Test Message", jModLogTestObj);
	jModLogWarning("Warning Test Title", "Warning Test Message", jModLogTestObj);
	jModLogError('Error Test Title - No Error Object', 'Error Test Message', jModLogTestObj, 'foo', 'bar');
	
	
	function testError2(){
		try{
			foo(bar);
		}catch(e){
			jModLogError(e, 'Error Test Title', 'Error Test Message', jModLogTestObj, 'foo', 'bar', 'taco', 'salad');
		}
	}
	testError2();
	
jMod.log.groupEnd('Test jMod-Only Functions');


console.log("Log Test End");
})();