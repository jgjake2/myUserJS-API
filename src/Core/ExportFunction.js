// +@display_name  ExportFunction
// +@history (0.0.17) Better support when "exportFunction" is unavailable.

function mExportFunction(func, scope, args){
	if(EXISTS(exportFunction)){
		try{
			return exportFunction(func, scope, args);
		}catch(e){}
	}
	var name = '';
	if(args && args.defineAs)
		name = args.defineAs;
	else if(typeof func === "function" && func.name != '')
		name = func.name
	if(name != '')
		try{return (scope[name] = func);}catch(e){}
}