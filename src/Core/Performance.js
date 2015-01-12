// +@display_name  Performance

var performance = new function(){
	var _performance;
	var getPerformance = function(){
		if(_performance === undefined)
			_performance = (typeof unsafeWindow.performance !== _undefined && typeof unsafeWindow.performance.timing !== _undefined) ? unsafeWindow.performance : undefined;
		return _performance;
	};
	
	this.__defineGetter__("performanceObject", function(){return getPerformance();});
	
	this.__defineGetter__("available", function(){return (this.performanceObject === undefined ? false : true);});
	
	this.__defineGetter__("now", function(){try{return (this.performanceObject).now();}catch(e){jMod.Warning('Performance not available!');}});
	
	this.get = function(str){
		var i = 0, names = str.split('.'), p = this.performanceObject;
		if(p === undefined) return;
		for(i; i < names.length; i++){
			if(typeof p[names[i]] === _undefined) return;
			p = p[names[i]];
		}
		return p;
	};
	
	this.getAllTiming = function(ignore){
		if(ignore === undefined) ignore = [];
		var timingData = [];
		var p = this.performanceObject;
		for(var key in p.timing){
			if(!isNaN(p.timing[key]) && ignore.indexOf(key) == -1){
				timingData[key] = p.timing[key];
			}
		}
		return timingData;
	};
	
	this.pageLoadTime = function(){
		try{
			var t = this.performanceObject.timing;
			//return (!isNaN(t.loadEventEnd) && t.loadEventEnd > 0 ? t.loadEventEnd : t.loadEventStart) - t.navigationStart;
			if(isNaN(t.loadEventEnd)) return;
			return (t.loadEventEnd - t.navigationStart);
		} catch(e) {}
	}
	
};
