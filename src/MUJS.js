// ==UserScript==
// @name             MUJS
// @namespace        http://myuserjs.org/
// @author           jgjake2
// @homepage         http://myuserjs.org/
// @include          *
// @version          {{{API_VERSION}}}
// @grant            unsafeWindow
// @grant            GM_info
// @grant            GM_log
// @grant            GM_addStyle
// @grant            GM_getMetadata
// @grant            GM_installScript
// @grant            GM_xmlhttpRequest
// @grant            GM_getResourceURL
// @grant            GM_getResourceText
// @grant            GM_registerMenuCommand
// @unwrap
// @run-at           document-start
// @history          (0.0.14) Started documentation overhaul
// @history          (0.0.14) Automated initialization for things like script_name and username by parsing the given metablock
// @history          (0.0.11) Added XMLHttpRequest for update checks / stat collecting
// @history          (0.0.11) Enabled function calls through MUJS() function
// @history          (0.0.10) Speed / safety improvements
// @history          (0.0.9) History begins.
// ==/UserScript==
/**
 * @overview [API for interacting with myUserJS.org]{@link MUJS}
 * @author jgjake2
 * @version {{{API_VERSION}}}
 * @see {@link MUJS}
 */

if(typeof unsafeWindow === "undefined") unsafeWindow = window;
 
/**
 * @global
 * @namespace MUJS
 * @author jgjake2
 * @version {{{API_VERSION}}}
 * @tutorial MUJS-tutorial
 */
/**
 * Calls MUJS._call with the given arguments
 * @global
 * @function MUJS
 * @variation 2
 * @param {...object} args Input Arguments
 * @tutorial MUJS-tutorial
 * @example
 * // Get the current value of script.username
 * MUJS('get', 'script.username')
 */
MUJS = function(args){return MUJS._call.apply(MUJS, arguments);};
/**
 * API Namespace
 * @memberOf! MUJS
 * @namespace MUJS.API
 */

