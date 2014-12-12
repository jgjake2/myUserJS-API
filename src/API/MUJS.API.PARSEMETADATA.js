// +@display_name  Parse Meta
// +@replace  MUJS.API.PARSEMETADATA
// +@history (0.0.9) History begins.

		
		MUJS.API.ParseMetaData_Types = [];
		
		MUJS.API.ParseMetaData_Types.push(function(name, obj){
			if(typeof obj === "object"){
				var history_patt = /\(([0-9\.]+)\)\s+(.*?)$/i;
				var o = {};
				for(var i = 0; i < obj.length; i++){
					if(history_patt.test(obj[i])){
						var r = history_patt.exec(obj[i]);
						var vers = r[1];
						var des = r[2];
						if(typeof o[vers] === "undefined") o[vers] = [];
						o[vers].push(des);
					}
				}
				return o;
			}
			return undefined;
		});
		
		//MUJS.API.ParseMetaData_Types.push(function(name, obj){
		//});
		
		MUJS.API.ParseMetaData = function(headerBlock){
			if(typeof headerBlock === "string"){
				headerBlock = headerBlock.split(/\r?\n/i);
			}
			// Parse Meta Array
			var o = {};
			var patt = /@([\S]+)\s+(.*?)$/i;
			for(var i = 0; i < headerBlock.length; i++){
				if(patt.test(headerBlock[i])){
					var r = patt.exec(headerBlock[i]);
					if(typeof o[r[1]] === "undefined"){
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
			
			for(var key in o){
				for(var i = 0; i < MUJS.API.ParseMetaData_Types.length; i++){
					var tmp = MUJS.API.ParseMetaData_Types[i](key, o[key]);
					if(typeof tmp !== "undefined"){
						o[key] = tmp;
						break;
					}
				}
			}
			
			return o;
		}
