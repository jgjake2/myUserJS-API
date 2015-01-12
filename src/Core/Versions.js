// +@display_name  Versions
// +@history (0.0.16) History begins.

jMod.Versions = {

	parseVersion: function(str){
		var fullVersionPatt = /^\s*(.*?)\s*((?:[\d]+\.)*[\d]+)\s*(.*?)\s*$/i;
		var versionNumsPatt = /([\d]+)\.?/gi;
		var matches;
		var output = {
			fullVersion: str.trim(),
			versionStr: null,
			prefixStr: null,
			suffixStr: null,
			version: []
		};
		if(matches = fullVersionPatt.exec(str.trim())){
			output.prefixStr = matches[1];
			output.versionStr = matches[2];
			output.suffixStr = matches[3];
			var tmp = matches[2].split('.');
			for(var index in tmp)
				output.version.push(parseInt(tmp[index]));
		}
		return output;
	},
	
	compare: function(v1, v2){
		var versionObj1 = v1;
		var versionObj2 = v2;
		if(typeof v1 === "string")
			versionObj1 = this.parseVersion(v1);
			
		if(typeof v2 === "string")
			versionObj2 = this.parseVersion(v2);
			
		// clone to avoid changing original values
		var versionArray1 = [].concat(versionObj1.version);
		var versionArray2 = [].concat(versionObj2.version);
		while(true){
			var val1 = versionArray1.shift();
			var val2 = versionArray2.shift();
			if(val1 != null && val2 != null){
				if(parseInt(val1) > parseInt(val2))
					return 1;
				if(parseInt(val1) < parseInt(val2))
					return -1;
			} else if(val1 != null && val2 == null){
				return 1;
			} else if(val1 == null && val2 != null){
				return -1;
			} else {
				break;
			}
		}
		// ToDo: compare prefix / suffix
		return 0;
	}
}

//var tVersion1 = jMod.Versions.parseVersion('v0.2.14beta');
//var tVersion2 = jMod.Versions.parseVersion('v0.1.14beta');

//console.log(tVersion1, tVersion2);
//console.log('compare', jMod.Versions.compare('v0.2.14beta', 'v0.1.14beta'));
//console.log('compare', jMod.Versions.compare('v0.1.14beta', 'v0.1.14beta'));
//console.log('compare', jMod.Versions.compare('v0.0.14beta', 'v0.1.14beta'));
	
	