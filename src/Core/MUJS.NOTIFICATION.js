// +@display_name  Notifications
// +@replace  MUJS.NOTIFICATION
// +@history (0.0.14) History begins.

/**
 * Notification Configuration Options
 * @name Notifications
 * @alias Notifications
 * @memberof MUJS.Config
 * @property {boolean} enabled is enabled
 * @example
 * // Get the current value of Notifications.enabled
 * MUJS('get', 'Notifications.enabled')
 * // or
 * MUJS.config('Notifications.enabled');
 * // or
 * MUJS.Config.Notifications.enabled;
 */
MUJS.Config.Notifications = {
	enabled: true
}

/**
 * @namespace MUJS.Notification
 * @memberOf MUJS
 * @since 0.0.14
 * @todo Clean up Notification loading process
 * @example
 * // Show an update notification
 * MUJS.Notification('UpdateNotification', {
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
 * MUJS.Notification({
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
	
	// New Notification
	var newNotification = document.createElement("div");
	newNotification.setAttribute('data-mujs-notification', MUJS.Notification.count);
	newNotification.setAttribute('data-mujs-large-notification', MUJS.Notification.LargeCount);
	newNotification.className = 'MUJSLargeNotification bigBox animated fadeIn';
	// Background
	if(typeof data.background !== "undefined")
		newNotification.style.background = data['background'];
	if(typeof data['background-color'] !== "undefined")
		newNotification.style.backgroundColor = data['background-color'];
	else
		newNotification.style.backgroundColor ='rgb(50, 118, 177)';
	
	var newNotificationContent = document.createElement("div");
	newNotificationContent.className = '';
	
	// Close Button
	var btnClose = document.createElement("i");
	btnClose.setAttribute('class', 'botClose fa fa-times');
	btnClose.setAttribute('id', 'MUJSbtnClose'+MUJS.Notification.LargeCount);
	btnClose.addEventListener("click", function(e){
		var notification = e.target.parentElement.parentElement;
		var notificationNum = parseInt(notification.getAttribute('data-mujs-notification'));
		var largeNotificationNum = parseInt(notification.getAttribute('data-mujs-large-notification'));
		MUJS.Notification.close(notification, 'large', notificationNum, largeNotificationNum, e);
	});
	newNotificationContent.appendChild(btnClose);
	
	// Title
	var title = document.createElement('span');
	title.className = '';
	if(typeof data.title !== "undefined"){
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
	if(typeof data.body !== "undefined"){
		if(isElement(data.body)){
			bdy.appendChild(data.body);
		} else {
			bdy.innerHTML = data.body;
		}
	}
	newNotificationContent.appendChild(bdy);
	
	// Icon
	if(typeof data.icon !== "undefined"){
		var icon = document.createElement('div');
		icon.setAttribute('class', 'mujs-na bigboxicon');
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


function generateSmallNotificationElement(data){
	
	// New Notification
	var newNotification = document.createElement("div");
	newNotification.setAttribute('data-mujs-notification', MUJS.Notification.count);
	newNotification.setAttribute('data-mujs-small-notification', MUJS.Notification.SmallCount);
	newNotification.className = 'MUJSSmallNotification SmallBox animated fadeIn';
	// Background
	if(typeof data.background !== "undefined")
		newNotification.style.background = data['background'];
	if(typeof data['background-color'] !== "undefined")
		newNotification.style.backgroundColor = data['background-color'];
	else
		newNotification.style.backgroundColor ='rgb(41, 97, 145)';
	
	var totalCount = MUJS.Notification.CurrentSmallCount;
	if(totalCount > 0){
		var tHeight = totalCount * 25;
		var smallNotificationsContainer = MUJS.Notification('getElement', 'notificationsSmallWrapper');
		var smNotes = smallNotificationsContainer.querySelectorAll('div[data-mujs-small-notification]');
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
			while(!tParent.hasAttribute('data-mujs-small-notification') && tParent != null && tCount < 10){
				tParent = tParent.parentElement;
				tCount++;
			}
			if(tParent != null){
				var notificationNum = parseInt(tParent.getAttribute('data-mujs-notification'));
				var smallNotificationNum = parseInt(tParent.getAttribute('data-mujs-small-notification'));
				MUJS.Notification.close(tParent, 'small', notificationNum, smallNotificationNum, e);
			}
		//}
	}, false);
	//newNotificationContent.appendChild(newNotification);
	
	var newNotificationContent = document.createElement("div");
	if(typeof data.footer === "undefined")
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
	if(typeof data.title !== "undefined"){
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
	if(typeof data.body !== "undefined"){
		if(isElement(data.body)){
			bdy.appendChild(data.body);
		} else {
			bdy.innerHTML = data.body;
		}
	}
	newNotificationContent.appendChild(bdy);
	
	// Footer
	if(typeof data.footer !== "undefined"){
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
	if(typeof data.footer === "undefined" && typeof data.icon !== "undefined"){
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
 * @memberOf MUJS
 * @variation 2
 * @param {string|object} data Command to execute or notification data
 * @param {...*} [data2]
 * @see MUJS.Notification
 */
