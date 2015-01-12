// +@display_name  Parse Meta
// +@history (0.0.9) History begins.

jMod.API.ParseMetaData_Types = [];

jMod.API.ParseMetaData_Types.push(function(name, obj){
	if(name.toLowerCase() == "history" && typeof obj === "object"){
		var history_patt = /\(([0-9\.]+)\)\s+(.*?)$/i;
		var o = {};
		for(var i = 0; i < obj.length; i++){
			if(history_patt.test(obj[i])){
				var r = history_patt.exec(obj[i]);
				var vers = r[1];
				var des = r[2];
				if(typeof o[vers] === _undefined) o[vers] = [];
				o[vers].push(des);
			}
		}
		return o;
	}
	return undefined;
});

jMod.API.ParseMetaData = function(headerBlock){
	var tmp, key, i, r, o = {}, patt = /@([\S]+)\s+(.*?)$/i;
	if(typeof headerBlock === "string"){
		headerBlock = headerBlock.split(/\r?\n/i);
	}
	// Parse Meta Array
	for(i = 0; i < headerBlock.length; i++){
		if(patt.test(headerBlock[i])){
			r = patt.exec(headerBlock[i]);
			if(typeof o[r[1]] === _undefined){
				o[r[1]] = r[2];
			} else {
				if(typeof o[r[1]] !== "string"){
					o[r[1]].push(r[2]);
				} else {
					tmp = o[r[1]];
					o[r[1]] = [];
					o[r[1]].push(tmp);
					o[r[1]].push(r[2]);
				}
			}
		}
	}
	
	for(key in o){
		for(i = 0; i < jMod.API.ParseMetaData_Types.length; i++){
			if(typeof (tmp = jMod.API.ParseMetaData_Types[i](key, o[key])) !== _undefined){
				o[key] = tmp;
				break;
			}
		}
	}
	
	return o;
}
