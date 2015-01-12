// +@display_name  Notifications
// +@history (0.0.14) History begins.
// +@history (0.0.15) Removed ref to jMod.fn (__proto__ is depreciated).

/**
 * Notification Configuration Options
 * @name Notifications
 * @alias Notifications
 * @memberof jMod.Config
 * @property {boolean} enabled is enabled
 * @example
 * // Get the current value of Notifications.enabled
 * jMod('get', 'Notifications.enabled')
 * // or
 * jMod.Config('Notifications.enabled');
 * // or
 * jMod.Config.Notifications.enabled;
 */
jMod.Config.Notifications = {
	enabled: true
}

/**
 * @namespace jMod.Notification
 * @memberOf jMod
 * @since 0.0.14
 * @todo Clean up Notification loading process
 * @example
 * // Show an update notification
 * jMod.Notification('UpdateNotification', {
 *     'version': '1.2.3', // The new version
 *     'script_name': 'foo bar', // Optional
 *     'time': '123 minutes ago',
 *     'visit': {
 *         'onClick': function(e){
 *             console.log('Visit Clicked!!', e);
 *             e.stopPropagation();
 *             return false;
 *         }
 *     }
 * });
 * @example
 * // Manually show a small notification
 * jMod.Notification({
 *     'title': 'Anti-Pagination v0.0.14 Available!',
 *     'body': '&#060;i class="fa fa-clock-o"&#062;&#060;/i&#062; &#060;i&#062;2 hours ago...&#060;/i&#062;',
 *     'footer': '&#060;a class="btn btn-success btn-sm" href="javascript:void(0);" onClick="console.log(\'a btn click\');(arguments[0] || window.event).stopPropagation();return false;">Install&#060;/a&#062;'+
 *         '&#060;a class="btn btn-primary btn-sm" href="javascript:void(0);" target="_blank"&#062;Visit Page&#060;/a&#062;'+
 *         '&#060;a class="btn btn-danger btn-sm" href="javascript:void(0);"&#062;Close&#060;/a&#062;', // Optional
 *     'icon': 'fa-download',
 *     'type': 'small',
 *     'onBeforeClose': tOnBeforeCloseCB, // Optional
 *     'onAfterClose': tOnAfterCloseCB // Optional
 * });
 */

function generateLargeNotificationElement(data){
	var newNotification = {
		type: 'div',
		className: 'jModLargeNotification bigBox animated fadeIn',
		style: {},
		attributes: {
			'data-jmod-notification': Notification.count,
			'data-jmod-large-notification': Notification.LargeCount
		}
	}
	
	// Background
	if(typeof data.background !== _undefined)
		newNotification.style.background = data['background'];
	if(typeof data['background-color'] !== _undefined)
		newNotification.style.backgroundColor = data['background-color'];
	else
		newNotification.style.backgroundColor ='rgb(50, 118, 177)';
		
	var newNotificationContent = {
		type: 'div',
		className: '',
		innerHTML: [
			{
				type: 'i',
				id: 'jModbtnClose'+Notification.LargeCount,
				className: 'botClose fa fa-times',
				EventListeners: {
					'click':function(e){
						var notification = e.target.parentElement.parentElement;
						var notificationNum = parseInt(notification.getAttribute('data-jmod-notification'));
						var largeNotificationNum = parseInt(notification.getAttribute('data-jmod-large-notification'));
						Notification.close(notification, 'large', notificationNum, largeNotificationNum, e);
					}
				}
			}
		],
		style: {},
		attributes: {
			'data-jmod-notification': Notification.count,
			'data-jmod-large-notification': Notification.LargeCount
		}
	}
	
	if(typeof data.title !== _undefined){
		newNotificationContent.innerHTML.push({
			type: 'span',
			innerHTML: data.title
		});
	}
	
	newNotificationContent.innerHTML.push({
		type: 'div',
		innerHTML: data.body
	});
	
	if(typeof data.icon !== _undefined){
		newNotificationContent.innerHTML.push({
			type: 'div',
			className: 'jmod-na bigboxicon',
			style: {
				'backgroundColor': 'transparent',
			},
			innerHTML: {
				type: 'i',
				className: 'fa ' + data.icon + ' ' + (data.iconAnimation || 'swing') + ' animated',
				style: {
					color: '#fff'
				}
			}
		});
	}
	
	newNotification.innerHTML = newNotificationContent;
	
	return createNewElement(newNotification);
}