MUJS.fn.Notification = function(data, data2){
	if(!MUJS('get', 'Notifications.enabled'))
		return false;
	if(!MUJS.Notification.Initialized){
		MUJS.Notification.init();
	}
	
	if(typeof data === "string"){
		switch(data.toLowerCase()){
			case 'get':
			case 'getelement':
				return MUJS.Notification.getElement.apply(MUJS.Notification, Array.prototype.slice.call(arguments, 1));
				break;
			case 'getid':
			case 'getelementid':
				return MUJS.Notification.getElementId.apply(MUJS.Notification, Array.prototype.slice.call(arguments, 1));
				break;
			case 'updatenotification':
				return MUJS.Notification.UpdateNotification.apply(MUJS.Notification, Array.prototype.slice.call(arguments, 1));
				break;
		}
	} else if(typeof data === "object") {
		switch((data.type || '').toLowerCase()){
			case 'small':
				var smallNotificationsContainer = MUJS.Notification('getElement', 'notificationsSmallWrapper');
				var newNotification = generateSmallNotificationElement(data);
				smallNotificationsContainer.appendChild(newNotification);
				MUJS.Notification.Events.addAll(data, MUJS.Notification.count);
				MUJS.Notification.count++;
				MUJS.Notification.SmallCount++;
				break;
			case 'large':
			default:
				var largeNotificationsContainer = MUJS.Notification('getElement', 'notificationsLargeWrapper');
				var newNotification = generateLargeNotificationElement(data);
				largeNotificationsContainer.appendChild(newNotification);
				MUJS.Notification.Events.addAll(data, MUJS.Notification.count);
				MUJS.Notification.count++;
				MUJS.Notification.LargeCount++;
				break;
		}
	}
}

