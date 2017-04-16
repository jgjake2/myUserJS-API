// +@display_name  Settings
// +@history (0.0.15) History begins.
// +@history (0.0.17) Fix resizing bug.


/**
 * Settings Configuration Options
 * @name Settings
 * @alias Settings
 * @memberof jMod.Config
 * @property {boolean} enabled is enabled
 * @example
 * // Get the current value of Settings.enabled
 * jMod('get', 'Settings.enabled')
 * // or
 * jMod.Config('Settings.enabled');
 * // or
 * jMod.Config.Settings.enabled;
 */
/*
jMod.Config.Settings = {
	enabled: true
}
*/
jMod.Config.Settings = jMod.extend({
		enabled: true,
		cn: {
			modal: 'jModSettingsModal'
		},
		id: {
			modal: 'jModSettingsModal'
		}
	}, jMod.Config.Settings || {});
var Settings_ModalElementId_Key = 'Settings.id.modal';
var Settings_ModalElementClass_Key = 'Settings.cn.modal';

/**
 * @namespace jMod.Settings
 * @memberOf jMod
 * @since 0.0.14
 */

/**
 * @function Settings
 * @memberof jMod
 * @variation 2
 * @param {(string|object)} data - (string) Command to execute | (object) options for new settings modal
 * @param {(object|boolean)} [data2] - (object) Arguments for command | (boolean) show new settings modal immediately
 */
var Settings = jMod.Settings = function(data, data2){
	if(!jConfig('Settings.enabled'))
		return false;
	if(!jMod.Settings.Initialized){
		jMod.Settings.init();
	}
	//try{
		if(typeof data === "string"){
			switch(data.toLowerCase()){
				case '':
					
					break;
			}
		} else if(typeof data === "object") {
			Settings._data = data;
			
			jMod.Settings.__storedData = undefined;
			
			//jMod.Settings._settingsModalElement = undefined;
			
			jMod.Settings.settingsModalElement = jMod.Settings.MakeSettingsModal(data);
			
			Settings.PrefTypes.onChange();
			/*
			//var win = (window || unsafeWindow);
			var runningResizeCB = false;
			window.addEventListener('resize', function(e){
				if(!runningResizeCB){
					runningResizeCB = true;
					//var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
					if (window.requestAnimationFrame) {
						window.requestAnimationFrame(function(){
							jMod.Settings.onResize();
							runningResizeCB = false;
						});
					} else {
						setTimeout(function(){
							jMod.Settings.onResize();
							runningResizeCB = false;
						}, 66);
					}
				}
			}, false );
			
			*/
			//window.addEventListener('resize', jMod.Settings.onResize, false);
			
			jMod.Settings.onResize();
		}
	/*
	}catch(e){
		console.log('error, jMod.Settings');
		console.error(e);
	}
	*/
};

Settings.Initialized = false;

Settings.getDefault = function(prefName){
	var i = 0, data = Settings._data;
	if(data && (data = data.settings)){
		for(i; i < data.length;i++){
			if(data[i].name == prefName)
				return data[i]['default'];
		}
	}
}

Settings.get = function(prefName, noDefault){
	var storedData = Settings._storedData;
	if(_undefined===typeof prefName)
		return storedData;
	return (storedData && storedData[prefName] !== undefined ? storedData[prefName] : (noDefault ? undefined : Settings.getDefault(prefName)));
}

Settings.set = function(prefName, value){
	var storedData = Settings._storedData || {};
	storedData[prefName] = value;
	Settings._storedData = storedData;
}

Settings.clear = function(){
	Settings._storedData = {};
}

Object.defineProperties(Settings, {
	_data: {
		value: {},
		writable: true,
		enumerable: false
	},
	__storedData: {
		value: undefined,
		enumerable: false,
		writable: true,
		configurable: true
	},
	_storedData: {
		get: function(){
			if(typeof Settings.__storedData !== _undefined)
				return Settings.__storedData;
			try{
				var str = jMod.getValue('Settings_' + jConfig('script.script_name'));
				if(str)
					return JSON.parse(str);
			}catch(e){}
			//return undefined;
		},
		set: function(obj){
			Settings.__storedData = obj;
			try{
				jMod.setValue('Settings_' + jConfig('script.script_name'), JSON.stringify(obj));
			}catch(e){}
		},
		enumerable: false
	},
	_settingsModalElement: {
		value: null,
		writable: true,
		enumerable: false,
		configurable: true
	},
	settingsModalElement: {
		get: function(){
			if(_undefined!==typeof Settings._settingsModalElement && Settings._settingsModalElement != null)
				return Settings._settingsModalElement;
			return (Settings._settingsModalElement = jMod.$('.jModSettings'));
		},
		set: function(value){
			Settings._settingsModalElement = value;
		},
		enumerable: true
	}
});

