// +@display_name  Content Eval
// +@history (0.0.13) History begins.

//+(function(){

jMod.API.contentEval = function(source) {
	// Check for function input.
	if ('function' == typeof source) {
		// Execute this function with no arguments, by adding parentheses.
		// One set around the function, required for valid syntax, and a
		// second empty set calls the surrounded function.
		source = '(' + source + ')();'
	}
	var doc = jMod.Element.document,
		head = jMod.Element.head,
		// Create a script node holding this source code.
		script = doc.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;

	// Insert the script node into the page, so it will run, and immediately
	// remove it to clean up.
	head.appendChild(script);
	head.removeChild(script);
};

//})();