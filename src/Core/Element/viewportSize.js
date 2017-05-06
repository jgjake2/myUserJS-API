// +@display_name  Viewport Size

/*! https://github.com/tysonmatanich/viewportSize */
/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
jMod.Element.viewportSize = {
	getHeight: function () {
		return this.getSize("Height");
	},

	getWidth: function () {
		return this.getSize("Width");
	},

	getSize: function (Name) {
		var size;
		var name = Name.toLowerCase();
		var win = (window || unsafeWindow);
		var doc = jMod.Element.document;
		var head = jMod.Element.head;
		var documentElement = doc.documentElement;
		if (win["inner" + Name] === undefined) {
			// IE6 & IE7 don't have window.innerWidth or innerHeight
			size = documentElement["client" + Name];
		}
		else if (win["inner" + Name] != documentElement["client" + Name]) {
			// WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy

			// Insert markup to test if a media query will match document.doumentElement["client" + Name]
			var bodyElement = doc.createElement("body");
			bodyElement.id = "vpw-test-b";
			bodyElement.style.cssText = "overflow:scroll";
			var divElement = doc.createElement("div");
			divElement.id = "vpw-test-d";
			divElement.style.cssText = "position:absolute;top:-1000px";
			// Getting specific on the CSS selector so it won't get overridden easily
			divElement.innerHTML = "<style>@media(" + name + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + name + ":7px!important}}</style>";
			bodyElement.appendChild(divElement);
			documentElement.insertBefore(bodyElement, head);

			if (divElement["offset" + Name] == 7) {
				// Media query matches document.documentElement["client" + Name]
				size = documentElement["client" + Name];
			}
			else {
				// Media query didn't match, use window["inner" + Name]
				size = win["inner" + Name];
			}
			// Cleanup
			documentElement.removeChild(bodyElement);
		}
		else {
			// Default to use window["inner" + Name]
			size = win["inner" + Name];
		}
		return size;
	}
};