Settings.PrefTypes = {
	_types: {},
	_call: function(fName, typeName, data){
		if(typeof this._types[typeName] !== _undefined && typeof this._types[typeName][fName] === "function")
			return this._types[typeName][fName].apply(this._types[typeName], Slice.call(arguments, 2));
		return undefined;
	},
	add: function(typeName, data){
		this._types[typeName] = data;
	},
	make: function(typeName, data){
		return this._call('make', typeName, data);
	},
	getValue: function(data){
		var prefEl = jMod.$('#jModSettingsModal [name="'+data.name+'"]');
		return (prefEl ? this._call('getValue', data.type, prefEl, data) : undefined);
	},
	getValueByName: function(name){
		var data, i = 0;
		try{
			data = Settings._data.settings;
		} catch(e) {return;}
		for(i; i < data.length; i++){
			if(data[i].name == name){
				return this.getValue(data[i]);
			}
		}
	},
	getDataByName: function(name){
		var data, i = 0;
		try{
			data = Settings._data.settings;
		} catch(e) {return;}
		for(i; i < data.length; i++){
			if(data[i].name == name){
				return data[i];
			}
		}
	},
	setValue: function(data, value){
		var prefEl = jMod.$('#jModSettingsModal [name="'+data.name+'"]');
		return (prefEl ? this._call('setValue', data.type, prefEl, data, value) : undefined);
	},
	enable: function(_data){
		var data, sData, prefEl, i = 0;
		if(typeof _data == "object"){
			data = _data;
		} else if(typeof _data == "string"){
			try{
				sData = Settings._data.settings;
			} catch(e) {return;}
			for(i; i < sData.length; i++){
				if(sData[i].name == _data){
					data = sData[i];
					break;
				}
			}
		}
		if(data){
			prefEl = jMod.$('#jModSettingsModal [name="'+data.name+'"]');
			return (prefEl ? this._call('enable', data.type, prefEl, data) : undefined);
		}
	},
	disable: function(_data){
		var data, sData, prefEl, i = 0;
		if(typeof _data == "object"){
			data = _data;
		} else if(typeof _data == "string"){
			try{
				sData = Settings._data.settings;
			} catch(e) {return;}
			for(i; i < sData.length; i++){
				if(sData[i].name == _data){
					data = sData[i];
					break;
				}
			}
		}
		if(data){
			prefEl = jMod.$('#jModSettingsModal [name="'+data.name+'"]');
			return (prefEl ? this._call('disable', data.type, prefEl, data) : undefined);
		}
	},
	onChange: function(name, newValue){
		var data, depend, dependName, dependValue, x, enable = true, type, prefEl, multiValue = false, i = 0;
		try{
			data = Settings._data.settings;
		} catch(e) {return;}
		for(i; i < data.length; i++){
			enable = true;

			// Find anything that depends on this value or has a global depend function
			if(data[i].depend && ("function"===typeof data[i].depend||_undefined==typeof name||_undefined!==typeof data[i].depend[name])){
				if(typeof data[i].depend === "function"){
					prefEl = jMod.$('#jModSettingsModal [name="'+data[i].name+'"]');
					enable = data[i].depend(prefEl, data[i]);
				} else {
					for(dependName in data[i].depend){
						depend = data[i].depend[dependName];
						type = typeof depend;
						var dependData = Settings.PrefTypes.getDataByName(dependName);
						try{
							multiValue = Settings.PrefTypes._types[dependData.type].multiValue == true;
						}catch(e){
							multiValue = false;
						}
						
						if(name == dependName){
							dependValue = newValue;
						} else {
							if(_undefined==typeof (dependValue = this.getValueByName(dependName)))
								dependValue = Settings.get(dependName);
						}
						
						if(multiValue){
							dependValue = dependValue.split(',');
						}
						
						switch(type){
							case "function":
								enable = depend(
									jMod.$('#jModSettingsModal [name="'+data[i].name+'"]'),
									data[i],
									dependValue,
									dependData
								);
								break;
							case "object":
								if(RealTypeOf(depend) == "array"){
									if(multiValue){
										for(x = 0; x < depend.length; x++){
											if(dependValue.indexOf(depend[x]) == -1){
												enable = false;
												break;
											}
										}
									} else {
										enable = false;
										for(x = 0; x < depend.length; x++){
											if(depend[x] == dependValue){
												enable = true;
												break;
											}
										}
									}
								}
								break;
							case "string":
								if(multiValue){
									depend = depend.split(',');
									for(x = 0; x < depend.length; x++){
										if(dependValue.indexOf(depend[x]) == -1){
											enable = false;
											break;
										}
									}
								} else {
									if(dependValue != depend)
										enable = false;
								}
								break;
							case "number":
								if(multiValue){
									if(dependValue.length < depend){
										enable = false;
									}
								} else {
									if(parseInt(dependValue) != parseInt(depend))
										enable = false;
								}
								break;
						}
						
						if(!enable)
							break;
					}
				}
				if(enable)
					Settings.PrefTypes.enable(data[i]);
				else
					Settings.PrefTypes.disable(data[i]);
			}
		}
	}
}

