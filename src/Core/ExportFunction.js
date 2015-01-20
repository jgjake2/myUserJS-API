// +@display_name  ExportFunction
// +@history (0.0.17) Better support when "exportFunction" is unavailable.

function mExportFunction(func, scope, args){
	if(typeof exportFunction !== _undefined){
		try{
			return exportFunction(func, scope, args);
		}catch(e){}
	}
	var name = '';
	if(typeof args === _undefined) args = {};
	if(typeof args.defineAs !== _undefined)
		name = args.defineAs;
	else if(typeof func === "function" && func.name != '')
		name = func.name
	if(name == '') return;
	try{
		scope[name] = func;
		return scope[name];
	}catch(e){}
}