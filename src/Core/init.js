// +@display_name  Initialize
// +@history (0.0.14) History begins.
// +@history (0.0.15) Speed improvements.

/*
try{
	foobar();
}catch(e){
	jModError(e, 'jMod.init', 'I have a message');
	//jModError(undefined, 'jMod.init', 'I have a message', jMod);
}

jModInfo('jMod.init', jMod.timeElapsed.toFixed(2) + 'ms');

jModLogTime('jMod.init');
*/





+function(){

if(typeof GM_info !== _undefined && !ScriptInfo.InfoSet){
	jMod.log.Debug('GM_info', GM_info);
	jMod({
		'GM_info': GM_info,
		'has_GM_info': (typeof GM_info !== _undefined ? true : false),
		'has_GM_getMetadata': (typeof GM_getMetadata !== _undefined ? true : false)
	});
}

var pageLoadTime;
var totalCallCount = 0;
const maxCallCount = 200;

var InitHandlers = {
	DOMLoaded: function(){
		Loading.DOMLoaded = true;
		//if(jMod.debug) jMod.Debug('DOM Loaded: %c'+jMod.log.fmt.timePatt+'%c - Begin Init', jMod.log.fmt.time, jMod.timeElapsed, ' ');
		if(jMod.debug) jModLogTime('DOM Loaded', null, ' - Begin Init');
		jMod.Events.fire('onDOMReady');
		//jMod.API.contentEval(onErrorFunction);
		Loading.CSSAdded = true;
		jMod.AddCSS();
		jMod.Notification.init();
		jMod.Modal.init();
		jMod.Settings.init();
		Loading.jModReady = true;
		//unsafeWindow.postMessage('onReady', "*");
		setTimeout(function(){
			if(jMod.debug) jModLogTime('jModReady');
			jMod.Events.fire('onReady');
		},0);
		if(performance.available)
			jModReady = performance.now;
	},
	
	documentComplete: function(){
		Loading.documentComplete = true;
		if(jMod.debug) {
			jModLogTime('onPageReady');
			console.groupEnd('jMod Start');
		}
		jMod.Events.fire('onPageReady');
	},
	
	performanceReady: function(){
		Loading.performanceReady = true;
		if(jMod.debug) jModLogTime('onPerformanceReady');
		jMod.Events.fire('onPerformanceReady');
	}
}


function tryInit(e){
	if(!Loading.DOMLoaded){
		if(['interactive', 'complete'].indexOf(document.readyState.toLowerCase()) != -1){
			InitHandlers.DOMLoaded();
		}
	}
	
	if(Loading.DOMLoaded){
		if(!Loading.documentComplete && document.readyState == "complete"){
			InitHandlers.documentComplete();
		}
		
		if(!Loading.performanceReady){
			pageLoadTime = performance.pageLoadTime();
			if((!isNaN(pageLoadTime) && pageLoadTime > 0) || !performance.available){
				InitHandlers.performanceReady();
			}
		}
		
		if(Loading.performanceReady && Loading.documentComplete){
			Loading.Complete = true;
			clearInterval(checkTimer);
			if(jMod.debug) jModLogTime('jMod Finish Init');
			return;
		}
	}
	
	if(totalCallCount > maxCallCount){
		Loading.Complete = true;
		clearInterval(checkTimer);
		
		if(!Loading.DOMLoaded)
			InitHandlers.DOMLoaded();

		if(!Loading.documentComplete)
			InitHandlers.documentComplete();
		
		if(!Loading.performanceReady)
			InitHandlers.performanceReady();
		return;
	}
	totalCallCount++;
	if(jMod.debug) jMod.log.count('Try Init');
}

function checkTimer(){
	if(!Loading.Complete)
		tryInit('checkTimer');
	else
		clearInterval(checkTimer);
}

setInterval(checkTimer, 40);

// DOM Content Loaded Event
window.addEventListener('DOMContentLoaded', function(e){
	if(!Loading.Complete)
		tryInit('DOMContentLoaded');
	jMod.Events.fire.apply(jMod.Events, ['DOMContentLoaded', {_this: this, args: arguments}]);
	if(jMod.debug) jMod.Debug('DOMContentLoaded', e);
}, false);

// On ReadyState Change Event
document.onreadystatechange = function (e) {
	if(!Loading.Complete)
		tryInit('onreadystatechange');
	jMod.Events.fire.apply(jMod.Events, ['onreadystatechange', {_this: this, args: arguments}]);
	if(jMod.debug) jMod.Debug('onreadystatechange %c%s%c %o', jMod.log.fmt.stchange, document.readyState, ' ', e);
}

// Load Event
function onLoadEvent(e){
	jMod.Events.fire.apply(jMod.Events, ['load', {_this: this, args: arguments}]);
	if(jMod.debug) jMod.Debug('onLoadEvent', e);
}
window.addEventListener('load', onLoadEvent, false);

// Before Script Exec Event
function BeforeScriptExec(e){
	jMod.Events.fire.apply(jMod.Events, ['beforescriptexecute', {_this: this, args: arguments}]);
}
window.addEventListener('beforescriptexecute', BeforeScriptExec, false);

// After Script Exec Event
function AfterScriptExec(e){
	jMod.Events.fire.apply(jMod.Events, ['afterscriptexecute', {_this: this, args: arguments}]);
}
window.addEventListener('afterscriptexecute', AfterScriptExec, false);

tryInit();

}();
