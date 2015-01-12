// +@display_name  Tooltip

(function(){
	var EMPTY       = '',
		UNKNOWN     = '?',
		FUNC_TYPE   = 'function',
		UNDEF_TYPE  = 'undefined',
		OBJ_TYPE    = 'object',
		MAJOR       = 'major',
		MODEL       = 'model',
		NAME        = 'name',
		TYPE        = 'type',
		VENDOR      = 'vendor',
		VERSION     = 'version',
		ARCHITECTURE= 'architecture',
		CONSOLE     = 'console',
		MOBILE      = 'mobile',
		TABLET      = 'tablet',
		SMARTTV     = 'smarttv',
		WEARABLE    = 'wearable',
		EMBEDDED    = 'embedded';
	jMod.Browser = {
		'getAgent': function(){
			return navigator.userAgent;
		},
		'get': function(){
		
		},
		
		getRegexMatches: function(str, regexList){
			var matches;
			var results = [];
			for(var i = 0; i < regexList.length; i += 2){
				var tGroup = regexList[i];
				var tGroupMatches = [];
				for(var x = 0; x < tGroup.length; x++){
					if(matches = tGroup[x].exec(str)){
						tGroupMatches.push(matches);
						//console.log(i, x, matches);
					}
				}
				if(tGroupMatches.length > 0){
					results.push({
						matches: tGroupMatches,
						map: regexList[i + 1]
					});
				}
			}
			return results;
		},
		
		getRegexFirstMatch: function(str, regexList){
			var matches;
			for(var i = 0; i < regexList.length; i += 2){
				var tGroup = regexList[i];
				var tGroupMatches = [];
				for(var x = 0; x < tGroup.length; x++){
					if(matches = tGroup[x].exec(str)){
						return [matches, regexList[i + 1]];
					}
				}
			}
			return [];
		},
		
		getBrowser: function(){
			var result = {};
			try{
			var agent = this.getAgent();
			var matchesList = this.getRegexFirstMatch(agent, this.regexes.browser);
			
			if(matchesList.length > 1){
				for(var i = 0; i < matchesList[1].length; i++){
					result[matchesList[1][i]] = matchesList[0][i + 1];
				}
			}
			}catch(e){}
			return result;
		},
		
		// Based on https://github.com/faisalman/ua-parser-js
		'regexes': {
			browser: [
				[

					// Presto based
					/(opera\smini)\/((\d+)?[\w\.-]+)/i, // Opera Mini
					/(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i, // Opera Mobi/Tablet
					/(opera).+version\/((\d+)?[\w\.]+)/i, // Opera > 9.80
					/(opera)[\/\s]+((\d+)?[\w\.]+)/i // Opera < 9.80

				],
				[NAME, VERSION, MAJOR],
				[

					/\s(opr)\/((\d+)?[\w\.]+)/i // Opera Webkit
				],
				[
					[NAME, 'Opera'], VERSION, MAJOR
				],
				[

					/(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i // IE11
				],
				[
					[NAME, 'IE'], VERSION, MAJOR
				],
				[

					/(yabrowser)\/((\d+)?[\w\.]+)/i // Yandex
				],
				[
					[NAME, 'Yandex'], VERSION, MAJOR
				],
				[

					/(comodo_dragon)\/((\d+)?[\w\.]+)/i // Comodo Dragon
				],
				[
					[NAME, /_/g, ' '], VERSION, MAJOR
				],
				[

					/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i,
					// Chrome/OmniWeb/Arora/Tizen/Nokia
					/(uc\s?browser|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i
					//UCBrowser/QQBrowser
				],
				[NAME, VERSION, MAJOR],
				[

					/((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i // Chrome for Android/iOS
				],
				[
					[NAME, 'Chrome'], VERSION, MAJOR
				],
				[

					/version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i // Mobile Safari
				],
				[VERSION, MAJOR, [NAME, 'Mobile Safari']],
				[

					/version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i // Safari & Safari Mobile
				],
				[VERSION, MAJOR, NAME],
				[

					/(konqueror)\/((\d+)?[\w\.]+)/i, // Konqueror
					/(webkit|khtml)\/((\d+)?[\w\.]+)/i
				],
				[NAME, VERSION, MAJOR],
				[

					// Gecko based
					/(navigator|netscape)\/((\d+)?[\w\.-]+)/i // Netscape
				],
				[
					[NAME, 'Netscape'], VERSION, MAJOR
				],
				[
					/(swiftfox)/i, // Swiftfox
					// IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
					/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i,
					// Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
					/(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i, // Mozilla
				],
				[NAME, VERSION, MAJOR]
			]
		}
	}
})();
//jMod.Browser.getBrowser();
