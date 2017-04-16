// +@display_name  Modal
// +@history (0.0.14) History begins.
// +@history (0.0.15) Removed ref to jMod.fn (__proto__ is depreciated).
// +@history (0.0.15) Created a backdrop for each Modal instead of one for all modals.

/**
 * Modal Configuration Options
 * @name Modal
 * @alias Modal
 * @memberof jMod.Config
 * @property {boolean} enabled is enabled
 * @example
 * // Get the current value of Modal.enabled
 * jMod('get', 'Modal.enabled')
 * // or
 * jMod.Config('Modal.enabled');
 * // or
 * jMod.Config.Modal.enabled;
 */
/*
jMod.Config.Modal = {
	enabled: true
}
*/
jMod.Config.Modal = jMod.extend({
		enabled: true,
		cn: {
			container: 'jModModalContainer'
		},
		id: {
			container: 'jModModalContainer'
		}
	}, jMod.Config.Modal || {});
var Modal_ContainerElementClass_Key = 'Modal.cn.container';
var Modal_ContainerElementId_Key = 'Modal.id.container';
/**
 * @namespace jMod.Modal
 * @memberOf jMod
 * @since 0.0.14
 */
 
/**
 * @function Modal
 * @memberof jMod
 * @variation 2
 * @param {(string|object)} data - (string) Command to execute | (object) options for new modal to display
 * @param {(object|boolean)} [data2] - (object) Arguments for command | (boolean) show new modal immediately
 */
var Modal = jMod.Modal = function(data, data2){
	if(!jConfig('Modal.enabled'))
		return false;
	if(!jMod.Modal.Initialized){
		jMod.Modal.init();
	}
	try{
		if(typeof data === "string"){
			switch(data.toLowerCase()){
				case 'show':
				case 'showmodal':
					return jMod.Modal.show.apply(jMod.Modal, Slice.call(arguments, 1));
					break;
				case 'hide':
				case 'hidemodal':
					return jMod.Modal.hide.apply(jMod.Modal, Slice.call(arguments, 1));
					break;
				/*
				case 'get':
				case 'getelement':
					return jMod.Modal.getElement.apply(jMod.Modal, Slice.call(arguments, 1));
					break;
				case 'getid':
				case 'getelementid':
					return jMod.Modal.getElementId.apply(jMod.Modal, Slice.call(arguments, 1));
					break;
				*/
			}
		} else if(typeof data === "object") {
			var newModal = jMod.Modal.createModal(data);
			
			var modalNum = parseInt(getAttribute(newModal, 'data-jmod-modal'));
			
			var newModalBackdrop = createNewElement({
				type: 'div',
				id: 'jModModal-' + modalNum + '-backdrop',
				className: 'modal-backdrop fade',
				style: 'display: none;',
				attributes: {
					role: 'dialog',
					tabindex: '-1',
					'data-jmod-modal-backdrop': modalNum
				},
				EventListeners: {
					click: {
						capture: false,
						callback: function(e){
							if(e.target !== this)
								return;
							//this.style = 'display:none;';
							this.style.display = 'none';
							removeClass(document.body, 'jmod-modal-open');
							eventCancel(e);
							return false;
						}
					}
				}
			});
			
			var modalContainer = Modal.Container;
			
			if(modalContainer){
				modalContainer.appendChild(newModalBackdrop);
				modalContainer.appendChild(newModal);
			}
			
			jMod.Modal.Modals[modalNum] = {
				index: modalNum,
				element: newModal,
				lockScreen: data.lockScreen || true,
				data: data
			};
			
			if(typeof data.features !== _undefined){
				jMod.Modal.addJSFeatures(newModal, data.features);
			}
			
			if(data2 === true){
				// show right away
				jMod.Modal.show(newModal);
			}

			return newModal;
		}
	}catch(e){
		//console.log('error, jMod.Modal', e);
		jModLogError(e, 'jMod.Modal');
	}
}
var _ModalContainer;
Object.defineProperties(Modal, {
	fn: {value: Modal.__proto__},
	ModalCount: {
		value: 0,
		writable: true
	},
	CurrentModal: {
		value: -1,
		writable: true
	},
	Modals: {
		value: {},
		writable: true
	},
	Initialized: {
		value: false,
		writable: true
	},
	TooltipCount: {
		value: 0,
		writable: true
	},
	Container: {
		get: function(){
			if(_ModalContainer) return _ModalContainer;
			return (_ModalContainer = document.getElementById(jConfig(Modal_ContainerElementId_Key)));
		},
		set: function(value){
			_ModalContainer = value;
		}
	}
	//Modal.Container
});