/*
function generateLargeNotificationElement(data){
	
	// New Notification
	var newNotification = document.createElement("div");
	newNotification.setAttribute('data-jmod-notification', Notification.count);
	newNotification.setAttribute('data-jmod-large-notification', Notification.LargeCount);
	newNotification.className = 'jModLargeNotification bigBox animated fadeIn';
	// Background
	if(typeof data.background !== _undefined)
		newNotification.style.background = data['background'];
	if(typeof data['background-color'] !== _undefined)
		newNotification.style.backgroundColor = data['background-color'];
	else
		newNotification.style.backgroundColor ='rgb(50, 118, 177)';
	
	var newNotificationContent = document.createElement("div");
	newNotificationContent.className = '';
	
	// Close Button
	var btnClose = document.createElement("i");
	btnClose.setAttribute('class', 'botClose fa fa-times');
	btnClose.setAttribute('id', 'jModbtnClose'+Notification.LargeCount);
	btnClose.addEventListener("click", function(e){
		var notification = e.target.parentElement.parentElement;
		var notificationNum = parseInt(notification.getAttribute('data-jmod-notification'));
		var largeNotificationNum = parseInt(notification.getAttribute('data-jmod-large-notification'));
		Notification.close(notification, 'large', notificationNum, largeNotificationNum, e);
	});
	newNotificationContent.appendChild(btnClose);
	
	// Title
	var title = document.createElement('span');
	title.className = '';
	if(typeof data.title !== _undefined){
		if(isElement(data.title)){
			title.appendChild(data.title);
		} else {
			title.innerHTML = data.title;
		}
	}
	newNotificationContent.appendChild(title);
	
	// Body
	var bdy = document.createElement('p');
	bdy.className = '';
	if(typeof data.body !== _undefined){
		if(isElement(data.body)){
			bdy.appendChild(data.body);
		} else {
			bdy.innerHTML = data.body;
		}
	}
	newNotificationContent.appendChild(bdy);
	
	// Icon
	if(typeof data.icon !== _undefined){
		var icon = document.createElement('div');
		icon.setAttribute('class', 'jmod-na bigboxicon');
		if(isElement(data.icon)){
			icon.appendChild(data.icon);
		} else {
			icon.innerHTML = '<i class="fa ' + data.icon + ' '+(data.iconAnimation || 'swing')+' animated"> </i>';
		}
		
		newNotificationContent.appendChild(icon);
	}
	
	newNotification.appendChild(newNotificationContent);
	
	return newNotification;
}
*/



