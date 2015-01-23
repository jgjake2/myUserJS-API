jMod
========
**[Click Here For Full Documentation](http://doc.myuserjs.org/)**<br />
[Settings Demo](http://myuserjs.org/API/Demo/settings.html)

jMod is a library of useful tools for userscript authors with features ranging from popup notifications, to a full settings dialog generator.

<dl>
	<dt><a href="#overview">Overview</a></dt>
	<dd>
		<ul>
			<li>
				<a href="#jMod_Events">Events</a>
			</li>
			<li>
				<a href="#jMod_Settings">Settings</a>
			</li>
			<li>
				<a href="#jMod_Notifications">Notifications</a>
			</li>
			<li>
				<a href="#jMod_jQuery">jQuery</a>
				<ul>
					<li><a href="#jMod_jQuery_xmlhttpRequest">GM_xmlhttpRequest in jQuery Ajax Requests</a></li>
				</ul>
			</li>
		</ul>
	</dd>
</dl>

<a name="overview"></a>
##Overview

Lightweight and versatile, jMod can be loaded anywhere without having to worry about the native CSS affecting the UI. jMod loads a FULLY namespaced bootstrap stylesheet that has been trimmed down to its bare essentials. Thats it! jMod does not depend on jQuery. However, loading a copy of jQuery can enhance several of its features.

jMod can be loaded as a required script in your meta block, or as a script element.

<a name="jMod_Events"></a>
##Events
**[Full List of jMod Events](http://doc.myuserjs.org/tutorial-jMod-tutorial.html#standard_events_table)**

One of jMod's most useful features is handling loading events for you. When run at "document-start", scripts actually execute before the DOM exists. This prevents you from interacting with the document until it is created. jMod takes care of this for you.

```javascript
jMod.CSS = 'custom css'; // Added to CSS stack until DOM exists

// Start DOM interactions
function onDOMReadyCB(){
	console.log('onDOMReadyCB');
}
jMod.onDOMReady = onDOMReadyCB;

// jMod fully initialized
function onReadyCB(){
	console.log('onReadyCB');
}
jMod.onReady = onReadyCB;

// Page is ready
function onPageReadyCB(){
	console.log('onPageReadyCB');
}
jMod.onPageReady = onPageReadyCB;

// Page is loaded
function loadCB(){
	console.log('loadCB');
}
jMod.load = loadCB;
```

The following four methods are all functionally equivalent:
```javascript
// Execute function when jMod is fully loaded and CSS is added
jMod.onReady = function(){
	console.log('onReady');
}
```
```javascript
jMod(function(){
	console.log('onReady');
});
```
```javascript
jMod('onReady', function(){
	console.log('onReady');
});
```
```javascript
jMod.Events.addListener('onReady', function(){
	console.log('onReady');
}, true);
```

<div align="center">
	<a href="http://myuserjs.org/img/jMod/jMod_Events_Log.png">
		<img width="80%" align="center" src="http://myuserjs.org/img/jMod/jMod_Events_Log.png" alt="jMod Event Log">
	</a>
	<div align="center">jMod Event Log</div>
</div>

<br /><br />
<a name="jMod_Settings"></a>
##Settings
**[Settings Demo](http://myuserjs.org/API/Demo/settings.html)**<br />
**[Tutorial](http://doc.myuserjs.org/tutorial-jMod-tutorial.html#settings_example)**

<div align="center">
	<a href="http://myuserjs.org/img/jMod/jMod_Settings_Example.png">
		<img src="http://myuserjs.org/img/jMod/jMod_Settings_Example.png" alt="jMod Settings Example" width="80%" align="center">
	</a>
	<div align="center">jMod Settings Example</div>
</div>

<br /><br />
<a name="jMod_Notifications"></a>
##Notifications

<div align="center">
	<a href="http://myuserjs.org/img/jMod/jMod_Notification_Example.png" name="notification_example_image">
		<img src="http://myuserjs.org/img/jMod/jMod_Notification_Example.png" alt="jMod Notifications Example" width="50%" align="center">
	</a>
	<div align="center">jMod Notifications Example</div>
</div>


<a name="jMod_jQuery"></a>
##jQuery
Although jMod is designed to run without using jQuery, there are a few jQuery specific enhancements built in.

<a name="jMod_jQuery_xmlhttpRequest"></a>
###GM_xmlhttpRequest in jQuery Ajax Requests
jMod can extend any instance of jQuery to use **GM_xmlhttpRequest** as its default data transmission method. This allows you to reliably make cross-origin requests without any additionally flags. Doing this affects every ajax request made by jQuery.

[Documentation](http://doc.myuserjs.org/jMod.jQueryExtensions.html)
```javascript
if($){
	$(document).ready(function() {
		function test_jQueryFunctions(){
			jMod.jQueryExtensions.addCrossOriginSupport($);
			
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
```