const fadeAnimationLength = 150;

/**
 * Get a modal by its index
 * @function getModal
 * @memberof jMod.Modal
 * @param {number} number Index to search for
 * @returns {Element} DOM Element
 */
Modal.getModal = function(number){
	var modal = jMod.$('div[data-jmod-modal="'+number+'"]');
	if(modal)
		return modal;
	if(typeof Modal.Modals[number] !== _undefined)
		return Modal.Modals[number].element;
	return null;
}

Modal.addJSFeatures = function(modal, features){
	if(features.enableTabs){
		jMod.Tabs.load({
			target: modal,
			onBeforeShow: function(){
				console.log('Tabs onBeforeShow: ', arguments);
			}
		});
	}
	
	if(features.enableTooltips){
		Tooltip(modal);
	}
}

Modal.getVisibleModals = function(){
	var i = 0, r = [], modals = jMod.$$('div.modal.in[data-jmod-modal]', Modal.Container);
	for( ; i < modals.length; i++){
		r.push([modals[i], modals[i].getAttribute('data-jmod-modal')]);
	}
	return r;
}

Modal.getModal2 = function(){
	var i = 0,
		length = arguments.length,
		arg, modal, modalNum;
	if(length > 0){
		for( ; i < length; i++){
			arg = arguments[i];
			if(isElement(arg)){
				return arg;
			} else if(typeof arg == "string" || typeof arg == "number"){
				modalNum = parseInt(modalNum);
			}
		}
		
		if(modalNum != null){
			if((modal = jMod.$('div[data-jmod-modal="'+modalNum+'"]', Modal.Container)) && isElement(modal)){
				return modal;
			}
			
			if(typeof Modal.Modals[modalNum] != _undefined)
				return Modal.Modals[modalNum].element;
		}
	}
	return null;
}

var modalResizingAttrName = 'data-jmod-modal-resizing';

