// +@display_name  Modal
// +@replace  MUJS.MODAL
// +@history (0.0.14) History begins.

/**
 * Modal Configuration Options
 * @name Modal
 * @alias Modal
 * @memberof MUJS.Config
 * @property {boolean} enabled is enabled
 * @example
 * // Get the current value of Modal.enabled
 * MUJS('get', 'Modal.enabled')
 * // or
 * MUJS.config('Modal.enabled');
 * // or
 * MUJS.Config.Modal.enabled;
 */
MUJS.Config.Modal = {
	enabled: true
}

/**
 * @namespace MUJS.Modal
 * @memberOf MUJS
 * @since 0.0.14
 */
 
/**
 * @function Modal
 * @memberof MUJS
 * @variation 2
 * @param {(string|object)} data - (string) Command to execute | (object) options for new modal to display
 * @param {(object|boolean)} [data2] - (object) Arguments for command | (boolean) show new modal immediately
 */
MUJS.fn.Modal = function(data, data2){
	if(!MUJS('get', 'Modal.enabled'))
		return false;
	if(!MUJS.Modal.Initialized){
		MUJS.Modal.init();
	}
	try{
		if(typeof data === "string"){
			switch(data.toLowerCase()){
				case 'show':
				case 'showmodal':
					return MUJS.Modal.show.apply(MUJS.Modal, Array.prototype.slice.call(arguments, 1));
					break;
				case 'hide':
				case 'hidemodal':
					return MUJS.Modal.hide.apply(MUJS.Modal, Array.prototype.slice.call(arguments, 1));
					break;
				case 'get':
				case 'getelement':
					return MUJS.Modal.getElement.apply(MUJS.Modal, Array.prototype.slice.call(arguments, 1));
					break;
				case 'getid':
				case 'getelementid':
					return MUJS.Modal.getElementId.apply(MUJS.Modal, Array.prototype.slice.call(arguments, 1));
					break;
			}
		} else if(typeof data === "object") {
			var newModal = MUJS.Modal.fn.createModal(data);
			var modalContainer = MUJS.Modal('getElement', 'modalContainer');
			if(modalContainer)
				modalContainer.appendChild(newModal);
			var modalNum = parseInt(newModal.getAttribute('data-mujs-modal'));
			MUJS.Modal.Modals[modalNum] = {
				index: modalNum,
				element: newModal,
				lockScreen: data.lockScreen || true,
				data: data
			};
			if(data2 === true){
				// show right away
				MUJS.Modal.show(newModal);
			}

			return newModal;
		}
	}catch(e){
		console.log('error, MUJS.fn.Modal', e);
	}
}
Object.defineProperties(MUJS.Modal, {
	fn: {value: MUJS.Modal.__proto__},
	ModalCount: {
		value: 0,
		writable: true
	},
	CurrentModal: {
		value: -1,
		writable: true
	},
	FreezeBackdrop: {
		value: false,
		writable: true
	},
	Modals: {
		value: {},
		writable: true
	},
	Initialized: {
		value: false,
		writable: true
	}
});

var fadeAnimationLength = 150;

/**
 * Get a modal by its index
 * @function getModal
 * @memberof MUJS.Modal
 * @param {number} number Index to search for
 * @returns {Element} DOM Element
 */
MUJS.Modal.fn.getModal = function(number){
	var modal = document.querySelector('div[data-mujs-modal="'+number+'"]');
	if(modal)
		return modal;
	if(typeof MUJS.Modal.Modals[number] !== "undefined")
		return MUJS.Modal.Modals[number].element;
	return null;
}

MUJS.Modal.getElementId = function(name){
	switch(name.toLowerCase()){
		case 'container':
		case 'modalcontainer':
			return "MUJSModalContainer";
			break;
		case 'backdrop':
		case 'modalbackdrop':
			return "MUJSModalBackdrop";
			break;
	}
	return null;
}

MUJS.Modal.getElement = function(name){
	var tId = MUJS.Modal.getElementId(name);
	if(tId != null)
		return document.getElementById(tId);
	return document.getElementById(name);
}