Settings.getElementId = function(name){
	switch(name.toLowerCase()){
		case 'settings':
		case 'settingselement':
		case 'settingmodalselement':
			return "jModSettingsModal";
			break;
	}
	return null;
}

Settings.getElement = function(name){
	var tId = Settings.getElementId(name);
	if(tId != null)
		return document.getElementById(tId);
	return document.getElementById(name);
}



function getIcon(data){
	var iconName = data.name;
	var tmp = iconName.split(' ');
	if(tmp.indexOf('fa') == -1 && tmp.indexOf('glyphicon') == -1){
		if(iconName.indexOf('fa-') != -1)
			iconName = 'fa ' + iconName;
		else if(iconName.indexOf('glyphicon-') != -1)
			iconName = 'glyphicon ' + iconName;
	}
	
	var iconOpts = {
		type: 'i',
		className: iconName,
		attributes: {}
	};
	
	if(data.tooltip){
		iconOpts = setTooltipProperties(iconOpts, data.tooltip);
	}
	
	return iconOpts;
}

// Input Types

ImportScript('Core.Settings.select');

ImportScript('Core.Settings.checkbox');

ImportScript('Core.Settings.radio');

ImportScript('Core.Settings.toggle');

ImportScript('Core.Settings.input');

ImportScript('Core.Settings.textarea');

ImportScript('Core.Settings.range');

ImportScript('Core.Settings.imagefile');


function setTooltipProperties(obj, data){
	if(!isElement(obj)){
		obj.className = (obj.className || '') + ' ' + jConfig(Tooltip_TooltipTargetClass_Key);
		//obj.className += ' ' + jMod.Tooltip.TooltipTargetClassName;
		if(typeof obj.attributes === _undefined)
			obj.attributes = {};
		obj.attributes[jConfig(Tooltip_TooltipAttribute_Key)] = data.innerHTML || data.text || null;
		obj.attributes[jConfig(Tooltip_PlacementAttribute_Key)] = data.placement || 'top';
		if(PROPDEFINED(data, 'margin')){
			var marginAttributeName = jConfig('Tooltip.attributeNames.margin');
			if(PROPDEFINED(data.margin, 'left'))
				obj.attributes[marginAttributeName + '-left'] = data.margin.left;
			if(PROPDEFINED(data.margin, 'right'))
				obj.attributes[marginAttributeName + '-right'] = data.margin.right;
			if(PROPDEFINED(data.margin, 'top'))
				obj.attributes[marginAttributeName + '-top'] = data.margin.top;
			if(PROPDEFINED(data.margin, 'bottom'))
				obj.attributes[marginAttributeName + '-bottom'] = data.margin.bottom;
		}
	} else {
		addClass(obj, jConfig(Tooltip_TooltipTargetClass_Key));
		obj.setAttribute(jConfig(Tooltip_TooltipAttribute_Key), data.innerHTML || data.text || null);
		obj.setAttribute(jConfig(Tooltip_PlacementAttribute_Key), data.placement || 'top');
		if(PROPDEFINED(data, 'margin')){
			var marginAttributeName = jConfig('Tooltip.attributeNames.margin');
			if(PROPDEFINED(data.margin, 'left'))
				obj.setAttribute(marginAttributeName + '-left', data.margin.left);
			if(PROPDEFINED(data.margin, 'right'))
				obj.setAttribute(marginAttributeName + '-right', data.margin.right);
			if(PROPDEFINED(data.margin, 'top'))
				obj.setAttribute(marginAttributeName + '-top', data.margin.top);
			if(PROPDEFINED(data.margin, 'bottom'))
				obj.setAttribute(marginAttributeName + '-bottom', data.margin.bottom);
		}
	}
	return obj;
}