Modal.resize = function(){
	var	modalNum, evt, i, arg, viewportHeight,
		_dialog, _content, _body, _footer, _header, _modal,
		_dialogRect,
		length = arguments.length;
	
	for(i = 0; i < length; i++){
		arg = arguments[i];
		if(typeof arg == "number" || typeof arg == "string"){
			modalNum = parseInt(arg);
		} else if(isElement(arg)){
			_modal = arg;
		} else if(isEvent(arg)){
			evt = arg;
		}
	}
	
	if(_undefined==typeof _modal && _undefined==typeof modalNum){
		var modals = Modal.getVisibleModals();
		for(i = 0; i < modals.length; i++){
			Modal.resize(modals[i][0], modals[i][1], evt);
		}
		return;
	}
	
	if(!_modal)
		_modal = Modal.getModal2(_modal, modalNum);
	if(_modal && isElement(_modal)){
		if(getAttribute(_modal, modalResizingAttrName, 'boolean')){
			if(_modal.__resizeLast__ == null){
				return;
			}
			jMod.Element.cancelAnimationFrame(_modal.__resizeLast__);
			_modal.__resizeLast__ = null;
		}
		
		// Prevent resizing without canceling timer first
		_modal.setAttribute(modalResizingAttrName, 'true');
		
		viewportHeight = parseInt(jMod.Element.viewportSize.getHeight());
		
		_dialog = jMod.$('.modal-dialog', _modal);
		_dialogRect = jMod.Element.getClientRect(_dialog);
		
		if(parseInt(_dialogRect.bottom) <= viewportHeight && !_modal.hasVerticalScrollBar()){
			addClass(_modal, 'no-vertical-scroll');
		}
		
		try{
			if(Modal.Events.fire('onBeforeResize', modalNum, _modal, evt) === false){
				_modal.setAttribute(modalResizingAttrName, 'false');
				return;
			}
		}catch(e){
			jModLogError(e, 'jMod.Modal.resize', 'Error firing event "onBeforeResize"');
			return;
		}
		
		//if(modalNum == null && hasAttribute(_modal, 'data-jmod-modal')){
		if(modalNum == null){
			modalNum = getAttribute(_modal, 'data-jmod-modal', 'integer');
		}
		
		_modal.__resizeLast__ = jMod.Element.requestAnimationFrame(function(){
			// Prevent cancel attempt while running
			_modal.__resizeLast__ = null;
			_modal.__resizeLastStartY__ = 0;
			_modal.__resizeLastEndY__ = 0;
			_modal.__resizeLastCurrentY__ = null;
			_modal.__resizeLastCount__ = 0;
			
			// Only resize if modal is visible
			if(_modal.style.display != "none"){
				if(_modal.__restoreVerticalScroll__ != null){
					clearTimeout(_modal.__restoreVerticalScroll__);
					_modal.__restoreVerticalScroll__ = null;
				}
				
				viewportHeight = parseInt(jMod.Element.viewportSize.getHeight());
				
				//_dialog = jMod.$('.modal-dialog', _modal);
				_body   = jMod.$('.modal-body',   _dialog);
				_footer = jMod.$('.modal-footer', _dialog);
				_header = jMod.$('.modal-header', _dialog);
				
				
				var resizeAnimFunction
					_bodyCurrentHeight = parseInt(jMod.Element.getCompStyle(_body, 'height')),
					_bodyCurrentMaxHeight = parseInt(jMod.Element.getCompStyle(_body, 'maxHeight')),
					_bodyMinHeight = parseInt(jMod.Element.getCompStyle(_body, 'minHeight')),
					computedDialog = jMod.Element.getCompStyleObj(_dialog),
					marginTop = parseInt(computedDialog.getPropertyValue('margin-top')),
					marginBottom = parseInt(computedDialog.getPropertyValue('margin-bottom')),
					maxHeight = (viewportHeight - parseInt(_header.offsetHeight) - parseInt(_footer.offsetHeight) - marginTop - marginBottom) - 15;
					
				if(_bodyMinHeight > maxHeight){
					maxHeight = _bodyMinHeight;
				}
				
				if(_bodyCurrentMaxHeight != maxHeight){

					
					_modal.__resizeLastCurrentY__ = _bodyCurrentMaxHeight;
					_modal.__resizeLastStartY__ = _bodyCurrentMaxHeight;
					_modal.__resizeLastEndY__ = parseInt(maxHeight);
					
					
					resizeAnimFunction = function(){
						var tmpId = _modal.__resizeLast__;
						_modal.__resizeLastCount__++;
						
						if(_modal.__resizeLastCount__ > 50){
							_body.style.maxHeight = _modal.__resizeLastEndY__ + 'px';
							return;
						}
						
						var current = _modal.__resizeLastCurrentY__ != null && !isNaN(parseInt(_modal.__resizeLastCurrentY__)) ? _modal.__resizeLastCurrentY__ : parseInt(jMod.Element.getCompStyle(_body, 'maxHeight'));
						var duration = parseInt( 300 / 16.66666, 10 ) / 4;
						var remaining = _modal.__resizeLastEndY__ - current;
						
						var time = timeFromPosition( parseInt(_modal.__resizeLastStartY__), remaining, duration, current );
						if(isNaN(time))
							time = 0;
						else if(time < 0)
							time = time * -1;
						if(remaining != 0){
							var delta;
							
							if ( remaining > 0 ) {
								delta = Math.max( 1, easeOutSin( remaining, duration, time ));
							} else {
								delta = Math.min( -1, easeOutSin( remaining, duration, time ));
							}
							
							if(delta == 0 || isNaN(delta)){
								_body.style.maxHeight = _modal.__resizeLastEndY__ + 'px';
								return;
							}
							
							_modal.__resizeLastCurrentY__ = current + delta;
							
							
							_body.style.maxHeight = _modal.__resizeLastCurrentY__ + 'px';
							
							if(_modal.__resizeLast__ == null || _modal.__resizeLast__ == tmpId){
								if(_modal.__resizeLastCurrentY__ != _modal.__resizeLastEndY__ && _modal.__resizeLastCurrentY__ != null){
									_modal.__resizeLast__ = jMod.Element.requestAnimationFrame(resizeAnimFunction);
								} else {
									_modal.__resizeLast__ = null;
								}
								return;
							}
						}
					};
					//resizeAnimFunction();
					_modal.__resizeLast__ = jMod.Element.requestAnimationFrame(resizeAnimFunction);
					
					//_body.style.maxHeight = maxHeight + 'px';
				}
				
				_dialogRect = jMod.Element.getClientRect(_dialog);
				
				if(parseInt(_dialogRect.bottom) > viewportHeight && parseInt(_dialogRect.height) < (_bodyMinHeight + parseInt(_header.offsetHeight) + parseInt(_footer.offsetHeight) + 15)){
					removeClass(_modal, 'no-vertical-scroll');
				} else {
					_modal.__restoreVerticalScroll__ = setTimeout(function(_modal, modalResizingAttrName){
						_modal.__restoreVerticalScroll__ = null;
						//if(!getAttribute(_modal, modalResizingAttrName, 'boolean') || _modal.__resizeLast__ == null){
						if(!getAttribute(_modal, modalResizingAttrName, 'boolean')){
							removeClass(_modal, 'no-vertical-scroll');
						}
					}, 100, _modal, modalResizingAttrName);
				}
			}
			
			try{
				Modal.Events.fire('onAfterResize', modalNum, _modal, evt);
			}catch(e){
				jModLogError(e, 'jMod.Modal.resize', 'Error firing event "onAfterResize"');
			}
			
			// Release lock on resize events
			_modal.setAttribute(modalResizingAttrName, 'false');
		});
	}
}

