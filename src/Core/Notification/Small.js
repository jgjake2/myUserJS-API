// +@display_name  Small Notification

+(function(Notification){
	var SmallWrapperId = 'jModSmallNotificationsWrapper';
	
	Notification.SmallCount = 0;
	Object.defineProperty(Notification, 'CurrentSmallCount', {
		get: function(){
			var smallNotificationsContainer = document.getElementById(SmallWrapperId);
			return (jMod.$$('div[data-jmod-small-notification]', smallNotificationsContainer)).length;
		},
		//writable: false
	});
	
	jMod.Notification.Types.add({
		name: 'small',
		
		getWrapper: function(){
			return document.getElementById(SmallWrapperId);
		},
		
		generateElement: function(data){
			var tmpTop = 25;
			var totalCount = Notification.CurrentSmallCount;
			if(totalCount > 0){
				var tHeight = totalCount * 25;
				var smallNotificationsContainer = Notification('getElement', 'notificationsSmallWrapper');
				var smNotes = smallNotificationsContainer.querySelectorAll('div[data-jmod-small-notification]');
				for(var i = 0; i < smNotes.length; i++){
					tHeight += parseInt(smNotes[i].offsetHeight);
				}
				tmpTop += (tHeight);
			}

			var newNotification = {
				type: 'div',
				className: 'jModSmallNotification animated fadeIn',
				style: {
					top: tmpTop + 'px'
				},
				innerHTML: [],
				attributes: {
					'data-jmod-notification': Notification.count,
					'data-jmod-notification-type': 'small',
					'data-jmod-small-notification': Notification.SmallCount
				},
				EventListeners: {
					click: function(e){
						var tCount = 0;
						var tParent = e.target;
						while(!tParent.hasAttribute('data-jmod-small-notification') && tParent != null && tCount < 20){
							tParent = tParent.parentElement;
							tCount++;
						}
						if(tParent != null){
							var notificationNum = parseInt(tParent.getAttribute('data-jmod-notification'));
							var smallNotificationNum = parseInt(tParent.getAttribute('data-jmod-small-notification'));
							jMod.Notification.close(tParent);
						}
					}
				}
			}
			
			// Background
			var bgColor = parseColorString('rgba(50, 118, 177, 0.8)'),
				tmp;
			if(data.background){
				if(typeof data.background === "object"){
					if(EXISTS(data.background.color)){
						if(tmp = parseColorString(data.background.color)){
							if(tmp.a == null)
								tmp.a = bgColor.a;
							bgColor = tmp;
						}
					}
					
					if(EXISTS(data.background.opacity)){
						bgColor.a = data.background.opacity;
					}
				} else {
					if(tmp = parseColorString(data.background)){
						if(tmp.a == null)
							tmp.a = bgColor.a;
						bgColor = tmp;
					}
				}
			}
			
			if(bgColor)
				newNotification.style.backgroundColor = 'rgba(' + bgColor.r + ', ' + bgColor.g + ', ' + bgColor.b + ', ' + (bgColor.a) + ')';
			
			var newNotificationContent = {
				type: 'div',
				className: '',
				innerHTML: [],
				style: {}
			}
			
			if(typeof data.footer === _undefined)
				newNotificationContent.className += ' NotificationContent';
			else{
				newNotificationContent.className += ' NotificationContent';
				
				var largeIcon = document.createElement("div");
				largeIcon.className = 'largeIcon';
				if(isElement(data.icon)){
					largeIcon.appendChild(data.icon);
				} else {
					largeIcon.innerHTML = '<i class="fa ' + data.icon + ' '+(data.iconAnimation || 'bounce')+' animated"> </i>';
				}
				
				newNotification.innerHTML.push(largeIcon);
			}
			
			if(typeof data.title !== _undefined){
				newNotificationContent.innerHTML.push({
					type: 'span',
					innerHTML: data.title
				});
			}
			
			newNotificationContent.innerHTML.push({
				type: 'p',
				innerHTML: data.body
			});
			
			if(typeof data.icon !== _undefined){
				newNotificationContent.innerHTML.push({
					type: 'div',
					className: 'smallIcon',
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
			
			newNotification.innerHTML.push(newNotificationContent);
			
			return createNewElement(newNotification);
		},
		
		create: function(data){
			var smallNotificationsContainer = this.getWrapper();
			var newNotification = this.generateElement(data);
			smallNotificationsContainer.appendChild(newNotification);
			jMod.Notification.Events.addAll(data, jMod.Notification.count);
			jMod.Notification.count++;
			jMod.Notification.SmallCount++;
		},
		
		close: function(el, num){
			Notification.Events.fire('onBeforeClose', num, null, el);
			var top = parseInt(el.style.top);
			var tSib = el;
			removeClass(el, 'fadeIn');
			addClass(el, 'fast');
			addClass(el, 'fadeOut');
			
			while(tSib.nextElementSibling != null && tSib.nextElementSibling.hasAttribute('data-jmod-small-notification')){
				tSib = tSib.nextElementSibling;
				addClass(tSib, 'transitionUp');
				setTimeout(function(sib, top){
					sib.style.top = top + 'px';
				},0,tSib,top);
				top = top + parseInt(tSib.offsetHeight) + 25;
			}
			
			setTimeout(function(el, num){
				el.style.display = 'none';
				Notification.Events.fire('onAfterClose', num, null, el);
				el.parentElement.removeChild(el);
			}, 1000, el, num);
			
			
		},
		
		init: function(){
			// Add Small Notification Wrapper
			var notificationsFullWrapper = Notification('getElement', 'notificationsWrapper');
			var smallNotificationsContainer = this.getWrapper();
			if(smallNotificationsContainer == null){
				smallNotificationsContainer = document.createElement("div");
				smallNotificationsContainer.id = SmallWrapperId;
				smallNotificationsContainer.className = 'jModSmallNotifications';
				notificationsFullWrapper.appendChild(smallNotificationsContainer);
			}
		}
	});
	
})(jMod.Notification);