function makeLabel(data){
	var text = data.description || data.name;
	if(!isElement(text) && typeof text !== "object")
		text = {
			type: 'span',
			className: 'noselect',
			innerHTML: text,
			attributes: {}
		};
	var opts = {
		type: 'label',
		className: 'col-md-4 control-label noselect',
		innerHTML: text,
		attributes: {}
	};
	
	return opts
}

Settings.MakePref = function(data){
	var opts;
	if(isElement(data) || data.type == 'element'){
		opts = {
			type: 'div',
			className: 'row form-group section-row',
			innerHTML: {
				type: 'div',
				className: 'col-md-12',
				innerHTML: (isElement(data) ? data : ( data.innerHTML || data.options || data['default']))
			}
		};
		
		return createNewElement(opts);
	} else {
		var pref = Settings.PrefTypes.make(data.type, data);
		if(pref){
			var label = makeLabel(data);
			
			switch(data.type){
				case 'radio':
				case 'checkbox':
				case 'toggle':
					if(PROPDEFINED(data,'tooltip') && (PROPDEFINED(data.tooltip,'innerHTML') || PROPDEFINED(data.tooltip,'text'))){
						opts = setTooltipProperties(label.innerHTML, data.tooltip);
					}
					break;
			}
			
			opts = {
				type: 'div',
				className: 'row form-group section-row',
				innerHTML: [label, {
					type: 'div',
					className: 'col-md-8',
					innerHTML: pref
				}]
			};
			

			
			return createNewElement(opts);
		}
	}
	return undefined;
}