Modal.show = function(modal, modalNum, e){
	try{
		//console.log('jMod.Modal.CurrentModal', jMod.Modal.CurrentModal);
		//var doc = jMod.Element.document;
		if(typeof modal === "number" && typeof modalNum !== "number"){
			if(typeof e === _undefined && typeof modalNum !== _undefined)
				e = modalNum;
			modalNum = modal;
		}
		if((typeof modal === _undefined || modal == null) && typeof modalNum === _undefined)
			return;
		if((typeof modal === _undefined || modal == null || typeof modal === "number") && typeof modalNum === "number"){
			modal = jMod.$('div[data-jmod-modal="'+modalNum+'"]');
		} else if(typeof modal !== _undefined && modal != null && typeof modalNum === _undefined){
			modalNum = getAttribute(modal, 'data-jmod-modal');
		}
		
		if(Modal.CurrentModal != -1 && Modal.CurrentModal != modalNum){
			Modal.hide();
		}
		
		if(modal){
			//var modalBackdrop = doc.querySelector('div[data-jmod-modal-backdrop="'+modalNum+'"]');
			var modalBackdrop = jMod.$('div[data-jmod-modal-backdrop="'+modalNum+'"]');
			//console.log('jMod.Modal.show', modal, modalNum, e || null);
			var r = Modal.Events.fire('onBeforeShow', modalNum, modal, [e || null]);
			Modal.CurrentModal = modalNum;
			addClass(jMod.Element.document.body, 'jmod-modal-open');
			modalBackdrop.style.display = 'block';
			modal.style.display = 'block';
			setTimeout(function(modal, modalBackdrop){
				addClass(modalBackdrop, 'in');
				addClass(modal, 'in');
				jMod.Element.requestAnimationFrame(function(){
					Modal.resize(modal);
				});
			}, 1, modal, modalBackdrop);
			setTimeout(function(modal, modalNum, e){
				Modal.Events.fire('onAfterShow', modalNum, modal, [e || null]);
			}, fadeAnimationLength, modal, modalNum, e || null);
			

		}
	}catch(e){
		//console.log('Error jMod.Modal.show', e);
		jModLogError(e, 'jMod.Modal.show');
	}
}

Modal.hide = function(modal, modalNum, e){
	try{
		if(typeof modal === _undefined && typeof modalNum === _undefined && Modal.CurrentModal != -1){
			modalNum = Modal.CurrentModal;
			modal = Modal.getModal(Modal.CurrentModal);
		}
		
		if(typeof modal === "number" && typeof modalNum !== "number"){
			if(typeof e === _undefined && typeof modalNum !== _undefined)
				e = modalNum;
			modalNum = modal;
		}
		if(typeof modal === _undefined && typeof modalNum === _undefined){
			return;
		}
		
		if(!isElement(modal) && typeof modalNum === "number"){
			modal = Modal.getModal(modalNum);
		} else if(typeof modal !== _undefined && typeof modalNum === _undefined){
			modalNum = getAttribute(modal, 'data-jmod-modal');
		}
		
		if(modal){
			//var modalBackdrop = jMod.Element.document.querySelector('div[data-jmod-modal-backdrop="'+modalNum+'"]');
			var modalBackdrop = jMod.$('div[data-jmod-modal-backdrop="'+modalNum+'"]');
			var r = Modal.Events.fire('onBeforeHide', modalNum, modal, [e || null]);
			Modal.CurrentModal = -1;
			removeClass(jMod.Element.document.body, 'jmod-modal-open');
			removeClasses(modal, ['in', 'no-vertical-scroll']);
			//no-vertical-scroll
			removeClass(modalBackdrop, 'in');
			setTimeout(function(modal, modalNum, e, modalBackdrop){
				modal.style.display = 'none';
				modalBackdrop.style.display = 'none';
				Modal.Events.fire('onAfterHide', modalNum, modal, [e || null]);
			}, fadeAnimationLength, modal, modalNum, e || null, modalBackdrop);
		}
	}catch(e){
		//console.log('Error jMod.Modal.hide', e);
		jModLogError(e, 'jMod.Modal.hide');
	}
}
var modalEventNames = ['onBeforeShow', 'onAfterShow', 'onBeforeHide', 'onAfterHide', 'onBeforeResize', 'onAfterResize'];
Modal.Events = new EventsClass(modalEventNames);

