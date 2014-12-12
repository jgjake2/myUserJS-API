// +@display_name  DOMTiming
// +@replace  MUJS.GETDOMTIMING
// +@history (0.0.9) History begins.

MUJS.fn.getDOMTiming = function(){
	var timingData = {};
	try {
		if(performance.available){
			var ignore = ['unloadEventStart', 'unloadEventEnd', 'navigationStart'];
			
			timingData = performance.getAllTiming();
			
			for(var key in timingData){
				timingData[key] = timingData[key] - performance.get('timing.navigationStart');
				if(timingData[key] <= 0)
					delete timingData[key];
			}
			
			var pageLoadTime = (performance.get('timing.loadEventEnd') || performance.get('timing.loadEventStart')) - performance.get('timing.navigationStart');
			if(pageLoadTime > 0) timingData['pageLoadTime'] = pageLoadTime;
			
			var NetworkLatency = performance.get('timing.responseEnd') - performance.get('timing.fetchStart');
			if(NetworkLatency >= 0) timingData['NetworkLatency'] = NetworkLatency;

			var statReportTime = performance.now;
			if(statReportTime > 0) timingData['statReportTime'] = statReportTime;

			if(mujsAPILoadStart > 0) timingData['mujsAPILoadStart'] = mujsAPILoadStart;
			if(mujsAPILoadEnd > 0) timingData['mujsAPILoadEnd'] = mujsAPILoadEnd;
			if(mujsAPILoadStart > 0 && mujsAPILoadEnd > 0 && (mujsAPILoadEnd - mujsAPILoadStart) > 0) timingData['mujsAPILoadTime'] = (mujsAPILoadEnd - mujsAPILoadStart);
		}
	} catch(e) {
		console.log('Error! getDOMTiming: ', e);
		return {};
	}
	return timingData;
};