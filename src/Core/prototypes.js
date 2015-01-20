// +@display_name  Proto
// +@history (0.0.9) History begins.
// +@history (0.0.13) Fixed mCloneInto return value.
// +@history (0.0.14) Added URLBuilder Class.
// +@history (0.0.14) Updated URLBuilder so instanceof can be used.
// +@history (0.0.15) Added jMod.Extend.
	
	// URL Builder Class
	RequireScript('Core.URLBuilder');
	
	// Versions Class
	RequireScript('Core.Versions');
	
	// isElement
	RequireScript('Core.Element.isElement');
	
	// Parse Stack
	RequireScript('Core.ParseStack');
	
	// ExportFunction
	RequireScript('Core.ExportFunction');
	
	// CloneInto
	RequireScript('Core.CloneInto');
	
	// Object Prototypes
	RequireScript('Core.prototypes.Object');
	
	function eventCancel(e){
		if(!e)
		if(window.event)
			e = window.event;
		else
			return;
		if(e.cancelBubble != null) e.cancelBubble = true;
		if(e.stopPropagation) e.stopPropagation();
		if(e.preventDefault) e.preventDefault();
		if(window.event) e.returnValue = false;
		if(e.cancel != null) e.cancel = true;
	}
	
	/***********************************
	 ** Types/TypeOf
	 **********************************/
	ImportScript('Core.TypeOf');
	
	/***********************************
	 ** Extend
	 **********************************/
	ImportScript('Core.Extend');
	
	/***********************************
	 ** Browser
	 **********************************/
	ImportScript('Core.Browser');
	
	
	/*! https://github.com/tysonmatanich/viewportSize */
	/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
	unsafeWindow.viewportSize = {};

	unsafeWindow.viewportSize.getHeight = function () {
		return getSize("Height");
	};

	unsafeWindow.viewportSize.getWidth = function () {
		return getSize("Width");
	};

	var getSize = function (Name) {
		var size;
		var name = Name.toLowerCase();
		var document = unsafeWindow.document;
		var documentElement = document.documentElement;
		if (unsafeWindow["inner" + Name] === undefined) {
			// IE6 & IE7 don't have window.innerWidth or innerHeight
			size = documentElement["client" + Name];
		}
		else if (unsafeWindow["inner" + Name] != documentElement["client" + Name]) {
			// WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy

			// Insert markup to test if a media query will match document.doumentElement["client" + Name]
			var bodyElement = document.createElement("body");
			bodyElement.id = "vpw-test-b";
			bodyElement.style.cssText = "overflow:scroll";
			var divElement = document.createElement("div");
			divElement.id = "vpw-test-d";
			divElement.style.cssText = "position:absolute;top:-1000px";
			// Getting specific on the CSS selector so it won't get overridden easily
			divElement.innerHTML = "<style>@media(" + name + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + name + ":7px!important}}</style>";
			bodyElement.appendChild(divElement);
			documentElement.insertBefore(bodyElement, document.head);

			if (divElement["offset" + Name] == 7) {
				// Media query matches document.documentElement["client" + Name]
				size = documentElement["client" + Name];
			}
			else {
				// Media query didn't match, use window["inner" + Name]
				size = unsafeWindow["inner" + Name];
			}
			// Cleanup
			documentElement.removeChild(bodyElement);
		}
		else {
			// Default to use window["inner" + Name]
			size = unsafeWindow["inner" + Name];
		}
		return size;
	};

	