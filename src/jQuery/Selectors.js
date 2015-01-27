// +@display_name  jQuery Selectors

+(function(){

	var Selectors = jMod.jQueryExtensions.Selectors = function(_jQueryObj, name){
		if(!_jQueryObj)
			return;
		var i;
		if(arguments.length == 1){
			for(i in Selectors.ext)
				Selectors[i](_jQueryObj);
			return;
		}
		
		for(i = 1; i < arguments.length; i++){
			if(EXISTS(Selectors.ext[arguments[i]])){
				Selectors.ext[arguments[i]](_jQueryObj);
			}
		}
	}
	
	Selectors.ext = {};

	// Check if element is visible in the viewport:
	Selectors.ext.inView = function(_jQueryObj){
		if(_jQueryObj && !_jQueryObj.expr[':'].inView){
			_jQueryObj.extend(_jQueryObj.expr[':'],{
				inView: function(a) {
					win = window || unsafeWindow;
					doc = document || win.document;
					var scrollTop = (doc.documentElement.scrollTop || doc.body.scrollTop),
						offsetTop = _jQueryObj(a).offset().top,
						windowHeight = (win.innerHeight && win.innerHeight < _jQueryObj(win).height()) ? win.innerHeight : _jQueryObj(win).height();
					return offsetTop > scrollTop && (_jQueryObj(a).height() + offsetTop) < (scrollTop + windowHeight);
				}
			});
		}
	}
	

})()