// +@display_name  Date
// +@replace  MUJS.API.DATE
// +@history (0.0.14) History begins.

/**
 * @name MUJS.API.Date
 * @memberOf! MUJS.API
 * @namespace MUJS.API.Date
 * @since 0.0.14
 */
/**
 * (MUJS.API.Date) Date API function for calling other date related functions
 * @function MUJS.API.Date
 * @memberOf! MUJS.API
 * @variation 2
 * @param {string} command Function name to be called
 * @param {...object} args Arguments to be passed to the function
 */
MUJS.API.fn.Date = function(command, args){
	switch(command){
		case 'parseUTC':
		case 'parseUTCDate':
			return MUJS.API.Date.parseUTCDate.apply(MUJS.API.Date, Array.prototype.slice.call(arguments, 1));
	}
}

Object.defineProperties(MUJS.API.Date, {
	/**
	 * Returns the current time
	 * @memberOf! MUJS.API.Date
	 * @member {object} MUJS.API.Date.now date object in the local time-zone
	 */
	"now": {get: function(){return Date.now();}},
	"fn": {value: MUJS.API.Date.__proto__}
});

/**
 * Parses the UTC date returned when doing an update check (meta key: scriptUploadTimestamp)
 * @function MUJS.API.Date.parseUTCDate
 * @memberOf! MUJS.API.Date
 * @param {string|date} value date to parse
 * @return {object} date object in the local time-zone
 */
MUJS.API.Date.fn.parseUTCDate = function(value){
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
 * @function MUJS.API.Date.getScriptTimeDiff
 * @memberOf! MUJS.API.Date
 * @param {(string|object)} dateObj date string or object returned by update request
 * @return {TimeDiff}
 */
MUJS.API.Date.fn.getScriptTimeDiff = function(dateObj){
	var tDate;
	if(typeof dateObj === "string")
		tDate = MUJS.API.Date.parseUTCDate(dateObj);
	else if(typeof dateObj === "object" && typeof dateObj.scriptUploadTimestamp !== "undefined")
		tDate = MUJS.API.Date.parseUTCDate(dateObj.scriptUploadTimestamp);
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
