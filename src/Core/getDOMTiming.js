// +@display_name  DOMTiming
// +@history (0.0.9) History begins.
// +@history (0.0.16) renamed variables and added jModReady

jMod.getDOMTiming = function(){
	var _timingData, timingData = {};
	try {
		if(performance.available){
			var ignore = ['unloadEventStart', 'unloadEventEnd', 'navigationStart'];
			
			_timingData = performance.getAllTiming();
			
			var navStart = performance.get('timing.navigationStart');
			
			for(var key in _timingData){
				timingData[key] = _timingData[key] - navStart;
				if(timingData[key] <= 0 || isNaN(timingData[key]))
					delete timingData[key];
			}
			
			var pageLoadTime = (performance.get('timing.loadEventEnd') || performance.get('timing.loadEventStart')) - performance.get('timing.navigationStart');
			if(pageLoadTime > 0) timingData['pageLoadTime'] = pageLoadTime;
			
			var NetworkLatency = performance.get('timing.responseEnd') - performance.get('timing.fetchStart');
			if(NetworkLatency >= 0) timingData['NetworkLatency'] = NetworkLatency;

			var statReportTime = performance.now;
			if(statReportTime > 0) timingData['statReportTime'] = statReportTime;
			
			if(jMod.InitializeEndTime > 0) timingData['jModInitializeEnd'] = jMod.InitializeEndTime;
			if(jMod.InitializeStartTime >= 0){
				timingData['jModInitializeStart'] = jMod.InitializeStartTime;
				if(jMod.InitializeEndTime > 0 && (jMod.InitializeEndTime - jMod.InitializeStartTime) > 0) timingData['jModInitializeTime'] = (jMod.InitializeEndTime - jMod.InitializeStartTime);
				if(jModReady > 0 && (jModReady - jMod.InitializeStartTime) > 0) timingData['jModReadyTime'] = (jModReady - jMod.InitializeStartTime);
			}
		}
	} catch(e) {
		//console.error('Error! getDOMTiming: ', e);
		jModLogError(e, 'jMod.getDOMTiming');
		return {};
	}
	return timingData;
};