Settings.MakeSettingsModal = function(data){
	var tabs = {};
	var tabName, tTabOptions, tTabContentOptions, isActive = false;
	var settingsBody = createNewElement({
		type: 'div',
		className: 'jMod-settings tabbable tabs-left'
	});
	
	var settingsNavTabs = createNewElement({
		type: 'ul',
		className: 'nav nav-tabs'
	});
	
	
	var settingsTabContent = createNewElement({
		type: 'div',
		className: 'tab-content'
	});
	
	
	
	// Get all tab names
	for(var i in data.settings){
		var tabName = data.settings[i].tab || "Other";
		var sectionName = data.settings[i].section || "General";
		//if(typeof data.settings[i].tab === _undefined)
			//data.settings[i].tab = "Other";
			
		//if(typeof data.settings[i].section === _undefined)
			//data.settings[i].section = "General";
			
		if(typeof tabs[tabName] === _undefined)
			tabs[tabName] = {
				name: tabName,
				color: null,
				sections: {}
			};
			
		if(typeof tabs[tabName].sections[sectionName] === _undefined)
			tabs[tabName].sections[sectionName] = [];
			
		tabs[tabName].sections[sectionName].push(data.settings[i]);
		
		
	}
	
	if(data.tabs){
		for(var i in data.tabs){
			tabName = data.tabs[i].name;
			if(tabName && typeof tabs[tabName] !== _undefined){
				if(data.tabs[i].displayName)
					tabs[tabName].displayName = data.tabs[i].displayName;
				if(data.tabs[i].content){
					if(data.tabs[i].content.header){
						tabs[tabName].contentHeader = data.tabs[i].content.header;
					}
					
					if(data.tabs[i].content.footer){
						tabs[tabName].contentFooter = data.tabs[i].content.footer;
					}
				}
			}
		}
	}
	
	var tabOrder = data.tabOrder || [];
	var tabElements = {};
	
	var tabCount = 0;
	for(tabName in tabs){
		isActive = ((data.activeTab !== undefined && tabName === data.activeTab) || (data.activeTab === undefined && tabCount == 0)) ? true : false;
		
		tTabOptions = Tabs.makeNavElement({
			innerHTML: tabs[tabName].displayName || tabName,
			id: 'jMod-settings-tab-' + tabCount,
			isActive: isActive,
			contentId: 'jMod-settings-tab-'+tabCount+'-content',
			index: tabCount
		});
		
		//appendChild(settingsNavTabs, tTabOptions);
		
		var tabContentEl = [];
		
		if(tabs[tabName].contentHeader)
			tabContentEl.push(tabs[tabName].contentHeader)
		
		for(var sectionName in tabs[tabName].sections){
			tabContentEl.push('<div class="row section-title-row"><div class="col-md-12"><h3 class="section-title">'+sectionName+'</h3></div></div>');
			for(var prefName in tabs[tabName].sections[sectionName]){
				tabContentEl.push(Settings.MakePref(tabs[tabName].sections[sectionName][prefName]));
			}
		}
		
		if(tabs[tabName].contentFooter)
			tabContentEl.push(tabs[tabName].contentFooter)
		
		tTabContentOptions = Tabs.makeContentElement({
			name: tabName,
			id: 'jMod-settings-tab-'+tabCount+'-content',
			isActive: isActive,
			innerHTML: tabContentEl,
			index: tabCount
		});
		
		tabElements[tabName] = [tTabOptions, tTabContentOptions];
		if(tabOrder.indexOf(tabName) == -1)
			tabOrder.push(tabName);
		
		//appendChild(settingsTabContent, tTabContentOptions);
		
		tabCount++;
	}
	
	if(data.tabs){
		for(var i in data.tabs){
			tabName = data.tabs[i].name;
			if(tabName && tabs[tabName] === undefined){
				isActive = ((data.activeTab !== undefined && tabName === data.activeTab) || (data.activeTab === undefined && tabCount == 0)) ? true : false;
				tTabOptions = Tabs.makeNavElement({
					innerHTML: tabName,
					id: 'jMod-settings-tab-' + tabCount,
					isActive: isActive,
					contentId: 'jMod-settings-tab-'+tabCount+'-content',
					index: tabCount
				});
				
				//appendChild(settingsNavTabs, tTabOptions);
				
				tTabContentOptions = Tabs.makeContentElement({
					name: tabName,
					id: 'jMod-settings-tab-'+tabCount+'-content',
					isActive: isActive,
					innerHTML: data.tabs[i].innerHTML || data.tabs[i].text,
					index: tabCount
				});
				//appendChild(settingsTabContent, tTabContentOptions);
				tabElements[tabName] = [tTabOptions, tTabContentOptions];
				if(tabOrder.indexOf(tabName) == -1)
					tabOrder.push(tabName);
				
				tabCount++;
			}
		}
	}
	
	//for(tabName in tabOrder){
	for(var i = 0; i < tabOrder.length; i++){
		if(tabElements[tabOrder[i]] !== undefined){
			appendChild(settingsNavTabs, tabElements[tabOrder[i]][0]);
			appendChild(settingsTabContent, tabElements[tabOrder[i]][1]);
		}
	}
	
	
	appendChild(settingsBody, settingsNavTabs);
	appendChild(settingsBody, settingsTabContent);
	

	
	var title = data.title || 'Settings';
	if(!isElement(title)){
		title = '<h2 class="title">' + title + '</h2>';
	}
	//element.addEventListener("transitionend", showMessage, false);
	//console.log('Settings_ModalElementClass_Key: ', jConfig(Settings_ModalElementClass_Key));
	
	var opts = {
		title: title,
		id: Settings.getElementId('settingModalsElement'),
		className: jConfig(Settings_ModalElementClass_Key),
		body: settingsBody,
		footer: [
			{
				type: 'span',
				className: 'powered-by',
				innerHTML: {
					type: 'a',
					innerHTML: [
						{
							type: 'img',
							src: 'http://myuserjs.org/img/favicon/favicon.png',
							attributes: {
								height: '16px'
							}
						},
						'Powered by jMod'
					],
					attributes: {
						href: 'http://doc.myuserjs.org'
					}
				}
			},
			{
				type: 'a',
				innerHTML: 'Clear Settings',
				className: 'btn-clear-settings',
				attributes: {
					href: '#'
				},
				EventListeners: {
					click: {
						capture: false,
						callback: function(e){
							var r = confirm("Are you sure?");
							if(r)
								Settings.clear();
								//console.log('Clear Settings!', e);
							
							eventCancel(e);
							return false;
						}
					}
				}
			}
		],
		buttons: [
			{
				text: 'Save',
				className: 'btn btn-success',
				EventListeners: {
					click: function(){
						console.log('save button click');
						Settings.save();
					}
				}
			}
		],
		onAfterShow: function(){
			Settings.onResize();
		},
		style: {
			width: "1000px",
			//maxHeight: "1000px",
			//overflowY: "auto"
		},
		features: {
			enableTabs: true,
			enableTooltips: true
		}
	};
	
	
	
	if(typeof data.onBeforeHide !== _undefined)
		opts.onBeforeHide = data.onBeforeHide;
		
	if(typeof data.onAfterHide !== _undefined)
		opts.onAfterHide = data.onAfterHide;
	
	return jMod.Modal(opts);
}

