jMod
=========

[Click Here For Full Documentation](http://doc.myuserjs.org/)

[Settings Demo](http://myuserjs.org/API/Demo/settings.html)

jMod is a library of useful tools for userscript authors with features ranging from popup notifications, to a full settings dialog generator.

Lightweight and versatile, it can be loaded anywhere without having to worry about the native CSS affecting the UI. jMod loads a FULLY namespaced bootstrap stylesheet that has been trimmed down to its bare essentials. Thats it! jMod does not depend on jQuery. However, loading a copy of jQuery can enhance several of its features.

jMod can be loaded as a required script in your meta block, or as a script element.

One of jMod's most useful features is handling loading events for you. When run at "document-start", scripts actually execute before the DOM exists. This prevents you from interacting with the document until it is created. jMod takes care of this for you.

```javascript
jMod.CSS = 'custom css'; // Added to CSS stack until DOM exist

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
*[Full List of jMod Events](http://doc.myuserjs.org/tutorial-jMod-tutorial.html#standard_events_table)*
<div align="center">
	<a href="http://myuserjs.org/img/jMod/jMod_Events_Log.png">
		<img width="80%" align="center" src="http://myuserjs.org/img/jMod/jMod_Events_Log.png" alt="jMod Event Log">
	</a>
	<div align="center">jMod Event Log</div>
</div>

<br /><br />
<div align="center">
	<a href="http://myuserjs.org/img/jMod/jMod_Settings_Example.png">
		<img src="http://myuserjs.org/img/jMod/jMod_Settings_Example.png" alt="jMod Settings Example" width="80%" align="center">
	</a>
	<div align="center">jMod Settings Example</div>
</div>

