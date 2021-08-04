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
	<dt><a href="#resources">Resources</a></dt>
	<dd>
		<ul>
			<li>
				<a href="#javascript">Javascript</a>
				<ul>
					<li><a href="#jQuery">jQuery</a></li>
					<li><a href="#UAParser">UAParser</a></li>
				</ul>
			</li>
			<li>
				<a href="#css">CSS</a>
				<ul>
					<li><a href="#Bootstrap">Bootstrap</a></li>
					<li><a href="#FontAwesome">Font Awesome</a></li>
					<li><a href="#css_other">Other</a></li>
				</ul>
			</li>
		</ul>
	</dd>
	<dt><a href="#todo">ToDo / Goals</a></dt>
	<dd>
		<ul>
			<li>
				<a href="#todo_exportCrossOriginSupport">exportCrossOriginSupport</a>
			</li>
			<li>
				<a href="#todo_mCloneInto">mCloneInto</a>
			</li>
			<li>
				<a href="#todo_CSS">CSS</a>
			</li>
		</ul>
	</dd>
	<dt><a href="#todo">License</a></dt>
	<dd></dd>
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
	<a href="https://jmod.info/images/jMod_Events_Log.png">
		<img width="80%" align="center" src="https://jmod.info/images/jMod_Events_Log.png" alt="jMod Event Log">
	</a>
	<div align="center">jMod Event Log</div>
</div>

<br /><br />
<a name="jMod_Settings"></a>
##Settings
**[Settings Demo](http://myuserjs.org/API/Demo/settings.html)**<br />
**[Tutorial](http://doc.myuserjs.org/tutorial-jMod-tutorial.html#settings_example)**

<div align="center">
	<a href="https://jmod.info/images/jMod_Settings_Example.png">
		<img src="https://jmod.info/images/jMod_Settings_Example.png" alt="jMod Settings Example" width="80%" align="center">
	</a>
	<div align="center">jMod Settings Example</div>
</div>

<br /><br />
<a name="jMod_Notifications"></a>
##Notifications

<div align="center">
	<a href="https://jmod.info/images/jMod_Notification_Example.png" name="notification_example_image">
		<img src="https://jmod.info/images/jMod_Notification_Example.png" alt="jMod Notifications Example" width="50%" align="center">
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


<a name="resources"></a>
#Resources
A list of any/all resources used by jMod that I did not personally write.

<a name="javascript"></a>
##Javascript

<a name="jQuery"></a>
###[jQuery](http://jquery.com/)
<b>jMod.extend()</b>:<br />
jMod uses a modified version of jQuery's extend function for copying/cloning an object onto another. However, jMod's version takes scope and permissions into account and ensures no errors occur.

<a name="UAParser"></a>
###[UAParser](https://github.com/faisalman/ua-parser-js)
jMod uses UAParser to identify the user's browser type/version.

<a name="css"></a>
##CSS
jMod loads in fully namespaced versions of several popular CSS libraries. They will not interact or change the web page in any way until the namespace is added to an element.

<a name="Bootstrap"></a>
###[Bootstrap 3.3.2](http://getbootstrap.com/)
The bootstrap stylesheet is namespaced with the class "<b>.jmod-na</b>". Many of its standard components have been removed, while others have been heavily modified. For example, tooltip classes have been renamed to avoid having the content page's Bootstrap instance try and interact with it.

<a name="FontAwesome"></a>
###[Font Awesome 4.3.0](http://fortawesome.github.io/Font-Awesome/)
The bootstrap stylesheet is namespaced with the class "<b>.jmod-fa</b>", and defines the font-face as "<b>jModFontAwesome</b>". It doesn't use the same namespace as the other libraries to avoid overriding a page's font awesome instance when doing so is undesirable.

<a name="css_other"></a>
###Other
 * [Animate.css](http://daneden.github.io/animate.css/)
 * [LESS Elements](http://lesselements.com)

<a name="todo"></a>
#ToDo / Goals

- [x] <a name="todo_exportCrossOriginSupport"></a><b>jMod.jQueryExtensions.addCrossOriginSupport</b><br />I need to add a version called <b>jMod.jQueryExtensions.exportCrossOriginSupport</b>. This would an exported function instead of adding the functions directly. This is for users that want to add cross origin support to a jQuery instance in the public scope from a privileged script. This will prevent any errors caused by an unsafe function trying to indirectly call GM_xmlhttpRequest.<br /><br />This would, from the script author's perspective, work exactly the same as addCrossOriginSupport. However, a function has to be exported (via <b>ExportFunction</b>) to the public scope. This function is what jQuery will actually call, which itself calls the real function available inside jMod.
- [ ] <a name="todo_mCloneInto"></a><b>mCloneInto</b><br />This jMod cloning function needs a better method for cloning objects when <b>cloneInto</b> is unavailable / not working. I have already created a function called <b>jMod.CloneProperties</b> that can clone an object in a manor similar to jQuery's <b>extend</b> method. However, CloneProperties copies non-enumerable properties and reconstructs their property constructors manually. This is a start, but it still needs a lot of work before it can be put into production.
- [x] <a name="todo_CSS"></a><b>CSS</b><br />Trim down and clean up CSS.

<a name="license"></a>
#License
jMod is licensed under the GNU General Public License v3. See the file /COPYING for the complete terms of this license.

Third parties are welcome to modify and redistribute jMod in entirety or parts according to the terms of this license, and welcomes patches for improvements or bug fixes.