Settings.onResize = function(){
	var modal = jMod.Settings.settingsModalElement;
	var settingsDialog = jMod.$('.modal-dialog', modal);
	var settingsBody = jMod.$('.modal-body', modal);
	var settingsFooter = jMod.$('.modal-footer', modal);
	var settingsHeader = jMod.$('.modal-header', modal);
	
	var viewportHeight = jMod.Element.viewportSize.getHeight();
	
	var computedDialog = (window || unsafeWindow).getComputedStyle(settingsDialog, null);
	var marginTop = parseInt(computedDialog.getPropertyValue('margin-top'));
	var marginBottom = parseInt(computedDialog.getPropertyValue('margin-bottom'));
	var maxHeight = (parseInt(viewportHeight) - parseInt(settingsHeader.offsetHeight) - parseInt(settingsFooter.offsetHeight) - marginTop - marginBottom) - 15;
	settingsBody.style.maxHeight = maxHeight + 'px';
	
	var settingsTabs = jMod.$('.nav-tabs', settingsBody);
	jMod.Tabs.resize(settingsTabs);
}

Settings.show = function(){
	jMod.Modal.show(Settings.settingsModalElement || 0);
	
	setTimeout(function(){
		Settings.onResize();
	}, 1);
}

Settings.hide = function(){
	jMod.Modal.hide(Settings.settingsModalElement);
}

Settings.save = function(){
	console.log('Saving');
	var data = Settings._data;
	var r = {};
	for(var i = 0; i < data.settings.length; i++){
		var prefData = data.settings[i];
		if(!isElement(data) && prefData.type != 'element'){
			var value = Settings.PrefTypes.getValue(prefData);
			r[prefData.name] = value;
		}
	}
	Settings._storedData = r;
}

Settings.init = function(){
	Settings.Initialized = true;
}

jMod.CSS = <><![CDATACSS[

/***********************************
 ** Keep Here
 **********************************/
.jmod-na .modal-body {
  min-height: 200px;
  max-height: 500px;
  overflow-y: auto;
}

/***********************************
 ** Transition to global css
 **********************************/
 
 /*
 .jmod-na .modal-body {
	-webkit-transition-property: max-height;
	-moz-transition-property: max-height;
	transition-property: max-height;
	
	-webkit-transition-duration: 50ms;
	-moz-transition-duration: 50ms;
	transition-duration: 50ms;
	
	-webkit-transition-timing-function: cubic-bezier(0,1,.25,1);
	-moz-transition-timing-function: cubic-bezier(0,1,.25,1);
	transition-timing-function: cubic-bezier(0,1,.25,1);
	
	-webkit-transition-delay: 0s;
	-moz-transition-delay: 0s;
	transition-delay: 0s;
}
*/

]]></>;


