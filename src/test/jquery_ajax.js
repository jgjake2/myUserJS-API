
if($){
	$(document).ready(function() {
		function test_jQueryFunctions(){
			jMod.jQueryExtensions.addCrossOriginSupport($);
			//jMod.jQueryExtensions.exportCrossOriginSupport($);
			
			// Test $.ajax()
			console.log('Test $.ajax("http://google.com")');
			$.ajax({
					url: 'http://google.com',
					contentType: 'text/html',
					type: 'GET',
					dataType: 'html',
					onprogress: function(response){
						console.log('onprogress response', response);
					},
					onreadystatechange: function(response){
						console.log('onreadystatechange response', response);
					}
				})
				.done(function(data, textStatus, jqXHR) {
					console.log("$.ajax() success: ", jqXHR);
				})
				.fail(function() {
					console.log("$.ajax() error");
				});
			
			// Test $(element).load()
			console.log('Test $(element).load("http://google.com #hplogo")');
			var tmpDiv = document.createElement('div');
			tmpDiv.id = 'tmpDiv';
			document.body.appendChild(tmpDiv);
			
			$('#tmpDiv').load('http://google.com #hplogo', function(responseText, textStatus, jqXHR){
				console.log('$(element).load() ' + textStatus, jqXHR);
			});
		}

		test_jQueryFunctions();
	});
} else {
	console.log('Test Failed! No jQuery');
}
