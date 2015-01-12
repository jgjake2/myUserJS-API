
jMod('info', 'jMod _call() Test Start');

jMod(function(){
	jMod('info', 'jMod Ready!!');
});

jMod('onDOMReady', function(){
	jMod('info', 'onDOMReady Ready!!');
});

// Test Config WITH "get" or "set" commands
jMod('info', 'With "get"/"set"');
jMod('log', 'Update.XMLHttpRequest before: ', jMod('get', 'Update.XMLHttpRequest'));
jMod('set', 'Update.XMLHttpRequest', true);
jMod('log', 'Update.XMLHttpRequest after: ', jMod('get', 'Update.XMLHttpRequest'));

// Test Config WITHOUT "get" or "set" commands
jMod('info', 'Without "get"/"set"');
jMod('log', 'host before: ', jMod('host'));
jMod('host', 'http://test2.myuserjs.org');
jMod('log', 'host after: ', jMod('host'));

// Test Config WITHOUT "get" or "set" commands, 
jMod('info', 'Without "get"/"set" && Non-matching types. (should cause warning)');
jMod('log', 'Update.sampleRate before: ', jMod('Update.sampleRate'));
jMod('Update.sampleRate', true);
jMod('log', 'Update.sampleRate after: ', jMod('Update.sampleRate'));



jMod('info', 'jMod _call() Test End');
