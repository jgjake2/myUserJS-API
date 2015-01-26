// +@display_name  Fill Notification

+(function(Notification){
	var FillWrapperId = 'jModFillNotificationsWrapper';
	
	Notification.FillCount = 0;
	Object.defineProperty(Notification, 'CurrentFillCount', {
		get: function(){
			var fillNotificationsContainer = document.getElementById(FillWrapperId);
			return (jMod.$$('div[data-jmod-fill-notification]', fillNotificationsContainer)).length;
		},
		//writable: false
	});
	
	jMod.Notification.Types.add({
		name: 'fill',
		
		getWrapper: function(){
			return document.getElementById(FillWrapperId);
		},
		
		generateElement: function(data){

			var newNotification = {
				type: 'div',
				className: 'jModFillNotification',
				style: {
					backgroundColor: 'rgba(0, 0, 0, 0.8);'
				},
				innerHTML: [
					{
						type: 'div',
						className: 'MessageBoxMiddle',
						style: {},
						innerHTML: [
							{
								type: 'span',
								className: 'MsgTitle',
								innerHTML: data.title
							},
							{
								type: 'p',
								className: 'pText',
								innerHTML: data.body
							}
						]
					}
				]
			};
			
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
					newNotification.style.backgroundColor = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + (color.a || parseFloat(color.a) === 0.0 ? parseFloat(color.a) : '0.8') + ')';
			}
			
			var buttonSection = {
				type: 'div',
				className: 'MessageBoxButtonSection',
				style: {
					
				},
				innerHTML: [
					{
						type: 'button',
						className: 'btn btn-default btn-sm botTempo',
						innerHTML: 'Close',
						EventListeners: {
							click: function(e){
								if(this === e.target)
									jMod.Notification.close(e.target);
							}
						}
					}
				]
			};
			
			newNotification.innerHTML[0].innerHTML.push(buttonSection);
			
			var newNotificationContainer = {
				type: 'div',
				className: 'jModFillNotificationContainer animated fadeIn fast',
				innerHTML: [
					newNotification
				],
				attributes: {
					'data-jmod-notification': Notification.count,
					'data-jmod-notification-type': 'fill',
					'data-jmod-fill-notification': Notification.FillCount
				},
				EventListeners: {
					click: function(e){
						if(this === e.target){
							jMod.Notification.close(this);
							eventCancel(e);
							return false;
						}
					}
				}
			};
			
			return createNewElement(newNotificationContainer);
		},
		
		create: function(data){
			var fillNotificationsContainer = this.getWrapper();
			var newNotification = this.generateElement(data);
			fillNotificationsContainer.appendChild(newNotification);
			jMod.Notification.Events.addAll(data, jMod.Notification.count);
			jMod.Notification.count++;
			jMod.Notification.FillCount++;
		},
		
		close: function(el, num){
			Notification.Events.fire('onBeforeClose', num, null, el);
			removeClass(el, 'fadeIn');
			addClass(el, 'fadeOut');
			setTimeout(function(el, num){
				el.style.display = 'none';
				Notification.Events.fire('onAfterClose', num, null, el);
				el.parentElement.removeChild(el);
			}, 800, el, num);
		},
		
		init: function(){
			// Add Fill Notification Wrapper
			var notificationsFullWrapper = Notification('getElement', 'notificationsWrapper');
			var fillNotificationsContainer = this.getWrapper();
			if(fillNotificationsContainer == null){
				fillNotificationsContainer = document.createElement("div");
				fillNotificationsContainer.id = FillWrapperId;
				fillNotificationsContainer.className = 'jModFillNotifications';
				fillNotificationsContainer.style.position = 'absolute';
				//fillNotificationsContainer.style.display = 'none';
				notificationsFullWrapper.appendChild(fillNotificationsContainer);
			}
		}
	});

})(jMod.Notification);