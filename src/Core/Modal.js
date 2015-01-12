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
		jModError(e, 'jMod.Modal');
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
	var modal = document.querySelector('div[data-jmod-modal="'+number+'"]');
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

Modal.show = function(modal, modalNum, e){
	try{
		//console.log('jMod.Modal.CurrentModal', jMod.Modal.CurrentModal);

		if(typeof modal === "number" && typeof modalNum !== "number"){
			if(typeof e === _undefined && typeof modalNum !== _undefined)
				e = modalNum;
			modalNum = modal;
		}
		if((typeof modal === _undefined || modal == null) && typeof modalNum === _undefined)
			return;
		if((typeof modal === _undefined || modal == null || typeof modal === "number") && typeof modalNum === "number"){
			modal = document.querySelector('div[data-jmod-modal="'+modalNum+'"]');
		} else if(typeof modal !== _undefined && modal != null && typeof modalNum === _undefined){
			modalNum = getAttribute(modal, 'data-jmod-modal');
		}
		
		if(Modal.CurrentModal != -1 && Modal.CurrentModal != modalNum){
			Modal.hide();
		}
		
		if(modal){
			var modalBackdrop = document.querySelector('div[data-jmod-modal-backdrop="'+modalNum+'"]');
			//console.log('jMod.Modal.show', modal, modalNum, e || null);
			var r = Modal.Events.fire('onBeforeShow', modalNum, modal, [e || null]);
			Modal.CurrentModal = modalNum;
			addClass(document.body, 'jmod-modal-open');
			modalBackdrop.style.display = 'block';
			modal.style.display = 'block';
			setTimeout(function(modal, modalBackdrop){
				addClass(modalBackdrop, 'in');
				addClass(modal, 'in');
			}, 1, modal, modalBackdrop);
			setTimeout(function(modal, modalNum, e){
				Modal.Events.fire('onAfterShow', modalNum, modal, [e || null]);
			}, fadeAnimationLength, modal, modalNum, e || null);
		}
	}catch(e){
		//console.log('Error jMod.Modal.show', e);
		jModError(e, 'jMod.Modal.show');
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
			var modalBackdrop = document.querySelector('div[data-jmod-modal-backdrop="'+modalNum+'"]');
			var r = Modal.Events.fire('onBeforeHide', modalNum, modal, [e || null]);
			Modal.CurrentModal = -1;
			removeClass(document.body, 'jmod-modal-open');
			removeClass(modal, 'in');
			removeClass(modalBackdrop, 'in');
			setTimeout(function(modal, modalNum, e, modalBackdrop){
				modal.style.display = 'none';
				modalBackdrop.style.display = 'none';
				Modal.Events.fire('onAfterHide', modalNum, modal, [e || null]);
			}, fadeAnimationLength, modal, modalNum, e || null, modalBackdrop);
		}
	}catch(e){
		//console.log('Error jMod.Modal.hide', e);
		jModError(e, 'jMod.Modal.hide');
	}
}

Modal.Events = new EventsClass(['onBeforeShow', 'onAfterShow', 'onBeforeHide', 'onAfterHide']);

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
				jModError(e, 'jMod.Modal.createModal', 'footer buttons');
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
		modalContainer = document.createElement("div");
		modalContainer.id = jConfig(Modal_ContainerElementId_Key);
		modalContainer.className = 'jmod-na jmod-fa ' + jConfig(Modal_ContainerElementClass_Key);
		document.body.appendChild(modalContainer);
	}

}


/*
jMod.Requirements.add({
	type: 'imagepreload',
	'value': '//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif'
});
*/

jMod.CSS = <><![CDATACSS[

.jmod-na .tabbable > .nav.nav-tabs > li > a, .jmod-na .tabbable > .nav.nav-tabs > li > a:hover, .jmod-na .tabbable > .nav.nav-tabs > li > a:active {
	text-decoration: none;
}

]]></>;


