// +@insert          after:end

jMod.onPageReady = function(){
	console.log('jMod.Notification Test');
	
	var tOnBeforeCloseCB = function(a, b){
		console.log('tOnBeforeCloseCB', a, b);
	}

	var tOnAfterCloseCB = function(a, b){
		console.log('tOnAfterCloseCB', a, b);
	}
	
	jMod.Notification({
		'title': 'Anti-Pagination v0.0.14 Available!',
		'body': '<i class="fa fa-clock-o"></i> <i>2 hours ago...</i>',
		'footer': '<a class="btn btn-success btn-sm" href="javascript:void(0);" onClick="console.log(\'a btn click\');(arguments[0] || window.event).stopPropagation();return false;">Install</a>'+
					'<a class="btn btn-primary btn-sm" href="javascript:void(0);" target="_blank">Visit Page</a>'+
					'<a class="btn btn-danger btn-sm" href="javascript:void(0);">Close</a>',
		'icon': 'fa-download',
		'type': 'small',
		'onBeforeClose': tOnBeforeCloseCB,
		'onAfterClose': tOnAfterCloseCB
	});
	
	/*
	jMod.Notification('UpdateNotification', {
		'version': '1.2.3',
		//'script_name': 'foo bar',
		'time': '123',
		'visit': {
			'onClick': function(e){
				console.log('Visit Clicked!!', e);
				//e.stopPropagation();
				//return false;
				eventCancel(e);
			}
		}
	});
	*/
	
	jMod.Notification({
		'title': 'James Simmons liked your comment 2',
		'body': '<i class="fa fa-clock-o"></i> <i>66 seconds ago...</i>',
		'icon': 'fa-thumbs-up',
		'type': 'small',
		'background': 'rgb(199, 145, 33)'
	});
	
	jMod.Notification({
		'title': 'James Simmons liked your comment 3',
		'body': '<i class="fa fa-clock-o"></i> <i>66 seconds ago...</i>',
		'icon': 'fa-thumbs-up',
		'type': 'small',
		'background': 'rgb(199, 145, 33, 0.2)'
	});
	
	
	
	jMod.Notification({
		'title': 'James Simmons liked your comment 4',
		'body': '<i class="fa fa-clock-o"></i> <i>99 seconds ago...</i>',
		'icon': 'fa-bell',
		'type': 'fill',
		'background': {
			color: 'rgb(199, 145, 33)',
			opacity: '0.3'
		}
		
	});
	
	jMod.Notification({
		'title': 'James Simmons liked your comment 4',
		'body': '<i class="fa fa-clock-o"></i> <i>99 seconds ago...</i>',
		'icon': 'fa-bell',
		'type': 'large',
		'background': 'rgb(199, 145, 33, 0.5)',
	});


}