Modal.createModal = function(data){
	var newModalNum = Modal.ModalCount++;
	
	Modal.Events.addAll(data, newModalNum);
	
	var newModal = createNewElement({
		type: 'div',
		id: data.id || 'jModModal-'+newModalNum,
		className: 'modal fade ' + (data.className || data['class'] || ''),
		style: 'display: none;',
		attributes: {
			role: 'dialog',
			tabindex: '-1',
			'data-jmod-modal': newModalNum
		},
		EventListeners: {
			click: {
				capture: false,
				callback: function(e){
					if(e.target !== this)
						return;
					var modal = e.target;
					var modalNum = parseInt(getAttribute(modal, 'data-jmod-modal'));
					Modal.hide(modal, modalNum, e);
					eventCancel(e);
					return false;
				}
			}
		}
	});
	
	for(var i = 0; i < modalEventNames.length; i++){
		
		Object.defineProperty(newModal, modalEventNames[i], {
			get: (function(evtName, modalEl, modalNum){
					return function(){
						Modal.Events.getAll(modalNum, evtName);
					}.bind(modalEl);
				}).call(newModal, modalEventNames[i], newModal, newModalNum),
			set: (function(evtName, modalEl, modalNum){
					return function(newListener){
						Modal.Events.add(modalNum, evtName, newListener);
					}.bind(modalEl);
				}).call(newModal, modalEventNames[i], newModal, newModalNum),
			enumerable: true,
			configurable: false
		});
	}
	
	newModal.hasVerticalScrollBar = function(){
		var overflowY = jMod.Element.getCompStyle(this, "overflowY");
		if(this.offsetParent === null || overflowY == "hidden" || overflowY == "visible")
			return false;
		
		return (overflowY == "scroll" || this.scrollHeight > jMod.Element.viewportSize.getHeight());
	}.bind(newModal);
	
	// Dialog Container
	var newModalDialog = createNewElement({
		type: 'div',
		className: 'modal-dialog',
	});
	if(typeof data.style !== _undefined){
		for(var styleName in data.style){
			newModalDialog.style[styleName] = data.style[styleName];
		}
	}
	
	newModal.appendChild(newModalDialog);
	
	// Content Container
	var newModalContent = createNewElement({
		type: 'div',
		className: 'modal-content',
	});
	newModalDialog.appendChild(newModalContent);
	
	// Header
	var newModalHeader = createNewElement({
		type: 'div',
		className: 'modal-header',
	});
	newModalContent.appendChild(newModalHeader);
	
	// Body
	var newModalBody = createNewElement({
		type: 'div',
		className: 'modal-body'
	});
	
	/*
	setTimeout(function(newModalBody){
		jMod.Scrollbar(newModalBody);
	}, 1000, newModalBody);
	*/
	
	newModalContent.appendChild(newModalBody);
	
	// Footer
	var newModalFooter = createNewElement({
		type: 'div',
		className: 'modal-footer',
	});
	newModalContent.appendChild(newModalFooter);
	
	// Title
	appendChild(newModalHeader, data.title);
	
	// Title Close Button
	var newModalTitleCloseButton = createNewElement({
		type: 'div',
		className: 'yt-close-btn-wrapper',
		innerHTML: '<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-close-btn">',
		EventListeners: {
			click: {
				capture: false,
				callback: function(e){
					var modal = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
					var modalNum = parseInt(getAttribute(modal, 'data-jmod-modal'));
					return Modal.hide(modal, modalNum, e);
					//eventCancel(e);
					//return false;
				}
			}
		}
	});
	/*
	var newModalTitleCloseButton = createNewElement({
		type: 'button',
		className: 'close',
		innerHTML: 'x',
		attributes: {
			type: 'button',
		},
		EventListeners: {
			click: {
				capture: false,
				callback: function(e){
					var modal = e.target.parentElement.parentElement.parentElement.parentElement;
					var modalNum = parseInt(modal.getAttribute('data-jmod-modal'));
					return jMod.Modal.hide(modal, modalNum, e);
				}
			}
		}
	});
	*/
	
	newModalHeader.appendChild(newModalTitleCloseButton);
	
	// Body Content
	appendChild(newModalBody, data.body);
	
	// Footer Content
	appendChild(newModalFooter, data.footer);
	
	// Footer Buttons
	if(typeof data.buttons !== _undefined){
		for(var i in data.buttons){
			try{
				var newButtonArgs = jMod.extend(true, {
					type: 'button',
					text: 'button'
				}, data.buttons[i]);
				var newButton = createNewElement(newButtonArgs);
				if(newButton){
					if(!hasClass(newButton, 'btn'))
						addClass(newButton, 'brn');
					//if(hasClasses(newButton, ['btn-default']).length <= 0){
					if(!(/btn\-(default|primary|success|info|warning|danger)/i.test(newButton.className)))
						addClass(newButton, 'btn-default');
					newModalFooter.appendChild(newButton);
				}
			} catch(e){
				//console.log('error! footer buttons: ', e);
				jModLogError(e, 'jMod.Modal.createModal', 'footer buttons');
			}
		}
	}
	
	// Footer Close Button
	var newModalFooterCloseButton = createNewElement({
		type: 'button',
		className: 'btn btn-default',
		innerHTML: 'Close',
		attributes: {
			type: 'button',
		},
		EventListeners: {
			click: {
				capture: false,
				callback: function(e){
					if(e.target !== this)
						return;
					var modal = e.target.parentElement.parentElement.parentElement.parentElement;
					var modalNum = parseInt(getAttribute(modal, 'data-jmod-modal'));
					Modal.hide(modal, modalNum, e);
					eventCancel(e);
					return false;
				}
			}
		}
	});
	newModalFooter.appendChild(newModalFooterCloseButton);
	
	return newModal;
}