MUJS.Modal.show = function(modal, modalNum, e){
	try{
		console.log('MUJS.Modal.CurrentModal', MUJS.Modal.CurrentModal);
		if(MUJS.Modal.CurrentModal != -1){
			MUJS.Modal.FreezeBackdrop = true;
			MUJS.Modal.hide();
			setTimeout(function(){MUJS.Modal.FreezeBackdrop = false;}, fadeAnimationLength + 50);
		}
		if(typeof modal === "number" && typeof modalNum !== "number"){
			if(typeof e === "undefined" && typeof modalNum !== "undefined")
				e = modalNum;
			modalNum = modal;
		}
		if(typeof modal === "undefined" && typeof modalNum === "undefined")
			return;
		if((typeof modal === "undefined" || typeof modal === "number") && typeof modalNum === "number"){
			modal = document.querySelector('div[data-mujs-modal="'+modalNum+'"]');
		} else if(typeof modal !== "undefined" && typeof modalNum === "undefined"){
			modalNum = modal.getAttribute('data-mujs-modal');
		}
		
		if(modal){
			var modalBackdrop = MUJS.Modal('getElement', 'modalBackdrop');
			//console.log('MUJS.Modal.show', modal, modalNum, e || null);
			var r = MUJS.Modal.Events.fire('onBeforeShow', modal, modalNum, e || null);
			MUJS.Modal.CurrentModal = modalNum;
			addClass(document.body, 'mujs-modal-open');
			if(!MUJS.Modal.FreezeBackdrop)
				modalBackdrop.style = 'display: block;';
			modal.style = 'display: block;';
			setTimeout(function(modal, modalBackdrop){
				if(!MUJS.Modal.FreezeBackdrop)
					modalBackdrop.className = 'modal-backdrop fade in';
				modal.className = 'modal fade in';
			}, 1, modal, modalBackdrop);
			setTimeout(function(modal, modalNum, e){
				MUJS.Modal.Events.fire('onAfterShow', modal, modalNum, e || null);
			}, fadeAnimationLength, modal, modalNum, e || null);
		}
	}catch(e){
		console.log('Error MUJS.Modal.show', e);
	}
}

MUJS.Modal.hide = function(modal, modalNum, e){
	try{
		if(typeof modal === "undefined" && typeof modalNum === "undefined" && MUJS.Modal.CurrentModal != -1){
			modalNum = MUJS.Modal.CurrentModal;
			modal = MUJS.Modal.getModal(MUJS.Modal.CurrentModal);
		}
		
		if(typeof modal === "number" && typeof modalNum !== "number"){
			if(typeof e === "undefined" && typeof modalNum !== "undefined")
				e = modalNum;
			modalNum = modal;
		}
		if(typeof modal === "undefined" && typeof modalNum === "undefined"){
			return;
		}
		//if((typeof modal === "undefined" || typeof modal === "number") && typeof modalNum === "number"){
		if(!isElement(modal) && typeof modalNum === "number"){
			modal = MUJS.Modal.getModal(modalNum);
		} else if(typeof modal !== "undefined" && typeof modalNum === "undefined"){
			modalNum = modal.getAttribute('data-mujs-modal');
		}
		
		
		if(modal){
			var modalBackdrop = MUJS.Modal('getElement', 'modalBackdrop');
			//console.log('MUJS.Modal.hide', modal, modalNum, e || null);
			var r = MUJS.Modal.Events.fire('onBeforeHide', modal, modalNum, e || null);
			MUJS.Modal.CurrentModal = -1;
			removeClass(document.body, 'mujs-modal-open');
			modal.className = 'modal fade';
			if(!MUJS.Modal.FreezeBackdrop)
				modalBackdrop.className = 'modal-backdrop fade';
			
			setTimeout(function(modal, modalNum, e, modalBackdrop){
				modal.style = 'display: none;';
				if(!MUJS.Modal.FreezeBackdrop)
					modalBackdrop.style = 'display: none;';
				MUJS.Modal.Events.fire('onAfterHide', modal, modalNum, e || null);
			}, fadeAnimationLength, modal, modalNum, e || null, modalBackdrop);
		}
	}catch(e){
		console.log('Error MUJS.Modal.hide', e);
	}
}

MUJS.Modal.Events = {
	'eventListeners': {},
	'events': ['onBeforeShow', 'onAfterShow', 'onBeforeHide', 'onAfterHide'],
	add: function(modalNum, eventName, callback){
		if(typeof this.eventListeners[modalNum] === "undefined")
			this.eventListeners[modalNum] = {};
			
		if(typeof this.eventListeners[modalNum][eventName] === "undefined")
			this.eventListeners[modalNum][eventName] = [];
		
		this.eventListeners[modalNum][eventName].push(callback);
	},
	
	addAll: function(data, modalNum){
		for(var evt in this.events)
			if(typeof data[this.events[evt]] === "function")
				this.add(modalNum, this.events[evt], data[this.events[evt]])
	},
	
	fire: function(eventName, modal, modalNum, triggerEvent){
		try{
			if(typeof this.eventListeners[modalNum] !== "undefined" && typeof this.eventListeners[modalNum][eventName] !== "undefined"){
				var args = Array.prototype.slice.call(arguments, 1);
				if(typeof modal === "undefined"){
					modal = document.querySelector('div[data-mujs-modal="'+modalNum+'"]');
				}
				for(var i in this.eventListeners[modalNum][eventName]){
					this.eventListeners[modalNum][eventName][i].apply(modal || unsafeWindow, args);
				}
			}
		} catch(e){
			console.log('Error MUJS.Modal.Events.fire', e);
		}
	}
};


