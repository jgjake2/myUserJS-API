// +@insert          after:jMod.INIT

jMod.onPageReady = function(){

	console.log('jMod.Modal Test');
	var testModal1 = jMod.Modal({
		title: 'foo',
		body: '' +
			'<div class="tabbable tabs-left">' +
				'<ul class="nav nav-tabs">' +
					'<li class="active"><a href="#a" data-toggle="tab">One</a></li>' +
					'<li><a href="#b" data-toggle="tab">Two</a></li>' +
				'</ul>' +
				'<div class="tab-content">' +
					'<div class="tab-pane active" id="a">Content One.</div>' +
					'<div class="tab-pane" id="b">Content Two.</div>' +
				'</div>' +
			'</div>',
		buttons: [
			{
				text: 'custom button',
				className: 'btn btn-warning',
				EventListeners: {
					click: function(){
						console.log('custom button click');
					}
				}
			}
		],
		onBeforeHide: function(modal, modalNum, triggerEvent){
			console.log('onBeforeHide CB:', modal, modalNum, triggerEvent);
			setTimeout(function(modalNum){
				jMod.Modal.show(modalNum);
			}, 2500, modalNum);
		},
		style: {
			width: "1000px"
		},
		features: {
			enableTabs: true
		}
	}, true);
	
	var testModal2 = jMod.Modal({
		title: 'bar',
		buttons: [
			{
				text: 'custom button2',
				className: 'btn btn-warning',
				EventListeners: {
					click: function(){
						console.log('custom button2 click');
					}
				}
			}
		],
		onBeforeHide: function(modal, modalNum, triggerEvent){
			console.log('onBeforeHide CB2:', modal, modalNum, triggerEvent);
		}
	}, false);
	
	/*
	setTimeout(function(testModal2){
		jMod.Modal('show', testModal2);
	}, 2500, testModal2);
	
	setTimeout(function(testModal1){
		jMod.Modal('show', testModal1);
	}, 5000, testModal1);
	*/
}
		