/*
function generateSmallNotificationElement(data){
	var tmpTop = 0;
	var totalCount = Notification.CurrentSmallCount;
	if(totalCount > 0){
		var tHeight = totalCount * 25;
		var smallNotificationsContainer = Notification('getElement', 'notificationsSmallWrapper');
		var smNotes = smallNotificationsContainer.querySelectorAll('div[data-jmod-small-notification]');
		for(var i = 0; i < smNotes.length; i++){
			tHeight += parseInt(smNotes[i].offsetHeight);
		}
		//newNotification.style.top = ((80 * totalCount) + 20) + 'px';
		tmpTop = (tHeight + 20);
	}

	var newNotification = {
		type: 'div',
		className: 'jModSmallNotification SmallBox animated fadeIn',
		style: {
			top: tmpTop + 'px'
		},
		attributes: {
			'data-jmod-notification': Notification.count,
			'data-jmod-small-notification': Notification.SmallCount
		},
		EventListeners: {
			click: function(e){
				//if(e.target.tagName.toLowerCase() != 'a' && e.target.tagName.toLowerCase() != 'button'){
					var tCount = 0;
					var tParent = e.target;
					while(!tParent.hasAttribute('data-jmod-small-notification') && tParent != null && tCount < 10){
						tParent = tParent.parentElement;
						tCount++;
					}
					if(tParent != null){
						var notificationNum = parseInt(tParent.getAttribute('data-jmod-notification'));
						var smallNotificationNum = parseInt(tParent.getAttribute('data-jmod-small-notification'));
						Notification.close(tParent, 'small', notificationNum, smallNotificationNum, e);
					}
				//}
			}
		}
	}
	
	// Background
	if(typeof data.background !== _undefined)
		newNotification.style.background = data['background'];
	if(typeof data['background-color'] !== _undefined)
		newNotification.style.backgroundColor = data['background-color'];
	else
		newNotification.style.backgroundColor ='rgb(50, 118, 177)';
		
	var newNotificationContent = {
		type: 'div',
		className: '',
		innerHTML: [],
		style: {},
		attributes: {
			'data-jmod-notification': Notification.count,
			'data-jmod-large-notification': Notification.LargeCount
		}
	}
	
	if(typeof data.footer === _undefined)
		newNotificationContent.className += ' textoFull';
	else{
		newNotificationContent.className += ' textoFoto';
		
		var foto = document.createElement("div");
		foto.className = 'foto';
		if(isElement(data.icon)){
			foto.appendChild(data.icon);
		} else {
			foto.innerHTML = '<i class="fa ' + data.icon + ' '+(data.iconAnimation || 'bounce')+' animated"> </i>';
		}
		
		newNotification.appendChild(foto);
	}
	
	
	
	
	
	
	if(typeof data.title !== _undefined){
		newNotificationContent.innerHTML.push({
			type: 'span',
			innerHTML: data.title
		});
	}
	
	newNotificationContent.innerHTML.push({
		type: 'div',
		innerHTML: data.body
	});
	
	if(typeof data.icon !== _undefined){
		newNotificationContent.innerHTML.push({
			type: 'div',
			className: 'jmod-na bigboxicon',
			style: {
				'backgroundColor': 'transparent',
			},
			innerHTML: {
				type: 'i',
				className: 'fa ' + data.icon + ' ' + (data.iconAnimation || 'swing') + ' animated',
				style: {
					color: '#fff'
				}
			}
		});
	}
	
	newNotification.innerHTML = newNotificationContent;
	
	return createNewElement(newNotification);
}
*/


function generateSmallNotificationElement(data){
	
	// New Notification
	var newNotification = document.createElement("div");
	newNotification.setAttribute('data-jmod-notification', Notification.count);
	newNotification.setAttribute('data-jmod-small-notification', Notification.SmallCount);
	newNotification.className = 'jModSmallNotification SmallBox animated fadeIn';
	// Background
	if(typeof data.background !== _undefined)
		newNotification.style.background = data['background'];
	if(typeof data['background-color'] !== _undefined)
		newNotification.style.backgroundColor = data['background-color'];
	else
		newNotification.style.backgroundColor ='rgb(41, 97, 145)';
	
	var totalCount = Notification.CurrentSmallCount;
	if(totalCount > 0){
		var tHeight = totalCount * 25;
		var smallNotificationsContainer = Notification('getElement', 'notificationsSmallWrapper');
		var smNotes = jMod.$$('div[data-jmod-small-notification]', smallNotificationsContainer);
		for(var i = 0; i < smNotes.length; i++){
			tHeight += parseInt(smNotes[i].offsetHeight);
		}
		//newNotification.style.top = ((80 * totalCount) + 20) + 'px';
		newNotification.style.top = (tHeight + 20) + 'px';
	}
	
	newNotification.addEventListener("click", function(e){
		//if(e.target.tagName.toLowerCase() != 'a' && e.target.tagName.toLowerCase() != 'button'){
			var tCount = 0;
			var tParent = e.target;
			while(!tParent.hasAttribute('data-jmod-small-notification') && tParent != null && tCount < 10){
				tParent = tParent.parentElement;
				tCount++;
			}
			if(tParent != null){
				var notificationNum = parseInt(tParent.getAttribute('data-jmod-notification'));
				var smallNotificationNum = parseInt(tParent.getAttribute('data-jmod-small-notification'));
				Notification.close(tParent, 'small', notificationNum, smallNotificationNum, e);
			}
		//}
	}, false);
	//newNotificationContent.appendChild(newNotification);
	
	var newNotificationContent = document.createElement("div");
	if(typeof data.footer === _undefined)
		newNotificationContent.className = 'textoFull';
	else{
		newNotificationContent.className = 'textoFoto';
		
		var foto = document.createElement("div");
		foto.className = 'foto';
		if(isElement(data.icon)){
			foto.appendChild(data.icon);
		} else {
			foto.innerHTML = '<i class="fa ' + data.icon + ' '+(data.iconAnimation || 'bounce')+' animated"> </i>';
		}
		
		newNotification.appendChild(foto);
	}

	

	
	// Title
	var title = document.createElement('span');
	title.className = '';
	if(typeof data.title !== _undefined){
		if(isElement(data.title)){
			title.appendChild(data.title);
		} else {
			title.innerHTML = data.title;
		}
	}
	newNotificationContent.appendChild(title);
	
	// Body
	var bdy = document.createElement('p');
	bdy.className = '';
	if(typeof data.body !== _undefined){
		if(isElement(data.body)){
			bdy.appendChild(data.body);
		} else {
			bdy.innerHTML = data.body;
		}
	}
	newNotificationContent.appendChild(bdy);
	
	// Footer
	if(typeof data.footer !== _undefined){
		var footer = document.createElement('p');
		footer.className = 'text-align-right';
		if(isElement(data.footer)){
			//footer.appendChild(data.footer);
			footer = data.footer;
		} else {
			footer.innerHTML = data.footer;
		}
		newNotificationContent.appendChild(footer);
	}
	
	newNotification.appendChild(newNotificationContent);
	
	// Icon
	if(typeof data.footer === _undefined && typeof data.icon !== _undefined){
		var icon = document.createElement('div');
		icon.setAttribute('class', 'miniIcono');
		if(isElement(data.icon)){
			icon.appendChild(data.icon);
		} else {
			icon.innerHTML = '<i class="miniPic fa ' + data.icon + ' bounce animated"> </i>';
		}
		
		newNotification.appendChild(icon);
	}
	
	
	
	return newNotification;
}


