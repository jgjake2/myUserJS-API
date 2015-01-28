// +@display_name  jQuery Tokenizer


+(function(){

	var nextRegex = <><![CDATAREGEX[
		^\s*
		(
			(?:
				(?:\:\w+\([^\)]+\))|
				[^\s\<\>\~\+\|]|
				[\<\>\~\+\|\^\$\*](?=\=.+\])
			)+
		)
		\s*(.*?)$
	]]></>;

	function getNext(str){
		if(!str || str.length < 3){
			return [str || ''];
		}
		
		var m = nextRegex.exec(str);
		
		return (m ? [m[1].trim(), m[2].trim()] : [str]);
	}
	
	/**
	 * Extend more than just jQuery's (aka sizzle) pseudo-selectors (ex ".class:selector"). With this you can
	 * completely override the main jQuery find function with a custom tokenizer. You can augment, or completely
	 * replace the default selector syntax.<br /><br />
	 * For example, you could add the token "++" to select all of an element's siblings that match a selector: $(".example ++ .sibling-class") or $(".example ++ *")<br />
	 * Or you could add "+>" and "+<" to match siblings that appear before and after the matched elements: $(".example +> .next-sibling") or $(".example +< .prev-sibling")<br />
	 * @function extendTokenizer
	 * @memberof jMod.jQueryExtensions
	 * @param {object} [_jQueryObj=jMod.jQuery] - jQuery object
	 * @example
	 * console.log('Test jQuery Tokenizer');
	 * var newEl = jMod.Element.createNewElement({
	 * 	id: 'testElement',
	 * 	innerHTML: [
	 * 		{
	 * 			className: 'tc1',
	 * 			innerHTML: [
	 * 				{
	 * 					className: 'tc1-1 childElement-1'
	 * 				},
	 * 				{
	 * 					className: 'tc1-2 childElement-1'
	 * 				},
	 * 				{
	 * 					className: 'tc1-3 childElement-1',
	 * 					innerHTML: {
	 * 						className: 'tc1-3-1 childElement-2',
	 * 						innerHTML: {
	 * 							className: 'tc1-3-1-1 childElement-3'
	 * 						}
	 * 					}
	 * 				}
	 * 			]
	 * 		},
	 * 		{
	 * 			className: 'tc2',
	 * 			innerHTML: [
	 * 				{
	 * 					className: 'tc2-1 childElement-1'
	 * 				},
	 * 				{
	 * 					className: 'tc2-3 childElement-1'
	 * 				}
	 * 			]
	 * 		},
	 * 		{
	 * 			className: 'tc3',
	 * 			innerHTML: [
	 * 				{
	 * 					className: 'tc3-1 childElement-1'
	 * 				}
	 * 			]
	 * 		}
	 * 	]
	 * });
	 * 
	 * document.body.appendChild(newEl);
	 * 
	 * console.log('Add Tokenizer');
	 * jMod.jQueryExtensions.extendTokenizer($);
	 * 
	 * console.log('Add Sibling Tokens');
	 * jMod.jQueryExtensions.addSiblingTokens($);
	 * 
	 * console.log("jQuery Find Function:");
	 * console.dir($.find);
	 * 
	 * // Test 1
	 * var test1 = $(".tc1-2 + .tc1-3");
	 * console.log('test: sibling matching ".tc1-3"', test1, test1.length == 1 ? "Pass!" : "Fail!");
	 * 
	 * // Test 2
	 * var test2 = $(".tc1-2 ++ *");
	 * console.log('test: all siblings', test2, test2.length == 2 ? "Pass!" : "Fail!");
	 * 
	 * // Test 3
	 * var test3 = $(".tc1-2 +< *");
	 * console.log('test: all previous siblings', test3, test3.length == 1 ? "Pass!" : "Fail!");
	 * 
	 * // Test 4
	 * var test4 = $(".tc1-2 +> *");
	 * console.log('test: all next siblings', test4, test4.length == 1 ? "Pass!" : "Fail!");
	 * 
	 * // Test 5
	 * var test5 = $(".tc1-2 ++ * .childElement-3");
	 * console.log('test: child of sibling with class name "childElement-3"', test5, test5.length == 1 ? "Pass!" : "Fail!");
	 * 
	 * // Test 6
	 * var test6 = $(".tc3 ++ * .childElement-1");
	 * console.log('test: child of sibling with class name "childElement-1"', test6, test6.length == 5 ? "Pass!" : "Fail!");
	 * 
	 * console.log('End Test jQuery Tokenizer');
	 */
	jMod.jQueryExtensions.extendTokenizer = function(_jQueryObj){
		if (
				(
					!_jQueryObj && // If no jQuery object, try to use global jQuery object
					!(_jQueryObj = jMod.jQuery) // If no global jQuery object, return
				) ||
				EXISTS(_jQueryObj.jModTokenizer) // if already extended, return
			) return;
		
		// Copy the old find function
		_jQueryObj._oldFindFn = _jQueryObj.find;
		
		// Replace the jQuery (aka sizzle) find function
		_jQueryObj.find = function(selector, context, results, seed){
			// reset context if undefined
			context = context || document || unsafeWindow.document;
			
			// new results array if results is undefined
			results = results || [];

			// If custom tokenizer is enabled, and if a custom token is detected in the selector
			if(_jQueryObj.jModTokenizer && _jQueryObj.find.jModTokens.regexTest.test(selector)){
				var i, j, x, t,
					firstToken, parts, ctx, tmp,
					next, tokenResults;
				// Split selector into individual pieces, and loop them
				parts = selector.split(',');
				for(x = 0; x < parts.length; x++){
					// Retest the piece for a custom token
					if(
							_jQueryObj.find.jModTokens.regexTest.test(parts[x]) &&
							(
								(firstToken = _jQueryObj.find.jModTokens.regex.exec(parts[x])[1]) && // Extract the token
								(t = _jQueryObj.find.jModTokens.tokens[firstToken]) // Get the token's handler functions
							)
						){
						
						// Split the selector piece into two pieces where the token was found
						tmp = parts[x].split(firstToken, 2);
						// Find the first half of the selector in the old find function to get the new context
						ctx = _jQueryObj._oldFindFn(tmp[0], context);
						if(ctx && ctx.length > 0){
							// Loop through all the returned objects
							for(i = 0; i < ctx.length; i++){
								if(t.find){
									// get the next piece of the selector
									next = getNext(tmp[1]);
									
									// if next if empty or is the final selector in the series,
									// use the token's custom find function as the results
									if(next.length == 1 || next[1] == '')
										t.find(tmp[1], ctx[i], results, seed);
									else {
										tokenResults = t.find(next[0], ctx[i]);
										// Use the token results as the context for the final call to
										// the jQuery find function (this allows additional tokens to
										// be handled)
										for(j = 0; j < tokenResults.length; j++){
											_jQueryObj.find(next[1], tokenResults[j], results, seed);
										}
									}
								} else {
									_jQueryObj.find(tmp[1], ctx[i], results, seed);
								}
							}
						}
						
					} else {
						_jQueryObj._oldFindFn(parts[x], context, results, seed);
					}
				}
				return results;
			}
			// return normal results if no custom tokens are found
			return _jQueryObj._oldFindFn(selector, context, results, seed);
		}
		
		// Copy all properties from the original find function to this one
		for(i in _jQueryObj._oldFindFn){
			_jQueryObj.find[i] = _jQueryObj._oldFindFn[i];
		}
		
		var restrictedTokens = ",.";
		
		_jQueryObj.find.jModTokens = {
			tokens: {},
			
			tokenOrder: [],
			
			sortOrder: function(a, b){
				return (a.length > b.length ? -1 : (a.length < b.length ? 1 : 0));
			},
			
			_regex: null,
			_regexTest: null,
			
			add: function(token, data){
				if(restrictedTokens.indexOf(token) != -1)
					return;
				var jModTokens = _jQueryObj.find.jModTokens;
				jModTokens._regex = null; // Clear regex
				jModTokens._regexTest = null; // Clear regexText
				jModTokens.tokens[token] = data;
				jModTokens.tokenOrder.push(token);
				jModTokens.tokenOrder.sort(this.sortOrder);
			},
			
			remove: function(token){
				var jModTokens = _jQueryObj.find.jModTokens;
				if(jModTokens.tokens[token]){
					delete jModTokens.tokens[token];
					jModTokens._regex = null; // Clear regex
					jModTokens._regexTest = null; // Clear regexText
					jModTokens.tokenOrder.splice(jModTokens.tokenOrder.indexOf(token), 1);
					jModTokens.tokenOrder.sort(this.sortOrder);
				}
			},
			
			removeAll: function(){
				var jModTokens = _jQueryObj.find.jModTokens;
				jModTokens.tokens[token] = {};
				jModTokens.tokenOrder = [];
				jModTokens._regex = null; // Clear regex
				jModTokens._regexTest = null; // Clear regexText
			}
		}
		
		function convertTokensToRegex(tokens){
			return tokens.join("|") // Escape any special characters for regex
					.replace(/\./g, "\\.")
					.replace(/\+/g, "\\+")
					.replace(/\</g, "\\<")
					.replace(/\>/g, "\\>")
					.replace(/\)/g, "\\)")
					.replace(/\(/g, "\\(");
		}
		
		Object.defineProperty(_jQueryObj.find.jModTokens, "regex", {
			get: function(){
				// Return stored regex if it exists
				if(_jQueryObj.find.jModTokens._regex)
					return _jQueryObj.find.jModTokens._regex;
					
				var tokens = convertTokensToRegex(_jQueryObj.find.jModTokens.tokenOrder);
				_jQueryObj.find.jModTokens._regex = new RegExp("(" + tokens + ")");
				
				return _jQueryObj.find.jModTokens._regex;
			}
		});
		
		Object.defineProperty(_jQueryObj.find.jModTokens, "regexTest", {
			get: function(){
				// Return stored regex test if it exists
				if(_jQueryObj.find.jModTokens._regexTest)
					return _jQueryObj.find.jModTokens._regexTest;
					
				var tokens = convertTokensToRegex(_jQueryObj.find.jModTokens.tokenOrder);
				_jQueryObj.find.jModTokens._regexTest = new RegExp("(?:^|[^\\.])(" + tokens + ")(?:[\\s\\.\\#\\w\\*\\:]|$)");
				
				return _jQueryObj.find.jModTokens._regexTest;
			}
		});
		
		_jQueryObj.extend({jModTokenizer: true});
		
		return _jQueryObj;
	}
	
	/**
	 * Adds custom sibling selectors <b>++</b>, <b>+&#62;</b> and <b>+&#60;</b> to the given jQuery instance.
	 * @function addSiblingTokens
	 * @memberof jMod.jQueryExtensions
	 * @param {object} [_jQueryObj=jMod.jQuery] - jQuery object
	 */
	jMod.jQueryExtensions.addSiblingTokens = function(_jQueryObj){
		if (
				(
					!_jQueryObj && // If no jQuery object, try to use global jQuery object
					!(_jQueryObj = jMod.jQuery) // If no global jQuery object, return
				) ||
				NOTEXISTS(_jQueryObj.find.jModTokens) // if not extended, return
			) return;
		
		// All Siblings
		_jQueryObj.find.jModTokens.add("++", {
			find: function(selector, context, results, seed){
				results = results || [];
				var i = 0, sibs = _jQueryObj(context).siblings(selector);
				if(sibs)
					for( ; i < sibs.length; i++)
						if(results.indexOf(sibs[i]) == -1)
							results.push(sibs[i]);
				return results;
			}
		});
		
		// All Proceeding Siblings
		_jQueryObj.find.jModTokens.add("+>", {
			find: function(selector, context, results, seed){
				results = results || [];
				var i = 0, sibs = _jQueryObj(context).nextAll(selector);
				if(sibs)
					for( ; i < sibs.length; i++)
						if(results.indexOf(sibs[i]) == -1)
							results.push(sibs[i]);
				return results;
			}
		});
		
		// All Previous Siblings
		_jQueryObj.find.jModTokens.add("+<", {
			find: function(selector, context, results, seed){
				results = results || [];
				var i = 0, sibs = _jQueryObj(context).prevAll(selector);
				if(sibs)
					for( ; i < sibs.length; i++)
						if(results.indexOf(sibs[i]) == -1)
							results.push(sibs[i]);
				return results;
			}
		});
		
		
	}
	
	/**
	 * Removes the jMod tokenizer extension from the given jQuery instance.
	 * @function removeTokenizer
	 * @memberof jMod.jQueryExtensions
	 * @param {object} [_jQueryObj=jMod.jQuery] - jQuery object
	 */
	jMod.jQueryExtensions.removeTokenizer = function(_jQueryObj){
		if (
				(
					!_jQueryObj && // If no jQuery object, try to use global jQuery object
					!(_jQueryObj = jMod.jQuery) // If no global jQuery object, return
				) ||
				NOTEXISTS(_jQueryObj.jModTokenizer) // if not extended, return
			) return;
		
		// Remove enable/disable property
		delete _jQueryObj.jModTokenizer;
		
		// Restore original function
		_jQueryObj.find = _jQueryObj._oldFindFn;
		
		// Remove "_oldFindFn"
		_jQueryObj._oldFindFn = undefined;
		delete _jQueryObj._oldFindFn;
		
		return _jQueryObj;
	}


})()