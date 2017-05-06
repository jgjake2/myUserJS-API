// +@display_name  Element Resize Listener

+(function(){

	function resetTriggers(element){
		var triggers = element.__resizeTriggers__,
			expand = triggers.firstElementChild,
			contract = triggers.lastElementChild,
			expandChild = expand.firstElementChild;
			contract.scrollLeft = contract.scrollWidth;
			contract.scrollTop = contract.scrollHeight;
			expandChild.style.width = expand.offsetWidth + 1 + 'px';
			expandChild.style.height = expand.offsetHeight + 1 + 'px';
			expand.scrollLeft = expand.scrollWidth;
			expand.scrollTop = expand.scrollHeight;
	};
	

	function checkTriggers(element){
		return element.offsetWidth != element.__resizeLast__.width ||
		element.offsetHeight != element.__resizeLast__.height;
	}

	function scrollListener(e){
		var element = this;
		resetTriggers(this);
		//if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
		if (this.__resizeRAF__) jMod.Element.cancelAnimationFrame(this.__resizeRAF__);
		//this.__resizeRAF__ = requestFrame(function(){
		this.__resizeRAF__ = jMod.Element.requestAnimationFrame(function(){
			if (checkTriggers(element)) {
				element.__resizeLast__.width = element.offsetWidth;
				element.__resizeLast__.height = element.offsetHeight;
				element.__resizeListeners__.forEach(function(fn){
					fn.call(element, e);
				});
			}
		});
	};
	
	jMod.Element.addResizeListener = function(el, fn){
		if (el.attachEvent) el.attachEvent('onresize', fn);
		else {
			if (!el.__resizeTriggers__) {
				if((window || unsafeWindow).getComputedStyle(el, null).position == 'static') el.style.position = 'relative';
				//createStyles();
				el.__resizeLast__ = {};
				el.__resizeListeners__ = [];
				(el.__resizeTriggers__ = (jMod.Element.document).createElement('div')).className = 'resize-triggers';
				el.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' +
					'<div class="contract-trigger"></div>';
				el.appendChild(el.__resizeTriggers__);
				resetTriggers(el);
				el.addEventListener('scroll', scrollListener, true);
				
				/* Listen for a css animation to detect element display/re-attach */
				el.__resizeTriggers__.addEventListener('animationstart', function(e) {
					if(e.animationName == 'resizeanim')
						resetTriggers(el);
				});
			}
			el.__resizeListeners__.push(fn);
		}
	}
	
	

})();

jMod.CSS = <><![CDATACSS[

@-webkit-keyframes resizeanim { 0% { opacity: 0; } 100% { opacity: 0; } }
@keyframes resizeanim { 0% { opacity: 0; } 100% { opacity: 0; } }

.jmod-na .resize-triggers {
	-webkit-animation: 1ms resizeanim;
	animation: 1ms resizeanim;
	visibility: hidden;
	opacity: 0;
}

.jmod-na .resize-triggers, .jmod-na .resize-triggers > div, .jmod-na .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; }
.jmod-na .resize-triggers > div { background: #eee; overflow: auto; }
.jmod-na .contract-trigger:before { width: 200%; height: 200%; }

]]></>;