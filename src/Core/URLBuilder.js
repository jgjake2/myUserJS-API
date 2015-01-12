// +@display_name  URLBuilder
// +@history (0.0.16) History begins.


/**
 * URL building class for adding a variable number or arguments to a given host and path
 * @class URLBuilder
 * @param {string} [input] - String to extract hostname from
 */
var URLBuilder = jMod.URLBuilder = function(input){
	/**
	 * Protocol value
	 * @member {string} protocol
	 * @memberof URLBuilder#
	 */
	this.protocol = 'http:';
	/**
	 * URL Hostname
	 * @member {string} hostname
	 * @memberof URLBuilder#
	 */
	this.hostname = '';
	/**
	 * URL Path
	 * @member {string} pathname
	 * @memberof URLBuilder#
	 */
	this.pathname = '';
	
	/**
	 * Arguments List - [{name: ArgumentName, value: ArgumentValue}]
	 * @member {Array.<Object.<string, string>>} args
	 * @memberof URLBuilder#
	 */
	this.args = [];
	
	/**
	 * Parse a given URL for a hostname and/or protocol
	 * @function setHostname
	 * @memberof URLBuilder#
	 * @param {string} str - Input to parse
	 * @returns {URLBuilder} this
	 */
	this.setHostname = function(str){
		try{
			if(typeof str === "string"){
				var parser = document.createElement('a');
				if(!(/^\s*(?:https?\:)?\/\//i.test(str)))
					str = 'http://' + str;
				parser.href = str;
				
				this.hostname = parser.hostname;
				this.protocol = parser.protocol;
			}
		}catch(e){
		}finally{
			return this;
		}
	}
	
	/**
	 * @memberof URLBuilder#
	 * @function setPath
	 * @param {string} str - fooooo
	 * @returns {URLBuilder} this
	 */
	this.setPath = function(str){
		if(str[0] != '/') str = '/' + str;
		this.pathname = str;
		return this;
	}
	
	/**
	 * Add an argument to the URL
	 * @function addArg
	 * @memberof URLBuilder#
	 * @param {string} key - Argument name
	 * @param {string} value - Argument value
	 * @returns {URLBuilder} this
	 */
	this.addArg = function(key, value){
		//this.args.push([key, value]);
		this.args.push({name: key, value: value});
		return this;
	}
	
	/**
	 * Add an array of arguments
	 * @function addArgs
	 * @memberof URLBuilder#
	 * @param {Array.<string, string>} args - Arguments array
	 * @returns {URLBuilder} this
	 */
	this.addArgs = function(args){
		for(var i = 0; i < args.length; i++){
			switch(RealTypeOf(args[i])){
				case "array":
					this.addArg(args[i][0], args[i][1]);
					break;
				case "map":
				case "object":
					var tmpName = getFirstValidKeyValue(args[i], ['name', 'key']);
					var tmpValue = getFirstValidKeyValue(args[i], ['value']);
					if(tmpName && tmpValue)
						this.addArg(tmpName, tmpValue);
					break;
			}
		}
		return this;
	}
	
	/**
	 * Build the full arguments for the URL
	 * @function buildArgs
	 * @memberof URLBuilder#
	 * @returns {string} Arguments string
	 */
	this.buildArgs = function(){
		var argStr = '';
		var argsArr = [];
		for(var i = 0; i < this.args.length; i++){
			//argsArr.push(this.args[i].join('='));
			argsArr.push(this.args[i].name + '=' + this.args[i].value);
		}
		return argsArr.join('&');
	}
	
	/**
	 * Build the full URL string
	 * @function toString
	 * @memberof URLBuilder#
	 * @returns {string} URL String
	 */
	this.toString = function(){
		return this.protocol + '//' + this.hostname + this.pathname + '?' + this.buildArgs();
	}
	
	this.setHostname(input);
	
}
