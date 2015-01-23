// +@display_name  Element Query

jMod.$ = function(selector, target, nojQuery){
	if(!target)
		target = (_undefined!==typeof document?document:unsafeWindow.document);
	//if(_undefined===typeof target)
		//target = unsafeWindow.document;

	try{
		if(nojQuery !== true && jMod.jQueryAvailable){
			try{
				return $(selector, target).first()[0];
			}catch(e){}
		}
		
		if(typeof selector !== "string"){
			return;
		}
		
		return target.querySelector(selector);
	
	}catch(e){
		jMod.Exception('jMod.Query', 'Error!', e);
	}
}

jMod.$$ = function(selector, target, nojQuery){
	if(!target)
		target = (_undefined!==typeof document?document:unsafeWindow.document);
	try{
		if(nojQuery !== true && jMod.jQueryAvailable){
			try{
				return $(selector, target).toArray();
			}catch(e){}
		}
		
		if(typeof selector !== "string"){
			return;
		}
		
		var tmp = target.querySelectorAll(selector);
		return (tmp?[].map.call(tmp, function(element) {return element;}):[]);
	}catch(e){
		jMod.Exception('jMod.Query', 'Error!', e);
	}
}
