// +@display_name  Proto
// +@history (0.0.9) History begins.
// +@history (0.0.13) Fixed mCloneInto return value.
// +@history (0.0.14) Added URLBuilder Class.
// +@history (0.0.14) Updated URLBuilder so instanceof can be used.
// +@history (0.0.15) Added jMod.Extend.
	
	// jMod Error Class
	RequireScript('Core.Error.jModError');
	
	// URL Builder Class
	RequireScript('Core.URLBuilder');
	
	// Versions Class
	RequireScript('Core.Versions');
	
	// isElement
	RequireScript('Core.Element.isElement');
	
	// Parse Stack
	RequireScript('Core.ParseStack');
	
	// ExportFunction
	RequireScript('Core.ExportFunction');
	
	// CloneInto
	RequireScript('Core.CloneInto');
	
	// Object Prototypes
	RequireScript('Core.prototypes.Object');
	
	// Object Prototypes
	RequireScript('Core.prototypes.Watcher');
	
	if (!String.prototype.trim) {
		(function() {
			Object.defineProperty(String.prototype, 'trim', {
				value: function() {return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');},
				enumerable: false
			});
		})();
	}
	
	function eventCancel(e){
		var win = window || unsafeWindow;
		if(!e){
			if(win.event)
				e = win.event;
			else
				return;
		}
		if(e.cancelBubble != null) e.cancelBubble = true;
		if(e.stopPropagation) e.stopPropagation();
		if(e.preventDefault) e.preventDefault();
		if(win.event) e.returnValue = false;
		if(e.cancel != null) e.cancel = true;
	}
	
	function isEvent(a){
		var patt = /^\[object |\]$/g;
		try{
			if(Object.prototype.toString.call(a).replace(patt,'').toLowerCase() == "event") return true;
		}catch(e){}
		
		try{
			if(a.constructor.toString().replace(patt,'').toLowerCase() == "event") return true;
		}catch(e){}
		
		return false;
	}
	
	/***********************************
	 ** Types/TypeOf
	 **********************************/
	ImportScript('Core.prototypes.TypeOf');
	
	/***********************************
	 ** Extend
	 **********************************/
	ImportScript('Core.prototypes.Extend');
	
	/***********************************
	 ** Extend
	 **********************************/
	ImportScript('Core.prototypes.Clone');
	
	/***********************************
	 ** Browser
	 **********************************/
	ImportScript('Core.prototypes.Browser');
	
	/***********************************
	 ** Hex To RGB
	 **********************************/
	var hexToRgb = function(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
			a: null
		} : null;
	};
	/***********************************
	 ** Parse RGB
	 **********************************/
	var parseRGB = function(str){
		var r = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))?\s*\)/mi.exec(str);
		return r ? {
			r: parseInt(r[1]),
			g: parseInt(r[2]),
			b: parseInt(r[3]),
			a: r[4] && r[4] != '' ? parseFloat(r[4]) : null
		} : null;
	}
	/***********************************
	 ** Parse Color String
	 **********************************/
	var parseColorString = function(str){
		var r = parseRGB(str);
		return r ? r : hexToRgb(str);
	}
	
	var PI_OVER_2 = 0.5 * Math.PI,
		TEN_LOG2 = 10 * Math.log( 2 );
		
	var timeFromPosition = function( b, c, d, x ) {
		return 2 * d / Math.PI * Math.asin(( x - b ) / c );
	}
	
	var easeOutSin = function( c, d, t ) {
		var b = PI_OVER_2 / d,
			a = c * b;
		return Math.round( a * Math.cos( b * t ));
	}

	/***********************************
	 ** DOMParser
	 **********************************/
	ImportScript('Core.DOMParser');
	