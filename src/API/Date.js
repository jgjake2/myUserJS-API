// +@display_name  Date
// +@history (0.0.14) History begins.

/**
 * @name jMod.API.Date
 * @memberOf! jMod.API
 * @namespace jMod.API.Date
 * @since 0.0.14
 */
/**
 * (jMod.API.Date) Date API function for calling other date related functions
 * @function jMod.API.Date
 * @memberOf! jMod.API
 * @variation 2
 * @param {string} command Function name to be called
 * @param {...object} args Arguments to be passed to the function
 */
jMod.API.Date = function(command, args){
	switch(command){
		case 'parseUTC':
		case 'parseUTCDate':
			return jMod.API.Date.parseUTCDate.apply(jMod.API.Date, Slice.call(arguments, 1));
	}
}

Object.defineProperties(jMod.API.Date, {
	/**
	 * Returns the current time
	 * @memberOf! jMod.API.Date
	 * @member {object} jMod.API.Date.now date object in the local time-zone
	 */
	"now": {get: function(){return Date.now();}},
});

/**
 * Parses the UTC date returned when doing an update check (meta key: scriptUploadTimestamp)
 * @function jMod.API.Date.parseUTCDate
 * @memberOf! jMod.API.Date
 * @param {string|date} value date to parse
 * @return {object} date object in the local time-zone
 */
jMod.API.Date.parseUTCDate = function(value){
	if(typeof value === "string"){
		var a = /^(\d{4})[\-\/](\d{2})[\-\/](\d{2})(?:T|\s)(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z?$/i.exec(value);

		if (a) {
			return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
		}
	} else if(RealTypeOf(value) == "date"){
		return new Date(value);
	}

	return null;
}
/**
 * @typedef TimeDiff
 * @type {object}
 * @property {object} date          Date object
 * @property {object} now           Current Date Object
 * @property {number} milliseconds  Milliseconds since date
 * @property {number} minutes       Minutes since date
 * @property {number} hours         Hours since date
 * @property {number} days          Days since date
 */
/**
 * Get the time since the last update (meta key: scriptUploadTimestamp)
 * @function jMod.API.Date.getScriptTimeDiff
 * @memberOf! jMod.API.Date
 * @param {(string|object)} dateObj date string or object returned by update request
 * @return {TimeDiff}
 */
jMod.API.Date.getScriptTimeDiff = function(dateObj){
	var tDate;
	if(typeof dateObj === "string")
		tDate = jMod.API.Date.parseUTCDate(dateObj);
	else if(typeof dateObj === "object" && typeof dateObj.scriptUploadTimestamp !== _undefined)
		tDate = jMod.API.Date.parseUTCDate(dateObj.scriptUploadTimestamp);
	if(!tDate) return null;
	
	var nowDate = Date.now();
	
	var milliseconds = Math.abs(nowDate - tDate);
	var minutes = milliseconds / 1000 / 60;
	var hours = minutes / 60;
	var days = hours / 24;
	
	return {
		date: tDate,
		now: nowDate,
		milliseconds: milliseconds,
		minutes: minutes,
		hours: hours,
		days: days
	};
}