Modal.init = function(){
	Modal.Initialized = true;
	
	var modalContainer = Modal.Container;
	if(modalContainer == null){
		modalContainer = jMod.Element.document.createElement("div");
		modalContainer.id = jConfig(Modal_ContainerElementId_Key);
		modalContainer.className = 'jmod-na jmod-fa jmod-gi ' + jConfig(Modal_ContainerElementClass_Key);
		jMod.Element.document.body.appendChild(modalContainer);
	}
	
	(window || unsafeWindow).addEventListener('resize', function(e){
		jMod.Modal.resize(e);
	});
	
}

jMod.CSS = <><![CDATACSS[

.jmod-na .nav.nav-tabs {
    border-width: 0px;
    border-right-width: 1px !important;
    border-style: solid !important;
    -webkit-border-image: 
      -webkit-gradient(linear, 0 0, 0 100%, from(rgba(221, 221, 221, 1)), color-stop(65%,rgba(221, 221, 221, 1)), to(rgba(0, 0, 0, 0))) 1 100%;
    -webkit-border-image: 
      -webkit-linear-gradient(rgba(221, 221, 221, 1) 65%, rgba(221, 221, 221, 1), rgba(0, 0, 0, 0)) 1 100%;
    -moz-border-image:
      -moz-linear-gradient(rgba(221, 221, 221, 1) 65%, rgba(221, 221, 221, 1), rgba(0, 0, 0, 0)) 1 100%;    
    -o-border-image:
      -o-linear-gradient(rgba(221, 221, 221, 1) 65%, rgba(221, 221, 221, 1), rgba(0, 0, 0, 0)) 1 100%;
    border-image:
      linear-gradient(to bottom, rgba(221, 221, 221, 1) 65%, rgba(221, 221, 221, 1), rgba(0, 0, 0, 0)) 1 100%;
}

/*
.jmod-na .modal.no-vert-scroll[data-jmod-modal]{
*/

.jmod-na .no-vertical-scroll[data-jmod-modal]{
	overflow-y: hidden;
}

/*
body.jmod-modal-open::-webkit-scrollbar {
    width: 2em;
    height: 2em
}
body.jmod-modal-open::-webkit-scrollbar-button {
    background: #ccc
}
body.jmod-modal-open::-webkit-scrollbar-track-piece {
    background: #888
}
body.jmod-modal-open::-webkit-scrollbar-thumb {
    background: #eee
}
*/
]]></>;
