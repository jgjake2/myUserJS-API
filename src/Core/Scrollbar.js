// +@display_name  Scrollbar


// Based on http://enscrollplugin.com/
+(function(){
	
	jMod.Scrollbar = function(el, data){
		jMod.Scrollbar.addScrollBar(el, data);
	}
	
	jMod.Scrollbar.addScrollBar = function(el, data){
		if(!isElement(el))
			return;
			
		var newScrollBar = {
			type: 'div',
			className: 'jModScrollBar',
			style: {
				position: 'absolute',
				//zIndex: '1',
				margin: '0px',
				padding: '0px',
				//opacity: '0',
				display: 'block',
				top: '0px'
			},
			innerHTML: {
				type: 'div',
				className: 'enscroll-track track3',
				style: {
					position: 'relative'
				},
				innerHTML: {
					type: 'div',
					className: 'handle3',
					style: {
						position: 'absolute'
					},
					innerHTML: [
						{
							type: 'div',
							className: 'top',
						},
						{
							type: 'div',
							className: 'bottom',
						}
					],
					attributes: {
						href: ''
					}
				}
			}
		};
		
		var newScrollBarEl = createNewElement(newScrollBar);
		
		//jMod.Scrollbar.addResizeListener(el, function(){
		jMod.Element.addResizeListener(el, function(){
			console.log('Element Resized');
			jMod.Scrollbar.resizeScrollBar(this);
		});
		
		appendChild(el, newScrollBarEl);
		jMod.Scrollbar.resizeScrollBar(el);
		
		var _onWheelFn = function(e){
			//jMod.Scrollbar.handlers.target_onScroll(this);
			//console.log('mousewheel', this, e);
			jMod.Scrollbar.handlers.target_onScroll.call(this, e);
			//jMod.Scrollbar.resizeScrollBar.call(this, this, e);
		}
		
		//if (el.addEventListener) {
			// Firefox
		if ( 'onwheel' in el || 'WheelEvent' in window && navigator.userAgent.toLowerCase().indexOf( 'msie' ) >= 0 ) {
			addEventListener(el, "wheel", _onWheelFn, false);
		} else {
			// IE9, Chrome, Safari, Opera
			addEventListener(el, "mousewheel", _onWheelFn, false);
		}
			
		//}
		// IE 6/7/8
		//else el.attachEvent("onmousewheel", _onWheelFn);
		
		var trackEl = jMod.$('.enscroll-track', newScrollBarEl);
		var handleEl = jMod.$('.handle3', newScrollBarEl);
		
		var _mouseDownFn = function(e){
			console.log('mousedown', this, e);
			//jMod.Scrollbar.handlers.track_handle_onMouseDown.call(this, e);
			//startVerticalDrag.call(this, e);
			startDragging(e, this);
		};
		setDraggableListeners(handleEl);
		handleEl.whenDragging(function(args){
			console.log('whenDragging args', args, this);
			//var trackEl = findParentWithClass(args.el, 'enscroll-track');
			var scrollbarEl = findParentWithClass(args.el, 'jModScrollBar');
			var target = scrollbarEl.parentElement;
			
			
			
		});
		addEventListener(handleEl, "mousedown", _mouseDownFn, false);
		
		addEventListener(handleEl, "touchstart", function(e){
			console.log('touchstart', e);
		}, false);
		
		el.onscroll = function(e){
			if(!hasClass(trackEl, 'dragging'))
				jMod.Scrollbar.resizeScrollBar(this);
		}
	}
	
	var currentElement;
	var fairlyHighZIndex = '10';
	
	function inPixels(value) {
		return value + 'px';
	}
	
	function addListener(element, type) {
		return function(listener) {
			element.draggableListeners[type].push(listener);
		};
	}
	
	function getInitialPosition(element) {
		//var boundingClientRect = element.getBoundingClientRect();
		return {
			//top: boundingClientRect.top,
			//left: boundingClientRect.left
			top: parseInt(element.offsetTop),
			left: parseInt(element.offsetLeft)
		};
	}
	
	function setDraggableListeners(element) {
		element.draggableListeners = {
			start: [],
			drag: [],
			stop: []
		};
		element.whenDragStarts = addListener(element, 'start');
		element.whenDragging = addListener(element, 'drag');
		element.whenDragStops = addListener(element, 'stop');
	}

	function startDragging(event, element) {
		//currentElement && sendToBack(currentElement);
		//currentElement = bringToFront(element);
		currentElement = element;
		
		//addClass(currentElement, 'dragging');
		var trackEl = findParentWithClass(currentElement, 'enscroll-track');
		if(trackEl){
			addClass(trackEl, 'dragging');
		}

		var initialPosition = getInitialPosition(currentElement);
		//currentElement.style.left = inPixels(initialPosition.left);
		currentElement.style.top = inPixels(initialPosition.top);
		currentElement.lastXPosition = event.clientX;
		currentElement.lastYPosition = event.clientY;

		var okToGoOn = triggerEvent('start', { x: initialPosition.left, y: initialPosition.top, el: currentElement, mouseEvent: event });
		if (!okToGoOn) return;

		addDocumentListeners();
	}
	
	function triggerEvent(type, args) {
		var result = true;
		var listeners = currentElement.draggableListeners[type];
		for (var i = listeners.length - 1; i >= 0; i--) {
		  if (listeners[i](args) === false) result = false;
		};
		return result;
	}
	
	function addDocumentListeners() {
		var doc = jMod.Element.document;
		addEventListener(doc,'selectstart', cancelDocumentSelection);
		addEventListener(doc,'mousemove', repositionElement);
		addEventListener(doc,'mouseup', removeDocumentListeners);
	}
	
	function removeDocumentListeners(event) {
		var doc = jMod.Element.document;
		removeEventListener(doc,'selectstart',cancelDocumentSelection);
		removeEventListener(doc,'mousemove',repositionElement);
		removeEventListener(doc,'mouseup',removeDocumentListeners);

		var left = parseInt(currentElement.style.left, 10);
		var top = parseInt(currentElement.style.top, 10);
		var trackEl = findParentWithClass(currentElement, 'enscroll-track');
		if(trackEl){
			removeClass(trackEl, 'dragging');
		}
		triggerEvent('stop', { x: left, y: top, el: currentElement, mouseEvent: event });
	}
	
	function cancelDocumentSelection(event) {
		event.preventDefault && event.preventDefault();
		event.stopPropagation && event.stopPropagation();
		event.returnValue = false;
		eventCancel(event);
		return false;
	}
	
	function repositionElement(event) {
		event.preventDefault && event.preventDefault();
		event.returnValue = false;
		var style = currentElement.style;
		var elementXPosition = parseInt(style.left, 10);
		var elementYPosition = parseInt(style.top, 10);

		var elementNewXPosition = elementXPosition + (event.clientX - currentElement.lastXPosition);
		var elementNewYPosition = elementYPosition + (event.clientY - currentElement.lastYPosition);
		
		var scrollBarEl = findParentWithClass(currentElement, 'jModScrollBar');
		
		if(scrollBarEl){
			var parentEl = scrollBarEl.parentElement;
			var computedEl = window.getComputedStyle(parentEl),
				height = parseFloat(computedEl.height),
				width = parseFloat(computedEl.width);
				
			var computedCurrentEl = window.getComputedStyle(currentElement),
				cheight = parseFloat(computedCurrentEl.height),
				cwidth = parseFloat(computedCurrentEl.width);
				
			var scrollMax = parseFloat(parentEl.scrollHeight) - height;
			
			
			if(parseInt(elementNewYPosition) + cheight > height){
				elementNewYPosition = height - cheight;
			} else if(parseInt(elementNewYPosition) < 0){
				elementNewYPosition = 0;
			}
		}

		//style.left = inPixels(elementNewXPosition);
		style.top = inPixels(elementNewYPosition);

		currentElement.lastXPosition = event.clientX;
		currentElement.lastYPosition = event.clientY;
		
		try{
			document.selection.empty();
		}catch(e){}
		
		try{
			window.getSelection().removeAllRanges();
		}catch(e){}
		


		triggerEvent('drag', { x: elementNewXPosition, y: elementNewYPosition, el: currentElement, mouseEvent: event });
	}
	
	jMod.Scrollbar.resizeScrollBar = function(el){
		var scrollBar = jMod.$('.jModScrollBar');
		if(scrollBar){
			var track = jMod.$('.enscroll-track', scrollBar);
			var handle = jMod.$('.handle3', scrollBar);
			
			var computedEl = (window || unsafeWindow).getComputedStyle(el, null),
				height = parseFloat(computedEl.height),
				width = parseFloat(computedEl.width),
				scrollHeight = parseFloat(el.scrollHeight),
				scrollWidth = parseFloat(el.scrollWidth),
				scrollTop = parseFloat(el.scrollTop),
				scrollLeft = parseFloat(el.scrollLeft),
				handleHeight = 0.0, handleTop = 0.0;
				
			scrollBar.style.left = parseInt(width - 10) + 'px';
			track.style.height = parseInt(height) + 'px';
			
			handleHeight = (height / scrollHeight) * height;
			handleTop = ((height / scrollHeight) * scrollTop);// + (handleHeight / 2);
			
			if(handleTop < 0)
				handleTop = 0;
			
			handleTop += scrollTop;
			
			handle.style.height = handleHeight + 'px';
			handle.style.top = handleTop + 'px';
			
			//console.log('resize scrollbar complete');
		}
	}
	
	function preventDefault( event ) {
		if ( event.preventDefault ) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}

		if ( event.stopPropagation ) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
	
	var reqAnimFrame = window.requestAnimationFrame ? 'requestAnimationFrame' :
			window.mozRequestAnimationFrame ? 'mozRequestAnimationFrame' :
			window.webkitRequestAnimationFrame ? 'webkitRequestAnimationFrame' :
			window.oRequestAnimationFrame ? 'oRequestAnimationFrame' : 
			window.msRequestAnimationFrame ? 'msRequestAnimationFrame' :
			function( f ) { setTimeout( f, 17 ); };
			
	var PI_OVER_2 = 0.5 * Math.PI,
		TEN_LOG2 = 10 * Math.log( 2 );
			
	var easeOutSin = function( c, d, t ) {
		var b = PI_OVER_2 / d,
			a = c * b;

		return Math.round( a * Math.cos( b * t ));
	}

	var easeOutExpo = function( c, d, t ) {
		return Math.round( c * TEN_LOG2 * Math.pow( 2, -10 * t / d + 1 ) / d );
	}

	var timeFromPosition = function( b, c, d, x ) {
		return 2 * d / Math.PI * Math.asin(( x - b ) / c );
	}
	
	var scrollVertical = function( el, dy ) {
		//var $pane = $( pane ),
			//data = $pane.dataset( 'enscroll' ),
			//var y0 = el.scrollTop;
			el.scrollTop = parseInt(el.scrollTop) + parseInt(dy);
		//if ( data && data.settings.verticalScrolling ) {
			//$pane.scrollTop( y0 + dy );
			//if ( data.settings.showOnHover ) {
				//showScrollbars.call( pane );
			//}
		//}
	}
	
	function scrollAnimate(el){
		//console.log('scrollAnimate', el);
		var dataset = el.dataset;
		var duration = dataset._duration || parseInt( 300 / 16.66666, 10 );
		if ( el.dataset._scrollingY === true || el.dataset._scrollingY === "true" ) {
			//console.log('scrollAnimate animate Y');
			var remaining = parseInt(dataset._endY) - parseInt(dataset._startY);
			if(remaining === 0){
				el.dataset._scrollingY = false;
			} else {
				var curPos = el.scrollTop;
				var time = timeFromPosition( parseInt(dataset._startY), remaining, duration, curPos );
				
				if ( remaining > 0 ) {
					if ( curPos >= parseInt(dataset._endY) || curPos < parseInt(dataset._startY) ) {
						el.dataset._scrollingY = false;
					} else {
						scrollVertical( el, Math.max( 1, easeOutSin( remaining, duration, time )));
							if(typeof reqAnimFrame === "function"){
								reqAnimFrame(function() {
									scrollAnimate( el );
								});
							} else {
								window[reqAnimFrame](function() {
									scrollAnimate( el );
								});
							}
					}
				} else {
					if ( curPos <= parseInt(dataset._endY) || curPos > parseInt(dataset._startY) ) {
						el.dataset._scrollingY = false;
					} else {
						scrollVertical( el, Math.min( -1, easeOutSin( remaining, duration, time )));
						if(typeof reqAnimFrame === "function"){
							reqAnimFrame(function() {
								scrollAnimate( el );
							});
						} else {
							window[reqAnimFrame](function() {
								scrollAnimate( el );
							});
						}
					}
				}
				
				
			}
		}
	}
	
	function animateVertical(el, delta){
		var curPos = parseInt(el.scrollTop);
		var computedEl = window.getComputedStyle(el),
			height = parseFloat(computedEl.height),
			width = parseFloat(computedEl.width);
		var scrollMax = parseFloat(el.scrollHeight) - height;
		//if(scrollMax < 0)
			//scrollMax = 0;
			
		if(!el.dataset._scrollingY || el.dataset._scrollingY == "false"){
			el.dataset._scrollingY = true;
			el.dataset._startY = curPos;
			el.dataset._endY = el.dataset._startY;
			//if(reqAnimFrame){
				if(typeof reqAnimFrame === "function"){
					reqAnimFrame(function() {
						scrollAnimate( el );
					});
				} else {
					window[reqAnimFrame](function() {
						scrollAnimate( el );
					});
				}
			//}
		}
		
		var remaining = parseInt(el.dataset._endY) - parseInt(el.dataset._startY);
		
		//if((remaining > 0 && delta > 0) || (remaining < 0 && delta < 0)){
			//el.dataset._endY = delta > 0 ? Math.min( curPos + delta, scrollMax ) : Math.max( 0, curPos + delta );
		if((remaining > 0 && delta < 0) || (remaining < 0 && delta > 0)){
			el.dataset._startY = curPos;
			el.dataset._endY = el.dataset._startY;
			//el.dataset._endY = delta > 0 ? Math.min( curPos + delta, scrollMax ) : Math.max( 0, curPos + delta );
		} else {
			el.dataset._endY = delta > 0 ? Math.min( curPos + delta + parseInt(remaining * 2 / 3), scrollMax ) : Math.max( 0, curPos + delta + parseInt(remaining * 2 / 3) );
		}
		//el.dataset._endY = delta > 0 ? Math.min( curPos + delta, scrollMax ) : Math.max( 0, curPos + delta );

		return delta < 0 && curPos > 0 || delta > 0 && curPos < scrollMax;
	}
	
	
	function startVerticalDrag(e){
		if(event.which !== 1){
			return;
		}
		var handleEl = this,
			trackEl = findParentWithClass(this, 'enscroll-track');
		if(trackEl){
			addClass(trackEl, 'dragging');
		}
	}
	
	jMod.Scrollbar.handlers = {
		target_onScroll: function(event){
			//var $pane = $( this ),
			//console.log('ComputedStyle this', this);
			/*
			var computedEl = window.getComputedStyle(this),
				height = parseFloat(computedEl.height),
				width = parseFloat(computedEl.width);
			*/
			var _this = this;
				//data = $pane.data( 'enscroll' ),
				//scrollIncrement = data.settings.scrollIncrement,
				var scrollIncrement = 10;
				
				var deltaX = 'deltaX' in event ? -event.deltaX :
					'wheelDeltaX' in event ? event.wheelDeltaX :
					0,
				deltaY = 'deltaY' in event ? -event.deltaY :
					'wheelDeltaY' in event ? event.wheelDeltaY :
					'wheelDelta' in event ? event.wheelDelta :
					//'detail' in event ? event.detail :
					0,
				delta;


				
			if ( Math.abs( deltaX ) > Math.abs( deltaY )) {
				delta = ( deltaX > 0 ? -scrollIncrement : scrollIncrement ) << 2;
				//if ( scrollAnimateHorizontal( $pane, delta ) || !data.settings.propagateWheelEvent ) {
					//preventDefault( event );
				//}
			} else {
				//delta = ( deltaY > 0 ? -1 * scrollIncrement : scrollIncrement ) << 2;
				delta = ( deltaY > 0 ? -1 * scrollIncrement : scrollIncrement ) << 2;
				/*
				var curPos = parseFloat(_this.scrollTop);
				var scrollMax = parseFloat(_this.scrollHeight) - height;
				if(scrollMax < 0)
					scrollMax = 0;
				*/
				/*
				_this.scrollTop = parseInt(Math.min(curPos + parseFloat(delta), scrollMax));
				console.log('deltaY', deltaY);
				console.log('curPos', curPos);
				console.log('scrollMax', scrollMax);
				console.log('_this.scrollTop', _this.scrollTop);
				*/
				if(animateVertical(this, delta)){
					preventDefault( event );
				}
				//if ( scrollAnimateVertical( $pane, delta ) || !data.settings.propagateWheelEvent ) {
					//preventDefault( event );
				//}
			}
			
			//console.log('delta', delta);
		},
		target_onResize: function(){
		
		},
		
		// Track
		track_onMouseDown: function(){
		
		},
		track_onMouseUp: function(){
		
		},
		
		// Track Handle
		track_handle_onMouseDown: function(e){
			var handleEl = this,
				trackEl = findParentWithClass(this, 'enscroll-track');
			if(trackEl){
				addClass(trackEl, 'dragging');
			}
		},
		track_handle_onMouseUp: function(e){
			var handleEl = this,
				trackEl = findParentWithClass(this, 'enscroll-track');
			if(trackEl){
				removeClass(trackEl, 'dragging');
			}
		},
		/*
		track_handle_onMouseMove: function(e){
			var handleEl = this,
				trackEl = findParentWithClass(this, 'enscroll-track');
			if(trackEl && hasClass(trackEl, 'dragging')){
				console.log('Mouse moved while dragging');
			}
		}
		*/
	};

})();





jMod.CSS = <><![CDATACSS[
/*
.jmod-na .modal-body {
	overflow-y: hidden !important;
}
*/
.jmod-na .track3 {
	width: 10px;
	background: rgba(0, 0, 0, 0);
	margin-right: 0px;
	/*border-radius: 10px;*/
	-webkit-transition: background 250ms linear;
	transition: background 250ms linear;
}

.jmod-na .track3:hover,
.jmod-na .track3.dragging {
	background: #d9d9d9; /* Browsers without rgba support */
	background: rgba(0, 0, 0, 0.15);
}

.jmod-na .handle3 {
	width: 7px;
	right: 0;
	background: #999;
	background: rgba(0, 0, 0, 0.4);
	/*border-radius: 7px;*/
	-webkit-transition: width 250ms;
	transition: width 250ms;
	cursor: pointer;
}

.jmod-na .track3:hover .handle3,
.jmod-na .track3.dragging .handle3 {
	width: 10px;
}

]]></>;