Object.defineProperties(MUJS, {
	/**
	 * Current API version
	 * @name MUJS.version
	 * @memberOf! MUJS
	 * @const {string}
	 */
	version: {configurable:false,get:function() { return '{{{API_VERSION}}}'; }},
	/**
	 * Date of build
	 * @name MUJS.build_time
	 * @memberOf! MUJS
	 * @const {string}
	 */
	build_time: {configurable:false,get:function() { return '{{{BUILD_TIME}}}'; }},
	/**
	 * Current build type (beta|release)
	 * @name MUJS.build_type
	 * @memberOf! MUJS
	 * @const {string}
	 */
	build_type: {configurable:false,get:function() { return '{{{BUILD_TYPE}}}'; }},
	/**
	 * Is debug mode enabled
	 * @name MUJS.debug
	 * @memberOf! MUJS
	 * @const {boolean}
	 */
	debug: {configurable:false,get:function() { return {{{DEBUG}}}; }},
	/**
	 * Calls MUJS.API.EvalCommand with given arguments
	 * @function MUJS.API
	 * @memberOf! MUJS
	 * @variation 2
	 * @param {...object} args Arguments to be passed to MUJS.API.EvalCommand
	 */
	API: {value: function(args){
		return MUJS.API.EvalCommand.apply(MUJS.API, Array.prototype.slice.call(arguments, 0));
	}},
	fn: {value: MUJS.__proto__}
});
MUJS['API']['fn']=MUJS['API'].__proto__;
if({{{DEBUG}}} && typeof console !== "undefined" && typeof console.time !== "undefined"){
	console.time('MUJS API Loading');
	console.time('MUJS API Finish Init');
}
(function(MUJS, $){
	var mujsAPILoadStart = -1;
	var mujsAPILoadEnd = -1;
	if(typeof unsafeWindow.performance !== "undefined" && typeof unsafeWindow.performance.timing !== "undefined")
		mujsAPILoadStart = unsafeWindow.performance.now();
		
	MUJS.fn.parseStack = function(stackText){
		var o = [];
		var anonFunctionPatt = /\@((?:https?\:\/\/)?[^\s\:]+).*?([^\:\s]*)?\:(\d+)(?:\:(\d+))?\s*$/gi;
		var stackPatt = /([^\s]*)\@file\:\/\/\/([^\s]+?(?:\/([^\/]+?\.(user\.js|js|json|php)))?):(\d+)(?:\:(\d+))?/gi;
		var match;
		while ((match = stackPatt.exec(stackText)) != null) {
			var tmp = {
				functionName: match[1],
				fullFileName: match[2],
				fileName: match[3],
				fileExt: match[4],
				lineNumber: match[5],
				columnNumber: match[6]
			};
			o.push(tmp);
		}
		return o;
		
	}
	
	var MUJSRequire = {
		DOMLoaded: false,
		RequirementsAdded: false,
		CSSAdded: false,
		documentComplete: false,
		onErrorFunctionAdded: false,
		notificationsInitialized: false,
		modalInitialized: false,
		Complete: false,
		scriptExecCount: 0,
		manualCallCount: 0
	};

	
	MUJS.fn._call = function(){
		var args = Array.prototype.slice.call(arguments, 0);
		try{
			if(!MUJS.gotScriptFileInfo)
				MUJS.getScriptFileInfo();
				
			if(args.length > 0){
				
				// Commands
				if(typeof args[0] === "string"){
					switch(args[0]){
						case 'get':
							return MUJS.config.apply(MUJS, Array.prototype.slice.call(arguments, 1));
							break;
						case 'set':
							return MUJS.config(args[1], args[2]);
							break;
					}
				} else if(typeof args[0] === "object") {
					// GM_info object
					//if(typeof args[0]['GM_info'] !== "undefined" || typeof args[0]['ginfo'] !== "undefined"){
					if(typeof getFirstValidKey(args[0], ['GM_info', 'gm_info', 'ginfo']) !== "undefined"){
						return MUJS.setScriptInfo.apply(MUJS, args);
					}
				
				}
				
			} else {
			
			}
				
			
		}catch(e){}
	}
	
	var _css = '';
	
	Object.defineProperty(MUJS, "CSS", {
		get: function(){
			return _css;
		},
		set: function(str){
			if(MUJSRequire.CSSAdded)
				MUJS.API.addStyle(str);
			else
				_css += str;
		},
		enumerable: false
	});
	
	
	MUJS.fn.Requirements = {
		'_requirements': {'head': [], 'body': [], 'GM_style': []},
		'add': function(data){
			switch(data.type){
				case 'style':
				case 'css':
					return this.addGM(data);
					break;
				default:
					return this.addElement(data);
					break;
			}
		},
		'addElement': function(data){
			var target = (data.target || 'head');
			var newElement = document.createElement(data.type);
			if(typeof data.attributes !== "undefined"){
				for(var i in data.attributes){
					newElement.setAttribute(i, data.attributes[i]);
				}
			}
			if(MUJSRequire.RequirementsAdded){
				this.insertElement(newElement, target);
			} else {
				switch(target){
					case 'head':
						if(MUJSRequire.RequirementsAdded)
							return this.insertElement(newElement, 'head');
						else
							return this._requirements.head.push(newElement);
						break;
					case 'body':
						if(MUJSRequire.RequirementsAdded)
							return this.insertElement(newElement, 'body');
						else
							return this._requirements.body.push(newElement);
						break;
				}
			}
		},
		'addGM': function(data){
			switch(data.type){
				case 'style':
				case 'css':
					if(MUJSRequire.RequirementsAdded)
						return this.insertGM(data.value, 'style');
					else
						return this._requirements.GM_style.push(data.value);
					break;
			}
		},
		'insertElement': function(el, target){
			var _target = target || 'head';
			switch(_target){
				case 'body':
					return (document.getElementsByTagName('body')[0]).appendChild(el);
					break;
				case 'head':
				default:
					return (document.getElementsByTagName('head')[0]).appendChild(el);
					break;
			}
		},
		'insertGM': function(value, type){
			switch(type){
				case 'style':
				case 'css':
					MUJS.API.addStyle(value);
					break;
			}
		},
		'insertAll': function(){
			var head = document.getElementsByTagName('head')[0];
			var body = document.getElementsByTagName('body')[0];
			
			var tEl = null;
			while((tEl = this._requirements.head.shift()) != null){
				head.appendChild(tEl);
			}
			while((tEl = this._requirements.body.shift()) != null){
				body.appendChild(tEl);
			}
			while((tEl = this._requirements.GM_style.shift()) != null){
				MUJS.API.addStyle(tEl);
			}
		}
	};
	



	/***********************************
	 ** Functions/Classes/Prototypes
	 **********************************/
{{{MUJS.CLASSES_AND_PROTOTYPES}}}

	/***********************************
	 ** Element Manipulation Functions
	 **********************************/
{{{MUJS.ELEMENT}}}

	/***********************************
	 ** Default Config Values
	 **********************************/
{{{MUJS.CONFIG}}}

	/***********************************
	 ** Log
	 **********************************/
{{{MUJS.API.LOG}}}
if({{{DEBUG}}})
	MUJS.log.startGroup('MUJS API Initialize');

MUJS.log.Info('Loading MUJS API v' + MUJS.version + ' ' + MUJS.build_type + (MUJS.debug ? ' (debug enabled)' : '') + ' - ' + (new Date(parseInt(MUJS.build_time))).toString());

	/***********************************
	 ** API Eval Command
	 **********************************/
{{{MUJS.API.EVALCOMMAND}}}
	
	/***********************************
	 ** Events
	 **********************************/
	
{{{MUJS.EVENTS}}}

	/***********************************
	 ** Get Script Info
	 **********************************/
{{{MUJS.SCRIPTINFO}}}

	//if(MUJS.config('debug')) MUJS.Log('MUJS.Config', MUJS.Config);

	/***********************************
	 ** Add Style
	 **********************************/
{{{MUJS.API.ADDSTYLE}}}
	 
	/***********************************
	 ** Add Script
	 **********************************/
{{{MUJS.API.ADDSCRIPT}}}

	/***********************************
	 ** Content Eval
	 **********************************/
{{{MUJS.API.CONTENTEVAL}}}
	 
	/***********************************
	 ** LocalStorage
	 **********************************/
	 
{{{MUJS.API.LOCALSTORAGE}}}
	 
	/***********************************
	 ** Parse Meta Data
	 **********************************/
{{{MUJS.API.PARSEMETADATA}}}

	/***********************************
	 ** Date
	 **********************************/
{{{MUJS.API.DATE}}}

	/***********************************
	 ** Notifications
	 **********************************/
{{{MUJS.NOTIFICATION}}}

	/***********************************
	 ** Notifications
	 **********************************/
{{{MUJS.MODAL}}}

	 
	/***********************************
	 ** Get DOM Timing
	 **********************************/
{{{MUJS.GETDOMTIMING}}}
	
	/***********************************
	 ** Update
	 **********************************/
{{{MUJS.UPDATE}}}
	
	/***********************************
	 ** Error
	 **********************************/
{{{MUJS.ERROR}}}

	/***********************************
	 ** Init
	 **********************************/
{{{MUJS.INIT}}}
	
	var tOnBeforeCloseCB = function(a, b){
		console.log('tOnBeforeCloseCB', a, b);
	}
	
	var tOnAfterCloseCB = function(a, b){
		console.log('tOnAfterCloseCB', a, b);
	}
	
	setTimeout(function(){
		//console.log('MUJS.Notification Test');
		/*
		MUJS.Notification({
			'title': 'Anti-Pagination v0.0.14 Available!',
			'body': '<i class="fa fa-clock-o"></i> <i>2 hours ago...</i>',
			'footer': '<a class="btn btn-success btn-sm" href="javascript:void(0);" onClick="console.log(\'a btn click\');(arguments[0] || window.event).stopPropagation();return false;">Install</a>'+
						'<a class="btn btn-primary btn-sm" href="javascript:void(0);" target="_blank">Visit Page</a>'+
						'<a class="btn btn-danger btn-sm" href="javascript:void(0);">Close</a>',
			'icon': 'fa-download',
			'type': 'small',
			'onBeforeClose': tOnBeforeCloseCB,
			'onAfterClose': tOnAfterCloseCB
		});
		*/
		/*
		MUJS.Notification('UpdateNotification', {
			'version': '1.2.3',
			//'script_name': 'foo bar',
			'time': '123',
			'visit': {
				'onClick': function(e){
					console.log('Visit Clicked!!', e);
					//e.stopPropagation();
					//return false;
					eventCancel(e);
				}
			}
		});
		*/
		/*
		MUJS.Notification({
			'title': 'James Simmons liked your comment 2',
			'body': '<i class="fa fa-clock-o"></i> <i>66 seconds ago...</i>',
			'icon': 'fa-thumbs-up',
			'type': 'small',
			'background-color': 'rgb(199, 145, 33)'
		});
		
		MUJS.Notification({
			'title': 'James Simmons liked your comment 3',
			'body': '<i class="fa fa-clock-o"></i> <i>66 seconds ago...</i>',
			'icon': 'fa-thumbs-up',
			'type': 'small',
			'background-color': 'rgb(199, 145, 33)'
		});
		
		
		
		MUJS.Notification({
			'title': 'James Simmons liked your comment 3',
			'body': '<i class="fa fa-clock-o"></i> <i>99 seconds ago...</i>',
			'icon': 'fa-thumbs-up',
			'type': 'small',
			'background-color': 'rgb(199, 145, 33)'
		});
		*/
		/*
		console.log('MUJS.Modal Test');
		var testModal1 = MUJS.Modal({
			title: 'foo',
			body: 'Body text',
			buttons: [
				{
					text: 'custom button',
					className: 'btn btn-warning',
					EventListeners: {
						click: function(){
							console.log('custom button click');
						}
					}
				}
			],
			onBeforeHide: function(modal, modalNum, triggerEvent){
				console.log('onBeforeHide CB:', modal, modalNum, triggerEvent);
				setTimeout(function(modalNum){
					MUJS.Modal.show(modalNum);
				}, 2500, modalNum);
			}
		});
		
		var testModal2 = MUJS.Modal({
			title: 'bar',
			buttons: [
				{
					text: 'custom button2',
					className: 'btn btn-warning',
					EventListeners: {
						click: function(){
							console.log('custom button2 click');
						}
					}
				}
			],
			onBeforeHide: function(modal, modalNum, triggerEvent){
				console.log('onBeforeHide CB2:', modal, modalNum, triggerEvent);
			}
		}, false);
		*/
		/*
		setTimeout(function(testModal2){
			MUJS.Modal('show', testModal2);
		}, 2500, testModal2);
		
		setTimeout(function(testModal1){
			MUJS.Modal('show', testModal1);
		}, 5000, testModal1);
		*/
	},1000);
	
	if(performance.available)
		mujsAPILoadEnd = performance.now;
	
	if({{{DEBUG}}})
		setTimeout(function(){MUJS.log.endGroup('MUJS API Initialize');}, 50);
})(MUJS, (typeof jQuery !== "undefined" ? jQuery : undefined)); unsafeWindow['MUJS'] = MUJS;
if({{{DEBUG}}} && typeof console !== "undefined" && typeof console.timeEnd !== "undefined") console.timeEnd('MUJS API Loading');
