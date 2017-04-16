// +@display_name  Large Notification

+(function(Notification){
	var LargeWrapperId = 'jModSmallNotificationsWrapper';
	
	Notification.LargeCount = 0;
	Object.defineProperty(Notification, 'CurrentLargeCount', {
		get: function(){
			var largeNotificationsContainer = document.getElementById(LargeWrapperId);
			return (jMod.$$('div[data-jmod-large-notification]', largeNotificationsContainer)).length;
		},
		//writable: false
	});
	
	jMod.Notification.Types.add({
		name: 'large',
		
		getWrapper: function(){
			return document.getElementById(LargeWrapperId);
		},
		
		generateElement: function(data){
			var newNotification = {
				type: 'div',
				className: 'jModLargeNotification animated fadeIn fast',
				style: {},
				attributes: {
					'data-jmod-notification': Notification.count,
					'data-jmod-notification-type': 'large',
					'data-jmod-large-notification': Notification.LargeCount
				}
			}
			
			// Background
			if(data.background){
				var color;
				if(typeof data.background === "string"){
					if((color = parseColorString(data.background)) && EXISTS(data['background-opacity']))
						color.a = parseFloat(data['background-opacity']);
				} else if(typeof data.background === "object" && EXISTS(data.background.color)) {
					if((color = parseColorString(data.background.color)) && EXISTS(data.background.opacity))
						color.a = parseFloat(data.background.opacity);
				}
				if(color)
					newNotification.style.backgroundColor = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + (isNaN(parseFloat(color.a)) ? '0.8' : parseFloat(color.a)) + ')';
			}
			
			var newNotificationContent = {
				type: 'div',
				className: '',
				innerHTML: [
					{
						type: 'i',
						id: 'jModbtnClose'+Notification.LargeCount,
						className: 'btnClose fa fa-times',
						EventListeners: {
							'click':function(e){
								if(!hasClass(this, 'fadeOut')){
									Notification.close(e.target);
									try{
										this.removeEventListener('click', arguments.callee);
									}catch(e){}
								}
							}
						}
					}
				],
				style: {}
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
					className: 'jmod-na largeIcon',
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
		},
		
		create: function(data){
			var largeNotificationsContainer = this.getWrapper();
			var newNotification = this.generateElement(data);
			largeNotificationsContainer.appendChild(newNotification);
			jMod.Notification.Events.addAll(data, jMod.Notification.count);
			jMod.Notification.count++;
			jMod.Notification.LargeCount++;
		},
		
		close: function(el, num){
			Notification.Events.fire('onBeforeClose', num, null, el);
			removeClass(el, 'fadeIn');
			addClass(el, 'fadeOut');
			setTimeout(function(el, num){
				el.style.display = 'none';
				Notification.Events.fire('onAfterClose', num, null, el);
				el.parentElement.removeChild(el);
			}, 1000, el, num);
		},
		
		init: function(){
			// Add Large Notification Wrapper
			var notificationsFullWrapper = Notification('getElement', 'notificationsWrapper');
			var largeNotificationsContainer = this.getWrapper();
			if(largeNotificationsContainer == null){
				largeNotificationsContainer = document.createElement("div");
				largeNotificationsContainer.id = LargeWrapperId;
				largeNotificationsContainer.className = 'jModNotifications';
				notificationsFullWrapper.appendChild(largeNotificationsContainer);
			}
		}
	});
	
})(jMod.Notification);