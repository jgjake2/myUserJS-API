// +@display_name  Initialize
// +@history (0.0.14) History begins.
// +@history (0.0.15) Speed improvements.
// +@history (0.0.17) Logging improvements.
// +@history (0.0.19) Major speed improvements for CSS injection

+function(){

const maxCallCount = 200;

var pageLoadTime,
	totalCallCount = 0,
	doc = jMod.Element.document,
InitHandlers = {
	addCSS: function(){
		if(!Loading.CSSAdded){
			Loading.CSSAdded = true;
			jMod.AddCSS();
		}
	},
	
	
	headAvailable: function(){
		Loading.headAvailable = true;
		InitHandlers.addCSS();
		if(jMod.debug)
			jMod.API.contentEval(onErrorFunction); // Debug only: Still working on error detection
	},
	
	DOMLoaded: function(){
		Loading.DOMLoaded = true;
		if(jMod.debug) jModLogTime('DOM Loaded', null, ' - Begin Init');
		if(!Loading.headAvailable)
			InitHandlers.headAvailable();
		jMod.Events.fire('onDOMReady');
		jMod.Notification.init();
		jMod.Modal.init();
		jMod.Settings.init();
		Loading.jModReady = true;
		//unsafeWindow.postMessage('onReady', "*");
		//setTimeout(function(){
			if(jMod.debug) jModLogTime('jModReady' + (_undefined!=typeof window.mozPaintCount ? (' (Mozilla Paint Count: '+window.mozPaintCount+')') : ''));
			jMod.Events.fire('onReady');
		//},0);
		if(performance.available)
			jModReady = performance.now;
	},
	
	documentComplete: function(){
		Loading.documentComplete = true;
		if(jMod.debug) {
			jModLogTime('onPageReady' + (_undefined!=typeof window.mozPaintCount ? (' (Mozilla Paint Count: '+window.mozPaintCount+')') : ''));
			console.groupEnd('jMod Start');
		}
		jMod.Events.fire('onPageReady');
	},
	
	performanceReady: function(){
		Loading.performanceReady = true;
		if(jMod.debug) jModLogTime('onPerformanceReady');
		jMod.Events.fire('onPerformanceReady');
	}
};


function tryInit(e){
	// Some versions of FF have a head at "document-start" (before DOM exists) and some do not
	// speed up init for versions that do by adding css as soon as possible
	if(!Loading.headAvailable){
		if(jMod.Element.head){
			InitHandlers.headAvailable();
		}
	}

	if(!Loading.DOMLoaded){
		if(['interactive', 'complete'].indexOf(doc.readyState.toLowerCase()) != -1){
			InitHandlers.DOMLoaded();
		}
	}
	
	if(Loading.DOMLoaded){
		if(!Loading.documentComplete && doc.readyState == "complete"){
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
			if(jMod.debug) jModLogTime('jMod Finish Init' + (_undefined!=typeof window.mozPaintCount ? (' (Mozilla Paint Count: '+window.mozPaintCount+')') : ''));
			return;
		}
	}
	
	if(totalCallCount++ > maxCallCount){
		Loading.Complete = true;
		clearInterval(checkTimer);
		
		if(!Loading.DOMLoaded)
			InitHandlers.DOMLoaded();

		if(!Loading.documentComplete)
			InitHandlers.documentComplete();
		
		if(!Loading.performanceReady)
			InitHandlers.performanceReady();
			
		if(jMod.debug){
			jModLogTime('jMod Finish Init (timeout)' + (_undefined!=typeof window.mozPaintCount ? (' (Mozilla Paint Count: '+window.mozPaintCount+')') : ''));
		}
		return;
	}
	if(jMod.debug) jMod.log.count('Try Init');
}

function checkTimer(){
	if(!Loading.Complete)
		tryInit('checkTimer');
	else
		clearInterval(checkTimer);
}

function onDOMContentLoaded(e){
	if(!Loading.Complete)
		tryInit('DOMContentLoaded');
	//if(document.readyState == "complete")
	doc.removeEventListener("DOMContentLoaded", onDOMContentLoaded, false);
	jMod.Events.fire.apply(jMod.Events, ['DOMContentLoaded', {_this: this, args: arguments}]);
	if(jMod.debug) jMod.Debug('DOMContentLoaded', e);
}
// DOM Content Loaded Event
doc.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);

// On ReadyState Change Event
doc.onreadystatechange = function (e) {
	if(!Loading.Complete)
		tryInit('onreadystatechange');
	jMod.Events.fire.apply(jMod.Events, ['onreadystatechange', {_this: this, args: arguments}]);
	if(jMod.debug) jMod.Debug('onreadystatechange %c%s%c %o', jMod.log.fmt.stchange, doc.readyState, ' ', e);
}

// Load Event
function onLoadEvent(e){
	window.removeEventListener("load", onLoadEvent, false);
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

// Start Init process
tryInit();
setInterval(checkTimer, 25);

}();