/**
 * @function Notification
 * @memberOf jMod
 * @variation 2
 * @param {string|object} data Command to execute or notification data
 * @param {...*} [data2]
 * @see jMod.Notification
 */
var Notification = jMod.Notification = function(data, data2){
	if(!jConfig('Notifications.enabled'))
		return false;
	if(!jMod.Notification.Initialized){
		jMod.Notification.init();
	}
	
	if(typeof data === "string"){
		switch(data.toLowerCase()){
			case 'get':
			case 'getelement':
				return jMod.Notification.getElement.apply(jMod.Notification, Slice.call(arguments, 1));
				break;
			case 'getid':
			case 'getelementid':
				return jMod.Notification.getElementId.apply(jMod.Notification, Slice.call(arguments, 1));
				break;
			case 'updatenotification':
				return jMod.Notification.UpdateNotification.apply(jMod.Notification, Slice.call(arguments, 1));
				break;
		}
	} else if(typeof data === "object") {
		switch((data.type || '').toLowerCase()){
			case 'small':
				var smallNotificationsContainer = jMod.Notification('getElement', 'notificationsSmallWrapper');
				var newNotification = generateSmallNotificationElement(data);
				smallNotificationsContainer.appendChild(newNotification);
				jMod.Notification.Events.addAll(data, jMod.Notification.count);
				jMod.Notification.count++;
				jMod.Notification.SmallCount++;
				break;
			case 'large':
			default:
				var largeNotificationsContainer = jMod.Notification('getElement', 'notificationsLargeWrapper');
				var newNotification = generateLargeNotificationElement(data);
				largeNotificationsContainer.appendChild(newNotification);
				jMod.Notification.Events.addAll(data, jMod.Notification.count);
				jMod.Notification.count++;
				jMod.Notification.LargeCount++;
				break;
		}
	}
}

