// +@insert          after:Core.init

console.log("Log Test Start");

var jModLogTestObj = {
	foo: "bar",
	taco: {
		bell: true,
		salad: false
	}
};

jModLogTime('testLogTime');

jModLogInfo("Info Test Title", "info Test Message", jModLogTestObj);

function testError(){
	try{
		foo(bar);
	}catch(e){
		jModError(e, 'Error Test Title', 'Error Test Message');
	}
}
testError();


console.log("Log Test End");
