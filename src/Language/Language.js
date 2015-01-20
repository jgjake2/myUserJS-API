// +@display_name  Language
// +@history (0.0.17) History begins.

var StringFormat = function(str, arr){
    var i = -1;
    function callback(exp, p0, p1, p2, p3, p4){
        if (exp=='%%') return '%';
        if (arr[++i] === undefined) return undefined;
        var exp  = p2 ? parseInt(p2.substr(1)) : undefined;
        var base = p3 ? parseInt(p3.substr(1)) : undefined;
        var val;
        switch (p4) {
            case 's': val = arr[i]; break;
            case 'c': val = arr[i][0]; break;
            case 'f': val = parseFloat(arr[i]).toFixed(exp); break;
            case 'p': val = parseFloat(arr[i]).toPrecision(exp); break;
            case 'e': val = parseFloat(arr[i]).toExponential(exp); break;
            case 'x': val = parseInt(arr[i]).toString(base?base:16); break;
            case 'd': val = parseFloat(parseInt(arr[i], base?base:10).toPrecision(exp)).toFixed(0); break;
        }
        val = typeof(val)=='object' ? JSON.stringify(val) : val.toString(base);
        var sz = parseInt(p1); /* padding size */
        var ch = p1 && p1[0]=='0' ? '0' : ' '; /* isnull? */
        while (val.length<sz) val = p0 !== undefined ? val+ch : ch+val; /* isminus? */
       return val;
    }
    var regex = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd])/g;
    return str.replace(regex, callback);
}

var Lang = jMod.Language = function(keys){
	var type, value, tmpLanguageObj = Lang.getLanguage(Lang.Current, true);
	if(!tmpLanguageObj)
		return;
	value = Object_SearchForKey.call(tmpLanguageObj, keys);
	type = typeof value;
	if(_undefined==type){
		if(Lang.Current === Lang.Default)
			return;
		tmpLanguageObj = Lang.getLanguage(Lang.Default);
		value = Object_SearchForKey.call(tmpLanguageObj, keys);
		type = typeof value;
		if(_undefined==type)
			return;
	}
	if(arguments.length == 1 || type !== "string")
		return value;
	return StringFormat.call(StringFormat, value, Slice.call(arguments, 1));
}
Lang.Default = 'en';
Object.defineProperty(Lang, 'Current', {
	get: function(){
		try {
			return jConfig.Language.Current;
		} catch(e){
			return Lang.Default;
		}
	},
	set: function(value){
		try {
			if(_undefined!==typeof Lang.Names[value])
				jConfig.Language.Current = value;
		} catch(e){}
	}
});
Lang.Names = {};

Lang.getLanguage = function(name, revertToDefault){
	if(Lang.Names[name] !== undefined)
		return Lang[name];
	if(revertToDefault)
		return Lang[Lang.Default];
}

// English
ImportScript('Language.en');

// Spanish
ImportScript('Language.es');

/*
Lang.Current = 'es';
console.log('Language Test');
console.log(Lang('test'));
console.log(Lang('test2', 'tacos', 123));
console.log(Lang('test3'));
*/