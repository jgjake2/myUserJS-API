// +@display_name  Initialize
// +@replace  MUJS.INIT
// +@history (0.0.14) History begins.


if(typeof GM_info !== "undefined"){
	MUJS.log.Debug('GM_info', GM_info);
	MUJS({
		'ginfo': GM_info,
		'has_GM_info': (typeof GM_info !== "undefined" ? true : false),
		'has_GM_getMetadata': (typeof GM_getMetadata !== "undefined" ? true : false)
	});
}

var totalCallCount = 0;

function tryInit(e){
	if({{{DEBUG}}}) MUJS.log.count('Try Init');
	if(!MUJSRequire.DOMLoaded){
		if(['interactive', 'complete'].indexOf(document.readyState.toLowerCase()) != -1){
			MUJSRequire.DOMLoaded = true;
			if({{{DEBUG}}}) MUJS.Debug('DOM Loaded - Begin Init');
		}
	}
	
	if(MUJSRequire.DOMLoaded){
		
		if(!MUJSRequire.onErrorFunctionAdded){
			MUJSRequire.onErrorFunctionAdded = true;
			MUJS.API.contentEval(onErrorFunction);
			setTimeout(function(){MUJS.Events.fire('onReady');},1);
		}
		
		if(!MUJSRequire.RequirementsAdded){
			MUJSRequire.RequirementsAdded = true;
			MUJS.Requirements.insertAll();
		}
		
		if(!MUJSRequire.CSSAdded){
			MUJSRequire.CSSAdded = true;
			MUJS.API.addStyle(_css);
			_css = '';
		}
		if(!MUJSRequire.notificationsInitialized){
			MUJSRequire.notificationsInitialized = true;
			//setTimeout(function(){
				MUJS.Notification.init();
			//},1);
		}
		if(!MUJSRequire.modalInitialized){
			MUJSRequire.modalInitialized = true;
			//setTimeout(function(){
				MUJS.Modal.init();
			//},1);
		}
		if(!MUJSRequire.documentComplete){
			if(document.readyState === "complete"){
				var pageLoadTime = 0;
				if(performance.available)
					pageLoadTime = (performance.get('timing.loadEventEnd') || performance.get('timing.loadEventStart')) - performance.get('timing.navigationStart');
				if(pageLoadTime > 0 || totalCallCount >= 250){
					MUJSRequire.documentComplete = true;
					MUJS['Events']['fire']('onPageReady');
				}
			} else if(totalCallCount >= 250){
				MUJSRequire.documentComplete = true;
				MUJS['Events']['fire']('onPageReady');
			}
		}
		if(MUJSRequire.documentComplete &&
			MUJSRequire.onErrorFunctionAdded &&
			MUJSRequire.notificationsInitialized &&
			MUJSRequire.modalInitialized
		){
			MUJSRequire.Complete = true;
			clearCheckTimer();
			if({{{DEBUG}}}) MUJS.Debug('Init Complete - ' + totalCallCount + ' trys');
			console.timeEnd('MUJS API Finish Init');
		}

	}
	totalCallCount++;
}

// Before Script Exec Event
function BeforeScriptExec(e){
	MUJS.Events.fire.apply(MUJS.Events, ['beforescriptexecute'].concat(Array.prototype.slice.call(arguments)));
}
window.addEventListener('beforescriptexecute', BeforeScriptExec, false);

// After Script Exec Event
function AfterScriptExec(e){
	MUJS.Events.fire.apply(MUJS.Events, ['afterscriptexecute'].concat(Array.prototype.slice.call(arguments)));
}
window.addEventListener('afterscriptexecute', AfterScriptExec, false);

// Load Event
function onLoadEvent(e){
	if({{{DEBUG}}}) MUJS.Debug('onLoadEvent', e);
	MUJS.Events.fire.apply(MUJS.Events, ['load'].concat(Array.prototype.slice.call(arguments)));
}
window.addEventListener('load', onLoadEvent, false);

// On ReadyState Change Event
document.onreadystatechange = function (e) {
	if({{{DEBUG}}}) MUJS.Debug('onreadystatechange', document.readyState, e);
	if(!MUJSRequire.Complete)
		tryInit();
	MUJS.Events.fire.apply(MUJS.Events, ['onreadystatechange'].concat(Array.prototype.slice.call(arguments)));
}

// DOM Content Loaded Event
window.addEventListener('DOMContentLoaded', function(e){
	if({{{DEBUG}}}) MUJS.Debug('DOMContentLoaded', e);
	if(!MUJSRequire.Complete)
		tryInit();
	MUJS.Events.fire.apply(MUJS.Events, ['DOMContentLoaded'].concat(Array.prototype.slice.call(arguments)));
}, false);

function checkTimer(){
	if(!MUJSRequire.Complete)
		tryInit();
	else
		clearCheckTimer();
}

function clearCheckTimer(){
	clearInterval(checkTimer);
}

setInterval(checkTimer, 50);