Notification.UpdateNotification = function(data){
	var options = merge({
		'version': 'N/A',
		'script_name': null,
		'time': 'N/A',
		'icon': 'fa-download',
		'iconAnimation': '',
		'title': '%SCRIPTNAME% %VERSION% Available!',
		'body': '<i class="fa fa-clock-o"></i> <i>Updated %TIME%...</i>',
		'install': {
			'href': null,
			'onClick': null,
			'target': null,
			'text': 'Install'
		},
		'visit': {
			'href': null,
			'onClick': null,
			'target': '_blank',
			'text': 'Visit Page'
		}
	}, data);
	
	if(options.script_name == null)
		options.script_name = jConfig('script.script_name');
	
	var title = options.title.replace('%SCRIPTNAME%', options.script_name).replace('%VERSION%', options.version).replace('%TIME%', options.time);
	var body = options.body.replace('%SCRIPTNAME%', options.script_name).replace('%VERSION%', options.version).replace('%TIME%', options.time);
	
	if(!options.install.href || options.install.href == null || options.install.href == ''){
		options.install.href = jConfig(['script.script_info.jModdownloadURL', 'script.script_info.downloadURL']);
		if(typeof options.install.href === _undefined)
			options.install.href = 'javascript:void(0);';
	}
	//<span style="position:absolute;opacity:0.3;bottom:5px;left:10px;">click to close</span>
	
	var btnInstall = document.createElement("a");
	btnInstall.setAttribute('href', options.install.href);
	if(options.install.target != null)
		btnInstall.setAttribute('target', options.install.target);
	btnInstall.className = 'btn btn-success btn-sm';
	btnInstall.innerHTML = options.install.text;
	if(typeof options.install.onClick === "function")
		btnInstall.addEventListener("click", options.install.onClick);
	
	if(!options.visit.href || options.visit.href == null || options.visit.href == ''){
		if(typeof jConfig('script.script_info.homepage') !== _undefined)
			options.visit.href = jConfig('script.script_info.homepage');
		else
			options.visit.href = 'http://myuserjs.org/script/' + jConfig('script.username') + '/' + jConfig('script.script_name');
	}
	
	var btnVisit = document.createElement("a");
	btnVisit.setAttribute('href', options.visit.href);
	if(options.visit.target != null)
		btnVisit.setAttribute('target', options.visit.target);
	btnVisit.className = 'btn btn-warning btn-sm';
	btnVisit.innerHTML = options.visit.text;
	if(typeof options.visit.onClick === "function")
		btnVisit.addEventListener("click", options.visit.onClick);
	
	var btnClose = document.createElement("a");
	btnClose.setAttribute('href', 'javascript:void(0);');
	btnClose.className = 'btn btn-danger btn-sm';
	btnClose.innerHTML = 'Close';
	
	var footer = document.createElement("p");
	footer.className = 'text-align-right';
	footer.appendChild(btnInstall);
	footer.appendChild(btnVisit);
	footer.appendChild(btnClose);
	
	Notification({
		'title': title,
		'body': body,
		'footer': footer,
		'icon': options.icon,
		'iconAnimation': options.iconAnimation,
		'type': 'small',
		//'onBeforeClose': tOnBeforeCloseCB,
		//'onAfterClose': tOnAfterCloseCB
	});
}

Notification.getElementId = function(name){
	switch(name.toLowerCase()){
		case 'wrapper':
		case 'notificationswrapper':
			return "jModNotificationsWrapper";
			break;
			
		case 'smallwrapper':
		case 'notificationssmallwrapper':
			return "jModSmallNotificationsWrapper";
			break;
			
		case 'largewrapper':
		case 'notificationslargewrapper':
			return "jModLargeNotificationsWrapper";
			break;
		
		default:
			return null;
			break;
	}
}

Notification.getElement = function(name){
	var tId = Notification.getElementId(name);
	if(tId != null)
		return document.getElementById(tId);
	return document.getElementById(name);
}

Notification.remove = function(notification, notificationNumber){
	if(notification != null){
		if(notification.hasAttribute('data-jmod-small-notification')){
			var tSib = notification;
			var oldTop = parseInt(notification.style.top || 0);
			if(oldTop <= 0) oldTop = 20;
			while(tSib.nextElementSibling != null && tSib.nextElementSibling.hasAttribute('data-jmod-small-notification')){
				tSib = tSib.nextElementSibling;
				tSib.className = 'jModSmallNotification SmallBox transitionUp';
				tSib.style.top = oldTop + 'px';
				oldTop = oldTop + parseInt(tSib.offsetHeight) + 25;
			}
		}
		notification.parentElement.removeChild(notification);
	}
}

Notification.close = function(notification, type, notificationNumber, typeNotificationNumber, event){
	if(notification != null){
		Notification.Events.fire(notificationNumber, 'onBeforeClose', notification, event);
		switch(type.toLowerCase()){
			case 'large':
				notification.setAttribute('class', 'jModLargeNotification bigBox animated fadeOut fast');
				setTimeout(function(target, targetNum, e){
					Notification.remove(target, targetNum);
					Notification.Events.fire(targetNum, 'onAfterClose', target, e);
				}, 400, notification, notificationNumber, event);
				break;
			case 'small':
				notification.setAttribute('class', 'jModSmallNotification SmallBox animated fadeOut fast');
				setTimeout(function(target, targetNum, e){
					Notification.remove(target, targetNum);
					Notification.Events.fire(targetNum, 'onAfterClose', target, e);
				}, 400, notification, notificationNumber, event);
				break;
		}
	}
}

