// +@display_name  Parse Stack

jMod.parseStack = function(stackText){
	var o = [];
	//var anonFunctionPatt = /\@((?:https?\:\/\/)?[^\s\:]+).*?([^\:\s]*)?\:(\d+)(?:\:(\d+))?\s*$/gi;
	var stackPatt = /([^\s]*)\@file\:\/\/\/([^\s]+?(?:\/([^\/]+?\.(user\.js|js|json|php)))?):(\d+)(?:\:(\d+))?/gi;
	var match;
	while ((match = stackPatt.exec(stackText)) != null) {
		var tmp = {
			functionName: match[1],
			fullFileName: match[2],
			fileName: match[3],
			fileExt: match[4],
			lineNumber: match[5],
			columnNumber: match[6]
		};
		o.push(tmp);
	}
	return o;
	
};