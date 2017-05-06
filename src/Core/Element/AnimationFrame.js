// +@display_name  Animation Frame

+(function(){

	var win = window || unsafeWindow;
	
	
	var _requestAnimationFrameKey =
			win.requestAnimationFrame ? 'requestAnimationFrame' :
			win.mozRequestAnimationFrame ? 'mozRequestAnimationFrame' :
			win.webkitRequestAnimationFrame ? 'webkitRequestAnimationFrame' :
			win.oRequestAnimationFrame ? 'oRequestAnimationFrame' :
			win.msRequestAnimationFrame ? 'msRequestAnimationFrame' :
			null;
	
	var _cancelAnimationFrameKey =
			win.cancelAnimationFrame ? 'cancelAnimationFrame' :
			win.mozCancelAnimationFrame ? 'mozCancelAnimationFrame' :
			win.webkitCancelAnimationFrame ? 'webkitCancelAnimationFrame' :
			win.oCancelAnimationFrame ? 'oCancelAnimationFrame' :
			win.msCancelAnimationFrame ? 'msCancelAnimationFrame' :
			win.clearTimeout ? 'clearTimeout' :
			null;
	
	jMod.Element.requestAnimationFrame = function(fn){
		if(_requestAnimationFrameKey){
			try{
				return win[_requestAnimationFrameKey](fn);
			}catch(e){}
		}
		return win.setTimeout(fn, 17);
	}
	
	jMod.Element.cancelAnimationFrame = function(id){
		if(_cancelAnimationFrameKey){
			return win[_cancelAnimationFrameKey](id);
		}
	}
	
})();