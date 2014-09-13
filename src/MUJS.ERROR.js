/**
 * ERROR
 */
MUJS['ERROR'] = {};

MUJS['ERROR']['send'] = function(opts){
	if(typeof opts.args === "undefined")
		opts.args = {};
	if(typeof performance !== "undefined"){
		var tTime = performance.now();
		if(typeof opts.args['scriptErrorTime'] === "undefined")
			opts.args['scriptErrorTime'] = parseInt(tTime);
	}
	
	if(typeof opts.args['scriptError'] === "undefined")
		opts.args['scriptError'] = '1';
	else
		opts.args['scriptError'] = opts.args['scriptError'];
	
	if(typeof opts.callback === "undefined")
		opts.callback = function(){};
	
	opts.args['nodownload'] = '1';
	
	opts['noDOM'] = true;
	
	MUJS['UPDATE']['getUpdateData'](opts);
};
/**
 * END ERROR
 */