MUJS.Modal.fn.createModal = function(data){
	var newModalNum = MUJS.Modal.ModalCount++;
	
	MUJS.Modal.Events.addAll(data, newModalNum);
	
	var newModal = createNewElement({
		type: 'div',
		id: 'myModal',
		className: 'modal fade',
		style: 'display: none;',
		attributes: {
			role: 'dialog',
			tabindex: '-1',
			'data-mujs-modal': newModalNum
		},
		EventListeners: {
			click: {
				capture: false,
				callback: function(e){
					if(e.target !== this)
						return;
					var modal = e.target;
					var modalNum = parseInt(modal.getAttribute('data-mujs-modal'));
					MUJS.Modal.hide(modal, modalNum, e);
					eventCancel(e);
					return false;
				}
			}
		}
	});
	
	// Dialog Container
	var newModalDialog = createNewElement({
		type: 'div',
		className: 'modal-dialog',
	});
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
		className: 'modal-body',
	});
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
					var modalNum = parseInt(modal.getAttribute('data-mujs-modal'));
					return MUJS.Modal.hide(modal, modalNum, e);
				}
			}
		}
	});
	
	newModalHeader.appendChild(newModalTitleCloseButton);
	
	// Body Content
	appendChild(newModalBody, data.body);
	
	// Footer Buttons
	if(typeof data.buttons !== "undefined"){
		for(var i in data.buttons){
			try{
				var newButtonArgs = merge({
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
				console.log('error! footer buttons: ', e);
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
					var modalNum = parseInt(modal.getAttribute('data-mujs-modal'));
					MUJS.Modal.hide(modal, modalNum, e);
					eventCancel(e);
					return false;
				}
			}
		}
	});
	newModalFooter.appendChild(newModalFooterCloseButton);
	
	return newModal;
}

MUJS.Modal.fn.init = function(){
	MUJS.Modal.Initialized = true;
	
	var modalContainer = MUJS.Modal('getElement', 'modalContainer');
	if(modalContainer == null){
		modalContainer = document.createElement("div");
		modalContainer.id = MUJS.Modal('getElementId', 'modalContainer');
		modalContainer.className = 'MUJSModalContainer mujs-na mujs-fa';
		document.body.appendChild(modalContainer);
	}
	
	var modalBackdrop = MUJS.Modal('getElement', 'modalBackdrop');
	if(modalBackdrop == null){
		modalBackdrop = createNewElement({
			type: 'div',
			id: MUJS.Modal('getElementId', 'modalBackdrop'),
			className: 'modal-backdrop fade in',
			style: 'display:none;',
			EventListeners: {
				// if backdrop isn't removed, allow user to click it away
				click: {
					capture: false,
					callback: function(e){
						if(e.target !== this)
							return;
						var backdrop = MUJS.Modal('getElement', 'modalBackdrop');
						backdrop.style = 'display:none;';
						removeClass(document.body, 'mujs-modal-open');
						eventCancel(e);
						return false;
					}
				}
			}
		});
		modalContainer.appendChild(modalBackdrop);
	}
}



MUJS.CSS = <><![CDATACSS[
body.mujs-modal-open {
	overflow: hidden !important;
}
.mujs-modal-open {
	overflow: hidden;
}
.mujs-modal-open .mujs-na .modal {
	overflow-x: hidden;
	overflow-y: auto;
}
.mujs.na .fade {
	opacity: 0;
	-webkit-transition: opacity 0.15s linear;
	-o-transition: opacity 0.15s linear;
	transition: opacity 0.15s linear;
}
.mujs-na .fade.in {
	opacity: 1;
}
.mujs-na .modal-dialog {
	margin: 30px auto;
	width: 600px;
	left: auto;
}
.mujs-na .close {
	float: right;
	font-size: 21px;
	font-weight: bold;
	line-height: 1;
	color: #000000;
	text-shadow: 0 1px 0 #ffffff;
	opacity: 0.2;
	filter: alpha(opacity=20);
}
.mujs-na .close:hover, .mujs-na .close:focus {
	color: #000000;
	text-decoration: none;
	cursor: pointer;
	opacity: 0.5;
	filter: alpha(opacity=50);
}
.mujs-na button.close {
	padding: 0;
	cursor: pointer;
	background: transparent;
	border: 0;
	-webkit-appearance: none;
}
.mujs-na .modal * {
	font-family: inherit;
}
.mujs-na .modal, .mujs-na .modal-dialog, .mujs-na .modal-content, .mujs-na .modal-header, .mujs-na .modal-body, .mujs-na .modal-footer {
	font-family: "Open Sans",Arial,Helvetica,sans-serif;
}
.mujs-na .modal, .mujs-na .modal-dialog, .mujs-na .modal-content, .mujs-na .modal-header, .mujs-na .modal-body, .mujs-na .modal-footer {
	color: #000;
	font-size: 13px;
	font-weight: 400;
}
.mujs-na .modal button, .mujs-na .modal input {
	text-transform: none;
}
.mujs-na .modal {
	bottom: 0;
	left: 0;
	outline: 0 none;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 1050;
}
.mujs-na .modal-backdrop {
	background-color: #000;
	bottom: 0;
	left: 0;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 1040;
}
.mujs-na .modal-backdrop.in {
	opacity: 0.5;
}
]]></>;


