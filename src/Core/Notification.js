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
		if(data.type)
			Notification.Types.create(data.type.toLowerCase(), data);
	}
}

Notification.Types = {
	types: {},
	
	add: function(obj){
		this.types[obj.name] = obj;
	},
	
	callMethod: function(typeName, methodName){
		if(_undefined!==typeof this.types[typeName] && typeof this.types[typeName][methodName]==="function"){
			return this.types[typeName][methodName].apply(this.types[typeName], Slice.call(arguments,2));
		}
	},
	
	create: function(typeName, data){
		this.callMethod(typeName, 'create', data);
	},
	
	init: function(){
		for(var name in this.types){
			this.callMethod(name, 'init');
		}
	}
};

ImportScript('Core.Notification.Large');

ImportScript('Core.Notification.Small');

ImportScript('Core.Notification.Fill');

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
		
		case 'fillwrapper':
		case 'notificationsfillwrapper':
			return "jModFillNotificationsWrapper";
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

Notification.Events = new EventsClass(['onBeforeClose', 'onAfterClose']);

Notification.close = function(data){
	var notificationsFullWrapper = Notification('getElement', 'notificationsWrapper');
	var el, num, type, attName = 'data-jmod-notification';
	if(typeof data === "number") {
		num = data;
		el = jMod.$('div['+attName+'="'+data+'"]', notificationsFullWrapper);

	} else if(isElement(data)) {
		if(data.hasAttribute(attName))
			el = data;
		else {
			if(!(el = jMod.$('div['+attName+']', data))){
				if(!(el = jMod.Element.findParentWithAttribute(data, attName)))
					return;
			}
		}
		num = parseInt(el.getAttribute(attName));
	} else {
		return;
	}
	
	if(type = el.getAttribute('data-jmod-notification-type'))
		Notification.Types.callMethod(type, 'close', el, num);
}

Notification.count = 0;
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
	
	Notification.Types.init();
}

jMod.CSS = <><![CDATACSS[

]]></>;
