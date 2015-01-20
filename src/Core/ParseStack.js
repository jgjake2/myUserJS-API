// +@display_name  Parse Stack

jMod.parseStack = function(stackText){
	var o = [];
	//var anonFunctionPatt = /\@((?:https?\:\/\/)?[^\s\:]+).*?([^\:\s]*)?\:(\d+)(?:\:(\d+))?\s*$/gi;
	var stackPatt = /(([^\s]*)\@file\:\/\/\/([^\s]+?(?:\/([^\/]+?\.(user\.js|js|json|php|htm|html|asp)))?):(\d+)(?:\:(\d+))?)/gi;
	var match;
	while ((match = stackPatt.exec(stackText)) != null) {
		var tmp = {
			line: match[1],
			functionName: match[2],
			fullFileName: match[3],
			fileName: match[4],
			fileExt: match[5],
			lineNumber: match[6],
			columnNumber: match[7]
		};
		o.push(tmp);
	}
	return o;
	
};