Notification.Events = {
	'eventListeners': {},
	'events': ['onBeforeClose', 'onAfterClose'],
	add: function(notificationNum, eventName, callback){
		if(typeof this.eventListeners[notificationNum] === _undefined)
			this.eventListeners[notificationNum] = {};
			
		if(typeof this.eventListeners[notificationNum][eventName] === _undefined)
			this.eventListeners[notificationNum][eventName] = [];
		
		this.eventListeners[notificationNum][eventName].push(callback);
	},
	
	addAll: function(data, notificationNum){
		for(var evt in this.events)
			if(typeof data[this.events[evt]] === "function")
				this.add(notificationNum, this.events[evt], data[this.events[evt]])
	},
	
	fire: function(notificationNum, eventName, notification){
		var args, thisNotification, tCB;
		if(typeof this.eventListeners[notificationNum] !== _undefined && typeof this.eventListeners[notificationNum][eventName] !== _undefined){
			if(typeof notification !== _undefined && isElement(notification)){
				thisNotification = notification;
				args = Slice.call(arguments, 3);
			} else {
				thisNotification = document.querySelector('div[data-jmod-notification="'+notificationNum+'"]');
				if(thisNotification == null)
					thisNotification = unsafeWindow;
				args = Slice.call(arguments, 2);
			}
			args.unshift(eventName);
			while(typeof (tCB = this.eventListeners[notificationNum][eventName].shift()) !== _undefined){
				tCB.apply(thisNotification, args);
			}
		}
	}
};

Notification.count = 0;
Notification.LargeCount = 0;
Notification.SmallCount = 0;

Object.defineProperties(Notification, {
	"CurrentLargeCount": {
		get: function(){
			var largeNotificationsContainer = Notification('getElement', 'notificationsLargeWrapper');
			return (jMod.$$('div[data-jmod-large-notification]', largeNotificationsContainer)).length;
		},
		//writable: false
	},
	"CurrentSmallCount": {
		get: function(){
			var smallNotificationsContainer = Notification('getElement', 'notificationsSmallWrapper');
			return (jMod.$$('div[data-jmod-small-notification]', smallNotificationsContainer)).length;
		},
		//writable: false
	}
});

Notification.Initialized = false;


Notification.init = function(){
	if(!jConfig('Notifications.enabled'))
		return false;
	Notification.Initialized = true;
		
	var head = document.getElementsByTagName('head')[0];
	var body = document.getElementsByTagName('body')[0];

	// Add Notification Wrapper
	var notificationsFullWrapper = Notification('getElement', 'notificationsWrapper');
	if(notificationsFullWrapper == null){
		notificationsFullWrapper = document.createElement("div");
		notificationsFullWrapper.id = Notification('getElementId', 'notificationsWrapper');
		notificationsFullWrapper.className = 'jModNotificationsFullWrapper jmod-na jmod-fa';
		document.body.appendChild(notificationsFullWrapper);
	}
	
	// Add Small Notification Wrapper
	var smallNotificationsContainer = Notification('getElement', 'notificationsSmallWrapper');
	if(smallNotificationsContainer == null){
		smallNotificationsContainer = document.createElement("div");
		smallNotificationsContainer.id = Notification('getElementId', 'notificationsSmallWrapper');
		smallNotificationsContainer.className = 'jModSmallNotifications';
		notificationsFullWrapper.appendChild(smallNotificationsContainer);
	}
	
	// Add Large Notification Wrapper
	var largeNotificationsContainer = Notification('getElement', 'notificationsLargeWrapper');
	if(largeNotificationsContainer == null){
		largeNotificationsContainer = document.createElement("div");
		largeNotificationsContainer.id = Notification('getElementId', 'notificationsLargeWrapper');
		largeNotificationsContainer.className = 'jModNotifications';
		notificationsFullWrapper.appendChild(largeNotificationsContainer);
	}
}

jMod.CSS = <><![CDATACSS[
#jModSmallNotificationsWrapper, #jModNotificationsWrapper, .jmod-na .SmallBox span, .jmod-na .bigBox span {
	font-family: "Open Sans",Arial,Helvetica,sans-serif;
}

]]></>;
