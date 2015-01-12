// +@insert          after:end

function myCallbackFunction(response, response2){
	console.log('myCallbackFunction', response, response2);
}

function myErrorCallbackFunction(response, response2){
	console.log('myErrorCallbackFunction', response, response2);
}

var testServerURL = 'http://test2.myuserjs.org/script/jgjake2/Cracked.com_Enhancer.data.js?args=scriptLoadTime%3D296%2CunloadEventEnd%3D16%2CdomInteractive%3D187%2CdomContentLoadedEventStart%3D265%2CdomContentLoadedEventEnd%3D296%2CdomComplete%3D562%2CloadEventStart%3D577%2CloadEventEnd%3D577%2CpageLoadTime%3D577%2CNetworkLatency%3D0%2CstatReportTime%3D593%2CmujsAPILoadStart%3D156%2CmujsAPILoadEnd%3D172%2CmujsAPILoadTime%3D16&api_version=0.0.15&updateVeriableName=USMetaData&getstats=1&scriptversion=0.0.15&scripthandler=Greasemonkey&scripthandlerversion=2.3beta1&cachebuster=1420019578';

var mainServerURL = 'http://myuserjs.org/script/jgjake2/Anti-Pagination.data.js?args=scriptLoadTime%3D296%2CunloadEventEnd%3D16%2CdomInteractive%3D187%2CdomContentLoadedEventStart%3D265%2CdomContentLoadedEventEnd%3D296%2CdomComplete%3D562%2CloadEventStart%3D577%2CloadEventEnd%3D577%2CpageLoadTime%3D577%2CNetworkLatency%3D0%2CstatReportTime%3D593%2CmujsAPILoadStart%3D156%2CmujsAPILoadEnd%3D172%2CmujsAPILoadTime%3D16&api_version=0.0.15&updateVeriableName=USMetaData&getstats=1&scriptversion=0.0.15&scripthandler=Greasemonkey&scripthandlerversion=2.3beta1&cachebuster=1420019578';

var un = 'jgjake2';
var sn = 'Cracked.com_Enhancer';
var gt = 'data';
var tURL = new jMod.URLBuilder('http://myuserjs.org');
tURL.setPath('/script/' + un + '/' + sn + '.' + gt + '.js');

jMod.onPageReady = function(){
	console.log('Test Send Message');
	jMod.SendMessage({
		url: mainServerURL,
		//method: 'jsonp',
		//method: 'jQuery',
		method: 'XMLHTTPRequest',
		responseType: 'json',
		callback: myCallbackFunction,
		onerror: myErrorCallbackFunction
	});
}

/*

*/

/*
http://test2.myuserjs.org/script/jgjake2/Cracked.com_Enhancer.data.js?args=scriptLoadTime%3D296%2CunloadEventEnd%3D16%2CdomInteractive%3D187%2CdomContentLoadedEventStart%3D265%2CdomContentLoadedEventEnd%3D296%2CdomComplete%3D562%2CloadEventStart%3D577%2CloadEventEnd%3D577%2CpageLoadTime%3D577%2CNetworkLatency%3D0%2CstatReportTime%3D593%2CmujsAPILoadStart%3D156%2CmujsAPILoadEnd%3D172%2CmujsAPILoadTime%3D16&api_version=0.0.15&updateVeriableName=USMetaData&getstats=1&scriptversion=0.0.15&scripthandler=Greasemonkey&scripthandlerversion=2.3beta1&cachebuster=1420019578
*/