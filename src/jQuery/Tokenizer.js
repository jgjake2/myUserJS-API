// +@display_name  jQuery Tokenizer

+(function(){
	var nextRegex = /\s*((?:[^\s\<\>\~\+\|]|[\<\>\~\+\|\^\$\*](?=\=.+\]))+)\s*(.*?)$/;
	
	function getNext(str){
		if(!str || str.length < 3){
			return [str || ''];
		}
		
		var m = nextRegex.exec(str);
		
		return (m ? [m[1].trim(), m[2].trim()] : [str]);
	}
	
	jMod.jQueryExtensions.extendTokenizer = function(_jQueryObj){
		if (
				(
					!_jQueryObj && // If no jQuery object, try to use global jQuery object
					!(_jQueryObj = jMod.jQuery) // If no global jQuery object, return
				) ||
				EXISTS(_jQueryObj.jModTokenizer) // ifalready extended, return
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
				_jQueryObj.find.jModTokens.regex = null; // Clear regex
				_jQueryObj.find.jModTokens._regexTest = null; // Clear regexText
				_jQueryObj.find.jModTokens.tokens[token] = data;
				_jQueryObj.find.jModTokens.tokenOrder.push(token);
				_jQueryObj.find.jModTokens.tokenOrder.sort(this.sortOrder);
			}
		}
		
		Object.defineProperty(_jQueryObj.find.jModTokens, "regex", {
			get: function(){
				if(_jQueryObj.find.jModTokens._regex)
					return _jQueryObj.find.jModTokens._regex;
				var tokens = _jQueryObj.find.jModTokens.tokenOrder.join("|");
				tokens = tokens // Escape any special characters for regex
						.replace(/\./g, "\\.")
						.replace(/\+/g, "\\+")
						.replace(/\</g, "\\<")
						.replace(/\>/g, "\\>")
						.replace(/\)/g, "\\)")
						.replace(/\(/g, "\\(");
				_jQueryObj.find.jModTokens._regex = new RegExp("(" + tokens + ")");
				
				return _jQueryObj.find.jModTokens._regex;
			}
		});
		
		Object.defineProperty(_jQueryObj.find.jModTokens, "regexTest", {
			get: function(){
				if(_jQueryObj.find.jModTokens._regexTest)
					return _jQueryObj.find.jModTokens._regexTest;
				var tokens = _jQueryObj.find.jModTokens.tokenOrder.join("|");
				tokens = tokens // Escape any special characters for regex
						.replace(/\./g, "\\.")
						.replace(/\+/g, "\\+")
						.replace(/\</g, "\\<")
						.replace(/\>/g, "\\>")
						.replace(/\)/g, "\\)")
						.replace(/\(/g, "\\(");
				_jQueryObj.find.jModTokens._regexTest = new RegExp("(?:^|[^\\.])(" + tokens + ")(?:[\\s\\.\\#\\w\\*\\:]|$)");
				
				return _jQueryObj.find.jModTokens._regexTest;
			}
		});
		
		// All Siblings
		_jQueryObj.find.jModTokens.add("++", {
			find: function(selector, context, results, seed){
				results = results || [];
				var i = 0, sibs = $(context).siblings(selector);
				if(sibs)
					for( ; i < sibs.length; i++)
						results.push(sibs[i]);
				return results;
			}
		});
		
		// All Proceeding Siblings
		_jQueryObj.find.jModTokens.add("+>", {
			find: function(selector, context, results, seed){
				results = results || [];
				var i = 0, sibs = $(context).nextAll(selector);
				if(sibs)
					for( ; i < sibs.length; i++)
						results.push(sibs[i]);
				return results;
			}
		});
		
		// All Previous Siblings
		_jQueryObj.find.jModTokens.add("+<", {
			find: function(selector, context, results, seed){
				results = results || [];
				var i = 0, sibs = $(context).prevAll(selector);
				if(sibs)
					for( ; i < sibs.length; i++)
						results.push(sibs[i]);
				return results;
			}
		});
		
		_jQueryObj.extend({jModTokenizer: true});
	}
	

})()