MUJS.Notification.UpdateNotification = function(data){
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
		options.script_name = MUJS('get', 'script.script_name');
	
	var title = options.title.replace('%SCRIPTNAME%', options.script_name).replace('%VERSION%', options.version).replace('%TIME%', options.time);
	var body = options.body.replace('%SCRIPTNAME%', options.script_name).replace('%VERSION%', options.version).replace('%TIME%', options.time);
	
	if(!options.install.href || options.install.href == null || options.install.href == ''){
		options.install.href = MUJS('get', ['script.script_info.MUJSdownloadURL', 'script.script_info.downloadURL']);
		if(typeof options.install.href === "undefined")
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
		if(typeof MUJS('get', 'script.script_info.homepage') !== "undefined")
			options.visit.href = MUJS('get', 'script.script_info.homepage');
		else
			options.visit.href = 'http://myuserjs.org/script/' + MUJS('get', 'script.username') + '/' + MUJS('get', 'script.script_name');
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
	
	MUJS.Notification({
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

MUJS.Notification.getElementId = function(name){
	switch(name.toLowerCase()){
		case 'wrapper':
		case 'notificationswrapper':
			return "MUJSNotificationsWrapper";
			break;
			
		case 'smallwrapper':
		case 'notificationssmallwrapper':
			return "MUJSSmallNotificationsWrapper";
			break;
			
		case 'largewrapper':
		case 'notificationslargewrapper':
			return "MUJSLargeNotificationsWrapper";
			break;
		
		default:
			return null;
			break;
	}
}

MUJS.Notification.getElement = function(name){
	var tId = MUJS.Notification.getElementId(name);
	if(tId != null)
		return document.getElementById(tId);
	return document.getElementById(name);
}

MUJS.Notification.remove = function(notification, notificationNumber){
	if(notification != null){
		if(notification.hasAttribute('data-mujs-small-notification')){
			var tSib = notification;
			var oldTop = parseInt(notification.style.top || 0);
			if(oldTop <= 0) oldTop = 20;
			while(tSib.nextElementSibling != null && tSib.nextElementSibling.hasAttribute('data-mujs-small-notification')){
				tSib = tSib.nextElementSibling;
				tSib.className = 'MUJSSmallNotification SmallBox transitionUp';
				tSib.style.top = oldTop + 'px';
				oldTop = oldTop + parseInt(tSib.offsetHeight) + 25;
			}
		}
		notification.parentElement.removeChild(notification);
	}
}

MUJS.Notification.close = function(notification, type, notificationNumber, typeNotificationNumber, event){
	if(notification != null){
		MUJS.Notification.Events.fire(notificationNumber, 'onBeforeClose', notification, event);
		switch(type.toLowerCase()){
			case 'large':
				notification.setAttribute('class', 'MUJSLargeNotification bigBox animated fadeOut fast');
				setTimeout(function(target, targetNum, e){
					MUJS.Notification.remove(target, targetNum);
					MUJS.Notification.Events.fire(targetNum, 'onAfterClose', target, e);
				}, 400, notification, notificationNumber, event);
				break;
			case 'small':
				notification.setAttribute('class', 'MUJSSmallNotification SmallBox animated fadeOut fast');
				setTimeout(function(target, targetNum, e){
					MUJS.Notification.remove(target, targetNum);
					MUJS.Notification.Events.fire(targetNum, 'onAfterClose', target, e);
				}, 400, notification, notificationNumber, event);
				break;
		}
	}
}

MUJS.Notification.Events = {
	'eventListeners': {},
	'events': ['onBeforeClose', 'onAfterClose'],
	add: function(notificationNum, eventName, callback){
		if(typeof this.eventListeners[notificationNum] === "undefined")
			this.eventListeners[notificationNum] = {};
			
		if(typeof this.eventListeners[notificationNum][eventName] === "undefined")
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
		if(typeof this.eventListeners[notificationNum] !== "undefined" && typeof this.eventListeners[notificationNum][eventName] !== "undefined"){
			if(typeof notification !== "undefined" && isElement(notification)){
				thisNotification = notification;
				args = Array.prototype.slice.call(arguments, 3);
			} else {
				thisNotification = document.querySelector('div[data-mujs-notification="'+notificationNum+'"]');
				if(thisNotification == null)
					thisNotification = unsafeWindow;
				args = Array.prototype.slice.call(arguments, 2);
			}
			args.unshift(eventName);
			while(typeof (tCB = this.eventListeners[notificationNum][eventName].shift()) !== "undefined"){
				tCB.apply(thisNotification, args);
			}
		}
	}
};

MUJS.Notification.count = 0;
MUJS.Notification.LargeCount = 0;
MUJS.Notification.SmallCount = 0;

Object.defineProperties(MUJS.Notification, {
	"CurrentLargeCount": {
		get: function(){
			var largeNotificationsContainer = MUJS.Notification('getElement', 'notificationsLargeWrapper');
			return (largeNotificationsContainer.querySelectorAll('div[data-mujs-large-notification]')).length;
		},
		//writable: false
	},
	"CurrentSmallCount": {
		get: function(){
			var smallNotificationsContainer = MUJS.Notification('getElement', 'notificationsSmallWrapper');
			return (smallNotificationsContainer.querySelectorAll('div[data-mujs-small-notification]')).length;
		},
		//writable: false
	}
});


MUJS.Notification.FontAwesomeAdded = false;
MUJS.Notification.OpenSansAdded = false;
MUJS.Notification.CSSAdded = false;
MUJS.Notification.WrapperAdded = false;
MUJS.Notification.SmallWrapperAdded = false;
MUJS.Notification.LargeWrapperAdded = false;
MUJS.Notification.Initialized = false;
//MUJS.Notification.CustomCSSAdded = false;



MUJS.Notification.init = function(){
	MUJS.Notification.Initialized = true;
	
	if(!MUJS('get', 'Notifications.enabled'))
		return false;
		
	var head = document.getElementsByTagName('head')[0];
	var body = document.getElementsByTagName('body')[0];

	// Add Notification Wrapper
	var notificationsFullWrapper = MUJS.Notification('getElement', 'notificationsWrapper');
	if(notificationsFullWrapper == null){
		notificationsFullWrapper = document.createElement("div");
		notificationsFullWrapper.id = MUJS.Notification('getElementId', 'notificationsWrapper');
		notificationsFullWrapper.className = 'MUJSNotificationsFullWrapper mujs-na mujs-fa';
		document.body.appendChild(notificationsFullWrapper);
	}
	MUJS.Notification.WrapperAdded = true;
	
	// Add Small Notification Wrapper
	var smallNotificationsContainer = MUJS.Notification('getElement', 'notificationsSmallWrapper');
	if(smallNotificationsContainer == null){
		smallNotificationsContainer = document.createElement("div");
		smallNotificationsContainer.id = MUJS.Notification('getElementId', 'notificationsSmallWrapper');
		smallNotificationsContainer.className = 'MUJSSmallNotifications';
		notificationsFullWrapper.appendChild(smallNotificationsContainer);
	}
	MUJS.Notification.SmallWrapperAdded = true;
	
	// Add Large Notification Wrapper
	var largeNotificationsContainer = MUJS.Notification('getElement', 'notificationsLargeWrapper');
	if(largeNotificationsContainer == null){
		largeNotificationsContainer = document.createElement("div");
		largeNotificationsContainer.id = MUJS.Notification('getElementId', 'notificationsLargeWrapper');
		largeNotificationsContainer.className = 'MUJSNotifications';
		notificationsFullWrapper.appendChild(largeNotificationsContainer);
	}
	MUJS.Notification.LargeWrapperAdded = true;
}

MUJS.Requirements.addElement({
	'type': 'link',
	'target': 'head',
	'attributes': {
		'href': '//myuserjs.org/css/smartadmin-production-all-namespaced.css',
		'rel': 'stylesheet'
	}
});

MUJS.Requirements.addGM({
	'type': 'style',
	'value': '@import url(//fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700);'
});

MUJS.CSS = <><![CDATACSS[
#MUJSSmallNotificationsWrapper, #MUJSNotificationsWrapper, .mujs-na .SmallBox span, .mujs-na .bigBox span {
	font-family: "Open Sans",Arial,Helvetica,sans-serif;
}
.mujs-na *, .mujs-na *:after, .mujs-na *:before {
    box-sizing: border-box;
}
.mujs-na .SmallBox p {
	margin-bottom: 9px;
}
.mujs-na .textoFoto > p:last-child > .btn:not(:last-child) {
	margin-right: 3px;
}
.mujs-na .foto {
	line-height: 1.42857;
}
.transitionUp {
	-webkit-transition-property: top;
	-moz-transition-property: top;
	-o-transition-property: top;
	transition-property: top;
	
	-webkit-transition-duration: 0.3s;
	-moz-transition-duration: 0.3s;
	-o-transition-duration: 0.3s;
	transition-duration: 0.3s;
}
.mujs-na a.btn {
	text-decoration: none;
}
]]></>;
